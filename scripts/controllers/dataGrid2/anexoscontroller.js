angular.module('GenesisApp')
.controller('anexoscontroller',['$scope','afiliacionHttp','notification',function($scope,afiliacionHttp,notification) {
   $scope.gridOptions = 
 	{  
		showGridFooter: true,
   	showColumnFooter: false,
   	enableFiltering: false,
   	paginationPageSizes: [10, 50, 75],
      paginationPageSize: 10,
      enableColumnResizing: true
   }; 	
   $scope.gridOptions.onRegisterApi = function(gridApi){
      $scope.gridApi = gridApi;
   };
   $scope.cleargrid = function() {
       $scope.gridOptions.data =[];
     }
	 
   $scope.refresh = function(){
      $scope.gridApi.core.handleWindowResize();
      $scope.gridApi.core.refresh();
   }
   $scope.getParameterst = function (tipo, documento){

	   afiliacionHttp.showAttach(tipo,documento).then(function(response){
         if (response["0"].Codigo=="null"){
            $scope.gridOptions.data =[];
         }else{
            var datos = JSON.parse('['+response["0"].Codigo+']');
            $scope.gridOptions.columnDefs = [
               { name: 'TIPODOCUMENTO', displayName : 'Tipo', headerTooltip : true, width : 60},
               { name: 'AFILIADO', displayName : 'Documento', headerTooltip : true, width : 120/*,cellTooltip: 'Nombre'*/},
               { name: 'TIPO', displayName : 'Afiliado', headerTooltip : true, width : 125},
               { name: 'DOCUMENTO', displayName : 'Anexo', headerTooltip : true, width : 230},
               { name: 'FECHA' , displayName : 'Fecha Anexo', headerTooltip : true, width : 115},
               { name: 'ESTADO', displayName : 'Estado' , headerTooltip : true, width : 100},
               { name: 'OBSERVACION' , displayName : 'Observación', headerTooltip : true},
               { name: 'RUTA' , displayName : 'Anexo',cellTemplate: '<center><a href="php/getAnexo.php?ruta={{COL_FIELD}}" target="_blank">Ver</a></center>', headerTooltip : true}
            ];
            $scope.gridOptions.data = datos;
         }
    	});
	}
}]);