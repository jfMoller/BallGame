import { Position } from "./entity.js";
import { addsTextToCanvas } from "./utility.js";
import { Entity } from "./entity.js";

export class Menu extends Entity {
  constructor(position) {
  super (position);
  this.shieldStatus = "";
  this.healthStatus = "";
  this.scoreStatus = "";
  }
  draw(context, game) {
  addsTextToCanvas(context, "Shield: " + this.shieldStatus, "30px", new Position( canvas.width * 0.25, 50))

  addsTextToCanvas(context, "Health: " + this.healthStatus, "30px", new Position( canvas.width * 0.5, 50))

  addsTextToCanvas(context, "Score: " + this.scoreStatus, "30px", new Position( canvas.width * 0.75, 50))

  }
  tick(game) {
    this.shieldStatus = null;
    if (game.shield.ready === false) {
      this.shieldStatus = " ⬛️⬛️⬛️⬛️";
    }
    if (
      game.tickTime - game.shield.tickTime > (game.shield.readyIn * 1) / 4 &&
      game.tickTime - game.shield.tickTime < (game.shield.readyIn * 2) / 4
    ) {
      this.shieldStatus = " 🟩⬛️⬛️⬛️";
    }
    if (
      game.tickTime - game.shield.tickTime > (game.shield.readyIn * 2) / 4 &&
      game.tickTime - game.shield.tickTime < (game.shield.readyIn * 3) / 4
    ) {
      this.shieldStatus = " 🟩🟩⬛️⬛️";
    }
    if (
      game.tickTime - game.shield.tickTime > (game.shield.readyIn * 3) / 4 &&
      game.tickTime - game.shield.tickTime < (game.shield.readyIn * 4) / 4
    ) {
      this.shieldStatus = " 🟩🟩🟩⬛️";
    }
    if (game.shield.ready) {
      this.shieldStatus = " 🟩🟩🟩🟩";
    }
  
    this.healthStatus = "";
    for (let n = 0; n < game.player.lives; ++n) {
      this.healthStatus += "❤️";
    }
  
    //removes a zero from score every time a 0 is added in game.score
    this.scoreStatus = ["0", "0", "0", "0", game.score];
    let scoreArr = [10, 100, 1000, 10000, 99999];
  
    for (let num = 0; num < game.score; ++num) {
      for (let i = 0; i < scoreArr.length; i++) {
        if (num + 1 === scoreArr[i]) {
          this.scoreStatus.splice(0, 1).join(",");
        }
        if (game.score === 99999) {
          break;
        }
      }
    }
  
  }
}






  





