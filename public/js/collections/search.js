define([
    'jquery',
    'underscore',
    'backbone',
    'paginator',
    'models/search',
    'models/article',
    'models/video',
    'models/album'

], function ($, _, Backbone, Paginator, Search, Article, Video, Album){

    return Backbone.Paginator.requestPager.extend({

		model:Search,

        initialize:function(){

        },

        paginator_core: {
            type: 'GET',
            dataType: 'json',
            url:'http://apifnsea.herokuapp.com/search/search',
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
            'size': function() { return this.perPage; }
        },

        parse:function(response){
			this.totalRecords = response.result.hits.total;
			return response.result.hits.hits;
        }

    });

});