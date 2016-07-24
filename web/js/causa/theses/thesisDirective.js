angular.module('causa').directive('thesisDirective', ['thesis', function(thesis) {

  return {
    scope: {
      thesis: '=',
      activeArticle: '=',
      authorsLookup: '=',
      distances: '='
    },
    replace: true,
    require: '^thesesDirective',
    templateUrl: '/thesis.html',
    link: function(scope, element, attr) {
      scope.text = scope.thesis.text;
      scope.articleHeadline = scope.thesis.article.headline;
      scope.positiveVoteCount = scope.thesis.getPositiveVoteCount();
      scope.$watch('activeArticle', function(article) {
        scope.isActive = scope.thesis.article == scope.activeArticle;
      });
    }
  };
}]);
