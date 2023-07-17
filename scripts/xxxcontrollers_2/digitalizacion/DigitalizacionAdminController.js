'use strict';
angular.module('GenesisApp')
  .controller('DigitalizacionAdminController', ['$scope', 'notification', '$rootScope', '$http', 'ngDialog', 'digitalizacionHTTP', '$filter',
    function ($scope, notification, $rootScope, $http, ngDialog, digitalizacionHTTP, $filter) {
      $.getJSON("php/obtenersession.php")
        .done(function (respuesta) {
          $scope.responsable = respuesta.cedula;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          console.log("Error obteniendo session variables");
        });

      $scope.Area = '0';
      $scope.Modulo = '0';
      $scope.Regimen = '0';

      //Tipo Procesos
      digitalizacionHTTP.obtenerprocesos().then(function (response) {
        $scope.proceso = response;
        $scope.initPaginacion($scope.proceso);
      })
      //Informacion Tabla De Los Procesos
      $scope.InformacionProcesos = false;
      // 
      $scope.InformacionPaquete = true
      //Oculto Creacion Procesos
      $scope.CreacionProcesos = true;
      //
      $scope.CreacionPaquete = true;
      //Oculto Paquete De Digitalizacion
      $scope.PaqueteDeDigitalizacion = true;
      //Select Del Regimen
      $scope.OcultarRegimen = true;

      $scope.MostarDatos = true;
      $scope.MostarDatosTipo = true;

      $scope.ItemsMarcado = [];

      //Obtengo Modulos De Un Area
      $scope.ObtenerModulos = function (codigo) {
        digitalizacionHTTP.obtenermodulos(codigo).then(function (response) {
          $scope.modulos = response;
          if ($scope.modulos.length == '0') {
            swal('Informacion', 'No Hay Modulos Asignados Al Area', 'info');
            $scope.Modulo = '0';
          } else {
            if (codigo == '3' || codigo == '4' || codigo == '14' || codigo == '26') {
              $scope.OcultarRegimen = false;
            } else {
              $scope.OcultarRegimen = true;
              $scope.OcultarTipoProceso = true
              $scope.OcultarTipoAfiliado = true;
              $scope.OcultarAportante = true;
              $scope.digitalizacion();
            }
          }
        })
      }
      // Habilitacion Del Formulario Para La Cracion Nueva
      $scope.HabilitarCreacion = function () {
        $scope.InformacionProcesos = true;
        $scope.InformacionPaquete = true;
        $scope.CreacionProcesos = false;
        $scope.CreacionPaquete = true;
        //Areas
        digitalizacionHTTP.obtenerareas($scope.responsable).then(function (response) {
          $scope.areas = response;
        })
      }
      $scope.CrearProceso = function () {
        if ($scope.Area == '0' || $scope.Area == undefined) {
          swal('Informacion', 'Debe Seleccionar Un Area', 'info');
        } else if ($scope.Modulo == '0') {
          swal('Informacion', 'Debe Seleccionar Un Modulo', 'info');
        } else if ($scope.NombreDelProceso == '' || $scope.NombreDelProceso == undefined) {
          swal('Informacion', 'Debe Digitar Un Nombre', 'info');
        } else if ($scope.Area == '4' && $scope.Regimen == '0') {
          swal('Informacion', 'Debe Seleccionar El Regimen', 'info');
        } else {
          digitalizacionHTTP.crearprocesos($scope.Area, $scope.Modulo, $scope.NombreDelProceso, $scope.Regimen).then(function (response) {
            $scope.res = response;
            $scope.codigoprocesos = response.consecutivo;
            $scope.nombreprocesos = response.nombre;

            if ($scope.res.coderror == '0') {
              swal('Correctamente', $scope.res.mensaje, 'success').then((result) => {
                if (result) {
                  $scope.LimpiarAlGuardarProcesos();
                }
              })
            } else {
              swal('Correctamente', $scope.res.mensaje, 'error');
            }
          })
        }
      }
      $scope.LimpiarAlGuardarProcesos = function () {
        $scope.NombreDelProcesos = '';
        $scope.Area = '0';
        $scope.Regimen = '0';
        $scope.Modulo = '0';
        $scope.InformacionProcesos = true;
        $scope.CreacionProcesos = true;
        $scope.CreacionPaquete = false;
        $scope.PaqueteDeDigitalizacion = true;
        $scope.$apply();
      }
      $scope.CrearPaquete = function () {
        if ($scope.NombreDelPaquete.length == '0' && $scope.NombreDelPaquete == undefined) {
          swal('Informacion', 'Debe Digitar El Nombre Del Paquete', 'info');
        } else {
          digitalizacionHTTP.crearpaquete($scope.codigoprocesos, $scope.NombreDelPaquete).then(function (response) {
            $scope.respuesta = response;
            $scope.codigopaquete = response.consecutivo;
            if ($scope.respuesta.coderror == '0') {
              swal('Correctamente', $scope.respuesta.mensaje, 'success').then((result) => {
                if (result) {
                  $scope.LimpiarAlGuardarPaquete();
                }
              })
            } else {
              swal('Correctamente', $scope.respuesta.mensaje, 'error');
            }

          })
        }
      }
      $scope.LimpiarAlGuardarPaquete = function () {
        $scope.NombreDelPaquete = '';
        $scope.InformacionProcesos = true;
        $scope.CreacionProcesos = true;
        $scope.CreacionPaquete = true;
        $scope.PaqueteDeDigitalizacion = false;
        // //Tipo Documental
        digitalizacionHTTP.obtenertipodocumental().then(function (response) {
          $scope.tipodocumental = response;
          $scope.initPaginacionParametros($scope.tipodocumental);
        })
      }
      $scope.MarcarParametro = function (item) {
        if (item.checked == "false") {
          item.checked = "true";
          swal({
            title: 'Confirmar',
            text: '¿Desea cambiar la prioridad del documento?',
            type: 'question',
            showCancelButton: true,
            allowEscapeKey: false,
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SI',
            cancelButtonText: 'NO'
          }).then(function () {
            $scope.ItemsMarcado.push({
              "codigo_soporte": item.codigo,
              "obligatorio": 'N',
              "codigo_paquete": $scope.codigopaquete,
              "nombre": item.nombre
            });
            $scope.$apply();
          }, function (dismiss) {
            if (dismiss === 'cancel') {
              $scope.ItemsMarcado.push({
                "codigo_soporte": item.codigo,
                "obligatorio": item.obligatorio,
                "codigo_paquete": $scope.codigopaquete,
                "nombre": item.nombre
              });
              $scope.$apply();
            }
          })

        } else {
          item.checked = "false";
          for (var i = 0; i < $scope.ItemsMarcado.length; i++) {
            if (item.codigo == $scope.ItemsMarcado[i].codigo_soporte) {
              $scope.pos = i;
              break;
            }
          }
          $scope.ItemsMarcado.splice($scope.pos, 1);
          return $scope.datos;
        };
      }
      $scope.CreacionParametro = function () {
        if ($scope.ItemsMarcado.length == '0') {
          swal('Notificación', 'Debe Elegir Minimo Un Parametro', 'info');
        } else {
          digitalizacionHTTP.creacionparametros(JSON.stringify($scope.ItemsMarcado), $scope.ItemsMarcado.length, $scope.responsable).then(function (response) {
            $scope.response = response;
            if ($scope.response.coderror == '0') {
              swal('Correctamente', $scope.response.mensaje, 'success').then((result) => {
                if (result) {
                  $scope.LimpiarParametro();
                  setTimeout(function () {
                    $scope.ItemsMarcado = [];
                    $scope.$apply();
                  }, 100);
                }
              })
            } else {
              swal('Notificación', $scope.response.mensaje, 'error');
            }
          })

        }
      }
      $scope.LimpiarParametro = function () {
        $scope.NombreDelPaquete = '';
        $scope.NombreDelProceso = '';
        $scope.InformacionProcesos = false;
        $scope.CreacionProcesos = true;
        $scope.CreacionPaquete = true;
        $scope.PaqueteDeDigitalizacion = true;
        digitalizacionHTTP.obtenerprocesos().then(function (response) {
          $scope.proceso = response;
          $scope.initPaginacion($scope.proceso);
        })
        $scope.$apply();
      }
      $scope.EliminarProcesos = function (codigo) {
        swal({
          title: 'Confirmar',
          text: '¿Desea eliminar el procesos?',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Eliminar'
        }).then((result) => {
          if (result) {
            digitalizacionHTTP.eliminarprocesos(codigo).then(function (response) {
              $scope.respuestaeliminacion = response;
              if ($scope.respuestaeliminacion.coderror == '0') {
                swal('Información', $scope.respuestaeliminacion.mensaje, 'success');
                digitalizacionHTTP.obtenerprocesos().then(function (response) {
                  $scope.proceso = response;
                  $scope.initPaginacion($scope.proceso);
                })
              } else {
                swal('Información', $scope.respuestaeliminacion.mensaje, 'error');
              }
            })
          }
        })
      }
      $scope.EditarProcesos = function (codigo, nombre) {
        $scope.nombreprocesos = nombre;
        $scope.codigoprocesos = codigo;
        swal({
          title: 'Confirmar',
          text: '¿Desea Editar el Procesos?',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Editar'
        }).then((result) => {
          if (result) {
            digitalizacionHTTP.obtenerpaquetes($scope.codigoprocesos).then(function (response) {
              $scope.paquetes = response;
              $scope.InformacionProcesos = true;
              $scope.InformacionPaquete = false;
            })
          }
        })
      }
      $scope.NuevoPaquete = function () {
        $scope.CreacionPaquete = false;
        $scope.InformacionPaquete = true;
      }
      $scope.EliminarPaquete = function (codigo) {
        swal({
          title: 'Confirmar',
          text: '¿Desea eliminar el paquete?',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Eliminar'
        }).then((result) => {
          if (result) {
            digitalizacionHTTP.eliminarpaquete(codigo).then(function (response) {
              $scope.respuestaeliminacion = response;
              if ($scope.respuestaeliminacion.coderror == '0') {
                swal('Información', $scope.respuestaeliminacion.mensaje, 'success');
                digitalizacionHTTP.obtenerpaquetes($scope.codigoprocesos).then(function (response) {
                  $scope.paquetes = response;
                })
              } else {
                swal('Información', $scope.respuestaeliminacion.mensaje, 'error');
              }
            })
          }
        })
      }
      $scope.MostrarParametros = function (codigo) {
        $scope.codigopaquete = codigo;
        swal({
          title: 'Confirmar',
          text: '¿Desea Editar el Paquete?',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Editar Paquete'
        }).then((result) => {
          if (result) {
            digitalizacionHTTP.obtenertipodocumental().then(function (response) {
              $scope.tipod = response;
            })
            digitalizacionHTTP.obtenerparametros($scope.codigopaquete, $scope.codigoprocesos).then(function (response) {
              $scope.ItemsMarcado = response;
              $scope.ItemsMarcadotemp = response;
              for (var i = 0; i < $scope.tipod.length; i++) {
                var codigotipo = $scope.tipod[i].codigo;
                for (var z = 0; z < $scope.ItemsMarcadotemp.length; z++) {
                  if (codigotipo == $scope.ItemsMarcadotemp[z].codigo_soporte) {
                    $scope.tipod[i].checked = true;
                  }
                }
              }
              $scope.tipodocumental = $scope.tipod;
              $scope.tipodocumentaltemporales = $scope.tipod;
              $scope.ItemsMarcado = $scope.ItemsMarcadotemp;
              $scope.InformacionPaquete = true;
              $scope.PaqueteDeDigitalizacion = false;
              $scope.initPaginacionParametros($scope.tipodocumental);
            })
          }
        })
      }
      $scope.Regresar = function (id) {
        switch (id) {
          case '1':
            $scope.InformacionProcesos = false;
            $scope.CreacionProcesos = true;
            $scope.OcultarRegimen = true;
            $scope.Area = '0';
            $scope.Modulo = '0';
            $scope.Regimen = '0';
            $scope.NombreDelProceso = '';
            digitalizacionHTTP.obtenerprocesos().then(function (response) {
              $scope.proceso = response;
              $scope.initPaginacion($scope.proceso);
            })
            break;
          case '2':
            $scope.InformacionProcesos = false;
            $scope.CreacionPaquete = true;
            $scope.OcultarRegimen = true;
            $scope.NombreDelPaquete = '';
            $scope.NombreDelProceso = '';
            digitalizacionHTTP.obtenerprocesos().then(function (response) {
              $scope.proceso = response;
              $scope.initPaginacion($scope.proceso);
            })
            break;
          case '3':
          $scope.InformacionProcesos=true;
          $scope.CreacionProcesos=true;
          $scope.InformacionPaquete=false;
          $scope.CreacionPaquete=true;
          $scope.PaqueteDeDigitalizacion=true;
            $scope.OcultarRegimen = true;
            $scope.NombreDelPaquete = '';
            $scope.NombreDelProceso = '';
            $scope.ItemsMarcado = [];
            digitalizacionHTTP.obtenerprocesos().then(function (response) {
              $scope.proceso = response;
              $scope.initPaginacion($scope.proceso);
            })
            break;
          case '4':
            $scope.InformacionProcesos=false;
            $scope.CreacionProcesos=true;
            $scope.InformacionPaquete=true;
            $scope.CreacionPaquete=true;
            $scope.PaqueteDeDigitalizacion=true;  
            $scope.OcultarRegimen = true;
            $scope.NombreDelPaquete = '';
            $scope.NombreDelProceso = '';
            digitalizacionHTTP.obtenerprocesos().then(function (response) {
              $scope.proceso = response;
              $scope.initPaginacion($scope.proceso);
            })
            break;
          default:
            break;
        }
      }
      $scope.EliminarParametros = function (codigopq, codigopar) {
        $scope.codigopaquete = codigopq;
        $scope.codigoparametro = codigopar;
        swal({
          title: 'Confirmar',
          text: '¿Desea eliminar el parametro?',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Eliminar'
        }).then((result) => {
          if (result) {

            for (var i = 0; i < $scope.ItemsMarcado.length; i++) {
              if (codigopar == $scope.ItemsMarcado[i].codigo_soporte) {
                $scope.pos = i;
                break;
              }
            } 
            for (var z = 0; z < $scope.tipodocumentaltemporales.length; z++) {
              if (codigopar == $scope.tipodocumentaltemporales[z].codigo) {
                $scope.tipodocumentaltemporales[z].checked = false;
                $scope.ItemsMarcado.splice($scope.pos, 1);
                $scope.tipodocumental=[];
                $scope.tipodocumental=$scope.tipodocumentaltemporales;
                $scope.$apply();
                // $scope.initPaginacionParametros($scope.tipodocumental);
                $scope.ConfirmarEliminar($scope.codigopaquete,$scope.codigoparametro);                
                break;
              }
            }

          }
        })
      }
      $scope.ConfirmarEliminar=function(){
        digitalizacionHTTP.eliminarparametro(codigo_pq,codigo_para).then(function (response) {
          $scope.respuesta = response;
          if ($scope.respuesta.coderror=='0') {
            digitalizacionHTTP.obtenertipodocumental().then(function (response) {
              $scope.tipod = response;
            })
            digitalizacionHTTP.obtenerparametros($scope.codigopaquete, $scope.codigoprocesos).then(function (response) {
              $scope.ItemsMarcado = response;
              $scope.ItemsMarcadotemp = response;
              for (var i = 0; i < $scope.tipod.length; i++) {
                var codigotipo = $scope.tipod[i].codigo;
                for (var z = 0; z < $scope.ItemsMarcadotemp.length; z++) {
                  if (codigotipo == $scope.ItemsMarcadotemp[z].codigo_soporte) {
                    $scope.tipod[i].checked = true;
                  }
                }
              }
              $scope.tipodocumental = $scope.tipod;
              $scope.tipodocumentaltemporales = $scope.tipod;
              $scope.ItemsMarcado = $scope.ItemsMarcadotemp;
              $scope.InformacionPaquete = true;
              $scope.PaqueteDeDigitalizacion = false;
              $scope.initPaginacionParametros($scope.tipodocumental);
            })
          } else {
            swal('Información',$scope.respuesta.mensaje,'info');
          }              
        })

      }
      //Paginacion Procesos
      $scope.initPaginacion = function (info) {
        $scope.procesotemp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.configPages();
      }
      $scope.filter = function (val) {
        $scope.procesotemp = $filter('filter')($scope.proceso, val);
        if ($scope.procesotemp.length > 0) {
          $scope.MostarDatos = true;
          $scope.configPages();
        } else {
          $scope.MostarDatos = false;
        }
      }
      $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (Math.ceil($scope.procesotemp.length / $scope.pageSize) > $scope.valmaxpag)
            fin = 10;
          else
            fin = Math.ceil($scope.procesotemp.length / $scope.pageSize);
        } else {
          if (ini >= Math.ceil($scope.procesotemp.length / $scope.pageSize) - $scope.valmaxpag) {
            ini = Math.ceil($scope.procesotemp.length / $scope.pageSize) - $scope.valmaxpag;
            fin = Math.ceil($scope.procesotemp.length / $scope.pageSize);
          }
        }
        if (ini < 1) ini = 1;
        for (var i = ini; i <= fin; i++) {
          $scope.pages.push({
            no: i
          });
        }

        if ($scope.currentPage >= $scope.pages.length) {
          $scope.currentPage = $scope.pages.length - 1;
        }
        if ($scope.currentPage < 0) { $scope.currentPage = 0; }
      };
      $scope.setPage = function (index) {
        $scope.currentPage = index - 1;
        console.log($scope.proceso.length / $scope.pageSize - 1)
      };
      //Paginacion Parametros
      $scope.initPaginacionParametros = function (informacion) {
        $scope.tipodocumentaltemp = informacion;
        $scope.currentPageTipo = 0;
        $scope.pageSizeTipp = 10;
        $scope.valmaxpagTipo = 10;
        $scope.pagesTipo = [];
        $scope.configPagesTipo();
      }
      $scope.filterTipo = function (val) {
        $scope.tipodocumentaltemp = $filter('filter')($scope.tipodocumental, val);
        if ($scope.tipodocumentaltemp.length > 0) {
          $scope.MostarDatosTipo = true;
          $scope.configPagesTipo();
        } else {
          $scope.MostarDatosTipo = false;
        }
      }
      $scope.configPagesTipo = function () {
        $scope.pagesTipo.length = 0;
        var ini = $scope.currentPageTipo - 4;
        var fin = $scope.currentPageTipo + 5;
        if (ini < 1) {
          ini = 1;
          if (Math.ceil($scope.tipodocumentaltemp.length / $scope.pageSizeTipp) > $scope.valmaxpagTipo)
            fin = 10;
          else
            fin = Math.ceil($scope.tipodocumentaltemp.length / $scope.pageSizeTipp);
        } else {
          if (ini >= Math.ceil($scope.tipodocumentaltemp.length / $scope.pageSizeTipp) - $scope.valmaxpagTipo) {
            ini = Math.ceil($scope.tipodocumentaltemp.length / $scope.pageSizeTipp) - $scope.valmaxpagTipo;
            fin = Math.ceil($scope.tipodocumentaltemp.length / $scope.pageSizeTipp);
          }
        }
        if (ini < 1) ini = 1;
        for (var i = ini; i <= fin; i++) {
          $scope.pagesTipo.push({
            no: i
          });
        }

        if ($scope.currentPageTipo >= $scope.pagesTipo.length) {
          $scope.currentPageTipo = $scope.pagesTipo.length - 1;
        }
        if ($scope.currentPageTipo < 0) { $scope.currentPageTipo = 0; }
      };
      $scope.setPageTipo = function (indexTipo) {
        $scope.currentPageTipo = indexTipo - 1;
        console.log($scope.tipodocumental.length / $scope.pageSizeTipp - 1)
      };
    }])

  .filter('inicio', function () {
    return function (input, start) {
      if (input != undefined && start != NaN) {
        start = +start;
        return input.slice(start);
      } else {
        return null;
      }
    }
  });
