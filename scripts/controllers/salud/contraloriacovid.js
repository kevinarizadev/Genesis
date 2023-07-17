'use strict';
angular.module('GenesisApp')
    .controller('contraloriacovid', ['$scope', 'consultaHTTP', 'notification', 'cfpLoadingBar', '$http', '$window', '$filter', '$timeout',
        function ($scope, consultaHTTP, notification, cfpLoadingBar, $http, $window, $filter, $timeout) {


            $(document).ready(function () {

                $scope.responsable = sessionStorage.getItem('cedula')
                $('input.currency').currencyInput();
            });

            (function ($) {
                $.fn.currencyInput = function () {
                    this.each(function () {
                        var wrapper = $("<div class='currency-input' />");
                        $(this).wrap(wrapper);
                        $(this).before("<span class='currency-symbol'>$</span>");
                    });
                };
            })(jQuery);


            $scope.titulo = "Contraloria - COVID"

            $scope.seleccionarubiscacion = function () {
                if ($scope.Ubicacion == 50000) {
                    $scope.seleubicacion = "DEPARTAMENTO DEL META"

                } else {
                    $scope.seleubicacion = "MONTERIA"
                }
            }

            $scope.seleccionarubiscacion = function () {
                if ($scope.Ubicacion == 50000) {
                    $scope.Poblacion_total = "155.177";
                    $scope.Poblacion_0_9 = "21.759";
                    $scope.Poblacion_10_59 = "114.527";
                    $scope.Poblacion_60 = "18.891";
                    $scope.Valor_contencion = "2.173.138.559";

                } else {
                    $scope.Poblacion_total = "31.374";
                    $scope.Poblacion_0_9 = "5.745";
                    $scope.Poblacion_10_59 = "22.777";
                    $scope.Poblacion_60 = "2.852";
                    $scope.Valor_contencion = "425.916.162";
                }
            }

            // --------------------------------------------------------------------------------------------------

            $scope.seleccionarubiscacionv = function () {
                if ($scope.Ubicacionv == 50000) {
                    $scope.seleubicacionv = "DEPARTAMENTO DEL META"

                } else {
                    $scope.seleubicacionv = "MONTERIA"
                }
            }


            // ---------------------------------------------------------------------------------------------------

            $scope.mostrar_auditora = true;
            $scope.mostrar_joana = true;
            $scope.mostrar_claudia = true;

            $scope.seleccionar_responsable = function () {
                if ($scope.area_responsable == 1) {
                    $scope.mostrar_auditora = true;
                    $scope.mostrar_joana = false;
                    $scope.mostrar_claudia = false;
                } else {

                }

                if ($scope.area_responsable == 2) {
                    $scope.mostrar_auditora = false;
                    $scope.mostrar_joana = true;
                    $scope.mostrar_claudia = false;
                } else {

                }

                if ($scope.area_responsable == 3) {
                    $scope.mostrar_auditora = false;
                    $scope.mostrar_joana = false;
                    $scope.mostrar_claudia = true;
                } else {

                }

                if ($scope.area_responsable == 4) {
                    $scope.mostrar_auditora = true;
                    $scope.mostrar_joana = true;
                    $scope.mostrar_claudia = true;
                } else {

                }



            }

            // ------------------------------------------------------------------------------------------

            $scope.Ubicacion = '';
            // $scope.Fecha = new Date();
            // $scope.Ubicacionv = '';
            let hoy = new Date();
            let DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000;
            $scope.Fecha = new Date(hoy.getTime() - DIA_EN_MILISEGUNDOS);


            $scope.Poblacion_total = '';
            $scope.Poblacion_0_9 = '';
            $scope.Poblacion_10_59 = '';
            $scope.Poblacion_60 = '';
            $scope.Valor_contencion = '';

            $scope.Recurso_contencion = "SI";
            $scope.Recurso_ejecutado = "N/A";
            $scope.Numero_equipos = 0;
            $scope.Visitas_domiciliaria = '';

            $scope.Operadores_atencion = '';
            $scope.Llamadas_atendidas = '';
            $scope.Llamadas_abandonadas = '';
            $scope.Muestras_tomadas = '';
            $scope.Muestras_positivas = '';

            $scope.Llamadas_seguimiento = "SI";
            $scope.Casos_positivos = '';
            $scope.Casos_sospechosos = '';
            $scope.Pacientes_hospitalizados = '';
            $scope.Pacientes_fallecidos = '';

            $scope.Preguntas_no_diligenciadas = "NO";
            $scope.Preguntas_no_aplica = "N/A";



            $scope.limpiardatos = function () {
                // $scope.mostrar_auditora = '';
                $scope.Operadores_atencion = '';
                $scope.Llamadas_atendidas = '';
                $scope.Llamadas_abandonadas = '';
                $scope.Muestras_tomadas = '';
                $scope.Visitas_domiciliaria = '';

                $scope.Muestras_positivas = '';
                $scope.Casos_positivos = '';
                $scope.Casos_sospechosos = '';
                $scope.Pacientes_hospitalizados = '';
                $scope.Pacientes_fallecidos = '';
            }



            // var json = {
            //     Ubicacion: $scope.Ubicacion = 50000,
            //     Fecha: $scope.Fecha = "",
            //     Poblacion_total: $scope.Poblacion_total = "155177",
            //     Poblacion_0_9: $scope.Poblacion_0_9 = "21759",
            //     Poblacion_10_59: $scope.Poblacion_10_59 = "114527",
            //     Poblacion_60: $scope.Poblacion_60 = "18891",
            //     Recurso_contencion: $scope.Recurso_contencion = "SI",
            //     Valor_contencion: $scope.Valor_contencion = "2173138559",
            //     Recurso_ejecutado: $scope.Recurso_ejecutado = "N/A",
            //     Numero_equipos: $scope.Numero_equipos = "0",
            //     Visitas_domiciliaria: $scope.Visitas_domiciliaria = "0",
            //     Operadores_atencion: $scope.Operadores_atencion = "8",
            //     Llamadas_atendidas: $scope.Llamadas_atendidas = "",
            //     Llamadas_abandonadas: $scope.Llamadas_abandonadas = "",
            //     Muestras_tomadas: $scope.Muestras_tomadas = "",
            //     Muestras_positivas: $scope.Muestras_positivas = "",
            //     Llamadas_seguimiento: $scope.Llamadas_seguimiento = "SI",
            //     Casos_positivos: $scope.Casos_positivos,
            //     Casos_sospechosos: $scope.Casos_sospechosos,
            //     Pacientes_hospitalizados: $scope.Pacientes_hospitalizados = "",
            //     Pacientes_fallecidos: $scope.Pacientes_fallecidos = "",
            //     Preguntas_no_diligenciadas: $scope.Preguntas_no_diligenciadas = "NO ",
            //     Preguntas_no_aplica: $scope.Preguntas_no_aplica = "N/A"
            // };


            // $scope.loadJS = (url) => {
            //     return new Promise((resolve, reject) => {
            //         const script = document.createElement('script');
            //         script.src = url;
            //         // script.async = true;

            //         script.onload = () => {
            //             resolve();
            //         }

            //         script.onerror = () => {
            //             reject();
            //         }
            //         document.body.appendChild(script);
            //     });
            // }

            // $scope.loadJS("https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js").then(() => {
            //     document.querySelector('#fecha').setAttribute('max', moment().format('YYYY-MM-DD'));
            // });


            $scope.guardardatos = function () {

                var Encontrar_Vacios = false;
                if ($scope.Ubicacion == null || $scope.Ubicacion == '') { Encontrar_Vacios = true; }
                if ($scope.Fecha == null || $scope.Fecha == '') { Encontrar_Vacios = true; }
                if ($scope.area_responsable == null || $scope.area_responsable == '' || $scope.area_responsable == undefined) { Encontrar_Vacios = true; }

                var Encontrar_Vacios4 = false;
                if ($scope.area_responsable == 4) {

                    if ($scope.Pacientes_hospitalizados == null || $scope.Pacientes_hospitalizados == '' || $scope.Pacientes_hospitalizados == undefined) { Encontrar_Vacios4 = true; }
                    if ($scope.Visitas_domiciliaria == null || $scope.Visitas_domiciliaria == '' || $scope.Visitas_domiciliaria == undefined) { Encontrar_Vacios4 = true; }
                    if ($scope.Muestras_positivas == null || $scope.Muestras_positivas == '' || $scope.Muestras_positivas == undefined) { Encontrar_Vacios4 = true; }
                    if ($scope.Casos_positivos == null || $scope.Casos_positivos == '' || $scope.Casos_positivos == undefined) { Encontrar_Vacios4 = true; }
                    if ($scope.area_responsable == null || $scope.area_responsable == '' || $scope.area_responsable == undefined) { Encontrar_Vacios4 = true; }
                    if ($scope.Llamadas_atendidas == null || $scope.Llamadas_atendidas == '' || $scope.Llamadas_atendidas == undefined) { Encontrar_Vacios4 = true; }
                    if ($scope.Muestras_tomadas == null || $scope.Muestras_tomadas == '' || $scope.Muestras_tomadas == undefined) { Encontrar_Vacios4 = true; }
                    if ($scope.Llamadas_abandonadas == null || $scope.Llamadas_abandonadas == '' || $scope.Llamadas_abandonadas == undefined) { Encontrar_Vacios4 = true; }
                    if ($scope.Casos_sospechosos == null || $scope.Casos_sospechosos == '' || $scope.Casos_sospechosos == undefined) { Encontrar_Vacios4 = true; }
                    if ($scope.Pacientes_fallecidos == null || $scope.Pacientes_fallecidos == '' || $scope.Pacientes_fallecidos == undefined) { Encontrar_Vacios4 = true; }
                } else {
                    Encontrar_Vacios4 = false;
                }


                var Encontrar_Vacios1 = false;
                if ($scope.area_responsable == 1) {
                    if ($scope.Ubicacion == null || $scope.Ubicacion == '' || $scope.Ubicacion == undefined) { Encontrar_Vacios = true; }
                    if ($scope.Fecha == null || $scope.Fecha == '' || $scope.Fecha == undefined) { Encontrar_Vacios = true; }

                    if ($scope.Pacientes_hospitalizados == null || $scope.Pacientes_hospitalizados == '' || $scope.Pacientes_hospitalizados == undefined) {
                        if ($scope.Pacientes_hospitalizados.toString() == "0" && $scope.Pacientes_hospitalizados.toString().length == 1) {
                            Encontrar_Vacios1 = false; 
                        } else { Encontrar_Vacios1 = true; console.log($scope.Pacientes_hospitalizados.toString());}

                    }

                    if ($scope.Visitas_domiciliaria == null || $scope.Visitas_domiciliaria == '' || $scope.Visitas_domiciliaria == undefined) {
                        if ($scope.Visitas_domiciliaria.toString() == "0" && $scope.Visitas_domiciliaria.toString().length == 1) {
                            Encontrar_Vacios1 = false;
                        } else { Encontrar_Vacios1 = true; console.log($scope.Visitas_domiciliaria.toString());}

                    }

                } else {
                    Encontrar_Vacios1 = false;
                }

                var Encontrar_Vacios2 = false;
                if ($scope.area_responsable == 2) {
                    if ($scope.Ubicacion == null || $scope.Ubicacion == '' || $scope.Ubicacion == undefined) { Encontrar_Vacios = true; }
                    if ($scope.Fecha == null || $scope.Fecha == '' || $scope.Fecha == undefined) { Encontrar_Vacios = true; }


                    if ($scope.Muestras_tomadas == null || $scope.Muestras_tomadas == '' || $scope.Muestras_tomadas == undefined) {
                        if ($scope.Muestras_tomadas.toString() == "0" && $scope.Muestras_tomadas.toString().length == 1) {
                            Encontrar_Vacios2 = false; 
                        } else { Encontrar_Vacios2 = true; console.log($scope.Muestras_tomadas.toString());}

                    }

                    if ($scope.Muestras_positivas == null || $scope.Muestras_positivas == '' || $scope.Muestras_positivas == undefined) {
                        if ($scope.Muestras_positivas.toString() == "0" && $scope.Muestras_positivas.toString().length == 1) {
                            Encontrar_Vacios2 = false; 
                        } else { Encontrar_Vacios2 = true; console.log($scope.Muestras_positivas.toString());}

                    }

                    if ($scope.Casos_positivos == null || $scope.Casos_positivos == '' || $scope.Casos_positivos == undefined) {
                        if ($scope.Casos_positivos.toString() == "0" && $scope.Casos_positivos.toString().length == 1) {
                            Encontrar_Vacios2 = false; 
                        } else { Encontrar_Vacios2 = true; console.log($scope.Casos_positivos.toString());}

                    }

                    if ($scope.Casos_sospechosos == null || $scope.Casos_sospechosos == '' || $scope.Casos_sospechosos == undefined) {
                        if ($scope.Casos_sospechosos.toString() == "0" && $scope.Casos_sospechosos.toString().length == 1) {
                            Encontrar_Vacios2 = false; 
                        } else { Encontrar_Vacios2 = true; console.log($scope.Casos_sospechosos.toString());}

                    }

                    if ($scope.Pacientes_fallecidos == null || $scope.Pacientes_fallecidos == '' || $scope.Pacientes_fallecidos == undefined) {
                        if ($scope.Pacientes_fallecidos.toString() == "0" && $scope.Pacientes_fallecidos.toString().length == 1) {
                            Encontrar_Vacios2 = false; 
                        } else { Encontrar_Vacios2 = true; console.log($scope.Pacientes_fallecidos.toString());}

                    }


                } else {
                    Encontrar_Vacios2 = false;
                }


                var Encontrar_Vacios3 = false;
                if ($scope.area_responsable == 3) {
                    if ($scope.Ubicacion == null || $scope.Ubicacion == '' || $scope.Ubicacion == undefined) { Encontrar_Vacios = true; }
                    if ($scope.Fecha == null || $scope.Fecha == '' || $scope.Fecha == undefined) { Encontrar_Vacios = true; }

                    if ($scope.Operadores_atencion == null || $scope.Operadores_atencion == '' || $scope.Operadores_atencion == undefined) {
                        if ($scope.Operadores_atencion.toString() == "0" && $scope.Operadores_atencion.toString().length == 1) {
                            Encontrar_Vacios3 = false; 
                        } else { Encontrar_Vacios3 = true; console.log($scope.Operadores_atencion.toString());}

                    }

                    if ($scope.Llamadas_atendidas == null || $scope.Llamadas_atendidas == '' || $scope.Llamadas_atendidas == undefined) {
                        if ($scope.Llamadas_atendidas.toString() == "0" && $scope.Llamadas_atendidas.toString().length == 1) {
                            Encontrar_Vacios3 = false; 
                        } else { Encontrar_Vacios3 = true; console.log($scope.Llamadas_atendidas.toString());}

                    }

                    if ($scope.Llamadas_abandonadas == null || $scope.Llamadas_abandonadas == '' || $scope.Llamadas_abandonadas == undefined) {
                        if ($scope.Llamadas_abandonadas.toString() == "0" && $scope.Llamadas_abandonadas.toString().length == 1) {
                            Encontrar_Vacios3 = false; 
                        } else { Encontrar_Vacios3 = true; console.log($scope.Llamadas_abandonadas.toString());}

                    }



                } else {
                    Encontrar_Vacios3 = false;
                }

                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();

                // swal({ title: 'Cargando...', allowOutsideClick: false });
                // swal.showLoading();

                // if (Encontrar_Vacios == true) {
                //     swal('Advertencia', '¡Debe completar todos los campos', 'warning')
                //     // Materialize.toast('¡Complete los campos', 2000);

                //     return;
                // }
                if (Encontrar_Vacios1 == true) {
                    swal('Advertencia', '¡Debe completar todos los campos!', 'warning')
                    // Materialize.toast('¡Complete los campos', 2000);

                    return;
                }
                if (Encontrar_Vacios2 == true) {
                    swal('Advertencia', '¡Debe completar todos los campos! ', 'warning')
                    // Materialize.toast('¡Complete los campos', 2000);

                    return;
                }
                if (Encontrar_Vacios3 == true) {
                    swal('Advertencia', '¡Debe completar todos los campos!', 'warning')
                    // Materialize.toast('¡Complete los campos', 2000);

                    return;
                }
                if (Encontrar_Vacios4 == true) {
                    swal('Advertencia', '¡Debe completar todos los campos!', 'warning')
                    // Materialize.toast('¡Complete los campos', 2000);

                    return;
                }
                if (Encontrar_Vacios == true) {
                    swal('Advertencia', '¡Debe completar todos los campos!', 'warning')
                    // Materialize.toast('¡Complete los campos', 2000);

                    return;
                }




                var xFecha = $scope.Fecha;
                var Fecha = xFecha.getFullYear() + '/' + (((xFecha.getMonth() + 1) < 10) ? '0' + (xFecha.getMonth() + 1) : (xFecha.getMonth() + 1)) + '/' + xFecha.getUTCDate();

                $http({
                    method: 'POST',
                    url: "php/salud/contraloriacovid.php",
                    data: {
                        function: 'P_i_inserta_plan_contigencia',
                        ubicacion: $scope.Ubicacion,
                        fecha: Fecha,
                        poblaciontotal: $scope.Poblacion_total.toString().replace(/\./g, ''),
                        poblacion9: $scope.Poblacion_0_9.toString().replace(/\./g, ''),
                        poblacion10: $scope.Poblacion_10_59.toString().replace(/\./g, ''),
                        poblacion60: $scope.Poblacion_60.toString().replace(/\./g, ''),
                        recurso_contencion: $scope.Recurso_contencion,
                        valor_contencion: $scope.Valor_contencion.toString().replace(/\./g, ''),
                        recurso_ejecutado: $scope.Recurso_ejecutado,
                        numero_equipos: $scope.Numero_equipos,
                        visitas_domiciliaria: $scope.Visitas_domiciliaria,
                        operadores_atencion: $scope.Operadores_atencion,
                        llamadas_atendidas: $scope.Llamadas_atendidas,
                        llamadas_abandonadas: $scope.Llamadas_abandonadas,
                        muestras_tomadas: $scope.Muestras_tomadas,
                        muestras_positivas: $scope.Muestras_positivas,
                        llamadas_seguimiento: $scope.Llamadas_seguimiento,
                        casos_positivos: $scope.Casos_positivos,
                        casos_sospechosos: $scope.Casos_sospechosos,
                        pacientes_hospitalizados: $scope.Pacientes_hospitalizados,
                        pacientes_fallecidos: $scope.Pacientes_fallecidos,
                        preguntas_no_diligenciadas: $scope.Preguntas_no_diligenciadas,
                        preguntas_no_aplican: $scope.Preguntas_no_aplica,
                        responsable: $scope.responsable,
                        area_responsable: $scope.area_responsable

                    }
                }).then(function (res) {
                    if (res.data.Codigo == "0") {
                        var resp = res.data;
                        swal({
                            title: '¡mensaje!',
                            text: resp.Nombre,
                            type: 'success'
                        }).catch(swal.noop);
                        $scope.area_responsable = '';
                        $scope.limpiardatos();

                    } else {
                        swal({
                            title: '¡mensaje!',
                            text: res.data.Nombre,
                            type: 'error'
                        }).catch(swal.noop);
                    }
                });


            }

            $scope.Ubicacionv = '';
            $scope.Fechav = new Date();


            $scope.ocultartabla = true;
            $scope.visualizardatos = function () {
                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();

                var Encontrar_Vacios = false;
                if ($scope.Ubicacionv == null || $scope.Ubicacionv == '') { Encontrar_Vacios = true; }
                if ($scope.Fechav == null || $scope.Fechav == '') { Encontrar_Vacios = true; }

                if (Encontrar_Vacios == true) {
                    swal('Advertencia', '¡Debe seleccionar la region! ', 'warning')
                    // Materialize.toast('¡Complete los campos', 2000);

                    return;
                }


                var xFechav = $scope.Fechav;
                var Fechav = xFechav.getFullYear() + '/' + (((xFechav.getMonth() + 1) < 10) ? '0' + (xFechav.getMonth() + 1) : (xFechav.getMonth() + 1)) + '/' + xFechav.getUTCDate();

                $http({
                    method: 'POST',
                    url: "php/salud/contraloriacovid.php",
                    data: {
                        function: 'P_OBTENER_PLAN_CONTINGENCIA',
                        ubicacionv: $scope.Ubicacionv,
                        fechav: Fechav
                    }
                }).then(function (response) {
                    if (response.data.Codigo == "1") {
                        // $scope.GenerarExcel();
                        $scope.ocultartabla = true;

                        swal({
                            title: '¡mensaje!',
                            text: response.data.Nombre,
                            type: 'error'
                        }).catch(swal.noop);

                    } else {
                        $scope.dato = response.data;
                        $scope.ocultartabla = false;
                        swal({
                            title: '!Datos Cargados!',
                            timer: 100,
                            type: 'success'
                        }).catch(swal.noop);

                    }

                    // console.log(response.data);

                });
            }

            $scope.PorPQR = function () {
                $scope.ocultartabla = true;
                $scope.limpiardatos();


            }

            $scope.GenerarExcel = function () {
                if ($scope.dato != undefined) {
                    $window.open('php/salud/informe_contraloriacovid.php?&ubicacion=' + $scope.dato.nombre_ubicacion +
                        '&fecha=' + $scope.dato.fecha +
                        '&poblacion_total=' + $scope.dato.poblacion_total +
                        '&poblacion_0_9=' + $scope.dato.poblacion_0_9 +
                        '&poblacion_10_59=' + $scope.dato.poblacion_10_59 +
                        '&poblacion_60=' + $scope.dato.poblacion_60 +
                        '&recurso_contencion=' + $scope.dato.recurso_contencion +
                        '&valor_contencion=' + $scope.dato.valor_contencion +
                        '&recurso_ejecutado=' + $scope.dato.recurso_ejecutado +
                        '&numero_equipos=' + $scope.dato.numero_equipos +
                        '&visitas_domiciliaria=' + $scope.dato.visitas_domiciliaria +
                        '&operadores_atencion=' + $scope.dato.operadores_atencion +
                        '&llamadas_atendidas=' + $scope.dato.llamadas_atendidas +
                        '&llamadas_abandonadas=' + $scope.dato.llamadas_abandonadas +
                        '&muestras_tomadas=' + $scope.dato.muestras_tomadas +
                        '&muestras_positivas=' + $scope.dato.muestras_positivas +
                        '&llamadas_seguimiento=' + $scope.dato.llamadas_seguimiento +
                        '&casos_positivos=' + $scope.dato.casos_positivos +
                        '&casos_sospechosos=' + $scope.dato.casos_sospechosos +
                        '&pacientes_hospitalizados=' + $scope.dato.pacientes_hospitalizados +
                        '&pacientes_fallecidos=' + $scope.dato.pacientes_fallecidos +
                        '&preguntas_no_diligenciadas=' + $scope.dato.preguntas_no_diligenciadas +
                        '&preguntas_no_aplica=' + $scope.dato.preguntas_no_aplica

                    );
                }
            }



        }]);