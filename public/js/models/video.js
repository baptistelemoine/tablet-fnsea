define([
	'underscore',
	'backbone'

	], function (_, Backbone) {

		return Backbone.Model.extend({

			defaults:{
				'item_type':'video',
				'viewCount':0
			},

			parse:function(response, options){

				var item = {};
				if(response.result) item = _.first(response.result.hits.hits)._source;
				else item = response._source;

				if(_.isArray(item)) item = _.first(item);

				//add some properties
				if(item.duration){
					var duration = item.duration;
					var minute = moment.duration(duration, 'seconds').minutes();
					var second = moment.duration(duration, 'seconds').seconds();
					second = second < 10 ? '0'+second : second;
					item.duration_formated = minute + ':' + second;
				}
				if(item.uploaded){
					item.time = moment(item.uploaded).fromNow();
				}
				
				return item;
			}
		});
});