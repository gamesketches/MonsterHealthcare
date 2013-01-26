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
        hp = 10;
        maxHp = 10;
        //switch (data.type) {
        //    case "dragon":
        //        imgUnselected = ImageResources.images["dragon"]["unselected"];
        //        imgSelected = ImageResources.images["dragon"]["selected"];
        //        break;
        //    case "vampire":
        //        imgUnselected = ImageResources.images["vampire"]["unselected"];
        //        imgSelected = ImageResources.images["vampire"]["selected"];
        //        break;
        //    case "werewolf":
        //        imgUnselected = ImageResources.images["werewolf"]["unselected"];
        //        imgSelected = ImageResources.images["werewolf"]["selected"];
        //        break;
        //}
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
        console.log("Monster frame count " + frameCount + " hp " + hp);
        if (frameCount == fps) {
            frameCount = 0;
            if (!isInRoom) {
                hp--;
                if (hp <= 0) {
                    // DIE
                    return {dead:true};
                }
            }
            else {
                hp += 2;
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
        canvas.drawImg(ImageResources.images["health"], pos.x, pos.y, healthWidth*hp/maxHp, healthHeight);
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
        pos = operatingRoom.getPos();
        operatingRoom.isOccupied = true;
        isInRoom = true;
    }
}

Monster.monsterFromRandom = function(pos) {
    var mons = new Monster({
            race: "vampire",
            illness: "bPoisoning",
            x:pos.x,
            y:pos.y
        });
    return mons;
}