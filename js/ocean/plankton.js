function Plankton(x, y) {
  this.pos = createVector(x, y)



  this.show = function() {
    fill(107, 142, 35)
    stroke(0)
    ellipse(this.pos.x, this.pos.y, 4, 4)
  }
}
