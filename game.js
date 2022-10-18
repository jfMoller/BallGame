import { Boost, boostEffect, spawnBoosts } from "./boost.js";
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
    this.entities = [new Player(new Position(halfWidth, halfHeight))];
    this.shield = new Shield(new Position(halfWidth, halfHeight));
    this.player = this.entities[0];
    this.deltaTime = 0;
    this.score = 0;
    this.difficulty = 0;
  }
  start() {
    tick();
  }
}

export const game = new Game(canvas, context);

let lastTick = Date.now();
let lastTime = Date.now();

function tick() {
  let currentTick = Date.now();
  game.deltaTime = (currentTick - lastTick) / 1000;
  lastTick = currentTick;
  context.clearRect(0, 0, width, height);

  //score, +1 point per second elapsed ingame
  let currentTime = Date.now();
  game.score = Math.floor((currentTime - lastTime) / 1000);

  //game interface
  gameInterface(game.player.shieldReady, game.player.lives, game.score);

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
        if (entity.type === "healing") {
          game.player.buff.healing = true;
        } else if (entity.type === "speed") {
          game.player.buff.speed = true;
        } else if (entity.type === "invunerable") {
          game.player.buff.invunerable = true;
        }
      }
    }

    //initiates count down for shield ability
    if (game.player.shieldReady === false) {
      game.player.shieldTimer++;
    }
    //const value -> 30000 may need to change depending on FPS, may need deltaTime
    if (game.player.shieldTimer % 30000 === 0) {
      game.player.shieldReady = true;
      game.player.shieldTimer = 0;
    }
    //when shield is activated
    if (game.player.shield) {
      game.shield.sizeTimer--;
      game.shield.draw();
      game.shield.tick(game);
      game.shield.bounce();

      //to shrink shield size before it disappears
      if (game.shield.sizeTimer < 1000) {
        game.shield.radius -= 0.1;
      }
      if (game.shield.sizeTimer === 0) {
        game.player.shield = false;
        game.shield.sizeTimer = 10000;
        game.shield.radius = 100;
      }
    }
  }

  if (game.player.lives === 0) {
    alert("Game over!");
    return;
  }

  boostEffect(game);

  requestAnimationFrame(tick);
}
setInterval(() => {
  spawnEnemies(game);
}, 500);

setInterval(() => {
  spawnBoosts(game);
}, 5000);
