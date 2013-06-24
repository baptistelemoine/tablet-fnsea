define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/articleComplete.html',
    'text!templates/jobComplete.html',
    'text!templates/presseComplete.html',
    'text!templates/videoComplete.html',
    'text!templates/albumComplete.html'

    ], function ($, _, Backbone, ArticleTmpl, JobTmpl, PresseTmpl, VideoTmpl, AlbumTmpl) {

    return Backbone.View.extend({

        el:'#article-complete',

        $handler:$('#handler-article'),

        initialize:function(model, options) {

            _.bindAll(this, 'render');
            this.open();
        },

        render:function(){

            switch(this.model.get('item_type')){
                case 'article' :
                    this.template = _.template(ArticleTmpl);
                break;
                case 'job' :
                    this.template = _.template(JobTmpl);
                break;
                case 'presse' :
                    this.template = _.template(PresseTmpl);
                break;
                case 'event' :
                    // this.template = _.template(VideoTmpl);
                break;
                case 'video' :
                    this.template = _.template(VideoTmpl);
                break;
                case 'album' :
                    this.template = _.template(AlbumTmpl);
                    // console.log(this.model)
                break;
            }

			this.$el.empty().append(this.template(this.model.toJSON())).scrollTop(0);
			return this;
        },

        close:function(){
            if(this.isOpen()) this.$handler.prop('checked', false);
            this.$el.empty();
        },

        open:function(){
            if(!this.isOpen()) this.$handler.prop('checked', true);
        },

        isOpen:function(){
            return this.$handler.is(':checked');
        }

    });

});