var turn = 0
var mode = 0
var jumping = 0
var map = new Array(49)
var bpos = new Array(37)
var cstart=-1
var images = new Array(100);
var imgs = new Array(20);
imgs[0]="grey.gif";
imgs[1]="red.gif";
imgs[2]="green.gif";
var possibles = new Array();
var min = new Array(7);
var max = new Array(7);
min[0] = 2; max[0] = 5;
min[1] = 1; max[1] = 5;
min[2] = 1; max[2] = 6;
min[3] = 0; max[3] = 6;
min[4] = 1; max[4] = 6;
min[5] = 1; max[5] = 5;
min[6] = 2; max[6] = 5;

//configuration settings
//set in main.php
//var player1;     //player 1 is human - green
//var player2;     //player 2 is computer - red
//var easyness;    //game easyness
//var firstPlayer; //The first player


function addOption(x1, y1, valid, x2, y2)
{
 this.x1 = x1;
 this.y1 = y1;
 this.valid = valid;
 this.x2 = x2;
 this.y2 = y2;
 this.score = 0;
}

function findScore(o)
{
 pos=o.x2+o.y2*7;
 e = (turn+1)%2+1;
 var s = (o.valid - 1) * 2;
 if(map[pos+1]==e) s++;
 if(map[pos-1]==e) s++;
 if(map[pos+7]==e) s++;
 if(map[pos-7]==e) s++;
 if (o.y2%2==1)
 {
  if(map[pos+8]==e) s++;
  if(map[pos-6]==e) s++;
 }
 else
 {
  if(map[pos+6]==e) s++;
  if(map[pos-8]==e) s++;
 }
 s += Math.random()*(easyness*easyness - .9);
 return s;
}

function endGame()
{
  obj = getObj("messageBox");
  if ( ! obj.style ) 
   obj.display = "block";
  else 
   obj.style.display = "block";
  var winner = turn;
  endGameEffects(winner);
}
function endGameEffects(winner){

 setTimeout( "endGameEffects(winner)", 1000 ); 
}

function getPossibilities(){
 possibles = new Array();
 for (var y = 0; y < 7; y++){
  for (var x = min[y]; x <= max[y]; x++)
  {
   valid = isValid(x,y);
   if (valid == 2) {
    possibles[possibles.length] = new addOption(0,0, valid, x, y);
   }
   if (valid == 1) {
    for (var y2 = 0; y2 < 7; y2++){
     for (var x2 = min[y2]; x2 <= max[y2]; x2++){
      if (map[x2+y2*7]==0){
       possibles[possibles.length] = new addOption(x,y, valid, x2, y2);
      }
     }      
    }
   }
  }
 }
 if (possibles.length <= 0) endGame();
}

function computerTurn(){
 getPossibilities();
 if ((turn==0 && !player2)||(turn==1 && !player1)){
  high=-1; best=-1;
  for (var b = 0; b < possibles.length; b++){
   s = findScore(possibles[b]);
   if (s>high){
    high=s; best=b;
   }
  }
  if (possibles[best].valid ==1) {
   highlight(possibles[best].x1, possibles[best].y1);
   setTimeout( "sclick(possibles[best].x1, possibles[best].y1);", 300 ); 
   setTimeout("highlight(possibles[best].x2, possibles[best].y2);", 600);
   setTimeout( "sclick(possibles[best].x2, possibles[best].y2);", 900 ); 
  }
  if (possibles[best].valid ==2) {
   highlight(possibles[best].x2, possibles[best].y2);
   setTimeout( "sclick(possibles[best].x2, possibles[best].y2);", 300 ); 
  }
 }
 setTimeout( "computerTurn()", 1000 ); 
}

function turncolor(x,y,c)
{
 pos=x+y*7
 if(map[pos+1]>0)
 {
  map[pos+1]=c
  imgchg(pieceat(pos+1),c)
 }
 if(map[pos-1]>0)
 {
  map[pos-1]=c
  imgchg(pieceat(pos-1),c)
 }
 if(map[pos+7]>0)
 {
  map[pos+7]=c
  imgchg(pieceat(pos+7),c)
 }
 if(map[pos-7]>0)
 {
  map[pos-7]=c
  imgchg(pieceat(pos-7),c)
 }
 if (y%2==1)
 {
  if(map[pos+8]>0)
  {
   map[pos+8]=c
   imgchg(pieceat(pos+8),c)
  }
  if(map[pos-6]>0)
  {
   map[pos-6]=c
   imgchg(pieceat(pos-6),c)
  }
 }
 else
 {
  if(map[pos+6]>0)
  {
   map[pos+6]=c
   imgchg(pieceat(pos+6),c)
  }
  if(map[pos-8]>0)
  {
   map[pos-8]=c
   imgchg(pieceat(pos-8),c)
  }
 }
}
function isValid(x, y)
{
 valid=0;
 if (map[x+y*7+1]==turn+1) valid=2;
 if (map[x+y*7-1]==turn+1) valid=2;
 if (map[x+y*7+7]==turn+1) valid=2;
 if (map[x+y*7-7]==turn+1) valid=2;
 if (y%2==1)
 {
  if (map[x+y*7+8]==turn+1)valid=2;
  if (map[x+y*7-6]==turn+1)valid=2;
 }
 else
 {
  if (map[x+y*7+6]==turn+1)valid=2;
  if (map[x+y*7-8]==turn+1)valid=2;
 }
 if (map[x+y*7]==(turn+1)%2+1) valid=0;
 if (map[x+y*7]==turn+1) valid=1;
 return valid;
}
function hclick(x,y)
{
 if ((turn==0 && player2) || (turn==1 && player1))
   sclick(x,y);
}
function sclick(x,y)		
{   
 if (mode==0)
 {
  valid=isValid(x,y);
  if (valid==1)
  {
   mode=1
   cstart=x+y*7
   moveObjTo(images[38],x*91-20+(y%2)*44,y*78+30)
   showObj(images[38]);
   hideObj(images[37]);
  }
  if (valid==2)
  {
   map[x+y*7]=turn+1
   hideObj(images[37]);
   hideObj(images[38]);
   turncolor(x,y,turn+1)
   imgchg(pieceat(x+y*7),turn+1)
   turn=(turn+1)%2

  }
 }
 else 
 {  
  mode=0  
  hideObj(images[37]);
  hideObj(images[38]);
  if (canjump(x,y)==1)
  {
   transfer(cstart,x+y*7)
   b=pieceat(x+y*7)
   turncolor(x,y,turn+1)
   turn=(turn+1)%2
  }
 }
}
function humanlight(x,y){
 if ((turn==0 && player2) || (turn==1 && player1))
  highlight(x,y);
}

//highlight
function highlight(x,y)
{


 if (mode==0)
 {
  valid=isValid(x,y);

  if (valid!=0){
   moveObjTo(images[37],x*91-20+(y%2)*44,y*78+30)
   showObj(images[37]);
  }
  else
   hideObj(images[37]);
 }
 else
 {
  if (canjump(x,y)==1){
   moveObjTo(images[37],x*91-20+(y%2)*44,y*78+30)
   showObj(images[37]);
  }
  else
   hideObj(images[37]);
 }
}

function canjump(x,y)
{
 end = x+y*7
 valid=1
 if (map[end]!=0) valid=0

 return valid
}

function hide()
{ 
   hideObj(images[37]);
}

function transfer(start,end)
{
 b=pieceat(start)
 c=pieceat(end)
 map[end]=map[start]
 map[start]=0
 imgchg(b,0)
 imgchg(c,map[end])

}

function pieceat(square)
{
 for(a=0;a<37;a++)
  if(bpos[a]==square){
   return a;
   
   }
}



function init()
{
 for (a=0;a<64;a++)
 {
  map[a]=0
 }
 jumping=0
 mode=0
 cstart=-1

 a=0
 for(y=0;y<7;y++)
 {
  for (x=0;x<7;x++)
  {
   if (x>=min[y] && x <=max[y])
   {
    if (y==0)
    {
     spawn(x*91-20+(y%2)*44,y*78+30,"green.gif",a)
     map[x+y*7]=2
    }
    else if (y==6)
    {
     spawn(x*91-20+(y%2)*44,y*78+30,"red.gif",a)
     map[x+y*7]=1
    }
    else
    {
     spawn(x*91-20+(y%2)*44,y*78+30,"grey.gif",a)
     map[x+y*7]=0
    }
     bpos[a]=x+y*7
    a=a+1
   }
   else
    map[x+y*7]=-1
  }
 }
 spawn(1,1,"box.gif",37); hideObj(images[37]);
 spawn(1,1,"box2.gif",38); hideObj(images[38]);
 turn= 2 - firstPlayer;
 computerTurn();
}

function imgchg(a,b){
  setDivImage (images[a], imgs[b]);
}
//DIV SETUP
function spawn(spX,spY,spimg,spno)
{
 if ( navigator.appVersion.indexOf("MSIE")!=-1) {
  obj = document.createElement("<div>");
 }
 else {
  obj = document.createElement('div');
 }
  document.body.appendChild(obj);
  obj.id = ("n" + spno);
  if ( ! obj.style ) 
  obj.position = "absolute";
  else 
    obj.style.position = "absolute";
  setDivImage (obj, spimg);
  setDivSize (obj, 88, 100);
  moveObjTo (obj, spX, spY);  
  images[spno] = obj;
}
