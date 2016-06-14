'use strict';

angular.module('ClientApp')
  .controller('HomeController', ['$q', 'apiVersion', 'apiNews', function($q, apiVersion, apiNews) {
    var vm = this;
    vm.showNews = true;
    vm.apiVersion = apiVersion;
    vm.apiNews = apiNews;
  }]);
