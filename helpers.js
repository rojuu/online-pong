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
		},
		add: function(vector) {
			_x = _x + vector.x;
			_y = _y + vector.y;
		},
		subtract: function(vector) {
			_x = _x - vector.x;
			_y = _y - vector.y;
		},
		length: function () {
			let val = Math.sqrt(_x*_x + _y*_y);
			val = Math.abs(val);
			return val;
		}
	}
}

function lerp(A, B, t) {
	return A + t * (B - A);
}
