class Square {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.isInside = false;
  }

  show() {
    if (this.isInside) fill(0, 255, 0);
    else fill(255, 0, 0);
    noStroke();
    rect(this.x, this.y, this.size, this.size);
  }

  checkIfInside(positionX, positionY) {
    if (positionX >= this.x - this.size / 2 && positionX <= this.x + this.size /  2 &&
      positionY >= this.y - this.size / 2 && positionY <= this.y + this.size /  2
    ) {
      this.isInside = true;
    } else this.isInside = false;
  }
}
