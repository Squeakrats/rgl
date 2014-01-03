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