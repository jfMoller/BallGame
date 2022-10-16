import { interfaceContext, game, width, height } from "./game.js";

export function shieldInterface() {
    interfaceContext.font = "40px serif";
    interfaceContext.fillStyle = "black";
    interfaceContext.textAlign = "center";
    interfaceContext.textBaseline = "center";

    let shieldStatus = " not ready"
    if (game.player.shieldReady) {
        shieldStatus = " ready!"
    }
    interfaceContext.fillText("🛡️ shield" + shieldStatus, 1400 / 2, 100 / 2 - 10)
}