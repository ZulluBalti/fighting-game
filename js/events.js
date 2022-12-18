import {JUMP, enemy, player} from './app.js';
const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  w: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowUp: {
    pressed: false
  },
}

function listen() {
  window.addEventListener("keydown", e => {
    if (!player.isDeath) {
      switch(e.key) {
        case "d":
          keys.d.pressed = true;
          player.lastKey = 'd';
          break;
        case "a":
          keys.a.pressed = true;
          player.lastKey = 'a';
          break;
        case "w":
          player.velocity.y = -JUMP;
          break;
        case " ":
          player.attack();
          break;
      }
    }

    if (!enemy.isDeath) {
      switch(e.key) {
        case "ArrowLeft":
          keys.ArrowLeft.pressed = true;
          enemy.lastKey = 'ArrowLeft';
          break;
        case "ArrowRight":
          keys.ArrowRight.pressed = true;
          enemy.lastKey = 'ArrowRight';
          break;
        case "ArrowUp":
          enemy.velocity.y = -JUMP;
          break;
        case "Enter":
          enemy.attack();
          break;
      }
    }
  })

  window.addEventListener("keyup", e => {
    switch(e.key) {
      case "d":
        keys.d.pressed = false;
        break;
      case "a":
        keys.a.pressed = false;
        break;
      case "w":
        keys.w.pressed = false;
        break;
      case "ArrowRight":
        keys.ArrowRight.pressed = false;
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = false;
        break;
      case "ArrowUp":
        keys.ArrowUp.pressed = false;
        break;
    }
  })
}

export { listen, keys }
