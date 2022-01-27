function Ball(info) {
  this.radius = info.radius;
  this.x = info.x;
  this.y = info.y;
  this.frameCount = 0;
  this.xVel = info.xVel;
  this.yVel = info.yVel;
  this.img = new Image();
  this.img.src = "./images/ant-walk.png";
  this.show = function () {
    const no = 8;
    const totalNo = 62;
    const index = this.frameCount % totalNo;
    const yIndex = Math.floor(index / no);
    const xIndex = index % no;
    const w = 50;
    const h = 100;
    context.save();
    let ratio = this.yVel / this.xVel;
    context.translate(this.x, this.y);
    if (this.xVel < 0 && this.yVel < 0) {
      context.rotate(Math.atan(ratio) - Math.PI / 2);
    } else if (this.xVel > 0 && this.yVel < 0) {
      context.rotate(Math.atan(ratio) + Math.PI / 2);
    } else if (this.xVel < 0 && this.yVel > 0) {
      context.rotate(Math.atan(ratio) - Math.PI / 2);
    } else {
      context.rotate(Math.atan(ratio) + Math.PI / 2);
    }
    context.drawImage(
      this.img,
      xIndex * w,
      yIndex * h,
      w,
      h,
      -this.radius,
      -this.radius,
      this.radius * 2,
      this.radius * 2
    );
    context.restore();

    this.frameCount++;
  };
  this.update = function () {
    if (this.x + this.radius >= width) {
      this.x=width-this.radius;
      this.xVel *= -1;
    }
    if (this.x - this.radius <= 0) {
      this.x=this.radius;
      this.xVel *= -1;
    }
    if (this.y + this.radius >= height) {
      this.y=height-this.radius;
      this.yVel *= -1;
    }
    if (this.y - this.radius <= 0) {
      this.y=this.radius;
      this.yVel *= -1;
    }
    
    this.x += this.xVel;
    this.y += this.yVel;
  };

  this.collides = function (ball) {
    let dist = distance(this.x, this.y, ball.x, ball.y);
    if (dist <= this.radius + ball.radius && this !== ball) {
      let distX = this.x - ball.x;
      let distY = this.y - ball.y;
      let penDepth = this.radius + ball.radius - dist;
      let unitDistX = distX / Math.sqrt(distX ** 2 + distY ** 2);
      let unitDistY = distY / Math.sqrt(distX ** 2 + distY ** 2);
      let penResX = (unitDistX * penDepth) / 2;
      let penResY = (unitDistY * penDepth) / 2;
      this.x += penResX;
      this.y += penResY;
      ball.x -= penResX;
      ball.y -= penResY;

      let tempX = ball.xVel;
      let tempY = ball.yVel;
      ball.xVel = this.xVel;
      ball.yVel = this.yVel;
      this.xVel = tempX;
      this.yVel = tempY;
    }
  };
}
