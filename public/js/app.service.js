
(function() {
  'use strict'

  angular.module('myApp')
    .service('appService', service)

  service.$inject = ['$http']
  function service($http) {
    const vm = this;
    vm.templates = [];
    vm.fills = [];
    vm.user_id = 1;
    const app = 'https://mandala-capstone-server.herokuapp.com';

    vm.getUsers = function() {
      $http.get(`api/routes/users`).then(function (response){
        console.log(response);
      })
      return;
    }

    // vm.getUsers();

    vm.getUser = function(id) {
      $http.get(`api/routes/${id}`).then(function (response){
        // console.log(response);
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
      $http.post(`api/routes/users`, vm.userObject).then(function (response){
        templates = response;
        // console.log(response);
      })
      return;
    }

    // vm.postUser();

    vm.getTemplates = new Promise(function(resolve, reject) {
      $http.get(`api/routes/templates`).then(function (response){
        for(let x = 0; x < response.data.length; x++){
          // console.log(response.data[x].file_path);
          vm.templates.push(response.data[x]);
        }
        resolve(vm.templates);
      })
    })
    // vm.getTemplates = function() {
    //   $http.get(`${app}/templates`).then(function (response){
    //     for(let x = 0; x < response.data.length; x++){
    //       // console.log(response.data[x].file_path);
    //       vm.templates.push(response.data[x]);
    //     }
    //   })
    // }


    // vm.getTemplates();


    vm.getFills = new Promise(function(resolve, reject) {
      $http.get(`api/routes/fills/${vm.user_id}`).then(function (response){
        for (let y = 0; y < response.data.length; y++){
          vm.fills.push(response.data[y]);
        }
        resolve(vm.fills);
      })
    })

    vm.patchFill = function(id, updated_fill_array) {
      console.log(updated_fill_array);
      vm.updatedFill = {
        color_array: updated_fill_array
      }
      $http.patch(`api/routes/fills/${id}`, vm.updatedFill).then(function (response){
        console.log(response);
      })
      return;
    }


    vm.postFill = function(id) {
      vm.newFill = {
        color_array: 'rgb(102, 245, 240),rgb(142, 245, 102),rgb(142, 245, 102),#fff,rgb(142, 245, 102),rgb(245, 187, 102),rgb(142, 245, 102),rgb(142, 245, 102),rgb(142, 245, 102),rgb(142, 245, 102),rgb(142, 245, 102),rgb(245, 187, 102),rgb(142, 245, 102),#fff,rgb(245, 187, 102),rgb(142, 245, 102),#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#000000',
        template_id: 3
      }
      $http.post(`api/routes/fills/${id}`, vm.newFill).then(function (response){
        console.log(response);
      })
      return;
    }

    // vm.postFill(1);

    vm.deleteFill = function(id) {
      $http.delete(`api/routes/fills/${id}`).then(function (response){
        console.log(response);
      })
      return;
    }

    // vm.deleteFill(1);
    // get all svgs
    // get current svg url
    // read file from current svg url

  }

}());
