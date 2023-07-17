
'use strict';
angular.module('GenesisApp', [])
    .config(function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
    .controller('historico_Controller', ['$scope', '$http', '$timeout', '$location',
        function ($scope, $http, $timeout, $location) {
            $(document).ready(function () {
                $scope.Get_Datos();
            });


            $scope.Get_Datos = function () {
                $http({
                    method: 'POST',
                    url: "../../../php/autorizaciones/anticipos/anticipos.php",
                    data: {
                        function: 'Ver_Historico_Anticipo',
                        Numero: $location.search().Numero,
                        TipoDoc: $location.search().TipoDoc,
                        NumeroDoc: $location.search().NumeroDoc

                    }
                }).then(function (response) {
                    document.title = "Histórico de Movimientos Anticipo N°" + $location.search().Numero;
                    $scope.Numero = $location.search().Numero;
                    var f = new Date();
                    var seg = (f.getSeconds() <= 9) ? '0' + f.getSeconds() : f.getSeconds();
                    var min = (f.getMinutes() <= 9) ? '0' + f.getMinutes() : f.getMinutes();
                    var hora = (f.getHours() <= 9) ? '0' + f.getHours() : f.getHours();
                    var dia = (f.getDate() <= 9) ? '0' + f.getDate() : f.getDate();
                    var mes = ((f.getMonth() + 1) <= 9) ? '0' + (f.getMonth() + 1) : (f.getMonth() + 1);
                    $scope.FechayHora = dia + '/' + mes + '/' + f.getFullYear() + '  ' + hora + ':' + min + ':' + seg;
                    $scope.Datos = response.data;
                    setTimeout(() => {
                        $scope.$apply();
                    }, 500);
                    // window.print();

                    setTimeout(() => {
                        window.jsPDF = window.jspdf.jsPDF;
                        window.html2canvas = html2canvas;
                        var doc = new jsPDF();
                            
                        // Source HTMLElement or a string containing HTML.
                        var elementHTML = document.querySelector("#content");
                        
                        doc.html(elementHTML, {
                            callback: function(doc) {
                                // Save the PDF
                                doc.save('sample-document.pdf');
                            },
                            x: 15,
                            y: 15,
                            width: 170, //target width in the PDF document
                            windowWidth: 650 //window width in CSS pixels
                        });

                        // doc.save('Generated.pdf');

                        // var source = $('#content').html();
                        // doc.html(('#content', 5, 5), {
                        //     'width': 75, 'elementHandlers': specialElementHandlers
                        // });
                        // setTimeout(() => {
                        // doc.output("dataurlnewwindow");
                        // }, 1000);
                    }, 3000);
                });
            }


            $scope.Estado_Solicitud_Color = function (Estado) {
                if (Estado.toString().toUpperCase() == 'A') {
                    console.log(Estado)
                    return { "color": "rgb(3, 197, 20) !important;" }
                }
                if (Estado.toString().toUpperCase() == 'P') {
                    return { "color": "rgb(71, 71, 165) !important" }
                }
                if (Estado.toString().toUpperCase() == 'D') {
                    return { "color": "rgb(235, 156, 5) !important;" }
                }
                if (Estado.toString().toUpperCase() == 'X') {
                    return { "color": "rgb(245, 75,75) !important" }
                }
            }

            // document.addEventListener('contextmenu', event => event.preventDefault());
            // const body = document.querySelector('body');

            // body.onkeydown = function (e) {
            //     if (e.keyCode === 17 || e.keyCode === 80) {
            //     } else {
            //         return false;
            //     }
            // }
            // var mediaQueryList = window.matchMedia('print');
            // mediaQueryList.addListener(function (mql) {
            //     if (mql.matches) {
            //         console.log('se hizo antes de imprimir');
            //     } else {
            //         console.log('se hizo despues de imprimir');
            //         setTimeout(function () {
            //             window.close();
            //         }, 10);
            //     }
            // });



        }]);    
