function Maze(Width, Height) {
  this.Width = Width;
  this.Height = Height;
  this.h = 0;
  this.w = 0;
  this.start = null;
  this.end = null;

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
  }
  this.runAstar = function() {
    if (this.start != null && this.end != null) {
      var BH = new BinaryHeap();
      BH.insert(0, this.end);

      this.prev = new Map();
      for (cell of this.grid) {
        this.prev.set(cell, null);
      }
      while(!BH.isEmpty()) {
        var curr = BH.remove();
        console.log(curr);
        if (curr.x == this.end.x && curr.y == this.end.y) {
          console.log("FOUND THE END!");
        }
      }
    }
  }
}
