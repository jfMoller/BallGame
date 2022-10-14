import {
  Boost,
  boostEffect,
  collisionOfBoostAndPlayer,
  spawnBoosts,
} from "./boost.js";
import {
  Enemy,
  spawnEnemies,
  removesEnemies,
  drawEnemyFaces,
} from "./enemy.js";
import { Entity, Position, Velocity } from "./entity.js";
import { Player, drawPlayerLives } from "./player.js";
import { Shield, triggerShield } from "./shield.js";
import { circlesCollide } from "./utility.js";

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
    ];
    this.player = this.entities[0];
  }
  start() {
    tick();
  }
}

export const game = new Game(canvas, context);

let lastTick = Date.now();

let EnemyTickCount = 0;
let BoostTickCount = 0;
function tick() {
  let currentTick = Date.now();
  let deltaTime = (currentTick - lastTick) / 1000;
  lastTick = currentTick;
  EnemyTickCount++;
  BoostTickCount++;
  context.clearRect(0, 0, width, height);

  //draws and moves all objects in game array
  for (let i = 0; i < game.entities.length; ++i) {
    let entity = game.entities[i];
    entity.tick(game, deltaTime);
    entity.draw(game);

    if (entity instanceof Enemy) {
      drawEnemyFaces(entity);
    }
  }
  drawPlayerLives(game);
  //creates shield around player if player presses space
  triggerShield(game);
  //removes enemies which collides with the player
  for (let i = 0; i < game.entities.length; ++i) {
    let entity = game.entities[i];
    
    if (
      circlesCollide(game.player, entity) &&
      entity instanceof Enemy &&
      game.player.buff.invunerable !== true
    ) {
      game.entities.splice(i, 1);
      game.player.lives--;
    }
   /*  if (
      circlesCollide(shield, entity) &&
      shield !== undefined &&
      entity instanceof Enemy
    ) {
      console.log("hit")
    } */
    
    //removes boosts if the player touches them
    if (collisionOfBoostAndPlayer(game, entity) && entity instanceof Boost) {
      game.entities.splice(i, 1);
      if (entity.type === "healing") {
        game.player.buff.healing = true;
        console.log(game.player.lives);
      }
      if (entity.type === "speed") {
        game.player.buff.speed = true;
      }
      if (entity.type === "invunerable") {
        game.player.buff.invunerable = true;
      }
    }
     /*  if (
        shieldCollide(entity) &&
        entity instanceof Entity
      ) {
        console.log("hit");
      } */
    }

  if (game.player.lives === 0) {
    alert("Game over!");
    return;
  }

  if (EnemyTickCount % 20 === 0) {
    EnemyTickCount = 0;
    spawnEnemies(game); //spawns enemies from different directions
  }
  removesEnemies(game); //removes enemies that exit the canvas

  if (BoostTickCount % 500 === 0) {
    BoostTickCount = 0;
    spawnBoosts(game); //spawns boosts in different position on the canvas
  }
  boostEffect(game);




  requestAnimationFrame(tick);
}
