'use strict';

angular.module( 'ClientApp', [ 'ngMaterial' ] )
  .controller('MainController', function($scope) {
    $scope.name = 'testName';
  });
