'use strict';
angular.module('GenesisApp').controller('consolidadofuncionario', ['$scope', '$http', '$filter', function ($scope, $http, $filter)  {

        $scope.VisualizarInformacion = function (estado, nombre) {
            $scope.title = nombre;
            if (estado == 'P') {

                $scope.OcultarColumnaP = true;
                $scope.OcultarColumnaA = false;
                $scope.OcultarColumnaR = false;
                $scope.OcultarColumnaPP = false;

            } else {
                $scope.OcultarColumnaPP = true;

            }
            if (estado == 'A') {

                $scope.OcultarColumnaP = false;
                $scope.OcultarColumnaA = true;
                $scope.OcultarColumnaR = false;
            } else {
            }
            if (estado == 'R') {
                $scope.OcultarColumna = false;
                $scope.OcultarColumnaP = false;
                $scope.OcultarColumnaA = false;
                $scope.OcultarColumnaR = true;
                $scope.OcultarColumnaRR = false;

            } else {            
                $scope.OcultarColumna = true;
                $scope.OcultarColumnaRR = true;

            }
            $http({
                method: 'POST',
                url: "php/ips/func3047.php",
                data: { function: 'VisualizarDetallesFuncionario', documento: sessionStorage.getItem('cedula'), estado: estado }
            }).then(function (response) {
                $scope.listacontrol = response.data;
                $scope.initPaginacion(response.data);
                // $scope.resultado = response.data;

            });
        }

        $scope.DetalleIPS = function (estado) {
            $http({
                method: 'POST',
                url: "php/ips/func3047.php",
                data: { function: 'detalle_funcionario', documento: sessionStorage.getItem('cedula') }
                //data: { function: 'detalle_ips', nit: '802016357' }
                //data: { function: 'detalle_ips',  ubicacion: sessionStorage.getItem('ubicacion'), nit: sessionStorage.getItem('cedula')}                    
            }).then(function (response) {
                $scope.pendientes = response.data[0].pendientes;
                $scope.rechazados = response.data[0].rechazado;
                $scope.gestionados = response.data[0].procesado;
            });
        }

        //      $scope.DetalleIPS = function () {
        //     $http({
        //         method: 'POST',
        //         url: "php/ips/func3047.php",
        //         data: { function: 'detalle_funcionario', nit: sessionStorage.getItem('cedula'),  estado: estado }
        //         //data: { function: 'detalle_ips', nit: '802016357' }
        //         //data: { function: 'detalle_ips',  ubicacion: sessionStorage.getItem('ubicacion'), nit: sessionStorage.getItem('cedula')}                    
        //     }).then(function (response) {
        //         $scope.pendientes = response.data[0].pendientes;
        //         $scope.rechazados = response.data[0].rechazados;
        //         $scope.gestionados = response.data[0].gestionados;
        //         // total 
        //     });
        // }



        $scope.initPaginacion = function (info) {
            $scope.listDatosTemp = info;
            $scope.currentPage = 0;
            $scope.pageSize = 20;
            $scope.valmaxpag = 20;
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

        $scope.DetalleIPS();


        $scope.VisualizarInformacion('P', 'Gestionados');
        
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

