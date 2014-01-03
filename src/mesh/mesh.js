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

