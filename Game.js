
var game = {};
var width = 1000;
var height = width;
var blockSize = height / 20;
var colors = [0xFF0000, 0xFF8000, 0xFFFF00, 0x00FF00, 0x00FFFF,  0x0000FF, 0xFF00FF];

window.addEventListener("load", function () {
  game = new Game();
  game.run();
}, false);

function Game() {

    this.width = 1000;
    this.height = 1000;
    this.app = new PIXI.Application(this.width, this.height, {backgroundColor: 0xC0C0C0});
    document.body.appendChild(this.app.view);
}

Game.prototype.tick = function () {
    var delta = game.app.ticker.elapsedMS;
    if(game.field && game.field.tick) {
        game.field.tick(delta);
    }
};

Game.prototype.run = function () {
    this.field = new Field();
    this.app.ticker.add(game.tick);
    this.app.stage.addChild(this.field);
};