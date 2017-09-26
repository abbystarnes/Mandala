(function() {
  'use strict'

  angular.module('myApp')
    .component('welcome', {
      controller: controller,
      templateUrl: 'js/welcome/welcome.template.js'
    })

  controller.$inject = ['$http', 'appService']
  function controller($http, appService) {
    const vm = this
    vm.$onInit = function() {
      let color_picker = document.getElementsByClassName('sp-replacer')[0];
      color_picker.className = 'sp-replacer';
    }
  }
}());
