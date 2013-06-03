define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/filterBox.html'

], function ($, _, Backbone, FilterTmpl) {

    return Backbone.View.extend({

		el:'div.header',

		template:_.template(FilterTmpl),

        list:[],

        initialize:function(options) {

          _.bindAll(this, 'render');

          this.list = options.list;
          this.render();

        },

        render:function(){

			this.$el.after(this.template());
            //enable button on header bar
            $('label[for="handler-filter"]').show();
            return this;
        }

    });

});