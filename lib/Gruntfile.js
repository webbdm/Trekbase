module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['../javascript/**/*.js', '!../javascript/vendor/**/*.js'],
      options: {
        predef: [ "document", "console", "$"],
        esnext: true
      }
    },
     sass: {
      dist: {
        files: {
          '../styles/main.css': '../sass/main.scss'
        }
      }
    },
    watch: {
      javascripts: {
        files: ['../javascript/**/*.js'],
        tasks: ['jshint']
      },
      sassy: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['sass', 'jshint', 'watch']);
};