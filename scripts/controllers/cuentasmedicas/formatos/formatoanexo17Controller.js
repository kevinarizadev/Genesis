
'use strict';
angular.module('GenesisApp', [])
  .config(function ($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  })
  .controller('formatoanexo17Controller', ['$scope', '$http', '$location', '$sce',
    function ($scope, $http, $location, $sce) {
      $(document).ready(function () {
        $scope.trustSrc = function (src) {
          return $sce.trustAsResourceUrl(src);
        }

        $scope.getData();
      });

      ////////////////////////////////////////////////

      $scope.getData = function () {
        $http({
          method: 'POST',
          url: "../../../../php/contratacion/formatos/formatominutacontrato.php",
          data: {
            function: 'P_OBTENER_CONTRATO_MINUTA',
            v_pnumero: $location.search().v_pnumero.toString(),
            v_pubicacion: $location.search().v_pubicacion.toString(),
            v_pdocumento: $location.search().v_pdocumento.toString()
          }
        }).then(function ({ data }) {
          if (data != undefined && data != '0') {
            if (data[0] != undefined) {
              $scope.DATA = data[0];
              setTimeout(() => { $scope.$apply(); }, 500);
              setTimeout(() => { $scope.$apply(); }, 1500);

              $scope.imprimir(DATA.RAZON_SOCIAL_IPS)
              // setTimeout(() => { window.print() }, 2000);

            } else {
              swal({ title: '¡IMPORTANTE!', text: 'Ocurrió un error al visualizar la información', type: 'info', allowOutsideClick: false });
            }
          } else {
            swal({ title: '¡IMPORTANTE!', text: 'Ocurrió un error al visualizar la información', type: 'info', allowOutsideClick: false });
          }
        });
      }

      $scope.imprimir = function (nombreIps) {
        const documento = $location.search().v_pdocumento.toString()
        const numero = $location.search().v_pnumero.toString();
        const ubicacion = $location.search().v_pubicacion.toString();
        const tipoMinuta = $location.search().v_ptipominuta.toString();
        const fechInicio = $location.search().v_pfecha_inicio.toString();



        var x = fechInicio.split('/');
        var fechaContrato = new Date(x[2] + '/' + x[1] + '/' + x[0]);
        var fechaHastaJulio = new Date('2023/07/01');


        const nombrePrestador = nombreIps;


        if (fechaContrato < fechaHastaJulio) {
          switch (parseInt(tipoMinuta)) {
            case 1: //RECUPERACION
              $scope.tituloMinuta = `ANEXO 17 CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACION DE SERVICIOS DE SALUD PARA LA RECUPERACION DE LA SALUD  MEDIANTE LA MODALIDAD DE CAPITACION  SUSCRITO ENTRE CAJA DE COMPENSACION FAMILIAR CAJACOPI ATLANTICO Y ${nombrePrestador}`;
              break;
            case 2: //PYP
              $scope.tituloMinuta = `ANEXO 17 CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACION DE SERVICIOS DE FOMENTO, PROMOCION Y PREVENCION, DEMANDA INDUCIDA, ATENCION DE ENFERMEDADES DE INTERES EN SALUD PUBLICA MEDIANTE LA MODALIDAD DE CAPITACION SUSCRITO ENTRE CAJA DE COMPENSACION FAMILIAR CAJACOPI ATLANTICO Y ${nombrePrestador}`;
              break;
            case 3: // MEDICAMENTO CAPITA
              $scope.tituloMinuta = `ANEXO 17 CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACION DE SERVICIOS DE SALUD PARA EL SUMINISTRO DE MEDICAMENTOS MEDIANTE LA MODALIDAD DE CAPITACION SUSCRITO ENTRE CAJA DE COMPENSACION FAMILIAR CAJACOPI ATLANTICO Y ${nombrePrestador} `;
              break;
            // case 4:

            //   break;
            case 5: //EVENTO
              $scope.tituloMinuta = `ANEXO N° 17 CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACIÓN DE SERVICIOS DE SALUD MEDIANTE LA MODALIDAD DE EVENTO`;
              break;
            // case 6:

            //   break;
            case 7: // MEDICAMENTO EVENTO
              $scope.tituloMinuta = `ANEXO 17 CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACION DE SERVICIOS DE SALUD PARA EL SUMINISTRO DE MEDICAMENTOS MEDIANTE LA MODALIDAD DE CAPITACION SUSCRITO ENTRE CAJA DE COMPENSACION FAMILIAR CAJACOPI ATLANTICO Y ${nombrePrestador}`;
              break;
            case 8: //EVENTO BOLSA
              $scope.tituloMinuta = `ANEXO N° 17 CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACIÓN DE SERVICIOS DE SALUD MEDIANTE LA MODALIDAD DE EVENTO`;
              break;
            case 9: //PGP

              $scope.tituloMinuta = `ANEXO 17 CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACION DE SERVICIOS DE SALUD MEDIANTE LA MODALIDAD DE PRESUPUESTO GLOBAL PROSPECTIVO`;
              break;

            default: //EVENTO
              $scope.tituloMinuta = `ANEXO N° 17 CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACIÓN DE SERVICIOS DE SALUD MEDIANTE LA MODALIDAD DE EVENTO`;
              break;
          }
        } else {
          switch (parseInt(tipoMinuta)) {
            case 1: //RECUPERACION
              $scope.tituloMinuta = `ANEXO N° 17 CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACIÓN DE SERVICIOS DE SALUD MEDIANTE LA MODALIDAD DE RECUPERACION`;
              break;
            case 2: //PYP
              $scope.tituloMinuta = `ANEXO N° 17 CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACIÓN DE SERVICIOS DE SALUD MEDIANTE LA MODALIDAD DE PYM     `;
              break;
            case 3: // MEDICAMENTO CAPITA
              $scope.tituloMinuta = `ANEXO N° 17 CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACIÓN DE SERVICIOS DE SALUD MEDIANTE LA MODALIDAD DE DISPENSACION DE MEDICAMENTOS, DISPOSITIVOS E INSUMOS DE CÁPITA.`;
              break;
            // case 4:

            //   break;
            case 5: //EVENTO
              $scope.tituloMinuta = `ANEXO N° 17 CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACIÓN DE SERVICIOS DE SALUD MEDIANTE LA MODALIDAD DE EVENTO`;
              break;
            // case 6:

            //   break;
            case 7: // MEDICAMENTO EVENTO
              $scope.tituloMinuta = `ANEXO N° 17 CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACIÓN DE SERVICIOS DE SALUD MEDIANTE LA MODALIDAD DE DISPENSACION DE MEDICAMENTOS, DISPOSITIVOS E INSUMOS DE CÁPITA.`;
              break;
            case 8: //EVENTO BOLSA
              $scope.tituloMinuta = `ANEXO N° 17 CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACIÓN DE SERVICIOS DE SALUD MEDIANTE LA MODALIDAD DE EVENTO`;
              break;
            case 9: //PGP
              $scope.tituloMinuta = `ANEXO N° 17 CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACION DE SERVICIOS DE SALUD MEDIANTE LA MODALIDAD DE PRESUPUESTO GLOBAL PROSPECTIVO`;
              break;

            default: //EVENTO
              $scope.tituloMinuta = `ANEXO N° 17 CONTRATO ${documento}-${numero}-${ubicacion} DE PRESTACIÓN DE SERVICIOS DE SALUD MEDIANTE LA MODALIDAD DE EVENTO`;
              break;
          }
        }


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
