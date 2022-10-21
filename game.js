import { Boost, spawnBoosts } from "./boost.js";
import { Enemy, spawnEnemies } from "./enemy.js";
import { Position } from "./entity.js";
import { Player } from "./player.js";
import { Shield } from "./shield.js";
import { theseCirclesCollide, isOutsideCanvas } from "./utility.js";
import { gameInterface } from "./interface.js";

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
    this.tickTime = 0;
    this.boostTime = 0;

    this.spawnEnemies = true;
    this.enemySpawnRate = 500; //ms
    this.spawnBoosts = true;
    this.boostSpawnRate = 10000; //ms
    this.boostDuration = 4; //sec
  }
  start() {
    tick();
  }
}

export const game = new Game(canvas, context);

let lastTick = Date.now();
let boostTickTime = null;

function tick() {
  let currentTick = Date.now();
  game.deltaTime = (currentTick - lastTick) / 1000;
  lastTick = currentTick;
  context.clearRect(0, 0, width, height);

  //total ticktime
  game.tickTime += game.deltaTime;

  //score++ if every full second of ticktime
  game.score = Math.floor(game.tickTime);

  //game interface prototype
  gameInterface(game);

  //draws all objects in game array, moves all objects except boosts (stationary after spawn)
  for (let i = 0; i < game.entities.length; ++i) {
    let entity = game.entities[i];
    entity.tick(game);
    entity.draw(game);

    if (isOutsideCanvas(entity)) {
      game.entities.splice(i--, 1);
    }

    if (entity instanceof Enemy) {
      let enemy = entity;

      if (
        theseCirclesCollide(game.player, enemy, 0) &&
        game.player.buff.invunerable !== true
      ) {
        game.entities.splice(i--, 1);
        game.player.lives--;
      }

      if (game.player.shield) {
        if (theseCirclesCollide(game.shield, enemy, -20)) {
          game.entities.splice(i--, 1);
        }
        if (theseCirclesCollide(game.shield, enemy, 0)) {
          enemy.velocity.dx *= -1;
          enemy.velocity.dy *= -1;
        }
      }
    }

    if (entity instanceof Boost) {
      let boost = entity;

      if (theseCirclesCollide(game.shield, boost, 0)) {
        game.entities.splice(i--, 1);
      }

      if (theseCirclesCollide(game.player, boost, 0)) {
        game.entities.splice(i--, 1);
        boostTickTime = game.tickTime;
        boost.isActive(game);
      }

      if (game.tickTime - boostTickTime > game.boostDuration) {
        boost.isInactive(game);
      }
    }
  } //<--- end of for loop

  if (game.player.lives === 0) {
    alert("Game over!");
    return;
  }
  requestAnimationFrame(tick);
}
if (game.spawnEnemies) {
  setInterval(() => {
    spawnEnemies(game);
  }, 500);
}

if (game.spawnBoosts) {
  setInterval(() => {
    spawnBoosts(game);
  }, game.boostSpawnRate);
}
