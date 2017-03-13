
//create the canvas
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 480;
const width = canvas.width;
const height = canvas.height;
document.body.appendChild(canvas);

//handle keyboard controls
let keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

//used for mouse events
function getMousePosition(canvas, event) {
	let rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
}

//handle mouse event
let mousePos = vector();
canvas.addEventListener("mousemove", function(event) {
	let mPos = getMousePosition(canvas, event);
	mousePos.set(mPos.x, mPos.y);
}, false);

//assign global objects
let ball = newBall();
let ourPaddle = newPaddle();
let enemyPaddle = newPaddle();
let ourScore = 0, enemyScore = 0;

let lerpTime;
let currentLerpTime;

//reset the game
function reset() {
	let paddleOffset = 30;
    ball.setPosition(vector(width/2, height/2));
	ball.velocity = vector(-300, 0);

    ourPaddle.setPosition(vector(0 + paddleOffset, height/2));
	enemyPaddle.setPosition(vector(width - paddleOffset, height/2));

	lerpTime = 0.4;
	currentLerpTime = 0;
}

//update game objects
function update(deltaTime) {
    ourPaddle.setPosition(vector(ourPaddle.position.x, mousePos.y));
	if(currentLerpTime = 0){
		let y = enemyPaddle.position.y;
		y = ball.position.y;
		enemyPaddle.setPosition(vector(enemyPaddle.position.x, y));
	}
	
	ball.translate(vector(ball.velocity.x * deltaTime, ball.velocity.y * deltaTime));

	//check ball collisions
	doCollisions(ball, ourPaddle);
	doCollisions(ball, enemyPaddle);

	if(checkCollisionWallX(ball))
		ball.velocity.x = ball.velocity.x * -1;
		
	if(checkCollisionWallY(ball))
		ball.velocity.y = ball.velocity.y * -1;
}

function doCollisions(ball, paddle) {
	if(checkCollisions(ball, paddle)) {
		ball.velocity.x = ball.velocity.x * -1.1;
		let dv = ball.position.y - paddle.position.y;
		ball.velocity.y = dv * 2.5;
	}
}

function checkCollisions(ball, paddle) {
	if( 
		( //going left
			//x-axis checks
			ball.position.x - ball.radius < paddle.position.x + paddle.width / 2
			&& ball.position.x + ball.radius > paddle.position.x - paddle.width / 2
			&& ( //y-axis checks
				ball.position.y + ball.radius > paddle.position.y - paddle.height / 2
				&& ball.position.y - ball.radius < paddle.position.y + paddle.height / 2
			)
		)
	){
		return true;
	}
	return false;
}

function checkCollisionWallX(ball) {
	if(ball.position.x + ball.radius > width || ball.position.x - ball.radius < 0) {
		return true;
	}
	return false;
}

function checkCollisionWallY(ball) {
	if(ball.position.y + ball.radius > height || ball.position.y - ball.radius < 0) {
		return true;
	}
	return false;
}

//draw everything
function render() {
	//bg
	ctx.beginPath();
	ctx.rect(0, 0, width, height);
	ctx.fillStyle = "black";
	ctx.fill();

	//bg dash lines
	for(let i = 0; i < height; i += 20) {
		ctx.beginPath();
		let w = 4, h = 7;
		ctx.rect(width/2 - w/2, i + 5, w, h);
		ctx.fillStyle = "white";
		ctx.fill();
	}
	
	//scores
	let scoreOffsetX = 92;
	let scoreOffsetY = 42;
	ctx.font = "30px Helvetica";
	ctx.fillText(ourScore, 0 + scoreOffsetX, 0 + scoreOffsetY, 50);
	ctx.fillText(enemyScore, width - scoreOffsetX, 0 + scoreOffsetY, 50);

    //game objects
	ball.render();
	ourPaddle.render();
	enemyPaddle.render();
}

//main game loop
function main() {
	let timeNow = Date.now();
	let deltaTime = timeNow - lastTime;

	update(deltaTime / 1000);
	render();

	lastTime = timeNow;

	// Request to do this again ASAP
	requestAnimationFrame(main);
}

//cross-browser support for requestAnimationFrame
const requestAnimationFrame = 
	window.requestAnimationFrame 
	|| window.webkitRequestAnimationFrame 
	|| window.msRequestAnimationFrame 
	|| window.mozRequestAnimationFrame;

//start the game
let lastTime = Date.now();
reset();
main();

// setInterval( () => {
// 	//send state data to server
// }, 1000/60); //60 times per second
