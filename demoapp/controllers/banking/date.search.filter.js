(function() {
  'use strict';
  myApp.filter('sDate',sDate);
  
  function sDate() {
    return function(items,start,end) {
      var filtered = [];
      angular.forEach(items, function(item) {
        if(item.date >= start && item.date <= end) {
          filtered.push(item);
        }
      });
      return filtered;
    };
  }

})();