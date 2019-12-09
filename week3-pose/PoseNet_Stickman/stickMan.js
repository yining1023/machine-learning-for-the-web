class StickMan{
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.moveDirection = 0;
  }

  move(pose) {
    // Based on the current pose: the distance between right left wrists positions to the nose
    const rightWrist = pose.rightWrist;
    const leftWrist = pose.leftWrist;
    if (rightWrist || leftWrist) {
      const nose = pose.nose;

      const rightDistance = Math.abs(rightWrist.x - nose.x);
      const leftDistance = Math.abs(leftWrist.x - nose.x);

      if (rightDistance - leftDistance > 20) this.moveDirection = 1;
      else if (leftDistance - rightDistance > 20) this.moveDirection = -1;

      this.x += this.moveDirection * 2;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
    }
  }

  show() {
    background(255);
    strokeWeight(3);
    noFill();
    // Head
    ellipse(this.x, this.y, 30, 30);
    // Body
    line(this.x, this.y + 15, this.x, this.y + 45);
    // Left arm
    line(this.x, this.y + 15, this.x - 15, this.y + 45);
    // Right arm
    line(this.x, this.y + 15, this.x + 15, this.y + 45);
    // Left leg
    line(this.x, this.y + 45, this.x - 15, this.y + 75);
    // Right leg
    line(this.x, this.y + 45, this.x + 15, this.y + 75);

    if (this.moveDirection === -1) {
      fill(255, 0, 0);
      ellipse(this.x - 15, this.y + 45, 10, 10);
    } else if (this.moveDirection === 1) {
      fill(255, 0, 0);
      ellipse(this.x + 15, this.y + 45, 10, 10);
    }
  }
}
