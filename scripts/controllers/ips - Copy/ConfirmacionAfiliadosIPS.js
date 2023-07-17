'use strict';
angular.module('GenesisApp')
    .controller('ConfirmacionAfiliadosIPS', ['$scope', '$http', 'consultaHTTP', '$filter', 'ngDialog', 'cfpLoadingBar', 'afiliacionHttp',
        function ($scope, $http, consultaHTTP, $filter, ngDialog, cfpLoadingBar, afiliacionHttp) {
            var dat = { prov: 'navb' }
            $.getJSON("php/obtenersession.php", dat).done(function (respuesta) {
                $scope.sesdata = respuesta;
                $scope.cedula = $scope.sesdata.cedula;
                $scope.ubicacionresponsable = $scope.sesdata.codmunicipio;
                $scope.ListarInformacion();
                $('#modal12').modal();
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    console.log("navbar error obteniendo variables");
                });

            var hoy = new Date();
            var dd = hoy.getDate();
            var mm = hoy.getMonth() + 1; //hoy es 0!                
            var yyyy = hoy.getFullYear();
            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }
            $scope.maxDate = yyyy + '-' + mm + '-' + dd;
            $scope.TablaSoporte = false;
            $scope.Ocultar = true;
            $scope.TablaDeInformacion = false;
            $scope.EditarDeInformacion = true;

            $scope.ListarInformacion = function (estado) {
                if (estado == 'destruir') { swal({ title: 'Cargando Informacion' }); swal.showLoading(); }
                $http({
                    method: 'POST',
                    url: "php/ips/func3047.php",
                    data: { function: 'ListarAfiliacionXConfirmar',usuario:$scope.cedula}
                }).then(function (response) {
                    if (response.data.length > 0) {
                        if (estado == 'destruir') {
                            $scope.tableinformacion.destroy();
                        }
                        $scope.informacion = response.data;
                        $scope.cantidad = response.data.length;
                        setTimeout(function () {
                            $scope.tableinformacion = $('#informacion').DataTable({
                                //dom: 'Bfrtip',
                                //responsive: true,
                                //buttons: ['copy', 'csv', 'excel', 'print'],
                                language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
                                lengthMenu: [[10, 50, -1], [10, 50, 'Todas']],
                                order: [[0, "asc"]]
                            });
                            swal.close();
                        }, 500);
                    } else {
                        swal('Genesis informa', 'No hay Informacion para Mostrar', 'warning');
                    }
                });

            }

            $scope.data = {
                tipo_documento: '',
                documento: '',
                nombre_afiliado: '',
                primer_nombre: '',
                segundo_nombre: '',
                primer_apellido: '',
                segundo_apellido: '',
                departamento: '',
                municipio: '',
                cod_mun: '',
                fecha_nacimiento: '',
                sexo: '',
                genero: '',
                fecha_afiliacion: '',
                direccion: '',
                barrio: '',
                nombre_cabeza: '',
                tipo_documento_cabeza: '',
                documento_cabeza: '',
                correo: '',
                movil: '',
                fijo: '',
                fijo_estado: '',
                movil_estado: '',
                correo_estado: '',
                numero: ''
            }

            $scope.VerDetalle = function (info) {
                $scope.data.tipo_documento = info.tipo_doc;
                $scope.data.documento = info.doc;
                $scope.data.nombre_afiliado = info.nombre_completo;
                $scope.data.primer_nombre = info.primer_nombre;
                $scope.data.segundo_nombre = info.segundo_nombre;
                $scope.data.primer_apellido = info.primer_apellido;
                $scope.data.segundo_apellido = info.segundo_apellido;
                $scope.data.sexo = info.sexo;
                $scope.data.genero = info.genero;
                $scope.data.fecha_nacimiento = info.fecha_nacimiento;
                $scope.data.departamento = info.departamento;
                $scope.data.municipio = info.municipio;
                $scope.data.cod_municipio = info.cod_mun;
                $scope.data.direccion = info.dirrecion;
                $scope.data.barrio = info.barrio;
                $scope.data.fecha_afiliacion = info.fecha_registro;
                $scope.data.documento_cabeza = info.doc_cab;
                $scope.data.tipo_documento_cabeza = info.tipo_doc_cabeza
                $scope.data.nombre_cabeza = info.nombre_cabeza;
                $scope.data.correo = info.correo;
                $scope.data.fijo = info.fijo;
                $scope.data.movil = info.movil;
                $scope.data.fijo_estado = info.fijo_estado;
                $scope.data.movil_estado = info.movil_estado;
                $scope.data.correo_estado = info.correo_estado;
                $scope.data.numero = info.numero;
                $http({
                    method: 'POST',
                    url: "php/ips/func3047.php",
                    data: {
                        function: 'ObtenerSoportes', tipo: $scope.data.tipo_documento, numero: $scope.data.documento
                    }
                }).then(function (response) {
                    $scope.soportes = response.data;
                    $('#modal12').modal('open');
                });

            }

            $scope.close = function () {
                $('#modal12').modal('close');
                $scope.TablaDeInformacion = false;
                $scope.EditarDeInformacion = true;
                $scope.TablaSoporte = false;
                $scope.Ocultar = true;
                $scope.data = {
                    tipo_documento: '',
                    documento: '',
                    nombre_afiliado: '',
                    primer_nombre: '',
                    segundo_nombre: '',
                    primer_apellido: '',
                    segundo_apellido: '',
                    departamento: '',
                    municipio: '',
                    cod_mun: '',
                    fecha_nacimiento: '',
                    sexo: '',
                    fecha_afiliacion: '',
                    direccion: '',
                    barrio: '',
                    nombre_cabeza: '',
                    tipo_documento_cabeza: '',
                    documento_cabeza: '',
                    correo: '',
                    movil: '',
                    fijo: '',
                    fijo_estado: '',
                    movil_estado: '',
                    correo_estado: ''
                }
            }


            $scope.VerSoportes = function (ruta,ftp) {
                if (ftp == 1) {
                  $http({
                    method: 'POST',
                    url: "php/juridica/tutelas/functutelas.php",
                    data: { function: 'descargaAdjunto', ruta: ruta }
                }).then(function (response) {
                    $scope.TablaSoporte = true;
                    $scope.file = ('temp/' + response.data);
                    var tipo = $scope.file.split(".");
                    tipo = tipo[tipo.length - 1];
                    if (tipo.toUpperCase() == "PDF") {
                        if ($scope.TablaDeInformacion == false && $scope.EditarDeInformacion == true) {
                            $scope.Ocultar = false;
                        }
                        $scope.tipoImgPdf = false;

                    } else if (tipo.toUpperCase() == "JPG" || tipo.toUpperCase() == "JPEG" || tipo.toUpperCase() == "PNG" || tipo.toUpperCase() == "TIFF") {
                        $scope.tipoImgPdf = true;
                        if ($scope.TablaDeInformacion == false && $scope.EditarDeInformacion == true) {
                            $scope.Ocultar = false;
                        }

                    } else {
                        $scope.Ocultar = true;
                        swal('Error', response.data, 'error');
                    }
                });
                }
                if (ftp == 2) {
                  $http({
                    method: 'POST',
                    url: "php/getfileSFtp.php",
                    data: { function: 'descargaAdjunto', ruta: ruta }
                }).then(function (response) {
                    $scope.TablaSoporte = true;
                    $scope.file = ('temp/' + response.data);
                    var tipo = $scope.file.split(".");
                    tipo = tipo[tipo.length - 1];
                    if (tipo.toUpperCase() == "PDF") {
                        if ($scope.TablaDeInformacion == false && $scope.EditarDeInformacion == true) {
                            $scope.Ocultar = false;
                        }
                        $scope.tipoImgPdf = false;

                    } else if (tipo.toUpperCase() == "JPG" || tipo.toUpperCase() == "JPEG" || tipo.toUpperCase() == "PNG" || tipo.toUpperCase() == "TIFF") {
                        $scope.tipoImgPdf = true;
                        if ($scope.TablaDeInformacion == false && $scope.EditarDeInformacion == true) {
                            $scope.Ocultar = false;
                        }

                    } else {
                        $scope.Ocultar = true;
                        swal('Error', response.data, 'error');
                    }
                });
                }
                
              }



            $scope.Aprobar = function (i) {
                $scope.ActualizarInformacion(i);




            }



            $scope.CargarSoportes = function () {
                if ($scope.ListadoSeleccionado.length == '0') {
                    swal('Notificacion', 'No Hay Soporte Para El Cargue', 'error');
                } else {
                    return new Promise(function (resolve, reject) {
                        $http({
                            method: 'POST',
                            url: "php/ips/func3047.php",
                            data: {
                                function: 'CargarSoportes',
                                tipodocumento: $scope.datos.tipodocumento,
                                numero: $scope.datos.numero,
                                archivos: JSON.stringify($scope.ListadoSeleccionado)
                            }
                        }).then(function (response) {
                            $scope.respu = response.data;
                            if ($scope.respu.length > '0') {
                                $http({
                                    method: 'POST',
                                    url: "php/ips/func3047.php",
                                    data: {
                                        function: 'SubirArchivos',
                                        tipodocumento: $scope.datos.tipodocumento,
                                        numero: $scope.datos.numero,
                                        rutas: JSON.stringify($scope.respu),
                                        cantidad: $scope.respu.length
                                    }
                                }).then(function (res) {
                                    if (res.data.codigo == '0') {
                                        $scope.resulta = res.data.codigo;
                                        resolve($scope.resulta);
                                    } else {
                                        reject;
                                        swal('Notificacion', res.data.mensaje, 'error');
                                    }
                                });
                            } else {
                                swal('Notificacion', $scope.respuesta.mensaje_detalle, 'error');
                            }
                        });
                    });
                }
            }


            $scope.EditarInformacion = function (i) {
                
                if ($scope.TablaDeInformacion == false && $scope.EditarDeInformacion == true) {
                    $scope.infotemp = {}
                    $scope.infotemp.primer_nombre = i.primer_nombre;
                    $scope.infotemp.segundo_nombre = i.segundo_nombre;
                    $scope.infotemp.primer_apellido = i.primer_apellido;
                    $scope.infotemp.segundo_apellido = i.segundo_apellido;
                    $scope.infotemp.tipo_documento = i.tipo_documento;
                    $scope.infotemp.documento = i.documento;
                    //$scope.infotemp.fecha_nacimiento = i.fecha_nacimiento;
                    var date_formato = i.fecha_nacimiento.split("/");
                    $scope.infotemp.fecha_nacimiento = new Date(date_formato[2], date_formato[1] - 1, date_formato[0]);
                    $scope.infotemp.genero = i.genero;
                    $scope.TablaDeInformacion = true;
                    $scope.EditarDeInformacion = false;
                    if ($scope.file.length > '0' && $scope.TablaDeInformacion == true && $scope.EditarDeInformacion == false) {
                        $scope.Ocultar = true;
                    }

                } else {
                    $scope.TablaDeInformacion = false;
                    $scope.EditarDeInformacion = true;
                    $scope.data.nombre_afiliado = i.primer_nombre + ' ' + i.segundo_nombre + ' ' + i.primer_apellido + ' ' + i.segundo_apellido;
                    $scope.data.primer_nombre = i.primer_nombre;
                    $scope.data.segundo_nombre = i.segundo_nombre;
                    $scope.data.primer_apellido = i.primer_apellido;
                    $scope.data.segundo_apellido = i.segundo_apellido;
                    $scope.data.tipo_documento = i.tipo_documento;
                    $scope.data.documento = i.documento;
                     $scope.data.fecha_nacimiento= moment(i.fecha_nacimiento).format('DD/MM/YYYY');
                    $scope.data.genero = i.genero;
                    if ($scope.file.length > '0' && $scope.TablaDeInformacion == false && $scope.EditarDeInformacion == true) {
                        $scope.Ocultar = false;
                    }

                    switch (i.genero) {
                        case 'F':
                            $scope.data.sexo = 'FEMENINO';
                            break;
                        case 'M':
                            $scope.data.sexo = 'MASCULINO';
                            break;
                        default:
                    }
                }

            }


            $scope.ActualizarInformacion = function (i) {
                return new Promise(function (resolve, reject) {
                   // var formattedDate = moment(i.fecha_nacimiento).format('DD/MM/YYYY');
                    $http({
                        method: 'POST',
                        url: "php/ips/func3047.php",
                        data: {
                            function: 'ActualizarInformacion', codigo: i.numero,
                            tipodocumento: i.tipo_documento,
                            documento: i.documento,
                            pnombre: i.primer_nombre,
                            snombre: i.segundo_nombre,
                            papellido: i.primer_apellido,
                            sapellido: i.segundo_apellido,
                            genero: i.genero,
                            fecha_nacimiento:i.fecha_nacimiento//formattedDate
                        }
                    }).then(function (res) {
                        if (res.data.codigo == '0') {
                            $scope.resulta = res.data.codigo;
                            resolve($scope.resulta);
                        } else {
                            reject;
                            swal('Notificacion', res.data.mensaje, 'error');
                        }
                    });
                });
            }

            $scope.Aprobar = function (i) {
                var promise = $scope.ActualizarInformacion(i);
                promise.then(function (resultado) {
                    if (resultado == '0') {
                        swal({title: 'Guardando Informacion....'});
                        swal.showLoading(); 
                        $http({
                            method: 'POST',
                            url: "php/ips/func3047.php",
                            data: { function: 'AprobarAfiliacion', numero: i.numero, tipo_cab: i.tipo_documento_cabeza, doc_cabeza: i.documento_cabeza, responsable: $scope.cedula, ubicacionresponsable: $scope.ubicacionresponsable }
                        }).then(function (response) {
                            if (response.data.codigo == '0') {
                                swal('Genesis informa', response.data.mensaje, 'success').then((result) => {
                                    if (result) {
                                        $scope.close();
                                        swal.close();
                                        $scope.ListarInformacion('destruir');
                                    }
                                })
                            } else {
                                swal.close();
                                swal('Genesis informa', response.data.mensaje_detalle, 'warning');
                            }
                        });
                    }
                });

            }

            $scope.Rechazar = function (a) {
                $http({
                    method: 'POST',
                    url: "php/ips/func3047.php",
                    data: { function: 'listar_observaciones_rechazo' }
                }).then(function (response) {
                    $scope.proceso = response.data;
                    $scope.array = {};
                    for (var i = 0; i < $scope.proceso.length; i++) {
                        var key = $scope.proceso[i].codigo;
                        var val = $scope.proceso[i].nombre;
                        $scope.array[key] = val;
                    }
                    swal({
                        title: 'Seleccionar',
                        input: 'select',
                        inputOptions: $scope.array,
                        inputPlaceholder: 'Seleccionar',
                        showCancelButton: true,
                    }).then((result) => {
                        if (result) {
                            $scope.observacion = result;
                            $http({
                                method: 'POST',
                                url: "php/ips/func3047.php",
                                data: { function: 'Rechazar',tipo:a.tipo_documento,documento:a.documento, observacion:$scope.observacion, responsable:$scope.cedula}
                            }).then(function (response) {
                                if (response.data.codigo == '0') {
                                    swal('Notificación', response.data.mensaje, 'success').then((result) => {
                                        if (result) {
                                            $scope.close();
                                            $scope.ListarInformacion('destruir');
                                        }
                                    })
                                } else {
                                    swal('Notificación', response.data.mensaje, 'error');
                                }
                            });
                        }
                    })
                });
            }


            //$scope.datos = JSON.stringify(data);


        }]);