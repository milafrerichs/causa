angular.module('causa').factory('theses', function() {
  function Theses(key, json, article) {
    this.id = key;
    this.text = json.text;
    this.article = article;
  }
  return Theses;
});
