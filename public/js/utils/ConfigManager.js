define(function(){

	return {

		getThemaProp:function(themaURL){

			switch(themaURL){
				case 'agriculture-et-territoires' : return {
					name : 'Agriculture et territoires',
					id:1221
				};
				case 'agriculture-durable' : return {
					name: 'Agriculture durable',
					id:1222
				};
				case 'l-agriculteur-et-son-entreprise' : return {
					name : "L'agriculteur et son entreprise",
					id:1223
				};
				case 'l-agriculture-acteur-economique' : return {
					name : "L'agriculteur, acteur économique",
					id:1224
				};
				case 'europe-et-international' : return {
					name : 'Europe et international',
					id:1225
				};
				case 'agriculture-et-modes-de-vie' : return {
					name : 'Agriculture et modes de vie',
					id:1226
				};
			}
			return '';
		},

		gdataSingleVideoUrl:function(id){
			return 'http://gdata.youtube.com/feeds/api/videos/'+id+'?alt=jsonc&v=2';
		},

		FACEBOOK_USER:'lafnsea',
		GRAPH_URL:'https://graph.facebook.com/',
		GDATA_URL:'http://gdata.youtube.com/feeds/api/videos?alt=jsonc&v=2',
		FB_SHARE_URL:'http://www.facebook.com/share.php?u=',
		TW_SHARE_URL:'https://twitter.com/share?url=',
		GOOG_SHARE_URL:'https://plus.google.com/share?url=',
		SITE_URL:'http://www.fnsea.fr',
		API_URL:'http://apifnsea.herokuapp.com/',
		TWITTER_USER:'fnsea'


	};

});