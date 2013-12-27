module.exports = function(grunt){
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		watch:{
			all:{
				files:['src/**/*.js','examples/**/*.js','examples/**/*.html'],
				tasks:['concat'],
				options:{livereload:true}
			}
		},
		concat:{
			dist:{
				src:['src/rgl.js', 'src/**/*.js','src/dontlookatme.close'],
				dest:'dist/rgl.js'
			}
			
		}
	})

	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-contrib-concat')

	grunt.registerTask("default",['watch','concat'])
}