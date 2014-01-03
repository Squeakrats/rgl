
var vec3 = function(){
	this.storage = new Float32Array(3)
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