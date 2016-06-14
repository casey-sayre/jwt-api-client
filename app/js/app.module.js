'use strict';

angular.module('ClientApp', ['ngMaterial', 'ui.router', 'ngResource', 'mdColors'])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('root', {
        abstract: true,
        url: '',
        resolve: {
          currentUser: function(UserService) {
            return UserService.getCurrentUser();
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
