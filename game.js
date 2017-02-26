
//create the canvas
const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")
canvas.width = 480
canvas.height = 640
const width = canvas.width
const height = canvas.height
document.body.appendChild(canvas)

//background image
// let bgReady = false
// let bgImage = new Image()
// bgImage.onload = function () {
// 	bgReady = true
// }

//handle keyboard controls
let keysDown = {}

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true
}, false)

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode]
}, false)

//used for mouse events
function getMousePosition(canvas, event) {
	let rect = canvas.getBoundingClientRect()
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	}
}

//handle mouse event
let mousePos = vector()
canvas.addEventListener("mousemove", function(event) {
	let mPos = getMousePosition(canvas, event)
	mousePos.set(mPos.x, mPos.y)
}, false)

//assign global objects
let ball = newBall()
let paddle = newPaddle()

//reset the game
function reset() {
    ball.setPosition(vector(width/2, height/2))
    paddle.setPosition(vector(width/2, height - 30))
}

//update game objects
function update(deltaTime) {
	// if(Object.keys(keysDown).length != 0){
	// 	console.log(keysDown)
	// }

    paddle.setPosition(vector(mousePos.x(), paddle.position().y()))

}

//draw everything
function render() {
	// if (bgReady) {
	// 	ctx.drawImage(bgImage, 0, 0)
	// }

	//bg
	ctx.beginPath()
	ctx.rect(0, 0, width, height)
	ctx.fillStyle = "black"
	ctx.fill()
	
    //game objects
	ball.render()
	paddle.render()
}

//main game loop
function main() {
	let timeNow = Date.now()
	let deltaTime = timeNow - lastTime;

	update(deltaTime / 1000)
	render()

	lastTime = timeNow

	// Request to do this again ASAP
	requestAnimationFrame(main)
}

//cross-browser support for requestAnimationFrame
const requestAnimationFrame = 
	window.requestAnimationFrame 
	|| window.webkitRequestAnimationFrame 
	|| window.msRequestAnimationFrame 
	|| window.mozRequestAnimationFrame

//start the game
let lastTime = Date.now()
reset()
main()
