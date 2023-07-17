'use strict';
angular.module('GenesisApp')
  .controller('validadorgrController', ['$scope', '$http', '$filter',
    function ($scope, $http, $filter) {
      // ******* FUNCTION DE INICIO *******
      $scope.Inicio = function () {
        $scope.SysDay = new Date();
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.responsable = sessionStorage.getItem('cedula');
        $scope.limpiar('1');
        $scope.limpiar('2');
        $scope.limpiar('3');
        $scope.limpiar('4');
        $scope.histo_pacientes_inasistentes_3Meses();
        $scope.histo_pacientes_Fallecidos();
        $scope.histo_pacientes_mismo_Documento();
        $('.modal').modal();
        $scope.list_DatosTemp = [];
        //TABLA
        $scope.Filtrar_Sol = 10;
        $scope.Vista1 = {
          Mostrar_Sol: 10
        };
      }
      $scope.limpiar = function (datos) {
        $scope.arrlist[0].checked = false;
        $scope.arrlist[1].checked = false;
        $scope.arrlist[2].checked = false;
        switch (datos) {
          case '1':
            $scope.consulta = {
              tipoDocumento: '',
              numeroDocumento: '',
              archivo: '',
              tipodocumentoConsulta: '',
              numerodocumentoConsulta: ''
            }
            break;
          case '2':
            $scope.form3 = {
              fechaaExportar: '',
            }
          case '3':
            $scope.form4 = {
              tipodeConsulta: '',
              nomprePrestador: '',
              codigo: '',
              regional: '',
              fechainicioReporte: '',
              fechafinalReporte: ''
            }
            break;
          case '4':
            $scope.form2 = {
              fechadeControl: '',

            }
            break;
          default:
        }
      }
      // Array de patoligias en los checked
      $scope.arrlist = [
        {
          userid: 1,
          name: "Hipertension",
          checked: false
        }, {
          userid: 2,
          name: "Diabetico",
          checked: false
        }, {
          userid: 3,
          name: "Renal cronica",
          checked: false
        }
      ];
      $scope.setFocus = function (ubicacion) {
        if (ubicacion == 1) {
          document.getElementById("Var_Seccional_Filtrar_Sol").focus();
        } else if (ubicacion == 5) {
          document.getElementById("Filtro_pacientes_sin_soportes").focus();
        } else if (ubicacion == 7) {
          document.getElementById("fechadeControl").focus();
        }
      }
      $scope.Ver_vistas_Formularios = function (datos) {
        $scope.activarVista = datos;
        console.log($scope.activarVista);
        if ($scope.activarVista == '1') {
          $scope.historicos_de_Prestadores();
          $scope.verafiliadosatenxvariosprest = true;
          $scope.verformulariodePatologia = false;
          $scope.verexportarConsolidado = false;
          $scope.verformularioControl = false;
          $scope.verafiliadoscargadosenlamalla = false;
          $scope.Vista1.Filtrar_tprincipal = '';
          setTimeout(() => {
            $scope.setFocus('1');
            $scope.apply(); ''
          }, 1000);
        } else if ($scope.activarVista == '2') {
          $scope.verafiliadosatenxvariosprest = false;
        } else if ($scope.activarVista == '3') {
          $scope.verformulariodePatologia = true;
          $scope.verafiliadosatenxvariosprest = false;
          $scope.verexportarConsolidado = false;
          $scope.verformularioControl = false;
          $scope.verafiliadoscargadosenlamalla = false;
          $scope.limpiar('3');
        } else if ($scope.activarVista == '4') {
          $scope.verformulariodePatologia = false;
        } else if ($scope.activarVista == '5') {
          $scope.listar_pacientes_de_la_Malla();
          $scope.verafiliadoscargadosenlamalla = true;
          $scope.verformularioControl = false;
          $scope.verexportarConsolidado = false;
          $scope.verformulariodePatologia = false;
          $scope.verafiliadosatenxvariosprest = false;
          $scope.Vista1.Filtrar_tprincipal = '';
          setTimeout(() => {
            $scope.setFocus('5');
            $scope.apply();
          }, 1000);
        } else if ($scope.activarVista == '6') {
          $scope.verafiliadoscargadosenlamalla = false;
        } else if ($scope.activarVista == '7') {
          $scope.obternerfechadeCorte();
          $scope.verformularioControl = true;
          $scope.verexportarConsolidado = false;
          $scope.verformulariodePatologia = false;
          $scope.verafiliadosatenxvariosprest = false;
          $scope.verafiliadoscargadosenlamalla = false;
          $scope.limpiar('4');
          setTimeout(() => {
            $scope.setFocus('7');
            $scope.apply(); ''
          }, 1000);
        } else if ($scope.activarVista == '8') {
          $scope.verformularioControl = false;
        } else if ($scope.activarVista == '9') {
          swal({
            type: "Atencion",
            title: "Tener presente que debe ingresar la fecha a exportar en el formulario",
            type: "warning",
            showCancelButton: true,
            showConfirmButton: true,
          }).then(() => {
            fechaaExportar.focus();
          });
          $scope.verexportarConsolidado = true;
          $scope.verformulariodePatologia = false;
          $scope.verafiliadosatenxvariosprest = false;
          $scope.verformularioControl = false;
          $scope.verafiliadoscargadosenlamalla = false;
          $scope.limpiar('2');
        } else if ($scope.activarVista == '10') {
          $scope.verexportarConsolidado = false;

        } else if ($scope.activarVista == '11') {
          swal({
            type: "Atencion",
            title:"Nos encontramos en proceso de construccion",
            type: "warning",
            showCancelButton: true,
            showConfirmButton: true,
          }).then(() => {
            $scope.Inicio();
          });
        }
      }
      $scope.listar_pacientes_de_la_Malla = function () {
        $scope.list_DatosTemp = [];
        $scope.Vista1_datos = [];
        $http({
          method: 'POST',
          url: "php/gestionriesgo/validadorgr.php",
          data: {
            function: 'listarpacientesdelaMalla',
          }
        }).then(function ({ data }) {
          console.log(data);
          if (data && data.toString().substr(0, 3) != '<br') {
            $scope.list_DatosTemp = data;
            $scope.Vista1_datos = data;
            $scope.initPaginacion(data);
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.obternerfechadeCorte = function () {
        $http({
          method: 'POST',
          url: "php/gestionriesgo/validadorgr.php",
          data: {
            function: 'mostrarfechadeCorte',
          }
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != '<br') {
            $scope.fechadeCorte = $scope.formatDatefecha(data.Nombre);
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.listar_filtros_de_Patologia = function (consult) {
        if (consult == '') {
          swal({
            title: "¡Alerta¡",
            text: 'Por favor, seleccione el tipo de consulta',
            type: "warning"
          }).catch(swal.noop);
          return
        } else {
          if (consult == 'PT') {
            $scope.vistanombreConsulta = "prestador";
            if ($scope.form4.codigo == '' || $scope.form4.codigo == undefined || $scope.form4.fechainicioReporte == '' || $scope.form4.fechafinalReporte == '') {
              swal({
                title: "¡Alerta¡",
                text: 'No se permite generar sin ingresar el codigo y la fecha inicio y final',
                type: "warning"
              }).catch(swal.noop);
              return
            } else {
              $http({
                method: 'POST',
                url: "php/gestionriesgo/validadorgr.php",
                data: {
                  function: 'listarfiltrosdePatologia',
                  v_pcaso: $scope.form4.tipodeConsulta,
                  vpfinicio: $scope.formatDatefecha($scope.form4.fechainicioReporte),
                  vpfin: $scope.formatDatefecha($scope.form4.fechafinalReporte),
                  vpvalorbusqueda: $scope.form4.regional || $scope.form4.codigo,
                  vpchk18: $scope.arrlist[0].checked ? 1 : 0,
                  vpchk20: $scope.arrlist[1].checked ? 1 : 0,
                  vpchk38: $scope.arrlist[2].checked ? 1 : 0
                }
              }).then(function ({ data }) {
                if (data && data.toString().substr(0, 3) != '<br') {
                  $scope.listadesoportedepatoligias = data;
                  console.log($scope.listadesoportedepatoligias);
                  $("#modalsoportesporpatologia").modal("open");
                  $scope.limpiar('3');
                  $scope.verformularioControl = false;
                } else {
                  swal({
                    title: "¡Ocurrio un error!",
                    text: data,
                    type: "warning"
                  }).catch(swal.noop);
                }
              });
            }
          }
          if (consult == 'RG') {
            $scope.vistanombreConsulta = "regional";
            if ($scope.form4.regional == '' || $scope.form4.fechainicioReporte == '' || $scope.form4.fechafinalReporte == '') {
              swal({
                title: "¡Alerta¡",
                text: 'No se permite generar sin ingresar la regional y la fecha inicio y final',
                type: "warning"
              }).catch(swal.noop);
              return
            } else {
              $http({
                method: 'POST',
                url: "php/gestionriesgo/validadorgr.php",
                data: {
                  function: 'listarfiltrosdePatologia',
                  v_pcaso: $scope.form4.tipodeConsulta,
                  vpfinicio: $scope.formatDatefecha($scope.form4.fechainicioReporte),
                  vpfin: $scope.formatDatefecha($scope.form4.fechafinalReporte),
                  vpvalorbusqueda: $scope.form4.regional || $scope.form4.codigo,
                  vpchk18: $scope.arrlist[0].checked ? 1 : 0,
                  vpchk20: $scope.arrlist[1].checked ? 1 : 0,
                  vpchk38: $scope.arrlist[2].checked ? 1 : 0
                }
              }).then(function ({ data }) {
                if (data && data.toString().substr(0, 3) != '<br') {
                  $scope.listadesoportedepatoligias = data;
                  console.log($scope.listadesoportedepatoligias);
                  $("#modalsoportesporpatologia").modal("open");
                  $scope.limpiar('3');
                  $scope.verformularioControl = false;
                } else {
                  swal({
                    title: "¡Ocurrio un error!",
                    text: data,
                    type: "warning"
                  }).catch(swal.noop);
                }
              });
            }
          }
          if (consult == 'PG') {
            $scope.vistanombreConsulta = "patologia";
            if ($scope.arrlist[0].checked == false && $scope.arrlist[1].checked == false && $scope.arrlist[2].checked == false) {
              swal({
                title: "¡Alerta¡",
                text: 'Por favor, elija al menos una patologia en los check',
                type: "warning"
              }).catch(swal.noop);
              return
            } else {
              if ($scope.form4.fechainicioReporte == '' || $scope.form4.fechafinalReporte == '') {
                swal({
                  title: "¡Alerta¡",
                  text: 'Por favor ingrese fecha de inicio y final',
                  type: "warning"
                }).catch(swal.noop);
                return
              } else {
                $http({
                  method: 'POST',
                  url: "php/gestionriesgo/validadorgr.php",
                  data: {
                    function: 'listarfiltrosdePatologia',
                    vpcaso: $scope.form4.tipodeConsulta,
                    vpfinicio: $scope.formatDatefecha($scope.form4.fechainicioReporte),
                    vpfin: $scope.formatDatefecha($scope.form4.fechafinalReporte),
                    vpvalorbusqueda: $scope.form4.regional || $scope.form4.codigo,
                    vpchk18: $scope.arrlist[0].checked ? 1 : 0,
                    vpchk20: $scope.arrlist[1].checked ? 1 : 0,
                    vpchk38: $scope.arrlist[2].checked ? 1 : 0
                  }
                }).then(function ({ data }) {
                  if (data && data.toString().substr(0, 3) != '<br') {
                    $scope.listadesoportedepatoligias = data;
                    $("#modalsoportesporpatologia").modal("open");
                    $scope.limpiar('3');
                    $scope.verformularioControl = false;
                  } else {
                    swal({
                      title: "¡Ocurrio un error!",
                      text: data,
                      type: "warning"
                    }).catch(swal.noop);
                  }
                });
              }
            }
          }
        }
      }
      $scope.actualiza_fecha_de_Corte = function () {
        if ($scope.form2.fechadeControl == '') {
          swal({
            title: "¡Alerta¡",
            text: 'No se permite actulizar sin ingresar una fecha',
            type: "warning"
          }).catch(swal.noop);
        } else {
          $http({
            method: 'POST',
            url: "php/gestionriesgo/validadorgr.php",
            data: {
              function: 'actualizafechadeCorte',
              vpfecha: $scope.formatDatefecha($scope.form2.fechadeControl),
            }
          }).then(function ({ data }) {
            if (data && data.toString().substr(0, 3) != '<br') {
              swal({
                title: "Actualizacion",
                text: data.Nombre,
                type: "success",
              }).catch(swal.noop);
              $scope.limpiar('4');
              $scope.verformularioControl = false;

            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: data,
                type: "warning"
              }).catch(swal.noop);
            }
          });
        }
      }
      $scope.historicos_de_Prestadores = function () {
        $scope.list_DatosTemp = [];
        $scope.Vista1_datos = [];
        $http({
          method: 'POST',
          url: "php/gestionriesgo/validadorgr.php",
          data: {
            function: 'historicosdePrestadores',
          }
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != '<br') {
            $scope.list_DatosTemp = data;
            $scope.Vista1_datos = data;
            $scope.initPaginacion(data);

          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.histo_pacientes_inasistentes_3Meses = function () {
        $http({
          method: 'POST',
          url: "php/gestionriesgo/validadorgr.php",
          data: {
            function: 'histopacientesinasistentes3Meses',
          }
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != '<br') {
            $scope.list_pacientes_inasistente3meses = data;
            $scope.cont_histo_pacientes_inasistentes_3Meses = data.length;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.histo_pacientes_mismo_Documento = function () {
        $http({
          method: 'POST',
          url: "php/gestionriesgo/validadorgr.php",
          data: {
            function: 'histopacientesMismodocumento',
          }
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != '<br') {
            $scope.cont_list_pacientes_mismo_documento = data.length;
            $scope.list_pacientes_mismo_documento = data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.histo_pacientes_Fallecidos = function () {
        $http({
          method: 'POST',
          url: "php/gestionriesgo/validadorgr.php",
          data: {
            function: 'histopacientesFallecidos',
          }
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != '<br') {
            $scope.list_pacientes_fellecidos = data;
            $scope.cont_list_pacientes_fellecidos = data.length;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      // Descarga_afiliados_atendidos_varios_prestadores
      $scope.descarga_afi_atendidos_var_prestadores = function (info, validacion) {
        console.log(info);
        $scope.tdocumento = info.EGRC_TIPO_DOC;
        $scope.ndocumento = info.EGRC_DOCUEMNTO_AFIL;
        console.log($scope.tdocumento);
        console.log($scope.ndocumento);
        if (validacion != 1) {
          console.log(info);
          $scope.resumen_descarga_afi_atendidos_var_prestadores = info.length;
          console.log($scope.datos_descarga_afi_atendidos_var_prestadores);
          if ($scope.resumen_descarga_afi_atendidos_var_prestadores > '0') {
            // console.log($scope.F_Inicio)
            window.open(
              'views/gestionriesgo/formatos/descarga_resumen_afi_atendidos_var_prestadores.php?vptipodoc=' + $scope.tdocumento + '&vpdocmento=' + $scope.ndocumento,
              "_blank",
              "width=900,height=1100"
            );
          } else {
            swal({
              type: "error",
              title: "No se puede descargar informacion sin datos en la tabla",
              showConfirmButton: false,
              timer: 2500,
            });
          }
        } else {
          console.log(info);
          $scope.datos_descarga_afi_atendidos_var_prestadores = info.length;
          console.log($scope.datos_descarga_afi_atendidos_var_prestadores);
          if ($scope.datos_descarga_afi_atendidos_var_prestadores > '0') {
            // console.log($scope.F_Inicio)
            window.open(
              "views/gestionriesgo/formatos/descarga_afi_atendidos_var_prestadores.php",
              "_blank",
              "width=900,height=1100"
            );
          } else {
            swal({
              type: "error",
              title: "No se puede descargar informacion sin datos en la tabla",
              showConfirmButton: false,
              timer: 2500,
            });
          }
        }
      }

      $scope.descarga_afi_atendidos_var_prestadores = function (info) {
        $scope.datos_descarga_afi_atendidos_var_prestadores = info.length;
        if ($scope.datos_descarga_afi_atendidos_var_prestadores > '0') {
          window.open(
            "views/gestionriesgo/formatos/descarga_afi_atendidos_var_prestadores.php",
            "_blank",
            "width=900,height=1100"
          );
        } else {
          swal({
            type: "error",
            title: "No se puede descargar informacion sin datos en la tabla",
            showConfirmButton: false,
            timer: 2500,
          });
        }
      }

      $scope.descarga_malla_sin_soporte = function (info) {
        $scope.datosMalla = info.length;
        console.log($scope.datosMalla);
        if ($scope.datosMalla > '0') {
          // console.log($scope.F_Inicio)
          window.open(
            "views/gestionriesgo/formatos/descarga_pacientes_cargados_sin_soportes.php",
            "_blank",
            "width=900,height=1100"
          );
        } else {
          swal({
            type: "error",
            title: "No se puede descargar informacion sin datos en la tabla",
            showConfirmButton: false,
            timer: 2500,
          });
        }
      }
      $scope.exportarReporte = function () {
        if (
          $scope.form3.fechaaExportar != ""
        ) {
          // console.log($scope.F_Inicio)
          var F_de_Exportacion = $scope.formatDatefecha($scope.form3.fechaaExportar);
          window.open(
            "views/gestionriesgo/formatos/formato_exportar_consolidado.php?F_de_Exportacion=" +
            F_de_Exportacion,
            "_blank",
            "width=900,height=1100"
          );
        } else {
          swal({
            type: "error",
            title: "Por favor ingrese fecha a exportar",
            showConfirmButton: false,
            timer: 2500,
          });
        }
      }
      $scope.openmodals = function (tipo, info) {
        $scope.busquedaInasistentes = '';
        $scope.busquedaDuplicado = '';
        $scope.busquedaFallecidos = '';
        // console.log(tipo);
        // console.log(info);
        switch (tipo) {
          case 'pacientescondobleAtencion':
            $scope.reportedeatencion(info);
            $("#modalpacientescondobleAtencion").modal("open");
            setTimeout(() => {
              $('#modalpacientescondobleAtencion').focus();
            }, 100);
            break;
          case 'exportarConsolidado':
            $("#modalexportarConsolidado").modal("open");
            setTimeout(() => {
              $('#modalexportarConsolidado').focus();
            }, 100);
            break;
          case 'pacientesInasistentes':
            $("#modalpacientesInasistentes").modal("open");
            setTimeout(() => {
              $('#modalpacientesInasistentes').focus();
            }, 100);
            break;
          case 'pacientesDuplicados':
            $("#modalpacientesDuplicados").modal("open");
            setTimeout(() => {
              $('#modalpacientesDuplicados').focus();
            }, 100);
            break;
          case 'pacientesFallecidos':
            $("#modalpacientesFallecidos").modal("open");
            setTimeout(() => {
              $('#modalpacientesFallecidos').focus();
            }, 100);
            break;
          case 'soportesporpatologia':
            $("#modalsoportesporpatologia").modal("open");
            setTimeout(() => {
              $('#modalsoportesporpatologia').focus();
            }, 100);
            break;
          default:
        }
      }
      $scope.closemodals = function (tipo) {
        switch (tipo) {
          case 'pacientescondobleAtencion':
            $("#modalpacientescondobleAtencion").modal("close");
            break;
          case 'exportarConsolidado':
            $("#modalexportarConsolidado").modal("close");
            break;
          case 'modalDetalles':
            $("#modalDetalles").modal("close");
            break;
          case 'pacientesInasistentes':
            $("#modalpacientesInasistentes").modal("close");
            break;
          case 'pacientesDuplicados':
            $("#modalpacientesDuplicados").modal("close");
            break;
          case 'pacientesFallecidos':
            $("#modalpacientesFallecidos").modal("close");
            break;
          case 'soportesporpatologia':
            $("#modalsoportesporpatologia").modal("close");
            break;
          default:
        }
      }
      $scope.reportedeatencion = function (info) {
        $scope.list_de_prestadores_Reportados = [];
        $scope.tipodocPacientes = info[0].EGRC_TIPO_DOC;
        $scope.numerodocPacientes = info[0].EGRC_DOCUEMNTO_AFIL;
        $http({
          method: 'POST',
          url: "php/gestionriesgo/validadorgr.php",
          data: {
            function: 'reporte_de_atencion',
            vptipodoc: $scope.tipodocPacientes,
            vpdocmento: $scope.numerodocPacientes
          }
        }).then(function ({ data }) {

          if (data && data.toString().substr(0, 3) != '<br') {
            $scope.list_de_prestadores_Reportados = data;
            console.log($scope.list_de_prestadores_Reportados);
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.resumen_var_prestadores = function (info) {
        $scope.resumen_descarga_afi_atendidos_var_prestadores = info.length;
        console.log($scope.resumen_descarga_afi_atendidos_var_prestadores);
        if ($scope.resumen_descarga_afi_atendidos_var_prestadores > 0) {
          window.open(
            'views/gestionriesgo/formatos/descarga_resumen_afi_atendidos_var_prestadores.php',
            "_blank",
            "width=900,height=1100"
          );
          $("#modalpacientescondobleAtencion").modal("close");
        } else {
          swal({
            type: "error",
            title: "No se puede descargar informacion sin datos en la tabla",
            showConfirmButton: false,
            timer: 2500,
          });
        }
      }
      $scope.apply = function () {
        setTimeout(() => { $scope.$apply(); }, 500);
      }
      // Este codigo sirve para tener un input tipo fecha que solo permita escoger el dia actual
      $scope.formatDatefecha = function (date) {
        var d = new Date(date);
        var dd = ("0" + d.getDate()).slice(-2);
        var mm = ("0" + (d.getMonth() + 1)).slice(-2);
        var yyyy = d.getFullYear();
        return dd + "/" + mm + "/" + yyyy;
      };
      $scope.formatDatehora = function (date) {
        console.log(date);
        var x = document.getElementById("myTime").value;
        console.log(x);
      };
      $scope.formatTelefono = function (form, variable) {
        if ($scope[form][variable]) {
          const valor = $scope[form][variable].toString().replace(/[^0-9]/g, '');// (564) 564 - 4564
          $scope[form][variable] = valor;
          const input = $scope[form][variable].toString().replace(/\D/g, '').substring(0, 10); // 1234567890
          const zip = input.substring(0, 3);//123
          const middle = input.substring(3, 6);//456
          const last = input.substring(6, 10);//7890
          if (input.length > 6) { $scope[form][variable] = `(${zip}) ${middle} - ${last}`; }
          else if (input.length > 3) { $scope[form][variable] = `(${zip}) ${middle}`; }
          else if (input.length > 0) { $scope[form][variable] = `(${zip}`; }
          if (input.length >= 2 && zip.substring(0, 2).toString() != '60') {
            swal('Mensaje', 'El teléfono debe contener la siguiente estructura: (60) + el indicativo de la ciudad + el número del teléfono', 'info').catch(swal.noop);
          }
        } else { $scope[form][variable] = ''; }
      }
      $scope.FormatSoloNumero = function (NID) {
        const input = document.getElementById("" + NID + "");
        var valor = input.value;
        valor = valor.replace(/[^0-9]/g, "");
        input.value = valor;
      }
      $scope.formatTexto = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/[|!¿¡?°"#/()=$%&''´¨´¨¨¨<>]/g, '');
        valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
        input.value = valor.toString().toUpperCase();
      }
      $scope.chg_filtrar = function (varFiltro) {
        console.log(varFiltro);
        if ($scope.Vista1[varFiltro] == '' || $scope.Vista1[varFiltro] == undefined) {
          swal({
            title: "Notificación",
            text: 'Por favor digite que desea buscar..',
            type: "warning"
          }).catch(swal.noop);
          $scope.Vista1[varFiltro] = '';
        } else {
          // console.log(varFiltro);
          $scope.list_DatosTemp = $filter('filter')($scope.Vista1_datos, $scope.Vista1[varFiltro]);
          $scope.configPages();
          varFiltro = '';
          $scope.filtrar_atendidos_varios_Prestadores = '';
          $scope.Filtro_pacientes_sin_soportes = '';
        }

      }
      $scope.initPaginacion = function (info) {
        $scope.list_DatosTemp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.configPages();
        $scope.Vista1.Mostrar_Sol = 10;
      }
      $scope.initPaginacion2 = function (valor) {
        $scope.currentPage = 0;
        if (valor == 0) {
          $scope.pageSize = $scope.list_DatosTemp.length;
          $scope.valmaxpag = $scope.list_DatosTemp.length;
        } else {
          $scope.pageSize = valor;
          $scope.valmaxpag = valor;
        }
        $scope.pages = [];
        $scope.configPages();
      }
      $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (Math.ceil($scope.list_DatosTemp.length / $scope.pageSize) > $scope.valmaxpag) {
            if (($scope.pageSize * 10) < $scope.list_DatosTemp.length) {
              fin = 10;
            } else {
              fin = Math.ceil($scope.list_DatosTemp.length / $scope.pageSize);
            }
          }
          else { fin = Math.ceil($scope.list_DatosTemp.length / $scope.pageSize); }
        } else {
          if (ini >= Math.ceil($scope.list_DatosTemp.length / $scope.pageSize) - $scope.valmaxpag) {
            ini = Math.ceil($scope.list_DatosTemp.length / $scope.pageSize) - $scope.valmaxpag;
            fin = Math.ceil($scope.list_DatosTemp.length / $scope.pageSize);
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
        if ($scope.list_DatosTemp.length % $scope.pageSize == 0) {
          var tamanomax = parseInt($scope.list_DatosTemp.length / $scope.pageSize);
        } else {
          var tamanomax = parseInt($scope.list_DatosTemp.length / $scope.pageSize) + 1;
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
          if ($scope.list_DatosTemp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt($scope.list_DatosTemp.length / $scope.pageSize);
          } else {
            var tamanomax = parseInt($scope.list_DatosTemp.length / $scope.pageSize) + 1;
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
      $scope.obtenerDepartamentos = function () {
        $scope.function = 'cargadepartamentos';
        $http({
          method: 'POST',
          url: "php/esop/funcesop.php",
          data: { function: $scope.function }
        }).then(function (response) {
          $scope.Departamentos = response.data;
        });
      }
      $scope.obtenerlistaPrestador = function () {
        $http({
          method: 'POST',
          url: "php/gestionriesgo/validadorgr.php",
          data: {
            function: 'obtenerlistaPrestador',
          }
        }).then(function (response) {
          $scope.listaPrestador = response.data;
        });
      }
      // funcion para contar cada caracter de de una observacion
      $scope.handleKeyPress = function (e, form) {
        // console.log(e, form);
        if ($scope[form].observaciones == null || $scope[form].observaciones == undefined || $scope[form].observaciones == '') { $scope.count = 0; }
        if ($scope[form].observaciones.length < $scope.count) { $scope.count = $scope[form].observaciones.length }
        else ($scope[form].observaciones.length > $scope.count)
        { $scope.count = $scope[form].observaciones.length }
        if (e.keyCode == 8) {
          if ($scope.count == 0) {
            $scope.count = 0;
          }
          else {
            $scope.count = $scope.count - 1;
          }
        } else {
          $scope.count = $scope.count + 1;
        }
      }
      if (document.readyState !== 'loading') {
        $scope.Inicio();
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }
      $(document).ready(function () {
        $('.tooltipped').tooltip({ delay: 50 });
      });
    }])
  .directive('textUpper', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          if (text) {
            var transformedInput = text.toString().toUpperCase();
            if (transformedInput !== text) {
              ngModelCtrl.$setViewValue(transformedInput);
              ngModelCtrl.$render();
            }
            return transformedInput;
          }
          return undefined;
        }
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  }).filter('inicio', function () {
    return function (input, start) {
      if (input != undefined && start != NaN) {
        start = +start;
        return input.slice(start);
      } else {
        return null;
      }
    }
  });
