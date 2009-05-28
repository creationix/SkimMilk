function setDivSize ( obj, w, h)
{    
  if ( ! obj.style ){
    obj.width = w + "px";
    obj.height = h + "px";
  }
  else{
    obj.style.width = w + "px";
    obj.style.height = h + "px";
  }
}
