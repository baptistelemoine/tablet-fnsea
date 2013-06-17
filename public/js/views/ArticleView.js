define([
    'jquery',
    'underscore',
    'backbone'

    ], function ($, _, Backbone) {

    return Backbone.View.extend({

        el:'#article-complete',

        $handler:$('#handler-article'),

        initialize:function(model, options) {
            this.template = _.template(options.itemRenderer);
            _.bindAll(this, 'render');
            this.open();
        },

        render:function(){

			this.$el.show().empty().append(this.template(this.model.toJSON())).scrollTop(0);
			return this;
        },

        close:function(){
            if(this.$handler.is(':checked')) this.$handler.trigger('click');
        },

        open:function(){
            var self = this;
            if(!this.$handler.is(':checked')) this.$handler.trigger('click');
        }

    });

});