'use strict';
angular.module('GenesisApp')
  .controller('anticiposController', ['$scope', '$http', '$timeout', '$filter', '$window', '$q', '$interval',
    function ($scope, $http, $timeout, $filter, $window, $q, $interval) {
      $scope.Quitar_NuevoSol = true;
      console.clear();// No envia mensaje - Si "firma", Firma en base de datos
      $(document).ready(function () {
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
          document.querySelector("#container").style.zoom = 1.3;
        }
        if ($(window).width() > 1100) {
          document.querySelector("#pantalla").style.zoom = 0.8;
          document.querySelector("#container").style.zoom = 1.2;
        }
        if ($(window).height() < 600) {
          angular.forEach(document.querySelectorAll('.Clase_AjustarHeigth_Modal_Soporte'), function (i) {
            i.style.height = '85vh';
          });
        }
        console.log($(window).height());
        console.log($(window).width());
        $('input.currency').currencyInput();
        $('.tabs').tabs();
        $('.modal').modal();

        $scope.Tabs = 1;
        $scope.HojaAnticipo = false;

        // $scope.SetTab(1);
        var SysDay = new Date();
        $scope.SysDay = SysDay;
        $scope.MaxSysDay = SysDay.getFullYear() + '-' + (SysDay.getMonth() + 1) + '-' + SysDay.getDate();
        $scope.HojaAnt_Botones = false;
        $scope.Filtrar_Sol = '';
        $http({
          method: 'POST',
          url: "php/autorizaciones/anticipos/anticipos.php",
          data: {
            function: 'Obt_Cedula'
          }
        }).then(function (response) {
          $scope.Rol_Cedula = response.data;

          $http({
            method: 'POST',
            url: "php/autorizaciones/anticipos/anticipos.php",
            data: {
              function: 'Obt_Control',
              Cedula: response.data
            }
          }).then(function (response2) {
            console.log("CREAR ANT: " + response2.data.ACCION);
            console.log("DAR PERMISOS: " + response2.data.DIOS);
            console.log("CEDULA: " + $scope.Rol_Cedula);
            console.log("NOMBRE: " + response2.data.NOMBRE);
            console.log("CARGO: " + response2.data.CARGO);
            console.log("TELEFONO: " + response2.data.TELEFONO);
            console.log("UBI_SUBDIRECTOR: " + response2.data.UBI_SUBDIRECTOR);

            $scope.Rol_Cargo = response2.data.CARGO;
            // if (response.data == 1045727147) {
            //   $scope.Rol_Cargo = 101
            // }

            if (response2.data.UBI_SUBDIRECTOR != null) {
              $scope.Rol_Ubicacion = response2.data.UBI_SUBDIRECTOR;
            } else {
              $scope.Rol_Ubicacion = response2.data.UBI;
            }
            $scope.Rol_Accion = response2.data.ACCION;
            $scope.Rol_Telefono = response2.data.TELEFONO;
            $scope.Rol_Ubicacion_Subdirector = response2.data.UBI_SUBDIRECTOR;
            $scope.Rol_Dios = response2.data.DIOS;
            $scope.Rol_Nombre = response2.data.NOMBRE;
            $scope.Rol_Sig = response2.data.SIG;
            if (response2.data.ACCION != 1) {
              $scope.Quitar_NuevoSol = false;
              $timeout(
                function () {
                  $("#Sol").click();
                }, 500
              );
              $timeout(
                function () {
                  $("#Sol").click();
                }, 700
              );
            } else {
              $scope.Rol_Ubicacion_NOM = response2.data.UBICACION;
              $scope.Quitar_NuevoSol = true;
              $scope.Limpiar_Hoja1();
            }
            if ($scope.Rol_Ubicacion == 1) {
              $scope.Rol_Ubicacion_N = 1;
            }
            if ($scope.Rol_Ubicacion.substr(0, 2) == 80 || $scope.Rol_Ubicacion.substr(0, 1) == 8) {
              $scope.Rol_Ubicacion_N = '8';
            }
            if ($scope.Rol_Ubicacion.substr(0, 2) != 80 && $scope.Rol_Ubicacion.substr(0, 1) != 8 && $scope.Rol_Ubicacion != 1) {
              $scope.Rol_Ubicacion_N = $scope.Rol_Ubicacion.substr(0, 2);
            }
            console.log("UBICACION: " + $scope.Rol_Ubicacion_N);
            if ($scope.Rol_Ubicacion_N == 0) {
              $http({
                method: 'POST',
                url: "php/autorizaciones/anticipos/anticipos.php",
                data: {
                  function: 'Obt_Ubi',
                  Cedula: response.data
                }
              }).then(function (response3) {
                $scope.Rol_Ubicacion_Infiltrado = response3.data;
                if ($scope.Rol_Ubicacion_Infiltrado == 1) {
                  $scope.Rol_Ubicacion_N = 1;
                }
                if ($scope.Rol_Ubicacion_Infiltrado.substr(0, 2) == 80 || $scope.Rol_Ubicacion_Infiltrado.substr(0, 1) == 8) {
                  $scope.Rol_Ubicacion_N = '8';
                }
                if ($scope.Rol_Ubicacion_Infiltrado.substr(0, 2) != 80 && $scope.Rol_Ubicacion_Infiltrado.substr(0, 1) != 8 && $scope.Rol_Ubicacion_Infiltrado != 1) {
                  $scope.Rol_Ubicacion_N = $scope.Rol_Ubicacion_Infiltrado.substr(0, 2);
                }
                $scope.Listar_Solicitudes();
                console.log("UBICACION_INFILTRADO: " + $scope.Rol_Ubicacion_N);

              });
            } else {
              $scope.Listar_Solicitudes();
            }
          });
          //////////////////////
        });
        document.getElementById('Hoja1_Servicio_Descripcion').onpaste = function (e) {
          e.preventDefault();
        }
        // document.getElementById('Hoja1_Servicio_Justificacion').onpaste = function (e) {
        //   e.preventDefault();
        // }
        document.getElementById('HojaPer_Pertinencia').onpaste = function (e) {
          e.preventDefault();
        }

        //
        $scope.Cargar_Tipo_Servicio();
        $scope.Cargar_Ubicacion_Afiliado();
        $scope.Listar_Motivos_Frecuencia();
        $scope.Listar_Motivos_Anulacion();

        $scope.HojaAnt_Advertencias = [];

        $scope.listadoEtapas = [
          { cod: 0, cargo: "Asistente Regional De Autorizaciones" },
          { cod: 1, cargo: "Auditor Médico Regional" },
          { cod: 2, cargo: "Gerente Regional" },
          { cod: 3, cargo: "Asistente Nacional De Autorizaciones" },
          { cod: 4, cargo: "Especialista Nacional De Autorizaciones" },
          { cod: 5, cargo: "Coordinador Nacional De Autorizaciones" },
          { cod: 6, cargo: "Subdirector Nacional de Salud" },
          { cod: 7, cargo: "Subgerente General", ver: false },
          { cod: 8, cargo: "Asistente Nacional De Pagaduria" },
        ];


      });
      // READY
      (function ($) {
        $.fn.currencyInput = function () {
          this.each(function () {
            var wrapper = $("<div class='currency-input' />");
            $(this).wrap(wrapper);
            $(this).before("<span class='currency-symbol'>$</span>");
          });
        };
      })(jQuery);

      $scope.Listar_Solicitudes = function (X) {
        if (X != undefined) {
          swal({ title: 'Cargando...', allowOutsideClick: false });
          swal.showLoading();
        }
        $scope.listDatosTemp = null;
        $scope.listDatosTemp_Activos = 0;
        $scope.listDatosTemp_Procesados = 0;
        $scope.listDatosTemp_Anulados = 0;
        $scope.listDatosTemp_Devueltos = 0;
        $scope.datos = [];
        $http({
          method: 'POST',
          url: "php/autorizaciones/anticipos/anticipos.php",
          data: {
            function: 'List_Anticipos',
            Ubicacion: ($scope.Rol_Ubicacion_N == 1 || $scope.Rol_Cargo == 101) ? '' : $scope.Rol_Ubicacion_N
          }
        }).then(function (response2) {
          // for (let y = 0; y < 10; y++) {
          for (let i = 0; i < response2.data.length; i++) {
            $scope.datos.push({
              CONSECUTIVO: response2.data[i].CONSECUTIVO,
              SECCIONAL: response2.data[i].SECCIONAL,
              MUNICIPIO: response2.data[i].MUNICIPIO,
              FECHA_SOL: response2.data[i].FECHA_SOL,
              TIPO_SOL: response2.data[i].TIPO_SOL,
              TIPO_DOC_AFI: response2.data[i].TIPO_DOC_AFI,
              DOC_AFI: response2.data[i].DOC_AFI,
              IPS: response2.data[i].IPS,
              ESTADO_SOL: response2.data[i].ESTADO_SOL,
              ESTATUS_SOL: response2.data[i].ESTATUS_SOL,
              RESPONSABLE: $scope.Cargo_Responsables(response2.data[i].ESTATUS_SOL),
              RESPONSABLE_ACTUAL: $scope.Cargo_Responsables(parseInt(response2.data[i].ESTATUS_SOL) + 1, response2.data[i].ESTADO_SOL),
              ESTADO: $scope.Estado_Solicitud_Tooltip(response2.data[i].ESTADO_SOL),
              MARCA_TUTELA: response2.data[i].MARCA_TUTELA,
            })
          }
          // }

          $scope.initPaginacion($scope.datos);
          $scope.Mostrar_Sol = 10;
          if (X != undefined) {
            swal.close();
          }
          for (let i = 0; i < response2.data.length; i++) {
            if (response2.data[i].ESTADO_SOL == 'A') {
              $scope.listDatosTemp_Activos++;
            }
            if (response2.data[i].ESTADO_SOL == 'P') {
              $scope.listDatosTemp_Procesados++;
            }
            if (response2.data[i].ESTADO_SOL == 'X') {
              $scope.listDatosTemp_Anulados++;
            }
            if (response2.data[i].ESTADO_SOL == 'D') {
              $scope.listDatosTemp_Devueltos++;
            }
          }
          $scope.Filtrar_Listar_Solicitudes();
        });
      }

      $scope.Filtrar_Listar_Solicitudes = function (X) {
        var Datos_Filtrados;
        switch ($scope.Rol_Cargo) {
          case "26":
            Datos_Filtrados = $scope.datos.filter(array => (array.ESTADO_SOL == 'A' && array.ESTATUS_SOL == '0') || (array.ESTADO_SOL == 'D'));
            break;
          case "34":
            Datos_Filtrados = $scope.datos.filter(array => array.ESTADO_SOL == 'A' && array.ESTATUS_SOL == '1');
            break;
          case "82":
            Datos_Filtrados = $scope.datos.filter(array => array.ESTADO_SOL == 'A' && array.ESTATUS_SOL == '2');
            break;
          case "6":
            Datos_Filtrados = $scope.datos.filter(array => array.ESTADO_SOL == 'A' && (array.ESTATUS_SOL == '3' || array.ESTATUS_SOL == '9'));
            break;
          case "87":
            Datos_Filtrados = $scope.datos.filter(array => array.ESTADO_SOL == 'A' && array.ESTATUS_SOL == '4');
            break;
          case "70":
            Datos_Filtrados = $scope.datos.filter(array => array.ESTADO_SOL == 'A' && array.ESTATUS_SOL == '5');
            break;
          case "101":
            Datos_Filtrados = $scope.datos.filter(array => array.ESTADO_SOL == 'A' && array.ESTATUS_SOL == '6');
            break;
          case "83":
            Datos_Filtrados = $scope.datos.filter(array => array.ESTADO_SOL == 'A' && array.ESTATUS_SOL == '7');
            break;
          case "14":
            Datos_Filtrados = $scope.datos.filter(array => array.ESTADO_SOL == 'A' && array.ESTATUS_SOL == '8');
            break;
          default:
            Datos_Filtrados = [];
            break;
        }
        if (Datos_Filtrados.length > 0) {
          document.querySelector('.tooltiptext_migestion').style.visibility = "visible";
          document.querySelector('.tooltiptext_migestion').style.animation = "tooltiptext_migestion 1s infinite";
          if (X) {
            $scope.listDatosTemp = (Datos_Filtrados.length == $scope.listDatosTemp.length) ? $scope.datos : Datos_Filtrados;
            $scope.configPages();
          }
        } else {
          document.querySelector('.tooltiptext_migestion').style.visibility = "hidden";
          document.querySelector('.tooltiptext_migestion').style.animation = "";
          if (X) {
            Materialize.toast('¡No existen registros pendientes por gestionar!', 4000);
          }
        }
      }

      $scope.Cargar_Tipo_Servicio = function () {
        $http({
          method: 'POST',
          url: "php/autorizaciones/anticipos/anticipos.php",
          data: {
            function: 'obtenerTipoServicio',
          }
        }).then(function (response) {
          if (response) {
            $scope.Array_Tipo_Servicio = response.data;
            $scope.Array_Tipo_Servicio.forEach(element => {
              element.NOMBRE = element.NOMBRE.toString().substr(0, 1).toUpperCase() + '' + element.NOMBRE.toString().substr(1, element.NOMBRE.length).toLowerCase();
            });
          }
        });
      }
      $scope.Cargar_Ubicacion_Afiliado = function () {
        $http({
          method: 'POST',
          url: "php/autorizaciones/anticipos/anticipos.php",
          data: {
            function: 'obtenerUbicacionSolicitud',
          }
        }).then(function (response) {
          if (response) {
            $scope.Array_Ubicacion_Afiliado = response.data;
            $scope.Array_Ubicacion_Afiliado.forEach(element => {
              element.NOMBRE = element.NOMBRE.toString().substr(0, 1).toUpperCase() + '' + element.NOMBRE.toString().substr(1, element.NOMBRE.length).toLowerCase();
            });
          }
        });
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      $scope.Limpiar_Hoja1 = function (VAL) {
        $scope.Hoja1 = {
          Afiliado:
          {
            TipoDoc: '',
            //TipoDoc: 'CC',
            NumeroDoc: '',
            // NumeroDoc: '91102711',
            NombreUsu: '',
            MunicipioUsu: '',
            // MunicipioUsuCod: '',
            MunicipioAtencion: '',
            MunicipioAtencion_Cod: '',
            OpPBS: false,
            NumMipres: '',
            Deficit: '',
            Cumplimiento: '',
            Cumplimiento_NUM: '',
            Sexo: '',
            EdadDias: '',
            Regimen: '',
            TipoAut: '',
            UbicacionAut: '',
            Count_Tutela: 0,
            Count_Medida: 0,
            Count_Incidente: 0
          },
          Servicio:
          {
            Tipo: '',
            FechaRadicacion: $scope.SysDay,
            Valor_Total: '0',
            Valor: '',
            Marca_Referencia: '',
            Cantidad: '',
            Servicio: '',
            Servicio_Cod: '',
            Prod: '',
            Prod_Cod: '',
            Subclase: '',
            Subclase_Cod: '',
            Array: [],
            Ips_Solicitante: '',
            Diagnostico1: '',
            Diagnostico1_Cod: '',
            Diagnostico2: '',
            Diagnostico2_Cod: '',
            Descripcion: '',
            Justificacion: '',
            Observacion: ''
          },
          Soportes:
          {
            CopiaHistoria_URL: '',
            CopiaHistoria_B64: '',
            CopiaCedula_VAL: 0,
            CopiaCedula_URL: '',
            CopiaCedula_B64: '',
            CopiaAdres_VAL: 0,
            CopiaAdres_URL: '',
            CopiaAdres_B64: '',
            CopiaSolicitudServicio_URL: '',
            CopiaSolicitudServicio_B64: '',
            CopiaMipres_URL: '',
            CopiaMipres_B64: '',

            CopiaHistoria_RUTA: '',
            CopiaCedula_RUTA: '',
            CopiaAdres_RUTA: '',
            CopiaSolicitudServicio_RUTA: '',
            CopiaMipres_RUTA: '',
            Cotizacion1_RUTA: '',
            Cotizacion1_RUT_RUTA: '',
            Cotizacion2_RUTA: '',
            Cotizacion2_RUT_RUTA: '',
            Cotizacion3_RUTA: '',
            Cotizacion3_RUT_RUTA: '',
            Cotizacion4_RUTA: '',
          },
          Cotizacion_1:
          {
            Banco: '',
            CuentaNom: '',
            NumeroCuenta: '',
            TipoCuenta: '',
            MedioPago: '',
            Cotizacion_URL: '',
            Cotizacion_NIT: '',
            Cotizacion_NIT_COD: '',
            Cotizacion_B64: '',
            RUT_CertBancaria_URL: '',
            RUT_CertBancaria_B64: '',

            Cotizacion_DIR: '',
            Cotizacion_DIR_COD: '',
          },
          Cotizacion_2:
          {
            Banco: '',
            CuentaNom: '',
            NumeroCuenta: '',
            TipoCuenta: '',
            MedioPago: '',
            Cotizacion_URL: '',
            Cotizacion_NIT: '',
            Cotizacion_NIT_COD: '',
            Cotizacion_B64: '',
            RUT_CertBancaria_URL: '',
            RUT_CertBancaria_B64: '',

            Cotizacion_DIR: '',
            Cotizacion_DIR_COD: '',
          },
          Cotizacion_3:
          {
            Banco: '',
            CuentaNom: '',
            NumeroCuenta: '',
            TipoCuenta: '',
            MedioPago: '',
            Cotizacion_URL: '',
            Cotizacion_NIT: '',
            Cotizacion_NIT_COD: '',
            Cotizacion_B64: '',
            RUT_CertBancaria_URL: '',
            RUT_CertBancaria_B64: '',

            Cotizacion_DIR: '',
            Cotizacion_DIR_COD: '',
          },
          Cotizacion_4:
          {
            Justificacion: '',
            Cotizacion_URL: '',
            Cotizacion_B64: '',
          }
        };
        angular.forEach(document.querySelectorAll('.Hoja11'), function (i) {
          i.style.display = "none";
        });
        document.querySelector('#Hoja1_Afiliado_NombreUsu').removeAttribute("readonly");
        $scope.Busqueda = {
          NombreUsuario:
          {
            Filtro: null,
            Listado: null,
            Habil: false
          },
          Municipio:
          {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Cumplimiento: {
            Listado: null
          },
          Ips_Solicitante: {
            Listado: null,
          },
          Servicio: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Producto: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Subclase: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Diagnostico1: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Diagnostico2: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Prestador1: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Prestador2: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Prestador3: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Producto_HojaAnt: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Diagnostico1_HojaAnt: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Diagnostico2_HojaAnt: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Direccion1: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Direccion2: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Direccion3: {
            Filtro: null,
            Listado: null,
            SAVE: null
          }

        };
        for (var i = 0; i < document.querySelectorAll('.Hoja1_Archivos').length; i++) {
          document.querySelectorAll('.Hoja1_Archivos')[i].value = '';
        }
        if (VAL != undefined) {
          Materialize.toast('¡Campos limpiados!', 2000);
        }
        $scope.H1Limpiar_Soportes('Hoja1');
        document.querySelector('#Hoja1_CopiaCedula').disabled = false;
        document.querySelector('#Hoja1_CopiaAdres').disabled = false;

        $scope.Sop_Lab = {
          CopiaHistoria: '',
          CopiaCedula: '',
          CopiaAdres: '',
          CopiaSolicitudServicio: '',
          CopiaMipres: '',
          Cotizacion1: '',
          Cotizacion1_RUT: '',
          Cotizacion2: '',
          Cotizacion2_RUT: '',
          Cotizacion3: '',
          Cotizacion3_RUT: '',
          Cotizacion4: '',
        }
        $scope.HojaAnt_Advertencias = [];
      }

      $scope.Limpiar_HojaAnt = function () {
        $scope.BusquedaAnt = {
          Municipio:
          {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Cumplimiento: {
            Listado: null
          },
          Ips_Solicitante: {
            Listado: null,
          },
          Servicio: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Producto: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Subclase: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Diagnostico1: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Diagnostico2: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Prestador1: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Prestador2: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Prestador3: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Direccion1: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Direccion2: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Direccion3: {
            Filtro: null,
            Listado: null,
            SAVE: null
          }
        };
        $scope.Sop_LabAnt = {
          CopiaHistoria: '',
          CopiaCedula: '',
          CopiaAdres: '',
          CopiaSolicitudServicio: '',
          CopiaMipres: '',
          CopiaPagaduria: '',
          Cotizacion1: '',
          Cotizacion1_RUT: '',
          Cotizacion2: '',
          Cotizacion2_RUT: '',
          Cotizacion3: '',
          Cotizacion3_RUT: '',
          Cotizacion4: '',
          Soporte_PrestacionEfectiva: '',
        };

        for (var i = 0; i < document.querySelectorAll('.HojaAnt_Archivos').length; i++) {
          document.querySelectorAll('.HojaAnt_Archivos')[i].value = '';
        }
        $scope.H1Limpiar_Soportes('HojaAnt');
      }

      $scope.Limpiar_Hoja1_Mitad = function () {
        $scope.Hoja1 = {
          Afiliado:
          {
            TipoDoc: $scope.Hoja1.Afiliado.TipoDoc,
            NumeroDoc: $scope.Hoja1.Afiliado.NumeroDoc,
            NombreUsu: $scope.Hoja1.Afiliado.NombreUsu,
            MunicipioUsu: '',
            // MunicipioUsuCod: '',
            MunicipioAtencion: '',
            MunicipioAtencion_Cod: '',
            OpPBS: false,
            NumMipres: '',
            Deficit: '',
            Cumplimiento: '',
            Cumplimiento_NUM: '',
            Sexo: '',
            EdadDias: '',
            Regimen: '',
            TipoAut: '',
            UbicacionAut: '',
            Count_Tutela: 0,
            Count_Medida: 0,
            Count_Incidente: 0
          },
          Servicio:
          {
            Tipo: '',
            FechaRadicacion: $scope.SysDay,
            Valor_Total: '0',
            Valor: '',
            Cantidad: '',
            Servicio: '',
            Servicio_Cod: '',
            Subclase: '',
            Subclase_Cod: '',
            Prod: '',
            Prod_Cod: '',
            Array: [],
            Ips_Solicitante: '',
            Diagnostico1: '',
            Diagnostico1_Cod: '',
            Diagnostico2: '',
            Diagnostico2_Cod: '',
            Descripcion: '',
            Justificacion: '',
            Observacion: ''
          },
          Soportes:
          {
            CopiaHistoria_URL: '',
            CopiaHistoria_B64: '',
            CopiaCedula_VAL: 0,
            CopiaCedula_URL: '',
            CopiaCedula_B64: '',
            CopiaAdres_VAL: 0,
            CopiaAdres_URL: '',
            CopiaAdres_B64: '',
            CopiaSolicitudServicio_URL: '',
            CopiaSolicitudServicio_B64: '',
            CopiaMipres_URL: '',
            CopiaMipres_B64: '',

            CopiaHistoria_RUTA: '',
            CopiaCedula_RUTA: '',
            CopiaAdres_RUTA: '',
            CopiaSolicitudServicio_RUTA: '',
            CopiaMipres_RUTA: '',
            Cotizacion1_RUTA: '',
            Cotizacion1_RUT_RUTA: '',
            Cotizacion2_RUTA: '',
            Cotizacion2_RUT_RUTA: '',
            Cotizacion3_RUTA: '',
            Cotizacion3_RUT_RUTA: '',
            Cotizacion4_RUTA: '',
          },
          Cotizacion_1:
          {
            Banco: '',
            CuentaNom: '',
            NumeroCuenta: '',
            TipoCuenta: '',
            MedioPago: '',
            Cotizacion_URL: '',
            Cotizacion_NIT: '',
            Cotizacion_NIT_COD: '',
            Cotizacion_B64: '',
            RUT_CertBancaria_URL: '',
            RUT_CertBancaria_B64: '',
          },
          Cotizacion_2:
          {
            Banco: '',
            CuentaNom: '',
            NumeroCuenta: '',
            TipoCuenta: '',
            MedioPago: '',
            Cotizacion_URL: '',
            Cotizacion_NIT: '',
            Cotizacion_NIT_COD: '',
            Cotizacion_B64: '',
            RUT_CertBancaria_URL: '',
            RUT_CertBancaria_B64: '',
          },
          Cotizacion_3:
          {
            Banco: '',
            CuentaNom: '',
            NumeroCuenta: '',
            TipoCuenta: '',
            MedioPago: '',
            Cotizacion_URL: '',
            Cotizacion_NIT: '',
            Cotizacion_NIT_COD: '',
            Cotizacion_B64: '',
            RUT_CertBancaria_URL: '',
            RUT_CertBancaria_B64: '',
          },
          Cotizacion_4:
          {
            Justificacion: '',
            Cotizacion_URL: '',
            Cotizacion_NIT: '',
            Cotizacion_NIT_COD: '',
            Cotizacion_B64: '',
          }
        };
        angular.forEach(document.querySelectorAll('.Hoja11'), function (i) {
          i.style.display = "none";
        });
        document.querySelector('#Hoja1_Afiliado_NombreUsu').removeAttribute("readonly");
        $scope.Busqueda = {
          NombreUsuario:
          {
            Filtro: ($scope.Busqueda.NombreUsuario.Filtro != null) ? $scope.Busqueda.NombreUsuario.Filtro : null,
            Listado: ($scope.Busqueda.NombreUsuario.Listado != null) ? $scope.Busqueda.NombreUsuario.Listado : null,
            Habil: false
          },
          Municipio:
          {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Cumplimiento: {
            Listado: null
          },
          Ips_Solicitante: {
            Listado: null,
          },
          Servicio: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Producto: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Subclase: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Diagnostico1: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Diagnostico2: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Prestador1: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Prestador2: {
            Filtro: null,
            Listado: null,
            SAVE: null
          },
          Prestador3: {
            Filtro: null,
            Listado: null,
            SAVE: null
          }
        };
        for (var i = 0; i < document.querySelectorAll('.Hoja1_Archivos').length; i++) {
          document.querySelectorAll('.Hoja1_Archivos')[i].value = '';
        }
        $scope.H1Limpiar_Soportes('Hoja1');
        document.querySelector('#Hoja1_CopiaCedula').disabled = false;
        document.querySelector('#Hoja1_CopiaAdres').disabled = false;
        $scope.HojaAnt_Advertencias = [];
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      // Afiliado
      $scope.KeyFind_Afiliado = function (keyEvent) {
        $scope.Limpiar_Hoja1_Mitad();
        if (keyEvent.which === 13)
          $scope.Buscar_Afiliado();
      }
      $scope.Buscar_Afiliado = function () {
        $scope.H1Limpiar_Campos_Req('Hoja1');
        if ($scope.Hoja1_Afiliado_NumeroDoc != $scope.Hoja1.Afiliado.NumeroDoc) {
          if ($scope.Hoja1.Afiliado.NumeroDoc != undefined && $scope.Hoja1.Afiliado.NumeroDoc != null && $scope.Hoja1.Afiliado.NumeroDoc != '' && $scope.Hoja1.Afiliado.TipoDoc != '') {
            $http({
              method: 'POST',
              url: "php/autorizaciones/anticipos/anticipos.php",
              data: {
                function: 'Obt_Afiliado',
                TipoDoc: $scope.Hoja1.Afiliado.TipoDoc,
                NumeroDoc: $scope.Hoja1.Afiliado.NumeroDoc,
                Coincidencia: ''
              }
            }).then(function (response) {
              if (response.data != 0) {
                if (response.data.JSON_AFI.ESTADOAFI == 'AC' || response.data.JSON_AFI.ESTADOAFI == 'ACTIVO' || response.data.JSON_AFI.ESTADOAFI == 'PROTECCION LABORAL' || response.data.JSON_AFI.ESTADOAFI == 'INACTIVO') {
                  $("#collapsible-header-Hoja1-prestador1").addClass(function () {
                    return "active";
                  }); $(".collapsible").collapsible({ accordion: true }); $(".collapsible").collapsible({ accordion: true });
                  $scope.Busqueda.NombreUsuario.Habil = true;
                  document.querySelector('#Hoja1_Afiliado_NombreUsu').setAttribute("readonly", true);
                  $scope.Hoja1.Afiliado.NombreUsu = response.data.JSON_AFI.NOMBRECOMPLETO;
                  $scope.Hoja1.Afiliado.MunicipioUsu = response.data.JSON_AFI.UBICACION_NOMBRE;
                  $scope.Hoja1.Afiliado.Sexo = response.data.JSON_AFI.SEXO;
                  $scope.Hoja1.Afiliado.EdadDias = response.data.JSON_AFI.EDADDIAS;
                  $scope.Hoja1.Afiliado.Regimen = response.data.JSON_AFI.REGIMEN;
                  //Organizar Tutelas
                  $scope.Array_Cumplimiento = null;
                  // var Tipo_Tutela = '';
                  for (var x = 0; x < response.data.JSON_TUTELA.length; x++) {
                    $scope.Hoja1.Afiliado.Count_Tutela++;
                    if (response.data.JSON_TUTELA[x].MEDIDA == 'S') {
                      $scope.Hoja1.Afiliado.Count_Medida++;
                    }
                    if (response.data.JSON_TUTELA[x].INCIDENTE == 'S') {
                      $scope.Hoja1.Afiliado.Count_Incidente++;
                    }
                    if (x == 0) {
                      $scope.Array_Cumplimiento =
                        [
                          {
                            CODIGO: response.data.JSON_TUTELA[x].CODIGO,
                            UBICACION: response.data.JSON_TUTELA[x].UBICACION,
                            TUTELA: 'S',
                            MEDIDA: response.data.JSON_TUTELA[x].MEDIDA,
                            INCIDENTE: response.data.JSON_TUTELA[x].INCIDENTE,
                            FECHA: response.data.JSON_TUTELA[x].FECHA,
                            ARCHIVO: response.data.JSON_TUTELA[x].ARCHIVO,
                          }
                        ];
                    } else {
                      $scope.Array_Cumplimiento.push(
                        {
                          CODIGO: response.data.JSON_TUTELA[x].CODIGO,
                          UBICACION: response.data.JSON_TUTELA[x].UBICACION,
                          TUTELA: 'S',
                          MEDIDA: response.data.JSON_TUTELA[x].MEDIDA,
                          INCIDENTE: response.data.JSON_TUTELA[x].INCIDENTE,
                          FECHA: response.data.JSON_TUTELA[x].FECHA,
                          ARCHIVO: response.data.JSON_TUTELA[x].ARCHIVO,
                        }
                      );
                    }
                  }

                  //Organizar Archivos
                  var Ruta_Cedula = response.data.JSON_SOPORTES.URL_CEDULA, Ruta_Adres = response.data.JSON_SOPORTES.URL_ADRES;
                  var Ruta_Cedula_Afi = '', Ruta_Adres_Afi = '';
                  var xRuta_Cedula = '', xRuta_Adres = '';
                  // Encontrar el doc de identificacion y el adres de afi
                  if (response.data.JSON_SOPORTES != '') {
                    if (response.data.JSON_SOPORTES.SOPORTES_JSON != '') {
                      for (var y = 0; y < response.data.JSON_SOPORTES.SOPORTES_JSON.length; y++) {
                        if (response.data.JSON_SOPORTES.SOPORTES_JSON[y].CODIGO == 11) {
                          Ruta_Adres_Afi = response.data.JSON_SOPORTES.SOPORTES_JSON[y].RUTA;
                        }
                        if (response.data.JSON_SOPORTES.SOPORTES_JSON[y].CODIGO == 12) {
                          Ruta_Cedula_Afi = response.data.JSON_SOPORTES.SOPORTES_JSON[y].RUTA;
                        }
                      }
                    }
                  }
                  // Seleccionar cual se escogera
                  if (Ruta_Cedula != '') {
                    xRuta_Cedula = Ruta_Cedula;
                  }
                  if (Ruta_Cedula == '' && Ruta_Cedula_Afi != '') {
                    xRuta_Cedula = Ruta_Cedula_Afi;
                  }
                  if (Ruta_Adres != '') {
                    xRuta_Adres = Ruta_Adres;
                  }
                  if (Ruta_Cedula == '' && Ruta_Adres_Afi != '') {
                    xRuta_Adres = Ruta_Adres_Afi;
                  }
                  //Buscar el archivo de documento de indentificacion si existe en FTP
                  if (xRuta_Cedula != '') {
                    $scope.Hoja1.Soportes.CopiaCedula_RUTA = xRuta_Cedula;
                    $http({
                      method: 'POST',
                      url: "php/autorizaciones/anticipos/anticipos.php",
                      data: {
                        function: 'descargaAdjunto',
                        ruta: xRuta_Cedula
                      }
                    }).then(function (response) {
                      if (response.data.substr(0, 3) != '<br' && response.data != 'Error') {
                        $scope.Hoja1.Soportes.CopiaCedula_URL = 'temp/' + response.data + "?page=hsn#toolbar=0";
                        $scope.Hoja1.Soportes.CopiaCedula_VAL = 1;
                        document.querySelector('#Sop_Lab_CopiaCedula').value = 'Ya existe el soporte en el sistema';
                        document.querySelector('#Hoja1_CopiaCedula').disabled = true;
                        $timeout(function () {
                          angular.forEach(document.querySelectorAll('.Iframe'), function (i) {
                            i.style.width = (document.querySelector('#AdjustSop').offsetWidth - 6) + 'px';
                          });
                        }, 300);
                      }
                      if (response.data.substr(0, 3) == '<br' || response.data == 'Error') {
                        swal({
                          title: "¡Ocurrio un error al cargar la fotocopia del documento de identidad!",
                          text: "!Por favor, Cargue nuevamente el soporte!",
                          type: "info",
                        }).catch(swal.noop);
                      }
                    });
                  }
                  //Buscar el archivo de adres si existe en FTP
                  if (xRuta_Adres != '') {
                    $scope.Hoja1.Soportes.CopiaAdres_RUTA = xRuta_Adres;
                    $http({
                      method: 'POST',
                      url: "php/autorizaciones/anticipos/anticipos.php",
                      data: {
                        function: 'descargaAdjunto',
                        ruta: xRuta_Adres
                      }
                    }).then(function (response) {
                      if (response.data.substr(0, 3) != '<br' && response.data != 'Error') {
                        $scope.Hoja1.Soportes.CopiaAdres_URL = 'temp/' + response.data + "?page=hsn#toolbar=0";
                        $scope.Hoja1.Soportes.CopiaAdres_VAL = 1;
                        document.querySelector('#Sop_Lab_CopiaAdres').value = 'Ya existe el soporte en el sistema';
                        document.querySelector('#Hoja1_CopiaAdres').disabled = true;
                        $timeout(function () {
                          angular.forEach(document.querySelectorAll('.Iframe'), function (i) {
                            i.style.width = (document.querySelector('#AdjustSop2').offsetWidth - 6) + 'px';
                          });
                        }, 300);
                      }
                      if (response.data.substr(0, 3) == '<br' || response.data == 'Error') {
                        swal({
                          title: "¡Ocurrio un error al cargar la fotocopia del documento de identidad!",
                          text: "!Por favor, Cargue nuevamente el soporte!",
                          type: "info",
                        }).catch(swal.noop);
                      }
                    });
                  }
                  angular.forEach(document.querySelectorAll('.Hoja11'), function (i) {
                    i.classList.remove('Ani_Down');
                    i.style.display = null;
                    i.classList.add('Ani_Down');
                  });
                  $timeout(
                    function () {
                      angular.forEach(document.querySelectorAll('.Hoja11'), function (i) {
                        i.classList.remove('Ani_Down');
                      });
                    }, 1000
                  )
                } else {
                  swal({
                    title: "¡Afiliado No Activo!",
                    type: "info",
                    timer: 1000
                  }).catch(swal.noop);
                }

              } else {
                swal({
                  title: "¡Usuario No Encontrado!",
                  type: "info",
                  timer: 1000
                }).catch(swal.noop);
              }
            });
          } else {
            Materialize.toast('Diligencie los campos!', 1000);
          }
        }
      }
      $scope.KeyFind_AfiliadoNom = function (keyEvent) {
        $scope.Limpiar_Hoja1_Mitad();
        if (keyEvent.which === 13)
          $scope.Buscar_AfiliadoNom();
      }
      $scope.Buscar_AfiliadoNom = function () {
        if ($scope.Hoja1.Afiliado.NombreUsu != null && $scope.Hoja1.Afiliado.NombreUsu != '' && $scope.Hoja1.Afiliado.NombreUsu.length > 4) {
          $http({
            method: 'POST',
            url: "php/autorizaciones/anticipos/anticipos.php",
            data: {
              function: 'Obt_Afiliado',
              TipoDoc: '',
              NumeroDoc: '',
              Coincidencia: $scope.Hoja1.Afiliado.NombreUsu.toUpperCase(),
            }
          }).then(function (response) {
            if (response.data.length == 1) {
              $scope.Hoja1.Afiliado.TipoDoc = response.data[0].TIPODOCUMENTO;
              $scope.Hoja1.Afiliado.NumeroDoc = response.data[0].DOCUMENTO;
              $timeout(function () { $scope.Buscar_Afiliado(); }, 200);
              $scope.Busqueda.NombreUsuario.Listado = null;
              $scope.Busqueda.NombreUsuario.Filtro = null;
            }
            if (response.data.length > 1) {
              $scope.Busqueda.NombreUsuario.Listado = response.data;
              $scope.Busqueda.NombreUsuario.Filtro = response.data;
              $('#list-group-afiliado-nombreusu').css({ width: $('#Hoja1_Afiliado_NombreUsu')[0].offsetWidth });
            }
            if (response.data.length == 0) {
              swal({
                title: "¡No se encontró ningún afiliado!",
                type: "info",
                timer: 1000
              }).catch(swal.noop);
            }
          });
        } else {
          Materialize.toast('¡Digite el nombre del usuario o coincidencia!', 1000);
        }
      }
      $scope.Complete_Listado_AfiliadoNom = function (string) {
        if ($scope.Hoja1.Afiliado.NombreUsu != undefined && string != undefined && $scope.Busqueda.NombreUsuario.Listado != null) {
          $('#list-group-afiliado-nombreusu').css({ width: $('#Hoja1_Afiliado_NombreUsu')[0].offsetWidth });
          var output = [];
          angular.forEach($scope.Busqueda.NombreUsuario.Listado, function (Listado) {
            if (Listado.NOMBRECOMPLETO.toUpperCase().indexOf(string.toUpperCase()) >= 0) {
              output.push({ "DOCUMENTO": Listado.DOCUMENTO, "NOMBRECOMPLETO": Listado.NOMBRECOMPLETO.toUpperCase(), "TIPODOCUMENTO": Listado.TIPODOCUMENTO.toUpperCase(), "ESTADOAFI": Listado.ESTADOAFI.toUpperCase() });
            }
          });
          $scope.Busqueda.NombreUsuario.Filtro = output;
        }
      }
      $scope.FillTextbox_Listado_AfiliadoNom = function (tipo, documento, estado) {
        if (estado.toUpperCase() != 'AC' && estado.toUpperCase() != 'ACTIVO' && estado.toUpperCase() != 'PROTECCION LABORAL') {
          swal({
            title: "¡Este afiliado no se encuentra activo!",
            type: "info",
            timer: 2000
          }).catch(swal.noop);
        } else {
          $scope.Hoja1.Afiliado.TipoDoc = tipo;
          $scope.Hoja1.Afiliado.NumeroDoc = documento;
          $scope.Busqueda.NombreUsuario.Filtro = null;
          $scope.Buscar_Afiliado();
        }
      }
      // Afiliado
      // Producto
      $scope.KeyFind_Municipio = function (keyEvent, HOJA, BUSQUEDA) {
        if (keyEvent.which === 13)
          $scope.Buscar_Municipio(HOJA, BUSQUEDA);
      }
      $scope.Buscar_Municipio = function (HOJA, BUSQUEDA) {
        if ($scope[HOJA].Afiliado.MunicipioAtencion.length > 2) {
          $http({
            method: 'POST',
            url: "php/autorizaciones/anticipos/anticipos.php",
            data: {
              function: 'Obt_Municipio',
              Coinc: $scope[HOJA].Afiliado.MunicipioAtencion.toUpperCase()
            }
          }).then(function (response) {
            if (response.data[0] != undefined && response.data[0].ERROR == undefined) {
              $scope[BUSQUEDA].Municipio.Listado = response.data;
              $scope[BUSQUEDA].Municipio.Filtro = response.data;
              $('.Clase_Listar_Municipios').css({ width: $('#' + HOJA + '_Afiliado_MunicipioAtencion')[0].offsetWidth });
            }
            if (response.data.length == 1) {
              if (response.data[0].ERROR != undefined) {
                swal({
                  title: "¡Ocurrio un error!",
                  text: response.data[0].ERROR,
                  type: "info",
                }).catch(swal.noop);
                $scope[HOJA].Afiliado.MunicipioAtencion_Cod = '';
                $scope[HOJA].Afiliado.MunicipioAtencion = '';
                $scope[BUSQUEDA].Municipio.Listado = null;
                $scope[BUSQUEDA].Municipio.Filtro = null;
                scope[BUSQUEDA].Municipio.SAVE = '';
              } else {
                $scope[HOJA].Afiliado.MunicipioAtencion_Cod = response.data[0].CODIGO;
                $scope[HOJA].Afiliado.MunicipioAtencion = response.data[0].NOMBRE;
                $scope[BUSQUEDA].Municipio.Listado = null;
                $scope[BUSQUEDA].Municipio.Filtro = null;
                $scope[BUSQUEDA].Municipio.SAVE = response.data[0].NOMBRE;
                Materialize.toast('¡Municipio ' + response.data[0].NOMBRE + ' Seleccionado!', 1000);
              }
            }
            if (response.data == '') {
              swal({
                title: "Municipio No Encontrado!",
                type: "info",
                timer: 1000
              }).catch(swal.noop);
              $scope[BUSQUEDA].Municipio.Listado = null;
              $scope[BUSQUEDA].Municipio.Filtro = null;
            }
          })
        } else {
          Materialize.toast('¡Digite al menos 3 caracteres!', 1000);
        }
      }
      $scope.Complete_Listado_Municipio = function (string, HOJA, BUSQUEDA) {
        if ($scope[HOJA].Afiliado.MunicipioAtencion != undefined && string != undefined && $scope[BUSQUEDA].Municipio.Listado != undefined) {
          $('.Clase_Listar_Municipios').css({ width: $('#' + HOJA + '_Afiliado_MunicipioAtencion')[0].offsetWidth });
          var output = [];
          angular.forEach($scope[BUSQUEDA].Municipio.Listado, function (Listado) {
            if (Listado.NOMBRE.toUpperCase().indexOf(string.toUpperCase()) >= 0 || Listado.CODIGO.toUpperCase().indexOf(string.toUpperCase()) >= 0) {
              output.push({ "CODIGO": Listado.CODIGO, "NOMBRE": Listado.NOMBRE.toUpperCase() });
            }
          });
          $scope[BUSQUEDA].Municipio.Filtro = output;
        }
      }
      $scope.FillTextbox_Listado_Municipio = function (codigo, nombre, HOJA, BUSQUEDA) {
        $scope[HOJA].Afiliado.MunicipioAtencion = nombre;
        $scope[HOJA].Afiliado.MunicipioAtencion_Cod = codigo;
        $scope[BUSQUEDA].Municipio.SAVE = nombre;
        $scope[BUSQUEDA].Municipio.Filtro = null;
      }
      $scope.Blur_Municipio = function (HOJA, BUSQUEDA) {
        $timeout(function () {
          if ($scope[HOJA] != undefined) {
            if ($scope[HOJA].Afiliado != undefined) {
              if ($scope[HOJA].Afiliado.MunicipioAtencion != $scope[BUSQUEDA].Municipio.SAVE && $scope[BUSQUEDA].Municipio.SAVE != null) {
                $scope[HOJA].Afiliado.MunicipioAtencion = $scope[BUSQUEDA].Municipio.SAVE;
                $scope[BUSQUEDA].Municipio.Filtro = null;
              }
              $scope[BUSQUEDA].Municipio.Filtro = null;
            }
          }
        }, 300);
      }
      //
      // Cumplimiento
      $scope.BuscarCumplimiento = function () {
        if ($scope.Array_Cumplimiento != null && $scope.Busqueda.Cumplimiento.Listado != '') {
          $scope.Abrir_Modal_Cumplimiento();
        }
      }
      $scope.MPSel_Cumplimiento = function (TIPO, CODIGO) {
        $scope.Hoja1.Afiliado.Cumplimiento = TIPO;
        $scope.Hoja1.Afiliado.Cumplimiento_NUM = CODIGO;
        $scope.Cerrar_Modal_Cumplimiento();
      }
      $scope.BuscarCumplimientoAnt = function () {
        if ($scope.HojaAnt.Info.Status < 2) {
          if ($scope.Array_CumplimientoAnt != null && $scope.BusquedaAnt.Cumplimiento.Listado != '') {
            $scope.Abrir_Modal_CumplimientoAnt();
          }
        }
      }
      $scope.ChangeCumplimientoAnt = function () {
        if ($scope.Control == 0) {
          $scope.HojaAnt.Afiliado.Cumplimiento_NUM = '';
        }
      }

      $scope.MPSel_CumplimientoAnt = function (TIPO, CODIGO) {
        $scope.Control = 1;
        if ($scope.HojaAnt.Afiliado.Cumplimiento == TIPO && $scope.HojaAnt.Afiliado.Cumplimiento_NUM != CODIGO) {
          $timeout(function () { $scope.HojaAnt.Afiliado.Cumplimiento_NUM = CODIGO; }, 500);
          $timeout(function () { $scope.HojaAnt.Afiliado.Cumplimiento_NUM = CODIGO; }, 500);
          $timeout(function () { $scope.HojaAnt.Afiliado.Cumplimiento_NUM = CODIGO; }, 500);
        }
        if ($scope.HojaAnt.Afiliado.Cumplimiento != TIPO && $scope.HojaAnt.Afiliado.Cumplimiento_NUM == CODIGO) {
          $scope.HojaAnt.Afiliado.Cumplimiento = TIPO;
          $timeout(function () { $scope.HojaAnt.Afiliado.Cumplimiento_NUM = CODIGO; }, 500);
        }
        if ($scope.HojaAnt.Afiliado.Cumplimiento != TIPO && $scope.HojaAnt.Afiliado.Cumplimiento_NUM != CODIGO) {
          $scope.HojaAnt.Afiliado.Cumplimiento = TIPO;
          $timeout(function () { $scope.HojaAnt.Afiliado.Cumplimiento_NUM = CODIGO; }, 500);
        }
        $scope.Cerrar_Modal_CumplimientoAnt();
        $scope.Control = 0;
      }
      // Cumplimiento
      // Servicio
      $scope.KeyFind_ObServicio = function (keyEvent, HOJA, BUSQUEDA) {
        if (keyEvent.which === 13)
          $scope.Buscar_Servicio(HOJA, BUSQUEDA);
      }
      $scope.Buscar_Servicio = function (HOJA, BUSQUEDA) {
        if ($scope[HOJA].Servicio.Servicio.length > 0) {
          $http({
            method: 'POST',
            url: "php/autorizaciones/anticipos/anticipos.php",
            data: {
              function: 'Obt_Servicios',
              Coinc: $scope[HOJA].Servicio.Servicio.toUpperCase(),
              Sexo: $scope[HOJA].Afiliado.Sexo.substr(0, 1),
              Edad: $scope[HOJA].Afiliado.EdadDias,
            }
          }).then(function (response) {
            if (response.data[0] != undefined && response.data[0].ERROR == undefined) {
              $scope[BUSQUEDA].Servicio.Listado = response.data;
              $scope[BUSQUEDA].Servicio.Filtro = response.data;
              $('.Clase_Listar_Servicios').css({ width: $('#' + HOJA + '_Servicio_Servicio')[0].offsetWidth });
            }
            if (response.data.length == 1) {
              if (response.data[0].ERROR != undefined) {
                swal({
                  title: "¡Ocurrio un error!",
                  text: response.data[0].ERROR,
                  type: "info",
                }).catch(swal.noop);
                $scope[HOJA].Servicio.Servicio_Cod = '';
                $scope[HOJA].Servicio.Servicio = '';
                $scope[BUSQUEDA].Servicio.Listado = null;
                $scope[BUSQUEDA].Servicio.Filtro = null;
                $scope[BUSQUEDA].Servicio.SAVE = '';
              }
              if (response.data[0].ERROR == undefined) {
                $scope[HOJA].Servicio.Servicio_Cod = response.data[0].CODIGO;
                $scope[HOJA].Servicio.Servicio = response.data[0].NOMBRE;
                $scope[BUSQUEDA].Servicio.Listado = null;
                $scope[BUSQUEDA].Servicio.Filtro = null;
                $scope[BUSQUEDA].Servicio.SAVE = response.data[0].NOMBRE;
                Materialize.toast('¡Servicio ' + response.data[0].NOMBRE + ' Seleccionado!', 1000);
                $scope[HOJA].Servicio.Prod_Cod = '';
                $scope[HOJA].Servicio.Prod = '';
                $scope[BUSQUEDA].Producto.Listado = null;
                $scope[BUSQUEDA].Producto.Filtro = null;
                $scope[BUSQUEDA].Producto.SAVE = '';
                document.getElementById(HOJA + '_Servicio_Prod').focus();
              }
            }
            if (response.data == '') {
              swal({
                title: "¡Ocurrio un error!",
                text: "Servicio No Encontrado",
                type: "info",
                // timer: 1000,
                showCancelButton: true
              });
            }
          })
        } else {
          Materialize.toast('¡Digite al menos 3 caracteres!', 1000);
        }
      }
      $scope.Complete_Listado_Servicios = function (string, HOJA, BUSQUEDA) {
        if ($scope[HOJA].Servicio.Servicio != undefined && string != undefined && $scope[BUSQUEDA].Servicio.Listado != undefined) {
          $('.Clase_Listar_Servicios').css({ width: $('#' + HOJA + '_Servicio_Servicio')[0].offsetWidth });
          var output = [];
          angular.forEach($scope[BUSQUEDA].Servicio.Listado, function (Listado_Servicio) {
            if (Listado_Servicio.NOMBRE.toUpperCase().indexOf(string.toUpperCase()) >= 0 || Listado_Servicio.CODIGO.toUpperCase().indexOf(string.toUpperCase()) >= 0) {
              output.push({ "CODIGO": Listado_Servicio.CODIGO, "NOMBRE": Listado_Servicio.NOMBRE.toUpperCase() });
            }
          });
          $scope[BUSQUEDA].Servicio.Filtro = output;
        }
      }
      $scope.FillTextbox_Listado_Servicios = function (codigo, nombre, HOJA, BUSQUEDA) {
        $scope[HOJA].Servicio.Servicio = nombre;
        $scope[HOJA].Servicio.Servicio_Cod = codigo;
        $scope[BUSQUEDA].Servicio.SAVE = nombre;
        $scope[BUSQUEDA].Servicio.Filtro = null;
        //
        $scope[HOJA].Servicio.Prod_Cod = '';
        $scope[HOJA].Servicio.Prod = '';
        $scope[BUSQUEDA].Producto.Listado = null;
        $scope[BUSQUEDA].Producto.Filtro = null;
        $scope[BUSQUEDA].Producto.SAVE = '';
        // $scope.Buscar_Subclase_Producto(HOJA);

        setTimeout(() => {
          document.getElementById(HOJA + '_Servicio_Prod').focus();
          $scope[HOJA].Servicio.Array.forEach(e => {
            // console.log(e);
            if (e.SERVICIO == $scope[HOJA].Servicio.Servicio_Cod) {
              $scope[HOJA].Afiliado.TipoAut = e.TIPOAUT;
              $scope[HOJA].Afiliado.UbicacionAut = e.UBICACIONAUT;
              $scope.$apply();
              return;
            }
          });
        }, 1000);
      }
      $scope.Blur_Servicio = function (HOJA, BUSQUEDA) {
        $timeout(function () {
          if ($scope[HOJA] != undefined) {
            if ($scope[HOJA].Servicio != undefined) {
              if ($scope[HOJA].Servicio.Servicio != $scope[BUSQUEDA].Servicio.SAVE && $scope[BUSQUEDA].Servicio.SAVE != null) {
                $scope[HOJA].Servicio.Servicio = $scope[BUSQUEDA].Servicio.SAVE;
                $scope[BUSQUEDA].Servicio.Filtro = null;
              }
              $scope[BUSQUEDA].Servicio.Filtro = null;
            }
          }
        }, 300);
      }
      // Servicio
      // Producto
      $scope.KeyFind_ObProd = function (keyEvent, HOJA, BUSQUEDA) {
        if (keyEvent.which === 13)
          $scope.Buscar_Producto(HOJA, BUSQUEDA);
      }
      $scope.Buscar_Producto = function (HOJA, BUSQUEDA) {
        if ($scope[HOJA].Servicio.Servicio_Cod.length > 0) {
          if ($scope[HOJA].Servicio.Prod.length > 0) {
            $http({
              method: 'POST',
              url: "php/autorizaciones/anticipos/anticipos.php",
              data: {
                function: 'Obt_Prods',
                Coinc: $scope[HOJA].Servicio.Prod.toUpperCase(),
                Sexo: $scope[HOJA].Afiliado.Sexo.substr(0, 1),
                Edad: $scope[HOJA].Afiliado.EdadDias,
                Serv: $scope[HOJA].Servicio.Servicio_Cod
              }
            }).then(function (response) {
              if (response.data[0] != undefined && response.data[0].ERROR == undefined) {
                $scope[BUSQUEDA].Producto.Listado = response.data;
                $scope[BUSQUEDA].Producto.Filtro = response.data;
                $('.Clase_Listar_Productos').css({ width: $('#' + HOJA + '_Servicio_Prod')[0].offsetWidth });
              }
              if (response.data.length == 1) {
                if (response.data[0].ERROR != undefined) {
                  swal({
                    title: "¡Ocurrio un error!",
                    text: response.data[0].ERROR,
                    type: "info",
                  }).catch(swal.noop);
                  $scope[HOJA].Servicio.Prod_Cod = '';
                  $scope[HOJA].Servicio.Prod = '';
                  $scope[BUSQUEDA].Producto.Listado = null;
                  $scope[BUSQUEDA].Producto.Filtro = null;
                  $scope[BUSQUEDA].Producto.SAVE = '';
                }
                if (response.data[0].ERROR == undefined) {
                  $scope[HOJA].Servicio.Prod_Cod = response.data[0].CODIGO;
                  $scope[HOJA].Servicio.Prod = response.data[0].NOMBRE;
                  $scope[BUSQUEDA].Producto.Listado = null;
                  $scope[BUSQUEDA].Producto.Filtro = null;
                  $scope[BUSQUEDA].Producto.SAVE = response.data[0].NOMBRE;
                  $scope.Buscar_Subclase_Producto(HOJA, BUSQUEDA);
                  Materialize.toast('Producto ' + response.data[0].NOMBRE + ' Seleccionado!', 1000);
                  document.getElementById(HOJA + '_Valor').focus();
                }
              }
              if (response.data == '') {

                swal({
                  title: "¡Producto No Encontrado!",
                  text: "¿Desea Generar Una Mesa de Ayuda Para Parametrizar el Producto?",
                  type: "info",
                  // timer: 1000,
                  showCancelButton: true
                }).then(function (result) {
                  if (result) {
                    $scope[BUSQUEDA].Producto.Listado = null;
                    $scope[BUSQUEDA].Producto.Filtro = null;
                    swal({
                      title: 'Mesa de Ayuda - Parametrización EPRO',
                      input: 'textarea',
                      inputPlaceholder: 'Escribe un comentario...',
                      showCancelButton: true
                    }).then(function (result) {
                      if (result !== '' && result.length >= 30 && result.length < 500) {
                        $http({
                          method: 'POST',
                          url: "php/autorizaciones/anticipos/anticipos.php",
                          data: {
                            function: 'Creacion_Productos',
                            Emisor: $scope.Rol_Cedula.toString(),
                            Ubicacion: $scope.Rol_Ubicacion,
                            Observacion: 'MODULO ANTICIPOS: ' + result
                          }
                        }).then(function (response) {
                          if (response.data.codigo != undefined) {
                            if (response.data.codigo == 1) {
                              $http({
                                method: 'POST',
                                url: "https://api.infobip.com/sms/1/text/single",
                                headers: {
                                  'Content-Type': 'application/json',
                                  'authorization': 'Basic Y2FqYWZhbWlsaWFyOkNvbG9tYmlhMjAxNw==',
                                  'accept': 'application/json'
                                },
                                data: {
                                  "from": "CajacopiEPS",
                                  "to": "57" + response.data.celular,
                                  "text": "Sr(a). " + response.data.nombre + " Solicitud con número " + response.data.mensaje + " fue registrado correctamente. Sera atendido por nuestra mesa de servicio. Gracias por utilizar nuestra plataforma. CajacopiEPS "
                                }
                              }).then(function (response2) {
                                swal({
                                  title: "¡Mesa de Ayuda Generada!",
                                  text: 'Codigo de la mesa de ayuda: ' + response.data.mensaje,
                                  type: "success",
                                  // timer: 1000
                                }).catch(swal.noop);
                              });
                            } else {
                              swal({
                                title: "¡Error al generar la mesa de ayuda!",
                                text: response.data.mensaje,
                                type: "info",
                              }).catch(swal.noop);
                            }
                          }
                        });
                      } else {
                        Materialize.toast('El comentario debe contener al menos 30 caracteres y menos de 500!', 1000);
                      }
                    }).catch(swal.noop);
                  }
                }).catch(swal.noop);
              }
            })
          } else {
            Materialize.toast('¡Digite al menos 3 caracteres!', 1000);
          }
        } else {
          Materialize.toast('¡Seleccione primero el servicio!', 1000);
        }

      }
      $scope.Complete_Listado_Productos = function (string, HOJA, BUSQUEDA) {
        if ($scope[HOJA].Servicio.Prod != undefined && string != undefined && $scope[BUSQUEDA].Producto.Listado != undefined) {
          $('.Clase_Listar_Productos').css({ width: $('#' + HOJA + '_Servicio_Prod')[0].offsetWidth });
          var output = [];
          angular.forEach($scope[BUSQUEDA].Producto.Listado, function (Listado_Prod) {
            if (Listado_Prod.NOMBRE.toUpperCase().indexOf(string.toUpperCase()) >= 0 || Listado_Prod.CODIGO.toUpperCase().indexOf(string.toUpperCase()) >= 0) {
              output.push({ "CODIGO": Listado_Prod.CODIGO, "NOMBRE": Listado_Prod.NOMBRE.toUpperCase() });
            }
          });
          $scope[BUSQUEDA].Producto.Filtro = output;
        }
      }
      $scope.FillTextbox_Listado_Productos = function (codigo, nombre, HOJA, BUSQUEDA) {
        $scope[HOJA].Servicio.Prod = nombre;
        $scope[HOJA].Servicio.Prod_Cod = codigo;
        $scope[BUSQUEDA].Producto.SAVE = nombre;
        $scope[BUSQUEDA].Producto.Filtro = null;
        //
        document.getElementById(HOJA + '_Valor').focus();
        $scope.Buscar_Subclase_Producto(HOJA, BUSQUEDA);

      }
      $scope.Blur_Prod = function (HOJA, BUSQUEDA) {
        $timeout(function () {
          if ($scope[HOJA] != undefined) {
            if ($scope[HOJA].Servicio != undefined) {
              if ($scope[HOJA].Servicio.Prod != $scope[BUSQUEDA].Producto.SAVE && $scope[BUSQUEDA].Producto.SAVE != null) {
                $scope[HOJA].Servicio.Prod = $scope[BUSQUEDA].Producto.SAVE;
                $scope[BUSQUEDA].Producto.Filtro = null;
              }
              $scope[BUSQUEDA].Producto.Filtro = null;
            }
          }
        }, 300);
      }

      $scope.Buscar_Subclase_Producto = function (HOJA, BUSQUEDA) {
        $scope[HOJA].Servicio.Subclase = '';
        $scope[HOJA].Servicio.Subclase_Cod = '0';
        $scope[BUSQUEDA].Subclase.SAVE = '';
        $scope[BUSQUEDA].Subclase.Listado = [];
        $scope[BUSQUEDA].Subclase.Filtro = [];
        $http({
          method: 'POST',
          url: "php/autorizaciones/anticipos/anticipos.php",
          data: {
            function: 'Obt_Prods_Subclase',
            Prod: $scope[HOJA].Servicio.Prod_Cod
          }
        }).then(function (response) {
          if (response.data != '') {
            if (response.data.length > 0) {
              response.data.forEach(e => {
                $scope[BUSQUEDA].Subclase.Listado.push({ CODIGO: e.NUMERO_H, NOMBRE: e.NOMBRE_H });
                $scope[BUSQUEDA].Subclase.Filtro.push({ CODIGO: e.NUMERO_H, NOMBRE: e.NOMBRE_H });
              });
              $('.Clase_Listar_Subclase').css({ width: $('#' + HOJA + '_Subclase_Prod')[0].offsetWidth });
              document.getElementById(HOJA + "_Subclase_Prod").focus();
            } else {
              $scope[BUSQUEDA].Subclase.Listado = null;
              $scope[BUSQUEDA].Subclase.Filtro = null;
            }
          } else {
            $scope[BUSQUEDA].Subclase.Listado = null;
            $scope[BUSQUEDA].Subclase.Filtro = null;
          }
        });
      }

      $scope.Complete_Listado_Subclases = function (string, HOJA, BUSQUEDA) {
        if ($scope[HOJA].Servicio.Subclase != undefined && string != undefined && $scope[BUSQUEDA].Subclase.Listado != undefined) {
          $('.Clase_Listar_Subclase').css({ width: $('#' + HOJA + '_Subclase_Prod')[0].offsetWidth });
          var output = [];
          angular.forEach($scope[BUSQUEDA].Subclase.Listado, function (Listado_Subclase) {
            if (Listado_Subclase.NOMBRE.toUpperCase().indexOf(string.toUpperCase()) >= 0 || Listado_Subclase.CODIGO.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
              output.push({ "CODIGO": Listado_Subclase.CODIGO, "NOMBRE": Listado_Subclase.NOMBRE.toUpperCase() });
            }
          });
          $scope[BUSQUEDA].Subclase.Filtro = output;
        }
      }
      $scope.FillTextbox_Listado_Subclases = function (codigo, nombre, HOJA, BUSQUEDA) {
        $scope[HOJA].Servicio.Subclase = nombre;
        $scope[HOJA].Servicio.Subclase_Cod = codigo;
        $scope[BUSQUEDA].Subclase.SAVE = nombre;
        $scope[BUSQUEDA].Subclase.Filtro = null;
      }
      $scope.Blur_Subclase = function (HOJA, BUSQUEDA) {
        $timeout(function () {
          if ($scope[HOJA] != undefined) {
            if ($scope[HOJA].Servicio != undefined) {
              // debugger
              if ($scope[HOJA].Servicio.Subclase != $scope[BUSQUEDA].Subclase.SAVE && $scope[BUSQUEDA].Subclase.SAVE != null) {
                $scope[HOJA].Servicio.Subclase = $scope[BUSQUEDA].Subclase.SAVE;
                $scope[BUSQUEDA].Subclase.Filtro = null;
              }
              $scope[BUSQUEDA].Subclase.Filtro = null;
            }
          }
        }, 300);
      }
      //
      // Producto
      // Agregar Servicio y Producto al Array
      $scope.AddServicioProducto = function (HOJA, BUSQUEDA) {
        var Campos_Empty = false, Datos_Duplicado = false, Tipo_Igual = false, Ubicacion_Igual = false;
        document.querySelector('#' + [HOJA] + '_Servicio_Label').classList.remove('red-text');
        document.querySelector('#' + [HOJA] + '_Prod_Label').classList.remove('red-text');
        document.querySelector('#' + [HOJA] + '_Subclase_Label').classList.remove('red-text');
        document.querySelector('#' + [HOJA] + '_Valor_Label').classList.remove('red-text');
        document.querySelector('#' + [HOJA] + '_Cantidad_Label').classList.remove('red-text');
        document.querySelector('#' + [HOJA] + '_TipoAut_Label').classList.remove('red-text');
        document.querySelector('#' + [HOJA] + '_UbicacionAut_Label').classList.remove('red-text');
        //
        if ($scope[HOJA].Servicio.Servicio_Cod == undefined || $scope[HOJA].Servicio.Servicio_Cod == null || $scope[HOJA].Servicio.Servicio_Cod == '') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Servicio_Label').classList.add('red-text');
        }
        if ($scope[HOJA].Servicio.Prod_Cod == undefined || $scope[HOJA].Servicio.Prod_Cod == null || $scope[HOJA].Servicio.Prod_Cod == '') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Prod_Label').classList.add('red-text');
        }
        if ($scope[BUSQUEDA].Subclase.Listado != null) {
          if ($scope[HOJA].Servicio.Subclase_Cod == undefined || $scope[HOJA].Servicio.Subclase_Cod == null || $scope[HOJA].Servicio.Subclase_Cod == '') {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Subclase_Label').classList.add('red-text');
          }
        }
        if ($scope[HOJA].Servicio.Valor == undefined || $scope[HOJA].Servicio.Valor == null || $scope[HOJA].Servicio.Valor == '' || parseFloat($scope[HOJA].Servicio.Valor) == 0) {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Valor_Label').classList.add('red-text');
        }
        if ($scope[HOJA].Servicio.Cantidad == undefined || $scope[HOJA].Servicio.Cantidad == null || $scope[HOJA].Servicio.Cantidad == '' || $scope[HOJA].Servicio.Cantidad == 0) {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cantidad_Label').classList.add('red-text');
        }
        if ($scope[HOJA].Afiliado.TipoAut == undefined || $scope[HOJA].Afiliado.TipoAut == null || $scope[HOJA].Afiliado.TipoAut == '') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_TipoAut_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_TipoAut_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope[HOJA].Afiliado.UbicacionAut == undefined || $scope[HOJA].Afiliado.UbicacionAut == null || $scope[HOJA].Afiliado.UbicacionAut == '') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_UbicacionAut_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_UbicacionAut_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }

        $scope[HOJA].Servicio.Array.forEach(e => {
          if (e.SERVICIO == $scope[HOJA].Servicio.Servicio_Cod && e.PRODUCTO == $scope[HOJA].Servicio.Prod_Cod && e.SUBCLASE == $scope[HOJA].Servicio.Subclase_Cod) {
            Datos_Duplicado = true;
          }
          if (e.SERVICIO == $scope[HOJA].Servicio.Servicio_Cod) {
            if ($scope[HOJA].Afiliado.TipoAut != e.TIPOAUT) {
              Tipo_Igual = true;
            }
            if ($scope[HOJA].Afiliado.UbicacionAut != e.UBICACIONAUT) {
              Ubicacion_Igual = true;
            }
          }
        });


        if (Campos_Empty == false && Datos_Duplicado == false && Tipo_Igual == false && Ubicacion_Igual == false) {
          var TIPOAUT_NOM = "", UBICACIONAUT_NOM = "";
          $scope.Array_Tipo_Servicio.forEach(e => {
            if ($scope[HOJA].Afiliado.TipoAut == e.CODIGO) {
              TIPOAUT_NOM = e.NOMBRE;
            }
          });
          $scope.Array_Ubicacion_Afiliado.forEach(e => {
            if ($scope[HOJA].Afiliado.UbicacionAut == e.CODIGO) {
              UBICACIONAUT_NOM = e.NOMBRE;
            }
          });
          // a
          $scope[HOJA].Servicio.Array.push({
            "SERVICIO": $scope[HOJA].Servicio.Servicio_Cod, "SERVICIO_NOM": $scope[HOJA].Servicio.Servicio,
            "PRODUCTO": $scope[HOJA].Servicio.Prod_Cod, "PRODUCTO_NOM": $scope[HOJA].Servicio.Prod,
            "SUBCLASE": $scope[HOJA].Servicio.Subclase_Cod, "SUBCLASE_NOM": $scope[HOJA].Servicio.Subclase,
            "VALOR": parseFloat(($scope[HOJA].Servicio.Valor.replace(/\./g, '')).replace(/\,/g, '.')), "CANTIDAD": $scope[HOJA].Servicio.Cantidad,
            "TIPOAUT": $scope[HOJA].Afiliado.TipoAut, "TIPOAUT_NOM": TIPOAUT_NOM,
            "UBICACIONAUT": $scope[HOJA].Afiliado.UbicacionAut, "UBICACIONAUT_NOM": UBICACIONAUT_NOM,
            "UBICACION": $scope.Rol_Ubicacion,
            "AUT": ""
          });
          $scope[HOJA].Servicio.Valor_Total = $scope.formatPeso2((parseFloat(($scope[HOJA].Servicio.Valor_Total.toString().replace(/\./g, '')).replace(/\,/g, '.')) + ($scope[HOJA].Servicio.Cantidad * parseFloat(($scope[HOJA].Servicio.Valor.toString().replace(/\./g, '')).replace(/\,/g, '.')))).toString().replace(',', '.'));
          Materialize.toast('¡Servicio y Producto Agregado!', 3000);
          if (HOJA == 'Hoja1') {
            $scope.Cerrar_Modal_Servicio_Prod();
          } else {
            $scope.Cerrar_Modal_Servicio_ProdAnt();
          }
        } else {
          if (Datos_Duplicado == true) {
            Materialize.toast('¡El servicio y producto ya fueron agregados!', 3000);
          } else if (Tipo_Igual == true) {
            Materialize.toast('¡El tipo de servicio no corresponde al grupo de servicio seleccionado anteriormente!', 3000);
          } else if (Ubicacion_Igual == true) {
            Materialize.toast('¡La ubicación del paciente no corresponde al grupo de servicio seleccionado anteriormente', 3000);
          }
          else {
            Materialize.toast('¡Campos vacios o invalidos!', 3000);
          }
        }
      }
      // Agregar Servicio y Producto al Array
      $scope.DelServicioProducto = function (HOJA, index) {
        setTimeout(() => {
          $scope[HOJA].Servicio.Array.splice(index, 1);
          $scope.$apply();
        }, 100);

        setTimeout(() => {
          var Valor_Total = 0;
          $scope[HOJA].Servicio.Array.forEach(e => {
            Valor_Total = parseFloat(Valor_Total) + (parseFloat((e.VALOR.toString().replace(/\./g, '')).replace(/\,/g, '.')) * e.CANTIDAD);
          });
          $scope[HOJA].Servicio.Valor_Total = $scope.formatPeso2(Valor_Total.toString().replace(',', '.'));;
          $scope.$apply();
        }, 800);
        Materialize.toast('¡Eliminado con correctamente!', 3000);
      }
      // Diagnostico
      $scope.KeyFind_ObDiag = function (keyEvent, HOJA, BUSQUEDA, SAVECOD, DIAG, OPUESTO) {
        if (keyEvent.which === 13)
          $scope.Buscar_DiagSer(HOJA, BUSQUEDA, SAVECOD, DIAG, OPUESTO);
      }
      $scope.Buscar_DiagSer = function (HOJA, BUSQUEDA, SAVECOD, DIAG, OPUESTO) {
        if ($scope[HOJA].Servicio[DIAG].length > 2) {
          $http({
            method: 'POST',
            url: "php/autorizaciones/anticipos/anticipos.php",
            data: {
              function: 'Obt_Diag',
              Coinc: $scope[HOJA].Servicio[DIAG].toUpperCase(),
              Sexo: $scope[HOJA].Afiliado.Sexo.substr(0, 1),
              Edad: $scope[HOJA].Afiliado.EdadDias,
            }
          }).then(function (response) {
            if (response.data[0] != undefined && response.data.length > 1) {
              $scope[BUSQUEDA][DIAG].Filtro = response.data;
              $scope[BUSQUEDA][DIAG].Listado = response.data;
              $('.Clase_Listar_Diags').css({ width: $('#' + HOJA + '_Servicio_Diagnostico1')[0].offsetWidth });
            }
            if (response.data.length == 1) {
              if (response.data[0].ERROR != undefined) {
                swal({
                  title: "¡Ocurrio un erro!",
                  text: response.data[0].ERROR,
                  type: "info",
                }).catch(swal.noop);
                $scope[HOJA].Servicio[SAVECOD] = '';
                $scope[HOJA].Servicio[DIAG] = '';
                $scope[BUSQUEDA][DIAG].Filtro = null;
                $scope[BUSQUEDA][DIAG].Listado = null;
                $scope[BUSQUEDA][DIAG].SAVE = null;
              } else {
                // if ($scope[HOJA].Servicio[OPUESTO] != response.data[0].CODIGO) {
                $scope[HOJA].Servicio[SAVECOD] = response.data[0].CODIGO;
                $scope[HOJA].Servicio[DIAG] = response.data[0].NOMBRE;
                $scope[BUSQUEDA][DIAG].Filtro = null;
                $scope[BUSQUEDA][DIAG].Listado = null;
                $scope[BUSQUEDA][DIAG].SAVE = response.data[0].NOMBRE;
                Materialize.toast('¡Diagnóstico ' + response.data[0].NOMBRE + ' Seleccionado!', 1000);
                // } else {
                //   swal({
                //     title: "¡Este diagnóstico ya fue seleccionado!",
                //     type: "info",
                //     timer: 2000
                //   }).catch(swal.noop);
                // }
              }
            }
            if (response.data == '') {
              swal({
                title: "¡Diagnóstico No Encontrado!",
                type: "info",
                timer: 1000
              }).catch(swal.noop);
              $scope[HOJA].Servicio[SAVECOD] = '';
              $scope[HOJA].Servicio[DIAG] = '';
              $scope[BUSQUEDA][DIAG].Filtro = null;
              $scope[BUSQUEDA][DIAG].Listado = null;
            }
          })
        } else {
          Materialize.toast('¡Digite al menos 3 caracteres!', 1000);
        }
      }
      $scope.Complete_Listado_DiagSer = function (string, HOJA, BUSQUEDA, DIAG) {
        if ($scope[HOJA].Servicio[DIAG] != undefined && string != undefined && $scope[BUSQUEDA][DIAG].Listado != undefined) {
          $('.Clase_Listar_Diags').css({ width: $('#' + HOJA + '_Servicio_Diagnostico1')[0].offsetWidth });
          var output = [];
          angular.forEach($scope[BUSQUEDA][DIAG].Listado, function (x) {
            if (x.NOMBRE.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.CODIGO.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
              output.push({ "CODIGO": x.CODIGO, "NOMBRE": x.NOMBRE.toUpperCase() });
            }
          });
          $scope[BUSQUEDA][DIAG].Filtro = output;
        }
      }
      $scope.FillTextbox_Listado_DiagSer = function (codigo, nombre, HOJA, BUSQUEDA, SAVECOD, MODEL, OPUESTO) {
        // if ($scope[HOJA].Servicio[OPUESTO] != codigo) {
        $scope[HOJA].Servicio[SAVECOD] = codigo;
        $scope[HOJA].Servicio[MODEL] = nombre;
        $scope[BUSQUEDA][MODEL].SAVE = nombre;
        $scope[BUSQUEDA][MODEL].Filtro = null;
        // } else {
        //   swal({
        //     title: "¡Este diagnóstico ya fue seleccionado!",
        //     type: "info",
        //     timer: 2000
        //   }).catch(swal.noop);
        // }
      }
      $scope.Blur_Diag = function (HOJA, BUSQUEDA, DIAG) {
        $timeout(function () {
          if (DIAG != undefined && $scope[HOJA] != undefined && $scope[BUSQUEDA] != undefined) {
            if ($scope[HOJA].Servicio[DIAG] != null && $scope[HOJA].Servicio[DIAG] != undefined) {
              if ($scope[HOJA].Servicio[DIAG] != $scope[BUSQUEDA][DIAG].SAVE && $scope[BUSQUEDA][DIAG].SAVE != null) {
                $scope[HOJA].Servicio[DIAG] = $scope[BUSQUEDA][DIAG].SAVE;
                $scope[BUSQUEDA][DIAG].Filtro = null;
              }
              $scope[BUSQUEDA][DIAG].Filtro = null;
            }
          }
        }, 300);
      }
      // Diagnostico
      // Prestador
      $scope.KeyFind_Prestador_Cotizaciones = function (keyEvent, string, HOJA, COT, BUSQUEDA, PREST, OPUESTO, OPUESTO2) {
        if (keyEvent.which === 13)
          $scope.Buscar_Prestador_Cotizaciones(string, HOJA, COT, BUSQUEDA, PREST, OPUESTO, OPUESTO2);
      }
      $scope.Buscar_Prestador_Cotizaciones = function (string, HOJA, COT, BUSQUEDA, PREST, OPUESTO, OPUESTO2) {
        // var Contrato = 'Contratos' + COT.charAt(COT.length - 1);
        if (string.length > 2) {
          $http({
            method: 'POST',
            url: "php/autorizaciones/anticipos/anticipos.php",
            data: {
              function: 'Obt_Prest',
              Coinc: string.toUpperCase()
            }
          }).then(function (response) {
            if (response.data[0] != undefined && response.data.length > 1) {
              $scope[BUSQUEDA][PREST].Filtro = response.data;
              $scope[BUSQUEDA][PREST].Listado = response.data;
              $('.Clase_Listar_Prestador').css({ width: $('#' + HOJA + '_Cotizacion_' + (PREST.substr(PREST.toString().length - 1, PREST.toString().length)) + '_Cotizacion_NIT')[0].offsetWidth });
              // $scope[BUSQUEDA][Contrato].Listado = [];
              // $scope[HOJA][COT].Contrato = '';
            }
            if (response.data.length == 1) {
              if (response.data[0].ERROR != undefined) {
                swal({
                  title: "¡Ocurrio un error!",
                  text: response.data[0].ERROR,
                  type: "info",
                }).catch(swal.noop);
                $scope[HOJA][COT].Cotizacion_NIT_COD = '';
                $scope[HOJA][COT].Cotizacion_NIT = '';
                $scope[BUSQUEDA][PREST].Filtro = null;
                $scope[BUSQUEDA][PREST].Listado = null;
                $scope[BUSQUEDA][PREST].SAVE = '';

                const DIR = `Direccion${(COT.substr(COT.toString().length - 1, COT.toString().length))}`;
                $scope[HOJA][COT].Cotizacion_DIR_COD = '';
                $scope[HOJA][COT].Cotizacion_DIR = '';
                $scope[BUSQUEDA][DIR].Filtro = null;
                $scope[BUSQUEDA][DIR].Listado = null;
                $scope[BUSQUEDA][DIR].SAVE = '';
                // $scope[BUSQUEDA][Contrato].Listado = [];
                // $scope[HOJA][COT].Contrato = '';
              } else {
                if ($scope[HOJA][OPUESTO].Cotizacion_NIT_COD != response.data[0].CODIGO && $scope[HOJA][OPUESTO2].Cotizacion_NIT_COD != response.data[0].CODIGO) {
                  $scope[HOJA][COT].Cotizacion_NIT_COD = response.data[0].CODIGO;
                  $scope[HOJA][COT].Cotizacion_NIT = response.data[0].NOMBRE;
                  $scope[BUSQUEDA][PREST].Filtro = null;
                  $scope[BUSQUEDA][PREST].Listado = null;
                  $scope[BUSQUEDA][PREST].SAVE = response.data[0].NOMBRE;
                  Materialize.toast('Prestador ' + response.data[0].NOMBRE + ' Seleccionado!', 1000);
                  // $scope.Buscar_Contratos_Ips(HOJA, COT, BUSQUEDA);
                  const DIR = `Direccion${(COT.substr(COT.toString().length - 1, COT.toString().length))}`;
                  $scope.Buscar_Prestador_Direccion($scope[HOJA][COT].Cotizacion_NIT_COD, HOJA, COT, BUSQUEDA, DIR);
                } else {
                  swal({
                    title: "¡Este prestador ya fue seleccionado!",
                    type: "info",
                    timer: 2000
                  }).catch(swal.noop);
                }
              }
            }
            if (response.data == '') {
              swal({
                title: "¡Prestador No Encontrado!",
                type: "info",
                timer: 1000
              }).catch(swal.noop);
              $scope[HOJA][COT].Cotizacion_NIT_COD = '';
              $scope[HOJA][COT].Cotizacion_NIT = '';
              $scope[BUSQUEDA][PREST].Filtro = null;
              $scope[BUSQUEDA][PREST].Listado = null;
              $scope[BUSQUEDA][PREST].SAVE = null;
              // $scope[BUSQUEDA][Contrato].Listado = [];
              // $scope[HOJA][COT].Contrato = '';
            }
          })
        } else {
          Materialize.toast('¡Digite al menos 3 caracteres!', 1000);
        }
      }
      $scope.Complete_Prestador_Cotizaciones = function (string, HOJA, COT, BUSQUEDA, PREST) {
        if ($scope[HOJA][COT].Cotizacion_NIT != undefined && string != undefined && $scope[BUSQUEDA][PREST].Listado != undefined) {
          $('.Clase_Listar_Prestador').css({ width: $('#' + HOJA + '_Cotizacion_' + (PREST.substr(PREST.toString().length - 1, PREST.toString().length)) + '_Cotizacion_NIT')[0].offsetWidth });
          var output = [];
          angular.forEach($scope[BUSQUEDA][PREST].Listado, function (x) {
            if (x.NOMBRE.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.CODIGO.toString().indexOf(string) >= 0) {
              output.push({ "CODIGO": x.CODIGO, "NOMBRE": x.NOMBRE.toUpperCase() });
            }
          });
          $scope[BUSQUEDA][PREST].Filtro = output;
        }
      }
      $scope.FillTextbox_Prestador_Cotizaciones = function (codigo, nombre, HOJA, COT, BUSQUEDA, PREST, OPUESTO, OPUESTO2) {
        if ($scope[HOJA][OPUESTO].Cotizacion_NIT_COD != codigo && $scope[HOJA][OPUESTO2].Cotizacion_NIT_COD != codigo) {
          $scope[HOJA][COT].Cotizacion_NIT_COD = codigo;
          $scope[HOJA][COT].Cotizacion_NIT = nombre;
          $scope[BUSQUEDA][PREST].SAVE = nombre;
          $scope[BUSQUEDA][PREST].Filtro = null;
          // $scope.Buscar_Contratos_Ips(HOJA, COT, BUSQUEDA);
          const DIR = `Direccion${(COT.substr(COT.toString().length - 1, COT.toString().length))}`;
          $scope.Buscar_Prestador_Direccion($scope[HOJA][COT].Cotizacion_NIT_COD, HOJA, COT, BUSQUEDA, DIR);
        } else {
          swal({
            title: "¡Este prestador ya fue seleccionado!",
            type: "info",
            timer: 2000
          }).catch(swal.noop);
        }
      }
      $scope.Blur_Cot = function (HOJA, BUSQUEDA, COT, FILTER) {
        $timeout(function () {
          if (FILTER != undefined && $scope[HOJA] != undefined && $scope[BUSQUEDA] != undefined) {
            if ($scope[HOJA][COT].Cotizacion_NIT != null && $scope[HOJA][COT].Cotizacion_NIT != undefined) {
              if ($scope[HOJA][COT].Cotizacion_NIT != $scope[BUSQUEDA][FILTER].SAVE && $scope[BUSQUEDA][FILTER].SAVE != null) {
                $scope[HOJA][COT].Cotizacion_NIT = $scope[BUSQUEDA][FILTER].SAVE;
                $scope[BUSQUEDA][FILTER].Filtro = null;
              }
              $scope[BUSQUEDA][FILTER].Filtro = null;
            }
          }
          // }
        }, 300);
      }
      // Prestador
      // Direccion
      // $scope.KeyFind_Prestador_Direccion = function (keyEvent, string, HOJA, COT, BUSQUEDA, DIR) {
      //   if (keyEvent.which === 13)
      //     $scope.Buscar_Prestador_Direccion(string, HOJA, COT, BUSQUEDA, DIR);
      // }
      $scope.Buscar_Prestador_Direccion = function (string, HOJA, COT, BUSQUEDA, DIR) {
        // var Contrato = 'Contratos' + COT.charAt(COT.length - 1);
        if (string.length > 2) {
          $http({
            method: 'POST',
            url: "php/autorizaciones/anticipos/anticipos.php",
            data: {
              function: 'Obt_Direccion',
              Coinc: string.toUpperCase()
            }
          }).then(function (response) {
            if (response.data[0] != undefined && response.data.length > 1) {
              $scope[BUSQUEDA][DIR].Filtro = response.data;
              $scope[BUSQUEDA][DIR].Listado = response.data;
              $('.Clase_Listar_Direccion').css({ width: $('#' + HOJA + '_Cotizacion_' + (DIR.substr(DIR.toString().length - 1, DIR.toString().length)) + '_Cotizacion_DIR')[0].offsetWidth });
            }
            if (response.data.length == 1) {
              if (response.data[0].ERROR != undefined) {
                swal({
                  title: "¡Ocurrio un error!",
                  text: response.data[0].ERROR,
                  type: "info",
                }).catch(swal.noop);
                $scope[HOJA][COT].Cotizacion_DIR_COD = '';
                $scope[HOJA][COT].Cotizacion_DIR = '';
                $scope[BUSQUEDA][DIR].Filtro = null;
                $scope[BUSQUEDA][DIR].Listado = null;
                $scope[BUSQUEDA][DIR].SAVE = '';
                // $scope[BUSQUEDA][Contrato].Listado = [];
                // $scope[HOJA][COT].Contrato = '';
              } else {
                $scope[HOJA][COT].Cotizacion_DIR_COD = response.data[0].CODIGO.toString();
                $scope[HOJA][COT].Cotizacion_DIR = response.data[0].NOMBRE;
                $scope[BUSQUEDA][DIR].Filtro = null;
                $scope[BUSQUEDA][DIR].Listado = null;
                $scope[BUSQUEDA][DIR].SAVE = response.data[0].NOMBRE;
                Materialize.toast('Direccion ' + response.data[0].NOMBRE + ' Seleccionado!', 1000);
              }
            }
            if (response.data == '') {
              swal({
                title: "¡Direccion No Encontrada!",
                type: "info",
                timer: 1000
              }).catch(swal.noop);
              $scope[HOJA][COT].Cotizacion_DIR_COD = '';
              $scope[HOJA][COT].Cotizacion_DIR = '';
              $scope[BUSQUEDA][DIR].Filtro = null;
              $scope[BUSQUEDA][DIR].Listado = null;
              $scope[BUSQUEDA][DIR].SAVE = null;
            }
          })
        } else {
          Materialize.toast('¡Digite al menos 3 caracteres!', 1000);
        }
      }
      $scope.Complete_Prestador_Direccion = function (string, HOJA, COT, BUSQUEDA, DIR) {
        if ($scope[HOJA][COT].Cotizacion_NIT != undefined && string != undefined && $scope[BUSQUEDA][DIR].Listado != undefined) {
          $('.Clase_Listar_Direccion').css({ width: $('#' + HOJA + '_Cotizacion_' + (DIR.substr(DIR.toString().length - 1, DIR.toString().length)) + '_Cotizacion_NIT')[0].offsetWidth });
          var output = [];
          angular.forEach($scope[BUSQUEDA][DIR].Listado, function (x) {
            if (x.NOMBRE.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.CODIGO.toString().indexOf(string) >= 0) {
              output.push({ "CODIGO": x.CODIGO, "NOMBRE": x.NOMBRE.toUpperCase() });
            }
          });
          $scope[BUSQUEDA][DIR].Filtro = output;
        }
      }
      $scope.FillTextbox_Prestador_Direccion = function (codigo, nombre, HOJA, COT, BUSQUEDA, DIR) {
        $scope[HOJA][COT].Cotizacion_DIR_COD = codigo.toString();
        $scope[HOJA][COT].Cotizacion_DIR = nombre;
        $scope[BUSQUEDA][DIR].SAVE = nombre;
        $scope[BUSQUEDA][DIR].Filtro = null;
      }
      $scope.Blur_Prestador_Direccion = function (HOJA, BUSQUEDA, COT, FILTER) {
        $timeout(function () {
          if (FILTER != undefined && $scope[HOJA] != undefined && $scope[BUSQUEDA] != undefined) {
            if ($scope[HOJA][COT].Cotizacion_DIR != null && $scope[HOJA][COT].Cotizacion_DIR != undefined) {
              if ($scope[HOJA][COT].Cotizacion_DIR != $scope[BUSQUEDA][FILTER].SAVE && $scope[BUSQUEDA][FILTER].SAVE != null) {
                $scope[HOJA][COT].Cotizacion_DIR = $scope[BUSQUEDA][FILTER].SAVE;
                $scope[BUSQUEDA][FILTER].Filtro = null;
              }
              $scope[BUSQUEDA][FILTER].Filtro = null;
            }
          }
          // }
        }, 300);
      }
      // Direccion

      ////////////////////////////////////////////////////////////////////////////////////////////////////
      // REGISTRO///////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.Limpiar_Campos_Cotizaciones = function (HOJA, COT, BUSQUEDA, PREST, SOP1, SOP2, NIDT1, NIDT2) {
        $scope[HOJA][COT].Banco = '';
        $scope[HOJA][COT].CuentaNom = '';
        $scope[HOJA][COT].NumeroCuenta = '';
        $scope[HOJA][COT].TipoCuenta = '';
        $scope[HOJA][COT].MedioPago = '';
        if (HOJA == 'Hoja1') {
          $scope[HOJA][COT].Cotizacion_URL = '';
          $scope[HOJA][COT].RUT_CertBancaria_URL = '';
        } else {
          $scope[HOJA][COT].Cotizacion_URL = null;
          $scope[HOJA][COT].RUT_CertBancaria_URL = null;
        }
        $scope[HOJA][COT].Cotizacion_NIT = '';
        $scope[HOJA][COT].Cotizacion_NIT_COD = '';
        $scope[HOJA][COT].Cotizacion_B64 = '';
        $scope[HOJA][COT].RUT_CertBancaria_B64 = '';
        $scope[BUSQUEDA][PREST].Filtro = null;
        $scope[BUSQUEDA][PREST].Listado = null;
        $scope[BUSQUEDA][PREST].SAVE = null;
        $scope.Sop_Lab[SOP1] = '';
        $scope.Sop_Lab[SOP2] = '';
        document.querySelector('#' + NIDT1).value = '';
        document.querySelector('#' + NIDT2).value = '';
      }
      // Prestador Solicitante
      $scope.Buscar_Ips_Solicitante = function (HOJA, BUSQUEDA) {
        // $scope[HOJA][COT]
        // $scope[BUSQUEDA][FILTER]
        if ($scope[HOJA].Servicio.Ips_Solicitante.length > 2) {
          $http({
            method: 'POST',
            url: "php/autorizaciones/anticipos/anticipos.php",
            data: {
              function: 'Obt_Prest',
              Coinc: $scope[HOJA].Servicio.Ips_Solicitante.toUpperCase()
            }
          }).then(function ({ data }) {
            if (data[0] != undefined && data.toString().substr(0, 3) != '<br') {
              // console.log()
              $scope[HOJA].Servicio.Ips_Solicitante = ' ';
              $scope[BUSQUEDA].Ips_Solicitante.Listado = data;
            } else {
              swal("Mensaje", response.data.mensaje, "warning").catch(swal.noop);
            }
          });
        }
      }

      $scope.Selec_Ips_Solicitante = function (HOJA, BUSQUEDA) {
        // $scope[HOJA].Servicio.Ips_Solicitante_Cod =
        if ($scope[BUSQUEDA].Ips_Solicitante.Listado != null && $scope[BUSQUEDA].Ips_Solicitante.Listado.length) {
          const ipsSeleccionada = $scope[BUSQUEDA].Ips_Solicitante.Listado[$scope[BUSQUEDA].Ips_Solicitante.Listado.findIndex((element) => element.NOMBRE.trim() == $scope[HOJA].Servicio.Ips_Solicitante.trim())];
          if (!ipsSeleccionada) return

          $scope[HOJA].Servicio.Ips_Solicitante_Cod = ipsSeleccionada.CODIGO;
          $scope[HOJA].Servicio.Ips_Solicitante = ipsSeleccionada.NOMBRE;
          setTimeout(() => { $scope.$apply(); }, 500);
        }
      }



      $scope.H1Limpiar_Soportes = function (HOJA) {
        $scope.Clean_Input_Files(HOJA + '_CopiaHistoria');
        $scope.Clean_Input_Files(HOJA + '_CopiaCedula');
        $scope.Clean_Input_Files(HOJA + '_CopiaAdres');
        $scope.Clean_Input_Files(HOJA + '_CopiaSolicitudServicio');
        $scope.Clean_Input_Files(HOJA + '_CopiaMipres');
        $scope.Clean_Input_Files(HOJA + '_Cotizacion1');
        $scope.Clean_Input_Files(HOJA + '_Rut1');
        $scope.Clean_Input_Files(HOJA + '_Cotizacion2');
        $scope.Clean_Input_Files(HOJA + '_Rut2');
        $scope.Clean_Input_Files(HOJA + '_Cotizacion3');
        $scope.Clean_Input_Files(HOJA + '_Rut3');
        $scope.Clean_Input_Files(HOJA + '_Cotizacion4');
        if (HOJA == 'HojaAnt') { $scope.Clean_Input_Files(HOJA + '_CopiaPagaduria'); }
      }


      $scope.H1Limpiar_Campos_Req = function (HOJA) {
        angular.forEach(document.querySelectorAll('.' + HOJA + '_Clase .red-text'), function (i) {
          i.classList.remove('red-text');
        });
      }

      $scope.Validar_CamposVacios = function (HOJA) {
        var defered = $q.defer();
        var promise = defered.promise;
        var Campos_Empty = false;
        var Vista_Empty = 0;
        $scope.H1Limpiar_Campos_Req(HOJA);
        if ($scope[HOJA].Afiliado.TipoDoc == undefined || $scope[HOJA].Afiliado.TipoDoc == null || $scope[HOJA].Afiliado.TipoDoc == ''
          && $scope[HOJA].Afiliado.NumeroDoc == undefined || $scope[HOJA].Afiliado.NumeroDoc == null || $scope[HOJA].Afiliado.NumeroDoc == '') {
          Campos_Empty = true;
        }
        if ($scope[HOJA].Afiliado.MunicipioAtencion_Cod == undefined || $scope[HOJA].Afiliado.MunicipioAtencion_Cod == null || $scope[HOJA].Afiliado.MunicipioAtencion_Cod == '') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Municipio_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Municipio_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope[HOJA].Afiliado.OpPBS == undefined || $scope[HOJA].Afiliado.OpPBS == null) {
          Campos_Empty = true;
        } else {
          if ($scope[HOJA].Afiliado.OpPBS != false) {
            if ($scope[HOJA].Afiliado.OpPBS == true && ($scope[HOJA].Afiliado.NumMipres != undefined && $scope[HOJA].Afiliado.NumMipres != '' && $scope[HOJA].Afiliado.NumMipres != null)) {
            } else {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_NumMipres_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_NumMipres_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
          }
        }
        if ($scope[HOJA].Afiliado.Deficit == undefined || $scope[HOJA].Afiliado.Deficit == null || $scope[HOJA].Afiliado.Deficit == '') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Deficit_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Deficit_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope[HOJA].Afiliado.Cumplimiento != 'Nin') {
          if ($scope[HOJA].Afiliado.Count_Tutela != 0 || $scope[HOJA].Afiliado.Count_Medida != 0 || $scope[HOJA].Afiliado.Count_Incidente != 0) {
            if ($scope[HOJA].Afiliado.Cumplimiento == undefined || $scope[HOJA].Afiliado.Cumplimiento == null || $scope[HOJA].Afiliado.Cumplimiento == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cumplimiento_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cumplimiento_NUM_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            } else {
              if ($scope[HOJA].Afiliado.Cumplimiento_NUM == undefined || $scope[HOJA].Afiliado.Cumplimiento_NUM == null || $scope[HOJA].Afiliado.Cumplimiento_NUM == '') {
                Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cumplimiento_NUM_Label').classList.add('red-text');
                document.getElementById([HOJA] + '_Cumplimiento_NUM_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
              }
            }
          }
        }

        // //
        if ($scope[HOJA].Servicio.Tipo == undefined || $scope[HOJA].Servicio.Tipo == null || $scope[HOJA].Servicio.Tipo == '') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Tipo_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Tipo_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope[HOJA].Servicio.FechaRadicacion == undefined || $scope[HOJA].Servicio.FechaRadicacion == null || $scope[HOJA].Servicio.FechaRadicacion == '') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_FechaRadicacion_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_FechaRadicacion_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope[HOJA].Servicio.Marca_Referencia == undefined || $scope[HOJA].Servicio.Marca_Referencia == null || $scope[HOJA].Servicio.Marca_Referencia == '') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Marca_Referencia_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Marca_Referencia_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }

        if ($scope[HOJA].Servicio.Array.length == 0) {
          Campos_Empty = true; Vista_Empty = 5;
        }
        // if ($scope[HOJA].Servicio.Valor == undefined || $scope[HOJA].Servicio.Valor == null || $scope[HOJA].Servicio.Valor == '') {
        //   Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Valor_Label').classList.add('red-text');
        //   document.getElementById([HOJA] + '_Valor_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        // }
        // if ($scope[HOJA].Servicio.Cantidad == undefined || $scope[HOJA].Servicio.Cantidad == null || $scope[HOJA].Servicio.Cantidad == '' || $scope[HOJA].Servicio.Cantidad == 0) {
        //   Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cantidad_Label').classList.add('red-text');
        //   document.getElementById([HOJA] + '_Cantidad_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        // }
        // if ($scope[HOJA].Servicio.Prod_Cod == undefined || $scope[HOJA].Servicio.Prod_Cod == null || $scope[HOJA].Servicio.Prod_Cod == '') {
        //   Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Prod_Label').classList.add('red-text');
        //   document.getElementById([HOJA] + '_Prod_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        // }
        if ($scope[HOJA].Servicio.Ips_Solicitante == undefined || $scope[HOJA].Servicio.Ips_Solicitante == null || $scope[HOJA].Servicio.Ips_Solicitante == '' || $scope[HOJA].Servicio.Ips_Solicitante == '0') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Ips_Solicitante_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Ips_Solicitante_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope[HOJA].Servicio.Diagnostico1_Cod == undefined || $scope[HOJA].Servicio.Diagnostico1_Cod == null || $scope[HOJA].Servicio.Diagnostico1_Cod == '') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Diagnostico1_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Diagnostico1_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope[HOJA].Servicio.Diagnostico2_Cod == undefined || $scope[HOJA].Servicio.Diagnostico2_Cod == null || $scope[HOJA].Servicio.Diagnostico2_Cod == '') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Diagnostico2_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Diagnostico2_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope[HOJA].Servicio.Descripcion == undefined || $scope[HOJA].Servicio.Descripcion == null || $scope[HOJA].Servicio.Descripcion == '') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Descripcion_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Descripcion_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope[HOJA].Servicio.Justificacion == undefined || $scope[HOJA].Servicio.Justificacion == null || $scope[HOJA].Servicio.Justificacion == '') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Justificacion_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Justificacion_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        //
        if ($scope[HOJA].Soportes.CopiaHistoria_B64 == '' && HOJA == 'Hoja1') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_CopiaHistoria_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_CopiaHistoria_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope[HOJA].Soportes.CopiaCedula_VAL == 0) {
          if ($scope[HOJA].Soportes.CopiaCedula_B64 == '' && HOJA == 'Hoja1') {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_CopiaCedula_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_CopiaCedula_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
        }
        if ($scope[HOJA].Soportes.CopiaAdres_VAL == 0) {
          if ($scope[HOJA].Soportes.CopiaAdres_B64 == '' && HOJA == 'Hoja1') {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_CopiaAdres_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_CopiaAdres_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
        }
        if ($scope[HOJA].Soportes.CopiaSolicitudServicio_B64 == '' && HOJA == 'Hoja1') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_CopiaSolicitudServicio_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_CopiaSolicitudServicio_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        //
        if ($scope[HOJA].Cotizacion_1.Cotizacion_NIT_COD == '') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_1_Cotizacion_NIT_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Cotizacion_1_Cotizacion_NIT_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope[HOJA].Cotizacion_1.Cotizacion_DIR_COD == '') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_1_Cotizacion_DIR_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Cotizacion_1_Cotizacion_DIR_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        // if ($scope[HOJA].Cotizacion_1.Contrato == '') {
        //   Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_1_Contrato_Label').classList.add('red-text');
        // }
        if ($scope[HOJA].Cotizacion_1.Banco == '') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_1_Banco_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Cotizacion_1_Banco_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope[HOJA].Cotizacion_1.CuentaNom == '') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_1_CuentaNom_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Cotizacion_1_CuentaNom_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope[HOJA].Cotizacion_1.NumeroCuenta == '') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_1_NumeroCuenta_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Cotizacion_1_NumeroCuenta_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope[HOJA].Cotizacion_1.TipoCuenta == '') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_1_TipoCuenta_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Cotizacion_1_TipoCuenta_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope[HOJA].Cotizacion_1.MedioPago == '') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_1_MedioPago_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Cotizacion_1_MedioPago_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope[HOJA].Cotizacion_1.Cotizacion_B64 == '' && HOJA == 'Hoja1') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion1_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Cotizacion1_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope[HOJA].Cotizacion_1.RUT_CertBancaria_B64 == '' && HOJA == 'Hoja1') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Rut1_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Rut1_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }

        ////CUANDO CONTROL SEA == 1 SE VALIDAN QUE TODOS
        if (($scope[HOJA].Cotizacion_2.Cotizacion_NIT_COD != '' || $scope[HOJA].Cotizacion_2.Banco != '' || $scope[HOJA].Cotizacion_2.CuentaNom != '' || $scope[HOJA].Cotizacion_2.NumeroCuenta != ''
          || $scope[HOJA].Cotizacion_2.TipoCuenta != '' || $scope[HOJA].Cotizacion_2.MedioPago != '' || $scope[HOJA].Cotizacion_2.Cotizacion_B64 != '') && HOJA == 'Hoja1') {
          if ($scope[HOJA].Cotizacion_2.Cotizacion_NIT_COD == '') {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_2_Cotizacion_NIT_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Cotizacion_2_Cotizacion_NIT_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
          if ($scope[HOJA].Cotizacion_2.Cotizacion_DIR_COD == '') {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_2_Cotizacion_DIR_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Cotizacion_2_Cotizacion_DIR_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
          // if ($scope[HOJA].Cotizacion_2.Contrato == '') {
          //   Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_2_Contrato_Label').classList.add('red-text');
          // }
          if ($scope[HOJA].Cotizacion_2.Banco == '') {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_2_Banco_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Cotizacion_2_Banco_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
          if ($scope[HOJA].Cotizacion_2.CuentaNom == '') {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_2_CuentaNom_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Cotizacion_2_CuentaNom_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
          if ($scope[HOJA].Cotizacion_2.NumeroCuenta == '') {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_2_NumeroCuenta_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Cotizacion_2_NumeroCuenta_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
          if ($scope[HOJA].Cotizacion_2.TipoCuenta == '') {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_2_TipoCuenta_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Cotizacion_2_TipoCuenta_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
          if ($scope[HOJA].Cotizacion_2.MedioPago == '') {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_2_MedioPago_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Cotizacion_2_MedioPago_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
          if ($scope[HOJA].Cotizacion_2.Cotizacion_B64 == '') {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion2_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Cotizacion2_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
          if ($scope[HOJA].Cotizacion_2.RUT_CertBancaria_B64 == '') {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Rut2_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Rut2_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
        }
        if (HOJA == 'HojaAnt') {
          if (($scope[HOJA].Cotizacion_2.Cotizacion_NIT_COD != '' || $scope[HOJA].Cotizacion_2.Banco != '' || $scope[HOJA].Cotizacion_2.CuentaNom != '' || $scope[HOJA].Cotizacion_2.NumeroCuenta != ''
            || $scope[HOJA].Cotizacion_2.TipoCuenta != '' || $scope[HOJA].Cotizacion_2.MedioPago != '' || $scope[HOJA].Cotizacion_2.Cotizacion_B64 != '') && $scope[HOJA].Cotizacion_2.Control == 0) {
            if ($scope[HOJA].Cotizacion_2.Cotizacion_NIT_COD == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_2_Cotizacion_NIT_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cotizacion_2_Cotizacion_NIT_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
            if ($scope[HOJA].Cotizacion_2.Cotizacion_DIR_COD == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_2_Cotizacion_DIR_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cotizacion_2_Cotizacion_DIR_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
            // if ($scope[HOJA].Cotizacion_2.Contrato == '') {
            //   Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_2_Contrato_Label').classList.add('red-text');
            // }
            if ($scope[HOJA].Cotizacion_2.Banco == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_2_Banco_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cotizacion_2_Banco_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
            if ($scope[HOJA].Cotizacion_2.CuentaNom == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_2_CuentaNom_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cotizacion_2_CuentaNom_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
            if ($scope[HOJA].Cotizacion_2.NumeroCuenta == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_2_NumeroCuenta_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cotizacion_2_NumeroCuenta_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
            if ($scope[HOJA].Cotizacion_2.TipoCuenta == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_2_TipoCuenta_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cotizacion_2_TipoCuenta_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
            if ($scope[HOJA].Cotizacion_2.MedioPago == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_2_MedioPago_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cotizacion_2_MedioPago_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
            if ($scope[HOJA].Cotizacion_2.Cotizacion_B64 == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion2_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cotizacion2_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
            if ($scope[HOJA].Cotizacion_2.RUT_CertBancaria_B64 == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Rut2_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Rut2_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
          }

          if ($scope[HOJA].Cotizacion_2.Control == 1) {
            if ($scope[HOJA].Cotizacion_2.Cotizacion_NIT_COD == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_2_Cotizacion_NIT_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cotizacion_2_Cotizacion_NIT_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
            // if ($scope[HOJA].Cotizacion_2.Contrato == '') {
            //   Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_2_Contrato_Label').classList.add('red-text');
            // }
            if ($scope[HOJA].Cotizacion_2.Banco == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_2_Banco_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cotizacion_2_Banco_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
            if ($scope[HOJA].Cotizacion_2.CuentaNom == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_2_CuentaNom_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cotizacion_2_CuentaNom_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
            if ($scope[HOJA].Cotizacion_2.NumeroCuenta == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_2_NumeroCuenta_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cotizacion_2_NumeroCuenta_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
            if ($scope[HOJA].Cotizacion_2.TipoCuenta == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_2_TipoCuenta_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cotizacion_2_TipoCuenta_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
            if ($scope[HOJA].Cotizacion_2.MedioPago == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_2_MedioPago_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cotizacion_2_MedioPago_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
          }
        }
        //
        if (($scope[HOJA].Cotizacion_3.Cotizacion_NIT_COD != '' || $scope[HOJA].Cotizacion_3.Banco != '' || $scope[HOJA].Cotizacion_3.CuentaNom != '' || $scope[HOJA].Cotizacion_3.NumeroCuenta != ''
          || $scope[HOJA].Cotizacion_3.TipoCuenta != '' || $scope[HOJA].Cotizacion_3.MedioPago != '' || $scope[HOJA].Cotizacion_3.Cotizacion_B64 != '') && HOJA == 'Hoja1') {
          if ($scope[HOJA].Cotizacion_3.Cotizacion_NIT_COD == '') {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_3_Cotizacion_NIT_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Cotizacion_3_Cotizacion_NIT_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
          if ($scope[HOJA].Cotizacion_3.Cotizacion_DIR_COD == '') {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_3_Cotizacion_DIR_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Cotizacion_3_Cotizacion_DIR_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
          // if ($scope[HOJA].Cotizacion_3.Contrato == '') {
          //   Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_3_Contrato_Label').classList.add('red-text');
          // }
          if ($scope[HOJA].Cotizacion_3.Banco == '') {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_3_Banco_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Cotizacion_3_Banco_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
          if ($scope[HOJA].Cotizacion_3.CuentaNom == '') {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_3_CuentaNom_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Cotizacion_3_CuentaNom_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
          if ($scope[HOJA].Cotizacion_3.NumeroCuenta == '') {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_3_NumeroCuenta_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Cotizacion_3_NumeroCuenta_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
          if ($scope[HOJA].Cotizacion_3.TipoCuenta == '') {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_3_TipoCuenta_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Cotizacion_3_TipoCuenta_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
          if ($scope[HOJA].Cotizacion_3.MedioPago == '') {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_3_MedioPago_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Cotizacion_3_MedioPago_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
          if ($scope[HOJA].Cotizacion_3.Cotizacion_B64 == '') {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion3_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Cotizacion3_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
          if ($scope[HOJA].Cotizacion_3.RUT_CertBancaria_B64 == '') {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Rut3_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Rut3_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
        }
        if (HOJA == 'HojaAnt') {
          if (($scope[HOJA].Cotizacion_3.Cotizacion_NIT_COD != '' || $scope[HOJA].Cotizacion_3.Banco != '' || $scope[HOJA].Cotizacion_3.CuentaNom != '' || $scope[HOJA].Cotizacion_3.NumeroCuenta != ''
            || $scope[HOJA].Cotizacion_3.TipoCuenta != '' || $scope[HOJA].Cotizacion_3.MedioPago != '' || $scope[HOJA].Cotizacion_3.Cotizacion_B64 != '') && $scope[HOJA].Cotizacion_3.Control == 0) {
            if ($scope[HOJA].Cotizacion_3.Cotizacion_NIT_COD == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_3_Cotizacion_NIT_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cotizacion_3_Cotizacion_NIT_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
            if ($scope[HOJA].Cotizacion_3.Cotizacion_DIR_COD == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_3_Cotizacion_DIR_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cotizacion_3_Cotizacion_DIR_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
            // if ($scope[HOJA].Cotizacion_3.Contrato == '') {
            //   Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_3_Contrato_Label').classList.add('red-text');
            // }
            if ($scope[HOJA].Cotizacion_3.Banco == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_3_Banco_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cotizacion_3_Banco_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
            if ($scope[HOJA].Cotizacion_3.CuentaNom == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_3_CuentaNom_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cotizacion_3_CuentaNom_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
            if ($scope[HOJA].Cotizacion_3.NumeroCuenta == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_3_NumeroCuenta_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cotizacion_3_NumeroCuenta_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
            if ($scope[HOJA].Cotizacion_3.TipoCuenta == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_3_TipoCuenta_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cotizacion_3_TipoCuenta_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
            if ($scope[HOJA].Cotizacion_3.MedioPago == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_3_MedioPago_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cotizacion_3_MedioPago_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
            if ($scope[HOJA].Cotizacion_3.Cotizacion_B64 == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion3_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cotizacion3_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
            if ($scope[HOJA].Cotizacion_3.RUT_CertBancaria_B64 == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Rut3_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Rut3_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
          }

          if ($scope[HOJA].Cotizacion_3.Control == 1) {
            if ($scope[HOJA].Cotizacion_3.Cotizacion_NIT_COD == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_3_Cotizacion_NIT_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cotizacion_3_Cotizacion_NIT_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
            // if ($scope[HOJA].Cotizacion_3.Contrato == '') {
            //   Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_3_Contrato_Label').classList.add('red-text');
            // }
            if ($scope[HOJA].Cotizacion_3.Banco == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_3_Banco_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cotizacion_3_Banco_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
            if ($scope[HOJA].Cotizacion_3.CuentaNom == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_3_CuentaNom_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cotizacion_3_CuentaNom_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
            if ($scope[HOJA].Cotizacion_3.NumeroCuenta == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_3_NumeroCuenta_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cotizacion_3_NumeroCuenta_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
            if ($scope[HOJA].Cotizacion_3.TipoCuenta == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_3_TipoCuenta_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cotizacion_3_TipoCuenta_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
            if ($scope[HOJA].Cotizacion_3.MedioPago == '') {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cotizacion_3_MedioPago_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Cotizacion_3_MedioPago_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
          }
        }
        //
        if (($scope[HOJA].Cotizacion_2.Cotizacion_NIT_COD == '' || $scope[HOJA].Cotizacion_3.Cotizacion_NIT_COD == '') && HOJA == 'Hoja1') {
          if ($scope[HOJA].Cotizacion_4.Justificacion == '') {
            Campos_Empty = true; Vista_Empty = 1; document.querySelector('#' + [HOJA] + '_Cotizacion_4_Justificacion_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Cotizacion_4_Justificacion_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
          if ($scope[HOJA].Cotizacion_4.Cotizacion_B64 == '') {
            Campos_Empty = true; Vista_Empty = 1; document.querySelector('#' + [HOJA] + '_Cotizacion4_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Cotizacion4_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
        }

        if (parseFloat(($scope[HOJA].Servicio.Valor_Total.replace(/\./g, '')).replace(/\,/g, '.')) < 282390) {
          Campos_Empty = true; Vista_Empty = 2; document.querySelector('#' + [HOJA] + '_Valor_Total_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Valor_Total_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }

        var array = {
          campo: Campos_Empty,
          vista: Vista_Empty
        }

        defered.resolve(array);
        return promise;
      }

      $scope.H1Guardar_Anticipo = function () {
        var Campos_Empty = false;
        var Vista_Empty = 0;
        var Subir_Soportes = [
          $scope.Validar_CamposVacios('Hoja1', 'Busqueda')
        ];
        $q.all(Subir_Soportes).then(function (resultado) {
          // var Archivos_Error = false;
          Campos_Empty = resultado[0].campo;
          Vista_Empty = resultado[0].vista;
          if (Campos_Empty == false) {
            swal({
              title: '¿Esta seguro que desea crear este anticipo?',
              type: "question",
              showCancelButton: true,
              allowOutsideClick: false
            }).catch(swal.noop)
              .then((willDelete) => {
                if (willDelete) {

                  swal({ title: 'Cargando...', allowOutsideClick: false });
                  swal.showLoading();
                  var xFecha = $scope.Hoja1.Servicio.FechaRadicacion;
                  var FechaRadicacion = xFecha.getUTCDate() + '/' + (((xFecha.getMonth() + 1) < 10) ? '0' + (xFecha.getMonth() + 1) : (xFecha.getMonth() + 1)) + '/' + xFecha.getFullYear();
                  var xdata = null, xdata_serpro = [];
                  xdata = {
                    Afi_TipoDoc: $scope.Hoja1.Afiliado.TipoDoc,
                    Afi_NumeroDoc: $scope.Hoja1.Afiliado.NumeroDoc,
                    Afi_Sexo: $scope.Hoja1.Afiliado.Sexo.substr(0, 1),
                    Afi_Edad: $scope.Hoja1.Afiliado.EdadDias,
                    Ser_Ips_Solicitante_Cod: $scope.Hoja1.Servicio.Ips_Solicitante_Cod,
                    Ser_Diagnostico1_Cod: $scope.Hoja1.Servicio.Diagnostico1_Cod,
                    Ser_Diagnostico2_Cod: $scope.Hoja1.Servicio.Diagnostico2_Cod,
                    Fecha_Orden: FechaRadicacion
                  };

                  $scope.Hoja1.Servicio.Array.forEach(e => {
                    xdata_serpro.push({
                      "SERVICIO": e.SERVICIO, "PRODUCTO": e.PRODUCTO, "SUBCLASE": e.SUBCLASE, "CANTIDAD": e.CANTIDAD, "VALOR": e.VALOR.toString(),
                      "TIPOAUT": e.TIPOAUT, "UBICACIONAUT": e.UBICACIONAUT
                    });
                  });
                  // $scope.Hoja1.Servicio.Array
                  $http({
                    method: 'POST',
                    url: "php/autorizaciones/anticipos/anticipos.php",
                    data: {
                      function: 'Antes_De_Inserta_Anticipo',
                      xdata: JSON.stringify(xdata),
                      xdata_serpro: JSON.stringify(xdata_serpro),
                      Numero: null,
                      cantidad: xdata_serpro.length
                    }
                  }).then(function (response) {
                    if (response.data.codigo != undefined) {
                      if (response.data.codigo == 4 && $scope.HojaAnt_Advertencias.length == 0) {
                        $scope.HojaAnt_Advertencias = response.data.mensaje;
                        setTimeout(() => { $scope.$apply(); }, 1000);
                        swal({
                          title: "Por favor, revisar las advertencias",
                          type: "warning",
                        }).catch(swal.noop);
                      } else {
                        if (response.data.codigo == 0 || response.data.codigo == 4) {
                          var Subir_Soportes = [
                            $scope.Cargar_Soporte_FTP('Soportes', 'CopiaHistoria_B64', 'Historia_Clinica', 'CopiaHistoria_RUTA', 0),
                            $scope.Cargar_Soporte_FTP('Soportes', 'CopiaCedula_B64', 'Fotopocia_Doc_Identidad', 'CopiaCedula_RUTA', $scope.Hoja1.Soportes.CopiaCedula_VAL),
                            $scope.Cargar_Soporte_FTP('Soportes', 'CopiaAdres_B64', 'Fotocopia_Adres', 'CopiaAdres_RUTA', $scope.Hoja1.Soportes.CopiaAdres_VAL),
                            $scope.Cargar_Soporte_FTP('Soportes', 'CopiaSolicitudServicio_B64', 'Solicitud_Servicio_Medico', 'CopiaSolicitudServicio_RUTA', 0),
                            $scope.Cargar_Soporte_FTP('Soportes', 'CopiaMipres_B64', 'Formato_Mipres', 'CopiaMipres_RUTA', 0),
                            $scope.Cargar_Soporte_FTP('Cotizacion_1', 'Cotizacion_B64', 'Cotizacion_1', 'Cotizacion1_RUTA', 0),
                            $scope.Cargar_Soporte_FTP('Cotizacion_1', 'RUT_CertBancaria_B64', 'Cotizacion_1_RUT', 'Cotizacion1_RUT_RUTA', 0),
                            $scope.Cargar_Soporte_FTP('Cotizacion_2', 'Cotizacion_B64', 'Cotizacion_2', 'Cotizacion2_RUTA', 0),
                            $scope.Cargar_Soporte_FTP('Cotizacion_2', 'RUT_CertBancaria_B64', 'Cotizacion_2_RUT', 'Cotizacion2_RUT_RUTA', 0),
                            $scope.Cargar_Soporte_FTP('Cotizacion_3', 'Cotizacion_B64', 'Cotizacion_3', 'Cotizacion3_RUTA', 0),
                            $scope.Cargar_Soporte_FTP('Cotizacion_3', 'RUT_CertBancaria_B64', 'Cotizacion_3_RUT', 'Cotizacion3_RUT_RUTA', 0),
                            $scope.Cargar_Soporte_FTP('Cotizacion_4', 'Cotizacion_B64', 'Cotizacion_4_Justificacion', 'Cotizacion4_RUTA', 0)
                          ];
                          $q.all(Subir_Soportes).then(function (resultado) {
                            var Archivos_Error = false;
                            for (var x = 0; x < resultado.length; x++) {
                              if (resultado[x].substr(0, 3) == '<br' || resultado[x].substr(0, 1) == '0') {
                                Archivos_Error = true;
                                swal({
                                  title: '¡Error al subir un archivo!',
                                  text: 'Nota: Si el error persiste, por favor actualizar la página (CONTROL + F5).',
                                  type: 'warning'
                                }).catch(swal.noop);
                              }
                            }
                            if (Archivos_Error == false) {
                              $scope.H1Insertar_Anticipo();
                            }
                          });
                        } else {
                          swal({
                            title: "Mensaje",
                            text: response.data.mensaje,
                            type: "warning",
                          }).catch(swal.noop);
                        }
                      }
                    }
                  });
                } else {
                  $('.selected').removeClass('selected');
                }
              });

          } else {
            if (Vista_Empty == 2) {
              setTimeout(function () {
                swal({
                  title: '¡Información!',
                  text: 'El valor total del anticipo debe ser mayor a $254.472, pagar por caja menor',
                  type: 'info'
                }).catch(swal.noop);
              }, 1000);
            } else if (Vista_Empty == 5) {
              setTimeout(function () {
                swal({
                  title: '¡Información!',
                  text: 'Debe seleccionar al menos un servicio y producto.',
                  type: 'info'
                }).catch(swal.noop);
              }, 1000);
            } else if (Vista_Empty == 1) {
              setTimeout(function () {
                swal({
                  title: '¡Información!',
                  text: 'Debe ingresar una justifición y soporte teniendo en cuenta que no adjunto las 3 cotizaciones.',
                  type: 'info'
                }).catch(swal.noop);
              }, 1000);
            } else {
              Materialize.toast('¡Campos vacios o invalidos!', 3000);
            }
          }
        });
      }

      $scope.Cargar_Soporte_FTP = function (SOPORTE, BASE, NAME, RUTA, VAL) {
        var defered = $q.defer();
        var promise = defered.promise;
        if (VAL == 1) {
          defered.resolve($scope.Hoja1.Soportes[RUTA]);
        } else {
          if ($scope.Hoja1[SOPORTE][BASE] != '') {
            $http({
              method: 'POST',
              url: "php/autorizaciones/anticipos/anticipos_Subir.php",
              data: {
                function: 'Upload',
                base: $scope.Hoja1[SOPORTE][BASE],
                name: NAME,
                carpeta: $scope.Hoja1.Afiliado.TipoDoc + '_' + $scope.Hoja1.Afiliado.NumeroDoc
              }
            }).then(function (response) {
              $scope.Hoja1.Soportes[RUTA] = response.data;
              defered.resolve(response.data);
            });
          } else {
            defered.resolve($scope.Hoja1.Soportes[RUTA]);
          }
        }
        return promise;
      }

      $scope.H1Insertar_Anticipo = function () {
        ///////////////////////////////////////////////////////////////////////////
        var xFecha = $scope.Hoja1.Servicio.FechaRadicacion;
        var FechaRadicacion = xFecha.getFullYear() + '-' + (((xFecha.getMonth() + 1) < 10) ? '0' + (xFecha.getMonth() + 1) : (xFecha.getMonth() + 1)) + '-' + xFecha.getUTCDate();
        var xdata = null, xdata_serpro = [];
        xdata = {
          Afi_TipoDoc: $scope.Hoja1.Afiliado.TipoDoc,
          Afi_NumeroDoc: $scope.Hoja1.Afiliado.NumeroDoc,
          Afi_MunicipioAtencion: $scope.Hoja1.Afiliado.MunicipioAtencion_Cod,
          Afi_OpPBS: ($scope.Hoja1.Afiliado.OpPBS == false) ? '0' : '1',
          Afi_NumMipres: ($scope.Hoja1.Afiliado.OpPBS == false) ? '' : $scope.Hoja1.Afiliado.NumMipres,
          Afi_Deficit: $scope.Hoja1.Afiliado.Deficit,
          Afi_Cumplimiento: ($scope.Hoja1.Afiliado.Cumplimiento == '') ? 'Nin' : $scope.Hoja1.Afiliado.Cumplimiento,
          Afi_Cumplimiento_NUM: ($scope.Hoja1.Afiliado.Cumplimiento == 'Nin') ? '' : $scope.Hoja1.Afiliado.Cumplimiento_NUM,
          Afi_Observacion: $scope.Hoja1.Servicio.Observacion,
          Ser_Tipo: $scope.Hoja1.Servicio.Tipo,
          Ser_Marca_Referencia: $scope.Hoja1.Servicio.Marca_Referencia,
          Ser_FechaRadicacion: FechaRadicacion,
          Ser_Ips_Solicitante_Cod: $scope.Hoja1.Servicio.Ips_Solicitante_Cod,
          Ser_Diagnostico1_Cod: $scope.Hoja1.Servicio.Diagnostico1_Cod,
          Ser_Diagnostico2_Cod: $scope.Hoja1.Servicio.Diagnostico2_Cod,
          Ser_Descripcion: $scope.Hoja1.Servicio.Descripcion.toUpperCase(),
          Ser_Justificacion: $scope.Hoja1.Servicio.Justificacion.toUpperCase(),
          Sop_CopiaHistoria_URL: $scope.Hoja1.Soportes.CopiaHistoria_RUTA,
          Sop_CopiaCedula_URL: $scope.Hoja1.Soportes.CopiaCedula_RUTA,
          Sop_CopiaAdres_URL: $scope.Hoja1.Soportes.CopiaAdres_RUTA,
          Sop_CopiaMipres_URL: $scope.Hoja1.Soportes.CopiaMipres_RUTA,
          Sop_CopiaSolicitudServicio_URL: $scope.Hoja1.Soportes.CopiaSolicitudServicio_RUTA,

          Sop_Cotizacion1_URL: $scope.Hoja1.Soportes.Cotizacion1_RUTA,
          Sop_Cotizacion1_NIT_COD: ($scope.Hoja1.Cotizacion_1.Cotizacion_B64 == '') ? '' : $scope.Hoja1.Cotizacion_1.Cotizacion_NIT_COD,
          Sop_Cotizacion1_BANCO: $scope.Hoja1.Cotizacion_1.Banco,
          Sop_Cotizacion1_CUENTANOM: $scope.Hoja1.Cotizacion_1.CuentaNom,
          Sop_Cotizacion1_NUMEROCUENTA: $scope.Hoja1.Cotizacion_1.NumeroCuenta,
          Sop_Cotizacion1_TIPOCUENTA: $scope.Hoja1.Cotizacion_1.TipoCuenta,
          Sop_Cotizacion1_MEDIOPAGO: $scope.Hoja1.Cotizacion_1.MedioPago,
          Sop_Cotizacion1_RUT_URL: $scope.Hoja1.Soportes.Cotizacion1_RUT_RUTA,
          Sop_Cotizacion1_DIR: $scope.Hoja1.Cotizacion_1.Cotizacion_DIR_COD,

          Sop_Cotizacion2_URL: $scope.Hoja1.Soportes.Cotizacion2_RUTA,
          Sop_Cotizacion2_NIT_COD: ($scope.Hoja1.Cotizacion_2.Cotizacion_B64 == '') ? '' : $scope.Hoja1.Cotizacion_2.Cotizacion_NIT_COD,
          Sop_Cotizacion2_BANCO: $scope.Hoja1.Cotizacion_2.Banco,
          Sop_Cotizacion2_CUENTANOM: $scope.Hoja1.Cotizacion_2.CuentaNom,
          Sop_Cotizacion2_NUMEROCUENTA: $scope.Hoja1.Cotizacion_2.NumeroCuenta,
          Sop_Cotizacion2_TIPOCUENTA: $scope.Hoja1.Cotizacion_2.TipoCuenta,
          Sop_Cotizacion2_MEDIOPAGO: $scope.Hoja1.Cotizacion_2.MedioPago,
          Sop_Cotizacion2_RUT_URL: $scope.Hoja1.Soportes.Cotizacion2_RUT_RUTA,
          Sop_Cotizacion2_DIR: $scope.Hoja1.Cotizacion_2.Cotizacion_DIR_COD,

          Sop_Cotizacion3_URL: $scope.Hoja1.Soportes.Cotizacion3_RUTA,
          Sop_Cotizacion3_NIT_COD: ($scope.Hoja1.Cotizacion_3.Cotizacion_B64 == '') ? '' : $scope.Hoja1.Cotizacion_3.Cotizacion_NIT_COD,
          Sop_Cotizacion3_BANCO: $scope.Hoja1.Cotizacion_3.Banco,
          Sop_Cotizacion3_CUENTANOM: $scope.Hoja1.Cotizacion_3.CuentaNom,
          Sop_Cotizacion3_NUMEROCUENTA: $scope.Hoja1.Cotizacion_3.NumeroCuenta,
          Sop_Cotizacion3_TIPOCUENTA: $scope.Hoja1.Cotizacion_3.TipoCuenta,
          Sop_Cotizacion3_MEDIOPAGO: $scope.Hoja1.Cotizacion_3.MedioPago,
          Sop_Cotizacion3_RUT_URL: $scope.Hoja1.Soportes.Cotizacion3_RUT_RUTA,
          Sop_Cotizacion3_DIR: $scope.Hoja1.Cotizacion_3.Cotizacion_DIR_COD,

          Sop_Cotizacion4_Justificacion: $scope.Hoja1.Cotizacion_4.Justificacion.toUpperCase(),
          Sop_Cotizacion4_URL: $scope.Hoja1.Soportes.Cotizacion4_RUTA,

          Func_Rol_Cedula: $scope.Rol_Cedula,
          Func_Rol_Ubi_COD: $scope.Rol_Ubicacion,
        };

        $scope.Hoja1.Servicio.Array.forEach(e => {
          xdata_serpro.push({
            "SERVICIO": e.SERVICIO, "PRODUCTO": e.PRODUCTO, "SUBCLASE": e.SUBCLASE, "CANTIDAD": e.CANTIDAD, "VALOR": e.VALOR.toString().replace(/\./g, ','),
            "TIPOAUT": e.TIPOAUT, "UBICACIONAUT": e.UBICACIONAUT
          });
        });

        $http({
          method: 'POST',
          url: "php/autorizaciones/anticipos/anticipos.php",
          data: {
            function: 'Inserta_Anticipo',
            xdata: JSON.stringify(xdata),
            xdata_serpro: JSON.stringify(xdata_serpro),
            cantidad: xdata_serpro.length
          }
        }).then(function (response) {
          if (response.data.codigo != undefined) {
            if (response.data.codigo == 1) {
              swal({
                title: "Mensaje",
                text: response.data.mensaje,
                type: "warning",
              }).catch(swal.noop);

            } else {
              $scope.Sop_Lab = null;
              $scope.Limpiar_Hoja1();
              $scope.H1Limpiar_Soportes('Hoja1');
              $timeout(function () {
                $scope.Listar_Solicitudes();
              }, 2000);
              $scope.Ver_Anticipo_DeNuevo = {
                CONSECUTIVO: response.data.CONSECUTIVO,
                TIPO_DOC_AFI: response.data.TIPO_DOC_AFI,
                DOC_AFI: response.data.DOC_AFI
              };
              swal({
                title: response.data.mensaje,
                text: "¿Desea ver el anticipo?",
                type: "success",
                showCancelButton: true,
                confirmButtonText: "Si",
                cancelButtonText: "No",
                allowOutsideClick: false

              }).then(function (result) {
                if (result) {
                  $scope.Cargar_Anticipo($scope.Ver_Anticipo_DeNuevo);
                  $scope.SetTab(1);
                  $timeout(
                    function () {
                      $("#Sol").click();
                    }, 500
                  );
                  $timeout(
                    function () {
                      $("#Sol").click();
                    }, 700
                  );
                }
              }).catch(swal.noop);
            }
          }
        });
        ///////////////////////////////////////////////////////////////////////////
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////
      // SOLICITUDES///////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.animacion = function () {
        return {
          "animation": "slide 0.7s cubic-bezier(0.55, 0.085, 0.68, 0.53) 0s 1 normal both running"
        }
      }

      $scope.Volver_Anticipo = function () {
        $timeout(function () {
          $scope.HojaAnticipo = false;
        }, 500);
      }

      $scope.Cargar_Anticipo = function (X) {
        if ($scope.Rol_Cargo != 0 && $scope.Ubicacion != 0) {
          $scope.HojaAnt = null;
          $scope.HojaAnt_Soportes_Tutela = '';
          $scope.HojaAnt_Soportes_Tutela_Incidentes = '';
          $scope.HojaAnt_Soportes_Tutela_Seguimiento = '';
          $scope.HojaAnt_Botones = false;
          $scope.Motivo_Anulacion_Devolucion = '';
          $scope.Sop_LabAnt = null;
          $scope.Limpiar_HojaAnt();
          $scope.HojaPer = null;
          $scope.H1Limpiar_Campos_Req('HojaAnt');
          $scope.HojaAnt_Botones_Pagaduria = false;
          $scope.HojaAnt_Botones_Prestacion_Efectiva = false;
          $scope.Check_Advertencia = [];
          angular.forEach(document.querySelectorAll('.HojaAnt_Pert_Des .red-text'), function (i) {
            i.classList.remove('red-text');
          });
          $timeout(function () {
            $("#collapsible-header-HojaAnt-Pertinencia").removeClass(function () {
              return "active";
            }); $(".collapsible").collapsible({ accordion: true }); $(".collapsible").collapsible({ accordion: false });
          }, 1000);
          $("#collapsible-header-HojaAnt-prestador1").addClass(function () {
            return "active";
          }); $(".collapsible").collapsible({ accordion: true }); $(".collapsible").collapsible({ accordion: true });
          ///////////////////////////////
          //Desactivar Inputs Informacion inicial primera linea//
          angular.forEach(document.querySelectorAll('.HojaAnt_PrimeraLinea input'), function (i) {
            i.setAttribute("readonly", true);
          });
          angular.forEach(document.querySelectorAll('.HojaAnt_PrimeraLinea select'), function (i) {
            i.setAttribute("disabled", true);
          });
          //Desactivar Input Anticipos//
          angular.forEach(document.querySelectorAll('.HojaAnt_Des input'), function (i) {
            i.setAttribute("readonly", true);
          });
          angular.forEach(document.querySelectorAll('.HojaAnt_Des textarea'), function (i) {
            i.setAttribute("readonly", true);
          });
          //Desactivar Input Cotizaciones//
          angular.forEach(document.querySelectorAll('.HojaAnt_Cot input'), function (i) {
            i.setAttribute("readonly", true);
          });
          angular.forEach(document.querySelectorAll('.HojaAnt_Cot textarea'), function (i) {
            i.setAttribute("readonly", true);
          });
          // $scope.HojaAnticipo_Mod = true;
          $scope.HojaAnticipo_Edi_Mod = true;
          $scope.HojaAnticipo_Ser_Mod = true;
          ///////////////////////////////////
          // Desactivar Inputs Pertinencia//
          angular.forEach(document.querySelectorAll('.HojaAnt_Pert_Des input'), function (i) {
            i.setAttribute("readonly", true);
          });
          angular.forEach(document.querySelectorAll('.HojaAnt_Pert_Des select'), function (i) {
            i.setAttribute("disabled", true);
          });
          angular.forEach(document.querySelectorAll('.HojaAnt_Pert_Des textarea'), function (i) {
            i.setAttribute("readonly", true);
          });
          $scope.HojaAnticipo_Pert_Mod = true;
          /////////////////////////////////////
          $http({
            method: 'POST',
            url: "php/autorizaciones/anticipos/anticipos.php",
            data: {
              function: 'Obt_Anticipo',
              Numero: X.CONSECUTIVO,
              TipoDoc: X.TIPO_DOC_AFI,
              NumeroDoc: X.DOC_AFI,
            }
          }).then(function (response) {
            if (response.data != undefined) {
              if (response.data[0] != undefined && response.data[0].ERROR == undefined) {
                $scope.HojaAnticipo = true;
                document.querySelector('#Hoja_Anticipo').classList.add('Ani_Down');
                $timeout(
                  function () {
                    document.querySelector('#Hoja_Anticipo').classList.remove('Ani_Down');
                  }, 1000
                );
                var Fecha_Sol = response.data[0].Fecha_Sol;
                var Fecha_Sol_Val = new Date(response.data[0].Fecha_Sol_Val);
                var FechaRadicacion = new Date(response.data[0].FechaRadicacion);
                var Valor_Total = 0;
                var Val_Aut = 0;

                response.data[0].Serv_Prod.forEach(e => {
                  Valor_Total = parseFloat(Valor_Total) + (parseFloat(e.VALOR.toString().replace(/\,/g, '.')) * e.CANTIDAD);
                  Val_Aut = e.AUT == '' ? Val_Aut : Val_Aut + 1;
                });

                //Activar Input Servicio Al ASISTENTE SECCIONAL DE AUTORIZACIONES EN ESTADO ACTIVO
                if (response.data[0].Status == 1 && response.data[0].Estado == 'A' && ($scope.Rol_Cargo == 26 || $scope.Rol_Cargo == 141 || $scope.Rol_Cargo == 34) && $scope.Rol_Cedula == response.data[0].Responsable) {
                  // Informacion del afiliado
                  angular.forEach(document.querySelectorAll('.HojaAnt_Des input'), function (i) {
                    i.removeAttribute("readonly");
                  });
                  angular.forEach(document.querySelectorAll('.HojaAnt_Des textarea'), function (i) {
                    i.removeAttribute("readonly");
                  });
                  //Desactivar Input Cotizaciones//
                  angular.forEach(document.querySelectorAll('.HojaAnt_Cot input'), function (i) {
                    i.removeAttribute("readonly");
                  });
                  angular.forEach(document.querySelectorAll('.HojaAnt_Cot textarea'), function (i) {
                    i.removeAttribute("readonly");
                  });
                  $scope.HojaAnticipo_Edi_Mod = false;
                }

                //Activar Input Servicio Al ASISTENTE SECCIONAL DE AUTORIZACIONES EN ESTADO DEVUELTO
                if (response.data[0].Estado == 'D' && ($scope.Rol_Cargo == 26 || $scope.Rol_Cargo == 34) && $scope.Rol_Cedula == response.data[0].Responsable) {
                  angular.forEach(document.querySelectorAll('.HojaAnt_Des input'), function (i) {
                    i.removeAttribute("readonly");
                  });
                  angular.forEach(document.querySelectorAll('.HojaAnt_Des textarea'), function (i) {
                    i.removeAttribute("readonly");
                  });
                  //Desactivar Input Cotizaciones//
                  angular.forEach(document.querySelectorAll('.HojaAnt_Cot input'), function (i) {
                    i.removeAttribute("readonly");
                  });
                  angular.forEach(document.querySelectorAll('.HojaAnt_Cot textarea'), function (i) {
                    i.removeAttribute("readonly");
                  });
                  $scope.HojaAnticipo_Edi_Mod = false;
                }
                //Activar Input Pertinencia Al AUDITOR SECCIONAL DE SERVICIOS DE SALUD
                if (response.data[0].Status == 2 && response.data[0].Estado == 'A' && $scope.Rol_Cargo == 34) {
                  angular.forEach(document.querySelectorAll('.HojaAnt_Pert_Des input'), function (i) {
                    i.removeAttribute("readonly");
                  });
                  angular.forEach(document.querySelectorAll('.HojaAnt_Pert_Des select'), function (i) {
                    i.removeAttribute("disabled");
                  });
                  angular.forEach(document.querySelectorAll('.HojaAnt_Pert_Des textarea'), function (i) {
                    i.removeAttribute("readonly");
                  });
                  $scope.HojaAnticipo_Pert_Mod = false;
                }
                //Activar Formato de Pertinencia Cuando sea mayor el status
                if (response.data[0].Status > 1) {
                  $scope.HojaAnticipo_Pert_Ver = true;

                  var Fecha_OrdenMed = new Date(response.data[0].Fecha_OrdenMed);
                  var Fecha_Recibido = new Date(response.data[0].Fecha_Recibido);
                  var Fecha_EnvioNac = new Date(response.data[0].Fecha_EnvioNac);

                  $scope.HojaPer = {
                    Form_Mipres: response.data[0].Form_Mipres,
                    ComTecCien: response.data[0].ComTecCien,
                    Autorizado: response.data[0].Autorizado,
                    Fecha_OrdenMed: Fecha_OrdenMed,
                    Fecha_Recibido: Fecha_Recibido,
                    Fecha_EnvioNac: Fecha_EnvioNac,
                    Pertinencia: response.data[0].Pertinencia
                  }
                }

                var xAdvertencias = [
                  {
                    NOMBRE: 'Control de fecuencia anual en producto 920406 cantidad acumulada 2, ya existe autorizacion 1364060-50001, 1373765-50001 para este producto, por favor contactar con la oficina nacional, AutProCode: 2760!',
                    CHECK: false
                  },
                  {
                    NOMBRE: 'Control de fecuencia anual en producto 920406 cantidad acumulada 2, ya existe autorizacion 1364060-50001, 1373765-50001 para este producto, por favor contactar con la oficina nacional, AutProCode: 2760!',
                    CHECK: true
                  }
                ]

                $scope.HojaAnt = {
                  Info: {
                    Estado: response.data[0].Estado,
                    Status: response.data[0].Status,
                    Ubicacion: response.data[0].Ubicacion,
                    Ubicacion_Cod: response.data[0].Ubicacion_Cod,
                    Responsable: response.data[0].Responsable,
                    UrlSoporte: '',
                    UrlSoporte_Nombre: '',
                    Comentario: response.data[0].Comentario,
                    Consecutivo: response.data[0].Consecutivo,
                    Fecha_Solicitud: Fecha_Sol,
                    Fecha_Solicitud_Val: Fecha_Sol_Val,
                    Cotizacion_Recomendado: response.data[0].Cotizacion_Recomendado,
                    Cotizacion_Elegido: response.data[0].Cotizacion_Elegido,
                    Num_Aut: response.data[0].Num_Aut,
                    Val_Aut: Val_Aut
                  },
                  Afiliado:
                  {
                    TipoDoc: response.data[0].TipoDoc,
                    NumeroDoc: response.data[0].NumeroDoc,
                    NombreUsu: response.data[0].NombreUsu,
                    MunicipioUsu: response.data[0].MunicipioUsu,
                    MunicipioAtencion: response.data[0].MunicipioAtencion,
                    MunicipioAtencion_Cod: response.data[0].MunicipioAtencion_Cod,
                    Sexo: response.data[0].Sexo,
                    EdadDias: response.data[0].EdadDias,
                    OpPBS: (response.data[0].OpPBS == 1) ? true : false,
                    NumMipres: response.data[0].NumMipres,
                    Deficit: response.data[0].Deficit,
                    Cumplimiento: response.data[0].Cumplimiento,
                    Cumplimiento_NUM: response.data[0].Cumplimiento_NUM,
                    Regimen: response.data[0].Regimen,
                    TipoAut: "",
                    UbicacionAut: "",
                    Count_Tutela: 0,
                    Count_Medida: 0,
                    Count_Incidente: 0
                  },
                  Servicio:
                  {
                    Tipo: response.data[0].Tipo,
                    FechaRadicacion: FechaRadicacion,
                    Valor_Total: $scope.formatPeso2(Valor_Total.toString().replace(',', '.')),
                    Valor: '',
                    Marca_Referencia: response.data[0].Marca_Referencia,
                    Cantidad: '',
                    Servicio: '',
                    Servicio_Cod: '',
                    Prod: '',
                    Prod_Cod: '',
                    Subclase: '',
                    Subclase_Cod: '',
                    Array: response.data[0].Serv_Prod,
                    Ips_Solicitante: response.data[0].Ips_Solicitante,
                    Ips_Solicitante_Cod: response.data[0].Ips_Solicitante_Cod,

                    Diagnostico1: response.data[0].Diagnostico1,
                    Diagnostico1_Cod: response.data[0].Diagnostico1_Cod,
                    Diagnostico2: response.data[0].Diagnostico2,
                    Diagnostico2_Cod: response.data[0].Diagnostico2_Cod,
                    Descripcion: response.data[0].Descripcion,
                    Justificacion: response.data[0].Justificacion,
                    Observacion: response.data[0].Observacion
                  },
                  Soportes:
                  {
                    CopiaHistoria_URL: null,
                    CopiaHistoria_B64: '',
                    CopiaCedula_VAL: 0,
                    CopiaCedula_URL: null,
                    CopiaCedula_B64: '',
                    CopiaAdres_VAL: 0,
                    CopiaAdres_URL: null,
                    CopiaAdres_B64: '',
                    CopiaSolicitudServicio_URL: null,
                    CopiaSolicitudServicio_B64: '',
                    CopiaMipres_URL: null,
                    CopiaMipres_B64: '',
                    CopiaPagaduria_URL: null,
                    CopiaPagaduria_B64: '',
                    FechaPagoPagaduria: null,
                    FechaPrestacionEfectiva: null,
                    FechaPrestacionEfectiva_TEXTO: response.data[0].FechaPrestacionEfectiva,
                    Soporte_PrestacionEfectiva_URL: null,
                    Soporte_PrestacionEfectiva_B64: '',

                    CopiaHistoria_RUTA: response.data[0].CopiaHistoria_RUTA,
                    CopiaCedula_RUTA: response.data[0].CopiaCedula_RUTA,
                    CopiaAdres_RUTA: response.data[0].CopiaAdres_RUTA,
                    CopiaSolicitudServicio_RUTA: response.data[0].CopiaSolicitudServicio_RUTA,
                    CopiaMipres_RUTA: response.data[0].CopiaMipres_RUTA,
                    CopiaPagaduria_RUTA: response.data[0].CopiaPagaduria_RUTA,
                    Cotizacion1_RUTA: response.data[0].Cotizacion1_RUTA,
                    Cotizacion1_RUT_RUTA: response.data[0].Cotizacion1_RUT_RUTA,
                    Cotizacion2_RUTA: response.data[0].Cotizacion2_RUTA,
                    Cotizacion2_RUT_RUTA: response.data[0].Cotizacion2_RUT_RUTA,
                    Cotizacion3_RUTA: response.data[0].Cotizacion3_RUTA,
                    Cotizacion3_RUT_RUTA: response.data[0].Cotizacion3_RUT_RUTA,
                    Cotizacion4_RUTA: response.data[0].Cotizacion4_RUTA,
                    Soporte_PrestacionEfectiva_RUTA: response.data[0].Soporte_PrestacionEfectiva_RUTA,
                  },
                  Cotizacion_1:
                  {
                    Banco: response.data[0].Cotizacion1_BANCO,
                    CuentaNom: response.data[0].Cotizacion1_CUENTANOM,
                    NumeroCuenta: response.data[0].Cotizacion1_NUMEROCUENTA,
                    TipoCuenta: response.data[0].Cotizacion1_TIPOCUENTA,
                    MedioPago: response.data[0].Cotizacion1_MEDIOPAGO,
                    Cotizacion_URL: null,
                    Cotizacion_NIT: response.data[0].Cotizacion1_NIT,
                    Cotizacion_NIT_COD: response.data[0].Cotizacion1_COD,
                    Cotizacion_B64: '',
                    RUT_CertBancaria_URL: null,
                    RUT_CertBancaria_B64: '',

                    Cotizacion_DIR: response.data[0].Cotizacion1_DIR == '0' ? '' : response.data[0].Cotizacion1_DIR,
                    Cotizacion_DIR_COD: response.data[0].Cotizacion1_DIR == '0' ? '' : response.data[0].Cotizacion1_DIR_COD,

                    Contratada: response.data[0].Contratada1_Proc_aut != '' ?
                      response.data[0].Contratada1_Proc_aut : response.data[0].Contratada1_Aut != '' ?
                        response.data[0].Contratada1_Aut : response.data[0].Contratada1_Registro != '' ? response.data[0].Contratada1_Registro : ''
                  },
                  Cotizacion_2:
                  {
                    Control: response.data[0].Cotizacion2_CONTROL,
                    Banco: response.data[0].Cotizacion2_BANCO == null ? '' : response.data[0].Cotizacion2_BANCO,
                    CuentaNom: response.data[0].Cotizacion2_CUENTANOM == null ? '' : response.data[0].Cotizacion2_CUENTANOM,
                    NumeroCuenta: response.data[0].Cotizacion2_NUMEROCUENTA == null ? '' : response.data[0].Cotizacion2_NUMEROCUENTA,
                    TipoCuenta: response.data[0].Cotizacion2_TIPOCUENTA == null ? '' : response.data[0].Cotizacion2_TIPOCUENTA,
                    MedioPago: response.data[0].Cotizacion2_MEDIOPAGO == null ? '' : response.data[0].Cotizacion2_MEDIOPAGO,
                    Cotizacion_URL: null,
                    Cotizacion_NIT: response.data[0].Cotizacion2_NIT == null ? '' : response.data[0].Cotizacion2_NIT,
                    Cotizacion_NIT_COD: response.data[0].Cotizacion2_COD == null ? '' : response.data[0].Cotizacion2_COD,
                    Cotizacion_B64: '',
                    RUT_CertBancaria_URL: null,
                    RUT_CertBancaria_B64: '',

                    Cotizacion_DIR: response.data[0].Cotizacion2_DIR == '0' ? '' : response.data[0].Cotizacion2_DIR,
                    Cotizacion_DIR_COD: response.data[0].Cotizacion2_DIR == '0' ? '' : response.data[0].Cotizacion2_DIR_COD,

                    Contratada: response.data[0].Contratada2_Proc_aut != '' ?
                      response.data[0].Contratada2_Proc_aut : response.data[0].Contratada2_Aut != '' ?
                        response.data[0].Contratada2_Aut : response.data[0].Contratada2_Registro != '' ? response.data[0].Contratada2_Registro : ''
                  },
                  Cotizacion_3:
                  {
                    Control: response.data[0].Cotizacion3_CONTROL,
                    Banco: response.data[0].Cotizacion3_BANCO == null ? '' : response.data[0].Cotizacion3_BANCO,
                    CuentaNom: response.data[0].Cotizacion3_CUENTANOM == null ? '' : response.data[0].Cotizacion3_CUENTANOM,
                    NumeroCuenta: response.data[0].Cotizacion3_NUMEROCUENTA == null ? '' : response.data[0].Cotizacion3_NUMEROCUENTA,
                    TipoCuenta: response.data[0].Cotizacion3_TIPOCUENTA == null ? '' : response.data[0].Cotizacion3_TIPOCUENTA,
                    MedioPago: response.data[0].Cotizacion3_MEDIOPAGO == null ? '' : response.data[0].Cotizacion3_MEDIOPAGO,
                    Cotizacion_URL: null,
                    Cotizacion_NIT: response.data[0].Cotizacion3_NIT == null ? '' : response.data[0].Cotizacion3_NIT,
                    Cotizacion_NIT_COD: response.data[0].Cotizacion3_NIT == null ? '' : response.data[0].Cotizacion3_COD,
                    Cotizacion_B64: '',
                    RUT_CertBancaria_URL: null,
                    RUT_CertBancaria_B64: '',

                    Cotizacion_DIR: response.data[0].Cotizacion3_DIR == '0' ? '' : response.data[0].Cotizacion3_DIR,
                    Cotizacion_DIR_COD: response.data[0].Cotizacion3_DIR_COD == '0' ? '' : response.data[0].Cotizacion3_DIR_COD,

                    Contratada: response.data[0].Contratada3_Proc_aut != '' ?
                      response.data[0].Contratada3_Proc_aut : response.data[0].Contratada3_Aut != '' ?
                        response.data[0].Contratada3_Aut : response.data[0].Contratada3_Registro != '' ? response.data[0].Contratada3_Registro : ''
                  },
                  Cotizacion_4:
                  {
                    Justificacion: response.data[0].Cotizacion4_Justificacion == null ? '' : response.data[0].Cotizacion4_Justificacion,
                    Cotizacion_URL: null,
                    Cotizacion_B64: '',
                  },
                  Advertencias: xAdvertencias
                };


                $timeout(function () { $scope.HojaAnt.Afiliado.Cumplimiento_NUM = response.data[0].Cumplimiento_NUM; $scope.HojaAnt_Servicio_Cumplimiento_Read = true; $scope.$apply() }, 1000);


                $scope.BusquedaAnt = {
                  Municipio:
                  {
                    Filtro: null,
                    Listado: null,
                    SAVE: null
                  },
                  Cumplimiento: {
                    Listado: null
                  },
                  Ips_Solicitante: {
                    Listado: null,
                  },
                  Servicio: {
                    Filtro: null,
                    Listado: null,
                    SAVE: null
                  },
                  Producto: {
                    Filtro: null,
                    Listado: null,
                    SAVE: null
                  },
                  Subclase: {
                    Filtro: null,
                    Listado: null,
                    SAVE: null
                  },
                  Diagnostico1: {
                    Filtro: null,
                    Listado: null,
                    SAVE: null
                  },
                  Diagnostico2: {
                    Filtro: null,
                    Listado: null,
                    SAVE: null
                  },
                  Prestador1: {
                    Filtro: null,
                    Listado: null,
                    SAVE: null
                  },
                  Prestador2: {
                    Filtro: null,
                    Listado: null,
                    SAVE: null
                  },
                  Prestador3: {
                    Filtro: null,
                    Listado: null,
                    SAVE: null
                  },
                  Direccion1: {
                    Filtro: null,
                    Listado: null,
                    SAVE: null
                  },
                  Direccion2: {
                    Filtro: null,
                    Listado: null,
                    SAVE: null
                  },
                  Direccion3: {
                    Filtro: null,
                    Listado: null,
                    SAVE: null
                  }
                };

                $scope.HojaAnt_Soportes = [
                  {
                    NOMBRE: 'Copia Historia Clinica',
                    RUTA: response.data[0].CopiaHistoria_RUTA,
                    URL: null,
                    POS: 1
                  },
                  {
                    NOMBRE: 'Copia Documento del Afiliado',
                    RUTA: response.data[0].CopiaCedula_RUTA,
                    URL: null,
                    POS: 2
                  },
                  {
                    NOMBRE: 'Copia del Adres',
                    RUTA: response.data[0].CopiaAdres_RUTA,
                    URL: null,
                    POS: 3
                  },
                  {
                    NOMBRE: 'Copia de Solicitud de Servicio',
                    RUTA: response.data[0].CopiaSolicitudServicio_RUTA,
                    URL: null,
                    POS: 4
                  },
                  {
                    NOMBRE: 'Copia del Mipres',
                    RUTA: response.data[0].CopiaMipres_RUTA,
                    URL: null,
                    POS: 5
                  },
                  {
                    NOMBRE: 'Copia de la Cotizacion 1 - ' + response.data[0].Cotizacion1_NIT,
                    RUTA: response.data[0].Cotizacion1_RUTA,
                    URL: null,
                    POS: 6
                  },
                  {
                    NOMBRE: 'Cotizacion 1 - RUT y Cert. Bancaria',
                    RUTA: response.data[0].Cotizacion1_RUT_RUTA,
                    URL: null,
                    POS: 7
                  },
                  {
                    NOMBRE: 'Copia de la Cotizacion 2 - ' + response.data[0].Cotizacion2_NIT,
                    RUTA: response.data[0].Cotizacion2_RUTA,
                    URL: null,
                    POS: 8
                  },
                  {
                    NOMBRE: 'Cotizacion 2 - RUT y Cert. Bancaria',
                    RUTA: response.data[0].Cotizacion2_RUT_RUTA,
                    URL: null,
                    POS: 9
                  },
                  {
                    NOMBRE: 'Copia de la Cotizacion 3 - ' + response.data[0].Cotizacion3_NIT,
                    RUTA: response.data[0].Cotizacion3_RUTA,
                    URL: null,
                    POS: 10
                  },
                  {
                    NOMBRE: 'Cotizacion 3 - RUT y Cert. Bancaria',
                    RUTA: response.data[0].Cotizacion3_RUT_RUTA,
                    URL: null,
                    POS: 11
                  },
                  {
                    NOMBRE: 'Soporte al No Cumplimiento de las 3 Cotizaciones',
                    RUTA: response.data[0].Cotizacion4_RUTA,
                    URL: null,
                    POS: 12
                  },
                  {
                    NOMBRE: 'Soporte de Pago del anticipo',
                    RUTA: response.data[0].CopiaPagaduria_RUTA,
                    URL: null,
                    POS: 13
                  },
                  {
                    NOMBRE: 'Soporte de Prestación Efectiva',
                    RUTA: response.data[0].Soporte_PrestacionEfectiva_RUTA,
                    URL: null,
                    POS: 13
                  }
                ];
                //
                $scope.BusquedaAnt.Municipio.SAVE = response.data[0].MunicipioAtencion;
                $scope.BusquedaAnt.Producto.SAVE = response.data[0].Prod;
                $scope.BusquedaAnt.Diagnostico1.SAVE = response.data[0].Diagnostico1;
                $scope.BusquedaAnt.Diagnostico2.SAVE = response.data[0].Diagnostico2;
                $scope.BusquedaAnt.Prestador1.SAVE = response.data[0].Cotizacion1_NIT;
                $scope.BusquedaAnt.Prestador2.SAVE = response.data[0].Cotizacion2_NIT;
                $scope.BusquedaAnt.Prestador3.SAVE = response.data[0].Cotizacion3_NIT;
                $scope.BusquedaAnt.Direccion1.SAVE = response.data[0].Cotizacion1_DIR == '0' ? '' : response.data[0].Cotizacion1_DIR;
                $scope.BusquedaAnt.Direccion2.SAVE = response.data[0].Cotizacion2_DIR == '0' ? '' : response.data[0].Cotizacion2_DIR;
                $scope.BusquedaAnt.Direccion3.SAVE = response.data[0].Cotizacion3_DIR == '0' ? '' : response.data[0].Cotizacion3_DIR;
                //
                //$scope.Buscar_Prestador_Direccion = function (string, HOJA, COT, BUSQUEDA, DIR) {
                // if (response.data[0].Cotizacion1_COD && (response.data[0].Estado == 'D' || response.data[0].Status == 1)) { $scope.Buscar_Prestador_Direccion(response.data[0].Cotizacion1_COD, 'HojaAnt', 'Cotizacion_1', 'BusquedaAnt', 'Direccion1') }
                // if (response.data[0].Cotizacion2_COD && (response.data[0].Estado == 'D' || response.data[0].Status == 1)) { $scope.Buscar_Prestador_Direccion(response.data[0].Cotizacion2_COD, 'HojaAnt', 'Cotizacion_2', 'BusquedaAnt', 'Direccion2') }
                // if (response.data[0].Cotizacion3_COD && (response.data[0].Estado == 'D' || response.data[0].Status == 1)) { $scope.Buscar_Prestador_Direccion(response.data[0].Cotizacion3_COD, 'HojaAnt', 'Cotizacion_3', 'BusquedaAnt', 'Direccion3') }
                setTimeout(() => {
                  $scope.BusquedaAnt.Direccion1.Filtro = null;
                  $scope.BusquedaAnt.Direccion2.Filtro = null;
                  $scope.BusquedaAnt.Direccion3.Filtro = null;
                  setTimeout(() => { $scope.$apply(); }, 500);
                }, 1000);
                //
                if (response.data[0].Cumplimiento != '' && response.data[0].Cumplimiento != 'Nin' && response.data[0].Cumplimiento != null) {
                  $http({
                    method: 'POST',
                    url: "php/autorizaciones/anticipos/anticipos.php",
                    data: {
                      function: 'Obt_Tutelas_Anticipo',
                      Numero: response.data[0].Cumplimiento_NUM,
                    }
                  }).then(function (response) {
                    $scope.HojaAnt_Soportes_Tutela = response.data.TUTELA;
                    $scope.HojaAnt_Soportes_Tutela_Incidentes_Val = response.data.INCIDENTES;
                    $scope.HojaAnt_Soportes_Tutela_Seguimiento = response.data.SEGUIMIENTO;
                    if (response.data.INCIDENTES.length > 0) {
                      var groupBy = function (miarray, prop) {
                        return miarray.reduce(function (groups, item) {
                          var val = item[prop];
                          groups[val] = groups[val] || { INCIDENTE: item.INCIDENTE, LISTA: [] };
                          groups[val].LISTA = angular.copy(miarray.filter(function (el) {
                            return el.INCIDENTE == item.INCIDENTE;
                          }));
                          return groups;
                        }, {});
                      }
                      $scope.HojaAnt_Soportes_Tutela_Incidentes = groupBy($scope.HojaAnt_Soportes_Tutela_Incidentes_Val.filter(function (el) {
                        return el.INCIDENTE != -1;
                      }), 'INCIDENTE');
                    }
                  });
                }
                //Buscar Tutelas cuando lo tenga el ASISTENTE SECCIONAL DE AUTORIZACIONES EN ESTADO ACTIVO
                if (response.data[0].Status == 1 && response.data[0].Estado == 'A' && ($scope.Rol_Cargo == 26 || $scope.Rol_Cargo == 141 || $scope.Rol_Cargo == 22) && $scope.Rol_Cedula == $scope.HojaAnt.Info.Responsable) {
                  //TUTELAS
                  if (response.data[0].Cumplimiento != '' && response.data[0].Cumplimiento != 'Nin' && response.data[0].Cumplimiento != null && response.data[0].Cumplimiento_NUM != null) {
                    $http({
                      method: 'POST',
                      url: "php/autorizaciones/anticipos/anticipos.php",
                      data: {
                        function: 'Obt_Tutelas',
                        TipoDoc: response.data[0].TipoDoc,
                        NumeroDoc: response.data[0].NumeroDoc,
                      }
                    }).then(function (response) {
                      $scope.Array_CumplimientoAnt = null;
                      for (var x = 0; x < response.data.length; x++) {
                        $scope.HojaAnt.Afiliado.Count_Tutela++;
                        if (response.data[x].MEDIDA == 'S') {
                          $scope.HojaAnt.Afiliado.Count_Medida++;
                        }
                        if (response.data[x].INCIDENTE == 'S') {
                          $scope.HojaAnt.Afiliado.Count_Incidente++;
                        }
                        if (x == 0) {
                          $scope.Array_CumplimientoAnt =
                            [
                              {
                                CODIGO: response.data[x].CODIGO,
                                UBICACION: response.data[x].UBICACION,
                                TUTELA: 'S',
                                MEDIDA: response.data[x].MEDIDA,
                                INCIDENTE: response.data[x].INCIDENTE,
                                FECHA: response.data[x].FECHA,
                                ARCHIVO: response.data[x].ARCHIVO,
                              }
                            ];
                        } else {
                          $scope.Array_CumplimientoAnt.push(
                            {
                              CODIGO: response.data[x].CODIGO,
                              UBICACION: response.data[x].UBICACION,
                              TUTELA: 'S',
                              MEDIDA: response.data[x].MEDIDA,
                              INCIDENTE: response.data[x].INCIDENTE,
                              FECHA: response.data[x].FECHA,
                              ARCHIVO: response.data[x].ARCHIVO,
                            }
                          );
                        }
                      }
                    });
                  }
                }
                // HojaAnticipo_Pert_Ver
                $scope.StepCSSTabs(response.data[0].Status, response.data[0].Estado);
                if (response.data[0].Estado.toString().toUpperCase() != 'X' && response.data[0].Estado.toString().toUpperCase() != 'P') {
                  $scope.Cargar_Anticipo_Botones(response.data[0].Status, response.data[0].Estado);
                }
                // NgChange Cumplimiento
                $scope.Control = 0;
                // Valor_Total readonly
                document.querySelector('#HojaAnt_Valor_Total').setAttribute("readonly", true);
                ////////////////////Ajuste Mayo////////////////////
                //$scope.Ajuste_Mayo_D_S = 'Sub';
                // $scope.Ajuste_Mayo = new Date('2021/05/01');
                // $scope.Ajuste_Julio = new Date('2021/07/22');
                // $scope.Ajuste_Septiembre = new Date('2021/09/29');
                // var FECHA_PROCESADO = new Date(response.data[0].Fecha_Procesado);
                // $scope.Ajuste_Mayo_D_S = 'Sub';

                // if (FECHA_PROCESADO < $scope.Ajuste_Mayo && (response.data[0].Estado == 'A' || response.data[0].Estado == 'P')) {
                //   $scope.Ajuste_Mayo_D_S = 'Dir';
                // }
                // if (FECHA_PROCESADO >= $scope.Ajuste_Julio && (response.data[0].Estado == 'A' || response.data[0].Estado == 'P')) {
                //   $scope.Ajuste_Mayo_D_S = 'Dir';
                // }
                // if (FECHA_PROCESADO >= $scope.Ajuste_Septiembre && (response.data[0].Estado == 'A' || response.data[0].Estado == 'P')) {
                //   $scope.Ajuste_Mayo_D_S = 'Sub';
                // }


                // if (FECHA_PROCESADO < $scope.Ajuste_Julio && FECHA_PROCESADO >= $scope.Ajuste_Mayo && (response.data[0].Estado == 'A' || response.data[0].Estado == 'P'))  {
                //   $scope.Ajuste_Mayo_D_S = 'Sub';
                // }
                //console.log($scope.Ajuste_Mayo_D_S)

                if (response.data[0].Status == 11 && $scope.Rol_Cargo == 286) {
                  $scope.HojaAnt_Botones_Prestacion_Efectiva = true;
                }

              } else {
                swal({
                  title: '¡Ocurrio un error!',
                  text: 'Se actualizará la página, si el error persiste por favor comunicarse con TIC Nacional.',
                  type: 'info',
                  showCancelButton: false,
                  allowOutsideClick: false,
                  timer: 4000
                }).catch(swal.noop);
                $timeout(function () {
                  location.reload();
                }, 5000);
              }
            }
          });
        } else {
          swal({
            title: '¡No tiene permisos para ver esta información!',
            type: 'info'
          }).catch(swal.noop);
        }
      }

      $scope.Cargar_Anticipo_Botones = function (X, E) {
        ///////////////////OJO ELIMINAR EL 22 ASISTENTE NACIONAL TIC///////////////////
        if (X == 1 && ($scope.Rol_Cargo == 141 || $scope.Rol_Cargo == 26 || $scope.Rol_Cargo == 34)) {
          if ($scope.Rol_Cedula == $scope.HojaAnt.Info.Responsable) {
            $scope.HojaAnt_Botones = true;
          }
        }
        if (X == 2 && $scope.Rol_Cargo == 34) {
          $scope.HojaAnt_Botones = true;
        }
        if (X == 3 && ($scope.Rol_Cargo == 82 || ($scope.Rol_Ubicacion_Subdirector != null && ($scope.Rol_Cargo == 117 || $scope.Rol_Cargo == 118 || $scope.Rol_Cargo == 96 || $scope.Rol_Cargo == 97 || $scope.Rol_Cargo == 98 || $scope.Rol_Cargo == 99 || $scope.Rol_Cargo == 100 || $scope.Rol_Cargo == 101)))) {
          $scope.HojaAnt_Botones = true;
        }
        if (X == 3 && $scope.Rol_Cedula == 19582496 && $scope.HojaAnt.Info.Ubicacion_Cod == 23001) {
          $scope.HojaAnt_Botones = true;
        }
        if (X == 4 && $scope.Rol_Cargo == 6) {
          $scope.HojaAnt_Botones = true;
        }
        if (X == 5 && $scope.Rol_Cargo == 87) {
          $scope.HojaAnt_Botones = true;
        }
        if (X == 6 && $scope.Rol_Cargo == 70) {
          $scope.HojaAnt_Botones = true;
        }
        if (X == 7 && $scope.Rol_Cargo == 101) {
          $scope.HojaAnt_Botones = true;
        }
        if (X == 8 && $scope.Rol_Cargo == 83) {
          $scope.HojaAnt_Botones = true;
        }
        if (E == 'D' && ($scope.Rol_Cargo == 26 || $scope.Rol_Cargo == 34)) {
          if ($scope.Rol_Cedula == $scope.HojaAnt.Info.Responsable) {
            $scope.HojaAnt_Botones = true;
          }
        }
        if (X == 9 && $scope.Rol_Cargo == 14) {
          $scope.HojaAnt_Botones_Pagaduria = true;
        }
        if (X == 10 && $scope.Rol_Cargo == 6) {
          $scope.HojaAnt_Botones_Pagaduria = true;
        }

      }

      $scope.H1VerSoportes_Anticipo = function (x, index, SCOPE, y) {
        if (SCOPE != 'HojaAnt_Soportes_Tutela_Incidentes') {
          if (x.URL == null) {
            $scope.Descargafile_Soportes(x, index, SCOPE);
          } else {
            if ($scope.HojaAnt.Info.UrlSoporte != x.URL) {
              $scope.HojaAnt.Info.UrlSoporte = x.URL;
              $scope.HojaAnt.Info.UrlSoporte_Nombre = x.NOMBRE;
            } else {
              $scope.HojaAnt.Info.UrlSoporte = x.URL;
              $scope.HojaAnt.Info.UrlSoporte_Nombre = x.NOMBRE;
            }
          }
        } else {
          if ($scope.HojaAnt_Soportes_Tutela_Incidentes[y.INCIDENTE].LISTA[index].URL == null) {
            $scope.Descargafile_Soportes(x, index, SCOPE, y);
          } else {
            if ($scope.HojaAnt.Info.UrlSoporte != $scope.HojaAnt_Soportes_Tutela_Incidentes[y.INCIDENTE].LISTA[index].URL) {
              $scope.HojaAnt.Info.UrlSoporte = $scope.HojaAnt_Soportes_Tutela_Incidentes[y.INCIDENTE].LISTA[index].URL;
              $scope.HojaAnt.Info.UrlSoporte_Nombre = $scope.HojaAnt_Soportes_Tutela_Incidentes[y.INCIDENTE].LISTA[index].NOMBRE;
            } else {
              $scope.HojaAnt.Info.UrlSoporte = $scope.HojaAnt_Soportes_Tutela_Incidentes[y.INCIDENTE].LISTA[index].URL;
              $scope.HojaAnt.Info.UrlSoporte_Nombre = $scope.HojaAnt_Soportes_Tutela_Incidentes[y.INCIDENTE].LISTA[index].NOMBRE;
            }
          }
        }
        $timeout(function () {
          $('#Girar_Img').removeClass('rotate90');
          $('#Girar_Img').removeClass('rotate180');
          $('#Girar_Img').removeClass('rotate270');
          $scope.angel = 0;
          var x = $scope.HojaAnt.Info.UrlSoporte.split('?')[0].split(/\.(?=[^\.]+$)/);
          $scope.HojaAnt_Info_UrlSoporte_Tipo = x[x.length - 1].toUpperCase();
        }, 300);
      }

      $scope.Listar_Motivos_Anulacion = function () {
        $http({
          method: 'POST',
          url: "php/autorizaciones/anticipos/anticipos.php",
          data: {
            function: 'Listar_Motivos_Anulacion'
          }
        }).then(function (response) {
          $scope.Listado_Motivos_Anulacion = response.data;
        });
      }

      $scope.H1Actualizar_Anticipo = function (estado) {
        var xArray = [];
        $scope.Listado_Motivos_Anulacion.forEach(e => {
          xArray.push({
            id: e.CODIGO,
            name: e.NOMBRE
          });
        });

        var options = {};
        $.map(xArray,
          function (o) {
            options[o.id] = o.name;
          });
        swal({
          title: 'Seleccione el motivo de ' + ((estado == 'AN') ? 'Anulación' : 'Devolución'),
          input: 'select',
          inputOptions: options,
          inputPlaceholder: 'Seleccionar',
          showCancelButton: true,
          allowOutsideClick: false,
          width: 'auto',
          inputValidator: function (value) {
            return new Promise(function (resolve, reject) {
              if (value !== '') {
                resolve();
              } else {
                swal.close();
              }
            })
          }
        }).then(function (result_cod) {
          if (result_cod) {
            swal({
              title: 'Observacion de ' + ((estado == 'AN') ? 'Anulación' : 'Devolución'),
              input: 'textarea',
              inputPlaceholder: 'Escribe un comentario...',
              showCancelButton: true,
              allowOutsideClick: false,
              inputValue: $scope.Motivo_Anulacion_Devolucion
            }).then(function (result) {
              result = result.replace(/[|!¡¿?°"#%{}*&''`´¨<>]/g, '');
              result = result.replace(/(\r\n|\n|\r)/g, ' ');
              result = result.replace(/[\t\n]+/g, ' ');
              result = result.toString().toUpperCase();
              if (result !== '' && result.length >= 20 && result.length < 500) {

                var xdata = {
                  Afi_TipoDoc: $scope.HojaAnt.Afiliado.TipoDoc,
                  Afi_NumeroDoc: $scope.HojaAnt.Afiliado.NumeroDoc,
                  Ant_Ubicacion: $scope.HojaAnt.Info.Ubicacion_Cod,
                  Ant_Status: ($scope.HojaAnt.Info.Estado == 'D') ? '1' : $scope.HojaAnt.Info.Status,
                  Ant_Accion: estado,
                  Ant_Motivo: result.toString().replace(/\n|\r/g, " "),
                  cod_observacion: result_cod,
                  Func_Rol_Cedula: $scope.Rol_Cedula,
                  Func_Rol_Ubi_COD: $scope.Rol_Ubicacion,
                  Func_Rol_Cargo: $scope.Rol_Cargo,
                };
                swal({
                  title: "¿Está seguro que desea " + ((estado == 'AN') ? 'Anular' : 'Devolver') + " este anticipo?",
                  type: "question",
                  showCancelButton: true,
                  allowOutsideClick: false
                }).catch(swal.noop)
                  .then((willDelete) => {
                    if (willDelete) {
                      //
                      swal({ title: 'Cargando...', allowOutsideClick: false });
                      swal.showLoading();
                      $http({
                        method: 'POST',
                        url: "php/autorizaciones/anticipos/anticipos.php",
                        data: {
                          function: 'H1Actualizar_Anticipo',
                          Numero: $scope.HojaAnt.Info.Consecutivo.toString(),
                          xdata: JSON.stringify(xdata)
                        }
                      }).then(function (response) {
                        if (response.data.codigo != undefined) {
                          if (response.data.codigo == 1) {
                            swal({
                              title: "Mensaje",
                              text: response.data.mensaje,
                              type: "warning",
                            }).catch(swal.noop);
                          } else {
                            swal({
                              title: response.data.mensaje,
                              type: "success",
                            }).catch(swal.noop);
                            $timeout(function () {
                              $scope.Motivo_Anulacion_Devolucion = '';
                              $scope.HojaAnticipo = false;
                            }, 1000);
                            $timeout(function () {
                              $scope.Listar_Solicitudes();
                            }, 1500);
                          }
                        }
                      });
                    } else {
                    }
                  });
                $scope.Motivo_Anulacion_Devolucion = result;
              } else {
                Materialize.toast('El comentario debe contener al menos 20 caracteres y menos de 500!', 1000);
                $scope.Motivo_Anulacion_Devolucion = result;
              }
            }).catch(swal.noop);

          }

        }).catch(swal.noop);
      }

      $scope.antes_H1Actualizar_Anticipo_Cargo4 = function (estado) {
        return new Promise((resolve) => {
          if (estado == 'AN') { resolve('X'); resolve(false); return; }
          var xArray = []
          for (let i = 0; i < $scope.HojaAnt.Info.Status - 1; i++) {
            // $scope.listadoEtapas
            if ($scope.listadoEtapas[i].ver != false) {
              xArray.push({
                cod: $scope.listadoEtapas[i].cod,
                cargo: $scope.listadoEtapas[i].cargo
              });
            }
          }

          var options = {};
          $.map(xArray,
            function (o) {
              options[o.cod] = o.cargo;
            });
          // console.log(options);

          swal({
            title: 'Seleccione la etapa que desea devolverlo',
            input: 'select',
            inputOptions: options,
            inputPlaceholder: 'Seleccionar',
            showCancelButton: true,
            allowOutsideClick: false,
            width: 'auto',
            inputValidator: function (value) {
              return new Promise(function (resolve, reject) {
                if (value !== '') {
                  resolve();
                } else {
                  swal.close();
                }
              })
            }
          }).then(function (result_cod) {
            if (result_cod) {
              resolve(result_cod);
            } else {
              resolve(false);
            }
          });
          // $scope.listadoEtapas = [
          //   { cod: 0, cargo: "Asistente Seccional De Autorizaciones" },
          //   { cod: 1, cargo: "Auditor Médico Seccional" },
          //   { cod: 2, cargo: "Coordinador Seccional" },
          //   { cod: 3, cargo: "Asistente Nacional De Autorizaciones" },
          //   { cod: 4, cargo: "Especialista Nacional De Autorizaciones" },
          //   { cod: 5, cargo: "Coordinador Nacional De Autorizaciones" },
          //   { cod: 6, cargo: "Subdirector Nacional de Salud" },
          //   { cod: 7, cargo: "Subgerente General", ver: false },
          //   { cod: 8, cargo: "Asistente Nacional De Pagaduria" },
          // ];

          // resolve(false);
        });
      }

      $scope.H1Actualizar_Anticipo_Cargo4 = function (estado) {
        $scope.antes_H1Actualizar_Anticipo_Cargo4(estado).then((result_status) => {
          // console.log(result_status);
          if (result_status) {

            swal({
              title: 'Observacion de ' + ((estado == 'AN') ? 'Anulación' : 'Devolución'),
              input: 'textarea',
              inputPlaceholder: 'Escribe un comentario...',
              showCancelButton: true,
              allowOutsideClick: false,
              inputValue: $scope.Motivo_Anulacion_Devolucion
            }).then(function (result) {
              result = result.replace(/[|!¡¿?°"#%{}*&''`´¨<>]/g, '');
              result = result.replace(/(\r\n|\n|\r)/g, ' ');
              result = result.replace(/[\t\n]+/g, ' ');
              result = result.toString().toUpperCase();
              if (result !== '' && result.length >= 20 && result.length < 500) {

                var xdata = {
                  Afi_TipoDoc: $scope.HojaAnt.Afiliado.TipoDoc,
                  Afi_NumeroDoc: $scope.HojaAnt.Afiliado.NumeroDoc,
                  Ant_Ubicacion: $scope.HojaAnt.Info.Ubicacion_Cod,
                  Ant_Status: (estado == 'AN') ? '1' : result_status,
                  Ant_Accion: estado,
                  Ant_Motivo: result.toString().replace(/\n|\r/g, " "),
                  Func_Rol_Cedula: $scope.Rol_Cedula,
                  Func_Rol_Cargo: $scope.Rol_Cargo,
                };
                swal({
                  title: "¿Está seguro que desea " + ((estado == 'AN') ? 'Anular' : 'Devolver') + " este anticipo?",
                  type: "question",
                  showCancelButton: true,
                  allowOutsideClick: false
                }).catch(swal.noop)
                  .then((willDelete) => {
                    if (willDelete) {
                      //
                      swal({ title: 'Cargando...', allowOutsideClick: false });
                      swal.showLoading();
                      $http({
                        method: 'POST',
                        url: "php/autorizaciones/anticipos/anticipos.php",
                        data: {
                          function: 'H1Actualizar_Anticipo_Cargo4',
                          Numero: $scope.HojaAnt.Info.Consecutivo.toString(),
                          xdata: JSON.stringify(xdata)
                        }
                      }).then(function (response) {
                        if (response.data.codigo != undefined) {
                          if (response.data.codigo == 1) {
                            swal({
                              title: "Mensaje",
                              text: response.data.mensaje,
                              type: "warning",
                            }).catch(swal.noop);
                          } else {
                            swal({
                              title: response.data.mensaje,
                              type: "success",
                            }).catch(swal.noop);
                            $timeout(function () {
                              $scope.Motivo_Anulacion_Devolucion = '';
                              $scope.HojaAnticipo = false;
                            }, 1000);
                            $timeout(function () {
                              $scope.Listar_Solicitudes();
                            }, 1500);
                          }
                        }
                      });
                    } else {
                    }
                  });
                $scope.Motivo_Anulacion_Devolucion = result;
              } else {
                Materialize.toast('El comentario debe contener al menos 20 caracteres y menos de 500!', 1000);
                $scope.Motivo_Anulacion_Devolucion = result;
              }
            }).catch(swal.noop);

          }
        })

      }

      $scope.H1Aprobar_Anticipo = function () {
        $scope.Cot_Recomendada = '';
        $scope.Cot_Elegida = '';
        if (($scope.HojaAnt.Info.Status == 1 || $scope.HojaAnt.Info.Estado == 'D') && ($scope.Rol_Cargo == 141 || $scope.Rol_Cargo == 26 || $scope.Rol_Cargo == 34)) {
          $scope.H1Aprobar_Anticipo_Edita();
        }
        if ($scope.HojaAnt.Info.Status == 2 && $scope.Rol_Cargo == 34) {
          if ($scope.Rol_Telefono != null && $scope.Rol_Telefono != undefined && $scope.Rol_Telefono != '') {
            $scope.H1Aprobar_Anticipo_Firma_Pert();
          } else {
            swal({
              title: '¡No es posible realizar esta acción!',
              text: 'Debe tener registrado su número de telefono en el sistema.',
              showCancelButton: false,
              allowOutsideClick: false,
              timer: 2000
            }).catch(swal.noop);
          }
        }

        if ($scope.Rol_Cargo == 82 || $scope.Rol_Cargo == 87 || $scope.Rol_Cargo == 83 || ($scope.HojaAnt.Info.Status == 3 && $scope.Rol_Cedula == 19582496 && $scope.HojaAnt.Info.Ubicacion_Cod == 23001)) {
          if ($scope.Rol_Telefono != null && $scope.Rol_Telefono != undefined && $scope.Rol_Telefono != '') {
            $scope.Inicio_Telefono_Firma('H1Aprobar_Anticipo_Firma');
          } else {
            swal({
              title: '¡No es posible realizar esta acción!',
              text: 'Debe tener registrado su número de telefono en el sistema.',
              showCancelButton: false,
              allowOutsideClick: false,
              timer: 2000
            }).catch(swal.noop);
          }
        }
        if ($scope.Rol_Cargo == 70) {
          if ($scope.Rol_Telefono != null && $scope.Rol_Telefono != undefined && $scope.Rol_Telefono != '') {
            var xFechaOrden = $scope.HojaPer.Fecha_OrdenMed;
            var Fecha_OrdenMed = xFechaOrden.getUTCDate() + '-' + (((xFechaOrden.getMonth() + 1) < 10) ? '0' + (xFechaOrden.getMonth() + 1) : (xFechaOrden.getMonth() + 1)) + '-' + xFechaOrden.getFullYear();
            var xdata = {
              Afi_TipoDoc: $scope.HojaAnt.Afiliado.TipoDoc,
              Afi_NumeroDoc: $scope.HojaAnt.Afiliado.NumeroDoc,
              Fecha_OrdenMed: Fecha_OrdenMed
            }
            $http({
              method: 'POST',
              url: "php/autorizaciones/anticipos/anticipos.php",
              data: {
                function: 'P_VALIDA_FRECUENCIA_POR_USUARIO',
                Numero: $scope.HojaAnt.Info.Consecutivo.toString(),
                xdata: JSON.stringify(xdata),
                signature: 'xxx'
              }
            }).then(function (response) {
              if (response.data.codigo != 0) {
                if (response.data.codigo == 4) {
                  swal({
                    title: response.data.Nombre,
                    text: 'Error De frecuencia, debe seleccionar motivo y observacion para levantar la frecuencia',
                    type: "info",
                    showCancelButton: false,
                    allowOutsideClick: false,
                    width: 'auto',
                  }).then(function (result) {
                    if (result) {
                      $scope.Levante_Motivo_Frecuencia(response.data.Producto);
                    }
                  });
                } else {
                  swal({
                    title: "Ocurrio un error",
                    text: response.data.Nombre,
                    type: "warning",
                    showCancelButton: false
                  })
                }
              } else {
                $scope.H1Aprobar_Anticipo_Elegir_Cot();
              }
            });
          } else {
            swal({
              title: '¡No es posible realizar esta acción!',
              text: 'Debe tener registrado su número de telefono en el sistema.',
              showCancelButton: false,
              allowOutsideClick: false,
              timer: 2000
            }).catch(swal.noop);
          }
        }
        if ($scope.Rol_Cargo == 101 && ($scope.Rol_Ubicacion_Subdirector == null || $scope.Rol_Ubicacion_Subdirector == '')) {
          if ($scope.Rol_Telefono != null && $scope.Rol_Telefono != undefined && $scope.Rol_Telefono != '') {
            $scope.H1Aprobar_Anticipo_Elegir_Cot();
          } else {
            swal({
              title: '¡No es posible realizar esta acción!',
              text: 'Debe tener registrado su número de telefono en el sistema.',
              showCancelButton: false,
              allowOutsideClick: false,
              timer: 2000
            }).catch(swal.noop);
          }
        }
        if ($scope.Rol_Ubicacion_Subdirector != null && $scope.HojaAnt.Info.Status == 3 && ($scope.Rol_Cargo == 117 || $scope.Rol_Cargo == 118 || $scope.Rol_Cargo == 96 || $scope.Rol_Cargo == 97 || $scope.Rol_Cargo == 98 || $scope.Rol_Cargo == 99 || $scope.Rol_Cargo == 100 || $scope.Rol_Cargo == 101)) {
          if ($scope.Rol_Telefono != null && $scope.Rol_Telefono != undefined && $scope.Rol_Telefono != '') {
            $scope.Inicio_Telefono_Firma('H1Aprobar_Anticipo_Firma');
          } else {
            swal({
              title: '¡No es posible realizar esta acción!',
              text: 'Debe tener registrado su número de telefono en el sistema.',
              showCancelButton: false,
              allowOutsideClick: false,
              timer: 2000
            }).catch(swal.noop);
          }
        }


        if ($scope.Rol_Cargo == 6 && $scope.HojaAnt.Info.Status == 4) {
          $scope.H1Aprobar_Anticipo_No_Firma();
        }
      }

      $scope.H1Aprobar_Anticipo_Edita = function () {
        if ($scope.Rol_Cedula == $scope.HojaAnt.Info.Responsable) {
          var Campos_Empty = false;
          var Vista_Empty = 0;
          var Validar_Campos = [
            $scope.Validar_CamposVacios('HojaAnt', 'BusquedaAnt'),
          ];
          $q.all(Validar_Campos).then(function (resultado) {
            Campos_Empty = resultado[0].campo;
            Vista_Empty = resultado[0].vista;
            var Historia = '', Cedula = '', Adres = '', Servicio = '', Mipres = '', Cotizacion1 = '', Rut1 = '', Cotizacion2 = '', Rut2 = '', Cotizacion3 = '', Rut3 = '', Just = '';
            angular.forEach($scope.HojaAnt_Soportes, function (x) {
              if (x.POS == 1) {
                Historia = x.RUTA.split('/')[7].split(/\.(?=[^\.]+$)/)[0];
              }
              if (x.POS == 2) {
                if (x.RUTA.search("Anticipos") != -1) {
                  Cedula = x.RUTA.split('/')[7].split(/\.(?=[^\.]+$)/)[0];
                }
              }
              if (x.POS == 3) {
                if (x.RUTA.search("Anticipos") != -1) {
                  Adres = x.RUTA.split('/')[7].split(/\.(?=[^\.]+$)/)[0];
                }
              }
              if (x.POS == 4) {
                Servicio = x.RUTA.split('/')[7].split(/\.(?=[^\.]+$)/)[0];
              }
              if (x.POS == 5) {
                if (x.RUTA != null && x.RUTA != '') {
                  Mipres = x.RUTA.split('/')[7].split(/\.(?=[^\.]+$)/)[0];
                }
              }
              if (x.POS == 6) {
                if (x.RUTA != null && x.RUTA != '') {
                  Cotizacion1 = x.RUTA.split('/')[7].split(/\.(?=[^\.]+$)/)[0];
                }
              }
              if (x.POS == 7) {
                if (x.RUTA != null && x.RUTA != '') {
                  Rut1 = x.RUTA.split('/')[7].split(/\.(?=[^\.]+$)/)[0];
                }
              }
              if (x.POS == 8) {
                if (x.RUTA != null && x.RUTA != '') {
                  Cotizacion2 = x.RUTA.split('/')[7].split(/\.(?=[^\.]+$)/)[0];
                }
              }
              if (x.POS == 9) {
                if (x.RUTA != null && x.RUTA != '') {
                  Rut2 = x.RUTA.split('/')[7].split(/\.(?=[^\.]+$)/)[0];
                }
              }
              if (x.POS == 10) {
                if (x.RUTA != null && x.RUTA != '') {
                  Cotizacion3 = x.RUTA.split('/')[7].split(/\.(?=[^\.]+$)/)[0];
                }
              }
              if (x.POS == 11) {
                if (x.RUTA != null && x.RUTA != '') {
                  Rut3 = x.RUTA.split('/')[7].split(/\.(?=[^\.]+$)/)[0];
                }
              }
              if (x.POS == 12) {
                if (x.RUTA != null && x.RUTA != '') {
                  Just = x.RUTA.split('/')[7].split(/\.(?=[^\.]+$)/)[0];
                }
              }
            });
            if (Campos_Empty == false) {
              swal({
                title: "¿Está seguro que desea aprobar este anticipo?",
                text: "¿Acepta que verificó y validó el anticipo y sus soportes?, Tenga en cuenta que si adjunto archivos, estos se remplazarán por los ya existentes.",
                type: "question",
                showCancelButton: true,
                allowOutsideClick: false
              }).catch(swal.noop)
                .then((willDelete) => {
                  if (willDelete) {
                    //
                    swal({ title: 'Cargando...', allowOutsideClick: false });
                    swal.showLoading();
                    var xFecha = $scope.HojaAnt.Servicio.FechaRadicacion;
                    var FechaRadicacion = xFecha.getUTCDate() + '/' + (((xFecha.getMonth() + 1) < 10) ? '0' + (xFecha.getMonth() + 1) : (xFecha.getMonth() + 1)) + '/' + xFecha.getFullYear();
                    var xdata = null, xdata_serpro = [];
                    xdata = {
                      Afi_TipoDoc: $scope.HojaAnt.Afiliado.TipoDoc,
                      Afi_NumeroDoc: $scope.HojaAnt.Afiliado.NumeroDoc,
                      Afi_Sexo: $scope.HojaAnt.Afiliado.Sexo.substr(0, 1),
                      Afi_Edad: $scope.HojaAnt.Afiliado.EdadDias,
                      Ser_Prod_Cod: $scope.HojaAnt.Servicio.Prod_Cod,
                      Ser_Ips_Solicitante_Cod: $scope.HojaAnt.Servicio.Ips_Solicitante_Cod,
                      Ser_Diagnostico1_Cod: $scope.HojaAnt.Servicio.Diagnostico1_Cod,
                      Ser_Diagnostico2_Cod: $scope.HojaAnt.Servicio.Diagnostico2_Cod,
                      Fecha_Orden: FechaRadicacion
                    }

                    $scope.HojaAnt.Servicio.Array.forEach(e => {
                      xdata_serpro.push({
                        "SERVICIO": e.SERVICIO, "PRODUCTO": e.PRODUCTO, "CANTIDAD": e.CANTIDAD, "VALOR": e.VALOR.toString(),
                        "TIPOAUT": e.TIPOAUT, "UBICACIONAUT": e.UBICACIONAUT
                      });
                    });

                    $http({
                      method: 'POST',
                      url: "php/autorizaciones/anticipos/anticipos.php",
                      data: {
                        function: 'Antes_De_Inserta_Anticipo',
                        xdata: JSON.stringify(xdata),
                        xdata_serpro: JSON.stringify(xdata_serpro),
                        Numero: $scope.HojaAnt.Info.Consecutivo.toString(),
                        cantidad: xdata_serpro.length
                      }
                    }).then(function (response) {
                      if (response.data.codigo != undefined) {
                        if (response.data.codigo == 4 && $scope.HojaAnt_Advertencias.length == 0) {
                          $scope.HojaAnt_Advertencias = response.data.mensaje;
                          setTimeout(() => { $scope.$apply(); }, 1000);
                          swal({
                            title: "Por favor, revisar las advertencias",
                            type: "warning",
                          }).catch(swal.noop);
                        } else {
                          if (response.data.codigo == 0 || response.data.codigo == 4) {
                            // ---------------------
                            var Subir_Soportes = [
                              $scope.Cargar_Soporte_FTPAnt('Soportes', 'CopiaHistoria_B64', 'Historia_Clinica', 'CopiaHistoria_RUTA', Historia),
                              $scope.Cargar_Soporte_FTPAnt('Soportes', 'CopiaCedula_B64', 'Fotopocia_Doc_Identidad', 'CopiaCedula_RUTA', Cedula),
                              $scope.Cargar_Soporte_FTPAnt('Soportes', 'CopiaAdres_B64', 'Fotocopia_Adres', 'CopiaAdres_RUTA', Adres),
                              $scope.Cargar_Soporte_FTPAnt('Soportes', 'CopiaSolicitudServicio_B64', 'Solicitud_Servicio_Medico', 'CopiaSolicitudServicio_RUTA', Servicio),
                              $scope.Cargar_Soporte_FTPAnt('Soportes', 'CopiaMipres_B64', 'Formato_Mipres', 'CopiaMipres_RUTA', Mipres),
                              $scope.Cargar_Soporte_FTPAnt('Cotizacion_1', 'Cotizacion_B64', 'Cotizacion_1', 'Cotizacion1_RUTA', Cotizacion1),
                              $scope.Cargar_Soporte_FTPAnt('Cotizacion_1', 'RUT_CertBancaria_B64', 'Cotizacion_1_RUT', 'Cotizacion1_RUT_RUTA', Rut1),
                              $scope.Cargar_Soporte_FTPAnt('Cotizacion_2', 'Cotizacion_B64', 'Cotizacion_2', 'Cotizacion2_RUTA', Cotizacion2),
                              $scope.Cargar_Soporte_FTPAnt('Cotizacion_2', 'RUT_CertBancaria_B64', 'Cotizacion_2_RUT', 'Cotizacion2_RUT_RUTA', Rut2),
                              $scope.Cargar_Soporte_FTPAnt('Cotizacion_3', 'Cotizacion_B64', 'Cotizacion_3', 'Cotizacion3_RUTA', Cotizacion3),
                              $scope.Cargar_Soporte_FTPAnt('Cotizacion_3', 'RUT_CertBancaria_B64', 'Cotizacion_3_RUT', 'Cotizacion3_RUT_RUTA', Rut3),
                              $scope.Cargar_Soporte_FTPAnt('Cotizacion_4', 'Cotizacion_B64', 'Cotizacion_4_Justificacion', 'Cotizacion4_RUTA', Just)
                            ];
                            $q.all(Subir_Soportes).then(function (resultado2) {
                              var Archivos_Error = false;
                              for (var x = 0; x < resultado2.length; x++) {
                                if ((resultado2[x] != null && resultado2[x].substr(0, 3) == '<br') || resultado2[x].substr(0, 1) == '0') {
                                  Archivos_Error = true;
                                  swal({
                                    title: '¡Error al subir un archivo!',
                                    text: 'Nota: Si el error persiste, por favor actualizar la página (CONTROL + F5).',
                                    type: 'warning'
                                  }).catch(swal.noop);
                                }
                              }
                              if (Archivos_Error == false) {
                                $scope.H1Aprobar_Anticipo_Edita_Subir();
                              }
                            });
                            // ---------------------
                          } else {
                            swal({
                              title: "Mensaje",
                              text: response.data.mensaje,
                              type: "warning",
                            }).catch(swal.noop);
                          }
                        }
                      }
                    });

                  }
                });
            } else {
              if (Vista_Empty == 2) {
                swal({
                  title: '¡Información!',
                  text: 'El valor del anticipo debe ser mayor a $200.000.',
                  type: 'info'
                }).catch(swal.noop);
              } else {
                Materialize.toast('¡Campos vacios o invalidos!', 3000);
              }
            }
          });
        }
      }
      $scope.Cargar_Soporte_FTPAnt = function (SOPORTE, BASE, NAME, RUTA, VAL) {
        var defered = $q.defer();
        var promise = defered.promise;
        if (VAL == '') {
          if ($scope.HojaAnt[SOPORTE][BASE] != '') {
            var carpeta = $scope.HojaAnt.Afiliado.TipoDoc + '_' + $scope.HojaAnt.Afiliado.NumeroDoc;
            $http({
              method: 'POST',
              url: "php/autorizaciones/anticipos/anticipos_Subir.php",
              data: {
                function: 'Upload',
                base: $scope.HojaAnt[SOPORTE][BASE],
                name: NAME,
                carpeta: carpeta
              }
            }).then(function (response) {
              $scope.HojaAnt.Soportes[RUTA] = response.data;
              defered.resolve(response.data);
            });
          } else {
            defered.resolve($scope.HojaAnt.Soportes[RUTA]);
          }
        } else {
          if ($scope.HojaAnt[SOPORTE][BASE] != '') {
            var carpeta = $scope.HojaAnt.Afiliado.TipoDoc + '_' + $scope.HojaAnt.Afiliado.NumeroDoc;
            $http({
              method: 'POST',
              url: "php/autorizaciones/anticipos/anticipos_Subir.php",
              data: {
                function: 'Upload_Ant',
                base: $scope.HojaAnt[SOPORTE][BASE],
                name: VAL,
                carpeta: carpeta
              }
            }).then(function (response) {
              $scope.HojaAnt.Soportes[RUTA] = response.data;
              defered.resolve(response.data);
            });
          } else {
            defered.resolve($scope.HojaAnt.Soportes[RUTA]);
          }
        }
        return promise;
      }
      $scope.H1Aprobar_Anticipo_Edita_Subir = function () {
        ///////////////////////////////////////////////////////////////////////////
        var xFecha = $scope.HojaAnt.Servicio.FechaRadicacion;
        var FechaRadicacion = xFecha.getFullYear() + '-' + (((xFecha.getMonth() + 1) < 10) ? '0' + (xFecha.getMonth() + 1) : (xFecha.getMonth() + 1)) + '-' + xFecha.getUTCDate();
        var xdata = null, xdata_serpro = [];
        xdata = {
          Afi_TipoDoc: $scope.HojaAnt.Afiliado.TipoDoc,
          Afi_NumeroDoc: $scope.HojaAnt.Afiliado.NumeroDoc,
          Afi_MunicipioAtencion: $scope.HojaAnt.Afiliado.MunicipioAtencion_Cod,
          //Afi_OpPBS: '0',
          Afi_OpPBS: ($scope.HojaAnt.Afiliado.OpPBS == false) ? '0' : '1',
          Afi_NumMipres: ($scope.HojaAnt.Afiliado.OpPBS == false) ? '' : $scope.HojaAnt.Afiliado.NumMipres,
          Afi_Deficit: $scope.HojaAnt.Afiliado.Deficit,
          Afi_Cumplimiento: $scope.HojaAnt.Afiliado.Cumplimiento,
          Afi_Cumplimiento_NUM: ($scope.HojaAnt.Afiliado.Cumplimiento == 'Nin') ? '' : $scope.HojaAnt.Afiliado.Cumplimiento_NUM,
          Afi_Observacion: $scope.HojaAnt.Servicio.Observacion,
          Ser_Tipo: $scope.HojaAnt.Servicio.Tipo,
          Ser_Marca_Referencia: $scope.HojaAnt.Servicio.Marca_Referencia,
          Ser_FechaRadicacion: FechaRadicacion,
          Ser_Ips_Solicitante_Cod: $scope.HojaAnt.Servicio.Ips_Solicitante_Cod,
          Ser_Diagnostico1_Cod: $scope.HojaAnt.Servicio.Diagnostico1_Cod,
          Ser_Diagnostico2_Cod: $scope.HojaAnt.Servicio.Diagnostico2_Cod,
          Ser_Descripcion: $scope.HojaAnt.Servicio.Descripcion.toUpperCase(),
          Ser_Justificacion: $scope.HojaAnt.Servicio.Justificacion.toUpperCase(),
          Sop_CopiaHistoria_URL: $scope.HojaAnt.Soportes.CopiaHistoria_RUTA,
          Sop_CopiaCedula_URL: $scope.HojaAnt.Soportes.CopiaCedula_RUTA,
          Sop_CopiaAdres_URL: $scope.HojaAnt.Soportes.CopiaAdres_RUTA,
          Sop_CopiaMipres_URL: $scope.HojaAnt.Soportes.CopiaMipres_RUTA,
          Sop_CopiaSolicitudServicio_URL: $scope.HojaAnt.Soportes.CopiaSolicitudServicio_RUTA,

          Sop_Cotizacion1_URL: $scope.HojaAnt.Soportes.Cotizacion1_RUTA,
          Sop_Cotizacion1_NIT_COD: $scope.HojaAnt.Cotizacion_1.Cotizacion_NIT_COD,
          Sop_Cotizacion1_BANCO: $scope.HojaAnt.Cotizacion_1.Banco,
          Sop_Cotizacion1_CUENTANOM: $scope.HojaAnt.Cotizacion_1.CuentaNom,
          Sop_Cotizacion1_NUMEROCUENTA: $scope.HojaAnt.Cotizacion_1.NumeroCuenta,
          Sop_Cotizacion1_TIPOCUENTA: $scope.HojaAnt.Cotizacion_1.TipoCuenta,
          Sop_Cotizacion1_MEDIOPAGO: $scope.HojaAnt.Cotizacion_1.MedioPago,
          Sop_Cotizacion1_RUT_URL: $scope.HojaAnt.Soportes.Cotizacion1_RUT_RUTA,
          Sop_Cotizacion1_DIR: $scope.HojaAnt.Cotizacion_1.Cotizacion_DIR_COD,

          Sop_Cotizacion2_URL: $scope.HojaAnt.Soportes.Cotizacion2_RUTA,
          Sop_Cotizacion2_NIT_COD: $scope.HojaAnt.Cotizacion_2.Cotizacion_NIT_COD,
          Sop_Cotizacion2_BANCO: $scope.HojaAnt.Cotizacion_2.Banco,
          Sop_Cotizacion2_CUENTANOM: $scope.HojaAnt.Cotizacion_2.CuentaNom,
          Sop_Cotizacion2_NUMEROCUENTA: $scope.HojaAnt.Cotizacion_2.NumeroCuenta,
          Sop_Cotizacion2_TIPOCUENTA: $scope.HojaAnt.Cotizacion_2.TipoCuenta,
          Sop_Cotizacion2_MEDIOPAGO: $scope.HojaAnt.Cotizacion_2.MedioPago,
          Sop_Cotizacion2_RUT_URL: $scope.HojaAnt.Soportes.Cotizacion2_RUT_RUTA,
          Sop_Cotizacion2_DIR: $scope.HojaAnt.Cotizacion_2.Cotizacion_DIR_COD,

          Sop_Cotizacion3_URL: $scope.HojaAnt.Soportes.Cotizacion3_RUTA,
          Sop_Cotizacion3_NIT_COD: $scope.HojaAnt.Cotizacion_3.Cotizacion_NIT_COD,
          Sop_Cotizacion3_BANCO: $scope.HojaAnt.Cotizacion_3.Banco,
          Sop_Cotizacion3_CUENTANOM: $scope.HojaAnt.Cotizacion_3.CuentaNom,
          Sop_Cotizacion3_NUMEROCUENTA: $scope.HojaAnt.Cotizacion_3.NumeroCuenta,
          Sop_Cotizacion3_TIPOCUENTA: $scope.HojaAnt.Cotizacion_3.TipoCuenta,
          Sop_Cotizacion3_MEDIOPAGO: $scope.HojaAnt.Cotizacion_3.MedioPago,
          Sop_Cotizacion3_RUT_URL: $scope.HojaAnt.Soportes.Cotizacion3_RUT_RUTA,
          Sop_Cotizacion3_DIR: $scope.HojaAnt.Cotizacion_3.Cotizacion_DIR_COD,

          Sop_Cotizacion4_Justificacion: $scope.HojaAnt.Cotizacion_4.Justificacion.toUpperCase(),
          Sop_Cotizacion4_URL: $scope.HojaAnt.Soportes.Cotizacion4_RUTA,

          Func_Rol_Cedula: $scope.Rol_Cedula,
          Func_Rol_Ubi_COD: $scope.Rol_Ubicacion,
        };

        $scope.HojaAnt.Servicio.Array.forEach(e => {
          xdata_serpro.push({
            "SERVICIO": e.SERVICIO, "PRODUCTO": e.PRODUCTO, "SUBCLASE": e.SUBCLASE,
            "CANTIDAD": e.CANTIDAD, "VALOR": e.VALOR.toString().replace(/\./g, ','),
            "TIPOAUT": e.TIPOAUT, "UBICACIONAUT": e.UBICACIONAUT, "UBICACION": e.UBICACION, "AUT": e.AUT
          });
        });
        // console.log(xdata_serpro);
        $http({
          method: 'POST',
          url: "php/autorizaciones/anticipos/anticipos.php",
          data: {
            function: 'H1Aprobar_Anticipo_Edita',
            Numero: $scope.HojaAnt.Info.Consecutivo.toString(),
            xdata: JSON.stringify(xdata),
            xdata_serpro: JSON.stringify(xdata_serpro),
            cantidad: xdata_serpro.length
          }
        }).then(function (response) {
          if (response.data.codigo != undefined) {
            if (response.data.codigo == 1) {
              swal({
                title: "Mensaje",
                text: response.data.mensaje,
                type: "warning",
              }).catch(swal.noop);
            } else {
              $timeout(function () {
                $scope.HojaAnticipo = false;
              }, 1000);
              $timeout(function () {
                $scope.Listar_Solicitudes();
              }, 1500);
              $scope.Ver_Anticipo_DeNuevo = {
                CONSECUTIVO: response.data.CONSECUTIVO,
                TIPO_DOC_AFI: response.data.TIPO_DOC_AFI,
                DOC_AFI: response.data.DOC_AFI
              };
              swal({
                title: response.data.mensaje,
                text: "¿Desea ver el anticipo?",
                type: "success",
                showCancelButton: true,
                confirmButtonText: "Si",
                cancelButtonText: "No",
                allowOutsideClick: false
              }).then(function (result) {
                if (result) {
                  $scope.Cargar_Anticipo($scope.Ver_Anticipo_DeNuevo);
                  $scope.SetTab(1);
                  $timeout(
                    function () {
                      $("#Sol").click();
                    }, 500
                  );
                  $timeout(
                    function () {
                      $("#Sol").click();
                    }, 700
                  );
                }
              }).catch(swal.noop);
            }
          }
        })
        ///////////////////////////////////////////////////////////////////////////
      }



      $scope.H1Aprobar_Anticipo_Firma_Pert = function () {
        angular.forEach(document.querySelectorAll('.HojaAnt_Ser .red-text'), function (i) {
          i.classList.remove('red-text');
        });
        angular.forEach(document.querySelectorAll('.HojaAnt_Pert_Des .red-text'), function (i) {
          i.classList.remove('red-text');
        });
        // //
        var Campos_Empty = false;
        if ($scope.HojaPer.Form_Mipres == undefined || $scope.HojaPer.Form_Mipres == null || $scope.HojaPer.Form_Mipres == '') {
          Campos_Empty = true; document.querySelector('#Form_Mipres_Label').classList.add('red-text');
        }
        if ($scope.HojaPer.ComTecCien == undefined || $scope.HojaPer.ComTecCien == null || $scope.HojaPer.ComTecCien == '') {
          Campos_Empty = true; document.querySelector('#ComTecCien_Label').classList.add('red-text');
        }
        if ($scope.HojaPer.Autorizado == undefined || $scope.HojaPer.Autorizado == null || $scope.HojaPer.Autorizado == '') {
          Campos_Empty = true; document.querySelector('#Autorizado_Label').classList.add('red-text');
        }
        if ($scope.HojaPer.Fecha_OrdenMed == undefined || $scope.HojaPer.Fecha_OrdenMed == null || $scope.HojaPer.Fecha_OrdenMed == '') {
          Campos_Empty = true; document.querySelector('#Fecha_OrdenMed_Label').classList.add('red-text');
        }
        if ($scope.HojaPer.Fecha_Recibido == undefined || $scope.HojaPer.Fecha_Recibido == null || $scope.HojaPer.Fecha_Recibido == '') {
          Campos_Empty = true; document.querySelector('#Fecha_Recibido_Label').classList.add('red-text');
        }
        if ($scope.HojaPer.Fecha_EnvioNac == undefined || $scope.HojaPer.Fecha_EnvioNac == null || $scope.HojaPer.Fecha_EnvioNac == '') {
          Campos_Empty = true; document.querySelector('#Fecha_EnvioNac_Label').classList.add('red-text');
        }
        if ($scope.HojaPer.Pertinencia == undefined || $scope.HojaPer.Pertinencia == null || $scope.HojaPer.Pertinencia == '') {
          Campos_Empty = true; document.querySelector('#Pertinencia_Label').classList.add('red-text');
        }
        if (Campos_Empty == false) {
          var Val_Tel = [
            $scope.DB_Consultar_Codigo()
          ];
          $q.all(Val_Tel).then(function (resultado1) {
            if (resultado1 == 1) { //ENVIA CODIGO Y FIRMA
              var Val_Tel = [
                $scope.Inicio_Telefono()
              ];
              $q.all(Val_Tel).then(function (resultado2) {
                if (resultado2 == 1) {
                  if ($scope.Rol_Sig == null) {
                    var Val_Tel = [
                      $scope.Inicio_Firma()
                    ];
                    $q.all(Val_Tel).then(function (resultado3) {
                      if (resultado3 == 1) {
                        $scope.H1Aprobar_Anticipo_Firma_Pert_Guarda();
                      }
                    });
                  } else {
                    $scope.Firma = "xxx";
                    $scope.H1Aprobar_Anticipo_Firma_Pert_Guarda();
                  }
                }
              });
            } else { //NO ENVIA CODIGO PERO FIRMA
              if ($scope.Rol_Sig == null) {
                var Val_Tel = [
                  $scope.Inicio_Firma()
                ];
                $q.all(Val_Tel).then(function (resultado3) {
                  if (resultado3 == 1) {
                    $scope.H1Aprobar_Anticipo_Firma_Pert_Guarda();
                  }
                });
              } else {
                $scope.Firma = "xxx";
                $scope.H1Aprobar_Anticipo_Firma_Pert_Guarda();
              }
            }
          });
        } else {
          Materialize.toast('¡Campos vacios o invalidos en los campos de pertinencia médica!', 3000);
          $("#collapsible-header-HojaAnt-Pertinencia").addClass(function () {
            return "active";
          }); $(".collapsible").collapsible({ accordion: true }); $(".collapsible").collapsible({ accordion: true });
        }
      }

      $scope.H1Aprobar_Anticipo_Firma_Pert_Guarda = function () {
        var xFechaOrden = $scope.HojaPer.Fecha_OrdenMed;
        var Fecha_OrdenMed = xFechaOrden.getUTCDate() + '-' + (((xFechaOrden.getMonth() + 1) < 10) ? '0' + (xFechaOrden.getMonth() + 1) : (xFechaOrden.getMonth() + 1)) + '-' + xFechaOrden.getFullYear();
        var xdata = {
          Afi_TipoDoc: $scope.HojaAnt.Afiliado.TipoDoc,
          Afi_NumeroDoc: $scope.HojaAnt.Afiliado.NumeroDoc,
          Fecha_OrdenMed: Fecha_OrdenMed
        }
        $http({
          method: 'POST',
          url: "php/autorizaciones/anticipos/anticipos.php",
          data: {
            function: 'P_VALIDA_FRECUENCIA_POR_USUARIO',
            Numero: $scope.HojaAnt.Info.Consecutivo.toString(),
            xdata: JSON.stringify(xdata),
            signature: 'xxx'
          }
        }).then(function (response) {
          if (response.data.codigo != 0) {
            if (response.data.codigo == 4) {
              swal({
                title: response.data.Nombre,
                text: 'Error De frecuencia, debe seleccionar motivo y observacion para levantar la frecuencia',
                type: "info",
                showCancelButton: false,
                allowOutsideClick: false,
                width: 'auto',
              }).then(function (result) {
                if (result) {
                  $scope.Levante_Motivo_Frecuencia(response.data.Producto);
                }
              });
            } else {
              swal({
                title: "Ocurrio un error",
                text: response.data.Nombre,
                type: "warning",
                showCancelButton: false
              })
            }
          } else {
            var xFechaOrden = $scope.HojaPer.Fecha_OrdenMed;
            var Fecha_OrdenMed = xFechaOrden.getFullYear() + '-' + (((xFechaOrden.getMonth() + 1) < 10) ? '0' + (xFechaOrden.getMonth() + 1) : (xFechaOrden.getMonth() + 1)) + '-' + xFechaOrden.getUTCDate();
            //
            var xFechaRecibido = $scope.HojaPer.Fecha_Recibido;
            var Fecha_Recibido = xFechaRecibido.getFullYear() + '-' + (((xFechaRecibido.getMonth() + 1) < 10) ? '0' + (xFechaRecibido.getMonth() + 1) : (xFechaRecibido.getMonth() + 1)) + '-' + xFechaRecibido.getUTCDate();
            //
            var xFechaEnvioNac = $scope.HojaPer.Fecha_EnvioNac;
            var Fecha_EnvioNac = xFechaEnvioNac.getFullYear() + '-' + (((xFechaEnvioNac.getMonth() + 1) < 10) ? '0' + (xFechaEnvioNac.getMonth() + 1) : (xFechaEnvioNac.getMonth() + 1)) + '-' + xFechaEnvioNac.getUTCDate();//
            var xdata = {
              Afi_TipoDoc: $scope.HojaAnt.Afiliado.TipoDoc,
              Afi_NumeroDoc: $scope.HojaAnt.Afiliado.NumeroDoc,
              Ant_Ubicacion: $scope.HojaAnt.Info.Ubicacion_Cod,
              Form_Mipres: $scope.HojaPer.Form_Mipres,
              ComTecCien: $scope.HojaPer.ComTecCien,
              Autorizado: $scope.HojaPer.Autorizado,
              Fecha_OrdenMed: Fecha_OrdenMed,
              Fecha_Recibido: Fecha_Recibido,
              Fecha_EnvioNac: Fecha_EnvioNac,
              Pertinencia: $scope.HojaPer.Pertinencia,
              Func_Rol_Cedula: $scope.Rol_Cedula,
              Func_Rol_Ubi_COD: $scope.Rol_Ubicacion,
            }
            var Msg_Pert = 'Informacion de la Pertinencia Médica';
            swal({
              title: "¿Está seguro que desea aprobar este anticipo?",
              text: "¿Acepta que verificó y validó el anticipo y sus soportes?" + ' + ' + Msg_Pert,
              type: "question",
              showCancelButton: true,
              allowOutsideClick: false
            }).catch(swal.noop)
              .then((willDelete) => {
                if (willDelete) {
                  //
                  swal({ title: 'Cargando...', allowOutsideClick: false });
                  swal.showLoading();
                  $http({
                    method: 'POST',
                    url: "php/autorizaciones/anticipos/anticipos.php",
                    data: {
                      function: 'H1Aprobar_Anticipo_Firma_Pert',
                      Numero: $scope.HojaAnt.Info.Consecutivo.toString(),
                      xdata: JSON.stringify(xdata),
                      signature: $scope.Firma
                    }
                  }).then(function (response) {
                    if (response.data.codigo != undefined) {
                      if (response.data.codigo == 1) {
                        swal({
                          title: "Mensaje",
                          text: response.data.mensaje,
                          type: "warning",
                        }).catch(swal.noop);
                      } else {
                        $timeout(function () {
                          $scope.HojaAnticipo = false;
                        }, 1000);
                        $timeout(function () {
                          $scope.Listar_Solicitudes();
                        }, 1500);
                        $scope.Ver_Anticipo_DeNuevo = {
                          CONSECUTIVO: response.data.CONSECUTIVO,
                          TIPO_DOC_AFI: response.data.TIPO_DOC_AFI,
                          DOC_AFI: response.data.DOC_AFI
                        };
                        swal({
                          title: response.data.mensaje,
                          text: "¿Desea ver el anticipo?",
                          type: "success",
                          showCancelButton: true,
                          confirmButtonText: "Si",
                          cancelButtonText: "No",
                          allowOutsideClick: false

                        }).then(function (result) {
                          if (result) {
                            $scope.Cargar_Anticipo($scope.Ver_Anticipo_DeNuevo);
                            $scope.SetTab(1);
                            $timeout(
                              function () {
                                $("#Sol").click();
                              }, 500
                            );
                          }
                        }).catch(swal.noop);
                      }
                    }
                  })
                } else {
                }
              });
          }
        });
      }

      $scope.Listar_Motivos_Frecuencia = function () {
        $http({
          method: 'POST',
          url: "php/autorizaciones/anticipos/anticipos.php",
          data: {
            function: 'Listar_Motivos_Frecuencia'
          }
        }).then(function (response) {
          $scope.Listado_Motivos_Frecuencia = response.data;
        });
      }

      $scope.Levante_Motivo_Frecuencia = function (PRODUCTO) {
        var xArray = [];
        $scope.Listado_Motivos_Frecuencia.forEach(e => {
          xArray.push({
            id: e.CODIGO,
            name: e.NOMBRE
          });
        });

        var options = {};
        $.map(xArray,
          function (o) {
            options[o.id] = o.name;
          });
        swal({
          title: 'Seleccione el motivo para levantar la frecuencia',
          input: 'select',
          inputOptions: options,
          inputPlaceholder: 'Seleccionar',
          showCancelButton: true,
          allowOutsideClick: false,
          width: 'auto',
          inputValidator: function (value) {
            return new Promise(function (resolve, reject) {
              if (value !== '') {
                resolve();
              } else {
                swal.close();
              }
            })
          }
        }).then(function (result) {
          if (result) {
            swal({
              title: 'Observacion para levantar la frecuencia',
              input: 'textarea',
              inputPlaceholder: 'Escribe un comentario...',
              showCancelButton: true,
              allowOutsideClick: false,
            }).then(function (result_obs) {
              if (result_obs !== '') {
                $http({
                  method: 'POST',
                  url: "php/autorizaciones/anticipos/anticipos.php",
                  data: {
                    function: 'Levantar_Frecuencia_Antes',
                    numero: $scope.HojaAnt.Info.Consecutivo.toString(),
                    producto: PRODUCTO,
                    cedula: $scope.Rol_Cedula,
                    motivo: result,
                    observacion: result_obs
                  }
                }).then(function (response) {
                  if (response.data.Codigo != undefined) {
                    if (response.data.Codigo == 1) {
                      swal({
                        title: "Mensaje",
                        text: response.data.Mensaje,
                        type: "warning",
                      }).catch(swal.noop);
                    } else {
                      swal({
                        title: response.data.Mensaje,
                        type: "success",
                      }).catch(swal.noop);
                    }
                  }
                });
              } else {
                Materialize.toast('La observación debe contener al menos 1 caracter!', 1000);
              }
            }).catch(swal.noop);

          }

        }).catch(swal.noop);
      }



      $scope.H1Aprobar_Anticipo_Firma = function () {
        var xdata = {
          Afi_TipoDoc: $scope.HojaAnt.Afiliado.TipoDoc,
          Afi_NumeroDoc: $scope.HojaAnt.Afiliado.NumeroDoc,
          Ant_Ubicacion: $scope.HojaAnt.Info.Ubicacion_Cod,
          Ant_Status: $scope.HojaAnt.Info.Status,
          Func_Rol_Cedula: $scope.Rol_Cedula,
          Func_Rol_Ubi_COD: $scope.Rol_Ubicacion,
          Func_Rol_Cargo: ($scope.HojaAnt.Info.Status == 3) ? '999' : $scope.Rol_Cargo,
          v_Cot_Recomendada: $scope.Cot_Recomendada,
          v_Cot_Elegida: $scope.Cot_Elegida,
          v_Cot_Elegida_Direccion: $scope.Cot_Elegida_Direccion
        }
        var Msg_Pert = 'Informacion de la Pertinencia Médica';
        var Msg_Cert = 'Informacion de la Certificación';

        swal({
          title: "¿Está seguro que desea aprobar este anticipo?",
          text: "¿Acepta que verificó y validó el anticipo y sus soportes?" + ' + ' + Msg_Pert + ' + ' + Msg_Cert,
          type: "question",
          showCancelButton: true,
          allowOutsideClick: false,
        }).catch(swal.noop)
          .then((willDelete) => {
            if (willDelete) {
              //
              swal({ title: 'Cargando...', allowOutsideClick: false });
              swal.showLoading();
              if ($scope.Rol_Cargo != 34 && $scope.Rol_Cargo != 87) { // Cargo Auditor Seccional y Especialista Nacional Solo Firman ellos
                $scope.Firma = 'xxx';
              }
              $http({
                method: 'POST',
                url: "php/autorizaciones/anticipos/anticipos.php",
                data: {
                  function: 'H1Aprobar_Anticipo_Firma_Oblig',
                  Numero: $scope.HojaAnt.Info.Consecutivo.toString(),
                  xdata: JSON.stringify(xdata),
                  signature: $scope.Firma
                }
              }).then(function (response) {
                if (response.data.codigo != undefined) {
                  if (response.data.codigo == 1) {
                    swal({
                      title: "Mensaje",
                      text: response.data.mensaje,
                      type: "warning",
                    }).catch(swal.noop);
                  } else {
                    $timeout(function () {
                      $scope.HojaAnticipo = false;
                    }, 1000);
                    $timeout(function () {
                      $scope.Listar_Solicitudes();
                    }, 1500);

                    $scope.Ver_Anticipo_DeNuevo = {
                      CONSECUTIVO: response.data.CONSECUTIVO,
                      TIPO_DOC_AFI: response.data.TIPO_DOC_AFI,
                      DOC_AFI: response.data.DOC_AFI
                    };
                    swal({
                      title: response.data.mensaje,
                      text: "¿Desea ver el anticipo?",
                      type: "success",
                      showCancelButton: true,
                      confirmButtonText: "Si",
                      cancelButtonText: "No",
                      allowOutsideClick: false

                    }).then(function (result) {
                      if (result) {
                        $scope.Cargar_Anticipo($scope.Ver_Anticipo_DeNuevo);
                        $scope.SetTab(1);
                        $timeout(
                          function () {
                            $("#Sol").click();
                          }, 500
                        );
                      }
                    }).catch(swal.noop);
                  }
                }
              })
            } else {
            }
          });
      }

      $scope.H1Aprobar_Anticipo_No_Firma = function () {
        var xdata = {
          Afi_TipoDoc: $scope.HojaAnt.Afiliado.TipoDoc,
          Afi_NumeroDoc: $scope.HojaAnt.Afiliado.NumeroDoc,
          Ant_Ubicacion: $scope.HojaAnt.Info.Ubicacion_Cod,
          Ant_Status: $scope.HojaAnt.Info.Status,
          Func_Rol_Cedula: $scope.Rol_Cedula,
          Func_Rol_Ubi_COD: $scope.Rol_Ubicacion,
          Func_Rol_Cargo: $scope.Rol_Cargo,
          Func_Firma: ''
        }
        swal({
          title: "¿Está seguro que desea aprobar este anticipo?",
          type: "question",
          showCancelButton: true,
          allowOutsideClick: false
        }).catch(swal.noop)
          .then((willDelete) => {
            if (willDelete) {
              //
              swal({ title: 'Cargando...', allowOutsideClick: false });
              swal.showLoading();
              $http({
                method: 'POST',
                url: "php/autorizaciones/anticipos/anticipos.php",
                data: {
                  function: 'H1Aprobar_Anticipo_Firma_Oblig',
                  Numero: $scope.HojaAnt.Info.Consecutivo.toString(),
                  xdata: JSON.stringify(xdata),
                  signature: ''
                }
              }).then(function (response) {
                if (response.data.codigo != undefined) {
                  if (response.data.codigo == 1) {
                    swal({
                      title: "Mensaje",
                      text: response.data.mensaje,
                      type: "warning",
                    }).catch(swal.noop);
                  } else {
                    $timeout(function () {
                      $scope.HojaAnticipo = false;
                    }, 1000);
                    $timeout(function () {
                      $scope.Listar_Solicitudes();
                    }, 1500);
                    $scope.Ver_Anticipo_DeNuevo = {
                      CONSECUTIVO: response.data.CONSECUTIVO,
                      TIPO_DOC_AFI: response.data.TIPO_DOC_AFI,
                      DOC_AFI: response.data.DOC_AFI
                    };
                    swal({
                      title: response.data.mensaje,
                      text: "¿Desea ver el anticipo?",
                      type: "success",
                      showCancelButton: true,
                      confirmButtonText: "Si",
                      cancelButtonText: "No",
                      allowOutsideClick: false

                    }).then(function (result) {
                      if (result) {
                        $scope.Cargar_Anticipo($scope.Ver_Anticipo_DeNuevo);
                        $scope.SetTab(1);
                        $timeout(
                          function () {
                            $("#Sol").click();
                          }, 500
                        );
                      }
                    }).catch(swal.noop);
                  }
                }
              })
            } else {
            }
          });
      }



      $scope.H1Aprobar_Anticipo_Elegir_Cot = function () {
        var xArray = [];
        if ($scope.HojaAnt.Cotizacion_1.Cotizacion_NIT_COD) {
          xArray.push({
            id: $scope.HojaAnt.Cotizacion_1.Cotizacion_NIT_COD,
            name: $scope.HojaAnt.Cotizacion_1.Cotizacion_NIT
          });
        }
        if ($scope.HojaAnt.Cotizacion_2.Cotizacion_NIT_COD) {
          xArray.push({
            id: $scope.HojaAnt.Cotizacion_2.Cotizacion_NIT_COD,
            name: $scope.HojaAnt.Cotizacion_2.Cotizacion_NIT
          });
        }
        if ($scope.HojaAnt.Cotizacion_3.Cotizacion_NIT_COD) {
          xArray.push({
            id: $scope.HojaAnt.Cotizacion_3.Cotizacion_NIT_COD,
            name: $scope.HojaAnt.Cotizacion_3.Cotizacion_NIT
          });
        }
        var options = {};
        $.map(xArray,
          function (o) {
            options[o.id] = o.name;
          });
        swal({
          title: 'Seleccione la Cotización a ' + (($scope.HojaAnt.Info.Status == 6) ? 'Recomendar' : 'Elegir'),
          input: 'select',
          inputOptions: options,
          inputPlaceholder: 'Seleccionar',
          showCancelButton: true,
          allowOutsideClick: false,
          width: 'auto',
          inputValidator: function (value) {
            return new Promise(function (resolve, reject) {
              if (value !== '') {
                resolve();
              } else {
                swal.close();
              }
            })
          }
        }).then(function (result) {
          if (result) {
            if ($scope.HojaAnt.Info.Status == 6) {
              $scope.Cot_Recomendada = result;
            }
            if ($scope.HojaAnt.Info.Status == 7) {
              $scope.Cot_Elegida = result;

              if (result == $scope.HojaAnt.Cotizacion_1.Cotizacion_NIT_COD) { $scope.Cot_Elegida_Direccion = $scope.HojaAnt.Cotizacion_1.Cotizacion_DIR_COD }
              if (result == $scope.HojaAnt.Cotizacion_2.Cotizacion_NIT_COD) { $scope.Cot_Elegida_Direccion = $scope.HojaAnt.Cotizacion_2.Cotizacion_DIR_COD }
              if (result == $scope.HojaAnt.Cotizacion_3.Cotizacion_NIT_COD) { $scope.Cot_Elegida_Direccion = $scope.HojaAnt.Cotizacion_3.Cotizacion_DIR_COD }

            }

            var Val_Tel = [
              $scope.DB_Consultar_Codigo()
            ];
            $q.all(Val_Tel).then(function (resultado1) {
              if (resultado1 == 1) {//ENVIA CODIGO Y FIRMA
                var Val_Tel = [
                  $scope.Inicio_Telefono()
                ];
                $q.all(Val_Tel).then(function (resultado) {
                  if (resultado == 1) {
                    $scope.H1Aprobar_Anticipo_Firma();
                  }
                });
              } else {
                $scope.H1Aprobar_Anticipo_Firma();
              }
            });
            // $q.all(Val_Tel).then(function (resultado) {
            //   if (resultado == 1) {
            //     // var Val_Tel = [
            //     //   $scope.Inicio_Firma()
            //     // ];
            //     // $q.all(Val_Tel).then(function (resultado2) {
            //     //   if (resultado2 == 1) {
            //     $scope.H1Aprobar_Anticipo_Firma();
            //     //   }
            //     // });
            //   }
            // });
          }

        }).catch(swal.noop);
      }

      $scope.Ver_Historico_Anticipo = function () {
        $http({
          method: 'POST',
          url: "php/autorizaciones/anticipos/anticipos.php",
          data: {
            function: 'Ver_Historico_Anticipo',
            Numero: $scope.HojaAnt.Info.Consecutivo,
            TipoDoc: $scope.HojaAnt.Afiliado.TipoDoc,
            NumeroDoc: $scope.HojaAnt.Afiliado.NumeroDoc,
          }
        }).then(function (response) {
          $scope.MPFiltrar_Historico = '';
          $scope.HistoricoAnt = response.data;
          $scope.Abrir_Modal_HistoricoAnt();
        });
      }

      $scope.Descargar_Historico_Anticipo = function () {
        window.open('views/autorizaciones/anticipos/formato_historicomovs.php?&Numero=' + $scope.HojaAnt.Info.Consecutivo + '&TipoDoc=' + $scope.HojaAnt.Afiliado.TipoDoc
          + '&NumeroDoc=' + $scope.HojaAnt.Afiliado.NumeroDoc);
      }


      $scope.H1Aprobar_Anticipo_Pagaduria = function () {
        document.querySelector('#HojaAnt_CopiaPagaduria_Label').classList.remove('red-text');
        document.querySelector('#HojaAnt_FechaPagoPagaduria_Label').classList.remove('red-text');
        // $scope.HojaAnt.Soportes.FechaPagoPagaduria
        if ($scope.HojaAnt.Info.Status == 9) {
          if (!$scope.HojaAnt.Soportes.FechaPagoPagaduria) { document.querySelector('#HojaAnt_FechaPagoPagaduria_Label').classList.add('red-text'); return false }
          if ($scope.HojaAnt.Soportes.CopiaPagaduria_B64 != '') {
            swal({
              title: "¿Está seguro que desea aprobar este anticipo?",
              type: "question",
              showCancelButton: true,
              allowOutsideClick: false
            }).catch(swal.noop)
              .then((willDelete) => {
                if (willDelete) {
                  //
                  swal({ title: 'Cargando...', allowOutsideClick: false });
                  swal.showLoading();
                  //
                  var Subir_Soportes = [
                    $scope.Cargar_Soporte_FTPAnt('Soportes', 'CopiaPagaduria_B64', 'Soporte_Pagaduria', 'CopiaPagaduria_RUTA', ''),
                  ];
                  $q.all(Subir_Soportes).then(function (resultado2) {
                    var Archivos_Error = false;
                    for (var x = 0; x < resultado2.length; x++) {
                      if ((resultado2[x] != null && resultado2[x].substr(0, 3) == '<br') || resultado2[x].substr(0, 1) == '0') {
                        Archivos_Error = true;
                        swal({
                          title: '¡Error al subir un archivo!',
                          text: 'Nota: Si el error persiste, por favor actualizar la página (CONTROL + F5).',
                          type: 'warning'
                        }).catch(swal.noop);
                      }
                    }
                    if (Archivos_Error == false) {
                      $scope.H1Aprobar_Anticipo_Pagaduria_Status9y10();
                    }
                  });
                } else {
                }
              });
          } else {
            swal({
              title: 'Información!',
              text: 'Debe Adjuntar el Soporte de Pago del Anticipo.',
              type: 'info'
            }).catch(swal.noop);
            document.querySelector('#HojaAnt_CopiaPagaduria_Label').classList.add('red-text');
          }
        }
        if ($scope.HojaAnt.Info.Status == 10) {
          swal({
            title: "¿Está seguro que desea procesar este anticipo?",
            type: "question",
            showCancelButton: true,
            allowOutsideClick: false
          }).catch(swal.noop)
            .then((willDelete) => {
              if (willDelete) {
                var xArray = {
                  'MEDICAMENTO': 'Medicamento',
                  'TRASPLANTE HEPATICO PEDIATRICO': 'Trasplante Hepatico Pediatrico',
                  'PROCEDIMIENTO QUIRURGICO': 'Procedimiento Quirurgico',
                  'IMPLANTE COCLEAR': 'Implante Coclear',
                  'TRATAMIENTO INTEGRAL ONCOLOGICO': 'Tratamiento Integral Oncologico',
                  'ESTUDIO': 'Estudio',
                  'BRAQUITERAPIA': 'Braquiterapia',
                  'ALBERGUE': 'Albergue',
                  'INTERNACION EN CLINICA PSIQUIATRICA': 'Internacion En Clinica Psiquiatrica',
                  'TRANSPORTE': 'Transporte',
                  'APLICACION DE MEDICAMENTO': 'Aplicacion De Medicamento',
                  'VACUNAS': 'Vacunas',
                  'INMUNOTERAPIAS': 'Inmunoterapias',
                  'CONSULTA': 'Consulta',
                  'PRUEBA NEUROPSICOLOGICA': 'Prueba Neuropsicologica'
                };
                var xArray2 = {
                  'S': 'Si',
                  'N': 'No'
                };

                swal({
                  title: 'Seleccione el Servicio',
                  input: 'select',
                  inputOptions: xArray,
                  inputPlaceholder: 'Seleccionar',
                  showCancelButton: true,
                  inputValidator: function (value) {
                    return new Promise(function (resolve, reject) {
                      if (value !== '') {
                        resolve();
                      } else {
                        swal.close();
                      }
                    })
                  }
                }).then(function (result) {
                  ////////////////////////////////////////////////////////////////////////////////////////
                  if (result !== '') {
                    swal({
                      title: '¿Enfermedad Huérfana',
                      input: 'select',
                      inputOptions: xArray2,
                      inputPlaceholder: 'Seleccionar',
                      showCancelButton: true,
                      inputValidator: function (value) {
                        return new Promise(function (resolve, reject) {
                          if (value !== '') {
                            resolve();
                          } else {
                            swal.close();
                          }
                        })
                      }
                    }).then(function (result2) {
                      ////////////////////////////////////////////////////////////////////////////////////////
                      if (result2 !== '') {


                        swal({ title: 'Enviando Notificaciones...', allowOutsideClick: false });
                        swal.showLoading();
                        $scope.H1Aprobar_Anticipo_Pagaduria_Status9y10(result, result2);
                      } else {
                      }
                    }
                    )
                  };
                }
                )
              };
            });
        }
      }


      $scope.H1Aprobar_Anticipo_Pagaduria_Status9y10 = function (Ser, Enf) {
        var xdata = {
          Afi_TipoDoc: $scope.HojaAnt.Afiliado.TipoDoc,
          Afi_NumeroDoc: $scope.HojaAnt.Afiliado.NumeroDoc,
          Ant_Ubicacion: $scope.HojaAnt.Info.Ubicacion_Cod,
          Ant_Status: $scope.HojaAnt.Info.Status,
          Func_Rol_Cedula: $scope.Rol_Cedula,
          Func_Rol_Ubi_COD: $scope.Rol_Ubicacion,
          Func_Rol_Cargo: $scope.Rol_Cargo,
          Sop_Pagaduria_URL: ($scope.HojaAnt.Info.Status == 10) ? '' : $scope.HojaAnt.Soportes.CopiaPagaduria_RUTA,
          Sop_Fecha_Pago: $scope.formatDate($scope.HojaAnt.Soportes.FechaPagoPagaduria),
          Servicio: Ser,
          Enf_Huerfana: Enf
        }
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/autorizaciones/anticipos/anticipos.php",
          data: {
            function: 'H1Aprobar_Anticipo_Pagaduria',
            Numero: $scope.HojaAnt.Info.Consecutivo.toString(),
            xdata: JSON.stringify(xdata)
          }
        }).then(function (response) {
          if (response.data.codigo != undefined) {
            if (response.data.codigo == 1) {
              swal({
                title: "Mensaje",
                text: response.data.mensaje,
                type: "warning",
              }).catch(swal.noop);
            } else {
              $timeout(function () {
                $scope.HojaAnticipo = false;
              }, 1000);
              $timeout(function () {
                $scope.Listar_Solicitudes();
              }, 1500);
              $scope.Ver_Anticipo_DeNuevo = {
                CONSECUTIVO: response.data.CONSECUTIVO,
                TIPO_DOC_AFI: response.data.TIPO_DOC_AFI,
                DOC_AFI: response.data.DOC_AFI
              };
              swal({
                title: response.data.mensaje,
                text: "¿Desea ver el anticipo?",
                type: "success",
                showCancelButton: true,
                confirmButtonText: "Si",
                cancelButtonText: "No",
                allowOutsideClick: false

              }).then(function (result) {
                if (result) {
                  $scope.Cargar_Anticipo($scope.Ver_Anticipo_DeNuevo);
                  $scope.SetTab(1);
                  $timeout(
                    function () {
                      $("#Sol").click();
                    }, 500
                  );
                }
              }).catch(swal.noop);
            }
          }
        })
      }


      $scope.Antes_H1Aprobar_Anticipo_PrestacionEfectiva = function () {
        document.querySelector('#HojaAnt_FechaPrestacionEfectiva_Label').classList.remove('red-text');
        document.querySelector('#HojaAnt_Soporte_PrestacionEfectiva_Label').classList.remove('red-text');

        if (!$scope.HojaAnt.Soportes.FechaPrestacionEfectiva) { document.querySelector('#HojaAnt_FechaPrestacionEfectiva_Label').classList.add('red-text'); return false }
        if (!$scope.HojaAnt.Soportes.Soporte_PrestacionEfectiva_B64) { document.querySelector('#HojaAnt_Soporte_PrestacionEfectiva_Label').classList.add('red-text'); return false }

        swal({
          title: "¿Está seguro que desea guardar la fecha y soportes este anticipo?",
          type: "question",
          showCancelButton: true,
          allowOutsideClick: false
        }).catch(swal.noop)
          .then((willDelete) => {
            if (willDelete) {
              //
              swal({ title: 'Cargando...', allowOutsideClick: false });
              swal.showLoading();
              //
              var Subir_Soportes = [
                $scope.Cargar_Soporte_FTPAnt('Soportes', 'Soporte_PrestacionEfectiva_B64', 'Soporte_PrestacionEfectiva', 'Soporte_PrestacionEfectiva_RUTA', ''),
              ];
              $q.all(Subir_Soportes).then(function (resultado2) {
                var Archivos_Error = false;
                for (var x = 0; x < resultado2.length; x++) {
                  if ((resultado2[x] != null && resultado2[x].substr(0, 3) == '<br') || resultado2[x].substr(0, 1) == '0') {
                    Archivos_Error = true;
                    swal({
                      title: '¡Error al subir un archivo!',
                      text: 'Nota: Si el error persiste, por favor actualizar la página (CONTROL + F5).',
                      type: 'warning'
                    }).catch(swal.noop);
                  }
                }
                if (Archivos_Error == false) {
                  $scope.H1Aprobar_Anticipo_PrestacionEfectiva();
                }
              });
            } else {
            }
          });
      }

      $scope.H1Aprobar_Anticipo_PrestacionEfectiva = function () {
        var xdata = {
          Afi_TipoDoc: $scope.HojaAnt.Afiliado.TipoDoc,
          Afi_NumeroDoc: $scope.HojaAnt.Afiliado.NumeroDoc,
          Ant_Ubicacion: $scope.HojaAnt.Info.Ubicacion_Cod,
          Ant_Status: $scope.HojaAnt.Info.Status,
          Func_Rol_Cedula: $scope.Rol_Cedula,
          Soporte_Prestador: $scope.HojaAnt.Soportes.Soporte_PrestacionEfectiva_RUTA,
          Fecha_Prestacion: $scope.formatDate($scope.HojaAnt.Soportes.FechaPrestacionEfectiva)
        }
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/autorizaciones/anticipos/anticipos.php",
          data: {
            function: 'P_APROBAR_ANTICIPO_PRESTACION_EFECTIVA',
            Numero: $scope.HojaAnt.Info.Consecutivo.toString(),
            xdata: JSON.stringify(xdata)
          }
        }).then(function (response) {
          if (response.data.codigo != undefined) {
            if (response.data.codigo == 1) {
              swal({
                title: "Mensaje",
                text: response.data.mensaje,
                type: "warning",
              }).catch(swal.noop);
            } else {
              $timeout(function () {
                $scope.HojaAnticipo = false;
              }, 1000);
              $timeout(function () {
                $scope.Listar_Solicitudes();
              }, 1500);
              $scope.Ver_Anticipo_DeNuevo = {
                CONSECUTIVO: response.data.CONSECUTIVO,
                TIPO_DOC_AFI: response.data.TIPO_DOC_AFI,
                DOC_AFI: response.data.DOC_AFI
              };
              swal({
                title: response.data.mensaje,
                text: "¿Desea ver el anticipo?",
                type: "success",
                showCancelButton: true,
                confirmButtonText: "Si",
                cancelButtonText: "No",
                allowOutsideClick: false
              }).then(function (result) {
                if (result) {
                  $scope.Cargar_Anticipo($scope.Ver_Anticipo_DeNuevo);
                  $scope.SetTab(1);
                  $timeout(
                    function () {
                      $("#Sol").click();
                    }, 500
                  );
                }
              }).catch(swal.noop);
            }
          }
        })
      }

      $scope.desvincularAuts = function () {

        if ($scope.HojaAnt.Servicio.Array.some((element) => element.ESTADO_AUT == 'PROCESADA')) {
          swal("¡Importante!", "No es posible desvincular, existen autorizaciones procesadas.", "info").catch(swal.noop);
        }
        var array = []
        $scope.HojaAnt.Servicio.Array.forEach(element => {
          array.push({
            PRODUCTO: element.PRODUCTO, UBICACION: element.UBICACION, AUT: '', SUBCLASE: element.SUBCLASE
          })
        });
        //
        swal({
          title: "¿Está seguro que desea desvincular las autorizaciones?",
          type: "question",
          showCancelButton: true,
          allowOutsideClick: false
        }).catch(swal.noop)
          .then((willDelete) => {
            if (willDelete) {

              swal({ title: 'Cargando...', allowOutsideClick: false });
              swal.showLoading();

              $http({
                method: 'POST',
                url: "php/autorizaciones/anticipos/anticipos.php",
                data: {
                  function: 'p_editar_producto_aut_anticipo',
                  numero: $scope.HojaAnt.Info.Consecutivo,
                  json: JSON.stringify(array),
                  cantidad: array.length,
                }
              }).then(function ({ data }) {
                if (data && data.toString().substr(0, 3) != '<br') {
                  if (data.codigo == 0) {
                    swal("¡Importante!", data.mensaje, "success").catch(swal.noop);

                    setTimeout(() => {
                      $scope.Ver_Anticipo_DeNuevo = {
                        CONSECUTIVO: $scope.HojaAnt.Info.Consecutivo,
                        TIPO_DOC_AFI: $scope.HojaAnt.Afiliado.TipoDoc,
                        DOC_AFI: $scope.HojaAnt.Afiliado.NumeroDoc
                      };
                      $scope.Cargar_Anticipo($scope.Ver_Anticipo_DeNuevo);
                    }, 3000);
                  } else {
                    swal("¡Importante!", data.mensaje, "info").catch(swal.noop);
                  }
                }
              });

            }
          })
        //
      }

      $scope.cambiarAut = function (x) {
        $scope.modalVincularAut_producto = x.PRODUCTO;
        $scope.modalVincularAut_subclase = x.SUBCLASE;
        $scope.modalVincularAut_numero = x.AUT;
        $scope.modalVincularAut_ubicacion = x.UBICACION;
        $('#modal_vincularAut').modal('open');
        setTimeout(() => { document.querySelector('#modalVincularAut_numero').focus() }, 1000);

      }

      $scope.guardarVincularAut = function () {
        if ($scope.modalVincularAut_numero == '' && $scope.modalVincularAut_ubicacion == '') {
          swal("¡Importante!", "Debe digitar numero y ubicacion de la Autorización", "info").catch(swal.noop);
        }
        var array = []
        array.push({
          PRODUCTO: $scope.modalVincularAut_producto, UBICACION: $scope.modalVincularAut_ubicacion, AUT: $scope.modalVincularAut_numero,
          SUBCLASE: $scope.modalVincularAut_subclase
        })

        swal({
          title: "¿Está seguro que desea guardar la autorizacion?",
          type: "question",
          showCancelButton: true,
          allowOutsideClick: false
        }).catch(swal.noop)
          .then((willDelete) => {
            if (willDelete) {

              swal({ title: 'Cargando...', allowOutsideClick: false });
              swal.showLoading();

              $http({
                method: 'POST',
                url: "php/autorizaciones/anticipos/anticipos.php",
                data: {
                  function: 'p_editar_producto_aut_anticipo',
                  numero: $scope.HojaAnt.Info.Consecutivo,
                  json: JSON.stringify(array),
                  cantidad: array.length,
                }
              }).then(function ({ data }) {
                if (data && data.toString().substr(0, 3) != '<br') {
                  if (data.codigo == 0) {
                    swal("¡Importante!", data.mensaje, "success").catch(swal.noop);
                    $('.modal').modal('close');

                    setTimeout(() => {
                      $scope.Ver_Anticipo_DeNuevo = {
                        CONSECUTIVO: $scope.HojaAnt.Info.Consecutivo,
                        TIPO_DOC_AFI: $scope.HojaAnt.Afiliado.TipoDoc,
                        DOC_AFI: $scope.HojaAnt.Afiliado.NumeroDoc
                      };
                      $scope.Cargar_Anticipo($scope.Ver_Anticipo_DeNuevo);
                    }, 3000);
                  } else {
                    swal("¡Importante!", data.mensaje, "info").catch(swal.noop);
                  }
                }
              });

            }
          })

      }

      $scope.Cerrar_modal_vincularAut = function () {
        $('#modal_vincularAut').modal('close');
      }

      $scope.quitarAut = function (x) {
        if (x.ESTADO_AUT == 'PROCESADA') {
          swal("¡Importante!", "No es posible desvincular autorizacion procesada.", "info").catch(swal.noop);
        }
        var array = []
        array.push({
          PRODUCTO: x.PRODUCTO, UBICACION: x.UBICACION, AUT: '', SUBCLASE: x.SUBCLASE
        })

        swal({
          title: "¿Está seguro que desea desvincular la autorizacion?",
          type: "question",
          showCancelButton: true,
          allowOutsideClick: false
        }).catch(swal.noop)
          .then((willDelete) => {
            if (willDelete) {

              swal({ title: 'Cargando...', allowOutsideClick: false });
              swal.showLoading();

              $http({
                method: 'POST',
                url: "php/autorizaciones/anticipos/anticipos.php",
                data: {
                  function: 'p_editar_producto_aut_anticipo',
                  numero: $scope.HojaAnt.Info.Consecutivo,
                  json: JSON.stringify(array),
                  cantidad: array.length,
                }
              }).then(function ({ data }) {
                if (data && data.toString().substr(0, 3) != '<br') {
                  if (data.codigo == 0) {
                    swal("¡Importante!", data.mensaje, "success").catch(swal.noop);

                    setTimeout(() => {
                      $scope.Ver_Anticipo_DeNuevo = {
                        CONSECUTIVO: $scope.HojaAnt.Info.Consecutivo,
                        TIPO_DOC_AFI: $scope.HojaAnt.Afiliado.TipoDoc,
                        DOC_AFI: $scope.HojaAnt.Afiliado.NumeroDoc
                      };
                      $scope.Cargar_Anticipo($scope.Ver_Anticipo_DeNuevo);
                    }, 3000);
                  } else {
                    swal("¡Importante!", data.mensaje, "info").catch(swal.noop);
                  }
                }
              });

            }
          })
      }
      ///////////////////////////////////////////////////////////////////////////
      // FIRMA///////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////
      $scope.Inicio_Telefono_Firma = function (FUNCION) {
        var Val_Tel = [
          $scope.DB_Consultar_Codigo()
        ];
        $q.all(Val_Tel).then(function (resultado1) {
          if (resultado1 == 1) {//ENVIA CODIGO Y FIRMA
            var Val_Tel = [
              $scope.Inicio_Telefono()
            ];
            $q.all(Val_Tel).then(function (resultado2) {
              if (resultado2 == 1) {
                if ($scope.Rol_Cargo == 34 || $scope.Rol_Cargo == 87) { // Cargo Auditor Seccional y Especialista Nacional Solo Firman ellos
                  if ($scope.Rol_Sig == null) {
                    var Val_Tel = [
                      $scope.Inicio_Firma()
                    ];
                    $q.all(Val_Tel).then(function (resultado3) {
                      if (resultado3 == 1) {
                        $scope[FUNCION]();
                      } else {
                        swal({
                          title: "Mensaje",
                          text: 'Firma no valida, Por favor ingrese su firma correctamente.',
                          type: "warning",
                        }).catch(swal.noop);
                      }
                    });
                  } else {
                    $scope.Firma = "xxx";
                    $scope[FUNCION]();
                  }
                } else {
                  $scope[FUNCION]();
                }
              }
            });
          } else {//NO ENVIA CODIGO PERO FIRMA
            if ($scope.Rol_Cargo == 34 || $scope.Rol_Cargo == 87) { // Cargo Auditor Seccional y Especialista Nacional Solo Firman ellos
              if ($scope.Rol_Sig == null) {
                var Val_Tel = [
                  $scope.Inicio_Firma()
                ];
                $q.all(Val_Tel).then(function (resultado3) {
                  if (resultado3 == 1) {
                    $scope[FUNCION]();
                  } else {
                    swal({
                      title: "Mensaje",
                      text: 'Firma no valida, Por favor ingrese su firma correctamente.',
                      type: "warning",
                    }).catch(swal.noop);
                  }
                });
              } else {
                $scope.Firma = "xxx";
                $scope[FUNCION]();
              }
            } else {
              $scope[FUNCION]();
            }
          }
        });
      }
      $scope.Inicio_Telefono = function () {
        var defered = $q.defer();
        var promise = defered.promise;
        // swal({
        //   title: '¡Información!',
        //   text: 'Por inconvenientes se desactivó la verificación por mensaje de texto, una vez superada esta contingencia se habilitará de nuevo esta validación.',
        //   showCancelButton: true,
        //   confirmButtonText: "Entendido",
        //   cancelButtonText: "Cancelar",
        //   allowOutsideClick: false
        // }).then(function (result) {
        // if (result) {
        defered.resolve(1);
        //   } else {
        //     defered.resolve(0);
        //   }
        // })
        return promise;
      }
      $scope.Inicio_Firma = function (name) {
        return new Promise((resolve1, reject1) => {
          const llamarModal = async () => {
            try {
              let response = await SignatureAgent.openModal((name == null) ? $scope.Rol_Nombre : name);
              $scope.Firma = response;
              return 1
            }
            catch (error) {
              throw 0;
            }
          }
          llamarModal().then((response) => {
            resolve1(response)
          }).catch(error => {
            reject1(error)
          });
        })
      }

      $scope.showOnErrorMessage = function () {
        websocket.close();
      }
      $scope.sendGetSignatureEvent = socket => {
        socket.send(JSON.stringify({
          event: 'get_signature'
        }));
      }
      $scope.sendClearScreenEvent = socket => {
        document.getElementById("Estado_Firma").textContent = "Limpiando Pantalla...";
        socket.send(JSON.stringify({
          event: 'clear_screen'
        }));
        document.getElementById("Estado_Firma").textContent = "Escriba Su firma...";
      }
      $scope.sendFinishSignatureEvent = socket => {
        socket.send(JSON.stringify({
          event: 'sleep'
        }));
      }


      ///////////////////////////////////////////////////////////////////////////
      // SOLICITUDES/////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////


      /////////////////////////////////////////MODALS/////////////////////////////////////////////////
      $scope.Modal = function () {
        SignatureAgent.openModal();
        (function () {
          $('#modal').modal();
        }());
        $('#modal').modal('open');
      }
      $scope.Abrir_Modal_Cumplimiento = function () {
        (function () {
          $('#modal_Cumplimiento').modal();
        }());
        $('#modal_Cumplimiento').modal('open');
      }
      $scope.Cerrar_Modal_Cumplimiento = function () {
        $('#modal_Cumplimiento').modal('close');
      }
      $scope.Abrir_Modal_CumplimientoAnt = function () {
        (function () {
          $('#modal_CumplimientoAnt').modal();
        }());
        $('#modal_CumplimientoAnt').modal('open');
      }
      $scope.Cerrar_Modal_CumplimientoAnt = function () {
        $('#modal_CumplimientoAnt').modal('close');
      }
      $scope.Abrir_Modal_Servicio_Prod = function () {
        $scope.Hoja1.Servicio.Servicio_Cod = ''; $scope.Hoja1.Servicio.Servicio = ''; $scope.Busqueda.Servicio.SAVE = '';
        $scope.Hoja1.Servicio.Prod_Cod = ''; $scope.Hoja1.Servicio.Prod = ''; $scope.Busqueda.Producto.SAVE = '';
        $scope.Hoja1.Servicio.Valor = '';
        $scope.Hoja1.Servicio.Cantidad = '';
        $scope.Hoja1.Afiliado.TipoAut = '';
        $scope.Hoja1.Afiliado.UbicacionAut = '';
        $scope.Busqueda.Producto.Listado = null;
        $scope.Busqueda.Producto.Filtro = null;
        $scope.Busqueda.Subclase.Listado = null;
        $scope.Busqueda.Subclase.Filtro = null;
        $scope.Hoja1.Servicio.Subclase_Cod = '';
        $scope.Hoja1.Servicio.Subclase = '';

        (function () {
          $('#modal_Servicio_Prod').modal();
        }());
        $('#modal_Servicio_Prod').modal('open');
        document.getElementById("Hoja1_Servicio_Servicio").focus();
      }
      $scope.Cerrar_Modal_Servicio_Prod = function () {
        $('#modal_Servicio_Prod').modal('close');
      }
      $scope.Abrir_Modal_Servicio_ProdAnt = function () {
        $scope.HojaAnt.Servicio.Servicio_Cod = ''; $scope.HojaAnt.Servicio.Servicio = ''; $scope.BusquedaAnt.Servicio.SAVE = '';
        $scope.HojaAnt.Servicio.Prod_Cod = ''; $scope.HojaAnt.Servicio.Prod = ''; $scope.BusquedaAnt.Producto.SAVE = '';
        $scope.HojaAnt.Servicio.Valor = '';
        $scope.HojaAnt.Servicio.Cantidad = '';
        $scope.HojaAnt.Afiliado.TipoAut = '';
        $scope.HojaAnt.Afiliado.UbicacionAut = '';
        $scope.BusquedaAnt.Producto.Listado = null;
        $scope.BusquedaAnt.Producto.Filtro = null;
        $scope.BusquedaAnt.Subclase.Listado = null;
        $scope.BusquedaAnt.Subclase.Filtro = null;
        $scope.HojaAnt.Servicio.Subclase_Cod = '';
        $scope.HojaAnt.Servicio.Subclase = '';
        (function () {
          $('#modal_Servicio_ProdAnt').modal();
        }());
        $('#modal_Servicio_ProdAnt').modal('open');
        document.getElementById("HojaAnt_Servicio_Servicio").focus();
      }
      $scope.Cerrar_Modal_Servicio_ProdAnt = function () {
        $('#modal_Servicio_ProdAnt').modal('close');
      }

      $scope.Abrir_Modal_Soportes = function () {
        $scope.HojaAnt.Info.UrlSoporte = '';
        $scope.HojaAnt.Info.UrlSoporte_Nombre = '';
        (function () {
          $('#Modal_Soportes').modal();
        }());
        $('#Modal_Soportes').modal('open');
        $timeout(function () { document.querySelector('#Modal_Soportes').style.top = 5 + '%'; }, 500);
        $("#collapsible-header-Soporte-Anticipo").removeClass(function () {
          return "active";
        }); $(".collapsible").collapsible({ accordion: true }); $(".collapsible").collapsible({ accordion: false });
        $("#collapsible-header-Soporte-Tutela").removeClass(function () {
          return "active";
        }); $(".collapsible").collapsible({ accordion: true }); $(".collapsible").collapsible({ accordion: false });
      }
      $scope.Cerrar_Modal_Soportes = function () {
        $('#Modal_Soportes').modal('close');
      }

      $scope.Abrir_Modal_HistoricoAnt = function () {
        (function () {
          $('#modal_HistoricoAnt').modal();
        }());
        $('#modal_HistoricoAnt').modal('open');
      }
      $scope.Cerrar_Modal_Historico = function () {
        $('#modal_HistoricoAnt').modal('close');
      }


      $scope.Do_Imprimir = function (VAL) {
        if ($scope.HojaAnt != undefined) {
          if ($scope.HojaAnt.Info.Consecutivo != undefined && $scope.HojaAnt.Afiliado.TipoDoc != undefined && $scope.HojaAnt.Afiliado.NumeroDoc != undefined &&
            $scope.HojaAnt.Info.Status > 8) {
            var Consecutivo = $scope.stringToBinary($scope.HojaAnt.Info.Consecutivo.toString());
            var TipoDoc = $scope.stringToBinary($scope.HojaAnt.Afiliado.TipoDoc.toString());
            var NumeroDoc = $scope.stringToBinary($scope.HojaAnt.Afiliado.NumeroDoc.toString());
            if (VAL == 1) {
              const fecha = ($scope.HojaAnt.Info.Fecha_Solicitud.substr(0, 10)).split('/')
              const xfecha = new Date(`${fecha[2]}/${fecha[1]}/${fecha[0]}`);
              const fechaNew = new Date("2023/11/1")
              const fechaNew_v3 = new Date("2023/07/22")
              if (xfecha >= fechaNew_v3) {
                $window.open('views/autorizaciones/anticipos/formatosolicitudanticipo_v3.php?numero=' + Consecutivo + '&tipo=' + TipoDoc + '&doc=' + NumeroDoc, '_blank', "width=1080,height=1100");
              } else if (xfecha >= fechaNew) {
                $window.open('views/autorizaciones/anticipos/formatosolicitudanticipo_v2.php?numero=' + Consecutivo + '&tipo=' + TipoDoc + '&doc=' + NumeroDoc, '_blank', "width=1080,height=1100");
              } else {
                $window.open('views/autorizaciones/anticipos/formatosolicitudanticipo.php?numero=' + Consecutivo + '&tipo=' + TipoDoc + '&doc=' + NumeroDoc, '_blank', "width=1080,height=1100");
              }

            }
            if (VAL == 2) {
              $window.open('views/autorizaciones/anticipos/formatopertinenciamedica.php?numero=' + Consecutivo + '&tipo=' + TipoDoc + '&doc=' + NumeroDoc, '_blank', "width=1080,height=1100");
            }
            if (VAL == 3) {
              $window.open('views/autorizaciones/anticipos/formatocertificacion.php?numero=' + Consecutivo + '&tipo=' + TipoDoc + '&doc=' + NumeroDoc, '_blank', "width=1080,height=1100");
            }
          }
        }
      }

      $scope.Chg_FechRad = function () {
        if ($scope.Hoja1.Servicio.FechaRadicacion > $scope.SysDay) {
          $scope.Hoja1.Servicio.FechaRadicacion = $scope.SysDay;
          Materialize.toast('¡La fecha no puede ser mayor a la fecha actual!', 1500);
        }
        if ($scope.Hoja1.Servicio.FechaRadicacion == undefined) { $scope.Hoja1.Servicio.FechaRadicacion = $scope.SysDay; }
      }
      $scope.Chg_TextValid = function () {
        $scope.regex = '^([\\w--.,ñÑ]+(\\s){0,2})+$';
      }

      /////////////////////////////////////////PAGINACION/////////////////////////////////////////////////
      $scope.chg_filtrar = function () {
        $scope.filter($scope.Filtrar_Sol);
      }
      $scope.initPaginacion = function (info) {
        $scope.listDatosTemp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
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
          $scope.listDatosTemp = $filter('filter')($scope.datos, val);
          $scope.configPages();
          $scope.Filter_Val = val;
        } else {
          $scope.listDatosTemp = $filter('filter')($scope.datos, '');
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
      /////////////////////////////////////////PAGINACION/////////////////////////////////////////////////
      $scope.Clean_Input_Files = function (NID) {
        $("#" + NID)[0].value = "";
      }
      $scope.openInNewTab = function (url) {
        var win = window.open(url, '_blank');
        win.focus();
      }
      $scope.getBase64 = function (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

      $scope.loadFile = function (SOPORTE, SCOPE, B64, NID, NIDT) {
        var ValidarExistente = false;
        var fileInput = document.querySelector('#' + NID);
        if (SCOPE == 'CopiaCedula_URL') {
          if ($scope.Hoja1.Soportes.CopiaCedula_VAL == 1) {
            ValidarExistente = true;
          }
        }
        if (SCOPE == 'CopiaAdres_URL') {
          if ($scope.Hoja1.Soportes.CopiaAdres_VAL == 1) {
            ValidarExistente = true;
          }
        }
        if (ValidarExistente != true) {
          if (fileInput.files.length != 0) {
            var x = fileInput.files[0].name.split('.');
            if (x[x.length - 1].toUpperCase() == 'PDF') {
              if (fileInput.files.length > 0) {
                var Repetidos = false;
                for (var i = 0; i < document.querySelectorAll('.Hoja1_Archivos').length; i++) {
                  if (document.querySelectorAll('.Hoja1_Archivos')[i].id != NIDT && document.querySelector('#' + NIDT).value == document.querySelectorAll('.Hoja1_Archivos')[i].value) {
                    Repetidos = true;
                  }
                }
                if (Repetidos != true) {
                  if (fileInput.files[0].size < 7340032 && fileInput.files[0].size > 0) {
                    $scope.getBase64(fileInput.files[0]).then(function (result) {
                      $http({
                        method: 'POST',
                        url: "php/autorizaciones/anticipos/anticipos.php",
                        data: {
                          function: 'Base64',
                          Base64: result,
                          name: NID
                        }
                      }).then(function (response) {
                        $scope.Hoja1[SOPORTE][SCOPE] = response.data + "?page=hsn#toolbar=0";
                        $timeout(function () {
                          angular.forEach(document.querySelectorAll('.Iframe'), function (i) {
                            i.style.width = (document.querySelector('#AdjustSop').offsetWidth - 6) + 'px';
                          });
                        }, 200);
                      });
                      $scope.Hoja1[SOPORTE][B64] = result;
                      $timeout(function () { $scope.$apply(); }, 300);
                    });
                  } else {
                    swal('Advertencia', '¡El archivo seleccionado excede el peso máximo posible (7MB)!', 'info');
                    fileInput.value = '';
                    document.querySelector('#' + NIDT).value = '';
                    $scope.Hoja1[SOPORTE][SCOPE] = '';
                    $scope.Hoja1[SOPORTE][B64] = '';
                    $timeout(function () { $scope.$apply(); }, 300);
                  }
                } else {
                  swal('Advertencia', '¡Este archivo ya ha sido seleccionado!', 'info');
                  fileInput.value = '';
                  document.querySelector('#' + NIDT).value = '';
                  $scope.Hoja1[SOPORTE][SCOPE] = '';
                  $scope.Hoja1[SOPORTE][B64] = '';
                  $timeout(function () { $scope.$apply(); }, 300);
                }
              }
            } else {
              swal('Advertencia', '¡El archivo seleccionado deber ser formato PDF!', 'info');
              fileInput.value = '';
              document.querySelector('#' + NIDT).value = '';
              $scope.Hoja1[SOPORTE][SCOPE] = '';
              $scope.Hoja1[SOPORTE][B64] = '';
              $timeout(function () { $scope.$apply(); }, 300);
            }
          } else {
            $scope.Hoja1[SOPORTE][SCOPE] = '';
            $scope.Hoja1[SOPORTE][B64] = '';
            $timeout(function () { $scope.$apply(); }, 300);
          }
        } else {
          swal('Advertencia', '¡Ya existe un archivo en el sistema!', 'info');
        }
      }

      $scope.loadFileAnt = function (SOPORTE, SCOPE, B64, NID, NIDT) {
        var ValidarExistente = false;
        var fileInput = document.querySelector('#' + NID);
        if (SCOPE == 'CopiaCedula_URL') {
          if ($scope.HojaAnt.Soportes.CopiaCedula_VAL == 1) {
            ValidarExistente = true;
          }
        }
        if (SCOPE == 'CopiaAdres_URL') {
          if ($scope.HojaAnt.Soportes.CopiaAdres_VAL == 1) {
            ValidarExistente = true;
          }
        }
        if (ValidarExistente != true) {
          if (fileInput.files.length != 0) {
            var x = fileInput.files[0].name.split('.');
            if (x[x.length - 1].toUpperCase() == 'PDF') {
              if (fileInput.files.length > 0) {
                var Repetidos = false;
                for (var i = 0; i < document.querySelectorAll('.HojaAnt_Archivos').length; i++) {

                  if (document.querySelectorAll('.HojaAnt_Archivos')[i].id != NIDT && document.querySelector('#' + NIDT).value == document.querySelectorAll('.HojaAnt_Archivos')[i].value) {
                    Repetidos = true;
                  }
                }
                if (Repetidos != true) {
                  if (fileInput.files[0].size < 7340032 && fileInput.files[0].size > 0) {
                    $scope.getBase64(fileInput.files[0]).then(function (result) {
                      $http({
                        method: 'POST',
                        url: "php/autorizaciones/anticipos/anticipos.php",
                        data: {
                          function: 'Base64',
                          Base64: result,
                          name: NID
                        }
                      }).then(function (response) {
                        $scope.HojaAnt[SOPORTE][SCOPE] = response.data + "?page=hsn#toolbar=0";
                        if (SCOPE == 'CopiaPagaduria_URL') {
                          $timeout(function () {
                            document.querySelector('#Iframe_Pag').style.width = (document.querySelector('#AdjustSop_Pag').offsetWidth - 6) + 'px';
                            $scope.$apply();
                          }, 200);
                        } else if (SCOPE == 'Soporte_PrestacionEfectiva_URL') {
                          $timeout(function () {
                            document.querySelector('#Iframe_Prest_Efec').style.width = (document.querySelector('#AdjustSop_Prest_Efec').offsetWidth - 6) + 'px';
                            $scope.$apply();
                          }, 200);
                        } else {
                          $timeout(function () {
                            angular.forEach(document.querySelectorAll('.Iframe'), function (i) {
                              i.style.width = (document.querySelector('#AdjustSop2').offsetWidth - 6) + 'px';
                            });
                            $scope.$apply();
                          }, 200);
                        }
                      });
                      $scope.HojaAnt[SOPORTE][B64] = result;
                      $timeout(function () { $scope.$apply(); }, 300);
                    });
                  } else {
                    swal('Advertencia', '¡El archivo seleccionado excede el peso máximo posible (7MB)!', 'info');
                    fileInput.value = '';
                    document.querySelector('#' + NIDT).value = '';
                    $scope.HojaAnt[SOPORTE][SCOPE] = null;
                    $scope.HojaAnt[SOPORTE][B64] = '';
                    $timeout(function () { $scope.$apply(); }, 300);
                  }
                } else {
                  swal('Advertencia', '¡Este archivo ya ha sido seleccionado!', 'info');
                  fileInput.value = '';
                  document.querySelector('#' + NIDT).value = '';
                  $scope.HojaAnt[SOPORTE][SCOPE] = null;
                  $scope.HojaAnt[SOPORTE][B64] = '';
                  $timeout(function () { $scope.$apply(); }, 300);
                }
              }
            } else {
              swal('Advertencia', '¡El archivo seleccionado deber ser formato PDF!', 'info');
              fileInput.value = '';
              document.querySelector('#' + NIDT).value = '';
              $scope.HojaAnt[SOPORTE][SCOPE] = null;
              $scope.HojaAnt[SOPORTE][B64] = '';
              $timeout(function () { $scope.$apply(); }, 300);
            }
          } else {
            $scope.HojaAnt[SOPORTE][SCOPE] = null;
            $scope.HojaAnt[SOPORTE][B64] = '';
            $timeout(function () { $scope.$apply(); }, 300);
          }
        } else {
          swal('Advertencia', '¡Ya existe un archivo en el sistema!', 'info');
        }
      }
      /////////////Descargar archivo/////////////////

      $scope.DescargaArchivo = function (RUTA) {
        $http({
          method: 'POST',
          url: "php/autorizaciones/anticipos/anticipos.php",
          data: {
            function: 'descargaAdjunto',
            ruta: RUTA
          }
        }).then(function (response) {
          window.open("temp/" + response.data + "?page=hsn#toolbar=0");
        });
      }

      $scope.Descargafile_Soportes = function (x, INDEX, SCOPE, y) {
        $http({
          method: 'POST',
          url: "php/autorizaciones/anticipos/anticipos.php",
          data: {
            function: 'descargaAdjunto',
            ruta: x.RUTA
          }
        }).then(function (response) {
          if (response.data.toString().substr(0, 1) != '0') {
            if (SCOPE != 'HojaAnt_Soportes_Tutela_Incidentes') {
              $scope.HojaAnt.Info.UrlSoporte_Nombre = x.NOMBRE;
              $scope[SCOPE][INDEX].URL = "temp/" + response.data + "?page=hsn#toolbar=0";
              $scope.HojaAnt.Info.UrlSoporte = "temp/" + response.data + "?page=hsn#toolbar=0";
            } else {
              $scope.HojaAnt.Info.UrlSoporte_Nombre = $scope.HojaAnt_Soportes_Tutela_Incidentes[y.INCIDENTE].LISTA[INDEX].NOMBRE;
              $scope.HojaAnt_Soportes_Tutela_Incidentes[y.INCIDENTE].LISTA[INDEX].URL = "temp/" + response.data + "?page=hsn#toolbar=0";
              $scope.HojaAnt.Info.UrlSoporte = "temp/" + response.data + "?page=hsn#toolbar=0";
            }
          } else {
            $scope.HojaAnt.Info.UrlSoporte = '';
            $scope.HojaAnt.Info.UrlSoporte_Nombre = '';
            swal({
              title: "¡Mensaje!",
              text: "No se encontro el soporte, por favor informar al area Tic.",
              type: "info"
            }).catch(swal.noop);
          }
        });
      }

      ///////////////Tabla Solicitudes Return////////////////////
      $scope.Estado_Solicitud_Tooltip = function (Estado) {
        if (Estado.toString().toUpperCase() == 'A') {
          return "Activo"
        }
        if (Estado.toString().toUpperCase() == 'P') {
          return "Procesado"
        }
        if (Estado.toString().toUpperCase() == 'D') {
          return "Devolución"
        }
        if (Estado.toString().toUpperCase() == 'X') {
          return "Anulado"
        }
      }

      $scope.Estado_Solicitud_Color = function (Estado) {
        if (Estado.toString().toUpperCase() == 'A') {
          return { "background-color": "rgb(3, 197, 20) !important;" }
        }
        if (Estado.toString().toUpperCase() == 'P') {
          return { "background-color": "rgb(71, 71, 165)!important" }
        }
        if (Estado.toString().toUpperCase() == 'D') {
          return { "background-color": "rgb(235, 156, 5) !important;" }
        }
        if (Estado.toString().toUpperCase() == 'X') {
          return { "background-color": "rgb(245, 75,75) !important" }
        }
      }

      $scope.Estado_Solicitud_Clase = function (Estado) {
        if (Estado.toString().toUpperCase() == 'A') {
          return "Con_pulse_A"
        }
        if (Estado.toString().toUpperCase() == 'P') {
          return "Con_pulse_P"
        }
        if (Estado.toString().toUpperCase() == 'D') {
          return "Con_pulse_D"
        }
        if (Estado.toString().toUpperCase() == 'X') {
          return "Con_pulse_X"
        }
      }

      $scope.Estado_Solicitud = function (n) {
        if (n.toString().toUpperCase() == 'A') {
          return { "filter": "hue-rotate(230deg) contrast(1)", "width": "40px" }
        }
        if (n.toString().toUpperCase() == 'P') {
          return { "filter": "hue-rotate(120deg) contrast(1)", "width": "40px" }
        }
        if (n.toString().toUpperCase() == 'D') {
          return { "filter": "hue-rotate(60deg) contrast(1)", "width": "40px" }
        }
        if (n.toString().toUpperCase() == 'X') {
          return { "filter": "hue-rotate(0deg) contrast(1)", "width": "40px" }
        }
      }
      ///
      $scope.Estatus_Solicitud_Tooltip = function (Estado, Estatus) {
        if (Estado.toString().toUpperCase() == 'A') {
          if (Estatus == 0) {
            return "Creado"
          }
          if (Estatus > 0) {
            return "Aprobado"
          }
        }
        if (Estado.toString().toUpperCase() == 'P') {
          return "Procesado"
        }
        if (Estado.toString().toUpperCase() == 'D') {
          return "Devolución"
        }
        if (Estado.toString().toUpperCase() == 'X') {
          return "Anulado"
        }
      }

      $scope.Estatus_Solicitud_Clase = function (Estado, Estatus) {
        if (Estado.toString().toUpperCase() == 'A') {
          if (Estatus == 0) {
            return "icon-circle-empty"
          }
          if (Estatus > 0) {
            return "icon-ok-circled2"
          }
        }
        //
        if (Estado.toString().toUpperCase() == 'P') {
          return "icon-thumbs-up"
        }
        if (Estado.toString().toUpperCase() == 'D') {
          return "icon-ccw-1"
        }
        if (Estado.toString().toUpperCase() == 'X') {
          return "icon-cancel-circled2"
        }
      }

      $scope.Cargo_Responsables = function (n, e) {
        if (e == 'X') {
          n = n - 1;
        }
        if (n.toString() == '1' || n.toString() == '0' || e == 'D') {
          return "Asistente Regional De Autorizaciones"
        }
        if (n.toString() == '2') {
          return "Auditor Médico Regional"
        }
        if (n.toString() == '3') {
          return "Gerente Regional"
        }
        if (n.toString() == '4') {
          return "Asistente Nacional De Autorizaciones"
        }
        if (n.toString() == '5') {
          return "Especialista Nacional De Autorizaciones"
        }
        if (n.toString() == '6') {
          return "Coordinador Nacional De Autorizaciones"
        }
        if (n.toString() == '7') {
          return "Subdirector Nacional De Servicios De Salud"
        }
        if (n.toString() == '8') {
          return "Subgerente General"
        }
        if (n.toString() == '9') {
          return "Asistente Nacional De Pagaduría"
        }
        if (n.toString() == '10') {
          return "Asistente Nacional De Autorizaciones"
        }
        if (n.toString() == '11') {
          return "Asistente Nacional De Autorizaciones"
        }
        if (n.toString() == '12') {
          return "Prestacion Efectiva"
        }
      }

      $scope.HojaAnt_Estado_Sol = function (n) {
        if (n != undefined) {
          if (n.toString().toUpperCase() == 'A') {
            return "ACTIVO"
          }
          if (n.toString().toUpperCase() == 'P') {
            return "PROCESADO"
          }
          if (n.toString().toUpperCase() == 'D') {
            return "DEVUELTO"
          }
          if (n.toString().toUpperCase() == 'X') {
            return "ANULADO"
          }
        }
      }

      //////////////////////////////
      ////////ScrollDown/////////
      $scope.ScrollDown = function (DIV) {
        $timeout(function () {
          document.getElementById(DIV).scrollIntoView({ block: 'start', behavior: 'smooth' });
        }, 100);
      }

      $scope.StepCSSTabs = function (value, estado) {
        $('.steps').removeClass('pulsate');
        if (estado == 'A') {
          for (var i = value; i <= 10; i++) {
            if (i == value) {
              $("#paso" + i).addClass('pulsate');
            }
          }
        }

        if (estado == 'P') {
          $('.steps').removeClass('active');
          for (let i = 1; i <= 11; i++) {
            $("#paso" + i).addClass('active');
          }
        } else {
          if (estado == 'A') {
            $('.steps').removeClass('active');
            for (let i = 1; i <= value; i++) {
              $("#paso" + i).addClass('active');
            }
          } else {
            $('.steps').removeClass('active');
            for (let i = 1; i < value; i++) {
              $("#paso" + i).addClass('active');
            }
          }
        }
      }
      ////////////FORMAT VALOR//////////////////
      $scope.FormatSoloTexto = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/[^a-z0-9 -+,]/gi, '');
        input.value = valor.toString().toUpperCase();
      }

      $scope.FormatSoloTextoNumero = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/\-/g, '');
        valor = valor.replace(/[a-zA-Z]/g, '');
        valor = valor.replace(/[^0-9]/g, '');
        valor = valor.replace(/\./g, '');
        input.value = valor;
      }
      $scope.FormatSoloNumero = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/[^0-9]/g, '');
        input.value = valor;
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
      $scope.FormatTexto = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/[|°"#$%&''´¨´¨¨¨<>]/g, '');
        input.value = valor;
      }
      $scope.formatDate = function (date) {
        if (date === undefined) { return }
        var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('/');
        // return [year, month, day].join('-');
      }

      $scope.console = function (x) {
        console.log(x);
        console.log(x.length);
      }
      $scope.SetTab = function (x) {
        $scope.Tabs = x;
        $scope.Hoja_Usuario = false;
      }

      $scope.propertyName = 'CONSECUTIVO';
      $scope.reverse = true;
      $scope.sortBy = function (propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
      };



      $scope.getNum = function (val) {
        if (isNaN(val)) {
          return 0;
        }
        return val;
      }

      $scope.stringToBinary = function (input) {
        var characters = input.split('');
        return characters.map(function (char) {
          const binary = char.charCodeAt(0).toString(2)
          const pad = Math.max(8 - binary.length, 0);
          // Just to make sure it is 8 bits long.
          return '0'.repeat(pad) + binary;
        }).join('');
      }

      $scope.angel = 0;
      $scope.RotarDer = function () {
        $('#Girar_Img').removeClass('rotate90');
        $('#Girar_Img').removeClass('rotate180');
        $('#Girar_Img').removeClass('rotate270');
        $scope.angel = ($scope.angel + 90) % 360;
        $('#Girar_Img').addClass('rotate' + $scope.angel);
        $('#Girar_Img').removeClass('rotate0');
      }

      // $scope.HojaAnt_Check_Advertencia = function (index) {
      //   $scope.HojaAnt.Advertencias[index].CHECK = !$scope.HojaAnt.Advertencias[index].CHECK;
      //   console.table($scope.HojaAnt.Advertencias);
      //   console.table($scope.Check_Advertencia);
      // };

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.Abrir_Modal_Reporte_Registros = function (X) {
        (function () {
          $('#modal_Reporte_Diario_Mensual').modal();
        }());
        $('#modal_Reporte_Diario_Mensual').modal('open');
        $scope.Rep_Registros = {
          F_Inicio: $scope.SysDay,
          F_Fin: $scope.SysDay,
          Tipo: 'D',
          Estado: '',
          Seccional: ''

        }
      }
      $scope.Cerrar_Modal_Reporte_Registros = function () {
        $('#modal_Reporte_Diario_Mensual').modal('close');
      }

      $scope.NgChange_F_Inicio_F_Fin = function () {
        if ($scope.Rep_Registros) {
          if ($scope.Rep_Registros.F_Inicio == undefined || $scope.Rep_Registros.F_Fin == undefined) {
            $scope.Rep_Registros.F_Inicio = $scope.SysDay;
            $scope.Rep_Registros.F_Fin = $scope.SysDay;
          }
        }
      }

      $scope.Generar_Registro_Diario_Mensual = function (x) {
        if ($scope.Rep_Registros.F_Inicio != undefined && $scope.Rep_Registros.F_Fin != undefined) {
          if ($scope.Rep_Registros.F_Inicio <= $scope.Rep_Registros.F_Fin) {
            var xFecha_Inicio = $scope.Rep_Registros.F_Inicio;
            var Fecha_Inicio = xFecha_Inicio.getFullYear() + '/' + (((xFecha_Inicio.getMonth() + 1) < 10) ? '0' + (xFecha_Inicio.getMonth() + 1) : (xFecha_Inicio.getMonth() + 1)) + '/' + xFecha_Inicio.getUTCDate();
            var xFecha_Fin = $scope.Rep_Registros.F_Fin;
            var Fecha_Fin = xFecha_Fin.getFullYear() + '/' + (((xFecha_Fin.getMonth() + 1) < 10) ? '0' + (xFecha_Fin.getMonth() + 1) : (xFecha_Fin.getMonth() + 1)) + '/' + xFecha_Fin.getUTCDate();
            if (x == 'D') {
              $window.open('views/autorizaciones/anticipos/formatoregistrodiario.php?&fecha_i=' + Fecha_Inicio + '&fecha_f=' + Fecha_Fin + '&estado=' + $scope.Rep_Registros.Estado + '&seccional=' + $scope.Rep_Registros.Seccional);
            }
            if (x == 'M') {
              $window.open('views/autorizaciones/anticipos/formatoregistromensual.php?&fecha_i=' + Fecha_Inicio + '&fecha_f=' + Fecha_Fin + '&estado=' + $scope.Rep_Registros.Estado + '&seccional=' + $scope.Rep_Registros.Seccional);
            }
            if (x == 'IA') {
              $window.open('views/autorizaciones/anticipos/formatoanticiposanulados.php?&fecha_i=' + Fecha_Inicio + '&fecha_f=' + Fecha_Fin + '&seccional=' + $scope.Rep_Registros.Seccional);
            }
            if (x == 'ID') {
              $window.open('views/autorizaciones/anticipos/formatoanticiposdevueltos.php?&fecha_i=' + Fecha_Inicio + '&fecha_f=' + Fecha_Fin + '&seccional=' + $scope.Rep_Registros.Seccional);
            }
          } else {
            Materialize.toast('¡La fecha de inicio debe ser menor a la fecha final!', 1000);
          }
        }

      }
      ////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////
      $scope.Calc_Anio = function () {
        var fecha = new Date();
        var x = fecha.getFullYear();
        x = x.toString().substr(2, 4);
        $scope.EST_Anio_Array = [];
        for (let i = 19; i <= x; i++) {
          if ($scope.EST_Anio_Array.length >= 1) {
            $scope.EST_Anio_Array.push({ pos: i });
          } else {
            $scope.EST_Anio_Array = [{ pos: i }];
          }
        }
      }
      $scope.Calc_Anio();
      $scope.Abrir_Modal_Reporte_Graficos = function (X) {
        (function () {
          $('#modal_Reporte_Graficos').modal();
        }());
        $('#modal_Reporte_Graficos').modal('open');
        $scope.Rep_Grafico = {
          Grafico_Elegido: '',
          Grafico_Elegido_Nombre: '',
          Habilitar_MesAnio: false,
          Mes: '',
          Anio: '',
        }
      }
      $scope.Cerrar_Modal_Reporte_Graficos = function () {
        $('#modal_Reporte_Graficos').modal('close');
      }
      $scope.Atras_Modal_Reporte_Graficos = function () {
        $scope.Rep_Grafico = null;
        $scope.Rep_Grafico = {
          Grafico_Elegido: '',
          Grafico_Elegido_Nombre: '',
          Habilitar_MesAnio: false,
          Mes: '',
          Anio: '',
        }
      }


      $scope.Elegir_Grafico = function (x) {
        if (x == 1) {
          $scope.Rep_Grafico.Grafico_Elegido = 1;
          $scope.Rep_Grafico.Habilitar_MesAnio = true;
          $scope.Grafico_Ips();
        }
        if (x == 2) {
          $scope.Rep_Grafico.Grafico_Elegido = 2;
          $scope.Rep_Grafico.Habilitar_MesAnio = true;
          $scope.Grafico_Servicios();
        }
        if (x == 3) {
          $scope.Rep_Grafico.Grafico_Elegido = 3;
          $scope.Rep_Grafico.Habilitar_MesAnio = true;
          $scope.Grafico_Seccionales();
        }
        if (x == 4) {
          $scope.Rep_Grafico.Grafico_Elegido = 4;
          $scope.Rep_Grafico.Habilitar_MesAnio = true;
          $scope.Grafico_Enfermedades();
        }

        if (x == 5) {
          $scope.Rep_Grafico.Grafico_Elegido = 5;
          $scope.Rep_Grafico.Habilitar_MesAnio = false;
          $scope.Grafico_Linea_De_Tiempo();
        }
      }

      $scope.Grafico_Ips = function () {
        $http({
          method: 'POST',
          url: "php/autorizaciones/anticipos/anticipos.php",
          data: {
            function: 'Grafico_Ips',
            mes: $scope.Rep_Grafico.Mes,
            anio: $scope.Rep_Grafico.Anio
          }
        }).then(function (response) {
          if (response.data) {
            $scope.Grafico = response.data;
            var chart = Highcharts.chart('container', {
              chart: {
                type: 'column'
              },
              title: {
                text: 'Anticipos Por Ips'
              },
              xAxis: {
                type: 'category'
              },
              yAxis: {
                title: {
                  text: 'Anticipos Por Ips Procesados'
                }
              },
              plotOptions: {
                series: {
                  borderWidth: 0,
                  dataLabels: {
                    enabled: false,
                    format: '<span style="color:{point.color};font-size:20px">{point.y:.0f}</span>',
                  }
                },
                column: {
                  colorByPoint: true,
                  borderRadius: 9,
                  shadow: true,
                  animation: {
                    duration: 1500
                  }
                }
              },
              legend: {
                enabled: false
              },
              credits: {
                enabled: false
              },
              colors: ['#1a2e63', '#1565c0', '#00abc0', '#558a2f', '#6a1b99',
                '#f0a42f', '#2e2e2e', '#e14242'],
              tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>${point.y:,.1f}</b><br/><span style="color:{point.color}">CANTIDAD: </span> <b>{point.cantidad:.0f}</b> Anticipos<br/><br/><span style="color:{point.color}">PORCENTAJE: </span> <b>{point.porcentaje:.1f}%</b><br/>'
              },
              "series": [
                {
                  name: 'Anticipos Por Ips',
                  colorByPoint: true,
                  data: response.data
                }
              ]

            });
          }
        });
      }

      $scope.Grafico_Servicios = function () {
        $http({
          method: 'POST',
          url: "php/autorizaciones/anticipos/anticipos.php",
          data: {
            function: 'Grafico_Servicios',
            mes: $scope.Rep_Grafico.Mes,
            anio: $scope.Rep_Grafico.Anio
          }
        }).then(function (response) {
          if (response.data) {
            $scope.Grafico = response.data;
            var chart = Highcharts.chart('container', {
              chart: {
                type: 'column'
              },
              title: {
                text: 'Anticipos Por Servicio'
              },
              xAxis: {
                type: 'category'
              },
              yAxis: {
                title: {
                  text: 'Anticipos Por Servicio Procesados'
                }
              },
              plotOptions: {
                series: {
                  borderWidth: 0,
                  dataLabels: {
                    enabled: false,
                    format: '<span style="color:{point.color};font-size:20px">{point.y:.0f}</span>',
                  }
                },
                column: {
                  colorByPoint: true,
                  borderRadius: 9,
                  shadow: true,
                  animation: {
                    duration: 1500
                  }
                }
              },
              legend: {
                enabled: false
              },
              credits: {
                enabled: false
              },
              colors: ['#1a2e63', '#1565c0', '#00abc0', '#558a2f', '#6a1b99',
                '#f0a42f', '#2e2e2e', '#e14242'],
              tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>${point.y:,.1f}</b><br/><span style="color:{point.color}">CANTIDAD: </span> <b>{point.cantidad:.0f}</b> Anticipos<br/><br/><span style="color:{point.color}">PORCENTAJE: </span> <b>{point.porcentaje:.1f}%</b><br/>'
              },
              "series": [
                {
                  name: 'Anticipos Por Servicio',
                  colorByPoint: true,
                  data: response.data
                }
              ]

            });
          }
        });
      }

      $scope.Grafico_Enfermedades = function () {
        $http({
          method: 'POST',
          url: "php/autorizaciones/anticipos/anticipos.php",
          data: {
            function: 'Grafico_Enfermedades',
            mes: $scope.Rep_Grafico.Mes,
            anio: $scope.Rep_Grafico.Anio
          }
        }).then(function (response) {
          if (response.data) {
            $scope.Grafico = response.data;
            var chart = Highcharts.chart('container', {
              chart: {
                type: 'column'
              },
              title: {
                text: 'Anticipos Por Enfermedades Huérfanas'
              },
              xAxis: {
                type: 'category'
              },
              yAxis: {
                title: {
                  text: 'Anticipos Por Enfermedades Huérfanas Procesados'
                }
              },
              plotOptions: {
                series: {
                  borderWidth: 0,
                  dataLabels: {
                    enabled: false,
                    format: '<span style="color:{point.color};font-size:20px">{point.y:.0f}</span>',
                  }
                },
                column: {
                  colorByPoint: true,
                  borderRadius: 9,
                  shadow: true,
                  animation: {
                    duration: 1500
                  }
                }
              },
              legend: {
                enabled: false
              },
              credits: {
                enabled: false
              },
              colors: ['#1a2e63', '#1565c0', '#00abc0', '#558a2f', '#6a1b99',
                '#f0a42f', '#2e2e2e', '#e14242'],
              tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>${point.y:,.1f}</b><br/><span style="color:{point.color}">CANTIDAD: </span> <b>{point.cantidad:.0f}</b> Anticipos<br/><br/><span style="color:{point.color}">PORCENTAJE: </span> <b>{point.porcentaje:.1f}%</b><br/><br/><br/><span style="color:{point.color}">SECCIONAL: </span> <b>{point.seccional}</b><br/><br/><br/><span style="color:{point.color}">SERVICIOS: </span> <b>{point.servicio}</b><br/><br/><br/><span style="color:{point.color}">PRESTADOR: </span> <b>{point.prestador}</b><br/>'
              },
              "series": [
                {
                  name: 'Anticipos Por Enfermedades Huérfanas',
                  colorByPoint: true,
                  data: response.data
                }
              ]

            });
          }
        });
      }

      $scope.Grafico_Seccionales = function () {
        $http({
          method: 'POST',
          url: "php/autorizaciones/anticipos/anticipos.php",
          data: {
            function: 'Grafico_Seccionales',
            mes: $scope.Rep_Grafico.Mes,
            anio: $scope.Rep_Grafico.Anio
          }
        }).then(function (response) {
          if (response.data) {
            $scope.Grafico = response.data;
            var chart = Highcharts.chart('container', {
              chart: {
                type: 'column'
              },
              title: {
                text: 'Anticipos Por Seccionales'
              },
              xAxis: {
                type: 'category'
              },
              yAxis: {
                title: {
                  text: 'Anticipos Por Seccionales Procesados'
                }
              },
              plotOptions: {
                series: {
                  borderWidth: 0,
                  dataLabels: {
                    enabled: false,
                    format: '<span style="color:{point.color};font-size:20px">{point.y:.0f}</span>',
                  }
                },
                column: {
                  colorByPoint: true,
                  borderRadius: 9,
                  shadow: true,
                  animation: {
                    duration: 1500
                  }
                }
              },
              legend: {
                enabled: false
              },
              credits: {
                enabled: false
              },
              colors: ['#1a2e63', '#1565c0', '#00abc0', '#558a2f', '#6a1b99',
                '#f0a42f', '#2e2e2e', '#e14242'],
              tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>${point.y:,.1f}</b><br/><span style="color:{point.color}">CANTIDAD: </span> <b>{point.cantidad:.0f}</b> Anticipos<br/><br/><span style="color:{point.color}">PORCENTAJE: </span> <b>{point.porcentaje:.1f}%</b><br/>'
              },
              "series": [
                {
                  name: 'Anticipos Por Seccionales',
                  colorByPoint: true,
                  data: response.data
                }
              ]

            });
          }
        });
      }

      $scope.Grafico_Linea_De_Tiempo = function () {
        swal({ title: 'Cargando...', allowOutsideClick: false }).catch(swal.noop);
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/autorizaciones/anticipos/anticipos.php",
          data: {
            function: 'Grafico_Linea_De_Tiempo',
          }
        }).then(function (response) {
          swal.close();
          if (response.data != undefined) {
            var chart = Highcharts.chart('container', {
              chart: {
                type: 'areaspline'
              },
              title: {
                text: 'Línea de Tendencia - Anticipos'
              },
              xAxis: {
                categories: [
                  'Enero',
                  'Febrero',
                  'Marzo',
                  'Abril',
                  'Mayo',
                  'Junio',
                  'Julio',
                  'Agosto',
                  'Septiembre',
                  'Octubre',
                  'Noviembre',
                  'Diciembre',
                ]
              },
              yAxis: {
                title: {
                  text: 'Línea de Tendencia'
                }
              },
              tooltip: {
                shared: true,
                valueSuffix: ' Pesos'
              },
              credits: {
                enabled: false
              },
              colors: ['#1a2e63', '#1565c0', '#00abc0', '#558a2f', '#6a1b99',
                '#f0a42f', '#2e2e2e', '#e14242'],
              plotOptions: {
                areaspline: {
                  fillOpacity: 0.5
                }
              },
              series: response.data
            });
          }
        });
      }



      $scope.tiempo = 100;
      var stop;
      $scope.fight = function () {
        if (angular.isDefined(stop)) return;
        stop = $interval(function () {
          if ($scope.tiempo > 0) {
            $scope.tiempo = $scope.tiempo - 3;
          } else {
            $scope.stopFight();
          }
        }, 100);
      };

      $scope.stopFight = function () {
        if (angular.isDefined(stop)) {
          $interval.cancel(stop);
          stop = undefined;
          // $scope.Ver_Grafico($scope.Grafico_TIPO, $scope.Grafico_GRAF);
          $scope.Elegir_Grafico($scope.Rep_Grafico.Grafico_Elegido);
          $scope.resetFight();
        }
      };

      $scope.resetFight = function () {
        $scope.tiempo = 100;
      };

      $scope.$on('$destroy', function () {
        $scope.stopFight();
      })
      $scope.change_temp = function () {
        if ($scope.tiempo == 100) {
          $scope.fight();
        } else if ($scope.tiempo != 100) {
          $scope.resetFight();
          $scope.change_temp();
        }
      }

      // tunja-15001
      // chiquinquira-15176
      // moniquira-15469
      // garagoa-15299
      // zogamoso-15759

      $scope.Imprimir = function () {
        $('#modal_signature').modal();
        $('#modal_signature').modal('open');
        // $window.open('views/autorizaciones/anticipos/formatos_Oficio.php?_blank', "width=1080,height=1100");
      }


      //Guardar Codigo de Verificacion
      $scope.DB_Codigo = function () {
        var xdata = {
          Afi_TipoDoc: $scope.HojaAnt.Afiliado.TipoDoc,
          Afi_NumeroDoc: $scope.HojaAnt.Afiliado.NumeroDoc,
          Func_Rol_Cedula: $scope.Rol_Cedula,
          Codigo: $scope.Cdigo_Verificacion,
          Accion: 'I'
        };
        $http({
          method: 'POST',
          url: "php/autorizaciones/anticipos/anticipos.php",
          data: {
            function: 'Guardar_Codigo',
            Numero: $scope.HojaAnt.Info.Consecutivo,
            xdata: JSON.stringify(xdata),
          }
        }).then(function (response) {
          // console.log(response.data);
        });
      }

      //Consultar Codigo de Verificacion
      $scope.DB_Consultar_Codigo = function () {
        var defered = $q.defer();
        var promise = defered.promise;
        defered.resolve(1);
        return promise;
      }

      ///Recolecion de firmas
      $scope.DB_Firmar = function () {
        // $scope.Inicio_Firma(response.data.nombre)
        swal({
          title: 'Ingrese la cédula del funcionario',
          text: 'Digite la cédula del funcionario para almacenar su firma',
          input: 'text',
          inputPlaceholder: 'Ingrese la cédula...',
          inputValue: '',
          showCancelButton: false,
          confirmButtonText: "Guardar",
          cancelButtonText: "Cancelar",
          allowOutsideClick: false
        }).then(function (result) {
          if (result) {
            $http({
              method: 'POST',
              url: "php/autorizaciones/anticipos/anticipos.php",
              data: {
                function: 'Consultar_Usuario_Nuevo',
                ced: result
              }
            }).then(function (response) {
              if (response.data != undefined) {
                if (response.data.codigo == 0) {
                  $scope.Firma = "";//firma
                  $scope.Firma_Doc = result;
                  $http({
                    method: 'POST',
                    url: "php/autorizaciones/anticipos/anticipos.php",
                    data: {
                      function: 'Baseimg',
                      Base64: $scope.Firma
                    }
                  }).then(function (response) {
                    $scope.DB_Firma_URL = response.data;
                    $scope.DB_Guardar_Firma();
                  });
                }
                if (response.data.codigo == 1) {
                  swal({
                    title: "Mensaje",
                    text: response.data.nombre,
                    type: "warning",
                  }).catch(swal.noop);
                }
              }
            });

          }
        });
      }

      $scope.DB_Guardar_Firma = function () {
        swal({
          title: "¿Desea guardar la firma?",
          // type: "success",
          imageUrl: $scope.DB_Firma_URL,
          imageWidth: 200,
          imageHeight: 100,
          showCancelButton: true,
          confirmButtonText: "Guardar",
          cancelButtonText: "Cancelar",
          allowOutsideClick: false

        }).then(function (result) {
          if (result) {
            $http({
              method: 'POST',
              url: "php/autorizaciones/anticipos/anticipos.php",
              data: {
                function: 'Guardar_Firma',
                signature: $scope.Firma,
                ced: $scope.Firma_Doc,
              }
            }).then(function (response) {
              if (response.data != undefined) {
                if (response.data.codigo == 0) {
                  swal({
                    title: "Mensaje",
                    text: response.data.mensaje,
                    type: "success",
                  }).catch(swal.noop);
                }
                if (response.data.codigo == 1) {
                  swal({
                    title: "Mensaje",
                    text: response.data.mensaje,
                    type: "warning",
                  }).catch(swal.noop);
                }
              }
            });
          }
        }).catch(swal.noop);

      }
      ////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////

      $scope.Find_Ubi = function (Aut) {
        var xArray = [
          { "Aut": 1181237 },
          { "Aut": 1174679 },
          { "Aut": 1182334 }
        ]
        var Find = false;
        xArray.forEach(e => {
          if (e.Aut == Aut) {
            Find = true;
          }
        });
        return (Find == true) ? 1 : $scope.HojaAnt.Info.Ubicacion_Cod;
      }


      $scope.Ver_Aut = function (Num_Aut, Ubi) {
        (function () {
          $('#modal_Aut').modal();
        }());
        $('#modal_Aut').modal('open');
        $timeout(function () { document.querySelector('#modal_Aut').style.top = 5 + '%'; }, 1000);
        $scope.buscarAfiliado($scope.HojaAnt.Afiliado.TipoDoc, $scope.HojaAnt.Afiliado.NumeroDoc);
        $scope.consultarAutorizacion(Num_Aut, Ubi);
      }

      $scope.buscarAfiliado = function (tipodocumento, documento) {
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
          data: { function: 'obtenerafiliados', tipodocumento: tipodocumento, documento: documento }
        }).then(function (response) {
          if (response.data.CODIGO != "0") {
            $scope.infoafiliadoautedit = null;
            $scope.infoafiliadoautedit = response.data;
            $scope.calcularEdad(response.data.FechaNacimiento);
          } else {
            swal('Importante', response.data.NOMBRE, 'info')
          }
        });
      }

      $scope.consultarAutorizacion = function (numero, ubicacion) {
        $scope.v_encabezadov = null;
        $scope.v_detallev = null;
        swal({ title: 'Buscando...' });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
          data: { function: 'obtener_Uautorizaciones', numero: numero, ubicacion: ubicacion }
        }).then(function (response) {
          $scope.v_encabezadov = response.data.cabeza;
          $scope.v_detallev = response.data.detalle;
          $scope.totalaut = response.data.total;
          if ($scope.v_detallev[0].codigo != undefined) {
            $scope.v_detallev = [];
          }
          swal.close();
        });
      }

      $scope.calcularEdad = function (date) {
        //var fecha=document.getElementById("user_date").value;
        var fecha = date.split("/").reverse().join("-");
        // Si la fecha es correcta, calculamos la edad
        var values = fecha.split("-");
        var dia = values[2];
        var mes = values[1];
        var ano = values[0];

        // cogemos los valores actuales
        var fecha_hoy = new Date();
        var ahora_ano = fecha_hoy.getYear();
        var ahora_mes = fecha_hoy.getMonth() + 1;
        var ahora_dia = fecha_hoy.getDate();

        // realizamos el calculo
        var edad = (ahora_ano + 1900) - ano;
        if (ahora_mes < mes) {
          edad--;
        }

        if ((mes == ahora_mes) && (ahora_dia < dia)) {
          edad--;
        }

        if (edad > 1900) {
          edad -= 1900;
        }



        // calculamos los meses
        var meses = 0;
        if (ahora_mes > mes)
          meses = ahora_mes - mes;
        if (ahora_mes < mes)
          meses = 12 - (mes - ahora_mes);
        if (ahora_mes == mes && dia > ahora_dia)
          meses = 11;

        // calculamos los dias
        var dias = 0;
        if (ahora_dia > dia)
          dias = ahora_dia - dia;
        if (ahora_dia < dia) {
          var ultimoDiaMes = new Date(ahora_ano, ahora_mes, 0);
          dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
        }


        if (edad > 0) {
          $scope.cantidadanosaut = 'años'
          if (edad == 1) {
            $scope.cantidadanosaut = 'años'
          }

          $scope.edadaut = edad;

        } else {

          if (meses > 0) {

            $scope.cantidadanosaut = 'meses'

            if (meses == 1) {

              $scope.cantidadanosaut = 'mes'

            }

            $scope.edadaut = meses;

          } else {

            if (dias > 0) {

              $scope.cantidadanosaut = 'dias'

              if (dias == 1) {

                $scope.cantidadanosaut = 'dia'

              }

              $scope.edadaut = dias;

            }

          }

        }


      }

      $scope.Cerrar_Modal_Autorizacion = function () {
        $('#modal_Aut').modal('close');
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

      ///////////////////////////////////////////////////////////////////

    }])
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
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
