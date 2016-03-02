var myApp = angular.module('myApp', ['ui.router', 'myApp.templates', 'ngAnimate', 'ui.bootstrap']);

myApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider){

  if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.common = {};
  }
  $httpProvider.defaults.headers.common["Cache-Control"] = "no-cache";
  $httpProvider.defaults.headers.common.Pragma = "no-cache";
  $httpProvider.defaults.headers.common["If-Modified-Since"] = "0";


  $urlRouterProvider.otherwise("/food");

  $stateProvider
  .state('food', {
  	url: "/food",
      controller: 'FoodController',
      templateUrl: 'views/food.html'
  });

}]);
