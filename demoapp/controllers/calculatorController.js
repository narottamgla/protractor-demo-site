	// create the controller and inject Angular's $scope
	myApp.controller('calculatorController', function($scope) {
		// create a message to display in our view
		$scope.init = function() {
			$scope.expressionOne = '';
			$scope.expressionTwo = '';
			$scope.output = 0;
			$scope.results = [];
			$scope.operators = ['+', '-', '/', '*', '%'];
			$scope.operator = $scope.operators[0];
		};

		$scope.clearValues = function() {
			$scope.expressionOne = '';
			$scope.expressionTwo = '';
		};

		$scope.setOption = function(operator) {
			$scope.operator = operator;
		};

		$scope.getResult = function() {
			var temp = {};
			temp.time = Date.now();;
			temp.expression = $scope.expressionOne + ' ' +  $scope.operator + ' ' + $scope.expressionTwo;
			switch($scope.operator){
				case '+':
					temp.result = parseInt($scope.expressionOne) + parseInt($scope.expressionTwo);
					break;
				case '-':
					temp.result = parseInt($scope.expressionOne) - parseInt($scope.expressionTwo);
					break;
				case '/':
					temp.result = parseInt($scope.expressionOne) / parseInt($scope.expressionTwo);
					break;
				case '*':
					temp.result = parseInt($scope.expressionOne) * parseInt($scope.expressionTwo);
					break;
				case '%':
					temp.result = parseInt($scope.expressionOne) % parseInt($scope.expressionTwo);
					break;																				
			}
			$scope.results.push(temp);
			$scope.output = temp.result;
			$scope.clearValues();
		};
	});
