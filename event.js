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
