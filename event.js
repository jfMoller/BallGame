import { game } from "./game.js";

export function handleKeyDown(event) {
  if (event.key === "w") {
    game.player.keys.up = true;
  }
  if (event.key === "s") {
    game.player.keys.down = true;
  }
  if (event.key === "a") {
    game.player.keys.left = true;
  }
  if (event.key === "d") {
    game.player.keys.right = true;
  }
  if (event.key === " ") {
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
    if (
      game.player.keys.down
    ) {
      game.shield.velocity.dy += game.player.velocity.dy * game.deltaTime;
    }
    if (game.player.keys.left) {
      game.shield.velocity.dx -= game.player.velocity.dx * game.deltaTime;
    }
    if (
      game.player.keys.right
    ) {
      game.shield.velocity.dx += game.player.velocity.dx * game.deltaTime;
    }
  }
}
export function handleKeyUp(event) {
  if (event.key === "w") {
    game.player.keys.up = false;
  }
  if (event.key === "s") {
    game.player.keys.down = false;
  }
  if (event.key === "a") {
    game.player.keys.left = false;
  }
  if (event.key === "d") {
    game.player.keys.right = false;
  }
}
