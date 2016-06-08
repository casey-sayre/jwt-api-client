'use strict';

angular.module('ClientApp', ['ngMaterial', 'ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '../templates/home.html',
        controllerAs: 'vm',
        controller: function($scope, $mdSidenav) {
          var vm = this;
          vm.toggleSidenav = function() {
            $mdSidenav('left').toggle();
          };
        }
      });
  });
