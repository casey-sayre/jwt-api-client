'use strict';

angular.module('ClientApp', ['ngMaterial', 'ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('home', {
        url: '/home',
        template: '<h1>hello world</h1>'
      });
  });
