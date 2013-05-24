define([
  'jquery',
  'underscore',
  'backbone'

  ], function($, _, Backbone){

    return Backbone.Router.extend({

        routes:{

          ''                                                                 : 'root',
          'toutes-les-thematiques'                                           : 'getAllThema',
          'toutes-les-thematiques/:thema'                                    : 'getThema',
          'toutes-les-thematiques/:thema/:subThema'                          : 'getSubThema',
          'toutes-les-thematiques/:thema/:subThema/*path'                    : 'getArticle',
          'emploi-formation'                                                 : 'getJobs',
          'emploi-formation/nos-offres-d-emploi'                             : 'getJobs',
          'emploi-formation/nos-offres-d-emploi/*path'                       : 'getJob',
          'presse-et-publications/espace-presse'                             : 'getPresseFolder',
          'presse-et-publications/espace-presse/:subFolder'                  : 'getPresseFolder',
          'presse-et-publications/espace-presse/:subFolder/*path'            : 'getPresseArticle',
          'les-evenements'                                                   : 'getEvenements',
          'les-evenements/*path'                                             : 'getEvenement',
          'albums'                                                           : 'getAlbums',
          ':albumID/photos'                                                  : 'getPhotos',
          'videos'                                                           : 'getVideos',
          'contact'                                                          : 'getContact',
          '*path'                                                            : 'default'
        }
      });
});