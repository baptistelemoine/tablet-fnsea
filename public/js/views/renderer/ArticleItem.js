define([
    'jquery',
    'underscore',
    'backbone'

    ], function ($, _, Backbone) {

    return Backbone.View.extend({

		tagName:'div',

		className:'content-box',

        events:{
            'click :not(.button)':'onClick'
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

        onClick:function(e){
            // e.preventDefault();
            // Backbone.history.navigate(this.model.get('entry').niceUrl, {trigger:true, replace:false});
            var self = this;
            this.$el.addClass('active').on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function (e){
                self.$el.removeClass('active');
                Backbone.history.navigate(self.model.get('entry').niceUrl, {trigger:true, replace:false});
            });
            /*this.$el.on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function (e){
                self.$el.removeClass('active');
            });*/
        }

    });

});