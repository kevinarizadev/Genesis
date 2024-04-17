'use strict';
angular.module('GenesisApp')
    .controller('gestionpqrController', ['$scope', '$timeout', 'pqrHttp', 'ngDialog', '$filter', function ($scope, $timeout, pqrHttp, ngDialog, $filter) {


        $(document).ready(function () {
            $('#modaldetallepqr').modal();
        
        });


        $scope.listpqrs = [];
        $scope.check_estado_pqr = false;
        $scope.datapqrips = {
            finicio: null,
            ffin: null
        }

        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth() + 1; //hoy es 0!
        var yyyy = hoy.getFullYear();


        console.log(hoy);

        if (dd < 10) {
            dd = '0' + dd
        }



        if (mm < 10) {
            mm = '0' + mm
        }



        $scope.maxDate = yyyy + '-' + mm + '-' + dd;
        $scope.getPqrIPS = function () {
            pqrHttp.getPqrIPS('A', sessionStorage.getItem('usuario')).then(function (response) {

                console.log(response);
                $scope.listpqrs = response;
                setTimeout(function () {
                    $scope.tablepqrs = $('#tablePQRIPS').DataTable({
                        dom: 'Bfrtip',
                        buttons: [
                            'copy', 'csv', 'excel'
                        ],
                        language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
                        lengthMenu: [[20, 50, -1], [20, 50, 'Todas']],
                        order: [[0, "asc"]],
                        responsive: false

                    });
                    $scope.tablepqrs.draw();

                    document.getElementById('tablePQRIPS').scrollIntoView({ block: 'start', behavior: 'smooth' });
                    swal.close();
                }, 100);
            });
        }

        $scope.getPqrIPS();

        $scope.showModalGestionar = function (pqr) {//Abre el modal Gestionar                       
            $scope.dataPqr = pqr;
            ngDialog.open({
                template: 'views/siau/admonpqrs/modalProcesSalud.html',
                className: 'ngdialog-theme-plain',
                controller: 'modalProcesSalud',
                height: '90%',
                showClose: false,
                scope: $scope
            }).closePromise.then(function (data) {
                console.log(data.value);
                if (data.value != '$closeButton' && data.value != '$escape' && data.value != '$document' && data.value != undefined) {
                    $scope.getPqrIPS();
                }
            });



        }//Fin

    
    function parsedia(date) {
        var yyyy = date.getFullYear();
        var dd = ('0' + date.getDate()).slice(-2);
        var mm = ('0' + (date.getMonth() + 1)).slice(-2);
        return dd + '/' + mm + '/' + yyyy;//+' '+hh+':'+mi+':00';
    }
        $scope.getPqrIPSAVANZADO = function () {    
            
        if ($scope.tablepqrsp != undefined) {
            $scope.tablepqrsp.destroy();
            $scope.tablepqrsp = undefined;
          }        
            pqrHttp.get_pqr_ips_avanzado(sessionStorage.getItem('cedula'), parsedia($scope.datapqrips.finicio), parsedia($scope.datapqrips.ffin)).then(function (response) {                
                if (response.Codigo=='1') {
                    $scope.listpqrsp = [];
                    $scope.tablepqrsp = undefined;
                    swal('PQR', response.Nombre, 'error').catch(swal.noop);
                }else{
                    $scope.listpqrsp = response;
                    setTimeout(function () {
                        $scope.tablepqrsp = $('#tablePQRIPSP').DataTable({
                            dom: 'Bfrtip',
                            buttons: [
                                'copy', 'csv', 'excel'
                            ],
                            language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
                            lengthMenu: [[20, 50, -1], [20, 50, 'Todas']],
                            order: [[0, "asc"]],
                            responsive: false
    
                        });
                        $scope.tablepqrsp.draw();
    
                        document.getElementById('tablePQRIPSP').scrollIntoView({ block: 'start', behavior: 'smooth' });
                        swal.close();
                    }, 100);
                }
              
            });
        }

        $scope.limpiarAvanzado = function () {            
            $scope.datapqrips = {
                finicio: null,
                ffin: null
            }
        }
        $scope.openmodals = function (tipo, pqr) {
            console.log(tipo);
            console.log(pqr);

            $scope.dataPqr = pqr;
            switch (tipo) {

                case 'modaldetallepqr':
                    $scope.getProcesoSaludPQR();
                    $("#modaldetallepqr").modal("open");
                break;
            }
        }

        $scope.getProcesoSaludPQR = function () {
            if ($scope.dataPqr) {
                pqrHttp.getProcesoSaludPQR($scope.dataPqr.CODIGO).then(function (res) {
                    $scope.procesopqr = res.data;
                    if ($scope.procesopqr.length > 0) {
                        $scope.showDataPQR = true;
                    } else {
                        $scope.showDataPQR = false;
                    }
                    pqrHttp.postViewNotification($scope.dataPqr.CODIGO).then(function (res) {
                    })
                })
            }

            pqrHttp.getInfoAseguramientoPQR($scope.dataPqr.CODIGO).then(function (response) {
                $scope.dpqr = response.data[0];
    
            })
        }

        $scope.closemodals = function (tipo) {
            switch (tipo) {
                case 'modaldetallepqr':
                    $("#modaldetallepqr").modal("close");
                    break;
            }
        }

        $scope.descargafile = function (ruta, ftp) {
            pqrHttp.dowloadfile(ruta, ftp).then(function (response) {
                window.open("temp/" + response.data);
            });
        }
       
    }])


