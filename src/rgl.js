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


