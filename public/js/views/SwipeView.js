define([
    'jquery',
    'underscore',
    'backbone',
    'swipeview'

    ], function ($, _, Backbone, SwipeView) {

    return Backbone.View.extend({

        el:'#wrapper',

        initialize:function(options) {

          _.bindAll(this, 'render');
          this.collection.on('reset', this.render);

        },

        render:function(){

            //hide all under wrapper
            $('div', this.$el).hide();
            //init slider
            this.slider = new SwipeView(this.el, { numberOfPages: this.collection.length });

            for (var i = 0; i < 3; i++) {
                page = i===0 ? this.collection.length-1 : i-1;
                $(this.slider.masterPages[i]).append('<img src="'+this.collection.at(page).get('source')+'">');
            }

            var self = this;
            this.slider.onFlip(function(){
                console.log('flip')
                for (var i = 0; i < 3; i++) {
                    var upcoming = self.slider.masterPages[i].dataset.upcomingPageIndex;
                    if(upcoming !== self.slider.masterPages[i].pageIndex){
                        $('img', self.slider.masterPages[i]).attr('src', self.collection.at(upcoming).get('source'));
                    }
                }
            });

        }

    });

});