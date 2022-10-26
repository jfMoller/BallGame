import { Entity } from "./entity.js";
import { collideTheseCircles } from "./utility.js";

export class Enemy extends Entity {
  constructor(position, velocity) {
    super(position);
    this.radius = 19;
    this.velocity = velocity;
    this.color = "rgba(183, 79, 111, 1)";
    this.borderColor = "black";
    this.lineWidth = 1;
    this.id = "Enemy";
    this.tickTime = null;
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

    if (collideTheseCircles(game.player, this, 100)) {
      context.fillText("!", this.position.x, this.position.y);
    }
    if (game.player.shield && collideTheseCircles(this, game.shield, -20)) {
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
    if (
      collideTheseCircles(game.player, this, 0) &&
      game.player.effect.invunerable === false
    ) {
      this.collidesWithPlayer(game);
    }

    if (game.player.shield) {
      this.collidesWithShield(game);
    }
  }
  moves(game) {
    this.position.x += this.velocity.dx * game.deltaTime;
    this.position.y += this.velocity.dy * game.deltaTime;
  }
  collidesWithPlayer(game) {
    game.entities.splice(game.index--, 1);
    game.player.lives--;
  }
  collidesWithShield(game) {
    if (collideTheseCircles(game.shield, this, -5)) {
      if (this.radius > 1) {
        this.radius -= 2;
        this.velocity.dx -= 10;
        this.velocity.dY -= 10;
        if (this.radius <= 1) {
          this.radius = 19;
          game.entities.splice(game.index--, 1);
          game.enemiesPopped++;
        }
      }
    }
    if (collideTheseCircles(game.shield, this, 0)) {
      this.velocity.dx *= -1;
      this.velocity.dy *= -1;
    }
  }
}
