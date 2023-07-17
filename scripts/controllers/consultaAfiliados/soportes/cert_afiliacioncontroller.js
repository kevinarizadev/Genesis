'use strict';
	angular.module('GenesisApp',[])
	.config(function($locationProvider) {
     	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
		});
   })
 	.controller('cert_afiliacioncontroller',['$scope','$http','$location','$timeout',
 	function($scope,$http,$location,$timeout) {
      $scope.cert = '';
      $.getJSON( "../../../php/obtenersession.php").done(function(respuesta) {
        $scope.funcionario = respuesta.usu;
        $scope.usuariocedula = respuesta.cedula;
     })
      $(document).ready(function () {
         setTimeout(function () {
         //   $scope.qrcode = new QRCode("qrcode");
         }, 100);
       });

       $scope.formatDate = function() {
        var date = new Date();
        var dd = ('0' + date.getDate()).slice(-2);
        var mm = ('0' + (date.getMonth() + 1)).slice(-2);
        var yyyy = date.getFullYear();
        var hh = date.getHours();
        var mi = date.getMinutes();
        $scope.fechahoy = dd + '/' + mm + '/' + yyyy; //+' '+hh+':'+mi+':00';
    }

		$http({
         method:'GET',
         url:"../../../php/consultaafiliados/soportes/getcertafil.php",
         params: {type: $location.search().tipo,
                  id: $location.search().id
                  }
      }).then(function(data){
      	$scope.cert = data.data;
        if($scope.cert.REGIMEN =='Contributivo' && $scope.cert.TIPO =='Beneficiario'){
          $scope.fechadeafiliacion = $scope.cert.FECHA_INGRESO_BENE;
        }else {
          $scope.fechadeafiliacion = $scope.cert.FECHAAFILIACION;
        }
         $scope.Obtener_Codigo_formato($scope.cert);
         $scope.formatDate();
      })



       function makeCode(data) {
         const qrCode = new QRCodeStyling({
            width: 180,
            height: 180,
            type: "svg",
            data: data,
            image: "http://www.localhost/Genesis_qa/images/logoprueba.svg",
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
         qrCode.append(document.getElementById("qrcode"));
         // $scope.qrcode.makeCode(data);
         // $("#qrcode img").css('height', '130px');
         // $("#qrcode img").css('width', '130px');
         // $("#qrcode img").css('margin-top', '20px');
       }, 100);

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

      }

      $scope.Obtener_Codigo_formato = function (datos) {
        if(datos.REGIMEN == 'Subsidiado'){
          var tipocertificado = 'AFAF'
        } else if(datos.REGIMEN == 'Contributivo' && datos.TIPO =='Cotizante'){
          var tipocertificado = 'AFCS'
        } else if (datos.REGIMEN =='Contributivo' && datos.TIPO =='Beneficiario'){
          var tipocertificado = 'AFRC'
        }
       
         $http({
           method: 'POST',
           url: "../../../php/consultaAfiliados/soportes/soportes_qr.php",
           data: {
             function: 'Obtener_Codigo',
             v_proceso: tipocertificado,
             v_usuario: $scope.usuariocedula,
             tipo_documento: $location.search().tipo,
             numero_documento: $location.search().id,
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