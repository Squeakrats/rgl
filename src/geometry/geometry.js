

rgl.Geometry = function(){
	
}

rgl.Geometry.prototype.setup = function(){
	this.vertices = []
	this.faceIndices = [] // maybe not? o_O cause waht if not faceindices kinda guy
	this.vertexNormals = []
	this.faceNormals = []
	this.wireframeIndices = []

	this.webglVertices  = []
	this.webglVertexNormals = []
	this.webglFaceNormals = []
	this.webglWireframeIndices = []

	this.data = {}
}

rgl.Geometry.prototype.buildBuffers = function(vertices,vertexNormals,faceNormals){
	if(vertices == true){
		this.vertexBuffer = new rgl.Buffer(gl.ARRAY_BUFFER, new Float32Array(this.webglVertices),gl.STATIC_DRAW,gl.FLOAT,3,this.webglVertices.length/3)
	}
	if(vertexNormals == true){
		this.vertexNormalBuffer = new rgl.Buffer(gl.ARRAY_BUFFER, new Float32Array(this.webglVertexNormals), gl.STATIC_DRAW, gl.FLOAT,3,this.webglVertexNormals.length/3)
	}
	if(faceNormals == true){
		this.faceNormalBuffer = new rgl.Buffer(gl.ARRAY_BUFFER, new Float32Array(this.webglFaceNormals), gl.STATIC_DRAW, gl.FLOAT,3,this.webglFaceNormals.length/3)
	}
}

rgl.TriangleSoup = function(){
	
}

rgl.TriangleSoup.prototype = new rgl.Geometry()

rgl.TriangleSoup.prototype.addFace = function(indices){
	this.faceIndices.push(indices)
}

rgl.TriangleSoup.prototype.addVertexNormal = function(){

}

rgl.TriangleSoup.prototype.computeFaceNormals = function(){
	console.log('make sure this actually works!')
	var faceIndices = this.faceIndices, webglFaceNormals = this.webglFaceNormals
	var len = faceIndices.length
	for(var i = 0; i < len; i++){
		var face 		  = faceIndices[i],
			vertices      = this.vertices, 
			vertexNormals = this.vertexNormals, 
			faceNormals   = this.faceNormals,
			v1            = vertices[face[0]],
			v2            = vertices[face[1]], 
			v3            = vertices[face[2]],
			n1            = vNormals[face[0]],
			n2            = vNormals[face[1]], 
			n3            = vNormals[face[2]],
			edge1         = vec3.subed(v2,v1), 
			edge2         = vec3.subed(v3,v2),
			faceNormal    = vec3.normalized(vec3.crossed(edge1,edge2))
		faceNormals.push(faceNormal)
		//webglFaceNormals.push(faceNormal[0],faceNormal[1],faceNormal[2])
	}

}

rgl.TriangleSoup.prototype.build = function(){
	//build arrays

	//update webglVertices
	var webglVertices = this.webglVertices,
		faceIndices = this.faceIndices, 
		vertices = this.vertices, 
		faceNormals = this.faceNormals, 
		vertexNormals = this.vertexNormals,
		webglVertices = this.webglVertices,
		webglFaceNormals = this.webglFaceNormals,
		webglVertexNormals = this.webglVertexNormals

	var len = faceIndices.length

	//generate vertices ALWAYS ASUME WE HAVE THEM, PRRROOBBB NOT A GOOD IDEA 
	for(var i = 0; i < len; i++){
		var face = faceIndices[i]
		var vCount = face.length
			for(var v = 0; v < vCount; v++){
				var vertex = vertices[face[v]]
				webglVertices.push(vertex[0],vertex[1],vertex[2])
			}
	}

	//generate faceNormals if all the data is present 
	var FACENORMALS = false
	if(faceNormals.length == faceIndices.length){
		FACENORMALS = true
		for(var i = 0; i < len; i++){
			var face = faceIndices[i]
			var normal = faceNormals[i]
			var vCount = face.length
				for(var v = 0; v < vCount; v++){
					webglFaceNormals.push(normal[0],normal[1],normal[2])
				}
		}

	}

	//generate vertexNormals if they are all there
	var VERTEXNORMALS = false
	if(vertexNormals.length == vertices.length){
		VERTEXNORMALS = true
		for(var i = 0; i < len; i++){
			var face = faceIndices[i]
			var vCount = face.length
				for(var v = 0; v < vCount; v++){
					var normal = vertexNormals[face[v]]
					webglVertexNormals.push(normal[0],normal[1],normal[2])
				}
		}

	}


	//build buffers
	this.buildBuffers(true,VERTEXNORMALS,FACENORMALS)
}

rgl.CubeGeometry = function(xScale,yScale,zScale){
	this.setup()

	var hx = xScale/2 || .5, 
		hy = yScale/2 || .5, 
		hz = zScale/2 || .5

	var vertices      = this.vertices, 
		vertexNormals = this.vertexNormals, 
		faceNormals   = this.faceNormals,
		webglFaceNormals  = this.webglFaceNormals
		//vertices
		vertices.push(vec3( hx,  hy, hz))
		vertices.push(vec3(-hx,  hy, hz))
		vertices.push(vec3(-hx, -hy, hz))
		vertices.push(vec3( hx, -hy, hz))

		vertices.push(vec3(-hx,  hy, -hz))
		vertices.push(vec3( hx,  hy, -hz))
		vertices.push(vec3( hx, -hy, -hz))
		vertices.push(vec3(-hx, -hy, -hz))

		//vertexNormals
		for(var i = 0; i < 8; i++){
			vertexNormals[i] = vec3.normalized(vertices[i])
		}

		//faces...is it weird to have the front face be 2 faces? O_o ITS

		//front face
		this.addFace([0,  1,  2])
		this.addFace([2,  3,  0])
		//back face
		this.addFace([4,  5,  6])
		this.addFace([6,  7,  4])
		//right face
		this.addFace([5,  0,  3])
		this.addFace([3,  6,  5])
		//left face
		this.addFace([1,  4,  7])
		this.addFace([7,  2,  1])
		//top face
		this.addFace([5,  4,  1])
		this.addFace([1,  0,  5])
		//bottom face
		this.addFace([7,  6,  3])
		this.addFace([3,  2,  7])

		//faceNormals
		faceNormals.push(
			//front
			[ 0, 0, 1], [ 0, 0, 1],
			//back
			[ 0, 0,-1], [ 0, 0,-1],
			//right
			[ 1, 0, 0], [ 1, 0, 0],
			//left
			[-1, 0, 0], [-1, 0, 0],
			//top
			[ 0, 1, 0], [ 0, 1, 0],
			//bottom
			[ 0,-1, 1], [ 0,-1, 1]
		)
	this.build()
}

rgl.CubeGeometry.prototype = new rgl.TriangleSoup()
