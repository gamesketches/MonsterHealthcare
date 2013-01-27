function Button(data) {
    this.type = data?data.type : "";
    var text;
    var clickedFunc;
    var isHighlighted;
    if (data) {
        text = data.text;
        clickedFunc = data.clickedFunc;
    }
    
    var width = data?data.width:300;
    var height = data?data.height:300;
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
        canvas.drawText(text,30,"yellow",pos.x,pos.y);
        if (isHighlighted) {
            canvas.drawBox(pos.x, pos.y, width, height, "brown");
        }
        else {
            canvas.drawBox(pos.x, pos.y, width, height, "white");
        }
    }
    this.getBoundingBox = function() {return boundingBox;};
    this.getPos = function () {return pos;};
    this.handleMouseDown = function(isClicked, pos) {
        if (isClicked) {
            console.log("Button clicked!!!");
            clickedFunc();
            if (this.type == "research") {
                if (!isHighlighted) {
                    isHighlighted = true;
                }
                else {
                    isHighlighted = false;
                }
            }
        }
    }
    this.handleMouseHover = function(pos) {
        console.log("Button hovered!!!");
    }
}

