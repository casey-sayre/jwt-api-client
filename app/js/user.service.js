'use strict';

angular.module('ClientApp')
  .factory('UserService', [
    '$log', '$window', '$q', '$http', 'API_CONFIG',
    function($log, $window, $q, $http, API_CONFIG) {
      var currUserData = {
        username: 'public'
      };
      return {
        getCurrUser: function() {
          return currUserData;
        },
        login: function(username, password) {
          return $http({
            method: 'POST',
            url: API_CONFIG.url + '/api/auth/login',
            data: {
              username: username,
              password: password
            }
          }).then(function(response) {
            $log.info('success');
            $window.localStorage.setItem('username', response.data.username);
            $window.localStorage.setItem('token', response.data.token);
            currUserData.username = response.data.username;
            return currUserData;
          }, function(response) {
            $log.info('failure');
            return $q.reject(angular.extend(response.data, {status: response.status}));
          });
        },
      };
    }
  ]);
