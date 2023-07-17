'use strict';
angular.module('GenesisApp', [])
    .config(function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
    .controller('CertificadoController', ['$scope', '$http', '$location', '$timeout',
        function ($scope, $http, $location, $timeout) {
            $.getJSON( "../../../php/obtenersession.php").done(function(respuesta) {
                $scope.usuariogenera = respuesta.usu;
                console.log(respuesta);
                $scope.usuariocedula = respuesta.cedula;
             })

            $http({
                method: 'POST',
                url: "../../../php/prestaciones/funprestaciones.php",
                data: { function: 'ConsultarCertificado', tipo: $location.search().tipo, documento: $location.search().documento, inicial: $location.search().inicial, final: $location.search().final }
            }).then(function (res) {
                var datoslength = res.data.length
                if(datoslength > 6 ){
                    $scope.verfirmacertificado = 1;
                }else {
$scope.verfirmacertificado = 2;
                }

                if (res.data.length == 0) {
                    alert('No Hay Informacion');
                } else {
                    $scope.res = res.data;
                    $scope.Inicial = $location.search().inicial;
                    $scope.Final = $location.search().final;
                    $scope.Tipo = $location.search().tipo;
                    
                    if ($scope.Tipo == 'A') {
                        $scope.empresa = "Que el Afiliado";
                        $scope.nombreempresa = res.data[0].NOMBRE_AFILIADO;
                        $scope.tipo_doc_pre = res.data[0].PREC_AFILIADO_TIPO;
                        $scope.num_doc_pre = res.data[0].PREC_AFILIADO_DOC;
                        $scope.nit = res.data[0].PREC_AFILIADO;

                        

                    } else {
                        $scope.nit = "NIT " + res.data[0].NIT;
                        $scope.nombreempresa = res.data[0].EMPRESA;
                        $scope.empresa = "Que la empresa";
                        $scope.nombreempresa2 = res.data[0].EMPRESA;
                        $scope.tipo_documento_empresa = res.data[0].TIPODOCUMENTO;
                        $scope.nit2 = res.data[0].NIT;
                    }

                    if ($scope.Inicial == '' || $scope.Final == '') {
                        $scope.punto = ":";
                    } else {
                        $scope.rango = "para el rango " + $scope.Inicial + " a " + $scope.Final + " :";
                    }
                    $timeout(function () {
                        print(true);
                    }, 1000);
                    $scope.Obtener_Codigo_formato($scope.nombreempresa,$scope.nit);

                    var dateNow = new Date(); 
      $scope.dia  = ('0' + dateNow.getDate()).slice(-2);
      $scope.mes =  ('0' + (dateNow.getMonth() + 1)).slice(-2);
      $scope.anno = dateNow.getFullYear();
                }
            })

            $scope.Obtener_Codigo_formato = function (nombre,documento) {
                var datos = {
                    nombre: nombre,
                    documento: documento
                }
                console.log(datos);
                $http({
                  method: 'POST',
                  url: "../../../php/consultaAfiliados/soportes/soportes_qr.php",
                  data: {
                    function: 'Obtener_Codigo',
                    v_proceso: 'AFPE',
                    v_usuario: $scope.usuariocedula,
                    tipo_documento: $location.search().tipo,
                    numero_documento: $location.search().id,
                    v_json_datos: JSON.stringify({datos})
                  }
                }).then(function (response) {
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



