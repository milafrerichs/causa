angular.module('causa').service('thesesService', ['$http', function($http) {
  this.getAll = function() {
    $http.get('/data/all-data.json').$then(function(result) {
    });
  };
}]);
