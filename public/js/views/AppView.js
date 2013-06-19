define([
  'jquery',
  'underscore',
  'backbone',
  'utils/ConfigManager',
  'views/comps/menu',
  'views/comps/header',
  'router',
  'collections/articles',
  'views/ListView',
  'collections/videos',
  'collections/mix',
  'collections/albums',
  'collections/Mixed',
  'views/ArticleView',
  'models/article',
  'models/video'

], function ($, _, Backbone, ConfigManager, Menu, Header, Router, Articles, ListView, Videos, MixCollection, Albums, Mixed, ArticleView, ArticleModel, VideoModel){

	return Backbone.View.extend({

		apiURL : 'http://apifnsea.herokuapp.com/',

		currentListUrl:'',

		initialize:function(){

			_.bindAll(this, 'layout', 'getArticleList', 'getHome', 'getArticle', 'getMedias');

			//generic layout
			this.layout();

			this.appRouter = new Router();
			this.appRouter.on('route:getArticleList', this.getArticleList);
			this.appRouter.on('route:root', this.getHome);
			this.appRouter.on('route:getMedias', this.getMedias);
			this.appRouter.on('route:getArticle', this.getArticle);
			Backbone.history.start({pushState:false});

		},

		layout:function(){
			var menu = new Menu();
			menu.render();

			var header = new Header();
			header.render();
		},

		launchRequest:function(){

			var currentURL = this.apiURL.concat(Backbone.history.fragment);

			if(this.articleView) this.articleView.close();

			if(this.currentView) {
				if(this.currentListUrl === currentURL) return false;
				this.currentView.dispose();
				this.currentView = null;
			}

			this.currentListUrl = currentURL;

			return true;
		},

		getArticle:function(hash, path){

			var self = this;
			var item;
			if(hash === 'videos') {
				item = new VideoModel([], {
					url:ConfigManager.gdataSingleVideoUrl(path)
				});
			}
			else {
				item = new ArticleModel([],{
					url:self.apiURL.concat(Backbone.history.fragment)
				});
			}
			this.articleView = new ArticleView({model:item});
			item.fetch({
				success:function(data){
					self.articleView.render();
				}
			});
		},

		getArticleList:function(){

			if(!this.launchRequest()) return;

			var currentURL = this.apiURL.concat(Backbone.history.fragment);

			var listView = new ListView({
				collection:new Articles({
					url:currentURL,
					nb_results:6
				}),
				filterEnabled:false
			});
			listView.collection.pager({
				reset:true,
				error:function(err){
					console.error(err);
				}
			});
			this.currentView = listView;
		},

		getHome:function(hash){

			if(!this.launchRequest()) return;

			var self = this;

			var articles = new Articles({
				url:self.apiURL,
				nb_results:50
			});
			var videos = new Videos({nb_results:30});
			var albums = new Albums({nb_results:20});

			$.when(articles.pager(),videos.pager(),albums.pager())
			.fail(function(err){ console.error(err); })
			.done(function (){
				var result = _.union(articles.models, videos.models, albums.models);
				var mixed = new Mixed(result, {perPage:6});
				var listView = new ListView({
					collection:mixed,
					filterEnabled:true,
					filterList:[
						{text:'Actualités', color:'orange', value:'article'},
						{text:'Photos', color:'pink', value:'album'},
						{text:'Vidéos', color:'blue', value:'video'}
					]
				});
				mixed.fetch();
				mixed.goTo(1);
				self.currentView = listView;
			});
		},

		getMedias:function(type){

			if(!this.launchRequest()) return;

			var listView;
			switch(type){
				case 'albums' :
					listView = new ListView({collection:new Albums({nb_results:5})});
				break;
				case 'videos' :
					listView = new ListView({collection:new Videos({nb_results:5})});
				break;
			}

			listView.collection.pager({
				reset:true,
				error:function(err){
					console.error(err);
				}
			});
			this.currentView = listView;
		}

	});

});