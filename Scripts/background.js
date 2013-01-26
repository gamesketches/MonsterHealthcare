function Background() {
    var img1 = new Image();
    img1.src = "Placeholder Images/BGPlace.png";
    
    var img2 = new Image();
    img2.src = "Placeholder Images/BGResource.png";
    
    var x = 750;
    
    this.draw = function(canvas) {
	var game = GameController.getInstance();
        canvas.drawImg(img1, 0, 0);
        canvas.drawText("Gold: "+game.gold,50,"gold",x,100);
        canvas.drawText("Time: "+ (60 - game.secondsElapsed),50,"black",x,150);
        canvas.drawText("Deceased: "+ game.deceasedCount,50,"black",x,200);
        canvas.drawText("Cured: "+  game.curedCount,50,"black",x,250);
    }
    
    this.changeMode = function(canvas) {
	canvas.drawImg(img2, 0, 0);
	canvas.drawText("Research Mode", 50, "green", 100, 100);
    }
}
