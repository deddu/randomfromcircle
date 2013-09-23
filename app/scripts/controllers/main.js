'use strict';

angular.module('circledistributionApp')
    .controller('MainCtrl', function ($scope) {
        //init scope variables
        if (!$scope.radius)
            $scope.radius =1;
        if (!$scope.maxpoints)
            $scope.maxpoints =1;
        if (!$scope.x0)
            $scope.x0 =0;
        if (!$scope.y0)
            $scope.y0 =0;

        var get_point = function(radius, x0,y0){
            // return a point within a circle of radius r
            var r=radius*Math.sqrt(Math.random())
            var theta=Math.PI*2*Math.random()
            return {x:r*Math.sin(theta)+x0,y:r*Math.cos(theta)+y0}
        }

        var get_points= function(maxpoints,radius, x0,y0){
            var pts={coords:[],
                xs:[],
                ys:[]};
            for (var i=0;i< maxpoints;i++){
                var p = get_point(radius, x0,y0);
                pts.xs.push(p.x);
                pts.ys.push(p.y);
                pts.coords.push(p);
            }
            return pts;
        }
        $scope.get_points = get_points;

        $scope.refresh = function(){
            $scope.points=get_points($scope.maxpoints,$scope.radius, $scope.x0, $scope.y0)

            // derived from http://bl.ocks.org/2595950
            var xdata = $scope.points.xs;
            var ydata = $scope.points.ys;

            // size and margins for the chart
            var margin = {top: 20, right: 20, bottom: 20, left: 40}
                , width = 300 - margin.left - margin.right
                , height = 300 - margin.top - margin.bottom;

            // x and y scales
            var x = d3.scale.linear()
                .domain([d3.min(xdata), d3.max(xdata)])  // the range of the values to plot
                .range([ 0, width ]);        // the pixel range of the x-axis

            var y = d3.scale.linear()
                .domain([d3.min(ydata), d3.max(ydata)])
                .range([ height, 0 ]);

            //clear previous graph if present
            d3.select('#d3content')
                .selectAll('svg')
                .remove();
            // the chart object, includes all margins
            var chart = d3.select('#d3content')
                .append('svg:svg')
                .attr('width', width + margin.right + margin.left)
                .attr('height', height + margin.top + margin.bottom)
                .attr('class', 'chart')

            // the main object where the chart and axis will be drawn
            var main = chart.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                .attr('width', width)
                .attr('height', height)
                .attr('class', 'main')

            // draw the x axis
            var xAxis = d3.svg.axis()
                .scale(x)
                .orient('bottom');

            main.append('g')
                .attr('transform', 'translate(0,' + height + ')')
                .attr('class', 'main axis')
                .call(xAxis);

            // draw the y axis
            var yAxis = d3.svg.axis()
                .scale(y)
                .orient('left');

            main.append('g')
                .attr('transform', 'translate(0,0)')
                .attr('class', 'main axis')
                .call(yAxis);

// draw the graph object

            var g = main.append("svg:g");

            g.selectAll("scatter-dots")
                .data(ydata)  // using the values in the ydata array
                .enter().append("svg:circle")  // create a new circle for each value
                .attr("cy", function (d) { return y(d); } ) // translate y value to a pixel
                .attr("cx", function (d,i) { return x(xdata[i]); } ) // translate x value
                .attr("r", 2) // radius of circle
        }
    });

