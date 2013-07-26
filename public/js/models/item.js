define([
    'backbone'

    ], function (Backbone) {

    return Backbone.Model.extend({

		defaults:{
			'item_type':'article'
		},

		parse:function(response, options){

			var item = {};
			if(response.result) item = _.first(response.result.hits.hits)._source;
			else item = response._source;

			if(_.isArray(item)) item = _.first(item);

			return item;
		}
    });

});