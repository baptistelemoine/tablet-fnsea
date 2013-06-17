define([
    'jquery',
    'underscore',
    'backbone'

    ], function ($, _, Backbone) {

    return Backbone.View.extend({

		tagName:'div',

		className:'content-box',

        events:{
            'click':'onClick',
            'mouseover':'onHover'
        },

        initialize:function(model, options) {

            this.template = _.template(options.itemRenderer);
            _.bindAll(this, 'render', 'onClick');
        },

        render:function(){

			this.model.set({'count':34, silent:true});
			this.$el.append(this.template(this.model.toJSON()));
			return this;
        },

        onHover:function(e){
            e.preventDefault();
            console.log('hover');
        },

        onClick:function(e){
            e.preventDefault();
            console.log('clic')
            // this.$el.addClass('active');
        }

    });

});