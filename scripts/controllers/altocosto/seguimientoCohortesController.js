'use strict';
angular.module('GenesisApp')
  .controller('seguimientoCohortesController', ['$scope', '$filter', '$http', 'renalHttp', 'ngDialog', 'afiliacionHttp', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller', '$rootScope', '$window',
    function ($scope, $filter, $http, renalHttp, ngDialog, afiliacionHttp, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window) {
      $(document).ready(function () {
        $('.tabs').tabs();
        $scope.Tabs = 1;
        // setTimeout(() => {
        //   $scope.iniciarFormulario();
        // }, 2500);
      });

      $scope.user = sessionStorage.getItem("usuario");

      $scope.mostrarVista = function (vista) {
        $scope.vista = vista

        if ($scope.vista == 'vistaArchivosCargados') {

          $scope.periodicTimeout = setInterval($scope.P_SC_GET_ARCHIVOS_COHORTE_CARGADOS, 120000);
        }

        else {
          clearInterval($scope.periodicTimeout);
        }


      }


      $scope.mostrarVista('subirArchivo')

      $scope.P_SC_GET_ARCHIVOS_COHORTE_CARGADOS = function () {
        $http({
          method: 'POST',
          url: "php/altocosto/seguimientoCohortes.php",
          data: {
            function: 'P_SC_GET_ARCHIVOS_COHORTE_CARGADOS',
            P_V_JSON: "[]"
          }
        }).then(function (response) {
          $scope.archivosCohorteCargados = response.data;
        });
      }



      $scope.P_SC_GET_INFO_ARCHIVOS_COHORTES_CARGADOS = function (Codigo) {

        $http({
          method: 'POST',
          url: "php/altocosto/seguimientoCohortes.php",
          data: {
            function: 'P_SC_GET_INFO_ARCHIVOS_COHORTES_CARGADOS',
            P_N_PROCESO: Codigo
          }
        }).then(function (response) {
          $scope.info_de_archivo = response.data[0];

        });
      }


      $scope.Estado_Solicitud_Color = function (Estado) {
        if (Estado.toString().toUpperCase() == 'VERDE') {
          return { "background-color": "rgb(3, 197, 20) !important;" }
        }
        if (Estado.toString().toUpperCase() == 'AZUL') {
          return { "background-color": "rgb(51, 70, 255)!important" }
        }
        if (Estado.toString().toUpperCase() == 'ROJO') {
          return { "background-color": "rgb(245, 75, 75) !important;" }
        }
      }
      $scope.Estado_Solicitud_Clase = function (Estado) {
        if (Estado.toString().toUpperCase() == 'VERDE') {
          return "Con_pulse_VERDE"
        }
        if (Estado.toString().toUpperCase() == 'AZUL') {
          return "Con_pulse_AZUL"
        }
        if (Estado.toString().toUpperCase() == 'ROJO') {
          return "Con_pulse_ROJO"
        }
      }


      $scope.P_SC_GET_LISTAR_ARCHIVO_COHORTE_DETALLE_OBSERV = function (P_N_NUM_DET_CARGUE) {
        $http({
          method: 'POST',
          url: "php/altocosto/seguimientoCohortes.php",
          data: {
            function: 'P_SC_GET_LISTAR_ARCHIVO_COHORTE_DETALLE_OBSERV',
            P_N_NUM_DET_CARGUE: P_N_NUM_DET_CARGUE
          }
        }).then(function (response) {
          const cadena = response.data[0].descripcion;
          let cadenas = cadena.split(',');
          $scope.observacionData = [];
          let i = 0;
          for (const item of cadenas) {
            $scope.observacionData.push({
              columna: i,
              observacion: item
            }

            )
            i++;
          }

          $scope.observacionData.length = $scope.observacionData.length - 1
          console.log($scope.observacionData);
          $scope.mostrarVista("vistaGestionArchivosCargadosObservacion");
        });
      }


      $scope.ArchivosCargadosfiltrado = function () {

        if (!$scope.busquedas.anno || !$scope.busquedas.mes) {

          swal({
            title: 'Error',
            text: 'Por favor, completa tanto el año como el mes.',
            type: 'warning'
          });
          return;
        }
        swal({
          title: 'Cargando',
          html: '<div style="text-align: center;"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><br><br><span style="font-size: 1.2em;"></span></div>',
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          background: '#fff',
          showCloseButton: false,
        });



        let obj = {};

        //obj["PERIODO"] ='';
        obj["PERIODO"] = $scope.busquedas.anno + $scope.busquedas.mes.padStart(2, '0');





        let data = Object.entries(obj).map(([TIPO, VALOR]) => ({ TIPO, VALOR }));

        $http({
          method: 'POST',
          url: "php/altocosto/seguimientoCohortes.php",
          data: {
            function: 'P_SC_GET_ARCHIVOS_COHORTE_CARGADOS',
            P_V_JSON: JSON.stringify(data)
          }
        }).then(function (response) {
          $scope.archivosCohorteCargados = response.data;
          swal.close();
        });
      };


      $scope.listarCohortes = function () {
        $http({
          method: 'POST',
          url: "php/altocosto/seguimientoCohortes.php",
          data: {
            function: 'ListarCohortes',
          }
        }).then(function (response) {
          $scope.listCohorte = response.data;
        });
      }

      $scope.validarCohortes = function () {
        $http({
          method: 'POST',
          url: "php/altocosto/seguimientoCohortes.php",
          data: {
            function: 'P_SC_GET_VALIDA_COHORTE',
            P_V_USER: sessionStorage.getItem("usuario").toUpperCase()
          }
        }).then(function (response) {
          if (response.data.length === 0) {
            $scope.listarCohortes();
          }
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


      $scope.Obtener_seccional = function () {
        $http({
          method: 'POST',
          url: "php/altocosto/seguimientoCohortes.php",
          data: {
            function: 'obtenerSeccionales',

          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.seccionales = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }


      $scope.Obtener_seccional();


      $scope.Obtener_Tipos_Documentos();


      // LOGICA DE MESES
      var fechaActual = new Date();
      var mesActual = fechaActual.getMonth() + 1;
      $scope.filteredMonths = [];
      let añoActual = new Date().getFullYear();
      // Generar los años en un rango desde el año actual hasta 10 años atrás
      $scope.years = [];
      for (var i = añoActual; i >= añoActual - 10; i--) {
        $scope.years.push(i);
      }



      $scope.updateMonths = function () {

        $scope.selectedMonth = "";
        if ($scope.anno == añoActual) {
          $scope.filteredMonths = [];
          for (var i = 1; i <= mesActual; i++) {
            $scope.filteredMonths.push({
              value: i,
              label: obtenerNombreMes(i)
            });
          }
        } else {
          $scope.filteredMonths = $scope.months;
        }
      };



      $scope.updateMonthsBusqueda = function () {
        $scope.selectedMonth = "";
        if ($scope.busqueda.anno == añoActual) {
          $scope.filteredMonthsBusqueda = [];
          for (var i = 1; i <= mesActual; i++) {
            $scope.filteredMonthsBusqueda.push({
              value: i,
              label: obtenerNombreMes(i)
            });
          }
        } else {
          $scope.filteredMonthsBusqueda = $scope.months;

        }
      }



      $scope.updateMonthsBusqueda2 = function () {
        $scope.selectedMonth = "";
        if ($scope.busquedas.anno == añoActual) {
          $scope.filteredMonthsBusqueda2 = [];
          for (var i = 1; i <= mesActual; i++) {
            $scope.filteredMonthsBusqueda2.push({
              value: i,
              label: obtenerNombreMes(i)
            });
          }
        } else {
          $scope.filteredMonthsBusqueda2 = $scope.months2;

        }
      }
      $scope.months = [
        { value: 1, label: 'Enero' },
        { value: 2, label: 'Febrero' },
        { value: 3, label: 'Marzo' },
        { value: 4, label: 'Abril' },
        { value: 5, label: 'Mayo' },
        { value: 6, label: 'Junio' },
        { value: 7, label: 'Julio' },
        { value: 8, label: 'Agosto' },
        { value: 9, label: 'Septiembre' },
        { value: 10, label: 'Octubre' },
        { value: 11, label: 'Noviembre' },
        { value: 12, label: 'Diciembre' }
      ];

      $scope.months2 = [
        { value: 1, label: 'Enero' },
        { value: 2, label: 'Febrero' },
        { value: 3, label: 'Marzo' },
        { value: 4, label: 'Abril' },
        { value: 5, label: 'Mayo' },
        { value: 6, label: 'Junio' },
        { value: 7, label: 'Julio' },
        { value: 8, label: 'Agosto' },
        { value: 9, label: 'Septiembre' },
        { value: 10, label: 'Octubre' },
        { value: 11, label: 'Noviembre' },
        { value: 12, label: 'Diciembre' }
      ];


      function obtenerNombreMes(mes) {
        var nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return nombresMeses[mes - 1];
      }


      $scope.obtenerVariablePorCodigo = function () {
        if ($scope.selectedCohorte) {
          let productoEncontrado = $scope.listCohorte.find(function (producto) {
            return producto.Codigo === Number($scope.selectedCohorte);
          });
          $scope.cohorteSeleccionada = productoEncontrado;
        } else {
          $scope.cohorteSeleccionada = undefined;
        }

      }
      $scope.cohorteSeleccionada = undefined;

      $scope.mostrar_guardar = false;
      $("form").on("change", ".file-upload-field", function () {


        var archivo = $(this).val().replace(/.*(\/|\\)/, '');
        var extensionesPermitidas = ['txt'];
        let tamano = $scope.cohorteSeleccionada.Variables;
        if ($(this)[0].files.length > 0) { // Se valida que exista el archivo
          var nombre = archivo.substring(0, archivo.lastIndexOf('.'));
          var ext = archivo.substring(archivo.lastIndexOf('.') + 1);
          var extMinuscula = ext.toLowerCase();
          var file = $(this)[0].files[0];
          if (file.size <= 3000000) { // Se valida el tamaño del archivo
            if (extensionesPermitidas.includes(extMinuscula)) { // Se valida el tipo del archivo
              $scope.validarEstructura(file, tamano, $(this), nombre);
            } else {
              swal('Tipo de archivo incorrecto', 'La extensión del archivo debe ser .txt', 'warning');
              $(this).val("");
              $(this).parent(".file-upload-wrapper").attr("data-text", 'Subir Archivo');
              if ($(this)[0].id == 'CT') {
                $scope.switcharchivos = true;
                $scope.ctlleno = false;
              }
            }
          } else {
            swal('TAMAÑO EXCEDIDO', 'El archivo no debe superar los 3 megabytes', 'error');
            $(this).val("");
            if ($(this)[0].id == 'CT') {
              $scope.switcharchivos = true;
              $scope.ctlleno = false;
            }
          }
        } else {
          $(this).val("");
          $(this).parent(".file-upload-wrapper").attr("data-text", 'Subir Archivo');
          if ($(this)[0].id == 'CT') {
            $scope.switcharchivos = true;
            $scope.ctlleno = false;
          }
        }
        $scope.$apply();
      });

      $scope.validarEstructura = function (progressEvent, tamaño, thisfile, nombre) {
        $scope.thisfile = thisfile;
        var file = progressEvent;
        var reader = new FileReader();
        reader.onload = function (progressEvent) {
          $scope.estado = false;
          var lines = this.result.split('\n');
          var array = [];
          var sigla;
          var datos;
          for (var line = 0; line < lines.length; line++) {
            datos = lines[line].split('|');
            if (datos != '' && datos != undefined && datos != null) {
              if (datos.length == tamaño) {
                $scope.estado = true;
              } else {
                $scope.estado = false;
                break;
              }
            }
          }
          if ($scope.estado == true) {
            thisfile.parent(".file-upload-wrapper").attr("data-text", nombre + '.txt');
            $scope.fileToBase64(thisfile["0"].files, nombre);
          } else {
            swal('IMPORTANTE', 'el archivo ' + nombre + ' presenta error de estructura tiene diferente columnas de las ' + tamaño + ' esperadas.', 'info')
            thisfile.val("");
            thisfile.parent(".file-upload-wrapper").attr("data-text", 'Subir Archivo');
          }
        };
        reader.readAsText(file);
      }


      $scope.numSiniestrosSeleccionados = "";

      // Función que se activa al hacer clic en un checkbox
      $scope.seleccionarRegistro = function (numeroSiniestro) {


        // Check if the numeroSiniestro is already present in the selected list
        var index = $scope.numSiniestrosSeleccionados.indexOf(numeroSiniestro);

        if (index === -1) {
          // Not present, so add it to the list
          $scope.numSiniestrosSeleccionados += numeroSiniestro + ",";
        } else {
          // Already present, remove it from the list
          $scope.numSiniestrosSeleccionados = $scope.numSiniestrosSeleccionados.replace(numeroSiniestro + ",", "");
        }

        // Eliminar espacios en blanco al principio y al final de la cadena
        $scope.numSiniestrosSeleccionados = $scope.numSiniestrosSeleccionados.trim();
      }

      $scope.fileToBase64 = function (filesSelected, name) {
        $scope.mostrar_guardar = true;
        if (filesSelected.length > 0) {
          var fileToLoad = filesSelected[0];
          var fileReader = new FileReader();
          fileReader.onload = function (fileLoadedEvent) {
            $scope.archivo = fileLoadedEvent.target.result
          };
          fileReader.readAsDataURL(fileToLoad);

        }
        $scope.$apply();
      }


      $scope.guardar = function () {
        if (!$scope.anno || !$scope.selectedMonth || !$scope.selectedCohorte || !$scope.archivo || !$scope.user) {
          swal('Información', 'Por favor, complete todos los campos.', 'info');
          return;
        }

        swal({
          title: "Confirmar",
          text: "¿Desea agregar este archivo?",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {

          swal({
            title: 'Cargando',
            html: '<div style="text-align: center;"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><br><br><span style="font-size: 1.2em;"></span></div>',
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            background: '#fff',
            showCloseButton: false,
          });
          $http({
            method: 'POST',
            url: 'php/altocosto/seguimientoCohortes.php',
            data: {
              function: 'P_SC_GET_NAME_ARCHIVO_COHORTE',
              P_V_PERIODO: $scope.anno + ($scope.selectedMonth <= 9 ? '0' + $scope.selectedMonth : $scope.selectedMonth),
              P_N_TIPO_CARGUE: $scope.selectedCohorte,
              P_V_USER: $scope.user,
            },
          }).then(function (response) {
            if (response.data && response.data.toString().substr(0, 3) !== '<br') {

              if (response.data.codigo == 1) {
                swal('Información', response.data.mensaje, 'info');
              } else if (response.data.nombreFile) {
                $http({
                  method: 'POST',
                  url: 'php/altocosto/seguimientoCohortes.php',
                  data: {
                    function: 'P_SC_POST_GUARDAR_ARCHIVO_COHORTE',
                    P_V_PERIODO: $scope.anno + ($scope.selectedMonth <= 9 ? '0' + $scope.selectedMonth : $scope.selectedMonth),
                    P_N_TIPO_CARGE: $scope.selectedCohorte,
                    nombreArchivo: response.data.nombreFile,
                    P_N_PROCESO: response.data.idCargue,
                    archivo: $scope.archivo,
                    P_V_USER: $scope.user,
                  },
                }).then(function (response) {
                  if (response.data && response.data.toString().substr(0, 3) !== '<br') {
                    swal.close();
                    if (response.data.Codigo == 0) {
                      $scope.selectedCohorte = null;
                      $scope.anno = null;
                      $scope.selectedMonth = null;
                      $scope.mostrar_guardar = false;
                      swal({
                        title: "Archivo cargado con Éxito",
                        text: "Recuerde que el archivo se encuentra en cola de procesamiento que puede tardar 5 minutos o más en procesarse",
                        type: "success"
                      })
                        .then(function () {
                          $scope.thisfile.val('');
                          $scope.thisfile.parent('.file-upload-wrapper').attr('data-text', 'Subir Archivo');
                          $scope.selectedCohorte = null;
                          $scope.anno = null;
                          $scope.selectedMonth = null;
                        });
                    } else {
                      swal('Información', response.data.Nombre, 'info');
                    }
                  } else {
                    var mensaje = 'No se guardó el archivo. Por favor, inténtelo nuevamente.';
                    swal('Información', mensaje, 'info');
                  }
                });
              } else {
                swal('Información', "Hubo un error al momento de buscar el nombre del archivo", 'info');
              }

            }
          });



        }, function (dismiss) {
          if (dismiss == "cancel") {

          }
        })

      }


      // Llamar a la función para filtrar los datos inicialmente



      //seguimiento
      $scope.siniestros = [];
      $scope.filtrado = function () {
        if (!$scope.busqueda.anno || !$scope.busqueda.mes || !$scope.busqueda.cohorte) {
          swal({
            title: "Campos vacíos",
            text: "Por favor, complete todos los campos requeridos.",
            type: "warning"
          });
          return;
        }



        $scope.registrosSeleccionados = [];

        swal({
          title: 'Cargando',
          html: '<div style="text-align: center;"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><br><br><span style="font-size: 1.2em;"></span></div>',
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          background: '#fff',
          showCloseButton: false,
        });

        let enviado = [];



        enviado.push(
          {
            TIPO: "PERIODO",
            VALOR: $scope.busqueda.anno + ($scope.busqueda.mes <= 9 ? '0' + $scope.busqueda.mes : $scope.busqueda.mes),
          },

          {
            TIPO: "COHORTE",
            VALOR: $scope.busqueda.cohorte,
          },
        )



        //cosnumo el sp
        $http({
          method: 'POST',
          url: "php/altocosto/seguimientoCohortes.php",
          data: {
            function: 'P_SC_GET_SEGUIMIENTO_USUARIOS_FILTROS',
            P_V_JSON: JSON.stringify(enviado)
          }
        }).then(function (response) {


          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            swal.close();
            $scope.siniestros = response.data;
            $scope.initPaginacion($scope.siniestros);
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        }); { }
      }

      $scope.excel = function () {
        let vString = $scope.numSiniestrosSeleccionados;
        vString = vString.trim();

        if (vString.endsWith(',')) {
          vString = vString.slice(0, -1);
        }

        swal({
          title: 'Cargando',
          html: '<div style="text-align: center;"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><br><br><span style="font-size: 1.2em;"></span></div>',
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          background: '#fff',
          showCloseButton: false,
        });

        $http({
          method: 'POST',
          url: "php/altocosto/seguimientoCohortes.php",
          data: {
            function: 'generateExcelFile',
            P_V_NUMERO_SINIESTRO: vString
          },
          responseType: 'arraybuffer'
        }).then(function (response) {
          // Check if the response data is not empty
          if (response.status === 200) {
            var link = document.createElement('a');
            var blob = new Blob([response.data], { 'type': 'application/octet-stream' });
            link.href = URL.createObjectURL(blob);
            link.download = 'gestion.xlsx';
            swal.close();

            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            swal('Excel generado', 'El archivo se ha generado y descargado correctamente.', 'success');
          } else {
            swal('Advertencia', 'Aún no ha completado el formulario. Para descargar el archivo Excel, es obligatorio responder todas las preguntas.', 'warning');

          }
        }).catch(function (error) {
          swal('Advertencia', 'Aún no ha completado el formulario. Para descargar el archivo Excel, es obligatorio responder todas las preguntas.', 'warning');
        });
      }

      $scope.exceldinamico = function () {

        swal({
          title: 'Cargando',
          html: '<div style="text-align: center;"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><br><br><span style="font-size: 1.2em;"></span></div>',
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          background: '#fff',
          showCloseButton: false,
        });

        $http({
          method: 'POST',
          url: "php/altocosto/seguimientoCohortes.php",
          data: {
            function: 'P_SC_GET_LISTAR_ARCHIVO_COHORTE_DETALLE_EXCEL',
            P_N_NUM_CARGUE: $scope.numerocargue,
            P_N_TIPO_CARGUE: $scope.tipocargue

          },

          responseType: 'arraybuffer'
        }).then(function (response) {
          // Check if the response data is not empty
          if (response.status === 200) {
            var link = document.createElement('a');
            var blob = new Blob([response.data], { 'type': 'application/octet-stream' });
            link.href = URL.createObjectURL(blob);
            link.download = 'gestion.xlsx';
            swal.close();
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            swal('Excel generado', 'El archivo se ha generado y descargado correctamente.', 'success');
          } else {
            swal('Advertencia', 'Error en la descarga,', 'warning');

          }
        }).catch(function (error) {
          swal('Advertencia', 'Error en la descarga.', 'warning');
        });
      }



      $scope.siniestro = {
        Semaforizacion: 'N' // Cambia a 'S' para probar la otra opción
      };

      $scope.initPaginacion = function (info) {
        $scope.siniestros = info;
        $scope.currentPage = 0;
        $scope.pageSize = 15;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.configPages();
      }

      $scope.filter_tableseg = function (val) {
        $scope.siniestros = $filter('filter')($scope.siniestros, val);
        if ($scope.siniestros > 0) {
          $scope.setPage(1);
        }
        $scope.configPages();
      }



      $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (Math.ceil($scope.siniestros.length / $scope.pageSize) > $scope.valmaxpag)
            fin = 10;
          else
            fin = Math.ceil($scope.siniestros.length / $scope.pageSize);
        } else {
          if (ini >= Math.ceil($scope.siniestros.length / $scope.pageSize) - $scope.valmaxpag) {
            ini = Math.ceil($scope.siniestros.length / $scope.pageSize) - $scope.valmaxpag;
            fin = Math.ceil($scope.siniestros.length / $scope.pageSize);
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
      }



      $scope.setPage = function (index) {
        $scope.currentPage = index - 1;
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
          if ($scope.siniestros.length % $scope.pageSize == 0) {
            var tamanomax = parseInt($scope.siniestros.length / $scope.pageSize);
          } else {
            var tamanomax = parseInt($scope.siniestros.length / $scope.pageSize) + 1;
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


      //seguimiento
      $scope.iniciarFormulario = function () {
        $scope.busqueda = {
          anoo: "",
          mes: "",
          cohorte: ""
        }
        // $scope.busqueda = {
        //   anoo: 2023,
        //   mes: "",
        //   cohorte: "HF"
        // }

      }





      //PREGUNTAS
      $scope.gestion = function (item) {
        $scope.vista = 'preguntas';
        const Cohorte = $scope.listCohorte.find(item => item.Cohorte == $scope.busqueda.cohorte);

        $scope.obtener_preguntas(0, Cohorte.Codigo);
        setTimeout(() => {
          $scope.obtener_respuesta(item.TipoDocumento, item.NumDocumento, $scope.busqueda.cohorte)
          // $scope.obtener_respuesta(item.TipoDocumento, item.NumDocumento, Cohorte.Codigo)
        }, 1000);
        $scope.busquedaFunc(item.Cohorte);
        $scope.IdSeguimiento = item.IdSeguimiento
        $scope.Siniestro = item.NumeroSiniestro
        $scope.ClaseRequerido = 'requerido'
      }




      $scope.obtener_preguntas = function (numero, cohorte) {
        swal({
          title: 'Cargando',
          html: '<div style="text-align: center;"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><br><br><span style="font-size: 1.2em;"></span></div>',
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          background: '#fff',
          showCloseButton: false,
        });
        $http({
          method: 'POST',
          url: "php/altocosto/seguimientoCohortes.php",
          data: {
            function: 'P_SC_GET_CONFIG_PREGUNTAS_TIPOS',
            P_NU_NUMERO: Number(numero),
            P_NU_TIPO: cohorte
          }
        }).then(function (response) {

          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            console.log('response', response.data);
            // debugger
            // $scope.preguntas = response.data[0].preguntas;
            $scope.secciones = response.data[0].seccion;
            $scope.dataPregunta = response.data[0];
            $scope.selectedTab = 0;

            swal.close();
            // $scope.obtener_respuesta()
            // $scope.mostrarVista('preguntas')

          } else {
            swal({
              title: "¡Ocurrió un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }

      $scope.obtener_respuesta = function (P_V_TDOCUMENTO, P_V_DOCUMENTO, COHORTE) {
        $http({
          method: 'POST',
          url: "php/altocosto/seguimientoCohortes.php",
          data: {
            function: 'P_SC_GET_DETALLE_CAC_SEGUIMIENTO',
            P_V_COHORTE: COHORTE,
            P_V_TDOCUMENTO: P_V_TDOCUMENTO,
            P_V_DOCUMENTO: P_V_DOCUMENTO,

          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            console.log('response', response.data);
            $scope.respuesta = [];
            if (response.data) {
              const datos = { ...response.data.json1[0], ...response.data.json2[0] }
              // $scope.respuesta = response.data.json1[0]
              $scope.respuesta = datos;
              $scope.unionPreguntasRespuestas();
            }



          } else {
            swal({
              title: "¡Ocurrió un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }

      $scope.unionPreguntasRespuestas = function () {
        $scope.dataPregunta;
        for (let i = 0; i < $scope.dataPregunta.secciones.length; i++) {
          for (let j = 0; j < $scope.dataPregunta.secciones[i].preguntas.length; j++) {
            let typeInput = $scope.dataPregunta.secciones[i].preguntas[j].input.typeInput;
            let nombredb = $scope.dataPregunta.secciones[i].preguntas[j].nombredb;
            let valor = $scope.respuesta[nombredb];


            if (
              (valor == "") || (valor == undefined)
            ) {
              if (i == 1) {
                $scope.dataPregunta.secciones[i].preguntas[j].desactivado = 'N'
                $scope.dataPregunta.secciones[i].preguntas[j].requerido = 'S'
              }
              $scope.dataPregunta.secciones[i].preguntas[j].respuesta = "";
            } else {
              if (typeInput == 'date') {
                valor = new Date(valor);
              }
              $scope.dataPregunta.secciones[i].preguntas[j].respuesta = valor;
              if (i == 1) {
                $scope.dataPregunta.secciones[i].preguntas[j].desactivado = 'S'
                $scope.dataPregunta.secciones[i].preguntas[j].requerido = 'N'
              }
            }




          }
        }

      }


      $scope.selectedTab = 0;

      $scope.selectTab = function (index) {
        $scope.selectedTab = index;
      }





      $scope.toRomanNumeral = function (number) {
        const romanNumerals = [
          { value: 1000, numeral: 'M' },
          { value: 900, numeral: 'CM' },
          { value: 500, numeral: 'D' },
          { value: 400, numeral: 'CD' },
          { value: 100, numeral: 'C' },
          { value: 90, numeral: 'XC' },
          { value: 50, numeral: 'L' },
          { value: 40, numeral: 'XL' },
          { value: 10, numeral: 'X' },
          { value: 9, numeral: 'IX' },
          { value: 5, numeral: 'V' },
          { value: 4, numeral: 'IV' },
          { value: 1, numeral: 'I' }
        ];

        let result = '';

        for (const pair of romanNumerals) {
          while (number >= pair.value) {
            result += pair.numeral;
            number -= pair.value;
          }
        }

        return result;
      }



      $scope.busquedaFunc = function (concepto) {
        $http({
          method: 'POST',
          url: "php/altocosto/seguimientoCAC.php",
          data: {
            function: 'P_LISTAR_IPS_ALTOCOSTO',
            V_PCONCEPTO: concepto
          }
        }).then(function (response) {
          if (response.data.length == 0) {
            $scope.ListarResultado = [];
          } else {
            $scope.ListarResultado = response.data;
          }
        });
      }



      $scope.mostrarPregunta = function (item) {
        //valida si tiene hijos
        console.log(item)
        if (item.tieneHijos == 'N') {
          return
        }

        let hijosTempo = [];
        let nietosTmp = [];
        // desaparece todos los hijos
        for (let i = 0; i < item.hijos.length; i++) {
          let tmp = JSON.parse(item.hijos[i].hijos)
          hijosTempo.push(tmp);
        }
        let TodosHijos = [].concat(...hijosTempo);


        do {
          for (const iterator of TodosHijos) {
            for (let i = 0; i < $scope.dataPregunta.secciones.length; i++) {
              for (let j = 0; j < $scope.dataPregunta.secciones[i].preguntas.length; j++) {
                let id = $scope.dataPregunta.secciones[i].preguntas[j].id
                if (id == iterator) {
                  $scope.dataPregunta.secciones[i].preguntas[j].aparecer = 'N';
                  if (i != 0) {
                    $scope.dataPregunta.secciones[i].preguntas[j].respuesta = '';
                  }
                  //busca nietos
                  for (let k = 0; k < $scope.dataPregunta.secciones[i].preguntas[j].hijos.length; j++) {
                    let tmp = JSON.parse($scope.dataPregunta.secciones[i].preguntas[j].hijos[k].hijos)
                    nietosTmp.push(tmp);
                  }
                }
              }
            }
          }
          TodosHijos = [].concat(...nietosTmp);
          nietosTmp = [];
        } while (TodosHijos.length != 0);





        //respuesta elegida
        let respuesta = item.respuesta;
        if ((respuesta != undefined) && (respuesta != "")) {

          let hijosRes = [];
          // busca todos los hijos en la respuesta
          for (let i = 0; i < item.hijos.length; i++) {
            if (item.hijos[i].codigo == respuesta) {
              hijosRes = JSON.parse(item.hijos[i].hijos)
            }
          }

          //aparece los hijo en la respuesta
          for (const iterator of hijosRes) {
            for (let i = 0; i < $scope.dataPregunta.secciones.length; i++) {
              for (let j = 0; j < $scope.dataPregunta.secciones[i].preguntas.length; j++) {
                let id = $scope.dataPregunta.secciones[i].preguntas[j].id
                if (id == iterator) {
                  $scope.dataPregunta.secciones[i].preguntas[j].aparecer = 'S';
                }
              }
            }
          }
        }
      }


      $scope.guardarPreguntas = function () {
        if ($scope.validarRequerido()) {
          swal({
            title: "¡Información!",
            html: "Los campos señalados en rojo son requeridos",
            type: "warning"
          }).catch(swal.noop);
          return;
        }
        let jsonData = [];
        let TempoJsonData;
        for (let i = 0; i < $scope.dataPregunta.secciones.length; i++) {
          for (let j = 0; j < $scope.dataPregunta.secciones[i].preguntas.length; j++) {

            TempoJsonData = {
              Siniestro: $scope.Siniestro,
              IdSeguimiento: Number($scope.IdSeguimiento),
              IdPregunta: Number($scope.dataPregunta.secciones[i].preguntas[j].id),
              IdTipoPregunta: Number($scope.dataPregunta.secciones[i].preguntas[j].idTipoPregunta),
              Respuesta: $scope.dataPregunta.secciones[i].preguntas[j].respuesta || "",
              UsuarioSesion: sessionStorage.getItem("usuario")
            }
            jsonData.push(TempoJsonData)
          }

        }
        console.log('jsonData', jsonData);

        $http({
          method: 'POST',
          url: "php/altocosto/seguimientoCohortes.php",
          data: {
            function: 'P_SC_POST_RESPUESTA_PREGUNTA',
            P_V_JSON: JSON.stringify(jsonData)
          }
        }).then((response) => {
          console.log('response', response);
          if (response.data && response.data.toString().substr(0, 3) !== '<br') {
            if (response.data.codigo != 1) {
              swal({
                title: "Éxito",
                text: "Cuestionario guardado exitoso",
                type: "success"
              }).catch(swal.noop);
              $scope.mostrarVista('tablaSeguimiento')
            } else {
              swal({
                title: "¡Ocurrió un error!",
                text: response.data.mensaje,
                type: "warning"
              }).catch(swal.noop);
              // $scope.mostrarVista('tablaSeguimiento')
            }

          } else {
            // Ocurrió un error en la solicitud
            swal({
              title: "¡Ocurrió un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        }).catch((error) => {
          // Ocurrió un error en la comunicación con el servidor
          swal({
            title: "¡Ocurrió un error!",
            text: "No se pudo realizar la solicitud al servidor",
            type: "error"
          }).catch(swal.noop);
        });
      }

      $scope.fechaActualFuncion = function () {
        let fechaActual = new Date();
        let dia = fechaActual.getDate();
        let mes = fechaActual.getMonth() + 1; // Los meses van de 0 a 11
        let anio = fechaActual.getFullYear();

        // Agregar un cero inicial si el día o el mes es menor a 10
        if (dia < 10) {
          dia = "0" + dia;
        }
        if (mes < 10) {
          mes = "0" + mes;
        }

        var fechaFormateada = anio + "-" + mes + "-" + dia;

        return fechaFormateada;
      }

      $scope.validacionDinamica = function (validation, type, input) {
        let res;
        if (input == "date") {
          if (type == "max") {
            if (validation != "fechaMaxHoy") {
              res = "2100-09-02";
            } else if (validation == "fechaMaxHoy") {
              res = $scope.fechaActualFuncion();
            }
          }
          if (type == "min") {
            if (validation != "fechaMinHoy") {
              res = "1800-01-01";
            } else if (validation == "fechaMinHoy") {
              res = $scope.fechaActualFuncion();
            }
          }
        }else if (input == "numeric") {
          res=validation;
        }

        return res
      }

      $scope.validarRequerido = function () {
        // if ($scope.preguntas) {
        //   console.log($scope.preguntas)
        // }
        let validar = false;

        for (let i = 0; i < $scope.dataPregunta.secciones.length; i++) {
          for (let j = 0; j < $scope.dataPregunta.secciones[i].preguntas.length; j++) {
            let respuesta = $scope.dataPregunta.secciones[i].preguntas[j].respuesta;
            let aparecer = $scope.dataPregunta.secciones[i].preguntas[j].aparecer;
            // let requerido = 'S'
            let requerido = $scope.dataPregunta.secciones[i].preguntas[j].requerido;


            if (aparecer == 'S') {
              if (requerido == 'S') {
                if (respuesta == '') {
                  $scope.dataPregunta.secciones[i].preguntas[j].ClaseRequerido = $scope.ClaseRequerido
                  validar = true
                }
              }
            }
          }
        }


        return validar;
      }









      $scope.Act_Zona = { Codigo: '' };
      $scope.ViaPrincipal = { Codigo: '' };
      $scope.Letra = { Codigo: '' };
      $scope.Cuadrante = { Codigo: '' };
      $scope.CuadranteVG = { Codigo: '' };
      $scope.SelectLetraVG = { Codigo: '' };
      $scope.Bis = false;




      $scope.AbrirModalDireccion = function (index) {
        $scope.dialogDiagreg = ngDialog.open({
          template: 'views/altocosto/modal2/modaDirrecion2.html',
          className: 'ngdialog-theme-plain',
          controller: 'seguimientocacpreguntasController',
          closeByDocument: false,
          closeByEscape: false,
          scope: $scope
        });
        $scope.dialogDiagreg.closePromise.then(function (data) {

          if (data.value != "$closeButton") {
            $scope.Act_Direccion2 = data.value;
            $scope.dataPregunta.secciones[0].preguntas[index].respuesta = $scope.Act_Direccion2;
            $scope.Localaidad2 = $('#barrio').val();
            $scope.Act_Barrio = $scope.Localaidad2

          } else {
            $scope.Act_Direccion;
            $scope.Act_Barrio = $scope.barrio;
          }
        });
      }

      Promise.all([
        afiliacionHttp.obtenerViaPrincipal(),
        afiliacionHttp.obtenerLetra(),
        afiliacionHttp.obtenerNumero(),
        afiliacionHttp.obtenerCuadrante(),
        afiliacionHttp.obtenerZona()
      ]).then(function (responses) {
        $scope.viaprincipal = responses[0];
        $scope.letras = responses[1];
        $scope.Numeros = responses[2];
        $scope.Cuadrantes = responses[3];
        $scope.Zonas = responses[4].Zona;
      })

      $scope.GuardarDireccion = function (ViaPrincipal, NumViaPrincipal, Letra, Numero, Bis, Cuadrante, NumeroVG, SelectLetraVG, NumeroPlaca, CuadranteVG, Complemento, Barrio) {


        $scope.closeThisDialog($('#direcciond').val());
        swal("Dirección actualizada", "", "success");
      }



      $scope.exportarErrores = function (x) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/altocosto/seguimientoCohortes.php",
          data: { function: 'P_SC_GET_LISTA_CARGUE_OBSERVACIONES', P_N_ID_CARGUE: x.Codigo }
        }).then(function ({ data }) {
          if (data.length) {
            var ws = XLSX.utils.json_to_sheet(data);
            /* add to workbook */
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
            /* write workbook and force a download */
            XLSX.writeFile(wb, "Exportado.xlsx");
            const text = `Registros encontrados ${data.length}`
            swal('¡Mensaje!', text, 'success').catch(swal.noop);
          } else {
            swal('¡Mensaje!', 'Sin datos a mostrar', 'info').catch(swal.noop);
          }
        })
      }



      $scope.cancelarFiltrado = function () {
        $scope.V.siniestro = '';
        $scope.V.Seccional = '';
        $scope.V.Tipo_Doc = '';
        $scope.V.Num_Doc = '';



        // Restablece otros campos según sea necesario
      }



      $scope.cancelarFiltrado2 = function () {
        $scope.P_SC_GET_ARCHIVOS_COHORTE_CARGADOS();
        $scope.busquedas.mes = '';
        $scope.busquedas.anno = '';



        // Restablece otros campos según sea necesario
      }




      //filstro de gestiones
      $scope.filtrarDatos = function () {



        swal({
          title: 'Cargando',
          html: '<div style="text-align: center;"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><br><br><span style="font-size: 1.2em;"></span></div>',
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          background: '#fff',
          showCloseButton: false,
        });

        let obj = {};

        if ($scope.V.siniestro) {
          obj["SINIESTRO"] = $scope.V.siniestro;
        }
        if ($scope.V.Seccional) {
          obj["SECCIONAL"] = ($scope.V.Seccional);
        }
        if ($scope.V.Tipo_Doc) {
          obj["TIPODOC"] = $scope.V.Tipo_Doc;
        }
        if ($scope.V.Num_Doc) {
          obj["AFILIADO"] = $scope.V.Num_Doc;
        }

        if ($scope.busqueda.anno && $scope.busqueda.mes) {
          obj["PERIODO"] = $scope.busqueda.anno + $scope.busqueda.mes.padStart(2, '0');
        }
        if ($scope.busqueda.cohorte) {
          obj["COHORTE"] = $scope.busqueda.cohorte;
        }

        let data = Object.entries(obj).map(([TIPO, VALOR]) => ({ TIPO, VALOR }));

        // Convertir el JSON en una cadena

        let jsonDataString = JSON.stringify(data);

        $http({
          method: 'POST',
          url: "php/altocosto/seguimientoCohortes.php",
          data: {
            function: 'P_SC_GET_SEGUIMIENTO_USUARIOS_FILTROS',
            P_V_JSON: JSON.stringify(data)
          }
        }).then(function (response) {
          swal.close();
          $scope.siniestros = response.data;
          $scope.initPaginacion($scope.siniestros);

          if ($scope.siniestros.length === 0) {
            swal("No hay registros", "", "info");
          }

        });
      }


      $scope.atras = function () {
        $scope.vista = 'vistaArchivosCargados';
      }


      $scope.gestiones = function (Codigo, Cohorte, EstadoDatoArchivo, EstadoArchivo, Fecha, NombreArchivo, Periodo, TipoCargue, NumeroCargue) {
        $scope.vista = 'vistaGestionArchivosCargados';



        $scope.codigo = Codigo;
        $scope.cohorte = Cohorte;
        $scope.estado = EstadoArchivo;
        $scope.estadod = EstadoDatoArchivo;
        $scope.fecha = Fecha;
        $scope.nombrearchivo = NombreArchivo;
        $scope.periodo = Periodo;
        $scope.numerocargue = NumeroCargue;
        $scope.tipocargue = TipoCargue;




        swal({
          title: 'Cargando',
          html: '<div style="text-align: center;"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><br><br><span style="font-size: 1.2em;"></span></div>',
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          background: '#fff',
          showCloseButton: false,
        });
        $http({
          method: 'POST',
          url: "php/altocosto/seguimientoCohortes.php",
          data: {
            function: 'P_SC_GET_LISTAR_ARCHIVO_COHORTE_DETALLE',

            P_N_NUM_CARGUE: Number(NumeroCargue),
            P_N_TIPO_CARGUE: Number(TipoCargue)

          }


        }).then(function (response) {

          if (response.data && response.data.toString().substr(0, 3) != '<br') {

            console.log('response', response.data);

            $scope.detallesarchivo = response.data;
            if (Array.isArray(response.data) && response.data.length > 0) {

              $scope.detallesarchivo = response.data[0];
              $scope.columnas = Object.keys($scope.detallesarchivo);


              $scope.columna = $scope.columnas.map((campo) => {
                return campo.replace(/([A-Z])/g, ' $1').trim(); // Separar palabras y agregar espacios
              });

            }



            $scope.dataRows = $scope.dataRows = response.data.slice().reverse();
            $scope.initPaginaciondataRows($scope.dataRows);
            $scope.procesadosNCount = $scope.dataRows.filter(row => row['Procesado'] === 'S').length;
            swal.close();




          } else {
            swal({
              title: "¡Ocurrió un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }



      $scope.initPaginaciondataRows = function (info) {
        $scope.dataRows = info;
        $scope.currentPagedataRows = 0;
        $scope.pageSizedataRows = 15;
        $scope.valmaxpagdataRows = 10;
        $scope.pagesdataRows = [];
        $scope.configPagesdataRows();
      }


      $scope.filter_cargados_detalle = function (val) {
        $scope.dataRows = $filter('filter')($scope.dataRows, val);
        if ($scope.dataRows > 0) {
          $scope.setPagedataRows(1);
        }
        $scope.configPagesdataRows();
      }

      $scope.configPagesdataRows = function () {
        $scope.pagesdataRows.length = 0;
        var inidataRows = $scope.currentPagedataRows - 4;
        var findataRows = $scope.currentPagedataRows + 5;
        if (inidataRows < 1) {
          inidataRows = 1;
          if (Math.ceil($scope.dataRows.length / $scope.pageSizedataRows) > $scope.valmaxpagdataRows)
            findataRows = 10;
          else
            findataRows = Math.ceil($scope.dataRows.length / $scope.pageSizedataRows);
        } else {
          if (inidataRows >= Math.ceil($scope.dataRows.length / $scope.pageSizedataRows) - $scope.valmaxpagdataRows) {
            inidataRows = Math.ceil($scope.dataRows.length / $scope.pageSizedataRows) - $scope.valmaxpagdataRows;
            findataRows = Math.ceil($scope.dataRows.length / $scope.pageSizedataRows);
          }
        }
        if (inidataRows < 1) inidataRows = 1;
        for (var idataRows = inidataRows; idataRows <= findataRows; idataRows++) {
          $scope.pagesdataRows.push({
            no: idataRows
          });
        }

        if ($scope.currentPagedataRows >= $scope.pagesdataRows.length)
          $scope.currentPagedataRows = $scope.pagesdataRows.length - 1;







      }

      $scope.setPagedataRows = function (index) {
        $scope.currentPagedataRows = index - 1;
      }


      $scope.pasodataRows = function (tipodataRows) {
        if (tipodataRows == 'next') {
          var idataRows = $scope.pagesdataRows[0].no + 1;
          if ($scope.pagesdataRows.length > 9) {
            var findataRows = $scope.pagesdataRows[9].no + 1;
          } else {
            var findataRows = $scope.pagesdataRows.length;
          }

          $scope.currentPagedataRows = $scope.currentPagedataRows + 1;
          if ($scope.dataRows.length % $scope.pageSizedataRows == 0) {
            var tamanomaxdataRows = parseInt($scope.dataRows.length / $scope.pageSizedataRows);
          } else {
            var tamanomaxdataRows = parseInt($scope.dataRows.length / $scope.pageSizedataRows) + 1;
          }
          if (findataRows > tamanomaxdataRows) {
            findataRows = tamanomax;
            idataRows = tamanomaxdataRows - 9;
          }
        } else {
          var idataRows = $scope.pagesdataRows[0].no - 1;
          if ($scope.pagesdataRows.length > 9) {
            var findataRows = $scope.pagesdataRows[9].no - 1;
          } else {
            var findataRows = $scope.pagesdataRows.length;
          }

          $scope.currentPagedataRows = $scope.currentPagedataRows - 1;
          if (idataRows <= 1) {
            idataRows = 1;
            findataRows = $scope.pagesdataRows.length;
          }
        }
        $scope.calculardataRows(idataRows, findataRows);
      }


      $scope.calculardataRows = function (idataRows, findataRows) {
        if (findataRows > 9) {
          idataRows = findataRows - 9;
        } else {
          idataRows = 1;
        }
        $scope.pagesdataRows = [];
        for (idataRows; idataRows <= findataRows; idataRows++) {
          $scope.pagesdataRows.push({
            nodataRows: idataRows
          });
        }
      }



    }



  ]);
