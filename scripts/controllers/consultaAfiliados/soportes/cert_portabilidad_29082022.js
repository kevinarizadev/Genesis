'use strict';
	angular.module('GenesisApp',[])
	.config(function($locationProvider) {
     	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
		});
   })
 	.controller('cert_portabilidadctrl',['$scope','$http','$location','$timeout',
 	function($scope,$http,$location,$timeout) {
		$http({
         method:'GET',
         url:"../../../php/consultaafiliados/soportes/getcertport.php",
         params: {type: $location.search().tipo,
                  id: $location.search().id
                  }
      }).then(function(data){
         $scope.data = data.data;
         $scope.Obtener_Codigo_formato($scope.data);

      	
         $timeout(function () {
            print(true);
         }, 1000);
      })
      
      
      function makeCode(data) {
      const qrCode = new QRCodeStyling({
         width: 180,
         height: 180,
         type: "svg",
         data: data,
         image: "https://genesis.cajacopieps.com/images/logoprueba.svg",
         dotsOptions: {
             color: "#000",
             type: "square"
         },
         backgroundOptions: {
             color: "#FFF",
         },
         imageOptions: {
             crossOrigin: "anonymous",
             margin: 0,
            //  imageSize:1

         }
     });

     setTimeout(function () {
      qrCode.append(document.getElementById("qrcode1"));
    }, 100);
   }
      $scope.Obtener_Codigo_formato = function (datos) {
         $http({
           method: 'POST',
           url: "../../../php/consultaAfiliados/soportes/soportes_qr.php",
           data: {
             function: 'Obtener_Codigo',
             v_proceso: 'AFCP',
             v_usuario: $location.search().responsable,
             v_json_datos: JSON.stringify({datos})
           }
         }).then(function (response) {
            console.log(response);
           if (response.data && response.data.toString().substr(0, 3) != '<br') {
             $scope.Codigo_QR = response.data.Num_certificado;
             makeCode(JSON.stringify({
               'CODE': $scope.Codigo_QR
             }));
            $timeout(function () {
               print(true);
            }, 1000);
           } else {
             swal({
               title: "¡Ocurrio un error!",
               text: response.data,
               type: "warning"
             }).catch(swal.noop);
           }
         });
       }
	}
]);