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

        initialize:function(options) {
          _.bindAll(this, 'render');
        },

        render:function(){

            this.$el.append(this.template(this.model.toJSON()));
			return this;
        }
    });

});