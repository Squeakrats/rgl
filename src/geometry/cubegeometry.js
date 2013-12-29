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