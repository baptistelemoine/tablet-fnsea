define([
    'jquery',
    'underscore',
    'backbone',
    'views/renderer/ArticleItem',
    'views/renderer/VideoItem',
    'views/renderer/JobItem',
    'views/renderer/PresseItem',
    'views/renderer/EventItem',
    'views/renderer/AlbumItem',
    'enquire',
    'views/comps/filter'

    ], function ($, _, Backbone, ArticleItem, VideoItem, JobItem, PresseItem, EventItem, AlbumItem, enquire, Filter) {

    return Backbone.View.extend({

        el: '#content',
        $container: $('#columns', this.el),
        events:{
            'scroll' : 'checkScroll'
        },
        $preloader: $('div.spinner-container'),
        isLoading: false,
        cache: [],

        filterEnabled:false,

        initialize:function(options) {

            _.bindAll(this, 'render', 'addAll');
            this.collection.on('reset', this.addAll);

            this.filterEnabled = options.filterEnabled;

            if(this.filterEnabled) new Filter({
                collection:this.collection,
                list:options.filterList
            });
        },

        render:function(item){

            var article = null;

            switch(item.get('item_type')){
                case 'article' : {
                    if(item.has('themaUrl'))
                        article = new ArticleItem({model:item});
                    if(item.has('contract'))
                        article = new JobItem({model:item});
                    if(item.has('pressType'))
                        article = new PresseItem({model:item});
                    if(item.has('beginning'))
                        article = new EventItem({model:item});
                }
                break;
                case 'video' : {
                    article = new VideoItem({model:item});
                }
                break;
                case 'album' : {
                    article = new AlbumItem({model:item});
                }
                break;

            }

            this.$container.append(article.render().el);
            this.cache.push(article.el);

        },

        layoutColumns:function(){
            var self = this;

            if(this.cache.length % this.collection.length === 0){
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
