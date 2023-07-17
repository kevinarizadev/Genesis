'use strict';
angular.module('GenesisApp').controller('autorizacionespendientes',['$scope','$sce',function($scope, $sce) {
    

    $scope.url_r = $sce.trustAsResourceUrl('');
    if (sessionStorage.getItem('dpto') == '1') {
$scope.url_r = $sce.trustAsResourceUrl('https://app.powerbi.com/view?r=eyJrIjoiMGUyMjg5NjYtNjFhNS00YTU1LWI2OTgtMzg1ZGFmMTcyM2IyIiwidCI6ImQ4ZWRiNTVmLWVlOGQtNGRmNi1iMGNjLTgwOTMxZTllNzQyOSJ9');
    } else {
    	$scope.url_r = $sce.trustAsResourceUrl('https://app.powerbi.com/view?r=eyJrIjoiMGUyMjg5NjYtNjFhNS00YTU1LWI2OTgtMzg1ZGFmMTcyM2IyIiwidCI6ImQ4ZWRiNTVmLWVlOGQtNGRmNi1iMGNjLTgwOTMxZTllNzQyOSJ9&UBICACION_DEPARTAMENTO='+sessionStorage.getItem('dpto'));
    }
    

}]);


