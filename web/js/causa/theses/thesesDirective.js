angular.module('causa').directive('thesesDirective', ['thesis', function(thesis) {

  return {
    scope: {
      theses: '=',
      distances: '=',
      authorsLookup: '='
    },
    replace: true,
    templateUrl: '/theses.html',
    controller: function($element, $scope) {
      $scope.$watch(function() {
        if(!$scope.theses || $scope.theses.length === 0 || !$scope.distances || $scope.distances.length === 0 || $element.find('ul .thesis').length === 0) { return; }
        $scope.$evalAsync(function() {
          var thesisDimensions = $element.find('ul .thesis').map(function() { return _.extend($(this).offset(), { width: $(this).width(), height: $(this).height()}); }).get();
          var dimensionsLookup = {};
          var indexLookup = {};
          var thesisAuhtorLookup = {};
          $scope.theses.forEach(function(thesis, index) {
            dimensionsLookup[thesis.id] = thesisDimensions[index];
            indexLookup[thesis.id] = index;
            thesisAuhtorLookup[thesis.id] = thesis.author_id;
          });
          var arcData = [];
          var arcDone = {};
          var arcNegData = [];
          var arcNegDone = {};
          var distanceTreshold = 0.13;
          var negDistanceTreshold = 1.88;
          var i,j = 0;
          _.forOwn($scope.distances, function(thesisDistances, from) {
            _.forOwn(thesisDistances, function(distance, to) {
              if(distance < distanceTreshold && from !== to && !arcDone[to+from]) {
                arcDone[from+to] = true;
                arcData.push({from: from, to: to, distance: distance, indexDifference: Math.abs(indexLookup[from]-indexLookup[to]), author: thesisAuhtorLookup[from], sameAuthor: (thesisAuhtorLookup[from] == thesisAuhtorLookup[to])});
              }
              if(distance > negDistanceTreshold && from !== to && !arcNegDone[to+from]) {
                arcNegDone[from+to] = true;
                arcNegData.push({from: from, to: to, distance: distance, indexDifference: Math.abs(indexLookup[from]-indexLookup[to]), author: thesisAuhtorLookup[from], sameAuthor: (thesisAuhtorLookup[from] == thesisAuhtorLookup[to])});
              }
            });
          });
          arcData = _.sortBy(arcData,'indexDifference');
          arcData.forEach(function(a,i) { a.level = i; });
          arcNegData = _.sortBy(arcNegData,'indexDifference');
          arcNegData.forEach(function(a,i) { a.level = i; });
          var line = d3.line().x(function(d) { return d.x; }).y(function(d) { return d.y; }).curve(d3.curveBasis);
          var svg = d3.select('svg');
          var distanceScale = d3.scaleLinear().domain([distanceTreshold,0]).range([1,5]).clamp(true);
          var arcScale = d3.scaleLinear().domain(d3.extent(arcData, function(d) { return d.level; })).range([10,90]).clamp(true);
          var colorScale = d3.scaleOrdinal(d3.schemeCategory20).domain(_.flatMap(arcData, 'author'));
          var strokeColor = function(d) {
            if(d.sameAuthor) {
              return colorScale(d.author);
            }
            return '#ccc';
          };
          var negArcScale = d3.scaleLinear().domain(d3.extent(arcNegData, function(d) { return d.level; })).range([10,90]).clamp(true);
          var negDistanceScale = d3.scaleLinear().domain([negDistanceTreshold, 2]).range([1,5]).clamp(true);
          var arcs = svg.selectAll('.arc').data(arcData);
          arcs.enter().append('path')
          .attr('class', 'arc')
          .attr('d', function(d) {
            var lineArray = [];
            var fromDims = dimensionsLookup[d.from];
            var toDims = dimensionsLookup[d.to];
            var arcPadding = arcScale(d.level);
            if(fromDims && toDims) {
              lineArray.push({x: fromDims.left, y: fromDims.top });
              lineArray.push({x: fromDims.left-arcPadding, y: fromDims.top });
              //lineArray.push({x: fromDims.left-arcPadding, y: fromDims.top });
              //lineArray.push({x: toDims.left-arcPadding, y: toDims.top });
              lineArray.push({x: toDims.left-arcPadding, y: toDims.top });
              lineArray.push({x: toDims.left, y: toDims.top });
              return line(lineArray);
            }
          })
          .attr('style', function(d) { return 'stroke-width: ' +distanceScale(d.distance) +';stroke:' + strokeColor(d); });

          var negArcs = svg.selectAll('.neg-arc').data(arcNegData);
          negArcs.enter().append('path')
          .attr('class', 'neg-arc')
          .attr('d', function(d) {
            var lineArray = [];
            var fromDims = dimensionsLookup[d.from];
            var toDims = dimensionsLookup[d.to];
            var arcPadding = negArcScale(d.level);
            if(fromDims && toDims) {
              lineArray.push({x: fromDims.left+fromDims.width, y: fromDims.top });
              lineArray.push({x: fromDims.left+arcPadding+fromDims.width, y: fromDims.top });
              //lineArray.push({x: fromDims.left-arcPadding, y: fromDims.top });
              //lineArray.push({x: toDims.left-arcPadding, y: toDims.top });
              lineArray.push({x: toDims.left+arcPadding+toDims.width, y: toDims.top });
              lineArray.push({x: toDims.left+toDims.width, y: toDims.top });
              return line(lineArray);
            }
          })
          .attr('style', function(d) { return 'stroke-width: ' +negDistanceScale(d.distance) +';stroke:' + strokeColor(d); });
        }); //evalAsync
      }); //$scope.$watch
    }
  };
}]);
