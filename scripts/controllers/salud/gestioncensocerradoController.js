'use strict';
angular.module('GenesisApp').controller('gestioncensocerradoController', ['$scope', 'notification', '$http', '$timeout', '$filter', '$q', function ($scope, notification, $http, $timeout, $filter, $q) {
    $scope.Inicio = function () {
        // Se estaran validadon 18 columnas
        $('.modal').modal();
        if ($(window).width() < 1100) {
            document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100 && $(window).width() < 1300) {
            document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1300 && $(window).width() < 1500) {
            document.querySelector("#pantalla").style.zoom = 0.8;
        }
        if ($(window).width() > 1500) {
            document.querySelector("#pantalla").style.zoom = 0.9;
        }

        $scope.Limpiar();
    }

    $scope.Obtener_Tipos_Documentos = function () {
        $scope.Tipos_Documentos = [];
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

    $scope.Limpiar = function () {
        $scope.formSearch = {
            'Tipo_Doc': '',
            'Num_Doc': '',
        };
        $scope.arrCensoCerrado = [];
        $scope.arrCensoCerradoTemp = [];
    }

    $scope.BuscarCenso = function () {
        if ($scope.formSearch.Tipo_Doc == '' && $scope.formSearch.Num_Doc == '') {
            return swal('Advertencia', 'Debe diligenciar todos los campos', 'warning');
        }
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
            url: "php/censo/censo.php",
            data: { function: 'ConsultaCensoCerrado', tipoDoc: $scope.formSearch.Tipo_Doc, numDoc: $scope.formSearch.Num_Doc }
        }).then(function ({ data }) {
            swal.close();
            $scope.sw = false;
            if (data.length > 0) {
                $scope.ArrCensoCerrado = data;
                $scope.initPaginacion($scope.ArrCensoCerrado);
            }
        });
    }

    $scope.atras = function () {
        $scope.sw = true;
        $scope.Limpiar();
    }

    $scope.initPaginacion = function (info) {
        $scope.arrCensoCerradoTemp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 4;
        $scope.valmaxpag = 4;
        $scope.pages = [];
        $scope.configPages();
    }

    $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
            ini = 1;
            if (Math.ceil($scope.arrCensoCerradoTemp.length / $scope.pageSize) > $scope.valmaxpag)
                fin = 10;
            else
                fin = Math.ceil($scope.arrCensoCerradoTemp.length / $scope.pageSize);
        } else {
            if (ini >= Math.ceil($scope.arrCensoCerradoTemp.length / $scope.pageSize) - $scope.valmaxpag) {
                ini = Math.ceil($scope.arrCensoCerradoTemp.length / $scope.pageSize) - $scope.valmaxpag;
                fin = Math.ceil($scope.arrCensoCerradoTemp.length / $scope.pageSize);
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
        if ($scope.arrCensoCerradoTemp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt($scope.arrCensoCerradoTemp.length / $scope.pageSize);
        } else {
            var tamanomax = parseInt($scope.arrCensoCerradoTemp.length / $scope.pageSize) + 1;
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

    $scope.filter = function (val) {
        $scope.arrCensoCerradoTemp = $filter('filter')($scope.ArrCensoCerrado, val);
        if ($scope.arrCensoCerradoTemp.length > 0) {
            $scope.setPage(1);
        }
        $scope.configPages();
    }

    $scope.actualizaFacturaCensoCerrado = function (x) {
        $scope.valorFactura = '';
        $scope.numeroFactura = '';
        swal({
            title: 'Actualizar Factura',
            html: `
            <div class="col s12 m12 l12 m-b" style="margin-bottom: 1.5rem;">
            <div class="row">
            <div class="col s12 no-padding label-new m-b">
            <input type="text" class="margin border-none input-text-new w-100 m-l" oninput="this.value = this.value.replace(/[^0-9]/g, '');" autocomplete="off" id="numeroFactura" />
          <label>Numero factura</label>  
            </div>
            <div class="col s12 no-padding label-new m-b">
            <input type="text" class="margin border-none input-text-new w-100 m-l" onkeyup="FormatPeso('valorFactura')" autocomplete="off" id="valorFactura" />
          <label>Valor factura</label>  
            </div>
            </div>
          </div>
                  `,

            width: '500px',
            confirmButtonText: 'Actualizar',
            preConfirm: function () {
                return new Promise(function (resolve) {
                    resolve(
                        $scope.valorFactura = $('#numeroFactura').val(),
                        $scope.numeroFactura = $('#valorFactura').val(),
                        // {
                        //     soporte: $('#SporteProce').val(),
                        // }
                    )
                })
            }
        }).then(function (result) {
            if ($scope.valorFactura == '' && $scope.numeroFactura == '') {
                return swal('Advertencia', '¡Por favor ingresar valor y numero de factura!', 'warning');
            }
            $http({
                method: 'POST',
                url: "php/censo/censo.php",
                data: {
                    function: 'ActualizaFacturaCensoCerrado',
                    censo: x.numero_cen,
                    ubi: x.Ubicacion,
                    fact: $scope.numeroFactura,
                    valor: $scope.valorFactura,
                }
                // data: { function: 'ConsultaCensoCerrado', tipoDoc: $scope.formCensoCerrado.tipoDoc, numDoc: $scope.formCensoCerrado.numDoc }
            }).then(function ({ data }) {
                if (data.Codigo == 0) {
                    swal('Notificacíon', '¡Factura Actualizada!', 'success');
                }
            });
            $scope.atras();
        })
    }

    if (document.readyState !== 'loading') {
        $scope.sw = true;
        $scope.Inicio();
    } else {
        document.addEventListener('DOMContentLoaded', function () {
            $scope.Inicio();
        });
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

function FormatPeso(NID) {
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
        input.value = '$ '+valor;
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