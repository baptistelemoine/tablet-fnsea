define([
    'jquery',
    'underscore',
    'backbone',
    'swipeview',
    'text!templates/imgSlider.html'

    ], function ($, _, Backbone, SwipeView, imgTmpl) {

    return Backbone.View.extend({

        el:'#wrapper',

        $preloader:$('div.swipeview-preloader'),

        template:_.template(imgTmpl),

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
                /*var content = this.template(this.collection.at(page).toJSON());
                $(this.slider.masterPages[i]).append(content);
                $('img', this.slider.masterPages[i]).load(function (e) {
                    $(e.target).prev().hide();
                });*/
                el = document.createElement('img');
                    el.className = 'loading';
                    el.src = this.collection.at(page).get('source');
                    el.onload = function () { this.className = ''; }
                    this.slider.masterPages[i].appendChild(el);
            }

            //on flip, load upcoming images
            var self = this;
            this.slider.onFlip(function(){
                for (var i = 0; i < 3; i++) {
                    var upcoming = self.slider.masterPages[i].dataset.upcomingPageIndex;
                    if(upcoming !== self.slider.masterPages[i].dataset.pageIndex){

                        el = self.slider.masterPages[i].querySelector('img');
                        el.className = 'loading';
                        el.src = self.collection.at(upcoming).get('source');
                                                        }
                }
            });
        },

        updateImage:function(index){

        },

        dispose:function(){
            this.$el.children().not($('div.filter-menu')).show();
            this.$preloader.hide();
            if(this.slider) {
                $(this.slider.slider).remove();
                this.slider.destroy();
                this.slider = null;
            }
        }

    });

});