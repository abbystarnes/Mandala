
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

    // vm.getUsers();

    vm.getUser = function(id) {
      $http.get(`${app}/users/${id}`).then(function (response){
        console.log(response);
      })
      return;
    }

    // vm.getUser(2);

    vm.postUser = function() {
      vm.userObject = {
        id: 13,
        user_name: 'johnnyrabon',
        email: 'jrabon@gmail.com',
      }
      $http.post(`${app}/users`, vm.userObject).then(function (response){
        console.log(response);
      })
      return;
    }

    // vm.postUser();

    vm.getTemplates = function() {
      $http.get(`${app}/templates`).then(function (response){
        console.log(response);
      })
      return;
    }

    // vm.getTemplates();

    vm.getFill = function(id) {
      $http.get(`${app}/fills/${id}`).then(function (response){
        console.log(response);
      })
      return;
    }

    vm.getFill(1);

    vm.patchFill = function(id) {
      vm.updatedFill = {
        id: 1,
        color_array: 'rgb(102, 245, 240),rgb(142, 245, 102),rgb(142, 245, 102),#fff,rgb(142, 245, 102),rgb(245, 187, 102),rgb(142, 245, 102),rgb(142, 245, 102),rgb(142, 245, 102),rgb(142, 245, 102),rgb(142, 245, 102),rgb(245, 187, 102),rgb(142, 245, 102),#fff,rgb(245, 187, 102),rgb(142, 245, 102),#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#000000'
      }
      $http.patch(`${app}/fills/${id}`, vm.updatedFill).then(function (response){
        console.log(response);
      })
      return;
    }

    vm.patchFill(1);
    // get all svgs
    // get current svg url
    // read file from current svg url

  }

}());
