'use strict';
angular.module('GenesisApp').controller('reportenotglosaController', ['$scope', '$http', '$timeout', '$filter', function ($scope, $http, $timeout, $filter) {
    // Plantilla funcional
    console.clear();
    $(document).ready(function () {
        if (document.querySelector("#pantalla").offsetWidth < 1200) {
            document.querySelector("#pantalla").style.zoom = 0.8;
        }
        $scope.Pantalla = {
            Altura: 0,
            Anchura: document.querySelector("#pantalla").offsetWidth
        }
        document.getElementById("pantalla").parentElement.parentElement.parentElement.style.paddingBottom = '0px';

        $scope.SysDay = new Date();
        $scope.Vista = {
            Activa: 1
        };
        $scope.Vista1 = {
            F_Inicio: $scope.SysDay,
            F_Fin: $scope.SysDay
        };
        //TABLA
        $scope.Filtrar_Sol = 10;
        //
        $scope.Vista2 = {
            Mostrar_Sol: 10,
            F_Inicio: '',
            F_Fin: '',
        };
        $scope.Vista2_listDatosTemp = [];
        $scope.Vista2_Datos_Factura = [];
        //

        // $http({
        //     method: 'POST',
        //     url: "php/cuentasmedicas/reporteauditoriacuentas.php",
        //     data: {
        //         function: 'Obt_Cedula'
        //     }
        // }).then(function (response) {
        //     $scope.Rol_Cedula = response.data;
        // });

    });




    $scope.Vista1_Buscar = function (Accion) {
        if ($scope.Vista1.F_Inicio < $scope.Vista1.F_Fin) {

            document.querySelector('#Hoja2_Principal').classList.add('Ani_Down');
            $timeout(
                function () {
                    document.querySelector('#Hoja2_Principal').classList.remove('Ani_Down');
                }, 1000
            );
            $scope.Vista2_datos = [];
            $scope.Vista2.Filtrar_Sol = '';
            $scope.GetFecha('F_Inicio');
            $scope.GetFecha('F_Fin');
            $timeout(
                function () {
                    swal({ title: 'Cargando...', allowOutsideClick: false });
                    swal.showLoading();
                    $http({
                        method: 'POST',
                        url: "php/cuentasmedicas/reportenotglosa.php",
                        data: {
                            function: 'Cargar_Reportes',
                            Fecha_Inicio: $scope.Vista2.F_Inicio,
                            Fecha_Fin: $scope.Vista2.F_Fin
                        }
                    }).then(function (response) {
                        if (response.data) {
                            if (response.data == "") {
                                swal({
                                    title: "¡No se encontraron registros!",
                                    type: "info",
                                }).catch(swal.noop);
                            } else {
                                if (response.data[0].IPS != undefined) {
                                    swal.close();
                                    $scope.Vista.Activa = 2;
                                    $scope.Vista2_datos = response.data;
                                    $scope.initPaginacion($scope.Vista2_datos);
                                } else {
                                    swal({
                                        title: 'Ocurrio un error',
                                        text: response.data,
                                        type: 'warning',
                                    }).catch(swal.noop);
                                }
                            }
                        } else {
                            swal({
                                title: "¡No se encontraron facturas!",
                                text: response.data,
                                type: "warning"
                            }).catch(swal.noop);
                        }
                    })
                }, 1000
            );
        } else {
            swal({
                title: 'Ocurrio un error',
                text: 'La fecha inicial no debe ser mayor a la final.',
                type: 'warning',
            }).catch(swal.noop);
        }

        // console.log($scope.Vista1.Num_Sol, $scope.Vista1.Nit_Prestador);
        // $scope.Vista.Activa=2;
    }

    $scope.Generar_Acta = function () {
        var xFecha_Inicio = $scope.Vista2.F_Inicio;
        // var Fecha_Inicio = xFecha_Inicio.getFullYear() + '/' + (((xFecha_Inicio.getMonth() + 1) < 10) ? '0' + (xFecha_Inicio.getMonth() + 1) : (xFecha_Inicio.getMonth() + 1)) + '/' + xFecha_Inicio.getUTCDate();
        var xFecha_Fin = $scope.Vista2.F_Fin;
        // var Fecha_Fin = xFecha_Fin.getFullYear() + '/' + (((xFecha_Fin.getMonth() + 1) < 10) ? '0' + (xFecha_Fin.getMonth() + 1) : (xFecha_Fin.getMonth() + 1)) + '/' + xFecha_Fin.getUTCDate();
        window.open('views/Cuentasmedicas/formatos/formato_reportenotglosa.php?fecha_i=' + xFecha_Inicio + '&fecha_f=' + xFecha_Fin, '_blank', "width=900,height=1100");
    }

    $scope.Volver_Vistas = function () {
        if ($scope.Vista.Activa == '2') {
            $scope.Vista.Activa = 1;
            document.querySelector('#Hoja1_Principal').classList.add('Ani_Down');
            $timeout(
                function () {
                    document.querySelector('#Hoja1_Principal').classList.remove('Ani_Down');
                }, 1000
            );
        }
    }
    $scope.GetFecha = function (SCOPE) {
        var ahora_ano = $scope.Vista1[SCOPE].getFullYear();
        var ahora_mes = ((($scope.Vista1[SCOPE].getMonth() + 1) < 10) ? '0' + ($scope.Vista1[SCOPE].getMonth() + 1) : ($scope.Vista1[SCOPE].getMonth() + 1));
        var ahora_dia = ((($scope.Vista1[SCOPE].getUTCDate()) < 10) ? '0' + ($scope.Vista1[SCOPE].getUTCDate()) : ($scope.Vista1[SCOPE].getUTCDate()));

        $scope.Vista2[SCOPE] = ahora_dia + '/' + ahora_mes + '/' + ahora_ano;
    }

    /////////////////////////////////////////PAGINACION/////////////////////////////////////////////////
    $scope.chg_filtrar = function () {
        $scope.filter($scope.Vista2.Filtrar_Sol);
    }
    $scope.initPaginacion = function (info) {
        $scope.Vista2_listDatosTemp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.configPages();
    }
    $scope.initPaginacion2 = function (valor) {
        $scope.currentPage = 0;
        if (valor == 0) {
            $scope.pageSize = $scope.Vista2_listDatosTemp.length;
            $scope.valmaxpag = $scope.Vista2_listDatosTemp.length;
        } else {
            $scope.pageSize = valor;
            $scope.valmaxpag = valor;
        }
        $scope.pages = [];
        $scope.configPages();
    }
    $scope.filter = function (val) {
        if ($scope.Filter_Val != val) {
            $scope.Vista2_listDatosTemp = $filter('filter')($scope.Vista2_datos, val);
            $scope.configPages();
            $scope.Filter_Val = val;
        } else {
            $scope.Vista2_listDatosTemp = $filter('filter')($scope.Vista2_datos, '');
            $scope.configPages();
            $scope.Filter_Val = '';
        }
    }
    $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
            ini = 1;
            if (Math.ceil($scope.Vista2_listDatosTemp.length / $scope.pageSize) > $scope.valmaxpag) {
                if (($scope.pageSize * 10) < $scope.Vista2_listDatosTemp.length) {
                    fin = 10;
                } else {
                    fin = Math.ceil($scope.Vista2_listDatosTemp.length / $scope.pageSize);
                }
            }
            else { fin = Math.ceil($scope.Vista2_listDatosTemp.length / $scope.pageSize); }
        } else {
            if (ini >= Math.ceil($scope.Vista2_listDatosTemp.length / $scope.pageSize) - $scope.valmaxpag) {
                ini = Math.ceil($scope.Vista2_listDatosTemp.length / $scope.pageSize) - $scope.valmaxpag;
                fin = Math.ceil($scope.Vista2_listDatosTemp.length / $scope.pageSize);
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
        if ($scope.Vista2_listDatosTemp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt($scope.Vista2_listDatosTemp.length / $scope.pageSize);
        } else {
            var tamanomax = parseInt($scope.Vista2_listDatosTemp.length / $scope.pageSize) + 1;
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
            if ($scope.Vista2_listDatosTemp.length % $scope.pageSize == 0) {
                var tamanomax = parseInt($scope.Vista2_listDatosTemp.length / $scope.pageSize);
            } else {
                var tamanomax = parseInt($scope.Vista2_listDatosTemp.length / $scope.pageSize) + 1;
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

}]).filter('inicio', function () {
    return function (input, start) {
        if (input != undefined && start != NaN) {
            start = +start;
            return input.slice(start);
        } else {
            return null;
        }
    }
});