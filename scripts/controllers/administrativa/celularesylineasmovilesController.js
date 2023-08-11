'use strict';
angular.module('GenesisApp')
  .controller('celularesylineasmovilesController', ['$scope', '$http', '$filter',
    function ($scope, $http, $filter) {

      $scope.Inicio = function () {
        console.log($(window).width());
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.Ajustar_Pantalla();

        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        $('.tabs').tabs();
        $('.modal').modal();
        $scope.Tabs = 1;
        $scope.SysDay = new Date();


        $scope.hojaEquipo_Limpiar()
        $scope.hojaEquipo_Listar();
        $scope.hojaModem_Limpiar()
        $scope.hojaModem_Listar();
        $scope.hojaLinea_Limpiar()
        $scope.hojaLinea_Listar();
        $scope.hojaAsig_Limpiar()
        $scope.hojaAsig_Listar();
        //
        setTimeout(() => {
          $scope.hoja = {
            listadoTablaTraza: []
          };

          $scope.$apply();
        }, 500);
        setTimeout(() => {
          if (document.querySelector("#open-theme-settings"))
            document.querySelector("#open-theme-settings").style.display = 'none';
        }, 2500);
        //////////////////////////////////////////////////////////
      }
      /////// FUNCIONES RECURSIVAS ///////
      /////// FUNCIONES RECURSIVAS ///////
      $scope.obtenerCantidadEstado = function (hoja = null, tipo = null) {
        // console.log(tipo, $scope.hojaEquipo.listadoEstado)
        if (!tipo || !$scope[hoja].listadoTabla) { return '0' }
        return ($scope[hoja].listadoTabla.filter(e => e.GESC_ESTADO == tipo)).length
      }

      $scope.filtrarListadoEstado = function (hoja, estado) {
        if ($scope[hoja].filtroAnterior != estado) {
          $scope[hoja].listadoTablaTemp = $scope[hoja].listadoTabla.filter(e => e.GESC_ESTADO == estado);
          $scope.configPages('hojaEquipo');
          $scope[hoja].filtroAnterior = estado;
          return
        }
        $scope[hoja].listadoTablaTemp = $filter('filter')($scope[hoja].listadoTabla, '');
        $scope.configPages('hojaEquipo');
        $scope[hoja].filtroAnterior = '';
      }

      /////// EQUIPOS ///////
      /////// EQUIPOS ///////

      $scope.hojaEquipo_Limpiar = function () {
        $scope.hojaEquipo = {
          filtro: '',
          filtroAnterior: '',
          listadoTabla: [],
          listadoTablaTemp: [],
          varsTabla: {
            currentPage: 0,
            pageSize: 10,
            valmaxpag: 10,
            pages: []
          },

          formulario: {},
          listadoMarcas: [
            { nombre: 'SAMSUNG' },
            { nombre: 'APPLE' },
            { nombre: 'XIAOMI' },
            { nombre: 'OPPO' },
            { nombre: 'REALME' },
            { nombre: 'MOTOROLA' },
            { nombre: 'HUAWEI' },
            { nombre: 'HONOR' },
            { nombre: 'NOKIA' },
          ],
          listadoColores: [
            { nombre: 'NEGRO' },
            { nombre: 'BLANCO' },
            { nombre: 'AZUL' },
            { nombre: 'ROJO' },
            { nombre: 'VERDE' },
            { nombre: 'GRIS' },
            { nombre: 'PLATEADO' },
            { nombre: 'DORADO' },
          ],
          listadoEstado: [
            { codigo: 'D', nombre: 'Disponible' },
            { codigo: 'E', nombre: 'Asignado' },
            { codigo: 'X', nombre: 'Dado de Baja' },
            { codigo: 'S', nombre: 'En Stock' },
            { codigo: 'R', nombre: 'En Revisión' },
          ],

        }
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.hojaEquipo_ObtenerEstado = function (tipo = null) {
        // console.log(tipo, $scope.hojaEquipo.listadoEstado)
        if (!tipo || !$scope.hojaEquipo.listadoEstado) { return 'Ninguno' }
        return $scope.hojaEquipo.listadoEstado.find(e => e.codigo == tipo).nombre
      }
      $scope.hojaEquipo_ObtenerEstadoColor = function (tipo = null) {
        const tipos = {
          D: "etiquetaVerde",
          E: "etiquetaAzul",
          X: "etiquetaRoja",
          S: "etiquetaNaranja",
          R: "etiquetaMorado",
        };
        return tipos[tipo] || "Ninguno";
      }

      $scope.hojaEquipo_Listar = function (x) {
        if (!x)
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            showConfirmButton: false,
            animation: false
          });
        $scope.hojaEquipo.listadoTabla = [];
        $scope.hojaEquipo.listadoTablaTemp = [];
        $http({
          method: 'POST',
          url: "php/administrativa/celularesylineasmoviles.php",
          data: {
            function: 'p_consulta_equipo_cel'
          }
        }).then(function ({ data }) {
          if (!x) swal.close();
          if (data.toString().substr(0, 3) == '<br' || data.length == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.length) {
            $scope.hojaEquipo.listadoTabla = data
            $scope.hojaEquipo.listadoTablaTemp = data
            // $scope.hojaEquipo.varsTabla.pages
            $scope.initPaginacion('hojaEquipo', $scope.hojaEquipo.listadoTabla);
            setTimeout(() => { $scope.$apply(); }, 1500);
          }
        });
        // const data = [
        //   { estado: 'D' },
        //   { estado: 'E' },
        //   { estado: 'X' },
        //   { estado: 'S' },
        //   { estado: 'R' },
        // ]
        // $scope.hojaEquipo.listadoTabla = data
        // $scope.hojaEquipo.listadoTablaTemp = data
        // $scope.initPaginacion('hojaEquipo', $scope.hojaEquipo.listadoTabla);
      }


      $scope.hojaEquipo_CrearNuevo = function () {
        $scope.hojaEquipo.formulario = {};
        $scope.hojaEquipo.formulario.marca = ''
        $scope.hojaEquipo.formulario.numeroModel = ''
        // $scope.hojaEquipo.formulario.referencia = ''
        $scope.hojaEquipo.formulario.imei_1 = ''
        $scope.hojaEquipo.formulario.imei_2 = ''
        $scope.hojaEquipo.formulario.capacidad = ''
        $scope.hojaEquipo.formulario.color = ''
        $scope.hojaEquipo.formulario.estado = 'S'
        $scope.hojaEquipo.formulario.observacion = ''
        setTimeout(() => { $scope.$apply(); }, 500);
      }
      $scope.modalCrearEquipo = function () {
        $scope.hojaEquipo_CrearNuevo()
        $scope.openModal('modalCrearEquipo');
      }
      $scope.modalEditarEquipo = function (x) {
        $scope.hojaEquipo.formulario = {};
        $scope.hojaEquipo.formulario.idEquipo = x.GESN_CODIGO
        $scope.hojaEquipo.formulario.marca = x.GESC_MARCA_EQUIPO
        $scope.hojaEquipo.formulario.numeroModel = x.GESC_NUMERO_MODELO
        // $scope.hojaEquipo.formulario.referencia = x.GESC_REFERENCIA_EQUIPO
        $scope.hojaEquipo.formulario.imei_1 = x.GESN_IMEI_1
        $scope.hojaEquipo.formulario.imei_2 = x.GESN_IMEI_2
        $scope.hojaEquipo.formulario.capacidad = x.GESC_CAPACIDAD_GB
        $scope.hojaEquipo.formulario.color = x.GESC_COLOR
        $scope.hojaEquipo.formulario.estado = x.GESC_ESTADO
        $scope.hojaEquipo.formulario.observacion = x.GESC_OBSERVACION

        $scope.hojaEquipo.formulario.responsable = x.TERC_NOMBRE


        $scope.openModal('modalCrearEquipo');
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.validarFormEquipo = function () {
        return new Promise((resolve) => {
          if (!$scope.hojaEquipo.formulario.marca) resolve(false);
          if (!$scope.hojaEquipo.formulario.numeroModel) resolve(false);
          // if (!$scope.hojaEquipo.formulario.referencia) resolve(false);
          if (!$scope.hojaEquipo.formulario.imei_1) resolve(false);
          // if (!$scope.hojaEquipo.formulario.imei_2) resolve(false);
          if (!$scope.hojaEquipo.formulario.capacidad) resolve(false);
          if (!$scope.hojaEquipo.formulario.color) resolve(false);
          if (!$scope.hojaEquipo.formulario.estado) resolve(false);
          if ($scope.hojaEquipo.formulario.estado in { X: 'X', R: 'R' } && !$scope.hojaEquipo.formulario.observacion) resolve(false);
          // X - R
          resolve(true)
        });
      }

      $scope.guardarFormEquipo = function () {
        $scope.validarFormEquipo().then(res => {
          if (!res) { swal("¡Importante!", "Diligencia los campos requeridos (*)", "warning").catch(swal.noop); return }
          const text = !$scope.hojaEquipo.formulario.idEquipo ? '¿Desea crear el equipo?' : '¿Desea actualizar el equipo?';
          swal({
            title: 'Confirmar',
            text,
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
              });
              const data = {
                codigo: !$scope.hojaEquipo.formulario.idEquipo ? '' : $scope.hojaEquipo.formulario.idEquipo,
                marca: $scope.hojaEquipo.formulario.marca,
                numeroModel: $scope.hojaEquipo.formulario.numeroModel,
                referencia: $scope.hojaEquipo.formulario.referencia,
                imei_1: $scope.hojaEquipo.formulario.imei_1,
                imei_2: $scope.hojaEquipo.formulario.imei_2,
                capacidad: $scope.hojaEquipo.formulario.capacidad,
                color: $scope.hojaEquipo.formulario.color,
                estado: $scope.hojaEquipo.formulario.estado,
                observacion: $scope.hojaEquipo.formulario.observacion,
                responsable: $scope.Rol_Cedula
              }
              $http({
                method: 'POST',
                url: "php/administrativa/celularesylineasmoviles.php",
                data: {
                  function: "p_gestion_equipos",
                  data: JSON.stringify(data),
                  accion: !$scope.hojaEquipo.formulario.idEquipo ? 'I' : 'U'
                }
              }).then(function ({ data }) {
                if (data.toString().substr(0, 3) == '<br' || data == 0) {
                  swal("Error", data || 'Sin datos', "warning").catch(swal.noop); return
                }
                if (data.Codigo == 0) {
                  swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                  $scope.hojaEquipo_Listar(1);
                  $scope.closeModal()
                }
                if (data.Codigo == 1) {
                  swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                }
              })
            }
          })
        })

      }
      $scope.modalVerTrazaEquipo = function (x) {
        $scope.hoja.listadoTablaTraza = [];
        $http({
          method: 'POST',
          url: "php/administrativa/celularesylineasmoviles.php",
          data: {
            function: 'p_trazabilidad_cel',
            codigo: x.GESN_CODIGO
          }
        }).then(function ({ data }) {
          if (!x) swal.close();
          if (data.toString().substr(0, 3) == '<br' || data.length == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.length) {
            $scope.hoja.listadoTablaTraza = data
            $scope.openModal('modalTrazabilidad');
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        });
      }
      /////// EQUIPOS ///////
      /////// EQUIPOS ///////


      /////// MODEMS ///////
      /////// MODEMS ///////
      $scope.hojaModem_Limpiar = function () {
        $scope.hojaModem = {
          filtro: '',
          filtroAnterior: '',
          listadoTabla: [],
          listadoTablaTemp: [],
          varsTabla: {
            currentPage: 0,
            pageSize: 10,
            valmaxpag: 10,
            pages: []
          },

          formulario: {},
          listadoMarcas: [
            { nombre: 'SAMSUNG' },
            { nombre: 'APPLE' },
            { nombre: 'XIAOMI' },
            { nombre: 'OPPO' },
            { nombre: 'REALME' },
            { nombre: 'MOTOROLA' },
            { nombre: 'HUAWEI' },
            { nombre: 'HONOR' },
            { nombre: 'NOKIA' },
          ],
          listadoColores: [
            { nombre: 'NEGRO' },
            { nombre: 'BLANCO' }
          ],
          listadoEstado: [
            { codigo: 'D', nombre: 'Disponible' },
            { codigo: 'E', nombre: 'Asignado' },
            { codigo: 'X', nombre: 'Dado de Baja' },
            { codigo: 'S', nombre: 'En Stock' },
            { codigo: 'R', nombre: 'En Revisión' },
          ],

        }
      }
      $scope.hojaModem_ObtenerEstado = function (tipo = null) {
        // console.log(tipo, $scope.hojaModem.listadoEstado)
        if (!tipo || !$scope.hojaModem.listadoEstado) { return 'Ninguno' }
        return $scope.hojaModem.listadoEstado.find(e => e.codigo == tipo).nombre
      }
      $scope.hojaModem_ObtenerEstadoColor = function (tipo = null) {
        const tipos = {
          D: "etiquetaVerde",
          E: "etiquetaAzul",
          X: "etiquetaRoja",
          S: "etiquetaNaranja",
          R: "etiquetaMorado",
        };
        return tipos[tipo] || "Ninguno";
      }
      $scope.hojaModem_Listar = function (x) {
        if (!x)
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            showConfirmButton: false,
            animation: false
          });
        $scope.hojaModem.listadoTabla = [];
        $scope.hojaModem.listadoTablaTemp = [];
        $http({
          method: 'POST',
          url: "php/administrativa/celularesylineasmoviles.php",
          data: {
            function: 'p_consulta_equipo_modem'
          }
        }).then(function ({ data }) {
          if (!x) swal.close();
          if (data.toString().substr(0, 3) == '<br' || data.length == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.length) {
            $scope.hojaModem.listadoTabla = data
            $scope.hojaModem.listadoTablaTemp = data
            $scope.initPaginacion('hojaModem', $scope.hojaModem.listadoTabla);
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        });
        // const data = [
        //   { estado: 'D' },
        //   { estado: 'E' },
        //   { estado: 'X' },
        //   { estado: 'S' },
        //   { estado: 'R' },
        // ]
        // $scope.hojaModem.listadoTabla = data
        // $scope.hojaModem.listadoTablaTemp = data
        // $scope.initPaginacion('hojaModem', $scope.hojaModem.listadoTabla);
      }
      $scope.hojaModem_CrearNuevo = function () {
        $scope.hojaModem.formulario = {};
        $scope.hojaModem.formulario.marca = ''
        // $scope.hojaModem.formulario.referencia = ''
        $scope.hojaModem.formulario.imei_1 = ''
        $scope.hojaModem.formulario.estado = 'S'
        $scope.hojaModem.formulario.observacion = ''
        setTimeout(() => { $scope.$apply(); }, 500);
      }
      $scope.modalCrearModem = function () {
        $scope.hojaModem_CrearNuevo()
        $scope.openModal('modalCrearModem');
      }
      $scope.modalEditarModem = function (x) {
        $scope.hojaModem.formulario = {};
        $scope.hojaModem.formulario.idModem = x.GESN_CODIGO
        $scope.hojaModem.formulario.marca = x.GESC_MARCA_MODEM
        // $scope.hojaModem.formulario.referencia = x.GESC_REFERENCIA_MODEM
        $scope.hojaModem.formulario.imei_1 = x.GESN_IMEI_1
        $scope.hojaModem.formulario.estado = x.GESC_ESTADO
        $scope.hojaModem.formulario.observacion = x.GESC_OBSERVACION

        $scope.hojaModem.formulario.responsable = x.TERC_NOMBRE


        $scope.openModal('modalCrearModem');
        setTimeout(() => { $scope.$apply(); }, 500);
      }
      $scope.validarFormModem = function () {
        return new Promise((resolve) => {
          if (!$scope.hojaModem.formulario.marca) resolve(false);
          // if (!$scope.hojaModem.formulario.referencia) resolve(false);
          if (!$scope.hojaModem.formulario.imei_1) resolve(false);
          if (!$scope.hojaModem.formulario.estado) resolve(false);
          if ($scope.hojaModem.formulario.estado in { X: 'X', R: 'R' } && !$scope.hojaModem.formulario.observacion) resolve(false);
          // X - R
          resolve(true)
        });
      }
      $scope.guardarFormModem = function () {
        $scope.validarFormModem().then(res => {
          if (!res) { swal("¡Importante!", "Diligencia los campos requeridos (*)", "warning").catch(swal.noop); return }
          const text = !$scope.hojaModem.formulario.idModem ? '¿Desea crear el modem?' : '¿Desea actualizar el modem?';
          swal({
            title: 'Confirmar',
            text,
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
              });
              const data = {
                codigo: !$scope.hojaModem.formulario.idModem ? '' : $scope.hojaModem.formulario.idModem,
                marca: $scope.hojaModem.formulario.marca,
                // referencia: $scope.hojaModem.formulario.referencia,
                imei_1: $scope.hojaModem.formulario.imei_1,
                estado: $scope.hojaModem.formulario.estado,
                observacion: $scope.hojaModem.formulario.observacion,
                responsable: $scope.Rol_Cedula
              }
              $http({
                method: 'POST',
                url: "php/administrativa/celularesylineasmoviles.php",
                data: {
                  function: "p_gestion_modem",
                  data: JSON.stringify(data),
                  accion: !$scope.hojaModem.formulario.idModem ? 'I' : 'U'
                }
              }).then(function ({ data }) {
                if (data.toString().substr(0, 3) == '<br' || data == 0) {
                  swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                }
                if (data.Codigo == 0) {
                  swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                  $scope.hojaModem_Listar(1);
                  $scope.closeModal()
                }
                if (data.Codigo == 1) {
                  swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                }
              })
            }
          })
        })
      }
      $scope.modalVerTrazaModem = function (x) {
        $scope.hoja.listadoTablaTraza = [];
        $http({
          method: 'POST',
          url: "php/administrativa/celularesylineasmoviles.php",
          data: {
            function: 'p_trazabilidad_modem',
            codigo: x.GESN_CODIGO
          }
        }).then(function ({ data }) {
          if (!x) swal.close();
          if (data.toString().substr(0, 3) == '<br' || data.length == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.length) {
            $scope.hoja.listadoTablaTraza = data
            $scope.openModal('modalTrazabilidad');
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        });
      }
      /////// MODEMS ///////
      /////// MODEMS ///////

      /////// LINEAS ///////
      /////// LINEAS ///////

      $scope.hojaLinea_Limpiar = function () {
        $scope.hojaLinea = {
          filtro: '',
          filtroAnterior: '',
          listadoTabla: [],
          listadoTablaTemp: [],
          varsTabla: {
            currentPage: 0,
            pageSize: 10,
            valmaxpag: 10,
            pages: []
          },
          formulario: {},
          listadoOperadores: [
            { nombre: 'TIGO' },
            { nombre: 'CLARO' },
            { nombre: 'MOVISTAR' },
            { nombre: 'WOM' },
          ],
          listadoTipoLinea: [
            { codigo: 'C', nombre: 'Linea Celular' },
            { codigo: 'M', nombre: 'Modem' },
          ],
          listadoEstado: [
            { codigo: 'D', nombre: 'Disponible' },
            { codigo: 'E', nombre: 'Asignado' },
            { codigo: 'X', nombre: 'Dado de Baja' },
            { codigo: 'S', nombre: 'En Stock' },
            { codigo: 'R', nombre: 'En Revisión' },
          ],
          listadoFechaCorte: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
            11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            31
          ]
        }
      }
      $scope.hojaLinea_ObtenerEstado = function (tipo = null) {
        // console.log(tipo, $scope.hojaLinea.listadoEstado)
        if (!tipo || !$scope.hojaLinea.listadoEstado) { return 'Ninguno' }
        return $scope.hojaLinea.listadoEstado.find(e => e.codigo == tipo).nombre
      }
      $scope.hojaLinea_ObtenerEstadoColor = function (tipo = null) {
        const tipos = {
          D: "etiquetaVerde",
          E: "etiquetaAzul",
          X: "etiquetaRoja",
          S: "etiquetaNaranja",
          R: "etiquetaMorado",
        };
        return tipos[tipo] || "Ninguno";
      }
      $scope.hojaLinea_Listar = function (x) {
        if (!x)
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            showConfirmButton: false,
            animation: false
          });
        $scope.hojaLinea.listadoTabla = [];
        $scope.hojaLinea.listadoTablaTemp = [];
        $http({
          method: 'POST',
          url: "php/administrativa/celularesylineasmoviles.php",
          data: {
            function: 'p_consulta_linea'
          }
        }).then(function ({ data }) {
          if (!x) swal.close();
          if (data.toString().substr(0, 3) == '<br' || data.length == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.length) {
            $scope.hojaLinea.listadoTabla = data
            $scope.hojaLinea.listadoTablaTemp = data
            $scope.initPaginacion('hojaLinea', $scope.hojaLinea.listadoTabla);
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        });
        // const data = [
        //   { estado: 'D' },
        //   { estado: 'E' },
        //   { estado: 'X' },
        //   { estado: 'S' },
        //   { estado: 'R' },
        // ]
        // $scope.hojaLinea.listadoTabla = data
        // $scope.hojaLinea.listadoTablaTemp = data
        // $scope.initPaginacion('hojaLinea', $scope.hojaLinea.listadoTabla);
      }
      $scope.hojaLinea_CrearNuevo = function () {
        $scope.hojaLinea.formulario = {};
        $scope.hojaLinea.formulario.operador = ''
        $scope.hojaLinea.formulario.numeroLinea = ''
        $scope.hojaLinea.formulario.tipo = ''
        $scope.hojaLinea.formulario.descripcionPlan = ''
        $scope.hojaLinea.formulario.gigas = ''
        $scope.hojaLinea.formulario.numeroCuenta = ''
        $scope.hojaLinea.formulario.valorPlan = ''
        $scope.hojaLinea.formulario.fechaCorte = ''
        $scope.hojaLinea.formulario.estado = 'S'
        $scope.hojaLinea.formulario.observacion = ''
        setTimeout(() => { $scope.$apply(); }, 500);
      }
      $scope.modalCrearLinea = function () {
        $scope.hojaLinea_CrearNuevo()
        $scope.openModal('modalCrearLinea');
      }
      $scope.modalEditarLinea = function (x) {
        $scope.hojaLinea.formulario = {};
        $scope.hojaLinea.formulario.idLinea = x.GESN_CODIGO
        $scope.hojaLinea.formulario.operador = x.GESC_OPERADOR
        $scope.hojaLinea.formulario.numeroLinea = x.GESN_NUMERO_LINEA
        $scope.hojaLinea.formulario.tipo = x.GESC_TIPO_LINEA ? x.GESC_TIPO_LINEA.split('-')[0] : ''
        $scope.hojaLinea.formulario.descripcionPlan = x.GESC_DESCRIPCION_PLAN
        $scope.hojaLinea.formulario.gigas = x.GESC_GIGAS
        $scope.hojaLinea.formulario.numeroCuenta = x.GESC_NUMERO_CUENTA
        $scope.hojaLinea.formulario.valorPlan = x.GESN_VALOR_PLAN
        $scope.hojaLinea.formulario.fechaCorte = x.GESF_FECHA_CORTE ? x.GESF_FECHA_CORTE.trim() : ''
        // $scope.hojaLinea.formulario.fechaCorte = x.GESF_FECHA_CORTE ? new Date(x.GESF_FECHA_CORTE.split('/')[2], x.GESF_FECHA_CORTE.split('/')[1], x.GESF_FECHA_CORTE.split('/')[0]) : ''
        $scope.hojaLinea.formulario.estado = x.GESC_ESTADO
        $scope.hojaLinea.formulario.observacion = x.GESC_OBSERVACION

        $scope.hojaLinea.formulario.responsable = x.TERC_NOMBRE

        $scope.openModal('modalCrearLinea');
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.validarFormLinea = function () {
        return new Promise((resolve) => {
          if (!$scope.hojaLinea.formulario.operador) resolve(false);
          if (!$scope.hojaLinea.formulario.numeroLinea) resolve(false);
          if (!$scope.hojaLinea.formulario.tipo) resolve(false);
          if (!$scope.hojaLinea.formulario.descripcionPlan) resolve(false);
          if (!$scope.hojaLinea.formulario.gigas) resolve(false);
          // if (!$scope.hojaLinea.formulario.numeroCuenta) resolve(false);
          if (!$scope.hojaLinea.formulario.valorPlan) resolve(false);
          // if (!$scope.hojaLinea.formulario.fechaCorte) resolve(false);
          if (!$scope.hojaLinea.formulario.estado) resolve(false);
          if ($scope.hojaLinea.formulario.estado in { X: 'X', R: 'R' } && !$scope.hojaLinea.formulario.observacion) resolve(false);
          // X - R
          resolve(true)
        });
      }

      $scope.guardarFormLinea = function () {
        $scope.validarFormLinea().then(res => {
          if (!res) { swal("¡Importante!", "Diligencia los campos requeridos (*)", "warning").catch(swal.noop); return }
          const text = !$scope.hojaLinea.formulario.idLinea ? '¿Desea crear el linea?' : '¿Desea actualizar el linea?';
          swal({
            title: 'Confirmar',
            text,
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
              });
              const fechaCorte = $scope.hojaLinea.formulario.fechaCorte;
              const data = {
                codigo: !$scope.hojaLinea.formulario.idLinea ? '' : $scope.hojaLinea.formulario.idLinea,
                operador: $scope.hojaLinea.formulario.operador,
                numeroLinea: $scope.hojaLinea.formulario.numeroLinea,
                tipo: $scope.hojaLinea.formulario.tipo,
                descripcionPlan: $scope.hojaLinea.formulario.descripcionPlan,
                gigas: $scope.hojaLinea.formulario.gigas,
                numeroCuenta: $scope.hojaLinea.formulario.numeroCuenta,
                valorPlan: $scope.hojaLinea.formulario.valorPlan.replace(/\./g, ''),
                fechaCorte: fechaCorte,
                estado: $scope.hojaLinea.formulario.estado,
                observacion: $scope.hojaLinea.formulario.observacion,
                responsable: $scope.Rol_Cedula
              }
              $http({
                method: 'POST',
                url: "php/administrativa/celularesylineasmoviles.php",
                data: {
                  function: "p_gestion_lineas",
                  data: JSON.stringify(data),
                  accion: !$scope.hojaLinea.formulario.idLinea ? 'I' : 'U'
                }
              }).then(function ({ data }) {
                if (data.toString().substr(0, 3) == '<br' || data == 0) {
                  swal("Error", data || 'Sin datos', "warning").catch(swal.noop); return
                }
                if (data.Codigo == 0) {
                  swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                  $scope.hojaLinea_Listar(1);
                  $scope.closeModal()
                }
                if (data.Codigo == 1) {
                  swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                }
              })
            }
          })
        })
      }
      $scope.modalVerTrazaLinea = function (x) {
        $scope.hoja.listadoTablaTraza = [];
        $http({
          method: 'POST',
          url: "php/administrativa/celularesylineasmoviles.php",
          data: {
            function: 'p_trazabilidad_linea',
            codigo: x.GESN_CODIGO
          }
        }).then(function ({ data }) {
          if (!x) swal.close();
          if (data.toString().substr(0, 3) == '<br' || data.length == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.length) {
            $scope.hoja.listadoTablaTraza = data
            $scope.openModal('modalTrazabilidad');
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        });
      }

      /////// LINEAS ///////
      /////// LINEAS ///////


      /////// ASIGNACION ///////
      /////// ASIGNACION ///////
      $scope.hojaAsig_Limpiar = function () {
        $scope.hojaAsig = {
          filtro: '',
          filtroAnterior: '',
          listadoTabla: [],
          listadoTablaTemp: [],
          varsTabla: {
            currentPage: 0,
            pageSize: 10,
            valmaxpag: 10,
            pages: []
          },
          formulario: {},

          listadoLineas: [],
          listadoEquipos: [],
          listadoModems: [],
          listadoAcas: [],

          listadoEstado: [
            { codigo: 'P', nombre: 'Pendiente Acta' },
            { codigo: 'C', nombre: 'Completado' },
          ],
        }
      }
      $scope.hojaAsig_Listar = function (x) {
        if (!x)
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            showConfirmButton: false,
            animation: false
          });
        $scope.hojaAsig.listadoTabla = [];
        $scope.hojaAsig.listadoTablaTemp = [];
        $http({
          method: 'POST',
          url: "php/administrativa/celularesylineasmoviles.php",
          data: {
            function: 'p_consulta_asignacion'
          }
        }).then(function ({ data }) {
          if (!x) swal.close();
          if (data.toString().substr(0, 3) == '<br' || data.length == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.length) {
            data.forEach(e => {
              e.GESC_ESTADO = e.GESC_ACTA ? 'C' : 'P'
            });
            $scope.hojaAsig.listadoTabla = data
            $scope.hojaAsig.listadoTablaTemp = data
            $scope.initPaginacion('hojaAsig', $scope.hojaAsig.listadoTabla);
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        });
        // const data = [
        //   { estado: 'P' },
        //   { estado: 'C' },
        // ]
        // $scope.hojaAsig.listadoTabla = data
        // $scope.hojaAsig.listadoTablaTemp = data
        // $scope.initPaginacion('hojaAsig', $scope.hojaAsig.listadoTabla);
      }
      $scope.hojaAsig_ObtenerEstado = function (tipo = null) {
        // console.log(tipo, $scope.hojaAsig.listadoEstado)
        if (!tipo || !$scope.hojaAsig.listadoEstado) { return 'Ninguno' }
        return $scope.hojaAsig.listadoEstado.find(e => e.codigo == tipo).nombre
      }
      $scope.hojaAsig_ObtenerEstadoColor = function (tipo = null) {
        const tipos = {
          P: "etiquetaNaranja",
          C: "etiquetaAzul",
        };
        return tipos[tipo] || "Ninguno";
      }

      $scope.hojaAsig_CrearNuevo = function () {
        $scope.hojaAsig.formulario = {};
        $scope.hojaAsig.formulario.linea = ''
        $scope.hojaAsig.formulario.tipoLinea = ''
        $scope.hojaAsig.formulario.equipo = ''
        $scope.hojaAsig.formulario.modem = ''
        $scope.hojaAsig.formulario.mesaAyuda = ''
        $scope.hojaAsig.formulario.idFuncJefe = ''
        $scope.hojaAsig.formulario.nombre = ''
        $scope.hojaAsig.formulario.cargo = ''
        $scope.hojaAsig.formulario.area = ''
        $scope.hojaAsig.formulario.regional = ''
        $scope.hojaAsig.formulario.correo = '';
        $scope.hojaAsig.formulario.observacionAcas = '';
        $scope.hojaAsig.formulario.observacion = '';
        $scope.hojaAsig_ObtenerListado();
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.modalCrearAsig = function () {
        $scope.hojaAsig_CrearNuevo()
        $scope.openModal('modalCrearAsig');
      }
      $scope.modalEditarAsig = function (x) {
        // $scope.hojaAsig.formulario = {};
        // $scope.hojaAsig.formulario.idAsig = 'xxxx'

        // $scope.hojaAsig.formulario.linea = 'xxxx'
        // $scope.hojaAsig.formulario.tipoLinea = 'xxxx'
        // $scope.hojaAsig.formulario.equipo = 'xxxx'
        // $scope.hojaAsig.formulario.modem = 'xxxx'
        // $scope.hojaAsig.formulario.mesaAyuda = 'xxxx'
        // $scope.hojaAsig.formulario.nombre = 'xxxx'
        // $scope.hojaAsig.formulario.cargo = 'xxxx'
        // $scope.hojaAsig.formulario.area = 'xxxx'
        // $scope.hojaAsig.formulario.regional = 'xxxx'
        // $scope.hojaAsig.formulario.correo = 'xxxx'

        // $scope.openModal('modalCrearAsig');

        // $scope.hojaAsig.listadoEquipos = [];
        // $scope.hojaAsig.listadoLineas = [];
        // $scope.hojaAsig.listadoModems = [];
        // $scope.hojaAsig.listadoAcas = [];

        setTimeout(() => { $scope.$apply(); }, 500);
      }
      $scope.hojaAsig_ObtenerListado = function () {
        $scope.hojaAsig.listadoEquipos = []; //GESN_CODIGO - GESC_REFERENCIA_EQUIPO
        $scope.hojaAsig.listadoLineas = []; //GESN_CODIGO - GESN_NUMERO_LINEA
        $scope.hojaAsig.listadoModems = []; //GESN_CODIGO - GESC_REFERENCIA_MODEM
        $scope.hojaAsig.listadoAcas = [];
        $scope.hojaAsig.listadoFuncsJefe = [];

        $http({
          method: 'POST',
          url: "php/administrativa/celularesylineasmoviles.php",
          data: {
            function: 'p_consulta_equipo_cel'
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data.length == 0) {
            $scope.hojaAsig.formulario.equipo = 'NO EXISTEN EQUIPOS DISPONIBLES'
            return
          }
          if (data.length) {
            $scope.hojaAsig.listadoEquipos = data.filter(e => e.GESC_ESTADO == 'D');
            setTimeout(() => { $scope.$apply(); }, 500);
            if (!$scope.hojaAsig.listadoEquipos.length) {
              $scope.hojaAsig.formulario.equipo = 'NO EXISTEN EQUIPOS DISPONIBLES'
            }
          }
        });
        $http({
          method: 'POST',
          url: "php/administrativa/celularesylineasmoviles.php",
          data: {
            function: 'p_consulta_linea'
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data.length == 0) {
            $scope.hojaAsig.formulario.linea = 'NO EXISTEN LINEAS DISPONIBLES'
            return
          }
          if (data.length) {
            $scope.hojaAsig.listadoLineas = data.filter(e => e.GESC_ESTADO == 'D');
            setTimeout(() => { $scope.$apply(); }, 500);
            if (!$scope.hojaAsig.listadoLineas.length) {
              $scope.hojaAsig.formulario.linea = 'NO EXISTEN LINEAS DISPONIBLES'
            }
          }
        });
        $http({
          method: 'POST',
          url: "php/administrativa/celularesylineasmoviles.php",
          data: {
            function: 'p_consulta_equipo_modem'
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data.length == 0) {
            $scope.hojaAsig.formulario.modem = 'NO EXISTEN MODEMS DISPONIBLES'
            return
          }
          if (data.length) {
            $scope.hojaAsig.listadoModems = data.filter(e => e.GESC_ESTADO == 'D');
            setTimeout(() => { $scope.$apply(); }, 500);
            if (!$scope.hojaAsig.listadoModems.length) {
              $scope.hojaAsig.formulario.modem = 'NO EXISTEN MODEMS DISPONIBLES'
            }
          }
        });

        $http({
          method: 'POST',
          url: "php/administrativa/celularesylineasmoviles.php",
          data: {
            function: 'p_obtener_acas'
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data.length == 0) {
            $scope.hojaAsig.formulario.mesaAyuda = 'NO EXISTEN MESAS DE AYUDA DISPONIBLES'
            return
          }
          if (data.length) {
            $scope.hojaAsig.listadoAcas = data
            setTimeout(() => { $scope.$apply(); }, 500);
          } else {
            $scope.hojaAsig.formulario.mesaAyuda = 'NO EXISTEN MESAS DE AYUDA DISPONIBLES'
          }
        });
      }

      $scope.lineaSeleccionadaAsig = function () {
        const dato = $scope.hojaAsig.listadoLineas.filter(e => (e.GESN_CODIGO + ' - ' + e.GESN_NUMERO_LINEA + ' - ' + e.GESC_TIPO_LINEA.split('-')[1]) == $scope.hojaAsig.formulario.linea);
        if (dato.length) {
          $scope.hojaAsig.formulario.tipoLinea = dato[0].GESC_TIPO_LINEA.split('-')[0]
          setTimeout(() => { $scope.$apply(); }, 500);
        }
      }
      $scope.mesaAyudaSeleccionadaAsig = function () {
        const dato = $scope.hojaAsig.listadoAcas.filter(e => (e.CASN_NUMERO + ' - ' + e.TERC_NOMBRE) == $scope.hojaAsig.formulario.mesaAyuda);
        if (dato.length) {

          $scope.hojaAsig.formulario.observacionAcas = dato[0].CAST_DIAGNOSTICO

          $scope.obtenerFuncsJefe(dato[0].CASV_SOLICITANTE);
          setTimeout(() => { $scope.$apply(); }, 500);
        } else {
          $scope.hojaAsig.formulario.observacionAcas = ''
        }
      }
      $scope.obtenerFuncsJefe = function (cedula) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/administrativa/celularesylineasmoviles.php",
          data: {
            function: 'p_obtener_funcionario',
            cedula
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data.length == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.Codigo == 1) {
            swal("Error", data.Nombre, "warning").catch(swal.noop); return
          }
          if (data.length) {
            swal.close()
            $scope.hojaAsig.listadoFuncsJefe = data
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        })
      }

      $scope.obtenerFuncsJefeSeleccionado = function () {
        const dato = $scope.hojaAsig.listadoFuncsJefe.filter(e => (e.CODIGO + ' - ' + e.NOMBRE) == $scope.hojaAsig.formulario.idFuncJefe);
        if (dato.length) {

          $scope.hojaAsig.formulario.nombre = dato[0].NOMBRE
          $scope.hojaAsig.formulario.cargo = dato[0].CARGO
          $scope.hojaAsig.formulario.area = dato[0].AREA
          $scope.hojaAsig.formulario.regional = dato[0].REGIONAL
          $scope.hojaAsig.formulario.correo = dato[0].EMAIL

          setTimeout(() => { $scope.$apply(); }, 500);
        } else {
          $scope.hojaAsig.formulario.nombre = ''
          $scope.hojaAsig.formulario.cargo = ''
          $scope.hojaAsig.formulario.area = ''
          $scope.hojaAsig.formulario.regional = ''
          $scope.hojaAsig.formulario.correo = ''
        }
      }
      $scope.validarFormAsig = function () {
        return new Promise((resolve) => {
          if (!$scope.hojaAsig.formulario.linea) resolve(false);
          if (!$scope.hojaAsig.formulario.tipoLinea) resolve(false);
          // if ($scope.hojaAsig.formulario.tipoLinea == 'C' && !$scope.hojaAsig.formulario.equipo) resolve(false);
          // if ($scope.hojaAsig.formulario.tipoLinea == 'M' && !$scope.hojaAsig.formulario.modem) resolve(false);
          if (!$scope.hojaAsig.formulario.mesaAyuda) resolve(false);
          if (!$scope.hojaAsig.formulario.observacion) resolve(false);
          if (!$scope.hojaAsig.formulario.idFuncJefe) resolve(false);
          if (!$scope.hojaAsig.formulario.nombre) resolve(false);
          resolve(true)
        });
      }


      $scope.guardarFormAsig = function () {
        $scope.validarFormAsig().then(res => {
          if (!res) { swal("¡Importante!", "Diligencia los campos requeridos (*)", "warning").catch(swal.noop); return }
          const text = '¿Desea registrar la asignación?';
          swal({
            title: 'Confirmar',
            text,
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result) {
              swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
              });

              const equipoCelular = $scope.hojaAsig.formulario.equipo.indexOf('-') != -1 ? $scope.hojaAsig.formulario.equipo.split('-')[0].trim() : ''
              const equipoModem = $scope.hojaAsig.formulario.modem.indexOf('-') != -1 ? $scope.hojaAsig.formulario.modem.split('-')[0].trim() : ''

              const data = [{
                lineaMovil: $scope.hojaAsig.formulario.linea.split('-')[0].trim(),

                equipoCelular,
                equipoModem,

                mesaAyuda: $scope.hojaAsig.formulario.mesaAyuda.split('-')[0].trim(),
                funcionario: $scope.hojaAsig.formulario.idFuncJefe.split('-')[0].trim(),

                observacion: $scope.hojaAsig.formulario.observacion,

                responsable: $scope.Rol_Cedula
              }]
              // nombre: $scope.hojaAsig.formulario.nombre,
              // cargo: $scope.hojaAsig.formulario.cargo,
              // area: $scope.hojaAsig.formulario.area,
              // regional: $scope.hojaAsig.formulario.regional,
              // correo: $scope.hojaAsig.formulario.correo,
              $http({
                method: 'POST',
                url: "php/administrativa/celularesylineasmoviles.php",
                data: {
                  function: "p_insertar_asignacion",
                  data: JSON.stringify(data),
                }
              }).then(function ({ data }) {
                if (data.toString().substr(0, 3) == '<br' || data == 0) {
                  swal("Error", data || 'Sin datos', "warning").catch(swal.noop); return
                }
                if (data.Codigo == 0) {
                  swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                  $scope.hojaAsig_Listar(1);

                  $scope.hojaEquipo_Listar(1);
                  $scope.hojaModem_Listar(1);
                  $scope.hojaLinea_Listar(1);

                  $scope.closeModal()
                }
                if (data.Codigo == 1) {
                  swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                }
              })
            }
          })
        })
      }

      $scope.uploadSoporte = function (x) {
        $scope.hojaAsig.formulario.idAsig = x.GESN_CODIGO;
        $scope.hojaAsig.Soporte_URL = ''
        $scope.hojaAsig.Soporte_RUTA = ''
        $scope.hojaAsig.Soporte_B64 = ''
        swal({
          title: 'Cargar Soporte Acta',
          html: `
          <div class="col s12 m12 l12 m-b" style="margin-bottom: 1.5rem;">
            <div class="col s6 no-padding label-new m-b" id="AdjustSop">
              <div class="file-field input-field gray-input m-l input-file-radiu input-file-radius-opcional"
                style="margin: 0;width: -webkit-fill-available;">
                <div class="right">
                  <span class="black-text"><i class="icon-folder-open-1 default-color"
                    style="line-height: 2rem;"></i></span>
                    <input type="file" id="SoporteProces" ng-change="loadFile()">
                </div>
                <div class="file-path-wrapper">
                  <input class="file-path Soport" type="text" placeholder="Adjunte un archivo (PDF)"
                    readonly style="border-radius: 0;height: 2rem;border-bottom: 0;"
                    ng-change="loadFile()">
                </div>
              </div>
            </div>
          </div>
          `,
          width: '500px',
          preConfirm: function () {
            return new Promise(function (resolve) {
              resolve(
                {
                  soporte: $('#SporteProce').val(),
                }
              )
            })
          }
        }).then(function (result) {
          $scope.loadFile();
        })
      }

      $scope.loadFile = function () {
        var ValidarExistente = false;
        var fileInput = document.querySelector('#SoporteProces');
        if (ValidarExistente != true) {
          if (fileInput.files.length != 0) {
            var x = fileInput.files[0].name.split('.');
            if (x[x.length - 1].toUpperCase() == 'PDF') {
              if (fileInput.files.length > 0) {
                if (fileInput.files[0].size < 10485760 && fileInput.files[0].size > 0) {
                  $scope.getBase64(fileInput.files[0]).then(function (result) {
                    $scope.hojaAsig.Soporte_B64 = result;

                    $scope.cargarSoporte().then((resultSoporte) => {
                      // console.log(resultSoporte)
                      $scope.hojaAsig_GuardarSoporte(resultSoporte)
                    });
                    setTimeout(function () { $scope.$apply(); }, 300);
                  });
                } else {
                  swal('Advertencia', '¡El archivo seleccionado excede el peso máximo posible (10MB)!', 'info');
                  fileInput.value = '';
                  document.querySelector('#SoporteProces').value = '';
                  $scope.hojaAsig.Soporte_B64 = '';
                  setTimeout(function () { $scope.$apply(); }, 300);
                }
              }
            } else {
              swal('Advertencia', '¡El archivo seleccionado deber ser formato PDF!', 'info');
              fileInput.value = '';
              document.querySelector('#SoporteProces').value = '';
              $scope.hojaAsig.Soporte_B64 = '';
              setTimeout(function () { $scope.$apply(); }, 300);
            }
          } else {
            $scope.hojaAsig.Soporte_B64 = '';
            setTimeout(function () { $scope.$apply(); }, 300);
          }
        } else {
          swal('Advertencia', '¡Ya existe un archivo en el sistema!', 'info');
        }
      }

      $scope.hojaAsig_GuardarSoporte = function (soporteUrl) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });

        $http({
          method: 'POST',
          url: "php/administrativa/celularesylineasmoviles.php",
          data: {
            function: "p_cargar_soporte",
            codigo: $scope.hojaAsig.formulario.idAsig,
            ruta: soporteUrl,

            responsable: $scope.Rol_Cedula
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", data || 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.Codigo == 0) {
            swal("Mensaje", data.Nombre, "success").catch(swal.noop);
            $scope.hojaAsig_Listar(1);
            $scope.closeModal()
          }
          if (data.Codigo == 1) {
            swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
          }
        })
      }
      $scope.cargarSoporte = function () {
        return new Promise((resolve) => {
          if (!$scope.hojaAsig.Soporte_B64) { resolve(''); return }
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
            url: "php/administrativa/celularesylineasmoviles.php",
            data: {
              function: "cargarSoporte",
              codigo: "SoporteActa_" + $scope.hojaAsig.formulario.idAsig,
              base64: $scope.hojaAsig.Soporte_B64
            }
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != '<br') {
              resolve(data);
            } else {
              resolve(false);
            }
          })
        });
      }



      $scope.generarActa = function (x) {
        window.open('views/administrativa/formatos/acta_entrega_equipo.php?id=' + x.GESN_CODIGO, '_blank', "width=900,height=1100");
      }

      $scope.descargaInforme = function () {

        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/administrativa/celularesylineasmoviles.php",
          data: { function: 'p_exportar_informacion' }
        }).then(function ({ data }) {
          if (data.length) {
            var ws = XLSX.utils.json_to_sheet(data);
            /* add to workbook */
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
            /* write workbook and force a download */
            XLSX.writeFile(wb, "Exportado Administrativa.xlsx");
            const text = `Registros encontrados ${data.length}`
            swal('¡Mensaje!', text, 'success').catch(swal.noop);
          } else {
            swal('¡Mensaje!', 'Sin datos a mostrar', 'info').catch(swal.noop);
          }
        })
      }

      /////// ASIGNACION ///////
      /////// ASIGNACION ///////

      $scope.traza_ObtenerEstado = function (columna = null, tipo = null) {
        if (columna != 'ESTADO') {
          return tipo
        }
        // console.log(tipo, $scope.hojaLinea.listadoEstado)
        if (!tipo || !$scope.hojaLinea.listadoEstado) { return 'Ninguno' }
        return $scope.hojaLinea.listadoEstado.find(e => e.codigo == tipo).nombre
      }

      $scope.traza_ObtenerEstadoColor = function (columna = null, tipo = null) {
        if (columna != 'ESTADO') {
          return tipo
        }
        const tipos = {
          D: "status white-text fw700 pad5 etiquetaVerde",
          E: "status white-text fw700 pad5 etiquetaAzul",
          X: "status white-text fw700 pad5 etiquetaRoja",
          S: "status white-text fw700 pad5 etiquetaNaranja",
          R: "status white-text fw700 pad5 etiquetaMorado",
        };
        return tipos[tipo] || "Ninguno";
      }


      $scope.getBase64 = function (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }


      $scope.initPaginacion = function (hoja, info) {
        $scope[hoja].listadoTablaTemp = info;
        $scope[hoja].varsTabla.currentPage = 0;
        $scope[hoja].varsTabla.pageSize = 10;
        $scope[hoja].varsTabla.valmaxpag = 10;
        $scope[hoja].varsTabla.pages = [];
        $scope.configPages(hoja);
      }

      $scope.filter = function (hoja, val) {
        $scope[hoja].listadoTablaTemp = $filter('filter')($scope[hoja].listadoTabla, val);
        if ($scope[hoja].listadoTablaTemp.length > 0) {
          $scope.setPage(hoja, 1);
        }
        $scope.configPages(hoja);
      }

      $scope.configPages = function (hoja) {
        $scope[hoja].varsTabla.pages.length = 0;
        var ini = $scope[hoja].varsTabla.currentPage - 4;
        var fin = $scope[hoja].varsTabla.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (Math.ceil($scope[hoja].listadoTablaTemp.length / $scope[hoja].varsTabla.pageSize) > $scope[hoja].varsTabla.valmaxpag)
            fin = 10;
          else
            fin = Math.ceil($scope[hoja].listadoTablaTemp.length / $scope[hoja].varsTabla.pageSize);
        } else {
          if (ini >= Math.ceil($scope[hoja].listadoTablaTemp.length / $scope[hoja].varsTabla.pageSize) - $scope[hoja].varsTabla.valmaxpag) {
            ini = Math.ceil($scope[hoja].listadoTablaTemp.length / $scope[hoja].varsTabla.pageSize) - $scope[hoja].varsTabla.valmaxpag;
            fin = Math.ceil($scope[hoja].listadoTablaTemp.length / $scope[hoja].varsTabla.pageSize);
          }
        }
        if (ini < 1) ini = 1;
        for (var i = ini; i <= fin; i++) {
          $scope[hoja].varsTabla.pages.push({
            no: i
          });
        }

        if ($scope[hoja].varsTabla.currentPage >= $scope[hoja].varsTabla.pages.length)
          $scope[hoja].varsTabla.currentPage = $scope[hoja].varsTabla.pages.length - 1;
      }
      $scope.setPage = function (hoja, index) {
        $scope[hoja].varsTabla.currentPage = index - 1;
      }
      $scope.paso = function (hoja, tipo) {
        if (tipo == 'next') {
          var i = $scope[hoja].varsTabla.pages[0].no + 1;
          if ($scope[hoja].varsTabla.pages.length > 9) {
            var fin = $scope[hoja].varsTabla.pages[9].no + 1;
          } else {
            var fin = $scope[hoja].varsTabla.pages.length;
          }

          $scope[hoja].varsTabla.currentPage = $scope[hoja].varsTabla.currentPage + 1;
          if ($scope[hoja].listadoTablaTemp.length % $scope[hoja].varsTabla.pageSize == 0) {
            var tamanomax = parseInt($scope[hoja].listadoTablaTemp.length / $scope[hoja].varsTabla.pageSize);
          } else {
            var tamanomax = parseInt($scope[hoja].listadoTablaTemp.length / $scope[hoja].varsTabla.pageSize) + 1;
          }
          if (fin > tamanomax) {
            fin = tamanomax;
            i = tamanomax - 9;
          }
        } else {
          var i = $scope[hoja].varsTabla.pages[0].no - 1;
          if ($scope[hoja].varsTabla.pages.length > 9) {
            var fin = $scope[hoja].varsTabla.pages[9].no - 1;
          } else {
            var fin = $scope[hoja].varsTabla.pages.length;
          }

          $scope[hoja].varsTabla.currentPage = $scope[hoja].varsTabla.currentPage - 1;
          if (i <= 1) {
            i = 1;
            fin = $scope[hoja].varsTabla.pages.length;
          }

        }
        $scope.calcular(hoja, i, fin);
      }
      $scope.calcular = function (hoja, i, fin) {
        if (fin > 9) {
          i = fin - 9;
        } else {
          i = 1;
        }
        $scope[hoja].varsTabla.pages = [];
        for (i; i <= fin; i++) {
          $scope[hoja].varsTabla.pages.push({
            no: i
          });
        }
      }
      $scope.FormatPeso = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/[^0-9,]/g, '');
        var array = null;
        var regex = new RegExp("\\,");
        if (!regex.test(valor)) {
          valor = valor.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
          valor = valor.split('').reverse().join('').replace(/^[\.]/, '');
        } else {
          array = valor.toString().split(',');
          if (array.length > 2) {
            input.value = 0;
          } else {
            array[0] = array[0].toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
            array[0] = array[0].split('').reverse().join('').replace(/^[\.]/, '');
            if (array[1].length > 2) {
              array[1] = array[1].substr(0, 2);
            }
          }
        }
        if (!regex.test(valor)) {
          input.value = valor;
        } else {
          if (valor == ',') {
            input.value = 0;
          } else {
            if (valor.substr(0, 1) == ',') {
              input.value = 0 + ',' + array[1];
            } else {
              input.value = array[0] + ',' + array[1];
            }
          }
        }
      }
      $scope.formatPeso2 = function (num) {
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

      $scope.openModal = function (modal) {
        $(`#${modal}`).modal('open');
        setTimeout(() => { document.querySelector(`#${modal}`).style.top = 1 + '%'; }, 600);
      }
      $scope.closeModal = function () {
        $(".modal").modal("close");
      }
      $scope.SetTab = function (x) {
        $scope.Tabs = x;
      }

      $scope.descargarSoporte = function (ruta) {
        $http({
          method: 'POST',
          url: "php/administrativa/celularesylineasmoviles.php",
          data: {
            function: 'descargaFile',
            ruta
          }
        }).then(function (response) {
          var win = window.open("temp/" + response.data, '_blank');
          win.focus();
        });
      }
      function parsedia(date) {
        var yyyy = date.getFullYear();
        var dd = ('0' + date.getDate()).slice(-2);
        var mm = ('0' + (date.getMonth() + 1)).slice(-2);
        return dd + '/' + mm + '/' + yyyy;//+' '+hh+':'+mi+':00';
      }

      $scope.Ajustar_Pantalla = function () {
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100) {
          document.querySelector("#pantalla").style.zoom = 0.8;
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

    }]).filter('inicio', function () {
      return function (input, start) {
        if (input != undefined && start != NaN) {
          start = +start;
          return input.slice(start);
        } else {
          return null;
        }
      }
    });

