define([
    'jquery',
    'underscore',
    'backbone',
    'views/renderer/ArticleItem',
    'views/renderer/JobItem',
    'enquire',
    'views/comps/filter'

    ], function ($, _, Backbone, ArticleItem, JobItem, enquire, Filter) {

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

            switch(this.type(item)){
                case 'article' : {
                    article = new ArticleItem({
                        model:item
                    });
                }
                break;
                case 'job' : {
                    article = new JobItem({
                        model:item
                    });
                }
                break;
            }

            this.$container.append(article.render().el);
            this.cache.push(article.el);

        },

        type:function(model){

            if (typeof(model.get('themaUrl')) !== 'undefined') return 'article';
            if (typeof(model.get('contract')) !== 'undefined') return 'job';
            if (typeof(model.get('pressType')) !== 'undefined') return 'presse';
            if (typeof(model.get('beginning')) !== 'undefined') return 'evenement';
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
