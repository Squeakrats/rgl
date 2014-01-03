rgl.PerspectiveCamera = function(aspect, fov, near, far){
	this.pMatrix = mat4.createPerspective(aspect,fov,near,far)
	this.position = new Float32Array(3)
	this.euler = new Float32Array(3)
	this.quaternion =  new Float32Array([0,0,0,1])
	this.usingEuler = false
}