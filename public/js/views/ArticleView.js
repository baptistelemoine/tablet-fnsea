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
            this.open(500);
        },

        render:function(){

			this.$el.show().empty().append(this.template(this.model.toJSON())).scrollTop(0);
			return this;
        },

        close:function(){
            if(this.$handler.is(':checked')) this.$handler.trigger('click');
        },

        open:function(delay){
            var self = this;
            if(!this.$handler.is(':checked')) setTimeout(function() { self.$handler.trigger('click'); }, delay);
        }

    });

});