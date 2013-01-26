function OperatingRoom(data) {
    var openimg = new Image();
    openimg.src = "Placeholder Images/ORDoorsOpenPlace.png";
    var closedimg = new Image();
    closedimg.src = "Placeholder Images/ORDoorsPlace.png";
    var isOpen = false;
    var imgOpen;
    var imgClosed;
    this.isOccupied = false;
    
    if (data) {
        imgUnselected = ImageResources.images[data.race][data.illness]["unselected"];
        imgSelected = ImageResources.images[data.race][data.illness]["selected"];
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
        imgOpen = openimg;
        imgClosed = closedimg;
    }
    
    var width = 350;
    var height = 200;
    var pos = {
        x:data?data.x:400,
        y:data?data.y:350
    }
    var boundingBox = {
        left:0,
        right:width,
        top:0,
        bottom:height
    };
    
    this.update = function() {
        //pos.x++;
       // pos.y++;
    }
    this.draw = function(canvas) {
        if (isOpen) {
            canvas.drawImg(imgOpen, pos.x, pos.y);
        }
        else {
            canvas.drawImg(imgClosed, pos.x, pos.y);
        }
    }
    this.getBoundingBox = function() {return boundingBox;};
    this.getPos = function () {return pos;};
    this.handleMouseDown = function(isClicked, pos) {
        console.log("Room clicked!!!" , isClicked);
        isSelected = isClicked;
    }
    this.handleMouseHover = function(pos) {
        console.log("Room hovered!!!");
    }
    this.changeDoors = function(open) {
        isOpen = open;
	    
    }
}

