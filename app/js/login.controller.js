'use strict';

angular.module('ClientApp')
  .controller('LoginController', ['$scope', '$mdDialog', function($scope, $mdDialog) {
    var vm = this;
    vm.inputFocus = function() {
      if ($scope.loginForm.$submitted) $scope.loginForm.$setPristine();
    };
    vm.cancel = function() {
      $mdDialog.cancel();
    };
    vm.login = function() {
      var form = $scope.loginForm;
      if (!form.$valid) {
        form.$setSubmitted();
        return;
      }
      $mdDialog.hide({
        username: form.vmEmail.$modelValue,
        password: form.vmPassword.$modelValue
      });
    };
  }]);
