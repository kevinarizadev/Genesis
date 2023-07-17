'use strict';
angular.module('GenesisApp')
    .controller('reporteautafiliadosController', ['$scope', 'notification', 'cfpLoadingBar', '$http', 'ngDialog',
        function ($scope, notification, cfpLoadingBar, $http, ngDialog) {



            $(document).ready(function () {
                $scope.documento = sessionStorage.getItem('cedula');
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


                setTimeout(() => {
                    $scope.$apply();
                }, 500);

            });
            $scope.verbusqueda = true;
            $scope.verdatoporfecha = false;
            function formatDate(date) {
                var d = new Date(date);
                var dd = ('0' + d.getDate()).slice(-2);
                var mm = ('0' + (d.getMonth() + 1)).slice(-2);
                var yyyy = d.getFullYear();
                var hh = d.getHours();
                var mi = d.getMinutes();
                return dd + '/' + mm + '/' + yyyy; //+' '+hh+':'+mi+':00';
            }
      

            $scope.ObtenerdatosdeAutAfiliados = function () {
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/autorizacion/reporteautafiliados.php",
                    data: {
                        function: 'obtener_dato_aut_afiliados'
                    }
                }).then(function (response) {
                    if (response.data && response.data.toString().substr(0, 3) != '<br') {
                        
                        $scope.datoautafiliados = response.data;
                    } else {
                        swal({
                            title: "¡Ocurrio un error!",
                            text: response.data,
                            type: "warning"
                        }).catch(swal.noop);
                    }
                });
            }
            $scope.ObtenerdatosdeAutAfiliados();


            $scope.BuscarDatosReporte = function () {
                if ($scope.fecha_inicio == "" || $scope.fecha_inicio == undefined || $scope.fecha_inicio == null ||
                $scope.fecha_fin == "" || $scope.fecha_fin == undefined || $scope.fecha_fin == null) {
                    swal({
                        title: "Mensaje",
                        text: "No se puede Visualizar Los datos",
                        type: "warning",
                    });
                } else {
                    swal({
                        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
                        width: 200,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showConfirmButton: false,
                        animation: false
                    });
                    var fechainicio = formatDate($scope.fecha_inicio);
                    var fechafin = formatDate($scope.fecha_fin);
                    $scope.BuscarDatosReporteAutorizadas(fechainicio,fechafin);
                    $scope.BuscarDatosReporteNorequiereAutorizacion(fechainicio,fechafin);
                    $scope.BuscarDatosReporteporgestionar(fechainicio,fechafin);
                    $scope.BuscarDatosReportegestionadas(fechainicio,fechafin);
                      $http({
                        method: 'POST',
                        url: "php/autorizaciones/autorizacion/reporteautafiliados.php",
                        data: {
                            function: 'obtener_dato_aut_afiliados_por_fechas',
                            fecha_inicio: fechainicio,
                            fecha_fin: fechafin 
                        }
                    }).then(function (response) {
                        if (response.data && response.data.toString().substr(0, 3) != '<br') {
                            $scope.verbusqueda = false;
                            $scope.verdatoporfecha = true;
                            if(response.data == 0){
                                $scope.rechazadas = 0;
                            }else{
                                $scope.rechazadas = response.data.length;
                            }
                        } else {
                            swal({
                                title: "¡Ocurrio un error!",
                                text: response.data,
                                type: "warning"
                            }).catch(swal.noop);
                        }
                        setTimeout(() => {
                            swal.close();
                          }, 300);
                    });
                  }
            }
            $scope.BuscarDatosReporteAutorizadas = function (fechainicio,fechafin) {
                      $http({
                        method: 'POST',
                        url: "php/autorizaciones/autorizacion/reporteautafiliados.php",
                        data: {
                            function: 'obtener_dato_aut_afiliados_por_fechas_autorizadas',
                            fecha_inicio: fechainicio,
                            fecha_fin: fechafin 
                        }
                    }).then(function (response) {
                        if (response.data && response.data.toString().substr(0, 3) != '<br') {
                            if(response.data == 0){
                                $scope.autorizadas = 0;
                            }else{
                                $scope.autorizadas = response.data.length;
                            }
                        } else {
                            swal({
                                title: "¡Ocurrio un error!",
                                text: response.data,
                                type: "warning"
                            }).catch(swal.noop);
                        }
                    });
            }
            $scope.BuscarDatosReporteNorequiereAutorizacion= function (fechainicio,fechafin) {
                      $http({
                        method: 'POST',
                        url: "php/autorizaciones/autorizacion/reporteautafiliados.php",
                        data: {
                            function: 'obtener_dato_aut_afiliados_por_fechas_sin_autorizacion',
                            fecha_inicio: fechainicio,
                            fecha_fin: fechafin 
                        }
                    }).then(function (response) {
                        if (response.data && response.data.toString().substr(0, 3) != '<br') {
                            if(response.data == 0){
                                $scope.norequiereautorizacion = 0;
                            }else{
                                $scope.norequiereautorizacion = response.data.length;
                            }
                        } else {
                            swal({
                                title: "¡Ocurrio un error!",
                                text: response.data,
                                type: "warning"
                            }).catch(swal.noop);
                        }
                    });
            }
            $scope.BuscarDatosReporteporgestionar= function (fechainicio,fechafin) {
                      $http({
                        method: 'POST',
                        url: "php/autorizaciones/autorizacion/reporteautafiliados.php",
                        data: {
                            function: 'obtener_dato_aut_afiliados_por_fechas_por_gestionar',
                            fecha_inicio: fechainicio,
                            fecha_fin: fechafin 
                        }
                    }).then(function (response) {
                        if (response.data && response.data.toString().substr(0, 3) != '<br') {
                            if(response.data == 0){
                                $scope.porgestionar = 0;
                            }else{
                                $scope.porgestionar = response.data.length;
                            }
                        } else {
                            swal({
                                title: "¡Ocurrio un error!",
                                text: response.data,
                                type: "warning"
                            }).catch(swal.noop);
                        }
                    });
            }
            $scope.BuscarDatosReportegestionadas= function (fechainicio,fechafin) {
                      $http({
                        method: 'POST',
                        url: "php/autorizaciones/autorizacion/reporteautafiliados.php",
                        data: {
                            function: 'obtener_dato_aut_afiliados_por_fechas_Gestionadas',
                            fecha_inicio: fechainicio,
                            fecha_fin: fechafin 
                        }
                    }).then(function (response) {
                        if (response.data && response.data.toString().substr(0, 3) != '<br') {
                            if(response.data == 0){
                                $scope.gestionadass = 0;
                            }else{
                                $scope.gestionadass = response.data.length;
                            }
                        } else {
                            swal({
                                title: "¡Ocurrio un error!",
                                text: response.data,
                                type: "warning"
                            }).catch(swal.noop);
                        }
                    });
            }

            $scope.Descargar_Reporte = function (tipodescarga) {
                console.log(tipodescarga);
                if ($scope.fecha_inicio == "" || $scope.fecha_inicio == undefined || $scope.fecha_inicio == null ||
                    $scope.fecha_fin == "" || $scope.fecha_fin == undefined || $scope.fecha_fin == null) {
                    swal({
                      title: "Mensaje",
                      text: "No se puede descargar el reporte si no completa todos los campos",
                      type: "warning",
                    });
                  } else {
                      var fechainicio = formatDate($scope.fecha_inicio);
                      var fechafin = formatDate($scope.fecha_fin);
                    swal({
                      title:
                        "¿Desea Descargar el reporte?",
                      text: "Descargar",
                      type: "question",
                      showCancelButton: true,
                      confirmButtonText: "Confirmar",
                      cancelButtonText: "Cancelar",
                      cancelButtonColor: "#d33",
                      allowOutsideClick: false,
                    }).then(function (result) {
                        if (result) {
                          window.open('views/autorizaciones/reporte_aut_afiliados.php?fecha_inicio=' + fechainicio + '&fecha_fin=' + fechafin+ '&tipo_descargar=' + tipodescarga, '_blank', "width=900,height=1100");
                        }
                      }).catch(swal.noop);
                  }
            }

            $scope.iralabusqueda = function () {
                $scope.verbusqueda = true;
                $scope.verdatoporfecha = false;
            }
        }])
    