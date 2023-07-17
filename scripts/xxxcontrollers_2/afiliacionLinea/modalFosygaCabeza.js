'use strict';
angular.module('GenesisApp')
   .controller('verfosyga', ['$scope', 'afiliacionHttp', '$http', 'notification', '$location', '$rootScope', '$timeout', 'communication', '$localStorage',
      function ($scope, afiliacionHttp, $http, notification, $location, $rootScope, $timeout, communication, $localStorage) {
         //alert("s");
         afiliacionHttp.obtenerEstado().then(function (response) {
            $scope.Estados = response;
         })
         afiliacionHttp.obtenerTipoAfiliado().then(function (response) {
            $scope.TipoAfiliado = response.Tipoafiliado;
         })
         afiliacionHttp.obtenerRegimen().then(function (response) {
            $scope.Regimen = response;
         })
         $http({
            method: 'POST',
            url: "php/aseguramiento/Rafiliacion.php",
            data: {
               function: 'obtenerentidad'
            }
         }).then(function (response) {
            $scope.Entidades = response.data;
         }, function errorCallback(response) {
          swal('Mensaje',response.data,'error')
        });
         $scope.noExiste=function(){
            $scope.adres_tipo_doc = $scope.adresdata_tipo_doc;
            $scope.adres_documento = $scope.adresdata_documento;
            $scope.adres_p_nombre = '';
            $scope.adres_s_nombre = '';
            $scope.adres_p_apellido = '';
            $scope.adres_s_apellido = '';
            $scope.adres_municipio = '';
            $scope.adres_regimen = '';
            $scope.adres_municipio = '';
            $scope.adres_estado = 'N';
            $scope.adres_entidad = '';
            $scope.adres_regimen = '';
            $scope.adres_tipo_afil = '';
            $scope.guardar();
         }
         swal({
            title: '¿Desea consultar los datos al servicio del ADRES?',
            text: "Este proceso puede tardar hasta 1 minuto dependiendo de la disponibiliada del servicio",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, consultar!',
            cancelButtonText: 'No, digitar manualmente!'
         }).then(function(result){
            if (result) {
               swal({
                  title: 'Consultado datos de ADRES',
                  allowEscapeKey:false
               });
               swal.showLoading();
               if ($scope.consulta_beneficiario === undefined || $scope.consulta_beneficiario == false) {
                  $scope.adresdata_tipo_doc = $scope.filtro.selectdocumento;
                  $scope.adresdata_documento = $scope.documento;
               }else{
                  $scope.adresdata_tipo_doc = $scope.bfiltro.bselectdocumento;
                  $scope.adresdata_documento = $scope.bdocumento;
               }
               afiliacionHttp.serviceFDC($scope.adresdata_tipo_doc,$scope.adresdata_documento , 'ObtenerFosyga').then(function(response) {
                  $scope.adres_result = response.data;
                  if ($scope.adres_result.IdRespuesta == 9) {
                     $scope.noExiste();
                  }
                  if ($scope.adres_result && $scope.adres_result.IdRespuesta == 0) {
                     $scope.enablefosyga = true;
                     // Establecer estado
                     switch($scope.adres_result.Estado) {
                        case "NO EXISTE":
                           $scope.adres_estado = 'N';
                        break;
                        case "FALLECIDO":
                           $scope.adres_estado = 'F';
                        break;
                        case "ACTIVO":
                           $scope.adres_estado = 'A';
                        break;
                        case "RETIRADO":
                           $scope.adres_estado = 'R';
                        break;
                        case "DESAFILIADO":
                           $scope.adres_estado = 'D';
                        break;
                        case "SUSPENDIDO":
                           $scope.adres_estado = 'S';
                        break;
                     }
                     $scope.adres_tipo_doc = $scope.adres_result.TipoDocumento;
                     $scope.adres_documento = Number($scope.adres_result.Documento);
                     swal('Completado', 'Datos de ADRES cargados correctamente', 'success');
                     // Llena fecha de afiliación
                     $scope.f_afiliacion = $scope.adres_result.FechaInicioAfiliacion.split("/");
                     $scope.adres_f_afiliacion = new Date($scope.f_afiliacion[2],$scope.f_afiliacion[1]-1,$scope.f_afiliacion[0]);
                     //Llena nombres
                     var nn = $scope.adres_result.Nombres.indexOf(" ");
                     $scope.adres_p_nombre = $scope.adres_result.Nombres.substr(0, nn);
                     $scope.adres_s_nombre = $scope.adres_result.Nombres.substr(nn+1, $scope.adres_result.Nombres.length);
                     // Llena apellidos
                     var nn = $scope.adres_result.Apellidos.indexOf(" ");
                     $scope.adres_p_apellido = $scope.adres_result.Apellidos.substr(0, nn);
                     $scope.adres_s_apellido = $scope.adres_result.Apellidos.substr(nn+1, $scope.adres_result.Apellidos.length);
                     // Filtra municipio
                     $scope.filtromunicipio = $scope.adres_result.Municipio;
                     // Establecer regimen
                     if ($scope.adres_result.Regimen == "CONTRIBUTIVO") {$scope.adres_regimen = "C"} else{$scope.adres_regimen = "S"}
                     // Establecer entidad 
                     $scope.filtroentidad = $scope.adres_result.EPS;
                     // Establecer tipo de afiliado
                     if ($scope.adres_result.TipoAfiliado == "CABEZA DE FAMILIA" ) {
                        $scope.adres_tipo_afil = "F";
                     }
                     if ($scope.adres_result.TipoAfiliado == "COTIZANTE" ) {
                        $scope.adres_tipo_afil = "C";
                     }
                     if ($scope.adres_result.TipoAfiliado == "BENEFICIARIO") {
                        $scope.adres_tipo_afil = "O";
                     }
                  }else{
                     swal('Advertencia', $scope.adres_result.Respuesta + '<br><br> Debe diligenciar los datos de afiliación de ADRES', 'warning');
                  }
               });
            }    
         },function(dismiss) {
            if (dismiss == "cancel") {
               $scope.adres_tipo_doc = "";
            }
         })

         $scope.validaEstado = function(){
            if ($scope.adres_estado == "N") {
               swal({
                  title: '¿El usuario existe en la base de datos del ADRES?',
                  type: 'question',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Si existe',
                  cancelButtonText: 'No existe'
               }).then(function(result){
                  if (result) {
                     $scope.noExiste();
                  }
               },function(dismiss) {
                  if (dismiss == "cancel") {
                     $scope.adres_estado = "";
                  }
               });
            }
         }
         // function casosEstadosFosyga() {
         //    //$scope.fentidad = 'CCF055';
         //    $scope.dsbEntidad = false;
         //    $scope.dsbRegimen = false;
         //    $scope.btnestado = false;
         //    $scope.enablef = false;
         //    switch ($scope.adres_estado) {
         //       case "N":
         //          $scope.aafiliaciondatef = new Date();
         //          $scope.fentidad = 'CCF055';
         //          $scope.dsbEntidad = true;
         //          $scope.dsbRegimen = true;
         //          $scope.enablef = true;
         //          break;
         //       case "F":
         //          $scope.aafiliaciondatef = new Date();
         //          $scope.entidadObligatoria = false;
         //          $scope.enablef = true;
         //          if ($scope.fentidad == 'CCF055' || $scope.fentidad == 'CCFC55') {
         //             $scope.btnestado = false;
         //          } else {
         //             $scope.btnestado = true;
         //          }
         //          break;
         //       case "A":
         //          $scope.entidadObligatoria = false;
         //          $scope.enablef = false;
         //          if ($scope.fentidad == 'CCF055' || $scope.fentidad == 'CCFC55') {
         //             $scope.enablef = false;
         //             //$scope.aafiliaciondatef = "";
         //          } else {
         //             $scope.aafiliaciondatef = new Date();
         //          }
         //          break;
         //       case "R":
         //          $scope.aafiliaciondatef = new Date();
         //          $scope.entidadObligatoria = true;
         //          $scope.enablef = true;
         //          break;
         //       case "D":
         //          $scope.aafiliaciondatef = new Date();
         //          $scope.entidadObligatoria = true;
         //          $scope.enablef = true;
         //          break;
         //       case "S":
         //          $scope.btnestado = true;
         //          notification.getNotification('warning', 'Estado del usuario suspendido, no podra continuar con la afiliacion', 'Notificacion');
         //          break;
         //       default:
         //          $scope.aafiliaciondatef = new Date();
         //          $scope.entidadObligatoria = false;
         //          $scope.fentidad = 'CCF055';
         //          $scope.dsbEntidad = true;
         //          $scope.dsbRegimen = true;
         //          $scope.enablef = true;
         //    }
         // }
         function formatDate(date) {
            if (String(date).length > 10) {
               var month = date.getUTCMonth() + 1;
               date = date.getDate() + "/" + month + "/" + date.getFullYear();
               return date;
            } else {
               return date;
            }
         }
         $scope.guardar = function(){
            $http({
               method:'POST',
               url:"php/aseguramiento/Cafiliacion.php",
               data: {
                  function:'insertarfosyga',
                  identificador:9999,
                  tipodoc:$scope.adres_tipo_doc,
                  documento:$scope.adres_documento,
                  primernombre:$scope.adres_p_nombre,
                  segundonombre:$scope.adres_s_nombre,
                  primerapellido:$scope.adres_p_apellido,
                  segundoapellido:$scope.adres_s_apellido,
                  fecnacimiento:$("#adres_f_nacimiento").val(),
                  fecafiliacion:$("#adres_f_afiliacion").val(),
                  departamento:'1',
                  municipio:$scope.adres_municipio,
                  estado:$scope.adres_estado,
                  entidad:$scope.adres_entidad,
                  regimen:$scope.adres_regimen,
                  tipoafiliado:$scope.adres_tipo_afil
               }
            }).then(function(response){
               if (response.data.codigo == 0) {
                  $scope.res = {
                     adres_tipo_doc : $scope.adres_tipo_doc,
                     adres_documento : $scope.adres_documento,
                     adres_p_nombre : $scope.adres_p_nombre,
                     adres_s_nombre : $scope.adres_s_nombre,
                     adres_p_apellido : $scope.adres_p_apellido,
                     adres_s_apellido : $scope.adres_s_apellido,
                     fecnacimiento : formatDate($scope.adres_f_nacimiento),
                     fecafiliacion : formatDate($scope.adres_f_nacimiento)
                  }
                  swal('Completado',response.data.mensaje, 'success');
                  $scope.closeThisDialog($scope.res);
               }else{
                  swal('Advertencia',response.data.mensaje, 'warning');
               }
            }, function errorCallback(response) {
             swal('Mensaje',response.data,'error')
           });
         }
      }
   ]);