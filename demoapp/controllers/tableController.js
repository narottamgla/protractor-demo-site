	// create the module and name it myApp
	//var myApp = angular.module('myApp', ['ngRoute']);

	// create the controller and inject Angular's $scope
	myApp.controller('tableController', function($scope, $uibModal, $log, $document) {
        
        $scope.animationsEnabled = true;
        $scope.rowCollection = [
            {firstName: 'Laurent', lastName: 'Renard', role: 'Sales Team', balance: 102, email: 'whatever@gmail.com', cellphone: '1114222333', isLocked: true},
            {firstName: 'Blandine', lastName: 'Faivre', role: 'Customer', balance: 2323.22, email: 'oufblandou@gmail.com', cellphone: '1145562333', isLocked: false},
            {firstName: 'Francoise', lastName: 'Frere', role: 'Admin', balance: 42343, email: 'raymondef@gmail.com', cellphone: '1114256333', isLocked: false},
            {firstName: 'James', lastName: 'Butterburg', role: 'Customer', balance: 2343, email: 'jamesbutterf@gmail.com', cellphone: '2414506333', isLocked: true},
            {firstName: 'Josephine', lastName: 'Darakjy', role: 'Sales Team', balance: 12343, email: 'jdarakjy@gmail.com', cellphone: '4114056333', isLocked: false},
            {firstName: 'Art', lastName: 'Chemel', role: 'Admin', balance: 4343, email: 'chemelart@gmail.com', cellphone: '1110455633', isLocked: false}
        ];

        $scope.removeRow = function (size, index, parentSelector) {
            var parentElem = parentSelector ? 
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'deleteModalContent.html',
                controller: 'deleteModalInstanceCtrl',
                controllerAs: '$ctrl',
                size: size,
                appendTo: parentElem,
                resolve: {
                    row: function () {
                        return size;
                    }
                }
            });

            modalInstance.result.then(function (row) {
                var index = $scope.rowCollection.indexOf(row);
                $scope.rowCollection.splice(index, 1);
            }, function () {
            });
        };

        $scope.updateRow = function (size, index, parentSelector) {
            var actualIndex = $scope.rowCollection.indexOf(size);
            var parentElem = parentSelector ? 
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'updateModalContent.html',
                controller: 'updateModalInstanceCtrl',
                controllerAs: '$ctrl',
                size: size,
                appendTo: parentElem,
                resolve: {
                    item: function () {
                        var updateObject = $scope.rowCollection[actualIndex];
                        return updateObject;
                    }
                }
            });

            modalInstance.result.then(function (userData) {
                $scope.rowCollection[actualIndex] = userData;
                $scope.displayedCollection = [].concat($scope.rowCollection);
            }, function () {
            });
        };        

        $scope.addrow = function (size, parentSelector) {
            var parentElem = parentSelector ? 
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'addModalContent.html',
                controller: 'addModalInstanceCtrl',
                controllerAs: '$ctrl',
                size: size,
                appendTo: parentElem,
                resolve: {
                }
            });

            modalInstance.result.then(function (user) {
                $scope.rowCollection.push(user);
            }, function () {
            });
        };
	});

myApp.controller('addModalInstanceCtrl', function ($uibModalInstance) {
    var $ctrl = this;

    $ctrl.init = function() {
        $ctrl.user = {};
        $ctrl.roles = ['Sales Team', 'Customer', 'Admin'];
        $ctrl.user.role = $ctrl.roles[0];
    };

    $ctrl.setOption = function(role) {
        $ctrl.user.role = role;
    };

    $ctrl.ok = function () {
        if($ctrl.user.isLocked === undefined)
            $ctrl.user.isLocked = false;
        $uibModalInstance.close($ctrl.user);
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

myApp.controller('updateModalInstanceCtrl', function ($uibModalInstance, item) {
    var $ctrl = this;

    $ctrl.init = function() {
        $ctrl.user = angular.copy(item);
        $ctrl.roles = ['Sales Team', 'Customer', 'Admin'];
        $ctrl.user.role = item.role;
    };

    $ctrl.setOption = function(role) {
        $ctrl.user.role = role;
    };

    $ctrl.ok = function () {
        if($ctrl.user.isLocked === undefined)
            $ctrl.user.isLocked = false;
        $uibModalInstance.close($ctrl.user);
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

myApp.controller('deleteModalInstanceCtrl', function ($uibModalInstance, row) {
    var $ctrl = this;

    $ctrl.ok = function () {
        $uibModalInstance.close(row);
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});