export class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
export class Velocity {
  constructor(dx, dy) {
    this.dx = dx;
    this.dy = dy;
  }
}
export class Entity {
  constructor(position) {
    this.position = position;
  }
  draw() {}
  tick() {}
}
