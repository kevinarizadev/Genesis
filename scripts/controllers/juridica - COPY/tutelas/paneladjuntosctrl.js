'use strict';
angular.module('GenesisApp')
  .controller('paneladjuntosctrl', ['$scope', '$http', 'consultaHTTP', '$filter', 'ngDialog', 'cfpLoadingBar', '$timeout',
    function ($scope, $http, consultaHTTP, $filter, ngDialog, cfpLoadingBar, $timeout) {
      $(document).ready(function () {
        $('.collapsible').collapsible();
        $timeout(
          function () {
            document.querySelector('#AdjuntosDIVseg') != null ? (document.querySelector('#AdjuntosDIVseg').style.height = document.querySelector('#AdjuntosDIV').offsetHeight + 'px') : '';
            document.querySelector('#AdjuntosDIVseg') != null ? (document.querySelector('#AdjuntosDIVseg').style.maxHeight = document.querySelector('#AdjuntosDIV').offsetHeight + 'px') : '';
          }, 300
        );
        $scope.listaNulidades($scope.registro.codigotutela);
        $scope.obtenerAdjuntos();
        $scope.B64 = '';
        $scope.cedula = sessionStorage.getItem('cedula');
        $('.tabs').tabs();
        $('#tabadj_1').click();
      });
      $scope.hdedetalle = false;
      document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems, options);
      });

      // carga los archivos de la tutela
      // $http({
      //    method: 'POST',
      //    url: "php/juridica/tutelas/functutelas.php",
      //    data: {
      //       function: 'listaAdjuntosCargados',
      //       codigotutela: $scope.registro.codigotutela
      //    }
      // }).then(function (response) {
      //    $scope.Adjuntos = response.data;
      //    var groupBy = function (miarray, prop) {
      //       return miarray.reduce(function (groups, item) {
      //          var val = item[prop];
      //          groups[val] = groups[val] || { INCIDENTE: item.INCIDENTE, LISTA: [] };
      //          groups[val].LISTA = angular.copy(miarray.filter(function (el) {
      //             return el.INCIDENTE == item.INCIDENTE;
      //          }));
      //          return groups;
      //       }, {});
      //    }
      //    $scope.grupo = groupBy($scope.Adjuntos.filter(function (el) {
      //       return el.INCIDENTE != -1;
      //    }), 'INCIDENTE');
      //    console.log($scope.grupo);
      // });
      // $http({
      //    method: 'POST',
      //    url: "php/juridica/tutelas/functutelas.php",
      //    data: {
      //       function: 'listaAdjuntosCargadosMensual',
      //       codigotutela: $scope.registro.codigotutela
      //    }
      // }).then(function (response) {
      //    $scope.AdjuntosMensual = response.data;
      // });

      // $http({
      //    method: 'POST',
      //    url: "php/juridica/tutelas/functutelas.php",
      //    data: {
      //       function: 'listaAdjuntosCargadosRevisiones',
      //       codigotutela: $scope.registro.codigotutela
      //    }
      // }).then(function (response) {
      //    $scope.AdjuntosRevisiones = response.data;
      // });

      //CNVU CC ABRIL 2021
      $scope.ver_detalle = function (valor) {
        // console.log(valor);
        $scope.observacion_estado = valor.OBSERVACION == null ? 'NO REGISTRA.' : valor.OBSERVACION;
        $scope.responsable_estado = valor.NOMBRE_RESPONSABLE;
        swal('Detalle Estado Tutela', 'Observación: ' + $scope.observacion_estado + '<br>' + 'Responsable: ' + $scope.responsable_estado, 'info');
      };

      $scope.listaNulidades = function (codigo) {
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: 'listaAdjuntosCargadosNulidad',
            constutela: codigo
          }
        }).then(function (response) {
          $scope.cant_nulidades = response.data;
        });
      };

      // $scope.obtenerAdjuntos = function (codigo){
      //    $scope.consnulidad = codigo;
      //    $http({
      //       method: 'POST',
      //       url: "php/juridica/tutelas/functutelas.php",
      //       data: {
      //          function: 'listaAdjuntosCargadosMensual',
      //          codigotutela: $scope.registro.codigotutela,
      //          consnulidad: $scope.consnulidad
      //       }
      //    }).then(function (response) {
      //       $scope.AdjuntosMensual = response.data;
      //    });

      //    $http({
      //       method: 'POST',
      //       url: "php/juridica/tutelas/functutelas.php",
      //       data: {
      //          function: 'listaAdjuntosCargados',
      //          codigotutela: $scope.registro.codigotutela,
      //          consnulidad: $scope.consnulidad
      //       }
      //    }).then(function (response) {
      //       $scope.Adjuntos = response.data;
      //       var groupBy = function (miarray, prop) {
      //          return miarray.reduce(function (groups, item) {
      //             var val = item[prop];
      //             groups[val] = groups[val] || { INCIDENTE: item.INCIDENTE, LISTA: [] };
      //             groups[val].LISTA = angular.copy(miarray.filter(function (el) {
      //                return el.INCIDENTE == item.INCIDENTE;
      //             }));
      //             return groups;
      //          }, {});
      //       }
      //       $scope.grupo = groupBy($scope.Adjuntos.filter(function (el) {
      //          return el.INCIDENTE != -1;
      //       }), 'INCIDENTE');
      //       console.log($scope.grupo);
      //    });
      // }

      $scope.obtenerAdjuntos = function (codigo) {
        $scope.consnulidad = codigo;
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: 'listaAdjuntosCargadosNew',
            codigotutela: $scope.registro.codigotutela,
            consnulidad: $scope.consnulidad
          }
        }).then(function (response) {
          $scope.Adjuntos = response.data;
          var groupBy = function (miarray, prop) {
            return miarray.reduce(function (groups, item) {
              var val = item[prop];
              groups[val] = groups[val] || { INCIDENTE: item.INCIDENTE, LISTA: [] };
              groups[val].LISTA = angular.copy(miarray.filter(function (el) {
                return el.INCIDENTE == item.INCIDENTE;
              }));
              return groups;
            }, {});
          }
          $scope.grupo = groupBy($scope.Adjuntos.INCIDENTES.filter(function (el) {
            return el.INCIDENTE != -1;
          }), 'INCIDENTE');
          console.log($scope.grupo, $scope.Adjuntos.INCIDENTES.length);
        });
      }

      $scope.actualizaSoporte = function (x) {
        swal({
          title: "Actualizar Soporte",
          html: `
             <div class="file-upload-wrapper file-field input-field" id="file-upload-wrapper"
             data-text="Seleccione un archivo" style="margin: 0;width: -webkit-fill-available;">
             <div class="right">
               <input type="file" id="file" name="file" onchange="myFunction()">
             </div>
             <div class="file-path-wrapper">
               <input class="file-path" type="text" name="archivo"
                 style="border-radius: 0;height: 1rem;border-bottom: 0;" ng-model="fileInput">
             </div>
           </div>
             `,
          showCancelButton: true,
          confirmButtonText: "Guardar",
          cancelButtonText: "Cancelar",
          preConfirm: function () {
            return new Promise(function (resolve) {
              resolve(
                {
                  file: document.querySelector('#file'),
                  ruta: x.RUTA
                }
              )
            })
          }
        }).then(function (result) {
          // console.log(result);
          $scope.loadFile(result);
        }).catch(swal.noop);
      }

      $scope.loadFile = function (x) {
        var ValidarExistente = false;

        $scope.inputFile = x.file;
        if (ValidarExistente != true) {
          if ($scope.inputFile.files.length != 0) { //Valida que exista el archivo
            if ($scope.inputFile.files[0].size > 0 && $scope.inputFile.files[0].size <= 10485760) { //Valida que el archivo no pese mas de 10 Megas
              if ($scope.inputFile.files[0].name.split('.')[1].toUpperCase() == 'PDF') {
                //         //Todo ok
                $scope.getBase64($scope.inputFile.files[0]).then(function (result) {
                  $scope.B64 = result;
                });
                setTimeout(() => {
                  $scope.actualizaRutaSoporte(x);
                }, 1000);
                //         alert('');


              } else {
                swal({
                  title: "Mensaje",
                  text: "¡Solo se permiten archivos PDF!",
                  type: "warning",
                }).catch(swal.noop);
              }
            } else {
              swal({
                title: "Mensaje",
                text: "¡Tamaño del archivo excedido maximo 10 MG!",
                type: "warning",
              }).catch(swal.noop);
            }
          } else {
            swal({
              title: "Mensaje",
              text: "¡Debe ingresar un archivo!",
              type: "warning",
            }).catch(swal.noop);
          }
        }
      }

      $scope.actualizaRutaSoporte = function (x) {
        if ($scope.B64 != '') {
          var responsable = sessionStorage.getItem('cedula');
          swal({ title: 'Cargando...' });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: {
              function: 'actualizaSoporte',
              B64: $scope.B64,
              oldruta: x.ruta,
              resp: responsable,
              ext: x.file.files[0].name.split('.')[1],
              nombre: x.file.files[0].name.split('.')[0]
            }
          }).then(function (res) {
            if (res.data.Codigo == "0") {
              ngDialog.close();
              swal({
                title: "Mensaje",
                text: res.data.Mensaje,
                type: "success",
              }).catch(swal.noop);
            } else {
              swal({
                title: "Mensaje",
                text: res.data.Mensaje,
                type: "warning",
              }).catch(swal.noop);
            }
          });
        }
      }

      $scope.getBase64 = function (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }


      $scope.obtenerAdjuntosNulidad = function (codigo) {
        $scope.consnulidad = codigo;
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: 'listaAdjuntosCargadosNulidad',
            codigotutela: $scope.registro.codigotutela,
            consnulidad: $scope.consnulidad
          }
        }).then(function (response) {
          $scope.AdjuntosNulidad = response.data;
          var groupBy = function (miarray, prop) {
            return miarray.reduce(function (groups, item) {
              var val = item[prop];
              groups[val] = groups[val] || { INCIDENTE: item.INCIDENTE, LISTA: [] };
              groups[val].LISTA = angular.copy(miarray.filter(function (el) {
                return el.INCIDENTE == item.INCIDENTE;
              }));
              return groups;
            }, {});
          }
          $scope.grupo_nul = groupBy($scope.AdjuntosNulidad.INCIDENTES.filter(function (el) {
            return el.INCIDENTE != -1;
          }), 'INCIDENTE');
          console.log($scope.grupo_nul);
          // if ($scope.AdjuntosNulidad.length != undefined) {
          //    for (let i = 0; i < $scope.AdjuntosNulidad.length; i++) {
          //       if ($scope.AdjuntosNulidad[i].length == 0) {
          //          $scope.msjAdjuntosVacios = false;
          //       }else{
          //          $scope.msjAdjuntosVacios = true;
          //       }
          //    }
          // }else{
          //    $scope.msjAdjuntosVacios = true;
          // }
        });
      }

      // $scope.descargafile = function (ruta, tipo) {
      //    $http({
      //       method: 'POST',
      //       url: "php/juridica/tutelas/functutelas.php",
      //       data: {
      //          function: tipo == 'FTP1' ? 'descargaAdjunto' : 'descargaAdjuntoftp3',
      //          ruta: ruta
      //       }
      //    }).then(function (response) {
      //       //window.open("https://genesis.cajacopieps.com//temp/"+response.data);
      //       window.open("temp/" + response.data);
      //    });
      // }

      $scope.UrlSoporte = '';
      $scope.descargafile = function (ruta, obs) {
        $scope.UrlSoporte = '';
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: 'descargaAdjuntoGlobal',
            ruta: ruta
          }
        }).then(function (response) {
          setTimeout(() => {
            $scope.UrlSoporte = "temp/" + response.data + "?page=hsn#toolbar=0";
            if (obs != '' && obs != null && obs != undefined) {
              swal('Detalle', 'Observación: ' + obs, 'info');
            }
            $scope.$apply();
          }, 500);
        });
      }

      $scope.eliminaSoporte = function (x) {
        swal({
          title: "Estas Seguro",
          text: '¡Esta accion Desactivara el soporte, ¿Desea continuar?!',
          type: "question",
          showCancelButton: true,
          allowOutsideClick: false
        }).catch(swal.noop)
          .then((willDelete) => {
            if (willDelete) {
              // var responsable = sessionStorage.getItem('cedula');
              swal({ title: 'Cargando...' });
              swal.showLoading();
              $http({
                method: 'POST',
                url: "php/juridica/tutelas/functutelas.php",
                data: {
                  function: 'eliminaSoporte',
                  ruta: x.RUTA,
                  // resp: responsable,
                }
              }).then(function (res) {
                if (res.data.Codigo == "0") {
                  ngDialog.close();
                  swal({
                    title: "Mensaje",
                    text: res.data.Mensaje,
                    type: "success",
                  }).catch(swal.noop);
                } else {
                  swal({
                    title: "Mensaje",
                    text: res.data.Mensaje,
                    type: "warning",
                  }).catch(swal.noop);
                }
              });
            } else {
              swal({
                title: "Mensaje",
                text: 'Operacion Cancelada',
                type: "error",
              }).catch(swal.noop);
            }
          })
      }
    }
  ]);

function myFunction() {
  if (document.querySelector('#file').files.length != 0) {
    document.querySelector('#file-upload-wrapper').setAttribute("data-text", document.querySelector('#file').files[0].name);
  } else {
    document.querySelector('#file-upload-wrapper').setAttribute("data-text", 'Seleccione un archivo');
  }
}
