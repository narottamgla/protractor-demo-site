	// create the module and name it myApp
	//var myApp = angular.module('myApp', ['ngRoute']);

	myApp.controller('registrationController', function($scope, $location, $localStorage) {
		$scope.init = function(){
			$scope.demoUsername = 'angular';
			$scope.demoPassword = 'password';
			$scope.username = '';
			$scope.password = '';

			if($localStorage.loggedin === true) {
				$location.path('/loggedin');
			}
		};

		$scope.login = function() {
			if($scope.demoUsername === $scope.username && $scope.demoPassword === $scope.password ) {
				$localStorage.loggedin = true;
				$location.path('/loggedin');
			} else {
				$scope.error = true;
			}
		};
	});
