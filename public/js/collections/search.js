define([
    'jquery',
    'underscore',
    'backbone',
    'paginator'

], function ($, _, Backbone, Paginator){

    return Backbone.Paginator.requestPager.extend({

        initialize:function(param){

            this.pUrl = param.url;
            this.model = param.model;

            this.types = param.data.types;
            this.sortParam = param.data.sort;

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
            totalRecords:0,
            totalPages: 0
        },

        server_api: {
            'from': function() { return this.currentPage * this.perPage;},
            'size': function() { return this.perPage; },
            'types': function () { return this.types; },
            'sort':function () { return this.sortParam; }
        },

        parse:function(response){
			this.totalRecords = response.result.hits.total;
			return response.result.hits.hits;
        }

    });

});