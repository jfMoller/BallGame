import { game, width, height } from "./game.js";

const textUi = document.getElementById("topUi");
const textUi2 = document.getElementById("bottomUi");

export function gameInterface(
  shieldStatus,
  healthStatus,
  boostStatus,
  scoreStatus
) {
  //shield
let status = shieldStatus;
if (status === false) {
status = "not ready"
}
else if (status === true) {
status = "ready! (press space)"
}
//health
let status2 = "";
for (let n = 0; n < healthStatus; ++n) {
status2 += "❤️";
}
//boost
if (boostStatus === "") {
  boostStatus = "none";
}


textUi2.innerText =
"Score: " + scoreStatus

  textUi.innerText =
    "🛡️ shield: " +
    status + " ----------- " +
    "health: " +
    status2 + " ----------- " +
    "Boost: " + boostStatus;

  textUi.style.fontSize = "40px";
  textUi.style.textAlign = "center";
  textUi.style.tex;
  textUi.style.textBaseline = "center";
  textUi2.style.fontSize = "40px";
  textUi2.style.textAlign = "center";
  textUi2.style.tex;
  textUi2.style.textBaseline = "center";
}
