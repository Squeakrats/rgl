rgl.Material = function(data){
	//support for bump mapping stuff can come later....hmmm.
	//not sure how that will work with some stuff havin
	//and soem stuff nawt. huuuhhh
	this.wireframe = data.wireframe || false
	this.shading = data.shading || 'gorroud'
	this.normals = data.normals || 'face'
	this.type = data.type || "solid"
	if(this.type=="textured"){
		this.texture = data.texture
		if(!data.texCoords){
			console.log('tex coords are undefined...using filler for a cube!')
			var texCoordArray = []
				for(var i=0;i<6;i++){
					texCoordArray.push(
						1,1,
						0,1,
						0,0,
						0,0,
						1,0,
						1,1
					)
				}
				//remove once spheres are coming plz
			this.texCoordBuffer = new rgl.Buffer(gl.ARRAY_BUFFER,new Uint8Array(texCoordArray),gl.STATIC_DRAW,gl.UNSIGNED_BYTE,2,texCoordArray.length/2)
		}else{
			console.log('didnt make the texCoords')
			//this.texCoords = data.texCoords
		}
	}
	//add support for colormap stuffs
}