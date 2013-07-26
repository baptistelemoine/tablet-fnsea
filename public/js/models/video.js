define([
    'backbone',
    'underscore',
    'models/item',
    'utils/ConfigManager'

    ], function (Backbone, _, Item, ConfigManager) {

    return Item.extend({

		defaults:function(){
			return _.extend({}, this.attributes, {'item_type':'video', 'viewCount':0});
		},

		parse: function(response, options) {

			var result = Item.prototype.parse.call(this, response, options);

			if(result.duration){

				var duration = result.duration;
				var minute = moment.duration(duration, 'seconds').minutes();
				var second = moment.duration(duration, 'seconds').seconds();
				second = second < 10 ? '0'+second : second;
				result.duration_formated = minute + ':' + second;
			}

			if(result.uploaded){
				result.time = moment(result.uploaded).fromNow();
			}

			return result;
		}
	});

});