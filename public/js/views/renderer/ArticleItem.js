define([
    'jquery',
    'underscore',
    'backbone'

    ], function ($, _, Backbone) {

    return Backbone.View.extend({

		tagName:'div',

		className:'content-box',

        initialize:function(model, options) {

            this.itemRenderer = options.itemRenderer;
            this.template = _.template(this.itemRenderer);

            _.bindAll(this, 'render');
        },

        render:function(){

			this.model.set({'count':34, silent:true});
			this.$el.append(this.template(this.model.toJSON()));

			return this;
        }

    });

});