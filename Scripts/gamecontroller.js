function GameController() {
    var canvas;
    var background = new Background();
    var monsters = new Array();
    var operatingRooms = new Array();
    var buttons = new Array();
    var frameCount;
    var that = this;
    var currentMode;
    var mode;
    var secondsPerLevel = 5;
    var isResearching = false;
    var rollingcredits;
    var failGold = 0;
    var wMusicSwitch = 0;
    var wMusic = null;
    
    this.numSubscribers = Stats.startingSubscribers;
    this.nextRoundSubscribers = Stats.startingSubscribers;
    this.subscriberChange;
    
    this.gold = Stats.startingGold;
    this.nextRoundGold = Stats.startingGold;
    
    this.publicity = Stats.startingPublicity;
    this.secondsLeft;
    this.curedCount = 0;
    this.deceasedCount = 0;
    
    this.deadCountByRace = {};
    this.currentMonth;
    
    this.init = function(canvasController) {
        canvas = canvasController;
    }
    
    this.start = function() {    
        that.resetCounters();
        that.switchMode("frenzy");
        setTimeout(updateAndDraw, 1000/fps);
    }
    
    this.resetCounters = function() {
        this.deadCountByRace = {
            "dragon" : 3,
            "vampire" : 4,
            "werewolf" : 5
        };
        this.gold = Stats.startingGold;
        this.nextRoundGold = Stats.startingGold;
        this.currentMonth = -1;
    }
    
    function updateAndDraw() {
        canvas.clear();
        background.draw(canvas);
        if (currentMode == "frenzy") {
            frameCount++;
           // console.log(frameCount, that.secondsLeft);
            if (frameCount == fps) {
                frameCount = 0;
                that.secondsLeft--;
                if (that.secondsLeft == 0) {
                    that.nextRoundSubscribers = that.numSubscribers + Stats.subscriberChange(that.publicity, that.numSubscribers);
                    that.subscriberChange = that.nextRoundSubscribers - that.numSubscribers;
                    that.nextRoundGold = Stats.endTurnGoldChange(that.gold, that.publicity, that.nextRoundSubscribers);
                    if (that.nextRoundGold <= failGold) {
                        that.switchMode("gameover");
                    }
                    else {
                        that.switchMode("research");
                    }
                }
            }
            var monsterIdxToRemove = [];
            for (var i=0; i<monsters.length; i++) {
                result = monsters[i].update();
                if (result) {
                    if (result.dead) {
                        that.deceasedCount ++;
                    }
                    else if (result.healed) {
                        monsterIdxToRemove.push(i);
                        /////!!!!!!!
                        operatingRooms[0].changeDoors(false);
                        that.curedCount ++;
                    }
                    else if (result.remove) {
                        monsterIdxToRemove.push(i);
                        
                        setTimeout(updateAndDraw, 1000/fps);
                        var newMonster = Monster.monsterFromRandom(monsters[i].getPos());
                        monsters.push(newMonster);
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
        else if (currentMode == "gameover") {
            rollingCredits.update();
            rollingCredits.draw(canvas);
        }
        
        for (var i=0; i<buttons.length; i++) {
            buttons[i].draw(canvas);
        }
     //   canvas.drawImg(img, 20, 20);
        // draw buttons
        // 
        setTimeout(updateAndDraw, 1000/fps);
    }
    
    this.cleanupScreen = function() {
        monsters = [];
        operatingRooms = [];
        buttons = [];
        this.cleanupCurrentMode();
    }
    this.cleanupCurrentMode = function() {};
    this.switchMode = function(newMode) {
        this.cleanupScreen();
        currentMode = newMode;
        this.cleanupCurrentMode = function() {};
        background.switchMode(newMode);
        switch(currentMode) {
            case "frenzy":
               // that.closeResearchScreen();
                that.prepareFrenzyLevel();
                this.cleanupCurrentMode = this.closeFrenzyLevel;
                break;
            case "research":
               // that.closeFrenzyLevel();
                that.prepareResearchScreen();
                this.cleanupCurrentMode = this.closeResearchScreen;
                break;
            case "entry":
                that.loadEntryScreen();
                break;
            case "gameover":
                that.loadGameOverScreen();
                break;
        }
    }
    
    this.prepareFrenzyLevel = function() {
        frameCount = 0;
        
        this.currentMonth ++;
        if (this.currentMonth == 12) {
            this.currentMonth = 0;
        }
        
        if(wMusicSwitch == 0){
            wMusic = SoundResources.sounds["waitingRoom1"];
            wMusicSwitch = 1;
        }
        else{
            wMusic = SoundResources.sounds["waitingRoom2"];
            wMusicSwitch = 0;
        }
        
        wMusic.play();
        that.secondsLeft = secondsPerLevel;
        monsters.push(Monster.monsterFromRandom({x:300,y:100}));
        monsters.push(Monster.monsterFromRandom({x:500,y:100}));
        operatingRooms.push(new OperatingRoom());
    }
    this.prepareResearchScreen = function() {
        //wMusic.pause();
        SoundResources.sounds["researchMusic"].play();
        buttons.push(ButtonResources.nextLevelButton);
        isResearching = true;
        researchButtons = ResearchPool.getInstance().getAvailableResearchButtons();
        buttons = buttons.concat(researchButtons);
    }
    this.loadEntryScreen = function() {
        buttons.push(ButtonResources.startGameButton);
        buttons.push(ButtonResources.tutorialButton);
        buttons.push(ButtonResources.creditsButton);
    }
    this.loadGameOverScreen = function() {
        buttons.push(ButtonResources.mainMenuButton);
        rollingCredits = new RollingCredits();
    }
    
    this.closeFrenzyLevel = function() {
        wMusic.pause();
        wMusic.currentTime=0;
        Stats.changeOperatingCost();
    }
    this.closeResearchScreen = function() {
        SoundResources.sounds["researchMusic"].pause();
        SoundResources.sounds["researchMusic"].currentTime = 0;
        ResearchPool.getInstance().applyChosenResearches();
        this.gold = this.nextRoundGold;
        this.numSubscribers = this.nextRoundSubscribers;
    }
    
    
    this.handleMouseDown = function(pos) {
        console.log("Mouse down:", pos);
        if (currentMode == "frenzy") {
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
    this.handleMouseDrag = function(pos) {
        console.log("Mouse drag:", pos);
    }
}

GameController.getInstance = function()
{
    if (GameController.instance == undefined) GameController.instance = new GameController();
    return GameController.instance;
}