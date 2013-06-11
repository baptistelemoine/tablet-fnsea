define([
    'jquery',
    'underscore',
    'backbone',
    'utils/ConfigManager',
    'models/photo'

    ], function ($, _, Backbone, ConfigManager, Photo) {

    return Backbone.Collection.extend({

		model:Photo,

        initialize:function(models, options) {
			this.album = options.album;
        },

        url:function(){
			return ConfigManager.GRAPH_URL + this.album.get('id') + '/photos';
        },

        parse:function(response){
			return response.data;
        }
    });

});