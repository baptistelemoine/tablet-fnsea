define([
    'jquery',
    'underscore',
    'backbone',
    'paginator',
    'models/article'

], function ($, _, Backbone, Paginator, article){

    return Backbone.Paginator.requestPager.extend({

        model:article,

        initialize:function(param){
            this.pUrl = param.url;
        },

        /*comparator:function(model){
            return this.indexOf(model) % 2;
        },*/

        paginator_core: {
            type: 'GET',
            dataType: 'json',
            url:function() { return this.pUrl; },
            cache:true
        },

        //TODO : get totalRecords from database
        paginator_ui: {
            firstPage: 0,
            currentPage: 0,
            perPage: 6,
            totalRecords:200,
            totalPages: 0
        },

        server_api: {
            'skip': function() { return this.currentPage * this.perPage;},
            'limit': function() { return this.perPage; }
        }

    });

});