(function() {
  "use strict";
  myApp.controller('mainCtrl',mainCtrl);

function mainCtrl ($scope,$state,mockLoader){
    $scope.home = function() {
         $state.transitionTo('main.options');
        }
    $scope.byebye = function() {
         $state.transitionTo('main.custView');
        }
                
}

mainCtrl.$inject = ['$scope','$state','mockLoader'];

})();