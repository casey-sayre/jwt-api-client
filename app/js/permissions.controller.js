'use strict';

angular.module('ClientApp')
  .controller('PermissionsController', ['$scope', '$mdDialog', function($scope, $mdDialog) {
    var vm = this;
    vm.cancel = function() {
      $mdDialog.cancel();
    };
  }]);
