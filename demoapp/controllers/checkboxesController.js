	// create the controller and inject Angular's $scope
	myApp.controller('checkboxesController', function($scope) {
		// create a message to display in our view
		$scope.init = function(){
			$scope.data =
			{
			root : false,
			
			// two divisions ('Inside' + 'Outside')
			divisions :
				[{
				included : false,
				name : 'Inside',
				
				categories : [
				{
					name : 'Home Improvement',
					products : [
					{name : 'Boxcutter', included : true},
					{name : 'Hammer', included : null},
					{name : 'Screwdriver', included : false}
					]
				},
				
				{
					name : 'Painting',
					products : [
					{name : 'Red Paint', included : false},
					{name : 'Green Paint', included : true},
					{name : 'Blue Paint', included : null},
					{name : 'Coarse Brush', included : true}
					]
				}]
				},
				
				{
				included : false,
				name : 'Outside',
				
				categories : [
				{
					name : 'Garage Improvement',
					products : [
					{name : 'Axe', included : true},
					{name : 'Chainsaw', included : true},
					{name : 'Leaf Blower', included : false}
					]
				},
				
				{
					name : 'Car',
					products : [
					{name : 'Spare Tires', included : false},
					{name : 'Exhaustion Pipe', included : true},
					{name : 'Gearbox', included : null},
					{name : 'First Aid Kit', included : false}
					]
				}]
				}]
			}
		};
	});
