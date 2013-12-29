module.exports = function(grunt){
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		watch:{
			all:{
				files:['src/**/*.js','examples/**/*.js','examples/**/*.html','lin/src/**/*.js'],
				tasks:['concat'],
				options:{livereload:true}
			}
		},
		concat:{
			rgl:{
					src:['src/rgl.js', 'src/**/*.js','src/dontlookatme.close'],
					dest:'dist/rgl.js'
			},
			lin:{
					src:['lin/src/lin.js', 'lin/src/vec/*.js','lin/src/mat/*.js','lin/src/quat/*.js','lin/src/dontlookatme.close'],
					dest:'lin/dist/lin.js'
			}
			
		}

	})

	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-contrib-concat')
	

	grunt.registerTask("default",['watch','concat'])

}