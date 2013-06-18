define([
  'jquery',
  'underscore',
  'backbone'

  ], function($, _, Backbone){

    return Backbone.Router.extend({

        routes:{

          ''                                                                 : 'root',
          'toutes-les-thematiques'                                           : 'getArticleList',
          'toutes-les-thematiques/:thema'                                    : 'getArticleList',
          'toutes-les-thematiques/:thema/:subThema'                          : 'getArticleList',
          'toutes-les-thematiques/:thema/:subThema/*path'                    : 'getArticle',
          'emploi-formation'                                                 : 'getArticleList',
          'emploi-formation/nos-offres-d-emploi'                             : 'getArticleList',
          'emploi-formation/nos-offres-d-emploi/*path'                       : 'getArticle',
          'presse-et-publications/espace-presse'                             : 'getArticleList',
          'presse-et-publications/espace-presse/:subFolder'                  : 'getArticleList',
          'presse-et-publications/espace-presse/:subFolder/*path'            : 'getArticle',
          'les-evenements'                                                   : 'getEvenements',
          'les-evenements/*path'                                             : 'getEvenement',
          'medias/:type'                                                     : 'getMedias',
          ':albumID/photos'                                                  : 'getPhotos',
          'videos'                                                           : 'getVideos',
          'contact'                                                          : 'getContact',
          '*path'                                                            : 'default'
        }
      });
});