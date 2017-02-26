//create the canvas
let canvas = document.createElement("canvas")
let ctx = canvas.getContext("2d")
canvas.width = 480
canvas.height = 640
document.body.appendChild(canvas)

//game objects


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

//reset the game
let reset = function () {
}

//update game objects
let update = function (deltaTime) {
	// if(Object.keys(keysDown).length != 0){
	// 	console.log(keysDown)
	// }
}

//draw everything
let render = function () {
	// if (bgReady) {
	// 	ctx.drawImage(bgImage, 0, 0)
	// }

	//bg
	ctx.beginPath()
	ctx.rect(0, 0, canvas.width, canvas.height)
	ctx.fillStyle = "black";
	ctx.fill()

	const objectColor = "white"
	//ball
	ctx.beginPath()
	ctx.ellipse(100, 100, 50, 50, 0, 0, 2 * Math.PI)
	ctx.fillStyle = objectColor
	ctx.fill()

	//pucks
	ctx.beginPath()
	ctx.rect(200,200, 100, 100)
	ctx.fillStyle = objectColor
	ctx.fill()
}

//main game loop
let main = function () {
	let timeNow = Date.now()
	let deltaTime = timeNow - lastTime;

	update(deltaTime / 1000)
	render()

	lastTime = timeNow

	// Request to do this again ASAP
	requestAnimationFrame(main)
}

//cross-browser support for requestAnimationFrame
let w = window
requestAnimationFrame = 
	w.requestAnimationFrame 
	|| w.webkitRequestAnimationFrame 
	|| w.msRequestAnimationFrame 
	|| w.mozRequestAnimationFrame

//start the game
let lastTime = Date.now()
reset()
main()
