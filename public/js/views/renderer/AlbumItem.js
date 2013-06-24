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

        events:{
            'click a':'onClick'
        },

        initialize:function(options) {
          _.bindAll(this, 'render');
          this.model.get('photos').on('reset', this.render);
        },

        render:function(){
            this.$el.empty().append(this.template(this.model.toJSON()));
			return this;
        },

        onClick:function(e){
            Backbone.history.navigate('#/medias/albums/'.concat(this.model.get('id')), {trigger:true, replace:true});
            var self = this;
            this.$el.addClass('active').on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function (e){
                self.$el.removeClass('active');
            });
        }

    });

});