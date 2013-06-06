define([
	'jquery',
	'underscore',
	'backbone',
	'paginator',
	'utils/ConfigManager'

], function ($, _, Backbone, Paginator, ConfigManager){

	return Backbone.Paginator.requestPager.extend({

		paginator_core: {
			type: 'GET',
			dataType: 'json',
			url:ConfigManager.API_URL.concat('facebook/albums/'+ConfigManager.FACEBOOK_USER)
		},

		paginator_ui: {
			firstPage: 0,
			currentPage: 1,
			totalPages: 100,
			nb_results:6,
			totalRecords:2000
		},

		server_api: {
			'limit' : function () { return this.nb_results; },
			'offset': function() { return this.currentPage * this.nb_results; }
		},

		parse:function(response){
			return response.data;
		}

	});


});