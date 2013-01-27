function Background() {
    var img1 = new Image();
    img1.src = "Resources/Art/BGPlace.png";
    var img2 = new Image();
    img2.src = "Resources/Art/researchbackground.png";
    var imgGameOver = new Image();
    imgGameOver.src = "Resources/Art/InMemoriam.png";
    var imgEntry = new Image();
    imgEntry.src = "Resources/Art/TitleScreen.png";
    
    var currentImg = img1;
    var isFrenzyMode;
    var timeBarWidth = 800;
    var timeBarHeight = 20;
    var currentMode;
    
    this.draw = function(canvas) {
	var game = GameController.getInstance();
        canvas.drawImg(currentImg, 0, 0);
        switch (currentMode) {
            case "frenzy":
                var x = 750;
                var rowHeight = 50;
                var row = 0;
                //canvas.drawText("Gold: "+game.gold,50,"gold",x,100);
		canvas.drawImg(ImageResources.images["moneyBagOutline"], x, 100);
		var lostMoney = 37;
		//lostMoney 200 = Stats.maxMoney. lostMoney 0 = 0.
		lostMoney = 200 - game.gold*200/Stats.maxMoney;
		if(lostMoney<0){
		    lostMoney = 0;
		}
		if(lostMoney>200){
		    lostMoney = 200;
		}
	
                canvas.drawImg(ImageResources.images["moneyBagFill"], x,100 + lostMoney,0, lostMoney,150,200-lostMoney,150,200-lostMoney);
		//x,y,sx,sy,width,height,swidth,sheight
		//x = x
		//y = 100 + sy
		//sx = 0
		//sy = how much is clipped off top
		//width = 150
		//height = 200 - sy
		//swidth = width
		//sheight = height
                
                canvas.drawImg(ImageResources.images["tombstone"],x,310);
                canvas.drawText(game.deceasedCount,50,"black",x+100,300);
                canvas.drawImg(ImageResources.images["cured"],x,360);
                canvas.drawText(game.curedCount,50,"black",x+100,350);
                //canvas.drawText("Publicity: "+ game.publicity,50,"black",x,300);
                
                var timeLeftWidth = timeBarWidth*game.secondsLeft/30;
                var timeStartX = timeBarWidth - timeLeftWidth;
                canvas.drawImg(ImageResources.images["timeBar"],120+timeStartX,25,timeStartX,0,timeLeftWidth,timeBarHeight,timeLeftWidth,timeBarHeight);
            
                //canvas.drawImg(ImageResources.images["timeBar"],120,25);
                
                x = 50;
                font = 25;
                rowHeight = 30;
                row = 0;
                var yStart = 130;
                canvas.drawText("Research",font,"black",x,yStart + row++*rowHeight);
                var researchNames = ResearchPool.getInstance().completedResearchNames;
                for (var i=0; i< researchNames.length; i++) {
                    canvas.drawText(researchNames[i],font,"black",x,yStart + row++*rowHeight);
                }
                break;
            case "research":
                var x = 10;
                var rowHeight = 30;
                var font = 30;
		var goldFont = 30;
                var row = 0;
                var goldChange = game.gold - game.nextRoundGold;
                canvas.drawText(Stats.months[game.currentMonth],50,"black",120,40);
                
                row = 2;
                //canvas.drawText("- operating cost: "+Stats.operatingCost,font,"white",x,rowHeight*row++);
                //canvas.drawText("+ gold from subscribers: " + Stats.subscriberMultiplier + " x "+ game.nextRoundSubscribers,font,"white",x,rowHeight*row++);
                //canvas.drawText("Gold for next turn  : "+game.nextRoundGold,font,"white",x,rowHeight*row++);
                
                //canvas.drawText("Cured: "+  game.curedCount,font,"white",x,rowHeight*row++);
                //canvas.drawText("Publicity: "+ game.publicity,font,"white",x,rowHeight*row++);
                row+=2;
                //canvas.drawText("New subscribers: "+ game.subscriberChange,font,"white",x,rowHeight*row++);
                //canvas.drawText("Next round subscribers: "+ parseInt(game.nextRoundSubscribers),font,"white",x,rowHeight*row++);
                
                font = 35;
		goldFont = font;
                canvas.drawText(game.numSubscribers,font,"black",130,130);//members at end of round
		if(game.gold>=1000){
		    goldFont = 27;
		}
                canvas.drawText(game.gold,goldFont,"black",285,130);//money at end of round
                canvas.drawText(game.deceasedCount,font,"black",135,290);//deceased
		canvas.drawText(game.curedCount,font,"black",130,380);//cured
		canvas.drawText(game.nextRoundSubscribers,font,"black",135,527);//final members
		if (game.subscriberChange<0){
		    canvas.drawText(game.subscriberChange,font,"red",285,290);//new subscribers
		}
		else{
		    canvas.drawText("+"+game.subscriberChange,font,"green",285,290);//new subscribers
		}
		canvas.drawText(Stats.operatingCost,font,"black",285,380);//maintenance
		if(game.nextRoundGold>=1000){
		    canvas.drawText(game.nextRoundGold,goldFont,"black",290,527);//final money
		}
		else{
		    canvas.drawText(game.nextRoundGold,font,"black",290,527);//final money
		}
                //canvas.drawText(game.curedCount,font,"white",x,rowHeight*row++);
                
                x = 500, row = 2;
                canvas.drawText("Investments",50,"white",x,rowHeight*row++);
                break;
        }
    }
    
    this.switchMode = function(mode) {
        currentMode = mode;
        switch(mode) {
            case "frenzy":
                currentImg = img1;
                break;
            case "research":
                currentImg = img2;
                break;
            case "gameover":
                currentImg = imgGameOver;
                break;
            case "entry":
                currentImg = imgEntry;
                break;
        }
    }
}
