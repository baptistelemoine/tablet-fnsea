define([
  'jquery',
  'underscore',
  'backbone',
  'views/AppView',
  'moment',
  'fastclick',
  'vendor/moment/min/lang/fr',
  'layout',
  'bootstrap'

  ], function ($, _, Backbone, AppView, moment, FastClick){


  moment.lang('fr');

	$(document).ready(function(){
      var appView = new AppView();
      new FastClick(document.body);
	});

});