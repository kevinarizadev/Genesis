'use strict';
   angular.module('GenesisApp')
   .controller('panelvbctrl',['$scope','$http','consultaHTTP','$filter','ngDialog','cfpLoadingBar',
   function($scope,$http,consultaHTTP,$filter,ngDialog,cfpLoadingBar) {
      $scope.fileaprob = {}
      $scope.existFile = false;
      $scope.hdePanelConver = true;
      $scope.hdePanelInfo = false;
      $scope.isRolAprob = true;
      $http({
         method: 'POST',
         url: "php/juridica/tutelas/functutelas.php",
         data: {
            function: 'listaArchivosRespuesta'
         }
      }).then(function (response) {
         $scope.Archivos = response.data;
      });
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
      $scope.changeFile = function(){
         $scope.file = {selected:$('#archivoVb')[0]}
         if ($scope.file.selected.files.length > 0) {
            if($('#archivoVb')[0].files[0].size > 7340032){
               swal('Advertencia','El archivo excede el peso limite (7 MB)','warning')
               $('#archivoVb')[0].value = "";
               cfpLoadingBar.complete();
               return;
            }
            cfpLoadingBar.start();
            $scope.existFile = true;
            $scope.fileName = $scope.file.selected.files["0"].name;
            var FR= new FileReader();
            FR.addEventListener("load", function(e) {  
               $scope.fileaprob.adjunto = e.target.result;
               var name = document.getElementById('archivoVb').files[0].name;
               $scope.fileaprob.adjuntoext= name.split('.').pop();             
            });
            FR.readAsDataURL( document.getElementById('archivoVb').files[0] );
            $('#btnDum').trigger('click');
            cfpLoadingBar.complete();
         }else{
            $scope.fileName = '';
            $scope.existFile = false;
            $scope.fileaprob.adjunto = '';
            $scope.fileaprob.adjuntoext = '';
         }
      }
      $scope.refreshConversacion = function(){
         swal({
            title: 'Cargando información...',
            allowEscapeKey : false,
            allowOutsideClick : false
         });
         swal.showLoading();
         $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: {
               function: 'listaConversacion',
               codigotutela: $scope.registro.codigotutela,
               tipoarchivo: $scope.focusArchivo
            }
         }).then(function (response) {
            $scope.Conversacion = response.data;
            $scope.Conversacion[0].cod_error == 0 ? (
               $scope.shwConversacion = false
            ) : (
               $scope.shwConversacion = true, 
               setTimeout(function() {$('#mensajes').scrollTop($('#mensajes').height()+2000);}, 1000)
            )
            $scope.Conversacion[0].estado == "A" ? (
               $('#frmMensaje').find('input, textarea, button').attr('disabled',true),$scope.divAprobado = false
            ) : (
               $('#frmMensaje').find('input, textarea, button').attr('disabled',false),$scope.divAprobado = true
            )
            swal.close();
         });
      }
      $scope.apruebaArchivo = function(){
         swal({
            title: 'Confirmar',
            text: "¿Confirma aprobación de documento?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
         }).then((result) => {
            if (result) {
               $http({
                  method: 'POST',
                  url: "php/juridica/tutelas/functutelas.php",
                  data: {
                     function: 'apruebaArchivo',
                     codigotutela: $scope.registro.codigotutela,
                     tipoarchivo: $scope.focusArchivo
                  }
               }).then(function (response) {
                  $scope.refreshConversacion();
               });
            }
         })
      }
      $scope.highlight = function(a){
         $scope.focusArchivo = a;
         $("#"+a).addClass('highlight').siblings().removeClass('highlight');
         if (a != "") {
            $scope.refreshConversacion();
            $scope.hdePanelConver = false;
            $scope.hdePanelInfo = true;
         }
      }
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
      $scope.seleccionaFile = function(){
         $('#archivoVb').trigger('click');
      }
      $scope.enviaMensaje = function(){
         $http({
            method: 'POST',
            url: "php/upload_file/upload.php",
            data: {
               constutela: $scope.registro.codigotutela,
               path: '/cargue_ftp/Digitalizacion/Genesis/Tutelas',
               type: $scope.fileaprob.adjuntoext,
               file: $scope.fileaprob.adjunto,
               db: 'APRE01',
               typefile: $scope.focusArchivo,
               mensaje: $scope.fileaprob.mensaje,
               ori: $scope.existFile
            }
         }).then(function (response) {
            if (response.data.codigo == "1") {
               $scope.fileName="";
               $scope.refreshConversacion();
               $('#frmMensaje')[0].reset();
               $scope.changeFile();
            }
         });   
      }
   }
]);