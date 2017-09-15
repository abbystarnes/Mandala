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
      $http.get('img/templates/2.svg').
       then(function onSuccess(response) {
          vm.element = response.data;
          vm.currentpath;
          vm.mem_fill;
          vm.svg = document.getElementById('svg');
          vm.svg.innerHTML = response.data;
          vm.paths = document.getElementsByClassName("st0");
          for (let x = 0; x < vm.paths.length; x++){
            vm.paths[x].addEventListener("click", vm.changeColor);
          }
       }).
       catch(function onError(response) {
       });
    }

    vm.undo = function(){
      vm.currentpath.style.fill = vm.mem_fill;
    }

    vm.save = function(){
      vm.colors = [];
      for (let x = 0; x < vm.paths.length; x++){
        if (vm.paths[x].style.fill){
          vm.colors.push(vm.paths[x].style.fill);
        } else {
          vm.colors.push('#fff');
        }
      }
      console.log(vm.colors);
      console.log(vm.colors.join(','));
    }

    vm.changeColor = function(){
      vm.currentpath = this;
      if (this.style.fill){
        vm.mem_fill = this.style.fill;
      } else {
        vm.mem_fill = '#FFF';
      }

      vm.current_color = document.getElementById('colorpicker').value;
      this.style.fill = vm.current_color;
    }
  }

}());