function RollingCredits(data) {
    var names = {
        "werewolf" : [],
        "dragon" : [],
        "vampire" : [],
    };
    var pos = {
        x:data?data.x:50,
        y:data?data.y:380
    }
    var x = {
        "werewolf" : 137,
        "vampire" : 400,
        "dragon" : 722
    };
    var shift = 280;
    var rowHeight = 35;
    var game = GameController.getInstance();
    var maxNameCount = 0;
    populateNames(game, "werewolf");
    populateNames(game, "vampire");
    populateNames(game, "dragon");
    var shiftEnd = -(maxNameCount+1)*rowHeight;
    
    function populateNames(game, race) {
        var nameCount = game.deadCountByRace[race];
        names[race] = Stats.raceNames[race].slice(0,nameCount);
        if (maxNameCount < nameCount) {
            maxNameCount = nameCount;
        }
    }
    
    this.update = function() {
        if (shift > shiftEnd) {
            shift -= 1;
        }
    }
    
    this.draw = function(canvas) {
        displayRace("werewolf",canvas);
        displayRace("dragon",canvas);
        displayRace("vampire",canvas);
        displayCredits(canvas);
    }
    function displayRace(race,canvas) {
        var nameList = names[race];
        var y = shift;
        for (var i=0; i<nameList.length; i++) {
            if (y >= 0) {
                canvas.drawText(nameList[i],30,"white",x[race],pos.y+y);
            }
            y += rowHeight;
        }
    }
    function displayCredits(canvas) {
        var y = shift - shiftEnd;
        var col1 = 140;
        var col2 = 700;
        var titleFont = 40;
        var nameFont = 30;
        if (y >= 0) {
            canvas.drawText("Credits",50,"white",432,pos.y + y);
            y += 50;
            canvas.drawText("Design",titleFont,"white",col1,pos.y + y);
            canvas.drawText("Programming",titleFont,"white",col2,pos.y + y);
            y += titleFont+10;
            canvas.drawText("Aerjen Tamminga",nameFont,"white",col1,pos.y + y);
            canvas.drawText("Dennis Chan",nameFont,"white",col2,pos.y + y);
            y += nameFont+5;
            canvas.drawText("Sam Von Ehren",nameFont,"white",col1,pos.y + y);
            canvas.drawText("Scott Wehby",nameFont,"white",col2,pos.y + y);
            y += nameFont+20;
            canvas.drawText("Art",titleFont,"white",col1,pos.y + y);
            canvas.drawText("Sound",titleFont,"white",col2,pos.y + y);
            y += titleFont+10;
            canvas.drawText("Jordan Phillips",nameFont,"white",col1,pos.y + y);
            canvas.drawText("Richard Gould",nameFont,"white",col2,pos.y + y);
        }
    }
    this.getPos = function () {return pos;};
};
