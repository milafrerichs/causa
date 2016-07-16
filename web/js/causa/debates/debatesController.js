angular.module('causa').controller('DebatesController', ['theses', 'article', '$scope', '$http', function(theses, article, $scope, $http) {
  $scope.test = 'Test';
  $scope.debates = [];
  $scope.theses = [];
  $scope.articles = [];
  $http.get('/data/first-debate.json').then(function(results) {
    $scope.debate = results.data.debates;
    angular.forEach(results.data.articles, function(data, key) {
      $scope.articles.push(new article(key, data));
    });
    angular.forEach(results.data.theses, function(data, key) {
      var articleKey = results.data.articles_theses.filter(function(articleThesis) {
        return key === articleThesis.thesis;
      });
      var article = $scope.articles.filter(function(article) {
        return articleKey[0].article === article.id;
      });
      $scope.theses.push(new theses(key, data, article[0]));
    });
  });
}]);
