define([
  'jquery',
  'underscore',
  'backbone',
  'views/comps/menu',
  'views/comps/header'

], function ($, _, Backbone, Menu, Header){

	return Backbone.View.extend({

		initialize:function(){

			_.bindAll(this, 'layout');
			this.layout();

		},

		layout:function(){
			var menu = new Menu();
			menu.render();

			var header = new Header();
			header.render();
		}

	});

});