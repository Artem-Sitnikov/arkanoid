function Elem  ( img, width, height, armor) {
    PIXI.Sprite.call(this);
    this.texture = PIXI.Texture.fromImage(img);
    this.width = width;
    this.height = height;
    this.anchor.set(0);
    this.interactive = false;
    this.armor = armor;
}

Elem.prototype = Object.create(PIXI.Sprite.prototype);