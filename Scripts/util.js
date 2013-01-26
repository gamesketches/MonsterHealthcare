function Util() {}
Util.pointInBoundingBox = function (x,y,pos,box,margin) {
    margin = isNaN(margin) ? 0 : margin;
    if (x >= pos.x+box.left-margin &&
        x <= pos.x+box.right+margin &&
        y >= pos.y+box.top-margin &&
        y <= pos.y+box.bottom+margin) {
        return true;
    }
    return false;
}
Util.pointInObject = function (x,y,obj,margin) {
    if (obj.getBoundingBox && obj.getPos) {
        return Util.pointInBoundingBox(x,y,obj.getPos(),obj.getBoundingBox(),margin);
    }
    return false;
}