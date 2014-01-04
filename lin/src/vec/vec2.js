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
