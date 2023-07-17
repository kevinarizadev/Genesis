'use strict';
angular.module('GenesisApp')
  .controller('gestiontutelasareasController', ['$scope', '$http', '$filter',
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
        $scope.obtenerListadoTutelas();
        $('.modal').modal();
        setTimeout(() => {
          $scope.$apply();
        }, 500);

        $scope.tipoRol = "";
        if ($scope.List.listadoCargos.findIndex(e => e.cod == $scope.Rol_Cargo) == -1) {
          $scope.tipoRol = "A";
        }

        //////VALIDAR REGIONAL JURIDICA//////
        if ($scope.List.listadoCargos.findIndex(e => e.cod == $scope.Rol_Cargo && e.reg == 'S') != -1) {
          $scope.tipoRol = "R";
        }

        //////VALIDAR JURIDICA NACIONAL//////
        if ($scope.List.listadoCargos.findIndex(e => e.cod == $scope.Rol_Cargo && e.nac == 'S') != -1) {
          $scope.tipoRol = "N";
        }
        //////////////////////////////////////////////////////////
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
          // accionante: '',
          estado: '',


          tipoDocAccionante: '',
          numDocAccionante: '',
          nombreDocAccionante: '',

          listadoCausaSalud: [{ x: '1' }, { x: '2' }, { x: '3' }],
          listadoCausas: [{ x: '1' }, { x: '2' }, { x: '3' }],

          ttoIntegral: false,
          sgtoContinuo: false,

          soporteAdmision: 'temp/Servicio_20230216_214030.pdf',
          soporteFallo: 'temp/Servicio_20230216_214030.pdf',
          soporteFalloImp: 'temp/Servicio_20230216_214030.pdf',
          soporteModal: '',
          soporteModalTipo: '',

          listadoGestionesPendientes: [],
          listadoGestiones: [],
          listadoComentarios: [],

          observacionArea: '',

          comentarioNacional: '',
          // soporte_URL: '',
          soporte_B64: '',

          gestionaArea: false,
          gestionaRegional: false,
          gestionaNacional: false,

        };



        setTimeout(() => {
          $scope.$apply();
        }, 300);
      }

      $scope.listLimpiar = function () {
        $scope.List = {
          listadoTutelas: [],

          listadoCargos: [
            { cod: "32", nombre: "ASISTENTE SECCIONAL JURIDICO", reg: "S", nac: "N" },
            { cod: "109", nombre: "AUXILIAR NACIONAL JURIDICO", reg: "N", nac: "S" },
            { cod: "24", nombre: "ASISTENTE NACIONAL JURIDICO", reg: "N", nac: "S" },
            { cod: "153", nombre: "ESPECIALISTA NACIONAL JURIDICO", reg: "N", nac: "S" },
            { cod: "75", nombre: "COORDINADOR NACIONAL JURIDICO", reg: "N", nac: "S" },
            { cod: "169", nombre: "JEFE DE OFICINA JURIDICO", reg: "N", nac: "S" }
          ]
        };
      }
      $scope.obtenerListadoTutelas = function () {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          // allowOutsideClick: false,
          // allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $scope.List.listadoTutelas = [];
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/gestiontutelasareas.php",
          data: {
            function: 'p_obtener_tutelas'
          }
        }).then(function ({ data }) {
          swal.close()
          if (data.toString().substr(0, 3) != '<br' && data != 0) {
            // $scope.List.listadoTutelas = data;
            for (var i = 0; i < 100; i++) {
              const x = {
                CODIGO_TUT: i + '123456',
                RADICADO_TUT: '123456-2109',
                REGIONAL: 'ATLANTICO',
                ACCIONANTE: 'EPS',
                ESTADO: 'PENDIENTE',
              };
              $scope.List.listadoTutelas.push(x)
            }

            $scope.initPaginacion($scope.List.listadoTutelas);

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

        $scope.Form.codTutela = x.CODIGO_TUT;
        $scope.Form.radTutela = x.RADICADO_TUT;
        $scope.Form.regional = x.REGIONAL;
        $scope.Form.estado = x.ESTADO;


        $scope.Form.tipoDocAccionante = 'CC';
        $scope.Form.numDocAccionante = '1234567';
        $scope.Form.nombreDocAccionante = 'PEDRO RIOS PEREZ';
        // $scope.Form.consUbi = x.CONS_UBI;
        // $scope.Form.oficina = 'Oficina: ' + x.DEPARTAMENTO + ' > ' + x.MUNICIPIO + ' > ' + x.UBGC_NOMBRE;
        // $scope.Form.direccion = 'Dirección: ' + x.DIRECCION;
        // $scope.Form.horario = x.HORARIO;
        // $scope.Form.telefono = 'Teléfono: ' + x.TELEFONO;
        // $scope.Form.mananaHoraEntrada = x.MANANAHORAENTRADA;
        // $scope.Form.mananaHorasalida = x.MANANAHORASALIDA;
        // $scope.Form.tardeHoraEntrada = x.TARDEHORAENTRADA;
        // $scope.Form.tardeHorasalida = x.TARDEHORASALIDA;
        // $scope.Form.jornadaContinua = x.JORNADACONTINUA == 'S' ? true : false;

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


        $scope.Form.listadoGestionesPendientes = [{ x: '1' }, { x: '2' }, { x: '3' }];

        console.log("gestionaArea:", $scope.Form.gestionaArea, "// gestionaRegional:", $scope.Form.gestionaRegional, "// gestionaNacional:", $scope.Form.gestionaNacional)








        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.cargarSoporte = function () {
        return new Promise((resolve) => {
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Guardando Soporte...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          $http({
            method: 'POST',
            url: "php/juridica/tutelas/gestiontutelasareas.php",
            data: { function: "cargarSoporte", tutela: $scope.Form.codTutela, base64: $scope.Form.soporte_B64 }
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != '<br') {
              resolve(data);
            } else {
              resolve(false);
            }
          })
        });
      }

      $scope.guardarGestionArea = function () {
        if (!$scope.Form.observacionArea || $scope.Form.observacionArea.toString().length <= 20) {
          Materialize.toast('¡Debe digitar una observación!', 3000);
          return
        }
        if ($scope.Form.soporte_B64 == '') {
          Materialize.toast('¡Debe adjuntar un soporte!', 3000);
          return
        }
        // $scope.cargarSoporte().then((result) => {
        //   console.log(result);
        // })

        // swal({
        //   html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
        //   width: 200,
        //   allowOutsideClick: false,
        //   allowEscapeKey: false,
        //   showConfirmButton: false,
        //   animation: false
        // });
        // $http({
        //   method: 'POST',
        //   url: "php/juridica/tutelas/gestiontutelasareas.php",
        //   data: {
        //     function: "p_guardar_gestion_area",

        //     responsable: $scope.Rol_Cedula
        //   }
        // }).then(function ({ data }) {
        //   if (data.toString().substr(0, 3) != '<br') {
        //     if (data.codigo == 0) {

        //       $scope.obtenerListadoProyectos();
        //       swal("¡Mensaje!", data.mensaje, "success").catch(swal.noop);
        //     } else {
        //       swal("¡Importante!", data.error, "warning").catch(swal.noop);
        //     }
        //   }
        // })

      }

      $scope.guardarGestionRegional = function (accion) {
        if (accion == 'A') {

        }
        if (accion == 'X') {
          swal({
            title: 'Observación de rechazo',
            input: 'textarea',
            inputPlaceholder: 'Escribe una observacion...',
            showCancelButton: true,
            allowOutsideClick: false,
            inputAttributes: {
              id: "textarea_swal",
              onkeyup: "Format()"
            },
            // inputValue: $scope.Motivo_Anulacion_Devolucion
          }).then(function (result) {
            if (result && result !== '') {
              // $scope.HojaGlosa.OBSERVACION = result;
              // swal({
              //   title: '¡Observación agregada!',
              //   type: 'success',
              // }).catch(swal.noop);
              // setTimeout(() => {
              //   $scope.$apply();
              // }, 300);
            } else {
              Materialize.toast('¡La observacion no puede estar vacia!', 3000);
            }
          }).catch(swal.noop);
          // document.querySelector('.swal2-textarea').style.height = '300px';
        }



      }

      $scope.guardarGestionNacional = function () {
        if (!$scope.Form.comentarioNacional || $scope.Form.comentarioNacional.toString().length <= 20) {
          Materialize.toast('¡Debe digitar un comentario!', 3000);
          return
        }

        // swal({
        //   html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
        //   width: 200,
        //   allowOutsideClick: false,
        //   allowEscapeKey: false,
        //   showConfirmButton: false,
        //   animation: false
        // });
        // $http({
        //   method: 'POST',
        //   url: "php/juridica/tutelas/gestiontutelasareas.php",
        //   data: {
        //     function: "p_guardar_gestion_area",
        //     tutela: $scope.Form.codTutela,
        //     comentario: $scope.Form.comentarioNacional,
        //     responsable: $scope.Rol_Cedula
        //   }
        // }).then(function ({ data }) {
        //   if (data.toString().substr(0, 3) != '<br') {
        //     if (data.codigo == 0) {

        //       $scope.obtenerListadoProyectos();
        //       swal("¡Mensaje!", data.mensaje, "success").catch(swal.noop);
        //     } else {
        //       swal("¡Importante!", data.error, "warning").catch(swal.noop);
        //     }
        //   }
        // })

      }

      $scope.verHistoricoTutela = function () {
        $scope.Form.listadoGestiones = [{ x: '1' }, { x: '2' }, { x: '3' }];
        $scope.Form.listadoComentarios = [{ x: '1' }, { x: '2' }, { x: '3' }, { x: '4' }, { x: '5' }, { x: '6' }];
        $scope.openModal('modal_Historicotutela');

        // $http({
        //   method: 'POST',
        //   url: "php/juridica/tutelas/gestiontutelasareas.php",
        //   data: {
        //     function: 'descargaAdjunto',
        //     ruta: url
        //   }
        // }).then(function ({ data }) {
        //   swal.close()
        //   if (data.toString().substr(0, 3) != '<br' && data != 0) {
        // $scope.Form.listadoHistorico = data;
        //     $scope.Form.soporteModalTipo = tipo;
        //     $scope.openModal('Modal_Soportes');
        //   } else {
        //     swal("¡Importante!", "Inconveniente al cargar el soporte", "info").catch(swal.noop);
        //   }
        // });
      }

      $scope.verSoporteModal = function (url, tipo) {
        $scope.Form.soporteModal = '';
        $scope.Form.soporteModalTipo = '';
        $scope.openModal('Modal_Soportes');

        setTimeout(() => {
          $scope.Form.soporteModal = url;
          $scope.Form.soporteModalTipo = tipo;
          setTimeout(() => { $scope.$apply(); }, 500);
        }, 3000);
        // $http({
        //   method: 'POST',
        //   url: "php/juridica/tutelas/gestiontutelasareas.php",
        //   data: {
        //     function: 'descargaAdjunto',
        //     ruta: url
        //   }
        // }).then(function ({ data }) {
        //   swal.close()
        //   if (data.toString().substr(0, 3) != '<br' && data != 0) {
        //     $scope.Form.soporteModal = data;
        //     $scope.Form.soporteModalTipo = tipo;
        //     $scope.openModal('Modal_Soportes');
        //   } else {
        //     swal("¡Importante!", "Inconveniente al cargar el soporte", "info").catch(swal.noop);
        //   }
        // });
      }


      $scope.atras = function () {
        $scope.Form.Status = 0;
        setTimeout(function () { $scope.$apply(); }, 500);
      }


      document.querySelector('#FormFile').addEventListener('change', function (e) {
        $scope.Form.soporte_B64 = "";
        setTimeout(() => { $scope.$apply(); }, 500);
        var files = e.target.files;
        if (files.length != 0) {
          for (let i = 0; i < files.length; i++) {
            const x = files[i].name.split('.');
            if (x[x.length - 1].toUpperCase() == 'PDF') {
              if (files[i].size < 15485760 && files[i].size > 0) {
                $scope.getBase64(files[i]).then(function (result) {
                  $scope.Form.soporte_B64 = result;
                  setTimeout(function () { $scope.$apply(); }, 300);
                });
              } else {
                document.querySelector('#FormFile').value = '';
                swal('Advertencia', '¡Uno de los archivos seleccionados excede el peso máximo posible (15MB)!', 'info');
              }
            } else {
              document.querySelector('#FormFile').value = '';
              swal('Advertencia', '¡El archivo seleccionado debe ser formato PDF!', 'info');
            }
          }
        }
      });
      $scope.getBase64 = function (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }


      $scope.Obtener_Tipos_Documentos = function () {
        $http({
          method: 'POST',
          url: "php/genesis/funcgenesis.php",
          data: {
            function: 'Obtener_Tipos_Documentos',
            Tipo: 'S'
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.Tipos_Documentos = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.Obtener_Tipos_Documentos();

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
          $scope.listDatosTemp = $filter('filter')($scope.List.listadoTutelas, val);
          $scope.configPages();
          $scope.Filter_Val = val;
        } else {
          $scope.listDatosTemp = $filter('filter')($scope.List.listadoTutelas, '');
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

function Format() {
  const input = document.querySelectorAll('#textarea_swal')[5];
  var valor = input.value;
  valor = valor.replace(/[|!¡¿?°"#%{}*&''`´¨<>]/g, '');
  valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
  input.value = valor;
}