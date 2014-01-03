
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