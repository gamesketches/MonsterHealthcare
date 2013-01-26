function Background() {
    var img1 = new Image();
    img1.src = "Placeholder Images/BGPlace.png";
    var img2 = new Image();
    img2.src = "Placeholder Images/BGResource.png";
    
    var currentImg = img1;
    var isFrenzyMode;
    
    
    this.draw = function(canvas) {
	var game = GameController.getInstance();
        canvas.drawImg(currentImg, 0, 0);
        if (isFrenzyMode) {
            var x = 750;
            canvas.drawText("Gold: "+game.gold,50,"gold",x,100);
            canvas.drawText("Time: "+ game.secondsLeft,50,"black",x,150);
            canvas.drawText("Deceased: "+ game.deceasedCount,50,"black",x,200);
            canvas.drawText("Cured: "+  game.curedCount,50,"black",x,250);
            canvas.drawText("Publicity: "+ game.publicity,50,"black",x,300);
	    canvas.drawText("Research",30,"white",35,125);
        }
        else {
            var x = 300;
            var rowHeight = 50;
            var row = 0;
            var goldChange = game.gold - game.nextRoundGold;
            canvas.drawText("Round Over!!",50,"white",350,rowHeight*row++);
            canvas.drawText("Gold at end of round: "+game.gold,50,"white",x,rowHeight*row++);
            canvas.drawText("- operating cost: "+Stats.operatingCost,50,"white",x,rowHeight*row++);
            canvas.drawText("+ gold from publicity: " + Stats.publicityMultiplier + " x "+game.publicity,50,"white",x,rowHeight*row++);
            canvas.drawText("Gold for next turn  : "+game.nextRoundGold,50,"white",x,rowHeight*row++);
            canvas.drawText("Deceased: "+ game.deceasedCount,50,"white",x,rowHeight*row++);
            canvas.drawText("Cured: "+  game.curedCount,50,"white",x,rowHeight*row++);
            canvas.drawText("Publicity: "+ game.publicity,50,"white",x,rowHeight*row++);
        }
    }
    
    this.switchMode = function(isFrenzy) {
        isFrenzyMode = isFrenzy;
        if (isFrenzy) {
            currentImg = img1;
        }
        else {
            currentImg = img2;
        }
    }
}
