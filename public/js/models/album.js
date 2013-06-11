define([
    'backbone',
    'collections/photos'

    ], function (Backbone, Photos) {

    return Backbone.Model.extend({

		initialize:function(){
			this.photos = new Photos([], {album:this});
		}
    });

});