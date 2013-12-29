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