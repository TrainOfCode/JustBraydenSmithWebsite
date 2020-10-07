function Graph() {
  this.Nodes = [];

  this.addNode = function(x, y) {
    if (0 < x && x < width && 0 < y && y < height) {
      var flag = true;
      for (let i = 0; i < this.Nodes.length; i++) {
        distBetween = Math.sqrt(Math.pow((this.Nodes[i].x - x), 2) + Math.pow((this.Nodes[i].y - y), 2))
        if (distBetween < 20) {
          flag = false;
        }
      }
      if (flag) {
        this.Nodes.push(new Node(x, y));
      }
    }
    console.log(this.Nodes.length);
  }

  this.show = function() {
    for (let i = 0; i < this.Nodes.length; i++) {
      this.Nodes[i].show();
    }
  }

  this.clearNodes = function() {
    this.Nodes = []
  }
}
