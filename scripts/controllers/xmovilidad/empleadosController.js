'use strict';
angular.module('GenesisApp')
.controller('empleadosController',['$scope','consultaHTTP','notification','$timeout','$rootScope','$http','$window','ngDialog',
function($scope,consultaHTTP,notification,$timeout,$rootScope,$http,$window,ngDialog) {



      var dat = {prov : 'navb'}
      $.getJSON( "php/obtenersession.php", dat)
      .done(function(respuesta) {
        $scope.sesdata = respuesta;
        $scope.nit=$scope.sesdata.nit;
      })
      .fail(function( jqXHR, textStatus, errorThrown ) {
        console.log("navbar error obteniendo variables");
      });

      var listaempleados = $('#listadoempleados').DataTable( {
        "ordering": false,
        "info":     false,
        ajax: {
          url: 'php/movilidad/funcempleados.php',
          dataSrc: ''
        },
        columns: [
          { data: "documento" },
          { data: "nombre" },
          { data: "nacimiento" },
          { data: "estado" },
          { data: null,defaultContent: '<div class="tooltip" style="margin-left: 30px;"><i  class="Medium material-icons op">assignment</i></span></i><span class="tooltiptext">Certificado De Afiliacion</span></div><div class="tooltip" style="margin-left: 30px;"><i class="Medium material-icons po">description</i></span></i><span class="tooltiptext">Certificado De Aportes</span></div>'}
        ],
        language: {
          "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        },
        lengthMenu: [[10, 30, 50,-1], [10, 30, 50,'Todas']]
      } );

      $('#listadoempleados tbody').on('click', 'i.op', function () {
        $scope.data = listaempleados.row(this.parentElement.parentElement.parentElement).data();
        $window.open('views/consultaafiliados/soportes/cert_movilidad_beneficiario.php?tipo='+$scope.data.tipo_documento +'&id='+$scope.data.numero_documento,'_blank', "width=1080,height=1100");
      });
      $('#listadoempleados tbody').on('click', 'i.po', function () {
        $scope.data = listaempleados.row(this.parentElement.parentElement.parentElement).data();
        $window.open('views/consultaafiliados/soportes/cert_movilidad_contributivo.php?tipo='+$scope.data.tipo_documento +'&id='+$scope.data.numero_documento+'&aport='+$scope.nit,'_blank', "width=1080,height=1100");
      });
}
]);
