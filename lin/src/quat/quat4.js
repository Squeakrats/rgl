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