'use strict';
   angular.module('GenesisApp')
   .controller('adjuntocontroller',['$scope','notification','consultaHTTP','upload','afiliacionHttp','$http',
   function($scope,notification,consultaHTTP,upload,afiliacionHttp,$http) {
      $(document).ready(function () {
         
      });
      $scope.anexo = "0";
      $scope.tipoanexodis = true;
      $scope.seleccionarchivodis = true;
      $scope.subirdis  =true;
      $scope.obtenerAnexos = function () {
         consultaHTTP.obtenerTipodocumental($scope.tipo_documento,$scope.documento).then(function (response) {
            $scope.tiposDocumental = response;
         })
      }
      $scope.subirAdjunto = function () {
         if ($scope.anexo == "" || $scope.anexo == "SELECCIONAR") {
            swal('Advertencia','Seleccione el tipo de anexo que se va a cargar','warning')
            return;
         }
         var adjunto = $("#adjunto");
         swal({
            title: 'Confirmar',
            text: "¿Confirma el registro de un nuevo adjunto para el afiliado?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
         }).then((result) => {
            if (result) {
               var FR= new FileReader();
               FR.addEventListener("load", function(e) {
                  $scope.adjuntoafiliado = e.target.result;
                  var name = document.getElementById('adjunto').files[0].name;
                  $scope.adjuntoafiliadoext= name.split('.').pop();  
                  $http({
                     method:'POST',
                     url:"php/insertdoc.php",
                     data: {tipo_doc:$scope.tipo_documento,
                              id:$scope.documento,
                              typefile:$scope.anexo,
                              file:$scope.adjuntoafiliado,
                              type:$scope.adjuntoafiliadoext,
                              path:'/cargue_ftp/Digitalizacion/Genesis/Aseguramiento/'}
                  }).then(function(response){
                     if (response.data == 1) {
                        swal('Completado','Adjunto cargado exitosamente','success')
                        document.getElementById("anexos").reset();
                     }else{
                        swal('Mensaje','Error subiendo adjunto','error')
                     }
                  });                                                                     
               });
               FR.readAsDataURL(adjunto[0].files[0] );
            }
         })
      }
   }
]);