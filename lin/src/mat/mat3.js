var mat3 = function(){
	//just use a float32Array with 16 elements, would be nice to pass as cols
	//but might just confused me if I am using 2 systems 
	console.log(" I haven't figured out a good way to do this yet, sorry!")
}
	//from this place 
	//http://fabiensanglard.net/doom3_documentation/37726-293748.pdf

	mat3.fromQuaternion = function(quat){
		var x = quat[0], y = quat[1], z = quat[2], w = quat[3]
			xx = x * x,  yy = y * y, zz = z * z,
			xy = x * y, xz = x * z,
			yz = y * z, 
			wx = w * x, wy = w * y, wz = w * z
		
		var out = new Float32Array(9)
			out[0] = 1 - 2 * yy - 2 * zz 
			out[1] = 2 * xy - 2 * wz
			out[2] = 2 * xz + 2 * wy 
			out[3] = 2 * xy + 2 * wz 
			out[4] = 1 - 2 * xx - 2 * zz
			out[5] = 2 * yz - 2 * wx 
			out[6] = 2 * xz - 2 * wy 
			out[7] = 2 * yz + 2 * wx
			out[8] = 1 - 2 * xx - 2 * yy
			return out 

	}

	mat3.console = function(a){
		var str = ""
		str+= a[0]  + " , "  + a[3] + " , " +  a[6] + "\n"
		str+= a[1]  + " , "  + a[4] + " , " +  a[7] + "\n"
		str+= a[2]  + " , "  + a[5] + " , " +  a[8] + "\n"
		console.log(str)
	}

	mat3.write = function(b, a){
		a[0] = b[0]
		a[1] = b[1]
		a[2] = b[2]
		a[3] = b[3]
		a[4] = b[4]
		a[5] = b[5]
		a[6] = b[6]
		a[7] = b[7]
		a[8] = b[8]
		a[9] = b[9]

	}

	mat3.identity = function(a){
		a[0] = 1
		a[1] = 0
		a[2] = 0 
		a[3] = 0 
		a[4] = 1
		a[5] = 0 
		a[6] = 0 
		a[7] = 0 
		a[8] = 1
	}

