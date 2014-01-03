addEventListener('keydown',keydown,true)
addEventListener('keyup',keyup,true)
var keys = {}
function keydown(e){
		keys[String.fromCharCode(e.keyCode)] = true
}
function keyup(e){
	delete keys[String.fromCharCode(e.keyCode)]
}
