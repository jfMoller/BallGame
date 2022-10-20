import { game} from "./game.js";
import {handleKeyDown, handleKeyUp} from "./event.js";

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

//startscreen

game.start();

//endscreen

//building interface

/* textUi.innerText = "testing" */


 