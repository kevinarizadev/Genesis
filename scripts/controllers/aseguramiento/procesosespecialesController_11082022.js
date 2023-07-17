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

            console.log($(window).width());
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

            //////////////////////////////////////////////////////////
         });

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

 $scope.changeItem = function(item){
  $scope.item = JSON.parse(item)
  console.log($scope.item)
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
            console.log($scope.rolcod);
            $http({
               method: 'POST',
               url: "php/informes/obtenerreportes_especiales.php",
               data: { function: 'obtenerreportes', v_prol: $scope.rolcod }
            }).then(function (response) {
               $scope.Reportes = response.data;
            })
         }

         $scope.SeleccionarItem = function () {
            if ($scope.tipodeItem == "0") {
               $scope.vercontenido = false;
            } else {
               $scope.ocultartodo();
               $scope.vercontenido = true;
               switch ($scope.tipodeItem) {
                  case "67":
                     $scope.show_regimen = false;
                     $scope.show_ciclo = false;
                     $scope.show_nit = false;
                     $scope.Nombrereporte = "Cargue de Bases de BDUA";
                     $scope.contenido1 = true;
                     $scope.contenido2 = false;
                     break;
                  case "22":
                     $scope.show_regimen = true;
                     $scope.show_ciclo = true;
                     $scope.show_nit = true;
                     $scope.Nombrereporte = "Archivo Tipo 017";
                     $scope.contenido1 = true;
                     $scope.contenido2 = false;
                     break;
                  case "72":
                     $scope.show_regimen = false;
                     $scope.show_ciclo = false;
                     $scope.show_nit = false;
                     $scope.Nombrereporte = "Recalculo Contable - Kprecal";
                     $scope.contenido1 = true;
                     $scope.contenido2 = false;
                     break;
                  case "70":
                     $scope.show_regimen = false;
                     $scope.show_ciclo = false;
                     $scope.show_nit = false;
                     $scope.Nombrereporte = "Cargue Bases de LMA";
                     $scope.contenido1 = true;
                     $scope.contenido2 = false;
                     break;
               }
            }
         }

         $scope.ocultartodo = function () {
            $scope.contenido1 = false;
            $scope.contenido2 = false;
         }

         $scope.Generar_reporte = function () {
            if ($scope.tipodeItem == "0") {
               $scope.vercontenido = false;
            } else {
               $scope.ocultartodo();
               $scope.vercontenido = true;
               switch ($scope.tipodeItem) {
                  case "67":
                     // Cargue de Bases de BDUA
                     var datosRC = {
                        "correo": $scope.correo,
                        "anno": $scope.anno,
                        "mes": $scope.item.IDE

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
                                 function: 'Cargue_BDUA',
                                 datos: (datosRC)
                              }
                           }).then(function (response) {
                              swal({
                                 title: "Mensaje",
                                 text: "Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo",
                                 type: "success",
                              })
                              $scope.respuestata = response.data;
                           });
                        }
                     }).catch(swal.noop);
                     break;
                  case "22":
                     // Archivo Tipo 017
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
                              swal({
                                 title: "Mensaje",
                                 text: "Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo",
                                 type: "success",
                              })
                              $scope.respuestata = response.data;
                           });
                        }
                     }).catch(swal.noop);
                     break;
                  case "72":
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
                              swal({
                                 title: "Mensaje",
                                 text: "Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo",
                                 type: "success",
                              })
                              $scope.respuestata = response.data;
                           });
                        }
                     }).catch(swal.noop);
                     break;
                  case "70":
                     // Cargue Bases de LMA
                     var datosRC = {
                       "correo": $scope.correo,
                        "anno": $scope.anno,
                        "mes": $scope.item.IDE,
                        "fecha":$scope.item.PERF_FINAL,
                        "responsable":$scope.Rol_Cedula
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
                              swal({
                                 title: "Mensaje",
                                 text: "Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo",
                                 type: "success",
                              })
                              $scope.respuestata = response.data;
                           });
                        }
                     }).catch(swal.noop);
                     break;
               }
            }
         }

         $scope.Cargue_BDUA = function () {
            var datosRC = {
               "correo": $scope.correo,
               "anno": $scope.anno,
               "mes": $scope.periodo

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
                        function: 'Cargue_BDUA',
                        datos: (datosRC)
                     }
                  }).then(function (response) {
                     swal({
                        title: "Mensaje",
                        text: "Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo",
                        type: "success",
                     })
                     $scope.respuestata = response.data;
                  });
               }
            }).catch(swal.noop);
         }



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
