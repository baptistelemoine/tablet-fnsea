define([
    'backbone',
    'underscore',
    'models/article',
    'models/video',
    'models/album'

    ], function (Backbone, _, article, video, album) {

    return Backbone.Model.extend({

		initialize:function(attrs, options){
            if(attrs._type === 'articles') this.attributes =  new article(attrs, options).attributes;
            if(attrs._type === 'videos') this.attributes =  new video(attrs, options).attributes;
			if(attrs._type === 'photos') this.attributes =  new album(attrs, options).attributes;
		}
    });

});