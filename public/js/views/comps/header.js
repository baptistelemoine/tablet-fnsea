define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/header.html'

], function ($, _, Backbone, HeaderTmpl) {

    return Backbone.View.extend({

		el:'#wrapper',

		template:_.template(HeaderTmpl),

        initialize:function(options) {

          _.bindAll(this, 'render');

          //update title header
          var self = this;
          this.model.on('change:title', function(){
            $('div.header p.title').text(self.model.get('title'));
          });

        },

        render:function(){
          this.$el.append(this.template(this.model.toJSON()));
          return this;
        }

    });

});