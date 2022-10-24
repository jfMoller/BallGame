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
    this.color = "black";
    this.borderColor = "black";
    this.keys = new Keys();
    this.lives = 4;
    this.buff = new Buff();
    this.lineWidth = 1;
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

    context.font = "45px serif";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";

    if (this.buff.invunerable) {
      context.fillText("🥸", this.position.x, this.position.y);
    }

    if (this.lives >= 5 && this.buff.invunerable !== true) {
      context.fillText("😁", this.position.x, this.position.y);
    }
    if (this.lives === 4 && this.buff.invunerable !== true) {
      context.fillText("😃", this.position.x, this.position.y);
    }
    if (this.lives === 3 && this.buff.invunerable !== true) {
      context.fillText("🙂", this.position.x, this.position.y);
    }
    if (this.lives === 2 && this.buff.invunerable !== true) {
      context.fillText("😣", this.position.x, this.position.y);
    }
    if (this.lives === 1 && this.buff.invunerable !== true) {
      context.fillText("😖", this.position.x, this.position.y);
    }
    if (this.lives <= 0 && this.buff.invunerable !== true) {
      context.fillText("😵", this.position.x, this.position.y);
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
