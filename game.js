import { Boost, boostEffect, spawnBoosts, stopBoostEffect } from "./boost.js";
import { Enemy, spawnEnemies } from "./enemy.js";
import { Position } from "./entity.js";
import { Player } from "./player.js";
import { Shield } from "./shield.js";
import { circlesCollide, isOutsideCanvas } from "./utility.js";
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
    this.difficulty = 0;
    this.tickTime = 0;
    this.boostTime = 0;

    this.spawnEnemies = true;
    this.enemySpawnRate = 500; //ms
    this.spawnBoosts = true;
    this.boostSpawnRate = 5000; //ms
  }
  start() {
    tick();
  }
}

export const game = new Game(canvas, context);

let lastTick = Date.now();
let boostTickTime = null;
let shieldTickTime = null;

function tick() {
  let currentTick = Date.now();
  game.deltaTime = (currentTick - lastTick) / 1000;
  lastTick = currentTick;
  context.clearRect(0, 0, width, height);

  //time elapsed since start
  game.tickTime += game.deltaTime;

  //score, +1 point per second elapsed ingame
  game.score = Math.floor(game.tickTime);
  //game interface
  gameInterface(game.shield.ready, game.player.lives, game.score);

  //draws and moves all objects in game array
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
        circlesCollide(game.player, enemy, 0) &&
        game.player.buff.invunerable !== true
      ) {
        game.entities.splice(i--, 1);
        game.player.lives--;
      }
      if (game.player.shield) {
        if (circlesCollide(game.shield, enemy, -20)) {
          game.entities.splice(i--, 1);
        } else if (circlesCollide(game.shield, enemy, 0)) {
          enemy.velocity.dx *= -1;
          enemy.velocity.dy *= -1;
        }
      }
    }

    if (entity instanceof Boost) {
      let boost = entity;

      if (circlesCollide(game.player, boost, 0)) {
        game.entities.splice(i--, 1);
        boostTickTime = game.tickTime;
        boostEffect(game, boost);
      }
    }
    if (game.tickTime - boostTickTime > 5) {
      stopBoostEffect(game);
    }

  } //END OF FOOR LOOP

  if (game.player.lives === 0) {
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
