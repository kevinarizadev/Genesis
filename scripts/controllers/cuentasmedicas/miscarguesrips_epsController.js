'use strict';
angular.module('GenesisApp').controller('miscarguesrips_epsController', ['$scope', '$http', '$filter',
  function ($scope, $http, $filter) {
    $(document).ready(function () {
      $('.modal').modal();
      // $scope.nit = sessionStorage.getItem('nit');
      $scope.Rol_Cedula = sessionStorage.getItem('cedula');
      $scope.pen = 0;
      $scope.err = 0;
      $scope.val = 0;
      $scope.valerr = 0;
      $scope.rad = 0;
      $scope.listaRIPS = [];
      $scope.listaRIPSTemp = [];

      $scope.infoIPS = ''
      $scope.infoIPSListado = []
      // $scope.cargarrips();

      $scope.nit = ''
    });
    var vm = this;



    $scope.buscarIps = function () {
      if ($scope.infoIPS.length < 3) {
        swal("Mensaje", 'Ingrese una coincidencia', "info").catch(swal.noop);
        return
      }
      $scope.infoIPSListado = [];
      $scope.listaRIPS = [];
      $scope.listaRIPSTemp = [];
      $http({
        method: 'POST',
        url: "php/cuentasmedicas/rips/funcRips.php",
        data: {
          function: "obtenerIPS",
          info: $scope.infoIPS
        }
      }).then(function ({ data }) {
        swal.close();
        if (data && data.toString().substr(0, 3) != '<br') {
          if (data.length) {
            $scope.infoIPSListado = data;
            if (data.length == 1) {
              $scope.infoIPS = data[0].CODIGO + '~' + data[0].RAZON;
              $scope.nit = data[0].CODIGO;
              return
            }
          } else {
            swal("Mensaje", 'Sin datos para mostrar', "warning").catch(swal.noop);
          }
        } else {
          swal("Mensaje", data, "warning").catch(swal.noop);
        }
      })
    }

    $scope.chgBuscarIps = function () {
      if (!$scope.infoIPSListado) {
        return
      }
      const dato = $scope.infoIPSListado.filter(e => (e.CODIGO + '-' + e.RAZON) == $scope.infoIPS)
      if (!dato.length) { return }
      $scope.nit = $scope.infoIPS.split('-')[0]
      setTimeout(() => { $scope.$apply(); }, 500);
    }


    $scope.cargarrips = function () {
      if (!$scope.nit) {
        swal("Mensaje", 'Debe seleccionar la IPS', "info").catch(swal.noop);
        return
      }


      $http({
        method: 'POST',
        url: "php/cuentasmedicas/rips/funcRips.php",
        data: {
          function: 'obtenerCargues',
          nit: $scope.nit
        }
      }).then(function ({ data }) {
        if (data[0].codigo != "0") {
          if (data == '0') {
            swal("Mensaje", 'Sin datos para mostrar', "warning").catch(swal.noop);
            return
          }
          $scope.listaRIPS = [];
          $scope.listaRIPS = data;
          $scope.listaRIPSTemp = $scope.listaRIPS;
          $scope.currentPage = 0;
          $scope.pageSize = 10;
          $scope.valmaxpag = 10;
          $scope.pages = [];
          $scope.pen = 0;
          $scope.err = 0;
          $scope.val = 0;
          $scope.valerr = 0;
          $scope.rad = 0;
          $scope.configPages();
          for (var i = 0; i < $scope.listaRIPS.length; i++) {
            switch ($scope.listaRIPS[i].estado) {
              case 'PENDIENTE':
                $scope.pen = $scope.pen + 1;
                break;
              case 'ERROR':
                $scope.err = $scope.err + 1;
                break;
              case 'VALIDADO':
                $scope.val = $scope.val + 1;
                break;
              case 'VALIDADO CON ERRORES':
                $scope.valerr = $scope.valerr + 1;
                break;
              case 'RADICADO':
                $scope.rad = $scope.rad + 1;
                break;
              default:
                break;
            }
          }
        } else { }
      })
    }
    $scope.descargarErrores = function (proceso, archivo, texto) {
      if (archivo != 'NA') {
        var text = texto + ' ' + archivo.toUpperCase();
      } else {
        var text = texto;
      }
      window.open('php/cuentasmedicas/rips/error_rips.php?archivo=' + archivo + '&proceso=' + proceso + '&texto=' + text);
    }
    $scope.print = async function (data) {
      if (data.estado == 'RADICADO') {
        swal({
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#1d930f',
          confirmButtonText: 'Generar Acta',
          cancelButtonText: 'Radicar facturas digitalmente'
        }).then((result) => {
          if (result) {
            $scope.info = {
              recibo: '',
              nit: ''
            };
            $scope.info.recibo = data.recibo;
            $scope.info.nit = data.nit;
            $scope.info.codigo = data.codigo;
            $scope.info.verificacion = data.codigov;
            window.open('views/Cuentasmedicas/formatos/acta.php?datos=' + JSON.stringify($scope.info), '_blank', "width=900,height=1100");
          }
        }, function (dismiss) {
          if (dismiss == 'cancel') {
            // Cargar Soporte Digitales
            $scope.modalCargueSoporteDig();
          }
        })
      } else {
        $scope.info = {
          recibo: '',
          nit: ''
        };
        $scope.info.recibo = data.recibo;
        $scope.info.nit = data.nit;
        $scope.info.codigo = data.codigo;
        $scope.info.verificacion = data.codigov;
        window.open('views/Cuentasmedicas/formatos/acta.php?datos=' + JSON.stringify($scope.info), '_blank', "width=900,height=1100");
        if (data.nit === '901139193') {
          const responseExisteActa = await $http({
            url: '/php/cuentasmedicas/onbase.php',
            method: 'POST',
            data: $scope.info
          })
          if (responseExisteActa.data.data.ACTA_GENERADA === 'S') {
            const responseImportDocument = await $http({
              url: `/php/onbase/acta.php?nit=${$scope.info.nit}&recibo=${$scope.info.recibo}&codigo=${$scope.info.codigo}&verificacion=${$scope.info.verificacion}`
            })
          }
        }
      }
    }

    function validar_json(str) {
      try {
        if (typeof str !== "string") {
          return false;
        } else {
          return (typeof JSON.parse(str) === 'object');
        }
      } catch (e) {
        return false;
      }
    }
    $scope.print_sin_radicar = function (data) {
      // console.log({
      //   nit: data.nit,
      //   habilitacion: data.habilitacion,
      //   recibo: data.recibo,
      //   proceso: data.codigo
      // });
      $http({
        method: 'POST',
        url: "php/cuentasmedicas/rips/funcRips.php",
        data: {
          function: 'obtener_factura',
          nit: data.nit,
          habilitacion: data.habilitacion,
          recibo: data.recibo,
          proceso: data.codigo
        }
      }).then(function (response) {
        if (validar_json(angular.toJson(response.data)) && response.data != "") {
          if (response.data.detalle != null && response.data.detalle != "" && response.data.detalle.length > 0) {
            var datos = {
              nit: data.nit,
              habilitacion: data.habilitacion,
              recibo: data.recibo,
              codigo: data.codigo
            };
            window.open('views/Cuentasmedicas/formatos/facturas_sin_radicar.php?datos=' + angular.toJson(datos), '_blank', "width=900,height=1100");
          } else {
            swal("Mensaje", "No se encontraron facturas devueltas", "info");
          }
        } else {
          swal("Mensaje", response.data.mensaje, "warning");
        }
      })
    }
    $scope.informe_validacion_capita = function (data) {
      // console.log({
      //   nit: data.nit,
      //   habilitacion: data.habilitacion,
      //   recibo: data.recibo,
      //   proceso: data.codigo
      // });
      // console.log(data);
      var datos = {
        nit: data.nit,
        habilitacion: data.habilitacion,
        recibo: data.recibo,
        codigo: data.codigo
      };
      window.open('views/Cuentasmedicas/formatos/informe_validacion.php?datos=' + angular.toJson(datos), '_blank', "width=900,height=1100");
    }
    $scope.verdetalle = function (codigo) {
      $http({
        method: 'POST',
        url: "php/cuentasmedicas/rips/funcRips.php",
        data: {
          function: 'obtenerDetalleCargue',
          codigo: codigo
        }
      }).then(function (response) {
        if (response.data[0].codigo != "0") {
          $scope.listarArchivos = response.data;
          $('#modalarchivosdetalle').modal('open');
        } else { }
      })
    }
    $scope.filter = function (val) {
      $scope.listaRIPSTemp = $filter('filter')($scope.listaRIPS, val);
      if ($scope.listaRIPSTemp.length > 0) {
        $scope.setPage(1);
      }
      $scope.configPages();
    }
    $scope.closeModal = function () {
      $('#modalarchivosdetalle').modal('close');
      $('#modalhistoricoerrores').modal('close');
    }
    $scope.configPages = function () {
      $scope.pages.length = 0;
      var ini = $scope.currentPage - 4;
      var fin = $scope.currentPage + 5;
      if (ini < 1) {
        ini = 1;
        if (Math.ceil($scope.listaRIPSTemp.length / $scope.pageSize) > $scope.valmaxpag) fin = 10;
        else fin = Math.ceil($scope.listaRIPSTemp.length / $scope.pageSize);
      } else {
        if (ini >= Math.ceil($scope.listaRIPSTemp.length / $scope.pageSize) - $scope.valmaxpag) {
          ini = Math.ceil($scope.listaRIPSTemp.length / $scope.pageSize) - $scope.valmaxpag;
          fin = Math.ceil($scope.listaRIPSTemp.length / $scope.pageSize);
        }
      }
      if (ini < 1) ini = 1;
      for (var i = ini; i <= fin; i++) {
        $scope.pages.push({
          no: i
        });
      }
      if ($scope.currentPage >= $scope.pages.length) $scope.currentPage = $scope.pages.length - 1;
    }
    $scope.setPage = function (index) {
      $scope.currentPage = index - 1;
      // console.log($scope.listaRIPS.length / $scope.pageSize - 1)
    }


    //////////////////////////////////////////////////

    //////////////////////////////////////////////////
    //
  }
]).filter('inicio', function () {
  return function (input, start) {
    if (input != undefined && start != NaN) {
      start = +start;
      return input.slice(start);
    } else {
      return null;
    }
  }
});
