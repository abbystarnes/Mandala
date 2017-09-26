(function() {
  'use strict'

  angular.module('myApp')
    .component('signup', {
      controller: controller,
      templateUrl: 'js/signup/signup.template.js'
    })

  controller.$inject = ['$http', 'appService', '$window', '$location', '$state']
  function controller($http, appService, $window, $location, $state) {
    const vm = this
    vm.user = {
      'user_name' : '',
      'email' : '',
      'hashed_pwd' : ''
    };
    vm.$onInit = function() {
      // appService.getFills.then(function(fills){
      //   appService.getTemplates.then(function(){
      //     for (let x = 0; x < vm.templates.length; x++){
      //       vm.colorThumbnails(vm.templates[x].file_path, x, vm.templates[x].id, fills);
      //     }
      //   });
      };

      vm.isDisabled = function(){
        let className
        if (vm.newUserForm.$invalid) {
          className = 'disabled'
        }
        return className;
      }


      vm.isValid = function(inputName) {
        vm.className = '';
        if ([inputName].$touched && [inputName].$invalid){
            vm.className = 'has-error';
        }
        return vm.className;
      };


    vm.createNewUserForm = function () {
      console.log(vm.user.email, vm.user.name, vm.user.hashed_pwd, 'user');
        appService.postUser(vm.user);
        delete vm.user;
        vm.newUserForm.$setUntouched();
         $state.go('login');
    }
  }


}());
