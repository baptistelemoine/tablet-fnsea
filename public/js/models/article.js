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
			//add some properties
			if(response.themaUrl){
				var thema = ConfigManager.getThemaProp(_.last(response.themaUrl.split('/')));
				response.thema = thema.name;
			}
			if(response.entry.publishedDate){
				response.time = moment(response.entry.publishedDate).fromNow();
			}
			return response;
		}
    });

});