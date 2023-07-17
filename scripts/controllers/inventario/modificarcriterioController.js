'use strict';
angular.module('GenesisApp')
.controller('modificarcriterioController',['$scope','notification','$location', '$rootScope','$timeout','communication','$localStorage','inventarioHttp',
function($scope,notification,$location,$rootScope,$timeout,communication,$localStorage,inventarioHttp) {
  var self=this;
  //$scope.preguntam = "";
  //$scope.estadom ="0"
  $scope.observacionm = "";
  $scope.obligatoriom = "";
  $scope.cont = 1;
  $scope.idmodal = $scope.temp_id;
  $scope.numpre =$scope.temp_numpregunta;
  $scope.preguntam = $scope.temp_criterio
  //$scope.estadom = $scope.temp_estadocod;
  $scope.obligatoriom = $scope.temp_requerido;
  $scope.estadonom = $scope.temp_estado;
  $scope.observacionm = $scope.temp_observacion;
  //$scope.existenciam = $scope.temp_existencia;

  $scope.tamlista = $scope.temp_inventario.length;

  $scope.listaexistencia = $scope.temp_inventario[$scope.idmodal].Motivo;
  $scope.existenciam = $scope.temp_existencia;
  $scope.Valoracionesm = $scope.temp_estatus;
  $scope.estadom = $scope.temp_estadocod;
  setTimeout(function () {
    if ($scope.estadom==$scope.listaexistencia["0"].Codigo) {
      $("#estadom").prop('disabled', false);
      $scope.signorequeridom = "*";
    }else{
      $("#estadom").prop('disabled', true);
      $scope.signorequeridom = "";
      $scope.estadom="N";
    }
  }, 200);

  $scope.activarEstadomodal = function(val){
    if (val==$scope.listaexistencia["0"].Codigo) {
      $("#estadom").prop('disabled', false);
      $scope.signorequeridom = "*";
    }else{
      $("#estadom").prop('disabled', true);
      $scope.signorequeridom = "";
      $scope.estadom="N";
    }
  }

  $scope.actualizarinfo = function(){
    $scope.continuarm = true;
    if($scope.existenciam=="1"){
      if($("#estadom option:selected").text() != "BUENO"){
        if($scope.observacionm != "" && $scope.observacionm != null && $scope.observacionm != undefined && $scope.observacionm.length > 10){
          $scope.iconexistenciam = 'icon-check';
          $scope.estadoNombrem = $("#estadom option:selected").text();
          $scope.estadom = $scope.estadom;
        }
        else{
          notification.getNotification('warning', 'El campo observacion no puede ser vacio y tener mas de 10 caracteres!', 'Notificacion');
          $scope.continuarm = false;
        }
      }
      else{
        $scope.iconexistenciam = 'icon-check';
        $scope.estadoNombrem = $("#estadom option:selected").text();
        $scope.estadom = $scope.estadom;
      }
    }
    else{
      $scope.iconexistenciam = 'icon-check-empty';
      $scope.estadoNombrem = 'NO APLICA';
      $scope.estadom = 'N';
    }

    if($scope.continuarm == true){
      communication.resumen[$scope.idmodal].existenciaNombre = $("#existenciam option:selected").text();
      communication.resumen[$scope.idmodal].estadocod   = $scope.estadom;
      communication.resumen[$scope.idmodal].estado      = $scope.estadoNombrem;
      communication.resumen[$scope.idmodal].class       = $scope.iconexistenciam;
      communication.resumen[$scope.idmodal].criterio    = $scope.preguntam;
      communication.resumen[$scope.idmodal].existencia  = $scope.existenciam;
      communication.resumen[$scope.idmodal].observacion = $scope.observacionm;
      notification.getNotification('success', 'Modificacion Registrada!', 'Notificacion');
    }
  }
}]);
