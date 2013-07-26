define([
    'backbone',
    'underscore',
    'models/item',
    'utils/ConfigManager'

    ], function (Backbone, _, Item, ConfigManager) {

    return Item.extend({

		parse: function(response, options) {

			var result = Item.prototype.parse.call(this, response, options);

			if(result.themaUrl){
				var thema = ConfigManager.getThemaProp(_.last(result.themaUrl.split('/')));
				result.thema = thema.name;
			}
			if(result.entry.publishedDate){
				result.time = moment(result.entry.publishedDate).fromNow();
			}
			if(result.contract) result.item_type = 'job';
			if(result.pressType) result.item_type = 'presse';
			if(result.beginning) result.item_type = 'event';

			return result;
		}
	});

});