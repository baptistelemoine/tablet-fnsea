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

			if(_.isArray(response)) response = _.first(response);
			//add some properties
			if(response.themaUrl){
				var thema = ConfigManager.getThemaProp(_.last(response.themaUrl.split('/')));
				response.thema = thema.name;
			}
			if(response.entry.publishedDate){
				response.time = moment(response.entry.publishedDate).fromNow();
			}
			if(response.contract) response.item_type = 'job';
			if(response.pressType) response.item_type = 'presse';
			if(response.beginning) response.item_type = 'event';
			return response;
		}
    });

});