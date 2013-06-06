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

            var duration = this.model.get('duration');
            var minute = moment.duration(duration, 'seconds').minutes();
            var second = moment.duration(duration, 'seconds').seconds();
            second = second < 10 ? '0'+second : second;
            this.model.set({'duration_formated':minute+':'+second}, {silent:true});            
            this.model.set({'time':moment(this.model.get('uploaded')).fromNow()}, {silent:true});
            this.$el.append(this.template(this.model.toJSON()));

			return this;
        }

    });

});