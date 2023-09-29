'use strict';
angular.module('GenesisApp').controller('kpitutelas',['$scope','$sce',function($scope, $sce) {
    

    $scope.url_r = $sce.trustAsResourceUrl('');
    $scope.seccional = sessionStorage.getItem('dpto') ;
     if ($scope.seccional == '1') {
		$scope.url_r = $sce.trustAsResourceUrl('https://app.powerbi.com/view?r=eyJrIjoiMjc5NjRjZmYtN2Q3Yy00YzM5LTgyOTctZWQwZDBhYzJkOGUwIiwidCI6ImQ4ZWRiNTVmLWVlOGQtNGRmNi1iMGNjLTgwOTMxZTllNzQyOSJ9&pageName=ReportSectionbf491125e5ea93b918a4');
		//$scope.url_r = $sce.trustAsResourceUrl('https://app.powerbi.com/view?r=eyJrIjoiMjc5NjRjZmYtN2Q3Yy00YzM5LTgyOTctZWQwZDBhYzJkOGUwIiwidCI6ImQ4ZWRiNTVmLWVlOGQtNGRmNi1iMGNjLTgwOTMxZTllNzQyOSJ9&pageName=ReportSectionbf491125e5ea93b918a4');
    } else {
    	$scope.url_r = $sce.trustAsResourceUrl('https://app.powerbi.com/view?r=eyJrIjoiMjc5NjRjZmYtN2Q3Yy00YzM5LTgyOTctZWQwZDBhYzJkOGUwIiwidCI6ImQ4ZWRiNTVmLWVlOGQtNGRmNi1iMGNjLTgwOTMxZTllNzQyOSJ9&pageName=ReportSectionbf491125e5ea93b918a4&CODIGO_SECCIONAL_AFILIADO='+$scope.seccional);
    	
    }
    

}]);


