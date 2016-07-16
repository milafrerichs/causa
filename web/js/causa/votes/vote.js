angular.module('causa').factory('vote', function() {
  function Vote(key, json) {
    this.id = key;
    this.date = json.date;
    this.vote = json.vote;
    this.author_id = json.author;
    this.thesis_id = json.thesis;
  }
  return Vote;
});
