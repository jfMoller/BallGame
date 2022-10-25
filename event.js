import { player, shield } from "./game.js";

export function handleKeyDown(event) {
  if (event.key === "w" || event.key === "W") {
    player.keys.up = true;
  }
  if (event.key === "s" || event.key === "S") {
    player.keys.down = true;
  }
  if (event.key === "a" || event.key === "A") {
    player.keys.left = true;
  }
  if (event.key === "d" || event.key === "D") {
    player.keys.right = true;
  }
  if (event.key === " " && shield.ready && shield.radius === 100) {
    player.keys.space = true;
    shield.ready = false;
    player.shield = true;

    shield.velocity.dx = 0;
    shield.velocity.dy = 0;

    shield.position.x = player.position.x;
    shield.position.y = player.position.y;

    if (player.keys.up) {
      shield.velocity.dy -= player.velocity.dy - 100;
    }
    if (player.keys.down) {
      shield.velocity.dy += player.velocity.dy - 100;
    }
    if (player.keys.left) {
      shield.velocity.dx -= player.velocity.dx - 100;
    }
    if (player.keys.right) {
      shield.velocity.dx += player.velocity.dx - 100;
    }
  }
}
export function handleKeyUp(event) {
  if (event.key === "w" || event.key === "W") {
    player.keys.up = false;
  }
  if (event.key === "s" || event.key === "S") {
    player.keys.down = false;
  }
  if (event.key === "a" || event.key === "A") {
    player.keys.left = false;
  }
  if (event.key === "d" || event.key === "D") {
    player.keys.right = false;
  }
  if (event.key === " ") {
    player.keys.space = false;
  }
}
