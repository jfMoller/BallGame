import { Velocity } from "./entity.js";
import { context, player, width, height, game } from "./game.js";

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
    this.readyIn = 20; //sec, shield can then be activated
    this.removeIn = 8; //sec, shield lasts for this.removeIn * 0.8 before shrinking
    this.tickTime = null;
  }

  draw() {
    if (player.shield) {
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
    this.isActivated();
    this.isRecharging();

    if (player.shield) {
      this.moves();
      this.bounces();
    }
  }
  isActivated() {
    //saves the time of which user activated shield
    if (player.keys.space) {
      this.TickTime = game.tickTime;
    }
    if (
      game.tickTime - this.TickTime > this.removeIn &&
      player.shield
    ) {
      //shrinking
      if (this.radius > 1) {
        this.radius -= 0.8;
        if (this.radius <= 1) {
          player.shield = false;
          this.radius = 100;
        }
      }
    }
  }
  isRecharging() {
    if (game.tickTime - this.TickTime > this.readyIn) {
      this.ready = true;
    }
  }
  moves() {
    this.position.x += this.velocity.dx * game.deltaTime;
    this.position.y += this.velocity.dy * game.deltaTime;

    //if shields radius exceeds width or height of the canvas when spawned
    if (this.position.x < this.radius) {
      this.position.x = this.radius;
    }
    if (this.position.x + this.radius > width) {
      this.position.x = width - this.radius + 1;
    }
    if (this.position.y + this.radius > height) {
      this.position.y = height - this.radius + 1;
    }
    if (this.position.y < this.radius) {
      this.position.y = this.radius - 1;
    }
  }

  bounces() {
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
}
