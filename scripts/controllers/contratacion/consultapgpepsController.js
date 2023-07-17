'use strict';
angular.module('GenesisApp')
    .controller('consultapgpepsController', ['$scope', '$http', '$window', '$filter',
        function ($scope, $http, $window, $filter) {
            $(document).ready(function () {
                console.clear();
                $('.modal').modal();
                $('.tabs').tabs();
                $scope.Tabs = 'HOJA1';
                console.log($(window).width());
                if ($(window).width() < 1100) {
                    document.querySelector("#pantalla").style.zoom = 0.7;
                }
                if ($(window).width() > 1100 && $(window).width() < 1300) {
                    document.querySelector("#pantalla").style.zoom = 0.8;
                }
                if ($(window).width() > 1300) {
                    document.querySelector("#pantalla").style.zoom = 0.9;
                }
                document.getElementById("pantalla").parentElement.parentElement.parentElement.style.paddingBottom = '0px';
                document.getElementById("pantalla").parentElement.parentElement.parentElement.style.backgroundColor = 'white';
                //$scope.Rol_Cedula = sessionStorage.getItem('cedula');
                $http({
                    method: 'POST',
                    url: "php/altocosto/siniestros/consultasiniestros.php",
                    data: {
                        function: 'Obt_Cedula'
                    }
                }).then(function (response) {
                    $scope.Rol_Cedula = response.data;
                    //////////////////////
                });

                ///////////////////////////
                $scope.SysDay = new Date();
                //////////////////////
                $scope.currentPage = 0;
                $scope.pageSize = 15;
                $scope.valmaxpag = 10;
                $scope.pages = [];
                $scope.Listado.Lista = [];
                $scope.Listado.ListaTemp = "";
                ///////////////////////////////////////////////////////////////////////////////////////////////

                $scope.Vista1 = {
                    Nit: '',
                    Nit_Cod: '',
                    Busqueda: {
                        Ips: {
                            Filtro: [],
                            Listado: null,
                            SAVE: null,
                            Cohorte: null,
                            Seleccion: 9999
                        }
                    }
                };
                $scope.Vista2 = {
                    Tipo_Doc: '',
                    Num_Doc: ''
                };
                $scope.Vista3 = {
                    Nit: '',
                    Nit_Cod: '',
                    Busqueda: {
                        Ips: {
                            Filtro: [],
                            Listado: null,
                            SAVE: null,
                            Cohorte: null,
                            Seleccion: 9999
                        }
                    },
                    F_Inicio: $scope.SysDay,
                    F_Fin: $scope.SysDay
                };



                ///////////////////////////////////////////////////////////////////////////////////////////////
                setTimeout(() => {
                    $scope.$apply();
                }, 500);
            });
            $scope.Listado = {
                Lista: [],
                ListaTemp: [],
            };

            $scope.KeyFind = function () {
                if ($scope.Tabs == 'HOJA1') {
                    if ($scope.Vista1.Nit_Cod != '' && $scope.Vista1.Nit_Cod != undefined) {
                        $scope.Hojas_Consultar_Siniestros();
                    } else { Materialize.toast('¡Consulte primero la IPS!', 5000); $('.toast').addClass('default-background-dark'); }
                }
                if ($scope.Tabs == 'HOJA2') {
                    if ($scope.Vista2.Tipo_Doc != null && $scope.Vista2.Tipo_Doc != undefined && $scope.Vista2.Num_Doc != '' && $scope.Vista2.Num_Doc.length > 5) {
                        $scope.Hojas_Consultar_Siniestros();
                    }
                }
                if ($scope.Tabs == 'HOJA3') {
                    if ($scope.Vista3.Nit_Cod != '' && $scope.Vista3.Nit_Cod != undefined) {
                        if ($scope.Vista3.F_Inicio <= $scope.Vista3.F_Fin) {
                            $scope.Generar_Excel();
                        } else {
                            Materialize.toast('¡La fecha de inicio no puede ser superior a la fecha fin!', 5000); $('.toast').addClass('default-background-dark');
                        }
                    } else { Materialize.toast('¡Consulte primero la IPS!', 5000); $('.toast').addClass('default-background-dark'); }
                }
            }

            $scope.Hojas_Consultar_Siniestros = function () {
                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/contratacion/consultapgpeps.php",
                    data: {
                        function: 'Hojas_Consultar_PGP',
                        Nit: $scope.Tabs == 'HOJA1' ? $scope.Vista1.Nit_Cod : '',
                        F_Inicio: '',
                        F_Fin: '',
                        Tipo: $scope.Tabs == 'HOJA1' ? 'N' : 'T',
                        Tipo_Doc: $scope.Tabs == 'HOJA2' ? $scope.Vista2.Tipo_Doc : '',
                        Num_Doc: $scope.Tabs == 'HOJA2' ? $scope.Vista2.Num_Doc : ''
                    }
                }).then(function (response) {
                    if (response.data && response.data.toString().substr(0, 3) != '<br') {
                        if (response.data.Codigo == undefined) {
                            if (response.data.length != 0) {
                                $scope.Listado.Lista = response.data;
                                $scope.Listado.ListaTemp = response.data;
                                $scope.currentPage = 0;
                                $scope.pageSize = 10;
                                $scope.valmaxpag = 10;
                                $scope.pages = [];
                                $scope.configPages();
                                swal.close();
                            } else {
                                swal({
                                    title: "¡IMPORTANTE!",
                                    text: "No se encontraron registros.",
                                    type: "info",
                                }).catch(swal.noop);
                                document.getElementById("Num_Doc").focus();
                            }
                        } else {
                            swal({
                                title: "¡IMPORTANTE!",
                                text: response.data.Nombre,
                                type: "warning",
                            }).catch(swal.noop);
                            document.getElementById("Num_Doc").focus();
                        }
                    } else {
                        swal({
                            title: "¡IMPORTANTE!",
                            text: response.data,
                            type: "info",
                        }).catch(swal.noop);
                        document.getElementById("Num_Doc").focus();
                    }
                });
            }

            $scope.Generar_Excel = function () {
                swal({ title: 'Generando Excel...', allowOutsideClick: false });
                swal.showLoading();
                var Nit = '';
                var F_Inicio = '';
                var F_Fin = '';
                var Tipo = '';
                var Tipo_Doc = '';
                var Num_Doc = '';

                // N: solo nit
                // R: nit y rango de fecha(fecha inicio y fecha fin)
                // T: tipo y numero de documento
                if ($scope.Tabs == 'HOJA1') {
                    Tipo = 'N';
                    Nit = $scope.Vista1.Nit_Cod;
                }
                if ($scope.Tabs == 'HOJA2') {
                    Tipo = 'T';
                    Tipo_Doc = $scope.Vista2.Tipo_Doc;
                    Num_Doc = $scope.Vista2.Num_Doc;
                }
                if ($scope.Tabs == 'HOJA3') {
                    Tipo = 'R';
                    Nit = $scope.Vista3.Nit_Cod;
                    F_Inicio = $scope.GetFecha('F_Inicio');
                    F_Fin = $scope.GetFecha('F_Fin');
                }

                window.open('views/contratacion/formatos/formato_consultapgpeps.php?Nit=' + Nit +
                    '&F_Inicio=' + F_Inicio +
                    '&F_Fin=' + F_Fin +
                    '&Tipo=' + Tipo +
                    '&Tipo_Doc=' + Tipo_Doc +
                    '&Num_Doc=' + Num_Doc
                    , '_blank', "width=900,height=1100");

                setTimeout(() => {
                    swal.close();
                }, 2000);
            }

            $scope.KeyFind_Ips = function (Vista, keyEvent) {
                if ($scope[Vista].Busqueda.Ips.Filtro != null && $scope[Vista].Busqueda.Ips.Filtro.length != 0) {
                    if (keyEvent.which === 40) {
                        $scope[Vista].Busqueda.Ips.Seleccion = $scope[Vista].Busqueda.Ips.Seleccion >= ($scope[Vista].Busqueda.Ips.Filtro.length - 1) ? 0 : $scope[Vista].Busqueda.Ips.Seleccion + 1;
                        document.querySelector('.Clase_Listar_Ips').scrollTo(0, document.querySelector('#' + Vista + '_Ips' + $scope[Vista].Busqueda.Ips.Seleccion).offsetTop);
                    } else if (keyEvent.which === 38) {
                        $scope[Vista].Busqueda.Ips.Seleccion = $scope[Vista].Busqueda.Ips.Seleccion <= 0 || $scope[Vista].Busqueda.Ips.Seleccion == 9999 ? $scope[Vista].Busqueda.Ips.Filtro.length - 1 : $scope[Vista].Busqueda.Ips.Seleccion - 1;
                        document.querySelector('.Clase_Listar_Ips').scrollTo(0, document.querySelector('#' + Vista + '_Ips' + $scope[Vista].Busqueda.Ips.Seleccion).offsetTop)
                    } else if (keyEvent.which === 13 && $scope[Vista].Busqueda.Ips.Seleccion != 9999) {
                        var x = $scope[Vista].Busqueda.Ips.Filtro[$scope[Vista].Busqueda.Ips.Seleccion];
                        $scope.FillTextbox_Listado_Ips(x.CODIGO, x.NOMBRE);
                    }
                } else {
                    if (keyEvent.which === 13)
                        $scope.Buscar_Ips(Vista);
                }
            }
            $scope.Buscar_Ips = function (Vista) {
                if ($scope[Vista].Nit.length > 2) {
                    $http({
                        method: 'POST',
                        url: "php/contratacion/consultapgpeps.php",
                        data: {
                            function: 'Obtener_Ips',
                            Conc: $scope[Vista].Nit.toUpperCase()
                        }
                    }).then(function (response) {
                        if (response.data.toString().substr(0, 3) != '<br') {
                            if (response.data[0] != undefined && response.data.length > 1) {
                                var datos = [];
                                response.data.forEach(e => {
                                    datos.push({
                                        "CODIGO": e.nit,
                                        "NOMBRE": e.nombre_ips,
                                        "DIR": e.direccion,
                                        "TEL": e.telefono
                                    });
                                });
                                setTimeout(() => {
                                    $scope[Vista].Busqueda.Ips.Filtro = datos;
                                    $scope[Vista].Busqueda.Ips.Listado = datos;
                                    $('.Clase_Listar_Ips').css({ width: $('#' + Vista + '_Nit')[0].offsetWidth });
                                    $scope.$apply();
                                }, 500);
                            }
                            if (response.data.length == 1) {
                                $scope.FillTextbox_Listado_Ips(Vista, response.data[0].nit, response.data[0].nombre_ips);
                            } else if (response.data.length == 0) {
                                swal({
                                    title: "¡Importante!",
                                    text: "No se encontro la Ips",
                                    type: "info",
                                }).catch(swal.noop);
                            }
                        } else {
                            swal({
                                title: "¡IMPORTANTE!",
                                text: response.data,
                                type: "warning"
                            }).catch(swal.noop);
                        }
                    })
                } else {
                    Materialize.toast('¡Digite al menos 3 caracteres!', 1000); $('.toast').addClass('default-background-dark');
                }
            }
            $scope.Complete_Listado_Ips = function (Vista, keyEvent, string) {
                if (keyEvent.which !== 40 && keyEvent.which !== 38 && keyEvent.which !== 13) {
                    if ($scope[Vista].Nit != undefined && string != undefined && $scope[Vista].Busqueda.Ips.Listado != undefined) {
                        $('.Clase_Listar_Ips').css({ width: $('#' + Vista + '_Nit')[0].offsetWidth });
                        var output = [];
                        angular.forEach($scope[Vista].Busqueda.Ips.Listado, function (x) {
                            if (x.NOMBRE.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.CODIGO.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
                                output.push({ "CODIGO": x.CODIGO, "NOMBRE": x.NOMBRE.toUpperCase() });
                            }
                        });
                        $scope[Vista].Busqueda.Ips.Filtro = output;
                        $scope[Vista].Busqueda.Ips.Seleccion = 9999;
                    }
                }
            }
            $scope.FillTextbox_Listado_Ips = function (Vista, codigo, nombre) {
                $scope[Vista].Nit_Cod = codigo;
                $scope[Vista].Nit = codigo + ' - ' + nombre;
                $scope[Vista].Busqueda.Ips.SAVE = codigo + ' - ' + nombre;
                $scope[Vista].Busqueda.Ips.Filtro = null;
                setTimeout(() => {
                    $scope.$apply();
                }, 500);
            }
            $scope.Blur_Ips = function (Vista) {
                setTimeout(() => {
                    if ($scope[Vista] != undefined && $scope[Vista].Nit != undefined) {
                        if ($scope[Vista].Nit != $scope[Vista].Busqueda.Ips.SAVE && $scope[Vista].Busqueda.Ips.SAVE != null) {
                            $scope[Vista].Nit = $scope[Vista].Busqueda.Ips.SAVE;
                            $scope[Vista].Busqueda.Ips.Filtro = null;
                        }
                        $scope[Vista].Busqueda.Ips.Filtro = null;
                    }
                    $scope.$apply();
                }, 300);
            }

            ////////////////////////////////////////////////////////////////////////////////////////////
            $scope.Descargar_Soporte = function (ruta) {
                $http({
                    method: 'POST',
                    url: "php/altocosto/siniestros/gestionsiniestros.php",
                    data: {
                        function: 'descargaAdjunto',
                        ruta: ruta
                    }
                }).then(function (response) {
                    var win = window.open("temp/" + response.data, '_blank');
                    win.focus();
                });
            }

            $scope.ValFecha = function (SCOPE) {
                if ($scope.Vista3[SCOPE] == undefined) {
                    $scope.Vista3[SCOPE] = $scope.SysDay;
                }
                if ($scope.Vista3[SCOPE] > $scope.SysDay) {
                    $scope.Vista3[SCOPE] = $scope.SysDay;
                }
                // var Difference_In_Time = $scope.Vista3.F_Fin.getTime() - $scope.Vista3.F_Inicio.getTime();
                // var days = Difference_In_Time / (1000 * 3600 * 24);
                // if (days > 60) {
                //     $scope.Vista3.F_Inicio = $scope.SysDay;
                //     $scope.Vista3.F_Fin = $scope.SysDay;
                //     Materialize.toast('¡El rango de fechas no puede ser mayor a 60 dias!', 5000); $('.toast').addClass('default-background-dark');
                // }
                // console.log(days);
            }
            $scope.GetFecha = function (SCOPE) {
                var ahora_ano = $scope.Vista3[SCOPE].getFullYear();
                var ahora_mes = ((($scope.Vista3[SCOPE].getMonth() + 1) < 10) ? '0' + ($scope.Vista3[SCOPE].getMonth() + 1) : ($scope.Vista3[SCOPE].getMonth() + 1));
                var ahora_dia = ((($scope.Vista3[SCOPE].getDate()) < 10) ? '0' + ($scope.Vista3[SCOPE].getDate()) : ($scope.Vista3[SCOPE].getDate()));
                return ahora_dia + '/' + ahora_mes + '/' + ahora_ano;
            }
            $scope.SetTab = function (x) {
                if (x != $scope.Tabs) {
                    $scope.Listado.Lista = [];
                    $scope.Listado.ListaTemp = '';
                    $scope.Listado.Filtro = '';
                }
                $scope.Tabs = x;
                setTimeout(() => {
                    $scope.$apply();
                }, 500);
            }
            $scope.FormatSoloNumero = function (NID) {
                const input = document.getElementById('' + NID + '');
                var valor = input.value;
                valor = valor.replace(/[^0-9]/g, '');
                input.value = valor;
            }
            $scope.FormatPesoNumero = function (num) {
                if (num) {
                    var regex2 = new RegExp("\\.");
                    if (regex2.test(num)) {
                        num = num.toString().replace('.', ',');
                        num = num.split(',');
                        num[0] = num[0].toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
                        num[0] = num[0].split('').reverse().join('').replace(/^[\.]/, '');
                        if (num[1].length > 1 && num[1].length > 2) {
                            num[1] = num[1].toString().substr(0, 2);
                        }
                        if (num[1].length == 1) {
                            num[1] = num[1] + '0';
                        }
                        return num[0] + ',' + num[1];
                    } else {
                        num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
                        num = num.split('').reverse().join('').replace(/^[\.]/, '');
                        return num + ',00';
                    }
                } else {
                    return "0"
                }
            }
            $scope.closeModal = function () {
                $('.modal').modal('close');
            }
            ////////////////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////////////////
            $scope.Estado_Solicitud_Color = function (Estado) {
                if (Estado != undefined) {
                    if (Estado.toString().toUpperCase() == 'A') {
                        return { "background-color": "rgb(251, 93, 1) !important;" }
                    }
                    if (Estado.toString().toUpperCase() == 'P') {
                        return { "background-color": "rgb(6, 152, 20)!important" }
                    }
                }
            }
            // Paginacion
            $scope.filter = function (val) {
                $scope.Listado.ListaTemp = $filter('filter')($scope.Listado.Lista, ($scope.filter_save == val) ? '' : val);
                if ($scope.Listado.ListaTemp.length > 0) {
                    $scope.setPage(1);
                }
                $scope.configPages();
                $scope.filter_save = val;
            }
            $scope.closeModal = function () {
                $('.modal').modal('close');
            }
            $scope.configPages = function () {
                $scope.pages.length = 0;
                var ini = $scope.currentPage - 4;
                var fin = $scope.currentPage + 5;
                if (ini < 1) {
                    ini = 1;
                    if (Math.ceil($scope.Listado.ListaTemp.length / $scope.pageSize) > $scope.valmaxpag)
                        fin = 10;
                    else
                        fin = Math.ceil($scope.Listado.ListaTemp.length / $scope.pageSize);
                } else {
                    if (ini >= Math.ceil($scope.Listado.ListaTemp.length / $scope.pageSize) - $scope.valmaxpag) {
                        ini = Math.ceil($scope.Listado.ListaTemp.length / $scope.pageSize) - $scope.valmaxpag;
                        fin = Math.ceil($scope.Listado.ListaTemp.length / $scope.pageSize);
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
            }
            $scope.setPage = function (index) {
                $scope.currentPage = index - 1;
                // console.log($scope.Listado.Lista.length / $scope.pageSize - 1)
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
                    if ($scope.Listado.ListaTemp.length % $scope.pageSize == 0) {
                        var tamanomax = parseInt($scope.Listado.ListaTemp.length / $scope.pageSize);
                    } else {
                        var tamanomax = parseInt($scope.Listado.ListaTemp.length / $scope.pageSize) + 1;
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
                  setTimeout(() => {
                    $scope.$apply();
                  }, 500);
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

        }
    ]).filter('startFrom', function () {
        return function (input, start) {
            if (input != undefined) {
                start = +start;
                return input.slice(start);
            }
        }
    });