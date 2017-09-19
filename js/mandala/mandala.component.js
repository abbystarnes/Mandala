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
    vm.elements = [];
    vm.templates = appService.templates;
    vm.template_thumbnails = [];
    vm.$onInit = onInit
    function onInit() {
      appService.getTemplates.then( function(){
        console.log(vm.templates, vm.templates[2]);
      });

      // promise.then((templates) =>{
      //   console.log(templates[2], 'here');
        // for (let x = 0; x < templates.length; x++){
        //   console.log('calling');
        //   console.log(templates[x], x);
        //   vm.createTemplateThumbnails(templates[x], x);
        // }


      // console.log(vm.templates);


      // $http.get('img/templates/2.svg').
      //  then(function onSuccess(response) {
      //     vm.element = response.data;
      //     vm.currentpath;
      //     vm.mem_fill;
      //     vm.svg = document.getElementById('svg');
      //     vm.svg.innerHTML = response.data;
      //     vm.paths = document.getElementsByClassName("st0");
      //     for (let x = 0; x < vm.paths.length; x++){
      //       vm.paths[x].addEventListener("click", vm.changeColor);
      //     }
      //  }).
      //  catch(function onError(response) {
      //  });
    }

    // vm.createTemplateThumbnails(response.data[x].file_path);
    //
    vm.createTemplateThumbnails = function(template_url, index){
      $http.get(template_url).
      then(function onSuccess(response){
        vm.empty_svgs = document.getElementsByClassName('template');
        console.log(vm.empty_svgs[index], index, template_url, 'here');
        // vm.templates.push(response.data);
      })
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
