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

		});

	});