angular.module('causa').controller('ContextController', ['thesis', 'article', 'vote', 'author', '$scope', '$http', '$q', function(thesis, article, vote, author, $scope, $http, $q) {
  var sortByDistance= function(results) {
    var thesisId = "39926eec0868833d6729637c229419c5";
    return results.sort(function(a,b) {
      return $scope.distances[thesisId][a.id] - $scope.distances[thesisId][b.id];
    });
  };
  var sortByArticleDate = function(results) {
    return results.sort(function(a,b) {
      return a.article.date - b.article.date;
    });
  };
  $scope.debates = [];
  $scope.theses = [];
  $scope.articles = [];
  $scope.votes = [];
  $scope.authors = [];
  $scope.authorsLookup = {};
  $http.get('/data/dist_dict.json').then(function(result) {
    $scope.distances = result.data;
  });
  $http.get('/data/die-deutsche-russlandpolitik.json').then(function(results) {
    $scope.debate = results.data.debates;
    angular.forEach(results.data.votes, function(data, key) {
      $scope.votes.push(new vote(key, data));
    });
    angular.forEach(results.data.authors, function(data, key) {
      var authorObj = new author(key, data);
      $scope.authorsLookup[key] = authorObj;
      $scope.authors.push(authorObj);
    });
    angular.forEach(results.data.articles, function(data, key) {
      $scope.articles.push(new article(key, data));
    });
    angular.forEach(results.data.theses, function(data, key) {
      var articleKeys = results.data.articles_theses.filter(function(articleThesis) {
        return key === articleThesis.thesis;
      });
      var articleKey = articleKeys[0].article;
      var articles = $scope.articles.filter(function(article) {
        return articleKey === article.id;
      });
      var votes = $scope.votes.filter(function(vote) {
        return key === vote.thesis_id;
      });
      $scope.theses.push(new thesis(key, data, articles[0], votes));
    });
    $scope.currentArticle = $scope.articles[9];
    $scope.theses = sortByArticleDate($scope.theses);
  });
}]);
