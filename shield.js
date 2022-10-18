import { Entity, Position, Velocity } from "./entity.js";
import { Player } from "./player.js";
import { context, game, width, height } from "./game.js";

export class Shield {
  constructor(position) {
    this.position = position;
    this.velocity = new Velocity(0, 0);
    this.radius = 100;
    this.color = "rgba(255, 239, 98, 0.02)";
    this.borderColor = "yellow";
    this.lineWidth = 1;
    this.id = "Shield";
    this.sizeTimer = 10000;
    this.lives = 10;
  }

  draw() {
    context.beginPath();
    context.fillStyle = this.color;
    context.strokeStyle = this.borderColor;
    context.lineWidth = this.lineWidth;
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.stroke();
    context.fill();
    context.closePath();
  }

  tick(game) {
    this.position.x += this.velocity.dx * game.deltaTime;
    this.position.y += this.velocity.dy * game.deltaTime;
  }

  bounce() {
    if (
      this.position.x > width - this.radius ||
      this.position.x <= this.radius
    ) {
      this.velocity.dx *= -1;
    }
    if (
      this.position.y < this.radius ||
      this.position.y > height - this.radius
    ) {
      this.velocity.dy *= -1;
    }
  }
}

export function activateShield(event) {
  if (event.key === " " && game.player.shieldReady) {
    game.player.shieldReady = false;
    game.player.shield = true;

    game.shield.position.x = 0;
    game.shield.position.y = 0;
    game.shield.velocity.dx = 0;
    game.shield.velocity.dy = 0;

    game.shield.position.x = game.player.position.x;
    game.shield.position.y = game.player.position.y;
    if (game.player.keys.up) {
      game.shield.velocity.dy -= game.player.velocity.dy * game.deltaTime;
    }
    if (game.player.keys.down) {
      game.shield.velocity.dy += game.player.velocity.dy * game.deltaTime;
    }
    if (game.player.keys.left) {
      game.shield.velocity.dx -= game.player.velocity.dx * game.deltaTime;
    }
    if (game.player.keys.right) {
      game.shield.velocity.dx += game.player.velocity.dx * game.deltaTime;
    }
  }
}

export function shieldTimer(game) {
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
