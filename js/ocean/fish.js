function Fish(x, y) {
  this.pos = createVector(x, y)
  this.vel = createVector();
  this.acc = createVector();


  this.applyForce = function(f) {
    this.acc.add(f);
  };

  this.update = function() {

    this.friction()

    if (this.vel.magSq() < .1) {
      this.vel.mult(0)
    }


    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
    this.checkPos()
  };

  this.show = function() {
    fill(255, 127, 0)
    stroke(0)
    ellipse(this.pos.x, this.pos.y, 8, 8)
  }

  this.checkPos = function() {
    if (this.pos.x > width) {
      this.pos.x = 0
    }
    if (this.pos.x < 0) {
      this.pos.x = width
    }
    if (this.pos.y > height) {
      this.pos.y = 0
    }
    if (this.pos.y < 0) {
      this.pos.y = height
    }
  }

  this.friction = function() {
    speed = this.vel.mag()
    dragMag = fishFriction * speed * speed
    friction = this.vel.copy()
    friction.normalize()
    friction.mult(dragMag)
    friction.mult(-1)
    this.applyForce(friction)
  }
}
