'use strict';
angular.module('GenesisApp')
  .controller('indicadoresriesgosController', ['$scope', '$http', '$filter',
    function ($scope, $http, $filter) {

      $scope.Inicio = function () {
        console.log($(window).width());
        setTimeout(() => {
          document.querySelector("#content").style.backgroundColor = "white";
        }, 2000);
        $scope.Ajustar_Pantalla();

        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        $('.tabs').tabs();
        $('.modal').modal();
        $scope.Tabs = 1;
        $scope.SysDay = new Date();

        $scope.cargarPermisosUsuario();
        //
        // $scope.hojaIndicadores_activarCamposDesactivados()
        setTimeout(() => {
          $scope.$apply();
        }, 1500);

        //////////////////////////////////////////////////////////
      }

      $scope.cargarPermisosUsuario = function () {
        $scope.permisos = []
        $http({
          method: 'POST',
          url: "php/riesgos/indicadoresriesgos.php",
          data: {
            function: 'p_consulta_permisos_usuario',
            cedula: $scope.Rol_Cedula
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            $scope.Tabs = 0
            swal({
              title: "Error", text: 'No tiene permisos, por favor contactar al area de Riesgos',
              allowOutsideClick: false,
              showConfirmButton: false,
              type: "warning"
            }).catch(swal.noop); return
          }
          if (data.length) {
            $scope.permisos = data[0]

            setTimeout(() => {
              if ($scope.permisos.BADC_TIPO_USUARIO) {
                setTimeout(() => {

                  // console.log($scope.permisos)
                  $scope.hojaIndicadores_limpiar()
                  $scope.hojaIndicadores_listarIndicadores();

                  if ($scope.validarPermisos(['1'])) {
                    $scope.hojaPermisos_limpiar();
                    $scope.hojaPermisos_obtenerFuncs(1);
                    setTimeout(() => { $scope.$apply(); }, 500);
                  }



                }, 1500);
              }
            }, 1000);

            setTimeout(() => { $scope.$apply(); }, 500);
            setTimeout(() => {
              $('.tabs').tabs();
            }, 1500);
            console.table(data)
          }
        });
      }

      $scope.validarPermisos = function (lista) {
        if (!lista || !$scope.permisos || !$scope.permisos.BADC_TIPO_USUARIO) return
        if (lista.includes($scope.permisos.BADC_TIPO_USUARIO)) {
          return true
        }
      }

      /////// PROCESOS ///////

      $scope.hojaPermisos_limpiar = function () {
        $scope.hojaPermisos = {
          filtro: '',
          form: {
            funcionario: ''
          },
          listadoFuncs: [],
          listadoTabla: [],
          listadoTipoUsuario: [
            { codigo: '1', nombre: 'Administrador' },
            { codigo: '2', nombre: 'Usuario' },
          ]
        }
      }

      $scope.hojaPermisos_obtenerFuncs = function (x) {
        // Recibe x para no mostrar swalLoading
        if (!x)
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            showConfirmButton: false,
            animation: false
          });
        $scope.hojaPermisos.listadoTabla = [];

        // if (!x) swal.close();
        $http({
          method: 'POST',
          url: "php/riesgos/indicadoresriesgos.php",
          data: {
            function: 'p_consulta_usuario'
          }
        }).then(function ({ data }) {
          if (!x) swal.close();
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          $scope.hojaPermisos.listadoTabla = data;
          // console.log(data);
          setTimeout(() => { $scope.$apply(); }, 500);
        });
      }

      $scope.hojaPermisos_buscarFuncionario = function (funcionario) {
        if (funcionario.toString().length < 3) {
          swal("Error", 'Debe digitar una coincidencia', "warning").catch(swal.noop); return
        }
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/riesgos/indicadoresriesgos.php",
          data: {
            function: 'p_obtener_funcionario',
            funcionario
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          $scope.hojaPermisos.listadoFuncs = data;
          swal.close()
        });
      }

      $scope.hojaPermisos_agregarUsuario = function () {
        // swal({
        //   title: 'Agregar Nuevo Usuario',
        //   text: 'Ingrese la cédula del funcionario',
        //   input: 'text',
        //   inputPlaceholder: 'Ingrese la cédula...',
        //   showCancelButton: false,
        //   confirmButtonText: "Aceptar",
        //   allowOutsideClick: false
        // }).then(function (result) {
        //   if (result) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/riesgos/indicadoresriesgos.php",
          data: {
            function: 'p_insertar_usuario',
            codigo: $scope.hojaPermisos.funcionario.split('-')[0].trim(),
            responsable: $scope.Rol_Cedula
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.Codigo == 0) {
            swal("Mensaje", data.Nombre, "success").catch(swal.noop);
            $scope.hojaPermisos_obtenerFuncs(1);
          }
          if (data.Codigo == 1) {
            swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
          }
        });

        //   }
        // }).catch(swal.noop);
      }

      $scope.hojaPermisos_editarUsuario = function (data) {
        $scope.hojaPermisos.form.cedula = data.TERV_CODIGO;
        $scope.hojaPermisos.form.nombre = data.TERC_NOMBRE;
        $scope.hojaPermisos.form.estado = data.BADC_ESTADO;
        $scope.hojaPermisos.form.todosRegistros = data.BADC_TODOS_REGISTROS;
        $scope.hojaPermisos.form.tipoUsuario = data.BADC_TIPO_USUARIO.split('-')[0];
        $scope.openModal('modalPermisos')
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.hojaPermisos_modificarUsuario = function (x) {
        swal({
          title: '¿Desea actualizar el estado del funcionario?',
          text: x.nombre,
          showCancelButton: true,
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
          allowOutsideClick: false
        }).then(function (result) {
          if (result) {
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
              width: 200,
              showConfirmButton: false,
              animation: false
            });
            $http({
              method: 'POST',
              url: "php/riesgos/indicadoresriesgos.php",
              data: {
                function: 'p_actualiza_funcs',
                codigo: x.cedula,
                tipo: x.tipoUsuario,
                estado: x.estado,
                todosRegistros: x.todosRegistros,
                responsable: $scope.Rol_Cedula
              }
            }).then(function ({ data }) {
              if (data.toString().substr(0, 3) == '<br' || data == 0) {
                swal("Error", 'Sin datos', "warning").catch(swal.noop); return
              }
              if (data.Codigo == 0) {
                swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                $scope.closeModal();
                $scope.hojaPermisos_obtenerFuncs(1);
              }
              if (data.Codigo == 1) {
                swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
              }
            });
          }
        }).catch(swal.noop);
      }



      /////// PROCESOS ///////

      //////

      /////// INDICADORES ///////
      /////// INDICADORES ///////
      /////// INDICADORES ///////
      $scope.hojaIndicadores_limpiar = function () {
        $scope.hojaIndicadores = {
          gestion: 'N',
          filtro: '',
          listadoTabla: [],
          listadoTablaTemp: [],
          varsTabla: {
            currentPage: 0,
            pageSize: 10,
            valmaxpag: 10,
            pages: []
          },

          formulario: {},
          graficoSemaforizacion: null,
          listadoAnio: [],
          listadoProcesos: [],
          listadoRiesgosMaterializados: [],
          listadoIndicadoresPlaneacion: [],

          listadoCategoria: [
            { codigo: '1', nombre: 'Eficiencia' },
            { codigo: '2', nombre: 'Eficacia' },
            { codigo: '3', nombre: 'Efectividad' }
          ],
          listadoUnidadMedida: [
            { codigo: '1', nombre: 'Numérica' },
            { codigo: '2', nombre: 'Porcentaje' },
            { codigo: '3', nombre: 'Fracción' },
            { codigo: '4', nombre: 'Días' },
            { codigo: '5', nombre: 'Horas' },
            { codigo: '6', nombre: 'Tasa' },
            { codigo: '7', nombre: 'Valor Absoluto' },
            { codigo: '8', nombre: 'Veces' },
            { codigo: '9', nombre: 'Pesos' },
          ],
          listadoFrecuencia: [
            { codigo: 'M', nombre: 'Mensual', meses: 12 },
            { codigo: 'B', nombre: 'Bimestral', meses: 6 },
            { codigo: 'T', nombre: 'Trimestral', meses: 4 },
            { codigo: 'S', nombre: 'Semestral', meses: 2 },
            { codigo: 'A', nombre: 'Anual', meses: 1 },
          ],
          listadotipoCalculo: [
            { codigo: 'CA', nombre: 'Cifra Absoluta' },
            { codigo: 'PO', nombre: 'Porcentaje' },
            { codigo: 'RA', nombre: 'Razón' },
            { codigo: 'TA', nombre: 'Tasa' },
            { codigo: 'VA', nombre: 'Variación' },
            { codigo: 'DI', nombre: 'Diferencia' },
            { codigo: 'AJ', nombre: 'Ajuste' },
            { codigo: 'DE', nombre: 'Desempeño' },
            { codigo: 'TL', nombre: 'Talento' },
            { codigo: 'CT', nombre: 'Capital de Trabajo' },
            { codigo: 'PR', nombre: 'Promedio' },
          ]

        }

        for (let i = 2023; i <= $scope.SysDay.getFullYear(); i++) {
          $scope.hojaIndicadores.listadoAnio.push({ 'codigo': i });
        }

        $scope.hojaIndicadores_obtenerProcesos()
        // $scope.hojaIndicadores_obtenerRiesgos()
        $scope.hojaIndicadores_obtenerIndicadores()
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.hojaIndicadores_obtenerProcesos = function () {
        $http({
          method: 'POST',
          url: "php/riesgos/indicadoresriesgos.php",
          data: {
            function: "p_obtener_listado_procesos",
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br') {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          data.forEach(e => {
            $scope.hojaIndicadores.listadoProcesos.push(
              { codigo: e.AREN_CODIGO, nombre: e.AREC_NOMBRE }
            )
          })
          // $scope.hojaIndicadores.listadoDependencias = data;
          setTimeout(() => { $scope.$apply(); }, 500);
        })
      }

      $scope.hojaIndicadores_obtenerRiesgos = function (proceso) {
        $scope.hojaIndicadores.listadoRiesgosMaterializados = []
        $http({
          method: 'POST',
          url: "php/riesgos/indicadoresriesgos.php",
          data: {
            function: "p_obtener_listado_riesgos",
            proceso
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br') {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          data.forEach(e => {
            $scope.hojaIndicadores.listadoRiesgosMaterializados.push(
              { codigo: e.ID, nombre: e.DESCRIPCIONRIESGO }
            )
          })
          // $scope.hojaIndicadores.listadoDependencias = data;
          setTimeout(() => { $scope.$apply(); }, 500);
        })
      }

      $scope.hojaIndicadores_obtenerIndicadores = function () {
        $http({
          method: 'POST',
          url: "php/riesgos/indicadoresriesgos.php",
          data: {
            function: "p_obtener_listado_indicadores",
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br') {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          data.forEach(e => {
            $scope.hojaIndicadores.listadoIndicadoresPlaneacion.push(
              {
                codigo: e.CODIGO, nombre: e.REGN_NOM_INDICADOR,
                frecuencia: e.REGC_PERIODICIDAD_REPORTE,
                unidadMedida: e.REGN_UNIDAD_MEDIDA,
                descripcionNumerador: e.REGN_DESCRIPCION_NUMERADOR,
                descripcionDenominador: e.REGN_DESCRIPCION_DENOMINADOR,
                descripcionConstante: e.REGN_DESCRIPCION_CONSTANTE,
                tipoCalculo: e.REGC_TIPO_CALCULO,
                tipoOrden: e.REGC_TIPO_ORDEN,
              }
            )
          })
          // $scope.hojaIndicadores.listadoDependencias = data;
          setTimeout(() => { $scope.$apply(); }, 500);
        })
      }

      $scope.hojaIndicadores_listarIndicadores = function (x) {
        if (!x)
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            showConfirmButton: false,
            animation: false
          });
        $scope.hojaIndicadores.listadoTabla = [];
        $scope.hojaIndicadores.listadoTablaTemp = [];
        $http({
          method: 'POST',
          url: "php/riesgos/indicadoresriesgos.php",
          data: {
            function: 'p_lista_indicadores'
          }
        }).then(function ({ data }) {
          if (!x) swal.close();
          if (data.length) {
            $scope.hojaIndicadores.listadoTabla = data
            $scope.hojaIndicadores.listadoTablaTemp = data
            $scope.initPaginacion('hojaIndicadores', $scope.hojaIndicadores.listadoTabla);
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        });
      }

      $scope.hojaIndicadores_crearNuevo = function () {
        $scope.hojaIndicadores_activarCamposDesactivados()
        $scope.hojaIndicadores_activarCamposIndicadores()
        // console.log($scope.hojaIndicadores.formulario.idIndicadorSeleccionado, $scope.hojaIndicadores.formulario.nombre)
        // if ($scope.hojaIndicadores.formulario.idIndicadorSeleccionado != '' && $scope.hojaIndicadores.formulario.nombre) {
        $scope.hojaIndicadores.formulario.idIndicadorSeleccionado = '';
        $scope.hojaIndicadores.gestion = 'S';

        $scope.hojaIndicadores.formulario.proceso = '';
        $scope.hojaIndicadores.formulario.riesgoMaterializados = '';
        $scope.hojaIndicadores.formulario.indicadorPlaneacion = '';

        $scope.hojaIndicadores.formulario.nombre = '';
        // $scope.hojaIndicadores.formulario.estado = 'A';

        //

        $scope.hojaIndicadores.formulario.unidadMedida = '';
        $scope.hojaIndicadores.formulario.tipoCalculo = '';

        $scope.hojaIndicadores.formulario.tipoOrden = '';
        $scope.hojaIndicadores.formulario.apetito = '0';
        $scope.hojaIndicadores.formulario.capacidad = '0';
        $scope.hojaIndicadores.formulario.tolerancia = '0';

        $scope.hojaIndicadores.formulario.frecuencia = '';
        $scope.hojaIndicadores.formulario.categoria = '';
        //

        $scope.hojaIndicadores.formulario.responsable = '';
        $scope.hojaIndicadores.formulario.listadoResponsable = [];
        $scope.hojaIndicadores.formulario.listadoResponsableTabla = [];

        $scope.hojaIndicadores.formulario.descripcionNumerador = '';
        $scope.hojaIndicadores.formulario.descripcionDenominador = '';
        $scope.hojaIndicadores.formulario.descripcionConstante = '';


        $scope.hojaIndicadores.formulario.idIndicadorSeleccionado = '';

        ////////////////////////////////////////////////

        setTimeout(() => {
          angular.forEach(document.querySelectorAll('.formIndicador_Desactivar_Estado select'), function (i) {
            i.setAttribute("disabled", true);
          });
        }, 1000);

        if ($scope.hojaIndicadores.graficoSemaforizacion) {
          $scope.hojaIndicadores.graficoSemaforizacion.destroy()
          $scope.hojaIndicadores.graficoSemaforizacion = null;
        }

        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.hojaIndicadores_chgIndicadorPlaneacion = function () {
        $scope.hojaIndicadores_activarCamposIndicadores()

        const indicador = $scope.hojaIndicadores.listadoIndicadoresPlaneacion.filter(e => e.codigo + ' - ' + e.nombre == $scope.hojaIndicadores.formulario.indicadorPlaneacion)

        if (indicador != '' && indicador != -1 && $scope.hojaIndicadores.formulario.idIndicadorSeleccionado == '') {
          $scope.hojaIndicadores.formulario.nombre = indicador[0].nombre
          $scope.hojaIndicadores.formulario.frecuencia = indicador[0].frecuencia
          $scope.hojaIndicadores.formulario.unidadMedida = indicador[0].unidadMedida
          $scope.hojaIndicadores.formulario.descripcionNumerador = indicador[0].descripcionNumerador
          $scope.hojaIndicadores.formulario.descripcionDenominador = indicador[0].descripcionDenominador
          $scope.hojaIndicadores.formulario.descripcionConstante = indicador[0].descripcionConstante
          $scope.hojaIndicadores.formulario.tipoCalculo = indicador[0].tipoCalculo
          $scope.hojaIndicadores.formulario.tipoOrden = indicador[0].tipoOrden == 'A' ? 'D' : 'A'
          $scope.hojaIndicadores_desactivarCamposIndicadores()
        }
        if (indicador != '' && indicador != -1 && $scope.hojaIndicadores.formulario.idIndicadorSeleccionado != '') {
          $scope.hojaIndicadores.formulario.nombre = indicador[0].nombre
        }
      }

      $scope.hojaIndicadores_desactivarCamposIndicadores = function () {
        angular.forEach(document.querySelectorAll('.formIndicador_desactivarCamposIndicadores input'), function (i) {
          i.setAttribute("readonly", true);
        });
        angular.forEach(document.querySelectorAll('.formIndicador_desactivarCamposIndicadores textarea'), function (i) {
          i.setAttribute("readonly", true);
        });
        angular.forEach(document.querySelectorAll('.formIndicador_desactivarCamposIndicadores select'), function (i) {
          i.setAttribute("disabled", true);
        });
      }

      $scope.hojaIndicadores_activarCamposIndicadores = function () {
        angular.forEach(document.querySelectorAll('.formIndicador_desactivarCamposIndicadores input'), function (i) {
          i.removeAttribute("readonly");
        });
        angular.forEach(document.querySelectorAll('.formIndicador_desactivarCamposIndicadores textarea'), function (i) {
          i.removeAttribute("readonly");
        });
        angular.forEach(document.querySelectorAll('.formIndicador_desactivarCamposIndicadores select'), function (i) {
          i.removeAttribute("disabled");
        });
      }

      // EDITAR INDICADOR
      $scope.hojaIndicadores_editarIndicador = function (x) {
        // console.log(x);
        $scope.hojaIndicadores_activarCamposDesactivados()
        $scope.hojaIndicadores_activarCamposIndicadores()
        // $scope.modalDatosIndicador = x;

        $scope.hojaIndicadores.gestion = 'S';
        $scope.hojaIndicadores.formulario.idIndicadorSeleccionado = x.BINN_CONSECUTIVO;

        $scope.hojaIndicadores.formulario.proceso = x.BINV_COD_PROCESO;
        $scope.hojaIndicadores_obtenerRiesgos(x.BINV_COD_PROCESO)
        setTimeout(() => {
          $scope.hojaIndicadores.formulario.riesgoMaterializados = x.BINV_COD_RIESGOS_MATERIALIZADO.split('-')[0];
          setTimeout(() => { $scope.$apply(); }, 500);
          // debugger
        }, 1500);

        if (x.BINV_COD_INDICADOR_PLANEACION) {
          const indicador = $scope.hojaIndicadores.listadoIndicadoresPlaneacion.filter(e => e.codigo == x.BINV_COD_INDICADOR_PLANEACION)
          $scope.hojaIndicadores.formulario.indicadorPlaneacion = indicador[0].codigo + ' - ' + indicador[0].nombre;
        } else {
          $scope.hojaIndicadores.formulario.indicadorPlaneacion = ''
        }
        // $scope.hojaIndicadores.formulario.indicadorPlaneacion = x.BINV_COD_INDICADOR_PLANEACION;

        $scope.hojaIndicadores.formulario.nombre = x.BINV_NOM_INDICADOR;
        // $scope.hojaIndicadores.formulario.estado = 'A';
        //
        $scope.hojaIndicadores.formulario.anio = x.BINN_ANNO;
        $scope.hojaIndicadores.formulario.unidadMedida = x.BINV_UNIDAD_MEDIDA;
        $scope.hojaIndicadores.formulario.tipoCalculo = x.BINC_TIPO_CALCULO;

        $scope.hojaIndicadores.formulario.tipoOrden = x.BINV_TIPO_ORDEN.split('-')[0];
        $scope.hojaIndicadores.formulario.apetito = x.BINV_APETITO;
        $scope.hojaIndicadores.formulario.capacidad = x.BINV_CAPACIDAD;
        $scope.hojaIndicadores.formulario.tolerancia = x.BINV_TOLERANCIA;

        $scope.hojaIndicadores.formulario.frecuencia = x.BINV_FRECUENCIA;
        $scope.hojaIndicadores.formulario.categoria = x.BINV_CATEGORIA;
        //
        $scope.hojaIndicadores.formulario.descripcionNumerador = x.BINV_DESCRIPCION_NUMERADOR;
        $scope.hojaIndicadores.formulario.descripcionDenominador = x.BINV_DESCRIPCION_DENOMINADOR;
        $scope.hojaIndicadores.formulario.descripcionConstante = x.BINV_DESCRIPCION_CONSTANTE;

        // $scope.hojaIndicadores.formulario.responsable = x.xxxxxxxxxxxxxx;
        $scope.hojaIndicadores.formulario.listadoResponsable = [];
        $scope.hojaIndicadores.formulario.listadoResponsableTabla = [];


        $scope.hojaIndicadores_obtenerDatosResponsables(x);

        setTimeout(() => {
          document.getElementById('modalCrearIndicadores_Scroll').scrollIntoView({ block: 'start', behavior: 'smooth' });
          if (!$scope.validarPermisos(['1'])) {
            angular.forEach(document.querySelectorAll('.formIndicador_Desactivar input'), function (i) {
              i.setAttribute("readonly", true);
            });
            angular.forEach(document.querySelectorAll('.formIndicador_Desactivar textarea'), function (i) {
              i.setAttribute("readonly", true);
            });
            angular.forEach(document.querySelectorAll('.formIndicador_Desactivar select'), function (i) {
              i.setAttribute("disabled", true);
            });
          }
        }, 1000);
      }

      $scope.hojaIndicadores_atras = function () {
        $scope.hojaIndicadores.gestion = 'N';
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.hojaIndicadores_buscarResponsables = function (responsable) {
        $scope.hojaIndicadores.formulario.listadoResponsable = []
        $http({
          method: 'POST',
          url: "php/riesgos/indicadoresriesgos.php",
          data: {
            function: "p_obtener_tercero",
            responsable
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br') {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data == 0) {
            swal("Error", 'No se encontraron funcionarios', "warning").catch(swal.noop); return
          }
          data.forEach(e => {
            $scope.hojaIndicadores.formulario.listadoResponsable.push({
              codigo: e.DOCUMENTO,
              nombre: e.NOMBRE.toString().toUpperCase()
            })
          })
          setTimeout(() => { $scope.$apply(); }, 500);
        })
      }
      $scope.hojaIndicadores_agregarResponsables = function () {
        if (!$scope.hojaIndicadores.formulario.responsable || !$scope.hojaIndicadores.formulario.listadoResponsable.length) { return }
        if ($scope.hojaIndicadores.formulario.responsable.toString().indexOf('-') == -1) { return }
        const dato = $scope.hojaIndicadores.formulario.listadoResponsable.find(e => e.codigo == $scope.hojaIndicadores.formulario.responsable.split('-')[0].trim());

        if ($scope.hojaIndicadores.formulario.listadoResponsableTabla.findIndex(e => e.codigo == dato.codigo) != -1) {
          $scope.hojaIndicadores.formulario.responsable = '';
          swal("Error", 'Responsable duplicado', "warning").catch(swal.noop); return
        }

        $scope.hojaIndicadores.formulario.listadoResponsableTabla.push(dato);
        $scope.hojaIndicadores.formulario.responsable = '';
        setTimeout(() => { $scope.$apply(); }, 500);
      }
      $scope.hojaIndicadores_quitarResponsables = function (index) {
        $scope.hojaIndicadores.formulario.listadoResponsableTabla.splice(index, 1);
        setTimeout(() => { $scope.$apply(); }, 500);
      }


      $scope.hojaIndicadores_activarCamposDesactivados = function () {
        angular.forEach(document.querySelectorAll('.formIndicador_Desactivar input'), function (i) {
          i.removeAttribute("readonly");
        });
        angular.forEach(document.querySelectorAll('.formIndicador_Desactivar textarea'), function (i) {
          i.removeAttribute("readonly");
        });
        angular.forEach(document.querySelectorAll('.formIndicador_Desactivar select'), function (i) {
          i.removeAttribute("disabled");
        });
      }

      $scope.hojaIndicadores_obtenerDatosResponsables = function (x) {
        $http({
          method: 'POST',
          url: "php/riesgos/indicadoresriesgos.php",
          data: {
            function: "p_consulta_responsable_indicador",
            consecutivo: x.BINN_CONSECUTIVO
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.Codigo == 1) {
            swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
          }
          if (data.length > 0) {
            data.forEach(e => {
              $scope.hojaIndicadores.formulario.listadoResponsableTabla.push({
                "codigo": e.BINN_RESPONSABLE,
                "nombre": e.TERC_NOMBRE
              })
            })
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        })
      }
      //
      $scope.hojaIndicadores_chg = function () {
        // const apetito = parseFloat($scope.hojaIndicadores.formulario.apetito), tolerancia = parseFloat($scope.hojaIndicadores.formulario.tolerancia), capacidad = parseFloat($scope.hojaIndicadores.formulario.capacidad);

        // console.log(apetito, tolerancia, capacidad);
        // if (apetito != 0 && tolerancia != 0 && capacidad != 0) {

        //   if (apetito > tolerancia || apetito > capacidad || tolerancia > capacidad) {
        //     swal("¡Importante!", "Debe corregir los valores", "warning").catch(swal.noop); return
        //   }
        // }
        // $scope.hojaIndicadores.formulario.apetito
        // $scope.hojaIndicadores.formulario.tolerancia
        // $scope.hojaIndicadores.formulario.capacidad
      }
      //
      $scope.hojaIndicadores_validarForm = function () {
        return new Promise((resolve) => {

          if (!$scope.hojaIndicadores.formulario.proceso) resolve(false);
          if (!$scope.hojaIndicadores.formulario.nombre) resolve(false);

          if (!$scope.hojaIndicadores.formulario.unidadMedida) resolve(false);
          if (!$scope.hojaIndicadores.formulario.frecuencia) resolve(false);
          if (!$scope.hojaIndicadores.formulario.tipoCalculo) resolve(false);

          if (!$scope.hojaIndicadores.formulario.tipoOrden) resolve(false);
          if (!$scope.hojaIndicadores.formulario.apetito) resolve(false);
          if (!$scope.hojaIndicadores.formulario.capacidad) resolve(false);
          if (!$scope.hojaIndicadores.formulario.tolerancia) resolve(false);

          if (!$scope.hojaIndicadores.formulario.frecuencia) resolve(false);
          if (!$scope.hojaIndicadores.formulario.categoria) resolve(false);

          if ($scope.hojaIndicadores.formulario.tipoOrden == 'A') {
            if (parseFloat($scope.hojaIndicadores.formulario.apetito) > parseFloat($scope.hojaIndicadores.formulario.tolerancia)
              || parseFloat($scope.hojaIndicadores.formulario.apetito) > parseFloat($scope.hojaIndicadores.formulario.capacidad)
              || parseFloat($scope.hojaIndicadores.formulario.tolerancia) > parseFloat($scope.hojaIndicadores.formulario.capacidad)) {
              resolve(false);
            }
          } else {
            if (parseFloat($scope.hojaIndicadores.formulario.apetito) < parseFloat($scope.hojaIndicadores.formulario.tolerancia)
              || parseFloat($scope.hojaIndicadores.formulario.apetito) < parseFloat($scope.hojaIndicadores.formulario.capacidad)
              || parseFloat($scope.hojaIndicadores.formulario.tolerancia) < parseFloat($scope.hojaIndicadores.formulario.capacidad)) {
              resolve(false);
            }
          }

          // if (!$scope.hojaIndicadores.formulario.descripcionNumerador) resolve(false);
          // if (!$scope.hojaIndicadores.formulario.descripcionDenominador) resolve(false);
          // if (!$scope.hojaIndicadores.formulario.descripcionConstante) resolve(false);


          if ($scope.hojaIndicadores.formulario.listadoResponsableTabla.length == 0) resolve(false);

          resolve(true)
        });
      }

      $scope.hojaIndicadores_guardarForm = function () {
        $scope.hojaIndicadores_validarForm().then(res => {
          if (!res) { swal("¡Importante!", "Diligencia los campos requeridos (*)", "warning").catch(swal.noop); return }
          //
          let indicadorPlaneacion = ''
          if ($scope.hojaIndicadores.formulario.indicadorPlaneacion !== undefined) {
            indicadorPlaneacion = $scope.hojaIndicadores.formulario.indicadorPlaneacion.toString().includes('_') ? $scope.hojaIndicadores.formulario.indicadorPlaneacion.split('-')[0].trim() : '';
          }



          const dato = [{

            pconsecutivo: $scope.hojaIndicadores.formulario.idIndicadorSeleccionado,

            pproceso: $scope.hojaIndicadores.formulario.proceso,
            priesgoMaterializados: $scope.hojaIndicadores.formulario.riesgoMaterializados,
            pindicadorPlaneacion: indicadorPlaneacion,

            panio: $scope.hojaIndicadores.formulario.anio,

            pnombre: $scope.hojaIndicadores.formulario.nombre,

            pcategoria: $scope.hojaIndicadores.formulario.categoria,
            punidad_medida: $scope.hojaIndicadores.formulario.unidadMedida,
            pfrecuencia: $scope.hojaIndicadores.formulario.frecuencia,
            ptipo_calculo: $scope.hojaIndicadores.formulario.tipoCalculo,

            ptipo_orden: $scope.hojaIndicadores.formulario.tipoOrden,

            papetito: $scope.hojaIndicadores.formulario.apetito.replace(',', '.'),
            pcapacidad: $scope.hojaIndicadores.formulario.capacidad.replace(',', '.'),
            ptolerancia: $scope.hojaIndicadores.formulario.tolerancia.replace(',', '.'),

            pfrecuencia: $scope.hojaIndicadores.formulario.frecuencia,
            pcategoria: $scope.hojaIndicadores.formulario.categoria,

            pdescripcion_numerador: $scope.hojaIndicadores.formulario.descripcionNumerador,
            pdescripcion_denominador: $scope.hojaIndicadores.formulario.descripcionDenominador,
            pdescripcion_constante: $scope.hojaIndicadores.formulario.descripcionConstante,

            presponsable: $scope.Rol_Cedula,

          }];

          var responsables = [];
          $scope.hojaIndicadores.formulario.listadoResponsableTabla.forEach(e => {
            responsables.push({
              doc_responsable: e.codigo.toString(),
            })
          })
          // console.log(dato);
          const text = $scope.hojaIndicadores.formulario.idIndicadorSeleccionado == '' ? '¿Desea crear el indicador?' : '¿Desea actualizar el indicador?';
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
              $http({
                method: 'POST',
                url: "php/riesgos/indicadoresriesgos.php",
                data: {
                  function: "p_ui_indicador",
                  datosJson: JSON.stringify(dato),
                  // cantidadJson: 1,
                  listadoResponsableTabla: JSON.stringify(responsables),
                  cantidadResponsable: $scope.hojaIndicadores.formulario.listadoResponsableTabla.length,
                  accion: $scope.hojaIndicadores.formulario.idIndicadorSeleccionado == '' ? 'I' : 'U',
                }
              }).then(function ({ data }) {
                if (data.toString().substr(0, 3) == '<br' || data == 0) {
                  swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                }
                if (data.Codigo == 0) {
                  swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                  $scope.hojaIndicadores_atras()
                  $scope.hojaIndicadores_listarIndicadores(1);
                  $scope.closeModal()
                }
                if (data.Codigo == 1) {
                  swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                }
              })
            }
          })
          //
        })
      }


      $scope.hojaIndicadoresEliminar = function () {
        $scope.modalFichaTecnicaVars.idIndicadorSeleccionado;
        swal({
          title: 'Observación',
          input: 'textarea',
          inputPlaceholder: 'Escribe un comentario...',
          showCancelButton: true,
          allowOutsideClick: false,
          // inputValue: $scope.Vista1.Obs,
          width: '500px',
          inputValidator: function (value) {
            return new Promise(function (resolve, reject) {
              if (value !== '') {
                resolve();
              } else {
                swal({
                  title: "Mensaje",
                  text: "¡Debe una observación!",
                  type: "warning",
                }).catch(swal.noop);
              }
            })
          }
        }).then(function (observacion) {
          //
          if (observacion)
            swal({
              title: '¿Desea eliminar el Indicador?',
              text: '',
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
                $http({
                  method: 'POST',
                  url: "php/riesgos/indicadoresriesgos.php",
                  data: {
                    function: 'p_eliminar_indicador',

                    codigoProceso: $scope.modalFichaTecnicaVars.codigoProceso,
                    codigoEstrategico: $scope.modalFichaTecnicaVars.codigoEstrategico,
                    codigoTactico: $scope.modalFichaTecnicaVars.codigoTactico,
                    codigoIndicador: $scope.modalFichaTecnicaVars.idIndicadorSeleccionado,

                    observacion,
                    responsable: $scope.Rol_Cedula
                  }
                }).then(function ({ data }) {
                  if (data.toString().substr(0, 3) == '<br' || data == 0) {
                    swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                  }
                  if (data.Codigo == 0) {
                    swal("Mensaje", "Indicador eliminado!", "success").catch(swal.noop);
                    $scope.closeModal()
                    $scope.hojaIndicadores_listarIndicadores(1);
                    setTimeout(() => { $scope.$apply(); }, 500);
                  }
                  if (data.Codigo == 1) {
                    swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                  }
                });
              }
            });
        }).catch(swal.noop);
      }

      $scope.modalGraficoIndicador = function (x) {
        $scope.itemSeleccionado = x.BINN_CONSECUTIVO
        // $scope.modalDatosCorrespVars.listado
        $scope.modalDatosCambio = x;

        setTimeout(() => {
          $scope.openModal('modalGraficoIndicador');
        }, 1000);
        $scope.modalGraficoVars = {};
        $scope.modalGraficoVars = x;

        $scope.modalGraficoObtenerdatos(x);

      }


      $scope.modalGraficoObtenerdatos = function (x) {
        if ($scope.graficoIndicador) {
          $scope.graficoIndicador.destroy()
          $scope.graficoIndicador = null;
        }
        $http({
          method: 'POST',
          url: "php/riesgos/indicadoresriesgos.php",
          data: {
            function: "p_lista_gestion_indicador",
            consecutivo: x.BINN_CONSECUTIVO
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            $scope.graficoIndicador.destroy()
            $scope.graficoIndicador = null;
            setTimeout(() => { $scope.$apply(); }, 500);
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.Codigo == 1) {
            swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
          }
          if (data.length > 0) {

            $scope.modalGraficoVars.listado = data;
            setTimeout(() => {
              var dataMeses, dataSerie, dataPlotBands, xSerie

              // $scope.modalGraficoVars.BINV_APETITO
              // $scope.modalGraficoVars.BINV_CAPACIDAD
              // $scope.modalGraficoVars.BINV_TOLERANCIA

              // dato1_Max = parseFloat($scope.modalGraficoVars.REGC_DATO1);
              // dato2_Min = dato1_Max
              // dato2_Max = dato2_Min + parseFloat($scope.modalGraficoVars.REGC_DATO2);
              // dato3_Min = dato2_Max;


              // M:Mensual; B:Bimestral; T:Trimestral; S:Semestral; A:Anual;
              if (x.BINV_FRECUENCIA.split('-')[0] == 'M') {// Mensual
                dataMeses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                dataSerie = [
                  // $scope.filtrarPeriodoAcumulado(1) + parseFloat((x.REGN_LINEA_BASE.toString()).replace(',', '.')),
                  $scope.filtrarPeriodoAcumulado(1),
                  $scope.filtrarPeriodoAcumulado(2),
                  $scope.filtrarPeriodoAcumulado(3),
                  $scope.filtrarPeriodoAcumulado(4),
                  $scope.filtrarPeriodoAcumulado(5),
                  $scope.filtrarPeriodoAcumulado(6),
                  $scope.filtrarPeriodoAcumulado(7),
                  $scope.filtrarPeriodoAcumulado(8),
                  $scope.filtrarPeriodoAcumulado(9),
                  $scope.filtrarPeriodoAcumulado(10),
                  $scope.filtrarPeriodoAcumulado(11),
                  $scope.filtrarPeriodoAcumulado(12)
                ];
              }
              if (x.BINV_FRECUENCIA.split('-')[0] == 'B') {// Bimestral
                dataMeses = ['Feb', 'Abr', 'Jun', 'Ago', 'Oct', 'Dic'];
                dataSerie = [
                  // $scope.filtrarPeriodoAcumulado(2) + parseFloat((x.REGN_LINEA_BASE.toString()).replace(',', '.')),
                  $scope.filtrarPeriodoAcumulado(2),
                  $scope.filtrarPeriodoAcumulado(4),
                  $scope.filtrarPeriodoAcumulado(6),
                  $scope.filtrarPeriodoAcumulado(8),
                  $scope.filtrarPeriodoAcumulado(10),
                  $scope.filtrarPeriodoAcumulado(12)
                ];
              }
              if (x.BINV_FRECUENCIA.split('-')[0] == 'T') {// Trimestral
                dataMeses = ['Mar', 'Jun', 'Sep', 'Dic'];
                dataSerie = [
                  // $scope.filtrarPeriodoAcumulado(3) + parseFloat((x.REGN_LINEA_BASE.toString()).replace(',', '.')),
                  $scope.filtrarPeriodoAcumulado(3),
                  $scope.filtrarPeriodoAcumulado(6),
                  $scope.filtrarPeriodoAcumulado(9),
                  $scope.filtrarPeriodoAcumulado(12)
                ];
              }
              if (x.BINV_FRECUENCIA.split('-')[0] == 'S') {// Semestral
                dataMeses = ['Jun', 'Dic'];
                dataSerie = [
                  // $scope.filtrarPeriodoAcumulado(6) + parseFloat((x.REGN_LINEA_BASE.toString()).replace(',', '.')),
                  $scope.filtrarPeriodoAcumulado(6),
                  $scope.filtrarPeriodoAcumulado(12)
                ];
              }
              if (x.BINV_FRECUENCIA.split('-')[0] == 'A') {// Anual
                dataMeses = ['Dic'];
                dataSerie = [
                  // $scope.filtrarPeriodoAcumulado(12)
                  $scope.filtrarPeriodoAcumulado(12) + parseFloat((x.REGN_LINEA_BASE.toString()).replace(',', '.'))
                ];
              }

              if ($scope.modalGraficoVars.BINV_TIPO_ORDEN.split('-')[0] == 'A') {
                xSerie = [
                  {
                    name: 'Periodo',
                    color: '#1631FA',
                    lineWidth: 3,
                    data: dataSerie
                  },
                  {
                    name: 'Apetito',
                    color: 'rgba(0, 128, 0)',
                    dashStyle: 'ShortDash',
                    lineWidth: 3,
                    data: [[0, parseFloat($scope.modalGraficoVars.BINV_APETITO.toString().replace(',', '.'))], [dataSerie.length - 1, parseFloat($scope.modalGraficoVars.BINV_APETITO.toString().replace(',', '.'))]],
                  },
                  {
                    name: 'Tolerancia',
                    color: 'rgba(255, 255, 0)',
                    dashStyle: 'ShortDash',
                    lineWidth: 3,
                    data: [[0, parseFloat($scope.modalGraficoVars.BINV_TOLERANCIA.toString().replace(',', '.'))], [dataSerie.length - 1, parseFloat($scope.modalGraficoVars.BINV_TOLERANCIA.toString().replace(',', '.'))]],
                  },
                  {
                    name: 'Capacidad',
                    color: 'rgba(255, 0, 0, 0.3)',
                    dashStyle: 'ShortDash',
                    lineWidth: 3,
                    data: [[0, parseFloat($scope.modalGraficoVars.BINV_CAPACIDAD.toString().replace(',', '.'))], [dataSerie.length - 1, parseFloat($scope.modalGraficoVars.BINV_CAPACIDAD.toString().replace(',', '.'))]],
                  }
                ]

                dataPlotBands = [
                  {
                    color: 'rgba(255, 0, 0, 0.7)', // Color value
                    from: $scope.modalGraficoVars.BINV_CAPACIDAD,
                    to: 10000000,
                    label: {
                      // text: 'Exceso'
                    }
                  },
                  { // Light air
                    from: 0,
                    to: $scope.modalGraficoVars.BINV_APETITO,
                    // from: 0,
                    // to: dato1_Max,
                    color: 'rgba(0, 128, 0, 0.7)',
                    label: {
                      // text: 'Baja',
                      style: {
                        color: '#000000'
                      }
                    }

                  }, { // Light breeze
                    from: $scope.modalGraficoVars.BINV_APETITO,
                    to: $scope.modalGraficoVars.BINV_TOLERANCIA,
                    // from: dato2_Min,
                    // to: dato2_Max,
                    color: 'rgba(255, 255, 0, 0.7)',
                    label: {
                      // text: 'Media',
                      style: {
                        color: '#000000'
                      }
                    }
                  }, { // Light breeze
                    from: $scope.modalGraficoVars.BINV_TOLERANCIA,
                    to: $scope.modalGraficoVars.BINV_CAPACIDAD,
                    // from: dato3_Min,
                    // to: parseFloat($scope.modalGraficoVars.REGC_DATOMAX),
                    color: 'rgba(255, 0, 0, 0.3)',
                    label: {
                      // text: 'Toterancia',
                      style: {
                        color: '#000000'
                      }
                    }
                  }
                ]
              } else {
                xSerie = [
                  {
                    name: 'Periodo',
                    color: '#1631FA',
                    lineWidth: 3,
                    data: dataSerie
                  },
                  {
                    name: 'Apetito',
                    color: 'rgba(0, 128, 0)',
                    dashStyle: 'ShortDash',
                    lineWidth: 3,
                    data: [[0, parseFloat($scope.modalGraficoVars.BINV_APETITO.toString().replace(',', '.'))], [dataSerie.length - 1, parseFloat($scope.modalGraficoVars.BINV_APETITO.toString().replace(',', '.'))]],
                  },
                  {
                    name: 'Tolerancia',
                    color: 'rgba(255, 255, 0)',
                    dashStyle: 'ShortDash',
                    lineWidth: 3,
                    data: [[0, parseFloat($scope.modalGraficoVars.BINV_TOLERANCIA.toString().replace(',', '.'))], [dataSerie.length - 1, parseFloat($scope.modalGraficoVars.BINV_TOLERANCIA.toString().replace(',', '.'))]],
                  },
                  {
                    name: 'Capacidad',
                    color: 'rgba(255, 0, 0, 0.3)',
                    dashStyle: 'ShortDash',
                    lineWidth: 3,
                    data: [[0, parseFloat($scope.modalGraficoVars.BINV_CAPACIDAD.toString().replace(',', '.'))], [dataSerie.length - 1, parseFloat($scope.modalGraficoVars.BINV_CAPACIDAD.toString().replace(',', '.'))]],
                  }
                ]

                dataPlotBands = [
                  {
                    color: 'rgba(0, 128, 0, 0.7)', // Color value
                    from: $scope.modalGraficoVars.BINV_APETITO,
                    to: 10000000,
                    label: {
                      // text: 'Exceso'
                    }
                  },
                  { // Light air
                    from: 0,
                    to: $scope.modalGraficoVars.BINV_CAPACIDAD,
                    // from: 0,
                    // to: dato1_Max,
                    color: 'rgba(255, 0, 0, 0.7)',
                    label: {
                      // text: 'Baja',
                      style: {
                        color: '#000000'
                      }
                    }

                  }, { // Light breeze
                    from: $scope.modalGraficoVars.BINV_CAPACIDAD,
                    to: $scope.modalGraficoVars.BINV_TOLERANCIA,
                    // from: dato2_Min,
                    // to: dato2_Max,
                    color: 'rgba(255, 0, 0, 0.3)',
                    label: {
                      // text: 'Media',
                      style: {
                        color: '#000000'
                      }
                    }
                  }, { // Light breeze
                    from: $scope.modalGraficoVars.BINV_TOLERANCIA,
                    to: $scope.modalGraficoVars.BINV_APETITO,
                    // from: dato3_Min,
                    // to: parseFloat($scope.modalGraficoVars.REGC_DATOMAX),
                    color: 'rgba(255, 255, 0, 0.7)',
                    label: {
                      // text: 'Toterancia',
                      style: {
                        color: '#000000'
                      }
                    }
                  }
                ]
              }


              //GENERAR GRAFICO
              $scope.graficoIndicador = Highcharts.chart('graficoIndicador', {
                chart: {
                  type: 'line'
                },
                title: {
                  text: $scope.modalGraficoVars.BINV_NOM_INDICADOR
                },
                // subtitle: {
                //   text: $scope.modalGraficoVars.UNIC_NOMBRE
                // },
                xAxis: {
                  categories: dataMeses
                },
                yAxis: {
                  // min: 0,
                  // max: 110,
                  // tickInterval: 10,
                  gridLineColor: '',
                  title: {
                    text: ''
                  },
                  plotBands: dataPlotBands
                },

                plotOptions: {
                  line: {
                    dataLabels: {
                      enabled: true
                    },
                  }
                },
                series: xSerie,
                // exporting: { enabled: false },
                credits: { enabled: false },
              });
              //GENERAR GRAFICO
              // $scope.modalGraficoVars.BINV_APETITO
              // $scope.modalGraficoVars.BINV_CAPACIDAD
              // $scope.modalGraficoVars.BINV_TOLERANCIA

            }, 500);
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        })
      }

      $scope.filtrarPeriodoAcumulado = function (periodo) {
        // console.log($scope.modalGraficoVars.listado.filter(e => parseInt(e.GESN_PERIODO) == periodo)[0].GESN_ACUMULADO)
        const dato = parseFloat((($scope.modalGraficoVars.listado.filter(e => parseInt(e.BINN_PERIODO) == periodo))[0].BINN_RESULTADO.toString()).replace(',', '.'));
        return dato == 0 ? null : dato
      }


      $scope.modalDatosCorresp = function (x) {
        // x.seleccionado = true
        $scope.itemSeleccionado = x.BINN_CONSECUTIVO
        $scope.modalDatosCambio = x;
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $scope.modalDatosCorrespVars = {}
        $scope.modalDatosCorrespVars = JSON.parse(JSON.stringify(x));
        $scope.modalDatosCorrespVarsPeriodo = {}
        // $scope.modalDatosCorrespVars.listadoAnio = []
        $scope.modalDatosCorrespVars.vista = 1
        // $scope.modalDatosCorrespVars.anio = $scope.SysDay.getFullYear();
        // for (let i = 2023; i <= $scope.SysDay.getFullYear(); i++) {
        //   $scope.modalDatosCorrespVars.listadoAnio.push({ 'codigo': i });
        // }
        $scope.modalDatosCorrespVars.anioAnterior = $scope.SysDay.getFullYear();
        $scope.modalDatosCorrespVars.anio = $scope.SysDay.getFullYear();
        setTimeout(() => { $scope.$apply(); }, 500);
        setTimeout(() => {
          $scope.modalDatosCorrespObtenerdatos(x);
          $scope.openModal('modalDatosCorresp');
          setTimeout(() => { swal.close() }, 700);
        }, 1000);
      }

      $scope.cargarDatosPeriodoChange = function () {
        if ($scope.modalDatosCorrespVars.anioAnterior != $scope.modalDatosCorrespVars.anio) {
          $scope.modalDatosCorrespVars.anioAnterior = $scope.modalDatosCorrespVars.anio;
          $scope.modalDatosCorrespObtenerdatos($scope.modalDatosCorrespVars);
        }
      }

      $scope.modalDatosCorrespObtenerdatos = function (x) {
        $http({
          method: 'POST',
          url: "php/riesgos/indicadoresriesgos.php",
          data: {
            function: "p_lista_gestion_indicador",
            consecutivo: x.BINN_CONSECUTIVO
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.Codigo == 1) {
            swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
          }
          if (data.length > 0) {
            $scope.modalDatosCorrespVars.listado = data
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        })
      }

      $scope.modalDatosCorrespGestionarPeriodo = function (x) {
        // console.log($scope.modalDatosCorrespVars);
        $scope.modalDatosCorrespVars.vista = 2;
        $scope.modalDatosCorrespVarsPeriodo.anio = x.BINN_ANNO
        $scope.modalDatosCorrespVarsPeriodo.periodoNombre = x.BINN_PERIODO_NOMBRE
        $scope.modalDatosCorrespVarsPeriodo.periodo = x.BINN_PERIODO
        $scope.modalDatosCorrespVarsPeriodo.numerador = x.BINN_NUMERADOR != null ? x.BINN_NUMERADOR.toString().replace(',', '.') : ''
        $scope.modalDatosCorrespVarsPeriodo.denominador = x.BINN_DENOMINADOR != null ? x.BINN_DENOMINADOR.toString().replace(',', '.') : ''
        $scope.modalDatosCorrespVarsPeriodo.constante = x.BINN_CONSTANTE != null ? x.BINN_CONSTANTE.toString().replace(',', '.') : ''
        $scope.modalDatosCorrespVarsPeriodo.resultado = x.BINN_RESULTADO;



        $scope.calcularResultadoPeriodo()
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.calcularResultadoPeriodo = function () {
        $scope.modalDatosCorrespVarsPeriodo.resultado = '?'
        if ($scope.modalDatosCorrespVarsPeriodo.numerador == '' || $scope.modalDatosCorrespVarsPeriodo.denominador == '') return;

        if ($scope.modalDatosCorrespVars.BINC_TIPO_CALCULO.split('-')[0] == 'PO') {
          $scope.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            (parseFloat($scope.modalDatosCorrespVarsPeriodo.numerador) / parseFloat($scope.modalDatosCorrespVarsPeriodo.denominador))
            * 100
          ).toFixed(2)
        }
        if ($scope.modalDatosCorrespVars.BINC_TIPO_CALCULO.split('-')[0] == 'RA') {
          $scope.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            parseFloat($scope.modalDatosCorrespVarsPeriodo.numerador) / parseFloat($scope.modalDatosCorrespVarsPeriodo.denominador)
          ).toFixed(2)
        }
        if ($scope.modalDatosCorrespVars.BINC_TIPO_CALCULO.split('-')[0] == 'TA') {
          if ($scope.modalDatosCorrespVarsPeriodo.constante == '') return

          $scope.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            (parseFloat($scope.modalDatosCorrespVarsPeriodo.numerador) / parseFloat($scope.modalDatosCorrespVarsPeriodo.denominador))
            * parseFloat($scope.modalDatosCorrespVarsPeriodo.constante)
          ).toFixed(2)
        }

        if ($scope.modalDatosCorrespVars.BINC_TIPO_CALCULO.split('-')[0] == 'VA') {
          $scope.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            ((parseFloat($scope.modalDatosCorrespVarsPeriodo.numerador) - parseFloat($scope.modalDatosCorrespVarsPeriodo.denominador)) / parseFloat($scope.modalDatosCorrespVarsPeriodo.denominador))
            * 100
          ).toFixed(2)
        }

        if ($scope.modalDatosCorrespVars.BINC_TIPO_CALCULO.split('-')[0] == 'DI') {

          $scope.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            100 - (parseFloat($scope.modalDatosCorrespVarsPeriodo.numerador) / parseFloat($scope.modalDatosCorrespVarsPeriodo.denominador)) * 100
          ).toFixed(2)
        }

        if ($scope.modalDatosCorrespVars.BINC_TIPO_CALCULO.split('-')[0] == 'AJ') {
          if ($scope.modalDatosCorrespVarsPeriodo.constante == '') return

          $scope.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            parseFloat($scope.modalDatosCorrespVarsPeriodo.constante) -
            ((parseFloat($scope.modalDatosCorrespVarsPeriodo.constante) * parseFloat($scope.modalDatosCorrespVarsPeriodo.numerador)) / parseFloat($scope.modalDatosCorrespVarsPeriodo.denominador))
          ).toFixed(2)
        }

        if ($scope.modalDatosCorrespVars.BINC_TIPO_CALCULO.split('-')[0] == 'DE') {
          if ($scope.modalDatosCorrespVarsPeriodo.constante == '') return

          $scope.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            1 -
            (parseFloat($scope.modalDatosCorrespVarsPeriodo.numerador) / parseFloat($scope.modalDatosCorrespVarsPeriodo.denominador) * parseFloat($scope.modalDatosCorrespVarsPeriodo.constante))
          ).toFixed(2)
        }
        if ($scope.modalDatosCorrespVars.BINC_TIPO_CALCULO.split('-')[0] == 'TL') {
          if ($scope.modalDatosCorrespVarsPeriodo.constante == '') return

          $scope.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            ((parseFloat($scope.modalDatosCorrespVarsPeriodo.numerador) - parseFloat($scope.modalDatosCorrespVarsPeriodo.denominador)) * parseFloat($scope.modalDatosCorrespVarsPeriodo.constante))
          ).toFixed(2)
        }
        if ($scope.modalDatosCorrespVars.BINC_TIPO_CALCULO.split('-')[0] == 'CT') {
          // if ($scope.modalDatosCorrespVarsPeriodo.constante == '') return

          $scope.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            (parseFloat($scope.modalDatosCorrespVarsPeriodo.numerador) - parseFloat($scope.modalDatosCorrespVarsPeriodo.denominador))
          ).toFixed(2)
        }
        if ($scope.modalDatosCorrespVars.BINC_TIPO_CALCULO.split('-')[0] == 'PR') {

          $scope.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            (parseFloat($scope.modalDatosCorrespVarsPeriodo.numerador) + parseFloat($scope.modalDatosCorrespVarsPeriodo.denominador)) / 2
          ).toFixed(2)
        }

      }

      $scope.hojaIndicadoresAtrasModalPeriodo = function () {
        $scope.modalDatosCorrespVars.vista = 1;
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.modalDatosCorrespValidarForm = function () {
        return new Promise((resolve) => {
          if ($scope.modalDatosCorrespVars.BINC_TIPO_CALCULO.split('-')[0] != 'CA' && !$scope.modalDatosCorrespVarsPeriodo.numerador) resolve(false)
          if ($scope.modalDatosCorrespVars.BINC_TIPO_CALCULO.split('-')[0] != 'CA' && !$scope.modalDatosCorrespVarsPeriodo.denominador) resolve(false)
          if ($scope.modalDatosCorrespVars.BINC_TIPO_CALCULO.split('-')[0] == 'TA' && !$scope.modalDatosCorrespVarsPeriodo.constante) resolve(false)
          if ($scope.modalDatosCorrespVars.BINC_TIPO_CALCULO.split('-')[0] == 'CA' && !$scope.modalDatosCorrespVarsPeriodo.constante) resolve(false)
          if ($scope.modalDatosCorrespVars.BINC_TIPO_CALCULO.split('-')[0] == 'AJ' && !$scope.modalDatosCorrespVarsPeriodo.constante) resolve(false)
          if ($scope.modalDatosCorrespVars.BINC_TIPO_CALCULO.split('-')[0] == 'DE' && !$scope.modalDatosCorrespVarsPeriodo.constante) resolve(false)
          if ($scope.modalDatosCorrespVars.BINC_TIPO_CALCULO.split('-')[0] == 'TL' && !$scope.modalDatosCorrespVarsPeriodo.constante) resolve(false)
          resolve(true)
        });
      }

      $scope.modalDatosCorrespGuardarPeriodo = function () {
        $scope.modalDatosCorrespValidarForm().then(res => {
          if (!res) { swal("¡Importante!", "Diligencia los campos requeridos (*)", "warning").catch(swal.noop); return }
          const text = '¿Desea actualizar el periodo?';
          // const text = $scope.modalDatosCorrespVarsPeriodo.accion == 'I' ? '¿Desea registrar el periodo?' : '¿Desea actualizar el periodo?';
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

              const datos =
                [{
                  pconsecutivo: $scope.modalDatosCorrespVars.BINN_CONSECUTIVO,
                  panio: $scope.modalDatosCorrespVars.BINN_ANNO,
                  pperiodo: $scope.modalDatosCorrespVarsPeriodo.periodo,
                  pnumerador: $scope.modalDatosCorrespVarsPeriodo.numerador.replace('.', ','),
                  pdenominador: $scope.modalDatosCorrespVarsPeriodo.denominador.replace('.', ','),
                  pconstante: $scope.modalDatosCorrespVarsPeriodo.constante.replace('.', ','),
                  presponsable: $scope.Rol_Cedula
                }]
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
                url: "php/riesgos/indicadoresriesgos.php",
                data: {
                  function: 'p_ui_gestion_indicador',
                  datos: JSON.stringify(datos),
                  accion: $scope.modalDatosCorrespVarsPeriodo.accion
                }
              }).then(function ({ data }) {
                if (data.toString().substr(0, 3) == '<br' || data == 0) {
                  swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                }
                if (data.Codigo == 0) {
                  swal("Mensaje", "Datos guardados", "success").catch(swal.noop);

                  $scope.modalDatosCorrespVars.vista = 1;
                  $scope.modalDatosCorrespObtenerdatos($scope.modalDatosCorrespVars);
                  $scope.hojaIndicadores_listarIndicadores();

                  setTimeout(() => { $scope.$apply(); }, 500);
                }
                if (data.Codigo == 1) {
                  swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                }
              });
            }
          });
        });
      }

      // Compromisos

      ////////////// PDM ////////////////
      ////////////// PDM ////////////////
      ////////////// PDM ////////////////

      /////// INDICADORES ///////
      $scope.obtenerEstadoIndicadores = function (tipo = null) {
        const tipos = {
          A: "Activo",
          I: "Inactivo",
          S: "Activa",
          N: "Inactiva",
        };
        return tipos[tipo] || "Ninguno";
      }

      $scope.obtenerEstadoGestionIndicador = function (tipo = null) {
        const tipos = {
          CAPACIDAD: "etiquetaRojaClara",
          TOLERANCIA: "etiquetaNaranja",
          APETITO: "etiquetaVerde",
          MAXIMO: "etiquetaRoja",
          CAPACIDAD_S: "etiquetaRoja",
        }
        return tipos[tipo] || "etiquetaGris";
      }

      $scope.obtenerMesNombre = function (tipo = null, longitud = 3) {
        const tipos = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return tipos[tipo].substr(0, longitud)
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
          if (Math.ceil($scope[hoja].listadoTablaTemp.length / $scope[hoja].varsTabla.pageSize) > $scope.valmaxpag)
            fin = 10;
          else
            fin = Math.ceil($scope[hoja].listadoTablaTemp.length / $scope[hoja].varsTabla.pageSize);
        } else {
          if (ini >= Math.ceil($scope[hoja].listadoTablaTemp.length / $scope[hoja].varsTabla.pageSize) - $scope.valmaxpag) {
            ini = Math.ceil($scope[hoja].listadoTablaTemp.length / $scope[hoja].varsTabla.pageSize) - $scope.valmaxpag;
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

      $scope.convertDate = function (text) {
        let vtext = text.split('/')
        return new Date(`${vtext[2]}/${vtext[1]}/${vtext[0]}`);
      }

      $scope.openModal = function (modal) {
        $(`#${modal}`).modal('open');
        // setTimeout(() => { document.querySelector(`#${modal}`).style.top = 1 + '%'; }, 600);
      }
      $scope.closeModal = function () {
        $(".modal").modal("close");
      }
      $scope.SetTab = function (x) {
        $scope.Tabs = x;
        if (x == 2 && $scope.hojaPermisos.listadoTabla.length == 0) {
          $scope.hojaPermisos_obtenerFuncs();
        }
      }

      $scope.descargarSoporte = function (ruta) {
        $http({
          method: 'POST',
          url: "php/riesgos/indicadoresriesgos.php",
          data: {
            function: 'descargaFile',
            ruta
          }
        }).then(function (response) {
          var win = window.open("temp/" + response.data, '_blank');
          win.focus();
        });
      }

      $scope.replaceVar = function (text) {
        return text.replace(/\_/g, '.')
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

    }]);
