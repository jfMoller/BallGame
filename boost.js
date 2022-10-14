import { Entity, Position } from "./entity.js";
import { context, width, halfWidth, height, halfHeight } from "./game.js";
import { generatesRanNumBetween } from "./utility.js";
import { game } from "./game.js";

export class Boost extends Entity {
  constructor(position, color, type) {
    super(position);
    this.side = 20;
    this.color = color;
    this.borderColor = "black";
    this.type = type;
  }
  draw() {
    context.beginPath();
    context.fillStyle = this.color;
    context.strokeStyle = this.borderColor;
    context.rect(
      this.position.x - this.side / 2,
      this.position.y - this.side / 2,
      this.side,
      this.side
    );
    context.stroke();
    context.fill();
    context.closePath();
  }
  tick() {}
}
export function spawnBoosts(game) {
  let randomPositionX = generatesRanNumBetween(width, 0);
  let randomPositionY = generatesRanNumBetween(height, 0);
  let randomBoost = generatesRanNumBetween(2, 0);

  let boostTypes = [
    new Boost(
      new Position(randomPositionX, randomPositionY),
      "red",
      "healing"
    ),
    new Boost(
      new Position(randomPositionX, randomPositionY),
      "rgba(39, 245, 237)",
      "speed"
    ),
    new Boost(
      new Position(randomPositionX, randomPositionY),
      "purple",
      "invunerable"
    ),
  ];
  game.entities.push(boostTypes[randomBoost]);
}

export function collisionOfBoostAndPlayer(game, boost) {
  let distance = Math.sqrt(
    (game.player.position.x - boost.position.x) ** 2 +
      (game.player.position.y - boost.position.y) ** 2
  );
  if (distance < game.player.radius + boost.side / 2) {
    return true;
  } else {
    return false;
  }
}

export function boostEffect(game) {
  if (game.player.buff.healing) {
    game.player.lives++;
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
    console.log("INVUNERABLE");
    setTimeout(function () {
      game.player.buff.invunerable = false;
    }, 5000);
  }
}

  /* export function drawBoostType(entity) {
    context.font = '40px serif';
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    if (entity.type === "healing") {
    context.fillText("❤️", entity.position.x, entity.position.y);
    }
} */
