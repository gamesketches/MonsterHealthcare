function ResearchPool() {
    this.completedResearchNames = [];
    this.researchInScreen;
    this.getAvailableResearchButtons = function() {
        this.researchInScreen = [];
        var buttonArray = [];
        var targetCount = 3;
        var x = 600;
        var y = 200;
        for (var i=0; i<Research.AllResearches.length; i++) {
            if (!Research.AllResearches[i].isApplied) {
                this.researchInScreen.push(Research.AllResearches[i]);
                buttonArray.push(Research.AllResearches[i].generateButton(x,y));
                y += 80;
            }
            if (buttonArray.length == targetCount) {
                break;
            }
        }
        return buttonArray;
    }
    this.applyChosenResearches = function() {
        for (var i=0; i<this.researchInScreen.length; i++) {
            if (this.researchInScreen[i].isSelected) {
                this.researchInScreen[i].applyEffect();
                this.completedResearchNames.push(this.researchInScreen[i].label);
            }
        }
    }
}

ResearchPool.getInstance = function()
{
    if (ResearchPool.instance == undefined) ResearchPool.instance = new ResearchPool();
    return ResearchPool.instance;
}