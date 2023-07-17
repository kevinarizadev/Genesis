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
      $scope.dia  = ('0' + dateNow.getDate()).slice(-2);
      $scope.mes =  ('0' + (dateNow.getMonth() + 1)).slice(-2);
      $scope.anno = dateNow.getFullYear();
      $scope.id = $location.search().id;
      $scope.tipo = $location.search().tipo;
   
       


      $.getJSON( "../../../php/obtenersession.php").done(function(respuesta) {
         $scope.usuariogenera = respuesta.usu;
         $scope.usuariocedula = respuesta.cedula;
      })

      $scope.Obtener_Codigo_formato = function (datos) {
         $http({
           method: 'POST',
           url: "../../../php/consultaAfiliados/soportes/soportes_qr.php",
           data: {
             function: 'Obtener_Codigo',
             v_proceso: 'AFNF',
             v_usuario: $scope.usuariocedula,
             tipo_documento: $location.search().tipo,
             numero_documento: $location.search().id,
             v_json_datos: JSON.stringify({datos})
           }
         }).then(function (response) {
            console.log(response);
           if (response.data && response.data.toString().substr(0, 3) != '<br') {
             $scope.Codigo_QR = response.data.Num_certificado;
           } else {
             swal({
               title: "¡Ocurrio un error!",
               text: response.data,
               type: "warning"
             }).catch(swal.noop);
           }
         });
       }

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
         $scope.Obtener_Codigo_formato($scope.data_cert);
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