'use strict';

angular.module('ClientApp')
  .controller('ToolbarController', [
    '$log', '$mdSidenav', '$mdDialog', '$window', 'UserService',
    function($log, $mdSidenav, $mdDialog, $window, UserService) {
    var vm = this;
    var currentUser = UserService.getCurrentUser();
    vm.loggedIn = !!currentUser;
    vm.currentUsername = currentUser ? currentUser.username : 'public';
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
      .then(function(loginInfo) {
        vm.status = 'Login dlg succeeded, user "' + loginInfo.username + '"';
        UserService.login(loginInfo.username, loginInfo.password).then(function(userData) {
          vm.currentUsername = userData.username;
        }, function() {
          $log.info('login fail');
        });
      }, function() {
        vm.status = 'Login cancelled';
      });
    };
    vm.logout = function(ev) {
      UserService.logout();
    };
    vm.showPerms = function(ev) {
      $mdDialog.show({
        controller: 'PermissionsController',
        controllerAs: 'vm',
        templateUrl: '../templates/permissions.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      });
    };
  }]);
