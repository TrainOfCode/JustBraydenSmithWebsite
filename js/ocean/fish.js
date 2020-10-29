function Fish(x, y) {
  this.id = id++

  this.pos = createVector(x, y)
  this.vel = p5.Vector.random2D().limit(2)
  this.acc = createVector();

  this.fishVisionRad = 200
  this.fishVision = this.fishVisionRad * this.fishVisionRad
  this.fishEatRad = 20
  this.fishEat = this.fishEatRad * this.fishEatRad

  this.storedFood = 1

  this.type = "fish"


  this.waitTime = 0

  this.target = null

  this.mode = "n"

  this.toIgnore = null


  this.applyForce = function(f) {
    this.acc.add(f);
  };

  this.update = function() {

    if( this.mode == "breeding" ) {
      if(this.distBetweenSQ(this.pos.x, this.target.pos.x, this.pos.y, this.target.pos.y) < this.fishEat) {
        if(this.mate(this.target)) {
          this.storedFood -= 4
          this.mode = "n"
        } else {
          desired = p5.Vector.sub(this.target.pos, this.pos)
          desired.normalize()
          desired.mult(fishMaxSpeed)

          steer = p5.Vector.sub(desired, this.vel)

          steer.limit(fishMaxForce)
          this.applyForce(steer)
          this.waitTime -= .1
        }
      } else {
        if(this.waitTime < 0) {
          //give up
          this.toIgnore = this.target.id
          this.target = null
          this.mode = "breed"
          this.waitTime = 30
        } else {
          desired = p5.Vector.sub(this.target.pos, this.pos)
          desired.normalize()
          desired.mult(fishMaxSpeed)

          steer = p5.Vector.sub(desired, this.vel)

          steer.limit(fishMaxForce)
          this.applyForce(steer)
          this.waitTime -= .1
        }
      }
    }

    if(this.mode == "breed") {
      if (this.storedFood < 4) {
        this.mode = "n"
        this.toIgnore = -1
      }
    }

    if(this.mode == "seek") {
      if(this.distBetweenSQ(this.pos.x, this.target.pos.x, this.pos.y, this.target.pos.y) < this.fishEat) {
        this.eat(this.target)
        this.storedFood++
        if(this.storedFood > 4) {
          this.mode = "breed"
        } else {
          this.mode = "n"
        }
      } else {
        if(!this.target.eaten) {
          desired = p5.Vector.sub(this.target.pos, this.pos)
          desired.normalize()
          desired.mult(fishMaxSpeed)

          steer = p5.Vector.sub(desired, this.vel)

          steer.limit(fishMaxForce)
          this.applyForce(steer)
        } else {
          this.mode = "n"
          this.target = null
        }
      }
    }

    this.checkPos()

    this.pos.add(this.vel);

    this.vel.add(this.acc);
    this.acc.mult(0);

    this.storedFood -= this.vel.mag()/500
    if(this.storedFood < -2) {
      return false
    }
    return true

  };

  this.seek = function(possTarg) {
    if (this.distBetweenSQ(this.pos.x, possTarg.pos.x, this.pos.y, possTarg.pos.y) < this.fishVision) {
      if (possTarg.type == "plankton" && this.storedFood < 5) {
        this.mode = "seek"
        if (this.target == null || this.distBetweenSQ(this.pos.x, possTarg.pos.x, this.pos.y, possTarg.pos.y)
        < this.distBetweenSQ(this.target.pos.x, this.pos.x, this.target.pos.y, this.pos.y)) {
          this.target = possTarg
        }
      }
      else if (possTarg.type == "fish" && this.mode == "breed") {
        if(possTarg.id != this.toIgnore) {
          this.target = possTarg
          this.mode = "breeding"
          this.waitTime = 30
        }
        else if(this.waitTime < 0) {
          this.toIgnore = -1
        }
        else if(this.waitTime > 0) {
          this.waitTime -= .1
        }
      }
    }
  }

  this.show = function() {
    noFill()
    stroke("red")
    ellipse(this.pos.x, this.pos.y, 2*Math.sqrt(this.fishEat))
    stroke(0)
    ellipse(this.pos.x, this.pos.y, 2*Math.sqrt(this.fishVision))
    fill(255 - ((this.storedFood * 10) % 255), 127 + ((this.storedFood * 10) % 255), ((this.storedFood * 30) % 255))
    if(this.mode == "breed") {
      fill(255, 255, 255)
    }
    if(this.mode == "breeding") {
      fill(0, 0, 0)
    }
    beginShape()
    theta = this.vel.copy()
    if(theta.magSq() == 0) {
      theta.set(1, 0)
    }
    theta.normalize()
    theta.mult(15)
    vertex(this.pos.x + theta.x, this.pos.y + theta.y)
    theta.mult(.75)
    theta.rotate(2.53073)
    vertex(this.pos.x + theta.x, this.pos.y + theta.y)
    theta.rotate(1.22173)
    vertex(this.pos.x + theta.x, this.pos.y + theta.y)
    theta.rotate(2.53073)
    theta.mult(1.3333)
    vertex(this.pos.x + theta.x, this.pos.y + theta.y)
    endShape()

    let s = this.id
    fill(255)
    text(s, 20 * (this.id + 1), 20 * (1 + Math.floor(this.id / 20)), 20, 20)
  }

  this.checkPos = function() {
    // if (this.pos.x > width) {
    //   this.pos.x = 0
    // }
    // if (this.pos.x < 0) {
    //   this.pos.x = width
    // }
    // if (this.pos.y > height) {
    //   this.pos.y = 0
    // }
    // if (this.pos.y < 0) {
    //   this.pos.y = height
    // }

    if ( this.pos.x < 25) {
      desired = createVector(fishMaxSpeed, this.vel.y)
      steer = p5.Vector.sub(desired, this.vel)
      steer.limit(fishMaxForce)
      this.applyForce(steer)
    }

    if ( this.pos.x > width - 25) {
      desired = createVector(-1 * fishMaxSpeed, this.vel.y)
      steer = p5.Vector.sub(desired, this.vel)
      steer.limit(fishMaxForce)
      this.applyForce(steer)
    }

    if ( this.pos.y > height - 25) {
      desired = createVector(this.vel.x, -1 * fishMaxSpeed)
      steer = p5.Vector.sub(desired, this.vel)
      steer.limit(fishMaxForce)
      this.applyForce(steer)
    }

    if ( this.pos.y < 25) {
      desired = createVector(this.vel.x,fishMaxSpeed)
      steer = p5.Vector.sub(desired, this.vel)
      steer.limit(fishMaxForce)
      this.applyForce(steer)
    }
  }

  this.eat = function(target) {
    target.eaten = true
    this.target = null
  }

  this.mate = function(target) {
    if (target.mode == "breeding") {
      target.mode = "n"
      this.mode = "n"
      target.storedFood -= 2
      this.storedFood -= 2

      newBaby = createVector(this.pos.x, this.pos.y)

      return true
    }
    return false
  }

  this.distBetweenSQ = function(x1, x2, y1, y2) {
    return Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
  }
}
