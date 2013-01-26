function GameController() {
    var canvas;
   // var img = new Image();
    var background = new Background();
    var monsters = new Array();
    var operatingRooms = new Array();
    var buttons = new Array();
    var frameCount;
    var that = this;
    var isFrenzyMode;
    var secondsPerLevel = 30;
    
    this.numSubscriber = Stats.startingSubscribers;
    this.subscriberChange = 0;
    this.publicity = Stats.startingPublicity;
    this.secondsLeft;
    this.gold = Stats.startingGold;
    this.nextRoundGold = Stats.startingGold;
    this.curedCount = 0;
    this.deceasedCount = 0;
    
    this.init = function(canvasController) {
        canvas = canvasController;
    }
    
    this.start = function() {
        this.switchMode(true);
        frameCount = 0;
        setTimeout(updateAndDraw, 1000/fps);
    }
    
    function updateAndDraw() {
        canvas.clear();
        background.draw(canvas);
        if (isFrenzyMode) {
            frameCount++;
           // console.log(frameCount, that.secondsLeft);
            if (frameCount == fps) {
                frameCount = 0;
                that.secondsLeft--;
                if (that.secondsLeft == 0) {
                    that.switchMode(false);
                }
            }
            var monsterIdxToRemove = [];
            for (var i=0; i<monsters.length; i++) {
                result = monsters[i].update();
                if (result) {
                    if (result.dead) {
                        monsterIdxToRemove.push(i);
                        var newMonster = Monster.monsterFromRandom(monsters[i].getPos());
                        monsters.push(newMonster);
                        that.deceasedCount ++;
                    }
                    else if (result.healed) {
                        monsterIdxToRemove.push(i);
                        /////!!!!!!!
                        operatingRooms[0].changeDoors(false);
                        that.curedCount ++;
                    }
                }
            }
            for (var i=monsterIdxToRemove.length-1; i>=0; i--) {
                monsters.splice(monsterIdxToRemove[i], 1);
            }
            
            // Drawing
            for (var i=0; i<operatingRooms.length; i++) {
                operatingRooms[i].draw(canvas);
            }
            for (var i=0; i<monsters.length; i++) {
                monsters[i].draw(canvas);
            }
        }
        
        for (var i=0; i<buttons.length; i++) {
            buttons[i].draw(canvas);
        }
     //   canvas.drawImg(img, 20, 20);
        // draw buttons
        // 
        setTimeout(updateAndDraw, 1000/fps);
    }
    
    this.switchMode = function(isFrenzy) {
        isFrenzyMode = isFrenzy;
        background.switchMode(isFrenzy);
        if (isFrenzy) {
            that.closeResearchScreen();
            that.prepareFrenzyLevel();
        }
        else {
            that.closeFrenzyLevel();
            that.prepareResearchScreen();
        }
    }
    
    this.prepareFrenzyLevel = function() {
        SoundResources.sounds["waitingRoom"].play();
        that.secondsLeft = secondsPerLevel;
        monsters.push(Monster.monsterFromRandom({x:300,y:100}));
        monsters.push(Monster.monsterFromRandom({x:500,y:100}));
        operatingRooms.push(new OperatingRoom());
        buttons.push(new Button({
            text : "Restart",
            clickedFunc : function() {
                
            },
            x:700,
            y:400
        }));
    }
    
    this.closeFrenzyLevel = function() {
        monsters = [];
        operatingRooms = [];
        buttons = [];
    }
    
    this.prepareResearchScreen = function() {
        this.nextRoundGold = Stats.endTurnGoldChange(this.gold, this.publicity);
        this.subscriberChange = Stats.subscriberChange(this.publicity);
        buttons.push(new Button({
            text : "Restart",
            clickedFunc : function() {
                var game = GameController.getInstance();
                game.switchMode(true);
            },
            x:400,
            y:400
        }));
    }
    
    this.closeResearchScreen = function() {
        this.gold = this.nextRoundGold;
        monsters = [];
        operatingRooms = [];
        buttons = [];
    }
    
    this.handleMouseDown = function(pos) {
        console.log("Mouse down:", pos);
        if (isFrenzyMode) {
            for (var i=0; i<operatingRooms.length; i++) {
                if (Util.pointInObject(pos.x,pos.y,operatingRooms[i],0) && !operatingRooms[i].isOccupied) {
                    for (var j=0; j<monsters.length; j++) {
                        if (monsters[j].isSelected) {
                            var newMonster = Monster.monsterFromRandom(monsters[j].getPos());
                            monsters[j].goToRoom(operatingRooms[i], i);
                            monsters.push(newMonster);
                            break;
                        }
                    }
                }
            }
            for (var i=0; i<monsters.length; i++) {
                if (Util.pointInObject(pos.x,pos.y,monsters[i],0)) {
                    monsters[i].handleMouseDown(true, pos);
                }
                else {
                    monsters[i].handleMouseDown(false, pos);
                }
            }
        }
        for (var i=0; i<buttons.length; i++) {
            if (Util.pointInObject(pos.x,pos.y,buttons[i],0)) {
                buttons[i].handleMouseDown(true, pos);
            }
            else {
                buttons[i].handleMouseDown(false, pos);
            }
        }
    }
    this.handleMouseHover = function(pos) {
       // console.log("Mouse hover:", pos);
        for (var i=0; i<monsters.length; i++) {
            if (Util.pointInObject(pos.x,pos.y,monsters[i],0)) {
                monsters[i].handleMouseHover(pos);
            }
        }
    }
}

GameController.getInstance = function()
{
    if (GameController.instance == undefined) GameController.instance = new GameController();
    return GameController.instance;
}