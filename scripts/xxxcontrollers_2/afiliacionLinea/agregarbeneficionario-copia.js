'use strict';
angular.module('GenesisApp')
.controller('agregarbeneficiariocontroller', ['$scope', '$http', 'ngDialog', 'afiliacionHttp', 'notification', '$timeout', '$q', 'upload', 'communication', '$rootScope', '$localStorage', '$controller', '$window',
   function($scope, $http, ngDialog, afiliacionHttp, notification, $timeout, $q, upload, communication, $rootScope, $localStorage, $controller, $window) {
      var self = this;
      var x = "";
      var saved = "false";
      $scope.inactive = true;
      $scope.binactive2 = true;
      $scope.binactive3 = true;
      // $scope.inactive4=true;
      $scope.pistola = true;
      $scope.isAttachButton = true;
      $scope.qrmcedula = "";
      $scope.codigob = false;
      $scope.validaButtonText = "Validar";
      $scope.fosygaButtonText = "Adres";
      $scope.saveVisibility = false;
      $scope.showsubir = true;
      $scope.showseleccionar = true;
      communication.data.type = undefined;

      $(document).ready(function() {
         readOnly();
      });

      function readOnly() {
         $("#qrmcedula").focus();
         $scope.bsisben = parseInt($scope.sisben);
         getParametersUser();
      }

      function getParametersUser() {
         $.getJSON("php/obtenersession.php")
            .done(function(respuesta) {
               $scope.sesdata = respuesta;
               $scope.nomusu = $scope.sesdata.usu;
               $scope.pasusu = $scope.sesdata.acc;
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
               console.log("ERRVR555");
            });
      }

      function GuardarEntidadLS() {
         var x = $scope.entidad;
         var Elements = $scope.entidad;
         var q = 0,
            a = "";
         for (var i = 0; i < Elements.length; i++) {
            a = Elements[i].value;
            if (x == a) {
               q = i;
            }
         }
         $localStorage.entidadf = {
            valentidad: x,
            posentidad: q
         };
      }

      function GuardarMunicipioLS() {
         var x1 = $scope.municipio;
         var Elements = $scope.municipio;
         var q = 0,
            a;
         for (var i = 0; i < Elements.length; i++) {
            a = Elements[i].value;
            if (x1 == a) {
               q = i;
            }
         }
         var y = $scope.municipio;
         $localStorage.municipiof = {
            value: y,
            position: q
         };
      }

      $scope.bfiltro = {
         bselectpoblacional: " ",
         bselectdocumento: " ",
         bselectregimen: " ",
         bselectsexo: " ",
         bselectetnia: " ",
         bselectdiscapacidad: " ",
         bselectcondicion: " ",
         bselectparentesco: " ",
         banexo: " "
      };

      self.obtenerdatos = function() {
         $scope.bfiltro.bselectregimen = {
            Codigo: "S",
            Nombre: "SUBSIDIADO"
         };
         $scope.codigob = true;
         $scope.bfiltro.bselectdocumento = $scope.qrmcedula;
         if ($scope.qrmcedula.length > 0) {
            var y = $scope.qrmcedula;
            var tipodocub = tipodocumento(y);
            $(function() {
               $("#tipo_docb").val(y);
            });
            document.getElementById("tipo_docb").selectedIndex = tipodocub;
         }

         $scope.bdocumento = $scope.qrmnumero;
         $scope.bprimer_apellido = $scope.qrmprimer_apellido;
         $scope.bsegundo_apellido = $scope.qrmsegundo_apellido;
         $scope.bprimer_nombre = $scope.qrmprimer_nombre;
         $scope.bsegundo_nombre = $scope.qrmsegundo_nombre;
         if ($scope.qrmsexo == "M") {
            $scope.bfiltro.bselectsexo = "M";
            document.getElementById("sexoBeneficiario").selectedIndex = 1;
         } else {
            $scope.bfiltro.bselectsexo = "F";
            document.getElementById("sexoBeneficiario").selectedIndex = 2;
         }
         $(function() {
            $("#sexoBeneficiario").val($scope.qrmsexo);
         });
         $scope.bnacimiento = new Date($scope.qrmfecha.substring(0, 4), $scope.qrmfecha.substring(4, 6) - 1, $scope.qrmfecha.substring(6, 8));
      }

      $scope.obtenerDocumento = function() {
         afiliacionHttp.obtenerDocumento().then(function(response) {
            $scope.documentos = response;
         })
      }

      $scope.obtenerAnexo = function() {
         $http({
            method: 'POST',
            url: "php/aseguramiento/Rafiliacion.php",
            data: {
               function: 'obtenerdocumentoanexo'
            }
         }).then(function(response) {
            $scope.Anexos = response.data;
         }, function errorCallback(response) {
          swal('Mensaje',response.data,'error')
        });
      }

      $scope.obtenerRegimen = function() {
         afiliacionHttp.obtenerRegimen().then(function(response) {
            $scope.Regimenes = response;
         })
      }

      $scope.obtenerSexo = function() {
         afiliacionHttp.obtenerSexo().then(function(response) {
            $scope.Sexos = response;
         })
      }

      $scope.obtenerEtnia = function() {
         afiliacionHttp.obtenerEtnia().then(function(response) {
            $scope.Etnias = response;
         })
      }

      $scope.obtenerDiscapacidad = function() {
         afiliacionHttp.obtenerDiscapacidad().then(function(response) {
            $scope.Discapacidades = response;
         })
      }

      $scope.obtenerCondicion = function() {
         afiliacionHttp.obtenerCondicion().then(function(response) {
            $scope.Condiciones = response;
         })
      }

      $scope.obtenerGrupoPoblacional = function() {
         $http({
            method: 'POST',
            url: "php/aseguramiento/Rafiliacion.php",
            data: {
               function: 'obteneragrupoPoblacional'
            }
         }).then(function(response) {
            $scope.Gpoblacional = response.data;
         }, function errorCallback(response) {
          swal('Mensaje',response.data,'error')
        });
      }

      $scope.obtenerParentesco = function() {

         afiliacionHttp.obtenerParentesco().then(function(response) {
            $scope.Parentescos = response;
         })
      }

      function formatDate(date) {
         var month = date.getUTCMonth() + 1;
         date = date.getDate() + "/" + month + "/" + date.getFullYear();
         return date;
      }

      $scope.stateAttach = function() {
         if ($scope.bfiltro.banexo == "" || $scope.bfiltro.banexo == "SELECCIONAR") {
            $scope.showseleccionar = true;
         } else {
            $scope.showseleccionar = false;
            $scope.mostrar4()
         }
      }

      self.clear = function() {
         saved = "false";
         $scope.isAttachButton = true;
         communication.data.estadof = false;
         $scope.saveVisibility = false;
         $("#qrmcedula").focus();
         $scope.bprimer_nombre = "";
         $scope.bsegundo_nombre = "";
         $scope.bprimer_apellido = "";
         $scope.bsegundo_apellido = "";
         $scope.bnacimiento = "";
         $scope.qrmcedula = "";
         $scope.qrmnumero = "";
         $scope.qrmprimer_nombre = "";
         $scope.qrmsegundo_nombre = "";
         $scope.qrmprimer_apellido = "";
         $scope.qrmsegundo_apellido = "";
         $scope.qrmsexo = "";
         $scope.qrmfecha = "";
         $scope.binactive2 = true;
         $scope.binactive3 = true;
         $scope.qrmtipo_sangre = "";
         $scope.qrmnit = "";
         $scope.bnumeroN = "";
         $scope.bdocumento = "";
         $scope.bsisben = "";
         $scope.bfiltro = {
            bselectpoblacional: " ",
            bselectdocumento: " ",
            bselectregimen: " ",
            bselectsexo: " ",
            bselectetnia: " ",
            bselectdiscapacidad: " ",
            bselectcondicion: " ",
            bselectparentesco: " ",
            banexo: " "
         };
      }

      $scope.valorCondicion = function() {
         if ($scope.bfiltro.bselectdiscapacidad == "") {
            $scope.bfiltro.bselectcondicion = "";
            $scope.disDiscapacidad = true;
         } else {
            $scope.disDiscapacidad = false;
         }
      }

      function obtenerDatosCabezaFamilia(tipo_documento, documento) {
         $http({
            method: 'POST',
            url: "php/aseguramiento/Rafiliacion.php",
            data: {
               function: 'obtenerCabezaDatos',
               tipodoc: tipo_documento,
               documento: documento
            }
         }).then(function(response) {
            $scope.datosCabezaFamilia = response.data;
            $scope.localidad = $scope.datosCabezaFamilia.barrio;
            $scope.celular = $scope.datosCabezaFamilia.celular;
            $scope.telfijo = $scope.datosCabezaFamilia.telefono;
            $scope.escenario = $scope.datosCabezaFamilia.escenario;
            $scope.selectZona = $scope.datosCabezaFamilia.zona;
            $scope.direccion = $scope.datosCabezaFamilia.direccion;
            $scope.correo = $scope.datosCabezaFamilia.correo;
            $scope.sisben = $scope.datosCabezaFamilia.nivel_sisben;
            $scope.municipio = $scope.datosCabezaFamilia.municipio;
            $scope.entidad = $scope.datosCabezaFamilia.entidad;
            if ($scope.datosCabezaFamilia.movilidad == "S" || $scope.datosCabezaFamilia.portabilidad == "S") {
               $scope.reqSeleccionIps = true;
               $http({
                  method: 'POST',
                  url: "php/aseguramiento/Rafiliacion.php",
                  data: {
                     function: 'obtenerescenarios',
                     municipio: $scope.datosCabezaFamilia.municipio
                  }
               }).then(function(response) {
                  $scope.Ipss = response.data;
               });
            }else{
               $scope.reqSeleccionIps = false;
            }
            $timeout(function() {
               GuardarEntidadLS();
               GuardarMunicipioLS();
               $scope.bsisben = parseInt($scope.sisben);
            }, 500);
         }, function errorCallback(response) {
          swal('Mensaje',response.data,'error')
        });

      }
      $scope.afilValidada = function() {
         $scope.bfiltro.bselectdiscapacidad = "NN";
         $scope.bfiltro.bselectcondicion = "N";
         document.getElementById("poblacionBeneficiario").selectedIndex = "11";
         $scope.bfiltro.bselectpoblacional = document.getElementById("poblacionBeneficiario").value;
         $(function() {
            $("#poblacionBeneficiario").val(5);
         });
         $http({
            method: 'POST',
            url: "php/aseguramiento/Rafiliacion.php",
            data: {
               function: 'validarafiliacion',
               tipodoc: $scope.bfiltro.bselectdocumento,
               documento: $scope.bdocumento,
               primernombre: $scope.mparameters.primer_nombre,
               segundonombre: $scope.mparameters.segundo_nombre,
               primerapellido: $scope.mparameters.primer_apellido,
               segundoapellido: $scope.mparameters.segundo_apellido,
               fecnacimiento: $scope.mparameters.nacimiento
            }
         }).then(function(response) {
            var datos = response.data.split("-");
            var rescod = datos[0];
            var resmsg = datos[1];
            $scope.multi_afil = '';
            if (rescod == $CODE_ERROR) {
               swal({
                  title: 'Notificación - Multiafiliación',
                  text: resmsg,
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Continuar',
                  cancelButtonText: 'Cancelar'
               }).then(function(result){
                  if (result) {
                     $scope.binactive2 = false;
                     $scope.multi_afil = 'PV';
                  }    
               },function(dismiss) {
                  if (dismiss == "cancel") {
                     $scope.binactive2 = true;
                  }
               })
            } else {
               $scope.binactive2 = false;
               $scope.pistola = true;
               $scope.mostrar3()
               $scope.mostrar4()
               //lo nuevo
               afiliacionHttp.serviceFDC($scope.bfiltro.bselectdocumento, $scope.bdocumento, 'ObtenerSisben').then(function(response) {
                  var sisben = response.data;
                  $scope.bsisben = sisben.Nivel;
                  $scope.bpuntajesisben = sisben.Puntaje;
                  $scope.bfichasisben = sisben.Ficha;
                  $scope.validaSisben();
               });
               //----
            }
         }, function errorCallback(response) {
          swal('Mensaje',response.data,'error')
        });
      }
      self.validaform = function() {
         if ($scope.filtro.selecttramite == "B") {
            obtenerDatosCabezaFamilia($scope.parameters.tipo_documento, $scope.parameters.documento);
         }
         $("#subirlF").hide();
         loadingButton('valida');
         if ($scope.bfiltro.bselectdocumento == "" || $scope.bdocumento == undefined || $scope.bprimer_nombre == undefined || $scope.bprimer_apellido == undefined || $scope.bnacimiento == undefined) {
            swal('Información', 'Los campos de los datos básicos de identificación son obligatorios', 'info');
         } else {
            if ($scope.pistola == true) {
               if ($scope.bsegundo_nombre == undefined) {
                  var bsegnombre = " ";
               } else {
                  var bsegnombre = $scope.bsegundo_nombre.toUpperCase();
               }
               // Valida segundo apellido
               if ($scope.bsegundo_apellido == undefined) {
                  var bsegapellido = " ";
               } else {
                  var bsegapellido = $scope.bsegundo_apellido.toUpperCase();
               }
               $scope.mparameters = {
                  tipo_documento: $scope.bfiltro.selectdocumento,
                  documento: $scope.bdocumento,
                  primer_nombre: $scope.bprimer_nombre.toUpperCase(),
                  segundo_nombre: bsegnombre,
                  primer_apellido: $scope.bprimer_apellido.toUpperCase(),
                  segundo_apellido: bsegapellido,
                  nacimiento: formatDate($scope.bnacimiento),
                  dia: $scope.bnacimiento.getDate(),
                  mes: $scope.bnacimiento.getUTCMonth() + 1,
                  ano: $scope.bnacimiento.getFullYear()
               }
            } else {
               if ($scope.bsegundo_nombre == undefined) {
                  var bsegnombre = " ";
               } else {
                  var bsegnombre = $scope.bsegundo_nombre.toUpperCase();
               }
               // Valida segundo apellido
               if ($scope.bsegundo_apellido == undefined) {
                  var bsegapellido = " ";
               } else {
                  var bsegapellido = $scope.bsegundo_apellido.toUpperCase();
               }
               $scope.mparameters = {
                  segundo_nombre: bsegnombre,
                  segundo_apellido: bsegapellido,
                  tipo_documento: $scope.bfiltro.bselectdocumento.toUpperCase(),
                  documento: $scope.bdocumento,
                  primer_nombre: $scope.bprimer_nombre.toUpperCase(),
                  primer_apellido: $scope.bprimer_apellido.toUpperCase(),
                  nacimiento: formatDate($scope.bnacimiento),
                  dia: $scope.bnacimiento.getDate(),
                  mes: $scope.bnacimiento.getUTCMonth() + 1,
                  ano: $scope.bnacimiento.getFullYear()
               }
            }
            if ($scope.can_validate == false) {
               swal('Información', 'Antes de seguir con la afiliación debe verificar y registrar los datos de ADRES', 'info');
            } else {
               $scope.afilValidada();
            }
         }
         isAttachment($scope.bfiltro.bselectdocumento, $scope.bdocumento);
      }

      $scope.validaSisbenF = function() {
         if ($scope.bsisben >= 0 && $scope.bsisben <= 2) {
            $scope.binactive3 = false;
         } else {
            $scope.bsisben = "";
            $scope.binactive3 = true;
         }
         if ($scope.bsisben == "" || $scope.bsisben == null) {
            $scope.binactive3 = true;
         }
      }
      $scope.poblacionSisbenB = function() {
         if ($scope.bfiltro.bselectpoblacional == "1" || $scope.bfiltro.bselectpoblacional == "6" ||
            $scope.bfiltro.bselectpoblacional == "8" || $scope.bfiltro.bselectpoblacional == "9" ||
            $scope.bfiltro.bselectpoblacional == "11" || $scope.bfiltro.bselectpoblacional == "14" ||
            $scope.bfiltro.bselectpoblacional == "17" || $scope.bfiltro.bselectpoblacional == "22" ||
            $scope.bfiltro.bselectpoblacional == "24" || $scope.bfiltro.bselectpoblacional == "26") {
            $scope.bdisSisben = true;
            $scope.bdisPuntaje = true;
            $scope.bdisFicha = true;
            $scope.bsisben = 0;
            $scope.bpuntajesisben = 0;
            $scope.bfichasisben = null;
            $scope.binactive3 = false;
         } else {
            $scope.bdisSisben = false;
            $scope.bdisPuntaje = false;
            $scope.bdisFicha = false;
            $scope.bsisben = "";
            $scope.bpuntajesisben = "";
            $scope.binactive3 = true;
         }
      }
      $scope.mostrar3 = function() {
         if ($scope.bsisben == "" || $scope.bfiltro.bselectparentesco == "SELECCIONAR") {
            $scope.binactive3 = true;
         } else {
            $scope.binactive3 = false;
         }
      }

      $scope.mostrarparentesco = function() {
         $scope.binactive3 = false;
      }

      $scope.mostrar4 = function() {
         if ($scope.filtro.banexo != "SELECCIONAR") {
            $scope.completed = false;
         } else {
            $scope.completed = true;
         }
      }
      $scope.formb = function() {
         $scope.binactive2 = true;
         $scope.binactive3 = true;
         // var fecha1 = moment().format();;
         // var fecha2 = moment($scope.bnacimiento);

         // $scope.tempdate = fecha2.diff(fecha1, 'days') * -1;
         // if ($scope.tempdate < 365 && $scope.tempdate > 1) {
         //    $scope.enable = false;
         //    $scope.btnFosygaB = true;
         //    $scope.verAdres = true;
         // } else {
         //    $scope.enable = true;
         //    $scope.btnFosygaB = false;
         //    $scope.verAdres = false;
         // }
      }
      //  FUNCION EFECTO CARGUE
      function loadingButton(type) {
         switch (type) {
            case "valida":
               $scope.enable = "false";
               var $icon = $(this).find(".icon-arrows-cw"),
                  animateClass = "icon-refresh-animate";
               $icon.addClass(animateClass);
               $scope.validaButtonText = "Validando";
               $timeout(function() {
                  $scope.enable = "true";
                  $scope.validaButtonText = "Validar";
               }, 2000);
               break;
            case "guarda":
               $scope.enable = "false";
               var $icon = $(this).find(".icon-arrows-cw"),
                  animateClass = "icon-refresh-animate";
               $icon.addClass(animateClass);
               $scope.validaButtonGuardar = "Guardando...";
               $timeout(function() {
                  $scope.enable = "true";
                  $scope.validaButtonGuardar = " ";
               }, 2000);
               break;
            case "subir":
               $scope.infoadjuntar = "false";
               var $icon = $(this).find(".icon-arrows-cw"),
                  animateClass = "icon-refresh-animate";
               $icon.addClass(animateClass);
               $scope.validaButtonAdjuntar = "Subiendo";
               $("#subirlF").show();
               $timeout(function() {
                  $("#subirlF").hide();
                  $scope.infoadjuntar = "true";
                  $scope.validaButtonAdjuntar = "Subir";
               }, 2000);
               break;
            case "fosyga":
               $scope.enable = "false";
               var $icon = $(this).find(".icon-arrows-cw"),
                  animateClass = "icon-refresh-animate";
               $icon.addClass(animateClass);
               $scope.fosygaButtonText = "Cargando";
               $timeout(function() {
                  $scope.enable = "true";
                  $scope.fosygaButtonText = "Adres";
               }, 40000);
               break;
            default:
         }
      }

      // *** INSERTAR BENEFICIARIO ***
      self.ProcesarInfo = function() {
         if ($scope.bfiltro.bselectparentesco == "SELECCIONAR") {
            notification.getNotification('warning', 'Seleccione parentesco del afiliado.', 'Notificacion');
            return;
         }
         if ($scope.reqSeleccionIps == true) {
            if ($scope.bIpsAtencion != undefined) {
               $scope.escenario = $scope.bIpsAtencion;
            }else{
               swal('Información', 'Debe seleccionar una IPS', 'info');
            }            
         }
         loadingButton("guarda");
         if (communication.data.type == undefined) {
            $scope.parametersfosyga = {
               segundo_nombre: $scope.bsegundo_nombre,
               segundo_apellido: $scope.bsegundo_apellido,
               tipo_documentof: $scope.bfiltro.bselectdocumento,
               documento: $scope.bdocumento,
               primer_nombre: $scope.bprimer_nombre.toUpperCase(),
               primer_apellido: $scope.bprimer_apellido.toUpperCase(),
               nacimiento: formatDate($scope.bnacimiento),
               dia: $scope.bnacimiento.getDate(),
               mes: $scope.bnacimiento.getUTCMonth() + 1,
               ano: $scope.bnacimiento.getFullYear()
            }
         } else {
            $scope.parametersfosyga = {
               segundo_nombre: communication.data.segundonombre_fosyga,
               segundo_apellido: communication.data.segundoapellido_fosyga,
               tipo_documentof: communication.data.tipodocumento_fosyga,
               documento: communication.data.numero_fosyga,
               primer_nombre: communication.data.primernombre_fosyga.toUpperCase(),
               primer_apellido: communication.data.primerapellido_fosyga.toUpperCase(),
               nacimiento: formatDate(communication.data.fechanacimiento_fosyga),
               dia: communication.data.fechanacimiento_fosyga.getDate(),
               mes: communication.data.fechanacimiento_fosyga.getUTCMonth() + 1,
               ano: communication.data.fechanacimiento_fosyga.getFullYear()
            }
         }
         if ($scope.filtro.selecttramite == "C") {
            $http({
               method: 'POST',
               url: "php/aseguramiento/Cafiliacion.php",
               data: {
                  function: 'insertarafiliado',
                  tipo_documento: $scope.bfiltro.bselectdocumento,
                  documento: $scope.mparameters.documento,
                  cbf_tipo_documento: $scope.parameters.tipo_documento,
                  cbf_documento: $scope.parameters.documento,
                  cbf_tipo: 'O',
                  primer_nombre: $scope.mparameters.primer_nombre,
                  segundo_nombre: $scope.mparameters.segundo_nombre,
                  primer_apellido: $scope.mparameters.primer_apellido,
                  segundo_apellido: $scope.mparameters.segundo_apellido,
                  nacimiento: $scope.mparameters.nacimiento,
                  sexo: $scope.bfiltro.bselectsexo,
                  regimen: $scope.bfiltro.bselectregimen,
                  etnia: $scope.bfiltro.bselectetnia,
                  discapacidad: $scope.bfiltro.bselectdiscapacidad,
                  condicion: $scope.bfiltro.bselectcondicion,
                  nivelsisben: $scope.bsisben,
                  puntajesisben: $scope.bpuntajesisben,
                  fichasisben: $scope.bfichasisben,
                  gpoblacional: $scope.bfiltro.bselectpoblacional,
                  direccion: $scope.direccion,
                  telefono: $scope.telfijo,
                  celular: $scope.celular,
                  correo: $scope.correo,
                  municipio: $scope.filtro.municipio,
                  zona: $scope.filtro.selectZona,
                  localidad: $scope.localidad,
                  ips: $scope.filtro.escenario,
                  tipo_documento_bdua: $scope.parametersfosyga.tipo_documentof,
                  documento_bdua: $scope.parametersfosyga.documento,
                  primer_nombre_bdua: $scope.parametersfosyga.primer_nombre,
                  segundo_nombre_bdua: $scope.parametersfosyga.segundo_nombre,
                  primer_apellido_bdua: $scope.parametersfosyga.primer_apellido,
                  segundo_apellido_bdua: $scope.parametersfosyga.segundo_apellido,
                  nacimiento_bdua: $scope.parametersfosyga.nacimiento,
                  sexo_bdua: $scope.bfiltro.bselectsexo,
                  parentesco: $scope.bfiltro.bselectparentesco
               }
            }).then(function(response) {
               swal('Completado', response.data, 'success');
               savedForm();
               $controller('anexoscontroller', {
                  $scope: $scope
               });
               $scope.getParameterst($scope.parameters.tipo_documento, $scope.parameters.documento);
            }, function errorCallback(response) {
                swal('Mensaje',response.data,'error')
              });
         } else {
            if ($scope.multi_afil == 'PV') {
               $scope.estado_afiliado = $scope.multi_afil;
            } else {
               $scope.estado_afiliado = 'AC';
            }
            $http({
               method: 'POST',
               url: "php/aseguramiento/Cafiliacion.php",
               data: {
                  function: 'insertarafiliado',
                  estado: $scope.estado_afiliado,
                  tipo_documento: $scope.bfiltro.bselectdocumento,
                  documento: $scope.bdocumento,
                  cbf_tipo_documento: $scope.parameters.tipo_documento,
                  cbf_documento: $scope.parameters.documento,
                  cbf_tipo: 'O',
                  primer_nombre: $scope.mparameters.primer_nombre,
                  segundo_nombre: $scope.mparameters.segundo_nombre,
                  primer_apellido: $scope.mparameters.primer_apellido,
                  segundo_apellido: $scope.mparameters.segundo_apellido,
                  nacimiento: $scope.mparameters.nacimiento,
                  sexo: $scope.bfiltro.bselectsexo,
                  regimen: $scope.bfiltro.bselectregimen,
                  etnia: $scope.bfiltro.bselectetnia,
                  discapacidad: $scope.bfiltro.bselectdiscapacidad,
                  condicion: $scope.bfiltro.bselectcondicion,
                  nivelsisben: $scope.bsisben,
                  puntajesisben: $scope.bpuntajesisben,
                  fichasisben: $scope.bfichasisben,
                  gpoblacional: $scope.bfiltro.bselectpoblacional,
                  direccion: $scope.direccion,
                  telefono: $scope.telfijo,
                  celular: $scope.celular,
                  correo: $scope.correo,
                  municipio: $scope.municipio,
                  zona: $scope.selectZona,
                  localidad: $scope.localidad,
                  ips: $scope.escenario,
                  tipo_documento_bdua: $scope.parametersfosyga.tipo_documentof,
                  documento_bdua: $scope.parametersfosyga.documento,
                  primer_nombre_bdua: $scope.parametersfosyga.primer_nombre,
                  segundo_nombre_bdua: $scope.parametersfosyga.segundo_nombre,
                  primer_apellido_bdua: $scope.parametersfosyga.primer_apellido,
                  segundo_apellido_bdua: $scope.parametersfosyga.segundo_apellido,
                  nacimiento_bdua: $scope.parametersfosyga.nacimiento,
                  sexo_bdua: $scope.bfiltro.bselectsexo,
                  parentesco: $scope.bfiltro.bselectparentesco
               }
            }).then(function(response) {
               swal('Completado', response.data, 'success');
               //notification.getNotification('success',,'Notificacion');
               $window.open('views/consultaafiliados/soportes/fuar.php?tipo=' + $scope.bfiltro.bselectdocumento + '&id=' + $scope.bdocumento + '&add=BEN', '_blank', "width=1080,height=1100");
               savedForm();
               $controller('anexoscontroller', {
                  $scope: $scope
               });
               $scope.getParameterst($scope.bfiltro.bselectdocumento, $scope.bdocumento);
            }, function errorCallback(response) {
             swal('Mensaje',response.data,'error')
           });
         }
      }
      $scope.submitbeneficiario = function() {
         //
         var today = new Date();
         var dd = today.getDate();
         var mm = today.getMonth()+1; 
         var yyyy = today.getFullYear();
         dd<10?dd='0'+dd:dd=dd
         mm<10?mm='0'+mm:mm=mm         
         var oldname = $("#nombreadjuntob")[0].value;
         var ext = oldname.substr(oldname.indexOf("."), 5);
         var Filename = $scope.bfiltro.banexo + "_" + $scope.mparameters.tipo_documento + "_" + $scope.bdocumento + "_" + dd + mm + yyyy;
         if ($("#adjuntoBeneficiario")[0].value != "") {

            // Cargamos la imagen y la enviamos a la funcion PHP -- subiradjunto.php
            var formData = new FormData($("#formulariob")[0]);
            upload.uploadFile(formData).then(function(res) {
               loadingButton('imagen');
               // Procesamos respuesta por parte del servidor y enviamos mensaje de notificacion
               if (res == "1") {
                  $http({
                     method: 'POST',
                     url: "php/aseguramiento/Cafiliacion.php",
                     data: {
                        function: 'insertarsoporteBen',
                        tipodoc: $scope.bfiltro.bselectdocumento,
                        documento: $scope.bdocumento,
                        anexo: $scope.bfiltro.banexo,
                        ruta: $UPLOAD_FILE + dd + mm + yyyy + '/' + Filename + ext
                     }
                  }).then(function(response) {
                     isAttachment($scope.bfiltro.bselectdocumento, $scope.bdocumento);
                     loadingButton('subir');

                     // Res= 1 Imagen subida correctamente al servidor
                     swal('Completado',
                        'La imagen ha sido cargada exitosamente, si desea agregar otro adjunto, seleccione el tipo y haga click en adjuntar',
                        'success');
                     notification.getNotification('success', '', 'Notificacion');
                     document.getElementById("formulariob").reset();
                     $scope.saveVisibility = true;
                     saved = "false";
                     // Cambiamos el nombre de la imagen con el formato establecido

                     upload.uploadName(oldname, Filename + ext).then(function(res) {
                        loadingButton('subir');
                     });
                  }, function errorCallback(response) {
                   swal('Mensaje',response.data,'error')
                 });
               } else {
                  notification.getNotification('error', 'La imagen no pudo ser cargada', 'Notificacion');
               }
            });
         } else {
            notification.getNotification('error', "Debe seleccionar archivo", 'Notificacion')
         }
      }

      function isAttachment(tipo_documento, documento) {
         $http({
            method: 'POST',
            url: "php/aseguramiento/Rafiliacion.php",
            data: {
               function: 'validaranexo',
               tipodoc: tipo_documento,
               documento: documento
            }
         }).then(function(response) {
            var megs = response.data.split('-');
            if (megs[0] == "false" && saved == "false") {
               $scope.isAttachButton = false;
               saved = "true";
            } else {
               if ($scope.saveVisibility == true) {
                  $scope.isAttachButton = true;
               }
            };
         }, function errorCallback(response) {
          swal('Mensaje',response.data,'error')
        });
      }
      self.active = function() {
         $scope.bfiltro.bselectregimen = {
            Codigo: "S",
            Nombre: "SUBSIDIADO"
         };
         if ($scope.pistola == false) {
            notification.getNotification('info', 'Lector de codigo desactivado!', 'Notificacion');
            $scope.qrmcedula = "";
            $scope.codigob = true;
            $("#qrmcedula").focus();
         } else {
            notification.getNotification('info', 'Lector de codigo activado!', 'Notificacion');
            $scope.bfiltro.bselectetnia = {
               Codigo: "6",
               Nombre: "NO APLICA"
            };
            $("#qrmcedula").focus();
            $scope.qrmcedula = "";
            $scope.codigob = false;
         }
      }

      function tipodocumento(type) {
         var position = 0;
         switch (type) {
            case "CC":
               position = 1;
               break;
            case "TI":
               position = 2;
               break;
            case "RC":
               position = 3;
               break;
            case "CE":
               position = 4;
               break;
            case "PA":
               position = 5;
               break;
            case "AS":
               position = 6;
               break;
            case "MS":
               position = 7;
               break;
            default:
               position = 0;
         }
         return position;
      }
      $rootScope.$on('ngDialog.opened', function(e, $dialog) {
         x = document.getElementById("tipo_docb").value;
         var tipodocu = tipodocumento(x);
         $(function() {
            $("#tipo_docb").val(x);
         });
         document.getElementById("tipo_docb").selectedIndex = tipodocu;

         $localStorage.communication = {
            value: 1
         };
      });


      function obtenernombre(nombres) {
         var str = nombres;
         var nn = str.indexOf(" ");
         var pn = str.substr(0, nn);
         var n = str.indexOf(" ");
         var sn = str.substr(n, str.length);

         if (nn == -1) {
            $scope.w2dprimer_nombre = str;
            $scope.w2dsegundo_nombre = "";
         } else {
            $scope.w2dprimer_nombre = pn;
            $scope.w2dsegundo_nombre = sn;
         }
      }

      function obtenerapellido(apellido) {
         var str = apellido;
         var nn = str.indexOf(" ");
         var pn = str.substr(0, nn);
         var n = str.indexOf(" ");
         var sn = str.substr(n, str.length);

         if (nn == -1) {
            $scope.w2dprimer_apellido = str;
            $scope.w2dsegundo_apellido = "";
         } else {
            $scope.w2dprimer_apellido = pn;
            $scope.w2dsegundo_apellido = sn;
         }
      }


      self.MostrarFosyga = function() {
         $scope.consulta_beneficiario = true;
         $scope.adres_dialog = ngDialog.open({
            template: 'views/afiliacionLinea/verfosyga.html',
            className: 'ngdialog-theme-plain',
            controller: 'verfosyga',
            scope: $scope
         });

         $scope.adres_dialog.closePromise.then(function (data) {
            if (data.value.adres_documento !== undefined) {
               $scope.can_validate = true;
               $scope.adres_data = data.value;
            }
         });
      }
         // if ($scope.filtro.selecttramite == "B") {
         //    obtenerDatosCabezaFamilia($scope.parameters.tipo_documento, $scope.parameters.documento);
         // }
         // loadingButton("fosyga");
         // afiliacionHttp.serviceFDC($scope.bfiltro.bselectdocumento, $scope.bdocumento, 'ObtenerFosyga').then(function(response) {
         //    var fosyga = response.data;
         //    if (response.data.Respuesta == 'Su token ha caducado' || fosyga.IdRespuesta == 101 || fosyga.IdRespuesta == -1 || fosyga.IdRespuesta == 9) {
         //       notification.getNotification('error', 'Servicio de Adres no arrojo datos', 'Notificacion');
         //       $scope.serviceActive = false;
         //       $scope.fosyga = {
         //          primer_nombre: $scope.bprimer_nombre,
         //          segundo_nombre: $scope.bsegundo_nombre,
         //          primer_apellido: $scope.bprimer_apellido,
         //          segundo_apellido: $scope.bsegundo_apellido,
         //          tipo_documento: $scope.bfiltro.bselectdocumento,
         //          numero_documento: $scope.bdocumento,
         //          sexo: $scope.bfiltro.bselectsexo,
         //          fecha_nacimiento: $scope.bnacimiento,
         //          estado: " ",
         //          regimen: " ",
         //          municipio: " ",
         //          Entidad: " ",
         //          selectentidad: "false",
         //          selectmun: "false",
         //          type: "Beneficiario"
         //       }
         //    } else {
         //       console.log(fosyga);
         //       if (fosyga.IdRespuesta == undefined) {
         //          notification.getNotification('error', 'Servicio no disponible en estos momentos', 'Notificacion');
         //          $scope.serviceActive = false;
         //          $scope.fosyga = {
         //             primer_nombre: $scope.bprimer_nombre,
         //             segundo_nombre: $scope.bsegundo_nombre,
         //             primer_apellido: $scope.bprimer_apellido,
         //             segundo_apellido: $scope.bsegundo_apellido,
         //             tipo_documento: $scope.bfiltro.bselectdocumento,
         //             numero_documento: $scope.bdocumento,
         //             sexo: $scope.bfiltro.bselectsexo,
         //             fecha_nacimiento: $scope.bnacimiento,
         //             estado: " ",
         //             regimen: " ",
         //             municipio: " ",
         //             Entidad: " ",
         //             selectentidad: "false",
         //             selectmun: "false",
         //             type: "Beneficiario"
         //          }
         //       } else {
         //          $scope.serviceActive = false;

         //          $scope.fosyga = {
         //             primer_nombre: $scope.w2dprimer_nombre,
         //             segundo_nombre: $scope.w2dsegundo_nombre,
         //             primer_apellido: $scope.w2dprimer_apellido,
         //             segundo_apellido: $scope.w2dsegundo_apellido,
         //             tipo_documento: fosyga.TipoDocumento,
         //             numero_documento: fosyga.Documento,
         //             //sexo: $scope.filtro.selectsexo,
         //             fecha_nacimiento: $scope.bnacimiento,
         //             estado: fosyga.Estado,
         //             regimen: fosyga.Regimen,
         //             municipio: fosyga.Departamento + '-' + fosyga.Municipio,
         //             Entidad: fosyga.EPS,
         //             selectentidad: "true",
         //             selectmun: "true",
         //             type: "Beneficiario"
         //          }
         //          obtenernombre(fosyga.Nombres);
         //          obtenerapellido(fosyga.Apellidos);
         //       }
         //    }

         //    if ($localStorage.communication == undefined) {
         //       $localStorage.communication = {
         //          value: 1
         //       };
         //    }

         //    $scope.inactive2 = true;
         //    $scope.inactive3 = true;
         //    $scope.inactive4 = true;
         //    $scope.inactive5 = true;

         //    ngDialog.open({
         //       template: 'views/afiliacionLinea/verfosyga.html',
         //       controller: 'verfosyga',
         //       controllerAs: 'ipctrl',
         //       scope: $scope
         //    });
         // });
      // }
      //----------------------------------------------------------------------------------------------------
      /* self.MostrarFosyga = function() {
         if ($scope.filtro.selecttramite =="B"){
           obtenerDatosCabezaFamilia($scope.parameters.tipo_documento,$scope.parameters.documento);
         }
         loadingButton("fosyga");
         // afiliacionHttp.serviceFDC($scope.bfiltro.bselectdocumento, $scope.bdocumento).then(function(response) {
         //     var fosyga = JSON.parse(response["0"]);
         //     if (fosyga.error.codTipoError != 0 || fosyga.GF.cabezaGrupo == null) {
         //         if (fosyga.GF.cabezaGrupo == null && fosyga.error.codTipoError == 0) {
         //             notification.getNotification('error', 'Servicio de Fosyga no arrojo datos del cabeza de familia en Fosyga', 'Notificacion');
         //         } else {
         //             notification.getNotification('error', fosyga.error.mensajeError, 'Notificacion');
         //         }
         //         $scope.fosyga = {
         //             primer_nombre: $scope.bprimer_nombre,
         //             segundo_nombre: $scope.bsegundo_nombre,
         //             primer_apellido: $scope.bprimer_apellido,
         //             segundo_apellido: $scope.bsegundo_apellido,
         //             tipo_documento: $scope.bfiltro.bselectdocumento,
         //             numero_documento: $scope.bdocumento,
         //             sexo: $scope.bfiltro.bselectsexo,
         //             fecha_nacimiento: $scope.bnacimiento,
         //             type: "Beneficiario"
         //         }
         //     } else {
         //         $scope.fosyga = {
         //             primer_nombre: fosyga.GF.cabezaGrupo.primerNombre ,
         //             segundo_nombre:  fosyga.GF.cabezaGrupo.segundoNombre ,
         //             primer_apellido: fosyga.GF.cabezaGrupo.primerApellido,
         //             segundo_apellido: fosyga.GF.cabezaGrupo.segundoApellido,
         //             tipo_documento:  fosyga.GF.cabezaGrupo.tipoID,
         //             numero_documento: fosyga.GF.cabezaGrupo.ID,
         //             sexo: $scope.bfiltro.bselectsexo,
         //             fecha_nacimiento: $scope.bnacimiento,
         //             type: "Beneficiario"
         //         }
         //     }
         //     ngDialog.open({
         //         template: 'views/afiliacionLinea/verfosyga.html',
         //         controller: 'verfosyga',
         //         controllerAs: 'ipctrl',
         //         scope: $scope
         //     });
         // }, function(err) {
         //                  $scope.fosyga = {
         //             primer_nombre: $scope.bprimer_nombre,
         //             segundo_nombre: $scope.bsegundo_nombre,
         //             primer_apellido: $scope.bprimer_apellido,
         //             segundo_apellido: $scope.bsegundo_apellido,
         //             tipo_documento: $scope.bfiltro.bselectdocumento,
         //             numero_documento: $scope.bdocumento,
         //             sexo: $scope.bfiltro.bselectsexo,
         //             fecha_nacimiento: $scope.bnacimiento,
         //             type: "Beneficiario"
         //         }
         //         ngDialog.open({
         //         template: 'views/afiliacionLinea/verfosyga.html',
         //         controller: 'verfosyga',
         //         controllerAs: 'ipctrl',
         //         scope: $scope
         //     });
         //            notification.getNotification('error', err, 'Notificacion');
         //      });
         $scope.fosyga = {
           primer_nombre: $scope.bprimer_nombre,
           segundo_nombre: $scope.bsegundo_nombre,
           primer_apellido: $scope.bprimer_apellido,
           segundo_apellido: $scope.bsegundo_apellido,
           tipo_documento: $scope.bfiltro.bselectdocumento,
           numero_documento: $scope.bdocumento,
           sexo: $scope.bfiltro.bselectsexo,
           fecha_nacimiento: $scope.bnacimiento,
           type: "Beneficiario"
         }
         ngDialog.open({
           template: 'views/afiliacionLinea/verfosyga.html',
           controller: 'verfosyga',
           controllerAs: 'ipctrl',
           scope: $scope
         })
       }*/


   }
]);