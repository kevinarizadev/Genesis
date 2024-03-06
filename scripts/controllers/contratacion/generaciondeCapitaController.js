'use strict';
angular.module('GenesisApp')
  .controller('generaciondeCapitaController', ['$scope', '$http', 'notification', 'acasHttp', 'ngDialog', '$filter', 'communication', '$rootScope',
    function ($scope, $http, notification, acasHttp, ngDialog, $filter, communication, $rootScope) {
      $scope.Inicio = function () {
        $scope.responsable = sessionStorage.getItem('cedula')
        $scope.activaciondeaperturadeCapita();
        $scope.tiposdeConcepto();
        $scope.validarperiodo();
        $scope.limpiarTabs1();
        $scope.limpiarTabs2();

        $('.tabs').tabs();
        $scope.Tabs = 1;
        $('.modal').modal();
        if ($scope.responsable == '72195313') {
          $scope.DescargueConsolidado = true;
        }
        $(".fechaperiodo").kendoDatePicker({
          culture: "es-MX",
          start: "year",
          depth: "year",
          format: "MM/yyyy",
          dateInput: true
        });
        $scope.ejecutarcapita = false;
        $scope.vistacontrolbotonejecutarCapita = false;
      }
      $scope.Set_Tab = function (x) {
        $scope.Tabs = x;
        // console.log($scope.Tabs);
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }
      $scope.limpiarTabs2 = function () {
        $scope.limpiarProcesodedescargue();
        $scope.limpiarProcesodecargue();
      }
      $scope.limpiarTabs1 = function () {
        $scope.fechainicio = '';
        $scope.fechafinal = '';
      }
      $scope.limpiarProcesodedescargue = function () {
        $scope.tipos_concepto = '';
        $scope.regimen = '';
        $scope.nombrearchivo_txt = '';
        document.querySelector("#anexoadj_txt").value = '';
      }
      $scope.limpiarProcesodecargue = function () {
        $scope.tipodeconcepto3 = '';
        $scope.nombrearchivo_txt = '';
        $scope.regimenc = '';
      }
      ////////////////////////////////////////////////////////////////////// TABS 1 /////////////////////////////////////////////////////////////
      // Esta varible sirbe para ocultar la fecha del periodo a generar
      $scope.ocultarperiodoGenerar = true;
      // *********************************
      // Esta varible sirbe para activar el modo disable al boton de Apertura de capita.
      $scope.aperturaCapitadisable = false;
      $scope.generarCapitadisable = false;
      $scope.classebuttonGenerarcapita = "default-linear-gradient";
      $scope.classebuttonApertura = "default-linear-gradient";
      // **********************************************
      // Funciones para crear el periodo y validar
      $scope.validarperiodo = function () {
        $http({
          method: 'POST',
          url: "php/contratacion/generaciondecapita.php",
          data: { function: 'validarperiodo' }
        }).then(function (response) {
          //console.log(response);
          $scope.controlboton_Capita(response);
          $scope.periodo = response.data[0].periodo;
          $scope.periodoCapturar = response.data[0].periodo_capturar;
          if ($scope.periodo == $scope.periodoCapturar) {
            $scope.ocultarperiodoGenerar = false;
          }
          if (response.data[0].estado == 'C') {
            $scope.ejecutarcapita = false;
          }
          $scope.estadoCapita();
          if ($scope.periodo == "G") {
            $scope.estadodelperido = response.data[0].mensaje;
          } else {
            $scope.estadodelperido = response.data[0].mensaje;
          }
        });
      }
      $scope.controlboton_Capita = function (info) {
        console.log(info);
        $http({
          method: 'POST',
          url: "php/contratacion/generaciondecapita.php",
          data: {
            function: 'controlbotonCapita',
            vpperiodo: info.data[0].periodo
          }
        }).then(function (response) {
          console.log(response);
          // $scope.estadodelperiodopn = response.data[0].periodo;
          $scope.estadoperiodomensaje = response.data[0].mensaje;
          $scope.estadodelperiodo = response.data[0].estado;
          $scope.controlbotonejecutarCapita = response.data[0].estado;
          if ($scope.controlbotonejecutarCapita == "C") {
            $scope.vistacontrolbotonejecutarCapita = false;
            $scope.ejecutarcapita = false;
            return
          }
          if ($scope.estadodelperiodo == "A") {
            $scope.texto_estado = "Abierto";
            $scope.vistacontrolbotonejecutarCapita = true;
            $scope.ejecutarcapita = true;
          } else {
            $scope.texto_estado = "No generado";
            $scope.ejecutarcapita = false;
          }
        });
      }
      //Funcion para visualizar el estado del periodo
      $scope.estadodelperiodo = function () {
        $http({
          method: 'POST',
          url: "php/contratacion/generaciondecapita.php",
          data: {
            function: 'estadodelperiodo',
            estadoperiodo: $scope.estadoperiodo
          }
        }).then(function (response) {

          $scope.estadodelperiodopn = response.data[0].periodo;
          $scope.estadoperiodomensaje = response.data[0].mensaje;
          $scope.estadodelperiodo = response.data[0].estado;
          if ($scope.estadodelperiodo == "A") {
            $scope.texto_estado = "Abierto";
          } else {
            $scope.texto_estado = "No generado";
            $scope.ejecutarcapita = false;
          }
        });
      }
      //Funcion para activar o desactivar la apertura de capita
      $scope.activaciondeaperturadeCapita = function () {
        $http({
          method: 'POST',
          url: "php/contratacion/generaciondecapita.php",
          data: { function: 'validaciondegeneracionCapita' }
        }).then(function (response) {
          $scope.validacionestadoCapita = response.data[0].codigo;
          if ($scope.validacionestadoCapita != 1) {
            $scope.aperturaCapitadisable = true;
            $scope.classebuttonApertura = "default-linear-gradient-disabled";
          }
        });
      }
      // Funcion para aperturar la capita
      $scope.aperturaCapita = function () {
        swal({
          title: 'Confirmar el Proceso',
          text: "Está seguro que desea realizar apertura de la capita",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar'
        }).then(function (result) {
          $http({
            method: 'POST',
            url: "php/contratacion/generaciondecapita.php",
            data: { function: 'aperturarCapita' }
          }).then(function (response) {
            $scope.codigoApertura = response.data[0].codigo;
            if ($scope.codigoApertura == 1) {
              swal({
                title: 'Mensaje',
                text: response.data[0].mensaje,
                type: 'error'
              }).catch(swal.noop);

            } else {
              swal({
                title: 'Mensaje',
                text: 'Apertura Generada',
                type: 'success'
              }).catch(swal.noop);
              $scope.estadoCapita();
              $scope.validarperiodo();
              $scope.activaciondeaperturadeCapita();

            }
          });
        });

      }
      $scope.funcrearPeriodo = function () {
        if ($scope.fechaMesanno == '' || $scope.fechaMesanno == null || $scope.fechaMesanno == undefined) {
          swal('Advertencia', '¡ Debe seleccionar una fecha de inicio y final !', 'warning')
        } else {
          swal({
            title: 'Confirmar Proceso',
            text: "Está seguro que desea crear periodo?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then(function (result) {
            if (result) {
              var fechainicio = "1/" + $scope.fechaMesanno;
              var fechafinal = "28/" + $scope.fechaMesanno;
              // console.log($scope.periodo_cap);
              $http({
                method: 'POST',
                url: "php/contratacion/generaciondecapita.php",
                data: {
                  function: 'crearperiodo',
                  periodo_cap: $scope.fechaMesanno,
                  fechainicio: fechainicio,
                  fechafinal: fechafinal,
                  responsable: $scope.responsable
                }
              }).then(function (response) {
                console.log(response);
                if (response.data.codigo == "0") {
                  // $scope.GenerarExcel();
                  swal({
                    title: 'Mensaje!',
                    text: response.data.mensaje,
                    type: 'error'
                  }).catch(swal.noop);
                } else {
                  $scope.dato = response.data;
                  $scope.ocultartabla = false;
                  $scope.primeraparte = true;
                  $scope.segundaparte = false;
                  $scope.validarperiodo();
                  swal({
                    title: '!Mensaje!',
                    text: response.data.mensaje,
                    // timer: 100,
                    type: 'success'
                  })
                }
              });
            }
            // $scope.$apply();
          })
          setTimeout(() => {
            $scope.validarperiodo();
          }, 100);
        }
      }
      // Funcion para crear el capita
      $scope.fungenerarCapita = function () {
        swal({
          title: 'Confirmar Proceso',
          text: "Está seguro que desea generar la capita?",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar'
        }).then(function (result) {
          if (result) {
            swal({
              title: 'Generando Precapita...',
              allowEscapeKey: false,
              allowOutsideClick: false
            });
            swal.showLoading();
            $http({
              method: 'POST',
              url: "php/contratacion/generaciondecapita.php",
              data: {
                function: 'generarcapita',
                periodoc: $scope.periodoCapturar,
                usuarior: $scope.responsable
              }
            })
              .then(function (response) {
                swal.close();
                if (response.data.codigo == "0") {
                  // $scope.GenerarExcel();
                  swal({
                    title: 'Mensaje!',
                    text: response.data.mensaje,
                    type: 'error'
                  }).catch(swal.noop);
                } else {
                  $scope.dato = response.data;
                  $scope.ocultartabla = false;
                  $scope.ejecutarcapita = true;
                  swal({
                    title: '!Mensaje!',
                    text: response.data.mensaje,
                    // timer: 100,
                    type: 'success'
                  }).catch(swal.noop);
                  $scope.estadoCapita();
                  $scope.validarperiodo();
                }
              });
          }
          $scope.$apply();
        }).catch(swal.noop);
      }
      // Funcion para crear el capita
      $scope.ejecutar_Capita = function () {
        swal({
          title: 'Confirmar Proceso',
          text: "Está seguro que desea generar la capita?",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar'
        }).then(function (result) {
          if (result) {
            swal({
              title: 'Generando Precapita...',
              allowEscapeKey: false,
              allowOutsideClick: false
            });
            swal.showLoading();
            $http({
              method: 'POST',
              url: "php/contratacion/generaciondecapita.php",
              data: {
                function: 'ejecutarCapita',
                vpperiodo: $scope.periodoCapturar,
                vpresponsable: $scope.responsable
              }
            })
              .then(function (response) {
                console.log(response);
                swal.close();
                if (response.data[0].codigo == "0") {
                  // $scope.GenerarExcel();
                  $scope.controlVista();
                  swal({
                    title: '!Mensaje!',
                    text: response.data[0].mensaje,
                    // timer: 100,
                    type: 'success'
                  }).catch(swal.noop);
                } else {
                  // $scope.dato = response.data;
                  // $scope.ocultartabla = false;
                  swal({
                    title: 'Mensaje!',
                    text: response.data[0].mensaje,
                    type: 'error'
                  }).catch(swal.noop);
                  // $scope.estadoCapita();
                  // $scope.validarperiodo();
                }
              });
          }
          $scope.$apply();
        }).catch(swal.noop);
      }
      $scope.controlVista = function () {
        $scope.ejecutarcapita = false;
      }
      ////////////////////////////////////////////////////////////////////// TABS 2 /////////////////////////////////////////////////////////////
      // Funcion de Selecc Tipo de conceptos
      $scope.tiposdeConcepto = function () {
        $http({
          method: 'POST',
          url: "php/contratacion/generaciondecapita.php",
          data: { function: 'obtenerconcepto' }
        }).then(function (response) {
          $scope.conceptos = response.data;
        });
      }
      $scope.descargarconceptoCapita = function () {
        if ($scope.tipos_concepto == null || $scope.tipos_concepto == '' || $scope.regimen == null || $scope.regimen == '') {
          swal('Advertencia', '¡ Debe seleccionar el tipo de concepto y el tipo de regimen ¡', 'warning')
        } else {
          //notify.close();
          var key = $scope.tipos_concepto;
          // console.log($scope.tipos_concepto);
          // console.log($scope.periodo );
          // console.log($scope.regimen );
          switch (key) {
            case "1":
              swal({
                title: 'Descargando información...',
                allowEscapeKey: false,
                allowOutsideClick: false
              });
              swal.showLoading();
              window.open('php/capita/archivos/retroactivo.php?periodo=' + $scope.periodo + '&regimen=' + $scope.regimen);
              break;
            case "2":
              swal({
                title: 'Descargando información...',
                allowEscapeKey: false,
                allowOutsideClick: false
              });
              swal.showLoading();
              window.open('php/capita/archivos/homonimo.php?periodo=' + $scope.periodo + '&regimen=' + $scope.regimen);
              break;
            case "3":
              swal({
                title: 'Descargando información...',
                allowEscapeKey: false,
                allowOutsideClick: false
              });
              swal.showLoading();
              window.open('php/capita/archivos/incumplimiento_actividades.php?periodo=' + $scope.periodo + '&regimen=' + $scope.regimen);
              break;
            case "4":
              swal({
                title: 'Descargando información...',
                allowEscapeKey: false,
                allowOutsideClick: false
              });
              swal.showLoading();
              window.open('php/capita/archivos/recobro_capita.php?periodo=' + $scope.periodo + '&regimen=' + $scope.regimen);
              break;
            case "5":
              swal({
                title: 'Descargando información...',
                allowEscapeKey: false,
                allowOutsideClick: false
              });
              swal.showLoading();
              window.open('php/capita/archivos/otros_descuentos.php?periodo=' + $scope.periodo + '&regimen=' + $scope.regimen);
              break;
            case "6":
              swal({
                title: 'Descargando información...',
                allowEscapeKey: false,
                allowOutsideClick: false
              });
              swal.showLoading();
              window.open('php/capita/archivos/otros_ajustes.php?periodo=' + $scope.periodo + '&regimen=' + $scope.regimen);
              break;
            case "7":
              swal({
                title: 'Descargando información...',
                allowEscapeKey: false,
                allowOutsideClick: false
              });
              swal.showLoading();
              window.open('php/capita/archivos/asignacion_contrato.php?periodo=' + $scope.periodo + '&regimen=' + $scope.regimen);
              break;
          }
          setTimeout(() => {
            swal.close();
            $scope.$apply();
          }, 500);
        }
        $scope.limpiarProcesodedescargue();
      }
      //Proceso fron de ESTADO DE CAPITA
      $scope.estadoCapita = function () {
        $http({
          method: 'POST',
          url: "php/contratacion/generaciondecapita.php",
          data: {
            function: 'estadocapita',
            estadocapita: $scope.periodo
          }
        }).then(function (response) {
          console.log(response);
          $scope.estadocapita1 = response.data[0].mensaje;
          $scope.estadocapita2 = response.data[0].codigo;
          $scope.estadoCapita3 = response.data[0].estado;

          if ($scope.estadocapita2 == 1) {
            $scope.estadocapitamensaje = response.data[0].mensaje;
            $scope.classebuttonGenerarcapita = "default-linear-gradient-disabled";
            $scope.generarCapitadisable = true;

          } else {
            $scope.classebuttonGenerarcapita = "default-linear-gradient";
            $scope.generarCapitadisable = false;
            $scope.estadocapitamensaje = "Capita no generada aun";
            $scope.ejecutarcapita = false;
            $scope.vistacontrolbotonejecutarCapita = false;
          }

        });
      }
      //Proceso de cargnue de capita.
      $scope.Cargarcapita = function () {
        if ($scope.tipodeconcepto3 == '' || $scope.tipodeconcepto3 == null || $scope.tipodeconcepto3 == undefined || $scope.regimenc == '' || $scope.regimenc == null || $scope.regimenc == undefined || $scope.json_file.length == 0) {
          swal('Advertencia', '! Debe seleccionar el tipo de concepto y el tipo de regimen ¡ ', 'warning')
        } else {
          swal({
            title: 'Cargando informacion...',
            allowEscapeKey: false,
            allowOutsideClick: false
          });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/contratacion/generaciondecapita.php",
            data: {
              function: 'cargarmatriz',
              cargue_concepto: $scope.tipodeconcepto3,
              cargue_json: JSON.stringify($scope.json_file),
              cargue_cantidad: $scope.json_file.length
            }
          }).then(function (response) {
            swal.close();
            if (response.data.Codigo == 1) {
              swal({ title: 'Mensaje!', text: response.data.Mensaje, type: 'success' })
              $scope.limpiarProcesodecargue();

            } else {
              swal({ title: '!Mensaje!', text: response.data.Mensaje, type: 'warning' })
              $scope.limpiarProcesodecargue();
            }
          })
        }
      }
      ///Funcion de cargue de archivos ///
      $scope.arrayFiles = [];
      $("form").on("change", ".file-upload-field", function () {

        if ($scope.tipodeconcepto3 == null || $scope.tipodeconcepto3 == '' || $scope.tipodeconcepto3 == undefined || $scope.regimenc == ''
          || $scope.regimenc == null || $scope.regimenc == undefined) {
          swal('Advertencia', '¡Debe seleccionar tipos de concepto y/o regimen! ', 'warning')
        }
        else {
          var archivo = $(this).val().replace(/.*(\/|\\)/, '').split(".");
          var pperiodo = $scope.conceptos.find(x => x.codigo == $scope.tipodeconcepto3);
          var nombre = pperiodo.nombre;
          var ext = archivo[1];
          if ($(this)["0"].files.length > 0) { // se valida que exista el archivo
            if ($(this)["0"].files["0"].size <= 3000000) { // se valida el tamaño del archivo
              if (ext.toUpperCase() == 'TXT') { //se valida el tipo del archivo
                $("#periodo").parent(".file-upload-wrapper").attr("data-text", archivo[0] + '.' + archivo[1]);
                // $scope.fileToBase64($(this)["0"].files, nombre);
                $scope.readCT($(this)["0"].files["0"], pperiodo.codigo, $(this), nombre);
              } else {
                $(this).val().replace(/.*(\/|\\)/, '');
                $("#" + $(this)[0].id).val(null);
                swal('Advertencia', '¡Tipo de archivo incorrecto', 'warning')
              }
            } else {
              $(this).val().replace(/.*(\/|\\)/, '');
              $("#" + $(this)[0].id).val(null);
              swal('Advertencia', '¡El tamaño del archivo es demasiado grande', 'warning')
            }
          } else {
            $(this).val().replace(/.*(\/|\\)/, '');
            $("#" + $(this)[0].id).val(null);
            swal('Advertencia', '¡Debe agregar algún adjunto!', 'warning')
          }
        }
      });
      $scope.fileToBase64 = function (filesSelected, name) {
        if (filesSelected.length > 0) {
          var fileToLoad = filesSelected[0];
          var fileReader = new FileReader();
          fileReader.onload = function (fileLoadedEvent) {
            var array = {
              src: fileLoadedEvent.target.result,
              name: name
            };
            var x = [];
            x = $scope.arrayFiles.findIndex(x => x.name === array.name);
            if (x == -1) {
              $scope.arrayFiles.push(array);
            } else {
              $scope.arrayFiles[x].src = array.src;
            }
            console.log($scope.arrayFiles)
          };
          fileReader.readAsDataURL(fileToLoad);
        }
      }
      $scope.readCT = function (data, concepto, thisfile, nombre) {
        var file = data;
        $scope.resumenct = [];
        $scope.estado = true;
        var reader = new FileReader();

        reader.onload = function (progressEvent) {
          // By lines

          var lines = this.result.split('\n');
          var datos;
          var mensaje = '';
          var info = '';
          $scope.json_file = [];

          var tamaño = 0;
          switch (concepto) {
            case 1:
              tamaño = 9;
              break;
            case 2:
              tamaño = 9;
              break;
            case 3:
              tamaño = 9;
              break;
            case 4:
              tamaño = 9;
              break;
            case 5:
              tamaño = 9;
              break;
            case 6:
              tamaño = 9;
              break;
            case 7:
              tamaño = 11;
              break;
            default:
              alert("Debe seleccionar");
              break;
          }
          for (var line = 0; line < lines.length; line++) {
            info = lines[line];
            if (info.trim() == "" || info.trim() == undefined || info.trim() == null || info.trim() == 'undefined') { // Se valida que no existan saltos de linea en la estructura
              $scope.estado = false;
              mensaje = "El archivo contiene saltos de lineas, por favor depurarlos";
              break;
            } else {
              datos = lines[line].split(',');
              if (datos.length != tamaño) { // se valida que la estructura tenga la cantidad de campos requeridos
                $scope.estado = false;
                mensaje = 'el archivo ' + nombre + ' presenta error de estructura tiene mas columnas de las ' + tamaño + ' esperadas.'
                break;
              } else {
                if (concepto == 7) {
                  $scope.json_file.push({
                    id: line + 1,
                    per_capitacion: $scope.periodo,
                    nit_prestador: datos[1].trim(),
                    tip_regimen: datos[5].trim(),
                    num_contrato: datos[6].trim(),
                    cod_centrocostos: datos[7].trim(),
                    tip_servicio: datos[8].trim(),
                    grupoetareo: datos[9].trim(),
                    dato_mod: datos[10].trim()
                  });
                } else {
                  $scope.json_file.push({
                    id: line + 1,
                    per_capitacion: $scope.periodo,
                    nit_prestador: datos[1].trim(),
                    tip_regimen: datos[5].trim(),
                    num_contrato: datos[6].trim(),
                    cod_centrocostos: datos[7].trim(),
                    tip_servicio: '',
                    dato_mod: datos[8].trim()
                  });
                }
              }
            }
          }
          if ($scope.estado == true) { // VALIDAR QUE LA ESTRUCTURA ESTE BIEN
            console.log(JSON.stringify($scope.json_file));

          } else {
            $scope.json_file = [];
            $("#periodo").parent(".file-upload-wrapper").attr("data-text", "Subir archivo");
            thisfile.val().replace(/.*(\/|\\)/, '');
            $("#" + thisfile[0].id).val(null);
            swal('IMPORTANTE', mensaje, 'info')
          }
          // if ($scope.estado == true) {
          //     thisfile.parent(".file-upload-wrapper").attr("data-text", nombre + '.txt');
          //     $scope.fileToBase64(thisfile["0"].files, nombre);
          //     $scope.limpiarArchivos();
          //     $scope.listct = $scope.resumenct;
          //     $scope.switcharchivos = false;
          //     $scope.ctlleno = true;

          //     $scope.$apply();
          // } else {
          //     if (tipoval == '2') {
          //         swal('IMPORTANTE', 'el archivo ' + nombre.substr(0, 2) + ' presenta error de estructura tiene mas columnas de las ' + tamaño + ' esperadas.', 'info')
          //     } else if (tipoval == '3') {
          //         swal('IMPORTANTE', 'El archivo ' + sigla + ' actualmente no esta configurado para cargarlo, favor comunicarse con el area de cuentas medicas o modificar el archivo CT.', 'info')
          //         thisfile.val("");
          //         thisfile.parent(".file-upload-wrapper").attr("data-text", 'Archivo (' + thisfile["0"].id + ')');
          //         $scope.switcharchivos = true;
          //         $scope.ctlleno = false;
          //         $scope.$apply();
          //     } else {
          //         swal('IMPORTANTE', 'El codigo de habilitacion del archivo (CT) no coincide con el ingresado en el paso anterior.', 'info')
          //         thisfile.val("");
          //         thisfile.parent(".file-upload-wrapper").attr("data-text", 'Archivo (' + thisfile["0"].id + ')');
          //         $scope.switcharchivos = true;
          //         $scope.ctlleno = false;
          //         $scope.$apply();
          //     }
          // }
        }
        reader.readAsText(file);
      }
      // Funciones de descargue del consolidado
      $scope.descargarconsolidar = function () {
        swal({
          title: 'Descargando Consolidado...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        window.open('php/capita/archivos/descargueconsolidar.php?periodo=' + $scope.periodo);
        setTimeout(() => {
          swal.close();
          $scope.$apply();
        }, 500);
      }
      if (document.readyState !== 'loading') {
        $scope.Inicio();
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }
    }]);





