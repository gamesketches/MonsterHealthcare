function Stats() {}

Stats.startingGold = 500;
Stats.startingPublicity = 0;
Stats.startingSubscribers = 100;
Stats.raceDist = ["vampire", "vampire", "vampire", "dragon", "dragon", "werewolf", "werewolf", "werewolf"];

Stats.publicityPenaltyMultiplier = 5;
Stats.maxPublicity = 50;
Stats.minPublicity = -50;

Stats.healingSpeed = 15;
Stats.dyingSpeed = 5;
Stats.maxHp = 40;
Stats.maxMoney = 1000;

Stats.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

Stats.raceToIllnessDist = {
    "vampire" : ["toothache", "toothache", "bPoisoning", "cold", "cold", "cold", "cold", "toothache"],
    "dragon" : ["cold", "cold", "cold", "cold", "congestion", "congestion", "cancer"],
    "werewolf" : ["cold", "cold", "cold", "cold", "hairLoss", "hairLoss", "sPoisoning"],
};

Stats.illnessDescription = {
    "cold" : "Cold",
    "toothache" : "Chipped tooth",
    "bPoisoning" : "Blood poisoning",
    "congestion" : "Nasal congestion",
    "cancer" : "Lung cancer",
    "hairLoss" : "Balding",
    "sPoisoning" : "Silver poisoning"
};

Stats.raceIllnessToHpDist = {
    "vampire" : {
        "cold" : [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
	"toothache" : [20,21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
	"bPoisoning" : [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
    },
    "dragon" : {
	"cold" : [25, 26, 27, 28, 28, 30, 31, 32, 33, 34, 35],
	"congestion" : [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
	"cancer" : [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
    },
    "werewolf" : {
	"cold" : [25, 26, 27, 28, 28, 30, 31, 32, 33, 34, 35],
	"hairLoss" : [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
	"sPoisoning" :[15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
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
        "cold" : [15, 15, 30],
	"toothache" : [15, 30, 45],
	"bPoisoning" : [45, 60, 75],
	"congestion" : [15, 30, 45],
	"cancer" : [45, 60, 75],
	"hairLoss" : [15, 30, 45],
	"sPoisoning" : [45, 60, 75]
};

Stats.raceNames = {
    "vampire" : ["Victor von Helsing", "Virgil von Helsing", "Vladimir von Helsing", "Vlad von Helsing", "Walter von Helsing", "Warren von Helsing", "Xavier von Helsing", "Vorigan von Helsing", "Zachariah von Helsing", "Saxon von Helsing", "Sebastian von Helsing", "Seth von Helsing", "Silas von Helsing", "Simon von Helsing", "Sirius von Helsing", "Spike von Helsing", "Stelian von Helsing", "Sterling von Helsing", "Strix von Helsing", "Thomas von Helsing", "Timothy von Helsing", "Ulysses von Helsing", "Vasile von Helsing", "Reginald von Helsing", "Remus von Helsing", "Reyes von Helsing", "Roderick von Helsing", "Rufus von Helsing", "Ruse von Helsing", "Nathaniel von Helsing", "Nathan von Helsing", "Neculai von Helsing", "Nelo von Helsing", "Nicholas von Helsing", "Nicu von Helsing", "Niles von Helsing", "Nostro von Helsing", "Obediah von Helsing", "Octavian von Helsing", "Orsova von Helsing", "Owen von Helsing", "Patrick von Helsing", "Perry von Helsing", "Radu von Helsing", "Raymond von Helsing", "Marcus von Helsing", "Marius von Helsing", "Mathias von Helsing", "Maxwell von Helsing", "Mordecai von Helsing"],
    "dragon" : ["Richard Razortooth", "Freddy Fatlips", "Bert the Bloody", "Daniel Dragoneel", "Dirk the Destroyer", "Viola Vulgaris", "Larry Lavalungs", "Vicky the Vile", "Victor the Vicious", "Cindy the Cunning", "Casper the Cruel", "Ingrid the Insidious", "Nancy the Nefarious", "Max the Maniacal", "Manfred Malefic", "Alexa the Atrocious", "Curt the Crusher", "Gabriela Goldeneyes", "Sandy the Scabby", "Carol Creepy", "Denise the Disturbed", "Felix the Frail", "Sam the Stormseeker", "Sally Strange", "Uncle Ugly", "Sofia the Squeeler", "Monique the Moaner", "Ben the Boiler", "Sandra the Smelter", "David the Dissolver", "Donald the Disintegrater", "Lisa the Liquefyer", "Mary the  Mellow", "Maria the Meek", "Frances the Feeble", "Frank the Faint", "Ned the Needless", "Barbara the Bewildered", "Margaret Male", "Patty the Pathetic", "Paula the Psychotic", "Greg the Garrulous", "Helen the Hallowed", "Alice the Angry", "Amanda the Absorbed", "Debra the Difficult", "Christine the Crooked", "Otto the Overrated", "Rob the Rabid", "Ingrid the Ill-informed"],
    "werewolf" : ["Fido", "Scruffy", "Harry", "Brutus", "Felix", "Muffin", "Cujo", "Fluffy", "Bruno", "Fidel", "Mr. Piffels", "Pablo", "Rover", "Maddy", "Layla", "Misty", "Pervis", "Otis", "Roscoe", "Rufus", "Elrod", "Diesel", "Brock", "Buttons", "Jericho", "Fritz", "Gunther", "Jaeger", "Manfred", "Luther", "Bo", "Cletus", "Buck", "Dino", "T-Bone", "Tess", "Thudpaw", "Toby", "Nacho", "Jag", "Jethro", "Elias", "Camus", "Cecil", "Checkers", "Lavender", "Spot", "Lobo", "Lucky", "Lulu"
],
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

Stats.operatingCost = 100;
Stats.changeOperatingCost = function() {
    Stats.operatingCost = Math.floor(Stats.operatingCost * 1.075);
};
Stats.subscriberMultiplier = 4;
Stats.subscriberChange = function(publicity, subscribers, death) {
	var answer = 0;
	if(publicity > 40){
			answer = Math.floor(subscribers * 0.1);
		}
	else if(publicity <= 40 && publicity > 30) {
			answer = Math.floor(subscribers * 0.08);
		}
	else if(publicity <= 30 && publicity > 20) {
			answer = Math.floor(subscribers * 0.05);
		}
	else if(publicity <= 20 && publicity > 10) {
			answer = Math.floor(subscribers * 0.03);
		}
	else if(publicity <= 10 && publicity >= 0) {
			answer = Math.floor(subscribers * 0.02);
		}
	else if(publicity < 0 && publicity > -10) {
			answer = Math.floor(subscribers * -0.01);
		}
	else if(publicity <= -10 && publicity > -20) {
			answer = Math.floor(subscribers * -0.04);
		}
	else if(publicity <= -20 && publicity > -30) {
			answer = Math.floor(subscribers * -0.08);
		}
	else if(publicity <= -30 && publicity > -40) {
			answer = Math.floor(subscribers * -0.12);
		}
	else {
		answer = Math.floor(subscribers * -0.2);
		}

	if(publicity < -20 && subscribers < 50) {
		answer = -20;
	}
	if (death) {
	    answer -= death;
	}
	return answer;
			
    //return Math.floor(publicity/10);
};

Stats.endTurnGoldChange = function(gold, publicity, subscribers) {
    gold -= Stats.operatingCost;
    gold += (Stats.subscriberMultiplier * subscribers);
    return gold;
};
