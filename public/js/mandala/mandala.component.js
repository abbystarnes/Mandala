(function() {
  'use strict'

  angular.module('myApp')
    .component('mandala', {
      controller: controller,
      templateUrl: 'js/mandala/mandala.template.js'
    })

  controller.$inject = ['$http']
  function controller($http) {
    const vm = this

    vm.$onInit = onInit
    // vm.addExpense = addExpense

    function onInit() {
      // $http.get('/api/expenses').then(function (response) {
      //   vm.expenses = response.data
      // })
      vm.expenses = 'chocolate candies'
      vm.svg = document.getElementById('svg');
      console.log(vm.svg);

      vm.gs = document.getElementsByClassName('st0');
      console.log(vm.gs);


      for (let x = 0; x < vm.gs.length; x++){
        vm.gs[x].addEventListener("click", vm.changeColor);
      }
    }

    vm.changeColor = function(){
      vm.current_color = document.getElementById('colorpicker').value;
      console.log(vm.current_color, 'hey color', this);
      this.style.fill = vm.current_color;
    }

    // function addExpense() {
    //   $http.post('/api/expenses', vm.expense)
    //     .then(function (response) {
    //       vm.expenses.push(response.data)
    //       delete vm.expense
    //     })
    // }

  }

}());
