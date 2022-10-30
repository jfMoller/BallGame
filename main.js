import { game } from "./game.js";
import { handleKeyDown, handleKeyUp } from "./event.js";

//player and shield movement, depending on user input
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

//future startscreen

game.start();

//future endscreen
