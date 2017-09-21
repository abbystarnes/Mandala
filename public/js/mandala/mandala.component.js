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
    vm.current_fill;
    vm.elements = [];
    vm.templates = appService.templates;
    vm.fills = appService.fills;
    vm.template_thumbnails = [];
    vm.current_file_path;
    vm.current_template_id;

    vm.$onInit = function() {
      vm.updateFill();
    }

    vm.updateFill = function() {
      appService.getFills.then(function(data){
        appService.getTemplates.then( function(){
          for (let x = 0; x < vm.templates.length; x++){
            vm.createTemplateThumbnails(vm.templates[x].file_path, x, vm.templates[x].id, data, 'thumbnail');
          }
        });
      });
    }


    vm.selectMandala = function(template_id, template_file_path){
      vm.current_file_path = template_file_path;
      vm.current_template_id = template_id;
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
            if(!(Array.isArray(fills[y].color_array))){
              fills[y].color_array = fills[y].color_array.split(/([,])(?=#)|([,])(?=r)/);
            }
            vm.current_fill = fills[y];
            vm.dedup(fills[y].color_array);
            for (let x = 0; x < paths.length; x++){
              paths[x].style.fill = fills[y].color_array[x];
            }
            if (svg_class_name === 'active_svg'){
              for (let x = 0; x < paths.length; x++){
                paths[x].addEventListener("click", vm.changeColor);
              }
            }
          }
        }
      })
    }

    vm.counter = 0;
    vm.dedup = function(array){
      if(!array.length){
        return;
      }
      if(vm.counter >= array.length){
        return;
      }
      if (array[vm.counter] === undefined || array[vm.counter] === ","){
        array.splice(vm.counter, 1);
        return vm.dedup(array);
      } else {
        vm.counter ++;
        return vm.dedup(array);
      }
    }

    vm.changeColor = function(){
      let current_color = document.getElementById('colorpicker').value;
      this.style.fill = current_color;
      vm.active_svg = document.getElementsByClassName('active_svg');
      vm.active_svg = vm.active_svg[0];
      let updated_paths = vm.active_svg.getElementsByClassName('st0');
      // console.log(updated_paths, 'updated');
      let updated_paths_array = [];
      for (let x = 0; x < updated_paths.length; x++){
        if (updated_paths[x].style.fill) {
          updated_paths_array.push(updated_paths[x].style.fill);
        } else {
          updated_paths_array.push('#fff');
        }
      }
      // console.log(updated_paths_array);
      vm.currentpath = this;
      if (this.style.fill){
        vm.mem_fill = this.style.fill;
      } else {
        vm.mem_fill = '#FFF';
      }
      let newpromise = new Promise (function(resolve, reject){
        resolve(appService.patchFill(vm.current_fill.id, updated_paths_array.toString()));
      });
      newpromise.then(vm.updateFill());
    }
  }

}());
