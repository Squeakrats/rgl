/*
var canvas = rgl.canvas
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
var gl = rgl.gl
	gl.clearColor(0.0,0.0,0.0,1.0)
	gl.enable(gl.DEPTH_TEST)
	//gl.enable(gl.CULL_FACE)
	rgl.adjustViewportToCanvas()

var shaderText = rgl.loadShaderFile("shaders",false)
var crateImage = new Image()
var crateTexture = gl.createTexture()
	var floorGeo = new rgl.CubeGeometry(100,1,100)
	var scene = new rgl.Scene()
	var camera = new rgl.PerspectiveCamera(canvas.width/canvas.height,Math.PI/3,1,200)
		camera.position[2] = 4
	var renderer = new rgl.BasicRenderer()


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
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR) //gl.LINEAR
	gl.generateMipmap(gl.TEXTURE_2D)
	gl.bindTexture(gl.TEXTURE_2D,null)


	var cubeGeo = new rgl.CubeGeometry()
	var cubeMat = new rgl.CubeMaterial({type:"texture",texture:crateTexture})
	var cubeMesh = new rgl.Mesh(cubeGeo,cubeMat)
		//cubeMesh.position[2] = -8
	var floorMesh = new rgl.Mesh(floorGeo,cubeMat)
		//floorMesh.position[2] = -5

		scene.meshes.push(cubeMesh)
		scene.meshes.push(floorMesh)
		//console.log(scene)
		//console.log(cubeMesh)
		//rgl.clear()
		//renderer.render(scene,camera)
		//renderer.render(scene,camera)

	
		//setInterval(loop,17)
		console.log(camera.quaternion)
		loop()
	}
function loop(){
	registerkeys()
	rgl.clear()
	renderer.render(scene,camera)
}
function registerkeys(){

	//I should really cache the local position things for pplz. I reaaally should. dont re-solve every time
	//should do a check on the camera and move relative, need like a camera.moveForward(scale) or sumthin. cause what if in Euler or quat mode
	if('W' in keys){
		//vec3.add(camera.position,quat4.rotatedVec3Quat([0,0,-.1],camera.quaternion),camera.position)
	}
	if('S' in keys){
		//vec3.add(camera.position,quat4.rotatedVec3Quat([0,0,.1],camera.quaternion),camera.position)
	}
	if('A' in keys){
		//vec3.add(camera.position,quat4.rotatedVec3Quat([-.1,0,0],camera.quaternion),camera.position)
	}
	if('D' in keys){
		//vec3.add(camera.position,quat4.rotatedVec3Quat([.1,0,.0],camera.quaternion),camera.position) //temp left and right is in pixels, near to far is in sumthin else ._.
	}
	//console.log(keys)
}


*/

function main(){
	//this is the fake
}

