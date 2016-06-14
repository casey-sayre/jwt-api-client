'use strict';

angular.module('ClientApp')
  .directive('d3Bars', ['$log', '$window', '$timeout', '_', function($log, $window, $timeout, _) {
    return {
      restrict: 'EA',
      scope: {
        data: '='
      },
      link: function(scope, element, attrs) {
        var svg = d3.select(element[0])
          .append('svg')
          .style('width', '100%');

        // Browser onresize event
        window.onresize = function() {
          scope.$apply();
        };

        // Watch for resize event
        scope.$watch(function() {
          return angular.element($window)[0].innerWidth;
        }, function() {
          $timeout(function() {
            scope.render(scope.data);
          }, 500);
        });

        scope.render = function(data) {
          // remove all previous items before render
          svg.selectAll('*').remove();

          // setup variables
          var horzMargin = 20;
          var barHeight = 30;
          var barMargin = 4;
          var textLeftMargin = 15;
          var durationMsec = 1000;

          var width = d3.select(element[0])[0][0].offsetWidth - horzMargin;
          // 20 is for margins and can be changed
          var height = scope.data.length * (barHeight + barMargin);
          // 35 = 30(bar height) + 5(margin between bars)
          var maxClose = _.max(_.map(data, 'adj_close'));

          // set the height based on the calculations above
          svg.attr('height', height);

          //create the rectangles for the bar chart
          svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .on('click', function(d, i) {
              return scope.onClick({
                item: d
              });
            })
            .attr('height', barHeight)
            .attr('width', 0) // initial width of 0 for transition
            .attr('x', horzMargin / 2)
            .attr('y', function(d, i) {
              return i * (barHeight + barMargin) + barMargin / 2;
            }) // height + margin between bars
            .transition()
            .duration(durationMsec) // time of duration
            .attr('width', function(d) {
              return d.adj_close / (maxClose / width); // jshint ignore:line
            }); // width based on scale

          svg.selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .attr('fill', '#fff')
            .attr('y', function(d, i) {
              return i * (barHeight + barMargin) + 22;
            })
            .attr('x', textLeftMargin)
            .text(function(d) {
              return d.symbol;
            });

        };
      }
    };
  }]);
