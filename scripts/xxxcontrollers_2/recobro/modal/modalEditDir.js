'use strict';
angular.module('GenesisApp')
    .controller('modalEditDir', ['$scope', '$http', 'ngDialog',
        function ($scope, $http, ngDialog) {

            $scope.direccionamiento_editado = [{ "NoPrescripcion":'',
                    "TipoTec":'',
                    "ConTec":'',
                    "TipoIDPaciente":'',
                    "NoIDPaciente":'',
                    "NoEntrega":'',
                    "NoSubEntrega":'',
                    "TipoIDProv":'',
                    "NoIDProv":'',
                    "CodMunEnt":'',
                    "FecMaxEnt":'',
                    "CantTotAEntregar":'',
                    "DirPaciente":'',
                    "CodSerTecAEntregar":''
                }];
            
            $http({
                method: 'POST',
                url: "php/recobro/mipres.php",
                data: {
                    function: 'obtener_dir_det',
                    v_pnopres: $scope.info.idprescripcion,
                    v_pnoentrega: $scope.info.noentrega
                }
            }).then(function (respuesta) {
                $scope.direccionamiento = respuesta.data[0];
                $scope.direccionamiento_editado = respuesta.data[0];
                var fecha_for = respuesta.data[0].FecMaxEnt.split("-");
                
                respuesta.data[0].FecMaxEnt = new Date(fecha_for[0], Number(fecha_for[1]) - 1, fecha_for[2]);
                
            });


            $scope.direccionar = function () {
                // const fecha_temporal =$scope.direccionamiento.FecMaxEnt;
                // const mes = fecha_temporal.getMonth() + 1 < 10 ? '0' + fecha_temporal.getMonth() + 1 : fecha_temporal.getMonth() + 1;

                // const fecha_formateada = new Date(); /*`${fecha_temporal.getDate()}/${mes}/${fecha_temporal.getFullYear()}`*/
                $scope.direccionamiento.FecMaxEnt =  formatDate_j($scope.direccionamiento.FecMaxEnt);


                
                $http({
                    method: 'POST',
                    url: "php/recobro/mipres.php",
                    data: {
                      function: 'insertar_dir',
                      'v_responsable': $scope.sesdata.cedula,
                      'v_pjson_row_adj': $scope.direccionamiento,
                      'v_estado': 'U',
                      'v_len': 1
                    }
                  }).then(function (r) {
                      console.log(r.data);
                  });
            }

            function formatDate_j(date) {
                if (String(date).length > 10) {
                  var month = date.getUTCMonth() + 1;
                  date = date.getDate() + "/" + month + "/" + date.getFullYear();
                  return date;
                } else {
                  return date;
                }
        
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