function Node(x, y) {
  this.y = y;
  this.x = x;

  this.show = function(selected) {
    if(!selected) {
      fill(255,0,0);
    } else {
      fill(255);
    }
    ellipse(this.x, this.y, 16, 16);
  }

  this.toString = function() {
    answer = this.x.toString() + " " + this.y.toString();
    return answer;
  }

}
