define([
    'jquery',
    'underscore',
    'backbone',
    'paginator'

], function ($, _, Backbone, Paginator){

    return Backbone.Paginator.clientPager.extend({

        initialize:function(models, options){
			this.perPageParam = options.perPage;
        },

        comparator:function(model){
			return - (new Date(model.get('updated')).getTime() || new Date(model.get('created_time')).getTime() || new Date(model.get('entry').publishedDate).getTime());
        },

        paginator_core:{
			url:'/'
        },

        paginator_ui: {
            firstPage: 1,
            currentPage: 1,
            perPage: function() { return this.perPageParam; },
            totalPages: 10,
            pagesInRange: 4
        },

        requestNextPage:function(){
			this.nextPage();
        }
    });

});