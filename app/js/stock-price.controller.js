'use strict';

angular.module('ClientApp')
  .controller('StockPriceController', ['currentUser', 'StockService', function(currentUser, StockService) {
    var vm = this;
    vm.loggedIn = !!currentUser;
    vm.data = [];
    vm.getStockData = function() {
      StockService.getStockData().then(function(data) {
        vm.data = data;
      });
    };
    vm.getStockData();
  }]);
