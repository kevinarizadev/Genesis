'use strict';
angular.module('GenesisApp')
    .controller('eventosmaterializadosController', ['$scope', 'consultaHTTP', 'notification', 'cfpLoadingBar', '$http', function ($scope, consultaHTTP, notification, cfpLoadingBar, $http) {
        $scope.menu = 'tablaEventos';
        $scope.listadosSelect = {};
        $scope.disabledButton = false;
        $scope.listadoEventos = [];
        $scope.permisosModulo = {
            listar: 'EM01',
            guardar: 'EM02',
            editar: 'EM03'
        }
        $scope.permisosValidos = [];
        $scope.formulario = {
            numeroReferencia: {
                value: 0,
                required: false
            },
            proceso: {
                value: '',
                required: true
            },
            fechaDescubrimiento: {
                value: '',
                required: true
            },
            fechaInicio: {
                value: '',
                required: true
            },
            fechaFinalizacion: {
                value: '',
                required: true
            },
            descripcion: {
                value: '',
                required: true,
            },
            productoAfectado: {
                value: '',
                required: true
            },
            claseEvento: {
                value: '',
                required: true
            },
            tipoPerdida: {
                value: '',
                required: true
            },
            divisa: {
                value: '',
                required: true
            },
            cuantia: {
                value: '',
                required: true
            },
            cuantiaTotalRecuperada: {
                value: '',
                required: true
            },
            cuantiaRecuperadaSeguros: {
                value: '',
                required: true
            },
            cuentaPlanAfectada: {
                value: '',
                required: true
            },
            fechaContabilizacion: {
                value: '',
                required: true
            },
        };
        $scope.datosRegistro = {
            usuarioCreador: JSON.parse(sessionStorage.getItem("inicio_perfil")).nombre,
            cargo: JSON.parse(sessionStorage.getItem("inicio_perfil")).cargo,
            fechaRegistro: new Date()
        }

        $scope.mostrarVista = function (vista) {
            switch (vista) {
                case 'formularioEventos':
                    $scope.menu = 'formularioEventos';
                    break;
                case 'tablaEventos':
                    $scope.menu = 'tablaEventos';
                    break;
                default:
                    break;
            }
        }

        $scope.infomacionFormulario = function () {
            $http({
                method: 'POST',
                url: "php/riesgos/riesgos.php",
                data: {
                    function: 'listado_select_eventos_materializados',
                }
            }).then(({ data }) => {
                $scope.listadosSelect = { ...data };
            });
        }

        $scope.permisos = function () {
          $http({
              method: 'POST',
              url: "php/riesgos/riesgos.php",
              data: {
                  function: 'permisos_usuario_modulo',
                  P_V_CODIGO: 'EM00',
                  P_V_USUARIO: sessionStorage.getItem("usuario"),
              }
          }).then(({ data }) => {
              $scope.permisosValidos = data.Acciones
                  .filter((accion) => Boolean(accion.Permisos))
                  .map((accion) => accion.Codigo)


          });
      }


        $scope.permisos();

        $scope.infomacionFormulario();

        $scope.ListadoEventos = function () {
            swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
            });
            $http({
                method: 'POST',
                url: "php/riesgos/riesgos.php",
                data: {
                    function: 'listado_grilla_eventos_materializado',
                }
            }).then(({ data }) => {
                swal.close();
                $scope.listadoEventos = data;
            });
        }

        $scope.ListadoEventos()

        $scope.editarEvento = function (editarData) {
            $scope.menu = 'formularioEventos';
            $scope.formulario.numeroReferencia.value = Number(editarData.Codigo);
            $scope.formulario.proceso.value = editarData.ProcesoId
            $scope.formulario.fechaDescubrimiento.value = new Date(editarData.FechaDescubrimiento)
            $scope.formulario.fechaInicio.value = new Date(editarData.FechaInicio)
            $scope.formulario.fechaFinalizacion.value = new Date(editarData.FechaFinalizacion)
            $scope.formulario.descripcion.value = editarData.DescripcionEvento
            $scope.formulario.productoAfectado.value = editarData.ProductoServicioAfectado
            $scope.formulario.claseEvento.value = editarData.ClaseEventoId
            $scope.formulario.tipoPerdida.value = editarData.TipoPerdidaId
            $scope.formulario.divisa.value = editarData.DivisaId
            $scope.formulario.cuantia.value = Number(editarData.Cuantia)
            $scope.formulario.cuantiaTotalRecuperada.value = Number(editarData.CuantiaRotalRecuperada)
            $scope.formulario.cuantiaRecuperadaSeguros.value = Number(editarData.CuantiaRecuperadaSeguros)
            $scope.formulario.cuentaPlanAfectada.value = editarData.CuentasPlanCuentasAfectadas
            $scope.formulario.fechaContabilizacion.value = new Date(editarData.FechaContabilizacion)
        }

        $scope.enviarFormulario = function () {
            const formularioValido = $scope.validarFormulario();
            if (formularioValido) {
                swal('Información', 'Todos los campos deben estar lleno para realizar la acción', 'warning');
                return
            }

            const valorFormulario = $scope.valorFormulario()
            $scope.disabledButton = true;
            const datosRegistros = JSON.parse(sessionStorage.getItem("inicio_perfil"));

            $http({
                method: 'POST',
                url: "php/riesgos/riesgos.php",
                data: {
                    function: 'SP_RC_POST_GUARDAR_EVENTO_MATERIALIZADO',
                    P_V_NUMERO_REFERENCIA: valorFormulario.numeroReferencia,
                    P_V_ESTADO: "A",
                    P_V_PROCESO: valorFormulario.proceso,
                    P_D_FECHA_DESCUBRIMIENTO: $scope.parseDateSend(valorFormulario.fechaDescubrimiento),
                    P_D_FECHA_INICIO: $scope.parseDateSend(valorFormulario.fechaInicio),
                    P_D_FECHA_FINALIZACION: $scope.parseDateSend(valorFormulario.fechaFinalizacion),
                    P_V_DESCRIPCION_EVENTO: valorFormulario.descripcion,
                    P_V_PRODUCTO_SERVICIO_AFECTADO: valorFormulario.productoAfectado,
                    P_V_CLASE_EVENTO: valorFormulario.claseEvento,
                    P_V_TIPO_PERDIDA: valorFormulario.tipoPerdida,
                    P_V_DIVISA_ID: valorFormulario.divisa,
                    P_I_CUANTIA: valorFormulario.cuantia,
                    P_I_CUANTIA_TOTAL_RECUPERADA: valorFormulario.cuantiaTotalRecuperada,
                    P_I_CUANTIA_RECUPERADA_SEGUROS: valorFormulario.cuantiaRecuperadaSeguros,
                    P_V_CUENTAS_PLAN_CUENTAS_AFECTADAS: valorFormulario.cuentaPlanAfectada,
                    P_D_FECHA_CONTABILIZACION: $scope.parseDateSend(valorFormulario.fechaContabilizacion),
                    P_V_DATOS_REGISTRO: 'Nombre - ' + datosRegistros.nombre + 'Cargo - ' + datosRegistros.cargo + 'Fecha registro - ' + new Date(),
                    P_V_USUARIO_CREACION: sessionStorage.getItem("usuario"),
                }
            })
                .then(({ data, config }) => {
                    if (data.codigo == 0) {
                        $scope.menu = 'tablaEventos';
                        $scope.ListadoEventos();
                        $scope.limpiarFormulario();
                        swal('Información', data.mensaje, 'success');
                    } else {
                        swal('Información', data.mensaje, 'error');
                    }
                    $scope.disabledButton = false;
                })
        }

        $scope.convertirMonedaPesos = function (keyForm) {
            const valueMoneda = Number(`${$scope.formulario[keyForm].value}`.replace('$', '').replace(/,/g, '').replace(/\./, ''));
            if ($scope.formulario['divisa'].value == '0') {
                return valueMoneda.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) ?? 0;
            } else {
                return valueMoneda.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) ?? 0;
            }
        }

        $scope.parseDate = function (date) {
            return new Date(date).toLocaleString()
        }

        $scope.parseDateSend = function (date) {
            return new Date(date).toLocaleDateString() + ' ' + new Date(date).toLocaleTimeString().split(' ')[0]
        }

        $scope.validarFormulario = function () {
            return Object.values($scope.formulario).some(({ required, value }) => {
                if (required) {
                    if (value==0) {
                        return false
                    }
                    if (!value || value<0) {
                        return true
                    }
                } else {
                    return false
                }
            })
        }

        $scope.valorFormulario = function () {
            const valorForm = {}
            Object.entries($scope.formulario).forEach(([key, value]) => {
                valorForm[key] = value.value;
            })
            return valorForm;
        }

        $scope.limpiarFormulario = function () {
            Object.entries($scope.formulario).forEach(([key, value]) => {
                if (key == 'numeroReferencia') {
                    $scope.formulario[key].value = 0;
                } else {
                    $scope.formulario[key].value = '';
                }
            })
        }
    }]);
