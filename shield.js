import { Entity, Position, Velocity } from "./entity.js";
import { Player } from "./player.js";
import { context, game } from "./game.js";

export class Shield extends Entity {
  constructor(position) {
    super(position)
    this.velocity = new Velocity(
      game.player.velocity.dx,
      game.player.velocity.dy
    );
    this.radius = 60;
    this.color = "rgba(255, 239, 98, 0.2)";
    this.borderColor = "yellow";
    this.lineWidth = 1;
    this.id = "Shield";
  }
  draw(game) {
    context.beginPath();
    context.fillStyle = this.color;
    context.strokeStyle = this.borderColor;
    context.lineWidth = this.lineWidth;
    context.arc(
      game.player.position.x,
      game.player.position.y,
      this.radius,
      0,
      Math.PI * 2
    );
    context.stroke();
    context.fill();
    context.closePath();
  }
  tick(game, deltaTime) {
    this.velocity.dx = game.player.velocity.dx * deltaTime;
    this.velocity.dy = game.player.velocity.dy * deltaTime;
  }
}

export function triggerShield(game) {
    if (game.player.shield) {
    game.entities.push(new Shield(game.player.position.x, game.player.position.y));
    game.player.shield = false;
 
    setTimeout(function () {
      for (let i = 1; i < game.entities.length; ++i) {
        let entity = game.entities[i];
        if (entity instanceof Shield) {
          game.entities.splice(i, 1);
        }
      }
    }, 5000);
  }
  }


