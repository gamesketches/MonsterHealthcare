function Monster(data) {
    var img = new Image();
    img.src = "Resources/erase_icon.png";
    this.isSelected = false;
    var isInRoom = false;
    var imgSelected;
    var imgUnselected;
    
    var costToTreat;
    var maxHp;
    var hp;
    var frameCount = 0;
    
    if (data) {
        imgUnselected = ImageResources.images[data.race][data.illness]["unselected"];
        imgSelected = ImageResources.images[data.race][data.illness]["selected"];
        hp = data.hp;
        maxHp = data.maxHp;
        costToTreat = data.cost;
    }
    else {
        imgUnselected = ImageResources.images["vampire"]["unselected"];
        imgSelected = img;
    }
    
    var width = 200;
    var height = 200;
    var healthWidth = 150;
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
            frameCount = 0;
            if (!isInRoom) {
                hp -= 5;
                if (hp <= 0) {
                    // DIE
                    return {dead:true};
                }
            }
            else {
                hp += 10;
                if (hp > maxHp) {
                    // HEAL
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
        canvas.drawImg(ImageResources.images["health"], pos.x, pos.y, 0, 0, healthWidth*hp/maxHp, healthHeight, healthWidth*hp/maxHp, healthHeight);
   //canvas.drawImg(ImageResources.images["health"], pos.x+healthWidth*(1-hp/maxHp), pos.y, healthWidth*(1-hp/maxHp), 0, healthWidth*hp/maxHp, healthHeight, healthWidth*hp/maxHp, healthHeight);
   
    }
    this.getBoundingBox = function() {return boundingBox;};
    this.getPos = function () {return pos;};
    this.handleMouseDown = function(isClicked, pos) {
        console.log("Monster clicked!!!" , isClicked);
        this.isSelected = isClicked;
        if (isClicked) {
            SoundResources.sounds["click"].play();
        }
    }
    this.handleMouseHover = function(pos) {
        console.log("Monster hovered!!!");
    }
    
    this.goToRoom = function(operatingRoom, roomNumber) {
	var game = GameController.getInstance();
        pos = operatingRoom.getPos();
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
    var cost = Stats.illnessToGoldDist[illness];
    var mons = new Monster({
        race: race,
        illness: illness,
        x:pos.x,
        y:pos.y,
        maxHp:30,
        hp:hp,
        cost:cost
    });
    return mons;
}