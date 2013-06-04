define([
	'jquery',
	'underscore',
	'backbone',
	'paginator',
	'models/video',
	'utils/ConfigManager'

], function ($, _, Backbone, Paginator, video, ConfigManager){

	return Backbone.Paginator.requestPager.extend({

		model:video,

		paginator_core: {
			type: 'GET',
			dataType: 'jsonp',
			url:ConfigManager.GDATA_URL
		},
		
		paginator_ui: {
			firstPage: 0,
			currentPage: 1,
			totalPages: 100,
			orderby:'published',
			nb_results:5,
			author:'lafnsea',
			totalRecords:2000
		},
		
		server_api: {
			'orderby': function() { return  this.orderby; },
			'author' : function () { return this.author; },
			'max-results' : function () { return this.nb_results; },
			'start-index': function() { return this.currentPage * this.nb_results; }
		},

		parse:function(response){
			return response.data.items;
		}

	});


});