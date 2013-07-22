define([
    'jquery',
    'underscore',
    'backbone',
    'paginator',
    'models/video'

], function ($, _, Backbone, Paginator, video){

    return Backbone.Paginator.requestPager.extend({

        model:video,

        initialize:function(param){
            this.pUrl = param.url;
            this.sortParam = param.sort;
            this.paginator_ui.perPage = param.nb_results || this.paginator_ui.perPage;
        },

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
            'from': function() { return this.currentPage * this.perPage;},
            'size': function() { return this.perPage; },
            'type':'videos',
            'sort':function () { return this.sortParam}
        },

        parse:function(response){
            return response.result.hits.hits;
        }
    });

});