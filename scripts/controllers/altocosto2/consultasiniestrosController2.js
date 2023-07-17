'use strict';
angular.module('GenesisApp')
    .controller('consultasiniestrosController', ['$scope', '$http', '$window', '$filter',
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
                    Tipo_Doc: '',
                    Num_Doc: ''
                };
                $scope.Vista2 = {
                    Estado: '',
                    Ubicacion: '',
                    Cohorte: ''
                };

                ///////////////////////////////////////////////////////////////////////////////////////////////
                setTimeout(() => {
                    $scope.$apply();
                }, 500);
                $scope.Array_Patologias = [
                    { CODIGO: 'AR', NOMBRE: 'ARTRITIS' },
                    { CODIGO: 'CA', NOMBRE: 'CANCER' },
                    { CODIGO: 'ER', NOMBRE: 'ENFERMEDAD RENAL' },
                    { CODIGO: 'HF', NOMBRE: 'HEMOFILIA' },
                    { CODIGO: 'HC', NOMBRE: 'HEPATITIS C' },
                    { CODIGO: 'VH', NOMBRE: 'VIH' },
                    { CODIGO: 'EH', NOMBRE: 'ENFERMEDADES HUERFANAS' },
                    { CODIGO: 'TP', NOMBRE: 'TRASPLANTES' },
                    { CODIGO: 'X', NOMBRE: 'TODAS' },
                ]
            });
            $scope.Listado = {
                Lista: [],
                ListaTemp: [],
            };

            $scope.KeyFind = function () {
                if ($scope.Tabs == 'HOJA1') {
                    if ($scope.Vista1.Tipo_Doc != null && $scope.Vista1.Tipo_Doc != undefined && $scope.Vista1.Num_Doc != '' && $scope.Vista1.Num_Doc.length > 5) {
                        $scope.Hoja1_Consultar_Siniestros();
                    }
                }
                if ($scope.Tabs == 'HOJA2') {
                    if ($scope.Vista2.Estado != null && $scope.Vista2.Estado != '' && $scope.Vista2.Ubicacion != '' && $scope.Vista2.Cohorte != '') {
                        $scope.Hoja2_Consultar_Siniestros();
                    }
                }
            }

            $scope.Hoja1_Consultar_Siniestros = function () {
                $scope.Listado.Lista = [];
                $scope.Listado.ListaTemp = [];
                $http({
                    method: 'POST',
                    url: "php/altocosto/siniestros/consultasiniestros.php",
                    data: {
                        function: 'Hoja1_Consultar_Siniestros',
                        Tipo_Doc: $scope.Vista1.Tipo_Doc,
                        Num_Doc: $scope.Vista1.Num_Doc
                    }
                }).then(function (response) {
                    if (response.data && response.data.toString().substr(0, 3) != '<br') {
                        if (response.data[0].Codigo == undefined) {
                            $scope.Listado.Lista = response.data;
                            $scope.Listado.ListaTemp = response.data;
                        } else {
                            swal({
                                title: "¡IMPORTANTE!",
                                text: response.data[0].Nombre,
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

            $scope.Hoja2_Consultar_Siniestros = function () {
                var Ubicacion = $scope.Vista2.Ubicacion == 'X' ? '' : $scope.Vista2.Ubicacion;
                var Cohorte = $scope.Vista2.Cohorte == 'X' ? '' : $scope.Vista2.Cohorte;
                window.open('views/altocosto/formatos/formato_consultasiniestros.php?Estado=' + $scope.Vista2.Estado + '&Ubicacion=' + Ubicacion + '&Cohorte=' + Cohorte, '_blank', "width=900,height=1100");

                $http({
                    method: 'POST',
                    url: "php/altocosto/siniestros/consultasiniestros.php",
                    data: {
                        function: 'Descargar_Excel',
                        Estado: $scope.Vista2.Estado,
                        Ubicacion: Ubicacion,
                        Cohorte: Cohorte
                    }
                }).then(function (response) {
                    if (response.data && response.data.toString().substr(0, 3) != '<br') {
                        if (response.data.Codigo == undefined) {
                            // console.table(response.data);
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

            ////////////////////////////////////////////////////////////////////////////////////////////
            $scope.Descargar_Soporte = function (ruta,ftp) {
                $http({
                    method: 'POST',
                    url: "php/altocosto/siniestros/gestionsiniestros.php",
                    data: {
                        function: 'descargaAdjunto',
                        ruta: ruta,
                        ftp: ftp
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
                var Difference_In_Time = $scope.Vista3.F_Fin.getTime() - $scope.Vista3.F_Inicio.getTime();
                var days = Difference_In_Time / (1000 * 3600 * 24);
                if (days > 60) {
                    $scope.Vista3.F_Inicio = $scope.SysDay;
                    $scope.Vista3.F_Fin = $scope.SysDay;
                    Materialize.toast('¡El rango de fechas no puede ser mayor a 60 dias!', 5000); $('.toast').addClass('default-background-dark');
                }
                console.log(days);
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
            $scope.FormatPeso = function (NID) {
                const input = document.getElementById('' + NID + '');
                var valor = input.value;
                valor = valor.replace(/[^0-9,]/g, '');
                var array = null;
                var regex = new RegExp("\\,");
                if (!regex.test(valor)) {
                  valor = valor.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
                  valor = valor.split('').reverse().join('').replace(/^[\.]/, '');
                } else {
                  array = valor.toString().split(',');
                  if (array.length > 2) {
                    input.value = 0;
                  } else {
                    array[0] = array[0].toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
                    array[0] = array[0].split('').reverse().join('').replace(/^[\.]/, '');
                    if (array[1].length > 2) {
                      array[1] = array[1].substr(0, 2);
                    }
                  }
                }
                if (!regex.test(valor)) {
                  input.value = valor;
                } else {
                  if (valor == ',') {
                    input.value = 0;
                  } else {
                    if (valor.substr(0, 1) == ',') {
                      input.value = 0 + ',' + array[1];
                    } else {
                      input.value = array[0] + ',' + array[1];
                    }
                  }
                }
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
        }
    ]).filter('startFrom', function () {
        return function (input, start) {
            if (input != undefined) {
                start = +start;
                return input.slice(start);
            }
        }
    });