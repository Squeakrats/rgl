
var canvas = rgl.canvas
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
var gl = rgl.gl
	rgl.adjustViewportToCanvas()

var pMatrix = mat4.createPerspective(canvas.width/canvas.height,Math.PI/2,1,100)
var shaderText = rgl.loadShaderFile("shaders",false)
var program = new rgl.Program(shaderText.vertexShader,shaderText.fragmentShader)
	rgl.useProgram(program)
var crateImage = new Image()
var crateTexture = gl.createTexture()




function main(){
	document.body.appendChild(canvas)
	crateImage.onload = function(){
		begin()
	}
	crateImage.src = "imgs/crate.png"
}
function begin(){
	gl.bindTexture(gl.TEXTURE_2D,crateTexture)
	gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,crateImage)
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR)
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR)
	gl.generateMipmap(gl.TEXTURE_2D)
	gl.bindTexture(gl.TEXTURE_2D,null)


	var cubeGeo  = rgl.createCubeGeometry(1,1,1)
	var cubeMaterial = new rgl.Material({type:"textured",texture:crateTexture})
	console.log(cubeGeo)
	console.log(cubeMaterial)
}


