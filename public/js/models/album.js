define([
    'backbone',
    'collections/photos'

    ], function (Backbone, Photos) {

    return Backbone.Model.extend({

		defaults:{
			'description' : 'no desc',
			'item_type':'album'
		},

		initialize:function(){
			this.set('photos', new Photos([], {album:this}));
		}
    });

});