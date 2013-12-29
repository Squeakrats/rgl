
var vec3 = function( x, y, z){
	return new Float32Array([x, y, z])
}

vec3.xy = function(a){
	return new Float32Array([a[0],a[1]])
}

vec3.added = function(a, b){
	return new Float32Array([
		a[0] + b[0], 
		a[1] + b[1],
		a[2] + b[2]
	])
}

vec3.subed = function(a, b){
	return new Float32Array([
		a[0] - b[0], 
		a[1] - b[1],
		a[2] - b[2]
	])
}

vec3.scaled = function (a, scale){
	return new Float32Array([
		a[0] * scale,
		a[1] * scale,
		a[2] * scale
	])
}

vec3.normalized = function(a){
	var x = a[0], y = a[1], z = a[2],
	len = Math.sqrt(x * x + y * y + z * z)
	return new Float32Array([
		x / len,
		y / len,
		z / len
	])
}

vec3.crossed = function(a ,b){
	var ax = a[0], ay = a[1], az = a[2],
		bx = b[0], by = b[1], bz = b[2]
	return new Float32Array([
		ay * bz - az * by,
 		az * bx - ax * bz,
 		ax * by - ay * bx
 	])
}

vec3.add = function(a, b, out){
	out[0] = a[0] + b[0]
	out[1] = a[1] + b[1]
	out[2] = a[2] + b[2]
}

vec3.sub = function(a, b, out){
	out[0] = a[0] - b[0]
	out[1] = a[1] - b[1]
	out[2] = a[2] - b[2]
}

vec3.scale = function(a, scale, out){
	out[0] = a[0] * scale
	out[1] = a[1] * scale
	out[2] = a[2] * scale
}

vec3.normalize = function(a,out){
	console.log('do this !')
}

vec3.dot = function(a, b){
	return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}

vec3.dotSelf = function(a){
	return x * x + y * y + z * z
}

vec3.length = function(a){
	var x = a[0], y = a[1], z = a[2]
	return Math.sqrt(x * x + y * y + z * z)
}


var vec4 = function( x, y, z, w){
	return new Float32Array([x, y, z, w])
}

vec4.xy = function(a){
	return new Float32Array([a[0],a[1]])
}

vec4.xyz = function(a){
	return new Float32Array([a[0],a[1],a[2]])
}

vec4.added = function(a, b){
	return new Float32Array([
		a[0] + b[0], 
		a[1] + b[1],
		a[2] + b[2],
		a[3] + b[3]
	])
}

vec4.subed = function(a, b){
	return new Float32Array([
		a[0] - b[0], 
		a[1] - b[1],
		a[2] - b[2],
		a[3] - b[3]
	])
}

vec4.scaled = function (a, scale){
	return new Float32Array([
		a[0] * scale,
		a[1] * scale,
		a[2] * scale,
		a[3] * scale
	])
}

vec4.normalized = function(a){
	console.log("do this!")
}

vec4.add = function(a, b, out){
	out[0] = a[0] + b[0]
	out[1] = a[1] + b[1]
	out[2] = a[2] + b[2]
	out[3] = a[3] + b[3]
}

vec4.sub = function(a, b, out){
	out[0] = a[0] - b[0]
	out[1] = a[1] - b[1]
	out[2] = a[2] - b[2]
	out[3] = a[3] - b[3]
}

vec4.scale = function(a, scale, out){
	out[0] = a[0] * scale
	out[1] = a[1] * scale
	out[2] = a[2] * scale
	out[3] = a[3] * scale
}

vec4.normalize = function(a,out){
	console.log('do this !')
}

vec4.length = function(a){
	var x = a[0], y = a[1], z = a[2], w = a[3]
	return Math.sqrt(x * x + y * y + z * z + w * w)
}


var mat4 = function(){
	//just use a float32Array with 16 elements, would be nice to pass as cols
	//but might just confused me if I am using 2 systems 
	console.log(" I haven't figured out a good way to do this yet, sorry!")
}
	mat4.console = function(_mat1){
		var str = ""
		str+= _mat1[0]  + " , "  + _mat1[1] + " , " +  _mat1[2]  + " , " +  _mat1[3]  + "\n"
		str+= _mat1[4]  + " , "  + _mat1[5] + " , " +  _mat1[6]  + " , " +  _mat1[7]  + "\n"
		str+= _mat1[8]  + " , "  + _mat1[9] + " , " +  _mat1[10] + " , " +  _mat1[11] + "\n"
		str+= _mat1[12] + " , " + _mat1[13] + " , " +  _mat1[14] + " , " +  _mat1[15] + "\n"
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
//http://www.lwjgl.org/wiki/index.php?title=The_Quad_with_Projection,_View_and_Model_matrices
//badass explanation on here, read this to better understand this.
//I dont reallllly get it, need to know moar
	
	mat4.createPerspective = function(a,fov,near,far){
		var zm = far - near
		var zp = far + near
		var out = new Float32Array(16)
			out[0] = (1/Math.tan(fov/2))/a
			out[1] = 0 
			out[2] = 0
			out[3] = 0
			out[4] = 0 
			out[5] = 1/Math.tan(fov/2)
			out[6] = 0
			out[7] = 0 
			out[8] = 0
			out[9] = 0
			out[10] = -zp/zm
			out[11] = -(2 * far * near)/zm
			out[12] = 0 
			out[13] = 0
			out[14] = -1
			out[15] = 0 

		return out
	}


	mat4.mvMatrix = function(){
		this.stack = []
		this.mat = new Float32Array(16)
		this.push = function(){
			this.stack.push(new Float32Array(this.mat))
		}
		this.pop = function(){
			this.mat = this.stack.pop()
		}
	}
var quat4 = function(){
	return new Float32Array(4)
}

	quat4.added = vec4.added
	quat4.add = vec4.add 
	quat4.subed = vec4.subed
	quat4.sub = vec4.sub

	quat4.conjugated = function(a){
		return new Float32Array([-a[0], -a[1], -a[2], a[3]])
	}

	//returns the result in a new vec, 
	quat4.multed = function(a, b){
		var ax = a[0], ay = a[1], az = a[2], aw = a[3],
			bx = b[0], by = b[1], bz = b[2], bw = b[3]

		var w = aw * bw - ax * bx - ay * by - az * bz  
		var x = aw * bx + bw * ax + ay * bz - by * az
		var y = aw * by + bw * aw + az * bx - bz * ax 
		var z = aw * bz + bw * az + ax * by - bx * ay
		return new Float32Array([x, y, z, w])
		//put above in here once I know that it is correct for sure
	}

	quat4.mult = function(){
		console.log('do this!')
	}

	quat4.rotatedVec3 = function(vector,axis,theta){
		//TODO optimize the shit out of this (rewrite Object friendly)
		// 4th component is 0, dont call functions, rewrite them 
		var sinOfHalfAngle = Math.sin(theta/2), cosOfHalfAngle = Math.cos(theta/2)
		var p = [vector[0],vector[1],vector[2],0]
		var q = [axis[0] * sinOfHalfAngle, axis[1] * sinOfHalfAngle, axis[2] * sinOfHalfAngle, cosOfHalfAngle]
		var qInverse = quat4.conjugated(q)
		var vPrime = quat4.multed(quat4.multed(q,p),qInverse)
		return new Float32Array([vPrime[0], vPrime[1], vPrime[2]])
	}

	//same thing as rotated  but modify the x,y,z of the out? I guess
	//TODO quat4.rotateVector
