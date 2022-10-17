import { Entity, Position } from "./entity.js";
import { context, width, halfWidth, height, halfHeight } from "./game.js";
import { generatesRanNumBetween } from "./utility.js";
import { game } from "./game.js";

export class Boost extends Entity {
  constructor(position, color, type) {
    super(position);
    this.radius = 10;
    this.color = color;
    this.borderColor = "black";
    this.type = type;
  }
  draw() {
    context.beginPath();
    context.fillStyle = this.color;
    context.strokeStyle = this.borderColor;
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.stroke();
    context.fill();
    context.closePath();
  }
  tick() {}
}
export function spawnBoosts(game) {
  let randomPositionX = generatesRanNumBetween(width - 60, 0);
  let randomPositionY = generatesRanNumBetween(height - 60, 0);
  let randomBoost = generatesRanNumBetween(2, 0);

  let boostTypes = [
    new Boost(
      new Position(randomPositionX, randomPositionY),
      "black",
      "healing"
    ),
    new Boost(
      new Position(randomPositionX, randomPositionY),
      "black",
      "speed"
    ),
    new Boost(
      new Position(randomPositionX, randomPositionY),
      "black",
      "invunerable"
    ),
  ];
  game.entities.push(boostTypes[randomBoost]);
}

export function boostEffect(game) {
  if (game.player.buff.healing) {
    if (game.player.lives < 5) {
    game.player.lives++;
  }
    game.player.buff.healing = false;
  }
  if (game.player.buff.speed) {
    game.player.velocity.dx = 650;
    game.player.velocity.dy = 650;
    game.player.borderColor = "rgba(39, 245, 237)";
    game.player.lineWidth = 10;
    setTimeout(function () {
      game.player.borderColor = "black";
      game.player.lineWidth = 1;
      game.player.buff.speed = false;
    }, 5000);
  }
  if (game.player.buff.invunerable) {
    setTimeout(function () {
      game.player.buff.invunerable = false;
    }, 5000);
  }
}

  export function drawBoostType(entity) {
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    if (entity.type === "healing") {
      context.font = '35px serif';
    context.fillText("❤️", entity.position.x, entity.position.y);
    }
    if (entity.type === "speed") {
      context.font = '50px serif';
    context.fillText("🍬", entity.position.x, entity.position.y);
    }
    if (entity.type === "invunerable") {
      context.font = '60px serif';
    context.fillText("🎭", entity.position.x, entity.position.y);
    }
}
