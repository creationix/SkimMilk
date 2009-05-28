  var xPosT = 200;
  var yPosT = 0;
  var ground = 159;
  var stepT = true;
  var imgf;
  var dyt = 0;
  var alive=true;
  var imageFolder = "common/img/timrun/";
  function moveTim(){
    Tim = getObj("tim");
    Comment = getObj("comment");
    if ( Tim ){
      showObj ( Tim );
      slideTim();
    }
  }

  function splat()
  {
  	alive=false;
    hideObj(Comment);
  }
  function teleport(){
  	xPosT = Math.round(Math.random()*(document.body.clientWidth-32)+16);  
    if (xPosT > xPos-15 && xPosT < xPos + theLogo.offsetWidth + 15){ 
      teleport();
    }
    yPosT = 0;
  	setDivImage(Tim,imageFolder + "tim.gif");
    if (! alive) { alive=true; slideTim();}
  }
  function slideTim(){
    if (Math.abs(xPosT - mouseX) > 7) moving = true;
    collision = false;
    if (xPosT > xPos-15 && xPosT < xPos + theLogo.offsetWidth + 15){ 
      moving = true;
    }
    if (yPosT < ground) {yPosT += dyt; dyt++;    falling = true;}
    if ((moving || falling) && alive){
    if (yPosT > ground) {yPosT = ground; dyt=0; falling = false;}
    ox = xPosT;  
    xPosT = mouseX;
    moving = (xPosT != ox);
    hideObj(Comment);
    if ((xPosT - ox) > 8 ) {xPosT = ox + 8; }
    if ((ox - xPosT) > 8 ) {xPosT = ox - 8; }
    if (xPosT > xPos-15 && xPosT < xPos + theLogo.offsetWidth + 15){ collision=true;}
    if (collision){ 
      if (xPosT < xPos + theLogo.offsetWidth / 2){
        xPosT = xPos - 15;
      }  
      if (xPosT > xPos + theLogo.offsetWidth / 2){
        xPosT = xPos + 15 + theLogo.offsetWidth;
      }  
    }
    stepT = !stepT;
    imgf = imageFolder + "tim.gif"
    if (xPosT > ox){
      if (stepT || falling) {imgf = imageFolder + "timr2.gif";}
      else {imgf = imageFolder + "timr.gif";}
    }
    if (xPosT < ox) {
      if (stepT || falling) {imgf = imageFolder + "timl2.gif";}
      else {imgf = imageFolder + "timl.gif";}
    }
    if (!moving && !falling)
    {
       Comment.innerHTML = quote[Math.round(Math.random()*(quote.length-1))];
       showObj(Comment);    
       commenty = yPosT - 20 - Comment.offsetHeight;
       moveObjTo( Comment, xPosT+13, commenty);
       if (xPosT > document.body.clientWidth / 2) {
         moveObjTo(Comment, 0,commenty);
         moveObjTo(Comment, xPosT - Comment.offsetWidth - 13, commenty);
       }
       imgf = imageFolder + "tim.gif"
    }
    if (xPosT < 15) {
      xPosT = 15; 
      if (collision) {
        splat();
        imgf=imageFolder + "tims.gif"
      }
    }
    if (xPosT > document.body.clientWidth - 16) {xPosT = document.body.clientWidth - 16;; if (collision){splat();imgf=imageFolder + "tims.gif"}}
    moveObjTo( Tim, xPosT-16, yPosT - 32);
    setDivImage ( Tim, imgf);
    }
    if (alive) setTimeout( "slideTim()", 60 );
  }
