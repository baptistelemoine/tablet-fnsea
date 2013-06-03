define([
  'jquery',
  'underscore',
  'backbone',
  'views/comps/menu',
  'views/comps/header',
  'router',
  'collections/articles',
  'views/ListView'

], function ($, _, Backbone, Menu, Header, Router, Articles, ListView){

	return Backbone.View.extend({

		apiURL : 'http://apifnsea.herokuapp.com/',
		// apiURL : 'http://localhost:4000/',

		initialize:function(){

			_.bindAll(this, 'layout', 'getAllThema');

			//generic layout
			this.layout();

			this.appRouter = new Router();
			this.appRouter.on('route:getAllThema', this.getAllThema);
			Backbone.history.start({pushState:false});

		},

		layout:function(){
			var menu = new Menu();
			menu.render();

			var header = new Header();
			header.render();
		},

		getAllThema:function(hash){
			var currentURL = this.apiURL.concat(Backbone.history.fragment);
			var listView = new ListView({
				collection:new Articles({
					url:currentURL
				}),
				filterEnabled:true,
				filterList:[{text:'Actu', color:'orange'}, {text:'Emploi', color:'blue'}, {text:'Presse', color:'purple'}, {text:'Médias', color:'pink'}]
			});
			listView.collection.pager({
				reset:true,
				error:function(err){
					console.error(err);
				}
			});
		}

	});

});