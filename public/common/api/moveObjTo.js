function moveObjTo( obj, x, y )
{
    if ( ! obj.style )
    {
        obj.top = y;
        obj.left = x;
    }
    else
    {
        obj.style.top = y + "px";
        obj.style.left = x + "px";
    }
}
