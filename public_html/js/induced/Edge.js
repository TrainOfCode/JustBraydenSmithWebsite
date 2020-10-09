function Edge(left, right, weight) {
  this.left = left;
  this.right = right;
  this.weight = weight;

  this.toString = function() {
    var leftS = this.left.toString();
    var rightS = this.right.toString();
    return leftS + " " + rightS;
  }

  this.show = function() {
    fill(0,0,255);
    line(this.left.x, this.left.y, this.right.x, this.right.y);
  }

  this.contains = function(node) {
    leftS  = this.left.toString();
    rightS = this.right.toString();
    return (node.toString() == leftS || node.toString() == rightS)
  }
}
