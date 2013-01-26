function Monster(data) {
    var img = new Image();
    img.src = "Resources/erase_icon.png";
    this.isSelected = false;
    var isInRoom = false;
    var imgSelected;
    var imgUnselected;
    
    var costToTreat;
    var publicity;
    var maxHp;
    var hp;
    var frameCount = 0;
    
    if (data) {
        imgUnselected = ImageResources.images[data.race][data.illness]["unselected"];
        imgSelected = ImageResources.images[data.race][data.illness]["selected"];
        hp = data.hp;
        maxHp = data.maxHp;
        costToTreat = data.cost;
        publicity = data.pub;
    }
    else {
        imgUnselected = ImageResources.images["vampire"]["unselected"];
        imgSelected = img;
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
            if (!isInRoom) {
                hp -= Stats.dyingSpeed;
                if (hp <= 0) {
                    // DIE
                    game.publicity -= publicity*2;
                    return {dead:true};
                }
            }
            else {
                hp += Stats.healingSpeed;
                if (hp > maxHp) {
                    // HEAL
                    game.publicity += publicity;
                    return {healed:true};
                }
            }
        }
        return null;
    }
    this.draw = function(canvas) {
        if (this.isSelected) {
            canvas.drawImg(imgSelected, pos.x, pos.y);
        }
        else {
            canvas.drawImg(imgUnselected, pos.x, pos.y);
        }
        canvas.drawImg(ImageResources.images["health"], pos.x, pos.y+175, 0, 0, healthWidth*hp/maxHp, healthHeight, healthWidth*hp/maxHp, healthHeight);
   //canvas.drawImg(ImageResources.images["health"], pos.x+healthWidth*(1-hp/maxHp), pos.y, healthWidth*(1-hp/maxHp), 0, healthWidth*hp/maxHp, healthHeight, healthWidth*hp/maxHp, healthHeight);
	canvas.drawBox(pos.x, pos.y+175, healthWidth, healthHeight);
        canvas.drawText(costToTreat,25,"orange",pos.x,pos.y-30);
        canvas.drawText(publicity,25,"green",pos.x+width,pos.y-30);
    }
    this.getBoundingBox = function() {return boundingBox;};
    this.getPos = function () {return pos;};
    this.handleMouseDown = function(isClicked, pos) {
        this.isSelected = isClicked;
        if (isClicked) {
            console.log("Monster clicked!!!");
	    SoundResources.sounds["click"].volume = 0.1;
            SoundResources.sounds["click"].play();
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