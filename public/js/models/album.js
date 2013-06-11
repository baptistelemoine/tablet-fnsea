define([
    'backbone',
    'collections/photos'

    ], function (Backbone, Photos) {

    return Backbone.Model.extend({

		defaults:{
			'description' : 'no desc'
		},

		initialize:function(){
			this.attributes.photos = new Photos([], {album:this});
		}
    });

});