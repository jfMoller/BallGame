import { Entity, Position, Velocity } from "./entity.js";
import { context, width, height } from "./game.js";
import { generatesRanNumBetween } from "./utility.js";

export class Boost extends Entity {
  constructor(position, color, type) {
    super(position);
    this.radius = 23;
    this.color = color;
    this.borderColor = "black";
    this.type = type;
    this.tickTime = null;
  }
  draw() {
    context.beginPath();
    context.fillStyle = this.color;
    context.strokeStyle = this.borderColor;
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.stroke();
    context.fill();
    context.closePath();

    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";
    if (this.type === "healing") {
      context.font = "35px serif";
      context.fillText("❤️", this.position.x, this.position.y);
    }
    if (this.type === "speed") {
      context.font = "50px serif";
      context.fillText("🍬", this.position.x, this.position.y);
    }
    if (this.type === "invunerable") {
      context.font = "60px serif";
      context.fillText("🎭", this.position.x, this.position.y);
    }
  }
  isActive(game) {
    if (this.type === "healing" && game.player.lives < 5) {
      game.player.buff.healing = true;
      game.player.lives++;
    }
    if (this.type === "speed" && game.player.buff.speed !== true) {
      game.player.buff.speed = true;

    if (game.player.buff.speed) {
      game.player.borderColor = "rgba(39, 245, 237)";
      game.player.lineWidth = 10;
      game.player.velocity = new Velocity(650, 650);
      }
    }
    if (this.type === "invunerable" && game.player.buff.invunerable !== true) {
      game.player.buff.invunerable = true;
    }
  }
  isInactive(game) {
    if (game.player.buff.speed) {
      game.player.buff.speed = false;
      game.player.borderColor = "black";
      game.player.lineWidth = 1;
      game.player.velocity = new Velocity(450, 450);
    } else if (game.player.buff.invunerable) {
      game.player.buff.invunerable = false;
    }
  }
}
export function spawnBoosts(game) {
  let randomPositionX = generatesRanNumBetween(width - 100, 0);
  let randomPositionY = generatesRanNumBetween(height - 100, 0);
  let randomBoost = generatesRanNumBetween(2, 0);

  let boostTypes = [
    new Boost(
      new Position(randomPositionX, randomPositionY),
      "black",
      "healing"
    ),
    new Boost(new Position(randomPositionX, randomPositionY), "black", "speed"),
    new Boost(
      new Position(randomPositionX, randomPositionY),
      "black",
      "invunerable"
    ),
  ];
  game.entities.push(boostTypes[randomBoost]);
}
