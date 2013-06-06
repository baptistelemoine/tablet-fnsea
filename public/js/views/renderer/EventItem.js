define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/eventItem.html',
    'utils/ConfigManager'

    ], function ($, _, Backbone, EventTmpl, ConfigManager) {

    return Backbone.View.extend({

		tagName:'div',

		className:'content-box',

		template:_.template(EventTmpl),

        initialize:function(options) {
          _.bindAll(this, 'render');
          // this.model.on('change', this.render);
        },

        render:function(){

            this.model.set({'count':34, silent:true});

            this.$el.append(this.template(this.model.toJSON()));

			return this;
        }

    });

});