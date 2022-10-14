import { game } from "./game.js"
import { Position } from "./entity.js";

export function generatesRanNumBetween(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  export function circlesCollide(circle, enemy) {
  
    let distance = Math.sqrt(
        (circle.position.x - enemy.position.x) ** 2 +
        (circle.position.y - enemy.position.y) ** 2
        );
  if (distance < circle.radius + enemy.radius) {
    return true;
  }
  else {
    return false;
  }
}