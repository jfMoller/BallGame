import { Velocity } from "./entity.js";
import { width, height } from "./game.js";

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
    this.readyIn = 15; //sec, shield can then be activated
    this.removeIn = 8; //sec, shield lasts for this.removeIn * 0.8 before shrinking
    this.tickTime = null;
  }

  draw(context, game) {
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
    this.isActivated(game);
    this.isRecharging(game);

    if (game.player.shield) {
      this.moves(game);
      this.bounces();
    }
  }
  isActivated(game) {
    //saves the time of which user activated shield
    if (game.player.keys.space) {
      this.tickTime = game.tickTime;
    }
    if (game.tickTime - this.tickTime > this.removeIn && game.player.shield) {
      //shrinking
      if (this.radius > 1) {
        this.radius -= 0.8;
        if (this.radius <= 1) {
          game.player.shield = false;
          this.radius = 100;
        }
      }
    }
  }
  isRecharging(game) {
    if (game.tickTime - this.tickTime > this.readyIn) {
      this.ready = true;
    }
  }
  moves(game) {
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
    if (this.position.y < this.radius + 100) {
      this.position.y = this.radius + 100 - 1;
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
      this.position.y < this.radius + 100 ||
      this.position.y > height - this.radius
    ) {
      this.velocity.dy *= -1;
    }
  }
}
