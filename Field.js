function Field() {
    PIXI.Sprite.call(this);
    this.blockSize = blockSize;
    this.interactive = true;
    this.display = new PIXI.Text("0", new Display());
    this.updateTimeout = 10;
    this.ballsSpeed = 1 + (Math.floor(this.blockSize / 8));
    this.map = level1Map;

    this.win = new PIXI.Text ("You Win", new Wine());
    this.lose = new PIXI.Text ("You Lose", new Lose());

    this.children = [];
    this.timeLongPlayer = 10000;
    this.timeManyBalls = 500;
    this.timeFloor = 10000;
    this.gamePoints = 0;
    this.walls = [];
    this.boxes = [];
    this.balls = [];
    this.candy = 0;
    this.candy_1 = 0;
    this.candy_2 = 0;
    this.candy_3 = 0;
    this.arrayFloor = 0;
    this.bonuses = [];
    this.life = 5;
    this.ballFlag = false;
    this.flagMoveBonuses = false;
    this.flagMoveBall = false;
    this.flagCheckBonus = false;
    this.flagLongPlayer = false;
    this.flagManyBalls = false;
    this.flagNewFloor = false;

    this.addChildren();
    this.drawMap();
}

Field.prototype = Object.create(PIXI.Sprite.prototype);

Field.prototype.tick = function (delta) {

    if (this.flagMoveBonuses) this.moveBonuses(delta);
    if (this.flagCheckBonus) this.checkBonus(delta);
    if (this.flagLongPlayer) this.longPlayer(delta);
    if (this.flagManyBalls) this.manyBalls(delta);
    if (this.flagNewFloor) this.newFloor(delta);
    if (this.flagMoveBall) {
        for (var i = 0; i < this.balls.length; i++){
            if (this.balls[i]) {
                this.balls[i].moveBall(delta, this.balls, this.ballsSpeed, this.checkCollision.bind(this));
                return;
            }
        }
    }
};

Field.prototype.addChildren = function () {
    this.background = new Background("img/texture1.png", 15 * this.blockSize, 30 * this.blockSize / 2);
    this.addChild(this.background);

    this.reset = this.addChild(new Reset("reset", 'img/reset.png', 2 * this.blockSize, 2 * this.blockSize));
    this.reset.position.set( width - (2 * this.blockSize), this.blockSize);
    this.reset.on('pointerdown', this.restart, this);

    this.level1 = this.addChild( new Level("level1", 'img/level1.png', 2 * this.blockSize, this.blockSize, level1Map));
    this.level1.position.set( width - (2 * this.blockSize), 3 * this.blockSize);

    this.level2 = this.addChild( new Level("level2", 'img/level2.png', 2 * this.blockSize, this.blockSize, level2Map));
    this.level2.position.set( width - (2 * this.blockSize), 4 * this.blockSize);

    this.level1.on('pointerdown', this.level1.samlevel, this);
    this.level2.on('pointerup', this.level2.samlevel, this);

    this.display.position.set( 7 * this.blockSize, 31 * (this.blockSize / 2));
    this.display.text = "0";
    this.addChild(this.display);

};

Field.prototype.restart = function(){
    this.children = [];
    this.timeLongPlayer = 10000;
    this.timeManyBalls = 500;
    this.timeFloor = 10000;
    this.gamePoints = 0;
    this.walls = [];
    this.boxes = [];
    this.balls = [];
    this.candy = 0;
    this.candy_1 = 0;
    this.candy_2 = 0;
    this.candy_3 = 0;
    this.arrayFloor = 0;
    this.bonuses = [];
    this.life = 5;
    this.ballFlag = false;
    this.flagMoveBonuses = false;
    this.flagMoveBall = false;
    this.flagCheckBonus = false;
    this.flagLongPlayer = false;
    this.flagManyBalls = false;
    this.flagNewFloor = false;
    this.addChildren();
    this.drawMap();
    console.log("reset");
};

Field.prototype.drawMap = function () {
    for (var i = 0; i < this.map.length; i++) {
        for (var u = 0; u < this.map[i].length; u++) {
            if ("#" === this.map[i][u]) {
                this.wall = new Elem('img/wall.png', this.blockSize, this.blockSize / 2, "wall");
                this.wall.position.set(u * this.blockSize , i * this.blockSize / 2);
                this.walls.push(this.wall);
                this.addChild(this.walls[this.walls.length - 1]);

            } else if ("+" === this.map[i][u]) {
                this.box = new Elem('img/box.png', this.blockSize, this.blockSize / 2,  1);
                this.box.position.set(u * this.blockSize , i * this.blockSize / 2);
                this.boxes.push(this.box);
                this.addChild(this.boxes[this.boxes.length - 1]);

            } else if ("@" === this.map[i][u]) {
                this.player = this.addChild( new Player ('img/player.png', this.blockSize , this.blockSize / 2));
                this.player.position.set(u * this.blockSize , i * this.blockSize / 2);
                this.playerLeft = this.addChild( new Elem('img/Left.png', this.blockSize / 2, this.blockSize / 2, "playerLeft"));
                this.playerLeft.anchor.set(1,0);
                this.playerLeft.position.set(this.player.x, this.player.y);
                this.playerRight = this.addChild( new Elem('img/Right.png', this.blockSize / 2, this.blockSize / 2, "playerRight"));
                this.playerRight.position.set(this.player.x + this.player.width, this.player.y);
                this.background.on("pointermove", this.listenMovePlayer, this);

                this.balls[0] = this.addChild( new Balls ('img/ball.png', this.blockSize / 4,  this.blockSize / 4));
                this.balls[0].position.set((u * this.blockSize) + this.blockSize / 2 , (i * this.blockSize / 2) - this.blockSize / 8);
                this.balls[0].moveAngle = Math.random() * (-Math.PI / 3) + (-Math.PI / 3);
                this.background.on("pointerdown", this.balls[0].start, this);

            } else if ("." === this.map[i][u]) {
                this.candy_1 = new Elem('img/box.png', this.blockSize, this.blockSize / 2, "candy_1");
                this.candy_1.position.set(u * this.blockSize , i * this.blockSize / 2);
                this.addChild(this.candy_1);
                this.candy++;

            } else if ("$" === this.map[i][u]) {
                this.candy_2 = new Elem('img/box.png', this.blockSize, this.blockSize / 2, "candy_2");
                this.candy_2.position.set(u * this.blockSize , i * this.blockSize / 2);
                this.addChild(this.candy_2);
                this.candy++;

            } else if ("*" === this.map[i][u]) {
                this.candy_3 = new Elem('img/box.png', this.blockSize, this.blockSize / 2, "candy_3");
                this.candy_3.position.set(u * this.blockSize , i * this.blockSize / 2);
                this.addChild(this.candy_3);
                this.candy++;
            }
        }
    }
};

Field.prototype.listenMovePlayer = function (e) {
    this.player.movePlayer(this.blockSize, this.player, this.playerLeft, this.playerRight, this.ballFlag, this.balls, e);
};

Field.prototype.checkCollision = function (ball){
    var collisionWall = 0;
    var collisionBox = 0;
    this.collisionListElem = [];
    this.collisionListBox = [];

    for (var i = 0; i < this.walls.length; i++){
        collisionWall = this.calcIntersection(ball.x, ball.y, ball.width/2, this.walls[i].x, this.walls[i].y, this.walls[i].width, this.walls[i].height);

        if(collisionWall){
            this.collisionListElem.push(collisionWall);
        }
    }

    for (var i = 0; i < this.boxes.length; i++){
        collisionBox = this.calcIntersection(ball.x, ball.y, ball.width/2, this.boxes[i].x, this.boxes[i].y, this.boxes[i].width, this.boxes[i].height);

        if(collisionBox){
            this.collisionListElem.push(collisionBox);
            this.collisionListBox.push(this.boxes[i]);
        }
    }

    var collisionPlayer = this.calcIntersection(ball.x, ball.y, ball.width/2, this.player.x, this.player.y, this.player.width, this.player.height);
    if(collisionPlayer){
        this.collisionListElem.push(collisionPlayer);
    }

    this.samCandy(ball, this.candy_1, "candy_1", "longPlayer", 'img/candy_1.png');
    this.samCandy(ball, this.candy_2, "candy_2", "manyBalls", 'img/candy_2.png');
    this.samCandy(ball, this.candy_3, "candy_3", "floor", 'img/candy_3.png');

    if (this.arrayFloor !== 0) {
        for (var i = 0; i < this.arrayFloor.length; i++) {
            var collisionFloor = this.calcIntersection(ball.x, ball.y, ball.width/2, this.arrayFloor[i].x, this.arrayFloor[i].y, this.arrayFloor[i].width, this.arrayFloor[i].height);

            if (collisionFloor) {
                this.collisionListElem.push(collisionFloor);
            }
        }
    }

    this.sideDefinition(ball);

    var collisioLeft = this.calcIntersection(ball.x, ball.y, ball.width/2, this.playerLeft.x - (this.blockSize / 2), this.playerLeft.y, this.playerLeft.width, this.playerLeft.height);
    var collisioRight = this.calcIntersection(ball.x, ball.y, ball.width/2, this.playerRight.x, this.playerRight.y, this.playerRight.width, this.playerRight.height);

    if (collisioLeft){
        ball.leftAngle(ball);
    }

    if (collisioRight){
        ball.rightAngle(ball);
    }

    this.destructionBoxes();

    this.youWinner();

    this.ballOut();

    this.youLoser();

};

Field.prototype.calcIntersection = function (cx, cy, cr, rx, ry, rw, rh) {

    //далеко слева
    if (cx + cr < rx) return false;
    //далеко справа
    if (cx > rx + rw) return false;
    //далеко вверху
    if (cy + cr < ry) return false;
    //далеко внизу
    if (cy - cr > ry + rh) return false;

    //пересечение есть - определяем грань
    var edges = [];
    if (this.isCircleIntersectLine(cx, cy, cr, rx, ry, rx + rw, ry)) edges.push("top");
    if (this.isCircleIntersectLine(cx, cy, cr, rx, ry, rx, ry + rh)) edges.push("left");
    if (this.isCircleIntersectLine(cx, cy, cr, rx + rw, ry, rx + rw, ry + rh)) edges.push("right");
    if (this.isCircleIntersectLine(cx, cy, cr, rx, ry + rh, rx + rw, ry + rh)) edges.push("bottom");

    return (edges);
};

Field.prototype.isCircleIntersectLine = function (cx, cy, cr, p1x, p1y, p2x, p2y) {
    var x01 = p1x - cx;
    var y01 = p1y - cy;
    var x02 = p2x - cx;
    var y02 = p2y - cy;

    var dx = x02 - x01;
    var dy = y02 - y01;

    var a = dx * dx + dy * dy;
    var b = (x01 * dx + y01 * dy) * 2;
    var c = x01 * x01 + y01 * y01 - cr * cr;

    if (-b < 0) return (c < 0);
    if (-b < (a * 2)) return (4 * a * c - b * b < 0);
    return (a + b + c < 0);
};

Field.prototype.sideDefinition = function (ball) {
    if(this.collisionListElem.length > 0){
        if (this.collisionListElem[0].length > 0){
            var a = 0;
            var b = 0;
            var c = 0;
            var d = 0;
            var col = 0;
            for(var k = 0; k < this.collisionListElem.length; k++){
                for(var u = 0; u < this.collisionListElem[k].length; u++ ){
                    if (this.collisionListElem[k][u] === "bottom" ){
                        a++;
                    } else if (this.collisionListElem[k][u] === "right"){
                        c++;
                    } else if (this.collisionListElem[k][u] === "top"){
                        b++;
                    } else if (this.collisionListElem[k][u] === "left"){
                        d++;
                    }
                }
            }
            if (a>b && a>c && a>d) {
                col = "bottom";
            } else if (b>a && b>c && b>d) {
                col = "top";
            } else if (c>a && c>b && c>d){
                col = "right";
            } else if (d>a && d>b && d>c) {
                col = "left";
            } else if(a > 0 && (a===c || a===d)) {
                col = "bottom";
            } else if(b > 0 && (b===c || b===d)) {
                col = "top";
            } else {
                debugger;
            }
            ball.angleCalc(ball, col);
        }
    }
};

Field.prototype.destructionBoxes = function () {
    for (var i = 0; i < this.collisionListBox.length; i++){
        if (this.collisionListBox[i].armor > 0){
            this.collisionListBox[i].armor--;
        }
        if(this.collisionListBox[i].armor === 0){
            for (var u = 0; u < this.boxes.length; u++){
                if (this.collisionListBox[i].x === this.boxes[u].x && this.collisionListBox[i].y === this.boxes[u].y){
                    this.removeChild(this.boxes[u]);
                    this.boxes.splice(u,1);
                    this.gamePoints += Math.floor(Math.random() * 26) + 100;
                    this.display.text = "" + this.gamePoints;
                }
            }
        }
    }
};

Field.prototype.samCandy = function(ball, candy, candy_, nameCandy, imgCandy){
    if (candy !== 0){
        if (candy.armor === candy_){

            var collisionCandy = this.calcIntersection(ball.x, ball.y, ball.width/2, candy.x, candy.y, candy.width, candy.height);

            if (collisionCandy){
                candy.armor = nameCandy;
                this.collisionListElem.push(collisionCandy);
                candy.texture = PIXI.Texture.fromImage(imgCandy);
                candy.width = this.blockSize / 2;
                this.gamePoints += Math.floor(Math.random() * 26) + 100;
                this.display.text = "" + this.gamePoints;
                this.flagMoveBonuses = true;
                this.bonuses.push(candy);
                this.candy--;
            }
        }
    }
};

Field.prototype.youWinner = function () {
    if (this.boxes.length === 0 && this.candy < 1) {
        // debugger;
        this.win.position.set(this.blockSize * 4, this.blockSize * 6);
        this.addChild (this.win);
        this.ballFlag = false;
        this.background.off("pointermove", this.listenMovePlayer, this);
        this.flagMoveBall = false;
        this.flagMoveBonuses = false;
        this.background.off("pointerdown", this.balls[0].start, this);

    }
};

Field.prototype.youLoser = function () {
    if (this.life === 0){
        this.flagMoveBall = false;
        this.lose.position.set(this.blockSize * 4, this.blockSize * 6);
        this.addChild (this.lose);
        this.ballFlag = false;
        this.flagMoveBonuses = false;
        this.background.off("pointermove", this.listenMovePlayer, this);
        this.background.off("pointerdown", this.balls[0].start, this);
    }
};

Field.prototype.ballOut = function () {
    var p = 0;
    for (var i = 0; i < this.balls.length; i++){
        if (this.balls[i]){
            if (this.balls[i].y > ((this.blockSize / 2) * 30)){
                this.life--;
                this.removeChild(this.balls[i]);
                this.balls.splice(i,1);
            }
        }
    }
    for (var u = 0; u < this.balls.length; u++){
        if (!this.balls[u]) {
            p++;
        }
    }
    if (p === this.balls.length) {
        this.balls = [];
    }
    if (this.balls.length === 0){
        this.balls[0] = this.addChild( new Balls ('img/ball.png', this.blockSize / 4,  this.blockSize / 4));
        this.balls[0].position.set(this.player.x + this.player.width / 2, this.player.y - this.blockSize / 8);
        this.balls[0].moveAngle = Math.random() * (-Math.PI / 3) + (-Math.PI / 3);
        this.flagMoveBall = false;
        this.background.on("pointerdown", this.balls[0].start, this);
        this.ballFlag = false;
    }
};

Field.prototype.moveBonuses = function (delta) {
    if(this.updateTimeout > 0) {
        this.updateTimeout -= delta;
    } else {
        this.updateTimeout += 10;
        for (var i = 0; i < this.bonuses.length; i++){
            this.bonuses[i].y += 3;

            if (this.bonuses[i].y > (this.blockSize / 2) * 31) {
                this.deleteBonus(this.bonuses[i]);
            }
        }
    }
    this.flagCheckBonus = true;
};

Field.prototype.deleteBonus = function (candy) {
    for (var i = 0; i < this.bonuses.length; i++) {
        if (this.bonuses[i].armor === candy.armor) {
            this.bonuses.splice(i,1);
        }
    }
    this.removeChild(candy);
};

Field.prototype.checkBonus = function () {

    if (this.candy_1 !== 0) {
        if (this.candy_1.armor === "longPlayer"){
            var pLeft = this.calcIntersection(this.candy_1.x, this.candy_1.y, this.candy_1.width/2, this.playerLeft.x - (this.blockSize / 2), this.playerLeft.y, this.playerLeft.width, this.playerLeft.height);
            var pRight = this.calcIntersection(this.candy_1.x, this.candy_1.y, this.candy_1.width/2, this.playerRight.x, this.playerRight.y, this.playerRight.width, this.playerRight.height);
            var player = this.calcIntersection(this.candy_1.x, this.candy_1.y, this.candy_1.width/2, this.player.x, this.player.y, this.player.width, this.player.height);

            if (pLeft || pRight || player) {
                this.deleteBonus(this.candy_1);
                this.player.width = this.blockSize * 3;
                this.playerRight.x = this.player.x + this.blockSize * 3;
                this.candy_1 = 0;
                this.flagLongPlayer = true;
            }
        }
    }

    if (this.candy_2 !== 0) {
        if (this.candy_2.armor === "manyBalls") {
            var pLeft = this.calcIntersection(this.candy_2.x, this.candy_2.y, this.candy_2.width/2, this.playerLeft.x - (this.blockSize / 2), this.playerLeft.y, this.playerLeft.width, this.playerLeft.height);
            var pRight = this.calcIntersection(this.candy_2.x, this.candy_2.y, this.candy_2.width/2, this.playerRight.x, this.playerRight.y, this.playerRight.width, this.playerRight.height);
            var player = this.calcIntersection(this.candy_2.x, this.candy_2.y, this.candy_2.width/2, this.player.x, this.player.y, this.player.width, this.player.height);

            if (pLeft || pRight || player) {
                this.deleteBonus(this.candy_2);
                this.candy_2 = 0;
                this.newBalls = 1;
                this.life += 10;
                this.flagManyBalls = true;
            }
        }
    }

    if (this.candy_3 !== 0) {
        if (this.candy_3.armor === "floor") {
            var pLeft = this.calcIntersection(this.candy_3.x, this.candy_3.y, this.candy_3.width/2, this.playerLeft.x - (this.blockSize / 2), this.playerLeft.y, this.playerLeft.width, this.playerLeft.height);
            var pRight = this.calcIntersection(this.candy_3.x, this.candy_3.y, this.candy_3.width/2, this.playerRight.x, this.playerRight.y, this.playerRight.width, this.playerRight.height);
            var player = this.calcIntersection(this.candy_3.x, this.candy_3.y, this.candy_3.width/2, this.player.x, this.player.y, this.player.width, this.player.height);

            if (pLeft || pRight || player) {
                this.deleteBonus(this.candy_3);
                this.candy_3 = 0;
                this.arrayFloor = [];
                for (var i = 0; i < 15; i++) {
                    this.arrayFloor.push( this.addChild( new Elem('img/wall.png', this.blockSize, this.blockSize / 2, "wall")));
                    this.arrayFloor[i].position.set(i * this.blockSize, 29.5 * (this.blockSize / 2));
                }
                this.flagNewFloor = true;
            }
        }
    }
};

Field.prototype.longPlayer = function (delta) {
    if(this.timeLongPlayer > 0) {
        this.timeLongPlayer -= delta;
    } else {
        this.timeLongPlayer = 5000;
        this.player.width = this.blockSize;
        this.playerRight.x = this.player.x + this.blockSize;
        this.flagLongPlayer = false;
    }
};

Field.prototype.manyBalls = function (delta) {
    if (this.ballFlag) {
        if (this.timeManyBalls > 0) {
            this.timeManyBalls -= delta;
        } else if (this.newBalls < 10) {
            this.timeManyBalls = 500;
            this.balls[this.newBalls] = this.addChild(new Balls('img/ball.png', this.blockSize / 4, this.blockSize / 4));
            this.balls[this.newBalls].position.set(this.player.x + (this.player.width / 2), this.player.y - this.blockSize / 8);
            this.balls[this.newBalls].moveAngle = Math.random() * (-Math.PI / 3) + (-Math.PI / 3);

            this.newBalls++;
        } else {
            this.timeManyBalls = 500;
            this.flagManyBalls = false;
        }
    }
};

Field.prototype.newFloor = function (delta) {
    if (this.timeFloor > 0) {
        this.timeFloor -= delta;
    } else {
        this.timeFloor = 10000;
        for (var i = 0; i < 15; i++){
            this.removeChild(this.arrayFloor[i]);
        }
        this.arrayFloor = 0;
        this.flagNewFloor = false;
    }
};