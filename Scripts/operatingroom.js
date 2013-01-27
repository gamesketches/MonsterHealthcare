function OperatingRoom(data) {
    var openimg = new Image();
    openimg.src = "Resources/Art/OpRoomOpen.png";
    var closedimg = new Image();
    closedimg.src = "Resources/Art/OpRoomClosed.png";
    var isOpen = false;
    var imgOpen;
    var imgClosed;
    this.isOccupied = false;
    
    if (data) {
    }
    else {
        imgOpen = openimg;
        imgClosed = closedimg;
    }
    
    var width = 350;
    var height = 300;
    var pos = {
        x:data?data.x:300,
        y:data?data.y:300
    }
    var boundingBox = {
        left:0,
        right:width,
        top:0,
        bottom:height
    };
    
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
	this.isOccupied = open;
    }
}

