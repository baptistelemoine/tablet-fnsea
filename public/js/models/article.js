define([
	'underscore',
    'backbone',
    'utils/ConfigManager'

    ], function (_, Backbone, ConfigManager) {

    return Backbone.Model.extend({

		defaults:{
			'item_type':'article'
		},

		parse:function(response, options){

			console.log(response);

			var item = {};
			if(response.result) item = _.first(response.result.hits.hits)._source;
			else item = response._source;

			if(_.isArray(item)) item = _.first(item);
			//add some properties
			if(item.themaUrl){
				var thema = ConfigManager.getThemaProp(_.last(item.themaUrl.split('/')));
				item.thema = thema.name;
			}
			if(item.entry.publishedDate){
				item.time = moment(item.entry.publishedDate).fromNow();
			}
			if(item.contract) item.item_type = 'job';
			if(item.pressType) item.item_type = 'presse';
			if(item.beginning) item.item_type = 'event';
			return item;
		}
    });

});