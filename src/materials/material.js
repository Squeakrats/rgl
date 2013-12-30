rgl.Material = function(){
	
}

rgl.CubeMaterial = function(data){
	this.type = data.type
	this.wireframe = data.wireframe || false
	this.normals = data.normals || "surface"
	this.shading = data.shading || "Gouraud"

	if(data.type=="texture"){
		this.texture = data.texture
			if(!data.texCoords){
				console.log(gl.ARRAY_BUFFER,rgl.genericCubeTextureCoordinates,gl.STATIC_DRAW,gl.UNSIGNED_BYTE,2,rgl.genericCubeTextureCoordinates.length/2)
				this.texCoordBuffer = new rgl.Buffer(gl.ARRAY_BUFFER,rgl.genericCubeTextureCoordinates,gl.STATIC_DRAW,gl.UNSIGNED_BYTE,2,rgl.genericCubeTextureCoordinates.length/2)
				console.log(this.texCoordBuffer)
			}else{
				console.log('didnt write the code to generate a texCoordBuffer ._. OOOPPPSS')
			}
	}
}

//also I guess UV stuff is what you ah supposed to do, but I dun get...so there is that. 

rgl.genericCubeTextureCoordinates = new Uint8Array([
	1,1,0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0,1,1
]) // lawl such line console.log(rgl.genericCubeTextureCoordinates.length/2)

console.log(rgl.genericCubeTextureCoordinates)