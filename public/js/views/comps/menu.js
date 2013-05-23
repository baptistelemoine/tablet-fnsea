define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/menu.html'

], function ($, _, Backbone, MenuTmpl) {

    return Backbone.View.extend({

		el:'#menu',

		template:_.template(MenuTmpl),

        initialize:function(options) {

          _.bindAll(this, 'render');

        },

        render:function(){
			this.$el.append(this.template());
			return this;
        }

    });

});