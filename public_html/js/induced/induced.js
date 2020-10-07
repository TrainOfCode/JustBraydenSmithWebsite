
var graph;
function setup() {
  let canvasGraph = createCanvas(900, 700);
  canvasGraph.parent("canvasContainer");
  graph = new Graph();
}

function draw() {
  background(232, 232, 216);
  graph.show();
}

function mousePressed(event) {
  graph.addNode(mouseX, mouseY);
}

function clearNodes() {
  graph.clearNodes();
}
