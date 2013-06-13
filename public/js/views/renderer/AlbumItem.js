define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/albumItem.html',
    'utils/ConfigManager'

    ], function ($, _, Backbone, AlbumTmpl, ConfigManager) {

    return Backbone.View.extend({

		tagName:'div',

		className:'content-box photo-box',

		template:_.template(AlbumTmpl),

        initialize:function(options) {
          _.bindAll(this, 'render');
          this.model.get('photos').on('reset', this.render);
        },

        render:function(){
            this.$el.empty().append(this.template(this.model.toJSON()));
			return this;
        }

    });

});