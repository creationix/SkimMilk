function setDivImage (obj, imge)
{    
  value = ("url(" + imge + ")");
  if ( ! obj.style ) 
    obj.backgroundImage = value;
  else 
    obj.style.backgroundImage = value;
}
