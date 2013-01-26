function Stats() {}

Stats.startingGold = 250;
Stats.startingPublicity = 50;
Stats.startingSubscribers = 50;
Stats.raceDist = ["vampire", "dragon", "werewolf"];

Stats.healingSpeed = 15;
Stats.dyingSpeed = 5;
Stats.maxHp = 40;

Stats.raceToIllnessDist = {
    "vampire" : ["toothache", "toothache", "bPoisoning", "cold", "cold", "cold"],
    "dragon" : ["cold", "cold", "cold", "congestion", "congestion", "cancer"],
    "werewolf" : ["cold", "cold", "cold", "hairLoss", "hairLoss", "sPoisoning"],
};

Stats.raceIllnessToHpDist = {
    "vampire" : {
        "cold" : [25, 30, 35],
	"toothache" : [20, 25, 30],
	"bPoisoning" : [15, 20, 25]
    },
    "dragon" : {
	"cold" : [25, 30, 35],
	"congestion" : [20, 25, 30],
	"cancer" : [15, 20, 25]
    },
    "werewolf" : {
	"cold" : [25, 30, 35],
	"hairLoss" : [20, 25, 30],
	"sPoisoning" : [15, 20, 25]
    }
};

Stats.illnessToPubDist = {
        "cold" : [1, 1, 2, 3],
	"toothache" : [1, 2],
	"bPoisoning" : [1],
	"congestion" : [2],
	"cancer" : [1],
	"hairLoss" : [2],
	"sPoisoning" : [1]
};

Stats.illnessToGoldDist = {
        "cold" : [5, 5, 10],
	"toothache" : [5, 10, 15],
	"bPoisoning" : [15, 20, 25],
	"congestion" : [5, 10, 15],
	"cancer" : [15, 20, 25],
	"hairLoss" : [5, 10, 15],
	"sPoisoning" : [15, 20, 25]
};

Stats.applyResearch = function(researchName){
    switch(researchName){
        case "toothache":
            if (Stats.illnessToGoldDist["toothache"] > 1){
                Stats.illnessToGoldDist["toothache"] -= 1;
            }
            break;
        case "bloodPoisoning":
            if (Stats.illnessToGoldDist["bPoisoning"] > 1){
                Stats.illnessToGoldDist["bPoisoning"] -= 1;
            }
            break;
        case "congestion":
            if (Stats.illnessToGoldDist["congestion"] > 1){
                Stats.illnessToGoldDist["congestion"] -= 1;
            }
            break;
        case "cancer":
            if (Stats.illnessToGoldDist["cancer"] > 1){
                Stats.illnessToGoldDist["cancer"] -= 1;
            }
            break;
        case "hairLoss":
            if (Stats.illnessToGoldDist["hairLoss"] > 1){
                Stats.illnessToGoldDist["hairLoss"] -= 1;
            }
            break;
    }
};

Stats.operatingCost = 50;
Stats.subscriberMultiplier = 2;
Stats.subscriberChange = function(publicity) {
    return Math.floor(publicity/10);
}
Stats.endTurnGoldChange = function(gold,publicity) {
    gold -= Stats.operatingCost;
    gold += (Stats.subscriberMultiplier * publicity);
    return gold;
};
