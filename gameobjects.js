//start the factory names with new so we can
//have variables like: let paddle = newPaddle()
function newPaddle() {
	let _position = vector()
	let _width = 130, _height = 16
	return {
		position: function() {
			return _position
		},
		setPosition: function(position) {
			_position = position
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
	let _position = vector()
	let _radius = 10
	return {
		position: function() {
			return _position
		},
		setPosition: function(position) {
			_position = position
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