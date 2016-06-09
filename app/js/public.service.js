'use strict';

angular.module('ClientApp')
  .factory('PublicService', ['$resource', function($resource) {
      return {
        getVersion: function() {
          var versionResource = $resource('http://turnabout-1510:5000/api/public/version');
          return versionResource.get().$promise.then(function(versionData) {
            return versionData.version;
          });
        },
        getApiNews: function() {
          var versionResource = $resource('http://turnabout-1510:5000/api/public/news');
          return versionResource.get().$promise.then(function(newsData) {
            return newsData.news;
          });
        },
      };
    }
  ]);
