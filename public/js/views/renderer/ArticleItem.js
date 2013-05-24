define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/articleItem.html',
    'utils/ConfigManager'

    ], function ($, _, Backbone, ArticleTmpl, ConfigManager) {

    return Backbone.View.extend({

		tagName:'div',

		className:'content-box',

		template:_.template(ArticleTmpl),

        initialize:function(options) {
          _.bindAll(this, 'render');
          // this.model.on('change', this.render);
        },

        render:function(){

        	console.log(this.model);

			var thema = ConfigManager.getThemaProp(_.last(this.model.get('themaUrl').split('/')));
			this.model.set({'thema':thema.name}, {silent:true});
			this.model.set({'count':34, silent:true});
			this.model.set({'time':moment(this.model.get('entry').publishedDate).fromNow()}, {silent:true});

			this.$el.append(this.template(this.model.toJSON()));

			return this;
        }

    });

});