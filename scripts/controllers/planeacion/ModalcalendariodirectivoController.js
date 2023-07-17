'use strict';
angular.module('GenesisApp')
  .controller('ModalcalendariodirectivoController', ['$scope', '$http', 'ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller', '$rootScope', '$window',
    function ($scope, $http, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window) {
      $scope.panel = { file: {}, name: "", ext: "" };
      $scope.filesArray = [{ file: "", base64: "", name: "", ext: "", id: "", url: "" }];
      $scope.select_asistentes = [];
      $scope.asistentes = [];
      $scope.agenda = {
        numero: "",
        tipo: "",
        titulo: "",
        fecha: "",
        descripcion: "",
        hora: "",
        link: "",
        asistentes: "",
        cantidad: "",
        accion: ""
      };
      $scope.obtenerListaTipo = function () {
        $http({
          method: 'POST',
          url: "php/planeacion/calendariodirectivo.php",
          data: {
            function: 'obtenerListaTipo'
          }
        }).then(function (response) {
          $scope.tipo_agenda = response.data;
        })
      }
      $scope.formatDateArray = function (value, tipo) {
        if (value != undefined && value != "") {
          var temp = value.split("-");
          return temp[tipo];
        } else {
          return "";
        }
      }
      $scope.obtenerAsistentes = function (edit = false) {
        $http({
          method: 'POST',
          url: "php/planeacion/calendariodirectivo.php",
          data: {
            function: 'obtenerAsistentes'
          }
        }).then(function (response) {
          $scope.select_asistentes = response.data;
          console.log($scope.select_asistentes);
          var fecha = new Date($scope.año_select, ($scope.mes_num_select - 1), $scope.dia_num_select);
          if (edit) {
            if ($scope.select_asistentes.length > 0 && $scope.asistentes != null && $scope.asistentes.length > 0) {
              $scope.select_asistentes = $scope.select_asistentes.filter(obj => {
                const exists = $scope.asistentes.some(obj2 => (
                  obj.cedula == obj2.cedula
                ));
                if (!exists) {
                  return true;
                }
              });
            } else {
              $scope.asistentes = [];
            }
            $scope.select_asistentes = $scope.select_asistentes.filter(obj => {
              var año_i = $scope.formatDateArray(obj.fecha_inicial, 2);
              var mes_i = $scope.formatDateArray(obj.fecha_inicial, 1);
              var dia_i = $scope.formatDateArray(obj.fecha_inicial, 0);
              var año_f = $scope.formatDateArray(obj.fecha_final, 2);
              var mes_f = $scope.formatDateArray(obj.fecha_final, 1);
              var dia_f = $scope.formatDateArray(obj.fecha_final, 0);
              return obj.fecha_inicial == null && obj.fecha_final == null || new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate()).getTime() < new Date(año_i, (mes_i - 1), dia_i).getTime() || new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate()).getTime() > new Date(año_f, (mes_f - 1), dia_f).getTime();
            });
            console.log($scope.select_asistentes);
          } else {
            $scope.select_asistentes = $scope.select_asistentes.filter(obj => {
              var año_i = $scope.formatDateArray(obj.fecha_inicial, 2);
              var mes_i = $scope.formatDateArray(obj.fecha_inicial, 1);
              var dia_i = $scope.formatDateArray(obj.fecha_inicial, 0);
              var año_f = $scope.formatDateArray(obj.fecha_final, 2);
              var mes_f = $scope.formatDateArray(obj.fecha_final, 1);
              var dia_f = $scope.formatDateArray(obj.fecha_final, 0);
              return obj.fecha_inicial == null && obj.fecha_final == null || new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate()).getTime() < new Date(año_i, (mes_i - 1), dia_i).getTime() || new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate()).getTime() > new Date(año_f, (mes_f - 1), dia_f).getTime();
            });
            console.log($scope.select_asistentes);
          }
        })
      }
      $scope.cambiarVista = function (tipo, detalles = []) {
        $scope.datos.vista = tipo;
        if (tipo == 0 && detalles.length > 0) {
          $scope.titulo = "Vista Previa";
        } else if (tipo == 1 && detalles.length == 0) {
          $scope.titulo = "Crear Agenda";
          $scope.dia_num_select;
          $scope.dia_nombre_select;
          $scope.mes_nombre_select;
          $scope.mes_num_select;
          $scope.año_select;
          $scope.obtenerAsistentes();
          $scope.asistentes = [];
          $scope.agenda_fecha = new Date($scope.año_select, ($scope.mes_num_select - 1), $scope.dia_num_select);
          $scope.agenda = { numero: "", tipo: "", titulo: "", fecha: "", descripcion: "", hora: "", link: "", asistentes: "", accion: "" };
        } else if (tipo == 1 && detalles != "") {
          $scope.titulo = "Editar Agenda";
          $http({
            method: 'POST',
            url: "php/planeacion/calendariodirectivo.php",
            data: {
              function: 'verAgenda',
              numero: detalles
            }
          }).then(function (response) {
            console.log("Ver", response.data);
            $scope.agenda = {
              numero: response.data[0].numero,
              tipo: response.data[0].codigo,
              titulo: response.data[0].titulo,
              descripcion: response.data[0].descripcion,
              hora: response.data[0].hora,
              link: response.data[0].link,
            };
            $scope.obtenerAsistentes(true);
            $scope.asistentes = (response.data[0].asistentes != null) ? response.data[0].asistentes : [];
            $scope.agenda_fecha = new Date($scope.año_select, ($scope.mes_num_select - 1), $scope.dia_num_select);
          });
        } else if (tipo == 2 && detalles != "") {
          $scope.titulo = "Ver Agenda";
          $http({
            method: 'POST',
            url: "php/planeacion/calendariodirectivo.php",
            data: {
              function: 'verAgenda',
              numero: detalles
            }
          }).then(function (response) {
            console.log(response.data);
            $scope.agenda_data = response.data;
          });
        }
      }
      $scope.asistentesChange = function (list_add, value, list_delete) {
        if ($scope[list_delete].length > 0) {
          $scope[list_add].push(value);
          $scope[list_delete] = $scope[list_delete].filter(function (ele) {
            return ele.cedula != value.cedula;
          });
        }
      }
      $scope.modalClose = function () {
        $scope.closeThisDialog();
      }
      $scope.guardarAgenda = function (fecha) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        if ($scope.filesArray[0].file.length > 0) {
          var promise = getBase64($scope.filesArray[0].file[0].files);
          promise.then(function (result) {
            $scope.filesArray[0].base64 = result;
            $scope.filesArray[0].name = $scope.url_auto($scope.filesArray[0].name);
            if ($scope.filesArray[0].base64 != undefined && $scope.filesArray[0].base64 != '' && $scope.filesArray[0].base64 != null) {
              setTimeout(function () {
                $scope.filesArray[0].file = "";
                $scope.respuestaUrl($scope.filesArray[0], "Soportes", 0);
              });
            } else {
              swal('Mensaje', 'No se pudo obtener el base64 del soporte', 'warning');
            }
          });
        } else {
          $scope.filesArray[0].url = ($scope.agenda.link != null && $scope.agenda.link != "" && $scope.agenda.link != undefined) ? $scope.agenda.link : "";
        }
        var tempAsis = [];
        if ($scope.asistentes != null && $scope.asistentes.length > 0) {
          $scope.asistentes.forEach(element => {
            tempAsis.push({ "numero": element.cedula });
          });
        } else {
          $scope.asistentes = [];
        }
        setTimeout(function () {
          $scope.agenda = {
            numero: $scope.agenda.numero,
            tipo: $scope.agenda.tipo,
            titulo: $scope.agenda.titulo,
            fecha: $scope.formatDate(fecha, 0),
            descripcion: $scope.agenda.descripcion,
            hora: $scope.agenda.hora,
            link: $scope.filesArray[0].url,
            asistentes: { cedulas: tempAsis },
            cantidad: tempAsis.length,
            accion: ($scope.agenda.numero == "") ? "I" : "U"
          };
          setTimeout(() => {
            console.log($scope.agenda);
          }, 100);
          if ($scope.agenda.tipo != "" && $scope.agenda.titulo != "" && $scope.agenda.fecha != "" && $scope.agenda.descripcion != "" && $scope.agenda.hora != "" && $scope.agenda.asistentes.cedulas.length > 0 && $scope.agenda.cantidad > 0 && $scope.agenda.accion != "") {
            $http({
              method: 'POST',
              url: "php/planeacion/calendariodirectivo.php",
              data: {
                function: 'accion_Agenda',
                json: JSON.stringify($scope.agenda)
              }
            }).then(function (response) {
              console.log(response);
              if (response.data.Codigo == 0) {
                $scope.closeThisDialog(response.data.Codigo);
              } else {
                swal('Mensaje', "Error", 'warning');
              };
              swal.close();
            });
          } else {
            swal.close();
            swal('Campos vacios', 'Por favor, llenar todos los campos obligatorios *', 'warning');
          }
        }, 2000);
      }
      $scope.borrarAgenda = function (numero) {
        swal({
          title: 'Confirmar Proceso',
          text: "¿Desea eliminar la agenda #" + numero + " ?",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar'
        }).then(function (result) {
          if (result) {
            $scope.agenda = {
              numero: numero,
              tipo: "",
              titulo: "",
              fecha: "",
              descripcion: "",
              hora: "",
              link: "",
              asistentes: "",
              cantidad: "",
              accion: "D"
            };
            $http({
              method: 'POST',
              url: "php/planeacion/calendariodirectivo.php",
              data: {
                function: 'accion_Agenda',
                json: JSON.stringify($scope.agenda)
              }
            }).then(function (response) {
              if (response.data.Codigo == 0) {
                swal('Completado', response.data.Mensaje, 'success');
                $scope.closeThisDialog(response.data.Codigo);
              } else {
                swal('Mensaje', response.data.mensaje, 'warning');
              };
            });
          } else {
            swal('Mensaje', response.data.mensaje, 'warning');
          };
        }).catch(swal.noop);
      }
      $scope.minF = "";
      $scope.actulizarFfin = function (date) {
        var fechaV = new Date(date.getDate(), date.getDate(), (date.getMonth() + 1));
        var dia = fechaV.getDate();
        var mes = fechaV.getMonth();
        var año = fechaV.getFullYear();
        if ($scope.id != null && $scope.id != "") {
          // editar
          $scope.minF = new Date(año, (mes - 1), dia + 1).toISOString().substring(0, 10);
        } else {
          // agregar
          $scope.minF = new Date(año, (mes - 1), dia + 1).toISOString().substring(0, 10);
        }
        $scope.ffin = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 15);
      }
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
      $scope.guardarVacaciones = function (inicio, fin) {
        $scope.vacaciones_datos = {
          numero: $scope.vacaciones_datos.numero,
          finicial: $scope.formatDate(inicio, 0),
          ffinal: $scope.formatDate(fin, 0),
          documento: $scope.vacaciones_datos.documento,
          nombre: $scope.vacaciones_datos.nombre,
          accion: ($scope.id == null) ? "I" : "U"
        };
        if ($scope.vacaciones_datos.finicial != "" && $scope.vacaciones_datos.ffinal != "" && $scope.vacaciones_datos.documento != "" && $scope.vacaciones_datos.accion != "") {
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
            url: "php/planeacion/calendariodirectivo.php",
            data: {
              function: 'accion_Vacaciones',
              json: JSON.stringify($scope.vacaciones_datos)
            }
          }).then(function (response) {
            if (response.data.Codigo == 0) {
              $scope.closeThisDialog(response.data.Codigo);
            } else {
              swal('Mensaje', "Error", 'warning');
            };
            swal.close();
          });
        } else {
          swal('Campos vacios', 'Por favor, llenar todos los campos obligatorios *', 'warning');
        }
      }
      // Modal Agenda/Vacaciones
      if ($scope.tipo == false) {
        $scope.obtenerListaTipo();
        $scope.datos = { vista: null };
        $scope.titulo = "";
        $scope.cambiarVista($scope.tipoVista, $scope.id_detalles);
      } else {
        $scope.vacaciones_datos = {
          numero: "",
          finicial: "",
          ffinal: "",
          documento: "",
          nombre: "",
          accion: ""
        };
        $scope.datos = { vista: $scope.tipoVista };
        if ($scope.id != null && $scope.id != "") {
          $scope.vacaciones_datos = {
            numero: $scope.id,
            finicial: "",
            ffinal: "",
            documento: $scope.documento,
            nombre: $scope.nombre,
            accion: ""
          };
          $scope.finicio = new Date($scope.formatDateArray($scope.fechaInicio, 4), ($scope.formatDateArray($scope.fechaInicio, 3) - 1), $scope.formatDateArray($scope.fechaInicio, 1));
          $scope.actulizarFfin($scope.finicio);
          $scope.ffin = new Date($scope.formatDateArray($scope.fechaFin, 4), ($scope.formatDateArray($scope.fechaFin, 3) - 1), $scope.formatDateArray($scope.fechaFin, 1));
          $scope.titulo = "Editar Vacaciones";
        } else {
          $scope.obtenerAsistentes();
          $scope.finicio = new Date();
          $scope.actulizarFfin($scope.finicio);
          $scope.titulo = "Agregar Vacaciones";
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
      function getBase64(file) {
        return new Promise(function (resolve, reject) {
          var reader = new FileReader();
          reader.onload = function () { resolve(reader.result); };
          reader.onerror = reject;
          reader.readAsDataURL(file[0]);
        });
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
      $scope.respuestaUrl = function (element, location = "Soportes", id) {
        $http({
          method: 'POST',
          url: "php/planeacion/calendariodirectivo.php",
          data: {
            function: 'reporteFileUrl',
            file: JSON.stringify(element),
            location: JSON.stringify(location)
          }
        }).then(function (response) {
          $scope.filesArray[id].url = response.data.url;
        });
      }
      $scope.loadFile = function (value) {
        $scope.panel.name = $scope.panel.file[0].files[0].name;
        var extencion = $scope.panel.file[0].files[0].name.split(".");
        $scope.panel.ext = extencion[extencion.length - 1];
        $scope.filesArray[value] = { file: $scope.panel.file, name: $scope.panel.name, ext: $scope.panel.ext, id: value, url: "" };
      }
    }]).directive("selectNgSoporte", function () {
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
                swal('Advertencia', 'El archivo no es un formato valido (PDF, Excel, Word, Zip, Rar)', 'warning');
                clear = true;
              }
            } else {
              clear = true;
            }
            if (clear) {
              var id = $(this)[0].id;
              $scope.filesArray[id] = { file: "", name: "", ext: "", id: "", url: "" };
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