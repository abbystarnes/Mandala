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

    // vm.update_fill = function(fill_id) {
      // get new fill properties
      // send to db
    // }



    // vm.undo = function(){
    //   vm.currentpath.style.fill = vm.mem_fill;
    // }
    //
    // vm.save = function(){
    //   vm.colors = [];
    //   for (let x = 0; x < vm.paths.length; x++){
    //     if (vm.paths[x].style.fill){
    //       vm.colors.push(vm.paths[x].style.fill);
    //     } else {
    //       vm.colors.push('#fff');
    //     }
    //   }
    //   console.log(vm.colors);
    //   console.log(vm.colors.join(','));
    // }
    //let gs = document.getElementsByClassName('st0');
    // console.log(gs);
    //
    // let changeColor = function(){
    //   let current_color = document.getElementById('color').value;
    //   console.log(current_color, 'hey color', this);
    //   this.style.fill = current_color;
    // }
    //
    // for (let x = 0; x < gs.length; x++){
    //   gs[x].addEventListener("click", changeColor);
    // }

    vm.changeColor = function(){

      let current_color = document.getElementById('colorpicker').value;
      this.style.fill = current_color;

      vm.currentpath = this;
      if (this.style.fill){
        vm.mem_fill = this.style.fill;
      } else {
        vm.mem_fill = '#FFF';
      }

      vm.current_color = document.getElementById('colorpicker').value;
      this.style.fill = vm.current_color;
      appService.patchFill(vm.current_fill.id, vm.current_fill.color_array.toString());
      // vm.selectMandala = function(template_id, template_file_path);
    }
  }

}());
