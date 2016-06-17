'use strict';

angular.module('ClientApp')
  .controller('ToolbarController', [
    '$log', '$mdSidenav', '$state', '$mdDialog', '$window', 'UserService', 'currentUserPermissions',
    function($log, $mdSidenav, $state, $mdDialog, $window, UserService, currentUserPermissions) {
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
        UserService.login(loginInfo.username, loginInfo.password).then(function(userData) {
          vm.currentUsername = userData.username;
          $state.go('root.home', null, {
            reload: true
          });
        }, function() {
          $log.info('login fail');
        });
      }, function() {
        // login cancelled
      });
    };
    vm.logout = function(ev) {
      UserService.logout();
      $state.go('root.home', null, {
        reload: true
      });
    };
    vm.showPerms = function(ev) {
      $mdDialog.show({
        controller: 'PermissionsController',
        controllerAs: 'vm',
        templateUrl: '../templates/permissions.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        locals: {
          permissions: currentUserPermissions
        }
      });
    };
  }]);
