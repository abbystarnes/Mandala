
(function() {
  'use strict'

  angular.module('myApp')
    .service('appService', service)

  service.$inject = ['$http', '$state']
  function service($http, $state) {
    const vm = this;
    vm.templates = [];
    vm.fills = [];
    vm.user_id = 1;
    // const app = 'https://mandala-capstone-server.herokuapp.com';

    vm.login = function(user) {
      $http.get(`api/routes/users`).then(function (response){
        for (let x = 0; x < response.data.length; x++){
          if ((response.data[x].user_name === user.user_name) && (response.data[x].hashed_pwd === user.hashed_pwd)) {
            vm.user_id = response.data[x].id;
            console.log('found a match');
            $state.go('mandala');
            return;
          }
        }
        console.log('no match');
      })
      return;
    }


    vm.getTemplates = function(){
      return new Promise(function(resolve, reject){
        vm.templates = [];
        $http.get(`api/routes/templates`).then(function (response){
          for(let x = 0; x < response.data.length; x++){
            vm.templates.push(response.data[x]);
          }
          resolve(vm.templates);
        });
      });
    }


    vm.getFills = function(){
      return new Promise(function(resolve, reject){
        vm.fills = [];
        $http.get(`api/routes/fills/${vm.user_id}`).then(function (response){
          for (let y = 0; y < response.data.length; y++){
            vm.fills.push(response.data[y]);
          }
          resolve(vm.fills);
        })
      });
    }
      // user can log in, return id
        // load thumbnails with fills onto page. If thumbnail is empty, fill with white
          // make post requests to fill in empty ones
        // load currently selected svg on main page
        // color svg
          // make a patch request to fills
          // update selected svg thumbnail & larger to reflect new fill data

    vm.getUsers = function() {
      $http.get(`api/routes/users`).then(function (response){
      })
      return;
    }

    vm.getUser = function(id) {
      $http.get(`api/routes/${id}`).then(function (response){
      })
      return;
    }

    vm.postUser = function(userObject) {
      // vm.userObject = {
      //   id: 13,
      //   user_name: 'johnnyrabon',
      //   email: 'jrabon@gmail.com',
      // }
      $http.post(`api/routes/users`, userObject).then(function (response){
        console.log(response);
      })
      return;
    }



    vm.patchFill = function(id, updated_fill_array) {
      return new Promise(function(resolve, reject){
        vm.updatedFill = {
          color_array: updated_fill_array
        }
        $http.patch(`api/routes/fills/${id}`, vm.updatedFill).then(function (response){
          resolve(response);
        })
      })
    }


    vm.postFill = function(object) {
      return new Promise(function(resolve, reject){
        $http.post(`api/routes/fills/${vm.user_id}`, object).then(function (response){
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
