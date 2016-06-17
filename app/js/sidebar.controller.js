'use strict';

angular.module('ClientApp')
  .controller('SidebarController', [
    'currentUser', 'checkPermission',
    function(currentUser, checkPermission) {
      var vm = this;
      var loggedIn = !!currentUser;
      vm.sidebarOptions = [{
        title: 'Home',
        iconName: 'home',
        authorized: true,
        stateName: 'root.home'
      }, {
        title: 'View Stock Prices',
        iconName: 'timeline',
        authorized: checkPermission('access-stocks'),
        stateName: 'root.stocks'
      }, {
        title: 'Site Administration',
        iconName: 'build',
        authorized: checkPermission('admin-site'),
        stateName: 'root.home'
      }];
    }
  ]);
