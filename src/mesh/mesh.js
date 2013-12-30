rgl.Mesh = function(geometry, material){
	this.position = new Float32Array(3)
	this.rotation = new Float32Array(3)
	this.scale    = new Float32Array([1,1,1])

	this.geometry = geometry
	this.material = material
	this.meshes = []
}