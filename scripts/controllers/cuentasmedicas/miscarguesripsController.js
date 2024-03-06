'use strict';
angular.module('GenesisApp').controller('miscarguesripsController', ['$scope', '$http', '$filter',
  function ($scope, $http, $filter) {
    $(document).ready(function () {
      $('.modal').modal();
      $scope.nit = sessionStorage.getItem('nit');
      $scope.Rol_Cedula = sessionStorage.getItem('cedula');
      $scope.pen = 0;
      $scope.err = 0;
      $scope.val = 0;
      $scope.valerr = 0;
      $scope.rad = 0;
      $scope.listaRIPSTemp = [];
      $scope.cargarrips();
      swal({
        title: "¡Notificación!",
        html: `<span>Ahora es posible anular RIPS Validados utilizando la opción</span>
               <i class="icon-trash cursor-pointer" style="font-size: 18px;"></i>`,
        type: 'info',
        confirmButtonText: "Ok",
      });
    });
    var vm = this;
    $scope.cargarrips = function () {
      $http({
        method: 'POST',
        url: "php/cuentasmedicas/rips/funcRips.php",
        data: {
          function: 'obtenerCargues',
          nit: $scope.nit
        }
      }).then(function (response) {
        if (response.data[0].codigo != "0") {
          $scope.listaRIPS = [];
          $scope.listaRIPS = response.data;
          $scope.listaRIPSTemp = $scope.listaRIPS;
          $scope.currentPage = 0;
          $scope.pageSize = 10;
          $scope.valmaxpag = 10;
          $scope.pages = [];
          $scope.pen = 0;
          $scope.err = 0;
          $scope.val = 0;
          $scope.valerr = 0;
          $scope.rad = 0;
          $scope.configPages();
          for (var i = 0; i < $scope.listaRIPS.length; i++) {
            switch ($scope.listaRIPS[i].estado) {
              case 'PENDIENTE':
                $scope.pen = $scope.pen + 1;
                break;
              case 'ERROR':
                $scope.err = $scope.err + 1;
                break;
              case 'VALIDADO':
                $scope.val = $scope.val + 1;
                break;
              case 'VALIDADO CON ERRORES':
                $scope.valerr = $scope.valerr + 1;
                break;
              case 'RADICADO':
                $scope.rad = $scope.rad + 1;
                break;
              default:
                break;
            }
          }
        } else { }
      })
    }
    $scope.descargarErrores = function (proceso, archivo, texto) {
      if (archivo != 'NA') {
        var text = texto + ' ' + archivo.toUpperCase();
      } else {
        var text = texto;
      }
      window.open('php/cuentasmedicas/rips/error_rips.php?archivo=' + archivo + '&proceso=' + proceso + '&texto=' + text);
    }
    $scope.print = async function (data) {
      if (data.estado == 'RADICADO') {
        swal({
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#1d930f',
          confirmButtonText: 'Generar Acta',
          cancelButtonText: 'Radicar facturas digitalmente'
        }).then((result) => {
          if (result) {
            $scope.info = {
              recibo: '',
              nit: ''
            };
            $scope.info.recibo = data.recibo;
            $scope.info.nit = data.nit;
            $scope.info.codigo = data.codigo;
            $scope.info.verificacion = data.codigov;
            window.open('views/Cuentasmedicas/formatos/acta.php?datos=' + JSON.stringify($scope.info), '_blank', "width=900,height=1100");
          }
        }, function (dismiss) {
          if (dismiss == 'cancel') {
            // Cargar Soporte Digitales
            $scope.modalCargueSoporteDig();
          }
        })
      } else {
        $scope.info = {
          recibo: '',
          nit: ''
        };
        $scope.info.recibo = data.recibo;
        $scope.info.nit = data.nit;
        $scope.info.codigo = data.codigo;
        $scope.info.verificacion = data.codigov;
        window.open('views/Cuentasmedicas/formatos/acta.php?datos=' + JSON.stringify($scope.info), '_blank', "width=900,height=1100");
        if (data.nit === '901139193') {
          const responseExisteActa = await $http({
            url: '/php/cuentasmedicas/onbase.php',
            method: 'POST',
            data: $scope.info
          })
          if (responseExisteActa.data.data.ACTA_GENERADA === 'S') {
            const responseImportDocument = await $http({
              url: `/php/onbase/acta.php?nit=${$scope.info.nit}&recibo=${$scope.info.recibo}&codigo=${$scope.info.codigo}&verificacion=${$scope.info.verificacion}`
            })
          }
        }
      }
    }

    function validar_json(str) {
      try {
        if (typeof str !== "string") {
          return false;
        } else {
          return (typeof JSON.parse(str) === 'object');
        }
      } catch (e) {
        return false;
      }
    }
    $scope.print_sin_radicar = function (data) {
      // console.log({
      //   nit: data.nit,
      //   habilitacion: data.habilitacion,
      //   recibo: data.recibo,
      //   proceso: data.codigo
      // });
      $http({
        method: 'POST',
        url: "php/cuentasmedicas/rips/funcRips.php",
        data: {
          function: 'obtener_factura',
          nit: data.nit,
          habilitacion: data.habilitacion,
          recibo: data.recibo,
          proceso: data.codigo
        }
      }).then(function (response) {
        if (validar_json(angular.toJson(response.data)) && response.data != "") {
          if (response.data.detalle != null && response.data.detalle != "" && response.data.detalle.length > 0) {
            var datos = {
              nit: data.nit,
              habilitacion: data.habilitacion,
              recibo: data.recibo,
              codigo: data.codigo
            };
            window.open('views/Cuentasmedicas/formatos/facturas_sin_radicar.php?datos=' + angular.toJson(datos), '_blank', "width=900,height=1100");
          } else {
            swal("Mensaje", "No se encontraron facturas devueltas", "info");
          }
        } else {
          swal("Mensaje", response.data.mensaje, "warning");
        }
      })
    }
    $scope.informe_validacion_capita = function (data) {
      // console.log({
      //   nit: data.nit,
      //   habilitacion: data.habilitacion,
      //   recibo: data.recibo,
      //   proceso: data.codigo
      // });
      // console.log(data);
      // var datos = {
      //   nit: data.nit,
      //   habilitacion: data.habilitacion,
      //   recibo: data.recibo,
      //   codigo: data.codigo
      // };
      window.open('views/Cuentasmedicas/formatos/informe_validacion.php?datos=' + angular.toJson(datos), '_blank', "width=900,height=1100");
    }
    $scope.verdetalle = function (codigo) {
      $http({
        method: 'POST',
        url: "php/cuentasmedicas/rips/funcRips.php",
        data: {
          function: 'obtenerDetalleCargue',
          codigo: codigo
        }
      }).then(function (response) {
        if (response.data[0].codigo != "0") {
          $scope.listarArchivos = response.data;
          $('#modalarchivosdetalle').modal('open');
        } else { }
      })
    }
    $scope.filter = function (val) {
      $scope.listaRIPSTemp = $filter('filter')($scope.listaRIPS, val);
      if ($scope.listaRIPSTemp.length > 0) {
        $scope.setPage(1);
      }
      $scope.configPages();
    }
    $scope.closeModal = function () {
      $('#modalarchivosdetalle').modal('close');
      $('#modalhistoricoerrores').modal('close');
    }
    $scope.configPages = function () {
      $scope.pages.length = 0;
      var ini = $scope.currentPage - 4;
      var fin = $scope.currentPage + 5;
      if (ini < 1) {
        ini = 1;
        if (Math.ceil($scope.listaRIPSTemp.length / $scope.pageSize) > $scope.valmaxpag) fin = 10;
        else fin = Math.ceil($scope.listaRIPSTemp.length / $scope.pageSize);
      } else {
        if (ini >= Math.ceil($scope.listaRIPSTemp.length / $scope.pageSize) - $scope.valmaxpag) {
          ini = Math.ceil($scope.listaRIPSTemp.length / $scope.pageSize) - $scope.valmaxpag;
          fin = Math.ceil($scope.listaRIPSTemp.length / $scope.pageSize);
        }
      }
      if (ini < 1) ini = 1;
      for (var i = ini; i <= fin; i++) {
        $scope.pages.push({
          no: i
        });
      }
      if ($scope.currentPage >= $scope.pages.length) $scope.currentPage = $scope.pages.length - 1;
    }
    $scope.setPage = function (index) {
      $scope.currentPage = index - 1;
      // console.log($scope.listaRIPS.length / $scope.pageSize - 1)
    }
    $scope.eliminarRadicacion = function (rip) {
      // console.log(rip);
      swal({
        title: 'Observacion de Anulación',
        input: 'textarea',
        inputPlaceholder: 'Escribe un comentario...',
        showCancelButton: true,
        allowOutsideClick: false,
        inputValue: '',
        width: 'auto',
        // inputValidator: function (value) {
        //   return new Promise(function (resolve, reject) {
        //     if (value !== '') {
        //       resolve();
        //     } else {
        //       swal({
        //         title: "Mensaje",
        //         text: "¡Debe ingresar una comentario!",
        //         type: "warning",
        //       }).catch(swal.noop);
        //     }
        //   })
        // }
      }).then(function (result) {
        if (result.length >= 10) {
          // console.log('NIT: ', rip.nit, ' Codigo', rip.codigo)
          swal({ title: 'Cargando...' });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/cuentasmedicas/rips/funcRips.php",
            data: {
              function: 'anular_rip',
              codigo_proceso: rip.codigo,
              nit: $scope.nit,
              obs: result,
              usuario: $scope.Rol_Cedula
            }
          }).then(function ({ data }) {
            if (data && data.toString().substr(0, 3) != '<br') {
              if (data[0].codigo == 0) {
                $scope.cargarrips();
                swal({
                  title: "Mensaje",
                  text: data[0].mensaje,
                  type: "success",
                }).catch(swal.noop);
              } else {
                swal({
                  title: "¡Ocurrio un error!",
                  text: data[0].mensaje,
                  type: "warning",
                }).catch(swal.noop);
              }
            }
          });
        } else {
          swal({
            title: "Mensaje",
            text: "¡El comentario debe contener minimo 10 caracteres!",
            type: "warning",
          }).catch(swal.noop);
        }
      }).catch(swal.noop);

    }
    $scope.graficarErrores = function () {
      $http({
        method: 'POST',
        url: "php/cuentasmedicas/rips/funcRips.php",
        data: {
          function: 'obtenerArchivosArrores',
          nit: $scope.nit
        }
      }).then(function (response) {
        $scope.listArchivos = response.data;
        if ($scope.listArchivos[0].error == "0") {
          $http({
            method: 'POST',
            url: "php/cuentasmedicas/rips/funcRips.php",
            data: {
              function: 'obtenerErroresDetalle',
              nit: $scope.nit
            }
          }).then(function (response) {
            $scope.listArchivostotal = response.data;
            //estructura para primera grafica
            $scope.serie = [{
              name: 'Archivos RIPS',
              color: '#8BC34A',
              data: []
            }];
            for (let index = 0; index < $scope.listArchivos.length; index++) {
              var info = {
                name: $scope.listArchivos[index].nombre,
                y: $scope.listArchivos[index].cantidad,
                drilldown: $scope.listArchivos[index].codigo
              };
              $scope.serie[0].data.push(info);
            }
            //logica para la estructura del drilldown
            $scope.listainfoCT = [];
            $scope.listainfoUS = [];
            $scope.listainfoAF = [];
            $scope.listainfoAU = [];
            $scope.listainfoAH = [];
            $scope.listainfoAC = [];
            $scope.listainfoAP = [];
            $scope.listainfoAM = [];
            $scope.listainfoAN = [];
            $scope.listainfoAT = [];
            for (let index = 0; index < $scope.listArchivostotal.length; index++) {
              var info = {
                name: 'Error - ' + $scope.listArchivostotal[index].codigo,
                error: $scope.listArchivostotal[index].nombre,
                y: $scope.listArchivostotal[index].cantidad
              };
              switch ($scope.listArchivostotal[index].archivo) {
                case 'CT':
                  $scope.listainfoCT.push(info);
                  break;
                case 'US':
                  $scope.listainfoUS.push(info);
                  break;
                case 'AF':
                  $scope.listainfoAF.push(info);
                  break;
                case 'AU':
                  $scope.listainfoAU.push(info);
                  break;
                case 'AH':
                  $scope.listainfoAH.push(info);
                  break;
                case 'AC':
                  $scope.listainfoAC.push(info);
                  break;
                case 'AP':
                  $scope.listainfoAP.push(info);
                  break;
                case 'AM':
                  $scope.listainfoAM.push(info);
                  break;
                case 'AN':
                  $scope.listainfoAN.push(info);
                  break;
                case 'AT':
                  $scope.listainfoAT.push(info);
                  break;
                default:
                  break;
              }
            }
            var info2 = {
              name: '',
              id: '',
              data: []
            };
            $scope.drilldown = [];
            for (let index = 0; index < $scope.listArchivos.length; index++) {
              switch ($scope.listArchivos[index].codigo) {
                case 'CT':
                  info2 = {
                    name: 'Archivo CT',
                    id: 'CT',
                    data: $scope.listainfoCT
                  };
                  break;
                case 'US':
                  info2 = {
                    name: 'Archivo US',
                    id: 'US',
                    data: $scope.listainfoUS
                  };
                  break;
                case 'AF':
                  info2 = {
                    name: 'Archivo AF',
                    id: 'AF',
                    data: $scope.listainfoAF
                  };
                  break;
                case 'AU':
                  info2 = {
                    name: 'Archivo AU',
                    id: 'AU',
                    data: $scope.listainfoAU
                  };
                  break;
                case 'AH':
                  info2 = {
                    name: 'Archivo AH',
                    id: 'AH',
                    data: $scope.listainfoAH
                  };
                  break;
                case 'AC':
                  info2 = {
                    name: 'Archivo AC',
                    id: 'AC',
                    data: $scope.listainfoAC
                  };
                  break;
                case 'AP':
                  info2 = {
                    name: 'Archivo AP',
                    id: 'AP',
                    data: $scope.listainfoAP
                  };
                  break;
                case 'AM':
                  info2 = {
                    name: 'Archivo AM',
                    id: 'AM',
                    data: $scope.listainfoAM
                  };
                  break;
                case 'AN':
                  info2 = {
                    name: 'Archivo AN',
                    id: 'AN',
                    data: $scope.listainfoAN
                  };
                  break;
                case 'AT':
                  info2 = {
                    name: 'Archivo AT',
                    id: 'AT',
                    data: $scope.listainfoAT
                  };
                  break;
                default:
                  break;
              }
              $scope.drilldown.push(info2);
            }
            vm.hc3 = angular.element('#consolidadoerror').highcharts({
              chart: {
                type: 'column',
                options3d: {
                  enabled: true,
                  alpha: 20,
                  beta: 0
                }
              },
              title: {
                text: 'Errores por Archivos Rips'
              },
              xAxis: {
                type: 'category'
              },
              yAxis: {
                title: {
                  text: 'Cantidad de errores'
                }
              },
              legend: {
                enabled: false
              },
              plotOptions: {
                series: {
                  borderWidth: 0,
                  dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                  }
                }
              },
              tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">Error: {point.error}</span>: <b>Cantidad: {point.y}</b><br/>'
              },
              series: $scope.serie,
              drilldown: {
                series: $scope.drilldown
              }
            });
            $('#modalhistoricoerrores').modal('open');
          })
        } else {
          swal("IMPORTANTE", "No hay informacion actualmente para realizar el ranking", "info");
        }
      })
    }
    //////////////////////////////////////////////////
    $scope.modalCargueSoporteDig = function () {
      $scope.formSoporteDig = {
        recibo: '654231',
        fechaRegistro: new Date('01/01/2023'),
        cantidadFacturas: 10,
        valorTotal: '$ 1.000.000',

        soporteNombre: '',
        soporteB64: '',
        soporteExt: '',

        archivosPendientes: [
          {
            nombreArchivo: 'Factura 001.pdf',
            error: 'Factura ilegible',
            soporteNombre: '',
            soporteB64: '',
            soporteExt: ''
          },
          {
            nombreArchivo: 'Factura 002.pdf',
            error: 'Factura ilegible',
            soporteNombre: '',
            soporteB64: '',
            soporteExt: ''
          },
          {
            nombreArchivo: 'Factura 003.pdf',
            error: 'Factura ilegible',
            soporteNombre: '',
            soporteB64: '',
            soporteExt: ''
          }
        ]

      }
      document.querySelector('#fileFacturasDig').value = '';
      setTimeout(() => { document.querySelector('#modalCargueSoporteDig').style.top = 1 + '%'; }, 600);

      $('#modalCargueSoporteDig').modal('open');
      setTimeout(() => { $scope.$apply(); }, 500);

      setTimeout(() => {
        document.querySelectorAll('.fileFacturasDigUnica').forEach((filef, index) => filef.addEventListener('change', function (e) {
          $scope.formSoporteDig.archivosPendientes[index].soporteExt = '';
          $scope.formSoporteDig.archivosPendientes[index].soporteB64 = '';
          setTimeout(() => { $scope.$apply(); }, 500);
          var files = e.target.files;
          if (files.length != 0) {
            for (let i = 0; i < files.length; i++) {
              const x = files[i].name.split('.');
              if (x[x.length - 1].toUpperCase() == 'JPG' || x[x.length - 1].toUpperCase() == 'PDF') {
                if (files[i].size < 15485760 && files[i].size > 0) {
                  $scope.getBase64(files[i]).then(function (result) {
                    $scope.formSoporteDig.archivosPendientes[index].soporteExt = x[x.length - 1].toLowerCase();
                    $scope.formSoporteDig.archivosPendientes[index].soporteB64 = result;
                    setTimeout(function () { $scope.$apply(); }, 300);
                    setTimeout(() => {
                      console.log($scope.formSoporteDig.archivosPendientes)
                    }, 2500);
                  });
                } else {
                  // document.querySelector('#fileFacturasDig').value = '';
                  swal('Advertencia', '¡Uno de los archivos seleccionados excede el peso máximo posible (15MB)!', 'info');
                }
              } else {
                // document.querySelector('#fileFacturasDig').value = '';
                swal('Advertencia', '¡El archivo seleccionado debe ser .JPG o .PDF!', 'info');
              }
            }
          }

        })
        )
          ;
      }, 1500);
    }

    document.querySelector('#fileFacturasDig').addEventListener('change', function (e) {
      $scope.formSoporteDig.soporteB64 = "";
      setTimeout(() => { $scope.$apply(); }, 500);
      var files = e.target.files;
      if (files.length != 0) {
        for (let i = 0; i < files.length; i++) {
          const x = files[i].name.split('.');
          if (x[x.length - 1].toUpperCase() == 'ZIP') {
            if (files[i].size < 15485760 && files[i].size > 0) {
              $scope.getBase64(files[i]).then(function (result) {
                $scope.formSoporteDig.soporteExt = x[x.length - 1].toLowerCase();
                $scope.formSoporteDig.soporteB64 = result;
                setTimeout(function () { $scope.$apply(); }, 300);
              });
            } else {
              document.querySelector('#fileFacturasDig').value = '';
              swal('Advertencia', '¡Uno de los archivos seleccionados excede el peso máximo posible (15MB)!', 'info');
            }
          } else {
            document.querySelector('#fileFacturasDig').value = '';
            swal('Advertencia', '¡El archivo seleccionado debe ser .ZIP!', 'info');
          }
        }
      }
    });
    $scope.getBase64 = function (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }

    $scope.cargarFacturasDig = function () {
      return new Promise((resolve) => {
        if (!$scope.formSoporteDig.soporteB64) { resolve(''); return }
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando facturas...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "cargarFacturasDig",

            // codigo: "SoporteProceso",
            // codigo: $scope.hojaProcesos.formulario.idProcesoSeleccionado,
            // base64: $scope.hojaProcesos.formulario.soporteB64
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br') {
            resolve(data);
          } else {
            resolve(false);
          }
        })
      });
    }

    $scope.validarFacturasDig = function () {
      const text = `Total: ${$scope.formSoporteDig.cantidadFacturas}`
      swal({
        title: '¿Adjuntó el total de las facturas esperadas?',
        text,
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result) {
        }
      })
      // asdasd
    }
    //////////////////////////////////////////////////
    //
  }
]).filter('inicio', function () {
  return function (input, start) {
    if (input != undefined && start != NaN) {
      start = +start;
      return input.slice(start);
    } else {
      return null;
    }
  }
});
