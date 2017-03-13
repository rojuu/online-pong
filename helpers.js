function vector(x = 0, y = 0) {
	let _x = x,
		_y = y;
	return {
		get x() {
			return _x;
		},
		get y() {
			return _y;
		},
		set y(val) {
			_y = val;
		},
		set x(val) {
			_x = val;
		},
		set: function(xPos, yPos) {
			this.x = xPos;
			this.y = yPos;
		}
	}
}

function lerp(A, B, t) {
	return A + t * (B - A);
}
