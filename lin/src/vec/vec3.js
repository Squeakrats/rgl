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

