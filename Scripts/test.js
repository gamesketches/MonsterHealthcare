var x = 10;
var img;
var speed = 1;
    
var fps = 30;
var canvas;
var context;

$(function(){
    
    var myCanvasController = new CanvasController($("#myCanvas")[0]);
    
    var game = GameController.getInstance();
    game.init(myCanvasController);
    game.start();
    
    //canvas = $("#myCanvas")[0];
    //context = canvas.getContext("2d");
    //
    //img = new Image();
    //img.src = "Resources/pen_icon.png";
    //
    //canvas.addEventListener("mousedown", function(e) {
    //    if (speed == 1) speed = -1;
    //    else speed = 1;
    //});
    //
    ////start timer every 0.1 second
    //setTimeout(updateAndDraw, 1000/fps);
})

// timer { intercept clicks, clean square,
// draw background, draw bed, draw monsters
//  calculate the stats for next frame }

function updateAndDraw() {
    
    context.clearRect(0,0,canvas.width, canvas.height);
    
    context.drawImage(img,x,20);
    x = x + speed;
    
    // detect
    
    setTimeout(updateAndDraw, 1000/fps);
}