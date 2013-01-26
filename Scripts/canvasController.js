function CanvasController(canvas) {
    var context = canvas.getContext("2d");
    
    this.clear = function() {
        context.clearRect(0,0,canvas.width, canvas.height);
    }
    this.drawImg = function(img,x,y,sx,sy,width,height,swidth,sheight) {
        if (width) {
            context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
        }
        else {
            context.drawImage(img,x,y);
        }
    }
    this.drawBox = function(x,y,width,height){
        context.strokeRect(x,y,width,height);
    }
    this.drawText = function(text,font,fillStyle,x,y) {
        //var realX = x, realY = y, realWidth = width, realHeight = height;
        //if (lineWidth) {
        //    realX = x+lineWidth/2;
        //    realY = y+lineWidth/2;
        //    realWidth = width-lineWidth;
        //    realHeight = height-lineWidth;
        //    context.lineWidth = lineWidth;
        //    context.strokeStyle = strokeStyle;
        //    context.strokeRect(realX, realY, realWidth, realHeight);
        //}
        context.fillStyle=fillStyle;
        context.font = font + "px Times";
        context.fillText(text, x,y+font);
        //var len = textArr.length;
        //for (var i=0; i<len; i++) {
        //    context.fillText(textArr[i], realX+realWidth/2, realY+realHeight/2 + font);//*(i+0.5-len/2));
        //}
        //context.font = "italic " + font + "px Optima";
    }
    
    canvas.addEventListener("mousedown", function(e) {
        GameController.getInstance().handleMouseDown(getMouse(e));
    });
    canvas.addEventListener("mousemove", function(e) {
        GameController.getInstance().handleMouseHover(getMouse(e));
    });
    
    
    // Private methods
    function getMouse(e) {
        var element = canvas, offsetX = 0, offsetY = 0, mx, my;
       
        // Compute the total offset
        if (element.offsetParent !== undefined) {
            do {
                offsetX += element.offsetLeft;
                offsetY += element.offsetTop;
            } while ((element = element.offsetParent));
        }
       
        // Add padding and border style widths to offset
        // Also add the <html> offsets in case there's a position:fixed bar
        offsetX += this.stylePaddingLeft || 0 + this.styleBorderLeft || 0 + this.htmlLeft || 0 ;
        offsetY += this.stylePaddingTop || 0 + this.styleBorderTop || 0 + this.htmlTop || 0 ;
       
        mx = e.pageX - offsetX;
        my = e.pageY - offsetY;
       
        // We return a simple javascript object (a hash) with x and y defined
        return {x: mx, y: my};
    }
}