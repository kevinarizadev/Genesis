'use strict';
angular.module('GenesisApp')
  .controller('autorizacionipsController', ['$scope', '$http', '$location', 'ngDialog',
    function ($scope, $http, $location, ngDialog) {
      $(document).ready(function () {
        $('.tooltipped').tooltip({ delay: 50 });
        $('#modaldetalle').modal();
        $('#modaleditardetalle').modal();
      });
      $(document).ready(function() {
        $('#modalpopUp').modal();
    });
      setTimeout(() => {
        $('#modalpopUp').modal("open");
    }, 500);
      var dat = { prov: 'navb' }
      $.getJSON("php/obtenersession.php", dat)
        .done(function (respuesta) {
          $scope.sesdata = respuesta;
          $scope.nit = $scope.sesdata.nit;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          console.log("navbar error obteniendo variables");
        });
      $scope.tabI = true;
      $scope.resultado=[];
      $scope.tabII = false;
      $scope.tabIII = false;
      $scope.tabIV = false;
      $scope.tabV = false;
      $scope.activeI = 'active final';
      $scope.activeII = 'none';
      $scope.activeIII = 'none';
      $scope.activeIV = 'none';
      $scope.activeV = 'none';
      $scope.inactivepaso2 = true;
      $scope.inactivepaso3 = true;
      $scope.buscaraut = "";
      $scope.buscarauta = "";
      $scope.prioridadsw = false;
      $scope.hijodesw = false;
      $scope.requierecama = false;
      $scope.switchinit1 = true;
      $scope.switchinit2 = true;
      $scope.switchinit3 = true;
      $scope.switchinit4 = true;
      $scope.inactivefields = true;
      $scope.inactiveeditcabezera = true;
      $scope.fecsolicitud = '';
      $scope.inactiveaut_activa = true;
      $scope.inactiveaut2 = true;
      $scope.inactivepro = true;
      $scope.solicitud = {
        tipodocumento: '',
        documento: '',
        nombre: '',
        fecingreso: '',
        origen: '',
        ubipaciente: '',
        tiposervicio: '',
        servicio: '',
        contrato: '',
        cama: '',
        dxprincipal: '',
        nomdxprincipal: '',
        dxsecundario: '',
        nomdxsecundario: '',
        justificacion: '',
        medico: '',
        cargomedico: '',
        codips: '',
        nombreips: '',
        nit: '',
        prioridad: '',
        hijode: '',
        fecsolicitud: '',
        ruta: ''
      }

      $scope.searchaut = '';

      $scope.descargafile = function (ruta) {
        $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: {
                function: 'descargaAdjunto',
                ruta: ruta
            }
        }).then(function (response) {
            //window.open("https://genesis.cajacopieps.com//temp/"+response.data);
            window.open("temp/" + response.data);
        });
    }
      $scope.limpiar_solicitud = function () {
        $("#adjunto")[0].value = "";
        $scope.archivobase = "";
        $scope.extensionarchivo = "";
        $scope.inactivepaso1 = false;
        $scope.inactivepaso2 = true;
        $scope.inactivepaso3 = true;
        $scope.tabI = true;
        $scope.tabII = false;
        $scope.tabIII = false;
        $scope.tabIV = false;
        $scope.activeI = 'active final';
        $scope.activeII = 'none';
        $scope.activeIII = 'none';
        $scope.activeIV = 'none';
        $scope.inactivepaso2 = true;
        $scope.inactivepaso3 = true;
        $scope.buscaraut = "";
        $scope.buscarauta = ""; 
        $scope.prioridadsw = false;
        $scope.hijodesw = false;
        $scope.requierecama = false;
        $scope.switchinit1 = true;
        $scope.switchinit2 = true;
        $scope.switchinit3 = true;
        $scope.switchinit4 = true;
        $scope.inactivefields = true;
        $scope.inactiveeditcabezera = true;
        $scope.fecsolicitud = '';
        $scope.inactiveaut2 = true;
        $scope.inactivepro = true;
        $scope.diagnostico1_nombre = "";
        $scope.diagnostico2_nombre = "";
        $scope.solicitud = {
          tipodocumento: '',
          documento: '',
          nombre: '',
          fecingreso: '',
          origen: '',
          ubipaciente: '',
          tiposervicio: '',
          servicio: '',
          contrato: '',
          cama: '',
          dxprincipal: '',
          diagnostico1_nombre: '',
          dxsecundario: '',
          diagnostico2_nombre: '',
          justificacion: '',
          medico: '',
          cargomedico: '',
          codips: '',
          nombreips: '',
          nit: '',
          prioridad: '',
          hijode: '',
          fecsolicitud: '',
          ruta: ''
        }

      }
      $scope.detalle = {
        producto: '',
        nombre: '',
        cantidad: '',
        producto2: '',
        nombre2: '',
        cantidad2: ''
      }
      $scope.afiliado = [];
      $scope.encabezado = {
        fecha: '',
        servicio: '',
        coddiag: '',
        nomdiag: '',
        justificacion: ''
      }
      $(".paso1").addClass("activebtn-step");
      $('.content-step1').addClass('animated slideInRight');
      $scope.inactivepaso1 = false;
      //Al iniciar
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
        data: { function: 'obtenerOrigenes' }
      }).then(function (response) {
        $scope.listOrigenes = response.data;
      })
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
        data: { function: 'obtenerUbicacionSolicitud' }
      }).then(function (response) {
        $scope.listUbicaciones = response.data;
      })
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
        data: { function: 'obtenerTipoServicio' }
      }).then(function (response) {
        $scope.listTipoServicio = response.data;
      })
      $scope.obtenerServicios = function () {
        if ($scope.solicitud.contrato != "") {
          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
            data: { function: 'obtenerServicios', contrato: $scope.solicitud.contrato }
          }).then(function (response) {
            $scope.listServicios = response.data;
          })
        }
      }
      $scope.obtenerServiciosedit = function () {
        if ($scope.contrato != "" && $scope.contrato != undefined && $scope.contrato != null) {
          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
            data: { function: 'obtenerServicios', contrato: $scope.contrato }
          }).then(function (response) {
            $scope.listServiciosedit = response.data;
          })
        }
      }
      $scope.obtenerNombre = function () {
        if ($scope.solicitud.tipodocumento != '' && $scope.solicitud.documento != '') {
          $scope.switchinit1 = false;
          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
            data: {
              function: 'obtenerNombre', documento: $scope.solicitud.documento,
              tipodocumento: $scope.solicitud.tipodocumento
            }
          }).then(function (response) {
            if (response.data["0"].CODIGO == "1") {
              let date = new Date()
              $scope.solicitud.fecsolicitud = new Date(date.getFullYear(), (date.getMonth()), date.getDate(), date.getHours(), date.getMinutes());
              $scope.solicitud.nombre = response.data["0"].NOMBRE;
              $scope.afiliado = response.data["0"];
              $scope.obtenerContratos();
              $scope.inactivefields = false;
            } else {
              $scope.inactivefields = true;
              $scope.solicitud.nombre = '';
              swal('Importante', 'Afiliado no registra en la base de datos', 'info');
            }
          })
        } else {
          if (($scope.solicitud.tipodocumento == '' || $scope.solicitud.documento == '' || $scope.solicitud.documento == undefined) && $scope.switchinit1 == false) {

            $scope.inactivefields = true;
            $scope.solicitud.nombre = '';
          }
        }
      }
      $scope.obtenerNombreIps = function () {
        if ($scope.solicitud.codips != '' && $scope.solicitud.codips != undefined) {
          $scope.switchinit2 = false;
          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
            data: { function: 'obtenerNombreIps', ips: $scope.solicitud.codips }
          }).then(function (response) {
            if (response.data.existe == "1") {
              $scope.solicitud.nombreips = response.data.Nombre;
            } else {
              swal('Advertencia', 'Nit no encontrado', 'warning');
            }
          })
        } else {
          if (($scope.solicitud.codips == '' || $scope.solicitud.codips == undefined) && $scope.switchinit2 == false) {

          }
        }
      }
      $scope.obtenerContratos = function () {
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
          data: {
            function: 'obtenerContratos', nit: $scope.nit,
            regimen: $scope.afiliado.REGIMEN
          }
        }).then(function (response) {

          if(response.data[0].CODIGO==0){
            swal('Advertencia', response.data[0].NOMBRE, 'warning');
          }else{
             $scope.listContratos = response.data;
          }
        })
      }
      $scope.obtenerDiagnostico = function (tipo) {
        if (tipo == 'ppal') {
          var codigo = $scope.solicitud.dxprincipal;
        } else {
          var codigo = $scope.solicitud.dxsecundario;
        }
        if (codigo != '' && codigo != null && codigo != undefined) {
          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
            data: {
              function: 'obtenerDiagnostico', codigo: codigo,
              sexo: $scope.afiliado.SEXO,
              edad: $scope.afiliado.EDAD
            }
          }).then(function (response) {
            if (response.data["0"].Codigo == '0') {
              swal('Importante', 'Diagnostico Errado', 'info');
            } else {
              if (tipo == 'ppal') {
                $scope.solicitud.nomdxprincipal = response.data["0"].Nombre;
              } else {
                $scope.solicitud.nomdxsecundario = response.data["0"].Nombre;
              }
            }
          })
        }
      }
       $scope.init = function () {
        $scope.tabI = false;
        $scope.tabII = false;
        $scope.tabIII = false;
        $scope.tabIV = false;
        $scope.tabV = false;
        $scope.activeV = 'none';
        $scope.activeI = 'none';
        $scope.activeII = 'none';
        $scope.activeIII = 'none';
        $scope.activeIV = 'none';
      }
      $scope.setTab = function (opcion) {
        $scope.init();
        switch (opcion) {
          case 1:
            $scope.tabI = true;
            $scope.tabII = false;
            $scope.tabIII = false;
            $scope.tabIV = false;
            $scope.activeI = 'active final';
            $scope.activeII = 'none';
            $scope.activeIII = 'none';
            $scope.activeIV = 'none';
            break;
          case 2:
            $scope.tabI = false;
            $scope.tabII = true;
            $scope.tabIII = false;
            $scope.tabIV = false;
            $scope.activeI = 'none';
            $scope.activeII = 'active final';
            $scope.activeIII = 'none';
            $scope.activeIV = 'none';
            break;
          case 3:
            $scope.tabI = false;
            $scope.tabII = false;
            $scope.tabIII = true;
            $scope.tabIV = false;
            $scope.activeI = 'none';
            $scope.activeII = 'none';
            $scope.activeIII = 'active final';
            $scope.activeIV = 'none';
            break;
          case 4:
            $scope.tabI = false;
            $scope.tabII = false;
            $scope.tabIII = false;
            $scope.tabIV = true;
            $scope.activeI = 'none';
            $scope.activeII = 'none';
            $scope.activeIII = 'none';
            $scope.activeIV = 'active final';
            break;
            case 5:
            $scope.tabI = false;
            $scope.tabII = false;
            $scope.tabIII = false;
            $scope.tabIV = false;
            $scope.tabV = true;
            $scope.activeI = 'none';
            $scope.activeII = 'none';
            $scope.activeIII = 'none';
            $scope.activeIV = 'none';
            $scope.activeV = 'active final';
            break;
          default:

        }
      }
      $scope.wizardstep = function (op, ac) {
        $('.content-step1').removeClass('animated slideInRight slideOutLeft');
        $('.content-step2').removeClass('animated slideInRight slideOutLeft');
        $('.content-step3').removeClass('animated slideInRight slideOutLeft');
        switch (op) {
          case "paso1":
            $scope.insertarSolicitud();
            // $(".paso1").removeClass("activebtn-step").addClass("donebtn-step");
            // $(".paso2").addClass("activebtn-step");
            // $scope.inactivepaso1 = true;
            // $('.content-step2').addClass('animated slideInRight');
            // $scope.inactivepaso2 = false;
            break;
          case "paso2":
            $(".paso2").removeClass("activebtn-step").addClass("donebtn-step");
            $(".paso3").addClass("activebtn-step");
            $scope.inactivepaso2 = true;
            $scope.inactivepaso3 = false;
            $('.content-step3').addClass('animated slideInRight');
            $scope.obtenerResumen();
            break;
          case "paso3":
            if (ac == "finish") {
              $scope.finalizarSolicitud();
            } else {
              $(".paso3").removeClass("activebtn-step");
              $(".paso2").removeClass("donebtn-step").addClass("activebtn-step");
              $scope.inactivepaso3 = true;
              $scope.inactivepaso2 = false;
              $('.content-step2').addClass('animated slideInLeft');
            }
            break;
          default:
        }
      }
      function formatDate(date) {
        var dd = ('0' + date.getDate()).slice(-2);
        var mm = ('0' + (date.getMonth() + 1)).slice(-2);
        var yyyy = date.getFullYear();
        var hh = date.getHours();
        var mi = date.getMinutes();
        return dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + mi;
      }
      function parsetToday(date) {
        var dd = ('0' + date.getDate()).slice(-2);
        var mm = ('0' + (date.getMonth() + 1)).slice(-2);
        var yyyy = date.getFullYear();
        var hh = date.getHours();
        var mi = date.getMinutes();
        return yyyy + '-' + mm + '-' + dd;//+' '+hh+':'+mi+':00';
      }
      function parsedia(date) {
        var yyyy = date.getFullYear();
        var dd = ('0' + date.getDate()).slice(-2);
        var mm = ('0' + (date.getMonth() + 1)).slice(-2);
        return yyyy + '-' + mm + '-' + dd;//+' '+hh+':'+mi+':00';
      }
       function parsehora(date) {

        var hh = date.getHours();
        var mi = date.getMinutes();
        return hh+':'+mi+':00';
      }
      //TAB I
      $scope.inactivebtnsolicitud = false;
      $scope.insertarSolicitud = function () {
        if (new Date($scope.solicitud.fecsolicitud) > new Date()) {
          swal("Importante", "La fecha de ingreso no puede ser superior a la hora actual", "info");
        } else {
          if ($scope.solicitud.dxprincipal) {
            swal({
              title: 'Confirmar',
              text: "Esta seguro que desea crear la solicitud?",
              type: 'question',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Confirmar'
            }).then((result) => {
              if (result) {
                $scope.inactivebtnsolicitud = true;
                if ($scope.prioridadsw == true) {
                  $scope.solicitud.prioridad = 'S';
                } else {
                  $scope.solicitud.prioridad = 'N';
                };
                if ($scope.hijodesw == true) {
                  $scope.solicitud.hijode = 'S';
                } else {
                  $scope.solicitud.hijode = 'N';
                };
                $scope.solicitud.fecingreso = formatDate($scope.solicitud.fecsolicitud);
                $scope.solicitud.nit = $scope.nit;
                if ($scope.solicitud.dxsecundario == "" || $scope.solicitud.dxsecundario == null || $scope.solicitud.dxsecundario == undefined) {
                  $scope.solicitud.dxsecundario = "0";
                }
                if($scope.solicitud.viaingreso=='U'){
                  if ($scope.solicitud.urgencia==undefined){
                    swal("Importante", "El Código de urgencia es obligatorio si la via de ingreso es por Urgencia", "info");
                    return;
                  }
                }
                // subir ruta
                if ($scope.archivobase != null) {
                  $http({
                    method: 'POST',
                    url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
                    data: {
                      function: 'adjuntos_ftp',
                      achivobase: $scope.archivobase,
                      ext: $scope.extensionarchivo,
                    }
                  }).then(function (response) {
                    console.log(response);
                    $scope.solicitud.ruta = response.data;
                    var data = JSON.stringify($scope.solicitud);
                    if (($scope.solicitud.ruta != '0 - Error') && ($scope.solicitud.ruta.substr(0,3)!="<br")) {
                      $http({
                        method: 'POST',
                        url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
                        data: { function: 'insertarSoplicitud', data: data }
                      }).then(function (response) {
                        $scope.resultado = response.data;
                        if ($scope.resultado.error == '1') { 
                          $(".paso1").removeClass("activebtn-step").addClass("donebtn-step");
                          $(".paso2").addClass("activebtn-step");
                          $scope.inactivepaso1 = true;
                          $('.content-step2').addClass('animated slideInRight');
                          $scope.inactivepaso2 = false;
                        }  
                        if ($scope.resultado.error == '0') { 
                          swal('Importante', $scope.resultado.observacion, 'info');
                        }
                        //else 
                        if ($scope.resultado.Codigo == '1') {
                          swal('Importante', $scope.resultado.Nombre, 'info');
                        }
                       
                        $scope.inactivebtnsolicitud = false;
                      })
                    }else{
                      swal("Importante", "No se cargo el archivo correctamente. Favor intente nuevamente", "info");
                    }
                    
                  });
                } else {
                  swal("Importante", "No se cargo el archivo correctamente. Favor intente nuevamente", "info");
                }
                //procedimientos subir infor

              }
            })
          } else {
            swal("Importante", "Favor llenar el diagnostico nuevamente", "info");
          }
        }
      }
      $scope.obtenerProducto = function () {
        if ($scope.detalle.producto != '') {
          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
            data: {
              function: 'obtenerProducto', producto: $scope.detalle.producto,
              clasificacion: $scope.resultado.servicio,
              regimen: $scope.resultado.regimen,
              contrato: $scope.resultado.contrato
            }
          }).then(function (response) {
            if (response.data["0"].CODIGO != "0") {
              $scope.detalle.nombre = response.data["0"].NOMBRE;
            } else {
              swal('Importante', response.data["0"].MENSAJE, 'info');
            }
          })
        }
      }
      $scope.validarUbicacionPaciente = function (ubi) {
        if (ubi == "H") {
          $scope.requierecama = true;
        } else {
          $scope.requierecama = false;
        }
      }
      $scope.insertarDetalle = function () {
         if ($scope.detalle.cantidad>0) {
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
          data: {
            function: 'insertarDetalle', producto: $scope.detalle.producto,
            cantidad: $scope.detalle.cantidad,
            numero: $scope.resultado.numero,
            ubicacion: $scope.resultado.ubicacion
          }
        }).then(function (response) {
          $scope.resultadodetalle = response.data;
          if ($scope.resultadodetalle.Codigo == '0') {
            $scope.detalle = {
              producto: '',
              nombre: '',
              cantidad: ''
            };
            $scope.obtenerResumen();
            swal('Completado', $scope.resultadodetalle.Nombre, 'success');
          } else {
            swal('Importante', $scope.resultadodetalle.Nombre, 'info');
          }
        })
        } else {
          swal('Importante', 'Cantidad Invalida', 'info');
        }
      }
      $scope.eliminarProducto = function (numero, ubicacion, renglon, tipo) {
        swal({
          title: 'Confirmar',
          text: "Esta seguro que desea eliminar este producto?",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result) {
            $http({
              method: 'POST',
              url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
              data: {
                function: 'eliminarProducto', numero: numero,
                ubicacion: ubicacion,
                renglon: renglon
              }
            }).then(function (response) {
              if (response.data.codigo == "1") {
                if (tipo == 'edit') {
                  $http({
                    method: 'POST',
                    url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
                    data: {
                      function: 'obtenerResumen', numero: numero,
                      ubicacion: ubicacion
                    }
                  }).then(function (response) {
                    if (response.data["0"].CODIGO == "0") {
                      swal('Advertencia', 'Error al encontrar detalle', 'warning');
                    } else {
                      $scope.resumenedit = response.data["0"];
                      $scope.resumeneditcabeza = $scope.resumenedit.CABEZA["0"];
                    }
                  })
                } else {
                  $scope.obtenerResumen();
                }
              } else {
                swal('Advertencia', response.data.mensaje, 'warning');
              }
            })
          }
        })

      }
      $scope.obtenerResumen = function () {
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
          data: {
            function: 'obtenerResumen', numero: $scope.resultado.numero,
            ubicacion: $scope.resultado.ubicacion
          }
        }).then(function (response) {
          if (response.data["0"].CODIGO == "0") {
            swal('Advertencia', 'Error al encontrar detalle', 'warning');
          } else {
            $scope.resumen = response.data["0"];
    
            $scope.resumencabeza = $scope.resumen.CABEZA["0"];
          }
        })
      }
      $scope.finalizarSolicitud = function () {
        $scope.tabII = false;
        $scope.tabIII = false;
        $scope.tabIV = false;
        $scope.tabI = true;
        $scope.activeII = 'none';
        $scope.activeIII = 'none';
        $scope.activeIV = 'none';
        $scope.activeI = 'active final';
        $scope.inactivepaso2 = true;
        $scope.inactivepaso3 = true;
        $scope.buscaraut = "";
        $scope.buscarauta = "";
        $scope.prioridadsw = false;
        $scope.hijodesw = false;
        $scope.switchinit1 = true;
        $scope.switchinit2 = true;
        $scope.switchinit3 = true;
        $scope.switchinit4 = true;
        $scope.inactivefields = true;
        $scope.inactiveeditcabezera = true;
        $scope.fecsolicitud = '';
        $scope.inactiveaut2 = true;
        $scope.inactivepro = true;
        $scope.solicitud = {
          tipodocumento: '',
          documento: '',
          nombre: '',
          fecingreso: '',
          origen: '',
          ubipaciente: '',
          tiposervicio: '',
          servicio: '',
          contrato: '',
          cama: '',
          dxprincipal: '',
          nomdxprincipal: '',
          dxsecundario: '',
          nomdxsecundario: '',
          justificacion: '',
          medico: '',
          cargomedico: '',
          codips: '',
          nombreips: '',
          nit: '',
          prioridad: '',
          hijode: '',
          fecsolicitud: ''
        }
        $scope.detalle = {
          producto: '',
          nombre: '',
          cantidad: '',
          producto2: '',
          nombre2: '',
          cantidad2: ''
        }
        $scope.afiliado = [];
        $scope.encabezado = {
          fecha: '',
          servicio: '',
          coddiag: '',
          nomdiag: '',
          justificacion: ''
        }
        $('.content-step1').removeClass('animated slideInRight slideOutLeft');
        $('.content-step2').removeClass('animated slideInRight slideOutLeft');
        $('.content-step3').removeClass('animated slideInRight slideOutLeft');
        $(".paso2").removeClass("activebtn-step donebtn-step");
        $(".paso3").removeClass("activebtn-step donebtn-step");
        $(".paso1").removeClass("activebtn-step donebtn-step");
        $(".paso1").addClass("activebtn-step");
        $('.content-step1').addClass('animated slideInRight');
        $scope.inactivepaso1 = false;
        setTimeout(function () {
          swal({ title: "Completado", text: "Solicitud finalizada correctamente", type: "success", timer: 1500 });
        }, 10);
      }
      //TAB II
      $scope.obtenerAutorizaciones = function (estado, codigo) {
        swal({ title: 'Cargando autorizacion' });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
          data: { function: 'obtenerAutorizaciones', codigo: codigo, estado: estado, nit: $scope.nit }
        }).then(function (response) {
          if (estado == 'A') {
            if (response.data["0"].Codigo != "0") {
              $scope.listAutorizacionesactivas = response.data;
              $scope.inactiveaut_activa = false;
            } else {
              $scope.inactiveaut_activa = true;
            }
          }
          else {
            if (response.data["0"].Codigo != "0") {
              $scope.listAutorizacionesprocesadas = response.data;
              $scope.inactiveaut2 = false;
            } else {
              $scope.inactiveaut2 = true;
            }

          }
          swal.close();
        })
      }
      $scope.obtenerDiagnosticoEdit = function () {
        if ($scope.encabezado.coddiag != '') {
          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
            data: {
              function: 'obtenerDiagnostico', codigo: $scope.encabezado.coddiag,
              sexo: $scope.sexo,
              edad: $scope.edad
            }
          }).then(function (response) {
            if (response.data["0"].Codigo == '0') {
              swal('Importante', 'Diagnostico Errado', 'info');
            } else {
              $scope.encabezado.nomdiag = response.data["0"].Nombre;
            }
          })
        }
      }
      $scope.editarEncabezado = function () {
        $scope.encabezado.fecha = new Date($scope.resumeneditcabeza.FECHA_PARSE);
        $scope.encabezado.servicio = $scope.resumeneditcabeza.CODSERVICIO.toString();
        $scope.encabezado.coddiag = $scope.resumeneditcabeza.CODDX;
        $scope.obtenerDiagnosticoEdit();
        $scope.encabezado.justificacion = $scope.resumeneditcabeza.JUSTIFICACION;
        $scope.inactiveeditcabezera = !$scope.inactiveeditcabezera;
      }
      $scope.obtenerProductoEdit = function () {
        if ($scope.detalle.producto2 != '') {
          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
            data: {
              function: 'obtenerProducto', word: $scope.detalle.producto2,
              clasificacion: $scope.clasificacion,
              regimen: $scope.regimen,
              contrato: $scope.contrato
            }
          }).then(function (response) {
            if (response.data["0"].CODIGO != "0") {
              $scope.detalle.nombre2 = response.data["0"].NOMBRE;
            } else {
              swal('Advertencia', response.data["0"].MENSAJE, 'warning');
            }
          })
        }
      }
      $scope.gestionar_autorizaciones_activas=function(CLASIFICACION,CODIGO,UBICACION,DOC,TIPODOC,SEXO,EDAD,REGIMEN,CONTRATO){
        $scope.inactiveeditcabezera = true;
        $scope.resumen = [];
        $scope.resumencabeza = [];
           $scope.resultado = [];
        $scope.detalle.producto2 = '';
        $scope.detalle.nombre2 = '';
        $scope.detalle.cantidad2 = '';

        $scope.clasificacion = CLASIFICACION;
        $scope.resultado.servicio = CLASIFICACION;
         $scope.resultado.edad = EDAD;
        $scope.resultado.sexo = SEXO;
        $scope.codeditdetalle = CODIGO;
        $scope.ubieditdetalle = UBICACION;
        $scope.docafiliado = DOC;
        $scope.tipodocafiliado = TIPODOC;
        $scope.sexo = SEXO;
        $scope.edad = EDAD;
        $scope.resultado.regimen= REGIMEN;
        $scope.resultado.contrato= CONTRATO;
        $scope.regimen = REGIMEN;
        $scope.contrato = CONTRATO;
        $scope.obtenerServiciosedit();
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
          data: {
            function: 'obtenerResumen', numero: $scope.codeditdetalle,
            ubicacion: $scope.ubieditdetalle
          }
        }).then(function (response) {
          if (response.data["0"].CODIGO == "0") {
            swal('Advertencia', 'Error al encontrar detalle', 'warning');
          } else {
            $scope.resumenedit = response.data["0"];
            $scope.resumeneditcabeza = $scope.resumenedit.CABEZA["0"];
            $('#modaleditardetalle').modal("open");
          }
        })
      }
      $scope.actualizarEncabezado = function () {
        var dia = parsedia($scope.encabezado.fecha);
        var hora = parsehora($scope.encabezado.fecha);

    //    var date = formatDate(new Date($scope.encabezado.fecha));
        swal({
          title: 'Confirmar',
          text: "Esta seguro que desea actualizar los datos?",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result) {
            $http({
              method: 'POST',
              url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
              data: {
                function: 'actualizarEncabezado', numero: $scope.codeditdetalle,
                ubicacion: $scope.ubieditdetalle,
                tipodocumento: $scope.tipodocafiliado,
                documento: $scope.docafiliado,
                fecha: dia,
                hora: hora,
                servicio: $scope.encabezado.servicio,
                diagnostico: $scope.encabezado.coddiag,
                justificacion: $scope.encabezado.justificacion
              }
            }).then(function (response) {
              if (response.data.error == "1") {
                $http({
                  method: 'POST',
                  url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
                  data: {
                    function: 'obtenerResumen', 
                    numero: $scope.codeditdetalle,
                    ubicacion: $scope.ubieditdetalle
                  }
                }).then(function (response) {
                  if (response.data["0"].CODIGO == "0") {
                    swal('Advertencia', 'Error al encontrar detalle', 'warning');
                  } else {

                    $scope.resumenedit = response.data["0"];
                    $scope.resultado.servicio=$scope.resumenedit.CABEZA["0"].CLASIFICACION;
                    $scope.resultado.contrato=$scope.resumenedit.CABEZA["0"].CONTRATO
                    $scope.resumeneditcabeza = $scope.resumenedit.CABEZA["0"];
                    $scope.clasificacion = $scope.resumenedit.CABEZA["0"].CLASIFICACION;
                    $scope.inactiveeditcabezera = true;
                    swal({ title: "Completado", text: "Datos Actualizados", type: "success", timer: 1500 });
                  }
                })
              } else {
                swal('Advertencia', response.data.mensaje, 'warning')
              }
            })
          }
        })
      }
      $scope.insertarDetalleEdit = function () {
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
          data: {
            function: 'insertarDetalle', producto: $scope.detalle.producto,
            cantidad: $scope.detalle.cantidad2,
            numero: $scope.codeditdetalle,
            ubicacion: $scope.ubieditdetalle
          }
        }).then(function (response) {
          $scope.resultadodetalleedit = response.data;
          if ($scope.resultadodetalleedit.Codigo == '0') {
            $scope.detalle.producto = '';
            $scope.detalle.nombre = '';
            $scope.detalle.cantidad2 = '';
            $http({
              method: 'POST',
              url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
              data: {
                function: 'obtenerResumen', numero: $scope.codeditdetalle,
                ubicacion: $scope.ubieditdetalle
              }
            }).then(function (response) {
              if (response.data["0"].CODIGO == "0") {
                swal('Advertencia', 'Error al encontrar detalle', 'warning');
              } else {
                $scope.resumenedit = response.data["0"];
                $scope.resumeneditcabeza = $scope.resumenedit.CABEZA["0"];
              }
            })
          } else {
            swal('Importante', $scope.resultadodetalleedit.Nombre, 'info');
          }
        })
      }
      //TAB III
      $scope.print = function (tipo, numero_largo, ubicacion, numero) {
        if (tipo == 'autorizacion')
           window.open('views/autorizaciones/formatoautorizacionPrint.php?numero=' + numero + '&ubicacion=' + ubicacion, '_blank');

           // window.open('views/autorizaciones/formatoautorizacion2.php?numero=' + data, '_blank');
        else
          window.open('views/autorizaciones/formatoautorizacion3.php?numero=' + numero_largo, '_blank');
      }
      $scope.verDetalle = function (num, ubi, obs) {
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
          data: {
            function: 'obtenerResumen', numero: num,
            ubicacion: ubi
          }
        }).then(function (response) {
          if (response.data["0"].CODIGO == "0") {
            swal('Advertencia', 'Error al encontrar detalle', 'warning');
          } else {
            $scope.justificacion = obs;
            $scope.resumendetalle = response.data["0"].DETALLE;
            $('#modaldetalle').modal("open");
          }
        })
      }
      $scope.table = $('#tableauta').DataTable({
        dom: 'lBsfrtip',
        buttons: [],
        data: [],
        columns: [
          { data: "CODIGO" },
          { data: "TIPODOC" },
          { data: "DOC" },
          { data: "FECHA" },
          { data: "ESTADO" },
          { data: "SERVICIO" }
        ],
        language: {
          "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        },
        lengthMenu: [[10, 50, -1], [10, 50, 'Todas']],
        order: [[0, "desc"]]
      });
      $('#tableauta tbody').on('click', 'tr', function () {
        $scope.inactiveeditcabezera = true;
        $scope.resumen = [];
        $scope.resumencabeza = [];
        $scope.detalle.producto2 = '';
        $scope.detalle.nombre2 = '';
        $scope.detalle.cantidad2 = '';

        $scope.clasificacion = $scope.table.row(this).data().CLASIFICACION;
        $scope.resultado.servicio = $scope.table.row(this).data().CLASIFICACION;
        $scope.codeditdetalle = $scope.table.row(this).data().CODIGO;
        $scope.ubieditdetalle = $scope.table.row(this).data().UBICACION;
        $scope.docafiliado = $scope.table.row(this).data().DOC;
        $scope.tipodocafiliado = $scope.table.row(this).data().TIPODOC;
        $scope.sexo = $scope.table.row(this).data().SEXO;
        $scope.edad = $scope.table.row(this).data().EDAD;
        $scope.resultado.regimen=$scope.table.row(this).data().REGIMEN;
        $scope.resultado.contrato=$scope.table.row(this).data().CONTRATO;
        $scope.regimen = $scope.table.row(this).data().REGIMEN;
        $scope.contrato = $scope.table.row(this).data().CONTRATO;
        $scope.obtenerServiciosedit();
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
          data: {
            function: 'obtenerResumen', numero: $scope.codeditdetalle,
            ubicacion: $scope.ubieditdetalle
          }
        }).then(function (response) {
          if (response.data["0"].CODIGO == "0") {
            swal('Advertencia', 'Error al encontrar detalle', 'warning');
          } else {
            $scope.resumenedit = response.data["0"];
            $scope.resumeneditcabeza = $scope.resumenedit.CABEZA["0"];
            $('#modaleditardetalle').modal("open");
          }
        })
      });
      //TAB IV
      $scope.findProducto = function (find) {
        if (find.length >= 4) {
          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
            data: { function: 'findproducto', word: find }
          }).then(function (response) {
            if (response.data["0"].Codigo != "0") {
              $scope.listProductos = response.data;
              $scope.inactivepro = false;
            } else {
              // swal("Importante", "No se ha encontrado ningun dato", "info");
              $scope.inactivepro = true;
            }
          })
        } else {
          if (find.length == 0) {
            $scope.inactivepro = true;
          }
        }

      }
      //funciones de cambio
      $scope.obtenerBase = function () {
        
          if ($("#adjunto")[0].files[0].size > 7340032) {
            //swal('Advertencia','El archivo excede el peso limite (7 MB)','warning')
            // notification.getNotification('warning','El archivo excede el peso limite (7 MB)','Notificación');
            $("#adjunto")[0].value = "";
            $scope.archivobase = "";
            $scope.extensionarchivo = "";
          } else {
            if ($("#adjunto")[0].files && $("#adjunto")[0].files[0]) {
              var FR = new FileReader();
              FR.addEventListener("load", function (e) {
                $scope.adjunto = $("#adjunto")[0].value;
                $scope.archivobase = e.target.result;
                var name = $("#adjunto")[0].files[0].name;
                $scope.extensionarchivo = name.split('.').pop();
              });
              FR.readAsDataURL($("#adjunto")[0].files[0]);
            }
          }
        

      }

      $scope.filtrar_diagnosticos = function (tipo,modal) {
        $scope.tipo = tipo;
        $scope.modal=modal?true:false;
        if (tipo == 1) {
          $scope.nombre_tipo = "Selecciona el Diagnostico Principal"
        } else if (tipo == 3) {
          $scope.nombre_tipo = "Selecciona el Producto"
          $scope.dialogNewAfil = ngDialog.open({
            template: 'views/autorizaciones/modal_filtrar.html',
            className: 'ngdialog-theme-plain',
            scope: $scope
          });
          return;
        } else if (tipo == 4){
          $scope.nombre_tipo = "Selecciona la IPS Solicitante"
        }else {
          $scope.nombre_tipo = "Selecciona el Diagnostico Segundario"
        }
        $scope.dialogNewAfil = ngDialog.open({
          template: 'views/siau/modal_diagnosticos.html',
          className: 'ngdialog-theme-plain',
          scope: $scope
        });

      }
      $scope.removeSeleccion = function () {

        if ($scope.tipo == 1) {
          $('#DM' + $scope.diagnostico1).removeClass('eleacti');
          $scope.solicitud.dxprincipal = "0";
          $scope.diagnostico1_nombre = "";
        } if ($scope.tipo == 4) {
          $('#DM' + $scope.diagnostico1).removeClass('eleacti');
          $scope.solicitud.codips = "0";
          $scope.solicitud.nombreips = "";
        }else {
          $('#DM' + $scope.diagnostico2).removeClass('eleacti');
          $scope.solicitud.dxsecundario = "0";
          $scope.diagnostico2_nombre = "";
        }
      }
      $scope.elegir_diagnostico = function (codigo, nombre, valor) {
        $("#DM" + codigo).addClass('eleacti');
        $('#DM' + codigo).siblings().removeClass('eleacti');
        // $scope.hovering=true;
        if ($scope.tipo == 1 && $scope.modal==false) {
          $scope.solicitud.dxprincipal = codigo;
          $scope.diagnostico1_nombre = nombre;
        } else if ($scope.modal == true) {
          $scope.encabezado.coddiag=codigo;
          $scope.encabezado.nomdiag=nombre;
        } else if ($scope.tipo == 4) {
          $scope.solicitud.codips =codigo;
          $scope.solicitud.nombreips =nombre;
        }else {
          $scope.solicitud.dxsecundario = codigo;
          $scope.diagnostico2_nombre = nombre;
        }
      }
      $scope.cargarDiagnosticos = function (texto) {
        $scope.mostrar_inicial=false;
        $scope.mostrar_nada=false;
        $scope.coincidencia1 = texto
        if ($scope.tipo!=4  && $scope.coincidencia1.length > 3 && $scope.modal==false) {

          $scope.coincidencia = $scope.coincidencia1;

          if(!$scope.afiliado.SEXO){
            swal("Importante", "Para realizar los diagnostico favor ingresar los datos del Paciente", "info");
            $scope.Listardiagnosticos = undefined;            
            $scope.mostrar_inicial=true;

            return
          }
          if ($scope.hijodesw == true) {
            $scope.hijo = 1;
          } else {
            $scope.hijo = 0;
          }

          $http({
            method: 'POST',
            url: "php/siau/CodigoUrgencia/Rcodigourgencia.php",
            data: { function: 'obtenerdiagnostico', coincidencia: $scope.coincidencia, sexo: $scope.afiliado.SEXO, edad: $scope.afiliado.EDAD, hijo: $scope.hijo }
          }).then(function (response) {
            if (response.data.codigo == "-1") {
              $scope.Listardiagnosticos = undefined;
              $scope.mostrar_nada=true;
            } else {
              $scope.Listardiagnosticos = response.data;
            }
          })
        } else if ($scope.tipo==4 &&  $scope.coincidencia1.length > 6){
          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
            data: {
              function: 'obtenerListadoIps',  coincidencia : $scope.coincidencia1,
            }
          }).then(function (response) {
            if (response.data[0].Codigo == "0") {
              $scope.mostrar_inicial=false;
              $scope.Listardiagnosticos=undefined;
              $scope.mostrar_nada=true;
            } else {
              $scope.mostrar_nada=false;
              $scope.Listardiagnosticos = response.data;
            }
          })
        } else if ($scope.tipo!=4  && $scope.coincidencia1 != "" && $scope.coincidencia1.length >= 3){
          $http({
            method: 'POST',
            url: "php/siau/CodigoUrgencia/Rcodigourgencia.php",
            data: {
              function: 'obtenerDiagnostico',  coincidencia : $scope.coincidencia1,
              sexo: $scope.sexo,
              edad: $scope.edad,
              hijo:0
            }
          }).then(function (response) {
            if (response.data == "-1") {
              $scope.Listardiagnosticos = "";
            } else {
              $scope.Listardiagnosticos = response.data;
            }
          })
        }else{
          $scope.mostrar_nada=false;
          $scope.mostrar_inicial=true;
          $scope.Listardiagnosticos=undefined;
  
        }
        
      }
      $scope.cerrar = function () {
        $scope.Listardiagnosticos = [];
        $scope.coincidencia1 = '';
      }
        $scope.cargarListados = function (coincidencia1) {
            $scope.cargando = true;
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
          data: {
            function: 'obtenerProducto', word: coincidencia1,
            clasificacion: $scope.resultado.servicio,
            regimen: $scope.resultado.regimen,
            contrato: $scope.resultado.contrato, 
            sexo: $scope.resultado.sexo,
            edad: $scope.resultado.edad,
          }
        }).then(function (response) {
            $scope.cargando = false;
          if (response.data["0"].CODIGO != "0") {
            $scope.ListarResultado = response.data;
          } else {
            $scope.ListarResultado = [];
          }
        })
      }
      $scope.elegir = function (codigo, nombre) {
        $("#DM" + codigo).addClass('eleacti');
        $('#DM' + codigo).siblings().removeClass('eleacti');
        $scope.detalle.producto = codigo;
        $scope.detalle.nombre = nombre;
      }
      $scope.verAutorizaciones = true;
      $scope.obtenerAutManual = function (codigo) {
        $scope.nameaut = 'Autorizaciones';
        swal({ title: 'Cargando autorizacion' });
        swal.showLoading();

        $scope.json = {
          numautmanual: codigo,
          nitavanzado: $scope.nit

        }
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
          data: { function: 'P_CONSULTA_AUTORIZACIONES_AVANZADO', aut: JSON.stringify($scope.json) }
        }).then(function (response) {
          console.log(response);
          $scope.infoafiliadoautedit = response.data.info;
          $scope.listarAutorizaciones = response.data.aut;
          $scope.initPaginacion($scope.listarAutorizaciones);
          $scope.verAutorizaciones = false;

          swal.close();
        })
      }

      $scope.limpiar = function () {
        $scope.verAutorizaciones = true;
      }

      $scope.initPaginacion = function (info) {
        $scope.listarAutorizacionesTemp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.configPages();
      }
      $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (Math.ceil($scope.listarAutorizacionesTemp.length / $scope.pageSize) > $scope.valmaxpag)
            fin = 10;
          else
            fin = Math.ceil($scope.listarAutorizacionesTemp.length / $scope.pageSize);
        } else {
          if (ini >= Math.ceil($scope.listarAutorizacionesTemp.length / $scope.pageSize) - $scope.valmaxpag) {
            ini = Math.ceil($scope.listarAutorizacionesTemp.length / $scope.pageSize) - $scope.valmaxpag;
            fin = Math.ceil($scope.listarAutorizacionesTemp.length / $scope.pageSize);
          }
        }
        if (ini < 1) ini = 1;
        for (var i = ini; i <= fin; i++) {
          $scope.pages.push({
            no: i
          });
        }
        if ($scope.currentPage >= $scope.pages.length)
          $scope.currentPage = $scope.pages.length - 1;
        if ($scope.currentPage < 0) { $scope.currentPage = 0; }
      }
      $scope.setPage = function (index) {
        $scope.currentPage = index - 1;
        if ($scope.pages.length % 2 == 0) {
          var resul = $scope.pages.length / 2;
        } else {
          var resul = ($scope.pages.length + 1) / 2;
        }
        var i = index - resul;
        if ($scope.listarAutorizacionesTemp.length % $scope.pageSize == 0) {
          var tamanomax = parseInt($scope.listarAutorizacionesTemp.length / $scope.pageSize);
        } else {
          var tamanomax = parseInt($scope.listarAutorizacionesTemp.length / $scope.pageSize) + 1;
        }
        var fin = ($scope.pages.length + i) - 1;
        if (fin > tamanomax) {
          fin = tamanomax;
          i = tamanomax - 9;
        }
        if (index > resul) {
          $scope.calcular(i, fin);
        }
      }
      $scope.paso = function (tipo) {
        if (tipo == 'next') {
          var i = $scope.pages[0].no + 1;
          if ($scope.pages.length > 9) {
            var fin = $scope.pages[9].no + 1;
          } else {
            var fin = $scope.pages.length;
          }

          $scope.currentPage = $scope.currentPage + 1;
          if ($scope.listarAutorizacionesTemp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt($scope.listarAutorizacionesTemp.length / $scope.pageSize);
          } else {
            var tamanomax = parseInt($scope.listarAutorizacionesTemp.length / $scope.pageSize) + 1;
          }
          if (fin > tamanomax) {
            fin = tamanomax;
            i = tamanomax - 9;
          }
        } else {
          var i = $scope.pages[0].no - 1;
          if ($scope.pages.length > 9) {
            var fin = $scope.pages[9].no - 1;
          } else {
            var fin = $scope.pages.length;
          }

          $scope.currentPage = $scope.currentPage - 1;
          if (i <= 1) {
            i = 1;
            fin = $scope.pages.length;
          }
        }
        $scope.calcular(i, fin);
      }
      $scope.calcular = function (i, fin) {
        if (fin > 9) {
          i = fin - 9;
        } else {
          i = 1;
        }
        $scope.pages = [];
        for (i; i <= fin; i++) {
          $scope.pages.push({
            no: i
          });
        }
      }

      $scope.filter = function (val) {
        $scope.listarAutorizacionesTemp = $filter('filter')($scope.listarAutorizaciones, val);
        if ($scope.listarAutorizacionesTemp.length > 0) {
          $scope.setPage(1);
        }
        $scope.configPages();
      }


    }])
