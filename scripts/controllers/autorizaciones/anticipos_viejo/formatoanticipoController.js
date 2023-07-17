
'use strict';
angular.module('GenesisApp', [])
  .config(function ($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  })
  .controller('ControladorIMP', ['$scope', '$http', '$timeout', '$location', '$sce', '$q',
    function ($scope, $http, $timeout, $location, $sce, $q) {
      $(document).ready(function () {
        $scope.trustSrc = function (src) {
          return $sce.trustAsResourceUrl(src);
        }
        if ($scope.Hoja == 'ANT') {
          $scope.Limpiar_Ant();
          $scope.Get_Det_Ant();
        }
        if ($scope.Hoja == 'PER') {
          $scope.Limpiar_Pert();
          $scope.Get_Det_Per();
        }
        if ($scope.Hoja == 'CER') {
          $scope.Limpiar_Cert();
          $scope.Get_Det_Cer();
        }
      });

      $scope.Limpiar_Ant = function () {
        $scope.Ant_FECHA_SOL = '';
        $scope.Ant_SECCIONAL = '';
        $scope.Ant_CONSECUTIVO = '';

        $scope.Ant_DIRECTOR = '';
        $scope.Ant_DIRECTOR_CARGO = '';

        $scope.Ant_USUARIO = '';
        $scope.Ant_USUARIO_ID = '';
        $scope.Ant_USUARIO_RESIDENCIA = '';
        $scope.Ant_USUARIO_RESIDENCIA_DANE = '';
        $scope.Ant_USUARIO_ATENCION = '';
        $scope.Ant_USUARIO_ATENCION_DANE = '';

        $scope.Ant_COBERTURA = '';
        $scope.Ant_MIPRES = '';

        $scope.Ant_CUMPLIMIENTO = '';
        $scope.Ant_DEFICIT = '';

        $scope.Ant_FECHA_RADICACION = '';

        $scope.Ant_TIPO_SERVICIO = '';
        $scope.Ant_PRODUCTO_SERVICIO = '';
        $scope.Ant_DIAGNOSTICO_SERVICIO = '';
        $scope.Ant_JUSTIFICACION = '';
        $scope.Ant_VALOR_SERVICIO = '';

        $scope.Ant_NIT_PRESTADOR = '';
        $scope.Ant_NOMBRE_PRESTADOR = '';
        $scope.Ant_BANCO_PRESTADOR = '';
        $scope.Ant_CUENTA_PRESTADOR = '';
        $scope.Ant_NUMERO_CUENTA_PRESTADOR = '';
        $scope.Ant_TIPO_CUENTA_PRESTADOR = '';
        $scope.Ant_MEDIO_PAGO_PRESTADOR = '';

        $scope.Ant_OBSERVACIONES = '';

        $scope.FirmaAnt =
          [
            { X1: '' },
            { X2: '' },
            { X3: '' },
            { X4: '' },
            { X5: '' },
            { X6: '' },
          ];
      }
      $scope.Limpiar_Pert = function () {
        $scope.Pert_USUARIO = '';
        $scope.Pert_PBS = '';
        $scope.Pert_MIPRES = '';
        $scope.Pert_COMITE = '';
        $scope.Pert_CUMPLIMIENTO = '';
        $scope.Pert_FECHAORDEN = '';
        $scope.Pert_FECHARECIBIDO = '';
        $scope.Pert_FECHAENVIO = '';
        $scope.Pert_AUTORIZADO = '';
        $scope.Pert_PERTINENCIA = '';
        $scope.Pert_51GN47UR3 = '';

        $scope.Firma = {
          Val: ''
        }
      }
      $scope.Limpiar_Cert = function () {
        $scope.Cert_PRODUCTO = '';
        $scope.Cert_USUARIO = '';
        $scope.Cert_TIPODOC = '';
        $scope.Cert_NUMDOC = '';
        $scope.Cert_DIAGNOSTICO = '';
        $scope.Cert_FDIAS = '';
        $scope.Cert_FMES = '';
        $scope.Cert_FANIO = '';
        $scope.Cert_FSECCIONAL = '';
        $scope.Cert_51GN47UR3 = '';
        $scope.Firma = {
          Val: ''
        }
      }
      ////////////////////////////////////////////////

      $scope.Get_Det_Ant = function () {
        $http({
          method: 'POST',
          url: "../../../php/autorizaciones/anticipos/anticipos_formatos.php",
          data: {
            function: 'Obt_Anticipo',
            Numero: $scope.binaryToString($location.search().numero.toString()),
            TipoDoc: $scope.binaryToString($location.search().tipo.toString()),
            NumeroDoc: $scope.binaryToString($location.search().doc.toString())
          }
        }).then(function (response) {
          if (response.data != undefined) {
            if (response.data[0] != undefined) {
              $scope.Ant_FECHA_SOL = response.data[0].FECHA_SOL;
              $scope.Ant_SECCIONAL = response.data[0].SECCIONAL;
              $scope.Ant_CONSECUTIVO = response.data[0].CONSECUTIVO;

              $scope.Ant_DIRECTOR = response.data[0].DIRECTOR;
              $scope.Ant_DIRECTOR_CARGO = response.data[0].DIRECTOR_CARGO;

              $scope.Ant_USUARIO = response.data[0].USUARIO;
              $scope.Ant_USUARIO_ID = response.data[0].USUARIO_ID;
              $scope.Ant_USUARIO_RESIDENCIA = response.data[0].USUARIO_RESIDENCIA;
              $scope.Ant_USUARIO_RESIDENCIA_DANE = response.data[0].USUARIO_RESIDENCIA_DANE;
              $scope.Ant_USUARIO_ATENCION = response.data[0].USUARIO_ATENCION;
              $scope.Ant_USUARIO_ATENCION_DANE = response.data[0].USUARIO_ATENCION_DANE;

              $scope.Ant_COBERTURA = response.data[0].COBERTURA;
              $scope.Ant_MIPRES = response.data[0].MIPRES;

              $scope.Ant_CUMPLIMIENTO = response.data[0].CUMPLIMIENTO;
              $scope.Ant_DEFICIT = response.data[0].DEFICIT;

              $scope.Ant_FECHA_RADICACION = response.data[0].FECHA_RADICACION;

              $scope.Ant_TIPO_SERVICIO = response.data[0].TIPO_SERVICIO;
              $scope.Ant_PRODUCTO_SERVICIO = response.data[0].PRODUCTO_SERVICIO;
              $scope.Ant_DIAGNOSTICO_SERVICIO = response.data[0].DIAGNOSTICO_SERVICIO;
              $scope.Ant_JUSTIFICACION = response.data[0].JUSTIFICACION;
              $scope.Ant_VALOR_SERVICIO = $scope.formatPeso2(response.data[0].VALOR_SERVICIO);

              $scope.Ant_NIT_PRESTADOR = response.data[0].NIT_PRESTADOR;
              $scope.Ant_NOMBRE_PRESTADOR = response.data[0].NOMBRE_PRESTADOR;
              $scope.Ant_BANCO_PRESTADOR = response.data[0].BANCO_PRESTADOR;
              $scope.Ant_CUENTA_PRESTADOR = response.data[0].CUENTA_PRESTADOR;
              $scope.Ant_NUMERO_CUENTA_PRESTADOR = response.data[0].NUMERO_CUENTA_PRESTADOR;
              $scope.Ant_TIPO_CUENTA_PRESTADOR = response.data[0].TIPO_CUENTA_PRESTADOR;
              $scope.Ant_MEDIO_PAGO_PRESTADOR = response.data[0].MEDIO_PAGO_PRESTADOR;

              $scope.Ant_OBSERVACIONES = response.data[0].OBSERVACIONES;
              $scope.Ant_FECHA_PROCESADO = new Date(response.data[0].FECHA_PROCESADO);
              $scope.Ajuste_Mayo = new Date('2021/05/01');
              $scope.Ajuste_Julio = new Date('2021/07/22');
              $scope.Ajuste_Septiembre = new Date('2021/09/29');

              document.title = "Formato de Solicitud de Anticipo - Anticipo N°" + $scope.binaryToString($location.search().numero.toString());
              $scope.Ajuste_Mayo_D_S = 'Sub';
              if ($scope.Ant_FECHA_PROCESADO < $scope.Ajuste_Mayo) {
                $scope.Ajuste_Mayo_D_S = 'Dir';
              }
              if ($scope.Ant_FECHA_PROCESADO >= $scope.Ajuste_Julio) {
                $scope.Ajuste_Mayo_D_S = 'Dir';
              }
              if ($scope.Ant_FECHA_PROCESADO >= $scope.Ajuste_Septiembre) {
                $scope.Ajuste_Mayo_D_S = 'Sub';
              }

              if ($scope.Ajuste_Mayo_D_S == 'Dir') {
                var Down_Firmas = [
                  $scope.Decry_All('34', 'X1'),
                  $scope.Decry_All('999', 'X2'),
                  $scope.Decry_All('87', 'X3'),
                  $scope.Decry_All('70', 'X4'),
                  $scope.Decry_All('101', 'X5'),
                  $scope.Decry_All('83', 'X6')
                ];
              } else {
                var Down_Firmas = [
                  $scope.Decry_All('34', 'X1'),
                  $scope.Decry_All('999', 'X2'),
                  $scope.Decry_All('87', 'X3'),
                  $scope.Decry_All('70', 'X4'),
                  $scope.Decry_All('101', 'X5')
                ];
              }

              // $q.all(Down_Firmas).then(function (resultado) {
              //   var Resul = false;
              //   for (var i = 0; i < Resul.length; i++) {
              //     if (resultado[i].substr(0, 14) != '../../../temp/') {
              //       Resul = true;
              //     }
              //   }
              //   if (Resul != true) {
              //     $timeout(function () {
              //       $scope.$apply();
              //     }, 100);
              //     $timeout(function () {
              //       window.print();
              //     }, 300);
              //   } else {
              //     setTimeout(function () {
              //       window.close();
              //     }, 10);
              //   }
              // });
            }
          } else {
            setTimeout(function () {
              window.close();
            }, 10);
          }
        });
      }

      $scope.Get_Det_Per = function () {
        $http({
          method: 'POST',
          url: "../../../php/autorizaciones/anticipos/anticipos_formatos.php",
          data: {
            function: 'Obt_Pertinencia',
            Numero: $scope.binaryToString($location.search().numero.toString()),
            TipoDoc: $scope.binaryToString($location.search().tipo.toString()),
            NumeroDoc: $scope.binaryToString($location.search().doc.toString())
          }
        }).then(function (response) {
          if (response.data != undefined) {
            if (response.data[0] != undefined) {
              $scope.Pert_USUARIO = response.data[0].USUARIO;
              $scope.Pert_PBS = response.data[0].PBS;
              $scope.Pert_MIPRES = response.data[0].MIPRES;
              $scope.Pert_COMITE = response.data[0].COMITE;
              $scope.Pert_CUMPLIMIENTO = response.data[0].CUMPLIMIENTO;
              $scope.Pert_FECHAORDEN = response.data[0].FECHAORDEN;
              $scope.Pert_FECHARECIBIDO = response.data[0].FECHARECIBIDO;
              $scope.Pert_FECHAENVIO = response.data[0].FECHAENVIO;
              $scope.Pert_AUTORIZADO = response.data[0].AUTORIZADO;
              $scope.Pert_PERTINENCIA = response.data[0].PERTINENCIA;
              $scope.Pert_51GN47UR3 = response.data[0].S1GN47UR3;
              document.title = "Formato de Pertinencia Médica - Anticipo N°" + $scope.binaryToString($location.search().numero.toString());
              // $http({
              //   method: 'POST',
              //   url: "../../../php/autorizaciones/anticipos/anticipos_formatos.php",
              //   data: {
              //     function: 'Decry',
              //     Numero: $scope.binaryToString($location.search().numero.toString()),
              //     TipoDoc: $scope.binaryToString($location.search().tipo.toString()),
              //     NumDoc: $scope.binaryToString($location.search().doc.toString()),
              //     Cargo: 34
              //   }
              // }).then(function (response) {
              //   if (response.data.toString().substr(0, 14) == '../../../temp/') {
              //     $scope.Firma.Val = response.data + "?page=hsn#toolbar=0";;
              //     $timeout(function () {
              //       $scope.$apply();
              //     }, 100);
              //     $timeout(function () {
              //       window.print();
              //     }, 300);
              //   } else {
              //     setTimeout(function () {
              //       window.close();
              //     }, 10);
              //   }
              // });
            }
          } else {
            setTimeout(function () {
              window.close();
            }, 10);
          }
        });
      }

      $scope.Get_Det_Cer = function () {
        $http({
          method: 'POST',
          url: "../../../php/autorizaciones/anticipos/anticipos_formatos.php",
          data: {
            function: 'Obt_Certificacion',
            Numero: $scope.binaryToString($location.search().numero.toString()),
            TipoDoc: $scope.binaryToString($location.search().tipo.toString()),
            NumeroDoc: $scope.binaryToString($location.search().doc.toString())
          }
        }).then(function (response) {
          if (response.data != undefined) {
            if (response.data[0] != undefined) {
              $scope.Cert_PRODUCTO = response.data[0].PRODUCTO;
              $scope.Cert_USUARIO = response.data[0].USUARIO;
              $scope.Cert_TIPODOC = response.data[0].TIPODOC;
              $scope.Cert_NUMDOC = response.data[0].NUMDOC;
              $scope.Cert_DIAGNOSTICO = response.data[0].DIAGNOSTICO;
              $scope.Cert_FDIAS = response.data[0].FDIAS;
              $scope.Cert_FMES = response.data[0].FMES;
              $scope.Cert_FANIO = response.data[0].FANIO;
              $scope.Cert_FSECCIONAL = response.data[0].FSECCIONAL;
              $scope.Cert_51GN47UR3 = response.data[0].S1GN47UR3;
              document.title = "Formato de Certificación - Anticipo N°" + $scope.binaryToString($location.search().numero.toString());

              //
              // $http({
              //   method: 'POST',
              //   url: "../../../php/autorizaciones/anticipos/anticipos_formatos.php",
              //   data: {
              //     function: 'Decry',
              //     Numero: $scope.binaryToString($location.search().numero.toString()),
              //     TipoDoc: $scope.binaryToString($location.search().tipo.toString()),
              //     NumDoc: $scope.binaryToString($location.search().doc.toString()),
              //     Cargo: 999
              //   }
              // }).then(function (response) {
              //   if (response.data.toString().substr(0, 14) == '../../../temp/') {
              //     $scope.Firma.Val = response.data + "?page=hsn#toolbar=0";
              //     $timeout(function () {
              //       $scope.$apply();
              //     }, 100);
              //     $timeout(function () {
              //       window.print();
              //     }, 300);
              //   } else {
              //     setTimeout(function () {
              //       window.close();
              //     }, 10);
              //   }
              // });
              //
            }
          } else {
            setTimeout(function () {
              window.close();
            }, 10);
          }
        });
      }

      $scope.Decry_All = function (Cargo, Firma) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http({
          method: 'POST',
          url: "../../../php/autorizaciones/anticipos/anticipos_formatos.php",
          data: {
            function: 'Decry',
            Numero: $scope.binaryToString($location.search().numero.toString()),
            TipoDoc: $scope.binaryToString($location.search().tipo.toString()),
            NumDoc: $scope.binaryToString($location.search().doc.toString()),
            Cargo: Cargo
          }
        }).then(function (response) {
          $scope.FirmaAnt[Firma] = response.data + "?page=hsn#toolbar=0";;
          defered.resolve($scope.FirmaAnt[Firma]);
        });
        return promise;
      }

      $scope.formatPeso2 = function (num) {
        if (num != undefined) {
          var regex2 = new RegExp("\\.");
          if (regex2.test(num)) {
            num = num.toString().replace('.', ',');
            num = num.split(',');
            num[0] = num[0].toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
            num[0] = num[0].split('').reverse().join('').replace(/^[\.]/, '');
            if (num[1].length > 1 && num[1].length > 2) {
              num[1] = num[1].toString().substr(0, 2);
            }
            if (num[1].length == 1) {
              num[1] = num[1] + '0';
            }
            return num[0] + ',' + num[1];
          } else {
            num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
            num = num.split('').reverse().join('').replace(/^[\.]/, '');
            return num + ',00';
          }
        }
      }

      $scope.binaryToString = function (input) {
        let bytesLeft = input;
        let result = '';
        // Check if we have some bytes left
        while (bytesLeft.length) {
          // Get the first digits
          const byte = bytesLeft.substr(0, 8);
          bytesLeft = bytesLeft.substr(8);
          result += String.fromCharCode(parseInt(byte, 2));
        }
        return result;
      }
      // document.addEventListener('contextmenu', event => event.preventDefault());
      // const body = document.querySelector('body');

      // body.onkeydown = function (e) {
      //   if (e.keyCode === 17 || e.keyCode === 80) {
      //   } else {
      //     return false;
      //   }
      // }
      // var mediaQueryList = window.matchMedia('print');
      // mediaQueryList.addListener(function (mql) {
      //   if (mql.matches) {
      //     console.log('se hizo antes de imprimir');
      //   } else {
      //     console.log('se hizo despues de imprimir');
      //     setTimeout(function () {
      //       window.close();
      //     }, 10);
      //   }
      // });

    }]);
