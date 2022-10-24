import { Entity } from "./entity.js";
import { context, game } from "./game.js";
import { collideTheseCircles } from "./utility.js";

export class Enemy extends Entity {
  constructor(position, velocity) {
    super(position);
    this.radius = 19;
    this.velocity = velocity;
    this.color = "red";
    this.borderColor = "black";
    this.id = "Enemy";
  }
  draw() {
    context.beginPath();
    context.fillStyle = this.color;
    context.strokeStyle = this.borderColor;
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.stroke();
    context.fill();
    context.closePath();

    context.font = "48px serif";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("👿", this.position.x, this.position.y);

    if (collideTheseCircles(game.player, this, 100)) {
      context.fillText("😈", this.position.x, this.position.y);
    }
  }
  tick(game) {
    this.moves();
    if (
      collideTheseCircles(game.player, this, 0) &&
      game.player.buff.invunerable === false
    ) {
      this.collidesWithPlayer(game);
    }

    if (game.player.shield) {
      this.collidesWithShield(game);
    }
  }
  moves() {
    this.position.x += this.velocity.dx * game.deltaTime;
    this.position.y += this.velocity.dy * game.deltaTime;
  }
  collidesWithPlayer(game) {
    game.entities.splice(game.index--, 1);
    game.player.lives--;
  }
  collidesWithShield(game) {
    if (collideTheseCircles(game.shield, this, -20)) {
      game.entities.splice(game.index--, 1);
    }
    if (collideTheseCircles(game.shield, this, 0)) {
      this.velocity.dx *= -1;
      this.velocity.dy *= -1;
    }
  }
}
