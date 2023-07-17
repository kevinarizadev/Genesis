'use strict';
angular.module('GenesisApp')
    .controller('mivacunacovid', ['$scope', '$filter', 'consultaHTTP', 'afiliacionHttp', 'notification', '$timeout', '$rootScope', '$http', '$window', 'ngDialog', 'FileProcessor',
        function ($scope, $filter, consultaHTTP, afiliacionHttp, notification, $timeout, $rootScope, $http, $window, ngDialog, FileProcessor) {


            $scope.titulo = "asdasd";
            $scope.tipo_ips = '';
            $scope.SysDay = new Date();
            $(document).ready(function () {
                $scope.responsable = sessionStorage.getItem('cedula')
                $scope.obtener_token();
                // $scope.ConsultaxTipo();
                $('#modalsemana').modal();

                if ($scope.responsable == 1143457336 || $scope.responsable == 1143450658) {

                    $scope.mostrar_opciones = true;
                } else {
                    $scope.mostrar_opciones = false;
                }

            });

            $scope.ver_dir = true;

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


            $scope.primeraparte = true;
            $scope.setTab = function (newTab) {
                $scope.tab = newTab;
                $(".tabI").removeClass("tabactiva");
                $(".tabII").removeClass("tabactiva");
                switch (newTab) {
                    case 1:
                        $(".tabI").addClass("tabactiva");
                        $scope.mostrar_gestion = false;
                        $scope.mostrar_parte = false;
                        $scope.mostrar_parte2 = false;
                        $scope.mostrar_parte3 = false;
                        $scope.mostrar_parte4 = false;
                        $scope.fecha_asig = $scope.SysDay;
                        $scope.tipoDoc = '';
                        $scope.tipoDocc = '';
                        $scope.tipoDoca = '';
                        $scope.documento = '';
                        $scope.documentoc = '';
                        $scope.documentoa = '';
                        $scope.ips = '';
                        $scope.tipo_ips = '';

                        break;
                    case 2:
                        $(".tabII").addClass("tabactiva");
                        $scope.regimen_contrato = "0";
                        $scope.contrato_contrato = null;
                        $scope.producto = '';
                        $scope.producto = "0";
                        $scope.producto_nombre = "";
                        $scope.mostrar_parte = false;
                        $scope.mostrar_parte2 = false;
                        $scope.mostrar_parte3 = false;
                        $scope.mostrar_parte4 = false;
                        $scope.fecha_asig = $scope.SysDay;
                        $scope.tipoDoc = '';
                        $scope.tipoDocc = '';
                        $scope.tipoDoca = '';
                        $scope.documento = '';
                        $scope.documentoc = '';
                        $scope.documentoa = '';
                        $scope.ips = '';
                        $scope.tipo_ips = '';

                        break;
                        case 3:
                        $(".tabIII").addClass("tabactiva");
                        $scope.regimen_contrato = "0";
                        $scope.contrato_contrato = null;
                        $scope.producto = '';
                        $scope.producto = "0";
                        $scope.producto_nombre = "";
                        $scope.mostrar_parte = false;
                        $scope.mostrar_parte2 = false;
                        $scope.mostrar_parte3 = false;
                        $scope.mostrar_parte4 = false;
                        $scope.mostrar_parte2a = false;
                        $scope.fecha_asig = $scope.SysDay;
                        $scope.tipoDoc = '';
                        $scope.tipoDocc = '';
                        $scope.tipoDoca = '';
                        $scope.documento = '';
                        $scope.documentoc = '';
                        $scope.documentoa = '';
                        $scope.ips = '';
                        $scope.tipo_ips = '';
                        $scope.mostrar_parte4_agend = '';
                        break;
                        case 4:
                            $(".tabIV").addClass("tabactiva");
                            $scope.regimen_contrato = "0";
                            $scope.contrato_contrato = null;
                            $scope.producto = '';
                            $scope.producto = "0";
                            $scope.producto_nombre = "";
                            $scope.mostrar_parte = false;
                            $scope.mostrar_parte2 = false;
                            $scope.mostrar_parte3 = false;
                            $scope.mostrar_parte4 = false;
                            $scope.mostrar_parte2a = false;
                            $scope.fecha_asig = $scope.SysDay;
                            $scope.tipoDoc = '';
                            $scope.tipoDocc = '';
                            $scope.tipoDoca = '';
                            $scope.documento = '';
                            $scope.documentoc = '';
                            $scope.documentoa = '';
                            $scope.ips = '';
                            $scope.tipo_ips = '';
                            $scope.mostrar_parte4_agend = '';
    
                            break;

                            case 5:
                                $(".tabV").addClass("tabactiva");
                                $scope.regimen_contrato = "0";
                                $scope.contrato_contrato = null;
                                $scope.producto = '';
                                $scope.producto = "0";
                                $scope.producto_nombre = "";
                                $scope.mostrar_parte = false;
                                $scope.mostrar_parte2 = false;
                                $scope.mostrar_parte3 = false;
                                $scope.mostrar_parte4 = false;
                                $scope.mostrar_parte2a = false;
                                $scope.fecha_asig = $scope.SysDay;
                                $scope.tipoDoc = '';
                                $scope.tipoDocc = '';
                                $scope.tipoDoca = '';
                                $scope.documento = '';
                                $scope.documentoc = '';
                                $scope.documentoa = '';
                                $scope.ips = '';
                                $scope.tipo_ips = '';
                                $scope.mostrar_parte4_agend = '';
        
                                break;
                    default:
                }
            }
            $scope.isSet = function (tabNum) {
                return $scope.tab === tabNum;
            }
            $scope.setTab(1);

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
                        url: "php/saludpublica/mivacunacovid.php",
                        data: { function: 'obtenerafiliados', tipodocumento: $scope.tipoDoc, documento: $scope.documento }
                    }).then(function (response) {
                        if (response.data.codigo == 1) {
                            swal('Importante', response.data.mensaje, 'info');
                            $scope.mostrar_parte = false;
                        } else {
                            swal.close();
                            $scope.mostrar_parte = true;
                            $scope.Data = response.data;
                            $scope.vdocumento = response.data.tipo_documento + '-' + response.data.documento;


                            $scope.Sapellido_null = response.data.segundo_apellido;
                            $scope.Snombre_null = response.data.segundo_nombre;


                            $scope.mostrarelsegundoapellido = $scope.Sapellido_null == null ? ' ' : $scope.Sapellido_null;
                            $scope.mostrarelsegundonombre = $scope.Snombre_null == null ? ' ' : $scope.Snombre_null;

                            $scope.apellidos = response.data.primer_apellido + ' ' + $scope.mostrarelsegundoapellido;
                            $scope.nombres = response.data.primer_nombre + ' ' + $scope.mostrarelsegundonombre;


                            $scope.fnacimiento = response.data.fecha_nacimiento;
                            $scope.vgenero = response.data.genero;
                            $scope.vregimen = response.data.regimen;

                        }
                    });

                }
                else {
                    notification.getNotification('info', 'Datos del afiliado incompletos!', 'Notificacion');

                    // swal('Genesis', 'Datos del afiliado incompletos', 'warning');
                }
            }



            var datos = {
                "nit": '890102044',
                "tipoEntidad": '2',
                "token": '30933765-dc2d-4896-9ebe-3a9f794a7c35'

            }


            $scope.obtener_token = function () {
                $http({
                    method: 'POST',
                    url: "php/saludpublica/mivacunacovid.php",
                    data: {
                        function: 'obtener_token', datos: (datos)

                    }
                }).then(function (response) {

                });
            }





            $scope.limpiar_datos = function () {

                $scope.tipoDoc = '';
                $scope.tipoDocc = '';
                $scope.tipoDoca = '';
                $scope.documento = '';
                $scope.documentoc = '';
                $scope.documentoa = '';
                $scope.ips = '';
                $scope.tipo_ips = '';
                $scope.fechadeagendamiento = '';
                $scope.horadeagendamiento = '';
                $scope.numerodedosis = '';

            }


            $scope.asignar_ips = function () {
                var datos2 = {
                    "TipoIDPaciente": $scope.tipoDoc,
                    "NoIDPaciente": $scope.documento,
                    "CodPrestador": $scope.tipo_ips
                }
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
                    url: "php/saludpublica/mivacunacovid.php",
                    data: {
                        function: 'RegistrarAsignacion', datos: (datos2)

                    }
                }).then(function (response) {

                    if (response.data.ID) {
                        swal.close();
                        var x = "ID: " + response.data.ID;
                        swal(response.data.Message, x, 'success');
                        $scope.mostrar_parte = false;
                        $scope.guardar_respuesta(response.data.ID,'AS');
                        $scope.limpiar_datos();

                    } else {

                        swal('Notificacion', response.data.Errors[0], 'info');
                    }


                });
            }


            $scope.ConsultaxTipo = function () {
                if ($scope.tipoDocc != "0" && $scope.documentoc != "" && $scope.tipoDocc != null && $scope.documentoc != undefined && $scope.tipoDocc != undefined && $scope.documentoc != null) {
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
                        url: "php/saludpublica/mivacunacovid.php",
                        data: { function: 'obtenerafiliados', tipodocumento: $scope.tipoDocc, documento: $scope.documentoc }
                    }).then(function (response) {
                        if (response.data.codigo == 1) {

                            swal('Importante', response.data.mensaje, 'info');
                            $scope.mostrar_parte2 = false;
                        } else {
                            swal.close();
                            // $scope.mostrar_parte2 = true;
                            $scope.Data = response.data;
                            $scope.vdocumento = response.data.tipo_documento + '-' + response.data.documento;


                            $scope.Sapellido_null = response.data.segundo_apellido;
                            $scope.Snombre_null = response.data.segundo_nombre;


                            $scope.mostrarelsegundoapellido = $scope.Sapellido_null == null ? ' ' : $scope.Sapellido_null;
                            $scope.mostrarelsegundonombre = $scope.Snombre_null == null ? ' ' : $scope.Snombre_null;
                            $scope.apellidos = response.data.primer_apellido + ' ' + $scope.mostrarelsegundoapellido;
                            $scope.nombres = response.data.primer_nombre + ' ' + $scope.mostrarelsegundonombre;

                            $scope.fnacimiento = response.data.fecha_nacimiento;
                            $scope.vgenero = response.data.genero;
                            $scope.vregimen = response.data.regimen;
                            $http({
                                method: 'POST',
                                url: "php/saludpublica/mivacunacovid.php",
                                data: {
                                    function: 'ConsultaxTipo', nit: '890102044', tipo: $scope.tipoDocc, documento: $scope.documentoc

                                }
                            }).then(function (response) {
                                if (response.data.length > 0) {
                                    swal.close();
                                    $scope.mostrar_parte2 = true;
                                    $scope.Data = response.data[0];

                                    $scope.todasv = response.data
                                    $scope.codigodelprestador = response.data[0].CodPrestador;
                                    var x = response.data[0].FechaRegistro.toString().split('T');
                                    var f = x[0].split('-');
                                    f = f[2] + '/' + f[1] + '/' + f[0];
                                    var h = x[1].split('.');
                                    h = h[0];
                                    $scope.fechaderegistro = f;
                                    $scope.horaderegistro = h;

                                    $scope.idasignacion = response.data[0].IDAsignacion;

                                }
                                if (response.data.length == 0) {
                                    $scope.mostrar_parte2 = false;
                                    swal('Importante', 'la persona aun no se le ha asignado IPS', 'info');
                                }
                            });

                        }
                    });

                }
                else {
                    notification.getNotification('info', 'Datos del afiliado incompletos!', 'Notificacion');

                    // swal('Genesis', 'Datos del afiliado incompletos', 'warning');
                }


            }

            $scope.fecha_asig = $scope.SysDay;


            $scope.ConsultaxFecha = function () {
                var fecha_asig = $scope.GetFechaFormat('fecha_asig');
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
                    url: "php/saludpublica/mivacunacovid.php",
                    data: {
                        function: 'ConsultaxFecha', nit: '890102044', fecha: fecha_asig

                    }
                }).then(function (response) {
                    if (response.data.length > 0) {
                        swal.close();
                        $scope.mostrar_parte4 = true;
                        $scope.Data = response.data[0];
                        $scope.informaciondata = response.data;

                        
                        $scope.listacontrol = response.data;
                        $scope.initPaginacion(response.data);




                        $scope.todasv = response.data
                        $scope.codigodelprestador = response.data[0].CodPrestador;
                        var x = response.data[0].FechaRegistro.toString().split('T');
                        var f = x[0].split('-');
                        f = f[2] + '/' + f[1] + '/' + f[0];
                        var h = x[1].split('.');
                        h = h[0];
                        $scope.fecha_reg = f;
                        $scope.hora_reg = h;

                        // $scope.idasignacion = response.data[0].IDAsignacion;


                    } else {
                        $scope.mostrar_parte4 = false;
                        swal('Importante', 'No se encontraron datos asociados a la fecha', 'info');
                    }
                });


            }


            $scope.ConsultaxTipo_agend = function () {
                if ($scope.tipoDocagend != "0" && $scope.documentoagend != "" && $scope.tipoDocagend != null && $scope.documentoagend != undefined && $scope.tipoDocagend != undefined && $scope.documentoagend != null) {
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
                        url: "php/saludpublica/mivacunacovid.php",
                        data: { function: 'obtenerafiliados', tipodocumento: $scope.tipoDocagend, documento: $scope.documentoagend }
                    }).then(function (response) {
                        if (response.data.codigo == 1) {
                            
                            swal('Importante', response.data.mensaje, 'info');
                            $scope.mostrar_parte2a = false;
                        } else {
                            swal.close();
                            // $scope.mostrar_parte2 = true;
                            $scope.Data = response.data;
                            $scope.vdocumento = response.data.tipo_documento + '-' + response.data.documento;


                            $scope.Sapellido_null = response.data.segundo_apellido;
                            $scope.Snombre_null = response.data.segundo_nombre;


                            $scope.mostrarelsegundoapellido = $scope.Sapellido_null == null ? ' ' : $scope.Sapellido_null;
                            $scope.mostrarelsegundonombre = $scope.Snombre_null == null ? ' ' : $scope.Snombre_null;
                            $scope.apellidos = response.data.primer_apellido + ' ' + $scope.mostrarelsegundoapellido;
                            $scope.nombres = response.data.primer_nombre + ' ' + $scope.mostrarelsegundonombre;

                            $scope.fnacimiento = response.data.fecha_nacimiento;
                            $scope.vgenero = response.data.genero;
                            $scope.vregimen = response.data.regimen;
                            $http({
                                method: 'POST',
                                url: "php/saludpublica/mivacunacovid.php",
                                data: {
                                    function: 'ConsultaxTipo_agend', nit: '890102044', tipo: $scope.tipoDocagend, documento: $scope.documentoagend

                                }
                            }).then(function (response) {
                                if (response.data.length > 0) {
                                    swal.close();
                                    $scope.mostrar_parte2a = true;
                                    $scope.Data = response.data[0];

                                    $scope.todasv = response.data
                                    $scope.codigodelprestador = response.data[0].CodPrestador;
                                    var x = response.data[0].FechaRegistro.toString().split('T');
                                    var f = x[0].split('-');
                                    f = f[2] + '/' + f[1] + '/' + f[0];
                                    var h = x[1].split('.');
                                    h = h[0];
                                    $scope.fechaderegistro = f;
                                    $scope.horaderegistro = h;

                                    $scope.idasignacion = response.data[0].IDAsignacion;
                                    $scope.idagendamiento = response.data[0].IDAgendamiento;


                                    
                                    var x = response.data[0].FechaAgendamiento.toString().split('T');
                                    var fa = x[0].split('-');
                                    fa = fa[2] + '/' + fa[1] + '/' + fa[0];
                                    var h = x[1].split('.');
                                    h = h[0];
                                    $scope.fechadeagendamiento_a = fa;
                                    // $scope.horaderegistro = h;


                                    $scope.numerodedos_a = response.data[0].NumeroDosis;
                                    // $scope.fechadeagendamiento_a = response.data[0].FechaAgendamiento;
                                    $scope.horadeagentamiento_a = response.data[0].HoraAgendamiento;




                                }
                                if (response.data.length == 0) {
                                    $scope.mostrar_parte2 = false;
                                    swal('Importante', 'la persona aun no se le ha agendado', 'info');
                                }
                            });

                        }
                    });

                }
                else {
                    notification.getNotification('info', 'Datos del afiliado incompletos!', 'Notificacion');

                    // swal('Genesis', 'Datos del afiliado incompletos', 'warning');
                }


            }

            $scope.ConsultaxFecha_agend = function () {
                          var fecha_asig = $scope.GetFechaFormat('fecha_asig');
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
                              url: "php/saludpublica/mivacunacovid.php",
                              data: {
                                  function: 'ConsultaxFecha_agend', nit: '890102044', fecha: fecha_asig

                              }
                          }).then(function (response) {
                              if (response.data.length > 0) {
                                  swal.close();
                                  $scope.mostrar_parte4_agend = true;
                                  $scope.Data = response.data[0];
                                  $scope.informaciondata = response.data;

                                  $scope.listacontrol = response.data;
                                  $scope.initPaginacion(response.data);

                                  $scope.todasv = response.data
                                  $scope.codigodelprestador = response.data[0].CodPrestador;
                                  var x = response.data[0].FechaRegistro.toString().split('T');
                                  var f = x[0].split('-');
                                  f = f[2] + '/' + f[1] + '/' + f[0];
                                  var h = x[1].split('.');
                                  h = h[0];
                                  $scope.fecha_reg = f;
                                  $scope.hora_reg = h;

                                  // $scope.idasignacion = response.data[0].IDAsignacion;

                              } else {
                                  $scope.mostrar_parte4 = false;
                                  swal('Importante', 'No se encontraron datos asociados a la fecha', 'info');
                              }
                          });

                      }


            $scope.Get_Fecha = function (y) {
                var x = y.toString().split('T');
                var f = x[0].split('-');
                f = f[2] + '/' + f[1] + '/' + f[0];
                var h = x[1].split('.');
                h = h[0];
                return f + ' - ' + h

            }

            // $scope.Consulta_asig = function () {
            //     if ($scope.tipoDocc != "0" && $scope.documentoc != "" && $scope.tipoDocc != null && $scope.documentoc != undefined && $scope.tipoDocc != undefined && $scope.documentoc != null) {
            //         $scope.inactive2 = false;
            //         swal({
            //             html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            //             width: 200,
            //             allowOutsideClick: false,
            //             allowEscapeKey: false,
            //             showConfirmButton: false,
            //             animation: false
            //         });
            //         $http({
            //             method: 'POST',
            //             url: "php/saludpublica/mivacunacovid.php",
            //             data: { function: 'obtenerafiliados', tipodocumento: $scope.tipoDocc, documento: $scope.documentoc }
            //         }).then(function (response) {
            //             if (response.data.codigo == 1) {

            //                 swal('Importante', response.data.mensaje, 'info');
            //                 $scope.mostrar_parte2 = false;
            //             } else {
            //                 swal.close();
            //                 // $scope.mostrar_parte2 = true;
            //                 $scope.Data = response.data;
            //                 $scope.vdocumento = response.data.tipo_documento + '-' + response.data.documento;
            //                 $scope.apellidos = response.data.primer_apellido + ' ' + response.data.segundo_apellido;
            //                 $scope.nombres = response.data.primer_nombre + ' ' + response.data.segundo_nombre;
            //                 $scope.fnacimiento = response.data.fecha_nacimiento;
            //                 $scope.vgenero = response.data.genero;
            //                 $scope.vregimen = response.data.regimen;
            //                 $http({
            //                     method: 'POST',
            //                     url: "php/saludpublica/mivacunacovid.php",
            //                     data: {
            //                         function: 'ConsultaxTipo', nit: '890102044', tipo: $scope.tipoDocc, documento: $scope.documentoc

            //                     }
            //                 }).then(function (response) {
            //                     if (response.data.length > 0) {
            //                         swal.close();
            //                         $scope.mostrar_parte2 = true;
            //                         $scope.Data = response.data[0];

            //                         $scope.todasv = response.data
            //                         $scope.codigodelprestador = response.data[0].CodPrestador;
            //                         var x = response.data[0].FechaRegistro.toString().split('T');
            //                         var f = x[0].split('-');
            //                         f = f[2] + '/' + f[1] + '/' + f[0];
            //                         var h = x[1].split('.');
            //                         h = h[0];
            //                         $scope.fechaderegistro = f;
            //                         $scope.horaderegistro = h;

            //                         $scope.idasignacion = response.data[0].IDAsignacion;

            //                     }
            //                     if (response.data.length == 0) {
            //                         $scope.mostrar_parte2 = false;
            //                         swal('Importante', 'la persona aun no se le ha asignado IPS', 'info');
            //                     }
            //                 });

            //             }
            //         });

            //     }
            //     else {
            //         notification.getNotification('info', 'Datos del afiliado incompletos!', 'Notificacion');

            //         // swal('Genesis', 'Datos del afiliado incompletos', 'warning');
            //     }

            // }



            $scope.consultaragenda = function () {

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
                        url: "php/saludpublica/mivacunacovid.php",
                        data: { function: 'obtenerafiliados', tipodocumento: $scope.tipoDoca, documento: $scope.documentoa }
                    }).then(function (response) {
                        if (response.data.codigo == 1) {

                            swal('Importante', response.data.mensaje, 'info');
                            $scope.mostrar_parte3 = false;
                        } else {
                            swal.close();
                            // $scope.mostrar_parte3 = true;
                            $scope.Data = response.data;
                            $scope.vdocumento = response.data.tipo_documento + '-' + response.data.documento;

                            $scope.Sapellido_null = response.data.segundo_apellido;
                            $scope.Snombre_null = response.data.segundo_nombre;


                            $scope.mostrarelsegundoapellido = $scope.Sapellido_null == null ? ' ' : $scope.Sapellido_null;
                            $scope.mostrarelsegundonombre = $scope.Snombre_null == null ? ' ' : $scope.Snombre_null;

                            $scope.apellidos = response.data.primer_apellido + ' ' + $scope.mostrarelsegundoapellido;
                            $scope.nombres = response.data.primer_nombre + ' ' + $scope.mostrarelsegundonombre;
                            $scope.fnacimiento = response.data.fecha_nacimiento;
                            $scope.vgenero = response.data.genero;
                            $scope.vregimen = response.data.regimen;
                            $scope.pnombrea = response.data.primer_nombre;
                            $scope.snombrea = response.data.segundo_nombre;
                            $scope.papellidoa = response.data.primer_apellido;
                            $scope.sapellidoa = response.data.segundo_apellido;

                            $http({
                                method: 'POST',
                                url: "php/saludpublica/mivacunacovid.php",
                                data: {
                                    function: 'ConsultaxTipo', nit: '890102044', tipo: $scope.tipoDoca, documento: $scope.documentoa

                                }
                            }).then(function (response) {
                                if (response.data.length > 0) {
                                    swal.close();
                                    $scope.Data = response.data[0];
                                    $scope.mostrar_parte3 = true;
                                    $scope.todasv = response.data
                                    $scope.codigodelprestador = response.data[0].CodPrestador;
                                    var x = response.data[0].FechaRegistro.toString().split('T');
                                    var f = x[0].split('-');
                                    f = f[2] + '/' + f[1] + '/' + f[0];
                                    var h = x[1].split('.');
                                    h = h[0];
                                    $scope.fechaderegistro = f;
                                    $scope.horaderegistro = h;
                                    $scope.idasignacion = response.data[0].NoIDPaciente;
                                    $scope.fechadeagendamiento = $scope.SysDay;
                                    // $scope.horadeagendamiento = $scope.SysDay;
                                }
                                if (response.data.length == 0) {
                                    $scope.mostrar_parte3 = false;
                                    swal('Importante', 'la persona aun no se le ha asignado IPS', 'info');
                                }


                            });

                        }
                    });

                }
                else {
                    notification.getNotification('info', 'Datos del afiliado incompletos!', 'Notificacion');

                    // swal('Genesis', 'Datos del afiliado incompletos', 'warning');
                }

            }

            $(document).ready(function () {
                $('#horadeagendamiento').timepicker({
                    timeFormat: 'HH:mm',

                    minTime: new Date(0, 0, 0, 0, 0, 0),
                    maxTime: new Date(0, 0, 0, 23, 59, 0),

                    startHour: 6,
                    startTime: new Date(0, 0, 0, 0, 0, 0),
                    interval: 30
                });
            });

            $scope.RegistrarAgenda = function () {
                var fechadeagendamiento = $scope.GetFechaFormat('fechadeagendamiento');
                var Encontrar_Vacios1 = false;

                if ($scope.CausaNoAgendamiento == null || $scope.CausaNoAgendamiento == '' || $scope.CausaNoAgendamiento == undefined) { Encontrar_Vacios1 = true; }
                if (Encontrar_Vacios1 == true) {
                    swal('Notificacion', 'digitar campos requeridos', 'info');
                    return;
                }
                if ($scope.CausaNoAgendamiento == 0) {
                    if ($('#horadeagendamiento').val() === null || $('#horadeagendamiento').val() === '') {
                        swal('Notificacion', 'digitar campos requeridos', 'info');
                        return;
                    }
                    var Encontrar_Vacios = false;

                    if ($scope.numerodedosis == null || $scope.numerodedosis == '' || $scope.numerodedosis == undefined) { Encontrar_Vacios = true; }
                    if (Encontrar_Vacios == true) {
                        swal('Notificacion', 'digitar campos requeridos', 'info');
                        return;
                    }
                }

                // if ($scope.CausaNoAgendamiento != 0){
                //     $scope.mostrar_causales = true;
                // }else{
                //     $scope.mostrar_causales = false;
                // }


                var datos3 = {
                    "TipoIDPaciente": $scope.tipoDoca,
                    "NoIDPaciente": $scope.documentoa,
                    "PrimerNombre": $scope.pnombrea,
                    "SegundoNombre": $scope.snombrea,
                    "PrimerApellido": $scope.papellidoa,
                    "SegundoApellido": $scope.sapellidoa,
                    "CodPrestador": $scope.codigodelprestador,
                    "FechaAgendamiento": $scope.CausaNoAgendamiento != '0' ? '0' : fechadeagendamiento,
                    "HoraAgendamiento": $scope.CausaNoAgendamiento != '0' ? '0' : $('#horadeagendamiento').val(),
                    "NumeroDosis": $scope.CausaNoAgendamiento != '0' ? '0' : $scope.numerodedosis,
                    "CausaNoAgendamiento": $scope.CausaNoAgendamiento
                }
                console.log(datos3)
            
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
                    url: "php/saludpublica/mivacunacovid.php",
                    data: {
                        function: 'RegistrarAgenda', datos: (datos3)

                    }
                }).then(function (response) {

                    if (response.data.ID) {
                        swal.close();
                        var x = "ID: " + response.data.ID;
                        swal(response.data.Message, x, 'success');
                        $scope.mostrar_parte3 = false;
                        $scope.guardar_respuesta(response.data.ID,'AG' );
                        $scope.limpiar_datos3();

                    } else {

                        swal('Notificacion', response.data.Errors[0], 'info');
                    }


                });

            }

            $scope.guardar_respuesta = function (ID,tipo_asig) {
                $http({
                    method: 'POST',
                    url: "php/saludpublica/mivacunacovid.php",
                    data: {
                        function: 'guardar_respuesta',
                        tipodocumento: tipo_asig == 'AS'? $scope.tipoDoc : $scope.tipoDoca,
                        documento: tipo_asig == 'AS'? $scope.documento : $scope.documentoa,
                        nitprestador: tipo_asig == 'AG'? $scope.codigodelprestador: $scope.ipsvalue,
                        idasignacion: ID,
                        idagendamiento: tipo_asig == 'AS'? '': ID,
                        tipo_asig: tipo_asig,
                        tipo_origen : 'G',
                        direccion :'',
                        telefono : '',
                        celular1 : '',
                        celular2 : '',
                        correo : '',
                        barrio : '',
                        desplazamiento : ''
                    }
                }).then(function (response) {
                    console.log(response.data);
                });
            }
            
           $scope.GetFechaFormat = function (SCOPE) {
                var xFecha = $scope[SCOPE];
                var Fecha = xFecha.getFullYear() + '-' + (((xFecha.getMonth() + 1) < 10) ? '0' + (xFecha.getMonth() + 1) : (xFecha.getMonth() + 1)) + '-' + ((xFecha.getDate() < 10) ? '0' + xFecha.getDate() : xFecha.getDate());
                return Fecha
            }

            // $scope.abrirModal = function () {
            //     $('#modalsemana').modal('open');
            //      $scope.renglon = renglon;
            //     $scope.dialogDiag = ngDialog.open({
            //         template: 'views/salud/modal/modalIps.html',
            //         className: 'ngdialog-theme-plain',
            //         controller: 'modalIpsctrl',
            //         scope: $scope
            //     });
            //     $scope.dialogDiag.closePromise.then(function (data) {
            //         if (data.value != "$closeButton") {
            //             $scope.ips = {
            //                 codigo: data.value.codigo,
            //                 nombre: data.value.nombre,
            //                 ubicacion: data.value.ubicacion,
            //                 codigopres: data.value.COD_PRESTADOR

            //             }

            //             if (typeof $scope.ips.codigo === "undefined" || typeof $scope.ips.nombre === "undefined") {
            //                 $scope.ips = "";
            //                 $scope.ipsvalue = null;
            //             } else {
            //                 $scope.ips = $scope.ips.codigo + ' - ' + $scope.ips.nombre;
            //                 $scope.ipsvalue = $scope.ips.codigo;
            //             }
            //         }

            //     });

            //     document.querySelector('.modal-overlay').addEventListener('click', () => { });
            // }


            // $scope.cerrarModal = function () {
            //     $('#modalsemana').modal('close');
            // }

            $scope.mostrarModalcenso = function (type, renglon) {
                $scope.renglon = renglon;
                $scope.dialogDiag = ngDialog.open({
                    template: 'views/salud/modal/modalmivacunax.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'modalmivacunax',
                    scope: $scope
                });
                $scope.dialogDiag.closePromise.then(function (data) {
                    if (data.value != "$closeButton") {
                        $scope.ipsvaribale = {
                            codigo: data.value.codigo,
                            nombre: data.value.nombre,
                            ubicacion: data.value.ubicacion,
                            codigo_prestador: data.value.codigo_prestador,

                            // codigopres: data.value.COD_PRESTADOR

                        }

                        if (typeof $scope.ipsvaribale.codigo === "undefined" || typeof $scope.ipsvaribale.nombre === "undefined") {
                            $scope.ipsvaribale = "";
                            $scope.ipsvalue = null;
                        } else {
                            $scope.ips = $scope.ipsvaribale.codigo + ' - ' + $scope.ipsvaribale.nombre;
                            $scope.ipsvalue = $scope.ipsvaribale.codigo;
                            $scope.tipo_ips = data.value.codigo_prestador
                        }
                    }

                });

            }


                        $scope.enviaradj = function () {
                swal({
                          title: 'Cargando información API SISPRO'
                      });
              swal.showLoading();
              //Cargar archivo Xls a PHP para procesar y convertir a JSON
            FileProcessor.read(document.querySelector("#adjunto").files[0]).then(
              data => {
                $http({
                  url: "php/recobro/upload_dir.php",
                  // url :"json/recobro/direccionamientos.json",
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  data: {
                    file: data
                  }
                }).then(response => {
                  $scope.upload_asignamientos = response.data;
                  if (Object.keys(response.data[0][0]).length == 3) {              
                    swal('Advertencia','Cargando Asignamiento Masivo','info');
                    $http({
                      method: 'POST',
                      url: "php/saludpublica/paiweb.php",
                      data: {
                        function: 'cargue_asignamiento_bd',                  
                        'data': $scope.upload_asignamientos
                      }
                    }).then(function (r) {
                      
      
                      if (r.data.Codigo == '0') {
                        $scope.id_cargue = r.data.Cargue;  
                      $http({
                        method: 'POST',
                        url: "php/saludpublica/paiweb.php",
                        data: {
                          function: 'cargue_asignamiento_api',                  
                          'data': $scope.upload_asignamientos
                        }
                      }).then(function (res) {
                      $scope.ver_dir = false;
                      $scope.r = res.data;
                      for (let index = 0; index < $scope.r.length; index++) {
                        
                        if (res.data[index].respuesta.ID) {
                          $scope.confirmar_asignamiento(res.data[index],'P');
                        } else {
                          $scope.confirmar_asignamiento(res.data[index],'R');
                        }
                      }
                    });
                      } else {
                        swal('Error','Ha ocurrido un error al cargar la base de datos, favor intentar nuevamente.','error');
                      }
                    });
                }else {
                  if (Object.keys(response.data[0][0]).length == 11) {
                    swal('Exito','AGENDAMIENTO','success');
                  } else {
                    swal('Error','Archivo no contemplado','error');
                  }
                }
                });
              })
          };


          $scope.confirmar_asignamiento = function (data,estado) {
            $http({
              method: 'POST',
              url: "php/saludpublica/paiweb.php",
              data: {
                function: 'confirma_asignamiento_bd',
                'tip_documento':data.TipoIDPaciente,
                'num_documento':data.NoIDPaciente,
                'num_cargue':$scope.id_cargue,
                'responsable': $scope.responsable,
                'estado':estado,
                'num_asignacion':data.respuesta.ID,
                'cod_prestador':data.CodPrestador,
              }
            }).then(function (response) {        
              console.log(response.data);
            });
          }



            // data table */////////////////////////
            $scope.initPaginacion = function (info) {
                $scope.listDatosTemp = info;
                $scope.currentPage = 0;
                $scope.pageSize = 10;
                $scope.valmaxpag = 10;
                $scope.pages = [];
                $scope.configPages();
            }
            $scope.filter = function (val) {
                $scope.listDatosTemp = $filter('filter')($scope.listacontrol, val);
                $scope.configPages();
            }
            $scope.configPages = function () {
                $scope.pages.length = 0;
                var ini = $scope.currentPage - 4;
                var fin = $scope.currentPage + 5;
                if (ini < 1) {
                    ini = 1;
                    if (Math.ceil($scope.listDatosTemp.length / $scope.pageSize) > $scope.valmaxpag)
                        fin = 10;
                    else
                        fin = Math.ceil($scope.listDatosTemp.length / $scope.pageSize);
                } else {
                    if (ini >= Math.ceil($scope.listDatosTemp.length / $scope.pageSize) - $scope.valmaxpag) {
                        ini = Math.ceil($scope.listDatosTemp.length / $scope.pageSize) - $scope.valmaxpag;
                        fin = Math.ceil($scope.listDatosTemp.length / $scope.pageSize);
                    }
                }
                if (ini < 1) ini = 1;
                for (var i = ini; i <= fin; i++) {
                    $scope.pages.push({
                        no: i
                    });
                }
                if ($scope.currentPage >= $scope.pages.length)
                    $scope.currentPage = $scope.pages.length - 1;
                if ($scope.currentPage < 0) { $scope.currentPage = 0; }
            }
            $scope.setPage = function (index) {
                $scope.currentPage = index - 1;
                if ($scope.pages.length % 2 == 0) {
                    var resul = $scope.pages.length / 2;
                } else {
                    var resul = ($scope.pages.length + 1) / 2;
                }
                var i = index - resul;
                if ($scope.listDatosTemp.length % $scope.pageSize == 0) {
                    var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize);
                } else {
                    var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize) + 1;
                }
                var fin = ($scope.pages.length + i) - 1;
                if (fin > tamanomax) {
                    fin = tamanomax;
                    i = tamanomax - 9;
                }
                if (index > resul) {
                    $scope.calcular(i, fin);
                }
            }
            $scope.paso = function (tipo) {
                if (tipo == 'next') {
                    var i = $scope.pages[0].no + 1;
                    if ($scope.pages.length > 9) {
                        var fin = $scope.pages[9].no + 1;
                    } else {
                        var fin = $scope.pages.length;
                    }

                    $scope.currentPage = $scope.currentPage + 1;
                    if ($scope.listDatosTemp.length % $scope.pageSize == 0) {
                        var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize);
                    } else {
                        var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize) + 1;
                    }
                    if (fin > tamanomax) {
                        fin = tamanomax;
                        i = tamanomax - 9;
                    }
                } else {
                    var i = $scope.pages[0].no - 1;
                    if ($scope.pages.length > 9) {
                        var fin = $scope.pages[9].no - 1;
                    } else {
                        var fin = $scope.pages.length;
                    }

                    $scope.currentPage = $scope.currentPage - 1;
                    if (i <= 1) {
                        i = 1;
                        fin = $scope.pages.length;
                    }
                }
                $scope.calcular(i, fin);
            }
            $scope.calcular = function (i, fin) {
                if (fin > 9) {
                    i = fin - 9;
                } else {
                    i = 1;
                }
                $scope.pages = [];
                for (i; i <= fin; i++) {
                    $scope.pages.push({
                        no: i
                    });
                }
            }


            $scope.arrayFiles = [];


        }]);
