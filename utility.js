import { width, height } from "./game.js";

export function generatesRanNumBetween(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isColliding(circle1, circle2, optionalModifier) {
  let distance = Math.sqrt(
    (circle1.position.x - circle2.position.x) ** 2 +
      (circle1.position.y - circle2.position.y) ** 2
  );
  if (distance < circle1.radius + optionalModifier + circle2.radius) {
    return true;
  } else {
    return false;
  }
}

export function isOutsideCanvas(entity) {
  if (
    entity.position.x > width + entity.radius ||
    entity.position.x < -entity.radius ||
    entity.position.y < -entity.radius ||
    entity.position.y > height + entity.radius
  ) {
    return true;
  } else {
    return false;
  }
}

export function addsTextToCanvas(ctx, text, fontSize, position) {
  ctx.font = fontSize.concat(" " + "Monospace");
  
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, position.x, position.y);
}
