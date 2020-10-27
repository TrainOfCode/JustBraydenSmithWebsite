
var grid = [10][10]

var allFish = []
var fishFriction = 0.01

var randomSpawnPlankton
var maxPlankton = 10
var totalPlankton = 0

var allPlankton = []

function setup() {
  let oceanGraph = createCanvas(900, 700);
  oceanGraph.parent("oceanContainer");
  for (var i = 0; i < 1; i++) {
    allFish.push(new Fish(50 + Math.floor(Math.random() * 800), 50 + Math.floor(Math.random() * 600)))
  }
  randomSpawnPlankton = 200 + (-20 + Math.floor(Math.random() * 41))
}

function draw() {
  background(2,119,191);
  allFish.forEach(fish => {
    fish.update()
    fish.show()
  })

  allPlankton.forEach(plankton => {
    plankton.show();
  })


  if(randomSpawnPlankton == 0) {
    spawnPlankton()
    randomSpawnPlankton = 200 + (-20 + Math.floor(Math.random() * 41))
  }
  randomSpawnPlankton--
}


function spawnPlankton() {
  if (totalPlankton < maxPlankton) {
    randx = 50 + Math.floor(Math.random() * 800)
    randy = 50 + Math.floor(Math.random() * 600)
    console.log('spawning plankton')
    allPlankton.push(new Plankton(randx, randy))
    totalPlankton++
  }
}
