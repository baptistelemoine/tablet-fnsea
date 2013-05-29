define([
    'jquery',
    'underscore',
    'backbone',
    'views/renderer/ArticleItem'

    ], function ($, _, Backbone, ArticleItem) {

    return Backbone.View.extend({

        el: '#content',
        $container: $('#columns', this.el),
        events:{
            'scroll' : 'checkScroll'
        },
        $preloader: $('div.spinner-container'),
        isLoading: false,
        cache: [],

        initialize:function(options) {

          _.bindAll(this, 'render', 'addAll');
          this.collection.on('reset', this.addAll);

        },

        render:function(item){

			var article = new ArticleItem({
				model:item
			});

            this.$container.append(article.render().el);
            this.cache.push(article.el);

            this.layout();

        },

        layout:function(){
            var self = this;
            if(this.cache.length % 6 === 0){
                var sorted = _.sortBy(this.cache, function (value){
                    return _.indexOf(self.cache, value) % 2;
                });
                this.$container.empty().append(sorted);
            }
        },

        addAll:function(){
            this.collection.each(this.render);
            this.isLoading = false;
        },

        checkScroll:function(e){
            var triggerPoint = 5;
            var self = this;
            //infinite scrolling
            if(!this.isLoading && this.el.scrollTop + this.el.clientHeight + triggerPoint > this.el.scrollHeight){
                this.$preloader.show();
                this.isLoading = true;
                this.collection.requestNextPage({
                    success:function(data){
                        // self.addAll();
                        // self.$preloader.hide();
                    }
                });
            }
        }

    });

});