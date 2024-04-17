
'use strict';
angular.module('GenesisApp', [])
  .config(function ($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  })
  .controller('formatominutacontrato_nuevoformatoController', ['$scope', '$http', '$location', '$sce',
    function ($scope, $http, $location, $sce) {
      $(document).ready(function () {
        $scope.trustSrc = function (src) {
          return $sce.trustAsResourceUrl(src);
        }

        $scope.SysDay = new Date();
        $scope.dia = $scope.SysDay.getDate()
        const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

        $scope.mes = meses[$scope.SysDay.getMonth()];
        $scope.anio = $scope.SysDay.getFullYear()
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
          url: "../../../../php/contratacion/formatos/formatominutacontrato.php",
          data: {
            function: 'P_OBTENER_CONTRATO_MINUTA',
            // v_pnumero: '8103',
            // v_pubicacion: '1',
            // v_pdocumento: 'KS',
            v_pnumero: $location.search().v_pnumero.toString(),
            v_pubicacion: $location.search().v_pubicacion.toString(),
            v_pdocumento: $location.search().v_pdocumento.toString()
          }
        }).then(function ({ data }) {
          if (data != undefined && data != '0') {
            if (data[0] != undefined) {
              $scope.DATA = data[0];
              $scope.Fijar_data();
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
        $scope.DATA.DOC_CONTRATO = $location.search().v_pdocumento.toString() == 'KS' ? 'RS' : 'RC';
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
        $scope.DATA.CORREO_ELECTRONICO = $scope.DATA.CORREO_ELECTRONICO == null ? '' : $scope.DATA.CORREO_ELECTRONICO;
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
        $scope.DATA.IPSI = $scope.DATA.IPSI == null ? '' : $scope.DATA.IPSI;
        $scope.DATA.PI = $scope.DATA.PI == null ? '' : $scope.DATA.PI;
        $scope.DATA.OLTS = $scope.DATA.OLTS == null ? '' : $scope.DATA.OLTS;
        $scope.DATA.UN = $scope.DATA.UN == null ? '' : $scope.DATA.UN;
        $scope.DATA.OS = $scope.DATA.OS == null ? '' : $scope.DATA.OS;
        $scope.DATA.OT = $scope.DATA.OT == null ? '' : $scope.DATA.OT;
        $scope.DATA.NATURALEZA = $scope.DATA.NATURALEZA == null ? '' : $scope.DATA.NATURALEZA;
        $scope.DATA.VALOR_NUMERO = $scope.DATA.VALOR_NUMERO == null ? '' : $scope.DATA.VALOR_NUMERO;
        $scope.DATA.VALOR_LETRA = $scope.DATA.VALOR_LETRA == null ? '' : $scope.DATA.VALOR_LETRA;
        $scope.DATA.P_CAPITACION = $scope.DATA.P_CAPITACION == null ? '' : $scope.DATA.P_CAPITACION;
        $scope.DATA.TIPO_CAPITA_X = '';
        $scope.DATA.P_PAQUETE = $scope.DATA.P_PAQUETE == null ? '' : $scope.DATA.P_PAQUETE;
        $scope.DATA.P_CANASTA = $scope.DATA.P_CANASTA == null ? '' : $scope.DATA.P_CANASTA;
        $scope.DATA.P_CONJ_INTEGRAL = $scope.DATA.P_CONJ_INTEGRAL == null ? '' : $scope.DATA.P_CONJ_INTEGRAL;
        $scope.DATA.P_GLOBAL_PROSP = $scope.DATA.P_GLOBAL_PROSP == null ? '' : $scope.DATA.P_GLOBAL_PROSP;
        $scope.DATA.P_EVENTO = $scope.DATA.P_EVENTO == null ? '' : $scope.DATA.P_EVENTO;
        $scope.DATA.INICIA = $scope.DATA.INICIA == null ? '' : $scope.DATA.INICIA;
        $scope.DATA.FINAL_ = $scope.DATA.FINAL_ == null ? '' : $scope.DATA.FINAL_;
        $scope.DATA.TERMINA = $scope.DATA.TERMINA == null ? '' : $scope.DATA.TERMINA;
        $scope.DATA.NUM_AFILIADO = $scope.DATA.NUM_AFILIADO == null ? '' : $scope.DATA.NUM_AFILIADO;
        $scope.DATA.VALOR_UPC = $scope.DATA.VALOR_UPC == null ? '' : $scope.DATA.VALOR_UPC;
        $scope.DATA.union_temporal = $scope.DATA.union_temporal == null ? '' : $scope.DATA.union_temporal;

        $scope.DATA.SERVICIO_714 = $scope.DATA.SERVICIO_714 == null ? '' : $scope.DATA.SERVICIO_714;
        $scope.DATA.SERVICIO_714 = $scope.DATA.SERVICIO_714 == 0 ? 'NO' : 'SI'
        $scope.DATA.NOMBRE_CONCEPTO = $scope.DATA.NOMBRE_CONCEPTO == null ? '' : $scope.DATA.NOMBRE_CONCEPTO;
        $scope.DATA.NOMBRE_ASUNTO = $scope.DATA.NOMBRE_ASUNTO == null ? '' : $scope.DATA.NOMBRE_ASUNTO;

        var x = $scope.DATA.INICIA.split('/');
        var inicia = new Date(x[2] + '/' + x[1] + '/' + x[0]);
        // var fechaNuevaEmpresa = new Date('2022/12/01');
        // $scope.mostrar_div_firmas = true;
        // console.log(inicia)
        // console.log(fechaNuevaEmpresa)
        $scope.mostrar_anexo22 = false;
        var fechaNuevoAbril = new Date('2024/04/01');
        if (inicia >= fechaNuevoAbril) {
          $scope.mostrar_anexo22 = true;
        }
        setTimeout(() => { $scope.$apply(); }, 500);
        setTimeout(() => { window.print() }, 2000);
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
