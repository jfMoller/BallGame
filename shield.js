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
    this.readyRate = 10;
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
    if (game.tickTime - game.shield.TickTime > 10) {
      game.shield.ready = true;

      if (game.tickTime - game.shield.TickTime > 8 && game.player.shield) {
        //shrinking when respawned
        if (game.shield.radius > 1) {
          game.shield.radius -= 0.8;
          if (game.shield.radius <= 1) {
            game.player.shield = false;
            game.shield.radius = 100;
          }
        }
      }
    }
  }
}

export function handleSpaceDown(event) {
  if (event.key === " " && game.shield.ready && game.shield.radius === 100) {
    game.player.keys.space = true;
    game.shield.ready = false;
    game.player.shield = true;

    game.shield.velocity.dx = 0;
    game.shield.velocity.dy = 0;

    game.shield.position.x = game.player.position.x;
    game.shield.position.y = game.player.position.y;

    if (game.player.keys.up) {
      game.shield.velocity.dy -= game.player.velocity.dy - 100;
    }
    if (game.player.keys.down) {
      game.shield.velocity.dy += game.player.velocity.dy - 100;
    }
    if (game.player.keys.left) {
      game.shield.velocity.dx -= game.player.velocity.dx - 100;
    }
    if (game.player.keys.right) {
      game.shield.velocity.dx += game.player.velocity.dx - 100;
    }
  }
}
export function handleSpaceUp(event) {
  if (event.key === " ") {
    game.player.keys.space = false;
  }
}
