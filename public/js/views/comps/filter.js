define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/filterBox.html'

], function ($, _, Backbone, FilterTmpl) {

    return Backbone.View.extend({

		template:_.template(FilterTmpl),

        list:[],

        events:{
            'click input[type=checkbox]':'onCheck'
        },

        initialize:function(options) {

          _.bindAll(this, 'render', 'onCheck');

          this.list = options.list;
          this.render();
        },

        render:function(){
            var $header = $('div.header');
			$header.after(this.$el.append(this.template()));
            //enable button on header bar
            $('label[for="handler-filter"]').show();
            return this;
        },

        onCheck:function(e){
            console.log(e.currentTarget.value);
            this.collection.setFieldFilter([{field:'item_type', type:'equalTo', value:'article'}]);
        }

    });

});