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

rgl.Mesh = function(geometry, material){
	this.position = new Float32Array(3)
	this.rotation = new Float32Array([0,0,0,1])
	this.scale    = new Float32Array([1,1,1])
	this.geometry = geometry
	this.material = material
	this.meshes = []

	var shaderMap = this.shaderMap = {program:material.shaderMap.program,attributes:{},uniforms:{}}
	materialAttributes = material.shaderMap.attributes 
	materialUniforms = material.shaderMap.uniforms

	for(var prop in materialAttributes){
		var value =  materialAttributes[prop] 
		shaderMap.attributes[prop] = (typeof value == "string")? geometry[value]: value
	}
	for(var prop in materialUniforms){
		var value =  materialUniforms[prop] 
		shaderMap.uniforms[prop] = (typeof value == "string")? geometry[value]: value
	}

}

rgl.Mesh.prototype.loadGL = function(){
	var shaderMap = this.shaderMap,
		attributes = shaderMap.attributes,
		uniforms = shaderMap.uniforms
	for(var attribute in attributes){
		var attrib = attributes[attribute]
			attrib.bind()
			rgl.vertexAttribPointer(attribute)
	}
	for(var uniform in uniforms){
		var uni = uniforms[uniform]
		rgl['uniform' + uni.type](rgl.ap[uniform],uni)
		//console.log(uni)
	}
//	console.log('still dont load uniforms ._.')
}



//setup using material.shaderMap 

rgl.BasicRenderer = function(){

	var mv = this.ModelView = new rgl.ModelView()


	this.render = function(scene, camera){
		var meshes = scene.meshes
		mv.push()

			if(!camera.usingEuler){
				mv.rotate(quat4.conjugated(camera.quaternion)) // verify that we are in quatmode first, use both for maximum magic
			}else{
			//	mv.rotate(quat4.fromEuler(camera.euler ))
			}
			
			mv.translate(vec3.scaled(camera.position,-1))
			for(var i=0, j = meshes.length; i < j; i++){
				console.log(meshes[i].position)
				this.renderMesh(meshes[i],camera)
			}

		mv.pop()
	}

	this.renderMesh = function(mesh, camera){
		var geometry = mesh.geometry, material = mesh.meterial 
		mv.push()
			mv.setMatrices()
			rgl.useProgram(mesh.shaderMap.program)
			geometry.vertexBuffer.bind()
			rgl.vertexAttribPointer("position")
			gl.uniformMatrix4fv(rgl.ap.pMatrix,false,camera.pMatrix)
			gl.uniformMatrix4fv(rgl.ap.mvMatrix,false,mv.mvMatrix)
			mesh.loadGL()
			gl.drawArrays(gl.TRIANGLES,0,geometry.vertexBuffer.numItems)
		mv.pop()
	}

	
}



rgl.ModelView = function(){
	this.translation = new Float32Array(3),
	this.quaternion = new Float32Array([0,0,0,1])
	this.scale    = new Float32Array([1,1,1])	
	this.mvMatrix = mat4.createIdentity() //only update when I need to pass it. 
	this.stack    = []
}
rgl.ModelView.prototype.push = function(){
		this.stack.push({
			translation:new Float32Array(this.translation),
			quaternion:new Float32Array(this.quaternion),
			scale:new Float32Array(this.scale)
		})
}
rgl.ModelView.prototype.pop = function(){
	var pick = this.stack.pop()
	this.translation = pick.translation
	this.quaternion = pick.quaternion
	this.scale = pick.quaternion
}
rgl.ModelView.prototype.rotate = function(quat){
	var quaternion = this.quaternion
	quat4.mult(quaternion,quat,quaternion) // I swapped these 

}
rgl.ModelView.prototype.translate = function(vector){
	var displacement = quat4.rotatedVec3Quat(vector,this.quaternion)
	vec3.add(this.translation,displacement,this.translation)
}

rgl.ModelView.prototype.setMatrices = function(){
	//so many things to unroll. but this is uber beta build 9k. js needs inline functions -.-
	var mv = this.mvMatrix
//	mat3.console(mat3.fromQuaternion(this.quaternion))
		mat4.writeRotation(mat3.fromQuaternion(this.quaternion) , mv)
		mv[12] = this.translation[0]
		mv[13] = this.translation[1]
		mv[14] = this.translation[2] //12,13,14
		//mat4.console(mv)
		//mat4.console(mv)
		//mat4.scale(mv,scale,mv)
}





/*
rgl.DeferredRenderer = function(){
	//convert shit to mvMatrix, pMatrix, mvPMatrix, rMatrix 
	this.mv = new rgl.ModelView()
}

rgl.DeferredRenderer.prototype.render = function(scene,camera){
	//set up the right framebuffer stuff etc. 
	//render geom
	var mv = this.mv
	var meshes = scene.meshes
	mv.push()

	//quat4.mult(mv.rotation,quat4.conjugated(camera.rotation),mv.rotation)
	//vec3.sub(mv.translation,camera.translation,mv.translation) //asumption that scene has 0 rotation ._. or uea/move then rot
	//mv.translate(vec3.scaled(camera.translation,-1))
	//mv.rotateFromQuat(quat4.conjugated(camera.rotation))
	var now = new Date().getTime()

	//mv.rotateFromQuat(quat4.conjugated(camera.rotation))
	//mv.translate(vec4.scaled(camera.translation,-1))

	//console.log(mv.translation)
	
	//console.log(mv.rotation)
	for(var i=0, j = meshes.length; i < j; i++){
		//this.renderMesh(meshes[i],camera)
	}
	mv.pop()
}
rgl.DeferredRenderer.prototype.renderMesh = function(mesh,camera){
	var mv  = this.mv
	var geometry = mesh.geometry
	var material = mesh.material
	mv.push()
	//go relative 

	rgl.useProgram(mesh.shaderMap.program)
	geometry.vertexBuffer.bind()
	rgl.vertexAttribPointer("vertextranslation")
	//gl.uniformMatrix4fv(rgl.ap.pMatrix,false,camera.pMatrix)
	//gl.uniform3fv(rgl.ap.meshtranslation,this.mv.translation) // hax
	//gl.uniform4fv(rgl.ap.rotation,this.mv.rotation)
	//gl.uniform3fv(rgl.ap.scale,this.mv.scale)

	mesh.loadGL()

	//assume its a soup for now AND assume its a mothe
	gl.drawArrays(gl.TRIANGLES,0,geometry.vertexBuffer.numItems)
	//lots of if-statements. PROOBB not how I want to do it in da future
	//this['setUpFor_' + material.type](mesh)

	//also render subMeshesEventually I guess .-.
	this.mv.pop()


}



//temporarily here
rgl.ModelView = function(){
	this.translation = new Float32Array(3),
	this.rotation = new Float32Array([0,0,0,1])
	this.scale    = new Float32Array([1,1,1])
	this.mvMatrix = mat4.createIdentity() //only update when I need to pass it. 
	this.stack    = []
}

rgl.ModelView.prototype.push = function(){
		this.stack.push({
			translation:new Float32Array(this.translation),
			rotation:new Float32Array(this.rotation),
			scale:new Float32Array(this.scale)
		})
}
rgl.ModelView.prototype.pop = function(){
	var pick = this.stack.pop()
	this.translation = pick.translation
	this.rotation = pick.rotation
	this.scale = pick.scale
}

rgl.ModelView.prototype.rotateFromQuat = function(quat){
	var rotation = this.rotation
	quat4.mult(rotation,quat,rotation) // I swapped these 
}
rgl.ModelView.prototype.translate = function(vector){
	var displacement = quat4.rotatedVec3Quat(vector,this.rotation)
	vec3.add(this.translation,displacement,this.translation)
}
*/
rgl.PerspectiveCamera = function(aspect, fov, near, far){
	this.pMatrix = mat4.createPerspective(aspect,fov,near,far)
	this.position = new Float32Array(3)
	this.euler = new Float32Array(3)
	this.quaternion =  new Float32Array([0,0,0,1])
	this.usingEuler = false
}
rgl.Scene = function(){
	this.pointLights = [] //wait, should objects be aloud to have point lights on them? O_o that would be effin weird.
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

rgl.Shader = function(type, srcText){
    if(type == gl.VERTEX_SHADER){
        srcText="\
            uniform mat4 pMatrix;\n\
            uniform mat4 mvMatrix;\n\
            uniform mat4 pMvMatrix;\n\
            attribute vec3 position;\n\
            " + srcText
    }
    this.srcText = srcText
    this.shader = gl.createShader(type)
        gl.shaderSource(this.shader, srcText)
        gl.compileShader(this.shader)

    if(!gl.getShaderParameter(this.shader,gl.COMPILE_STATUS)){
        console.log(gl.getShaderInfoLog(this.shader),(function(){return (type==gl.VERTEX_SHADER)? 'vertex':'fragment'})())
    }

}

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

rgl.uniform1i = function(uniformLocation,data){
    gl.activeTexture(gl.TEXTURE0 + data.textureSlot)
    gl.bindTexture(gl.TEXTURE_2D,data.value)
    gl.uniform1i(uniformLocation,data.textureSlot)
}


rgl.programList = {}
rgl.programList.texturedNormalBuffer = new rgl.Program("\
    attribute vec3 normal;\n\
    attribute vec2 texCoord;\n\
    varying vec2 vCoord;\n\
    void main(void){\n\
        gl_Position = pMatrix * mvMatrix * vec4(position,1.0);\n\
        vCoord = texCoord;\n\
        vec3 save = normal;\n\
        mat4 copyAgain = pMvMatrix;\n\
    }",
    "\
    precision mediump float;\
    uniform sampler2D texture;\
    varying vec2 vCoord;\
    void main(void){\
        gl_FragColor = texture2D(texture,vCoord);\
    }\
    ")


//rgl.programList.texturedNormalBuffer = new rgl.Prog

return rgl
})()