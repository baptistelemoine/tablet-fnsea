define([
    'jquery',
    'underscore',
    'backbone',
    'views/renderer/ArticleItem',
    'enquire'

    ], function ($, _, Backbone, ArticleItem, enquire) {

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

        },

        layoutColumns:function(){
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

            var self = this;
            enquire.unregister();
            enquire.register('screen and (max-width:800px)', {
                setup:function(){
                    self.layoutColumns();
                },
                match:function(){
                    self.$container.empty().append(self.cache);
                },
                unmatch:function(){
                    self.layoutColumns();
                }
            });
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
                        self.addAll();
                        self.$preloader.hide();
                    }
                });
            }
        }

    });
});
