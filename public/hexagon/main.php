<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-US" lang="en-US">
 <head>
  <meta http-equiv="content-type" content="text/html;charset=utf-8" />
  <meta http-equiv="Page-Enter" content="blendTrans(duration=.5)">
  <title>Hexagon: By Tim Caswell</title> 
  <script type="text/javascript">
  <!--
   var player1 = <?php echo $_GET['player1']; ?>;     //player 1 is human - green
   var player2 = <?php echo $_GET['player2']; ?>;     //player 2 is computer - red
   var easyness = <?php echo $_GET['easyness']; ?>;    //game easyness
   var firstPlayer = <?php echo $_GET['firstPlayer']; ?>; //The first player

   <?php require("game.js"); ?>  
   <?php require("common/api/moveObjTo.js"); ?>
   <?php require("common/api/getObj.js"); ?>
   <?php require("common/api/hideObj.js"); ?>
   <?php require("common/api/showObj.js"); ?>
   <?php require("common/api/setDivImage.js"); ?>
   <?php require("common/api/setDivSize.js"); ?>
  -->
  </script>
  <style>
   body{
    background-color : #000;
    color#fff;
    font-weight:bold;
    font-family: sans-serif;
    margin:0;
    padding:0;
    border:0;
    behavior:url(csshover.htc);
   }
   #messageBox{
    position : absolute;
    z-index : 5;
    width : 59%;
    left : 19%;
    top : 225px;
    font-size : 1.2em;
    font-weight : bold;
    color : #fff;
    padding : 3px;
    -moz-border-radius : 10px;
    border : 3px solid #00f;
    background: #003;
    display :none;
   }
   #messageBox p{
    border : 0;
    padding : 0;
    margin : -20px;
    font-size:3.5em;
    line-height: 2em;
    font-variant : small-caps;
    color : #08f;
    text-align : center;
   }
   #messageBox a, #messageBox a:link{
    border : 3px solid #888;
    background: #333;
    font-weight : bold;
    color : #fff;
    display : block;
    width : 35%;
    margin : 10px auto 10px auto;
    padding : 2px 3px 4px; 3px;
    -moz-border-radius : 20px;
    text-align : center;
    text-decoration : none;
   }
   #messageBox a:hover{
    background:#118;
    border-color: #22f;
   }
  </style>
 </head>
 <body onload="startFLG=0; init();">
  <div id="board" style="background: transparent url(board.jpg) no-repeat; border:0; margin: 10px 0 0 7px;">
   <map id="map" name="map">
    <area shape='poly' coords=' 149 , 37 , 193 , 15 , 237 , 37 , 237 , 93 , 193 , 115 , 149 , 93 ' onmouseover='humanlight( 2 , 0 )' onmouseout='hide()' onclick='hclick( 2 , 0 )' alt="" />
    <area shape='poly' coords=' 240 , 37 , 284 , 15 , 328 , 37 , 328 , 93 , 284 , 115 , 240 , 93 ' onmouseover='humanlight( 3 , 0 )' onmouseout='hide()' onclick='hclick( 3 , 0 )' alt="" />
    <area shape='poly' coords=' 331 , 37 , 375 , 15 , 419 , 37 , 419 , 93 , 375 , 115 , 331 , 93 ' onmouseover='humanlight( 4 , 0 )' onmouseout='hide()' onclick='hclick( 4 , 0 )' alt="" />
    <area shape='poly' coords=' 422 , 37 , 466 , 15 , 510 , 37 , 510 , 93 , 466 , 115 , 422 , 93 ' onmouseover='humanlight( 5 , 0 )' onmouseout='hide()' onclick='hclick( 5 , 0 )' alt="" />
    <area shape='poly' coords=' 102 , 115 , 146 , 93 , 190 , 115 , 190 , 171 , 146 , 193 , 102 , 171 ' onmouseover='humanlight( 1 , 1 )' onmouseout='hide()' onclick='hclick( 1 , 1 )' alt="" />
    <area shape='poly' coords=' 193 , 115 , 237 , 93 , 281 , 115 , 281 , 171 , 237 , 193 , 193 , 171 ' onmouseover='humanlight( 2 , 1 )' onmouseout='hide()' onclick='hclick( 2 , 1 )' alt="" />
    <area shape='poly' coords=' 284 , 115 , 328 , 93 , 372 , 115 , 372 , 171 , 328 , 193 , 284 , 171 ' onmouseover='humanlight( 3 , 1 )' onmouseout='hide()' onclick='hclick( 3 , 1 )' alt="" />
    <area shape='poly' coords=' 375 , 115 , 419 , 93 , 463 , 115 , 463 , 171 , 419 , 193 , 375 , 171 ' onmouseover='humanlight( 4 , 1 )' onmouseout='hide()' onclick='hclick( 4 , 1 )' alt="" />
    <area shape='poly' coords=' 466 , 115 , 510 , 93 , 554 , 115 , 554 , 171 , 510 , 193 , 466 , 171 ' onmouseover='humanlight( 5 , 1 )' onmouseout='hide()' onclick='hclick( 5 , 1 )' alt="" />
    <area shape='poly' coords=' 58 , 193 , 102 , 171 , 146 , 193 , 146 , 249 , 102 , 271 , 58 , 249 ' onmouseover='humanlight( 1 , 2 )' onmouseout='hide()' onclick='hclick( 1 , 2 )' alt="" />
    <area shape='poly' coords=' 149 , 193 , 193 , 171 , 237 , 193 , 237 , 249 , 193 , 271 , 149 , 249 ' onmouseover='humanlight( 2 , 2 )' onmouseout='hide()' onclick='hclick( 2 , 2 )' alt="" />
    <area shape='poly' coords=' 240 , 193 , 284 , 171 , 328 , 193 , 328 , 249 , 284 , 271 , 240 , 249 ' onmouseover='humanlight( 3 , 2 )' onmouseout='hide()' onclick='hclick( 3 , 2 )' alt="" />
    <area shape='poly' coords=' 331 , 193 , 375 , 171 , 419 , 193 , 419 , 249 , 375 , 271 , 331 , 249 ' onmouseover='humanlight( 4 , 2 )' onmouseout='hide()' onclick='hclick( 4 , 2 )' alt="" />
    <area shape='poly' coords=' 422 , 193 , 466 , 171 , 510 , 193 , 510 , 249 , 466 , 271 , 422 , 249 ' onmouseover='humanlight( 5 , 2 )' onmouseout='hide()' onclick='hclick( 5 , 2 )' alt="" />
    <area shape='poly' coords=' 513 , 193 , 557 , 171 , 601 , 193 , 601 , 249 , 557 , 271 , 513 , 249 ' onmouseover='humanlight( 6 , 2 )' onmouseout='hide()' onclick='hclick( 6 , 2 )' alt="" />
    <area shape='poly' coords=' 11 , 271 , 55 , 249 , 99 , 271 , 99 , 327 , 55 , 349 , 11 , 327 ' onmouseover='humanlight( 0 , 3 )' onmouseout='hide()' onclick='hclick( 0 , 3 )' alt="" />
    <area shape='poly' coords=' 102 , 271 , 146 , 249 , 190 , 271 , 190 , 327 , 146 , 349 , 102 , 327 ' onmouseover='humanlight( 1 , 3 )' onmouseout='hide()' onclick='hclick( 1 , 3 )' alt="" />
    <area shape='poly' coords=' 193 , 271 , 237 , 249 , 281 , 271 , 281 , 327 , 237 , 349 , 193 , 327 ' onmouseover='humanlight( 2 , 3 )' onmouseout='hide()' onclick='hclick( 2 , 3 )' alt="" />
    <area shape='poly' coords=' 284 , 271 , 328 , 249 , 372 , 271 , 372 , 327 , 328 , 349 , 284 , 327 ' onmouseover='humanlight( 3 , 3 )' onmouseout='hide()' onclick='hclick( 3 , 3 )' alt="" />
    <area shape='poly' coords=' 375 , 271 , 419 , 249 , 463 , 271 , 463 , 327 , 419 , 349 , 375 , 327 ' onmouseover='humanlight( 4 , 3 )' onmouseout='hide()' onclick='hclick( 4 , 3 )' alt="" />
    <area shape='poly' coords=' 466 , 271 , 510 , 249 , 554 , 271 , 554 , 327 , 510 , 349 , 466 , 327 ' onmouseover='humanlight( 5 , 3 )' onmouseout='hide()' onclick='hclick( 5 , 3 )' alt="" />
    <area shape='poly' coords=' 557 , 271 , 601 , 249 , 645 , 271 , 645 , 327 , 601 , 349 , 557 , 327 ' onmouseover='humanlight( 6 , 3 )' onmouseout='hide()' onclick='hclick( 6 , 3 )' alt="" />
    <area shape='poly' coords=' 58 , 349 , 102 , 327 , 146 , 349 , 146 , 405 , 102 , 427 , 58 , 405 ' onmouseover='humanlight( 1 , 4 )' onmouseout='hide()' onclick='hclick( 1 , 4 )' alt="" />
    <area shape='poly' coords=' 149 , 349 , 193 , 327 , 237 , 349 , 237 , 405 , 193 , 427 , 149 , 405 ' onmouseover='humanlight( 2 , 4 )' onmouseout='hide()' onclick='hclick( 2 , 4 )' alt="" />
    <area shape='poly' coords=' 240 , 349 , 284 , 327 , 328 , 349 , 328 , 405 , 284 , 427 , 240 , 405 ' onmouseover='humanlight( 3 , 4 )' onmouseout='hide()' onclick='hclick( 3 , 4 )' alt="" />
    <area shape='poly' coords=' 331 , 349 , 375 , 327 , 419 , 349 , 419 , 405 , 375 , 427 , 331 , 405 ' onmouseover='humanlight( 4 , 4 )' onmouseout='hide()' onclick='hclick( 4 , 4 )' alt="" />
    <area shape='poly' coords=' 422 , 349 , 466 , 327 , 510 , 349 , 510 , 405 , 466 , 427 , 422 , 405 ' onmouseover='humanlight( 5 , 4 )' onmouseout='hide()' onclick='hclick( 5 , 4 )' alt="" />
    <area shape='poly' coords=' 513 , 349 , 557 , 327 , 601 , 349 , 601 , 405 , 557 , 427 , 513 , 405 ' onmouseover='humanlight( 6 , 4 )' onmouseout='hide()' onclick='hclick( 6 , 4 )' alt="" />
    <area shape='poly' coords=' 102 , 427 , 146 , 405 , 190 , 427 , 190 , 483 , 146 , 505 , 102 , 483 ' onmouseover='humanlight( 1 , 5 )' onmouseout='hide()' onclick='hclick( 1 , 5 )' alt="" />
    <area shape='poly' coords=' 193 , 427 , 237 , 405 , 281 , 427 , 281 , 483 , 237 , 505 , 193 , 483 ' onmouseover='humanlight( 2 , 5 )' onmouseout='hide()' onclick='hclick( 2 , 5 )' alt="" />
    <area shape='poly' coords=' 284 , 427 , 328 , 405 , 372 , 427 , 372 , 483 , 328 , 505 , 284 , 483 ' onmouseover='humanlight( 3 , 5 )' onmouseout='hide()' onclick='hclick( 3 , 5 )' alt="" />
    <area shape='poly' coords=' 375 , 427 , 419 , 405 , 463 , 427 , 463 , 483 , 419 , 505 , 375 , 483 ' onmouseover='humanlight( 4 , 5 )' onmouseout='hide()' onclick='hclick( 4 , 5 )' alt="" />
    <area shape='poly' coords=' 466 , 427 , 510 , 405 , 554 , 427 , 554 , 483 , 510 , 505 , 466 , 483 ' onmouseover='humanlight( 5 , 5 )' onmouseout='hide()' onclick='hclick( 5 , 5 )' alt="" />
    <area shape='poly' coords=' 149 , 505 , 193 , 483 , 237 , 505 , 237 , 561 , 193 , 583 , 149 , 561 ' onmouseover='humanlight( 2 , 6 )' onmouseout='hide()' onclick='hclick( 2 , 6 )' alt="" />
    <area shape='poly' coords=' 240 , 505 , 284 , 483 , 328 , 505 , 328 , 561 , 284 , 583 , 240 , 561 ' onmouseover='humanlight( 3 , 6 )' onmouseout='hide()' onclick='hclick( 3 , 6 )' alt="" />
    <area shape='poly' coords=' 331 , 505 , 375 , 483 , 419 , 505 , 419 , 561 , 375 , 583 , 331 , 561 ' onmouseover='humanlight( 4 , 6 )' onmouseout='hide()' onclick='hclick( 4 , 6 )' alt="" />
    <area shape='poly' coords=' 422 , 505 , 466 , 483 , 510 , 505 , 510 , 561 , 466 , 583 , 422 , 561 ' onmouseover='humanlight( 5 , 6 )' onmouseout='hide()' onclick='hclick( 5 , 6 )' alt="" />
   </map>
   <img src="ghost.gif" id="ghost" style="position:relative; left:0px; top:0px; width:668px; height:600px; border:0; z-index:2;" usemap="#map" alt="" />
   <div id="messageBox"><p id="message">You Win!</p><a href="index.html">Play Again</a></div>
  </div>
 </body>
</html>
