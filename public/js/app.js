define([
  'jquery',
  'underscore',
  'backbone',
  'views/AppView',
  'moment',
  'vendor/moment/min/lang/fr',
  'layout',
  'bootstrap'

  ], function ($, _, Backbone, AppView, moment){


  moment.lang('fr');

	$(document).ready(function(){
      var appView = new AppView();

	});

});