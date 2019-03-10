function Background (img, width, height) {
    PIXI.Sprite.call(this);
    this.texture = PIXI.Texture.fromImage(img);
    this.width = width;
    this.height = height;
    this.anchor.set(0);
    this.interactive = true;
}

Background.prototype = Object.create(PIXI.Sprite.prototype);