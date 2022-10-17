import { Boost, boostEffect, drawBoostType, spawnBoosts } from "./boost.js";
import {
  Enemy,
  spawnEnemies,
  removesEnemies,
  drawEnemyFaces,
} from "./enemy.js";
import { Position } from "./entity.js";
import { Player, drawPlayerFaces } from "./player.js";
import { Shield } from "./shield.js";
import { circlesCollide } from "./utility.js";
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
let enemyTickCount = 0;
let boostTickCount = 0;

function tick() {
  let currentTick = Date.now();
  game.deltaTime = (currentTick - lastTick) / 1000;
  lastTick = currentTick;
  enemyTickCount++;
  boostTickCount++;
  context.clearRect(0, 0, width, height);
  //score, +1 point per second elapsed ingame
  let currentTime = Date.now();
  game.score = Math.floor((currentTime - lastTime) / 1000);

  //draws and moves all objects in game array
  for (let i = 0; i < game.entities.length; ++i) {
    let entity = game.entities[i];
    entity.tick(game, game.deltaTime);
    entity.draw(game);

    if (entity instanceof Enemy) {
      drawEnemyFaces(entity);
    }
  }
  //face change as a result of changed amount of player lives
  drawPlayerFaces(game);

  //removes enemies which collides with the player
  for (let i = 0; i < game.entities.length; ++i) {
    let entity = game.entities[i];

    if (entity instanceof Enemy) {
      let enemy = entity;
      //when colliding with player
      if (
        circlesCollide(game.player, enemy, 0) &&
        game.player.buff.invunerable !== true
      ) {
        game.entities.splice(i, 1);
        
        game.player.lives--;
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
        if (circlesCollide(game.shield, enemy, -20)) {
          game.entities.splice(i, 1);
        } else if (circlesCollide(game.shield, enemy, 0)) {
          enemy.velocity.dx *= -1;
          enemy.velocity.dy *= -1;
        }
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

      removesEnemies(enemy); //removes enemies that exit the canvas
    }
    //removes boosts if the player touches them
    if (entity instanceof Boost) {
      let boost = entity;
      drawBoostType(boost);
      if (circlesCollide(game.player, boost, 0)) {
        game.entities.splice(i, 1);
        if (entity.type === "healing") {
          game.player.buff.healing = true;
        }
        if (entity.type === "speed") {
          game.player.buff.speed = true;
        }
        if (entity.type === "invunerable") {
          game.player.buff.invunerable = true;
        }
      }
    }
  }

  if (game.player.lives === 0) {
    alert("Game over!");
    return;
  }

  //add difficulty here

  if (enemyTickCount % 20 === 0) {
    enemyTickCount = 0;
    spawnEnemies(game); //spawns enemies from different directions
  }

  if (boostTickCount % 500 === 0) {
    boostTickCount = 0;
    spawnBoosts(game); //spawns boosts in different position on the canvas
  }
  boostEffect(game);

  //game interface
  gameInterface(game.player.shieldReady, game.player.lives, game.score);

  requestAnimationFrame(tick);
}
