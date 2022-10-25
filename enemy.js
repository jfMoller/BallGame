import { Entity } from "./entity.js";
import { context, game, player, shield } from "./game.js";
import { collideTheseCircles } from "./utility.js";

export class Enemy extends Entity {
  constructor(position, velocity) {
    super(position);
    this.radius = 19;
    this.velocity = velocity;
    this.color = "rgba(183, 79, 111, 1)";
    this.borderColor = "black";
    context.lineWidth = 1;
    this.id = "Enemy";
  }
  draw() {
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

    if (collideTheseCircles(player, this, 100)) {
      context.fillText("!", this.position.x, this.position.y);
    }
    if (player.shield && collideTheseCircles(this, shield, -20)) {
      context.font = "20px serif";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("+1", this.position.x, this.position.y - 40);
    }
  }
  tick(game) {
    this.moves();
    if (
      collideTheseCircles(player, this, 0) &&
      player.buff.invunerable === false
    ) {
      this.collidesWithPlayer(game);
    }

    if (player.shield) {
      this.collidesWithShield(game);
    }
  }
  moves() {
    this.position.x += this.velocity.dx * game.deltaTime;
    this.position.y += this.velocity.dy * game.deltaTime;
  }
  collidesWithPlayer(game) {
    game.entities.splice(game.index--, 1);
    player.lives--;
  }
  collidesWithShield(game) {
    if (collideTheseCircles(shield, this, -20)) {
      game.entities.splice(game.index--, 1);
    }
    if (collideTheseCircles(shield, this, 0)) {
      this.velocity.dx *= -1;
      this.velocity.dy *= -1;
    }
  }
}
