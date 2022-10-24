import { Boost } from "./boost.js";
import { Enemy } from "./enemy.js";
import { Position, Velocity } from "./entity.js";
import { Player } from "./player.js";
import { Shield } from "./shield.js";
import { gameInterface } from "./interface.js";
import { generatesRanNumBetween, isOutsideCanvas } from "./utility.js";

export const canvas = document.getElementById("canvas");
export const context = canvas.getContext("2d");

export const width = canvas.width;
export const halfWidth = canvas.width / 2;
export const height = canvas.height;
export const halfHeight = canvas.height / 2;

export class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.entities = [
      new Player(new Position(halfWidth, halfHeight)),
      new Shield(new Position(halfWidth, halfHeight)),
    ];
    this.player = this.entities[0];
    this.shield = this.entities[1];

    this.deltaTime = 0;
    this.score = 0;
    this.boostTime = 0;

    this.tickTime = 0;
    this.tickTime_Shield = 0;
    this.tickTime_Boost = 0;

    this.spawnEnemies = true;
    this.enemySpawnRate = 500; //ms

    this.spawnBoosts = true;
    this.boostSpawnRate = 10000; //ms
    this.boostDuration = 4; //sec

    this.index = 0;
  }
  start() {
    tick();
  }
}

export const game = new Game(canvas, context);

//to determine duration of boost effect
game.tickTime_Boost;
//to remove graphcal flicker issue
game.index;

let lastTick = Date.now();
function tick() {
  let currentTick = Date.now();
  //to equalize game movement and durations regardless of users frame rate
  game.deltaTime = (currentTick - lastTick) / 1000;
  lastTick = currentTick;
  game.tickTime += game.deltaTime;
  game.score = Math.floor(game.tickTime);

  context.clearRect(0, 0, width, height);

  //game interface prototype
  gameInterface(game);

  //draws, moves, collides and handles effects of all entities
  for (game.index = 0; game.index < game.entities.length; ++game.index) {
    let entity = game.entities[game.index];
    entity.tick(game);
    entity.draw(game);

    if (isOutsideCanvas(entity)) {
      game.entities.splice(game.index--, 1);
    }
  }

  if (game.player.lives <= 0) {
    alert("Game over! \nHigh-score: " + game.score);
    return;
  }
  requestAnimationFrame(tick);
}

if (game.spawnEnemies) {
  setInterval(() => {
    spawnEnemies(game);
  }, game.enemySpawnRate);
}
function spawnEnemies() {
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

if (game.spawnBoosts) {
  setInterval(() => {
    spawnBoosts(game);
  }, game.boostSpawnRate);
}
function spawnBoosts() {
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
