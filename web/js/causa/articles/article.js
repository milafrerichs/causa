angular.module('causa').factory('article', function() {
  function Article(key, json) {
    this.id = key;
    this.text = json.text;
    this.headline = json.headline;
    this.published = json.published;
    this.date = new Date(this.published.date); //beware of timezone
  }
  return Article;
});
