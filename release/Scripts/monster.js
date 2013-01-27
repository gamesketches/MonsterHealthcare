function Monster(data) {
    var img = new Image();
    img.src = "Resources/erase_icon.png";
    this.isSelected = false;
    var isInRoom = false;
    var imgSelected;
    var imgUnselected;
    var hasSound = false;
    this.isDragging = false;
    
    var costToTreat;
    var publicity;
    var maxHp;
    var hp;
    var frameCount = 0;
    var isDyingCounter = 0;
    
    if (data) {
        imgUnselected = ImageResources.images[data.race][data.illness]["unselected"];
        imgSelected = ImageResources.images[data.race][data.illness]["selected"];
	
	if(Math.floor(Math.random()*5) == 0){
	    SoundResources.sounds[data.race][data.illness].play();
	    hasSound = true;
	}
        hp = data.hp;
        maxHp = data.maxHp;
        costToTreat = data.cost;
        publicity = data.pub;
    }
    
    var width = 150;
    var height = 200;
    var healthWidth = width;
    var healthHeight = 5;
    var pos = {
        x:data?data.x:100,
        y:data?data.y:100
    }
    var dragPos = pos;
    var dragDisplace;
    var boundingBox = {
        left:0,
        right:width,
        top:0,
        bottom:height
    };
    
    this.isDying = function() {
        return (isDyingCounter>0);
    }
    
    this.update = function() {
        frameCount++;
        //console.log("Monster frame count " + frameCount + " hp " + hp);
        if (frameCount == fps) {
            var game = GameController.getInstance();
            frameCount = 0;
            if (isDyingCounter > 0 && isDyingCounter < 2) {
                isDyingCounter++;
            }
            else if (isDyingCounter >= 2) {
                return {remove:true};
            }
            else if (!isInRoom) {
                hp -= Stats.dyingSpeed;
                if (hp <= 0) {
                    // DIE
                    SoundResources.sounds[data.race]["death"].play();
                    if (game.publicity > Stats.minPublicity) {
                        game.publicity -= publicity*Stats.publicityPenaltyMultiplier;
                    }
                    isDyingCounter = true;
                    this.isSelected = false;
                    game.deadCountByRace[data.race]++;
                    return {dead:true};
                }
            }
            else {
                hp += Stats.healingSpeed;
                if (hp > maxHp) {
                    // HEAL
                    if (game.publicity < Stats.maxPublicity) {
                        game.publicity += publicity;
                    }
                    SoundResources.sounds["choir"].play();
                    return {healed:true};
                }
            }
        }
        return null;
    }
    this.draw = function(canvas) {
        var drawPos = pos;
        if (this.isDragging) {
            drawPos = dragPos;
        }
        if (isDyingCounter > 0) {
            canvas.drawImg(imgUnselected, drawPos.x, drawPos.y);
            canvas.drawImg(ImageResources.images["cross"],  drawPos.x, drawPos.y);
            return;
        }
        if (this.isSelected) {
            canvas.drawImg(imgSelected, drawPos.x, drawPos.y);
        }
        else {
            canvas.drawImg(imgUnselected, drawPos.x, drawPos.y);
        }
        canvas.drawImg(ImageResources.images["health"], drawPos.x, drawPos.y+175, 0, 0, healthWidth*hp/maxHp, healthHeight, healthWidth*hp/maxHp, healthHeight);
	//canvas.drawImg(ImageResources.images["arrowDown"], pos.x, pos.y - 20);
	for (var i=0;i<Math.floor(costToTreat/15);i++){
	    canvas.drawImg(ImageResources.images["costIcon"], drawPos.x + 15*(i), drawPos.y - 20);
	}
	for (var i=0;i<publicity;i++){
	    canvas.drawImg(ImageResources.images["prIcon"], drawPos.x + width - 20*i, drawPos.y - 20);
	}
        canvas.drawBox(drawPos.x, drawPos.y+175, healthWidth, healthHeight);
        canvas.drawText(Stats.illnessDescription[data.illness],20,"black", drawPos.x, drawPos.y+177);
	if (hasSound){
	    canvas.drawImg(ImageResources.images["speechbubble"], drawPos.x +width, drawPos.y);
	}
    }
    this.getBoundingBox = function() {return boundingBox;};
    this.getPos = function () {return pos;};
    this.handleMouseDown = function(isClicked, mousePos) {
        if (isDyingCounter > 0 || isInRoom) {
            return;
        }
        this.isSelected = isClicked;
        if (isClicked) {
            console.log("Monster clicked!!!");
            this.isDragging = true;
            dragDisplace = {
                x:mousePos.x-pos.x,
                y:mousePos.y-pos.y
            }
            dragPos = {
                x:mousePos.x-dragDisplace.x,
                y:mousePos.y-dragDisplace.y
            };
          //  SoundResources.sounds["click"].play();
	   // SoundResources.sounds["click"].volume = 0.05;
        }
    }
    this.handleMouseHover = function(pos) {
        console.log("Monster hovered!!!");
    }
    this.handleMouseDrag = function(mousePos) {
        console.log("Monster drag!!!");
        dragPos = {
            x:mousePos.x-dragDisplace.x,
            y:mousePos.y-dragDisplace.y
        };
    }
    
    this.goToRoom = function(operatingRoom, roomNumber) {
	var game = GameController.getInstance();
        //pos = operatingRoom.getPos();
        pos = {
            x:operatingRoom.getPos().x+100,
            y:operatingRoom.getPos().y+30,
        };
        //operatingRoom.isOccupied = true;
        game.gold -= costToTreat;
        operatingRoom.changeDoors(true);
        isInRoom = true;
        this.isSelected = false;
    }
}

Monster.monsterFromRandom = function(pos) {
    var raceIdx = Math.floor(Math.random()*Stats.raceDist.length);
    var race = Stats.raceDist[raceIdx];
    var illnessIdx = Math.floor(Math.random()*Stats.raceToIllnessDist[race].length);
    var illness = Stats.raceToIllnessDist[race][illnessIdx];
    var hpIdx = Math.floor(Math.random()*Stats.raceIllnessToHpDist[race][illness].length);
    var hp = Stats.raceIllnessToHpDist[race][illness][hpIdx];
    var costIdx = Math.floor(Math.random()*Stats.illnessToGoldDist[illness].length);
    var cost = Stats.illnessToGoldDist[illness][costIdx];
    var pubIdx = Math.floor(Math.random()*Stats.illnessToPubDist[illness].length);
    var pub = Stats.illnessToPubDist[illness][pubIdx];
    var mons = new Monster({
        race: race,
        illness: illness,
        x:pos.x,
        y:pos.y,
        maxHp:Stats.maxHp,
        hp:hp,
        cost:cost,
        pub:pub
    });
    return mons;
}