'use strict';
angular.module('GenesisApp')
    .controller('contraloriacovidinfo', ['$scope', 'consultaHTTP', 'notification', 'cfpLoadingBar', '$http', '$window', '$filter', '$timeout',
        function ($scope, consultaHTTP, notification, cfpLoadingBar, $http, $window, $filter, $timeout) {


            $(document).ready(function () {

                $scope.responsable = sessionStorage.getItem('cedula')

            });
            $scope.Fechav = new Date();


            $scope.titulo = "Informacion de Contraloria - COVID-19"



            $scope.ocultartabla = true;
            $scope.visualizardatos = function () {

                var Encontrar_Vacios = false;
                if ($scope.Ubicacionv == null || $scope.Ubicacionv == '') { Encontrar_Vacios = true; }
                if ($scope.Fechav == null || $scope.Fechav == '') { Encontrar_Vacios = true; }

                // swal({ title: 'Cargando...', allowOutsideClick: false });
                // swal.showLoading();

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


            $scope.GenerarExcel = function () {
                if ($scope.dato != undefined) {
                    $window.open('php/salud/informe_contraloriacovid.php?&ubicacion=' + $scope.dato.nombre_ubicacion +
                        '&fecha=' + $scope.dato.fecha_ingreso +
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