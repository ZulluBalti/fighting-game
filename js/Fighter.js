import { GRAVITY, c, canvas } from './app.js';
import Sprite from './Sprite.js';

class Fighter extends Sprite {
  constructor(
    {
      position, 
      velocity, 
      imgSrc, 
      sprites, 
      attackBox = {offset: {}, width: undefined, height: undefined}, 
      offset = {x: 0, y: 0}, 
      scale = 1, 
      frameMax = 1
    }
  ) {
    super({position,  imgSrc, scale, frameMax, offset});
    this.velocity = velocity;
    this.height = 150;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height
    };
    // this.color = color;
    this.width = 50;
    this.isAttacking = false;
    this.health = 100;
    this.sprites = sprites;
    this.isDeath = false;

    for (const sprite in this.sprites) {
      this.sprites[sprite].img = new Image();
      this.sprites[sprite].img.src = this.sprites[sprite].imgSrc;
    }
  }

  /*draw() {
    // super.draw();
    // const {x, y} = this.attackBox.position;
    // c.fillStyle = this.color;
    // c.fillRect(x, y, this.attackBox.width, this.attackBox.height);

    // if (this.isAttacking) {
    //   const {position, width, height} = this.attackBox;
    //   c.fillStyle = "green";
    //   c.fillRect(position.x, position.y, width, height);
    // }
  }*/

  update() {
    super.draw();
    if (this.isDeath) return;
    super.animateFrame();
    
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
      this.velocity.y = 0;
      this.position.y = 330.39;
    } else {
      this.velocity.y += GRAVITY;
    }
  }

  attack() {
    this.switchSprite("attack1");
    this.isAttacking = true;
  }
  
  takeHit() {
    this.health -= 20;

    if (this.health <= 0) {
      this.switchSprite("death");
    } else {
      this.switchSprite("takeHit");
    }
  }

  switchSprite(sprite) {
    // override other when dying
    if (this.img === this.sprites.death.img) {
      if (this.currentFrame === this.sprites.death.frameMax - 1) {
        this.isDeath = true;
      }
      return;
    }
    if (this.img === this.sprites[sprite].img) return;

    // override other when attacking
    if (
      this.img === this.sprites.attack1.img && 
      this.currentFrame < this.sprites.attack1.frameMax - 1
    ) return;

    // override other when taking hit
    if (
      this.img === this.sprites.takeHit.img && 
      this.currentFrame < this.sprites.takeHit.frameMax - 1
    ) return;

    this.img = this.sprites[sprite].img;
    this.frameMax = this.sprites[sprite].frameMax;
    this.currentFrame = 0;
  }
}

export default Fighter;
