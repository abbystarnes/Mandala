(function() {
  'use strict'

  angular.module('myApp')
    .component('mandala', {
      controller: controller,
      templateUrl: 'js/mandala/mandala.template.js'
    })

  controller.$inject = ['$http', 'appService']
  function controller($http, appService) {
    const vm = this

    vm.$onInit = onInit

    function onInit() {

    $http.get('img/mandalas/mandala1.svg').
     then(function onSuccess(response) {
        console.log(response.data);
     }).
     catch(function onError(response) {
      console.log(response);
     });
    }

    vm.changeColor = function(){
      vm.current_color = document.getElementById('colorpicker').value;
      this.style.fill = vm.current_color;
    }
  }

}());
