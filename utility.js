import { game } from "./game.js"
import { Position } from "./entity.js";

export function generatesRanNumBetween(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  export function circlesCollide(circle1, circle2, modifier) {
    
    let distance = Math.sqrt(
        (circle1.position.x - circle2.position.x) ** 2 +
        (circle1.position.y - circle2.position.y) ** 2
        );
  if (distance < circle1.radius + modifier + circle2.radius) {
    return true;
  }
  else {
    return false;
  }
}