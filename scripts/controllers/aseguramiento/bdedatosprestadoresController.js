'use strict';
angular.module('GenesisApp')
    .controller('bdedatosprestadoresController', ['$scope', '$http', '$filter',
        function ($scope, $http, $filter) {

            $scope.listitems;


            $scope.getItems = function () {
                $http({
                    method: 'POST',
                    url: "php/aseguramiento/capita.php",
                    data: { function: 'p_resumen_capita_ips', nit: '900555555' }
                }).then(function (response) {                    
                    $scope.listitems = response.data;
                    setTimeout(function () {
                        $scope.tableitems = $('#tableITEMS').DataTable({
                            dom: 'Bfrtip',
                            buttons: [
                                'copy', 'csv', 'excel'
                            ],
                            language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
                            lengthMenu: [[20, 50, -1], [20, 50, 'Todas']],
                            order: [[0, "asc"]],
                            responsive: false

                        });
                        $scope.tableitems.draw();

                        document.getElementById('tableITEMS').scrollIntoView({ block: 'start', behavior: 'smooth' });
                        swal.close();
                    }, 100);
                })


            }

            $scope.getItems();

            $scope.detallecapita = [];
            $scope.downloadCapita = function (param) {                
                $http({
                    method: 'POST',
                    url: "php/aseguramiento/capita.php",
                    data: {
                        function: 'p_descarga_consolidado_ips', nit: param.CNTV_TERCERO,
                        contrato: param.CONTRATO, periodo: param.PERIODO
                    }
                }).then(function (response) {
                    var namefile = param.CNTV_TERCERO + "-" + param.CONTRATO + "-" + param.PERIODO  
                    $scope.detallecapita = response.data;
                    $scope.JSONToCSVConvertor(namefile, namefile);
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
                var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

                // Now the little tricky part.
                // you can use either>> window.open(uri);
                // but this will not work in some browsers
                // or you will not get the correct file extension    

                //this trick will generate a temp <a /> tag
                var link = document.createElement("a");
                link.href = uri;

                //set the visibility hidden so it will not effect on your web-layout
                link.style = "visibility:hidden";
                link.download = fileName + ".csv";

                //this part will append the anchor tag and remove it after automatic click
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }])