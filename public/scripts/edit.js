function stop_propigation(e)
{
  var aBetterEventObject = jQuery.Event(e);
  // Now you can do what you want: (Cross-browser)
  aBetterEventObject.preventDefault()
  aBetterEventObject.isDefaultPrevented()
  aBetterEventObject.stopPropagation()
  aBetterEventObject.isPropagationStopped()
  aBetterEventObject.stopImmediatePropagation()
  aBetterEventObject.isImmediatePropagationStopped()
}

$("#save_button").bind("click", function(e) {
  stop_propigation(e);
  this.form.submit();
});
$("#cancel_button").bind("click", function(e) {
  stop_propigation(e);
  window.location = '..';
});
$("#delete_button").bind("click", function(e) {
  stop_propigation(e);

  $('<div title="Delete this page?"><p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span>Are you sure you wish to delete this page?</p></div>')
    .appendTo("body")
    .dialog({
		resizable: false,
		height:140,
		modal: true,
		overlay: {
			backgroundColor: '#000',
			opacity: 0.5
		},
		buttons: {
			'Delete this page': function() {
				$(this).dialog('close');
			},
			Cancel: function() {
				$(this).dialog('close');
			}
		}
	});
});
$("#versions_button").bind("click", function(e) {
  stop_propigation(e);
  alert("Versions");
});
