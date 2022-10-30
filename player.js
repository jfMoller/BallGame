import { Entity, Velocity } from "./entity.js";
import { width, height } from "./game.js";

export class Effect {
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
    this.effect = new Effect();
    this.lineWidth = 0;
    this.shield = false;
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

    context.font = "60px serif";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";
    //loop draws players face depending on direction
    let keys = [this.keys.up, this.keys.down, this.keys.left, this.keys.right];
    let x = 0;
    let y = 0;
    for (let i = 0; i < 4; i++) {
      if (
        keys[0] === false && keys[1] === false &&
        keys[2] === false && keys[3] === false
      ) {
        y = 0;
        x = 0;
      } else if (keys[i]) {
        if (keys[i] === this.keys.up) {
          y -= 3;
        }

        if (keys[i] === this.keys.down) {
          y += 3;
        }

        if (keys[i] === this.keys.left) {
          x -= 3;
        }

        if (keys[i] === this.keys.right) {
          x += 3;
        }
      }
    }
    context.fillText("+", this.position.x + x, this.position.y + y);

    if (this.effect.invunerable) {
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
  tick(game) {
    this.moves(game);
  }
  moves(game) {
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
