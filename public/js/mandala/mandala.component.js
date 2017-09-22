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
    // vm.current_fill;
    vm.elements = [];
    vm.templates = appService.templates;
    vm.fills = appService.fills;
    vm.template_thumbnails = [];
    vm.current_file_path;
    vm.current_template_id;

    vm.$onInit = function() {
      appService.getFills.then(function(data){
        appService.getTemplates.then( function(){
          for (let x = 0; x < vm.templates.length; x++){
            vm.colorThumbnails(vm.templates[x].file_path, x, vm.templates[x].id, data);
          }
        });
      });
    }

    vm.selectMandala = function(template_id, template_file_path){
      // vm.current_file_path = template_file_path;
      // vm.current_template_id = template_id;
      // vm.createTemplateThumbnails(template_file_path, 0, template_id, vm.fills);
    }

    vm.colorThumbnails = function(template_url, index, template_id, fills){
      $http.get(template_url).
      then(function onSuccess(response){
        vm.empty_svgs = document.getElementsByClassName('thumbnail');
        vm.empty_svgs[index].innerHTML = response.data;
        for (let y = 0; y < fills.length; y++){
          if (fills[y].template_id === template_id) {
            let paths = vm.empty_svgs[index].getElementsByClassName('st0');
            if(!(Array.isArray(fills[y].color_array))){
              fills[y].color_array = fills[y].color_array.split(/,(?!d| )/);
            }
            for (let x = 0; x < paths.length; x++){
              // console.log(paths[x], fills[y].color_array[x]);
              paths[x].style.fill = fills[y].color_array[x];
            }
          }
        }
      })
    }
        // let found_fill = false;
    // if (svg_class_name === 'active_svg'){
    //   console.log('active svg has fill array');
    //   for (let x = 0; x < paths.length; x++){
    //     paths[x].addEventListener("click", vm.changeColor);
    //   }
    // }
    // if (!found_fill && svg_class_name === 'active_svg'){
    //   let new_color_array = [];
    //   let paths = vm.empty_svgs[index].getElementsByClassName('st0');
    //   for (let x = 0; x < paths.length; x++){
    //     new_color_array.push('#FFF');
    //   }
    //   let new_fill_obj = {
    //     color_array: new_color_array.toString(),
    //     template_id: vm.current_template_id
    //   }
    //   let newpromise = new Promise (function(resolve, reject){
    //     console.log('running');
    //     resolve(appService.postFill(1, new_fill_obj));
    //   });
    //   newpromise.then(vm.updateFill());
    // }
    // found_fill = false;


    vm.getPaths = function(){
      vm.active_svg = document.getElementsByClassName('active_svg');
      vm.active_svg = vm.active_svg[0];
      let updated_paths = vm.active_svg.getElementsByClassName('st0');
      let updated_paths_array = [];
      for (let x = 0; x < updated_paths.length; x++){
        if (updated_paths[x].style.fill) {
          updated_paths_array.push(updated_paths[x].style.fill);
        } else {
          updated_paths_array.push('#fff');
        }
      }
      return updated_paths_array;
    }

    vm.changeColor = function(){
      let current_color = document.getElementById('colorpicker').value;
      this.style.fill = current_color;
      let new_array = vm.getPaths();
      // console.log(updated_paths_array);
      vm.currentpath = this;
      if (this.style.fill){
        vm.mem_fill = this.style.fill;
      } else {
        vm.mem_fill = '#FFF';
      }
      let newpromise = new Promise (function(resolve, reject){
        resolve(appService.patchFill(vm.current_fill.id, new_array.toString()));
      });
      newpromise.then(vm.updateFill());
    }
  }

}());
