var mat4 = function(){
	//just use a float32Array with 16 elements, would be nice to pass as cols
	//but might just confused me if I am using 2 systems 
	console.log(" I haven't figured out a good way to do this yet, sorry!")
}
	mat4.console = function(a){
		var str = ""
		str+= a[0]  + " , "  + a[4] + " , " +  a[8]  + " , " +  a[12]  + "\n"
		str+= a[1]  + " , "  + a[5] + " , " +  a[9]  + " , " +  a[13]  + "\n"
		str+= a[2]  + " , "  + a[6] + " , " +  a[10] + " , " +  a[14]  + "\n"
		str+= a[3]  + " , "  + a[7] + " , " +  a[11] + " , " +  a[15]  + "\n"
		console.log(str)
	//	console.log('this is so fucking wrong -.-')
	}

	mat4.writeRotation = function(b, a){
		a[0] = b[0]
		a[1] = b[1]
		a[2] = b[2]
		a[4] = b[3]
		a[5] = b[4]
		a[6] = b[5]
		a[8] = b[6]
		a[9] = b[7]
		a[10] = b[8]
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
	mat4.createIdentity = function(){
		var _mat1 = new Float32Array(16)
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
		return _mat1
	}

//from toji's gl-Matrix, perspective is my bane, learn this later
//https://github.com/toji/gl-matrix
	mat4.createPerspective = function(aspect,fov,near,far){
		var f = 1.0/Math.tan(fov/2)
		var nf = 1/ (near - far)
		var out = new Float32Array(16)
			out[0] = f/aspect
			out[1] = 0
			out[2] = 0
			out[3] = 0
			out[4] = 0 
			out[5] = f
			out[6] = 0
			out[7] = 0 
			out[8] = 0
			out[9] = 0
			out[10] = (far + near) * nf
			out[11] = -1
			out[12] = 0 
			out[13] = 0
			out[14] = (2 * far * near) * nf
			out[15] = 0 

		return out
	}

