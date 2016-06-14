'use strict';

angular.module('ClientApp')
  .controller('SidebarController', ['$q', function($q) {
    var vm = this;
    vm.showNav = true;
  }]);
