module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      options : {
        force : true
      },
      main : ['dist', 'template', '.tmp/*', 'assets/js/app.js'],
    },

    jshint: {
      all: [ 'Gruntfile.js', 'app/*.js', 'app/**/*.js']
    },

    html2js: {
      options: {
        base: 'app',
        module: 'myApp.templates',
        singleModule: true,
        useStrict: true,
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      },
      main: {
        src: [ 'app/views/*.html' ],
        dest: 'template/template.js'
      }
    },
    concat: {
      /*options: {
        separator: ';'
      },*/
      app: {
        src: [
        'app/*.js',
        'app/services/*.js',
        'app/controllers/*.js',
        'app/directives/*.js',
        'template/*.js'
         ],
        dest: 'assets/js/app.js'
      }
    },
    useminPrepare: {
      html: 'index.php',
      options: {
        dest: 'view'
      }
    },
    usemin: {
      html:['index.php']
    },
    copy: {
      main: {
        src: 'app/index.html',
        dest: 'index.php'
      }
    },
    cssmin : {
      dist : {
        files : {
          'assets/css/main.css' : ['.tmp/concat/assets/css/main.css']
        }
      }
    },
    uglify : {
      dist:{
        files: {
           'assets/js/main.js': ['.tmp/concat/assets/js/main.js']
         },
        options: {
          mangle: false
        }
      }
    },
    injector: {
      options: {},
      local_dependencies: {
        files: {
          'app/index.html': [ 'app/*.js', 'app/services/*.js', 'app/controllers/*.js', 'template/*.js' ]
        }
      }
    },
    watch: {
      files: ['app/*.js', 'app/*.html', 'app/**/*.js', 'app/views/*.html'],
      tasks: ['dev']
    }

    // Task configuration will be written here
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-injector');
  // Loading of tasks and registering tasks will be written here

  grunt.registerTask('dev', [ 'clean', 'copy', 'jshint', 'html2js', 'concat:app']);
  grunt.registerTask('build', [ 'clean', 'copy', 'jshint', 'html2js', 'concat:app', 'useminPrepare', 'concat:generated', 'cssmin:dist', 'uglify:dist', 'usemin']);

};
