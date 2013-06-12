define([
	'jquery',
	'underscore',
	'backbone'

	], function ($, _, Backbone) {

		return Backbone.Collection.extend({

			initialize:function(models, options) {
				_.bindAll(this, 'requestNextPage');
				this.collections = options.collections;
			},

			comparator:function(model){
				return - (new Date(model.get('updated')).getTime() || new Date(model.get('created_time')).getTime() || new Date(model.get('entry').publishedDate).getTime());
			},

			requestNextPage:function(){

				var self = this;
				var dfds = [];
				_.each(self.collections, function (coll) { dfds.push(coll.requestNextPage()); });

				$.when.apply(null, dfds)
				.fail(function(err){ console.error(err); })
				.done(function (){
					var result = _.map(self.collections, function (coll){
						return coll.models;
					});
					self.reset(_.flatten(result));
				});
			}

			/*
				CALL THIS CODE IN APPVIEW
			*/

			/*var mix = new MixCollection([],{
				collections:[articles, videos, albums]
			});

			$.when(articles.pager(), videos.pager(), albums.pager())
			.fail(function(err){ console.error(err); })
			.done(function (){
				var listView = new ListView({
					collection:mix,
					filterEnabled:true,
					filterList:[{text:'Actu', color:'orange'}, {text:'Emploi', color:'blue'}, {text:'Presse', color:'purple'}, {text:'Médias', color:'pink'}]
				});
				var result = _.union(articles.models, videos.models, albums.models);
				mix.reset(result);
			});
*/

		});

	});