function Graph() {
  this.nodes = [];
  this.selectedNodes = [];
  this.edges = [];

  this.addNode = function(x, y) {
    if (0 < x && x < width && 0 < y && y < height) {
      var flag = true;
      for (let i = 0; i < this.nodes.length; i++) {
        if (this.distBetween(this.nodes[i].x, x, this.nodes[i].y, y) < 20) {
          flag = false;
        }
      }
      if (flag) {
        this.nodes.push(new Node(x, y));
      }
    }
  }

  this.show = function() {
    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].show(false);
    }
    for (let i = 0; i < this.selectedNodes.length; i++) {
      this.selectedNodes[i].show(true);
    }
    for (let i = 0; i < this.edges.length; i++) {
      this.edges[i].show();
    }
  }

  this.clearNodes = function() {
    this.nodes = [];
    this.selectedNodes = [];
    this.edges = [];
  }

  this.selectCurrNode = function(x, y) {
    for(let i = 0; i < this.nodes.length; i++) {
      if (this.distBetween(this.nodes[i].x, x, this.nodes[i].y, y) < 8) {
        this.selectedNodes.push(this.nodes[i])
        this.nodes.splice(i, 1);
        return this.selectedNodes[this.selectedNodes.length - 1];
      }
    }
    return null;
  }

  this.addEdge = function(leftNode, rightNode) {
    distBet = this.distBetween(leftNode.x, rightNode.x, leftNode.y, rightNode.y);
    newEdge = new Edge(leftNode, rightNode, distBet);
    newEdgeReversed = new Edge(rightNode, leftNode, distBet);
    flag = true;
    for (let i = 0; i < this.edges.length; i++) {
      if (this.edges[i].toString() == newEdge.toString() || this.edges[i].toString() == newEdgeReversed.toString()) {
        flag = false;
      }
    }
    if (flag) {
      this.edges.push(newEdge);
    }
    this.selectedNodes = [];
    this.nodes.push(leftNode);
    this.nodes.push(rightNode);
  }

  this.distBetween = function(x1, x2, y1, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  this.findDegSeq = function() {
    degSeq = [];
    for (let i = 0; i < this.nodes.length; i++) {
      currDeg = 0;
      for (let j = 0; j < this.edges.length; j++) {
        if (this.edges[j].contains(this.nodes[i])) {
          currDeg += 1;
        }
      }
      degSeq.push(currDeg);
    }
    for (let i = 0; i < this.selectedNodes.length; i++) {
      currDeg = 0;
      for (let j = 0; j < this.edges.length; j++) {
        if (this.edges[j].contains(this.selectedNodes[i])) {
          currDeg += 1;
        }
      }
      degSeq.push(currDeg);
    }
    degSeq.sort().reverse();
    return degSeq;
  }
}
