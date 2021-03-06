const width = 28
const grid = document.querySelector(".grid")
const scoreDisplay = document.querySelector("#score")
let squares = []
let score = 0

//28 * 28 = 784
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

const layout = [
	 	1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
	    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
	    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
	    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
	    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
	    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
	    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
	    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
	    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
	    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
	    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
	    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
	    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
	    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
	    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
	    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
	    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
	    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
	    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
	    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
	    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
	    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
	    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
	    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
	    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
	    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
	    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

//create board

function createBoard() {
	for (let i = 0; i <layout.length; i++){
		const square = document.createElement('div')
		grid.appendChild(square)
		squares.push(square) 

		if (layout[i] === 0){
			squares[i].classList.add('pac-dot')
		}else if (layout[i] === 1){
			squares[i].classList.add('wall')
		}else if (layout[i] === 2){
			squares[i].classList.add('ghost-lair')
		}else if (layout[i] === 3){
			squares[i].classList.add('power-pellet')
		}
	}
}
createBoard()

let pacmanCurrentIndex = 490

squares[pacmanCurrentIndex].classList.add('pacman')

function control(e) {
	squares[pacmanCurrentIndex].classList.remove('pacman')
    switch(e.keyCode) {
      case 37:
        if(
          pacmanCurrentIndex % width !== 0 &&
          !squares[pacmanCurrentIndex -1].classList.contains('wall') &&
          !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair')
          )
        pacmanCurrentIndex -= 1
        if (pacmanCurrentIndex === 364) {
          pacmanCurrentIndex = 391
        }
        break
      case 38:
        if(
          pacmanCurrentIndex - width >= 0 &&
          !squares[pacmanCurrentIndex -width].classList.contains('wall') &&
          !squares[pacmanCurrentIndex -width].classList.contains('ghost-lair')
          ) 
        pacmanCurrentIndex -= width
        break
      case 39:
        if(
          pacmanCurrentIndex % width < width - 1 &&
          !squares[pacmanCurrentIndex +1].classList.contains('wall') &&
          !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair')
        )
        pacmanCurrentIndex += 1
        if (pacmanCurrentIndex=== 391) {
          pacmanCurrentIndex = 364
        }
        break
      case 40:
        if (
          pacmanCurrentIndex + width < width * width &&
          !squares[pacmanCurrentIndex +width].classList.contains('wall') &&
          !squares[pacmanCurrentIndex +width].classList.contains('ghost-lair')
        )
        pacmanCurrentIndex += width
        break
	}
	squares[pacmanCurrentIndex].classList.add('pacman')
	pacDotEaten()
	powerPelletEaten()
	checkForWin()
	checkForGameOver()
}
document.addEventListener('keyup', control)

function pacDotEaten() {
	if (squares[pacmanCurrentIndex].classList.contains("pac-dot")){
		squares[pacmanCurrentIndex].classList.remove("pac-dot")
		score++
		scoreDisplay.innerHTML = score
	}
}
	
class Ghost {
	constructor(className, startIndex, speed) {
		this.className = className
		this.startIndex = startIndex
		this.speed = speed
		this.currentIndex = startIndex
		this.isScared = false
		this.timerId = NaN
	}
}

function powerPelletEaten() {
	//pacman in square with power pellet
	if (squares[pacmanCurrentIndex].classList.contains('power-pellet')){
		//remove class of power-pellet
		squares[pacmanCurrentIndex].classList.remove('power-pellet')
		//add a score of 10
		score +=10
		//change each of the four ghost to isScared
		ghosts.forEach(ghost => ghost.isScared = true)
		//use setTimeout to unscare ghosts after 10 seconds	
		setTimeout(unScareGhosts, 10000)
	}
}

function unScareGhosts(){
	ghosts.forEach(ghost => ghost.isScared = false)
}

const ghosts = [
	new Ghost('blinky', 348, 250),
	new Ghost('pinky', 376, 400),
	new Ghost('inky', 351, 300),
	new Ghost('clyde', 379, 500)
]

//draw ghosts
ghosts.forEach(ghost => {
 squares[ghost.currentIndex].classList.add(ghost.className)
 squares[ghost.currentIndex].classList.add('ghost')
})


// move ghosts
ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost){
	const directions = [ -1, +1, -width, +width]
	let direction = directions[Math.floor(Math.random() * directions.length)]
	

	ghost.timerId = setInterval(function(){
		if (
			!squares[ghost.currentIndex + direction].classList.contains("wall") &&
			!squares[ghost.currentIndex + direction].classList.contains("ghost")
			){
			squares[ghost.currentIndex].classList.remove(ghost.className)
			squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
			ghost.currentIndex += direction
			squares[ghost.currentIndex].classList.add(ghost.className)
			squares[ghost.currentIndex].classList.add('ghost')
		}else direction = directions[Math.floor(Math.random() * directions.length)]
	
	//ghost is scared
	if(ghost.isScared){
		squares[ghost.currentIndex].classList.add('scared-ghost')
	}

	//ghost is scared and pacman is on it
	if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman'))
	{
		//remove classnames
		squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
		//change ghosts currentIndex to startIndex
		ghost.currentIndex = ghost.startIndex
		//add a score of 100
		score +=100
		//readd classnames of ghosts
		squares[ghost.startIndex].classList.add(ghost.className, 'ghost')
		}
		checkForGameOver()
	}, ghost.speed)
}

function checkForGameOver(){
	//if pacman is in square with ghost that is not scared
	if(
		squares[pacmanCurrentIndex].classList.contains('ghost') &&
		!squares[pacmanCurrentIndex].classList.contains('scared-ghost')
		){
		//for each ghost we need to stop it moving
		ghosts.forEach(ghost => clearInterval(ghost.timerId))
		squares[pacmanCurrentIndex].classList.remove('pacman')
		//remove eventlistener for control function
		document.removeEventListener('keyup', control)
		//tell user game is over
		scoreDisplay.innerHTML = 'GAME OVER'
		}
}


//check for win

function checkForWin() {
	if (score === 274){
		//stop each ghost
		ghosts.forEach(ghost => clearInterval(ghost.timerId))
		//remove eventlistener for control function
		document.removeEventListener('keyup', control)
		//tell our user we have won
		scoreDisplay.innerHTML ='YOU WON!'
	}
}