function vector(x = 0, y = 0) {
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
			_x = x
		},
		setY: function(y) {
			_y = y
		}
	}
}

function lerp(A, B, t) {
	return A + t * (B - A)
}