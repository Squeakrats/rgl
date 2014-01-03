var mat3 = function(){
	this.storage = new Float32Array(9)
}

Object.defineProperties(mat3,{
	'fromArray' : {
		value : function (_array){
			var out = new mat3, storage = mat3.storage
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
			console.log('do me!')
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
	'identity' : {
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

*/