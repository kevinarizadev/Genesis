'use strict';
angular.module('GenesisApp').controller('repmesadeayudaController', ['$scope', '$http', '$timeout', '$filter', function ($scope, $http, $timeout, $filter) {
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
        //TABLA
        $scope.Filtrar_Sol = 10;
        //
        $scope.Vista1 = {
            Mostrar_Sol: 10
        };
        $scope.Vista1_listDatosTemp = [];
        $scope.Vista1_datos_Factura = [];
        //
        $scope.Vista1_Buscar();

    });




    $scope.Vista1_Buscar = function () {
        $scope.Vista1_datos = [];
        $scope.Vista1.Filtrar_Sol = '';
        $timeout(
            function () {
                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/acas/repmesadeayuda.php",
                    data: {
                        function: 'Vista1_List_Acas',
                    }
                }).then(function (response) {
                    if (response.data) {
                        if (response.data[0].Codigo != undefined) {
                            swal({
                                title: "¡No se encontraron facturas!",
                                type: "info",
                            }).catch(swal.noop);
                        } else {
                            if (response.data[0] != undefined) {
                                $scope.Vista1_datos = response.data;
                                $scope.initPaginacion(response.data);
                                swal.close();
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
                            title: "¡No se encontraron resultados!",
                            text: response.data,
                            type: "warning"
                        }).catch(swal.noop);
                    }
                })
            }, 1000
        );


        // console.log($scope.Vista1.Num_Sol, $scope.Vista1.Nit_Prestador);
        // $scope.Vista.Activa=2;
    }


    /////////////////////////////////////////PAGINACION/////////////////////////////////////////////////
    $scope.chg_filtrar = function () {
        $scope.filter($scope.Vista1.Filtrar_Sol);
    }
    $scope.initPaginacion = function (info) {
        $scope.Vista1_listDatosTemp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.configPages();
    }
    $scope.initPaginacion2 = function (valor) {
        $scope.currentPage = 0;
        if (valor == 0) {
            $scope.pageSize = $scope.Vista1_listDatosTemp.length;
            $scope.valmaxpag = $scope.Vista1_listDatosTemp.length;
        } else {
            $scope.pageSize = valor;
            $scope.valmaxpag = valor;
        }
        $scope.pages = [];
        $scope.configPages();
    }
    $scope.filter = function (val) {
        if ($scope.Filter_Val != val) {
            $scope.Vista1_listDatosTemp = $filter('filter')($scope.Vista1_datos, val);
            $scope.configPages();
            $scope.Filter_Val = val;
        } else {
            $scope.Vista1_listDatosTemp = $filter('filter')($scope.Vista1_datos, '');
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
            if (Math.ceil($scope.Vista1_listDatosTemp.length / $scope.pageSize) > $scope.valmaxpag) {
                if (($scope.pageSize * 10) < $scope.Vista1_listDatosTemp.length) {
                    fin = 10;
                } else {
                    fin = Math.ceil($scope.Vista1_listDatosTemp.length / $scope.pageSize);
                }
            }
            else { fin = Math.ceil($scope.Vista1_listDatosTemp.length / $scope.pageSize); }
        } else {
            if (ini >= Math.ceil($scope.Vista1_listDatosTemp.length / $scope.pageSize) - $scope.valmaxpag) {
                ini = Math.ceil($scope.Vista1_listDatosTemp.length / $scope.pageSize) - $scope.valmaxpag;
                fin = Math.ceil($scope.Vista1_listDatosTemp.length / $scope.pageSize);
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
        if ($scope.Vista1_listDatosTemp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt($scope.Vista1_listDatosTemp.length / $scope.pageSize);
        } else {
            var tamanomax = parseInt($scope.Vista1_listDatosTemp.length / $scope.pageSize) + 1;
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
            if ($scope.Vista1_listDatosTemp.length % $scope.pageSize == 0) {
                var tamanomax = parseInt($scope.Vista1_listDatosTemp.length / $scope.pageSize);
            } else {
                var tamanomax = parseInt($scope.Vista1_listDatosTemp.length / $scope.pageSize) + 1;
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