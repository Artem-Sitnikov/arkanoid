 function Balls ( img, width, height) {
     PIXI.Sprite.call(this);
     this.texture = PIXI.Texture.fromImage(img);
     this.name = name;
     this.width = width;
     this.height = height;
     this.anchor.set(0.5);
     this.interactive = true;
     this.moveAngle = 0;

 }

 Balls.prototype = Object.create(PIXI.Sprite.prototype);

 Balls.prototype.start = function(){
     this.ballFlag = true;
     this.flagMoveBall = true;
     this.background.off("pointerdown", this.balls[0].start, this);
 };

 Balls.prototype.moveBall = function (delta, balls, ballsSpeed, checkCollision){
     for(var i = 0; i < balls.length; i++){
         if (balls[i]) {
             balls[i].rotation += 0.01 * delta;
         }
     }
         for (var step = 0; step < ballsSpeed; step++){
             for (var p = 0; p < balls.length; p++){
                 if (balls[p]){
                     balls[p].x += Math.cos(balls[p].moveAngle);
                     balls[p].y += Math.sin(balls[p].moveAngle);
                     checkCollision(balls[p]);
                 }
             }
         }
 };

 Balls.prototype.angleCalc = function(ball, collision){
     var bx = Math.cos(ball.moveAngle);
     var by = Math.sin(ball.moveAngle);
     if (collision === "left" ) {
         if (bx > 0){
             bx *= -1;
         }
     } else if ( collision === "top") {
         if (by > 0){
             by *= -1;
         }
     } else if (collision === "bottom" ) {
         if (by < 0){
             by *= -1;
         }
     } else if (collision === "right" ) {
         if(bx < 0){
             bx *= -1;
         }
     } else if (collision === "angle") {
         bx *= -1;
         by *= -1;
     }
     ball.moveAngle = Math.atan2(by, bx);
 };

 Balls.prototype.leftAngle = function (ball) {
     ball.moveAngle = Math.random() * (-Math.PI / 6) + (-Math.PI / 2);
 };

 Balls.prototype.rightAngle = function (ball) {
     ball.moveAngle = Math.random() * (-Math.PI / 6) + (-Math.PI / 3);
 };