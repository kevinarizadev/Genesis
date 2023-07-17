'use strict';
angular.module('GenesisApp')
.controller('LlamadaTelecobroController', ['$scope', '$rootScope', '$http', 'consultaHTTP', 'afiliacionHttp', 'ngDialog',
    function ($scope, $rootScope, $http, consultaHTTP, afiliacionHttp, ngDialog) {
        $(document).ready(function(){$('#modaltabla').modal(); $('#modalllamada').modal(); });

        $scope.OcultarFecha = false;
        $scope.BotonRegistroLlamada = true;
        $scope.FormularioDeLlamada = false;
        $scope.SegundaParte = false;
        $scope.CampoRazonSocial = true;
        $scope.reloj = false;
        $scope.MostrarSede = false;
        $scope.OcultarInforme = false;
        $scope.botones = true;
        $scope.TablaDetalleAfil = false;
        $scope.VisualEstado = true;



        $scope.ListarMotivos = function () {
            $http({
                method: 'POST',
                url: "php/cartera/funcartera.php",
                data: {
                    function: 'ListarMotivos'
                }
            }).then(function (respose) {
                $scope.lmotivos = respose.data;
            })
        }

        $scope.datos = {
            fecha: null,
            fechatemporal: null,
            hora: null,
            duracion: '00:00:00',
            documento: null,
            razonsocial: null,
            tipodocumento: 'S',
            departamento: null,
            municipio: null,
            celular: null,
            telefono:null,
            direccion: null,
            correo: null,
            motivo: '0',
            submotivo: '0',
            fechamotivo: '',
            personacontacto: null,
            observacion: null
        }

        $scope.ValidoFechaMinima = function() {
            var hoy = new Date();
            var dd = hoy.getDate();
            var mm = hoy.getMonth() + 1; 
            var yyyy = hoy.getFullYear();
            if (dd < 10) { 
                dd = '0' + dd 
            }
            if (mm < 10) { 
                mm = '0' + mm 
            }
            $scope.maxDate = yyyy + '-' + mm + '-' + dd;
        }

        $scope.Consultar = function (datainfo) {
            console.log(datainfo);
            $http({
                method: 'POST',
                url: "php/cartera/funcartera.php",
                data: {
                    function: 'GestionTelecobro', documento: datainfo.NIT
                }
            }).then(function (res) {
                if (res.data.codigo == '0') {
                    console.log(res.data);
                    $scope.botones = false;
                    $scope.VisualEstado = false;
                    $scope.VisualizacionListadoPendiente = false;
                    $scope.VisualizacionListadoRecordatorio = false;
                    $scope.datos.tipodocumento = datainfo.TIPO_DOCUMENTO;
                    $scope.datos.documento = datainfo.NIT;
                    $scope.datos.departamento = res.data.departamento;
                    $scope.datos.municipio = res.data.municipio;
                    $scope.datos.celular = res.data.celular;
                    $scope.datos.telefono = res.data.telefono;
                    $scope.datos.direccion = res.data.direccion_aportante;
                    $scope.datos.correo = res.data.correo_aportante;
                    $scope.datos.razonsocial = res.data.razon_social;
                    $("#deptos option[value='?']").remove();
                    $scope.reloj = true;
                    $scope.BotonRegistroLlamada = false;
                    $scope.FormularioDeLlamada = true;
                    $scope.CapturaFechaActual();
                    $scope.CapturaHoraActual();
                    $scope.Cronometro();
                    $scope.ListarMotivos();
                    $scope.ValidoFechaMinima();
                    $scope.BuscoMunicipio();
                    $scope.DetalleAfiliadoLLamada(datainfo.NIT);
                } else {
                    swal('Notificacion', res.data.mensaje, 'info');
                }
                
            })
        }

        $scope.CapturaFechaActual = function () {
            var date = new Date();
            var day = date.getDate()
            var month = date.getMonth() + 1
            var year = date.getFullYear()
            if (month < 10) {
                if (day < 10) {
                    $scope.datos.fecha = 0 + day + '/' + 0 + month + '/' + year;
                } else {
                    $scope.datos.fecha = day + '/' + 0 + month + '/' + year;
                }
            } else {
                $scope.datos.fecha = day + '/' + month + '/' + year;
            }
        }

        $scope.CapturaHoraActual = function () {
            function formatTime(n) {
                return (n < 10) ? "0" + n : n;
            };
            var today = new Date(),
            month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            h = formatTime(today.getHours()),
            min = formatTime(today.getMinutes()),
            seg = formatTime(today.getSeconds()),
            hour = h,
            w = "A.M";
            if (hour >= 12) { hour = formatTime(hour - 12); w = "P.M"; };
            if (hour == 0) { hour = 12; };
            $scope.datos.fechatemporal = today.getDate() + ' / ' + month[today.getMonth()] + ' / ' + today.getFullYear();
            $scope.datos.hora = hour + ":" + min + ":" + seg + ' ' + w
        }

        $scope.Cronometro = function () {
            $(document).ready(function () {
                if (document.querySelector("#duracion") != undefined && document.querySelector("#duracion") != null) {
                    $scope.cronometro = document.querySelector("#duracion");
                    document.querySelector("[for=duracion]").classList.add("active");
                    $scope.emp = new Date();
                    $scope.elcrono = setInterval(tiempo, 10);
                    function tiempo() {
                        var actual = new Date();
                        var cro = actual - $scope.emp;
                        var cr = new Date();
                        cr.setTime(cro);
                        var cs = cr.getMilliseconds();
                        cs = cs / 10;
                        cs = Math.round(cs);
                        var sg = cr.getSeconds();
                        var mn = cr.getMinutes();
                        var ho = cr.getHours() - 1;
                        if (cs < 10) { cs = "0" + cs; }
                        if (sg < 10) { sg = "0" + sg; }
                        if (mn < 10) { mn = "0" + mn; }
                        if (ho < 10) { ho = "0" + ho; }
                        $scope.cronometro.innerHTML = '00' + ":" + mn + ":" + sg;
                    }
                }
            });
        }

        $scope.BuscarSubMotivos = function (codigo) {
            $scope.datos.submotivo = '0';
            $http({
                method: 'POST',
                url: "php/cartera/funcartera.php",
                data: {
                    function: 'ListarSubMotivos',
                    codigo: codigo
                }
            }).then(function (respose) {
                $scope.lsubmotivos = respose.data;
            })
        }


        $scope.FinalizarLlamadas = function () {
            $scope.datos.duracion = $scope.cronometro.innerText;
            clearInterval($scope.elcrono);
            if ($scope.datos.fechamotivo != '') {
                var formattedDate = moment($scope.datos.fechamotivo).format('DD/MM/YYYY');
            } else {
                var formattedDate = null;
            }
            $http({
                method: 'POST',
                url: "php/cartera/funcartera.php",
                data: {
                    function: 'InsertarGestionTeleCobro',
                    v_tipo_documento: $scope.datos.tipodocumento,
                    v_documento: $scope.datos.documento,
                    v_fecha_registro: $scope.datos.fecha,
                    v_hora_registro: $scope.datos.hora,
                    v_duracion_llamada: $scope.datos.duracion,
                    v_cod_ciudad: $scope.datos.municipio,
                    v_telefono: $scope.datos.telefono,
                    v_celular: $scope.datos.celular,
                    v_direccion: $scope.datos.direccion,
                    v_correo: $scope.datos.correo,
                    v_motivo: $scope.datos.motivo,
                    v_submotivo: $scope.datos.submotivo,
                    v_observacion: $scope.datos.observacion,
                    v_fec_recordatorio: formattedDate,
                    v_responsable: sessionStorage.getItem('cedula')
                }
            }).then(function (res) {
                if (res.data.codigo == '0') {
                    swal('Notificacion', res.data.mensaje, 'success');
                    clearInterval($scope.elcrono);
                    $scope.Limpiar();
                    $scope.CantidadxPersonaTelecobro();
                    $scope.CantidadPorPersona();
                    $scope.PendieteTelecobro();
                } else {
                    swal('Notificacion', res.data.mensaje, 'error');
                }
            })
        }

        $scope.Limpiar = function () {
            $scope.OcultarFecha = false;
            $scope.VisualEstado = true;
            $scope.BotonRegistroLlamada = true;
            $scope.FormularioDeLlamada = false;
            $scope.SegundaParte = false;
            $scope.CampoRazonSocial = true;
            $scope.reloj = false;
            $scope.MostrarSede = false;
            $scope.OcultarInforme = false;
            $scope.VisualizacionListadoPendiente = true;
            $scope.VisualizacionListadoRecordatorio = false;            
            $scope.botones = true;
            $scope.TablaDetalleAfil = false;
            $scope.ActivarRecordatorio = false;
            $scope.datos = {
                fecha: null,
                fechatemporal: null,
                hora: null,
                duracion: '00:00:00',
                documento: null,
                razonsocial: null,
                tipodocumento: 'S',
                departamento: null,
                municipio: null,
                celular: null,
                telefono:null,
                direccion: null,
                correo: null,
                motivo: '0',
                submotivo: '0',
                fechamotivo: '',
                personacontacto: null,
                observacion: null
            }
        }

        $scope.ListarNomenclatura = function () {
            afiliacionHttp.obtenerViaPrincipal().then(function (response) {
                $scope.viaprincipal = response;
            })
            afiliacionHttp.obtenerLetra().then(function (response) {
                $scope.letras = response;
            })
            afiliacionHttp.obtenerNumero().then(function (response) {
                $scope.Numeros = response;
            })
            afiliacionHttp.obtenerCuadrante().then(function (response) {
                $scope.Cuadrantes = response;
            })
            afiliacionHttp.obtenerZona().then(function (response) { 
                $scope.Zonas = response.Zona;
            })

        }

        $scope.AbrirModalDireccion = function () {
            $scope.Act_Zona = { Codigo: '' };
            $scope.ViaPrincipal = { Codigo: '' };
            $scope.Letra = { Codigo: '' };
            $scope.Cuadrante = { Codigo: '' };
            $scope.CuadranteVG = { Codigo: '' };
            $scope.SelectLetraVG = { Codigo: '' };
            $scope.Bis = false;
            $scope.ListarNomenclatura();
            $scope.dialogDiagreg = ngDialog.open({
                template: 'views/consultaAfiliados/nucleofamiliar/modal/modalDireccion.html',
                className: 'ngdialog-theme-plain',
                controller: 'LlamadaTelecobroController',
                closeByDocument: false,
                closeByEscape: false,
                scope: $scope
            });
            $scope.dialogDiagreg.closePromise.then(function (data) {
                if (data.value != "$closeButton") {
                    $scope.datos.direccion = data.value;
                }
            });
        }

        $scope.GuardarDireccion = function (ViaPrincipal, NumViaPrincipal, Letra, Numero, Bis, Cuadrante, NumeroVG, SelectLetraVG, NumeroPlaca, CuadranteVG, Complemento) {
            $scope.closeThisDialog($('#direcciond').val());
        }


        $scope.ListarDepartamento = function () {
            $http({
                method: 'POST',
                url: "php/cartera/funcartera.php",
                data: { function: 'ListarDepartamento' }
            }).then(function (response) {
                $scope.depto = response.data;
            });
        }


        $scope.BuscoMunicipio = function (cod) {
            $http({
                method: 'POST',
                url: "php/consultaafiliados/funcnovedadacb.php",
                data: { function: 'cargaMunicipios', depa: $scope.datos.departamento }
            }).then(function (response) {
                $scope.muni = response.data;
                setTimeout(function() {
                    $("#municipio option[value='?']").remove();
                }, 200);
            });

        }

        $scope.CantidadPorPersona = function () {
            $http({
                method: 'POST',
                url: "php/cartera/funcartera.php",
                data: { function: 'CantidadxPersona', documento: sessionStorage.getItem('cedula')} 
            }).then(function (respose) {
                $scope.infodata = respose.data;
                console.log($scope.infodata);
            })
        }

        $scope.DetalleAfiliadoLLamada = function (documento) {
            swal({ title: 'Cargando Informacion' });
            swal.showLoading();
            $http({
                method: 'POST',
                url: "php/cartera/funcartera.php",
                data: { function: 'DetalleAfiliadoLLamada', documento: documento }
            }).then(function (response) {
                if (response.data.length > 0) {
                    if ($scope.cargue == 'C') {
                        $scope.infoafiliado.destroy();
                    }
                    $scope.myObj = response.data;
                    $scope.cargue = 'C';
                    $scope.TablaDetalleAfil = true;
                    setTimeout(function () {
                        $scope.infoafiliado = $('#infoafiliado').DataTable({
                            dom: 'lBsfrtip',
                            select: true,
                            buttons: [ 'excel'],
                            language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
                            destroy: true,
                            responsive: false,
                            lengthMenu: [
                            [5, 20, -1],
                            [10, 50, 'Todas']
                            ],
                            order: [
                            [0, "asc"]
                            ]
                        });
                        swal.close();
                    }, 500);
                } else {
                    swal('Genesis Informa', 'No hay Informacion Para Listar', 'warning');

                }
            });
        }

        $scope.ListarGestionCartera = function () {
            $http({
                method: 'POST',
                url: "php/cartera/funcartera.php",
                data: { function: 'ListarGestionCartera', documento:sessionStorage.getItem('cedula') }  
            }).then(function (response) {
                $scope.duplicar = response.data;
            }); 
        }

        $scope.ObtenerGestionLlamada = function (tipo_gestion, titulo) {
            $http({
                method: 'POST',
                url: "php/cartera/funcartera.php",
                data: { function: 'ObtenerGestionLlamada',tipo_gestion:tipo_gestion, documento:sessionStorage.getItem('cedula')} 
            }).then(function (response) {
                if (response.data.length != 0) {
                    $('#modalllamada').modal('open');
                    $scope.response=response.data[0];
                    $scope.titulo = titulo;                    
                } else {
                    swa('Notificacion','Error Consultado Gestion','warning');
                }

            });             
        }

        $scope.ListadoXLlamar = function () {
            swal({ title: 'Cargando Informacion' });
            swal.showLoading();
            $http({
                method: 'POST',
                url: "php/cartera/funcartera.php",
                data: { function: 'ListadoXLlamar2', documento:sessionStorage.getItem('cedula') }
            }).then(function (response) {
                if (response.data.length > 0) {
                    if ($scope.status == 'L') {
                        $scope.callpend.destroy();
                    }
                    $scope.callpendiente = response.data;
                    $scope.status = 'L';
                    $scope.VisualizacionListadoPendiente = true;
                    $scope.VisualizacionListadoRecordatorio = false;

                    setTimeout(function () {
                        $scope.callpend = $('#callpend').DataTable({
                            dom: 'lBsfrtip',
                            select: true,
                            buttons: ['csv', 'excel'],
                            language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
                            destroy: true,
                            responsive: true,
                            lengthMenu: [
                            [5, 20, -1],
                            [10, 50, 'Todas']
                            ],
                            order: [
                            [3, "desc"]
                            ]
                        });
                        swal.close();
                    }, 500);
                } else {
                    swal('Genesis Informa', 'No hay Informacion Para Listar', 'warning');

                }
            });
        }

        $scope.DetalleAfiliadoLLamada = function (documento) {
            swal({ title: 'Cargando Informacion' });
            swal.showLoading();
            $http({
                method: 'POST',
                url: "php/cartera/funcartera.php",
                data: { function: 'DetalleAfiliadoLLamada', documento: documento }
            }).then(function (response) {
                if (response.data.length > 0) {
                    if ($scope.cargue == 'C') {
                        $scope.infoafiliado.destroy();
                    }
                    $scope.myObj = response.data;
                    $scope.cargue = 'C';
                    $scope.TablaDetalleAfil = true;
                    setTimeout(function () {
                        $scope.infoafiliado = $('#infoafiliado').DataTable({
                            dom: 'lBsfrtip',
                            select: true,
                            buttons: [ 'excel'],
                            language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
                            destroy: true,
                            responsive: false,
                            lengthMenu: [
                            [5, 20, -1],
                            [10, 50, 'Todas']
                            ],
                            order: [
                            [0, "asc"]
                            ]
                        });
                        swal.close();
                    }, 500);
                } else {
                    swal('Genesis Informa', 'No hay Informacion Para Listar', 'warning');

                }
            });
        }

        $scope.VerDetalle = function (documento) {
            swal({ title: 'Cargando Informacion' });
            swal.showLoading();
            $http({
                method: 'POST',
                url: "php/cartera/funcartera.php",
                data: { function: 'DetalleAfiliadoLLamada', documento: documento.NIT }
            }).then(function (response) {
                if (response.data.length > 0) {
                    if ($scope.detalle == 'C') {
                        $scope.infoafiliado.destroy();
                    }
                    $scope.listado = response.data;
                    $scope.detalle = 'C';
                    $scope.titulo = documento.aportante;
                    $('#modaltabla').modal('open');
                    setTimeout(function () {
                        $scope.infoafiliado = $('#infoafiliado').DataTable({
                            dom: 'lBsfrtip',
                            select: true,
                            buttons: [ 'excel'],
                            language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
                            destroy: true,
                            responsive: false,
                            lengthMenu: [
                            [5, 20, -1],
                            [10, 50, 'Todas']
                            ],
                            order: [
                            [0, "asc"]
                            ]
                        });
                        swal.close();
                    }, 500);
                } else {
                    swal('Genesis Informa', 'No hay Informacion Para Listar', 'warning');

                }
            });
        }

        $scope.CambiarRecordatorio = function () {
            if ($scope.ActivarRecordatorio == true) {
                $scope.ActivarRecordatorio = true;
                $scope.OcultarFecha = true;
            }else {
                $scope.ActivarRecordatorio = false;
                $scope.OcultarFecha = false;
            }
        }


        $scope.PendieteTelecobro = function () {
            $http({
                method: 'POST',
                url: "php/cartera/funcartera.php",
                data: { function: 'PendieteTelecobro', documento:sessionStorage.getItem('cedula') } 
            }).then(function (response) {
                $scope.pendiente = response.data.Pendiente;
                console.log($scope.pendiente);
            }); 
        }

        $scope.TipoGestion = function (tipo, title) {
            if (tipo == 'R') {
                $scope.title = title;
                $scope.LlamadaRecordatorio();
            }else{
                $scope.title = title;
                $scope.ListadoXLlamar();
            }
        }

        $scope.CantidadxPersonaTelecobro = function () {
            $http({
                method: 'POST',
                url: "php/cartera/funcartera.php",
                data: { function: 'CantidadxPersonaTelecobro', documento: sessionStorage.getItem('cedula')} 
            }).then(function (respose) {
                $scope.idata = respose.data
            })
        }




        $scope.LlamadaRecordatorio = function () {
            swal({ title: 'Cargando Informacion' });
            swal.showLoading();
            $http({
                method: 'POST',
                url: "php/cartera/funcartera.php",
                data: { function: 'LlamadaRecordatorio', documento:sessionStorage.getItem('cedula') } 
            }).then(function (response) {
                if (response.data.length > 0) {
                    if ($scope.record == 'L') {
                        $scope.callpendrecord.destroy();
                    }
                    $scope.callrecordatorio = response.data;
                    $scope.record = 'L';
                    $scope.VisualizacionListadoPendiente = false;
                    $scope.VisualizacionListadoRecordatorio = true;
                    setTimeout(function () {
                        $scope.callpendrecord = $('#callpendrecord').DataTable({
                            dom: 'lBsfrtip',
                            select: true,
                            buttons: ['csv', 'excel'],
                            language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
                            destroy: true,
                            responsive: true,
                            lengthMenu: [
                            [5, 20, -1],
                            [10, 50, 'Todas']
                            ],
                            order: [
                            [3, "desc"]
                            ]
                        });
                        swal.close();
                    }, 500);
                } else {
                    swal('Genesis Informa', 'No hay Informacion Para Listar', 'warning');

                }
            });
        }
        $scope.CantidadxPersonaTelecobro();   
        $scope.ListarDepartamento();
        $scope.PendieteTelecobro();

    }]);
