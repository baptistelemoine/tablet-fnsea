define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/searchBox.html'

    ], function ($, _, Backbone, SearchTmpl) {

    return Backbone.View.extend({

		el:'#search',

		template:_.template(SearchTmpl),

        initialize:function(options) {
          _.bindAll();
        },

        render:function(){
			this.$el.append(this.template());
        }

    });

});