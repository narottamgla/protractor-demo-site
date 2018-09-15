	// create the module and name it myApp
	//var myApp = angular.module('myApp', ['ngRoute']);

	myApp.controller('loggedinController', function($scope, $location, $localStorage) {

		$scope.init = function() {
			if($localStorage.loggedin === true) {
				$location.path('/loggedin');
			} else {
				$location.path('/registration');
			}
		};

		$scope.gotoRegister = function() {
			$localStorage.loggedin = false;
			$location.path('/registration');
		};
	});