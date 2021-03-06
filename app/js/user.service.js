'use strict';

angular.module('ClientApp')
  .factory('UserService', [
    '$log', '$window', '$q', '$http', 'API_CONFIG', '$state',
    function($log, $window, $q, $http, API_CONFIG, $state) {

      var currentUser = null;
      (function() {
        var username = $window.localStorage.getItem('username');
        var token = $window.localStorage.getItem('token');
        if (username && token) currentUser = {
          username: username
        };
      })();

      var getCurrentUser = function() {
        return currentUser;
      };

      var getCurrentPermissions = function() {
        return $http({
          method: 'GET',
          url: API_CONFIG.url + '/api/public/permissions',
        }).then(function(response) {
          return response.data.permissions;
        });
      };

      var logout = function() {
        $window.localStorage.removeItem('username');
        $window.localStorage.removeItem('token');
        currentUser = null;
      };

      var login = function(username, password) {
        return $http({
          method: 'POST',
          url: API_CONFIG.url + '/api/auth/login',
          data: {
            username: username,
            password: password
          }
        }).then(function(response) {
          $window.localStorage.setItem('username', response.data.username);
          $window.localStorage.setItem('token', response.data.token);
          currentUser = {
            username: response.data.username
          };
          return currentUser;
        }, function(response) {
          $log.info('failure');
          return $q.reject(angular.extend(response.data, {status: response.status}));
        });
      };

      return {
        login: login,
        logout: logout,
        getCurrentUser: getCurrentUser,
        getCurrentPermissions: getCurrentPermissions
      };
    }
  ]);
