'use strict';
angular.module('GenesisApp')
  .controller('carguemiprestutelacontroller', ['$scope', '$http',
    function ($scope, $http) {
      $scope.Inicio = function () {
        $scope.check_option = false;
        document.getElementById("pantalla").parentElement.parentElement.parentElement.style.paddingBottom = '0px';
        document.getElementById("pantalla").parentElement.parentElement.parentElement.style.backgroundColor = 'white';
        $scope.sysDate = new Date();
        //
        $scope.Data = [];
        //
        setTimeout(() => { $scope.$apply(); }, 500);
      }



      document.querySelector('#files_mipres').addEventListener('change', function (e) {
        $scope.Data = [];
        var files = e.target.files;
        if (files.length != 0) {
          swal({ title: 'Cargando...' });
          swal.showLoading();
          var x = files[0].name.split('.');
          if (x[x.length - 1].toUpperCase() == 'CSV') {
            if (files[0].size < 10485760 && files[0].size > 0) {
              $scope.validarEstructura(files[0], 44);
            } else {
              swal('Advertencia', '¡Uno de los archivos seleccionados excede el peso máximo posible (5MB)!', 'info');
            }
          } else {
            swal('Advertencia', '¡Los archivos seleccionados deben ser formato TXT!', 'info');
          }
        }
      });
      $scope.validarEstructura = function (progressEvent, tamaño) {
        var file = progressEvent;
        var reader = new FileReader();
        reader.onload = function (progressEvent) {
          $scope.estado = false;
          var lines = this.result.split('\r\n');
          var array = [];
          var sigla;
          var datos;
          for (var line = 1; line < lines.length; line++) {
            datos = lines[line].split(';');

            if (datos != '' && datos != undefined && datos != null) {
              if (datos.length == tamaño) {
                $scope.estado = true;
              } else {
                $scope.estado = false;
                break;
              }
            }

            $scope.Data.push({
              'NoTutela': $scope.FormatTexto(datos[0]),
              'FTutela': $scope.FormatTexto(datos[1]),
              'HTutela': $scope.FormatTexto(datos[2]),
              'CodEPS': $scope.FormatTexto(datos[3]),
              'TipoIDEPS': $scope.FormatTexto(datos[4]),
              'NroIDEPS': $scope.FormatTexto(datos[5]),
              'TipoIDProf': $scope.FormatTexto(datos[6]),
              'NumIDProf': $scope.FormatTexto(datos[7]),
              'PNProfS': $scope.FormatTexto(datos[8]),
              'SNProfS': $scope.FormatTexto(datos[9]),
              'PAProfS': $scope.FormatTexto(datos[10]),
              'SAProfS': $scope.FormatTexto(datos[11]),
              'RegProfS': $scope.FormatTexto(datos[12]),
              'TipoIDPaciente': $scope.FormatTexto(datos[13]),
              'NroIDPaciente': $scope.FormatTexto(datos[14]),
              'PNPaciente': $scope.FormatTexto(datos[15]),
              'SNPaciente': $scope.FormatTexto(datos[16]),
              'PAPaciente': $scope.FormatTexto(datos[17]),
              'SAPaciente': $scope.FormatTexto(datos[18]),
              'NroFallo': $scope.FormatTexto(datos[19]),
              'FFalloTutela': $scope.FormatTexto(datos[20]),
              'F1Instan': $scope.FormatTexto(datos[21]),
              'F2Instan': $scope.FormatTexto(datos[22]),
              'FCorte': $scope.FormatTexto(datos[23]),
              'FDesacato': $scope.FormatTexto(datos[24]),
              'EnfHuerfana': $scope.FormatTexto(datos[25]),
              'CodEnfHuerfana': $scope.FormatTexto(datos[26]),
              'EnfHuerfanaDX': $scope.FormatTexto(datos[27]),
              'CodDxPpal': $scope.FormatTexto(datos[28]),
              'CodDxRel1': $scope.FormatTexto(datos[29]),
              'CodDxRel2': $scope.FormatTexto(datos[30]),
              'AclFalloTut': $scope.FormatTexto(datos[31]),
              'CodDxMotS1': $scope.FormatTexto(datos[32]),
              'CodDxMotS2': $scope.FormatTexto(datos[33]),
              'CodDxMotS3': $scope.FormatTexto(datos[34]),
              'JustifMed': $scope.FormatTexto(datos[35]),
              'CritDef1CC': $scope.FormatTexto(datos[36]),
              'CritDef2CC': $scope.FormatTexto(datos[37]),
              'CritDef3CC': $scope.FormatTexto(datos[38]),
              'CritDef4CC': $scope.FormatTexto(datos[39]),
              'TipoIDMadrePaciente': $scope.FormatTexto(datos[40]),
              'NroIDMadrePaciente': $scope.FormatTexto(datos[41]),
              'EstTut': $scope.FormatTexto(datos[42]),
              'Regimen': $scope.FormatTexto(datos[43]),

            });
          }
          console.log($scope.Data)
          if ($scope.estado == true) {
            $scope.Guardar_Images();
          } else {
            document.querySelector('#files_mipres').value = '';
            $scope.Data = [];
            swal('Advertencia', 'el archivo presenta error de estructura tiene mas columnas de las ' + tamaño + ' esperadas.', 'info')
          }
        };
        reader.readAsText(file);
      }


      $scope.Guardar_Images = function () {
        // console.log(JSON.stringify($scope.Data))
        var text = '(' + $scope.Data.length + ') Registros a cargar';
        swal({
          title: "¿Desea guardar la información?",
          text: text,
          type: "question",
          showCancelButton: true,
          allowOutsideClick: false
        }).catch(swal.noop)
          .then((willDelete) => {
            if (willDelete) {
              swal({ title: 'Guardando...', allowOutsideClick: false });
              swal.showLoading();
              // for (let i = 0; i < $scope.Data.length; i++) {
              $http({
                method: 'POST',
                url: "php/recobro/carguemiprestutela.php",
                data: {
                  function: 'p_inserta_tutelas_json',
                  datos: JSON.stringify($scope.Data),
                  cantidad: $scope.Data.length.toString(),
                  // datos: '[' + JSON.stringify($scope.Data[i]) + ']',
                  // cantidad: '1',
                }
              }).then(function ({ data }) {
                document.querySelector('#files_mipres').value = '';
                $scope.Data = [];
                if (data.Codigo == '0') {
                  swal('Advertencia', data.Mensaje, 'success').catch(swal.noop);
                } else {
                  swal('Advertencia', data.mensaje, 'info').catch(swal.noop);
                }
              });

              // }
              // $http({
              //   method: 'POST',
              //   url: "php/recobro/carguemiprestutela.php",
              //   data: {
              //     function: 'p_inserta_tutelas_json',
              //     datos: JSON.stringify($scope.Data),
              //     cantidad: $scope.Data.length,
              //   }
              // }).then(function ({ data }) {
              //   if (data.codigo == 0) {
              //     swal('Advertencia', data.mensaje, 'success').catch(swal.noop);
              //     $scope.Atras();
              //   } else {
              //     swal('Advertencia', data.mensaje, 'info').catch(swal.noop);
              //   }
              // });
            } else {
              document.querySelector('#files_mipres').value = '';
              $scope.Data = [];
            }
          });
      }


      $scope.FormatTexto = function (data) {
        console.log(data)
        if (data) {
          const input = data.toString();
          var valor = input;
          // valor = valor.replace(/[a-zA-Z]/g, '');
          valor = valor.replace(/[|!¿¡?°"#/()=$%&''�´¨´¨¨¨<>]/g, '');
          valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
          return valor.toString();
        } else {
          return ''
        }
      }

      $(window).on('resize', function () {
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100 && $(window).width() < 1300) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1300 && $(window).width() < 1500) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
        if ($(window).width() > 1500) {
          document.querySelector("#pantalla").style.zoom = 0.9;
        }
      });


      if (document.readyState !== 'loading') {
        setTimeout(() => {
          $scope.Inicio();
        }, 1000);
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }

    }])
