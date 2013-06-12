define([
  'jquery',
  'underscore',
  'backbone',
  'views/comps/menu',
  'views/comps/header',
  'router',
  'collections/articles',
  'views/ListView',
  'collections/videos',
  'collections/mix',
  'collections/albums',
  'collections/Mixed'

], function ($, _, Backbone, Menu, Header, Router, Articles, ListView, Videos, MixCollection, Albums, Mixed){

	return Backbone.View.extend({

		apiURL : 'http://apifnsea.herokuapp.com/',
		// apiURL : 'http://localhost:4000/',

		initialize:function(){

			_.bindAll(this, 'layout', 'getAllThema', 'getHome');

			//generic layout
			this.layout();

			this.appRouter = new Router();
			this.appRouter.on('route:getAllThema', this.getAllThema);
			this.appRouter.on('route:root', this.getHome);
			this.appRouter.on('route:getAlbums', this.getAlbums);
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
				})
			});
			listView.collection.pager({
				reset:true,
				error:function(err){
					console.error(err);
				}
			});
		},

		getHome:function(hash){
			var self = this;

			var articles = new Articles({
				url:self.apiURL
			});
			var videos = new Videos();

			var albums = new Albums();

			var mix = new MixCollection([],{
				collections:[articles, videos, albums]
			});

			/*$.when(articles.pager(), videos.pager(), albums.pager())
			.fail(function(err){ console.error(err); })
			.done(function (){
				var listView = new ListView({
					collection:mix,
					filterEnabled:true,
					filterList:[{text:'Actu', color:'orange'}, {text:'Emploi', color:'blue'}, {text:'Presse', color:'purple'}, {text:'Médias', color:'pink'}]
				});
				var result = _.union(articles.models, videos.models, albums.models);
				mix.reset(result);
			});*/

			$.when(articles.pager({
				paginator_ui:{
					perPage:10
				}
			}), videos.pager({
				paginator_ui:{
					perPage:10
				}
			}), albums.pager({
				paginator_ui:{
					perPage:10
				}
			}))
			.fail(function(err){ console.error(err); })
			.done(function (){
				var result = _.union(articles.models, videos.models, albums.models);
				var mixed = new Mixed(result, {perPage:6});
				var listView = new ListView({
					collection:mixed
				});
				mixed.fetch();
				mixed.goTo(1);
			});
		},

		getAlbums:function(){

			var listView = new ListView({
				collection:new Albums()
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