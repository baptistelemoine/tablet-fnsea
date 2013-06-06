define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/presseItem.html',
    'utils/ConfigManager'

    ], function ($, _, Backbone, PresseTmpl, ConfigManager) {

    return Backbone.View.extend({

		tagName:'div',

		className:'content-box',

		template:_.template(PresseTmpl),

        initialize:function(options) {
          _.bindAll(this, 'render');
          // this.model.on('change', this.render);
        },

        render:function(){

            this.model.set({'count':34, silent:true});
            this.model.set({'time':moment(this.model.get('entry').publishedDate).fromNow()}, {silent:true});

            this.$el.append(this.template(this.model.toJSON()));

			return this;
        }

    });

});