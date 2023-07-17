'use strict';
angular.module('GenesisApp')
    .controller('evoluciondedocumento', ['$scope', '$http', 'consultaHTTP', '$filter', 'ngDialog', 'cfpLoadingBar', 'afiliacionHttp',
        function ($scope, $http, consultaHTTP, $filter, ngDialog, cfpLoadingBar, afiliacionHttp) {
           

            // $scope.mostrarafiliado = true;

            $scope.Obtener_Tipos_Documentos = function () {
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

            
            $scope.buscarAfiliado = function () {
                var Encontrar_Vacios = false;
                if ($scope.tipoDoc == null || $scope.tipoDoc == '') { Encontrar_Vacios = true; }
                if ($scope.documento == null || $scope.documento == '') { Encontrar_Vacios = true; }            
                if (Encontrar_Vacios == true) {
                    swal('Advertencia', '¡Por favor digitar el tipo y numero de documento!', 'warning')
                    return;
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
                    url: "php/afiliacionlinea/evoluciondedocumento.php",
                    data: {
                        function: 'visualizardatos',
                        tipodoc: $scope.tipoDoc,
                        documento: $scope.documento
                    }

                }).then(function (response) {
                    swal.close()

                    if (response.data.Codigo == '1') {
                        $scope.mostrarafiliado = false;
                        swal({
                            title: response.data.Nombre,
                            timer: 3000,
                            type: 'error'
                        }).catch(swal.noop);

                    }else{
                    swal.close()

                        $scope.verdatos = response.data;
                        // $scope.listDatos = response.data;
                        $scope.mostrarafiliado = true;
                        $scope.initPaginacion($scope.listDatos);
                    }
                   
                });

            }
         

        }]);