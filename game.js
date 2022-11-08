import { Boost } from "./boost.js";
import { Enemy } from "./enemy.js";
import { Bouncer } from "./bouncer.js";
import { Position, Velocity } from "./entity.js";
import { Menu } from "./menu.js";
import { Player } from "./player.js";
import { Shield } from "./shield.js";
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
      new Menu(new Position(0, 0)),
      new Player(new Position(halfWidth, halfHeight)),
      new Shield(new Position(halfWidth, halfHeight)),
    ];
    //index variable for all modules
    this.index = 0;

    //specific entities
    this.player = this.entities[1];
    this.shield = this.entities[2];

    //time variables
    this.deltaTime = 0;
    this.tickTime = 0;
    this.score = 0;
    this.tickTime_Effect = 0;

    //enemy settings
    this.enemiesOn = true;
    this.enemySpawnRate = 500; //ms
    this.enemiesPopped = 0;

    //special enemy settings
    this.specialEnemiesOn = true;
    this.specialEnemySpawnRate = 10000; //ms

    //boost settings
    this.boostsOn = true;
    this.boostSpawnRate = 12000; //ms
    this.boostDuration = 4; //sec
  }
  start() {
    tick();
    if (this.enemiesOn) {
      setInterval(() => {
        this.spawnEnemies();
      }, this.enemySpawnRate);
    }
    if (this.specialEnemiesOn) {
      setInterval(() => {
        this.spawnSpecialEnemies();
      }, this.specialEnemySpawnRate);
    }
    if (this.boostsOn) {
      setInterval(() => {
        this.spawnBoosts();
      }, this.boostSpawnRate);
    }
  }
  spawnEnemies() {
    let randomDirection = generatesRanNumBetween(3, 0);
    let randomVelocity = generatesRanNumBetween(50, 0);

    let enemyDirection = [
      new Enemy(
        new Position(Math.random() * width, 0),
        new Velocity(randomVelocity, 100),
        "rgba(183, 79, 111, 1)"
      ),
      new Enemy(
        new Position(0, Math.random() * height),
        new Velocity(100, randomVelocity),
        "rgba(183, 79, 111, 1)"
      ),
      new Enemy(
        new Position(width, Math.random() * height),
        new Velocity(-100, randomVelocity),
        "rgba(183, 79, 111, 1)"
      ),
      new Enemy(
        new Position(Math.random() * width, height),
        new Velocity(randomVelocity, -100),
        "rgba(183, 79, 111, 1)"
      ),
    ];
    this.entities.push(enemyDirection[randomDirection]);
  }
  spawnSpecialEnemies() {
    this.entities.push(
      new Bouncer(
        new Position(20, 10),
        new Velocity(500, 500),
        "rgb(145, 145, 233)",
        19
      )
    );
  }
  spawnBoosts() {
    let randomPositionX = generatesRanNumBetween(width - 100, 100);
    let randomPositionY = generatesRanNumBetween(height - 100, 100);
    let randomBoost = generatesRanNumBetween(2, 0);

    let boostTypes = [
      new Boost(
        new Position(randomPositionX, randomPositionY),
        "rgba(219, 48, 105, 1)",
        "healing"
      ),
      new Boost(
        new Position(randomPositionX, randomPositionY),
        "#3185FC",
        "speed"
      ),
      new Boost(
        new Position(randomPositionX, randomPositionY),
        "#F9C22E",
        "invunerable"
      ),
    ];
    this.entities.push(boostTypes[randomBoost]);
  }
}

export const game = new Game(canvas, context);

//to determine duration of effects (currently exclusive to boosts; positive effects)
game.tickTime_Effect;
//to remove graphcal flicker issue accross modules
game.index;

let lastTick = Date.now();
function tick() {
  let currentTick = Date.now();
  //to equalize game movement and durations regardless of users frame rate
  game.deltaTime = (currentTick - lastTick) / 1000;
  lastTick = currentTick;
  game.tickTime += game.deltaTime;
  game.score = Math.floor(game.tickTime) + game.enemiesPopped;
  context.clearRect(0, 0, width, height);

  //game interface prototype
/*   gameInterface(game); */

  //draws, moves, collides and handles effects of all entities
  for (game.index = 0; game.index < game.entities.length; ++game.index) {
    let entity = game.entities[game.index];
    entity.tick(game);
    entity.draw(context, game);

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
