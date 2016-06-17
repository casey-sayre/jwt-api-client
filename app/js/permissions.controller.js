'use strict';

angular.module('ClientApp')
  .controller('PermissionsController', ['$scope', '$mdDialog', 'permissions',
  function($scope, $mdDialog, permissions) {
    var vm = this;
    vm.cancel = function() {
      $mdDialog.cancel();
    };
    vm.permissions = permissions;
  }]);
