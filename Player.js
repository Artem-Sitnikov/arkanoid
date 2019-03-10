function Player  ( img, width, height) {
    PIXI.Sprite.call(this);
    this.texture = PIXI.Texture.fromImage(img);
    this.width = width;
    this.height = height;
    this.anchor.set(0);
    this.interactive = true;
}

Player.prototype = Object.create(PIXI.Sprite.prototype);

Player.prototype.movePlayer = function (blockSize, player, playerLeft, playerRight, ballFlag, balls, e) {
    if (e.data.global.x > blockSize && e.data.global.x < (14 * blockSize - player.width)) {
        player.x = e.data.global.x;
        playerLeft.x = e.data.global.x;
        playerRight.x = e.data.global.x + player.width;
    }
    if ((e.data.global.x - (blockSize / 2)) < blockSize) {
        player.x = blockSize + (blockSize / 2);
        playerLeft.x = blockSize + (blockSize / 2);
        playerRight.x = player.x + player.width;
    }
    if ((e.data.global.x + (blockSize / 2)) > (14 * blockSize - player.width)) {
        player.x = (14 * blockSize - player.width) - (blockSize / 2);
        playerLeft.x = player.x;
        playerRight.x = player.x + player.width;
    }
    if (!ballFlag && e.data.global.x > blockSize && e.data.global.x < (14 * blockSize - player.width)) {
        balls[0].x = e.data.global.x + (player.width / 2);
    }
    if (!ballFlag && e.data.global.x < blockSize) {
        balls[0].x = blockSize + (player.width / 2);
    }
    if (!ballFlag && e.data.global.x > (14 * blockSize - player.width)) {
        balls[0].x = (14 * blockSize - player.width) + (player.width / 2);
    }
};
