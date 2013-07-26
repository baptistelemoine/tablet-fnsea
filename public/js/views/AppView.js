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
  'models/video',
  'models/album',
  'collections/tweets',
  'views/comps/ticker',
  'collections/photos',
  'views/swipeView',
  'views/comps/search',
  'collections/search',
  'models/search'

], function ($, _, Backbone, ConfigManager, Menu, Header, Router, Articles, ListView, Videos, MixCollection, Albums, Mixed, ArticleView, ArticleModel, VideoModel, AlbumModel, Tweets, Ticker, Photos, SwipeView, Search, SearchCollection, SearchModel){

	return Backbone.View.extend({

		apiURL : 'http://apifnsea.herokuapp.com/',

		currentListUrl:'',

		initialize:function(){

			_.bindAll(this, 'layout', 'getArticleList', 'getHome', 'getArticle', 'getMedias', 'getPhotos', 'getSearch');

			//generic layout
			this.layout();

			this.appRouter = new Router();
			this.appRouter.on('route:getArticleList', this.getArticleList);
			this.appRouter.on('route:root', this.getHome);
			this.appRouter.on('route:getMedias', this.getMedias);
			this.appRouter.on('route:getArticle', this.getArticle);
			this.appRouter.on('route:getPhotos', this.getPhotos);
			this.appRouter.on('route:getSearch', this.getSearch);
			Backbone.history.start({pushState:false});

		},

		layout:function(){
			var menu = new Menu();
			menu.render();

			this.header = new Header({
				model:new Backbone.Model({ title: "accueil" })
			});
			this.header.render();

			$('#article-complete').show();

			var search = new Search();
			search.render();

			//if article open && nowhere clicked on stage :
			//navigate to current list opened
			var self = this;
			$('#content').on('click', function (e) {
				var target = _.first($(e.target)).id;
				if((target === 'content'|| target === 'columns') && self.articleView){
					if(self.articleView.isOpen())
						self.appRouter.navigate(self.currentListUrl.replace(self.apiURL, ''), {trigger:true, replace:true});
				}
			});

			//configure tab bar tweets ticker
			var tweets = new Tweets();
			var ticker = new Ticker({collection:tweets});
			tweets.fetch({reset:true});
		},

		launchRequest:function(){

			var currentURL = this.apiURL.concat(Backbone.history.fragment);

			if(this.articleView) this.articleView.close();
			// if(this.swipeView) this.swipeView.dispose();

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
			var type = 'articles';
			if(hash === 'videos') {
				item = new VideoModel([], {
					url:self.apiURL.concat('search/search')
				});
				type = 'videos';
			}
			else if(hash === 'albums'){
				if(this.swipeView) this.swipeView.dispose();
				item = new AlbumModel([], {
					url:self.apiURL.concat('search/search')
				});
				type = 'photos';
			}
			else {
				item = new ArticleModel([],{
					url:self.apiURL.concat('api/', Backbone.history.fragment)
				});
			}
			var query = 'id:' + path;

			this.articleView = new ArticleView({model:item});
			item.fetch({
				data:{
					types:type,
					q:query
				},
				success:function(data){
					self.articleView.render();
				}
			});
		},

		getArticleList:function(){

			if(!this.launchRequest()) return;

			this.header.model.set({title:'actualités'});

			var currentURL = this.apiURL.concat('api/', Backbone.history.fragment);

			var listView = new ListView({
				collection:new SearchCollection({
					url:currentURL,
					model:ArticleModel,
					data:{
						'sort':'pubdate:desc'
					}
				})
			});
			listView.collection.pager({
				reset:true,
				error:function(err){
					console.error(err);
				}
			});
			this.currentView = listView;
		},

		getSearch:function(query){

			if(!this.launchRequest()) return;

			this.header.model.set({title:'recherche'});

			var currentURL = this.apiURL.concat('search/', Backbone.history.fragment);

			var coll = new SearchCollection();
			var listView = new ListView({collection:coll});
			listView.collection.pager({
				reset:true,
				data:{ 'q':query },
				success:function(data){
					console.log(coll.totalRecords);
				}
			});
			this.currentView = listView;

		},

		getHome:function(hash){

			if(!this.launchRequest()) return;

			this.header.model.set({title:'accueil'});

			var self = this;

			var listView = new ListView({collection:new SearchCollection({
				url:self.apiURL.concat('search/search'),
				model:SearchModel,
				data:{
					'sort':'pubdate:desc'
				}

			})});
			listView.collection.fetch({reset:true,});
			this.currentView = listView;
		},

		getMedias:function(type){

			if(!this.launchRequest()) return;

			var self = this;

			var listView;

			var options = {
				url:self.apiURL.concat('search/search'),
				data:{
					'sort':'pubdate:desc'
				}
			};

			switch(type){
				case 'albums' :
					options.model = AlbumModel;
					options.data.types = 'photos';
					listView = new ListView({collection:new SearchCollection(options)});
					this.header.model.set({title:'photos'});
				break;
				case 'videos' :
					options.model = VideoModel;
					options.data.types = 'videos';
					listView = new ListView({collection:new SearchCollection(options)});
					this.header.model.set({title:'vidéos'});
				break;
			}

			listView.collection.pager({
				reset:true,
				error:function(err){
					console.error('oups', err);
				}
			});
			this.currentView = listView;
		},

		getPhotos:function(id){

			var album = new AlbumModel();
			album.set({id:id});

			var photos = new Photos([], {album:album});
			photos.fetch({
				reset:true,
				data:{
					limit:100
				}
			});

			this.swipeView = new SwipeView({collection:photos});
		}

	});

});