define([
    'jquery',
    'underscore',
    'backbone',
    'views/renderer/ArticleItem'

    ], function ($, _, Backbone, ArticleItem) {

    return Backbone.View.extend({

        el:'#content',

        events:{
            'scroll' : 'checkScroll'
        },

        preloader:$('div.spinner-container'),

        isLoading:false,

        initialize:function(options) {

          _.bindAll(this, 'render', 'addAll');
          this.collection.on('reset', this.addAll);

        },

        render:function(item){
			var article = new ArticleItem({
				model:item
			});
            $('#columns', this.el).append(article.render().el);
        },

        addAll:function(){

            var sortedCollection = this.collection.sortBy(_.keys(this.collection.models), function (val){
                return val % 3;
                // console.log(val)
            });
            console.log(sortedCollection);

            // this.collection.each(this.render);
            this.isLoading = false;
        },

        checkScroll:function(e){
            var triggerPoint = 5;
            var self = this;
            //infinite scrolling
            if(!this.isLoading && this.el.scrollTop + this.el.clientHeight + triggerPoint > this.el.scrollHeight){
                this.preloader.show();
                this.isLoading = true;
                this.collection.requestNextPage({
                    success:function(data){
                        self.addAll();
                        self.preloader.hide();
                    }
                });
            }
        }

    });

});