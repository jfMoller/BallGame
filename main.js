import { game} from "./game.js";
import {handleKeyDown, handleKeyUp} from "./event.js";

window.addEventListener("keypress", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

game.start();
