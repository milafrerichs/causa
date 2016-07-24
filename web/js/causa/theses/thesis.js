angular.module('causa').factory('thesis', ['author', function(author) {
  function Theses(key, json, article, votes) {
    this.id = key;
    this.text = json.text;
    this.author_id = json.created_by;
    this.article = article;
    this.votes = votes;
    this.getVoteCount = function() {
      return this.votes.length;
    };
    this.getPositiveVoteCount = function() {
      return this.getPositiveVotes().length;
    };
    this.getNegativeVoteCount = function() {
      return this.getNegativeVotes().length;
    };
    this.getNeutralVoteCount = function() {
      return this.getNeutralVotes().length;
    };
    this.getGroupedVotes = function() {
       return _.group_by(this.votes, 'vote');
    };
    this.getNeutralVotes= function() {
      return this.votes.filter(function(vote) { return vote.vote == "0";});
    };
    this.getPositiveVotes = function() {
      return this.votes.filter(function(vote) { return vote.vote == "1";});
    };
    this.getNegativeVotes = function() {
      return this.votes.filter(function(vote) { return vote.vote == "-1";});
    };
  }
  return Theses;
}]);
