'use strict';

angular.module('ClientApp')
  .factory('TokenService', ['$q', function($q) {
      return {
        request: function(config) {
          var token = window.localStorage.getItem('token');
          if (token) config.headers.Authorization = 'Bearer ' + token;
          return config;
        },
      };
    }
  ]);
