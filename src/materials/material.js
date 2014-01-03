
rgl.Material = function(){
	
}

rgl.CubeMaterial = function(data){
	//all of this seems like the gernic material, shouldnt be cube specific ._.
	this.type = data.type
	this.wireframe = data.wireframe || false
	this.normal = data.normal || 'face'
	if(data.type=="texture"){
		this.texture = data.texture
			if(!data.texCoords){
				this.texCoordBuffer = new rgl.Buffer(gl.ARRAY_BUFFER,rgl.genericCubeTextureCoordinates,gl.STATIC_DRAW,gl.UNSIGNED_BYTE,2,rgl.genericCubeTextureCoordinates.length/2)
			}else{
				console.log('didnt write the code to generate a texCoordBuffer ._. OOOPPPSS')
			}
	}

	if(data.type == "texture" && (this.normal =="face" || "vertex")){
		var NORMAL = (this.normal == 'face')? "faceNormalBuffer":"vertexNormalBuffer"
		this.shaderMap = {
			program:rgl.programList.texturedNormalBuffer,
			attributes:{
				normal:NORMAL,
				texCoord:this.texCoordBuffer
			},
			uniforms:{
				texture:{type:'1i',value:this.texture,textureSlot:0}
			}
		}
	}

}


//also I guess UV stuff is what you ah supposed to do, but I dun get...so there is that. 

rgl.genericCubeTextureCoordinates = new Uint8Array([
	1,1,0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0,1,1
]) // lawl such line console.log(rgl.genericCubeTextureCoordinates.length/2)
