define([
    'jquery',
    'underscore',
    'backbone',
    'views/renderer/ArticleItem',
    'text!templates/articleItem.html',
    'text!templates/jobItem.html',
    'text!templates/eventItem.html',
    'text!templates/presseItem.html',
    'views/renderer/VideoItem',
    'views/renderer/AlbumItem',
    'enquire',
    'views/comps/filter'

    ], function ($, _, Backbone, ArticleItem, ArticleTmpl, JobTmpl, EventTmpl, PresseTmpl, VideoItem, AlbumItem, enquire, Filter) {

    return Backbone.View.extend({

        el: '#content',
        $container: $('#columns'),
        events:{
            'scroll' : 'checkScroll'
        },
        $preloader: $('div.spinner-container'),
        isLoading: false,

        filterEnabled:false,

        initialize:function(options) {

            _.bindAll(this, 'render', 'addAll', 'checkScroll');

            this.cache = [];

            this.collection.on('reset', this.addAll);
            this.filterEnabled = options.filterEnabled;

            var self = this;
            var filter = new Filter({
                collection:this.collection,
                list:options.filterList
            });
            if(this.filterEnabled){
                filter.render();
                filter.on('filter', function (e){ self.cache = []; });
            }
        },

        render:function(item){

            var article = null;

            switch(item.get('item_type')){
                case 'article' : {
                    if(item.has('themaUrl'))
                        article = new ArticleItem({model:item}, {itemRenderer:ArticleTmpl});
                    if(item.has('contract'))
                        article = new ArticleItem({model:item}, {itemRenderer:JobTmpl});
                    if(item.has('pressType'))
                        article = new ArticleItem({model:item}, {itemRenderer:PresseTmpl});
                    if(item.has('beginning'))
                        article = new ArticleItem({model:item}, {itemRenderer:EventTmpl});
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

        //important note ! Use detach instead of empty
        //to prevent item rendering events lost

        layoutColumns:function(){
            var self = this;

            if(this.cache.length % this.collection.length === 0){
                var sorted = _.sortBy(this.cache, function (value){
                    return _.indexOf(self.cache, value) % 2;
                });
                this.$container.children().detach();
                this.$container.append(sorted);
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
                    self.$container.children().detach();
                    self.$container.append(self.cache);
                },
                unmatch:function(){
                    self.layoutColumns();
                }
            });
        },

        checkScroll:function(e){
            if(this.el.scrollTop === 0) return;
            var triggerPoint = 5;
            var self = this;
            //infinite scrolling
            if(!this.isLoading && this.el.scrollTop + this.el.clientHeight + triggerPoint > this.el.scrollHeight){
                // this.$preloader.show();
                this.isLoading = true;
                // console.log('request next page')
                this.collection.requestNextPage({
                    success:function(data){
                        self.addAll();
                        // self.$preloader.hide();
                    }
                });
            }
        },

        dispose:function(){

            this.$container.empty();
            this.undelegateEvents();
            // console.log($._data($('#content')[0], "events"));
            this.collection.off('reset');
            this.collection = null;

        }

    });
});
