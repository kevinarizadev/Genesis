'use strict';
angular.module('GenesisApp')
.controller('solicitudPermisocontroller', ['$scope', '$http', 'ngDialog', 'ausentismoHttp','afiliacionHttp', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller', 'validationParams','$rootScope','$localStorage','$window',
function ($scope, $http, ngDialog, ausentismoHttp, afiliacionHttp, notification, $timeout, $q, upload, communication, $controller, validationParams, $rootScope,$localStorage,$window) {
  var self=this;
  var mensajes="";
  $(document).ready(function() {
    $(".k-autocomplete, .k-dropdown-wrap, .k-numeric-wrap, .k-picker-wrap, .k-textbox").css({"border-style":"none","border-bottom-style":"dotted"});
    var dat = {prov : 'navb'}
    $.getJSON( "php/obtenersession.php", dat)
    .done(function(respuesta) {
      $scope.sesdata = respuesta;
      //$scope.cedula = $scope.sesdata.cedula;

	  $scope.nomusu = $scope.sesdata.usu;
	  $scope.pasusu = $scope.sesdata.acc;
      communication.cedula = $scope.sesdata.cedula;
      $scope.ubicacion = $scope.sesdata.codmunicipio;
      communication.cedula = $scope.cedula;
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
      console.log("navbar error obteniendo variables");
    });
  })
  $scope.cedula = sessionStorage.getItem('cedula');
  console.log($scope.cedula);
  $scope.motivopermiso = true;
  $scope.inactive2 = true;
  $scope.camposcorrectos = false;
  $scope.fechaf = "";
  $scope.descripcion="";
  $scope.filtro = {Permisos:" "};
  $scope.radicado = "";
  $scope.fechainicio ="";
  $scope.fechafin ="";
  $scope.horainicio ="";
  $scope.horafin ="";
  $scope.nombreadjunto ="";

  $scope.tiempoA = "";
  $scope.tiempoB = "";
  $scope.tiempoC = "";
  $scope.tiempoD = "";
  $scope.tiempoE = "";
  $(".datepicker").kendoDatePicker({
    animation: {
      close: {
        effects: "fadeOut zoom:out",
        duration: 300
      },
      open: {
        effects: "fadeIn zoom:in",
        duration: 300
      }
    }
  });
  $(".timepicker").kendoTimePicker({
    animation: {
      close: {
        effects: "fadeOut zoom:out",
        duration: 300
      },
      open: {
        effects: "fadeIn zoom:in",
        duration: 300
      }
    }
  });
  $("#fechafin").kendoDatePicker({
    format: "dd/MM/yyyy",
    culture: "es-MX",
    disableDates: ["su", "sa"]
  });
  $("#horafin").kendoTimePicker({
    format: "h:mm tt",
    parseFormats: ["HH:mm"],
    min: new Date(0, 0, 0, 7, 0, 0),
    max: new Date(0, 0, 0, 18, 0, 0),
    culture: "es-MX"
  });
  $("#fechainicio").kendoDatePicker({
    format: "dd/MM/yyyy",
    culture: "es-MX",
    disableDates: ["su", "sa"]
  });
  $("#horainicio").kendoTimePicker({
    format: "h:mm tt",
    parseFormats: ["HH:mm"],
    min: new Date(0, 0, 0, 7, 0, 0),
    max: new Date(0, 0, 0, 18, 0, 0),
    culture: "es-MX"
  });
  var op18 = $("#fechainicio").data("kendoDatePicker");
  op18.enable(false);
  var op19 = $("#fechafin").data("kendoDatePicker");
  op19.enable(false);
  var op20 = $("#horainicio").data("kendoTimePicker");
  op20.enable(false);
  var op21 = $("#horafin").data("kendoTimePicker");
  op21.enable(false);
  //funcciones javascript
  function loadingButton(type) {
    switch (type) {
      case "guarda":
      $scope.enable = "false";
      var $icon = $(this).find(".icon-arrows-cw"),
      animateClass = "icon-refresh-animate";
      $icon.addClass(animateClass);
      $scope.validaButtonGuardar = "Guardando...";
      $timeout(function () {
        $scope.enable = "true";
        $scope.validaButtonGuardar = " ";
      }, 6000);
      break;
      case "subir":
      $scope.infoadjuntar = "false";
      var $icon = $(this).find(".icon-arrows-cw"),
      animateClass = "icon-refresh-animate";
      $icon.addClass(animateClass);
      $scope.validaButtonAdjuntar = "Subiendo";
      $("#subirl").show();
      $timeout(function () {
        $("#subirl").hide();
        $scope.infoadjuntar = "true";
        $scope.validaButtonAdjuntar = "Subir";
      }, 3000);
      break;
      default:
    }
  }
  function parsearfechainicio(){
    $scope.diainicio = $scope.fechainicio.getDate();
    $scope.mesinicio = $scope.fechainicio.getMonth()+1; //hoy es 0!
    $scope.anoinicio = $scope.fechainicio.getFullYear();
  }
  function parsearhorainicio(){
    $scope.horasinicio = $scope.horainicio.getHours();
    $scope.minutoinicio = $scope.horainicio.getMinutes(); //hoy es 0!
    $scope.segundoinicio = $scope.horainicio.getSeconds();
  }
  function parserfechafin(){
    $scope.diafin = $scope.fechafin.getDate();
    $scope.mesfin = $scope.fechafin.getMonth()+1; //hoy es 0!
    $scope.anofin = $scope.fechafin.getFullYear();
  }
  function parsearhorafin(){
    $scope.horasfin = $scope.horafin.getHours();
    $scope.minutofin = $scope.horafin.getMinutes(); //hoy es 0!
    $scope.segundofin = $scope.horafin.getSeconds();
  }
  function tipodepermiso(idpermiso){
    switch (idpermiso) {
      case "18":
      return "SERVICIOS MÉDICOS"
      break;
      case "19":
      return "DILIGENCIAS PERSONALES"
      break;
      case "20":
      return "CALAMIDAD DOMÉSTICA"
      break;
      case "21":
      return "EJERCICIO DEL SUFRAGIO JURADO"
      break;
      case "22":
      return "EJERCICIO DEL SUFRAGIO VOTANTE"
      break;
      case "23":
      return "ESTUDIOS PERMANENTES"
      break;
      case "24":
      return "EVENTOS DE CAPACITACIÓN EXTERNA"
      break;
      case "25":
      return "MATRIMONIO DEL FUNCIONARIO"
      break;
      case "26":
      return "ASUNTO DE OTRA CLASIFICACIÓN"
      break;
      default:
      return "solicitud"
    }
  }
  function sumarDias(fecha, dias){
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }
  function notificarHoras(x){
    var mensaje;
    switch (x) {
      case "18":
      mensaje = "Este Permiso permite hasta 4 Horas";
      break;
      case "19":
      mensaje = "Este Permiso permite hasta 3 Horas";
      break;
      case "20":
      mensaje = "Este Permiso permite hasta 2 Dias";
      break;
      case "21":
      mensaje = "Este Permiso permite hasta 8 Horas";
      break;
      case "22":
      mensaje = "Este Permiso permite hasta 4 Horas";
      break;
      case "23":
      mensaje = "Puede solicitar la fecha y hora de terminacion";
      break;
      case "24":
      mensaje = "Puede solicitar la fecha y hora de terminacion";
      break;
      case "25":
      mensaje = "Este Permiso permite hasta 3 Dias";
      break;
      case "26":
      mensaje = "Puede solicitar la fecha y hora de terminacion";
      break;
      case "0":
      mensaje = "0"
      break;
      default:
      mensaje = "0"
    }
    return mensaje;
  }

  $scope.obtenerPermiso = function () {
    ausentismoHttp.obtenerPermiso().then(function (response) {
      $scope.Permisos = response;
    })
  }

  $scope.descripcionhabilitado = function(){
    switch ($scope.filtro.Permisos) {
      case "20":
        if($scope.descripcion != ""){
          var op15 = $("#fechainicio").data("kendoDatePicker");
          op15.enable(true);
          $("#fechainicio").kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date($scope.tiempoB),// sets min date today
            culture: "es-MX",
            disableDates: ["su", "sa"],
            change: function() {
              $scope.fechainicio = this.value();
              var op1 = $("#horainicio").data("kendoTimePicker");
              op1.enable(true);
              $("#horainicio").kendoTimePicker({
                format: "h:mm tt",
                parseFormats: ["HH:mm"],
                min: new Date(0, 0, 0, 7, 0, 0),
                max: new Date(0, 0, 0, 18, 0, 0),
                culture: "es-MX",
                change: function() {
                  $scope.horainicio = this.value();
                }
              });
            }});
        }
        else{
          var op2 = $("#fechainicio").data("kendoDatePicker");
          op2.enable(false);
          var op3 = $("#horainicio").data("kendoTimePicker");
          op3.enable(false);
        }
        break;
      case "24":
        if($scope.descripcion != ""){
          var op16 = $("#fechainicio").data("kendoDatePicker");
          op16.enable(true);
          $("#fechainicio").kendoDatePicker({
            format: "dd/MM/yyyy",
            min: sumarDias(new Date(), 1),// sets min date today
            culture: "es-MX",
            disableDates: ["su", "sa"],
            change: function() {
              $scope.fechainicio = this.value();
              var op8 = $("#fechafin").data("kendoDatePicker");
              op8.enable(true);
              $("#fechafin").kendoDatePicker({
                format: "dd/MM/yyyy",
                min: $scope.fechainicio, // sets min date today
                culture: "es-MX",
                disableDates: ["su", "sa"],
                change: function() {
                  $scope.fechafin = this.value();
                  var op9 = $("#horainicio").data("kendoTimePicker");
                  op9.enable(true);
                }});
              }
          });
          $("#horainicio").kendoTimePicker({
            format: "h:mm tt",
            parseFormats: ["HH:mm"],
            min: new Date(0, 0, 0, 7, 0, 0),
            max: new Date(0, 0, 0, 18, 0, 0),
            culture: "es-MX",
            change: function() {
              $scope.horainicio = this.value();
              var op26 = $("#horafin").data("kendoTimePicker");
              op26.enable(true);
              $("#horafin").kendoTimePicker({
                format: "h:mm tt",
                parseFormats: ["HH:mm"],
                min: new Date(0, 0, 0, 7, 0, 0),
                max: new Date(0, 0, 0, 18, 0, 0),
                culture: "es-MX",
                change: function() {
                  $scope.horafin = this.value();
                }
              });
            }
          });
        }
        else{
          var op6 = $("#fechainicio").data("kendoDatePicker");
          op6.enable(false);
          var op7 = $("#horainicio").data("kendoTimePicker");
          op7.enable(false);
          var op6 = $("#fechafin").data("kendoDatePicker");
          op6.enable(false);
          var op7 = $("#horafin").data("kendoTimePicker");
          op7.enable(false);
        }
        break;
      case "26":
        if($scope.descripcion != ""){
          var op17 = $("#fechainicio").data("kendoDatePicker");
          op17.enable(true);
          $("#fechainicio").kendoDatePicker({
            format: "dd/MM/yyyy",
            min: new Date($scope.tiempoE),// sets min date today
            culture: "es-MX",
            disableDates: ["su", "sa"],
            change: function() {
              $scope.fechainicio = this.value();
              var op8 = $("#fechafin").data("kendoDatePicker");
              op8.enable(true);
              $("#fechafin").kendoDatePicker({
                format: "dd/MM/yyyy",
                min: $scope.fechainicio, // sets min date today
                culture: "es-MX",
                disableDates: ["su", "sa"],
                change: function() {
                  $scope.fechafin = this.value();
                  var op10 = $("#horainicio").data("kendoTimePicker");
                  op10.enable(true);
                }});
              }
          });
          $("#horainicio").kendoTimePicker({
            format: "h:mm tt",
            parseFormats: ["HH:mm"],
            min: new Date(0, 0, 0, 7, 0, 0),
            max: new Date(0, 0, 0, 18, 0, 0),
            culture: "es-MX",
            change: function() {
              $scope.horainicio = this.value();
              var op27 = $("#horafin").data("kendoTimePicker");
              op27.enable(true);
              $("#horafin").kendoTimePicker({
                format: "h:mm tt",
                parseFormats: ["HH:mm"],
                min: new Date(0, 0, 0, 7, 0, 0),
                max: new Date(0, 0, 0, 18, 0, 0),
                culture: "es-MX",
                change: function() {
                  $scope.horafin = this.value();
                }
              });
            }
          });
        }
        else{
          var op11 = $("#fechainicio").data("kendoDatePicker");
          op11.enable(false);
          var op12 = $("#horainicio").data("kendoTimePicker");
          op12.enable(false);
          var op13 = $("#fechafin").data("kendoDatePicker");
          op13.enable(false);
          var op14 = $("#horafin").data("kendoTimePicker");
          op14.enable(false);
        }
        break;
      default:
    }
  }

  $scope.valadjunto = function(){
      if($scope.nombreadjunto != ""){

      }
      else{

      }
  }
  $scope.asignarjefe =  function(){
      ngDialog.open({
         template: 'views/ausentismo/modaljefes.html',
         //className: 'ngdialog-theme-plain',
         controller: 'modaljefescontroller',
         scope: $scope
    })
    $rootScope.$on('ngDialog.closed', function (e, $dialog) {
        $scope.guardarpermiso();
    });
  }

  $scope.permisoA = function(){
    var op = $("#fechainicio").data("kendoDatePicker");
    op.enable(true);
    $("#fechainicio").kendoDatePicker({
      format: "dd/MM/yyyy",
      min: sumarDias($scope.tiempoA, 1),// sets min date today
      culture: "es-MX",
      disableDates: ["su", "sa"],
      change: function() {
        $scope.fechainicio = this.value();
        var op1 = $("#horainicio").data("kendoTimePicker");
        op1.enable(true);
        $("#horainicio").kendoTimePicker({
          format: "h:mm tt",
          parseFormats: ["HH:mm"],
          min: new Date(0, 0, 0, 7, 0, 0),
          max: new Date(0, 0, 0, 18, 0, 0),
          culture: "es-MX",
          change: function() {
            $scope.horainicio = this.value();
          }
        });
      }
    });
  }
  $scope.permisoB = function(){
    $scope.motivopermiso = false;
    $scope.descripcionhabilitado();
  }
  $scope.permisoC = function(){
      var op4 = $("#fechainicio").data("kendoDatePicker");
      op4.enable(true);
      $("#fechainicio").kendoDatePicker({
        format: "dd/MM/yyyy",
        min: sumarDias($scope.tiempoC, 1),// sets min date today
        culture: "es-MX",
        disableDates: ["su", "sa"],
        change: function() {
          $scope.fechainicio = this.value();
          var op5 = $("#horainicio").data("kendoTimePicker");
          op5.enable(true);
          $("#horainicio").kendoTimePicker({
            format: "h:mm tt",
            parseFormats: ["HH:mm"],
            min: new Date(0, 0, 0, 7, 0, 0),
            max: new Date(0, 0, 0, 18, 0, 0),
            culture: "es-MX",
            change: function() {
              $scope.horainicio = this.value();
              $scope.inactive2 = false;
            }
          });
        }
      });
  }
  $scope.permisoD = function(){
    $scope.motivopermiso = false;
    $scope.descripcionhabilitado();
  }
  $scope.permisoE = function(){
    $scope.motivopermiso = false;
    $scope.descripcionhabilitado();
  }

  $scope.validarCampos = function(){
    var salida = 0;
    var salidafinal;
    if($scope.filtro.Permisos != "0"){
        if($scope.filtro.Permisos=="21" || $scope.filtro.Permisos=="22" || $scope.filtro.Permisos=="23"){
            if($scope.nombreadjunto != ""){}else{notification.getNotification('error', 'Falta documento adjunto', 'Notificacion');salida=1;}
        }
        if($scope.filtro.Permisos=="20" || $scope.filtro.Permisos=="24" || $scope.filtro.Permisos=="26"){
            if($scope.descripcion != ""){}else{notification.getNotification('error', 'Falta motivo del permiso', 'Notificacion');salida=1;}
        }
        if($scope.filtro.Permisos=="24" || $scope.filtro.Permisos=="26"){
          if($scope.fechafin == null){notification.getNotification('error', 'Falta fecha de terminacion', 'Notificacion');salida=1;}
          else{if($scope.fechafin != ""){}else{notification.getNotification('error', 'Falta fecha de terminacion', 'Notificacion');salida=1;}}
          if($scope.horafin == null){notification.getNotification('error', 'Falta hora de terminacion', 'Notificacion');salida=1;}
          else{if($scope.horafin != ""){}else{notification.getNotification('error', 'Falta hora de terminacion', 'Notificacion');salida=1;}}
        }
        if($scope.fechainicio == null){notification.getNotification('error', 'Falta fecha de comienzo', 'Notificacion');salida=1;}
        else{if($scope.fechainicio != ""){}else{notification.getNotification('error', 'Falta fecha de comienzo', 'Notificacion');salida=1;}}
        if($scope.horainicio == null){notification.getNotification('error', 'Falta hora de comienzo', 'Notificacion');salida=1;}
        else{if($scope.horainicio != ""){}else{notification.getNotification('error', 'Falta hora de comienzo', 'Notificacion');salida=1;}}
    }else{
      notification.getNotification('error', 'Falta tipo de permiso', 'Notificacion');salida=1;
    }
    if(salida==1){salidafinal=false;}else{salidafinal=true;}
    return salidafinal;
  }
  $scope.motivo = function(){
      $scope.tiempoA = new Date();
      $scope.tiempoB = new Date();
      $scope.tiempoC = new Date();
      $scope.tiempoD = new Date();
      $scope.tiempoE = new Date();
      mensajes = notificarHoras($scope.filtro.Permisos)
      if(mensajes!="0"){
        notification.getNotification('info', mensajes, 'Notificacion');
      }
      switch ($scope.filtro.Permisos) {
        case "18":
            $scope.permisoA();
        break;
        case "19":
            $scope.permisoA();
        break;
        case "20":
            $scope.permisoB();
        break;
        case "21":
            $scope.permisoC();
        break;
        case "22":
            $scope.permisoC();
        break;
        case "23":
            $scope.permisoC();
        break;
        case "24":
            $scope.permisoD();
        break;
        case "25":
            $scope.permisoA();
        break;
        case "26":
            $scope.permisoE();
        break;
        default:
      }

  }
  $scope.i=0;
  //function que sube el adjunto al ftp
  $scope.subirAdjunto = function(){
    loadingButton('subir');
    if ($scope.nombreadjunto != "") {
      var formData = new FormData($("#formulario")[0]);
      ausentismoHttp.uploadFile(formData).then(function (res) {
        if (res.trim() == "1") {
		setTimeout(function () {
			 ausentismoHttp.uploadName($scope.oldname, $scope.Filename + $scope.ext).then(function (res){
            if(res.trim()=="1"){
              $scope.i=0;
              //notification.getNotification('success', 'El adjunto ha sido cargada exitosamente', 'Notificacion');
			  $scope.ressoporte = true;
            }else{
               notification.getNotification('error', res, 'Notificacion')
			         $scope.ressoporte = false;
               $scope.i+=1;
            }
          })
          document.getElementById("formulario").reset() ;
		}, 100);

        }else {
          //notification.getNotification('error', "Error al subir archivo", 'Notificacion')
		  $scope.ressoporte = false;
        }
      });
    }else {
      notification.getNotification('error', "Por favor adjuntar archivos", 'Notificacion')
    }
  }
  //funccion que guarda la solicitud y llama a la funccion subirAdjunto
  $scope.ProcesarPermiso = function () {
    $scope.camposcorrectos = $scope.validarCampos();
    if($scope.camposcorrectos == true){
      var today = new Date();
      var dd = ('0' + today.getDate()).slice(-2);
      var mm = ('0' + (today.getMonth() + 1)).slice(-2);
      var yyyy = today.getFullYear();
	    var hora = today.getHours();
	    var min = today.getMinutes();
	    var seg = today.getSeconds();
      $scope.oldname = $("#nombreadjunto")[0].value;
      $scope.ext = '.'+$scope.oldname.split('.').pop(); 
      $scope.Filename = $scope.filtro.Permisos + "_" + "CC" + "_" + $scope.cedula + "_" + dd + mm + yyyy;
      //$scope.ruta = $UPLOAD_FILE_A + dd + mm + yyyy + '/';
      $scope.Nombrearchivo = $scope.Filename + $scope.ext;
      var fechasbien=false;
      loadingButton("guarda");
      parsearfechainicio();
      parsearhorainicio();
      $scope.f1 = $scope.diainicio+"/"+ $scope.mesinicio+"/"+$scope.anoinicio;
      $scope.h1 = $scope.diainicio+"/"+ $scope.mesinicio+"/"+$scope.anoinicio +" "+$scope.horasinicio+":"+$scope.minutoinicio+":"+$scope.segundoinicio;
      $scope.NombrePermiso = tipodepermiso($scope.filtro.Permisos);
      if($scope.filtro.Permisos == "26" || $scope.filtro.Permisos == "24"){
        parserfechafin();
        parsearhorafin();
        $scope.f2 = $scope.diafin+"/"+ $scope.mesfin+"/"+$scope.anofin;
        $scope.h2 = $scope.diafin+"/"+ $scope.mesfin+"/"+$scope.anofin +" "+$scope.horasfin+":"+$scope.minutofin+":"+$scope.segundofin;
        $scope.descripcion1 = $scope.NombrePermiso+" - "+$scope.descripcion;
        if($scope.f1.length <= 10 && $scope.h1.length <= 18 && $scope.f2.length <= 10 && $scope.h2.length <= 18){fechasbien = true;}
        else{fechasbien = false;}
      }else{
        $scope.descripcion1 = $scope.NombrePermiso;
        if($scope.f1.length <= 10 && $scope.h1.length <= 18){fechasbien = true;}
        else{fechasbien = false;}
        $scope.diafin    = 1;
        $scope.mesfin    = 1;
        $scope.anofin    = 1900;
        $scope.horasfin   = 0;
        $scope.minutofin = 0;
        $scope.segundofin= 0;
        $scope.f2 = $scope.diafin+"/"+ $scope.mesfin+"/"+$scope.anofin;
        $scope.h2 = $scope.diafin+"/"+ $scope.mesfin+"/"+$scope.anofin +" "+$scope.horasfin+":"+$scope.minutofin+":"+$scope.segundofin;
      }
      if(fechasbien==true){
		   $scope.Filename = $scope.filtro.Permisos + "_" + "CC" + "_" + $scope.cedula + "_" + dd + mm + yyyy + hora + min + seg;
           $scope.ruta = $UPLOAD_FILE_A + dd + mm + yyyy +'/' + $scope.Filename + $scope.ext;
		  if($scope.filtro.Permisos == "21" || $scope.filtro.Permisos == "22" || $scope.filtro.Permisos == "23"){
              $scope.subirAdjunto();
              if($scope.i == 1){
                $scope.subirAdjunto();
              }
          }else{
			  $scope.ressoporte = true;
		  }
		  setTimeout(function () {
		  if($scope.ressoporte==true){
        ausentismoHttp.insertarpermiso($scope.ubicacion,$scope.descripcion1,$scope.filtro.Permisos,$scope.cedula,$scope.h1,$scope.h2,$scope.Nombrearchivo,$scope.ruta).then(function (response) {
			  var valres = response[0].Respuesta;//.replace(mes,m);
        var valrestotal = valres.split('-');
        if(valrestotal[0] == '1'){
          var partsq = response[0].FechaFin;//.replace(mes,m);
          var parts = partsq.split('/');
          var parts2 = response[0].HoraFin.split(':');
          notification.getNotification('success', response[0].Respuesta, 'Notificacion');
          $(function () {
          $("#estado").val("EN REVISION");
          });
          document.getElementById("estado").selectedIndex = 1;
          $scope.radicado = response[0].Radicado;
          //$scope.ubicacionRes = response[0].Ubicacion;
          $scope.descripcion = $scope.descripcion1;
          if($scope.filtro.Permisos != "26"){
            $("#fechafin").kendoDatePicker({
              format: "dd/MM/yyyy",
              value: new Date(parts[2], parts[1]-1, parts[0])
            });
            $("#horafin").kendoTimePicker({
              format: "h:mm tt",
              parseFormats: ["HH:mm"],
              value: new Date(2000, 0, 1, parts2[0], parts2[1], parts2[2])
            });
          }
          var op = $("#fechafin").data("kendoDatePicker");
          op.enable(false);
          var op = $("#fechainicio").data("kendoDatePicker");
          op.enable(false);
          var op1 = $("#horafin").data("kendoTimePicker");
          op1.enable(false);
          var op1 = $("#horainicio").data("kendoTimePicker");
          op1.enable(false);
          $scope.motivopermiso = true;
          $scope.inactive2 = true;
          $scope.desactivar=true;
        }
        else if(valrestotal[0] == '2'){
          $scope.asignarjefe();
        }
        }, function (err) {
          notification.getNotification('error', err, 'Notificacion');
        });
	   }else{
			notification.getNotification('error', "El adjunto y la solicitud no fueron cargadas correctamente, Por favor intentelo de nuevo.", 'Notificacion');
	   }
	  }, 500);
      }else{
        notification.getNotification('error', "campos fechas u horas errados", 'Notificacion');
      }
    }
    else{
        //notification.getNotification('error', 'Por favor complete los campos en rojo', 'Notificacion');
    }
  }

  $scope.guardarpermiso =  function(){
    ausentismoHttp.insertarpermiso($scope.ubicacion,$scope.descripcion1,$scope.filtro.Permisos,$scope.cedula,$scope.h1,$scope.h2,$scope.Nombrearchivo,$scope.ruta).then(function (response) {
    var valres = response[0].Respuesta;//.replace(mes,m);
    var valrestotal = valres.split('-');
    if(valrestotal[0] == '1'){
      var partsq = response[0].FechaFin;//.replace(mes,m);
      var parts = partsq.split('/');
      var parts2 = response[0].HoraFin.split(':');
      notification.getNotification('success', response[0].Respuesta, 'Notificacion');
      $(function () {
      $("#estado").val("EN REVISION");
      });
      document.getElementById("estado").selectedIndex = 1;
      $scope.radicado = response[0].Radicado;
      //$scope.ubicacionRes = response[0].Ubicacion;
      $scope.descripcion = $scope.descripcion1;
      if($scope.filtro.Permisos != "26"){
        $("#fechafin").kendoDatePicker({
          format: "dd/MM/yyyy",
          value: new Date(parts[2], parts[1]-1, parts[0])
        });
        $("#horafin").kendoTimePicker({
          format: "h:mm tt",
          parseFormats: ["HH:mm"],
          value: new Date(2000, 0, 1, parts2[0], parts2[1], parts2[2])
        });
      }
      var op = $("#fechafin").data("kendoDatePicker");
      op.enable(false);
      var op = $("#fechainicio").data("kendoDatePicker");
      op.enable(false);
      var op1 = $("#horafin").data("kendoTimePicker");
      op1.enable(false);
      var op1 = $("#horainicio").data("kendoTimePicker");
      op1.enable(false);
      $scope.motivopermiso = true;
      $scope.inactive2 = true;
      $scope.desactivar=true;
    }
    else if(valrestotal[0] == '2'){
      //$scope.asignarjefe();
    }
    }, function (err) {
      notification.getNotification('error', err, 'Notificacion');
    });
  }
  //funccion limpiar
  $scope.clear = function () {
    $scope.fechaf = "";
    $scope.descripcion="";
    $scope.filtro = {Permisos:" "};
    $scope.radicado = "";
	$scope.radicadot = "";
    $scope.fechainicio ="";
    $scope.fechafin ="";
    $scope.horainicio ="";
    $scope.horafin ="";
    $scope.nombreadjunto ="";

    $scope.motivopermiso = true;
    $scope.inactive2 = true;
    $scope.fechaf = "";
    $scope.desactivar=false;
    document.getElementById("formulario").reset();

    $scope.desactivar=false;
    $scope.tiempoA = "";
    $scope.tiempoB = "";
    $scope.tiempoC = "";
    $scope.tiempoD = "";
    $scope.tiempoE = "";
    $scope.valadjunto();
    // $(function () {
    //   $("#tipopermiso").val("0");
    // });
    // document.getElementById("tipopermiso").selectedIndex = 0;
    $("#fechainicio").kendoDatePicker({
      value: ' '
    });
    $("#fechafin").kendoDatePicker({
      value: ' '
    });
    $("#horainicio").kendoTimePicker({
      value: ' '
    });
    $("#horafin").kendoTimePicker({
      value: ' '
    });
    var op22 = $("#fechafin").data("kendoDatePicker");
    op22.enable(false);
    var op23 = $("#fechainicio").data("kendoDatePicker");
    op23.enable(false);
    var op24 = $("#horafin").data("kendoTimePicker");
    op24.enable(false);
    var op25 = $("#horainicio").data("kendoTimePicker");
    op25.enable(false);
    $scope.obtenerPermiso();
  }
  //Abrir Modales
  $scope.MostrarPermisos = function () {
    ngDialog.open({
      template: 'views/ausentismo/verSolicitudes.html',
      className: 'ngdialog-theme-plain',
      controller: 'verSolicitudescontroller',
      controllerAs: 'spctrl',
      scope: $scope
    });
  }


// fin
}]);
