import { Boost, spawnBoosts } from "./boost.js";
import { Enemy, spawnEnemies } from "./enemy.js";
import { Position } from "./entity.js";
import { Player } from "./player.js";
import { Shield } from "./shield.js";
import { gameInterface } from "./interface.js";
import { isOutsideCanvas, collideTheseCircles } from "./utility.js";

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

let lastTick = Date.now();
//to determine duration of boost effect
game.tickTime_Boost = 0;
//to remove flicker issue in methods
game.index = 0;

function tick() {
  let currentTick = Date.now();
  game.deltaTime = (currentTick - lastTick) / 1000;
  lastTick = currentTick;

  game.tickTime += game.deltaTime;
  //score++ if every full second of ticktime
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
  } //<--- end of for loop

  console.log(game.entities.length);
  if (game.player.lives <= 0) {
    alert("Game over!");
    return;
  }
  requestAnimationFrame(tick);
}

if (game.spawnEnemies) {
  setInterval(() => {
    spawnEnemies(game);
  }, game.enemySpawnRate);
}

if (game.spawnBoosts) {
  setInterval(() => {
    spawnBoosts(game);
  }, game.boostSpawnRate);
}
