'app strict'
let app = angular.module('myApp', ['ui.router', 'authorsController'])

app.config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/dashboard')
    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            template : '<h2>Dashboard</h2>'
        })
        .state('authors', {
            url: '/authors',
            templateUrl: 'views/authors.html',
            controller: 'authorsController'
        })
        .state('reports', {
            url: '/reports',
            template : '<h2>Rapoarte de cercetare</h2> in constructie'
        })
        .state('thesis', {
            url: '/thesis',
            template : '<h2>Teza</h2> in constructie'
        })
        .state('goals', {
            url: '/goals',
            template : '<h2>Obiective</h2> in constructie'
        })
        .state('activities', {
            url: '/activities',
            template : '<h2>Activitati</h2> in constructie'
        })
}])