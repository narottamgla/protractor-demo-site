(function() {
  "use strict";
  myApp.controller('bankingCtrl',bankingCtrl);

function bankingCtrl ($scope,$state,mockLoader) {  
    mockLoader.loadData();
    $state.transitionTo('main.options');
}
bankingCtrl.$inject = ['$scope','$state','mockLoader'];

})();