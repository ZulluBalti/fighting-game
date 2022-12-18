import {player, enemy} from './app.js';

function rectCollision(rec1, rec2) {
  const {position: {x, y}, width, height} = rec1.attackBox;
  const {position: {x: eX, y: eY}, width: eWidth, height: eHeight} = rec2;

  return (
    x + width > eX && x < eX + eWidth &&
    y + height >= eY && y < eY + eHeight 
  )
}

function determineWinner(timerId) {
  clearTimeout(timerId)
  const result = document.querySelector(".result");
  if (player.health === enemy.health) {
    result.textContent = "Tie";
  } else if (player.health > enemy.health) {
    result.textContent = "Player 1 win";
  } else {
    result.textContent = "Player 2 win";
  }

  result.style.display = "grid";
}

let timer = 60;
let timerId;

function decreaseTimer() {
  if (timer <= 0) {
    determineWinner(timerId);
    return;
  }

  timer--;
  document.querySelector(".timer").textContent = timer;
  timerId = setTimeout(decreaseTimer, 1000);
}

export { decreaseTimer, determineWinner, rectCollision, timerId } 
