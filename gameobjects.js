//start the factory names with new so we can
//have variables like: let paddle = newPaddle()
function newPaddle() {
	let _position = vector();
	let _width = 10, _height = 78;
	return {
		get position() {
			return _position;
		},
		setPosition: function(position) {
			_position = position;
		},
		get width() {
			return _width;
		},
		get height() {
			return _height;
		},
		render: function() {
			ctx.beginPath();
			//have pivot at the center
			ctx.rect(_position.x - _width/2,
					 _position.y - _height/2,
					 _width, _height);
			ctx.fillStyle = "white";
			ctx.fill();
		}
	}
}

function newBall() {
	let _position = vector();
	let _velocity = vector();
	let _radius = 6;
	return {
		get position() {
			return _position;
		},
		setPosition: function(position) {
			_position = position;
		},
		translate: function(amountVector) {
			_position.x = _position.x + amountVector.x;
			_position.y = _position.y + amountVector.y;
		},
		get velocity() {
			return _velocity
		},
		set velocity(velocity) {
			_velocity = velocity;
		},
		get radius() {
			return _radius;
		},
		render: function() {
			ctx.beginPath();
			//have pivot at the center
			ctx.ellipse(_position.x,
					    _position.y,
                        _radius, _radius,
                        0, 0, 2 * Math.PI);
			ctx.fillStyle = "white";
			ctx.fill();
		}
	}
}
