
var grid = [10][10]

var allFish = []
var randomTimeInterval
var fishFriction = 0.01
function setup() {
  let oceanGraph = createCanvas(900, 700);
  oceanGraph.parent("oceanContainer");
  for (var i = 0; i < 1; i++) {
    allFish.push(new Fish(50 + Math.floor(Math.random() * 800), Math.floor(50 + Math.random() * 600)))
  }
  randomTimeInterval = 100 + (-20 + Math.floor(Math.random() * 41))
}

function draw() {
  background(2,119,191);
  allFish.forEach(fish => {
    fish.update()
    fish.show()
  })
  if(randomTimeInterval == 0) {
    spawnPlankton()
    randomTimeInterval = 100 + (-20 + Math.floor(Math.random() * 41))
  }
  randomTimeInterval--
}


function spawnPlankton() {

}
