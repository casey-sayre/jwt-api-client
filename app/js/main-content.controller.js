'use strict';

angular.module('ClientApp')
  .controller('MainContentController', ['currentUser', function(currentUser) {
    var vm = this;
    vm.isLoggedIn = !!currentUser;
    vm.analytics = null;
  }]);
