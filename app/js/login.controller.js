'use strict';

angular.module('ClientApp')
  .controller('LoginController', ['$scope', '$mdDialog', function($scope, $mdDialog) {
    var vm = this;
    vm.cancel = function() {
      $mdDialog.cancel();
    };
    vm.login = function(username) {
      var form = $scope.loginForm;
      if (!form.$valid) {
        form.$setSubmitted();
        return;
      }
      $mdDialog.hide(username);
    };
  }]);
