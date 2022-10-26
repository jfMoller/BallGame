const textTop1 = document.getElementById("topUiLeft");
const textTop2 = document.getElementById("topUiRight");
const textBottom = document.getElementById("bottomUi");

export function gameInterface(game) {
  
  let shieldStatus = null;
  if (game.shield.ready === false) {
    shieldStatus = " ⬛️⬛️⬛️⬛️";
  }
  if (
    game.tickTime - game.shield.tickTime > (game.shield.readyIn * 1) / 4 &&
    game.tickTime - game.shield.tickTime < (game.shield.readyIn * 2) / 4
  ) {
    shieldStatus = " 🟩⬛️⬛️⬛️";
  }
  if (
    game.tickTime - game.shield.tickTime > (game.shield.readyIn * 2) / 4 &&
    game.tickTime - game.shield.tickTime < (game.shield.readyIn * 3) / 4
  ) {
    shieldStatus = " 🟩🟩⬛️⬛️";
  }
  if (
    game.tickTime - game.shield.tickTime > (game.shield.readyIn * 3) / 4 &&
    game.tickTime - game.shield.tickTime < (game.shield.readyIn * 4) / 4
  ) {
    shieldStatus = " 🟩🟩🟩⬛️";
  }
  if (game.shield.ready) {
    shieldStatus = " 🟩🟩🟩🟩";
  }
  
  let healthStatus = "";
  for (let n = 0; n < game.player.lives; ++n) {
    healthStatus += "❤️";
  }

  //removes a zero from score every time a 0 is added in game.score
  let scoreStatus = ["0", "0", "0", "0", game.score];
  let scoreArr = [10, 100, 1000, 10000, 99999];

  for (let num = 0; num < game.score; ++num) {
    for (let i = 0; i < scoreArr.length; i++) {
      if (num + 1 === scoreArr[i]) {
        scoreStatus.splice(0, 1);
      }
      if (game.score === 99999) {
        break;
      }
    }
  }

  textBottom.innerText = "Score: " + scoreStatus.join("");
  styling(textBottom);
  textTop1.innerText = "Shield:" + shieldStatus;
  styling(textTop1);
  textTop2.innerText = "Health: " + healthStatus;
  styling(textTop2);

  function styling(element) {
    element.style.fontSize = "40px";
    element.style.color = "white"
    element.style.textAlign = "center";
    element.style.textBaseline = "center";
  }
}
