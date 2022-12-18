import Sprite from './Sprite.js';
import Fighter from './Fighter.js';
import { rectCollision, timerId, decreaseTimer, determineWinner } from './utils.js';
import { listen, keys } from './events.js';

const GRAVITY = 0.7;
const SPEED = 5;
const JUMP = 20;
const enemyHealth = document.getElementById("enemy-health");
const playerHealth = document.getElementById("player-health");

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const bg = new Sprite({
  position: {x: 0, y: 0},
  imgSrc: "../assets/background.png",
})

const shop = new Sprite({
  position: {x: 600, y: 128},
  imgSrc: "../assets/shop.png",
  scale: 2.75,
  frameMax: 6
})

const player = new Fighter({
  position: { x: 0, y: 0 },
  imgSrc: "../assets/samuraiMack/Idle.png",
  velocity: { x: 0, y: 0 },
  offset: {x: 215, y: 157},
  scale: 2.5,
  frameMax: 8,
  sprites: {
    idle: {
      imgSrc: "../assets/samuraiMack/Idle.png",
      frameMax: 8
    },
    run: {
      imgSrc: "../assets/samuraiMack/Run.png",
      frameMax: 8
    },
    jump: {
      imgSrc: "../assets/samuraiMack/Jump.png",
      frameMax: 2
    },
    fall: {
      imgSrc: "../assets/samuraiMack/Fall.png",
      frameMax: 2
    },
    attack1: {
      imgSrc: "../assets/samuraiMack/Attack1.png",
      frameMax: 6
    },
    takeHit: {
      imgSrc: "../assets/samuraiMack/Take hit - white silhouette.png",
      frameMax: 4
    },
    death: {
      imgSrc: "../assets/samuraiMack/Death.png",
      frameMax: 6
    }
  },
  attackBox: {
    offset: {
      x: 100,
      y: 50,
    },
    width: 160,
    height: 50
  }
});

const enemy = new Fighter({
  position: { x: 500, y: 100 },
  imgSrc: "../assets/kenji/Idle.png",
  velocity: { x: 0, y: 0 },
  offset: {x: 215, y: 167},
  scale: 2.5,
  frameMax: 4,
  sprites: {
    idle: {
      imgSrc: "../assets/kenji/Idle.png",
      frameMax: 4
    },
    run: {
      imgSrc: "../assets/kenji/Run.png",
      frameMax: 8
    },
    jump: {
      imgSrc: "../assets/kenji/Jump.png",
      frameMax: 2
    },
    fall: {
      imgSrc: "../assets/kenji/Fall.png",
      frameMax: 2
    },
    attack1: {
      imgSrc: "../assets/kenji/Attack1.png",
      frameMax: 4
    },
    takeHit: {
      imgSrc: "../assets/kenji/Take hit.png",
      frameMax: 3
    },
    death: {
      imgSrc: "../assets/kenji/Death.png",
      frameMax: 7
    }
  },
  attackBox: {
    offset: {
      x: -180,
      y: 50,
    },
    width: 160,
    height: 50
  }
});


listen();
animate();
decreaseTimer();

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  bg.update();
  shop.update();
  c.fillStyle = "rgba(255, 255, 255, 0.15)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;
  if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = SPEED;
    player.switchSprite("run");
  } else if (keys.a.pressed && player.lastKey === "a")  {
    player.velocity.x = -SPEED;
    player.switchSprite("run");
  } else {
    player.switchSprite("idle");
  }

  if (player.velocity.y < 0) {
    player.switchSprite("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprite("fall");
  }

  enemy.velocity.x = 0;
  if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = SPEED;
    enemy.switchSprite("run");
  } else if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -SPEED;
    enemy.switchSprite("run");
  } else {
    enemy.switchSprite("idle");
  }

  if (enemy.velocity.y < 0) {
    enemy.switchSprite("jump");
  } else if (player.velocity.y > 0) {
    enemy.switchSprite("fall");
  }

  // collision
  if ( 
    rectCollision(player, enemy) &&
    player.isAttacking &&
    player.currentFrame === 4
  ) {
    player.isAttacking = false;
    enemy.takeHit();
    enemyHealth.style.width = enemy.health + "%";
  }

  // missing
  if (player.isAttacking && player.currentFrame === 4) {
    player.isAttacking = false;
  }

  if ( 
    rectCollision(enemy, player) &&
    enemy.isAttacking &&
    enemy.currentFrame === 2
  ) {
    enemy.isAttacking = false;
    player.takeHit();
    playerHealth.style.width = player.health + "%";
  }

  if (enemy.isAttacking && enemy.currentFrame === 2) {
    enemy.isAttacking = false;
  }

  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner(timerId);
  }
}


export { GRAVITY, JUMP, SPEED, enemy, player, c, canvas }
