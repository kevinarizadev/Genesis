'use strict';



angular.module('GenesisApp')
    .controller('pruebainternaController', ['$scope', '$http', 'notification', 'acasHttp', 'ngDialog', '$filter', 'communication', '$rootScope',
        function ($scope, $http, notification, acasHttp, ngDialog, $filter, communication, $rootScope) {

            $(document).ready(function () {
                $('#modal_editar').modal();

            })

            $scope.abrir_modal=function(x){
                $scope.afiliado=x.Documento
                $scope.cups=x.Codigo
                $scope.municipio=x.Municipio
                $scope.nit='';
                $scope.contrato='';
                $scope.observacion="";
                $('#modal_editar').modal('open');
            }
            $scope.guardar=function(){
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/contratacion/direccionamiento.php",
                    data: {
                        function: 'P_INSERTA_PRUEBA',
                        v_pdocumento :$scope.afiliado,
                           v_pcups      :$scope.cups,
                           v_pcontrato  :$scope.contrato,
                           v_pnit       :$scope.nit,
                           v_pobservacion:$scope.observacion,
                    }
                }).then(function (response) {
                      if (response.data.Codigo == 0) {
                            $('#modal_editar').modal('close');

                            swal({
                                title: "Completado!",
                                text: response.data.Nombre,
                                type: "success"
                            }).then(function () {

                            })
                            setTimeout(() => {
                                $scope.buscar_datos();
                                $scope.$apply();
                            }, 1000);


                        } else {
                            swal('Información', response.data.Nombre, 'info')

                        }
                })
            }

            $scope.buscar_datos=function(){
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $http({
                    method: 'POST', 
                    url: "php/contratacion/direccionamiento.php",
                    data: {
                        function: 'P_OBTENER_PRUEBA',
                    }
                }).then(function (response) {
                    swal.close();
                     if (response.data[0] != undefined) {
                        $scope.listado_datos = response.data;
                        $scope.total_p = 0;
                        for (let x of $scope.listado_datos) {
                            if (x.Estado == 'P') {
                                $scope.total_p += 1;
                            }
                        }
                    } else {
                        swal('Información', response.data.Nombre, 'info')
                    }
                })
                
            }
            $scope.buscar_datos();


        }])