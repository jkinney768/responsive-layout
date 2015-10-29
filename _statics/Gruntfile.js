module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //-------------------------------------------
    // Setup for template tags for directories
    //-------------------------------------------
    dirs: {
        src: 'src',
        web: 'web',
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
            '<%= dirs.web %>/assets/styles/modern.css': '<%= dirs.src %>/assets/styles/modern.scss'  // 'destination': 'source' 
          }
        },

        // Flag for Theme task
        theme: {
            files: {                         // Dictionary of files 
            '<%= dirs.theme %>/assets/styles/modern.css': '<%= dirs.src %>/assets/styles/modern.scss'  // 'destination': 'source' 
          }
        }
    },

    //--------------------------------------
    // Clean Task
    //--------------------------------------
    clean: {
        dist: {
            src: ["<%= dirs.web %>/assets/**",
                  '<%= dirs.web %>/*.html']
        },

        theme: {
            src: ["<%= dirs.theme %>/assets/**"]
        }
    },

    //--------------------------------------
    // Copy Assets Task
    //--------------------------------------
    copy: {
        dist: {
            files: [{
                expand: true,
                cwd: '<%= dirs.src %>',
                src: ['assets/media/**',
                      'assets/scripts/**/*.js'],
                dest: '<%= dirs.web %>'
            }]
        },

        theme: {
            files: [{
                expand: true,
                cwd: '<%= dirs.src %>',
                src: ['assets/images/**',
                      'assets/scripts/**/*.js'],
                dest: '<%= dirs.theme %>'
            }]
        },
    },

    //--------------------------------------
    // HTML Includes Task
    //--------------------------------------
    includes: {
        build: {
            cwd: '<%= dirs.src %>',
            src: [ '*.html'],
            dest: '<%= dirs.web %>'
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
            files: ['<%= dirs.src %>/assets/media/**'],
            tasks: ['default']
        },
        markup: {
            files: ['<%= dirs.src %>/**/*.html'],
            tasks: ['includes']
        },
        styles: {
            files: ['<%= dirs.src %>/assets/styles/**/*.scss'],
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


  // Default task(s).
  grunt.registerTask('default', ['clean:dist', 'copy:dist', 'sass:dist', 'includes']);

  // Uses force:clean to allow deleting files outside of _statics directory
  grunt.registerTask('theme', ['force:clean:theme', 'copy:theme', 'sass:theme']);

};