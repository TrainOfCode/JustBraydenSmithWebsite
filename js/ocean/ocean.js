
var id = 0

var grid = [10][10]

var allFish = []
var fishFriction = 0.01
var fishMaxSpeed = 3
var fishMaxForce = .25

var randomSpawnPlankton
var maxPlankton = 10
var totalPlankton = 0

var allPlankton = []

var newBaby = null

function setup() {
  let oceanGraph = createCanvas(900, 700);
  oceanGraph.parent("oceanContainer");
  for (var i = 0; i < 2; i++) {
    allFish.push(new Fish(50 + Math.floor(Math.random() * 800), 50 + Math.floor(Math.random() * 600)))
  }
  randomSpawnPlankton = 200 + (-20 + Math.floor(Math.random() * 41))

  // frameRate(5)
}

function draw() {
  background(2,119,191)
  for (let i = allPlankton.length - 1; i >= 0; i--) {
    if(allPlankton[i].eaten) {
      allPlankton.splice(i, 1)
      totalPlankton--
    } else {
      allPlankton[i].show()
    }
  }

  for( let i = allFish.length - 1; i >= 0; i--) {
    if(allFish[i].mode == "n" || allFish[i].mode == "seek") {
      allPlankton.forEach(plankton => {
        allFish[i].seek(plankton)
      })
    } else if (allFish[i].mode == "breed") {
      for (let j = allFish.length - 1 ; j >= 0; j--) {
        if(i != j) {
          allFish[i].seek(allFish[j])
        }
      }
    }

    if(!allFish[i].update()) {
      allFish.splice(i, 1)
    } else {
      allFish[i].show()
    }
  }
  
  if(newBaby != null) {
    allFish.push(new Fish(newBaby.x, newBaby.y))
    newBaby = null
  }


  if(randomSpawnPlankton <= 0) {
    spawnPlankton()
    randomSpawnPlankton = 0 + (-20 + Math.floor(Math.random() * 41))
  }
  randomSpawnPlankton--
}


function spawnPlankton() {
  if (totalPlankton < maxPlankton) {
    for (let i = 0; i < Math.floor(Math.random() * 4); i++) {
      randx = 50 + Math.floor(Math.random() * 800)
      randy = 50 + Math.floor(Math.random() * 600)
      allPlankton.push(new Plankton(randx, randy))
      totalPlankton++
    }
  }
}

function mousePressed(event) {
  allPlankton.push(new Plankton(mouseX, mouseY))
  totalPlankton++
}
