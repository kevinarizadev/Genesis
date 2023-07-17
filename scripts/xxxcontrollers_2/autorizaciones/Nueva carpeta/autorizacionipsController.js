'use strict';
angular.module('GenesisApp')
  .controller('autorizacionipsController', ['$scope', '$http', '$location', 'ngDialog','pqrHttp',
    function ($scope, $http, $location, ngDialog,pqrHttp) {

      $(document).ready(function () {
        $('.tooltipped').tooltip({ delay: 50 });
        $('#modaldetalle').modal();
        $('#modaleditardetalle').modal();
        $('#modaldiagnostico').modal();
        $('#modalips').modal();
        $('#modalservicio').modal();
        $("#modalespecialidad").modal();
        $("#modalproducto").modal();

        var fecha = new Date();
        fecha.setDate(fecha.getDate() - 2);
        $('#date-fr').bootstrapMaterialDatePicker({ format: 'DD/MM/YYYY HH:mm', lang: 'fr', weekStart: 1, nowText: 'Now', minDate: fecha, maxDate: new Date(), defaultDate: fecha });

        $('#date-fr-modal').bootstrapMaterialDatePicker({ format: 'DD/MM/YYYY HH:mm', lang: 'fr', weekStart: 1, nowText: 'Now', minDate: fecha, maxDate: new Date() });



      });

      $scope.Obtener_Tipos_Documentos = function () {
        $http({
          method: 'POST',
          url: "php/genesis/funcgenesis.php",
          data: {
            function: 'Obtener_Tipos_Documentos',
            Tipo: 'S'
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.Tipos_Documentos = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
$scope.Obtener_Tipos_Documentos();

      $(document).ready(function () {
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
      $scope.resultado = [];
      $scope.tabII = false;
      $scope.tabIII = false;
      $scope.tabIV = false;
      $scope.tabV = false;
      $scope.activeI = 'active final';
      $scope.activeII = 'none';
      $scope.activeIII = 'none';
      $scope.activeIV = 'none';
      $scope.activeV = 'none';
      $scope.titletab = 'Solicitud';
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
        numero: '0',
        ubicacion: '0',
        tipodocumento: '',
        documento: '',
        nombre: '',
        fecingreso: '',
        origen: '',
        ubipaciente: '',
        tiposervicio: '',
        servicio: '',
        nombreservcio: '',
        viaingreso: '',
        contrato: '',
        ubicacioncontrato: '',
        documentocontrato: '',
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
        ruta: '',
        direccion: '',
        actividad: 'I',
        ftp: null
      }

      $scope.searchaut = '';

      function sumarDias(fecha, dias) {
        fecha.setDate(fecha.getDate() + dias);
        return fecha;
      }


      var d = new Date()
      var myDate = new Date().toISOString();

      $scope.maxDate = myDate.substring(0, myDate.length - 1);
      console.log(sumarDias(d, -3));

   

        $scope.descargafile = function (ruta, ftp) {
        pqrHttp.dowloadfile(ruta,ftp).then(function (response) {
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
        $scope.listDirecciones = [];
        $scope.solicitud = {
          numero: '0',
          ubicacion: '0',
          tipodocumento: '',
          documento: '',
          nombre: '',
          fecingreso: '',
          origen: '',
          ubipaciente: '',
          tiposervicio: '',
          servicio: '',
          nombreservcio: '',
          contrato: '',
          ubicacioncontrato: '',
          documentocontrato: '',
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
          ruta: '',
          direccion: '',
          actividad: 'I',
          ftp: null
        }

      }
      $scope.detalle = {
        producto: '',
        nombre: '',
        cantidad: '',
        producto2: '',
        nombre2: '',
        cantidad2: '',
        subclas: '',
        subclasn: '',
        subclascod: ''
      }
      $scope.afiliado = [];
      $scope.encabezado = {
        fecha: '',
        servicio: '',
        coddiag: '',
        nomdiag: '',
        coddiag2: '',
        nomdiag2: '',
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
      $scope.obtenerServicios = function (tempcontrato) {
        console.log(tempcontrato);
        if ($scope.solicitud.contrato != "") {

          for (var i = 0; i < $scope.listContratos.length; i++) {
            if ($scope.listContratos[i].NUMERO == tempcontrato) {
              $scope.solicitud.ubicacioncontrato = $scope.listContratos[i].UBICACIONCONTRATO;
              $scope.solicitud.documentocontrato = $scope.listContratos[i].DOCUMENTOCONTRATO;
            }
          }
          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
            data: {
              function: 'p_obtener_servicio',
              contrato: $scope.solicitud.contrato,
              ubicacion: $scope.solicitud.ubicacioncontrato,
              documento: $scope.solicitud.documentocontrato
            }
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
            data: {
              function: 'p_obtener_servicio',
              contrato: $scope.resumeneditcabeza.CONTRATO,
              documento: $scope.resumeneditcabeza.DOCUMENTOCONTRATO,
              ubicacion: $scope.resumeneditcabeza.UBICACIONCONTRATO
            }
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
            console.log(response);
            if (response.data.Codigo == "0") {                      
              $scope.inactivefields = true;
              $scope.solicitud.nombre = '';
              swal('Importante', response.data.Nombre, 'info');
            }else{
              let date = new Date()
              // $scope.solicitud.fecsolicitud = new Date(date.getFullYear(), (date.getMonth()), date.getDate(), date.getHours(), date.getMinutes());


              var d = new Date();

              var month = d.getMonth() + 1;
              var day = d.getDate();

              var output = (day < 10 ? '0' : '') + day + '/' +
                (month < 10 ? '0' : '') + month + '/' +
                d.getFullYear();


              $("#date-fr").val(output + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
              $scope.solicitud.fecsolicitud = output + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
              $scope.solicitud.nombre = response.data["0"].NOMBRE;
              $scope.solicitud.fechanacimiento = response.data["0"].NACIMIENTO;
              $scope.solicitud.estadoafiliado = response.data["0"].ESTADO;
              $scope.solicitud.regimen = response.data["0"].REGIMEN=='S' ? 'SUBSIDIADO':'CONTRIBUTIVO';
              $scope.solicitud.edad = response.data["0"].Edad + " Años";
              $scope.afiliado = response.data["0"];
              $scope.obtenerContratos();
              $scope.obtenerDirecciones();
              $scope.inactivefields = false;
            }
          })
        } else {
          swal('Importante', "No pueden haber campos vacios.", 'info');
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

          if (response.data.CODIGO == '1') {
            $scope.listContratos = [];
            swal('Advertencia', response.data.NOMBRE, 'warning');
          } else {
            $scope.listContratos = response.data;
          }
        })
      }
      $scope.obtenerDirecciones = function () {
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
          data: {
            function: 'p_obtener_direccion', tercero: $scope.nit
          }
        }).then(function (response) {
          $scope.listDirecciones = response.data;

        })
      }
      $scope.obtenerDiagnostico = function (tipo) {
        console.log("me ejeucte");
        if (tipo == 'ppal') {
          var codigo = $scope.solicitud.dxprincipal;
        } else {
          var codigo = $scope.solicitud.dxsecundario;
        }
        if (codigo != '' && codigo != null && codigo != undefined) {
          $http({
            method: 'POST',
            url: "php/autorizaciones/esoa/esoa.php",
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
        $scope.titletab = 'Solicitud';
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
            $scope.tipoaut = '1';
            $scope.titletab = 'Solicitud';
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
            $scope.tipoaut = '2';
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
            $scope.tipoaut = '3';
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
            $scope.tipoaut = '4';
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
            $scope.tipoaut = '5';
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
            if (ac == "back") {
              // $(".paso2").removeClass("activebtn-step").addClass("donebtn-step");                            
              $(".paso2").removeClass("activebtn-step");
              $(".paso1").removeClass("donebtn-step").addClass("activebtn-step");
              $('.content-step1').addClass('animated slideInRight');
              $scope.inactivepaso1 = false;
              $scope.inactivepaso2 = true;
              $scope.inactivepaso3 = true;
              $scope.titletab = 'Solicitud';
            }
            if (ac == "next") {


              if ($scope.solicitud.dxprincipal == '') {
                swal("Importante", "Diagnostico 1 no puede estar vacio", "info");
                return;
              }
              if ($scope.solicitud.dxsecundario == '') {
                swal("Importante", "Diagnostico 2 no puede estar vacio", "info");
                return;
              }
              if ($scope.solicitud.origen == '') {
                swal("Importante", "Orgien de atención no puede estar vacio", "info");
                return;
              } if ($scope.solicitud.ubipaciente == '') {
                swal("Importante", "Ubicación paciente no puede estar vacio", "info");
                return;
              } if ($scope.solicitud.contrato == '') {
                swal("Importante", "Contrato no puede estar vacio", "info");
                return;
              } if ($scope.solicitud.tiposervicio == '') {
                swal("Importante", "Tipo de servicio no puede estar vacio", "info");
                return;
              } if ($scope.solicitud.nombreservcio == '') {
                swal("Importante", "Servicio no puede estar vacio", "info");
                return;
              }
              if ($scope.requierecama == true) {
                if ($scope.solicitud.cama == '') {
                  swal("Importante", "Cama no puede estar vacio", "info");
                  return;
                }
              }
              if ($scope.solicitud.viaingreso == '') {
                swal("Importante", "Via de ingreso no puede estar vacio", "info");
                return;
              }
              if ($scope.solicitud.direccion == '') {
                swal("Importante", "Dirección atención no puede estar vacio", "info");
                return;
              }
              if ($scope.solicitud.justificacion.length < 30) {
                swal("Importante", "La justificación debe tener como minimo 30  y maximo 1000 caracteres", "info");
                return;
              }
              if ($scope.solicitud.codips == '') {
                swal("Importante", "NIT IPS no puede estar vacio", "info");
                return;
              }
              if ($scope.solicitud.medico == '') {
                swal("Importante", "Nombre del Médico no puede estar vacio", "info");
                return;
              }

              if ($scope.solicitud.cargomedico == '') {
                swal("Importante", "Especialidad no puede estar vacio", "info");
                return;
              }

              if ($scope.adjunto == null) {
                swal("Importante", "Archivo no puede estar vacio", "info");
                return;
              }


              $scope.insertarSolicitud();

              // }else{                

              // }


            }
            break;
          case "paso2":
            $(".paso2").removeClass("activebtn-step").addClass("donebtn-step");
            $(".paso3").addClass("activebtn-step");
            $scope.inactivepaso2 = true;
            $scope.inactivepaso3 = false;
            $('.content-step3').addClass('animated slideInRight');
            $scope.titletab = 'Servicios';
            $scope.obtenerResumen();
            $scope.titletab = 'Finalizar';
            break;
          case "paso3":

            if (ac == "finish") {
              $scope.titletab = 'Finalizar';
              $scope.finalizarSolicitud();
            } else {
              $scope.titletab = 'Servicios';
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
        return hh + ':' + mi + ':00';
      }
      //TAB I
      $scope.inactivebtnsolicitud = false;
      $scope.insertarSolicitud = function () {
        if ($scope.solicitud.dxprincipal) {
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
          // formatDate
          $scope.solicitud.fecingreso = ($scope.solicitud.fecsolicitud);
          $scope.solicitud.nit = $scope.nit;
          if ($scope.solicitud.dxsecundario == "" || $scope.solicitud.dxsecundario == null || $scope.solicitud.dxsecundario == undefined) {
            $scope.solicitud.dxsecundario = "0";
          }
          if ($scope.solicitud.viaingreso == 'U') {
            if ($scope.solicitud.urgencia == undefined) {
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
              $scope.solicitud.ftp = 3;
              var data = JSON.stringify($scope.solicitud);
              if (($scope.solicitud.ruta != '0 - Error') && ($scope.solicitud.ruta.substr(0, 3) != "<br")) {
                $http({
                  method: 'POST',
                  url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
                  data: { function: 'insertarSoplicitud', data: data }
                }).then(function (response) {
                  $scope.resultado = response.data;
                  console.log($scope.resultado);
                  if ($scope.resultado.Codigo == '0') {
                    $scope.solicitud.actividad = 'U';
                    $scope.solicitud.numero = $scope.resultado.numero;
                    $scope.solicitud.ubicacion = $scope.resultado.ubicacion;

                    $(".paso1").removeClass("activebtn-step").addClass("donebtn-step");
                    $(".paso2").addClass("activebtn-step");
                    $scope.inactivepaso1 = true;
                    $('.content-step2').addClass('animated slideInRight');
                    $scope.inactivepaso2 = false;

                    $scope.titletab = 'Servicios';
                  }
                  // if ($scope.resultado.error == '1') {
                  //   swal('Importante', $scope.resultado.observacion, 'info');
                  // }
                  //else 
                  if ($scope.resultado.Codigo == '1') {
                    swal('Importante', $scope.resultado.Nombre, 'info');
                  }

                  $scope.inactivebtnsolicitud = false;
                })
              } else {
                swal("Importante", "No se cargo el archivo correctamente. Favor intente nuevamente", "info");
              }

            });
          } else {
            swal("Importante", "No se cargo el archivo correctamente. Favor intente nuevamente", "info");
          }
          //procedimientos subir infor
        } else {
          swal("Importante", "Favor llenar el diagnostico nuevamente", "info");
        }

      }
      $scope.buscarpro = null;
      $scope.obtenerProducto = function () {
        if ($scope.buscarpro != '') {
          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
            data: {
              function: 'obtenerProducto', producto: $scope.buscarpro,
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
        console.log($scope.detalle);
        if ($scope.detalle.cantidad > 0) {
          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
            data: {
              function: 'insertarDetalle', producto: $scope.detalle.producto,
              cantidad: $scope.detalle.cantidad,
              numero: $scope.resultado.numero,
              ubicacion: $scope.resultado.ubicacion,
              subclas: $scope.detalle.subclas,
              subclasn: $scope.detalle.subclasn,
              subclascod: $scope.detalle.subclascod,
              actividad: 'I'
            }
          }).then(function (response) {
            $scope.resultadodetalle = response.data;
            if ($scope.resultadodetalle.Codigo == '0') {
              $scope.detalle = {
                producto: '',
                nombre: '',
                cantidad: '',
                producto2: '',
                nombre2: '',
                cantidad2: '',
                subclas: '',
                subclasn: '',
                subclascod: ''
              }
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

      $scope.tempData;
      $scope.cantidadinput = 1;
      $scope.tempProd = '';
      $scope.seleccionarproducto = function (data) {
        $scope.tempProd = data;

        if (data.UNICA_HOSP == 'S') {

          $scope.detalle.cantidad = '1';
          $scope.detalle.producto = data.CODIGO;
          $scope.detalle.nombre = data.NOMBRE;
          $scope.detalle.subclas = data.SUBCLAS;
          if ($scope.tipoaut == '1') {
            if ($scope.tempProd.SUBCLAS == 'S') {
              $http({
                method: 'POST',
                url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                data: {
                  function: 'p_mostrar_hijos_epro_valor',
                  cups: $scope.tempProd.CODIGO,
                  regimen: $scope.solicitud.documentocontrato,
                  contrato: $scope.solicitud.contrato,
                  ubicacion: $scope.solicitud.ubicacioncontrato
                }
              }).then(function (res) {
                console.log(res.data);
                $scope.listMotivos = res.data;
                $scope.templistMotivos = res.data;
                $scope.array = { 99999: "NO APLICA SUBCATEGORIA" };
                for (var i = 0; i < $scope.listMotivos.length; i++) {
                  var val = $scope.listMotivos[i].NUMERO_H + ' - ' + $scope.listMotivos[i].NOMBRE_H;
                  $scope.array[val] = val;
                }

                swal({
                  title: 'Seleccionar Subcategoria',
                  input: 'select',
                  inputOptions: $scope.array,
                  inputPlaceholder: 'Seleccionar',
                  showCancelButton: true,
                  inputValidator: function (value) {
                    return new Promise(function (resolve, reject) {
                      if (value !== '') {
                        resolve();
                      } else {
                        reject('Debes Selecionar una Subcategoria');
                      }
                    });
                  }
                }).then(function (result) {
                  console.log(result);

                  $scope.tempsubcla = result.split('-');
                  if (result) {
                    if ($scope.tempsubcla[0] == '99999') {
                      $scope.detalle.subclasn = 'N';
                      $scope.insertarDetalle();
                    } else {
                      $scope.detalle.subclasn = 'S';

                      const filteredMotivos = $scope.templistMotivos.find(item => item.NUMERO_H == ($scope.tempsubcla[0]));
                      $scope.detalle.subclascod = filteredMotivos.NUMERO_H;

                      $scope.$apply();
                      $scope.insertarDetalle();
                    }


                    swal({
                      title: "Completado",
                      html: 'Producto  y Subcategoria Seleccionados',
                      type: 'success',
                    });

                  }
                });
              })

            } else {
              $scope.insertarDetalle();
              swal({ title: "Completado", text: "Producto Agregado.", showConfirmButton: false, type: "success" });
            }
          }
          if ($scope.tipoaut == '2') {
            $scope.detalle.cantidad = '1';
            $scope.detalle.producto = data.CODIGO;
            $scope.detalle.nombre = data.NOMBRE;
            $scope.detalle.subclas = data.SUBCLAS;
            console.log('numero:', $scope.codeditdetalle);
            console.log('ubicacion:', $scope.ubieditdetalle);
            if ($scope.tempProd.SUBCLAS == 'S') {
              $http({
                method: 'POST',
                url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                data: {
                  function: 'p_mostrar_hijos_epro_valor',
                  cups: $scope.tempProd.CODIGO,
                  regimen: $scope.resumeneditcabeza.DOCUMENTOCONTRATO,
                  contrato: $scope.resumeneditcabeza.CONTRATO,
                  ubicacion: $scope.resumeneditcabeza.UBICACIONCONTRATO
                }
              }).then(function (res) {
                console.log(res.data);
                $scope.listMotivos = res.data;
                $scope.templistMotivos = res.data;
                $scope.array = { 99999: "NO APLICA SUBCATEGORIA" };
                for (var i = 0; i < $scope.listMotivos.length; i++) {
                  var val = $scope.listMotivos[i].NUMERO_H + ' - ' + $scope.listMotivos[i].NOMBRE_H;
                  $scope.array[val] = val;
                }

                swal({
                  title: 'Seleccionar Subcategoria',
                  input: 'select',
                  inputOptions: $scope.array,
                  inputPlaceholder: 'Seleccionar',
                  showCancelButton: true,
                  inputValidator: function (value) {
                    return new Promise(function (resolve, reject) {
                      if (value !== '') {
                        resolve();
                      } else {
                        reject('Debes Selecionar una Subcategoria');
                      }
                    });
                  }
                }).then(function (result) {
                  console.log(result);

                  $scope.tempsubcla = result.split('-');
                  if (result) {
                    if ($scope.tempsubcla[0] == '99999') {
                      $scope.detalle.subclasn = 'N';
                      $scope.insertarDetalleEdit();
                    } else {
                      $scope.detalle.subclasn = 'S';

                      const filteredMotivos = $scope.templistMotivos.find(item => item.NUMERO_H == ($scope.tempsubcla[0]));
                      $scope.detalle.subclascod = filteredMotivos.NUMERO_H;
                      $scope.insertarDetalleEdit();
                      $scope.$apply();
                    }

                    swal({
                      title: "Completado",
                      html: 'Producto  y Subcategoria Seleccionados',
                      type: 'success',
                    });

                  }
                });
              })

            } else {
              $scope.insertarDetalleEdit();
              swal({ title: "Completado", text: "Producto Agregado.", showConfirmButton: false, type: "success" });
            }
          }



        } else {
          swal({
            title: 'Ingrese la cantidad',
            input: 'number',
            inputValue: $scope.cantidadinput,
            inputAttributes: {
              min: 1,
              max: 99
            },
            showCancelButton: true
          }).then(function (result) {
            if (result > 0) {
              if ($scope.tipoaut == '1') {
                $scope.detalle.cantidad = result;
                $scope.detalle.producto = data.CODIGO;
                $scope.detalle.nombre = data.NOMBRE;
                $scope.detalle.subclas = data.SUBCLAS;
                if ($scope.tempProd.SUBCLAS == 'S') {
                  $http({
                    method: 'POST',
                    url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                    data: {
                      function: 'p_mostrar_hijos_epro_valor',
                      cups: $scope.tempProd.CODIGO,
                      regimen: $scope.solicitud.documentocontrato,
                      contrato: $scope.solicitud.contrato,
                      ubicacion: $scope.solicitud.ubicacioncontrato
                    }
                  }).then(function (res) {
                    console.log(res.data);
                    $scope.listMotivos = res.data;
                    $scope.templistMotivos = res.data;
                    $scope.array = { 99999: "NO APLICA SUBCATEGORIA" };
                    for (var i = 0; i < $scope.listMotivos.length; i++) {
                      var val = $scope.listMotivos[i].NUMERO_H + ' - ' + $scope.listMotivos[i].NOMBRE_H;
                      $scope.array[val] = val;
                    }

                    swal({
                      title: 'Seleccionar Subcategoria',
                      input: 'select',
                      inputOptions: $scope.array,
                      inputPlaceholder: 'Seleccionar',
                      showCancelButton: true,
                      inputValidator: function (value) {
                        return new Promise(function (resolve, reject) {
                          if (value !== '') {
                            resolve();
                          } else {
                            reject('Debes Selecionar una Subcategoria');
                          }
                        });
                      }
                    }).then(function (result) {
                      console.log(result);

                      $scope.tempsubcla = result.split('-');
                      if (result) {
                        if ($scope.tempsubcla[0] == '99999') {
                          $scope.detalle.subclasn = 'N';
                          $scope.insertarDetalle();
                        } else {
                          $scope.detalle.subclasn = 'S';

                          const filteredMotivos = $scope.templistMotivos.find(item => item.NUMERO_H == ($scope.tempsubcla[0]));
                          $scope.detalle.subclascod = filteredMotivos.NUMERO_H;

                          $scope.$apply();
                        }
                        $scope.insertarDetalle();

                        swal({
                          title: "Completado",
                          html: 'Producto  y Subcategoria Seleccionados',
                          type: 'success',
                        });

                      }
                    });
                  })

                } else {
                  $scope.insertarDetalle();
                  swal({ title: "Completado", text: "Producto Agregado.", showConfirmButton: false, type: "success" });
                }
              }

              if ($scope.tipoaut == '2') {
                console.log($scope.resumeneditcabeza);
                console.log($scope.resumenedit);
                $scope.detalle.cantidad = result;
                $scope.detalle.producto = data.CODIGO;
                $scope.detalle.nombre = data.NOMBRE;
                $scope.detalle.subclas = data.SUBCLAS;
                console.log('numero:', $scope.codeditdetalle);
                console.log('ubicacion:', $scope.ubieditdetalle);
                if ($scope.tempProd.SUBCLAS == 'S') {
                  $http({
                    method: 'POST',
                    url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                    data: {
                      function: 'p_mostrar_hijos_epro_valor',
                      cups: $scope.tempProd.CODIGO,
                      regimen: $scope.resumeneditcabeza.DOCUMENTOCONTRATO,
                      contrato: $scope.resumeneditcabeza.CONTRATO,
                      ubicacion: $scope.resumeneditcabeza.UBICACIONCONTRATO
                    }
                  }).then(function (res) {
                    console.log(res.data);
                    $scope.listMotivos = res.data;
                    $scope.templistMotivos = res.data;
                    $scope.array = { 99999: "NO APLICA SUBCATEGORIA" };
                    for (var i = 0; i < $scope.listMotivos.length; i++) {
                      var val = $scope.listMotivos[i].NUMERO_H + ' - ' + $scope.listMotivos[i].NOMBRE_H;
                      $scope.array[val] = val;
                    }

                    swal({
                      title: 'Seleccionar Subcategoria',
                      input: 'select',
                      inputOptions: $scope.array,
                      inputPlaceholder: 'Seleccionar',
                      showCancelButton: true,
                      inputValidator: function (value) {
                        return new Promise(function (resolve, reject) {
                          if (value !== '') {
                            resolve();
                          } else {
                            reject('Debes Selecionar una Subcategoria');
                          }
                        });
                      }
                    }).then(function (result) {
                      console.log(result);

                      $scope.tempsubcla = result.split('-');
                      if (result) {
                        if ($scope.tempsubcla[0] == '99999') {
                          $scope.detalle.subclasn = 'N';
                          $scope.insertarDetalleEdit();
                        } else {
                          $scope.detalle.subclasn = 'S';

                          const filteredMotivos = $scope.templistMotivos.find(item => item.NUMERO_H == ($scope.tempsubcla[0]));
                          $scope.detalle.subclascod = filteredMotivos.NUMERO_H;
                          $scope.insertarDetalleEdit();
                          $scope.$apply();
                        }

                        swal({
                          title: "Completado",
                          html: 'Producto  y Subcategoria Seleccionados',
                          type: 'success',
                        });

                      }
                    });
                  })

                } else {
                  $scope.insertarDetalleEdit();
                  swal({ title: "Completado", text: "Producto Agregado.", showConfirmButton: false, type: "success" });
                }
              }




            } else {
              swal('Importante', 'Cantidad Incorrecta', 'info')
            }
          })
        }



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
          numero: '0',
          ubicacion: '0',
          tipodocumento: '',
          documento: '',
          nombre: '',
          fecingreso: '',
          origen: '',
          ubipaciente: '',
          tiposervicio: '',
          servicio: '',
          nombreservcio: '',
          contrato: '',
          ubicacioncontrato: '',
          documentocontrato: '',
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
          ruta: '',
          direccion: '',
          actividad: 'I'
        }
        $scope.detalle = {
          producto: '',
          nombre: '',
          cantidad: '',
          producto2: '',
          nombre2: '',
          cantidad2: '',
          subclas: '',
          subclasn: '',
          subclascod: ''
        }
        $scope.afiliado = [];
        $scope.encabezado = {
          fecha: '',
          servicio: '',
          coddiag: '',
          nomdiag: '',
          coddiag2: '',
          nomdiag2: '',
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
        $scope.diagnostico1_nombre = '';
        $scope.diagnostico2_nombre = '';
        $scope.adjunto = null;
        $scope.nombreadjunto = '';
        document.getElementById('nombreadjunto').value = null;
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
          data: { function: 'p_obtener_solicitud', codigo: codigo, estado: estado, nit: $scope.nit }
        }).then(function (response) {
          if (estado == 'A') {
            if (response.data["0"].Codigo != "0") {
              $scope.listAutorizacionesactivas = response.data;
              $scope.inactiveaut_activa = false;
              swal.close();
            } else {
              $scope.inactiveaut_activa = true;
              swal('Importante', 'No se encontraron resultados!', 'info');
            }
          }
          else {
            if (response.data["0"].Codigo != "0") {
              $scope.listAutorizacionesprocesadas = response.data;
              $scope.inactiveaut2 = false;
              swal.close();
            } else {
              $scope.inactiveaut2 = true;
              swal('Importante', 'No se encontraron resultados!', 'info');
            }

          }

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
        console.log($scope.resumeneditcabeza);
        // $scope.encabezado.fecha = new Date($scope.resumeneditcabeza.FECHA_PARSE);


        $("#date-fr-modal").val($scope.resumeneditcabeza.FECHA_PARSE);
        $scope.encabezado.fecha = $scope.resumeneditcabeza.FECHA_PARSE;
        console.log($scope.resumeneditcabeza.CODSERVICIO);
        $scope.encabezado.servicio = $scope.resumeneditcabeza.CODSERVICIO;

        function letsWaitALittle() {
          $("#clasificacion_select option[value=" + $scope.encabezado.servicio + "]").attr("selected", true);
        }
        setTimeout(letsWaitALittle, 10);

        $scope.encabezado.coddiag = $scope.resumeneditcabeza.CODDX;
        $scope.encabezado.nomdiag = $scope.resumeneditcabeza.CODDX + ' - ' + $scope.resumeneditcabeza.DX;
        $scope.encabezado.coddiag2 = $scope.resumeneditcabeza.CODDX2;
        $scope.encabezado.nomdiag2 = $scope.resumeneditcabeza.CODDX2 + ' - ' + $scope.resumeneditcabeza.DX2;
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
      $scope.gestionar_autorizaciones_activas = function (sol) {
        console.log(sol);
        $scope.inactiveeditcabezera = true;
        $scope.resumen = [];
        $scope.resumencabeza = [];
        $scope.resultado = [];
        $scope.detalle.producto2 = '';
        $scope.detalle.nombre2 = '';
        $scope.detalle.cantidad2 = '';

        $scope.clasificacion = sol.CLASIFICACION;
        $scope.resultado.servicio = sol.CLASIFICACION;
        $scope.resultado.edad = sol.EDAD;
        $scope.resultado.sexo = sol.SEXO;
        $scope.codeditdetalle = sol.CODIGO;
        $scope.ubieditdetalle = sol.UBICACION;
        $scope.docafiliado = sol.DOC;
        $scope.tipodocafiliado = sol.TIPODOC;
        $scope.sexo = sol.SEXO;
        $scope.edad = sol.EDAD;
        $scope.resultado.regimen = sol.REGIMEN;
        $scope.resultado.contrato = sol.CONTRATO;
        $scope.regimen = sol.REGIMEN;
        $scope.contrato = sol.CONTRATO;
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
            $scope.obtenerServiciosedit();
            $('#modaleditardetalle').modal("open");
          }
        })
      }

      $scope.cancelar_solicitud = function (sol) {

        swal({
          title: 'Confirmar',
          text: "¿Seguro que desea anular la solicitud N° " + sol.CODIGO + " seleccionada?",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          var d = new Date();
          var month = d.getMonth() + 1;
          var day = d.getDate();
          var output = (day < 10 ? '0' : '') + day + '/' +
            (month < 10 ? '0' : '') + month + '/' +
            d.getFullYear();
          $http({
            method: 'POST',
            url: "php/autorizaciones/esoa/esoa.php",
            data: {
              function: 'p_anular_esoa',
              v_pnumero: sol.CODIGO,
              v_pubicacion: sol.UBICACION,
              v_pmotivo_anulacion: "SE ANULA POR ACCION DE LA IPS EN LA FECHA " + output
            }
          }).then(function (response) {
            console.log(response.data.Codigo);
            if (response.data.Codigo == "0") {
              swal('Completado', response.data.Nombre, 'success');
              setTimeout(() => {
                $scope.obtenerAutorizaciones('A', $scope.buscaraut);
              }, 3000);

              //   $scope.detalle.nombre2 = response.data["0"].NOMBRE;
            } else {
              swal('Advertencia', response.data.Nombre, 'warning');
            }
          })
        })
      }
      $scope.actualizarEncabezado = function () {
        console.log($scope.encabezado.fecha);
        // var dia = parsedia(new Date($scope.encabezado.fecha));
        // var hora = parsehora(new Date($scope.encabezado.fecha));

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
                fecha: $scope.encabezado.fecha,
                hora: $scope.encabezado.fecha,
                servicio: $scope.encabezado.servicio,
                diagnostico: $scope.encabezado.coddiag,
                diagnostico2: $scope.encabezado.coddiag2,
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
                    $scope.resultado.servicio = $scope.resumenedit.CABEZA["0"].CLASIFICACION;
                    $scope.resultado.contrato = $scope.resumenedit.CABEZA["0"].CONTRATO
                    $scope.resumeneditcabeza = $scope.resumenedit.CABEZA["0"];
                    $scope.clasificacion = $scope.resumenedit.CABEZA["0"].CLASIFICACION;
                    $scope.inactiveeditcabezera = true;
                    swal({ title: "Completado", text: "Datos Actualizados", type: "success", timer: 1500 });
                  }
                })
              } else {
                swal('Advertencia', response.data.Nombre, 'warning')
              }
            })
          }
        })
      }
      $scope.insertarDetalleEdit = function () {
        console.log({
          function: 'insertarDetalle', producto: $scope.detalle.producto,
          cantidad: $scope.detalle.cantidad,
          numero: $scope.codeditdetalle,
          ubicacion: $scope.ubieditdetalle,
          subclas: $scope.detalle.subclas,
          subclasn: $scope.detalle.subclasn,
          subclascod: $scope.detalle.subclascod,
          actividad: 'I'
        });
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
          data: {
            function: 'insertarDetalle', producto: $scope.detalle.producto,
            cantidad: $scope.detalle.cantidad,
            numero: $scope.codeditdetalle,
            ubicacion: $scope.ubieditdetalle,
            subclas: $scope.detalle.subclas,
            subclasn: $scope.detalle.subclasn,
            subclascod: $scope.detalle.subclascod,
            actividad: 'I'
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
        $scope.resultado.regimen = $scope.table.row(this).data().REGIMEN;
        $scope.resultado.contrato = $scope.table.row(this).data().CONTRATO;
        $scope.regimen = $scope.table.row(this).data().REGIMEN;
        $scope.contrato = $scope.table.row(this).data().CONTRATO;
        // $scope.obtenerServiciosedit();
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
      $scope.textfile= "";
      $scope.obtenerBase = function () {

        if ($("#adjunto")[0].files[0].size > 7340032) {
          // swal('Advertencia','El archivo excede el peso limite (7 MB)','warning')
          $scope.textfile= "El archivo excede el peso limite (7 MB)";
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
            $scope.textfile= "Dentro del peso limite y archivo valido";
          }
        }


      }
      $scope.valespecialidad = false;
      $scope.openmodals = function (tipo, opcion) {
        $scope.tipoaut = opcion;
        switch (tipo) {
          case 'diagnostico':
            $scope.coincidencia = null;
            if ($scope.tipoaut == '1') {
              if (!$scope.afiliado.SEXO) {
                swal("Importante", "Para realizar los diagnostico favor ingresar los datos del Paciente", "info");
                $scope.inactivebarradiag = true;
                $scope.listDiagnosticos = [];

                return
              }
            }

            $scope.inactivebarradiag = true;
            $("#modaldiagnostico").modal("open");
            setTimeout(() => {
              $('#modaldiagnostico #diaginput').focus();
            }, 100);
            break;

          case 'ips':
            $scope.inactivebarraips = true;
            $scope.buscard2 = null;
            $("#modalips").modal("open");
            setTimeout(() => {
              $('#modalips #ipsinput').focus();
            }, 100);

            break;

          case 'producto':
            $scope.buscarpro = '';
            $scope.inactivebarrapro = true;
            $scope.listProductos = [];
            $("#modalproducto").modal("open");
            setTimeout(() => {
              $('#modalproducto #proinput').focus();
            }, 100);
            break;
          case 'modalservicio':
            if ($scope.solicitud.contrato == '' || $scope.solicitud.contrato == null) {
              swal('Importante', 'El contrato no puede estar vacio!', 'info');
            } else {
              $("#modalservicio").modal("open");
              setTimeout(() => {
                $('#modalservicio #servinput').focus();
              }, 100);
            }
            break;
          case 'modalespecialidad':
            $scope.bespecialidad = "";
            if ($scope.solicitud.codips) {
              $scope.valespecialidad = false;
            } else {
              $scope.valespecialidad = true;
            }
            if ($scope.valespecialidad == true) {
              swal('Importante', 'La Ips Solicitante no puede estar vacia!', 'info');
            } else {
              $("#modalespecialidad").modal("open");
              setTimeout(() => {
                $('#modalespecialidad #especialidadinput').focus();
              }, 100);
            }
            break;

          case 'modaldetalle':
            break;

          default:
        }
      }


      $scope.closemodals = function (tipo) {
        switch (tipo) {
          case 'diagnostico':
            $("#modaldiagnostico").modal("close");
            break;
          case 'ips':
            $("#modalips").modal("close");
            break;
          case 'producto':
            $("#modalproducto").modal("close");
            break;
          case 'modalservicio':
            $("#modalservicio").modal("close");
            break;
          case 'modalespecialidad':
            $("#modalespecialidad").modal("close");
            break;
          case 'modaldetalle':
            $("#modaldetalle").modal("close");
            break;
          case 'modaleditardetalle':
            $("#modaleditardetalle").modal("close");
            break;

          default:
        }
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
        } else {
          $('#DM' + $scope.diagnostico2).removeClass('eleacti');
          $scope.solicitud.dxsecundario = "0";
          $scope.diagnostico2_nombre = "";
        }
      }
      $scope.elegir_diagnostico = function (codigo, nombre, valor) {
        $("#DM" + codigo).addClass('eleacti');
        $('#DM' + codigo).siblings().removeClass('eleacti');
        // $scope.hovering=true;
        if ($scope.tipo == 1 && $scope.modal == false) {
          $scope.solicitud.dxprincipal = codigo;
          $scope.diagnostico1_nombre = nombre;
        } else if ($scope.modal == true) {
          $scope.encabezado.coddiag = codigo;
          $scope.encabezado.nomdiag = nombre;
        } else if ($scope.tipo == 4) {
          $scope.solicitud.codips = codigo;
          $scope.solicitud.nombreips = nombre;
        } else {
          $scope.solicitud.dxsecundario = codigo;
          $scope.diagnostico2_nombre = nombre;
        }
      }
      $scope.seleccionardiagnostico = function (data, tipo) {
        var text = "";


        if (tipo == 'P') {
          if ($scope.tipoaut == '1') {
            $scope.solicitud.dxprincipal = data.Codigo;
            $scope.diagnostico1_nombre = data.Nombre;
          }

          if ($scope.tipoaut == '2') {
            $scope.encabezado.coddiag = data.Codigo;
            $scope.encabezado.nomdiag = data.Nombre;
          }
          text = 'Principal';
        } else {
          if ($scope.tipoaut == '1') {
            $scope.solicitud.dxsecundario = data.Codigo;
            $scope.diagnostico2_nombre = data.Nombre;
          }
          if ($scope.tipoaut == '2') {
            $scope.encabezado.coddiag2 = data.Codigo;
            $scope.encabezado.nomdiag2 = data.Nombre;
          }
          text = 'Secundario';
          $scope.closemodals('diagnostico');
        }

        swal({ title: "Completado", text: "Diagnostico " + text + " Registrado", showConfirmButton: false, type: "success", timer: 800 });
      }
      $scope.removeDiagnostico = function (params) {
        switch (params) {
          case 't1':
            $scope.solicitud.dxsecundario = '';
            $scope.diagnostico2_nombre = '';
            break;
          case 't2':
            $scope.encabezado.coddiag2 = '';
            $scope.encabezado.nomdiag2 = '';
            break;
        }
      }
      $scope.seleccionarips = function (data, tipo) {
        var text = '';
        if (tipo == 'S') {
          $scope.solicitud.codips = data.Codigo;
          $scope.solicitud.nombreips = data.Nombre;
          text = 'Ips Solicitante.';
          $scope.buscarEspecialidades();
          $scope.closemodals('ips');
          swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
        }
      }


      $scope.buscarEspecialidades = function () {

        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
          data: { function: 'p_obtener_especialidades' }
        }).then(function (response) {
          $scope.listEspecialidades = response.data;
        })
      }

      $scope.seleccionarservicio = function (data, tipo) {
        var text = ''
        $scope.bservicio = '';
        $scope.solicitud.servicio = data.CODIGO;
        $scope.solicitud.nombreservcio = data.CODIGO + ' - ' + data.NOMBRE;
        text = 'Servicio Seleccionado Correctamente!';
        swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
        $scope.closemodals('modalservicio');

      }

      $scope.seleccionarespecialidad = function (data) {
        var text = ''
        $scope.bservicio = '';
        $scope.solicitud.cargomedico = data.nombre;
        text = 'Especialidad Selecionada Correctamente!';
        swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
        $scope.closemodals('modalespecialidad');

      }
      $scope.inactivebarradiag = true;
      $scope.buscarDiagnosticos = function (texto) {
        if ($scope.coincidencia) {
          if ($scope.tipoaut == '1') {
            $scope.hijo = 0;
            $http({
              method: 'POST',
              url: "php/autorizaciones/esoa/esoa.php",
              data: { function: 'obtenerdiagnostico', coincidencia: $scope.coincidencia, sexo: $scope.afiliado.SEXO, edad: $scope.afiliado.EDAD, hijo: $scope.hijo }
            }).then(function (response) {
              console.log(response.data);
              if (response.data.Codigo == "1") {
                $scope.listDiagnosticos = [];
                $scope.inactivebarradiag = true;
                swal('Importante', response.data.Nombre, 'info');

              } else {
                $scope.listDiagnosticos = response.data;
                $scope.inactivebarradiag = false;
              }
            })
          }



          if ($scope.tipoaut == '2') {
            $http({
              method: 'POST',
              url: "php/autorizaciones/esoa/esoa.php",
              data: {
                function: 'obtenerDiagnostico', coincidencia: $scope.coincidencia,
                sexo: $scope.sexo,
                edad: $scope.edad,
                hijo: 0
              }
            }).then(function (response) {
              if (response.data.Codigo == "1") {
                $scope.listDiagnosticos = [];
                $scope.inactivebarradiag = true;
                swal('Importante', response.data.Nombre, 'info');
              } else {
                $scope.listDiagnosticos = response.data;
                $scope.inactivebarradiag = false;
              }
            })
          }
        } else {
          swal('Importante', 'El campo  de texto no puede estar vacio!', 'info');
        }

      }


      $scope.buscarIps = function (ips) {

        if (ips != "" || ips != undefined) {
          $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
            data: { function: 'obtenerListadoIps', coincidencia: ips }
          }).then(function (response) {
            if (response.data["0"].Codigo == '0') {
              swal('Importante', 'IPS no encontrada', 'info');
              $scope.inactivebarraips = true;
            } else {
              $scope.listIps = response.data;
              $scope.inactivebarraips = false;
            }
          })
        } else {
          swal('Importante', 'El campo  de texto no puede estar vacio!', 'info');
        }

      }

      $scope.pasostab = function (op) {
        switch (op) {
          case '1':
            $("#btn-solicitudtabI").removeClass("grey");
            $scope.invsolicitudtabI = false;
            $scope.titletabI = 'Solicitud';
            break;
          case '-1':
            $("#btn-productotabI").addClass("grey");
            $scope.invsolicitudtabI = false;
            $scope.titletabI = 'Solicitud';
            $scope.invproductotabI = true;
            break;
          case '2':
            $scope.validartab('solicitud');
            if ($scope.pasarsolicitudaut == true) {
              $scope.setTab(2);
            } else {
              swal('Importante', $scope.textvalidate, 'info');
            }
            break;
          case '5':
            $scope.validartabI('autorizacion');
            if ($scope.pasarsolicitudaut == true) {
              $scope.check_option_3 = true;
              $scope.nameautedit = 'Detalle';
            } else {
              swal('Importante', $scopoe.textvalidate, 'info');
            }
            break;
          case '-5':
            $scope.nameautedit = 'Encabezado';
            $scope.check_option_3 = false;
            break;
          case '6':
            if ($scope.productosagregadostabIV.length == 0 || $scope.productosagregadostabIV == undefined) {
              var text = 'Se creara la autorizacion en estado activa debido a que faltan los productos';
            } else {
              var text = 'Procesar autorización';
            }
            if ($scope.pasarproductoaut == true) {
              $scope.finalizartabIV(text);
            } else {
              swal('Importante', 'Debe agregar un producto', 'info')
            }
            break;
          case '-2':
            $("#btn-finalizartabI").addClass("grey");
            $scope.invproductotabI = false;
            $scope.titletabI = 'Producto';
            $scope.invfinalizartabI = true;
            break;
          case '3':
            if ($scope.productosagregadostabI.length == 0 || $scope.productosagregadostabI == undefined) {
              var text = 'Se creara la autorizacion en estado activa debido a que faltan los productos';
            } else {
              var text = 'Procesar autorización';
            }
            // if ($scope.pasarproductoaut == true) {
            if ($scope.productosagregadostabI.length > 0) {
              $scope.finalizartabI(text);
              $("#btn-finalizartabI").removeClass("grey");
            } else {
              swal('Importante', 'Debe agregar un producto', 'info')
            }
            break;
          case '4':
            setTimeout(function () {
              swal({ title: "Completado", text: 'Autorización Completada', type: "success", timer: 800 });
              $scope.limpiar('1');
              $scope.$apply();
            }, 500);
            break;
          case 't4':
            setTimeout(function () {
              $scope.solicitud.ubicacion = $scope.autorizacion.documento ? 0 : $scope.solicitud.ubicacion;
              $scope.buscarAutorizaciones($scope.autorizacion.documento, $scope.autorizacion.numero, $scope.solicitud.ubicacion)
              swal({ title: "Completado", text: 'Autorización Completada', type: "success", timer: 800 });
              $scope.limpiar('4');
              $scope.$apply();
            }, 500);
            break;
          default:
        }
      }


      // $scope.cargarDiagnosticos = function (texto) {
      //   console.log(texto);
      //   console.log($scope.afiliado);
      //   $scope.mostrar_inicial=false;
      //   $scope.mostrar_nada=false;
      //   $scope.coincidencia1 = texto
      //   if ($scope.tipo!=4  && $scope.coincidencia1.length > 3 && $scope.modal==false) {

      //     $scope.coincidencia = $scope.coincidencia1;

      //     if(!$scope.afiliado.SEXO){
      //       swal("Importante", "Para realizar los diagnostico favor ingresar los datos del Paciente", "info");
      //       $scope.Listardiagnosticos = undefined;            
      //       $scope.mostrar_inicial=true;

      //       return
      //     }
      //     if ($scope.hijodesw == true) {
      //       $scope.hijo = 1;
      //     } else {
      //       $scope.hijo = 0;
      //     }

      //     $http({
      //       method: 'POST',
      //       url: "php/siau/CodigoUrgencia/Rcodigourgencia.php",
      //       data: { function: 'obtenerdiagnostico', coincidencia: $scope.coincidencia, sexo: $scope.afiliado.SEXO, edad: $scope.afiliado.EDAD, hijo: $scope.hijo }
      //     }).then(function (response) {
      //       if (response.data.codigo == "-1") {
      //         $scope.Listardiagnosticos = undefined;
      //         $scope.mostrar_nada=true;
      //       } else {
      //         $scope.Listardiagnosticos = response.data;
      //       }
      //     })
      //   } else if ($scope.tipo==4 &&  $scope.coincidencia1.length > 6){
      //     $http({
      //       method: 'POST',
      //       url: "php/autorizaciones/autorizacion/funcautorizacionips.php",
      //       data: {
      //         function: 'obtenerListadoIps',  coincidencia : $scope.coincidencia1,
      //       }
      //     }).then(function (response) {
      //       if (response.data[0].Codigo == "0") {
      //         $scope.mostrar_inicial=false;
      //         $scope.Listardiagnosticos=undefined;
      //         $scope.mostrar_nada=true;
      //       } else {
      //         $scope.mostrar_nada=false;
      //         $scope.Listardiagnosticos = response.data;
      //       }
      //     })
      //   } else if ($scope.tipo!=4  && $scope.coincidencia1 != "" && $scope.coincidencia1.length >= 3){
      //     $http({
      //       method: 'POST',
      //       url: "php/siau/CodigoUrgencia/Rcodigourgencia.php",
      //       data: {
      //         function: 'obtenerDiagnostico',  coincidencia : $scope.coincidencia1,
      //         sexo: $scope.sexo,
      //         edad: $scope.edad,
      //         hijo:0
      //       }
      //     }).then(function (response) {
      //       if (response.data == "-1") {
      //         $scope.Listardiagnosticos = "";
      //       } else {
      //         $scope.Listardiagnosticos = response.data;
      //       }
      //     })
      //   }else{
      //     $scope.mostrar_nada=false;
      //     $scope.mostrar_inicial=true;
      //     $scope.Listardiagnosticos=undefined;

      //   }

      // }
      $scope.cerrar = function () {
        $scope.listDiagnosticos = [];
        $scope.coincidencia1 = '';
      }

      $scope.inactivebarrapro = true;
      $scope.buscarproductomodal = function (coincidencia1) {
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

          if (response.data.CODIGO == "1") {
            $scope.inactivebarrapro = true;
            $scope.listProductos = [];
            swal('Importante', response.data.NOMBRE, 'info');
          } else {
            $scope.inactivebarrapro = false;
            $scope.listProductos = response.data;

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
        $scope.textfile="";
        $scope.solicitud = {
          numero: '0',
          ubicacion: '0',
          tipodocumento: '',
          documento: '',
          nombre: '',
          fecingreso: '',
          origen: '',
          ubipaciente: '',
          tiposervicio: '',
          servicio: '',
          nombreservcio: '',
          viaingreso: '',
          contrato: '',
          ubicacioncontrato: '',
          documentocontrato: '',
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
          ruta: '',
          direccion: '',
          actividad: 'I'
        }
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

      $scope.formatTextoObs = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/[|!¡¿?°$=/()"#%{}*&''`´¨<>]/g, '');
        valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
        input.value = valor;
      }

      $scope.formatSoloTexto = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/[|!¡¿?°$=/()"#%{}*&''`´¨<>0123456789]/g, '');
        valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
        input.value = valor;
      }

      $scope.FormatSoloTextoNumero = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        input.value = valor.replace(/[^\wÑñ,.-\s]/g, '');
      }
      $scope.focusboolean = true;
      $scope.getFocusJustificacion = function () {
        $scope.focusboolean = false;
      }

      $scope.validarjustificacion = function () {
        if ($scope.focusboolean == false) {
          if ($scope.solicitud.justificacion.length < 30) {
            swal("Importante", "La justificación debe tener como minimo 30  y maximo 1000 caracteres", "info");
            return;
          }
          $scope.focusboolean = true;
        }

      }




    }])
