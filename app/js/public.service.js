'use strict';

angular.module('ClientApp')
  .factory('PublicService', ['$resource', 'API_CONFIG', function($resource, API_CONFIG) {
      return {
        getVersion: function() {
          var versionResource = $resource(API_CONFIG.url + '/api/public/version');
          return versionResource.get().$promise.then(function(versionData) {
            return versionData.version;
          });
        },
        getApiNews: function() {
          var versionResource = $resource(API_CONFIG.url + '/api/public/news');
          return versionResource.get().$promise.then(function(newsData) {
            return newsData.news;
          });
        },
      };
    }
  ]);
