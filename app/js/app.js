'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
	'ngRoute',
	'myApp.filters',
	'myApp.services',
	'myApp.directives',
	'myApp.controllers'
	]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/cardTable', {templateUrl: 'partials/cardTable.html', controller: 'MyCtrl1'});
	$routeProvider.when('/storeList', {templateUrl: 'partials/storeList.html', controller: 'MyCtrl2'});
	$routeProvider.when('/memberList', {templateUrl: 'partials/memberList.html', controller: 'MyCtrl3'});
	$routeProvider.otherwise({redirectTo: '/cardTable'});
}]);
