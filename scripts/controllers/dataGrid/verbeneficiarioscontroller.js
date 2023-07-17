angular.module('GenesisApp')
.controller('verbeneficiarioscontroller',['$scope','$http','afiliacionHttp','notification',function($scope,$http,afiliacionHttp,notification) {
  $scope.gridOptions =
  {
      showGridFooter: true,
      showColumnFooter: false,
      enableFiltering: false,
      enableColumnResizing: true,
      paginationPageSizes: [10, 50, 75],
      paginationPageSize: 10,
      data: ""
   };
   $scope.paramentersverb = {
    tipo : $scope.filtro.selectdocumento,
    documento : $scope.documento
   };
  $scope.gridOptions.onRegisterApi = function(gridApi){
      $scope.gridApi = gridApi;
   };

   $scope.getBeneficiariosJson = function (){
     $http({
       method:'POST',
       url:"php/aseguramiento/Rafiliacion.php",
       data: {function:'obtenerbeneficiario',tipodoc:$scope.paramentersverb.tipo,documento:$scope.paramentersverb.documento}
     }).then(function(response){
       if (response.data=="null"){
          $scope.gridOptions.data =[];
          notification.getNotification('error','No se encontro beneficiario','Notificacion');
       }else{
          notification.getNotification('info','Cargando beneficiarios..','Notificacion');
          var datos = response.data;//JSON.parse('['+response["0"].Codigo+']');
          $scope.gridOptions.columnDefs = [
             { name: 'TIPODOCUMENTO' , displayName : 'Tipo', width: 110, headerTooltip : true,width : 60 },
             { name: 'DOCUMENTO', displayName : 'Documento', headerTooltip : true,width : 120},
             { name: 'AFILIADO', displayName : 'Nombre', width:400, headerTooltip : true},
             { name: 'SEXO', displayName : 'Sexo' , width:70},
             { name: 'FECHANACIMIENTO', displayName : 'Nacimiento', width:115, headerTooltip : true},
             { name: 'PARENTESCO', displayName : 'Parentesco', headerTooltip : true},
             { name: 'ETNIA', displayName : 'Etnia', headerTooltip : true,width:70},
             { name: 'DISCAPACIDAD', displayName : 'Discapacidad', headerTooltip : true},
             { name: 'MUNICIPIO', displayName : 'Municipio', headerTooltip : true},
             { name: 'ZONA', displayName : 'Zona', headerTooltip : true},
             { name: 'TELEFONO', displayName : 'Telefono', headerTooltip : true},
             { name: 'CELULAR', displayName : 'Celular', headerTooltip : true}
          ];
          $scope.gridOptions.data = datos;
          notification.getNotification('success','Completado','Notificacion');
       }
     });
  }
}]);
