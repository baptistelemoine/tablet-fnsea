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
            if(this.model.get('entry').image){
                var newURL = this.model.get('entry').image.replace('aspx', 'ashx');
                this.model.set({'imageURL':newURL, silent:true});
            }
			this.$el.append(this.template(this.model.toJSON()));
			return this;
        },

        onClick:function(e){

            var self = this;
            this.$el.addClass('active').on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function (e){
                self.$el.removeClass('active');
                Backbone.history.navigate(self.model.get('entry').niceUrl, {trigger:true, replace:false});
            });
        }

    });

});