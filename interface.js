import { game, context, width, height } from "./game.js";
import { Player } from "./player.js";

const textTop1 = document.getElementById("topUiLeft");
const textTop2 = document.getElementById("topUiRight");
const textBottom = document.getElementById("bottomUi");

export function gameInterface(game) {
  //shield
  let shieldStatus = null
  if (game.shield.ready === false) {
    shieldStatus = "⬛️⬛️⬛️⬛️";
  }
  if (
    game.tickTime - game.shield.TickTime > (game.shield.readyIn * 1 / 4) &&
    game.tickTime - game.shield.TickTime < (game.shield.readyIn * 2 / 4)
  ) {
    shieldStatus = "🟩⬛️⬛️⬛️";
  }
  if (
    game.tickTime - game.shield.TickTime > (game.shield.readyIn * 2 / 4) &&
    game.tickTime - game.shield.TickTime < (game.shield.readyIn * 3 / 4)
  ) {
    shieldStatus = "🟩🟩⬛️⬛️";
  }
  if (
    game.tickTime - game.shield.TickTime > (game.shield.readyIn * 3 / 4) &&
    game.tickTime - game.shield.TickTime < (game.shield.readyIn * 4 / 4)
  ) {
    shieldStatus = "🟩🟩🟩⬛️";
  } 
  if (game.shield.ready) {
    shieldStatus = "🟩🟩🟩🟩";
  }
  //health
  let healthStatus = "";
  for (let n = 0; n < game.player.lives; ++n) {
    healthStatus += "❤️";
  }

  textBottom.innerText = "Score: " + game.score;

  textTop1.innerText = "Shield:" + shieldStatus;

  textTop2.innerText = "Health: " + healthStatus;

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
