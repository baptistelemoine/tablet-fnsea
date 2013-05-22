require.config({
  
  baseUrl:'js/vendor',
  
  paths: {
    jquery: 'jquery/jquery',
    underscore: 'underscore/underscore',
    backbone: 'backbone/backbone',
    text: 'text/text',
    paginator:'backbone.paginator/lib/backbone.paginator'

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