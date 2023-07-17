"use strict";
angular
  .module("GenesisApp")
  .controller("gestionprescripcioncontroller", [
    "$scope",
    "$http",
    "notification",
    "mipresHTTP",
    "ngDialog",
    "Popeye",
    "$filter",
    function (
      $scope,
      $http,
      notification,
      mipresHTTP,
      ngDialog,
      Popeye,
      $filter
    ) {
      //    AOS.init();
      $scope.tab = 1;
      $scope.activeI = "active final white-text";
      $scope.activeII = "none";
      $scope.activeIII = "none";
      $scope.activeIV = "none";
      $scope.activeIcolor = "foot4";
      $scope.activeIIcolor = "";
      $scope.activeIIIcolor = "";
      $scope.activeIVcolor = "";
      $scope.nametab = "Autorización";

      //   @@@@@@@@@@@@@@@@//YORDIS//@@@@@@@@@@@@@@@@@@
      $scope.Inicio = function () {
        $(".modal").modal();
        $scope.doc = "";
        $scope.no_pres = "";
        $scope.rol = sessionStorage.getItem('cedula');
      };
      //   @@@@@@@@@@@@@@@//FIN//@@@@@@@@@@@@@@@@@@@
      // variables TAB I
      //variables KEVO
      $scope.regimen = "";
      $scope.verMipres = true;
      $scope.verDirxNO = true;
      $scope.listaPRES = [];

      //tabII
      $scope.tipodoc = "";
      $scope.noid = "";
      $scope.regimen = "";

      //secciones de ng hide
      $scope.inactiveseccion1tab1 = false;
      $scope.inactiveseccion2tab1 = true;
      $scope.inactiveseccion4tab4 = false;
      $scope.activetipotabI = true;
      $scope.activetipotabIV = true;
      $scope.productosagregadostabI = [];
      $scope.productosagregadostabIV = [];
      $scope.nofindproductstabI = false;
      $scope.nofindproductstabIV = false;
      $scope.inactimiprestab1 = true;
      $scope.inactimiprestab4 = true;
      $scope.inactivetagmipres = true;
      $scope.inactivetagctc = true;
      $scope.hide_tbl_mipres_doc = true;
      $scope.inactivetagtutela = true;
      $scope.inactivetagsiniestro = true;
      $scope.nameservicio = "de orden";
      $scope.inactivebarrapro = true;
      var objeto_window_referencia;
      var configuracion_ventana =
        "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
      $scope.vw_dir = false;
      $scope.hide_serchdir = function () {
        $scope.vw_dir = !$scope.vw_dir;
        $scope.verMipres = true;
      };
      $scope.init = function () {
        $scope.activeI = "active final";
        $scope.activeII = "none";
        $scope.activeIII = "none";
        $scope.activeIV = "none";
        $scope.activeIcolor = "";
        $scope.activeIIcolor = "";
        $scope.activeIIIcolor = "";
        $scope.activeIVcolor = "";
      };

      $scope.Obtener_Tipos_Documentos = function () {
        $http({
          method: "POST",
          url: "php/genesis/funcgenesis.php",
          data: {
            function: "Obtener_Tipos_Documentos",
            Tipo: "S",
          },
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != "<br") {
            $scope.Tipos_Documentos = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };
      $scope.Obtener_Tipos_Documentos();
      $scope.setTab = function (opcion) {
        if ($scope.verMipres == false) {
          $scope.verMipres = true;
        }

        $scope.init();
        $scope.opcion = opcion;
        switch (opcion) {
          case 1:
            $scope.tab = 1;
            $scope.activeI = "active final white-text";
            $scope.activeII = "none";
            $scope.activeIII = "none";
            $scope.activeIcolor = "foot4";
            $scope.nametab = "Fecha";
            $scope.tipoaut = "1";
            $scope.hide_tbl_mipres_doc = true;
            break;
          case 2:
            $scope.tab = 2;
            $scope.activeI = "none";
            $scope.activeII = "active final white-text";
            $scope.activeIII = "none";
            $scope.activeIIcolor = "foot4";
            $scope.nametab = "Número de Prescripción";
            $scope.titletabII = "Solicitud";
            $scope.tipoaut = "2";
            $scope.hide_tbl_mipres_doc = true;
            break;
          case 3:
            $scope.tab = 3;
            $scope.activeI = "none";
            $scope.activeII = "none";
            $scope.activeIII = "active final white-text";
            $scope.activeIIIcolor = "foot4";
            $scope.nametab = "Documento Afiliado";
            $scope.tipoaut = "3";

            break;
          default:
        }
      };
      $scope.setTab(1);

      $scope.consulta_mipres_afi = function () {
        $http({
          method: "POST",
          url: "php/recobro/mipres.php",
          data: {
            function: "consulta_mipres_afi",
            tipo_doc: $scope.tipodoc,
            doc: $scope.doc,
          },
        }).then(function (r) {
          if (r.data.length > 0) {
            $scope.mipres_documento = r.data;
            $scope.hide_tbl_mipres_doc = false;
          } else {
            swal(
              "Error",
              "No se encontraron MIPRES correspondientes al afiliado",
              "error"
            );
          }
          //objeto_window_referencia = window.open("temp/consolidado_pres.xlsx", "Descarga_Consolidado", configuracion_ventana);
        });
      };
      $scope.options = function () {
        var sw = $scope.opcion;
        console.log(sw);
        switch (sw) {
          case 1:
            $scope.buscar_pres();
            break;
          case 2:
            $scope.buscar_pres_x_num();
            break;
          case 3:
            $scope.buscar_pres_x_doc();
            break;
          default:
            break;
        }
      };

      $scope.medicamentos_xls = function () {
        $http({
          method: "POST",
          url: "php/recobro/excel_medicamentos.php",
          data: {
            function: "crear_excel",
            datos: $scope.json,
            //datos: $scope.listaPRESxls
          },
        }).then(function (r) {
          var link = document.createElement("a");
          link.download = name;
          link.href = "php/recobro/consolidado_pres2.xlsx";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      };

      $scope.cabecera_xls = function () {
        $http({
          method: "POST",
          url: "php/recobro/excel_encabezado.php",
          data: {
            function: "crear_excel",
            datos: $scope.json,
            //datos: $scope.listaPRESxls
          },
        }).then(function (r) {
          var link = document.createElement("a");
          link.download = name;
          link.href = "php/recobro/consolidado_pres2.xlsx";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      };
      $scope.productos_xls = function () {
        $http({
          method: "POST",
          url: "php/recobro/excel_productos.php",
          data: {
            function: "crear_excel",
            datos: $scope.json,
            //datos: $scope.listaPRESxls
          },
        }).then(function (r) {
          var link = document.createElement("a");
          link.download = name;
          link.href = "php/recobro/consolidado_pres2.xlsx";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      };
      $scope.servicios_xls = function () {
        $http({
          method: "POST",
          url: "php/recobro/excel_servicios.php",
          data: {
            function: "crear_excel",
            datos: $scope.json,
            //datos: $scope.listaPRESxls
          },
        }).then(function (r) {
          var link = document.createElement("a");
          link.download = name;
          link.href = "php/recobro/consolidado_pres2.xlsx";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      };
      $scope.procedimientos_xls = function () {
        $http({
          method: "POST",
          url: "php/recobro/excel_procedimientos.php",
          data: {
            function: "crear_excel",
            datos: $scope.json,
            //datos: $scope.listaPRESxls
          },
        }).then(function (r) {
          var link = document.createElement("a");
          link.download = name;
          link.href = "php/recobro/consolidado_pres2.xlsx";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      };
      $scope.dispositivos_xls = function () {
        $http({
          method: "POST",
          url: "php/recobro/excel_dispositivos.php",
          data: {
            function: "crear_excel",
            datos: $scope.json,
            //datos: $scope.listaPRESxls
          },
        }).then(function (r) {
          var link = document.createElement("a");
          link.download = name;
          link.href = "php/recobro/consolidado_pres2.xlsx";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      };

      $scope.consolidado = function (tipo) {
        // $http({
        //  method: 'POST',
        //  url: "json/recobro/prescripciones.json",
        //  data: {
        //      function: 'crear_excel',
        //      //datos: $scope.json
        //      datos: $scope.listaPRESxls
        //      }
        //  }).then(function (res) {
        $scope.json = $scope.listaPRES;
        switch (tipo) {
          case "M":
            $scope.medicamentos_xls();
            break;
          case "C":
            $scope.cabecera_xls();
            break;
          case "N":
            $scope.productos_xls();
            break;
          case "S":
            $scope.servicios_xls();
            break;
          case "P":
            $scope.procedimientos_xls();
            break;
          case "D":
            $scope.dispositivos_xls();
            break;
          default:
            swal(
              "Pendiente",
              "Nos encontramos actualizando el modulo, agradecemos la espera",
              "warning"
            );
            break;
        }

        // });
      };
      $scope.buscar_pres = function () {
        swal({
          title: "Espere un momento",
          text: "Consultando plataforma MIPRES",
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          onOpen: () => {
            swal.showLoading();
          },
        });
        mipresHTTP
          .consultarpresxfecha(
            formatDate($scope.fecha_i),
            formatDate($scope.fecha_f),
            $scope.regimen
          )
          .then(function (response) {
            if (response !== 0) {
              swal.close();
              $scope.verMipres = false;

              // $scope.listaPRES = response;
              $scope.listaPRESxls = response;

              let consolidado = [];

              const datosFiltrados = response.filter((dia) => dia.length > 0);

              datosFiltrados.forEach((dia) => {
                dia.forEach((pr) => {
                  const textMap = {
                    // CodPerDurTrat
                    CodPerDurTrat: {
                      1: "Minutos",
                      2: "Horas",
                      3: "Dias",
                      4: "Semanas",
                      5: "Meses",
                      6: "Años",
                    },
                    CodFreUso: {
                      1: "Minutos",
                      2: "Horas",
                      3: "Dias",
                      4: "Semanas",
                      5: "Meses",
                      6: "Años",
                    },
                    CodFreAdmon: {
                      1: "Minutos",
                      2: "Horas",
                      3: "Dias",
                    },
                    DurTrat: {
                      1: "Minutos",
                      2: "Horas",
                      3: "Dias",
                      4: "Semanas",
                      5: "Meses",
                      6: "Años",
                    },
                    TipoMed: {
                      1: " Medicamento",
                      2: " Vital No Disponible",
                      3: " Preparación Magistral",
                      7: " UNIRS6",
                      9: " Urgencia Médica ",
                    },
                    TipoPrest: {
                      1: " Unica",
                      2: " Sucesiva",
                    },
                    IndEsp: {
                      1: "Admon Gotas Unicas",
                      2: "Admon Inmediata",
                      3: "Admon en Bolo",
                      4: "Admon Goteo",
                      5: "Inf. Continua",
                      6: "Inf. Intermitente",
                      7: "Inf. Intermitente",
                      8: "Microgoteo",
                      9: "Perfusion",
                      10: "Sin indicacion",
                    },

                    EstJM: {
                      1: "No requiere JP",
                      2: "Requiere JP",
                      3: "Aprobada",
                      4: "Rechazada",
                    },
                  };
                  // console.log(pr.medicamentos);

                  const newMedicamentos = pr.medicamentos.map((item) => {
                    const newItem = {};
                    Object.keys(item).forEach((key) => {
                      if (textMap[key]) {
                        if (item[key] === null) {
                          newItem[key] = "No Aplica";
                        } else {
                          newItem[key] = textMap[key][item[key]];
                        }
                      } else {
                        newItem[key] = item[key];
                      }
                    });

                    return newItem;
                  });

                  const newProcedimientos = pr.procedimientos.map((item) => {
                    const newItem = {};
                    Object.keys(item).forEach((key) => {
                      if (textMap[key]) {
                        if (item[key] === null) {
                          newItem[key] = "No Aplica";
                        } else {
                          newItem[key] = textMap[key][item[key]];
                        }
                      } else {
                        newItem[key] = item[key];
                      }
                    });

                    return newItem;
                  });

                  // console.log(newMedicamentos);
                  pr.medicamentos = newMedicamentos;
                  pr.procedimientos = newProcedimientos;

                  pr.prescripcion.EstPres =
                    pr.prescripcion.EstPres === 4 ? "Activo" : "No Activo";
                  pr.prescripcion.FPrescripcion = formatDate(
                    pr.prescripcion.FPrescripcion
                  );
                  const object = pr.prescripcion;
                  object.dispositivos = pr.dispositivos;
                  object.actdispositivos =
                    pr.dispositivos.length === 0 ? true : false;
                  object.medicamentos = pr.medicamentos;
                  object.actmedicamentos =
                    pr.medicamentos.length === 0 ? true : false;
                  object.procedimientos = pr.procedimientos;
                  object.actprocedimientos =
                    pr.procedimientos.length === 0 ? true : false;
                  object.productosnutricionales = pr.productosnutricionales;
                  object.actproductosnutricionales =
                    pr.productosnutricionales.length === 0 ? true : false;
                  object.serviciosComplementarios = pr.serviciosComplementarios;
                  object.actserviciosComplementarios =
                    pr.serviciosComplementarios.length === 0 ? true : false;

                  if (pr.medicamentos != null) {
                    object.medicamentos.forEach((medicament) => {
                      medicament.tipo_tec = "M";
                      medicament.NoPrescripcion = object.NoPrescripcion;
                      medicament.TipoIDPaciente = object.TipoIDPaciente;
                      medicament.NroIDPaciente = object.NroIDPaciente;
                    });
                  }
                  if (pr.procedimientos != null) {
                    object.procedimientos.forEach((procedimient) => {
                      procedimient.tipo_tec = "P";
                      procedimient.NoPrescripcion = object.NoPrescripcion;
                      procedimient.TipoIDPaciente = object.TipoIDPaciente;
                      procedimient.NroIDPaciente = object.NroIDPaciente;
                    });
                  }
                  if (pr.productosnutricionales != null) {
                    object.productosnutricionales.forEach(
                      (productosnutricional) => {
                        productosnutricional.tipo_tec = "N";
                        productosnutricional.NoPrescripcion =
                          object.NoPrescripcion;
                        productosnutricional.TipoIDPaciente =
                          object.TipoIDPaciente;
                        productosnutricional.NroIDPaciente =
                          object.NroIDPaciente;
                      }
                    );
                  }
                  if (pr.serviciosComplementarios != null) {
                    object.serviciosComplementarios.forEach(
                      (serviciosComplementari) => {
                        serviciosComplementari.tipo_tec = "S";
                        serviciosComplementari.NoPrescripcion =
                          object.NoPrescripcion;
                        serviciosComplementari.TipoIDPaciente =
                          object.TipoIDPaciente;
                        serviciosComplementari.NroIDPaciente =
                          object.NroIDPaciente;
                      }
                    );
                  }

                  consolidado.push(object);
                });
              });

              $scope.newarray = consolidado;

              $scope.listaPRES = consolidado;
              $scope.listaPRESTemp = consolidado;

              $scope.currentPage = 0;
              $scope.pageSize = 10;
              $scope.valmaxpag = 50;
              $scope.pages = [];
              $scope.configPages();

              setTimeout(function () {
                document
                  .getElementById("table_presc")
                  .scrollIntoView({ block: "start", behavior: "smooth" });
              }, 300);
            } else {
              swal(
                "Advertencia",
                "Ha ocurrido un error favor reintentar nuevamente mas tarde",
                "warning"
              );
            }
          });
      };

      $scope.inserta_prescripcion_cabeza = function (datos) {
        return new Promise(function (resolve, reject) {
          console.log($scope.resultado2);
          $http({
            method: "POST",
            url: "php/recobro/mipres.php",
            data: {
              function: "inserta_prescripcion",
              prescripcion: $scope.resultado2,
            },
          }).then(function (response) {
            //console.log(response.data);
            if (response.data.Codigo == "0") {
              $http({
                method: "POST",
                url: "php/recobro/mipres.php",
                data: {
                  function: "inserta_prescripcion_detalle",
                  prescripcion: $scope.resultado2,
                },
              }).then(function (r) {
                if (r.data.Codigo == "0") {
                  swal("Exito", r.data.Mensaje, "success");
                  resolve(r.data.Codigo);
                } else {
                  resolve(r.data.Codigo);
                  swal("Error", r.data.Mensaje, "error");
                }
                //objeto_window_referencia = window.open("temp/consolidado_pres.xlsx", "Descarga_Consolidado", configuracion_ventana);
              });
            } else {
              resolve(r.data.Codigo);
              swal("Error", response.data.Mensaje, "error");
            }
          });
        });
      };

      $scope.buscar_pres_x_doc = function () {
        if (
          $scope.tipodoc == "" ||
          $scope.doc == "" ||
          $scope.tipodoc == null ||
          $scope.doc == null ||
          $scope.tipodoc == undefined ||
          $scope.doc == undefined ||
          $scope.fecha_id == "" ||
          $scope.fecha_id == undefined
        ) {
          swal("Error", "Favor completar los camposss", "warning");
        } else {
          // swal({
          //     title: 'Espere un momento',
          //     text: 'Consultando plataforma MIPRES',
          //     allowOutsideClick: false,
          //     allowEscapeKey: false,
          //     allowEnterKey: false,
          //     onOpen: () => {
          //         swal.showLoading()
          //     }
          // });
          mipresHTTP
            .buscar_pres_x_doc(
              $scope.regimen,
              $scope.doc,
              $scope.tipodoc,
              formatDate($scope.fecha_id)
            )
            .then(function (response) {
              if (response.length == 0) {
                swal("Error", "No se encontraron Registros", "warning");
              } else {
                $scope.verMipres = false;
                // $scope.listaPRES = response;
                $scope.listaPRESxls = response;
                $scope.newarray = response.map((pr) => {
                  const textMap = {
                    // CodPerDurTrat
                    CodPerDurTrat: {
                      1: "Minutos",
                      2: "Horas",
                      3: "Dias",
                      4: "Semanas",
                      5: "Meses",
                      6: "Años",
                    },
                    CodFreUso: {
                      1: "Minutos",
                      2: "Horas",
                      3: "Dias",
                      4: "Semanas",
                      5: "Meses",
                      6: "Años",
                    },
                    CodFreAdmon: {
                      1: "Minutos",
                      2: "Horas",
                      3: "Dias",
                    },
                    DurTrat: {
                      1: "Minutos",
                      2: "Horas",
                      3: "Dias",
                      4: "Semanas",
                      5: "Meses",
                      6: "Años",
                    },
                    TipoMed: {
                      1: " Medicamento",
                      2: " Vital No Disponible",
                      3: " Preparación Magistral",
                      7: " UNIRS6",
                      9: " Urgencia Médica ",
                    },
                    TipoPrest: {
                      1: " Unica",
                      2: " Sucesiva",
                    },
                    IndEsp: {
                      1: "Admon Gotas Unicas",
                      2: "Admon Inmediata",
                      3: "Admon en Bolo",
                      4: "Admon Goteo",
                      5: "Inf. Continua",
                      6: "Inf. Intermitente",
                      7: "Inf. Intermitente",
                      8: "Microgoteo",
                      9: "Perfusion",
                      10: "Sin indicacion",
                    },

                    EstJM: {
                      1: "No requiere JP",
                      2: "Requiere JP",
                      3: "Aprobada",
                      4: "Rechazada",
                    },
                  };
                  // console.log(pr.medicamentos);

                  const newMedicamentos = pr.medicamentos.map((item) => {
                    const newItem = {};
                    Object.keys(item).forEach((key) => {
                      if (textMap[key]) {
                        if (item[key] === null) {
                          newItem[key] = "No Aplica";
                        } else {
                          newItem[key] = textMap[key][item[key]];
                        }
                      } else {
                        newItem[key] = item[key];
                      }
                    });

                    return newItem;
                  });

                  const newProcedimientos = pr.procedimientos.map((item) => {
                    const newItem = {};
                    Object.keys(item).forEach((key) => {
                      if (textMap[key]) {
                        if (item[key] === null) {
                          newItem[key] = "No Aplica";
                        } else {
                          newItem[key] = textMap[key][item[key]];
                        }
                      } else {
                        newItem[key] = item[key];
                      }
                    });

                    return newItem;
                  });

                  // console.log(newMedicamentos);
                  pr.medicamentos = newMedicamentos;
                  pr.procedimientos = newProcedimientos;

                  pr.prescripcion.EstPres =
                    pr.prescripcion.EstPres === 4 ? "Activo" : "No Activo";
                  pr.prescripcion.FPrescripcion = formatDate(
                    pr.prescripcion.FPrescripcion
                  );
                  const object = pr.prescripcion;
                  object.dispositivos = pr.dispositivos;
                  object.actdispositivos =
                    pr.dispositivos.length === 0 ? true : false;
                  object.medicamentos = pr.medicamentos;
                  object.actmedicamentos =
                    pr.medicamentos.length === 0 ? true : false;
                  object.procedimientos = pr.procedimientos;
                  object.actprocedimientos =
                    pr.procedimientos.length === 0 ? true : false;
                  object.productosnutricionales = pr.productosnutricionales;
                  object.actproductosnutricionales =
                    pr.productosnutricionales.length === 0 ? true : false;
                  object.serviciosComplementarios = pr.serviciosComplementarios;
                  object.actserviciosComplementarios =
                    pr.serviciosComplementarios.length === 0 ? true : false;

                  if (pr.medicamentos != null) {
                    object.medicamentos.forEach((medicament) => {
                      medicament.tipo_tec = "M";
                      medicament.NoPrescripcion = object.NoPrescripcion;
                      medicament.TipoIDPaciente = object.TipoIDPaciente;
                      medicament.NroIDPaciente = object.NroIDPaciente;
                    });
                  }
                  if (pr.procedimientos != null) {
                    object.procedimientos.forEach((procedimient) => {
                      procedimient.tipo_tec = "P";
                      procedimient.NoPrescripcion = object.NoPrescripcion;
                      procedimient.TipoIDPaciente = object.TipoIDPaciente;
                      procedimient.NroIDPaciente = object.NroIDPaciente;
                    });
                  }
                  if (pr.productosnutricionales != null) {
                    object.productosnutricionales.forEach(
                      (productosnutricional) => {
                        productosnutricional.tipo_tec = "N";
                        productosnutricional.NoPrescripcion =
                          object.NoPrescripcion;
                        productosnutricional.TipoIDPaciente =
                          object.TipoIDPaciente;
                        productosnutricional.NroIDPaciente =
                          object.NroIDPaciente;
                      }
                    );
                  }
                  if (pr.serviciosComplementarios != null) {
                    object.serviciosComplementarios.forEach(
                      (serviciosComplementari) => {
                        serviciosComplementari.tipo_tec = "S";
                        serviciosComplementari.NoPrescripcion =
                          object.NoPrescripcion;
                        serviciosComplementari.TipoIDPaciente =
                          object.TipoIDPaciente;
                        serviciosComplementari.NroIDPaciente =
                          object.NroIDPaciente;
                      }
                    );
                  }

                  return object;
                });
                $scope.listaPRES = $scope.newarray;

                $scope.listaPRESTemp = $scope.listaPRES;
                $scope.currentPage = 0;
                $scope.pageSize = 10;
                $scope.valmaxpag = 10;
                $scope.pages = [];
                $scope.configPages();

                setTimeout(function () {
                  document
                    .getElementById("table_presc")
                    .scrollIntoView({ block: "start", behavior: "smooth" });
                }, 300);
              }
            });
        }
      };

      $scope.buscar_pres_x_num = function () {
        swal({
          title: "Espere un momento",
          text: "Consultando plataforma MIPRES",
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          onOpen: () => {
            swal.showLoading();
          },
        });
        if (
          $scope.no_pres == "" ||
          $scope.regimen == "" ||
          $scope.no_pres == null ||
          $scope.regimen == null
        ) {
          swal("Error", "Favor completar los campos", "warning");
        } else {
          mipresHTTP
            .buscar_pres_x_num($scope.regimen, $scope.no_pres)
            .then(function (res) {
              // console.log(response)
              swal.close();
              if (res.length == 0) {
                swal("Error", "No se encontraron Registros", "warning");
              } else {
                // console.log(response);
                let resultado = res;
                $scope.resultado2 = resultado;
                $scope.listaPRESxls = $scope.resultado2;

                var promise = $scope.inserta_prescripcion_cabeza(
                  $scope.resultado2
                );
                promise.then(function (asd) {
                  //     swal('Exito','asd','success');
                  $scope.verMipres = false;
                  // $scope.listaPRES = response;

                  $scope.newarray = $scope.listaPRESxls.map((pr) => {
                    const textMap = {
                      // CodPerDurTrat
                      CodPerDurTrat: {
                        1: "Minutos",
                        2: "Horas",
                        3: "Dias",
                        4: "Semanas",
                        5: "Meses",
                        6: "Años",
                      },
                      CodFreUso: {
                        1: "Minutos",
                        2: "Horas",
                        3: "Dias",
                        4: "Semanas",
                        5: "Meses",
                        6: "Años",
                        8: "Unica",
                      },
                      CodFreAdmon: {
                        1: "Minutos",
                        2: "Horas",
                        3: "Dias",
                      },
                      DurTrat: {
                        1: "Minutos",
                        2: "Horas",
                        3: "Dias",
                        4: "Semanas",
                        5: "Meses",
                        6: "Años",
                      },
                      TipoMed: {
                        1: " Medicamento",
                        2: " Vital No Disponible",
                        3: " Preparación Magistral",
                        7: " UNIRS6",
                        9: " Urgencia Médica ",
                      },
                      TipoPrest: {
                        1: " Unica",
                        2: " Sucesiva",
                      },
                      IndEsp: {
                        1: "Admon Gotas Unicas",
                        2: "Admon Inmediata",
                        3: "Admon en Bolo",
                        4: "Admon Goteo",
                        5: "Inf. Continua",
                        6: "Inf. Intermitente",
                        7: "Inf. Intermitente",
                        8: "Microgoteo",
                        9: "Perfusion",
                        10: "Sin indicacion",
                      },
                      CodViaAdmon: {
                        1: "Admon Gotas Unicas",
                        2: "Admon Inmediata",
                        3: "Admon en Bolo",
                        4: "Admon Goteo",
                        5: "Inf. Continua",
                        6: "Inf. Intermitente",
                        7: "Inf. Intermitente",
                        8: "Microgoteo",
                        9: "Perfusion",
                        10: "Sin indicacion",
                      },
                      EstJM: {
                        1: "No requiere JP",
                        2: "Requiere JP",
                        3: "Aprobada",
                        4: "Rechazada",
                      },
                    };

                    const newMedicamentos = pr.medicamentos.map((item) => {
                      const newItem = {};
                      Object.keys(item).forEach((key) => {
                        if (textMap[key]) {
                          if (item[key] === null) {
                            newItem[key] = "No Aplica";
                          } else {
                            newItem[key] = textMap[key][item[key]];
                          }
                        } else {
                          if (item[key] === null) {
                            newItem[key] = "No Registra";
                          } else {
                            newItem[key] = item[key];
                          }
                        }
                      });

                      return newItem;
                    });

                    const newProcedimientos = pr.procedimientos.map((item) => {
                      const newItem = {};
                      Object.keys(item).forEach((key) => {
                        if (textMap[key]) {
                          if (item[key] === null) {
                            newItem[key] = "No Aplica";
                          } else {
                            newItem[key] = textMap[key][item[key]];
                          }
                        } else {
                          if (item[key] === null) {
                            newItem[key] = "No Registra";
                          } else {
                            newItem[key] = item[key];
                          }
                        }
                      });

                      return newItem;
                    });

                    const newdispositivos = pr.dispositivos.map((item) => {
                      const newItem = {};
                      Object.keys(item).forEach((key) => {
                        if (textMap[key]) {
                          if (item[key] === null) {
                            newItem[key] = "No Aplica";
                          } else {
                            newItem[key] = textMap[key][item[key]];
                          }
                        } else {
                          if (item[key] === null) {
                            newItem[key] = "No Registra";
                          } else {
                            newItem[key] = item[key];
                          }
                        }
                      });

                      return newItem;
                    });

                    const newproductosnutricionales =
                      pr.productosnutricionales.map((item) => {
                        const newItem = {};
                        Object.keys(item).forEach((key) => {
                          if (textMap[key]) {
                            if (item[key] === null) {
                              newItem[key] = "No Aplica";
                            } else {
                              newItem[key] = textMap[key][item[key]];
                            }
                          } else {
                            if (item[key] === null) {
                              newItem[key] = "No Registra";
                            } else {
                              newItem[key] = item[key];
                            }
                          }
                        });

                        return newItem;
                      });

                    const newserviciosComplementarios =
                      pr.serviciosComplementarios.map((item) => {
                        const newItem = {};
                        Object.keys(item).forEach((key) => {
                          if (textMap[key]) {
                            if (item[key] === null) {
                              newItem[key] = "No Aplica";
                            } else {
                              newItem[key] = textMap[key][item[key]];
                            }
                          } else {
                            if (item[key] === null) {
                              newItem[key] = "No Registra";
                            } else {
                              newItem[key] = item[key];
                            }
                          }
                        });

                        return newItem;
                      });

                    // console.log(newMedicamentos);
                    pr.medicamentos = newMedicamentos;
                    pr.procedimientos = newProcedimientos;
                    pr.dispositivos = newdispositivos;
                    pr.productosnutricionales = newproductosnutricionales;
                    pr.serviciosComplementarios = newserviciosComplementarios;

                    pr.prescripcion.EstPres =
                      pr.prescripcion.EstPres === 4 ? "Activo" : "No Activo";
                    pr.prescripcion.FPrescripcion = formatDate(
                      pr.prescripcion.FPrescripcion
                    );
                    const object = pr.prescripcion;
                    object.dispositivos = pr.dispositivos;
                    object.actdispositivos =
                      pr.dispositivos.length === 0 ? true : false;
                    object.medicamentos = pr.medicamentos;
                    object.actmedicamentos =
                      pr.medicamentos.length === 0 ? true : false;
                    object.procedimientos = pr.procedimientos;
                    object.actprocedimientos =
                      pr.procedimientos.length === 0 ? true : false;
                    object.productosnutricionales = pr.productosnutricionales;
                    object.actproductosnutricionales =
                      pr.productosnutricionales.length === 0 ? true : false;
                    object.serviciosComplementarios =
                      pr.serviciosComplementarios;
                    object.actserviciosComplementarios =
                      pr.serviciosComplementarios.length === 0 ? true : false;

                    if (pr.medicamentos != null) {
                      object.medicamentos.forEach((medicament) => {
                        medicament.tipo_tec = "M";
                        medicament.NoPrescripcion = object.NoPrescripcion;
                        medicament.TipoIDPaciente = object.TipoIDPaciente;
                        medicament.NroIDPaciente = object.NroIDPaciente;
                      });
                    }
                    if (pr.procedimientos != null) {
                      object.procedimientos.forEach((procedimient) => {
                        procedimient.tipo_tec = "P";
                        procedimient.NoPrescripcion = object.NoPrescripcion;
                        procedimient.TipoIDPaciente = object.TipoIDPaciente;
                        procedimient.NroIDPaciente = object.NroIDPaciente;
                      });
                    }
                    if (pr.productosnutricionales != null) {
                      object.productosnutricionales.forEach(
                        (productosnutricional) => {
                          productosnutricional.tipo_tec = "N";
                          productosnutricional.NoPrescripcion =
                            object.NoPrescripcion;
                          productosnutricional.TipoIDPaciente =
                            object.TipoIDPaciente;
                          productosnutricional.NroIDPaciente =
                            object.NroIDPaciente;
                        }
                      );
                    }
                    if (pr.serviciosComplementarios != null) {
                      object.serviciosComplementarios.forEach(
                        (serviciosComplementari) => {
                          serviciosComplementari.tipo_tec = "S";
                          serviciosComplementari.NoPrescripcion =
                            object.NoPrescripcion;
                          serviciosComplementari.TipoIDPaciente =
                            object.TipoIDPaciente;
                          serviciosComplementari.NroIDPaciente =
                            object.NroIDPaciente;
                        }
                      );
                    }
                    if (pr.dispositivos != null) {
                      object.dispositivos.forEach((dispositivo) => {
                        dispositivo.tipo_tec = "D";
                        dispositivo.NoPrescripcion = object.NoPrescripcion;
                        dispositivo.TipoIDPaciente = object.TipoIDPaciente;
                        dispositivo.NroIDPaciente = object.NroIDPaciente;
                      });
                    }
                    return object;
                  });
                  $scope.listaPRES = $scope.newarray;

                  // $scope.listaPRESxls = response;
                  $scope.listaPRESTemp = $scope.listaPRES;
                  $scope.currentPage = 0;
                  $scope.pageSize = 10;
                  $scope.valmaxpag = 10;
                  $scope.pages = [];
                  $scope.configPages();

                  setTimeout(function () {
                    document
                      .getElementById("table_presc")
                      .scrollIntoView({ block: "start", behavior: "smooth" });
                  }, 300);
                });
              }
            });
        }
      };

      $scope.AbrirModal_actualizadiagnostico = function (numero_pres) {
        //
        $("#Modal_Actualizar_diagnostico").modal("open");
        $scope.NumeroPrescripcion = numero_pres; //
        $scope.Modal_Diagnostico = "";
        $scope.inactivebarradiag = true;
      };

      $scope.buscarDiagnostico = function (diag) {
        var sexo = 'F';
        var edad = '10000';
        if (diag == "" || diag == undefined) {
          swal(
            "Importante",
            "El campo  de texto no puede estar vacio!",
            "info"
          );
        } else {
          $http({
            method: "POST",
            url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
            data: {
              function: "obtenerDiagnostico",
              codigo: diag,
              sexo: sexo,
              edad: edad
            },
          }).then(function (response) {
            $scope.listDiagnosticos = [];
            if (response.data["0"].Codigo == "-1") {
              swal("Importante", response.data["0"].Nombre, "info");
              $scope.inactivebarradiag = true;
            } else if (response.data["0"].Codigo == "0") {
              swal(
                "Importante",
                "Diasnostico no encontrado ó favor especificar mas la busqueda del diagnostico",
                "info"
              );
              $scope.inactivebarradiag = true;
            } else {
              $scope.listDiagnosticos = response.data;
              $scope.inactivebarradiag = false;
            }
          });
        }
      };

      $scope.Actualizar_Diagnostico = function (diagnostico) {
        // console.log($scope.NumeroPrescripcion);
        // console.log(diagnostico);
        $http({
          method: "POST",
          url: "php/recobro/mipres.php",
          data: {
            function: "ActualizarElDiagnostico",
            v_num_prescripcion: $scope.NumeroPrescripcion,
            v_cod_diagnostico:diagnostico,
            v_pnumentrega:null,
            v_accion:"D",
          },
        }).then(function (response) {
          console.log(response.data);
          if (
            response.data &&
            response.data.toString().substr(0, 3) != "<br"
          ) {
            if (response.data.Codigo == "0") {
              swal("Exito", response.data.Nombre, "success");
              // $scope.options();
              $scope.closeModal();
            } else {
              swal("Error", response.data.Nombre, "error");
            }
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        });
      };

      $scope.closeModal = function () {
        $(".modal").modal("close");
      };

      $scope.open_modal = function (modal, datos_dir) {
        $scope.info = datos_dir;
        $scope.regimen;
        const newScope = $scope.$new(true);
        switch (modal) {
          case "presxdoc":
            newScope.info = datos_dir;
            ngDialog.open({
              template: "views/recobro/modal/modal_presxdoc.html",
              className: "ngdialog-theme-plain",
              controller: "modalDetPresctrl",
              scope: newScope,
            });
            break;

          //det
          case "det":
            newScope.info = datos_dir;
            newScope.reg = $scope.regimen;
            ngDialog.open({
              template: "views/recobro/modal/modalDetPresc.html",
              className: "ngdialog-theme-plain",
              controller: "modalDetPresctrl",
              scope: newScope,
            });
            break;

          case "med":
            newScope.info = datos_dir;
            newScope.reg = $scope.regimen;
            ngDialog.open({
              template: "views/recobro/modal/modalMedicamentos.html",
              className: "ngdialog-theme-plain",
              controller: "modalMedicamentoctrl",
              scope: newScope,
            });
            break;

          case "proc":
            newScope.info = datos_dir;
            newScope.reg = $scope.regimen;
            ngDialog.open({
              template: "views/recobro/modal/modalProcedimientos.html",
              className: "ngdialog-theme-plain",
              controller: "modalProcedimientoctrl",
              scope: newScope,
            });
            break;

          case "dis":
            newScope.info = datos_dir;
            newScope.reg = $scope.regimen;
            ngDialog.open({
              template: "views/recobro/modal/modalDispositivos.html",
              className: "ngdialog-theme-plain",
              controller: "modalDispositivosctrl",
              scope: newScope,
            });
            break;
          case "prod":
            newScope.info = datos_dir;
            newScope.reg = $scope.regimen;
            ngDialog.open({
              template: "views/recobro/modal/modalProdNut.html",
              className: "ngdialog-theme-plain",
              controller: "modalNutricionalctrl",
              scope: newScope,
            });
            break;
          case "ser":
            newScope.info = datos_dir;
            newScope.reg = $scope.regimen;
            ngDialog.open({
              template: "views/recobro/modal/modalServComp.html",
              className: "ngdialog-theme-plain",
              controller: "modalServicioctrl",
              scope: newScope,
            });
            break;

          default:
            break;
        }
      };
      $scope.select_tecnologia = " ";
      $scope.exportar = function () {
        $http({
          method: "POST",
          url: ($scope.select_tecnologia = ""
            ? "php/recobro/genera_xls.php"
            : "php/recobro/genera_xls.php/?tipo=" + $scope.select_tecnologia),
          data: { json: $scope.listaPRESxls },
        }).then(function (response) {
          objeto_window_referencia = window.open(
            "temp/consolidado_pres.xlsx",
            "Descarga_Consolidado",
            configuracion_ventana
          );
        });
      };

      $scope.filter = function (val) {
        $scope.listaPRESTemp = $filter("filter")($scope.listaPRES, val);
        if ($scope.listaPRESTemp.length > 0) {
          $scope.setPage(1);
        }
        $scope.configPages();
      };

      $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (
            Math.ceil($scope.listaPRESTemp.length / $scope.pageSize) >
            $scope.valmaxpag
          )
            fin = 10;
          else fin = Math.ceil($scope.listaPRESTemp.length / $scope.pageSize);
        } else {
          if (
            ini >=
            Math.ceil($scope.listaPRESTemp.length / $scope.pageSize) -
            $scope.valmaxpag
          ) {
            ini =
              Math.ceil($scope.listaPRESTemp.length / $scope.pageSize) -
              $scope.valmaxpag;
            fin = Math.ceil($scope.listaPRESTemp.length / $scope.pageSize);
          }
        }
        if (ini < 1) ini = 1;
        for (var i = ini; i <= fin; i++) {
          $scope.pages.push({
            no: i,
          });
        }

        if ($scope.currentPage >= $scope.pages.length)
          $scope.currentPage = $scope.pages.length - 1;
      };

      $scope.setPage = function (index) {
        $scope.currentPage = index - 1;
        // console.log($scope.listaPRES.length / $scope.pageSize - 1)
      };

      function formatDate(date) {
        var d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
      }

      if (document.readyState !== "loading") {
        $scope.Inicio();
      } else {
        document.addEventListener("DOMContentLoaded", function () {
          $scope.Inicio();
        });
      }
    },
  ])
  .filter("inicio", function () {
    return function (input, start) {
      if (input != undefined && start != NaN) {
        start = +start;
        return input.slice(start);
      } else {
        return null;
      }
    };
  });
