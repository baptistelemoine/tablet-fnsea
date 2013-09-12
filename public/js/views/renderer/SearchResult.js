define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/searchResult.html'

    ], function ($, _, Backbone, searchResultTmpl) {

    return Backbone.View.extend({

		tagName:'div',

		className:'content-box search-result',

        events:{
            'click :not(.button)':'onClick'
        },

        template:_.template(searchResultTmpl),

        initialize:function(model, options) {

            _.bindAll(this, 'render', 'onClick');
        },

        render:function(){
			// this.model.set({'count':34, silent:true});
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