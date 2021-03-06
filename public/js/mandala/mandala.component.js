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
    vm.templates = appService.templates;
    vm.fills = appService.fills;
    vm.current_fill;
    vm.elements = [];
    vm.template_thumbnails = [];
    vm.current_file_path;
    vm.current_template_id;
    vm.paths;
    vm.stored_array;


    vm.$onInit = function() {
        let color_picker = document.getElementsByClassName('sp-replacer')[0];
        color_picker.className = 'sp-replacer show';
        vm.updateFill();
    }

    vm.updateFill = function() {
      appService.getTemplates().then(function(){
        vm.templates = appService.templates;
        appService.getFills().then(function(){
          vm.fills = appService.fills;
          for (let x = 0; x < vm.templates.length; x++){
            vm.colorThumbnails(vm.templates[x].file_path, x, vm.templates[x].id, vm.fills);
            if (vm.current_file_path && vm.current_template_id){
              vm.selectMandala(vm.current_template_id, vm.current_file_path);
            }
          }
        });
      })

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
              paths[x].style.fill = fills[y].color_array[x];
            }
          }
        }
      })
    }

    vm.clear = function(){
      console.log('clear');
        vm.empty_svg = document.getElementsByClassName('active_svg');
        let paths = vm.empty_svg[0].getElementsByClassName('st0');
        let new_array = [];
        for (let x = 0; x < paths.length; x++){
          new_array.push('#FFF');
        }
        appService.patchFill(vm.current_fill.fill_id, new_array.toString()).then(function(){
          vm.updateFill();
        });
      };


    vm.selectMandala = function(template_id, template_file_path){
      // console.log('selecting');
      vm.current_file_path = template_file_path;
      vm.current_template_id = template_id;
      $http.get(template_file_path).
      then(function onSuccess(response){
        vm.empty_svg = document.getElementsByClassName('active_svg');
        vm.empty_svg[0].innerHTML = response.data;
        let paths = vm.empty_svg[0].getElementsByClassName('st0');
        let has_fill = false;
        for (let y = 0; y < vm.fills.length; y++){
          if (vm.fills[y].template_id === template_id) {
            has_fill = true;
            vm.current_fill = vm.fills[y];
            if(!(Array.isArray(vm.fills[y].color_array))){
              vm.fills[y].color_array = vm.fills[y].color_array.split(/,(?!d| )/);
            }
            for (let x = 0; x < paths.length; x++){
              paths[x].style.fill = vm.fills[y].color_array[x];
              paths[x].addEventListener("click", vm.changeColor);
            }
            return;
          }
        }
        if (has_fill === false) {
          let new_color_array = [];
          for (let x = 0; x < paths.length; x++){
            new_color_array.push('#FFF');
          }
          let new_fill_obj = {
            color_array: new_color_array.toString(),
            template_id: template_id
          }
            appService.postFill(new_fill_obj).then(function(){
              vm.updateFill();
            });
          };
        });
      }

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
      vm.stored_array = vm.getPaths();
      let current_color = document.getElementById('colorpicker').value;
      this.style.fill = current_color;
      let new_array = vm.getPaths();
      appService.patchFill(vm.current_fill.fill_id, new_array.toString()).then(function(){
        vm.updateFill();
      });
    }

    vm.undo = function(){
      if (vm.stored_array){
        let new_array = vm.stored_array;
        appService.patchFill(vm.current_fill.fill_id, new_array.toString()).then(function(){
          vm.updateFill();
        });
      }
    }


  }
}());
