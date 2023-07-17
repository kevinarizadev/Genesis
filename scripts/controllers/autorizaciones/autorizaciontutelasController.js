'use strict';
angular.module('GenesisApp')
  .controller('autorizaciontutelasController', ['$scope', '$http', '$filter',
    function ($scope, $http, $filter) {

      $scope.Inicio = function () {
        console.log($(window).width());
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.Ajustar_Pantalla();
        if (sessionStorage.getItem('inicio_perfil') == null) {
          swal("¡Importante!", "Sesion vencida, por favor entrar nuevamente a Genesis", "warning").catch(swal.noop);
          // location.reload();
          return
        }
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        $scope.Rol_Cargo = JSON.parse(sessionStorage.getItem('inicio_perfil')).cod_cargo;
        // $scope.Rol_Cargo = "24";

        if ($scope.Rol_Cargo == undefined) {
          swal("¡Importante!", "Sesion vencida, por favor entrar nuevamente a Genesis", "warning").catch(swal.noop);
          location.reload();
        }

        $scope.Vista = 0;
        $scope.SysDay = new Date();
        $scope.listLimpiar();
        $scope.formLimpiar();
        $('.modal').modal();
        setTimeout(() => {
          $scope.$apply();
        }, 500);

        //////////////////////////////////////////////////////////
        setTimeout(() => {
          $scope.obtenerListado();
        }, 1000);
        console.log($scope.tipoRol);
      }
      // 12964797
      $scope.formLimpiar = function () {
        $scope.Form = {
          Status: 0,
          Filtro: '',
          Mostrar: '',

          codTutela: '',
          radTutela: '',
          codRegional: '',
          regional: '',

          codArea: '',
          codRenglon: '',
          estado: '',

        };

        // document.querySelector('#FormFile').value = '';

        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }

      $scope.listLimpiar = function () {
        $scope.List = {
          listado: [],
        };
      }
      $scope.obtenerListado = function (X) {
        if (!X)
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            // allowOutsideClick: false,
            // allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
        $scope.List.listado = [];
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacion/autorizaciontutelas.php",
          data: {
            function: 'P_lista_tutela_areas',
            condicion: $scope.tipoRol
          }
        }).then(function ({ data }) {
          if (!X)
            swal.close()
          if (data.toString().substr(0, 3) != '<br' && data != 0) {
            $scope.List.listado = data;

            $scope.initPaginacion($scope.List.listado);

          } else {
            if (data == 0) { swal("¡Importante!", "Sin datos para visualizar", "warning").catch(swal.noop); return }
            swal("¡Importante!", data, "warning").catch(swal.noop);
          }
        });
      }

      $scope.editarTutela = function (x) {
        // console.log(x);
        $scope.Form.gestionaArea = false;
        $scope.Form.gestionaRegional = false;
        $scope.Form.gestionaNacional = false;

        $scope.Form.codTutela = x.numero;
        $scope.Form.radTutela = x.radicacion;
        $scope.Form.regional = x.ubicacion;
        $scope.Form.codRegional = x.cod_ubicacion;
        $scope.Form.estado = x.estado;

        // 1 AFILIADO
        // 2 IPS
        // 3 AGENTE OFICIOSO
        // 4 OTRO
        // 5 CAJACOPIEPS


        $scope.Form.tipoDocAccionante = x.tipo_documento;
        $scope.Form.numDocAccionante = x.documento_identificacion;
        $scope.Form.nombreDocAccionante = x.afic_nombre != null ? x.afic_nombre : x.datos_accionante;

        $scope.Form.ttoIntegral = x.tratamiento_integral == 'S' ? true : false;
        $scope.Form.sgtoContinuo = x.seguimiento_continuo == 'S' ? true : false;

        $scope.Form.soporteAdmision = x.archivo_admision;
        $scope.Form.soporteFallo = x.archivo_fallo;
        $scope.Form.soporteFalloImp = x.archivo_fallo_impug;

        $scope.Form.Status = 1;

        //////VALIDAR OTRA AREAS//////
        // if ($scope.List.listadoCargos.findIndex(e => e.cod == $scope.Rol_Cargo) == -1) {
        if ($scope.tipoRol == 'A') {
          $scope.Form.gestionaArea = true;
        }

        //////VALIDAR REGIONAL JURIDICA//////
        // if ($scope.List.listadoCargos.findIndex(e => e.cod == $scope.Rol_Cargo && e.reg == 'S') != -1) {
        if ($scope.tipoRol == 'R') {
          $scope.Form.gestionaRegional = true;
        }

        //////VALIDAR JURIDICA NACIONAL//////
        // if ($scope.List.listadoCargos.findIndex(e => e.cod == $scope.Rol_Cargo && e.nac == 'S') != -1) {
        if ($scope.tipoRol == 'N') {
          $scope.Form.gestionaNacional = true;
        }

        $scope.Form.checkArea = false;
        $scope.Form.checkRegional = false;

        $scope.obtenerCausasSalud($scope.Form.codTutela, $scope.Form.codRegional)
        $scope.obtenerListadoTutelaAreas($scope.Form.codTutela, $scope.Form.codRegional)

        console.log("gestionaArea:", $scope.Form.gestionaArea, "// gestionaRegional:", $scope.Form.gestionaRegional, "// gestionaNacional:", $scope.Form.gestionaNacional)


        setTimeout(() => { $scope.$apply(); }, 500);
      }


      $scope.initPaginacion = function (info) {
        $scope.listDatosTemp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.Form.Mostrar = 10;
        $scope.configPages();
      }
      $scope.initPaginacion2 = function (valor) {
        $scope.currentPage = 0;
        if (valor == 0) {
          $scope.pageSize = $scope.listDatosTemp.length;
          $scope.valmaxpag = $scope.listDatosTemp.length;
        } else {
          $scope.pageSize = valor;
          $scope.valmaxpag = valor;
        }
        $scope.pages = [];
        $scope.configPages();
      }
      $scope.filter = function (val) {
        if ($scope.Filter_Val != val) {
          $scope.listDatosTemp = $filter('filter')($scope.List.listado, val);
          $scope.configPages();
          $scope.Filter_Val = val;
        } else {
          $scope.listDatosTemp = $filter('filter')($scope.List.listado, '');
          $scope.configPages();
          $scope.Filter_Val = '';
        }
      }
      $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (Math.ceil($scope.listDatosTemp.length / $scope.pageSize) > $scope.valmaxpag) {
            if (($scope.pageSize * 10) < $scope.listDatosTemp.length) {
              fin = 10;
            } else {
              fin = Math.ceil($scope.listDatosTemp.length / $scope.pageSize);
            }
          }
          else { fin = Math.ceil($scope.listDatosTemp.length / $scope.pageSize); }
        } else {
          if (ini >= Math.ceil($scope.listDatosTemp.length / $scope.pageSize) - $scope.valmaxpag) {
            ini = Math.ceil($scope.listDatosTemp.length / $scope.pageSize) - $scope.valmaxpag;
            fin = Math.ceil($scope.listDatosTemp.length / $scope.pageSize);
          }
        }
        if (ini < 1) ini = 1;
        for (var i = ini; i <= fin; i++) {
          $scope.pages.push({
            no: i
          });
        }
        if ($scope.currentPage >= $scope.pages.length)
          $scope.currentPage = $scope.pages.length - 1;
        if ($scope.currentPage < 0) { $scope.currentPage = 0; }
      }
      $scope.setPage = function (index) {
        $scope.currentPage = index - 1;
        if ($scope.pages.length % 2 == 0) {
          var resul = $scope.pages.length / 2;
        } else {
          var resul = ($scope.pages.length + 1) / 2;
        }
        var i = index - resul;
        if ($scope.listDatosTemp.length % $scope.pageSize == 0) {
          var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize);
        } else {
          var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize) + 1;
        }
        var fin = ($scope.pages.length + i) - 1;
        if (fin > tamanomax) {
          fin = tamanomax;
          i = tamanomax - 9;
        }
        if (index > resul) {
          $scope.calcular(i, fin);
        }
      }
      $scope.paso = function (tipo) {
        if (tipo == 'next') {
          var i = $scope.pages[0].no + 1;
          if ($scope.pages.length > 9) {
            var fin = $scope.pages[9].no + 1;
          } else {
            var fin = $scope.pages.length;
          }

          $scope.currentPage = $scope.currentPage + 1;
          if ($scope.listDatosTemp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize);
          } else {
            var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize) + 1;
          }
          if (fin > tamanomax) {
            fin = tamanomax;
            i = tamanomax - 9;
          }
        } else {
          var i = $scope.pages[0].no - 1;
          if ($scope.pages.length > 9) {
            var fin = $scope.pages[9].no - 1;
          } else {
            var fin = $scope.pages.length;
          }

          $scope.currentPage = $scope.currentPage - 1;
          if (i <= 1) {
            i = 1;
            fin = $scope.pages.length;
          }
        }
        $scope.calcular(i, fin);
      }
      $scope.calcular = function (i, fin) {
        if (fin > 9) {
          i = fin - 9;
        } else {
          i = 1;
        }
        $scope.pages = [];
        for (i; i <= fin; i++) {
          $scope.pages.push({
            no: i
          });
        }
      }

      $scope.openModal = function (modal) {
        $(`#${modal}`).modal('open');
      }
      $scope.closeModal = function () {
        $(".modal").modal("close");
      }

      $scope.Ajustar_Pantalla = function () {
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100 && $(window).width() < 1300) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1300 && $(window).width() < 1500) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
        if ($(window).width() > 1500) {
          document.querySelector("#pantalla").style.zoom = 0.9;
        }
      }

      $(window).on('resize', function () {
        $scope.Ajustar_Pantalla();
      });

      if (document.readyState !== 'loading') {
        $scope.Inicio();
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }

    }])
  .filter('inicio', function () {
    return function (input, start) {
      if (input != undefined && start != NaN) {
        start = +start;
        return input.slice(start);
      } else {
        return null;
      }
    }
  });

function FormatSwal() {
  const input = document.querySelectorAll('#textarea_swal')[5];
  var valor = input.value;
  valor = valor.replace(/[|!¡¿?°"#%{}*&''`´¨<>]/g, '');
  valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
  input.value = valor;
}
