'use strict';

angular.module('ClientApp')
  .controller('ToolbarController', ['$mdSidenav', '$mdDialog', function($mdSidenav, $mdDialog) {
    var vm = this;
    vm.toggleSidenav = function() {
      $mdSidenav('left').toggle();
    };
    vm.openMenu = function($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };
    vm.login = function(ev) {
      $mdDialog.show({
        controller: 'LoginController',
        controllerAs: 'vm',
        templateUrl: '../templates/login.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function(username) {
        vm.status = 'Login succeeded, user "' + username + '"';
      }, function() {
        vm.status = 'Login cancelled';
      });
    };
  }]);
