var rgl = (function(){

var rgl = {}
	rgl.canvas = document.createElement('canvas')
	rgl.gl = rgl.canvas.getContext('webgl')
	var canvas = rgl.canvas
	var gl = rgl.gl

	rgl.adjustViewportToCanvas = function(){
		gl.viewport(0,0,canvas.width,canvas.height)
	}

	rgl.clear = function(){
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
	}



//todo - explain each
rgl.ab = {}
rgl.Buffer = function(target, data, usage, type, itemSize, numItems){
	this.target = target
	//this.data = data? 
	this.usage = usage
	this.type = type
	this.itemSize = itemSize
	this.numItems = numItems

	this.buffer = gl.createBuffer()

	gl.bindBuffer(target, this.buffer)
    gl.bufferData(target, data, usage)
    gl.bindBuffer(target, null)

}

rgl.Buffer.prototype.bind = function(){
	gl.bindBuffer(this.target,this.buffer)
	rgl.ab[this.target] = this
}

rgl.vertexAttribPointer = function(attribute, normalized, stride, pointer){
	var NORMALIZED = normalized || false 
    var STRIDE     = stride     || 0 
    var POINTER    = pointer    || 0
	var buffer = rgl.ab[34962] // gl.ARRAY_BUFFER = 34962
	var program = rgl.ap
	gl.vertexAttribPointer(program[attribute],buffer.itemSize,buffer.type,NORMALIZED,STRIDE,POINTER)
}
rgl.createCubeGeometry = function(_xScale, _yScale, _zScale){
	var hx = _xScale/2, hy = _yScale/2, hz = _zScale/2

	var geo = new rgl.Geometry()

		geo.vertices.push( vec3( hx,  hy,  hz) )
		geo.vertices.push( vec3(-hx,  hy,  hz) )
		geo.vertices.push( vec3(-hx, -hy,  hz) )
		geo.vertices.push( vec3( hx, -hy,  hz) )

		geo.vertices.push( vec3(-hx,  hy,  -hz) )
		geo.vertices.push( vec3( hx,  hy,  -hz) )
		geo.vertices.push( vec3( hx, -hy,  -hz) )
		geo.vertices.push( vec3(-hx, -hy,  -hz) )
		
		//create vertex normals, ALWAYS DO THIS BEFORE PUSHING FACES.>_>
		//IF THIS IS CUSTOM GEO OR LOADED FROM A MODEL
		for(var i = 0; i < 8; i++){
			geo.vNormals[i] = vec3.normalized(geo.vertices[i])
		}
		//build faces
		geo.addFace([0,  1,  2,  2,  3,  0])
		geo.addFace([4,  5,  6,  6,  7,  4])
		geo.addFace([5,  0,  3,  3,  6,  5])
		geo.addFace([1,  4,  7,  7,  2,  1])
		geo.addFace([5,  4,  1,  1,  0,  5])
		geo.addFace([7,  6,  3,  3,  2,  7])

		//TODO implement the opt outs, right now it doesnt 
		geo.buildBuffers({vNormal:true,fNormal:true,vPosition:true})

	return geo 
}
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

rgl.loadShaderFile = function(dir,async,callback){
	var out = {}
	var xmlhttp = new XMLHttpRequest()
		xmlhttp.onreadystatechange = function(){
			if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
				var customDiv = document.createElement("div")
					customDiv.innerHTML = xmlhttp.responseText
				var scripts = customDiv.getElementsByTagName("script")
					for(var i=0;i<scripts.length;i++){
						out[scripts[i].id] = scripts[i].innerHTML
					}
			}
		}
		xmlhttp.open('GET', dir + ".html",async)
		xmlhttp.send()
	return out

}
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
rgl.Mesh = function(geometry, material){
	this.geometry = geometry
	this.material = material
	this.meshes = []
}
rgl.shaderStartRegex   = new RegExp("function \\(\\)\\{\\/\\*","")
rgl.shaderEndRegex     = new RegExp("\\*\\/\\}","")
rgl.commentRegex       = new RegExp("\\n.*//.*;", "g")
rgl.whiteSpaceRegex    = new RegExp(" *","g")
rgl.attributeRegex     = new RegExp("attribute .* .*;","g")
rgl.uniformRegex       = new RegExp("uniform .* .*;","g")
rgl.arrayRegex         = new RegExp("\\[.*\\]","g")

rgl.ap = {attributes:[],uniforms:[]}

rgl.Program = function(vSrcText,fSrcText){
	this.vertexShader = new rgl.Shader(gl.VERTEX_SHADER,vSrcText)
	this.fragmentShader = new rgl.Shader(gl.FRAGMENT_SHADER,fSrcText)

	this.program = gl.createProgram()
	gl.attachShader(this.program,this.vertexShader.shader)
	gl.attachShader(this.program,this.fragmentShader.shader)
	gl.linkProgram(this.program)

	if(!gl.getProgramParameter(this.program,gl.LINK_STATUS)){
		console.log('failed to link')
	}

	this.attributes = this.vertexShader.srcText.match(rgl.attributeRegex) || []
        
    for(var i = 0; i < this.attributes.length; i++){
        this.attributes[i] = this.attributes[i].split(" ")[2].replace(";","")
        this[this.attributes[i]] = gl.getAttribLocation(this.program,this.attributes[i])
        if(this[this.attributes[i]] < 0){
            console.log("attribute " + this.attributes[i] +  " is messed up!")
        }
    }

    this.uniforms =  (this.vertexShader.srcText + this.fragmentShader.srcText).match(rgl.uniformRegex) || []

    for(var i = 0; i < this.uniforms.length; i++){
        this.uniforms[i] = this.uniforms[i].split(" ")[2].replace(";","").replace(rgl.arrayRegex,"")
        this[this.uniforms[i]] = gl.getUniformLocation(this.program,this.uniforms[i])
        if(this[this.uniforms[i]] < 0){
            console.log("uniform " + this.uniforms[i] +  " is messed up!")
        }
    }
}

rgl.useProgram = function(program){

 	for(var i = 0;i < rgl.ap.attributes.length; i++){ 
        gl.disableVertexAttribArray(rgl.ap[rgl.ap.attributes[i]]) 
    } 
  
    gl.useProgram(program.program) 
    rgl.ap = program
    for(var i = 0; i < program.attributes.length; i++){ 
        gl.enableVertexAttribArray(program[program.attributes[i]]) 
    } 
}
rgl.Shader = function(type, srcText){
	this.srcText = srcText
	this.shader = gl.createShader(type)
		gl.shaderSource(this.shader, srcText)
		gl.compileShader(this.shader)

	if(!gl.getShaderParameter(this.shader,gl.COMPILE_STATUS)){
		console.log(gl.getShaderInfoLog(this.shader))
	}

}
return rgl
})()