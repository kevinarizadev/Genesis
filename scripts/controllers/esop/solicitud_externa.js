'use strict';
   angular.module('GenesisApp',['toastr','chieffancypants.loadingBar'])
.config(function(cfpLoadingBarProvider) {
   cfpLoadingBarProvider.includeSpinner = false;
})
.controller('exesopctrl',['$scope','consultaHTTP','notification','$timeout','$rootScope','$http','$window','$filter','cfpLoadingBar',
   function($scope,consultaHTTP,notification,$timeout,$rootScope,$http,$window,$filter,cfpLoadingBar) {
      $scope.departamento = 'X';
      $scope.municipio = 'X';
      $scope.ipsreceptora = 'X';
      $scope.permanencia = '1';
      $scope.panelinfo = false;
      $scope.type = "SELECCIONAR";
      $scope.panelconsulta = false;
      $scope.panelsolicitud = false;
      $scope.panelbusqueda = true;
      $scope.obtenerDocumento = function () {
         consultaHTTP.obtenerDocumento().then(function (response) {
            $scope.Documentos = response;
         })
      }
      $scope.obtenerMunicipios = function(){
         $scope.municipio = 'X';
         $scope.ipsreceptora = 'X';
         $scope.function = 'cargamunicipios';
         swal({
            title: 'Cargando información',
            allowEscapeKey:false
         });
         swal.showLoading();
         $http({
            method:'POST',
            url:"php/esop/funcesop.php",
            data: {function:$scope.function,depa:$scope.departamento}
         }).then(function(response){
            $scope.Municipios = response.data;
            swal.close();
         });
      }
      $scope.obtenerDepartamentos = function(){
         $scope.function = 'cargadepartamentos';
         $http({
            method:'POST',
            url:"php/esop/funcesop.php",
            data: {function:$scope.function}
         }).then(function(response){
            $scope.Departamentos = response.data;
         });
      }
      $scope.obtenerIps = function(){
         $scope.ipsreceptora = 'X';
         $scope.function = 'cargaipsmunicipios';
         swal({
            title: 'Cargando información',
            allowEscapeKey:false
         });
         swal.showLoading();
         $http({
            method:'POST',
            url:"php/esop/funcesop.php",
            data: {function:$scope.function,muni:$scope.municipio,regimen:$scope.regimenafil}
         }).then(function(response){
            $scope.Ipss = response.data;
   			if ($scope.Ipss.length == 0){
   				$scope.dsbIps = true;
   			}else{
   				$scope.dsbIps = false;
   			}
            swal.close();
         });
      }
      $scope.solicitud = function(){
         if ($scope.type == "SELECCIONAR") {
            notification.getNotification('info','Seleccione tipo de documento','Notificación');
         }else if ($scope.id === undefined || $scope.id == "") {
            notification.getNotification('info','Ingrese número de documento','Notificación');
         }else{
            swal({
            title: 'Cargando información',
            allowEscapeKey:false
            });
            swal.showLoading();
            $http({
               method:'POST',
               url:"php/esop/funcesop.php",
               data: {function:'exverafiliado',type:$scope.type,id:$scope.id}
            }).then(function(response){
               $scope.regimenafil = response.data.REGIMEN;
               $scope.nombreafil = response.data.NOMBRE;
               $scope.correoafil = response.data.CORREO;
               if (response.data.RES == 'SP') {
                  $scope.consultar();
               }else if (response.data.RES == 'NA') {
                  notification.getNotification('info','Afiliado no se encuentra activo','Notificación');
                  $scope.panelsolicitud = false;
                  $scope.panelconsulta = false;
                  $scope.panelSA = false;
               }else if (response.data.RES == 'NE'){
                  $scope.panelsolicitud = false;
                  $scope.panelconsulta = false;
                  $scope.panelSA = false;
                  notification.getNotification('info','Afiliado no existe','Notificación');
               }else if (response.data.RES == 'SA') {
                  $scope.panelSA = true;
                  $scope.panelsolicitud = false;
                  $scope.panelconsulta = false;
               }else if (response.data.RES == 'SP') {
                  $scope.panelSA = false;
                  $scope.panelsolicitud = false;
                  $scope.panelconsulta = false;
                  $scope.consultar();
               }else if (response.data.RES == '0') {
                  $scope.panelSA = false;
                  $scope.panelsolicitud = true;
                  $scope.panelconsulta = false;
               }else{
                  $scope.consultar();
               }
               swal.close();
            });
         }
      }
      $scope.consultar = function(){
         $http({
            method:'POST',
            url:"php/esop/funcesop.php",
            data: {function:'exconsultaafil',type:$scope.type,id:$scope.id}
         }).then(function(response){
            $scope.afil_portabilidad = response.data["0"];
            if ($scope.afil_portabilidad == "" || $scope.afil_portabilidad === undefined) {
               $scope.panelconsulta = false;
            }else{
               $scope.panelconsulta = true;
            }
         });
      }
      $scope.solicitar = function(){
         if ($scope.ipsreceptora == 'X') {
            if ($scope.otraips == '' || $scope.otraips === undefined) {
               $scope.ips = 1;
            }else{
               $scope.ips = $scope.otraips;
            }
         }else{
            $scope.ips = $scope.ipsreceptora
         }
         if ($scope.municipio == 'X' || $scope.direccion == '' || $scope.localidad == '' || $scope.localidad == undefined || $scope.direccion == undefined || $scope.telfijo == '' || $scope.telfijo == undefined || $scope.correo == '' || $scope.correo == undefined) {
            notification.getNotification('info', 'Llene los campos requeridos', 'Notificación');
         }else{
            if ($scope.observacion === undefined || $scope.observacion == "") {
               $scope.observacion = "NINGUNA";
            }
            $scope.direccion=$scope.direccion+" "+$scope.localidad;
          
            $http({
               method:'POST',
               url:"php/esop/funcesop.php",
               data: {function:'guardasolicitud',ex:'Y'
                                                ,type:$scope.type
                                                ,id:$scope.id
                                                ,correo:$scope.correo
                                                ,municipio: $scope.municipio
                                                ,direccion: $scope.direccion
                                                ,telefono: $scope.telfijo
                                                ,tiempo: $scope.permanencia
                                                ,escenario: $scope.ips
                                                ,descripcion: $scope.observacion}
            }).then(function(response){
               if (response.data == "1") {
                  //notification.getNotification('success', 'Solicitud enviada correctamente', 'Notificación');
                  swal('Completado', 'Solicitud enviada correctamente', 'success');
                  if ($scope.correoafil == 'null') {
                     $scope.correodestino = $scope.correo;
                  }else{
                     $scope.correodestino = $scope.correoafil;
                  }
                  $http({
                     method:'GET',
                     url:"https://tusreservas.co/correos/notificacion_portabilidad.php",
                     params:{ destinocorreo:$scope.correodestino,
                              destinonombre:$scope.nombreafil}
                  }).then(function(res){
                     if (res.data == 1) {
                        alert('Se ha enviado un correo de notificación a: ' + $scope.correodestino);
                     }
                  })
                  $scope.panelsolicitud = false;
                  $scope.panelSA = true;
                  $scope.panelbusqueda = false;
               }else{
                  swal('Información', response.data, 'info');
                  //notification.getNotification('info', response.data, 'Notificación');
               }
            });
         }
      }
      $scope.salirSA = function(){
          window.location.href = 'https://www.cajacopieps.com'; 
      }
   }
]);