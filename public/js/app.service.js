
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

    vm.login = function(email, password) {
      $http.get(`api/routes/users`).then(function (response){
        // console.log(response);
      })
      return;
    }


    vm.getTemplates = new Promise(function(resolve, reject){
      vm.fills = [];
      $http.get(`api/routes/templates`).then(function (response){
        for(let x = 0; x < response.data.length; x++){
          vm.templates.push(response.data[x]);
        }
        resolve(vm.templates);
      });
    })


    vm.getFills = new Promise (function(resolve, reject){
      vm.fills = [];
      $http.get(`api/routes/fills/${vm.user_id}`).then(function (response){
        for (let y = 0; y < response.data.length; y++){
          vm.fills.push(response.data[y]);
        }
        resolve(vm.fills);
      })
    })
      // user can log in, return id
        // load thumbnails with fills onto page. If thumbnail is empty, fill with white
          // make post requests to fill in empty ones
        // load currently selected svg on main page
        // color svg
          // make a patch request to fills
          // update selected svg thumbnail & larger to reflect new fill data

    vm.getUsers = function() {
      $http.get(`api/routes/users`).then(function (response){
        console.log(response);
      })
      return;
    }

    vm.getUser = function(id) {
      $http.get(`api/routes/${id}`).then(function (response){
      })
      return;
    }

    vm.postUser = function() {
      vm.userObject = {
        id: 13,
        user_name: 'johnnyrabon',
        email: 'jrabon@gmail.com',
      }
      $http.post(`api/routes/users`, vm.userObject).then(function (response){
        templates = response;
      })
      return;
    }


    vm.patchFill = function(id, updated_fill_array) {
      vm.updatedFill = {
        color_array: updated_fill_array
      }
      $http.patch(`api/routes/fills/${id}`, vm.updatedFill).then(function (response){
          return response;
      })
      return;
    }


    vm.postFill = function(user_id, object) {
      return new Promise(function(resolve, reject){
        $http.post(`api/routes/fills/${user_id}`, object).then(function (response){
          console.log('done');
          resolve('done');
        })
      })
    }

    vm.deleteFill = function(id) {
      $http.delete(`api/routes/fills/${id}`).then(function (response){
      })
      return;
    }

    // vm.deleteFill(1);
    // get all svgs
    // get current svg url
    // read file from current svg url

  }

}());
