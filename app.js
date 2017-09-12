const app = angular.module('helloworld', ['ui.router']);

app.config(function($stateProvider){
  const helloState = {
    name: 'hello',
    url: '/',
    template: '<h3>hello world!</h3>'
  }

  const aboutState = {
    name: 'about',
    url: '/about',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  }

  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
})
