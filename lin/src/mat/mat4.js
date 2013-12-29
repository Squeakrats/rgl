var mat4 = function(){
	//just use a float32Array with 16 elements, would be nice to pass as cols
	//but might just confused me if I am using 2 systems 
	console.log(" I haven't figured out a good way to do this yet, sorry!")
}
	mat4.console = function(_mat1){
		var str = ""
		str+= _mat1[0]  + " , "  + _mat1[1] + " , " +  _mat1[2]  + " , " +  _mat1[3]  + "\n"
		str+= _mat1[4]  + " , "  + _mat1[5] + " , " +  _mat1[6]  + " , " +  _mat1[7]  + "\n"
		str+= _mat1[8]  + " , "  + _mat1[9] + " , " +  _mat1[10] + " , " +  _mat1[11] + "\n"
		str+= _mat1[12] + " , " + _mat1[13] + " , " +  _mat1[14] + " , " +  _mat1[15] + "\n"
		console.log(str)
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
//http://www.lwjgl.org/wiki/index.php?title=The_Quad_with_Projection,_View_and_Model_matrices
//badass explanation on here, read this to better understand this.
//I dont reallllly get it, need to know moar
	
	mat4.createPerspective = function(a,fov,near,far){
		var zm = far - near
		var zp = far + near
		var out = new Float32Array(16)
			out[0] = (1/Math.tan(fov/2))/a
			out[1] = 0 
			out[2] = 0
			out[3] = 0
			out[4] = 0 
			out[5] = 1/Math.tan(fov/2)
			out[6] = 0
			out[7] = 0 
			out[8] = 0
			out[9] = 0
			out[10] = -zp/zm
			out[11] = -(2 * far * near)/zm
			out[12] = 0 
			out[13] = 0
			out[14] = -1
			out[15] = 0 

		return out
	}


	mat4.mvMatrix = function(){
		this.stack = []
		this.mat = new Float32Array(16)
		this.push = function(){
			this.stack.push(new Float32Array(this.mat))
		}
		this.pop = function(){
			this.mat = this.stack.pop()
		}
	}