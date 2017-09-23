(function() {
  'use strict'

  angular.module('myApp')
    .component('login', {
      controller: controller,
      templateUrl: 'js/login/login.template.js'
    })

  controller.$inject = ['$http', 'appService']
  function controller($http, appService) {
    const vm = this
    vm.$onInit = function() {
      // appService.getFills.then(function(fills){
      //   appService.getTemplates.then(function(){
      //     for (let x = 0; x < vm.templates.length; x++){
      //       vm.colorThumbnails(vm.templates[x].file_path, x, vm.templates[x].id, fills);
      //     }
      //   });
      };
  }

}());
