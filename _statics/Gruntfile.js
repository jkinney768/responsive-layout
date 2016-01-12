module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //-------------------------------------------
    // Setup for template tags for directories
    //-------------------------------------------
    dir: {
        SRC: 'src',
        WEB: 'web',
    },

    //--------------------------------------
    // Sass Task
    //--------------------------------------
    sass: {                              // Task 
        dist: {                            // Target 
          options: {                       // Target options 
            style: 'compressed',
            sourceMap: true
          },
          files: {                         // Dictionary of files 
            '<%= dir.WEB %>/assets/styles/modern.css': '<%= dir.SRC %>/assets/scss/modern.scss'  // 'destination': 'source' 
          }
        }
    },

    //--------------------------------------
    // Clean Task
    //--------------------------------------
    clean: {
        dist: {
            src: ['<%= dir.WEB %>/assets/**',
                  '<%= dir.WEB %>/*.html']
        }
    },

    //--------------------------------------
    // Copy Assets Task
    //--------------------------------------
    copy: {
        dist: {
            files: [{
                expand: true,
                cwd: '<%= dir.SRC %>',
                src: ['assets/media/**',
                      'assets/scripts/**/*.js'],
                dest: '<%= dir.WEB %>'
            }]
        }
    },

    //--------------------------------------
    // HTML Includes Task
    //--------------------------------------
    includes: {
        build: {
            cwd: '<%= dir.SRC %>',
            src: [ '*.html'],
            dest: '<%= dir.WEB %>'
        }
    },

    postcss: {
        options: {
            map: true,
            processors: [
                require('autoprefixer')({ browsers: ['last 2 versions', 'ie 10'] })
            ]
        },
        dist: {
            files: [{
                expand: true,
                cwd: '<%= dir.WEB %>/assets/styles',
                src: ['*.css'],
                dest: '<%= dir.WEB %>/assets/styles',
                ext: '.css'
            }]
        }
    },

    //--------------------------------------
    // Watch Tasks
    //--------------------------------------
    watch: {
        options: {
            event: 'all',
            livereload: true
        },
        grunt: {
            files: ['Gruntfile.js'],
            tasks: ['default']
        },
        media: {
            files: ['<%= dir.SRC %>/assets/media/**'],
            tasks: ['default']
        },
        markup: {
            files: ['<%= dir.SRC %>/**/*.html'],
            tasks: ['includes']
        },
        styles: {
            files: ['<%= dir.SRC %>/assets/scss/**/*.scss'],
            tasks: ['default']
        },
        scripts: {
            files: ['<%= dirs.src %>/assets/{scripts,vendor}/**/*.js'],
            tasks: ['default']
        },
    }

  });

    if (grunt.option('all')) {
        // Run `grunt --all`
        grunt.registerTask('default', ['theme']);
    }

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-includes');
  grunt.loadNpmTasks('grunt-force');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');


  // Default task(s).
  grunt.registerTask('default', ['clean:dist', 'copy:dist', 'sass:dist', 'includes', 'postcss']);

};