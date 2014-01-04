var mat3 = function(){
	this.storage = new Float32Array(9)
	return this
}

Object.defineProperties(mat3,{
	'fromArray' : {
		value : function (_array){
			var out = new mat3(), storage = mat3.storage
				out[0] = _array[0]
				out[1] = _array[1]
				out[2] = _array[2]
				out[3] = _array[3]
				out[4] = _array[4]
				out[5] = _array[5]
				out[6] = _array[6]
				out[7] = _array[7]
				out[8] = _array[8]
			return out 
		}
	},
	'fromQuaternion' : {
		value : function (_quat){
			//consider using fromValues
			var out = new mat3(), outStorage = out.storage
			var quatStroage = _quat.storage
			var x = quatStroage[0], y = quatStroage[1], z = quatStroage[2], w = quatStroage[3]
			var xx = x * x, yy = y * y, zz = z * z, xy = x * y, xz = x * z, yz = y * z, wx = w *  x, wy = w * y, wz = w * z 
				quatStroage[0] = 1 - 2 * yy - 2 * zz 
				quatStroage[1] = 2 * xy - 2 * wz
				quatStroage[2] = 2 * xz + 2 * wy 
				quatStroage[3] = 2 * xy + 2 * wz 
				quatStroage[4] = 1 - 2 * xx - 2 * zz
				quatStroage[5] = 2 * yz - 2 * wx 
				quatStroage[6] = 2 * xz - 2 * wy 
				quatStroage[7] = 2 * yz + 2 * wx
				quatStroage[8] = 1 - 2 * xx - 2 * yy
			return out 

		}
	},
	'identity' : {
		value : function (_mat){
			var storage = _mat.storage
				storage[0] = 1
				storage[1] = 0 
				storage[2] = 0 
				storage[3] = 0
				storage[4] = 1 
				storage[5] = 0 
				storage[6] = 0 
				storage[7] = 0 
				storage[8] = 1 
			return _mat 
		}
	},

	'mult' : {
		value : function (_mat1,_mat2){
			var out = new mat3(), outStorage = out.storage, 
			st1 = _mat1.storage, st2 = _mat2.storage
			//mat1
			a00 = st1[0], a01 = st1[3], a02 = st1[6],
			a10 = st1[1], a11 = st1[4], a12 = st1[7],
			a20 = st1[2], a21 = st1[5], a22 = st1[8],
			//mat2
			b00 = st2[0], b01 = st2[3], b02 = st2[6],
			b10 = st2[1], b11 = st2[4], b12 = st2[7],
			b20 = st2[2], b21 = st2[5], b22 = st2[8]
			//col0
			outStorage[0] = a00 * b00 + a01 * b10 + a02 * b20 
			outStorage[1] = a10 * b00 + a11 * b10 + a12 * b20 
			outStorage[2] = a20 * b00 + a21 * b10 + a22 * b20 		
			//col1
			outStorage[3] = a00 * b01 + a01 * b11 + a02 * b21 
			outStorage[4] = a10 * b01 + a11 * b11 + a12 * b21
			outStorage[5] = a20 * b01 + a21 * b11 + a22 * b21 
			//col2
			outStorage[6] = a00 * b02 + a01 * b12 + a02 * b22 
			outStorage[7] = a10 * b02 + a11 * b12 + a12 * b22
			outStorage[8] = a20 * b02 + a21 * b12 + a22 * b22 
			return out
		}
	},
})
//add rCol + colR stuff for setting rows, as well as colums, and uniformScaling + non uni scaling, and scalar mult
Object.defineProperties(mat3.prototype,{
	'a00' : {
		get : function (){ return this.storage[0] },
		set : function(_value){ this.storage[0] = _value 
		}
	},
	'a10' : { 
		get : function (){ return this.storage[1] },
		set : function(_value){ this.storage[1] = _value
		}
	},
	'a20' : {
		get : function (){return this.storage[2] },
		set : function(_value){this.storage[2] = _value
		}
	},
	'a01' : {
		get : function (){return this.storage[3] },
		set : function(_value){ this.storage[3] = _value
		}
	},
	'a11' : { 
		get : function (){ return this.storage[4] },
		set : function(_value){ this.storage[4] = _value
		}
	},
	'a21' : {
		get : function (){ return this.storage[5] },
		set : function(_value){ this.storage[5] = _value
		}
	},
	'a02' : {
		get : function (){ return this.storage[6] },
		set : function(_value){ this.storage[6] = _value
		}
	},
	'a12' : {
		get : function (){ return this.storage[7] },
		set : function(_value){ this.storage[7] = _value
		}
	},
	'a22' : {
		get : function (){ return this.storage[8] },
		set : function(_value){ this.storage[8] = _value }
	},
	'identitySelf' : {
		value : function (){
			var storage = this.storage
				storage[0] = 1
				storage[1] = 0 
				storage[2] = 0 
				storage[3] = 0
				storage[4] = 1 
				storage[5] = 0 
				storage[6] = 0 
				storage[7] = 0 
				storage[8] = 1 
			return this 
		}
	},
	'mult' : {
		value : function (){
			console.log('do me!')
		}
	},
	'multSelf' : {
		value : function (){
			console.log('do me!')
		}
	}
})
/*

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

*/