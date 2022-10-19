import { game, width, height } from "./game.js";
import { Player } from "./player.js";

const textTop1 = document.getElementById("topUiLeft");
const textTop2 = document.getElementById("topUiRight");
const textBottom = document.getElementById("bottomUi");

export function gameInterface(
  shieldStatus,
  healthStatus,
  scoreStatus
) {
  //shield
let status = shieldStatus;
if (game.shield.timer < (30000 * 1/4)) {
  status = "⬛️⬛️⬛️⬛️"
  }
if (game.shield.timer >= (30000 * 1/4) &&
game.shield.timer < (30000 * 2/4)) {
status = "🟩⬛️⬛️⬛️"
}
if (game.shield.timer >= (30000 * 2/4) &&
game.shield.timer < (30000 * 3/4)) {
status = "🟩🟩⬛️⬛️"
}
if (game.shield.timer >= (30000 * 3/4) &&
  game.shield.timer < (30000 * 4/4)) {
status = "🟩🟩🟩⬛️"
}

else if (game.shield.ready) {
status = "🟩🟩🟩🟩"
}
//health
let status2 = "";
for (let n = 0; n < healthStatus; ++n) {
status2 += "❤️";
}

textBottom.innerText =
"Score: " + scoreStatus

  textTop1.innerText =
    "Shield:" +
    status;

  textTop2.innerText =
    "Health: " +
    status2;

  textTop1.style.fontSize = "40px";
  textTop1.style.textAlign = "center";
  textTop1.style.tex;
  textTop1.style.textBaseline = "center";

  textTop2.style.fontSize = "40px";
  textTop2.style.textAlign = "center";
  textTop2.style.tex;
  textTop2.style.textBaseline = "center";

  textBottom.style.fontSize = "40px";
  textBottom.style.textAlign = "center";
  textBottom.style.tex;
  textBottom.style.textBaseline = "center";
}
