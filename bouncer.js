import { Enemy } from "./enemy.js";
import { width, height } from "./game.js";
import { isColliding } from "./utility.js";

export class Bouncer extends Enemy {
  constructor(position, velocity, color, radius) {
    super(position, velocity, color);
    this.radius = radius;
    this.borderColor = "black";
    this.lineWidth = 1;
  }
  draw(context, game) {
    context.beginPath();
    context.fillStyle = this.color;
    context.strokeStyle = this.borderColor;
    context.lineWidth = this.lineWidth;
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.stroke();
    context.fill();
    context.closePath();

    context.font = "30px serif";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";

    if (isColliding(game.player, this, 100)) {
      context.fillText("!", this.position.x, this.position.y);
    }
    if (game.player.shield && isColliding(this, game.shield, -20)) {
      this.tickTime = game.tickTime;
      context.font = "30px serif";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("+1", this.position.x, this.position.y - 40);
    }
  }
  tick(game) {
    this.moves(game);
    this.bounces();
    if (
      isColliding(game.player, this, 0) &&
      game.player.effect.invunerable === false
    ) {
      this.collidesWithPlayer(game);
    }

    if (game.player.shield) {
      this.collidesWithShield(game);
    }
  }
  bounces() {
    if (
      this.position.x > width - this.radius ||
      this.position.x <= this.radius
    ) {
      this.velocity.dx *= -1;
      this.radius -= 0.1;
    }
    if (
      this.position.y < this.radius + 100 ||
      this.position.y > height - this.radius
    ) {
      this.velocity.dy *= -1;
      this.radius -= 0.1;
    }
  }
}
