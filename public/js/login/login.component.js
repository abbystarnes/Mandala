(function() {
  'use strict'

  angular.module('myApp')
    .component('login', {
      controller: controller,
      templateUrl: 'js/login/login.template.js'
    })

  controller.$inject = ['$http', 'appService', '$state', '$location', '$window']
  function controller($http, appService, $state, $location, $window) {
    const vm = this
    vm.user = {
      'user_name' : '',
      'hashed_pwd' : ''
    };
    vm.$onInit = function() {
      let color_picker = document.getElementsByClassName('sp-replacer')[0];
      color_picker.className = 'sp-replacer';
      // appService.getFills.then(function(fills){
      //   appService.getTemplates.then(function(){
      //     for (let x = 0; x < vm.templates.length; x++){
      //       vm.colorThumbnails(vm.templates[x].file_path, x, vm.templates[x].id, fills);
      //     }
      //   });
      };


      vm.isDisabled = function(){
        let className
        if (vm.loginUserForm.$invalid) {
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

    vm.loginUserForm = function () {
      console.log(vm.user.name, vm.user.hashed_pwd, 'user');
        appService.login(vm.user);
        delete vm.user;
        vm.loginForm.$setUntouched();

    }
  }

}());
