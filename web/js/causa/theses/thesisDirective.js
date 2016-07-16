angular.module('causa').directive('thesisDirective', ['thesis', function(thesis) {

  return {
    scope: {
      thesis: '=',
      activeArticle: '='
    },
    replace: true,
    template: '<div class="thesis" ng-class="{active: isActive}"><p>{{text}}</p><br/>{{articleHeadline}}<br/>{{positiveVoteCount}}</div>',
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

      // <li ng-repeat="thesis in theses | orderBy: sortyByArticleDate">{{thesis.text}}, {{thesis.article.headline}}, {{thesis.getVoteCount()}}, {{thesis.getPositiveVoteCount()}}p {{thesis.getNeutralVoteCount()}}o {{thesis.getNegativeVoteCount()}}n </li>
