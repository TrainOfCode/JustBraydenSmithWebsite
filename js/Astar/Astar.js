let mazesTxt;
let drawMaze;
let maze;
function preload() {
  mazesTxt = loadStrings('assets/mazes.txt/');
  drawMaze = false;
}


function setup() {
  let canvasGraph = createCanvas(900, 700);
  canvasGraph.parent("canvasContainer");
  console.log(mazesTxt);
}

function draw() {
  background(51);
  if (drawMaze) {
    createMaze();
  }
}



function runAstar() {
  let chosenMaze = parseInt(select('#mazeChoice').value());
  let row = 0
  for(var i = 0; i < chosenMaze; i++) {
    let currMaze = mazesTxt[row];
    row++;
    while(currMaze != mazesTxt[row]) {
      row++;
    }
    row++;
  }
  buildMaze()
}
