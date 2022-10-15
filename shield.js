import { Entity, Position, Velocity } from "./entity.js";
import { Player } from "./player.js";
import { context, game, width, height } from "./game.js";

export class Shield {
  constructor(position) {
    this.position = position;
    this.velocity = new Velocity(0, 0);
    this.radius = 100;
    this.color = "rgba(255, 239, 98, 0.1)";
    this.borderColor = "yellow";
    this.lineWidth = 1;
    this.id = "Shield";
  }

  draw() {
      context.beginPath();
      context.fillStyle = this.color;
      context.strokeStyle = this.borderColor;
      context.lineWidth = this.lineWidth;
      context.arc(
        this.position.x,
        this.position.y,
        this.radius,
        0,
        Math.PI * 2
      );
      context.stroke();
      context.fill();
      context.closePath();
  }

  tick(game) {
    this.position.x += this.velocity.dx * game.deltaTime;
    this.position.y += this.velocity.dy * game.deltaTime;
  }

  bounce() {
    if (
      this.position.x > width - this.radius ||
      this.position.x <= this.radius ||
      this.position.y < this.radius ||
      this.position.y > height - this.radius
    ) {
      this.velocity.dx *= -1;
      this.velocity.dy *= -1;
    }
  }
}

export function collisionOfShieldAndEnemy(shield, enemy) {
  let distance = Math.sqrt(
    (shield.position.x - enemy.position.x) ** 2 +
      (shield.position.y - enemy.position.y) ** 2
  );
  return distance;
}
