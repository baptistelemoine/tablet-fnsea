require.config({

  baseUrl:'js/',

  paths: {
    jquery: 'vendor/jquery/jquery',
    underscore: 'vendor/underscore/underscore',
    backbone: 'vendor/backbone/backbone',
    text: 'vendor/text/text',
    paginator:'vendor/backbone.paginator/lib/backbone.paginator',
    fastclick:'vendor/fastclick/lib/fastclick',
    bootstrap:'vendor/bootstrap/docs/assets/js/bootstrap',
    layout:'layout/layout',
    moment:'vendor/moment/min/moment.min',
    enquire:'vendor/enquire/dist/enquire'

  },
  shim: {
    backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
    },
    underscore: {
        exports: '_'
    },
    paginator : ['underscore', 'backbone'],
    layout : ['jquery'],
    bootstrap : ['jquery'],
    enquire:{
      exports:'enquire'
    }
  }
});

require(['app'], function(){

});