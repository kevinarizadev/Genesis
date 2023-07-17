"use strict";
angular.module("GenesisApp").controller("suministroController", [
  "$scope",
  "$http",
  "mipresHTTP",
  "notification",
  "$timeout",
  "$rootScope",
  "$window",
  "ngDialog",
  "Popeye",
  "FileProcessor",
  function (
    $scope,
    $http,
    mipresHTTP,
    notification,
    $timeout,
    $rootScope,
    $window,
    ngDialog,
    Popeye,
    FileProcessor
  ) {
    //variables de control


    $(document).ready(function () {
      var dat = { prov: 'navb' }
      $.getJSON("php/obtenersession.php", dat)
        .done(function (respuesta) {
          $scope.sesdata = respuesta;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          console.log("navbar error obteniendo variables");
        });
    });

    $scope.tabI = true;
    $scope.tabII = false;
    $scope.tabIII = false;
    $scope.tabIV = false;
    $scope.activeI = "active final white-text";
    $scope.activeII = "none";
    $scope.activeIII = "none";
    $scope.activeIV = "none";
    $scope.activeIcolor = "foot4";
    $scope.activeIIcolor = "";
    $scope.activeIIIcolor = "";
    $scope.activeIVcolor = "";
    $scope.nametab = "Autorización";
    $scope.ver_dir = true;
    $scope.vw_dir = false;
    $scope.tit = "Fecha";
    // variables TAB I
    //variables KEVO
    $scope.regimen = "";
    $scope.verMipres = true;
    $scope.verDirxNO = true;

    $scope.hide_serchdir = function () {
      $scope.vw_dir = !$scope.vw_dir;
      $scope.verMipres = true;
    }

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
    $scope.inactivetagtutela = true;
    $scope.inactivetagsiniestro = true;
    $scope.nameservicio = "de orden";
    $scope.ver_historico = true;
    $scope.inactivebarrapro = true;
    $scope.causas = "";

    $scope.init = function () {
      $scope.direccionar_disabler = true;
      $scope.tabI = true;
      $scope.tabII = false;
      $scope.tabIII = false;
      $scope.tabIV = false;
      $scope.activeI = "active final";
      $scope.activeII = "none";
      $scope.activeIII = "none";
      $scope.activeIV = "none";
      $scope.activeIcolor = "";
      $scope.activeIIcolor = "";
      $scope.activeIIIcolor = "";
      $scope.activeIVcolor = "";
      $scope.ver_historico = true;
    };

    $(".file-field").on("change", "#adjunto", function () {
      console.log(1);
      var archivo = $(this).val().replace(/.*(\/|\\)/, '').split(".");
      var ext = archivo[1];
      if ($(this)["0"].files.length > 0) { // se valida que exista el archivo
        if (ext.toUpperCase() != 'XLS') { //se valida el tipo del archivo
          swal('Tipo de archivo incorrecto', 'Extension del archivo incorrecta debe ser .XLS', 'warning')
          $(this).val("");
        }
      }
    })

    $scope.enviaradj = function () {
      if (document.querySelector("#adjunto").files.length > 0) {


        swal({
          title: 'Cargando Suministros a Base de datos Genesis'
        });
        swal.showLoading();
        //Cargar archivo Xls a PHP para procesar y convertir a JSON
        FileProcessor.read(document.querySelector("#adjunto").files[0]).then(
          data => {
            $http({
              url: "php/recobro/upload_dir.php",
              // url: "json/recobro/entregas.json",
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              data: {
                file: data
              }
            }).then(response => {
              if (Object.keys(response.data[0][0]).length == 19) {


                $scope.upload_direccionamientos = response.data;
                //upload_direccionamientos JSON datos cargados, al obtener respuesta se carga a la BD para procesamiento
                $http({
                  method: 'POST',
                  url: "php/recobro/suministro.php",
                  data: {
                    function: 'insertar_suministro',
                    'v_responsable': $scope.sesdata.cedula,
                    'v_pjson_row_adj': $scope.upload_direccionamientos,
                    'v_estado': 'I',
                    'v_len': $scope.upload_direccionamientos.length
                  }
                }).then(function (r) {
                  //r es la respuesta de la BD al cargue de los direccionamientos, RESPETAR LLAVE PRIMARIA de la tabla
                  $scope.consecutivo = r.data.Consecutivo;
                  swal.close();
                  if (r.data.Codigo == 1) {
                    swal(r.data.Titulo, r.data.Mensaje, 'success')
                    swal({
                      title: 'Cargando suministros Masivos API SISPRO'
                    });
                    swal.showLoading();
                    $scope.ver_dir = false;

                    $http({
                      method: 'POST',
                      // url:'json/tic/test.json',
                      url: "php/recobro/suministro.php",
                      data: { function: 'obtener_suministro', 'v_consecutivo': r.data.Consecutivo }
                    }).then(function (respuesta) {
                      swal.close();
                      //en la funcion obtener dir, se hace le direccionamiento masivo
                      // console.log(respuesta.data);
                      $scope.api_response = respuesta.data;

                      $scope.mapeado = $scope.api_response.map(item => {
                        const newItem = item;
                        if (newItem.respuesta === null) {
                          newItem.respuesta = {};
                          newItem.respuesta.Message = "Error al cargar";
                          return newItem;
                        } else {
                          if (typeof item.respuesta.Errors !== 'undefined') {
                            if (item.respuesta.Errors === null) {
                              newItem.respuesta.Message = "Error al cargar";
                            } else {
                              if (typeof item.respuesta.Errors.length !== 'undefined' && item.respuesta.Errors.length > 0) {
                                newItem.success = false;
                                newItem.modal = typeof item.respuesta.Errors !== 'undefined' && item.respuesta.Errors.length > 0;
                              }
                            }

                            // newItem.error = typeof item.respuesta.ModelState !== 'undefined';
                            $scope.archivar_suministro(item);
                            return newItem;
                            // newItem.error = typeof item.respuesta.ModelState !== 'undefined';
                          } else {

                            newItem.success = true;
                            $scope.procesar_suministro(item);
                            return newItem;
                          }
                        }



                      })
                      // console.log("terminado aqui se ejecuta correo");
                      $scope.envia_correo();
                    });
                  } else {
                    swal(r.data.Titulo, r.data.Mensaje, 'error')
                  }
                  // $scope.ver_dir = false;



                });

              } else {
                swal.close();
                swal('Error', 'Archivo con numero de columnas invalido', 'error');
              }

            });
          })
      } else {
        swal('Mensaje', 'Debe adjuntar un documento en Excel (XLS)', 'info');
      }
    };

    $scope.procesar_suministro = function (data) {
      $http({
        method: 'POST',
        url: "php/recobro/mipres.php",
        data: {
          function: 'insertar_sum',
          'v_responsable': $scope.sesdata.cedula,
          'v_pjson_row_adj': data,
          'v_estado': 'P',
          'v_len': 1
        }
      }).then(function (r) {

      });
    }

    $scope.anular_Suministro = function (id) {
      swal({
        title: 'Confirmar Proceso',
        text: '¿Desea anular este suministro?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then(function () {

        $http({
          method: 'POST',
          url: "php/recobro/mipres.php",
          data: {
            function: 'anula_sum',
            'v_idsum': id
          }
        }).then(function (r) {
          // [""0""].Mensaje
          if (r.data.length > 0 && typeof r.data[0].Mensaje !== 'undefined') {
            $scope.mensaje_anu = r.data.Message + ' ' + r.data.Errors;
            swal('Exito', r.data[0].Mensaje, 'success');
          } else {
            $scope.mensaje_anu = r.data.Message + ' ' + r.data.Errors;
            swal('Error', $scope.mensaje_anu, 'error');
          }

        });
      }).catch(swal.noop);
    }

    $scope.envia_correo = function () {
      $http({
        method: 'POST',
        url: "php/recobro/suministro.php",
        data: {
          function: 'envia_data',
          'v_consecutivo': $scope.consecutivo,
          'v_tipo': 'S',
          'v_responsable': $scope.sesdata.cedula,
          'v_len': $scope.upload_direccionamientos.length
        }
      }).then(function (r) {

      });
    }

    $scope.archivar_suministro = function (data) {
      $http({
        method: 'POST',
        url: "php/recobro/mipres.php",
        data: {
          function: 'insertar_sum',
          'v_responsable': $scope.sesdata.cedula,
          'v_pjson_row_adj': data,
          'v_estado': 'R',
          'v_len': 1
        }
      }).then(function (r) {

      });
    }

    $scope.anular_direccionamiento = function (id) {
      swal({
        title: 'Confirmar Proceso',
        text: '¿Desea anular este direccionamiento?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then(function () {
        $http({
          method: 'POST',
          url: "php/recobro/mipres.php",
          data: {
            function: 'anula_dir',
            'v_iddir': id
          }
        }).then(function (r) {
          // [""0""].Mensaje
          if (r.data.length > 0 && typeof r.data[0].Mensaje !== 'undefined') {
            $scope.mensaje_anu = r.data.Message + ' ' + r.data.Errors;
            swal('Exito', r.data[0].Mensaje, 'success');
          } else {
            $scope.mensaje_anu = r.data.Message + ' ' + r.data.Errors;
            swal('Error', $scope.mensaje_anu, 'error');
          }

        });
      }).catch(swal.noop);
    }

    $scope.historico_direccionados = function () {
      // swal({
      //   title: 'Consultando Historico Direccionamientos Masivo'
      // });
      // swal.showLoading();
      $http({
        method: 'POST',
        url: "php/recobro/mipres.php",
        data: {
          function: 'historico_dir',
          'v_presponsable': $scope.sesdata.cedula
        }
      }).then(function (response) {
        // swal.close();
        if (response.data[0].CODIGO == 0) {
          swal('Error', 'Ha ocurrido un error, contactar con el administrador del sistema', 'error')
        } else {
          $scope.ver_historico = false;
          $scope.historico = response.data;
        }
      });
    }

    $scope.setTab = function (opcion) {
      $scope.ver_dir = true;
      $scope.init();
      switch (opcion) {
        case 1:
          $scope.tabI = true;
          $scope.tabII = false;
          $scope.tabIII = false;
          $scope.tabIV = false;
          $scope.activeI = "active final white-text";
          $scope.activeII = "none";
          $scope.activeIII = "none";
          $scope.activeIV = "none";
          $scope.activeIcolor = "foot4";
          $scope.nametab = "Autorización";
          $scope.tipoaut = "1";
          break;
        case 2:
          $scope.tabI = false;
          $scope.tabII = true;
          $scope.tabIII = false;
          $scope.tabIV = false;
          $scope.activeI = "none";
          $scope.activeII = "active final white-text";
          $scope.activeIII = "none";
          $scope.activeIV = "none";
          $scope.activeIIcolor = "foot4";
          $scope.nametab = "Autorización Programada";
          $scope.titletabII = "Solicitud";
          $scope.tipoaut = "2";
          break;
        case 3:
          $scope.tabI = false;
          $scope.tabII = false;
          $scope.tabIII = true;
          $scope.tabIV = false;
          $scope.activeI = "none";
          $scope.activeII = "none";
          $scope.activeIII = "active final white-text";
          $scope.activeIV = "none";
          $scope.activeIIIcolor = "foot4";
          $scope.nametab = "Productos";
          break;
        case 4:
          $scope.tabI = false;
          $scope.tabII = false;
          $scope.tabIII = false;
          $scope.tabIV = true;
          $scope.activeI = "none";
          $scope.activeII = "none";
          $scope.activeIII = "none";
          $scope.activeIVcolor = "foot4";
          $scope.activeIV = "active final white-text";
          $scope.nametab = "Consulta de Autorización";
          $scope.tipoaut = "4";
          break;
        default:
      }
    };
    $scope.setTab(1);

    $scope.buscar_no = function (numero_presc, regimen_no, url) {
      swal({
        title: 'Cargando información API SISPRO'
      });
      swal.showLoading();
      mipresHTTP.obtener_pornumero(regimen_no, numero_presc, 's').then(data => {
        swal.close();
        $scope.verMipres = false;
        $scope.Suministros = data;
        $scope.SuministrosTemp = $scope.Suministros;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.configPages();
      });
    };

    $scope.buscar_sum_pres = function (no_pres, regimenh, url) {
      swal({
        title: 'Cargando información API SISPRO'
      });
      swal.showLoading();

      $http({
        method: 'POST',
        url: "php/recobro/suministro.php",
        data: {
          function: 'get_suministro_pres',
          'no': no_pres,
          'regimen': regimenh
        }
      }).then(function (response) {
        swal.close();
        $scope.verMipres = false;
        $scope.Suministros = response.data;
        $scope.SuministrosTemp = $scope.Suministros;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.configPages();
      })
    }


    $scope.search = function () {
      swal({
        title: 'Cargando información API SISPRO'
      });
      swal.showLoading();
      const fecha_i = formatDate($scope.fecha_i);
      const fecha_f = formatDate($scope.fecha_f);
      // mipresHTTP.obtener_porfecha($scope.regimen, fecha_i, fecha_f,"false")
      $http({
        method: 'POST',
        url: "php/recobro/suministro.php",
        //  url:"json/recobro/consulta_suministro_fecha.json",
        data: {
          function: 'rango__fecha',
          'fecha_i': formatDate($scope.fecha_i),
          'fecha_f': formatDate($scope.fecha_f),
          'regimen': $scope.regimen,
          'tipo': 'T'
        }
      }).then(function (response) {
        swal.close();
        $scope.verMipres = false;

        //  $scope.suministros = response.data;
        // $scope.SuministrosTemp = $scope.Suministros;          
        let consolidado = [];
        const datosFiltrados = response.data.filter(dia => dia.length > 0)

        datosFiltrados.forEach(dia => {
          dia.forEach(pr => {

            const textMap = {
              // CodPerDurTrat
              EstDireccionamiento: {
                '0': 'Por Direccionar',
                '1': 'Direccionado',
                '2': 'No direccionado',
                '3': 'Estado sin definir'
              }

            }
            const newItem = {};
            Object.keys(pr).forEach(key => {
              if (textMap[key]) {
                if (pr[key] === null) {
                  newItem[key] = 'No Aplica'
                } else {
                  newItem[key] = textMap[key][pr[key]]
                }
              } else {
                newItem[key] = pr[key]
              }
            });
            consolidado.push(newItem)
          })

        })


        $scope.newarray = consolidado;
        $scope.Suministros = consolidado;
        $scope.SuministrosTemp = consolidado;


        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 50;
        $scope.pages = [];
        $scope.configPages();
      });
    };

    $scope.open_modal = function (modal, datos_dir) {
      $scope.info = datos_dir;
      $scope.case = modal;
      switch (modal) {
        case "detail":
          ngDialog.open({
            templateUrl: "views/recobro/modal/modalExito.html",
            className: "ngdialog-theme-plain",
            controller: "modalExito",
            scope: $scope
          });
          break;
        case "err":
          ngDialog.open({
            templateUrl: "views/recobro/modal/modalDetalleErr.html",
            className: "ngdialog-theme-plain",
            controller: "modalDetalleErr",
            scope: $scope
          });
          break;

        case "modal":
          ngDialog.open({
            templateUrl: "views/recobro/modal/modalDetalleErr.html",
            className: "ngdialog-theme-plain",
            controller: "modalDetalleErr",
            scope: $scope
          });
          break;

        case "edit":
          ngDialog.open({
            templateUrl: "views/recobro/modal/modaleditErr.html",
            className: "ngdialog-theme-plain",
            controller: "modalEditDir",
            scope: $scope
          });
          break;

        default:
          break;
      }
    };

    $scope.detaildir = function (id_dir) {
      // swal('Yay',id_dir, 'success')
      mipresHTTP.s_detaildir($scope.regimen, id_dir).then(function (r) {
        swal.close();
        $scope.verMipres = false;
        $scope.Suministros = r;
        console.log(r);
      });
    };

    $scope.configPages = function () {
      $scope.pages.length = 0;
      var ini = $scope.currentPage - 4;
      var fin = $scope.currentPage + 5;
      if (ini < 1) {
        ini = 1;
        if (Math.ceil($scope.SuministrosTemp.length / $scope.pageSize) > $scope.valmaxpag)
          fin = 10;
        else
          fin = Math.ceil($scope.SuministrosTemp.length / $scope.pageSize);
      } else {
        if (ini >= Math.ceil($scope.SuministrosTemp.length / $scope.pageSize) - $scope.valmaxpag) {
          ini = Math.ceil($scope.SuministrosTemp.length / $scope.pageSize) - $scope.valmaxpag;
          fin = Math.ceil($scope.SuministrosTemp.length / $scope.pageSize);
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
      console.log($scope.Suministros.length / $scope.pageSize - 1)
    }

    $scope.filter = function (val) {
      $scope.SuministrosTemp = $filter('filter')($scope.Suministros, val);
      if ($scope.SuministrosTemp.length > 0) {
        $scope.setPage(1);
      }
      $scope.configPages();
    }

    function formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    }

  }
]);
