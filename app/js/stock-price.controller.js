'use strict';

angular.module('ClientApp')
  .controller('StockPriceController', ['currentUser', 'StockService', function(currentUser, StockService) {
    var vm = this;
    vm.loggedIn = !!currentUser;
    vm.data = [];
    vm.getStockData = function() {
      vm.data = StockService.getStockData();
    };
  }]);
