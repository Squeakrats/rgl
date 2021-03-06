
//assumed Float32ALWAYS
//dont add fromArray untill I know if I want to copy the contents of src or use that array ._. 
var vec2 = function(){
	this.storage = new Float32Array(2)
	return this
}
//switch froms to return for example new vec2.fromX()

Object.defineProperties(vec2,{
	'fromX' : {
		value: function (_x){
			var out = new vec2()
				out.storage[0] = _x
			return out
		}
	},
	'fromY' : {
		value: function (_y){
			var out = new vec2()
				out.storage[1] = _y
			return out
		}
	},
	'fromXY' : {
		value: function (_x, _y){
			var out = new vec2(), storage = out.storage
				storage[0] = _x
				storage[1] = _y
			return out
		}
	},
	'add' : {
		value : function (_vec1, _vec2){
			var out = new vec2(), outStorage = out.storage, storage1 = _vec1.storage, storage2 = _vec2.storage
			outStorage[0] = storage1[0] + storage2[0]
			outStorage[1] = storage1[1] + storage2[1]
			return out 
		}
	},
	'sub' : {
		value : function (_vec1, _vec2){
			var out = new vec2(), outStorage = out.storage, storage1 = _vec1.storage, storage2 = _vec2.storage
			outStorage[0] = storage1[0] - storage2[0]
			outStorage[1] = storage1[1] - storage2[1]
			return out 
		}
	},
	'dot' : {
		value : function (_vec1, _vec2){
			var storage1 = _vec1.storage,  x1 = storage1[0], y1 = storage1[1]
			var storage2 = _vec2.storage,  x2 = storage2[0], y2 = storage2[1]
			return x1 * x2 + y1 * y2 
		}
	}


})

Object.defineProperties(vec2.prototype,{
	'x' : {
		get : function (){
			return this.storage[0]
		},
		set : function (_value){
			this.storage[0] = _value
		}
	},
	'y' : {
		get : function (){
			return this.storage[1]
		},
		set : function (_value){
			this.storage[1] = _value
		}
	},
	'length' : {
		get : function (){
			var storage = this.storage, x = storage[0], y = storage[1]
			return x * x + y * y 

		}
	},
	'add' : {
		value : function (_vec){
			var out = new vec2(), outStorage = out.storage, storage1 = this.storage, storage2 = _vec.storage
			outStorage[0] = storage1[0] + storage2[0]
			outStorage[1] = storage1[1] + storage2[1]
			return out 
		}
	},
	'sub' : {
		value : function (_vec){
			var out = new vec2(), outStorage = out.storage, storage1 = this.storage, storage2 = _vec.storage
			outStorage[0] = storage1[0] - storage2[0]
			outStorage[1] = storage1[1] - storage2[1]
			return out 
		}
	},
	'addSelf' : {
		value : function (_vec){
			var storage = this.storage
			storage[0] += _vec[0]
			storage[1] += _vec[1]
			return this
		}
	},
	'subSelf' : {
		value : function (_vec){
			var storage = this.storage
			storage[0] -= _vec[0]
			storage[1] -= _vec[1]
			return this
		}
	},
	'dot' : {
		value : function (_vec){
			var storage1 = this.storage,  x1 = storage1[0], y1 =  storage1[1]
			var storage2 = _vec.storage,  x2 = storage2[0], y2 = storage2[1]
			return x1 * x2 + y1 * y2 
		}
	}
	
})


var vec3 = function(){
	this.storage = new Float32Array(3)
	return this
}

Object.defineProperties(vec3,{
	'fromX' : {
		value: function (_x){
			var out = new vec3()
				out.storage[0] = _x
			return out
		}
	},
	'fromY' : {
		value: function (_y){
			var out = new vec3()
				out.storage[1] = _y
			return out
		}
	},
	'fromZ' : {
		value: function (_z){
			var out = new vec3()
				out.storage[2] = _z
			return out
		}
	},
	'fromXY' : {
		value: function (_x, _y){
			var out = new vec3(), storage = out.storage
				storage[0] = _x
				storage[1] = _y
			return out
		}
	},
	'fromXYZ' : {
		value: function (_x, _y, _z){
			var out = new vec3(), storage = out.storage
				storage[0] = _x
				storage[1] = _y
				storage[2] = _z
			return out
		}
	},
	'add' : {
		value : function (_vec1, _vec2){
			var out = new vec3(), outStorage = out.storage, storage1 = _vec1.storage, storage2 = _vec2.storage
			outStorage[0] = storage1[0] + storage2[0]
			outStorage[1] = storage1[1] + storage2[1]
			outStorage[2] = storage1[2] + storage2[2]
			return out 
		}
	},
	'sub' : {
		value : function (_vec1, _vec2){
			var out = new vec3(), outStorage = out.storage, storage1 = _vec1.storage, storage2 = _vec2.storage
			outStorage[0] = storage1[0] - storage2[0]
			outStorage[1] = storage1[1] - storage2[1]
			outStorage[2] = storage1[2] - storage2[2]
			return out 
		}
	},
	'scale' : {
		value : function (_vec, _scale){
			var out = new vec3(), outStorage = out.storage, storage = _vec.storage
				outStorage = storage[0] * _scale
				outStorage = storage[1] * _scale
				outStorage = storage[1] * _scale
			return out
		}
	},
	'normalize' : {
		value : function (_vec){
			var storage = _vec.storage, x = storage[0], y = storage[1], z = storage[2], len = x * x + y * y + z * z, recip = 1/len
			var out = new vec3(), outStorage = out.storage
				outStorage[0] = storage[0] * recip
				outStorage[1] = storage[1] * recip
				outStorage[2] = storage[2] * recip
			return out
		}
	},
	'dot' : {
		value : function (_vec1, _vec2){
			var storage1 = _vec1.storage,  x1 = storage1[0], y1 = storage1[1], z1 = storage1[2]
			var storage2 = _vec2.storage,  x2 = storage2[0], y2 = storage2[1], z2 = storage2[2]
			return x1 * x2 + y1 * y2 + z1 * z2
		}
	},
	'cross': {
		value : function (_vec1, _vec2){
			var storage1 = _vec1.storage,  x1 = storage1[0], y1 = storage1[1], z1 = storage1[2]
			var storage2 = _vec2.storage,  x2 = storage2[0], y2 = storage2[1], z2 = storage2[2]
			var out = new vec3(), outStorage = out.storage 
				outStorage[0] = y1 * z2 - z1 * y2
				outStorage[1] = z1 * x2 - x1 * z2 
				outStorage[2] = x1 * y2 - y1 * x2
			return out
		}
	}


})

Object.defineProperties(vec3.prototype,{
	'x' : {
		get : function (){
			return this.storage[0]
		},
		set : function (_value){
			this.storage[0] = _value
		}
	},
	'y' : {
		get : function (){
			return this.storage[1]
		},
		set : function (_value){
			this.storage[1] = _value
		}
	},
	'z' : {
		get : function (){
			return this.storage[2]
		},
		set : function (_value){
			this.storage[2] = _value
		}
	},
	'xy' : {
		get : function (){
			var storage = this.storage
			var out = new vec2(), outStorage = out.storage
				out[0] = storage[0]
				out[1] = storage[1]
			return out
		},
		set : function (_value){
			console.log('I didnt do this yet!')
			//this.storage[2] = _value
		}
	},
	'xyz' : {
		get : function (){
			var storage = this.storage
			var out = new vec3(), outStorage = out.storage
				out[0] = storage[0]
				out[1] = storage[1]
				out[2] = storage[2]
			return out
		},
		set : function (_value){
			var storage = this.storage, valueStorage = _value.storage
				storage[0] = valueStorage[0]
				storage[1] = valueStorage[1]
				storage[2] = valueStorage[2]
				//consider returns on sets? im not sure how that is supposed tochain, but I guess stuff like array[counter++] is supposed to, so mebe
			//this.storage[2] = _value
		}
	},
	//do other zy, zx, zy, zzz, xxx, etc. lots of possibles xy is prob the most common one so I'll do that one 
	'length' : {
		get : function (){
			var storage = this.storage, x = storage[0], y = storage[1], z = storage[2]
			return x * x + y * y + z * z 

		}
	},
	'add' : {
		value : function (_vec){
			var out = new vec3(), outStorage = out.storage, storage1 = this.storage, storage2 = _vec.storage
			outStorage[0] = storage1[0] + storage2[0]
			outStorage[1] = storage1[1] + storage2[1]
			outStorage[2] = storage1[2] + storage2[2]
			return out 
		}
	},
	'sub' : {
		value : function (_vec){
			var out = new vec3(), outStorage = out.storage, storage1 = this.storage, storage2 = _vec.storage
			outStorage[0] = storage1[0] - storage2[0]
			outStorage[1] = storage1[1] - storage2[1]
			outStorage[2] = storage1[2] - storage2[2]
			return out 
		}
	},
	'scale': {
		value : function (_scale){
			var out = new vec3(), outStorage = out.storage, storage = this.storage
				outStorage = storage[0] * _scale
				outStorage = storage[1] * _scale
				outStorage = storage[1] * _scale
			return out
		}
	},
	'normalize' : {
		value : function (){
			var storage = this.storage, x = storage[0], y = storage[1], z = storage[2], len = x * x + y * y + z * z, recip = 1/len
			var out = new vec3(), outStorage = out.storage
				outStorage[0] = storage[0] * recip
				outStorage[1] = storage[1] * recip
				outStorage[2] = storage[2] * recip
			return out
		}
	},
	'addSelf' : {
		value : function (_vec){
			var storage = this.storage
			storage[0] += _vec[0]
			storage[1] += _vec[1]
			storage[2] += _vec[2]
			return this
		}
	},
	'subSelf' : {
		value : function (_vec){
			var storage = this.storage
			storage[0] -= _vec[0]
			storage[1] -= _vec[1]
			storage[2] -= _vec[2]
			return this
		}
	},
	'scaleSelf': {
		value : function (_scale){
			var storage = this.storage
				storage[0] *= _scale
				storage[1] *= _scale
				storage[2] *= _scale
			return this
		}
	},
	'normalizeSelf' : {
		value : function (){
			var storage = this.storage, x = storage[0], y = storage[1], z = storage[2], len = x * x + y * y + z * z, recip = 1/len
				storage[0] *= recip
				storage[1] *= recip
				storage[2] *= recip
			return this
		}
	},
	'dot' : {
		value : function (_vec){
			var storage1 = this.storage,  x1 = storage1[0], y1 =  storage1[1], z1 = storage1[2]
			var storage2 = _vec.storage,  x2 = storage2[0], y2 =  storage2[1], z2 = storage2[2]
			return x1 * x2 + y1 * y2 + z2 * z2
		}
	},
	'cross': {
		value : function (_vec){
			var storage1 = this.storage,  x1 = storage1[0], y1 = storage1[1], z1 = storage1[2]
			var storage2 = _vec.storage,  x2 = storage2[0], y2 = storage2[1], z2 = storage2[2]
			var out = new vec3(), outStorage = out.storage 
				outStorage[0] = y1 * z2 - z1 * y2
				outStorage[1] = z1 * x2 - x1 * z2 
				outStorage[2] = x1 * y2 - y1 * x2
			return out
		}
	}
	
})


























/*
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

*/

var vec4 = function(){
	this.storage = new Float32Array(3)
	return this
}

Object.defineProperties(vec4,{
	'fromX' : {
		value: function (_x){
			var out = new vec4()
				out.storage[0] = _x
			return out
		}
	},
	'fromY' : {
		value: function (_y){
			var out = new vec4()
				out.storage[1] = _y
			return out
		}
	},
	'fromZ' : {
		value: function (_z){
			var out = new vec4()
				out.storage[2] = _z
			return out
		}
	},
	'fromXY' : {
		value: function (_x, _y){
			var out = new vec4(), storage = out.storage
				storage[0] = _x
				storage[1] = _y
			return out
		}
	},
	'fromXYZ' : {
		value: function (_x, _y, _z){
			var out = new vec4(), storage = out.storage
				storage[0] = _x
				storage[1] = _y
				storage[2] = _z
			return out
		}
	},
	'fromXYZW' : {
		value: function (_x, _y, _z, _w){
			var out = new vec4(), storage = out.storage
				storage[0] = _x
				storage[1] = _y
				storage[2] = _z
				storage[3] = _w
			return out
		}
	},

	'add' : {
		value : function (_vec1, _vec2){
			var out = new vec4(), outStorage = out.storage, storage1 = _vec1.storage, storage2 = _vec2.storage
			outStorage[0] = storage1[0] + storage2[0]
			outStorage[1] = storage1[1] + storage2[1]
			outStorage[2] = storage1[2] + storage2[2]
			outStorage[3] = storage1[3] + storage2[3]
			return out 
		}
	},
	'sub' : {
		value : function (_vec1, _vec2){
			var out = new vec4(), outStorage = out.storage, storage1 = _vec1.storage, storage2 = _vec2.storage
			outStorage[0] = storage1[0] - storage2[0]
			outStorage[1] = storage1[1] - storage2[1]
			outStorage[2] = storage1[2] - storage2[2]
			outStorage[3] = storage1[3] - storage2[3]
			return out 
		}
	},
	'dot' : {
		value : function (_vec1, _vec2){
			var storage1 = _vec1.storage,  x1 = storage1[0], y1 = storage1[1], z1 = storage1[2], w1 = storage1[3]
			var storage2 = _vec2.storage,  x2 = storage2[0], y2 = storage2[1], z2 = storage2[2], w2 = storage2[3]
			return x1 * x2 + y1 * y2 + z1 * z2 + w1 * w2
		}
	}
})

Object.defineProperties(vec4.prototype,{
	'x' : {
		get : function (){
			return this.storage[0]
		},
		set : function (_value){
			this.storage[0] = _value
		}
	},
	'y' : {
		get : function (){
			return this.storage[1]
		},
		set : function (_value){
			this.storage[1] = _value
		}
	},
	'z' : {
		get : function (){
			return this.storage[2]
		},
		set : function (_value){
			this.storage[2] = _value
		}
	},
	'w' : {
		get : function (){
			return this.storage[3]
		},
		set : function (_value){
			this.storage[3] = _value
		}
	},
	'xy' : {
		get : function (){
			var storage = this.storage
			var out = new vec2(), outStorage = out.storage
				out[0] = storage[0]
				out[1] = storage[1]
			return out
		},
		set : function (_value){
			console.log('I didnt do this yet!')
			//this.storage[2] = _value
		}
	},
	'xyz' : {
		get : function (){
			var storage = this.storage
			var out = new vec3(), outStorage = out.storage
				out[0] = storage[0]
				out[1] = storage[1]
				out[2] = storage[2]
			return out
		},
		set : function (_value){
			console.log('I didnt do this yet!')
			//this.storage[2] = _value
		}
	},
	//do other zy, zx, zy, zzz, xxx, etc. lots of possibles xy is prob the most common one so I'll do that one 
	'length' : {
		get : function (){
			var storage = this.storage, x = storage[0], y = storage[1], z = storage[2], w = storage[3]
			return x * x + y * y + z * z + w * w

		}
	},
	'add' : {
		value : function (_vec){
			var out = new vec4(), outStorage = out.storage, storage1 = this.storage, storage2 = _vec.storage
			outStorage[0] = storage1[0] + storage2[0]
			outStorage[1] = storage1[1] + storage2[1]
			outStorage[2] = storage1[2] + storage2[2]
			outStorage[3] = storage1[3] + storage2[3]
			return out 
		}
	},
	'sub' : {
		value : function (_vec){
			var out = new vec4(), outStorage = out.storage, storage1 = this.storage, storage2 = _vec.storage
			outStorage[0] = storage1[0] - storage2[0]
			outStorage[1] = storage1[1] - storage2[1]
			outStorage[2] = storage1[2] - storage2[2]
			outStorage[3] = storage1[3] - storage2[3]
			return out 
		}
	},
	'addSelf' : {
		value : function (_vec){
			var storage = this.storage
			storage[0] += _vec[0]
			storage[1] += _vec[1]
			storage[2] += _vec[2]
			storage[3] += _vec[3]
			return this
		}
	},
	'subSelf' : {
		value : function (_vec){
			var storage = this.storage
			storage[0] -= _vec[0]
			storage[1] -= _vec[1]
			storage[2] -= _vec[2]
			storage[3] -= _vec[3]
			return this
		}
	},
	'dot' : {
		value : function (_vec){
			var storage1 = this.storage,  x1 = storage1[0], y1 =  storage1[1], z1 = storage1[2], w1 = storage1[3]
			var storage2 = _vec.storage,  x2 = storage2[0], y2 =  storage2[1], z2 = storage2[2], w2 = storage2[3]
			return x1 * x2 + y1 * y2 + z2 * z2 + w1 * w2
		}
	}

})

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
var quat = function (){
	this.storage = new Float32Array()//waaaait, why is a quat dif from a vector ._. huh. thats a good damn question. 
}

Object.defineProperties(quat,{
	'fromX' : vec4.fromX,
	'fromY' : vec4.fromY,
	'fromZ' : vec4.fromZ,
	'fromXY' : vec4.fromXY,
	'fromXYZ' : vec4.fromXYZ,
	'fromAxisAngle' : {
		value : function (){
			console.log('do me!')
		}
	},
	'fromArrayAngle' : {
		value : function (){
			console.log(' do me!')
		}
	},

	'add' : vec4.add,
	'sub' : vec4.sub,
	'mult' : {
		value: function (_quat1, _quat2){
			console.log('I didnt do this yet!')
		}
	},
	'conjugate' : {
		value: function (_quat){
			console.log('I didnt do this yet!')
		}
	}
})








/*
var quat4 = function(){
	return new Float32Array(4)
}

	quat4.axisAngle = function(axis,theta){
		var hcos = Math.cos(theta/2), hsin = Math.sin(theta/2)
			var out = []
				out[0] = axis[0] * hsin
				out[1] = axis[1] * hsin
				out[2] = axis[2] * hsin
				out[3] = hcos
			return new Float32Array(out)
	}

	quat4.fromEuler = function(euler){
		console.log('this is broken .-.')
		return new Float32Array([0,0,0,1])
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
		var y = aw * by + bw * ay + az * bx - bz * ax 
		var z = aw * bz + bw * az + ax * by - bx * ay
		return new Float32Array([x, y, z, w])
		//put above in here once I know that it is correct for sure
	}

	quat4.mult = function(a, b, out){
		var ax = a[0], ay = a[1], az = a[2], aw = a[3],
			bx = b[0], by = b[1], bz = b[2], bw = b[3]

		var w = aw * bw - ax * bx - ay * by - az * bz  
		var x = aw * bx + bw * ax + ay * bz - by * az
		var y = aw * by + bw * ay + az * bx - bz * ax 
		var z = aw * bz + bw * az + ax * by - bx * ay
		out[0] = x
		out[1] = y
		out[2] = z
		out[3] = w
		//put above in here once I know that it is correct for sure
	}


	quat4.rotatedVec3Axis = function(vector,axis,theta){
		//TODO optimize the shit out of this (rewrite Object friendly)
		// 4th component is 0, dont call functions, rewrite them 
		var sinOfHalfAngle = Math.sin(theta/2), cosOfHalfAngle = Math.cos(theta/2)
		var p = [vector[0],vector[1],vector[2],0]
		var q = [axis[0] * sinOfHalfAngle, axis[1] * sinOfHalfAngle, axis[2] * sinOfHalfAngle, cosOfHalfAngle]
		var qInverse = quat4.conjugated(q)
		var vPrime = quat4.multed(quat4.multed(q,p),qInverse)
		return new Float32Array([vPrime[0], vPrime[1], vPrime[2]])
	}
	quat4.rotatedVec3Quat = function(vector,quat){
		//TODO optimize the shit out of this (rewrite Object friendly)
		// 4th component is 0, dont call functions, rewrite them 
		var p = [vector[0],vector[1],vector[2],0]
		var q = quat
		var qInverse = quat4.conjugated(q)
		var vPrime = quat4.multed(quat4.multed(q,p),qInverse)
		return new Float32Array([vPrime[0], vPrime[1], vPrime[2]])
	}

*/
