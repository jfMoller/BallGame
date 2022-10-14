import { Entity, Position, Velocity } from "./entity.js";
import { Player } from "./player.js";
import { context, game } from "./game.js";

export class Shield extends Entity {
  constructor(position) {
    super(position)
    this.velocity = new Velocity(100, 100);
    this.radius = 100;
    this.color = "rgba(255, 239, 98, 0.2)";
    this.borderColor = "yellow";
    this.lineWidth = 1;
    this.id = "Shield";
  }
  draw(game) {
    if (game.player.shield){
    context.beginPath();
    context.fillStyle = this.color;
    context.strokeStyle = this.borderColor;
    context.lineWidth = this.lineWidth;
    context.arc(
      game.shield.position.x,
      game.shield.position.y,
      this.radius,
      0,
      Math.PI * 2
    );
    context.stroke();
    context.fill();
    context.closePath();
    setTimeout(function () {
    game.player.shield = false;
    }, 5000);
    }
  }
  tick(game, deltaTime) {
    
    this.position.x = this.velocity.dx * deltaTime;
    this.position.y = this.velocity.dy * deltaTime;
   
    
  }
}

  export function collisionOfShieldAndEnemy(shield, enemy) {
    let distance = Math.sqrt(
      (shield.position.x - enemy.position.x) ** 2 +
        (shield.position.y - enemy.position.y) ** 2
    );
    return distance;
  }

