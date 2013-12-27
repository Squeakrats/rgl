var vec3 = function(_x, _y, _z){
	return new Float32Array([_x, _y, _z])
}
	vec3.add = function(_vec1, _vec2){
		return new Float32Array([_vec1[0] + _vec2[0], _vec1[1] + _vec2[1], _vec1[2] + _vec2[2]])
	}

	vec3.addSelf = function(_vec1, _vec2){
		_vec1[0] += _vec2[0]
		_vec1[0] += _vec2[1]
		_vec1[2] += _vec2[2]
	}

	vec3._add = function(_vec1, _vec2, out){
		out[0] = _vec1[0] + _vec2[0]
		out[1] = _vec1[1] + _vec2[1]
		out[2] = _vec1[2] + _vec2[2]
	}

	vec3.subtract = function(_vec1, _vec2){
		return new Float32Array([_vec1[0] - _vec2[0], _vec1[1] - _vec2[1], _vec1[2] - _vec2[2]])
	}

	vec3._subtract = function(_vec1, _vec2, out){
		out[0] = _vec1[0] - _vec2[0]
		out[1] = _vec1[1] - _vec2[1]
		out[2] = _vec1[2] - _vec2[2]
	}

	vec3.subtractSelf = function(_vec1, _vec2){
		_vec1[0] -= _vec2[0]
		_vec1[0] -= _vec2[1]
		_vec1[2] -= _vec2[2]
	}

	vec3.dot = function(_vec1, _vec2){
		return _vec1[0] * _vec2[0] +  _vec1[1] * _vec2[1] +  _vec1[2] * _vec2[2]
	}

	vec3.dotSelf = function(_vec1){
		var x = _vec1[0], y = _vec1[1], z = _vec1[2]
		return x * x + y * y + z * z
	}

	vec3.length = function(_vec1){
		var x = _vec1[0], y = _vec1[1], z = _vec1[2]
		return Math.sqrt(x * x + y * y + z * z)
	}

	vec3.cross = function(_vec1, _vec2){
		ax = _vec1[0], ay = _vec1[1], az = _vec1[2],
		bx = _vec2[0], by = _vec2[1], bz = _vec2[2]
		return new Float32Array([
				ay * bz - az * by,
				az * bx - ax * bz,
				ax * by - ay * bx
			])
	}

var mat4 = function(){
	//just use a float32Array with 16 elements, would be nice to pass as cols
	//but might just confused me if I am using 2 systems 
	console.log(" I haven't figured out a good way to do this yet, sorry!")
}
	mat4.console = function(_mat1){
		var str = "/////////////\n" + 'Asdasdasd'
		console.log(str)
	}

	mat4.identity = function(_mat1){
		_mat1[0] = 1
		_mat1[1] = 0
		_mat1[2] = 0
		_mat1[3] = 0
		_mat1[4] = 0
		_mat1[5] = 1
		_mat1[6] = 0
		_mat1[7] = 0
		_mat1[8] = 0
		_mat1[9] = 0
		_mat1[10] = 1
		_mat1[11] = 0
		_mat1[12] = 0
		_mat1[13] = 0
		_mat1[14] = 0
		_mat1[15] = 1
	}

