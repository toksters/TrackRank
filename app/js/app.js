var app = angular.module('main', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);
app.config(function($routeProvider){
    $routeProvider.when("/", {templateUrl: "views/searchView.html",
                            controller: "searchCtrl"})
        .when("/rank", {templateUrl: "views/rankView.html",
                        controller: "rankCtrl"})
        .otherwise({templateUrl: "views/searchView.html",
                     controller: "searchCtrl"});
});


