'use strict';

angular.module('ClientApp')
  .controller('SidebarController', ['currentUser', function(currentUser) {
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
      authorized: loggedIn, // TODO
      stateName: 'root.stocks'
    }, {
      title: 'Site Administration',
      iconName: 'build',
      authorized: loggedIn, // TODO
      stateName: 'root.home'
    }];
  }]);
