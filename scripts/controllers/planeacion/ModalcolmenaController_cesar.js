'use strict';
angular.module('GenesisApp')
  .controller('ModalcolmenaController', ['$scope', '$http', 'ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller', '$rootScope', '$window',
    function ($scope, $http, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window) {
      $scope.panel = { activosL: $scope.detalles.length, select: $scope.vista.panel, editar: $scope.vista.editar, numero: $scope.vista.numero_id, file: {}, name: "", ext: "", botonera: 0 };
      $scope.gestiona;
      $scope.cedula;
      $scope.misReportesCreados = $scope.gestiona[0].ADMIN;
      $scope.misRevisa = $scope.gestiona[1].REVISA;
      $scope.misReporta = $scope.gestiona[2].REPORTA;
      $scope.misElabora = $scope.gestiona[3].ELABORA;

      $scope.reporte = {
        numero: "",
        codigo_reporte: "",
        fecha_reporte: "",
        hora: "",
        dias_notifica: "",
        frecuencia: "",
        objetivo: "",
        entes: "",
        tipo_norma: "",
        anno_norma: "",
        norma: "",
        link_norma: "",
        link_anexo: "",
        tipo_archivo: "",
        cant_archivo: "",
        delimitado: "",
        elabora: "",
        revisa: "",
        reporta: "",
        estado: "A",
        accion: "I",
        link_cargue: "",
        fecha_cargue: ""
      };
      $scope.fecha_reporteOri = "";
      $scope.fecha_cargueOri = "";
      $scope.CurrentDate = new Date();
      $scope.btn_update = false;
      $scope.filesArray = [{ file: "", base64: "", name: "", ext: "", id: "", url: "" }, { file: "", base64: "", name: "", ext: "", id: "", url: "" }, { file: "", base64: "", name: "", ext: "", id: "", url: "" }];
      $scope.fechaActual = function () {
        return (new Date($scope.yearSelect, ($scope.monthNumSelect - 1), ($scope.daySelect - 1)).getTime() >= new Date($scope.CurrentDate.getFullYear(), $scope.CurrentDate.getMonth(), $scope.CurrentDate.getDate()).getTime());
      }
      $scope.fechaActual2 = function () {
        return (new Date($scope.yearSelect, ($scope.monthNumSelect - 1), $scope.daySelect).getTime() == new Date($scope.CurrentDate.getFullYear(), $scope.CurrentDate.getMonth(), $scope.CurrentDate.getDate()).getTime());
      }
      $scope.fechaActual3 = function () {
        return (new Date($scope.yearSelect, ($scope.monthNumSelect - 1), $scope.daySelect).getTime() >= new Date($scope.CurrentDate.getFullYear(), $scope.CurrentDate.getMonth(), $scope.CurrentDate.getDate()).getTime());
      }
      $scope.obtenerListaReporte = function () {
        $http({
          method: 'POST',
          url: "php/planeacion/colmena.php",
          data: {
            function: 'obtenerListaReporte'
          }
        }).then(function (response) {
          $scope.codigo_reporte = response.data;
        })
      }
      $scope.obtenerListaReporte();
      $scope.obtenerEntes = function () {
        $http({
          method: 'POST',
          url: "php/planeacion/colmena.php",
          data: {
            function: 'obtenerEntes'
          }
        }).then(function (response) {
          $scope.entes = response.data;
        })
      }
      $scope.obtenerEntes();
      $scope.obtenerListaCargos = function () {
        $http({
          method: 'POST',
          url: "php/planeacion/colmena.php",
          data: {
            function: 'obtenerListaCargos'
          }
        }).then(function (response) {
          $scope.elabora = response.data[1].ELABORA_REPORTA;
          $scope.revisa = response.data[0].REVISA;
          $scope.reporta = response.data[1].ELABORA_REPORTA;
          // $scope.ListaReporte = response.data;
        })
      }
      $scope.obtenerListaCargos();
      $scope.obtenerListaArchivos = function () {
        $http({
          method: 'POST',
          url: "php/planeacion/colmena.php",
          data: {
            function: 'obtenerListaArchivos'
          }
        }).then(function (response) {
          $scope.tipo_archivo = response.data;
        })
      }
      $scope.obtenerListaArchivos();
      $scope.obtenerTipoNorma = function () {
        $http({
          method: 'POST',
          url: "php/planeacion/colmena.php",
          data: {
            function: 'obtenerTipoNorma'
          }
        }).then(function (response) {
          $scope.tipo_norma = response.data;
        })
      }
      $scope.obtenerTipoNorma();
      $scope.cambiarVista = function (value, edit = false, diaSelect = $scope.daySelect, mesSelect = $scope.monthSelect, annoSelect = $scope.yearSelect, nombreSelect = $scope.nameSelect) {
        if (value == 0) {
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          $scope.titulo = $scope.daySelect + " de " + $scope.monthSelect + " del " + $scope.yearSelect + " (" + $scope.nameSelect + ")";
          $scope.detalleFecha = [];
          if ($scope.treporte == "Todos los reportes" && $scope.admin == false) {
            for (let i = 0; i < $scope.detalles.length; i++) {
              $scope.detalleFecha.push({ "numero": $scope.detalles[i].code, "nombre_reporte": $scope.detalles[i].name, "estado": $scope.detalles[i].EstadoCal });
            }
            swal.close();
          } else {
            $http({
              method: 'POST',
              url: "php/planeacion/colmena.php",
              data: {
                function: 'obtenerListaFecha', fecha: $scope.daySelect + "/" + $scope.monthNumSelect + "/" + $scope.yearSelect
              }
            }).then(function (response) {
              $scope.detalleFecha = response.data;
              swal.close();
            })
          }
        } else if (value == 1) {
          $scope.titulo = ((edit) ? "Editar" : "Nuevo") + " reporte";
          $scope.btn_update = edit;
          $scope.fecha_reporteOri = new Date($scope.yearSelect, ($scope.monthNumSelect - 1), $scope.daySelect);
          $scope.fecha_notifica = (edit) ? "" : ($scope.fechaActual2()) ? new Date() : new Date($scope.yearSelect, ($scope.monthNumSelect - 1), ($scope.daySelect - 1));
          $scope.reporte.anno_norma = (edit) ? "" : $scope.CurrentDate.getFullYear();
          $scope.diasAntes = (edit) ? "" : ($scope.fechaActual2()) ? 0 : 1;
          $scope.reporte.cant_archivo = (edit) ? "" : 1;
          $scope.reporte.hora = (edit) ? "" : "7:00";
          $scope.fecha_cargueOri = new Date($scope.yearSelect, ($scope.monthNumSelect - 1), ($scope.daySelect + 1));
        } else if (value == 2) {
          $scope.titulo = "Reporte para el " + diaSelect + " de " + mesSelect + " del " + annoSelect + " (" + nombreSelect + ")";
        } else if (value == 3) {
          $scope.titulo = "Gestionar Reportes";
        } else if (value == 4) {
          $scope.titulo = "Asignar Elabora y Reporta";
          $scope.btn_update = edit;
          $scope.fecha_reporteOri = new Date($scope.yearSelect, ($scope.monthNumSelect - 1), $scope.daySelect);
          $scope.fecha_notifica = (edit) ? "" : ($scope.fechaActual2()) ? new Date() : new Date($scope.yearSelect, ($scope.monthNumSelect - 1), ($scope.daySelect - 1));
          $scope.reporte.anno_norma = (edit) ? "" : $scope.CurrentDate.getFullYear();
          $scope.diasAntes = (edit) ? "" : ($scope.fechaActual2()) ? 0 : 1;
          $scope.reporte.cant_archivo = (edit) ? "" : 1;
          $scope.reporte.hora = (edit) ? "" : "7:00";
          $scope.fecha_cargueOri = new Date($scope.yearSelect, ($scope.monthNumSelect - 1), ($scope.daySelect + 1));
        }
      }
      $scope.cambiarVista($scope.panel.select, $scope.panel.editar);
      $scope.calculaDias = function (fechaLimite, fechaNotificar) {
        if (fechaLimite != "" && fechaNotificar != "") {
          setTimeout(function () {
            console.log(fechaLimite, fechaNotificar);
            if (fechaLimite != null && fechaLimite != undefined && fechaNotificar != null && fechaNotificar != undefined) {
              if ($scope.fechaActual2() == true) {
                $scope.diasAntes = 0;
              } else {
                if (fechaLimite.getTime() == new Date($scope.CurrentDate.getFullYear(), $scope.CurrentDate.getMonth(), $scope.CurrentDate.getDate()).getTime()) {
                  $scope.diasAntes = 0;
                } else {
                  if (fechaLimite.getTime() > fechaNotificar.getTime()) {
                    var n1 = new Date(fechaLimite);
                    var n2 = new Date(fechaNotificar);
                    $scope.diasAntes = (n1.getTime() - n2.getTime()) / (1000 * 60 * 60 * 24);
                    if ($scope.diasAntes % 1 != 0) {
                      $scope.diasAntes = 1;
                      var dia = fechaLimite.getDate();
                      var mes = fechaLimite.getMonth() + 1;
                      var año = fechaLimite.getFullYear();
                      $scope.fecha_notifica = new Date(año, (mes - 1), (dia - 1));
                    }
                  } else {
                    $scope.diasAntes = 1;
                  }
                }
              }
            } else {
              $scope.diasAntes = 1;
              var dia = $scope.fecha_reporteOri.getDate();
              var mes = $scope.fecha_reporteOri.getMonth() + 1;
              var año = $scope.fecha_reporteOri.getFullYear();
              $scope.fecha_notifica = new Date(año, (mes - 1), (dia - 1));
            }
          });
        }
      }
      $scope.listarCargo = function (idCargo, value) {
        $http({
          method: 'POST',
          url: "php/planeacion/colmena.php",
          data: {
            function: 'listarCargo',
            id: idCargo
          }
        }).then(function (response) {
          if (response.data.Codigo == 0) {
            if (value == 0) {
              $scope.usuelabora = [];
            } else if (value == 1) {
              $scope.usureporta = [];
            }
            swal('Mensaje', 'No se encontraron usuarios en ese cargo', 'warning');
          } else {
            if (value == 0) {
              $scope.usuelabora = response.data;
              setTimeout(() => {
                $scope.reporte.cedula_elabora = $scope.detalleReporte[0].cedula_elabora;
                console.log("Elabora:", $scope.reporte.cedula_elabora);
              }, 100);
            } else if (value == 1) {
              $scope.usureporta = response.data;
              setTimeout(() => {
                $scope.reporte.cedula_reporta = $scope.detalleReporte[0].cedula_reporta;
                console.log("Reporta:", $scope.reporte.cedula_reporta);
              }, 100);
            }
          }
        })
      }
      // actuliza fecha de notificacion
      $scope.actulizarFechaNotifica = function (date) {
        if ($scope.fechaActual2() == true) {
          $scope.fecha_notifica = new Date();
          $scope.diasAntes = 0;
        } else {
          if (date.getTime() == new Date($scope.CurrentDate.getFullYear(), $scope.CurrentDate.getMonth(), $scope.CurrentDate.getDate()).getTime()) {
            $scope.fecha_notifica = new Date();
            $scope.diasAntes = 0;
          } else {
            var dia = date.getDate();
            var mes = date.getMonth() + 1;
            var año = date.getFullYear();
            $scope.fecha_notifica = new Date(año, (mes - 1), (dia - 1));
            $scope.diasAntes = 1;
          }
        }
      }
      // Devuelve la fecha actual en un formato m/d/a para BD
      $scope.formatDate = function (date, tipo) {
        if (tipo == 7) {
          var temp = new Date(date.substring(0, 1));
        } else {
          var dia = date.getDate();
          var mes = date.getMonth() + 1;
          var año = date.getFullYear();
          if (tipo == 0) {
            return ((dia < 10) ? ("0" + dia) : dia) + '/' + ((mes < 10) ? ('0' + mes) : mes) + '/' + año;
          } else if (tipo == 1) {
            return año + '/' + mes + '/' + dia;
          } else if (tipo == 2) {
            var resultado = new Date(año, (mes - 1), (dia - 1));
            dia = resultado.getDate();
            mes = resultado.getMonth() + 1;
            año = resultado.getFullYear();
            return año + '-' + ((mes < 10) ? ('0' + mes) : mes) + '-' + ((dia < 10) ? ("0" + dia) : dia);
          } else if (tipo == 3) {
            return año + '-' + ((mes < 10) ? ('0' + mes) : mes) + '-' + ((dia < 10) ? ("0" + dia) : dia);
          } else if (tipo == 4) {
            return año;
          } else if (tipo == 5) {
            return mes;
          } else if (tipo == 6) {
            return dia;
          }
        }
      }
      // Borrar 
      $scope.borrarReporte = function (numero) {
        swal({
          title: 'Confirmar Proceso',
          text: "¿Desea eliminar el reporte #" + numero + " ?",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar'
        }).then(function (result) {
          if (result) {
            $scope.reporte = {
              numero: numero,
              accion: "D",
              codigo_reporte: "",
              fecha_reporte: "",
              hora: "",
              dias_notifica: "",
              frecuencia: "",
              objetivo: "",
              entes: "",
              tipo_norma: "",
              anno_norma: "",
              norma: "",
              link_norma: "",
              link_anexo: "",
              tipo_archivo: "",
              cant_archivo: "",
              delimitado: "",
              elabora: "",
              revisa: "",
              reporta: "",
              estado: "A",
              link_cargue: "",
              fecha_cargue: "",
              estadop: "X"
            };
            $http({
              method: 'POST',
              url: "php/planeacion/colmena.php",
              data: {
                function: 'insertarReporte',
                json: JSON.stringify($scope.reporte)
              }
            }).then(function (response) {
              if (response.data.Codigo == 0) {
                $scope.closeThisDialog(response.data.Codigo);
                swal('Completado', response.data.Mensaje, 'success');
              } else {
                swal('Mensaje', response.data.mensaje, 'warning');
              };
            });
          } else {
            swal('Mensaje', response.data.mensaje, 'warning');
          };
        }).catch(swal.noop);
      }
      // Cancelar modal
      $scope.modalClose = function () {
        $scope.closeThisDialog();
      }
      $scope.frecuenciaText = function (caso) {
        switch (caso) {
          case "A":
            return "Una vez";
          case "B":
            return "Semanal";
          case "C":
            return "Quincenal";
          case "D":
            return "Mensual";
          case "E":
            return "Trimestral";
          case "F":
            return "Semestral";
          case "G":
            return "Anual";
          case "H":
            return "Bimensual";
          case "I":
            return "Cuatrimestral";
        }
      }
      $scope.horaText = function (caso) {
        switch (caso) {
          case "7:00":
            return "7:00 a.m.";
          case "8:00":
            return "8:00 a.m.";
          case "9:00":
            return "9:00 a.m.";
          case "10:00":
            return "10:00 a.m.";
          case "11:00":
            return "11:00 a.m.";
          case "12:00":
            return "12:00 p.m.";
          case "13:00":
            return "1:00 p.m.";
          case "14:00":
            return "2:00 p.m.";
          case "15:00":
            return "3:00 p.m.";
          case "16:00":
            return "4:00 p.m.";
          case "17:00":
            return "5:00 p.m.";
          case "18:00":
            return "6:00 p.m.";
          case "19:00":
            return "7:00 p.m.";
          case "20:00":
            return "8:00 p.m.";
          case "21:00":
            return "9:00 p.m.";
          case "22:00":
            return "10:00 p.m.";
          case "23:00":
            return "1:00 p.m.";
          case "24:00":
            return "12:00 a.m.";
          case "1:00":
            return "1:00 a.m.";
          case "2:00":
            return "2:00 a.m.";
          case "3:00":
            return "3:00 a.m.";
          case "4:00":
            return "4:00 a.m.";
          case "5:00":
            return "5:00 a.m.";
          case "6:00":
            return "6:00 a.m.";
        }
      }
      // ver
      $scope.verReporte = function (numero) {
        $http({
          method: 'POST',
          url: "php/planeacion/colmena.php",
          data: {
            function: 'verReporte',
            numero: JSON.stringify(numero)
          }
        }).then(function (response) {
          console.log(response.data);
          $scope.reporte = {
            numero: numero,
            codigo_reporte: response.data[0].codigo_reporte,
            fecha_reporte: response.data[0].fecha,
            hora: response.data[0].hora,
            dias_notifica: $scope.diasAntes,
            frecuencia: response.data[0].frecuencia,
            objetivo: response.data[0].objetivo,
            entes: response.data[0].entes,
            tipo_norma: response.data[0].cod_tipo_norma,
            anno_norma: response.data[0].anno_norma,
            norma: response.data[0].norma,
            link_norma: response.data[0].link_norma,
            link_anexo: response.data[0].link_anexo,
            tipo_archivo: response.data[0].tipo_archivo,
            cant_archivo: response.data[0].cant_archivo,
            delimitado: response.data[0].delimitado,
            elabora: response.data[0].cod_elabora,
            revisa: response.data[0].cod_revisa,
            reporta: response.data[0].cod_reporta,
            accion: "U",
            link_cargue: response.data[0].archivo_cargado,
            fecha_cargue: response.data[0].fecha_registro,
            cedula_elabora: response.data[0].cedula_elabora,
            cedula_reporta: response.data[0].cedula_reporta,
            nombre_reporte: response.data[0].nombre_reporte
          };
          console.log("Gestionar:", $scope.reporte);
          var fechanotifica = response.data[0].notifica.split("/");
          $scope.fecha_notifica = new Date(fechanotifica[2], (fechanotifica[1] - 1), fechanotifica[0]);
          $scope.calculaDias($scope.fecha_reporteOri, $scope.fecha_notifica);
          $scope.detalleReporte = response.data;
          console.log($scope.detalleReporte, $scope.reporte);
        });
      }
      // Gestionar 
      $scope.gestionarReportes = function (id, estado, archivo) {
        if (archivo != null && archivo != "") {
          $scope.reporte = {
            numero: id,
            codigo_reporte: $scope.reporte.codigo_reporte,
            fecha_reporte: $scope.reporte.fecha_reporte,
            hora: $scope.reporte.hora,
            dias_notifica: $scope.diasAntes,
            frecuencia: $scope.reporte.frecuencia,
            objetivo: $scope.reporte.objetivo,
            entes: $scope.reporte.entes,
            tipo_norma: $scope.reporte.tipo_norma,
            anno_norma: $scope.reporte.anno_norma,
            norma: $scope.reporte.norma,
            link_norma: $scope.reporte.link_norma,
            link_anexo: $scope.reporte.link_anexo,
            tipo_archivo: $scope.reporte.tipo_archivo,
            cant_archivo: $scope.reporte.cant_archivo,
            delimitado: $scope.reporte.delimitado,
            elabora: $scope.reporte.elabora,
            revisa: $scope.reporte.revisa,
            reporta: $scope.reporte.reporta,
            accion: "G",
            link_cargue: $scope.reporte.link_cargue,
            fecha_cargue: $scope.reporte.fecha_cargue,
            estadop: estado
          };
          $http({
            method: 'POST',
            url: "php/planeacion/colmena.php",
            data: {
              function: 'insertarReporte',
              json: JSON.stringify($scope.reporte)
            }
          }).then(function (response) {
            if (response.data.Codigo == 0) {
              $http({
                method: 'POST',
                url: "php/planeacion/colmena.php",
                data: {
                  function: 'obtenerGestion',
                  year: $scope.year
                }
              }).then(function (response) {
                if (response.data[0].Codigo == 0) {
                  $scope.gestion = [];
                  $scope.closeThisDialog(response.data[0].Codigo);
                } else {
                  swal('Completado', 'Reporte #' + id + ' Aprobado', 'success');
                  $scope.gestion = response.data;
                }
              })
            } else {
              swal('Mensaje', 'Error con el reporte #' + id, 'warning');
            }
          })
        } else {
          swal('Mensaje', 'Solo se puede realizar esta accion despues de haber cargado el reporte' + id, 'warning');
        }
      }
      $scope.asignarReporte = function (cedulaEla, cedulaRep) {
        if ($scope.reporte.numero != '' && $scope.reporte.elabora != '' && $scope.reporte.reporta != '' && cedulaEla != '' && cedulaRep != '' && $scope.reporte.numero != null && $scope.reporte.elabora != null && $scope.reporte.reporta != null && cedulaEla != null && cedulaRep != null) {
          $http({
            method: 'POST',
            url: "php/planeacion/colmena.php",
            data: {
              function: 'asignarReporte',
              numero: $scope.reporte.numero,
              elabora_cod: $scope.reporte.elabora,
              elabora_cedula: cedulaEla,
              reporta_cod: $scope.reporte.reporta,
              reporta_cedula: cedulaRep
            }
          }).then(function (response) {
            if (response.data.Codigo == 0) {
              swal('Completado', response.data.Nombre, 'success');
              $scope.closeThisDialog(response.data.Codigo);
            } else {
              swal('Mensaje', response.data.Nombre, 'warning');
            };
          });
        } else {
          swal('Campos vacios', 'Por favor, llenar todos los campos obligatorios *', 'warning');
        }
      }
      $scope.url_auto = function (texto) {
        var url = texto;
        url = url.replace(/á/gi, "a");
        url = url.replace(/é/gi, "e");
        url = url.replace(/í/gi, "i");
        url = url.replace(/ó/gi, "o");
        url = url.replace(/ú/gi, "u");
        url = url.replace(/ñ/gi, "n");
        url = url.replace(/-/gi, "_");
        url = url.replace(/.pdf/gi, "");
        url = url.replace(/.docx/gi, "");
        url = url.replace(/.doc/gi, "");
        url = url.replace(/.xls/gi, "");
        url = url.replace(/.xlsx/gi, "");
        url = url.replace(/.zip/gi, "");
        url = url.replace(/.rar/gi, "");
        return url.replace(/\s/g, "_").toLowerCase();
      }
      $scope.fileToBase64 = function (filesSelected, name, ext, id) {
        if (filesSelected.length > 0) {
          var fileToLoad = filesSelected[0];
          var reader = new FileReader();
          reader.onload = function (e) {
            $scope.filesArray[id].base64 = e.target.result;
            $scope.filesArray[id].name = $scope.url_auto(name);
            $scope.filesArray[id].ext = ext;
            $scope.filesArray[id].url = "";
            $scope.filesArray[id].file = "";
          };
          reader.readAsDataURL(fileToLoad);
        }
      }
      function getBase64(file) {
        return new Promise(function (resolve, reject) {
          var reader = new FileReader();
          reader.onload = function () { resolve(reader.result); };
          reader.onerror = reject;
          reader.readAsDataURL(file[0]);
        });
      }
      $scope.respuestaUrl = function (element, location = "Reportes", id) {
        $http({
          method: 'POST',
          url: "php/planeacion/colmena.php",
          data: {
            function: 'reporteFileUrl',
            file: JSON.stringify(element),
            location: JSON.stringify(location)
          }
        }).then(function (response) {
          $scope.filesArray[id].url = response.data.url;
        });
      }
      // Guardar 
      $scope.guardarReporte = function (fecha) {
        if ($scope.reporte.codigo_reporte != "" && $scope.reporte.objetivo != "" && $scope.reporte.tipo_archivo != "" && $scope.reporte.entes != "" && $scope.reporte.tipo_norma != "" && $scope.reporte.revisa != "" && $scope.reporte.elabora == "" && $scope.reporte.reporta == "" && fecha != "" && $scope.reporte.hora != "" && $scope.reporte.frecuencia != "") {
          if ($scope.filesArray[0].file.length > 0) {
            $scope.fileToBase64($scope.filesArray[0].file[0].files, $scope.filesArray[0].name, $scope.filesArray[0].ext, $scope.filesArray[0].id);
            setTimeout(function () {
              $scope.respuestaUrl($scope.filesArray[0], "Normas", 0);
            });
          } else {
            $scope.reporte.link_norma_url = "";
          }
          if ($scope.filesArray[1].file.length > 0) {
            $scope.fileToBase64($scope.filesArray[1].file[0].files, $scope.filesArray[1].name, $scope.filesArray[1].ext, $scope.filesArray[1].id);
            setTimeout(function () {
              $scope.respuestaUrl($scope.filesArray[1], "Anexos", 1);
            });
          } else {
            $scope.reporte.link_anexo_url = "";
          }
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          setTimeout(function () {
            $scope.reporte = {
              numero: "0",
              codigo_reporte: $scope.reporte.codigo_reporte,
              fecha_reporte: $scope.formatDate(fecha, 0),
              hora: $scope.reporte.hora,
              dias_notifica: $scope.diasAntes,
              frecuencia: $scope.reporte.frecuencia,
              objetivo: $scope.reporte.objetivo,
              entes: $scope.reporte.entes,
              tipo_norma: $scope.reporte.tipo_norma,
              anno_norma: $scope.reporte.anno_norma,
              norma: $scope.reporte.norma,
              link_norma: $scope.filesArray[0].url,
              link_anexo: $scope.filesArray[1].url,
              tipo_archivo: $scope.reporte.tipo_archivo,
              cant_archivo: $scope.reporte.cant_archivo,
              delimitado: $scope.reporte.delimitado,
              elabora: "0",
              revisa: $scope.reporte.revisa,
              reporta: "0",
              accion: "I",
              link_cargue: "",
              fecha_cargue: "",
              estadop: "A"
            };
            $http({
              method: 'POST',
              url: "php/planeacion/colmena.php",
              data: {
                function: 'insertarReporte',
                json: JSON.stringify($scope.reporte)
              }
            }).then(function (response) {
              if (response.data.Codigo == 0) {
                $scope.closeThisDialog(response.data.Codigo);
                swal('Completado', response.data.Mensaje, 'success');
              } else {
                swal('Mensaje', response.data.mensaje, 'warning');
              };
              setTimeout(() => {
                swal.close();
              }, 300);
            });
          }, 3000);
        } else {
          swal('Campos vacios', 'Por favor, llenar todos los campos obligatorios *', 'warning');
        }
      }
      // Editar
      $scope.editarReporte = function (fecha) {
        console.log($scope.reporte);
        if ($scope.reporte.codigo_reporte != "" && $scope.reporte.objetivo != "" && $scope.reporte.tipo_archivo != "" && $scope.reporte.entes != "" && $scope.reporte.tipo_norma != "" && $scope.reporte.elabora == 0 || $scope.reporte.elabora != "" && $scope.reporte.revisa != "" && $scope.reporte.reporta == 0 || $scope.reporte.reporta != "" && fecha != "" && $scope.reporte.hora != "" && $scope.reporte.frecuencia != "") {
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          if ($scope.filesArray[0].file.length > 0) {
            $scope.fileToBase64($scope.filesArray[0].file[0].files, $scope.filesArray[0].name, $scope.filesArray[0].ext, $scope.filesArray[0].id);
            setTimeout(function () {
              $scope.respuestaUrl($scope.filesArray[0], "Normas", 0);
            });
          } else {
            $scope.reporte.link_norma_url = "";
          }
          if ($scope.filesArray[1].file.length > 0) {
            $scope.fileToBase64($scope.filesArray[1].file[0].files, $scope.filesArray[1].name, $scope.filesArray[1].ext, $scope.filesArray[1].id);
            setTimeout(function () {
              $scope.respuestaUrl($scope.filesArray[1], "Anexos", 1);
            });
          } else {
            $scope.reporte.link_anexo_url = "";
          }
          setTimeout(function () {
            $scope.reporte = {
              numero: $scope.reporte.numero,
              codigo_reporte: $scope.reporte.codigo_reporte,
              fecha_reporte: $scope.formatDate(fecha, 0),
              hora: $scope.reporte.hora,
              dias_notifica: $scope.diasAntes,
              frecuencia: $scope.reporte.frecuencia,
              objetivo: $scope.reporte.objetivo,
              entes: $scope.reporte.entes,
              tipo_norma: $scope.reporte.tipo_norma,
              anno_norma: $scope.reporte.anno_norma,
              norma: $scope.reporte.norma,
              link_norma: ($scope.filesArray[0].url != "" && $scope.filesArray[0].url != undefined && $scope.filesArray[0].url != null) ? $scope.filesArray[0].url : $scope.reporte.link_norma,
              link_anexo: ($scope.filesArray[1].url != "" && $scope.filesArray[1].url != undefined && $scope.filesArray[1].url != null) ? $scope.filesArray[1].url : $scope.reporte.link_anexo,
              tipo_archivo: $scope.reporte.tipo_archivo,
              cant_archivo: $scope.reporte.cant_archivo,
              delimitado: ($scope.reporte.tipo_archivo == 1) ? $scope.reporte.delimitado : "",
              elabora: $scope.reporte.elabora,
              revisa: $scope.reporte.revisa,
              reporta: $scope.reporte.reporta,
              accion: "U",
              link_cargue: "",
              fecha_cargue: "",
              estadop: "A"
            };
            $http({
              method: 'POST',
              url: "php/planeacion/colmena.php",
              data: {
                function: 'insertarReporte',
                json: JSON.stringify($scope.reporte)
              }
            }).then(function (response) {
              if (response.data.Codigo == 0) {
                swal.close();
                $scope.closeThisDialog(response.data.Codigo);
              } else {
                swal('Mensaje', response.data.mensaje, 'warning');
              };
            });
          }, 3000);
        } else {
          swal('Campos vacios', 'Por favor, llenar todos los campos obligatorios *', 'warning');
        }
      }
      // cargar
      $scope.cargarReporte = function (fecha_cargue, numero_reporte) {
        if (fecha_cargue != "" && $scope.reporte.link_cargue != "" && $scope.reporte.link_cargue != null && $scope.filesArray[2].file[0] != undefined) {
          //$scope.fileToBase64($scope.filesArray[2].file[0].files, $scope.filesArray[2].name, $scope.filesArray[2].ext, $scope.filesArray[2].id);
          var promise = getBase64($scope.filesArray[2].file[0].files);
          promise.then(function (result) {
            $scope.filesArray[2].base64 = result;
            $scope.filesArray[2].name = $scope.url_auto($scope.filesArray[2].name);
            if ($scope.filesArray[2].base64 != undefined && $scope.filesArray[2].base64 != '' && $scope.filesArray[2].base64 != null) {
              setTimeout(function () {
                console.log($scope.filesArray);
                $scope.filesArray[2].file = "";
                $scope.respuestaUrl($scope.filesArray[2], "Reportes", 2);
              });
              setTimeout(function () {
                $scope.reporte = {
                  numero: numero_reporte,
                  codigo_reporte: $scope.reporte.codigo_reporte,
                  fecha_reporte: $scope.reporte.fecha_reporte,
                  hora: $scope.reporte.hora,
                  dias_notifica: $scope.diasAntes,
                  frecuencia: $scope.reporte.frecuencia,
                  objetivo: $scope.reporte.objetivo,
                  entes: $scope.reporte.entes,
                  tipo_norma: $scope.reporte.tipo_norma,
                  anno_norma: $scope.reporte.anno_norma,
                  norma: $scope.reporte.norma,
                  link_norma: $scope.reporte.link_norma,
                  link_anexo: $scope.reporte.link_anexo,
                  tipo_archivo: $scope.reporte.tipo_archivo,
                  cant_archivo: $scope.reporte.cant_archivo,
                  delimitado: $scope.reporte.delimitado,
                  elabora: $scope.reporte.elabora,
                  revisa: $scope.reporte.revisa,
                  reporta: $scope.reporte.reporta,
                  accion: "C",
                  link_cargue: $scope.filesArray[2].url,
                  fecha_cargue: $scope.formatDate(fecha_cargue, 0),
                  estadop: ""
                };
                $http({
                  method: 'POST',
                  url: "php/planeacion/colmena.php",
                  data: {
                    function: 'insertarReporte',
                    json: JSON.stringify($scope.reporte)
                  }
                }).then(function (response) {
                  if (response.data.Codigo == 0) {
                    $scope.closeThisDialog(response.data.Codigo);
                    swal('Completado', 'Reporte cargado a la colmena', 'success');
                  } else {
                    swal('Mensaje', response.data.Nombre, 'warning');
                  };
                });
              }, 3000);
            } else {
              swal('Mensaje', 'No se pudo obtener el base64 del file', 'warning');
            }
          });
        } else {
          swal('Campos vacios', 'Por favor, llenar todos los campos obligatorios *', 'warning');
        }
      }
      $scope.getRutaTemp = function (ruta) {
        if (ruta != "" && ruta != null && ruta != undefined && ruta.length > 10) {
          $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: {
              function: 'descargaAdjunto',
              ruta: ruta
            }
          }).then(function (response) {
            window.open("temp/" + response.data);
          });
        } else {
          swal('Url no válida', 'No se encontró ningún archivo', 'warning');
        }
      }
      $scope.loadFile = function (value) {
        $scope.panel.name = $scope.panel.file[0].files[0].name;
        var extencion = $scope.panel.file[0].files[0].name.split(".");
        $scope.panel.ext = extencion[extencion.length - 1];
        $scope.filesArray[value] = { file: $scope.panel.file, name: $scope.panel.name, ext: $scope.panel.ext, id: value };
      }
    }]).directive("selectNgFilel", function () {
      return {
        require: "ngModel",
        link: function postLink($scope, elem, attrs, ngModel) {
          $scope.panel.name = "";
          $scope.panel.ext = "";
          $scope.panel.file = "";
          $scope.filesArray;
          elem.on("change", function (e) {
            var files = elem[0].files;
            var clear = false;
            if ($(this)["0"].files.length > 0) {
              if (files && this.files[0].type == "application/pdf" || this.files[0].type == "application/msword" || this.files[0].type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || this.files[0].type == "application/vnd.ms-excel" || this.files[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || this.files[0].type == "application/x-rar-compressed" || this.files[0].type == "application/octet-stream" || this.files[0].type == "application/zip" || this.files[0].type == "application/octet-stream" || this.files[0].type == "application/x-zip-compressed" || this.files[0].type == "multipart/x-zip") {
                if (this.files[0].size > 7340032) {
                  swal('Advertencia', 'El archivo excede el peso limite (7 MB)', 'warning');
                  clear = true;
                } else {
                  $scope.panel.file = elem;
                  ngModel.$setViewValue(files);
                }
              } else {
                swal('Advertencia', 'El archivo no es un formato valido (PDF, Excel, Word, RAR, ZIP)', 'warning');
                clear = true;
              }
            } else {
              clear = true;
            }
            if (clear) {
              var id = $(this)[0].id;
              $scope.filesArray[id] = { file: "", name: "", ext: "", id: "" };
              $scope.panel.name = "";
              $scope.panel.ext = "";
              $scope.panel.file = "";
              $(this).val("");
            }
            $scope.$apply();
          })
        }
      }
    });