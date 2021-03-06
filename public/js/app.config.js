
(function() {
  'use strict';

  angular.module('myApp').config(config)

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']

  function config($stateProvider, $urlRouterProvider, $locationProvider){

    // this line is optional
    $locationProvider.html5Mode(true)

    $stateProvider
    .state({
        name: 'welcome',
        url: '/',
        component: 'welcome',
      })
    .state({
        name: 'mandala',
        url: '/mandala',
        component: 'mandala',
      })
      .state({
        name: 'login',
        url: '/login',
        component: 'login',
      })
      .state({
        name: 'signup',
        url: '/signup',
        component: 'signup',
      })
      // .state({
      //   name: 'login',
      //   parent: 'myApp',
      //   url: '/login',
      //   template: 'hi',
      // })
      // .state({
      //   name: 'editPost',
      //   parent: 'app',
      //   url: '/post/:id/edit',
      //   component: 'postEdit',
      //   params: {
      //     post: 'defaultValue',
      //   },
      // })


}



}());
