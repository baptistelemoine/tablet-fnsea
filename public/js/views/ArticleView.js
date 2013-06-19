define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/articleComplete.html',
    'text!templates/jobComplete.html',
    'text!templates/presseComplete.html',
    'text!templates/videoComplete.html'

    ], function ($, _, Backbone, ArticleTmpl, JobTmpl, PresseTmpl, VideoTmpl) {

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
                    if(this.model.has('themaUrl')) this.template = _.template(ArticleTmpl);
                    if(this.model.has('contract')) this.template = _.template(JobTmpl);
                    if(this.model.has('pressType')) this.template = _.template(PresseTmpl);
                break;
                case 'video' :
                    this.template = _.template(VideoTmpl);
                break;
            }

			this.$el.show().empty().append(this.template(this.model.toJSON())).scrollTop(0);
			return this;
        },

        close:function(){
            if(this.$handler.is(':checked')) this.$handler.trigger('click');
            this.$el.empty();
        },

        open:function(){
            if(!this.$handler.is(':checked')) this.$handler.trigger('click');
        }

    });

});