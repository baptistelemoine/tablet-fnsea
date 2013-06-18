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
  'collections/Mixed',
  'views/ArticleView',
  'models/article',
  'text!templates/articleComplete.html'

], function ($, _, Backbone, Menu, Header, Router, Articles, ListView, Videos, MixCollection, Albums, Mixed, ArticleView, ArticleModel, ArticleTmpl){

	return Backbone.View.extend({

		apiURL : 'http://apifnsea.herokuapp.com/',
		// apiURL : 'http://localhost:4000/',

		initialize:function(){

			_.bindAll(this, 'layout', 'getArticleList', 'getHome', 'getArticle');

			//generic layout
			this.layout();

			this.appRouter = new Router();
			this.appRouter.on('route:getArticleList', this.getArticleList);
			this.appRouter.on('route:root', this.getHome);
			this.appRouter.on('route:getAlbums', this.getAlbums);
			this.appRouter.on('route:getArticle', this.getArticle);
			Backbone.history.start({pushState:false});

		},

		layout:function(){
			var menu = new Menu();
			menu.render();

			var header = new Header();
			header.render();
		},

		getArticle:function(){

			var self = this;
			var article = new ArticleModel([],{
				url:self.apiURL.concat(Backbone.history.fragment)
			});
			this.articleView = new ArticleView({model:article}, {itemRenderer:ArticleTmpl});
			article.fetch({
				success:function(data){
					self.articleView.render();
				}
			});
		},

		getArticleList:function(){

			var currentURL = this.apiURL.concat(Backbone.history.fragment);

			if(this.articleView) this.articleView.close();

			if(this.currentView) {
				if(this.currentView.collection.pUrl === currentURL) return;
				this.currentView.dispose();
				this.currentView = null;
			}

			var listView = new ListView({
				collection:new Articles({
					url:currentURL,
					nb_results:6
				})
			});
			listView.collection.pager({
				reset:true,
				error:function(err){
					console.error(err);
				}
			});
			this.currentView = listView;
			// console.log(this.listView.collection.info())
		},

		getHome:function(hash){
			
			var currentURL = this.apiURL.concat(Backbone.history.fragment);
			
			if(this.articleView) this.articleView.close();
			
			if(this.currentView) {
				if(currentURL === this.apiURL) return;
				this.currentView.dispose();
				this.currentView = null;
			}

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

		getAlbums:function(){

			var listView = new ListView({
				collection:new Albums({nb_results:5})
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