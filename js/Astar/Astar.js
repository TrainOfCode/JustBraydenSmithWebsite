var mazesTxt;
var maze;
var Width = 800;
var Height = 800;
function preload() {
  mazesTxt = loadStrings('assets/mazes.txt/');
  maze = new Maze(Width, Height);
}


function setup() {
  let canvasGraph = createCanvas(Width, Height);
  canvasGraph.parent("canvasContainer");
}

function draw() {
  background(51);
  maze.show();
}

function drawMaze() {
  maze = new Maze(Width, Height);
  var chosenMaze = parseInt(select('#mazeChoice').value());
  var row = 0;
  for(var i = 0; i < chosenMaze; i++) {
    var currMaze = mazesTxt[row];
    row++;
    while(currMaze != mazesTxt[row]) {
      row++;
    }
    row++;
  }
  var endRow = row;
  endRow++;
  while(mazesTxt[row] != mazesTxt[endRow]) {
    endRow++;
  }
  row++;
  var mazeRows = mazesTxt.slice(row, endRow);
  maze.parseTxtRows(mazeRows);
}

function runAstar() {
  console.log("RUN ASTAR");
}
