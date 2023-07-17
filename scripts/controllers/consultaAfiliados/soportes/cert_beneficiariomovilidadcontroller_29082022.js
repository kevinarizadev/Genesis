'use strict';
	angular.module('GenesisApp',[])
	.config(function($locationProvider) {
     	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
		});
   })
 	.controller('cert_beneficiariomovilidadcontroller',['$scope','$http','$location','$timeout',
 	function($scope,$http,$location,$timeout) {
      swal({
         title: 'Cargando información del afiliado',
         allowOutsideClick:false,
         allowEscapeKey:false
      });
      swal.showLoading();
 		var dateNow = new Date(); 
      var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      $scope.dia  = dateNow.getDate();
      $scope.mes =  monthNames[dateNow.getMonth()];
      $scope.anno = dateNow.getFullYear();
      $scope.id = $location.search().id;
      $scope.tipo = $location.search().tipo;

      $.getJSON( "../../../php/obtenersession.php").done(function(respuesta) {
         $scope.usuariogenera = respuesta.usu;
      })

      $http({
         method:'GET',
         url:"../../../php/consultaafiliados/soportes/getaportante.php",
         params: {type: $location.search().tipo,
                  id: $location.search().id,
                  aport: ''}
      }).then(function(data){
         $scope.data_cert = data.data;
         
         $scope.NOMBRE = $scope.data_cert.nombre_cotizante;
         $scope.TIPOID = $scope.data_cert.tipo_documento;
         $scope.NUMID = $scope.data_cert.num_documento;
         $scope.F_AFILIACION = $scope.data_cert.fecha_ingreso;
         $scope.F_RETIRO = $scope.data_cert.fecha_retiro;
         $scope.ESTADO = $scope.data_cert.estado_cotizante;

         //$scope.certapo = $scope.data_cert.aportes;

         $scope.ben = $scope.data_cert.beneficiarios;
         swal.close();

         $timeout(function () {
            print(true);
         }, 1000);

      })

      var mediaQueryList = window.matchMedia('print');
         mediaQueryList.addListener(function(mql) {
               if (mql.matches) {
                     console.log('se hizo antes de imprimir');
               } else {
                     console.log('se hizo despues de imprimir');
                     setTimeout(function () {
                        window.close();
                     }, 10);
               }
         });

 		// $http({
   //       method:'POST',
   //       url:"../../../php/movilidad/funcmovilidad.php",
   //       data: {function: 'certificadoNucleo',
   //    			type: $scope.tipo,
   //             id: $scope.id
   //            }
   //    }).then(function(data){
   //    	var res = data.data;
   //       $scope.cot = data.data["0"];
   //       $scope.p_tipo = data.data["0"].P_TIPODOC;
   //       $scope.ben = res.splice(1);
   //       swal.close();
   //       $timeout(function () {
   //          print(true);
   //       }, 1000);
   //    })
	}
]);