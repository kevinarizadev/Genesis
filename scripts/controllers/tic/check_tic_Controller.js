'use strict';
angular.module('GenesisApp')
    .controller('check_tic_Controller', ['$scope', '$http', 'ngDialog', '$filter', function ($scope, $http, ngDialog, $filter) {
        $scope.panel = { activo: 1, titulo: "", ttemp: "" };
        $scope.acaspordepts = [];
        $scope.listacas = [];
        
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        });
        $http({
            method: 'GET',
            url: "json/check_tic.json"
        }).then(function (response) {

            $scope.acaspordepts = response.data;
            $scope.totalOpen = 0;
            $scope.totalClose = 0;
            for (const i in $scope.acaspordepts) {
                if ($scope.acaspordepts.hasOwnProperty(i)) {
                    $scope.totalOpen += $scope.acaspordepts[i].activo;
                    $scope.totalClose += $scope.acaspordepts[i].Procesado;
                }
            }
            swal.close();

        })
        $scope.getModuloTic = function (modulo, titulo) {
            $scope.panel.activo = 2;
            $scope.panel.titulo = "Modulo de " + titulo;
            $scope.panel.ttemp = modulo;

            if (modulo == 'subcategoria') {
                $scope.paso = 1;
                $scope.inactivecontratos = true;
            }

            swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
            });
            swal.close();
        }




        $scope.changePanel = function () {
            if ($scope.panel.activo == 2) {
                $scope.panel.activo = 1;
            } else if ($scope.panel.activo == 3) {
                $scope.panel.activo = 2;
                $scope.panel.titulo = $scope.panel.ttemp;
            }
        }







        //funciones modulos  consulta
        $scope.inactivecontratos = true;
        $scope.tempbusqueda = {
            numero: null,
            regimen: null,
            estado: null,
            prestador: null
        }
        $scope.buscarcontratos = function () {
            $http({
                method: 'POST',
                url: "php/tic/consultas/consultas.php",
                data: {
                    function: 'p_buscar_contratos',
                    numero: $scope.tempbusqueda.numero,
                    documento: $scope.tempbusqueda.regimen,
                    estado: $scope.tempbusqueda.estado,
                    nit: $scope.tempbusqueda.prestador

                }
            }).then(function (response) {
                console.log(response.data);

                $scope.json_contratos = response.data;
                $scope.inactivecontratos = false;

            })
        }

        $scope.datoscontrato = null;
        $scope.mostrar_contrato = function (params) {
            $scope.datoscontrato = params;
            swal({
                html: '<h5>Escriba el codigo del producto a buscar</h5>',
                input: 'text'
            }).then(name => {
                if (!name) throw null;
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
                    url: "php/tic/consultas/consultas.php",
                    data: {
                        function: 'p_obtener_productos_cat_alterna_servicios_contrato',
                        numero: params.numero,
                        ubicacion: params.ubicacion,
                        documento: params.documento_id,
                        producto: name

                    }
                }).then(function (response) {

                    console.log(response.data.contrato);
                    console.log(response.data.info);
                        swal.close();
                    if (response.data == 0) {                        
                        swal('Genesis', "Producto no existe en este Contrato", 'info');


                    } else {
                        $scope.json_subcategoria = response.data;
                        $scope.paso = 4;
                    }


                    console.log("$scope.paso", $scope.paso);
                    console.log(name);
                })

            })
        }

        $scope.back_ = function () {
            $scope.paso = 1;
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