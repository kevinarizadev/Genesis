'use strict';
angular.module('GenesisApp').controller('homecontroller', ['$scope', 'consultaHTTP', 'notification', '$timeout', '$rootScope', 'ngDialog', '$http', '$window', function ($scope, consultaHTTP, notification, $timeout, $rootScope, ngDialog, $http, $window) {

    // $('#modalpopUp').modal();
    // $('#modalpopUp').modal("open");

    // setTimeout(() => {
    //   var video = sessionStorage.getItem("video");
    //   if(video == "1"){
    //     $('#modalpopUp').modal("open");
    //     sessionStorage.setItem("video", "2");
    //   }
    // }, 1500);
    //$('#purple-scheme').click();
    $scope.sofi = false;
    // Cuenta regresiva que finaliza el dia 13 de diciembre del 2019 a las 3:00 pm.
    /* var count = new Date("dec 13,2019 15:00:00").getTime();
    var x = setInterval(function () {
        var now = new Date().getTime();
        var d = count - now;

        var days = Math.floor(d / (1000 * 60 * 60 * 24));
        var hours = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((d % (1000 * 60)) / 1000);

        document.querySelector("#Dias_num").innerHTML = days;
        document.querySelector("#Horas_num").innerHTML = hours;
        document.querySelector("#Minutos_num").innerHTML = minutes;
        document.querySelector("#Segundos_num").innerHTML = seconds;

        if (d <= 0) {
            $scope.sofi = true;
            document.querySelector("#Dias_num").innerHTML = "0";
            document.querySelector("#Horas_num").innerHTML = "0";
            document.querySelector("#Minutos_num").innerHTML = "0";
            document.querySelector("#Segundos_num").innerHTML = "0";
            clearInterval(x);
        }
    }, 1000); */
    // Cuenta regresiva
    setTimeout(() => {
        document.getElementById('slider_mara').scrollIntoView({ block: 'start', behavior: 'smooth' });
    }, 20000);
    // Traer 5 notificaiones desde la DB
    $scope.name = 'inicio';
    $http({
        method: 'POST',
        url: "php/genesis/versionamiento/versionamiento.php",
        data: {
            function: 'obtenerNotificaciones',
            cantidad: 5
        }
    }).then(function (response) {
        $scope.now = response.data;
        angular.element(document).ready(function () {
            $timeout(function () {
                $('.gallery-carousel').gallery_carousel();
            }, 1000);
        });
    });
    $http({
        method: 'POST',
        url: "php/genesis/funcgenesis.php",
        data: { function: 'cargaInicio' }
    }).then(function (response) {
        $scope.result_bd = response.data.cumpleanos;
        $scope.result_perfil = response.data.perfil;
        // sessionStorage.setItem("codigo_cargo", $scope.result_perfil.cod_cargo);
    });
    angular.element(document).ready(function () {
        $timeout(function () {
            $('.slider').slider({ full_width: true, interval: 50000 });
        }, 1000);
    });
    $scope.see_notification = function (id) {
        $scope.id = id;
        // Envio el case para elegir que modal mostrar
        $scope.case = 2;
        ngDialog.open({
            template: 'views/tic/modal/modalversionamiento.html',
            className: 'ngdialog-theme-plain',
            controller: 'modalversionamiento',
            scope: $scope
        })
    };
    // Modal al dar clic sobre una notificaion
    $scope.descargaVolante = function () {
        $scope.dialogJuz = ngDialog.open({
            template: 'views/talentohumano/formatos/modalSelectPeriodos.html',
            className: 'ngdialog-theme-plain',
            controller: 'modalSelectPeriodosCtrl'
        });
    }

    $(document).ready(function () {
        $('.modal').modal();
    });
    $scope.modal = { titulo: "ABECÉ de las sustancias y productos químicos, residuos peligrosos", tipo: 1, class: "blue", vista: 1, preguntas: new Array(), respuestas: new Array() };
    // $http({
    //     method: 'POST',
    //     url: "php/genesis/inicio.php",
    //     data: { function: 'obtener_examen' }
    // }).then(function (response) {
    //     if (!response.data.hasOwnProperty("Codigo") && response.data.length > 0) {
    //         $scope.modal.preguntas = response.data;
    //         $('#modal-quiz').modal('open');
    //     }
    // });
    $scope.quiz = function () {
        $scope.modal.titulo = "Responder Preguntas";
        $scope.modal.class = "green";
        $scope.modal.vista = 2;
        $scope.modal.tipo = 2;
    }
    $scope.responder = function (cod_capacitacion, cod_pregunta, cod_respuesta) {
        var i = $scope.modal.respuestas.findIndex(elemt => elemt.pregunta == cod_pregunta);
        if (i == -1) {
            $scope.modal.respuestas.push({ capacitacion: cod_capacitacion, pregunta: cod_pregunta, respuesta: cod_respuesta });
        } else {
            $scope.modal.respuestas[i].respuesta = cod_respuesta;
        }
    }
    $scope.atras = function () {
        $scope.modal.titulo = "ABECÉ de las sustancias y productos químicos, residuos peligrosos";
        $scope.modal.class = "blue";
        $scope.modal.vista = 1;
        $scope.modal.tipo = 1;
    }
    $scope.enviar = function () {
        if ($scope.modal.respuestas.length == 3) {
            console.log($scope.modal.respuestas);
            $http({
                method: 'POST',
                url: "php/genesis/inicio.php",
                data: {
                    function: 'responder_examen',
                    respuestas: angular.toJson($scope.modal.respuestas),
                    respuestas_len: $scope.modal.respuestas.length
                }
            }).then(function (response) {
                if (response.data.hasOwnProperty("Codigo")) {
                    swal('Mensaje', response.data.Nombre, 'success');
                } else {
                    swal('Mensaje', 'Error enviando respuesta', 'error');
                }
                $('#modal-quiz').modal('close');
            });
        } else {
            swal('Mensaje', 'Por favor responda todas las preguntas', 'warning');
        }
    }


    $http({
        method: 'POST',
        url: "php/genesis/funcencuesta.php",
        data: {
            function: 'obtenerEncuesta', data: {
                documento: sessionStorage.getItem('cedula')
            }
        }
    }).then(function (response) {
        if (response.data.valor === "true" && (parseInt(sessionStorage.getItem('municipio') || 0) === 1 || String(sessionStorage.getItem('municipio')).startsWith('8'))) {
            $scope.mostrarEncuesta = true
        } else {
            $scope.mostrarEncuesta = false
        }
    });

    $scope.finalizarEncuesta = () => {
        swal({
            title: '¿Desea finalizar la encuesta?',
            text: 'Verifique que haya diligenciado la encuesta antes de finalizar. No podrá diligenciarla nuevamente',
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: 'No',
            confirmButtonText: 'Sí'
        }).then((result) => {
            if (result === true) {
                $http({
                    method: 'POST',
                    url: "php/genesis/funcencuesta.php",
                    data: {
                        function: 'finalizarEncuesta', data: {
                            documento: sessionStorage.getItem('cedula'),
                            ubicacion: sessionStorage.getItem('municipio')
                        }
                    }
                }).then(function (response) {
                    $scope.mostrarEncuesta = false
                });
            }
        })
    }


    //
    var Carga_Not_Glosa = [49759601, 32828955, 1140819735];
    if ((Carga_Not_Glosa.find(e => e == sessionStorage.getItem('cedula')) != undefined ? true : false)) {
        $http({
            method: 'POST',
            url: "php/genesis/funcgenesis.php",
            data: {
                function: 'Carga_Not_Glosa',
                nit: '0'
            }
        }).then(function (res) {
            notification.getNotification('info', res.data, 'Notificación');
        })
    }
    //
    // $.ajax({
    //     url: "https://ipecho.net/plain",
    //     type: "GET",
    //     success: function (response) {
    //         $scope.Save_Data(response);
    //     },
    //     error: function (jqXHR, textStatus, errorMessage) {
    //         $.ajax({
    //             url: "https://api.ipify.org/",
    //             type: "GET",
    //             success: function (response) {
    //                 $scope.Save_Data(response);
    //             },
    //             error: function (jqXHR, textStatus, errorMessage) {
    //                 $scope.Save_Data("0");
    //             }
    //         });
    //     }
    // });
    // $scope.Save_Data = function (x) {
    //     $http({
    //         method: 'POST',
    //         url: "php/genesis/funcdata.php",
    //         data: { function: 'Save_Data', data: x }
    //     }).then(function (response) {
    //     });
    // }


    document.querySelector(".foot_p > p:nth-child(1)").classList.add('active');
    setInterval(() => {
        document.querySelectorAll(".foot_p > p").forEach(e => {
            e.classList.contains('active') ? e.classList.remove('active') : e.classList.add('active');
        });
    }, 5000);


}]);