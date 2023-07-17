"use strict";
angular.module("GenesisApp").controller("MIPREScontroller", [  "$scope",  "$http",  "mipresHTTP",  "notification",  "$timeout",  "$rootScope",  "$window",  "ngDialog",  "Popeye",  "FileProcessor",
  function (    $scope,    $http,    mipresHTTP,    notification,    $timeout,    $rootScope,    $window,    ngDialog,    Popeye,    FileProcessor  ) {

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
    $scope.resumen_anular_masivo = [];
    $scope.verDirxNO = true;

    $scope.hide_serchdir = function(){
      $scope.vw_dir = !$scope.vw_dir;
      $scope.verMipres = true;
    }
       $scope.hide_null = function(){
      $scope.vw_null = !$scope.vw_null;
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
$scope.Obtener_Tipos_Documentos();

    $scope.enviaradj = function () {
      	swal({
					title: 'Cargando información API SISPRO'
				});
        swal.showLoading();
        //Cargar archivo Xls a PHP para procesar y convertir a JSON
       FileProcessor.read(document.querySelector("#adjunto").files[0]).then(
        data => {
          $http({
            url: "php/recobro/upload_dir.php",
            // url :"json/recobro/direccionamientos.json",
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            data: {
              file: data
            }
          }).then(response => {
            if (Object.keys(response.data[0][0]).length == 17) {
              
            $scope.upload_direccionamientos = response.data;
            //upload_direccionamientos JSON datos cargados, al obtener respuesta se carga a la BD para procesamiento
            $http({
              method: 'POST',
              url: "php/recobro/mipres.php",
              // url :"json/recobro/direccionamientos.json",
              data: {
                function: 'insertar_dir',
                'v_responsable': $scope.sesdata.cedula,
                'v_pjson_row_adj': $scope.upload_direccionamientos,
                'v_estado': 'I',
                'v_len': $scope.upload_direccionamientos.length
              }
            }).then(function (r) {
              //r es la respuesta de la BD al cargue de los direccionamientos, RESPETAR LLAVE PRIMARIA de la tabla
              $scope.consecutivo = r.data.Consecutivo;
              if (r.data.Codigo == 1) {
                swal(r.data.Titulo, r.data.Mensaje, 'success') 
                swal({
                      title: 'Cargando suministros Masivos API SISPRO'
                    });
                swal.showLoading();
                

                $http({
                  method: 'POST',
                  url: "php/recobro/mipres.php",
                  // url :"json/tic/test.json",
                  data: { function: 'obtener_dir', 'v_consecutivo': r.data.Consecutivo}
                }).then(function (respuesta) {
                  //en la funcion obtener dir, se hace le direccionamiento masivo
                  // console.log(respuesta.data);
                  swal.close();
                  $scope.api_response = respuesta.data;
                  

                  $scope.mapeado = $scope.api_response.map(item => {
                    const newItem = item;
                    if (typeof item.respuesta.length !== 'undefined' && item.respuesta.length > 0) {
                      newItem.success = true;
                      $scope.procesar_direccionamiento(item,$scope.api_response);
                      return newItem;
                      // newItem.error = typeof item.respuesta.ModelState !== 'undefined';
                    } else {
                      $scope.archivar_direccionamiento(item,$scope.api_response); 
                      newItem.success = false;
                      newItem.modal = typeof item.respuesta.Errors !== 'undefined' && item.respuesta.Errors.length > 0;
                      newItem.error = typeof item.respuesta.ModelState !== 'undefined';
                      return newItem;
                    }
                  })
                  $scope.envia_correo();
                  // $scope.res_masivo = mapeado;
                });
              } else {
                swal(r.data.Titulo, r.data.Mensaje, 'error')
              }
              // $scope.ver_dir = false;

              // swal(r.data.Titulo, r.data.Mensaje, 'success')
              $scope.ver_dir = false;
            });
          }else {
            swal.close();
            swal('Error','Archivo con numero de columnas invalido','error');
          }
          });
        })
    };

     $scope.enviaradj_anular = function () {
        swal({
          title: 'Cargando información API SISPRO'
        });
        swal.showLoading();
        //Cargar archivo Xls a PHP para procesar y convertir a JSON
        FileProcessor.read(document.querySelector("#adjunto_anular").files[0]).then(
        data => {
          $http({
            url: "php/recobro/upload_dir.php",
            // url :"json/recobro/direccionamientos.json",
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            data: {
              file: data
            }
          }).then(response => {
            if (Object.keys(response.data[0][0]).length == 2) {
              
            $scope.upload_direccionamientos_anulados = response.data;
            //upload_direccionamientos JSON datos cargados, al obtener respuesta se carga a la BD para procesamiento
            $http({
              method: 'POST',
              url: "php/recobro/mipres.php",
              // url :"json/recobro/direccionamientos.json",
              data: {
                function: 'insertar_anular',
                'v_pjson_row_adj': $scope.upload_direccionamientos_anulados,
                'v_estado': 'I',
                'v_len': $scope.upload_direccionamientos_anulados.length
              }
            }).then(function (r) {
              //r es la respuesta de la BD al cargue de los direccionamientos, RESPETAR LLAVE PRIMARIA de la tabla
             // console.log(r);

              $scope.consecutivo = r.data.Consecutivo;
              if (r.data.Codigo == 1) {
                swal(r.data.Titulo, r.data.Mensaje, 'success') 
                swal({
                      title: 'Cargando Anular Masivo API SISPRO'
                    });
                swal.showLoading();
                $scope.ver_dir = false; 


                $http({
                  method: 'POST',
                  url: "php/recobro/mipres.php",
                  // url :"json/tic/test.json",
                  data: { function: 'get_cargue_anulados',
                          'v_consecutivo': r.data.Consecutivo}
                }).then(function (respuesta) {
                  //console.log('Entro');
                  for (var i = respuesta.data.length - 1; i >= 0; i--) {
                    $scope.anular_direccionamiento_masivo(respuesta.data[i].CODIGO, r.data.Consecutivo);
                  } 

                  $scope.marcacion_bd($scope.resumen_anular_masivo);                 

                });
              } else {
                swal(r.data.Titulo, r.data.Mensaje, 'error')
              }
              // $scope.ver_dir = false;

              // swal(r.data.Titulo, r.data.Mensaje, 'success')
              $scope.ver_dir = false;
            });
          }else {
            swal.close();
            swal('Error','Archivo con numero de columnas invalido','error');
          }
          });
        })
    };

  $scope.anular_direccionamiento_masivo = function (id,consecutivo) {
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
            //exito
          $scope.elemento = {
            estado : 'P',
            id_dir: id,
            id_cargue: consecutivo,
            descripcion: r.data[0].Mensaje
          };
            $scope.resumen_anular_masivo.push($scope.elemento);
          } else {
            //error
          $scope.elemento = {
            estado : 'E',
            id_dir: id,
            id_cargue: consecutivo,
            descripcion: r.data.Errors[0]
          };
            $scope.resumen_anular_masivo.push($scope.elemento);
          }

        });
    }
       $scope.marcacion_bd = function(arreglo){
      $http({
        method: 'POST',
        url: "php/recobro/mipres.php",
        data: {
          function: 'P_UI_DIRANULA',
          'v_pjson_row_adj': arreglo,
          'v_estado': 'U',
          'v_len': arreglo.length
        }
      }).then(function (r) {        
        swal.close();
        swal('success',r.data.mensaje,'success');
      });
   }
    // $scope.procesar_direccionamiento = function (data) {
    //   $http({
    //     method: 'POST',
    //     url: "php/recobro/mipres.php",
    //     data: {
    //       function: 'insertar_dir',
    //       'v_responsable': $scope.sesdata.cedula,
    //       'v_pjson_row_adj': data,
    //       'v_estado': 'P',
    //       'v_len': 1
    //     }
    //   }).then(function (r) {        
    //     $scope.envia_sms(r.data.Celular);
    //   });
    // }

    // $scope.archivar_direccionamiento = function (data) {
    //   $http({
    //     method: 'POST',
    //     url: "php/recobro/mipres.php",
    //     data: {
    //       function: 'insertar_dir',
    //       'v_responsable': $scope.sesdata.cedula,
    //       'v_pjson_row_adj': data,
    //       'v_estado': 'R',
    //       'v_len': 1
    //     }
    //   }).then(function (r) {

    //   });
    // }

      $scope.procesar_direccionamiento = function (data,respuestas) {
  $http({
  method: 'POST',
  url: "php/recobro/mipres.php",
  data: {
  function: 'procesa_dir',
  'v_responsable': $scope.sesdata.cedula,
  'v_no_pres':data.NoPrescripcion,
  'v_no_entrega':data.NoEntrega,
  'v_tipo_tec': data.TipoTec,
  'v_iddireccionamiento':respuestas[0].IdDireccionamiento,
  'v_id':respuestas[0].Id 
  }
  }).then(function (r) {        
  //    $scope.envia_sms(r.data.Celular);
  });
  }  
  $scope.archivar_direccionamiento = function (data,respuestas) {
  $http({
  method: 'POST',
  url: "php/recobro/mipres.php",
  data: {
  function: 'RECHAZA_DIR',
  'v_responsable': $scope.sesdata.cedula,
  'v_no_pres':data.NoPrescripcion,
  'v_no_entrega':data.NoEntrega,
  'v_tipo_tec': data.TipoTec,
  'v_error': respuestas.Errors[0]
  }
  }).then(function (r) {

  });
  },$scope.api_response
    $scope.actualiza_estado_dir = function (id) {
           $http({
          method: 'POST',
          url: "php/recobro/mipres.php",
          data: {
            function: 'actualiza_estado_dir',
            'v_iddir': id,
            'v_responsable': $scope.sesdata.cedula
          }
        }).then(function (response) {
          console.log(response.data);
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
              $scope.actualiza_estado_dir(id);
            $scope.mensaje_anu = r.data.Message + ' ' + r.data.Errors;
            swal('Exito', r.data[0].Mensaje, 'success');
          } else {
            $scope.mensaje_anu = r.data.Message + ' ' + r.data.Errors;
            swal('Error', $scope.mensaje_anu, 'error');
          }

        });
      }).catch(swal.noop);
    }

    $scope.envia_sms = function(num){
      // $http({
      //   method: 'POST',
      //   url: "https://api.infobip.com/sms/1/text/single",
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'authorization': 'Basic Y2FqYWZhbWlsaWFyOkNvbG9tYmlhMjAxNw==',
      //     'accept': 'application/json'
      //   },
      //   data: {
      //     "from": "Cajacopi EPS",
      //     "to": "57" + num,
      //     "text": "Cajacopi Eps le informa que su prescripcion fue direccionada exitosamente, favor dirigirse a la oficina de Domedical IPS mas cercana."          
      //   }
      // }).then(function (response) {
      //   console.log(response);
      // })
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
          swal('Error','Ha ocurrido un error, contactar con el administrador del sistema', 'error')
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

    $scope.envia_correo = function () {
      $http({
        method: 'POST',
        url: "php/recobro/suministro.php",
        data: {
          function: 'envia_data',
          'v_consecutivo': $scope.consecutivo ,
          'v_tipo':'D',
          'v_responsable': $scope.sesdata.cedula,
          'v_len': $scope.upload_direccionamientos.length
        }
      }).then(function (r) {
        $scope.ver_dir = false;
      });
    }

    $scope.buscar_no = function (numero_presc,regimen_no,url) {
      	swal({
					title: 'Cargando información API SISPRO'
				});
				swal.showLoading();
      mipresHTTP.obtener_pornumero(regimen_no, numero_presc,true).then(data => {
        swal.close();
        $scope.verMipres = false;
        $scope.direccionamientos = data;
        $scope.direccionamientosTemp = $scope.direccionamientos;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.configPages();
      });
    };

    $scope.search = function () {
      swal({
        title: 'Cargando información API SISPRO'
      });
      swal.showLoading();
      const fecha_i = formatDate($scope.fecha_i);
      const fecha_f = formatDate($scope.fecha_f);
      mipresHTTP.obtener_porfecha($scope.regimen, fecha_i, fecha_f,"false").then(data => {
       swal.close();
       $scope.verMipres = false;    
      // $scope.direccionamientos = data;
      // $scope.direccionamientosTemp = $scope.direccionamientos;
      
      
      
      
      
      
      let consolidado = [];

      const datosFiltrados = data.filter(dia => dia.length > 0)

      datosFiltrados.forEach(dia => {
          dia.forEach(pr => {  
            
              const textMap = {
              // CodPerDurTrat
              EstDireccionamiento: {
                  '0':'Anulado',
                  '1': 'Activo',
                  '2': 'Procesado',
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
      $scope.direccionamientos = consolidado;
      $scope.direccionamientosTemp = consolidado;
                       
           
      $scope.currentPage = 0;
      $scope.pageSize = 10;
      $scope.valmaxpag = 50;
      $scope.pages = [];
      $scope.configPages();
    });
   };

    $scope.consolidado = function(){
    console.log($scope.newarray)
    $http({
        method: 'POST',
        url: "php/recobro/genera_xls.php",
        data: {
          function: 'exportado_excel',
          datos: $scope.direccionamientos
        }
      }).then(function (r) {
        var link = document.createElement("a");
        link.download = name;
        link.href = 'php/recobro/consolidado_pres2.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // delete link;
      });

   }

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
        $scope.direccionamientos = r;
        console.log(r);
      });
    };
    
    $scope.configPages = function () {
      $scope.pages.length = 0;
      var ini = $scope.currentPage - 4;
      var fin = $scope.currentPage + 5;
      if (ini < 1) {
        ini = 1;
        if (Math.ceil($scope.direccionamientosTemp.length / $scope.pageSize) > $scope.valmaxpag)
          fin = 10;
        else
          fin = Math.ceil($scope.direccionamientosTemp.length / $scope.pageSize);
      } else {
        if (ini >= Math.ceil($scope.direccionamientosTemp.length / $scope.pageSize) - $scope.valmaxpag) {
          ini = Math.ceil($scope.direccionamientosTemp.length / $scope.pageSize) - $scope.valmaxpag;
          fin = Math.ceil($scope.direccionamientosTemp.length / $scope.pageSize);
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
      console.log($scope.direccionamientos.length / $scope.pageSize - 1)
    }
    
    $scope.filter = function (val) {
      $scope.direccionamientosTemp = $filter('filter')($scope.direccionamientos, val);
      if ($scope.direccionamientosTemp.length > 0) {
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
