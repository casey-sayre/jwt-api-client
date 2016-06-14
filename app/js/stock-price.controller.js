'use strict';

angular.module('ClientApp')
  .controller('StockPriceController', ['currentUser', function(currentUser) {
    var vm = this;
    vm.isLoggedIn = !!currentUser;
    vm.analytics = null;
  }]);
