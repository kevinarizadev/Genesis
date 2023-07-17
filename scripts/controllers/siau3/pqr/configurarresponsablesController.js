'use strict';
angular.module('GenesisApp')
    .controller('configurarresponsablesController', ['$scope', 'pqrHttp', function ($scope, pqrHttp) {

        $(document).ready(function () {
            $("#modalselecresponsable").modal();
        });


        $scope.check_sede = false;
        $scope.tempsed = 'N';
        $scope.hideedicion = true;
        $scope.tempresponsable = null;
        $scope.arrayresptemp = [];
        $scope.inactivefuncionario = true;
        $scope.changesede = function () {

            if ($scope.check_sede == false) {
                $scope.tempsed = 'N';
            } else {
                $scope.tempsed = 'S';
            }

            pqrHttp.p_obtener_lista_responsables_correspondencia($scope.tempsed).then(function (response) {
                $scope.listarespnsables = response
                swal.close();
            })
        }

        $scope.changesede();


        $scope.showeditarresponsables = function (params) {            
            $scope.tempresponsable = params;
            $scope.arrayresptemp.push({ cod: 1, res: params.RESPONSABLE1, nomres: params.NOMRES1 });
            $scope.arrayresptemp.push({ cod: 2, res: params.RESPONSABLE2, nomres: params.NOMRES2 });
            $scope.arrayresptemp.push({ cod: 3, res: params.RESPONSABLE3, nomres: params.NOMRES3 });
            $scope.hideedicion = false;
        }

        $scope.removeresponsable = function (params) {            
            for (var i in $scope.arrayresptemp) {
                if ($scope.arrayresptemp[i].cod == params.cod) {
                    $scope.arrayresptemp[i].res = null;
                    $scope.arrayresptemp[i].nomres = null;                    
                    break;
                }
            }
        }

        $scope.back_list_areas = function () {
            $scope.hideedicion = true;
            $scope.tempresponsable = null;
            $scope.arrayresptemp = [];
            $scope.changesede();
        }

        $scope.tresponsable = null;
        $scope.openmodals = function (modal, params) {            
            switch (modal) {
                case 'modalselecresponsable':
                    $scope.inactivefuncionario = true;
                    $scope.funcioario = "";
                    $scope.tresponsable = params;
                    $("#modalselecresponsable").modal("open");
                    setTimeout(() => {
                        $('#modalselecresponsable #funcinput').focus();
                    }, 100);
                    break;
                default:
                    break;
            }
        }
        $scope.closemodals = function (params) {
            switch (params) {
                case 'modalselecresponsable':
                    $scope.inactivefuncionario = true;
                    $("#modalselecresponsable").modal("close");
                    break;
                default:
                    break;
            }
        }
        $scope.buscarfuncionario = function (params) {
            swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
            });
            pqrHttp.p_obtener_funcionario_eps(params).then(function (response) {


                if (response.Codigo == '0') {
                    $scope.inactivefuncionario = true;
                    swal('Genesis informa', 'No se encontraron resultados!', 'error');
                } else {
                    $scope.tempresponsables = response;
                    $scope.inactivefuncionario = false;
                    swal.close();
                }
            })
        }

    $scope.seleccionarfuncionario = function (params) {            
            for (var i in $scope.arrayresptemp) {
                if ($scope.arrayresptemp[i].cod == $scope.tresponsable.cod) {
                    $scope.arrayresptemp[i].res = params.codigo;
                    $scope.arrayresptemp[i].nomres = params.nombre;                    
                    break; //Stop this loop, we found it!
                }
            }
            $scope.closemodals('modalselecresponsable');
        }

        $scope.saveEdicionResponsables = function () {
            $scope.json = {
                codigo_area: $scope.tempresponsable.CODIGO_AREA,
                responsable1: $scope.arrayresptemp[0].res,
                responsable2: $scope.arrayresptemp[1].res,
                responsable3: $scope.arrayresptemp[2].res
            }
            pqrHttp.p_ui_responsasbles_correspondencia(JSON.stringify($scope.json)).then(function (response) {
                swal(response.Codigo == '0' ? 'Completado' : 'No completado', response.Nombre, response.Codigo == '0' ? 'success' : 'error').then(function () {

                    if (response.Codigo == '0') {
                        $scope.back_list_areas();


                    }
                }).catch(swal.noop);
            });
        }




    }])
