# myapp.rb
require 'rubygems'
require 'sinatra'
require 'rdiscount'
require 'data_mapper'

use Rack::Session::Cookie, :key => 'rack.session', :path => '/', :secret => '*(&DF987g4^#v s'

DataMapper.setup(:default, "sqlite3:///#{Dir.pwd}/timmir.db")

class User
  include DataMapper::Resource
  property :username, Text, :key => true
  property :hash, Text
  property :last_login, DateTime
end

class Page
  include DataMapper::Resource
  property :title, Text, :key => true
  property :description, Text
  property :markdown, Text
  property :html, Text
#  property :created_at, DateTime, :key => true
  property :created_by, Text
  before :save do
    # convert markdown to html with my simple link extension on the end
    self.html = Markdown.new(self.markdown).to_html\
      .gsub(/\[((?:[A-Z][a-zA-Z]*\/)*([A-Z][a-zA-Z]*))\]/, "<a href=\"/\\1\">\\2</a>")
#    self.created_at = '1982-03-28'
  end
end

helpers do
  def protected!
    response['WWW-Authenticate'] = %(Basic realm="Creationix.com admin access") and \
    throw(:halt, [401, "Not authorized\n"]) and \
    return unless authorized?
  end
  def authorized?
    @auth ||=  Rack::Auth::Basic::Request.new(request.env)
    @auth.provided? && @auth.basic? && @auth.credentials && @auth.credentials == ['tim', 'orion00']
  end
end

# Create the tables
get "/install" do
  DataMapper.auto_migrate!
end

# Edit a page
get '/*/edit' do
  protected!
  title = params[:splat][0]
  @page = Page.get(title)
  if @page == nil then
    @page = Page.new(
      :title => title,
      :description => "Description of the " + title + " page.",
      :markdown => "Enter Content Here"
    )
  end
  @title = "Editing \"" + @page.title + "\""
  haml :edit, :layout => :admin
end

# Save a page
put '/*' do
  protected!
  title = params[:splat][0]
  @page = Page.get(title)
  if @page == nil then
    @page = Page.new(:title => title)
  end  
  @page.markdown = params[:markdown]
#  @page.description = params[:description]
  @page.save
  redirect "/" + @page.title
end

# Load the user view of pages
["/", "/*"].each do |path|
  get path do
    title = (params[:splat] || ['Home'])[0]
    @page = Page.get(title)
    if @page == nil then
      if authorized? then
        redirect "/" + title + "/edit"
      else
        pass
      end
    end
    @title = @page.title.split('/').last
    haml :view
  end
end



