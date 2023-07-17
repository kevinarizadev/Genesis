'use strict';
angular.module('GenesisApp')
    .controller('disentimientodevacunacion', ['$scope', '$filter', 'consultaHTTP', 'afiliacionHttp', 'notification', '$timeout', '$rootScope', '$http', '$window', 'ngDialog',
        function ($scope, $filter, consultaHTTP, afiliacionHttp, notification, $timeout, $rootScope, $http, $window, ngDialog) {

            $scope.titulo = "DISENTIMIENTO DE VACUNACION COVID-19";
            $scope.responsable = sessionStorage.getItem('cedula')
            $(document).ready(function () {

                $('#modalfecha').modal();


            });

            $scope.Obtener_Tipos_Documentos = function () {
                    $http({
                      method: 'POST',
                      url: "php/genesis/funcgenesis.php",
                      data: {
                        function: 'Obtener_Tipos_Documentos',
                        Tipo: 'S'
                      }
                    }).then(function (response) {
                      if (response.data && response.data.toString().substr(0, 3) != '<br') {
                        $scope.Tipos_Documentos = response.data;
                      } else {
                        swal({
                          title: "¡Ocurrio un error!",
                          text: response.data,
                          type: "warning"
                        }).catch(swal.noop);
                      }
                    });
                  }
            $scope.Obtener_Tipos_Documentos();


            $scope.buscarAfiliado = function () {
                if ($scope.tipoDoc != "0" && $scope.documento != "" && $scope.tipoDoc != null && $scope.documento != undefined && $scope.tipoDoc != undefined && $scope.documento != null) {
                    $scope.inactive2 = false;
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
                        url: "php/saludpublica/disentimientodevacunacion.php",
                        data: { function: 'obtenerafiliados', responsable: $scope.responsable, tipodocumento: $scope.tipoDoc, documento: $scope.documento }
                    }).then(function (response) {
                        if (response.data.CODIGO == 1) {
                            swal.close();

                            $scope.mostrar_parte = true;
                            $scope.inactive2 = true;
                            $scope.inactive1 = false;
                            $scope.Data = response.data;
                            $scope.codigo_unico = response.data.AFILID;
                            $scope.genero = response.data.GENERO;
                            $scope.infoafiliadotele = response.data;

                        } else {
                            swal.close();
                            // swal('Importante', response.data.mensaje, 'info');
                            swal('Vacunación Covid-19 ', response.data.NOMBRE, 'error').catch(swal.noop);
                            $scope.mostrar_parte = false;

                        }
                    });

                }
                else {
                    notification.getNotification('info', 'Datos del afiliado incompletos!', 'Notificacion');
                    // swal('Genesis', 'Datos del afiliado incompletos', 'warning');
                }
            }

            


            $scope.p_listar_disentimiento = function () {
                if ($scope.tipoDoca != "0" && $scope.documentoa != "" && $scope.tipoDoca != null && $scope.documentoa != undefined && $scope.tipoDoca != undefined && $scope.documentoa != null) {
                    $scope.inactive2 = false;
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
                        url: "php/saludpublica/disentimientodevacunacion.php",
                        data: { function: 'p_listar_disentimiento', responsable: $scope.responsable, tipodocumento: $scope.tipoDoca, documento: $scope.documentoa }
                    }).then(function (response) {
                        if (response.data.CODIGO == 1) {
                            swal.close();

                            $scope.mostrar_parte2 = true;
                            $scope.inactive2 = true;
                            $scope.inactive1 = false;
                            $scope.Data = response.data;
                            $scope.codigo_unico = response.data.AFILID;
                            $scope.ver_consentimiento = response.data.CONSENTIMIENTO;
                            $scope.ver_dosis = response.data.NUMERO_DOSIS;
                            $scope.infoafiliadotele = response.data;


                            $scope.mostrar_consentimiento1 = false;
                            $scope.mostrar_consentimiento2 = false;
                            if ($scope.ver_consentimiento == 'S') {
                                $scope.mostrar_consentimiento1 = true;
                                $scope.mostrar_consentimiento2 = false;
                            } else {
                                $scope.mostrar_consentimiento1 = false;
                                $scope.mostrar_consentimiento2 = true;

                            }


                            $scope.mostrar_dosis1 = false;
                            $scope.mostrar_dosis2 = false;
                            if ($scope.ver_dosis == '1') {
                                $scope.mostrar_dosis1 = true;
                                $scope.mostrar_dosis2 = false;
                            } else if (ver_dosis = '2') {
                                $scope.mostrar_dosis1 = false;
                                $scope.mostrar_dosis2 = true;

                            }

                        } else {
                            swal.close();
                            // swal('Importante', response.data.mensaje, 'info');
                            swal('Vacunación Covid-19 ', response.data.NOMBRE, 'error').catch(swal.noop);
                            $scope.mostrar_parte2 = false;


                        }
                    });

                }
                else {
                    notification.getNotification('info', 'Datos del afiliado incompletos!', 'Notificacion');

                    // swal('Genesis', 'Datos del afiliado incompletos', 'warning');
                }
            }

            $scope.limpiardatos = function () {
                $scope.tipoDoc = '';
                $scope.tipoDoca = '';
                $scope.documento = '';
                $scope.documentoa = '';
                $scope.motivo = '';
                $scope.data.formato = '';
                // document.querySelector('#RUT').value = "";
                document.querySelector("#RUT").value = '';
                document.querySelector("#inputFilePlaceHolder").value = '';

                document.querySelector("#CONSENTIMIENTOPDF").value = '';
                document.querySelector("#inputFilePlaceHolder2").value = '';

            }

            $scope.cargue_soporte = function () {
                setTimeout(() => {
                    $scope.$apply();
                }, 500);
                $http({
                    method: 'POST',
                    url: "php/saludpublica/carga_soporte.php",
                    data: {
                        soporte: $scope.soporte,
                        ext: $scope.extension,
                        namefile: $scope.tipoDoc + '-' + $scope.documento
                    }
                }).then(function (response) {
                    console.log(response.data);
                    $scope.ruta = response.data;
                    setTimeout(() => {
                        $scope.$apply();
                    }, 500);
                })

            }



            $scope.cargue_soporte2 = function () {
                $scope.consentimiento = 'CS'
                setTimeout(() => {
                    $scope.$apply();
                }, 500);
                $http({
                    method: 'POST',
                    url: "php/saludpublica/carga_soporte2.php",
                    data: {
                        soporte: $scope.soporte2,
                        ext: $scope.extension2,
                        namefile: $scope.tipoDoca + '-' + $scope.documentoa + '-' + $scope.consentimiento
                    }
                }).then(function (response) {
                    console.log(response.data);
                    $scope.ruta2 = response.data;
                    setTimeout(() => {
                        $scope.$apply();
                    }, 500);
                })

            }



            $scope.F_Hideinformacion = function () {
                $scope.limpiardatos();
                $scope.mostrar_parte = false;
                $scope.mostrar_parte2 = false;

                setTimeout(() => {
                    $scope.$apply();
                }, 500);
            }





            $scope.p_procesa_disentimiento = function () {
                const soporteInput = document.querySelector('#RUT')
                // $scope.soporte = "123123123123"

                var Encontrar_Vacios1 = false;

                if ($scope.motivo == null || $scope.motivo == '' || $scope.motivo == undefined) { Encontrar_Vacios1 = true; }
                if (Encontrar_Vacios1 == true) {
                    swal('Notificacion', 'Completar campos obligatorios', 'info');
                    return;
                }

                if (soporteInput.files.length === 0) {
                    swal('Notificacion', 'Debe cargar soporte', 'info');
                    return;
                }


                if ($scope.tipoDoc != "0" && $scope.documento != "" && $scope.tipoDoc != null && $scope.documento != undefined && $scope.tipoDoc != undefined && $scope.documento != null) {
                    $scope.inactive2 = false;
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
                        url: "php/saludpublica/disentimientodevacunacion.php",
                        data: {
                            function: 'p_procesa_disentimiento',
                            responsable: $scope.responsable,
                            pafiliado: $scope.codigo_unico,
                            tipodocumento: $scope.tipoDoc,
                            documento: $scope.documento,
                            soporte: $scope.ruta,
                            motivo: $scope.motivo
                        }
                    }).then(function (response) {
                        if (response.data.CODIGO == 1) {
                            swal.close();

                            $scope.mostrar_parte = false;
                            $scope.inactive2 = true;
                            $scope.inactive1 = false;
                            $scope.limpiardatos();


                            swal('Vacunación Covid-19 ', response.data.NOMBRE, 'success').catch(swal.noop);
                            window.location.reload();

                        } else {
                            swal.close();
                            // swal('Importante', response.data.mensaje, 'info');
                            swal('Vacunación Covid-19 ', response.data.NOMBRE, 'error').catch(swal.noop);
                            $scope.mostrar_parte = false;

                        }
                    });

                }
                else {
                    notification.getNotification('info', 'Datos del afiliado incompletos!', 'Notificacion');

                    // swal('Genesis', 'Datos del afiliado incompletos', 'warning');
                }
            }


            $scope.guardar_consentimiento = function () {
                $scope.ftp = '3';
                const soporteInput2 = document.querySelector('#CONSENTIMIENTOPDF')
                // $scope.soporte = "123123123123"

                var Encontrar_Vacios2 = false;

                if ($scope.motivo2 == null || $scope.motivo2 == '' || $scope.motivo2 == undefined) { Encontrar_Vacios2 = true; }
                if (Encontrar_Vacios2 == true) {
                    swal('Notificacion', 'Completar campos obligatorios', 'info');
                    return;
                }

                if (soporteInput2.files.length === 0) {
                    swal('Notificacion', 'Debe cargar soporte', 'info');
                    return;
                }


                if ($scope.tipoDoca != "0" && $scope.documentoa != "" && $scope.tipoDoca != null && $scope.documentoa != undefined && $scope.tipoDoca != undefined && $scope.documentoa != null) {
                    $scope.inactive2 = false;
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
                        url: "php/saludpublica/disentimientodevacunacion.php",
                        data: {
                            function: 'p_procesa_consentimiento',
                            responsable: $scope.responsable,
                            pafiliado: $scope.codigo_unico,
                            tipodocumento: $scope.tipoDoca,
                            documento: $scope.documentoa,
                            soporte: $scope.ruta2,
                            motivo: $scope.motivo2,
                            ftp: $scope.ftp
                        }
                    }).then(function (response) {
                        if (response.data.CODIGO == 1) {
                            swal.close();

                            $scope.mostrar_parte = false;
                            $scope.inactive2 = true;
                            $scope.inactive1 = false;
                            $scope.limpiardatos();


                            swal('Vacunación Covid-19 ', response.data.NOMBRE, 'success').catch(swal.noop);
                            window.location.reload();

                        } else {
                            swal.close();
                            // swal('Importante', response.data.mensaje, 'info');
                            swal('Vacunación Covid-19 ', response.data.NOMBRE, 'error').catch(swal.noop);
                            $scope.mostrar_parte = false;

                        }
                    });

                }
                else {
                    notification.getNotification('info', 'Datos del afiliado incompletos!', 'Notificacion');

                    // swal('Genesis', 'Datos del afiliado incompletos', 'warning');
                }
            }


            $scope.abrirModal = function (data) {

                $scope.detalleCenso = { 'censo': null, 'ubicacion': null };
                $('#modalfecha').modal('open');


                document.querySelector('.modal-overlay').addEventListener('click', () => { });
            }

            $scope.cerrarModal = function () {
                $('#modalfecha').modal('close');
            }



            $scope.descargafile = function (ruta) {
                $http({
                    method: 'POST',
                    url: "php/saludpublica/disentimientodevacunacion.php",
                    data: {
                        function: 'descargaAdjunto',
                        ruta: ruta.SOPORTE_DISENTIMIENTO
                    }
                }).then(function (response) {
                    console.log(response.data);
                    window.open("temp/" + response.data);
                })

            }



            $scope.descargafile2 = function (ruta) {
                $http({
                    method: 'POST',
                    url: "php/saludpublica/disentimientodevacunacion.php",
                    data: {
                        function: 'descargaAdjunto2',
                        ruta: ruta.SOPORTE_CONSENTIMIENTO
                    }
                }).then(function (response) {
                    console.log(response.data);
                    window.open("temp/" + response.data);
                })

            }

            //Cargue de archivos DISENTIMIENTO
            $scope.extension = '';
            $scope.data = { formato: '', requiredFile: true }
            $('#RUT').change(function () {//Detecta los cambios que sufre el input file            
                $timeout(function () {//Usado para validar el file en tiempo real
                    var file = document.getElementById('RUT').files[0];//Obtiene el file del input para validarlo
                    $scope.data.formato = '';
                    if (file) {//Valida si existe el archivo en el input file
                        if (file.size <= 5242880) {//valida que el size del file sea <= 5 mb                                                         
                            if (file.name.split('.').pop().toLowerCase() == 'pdf') {//Obtiene la extension del file y valida que sea un pdf                      
                                $scope.data.formato = 'Dentro Del Peso Limite y Formato Validado';
                                $scope.data.requiredFile = false;
                                var reader = new FileReader();
                                reader.onload = function (event) {
                                    $timeout(function () {
                                        $scope.soporte = event.target.result; //Asigna el file al ng-model pqrFile
                                        $scope.extension = file.name.split('.').pop().toLowerCase();//Asigna la extension del pqrFile
                                        console.log($scope.soporte);
                                        console.log($scope.extension);
                                        $scope.cargue_soporte();
                                    })
                                };
                                reader.readAsDataURL(file);
                            } else {
                                $scope.data.formato = 'Formato Invalido solo puedes adjuntar archivos con extensión .pdf';
                                $scope.soporte = null;//Asigna null al ng-model pqrFile  
                                $scope.extension = null;//Asigna null a la extension pqrFile 

                            }
                        } else {
                            $scope.data.formato = 'Limite de Peso Excedido';
                            $scope.soporte = null;//Asigna null al ng-model pqrFile   
                            $scope.extension = null;//Asigna null a la extension pqrFile   

                        }
                    } else {
                        $scope.data.formato = '';
                        $scope.soporte = null;//Asigna null al ng-model pqrFile   
                        $scope.extension = null;//Asigna null a la extension pqrFile 

                    }
                }, 100);
            })



            //Cargue de archivos CONSENTIMIENTO
            $scope.extension2 = '';
            $scope.data = { formato2: '', requiredFile2: true }
            $('#CONSENTIMIENTOPDF').change(function () {//Detecta los cambios que sufre el input file            
                $timeout(function () {//Usado para validar el file en tiempo real
                    var file = document.getElementById('CONSENTIMIENTOPDF').files[0];//Obtiene el file del input para validarlo
                    $scope.data.formato2 = '';
                    if (file) {//Valida si existe el archivo en el input file
                        if (file.size <= 5242880) {//valida que el size del file sea <= 5 mb                                                         
                            if (file.name.split('.').pop().toLowerCase() == 'pdf') {//Obtiene la extension2 del file y valida que sea un pdf                      
                                $scope.data.formato2 = 'Dentro Del Peso Limite y Formato Validado';
                                $scope.data.requiredFile2 = false;
                                var reader = new FileReader();
                                reader.onload = function (event) {
                                    $timeout(function () {
                                        $scope.soporte2 = event.target.result; //Asigna el file al ng-model pqrFile
                                        $scope.extension2 = file.name.split('.').pop().toLowerCase();//Asigna la extension2 del pqrFile
                                        console.log($scope.soporte2);
                                        console.log($scope.extension2);
                                        $scope.cargue_soporte2();
                                    })
                                };
                                reader.readAsDataURL(file);
                            } else {
                                $scope.data.formato2 = 'Formato Invalido solo puedes adjuntar archivos con extensión .pdf';
                                $scope.soporte2 = null;//Asigna null al ng-model pqrFile  
                                $scope.extension2 = null;//Asigna null a la extension2 pqrFile 

                            }
                        } else {
                            $scope.data.formato2 = 'Limite de Peso Excedido';
                            $scope.soporte2 = null;//Asigna null al ng-model pqrFile   
                            $scope.extension2 = null;//Asigna null a la extension2 pqrFile   

                        }
                    } else {
                        $scope.data.formato2 = '';
                        $scope.soporte2 = null;//Asigna null al ng-model pqrFile   
                        $scope.extension2 = null;//Asigna null a la extension2 pqrFile 

                    }
                }, 100);
            });



        }]);