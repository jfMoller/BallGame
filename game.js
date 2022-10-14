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
import { collisionOfShieldAndEnemy, Shield } from "./shield.js";
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
      new Shield(new Position(halfWidth, halfHeight))
    ];
    this.player = this.entities[0];
    this.shield = this.entities[1];
  }
  start() {
    tick();
  }
}

export const game = new Game(canvas, context);

let lastTick = Date.now();
let EnemyTickCount = 0;
let BoostTickCount = 0;

console.log(game.shield.position.x)
console.log(game.shield.position.y)


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
  /* triggerShield(game); */
  //removes enemies which collides with the player
  for (let i = 0; i < game.entities.length; ++i) {
    let entity = game.entities[i];
    
    if (entity instanceof Enemy) {
      let enemy = entity;
    if (
      circlesCollide(game.player, enemy) &&
      entity instanceof Enemy &&
      game.player.buff.invunerable !== true &&
      game.player.shield !== true
    ) {
      game.entities.splice(i, 1);
      game.player.lives--;
    }
    if (game.player.shield) {
      if (collisionOfShieldAndEnemy(game.shield, enemy) < game.shield.radius + enemy.radius) {
      enemy.velocity.dx *= -1;
      enemy.velocity.dy *= -1;
    }
  }

    removesEnemies(enemy); //removes enemies that exit the canvas
  }
    //removes boosts if the player touches them
    if (entity instanceof Boost) {
      let boost = entity;
    if (collisionOfBoostAndPlayer(game, boost) && entity instanceof Boost) {
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
  }

  
      }

    
    

  if (game.player.lives === 0) {
    alert("Game over!");
    return;
  }

  if (EnemyTickCount % 20 === 0) {
    EnemyTickCount = 0;
    spawnEnemies(game); //spawns enemies from different directions
  }

  if (BoostTickCount % 500 === 0) {
    BoostTickCount = 0;
    spawnBoosts(game); //spawns boosts in different position on the canvas
  }
  boostEffect(game);




  requestAnimationFrame(tick);
}
