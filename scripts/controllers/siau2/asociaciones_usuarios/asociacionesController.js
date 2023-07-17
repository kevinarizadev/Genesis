'use strict';
angular.module('GenesisApp').controller('asociaciones_usuarios_controller', ['$scope', '$timeout', '$http', 'ngDialog', '$filter', function ($scope, $timeout, $http, ngDialog, $filter) {
    $(document).ready(function () {
        $('.tabs').tabs();
        document.querySelector("#tab_1").focus();
        // console.clear();
        console.log("1");
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
          dd = '0' + dd
        }
        if (mm < 10) {
          mm = '0' + mm
        }
        today = yyyy + '-' + mm + '-' + dd;
    });
    $scope.resize_screen = "";
    $scope.tabs = {
        select: 1
    };

    $scope.asociaciones = {
        departamento: "",
        municipio: "",
        options_departamento: new Array(),
        options_municipio: new Array(),
        listado: new Array()
    };

    $scope.shw = {
        detalle: false,
    };

    $scope.seleccionar = function (tab_numer) {
        $scope.tabs.select = tab_numer;
        switch (tab_numer) {
            case 1:

            break;
            case 2:
            setTimeout(() => {
                document.querySelector("#afiliacion_condicion").focus();
            }, 100);
            break;
            case 3:
            setTimeout(() => {
                document.querySelector("#afi_beneficiarios_tipo_documento").focus();
            }, 100);
            break;
            case 4:

            break;
            case 5:

            break;
            case 6:

            break;
        }
    }
    
    function validar_json(str) {
        try {
            if (typeof str !== "string") {
            return false;
            } else {
            return (typeof JSON.parse(str) === 'object');
            }
        } catch (e) {
            return false;
        }
    }

    $scope.format_date = function (tipo, date) {
        if (date != undefined && date != null && date != "") {
            if (tipo <= 0) {
            let fecha = date.split("/");
            return new Date(fecha[2], (fecha[1] - 1), fecha[0]);
            } else if (tipo > 0) {
            var dia = date.getDate();
            var mes = date.getMonth() + 1;
            var año = date.getFullYear();
            if (tipo == 1) {
                return ((dia < 10) ? ("0" + dia) : dia) + '/' + ((mes < 10) ? ('0' + mes) : mes) + '/' + año;
            } else if (tipo == 2) {
                return año + '/' + mes + '/' + dia;
            } else if (tipo == 3) {
                var resultado = new Date(año, (mes - 1), (dia - 1));
                dia = resultado.getDate();
                mes = resultado.getMonth() + 1;
                año = resultado.getFullYear();
                return año + '-' + ((mes < 10) ? ('0' + mes) : mes) + '-' + ((dia < 10) ? ("0" + dia) : dia);
            } else if (tipo == 4) {
                return año + '-' + ((mes < 10) ? ('0' + mes) : mes) + '-' + ((dia < 10) ? ("0" + dia) : dia);
            } else if (tipo == 5) {
                return año;
            } else if (tipo == 6) {
                return mes;
            } else if (tipo == 7) {
                return dia;
            }
            }
        } else {
            return "";
        }
    }
    
    function fechaActual() {
        var date = new Date();
        var dia = date.getDate();
        var mes = date.getMonth() + 1;
        var año = date.getFullYear();
        return ((dia < 10) ? ("0" + dia) : dia) + '/' + ((mes < 10) ? ('0' + mes) : mes) + '/' + año;
    }

    // Paginacion
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.q = "";
    $scope.getData = function () {
        return $filter('filter')($scope.asociaciones.listado, $scope.q);
    }
    $scope.numberOfPages = function () {
        return Math.ceil($scope.getData().length / $scope.pageSize);
    }
    $scope.$watch('q', function (newValue, oldValue) {
        if (oldValue != newValue) {
        $scope.currentPage = 0;
        }
    }, true);
    $scope.btns_paginacion = function (value) {
        $scope.currentPage = value;
    }

    $(document).on("wheel", "input[type=number]", function (e) {
        $(this).blur();
    });

    $scope.filter = function () {
        $scope.listDatosTemp = $filter('filter')($scope.asociaciones.listado, $scope.q);
    }

    $scope.listaDepartamentos = function() {
        $http({
            method: 'POST',
            url: "php/siau/asociacionUsuarios/asociacionUsuarios.php",
            data: {
                function: 'p_listar_departamentos'
            }
        }).then(function (response) {
            console.log(response.data);
            $scope.asociaciones.options_departamento = response.data;
        });
    } 
    $scope.listaDepartamentos();

    $scope.listaMunicipios = function(departamento) {
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        });
        $http({
            method: 'POST',
            url: "php/siau/asociacionUsuarios/asociacionUsuarios.php",
            data: {
                function: 'p_listar_municipios',
                departamento: departamento
            }
        }).then(function (response) {
            console.log(response.data);
            $scope.asociaciones.options_municipio = response.data;
            swal.close();
        });
    }

    $scope.consultar_solicitudes = function() {
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        });
        if ($scope.asociaciones.departamento && $scope.asociaciones.municipio) {
            $http({
                method: 'POST',
                url: "php/siau/asociacionUsuarios/asociacionUsuarios.php",
                data: {
                    function: 'lista_solicitudes_afiliacion',
                    departamento: $scope.asociaciones.departamento,
                    municipio: $scope.asociaciones.municipio
                }
            }).then(function (response) {
                console.log(response.data);
                $scope.shw.detalle = true;
                $scope.asociaciones.listado = response.data;
                swal.close();
            });
        }else{
            swal('Información ', 'No pueden existir campos vacíos.', 'error').catch(swal.noop);
            $scope.shw.detalle = false;
        }
    }
    // CNVU
}])
