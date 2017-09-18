
(function() {
  'use strict'

  angular.module('myApp')
    .service('appService', service)

  service.$inject = ['$http']
  function service($http) {
    const vm = this;
    const app = 'https://mandala-capstone-server.herokuapp.com';

    vm.getUsers = function() {
      $http.get(`${app}/users`).then(function (response){
        console.log(response);
      })
      return;
    }

    vm.getUsers();
    // get all svgs
    // get current svg url
    // read file from current svg url

  }

}());
