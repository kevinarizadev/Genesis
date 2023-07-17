'use strict';
angular.module('GenesisApp')
    .controller('prestadorescapitaController', ['$scope', '$http', '$filter',
        function ($scope, $http, $filter) {
            $(document).ready(function () {
                $("#modalhistorico").modal();

            });

            $scope.listitems;
            $scope.listhistorico = [
                { responsable: "Test 1", fecha: "23/07/2021", estado: "Descargado" },
                { responsable: "Test 2", fecha: "22/07/2021", estado: "Descargado" }
            ]

            $scope.showlist = true;
            $scope.getItems = function () {
                $http({
                    method: 'POST',
                    url: "php/capita/funccapita.php",
                    data: { function: 'p_resumen_capita_ips', nit: '900141404', v_pperiodo: $scope.selectedperiodo }
                }).then(function (response) {
                    $scope.listitems = response.data;
                    $scope.showlist = false;
                    if ($scope.tableitems != undefined) {
                        $scope.tableitems.destroy();
                    }
                    setTimeout(function () {
                        $scope.tableitems = $('#tableITEMS').DataTable({
                            dom: 'Bfrtip',
                            buttons: [
                            ],
                            language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
                            lengthMenu: [[10, 20, -1], [10, 20, 'Todas']],
                            order: [[0, "asc"]],
                            responsive: false

                        });
                        $scope.tableitems.draw();

                        document.getElementById('tableITEMS').scrollIntoView({ block: 'start', behavior: 'smooth' });
                        swal.close();
                    }, 100);
                })


            }
            $scope.listPeriodos = [];
            $scope.getPeriodos = function () {
                $http({
                    method: 'POST',
                    url: "php/capita/funccapita.php",
                    data: {
                        function: 'p_obtener_periodo'
                    }
                }).then(function (response) {
                    console.log(response.data);
                    $scope.listPeriodos = response.data;
                })
            }

            $scope.getPeriodos();
            // $scope.getItems();


            $scope.filtroPeriodo = function (params) {
                console.log(params);

                $scope.getItems();
            }
            $scope.openmodals = function (tipo, param) {
                switch (tipo) {

                    case 'modalhistorico':
                        $http({
                            method: 'POST',
                            url: "php/capita/funccapita.php",
                            data: {
                                function: 'p_visualiza_historico',
                                nit: param.PRESTADOR,
                                contrato: param.CONTRATO,
                                ubicacion: param.UBICACION_CONTRATO,
                                periodo: param.PERIODO,
                                regimen: param.REGIMEN

                            }
                        }).then(function (response) {
                            console.log(response.data);
                            $scope.listhistorico = response.data;
                        })
                        $("#modalhistorico").modal("open");
                        break;
                    default:
                }
            }




            $scope.closemodals = function (tipo) {
                switch (tipo) {
                    case 'modalhistorico':
                        $("#modalhistorico").modal("close");
                        break;
                    default:
                }
            }


            $scope.detallecapita = [];
            $scope.downloadCapita = function (param) {


                $http({
                    method: 'POST',
                    url: "php/capita/funccapita.php",
                    data: {
                        function: 'p_valida_descarga',
                        nit: param.PRESTADOR,
                        contrato: param.CONTRATO,
                        ubicacion: param.UBICACION_CONTRATO,
                        periodo: param.PERIODO,
                        regimen: param.REGIMEN,

                    }
                }).then(function (response) {
                    console.log(response.data);

                    if (response.data.codigo == "0") {

                        swal({
                            title: 'Confirmar',
                            text: response.data.mensaje + " ¿Desea continuar con la descarga?",
                            type: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Si',
                            cancelButtonText: 'No'
                        }).then(function () {

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
                                url: "php/capita/funccapita.php",
                                data: {
                                    function: 'p_descarga_consolidado_ips',
                                    nit: param.PRESTADOR,
                                    contrato: param.CONTRATO,
                                    ubicacion: param.UBICACION_CONTRATO,
                                    periodo: param.PERIODO,
                                    regimen: param.REGIMEN,
                                    usuario: sessionStorage.getItem('cedula')

                                }
                            }).then(function (response) {
                                swal.close();
                                $scope.getItems();
                                var namefile = param.PRESTADOR + "-" + param.CONTRATO + "-" + param.PERIODO
                                $scope.detallecapita = response.data.datos;
                                $scope.JSONToCSVConvertor(namefile, namefile);
                            })
                        })

                    } else {
                        swal('Info', response.data.mensaje, 'info').catch(swal.noop);
                    }
                })

            }


            $scope.JSONToCSVConvertor = function (ReportTitle, ShowLabel) {

                var json = $scope.detallecapita;
                var tempjson = [];
                tempjson = $scope.detallecapita
                // for (let index = 0; index < json.length; index++) {
                //   const element = json[index];
                //   for (let index = 0; index < element.DETALLES.length; index++) {
                //     const detalle = element.DETALLES[index];
                //     tempjson.push({
                //       NUMERO: element.AUT_MANUAL,
                //       MIPRES: element.MIPRES,
                //       TIPO_DOCUMENTO: element.TIPO_DOC,
                //       DOCUMENTO: element.DOCUMENTO,
                //       NOMBRE_AFILIADO: element.NOMBRE_AFI,            
                //       SERVICIO: element.SERVICIO,
                //       RENGLON: detalle.renglon,
                //       CODIGO_PRODUCTO: detalle.cod_producto,
                //       NOMBRE_PRODUCTO: detalle.nombre_producto,
                //       CANTIDAD: detalle.cantidad,            
                //       OBSERVACION: element.OBSERVACION
                //     });
                //   }

                // }               
                tempjson = JSON.stringify(tempjson);
                //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
                var arrData = typeof tempjson != 'object' ? JSON.parse(tempjson) : tempjson;

                var CSV = '';

                //This condition will generate the Label/Header
                if (ShowLabel) {
                    var row = "";

                    //This loop will extract the label from 1st index of on array
                    for (var index in arrData[0]) {

                        //Now convert each value to string and comma-seprated
                        row += index + ',';
                    }

                    row = row.slice(0, -1);

                    //append Label row with line break
                    CSV += row + '\r\n';
                }

                //1st loop is to extract each row
                for (var i = 0; i < arrData.length; i++) {
                    var row = "";

                    //2nd loop will extract each column and convert it in string comma-seprated
                    for (var index in arrData[i]) {
                        row += '"' + arrData[i][index] + '",';
                    }

                    row.slice(0, row.length - 1);

                    //add a line break after each row
                    CSV += row + '\r\n';
                }

                if (CSV == '') {
                    alert("Invalid data");
                    return;
                }

                //Generate a file name
                var fileName = "";
                //this will remove the blank-spaces from the title and replace it with an underscore
                fileName += ReportTitle.replace(/ /g, "_");

                //Initialize file format you want csv or xls
                var uri = 'data:text/plain;charset=utf-8,' + escape(CSV);

                // Now the little tricky part.
                // you can use either>> window.open(uri);
                // but this will not work in some browsers
                // or you will not get the correct file extension    

                //this trick will generate a temp <a /> tag
                var link = document.createElement("a");
                link.href = uri;

                //set the visibility hidden so it will not effect on your web-layout
                link.style = "visibility:hidden";
                link.download = fileName + ".txt";

                //this part will append the anchor tag and remove it after automatic click
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }


            $scope.printformato = function (param) {
                console.log(param);
                window.open('views/capita/formato.html');

            }
        }])