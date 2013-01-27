function Button(data) {
    this.type = data?data.type : "";
    this.research = null;
    this.clickable = true;
    var text;
    var clickedFunc;
    var isHighlighted;
    if (data) {
        text = data.text;
        clickedFunc = data.clickedFunc;
        if (this.type == "research") {
            this.research = data.research;
        }
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
        if (this.type == "research") {
            var game = GameController.getInstance();
            var color = "black";
            if (!isHighlighted) {
                this.clickable = (game.nextRoundGold > this.research.cost);
            }
            if (isHighlighted) {
                canvas.drawImg(ImageResources.images["buttonDown"], pos.x, pos.y);
            }
            else {
                if (!this.clickable) {
                    canvas.drawImg(ImageResources.images["buttonNo"], pos.x, pos.y);
                    color = "grey";
                }
                else {
                    canvas.drawImg(ImageResources.images["buttonUp"], pos.x, pos.y);
                }
            }
            canvas.drawText("$"+this.research.cost,30,color,pos.x+200,pos.y+75);
            canvas.drawText(text,22,color,pos.x+60,pos.y+5);
            canvas.drawText(this.research.description,15,color,pos.x+60,pos.y+40);
            canvas.drawImg(this.research.icon, pos.x+5, pos.y+5);
        }
        else {
            canvas.drawText(text,30,"yellow",pos.x,pos.y);
            //if (isHighlighted) {
            //    canvas.drawBox(pos.x, pos.y, width, height, "brown");
            //}
            //else {
            //    canvas.drawBox(pos.x, pos.y, width, height, "white");
            //}
        }
    }
    this.getBoundingBox = function() {return boundingBox;};
    this.getPos = function () {return pos;};
    this.handleMouseDown = function(isClicked, pos) {
        if (!this.clickable) return;
        if (isClicked) {
            console.log("Button clicked!!!");
            SoundResources.sounds["click"].play();
            SoundResources.sounds["click"].volume = 0.05;
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

