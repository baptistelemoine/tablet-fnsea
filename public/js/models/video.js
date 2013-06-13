define([
	'underscore',
	'backbone'

	], function (_, Backbone) {

		return Backbone.Model.extend({

			defaults:{
				'item_type':'video'
			},

			parse:function(response, options){
				//add some properties
				if(response.duration){
					var duration = response.duration;
					var minute = moment.duration(duration, 'seconds').minutes();
					var second = moment.duration(duration, 'seconds').seconds();
					second = second < 10 ? '0'+second : second;
					response.duration_formated = minute + ':' + second;
				}
				if(response.uploaded){
					response.time = moment(response.uploaded).fromNow();
				}
				return response;
			}
		});
});