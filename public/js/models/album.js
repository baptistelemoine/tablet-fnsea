define([
    'backbone',
    'collections/photos'

    ], function (Backbone, Photos) {

    return Backbone.Model.extend({

		defaults:{
			'description' : '',
			'item_type':'album',
			'likes':{ data:[] }
		},

		initialize:function(){
			this.set('photos', new Photos([], {album:this}));
		},

		parse:function(response, options){
			if(response.created_time){
				response.time = moment(response.created_time).fromNow();
			}
			return response;
		}
    });

});