rgl.Geometry = function(){
	this.vertices = []
	this.verticesConcat = []

	this.vNormals = []
	this.vNormalsConcat = []

	this.fIndices = []
	this.fNormals = []
	this.fNormalsConcat = []

	this.vPositionBuffer
	this.vNormalBuffer
	this.fNormalBuffer 
	this.vTriangleIndexBuffer
	this.vLineIndexBuffer
}
rgl.Geometry.prototype.addFace = function(faceIndices){
	this.fIndices.push(faceIndices)
	var vertices = this.vertices, vNormals = this.vNormals
	v1 = vertices[faceIndices[0]],v2 = vertices[faceIndices[1]], v3 = vertices[faceIndices[2]],
	n1 = vNormals[faceIndices[0]],n2 = vNormals[faceIndices[1]], n3 = vNormals[faceIndices[2]],
	edge1 = vec3.subed(v2,v1), edge2 = vec3.subed(v3,v2),
	cross = vec3.crossed(edge1,edge2)
	var cross0 = cross[0], cross1 = cross[1], cross2 = cross[2]
	//TODO cache this stuff here.
	this.verticesConcat.push(v1[0],v1[1],v1[2], v2[0],v2[1],v2[2], v3[0],v3[1],v3[2])
	this.fNormalsConcat.push(cross0,cross1,cross2,cross0,cross1,cross2,cross0,cross1,cross2)
	this.vNormalsConcat.push(n1[0],n1[1],n1[2], n2[0],n2[1],n2[2], n3[0],n3[1],n3[2])

	var len = faceIndices.length
	for(var i=3;i<len;i++){
		var vertex = vertices[faceIndices[i]]
		var normal = vNormals[faceIndices[i]]
		this.verticesConcat.push(vertex[0],vertex[1],vertex[2])
		this.fNormalsConcat.push(cross0, cross1, cross2)
		this.vNormalsConcat.push(normal[0], normal[1], normal[2])
	}

	this.fNormals.push(cross)
}

rgl.Geometry.prototype.buildBuffers = function(obj){
	if(obj.vPosition == true){
		this.vPositionBuffer = new rgl.Buffer(gl.ARRAY_BUFFER, new Float32Array(this.verticesConcat),gl.STATIC_DRAW,gl.FLOAT,3,this.verticesConcat.length/3)
	}
	if(obj.vNormal == true){
		this.vNormalBuffer = new rgl.Buffer(gl.ARRAY_BUFFER, new Float32Array(this.vNormalsConcat), gl.STATIC_DRAW, gl.FLOAT,3,this.vNormalsConcat.length/3)
	}
	if(obj.fNormal == true){
		this.fNormalBuffer = new rgl.Buffer(gl.ARRAY_BUFFER, new Float32Array(this.fNormalsConcat), gl.STATIC_DRAW, gl.FLOAT,3,this.fNormalsConcat.length/3)
	}
}
