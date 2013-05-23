define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/header.html'

], function ($, _, Backbone, HeaderTmpl) {

    return Backbone.View.extend({

		el:'#wrapper',

		template:_.template(HeaderTmpl),

        initialize:function(options) {

          _.bindAll(this, 'render');

        },

        render:function(){
			this.$el.append(this.template());
            return this;
        }

    });

});