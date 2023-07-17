
'use strict';
angular.module('GenesisApp', [])
  .config(function ($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  })
  .controller('formatosarlaftController', ['$scope', '$http', '$timeout', '$location', '$sce', '$q',
    function ($scope, $http, $timeout, $location, $sce, $q) {
      $(document).ready(function () {
        $scope.trustSrc = function (src) {
          return $sce.trustAsResourceUrl(src);
        }
        // if ($scope.Hoja == 'ANT') {
        //   $scope.Limpiar_Ant();
        $scope.Get_Data();
        // }
        console.log(1)
      });

      ////////////////////////////////////////////////

      $scope.Get_Data = function () {
        $http({
          method: 'POST',
          url: "../../../php/sarlaft/sarlaft.php",
          data: {
            function: 'p_devuelve_info',
            numero: '20220663'
            // v_pnumero: $location.search().v_pnumero.toString()
          }
        }).then(function ({ data }) {
          if (data != undefined && data != '0') {
            if (data.num_formulario != undefined) {
              data.accionistas = JSON.parse(data.accionistas);
              data.referencias_comercial = JSON.parse(data.referencias_comercial);
              data.referencias_personal = JSON.parse(data.referencias_personal);
              setTimeout(() => {
                $scope.DATA = data;
                console.log(data.accionistas);
                console.log(data.referencias_comercial);
                console.log(data.referencias_personal);
                console.log(data);
              }, 1500);
              // $scope.DATA = data[0];
              // $scope.Fijar_data();
              setTimeout(() => { $scope.$apply(); }, 500);
              setTimeout(() => { $scope.$apply(); }, 1500);
              // setTimeout(() => { window.print() }, 2000);

            } else {
              swal({ title: '¡IMPORTANTE!', text: 'Ocurrió un error al visualizar la información', type: 'info', allowOutsideClick: false });
            }
          } else {
            swal({ title: '¡IMPORTANTE!', text: 'Ocurrió un error al visualizar la información', type: 'info', allowOutsideClick: false });
          }
        });
      }

      $scope.Fijar_data = function () {
        $scope.DATA.NUMERO_CONTRATO = $scope.DATA.NUMERO_CONTRATO == null ? '' : $scope.DATA.NUMERO_CONTRATO;
        $scope.DATA.SUBSIDIADO = $scope.DATA.SUBSIDIADO == null ? '' : $scope.DATA.SUBSIDIADO;
        $scope.DATA.CONTRIBUTIVO = $scope.DATA.CONTRIBUTIVO == null ? '' : $scope.DATA.CONTRIBUTIVO;
        $scope.DATA.MOVILIDAD = $scope.DATA.MOVILIDAD == null ? '' : $scope.DATA.MOVILIDAD;
        $scope.DATA.DPTO = $scope.DATA.DPTO == null ? '' : $scope.DATA.DPTO;
        $scope.DATA.MUN = $scope.DATA.MUN == null ? '' : $scope.DATA.MUN;
        $scope.DATA.EPS = $scope.DATA.EPS == null ? '' : $scope.DATA.EPS;
        $scope.DATA.RAZON_SOCIAL = $scope.DATA.RAZON_SOCIAL == null ? '' : $scope.DATA.RAZON_SOCIAL;
        $scope.DATA.CIUDAD_DOMICILIO = $scope.DATA.CIUDAD_DOMICILIO == null ? '' : $scope.DATA.CIUDAD_DOMICILIO;
        $scope.DATA.DIRECCION = $scope.DATA.DIRECCION == null ? '' : $scope.DATA.DIRECCION;
        $scope.DATA.EXPEDICION = $scope.DATA.EXPEDICION == null ? '' : $scope.DATA.EXPEDICION;
        $scope.DATA.REPRESENTANTE = $scope.DATA.REPRESENTANTE == null ? '' : $scope.DATA.REPRESENTANTE;
        $scope.DATA.DOCUMENTO_REPRESENTANTE = $scope.DATA.DOCUMENTO_REPRESENTANTE == null ? '' : $scope.DATA.DOCUMENTO_REPRESENTANTE;
        $scope.DATA.SUPERVISOR_CONTRATO = $scope.DATA.SUPERVISOR_CONTRATO == null ? '' : $scope.DATA.SUPERVISOR_CONTRATO;
        $scope.DATA.RAZON_SOCIAL_IPS = $scope.DATA.RAZON_SOCIAL_IPS == null ? '' : $scope.DATA.RAZON_SOCIAL_IPS;
        $scope.DATA.NIT = $scope.DATA.NIT == null ? '' : $scope.DATA.NIT;
        $scope.DATA.DOMICILIO_IPS = $scope.DATA.DOMICILIO_IPS == null ? '' : $scope.DATA.DOMICILIO_IPS;
        $scope.DATA.DIR_PRESTADOR = $scope.DATA.DIR_PRESTADOR == null ? '' : $scope.DATA.DIR_PRESTADOR;
        $scope.DATA.NOM_REPRESENTANTE = $scope.DATA.NOM_REPRESENTANTE == null ? '' : $scope.DATA.NOM_REPRESENTANTE;
        $scope.DATA.COD_REPRESENTANTE = $scope.DATA.COD_REPRESENTANTE == null ? '' : $scope.DATA.COD_REPRESENTANTE;
        $scope.DATA.CORREO_REPRESENTANTE = $scope.DATA.CORREO_REPRESENTANTE == null ? '' : $scope.DATA.CORREO_REPRESENTANTE;
        $scope.DATA.PRESTADOR_SALUD = $scope.DATA.PRESTADOR_SALUD == null ? '' : $scope.DATA.PRESTADOR_SALUD;
        $scope.DATA.PRESTADOR_TECNOLOGIAS = $scope.DATA.PRESTADOR_TECNOLOGIAS == null ? '' : $scope.DATA.PRESTADOR_TECNOLOGIAS;
        $scope.DATA.IPS = $scope.DATA.IPS == null ? '' : $scope.DATA.IPS;
        $scope.DATA.PSS = $scope.DATA.PSS == null ? '' : $scope.DATA.PSS;
        $scope.DATA.GF = $scope.DATA.GF == null ? '' : $scope.DATA.GF;
        $scope.DATA.ONG = $scope.DATA.ONG == null ? '' : $scope.DATA.ONG;
        $scope.DATA.IPS = $scope.DATA.IPS == null ? '' : $scope.DATA.IPS;
        $scope.DATA.PI = $scope.DATA.PI == null ? '' : $scope.DATA.PI;
        $scope.DATA.OLTS = $scope.DATA.OLTS == null ? '' : $scope.DATA.OLTS;
        $scope.DATA.UN = $scope.DATA.UN == null ? '' : $scope.DATA.UN;
        $scope.DATA.NATURALEZA = $scope.DATA.NATURALEZA == null ? '' : $scope.DATA.NATURALEZA;
        $scope.DATA.VALOR_NUMERO = $scope.DATA.VALOR_NUMERO == null ? '' : $scope.DATA.VALOR_NUMERO;
        $scope.DATA.VALOR_LETRA = $scope.DATA.VALOR_LETRA == null ? '' : $scope.DATA.VALOR_LETRA;
        $scope.DATA.P_CAPITACION = $scope.DATA.P_CAPITACION == null ? '' : $scope.DATA.P_CAPITACION;
        $scope.DATA.P_PAQUETE = $scope.DATA.P_PAQUETE == null ? '' : $scope.DATA.P_PAQUETE;
        $scope.DATA.P_CANASTA = $scope.DATA.P_CANASTA == null ? '' : $scope.DATA.P_CANASTA;
        $scope.DATA.P_CONJ_INTEGRAL = $scope.DATA.P_CONJ_INTEGRAL == null ? '' : $scope.DATA.P_CONJ_INTEGRAL;
        $scope.DATA.P_GLOBAL_PROSP = $scope.DATA.P_GLOBAL_PROSP == null ? '' : $scope.DATA.P_GLOBAL_PROSP;
        $scope.DATA.P_EVENTO = $scope.DATA.P_EVENTO == null ? '' : $scope.DATA.P_EVENTO;
        $scope.DATA.INICIA = $scope.DATA.INICIA == null ? '' : $scope.DATA.INICIA;
        $scope.DATA.FINAL_ = $scope.DATA.FINAL_ == null ? '' : $scope.DATA.FINAL_;
        $scope.DATA.TERMINA = $scope.DATA.TERMINA == null ? '' : $scope.DATA.TERMINA;
        $scope.DATA.union_temporal = $scope.DATA.union_temporal == null ? '' : $scope.DATA.union_temporal;
      }


      $scope.formatPeso2 = function (num) {
        if (num != undefined) {
          var regex2 = new RegExp("\\.");
          if (regex2.test(num)) {
            num = num.toString().replace('.', ',');
            num = num.split(',');
            num[0] = num[0].toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
            num[0] = num[0].split('').reverse().join('').replace(/^[\.]/, '');
            if (num[1].length > 1 && num[1].length > 2) {
              num[1] = num[1].toString().substr(0, 2);
            }
            if (num[1].length == 1) {
              num[1] = num[1] + '0';
            }
            return num[0] + ',' + num[1];
          } else {
            num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
            num = num.split('').reverse().join('').replace(/^[\.]/, '');
            return num + ',00';
          }
        }
      }

      $scope.otroTipoDoc = function (tipo) {
        return (tipo.substr(0, 2) != 'TI' && tipo.substr(0, 2) != 'PA' && tipo.substr(0, 2) != 'CD' && tipo.substr(0, 2) != 'CC' && tipo.substr(0, 2) != 'CE') ? tipo : ''
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
