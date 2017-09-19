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
    vm.fills = appService.fills;
    vm.template_thumbnails = [];
    vm.$onInit = onInit
    function onInit() {

      appService.getFills.then(function(data){
        // console.log(vm.fills);
        appService.getTemplates.then( function(){
          for (let x = 0; x < vm.templates.length; x++){
            // console.log(vm.templates[x], x);
            vm.createTemplateThumbnails(vm.templates[x].file_path, x, vm.templates[x].id, data);
          }
        });
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

    // ([,])#
    //
    // ([,])r
    // /([,])(?=r)/
    // /([,])(?=#)/

    vm.createTemplateThumbnails = function(template_url, index, template_id, fills){
      $http.get(template_url).
      then(function onSuccess(response){

        vm.empty_svgs = document.getElementsByClassName('thumbnail');
        vm.empty_svgs[index].innerHTML = response.data;
        for (let y = 0; y < fills.length; y++){
          if (fills[y].template_id === template_id) {
            let paths = vm.empty_svgs[index].getElementsByClassName('st0');
            fills[y].color_array = fills[y].color_array.split(/([,])(?=#)|([,])(?=r)/);

            let counter = 0;
            vm.dedup = function(array){
              if(!array.length){
                return;
              }
              if(counter >= array.length){
                return;
              }
              if (array[counter] === undefined || array[counter] === ","){
                array.splice(counter, 1);
                return vm.dedup(array);
              } else {
                counter ++;
                return vm.dedup(array);
              }
            }

            vm.dedup(fills[y].color_array);
            for (let x = 0; x < paths.length; x++){
              paths[x].style.fill = fills[y].color_array[x];
            }
            console.log(paths[0].style.fill, fills[y].color_array[0]);
          }
        }

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
