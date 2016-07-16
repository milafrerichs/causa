angular.module('causa').factory('article', function() {
  function Article(key, json) {
    this.id = key;
    this.text = json.text;
  }
  return Article;
});
