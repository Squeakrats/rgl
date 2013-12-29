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