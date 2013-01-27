function Research(data) {
    this.tag = data.tag;
    this.cost = data.cost;
    this.label = data.label;
    this.description = data.description;
    this.statsToChange = data.statsToChange;
    this.changeAmount = data.changeAmount;
    this.isSelected = false;
    var that = this;
    this.generateButton = function(x,y) {
        this.isSelected = false;
        return new Button({
            text : that.label,
            hoverText : that.description,
            clickedFunc : function() {
                var game = GameController.getInstance();
                //game.gold -= that.cost;
                //game.finishResearching();
                //that.applyEffect();
                //that.isApplied = true;
                //
                //var pool = ResearchPool.getInstance();
                //pool.completedResearchNames.push(that.label);
                if (that.isSelected) {
                    that.isSelected = false;
                    game.nextRoundGold += that.cost;
                }
                else {
                    that.isSelected = true;
                    game.nextRoundGold -= that.cost;
                }
            },
            x:x,
            y:y,
            width:300,
            height:70,
            type:"research"
        });
    }
    this.applyEffect = function() {
        var stats = Stats.illnessToGoldDist[this.statsToChange];
        for (var i=0; i<stats.length; i++) {
            if (stats[i] > that.changeAmount){
                stats[i] += that.changeAmount;
            }
        }
    }
}

Research.AllResearches = [
    new Research({
        tag:"toothache",
        cost:30,
        label:"Vampire Floss",
        description:"Educate vampires to use floss!",
        statsToChange:"toothache",
	changeAmount:-5
    }),
    new Research({
        tag:"bpoisoning",
        cost:5000,
        label:"Stomach Dialysis Machine",
        description:"Quickly cleans up poisoned blood",
        statsToChange:"bpoisoning",
	changeAmount:-20
    }),
   new Research({
	tag:"congestion",
	cost:40,
	label:"Dragon Nettie Kettle",
	description:"Clear up congestion the old fashioned way",
	statsToChange:"congestion",
	changeAmount:-10
	}),
   new Research({
	tag:"cancer",
	cost:5000,
	label:"Dragon Iron Lung",
	description:"Helps dragon's breathe during surgery",
	statsToChange:"cancer",
	changeAmount:-5
	}),
   new Research({
	tag:"hairLoss",
	cost: 20,
	label:"Wolfgaine",
	description:"Recover your confidence in 6 weeks or less",
	statsToChange:"hairLoss",
	changeAmount:-5
	}),
   new Research({
	tag:"sPoisoning",
	cost:10000,
	label:"Metal Detector",
	description:"Track down the poisoning silver",
	statsToChange:"sPoisoning",
	changeAmount:-30
	})
];

