'use strict';

angular.module('ClientApp')
  .directive('d3Bars', ['$log', '$window', '$timeout', function($log, $window, $timeout) {
    return {
      restrict: 'EA',
      scope: {},
      link: function(scope, element, attrs) {
        var svg = d3.select(element[0])
          .append('svg')
          .style('width', '100%');

        // Browser onresize event
        window.onresize = function() {
          scope.$apply();
        };

        // hard-code data
        scope.data = [{
          name: 'Greg',
          score: 98
        }, {
          name: 'Ari',
          score: 96
        }, {
          name: 'Q',
          score: 75
        }, {
          name: 'Loser',
          score: 48
        }];

        // Watch for resize event
        scope.$watch(function() {
          $log.info('width ret', angular.element($window)[0].innerWidth);
          return angular.element($window)[0].innerWidth;
        }, function() {
          $log.info('width call', angular.element($window)[0].innerWidth);
          $timeout(function() {
            $log.info('width aft delay', angular.element($window)[0].innerWidth);
            scope.render(scope.data);
          }, 500);
        });

        scope.render = function(data) {
          // remove all previous items before render
          svg.selectAll('*').remove();

          // setup variables
          var width, height, max;
          width = d3.select(element[0])[0][0].offsetWidth - 20;
          // 20 is for margins and can be changed
          height = scope.data.length * 35;
          // 35 = 30(bar height) + 5(margin between bars)
          max = 98;
          // this can also be found dynamically when the data is not static
          // max = Math.max.apply(Math, _.map(data, ((val)-> val.count)))

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
            .attr('height', 30) // height of each bar
            .attr('width', 0) // initial width of 0 for transition
            .attr('x', 10) // half of the 20 side margin specified above
            .attr('y', function(d, i) {
              return i * 35;
            }) // height + margin between bars
            .transition()
            .duration(1000) // time of duration
            .attr('width', function(d) {
              return d.score / (max / width);
            }); // width based on scale

          svg.selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .attr('fill', '#fff')
            .attr('y', function(d, i) {
              return i * 35 + 22;
            })
            .attr('x', 15)
            .text(function(d) {
              return d[scope.label];
            });

        };
      }
    };
  }]);
