'use strict';
angular.module('GenesisApp')
 .controller('datoscensodetallecontroller',['$scope','censoHttp','ngDialog','$controller',function($scope,censoHttp,ngDialog,$controller) {
  
  $scope.showTabpanelEvolution = function (tab){
         $controller('censohospitalariocontroller', {
            $scope: $scope
            });
          $scope.eventTabs(tab);
      }

}]);