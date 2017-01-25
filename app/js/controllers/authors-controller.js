'use strict'
let authorsController = angular.module('authorsController', [])

authorsController.controller('authorsController', ['$scope', function($scope) {
    $scope.authors = [{
        name: 'aaa',
        email: 'a@a.c'
    }, {
        name: 'bb',
        email: 'bb@a.com'
    }]
}])
