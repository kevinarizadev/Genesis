
'use strict';
angular.module('GenesisApp', [])
  .config(function ($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  })
  .controller('formato_celularesylineasmovilesController', ['$scope', '$http', '$location', '$sce',
    function ($scope, $http, $location, $sce) {
      $(document).ready(function () {
        $scope.trustSrc = function (src) {
          return $sce.trustAsResourceUrl(src);
        }
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');

        $scope.Get_Data();
        // }
        console.log(1)
      });

      ////////////////////////////////////////////////

      $scope.Get_Data = function () {
        $http({
          method: 'POST',
          url: "../../../php/administrativa/celularesylineasmoviles.php",
          data: {
            function: 'p_acta_entrega',
            codigo: $location.search().id.toString(),
          }
        }).then(function ({ data }) {
          if (data != undefined && data != '0') {
            if (data[0] != undefined) {
              $scope.Fijar_data(data[0]);
              setTimeout(() => { $scope.$apply(); }, 500);
              setTimeout(() => { window.print() }, 2000);

            } else {
              swal({ title: '¡IMPORTANTE!', text: 'Ocurrió un error al visualizar la información', type: 'info', allowOutsideClick: false });
            }
          } else {
            swal({ title: '¡IMPORTANTE!', text: 'Ocurrió un error al visualizar la información', type: 'info', allowOutsideClick: false });
          }
        });
      }

      $scope.Fijar_data = function (x) {
        $scope.DATA = {}
        $scope.DATA.NOMBRE_FUNC = x.NOMBRE == null ? '' : x.NOMBRE;
        $scope.DATA.NUMDOC_FUNC = x.DOCUMENTO == null ? '' : x.DOCUMENTO;
        $scope.DATA.AREA_FUNC = x.AREA == null ? '' : x.AREA;
        $scope.DATA.CARGO_FUNC = x.CARGO == null ? '' : x.CARGO;
        $scope.DATA.REGIONAL_FUNC = x.REGIONAL == null ? '' : x.REGIONAL;
        $scope.DATA.LINEA = x.LINEA_MOVIL == null ? '' : x.LINEA_MOVIL;
        $scope.DATA.OPERADOR = x.OPERADOR == null ? '' : x.OPERADOR;
        $scope.DATA.IMEI = x.IMEI_CEL ? x.IMEI_CEL : x.IMEI_MODEM;
        $scope.DATA.REFERENCIA = x.MARCA_NUM_MODELO ? x.MARCA_NUM_MODELO : x.GESC_MARCA_MODEM;
        $scope.DATA.COLOR = x.GESC_COLOR ? x.GESC_COLOR : 'UNICO';
        $scope.DATA.OBSERVACION = x.GESC_OBSERVACION == null ? '' : x.GESC_OBSERVACION;
        $scope.DATA.CORREO = x.TERC_EMAIL == null ? '' : x.TERC_EMAIL;
        $scope.DATA.NOMBRE_ENTREGA = x.TERC_NOMBRE == null ? '' : x.TERC_NOMBRE;


        const SysDay = new Date();
        const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

        //  + '-' + (((SysDay.getMonth() + 1) < 10) ? '0' + (SysDay.getMonth() + 1) : (SysDay.getMonth() + 1)) + '-' + SysDay.getDate() + 'T' + SysDay.getHours() + ':' + SysDay.getMinutes();

        $scope.FECHA = `${SysDay.getDate()} de ${meses[SysDay.getMonth()]} de ${SysDay.getFullYear()}`

        // '02 DE MAYO DE 2023'


        setTimeout(() => { $scope.$apply(); }, 500);
        // setTimeout(() => { window.print() }, 2000);
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

      document.addEventListener('contextmenu', event => event.preventDefault());
      const body = document.querySelector('body');

      body.onkeydown = function (e) {
        if (e.keyCode === 17 || e.keyCode === 80) {
        } else {
          return false;
        }
      }
      var mediaQueryList = window.matchMedia('print');
      mediaQueryList.addListener(function (mql) {
        if (mql.matches) {
          console.log('se hizo antes de imprimir');
        } else {
          console.log('se hizo despues de imprimir');
          setTimeout(function () {
            window.close();
          }, 10);
        }
      });

    }]);
