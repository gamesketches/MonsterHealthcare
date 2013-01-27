function Monster(data) {
    var img = new Image();
    img.src = "Resources/erase_icon.png";
    this.isSelected = false;
    var isInRoom = false;
    var imgSelected;
    var imgUnselected;
    var hasSound = false;
    
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
    var boundingBox = {
        left:0,
        right:width,
        top:0,
        bottom:height
    };
    
    
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
	if (hasSound){
	    canvas.drawImg(ImageResources.images["speechbubble"], pos.x +width, pos.y);
	}
        if (isDyingCounter > 0) {
            canvas.drawImg(imgUnselected, pos.x, pos.y);
            canvas.drawImg(ImageResources.images["cross"],  pos.x, pos.y);
            return;
        }
        if (this.isSelected) {
            canvas.drawImg(imgSelected, pos.x, pos.y);
        }
        else {
            canvas.drawImg(imgUnselected, pos.x, pos.y);
        }
        canvas.drawImg(ImageResources.images["health"], pos.x, pos.y+175, 0, 0, healthWidth*hp/maxHp, healthHeight, healthWidth*hp/maxHp, healthHeight);
	//canvas.drawImg(ImageResources.images["arrowDown"], pos.x, pos.y - 20);
	for (var i=0;i<Math.floor(costToTreat/15);i++){
	    canvas.drawImg(ImageResources.images["costIcon"], pos.x + 15*(i), pos.y - 20);
	}
	for (var i=0;i<publicity;i++){
	    canvas.drawImg(ImageResources.images["prIcon"], pos.x + width - 20*i, pos.y - 20);
	}
   //canvas.drawImg(ImageResources.images["health"], pos.x+healthWidth*(1-hp/maxHp), pos.y, healthWidth*(1-hp/maxHp), 0, healthWidth*hp/maxHp, healthHeight, healthWidth*hp/maxHp, healthHeight);
	canvas.drawBox(pos.x, pos.y+175, healthWidth, healthHeight);
        //canvas.drawText(costToTreat,25,"orange",pos.x,pos.y-30);
        //canvas.drawText(publicity,25,"green",pos.x+width,pos.y-30);
    }
    this.getBoundingBox = function() {return boundingBox;};
    this.getPos = function () {return pos;};
    this.handleMouseDown = function(isClicked, pos) {
        if (isDyingCounter > 0 || isInRoom) {
            return;
        }
        this.isSelected = isClicked;
        if (isClicked) {
            console.log("Monster clicked!!!");
            SoundResources.sounds["click"].play();
	    SoundResources.sounds["click"].volume = 0.05;
        }
    }
    this.handleMouseHover = function(pos) {
        console.log("Monster hovered!!!");
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