function Stats() {}

Stats.raceDist = ["vampire", "dragon", "werewolf"];
Stats.raceToIllnessDist = {
    "vampire" : ["toothache", "toothache", "bPoisoning", "cold", "cold", "cold"],
    "dragon" : ["cold", "cold", "cold", "congestion", "congestion", "cancer"],
    "werewolf" : ["cold", "cold", "cold", "hairLoss", "hairLoss", "sPoisoning"],
};

Stats.raceIllnessToHpDist = {
    "vampire" : {
        "cold" : [15, 20, 25],
	"toothache" : [10, 15, 20],
	"bPoisoning" : [5, 10, 15]
    },
    "dragon" : {
	"cold" : [15, 20, 25],
	"congestion" : [10, 15, 20],
	"cancer" : [5, 10, 15]
    },
    "werewolf" : {
	"cold" : [15, 20, 25],
	"hairLoss" : [10, 15, 20],
	"sPoisoning" : [5, 10, 15]
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
        "cold" : [1],
	"toothache" : [2],
	"bPoisoning" : [3],
	"congestion" : [2],
	"cancer" : [3],
	"hairLoss" : [2],
	"sPoisoning" : [3]
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
}