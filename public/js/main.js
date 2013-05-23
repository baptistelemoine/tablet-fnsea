require.config({
  
  baseUrl:'js/',
  
  paths: {
    jquery: 'vendor/jquery/jquery',
    underscore: 'vendor/underscore/underscore',
    backbone: 'vendor/backbone/backbone',
    text: 'vendor/text/text',
    paginator:'vendor/backbone.paginator/lib/backbone.paginator'

  },
  
  shim: {
    backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
    },
    underscore: {
        exports: '_'
    },
    paginator : ['underscore', 'backbone']
  }
});

require(['app'], function(){
  
});