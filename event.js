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
}
