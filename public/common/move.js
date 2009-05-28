var theLogo;
var yPos = 159;
var xPos = 10;
var ldx = 0;
var width;

function moveLogo()
{
    theLogo = getObj ("logo");

    if ( theLogo )
    {
        showObj ( theLogo );
        slideLogo();
    }
}
function moveLogoOver()
{
 width = document.body.clientWidth - theLogo.offsetWidth;
 if (ldx == 0)
   ldx = Math.round(Math.random()*7)-3;
 else ldx = 0;
 slideLogoOver();
}
function slideLogo()
{
    yPos -= yPos/15 + 1;
    if ( yPos > 0 )
    {
        moveObjTo( theLogo, xPos, yPos);
        setTimeout( "slideLogo()", 40 );
    }
    else
    {
        moveObjTo( theLogo, 10, 0 );
    }
}
function slideLogoOver()
{
    xPos += ldx * 2;
    if (xPos < 0) {xPos = 0;ldx=-ldx;}
    if (xPos > width) {xPos = width;ldx=-ldx;}
    moveObjTo( theLogo, xPos, yPos);
    if (ldx !=0) setTimeout( "slideLogoOver()", 40 );
}
