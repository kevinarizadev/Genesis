'use strict';
angular.module('GenesisApp')
  .controller('procesospoaController', ['$scope', '$http', '$filter',
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


        $scope.cargarPermisosUsuario();

        setTimeout(() => {
          if ($scope.validarPermisos(['AS'])) {
            $scope.hojaProcesosLimpiar()
            $scope.hojaProcesosListar();
            $scope.hojaProcesosListarlistadoPerspectiva()
            $scope.hojaProcesosListarObjetivoEstrategico()
          }
        }, 1000);
        $scope.hojaIndicadoresLimpiar()
        $scope.hojaIndicadoresListar();

        //
        // $scope.activarCamposDesactivados()
        setTimeout(() => {
          $scope.$apply();
        }, 500);

        //////////////////////////////////////////////////////////
      }

      $scope.cargarPermisosUsuario = function () {
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: 'p_consulta_permisos_usuario',
            cedula: $scope.Rol_Cedula
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'No tiene permisos, por favor contactar al area de Planeación', "warning").catch(swal.noop); return
          }
          if (data.length) {
            $scope.permisos = data[0]

            // TERV_CODIGO: "1042454684",
            // TERC_NOMBRE: "ARIZA NUNEZ KEVIN JAVIER",
            // CARN_CODIGO: "22",
            // CARC_NOMBRE: "ASISTENTE NACIONAL DE TIC",
            // UNIN_CODIGO: "2",
            // UNIC_NOMBRE: "GESTIÓN LOGÍSTICA",
            // TERC_ESTADO_EMPLEADO: "A",
            // TERC_ESTADO_ADMIN_PLANEACION: "A",
            // TERC_TIPO_ADMIN_PLANEACION: "AS"

            if (data[0].TERC_TIPO_ADMIN_PLANEACION != 'AS') {
              $scope.Tabs = 2
            } else {
              $scope.Tabs = 1
            }
            setTimeout(() => {
              $('.tabs').tabs();
              setTimeout(() => { $scope.$apply(); }, 500);
            }, 1500);
            console.table(data)
          }
        });
      }

      $scope.validarPermisos = function (lista) {
        if (!lista || !$scope.permisos || !$scope.permisos.TERC_TIPO_ADMIN_PLANEACION) return
        // console.log(lista.includes($scope.permisos.TERC_TIPO_ADMIN_PLANEACION))
        if (lista.includes($scope.permisos.TERC_TIPO_ADMIN_PLANEACION)) {
          // console.log(lista)
          return true
        }
      }

      /////// PROCESOS ///////
      $scope.hojaProcesosLimpiar = function () {
        $scope.hojaProcesos = {
          filtro: '',
          listadoTabla: [],
          listadoTablaTemp: [],
          varsTabla: {
            currentPage: 0,
            pageSize: 10,
            valmaxpag: 10,
            pages: []
          },

          formulario: {
            listadoTipo: [
              { codigo: 1, nombre: 'Estrategico' },
              { codigo: 2, nombre: 'Misional' },
              { codigo: 3, nombre: 'Apoyo' },
              { codigo: 4, nombre: 'Evaluacion' }
            ],
            listadoCategoria: [
              { codigo: 1, nombre: 'Oficina' },
              { codigo: 2, nombre: 'Subgerencia' },
              { codigo: 3, nombre: 'Coordinacion Nacional o Regional' },
            ],
            listadoObjetivoPerspectiva: [],
            listadoObjetivoEstrategico: []
            // listadoObjetivoEstrategico: [
            //   { codigo: 1, nombre: 'Mejorar calidad en la atención en salud' },
            //   { codigo: 2, nombre: 'Crecer poblacionalmente' },
            //   { codigo: 3, nombre: 'Ser sostenibles financieramente' },
            //   { codigo: 4, nombre: 'Fortalecer institucionalmente la empresa' }
            // ],
          }
        }

      }

      $scope.hojaProcesosListarlistadoPerspectiva = function () {
        $scope.hojaProcesos.formulario.listadoObjetivoPerspectiva = [];
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: 'p_obtener_objetivos_perspectiva',
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.length) {
            $scope.hojaProcesos.formulario.listadoObjetivoPerspectiva = data
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        });
      }

      $scope.hojaProcesosListarObjetivoEstrategico = function () {
        $scope.hojaProcesos.formulario.listadoObjetivoEstrategico = [];
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: 'p_obtener_objetivo_estrategico'
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.length) {
            $scope.hojaProcesos.formulario.listadoObjetivoEstrategico = data
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        });
      }

      $scope.hojaProcesosListar = function (x) {
        if (!x)
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            showConfirmButton: false,
            animation: false
          });
        $scope.hojaProcesos.listadoTabla = [];
        $scope.hojaProcesos.listadoTablaTemp = [];
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: 'p_consulta_proceso'
          }
        }).then(function ({ data }) {
          if (!x) swal.close();
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.length) {
            $scope.hojaProcesos.listadoTabla = data
            $scope.hojaProcesos.listadoTablaTemp = data
            $scope.initPaginacion('hojaProcesos', $scope.hojaProcesos.listadoTabla);
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        });

      }

      $scope.hojaProcesosCrearNuevo = function () {
        $scope.hojaProcesos.formulario.nombre = '';
        $scope.hojaProcesos.formulario.tipo = '';
        $scope.hojaProcesos.formulario.categoria = '';
        $scope.hojaProcesos.formulario.descripcion = '';
        $scope.hojaProcesos.formulario.soporteB64 = '';
        $scope.hojaProcesos.formulario.soporteExt = '';
        $scope.hojaProcesos.formulario.soporteUrl = '';
        $scope.hojaProcesos.formulario.estado = 'A';
        $scope.hojaProcesos.formulario.objetivoEstrategico = '';
        $scope.hojaProcesos.formulario.objetivoTactivo = '';
        $scope.hojaProcesos.formulario.listadoObjetivos = [];
        $scope.hojaProcesos.formulario.idProcesoSeleccionado = '';

        setTimeout(() => { $scope.$apply(); }, 500);
      }


      $scope.agregarObjetivo = function () {
        if (!$scope.hojaProcesos.formulario.objetivoEstrategico || !$scope.hojaProcesos.formulario.objetivoTactivo) {
          swal("¡Importante!", "Debe diligenciar los dos objetivos", "warning").catch(swal.noop);
          return
        }
        $scope.hojaProcesos.formulario.listadoObjetivos.push(
          {
            codigo_perspectiva: $scope.hojaProcesos.formulario.perspectiva,
            nombre_perspectiva: $scope.hojaProcesos.formulario.listadoObjetivoPerspectiva.find(e => e.codigo == $scope.hojaProcesos.formulario.perspectiva).nombre,
            codigo_estrategico: $scope.hojaProcesos.formulario.objetivoEstrategico,
            nombre_estrategico: $scope.hojaProcesos.formulario.listadoObjetivoEstrategico.find(e => e.codigo == $scope.hojaProcesos.formulario.objetivoEstrategico).nombre,
            codigo_tactico: 0,
            nombre_tactico: $scope.hojaProcesos.formulario.objetivoTactivo,
          }
        );
        $scope.hojaProcesos.formulario.perspectiva = '';
        $scope.hojaProcesos.formulario.objetivoEstrategico = '';
        $scope.hojaProcesos.formulario.objetivoTactivo = '';

        $scope.actualizarConsObjetivo();

      }
      $scope.quitarObjetivo = function (index) {
        if ($scope.hojaProcesos.formulario.listadoObjetivos[index].existen_indicador != '0') {
          swal("¡Importante!", "No es posible eliminar el objetivo, Existe un indicador relacionado", "warning").catch(swal.noop);
          return
        }
        $scope.hojaProcesos.formulario.listadoObjetivos.splice(index, 1);
        $scope.actualizarConsObjetivo()
        setTimeout(() => { $scope.$apply(); }, 500);
      }
      $scope.actualizarConsObjetivo = function () {
        $scope.hojaProcesos.formulario.listadoObjetivos.forEach((element, index) => {
          element.codigo_tactico = index + 1;
        });
        setTimeout(() => { $scope.$apply(); }, 500);
      }


      $scope.validarFormProcesos = function () {
        return new Promise((resolve) => {
          if (!$scope.hojaProcesos.formulario.nombre) resolve(false);
          if (!$scope.hojaProcesos.formulario.tipo) resolve(false);
          if (!$scope.hojaProcesos.formulario.categoria) resolve(false);
          if (!$scope.hojaProcesos.formulario.descripcion) resolve(false);
          resolve(true)
        });
      }

      $scope.guardarFormProcesos = function () {
        $scope.validarFormProcesos().then(res => {
          if (!res) { swal("¡Importante!", "Diligencia los campos requeridos (*)", "warning").catch(swal.noop); return }
          const text = $scope.hojaProcesos.formulario.idProcesoSeleccionado == '' ? '¿Desea crear el proceso?' : '¿Desea actualizar el proceso?';
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
              $scope.cargarSoporte().then((resultSoporte) => {
                $http({
                  method: 'POST',
                  url: "php/planeacion/procesospoa.php",
                  data: {
                    function: "p_ui_proceso",
                    codigo: $scope.hojaProcesos.formulario.idProcesoSeleccionado,

                    nombre: $scope.hojaProcesos.formulario.nombre,
                    tipo: $scope.hojaProcesos.formulario.tipo,
                    categoria: $scope.hojaProcesos.formulario.categoria,
                    descripcion: $scope.hojaProcesos.formulario.descripcion,
                    soporte: resultSoporte ? resultSoporte : $scope.hojaProcesos.formulario.soporteUrl,

                    estado: $scope.hojaProcesos.formulario.estado,
                    jsonObjetivos: JSON.stringify($scope.hojaProcesos.formulario.listadoObjetivos),
                    jsonObjetivosCantidad: $scope.hojaProcesos.formulario.listadoObjetivos.length,
                    accion: $scope.hojaProcesos.formulario.idProcesoSeleccionado == '' ? 'I' : 'U',

                  }
                }).then(function ({ data }) {
                  if (data.toString().substr(0, 3) == '<br' || data == 0) {
                    swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                  }
                  if (data.Codigo == 0) {
                    swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                    $scope.hojaProcesosListar(1);
                    $scope.closeModal()
                  }
                  if (data.Codigo == 1) {
                    swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                  }
                })
              })
            }
          })
        })

      }

      $scope.cargarSoporte = function () {
        return new Promise((resolve) => {
          if (!$scope.hojaProcesos.formulario.soporteB64) { resolve(''); return }
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
            url: "php/planeacion/procesospoa.php",
            data: {
              function: "cargarSoporte",
              codigo: "SoporteProceso",
              // codigo: $scope.hojaProcesos.formulario.idProcesoSeleccionado,
              base64: $scope.hojaProcesos.formulario.soporteB64
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

      document.querySelector('#procesosFile').addEventListener('change', function (e) {
        $scope.hojaProcesos.formulario.soporteB64 = "";
        setTimeout(() => { $scope.$apply(); }, 500);
        var files = e.target.files;
        if (files.length != 0) {
          for (let i = 0; i < files.length; i++) {
            const x = files[i].name.split('.');
            if (x[x.length - 1].toUpperCase() == 'PDF') {
              if (files[i].size < 15485760 && files[i].size > 0) {
                $scope.getBase64(files[i]).then(function (result) {
                  $scope.hojaProcesos.formulario.soporteExt = x[x.length - 1].toLowerCase();
                  $scope.hojaProcesos.formulario.soporteB64 = result;
                  setTimeout(function () { $scope.$apply(); }, 300);
                });
              } else {
                document.querySelector('#procesosFile').value = '';
                swal('Advertencia', '¡Uno de los archivos seleccionados excede el peso máximo posible (5MB)!', 'info');
              }
            } else {
              document.querySelector('#procesosFile').value = '';
              swal('Advertencia', '¡El archivo seleccionado debe ser un formato diferente!', 'info');
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

      $scope.modalCrearProcesos = function () {
        $scope.hojaProcesosCrearNuevo()
        $scope.openModal('modalCrearProcesos');
      }
      // EDITAR PROCESO
      $scope.modalEditarProcesos = function (x) {
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_consulta_objetivo_proceso",
            codigo: x.UNIN_CODIGO,

          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br') {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }

          $scope.hojaProcesos.formulario.nombre = x.UNIC_NOMBRE;
          $scope.hojaProcesos.formulario.tipo = x.UNIC_MACRO_PROCESO;
          $scope.hojaProcesos.formulario.categoria = x.UNIC_CATEGORIA ?? '';
          $scope.hojaProcesos.formulario.descripcion = x.UNIC_DESCRIPCION ?? '';
          $scope.hojaProcesos.formulario.soporteB64 = '';
          $scope.hojaProcesos.formulario.soporteExt = '';
          $scope.hojaProcesos.formulario.soporteUrl = x.UNIC_SOPORTE ?? '';
          $scope.hojaProcesos.formulario.estado = x.UNIC_ESTADO;
          $scope.hojaProcesos.formulario.objetivoEstrategico = '';
          $scope.hojaProcesos.formulario.objetivoTactivo = '';
          $scope.hojaProcesos.formulario.idProcesoSeleccionado = x.UNIN_CODIGO;
          $scope.hojaProcesos.formulario.listadoObjetivos = [];

          data.forEach(x => {
            $scope.hojaProcesos.formulario.listadoObjetivos.push(
              {
                codigo_perspectiva: x.CODIGO_PERSPECTIVA,
                nombre_perspectiva: x.NOMBRE_PERSPECTIVA,
                codigo_estrategico: x.UNIN_OBJETIVO_COD_ESTR,
                nombre_estrategico: x.NOMBRE,
                codigo_tactico: x.UNIN_OBJETIVO_COD_TACT,
                nombre_tactico: x.UNIC_NOMBRE,
                existen_indicador: x.EXISTE_INDICADOR,
              }
            );
          })

          // NOMBRE: "RENTABILIDAD"
          // UNIC_NOMBRE: "NUEVO PROCESO"
          // UNIC_SOPORTE: null
          // UNIN_OBJETIVO_COD_ESTR: "14"
          // UNIN_OBJETIVO_COD_TACT: "1"

          // UNIC_CATEGORIA: null
          // UNIC_DESCRIPCION: null
          // UNIC_ESTADO: "A"
          // UNIC_MACRO_PROCESO: null
          // UNIC_NOMBRE: "TODOS"
          // UNIC_SOPORTE: null
          // UNIN_CODIGO: "12"


          $scope.openModal('modalCrearProcesos');
          setTimeout(() => { $scope.$apply(); }, 500);
        })
      }


      $scope.obtenerTipoProceso = function (tipo = null) {
        if (!tipo) { return 'Ninguno' }
        return $scope.hojaProcesos.formulario.listadoTipo.find(e => e.codigo == tipo).nombre
      }
      $scope.obtenerCategoriaProceso = function (tipo = null) {
        if (!tipo) { return 'Ninguna' }
        return $scope.hojaProcesos.formulario.listadoCategoria.find(e => e.codigo == tipo).nombre
      }
      $scope.obtenerEstado = function (tipo = null) {
        const tipos = {
          A: "Activo",
          I: "Inactivo",
        };
        return tipos[tipo] || "Ninguno";
      }

      /////// PROCESOS ///////

      //////

      /////// INDICADORES ///////
      /////// INDICADORES ///////
      /////// INDICADORES ///////
      $scope.hojaIndicadoresLimpiar = function () {
        $scope.hojaIndicadores = {
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
          listadoObjetivos: [],
          listadoNivel: [
            { codigo: '1', nombre: 'Nacional' },
            { codigo: '2', nombre: 'Regional' },
            { codigo: '3', nombre: 'Regional o Nacional' },
            { codigo: '4', nombre: 'Subregional' },
          ],
          listadoDependencias: [],
          listadoUnidadMedida: [
            { codigo: '1', nombre: 'Numérica' },
            { codigo: '2', nombre: 'Porcentaje' },
            { codigo: '3', nombre: 'Fracción' },
            { codigo: '4', nombre: 'Días' },
            { codigo: '5', nombre: 'Horas' },
            { codigo: '6', nombre: 'Tasa' },
            { codigo: '7', nombre: 'Valor Absoluto' },
            { codigo: '8', nombre: 'Veces' },
          ],
          listadoFrecuencia: [
            { codigo: 'M', nombre: 'Mensual', meses: 12 },
            { codigo: 'B', nombre: 'Bimestral', meses: 6 },
            { codigo: 'T', nombre: 'Trimestral', meses: 4 },
            { codigo: 'S', nombre: 'Semestral', meses: 2 },
            { codigo: 'A', nombre: 'Anual', meses: 1 },
          ],
          //
          listadoVigencia: [
            { codigo: 'M', nombre: 'Meses' },
            { codigo: 'A', nombre: 'Años' },
          ],
          listadoClasifIndicador: [
            { codigo: 'O', nombre: 'Operativo' },
            { codigo: 'T', nombre: 'Táctico' },
            { codigo: 'E', nombre: 'Estratégico' },
            { codigo: 'P', nombre: 'Plan de Mejoramiento' },
            { codigo: 'R', nombre: 'Otros' },
          ],
          listadoPrioridad: [
            { codigo: 'A', nombre: 'Alta' },
            { codigo: 'M', nombre: 'Media' },
            { codigo: 'B', nombre: 'Baja' },
          ],
          listadoTipoNorma: [
            { codigo: 'I', nombre: 'Institucional' },
            { codigo: 'N', nombre: 'Nación' },
            { codigo: 'M', nombre: 'Ministerio' },
            { codigo: 'L', nombre: 'Local' },
          ],
          listadoPeriodicidadReporte: [
            { codigo: 'E', nombre: 'Semanal' },
            { codigo: 'M', nombre: 'Mensual' },
            { codigo: 'B', nombre: 'Bimestral' },
            { codigo: 'S', nombre: 'Semestral' },
            { codigo: 'A', nombre: 'Anual' },
          ],
          listadoPeriodicidadAnalisis: [
            { codigo: 'E', nombre: 'Semanal' },
            { codigo: 'M', nombre: 'Mensual' },
            { codigo: 'B', nombre: 'Bimestral' },
            { codigo: 'S', nombre: 'Semestral' },
            { codigo: 'A', nombre: 'Anual' },
          ],
          listadotipoCalculo: [
            { codigo: 'CA', nombre: 'Cifra Absoluta' },
            { codigo: 'PO', nombre: 'Porcentaje' },
            { codigo: 'RA', nombre: 'Razón' },
            { codigo: 'TA', nombre: 'Tasa' },
            { codigo: 'VA', nombre: 'Variación' },
            { codigo: 'DI', nombre: 'Diferencia' },
            { codigo: 'AJ', nombre: 'Ajuste' },
          ],
          listadoAnio: []

        }

        // $scope.modalDatosCorrespVars.listadoAnio = []
        // $scope.modalDatosCorrespVars.anio = $scope.SysDay.getFullYear();
        for (let i = 2023; i <= $scope.SysDay.getFullYear(); i++) {
          $scope.hojaIndicadores.listadoAnio.push({ 'codigo': i });
        }


        $scope.hojaIndicadoresObtenerDependencias();
      }


      $scope.hojaIndicadoresListar = function (x) {
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
          url: "php/planeacion/procesospoa.php",
          data: {
            function: 'p_lista_indicadores'
          }
        }).then(function ({ data }) {
          if (!x) swal.close();
          // if (data.toString().substr(0, 3) == '<br' || data == 0) {
          //   swal("Error",  'Sin datos', "warning").catch(swal.noop); return
          // }
          if (data.length) {
            $scope.hojaIndicadores.listadoTabla = data
            $scope.hojaIndicadores.listadoTablaTemp = data
            $scope.initPaginacion('hojaIndicadores', $scope.hojaIndicadores.listadoTabla);
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        });
        ///////////////////////////////////
        // const data = [
        //   { indicador: 'Indicador de Prueba', prioridad: 'Alta', clasificacion: 'Proceso', tipoMedicion: 'Porcentaje', semaforizacion: 'A', diligenciamiento: '100%', analisis: '0%', estado: 'A' },
        //   { indicador: 'Indicador de Prueba 2', prioridad: 'Alta', clasificacion: 'Proceso', tipoMedicion: 'Porcentaje', semaforizacion: 'A', diligenciamiento: '50%', analisis: '0%', estado: 'A' },
        //   { indicador: 'Indicador de Prueba 3', prioridad: 'Alta', clasificacion: 'Proceso', tipoMedicion: 'Porcentaje', semaforizacion: 'A', diligenciamiento: '0%', analisis: '0%', estado: 'A' },
        // ];
        // $scope.hojaIndicadores.listadoTabla = data;
        // $scope.hojaIndicadores.listadoTablaTemp = data;
        // $scope.initPaginacion('hojaIndicadores', $scope.hojaIndicadores.listadoTabla);
        // setTimeout(() => { $scope.$apply(); }, 500);

      }

      $scope.hojaIndicadoresCrearNuevo = function () {
        $scope.activarCamposDesactivados()
        console.log($scope.hojaIndicadores.formulario.idIndicadorSeleccionado, $scope.hojaIndicadores.formulario.nombre)
        // if ($scope.hojaIndicadores.formulario.idIndicadorSeleccionado != '' && $scope.hojaIndicadores.formulario.nombre) {
        $scope.hojaIndicadores.formulario.nombre = '';
        $scope.hojaIndicadores.formulario.estado = 'A';
        $scope.hojaIndicadores.formulario.proceso = '';
        $scope.hojaIndicadores.formulario.tipoProceso = '';
        $scope.hojaIndicadores.formulario.tipoProcesoCod = '';
        $scope.hojaIndicadores.formulario.objetivoEstrategicoTactico = '';
        $scope.hojaIndicadores.formulario.nivel = '';
        $scope.hojaIndicadores.formulario.dependencia = '';
        $scope.hojaIndicadores.formulario.definicion = '';
        //
        $scope.hojaIndicadores.formulario.lineaBase = '';
        $scope.hojaIndicadores.formulario.meta = '';
        $scope.hojaIndicadores.formulario.metaVigencia = '';
        $scope.hojaIndicadores.formulario.unidadMedida = '';
        $scope.hojaIndicadores.formulario.frecuencia = '';
        //
        $scope.hojaIndicadores.formulario.acumulativo = '';
        $scope.hojaIndicadores.formulario.fuenteNumerador = '';
        $scope.hojaIndicadores.formulario.fuenteDenominador = '';
        //
        $scope.hojaIndicadores.formulario.vigencia = '';
        $scope.hojaIndicadores.formulario.clasificacionIndicador = '';
        $scope.hojaIndicadores.formulario.prioridad = '';
        $scope.hojaIndicadores.formulario.tipoNorma = '';
        $scope.hojaIndicadores.formulario.norma = '';
        $scope.hojaIndicadores.formulario.periodicidadReporte = '';
        $scope.hojaIndicadores.formulario.periodicidadAnalisis = '';
        //
        $scope.hojaIndicadores.formulario.responsableReporte = '';
        $scope.hojaIndicadores.formulario.listadoResponsableReporte = [];

        $scope.hojaIndicadores.formulario.responsableAnalisis = '';
        $scope.hojaIndicadores.formulario.listadoResponsableAnalisis = [];

        $scope.hojaIndicadores.formulario.actores = '';
        $scope.hojaIndicadores.formulario.listadoActores = [];
        $scope.hojaIndicadores.formulario.listadoActoresTabla = [];

        $scope.hojaIndicadores.formulario.tipoCalculo = '';
        $scope.hojaIndicadores.formulario.semaforizacionEstado = '';
        $scope.hojaIndicadores.formulario.semaforizacionSentido = '';
        $scope.hojaIndicadores.formulario.semaforizacionValor1 = '';
        $scope.hojaIndicadores.formulario.semaforizacionValor2 = '';
        $scope.hojaIndicadores.formulario.semaforizacionValor3 = '';

        $scope.hojaIndicadores.formulario.idIndicadorSeleccionado = '';
        // }



        ////////////////////////////////////////////////
        // $scope.hojaIndicadores.formulario.nombre = 'INDICADOR AUDITORIA INTERNA';
        // $scope.hojaIndicadores.formulario.estado = 'A';
        // $scope.hojaIndicadores.formulario.proceso = '';
        // $scope.hojaIndicadores.formulario.tipoProceso = '';
        // $scope.hojaIndicadores.formulario.tipoProcesoCod = '';
        // $scope.hojaIndicadores.formulario.objetivoEstrategicoTactico = '';
        // $scope.hojaIndicadores.formulario.nivel = '1';
        // $scope.hojaIndicadores.formulario.dependencia = '';
        // $scope.hojaIndicadores.formulario.definicion = 'DEFINICION PRUEBA INDICADOR';
        // //
        // $scope.hojaIndicadores.formulario.lineaBase = '60';
        // $scope.hojaIndicadores.formulario.meta = '100';

        // $scope.hojaIndicadores.formulario.unidadMedida = '1';
        // $scope.hojaIndicadores.formulario.frecuencia = 'M';
        // //
        // $scope.hojaIndicadores.formulario.fuenteNumerador = 'FUENTE NUMERADOR PRUEBA INDICADOR';
        // $scope.hojaIndicadores.formulario.fuenteDenominador = 'FUENTE DENOMINADOR PRUEBA INDICADOR';
        // //
        // $scope.hojaIndicadores.formulario.vigencia = 'M';
        // $scope.hojaIndicadores.formulario.clasificacionIndicador = 'O';
        // $scope.hojaIndicadores.formulario.prioridad = 'A';
        // $scope.hojaIndicadores.formulario.tipoNorma = 'I';
        // $scope.hojaIndicadores.formulario.norma = 'NORMA PRUEBA INDICADOR';
        // $scope.hojaIndicadores.formulario.periodicidadReporte = 'S';
        // $scope.hojaIndicadores.formulario.periodicidadAnalisis = 'M';
        // //
        // $scope.hojaIndicadores.formulario.responsableReporte = '1069712551 - LEON ESPITIA ROCIO';
        // $scope.hojaIndicadores.formulario.listadoResponsableReporte = [];

        // $scope.hojaIndicadores.formulario.responsableAnalisis = '1042454684 - ARIZA NUNEZ KEVIN JAVIER';
        // $scope.hojaIndicadores.formulario.listadoResponsableAnalisis = [];

        // $scope.hojaIndicadores.formulario.actores = '';
        // $scope.hojaIndicadores.formulario.listadoActores = [];
        // // $scope.hojaIndicadores.formulario.listadoActoresTabla = [];

        // $scope.hojaIndicadores.formulario.listadoActoresTabla = [{ "codigo": 8901020441, "nombre": "CAJACOPI EPS SAS" }];

        // $scope.hojaIndicadores.formulario.tipoCalculo = '';
        // $scope.hojaIndicadores.formulario.semaforizacionEstado = 'S';
        // $scope.hojaIndicadores.formulario.semaforizacionSentido = 'A';
        // $scope.hojaIndicadores.formulario.semaforizacionValor1 = '40';
        // $scope.hojaIndicadores.formulario.semaforizacionValor2 = '40';
        // $scope.hojaIndicadores.formulario.semaforizacionValor3 = '20';


        // $scope.hojaIndicadores.formulario.idIndicadorSeleccionado = '';
        ////////////////////////////////////////////////
        angular.forEach(document.querySelectorAll('.formIndicador_Desactivar_Estado select'), function (i) {
          i.setAttribute("disabled", true);
        });

        setTimeout(() => { $scope.$apply(); }, 500);
      }

      // EDITAR INDICADOR
      $scope.modalEditarIndicador = function (x) {
        console.log(x);
        $scope.activarCamposDesactivados()
        $scope.hojaIndicadores.formulario.idIndicadorSeleccionado = x.REGN_COD_INDICADOR;


        $scope.hojaIndicadores.formulario.nombre = x.REGN_NOM_INDICADOR;
        $scope.hojaIndicadores.formulario.estado = x.REGC_ESTADO;
        $scope.hojaIndicadores.formulario.proceso = x.REGN_PROCESO;
        // $scope.hojaIndicadores.formulario.tipoProceso = '';
        // $scope.hojaIndicadores.formulario.tipoProcesoCod = '';
        $scope.hojaIndicadores.formulario.objetivoEstrategicoTactico = '';
        $scope.hojaIndicadores.listadoObjetivos = [];

        $scope.hojaIndicadores.formulario.nivel = x.REGN_NIVEL.split('-')[0];
        $scope.hojaIndicadores.formulario.dependencia = x.REGN_DEPENDENCIA.split('-')[0];
        $scope.hojaIndicadores.formulario.definicion = x.REGC_OBJETIVO_INDICADOR;
        //
        $scope.hojaIndicadores.formulario.lineaBase = x.REGN_LINEA_BASE.replace(',', '.');
        $scope.hojaIndicadores.formulario.meta = x.REGN_META.replace(',', '.');
        $scope.hojaIndicadores.formulario.metaVigencia = x.REGN_META_VIGENCIA.replace(',', '.');
        $scope.hojaIndicadores.formulario.unidadMedida = x.REGN_UNIDAD_MEDIDA.split('-')[0];
        $scope.hojaIndicadores.formulario.frecuencia = x.REGC_FRECUENCIA.split('-')[0];
        //
        $scope.hojaIndicadores.formulario.acumulativo = x.REGC_ACUMULATIVO;
        $scope.hojaIndicadores.formulario.fuenteNumerador = x.REGN_FUENTE_NUMERADOR;
        $scope.hojaIndicadores.formulario.fuenteDenominador = x.REGN_FUENTE_DENOMINADOR;
        //
        $scope.hojaIndicadores.formulario.vigencia = x.REGC_VIGENCIA.split('-')[0];
        $scope.hojaIndicadores.formulario.clasificacionIndicador = x.REGC_CLASIFICACION.split('-')[0];
        $scope.hojaIndicadores.formulario.prioridad = x.REGC_PRIORIDAD.split('-')[0];
        $scope.hojaIndicadores.formulario.tipoNorma = x.REGC_TIPO_NORMA ? x.REGC_TIPO_NORMA.split('-')[0] : '';
        $scope.hojaIndicadores.formulario.norma = x.REGC_NORMA;
        $scope.hojaIndicadores.formulario.periodicidadReporte = x.REGC_PERIODICIDAD_REPORTE.split('-')[0];
        $scope.hojaIndicadores.formulario.periodicidadAnalisis = x.REGC_PERIODICIDAD_ANALISIS.split('-')[0];
        //
        $scope.hojaIndicadores.formulario.responsableReporte = `${x.REGV_RESPONSABLE_REPORTE} - ${x.NOMBRE_RESPONSABLE_REPORTE}`;
        $scope.hojaIndicadores.formulario.listadoResponsableReporte = [];

        $scope.hojaIndicadores.formulario.responsableAnalisis = `${x.REGV_RESPONSABLE_ANALISIS} - ${x.NOMBRE_RESPONSABLE_ANALISIS}`;
        $scope.hojaIndicadores.formulario.listadoResponsableAnalisis = [];

        $scope.hojaIndicadores.formulario.actores = '';
        $scope.hojaIndicadores.formulario.listadoActores = [];
        $scope.hojaIndicadores.formulario.listadoActoresTabla = [];

        $scope.hojaIndicadores.formulario.tipoCalculo = x.REGC_TIPO_CALCULO.split('-')[0];
        $scope.hojaIndicadores.formulario.semaforizacionEstado = x.REGC_SEMAFORIZACION;
        $scope.hojaIndicadores.formulario.semaforizacionSentido = x.REGC_TIPO.split('-')[0];
        $scope.hojaIndicadores.formulario.semaforizacionValor1 = x.REGC_DATO1.replace(',', '.');
        $scope.hojaIndicadores.formulario.semaforizacionValor2 = x.REGC_DATO2.replace(',', '.');
        $scope.hojaIndicadores.formulario.semaforizacionValor3 = x.REGC_DATO3.replace(',', '.');

        setTimeout(() => {
          $scope.calcularGraficoSemaforizacion();
          $scope.hojaIndicadoresObtenerTipoyObjetivos(x.REGN_PROCESO)
          setTimeout(() => {
            $scope.hojaIndicadores.formulario.objetivoEstrategicoTactico = `${x.REGN_COD_ESTR}_${x.REGN_COD_TACT}`;
            setTimeout(() => { $scope.$apply(); }, 500);
          }, 1000);
        }, 500);
        $scope.modalObtenerDatosActores(x);

        $scope.openModal('modalCrearIndicadores');
        document.getElementById('modalCrearIndicadores_Scroll').scrollIntoView({ block: 'top', behavior: 'smooth' });
        if (!$scope.validarPermisos(['AS'])) {
          angular.forEach(document.querySelectorAll('.formIndicador_Desactivar_Admin input'), function (i) {
            i.setAttribute("readonly", true);
          });
        }

        if (!$scope.validarPermisos(['AS', 'AM'])) {
          angular.forEach(document.querySelectorAll('.formIndicador_Desactivar input'), function (i) {
            i.setAttribute("readonly", true);
          });
          angular.forEach(document.querySelectorAll('.formIndicador_Desactivar textarea'), function (i) {
            i.setAttribute("readonly", true);
          });
          angular.forEach(document.querySelectorAll('.formIndicador_Desactivar select'), function (i) {
            i.setAttribute("disabled", true);
          });
          angular.forEach(document.querySelectorAll('.formIndicador_Desactivar_Estado select'), function (i) {
            i.setAttribute("disabled", true);
          });
        }
      }

      $scope.calcularMetaVigencia = function () {
        if (!$scope.hojaIndicadores.formulario.acumulativo || !$scope.hojaIndicadores.formulario.meta || !$scope.hojaIndicadores.formulario.periodicidadAnalisis) {
          return
        }
        if ($scope.hojaIndicadores.formulario.acumulativo == 'N') {
          $scope.hojaIndicadores.formulario.metaVigencia = $scope.hojaIndicadores.formulario.meta;
          return
        } else {
          const meses = ($scope.hojaIndicadores.listadoFrecuencia.find(e => e.codigo === $scope.hojaIndicadores.formulario.periodicidadAnalisis.split('-')[0])).meses;
          $scope.hojaIndicadores.formulario.metaVigencia = parseFloat((parseFloat(parseInt($scope.hojaIndicadores.formulario.meta) / parseInt(meses))).toFixed(2)).toString().replace(/\./g, ',');
        }
      }

      $scope.activarCamposDesactivados = function () {
        angular.forEach(document.querySelectorAll('.formIndicador_Desactivar_Admin input'), function (i) {
          i.removeAttribute("readonly");
        });
        //
        angular.forEach(document.querySelectorAll('.formIndicador_Desactivar input'), function (i) {
          i.removeAttribute("readonly");
        });
        angular.forEach(document.querySelectorAll('.formIndicador_Desactivar textarea'), function (i) {
          i.removeAttribute("readonly");
        });
        angular.forEach(document.querySelectorAll('.formIndicador_Desactivar select'), function (i) {
          i.removeAttribute("disabled");
        });
        //
        angular.forEach(document.querySelectorAll('.formIndicador_Desactivar_Estado select'), function (i) {
          i.removeAttribute("disabled");
        });
      }

      $scope.modalObtenerDatosActores = function (x) {
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_consulta_responsable_indicador",
            codigoProceso: x.REGN_PROCESO,
            codigoEstrategico: x.REGN_COD_ESTR,
            codigoTactico: x.REGN_COD_TACT,
            codigoIndicador: x.REGN_COD_INDICADOR,

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
              $scope.hojaIndicadores.formulario.listadoActoresTabla.push({
                "codigo": e.REGV_RESPONSABLE,
                "nombre": e.TERC_NOMBRE
              })
            })
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        })
      }

      $scope.modalFichaTecnica = function (x) {
        $scope.modalFichaTecnicaVars = {}
        $scope.modalFichaTecnicaVars.nombre = x.REGN_NOM_INDICADOR
        $scope.modalFichaTecnicaVars.definicion = x.REGC_OBJETIVO_INDICADOR
        $scope.modalFichaTecnicaVars.fuenteNumerador = x.REGN_FUENTE_NUMERADOR
        $scope.modalFichaTecnicaVars.fuenteDenominador = x.REGN_FUENTE_DENOMINADOR

        $scope.modalFichaTecnicaVars.clasificacionIndicador = x.REGC_CLASIFICACION.split('-')[1]
        $scope.modalFichaTecnicaVars.prioridad = x.REGC_PRIORIDAD.split('-')[1]
        $scope.modalFichaTecnicaVars.tipoNorma = x.REGC_TIPO_NORMA ? x.REGC_TIPO_NORMA.split('-')[1] : ''
        $scope.modalFichaTecnicaVars.periodicidadReporte = x.REGC_PERIODICIDAD_REPORTE.split('-')[1]
        $scope.modalFichaTecnicaVars.periodicidadAnalisis = x.REGC_PERIODICIDAD_ANALISIS.split('-')[1]
        $scope.modalFichaTecnicaVars.responsableRegistro = x.REGV_RESPONSABLE.split('-')[1]

        $scope.modalFichaTecnicaVars.codigoProceso = x.REGN_PROCESO;
        $scope.modalFichaTecnicaVars.codigoEstrategico = x.REGN_COD_ESTR;
        $scope.modalFichaTecnicaVars.codigoTactico = x.REGN_COD_TACT;
        $scope.modalFichaTecnicaVars.idIndicadorSeleccionado = x.REGN_COD_INDICADOR;


        $scope.modalFichaTecnicaVars.dependencia = x.REGN_DEPENDENCIA.split('-')[1];
        $scope.modalFichaTecnicaVars.proceso = x.UNIC_NOMBRE;

        $scope.modalFichaTecnicaVars.semaforizacionEstado = x.REGC_SEMAFORIZACION
        $scope.modalFichaTecnicaVars.semaforizacionSentido = x.REGC_TIPO.split('-')[0]
        $scope.openModal('modalFichaTecnica');
        setTimeout(() => { $scope.$apply(); }, 500);
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
                  url: "php/planeacion/procesospoa.php",
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
                    $scope.hojaIndicadoresListar(1);
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
        // $scope.modalDatosCorrespVars.listado
        if (x.REGC_SEMAFORIZACION == 'N') {
          swal("Mensaje", "Semaforización no activa", "warning").catch(swal.noop);
          return
        }
        $scope.openModal('modalGraficoIndicador');
        $scope.modalGraficoVars = {};
        $scope.modalGraficoVars = x;

        // GESN_ANNO: "2023"
        // GESN_PERIODO_NOMBRE: "Enero"
        // GESN_ACUMULADO: "5"
        $scope.modalGraficoVars.anioAnterior = $scope.SysDay.getFullYear();
        $scope.modalGraficoVars.anio = $scope.SysDay.getFullYear();

        $scope.modalGraficoObtenerdatos(x);

      }

      $scope.cargarGraficoPeriodoChange = function () {
        if ($scope.modalGraficoVars.anioAnterior != $scope.modalGraficoVars.anio) {
          $scope.modalGraficoVars.anioAnterior = $scope.modalGraficoVars.anio;
          $scope.modalGraficoObtenerdatos($scope.modalGraficoVars);
        }
      }

      $scope.modalGraficoObtenerdatos = function (x) {
        if ($scope.graficoIndicador) {
          $scope.graficoIndicador.destroy()
          $scope.graficoIndicador = null;
        }
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_lista_gestion_indicador",
            codigoProceso: x.REGN_PROCESO,
            codigoEstrategico: x.REGN_COD_ESTR,
            codigoTactico: x.REGN_COD_TACT,
            codigoIndicador: x.REGN_COD_INDICADOR,
            anio: $scope.modalGraficoVars.anio
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
              var dataMeses, dataSerie, dataMeta, dataPlotBands, dato1_Max, dato2_Min, dato2_Max, dato3_Min

              if ($scope.modalGraficoVars.REGC_TIPO.split('-')[0] == 'A') { // Orden Ascendente
                dato1_Max = parseFloat($scope.modalGraficoVars.REGC_DATO1);
                dato2_Min = dato1_Max
                dato2_Max = dato2_Min + parseFloat($scope.modalGraficoVars.REGC_DATO2);
                dato3_Min = dato2_Max;

                dataPlotBands = [
                  {
                    color: 'hsl(206deg 90% 69.5% / 10%)', // Color value
                    from: -100,
                    to: 1000
                  },
                  { // Light air
                    from: 0,
                    to: dato1_Max,
                    color: 'rgba(255, 0, 0, 0.2)',
                    label: {
                      text: 'Baja',
                      style: {
                        color: '#000000'
                      }
                    }

                  }, { // Light breeze
                    from: dato2_Min,
                    to: dato2_Max,
                    color: 'rgba(255, 255, 0, 0.3)',
                    label: {
                      text: 'Media',
                      style: {
                        color: '#000000'
                      }
                    }
                  }, { // Light breeze
                    from: dato3_Min,
                    to: 100,
                    color: 'rgba(0, 128, 0, 0.3)',
                    label: {
                      text: 'Alta',
                      style: {
                        color: '#000000'
                      }
                    }
                  }
                ]
              } else { // Orden Descendente
                dato3_Min = 100 - parseFloat($scope.modalGraficoVars.REGC_DATO2);
                dato2_Max = dato3_Min
                dato2_Min = dato2_Max - parseFloat($scope.modalGraficoVars.REGC_DATO2);
                dato1_Max = dato2_Min;
                dataPlotBands = [
                  { // Light air
                    from: dato3_Min,
                    to: 100,
                    color: 'rgba(255, 0, 0, 0.2)',
                    label: {
                      text: 'Baja',
                      style: {
                        color: '#000000'
                      }
                    }
                  }, { // Light breeze
                    from: dato2_Min,
                    to: dato2_Max,
                    color: 'rgba(255, 255, 0, 0.3)',
                    label: {
                      text: 'Media',
                      style: {
                        color: '#000000'
                      }
                    }
                  }, { // Light breeze
                    from: 0,
                    to: dato1_Max,
                    color: 'rgba(0, 128, 0, 0.3)',
                    label: {
                      text: 'Alta',
                      style: {
                        color: '#000000'
                      }
                    }
                  }
                ]
              }
              // M:Mensual; B:Bimestral; T:Trimestral; S:Semestral; A:Anual;
              if (x.REGC_PERIODICIDAD_ANALISIS.split('-')[0] == 'M') {// Mensual
                dataMeses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                dataSerie = [
                  $scope.filtrarPeriodoAcumulado(1) + parseFloat((x.REGN_LINEA_BASE.toString()).replace(',', '.')),
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
              if (x.REGC_PERIODICIDAD_ANALISIS.split('-')[0] == 'B') {// Bimestral
                dataMeses = ['Feb', 'Abr', 'Jun', 'Ago', 'Oct', 'Dic'];
                dataSerie = [
                  $scope.filtrarPeriodoAcumulado(2) + parseFloat((x.REGN_LINEA_BASE.toString()).replace(',', '.')),
                  $scope.filtrarPeriodoAcumulado(4),
                  $scope.filtrarPeriodoAcumulado(6),
                  $scope.filtrarPeriodoAcumulado(8),
                  $scope.filtrarPeriodoAcumulado(10),
                  $scope.filtrarPeriodoAcumulado(12)
                ];
              }
              if (x.REGC_PERIODICIDAD_ANALISIS.split('-')[0] == 'T') {// Trimestral
                dataMeses = ['Mar', 'Jun', 'Sep', 'Dic'];
                dataSerie = [
                  $scope.filtrarPeriodoAcumulado(3) + parseFloat((x.REGN_LINEA_BASE.toString()).replace(',', '.')),
                  $scope.filtrarPeriodoAcumulado(6),
                  $scope.filtrarPeriodoAcumulado(9),
                  $scope.filtrarPeriodoAcumulado(12)
                ];
              }
              if (x.REGC_PERIODICIDAD_ANALISIS.split('-')[0] == 'S') {// Semestral
                dataMeses = ['Jun', 'Dic'];
                dataSerie = [
                  $scope.filtrarPeriodoAcumulado(6) + parseFloat((x.REGN_LINEA_BASE.toString()).replace(',', '.')),
                  $scope.filtrarPeriodoAcumulado(12)
                ];
              }
              if (x.REGC_PERIODICIDAD_ANALISIS.split('-')[0] == 'A') {// Anual
                dataMeses = ['Dic'];
                dataSerie = [
                  $scope.filtrarPeriodoAcumulado(12) + parseFloat((x.REGN_LINEA_BASE.toString()).replace(',', '.'))
                ];
              }

              console.table(dataSerie)
              const meses = ($scope.hojaIndicadores.listadoFrecuencia.find(e => e.codigo === x.REGC_PERIODICIDAD_ANALISIS.split('-')[0])).meses;
              // parseInt($scope.modalGraficoVars.REGN_META_VIGENCIA)
              dataMeta = []
              let meta = x.REGC_ACUMULATIVO == 'S' ? parseFloat($scope.modalGraficoVars.REGN_META_VIGENCIA) : parseFloat($scope.modalGraficoVars.REGN_META);

              for (let i = 0; i < meses; i++) {
                dataMeta.push(meta)
                // parseInt($scope.modalGraficoVars.REGN_META_VIGENCIA)
                meta = x.REGC_ACUMULATIVO == 'S' ? (meta + parseFloat($scope.modalGraficoVars.REGN_META_VIGENCIA)) : meta;
              }

              // if (x.REGC_ACUMULATIVO == 'N') {
              //   dataMeta = [[0, meta], [meses, meta]]
              // }

              //GENERAR GRAFICO
              //GENERAR GRAFICO
              $scope.graficoIndicador = Highcharts.chart('graficoIndicador', {
                chart: {
                  type: 'line'
                },
                title: {
                  text: $scope.modalGraficoVars.UNIC_NOMBRE
                },
                // subtitle: {
                //   text: $scope.modalGraficoVars.UNIC_NOMBRE
                // },
                xAxis: {
                  categories: dataMeses
                },
                yAxis: {
                  min: 0,
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
                series: [
                  {
                    name: 'Periodo',
                    color: '#00e8ff',
                    lineWidth: 3,
                    data: dataSerie
                  },
                  {
                    type: 'line',
                    name: 'META',
                    color: '#32ff08',
                    lineWidth: 4,
                    data: dataMeta,
                    marker: {
                      enabled: false
                    },
                    // enableMouseTracking: false,
                  },
                  //
                  {
                    name: 'Linea base',
                    //color: '#00e8ff',
                    dashStyle: 'ShortDash',
                    lineWidth: 3,
                    data: [[0, parseFloat($scope.modalGraficoVars.REGN_LINEA_BASE.toString().replace(',', '.'))], [dataSerie.length, parseFloat($scope.modalGraficoVars.REGN_LINEA_BASE.toString().replace(',', '.'))]],
                  }
                  //
                ],
                // exporting: { enabled: false },
                credits: { enabled: false },
              });
              //GENERAR GRAFICO
              //GENERAR GRAFICO

            }, 500);
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        })
      }

      $scope.filtrarPeriodoAcumulado = function (periodo) {
        // console.log($scope.modalGraficoVars.listado.filter(e => parseInt(e.GESN_PERIODO) == periodo)[0].GESN_ACUMULADO)
        const dato = parseFloat((($scope.modalGraficoVars.listado.filter(e => parseInt(e.GESN_PERIODO) == periodo))[0].GESN_ACUMULADO.toString()).replace(',', '.'));
        return dato == 0 ? null : dato
      }

      $scope.modalDatosCorresp = function (x) {
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
        // for (let i = 2021; i <= $scope.SysDay.getFullYear(); i++) {
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
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_lista_gestion_indicador",
            codigoProceso: x.REGN_PROCESO,
            codigoEstrategico: x.REGN_COD_ESTR,
            codigoTactico: x.REGN_COD_TACT,
            codigoIndicador: x.REGN_COD_INDICADOR,
            anio: $scope.modalDatosCorrespVars.anio
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
        console.log($scope.modalDatosCorrespVars);
        $scope.modalDatosCorrespVars.vista = 2;
        $scope.modalDatosCorrespVarsPeriodo.anio = x.GESN_ANNO
        $scope.modalDatosCorrespVarsPeriodo.periodoNombre = x.GESN_PERIODO_NOMBRE
        $scope.modalDatosCorrespVarsPeriodo.periodo = x.GESN_PERIODO
        $scope.modalDatosCorrespVarsPeriodo.numerador = x.GESN_NUMERADOR.replace(',', '.')
        $scope.modalDatosCorrespVarsPeriodo.denominador = x.GESN_DENOMINADOR.replace(',', '.')
        $scope.modalDatosCorrespVarsPeriodo.constante = x.GESN_CONSTANTE.replace(',', '.')
        $scope.modalDatosCorrespVarsPeriodo.nota = x.GESC_OBSERVACION
        $scope.modalDatosCorrespVarsPeriodo.accion = x.GESN_ACUMULADO == '0' ? 'I' : 'U'
        $scope.modalDatosCorrespVarsPeriodo.resultado = x.GESN_RESULTADO;
        $scope.calcularResultadoPeriodo()
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.calcularResultadoPeriodo = function () {
        $scope.modalDatosCorrespVarsPeriodo.resultado = '?'
        if ($scope.modalDatosCorrespVarsPeriodo.numerador == '' || $scope.modalDatosCorrespVarsPeriodo.denominador == '') return;

        if ($scope.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'PO') {
          $scope.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            (parseFloat($scope.modalDatosCorrespVarsPeriodo.numerador) / parseFloat($scope.modalDatosCorrespVarsPeriodo.denominador))
            * 100
          ).toFixed(2)
        }
        if ($scope.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'RA') {
          $scope.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            parseFloat($scope.modalDatosCorrespVarsPeriodo.numerador) / parseFloat($scope.modalDatosCorrespVarsPeriodo.denominador)
          ).toFixed(2)
        }
        if ($scope.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'TA') {
          if ($scope.modalDatosCorrespVarsPeriodo.constante == '') return

          $scope.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            (parseFloat($scope.modalDatosCorrespVarsPeriodo.numerador) / parseFloat($scope.modalDatosCorrespVarsPeriodo.denominador))
            * parseFloat($scope.modalDatosCorrespVarsPeriodo.constante)
          ).toFixed(2)
        }

        if ($scope.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'DI') {

          $scope.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            100 - (parseFloat($scope.modalDatosCorrespVarsPeriodo.numerador) / parseFloat($scope.modalDatosCorrespVarsPeriodo.denominador))
          ).toFixed(2)
        }
        if ($scope.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'AJ') {
          if ($scope.modalDatosCorrespVarsPeriodo.constante == '') return

          $scope.modalDatosCorrespVarsPeriodo.resultado = parseFloat(
            parseFloat($scope.modalDatosCorrespVarsPeriodo.constante) -
            ((parseFloat($scope.modalDatosCorrespVarsPeriodo.constante) * parseFloat($scope.modalDatosCorrespVarsPeriodo.numerador)) / parseFloat($scope.modalDatosCorrespVarsPeriodo.denominador))
          ).toFixed(2)
        }
      }

      $scope.atrasModalPeriodo = function () {
        $scope.modalDatosCorrespVars.vista = 1;
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.modalDatosCorrespValidarForm = function () {
        return new Promise((resolve) => {
          if ($scope.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] != 'CA' && !$scope.modalDatosCorrespVarsPeriodo.numerador) resolve(false)
          if ($scope.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] != 'CA' && !$scope.modalDatosCorrespVarsPeriodo.denominador) resolve(false)
          if ($scope.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'TA' && !$scope.modalDatosCorrespVarsPeriodo.constante) resolve(false)
          if ($scope.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'CA' && !$scope.modalDatosCorrespVarsPeriodo.constante) resolve(false)
          if ($scope.modalDatosCorrespVars.REGC_TIPO_CALCULO.split('-')[0] == 'AJ' && !$scope.modalDatosCorrespVarsPeriodo.constante) resolve(false)
          if (!$scope.modalDatosCorrespVarsPeriodo.nota) resolve(false)
          resolve(true)
        });
      }

      $scope.modalDatosCorrespGuardarPeriodo = function () {
        $scope.modalDatosCorrespValidarForm().then(res => {
          if (!res) { swal("¡Importante!", "Diligencia los campos requeridos (*)", "warning").catch(swal.noop); return }
          const text = $scope.modalDatosCorrespVarsPeriodo.accion == 'I' ? '¿Desea registrar el periodo?' : '¿Desea actualizar el periodo?';
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
                  pregn_proceso: $scope.modalDatosCorrespVars.REGN_PROCESO,
                  pcod_estr: $scope.modalDatosCorrespVars.REGN_COD_ESTR,
                  pcod_tact: $scope.modalDatosCorrespVars.REGN_COD_TACT,
                  pcod_indicador: $scope.modalDatosCorrespVars.REGN_COD_INDICADOR,
                  panno: $scope.modalDatosCorrespVars.anio.toString(),
                  pperiodo: $scope.modalDatosCorrespVarsPeriodo.periodo,
                  pnumerador: $scope.modalDatosCorrespVarsPeriodo.numerador.replace('.', ','),
                  pdenominador: $scope.modalDatosCorrespVarsPeriodo.denominador.replace('.', ','),
                  pconstante: $scope.modalDatosCorrespVarsPeriodo.constante.replace('.', ','),
                  pobservacion: $scope.modalDatosCorrespVarsPeriodo.nota,
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
                url: "php/planeacion/procesospoa.php",
                data: {
                  function: 'p_ui_gestion_indicador',
                  datos: JSON.stringify(datos),
                  cantidad: '1',
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
                  $scope.hojaIndicadoresListar();

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

      // $scope.hojaIndicadoresSetTab = function (tab) {
      //   $scope.hojaIndicadores.formulario.tabs = tab;
      //   setTimeout(() => { $scope.$apply(); }, 500);
      // }

      $scope.hojaIndicadoresObtenerTipoyObjetivos = function (proceso) {
        const dato = $scope.hojaProcesos.listadoTabla.find(e => e.UNIN_CODIGO === $scope.hojaIndicadores.formulario.proceso);

        $scope.hojaIndicadores.formulario.tipoProceso = $scope.obtenerTipoProceso(dato.UNIC_MACRO_PROCESO);
        $scope.hojaIndicadores.formulario.tipoProcesoCod = dato.UNIC_MACRO_PROCESO;

        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_consulta_objetivo_proceso",
            codigo: proceso,

          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br') {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data == 0) {
            swal("Error", 'El proceso no tiene objetivos', "warning").catch(swal.noop); return
          }
          $scope.hojaIndicadores.listadoObjetivos = data;
          setTimeout(() => { $scope.$apply(); }, 500);
        })
      }

      $scope.hojaIndicadoresObtenerDependencias = function () {
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_listar_cargo_dependencias",
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br') {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          data.forEach(e => {
            $scope.hojaIndicadores.listadoDependencias.push(
              { codigo: e.Codigo, nombre: e.Nombre }
            )
          })
          // $scope.hojaIndicadores.listadoDependencias = data;
          setTimeout(() => { $scope.$apply(); }, 500);
        })
      }

      $scope.hojaIndicadoresBuscarResponsables = function (responsable, listado) {
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_lista_funcionario",
            funcionario: $scope.hojaIndicadores.formulario[responsable],
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br') {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data == 0) {
            swal("Error", 'No se encontraron funcionarios', "warning").catch(swal.noop); return
          }
          if (data.length == 1) {
            $scope.hojaIndicadores.formulario[responsable] = `${data[0].DOCUMENTO} - ${data[0].NOMBRE_FUNCIONARIO}`;
            return
          }
          data.forEach(e => {
            $scope.hojaIndicadores.formulario[listado].push({
              codigo: e.DOCUMENTO,
              nombre: e.NOMBRE_FUNCIONARIO
            })
          })
          setTimeout(() => { $scope.$apply(); }, 500);
        })
      }
      $scope.hojaIndicadoresBuscarActores = function (actor) {
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "p_obtener_tercero",
            funcionario: actor,

          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br') {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data == 0) {
            swal("Error", 'No se encontraron funcionarios', "warning").catch(swal.noop); return
          }
          data.forEach(e => {
            $scope.hojaIndicadores.formulario.listadoActores.push({
              codigo: e.DOCUMENTO,
              nombre: e.NOMBRE.toString().toUpperCase()
            })
          })
          setTimeout(() => { $scope.$apply(); }, 500);
        })
      }

      $scope.hojaIndicadoresAgregarActores = function () {
        if (!$scope.hojaIndicadores.formulario.actores || !$scope.hojaIndicadores.formulario.listadoActores.length) { return }
        if ($scope.hojaIndicadores.formulario.actores.toString().indexOf('-') == -1) { return }
        const dato = $scope.hojaIndicadores.formulario.listadoActores.find(e => e.codigo == $scope.hojaIndicadores.formulario.actores.split('-')[0].trim());

        if ($scope.hojaIndicadores.formulario.listadoActoresTabla.findIndex(e => e.codigo == dato.codigo) != -1) {
          $scope.hojaIndicadores.formulario.actores = '';
          swal("Error", 'Actor duplicado', "warning").catch(swal.noop); return
        }

        $scope.hojaIndicadores.formulario.listadoActoresTabla.push(dato);
        $scope.hojaIndicadores.formulario.actores = '';
        setTimeout(() => { $scope.$apply(); }, 500);
      }
      $scope.quitarActores = function (index) {
        $scope.hojaIndicadores.formulario.listadoActoresTabla.splice(index, 1);
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      // GRAFICOS
      $scope.calcularGraficoSemaforizacion = function () {
        if ($scope.graficoSemaforizacion) {
          $scope.graficoSemaforizacion.destroy()
          $scope.graficoSemaforizacion = null;
        }
        var data = [];
        if ($scope.hojaIndicadores.formulario.semaforizacionSentido == '') {
          swal("Error", 'Debe escoger el Tipo de Orden', "warning").catch(swal.noop); return
        }
        if ($scope.hojaIndicadores.formulario.semaforizacionValor1 == '' ||
          $scope.hojaIndicadores.formulario.semaforizacionValor2 == '' ||
          $scope.hojaIndicadores.formulario.semaforizacionValor3 == '') {
          return false
        }

        if ((parseFloat($scope.hojaIndicadores.formulario.semaforizacionValor1) +
          parseFloat($scope.hojaIndicadores.formulario.semaforizacionValor2) +
          parseFloat($scope.hojaIndicadores.formulario.semaforizacionValor3)) != 100) {
          swal("Error", 'La suma de los valores debe dar el 100%', "warning").catch(swal.noop); return
        }

        if ($scope.hojaIndicadores.formulario.semaforizacionSentido == 'A') {
          data = [
            {
              name: 'Baja', y: parseFloat($scope.hojaIndicadores.formulario.semaforizacionValor1), color: "#FA0501",
              datoAnterior: 0, datoSiguiente: $scope.hojaIndicadores.formulario.semaforizacionValor1
            },
            {
              name: 'Media', y: parseFloat($scope.hojaIndicadores.formulario.semaforizacionValor2), color: "#FADE09",
              datoAnterior: $scope.hojaIndicadores.formulario.semaforizacionValor1, datoSiguiente: parseFloat($scope.hojaIndicadores.formulario.semaforizacionValor1) + parseFloat($scope.hojaIndicadores.formulario.semaforizacionValor2)
            },
            {
              name: 'Alta', y: parseFloat($scope.hojaIndicadores.formulario.semaforizacionValor3), color: "#06FA12",
              datoAnterior: parseFloat($scope.hojaIndicadores.formulario.semaforizacionValor1) + parseFloat($scope.hojaIndicadores.formulario.semaforizacionValor2),
              datoSiguiente: 100
            }]
        } else {
          var dato3_Min = 100 - parseFloat($scope.hojaIndicadores.formulario.semaforizacionValor1);
          var dato2_Max = dato3_Min
          var dato2_Min = dato2_Max - parseFloat($scope.hojaIndicadores.formulario.semaforizacionValor2);
          var dato1_Max = dato2_Min;


          data = [
            {
              name: 'Alta', y: parseFloat($scope.hojaIndicadores.formulario.semaforizacionValor1), color: "#FA0501",
              datoAnterior: 100, datoSiguiente: dato3_Min
            },
            {
              name: 'Media', y: parseFloat($scope.hojaIndicadores.formulario.semaforizacionValor2), color: "#FADE09",
              datoAnterior: dato2_Max, datoSiguiente: dato2_Min
            },
            {
              name: 'Baja', y: parseFloat($scope.hojaIndicadores.formulario.semaforizacionValor3), color: "#06FA12",
              datoAnterior: dato1_Max, datoSiguiente: 0
            }
          ];


          // data = [
          //   {
          //     name: 'Alta', y: parseInt($scope.hojaIndicadores.formulario.semaforizacionValor3), color: "#FA0501",
          //     datoAnterior: 100, datoSiguiente: 100 - parseInt($scope.hojaIndicadores.formulario.semaforizacionValor1)
          //   },
          //   {
          //     name: 'Media', y: parseInt($scope.hojaIndicadores.formulario.semaforizacionValor2), color: "#FADE09",
          //     datoAnterior: 100 - parseInt($scope.hojaIndicadores.formulario.semaforizacionValor1), datoSiguiente: 100 - parseInt($scope.hojaIndicadores.formulario.semaforizacionValor1) - parseInt($scope.hojaIndicadores.formulario.semaforizacionValor2)
          //   },
          //   {
          //     name: 'Baja', y: parseInt($scope.hojaIndicadores.formulario.semaforizacionValor1), color: "#06FA12",
          //     datoAnterior: 100 - parseInt($scope.hojaIndicadores.formulario.semaforizacionValor1) - parseInt($scope.hojaIndicadores.formulario.semaforizacionValor2),
          //     datoSiguiente: 0
          //   }
          // ];
        }

        $scope.graficoSemaforizacion = Highcharts.chart('graficoSemaforizacion', {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            width: 400,
            height: 400
          },
          title: {
            text: 'Semaforización',
            align: 'center',
            verticalAlign: 'middle',
            y: 60,
            style: {
              fontWeight: 'bold'
            }
          },
          tooltip: {
            pointFormat: '{point.datoAnterior} - <b>{point.datoSiguiente}</b>'
          },
          accessibility: {
            point: {
              valueSuffix: '%'
            }
          },
          plotOptions: {
            pie: {
              dataLabels: {
                enabled: true,
                distance: -50,
                style: {
                  fontWeight: 'bold',
                  color: 'white'
                }
              },
              startAngle: -90,
              endAngle: 90,
              center: ['50%', '75%'],
              size: '110%'
            }
          },
          series: [{
            type: 'pie',
            name: 'Rango',
            innerSize: '50%',
            data

          }],
          exporting: { enabled: false },
          credits: { enabled: false },
        });
      }


      $scope.modalCrearIndicadores = function () {
        $scope.hojaIndicadoresCrearNuevo()
        $scope.openModal('modalCrearIndicadores');
        document.getElementById('modalCrearIndicadores_Scroll').scrollIntoView({ block: 'start', behavior: 'smooth' });
      }

      $scope.validarFormIndicadores = function () {
        return new Promise((resolve) => {

          if (!$scope.hojaIndicadores.formulario.nombre) resolve(false);
          if (!$scope.hojaIndicadores.formulario.proceso) resolve(false);
          if (!$scope.hojaIndicadores.formulario.tipoProceso) resolve(false);
          if (!$scope.hojaIndicadores.formulario.tipoProcesoCod) resolve(false);
          if (!$scope.hojaIndicadores.formulario.objetivoEstrategicoTactico) resolve(false);
          if (!$scope.hojaIndicadores.formulario.nivel) resolve(false);
          if (!$scope.hojaIndicadores.formulario.dependencia) resolve(false);
          if (!$scope.hojaIndicadores.formulario.definicion) resolve(false);
          if (!$scope.hojaIndicadores.formulario.acumulativo) resolve(false);
          if (!$scope.hojaIndicadores.formulario.periodicidadAnalisis) resolve(false);
          if (!$scope.hojaIndicadores.formulario.meta) resolve(false);
          if (!$scope.hojaIndicadores.formulario.metaVigencia) resolve(false);
          if (!$scope.hojaIndicadores.formulario.unidadMedida) resolve(false);
          if (!$scope.hojaIndicadores.formulario.lineaBase) resolve(false);
          if (!$scope.hojaIndicadores.formulario.fuenteNumerador) resolve(false);
          if (!$scope.hojaIndicadores.formulario.fuenteDenominador) resolve(false);

          if (!$scope.hojaIndicadores.formulario.vigencia) resolve(false);
          if (!$scope.hojaIndicadores.formulario.clasificacionIndicador) resolve(false);
          if (!$scope.hojaIndicadores.formulario.prioridad) resolve(false);
          // if (!$scope.hojaIndicadores.formulario.tipoNorma) resolve(false);
          // if (!$scope.hojaIndicadores.formulario.norma) resolve(false);
          if (!$scope.hojaIndicadores.formulario.frecuencia) resolve(false);
          if (!$scope.hojaIndicadores.formulario.periodicidadReporte) resolve(false);
          if (!$scope.hojaIndicadores.formulario.responsableReporte) resolve(false);
          if (!$scope.hojaIndicadores.formulario.responsableAnalisis) resolve(false);
          if ($scope.hojaIndicadores.formulario.listadoActoresTabla.length == 0) resolve(false);

          if (!$scope.hojaIndicadores.formulario.tipoCalculo) resolve(false);
          if ($scope.hojaIndicadores.formulario.semaforizacionEstado == 'S' && ($scope.hojaIndicadores.formulario.semaforizacionValor1 == '' ||
            $scope.hojaIndicadores.formulario.semaforizacionValor2 == '' ||
            $scope.hojaIndicadores.formulario.semaforizacionValor3 == '')) {
            resolve(false);
          }
          if ($scope.hojaIndicadores.formulario.semaforizacionEstado == 'S' && $scope.hojaIndicadores.formulario.semaforizacionSentido == '') {
            resolve(false);
          }
          if ($scope.hojaIndicadores.formulario.semaforizacionEstado == 'S' &&
            ((parseFloat($scope.hojaIndicadores.formulario.semaforizacionValor1) +
              parseFloat($scope.hojaIndicadores.formulario.semaforizacionValor2) +
              parseFloat($scope.hojaIndicadores.formulario.semaforizacionValor3)) != 100)) {
            resolve(false);
          }

          resolve(true)
        });
      }

      $scope.guardarFormIndicadores = function () {
        $scope.validarFormIndicadores().then(res => {
          if (!res) { swal("¡Importante!", "Diligencia los campos requeridos (*)", "warning").catch(swal.noop); return }
          //
          const dato = [{
            pregn_proceso: $scope.hojaIndicadores.formulario.proceso,
            pcod_estr: $scope.hojaIndicadores.formulario.objetivoEstrategicoTactico.split('_')[0],
            pcod_tact: $scope.hojaIndicadores.formulario.objetivoEstrategicoTactico.split('_')[1],
            pcod_indicador: $scope.hojaIndicadores.formulario.idIndicadorSeleccionado,
            pnombre: $scope.hojaIndicadores.formulario.nombre,
            pnivel: $scope.hojaIndicadores.formulario.nivel,
            pestado: $scope.hojaIndicadores.formulario.estado,
            pdependencia: $scope.hojaIndicadores.formulario.dependencia,
            pobjetivo_indicador: $scope.hojaIndicadores.formulario.definicion,
            plinea_base: $scope.hojaIndicadores.formulario.lineaBase.replace(',', '.'),
            pmeta: $scope.hojaIndicadores.formulario.meta.replace(',', '.'),
            pmeta_vigencia: $scope.hojaIndicadores.formulario.metaVigencia.replace(',', '.'),
            punidad_medida: $scope.hojaIndicadores.formulario.unidadMedida,
            pfrecuencia: $scope.hojaIndicadores.formulario.frecuencia,
            pacumulativo: $scope.hojaIndicadores.formulario.acumulativo,
            pfuente_numerador: $scope.hojaIndicadores.formulario.fuenteNumerador,
            pfuente_denominador: $scope.hojaIndicadores.formulario.fuenteDenominador,
            pvigencia: $scope.hojaIndicadores.formulario.vigencia,
            pclasificacion: $scope.hojaIndicadores.formulario.clasificacionIndicador,
            pprioridad: $scope.hojaIndicadores.formulario.prioridad,
            ptipo_norma: $scope.hojaIndicadores.formulario.tipoNorma,
            pnorma: $scope.hojaIndicadores.formulario.norma,
            pperiodicidad_reporte: $scope.hojaIndicadores.formulario.periodicidadReporte,
            pperiodicidad_analisis: $scope.hojaIndicadores.formulario.periodicidadAnalisis,
            presponsable_reporte: $scope.hojaIndicadores.formulario.responsableReporte.split('-')[0].trim(),
            presponsable_analisis: $scope.hojaIndicadores.formulario.responsableAnalisis.split('-')[0].trim(),

            psemaforizacion: $scope.hojaIndicadores.formulario.semaforizacionEstado,
            ptipo_calculo: $scope.hojaIndicadores.formulario.tipoCalculo,
            ptipo: $scope.hojaIndicadores.formulario.semaforizacionSentido,
            pdato1: $scope.hojaIndicadores.formulario.semaforizacionValor1.replace(',', '.'),
            pdato2: $scope.hojaIndicadores.formulario.semaforizacionValor2.replace(',', '.'),
            pdato3: $scope.hojaIndicadores.formulario.semaforizacionValor3.replace(',', '.'),

            presponsable: $scope.Rol_Cedula,

          }];

          var actores = [];
          $scope.hojaIndicadores.formulario.listadoActoresTabla.forEach(e => {
            actores.push({
              doc_responsable: e.codigo.toString(),
              nom_responsable: e.nombre
            })
          })

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
                url: "php/planeacion/procesospoa.php",
                data: {
                  function: "p_ui_indicador",
                  datosJson: JSON.stringify(dato),
                  cantidadJson: 1,
                  listadoActoresTabla: JSON.stringify(actores),
                  cantidadActores: $scope.hojaIndicadores.formulario.listadoActoresTabla.length,
                  accion: $scope.hojaIndicadores.formulario.idIndicadorSeleccionado == '' ? 'I' : 'U',
                }
              }).then(function ({ data }) {
                if (data.toString().substr(0, 3) == '<br' || data == 0) {
                  swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                }
                if (data.Codigo == 0) {
                  swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                  $scope.hojaIndicadoresListar(1);
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
          url: "php/planeacion/procesospoa.php",
          data: {
            function: 'descargaFile',
            ruta
          }
        }).then(function (response) {
          var win = window.open("temp/" + response.data, '_blank');
          win.focus();
        });
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
