
'use strict';
angular.module('GenesisApp', [])
    .config(function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
    .controller('formato_certificado_retencionController', ['$scope', '$http', '$location',
        function ($scope, $http, $location) {
            $(document).ready(function () {
                var f = new Date();
                var mes = ((f.getMonth() + 1) <= 9) ? '0' + (f.getMonth() + 1) : (f.getMonth() + 1);
                $scope.FechayHora = f.getDate() + '/' + mes + '/' + f.getFullYear();
            });
            ////////////////////////////////////////////////
            ////////////////////////////////////////////////
            ////////////////////////////////////////////////
            $scope.obtenerDatos = function () {

                $scope.empresa = $location.search().empresa;

                $scope.list_RetICA = [];
                $scope.list_RetIVA = [];
                $scope.list_RetRenta = [];

                $scope.total_BaseICA = 0;
                $scope.total_BaseIVA = 0;
                $scope.total_BaseRenta = 0;

                $scope.total_RetICA = 0;
                $scope.total_RetIVA = 0;
                $scope.total_RetRenta = 0;

                $http({
                    method: 'POST',
                    url: "../../../php/financiera/formatos/formato_certificado_retencion.php",
                    data: {
                        function: $location.search().empresa == '890102044' ? 'p_obtener_datos_cert_retencion_caja' : 'p_obtener_datos_cert_retencion_eps',
                        empresa: $location.search().empresa,
                        anno: $location.search().anno,
                        proveedor: $location.search().proveedor
                    }
                }).then(function ({ data }) {
                    if (data.length == 0) {
                        swal('Mensaje', 'No se encontraron resultados', 'info');
                        /*setTimeout(function () {
                            window.close();
                        }, 3000);*/
                        return
                    }
                    if (data.length) {
                        console.log(data)
                        // $scope.empresa = 890102044;
                        // $scope.empresa = '901543211';
                        $scope.anno = $location.search().anno;

                        $scope.proveedor = $location.search().proveedor;
                        $scope.proveedorNombre = data[0].TERC_NOMBRE;
                        $scope.proveedorDireccion = data[0].TERC_DIRECCION;
                        $scope.proveedorTelefono = data[0].TERC_TELEFONO;

                        data.forEach(e => {
                            e.CUEP_RETENCION = parseFloat(e.CUEP_RETENCION.toString().replace(/\,/g, '.'));
                            e.SALDO_BASE = parseFloat(e.SALDO_BASE.toString().replace(/\,/g, '.'));
                            e.SALDO = parseFloat(e.SALDO.toString().replace(/\,/g, '.'));

                            if (e.CUEC_RETENCION == 'C') {//ICA
                                $scope.list_RetICA.push(e);
                                $scope.total_BaseICA += e.SALDO_BASE;
                                $scope.total_RetICA += e.SALDO;
                            }
                            if (e.CUEC_RETENCION == 'I') {//IVA
                                $scope.list_RetIVA.push(e);
                                $scope.total_BaseIVA += e.SALDO_BASE;
                                $scope.total_RetIVA += e.SALDO;
                            }
                            if (e.CUEC_RETENCION == 'R') {//RENTA
                                $scope.list_RetRenta.push(e);
                                $scope.total_BaseRenta += e.SALDO_BASE;
                                $scope.total_RetRenta += e.SALDO;
                            }

                        });

                        $scope.retUbicacion = data[0].EMPC_CIUDAD;
                        $scope.retConsignada = $scope.total_RetICA + $scope.total_RetIVA + $scope.total_RetRenta

                        setTimeout(() => { $scope.$apply(); }, 500);
                        setTimeout(() => {
                            window.print();
                        }, 1500);
                    }
                });
            }
            $scope.obtenerDatos();


            $scope.formatPeso2 = function (num) {
                if (num != undefined) {
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
                }
            }


            /*document.addEventListener('contextmenu', event => event.preventDefault());
            const body = document.querySelector('body');

            body.onkeydown = function (e) {
                if (e.keyCode === 17 || e.keyCode === 80) {
                } else {
                    return false;
                }
            }*/
            /*var mediaQueryList = window.matchMedia('print');
            mediaQueryList.addListener(function (mql) {
                if (mql.matches) {
                    console.log('se hizo antes de imprimir');
                } else {
                    console.log('se hizo despues de imprimir');
                    setTimeout(function () {
                        window.close();
                    }, 10);
                }
            });*/



        }]);    
