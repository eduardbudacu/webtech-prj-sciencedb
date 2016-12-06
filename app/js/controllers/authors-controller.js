let ctrl = angular.module('authorsController', ['ui.router'])

ctrl.controller('authorsController', ['$scope', function($scope) {
    $scope.authors = [{
        name: 'aaa',
        email: 'a@a.c'
    }, {
        name: 'bb',
        email: 'bb@a.com'
    }]
}])
