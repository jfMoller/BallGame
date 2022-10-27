import { Entity, Velocity } from "./entity.js";
import { collideTheseCircles } from "./utility.js";

export class Boost extends Entity {
  constructor(position, color, type) {
    super(position);
    this.radius = 15;
    this.color = color;
    this.borderColor = "black";
    this.type = type;
  }
  draw(context) {
    context.beginPath();
    context.fillStyle = this.color;
    context.strokeStyle = this.borderColor;
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.stroke();
    context.fill();
    context.closePath();

    context.fillStyle = "white";
    context.textAlign = "center";
    context.textBaseline = "bottom";
    context.font = "20px serif";

    if (this.type === "healing") {
      context.fillText("Health", this.position.x, this.position.y - 15);
    }
    if (this.type === "speed") {
      context.fillText("Speed", this.position.x, this.position.y - 15);
    }
    if (this.type === "invunerable") {
      context.fillText("Invunerability", this.position.x, this.position.y - 15);
    }
  }
  tick(game) {
    if (game.player.shield && collideTheseCircles(game.shield, this, 0)) {
      this.collidesWithShield(game);
    }
    if (collideTheseCircles(game.player, this, 0)) {
      this.collidesWithPlayer(game);
      this.isActive(game);
    }
    if (game.tickTime - game.tickTime_Effect > game.boostDuration) {
      this.isInactive(game);
    }
  }
  collidesWithShield(game) {
    game.entities.splice(game.index--, 1);
  }
  collidesWithPlayer(game) {
    game.entities.splice(game.index--, 1);
    game.tickTime_Effect = game.tickTime;
  }
  isActive(game) {
    if (this.type === "healing" && game.player.lives < 5) {
      game.player.effect.healing = true;
      game.player.lives++;
    }
    if (this.type === "speed" && game.player.effect.speed !== true) {
      game.player.effect.speed = true;

      if (game.player.effect.speed) {
        game.player.velocity = new Velocity(650, 650);
      }
    }
    if (
      this.type === "invunerable" &&
      game.player.effect.invunerable !== true
    ) {
      game.player.effect.invunerable = true;
    }
  }
  isInactive(game) {
    if (game.player.effect.speed) {
      game.player.effect.speed = false;
      game.player.velocity = new Velocity(450, 450);
    } else if (game.player.effect.invunerable) {
      game.player.effect.invunerable = false;
    }
  }
}
