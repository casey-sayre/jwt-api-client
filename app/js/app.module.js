'use strict';

angular.module('ClientApp', ['ngMaterial', 'ui.router', 'ngResource', 'mdColors'])
  .constant('_', window._)
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('TokenService');
  })
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('root', {
        abstract: true,
        url: '',
        resolve: {
          currentUser: function(UserService) {
            return UserService.getCurrentUser();
          },
          currentUserPermissions: function(UserService) {
            return UserService.getCurrentPermissions();
          },
          checkPermission: function(_, currentUserPermissions) {
            return function(permission) {
              var requiredPermEntry = _.find(currentUserPermissions, function(permEntry) {
                return permEntry.permission === permission;
              });
              return requiredPermEntry && requiredPermEntry.granted;
            };
          }
        },
        views: {
          toolbar: {
            templateUrl: '../templates/toolbar.html',
            controller: 'ToolbarController',
            controllerAs: 'vm',
          },
          sidebar: {
            templateUrl: '../templates/sidebar.html',
            controller: 'SidebarController',
            controllerAs: 'vm',
          },
          mainContent: {
            template: '<div ui-view></div>'
          }
        }
      })
      .state('root.home', {
        url: '/home',
        resolve: {
          apiVersion: function(PublicService) {
            return PublicService.getVersion();
          },
          apiNews: function(PublicService) {
            return PublicService.getApiNews();
          },
        },
        templateUrl: '../templates/home.html',
        controller: 'HomeController',
        controllerAs: 'vm',
      })
      .state('root.stocks', {
        url: '/stocks',
        resolve: {
        },
        templateUrl: '../templates/stock-price.html',
        controller: 'StockPriceController',
        controllerAs: 'vm',
      });
  });
