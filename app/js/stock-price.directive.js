'use strict';

angular.module('ClientApp')
  .directive('stockPrice', ['$log', '$window', '$timeout', '_', 'moment',
  function($log, $window, $timeout, _, moment) {
    return {
      restrict: 'EA',
      scope: {
        data: '='
      },
      link: function(scope, element, attrs) {

        var directiveElement = element[0];
        directiveElement.style.overflow = 'hidden';

        var svg = d3.select(directiveElement)
          .append('svg');

        // Browser onresize event
        window.onresize = function() {
          scope.$apply();
        };

        // Watch for resize event
        var timeoutPromise = null;
        var w,h;
        scope.$watch(function() {
          w = directiveElement.clientWidth;
          h = directiveElement.clientHeight;
          var watchVal = w << 16 | h;
          return watchVal;
        }, function() {
          if (timeoutPromise) {
            $timeout.cancel(timeoutPromise);
          }
          else {
            svg.selectAll('*').remove();
          }
          timeoutPromise = $timeout(function() {
            scope.render(scope.data, w, h);
            timeoutPromise = null;
          }, 100);
        });

        scope.render = function(data, svgw, svgh) {

          svg.selectAll('*').remove();
          svg
            .style('width', svgw)
            .style('height', svgh);

          var graphHorzMargin = 200;
          var graphVertMargin = 200;

          var graphWidth = svgw - graphHorzMargin;
          var graphHeight = svgh - graphVertMargin;

          var x = d3.time.scale()
            .range([0, graphWidth])
            .domain(d3.extent(data, function(d) {
              return moment(d.tradeDate, 'YYYY-MM-DD');
            }));

          var y = d3.scale.linear()
            .range([graphHeight, 0])
            .domain(d3.extent(data, function(d) {
              return d.adjClose;
            }));

          var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom')
            .innerTickSize(-graphHeight)
            .tickFormat(d3.time.format('%b'));

          var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left')
            .innerTickSize(-graphWidth);

          var line = d3.svg.line()
            .x(function(d) {
              return x(moment(d.tradeDate, 'YYYY-MM-DD'));
            })
            .y(function(d) {
              return y(d.adjClose);
            });

          var chartg = svg.append('g')
            .attr('transform', 'translate(' + graphHorzMargin / 2 + ',' + graphVertMargin / 2 + ')');

          chartg.append('g')
            .attr('class', 'x axis')
            .attr('transform', d3.transform('translate(0,' + graphHeight + ')'))
            .call(xAxis);

          chartg.append('g')
            .attr('class', 'y axis')
            .call(yAxis)
            .append('text')
            .attr('class', 'label')
            .attr('transform', d3.transform('rotate(-90) translate(0,-50)'))
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('Price ($)');

          var path = chartg.append('path')
            .datum(data)
            .attr('class', 'line')
            .attr('d', line);

          var totalLength = path.node().getTotalLength();

          path
            .attr('stroke-dasharray', totalLength + ' ' + totalLength)
            .attr('stroke-dashoffset', -totalLength)
            .transition()
              .duration(500)
              .ease('linear')
              .attr('stroke-dashoffset', 0);

          chartg.selectAll('.axis')
            .style('opacity', 0.2)
            .transition()
            .duration(500)
            .style('opacity', 1);
        };
      }
    };
  }]);
