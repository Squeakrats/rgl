rgl.Shader = function(type, srcText){
	this.srcText = srcText
	this.shader = gl.createShader(type)
		gl.shaderSource(this.shader, srcText)
		gl.compileShader(this.shader)

	if(!gl.getShaderParameter(this.shader,gl.COMPILE_STATUS)){
		console.log(gl.getShaderInfoLog(this.shader))
	}

}