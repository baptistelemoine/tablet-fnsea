define([
    'jquery',
    'underscore',
    'backbone',
    'utils/ConfigManager'

    ], function ($, _, Backbone, ConfigManager) {

    return Backbone.Collection.extend({

		url:ConfigManager.API_URL.concat('twitter/timeline/').concat(ConfigManager.TWITTER_USER),

        initialize:function(options) {

        }
    });

});