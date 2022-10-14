import { Entity, Position, Velocity } from "./entity.js";
import { Player } from "./player.js";
import { context, game } from "./game.js";

export class Shield extends Entity {
  constructor(position, velocity) {
    super(position)
    this.velocity = velocity;
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
    if (game.player.shield){
    this.position.x = this.velocity.dx * deltaTime;
    this.position.y = this.velocity.dy * deltaTime;
    }
  }
}

export function triggerShield(game) {
    if (game.player.shield) {
    game.entities.push(new Shield(new Position(game.player.position.x, game.player.position.y)),
    new Velocity(game.player.velocity.dx, game.player.velocity.dy));
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
  export function collisionOfShieldAndEnemy(shield, enemy) {
    let distance = Math.sqrt(
      (shield.position.x - enemy.position.x) ** 2 +
        (shield.position.y - enemy.position.y) ** 2
    );
    if (distance < shield.radius + enemy.radius) {
      return true;
    } else {
      return false;
    }
  }

