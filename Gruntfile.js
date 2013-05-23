
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      production: {
        options: {
          baseUrl: "js/",
          mainConfigFile: "js/main.js",
          out: "dist/project-min.js",
          name:'main'
        }
      }
    },
    less:{
      developement:{
        src : ['public/less/fatstrap.less'],
        dest : 'public/css/fatstrap.css'
      }
    },
    watch:{
      files : ['public/less/*.less'],
      tasks : ['less']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('deploy', 'requirejs');


};
