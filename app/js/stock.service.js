'use strict';

angular.module('ClientApp')
  .factory('StockService', ['$resource', 'API_CONFIG', function($resource, API_CONFIG) {
      return {
        getStockData: function() {
          var versionResource = $resource(API_CONFIG.url + '/api/stock/historical');
          return versionResource.get().$promise.then(function(stockData) {
            return stockData.historicalPrices;
          });
        }
      };
    }
  ]);
