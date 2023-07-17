'use strict';
angular.module('GenesisApp')
  .controller('procesosespecialesController', ['$scope', '$http',
    function ($scope, $http) {
      $scope.tipodeItem = 0;
      $scope.Rol_Cedula = sessionStorage.getItem('cedula');
      $scope.rolcod = sessionStorage.getItem('rolcod');
      $(document).ready(function () {
        $scope.obtener_token();
        $scope.obtenerreporte();
        $scope.obtener_correo();
        $scope.incioVacio();
        $scope.lis_info_BDUA_subsidiado = new Array();
        $scope.lis_info_BDUA_contributivo = new Array();
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        // $scope.lis_info_LMA = new Array();
        // console.log($(window).width());
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100 && $(window).width() < 1300) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1300 && $(window).width() < 1500) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
        if ($(window).width() > 1500) {
          document.querySelector("#pantalla").style.zoom = 0.9;
        }
        document.querySelector("#content").style.backgroundColor = "white";
        ///////////////////////////////////////////////////////////////////
      });
      $scope.incioVacio = function () {
        $scope.regimen = "";
        $scope.anno = "";
        $scope.periodo = "";
        $scope.nit = "";
      };
      $scope.cargaAnnos = function () {
        $http({
          method: 'POST',
          url: "php/financiera/funcfinanciera.php",
          data: { function: 'cargaannos' }
        }).then(function (res) {
          $scope.Annos = res.data;
          $scope.anno = $scope.Annos[0].ANNO;
          $scope.cargaPeriodos();
        })
      }
      $scope.cargaPeriodos = function () {
        if ($scope.anno != "X" || $scope.anno === undefined) {
          $http({
            method: 'POST',
            url: "php/financiera/funcfinanciera.php",
            data: { function: 'cargaperiodos', anno: $scope.anno }
          }).then(function (res) {
            $scope.Periodos = res.data;
            // $scope.periodo = $scope.Periodos[0].IDE;
          })
        }
      }
      $scope.obtener_token = function () {
        $http({
          method: 'POST',
          url: "php/financiera/reportes/funcreportes.php",
          data: {
            function: 'obtener_token'
          }
        }).then(function (response) {
          $scope.respuestat = response.data;
        });
      }
      $scope.obtener_correo = function () {
        $http({
          method: 'POST',
          url: "php/financiera/reportes/funcreportes.php",
          data: {
            function: 'obtener_correo', codigoc: $scope.Rol_Cedula
          }
        }).then(function (response) {
          $scope.correo = response.data.Correo;
          $scope.respuestac = response.data;
        });
      }
      $scope.obtenerreporte = function () {
        // console.log($scope.rolcod);
        $http({
          method: 'POST',
          url: "php/informes/obtenerreportes_especiales.php",
          data: { function: 'obtenerreportes', v_prol: $scope.rolcod }
        }).then(function (response) {
          $scope.Reportes = response.data;
        })
      }
      $scope.changeItem = function (item) {
        $scope.item = JSON.parse(item)
        // console.log($scope.item)
      }
      $scope.listado_tabla_BDUA_subsidiado = function () {
        $http({
          method: "POST",
          url: "php/financiera/funcfinanciera.php",
          data: { function: "lista_tabla_BDUA_subsidiado" },
        }).then(function (res) {
          $scope.lis_info_BDUA_subsidiado = res.data;
        });
      };
      $scope.listado_tabla_BDUA_contributivo = function () {
        $http({
          method: "POST",
          url: "php/financiera/funcfinanciera.php",
          data: { function: "lista_tabla_BDUA_contributivo" },
        }).then(function (res) {
          $scope.lis_info_BDUA_contributivo = res.data;
        });
      };
      $scope.listado_tabla_LMA = function () {
        $http({
          method: "POST",
          url: "php/financiera/funcfinanciera.php",
          data: { function: "lista_tabla_LMA_2" },
        }).then(function (res) {
          console.log(res);
          $scope.lis_info_LMA = res.data;
        });
      };
      $scope.SeleccionarItem = function () {
        if ($scope.tipodeItem == "0") {
          $scope.vercontenido = false;
          $scope.vercontenidoLMA = false;
        } else {
          $scope.ocultarTodo();
          $scope.incioVacio();
          $scope.vercontenido = true;
          $scope.vercontenidoLMA = true;
          switch ($scope.tipodeItem) {
            case "67"://Cargue de Bases de BDUA Subsidiado
              $scope.show_regimen = false;
              $scope.show_ciclo = false;
              $scope.show_nit = false;
              $scope.Nombrereporte = "Cargue de Bases de BDUA Subsidiado";
              $scope.contenido1 = true;
              $scope.contenido2 = false;
              $scope.contenido3 = false;
              $scope.vercontenidoLMA = false;
              $scope.show_tabla_list_BDUA_subsidiado = true;
              $scope.show_tabla_list_BDUA_contributivo = false;
              $scope.show_tabla_list_LMA = false;
              $scope.listado_tabla_BDUA_subsidiado();
              break;
            case "22"://Archivo Tipo 017
              $scope.regimen = "X";
              $scope.show_regimen = true;
              $scope.show_ciclo = true;
              $scope.show_nit = true;
              $scope.Nombrereporte = "Archivo Tipo 017";
              $scope.contenido1 = true;
              $scope.contenido2 = false;
              $scope.contenido3 = false;
              $scope.vercontenidoLMA = false;
              $scope.show_tabla_list_BDUA_subsidiado = false;
              $scope.show_tabla_list_BDUA_contributivo = false;
              $scope.show_tabla_list_LMA = false;
              break;
            case "72"://Recalculo Contable - Kprecal
              $scope.show_regimen = false;
              $scope.show_ciclo = false;
              $scope.show_nit = false;
              $scope.Nombrereporte = "Recalculo Contable - Kprecal";
              $scope.contenido1 = true;
              $scope.contenido2 = false;
              $scope.contenido3 = false;
              $scope.vercontenidoLMA = false;
              $scope.show_tabla_list_BDUA_subsidiado = false;
              $scope.show_tabla_list_BDUA_contributivo = false;
              $scope.show_tabla_list_LMA = false;
              break;
            case "70"://Cargue Bases de LMA
              $scope.show_regimen = false;
              $scope.show_ciclo = false;
              $scope.show_nit = false;
              $scope.Nombrereporte = "Cargue Bases de LMA";
              $scope.vercontenido = false;
              $scope.contenido1 = false;
              $scope.contenido2 = false;
              $scope.contenido3 = true;
              $scope.show_tabla_list_BDUA_subsidiado = false;
              $scope.show_tabla_list_BDUA_contributivo = false;
              $scope.show_tabla_list_LMA = true;
              $scope.listado_tabla_LMA();
              $scope.obtener_fechaConfirmacionLMA();
              break;
            case "78": //Cargue de Bases de BDUA Contributivo
              $scope.show_ano = true;
              $scope.show_regimen = false;
              $scope.show_ciclo = false;
              $scope.show_mensual = true;
              $scope.show_trimestre = false;
              $scope.show_archivo_zip = false;
              $scope.show_archivo_txt = false;
              $scope.show_nit = false;
              $scope.Nombrereporte = "Cargue de Bases de BDUA Contributivo";
              $scope.contenido1 = true;
              $scope.contenido3 = false;
              $scope.vercontenidoLMA = false;
              $scope.show_ubicacion = false;
              $scope.show_concepto = false;
              $scope.show_fecha_recibico = false;
              $scope.show_fecha_respuesta = false;
              $scope.show_instructivo = false;
              $scope.show_tabla_list_BDUA_subsidiado = false;
              $scope.show_tabla_list_BDUA_contributivo = true;
              $scope.show_tabla_list_LMA = false;
              $scope.listado_tabla_BDUA_contributivo();
              break;
          }
        }
      }
      $scope.Generar_reporte = function () {
        if ($scope.tipodeItem == "0") {
          $scope.vercontenido = false;
          $scope.vercontenidoLMA = false;
        } else {
          $scope.ocultarTodo();
          $scope.vercontenido = true;
          $scope.vercontenidoLMA = true;
          switch ($scope.tipodeItem) {
            case "67"://Cargue de Bases de BDUA Subsidiado
              var datosRC = {
                correo: $scope.correo,
                anno: $scope.anno,
                mes: $scope.item.IDE,
                responsable: $scope.Rol_Cedula,
              }
              swal({
                title: '¿Desea Generar Proceso BDUA?',
                text: "Generar Proceso",
                type: 'info',
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar",
                cancelButtonColor: "#d33",
                allowOutsideClick: false
              }).then(function (result) {
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
                    url: "php/financiera/reportes/funcreportes.php",
                    data: {
                      function: 'Cargue_BDUA_subsidiado',
                      datos: (datosRC)
                    }
                  }).then(function (response) {
                    console.log(response);
                    if (response.data.data) {
                      swal({
                        title: "Mensaje",
                        text: "Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo",
                        type: "success",
                      });
                    } else {
                      swal({
                        title: "Mensaje",
                        text: "Por Favor Intente Nuevamente",
                        type: "error",
                        allowOutsideClick: false
                      }).then((result) => {
                        location.reload();
                      });
                    }
                    $scope.respuestata = response.data;
                  });
                }
              })
                .catch(swal.noop);
              $scope.tipodeItem = "0";
              $scope.incioVacio();
              $scope.ocultarTodo();
              $scope.vercontenido = false;
              break;
            case "22"://Archivo Tipo 017
              var datosRC = {
                "correo": $scope.correo,
                "regimen": $scope.regimen,
                "anno": $scope.anno,
                "ciclo": $scope.ciclo,
                "mes": $scope.item.IDE,
                "nit": $scope.nit

              }
              swal({
                title: '¿Desea Generar Proceso Archivo Tipo 017?',
                text: "Generar Proceso",
                type: 'info',
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar",
                cancelButtonColor: "#d33",
                allowOutsideClick: false
              }).then(function (result) {
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
                    url: "php/financiera/reportes/funcreportes.php",
                    data: {
                      function: 'Cargue_017',
                      datos: (datosRC)
                    }
                  }).then(function (response) {
                    if (response.data.data) {
                      swal({
                        title: "Mensaje",
                        text: "Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo",
                        type: "success",
                      });
                    } else {
                      swal({
                        title: "Mensaje",
                        text: "Por Favor Intenete Nuevamente",
                        type: "error",
                        allowOutsideClick: false
                      }).then((result) => {
                        location.reload();
                      });
                    }
                    $scope.respuestata = response.data;
                  });
                }
              }).catch(swal.noop);
              $scope.contenido1 = true;
              $scope.regimen = "";
              $scope.anno = "";
              $scope.periodo = "";
              $scope.nit = "";
              break;
            case "72"://Recalculo Contable - Kprecal
              // Recalculo Contable - Kprecal
              var datosRC = {
                "correo": $scope.correo,
                "anno": $scope.anno,
                "mes": $scope.item.IDE

              }
              swal({
                title: '¿Desea Generar Proceso Recalculo Contable - Kprecal?',
                text: "Generar Proceso",
                type: 'info',
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar",
                cancelButtonColor: "#d33",
                allowOutsideClick: false
              }).then(function (result) {
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
                    url: "php/financiera/reportes/funcreportes.php",
                    data: {
                      function: 'Recalculo_contable',
                      datos: (datosRC)
                    }
                  }).then(function (response) {
                    if (response.data.data) {
                      swal({
                        title: "Mensaje",
                        text: "Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo",
                        type: "success",
                      });
                    } else {
                      swal({
                        title: "Mensaje",
                        text: "Por Favor Intenete Nuevamente",
                        type: "error",
                        allowOutsideClick: false
                      }).then((result) => {
                        location.reload();
                      });
                    }
                    $scope.respuestata = response.data;
                  });
                }
              }).catch(swal.noop);
              break;
            case "70"://Cargue Bases de LMA
              // Cargue Bases de LMA
              var datosRC = {
                "correo": $scope.correo,
                "anno": $scope.anno,
                "mes": $scope.item.IDE,
                "fecha": $scope.item.PERF_FINAL,
                "responsable": $scope.Rol_Cedula
              }
              swal({
                title: '¿Desea Generar Proceso LMA?',
                text: "Generar Proceso",
                type: 'info',
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar",
                cancelButtonColor: "#d33",
                allowOutsideClick: false
              }).then(function (result) {
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
                    url: "php/financiera/reportes/funcreportes.php",
                    data: {
                      function: 'Cargue_LMA',
                      datos: (datosRC)
                    }
                  }).then(function (response) {
                    if (response.data.data) {
                      swal({
                        title: "Mensaje",
                        text: "Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo",
                        type: "success",
                      });
                    } else {
                      swal({
                        title: "Mensaje",
                        text: "Por Favor Intenete Nuevamente",
                        type: "error",
                        allowOutsideClick: false
                      }).then((result) => {
                        location.reload();
                      });
                    }
                    $scope.respuestata = response.data;
                  });
                }
              }).catch(swal.noop);
              break;
            case "78": //Cargue de Bases de BDUA Contributivo
              if (
                $scope.item == "" ||
                $scope.item == undefined ||
                $scope.anno == "" ||
                $scope.anno == undefined ||
                $scope.periodo == "" ||
                $scope.periodo == undefined
              ) {
                swal({
                  title: "Mensaje",
                  text: "No se puede cargar archivo si no completa todos los campos",
                  type: "warning",
                });
                $scope.contenido1 = true;
              } else {
                var datosRC = {
                  correo: $scope.correo,
                  anno: $scope.anno,
                  mes: $scope.item.IDE,
                  responsable: $scope.Rol_Cedula,
                };
                swal({
                  title: "¿Desea Generar Proceso BDUA?",
                  text: "Generar Proceso",
                  type: "info",
                  showCancelButton: true,
                  confirmButtonText: "Confirmar",
                  cancelButtonText: "Cancelar",
                  cancelButtonColor: "#d33",
                  allowOutsideClick: false,
                })
                  .then(function (result) {
                    if (result) {
                      swal({
                        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                        width: 200,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showConfirmButton: false,
                        animation: false,
                      });
                      $http({
                        method: "POST",
                        url: "php/financiera/reportes/funcreportes.php",
                        data: {
                          function: "Cargue_BDUA_contributivo",
                          datos: datosRC,
                        },
                      }).then(function (response) {
                        if (response.data.data) {
                          swal({
                            title: "Mensaje",
                            text: "Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo",
                            type: "success",
                          });
                        } else {
                          swal({
                            title: "Mensaje",
                            text: "Por Favor Intente Nuevamente",
                            type: "error",
                            allowOutsideClick: false
                          }).then((result) => {
                            location.reload();
                          });
                        }
                        $scope.respuestata = response.data;
                      });
                    }
                  })
                  .catch(swal.noop);
                $scope.tipodeItem = "0";
                $scope.incioVacio();
                $scope.ocultarTodo();
                $scope.vercontenido = false;
              }
              break;
          }
        }
      }
      $scope.ocultarTodo = function () {
        $scope.contenido1 = false;
        $scope.contenido2 = false;
      }

      $scope.obtener_fechaConfirmacionLMA = function () {

        $http({
          method: "POST",
          url: "php/financiera/funcfinanciera.php",
          data: {
            function: "obtener_fechaConfirmacionLMA"
          },
        }).then(function ({ data }) {
          if (data) {
            $scope.lma_mes = data[0].mes;
            $scope.lma_anno = data[0].año;
            $scope.lma_fechaentrega = data[0].mesentrega;
          } else {
            $scope.lma_fechaentrega = '';
          }
        });
      }

      $scope.Confirmar_reporte_lma = function () {

        // const date = new Date();
        // const xfechamov = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        // const fechamov = `${xfechamov.getDate()}/${xfechamov.getMonth() + 1}/${xfechamov.getFullYear()}`;

        //   var datosRC = {
        //     "correo": $scope.correo,
        //     "anno": date.getFullYear().toString(),
        //     "mes":  (date.getMonth() + 1).toString(),
        //     "fecha": fechamov,
        //     "responsable": $scope.Rol_Cedula
        //  }

        if (!$scope.lma_fechaentrega || $scope.lma_fechaentrega == '') {
          swal("Mensaje", "Error al cargar la fecha de cargue", "info");
          return
        }

        var datosRC = {
          "correo": $scope.correo,
          "anno": $scope.lma_anno,
          "mes": $scope.lma_mes,
          "fecha": $scope.lma_fechaentrega,
          "responsable": $scope.Rol_Cedula
        }
        swal({
          title: "¿Desea confirmar el cargue?",
          type: "question",
          showCancelButton: true,
          allowOutsideClick: false
        }).catch(swal.noop)
          .then((willDelete) => {
            if (willDelete) {
              $http({
                method: "POST",
                url: "php/financiera/funcfinanciera.php",
                data: {
                  function: "confirmarLMA",
                  datos: datosRC
                },
              }).then(function (res) {
                console.log(res);
                // $scope.lis_info_LMA = res.data;
                swal({
                  title: "Mensaje",
                  text: "Generando reporte en segundo plano, cuando termine de cargar",
                  type: "success",
                });
              });
            }
          });

      };

      $scope.cancelar_reporte_lma = function () {
        $scope.vercontenidoLMA = false;
        $scope.tipodeItem = '';
      }

      // $scope.Cargue_BDUA = function () {
      //    var datosRC = {
      //       "correo": $scope.correo,
      //       "anno": $scope.anno,
      //       "mes": $scope.periodo

      //    }
      //    swal({
      //       title: '¿Desea Generar Proceso BDUA?',
      //       text: "Generar Proceso",
      //       type: 'info',
      //       showCancelButton: true,
      //       confirmButtonText: "Confirmar",
      //       cancelButtonText: "Cancelar",
      //       cancelButtonColor: "#d33",
      //       allowOutsideClick: false
      //    }).then(function (result) {
      //       if (result) {
      //          swal({
      //             html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
      //             width: 200,
      //             allowOutsideClick: false,
      //             allowEscapeKey: false,
      //             showConfirmButton: false,
      //             animation: false
      //          });
      //          $http({
      //             method: 'POST',
      //             url: "php/financiera/reportes/funcreportes.php",
      //             data: {
      //                function: 'Cargue_BDUA',
      //                datos: (datosRC)
      //             }
      //          }).then(function (response) {
      //             swal({
      //                title: "Mensaje",
      //                text: "Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo",
      //                type: "success",
      //             })
      //             $scope.respuestata = response.data;
      //          });
      //       }
      //    }).catch(swal.noop);
      // }
      $scope.formatPeso = function (num) {
        if (num != undefined) {
          var regex2 = new RegExp("\\.");
          if (num == '.0000') { return '0,00' }
          if (regex2.test(num)) {
            num = num.toString().replace(".", ",");
            num = num.split(",");
            num[0] = num[0]
              .toString()
              .split("")
              .reverse()
              .join("")
              .replace(/(?=\d*\.?)(\d{3})/g, "$1.");
            num[0] = num[0].split("").reverse().join("").replace(/^[\.]/, "");
            if (num[1].length > 1 && num[1].length > 2) {
              num[1] = num[1].toString().substr(0, 2);
            }
            if (num[1].length == 1) {
              num[1] = num[1] + "0";
            }
            return num[0] + "," + num[1];
          } else {
            num = num
              .toString()
              .split("")
              .reverse()
              .join("")
              .replace(/(?=\d*\.?)(\d{3})/g, "$1.");
            num = num.split("").reverse().join("").replace(/^[\.]/, "");
            return num + "";
          }
        }
      };
      $(window).on('resize', function () {
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100 && $(window).width() < 1300) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1300 && $(window).width() < 1500) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
        if ($(window).width() > 1500) {
          document.querySelector("#pantalla").style.zoom = 0.9;
        }
      });
    }]);
