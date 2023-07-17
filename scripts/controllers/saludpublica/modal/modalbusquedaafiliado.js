'use strict';
angular.module('GenesisApp')
.controller('modalbusquedaafiliado',['$http','$scope','ngDialog','cfpLoadingBar','$window','$timeout',
                function($http,$scope,ngDialog,cfpLoadingBar,$window,$timeout) {
               $scope.tblResultadoAfiliados = true;
               $scope.departamento = "";
               $scope.municipio = "";
               $http({
         method:'PSOT',
         url:"php/consultaafiliados/funcnovedadacb.php",
         data: {function: 'cargaDepartamentos'}
      }).then(function(response){
               $scope.Departamentos = response.data;
      }); 
      $scope.filterMunicipio = function(){
               swal({
            title: 'Buscando afiliados...',
            allowEscapeKey : false,
            allowOutsideClick : false
         });
               $http({
                         method:'PSOT',
                         url:"php/consultaafiliados/funcnovedadacb.php",
                         data: {function: 'cargaMunicipios', depa:$scope.departamento}
                      }).then(function(response){
                               $scope.municipio = "";
                               $scope.Municipios = response.data;
                               swal.close();
                      }); 
      }
                               $scope.buscar = function(){
                                               var val = 0;
                                               $scope.Resultados = {};
                                               $scope.srch_pri_nombre === undefined || $scope.srch_pri_nombre == "" ? val = val : val = val + 1
                                               $scope.srch_seg_nombre === undefined || $scope.srch_seg_nombre == "" ? val = val : val = val + 1
                                               $scope.srch_pri_apellido === undefined || $scope.srch_pri_apellido == "" ? val = val : val = val + 1
                                               $scope.srch_seg_apellido === undefined || $scope.srch_seg_apellido == "" ? val = val : val = val + 1
                                               $scope.srch_seg_apellido === undefined || $scope.srch_seg_apellido == "" ? val = val : val = val + 1
                                               $scope.municipio == "" ? val = val : val = val + 1
                                               $("#dteFechaNacimiento").val() == "" || $("#dteFechaNacimiento").val() == undefined ? val = val : val = val + 1
                                               if (val < 2) {
                                                               swal('Información','Debe ingresar al menos dos criterios de búsqueda','info')
                                                               return;
                                               }else{
                                                               swal({
                            title: 'Buscando afiliados...',
                            allowEscapeKey : false,
                            allowOutsideClick : false
                         });
                         swal.showLoading();
                                                               $http({
                            method:'GET',
                            url:"php/consultaAfiliados/obtenernucleo_nombres.php",
                            params: {p_nombre: $scope.srch_pri_nombre,
                                                              s_nombre: $scope.srch_seg_nombre, 
                                                              p_apellido: $scope.srch_pri_apellido,
                                                              s_apellido: $scope.srch_seg_apellido,
                                                              ubicacion: $scope.municipio,
                                                              f_nacimiento: $("#dteFechaNacimiento").val()}
                         }).then(function(response){
                            if (response.data.length == 0) {
                              swal('Información','No se encontraron resultados con los criterios ingresados','info');
                              $scope.tblResultadoAfiliados = true;
                            }else{
                              $scope.Resultados = response.data.filter(item => (item.tipo_documento !== 'CC' && item.tipo_documento !== 'TI'));
                              $scope.tblResultadoAfiliados = false;
                              swal.close();
                            }            
                         }); 
                                               }                                             
                               }
                               $scope.selectAfiliado = function(tipo,documento){
         $('#a'+documento).addClass('arr');
         $('#a'+documento).siblings().removeClass('arr');
        
        $scope.afiliado_seleccionado = function () {
         $scope.dato.tipo = tipo;
            $scope.dato.numeroid = documento;

            
            
        }


        //  $scope.afiliado_seleccionado = {
        //     tipo:tipo,
        //     documento:documento
        //  }
      }
   }
]);
