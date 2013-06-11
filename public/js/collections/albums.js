define([
	'jquery',
	'underscore',
	'backbone',
	'paginator',
	'utils/ConfigManager',
	'models/album',
	'collections/photos'

], function ($, _, Backbone, Paginator, ConfigManager, Album, Photos){

	return Backbone.Paginator.requestPager.extend({

		model:Album,

		initialize:function(){
			this.on('reset', this.onReset, this);
		},

		onReset:function(){
			this.each(function (album){
				album.photos.fetch();
			});
		},

		paginator_core: {
			type: 'GET',
			dataType: 'json',
			url:ConfigManager.GRAPH_URL.concat(ConfigManager.FACEBOOK_USER + '/albums')
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