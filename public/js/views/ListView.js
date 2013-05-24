define([
    'jquery',
    'underscore',
    'backbone',
    'views/renderer/ArticleItem'

    ], function ($, _, Backbone, ArticleItem) {

    return Backbone.View.extend({

        el:'#columns',

        initialize:function(options) {

          _.bindAll(this, 'render', 'addAll');
          this.collection.on('reset', this.addAll);

        },

        render:function(item){
			var article = new ArticleItem({
				model:item
			});
            this.$el.append(article.render().el);
        },

        addAll:function(){
            this.collection.each(this.render);
        }

    });

});