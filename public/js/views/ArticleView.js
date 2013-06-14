define([
    'jquery',
    'underscore',
    'backbone'

    ], function ($, _, Backbone) {

    return Backbone.View.extend({

        el:'#article-complete',

        $handler:$('#handler-article'),

        initialize:function(model, options) {

            this.itemRenderer = options.itemRenderer;
            this.template = _.template(this.itemRenderer);

            _.bindAll(this, 'render');

            this.close();
        },

        render:function(){

			this.$el.show().empty().append(this.template(this.model.toJSON())).scrollTop(0);
            this.$handler.trigger('click');
			return this;
        },

        close:function(){
            if(this.$handler.is(':checked')) this.$handler.trigger('click');
        }

    });

});