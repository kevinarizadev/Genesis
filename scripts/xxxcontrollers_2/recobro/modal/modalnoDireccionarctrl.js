'use strict';
angular.module('GenesisApp')
    .controller('modalnoDireccionarctrl', ['$scope', '$http', 'ngDialog','mipresHTTP',
        function ($scope, $http, ngDialog,mipresHTTP) {
            console.log($scope.info);

            
            $scope.dir = {
                NoPrescripcion: '',
                TipoIDPaciente: '',
                NoIDPaciente: '',
                TipoTec: '',
                CausaNoEntrega: '',
                NoPrescripcionAsociada: '',
                ConTecAsociada: '',
                ConTec: ''
            }
                                    
                $scope.dir.NoPrescripcion = ($scope.hide_direccionar!=true)?$scope.info.NoPrescripcion:$scope.info.NoTutela;;
                $scope.dir.TipoIDPaciente = $scope.info.TipoIDPaciente;
                $scope.dir.NoIDPaciente = $scope.info.NroIDPaciente;
                $scope.dir.TipoTec = $scope.info.tipo_tec;
                $scope.dir.ConTec = $scope.actual + 1;
                // $scope.dir.CausaNoEntrega =  $scope.selectCausaNoEntrega;


                $scope.get_causas = function () {
                  $http({
                    method: 'POST',
                    url: "php/recobro/mipres.php",
                    data: {
                      function: 'get_no_entregas'
                    }
                  }).then(function (r) {
                   $scope.causas = r.data;
                  });
                }
                $scope.get_causas();

            $scope.reportar = function () {
              
                swal({
                    title: 'Espere un momento',
                    text: 'Direccionando prescripción',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                    onOpen: () => {
                        swal.showLoading()
                    }
                });


                // $scope.dir.FecMaxEnt = formatDate(document.getElementById("fec_ent").valueAsDate);
                //putdireccionamiento
                mipresHTTP.putnodireccionamiento($scope.regimen,$scope.dir).then(function (respuesta) {                  
                    $scope.api_response = respuesta;
                    if (typeof respuesta.length !== 'undefined' && respuesta.length > 0) {
                        swal.close();
                        // $scope.procesar_direccionamiento($scope.dir);
                      } else {
                        swal('Error',respuesta.Message, 'error')
                      }
                    
                    // swal.close();
                    // if (response.ModelState.direccionamiento[0]==  "Error.") {
                    //     swal('Error',response.Message, 'error')
                    // } else {
                    //     $scope.procesar_direccionamiento($scope.dir);
                    //     swal('Exito', 'Direccionado Exitosamente', 'success');
                    // }
                  })  
                                                
            }

            $scope.procesar_direccionamiento = function (data) {
                $http({
                  method: 'POST',
                  url: "php/recobro/mipres.php",
                  data: {
                    function: 'insertar_dir',
                    'v_responsable': $scope.sesdata.cedula,
                    'v_pjson_row_adj': data,
                    'v_estado': 'P',
                    'v_len': 1
                  }
                }).then(function (r) {
                    swal('Exito', 'Direccionado Exitosamente', 'success');
                });
              }


            function formatDate(date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();
        
                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;
        
                return [year, month, day].join('-');
            }
        }]);