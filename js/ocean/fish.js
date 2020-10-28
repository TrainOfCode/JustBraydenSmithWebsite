function Fish(x, y) {
  this.pos = createVector(x, y)
  this.vel = createVector();
  this.acc = createVector();


  this.target = null

  this.mode = "n"


  this.applyForce = function(f) {
    this.acc.add(f);
  };

  this.update = function() {

    this.friction()

    if (this.vel.magSq() < .1) {
      this.vel.mult(0)
    }

    if(this.mode == "seek") {
      desired = this.pos.copy()
      desired.sub(this.target.pos)
      desired.limit(10)
      desired.sub(this.vel)
      desired.mult(-1)
      this.applyForce(desired)
    }

    this.vel.limit(10)


    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
    this.checkPos()

  };

  this.seek = function(plankton) {
    if (this.distBetween(this.pos.x, plankton.pos.x, this.pos.y, plankton.pos.y) < 200) {
      this.mode = "seek"
      if (this.target == null || this.distBetween(this.pos.x, plankton.pos.x, this.pos.y, plankton.pos.y)
      < this.distBetween(this.target.pos.x, this.pos.x, this.target.pos.y, this.pos.y)) {
        this.target = plankton
      }
    }
  }

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

  this.distBetween = function(x1, x2, y1, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
}
