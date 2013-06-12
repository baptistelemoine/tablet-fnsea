define([
    'backbone'
    ], function (Backbone) {
    return Backbone.Model.extend({
		defaults:{
			'item_type':'article'
		}
    });

});