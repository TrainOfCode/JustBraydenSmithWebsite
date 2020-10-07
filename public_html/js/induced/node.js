function Node(x, y) {
  this.y = y;
  this.x = x;

  this.show = function() {
    fill(255,0,0)
    ellipse(this.x, this.y, 16, 16);
  }

}
