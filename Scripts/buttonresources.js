function ButtonResources() {}

ButtonResources.nextLevelButton = new Button({
    text : "Next month",
    clickedFunc : function() {
        var game = GameController.getInstance();
        game.switchMode("frenzy");
    },
    x:800,
    y:500,
    width:150,
    height:70
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
    y:470,
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
    y:540,
    width:280,
    height:60
});

ButtonResources.mainMenuButton = new Button({
    text : "Main Menu",
    clickedFunc : function() {
        var game = GameController.getInstance();
        game.switchMode("entry");
    },
    x:850,
    y:20,
    width:150,
    height:50
});

