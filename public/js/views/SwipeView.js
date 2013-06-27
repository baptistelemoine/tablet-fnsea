define([
    'jquery',
    'underscore',
    'backbone',
    'swipeview'

    ], function ($, _, Backbone, SwipeView) {

    return Backbone.View.extend({

        el:'#wrapper',

        $preloader:$('div.swipeview-preloader'),

        initialize:function(options) {

            _.bindAll(this, 'render');
            this.collection.on('reset', this.render);

            this.$el.children().hide();
            this.$preloader.show();
        },

        render:function(){

            //hide all under wrapper
            this.$el.children().hide();
            //init slider
            this.slider = new SwipeView(this.el, { numberOfPages: this.collection.length });

            //populate slider with 3 first images
            for (var i = 0; i < 3; i++) {
                page = i===0 ? this.collection.length-1 : i-1;
                $(this.slider.masterPages[i]).append('<img src="'+this.collection.at(page).get('source')+'">');
            }

            //on flip, load upcoming images
            var self = this;
            this.slider.onFlip(function(){
                for (var i = 0; i < 3; i++) {
                    var upcoming = self.slider.masterPages[i].dataset.upcomingPageIndex;
                    if(upcoming !== self.slider.masterPages[i].pageIndex){
                        $('img', self.slider.masterPages[i]).attr('src', self.collection.at(upcoming).get('source'));
                    }
                }
            });
        },

        dispose:function(){
            this.$el.children().not($('div.filter-menu')).show();
            this.$preloader.hide();
            if(this.slider) {
                this.slider.slider.remove();
                this.slider.destroy();
                this.slider = null;
            }
        }

    });

});