/*global module:false*/
module.exports = function(grunt) {
	'use strict';
	grunt.initConfig({
		pkg: '<json:package.json>',
		meta: {
			banner: '// <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'<%= pkg.homepage ? "// " + pkg.homepage + "\n" : "" %>' +
				'// Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
				' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>'
		},
		clean: {
			dev: {
				src: ["build", "docs"]
			}
		},
		lint: {
			files: ['client/<%= pkg.name %>.json']
		},
		jade: {
			dev: {
				files: {
					'build/views/components.html' : ['client/components/**/*jade'],
					'build/views/pages.html'      : ['client/pages/**/*jade'],
					'build/index.html'            : ['client/index.jade']
				}
			}
		},
		livescript: {
			dev: {
				files: {
					'build/scripts/app.js'        : 'client/app.ls',
					'build/scripts/filters.js'    : 'client/filters/*ls',
					'build/scripts/services.js'   : 'client/services/*ls',
					'build/scripts/directives.js' : 'client/directives/*ls',
					'build/scripts/components.js' : 'client/components/**/*ls',
//					'build/scripts/pages.js'      : 'client/pages/**/*ls',
					'lib/appserver.js'            : 'server/appserver.ls'
				},
				options: {
					bare: false
				}
			},
			dist: {
				files: {
					'build/dist/<%= pkg.name %>.js': 'build/dist/<%= pkg.name %>.ls'
				}
			},
			test: {
				files: {
					'test/unit/js/components.js': ['client/components/**/test*ls'],
					'test/e2e/e2e.js': 'test/e2e/ls/**/*ls'
				},
				options: {
					bare: true
				}
			}
		},
		stylus: {
			dev: {
				files: {
					'build/styles/components.css' : ['client/components/**/*styl'],
					'build/styles/pages.css'      : ['client/pages/**/*styl']//,
//					'build/styles/directives.css' : ['client/directives/**/*styl']
				}
			}
		},
		concat: {
			app: {
				src:  [ 'client/app.js' ],
				dest: 'build/scripts/app.js'
			},
			components: {
				src:  [ 'build/scripts/components.js', 'client/components/**/*js' ],
				dest: 'build/scripts/components.js'
			},
			services: {
				src:  [ 'build/scripts/services.js', 'client/services/**/*js' ],
				dest: 'build/scripts/services.js'
			},
			filters: {
				src:  [ 'build/scripts/filters.js', 'client/filters/**/*js' ],
				dest: 'build/scripts/filters.js'
			},
			pages: {
				src:  [ 'build/scripts/pages.js', 'client/pages/**/*js' ],
				dest: 'build/scripts/pages.js'
			},
			directives: {
				src:  [ 'build/scripts/directives.js', 'client/directives/**/*js' ],
				dest: 'build/scripts/directives.js'
			}
//			,
//			dist: {
//				src: [
//					'build/dist/<%= pkg.name %>.js',
//					'client/scripts/js/app.js',
//					'client/components/**/*js',
//					'client/scripts/js/directives/*.js',
//					'client/scripts/js/services/*.js'
//				],
//				dest: 'build/dist/<%= pkg.name %>.js'
//			},
//			unit: {
//				src: ['test/unit/js/*'],
//				dest: 'test/unit.js'
//			}
		},
		copy: {
			dev: {
				files: {
					'build/vendor/'               : 'components/**',
//					'build/static/'               : 'client/static/**',
					'build/<%= pkg.name %>.json'  : 'client/<%= pkg.name %>.json'
				}
			}
		}//,
//		min: {
//			dist: {
//				src: ['<banner:meta.banner>', 'build/dist/<%= pkg.name %>.js'],
//				dest: 'build/dist/<%= pkg.name %>.min.js'
//			}
//		},
//		mincss: {
//			dist: {
//				files: {
//					'build/dist/<%= pkg.name %>.min.css': ['build/styles/<%= pkg.name %>.css']
//				}
//			}
//		},
//		qunit: {
//			files: ['test/**/*.html']
//		},
//		watch: {
//			app: {
//				files: [
//					"client/scripts/ls/**/*ls",
//					"client/views/**/*",
//					"test/**/*ls",
//					"client/styles/styl/**/*",
//					"client/components/**/*"
//				],
//				tasks: ["default"]
//			}
//		}
	});

	grunt.loadNpmTasks('grunt-contrib');
	grunt.loadNpmTasks('grunt-livescript');

//	grunt.registerTask('views', 'jade:templates jade:page jade:list');s
//	grunt.registerTask('scripts', 'livescript:app concat:js concat:jsServices concat:jsFilters concat:ls livescript:dist concat:dist');
//	grunt.registerTask('styles', 'stylus:app mincss:dist');
	grunt.registerTask('dev', 'lint jade:dev livescript:dev stylus:dev concat copy:dev');
	grunt.registerTask('tests', 'livescript:test concat:unit');
	grunt.registerTask('default', 'clean dev');
};
