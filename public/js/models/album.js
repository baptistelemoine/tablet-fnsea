define([
	'underscore',
    'backbone',
    'utils/ConfigManager'

    ], function (_, Backbone, ConfigManager) {

    return Backbone.Model.extend({

		defaults:{
			'item_type':'album',
			'description':''
		},

		parse:function(response, options){

			var item = {};
			if(response.result) item = _.first(response.result.hits.hits)._source;
			else item = response._source;

			if(_.isArray(item)) item = _.first(item);

			if(item.created_time){
				item.time = moment(item.uploaded).fromNow();
			}
			return item;
		}
    });

});