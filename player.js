import { Entity, Velocity } from "./entity.js";
import { context, width, halfWidth, height, halfHeight } from "./game.js";

export class Buff {
  constructor() {
    this.healing = false;
    this.speed = false;
    this.invunerable = false;
  }
}
export class Keys {
  constructor() {
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
  }
}
export class Player extends Entity {
  constructor(position) {
    super(position);
    this.radius = 30;
    this.velocity = new Velocity(450, 450);
    this.color = "orange";
    this.borderColor = "black";
    this.keys = new Keys();
    this.lives = 4;
    this.buff = new Buff();
    this.lineWidth = 1;
    this.shield = false;
  }
  draw(game) {
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
  tick(game, deltaTime) {
    if (game.player.keys.up && game.player.position.y > game.player.radius) {
      game.player.position.y -= this.velocity.dy * game.deltaTime;
    }
    if (
      game.player.keys.down &&
      game.player.position.y < height - this.radius
    ) {
      game.player.position.y += this.velocity.dy * game.deltaTime;
    }
    if (game.player.keys.left && game.player.position.x > this.radius) {
      game.player.position.x -= this.velocity.dx * game.deltaTime;
    }
    if (
      game.player.keys.right &&
      game.player.position.x < width - this.radius
    ) {
      game.player.position.x += this.velocity.dx * deltaTime;
    }
  }
}
export function drawPlayerLives(game) {
  context.font = "48px serif";
  context.fillStyle = "black";
  context.textAlign = "center";
  context.textBaseline = "middle";

  if (game.player.buff.invunerable) {
    context.fillText("🥸", game.player.position.x, game.player.position.y);
  }

  if (game.player.lives >= 4 && game.player.buff.invunerable !== true) {
    context.fillText("😃", game.player.position.x, game.player.position.y);
  }
  if (game.player.lives === 3 && game.player.buff.invunerable !== true) {
    context.fillText("🙂", game.player.position.x, game.player.position.y);
  }
  if (game.player.lives === 2 && game.player.buff.invunerable !== true) {
    context.fillText("😣", game.player.position.x, game.player.position.y);
  }
  if (game.player.lives === 1 && game.player.buff.invunerable !== true) {
    context.fillText("😖", game.player.position.x, game.player.position.y);
  }
  if (game.player.lives <= 0 && game.player.buff.invunerable !== true) {
    context.fillText("😵", game.player.position.x, game.player.position.y);
  }
}
