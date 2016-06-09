'use strict';

angular.module('ClientApp')
  .controller('LoginController', ['$mdDialog', function($mdDialog) {
    var vm = this;
    vm.cancel = function() {
      $mdDialog.cancel();
    };
    vm.login = function(username) {
      $mdDialog.hide(username);
    };
  }]);
