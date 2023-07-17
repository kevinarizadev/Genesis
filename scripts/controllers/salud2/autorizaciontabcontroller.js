'use strict';
angular.module('GenesisApp')
 .controller('autorizaciontabcontroller',['$scope', '$http', 'consultaHTTP', '$filter', 'ngDialog', 'cfpLoadingBar', 'afiliacionHttp',
 function($scope, $http, consultaHTTP, $filter, ngDialog, cfpLoadingBar, afiliacionHttp) {
  var dat = { prov: 'navb' }
  $.getJSON("php/obtenersession.php", dat)
      .done(function(respuesta) {
          $scope.sesdata = respuesta;
          $scope.responsable = $scope.sesdata.cedula;

      })
      .fail(function(jqXHR, textStatus, errorThrown) {
          console.log("navbar error obteniendo variables");
      });

  $scope.nit = $scope.nit = sessionStorage.getItem('nit');
  var hoy = new Date();
  var dd = hoy.getDate();
  var mm = hoy.getMonth() + 1; //hoy es 0!                
  var yyyy = hoy.getFullYear();
  if (dd < 10) {
      dd = '0' + dd
  }
  if (mm < 10) {
      mm = '0' + mm
  }

   $scope.obtenerautorizacion = function (tipodocumento,documento,fechaingreso,fechaegreso){
   censoHttp.obteneraut(tipodocumento, documento,fechaingreso,fechaegreso).then(function(response){
      if (response.data.codigo != '-1'){
          $scope.autorizaciones = response.data;
          $scope.iscero = true;
      }else{
        $scope.iscero = false;
      }
    })
   }
   
  $scope.maxDate = yyyy + '-' + mm + '-' + dd;

  $scope.TipoDocumental = '0';
  $scope.TipoDocumentalCabeza = '0';
  $scope.Parte1 = true;
  $scope.Parte2 = false;
  $scope.Parte3 = false;
  $scope.toggle_lista=true;

  $scope.Nacimiento = false;
  $scope.Incosistencia = false;
  $scope.AfliadoNoExiste = false;

  $scope.OcultarTablaInformacion = true;
  $scope.OcultarTipoReportes = true;
  $scope.TipoReporte = true;
  $scope.TipoReporte2 = true;

  $scope.OcultarCargue = true;

  $scope.CargueCabeza = false;

  $scope.Boton = false;
  $scope.ListadoSeleccionado = [];
  $scope.ListadoSeleccionadoCabeza = [];
  
  $scope.info = {
      reportes: '0',
      type: '0',
      numero: '',
      reportes2: 'NE'
  } 
  $scope.datos = {
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      tipodocumento: '',
      numero: '',
      nacimiento: '',
      sexo: '',
      tipodocumento_cabeza: '',
      numero_cabeza: ''

  }

  $scope.json = {
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      sexo: '',
      documento: '',
      tipodocumento: ''
  };

  $scope.limpiar = function() {
      $scope.datos = {
          primer_nombre: '',
          segundo_nombre: '',
          primer_apellido: '',
          segundo_apellido: '',
          tipodocumento: '',
          numero: '',
          nacimiento: '',
          sexo: '',
          tipodocumento_cabeza: '',
          numero_cabeza: '',
          telefono: '',
          celular: '',
          correo: ''
      }
      $scope.json = {
          primer_nombre: '',
          segundo_nombre: '',
          primer_apellido: '',
          segundo_apellido: '',
          sexo: '',
          documento: '',
          tipodocumento: ''
      }
  }


  $http({
      method: 'POST',
      url: "php/ips/func3047.php",
      data: { function: 'tipo_documentos' }
  }).then(function(response) {
      $scope.listadodocumento = response.data;
  });

  $scope.CambioDocumento = function() {
      $scope.OcultarTablaInformacion = true;
      $scope.OcultarTipoReportes = true;
      $scope.TipoReporte = true;
      $scope.TipoReporte2 = true;
  }

  $scope.get_sol_afiliaciones = function(){
    swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false
      });

    $http({
        method: 'POST',
        url: "php/censo/censo.php",
        data: { function: 'obtenersolicitudesafiliacion',
                ubicacion: sessionStorage.getItem('municipio'),
                documento: sessionStorage.getItem('cedula')}
    }).then(function(response) {
        $scope.solicitudes_afiliacion = response.data;
          swal.close();
        setTimeout(function () {
       
            if ($scope.estadoincumplimiento == 'I') {
              $scope.tablecenso.destroy();
            }
            $scope.estadoincumplimiento ='I';
            $scope.tablecenso = $('#table_solicitud_afiliacion').DataTable({
              language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
              lengthMenu: [[5, 10, -1], [5, 10, 'Todas']]
            });
            
          }, 500);
          setTimeout(function() {
            swal.close();
          }, 1000);
    });     
  }

  $scope.switch = function(){
      $scope.toggle_lista = !$scope.toggle_lista;

      if ($scope.toggle_lista!=true) {
        $scope.get_sol_afiliaciones();
    }
  }


  $scope.Consultar = function() {
      if ($scope.info.type == '0' || $scope.info.numero == null || $scope.info.numero == undefined) {
          swal('Notificacion', 'Debe Completar Todos Los Campos', 'info');
      } else {
          $http({
              method: 'POST',
              url: "php/ips/func3047.php",
              data: {
                  function: 'ConsultarAfiliado',
                  tipo: $scope.info.type,
                  numero: $scope.info.numero
              }
          }).then(function(response) {
              $scope.respuesta = response.data;
              if ($scope.respuesta.codigo == '0') {
                  swal('Notificacion', $scope.respuesta.mensaje, 'info');
                  $scope.OcultarTablaInformacion = true;
                  $scope.TipoReporte = true;
                  $scope.OcultarTipoReportes = true;
                  $scope.TipoReporte2 = true;
              } else {
                  $scope.numero_cabeza = $scope.respuesta[0].documento;
                  $scope.regimen = $scope.respuesta[0].codigo_regimen;
                  $scope.tipodocumento_cabeza = $scope.respuesta[0].tipo_documento;
                      $scope.OcultarTablaInformacion = false;
                      $scope.TipoReporte = false;
                      $scope.OcultarTipoReportes = false;
                      $scope.TipoReporte2 = true;                   

              }
          });
      }
  }

   //nuevo
  $scope.cardando_datos = function () {
      $scope.info = {};
      if ((sessionStorage.getItem('documento_nac') != null) && (sessionStorage.getItem('documento_nac') != undefined) && (sessionStorage.getItem('documento_nac') != '')) {
          $scope.info.type = sessionStorage.getItem('tipodoc_nac');
          $scope.info.numero = sessionStorage.getItem('documento_nac');
          $scope.Consultar();
      }
  }
  $scope.cardando_datos();

  $scope.Campos = false;
  $scope.AgregarNombre = function(id) {
      if (id == 'CN') {
          $scope.Campos = true;
          $scope.datos.primer_nombre = 'HIJO DE';
          $scope.datos.segundo_nombre = ''; //$scope.respuesta[0].primer_nombre + ' ' +$scope.respuesta[0].segundo_nombre;
          $scope.datos.primer_apellido = $scope.respuesta[0].primer_apellido;
          $scope.datos.segundo_apellido = $scope.respuesta[0].segundo_apellido;
      } else {
          $scope.Campos = false;
          $scope.datos.primer_nombre = '';
          $scope.datos.segundo_nombre = '';
          $scope.datos.primer_apellido = '';
          $scope.datos.segundo_apellido = '';

      }

  }



  $scope.Siguiente = function(id) {
      switch (id) {
          case '0':
              $scope.limpiar();
              if ($scope.info.reportes == '0' && $scope.TipoReporte == false) {
                  swal('Notificacion', 'Debe Seleccionar El Tipo Reporte', 'info');
              } else if ($scope.info.reportes == 'N' && $scope.TipoReporte == false) {
                  $scope.nombre = 'Reporte Nacimiento';
                  $scope.Parte1 = false;
                  $scope.Parte2 = true;
                  $scope.Parte3 = false;
                  $scope.Nacimiento = true;
                  $scope.Incosistencia = false;
                  $scope.AfliadoNoExiste = false;
                  $scope.listardepartamento();
              } else if ($scope.info.reportes == 'I' && $scope.TipoReporte == false) {
                  $scope.nombre = 'Registrar Inconsistencia';
                  $scope.Parte1 = false;
                  $scope.Parte2 = true;
                  $scope.Parte3 = false;
                  $scope.Nacimiento = false;
                  $scope.Incosistencia = true;
                  $scope.AfliadoNoExiste = false;
                  $scope.datos.primer_nombre = $scope.respuesta[0].primer_nombre;
                  $scope.datos.segundo_nombre = $scope.respuesta[0].segundo_nombre;
                  $scope.datos.primer_apellido = $scope.respuesta[0].primer_apellido;
                  $scope.datos.segundo_apellido = $scope.respuesta[0].segundo_apellido;
                  $scope.datos.sexo = $scope.respuesta[0].genero;
                  $scope.datos.numero = $scope.respuesta[0].documento;
                  var date_formato = $scope.respuesta[0].fecha_nacmiento.split("/");
                  $scope.datos.nacimiento = new Date(date_formato[2], date_formato[1] - 1, date_formato[0]);
                  $scope.datos.tipodocumento = $scope.respuesta[0].tipo_documento;
              } else {
                  $scope.limpiar();
                  $scope.nombre = 'Registar Afiliado';
                  $scope.Parte1 = false;
                  $scope.Parte2 = true;
                  $scope.Parte3 = false;
                  $scope.Nacimiento = false;
                  $scope.Incosistencia = false;
                  $scope.AfliadoNoExiste = true;
                  $scope.listardepartamento();
              }
              break;
          case '1':
              $scope.ValidoInformacion()
              if ($scope.validacion == '0' && $scope.info.reportes == 'N' && $scope.TipoReporte == false) {
                  $scope.Parte1 = false;
                  $scope.Parte2 = false;
                  $scope.Parte3 = true;
              } else if ($scope.validacion == '0' && $scope.info.reportes == 'I' && $scope.TipoReporte == false) {
                  $scope.Parte1 = false;
                  $scope.Parte2 = false;
                  $scope.Parte3 = true;

                  $scope.json.primer_nombre = $scope.datos.primer_nombre;
                  $scope.json.segundo_nombre = $scope.datos.segundo_nombre;
                  $scope.json.primer_apellido = $scope.datos.primer_apellido;
                  $scope.json.segundo_apellido = $scope.datos.segundo_apellido;
                  $scope.json.sexo = $scope.datos.sexo;
                  $scope.json.documento = $scope.datos.numero;
                  $scope.json.tipodocumento = $scope.datos.tipodocumento;
                  $scope.json.nacimiento = $scope.datos.nacimiento;
              } else if ($scope.validacion == '0' && $scope.TipoReporte == true) {
                  $scope.Parte1 = false;
                  $scope.Parte2 = false;
                  $scope.Parte3 = true;
              }
              break;
          default:
      }
  }

  $scope.Regresar = function(id) {
      switch (id) {
          case '0':
              if ($scope.info.reportes == 'N' && $scope.TipoReporte == false) {
                  $scope.Parte1 = true;
                  $scope.Parte2 = false;
                  $scope.Parte3 = false;
                  $scope.Nacimiento = false;
                  $scope.Incosistencia = false;
                  $scope.AfliadoNoExiste = false;
              } else if ($scope.info.reportes == 'I' && $scope.TipoReporte == false) {
                  $scope.Parte1 = true;
                  $scope.Parte2 = false;
                  $scope.Parte3 = false;
                  $scope.Nacimiento = false;
                  $scope.Incosistencia = false;
                  $scope.AfliadoNoExiste = false;
              } else {
                  $scope.Parte1 = true;
                  $scope.Parte2 = false;
                  $scope.Parte3 = false;
                  $scope.Nacimiento = false;
                  $scope.Incosistencia = false;
                  $scope.AfliadoNoExiste = false;
              }
              break;
          case '1':
              if ($scope.info.reportes == 'N' && $scope.TipoReporte == false) {
                  $scope.Parte1 = false;
                  $scope.Parte2 = true;
                  $scope.Parte3 = false;
                  $scope.Nacimiento = true;
                  $scope.Incosistencia = false;
                  $scope.AfliadoNoExiste = false;
              } else if ($scope.info.reportes == 'I' && $scope.TipoReporte == false) {
                  $scope.Parte1 = false;
                  $scope.Parte2 = true;
                  $scope.Parte3 = false;
                  $scope.Nacimiento = false;
                  $scope.Incosistencia = true;
                  $scope.AfliadoNoExiste = false;
              } else {
                  $scope.Parte1 = false;
                  $scope.Parte2 = true;
                  $scope.Parte3 = false;
                  $scope.Nacimiento = false;
                  $scope.Incosistencia = false;
                  $scope.AfliadoNoExiste = true;
              }
              break;
          default:
      }

  }


  // else if ($scope.datos.segundo_apellido == '' || $scope.datos.segundo_apellido == undefined || $scope.datos.segundo_apellido == null) {
  //   swal('Notificacion', 'Debe Digitar El Segundo Apellido', 'error');
  // } 
  $scope.ValidoInformacion = function() {
      if ($scope.info.reportes == 'N' && $scope.TipoReporte == false) {
          if ($scope.datos.primer_nombre == '' || $scope.datos.primer_nombre == undefined || $scope.datos.primer_nombre == null) {
              swal('Notificacion', 'Debe Digitar El Primer Nombre', 'error');
          } else if ($scope.datos.primer_apellido == '' || $scope.datos.primer_apellido == undefined || $scope.datos.primer_apellido == null) {
              swal('Notificacion', 'Debe Digitar El Primer Apellido', 'error');
          } else if ($scope.datos.tipodocumento == '') {
              swal('Notificacion', 'Debe Seleccionar El Tipo De Documento', 'error');
          } else if ($scope.datos.numero == '' || $scope.datos.numero == undefined || $scope.datos.numero == null) {
              swal('Notificacion', 'Debe Digitar El Numero De Indentificacion', 'error');
          } else if ($scope.datos.nacimiento == '' || $scope.datos.nacimiento == undefined || $scope.datos.nacimiento == null) {
              swal('Notificacion', 'Debe Seleccionar La Fecha Nacimiento', 'error');
          } else if ($scope.datos.sexo == '') {
              swal('Notificacion', 'Debe Seleccionar El Genero', 'error');
          } else if (($scope.regimen == 'C') && ($scope.datos.correo == '' || $scope.datos.correo == undefined || $scope.datos.correo == null)) {
              swal('Notificacion', "Para los afliados contributivos es obligatorio el campo  correo. Favor digitarlo", 'error')
          } else if (($scope.regimen == 'C') && ($scope.datos.telefono == '' || $scope.datos.telefono == undefined || $scope.datos.telefono == null)) {
              swal('Notificacion', "Para los afliados contributivos es obligatorio el campo telefono. Favor digitarlo", 'error')
          } else if (($scope.regimen == 'C') && ($scope.datos.dirrecion == '' || $scope.datos.dirrecion == undefined || $scope.datos.dirrecion == null)) {
              swal('Notificacion', "Para los afliados contributivos es obligatorio el campo dirreción. Favor digitarlo", 'error')
          } else {
              $scope.validacion = '0';
          }
      } else if ($scope.info.reportes == 'I' && $scope.TipoReporte == false) {
          if ($scope.datos.primer_nombre == '' || $scope.datos.primer_nombre == undefined || $scope.datos.primer_nombre == null) {
              swal('Notificacion', 'Debe Digitar El Primer Nombre', 'error');
          } else if ($scope.datos.primer_apellido == '' || $scope.datos.primer_apellido == undefined || $scope.datos.primer_apellido == null) {
              swal('Notificacion', 'Debe Digitar El Primer Apellido', 'error');
          } else if ($scope.datos.segundo_apellido == '' || $scope.datos.segundo_apellido == undefined || $scope.datos.segundo_apellido == null) {
              swal('Notificacion', 'Debe Digitar El Segundo Apellido', 'error');
          } else if ($scope.datos.tipodocumento == '') {
              swal('Notificacion', 'Debe Seleccionar El Tipo De Documento', 'error');
          } else if ($scope.datos.numero == '' || $scope.datos.numero == undefined || $scope.datos.numero == null) {
              swal('Notificacion', 'Debe Digitar El Numero De Indentificacion', 'error');
          } else if ($scope.datos.nacimiento == '' || $scope.datos.nacimiento == undefined || $scope.datos.nacimiento == null) {
              swal('Notificacion', 'Debe Seleccionar La Fecha Nacimiento', 'error');
          } else if ($scope.datos.sexo == '') {
              swal('Notificacion', 'Debe Seleccionar El Genero', 'error');
          } else {
              $scope.validacion = '0';
          }
      }
  }

  $scope.BuscarTipoDocumental = function(id) {
      if (id == '0') {
          $scope.OcultarCargue = true;
      } else {
          $scope.TipoDocumental = id;
          $scope.OcultarCargue = false;
      }
  }

  $scope.SubirSoporte = function() {
      var adjunto = $("#adjunto");
      if (adjunto[0].value == null || adjunto[0].value == undefined || adjunto[0].value == '') {
          swal('Notificacion', 'Debe Adjuntar Un Soporte', 'error');
      } else {
          swal({
              title: 'Confirmar',
              text: "¿Confirmar el cargue del soporte para el afiliado?",
              type: 'question',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Continuar',
              cancelButtonText: 'Cancelar'
          }).then((result) => {
              if (result) {
                  var FR = new FileReader();
                  FR.addEventListener("load", function(e) {
                      $scope.adjuntoafiliado = e.target.result;
                      $scope.extension = adjunto[0].files[0].name.split('.').pop();
                      $scope.CrearArray($scope.TipoDocumental, $scope.adjuntoafiliado, $scope.extension);
                  });
                  FR.readAsDataURL(adjunto[0].files[0]);
              }
          })
      }
  }

  $scope.SubirSoporteCabeza = function(type) {
      if (type == '' || type == null || type == undefined) {
          swal('Notificacion', 'Debe Seleccionar El Tipo De Soporte', 'error');
      } else {
          $scope.TipoDocumentalCabeza = type
          var adjuntocab = $("#adjuntocab");
          if (adjuntocab[0].value == null || adjuntocab[0].value == undefined || adjuntocab[0].value == '') {
              swal('Notificacion', 'Debe Adjuntar Un Soporte', 'error');
          } else {
              swal({
                  title: 'Confirmar',
                  text: "¿Confirmar el cargue del soporte para el cabeza de familia?",
                  type: 'question',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Continuar',
                  cancelButtonText: 'Cancelar'
              }).then((result) => {
                  if (result) {
                      var FR = new FileReader();
                      FR.addEventListener("load", function(e) {
                          $scope.adjuntoafiliadocabeza = e.target.result;
                          $scope.extensioncabeza = adjuntocab[0].files[0].name.split('.').pop();
                          $scope.CrearArrayCabeza($scope.TipoDocumentalCabeza, $scope.adjuntoafiliadocabeza, $scope.extensioncabeza);

                      });
                      FR.readAsDataURL(adjuntocab[0].files[0]);
                  }
              })
          }
      }

  }

  $scope.CargarSoportesCabeza = function() {
      $http({
          method: 'POST',
          url: "php/ips/func3047.php",
          data: {
              function: 'CargarSoportes',
              tipodocumento: $scope.tipodocumento_cabeza,
              numero: $scope.numero_cabeza,
              archivos: JSON.stringify($scope.ListadoSeleccionadoCabeza)
          }
      }).then(function(response) {
          $scope.respu = response.data;
          if ($scope.respu.length > '0') {
              $http({
                  method: 'POST',
                  url: "php/ips/func3047.php",
                  data: {
                      function: 'SubirArchivos',
                      tipodocumento: $scope.tipodocumento_cabeza,
                      numero: $scope.numero_cabeza,
                      rutas: JSON.stringify($scope.respu),
                      cantidad: $scope.respu.length
                  }
              }).then(function(res) {
                  if (res.data.codigo == '0') {
                      swal('Notificacion', res.data.mensaje, 'info');
                      $scope.Consultar();
                  } else {
                      swal('Notificacion', res.data.mensaje, 'error');
                  }
              });
          } else {
              swal('Notificacion', $scope.respuesta.mensaje, 'error');
          }
      });
  }

  $scope.CrearArrayCabeza = function(codigo, base64, ext) {
      for (var i = 0; i < $scope.listadodocumento.length; i++) {
          if (codigo == $scope.listadodocumento[i].codigo) {
              $scope.ListadoSeleccionadoCabeza.push({ "codigo": codigo, "base64": base64, "nombre": $scope.listadodocumento[i].nombre, "extension": ext });
              $scope.LimparSoporteCabeza();
              break;
          }
      }
      $scope.CargarSoportesCabeza();
  }

  $scope.CrearArray = function(codigo, base64, ext) {
      for (var i = 0; i < $scope.listadodocumento.length; i++) {
          if (codigo == $scope.listadodocumento[i].codigo) {
              $scope.ListadoSeleccionado.push({ "codigo": codigo, "base64": base64, "nombre": $scope.listadodocumento[i].nombre, "extension": ext });
              $scope.LimparSoporte();
              break;
          }
      }
      $scope.$apply();
  }

  $scope.LimparSoporte = function() {
      $scope.TipoDocumental = '0';
      $scope.adjuntoafiliado = '';
      $scope.nombreadjunto = '';
      $scope.OcultarCargue = true;
  }

  $scope.LimparSoporteCabeza = function() {
      $scope.TipoDocumentalCabeza = '0';
      $scope.adjuntoafiliadocabeza = '';
      $scope.NombreAbjuntoCabeza = '';
  }

  $scope.removeItem = function(cod) {
      for (var i = 0; i < $scope.ListadoSeleccionado.length; i++) {
          if (cod == $scope.ListadoSeleccionado[i].codigo) {
              $scope.pos = i;
              break;
          }
      }
      $scope.ListadoSeleccionado.splice($scope.pos, 1);
      $scope.LimparSoporte();

  }

  $scope.AbrirModalDireccion = function() {
      $scope.dialogDiagreg = ngDialog.open({
          template: 'views/consultaAfiliados/nucleofamiliar/modal/modalDireccion.html',
          className: 'ngdialog-theme-plain',
          controller: 'actualizarinformacion',
          closeByDocument: false,
          closeByEscape: false,
          scope: $scope
      });
      $scope.dialogDiagreg.closePromise.then(function(data) {
          if (data.value != "$closeButton") {
              $scope.datos.dirrecion = data.value;
              $scope.datos.barrio = $('#barrio').val();
          } else {
              $scope.datos.dirrecion = '';
              $scope.datos.barrio = '';
          }
      });
  }

  $scope.GuardarDireccion = function(ViaPrincipal, NumViaPrincipal, Letra, Numero, Bis, Cuadrante, NumeroVG, SelectLetraVG, NumeroPlaca, CuadranteVG, Complemento) {
      $scope.closeThisDialog($('#direcciond').val());
      $scope.closeThisDialog($('#barrio').val());
  }

  $scope.listardepartamento = function() {
      $http({
          method: 'POST',
          url: "php/consultaafiliados/funcnovedadacb.php",
          data: { function: 'cargaDepartamentos' }
      }).then(function(response) {
          $scope.Depto = response.data;
      });
  }


  $scope.BuscoMunicipio = function(cod) {
      if ($scope.datos.departamento == '' || $scope.datos.departamento == null || $scope.datos.departamento == undefined) {
          return;
      } else {
          $http({
              method: 'POST',
              url: "php/consultaafiliados/funcnovedadacb.php",
              data: { function: 'cargaMunicipios', depa: $scope.datos.departamento }
          }).then(function(response) {
              $scope.Mun = response.data;
          });
      }
  }

  $scope.CargarSoportes = function() {
      if ($scope.ListadoSeleccionado.length == '0') {
          swal('Notificacion', 'No Hay Soporte Para El Cargue', 'error');
      } else {
          return new Promise(function(resolve, reject) {
              $http({
                  method: 'POST',
                  url: "php/ips/func3047.php",
                  data: {
                      function: 'CargarSoportes',
                      tipodocumento: $scope.datos.tipodocumento,
                      numero: $scope.datos.numero,
                      archivos: JSON.stringify($scope.ListadoSeleccionado)
                  }
              }).then(function(response) {
                  $scope.respu = response.data;
                  $scope.mensaje = response.data[0].mensaje;
                  $scope.codigo = response.data[0].codigo;
                  $scope.ruta = response.data[0].ruta;
                  if ($scope.respu.length > '0') {
                      resolve($scope.codigo);
                  } else {
                      reject;
                      swal('Notificacion', $scope.mensaje, 'error');
                  }
                  // if ($scope.respu.length > '0') {
                  //     $http({
                  //         method: 'POST',
                  //         url: "php/ips/func3047.php",
                  //         data: {
                  //             function: 'SubirArchivos',
                  //             tipodocumento: $scope.datos.tipodocumento,
                  //             numero: $scope.datos.numero,
                  //             rutas: JSON.stringify($scope.respu),
                  //             cantidad: $scope.respu.length
                  //         }
                  //     }).then(function (res) {
                  //         if (res.data.codigo == '0') {
                  //             $scope.resulta = res.data.codigo;
                  //             resolve($scope.resulta);
                  //         } else {
                  //             reject;
                  //             swal('Notificacion', res.data.mensaje, 'error');
                  //         }
                  //     });
                  // } else {
                  //     swal('Notificacion', $scope.respuesta.mensaje, 'error');
                  // }
              });
          });
      }
  }

  $scope.InsertarAfiliado = function() {
      var promise = $scope.CargarSoportes();
      promise.then(function(resultado) {
          if (resultado == '0') {
              swal({ title: 'Registrando Informacion....' });
              swal.showLoading();
              var formattedDate = moment($scope.datos.nacimiento).format('DD/MM/YYYY');

              if ($scope.responsable=='32856342' || $scope.responsable=='8521697' || $scope.responsable=='32612938' || $scope.responsable=='32612938' || $scope.responsable=='1143450658') {
                      swal('Notificacion','Nacimiento Creado Correctamente', 'success');
                      $scope.LimpiarTodo();
              } else {
                 $http({
                  method: 'POST',
                  url: "php/censo/censo.php",
                  data: {
                      function: 'notificacion_nacimiento',
                      tipodocumento: $scope.datos.tipodocumento,
                      numero: $scope.datos.numero,
                      primer_nombre: $scope.datos.primer_nombre,
                      segundo_nombre: $scope.datos.segundo_nombre,
                      primer_apellido: $scope.datos.primer_apellido,
                      segundo_apellido: $scope.datos.segundo_apellido,
                      sexo: $scope.datos.sexo,
                      municipio: $scope.datos.municipio,
                      nacimiento: formattedDate,
                      responsable: $scope.responsable,
                      tipo_proceso: $scope.info.reportes,
                      tipodocumento_cabeza: $scope.tipodocumento_cabeza,
                      documento_cabeza: $scope.numero_cabeza,
                      nit: $scope.nit,
                      ruta: $scope.ruta,
                      dirrecion: $scope.datos.dirrecion,
                      celular: $scope.datos.telefono,
                      correo: $scope.datos.correo,
                      regimen: $scope.regimen,
                  }
              }).then(function(response) {
                  if (response.data.codigo == '1') {
                      swal.close();
                      swal('Notificacion', response.data.mensaje, 'success');
                      $scope.LimpiarTodo();
                  } else {
                      swal.close();
                      swal('Notificacion', response.data.mensaje, 'error')
                      $scope.LimpiarTodo();
                  }
              });  
              }
          }
      });
  }



  $scope.Guardar = function() {
      if ($scope.info.reportes == 'N' && $scope.TipoReporte == false) {
          $scope.InsertarAfiliado();
      } else if ($scope.info.reportes == 'I' && $scope.TipoReporte == false) {
          $scope.RegistrarIncosistencia();
      }
  }
  $scope.FormatSoloNumero = function (NID) {
   // const input = document.getElementById('' + NID + '');
    var valor = NID;
    //valor = valor.replace(/[^0-9]/g, '');
    valor = valor.replace(/[^A-Za-z0-9]/g, '');
    
    $scope.datos.numero = valor;
  }

  $scope.LimpiarTodo = function() {
      $scope.TipoDocumental = '0';
      $scope.Parte1 = true;
      $scope.Parte2 = false;
      $scope.Parte3 = false;

      $scope.Nacimiento = false;
      $scope.Incosistencia = false;
      $scope.AfliadoNoExiste = false;


      $scope.OcultarTablaInformacion = true;
      $scope.OcultarTipoReportes = true;
      $scope.TipoReporte = true;
      $scope.TipoReporte2 = true;

      $scope.OcultarCargue = true;
      $scope.CargueCabeza = false;
      $scope.ListadoSeleccionado = [];
      $scope.ListadoSeleccionadoCabeza = [];

      $scope.info = {
          reportes: '',
          type: '',
          numero: '',
          reportes2: 'NE'
      }
      $scope.json = {
          primer_nombre: '',
          segundo_nombre: '',
          primer_apellido: '',
          segundo_apellido: '',
          sexo: '',
          docimento: '',
          tipodocumento: ''
      }

      $scope.datos = {
          primer_nombre: '',
          segundo_nombre: '',
          primer_apellido: '',
          segundo_apellido: '',
          tipodocumento: '',
          numero: '',
          nacimiento: '',
          sexo: '',
          tipodocumento_cabeza: '',
          numero_cabeza: '',
          telefono: '',
          celular: '',
          correo: ''
      }
      $scope.mensaje = '';
      $scope.codigo = '';
      $scope.ruta = '';
  }






}]);
