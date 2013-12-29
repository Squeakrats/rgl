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

