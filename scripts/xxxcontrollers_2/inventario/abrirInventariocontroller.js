'use strict';
angular.module('GenesisApp')
.controller('abrirInventariocontroller', ['$scope', '$http', 'ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller','$rootScope','$window','inventarioHttp',
function ($scope, $http, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window, inventarioHttp) {
  $scope.tipolistasq = "0";
  //tamaño del contenedor
  $(function() {
    var dat = {prov : 'navb'}
    $.getJSON( "php/obtenersession.php", dat)
    .done(function(respuesta) {
      $scope.sesdata = respuesta;
      $scope.cedula = $scope.sesdata.cedula;
      communication.cedula = $scope.sesdata.cedula;
      $scope.ubicacion = $scope.sesdata.codmunicipio;
      communication.cedula = $scope.cedula;

    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
      console.log("navbar error obteniendo variables");
    });
    $(window).resize(function() {
      if ($(window).width() <= 420) {$('.cardI').css({"width": "100%", "margin":"auto"});}
      else if($(window).width() <= 780){$('.cardI').css({"width": "80%", "margin":"auto"});}
            else{$('.cardI').css({"width": "30%", "margin":"auto"})}
    });
    // setTimeout(function () {
    //     $scope.obtenerTiposInventariosJ();
    // }, 20);

  });
  //efecto al boton
  $('.action-button').on('click', function(){
    $(this).toggleClass('active');
  })
  //function sumar dias
  function sumarDias(fecha, dias){
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }
  //campos de fechas
  $("#fechamod2").kendoDatePicker({
    format: "dd/MM/yyyy",
    min: new Date(), // sets min date today
    culture: "es-MX",
    disableDates: ["su", "sa"]
  })
  var op8 = $("#fechamod2").data("kendoDatePicker");
  op8.enable(false);
  $("#fechamod1").kendoDatePicker({
    format: "dd/MM/yyyy",
    min: new Date(),// sets min date today
    culture: "es-MX",
    disableDates: ["su", "sa"],
    change: function() {
      $scope.fechainicio = this.value();
      var op9 = $("#fechamod2").data("kendoDatePicker");
      op9.enable(true);
      $("#fechamod2").kendoDatePicker({
        format: "dd/MM/yyyy",
        min: new Date($scope.fechainicio), // sets min date today
        culture: "es-MX",
        disableDates: ["su", "sa"],
        change: function() {
          $scope.fechafin = this.value();
        }
      });
    }
  })
  //
$scope.obtenerTiposInventariosJ = function () {
  inventarioHttp.obtenerArea(communication.cedula).then(function (response) {
    $scope.area = response.data;
    inventarioHttp.obtenerListas($scope.area).then(function (response) {
      $scope.listas = response.data;
    })
  })

   }

  $scope.validarPeriodo = function(){
    inventarioHttp.validarPeriodo($scope.tipolistasq).then(function (response) {
      if(response.data == 1){
          var op9 = $("#fechamod1").data("kendoDatePicker");
          op9.enable(true);
          $scope.inactive = false;
      }else{
          notification.getNotification('info', 'Ya existe un periodo abierto para este tipo de lista.', 'Notificacion');
          var op9 = $("#fechamod1").data("kendoDatePicker");
          op9.enable(false);
          $scope.inactive = true;
      }

    })
  }

  function parsearfechainicio(){
    $scope.diainicio = $scope.fechainicio.getDate();
    $scope.mesinicio = $scope.fechainicio.getMonth()+1; //hoy es 0!
    $scope.anoinicio = $scope.fechainicio.getFullYear();

  }
  function parserfechafin(){
    $scope.diafin = $scope.fechafin.getDate();
    $scope.mesfin = $scope.fechafin.getMonth()+1; //hoy es 0!
    $scope.anofin = $scope.fechafin.getFullYear();
  }

  $scope.AbrirInventario = function(){
    //$scope.filtro.tipo = $('#tipoLIstaInv').val();
    if($scope.tipolistasq != "0" && $scope.fechainicio != undefined && $scope.fechafin!=undefined){
    parsearfechainicio();
    parserfechafin();
    $scope.f1 = $scope.diainicio+"/"+ $scope.mesinicio+"/"+$scope.anoinicio;
    $scope.f2 = $scope.diafin+"/"+ $scope.mesfin+"/"+$scope.anofin;

      inventarioHttp.insertarAperturaInventario('1',$scope.f1,  $scope.f2,'A',$scope.area,$scope.tipolistasq).then(function (response) {
        if(response.data = "Apertura de inventario exitoso!"){
          notification.getNotification('success', response.data, 'Notificacion');
        }else{
            notification.getNotification('error', 'El periodo de inventario no pudo ser abierto.', 'Notificacion');
        }
          //  $scope.resp = response.data;
      })
    }else{
      notification.getNotification('warning', 'Complete los campos para continuar!', 'Notificacion');
    }
  }
}])
