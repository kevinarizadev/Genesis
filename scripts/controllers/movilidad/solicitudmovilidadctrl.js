'use strict';
   angular.module('GenesisApp')
   .controller('solicitudmovilidadctrl',['$scope','consultaHTTP','notification','$timeout','$rootScope','$http','$window','ngDialog','$filter',
   function($scope,consultaHTTP,notification,$timeout,$rootScope,$http,$window,ngDialog,$filter) {
      $scope.inserpersonal = true;
      $scope.updapersonal = true;
      $scope.solafiliado = true;
      $scope.documento_empleado = "";
      $scope.tipo_documento_empleado = '0';

   $http({
         method: 'POST',
         url: "php/movilidad/funcmovilidad.php",
         data: {
            function: 'actulizarfecha90'
         }
      }).then(function (response) {
         if(response.data.coderror == 1){
            ngDialog.open({
            template: 'views/movilidad/actualizarinfoempresa.html',
            closeByDocument: false,
            closeByEscape: false,
            showClose:false,
            className: 'ngdialog-theme-plain',
            width: '80%',
            scope: $scope
         });
         }
          $scope.fechamod = response.data.mensaje;
      });

      $rootScope.$on('ngDialog.closed', function (e, $dialog) {
          $http({
         method: 'POST',
         url: "php/movilidad/funcmovilidad.php",
         data: {
            function: 'actulizarfecha90'
         }
      }).then(function (response) {
         if(response.data.coderror == 1){
            ngDialog.open({
            template: 'views/movilidad/actualizarinfoempresa.html',
            closeByDocument: false,
            closeByEscape: false,
            showClose:false,
            className: 'ngdialog-theme-plain',
            width: '80%',
            scope: $scope
         });
         }
          $scope.fechamod = response.data.mensaje;
      });
      });

      $scope.solicitud = {tipotramite : '0',
                        tipo_documento :'0',
                        asesor:'0',
                        lugar:'0'
                        }


      $.getJSON( "php/obtenersession.php")
      .done(function(respuesta) {
         $scope.sesdata = respuesta;
      })
      .fail(function( jqXHR, textStatus, errorThrown ) {
         console.log("Error obteniendo session variables");
      });
      $http({
         method: 'POST',
         url: "php/movilidad/funcmovilidad.php",
         data: {
            function: 'listaAsesores'
         }
      }).then(function (response) {
         $scope.asesores = response.data;
      });
               $http({
         method: 'POST',
         url: "php/movilidad/funcmovilidad.php",
         data: {
            function: 'listarSedes'
         }
      }).then(function (response) {
         $scope.lugares = response.data;
      });

      $scope.actualizarinformacionemp = function(){
         ngDialog.open({
            template: 'views/movilidad/actualizarinfoempresa.html',
            closeByDocument: false,
            closeByEscape: false,
            showClose:false,
            className: 'ngdialog-theme-plain',
            width: '80%',
            scope: $scope
         });
      }

      $scope.newAfiliado = function(){
         $scope.dialogNewAfil = ngDialog.open({
            template: 'views/movilidad/modal/modalAfiliar.html',
            className: 'ngdialog-theme-plain',
            controller: 'modalAfiliarCtrl',
            scope: $scope
         });
      }

      $scope.busquedaEmpleado = function(){
         $scope.panelinfoafiliado = false;
         swal({
            title: 'Guardando información'
         });
         swal.showLoading();
         $http({
            method: 'POST',
            url: "php/movilidad/funcmovilidad.php",
            data: {
               function: 'consultaEmpleado',
               tipodocumento: $scope.tipo_documento_empleado,
               documento: $scope.documento_empleado,
            }
         }).then(function (response) {
            swal.close();
            if (response.data.coderror == 0) {
               $scope.inserpersonal = false;
               $scope.updapersonal = true;
               $scope.registrarmensaje = response.data.mensaje;
            } else {
               $scope.nombre =  response.data[0].nombre;
               $scope.direccion_emp =  response.data[0].direccion;
               $scope.sede_emp =  response.data[0].sede;
               $scope.contacto =  response.data[0].contacto;
               $scope.updapersonal = false;
               $scope.inserpersonal = true;
            }
         });
      }

      $scope.registraEmpleado = function(){
         if ($scope.solicitud.lugar == "0" || $scope.nombre_empleado == "" || $scope.nombre_empleado === undefined) {
            swal('Información','Ingrese la información completa para finalizar el registro','info')
         }else{
            $http({
               method: 'POST',
               url: "php/movilidad/funcmovilidad.php",
               data: {
                  function: 'registraEmpleado',
                  tipodocumento: $scope.tipo_documento_empleado,
                  documento: $scope.documento_empleado,
                  sede: $scope.solicitud.lugar,
                  nombre: $scope.nombre_empleado,
                  tipo: 'I',
                  correo: $scope.correo_empleado
               }
            }).then(function (response) {
               if (response.data.coderror == "1") {
                  swal('Completado',response.data.mensaje,'success')
                  $scope.busquedaEmpleado();
               }else{
                  swal('Información',response.data.mensaje,'error')
               }
            });
         }
      }

      $scope.busquedaAfiliado = function(tipo,numero){
         if ($scope.solicitud.tipo_documento == "0" || $scope.solicitud.tipo_documento === null) {
            notification.getNotification('info','Seleccione tipo de documento','Notificación');
         }else if ($scope.solicitud.documento === undefined || $scope.solicitud.documento == "") {
            notification.getNotification('info','Ingrese número de identificación','Notificación');
         }else{
            $scope.fecha_env = $filter('date')(new Date($scope.solicitud.f_nacimiento), 'dd/MM/yyyy');
            $http({
               method: 'POST',
               url: "php/movilidad/funcmovilidad.php",
               data: {
                  function: 'obtenerAfiliado',
                  tipodocumento: $scope.solicitud.tipo_documento,
                  documento: $scope.solicitud.documento,
                  f_nacimiento: $scope.fecha_env
               }
            }).then(function (response) {
               if (response.data != "0" && response.data.DOCUMENTO != "") {
                  $scope.Data = response.data;
                  $scope.panelinfoafiliado = true;
               } else {
                  swal(
                     'Información',
                     'Datos no encontrados en nuestro sistema de información.',
                     'error'
                  )
                  $scope.panelinfoafiliado = false;
               }
            }, function errorCallback(response) {
               swal('Error','Error buscando el afiliado','warning')
            });
         }
      }

      $scope.subirAdjunto = function(){
         if ($scope.solicitud.asesor == "0" || $scope.solicitud.asesor === undefined) {
            notification.getNotification('info', 'Seleccione asesor', 'Información'); return;
         }
         if ($scope.nombreadjunto == "" || $scope.nombreadjunto === undefined) {
            notification.getNotification('info', 'Seleccione archivo adjunto', 'Información'); return;  
         }
         $scope.enviaSolicitud();
      }

      $scope.enviaSolicitud = function () {
         var formData = new FormData($("#formsolicitud")[0]);
         $.ajax({
            url: "php/movilidad/adjuntos/uplpckemp.php",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false
         }).then(function (response) {
            if (response != "0") {
               $scope.solicitud.ruta = response;
               $scope.solicitud.asesor_empresa = $scope.documento_empleado
               var dataGestion = JSON.stringify($scope.solicitud);
               $http({
                  method: 'POST',
                  url: "php/movilidad/funcmovilidad.php",
                  data: {
                     function: 'generaSolicitud',
                     data: dataGestion
                  }
               }).then(function (response) {
                  if (response.data.coderror == "1") {
                     swal(
                        'Completado',
                        'Solicitud generada correctamente, su número de radicado es: ' + '<b>'+response.data.radicado+'<b>',
                        'success'
                     )
                     //Notifica a empresa
                     $http({
                        method:'GET',
                        url:"php/mail/solicitudrecibidaemp.php",
                        params:{
                           radicado:response.data.radicado,
                           destinocorreo:$scope.sesdata.correoempresa,
                           destinonombre:$scope.sesdata.nombre,
                           nombreasesor:$('#idasesor option:selected').text(),
                           radicado:response.data.radicado
                        }
                     }).then(function(res){
                        console.log(res);
                     })
                     $('#formsolicitud')[0].reset();
                     $scope.updapersonal = true;
                     $scope.panelingresodatos = false;
                     $scope.panelinfoafiliado = false;
                     delete $scope.solicitud;
                     $scope.solicitud = { tipo_documento :'0',
                                          asesor:'0'
                                       }
                  }else{
                     swal('Información',response.data.mensaje,'info')
                  }
               }, function errorCallback(response) {
                  swal('Error','Error enviando solicitud','warning')
               });
            }else{
               swal(
                  'Error',
                  'Se presento un error al subir el archivo',
                  'info'
               )
            }
         });
      }
      $scope.ingresadatos = function(){
         $scope.panelingresodatos = true;
      }

      $scope.Obtener_Tipos_Documentos = function () {
         $http({
           method: 'POST',
           url: "php/genesis/funcgenesis.php",
           data: {
            function: 'Obtener_Tipos_Documentos',
            Tipo: 'S'
         }
         }).then(function (response) {
           if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.Tipos_Documentos = response.data;
         } else {
            swal({
             title: "¡Ocurrio un error!",
             text: response.data,
             type: "warning"
          }).catch(swal.noop);
         }
         });
      }
      $scope.Obtener_Tipos_Documentos();

   }
]);