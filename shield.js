import { Entity, Position, Velocity } from "./entity.js";
import { Player } from "./player.js";
import { context, game, width, height, halfWidth, halfHeight } from "./game.js";

export class Shield {
  constructor(position) {
    this.position = position;
    this.velocity = new Velocity(0, 0);
    this.radius = 100;
    this.color = "rgba(255, 255, 153, 0.3)";
    this.borderColor = "rgb(255, 255, 153)";
    this.lineWidth = 3;
    this.id = "Shield";
    this.ready = true;
    this.readyIn = 28; //sec, shield can then be activated
    this.removeIn = 8; //sec, shield lasts for this.removeIn * 0.8 before shrinking
    this.tickTime = null;
  }

  draw() {
    if (game.player.shield) {
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
  }

  tick(game) {
    if (game.player.shield) {
      this.position.x += this.velocity.dx * game.deltaTime;
      this.position.y += this.velocity.dy * game.deltaTime;

      if (
        this.position.x > width - this.radius ||
        this.position.x <= this.radius
      ) {
        this.velocity.dx *= -1;
      }
      if (
        this.position.y < this.radius ||
        this.position.y > height - this.radius
      ) {
        this.velocity.dy *= -1;
      }
    }

    if (game.player.keys.space) {
      game.shield.TickTime = game.tickTime;
    }
    if (
      game.tickTime - game.shield.TickTime > this.removeIn &&
      game.player.shield
    ) {
      //shrinking
      if (game.shield.radius > 1) {
        game.shield.radius -= 0.8;
        if (game.shield.radius <= 1) {
          game.player.shield = false;
          game.shield.radius = 100;
        }
      }
    } else if (game.tickTime - game.shield.TickTime > this.readyIn) {
      game.shield.ready = true;
    }
  }
}
