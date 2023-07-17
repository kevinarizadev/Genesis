'use strict';
angular.module('GenesisApp')
    .controller('consultacostoautController', ['$scope', '$http', function ($scope, $http) {

        $(document).ready(function () {
            $('#modaldinero').modal();
            $('#modalreporte').modal();
        });
        var date = new Date();
        $scope.seleccionAnt = "";
        $scope.annot = '';
        $scope.periodo = '';
        $scope.techos = null;
        $scope.dtecho = null;
        $scope.annotemp = '';
        $scope.periodotemp = '';
        $scope.viewDetail = true;
        $scope.check_option_2 = true;
        $scope.plata = null;
        $scope.admin_opcion = false;
        $scope.hidenacciones = false;
        $scope.accesoregional = sessionStorage.getItem('municipio');

        
    
    // if ($scope.seleccionAnt != 0) document.getElementById($scope.seleccionAnt).style.color = "black";

        if ($scope.accesoregional != '1') {
            $scope.verregional = true;
        } else {
            $scope.verregional = false;
        }

        $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
            data: { function: 'p_validar_permisos', rol: sessionStorage.getItem('rolcod'), opcion: '2' }
        }).then(function (response) {
            console.log(response);
            if (response.data.PERMISO == "S") {
                $scope.hidenacciones = false;
            } else {
                $scope.hidenacciones = true;
            }
        })
        $http({
            method: 'POST',
            url: "php/financiera/pagosips.php",
            data: { function: "obteneranno" }
        }).then(function (response) {
            $scope.anos = response.data;
            $scope.annot = date.getFullYear();
            $scope.annotemp = date.getFullYear();
        })
        $http({
            method: 'GET',
            url: "json/meses.json"
        }).then(function (response) {
            $scope.meses = response.data;

            $scope.periodo = date.getMonth() + 1;
            $scope.periodotemp = date.getMonth() + 1;
        })

        $scope.getTecho = function () {
            if ($scope.annot && $scope.periodo) {
                var fechaprimerdia = new Date($scope.annot, $scope.periodo - 1, 1);
                var fechaactual = new Date($scope.annot, $scope.periodo, 0);
                $scope.fechaprimerdiames = formatDate(fechaprimerdia);
                if (date.getMonth() + 1 == $scope.periodo) {
                    $scope.fechaactual = formatDate(new Date());
                } else {
                    $scope.fechaactual = formatDate(fechaactual);
                }

                $http({
                    method: 'POST',
                    url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                    data: { function: "obtener_techo_consulta", anno: $scope.annot + "", periodo: $scope.periodo }
                }).then(function (response) {
                    if (response.data && response.data.toString().substr(0, 3) != '<br') {
                        $scope.techos = response.data;
                        $scope.xtechos_original = JSON.parse(JSON.stringify(response.data));
                        for (var i = 0; i < $scope.techos.length; i++) {
                            if ($scope.techos[i].tipo_cod == '5' || $scope.techos[i].tipo_cod == '6') {
                                $scope.techos[i].valor_techo_ini_ori = 0;
                                $scope.techos[i].valor_techo_ori = 0;
                                $scope.techos[i].valor_autorizado_ori = 0;
                                $scope.techos[i].disponible_ori = 0;
                            }
                        }

                    } else {
                        swal({
                            title: "¡Ocurrio un error!",
                            text: response.data,
                            type: "warning"
                        }).catch(swal.noop);
                    }
                })
            }

        }

        // setTimeout(() => {
        //     $scope.getTecho();

        // }, 500);    
        $scope.getToatal = function () {
            var sumtemp = 0;
            $scope.techos.forEach(element => {
                sumtemp = sumtemp + element.porcentaje;


            });
            return sumtemp / 10;
        }
        $scope.closemodal = function () {
            $("#modaldinero").modal("close");
        }

        $scope.temptecho = null;
        $scope.tempaccion = null;
        $scope.incTecho = function (v_techo, v_accion) {
            if (($scope.periodo >= $scope.periodotemp) && ($scope.annotemp == $scope.annot)) {
                // if (($scope.periodo <= $scope.periodotemp) && ($scope.annotemp <= $scope.annot)) {
                $scope.temptecho = v_techo;
                $scope.tempaccion = v_accion;
                $("#modaldinero").modal("open");
            } else {
                swal('Oops...', 'No puedes modificar el techo de un periodo o año transcurrido!', 'info');
            }
        }

        $scope.seleccionarreporte = function (v_techo) {
            $scope.datosregional = v_techo;
            console.log($scope.datosregional);
            $("#modalreporte").modal("open");

        }
        $scope.closemodalreporte = function () {
            $("#modalreporte").modal("close");
        }
        $scope.Descargar_Reporte = function () {
            if ($scope.fechainicialr != '' || $scope.fechainicialr != null || $scope.fechainicialr != undefined ||
                $scope.fechafinalr != '' || $scope.fechafinalr != null || $scope.fechafinalr != undefined) {
                $scope.datosregional
                $scope.fechainicialr
                $scope.fechafinalr
                window.open('views/autorizaciones/reporte_consulta_costo_aut.php?fecha_inicio=' + formatDatereporte($scope.fechainicialr) + '&fecha_fin=' + formatDatereporte($scope.fechafinalr) + '&seccional=' + $scope.datosregional.seccional_cod + '&tipo=' + $scope.datosregional.tipo_cod + '&nombrereporte=' + $scope.datosregional.tipo_nom, '_blank', "width=900,height=1100");
            } else {
                swal('Oops...', 'Debe seleccionar una fecha inicio y una fecha final!', 'info');
            }
        }

        $scope.saveadicion = function () {
            console.log($scope.plata);

            swal({
                title: 'Confirmar',
                text: "Esta seguro que deseas modificar el monto",
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result) {
                    $http({
                        method: 'POST',
                        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                        data: {
                            function: "actualizar_techo_consulta",
                            seccional: $scope.temptecho.seccional_cod,
                            tipo: $scope.temptecho.tipo_cod,
                            anno: $scope.temptecho.anno,
                            valor: $scope.plata.replace(/\./g, ''),
                            periodo: $scope.temptecho.periodo,
                            accion: $scope.tempaccion,
                            opcion: $scope.admin_opcion == false ? 'A' : 'D'
                        }
                    }).then(function (response) {
                        swal(response.data.error == '0' ? 'Completado' : 'No completado', response.data.nombre, response.data.error == '0' ? 'success' : 'error')
                        response.data.error == '0' ? $scope.getTecho() : '';
                        $scope.admin_opcion = false;
                        $("#modaldinero").modal("close");
                    })
                }
            })

        }
        $scope.formatPeso = function (NID) {
            console.log(NID);
            const input = document.getElementById('' + NID + '');
            var valor = input.value;
            valor = valor.replace(/\-/g, '');
            valor = valor.replace(/[a-zA-Z]/g, '');
            valor = valor.replace(/[^0-9-,]/g, '');
            valor = valor.replace(/\./g, '');
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

        $scope.showDetail = function (techo) {
            if (techo != undefined) {
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                    data: { function: "obtener_detalle_techo", seccional: techo.seccional_cod,tipo: techo.tipo_cod, anno: techo.anno, periodo: techo.periodo }
                }).then(function (response) {
                    $scope.dtecho = response.data;
                    $scope.viewDetail = !$scope.viewDetail;


                })
            } else {
                if ($scope.viewDetail == false) {
                    $scope.getTecho();
                    $scope.viewDetail = !$scope.viewDetail;
                }
            }

        }

        $scope.getTotalAdicion = function () {
            var total = 0;
            $scope.dtecho.forEach(element => {
                if (element.accion == 'ADICION') {
                    total += (element.valor_sf);
                }
                if (element.accion == 'DISMINUCION') {
                    total -= (element.valor_sf);
                }
            });
            console.log(total);
            function currencyFormat(num) {
                return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
            }
            console.log(currencyFormat(total));
            return currencyFormat(total);

        }
        function formatDatereporte(date) {
            var dd = ('0' + date.getDate()).slice(-2);
            var mm = ('0' + (date.getMonth() + 1)).slice(-2);
            var yyyy = date.getFullYear();
            var hh = date.getHours();
            var mi = date.getMinutes();
            return dd + '/' + mm + '/' + yyyy; //+' '+hh+':'+mi+':00';
        }
        function formatDate(date) {
            var dd = ('0' + date.getDate()).slice(-2);
            var mm = ('0' + (date.getMonth() + 1)).slice(-2);
            var yyyy = date.getFullYear();
            var hh = date.getHours();
            var mi = date.getMinutes();
            return yyyy + '-' + mm + '-' + dd; //+' '+hh+':'+mi+':00';
        }

        $scope.getFieldClass = function (params) {
            if (params.accion == 'ADICION' && params.opcion == 'DIRECTO') {
                return 'green-text';
            }

            if (params.accion == 'ADICION' && params.opcion == 'CONTROLADO') {
                return 'orange-text';
            }

            if (params.accion == 'DISMINUCION' && params.opcion == 'DIRECTO') {
                return 'purple-text';
            }
            if (params.accion == 'DISMINUCION' && params.opcion == 'CONTROLADO') {
                return 'blue-text';
            }
        }
        $scope.funcioncolor = function(x){
            document.getElementById(x).classList.replace("grey","default-background");
            if ($scope.seleccionAnt != 0) document.getElementById($scope.seleccionAnt).classList.replace("default-background","grey");
            $scope.seleccionAnt = x;
        }
        $scope.$watch("filtroipslistado1.seccional_nom", function (newValue, oldValue) {

            if ($scope.filtrolistadotipo && $scope.filtrolistadotipo.tipo_nom != '') {
                $scope.filtrolistadotipo.tipo_nom = ''
            }
            if (newValue == 'NACIONAL' || newValue == 'MIPRES') {
                $scope.techos = []
                setTimeout(() => {
                    console.table($scope.xtechos_original)
                    $scope.techos = JSON.parse(JSON.stringify($scope.xtechos_original))
                    console.table($scope.techos)
                    $scope.$apply()
                }, 500);
            } else if ($scope.techos) {
                for (var i = 0; i < $scope.techos.length; i++) {
                    if ($scope.techos[i].tipo_cod == '5' || $scope.techos[i].tipo_cod == '6') {
                        $scope.techos[i].valor_techo_ini_ori = 0;
                        $scope.techos[i].valor_techo_ori = 0;
                        $scope.techos[i].valor_autorizado_ori = 0;
                        $scope.techos[i].disponible_ori = 0;
                    }
                }
            }
        });

     

    }])

    .filter('total', function () {
        return function (input, property) {
            function currencyFormat(num) {
                return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
            }
            var i = input.length;
            var total = 0;
            while (i--)
                total += input[i][property];
            return currencyFormat(total);
        }
    })
    .filter('suma', function () {
        return function (collection, column) {
          var total = 0;
  
          collection.forEach(function (item) {
            total += (item[column]);
          });
  
          return total;
        };
      });

