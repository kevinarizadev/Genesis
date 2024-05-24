'use strict';

angular.module('GenesisApp')

    .controller('gestioncodigoController', ['$scope', '$http', '$filter', 'ngDialog', '$timeout', function ($scope, $http, $filter, ngDialog, $timeout) {
        $(document).ready(function () {
          $scope.Tabs = 1;

            $scope.cedulaautorizada = false;
            $scope.versiguiente = true;
            $scope.verdatoscodigo = false;
            $scope.verdatoscodigounico = false;
            $('#modalgestioncodigo').modal();
            $("#Modal_Detalle").modal();
            $scope.Tabs = 0;
            $('.tabs').tabs();
            $scope.Vista = 0;
            $scope.Tap = 1;
            $('.tabs').tabs();
          var autorizadda =  sessionStorage.getItem('cedula');
          if(autorizadda == '32744809' || autorizadda == '1044390382'|| autorizadda == '3731037' || autorizadda == '1045307221'){
            $scope.cedulaautorizada = true;
          }else{
            $scope.cedulaautorizada = false;
          }
          $scope.VerCantidadCodigos();
        });
        $scope.setTab = function (x) {
          $scope.Tap = x;
          setTimeout(function () {
            $scope.$apply();
          }, 500)
        }
        $scope.VerCantidadCodigos= function() {
          $http({
            method:'POST',
            url:"php/siau/gestioncodigo.php",
            data: {function:'Cantidadpendientes'}
          }).then(function(response){
              $scope.cantidadpendientes = response.data[0].CANTIDAD;
          })
        }
    
        $scope.VerMotivosRechazo = function() {
            $http({
              method:'POST',
              url:"php/siau/CodigoUrgencia/Ccodigourgencia.php",
              data: {function:'MotivosRechazos'}
            }).then(function(response){
                $scope.motivosrechazos = response.data;
            })
          }

        $scope.llamargestion = function () {
            $scope.VerMotivosRechazo();
            $scope.datosdelcodico = [];
            swal({ title: 'Buscando...' });
            swal.showLoading();
            $http({
                method: 'POST',
                url: "php/siau/gestioncodigo.php",
                data: { function: 'p_llamar_cod_urgencia' }
            }).then(function (response) {
                console.log(response.data[0]);
                if (response.data.length > 0) {
                    $scope.versiguiente = false;
                    $scope.verdatoscodigo = true;
                    $scope.datosdelcodico = response.data[0];
                    $scope.obtenerhistorico();
                } else {

                }
                swal.close();
            });
        }
        $scope.obtenerunico = function () {
            $scope.VerMotivosRechazo();
            $scope.datosdelcodico = [];
            swal({ title: 'Buscando...' });
            swal.showLoading();
            $http({
                method: 'POST',
                url: "php/siau/gestioncodigo.php",
                data: { function: 'p_llamar_cod_urgencia_especifico',codigo:$scope.codigobuscar }
            }).then(function (response) {
                console.log(response.data[0]);
                if (response.data.length > 0) {
                    $scope.verdatoscodigounico = true;
                    $scope.datosdelcodico = response.data[0];
                } else {

                }
                swal.close();
            });
        }
        $scope.retroceder = function(){
            $scope.versiguiente = true;
            $scope.verdatoscodigo = false;
        }
        $scope.abrirmodalgestion = function(){
          $('#Modal_Detalle').modal('open');
        }
        $scope.viewDocument = function (ftp) {
          if (ftp == 1) {
            $http({
              method: 'POST',
              url: "php/juridica/tutelas/functutelas.php",
              data: { function: 'descargaAdjunto', ruta: $scope.datosdelcodico.ADJUNTO }
            }).then(function (response) {
              window.open("temp/" + response.data);
            });
          }
          if (ftp == 2) {
            $http({
              method: 'POST',
              url: "php/getfileSFtp.php",
              data: { function: 'descargaAdjunto', ruta: $scope.datosdelcodico.ADJUNTO }
            }).then(function (response) {
              window.open("temp/" + response.data);
            });
          }
        }
        $scope.guardargestionrechazo = function(){
            swal({
              title: 'Seleccionar Motivo y Escribir la Observacion',
              showCancelButton: true,
              allowEscapeKey: false,
              allowOutsideClick: false,
              html: `<div class="row">
              <div class="input-field col s12" style="padding:0">
                                      <label for="motivoanulacion2" style="margin-top: -20px;"> Motivo: <span
                                          style="color:red;">*</span>
                                      </label>
                                      <select id="motivoanulacion2" value="${this.MOTIVO}" class="select-chosen-eps">
                                        <option value="">MOTIVO DE RECHAZO</option>
                                        ${$scope.motivosrechazos.map(dat => `<option value="${dat.MOTIVO}">${dat.NOMBRE}</option>`)}
                                      </select>
                                    </div>
                                      <div class="input-field col s12" style="padding:0">
                                      <textarea id="justificacionanulacion2" class="materialize-textarea" style="max-height: 10em;
                                                      overflow: auto;text-transform:uppercase"></textarea>
                                      <label for="observacion">Observacion Negacion: <span style="color:red;">*</span></label>
                                    </div>
          </div>`,
              preConfirm: function () {
                return new Promise(function (resolve) {
                    resolve([
                      $('#motivoanulacion2').val(),
                      $('#justificacionanulacion2').val(),
                  ])
                  
                });
              }
            }).then(function (result) {
              swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
              });
              if (result[0] && result[1]) {
                 var  motivo_rechazo = result[0];
                   var justificacion_rechazo = result[1];
                $http({
                  method: 'POST',
                  url: "php/siau/gestioncodigo.php",
                  data: { function: 'p_u_codigo_urgencia', 
                  v_pcodigo:$scope.datosdelcodico.NUMERO,
                  v_pubicacion:$scope.datosdelcodico.UBICACION,
                  v_pafiliado:$scope.datosdelcodico.DOCUMENTO,
                  v_paccion:'R',
                  v_pnegacion:justificacion_rechazo,
                  v_pmotivo_rechazo:motivo_rechazo,
                  }
                }).then(function (response) {
                  $scope.VerCantidadCodigos();
                  $('#Modal_Detalle').modal('close');
                    $scope.retroceder();
                  if (response.data.Codigo == 1) {
                    swal({ title: "No Completado", text: response.data.Nombre, showConfirmButton: false, type: "warning", timer: 5000 });
                  } else {
                    swal({ title: "Completado", text: response.data.Nombre, type: "success", });
                  }
                })
              } else {
                swal({ title: "ANULACIÓN", text: "No pueden haber campos vacios!", showConfirmButton: true, type: "info" });
              }
            });
          }
        $scope.guardargestionaprobar = function(datosenviar){
            swal({
              title: '¿Desea Aprobar este solicitud de codigo de urgencia?',
              showCancelButton: true,
              allowEscapeKey: false,
              allowOutsideClick: false,
              type: "info"
            }).then(function (result) {
              swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: true,
                animation: true,
                
              });
                $http({
                  method: 'POST',
                  url: "php/siau/gestioncodigo.php",
                  data: { function: 'p_u_codigo_urgencia', 
                        v_pcodigo:$scope.datosdelcodico.NUMERO,
                        v_pubicacion:$scope.datosdelcodico.UBICACION,
                        v_pafiliado:$scope.datosdelcodico.DOCUMENTO,
                        v_paccion:'A',
                        v_pnegacion:'',
                        v_pmotivo_rechazo:'',
                        }
                }).then(function (response) {
                  $scope.VerCantidadCodigos();
                  $('#Modal_Detalle').modal('close');
                    $scope.retroceder();
                  if (response.data.Codigo == 1) {
                    swal({ title: "No Completado", text: response.data.Nombre, showConfirmButton: false, type: "warning", timer: 5000 });
                  } else {
                    swal({ title: "Completado", text: response.data.Nombre, type: "success", });
                  }
                })
            });
          }
          $scope.obtenerhistorico = function () {
            $http({
              method: 'POST',
              url: "php/siau/CodigoUrgencia/Rcodigourgencia.php",
              data: { function: 'obtenerhistorico', coincidencia: $scope.datosdelcodico.DOCUMENTO }
            }).then(function (response) {
              if (response.data["0"].length > 0) {
                $scope.HistoricoUrgencia = response.data["0"];
                $scope.Nombre = $scope.HistoricoUrgencia["0"].Nombre;
                $scope.total = $scope.HistoricoUrgencia.length;
                if ($scope.total <= 10) {
                  $scope.quantity = $scope.total;
                }
                else {
                  $scope.quantity = 10;
                }
                $scope.inactive1 = false;
              } else {
                notification.getNotification('info', 'No se encontraron urgencias!', 'Notificacion');
              }
            });
        }
        $scope.descargar = function (ruta) {
          $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: {
              function: 'descargaAdjunto',
              ruta: ruta
            }
          }).then(function (response) {
            //window.open("https://genesis.cajacopieps.com//temp/"+response.data);
            window.open("temp/" + response.data);
          });
        }
    }])
