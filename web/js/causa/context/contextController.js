angular.module('causa').controller('ContextController', ['thesis', 'article', 'vote', '$scope', '$http', function(thesis, article, vote, $scope, $http) {
  $scope.debates = [];
  $scope.theses = [];
  $scope.articles = [];
  $scope.votes = [];
  $http.get('/data/first-debate.json').then(function(results) {
    $scope.debate = results.data.debates;
    angular.forEach(results.data.votes, function(data, key) {
      $scope.votes.push(new vote(key, data));
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
  });
  $scope.currentArticle = $scope.articles[9];
  $scope.sortByArticleDate = function(results) {
    return results.sort(function(a,b) {
      return a.article.date - b.article.date;
    });
  };
}]);
