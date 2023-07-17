'use strict';
angular.module('GenesisApp')
  .controller('censotabcontroller', ['$scope', 'censoHttp','$http', 'ngDialog', '$controller', 
    function ($scope, censoHttp,$http, ngDialog, $controller) {


      
    $scope.textarea = true;
    $scope.tipo_doc = ' ';
    $scope.testancia = ' ';
    $scope.regimen = ' ';
    $scope.sexo = ' ';
    $scope.servicio = ' ';
    $scope.vwcantidadhijo = true;
    $scope.nacidode;
    $scope.eshijode = 'N';
    $scope.cantidadhijo = 0;
    $scope.numero_au = 0;
    $scope.msj = "Registro de Afiliado";
    $scope.ips = { codigo: '0', nombre: "SELECCIONAR" }
    $scope.diagnostico = { codigo: '0', nombre: "SELECCIONAR" }
    $scope.diagnosticoa = { codigo: '0', nombre: "SELECCIONAR" }
    $scope.diagnosticoad = { codigo: '0', nombre: "SELECCIONAR" }
    $scope.municipio = { codigo: '0', nombre: "SELECCIONAR" }
    $scope.fecha_ingreso = new Date();


    var dat = { prov: 'navb' }
    $.getJSON("php/obtenersession.php", dat)
      .done(function (respuesta) {
        $scope.sesdata = respuesta;
        $scope.cedula = $scope.sesdata.cedula;
        $scope.ubicacion = $scope.sesdata.codmunicipio;
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.log("navbar error obteniendo variables");
      });

    censoHttp.obtenerHospitalizacion().then(function (response) {
      $scope.listservicio = response.data;
   //   var fecha3 = moment();   
   //   $scope.fecha4 = formatDate_amd(fecha3);   
      


   //   $scope.fecha5 = fecha3.diff(3, 'days');
    })

    censoHttp.obtenerTipoEstancia().then(function (response) {
      $scope.listEstancia = response.data;
    })

    function formatDate(date) {
      var month = date.getUTCMonth() + 1;
      date = date.getDate() + "/" + month + "/" + date.getFullYear();
      return date;
    }

 
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

    $scope.buscarAutorizacion = function (type) {
      if (type == 'A') {
        censoHttp.obtenercamposautorizacion($scope.numero_au).then(function (response) {
          if (response.data.length != 0) {
            $scope.listautorizacion = response.data;
            $scope.fecha_au = new Date($scope.listautorizacion[0].FECHAAUT.substring(6, 10), $scope.listautorizacion[0].FECHAAUT.substring(3, 5) - 1, $scope.listautorizacion[0].FECHAAUT.substring(0, 2));
            $scope.fecha_nac = new Date($scope.listautorizacion[0].NACIMIENTO.substring(6, 10), $scope.listautorizacion[0].NACIMIENTO.substring(3, 5) - 1, $scope.listautorizacion[0].NACIMIENTO.substring(0, 2));
            //$scope.fecha_ingreso    =   new Date($scope.listautorizacion[0].FECHAINGRESO.substring(6, 10), $scope.listautorizacion[0].FECHAINGRESO.substring(3, 5) - 1, $scope.listautorizacion[0].FECHAINGRESO.substring(0, 2));       
            $scope.ips = { codigo: $scope.listautorizacion[0].IPS, nombre: $scope.listautorizacion[0].NOMBREIPS }
            $scope.nomIps();
            $scope.diagnostico = { codigo: $scope.listautorizacion[0].CODDIAGNOSTICO, nombre: $scope.listautorizacion[0].NOMBREDIAGNOSTICO }
            $scope.nomDiagnosticos();
            $scope.municipio = { codigo: $scope.listautorizacion[0].UBICGEO, nombre: $scope.listautorizacion[0].NOMUBICGEO.replace($scope.listautorizacion[0].UBICGEO, '') }
            $scope.nomMun();
            $scope.tipo_doc = $scope.listautorizacion[0].TIPODOCUMENTO;
            $scope.documento = $scope.listautorizacion[0].DOCUMENTO;
            $scope.regimen = $scope.listautorizacion[0].REGIMEN;
            $scope.primer_nombre = $scope.listautorizacion[0].PNOMBRE;
            $scope.segundo_nombre = $scope.listautorizacion[0].SNOMBRE;
            $scope.primer_apellido = $scope.listautorizacion[0].PAPELLIDO;
            $scope.segundo_apellido = $scope.listautorizacion[0].SAPELLIDO;
            $scope.sexo = $scope.listautorizacion[0].SEXO;
            $scope.servicioCla = $scope.listautorizacion[0].CLASIFICACION;
            $scope.edad = Number($scope.listautorizacion[0].EDAD.substring(0, 3));
          } else {
            swal('Informacion', 'datos de autorizacion no encontrado', 'info');

          }
        })
      }
      else {
        censoHttp.obtenercampospordocumento($scope.tipo_doc, $scope.documento).then(function (response) {
          if (response.data.length != 0) {
            $scope.listautorizacion = response.data;
            //$scope.fecha_au         =   new Date($scope.listautorizacion[0].FECHAAUT.substring(6, 10), $scope.listautorizacion[0].FECHAAUT.substring(3, 5) - 1, $scope.listautorizacion[0].FECHAAUT.substring(0, 2));       
            $scope.fecha_nac = new Date($scope.listautorizacion[0].NACIMIENTO.substring(6, 10), $scope.listautorizacion[0].NACIMIENTO.substring(3, 5) - 1, $scope.listautorizacion[0].NACIMIENTO.substring(0, 2));
            //$scope.fecha_ingreso    =   new Date($scope.listautorizacion[0].FECHAINGRESO.substring(6, 10), $scope.listautorizacion[0].FECHAINGRESO.substring(3, 5) - 1, $scope.listautorizacion[0].FECHAINGRESO.substring(0, 2));       
            /* $scope.ips              =  { codigo:$scope.listautorizacion[0].IPS,nombre:$scope.listautorizacion[0].NOMBREIPS}
             $scope.nomIps();
             $scope.diagnostico      =  { codigo:$scope.listautorizacion[0].CODDIAGNOSTICO,nombre:$scope.listautorizacion[0].NOMBREDIAGNOSTICO}
             $scope.nomDiagnosticos();*/
            $scope.municipio = { codigo: $scope.listautorizacion[0].UBICGEO, nombre: $scope.listautorizacion[0].NOMUBICGEO.replace($scope.listautorizacion[0].UBICGEO, '') }
            $scope.nomMun();
            /* $scope.tipo_doc         =  $scope.listautorizacion[0].TIPODOCUMENTO;
             $scope.documento        =  $scope.listautorizacion[0].DOCUMENTO;*/
            $scope.regimen = $scope.listautorizacion[0].REGIMEN;
            $scope.primer_nombre = $scope.listautorizacion[0].PNOMBRE;
            $scope.segundo_nombre = $scope.listautorizacion[0].SNOMBRE;
            $scope.primer_apellido = $scope.listautorizacion[0].PAPELLIDO;
            $scope.segundo_apellido = $scope.listautorizacion[0].SAPELLIDO;
            $scope.sexo = $scope.listautorizacion[0].SEXO;
            //$scope.servicioCla         =  $scope.listautorizacion[0].CLASIFICACION; 
            $scope.edad = Number($scope.listautorizacion[0].EDAD.substring(0, 3));
          } else {
             swal('Informacion', 'datos de afiliado no encontrado', 'info');
          }
        })
      }
    }

    $scope.new = {
      tipo_doc: '',
      tipo_documento2:'',
      documento: '',
      primer_nombre: '',
      segundo_nombre: '',
      primero_apellido: '',
      segundo_apellido: '',
      genero: '',
      municipio: '',
      fecha_nacimiento: '',
      telefono: '',
      celular: '',
      correo: ''
    };
    $scope.newnac = {
      tipo_doc: '',
      tipo_documento2:'',
      documento: '',
      primer_nombre: '',
      segundo_nombre: '',
      primero_apellido: '',
      segundo_apellido: '',
      genero: '',
      municipio: '',
      fecha_nacimiento: '',
      telefono: '',
      celular: '',
      correo: ''
    };

    $scope.switch = function () {
      $scope.afi_body = !$scope.afi_body;
      $scope.switch_msj($scope.afi_body);
      // $scope.new.tipo_documento = "MS";
    }

    $scope.switch_msj = function (a) {
      if (a == false) {
        $scope.msj = "Registro de Afiliado";
      } else {
        $scope.msj = "Registro de Nacido Vivo";
      }
    }
     $scope.psico = function (option) {
        if (option === 'HS') {
          $scope.dialogDiag = ngDialog.open({
            templateUrl: "views/salud/modal/modalestanciapsico.html",
            className: "ngdialog-theme-plain",
            controller: "modalestanciapsico",
            scope: $scope
          });
        $scope.dialogDiag.closePromise.then(function (data) {
          if (data && data.value /*check if data.value is what you want*/) {
              $scope.respuestas = data.value;
              console.log($scope.respuestas);
          }
       });
    }}
    $scope.RegistraNuevoAfiliado = function () {
      $scope.newnac;
      $scope.dialogDiagNuev = ngDialog.open({
        template: 'views/salud/modal/modalAfiliar.html',
        className: 'ngdialog-theme-plain',
        controller: 'modalAfiliadonuevoctrl',
        scope: $scope
      });
      $scope.dialogDiagNuev.closePromise.then(function (data) {
        if (data.value != "$closeButton") {
          $scope.new.documento = data.value.documento;
          $scope.new.tipo_doc = data.value.tipo;
          //$scope.buscarAutorizacion('D');
        }
      });
    }

    $scope.showhijode = function () {
      if ($scope.hijode === true) {
        $scope.vwcantidadhijo = false;
        $scope.eshijode = 'S';
      } else {
        $scope.vwcantidadhijo = true;
        $scope.eshijode = 'N';
        $scope.cantidadhijo = 0;
        $scope.eshijonacido = 'N';
      }
    }

    $scope.Nacidovivo = function () {
      if ($scope.nacidode === true) {
        $scope.vwcantidadhijo = false;
        $scope.eshijonacido = 'S';
      } else {
        $scope.vwcantidadhijo = true;
        $scope.eshijonacido = 'N';
      }
    }

    $scope.nomIps = function () {
      if ($scope.ips.codigo === undefined || $scope.ips.codigo == "") {
        $scope.ips.seleccion = "SELECCIONAR";
        $scope.ips.codigo = "0";
        $scope.ips.ubicacion = "0";
      } else {
        $scope.ips.seleccion = $scope.ips.codigo + ' - ' + $scope.ips.nombre
      }
    }

    $scope.nomDiagnosticos = function () {
      if ($scope.diagnostico.codigo === undefined || $scope.diagnostico.codigo == "") {
        $scope.diagnostico.seleccionC = "SELECCIONAR";
        $scope.diagnostico.codigo = "0";
      } else {
        $scope.diagnostico.seleccionC = $scope.diagnostico.codigo + ' - ' + $scope.diagnostico.nombre
      }
    }

    $scope.nomDiagnosticosA = function () {
      if ($scope.diagnosticoa.codigo === undefined || $scope.diagnosticoa.codigo == "") {
        $scope.diagnostico.seleccionCA = "SELECCIONAR";
        $scope.diagnosticoa.codigo = "0";
      } else {
        $scope.diagnosticoa.seleccionCA = $scope.diagnosticoa.codigo + ' - ' + $scope.diagnosticoa.nombre
      }
    }

    $scope.nomDiagnosticosAd = function () {
      if ($scope.diagnosticoad.codigo === undefined || $scope.diagnosticoad.codigo == "") {
        $scope.diagnosticoad.seleccionCAd = "SELECCIONAR";
        $scope.diagnosticoad.codigo = "0";
      } else {
        $scope.diagnosticoad.seleccionCAd = $scope.diagnosticoad.codigo + ' - ' + $scope.diagnosticoad.nombre
      }
    }
    
    $scope.switchp =function(){
       $scope.textarea = !$scope.textarea ;
    }
    

    $scope.limpiardatos = function () {
      $scope.tipo_doc = ' ';
      $scope.documento = ' ';
      $scope.testancia = ' ';
      $scope.regimen = ' ';
      $scope.sexo = ' ';
      $scope.edad = 0;
      $scope.servicio = ' ';
      $scope.vwcantidadhijo = true;
      $scope.eshijode = 'N';
      $scope.cantidadhijo = 0;
      $scope.numero_au = 0;
      $scope.ips = { codigo: '0', nombre: "SELECCIONAR" }
      $scope.diagnostico = { codigo: '0', nombre: "SELECCIONAR" }
      $scope.municipio = { codigo: '0', nombre: "SELECCIONAR" }
      $scope.diagnosticoa = { codigo: '0', nombre: "SELECCIONAR" }
      $scope.diagnosticoad = { codigo: '0', nombre: "SELECCIONAR" }
      $scope.fecha_ingreso = new Date();
      $scope.protocolo = false;
      $scope.primer_nombre = '';
      $scope.segundo_nombre = '';
      $scope.primer_apellido = '';
      $scope.segundo_apellido = '';
    }

    $scope.nomMun = function () {
      if ($scope.municipio.codigo === undefined || $scope.municipio.codigo == "") {
        $scope.municipio.seleccion = "SELECCIONAR";
        $scope.municipio.codigo = "0";
      } else {
        $scope.municipio.seleccion = $scope.municipio.codigo + ' - ' + $scope.municipio.nombre.replace($scope.municipio.codigo, '');
      }
    }
   function formatDate_amd(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    }

    $scope.diferencia_fechas = function( fecha_fin){
        var fecha1 = moment(formatDate_amd(fecha_fin));

        var fecha2 = moment();
      
      $scope.validacion_200dias = fecha2.diff(fecha1, 'days');
    }




    $scope.CrearCenso = function () {
     
    
 $scope.diferencia_fechas($scope.fecha_ingreso);

 if ($scope.validacion_200dias >= 4) {
    swal({
        title: 'Validar Informacion',
        text: 'Esta hospitalizacion tiene más de 4 días de antiguedad, por favor validar los datos de registro.',
        type: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'continuar',
        cancelButtonText: 'Cancelar'
      }).then(function () { }).catch(swal.noop);
 } else {
    $scope.showhijode();
      censoHttp.CrearCenso($scope.ips.ubicacion, 
                          $scope.ips.ubicacion,
                          $scope.tipo_doc,    
                          $scope.documento,
                          $scope.regimen,
                          $scope.numero_au,
                          $scope.municipio.codigo,
                          $scope.ips.codigo,
                          $scope.testancia,
                          $scope.cedula,
                          formatDate($scope.fecha_ingreso),
                          $scope.eshijode,
                          $scope.eshijonacido,
                          $scope.cantidadhijo,
                          $scope.diagnostico.codigo,
                          $scope.diagnosticoa.codigo,
                          $scope.diagnosticoad.codigo,
                          $scope.protocolo_text).then(function (response) {
                                if (response.data.codigo != 0) {  
                                  $scope.numerocenso = response.data.numero;
                swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Registrando Hospitalización.</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false
      });
           if ($scope.testancia == 'HS') {
              $http({
              method: 'POST',
              url: "php/censo/censo.php",
              data: {
                function: 'inserta_encuesta_psi',
                numero: $scope.numerocenso,
                ubicacion: $scope.ubicacion,
                responsable: $scope.sesdata.usu,
                encuesta: $scope.respuestas.respuestas
              }
            }).then(function (response) {
              swal.close();
              // $scope.auditoria_insertada = response.data;

              $scope.btnCenso = true;
             
               swal('Completado', response.data.mensaje, 'success').then((result)=>{
                 censoHttp.obtenerEvolucionPaciente($scope.ubicacion, $scope.numerocenso).then(function (response) {
                $scope.listevolucionpaciente = response.data;
                $scope.limpiardatos();
                  $controller('censohospitalariocontroller', {
                  $scope: $scope
                });
                $scope.obtener_censos_activos();
              })
              })
            }); 
             } else {             
            
          swal.close();
              $scope.btnCenso = true;
              swal('Completado', response.data.mensaje, 'success').then((result)=>{
                 censoHttp.obtenerEvolucionPaciente($scope.ubicacion, $scope.numerocenso).then(function (response) {

                $scope.listevolucionpaciente = response.data;
                $scope.limpiardatos();
                  $controller('censohospitalariocontroller', {
                  $scope: $scope
                });
                $scope.obtener_censos_activos();
              })
              })
             
           
             } 
            } else {
            swal('Informacion', response.data.mensaje, 'error');
          }
          $scope.btnCenso = false;
                          })
 }

      /*<script src="http://momentjs.com/downloads/moment.min.js"></script>*/
    
    }

    $scope.mostrarModalcenso = function (type, renglon) {
      $scope.renglon = renglon;
      switch (type) {
        case "I":
          $scope.dialogDiag = ngDialog.open({
            template: 'views/salud/modal/modalIps.html',
            className: 'ngdialog-theme-plain',
            controller: 'modalIpsctrl',
            scope: $scope
          });
          $scope.dialogDiag.closePromise.then(function (data) {
            if (data.value != "$document") {
              $scope.ips = {
                codigo: data.value.codigo,
                nombre: data.value.nombre,
                ubicacion: data.value.ubicacion
              }
              $scope.nomIps();
            }
          });
          break;
          case "NC":
            $scope.renglon
            $scope.dialogDiag = ngDialog.open({
              template: 'views/salud/modal/modalIps.html',
              className: 'ngdialog-theme-plain',
              controller: 'modalIpsctrl',
              scope: $scope
            });
            $scope.dialogDiag.closePromise.then(function (data) {
              if (data.value != "$document") {
                $scope.ips = {
                  codigo: data.value.codigo,
                  nombre: data.value.nombre,
                  ubicacion: data.value.ubicacion
                }
                $scope.nomIps();
              }
            });
            break;
        case "G":
          $scope.dialogDiag = ngDialog.open({
            template: 'views/salud/modal/modalValorglosa.html',
            className: 'ngdialog-theme-plain',
            controller: 'modalValorglosactrl',
            scope: $scope
          });
          $scope.dialogDiag.closePromise.then(function (data) {
            if (data.value != "$closeButton") {
              $scope.glosa = {
                valorobjecion: data.value.cantidad,
                descripcion: data.value.nombre,
                motivo: data.value.motivo
              }
            } else {
              $scope.objecionchbox = false;
            }
          });
          break;
        case "M":
          $scope.dialogDiag = ngDialog.open({
            template: 'views/salud/modal/modalMunicipios.html',
            className: 'ngdialog-theme-plain',
            controller: 'modalMunicipioctrl',
            scope: $scope
          });
          $scope.dialogDiag.closePromise.then(function (data) {
            if (data.value != "$document") {
              $scope.municipio = {
                codigo: data.value.codigo,
                nombre: data.value.nombre
              }
              $scope.nomMun();
            }
          });
          break;
        case "D":
          $scope.dialogDiag = ngDialog.open({
            template: 'views/salud/modal/modalDiagnosticos.html',
            className: 'ngdialog-theme-plain',
            controller: 'modalDxctrl',
            scope: $scope
          });
          $scope.dialogDiag.closePromise.then(function (data) {
            if (data.value != "$document") {
              $scope.diagnostico = {
                codigo: data.value.codigo,
                nombre: data.value.nombre
              }
              $scope.nomDiagnosticos();
            }
          });
          break;
        case "DA":
          $scope.dialogDiag = ngDialog.open({
            template: 'views/salud/modal/modalDiagnosticosa.html',
            className: 'ngdialog-theme-plain',
            controller: 'modaldiagnosticosActrl',
            scope: $scope
          });
          $scope.dialogDiag.closePromise.then(function (data) {
            if (data.value != "$document") {
              $scope.diagnosticoa = {
                codigo: data.value.codigo,
                nombre: data.value.nombre
              }
              $scope.nomDiagnosticosA();
            }
          });
          break;
          case "DA2":
          $scope.dialogDiag = ngDialog.open({
            template: 'views/salud/modal/modalDiagnosticosa.html',
            className: 'ngdialog-theme-plain',
            controller: 'modaldiagnosticosActrl',
            scope: $scope
          });
          $scope.dialogDiag.closePromise.then(function (data) {
            if (data.value != "$document") {
              $scope.diagnosticoad = {
                codigo: data.value.codigo,
                nombre: data.value.nombre
              }
              $scope.nomDiagnosticosAd();
            }
          });
          break;
      }


    }


  }]);
