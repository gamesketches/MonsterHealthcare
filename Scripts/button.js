function Button(data) {
    var text;
    var clickedFunc;
    if (data) {
        text = data.text;
        clickedFunc = data.clickedFunc;
    }
    
    var width = 150;
    var height = 50;
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
        canvas.drawText("Restart",50,"yellow",pos.x,pos.y);
        canvas.drawBox(pos.x, pos.y, width, height);
    }
    this.getBoundingBox = function() {return boundingBox;};
    this.getPos = function () {return pos;};
    this.handleMouseDown = function(isClicked, pos) {
        console.log("Button clicked!!!" , isClicked);
        if (isClicked) {
            clickedFunc();
        }
    }
    this.handleMouseHover = function(pos) {
        console.log("Button hovered!!!");
    }
}

