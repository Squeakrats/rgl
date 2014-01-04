var mat4 = function(){
	this.storage = new Float32Array(16)
	return this
}

Object.defineProperties(mat4,{
	'fromArray' : {
		value : function (_array){
			var out = new mat4(), storage = mat3.storage
				out[0]  = _array[0]
				out[1]  = _array[1]
				out[2]  = _array[2]
				out[3]  = _array[3]
				out[4]  = _array[4]
				out[5]  = _array[5]
				out[6]  = _array[6]
				out[7]  = _array[7]
				out[8]  = _array[8]
				out[9]  = _array[9]
				out[10] = _array[10]
				out[11] = _array[11]
				out[12] = _array[12]
				out[13] = _array[13]
				out[14] = _array[14]
				out[15] = _array[15]
			return out 
		}
	},
	'identity' : {
		value : function (_mat){
			var storage = _mat.storage
				storage[0]  = 1
				storage[1]  = 0 
				storage[2]  = 0 
				storage[3]  = 0
				storage[4]  = 0 
				storage[5]  = 1 
				storage[6]  = 0 
				storage[7]  = 0 
				storage[8]  = 0 
				storage[9]  = 0 
				storage[10] = 1 
				storage[11] = 0
				storage[12] = 0 
				storage[13] = 0 
				storage[14] = 0 
				storage[15] = 1 
			return _mat 
		}
	},

	'mult' : {
		value : function (_mat1,_mat2){
			var out = new mat4(), outStorage = out.storage
				console.log('do me!')
			return out
		}
	},
})


Object.defineProperties(mat4.prototype,{
	//do the a00
	//do the r0
	//do the c0
	'identitySelf' : {
		value : function (){
			var storage = this.storage
				storage[0]  = 1
				storage[1]  = 0 
				storage[2]  = 0 
				storage[3]  = 0
				storage[4]  = 0 
				storage[5]  = 1 
				storage[6]  = 0 
				storage[7]  = 0 
				storage[8]  = 0 
				storage[9]  = 0 
				storage[10] = 1 
				storage[11] = 0
				storage[12] = 0 
				storage[13] = 0 
				storage[14] = 0 
				storage[15] = 1 
			return this
		}
	},
	'seRotationFromArray' : {
		value : function (_array){
			console.log('do me !')
			return this
		}
	},
	'mult' : {
		value : function (){

		}
	},
	'multSelf' : {
		value : function (){

		}
	}
})

/*
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

*/