function Research(data) {
    this.tag = data.tag;
    this.cost = data.cost;
    this.label = data.label;
    this.description = data.description;
    this.statsToChange = data.statsToChange;
    this.changeAmount = data.changeAmount;
    this.isSelected = false;
    this.isApplied = false;
    this.icon = data.icon;
    var that = this;
    this.generateButton = function(x,y) {
        this.isSelected = false;
        return new Button({
            type:"research",
            text : that.label,
	    research : that,
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
		    game.nextRoundResearchGold += that.cost;
                }
                else {
                    that.isSelected = true;
                    game.nextRoundGold -= that.cost;
		    game.nextRoundResearchGold -= that.cost;
                }
            },
            x:x,
            y:y,
            width:320,
            height:120,
        });
    }
    this.applyEffect = function() {
	this.isApplied = true;
	if (!this.statsToChange) return;	
	var stats = Stats.illnessToGoldDist[this.statsToChange];
        for (var i=0; i<stats.length; i++) {
            if (stats[i] > -that.changeAmount){
                stats[i] += that.changeAmount;
            }
        }
    }
}

Research.AllResearches = [

   new Research({
	tag:"hairLoss",
	cost: 200,
	label:"Wolfgane",
	description:"Recover your confidence within 6 weeks",
	statsToChange:"hairLoss",
	changeAmount:-15,
	icon: ImageResources.images["werewolf"]["hairLoss"]["small"]
	}),
   new Research({
	tag:"bling",
	cost:450,
	label:"Diamond",
	description:"Diamonds are a girl's best friend",
//	statsToChange:"sPoisoning",
//	changeAmount:-30,
	icon: ImageResources.images["bling"]
	}),
	new Research({
	tag:"cancer",
	cost:5000,
	label:"Dragon Iron Lung",
	description:"Helps dragons catch their breath",
	statsToChange:"cancer",
	changeAmount:-15,
	icon: ImageResources.images["dragon"]["cancer"]["small"]
	}),
	new Research({
	tag:"congestion",
	cost:400,
	label:"Dragon Nettie Kettle",
	description:"Empty those nasal cavities",
	statsToChange:"congestion",
	changeAmount:-30,
	icon: ImageResources.images["dragon"]["congestion"]["small"]
	}),
	new Research({
	tag:"bling",
	cost:800,
	label:"Statue",
	description:"For posterity's sake",
	statsToChange:"congestion",
	changeAmount:-30,
	icon: ImageResources.images["bling"]
	}),
    new Research({
        tag:"toothache",
        cost:300,
        label:"Vampire Floss",
        description:"Educate vampires to use floss",
        statsToChange:"toothache",
	changeAmount:-15,
	icon: ImageResources.images["vampire"]["toothache"]["small"]//image
    }),
   new Research({
	tag:"bling",
	cost:10000,
	label:"Porsche",
	description:"Like driving a cloud",
//	statsToChange:"sPoisoning",
//	changeAmount:-30,
	icon: ImageResources.images["bling"]
	}),
    new Research({
        tag:"bPoisoning",
        cost:5000,
        label:"Stomach Dialysis Machine",
        description:"Quickly cleans up poisoned blood",
        statsToChange:"bpoisoning",
	changeAmount:-60,
	icon: ImageResources.images["vampire"]["bPoisoning"]["small"]
    }),
   new Research({
	tag:"sPoisoning",
	cost:10000,
	label:"Metal Detector",
	description:"Track down poisonous silver",
	statsToChange:"sPoisoning",
	changeAmount:-30,
	icon: ImageResources.images["werewolf"]["sPoisoning"]["small"]
	}),
];

