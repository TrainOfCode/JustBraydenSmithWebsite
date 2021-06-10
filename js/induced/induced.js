var graph;
var nodeSelected;
function setup() {
  let canvasGraph = createCanvas(900, 700);
  canvasGraph.parent("canvasContainer");
  graph = new Graph();
  nodeSelected = null;
}

function draw() {
  background(232, 232, 216);
  graph.show();
  if (nodeSelected != null) {
    line(nodeSelected.x, nodeSelected.y, mouseX, mouseY);
  }
}

function mousePressed(event) {
  if(!select('#modeSwitch').checked()) {
    graph.addNode(mouseX, mouseY);
  } else if (nodeSelected == null) {
    nodeSelected = graph.selectCurrNode(mouseX, mouseY);
  } else {
    secondNode = graph.selectCurrNode(mouseX, mouseY);
    if (secondNode != null) {
      graph.addEdge(nodeSelected, secondNode);
      nodeSelected = null;
    }
  }
  updateSideBar()
}

function clearNodes() {
  graph.clearNodes();
  nodeSelected = null;
  updateSideBar();
}

function updateSideBar() {
  select("#numNodes").html(graph.nodes.length + graph.selectedNodes.length);
  select("#numEdges").html(graph.edges.length);
  degSeq = graph.findDegSeq();
  if (degSeq.length != 0) {
    select("#degSeq").html(degSeq);
    select("#capDeltaG").html(degSeq[0]);
    select("#lowDeltaG").html(degSeq[degSeq.length - 1]);
    sum = 0;
    for (let i = 0; i < degSeq.length; i++) {
      sum += degSeq[i];
    }
    select("#degSum").html(sum.toString() + " = 2 * NumberOfEdges = 2 * " + (graph.edges.length).toString());
  } else {
    select("#degSeq").html("-");
    select("#capDeltaG").html("-");
    select("#lowDeltaG").html("-");
    select("#degSum").html("-");
  }
}
