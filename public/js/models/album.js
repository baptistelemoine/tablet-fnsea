define([
	'underscore',
    'backbone',
    'models/item'

    ], function (_, Backbone, Item) {

    return Item.extend({

		defaults:function(){
			return _.extend({}, this.attributes, {'item_type':'album', 'description':''});
		},

		parse:function(response, options){

			var result = Item.prototype.parse.call(this, response, options);

			if(result.created_time){
				result.time = moment(result.uploaded).fromNow();
			}
			return result;
		}
    });

});