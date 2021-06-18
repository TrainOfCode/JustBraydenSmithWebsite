function Cell(x, y) {
  this.x = x;
  this.y = y;
  this.end = false;
  this.start = false;

  this.onPath = false;


  this.gscore = null;
  this.fscore = null;

  //              T       R      B     L
  //            y - 1, x + 1, y + 1, x - 1
  this.edges = [true, true, true, true];

  this.addNeighbors = function(neigh) {
    for(var i = 0; i < neigh.length; i+=2) {
      neighX = parseInt(neigh[i]);
      neighY = parseInt(neigh[i + 1]);
      if(this.x < neighX && this.y == neighY) {
        this.edges[1] = false;
      }
      if(this.x > neighX && this.y == neighY) {
        this.edges[3] = false;
      }
      if(this.y < neighY && this.x == neighX) {
        this.edges[2] = false;
      }
      if(this.y > neighY && this.x == neighX) {
        this.edges[0] = false;
      }
    }
  }

  this.getNeighborCoords = function() {
    var coords = [];
    if (!this.edges[0]) {
      coords.push([this.x, this.y - 1])
    }
    if (!this.edges[1]) {
      coords.push([this.x + 1, this.y])
    }
    if (!this.edges[2]) {
      coords.push([this.x, this.y + 1])
    }
    if (!this.edges[3]) {
      coords.push([this.x - 1, this.y])
    }
    return coords
  }

  this.show = function(h, w) {
    var xP = this.x * w;
    var yP = this.y * h;

    stroke(0);
    strokeWeight(1);
    if (this.edges[0]) {
      strokeWeight(4);
      stroke(255);
    }
    line(xP, yP, xP + w, yP);

    stroke(0);
    strokeWeight(1);
    if (this.edges[1]) {
      strokeWeight(4);
      stroke(255);
    }
    line(xP+w, yP, xP + w, yP + h);

    stroke(0);
    strokeWeight(1);
    if (this.edges[2]) {
      strokeWeight(4);
      stroke(255);
    }
    line(xP, yP+h, xP+w, yP+h);

    stroke(0);
    strokeWeight(1);
    if (this.edges[3]) {
      strokeWeight(4);
      stroke(255);
    }
    line(xP, yP, xP, yP + h);

    if (this.onPath) {
      stroke(250, 218, 84);
      stroke(250, 218, 84);
      strokeWeight(1);
      ellipse((xP + floor(w/2)), (yP + floor(h/2)), floor(w/4));
      noFill();
    }

    if (this.end) {
      stroke(211, 28, 56);
      fill(211, 28, 56);
      strokeWeight(1);
      ellipse((xP + floor(w/2)), (yP + floor(h/2)), floor(w/8));
      noFill();
    }

    if (this.start) {
      stroke(46, 218, 91);
      fill(46, 218, 91);
      strokeWeight(1);
      ellipse((xP + floor(w/2)), (yP + floor(h/2)), floor(w/8));
      noFill();
    }

  }

  this.prettyString = function() {
    s = "(" + this.x + ", " + this.y + ")";
    return s
  }
}
