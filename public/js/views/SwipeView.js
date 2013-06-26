define([
    'jquery',
    'underscore',
    'backbone',
    'swipeview'

    ], function ($, _, Backbone, SwipeView) {

    return Backbone.View.extend({

        initialize:function(options) {

          _.bindAll(this, 'render');

        },

        render:function(){

        }

    });

});