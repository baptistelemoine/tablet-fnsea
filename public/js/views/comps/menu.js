define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/menu.html'

], function ($, _, Backbone, MenuTmpl) {

    return Backbone.View.extend({

		el:'#menu',

        $handler:$('#handler-menu'),

        events:{
            'click a':'onClick'
        },

		template:_.template(MenuTmpl),

        initialize:function(options) {

          _.bindAll(this, 'render');

        },

        render:function(){
			this.$el.append(this.template());
			return this;
        },

        onClick:function(e){
            if(this.$handler.is(':checked')) this.$handler.trigger('click');
        }

    });

});