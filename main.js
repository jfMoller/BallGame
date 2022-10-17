import { game} from "./game.js";
import {handleKeyDown, handleKeyUp} from "./event.js";
import { gameInterface } from "./interface.js";

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

game.start();

//building interface

/* textUi.innerText = "testing" */


 