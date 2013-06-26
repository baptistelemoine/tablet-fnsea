define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/socialTicker.html'

    ], function ($, _, Backbone, TickerTmpl) {

    return Backbone.View.extend({

		el:'div.tab-bar',

		template:_.template(TickerTmpl),

        initialize:function(options) {

          _.bindAll(this, 'render');
          this.collection.on('reset', this.render);
        },

        render:function(){
			this.$el.empty().append(this.template());
        }

    });

});