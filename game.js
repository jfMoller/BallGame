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
    this.entities = [new Player(new Position(halfWidth, halfHeight))];
    this.shield = new Shield(new Position(halfWidth, halfHeight));
    this.player = this.entities[0];
    this.deltaTime = 0;
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
  game.deltaTime = (currentTick - lastTick) / 1000;
  lastTick = currentTick;
  EnemyTickCount++;
  BoostTickCount++;
  context.clearRect(0, 0, width, height);

  //draws and moves all objects in game array
  for (let i = 0; i < game.entities.length; ++i) {
    let entity = game.entities[i];
    entity.tick(game, game.deltaTime);
    entity.draw(game);

    if (entity instanceof Enemy) {
      drawEnemyFaces(entity);
    }
  }
  drawPlayerLives(game);
  //creates shield around player if player presses space

  //removes enemies which collides with the player
  for (let i = 0; i < game.entities.length; ++i) {
    let entity = game.entities[i];

    if (entity instanceof Enemy) {
      let enemy = entity;
      if (
        circlesCollide(game.player, enemy) &&
        entity instanceof Enemy &&
        game.player.buff.invunerable !== true
      ) {
        game.entities.splice(i, 1);
        game.player.lives--;
      }
      if (game.player.shieldReady === false) {
        game.player.shieldTimer--;
      }
      console.log(game.player.shieldTimer + " " + game.player.shieldReady);
      if (game.player.shieldTimer % 30000 === 0) {
        game.player.shieldReady = true;
      }

      if (game.player.shield) {
        game.shield.timer--;
        game.shield.draw();
        game.shield.tick(game);
        game.shield.bounce();
        if (
          collisionOfShieldAndEnemy(game.shield, enemy) <
          game.shield.radius - 20
        ) {
          game.entities.splice(i, 1);
        } else if (
          collisionOfShieldAndEnemy(game.shield, enemy) <=
          game.shield.radius + enemy.radius
        ) {
          enemy.velocity.dx *= -1;
          enemy.velocity.dy *= -1;
        }
        if (game.shield.timer < 1000) {
          game.shield.radius -= 0.1;
        }
        if (game.shield.timer === 0) {
          game.player.shield = false;
          game.shield.timer = 10000;
          game.shield.radius = 100;
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
