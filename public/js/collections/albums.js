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

		initialize:function(options){
			this.paginator_ui.nb_results = options.nb_results;
			this.on('reset', this.onReset, this);
			this.on('add', this.onAdd, this);
		},

		onAdd:function(album){
			album.get('photos').fetch({
				reset:true,
				data:{limit:100}
			});
		},

		onReset:function(){
			this.each(function (album){
				album.get('photos').fetch({
					reset:true,
					data:{limit:100}
				});
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
			//is first request ? --> dont take the 3 first albums (timeline + profile pics, cover photos)
			'offset': function() { return (this.currentPage * this.nb_results) === this.nb_results ? 0 : (this.currentPage-1) * this.nb_results;  }
		},

		parse:function(response){
			return _.reject(response.data, function (item) {
				return item.name === 'Cover Photos' || item.name === 'Profile Pictures' || item.name === 'Timeline Photos';
			});
		}

	});


});