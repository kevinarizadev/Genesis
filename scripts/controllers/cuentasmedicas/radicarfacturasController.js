'use strict';
angular.module('GenesisApp').controller('radicarfacturasController', ['$scope', 'notification', '$http', '$filter', function ($scope, notification, $http, $filter) {
  $scope.scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
  $(document).ready(function () {
    $scope.scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
    Instascan.Camera.getCameras().then(function (cameras) {
      if (cameras.length > 0) {
        $scope.scanner.start(cameras[0]);
      } else {
        swal("Importante", "Camara no detectada.", "warning");
      }
    }).catch(function (e) {
      console.error(e);
    });
    $scope.scanner.addListener('scan', function (content) {
      if (typeof (content) == 'string') {
        var array = JSON.parse(content);
        if (typeof (array) == 'object') {
          if ($scope.verLector == false) {
            $scope.buscarFacturas(array.nit, array.recibo, array.codigo);
          }
        } else {
          swal("Importante", "Informacion incorrecta en QR", "info");
        }
      } else {
        swal("Importante", "Informacion incorrecta en QR", "info");
      }
    });
    $scope.initfunction();
  });
  $scope.verLector = false;
  $scope.rip = {
    nit: '',
    recibo: '',
    codigo: ''
  }
  $scope.facturasconfirmadas = [];
  $scope.lengthpendientes = 0;
  $scope.lengthaprobada = 0;
  $scope.lengthrechazada = 0;
  $scope.titulo = 'Buscar Facturas';

  // $scope.enviarMsm = function () {
  //   $http({
  //     method: 'POST',
  //     url: "php/cuentasmedicas/rips/funcRips.php",
  //     data: { function: 'enviarMensajeAlMovil' }
  //   }).then(function (response) {
  //     console.log(response);
  //   })
  // }


  $scope.initfunction = function () {
    //funcion de motivos de devolucion
    $http({
      method: 'POST',
      url: "php/cuentasmedicas/rips/funcRips.php",
      data: { function: 'obtenerMotivos' }
    }).then(function (response) {
      $scope.motivos = {};
      for (var i = 0; i < response.data.length; i++) {
        var key = response.data[i].CODIGO;
        var val = response.data[i].CODIGO + ' - ' + response.data[i].NOMBRE;
        $scope.motivos[key] = val;
      }
    })
  }
  $scope.whatClassIsIt = function (estado) {
    if (estado == 'S')
      return "status aprobado"
    else if (estado == 'N')
      return "status rechazado";
    else
      return "status pendiente";
  }
  $scope.sortBy = function (propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  }
  $scope.resetService = function () {
    $scope.verLector = false;
    $scope.rip = {
      nit: '',
      recibo: ''
    }
    $scope.facturasconfirmadas = [];
    $scope.lengthpendientes = 0;
    $scope.lengthaprobada = 0;
    $scope.lengthrechazada = 0;
    $scope.titulo = 'Buscar Facturas';
    Instascan.Camera.getCameras().then(function (cameras) {
      if (cameras.length > 0) {
        $scope.scanner.start(cameras[0]);
      } else {
        swal("Importante", "Camara no detectada.", "warning");
      }
    }).catch(function (e) {
      console.error(e);
    });
    $scope.list = { facturas: new Array(), gestionadas: new Array(), total: 0 };
    document.querySelector("#btn_radicar_facturas").style.display = "none";
    setTimeout(() => {
      $scope.$apply();
    }, 80);
  }
  $scope.list = { facturas: new Array(), gestionadas: new Array(), total: 0 };
  $scope.buscarFacturas = function (nit, recibo, codigo) {
    $http({
      method: 'POST',
      url: "php/cuentasmedicas/rips/funcRips.php",
      data: { function: 'buscarFacturas', nit: nit, recibo: recibo, codigo: codigo }
    }).then(function (response) {
      if (response.data[0].CODIGO == 0) {
        $scope.facturasconfirmadas = [];
        $scope.lengthpendientes = 0;
        $scope.lengthaprobada = 0;
        $scope.lengthrechazada = 0;
        $scope.sumpendiente = 0;
        $scope.sumrechazada = 0
        $scope.sumaprobada = 0;
        $scope.list.facturas = response.data;/*.slice(0, 100)*/
        $scope.list.total = $scope.list.facturas.length;
        $scope.titulo = 'Radicación del recibo ' + $scope.list.facturas[0].RECIBO;
        $scope.scanner.stop();
        for (var i = 0; i <= $scope.list.facturas.length - 1; i++) {
          if ($scope.list.facturas[i].ESTADO == 'S') {
            $scope.lengthaprobada = $scope.lengthaprobada + 1;
            $scope.sumaprobada = $scope.sumaprobada + Number($scope.list.facturas[i].VALOR2.replace(/\,/g, '.'));
          } else if ($scope.list.facturas[i].ESTADO == 'N') {
            $scope.lengthrechazada = $scope.lengthrechazada + 1;
            $scope.sumrechazada = $scope.sumrechazada + Number($scope.list.facturas[i].VALOR2.replace(/\,/g, '.'));
          } else {
            $scope.lengthpendientes = $scope.lengthpendientes + 1;
            $scope.sumpendiente = $scope.sumpendiente + Number($scope.list.facturas[i].VALOR2.replace(/\,/g, '.'));
          }
        }
        console.log($scope.sumpendiente);
        $scope.verLector = true;
      } else {
        swal({ title: "Completado", text: response.data[0].Nombre, showConfirmButton: true, type: "warning" });
      }
    })
  }
  $scope.rechazarFactura = function (fac, estado, motivo) {
    swal({
      title: 'Motivo de la devolución',
      input: 'select',
      inputOptions: $scope.motivos,
      inputPlaceholder: 'Seleccionar motivo',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      inputValidator: function (value) {
        return new Promise(function (resolve, reject) {
          if (value !== '') {
            resolve();
          } else {
            reject('Por favor seleccione un motivo');
          }
        });
      }
    }).then(function (result) {
      if (result) {
        $scope.gestionarFactura(fac, estado, result);
      }
    })
  }
  document.querySelector("#btn_radicar_facturas").style.display = "none";
  // $scope.btn_activo = false;
  $scope.gestionarFactura = function (fac, estado, motivo) {
    for (var i = 0; i <= $scope.list.facturas.length - 1; i++) {
      if (fac.FACTURA == $scope.list.facturas[i].FACTURA) {
        if (estado == 'S') {
          $scope.lengthpendientes = $scope.lengthpendientes - 1;
          $scope.lengthaprobada = $scope.lengthaprobada + 1;
          $scope.sumaprobada = $scope.sumaprobada + Number(fac.VALOR2);
          // $scope.sumpendiente = $scope.sumpendiente - Number(fac.VALOR2);
          $scope.list.facturas[i].ESTADO_TEMP = 'RADICADA';
        } else if (estado == 'N') {
          $scope.lengthpendientes = $scope.lengthpendientes - 1;
          $scope.lengthrechazada = $scope.lengthrechazada + 1;
          $scope.sumrechazada = $scope.sumrechazada + Number(fac.VALOR2);
          $scope.sumpendiente = $scope.sumpendiente - Number(fac.VALOR2);
          $scope.list.facturas[i].MOTIVO = motivo;
          $scope.list.facturas[i].ESTADO_TEMP = 'DEVUELTA';
        } else {
          $scope.lengthpendientes = $scope.lengthpendientes + 1;
          $scope.list.facturas[i].MOTIVO = motivo;
          $scope.sumpendiente = $scope.sumpendiente + Number(fac.VALOR2);
          $scope.list.facturas[i].ESTADO_TEMP = 'PENDIENTE';
          if ($scope.list.facturas[i].ESTADO == 'N') {
            $scope.lengthrechazada = $scope.lengthrechazada - 1;
            $scope.sumrechazada = $scope.sumrechazada - Number(fac.VALOR2);
          } else {
            $scope.lengthaprobada = $scope.lengthaprobada - 1;
            $scope.sumaprobada = $scope.sumaprobada - Number(fac.VALOR2);
          }
        }
        if ($scope.lengthpendientes < 0) {
          $scope.lengthpendientes = 0;
          $scope.sumpendiente = 0;
        }
        if ($scope.lengthrechazada < 0) {
          $scope.lengthrechazada = 0;
          $scope.sumrechazada = 0;
        }
        if ($scope.lengthaprobada < 0) {
          $scope.lengthaprobada = 0;
          $scope.sumaprobada = 0;
        }
        $scope.list.facturas[i].ESTADO = estado;
        if ($scope.list.facturas.length == $scope.list.facturas.filter(fac => fac.ESTADO != "V").length) {
          // $scope.btn_activo = true;
          document.querySelector("#btn_radicar_facturas").style.display = "block";
        } else {
          // $scope.btn_activo = false;
          document.querySelector("#btn_radicar_facturas").style.display = "none";
        }
        // $scope.$apply();
        break;
      }
    }
  }
  $scope.modificar_facturas = function (factura, caso) {
    switch (caso) {
      case 'S':
        var i = $scope.list.gestionadas.findIndex(elemt => elemt.FACTURA == factura.FACTURA);
        if (i == -1) {
          factura.ESTADO = caso;
          factura.ESTADO_TEMP = 'RADICADA';
          $scope.sumpendiente = $scope.sumpendiente - Number(factura.VALOR2);
          $scope.lengthaprobada++;
          $scope.sumaprobada = $scope.sumaprobada + Number(factura.VALOR2);
          $scope.list.gestionadas.push(factura);
          var j = $scope.list.facturas.findIndex(elemt => elemt.FACTURA == factura.FACTURA);
          if (j != -1) {
            $scope.list.facturas.splice(j, 1);
            $scope.fin_switch();
          } else {
            swal("Error", "La factura " + factura.FACTURA + " no se encuentra en la facturas por gestionar", "error");
          }
        } else {
          swal("Error", "La factura " + factura.FACTURA + " ya se encuentra en la facturas gestionadas", "error");
        }
        break;
      case 'N':
        swal({
          title: 'Motivo de la devolución',
          input: 'select',
          inputOptions: $scope.motivos,
          inputPlaceholder: 'Seleccionar motivo',
          showCancelButton: true,
          confirmButtonText: 'Ok',
          cancelButtonText: 'Cancelar',
          inputValidator: function (value) {
            return new Promise(function (resolve, reject) {
              if (value !== '') {
                resolve();
              } else {
                reject('Por favor seleccione un motivo');
              }
            });
          }
        }).then(function (result) {
          if (result) {
            var i = $scope.list.gestionadas.findIndex(elemt => elemt.FACTURA == factura.FACTURA);
            if (i == -1) {
              factura.ESTADO = caso;
              factura.ESTADO_TEMP = 'DEVUELTA';
              factura.MOTIVO = result;
              $scope.sumpendiente = $scope.sumpendiente - Number(factura.VALOR2);
              $scope.lengthrechazada++;
              $scope.sumrechazada = $scope.sumrechazada + Number(factura.VALOR2);
              $scope.list.gestionadas.push(factura);
              var j = $scope.list.facturas.findIndex(elemt => elemt.FACTURA == factura.FACTURA);
              if (j != -1) {
                $scope.list.facturas.splice(j, 1);
                $scope.fin_switch();
              } else {
                swal("Error", "La factura " + factura.FACTURA + " no se encuentra en la facturas por gestionar", "error");
              }
            } else {
              swal("Error", "La factura " + factura.FACTURA + " ya se encuentra en la facturas gestionadas", "error");
            }
          }
        });
        break;
      case 'V':
        var i = $scope.list.facturas.findIndex(elemt => elemt.FACTURA == factura.FACTURA);
        if (i == -1) {
          if (factura.ESTADO == 'S') {
            $scope.lengthaprobada--;
            $scope.sumaprobada = $scope.sumaprobada - Number(factura.VALOR2);
          } else if (factura.ESTADO == 'N') {
            $scope.lengthrechazada--;
            $scope.sumrechazada = $scope.sumrechazada - Number(factura.VALOR2);
          }
          factura.ESTADO = caso;
          factura.ESTADO_TEMP = 'PENDIENTE';
          factura.MOTIVO = '0';
          $scope.sumpendiente = $scope.sumpendiente + Number(factura.VALOR2);
          $scope.list.facturas.push(factura);
          var j = $scope.list.gestionadas.findIndex(elemt => elemt.FACTURA == factura.FACTURA);
          if (j != -1) {
            $scope.list.gestionadas.splice(j, 1);
            $scope.fin_switch();
          } else {
            swal("Error", "La factura " + factura.FACTURA + " no se encuentra en la facturas gestionadas", "error");
          }
        } else {
          swal("Error", "La factura " + factura.FACTURA + " ya se encuentra en la facturas por gestionar", "error");
        }
        break;
      default:
        swal("Error", "Caso sin especificar: " + caso, "error");
        break;
    }
  }
  $scope.fin_switch = function () {
    if ($scope.list.facturas.length == 0 && $scope.list.total == $scope.list.gestionadas.length) {
      document.querySelector("#btn_radicar_facturas").style.display = "block";
    } else {
      document.querySelector("#btn_radicar_facturas").style.display = "none";
    }
    $scope.currentPage = 0;
    $scope.getData();
    setTimeout(() => {
      $scope.$apply();
    }, 50);
  }
  $scope.radicarFacturas = function () {
    if ($scope.list.gestionadas.findIndex(elemt => elemt.ESTADO == 'V') == -1 && $scope.list.total == $scope.list.gestionadas.length) {
      swal({
        title: 'Confirmar',
        text: "Facturas radicadas " + $scope.lengthaprobada + " y devueltas " + $scope.lengthrechazada + ":",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result) {
          // swal("Completado", "Facturas radicadas exitosamente", "success");
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          document.querySelector("#btn_radicar_facturas").style.display = "none";
          var jsonfac = angular.toJson($scope.list.gestionadas);
          $http({
            method: 'POST',
            url: "php/cuentasmedicas/rips/funcRips.php",
            data: { function: 'marcarFacturas', cantidad: $scope.list.gestionadas.length, facturas: jsonfac }
          }).then(function (response) {
            swal.close();
            if (response.data.Codigo == 0) {
              $scope.verLector = false;
              $scope.check_option = false;
              $scope.rip = {
                nit: '',
                recibo: '',
                codigo: ''
              }
              $scope.facturasconfirmadas = [];
              $scope.lengthpendientes = 0;
              $scope.lengthaprobada = 0;
              $scope.lengthrechazada = 0;
              $scope.list.facturas = [];
              $scope.list.gestionadas = [];
              $scope.list.total = 0;
              $scope.titulo = 'Buscar Facturas';
              swal({ title: "Completado", text: response.data.Nombre, showConfirmButton: true, type: "success" });
            } else {
              swal({ title: "Ocurrio un error", text: response.data.Nombre, showConfirmButton: true, type: "warning" });
            }
            Instascan.Camera.getCameras().then(function (cameras) {
              if (cameras.length > 0) {
                $scope.scanner.start(cameras[0]);
              } else {
                swal("Importante", "Camara no detectada.", "warning");
              }
            }).catch(function (e) {
              console.error(e);
            });
          })
        }
      })
    } else {
      swal({ title: "Importante", text: "Gestione las facturas pendientes para radicar.", showConfirmButton: true, type: "warning", timer: 1200 });
    }
  }

  // Paginacion
  $scope.currentPage = 0;
  $scope.pageSize = 10;
  $scope.filter_factura = "";
  $scope.getData = function () {
    // if ($scope.medicamentos.orden != "") {
    //  return $filter('filter')($filter('orderBy')($scope.autorizaciones, 'estado'), $scope.filter_factura);
    // } else {
    return $filter('filter')($scope.list.facturas, $scope.filter_factura);
    // }
  }
  $scope.numberOfPages = function () {
    return Math.ceil($scope.getData().length / $scope.pageSize);
  }
  $scope.$watch('filter_factura', function (newValue, oldValue) {
    if (oldValue != newValue) {
      $scope.currentPage = 0;
    }
  }, true);
  $scope.btns_paginacion = function (value) {
    $scope.currentPage = value;
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  $scope.all = function () {
    for (let index = 0; index < ($scope.list.total - 1); index++) {
      $scope.modificar_facturas($scope.list.facturas[0], 'S');
    }
  }
}])     