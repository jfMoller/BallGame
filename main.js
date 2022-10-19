import { game} from "./game.js";
import {handleKeyDown, handleKeyUp} from "./event.js";
import { handleSpaceDown, handleSpaceUp } from "./shield.js";

window.addEventListener("keydown", handleSpaceDown);
window.addEventListener("keyup", handleSpaceUp);
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

//startscreen

game.start();

//endscreen

//building interface

/* textUi.innerText = "testing" */


 