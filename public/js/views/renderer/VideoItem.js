define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/videoItem.html',
    'utils/ConfigManager'

    ], function ($, _, Backbone, VideoTmpl, ConfigManager) {

    return Backbone.View.extend({

		tagName:'div',

		className:'content-box video-box',

		template:_.template(VideoTmpl),

        events:{
            'click':'onClick'
        },

        initialize:function(options) {
          _.bindAll(this, 'render');
        },

        render:function(){
            this.$el.append(this.template(this.model.toJSON()));
			return this;
        },

        onClick:function(e){

            var self = this;
            this.$el.addClass('active').on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function (e){
                self.$el.removeClass('active');
                Backbone.history.navigate('#/medias/videos/'.concat(self.model.get('id')), {trigger:true, replace:false});
            });
        }
    });

});