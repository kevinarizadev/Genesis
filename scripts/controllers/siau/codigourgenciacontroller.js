'use strict';
angular.module('GenesisApp')
 .controller('codigourgenciacontroller',['$scope','notification','cfpLoadingBar','$http',function($scope,notification,cfpLoadingBar,$http) {
  (function() {
       $scope.inactive3 = false;
       var dat = {prov : 'navb'}
       $.getJSON( "php/obtenersession.php", dat)
       .done(function(respuesta) {
         $scope.sesdata = respuesta;
         $scope.cedula = $scope.sesdata.cedula;
         $scope.rol = $scope.sesdata.rolcod;
         if($scope.sesdata.nit != undefined){
           $scope.nitips = $scope.sesdata.nit;
           $scope.nomips = $scope.sesdata.nomips;
           $scope.inactive3 = true;
         }else{
           $scope.nitips = '';
           $scope.inactive3 = false;
         }
       })
       .fail(function( jqXHR, textStatus, errorThrown ) {
         console.log("navbar error obteniendo variables");
       });
      var fecha = new Date();
      fecha.setDate(fecha.getDate() - 1);
      $('#date-fr').bootstrapMaterialDatePicker({ format : 'DD/MM/YYYY HH:mm', lang : 'fr', weekStart : 1, nowText:'Now', minDate : fecha, maxDate : new Date()});
    }());

  $('#modal1').modal({dismissible: true});
  $scope.inactive2 = false;
  $scope.invisible = true;
  $scope.check1 = false;
  $scope.coincidencia1 = "";
  $scope.coincidencia2 = "";
  $scope.veradj=false;
  $scope.menor=false;
  //variables
    $scope.tipoDoc = "0";
    $scope.documento = "";
    $scope.diagnostico1 = "0";
    $scope.diagnostico2 = "0";
    $scope.fechaingreso = "";
    $scope.observacion = "";
    $scope.solicitante = "";
    $scope.aprobacion = "";
    $scope.observacionnegacion = "";
    $scope.nomips = "";
    $scope.nitips = "";
  //funciones de complemento
  function isValidDate(day,month,year){
      var dteDate;
      month=month-1;
      dteDate=new Date(year,month,day);

      //Devuelva true o false...
      return ((day==dteDate.getDate()) && (month==dteDate.getMonth()) && (year==dteDate.getFullYear()));
  }
  function validate_fecha(fecha){
      var patron=new RegExp("^(19|20)+([0-9]{2})([-])([0-9]{1,2})([-])([0-9]{1,2})$");

      if(fecha.search(patron)==0)
      {
          var values=fecha.split("-");
          if(isValidDate(values[2],values[1],values[0]))
          {
              return true;
          }
      }
      return false;
  }
  $scope.calcularEdad = function(date){
      //var fecha=document.getElementById("user_date").value;
      var fecha = date.split("/").reverse().join("-");
      if(validate_fecha(fecha)==true)
      {
          // Si la fecha es correcta, calculamos la edad
          var values=fecha.split("-");
          var dia = values[2];
          var mes = values[1];
          var ano = values[0];

          // cogemos los valores actuales
          var fecha_hoy = new Date();
          var ahora_ano = fecha_hoy.getYear();
          var ahora_mes = fecha_hoy.getMonth()+1;
          var ahora_dia = fecha_hoy.getDate();

          // realizamos el calculo
          var edad = (ahora_ano + 1900) - ano;
          if ( ahora_mes < mes )
          {
              edad--;
          }
          if ((mes == ahora_mes) && (ahora_dia < dia))
          {
              edad--;
          }
          if (edad > 1900)
          {
              edad -= 1900;
          }

          // calculamos los meses
          var meses=0;
          if(ahora_mes>mes)
              meses=ahora_mes-mes;
          if(ahora_mes<mes)
              meses=12-(mes-ahora_mes);
          if(ahora_mes==mes && dia>ahora_dia)
              meses=11;

          // calculamos los dias
          var dias=0;
          if(ahora_dia>dia)
              dias=ahora_dia-dia;
          if(ahora_dia<dia){
              var ultimoDiaMes=new Date(ahora_ano, ahora_mes, 0);
              dias=ultimoDiaMes.getDate()-(dia-ahora_dia);
          }
          if(edad>0){
            $scope.cantidadanos = 'años'
            if(edad == 1){
              $scope.cantidadanos = 'años'
            }
            $scope.edad = edad;
          }else{
            if(meses>0){
              $scope.cantidadanos = 'meses'
              if(meses == 1){
                $scope.cantidadanos = 'mes'
              }
              $scope.edad = meses;
            }else{
              if(dias>0){
                $scope.cantidadanos = 'dias'
                if(dias == 1){
                  $scope.cantidadanos = 'dia'
                }
                $scope.edad = dias;
              }
            }
          }
      }
  }
  $scope.limpiar = function(tipo){
    $scope.checked1 = true;
    $scope.checked2 = true;
    $scope.inactive2 = false;
    $scope.invisible = true;
    $scope.veradj=false
    $scope.check1 = false;
    $scope.menor=false;
    //$scope.tipoDoc = "0";
    //$scope.documento = "";
    $scope.diagnostico1 = "0";
    $scope.diagnostico2 = "0";
    $scope.diagnosticos2 = [];
    $scope.diagnosticos1 = [];
    $scope.coincidencia1 = "";
    $scope.coincidencia2 = "";
    $scope.filtroDiag2 = "";
    $scope.filtroDiag1 = "";
    $scope.solicitante = "";
    $scope.aprobacion = "";
    $scope.observacionnegacion = "";

    $scope.fechaingreso = "";
    $scope.observacion = "";
  if(tipo == '1'){
      $scope.nitips = "";
      $scope.nomips = "";
    }
  }
  $scope.validarcampos = function(){
    $scope.validacionfield = true;
    if($scope.diagnostico1 == "0" || $scope.diagnostico1 == undefined || $scope.diagnostico1 == null){$scope.validacionfield = false}
    if($scope.fechaingreso == "" || $scope.fechaingreso == undefined || $scope.fechaingreso == null){$scope.validacionfield = false}
    if($scope.observacion == "" || $scope.observacion == undefined || $scope.observacion == null){$scope.validacionfield = false}
    if($scope.diagnostico2 == "0" || $scope.diagnostico2 == undefined || $scope.diagnostico2 == null){$scope.diagnostico2 = "0"}
    if($scope.nitips == "" || $scope.nitips == undefined || $scope.nitips == null){$scope.validacionfield = false}
    if($scope.solicitante == "" || $scope.solicitante == undefined || $scope.solicitante == null){$scope.validacionfield = false}
    if($scope.aprobacion == "" || $scope.aprobacion == undefined || $scope.aprobacion == null){$scope.validacionfield = false}
  }
  $scope.validaradjunto = function(){
    if ( $scope.archivobase == '' || $scope.archivobase == null || $scope.archivobase == undefined ) {
      $scope.adjanexo2 = false;
    }else{
      $scope.adjanexo2 = true;
    }
  }
  $scope.validarips = function() {
    $http({
      method:'POST',
      url:"php/siau/CodigoUrgencia/Ccodigourgencia.php",
      data: {function:'validarips',ips:$scope.nitips}
    }).then(function(response){
      if(response.data.existe != "0"){
        $scope.nomips = response.data.Nombre;
      }else{
        $scope.nomips = response.data.Nombre;
        $scope.nitips = '';
      }
    })
  }
  // functiones de procesos
  $scope.buscarAfiliado = function(){
    $scope.limpiar('2');
    $scope.Data = [];
    if($scope.tipoDoc != "0" && $scope.documento != "" && $scope.tipoDoc != null && $scope.documento != undefined && $scope.tipoDoc != undefined && $scope.documento != null){
        $http({
          method:'POST',
          url:"php/siau/CodigoUrgencia/Rcodigourgencia.php",
          data: {function:'obtenerafiliados',tipodocumento:$scope.tipoDoc,documento:$scope.documento}
        }).then(function(response){
          if(response.data != "0"){
            $scope.Data = response.data;
            $scope.sexocod = $scope.Data.SexoCodigo;
            $scope.edaddias = $scope.Data.edaddias;
            $scope.ubicacion = $scope.Data.CodigoMunicipio;
            if(($scope.Data.Estado != 'ACTIVO') && ($scope.rol == '120')){
              $scope.informacionmodal = 'Por favor comuniquese con nuestro call center (5)3185930 - 3680032 o a nuestra linea nacional gratuita 018000111446';
              $scope.cod = "";
              $('#modal1').modal('open');
              notification.getNotification('info', 'Codigo de urgencia!', 'Notificacion');
            }else{
              $scope.calcularEdad($scope.Data.FechaNacimiento);
              $scope.inactive2 = true;
            }
          }else{
            notification.getNotification('info', 'Afiliado No Encontrado!', 'Notificacion');
          }
         });
    }
    else{
        notification.getNotification('warning', 'Datos del afiliado incompletos', 'Notificacion');
    }
  }
  $scope.cargarDiagnosticos = function(type){
    if(($scope.coincidencia1 != "" && $scope.coincidencia1.length > 2) || ($scope.coincidencia2 != "" && $scope.coincidencia2.length > 2)){
      if(type==1){$scope.coincidencia = $scope.coincidencia1;}else{$scope.coincidencia = $scope.coincidencia2;}
      if($scope.menor == true){$scope.hijo = 1}else{$scope.hijo = 0};
      $http({
         method:'POST',
         url:"php/siau/CodigoUrgencia/Rcodigourgencia.php",
         data: {function:'obtenerdiagnostico',coincidencia:$scope.coincidencia,sexo:$scope.sexocod, edad:$scope.edaddias,hijo:$scope.hijo}
      }).then(function(response){
        if(response.data == "0"){
          notification.getNotification('info', 'No se encontraron diagnosticos para la coincidencia ingresada', 'Notificacion');
        }else{
          if(type==1){
            $scope.diagnosticos1 = response.data;
            $scope.checked1 = false;
          }else{
            $scope.diagnosticos2 = response.data;
            $scope.checked2 = false;
          }
        }
      })
    }
    else{
      notification.getNotification('warning', 'Debe ingresar mas de 2 caracteres', 'Notificacion');
    }
  }
  $scope.obtenerBase = function () {
    if ($("#adjunto")[0].files[0].size > 7340032) {
      //swal('Advertencia','El archivo excede el peso limite (7 MB)','warning')
      notification.getNotification('warning', 'El archivo excede el peso limite (7 MB)', 'Notificación');
      $("#adjunto")[0].value = "";
      $scope.archivobase = "";
      $scope.extensionarchivo = "";
    } else {
      if ($("#adjunto")[0].files && $("#adjunto")[0].files[0]) {
        var FR = new FileReader();
        FR.addEventListener("load", function (e) {
          $scope.archivobase = e.target.result;
          var name = $("#adjunto")[0].files[0].name;
          $scope.extensionarchivo = name.split('.').pop();
        });
        FR.readAsDataURL($("#adjunto")[0].files[0]);
      }
    }
  }
  $scope.insertarUrgencia =  function(ruta){
      if($scope.menor == true){$scope.hijo = 1}else{$scope.hijo = 0};
      $http({
        method:'POST',
        url:"php/siau/CodigoUrgencia/Ccodigourgencia.php",
        data: {function:'insertarurgencia',coddiag1:$scope.diagnostico1,coddiag2:$scope.diagnostico2,
               ubicacion:$scope.ubicacion,docsolicitante:$scope.cedula,nitips:$scope.nitips,
               tipodocpaciente:$scope.tipoDoc,documentopaciente:$scope.documento,observacion:$scope.observacion.toUpperCase(),
               fechaingreso:$scope.fechaingreso,rol:$scope.rol,hijo:$scope.hijo, ruta:ruta,aprobacion:$scope.aprobacion,observacionnegacion:$scope.observacionnegacion}
      }).then(function(response){
        if(response.data != "0"){
          $scope.info = response.data
          $scope.cod = $scope.info.Codigo;
          $scope.informacionmodal = $scope.info.Info;
          if($scope.info.Tipo == '1'){
            notification.getNotification('success', 'Codigo de urgencia!', 'Notificacion');
            $scope.invisible = false;
            $scope.inactive2 = false;
          }else{
            $scope.invisible = true;
            notification.getNotification('info', 'Codigo de urgencia!', 'Notificacion');
          }
          $scope.limpiar('1');
          $('#modal1').modal('open');
        }
      })
  }
  $scope.solicitarcodigo = function(){
    $scope.validarcampos();
    if($scope.validacionfield == true){
      $scope.check1 = true;
      $scope.validaradjunto();
      if($scope.adjanexo2 == true){
        var anexo = new FormData($("#anexo2")[0]);
        var filename = $('input[type=file]').val();
        var today = new Date();
        var dd = ('0' + today.getDate()).slice(-2);
        var mm = ('0' + (today.getMonth() + 1)).slice(-2);
        var yyyy = today.getFullYear();
        var hora = today.getHours();
        var min = today.getMinutes();
        var seg = today.getSeconds();
        $scope.ext = filename.split('.').pop();
        $scope.tipodocumentoa = $scope.tipoDoc;
        $scope.documentoa = $scope.documento;
        $scope.ftp = $PATH_FILE;
        $scope.folder = "SIAU/CODIGOURGENCIA/";
        $scope.nuevonombre = '130_' + $scope.tipodocumentoa + "_" + $scope.documentoa + "_" + dd + mm + yyyy + "__" + hora + min + seg;
        $scope.doct = 130;
        $scope.obs = 'anexo 2 codigo urgencia'

        $http({
          method: 'POST',
          url: "php/siau/CodigoUrgencia/Ccodigourgenciaips.php",
          data: {
            function: 'adjunto',
            nombre: $scope.nuevonombre,
            achivobase: $scope.archivobase,
            ext: $scope.ext
          }
        }).then(function (response) {
          if (response.data) {
            $scope.insertarUrgencia(response.data);
          }
          else {
            notification.getNotification('warning', 'Error al subir la historia clinica, Por favor intentelo nuevamente!', 'Notificacion');
          }
        })
      }
      else{
        var ruta='';
        $scope.insertarUrgencia(ruta);
      }
    }
    else{
      notification.getNotification('warning', 'Faltan campos por completar', 'Notificacion');
    }

  }
}]);
