angular.module('causa').factory('author', function() {
  function Author(key, json) {
    this.id = key;
    this.firstName = json.first_name;
    this.lastName = json.last_name;

    this.name = this.firstName + " " + this.lastName;
  }
  return Author;
});
