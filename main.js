import { game} from "./game.js";
import {handleKeyDown, handleKeyUp} from "./event.js";
import { activateShield } from "./shield.js";
import { gameInterface } from "./interface.js";

window.addEventListener("keydown", activateShield);
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

//startscreen

game.start();

//endscreen

//building interface

/* textUi.innerText = "testing" */


 