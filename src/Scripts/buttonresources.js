function ButtonResources() {}

ButtonResources.nextLevelButton = new Button({
    text : "",
    clickedFunc : function() {
        var game = GameController.getInstance();
        game.switchMode("frenzy");
    },
    x:850,
    y:575,
    width:150,
    height:65
});

ButtonResources.startGameButton = new Button({
    text : "",
    clickedFunc : function() {
        var game = GameController.getInstance();
        game.resetCounters();
        game.switchMode("frenzy");
    },
    x:360,
    y:400,
    width:280,
    height:60
});

ButtonResources.creditsButton = new Button({
    text : "",
    clickedFunc : function() {
        var game = GameController.getInstance();
        game.switchMode("credits");
    },
    x:360,
    y:540,
    width:280,
    height:60
});

ButtonResources.tutorialButton = new Button({
    text : "",
    clickedFunc : function() {
        var game = GameController.getInstance();
        game.switchMode("tutorial");
    },
    x:360,
    y:470,
    width:280,
    height:60
});

ButtonResources.mainMenuButton = new Button({
    text : "",
    clickedFunc : function() {
        var game = GameController.getInstance();
        game.switchMode("entry");
    },
    x:65,
    y:18,
    width:125,
    height:46
});

ButtonResources.backButton = new Button({
    text : "",
    clickedFunc : function() {
        var game = GameController.getInstance();
        game.switchMode("entry");
    },
    x:670,
    y:520,
    width:240,
    height:90
});