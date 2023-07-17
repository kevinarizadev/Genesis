'use strict';
angular.module('GenesisApp')
    .controller('mesadecontrolcontroller', ['$scope', '$http','$timeout', '$filter',
        function ($scope, $http, $timeout, $filter) {
            $scope.hoja = { fase3: false };
            $(document).ready(function () {
                if (document.querySelector("#pantalla").offsetWidth < 1200) {
                    document.querySelector("#pantalla").style.zoom = 0.8;
                }
                $(".fechaperiodo").kendoDatePicker({
                    culture: "es-MX",
                    start: "year",
                    depth: "year",
                    format: "MM/yyyy",
                    dateInput: true
                });
                $("#detalle_fechaentrega").kendoDatePicker({
                    culture: "es-MX",
                    format: "dd/MM/yyyy",
                    dateInput: true
                });
                $(".fechaperiodoreporte").kendoDatePicker({
                    culture: "es-MX",
                    format: "yyyy-MM-dd",
                    dateInput: true
                });
                $("#detalle_fecharad").kendoDatePicker({
                    culture: "es-MX",
                    format: "dd/MM/yyyy",
                    dateInput: true
                });
                $scope.hj1_Period = 'S';
                $scope.hj1_Oblig = 'S';

                document.getElementById("municipio").disabled = true;
                document.getElementById("btnBuscar").disabled = true;
                $scope.hoja2 = true;
                $scope.hoja1_nombre = "";
                $scope.hoja1_periodo = "";
                $scope.Dis_Observacion = false;
                $scope.todosdptos = false;
                $('#tabla_1 tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        $('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });
                //////////////////////////////////
                $timeout(function () {
                    var slideCount = $('#slider>ul>li').length;
                    $scope.slideWidth = $('#anchura')[0].offsetWidth + 2;
                    var sliderUlWidth = slideCount * $scope.slideWidth;
                    $('#slider').css({ width: $scope.slideWidth });
                    $('#slider>ul').css({ width: sliderUlWidth, marginLeft: - $scope.slideWidth });
                    $('#slider>ul>li').css({ width: $scope.slideWidth });
                    $('#slider>ul>li:last-child').prependTo('#slider>ul');
                    //
                    $('#HojaNew').css({ width: $('#anchura')[0].offsetWidth + 2 });

                }, 200);

                $scope.departamentos();
                $http({
                    method: 'POST',
                    url: "php/mesacontrol/mesacontrol.php",
                    data: { function: 'obtenercodigo' }
                }).then(function (response) {
                    $scope.rol = response.data;
                    if ($scope.rol == 1) {
                        $scope.mostrarmunipios = '';
                        $scope.estado = 'A';
                    }
                    if ($scope.rol.substr(0, 2) == 80 || $scope.rol.substr(0, 1) == 8) {
                        $scope.mostrarmunipios = '8';
                        $scope.estado = 'R';
                    }
                    if ($scope.rol.substr(0, 2) != 80 && $scope.rol.substr(0, 1) != 8 && $scope.rol != 1) {
                        $scope.mostrarmunipios = $scope.rol.substr(0, 2);
                    }
                    $http({
                        method: 'POST',
                        url: "php/mesacontrol/mesacontrol.php",
                        data: {
                            function: 'obtenerdptos',
                            cod: $scope.mostrarmunipios
                        }
                    }).then(function (response) {
                        $scope.nombdptos = response.data;
                        // $scope.filterCountry = $scope.nombdptos;
                        $('#list-group-dept').css({ width: $('#country')[0].offsetWidth });
                        if ($scope.nombdptos.length == 1) {
                            $scope.country = $scope.nombdptos[0].NOMBRE;
                            $scope.fillTextbox($scope.country);
                        }
                        document.getElementById("btnReportar").disabled = true;
                        document.getElementById("country").focus();
                    });
                });


                //////////////
                $http({
                    method: 'POST',
                    url: "php/mesacontrol/mesacontrol.php",
                    data: {
                        function: 'obtenerreporte',
                        cedula: sessionStorage.getItem('cedula')
                    }
                }).then(function (response) {
                    $scope.Permiso_Reporte = response.data.codigo;
                });
                // $http({
                //     method: 'POST',
                //     url: "php/mesacontrol/mesacontrol_generar.php",
                //     data: {
                //         function: 'Validar',
                //         cedula: sessionStorage.getItem('cedula')
                //     }
                // }).then(function (response) {
                //     console.log(response.data);
                // });
            });//////////////////////////////READY//////////////////////////////
            /////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////
            $(document).keydown(function (objEvent) {
                if (objEvent.keyCode == 9) {  //tab pressed
                    objEvent.preventDefault(); // stops its action
                }
            })

            $scope.chg_filtrar = function () {
                $scope.filter($scope.filtro_hoja2);
                $scope.filtro_hoja2_2 = "";
                $scope.filtro_hoja2_3 = "";
            }
            $scope.chg_filtrar2 = function () {
                $scope.filter($scope.filtro_hoja2_2);
                $scope.filtro_hoja2 = "";
                $scope.filtro_hoja2_3 = "";
            }
            $scope.chg_filtrar3 = function () {
                $scope.filter($scope.filtro_hoja2_3);
                $scope.filtro_hoja2 = "";
                $scope.filtro_hoja2_2 = "";
            }
            $scope.departamentos = function () {
                $http({
                    method: 'POST',
                    url: "php/mesacontrol/mesacontrol.php",
                    data: {
                        function: 'obtenersdocs'
                    }
                }).then(function (response) {
                    $scope.dptos = response.data;
                });
            }
            //////////////////////////////////////////////
            $scope.blurdpto = function () {
                $timeout(function () {
                    if ($scope.country != $scope.varstring) {
                        $scope.country = null;
                        $scope.municipio = null;
                        document.getElementById("municipio").disabled = true;
                        document.getElementById("btnBuscar").disabled = true;
                        document.getElementById("btnReportar").disabled = true;
                        $scope.hoja2 = true;
                        // $scope.filterCountry = $scope.nombdptos;
                        $scope.filterMuni = null;
                    }
                    $scope.filterCountry = null;
                }, 300);//END TIMEOUT
            }
            $scope.complete = function (string) {
                $('#list-group-dept').css({ width: $('#country')[0].offsetWidth });
                var output = [];
                if ($scope.country != '' && $scope.country != undefined) {
                    angular.forEach($scope.nombdptos, function (country) {
                        if (country.NOMBRE.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                            output.push({ 'NOMBRE': country.NOMBRE });
                        }
                    });
                    $scope.filterCountry = output;
                }
            }
            $scope.fillTextbox = function (string) {
                $scope.varstring = string;
                $scope.country = string;
                $scope.filterCountry = null;
                $scope.municipio = null;
                $timeout(function () {
                    $http({
                        method: 'POST',
                        url: "php/mesacontrol/mesacontrol.php",
                        data: {
                            function: 'obtenermunis',
                            dpto: string
                        }
                    }).then(function (response) {
                        document.getElementById("municipio").disabled = false;
                        document.getElementById("municipio").focus();
                        document.getElementById("btnReportar").disabled = false;
                        $scope.nombmunis = response.data;
                        $scope.filterMuni = $scope.nombmunis;
                        $('#list-group-muni').css({ width: $('#municipio')[0].offsetWidth });
                    });
                }, 300);//END TIMEOUT
            }
            /////////////////////////////////////////////////
            $scope.blurmuni = function () {
                $timeout(function () {
                    if ($scope.municipio != $scope.varstring_2) {
                        $scope.municipio = null;
                        document.getElementById("btnBuscar").disabled = true;
                        document.getElementById("btnReportar").disabled = false;
                        if (document.getElementById("municipio").disabled == false) {
                            $scope.filterMuni = $scope.nombmunis;
                        }
                    }
                    $scope.filterMuni = null;
                }, 300);//END TIMEOUT
            }
            $scope.complete_muni = function (string) {
                $('#list-group-muni').css({ width: $('#municipio')[0].offsetWidth });
                var output = [];
                if ($scope.municipio != '' && $scope.municipio != undefined) {
                    angular.forEach($scope.nombmunis, function (municipio) {
                        if (municipio.NOMBRE.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                            output.push(({ "NOMBRE": municipio.NOMBRE, "COD": municipio.COD }));
                        }
                    });
                    $scope.filterMuni = output;
                }
            }
            $scope.fillTextbox_2 = function (string, cod) {
                document.getElementById("btnBuscar").disabled = false;
                document.getElementById("btnReportar").disabled = false;
                document.getElementById("btnBuscar").focus();
                $scope.hoja2 = false;
                $scope.varstring_2 = string;
                $scope.municipio = string;
                $scope.cod_mun = cod;
                $scope.filterMuni = null;
            }

            /////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////
            $scope.moveLeft = function () {
                document.getElementById("btnBuscar").disabled = false;
                $scope.filtro_hoja2 = '';
                $('#slider>ul').animate({
                    left: + $scope.slideWidth
                }, 700, "easeOutBack", function () {
                    $('#slider>ul>li:last-child').prependTo('#slider>ul');
                    $('#slider>ul').css('left', '');
                    document.getElementById("titu").scrollIntoView({ block: 'start', behavior: 'smooth' });
                });
            }
            $scope.moveRight = function () {
                $('#slider>ul').animate({
                    left: - $scope.slideWidth
                }, 700, "easeInOutCubic", function () {
                    $('#slider>ul>li:first-child').appendTo('#slider>ul');
                    $('#slider>ul').css('left', '');
                    document.getElementById("tabla_1").scrollIntoView({ block: 'start', behavior: 'smooth' });
                });
            }
            $scope.moveUp_Hoja4 = function () {
                $scope.departm = '';
                $scope.periodo_grabar = '';
                document.getElementById("btngrabar").disabled = true;
                $('#HojaNew1').css({
                    top: - $('#HojaNew1_2')[0].offsetHeight
                });
                $scope.slideHeight = $('#anchura')[0].offsetHeight;
                $('#HojaNew').animate({
                    top: 0,
                    opacity: 1
                }, 700, "easeInOutCubic", function () {
                });
            }
            $scope.moveDown_Hoja4 = function () {
                $('#HojaNew').animate({
                    top: - $scope.slideHeight,
                    opacity: 0
                }, 700, "easeInQuad", function () {
                });
                document.getElementById("country").focus();
            }
            ////////////////////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////PAGINACION/////////////////////////////////////////////////
            $scope.initPaginacion = function (info) {
                $scope.listDatosTemp = info;
                $scope.currentPage = 0;
                $scope.pageSize = 10;
                $scope.valmaxpag = 10;
                $scope.pages = [];
                $scope.configPages();
            }
            $scope.filter = function (val) {
                $scope.listDatosTemp = $filter('filter')($scope.datos, val);
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
            ////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////
            $scope.Buscar = function () {
                if ($scope.municipio == '') {
                    document.getElementById("municipio").focus();
                } else {
                    document.getElementById("btnBuscar").disabled = true;

                    $scope.hoja1_nombre = $scope.hoja1_nombre == 1 ? '' : $scope.hoja1_nombre;
                    $scope.filtro_hoja2 = "";
                    $scope.filtro_hoja2_2 = "";
                    $scope.filtro_hoja2_3 = "";
                    swal({ title: 'Consultando Informacion...' });
                    swal.showLoading();
                    $http({
                        method: 'POST',
                        url: "php/mesacontrol/mesacontrol.php",
                        data: {
                            function: 'searchdocs',
                            cod_ubicacion: $scope.cod_mun,
                            cod_area: '3',
                            nombre: $scope.hoja1_nombre,
                            periodo: $scope.hoja1_periodo
                        }
                    }).then(function (response) {
                        swal.close();
                        $scope.datos = response.data;
                        if ($scope.datos.length >= 1) {
                            $scope.moveRight();
                            $scope.initPaginacion($scope.datos);
                        } else {
                            swal({
                                title: '¡Este municipio no contiene documentos!',
                                text: 'Por favor, Seleccione otro...',
                                timer: 2000,
                                showConfirmButton: false,
                                type: 'info'
                            }).catch(swal.noop);
                            document.getElementById("btnBuscar").disabled = true;
                            //document.getElementById("country").focus();
                            //$scope.country = null;
                            $scope.municipio = null;
                        }
                    });
                }
            }

            $scope.chg_grabar = function () {
                $scope.regex = '^([0]{1}[1-9]{1}\/[1-2]{1}[0-9]{3})|([1]{1}[0-2]{1}\/[1-2]{1}[0-9]{3})$';
                if ($scope.periodo_grabar != undefined && $scope.periodo_grabar != '' && $scope.departm != undefined && $scope.departm != '') {
                    document.getElementById("btngrabar").disabled = false;
                } else {
                    document.getElementById("btngrabar").disabled = true;
                }
            }
            $scope.Grabar_doc = function () {
                if ($scope.rol != 1) {
                    swal({
                        title: '!Usted no tiene permisos para realizar la siguiente acción!',
                        text: 'Esta acción no corresponde a su seccional.',
                        type: 'error'
                    }).catch(swal.noop);
                } else {
                    document.getElementById("btngrabar").disabled = true;
                    $scope.departm = $scope.departm.split('-');
                    var d = new Date();
                    $scope.fecha_grabar = d.getFullYear().toString() + '-' + d.getMonth().toString() + 1 + '-' + d.getDate().toString() + ' ' + d.getHours().toString() + ':' + d.getMinutes().toString() + ':' + d.getSeconds().toString();
                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    $http({
                        method: 'POST',
                        url: "php/mesacontrol/mesacontrol.php",
                        data: {
                            function: 'recorddocs',
                            tipodocumento: $scope.departm[0],
                            periodo: $scope.periodo_grabar,
                            tiempoentrega: $scope.departm[1],
                            fecha_carga: $scope.fecha_grabar
                        }
                    }).then(function (response) {
                        if (response.data[0].codigo == 1) {
                            swal({
                                title: response.data[0].mensaje,
                                type: 'success'
                            }).catch(swal.noop);
                            $scope.departm = '';
                            $scope.periodo_grabar = '';
                        } else {
                            swal({
                                title: response.data[0].mensaje,
                                type: 'error'
                            }).catch(swal.noop);
                        }
                    });
                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                }
            }

            $scope.Agregar_doc = function () {
                $scope.hj1_Nombre = "";
                $scope.hj1_Limite = "";
                $scope.hj1_Period = "S";
                $scope.hj1_Oblig = "S";
                $('#HojaNew1').animate({
                    top: 0
                }, 700, "easeInOutCubic", function () {
                });
                $('#btncerrar').css({ display: 'none' });
                $('#HojaNew1_2').css({ 'pointer-events': 'none' });
                document.getElementById('btngrabar').disabled = true;
                document.getElementById("hj1_Nombre").focus();
                document.getElementById('btoncrear').disabled = false;
            }
            $scope.Crear_doc = function () {
                if ($scope.rol != 1) {
                    swal({
                        title: '!Usted no tiene permisos para realizar la siguiente acción!',
                        text: 'Esta acción no corresponde a su seccional.',
                        type: 'error'
                    }).catch(swal.noop);
                } else {
                    $('#btncerrar').css({ display: 'block' });
                    $('#HojaNew1_2').css({ 'pointer-events': 'auto' });
                    document.getElementById('btoncrear').disabled = true;
                    $('#HojaNew1').animate({
                        top: - $('#HojaNew1_2')[0].offsetHeight
                    }, 700, "easeInOutCubic", function () {
                        $scope.chg_grabar();
                    });
                    $http({
                        method: 'POST',
                        url: "php/mesacontrol/mesacontrol.php",
                        data: {
                            function: 'insertsdocs',
                            nombre: $scope.hj1_Nombre,
                            dialimite: $scope.hj1_Limite,
                            periodo: $scope.hj1_Period,
                            cod_area: '3',
                            obligatorio: $scope.hj1_Oblig
                        }
                    }).then(function (response) {
                        $scope.dptos2 = response.data;
                        $scope.departamentos();
                        swal({
                            title: $scope.dptos2[0].mensaje,
                            type: 'success',
                        }).catch(swal.noop);
                    });
                }
            }
            $scope.Des_doc = function () {
                $('#btncerrar').css({ display: 'block' });
                $('#HojaNew1_2').css({ 'pointer-events': 'auto' });
                $('#HojaNew1').animate({
                    top: - $('#HojaNew1_2')[0].offsetHeight
                }, 700, "easeInOutCubic", function () {
                    $scope.chg_grabar();
                });
            }
            ////////////////////////////////////////////////////////////////////////
            ///////////////////////////////HOJA 2///////////////////////////////////
            ////////////////////////////////////////////////////////////////////////
            $scope.Abrir_modal = function () {
                (function () {
                    $('#modal').modal();
                }());
                $('#modal').modal('open');
            }
            $scope.Cerrar_modal = function () {
                $('#modal').modal('close');
                $('tr.selected').removeClass('selected');
            }
            $scope.editar = function (ID, NOMBRE_DOCUMENTO, CODIGO_REF, PERIODO_REPORTE, DIA_LIMITE, FECHA_ENTREGA, PERIODICIDAD, PRESTADOR,
                ESTADO_IMAGEN, CODIGO_DANE, CODIGO_TIPO_DOC, URL, CODIGO, ESTADO, CONTRATO, USUARIO, OBSERVACION, FECHA_RAD,
                NUMERO_AFILIADO, OBSERVACIONDOC) {
                setTimeout(function () {
                    document.querySelector('#modal').style.top = 1 + '%';
                }, 600);
                $("#AdjuntoArchivo")[0].value = "";
                $scope.ArchivoMod = '';
                $scope.Abrir_modal();
                $scope.id = ID;
                $scope.dane = CODIGO_DANE;
                $scope.codigo_tipo = CODIGO_TIPO_DOC;
                $scope.documento = NOMBRE_DOCUMENTO;
                $scope.codigo_ref = (CODIGO_REF == null) ? '' : CODIGO_REF;
                $scope.periodo = PERIODO_REPORTE;
                $scope.dialimite = DIA_LIMITE;
                $scope.entrega = FECHA_ENTREGA;
                $scope.vigencia = PERIODICIDAD;
                $scope.numero_afiliado = (NUMERO_AFILIADO == null) ? '' : NUMERO_AFILIADO;
                $scope.observaciondoc = (OBSERVACIONDOC == null) ? '' : OBSERVACIONDOC;

                $scope.estadodoc = ESTADO;


                $scope.codigo = CODIGO;
                $scope.fecha_rad = (FECHA_RAD == null) ? '' : FECHA_RAD;
                $scope.contrato = CONTRATO;
                $scope.usuario = (USUARIO == null) ? '' : USUARIO.toUpperCase();
                $scope.url = (URL == null) ? '' : URL;
                $scope.semana = (PERIODICIDAD == 'MENSUAL') ? 'No aplica' : CODIGO_REF;
                $scope.prestador = PRESTADOR != '' ? PRESTADOR : 'No aplica';
                //
                $scope.observacion = (ESTADO == 'EN ESPERA') ? 'E1' : (ESTADO == 'REVISION') ? 'R1' : OBSERVACION;
                if (ESTADO == 'APROBADO' && OBSERVACION == null) {
                    $scope.observacion = 'A3';
                }

                setTimeout(() => { $scope.$apply(); }, 500);
                if (ESTADO == 'EN ESPERA') {
                    document.querySelector('#detalle_fecharad').removeAttribute("readonly");
                    document.querySelector('#numero_afiliado').removeAttribute("readonly");
                    document.querySelector('#observaciondoc').removeAttribute("readonly");
                    document.querySelector('#detalle_fecharadcard').style.pointerEvents = '';
                } else {
                    document.querySelector('#detalle_fecharad').setAttribute("readonly", true);
                    document.querySelector('#numero_afiliado').setAttribute("readonly", true);
                    document.querySelector('#observaciondoc').setAttribute("readonly", true);
                    document.querySelector('#detalle_fecharadcard').style.pointerEvents = 'none';

                }
            }
            //

            $scope.chg_actua = function () {
                $scope.regex2 = '^((([0]{1}[1-9]{1})|([1-2]{1}[0-9]{1})|([3]{1}[0-1]{1}))\/(([0]{1}[1-9]{1})|([1]{1}[0-2]{1}))\/[1-2]{1}[0-9]{3})$';
                if ($scope.entrega != undefined && $scope.entrega != '') {
                    document.getElementById("btnGuardar").disabled = false;
                } else {
                    document.getElementById("btnGuardar").disabled = true;
                }
            }
            $scope.chg_actua2 = function () {
                $scope.regex3 = '^((([0]{1}[1-9]{1})|([1-2]{1}[0-9]{1})|([3]{1}[0-1]{1}))\/(([0]{1}[1-9]{1})|([1]{1}[0-2]{1}))\/[1-2]{1}[0-9]{3})$';
                if ($scope.fecha_rad != undefined && $scope.fecha_rad != '') {
                    document.getElementById("btnGuardar").disabled = false;
                } else {
                    document.getElementById("btnGuardar").disabled = true;
                }
            }
            $scope.Actua_periodo = function () {
                $scope.country = $scope.country != 'LA GUAJIRA' ? $scope.country : 'GUAJIRA';
                var aFecha1 = $scope.entrega.split('/');
                var entrega = aFecha1[2] + '-' + aFecha1[1] + '-' + aFecha1[0];
                var fin = new Date();
                $scope.existearchivo = false;
                if ($scope.fecha_rad == undefined || $scope.fecha_rad == '') {
                    swal({
                        title: '!Digite la fecha de radicación!',
                        type: 'info',
                        timer: '1000',
                        showConfirmButton: false
                    }).catch(swal.noop);
                } else {
                    if ($scope.numero_afiliado == undefined || $scope.fecha_rad == '') {
                        swal({
                            title: '!Digite la cantidad de usuarios!',
                            type: 'info',
                            timer: '1000',
                            showConfirmButton: false
                        }).catch(swal.noop);
                    } else {
                        if ($scope.ArchivoMod == undefined || $scope.ArchivoMod == "" || $scope.ArchivoMod == " ") {
                            $scope.existearchivo = true;
                            swal({
                                title: '!Adjunte primero el archivo!',
                                type: 'warning',
                                timer: '1000',
                                showConfirmButton: false
                            }).catch(swal.noop);
                        }
                        if ($scope.LimiteArchivo == false && $scope.VacioArchivo == false && $scope.ExtArchivo == false && $scope.existearchivo == false) {
                            var cod = $scope.codigo != 0 ? $scope.codigo : '';
                            swal({
                                title: "¿Está seguro que desea actualizar el documento?",
                                text: "Es posible que ya exista uno.",
                                type: "info",
                                showCancelButton: true,
                            }).catch(swal.noop)
                                .then((willDelete) => {
                                    if (willDelete) {
                                        $http({
                                            method: 'POST',
                                            url: "php/mesacontrol/mesacontrol.php",
                                            data: {
                                                function: 'subir',
                                                nomadj: $scope.id.trim() + '' + cod.trim(),
                                                BaseArchivo: $scope.BaseArchivo,
                                                ext: $scope.extensionarchivo,
                                                path: 'MCASEGURAMIENTO/' + $scope.country + '/'
                                            }
                                        }).then(function (response1) {
                                            $scope.respuesta = response1.data;
                                            $scope.respuesta = $scope.respuesta.trim();
                                            $scope.dane = $scope.dane.trim();
                                            $scope.periodo = $scope.periodo.trim();
                                            if ($scope.respuesta.substr(0, 3) == '<br') {
                                                swal({
                                                    title: '¡Error al subir el archivo!',
                                                    text: 'Nota: Si el error persiste, por favor actualizar la página (CONTROL + F5).',
                                                    type: 'warning'
                                                }).catch(swal.noop);
                                            } else {
                                                var ruta = 'XXX';
                                                $http({
                                                    method: 'POST',
                                                    url: "php/mesacontrol/mesacontrol.php",
                                                    data: {
                                                        function: 'updatedoc',
                                                        ubicacion: $scope.dane,
                                                        tipodocumento: $scope.codigo_tipo,
                                                        periodo: $scope.periodo,
                                                        ruta: $scope.respuesta,
                                                        // ruta: ruta,
                                                        codigo: $scope.codigo,
                                                        estado: ($scope.rol == 1) ? 'A' : 'R',
                                                        observacion: ($scope.rol == 1) ? 'A3' : 'R1',
                                                        fecha_rad: $scope.fecha_rad,
                                                        num_afi: $scope.numero_afiliado,
                                                        obs_doc: $scope.observaciondoc
                                                    }
                                                }).then(function (response) {
                                                    $scope.adjtos2 = response.data;
                                                    swal({
                                                        title: $scope.adjtos2[0].mensaje,
                                                        type: 'success',
                                                        timer: '2000',
                                                        showConfirmButton: false
                                                    }).catch(swal.noop);
                                                    $scope.Cerrar_modal();
                                                    $http({
                                                        method: 'POST',
                                                        url: "php/mesacontrol/mesacontrol.php",
                                                        data: {
                                                            function: 'searchdocs',
                                                            cod_ubicacion: $scope.cod_mun,
                                                            cod_area: '3',
                                                            nombre: $scope.hoja1_nombre,
                                                            periodo: $scope.hoja1_periodo
                                                        }
                                                    }).then(function (response) {
                                                        $scope.datos = response.data;
                                                        $scope.initPaginacion($scope.datos);
                                                    });
                                                });
                                            }
                                        });
                                    } else {
                                    }
                                });
                        }
                    }
                }
            }

            $scope.Actua_estado = function (estado) {
                var ArrayRechazado = {
                    'C1': 'Documento no corresponde al asunto',
                    'C2': 'Documento incompleto',
                    'C3': 'Documento ilegible',
                    'C4': 'Documento no radicado'
                };
                var ArrayAprobado = {
                    'A1': 'Documento radicado fuera del tiempo establecido',
                    'A2': 'La fecha del documento no corresponde al mes del proceso',
                    'A3': 'Documento correcto'
                };
                var xArray = (estado == 'A') ? ArrayAprobado : ArrayRechazado;
                swal({
                    title: 'Motivo de ' + ((estado == 'A') ? 'Aprobación' : 'Anulación'),
                    input: 'select',
                    inputOptions: xArray,
                    inputPlaceholder: 'Seleccionar',
                    showCancelButton: true,
                    inputValidator: function (value) {
                        return new Promise(function (resolve, reject) {
                            if (value !== '') {
                                resolve();
                            } else {
                                swal.close();
                            }
                        })
                    }
                })
                    .then(function (result) {
                        ////////////////////////////////////////////////////////////////////////////////////////
                        if (result !== '') {
                            swal({
                                title: "¿Está seguro que desea actualizar el estado del documento?",
                                type: "info",
                                content: "input",
                                showCancelButton: true,
                            }).catch(swal.noop)
                                .then((willDelete) => {
                                    if (willDelete) {
                                        //
                                        swal({ title: 'Consultando Informacion...' });
                                        swal.showLoading();
                                        $http({
                                            method: 'POST',
                                            url: "php/mesacontrol/mesacontrol.php",
                                            data: {
                                                function: 'updatedoc',
                                                ubicacion: $scope.dane,
                                                tipodocumento: $scope.codigo_tipo,
                                                periodo: $scope.periodo,
                                                ruta: null,
                                                codigo: $scope.codigo,
                                                estado: estado,
                                                observacion: result,
                                                fecha_rad: $scope.fecha_rad,
                                                num_afi: $scope.numero_afiliado,
                                                obs_doc: $scope.observaciondoc
                                            }
                                        }).then(function (response) {
                                            $scope.adjtos2 = response.data;
                                            swal({
                                                title: $scope.adjtos2[0].mensaje,
                                                type: 'success',
                                                timer: '2000',
                                                showConfirmButton: false
                                            }).catch(swal.noop);
                                            $scope.Cerrar_modal();
                                            $http({
                                                method: 'POST',
                                                url: "php/mesacontrol/mesacontrol.php",
                                                data: {
                                                    function: 'searchdocs',
                                                    cod_ubicacion: $scope.cod_mun,
                                                    cod_area: '3',
                                                    nombre: $scope.hoja1_nombre,
                                                    periodo: $scope.hoja1_periodo
                                                }
                                            }).then(function (response) {
                                                $scope.datos = response.data;
                                                $scope.initPaginacion($scope.datos);
                                                if ($scope.filtro_hoja2 != null && $scope.filtro_hoja2 != "") {
                                                    $scope.filter($scope.filtro_hoja2);
                                                }
                                                if ($scope.filtro_hoja2_2 != null && $scope.filtro_hoja2_2 != "") {
                                                    $scope.filter($scope.filtro_hoja2_2);
                                                }
                                                if ($scope.filtro_hoja2_3 != null) {
                                                    $scope.filter($scope.filtro_hoja2_3);
                                                }
                                            });
                                        });
                                    } else {
                                    }
                                });
                            ////////////////////////////////////////////////////////////////////////////////////////
                        }
                    }).catch(swal.noop)
            }

            ////////////////////////////////////////////////
            $scope.Changearchivo = function () {
                var fileInput = document.getElementById('AdjuntoArchivo');
                if (fileInput.value == '' || fileInput.value == undefined || fileInput.value == null) {
                    swal({
                        title: '!Adjunte el archivo!',
                        type: 'warning',
                        timer: '1000',
                        showConfirmButton: false
                    }).catch(swal.noop);
                } else {
                    var name = fileInput.files[0].name;
                    var x = name.split('.').pop();
                    $scope.extensionarchivo = x;
                    $scope.LimiteArchivo = false;
                    $scope.VacioArchivo = false;
                    $scope.ExtArchivo = false;
                    $scope.getBase64(fileInput.files[0]).then(
                        data => $scope.BaseArchivo = data
                    );
                    if (fileInput.files[0].size > 10485760) {
                        $scope.LimiteArchivo = true;
                        swal('Advertencia', '¡El archivo seleccionado excede el peso máximo posible (10MB)!', 'info');
                    }
                    if (fileInput.files[0].size == 0) {
                        $scope.VacioArchivo = true;
                        swal('Advertencia', '¡El archivo seleccionado está vacío!', 'info');
                    }
                    if (x.toUpperCase() != "PDF") {
                        $scope.ExtArchivo = true;
                        swal('Advertencia', 'El archivo seleccionado no es un documento PDF!', 'info');
                    }
                    if ($scope.LimiteArchivo == true || $scope.VacioArchivo == true || $scope.ExtArchivo == true) {
                        document.getElementById('AdjuntoArchivo').value = '';
                        $("#AdjuntoArchivo")[0].value = "";
                        $scope.ArchivoMod = "";
                        $scope.BaseArchivo = null;
                    }
                }
            }
            $scope.getBase64 = function (file) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                });
            }
            $scope.Descargar_file = function (ruta) {
                $http({
                    method: 'POST',
                    url: "php/mesacontrol/mesacontrol.php",
                    data: {
                        function: 'descargaAdjunto',
                        ruta: ruta
                    }
                }).then(function (response) {
                    window.open("temp/" + response.data);
                });
            }
            //////////////////////////////////////////////////////////////////////////////////////
            $scope.Abrir_modal_2 = function () {
                (function () {
                    $('#modal_reporte').modal();
                }());
                $('#modal_reporte').modal('open');

            }
            $scope.Cerrar_modal_2 = function () {
                $('#modal_reporte').modal('close');
            }
            ////////////////////////////////REPORTES//////////////////////////////////////
            $scope.chg_fecha_rep = function () {
                $scope.regex_fecha_i = "^([2]{1}[0-9]{3})-(([0]{1}[1-9]{1})|([1]{1}[0-2]{1}))-(([0]{1}[1-9]{1})|([1-2]{1}[0-9]{1})|([3]{1}[0-1]{1}))$";
                if ($scope.rep_periodo_ini == undefined || $scope.rep_periodo_fin == undefined || $scope.rep_imagen == '' || $scope.rep_imagen == undefined) {
                    document.getElementById("btn_reporte_des").disabled = true;
                } else {
                    var aFecha1 = $scope.rep_periodo_ini.split('-');
                    var aFecha2 = $scope.rep_periodo_fin.split('-');
                    var fFecha1 = Date.UTC(aFecha1[0], aFecha1[1] - 1, aFecha1[2]);
                    var fFecha2 = Date.UTC(aFecha2[0], aFecha2[1] - 1, aFecha2[2]);
                    var dif = fFecha2 - fFecha1;
                    if (dif < 0) {
                        swal({
                            title: '¡La fecha final debe ser mayor o igual a la fecha inicial!',
                            timer: 2000,
                            showConfirmButton: false,
                            type: 'warning'
                        }).catch(swal.noop);
                        document.getElementById("btn_reporte_des").disabled = true;
                    } else {
                        document.getElementById("btn_reporte_des").disabled = false;
                    }
                }
            }
            $scope.llenarexcel_reporte = function () {
                document.getElementById("btn_reporte_des").disabled = true;
                $scope.arrayexcel_reporte = [];
                var cod_mun = $scope.cod_mun;
                if ($scope.municipio == null || $scope.municipio == undefined || $scope.municipio == '') {
                    if ($scope.country == 'ATLANTICO') {
                        cod_mun = '08';
                    }
                    if ($scope.country == 'BOLIVAR') {
                        cod_mun = '13';
                    }
                    if ($scope.country == 'CESAR') {
                        cod_mun = '20';
                    }
                    if ($scope.country == 'CORDOBA') {
                        cod_mun = '23';
                    }
                    if ($scope.country == 'LA GUAJIRA') {
                        cod_mun = '44';
                    }
                    if ($scope.country == 'MAGDALENA') {
                        cod_mun = '47';
                    }
                    if ($scope.country == 'META') {
                        cod_mun = '50';
                    }
                    if ($scope.country == 'SUCRE') {
                        cod_mun = '70';
                    }
                }
                if (cod_mun.toString().length == 4) {
                    cod_mun = '0' + cod_mun;
                }
                /////////////////////////
                var dpto = ($scope.todosdptos == false) ? cod_mun : '';
                var nombre = $scope.hoja1_nombre != 1 ? $scope.hoja1_nombre : '';
                ///////
                swal({ title: 'Consultando Informacion...' });
                swal.showLoading();

                // $window.open('php/mesacontrol/informe_mesacontrol.php?&cod_ubicacion=' + dpto +
                //     '&cod_area=' + 3 +
                //     '&periodo_ini=' + $scope.rep_periodo_ini +
                //     '&periodo_fin=' + $scope.rep_periodo_fin +
                //     '&nombre=' + nombre +
                //     '&periodo=' + $scope.hoja1_periodo +
                //     '&imagen=' + $scope.rep_imagen);

                $http({
                    method: 'POST',
                    url: "php/mesacontrol/mesacontrol.php",
                    data: {
                        function: 'generar_excel',
                        cod_ubicacion: dpto,
                        periodo_ini: $scope.rep_periodo_ini,
                        periodo_fin: $scope.rep_periodo_fin,
                        nombre: nombre,
                        periodo: $scope.hoja1_periodo
                    }
                }).then(function ({ data }) {
                    setTimeout(() => {
                        document.getElementById("btn_reporte_des").disabled = false;
                    }, 2000);
                    if (data.length) {
                        var array = [];
                        data.forEach(e => {
                            if ($scope.rep_imagen == '1') {
                                array.push({
                                    'DEPARTAMENTO': e.DPTO,
                                    'MUNICIPIO': e.MUNICIPIO,
                                    'PERIODO DE REPORTE': e.PERIODO_REPORTE,
                                    'NOMBRE DEL DOCUMENTO': e.NOMBRE_DOCUMENTO,
                                    'FECHA DE ENTREGA': e.FECHA_ENTREGA,
                                    'SOPORTE DE IMAGEN': e.ESTADO_IMAGEN,
                                    'ESTADO': e.ESTADO,
                                    'OBLIGATORIO': e.OBLIGATORIO,
                                    'VIGENCA': e.PERIODICIDAD,
                                    'SEMANA': e.SEMANA,
                                    'PRESTADOR': e.PRESTADOR,
                                    'CONTRATO': e.CONTRATO,
                                    'USUARIO QUE REALIZO EL ULTIMO CAMBIO': e.USUARIO,
                                })
                            }
                            if ($scope.rep_imagen != '1' && e.ESTADO_IMAGEN == $scope.rep_imagen) {
                                array.push({
                                    'DEPARTAMENTO': e.DPTO,
                                    'MUNICIPIO': e.MUNICIPIO,
                                    'PERIODO DE REPORTE': e.PERIODO_REPORTE,
                                    'NOMBRE DEL DOCUMENTO': e.NOMBRE_DOCUMENTO,
                                    'FECHA DE ENTREGA': e.FECHA_ENTREGA,
                                    'SOPORTE DE IMAGEN': e.ESTADO_IMAGEN,
                                    'ESTADO': e.ESTADO,
                                    'OBLIGATORIO': e.OBLIGATORIO,
                                    'VIGENCA': e.PERIODICIDAD,
                                    'SEMANA': e.SEMANA,
                                    'PRESTADOR': e.PRESTADOR,
                                    'CONTRATO': e.CONTRATO,
                                    'USUARIO QUE REALIZO EL ULTIMO CAMBIO': e.USUARIO,
                                })
                            }
                        });

                        var ws = XLSX.utils.json_to_sheet(array);
                        /* add to workbook */
                        var wb = XLSX.utils.book_new();
                        XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
                        /* write workbook and force a download */
                        XLSX.writeFile(wb, "Reporte General Mesa de Control.xlsx");
                        swal({
                            title: 'Documentos descargados!',
                            type: 'success'
                        }).catch(swal.noop);
                    } else {
                        swal.close();
                    }
                });

            }
            //
            $scope.FormatSoloNumero = function (NID) {
                if (NID) {
                    const input = document.getElementById('' + NID + '');
                    var valor = input.value;
                    valor = valor.replace(/\-/g, '');
                    valor = valor.replace(/[a-zA-Z]/g, '');
                    valor = valor.replace(/[^0-9]/g, '');
                    valor = valor.replace(/\./g, '');
                    input.value = valor;
                }
            }
        }])
    .filter('inicio', function () {
        return function (input, start) {
            if (input != undefined && start != NaN) {
                start = +start;
                return input.slice(start);
            } else {
                return null;
            }
        }
    });


