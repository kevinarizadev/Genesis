'use strict';
angular.module('GenesisApp')
    .controller('notificacionglosaController', ['$scope', '$http', 'notification', 'acasHttp', 'ngDialog', '$filter', 'communication', '$rootScope',
        function ($scope, $http, notification, acasHttp, ngDialog, $filter, communication, $rootScope) {

            $scope.paso = 1; $scope.inactivecontratos = true;


            $scope.usuario_cedula=sessionStorage.getItem('cedula');
            $scope.usuario_cargo=sessionStorage.getItem('cargo');
            $scope.usuario_nombre=sessionStorage.getItem('nombre');
            $(document).ready(function () {
                $('#modal_impreso').modal();
            })
            $scope.ver = function (x) {
                $('#modal_impreso').modal('open');
                $scope.v_pnumero = x.NUMERO;
                $scope.v_pubicacion = x.UBICACION;
                $scope.v_presponsable = $scope.usuario_cedula;
                $scope.nombre_adjunto = x.CONS;
                $scope.seccional = x.SECCIONAL;
                $scope.v_padjunto = 'url';
                
            }
            $scope.guardar_datos_glosa=function () {
                
                
                if (($scope.fecha == '' || $scope.fecha == undefined ) ||  ($scope.base == '' || $scope.base == undefined ))  { 
                    swal('Advertencia', '¡El Campo Fecha y Adjunto es Invalido, Favor digitar nuevamente!', 'info');
                } else {
                    swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                    var hoy = new Date();
                     if ($scope.fecha <= hoy) {
                         $http({
                             method: 'POST',
                             url: "php/cuentasmedicas/notificacionglosa_win.php",
                             data: {
                                 function: 'subir_adjuntos',
                                 achivobase: $scope.base,
                                 ext:'pdf',
                                 nombre: $scope.nombre_adjunto,
                                 seccional: $scope.seccional
                             }
                         }).then(function (response) {
                             $scope.v_padjunto = response.data;
                             $http({
                                    method: 'POST',
                                    url: "php/cuentasmedicas/notificacionglosa_win.php",
                                     data: {
                                     function: 'p_u_radica_notificacion',
                                     v_pnumero: $scope.v_pnumero,
                                     v_pubicacion: $scope.v_pubicacion,
                                     v_presponsable: $scope.v_presponsable,
                                     v_padjunto: $scope.v_padjunto,
                                     v_pfecha_rad_ips: $scope.fecha
                                    }
                             }).then(function (response) {
                                 swal.close();
                                    if (response.data.Codigo == 0) {
                                        swal({
                                            title: "Completado!",
                                            text: response.data.Nombre,
                                            allowEscapeKey: false,
                                            allowOutsideClick: false,
                                            type: "success"
                                        }).then(function () {
                                           $scope.nombre_adjunto='';
                                           $scope.base='';
                                           $scope.fecha=''; 
                                        })
                                    } else {
                                        swal('Advertencia', response.data.Nombre, 'info');
                                    }
                                });
                         });
                     } else { 
                         swal('Advertencia', '¡La fecha no puede ser mayor al dia de hoy!', 'info');
                     } 
                 }
                

                // procedure p_u_radica_notificacion(v_pnumero in number,
                //     v_pubicacion in number,
                //     v_presponsable in number,
                //     v_padjunto in varchar2,
                //     v_pfecha_rad_ips date,
                //     v_json_out   out clob--, v_result out sys_refcursor
                // )

                
                // swal({
                //     title: 'Cargando información...',
                //     allowEscapeKey: false,
                //     allowOutsideClick: false
                // });
                // swal.showLoading();
                // $http({
                //     method: 'POST',
                //     url: "php/cuentasmedicas/notificacionglosa_win.php",
                //     data: {
                //         function: 'p_u_radica_notificacion',
                //         v_pnumero: x.NUMERO,
                //         v_pubicacion: x.UBICACION,
                //         v_presponsable: '1143163517'
                //     }
                // }).then(function (response) {
                //     if (response.data.Codigo == 0) {
                        
                        
                //     }
                // });
            }

            $scope.getBase64 = function (file) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                });
            }

            $scope.loadFile = function () {
                var fileInput = document.querySelector('#Comentario_Adjunto');
                if (fileInput.files.length != 0) {
                    var x = fileInput.files[0].name.split('.');
                    if ((x[x.length - 1].toUpperCase() == 'PDF')) {
                        if (fileInput.files[0].size < 7340032 && fileInput.files[0].size > 0) {
                            $scope.getBase64(fileInput.files[0]).then(function (result) {
                                $scope.base = result;
                                $timeout(function () { $scope.$apply(); }, 300);
                            });
                        } else {
                            swal('Advertencia', '¡El archivo seleccionado excede el peso máximo posible (7MB)!', 'info');
                            fileInput.value = '';
                            $scope.Comentario_Model_Adjunto = '';
                            $scope.base = '';
                            $timeout(function () { $scope.$apply(); }, 300);
                        }
                    } else {
                        swal('Advertencia', '¡El archivo seleccionado deber ser formato PDF', 'info');
                        fileInput.value = '';
                        $scope.Comentario_Model_Adjunto = '';
                        $scope.base = '';
                        $timeout(function () { $scope.$apply(); }, 300);
                    }
                }
            }


            $scope.imprimir = function (x) {
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/cuentasmedicas/notificacionglosa_win.php",
                    data: {
                        function: 'p_u_descarga_notificacion',
                        v_pnumero: x.NUMERO,
                        v_pubicacion: x.UBICACION,
                        v_presponsable: $scope.usuario_cedula,

                    }
                }).then(function (response) {
                    if (response.data.Codigo == 0) {
                        swal.close();
                        var datos = {
                            numero: x.NUMERO,
                            ubicacion: x.UBICACION,
                            nit: x.NIT,
                            //ips: x.NOMBRE,
                            direcion: "",
                            cedula: $scope.usuario_cedula,
                            cargo:$scope.usuario_cargo,
                            nombre:$scope.usuario_nombre,
                        };
                        window.open('views/Cuentasmedicas/formatos/formato_notificacionglosa.php?datos=' + angular.toJson(datos), '_blank', "width=900,height=1100");
                    }
                   });
            }
                    

            $scope.buscar_glosa = function () {
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();

                $http({
                    method: 'POST',
                    url: "php/cuentasmedicas/notificacionglosa_win.php",
                    data: {
                        function: 'p_obtener_glosas_win',
                        v_pstatus: $scope.estado,
                        v_cedula:$scope.usuario_cedula
                    }
                }).then(function (response) {
                    swal.close();
                    if (response.data.length == 0) {
                        $scope.ListarResultado = "";
                    } else {
                        $scope.inactivecontratos = false;
                        $scope.ListarResultado = response.data;
                        console.log($scope.ListarResultado);

                    }
                });
            }
        
            }]).filter('capitalize', function () {
            return function (input) {
                return (angular.isString(input) && input.length > 0) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : input;
            }
        });