'use strict';

angular.module('ClientApp')
  .controller('SidebarController', ['$q', 'apiVersion', 'apiNews', function($q, apiVersion, apiNews) {
    var vm = this;
    vm.apiVersion = apiVersion;
    vm.apiNews = apiNews;
  }]);
