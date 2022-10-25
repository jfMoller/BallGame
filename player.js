import { Entity, Velocity } from "./entity.js";
import { game, context, width, height } from "./game.js";

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
    this.space = false;
  }
}
export class Player extends Entity {
  constructor(position) {
    super(position);
    this.radius = 27;
    this.velocity = new Velocity(450, 450);
    this.color = "rgba(204, 219, 220, 1)";
    this.borderColor = "black";
    this.filter = null;
    this.keys = new Keys();
    this.lives = 4;
    this.buff = new Buff();
    this.lineWidth = 0;
    this.shield = false;
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

    context.font = "60px serif";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";

    //draw player "face" depending on position, logic prototype, convert to for loop
    if (
      game.player.keys.up === false &&
      game.player.keys.down === false &&
      game.player.keys.left === false &&
      game.player.keys.right === false
    ) {
      context.fillText("+", this.position.x, this.position.y);
    }

    if (
      game.player.keys.up &&
      game.player.keys.left === false &&
      game.player.keys.right === false
    ) {
      context.fillText("+", this.position.x, this.position.y - 5);
    }
    if (game.player.keys.up && game.player.keys.left) {
      context.fillText("+", this.position.x - 5, this.position.y - 5);
    }
    if (game.player.keys.up && game.player.keys.right) {
      context.fillText("+", this.position.x + 5, this.position.y - 5);
    }

    if (
      game.player.keys.down &&
      game.player.keys.left === false &&
      game.player.keys.right === false
    ) {
      context.fillText("+", this.position.x, this.position.y + 5);
    }
    if (game.player.keys.down && game.player.keys.right) {
      context.fillText("+", this.position.x + 5, this.position.y + 5);
    }
    if (game.player.keys.down && game.player.keys.left) {
      context.fillText("+", this.position.x - 5, this.position.y + 5);
    }

    if (
      game.player.keys.left &&
      game.player.keys.up === false &&
      game.player.keys.down === false
    ) {
      context.fillText("+", this.position.x - 5, this.position.y);
    }
    if (
      game.player.keys.right &&
      game.player.keys.up === false &&
      game.player.keys.down === false
    ) {
      context.fillText("+", this.position.x + 5, this.position.y);
    }

    if (this.buff.invunerable) {
      this.color = "rgba(204, 219, 220, 0.1)";
    } else {
      this.color = "rgba(204, 219, 220, 1)";
    }

    if (game.shield.ready) {
      context.font = "20px serif";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("Shield (Space)", this.position.x, this.position.y - 40);
    }
  }
  tick() {
    this.moves();
  }
  moves() {
    if (this.keys.up && this.position.y > this.radius) {
      this.position.y -= this.velocity.dy * game.deltaTime;
    }
    if (this.keys.down && this.position.y < height - this.radius) {
      this.position.y += this.velocity.dy * game.deltaTime;
    }
    if (this.keys.left && this.position.x > this.radius) {
      this.position.x -= this.velocity.dx * game.deltaTime;
    }
    if (this.keys.right && this.position.x < width - this.radius) {
      this.position.x += this.velocity.dx * game.deltaTime;
    }
  }
}
