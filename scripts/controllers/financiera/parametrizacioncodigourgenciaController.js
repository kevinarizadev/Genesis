'use strict';
angular.module('GenesisApp')
    .controller('parametrizacioncodigourgenciaController', ['$scope', 'notification', 'cfpLoadingBar', '$http', 'ngDialog',
        function ($scope, notification, cfpLoadingBar, $http, ngDialog) {



            $(document).ready(function () {
                $scope.Obtener_Listado_Ips_G();
                $scope.documento = sessionStorage.getItem('cedula');
                $scope.sysdate = new Date();
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

                $('#modallistadoipscontratada').modal();
            });

            $scope.filterOptions = "1";
            $scope.codigoips = "";
            $scope.listadoipsblanca = "";



            $scope.closemodals = function () {
                $("#modallistadoipscontratada").modal("close");
            }
            $scope.abrirmodallistadoips = function () {
                $('#modallistadoipscontratada').modal("open");
            }

            function formatDate(date) {
                var d = new Date(date);
                var dd = ('0' + d.getDate()).slice(-2);
                var mm = ('0' + (d.getMonth() + 1)).slice(-2);
                var yyyy = d.getFullYear();
                var hh = d.getHours();
                var mi = d.getMinutes();
                return dd + '/' + mm + '/' + yyyy; //+' '+hh+':'+mi+':00';
            }
            // $scope.filtrarpornombre = function (nombrelista) {
            //     $scope.filtroipslistado = nombrelista;
            // }

            $scope.Obtener_Listado_Ips_G = function () {
                $http({
                    method: 'POST',
                    url: "php/financiera/parametrizacioncodigourgencia.php",
                    data: {
                        function: 'obtener_Listado_ips_Gris'
                    }
                }).then(function (response) {
                    if (response.data && response.data.toString().substr(0, 3) != '<br') {
                        $scope.listadoipsgris = response.data;
                        $scope.filtroipslistado = "";
                    } else {
                        swal({
                            title: "¡Ocurrio un error!",
                            text: response.data,
                            type: "warning"
                        }).catch(swal.noop);
                    }
                });
            }

            $scope.Obtener_Listado_Ips = function (codigobusqueda) {
                $http({
                    method: 'POST',
                    url: "php/financiera/parametrizacioncodigourgencia.php",
                    data: {
                        function: 'obtener_Listado',
                        codigo: codigobusqueda
                    }
                }).then(function (response) {
                    if (response.data && response.data.toString().substr(0, 3) != '<br') {
                        $scope.listadoipsblanca = response.data;
                    } else {
                        swal({
                            title: "¡Ocurrio un error!",
                            text: response.data,
                            type: "warning"
                        }).catch(swal.noop);
                    }
                });
            }
            $scope.cambiar_tipo_contrato = function (nitips, cambiar_contrato, mensaje) {
                swal({
                    title: 'Confirmar',
                    text: '¿Esta seguro De cambiar ala Lista ' + mensaje + ' Esta Ips ?',
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    $http({
                        method: 'POST',
                        url: "php/financiera/parametrizacioncodigourgencia.php",
                        data: {
                            function: 'Cambiar_el_Contrato',
                            nitips: nitips,
                            cambiar_contrato: cambiar_contrato,
                            accion: 'I'
                        }
                    }).then(function (response) {
                        if (response.data && response.data.toString().substr(0, 3) != '<br') {
                            $scope.closemodals();
                            $scope.filterOptions = "1";
                            $scope.listadoipsblanca = "";
                            $scope.codigoips = "";
                            $scope.Obtener_Listado_Ips_G();
                            swal("Exito", "Ips Actualizado a la Lista seleccionado Correctamente", "success");
                        } else {
                            swal({
                                title: "¡Ocurrio un error!",
                                text: response.data,
                                type: "warning"
                            }).catch(swal.noop);
                        }
                    });
                })
            }

            $scope.cambiar_tipo_contrato_g_n = function (nitips, cambiar_contrato, mensaje) {
                if (cambiar_contrato === 'G') {
                    var pasar_lista = 'N';
                    var pasar_lista_nombre = 'ROJA';
                } else if (cambiar_contrato === 'N') {
                    var pasar_lista = 'G';
                    var pasar_lista_nombre = 'AMARILLO';
                } else {
                    swal("Campo Requerido", "Por favor Seleccionar una Opcion", "info");
                }
                swal({
                    title: 'Seleccionar El Estado '+mensaje+'',
                    html: '<div class="form-group col-md-12">' +
                        '<select class="form-control" name="actualizaripslistado" id="actualizaripslistado">' +
                        '<option value="" required>Seleccionar</option>' +
                        '<option value="' + pasar_lista + '">' + pasar_lista_nombre + '</option>' +
                        '<option value="B">VERDE</option>' +
                        '</select>' +
                        '</div>',
                    showCancelButton: true,
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar'
                }).then(function (result) {
                    var actualizaripslistado = $("#actualizaripslistado").val();
                    if (actualizaripslistado == '' || actualizaripslistado == undefined ||actualizaripslistado == null){
                        swal("Campo Requerido", "Por favor Seleccionar una Opcion", "info");
                    } else{
                        $http({
                            method: 'POST',
                            url: "php/financiera/parametrizacioncodigourgencia.php",
                            data: {
                                function: 'Cambiar_el_Contrato',
                                nitips: nitips,
                                cambiar_contrato: actualizaripslistado,
                                dia:"",
                                hora:"",
                                accion: 'U'
                            }
                        }).then(function (response) {
                            if (response.data && response.data.toString().substr(0, 3) != '<br') {
                                $scope.closemodals();
                                $scope.filterOptions = "1";
                                $scope.listadoipsblanca = "";
                                $scope.codigoips = "";
                                $scope.Obtener_Listado_Ips_G();
                                swal("Exito", " Se Actualizo a Lista Seleccionada", "success");
                            } else {
                                swal({
                                    title: "¡Ocurrio un error!",
                                    text: response.data,
                                    type: "warning"
                                }).catch(swal.noop);
                            }
                        });
                    }
                })
            }
            $scope.cambiar_numero_codigos = function (nitips) {
                swal({
                    title: 'Especifique la cantidad por Dia y Hora',
                    html: '<div class="row">'+
                    '<div class="col l6 m6 s6">'+
                    '<label style="padding-left: 15%;"><strong>Cant. Por Dia</strong></label>'+
                    '<div class="col s12 ">'+
                        '<input name="cantidad_dia" id="cantidad_dia" maxlength="2" onkeyup="FormatSoloNumero()" type="text" style="border: 1px solid #dee2e6;'+
                        'border-radius: 0.25rem;'+
                        'background-color: #fff;'+
                        'background-clip: padding-box;'+
                        'padding: 0 1em;">'+
                    '</div>'+
                '</div>'+
                '<div class="col l6 m6 s6">'+
                '<label style="padding-left: 15%;"><strong>Cant. Por Hora</strong></label>'+
                '<div class="col s12 ">'+
                    '<input name="cantidad_hora" id="cantidad_hora" maxlength="2" onkeyup="FormatSoloNumero()" type="text" style="border: 1px solid #dee2e6;'+
                    'border-radius: 0.25rem;'+
                    'background-color: #fff;'+
                    'background-clip: padding-box;'+
                    'padding: 0 1em;">'+
                '</div>'+
            '</div>'+
                    '</div>',
                    showCancelButton: true,
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar'
                }).then(function (result) {
                    var cantidad_dia = $("#cantidad_dia").val();
                    var cantidad_hora = $("#cantidad_hora").val();
                    if (cantidad_dia == '' || cantidad_dia == undefined ||cantidad_dia == null ||
                    cantidad_hora == '' || cantidad_hora == undefined ||cantidad_hora == null){
                        swal("Campo Requerido", "Por favor Ingrese algun valor", "info");
                    } else{
                        if (parseInt(cantidad_dia) < parseInt(cantidad_hora)){
                            swal("Informacion", "La cantidad asignada por hora no debe ser superior a la cantidad ingresada por dia", "info");
                        } else {
                            $http({
                                method: 'POST',
                                url: "php/financiera/parametrizacioncodigourgencia.php",
                                data: {
                                    function: 'Cambiar_el_Contrato',
                                    nitips: nitips,
                                    cambiar_contrato: "",
                                    dia:cantidad_dia,
                                    hora:cantidad_hora,
                                    accion: 'T'
                                }
                            }).then(function (response) {
                                if (response.data && response.data.toString().substr(0, 3) != '<br') {
                                    $scope.Obtener_Listado_Ips_G();
                                    swal("Exito", " Se Actualizo la cantidad de codigos por hora y dia Corectamente", "success");
                                } else {
                                    swal({
                                        title: "¡Ocurrio un error!",
                                        text: response.data,
                                        type: "warning"
                                    }).catch(swal.noop);
                                }
                            });
                        }
                        }
                })
            }


        }])

       function FormatSoloNumero() {
            const input = document.getElementById('cantidad_dia');
            var valor = input.value;
            valor = valor.replace(/[^0-9]/g, '');
            input.value = valor;

            const input1 = document.getElementById('cantidad_hora');
            var valor1 = input1.value;
            valor1 = valor1.replace(/[^0-9]/g, '');
            input1.value = valor1;
          }
    