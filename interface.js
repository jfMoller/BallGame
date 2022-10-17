import { game, width, height } from "./game.js";
import { Player } from "./player.js";

const textUi = document.getElementById("topUi");
const textUi2 = document.getElementById("bottomUi");

export function gameInterface(
  shieldStatus,
  healthStatus,
  scoreStatus
) {
  //shield
let status = shieldStatus;
if (status === false) {
status = "⏱"
}
else if (status === true) {
status = "🛡️"
}
//health
let status2 = "";
for (let n = 0; n < healthStatus; ++n) {
status2 += "❤️";
}

textUi2.innerText =
"Score: " + scoreStatus

  textUi.innerText =
    "Shield:" +
    status + "-------------" +
    "Health: " +
    status2;

  textUi.style.fontSize = "40px";
  textUi.style.textAlign = "center";
  textUi.style.tex;
  textUi.style.textBaseline = "center";

  textUi2.style.fontSize = "40px";
  textUi2.style.textAlign = "center";
  textUi2.style.tex;
  textUi2.style.textBaseline = "center";
}
