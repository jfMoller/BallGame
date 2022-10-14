import { Entity, Position, Velocity } from "./entity.js";
import { context, width, halfWidth, height, halfHeight, game } from "./game.js";
import { generatesRanNumBetween } from "./utility.js";

export class Enemy extends Entity {
  constructor(position, velocity) {
    super(position);
    this.radius = 20;
    this.velocity = velocity;
    this.color = "red";
    this.borderColor = "black";
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
  tick(game, deltaTime) {
    this.position.x += this.velocity.dx * deltaTime;
    this.position.y += this.velocity.dy * deltaTime;
  }
}
export function spawnEnemies(game) {
  let randomDirection = generatesRanNumBetween(3, 0);
  let randomVelocity = generatesRanNumBetween(50, 0);

  let enemyDirection = [
    new Enemy(
      new Position(Math.random() * width, 0),
      new Velocity(randomVelocity, 100)
    ),
    new Enemy(
      new Position(0, Math.random() * height),
      new Velocity(100, randomVelocity)
    ),
    new Enemy(
      new Position(width, Math.random() * height),
      new Velocity(-100, randomVelocity)
    ),
    new Enemy(
      new Position(Math.random() * width, height),
      new Velocity(randomVelocity, -100)
    ),
  ];
  game.entities.push(enemyDirection[randomDirection]);
}

export function removesEnemies(game) {
  //removes enemies that exit the canvas from game array
  for (let i = 1; i < game.entities.length; ++i) {
    let entity = game.entities[i];

    if (
      entity.position.x > width + entity.radius ||
      entity.position.x < -entity.radius ||
      entity.position.y < -entity.radius ||
      entity.position.y > height + entity.radius
    ) {
      game.entities.splice(i, 1);
    }
  }
}

export function drawEnemyFaces(enemy) {
  context.font = '48px serif';
  context.fillStyle = 'black';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText("😈", enemy.position.x, enemy.position.y);
}

