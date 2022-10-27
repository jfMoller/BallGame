import { game } from "./game.js";
export function handleKeyDown(event) {
  if (event.key === "w" || event.key === "W") {
    game.player.keys.up = true;
  }
  if (event.key === "s" || event.key === "S") {
    game.player.keys.down = true;
  }
  if (event.key === "a" || event.key === "A") {
    game.player.keys.left = true;
  }
  if (event.key === "d" || event.key === "D") {
    game.player.keys.right = true;
  }
  if (event.key === " " && game.shield.ready && game.shield.radius === 100) {
    game.player.keys.space = true;
    game.shield.ready = false;
    game.player.shield = true;

    game.shield.velocity.dx = 0;
    game.shield.velocity.dy = 0;

    game.shield.position.x = game.player.position.x;
    game.shield.position.y = game.player.position.y;

    if (game.player.keys.up) {
      game.shield.velocity.dy -= game.player.velocity.dy - 100;
    }
    if (game.player.keys.down) {
      game.shield.velocity.dy += game.player.velocity.dy - 100;
    }
    if (game.player.keys.left) {
      game.shield.velocity.dx -= game.player.velocity.dx - 100;
    }
    if (game.player.keys.right) {
      game.shield.velocity.dx += game.player.velocity.dx - 100;
    }
  }
}
export function handleKeyUp(event) {
  if (event.key === "w" || event.key === "W") {
    game.player.keys.up = false;
  }
  if (event.key === "s" || event.key === "S") {
    game.player.keys.down = false;
  }
  if (event.key === "a" || event.key === "A") {
    game.player.keys.left = false;
  }
  if (event.key === "d" || event.key === "D") {
    game.player.keys.right = false;
  }
  if (event.key === " ") {
    game.player.keys.space = false;
  }
}
