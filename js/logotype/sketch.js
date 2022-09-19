
var font;
var vehicles = [];

function preload() {
  font = loadFont('../fonts/Inconsolata-VariableFont_wdth,wght.ttf');
}

function setup() {
  createCanvas(1000, 300);
  background(51);
  textFont(font);
  textSize(192);
  fill(255);
  noStroke();
  text('L', 100, 200);

  var points = font.textToPoints('L', 100, 200, 192, {
    sampleFactor: 0.25
  });

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
    stroke(255);
    strokeWeight(8);
    point(pt.x, pt.y);
  }
}

function draw() {
  background(51);
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
}

function displayText() {
  var input = document.getElementById("inputText")
  var points = font.textToPoints(input.value, 100, 200, 192, {
    sampleFactor: 0.25
  });

  if (vehicles.length < points.length) {
    for (var i = 0; i < vehicles.length; i++) {
      var pt = points[i];
      vehicles[i].target = createVector(pt.x, pt.y);
    }
    for (var i = vehicles.length + 1; i < points.length; i++) {
      var pt = points[i];
      var vehicle = new Vehicle(pt.x, pt.y);
      vehicles.push(vehicle);
      stroke(255);
      strokeWeight(8);
      point(pt.x, pt.y);
    }
  } else {
    for (var i = 0; i < points.length; i++) {
      var pt = points[i];
      vehicles[i].target = createVector(pt.x, pt.y);
    }
    vehicles = vehicles.splice(0, points.length);
  }
}
