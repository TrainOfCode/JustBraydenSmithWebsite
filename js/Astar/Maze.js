function Maze(Width, Height) {
  this.Width = Width;
  this.Height = Height;
  this.h = 0;
  this.w = 0;
  this.start = null;
  this.end = null;

  this.numRow = 0;
  this.numCol = 0;

  this.prev = null;

  this.grid = [];

  this.show = function() {
    for (cell of this.grid) {
      cell.show(this.h, this.w);
    }
  }

  this.parseTxtRows = function(txtRows) {
    maxRow = 0;
    maxCol = 0;
    for(row in txtRows) {
      var reg = /\d+/g;
      coords = txtRows[row].match(reg);
      if(maxRow < parseInt(coords[0])) {
        maxRow = parseInt(coords[0]);
      }
      if(maxCol < parseInt(coords[1])) {
        maxCol = parseInt(coords[1]);
      }
      var newCell = new Cell(parseInt(coords[0]), parseInt(coords[1]));
      reg = /.s/g;
      typeC = txtRows[row].match(reg);
      if (typeC != null) {
        newCell.start = true;
        this.start = newCell;
      }
      reg = /.e/g;
      typeC = txtRows[row].match(reg);
      if (typeC != null) {
        newCell.end = true;
        this.end = newCell;
      }
      this.grid.push(newCell);
      this.grid[this.grid.length - 1].addNeighbors(coords.splice(2))
    }
    maxCol++;
    maxRow++;
    this.h = floor(this.Height/maxCol);
    this.w = floor(this.Width/maxRow);
    this.numRow = maxRow;
    this.numCol = maxCol;
  }
  this.runAstar = function() {
    if (this.start != null && this.end != null) {
      var BH = new BinaryHeap();
      BH.insert(0, this.start);

      this.prev = new Map();

      var fScore = new Map();
      var gScore = new Map();

      for (cell of this.grid) {
        this.prev.set(cell, null);
        fScore.set(cell, Infinity);
        gScore.set(cell, Infinity);
      }
      gScore.set(this.start, 0);
      fScore.set(this.start, this.heur(this.start));

      // for (node of this.grid) {
      //   console.log(node);
      // }
      var foundPath = false;
      while(!BH.isEmpty()) {
        var curr = BH.remove();
        // BH.prettyPrint();
        console.log(curr.prettyString());
        console.log("----------\n\n");
        if (curr == this.end) {
          console.log("FOUND THE END!");
          foundPath = true;
        } else {
          neighborCoords = curr.getNeighborCoords();
          for (neighborCoord of neighborCoords) {
            neigh = this.coordToCell(neighborCoord);
            console.log(neigh);
            console.log(neighborCoord);
            temp = 1 + gScore.get(curr);
            if (temp < gScore.get(neigh)) {
              this.prev.set(neigh, curr);
              gScore.set(neigh, temp);
              fScore.set(neigh, temp + this.heur(neigh));
              if(!BH.contains(neigh)) {
                BH.insert(fScore.get(neigh), neigh)
              } else {
                BH.update(fScore.get(neigh), neigh);
              }
            }
          }
        }
      }
      if (foundPath) {
        var curr = this.end;
        this.end.onPath = true;
        while(this.prev.get(curr) != null) {
          curr = this.prev.get(curr);
          curr.onPath = true;
        }
      }
    }
  }
  this.heur = function(curr) {
    return Math.abs(this.end.x - curr.x) + Math.abs(this.end.y - curr.y);
  }
  this.coordToCell = function(coords) {
    return this.grid[coords[1] * this.numRow + coords[0]];
  }
}
