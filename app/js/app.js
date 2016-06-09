'use strict';

angular.module('ClientApp', ['ngMaterial', 'ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('home', {
        url: '/home',
        views: {
          toolbar: {
            templateUrl: '../templates/toolbar.html',
            controller: 'ToolbarController',
            controllerAs: 'vm',
          },
          sidebar: {
            templateUrl: '../templates/sidebar.html',
          },
          mainContent: {
            templateUrl: '../templates/main-content.html',
          }
        },
      });
  });
