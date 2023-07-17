'use strict';
angular.module('GenesisApp')
.controller('hojadelsisben',['$http','$timeout','$scope','ngDialog','consultaHTTP','afiliacionHttp','notification','cfpLoadingBar','$rootScope','$controller','communication',
function($http,$timeout,$scope,ngDialog,consultaHTTP,afiliacionHttp,notification,cfpLoadingBar,$rootScope,$controller,communication) {

  //Servicio Al DNP=tipodocumento
$scope.Nombres;
$scope.Apellidos;
$scope.TipoDocumentoSisben;
$scope.DocumentoSisben;
$scope.Sisben;
$scope.PuntajeSisben;
$scope.FichaSisben;
$scope.CodigoMunicipio;
$scope.Area;
$scope.FechaModificacion;
$scope.FechaModificacionPersona;
$scope.Municipio;
$scope.Departamento;
$scope.Antiguedad;
$scope.Estado;
$scope.AdminNombre;
$scope.AdminDireccion;
$scope.AdminCorreo;
$scope.AdminTelefonos;

$scope.GuardarSisben=function(){
  var node = document.getElementById("Impri").firstElementChild.parentNode;
  domtoimage.toPng(node)
  .then(function (dataUrl) {
    $scope.Archivo= new Image();
    $scope.Archivo= dataUrl;
    $http({
      method:'POST',
      url:"php/insertdoc.php",
      data: {tipo_doc:$scope.TipoDocumentoSisben,
        id:$scope.DocumentoSisben,
        typefile:'16',
        file:$scope.Archivo,
        type:'png',
        path:'/cargue_ftp/Digitalizacion/Genesis/Aseguramiento/'}
      }).then(function(response){
        if (response.data == 1) {
          swal({
            title: 'Completado',
            text: 'Adjunto cargado exitosamente',
            type: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
          }).then(function(result){
            if (result) {
              $scope.estado='A';
              $http({
                method:'GET',
                url:"php/nucleofamiliar/cambiaestado.php",
                params: { estado:$scope.estado,
                  documento:$scope.DocumentoSisben}
                }).then(function(res){
                  $scope.closeThisDialog();
                  console.log(res.data);
                })
              }
            });
        }else{
          swal('Mensaje','Error subiendo adjunto','error')
        }
      })
    }).catch(function (error) {
      console.log('oops, something went wrong!');
    });
}
  $scope.Imprimir = function(Impri) {
      var innerContents = document.getElementById('Impri').innerHTML;
      var popupWinindow = window.open('', '_blank', 'width=1100,height=1100,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWinindow.document.open();
      popupWinindow.document.write('<html><head><link rel="stylesheet" href="styles/nucleofamiliar.css"></head><body onload="window.print()">'+innerContents+'</html>');
      popupWinindow.document.close();
  }
}
]);
