function getObj (oid)
{
  var obj;
  if ( document.getElementById )
      obj = document.getElementById(oid);
  else if ( document.layers )
      obj = document.layers[oid];
  else if ( document.all )
      obj = document.all.item(oid);
  return obj;
}
