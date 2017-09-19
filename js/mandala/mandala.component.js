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
    vm.active_svg;
    vm.$onInit = onInit
    function onInit() {
      appService.getFills.then(function(data){
        appService.getTemplates.then( function(){
          for (let x = 0; x < vm.templates.length; x++){
            vm.createTemplateThumbnails(vm.templates[x].file_path, x, vm.templates[x].id, data, 'thumbnail');
          }
        });
      });
    }

    vm.selectMandala = function(template_id, template_file_path){
      console.log(vm.fills[0].color_array);
      vm.createTemplateThumbnails(template_file_path, 0, template_id, vm.fills, 'active_svg');
    }

    vm.createTemplateThumbnails = function(template_url, index, template_id, fills, svg_class_name){
      $http.get(template_url).
      then(function onSuccess(response){
        vm.empty_svgs = document.getElementsByClassName(svg_class_name);
        vm.empty_svgs[index].innerHTML = response.data;
        for (let y = 0; y < fills.length; y++){
          if (fills[y].template_id === template_id) {
            let paths = vm.empty_svgs[index].getElementsByClassName('st0');
            // console.log(fills[y].color_array);
            if(!(Array.isArray(fills[y].color_array))){
              fills[y].color_array = fills[y].color_array.split(/([,])(?=#)|([,])(?=r)/);
            }

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
