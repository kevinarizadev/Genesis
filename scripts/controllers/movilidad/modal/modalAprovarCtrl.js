'use strict'; 
   angular.module('GenesisApp')
   .controller('modalAprovarCtrl',['$scope','$http','consultaHTTP','$filter','ngDialog','cfpLoadingBar',
   function($scope,$http,consultaHTTP,$filter,ngDialog,cfpLoadingBar) {
      $scope.fileaprob = {}
      $scope.existFile = false;
      $scope.hdePanelConver = true;
      $scope.hdePanelInfo = false;
      $scope.isRolAprob = true;
      $scope.TipoArchivo="";
      $scope.mostrarsDoc=false;

   
      $http({
         method:'GET',
         url:"php/obtenersession.php",
      }).then(function(resp){
         if (resp.data.rolcod == "90" || resp.data.rolcod == "0") {
            $scope.isRolAprob = false
         }else{
            $scope.isRolAprob = true
         }
      });
     
      
      //refrescar la conversacion ya
      $scope.refreshConversacion = function(){
         swal({
            title: 'Cargando información...',
            allowEscapeKey : false,
            allowOutsideClick : false
         });
         swal.showLoading();
         $http({
            method: 'POST',
            url:"php/movilidad/funcmovilidad.php",
            data: {
               function: 'listaConversacion',
               v_tipo_documento: $scope.infoempresa.tidentificacion,
               v_documento: $scope.infoempresa.nidentificacion
            }
         }).then(function (response) {
            swal.close();
            $scope.Conversacion = response.data;
            $scope.Conversacion[0].cod_error == 0 ? (
               $scope.shwConversacion = false
            ) : (
               $scope.shwConversacion = true, 
               setTimeout(function() {$('#mensajes').scrollTop($('#mensajes').height()+450000000);}, 1000)
            )
            $scope.Conversacion[0].estado == "A" ? (
               $('#frmMensaje').find('input, textarea, button').attr('disabled',true),$scope.divAprobado = false
            ) : (
               $('#frmMensaje').find('input, textarea, button').attr('disabled',false),$scope.divAprobado = true
            )
         });
      }
      $scope.refreshConversacion ();
      //funcion lista ya
      $scope.apruebaArchivo = function(){ 
       
               $scope.enviarRespuesta();
               $scope.closeThisDialog();
         
      }
      
      
      //descargar archivo ya
      $scope.descargafile = function(ruta){
         $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: {
               function: 'descargaAdjunto',
               ruta: ruta
            }
         }).then(function (response) {
            //window.open("https://genesis.cajacopieps.com//temp/"+response.data);
            window.open("temp/"+response.data);
         });
      }

      // Seleciona Archivo para descargar
      $scope.seleccionaFile = function(){
         $('#archivoVb').trigger('click');
      }

      //enviar mensaje ya
      $scope.enviaMensaje = function(){
         // if ($scope.TipoArchivo == 0) {
         //    swal('Advertencia','El tipo de archivo debe ser seleccionado','warning');
         //    return;
         // }
          $scope.v_ruta="";
          $scope.estado='R';
          $scope.descripcion=$scope.fileaprob.mensaje;
             $http({
                method:'POST',
                url:"php/movilidad/funcmovilidad.php",
                data: {function:'enviar_respuesta',
                        v_numero_empresa:$scope.nreguistro,
                        v_ubicacio:$scope.codigoUbicacion,
                        v_accion:$scope.estado,
                        v_comentario:$scope.descripcion,
                        v_ruta:$scope.v_ruta,
                        v_tipo_archivo:$scope.TipoArchivo}
            }).then(function(response){
                 if (response.data.codigo==0) {
                     swal('Completado',response.data.mensaje,'success');
                     $scope.fileaprob.mensaje="";
                      $scope.refreshConversacion();
                  }else{
                     swal('Información',response.data.mensaje,'error');
                      $scope.refreshConversacion();

                }
            })  
      }
   }
]);