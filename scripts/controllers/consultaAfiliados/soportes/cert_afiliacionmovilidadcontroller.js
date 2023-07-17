'use strict';
	angular.module('GenesisApp',[])
	.config(function($locationProvider) {
     	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
		});
   })
 	.controller('cert_afiliacionmovilidadcontroller',['$scope','$http','$location','$timeout',
 	function($scope,$http,$location,$timeout) {
      swal({
         title: 'Cargando información del afiliado',
         allowOutsideClick:false,
         allowEscapeKey:false
      });
      swal.showLoading();
      var dateNow = new Date(); 
      // var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      //                   "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      //                   $scope.mes =  monthNames[dateNow.getMonth()];
      $scope.dia  = ('0' + dateNow.getDate()).slice(-2);
      $scope.mes =  ('0' + (dateNow.getMonth() + 1)).slice(-2);
      $scope.anno = dateNow.getFullYear();

      // $http({
      //    method:'GET',
      //    url:"../../../php/consultaafiliados/soportes/getaportante.php",
      //    params: {type: $location.search().tipo,
      //             id: $location.search().id,
      //             aport: $location.search().aport
      //             }
      // }).then(function(data){
      //    $scope.certapo = data.data;
      //    $http({
      //       method:'GET',
      //       url:"../../../php/consultaafiliados/obtenernucleo_con.php",
      //       params: {type: $location.search().tipo,
      //                id: $location.search().id
      //                }
      //    }).then(function(data){
      //       swal.close();
      //       $scope.cert = data.data;
      //       $scope.tipoafiliado =  $scope.cert[0].TIPOCOTIZANTE;
      //       $scope.regimen = $scope.cert[0].REG_HOM;
      //       $scope.nombre = $scope.cert[0].NOMBRECOMPLETO;
      //       $scope.tipoid = $scope.cert[0].TIPODOCUMENTO;
      //       $scope.numeroid = $scope.cert[0].DOCUMENTO;
      //       $scope.fechaafi = $scope.cert[0].FECHAAFILIACION_CONT;
      //       $scope.fecharet = $scope.cert[0].FECHARETIRO_CONT;
      //       $scope.estado  = $scope.cert[0].ESTADOCONTRIBUTIVO;
      //       $timeout(function () {
      //          print(true);
      //       }, 1000);
      //    })
      // })

      $http({
         method:'GET',
         url:"../../../php/consultaafiliados/soportes/getaportante.php",
         params: {type: $location.search().tipo,
                  id: $location.search().id,
                  aport: $location.search().aport
                  }
      }).then(function(data){
         $scope.data_cert = data.data;
         $scope.tipoafiliado = $scope.data_cert.tipo_afiliado;
         $scope.nombre = $scope.data_cert.nombre_cotizante;
         $scope.tipoid = $scope.data_cert.tipo_documento;
         $scope.numeroid = $scope.data_cert.num_documento;
         $scope.fechaafi = $scope.data_cert.fecha_ingreso;
         $scope.fecharet = $scope.data_cert.fecha_retiro;
         $scope.estado = $scope.data_cert.estado_cotizante;

         $scope.certapo = $scope.data_cert.aportes;

         $scope.cert = $scope.data_cert.beneficiarios;

         $scope.Obtener_Codigo_formato($scope.data_cert);
         swal.close();

         $timeout(function () {
            print(true);
         }, 1000);

      })
      
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
             v_proceso: 'AFMH',
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
]);