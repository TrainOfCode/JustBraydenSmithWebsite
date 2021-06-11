function Maze(Width, Height) {
  this.Width = Width;
  this.Height = Height;
  this.h = 0;
  this.w = 0;

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
      var coolCell = new Cell(parseInt(coords[0]), parseInt(coords[1]));
      reg = /.s/g;
      typeC = txtRows[row].match(reg);
      console.log(typeC)
      if (typeC != null) {
        coolCell.start = true;
      }
      reg = /.e/g;
      typeC = txtRows[row].match(reg);
      if (typeC != null) {
        coolCell.end = true;
      }
      this.grid.push(coolCell);
      this.grid[this.grid.length - 1].addNeighbors(coords.splice(2))
    }
    maxCol++;
    maxRow++;
    this.h = floor(this.Height/maxCol);
    this.w = floor(this.Width/maxRow);
  }
}
