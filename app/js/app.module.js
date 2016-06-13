'use strict';

angular.module('ClientApp', ['ngMaterial', 'ui.router', 'ngResource', 'mdColors'])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('home', {
        url: '/home',
        resolve: {
          apiVersion: function(PublicService) {
            return PublicService.getVersion();
          },
          apiNews: function(PublicService) {
            return PublicService.getApiNews();
          },
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
            templateUrl: '../templates/main-content.html',
            controller: 'MainContentController',
            controllerAs: 'vm',
          }
        },
      });
  });