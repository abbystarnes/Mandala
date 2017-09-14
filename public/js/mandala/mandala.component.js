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
          vm.element = response.data;
          vm.svg = document.getElementById('svg');
          vm.svg.innerHTML = response.data;
          vm.paths = document.getElementsByClassName("st0");
          console.log(vm.paths);
          for (let x = 0; x < vm.paths.length; x++){
            vm.paths[x].addEventListener("click", vm.changeColor);
          }
       }).
       catch(function onError(response) {
       });
    }



    vm.changeColor = function(){
      vm.current_color = document.getElementById('colorpicker').value;
      this.style.fill = vm.current_color;
    }
  }

}());
