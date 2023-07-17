'use strict';
angular.module('GenesisApp')
.controller('modalSuministrosctrl', ['$scope', '$http', 'ngDialog','mipresHTTP',
  function ($scope, $http, ngDialog,mipresHTTP) {

    console.log($scope.info);

    $scope.suministro = [{
      ID: $scope.info.ID,
      UltEntrega: null,
      EntregaCompleta: null,
      CausaNoEntrega: $scope.info.CausaNoEntrega,
      NoPrescripcionAsociada: $scope.info.NoPrescripcion,
      ConTecAsociada: $scope.info.ConTec,
      CantTotEntregada: $scope.info.CantTotEntregada,
      NoLote: $scope.info.NoLote,
      ValorEntregado: $scope.info.ValorEntregado
    }]; 

    $(document).ready(function () {
      $scope.get_causas();
        var dat = { prov: 'navb' }
        $.getJSON("php/obtenersession.php", dat)
          .done(function (respuesta) {
            $scope.sesdata = respuesta;
          })
          .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("navbar error obteniendo variables");
          });
      });
  
      
      $scope.get_causas = function () {
        $http({
          method: 'POST',
          url: "php/recobro/mipres.php",
          data: {
            function: 'get_no_entregas'
          }
        }).then(function (r) {
         $scope.causas = r.data;
        });
      }
      // $scope.ins_auditoria = function () {
      //   console.log($scope.sesdata); 
      //   $http({
      //     method: 'POST',
      //     url: "php/recobro/mipres.php",
      //     data: {
      //       function: 'ins_auditoria',
      //       usuario: $scope.sesdata.usu,
      //       descripcion: "consulta realizada desde el modulo de MIPRES-LF",
      //       documento: $scope.sesdata.cedula,
      //       evento: "Suministro"
      //     }
      //   }).then(function (response) {
  
      //     $scope.auditoria_insertada = response.data;
      //   });
      // }

    $scope.reportar = function(){
            // console.log($scope.suministro);
            swal({
              title: 'Espere un momento',
              text: 'Reportando Suministro',
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false,
              onOpen: () => {
                swal.showLoading()
              }
            });


          // $scope.dir.FecMaxEnt = formatDate(document.getElementById("fec_ent").valueAsDate);
          //putdireccionamiento
          mipresHTTP.putsuministro($scope.regimen,$scope.suministro).then(function (respuesta) {                  
            $scope.api_response = respuesta;
            if (typeof respuesta.length !== 'undefined' && respuesta.length > 0) {
              swal.close();
              $scope.succefull = "ID:"+respuesta[0].Id+" Id Suministro: "+respuesta[0].IdSuministro;
                    swal('Exito',$scope.succefull, 'success');
                    $scope.procesar_suministro(respuesta);
                  } else {
                    swal('Error',respuesta.Message, 'error')
                    $scope.archivar_suministro(respuesta);
                  }

            })

        }

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
    
        $scope.anular_Suministro = function(id){
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
              'v_consecutivo': $scope.consecutivo ,
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
       }]);
