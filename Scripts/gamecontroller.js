function GameController() {
    var canvas;
   // var img = new Image();
    var background = new Background();
    var monsters = new Array();
    var operatingRooms = new Array();
    var frameCount;
    var that = this;
    
    this.secondsElapsed = 0;
    this.gold = 150;
    
    this.init = function(canvasController) {
        canvas = canvasController;
    }
    this.prepareLevel = function() {
        monsters.push(Monster.monsterFromRandom({x:15,y:100}));
        monsters.push(Monster.monsterFromRandom({x:15,y:270}));
        operatingRooms.push(new OperatingRoom());
    }
    this.start = function() {
        this.secondsElapsed = 0;
        frameCount = 0;
        setTimeout(updateAndDraw, 1000/fps);
    }
    
    function updateAndDraw() {
        frameCount++;
        console.log(frameCount, that.secondsElapsed);
        if (frameCount == fps) {
            frameCount = 0;
            that.secondsElapsed++;
            if (that.secondsElapsed == 60) {
                
            }
        }
        canvas.clear();
        background.draw(canvas);
        for (var i=0; i<operatingRooms.length; i++) {
            operatingRooms[i].update();
            operatingRooms[i].draw(canvas);
        }
        var monsterIdxToRemove = [];
        for (var i=0; i<monsters.length; i++) {
            result = monsters[i].update();
            if (result) {
                if (result.dead) {
                    monsterIdxToRemove.push(i);
                    operatingRooms[0].isOccupied = false;
                    var newMonster = Monster.monsterFromRandom(monsters[i].getPos());
                    monsters.push(newMonster);
                }
                else if (result.healed) {
                    monsterIdxToRemove.push(i);
                    /////!!!!!!!
                    operatingRooms[0].isOccupied = false;
                }
            }
        }
        for (var i=monsterIdxToRemove.length-1; i>=0; i--) {
            monsters.splice(monsterIdxToRemove[i], 1);
        }
        for (var i=0; i<monsters.length; i++) {
            monsters[i].draw(canvas);
        }
     //   canvas.drawImg(img, 20, 20);
        // draw buttons
        // 
        setTimeout(updateAndDraw, 1000/fps);
    }
    
    this.handleMouseDown = function(pos) {
        console.log("Mouse down:", pos);
        for (var i=0; i<operatingRooms.length; i++) {
            if (Util.pointInObject(pos.x,pos.y,operatingRooms[i],0) && !operatingRooms[i].isOccupied) {
                for (var j=0; j<monsters.length; j++) {
                    if (monsters[j].isSelected) {
                        operatingRooms[i].changeDoors(true);
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