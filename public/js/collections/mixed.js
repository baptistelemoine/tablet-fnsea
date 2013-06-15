define([
    'jquery',
    'underscore',
    'backbone',
    'paginator'

], function ($, _, Backbone, Paginator){

    return Backbone.Paginator.clientPager.extend({

        initialize:function(models, options){
			this.paginator_ui.perPage = options.perPage;
        },

        comparator:function(model){
            //convert facebook datetime to utc, weird, only with safari
            switch(model.get('item_type')){
                case 'article' : return - new Date(model.get('entry').publishedDate).getTime();
                case 'album' : return - new Date(moment.utc(model.get('created_time'))).getTime();
                case 'video' : return - new Date(model.get('updated')).getTime();
            }
            return new Date();
        },

        paginator_core:{
			url:'/'
        },

        paginator_ui: {
            firstPage: 1,
            currentPage: 1,
            perPage:6,
            totalPages: 10,
            pagesInRange: 4
        },

        requestNextPage:function(){
			this.nextPage();
        }
    });

});