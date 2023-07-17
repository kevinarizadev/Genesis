
'use strict';
angular.module('GenesisApp', [])
    .config(function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
    .controller('ControladorIMP', ['$scope', '$http', '$timeout', '$location',
        function ($scope, $http, $timeout, $location) {
            $(document).ready(function () {
                if ($scope.Hoja == 'OREQ') {
                    $scope.Get_Det_Oreq();
                }
                if ($scope.Hoja == 'OORD') {
                    $scope.Get_Det_Oord();
                }
                if ($scope.Hoja == 'ENTREGA') {
                    $scope.Get_Det_Entr();
                }

                if ($scope.Hoja == 'BODEGA') {
                    $scope.Get_Det_Inv_Bodegas();
                }
            });

            $scope.Limpiar_Oreq = function () {
                $scope.Oreq_Numero = 0;
                $scope.Oreq_Fecha = '';
                $scope.Oreq_Ubicacion_Num = '';
                $scope.Oreq_Ubicacion_Nom = '';
                $scope.Oreq_UbicacionUso_Num = '';
                $scope.Oreq_UbicacionUso_Nom = '';
                //Datos
                $scope.Oreq_Solicitante_Ced = '';
                $scope.Oreq_Solicitante_Nom = '';
                $scope.Oreq_FechaReq = '';
                $scope.Oreq_Prioridad = '';
                $scope.Oreq_Proveedor_Num = '';
                $scope.Oreq_Proveedor_Nom = '';
                //Productos
                $scope.Oreq_Subtotal = '';
                $scope.Oreq_Impuesto = '';
                $scope.Oreq_Total = '';
                //Observacion
                $scope.Oreq_Observacion1 = '';
                $scope.Oreq_Observacion2 = '';
                $scope.Oreq_Estado = '';
                //Productos
                $scope.Oreq_Productos = null;
            }
            ////////////////////////////////////////////////
            ////////////////////////////////////////////////
            ////////////////////////////////////////////////
            $scope.Limpiar_Oord = function () {
                $scope.Oord_Ubicacion_Nom = '';
                $scope.Oord_Ubicacion_Dir = '';
                $scope.Oord_Ubicacion_Tel = '';
                $scope.Oord_Numero = 0;
                $scope.Oord_Fecha = '';
                $scope.Oord_Ubicacion_Num = '';
                $scope.Oord_Num_Req = '';
                $scope.Oord_Cotizacion = '';
                //Datos
                $scope.Oord_Proveedor_Cod = '';
                $scope.Oord_Proveedor_Nom = '';
                $scope.Oord_Condicion = '';
                $scope.Oord_Proveedo_Ubi = '';
                //Productos
                $scope.Oord_Bruto = '';
                $scope.Oord_Descuento1 = '';
                $scope.Oord_Subtotal = '';
                $scope.Oord_Descuento_Item = '';
                $scope.Oord_Subtotal1 = '';
                $scope.Oord_Descuento2 = '';
                $scope.Oord_Subtotal2 = '';
                $scope.Oord_Impuesto = '';
                $scope.Oord_Total = '';
                //Observacion
                $scope.Oord_Observacion1 = '';
                //Entrega
                $scope.Oord_Fecha_Min = '';
                $scope.Oord_Fecha_Max = '';
            }


            $scope.Get_Det_Oreq = function () {
                $http({
                    method: 'POST',
                    url: "../../../php/gestiondocumental/adminventario.php",
                    data: {
                        function: 'Obtener_Inf_Oreq',
                        num: $location.search().num,
                        ced: $location.search().ced
                        // num: 881
                    }
                }).then(function (response) {
                    var respuesta = response.data;
                    document.title = "Requerimiento N°" + $location.search().num;
                    $scope.Oreq_Numero = respuesta.NUMERO;
                    $scope.Oreq_Fecha = respuesta.FECHA;
                    $scope.Oreq_Ubicacion_Num = respuesta.UBICACION_COD;
                    $scope.Oreq_Ubicacion_Nom = respuesta.UBICACION;
                    $scope.Oreq_UbicacionUso_Num = respuesta.UBICACION_USO_COD;
                    $scope.Oreq_UbicacionUso_Nom = respuesta.UBICACION_USO_NOM;
                    //Datos
                    $scope.Oreq_Solicitante_Ced = respuesta.SOLICITANTE;
                    $scope.Oreq_Solicitante_Nom = respuesta.SOLICITANTE_NOM;
                    $scope.Oreq_FechaReq = respuesta.FECHA_REQ;
                    $scope.Oreq_Prioridad = respuesta.PRIORIDAD;
                    $scope.Oreq_Proveedor_Num = respuesta.PROVEEDOR_COD;
                    $scope.Oreq_Proveedor_Nom = respuesta.PROVEEDOR_NOM;
                    //Productos
                    $scope.Oreq_Subtotal = '';
                    $scope.Oreq_Impuesto = '';
                    $scope.Oreq_Total = '';
                    //Observacion
                    $scope.Oreq_Observacion1 = respuesta.OBSERVACIONTIT;
                    $scope.Oreq_Observacion2 = respuesta.OBSERVACIONDES;
                    $scope.Oreq_Estado = respuesta.ESTADO;
                    //Productos
                    $scope.Oreq_Productos = respuesta.PRODUCTOS;

                    $scope.Cedula = respuesta.USUARIO;
                    var f = new Date();
                    var mes = ((f.getMonth() + 1) <= 9) ? '0' + (f.getMonth() + 1) : (f.getMonth() + 1);
                    $scope.FechayHora = f.getDate() + '/' + mes + '/' + f.getFullYear() + '  ' + f.getHours() + ':' + f.getMinutes() + ':' + f.getSeconds();
                    $scope.$apply();
                    window.print();
                });
            }

            $scope.Get_Det_Oord = function () {
                $http({
                    method: 'POST',
                    url: "../../../php/gestiondocumental/adminventario.php",
                    data: {
                        function: 'Obtener_Inf_Oord',
                        num: $location.search().num,
                        ced: $location.search().ced
                    }
                }).then(function (response) {
                    document.title = "Orden de Compra N°" + $location.search().num;
                    var respuesta = response.data;
                    $scope.Oord_Numero = respuesta.NUMERO;
                    $scope.Oord_Fecha = respuesta.FECHA;
                    $scope.Oord_Num_Req = respuesta.NUM_REQ;
                    $scope.Oord_Cotizacion = respuesta.COTIZACION;
                    $scope.Oord_Ubicacion_Nom = respuesta.UBICACION;
                    $scope.Oord_Ubicacion_Num = respuesta.UBICACION_COD;
                    var xCod = respuesta.UBICACION_COD;
                    if (xCod.length < 5) {
                        if (xCod.substr(0, 1) == '1') {
                            $scope.Oord_Ubicacion_Dir = 'CL 44 No. 46 - 16'; $scope.Oord_Ubicacion_Tel = '3188217638';
                        }
                        if (xCod.substr(0, 1) == '8') {
                            $scope.Oord_Ubicacion_Dir = 'CL 44 No. 46 - 56'; $scope.Oord_Ubicacion_Tel = '3154277401';
                        }
                    }
                    if (xCod.length > 4) {
                        if (xCod.substr(0, 2) == '13') {//MAGA-BOL
                            $scope.Oord_Ubicacion_Dir = 'CL 15 A No. 8 - 42'; $scope.Oord_Ubicacion_Tel = '3183545906';
                        }
                        if (xCod.substr(0, 2) == '20') {//VALL-CES
                            $scope.Oord_Ubicacion_Dir = 'KR 19 No. 11 - 23  URB LIBERTADORES 3 ETAPA'; $scope.Oord_Ubicacion_Tel = '3174274429';
                        }
                        if (xCod.substr(0, 2) == '23') {//MONT-COR
                            $scope.Oord_Ubicacion_Dir = 'KR 7 No. 25 - 09  BARRIO CHUCHURUBI'; $scope.Oord_Ubicacion_Tel = '3158540422';
                        }
                        if (xCod.substr(0, 2) == '44') {//RIOH-GUA
                            $scope.Oord_Ubicacion_Dir = 'KR 15 No. 10 - 17'; $scope.Oord_Ubicacion_Tel = '3176392298';
                        }
                        if (xCod.substr(0, 2) == '47') {//SANT-MAG
                            $scope.Oord_Ubicacion_Dir = 'CALLE 23 No. 13A - 05'; $scope.Oord_Ubicacion_Tel = '3176440153';
                        }
                        if (xCod.substr(0, 2) == '50') {//VILL-MET
                            $scope.Oord_Ubicacion_Dir = 'KR 41 No. 33 B 25  /27 BARRIO BARZAL ALTO'; $scope.Oord_Ubicacion_Tel = '3173690929';
                        }
                        if (xCod.substr(0, 2) == '70') {//SINC-SUC
                            $scope.Oord_Ubicacion_Dir = 'KR 19 B No. 16 - 42  BARRIO  FORD'; $scope.Oord_Ubicacion_Tel = '3183545921';
                        }

                        // console.log(yCod);
                    }
                    // $scope.Oord_Ubicacion_Dir = 'CALLE 44 N 46 - 32';
                    // $scope.Oord_Ubicacion_Tel = '3185930';
                    //Datos
                    $scope.Oord_Proveedor_Cod = respuesta.PROVEEDOR;
                    $scope.Oord_Proveedor_Nom = respuesta.PROVEEDOR_NOM;
                    $scope.Oord_Proveedor_Dir = respuesta.PROVEEDOR_DIR;
                    $scope.Oord_Proveedor_Ubi = respuesta.PROVEEDOR_UBI;
                    $scope.Oord_Proveedor_Tel = respuesta.PROVEEDOR_TEL;
                    $scope.Oord_Proveedor_Fax = respuesta.PROVEEDOR_FAX;
                    $scope.Oord_Condicion = respuesta.CONDICION_PAGO;
                    //Productos
                    $scope.Oord_Cantidad = respuesta.CANTIDAD;
                    $scope.Oord_Bruto = respuesta.BRUTO;
                    $scope.Oord_Descuento_Num = respuesta.DESCUENTO1_NUM;
                    $scope.Oord_Descuento_Val = respuesta.DESCUENTO1_TOTAL;
                    $scope.Oord_Subtotal = respuesta.SUBTOTAL;
                    $scope.Oord_Descuento_Item = respuesta.DESCUENTO_ITEM;
                    $scope.Oord_Subtotal1 = respuesta.SUBTOTAL1;
                    $scope.Oord_Descuento2_Num = respuesta.DESCUENTO2_NUM;
                    $scope.Oord_Descuento2_Val = respuesta.DESCUENTO2_TOTAL;
                    $scope.Oord_Subtotal2 = respuesta.SUBTOTAL2;
                    $scope.Oord_Impuesto = respuesta.IMPUESTO;
                    $scope.Oord_Total = respuesta.TOTAL;
                    //Observacion
                    $scope.Oord_Observacion1 = respuesta.OBSERVACIONDES;
                    //Entrega
                    $scope.Oord_Fecha_Min = respuesta.FECHA_MIN;
                    $scope.Oord_Fecha_Max = respuesta.FECHA_MAX;
                    $scope.Oord_Productos = respuesta.PRODUCTOS;
                    $scope.Oord_Estado = respuesta.ESTADO;

                    $scope.Cedula = respuesta.USUARIO;
                    var f = new Date();
                    var mes = ((f.getMonth() + 1) <= 9) ? '0' + (f.getMonth() + 1) : (f.getMonth() + 1);
                    $scope.FechayHora = f.getDate() + '/' + mes + '/' + f.getFullYear() + '  ' + f.getHours() + ':' + f.getMinutes() + ':' + f.getSeconds();
                    $scope.$apply();
                    window.print();

                });
            }
            // $scope.Get_Det_Oord();

            $scope.Get_Det_Entr = function () {
                $http({
                    method: 'POST',
                    url: "../../../php/gestiondocumental/adminventario.php",
                    data: {
                        function: 'Obtener_Inf_Entrega',
                        acas: $location.search().acas
                    }
                }).then(function (response) {
                    document.title = "Acta de Entrega N°" + $location.search().acas;
                    $scope.Mesadeayuda = $location.search().acas;
                    var f = new Date();
                    var seg = (f.getSeconds() <= 9) ? '0' + f.getSeconds() : f.getSeconds();
                    var min = (f.getMinutes() <= 9) ? '0' + f.getMinutes() : f.getMinutes();
                    var hora = (f.getHours() <= 9) ? '0' + f.getHours() : f.getHours();
                    var dia = (f.getDate() <= 9) ? '0' + f.getDate() : f.getDate();
                    var mes = ((f.getMonth() + 1) <= 9) ? '0' + (f.getMonth() + 1) : (f.getMonth()+1);

                    $scope.FechayHora = dia + '/' + mes + '/' + f.getFullYear() + '  ' + hora + ':' + min + ':' + seg;
                    // alert($scope.FechayHora),

                    $scope.Nombre_ent = response.data.NOMBRE_ENT;
                    $scope.Cargo_ent = response.data.CARGO_ENT;
                    $scope.Nombre_sol = response.data.NOMBRE_SOL;
                    $scope.Cargo_sol = response.data.CARGO_SOL;
                    $scope.Ubi_sol = response.data.UBI_SOL;
                    $scope.Productos = response.data.PRODUCTOS;
                    // console.log($scope.Productos);
                    $scope.$apply();
                    window.print();

                });
            }


            $scope.Get_Det_Inv_Bodegas = function () {
                $http({
                    method: 'POST',
                    url: "../../../php/gestiondocumental/adminventario.php",
                    data: {
                        function: 'Obtener_Inf_Inventario_Actual',
                        seccional: $location.search().seccional,
                        concepto: $location.search().concepto

                    }
                }).then(function (response) {
                    var f = new Date();
                    var seg = (f.getSeconds() <= 9) ? '0' + f.getSeconds() : f.getSeconds();
                    var min = (f.getMinutes() <= 9) ? '0' + f.getMinutes() : f.getMinutes();
                    var hora = (f.getHours() <= 9) ? '0' + f.getHours() : f.getHours();
                    var dia = (f.getDate() <= 9) ? '0' + f.getDate() : f.getDate();
                    var mes = ((f.getMonth() + 1) <= 9) ? '0' + (f.getMonth() + 1) : (f.getMonth() + 1);
                    $scope.FechayHora = dia + '/' + mes + '/' + f.getFullYear() + '  ' + hora + ':' + min + ':' + seg;
                    $scope.Productos = response.data;
                    $scope.$apply();
                    window.print();
                });
            }

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


            document.addEventListener('contextmenu', event => event.preventDefault());
            const body = document.querySelector('body');

            body.onkeydown = function (e) {
                if (e.keyCode === 17 || e.keyCode === 80) {
                } else {
                    return false;
                }
            }
            var mediaQueryList = window.matchMedia('print');
            mediaQueryList.addListener(function (mql) {
                if (mql.matches) {
                    console.log('se hizo antes de imprimir');
                } else {
                    console.log('se hizo despues de imprimir');
                    setTimeout(function () {
                        window.close();
                    }, 10);
                }
            });



        }]);    
