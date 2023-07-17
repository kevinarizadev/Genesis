"use strict";
angular.module("GenesisApp").controller("modalDetPresctrl", [
  "$scope",
  "$http",
  "ngDialog",
  "mipresHTTP",
  function ($scope, $http, ngDialog, mipresHTTP) {
    $(document).ready(function () {
      $scope.rol = sessionStorage.getItem('cedula');
      
      var dat = { prov: "navb" };
      $.getJSON("php/obtenersession.php", dat)
        .done(function (respuesta) {
          $scope.sesdata = respuesta;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          console.log("navbar error obteniendo variables");
        });
    });

    $scope.insertar_bd_dir_aut = function (arreglo, tipo) {
      $http({
        method: "POST",
        url: "php/recobro/mipres.php",
        // url :"json/recobro/direccionamientos.json",
        data: {
          function: "insertar_dir",
          v_responsable: $scope.sesdata.cedula,
          v_pjson_row_adj: arreglo,
          v_estado: "I",
          v_len: arreglo.length,
        },
      }).then(function (r) {
        swal(r.Titulo, r.Mensaje, "warning");

        if (r.data.Codigo == 1) {
          swal(
            r.data.Titulo,
            "Direccionamientos registrados exitosamente",
            "success"
          );
          $scope.obtener_detalles();

          for (
            let index = 0;
            index < $scope.direccionamientos.length;
            index++
          ) {
            if (
              $scope.direccionamientos[index].EstDireccionamiento == 1 ||
              $scope.direccionamientos[index].EstDireccionamiento == 2
            ) {
              $http({
                method: "POST",
                url: "php/recobro/mipres.php",
                data: {
                  function: "procesa_dir_prestador",
                  v_responsable: $scope.sesdata.cedula,
                  v_no_pres: $scope.info.noprescripcion,
                  v_no_entrega: $scope.direccionamientos[index].NoEntrega,
                  v_iddireccionamiento:
                    $scope.direccionamientos[index].IDDireccionamiento,
                  v_id: $scope.direccionamientos[index].ID,
                  v_tipotec: $scope.direccionamientos[index].TipoTec,
                  prestador: $scope.direccionamientos[index].NoIDProv,
                  fecha_dir:
                    $scope.direccionamientos[index].FecDireccionamiento,
                },
              }).then(function (r) {
                if (index == $scope.direccionamientos.length - 1) {
                  $scope.obtener_detalles();
                  swal.close();
                  swal(
                    "Exito",
                    "Registros Actualizados Correctamente",
                    "success"
                  );
                }
              });
            }
          }
          //$scope.actualiza_direccionamiento();
        } else {
          swal(r.data.Titulo, r.data.Mensaje, "error");
        }
      });
    };

    $scope.direccionamientos_posibles = function (no_pres, con_tec, tipo_tec) {
      $scope.Sum_CantTotAEntregar = 0;
      $http({
        method: "POST",
        url: "php/recobro/mipres.php",
        data: {
          function: "get_direccionamientos_posibles",
          NoPrescripcion: no_pres,
          v_tipo_tec: tipo_tec,
          con_tec: con_tec,
        },
      }).then(function (r) {
        $scope.insertar_bd_dir_aut(r.data, "A");
      });
    };

    $scope.obtener_detalles = function () {
      $http({
        method: "POST",
        url: "php/recobro/mipres.php",
        data: {
          function: "consulta_mipres_afi_detalle",
          tipo_doc: $scope.info.tipodoc,
          doc: $scope.info.documento_afi,
          no_pres: $scope.info.noprescripcion,
        },
      }).then(function (response) {
        $scope.detalles = response.data;

        //objeto_window_referencia = window.open("temp/consolidado_pres.xlsx", "Descarga_Consolidado", configuracion_ventana);
      });
    };

    //consulta_regimen
    $http({
      method: "POST",
      url: "php/recobro/mipres.php",
      data: {
        function: "consulta_regimen",
        tipo_doc: $scope.info.tipodoc,
        doc: $scope.info.documento_afi,
      },
    }).then(function (response) {
      $scope.regimen_afiliado = response.data[0].regimen;
    });

    $scope.obtener_tecnologias = function (data) {
      $http({
        method: "POST",
        url: "php/recobro/mipres.php",
        data: {
          function: "obtener_tecnologias",
          no_pres: data,
        },
      }).then(function (response) {
        $scope.tecnologias = response.data;
        for (let a = 0; a < $scope.tecnologias.length; a++) {
          $scope.direccionamientos_posibles(
            $scope.info.noprescripcion,
            $scope.tecnologias[a].renglon,
            $scope.tecnologias[a].tecnologia
          );
        }
      });
    };

    function parsedia(date) {
      var d = new Date(date);
      var yyyy = d.getFullYear();
      var dd = ('0' + d.getDate()).slice(-2);
      var mm = ('0' + (d.getMonth() + 1)).slice(-2);
      var hh = d.getHours();
      var mi = d.getMinutes();
      return dd + '/' + mm + '/' + yyyy;
    }
    $scope.actualizafechadir = function (data) {
      swal({
        title: '¿Desea Cambiar La fecha de la Prescripcion?',
        text: "Actualizar Fecha",
        type: 'info',
        html:'<input name="fechaprescripcion" id="fechaprescripcion" type="date" class="form-control" autofocus>',
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#d33",
        allowOutsideClick: false
      }).then(function (result) {
        if (result) {
          var fecha = document.getElementsByName('fechaprescripcion')[0].value;
         if(fecha == "" || fecha == undefined || fecha == null) {
          swal(
            "Exito",
            "Por Favor Seleccione una fecha",
            "info"
          );
         } else{
           $http({
             method: "POST",
             url: "php/recobro/mipres.php",
             data: {
               function: "actualizafechas",
               no_pres: data.noprescripcion,
               no_entrega: data.noentrega,
               tecnologia: data.cod_tecnologia,
               responsable: $scope.sesdata.cedula,
               fechaprescripcion:parsedia(fecha)
             },
           }).then(function (response) {
             if (response.data.Codigo == "99") {
               swal("Exito", response.data.Mensaje, "success");
               $scope.obtener_detalles();
             } else {
               swal("Error", response.data.Mensaje, "error");
             }
           });
         }
        }
      })
     

    };

    $scope.obtener_detalles();
    //45457053
    $scope.actualiza_direccionamiento = function () {
      swal({
        title: "Cargando información API SISPRO",
      });
      swal.showLoading();
      mipresHTTP
        .obtener_pornumero(
          $scope.regimen_afiliado,
          $scope.info.noprescripcion,
          true
        )
        .then((data) => {
          $scope.direccionamientos = data;
          if ($scope.detalles.length != $scope.direccionamientos.length) {
            $scope.obtener_tecnologias($scope.info.noprescripcion);
            //$scope.direccionamientos_posibles($scope.info.noprescripcion,$scope.direccionamientos[0].ConTec,$scope.direccionamientos[0].TipoTec);
          } else {
            for (
              let index = 0;
              index < $scope.direccionamientos.length;
              index++
            ) {
              if (
                $scope.direccionamientos[index].EstDireccionamiento == 1 ||
                $scope.direccionamientos[index].EstDireccionamiento == 2
              ) {
                $http({
                  method: "POST",
                  url: "php/recobro/mipres.php",
                  data: {
                    function: "procesa_dir_prestador",
                    v_responsable: $scope.sesdata.cedula,
                    v_no_pres: $scope.info.noprescripcion,
                    v_no_entrega: $scope.direccionamientos[index].NoEntrega,
                    v_iddireccionamiento:
                      $scope.direccionamientos[index].IDDireccionamiento,
                    v_id: $scope.direccionamientos[index].ID,
                    v_tipotec: $scope.direccionamientos[index].TipoTec,
                    prestador: $scope.direccionamientos[index].NoIDProv,
                    fecha_dir:
                      $scope.direccionamientos[index].FecDireccionamiento,
                  },
                }).then(function (r) {
                  if (index == $scope.direccionamientos.length - 1) {
                    $scope.obtener_detalles();
                    swal.close();
                    swal(
                      "Exito",
                      "Registros Actualizados Correctamente",
                      "success"
                    );
                  }
                });
              }
            }
          }
        });
    };

    $scope.procesar_direccionamiento = function () {};
    $scope.archivar_direccionamiento = function (data, respuestas) {
      $http({
        method: "POST",
        url: "php/recobro/mipres.php",
        data: {
          function: "RECHAZA_DIR",
          v_responsable: $scope.sesdata.cedula,
          v_no_pres: data.NoPrescripcion,
          v_no_entrega: data.NoEntrega,
          v_error: respuestas.Errors[0],
        },
      }).then(function (r) {});
    };

    $scope.desasociar_autorizacion = function (detalle) {
      swal({
        title: "Desea Desasociar La Autorizacion Con # de Prescripcion",
        html:
          '<h4 class="media-heading text-primary">' +
          detalle.noprescripcion +
          "</h4>",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
      }).then(function (resp) {
        if (resp) {
          $http({
            method: "POST",
            url: "php/recobro/mipres.php",
            data: {
              function: "Desasociar_Autorizacion",
              v_num_entrega: detalle.noentrega,
              v_num_prescripcion: detalle.noprescripcion,
              v_accion:"A",
              v_numero_autorizacion:detalle.noaut,
              v_cod_diagnostico: null
            },
          }).then(function (response) {
            console.log(response.data);
            if (
                response.data &&
                response.data.toString().substr(0, 3) != "<br"
              ) {
            if (response.data.Codigo == "0") {
                swal("Exito", response.data.Nombre, "success");
                $scope.obtener_detalles();
              } else if (response.data.Codigo == "1") {
                swal("Error", response.data.Nombre, "error");
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
        }
      });
    };


    
    $scope.obtener_detalles = function () {
      console.log($scope.info);
      $http({
        method: "POST",
        url: "php/recobro/mipres.php",
        data: {
          function: "obtenerdetalleafiliado",
          tipodocumento: $scope.info.TipoIDPaciente,
          documento: $scope.info.NroIDPaciente
        },
      }).then(function (response) {
        console.log(response);
        $scope.detalleafiliado = response.data;
      });
    };

    $scope.obtener_detalles();


    $scope.nombreafi =
      $scope.info.PNPaciente +
      " " +
      $scope.info.SNPaciente +
      " " +
      $scope.info.PAPaciente +
      " " +
      $scope.info.SAPaciente;
    $scope.idafi = $scope.info.TipoIDPaciente + " " + $scope.info.NroIDPaciente;
    $scope.nombremed =
      $scope.info.PNProfS +
      " " +
      $scope.info.SNProfS +
      " " +
      $scope.info.PAProfS +
      " " +
      $scope.info.SAProfS;
    $scope.idmed = $scope.info.TipoIDProf + " " + $scope.info.NumIDProf;
  },
]);
