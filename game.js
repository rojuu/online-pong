//create the canvas
const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")
canvas.width = 480
canvas.height = 640
const width = canvas.width
const height = canvas.height
document.body.appendChild(canvas)


//game objects
function newVector(x = 0, y = 0) {
	let _x = x,
		_y = y
	return {
		x: function() {
			return _x
		},
		y: function() {
			return _y
		},
		set: function(x, y) {
			_x = x
			_y = y
		},
		setX: function(x) {
			set(x, _y)
		},
		setY: function(y) {
			set(_x, y)
		}
	}
}

function newPaddle() {
	let _position = newVector()
	let _width = 130, _height = 16
	return {
		position: function() {
			return _position;
		},
		setPosition: function(x, y) {
			_position.set(x, y);
		},
		render: function() {
			ctx.beginPath()
			//have pivot at the center
			ctx.rect(_position.x() - _width/2,
					 _position.y() - _height/2,
					 _width, _height)
			ctx.fillStyle = "white"
			ctx.fill()
		}
	}
}

function newBall() {
	let _position = newVector()
	let _radius = 10
	return {
		position: function() {
			return _position
		},
		setPosition: function(x, y) {
			_position.set(x, y);
		},
		radius: function() {
			return _radius
		},
		render: function() {
			ctx.beginPath()
			ctx.ellipse(_position.x() - _radius/2,
					    _position.y() - _radius/2,
                        _radius, _radius,
                        0, 0, 2 * Math.PI)
			ctx.fillStyle = "white"
			ctx.fill()
		}
	}
}
//end of game objects

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
let mousePos = newVector()
canvas.addEventListener("mousemove", function(event) {
	let mPos = getMousePosition(canvas, event)
	mousePos.set(mPos.x, mPos.y)
}, false)

//assign global objects
let ball = newBall()
let paddle = newPaddle()

//reset the game
let reset = function () {
    ball.setPosition(width/2, height/2)
    paddle.setPosition(width/2, height - 30)
}

//update game objects
let update = function (deltaTime) {
	// if(Object.keys(keysDown).length != 0){
	// 	console.log(keysDown)
	// }

    paddle.setPosition(mousePos.x(), paddle.position().y())

}

//draw everything
let render = function () {
	// if (bgReady) {
	// 	ctx.drawImage(bgImage, 0, 0)
	// }

	//bg
	ctx.beginPath()
	ctx.rect(0, 0, width, height)
	ctx.fillStyle = "black";
	ctx.fill()
	
    //game objects
	ball.render()
	paddle.render()
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
