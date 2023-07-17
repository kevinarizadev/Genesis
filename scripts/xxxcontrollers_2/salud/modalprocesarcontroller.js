'use strict';
angular.module('GenesisApp')
    .controller('procesarcontroller', ['$scope', '$http', 'consultaHTTP', 'censoHttp', '$filter', 'ngDialog', 'cfpLoadingBar',
        function ($scope, $http, consultaHTTP, censoHttp, $filter, ngDialog, cfpLoadingBar) {
          
$(document).ready(function(){
  var dat = {prov : 'navb'}
  $.getJSON( "php/obtenersession.php", dat)
  .done(function(respuesta) {
    $scope.sesdata = respuesta;
    $scope.responsable = $scope.sesdata.cedula;
  })
  .fail(function( jqXHR, textStatus, errorThrown ) {
    console.log("navbar error obteniendo variables");
  });
  
});
            var self = this;
            $scope.fecha_Cierre = new Date();
            $scope.hospitalizacion = ' ';
            $scope.motivoglosa = ' ';
            $scope.eventoadv = ' ';
            $scope.eventoadvdeta = ' ';
            $scope.objecionchbox = false;
            $scope.adverso = false;
            $scope.showeventoadv = true;
            $scope.showfechacierre = true;
            $scope.glosa = {
              valorobjecion: 0,
              descripcion: '',
              motivo: 0
            }
            $scope.entr = {
              numero: 0,
              ubi: '',
              nombre: '',
              descripcion: ''
            }
        
            $scope.array_queja = {
              numero: '',
              ubicacion: '',
              id: '',
              descripcion: '',
              codigo: ''
            }
            $scope.valoradverso;
        //    $scope.responsable = $scope.cedula;
            $scope.btnEvolucion = false;
            $scope.motivo_egreso = '0';
            $scope.cerrarau = false;
        
            $(document).ready(function () {
              $scope.notpaastenot();
            });
        
            censoHttp.obtenerHospitalizacion().then(function (response) {
              $scope.listhospitalizaicon = response.data;
            })
        
            censoHttp.obtenerMotivoEgreso().then(function (response) {
              $scope.listMotivo = response.data;
            })
        
            censoHttp.obtenerEventosadv().then(function (response) {
              $scope.listeventoadv = response.data;
            })
        
            function formatDate(date) {
              var month = date.getUTCMonth() + 1;
              date = date.getDate() + "/" + month + "/" + date.getFullYear();
              return date;
            }
        
            $scope.obtenerEvolucionPaciente = function (afiliado, ubicacion, numerocenso, estado, sexo, edad, nacido) {
              $scope.numerocenso = numerocenso;
              $scope.entr.numero = $scope.numerocenso;
              $scope.estado_procesado = estado;
              $scope.sexo = sexo;
              $scope.nacidov = nacido;
              $scope.ubicacion = ubicacion;
              $scope.entr.ubi = $scope.ubicacion;
              $scope.afiliado = afiliado;
              $scope.edades = Number(edad);
              if ($scope.estado_procesado === 'PROCESADO') { $scope.esprocesado = true; } else { $scope.esprocesado = false; }
              censoHttp.obtenerEvolucionPaciente(ubicacion, numerocenso).then(function (response) {
                $scope.listevolucionpaciente = response.data;
                if ($scope.listevolucionpaciente.length != 0) {
                  $scope.Afiliadoevo = response.data[0].AFILIADO;
                } else {
                  $scope.Afiliadoevo = $scope.afiliado;
                }
              })
            }
        
            $scope.ObtenerEvtDetalle = function () {
              censoHttp.obtenerEventosadvdeta($scope.eventoadv).then(function (response) {
                if ($scope.eventoadv != 0) {
                  $scope.listeventoadvdeta = response.data;
                }
              })
            }
        
            $scope.showeventoadverso = function () {
              if ($scope.adverso === true) {
                $scope.showeventoadv = false;
                $scope.valoradverso = 'S';
              } else {
                $scope.showeventoadv = true;
                $scope.valoradverso = 'N';
              }
            }
        
        
        
            $scope.notpaastenot = function () {
              var Evoldesc = document.getElementById('bloquear');
              Evoldesc.onpaste = function (e) {
                e.preventDefault();
                swal('Notificacion', "La accion pegar no esta permitida en este campo. ", 'error');
              }
        
              Evoldesc.oncopy = function (e) {
                e.preventDefault();
                swal('Notificacion', "La accion copiar no esta permitida en este campo. ", 'error');
              }
            }
        
        
            $scope.clearevo = function () {
              $scope.fecha_Cierre = new Date();
              $scope.hospitalizacion = ' ';
              $scope.motivoglosa = ' ';
              $scope.eventoadv = ' ';
              $scope.eventoadvdeta = ' ';
              $scope.showeventoadv = true;
              $scope.showfechacierre = true;
              $scope.glosa = {
                valorobjecion: 0,
                descripcion: '',
                motivo: 0
              }
              $scope.valoradverso;
              //$scope.responsable = $scope.cedula;
              $scope.btnEvolucion = false;
              $scope.motivo_egreso = '0';
              $scope.cerrarau = true;
              $scope.Descripcionevo = '';
              $scope.diagnostico.seleccion = "SELECCIONAR";
            }
        
            $scope.showfecha = function () {
              if ($scope.cerrarau === true) {
                $scope.showfechacierre = false;
                $scope.valorcerrarauditoria = 'S';
        
              } else {
                $scope.showfechacierre = true;
                $scope.valorcerrarauditoria = 'N';
                $scope.motivo_egreso = '0';
              }
            }
        
            $scope.showDescripcionobjecion = function (type) {
              if (type = 'A') {
                if ($scope.objecionchbox === true) {
                  $scope.mostrarModal('G', '1');
                  $scope.enblvalorobj = false;
                  $scope.valorglosa = 'S';
                } else {
                  $scope.valorglosa = 'N';
                  $scope.glosa.descripcion = '';
                  $scope.glosa.motivo = 0;
                  $scope.glosa.valorobjecion = 0;
                }
              } else {
                $scope.enblvalorobj = true;
              }
            }
        
            $scope.showDescripcionobjecionval = function (type) {
              if (type = 'A') {
                if ($scope.objecionchbox === true) {
                  $scope.enblvalorobj = false;
                  $scope.valorglosa = 'S';
                } else {
                  $scope.valorglosa = 'N';
                }
              } else {
                $scope.enblvalorobj = true;
              }
            }
        
            $scope.imprimeCertificadoGlosa = function () {
              $window.open('views/salud/formato/formatoglosa.php?censo=' + $scope.numerocenso + '&ubicacion=' + $scope.ubicacion, '_blank', "width=1080,height=1100");
            }
        
            $scope.nomDiagnostico = function () {
              if ($scope.diagnostico.codigo === undefined || $scope.diagnostico.codigo == "") {
                $scope.diagnostico.seleccion = "SELECCIONAR";
              } else {
                $scope.diagnostico.seleccion = $scope.diagnostico.codigo + ' - ' + $scope.diagnostico.nombre
              }
            }
        
            $scope.insertarEvolucion = function () {
              $scope.showeventoadverso();
              $scope.showfecha();
              $scope.showDescripcionobjecionval('A');
              if ($scope.glosa.motivo != '0'){ $scope.motivoglo = $scope.glosa.motivo.split(' ')[0];}else{ $scope.motivoglo = '0';} 
             
              //if ( $scope.cerrarau == false && $scope.motivo_egreso == '0'){
              censoHttp.insertarEvolucion($scope.info.numero, $scope.info.ubicacion, $scope.hospitalizacion,
                $scope.diagnostico.codigo, $scope.glosa.valorobjecion, $scope.Descripcionevo,
                $scope.valoradverso, $scope.eventoadv, $scope.eventoadvdeta,
                $scope.responsable, $scope.valorglosa, $scope.glosa.descripcion,
                '', $scope.motivoglo, $scope.valorcerrarauditoria, formatDate($scope.fecha_Cierre), $scope.motivo_egreso).then(function (response) {
                  if (response.data.codigo != 0) {
                    $scope.ins_auditoria();
                    swal('Completado', response.data.mensaje, 'success');
                    ngDialog.close();
                  } else {
                    swal('Completado', response.data.mensaje, 'error');
                  }
                  if (response.data.codigo == 2) {
                    $scope.btnEvolucion = true;
                  } else {
                    $scope.btnEvolucion = false;
                  }
                })
              //}else
              //{
              //swal('Notificacion','Se debe seleccionar la opcion de cerrar auditoria y el motivo del egreso.','error');
              // }                                  
            }
        
        
        
            $scope.ins_auditoria = function () {
                console.log($scope.sesdata);
                $http({
                  method: 'POST',
                  url: "php/censo/cuentasmed.php",
                  data: {
                    function: 'ins_auditoria',
                    usuario: $scope.sesdata.usu,
                    descripcion: "Censo procesado desde el modulo de cuentas medicas",
                    documento: $scope.sesdata.cedula,
                    evento: "update"
                  }
                }).then(function (response) {
          
                  $scope.auditoria_insertada = response.data;
                });
              }
        
            $scope.mostrarModal = function (type, renglon, ubicacion) {
              $scope.renglon = renglon;
              $scope.ubicacionpac = ubicacion;
        
              $scope.array_queja = {
                numero: $scope.numerocenso,
                ubicacion: $scope.ubicacion,
                id: $scope.renglon,
                descripcion: '',
                codigo: ''
              }
        
              switch (type) {
                //edit
                case "D":
                  $scope.dialogDiag = ngDialog.open({
                    template: 'views/salud/modal/modalDiagnosticos.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'modalDxctrl',
                    scope: $scope
                  });
                  $scope.dialogDiag.closePromise.then(function (data) {
                    if (data.value != "$document") {
                      $scope.diagnostico = {
                        codigo: data.value.codigo,
                        nombre: data.value.nombre
                      }
                      $scope.nomDiagnostico();
                    }
                  });
                  break;
                  //solve
                case "G":
                  $scope.dialogDiag = ngDialog.open({
                    template: 'views/salud/modal/modalValorglosa.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'modalValorglosactrl',
                    scope: $scope
                  });
                  $scope.dialogDiag.closePromise.then(function (data) {
                    if (data.value != "$closeButton") {
                      $scope.glosa = {
                        valorobjecion: data.value.cantidad,
                        descripcion: data.value.nombre,
                        motivo: data.value.motivo
                      }
                    } else {
                      $scope.objecionchbox = false;
                    }
                  });
                  break;
              }
            }

        }
    ]);