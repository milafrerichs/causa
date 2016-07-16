angular.module('causa').factory('thesis', function() {
  function Theses(key, json, article, votes) {
    this.id = key;
    this.text = json.text;
    this.article = article;
    this.votes = votes;
    this.getVoteCount = function() {
      return this.votes.length;
    };
    this.getPositiveVoteCount = function() {
      return this.votes.filter(function(vote) { return vote.vote == "1";}).length;
    };
    this.getNegativeVoteCount = function() {
      return this.votes.filter(function(vote) { return vote.vote == "-1";}).length;
    };
  }
  return Theses;
});
