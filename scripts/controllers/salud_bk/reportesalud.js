'use strict';
angular.module('GenesisApp')
.controller('reportesalud',['$scope','consultaHTTP','notification','cfpLoadingBar','$http','$window','$filter',
   function($scope,consultaHTTP,notification,cfpLoadingBar,$http,$window,$filter) {
      $scope.seccional = 'X';
      $scope.regimen = 'X';
      $scope.inactive = true;
      $scope.tiporeporte = "0";
      $scope.shw_fecha_final = true;
      $scope.shw_fecha_inicio = true;
      $scope.shw_seccional = true;
      $scope.shw_prestador = true;
      $scope.shw_regimen = true;

      $scope.cargaSeccionalesS16 = function(){
         $http({
            method:'POST',
            url:"php/salud/reportes/cantidades.php",
            data:{function:'seccionaless16'}
         }).then(function(cantidad){
            $scope.Seccionales = cantidad.data;
         })
      }
      $scope.buscaReporte = function(val){
         switch(val) {
             case "SUF":
                  $scope.shw_fecha_final = false;
                  $scope.shw_fecha_inicio = false;
                  $scope.shw_prestador = true;
                  $scope.shw_seccional = false;
                  $scope.shw_regimen = false;
                  $scope.inactive = false;
                  $scope.shw_anno = true;
                  $scope.shw_mes = true;
                  break;
             case "RIPS PRESTADOR":
                  $scope.shw_fecha_final = false;
                  $scope.shw_fecha_inicio = false;
                  $scope.shw_prestador = false;
                  $scope.shw_seccional = true;
                  $scope.shw_regimen = true;
                  $scope.inactive = false;
                  $scope.shw_anno = true;
                  $scope.shw_mes = true;
                 break;
             case "3":
                  $scope.shw_fecha_final = true;
                  $scope.shw_fecha_inicio = true;
                  $scope.shw_prestador = true;
                  $scope.shw_seccional = true;
                  $scope.shw_regimen = true;
                  $scope.inactive = false;
                  $scope.shw_anno = false;
                  $scope.shw_mes = false;
                  break;
             default:
                 
         }
      }
      $scope.generaReporte = function(){
         // if ($scope.seccional == 'X' || $scope.regimen == 'X' || $scope.fecha_inicio === undefined || $scope.fecha_final === undefined) {
         //    notification.getNotification('info','Ingrese información requerida','Notificacion');
         // }else{
         var fecha_inicio = $filter('date')(new Date($scope.fecha_inicio), 'dd/MM/yyyy');
         var fecha_final = $filter('date')(new Date($scope.fecha_final), 'dd/MM/yyyy');
         if ($scope.tiporeporte == "RIPS PRESTADOR") {
            window.open('php/salud/reportes/rips_prestador.php?fecha_final='+fecha_inicio+
                                                               '&fecha_inicio='+fecha_final+
                                                               '&prestador='+$scope.prestador);
           
         }else if ($scope.tiporeporte == "SUF") {
            $http({
               method:'POST',
               url:"php/salud/reportes/cantidades.php",
               data:{function:'cantidads16',
                     fecha_final:fecha_final,
                     fecha_inicio:fecha_inicio,
                     seccional:$scope.seccional,
                     regimen:$scope.regimen}
            }).then(function(cantidad){
               $scope.total = cantidad.data["0"].CANTIDAD;
               if ($scope.total == '0') {
                  notification.getNotification('info','No se encontro dato para exportar','Notificacion');
               }else{
                  var retVal = confirm("Se van a exportar " + $scope.total + " registros. Desea continuar?");
                  if (retVal == true){
                     window.open('php/salud/reportes/suf16.php?fecha_final='+fecha_final+
                                                         '&fecha_inicio='+fecha_inicio+
                                                         '&seccional='+$scope.seccional+
                                                         '&regimen='+$scope.regimen);
                  } 
               }
            })
         }else if ($scope.tiporeporte == "3") {
            if ($scope.anno == "" || $scope.anno === undefined) {
               notification.getNotification('info','Digite el año','Notificación');
            }else if ($scope.mes == "" || $scope.mes === undefined) {
               notification.getNotification('info','Digite el mes','Notificación');
            }else{
               window.open('php/salud/reportes/descuentos_sp01.php?ANO='+$scope.anno+'&MES='+$scope.mes);
               window.open('php/salud/reportes/descuentos_sp02.php?ANO='+$scope.anno+'&MES='+$scope.mes);
               window.open('php/salud/reportes/descuentos_sp03.php?ANO='+$scope.anno+'&MES='+$scope.mes);
               window.open('php/salud/reportes/descuentos_sp04.php?ANO='+$scope.anno+'&MES='+$scope.mes);
               window.open('php/salud/reportes/descuentos_sp05.php?ANO='+$scope.anno+'&MES='+$scope.mes);

            }
         }
         
         //}
      }
   }
]);