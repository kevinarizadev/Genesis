//"https://app.powerbi.com/view?r=eyJrIjoiOGRmMTA1YWMtZDIwOS00OTI2LThmYTQtYjIxNGRiZmQ2Y2VhIiwidCI6ImQ4ZWRiNTVmLWVlOGQtNGRmNi1iMGNjLTgwOTMxZTllNzQyOSJ9&pageName=ReportSectione5fae594b904205397c2"

'use strict';
angular.module('GenesisApp').controller('tablerodegestion',['$scope','$http','$sce',function($scope, $http, $sce) {
    

$http({
    method:'POST',
    url:"../php/PBI/PBI.php",
    data: {function:'inserta_auditoria',modelo:'Plan Vacunacion'}
  }).then(function(response){
  	console.log("Auditoria insertada");
  })

   $scope.url_r = $sce.trustAsResourceUrl('https://app.powerbi.com/view?r=eyJrIjoiOGRmMTA1YWMtZDIwOS00OTI2LThmYTQtYjIxNGRiZmQ2Y2VhIiwidCI6ImQ4ZWRiNTVmLWVlOGQtNGRmNi1iMGNjLTgwOTMxZTllNzQyOSJ9&pageName=ReportSectione5fae594b904205397c2');    
}]);


