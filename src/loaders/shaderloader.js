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