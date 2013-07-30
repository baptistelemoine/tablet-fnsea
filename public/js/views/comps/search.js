define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/searchBox.html'

    ], function ($, _, Backbone, SearchTmpl) {

    return Backbone.View.extend({

		el:'#search',

        events:{
            'click .button' : 'onClick'
        },

		template:_.template(SearchTmpl),

        $handler:$('#handler-search'),

        render:function(){
			this.$el.append(this.template());
        },

        close:function(){
            if(this.$handler.is(':checked')) this.$handler.prop('checked', false);
        },

        onClick:function(e){
            var input = $('#search-text').val();
            if(input !== '')
                Backbone.history.navigate('search/'.concat(input), {trigger:true, replace:false});
        }

    });

});