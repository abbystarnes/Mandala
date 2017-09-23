(function() {
  'use strict'

  angular.module('myApp', [])
    .component('login', {
      controller: controller,
      templateUrl: 'js/login/login.template.js'
    })

  controller.$inject = ['$http', 'appService']
  function controller($http, appService) {
    const vm = this

}());
