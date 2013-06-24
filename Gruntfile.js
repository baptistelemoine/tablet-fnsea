
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      production: {
        options: {
          baseUrl: "public/js/",
          mainConfigFile: "public/js/main.js",
          out: "build/fnsea-tablet-min.js",
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
    },
    cssmin:{
      with_banner:{
        options:{
          banner:'/* css minified  */'
        },
        files:{
          'build/style-min.css':['public/css/*.css']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');


};
