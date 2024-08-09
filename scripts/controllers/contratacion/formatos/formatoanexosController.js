
'use strict';
angular.module('GenesisApp', [])
  .config(function ($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  })
  .controller('formatoanexosController', ['$scope', '$http', '$location', '$sce',
    function ($scope, $http, $location, $sce) {
      $(document).ready(function () {
        $scope.trustSrc = function (src) {
          return $sce.trustAsResourceUrl(src);
        }

        $scope.getData();
      });

      // Anexo 1
      // Anexo 2
      // Anexo 8
      // Anexo 11
      // Anexo 12
      // Anexo 13
      // Anexo 17
      // Anexo 18

      ////////////////////////////////////////////////

      $scope.getData = function () {
        $http({
          method: 'POST',
          url: "../../../php/contratacion/formatos/formatominutacontrato.php",
          data: {
            function: 'P_OBTENER_CONTRATO_MINUTA',
            v_pnumero: $location.search().v_pnumero.toString(),
            v_pubicacion: $location.search().v_pubicacion.toString(),
            v_pdocumento: $location.search().v_pdocumento.toString()
          }
        }).then(function ({ data }) {
          if (data != undefined && data != '0') {
            if (data[0] != undefined) {
              setTimeout(() => { $scope.$apply(); }, 500);
              setTimeout(() => { $scope.$apply(); }, 1500);
              $scope.DATA = data[0];
              $scope.imprimir(data[0].RAZON_SOCIAL_IPS)
              setTimeout(() => { window.print() }, 2000);

            } else {
              swal({ title: '¡IMPORTANTE!', text: 'Ocurrió un error al visualizar la información', type: 'info', allowOutsideClick: false });
            }
          } else {
            swal({ title: '¡IMPORTANTE!', text: 'Ocurrió un error al visualizar la información', type: 'info', allowOutsideClick: false });
          }
        });
      }

      $scope.imprimir = function (nombreIps) {
        const documento = $location.search().v_pdocumento.toString() == 'KS' ? 'RS' : 'RC'
        const numero = $location.search().v_pnumero.toString();
        const tipoMinuta = $location.search().v_ptipominuta.toString();
        const fechInicio = $location.search().v_pfecha_inicio.toString();



        var x = fechInicio.split('/');
        var fechaContrato = new Date(x[2] + '/' + x[1] + '/' + x[0]);
        var fechaCambioRazon = new Date('2022/12/01');

        var fechaHastaJulio = new Date('2023/07/01');
        const ubicacion = x[2];
        // const ubicacion = $location.search().v_pubicacion.toString();

        const nombrePrestador = nombreIps;
        var razon = 'CAJA DE COMPENSACION FAMILIAR CAJACOPI ATLANTICO'
        if (fechaContrato > fechaCambioRazon) {
          razon = 'CAJACOPI EPS SAS';
        }


        if (fechaContrato < fechaHastaJulio) {
          switch (parseInt(tipoMinuta)) {
            case 1: //RECUPERACION
              $scope.tituloMinuta = `CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACION DE SERVICIOS DE SALUD PARA LA RECUPERACION DE LA SALUD MEDIANTE LA MODALIDAD DE CAPITACION SUSCRITO ENTRE ${razon} Y ${nombrePrestador}`;
              break;
            case 2: //PYP
              $scope.tituloMinuta = `CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACION DE SERVICIOS DE FOMENTO, PROMOCION Y PREVENCION, DEMANDA INDUCIDA, ATENCION DE ENFERMEDADES DE INTERES EN SALUD PUBLICA MEDIANTE LA MODALIDAD DE CAPITACION SUSCRITO ENTRE ${razon} Y ${nombrePrestador}`;
              break;
            case 3: // MEDICAMENTO CAPITA
              $scope.tituloMinuta = `CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACION DE SERVICIOS DE SALUD PARA EL SUMINISTRO DE MEDICAMENTOS MEDIANTE LA MODALIDAD DE CAPITACION SUSCRITO ENTRE ${razon} Y ${nombrePrestador} `;
              break;
            // case 4:

            //   break;
            case 5: //EVENTO
              $scope.tituloMinuta = `CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACIÓN DE SERVICIOS DE SALUD MEDIANTE LA MODALIDAD DE EVENTO SUSCRITO ENTRE ${razon} Y ${nombrePrestador}`;
              break;
            // case 6:

            //   break;
            case 7: // MEDICAMENTO EVENTO
              $scope.tituloMinuta = `CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACION DE SERVICIOS DE SALUD PARA EL SUMINISTRO DE MEDICAMENTOS MEDIANTE LA MODALIDAD DE EVENTO SUSCRITO ENTRE ${razon} Y ${nombrePrestador}`;
              break;
            case 8: //EVENTO BOLSA
              $scope.tituloMinuta = `CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACIÓN DE SERVICIOS DE SALUD MEDIANTE LA MODALIDAD DE EVENTO SUSCRITO ENTRE ${razon} Y ${nombrePrestador}`;
              break;
            case 9: //PGP

              $scope.tituloMinuta = `CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACION DE SERVICIOS DE SALUD MEDIANTE LA MODALIDAD DE PAGO GLOBAL PROSPECTIVO SUSCRITO ENTRE ${razon} Y ${nombrePrestador}`;
              break;

            default: //EVENTO
              $scope.tituloMinuta = `CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACIÓN DE SERVICIOS DE SALUD MEDIANTE LA MODALIDAD DE EVENTO SUSCRITO ENTRE ${razon} Y ${nombrePrestador}`;
              break;
          }
        } else {
          switch (parseInt(tipoMinuta)) {
            case 1: //RECUPERACION
              $scope.tituloMinuta = `CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACIÓN DE SERVICIOS DE SALUD MEDIANTE LA MODALIDAD DE RECUPERACION SUSCRITO ENTRE CAJACOPI EPS SAS Y ${nombrePrestador}`;
              break;
            case 2: //PYP
              $scope.tituloMinuta = `CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACIÓN DE SERVICIOS DE SALUD MEDIANTE LA MODALIDAD DE PROMOCION Y MANTENIMIENTO SUSCRITO ENTRE CAJACOPI EPS SAS Y ${nombrePrestador}`;
              break;
            case 3: // MEDICAMENTO CAPITA
              $scope.tituloMinuta = `CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACIÓN DE SERVICIOS DE SALUD MEDIANTE LA MODALIDAD DE DISPENSACION DE MEDICAMENTOS, DISPOSITIVOS E INSUMOS DE CÁPITA SUSCRITO ENTRE CAJACOPI EPS SAS Y ${nombrePrestador}`;
              break;
            // case 4:

            //   break;
            case 5: //EVENTO
              $scope.tituloMinuta = `CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACIÓN DE SERVICIOS DE SALUD MEDIANTE LA MODALIDAD DE EVENTO SUSCRITO ENTRE CAJACOPI EPS SAS Y ${nombrePrestador}`;
              break;
            // case 6:

            //   break;
            case 7: // MEDICAMENTO EVENTO
              $scope.tituloMinuta = `CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACION DE SERVICIOS DE SALUD PARA EL SUMINISTRO DE MEDICAMENTOS MEDIANTE LA MODALIDAD DE EVENTO SUSCRITO ENTRE CAJACOPI EPS SAS Y ${nombrePrestador}`;
              break;
            case 8: //EVENTO BOLSA
              $scope.tituloMinuta = `CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACIÓN DE SERVICIOS DE SALUD MEDIANTE LA MODALIDAD DE EVENTO SUSCRITO ENTRE CAJACOPI EPS SAS Y ${nombrePrestador}`;
              break;
            case 9: //PGP
              $scope.tituloMinuta = `CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACION DE SERVICIOS DE SALUD MEDIANTE LA MODALIDAD DE PAGO GLOBAL PROSPECTIVO SUSCRITO ENTRE CAJACOPI EPS SAS Y ${nombrePrestador}`;
              break;

            default: //EVENTO
              $scope.tituloMinuta = `CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACIÓN DE SERVICIOS DE SALUD MEDIANTE LA MODALIDAD DE EVENTO SUSCRITO ENTRE CAJACOPI EPS SAS Y ${nombrePrestador}`;
              break;
          }
        }

        console.log($scope.tituloMinuta);
        // $http({
        //   method: 'POST',
        //   url: "../../../views/contratacion/formatos/guarda_titulo_anexo.php",
        //   data: {
        //     function: 'guarda_session',
        //     titulo_anexo: $scope.tituloMinuta
        //   }
        // }).then(function ({ data }) {

        // });

        setTimeout(() => { $scope.$apply(); }, 500);
      }






      // document.addEventListener('contextmenu', event => event.preventDefault());
      // const body = document.querySelector('body');

      // body.onkeydown = function (e) {
      //   if (e.keyCode === 17 || e.keyCode === 80) {
      //   } else {
      //     return false;
      //   }
      // }
      // var mediaQueryList = window.matchMedia('print');
      // mediaQueryList.addListener(function (mql) {
      //   if (mql.matches) {
      //     console.log('se hizo antes de imprimir');
      //   } else {
      //     console.log('se hizo despues de imprimir');
      //     setTimeout(function () {
      //       window.close();
      //     }, 10);
      //   }
      // });

    }]);
