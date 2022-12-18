import { GRAVITY, c, canvas } from './app.js';

class Sprite {
  constructor({position, imgSrc, offset = {x: 0, y: 0}, scale = 1, frameMax = 1}) {
    this.position = position;
    this.height = 150;
    this.width = 50;
    this.img = new Image();
    this.img.src = imgSrc;
    this.scale = scale;
    this.frameMax = frameMax;
    this.currentFrame = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.offset = offset;
  }

  draw() {
    const {x, y} = this.position;
    const imgWidth = this.img.width / this.frameMax;

    c.drawImage(
      this.img, 
      this.currentFrame * imgWidth,
      0,
      this.img.width / this.frameMax,
      this.img.height,
      x - this.offset.x, 
      y - this.offset.y, 
      imgWidth * this.scale,
      this.img.height * this.scale
    );
  }

  animateFrame() {
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold !== 0) return;

    if (this.currentFrame < this.frameMax - 1) {
      this.currentFrame++;
    } else {
      this.currentFrame = 0;
    }
  }

  update() {
    this.draw();
    this.animateFrame();
  }
}

export default Sprite;
