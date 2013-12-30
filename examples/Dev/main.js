
var canvas = rgl.canvas
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
var gl = rgl.gl
	gl.enable(gl.DEPTH_TEST)
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
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST)
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST) //gl.LINEAR
	//gl.generateMipmap(gl.TEXTURE_2D)
	gl.bindTexture(gl.TEXTURE_2D,null)

	//console.log(rgl)
	var cubeGeo = new rgl.CubeGeometry()
	var cubeMat = new rgl.CubeMaterial({type:"texture",texture:crateTexture})
	var cubeMesh = new rgl.Mesh(cubeGeo,cubeMat)
	console.log(cubeGeo)
	console.log(cubeMat)
	console.log(rgl.ap)
	//render(cubeMesh)
	setInterval(function(){
		render(cubeMesh)
	},17)
}


function render(mesh){
	var theta = new Date().getTime()/4000
	var geometry = mesh.geometry
	var material = mesh.material

	geometry.vertexNormalBuffer.bind()
	rgl.vertexAttribPointer("vertexPosition")
	
	material.texCoordBuffer.bind()
	rgl.vertexAttribPointer("texCoord")
	gl.bindTexture(gl.TEXTURE_2D,material.texture)
	gl.activeTexture(gl.TEXTURE0)
	gl.uniform1i(rgl.ap.uTexture,0)

	var rotation = new Float32Array([Math.sin(theta), 0,0 , Math.cos(theta)])//hax rotation for now, gotta think about this is gonna work
	gl.uniformMatrix4fv(rgl.ap.pMatrix,false,pMatrix)
	gl.uniform4fv(rgl.ap.rotationQuaternion,rotation)
	gl.uniform3fv(rgl.ap.scale,mesh.scale)
	gl.uniform3fv(rgl.ap.position, vec3.subed(mesh.position,[0,.75,1.5]) )
	gl.drawArrays(gl.TRIANGLES,0,36)//assume its a cube
}