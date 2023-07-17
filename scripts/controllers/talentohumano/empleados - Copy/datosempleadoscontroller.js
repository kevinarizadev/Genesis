'use strict';
angular.module('GenesisApp')
.controller('datosempleadoscontroller', ['$scope', '$http', 'altocostoHttp','ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller','$rootScope','$window',
function ($scope, $http, altocostoHttp, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window) {
    (function() {
         $scope.proteccion2 = true;
         $scope.proteccion = true;
         var dat = {prov : 'navb'}
         $.getJSON( "php/obtenersession.php", dat)
         .done(function(respuesta) {
           $scope.sesdata = respuesta;
           $scope.documento = $scope.sesdata.cedula;
           $scope.rol = $scope.sesdata.rolcod;
           $http({
              method:'POST',
              url:"php/talentohumano/datosbasicos/Rdatosbasicos.php",
              data: {function:'obtenerproteccion',tipo:'consulta',id:$scope.documento}
           }).then(function(response){
              if(response.data == "1"){
                $scope.proteccion2 = true;
                $scope.proteccion = false;
              }else{
                $scope.proteccion2 = false;
                $scope.proteccion = true;
              }
           })
           setTimeout(function () {
             $http({
                method:'POST',
                url:"php/talentohumano/datosbasicos/Rdatosbasicos.php",
                data: {function:'obtnerinformacion',id:$scope.documento,tipo:$scope.tipoDoc}
             }).then(function(response){
                     $scope.limpiartodo();
                 if(response.data.estado == '1'){
                   $scope.inactivebtninfo = false;
                    $scope.newData = response.data;
                    $scope.departamento = $scope.newData.dpto;

                    $scope.pnombre = $scope.newData.pnombre;
                    $scope.snombre = $scope.newData.snombre;
                    $scope.papellido = $scope.newData.papellido;
                    $scope.sapellido = $scope.newData.sapellido;
                    $scope.nacimiento = $scope.newData.nacimiento;
                    $scope.sexo = $scope.newData.sexo;
                    $scope.estadocivil = $scope.newData.estado_civil;
                    $scope.rethus = $scope.newData.rethus;
                    $scope.gruposanguineo = $scope.newData.rh;
                    if($scope.newData.peso == null || $scope.newData.peso == 0){$scope.peso = ""}else{$scope.peso = Number($scope.newData.peso);}
                    if($scope.newData.estatura == null || $scope.newData.estatura == 0){$scope.estatura = "";}else{$scope.estatura = Number($scope.newData.estatura);}
                    if($scope.newData.telefono == null || $scope.newData.telefono == 0){$scope.telefono = "";}else{$scope.telefono = Number($scope.newData.telefono);}
                    if($scope.newData.celular == null || $scope.newData.celular == 0){$scope.celular = "";}else{$scope.celular = Number($scope.newData.celular);}
                    $scope.correo = $scope.newData.email_personal;
                    $scope.direccion = $scope.newData.direccion;
                    $scope.barrio = $scope.newData.barrio;

                    $scope.inactiveinfo = false;
                    $scope.obtenertablas();
                 }
                 $scope.cargarselects('departamentoper',$scope.departamento);
             })
           }, 500);
         })
         .fail(function( jqXHR, textStatus, errorThrown ) {
           console.log("navbar error obteniendo variables");
         });

         $('#date1').bootstrapMaterialDatePicker({ format : 'DD/MM/YYYY', lang : 'fr', weekStart : 1, time: false, nowText:'Now', maxDate : new Date()});
         $('#date2').bootstrapMaterialDatePicker({ format : 'DD/MM/YYYY', lang : 'fr', weekStart : 1, time: false, nowText:'Now'});
         $('#date3').bootstrapMaterialDatePicker({ format : 'DD/MM/YYYY', lang : 'fr', weekStart : 1, time: false, nowText:'Now'});
         $('#date4').bootstrapMaterialDatePicker({ format : 'DD/MM/YYYY', lang : 'fr', weekStart : 1, time: false, nowText:'Now'});
         $('#date5').bootstrapMaterialDatePicker({ format : 'DD/MM/YYYY', lang : 'fr', weekStart : 1, time: false, nowText:'Now'});
      }());
$scope.tipoDoc = "CC";
//$scope.documento = "";
$scope.todo = true;
$scope.todo2 = true;
$scope.addbeneficiario = false;
$scope.rethus = '3';
$scope.instituswitch1 = true;
$scope.instituswitch2 = false;
//personal
$scope.pnombre = "";
$scope.snombre = "";
$scope.papellido = "";
$scope.sapellido = "";
$scope.nacimiento = "";
$scope.sexo = "0";
$scope.estadocivil = "0";
$scope.gruposanguineo = "0";
$scope.peso = "";
$scope.estatura = "";
$scope.telefono = "";
$scope.celular = "";
$scope.correo = "";
$scope.direccion = "";
$scope.barrio = "";
$scope.departamento = "0";
$scope.municipio  = "0";

//empresarial
$scope.departamentoe = "0";
$scope.municipioe = "0";
$scope.tipocontrato = "0";
$scope.empleador = "0";
$scope.unidadestrategica = "0";
$scope.unidadfuncional = "0";
$scope.cargo = "0";
$scope.gruposalario = "";
$scope.salario = "0";
$scope.tiporemuneracion = "0";
$scope.sedecontractual = "0";
$scope.estado = "0";
$scope.numerocuenta = "";
$scope.tipocuenta = "0";
$scope.banco = "0";

//informativo
$scope.correoinstitucional = "";
$scope.dominio = "";
$scope.usuario = "";
//otros
$scope.tipoentidad = "0";
$scope.entidad = "0";
$scope.fechainicial = "";
$scope.fechafinal = "";
//educacion
$scope.institucion = "0";
$scope.titulo = "0";
$scope.programa = "0";
$scope.nivel = "0";
$scope.tipoperiodoe = "0";
$scope.periodo = "0";
$scope.ubicacione = "0";
$scope.anoterminacion = "";
//beneficiario
$scope.tipodocb = "0"
$scope.documentob = ""
$scope.nombreb = "";
$scope.parentezcob = "0";
$scope.sexob = "0";
$scope.nacimientob = "";
//medida
$scope.sueter = "0";
$scope.camisa = "0";
$scope.pantalon = "0";
$scope.zapato = "0";


$scope.inactive1 = false;
$scope.inactiveinfo = true;
$scope.disbaled1 = true;
$scope.inactivebtnbeneficiario=true;
$scope.inactivebtnestudio=true;
$scope.inactivebtnentidad=true;
$scope.inactivebtnmedida = true;
$scope.inactivebtninfo = true;

$scope.protecciondatos = function(){
    $http({
      method:'POST',
      url:"php/talentohumano/datosbasicos/Rdatosbasicos.php",
      data: {function:'obtenerproteccion',tipo:'insert',id:$scope.documento}
    }).then(function(response){
       if(response.data == "1"){
         $scope.proteccion2 = true;
         $scope.proteccion = false;
          notification.getNotification('success', 'Aprobacion confirmada!', 'Notificacion');
       }else{
         $scope.proteccion2 = false;
         $scope.proteccion = true;
         notification.getNotification('info', 'No se ha confirmado tu aprobacion!', 'Notificacion');
       }
    })
}

$scope.openmodaldireccion =  function(){
  ngDialog.open({
     template: 'views/talentohumano/empleados/modaldireccion.html',
     //className: 'ngdialog-theme-plain',
     controller: 'modaldirbencontroller',
     scope: $scope
    //  preCloseCallback: function(value) {
    //      if (confirm('Tu direccion es correcta?')) {
    //             if($("#direccionmodal").val() != ""){
    //                 $scope.direcciontemp = $("#direccionmodal").val();
    //             }
    //           return true;
    //      }
    //      return false;
    //  }
  });
  $rootScope.$on('ngDialog.closed', function (e, $dialog) {
      $("#direccion").val(communication.direccion);
  });
}
$http({
   method:'POST',
   url:"php/talentohumano/datosbasicos/Rdatosbasicos.php",
   data: {function:'obtnerubicaciones'}
}).then(function(response){
   $scope.ubi = response.data;
})
$http({
   method:'POST',
   url:"php/talentohumano/datosbasicos/Rdatosbasicos.php",
   data: {function:'obtnernodependientes'}
}).then(function(response){
   $scope.info = response.data;
})
$http({
   method:'POST',
   url:"php/talentohumano/datosbasicos/Rdatosbasicos.php",
   data: {function:'obtnerselectestudio'}
}).then(function(response){
   $scope.estudio = response.data;
})
$http({
   method:'GET',
   url:"json/tiposangre.json",
   params: {}
}).then(function(response){
   $scope.grupossanguineos = response.data;
})
$http({
   method:'GET',
   url:"json/estadocivil.json",
   params: {}
}).then(function(response){
   $scope.estadosciviles = response.data;
})
$http({
   method:'GET',
   url:"json/parentescos.json",
   params: {}
}).then(function(response){
   $scope.parentezco = response.data;
})

$rootScope.$on('ngDialog.closed', function (e, $dialog) {
    if(communication.data.adjunto == true){
        $scope.addbeneficiario = communication.data.adjunto;
        $scope.accionestablasadiciones('beneficiario','insert','999');
    }
});

$scope.eventhab = function(){
  if($scope.habi == true){
    notification.getNotification('info', 'Campos Habilitados!', 'Notificacion');
  }else{
    notification.getNotification('info', 'Campos Deshabilitados!', 'Notificacion');
  }
}
//
$scope.cargardatosbasicos =  function(){
  $http({
     method:'POST',
     url:"php/talentohumano/datosbasicos/Rdatosbasicos.php",
     data: {function:'obtnerinformacion',id:$scope.documento,tipo:$scope.tipoDoc}
  }).then(function(response){
          $scope.limpiartodo();
      if(response.data.estado == '1'){
        $scope.inactivebtninfo = false;
         $scope.newData = response.data;
         $scope.departamento = $scope.newData.dpto;

         $scope.pnombre = $scope.newData.pnombre;
         $scope.snombre = $scope.newData.snombre;
         $scope.papellido = $scope.newData.papellido;
         $scope.sapellido = $scope.newData.sapellido;
         $scope.nacimiento = $scope.newData.nacimiento;
         $scope.sexo = $scope.newData.sexo;
         $scope.estadocivil = $scope.newData.estado_civil;
         $scope.rethus = $scope.newData.rethus;
         $scope.gruposanguineo = $scope.newData.rh.trim();
         if($scope.newData.peso == null || $scope.newData.peso == 0){$scope.peso = ""}else{$scope.peso = Number($scope.newData.peso);}
         if($scope.newData.estatura == null || $scope.newData.estatura == 0){$scope.estatura = "";}else{$scope.estatura = Number($scope.newData.estatura);}
         if($scope.newData.telefono == null || $scope.newData.telefono == 0){$scope.telefono = "";}else{$scope.telefono = Number($scope.newData.telefono);}
         if($scope.newData.celular == null || $scope.newData.celular == 0){$scope.celular = "";}else{$scope.celular = Number($scope.newData.celular);}
         $scope.correo = $scope.newData.email_personal;
         $scope.direccion = $scope.newData.direccion;
         $scope.barrio = $scope.newData.barrio;

         $scope.inactiveinfo = false;
         $scope.obtenertablas();
      }
      $scope.cargarselects('departamentoper',$scope.departamento);
  })
}
//cargar selects dependientes
$scope.cargarselects = function(tipo,valor){
  if(valor == "0" || valor == undefined || valor == "" || valor == " " || valor == null){
  }else{
    $scope.entrar = true;
    if($scope.entrar == true){
      $http({
         method:'POST',
         url:"php/talentohumano/datosbasicos/Rdatosbasicos.php",
         data: {function:"obtenerselects",tipo:tipo,valor:valor}
      }).then(function(response){
          switch (tipo) {
            case 'departamentoper':
              $scope.municipiosper = response.data;
              if($scope.newData.mun != null && $scope.newData.mun != ""){
                  $scope.municipio  = $scope.newData.mun;
              }
            break;
            case 'entidades':
              $scope.entidadesinfo = response.data;
            break;
            case 'instituciones':
              $scope.Instituciones = response.data;
            break;
            default:
          }
      })
    }
  }
}
//funcionamiento de las tab
$scope.setTab = function(newTab){
  $scope.tab = newTab;
  $(".tabI").removeClass("tabactiva");
  $(".tabII").removeClass("tabactiva");
  $(".tabIII").removeClass("tabactiva");
  $(".tabIV").removeClass("tabactiva");
  $(".tabV").removeClass("tabactiva");
  $(".tabVI").removeClass("tabactiva");
  switch (newTab) {
    case 1:
    $(".tabI").addClass("tabactiva");
    $scope.Title = "Información Adicional";
    break;
    case 2:
    $(".tabII").addClass("tabactiva");
    $scope.Title = "Información Educativa";
    break;
    case 3:
    $(".tabIII").addClass("tabactiva");
    $scope.Title = "Información Beneficiarios";
    break;
    case 4:
    $(".tabIV").addClass("tabactiva");
    $scope.Title = "Información Medidas";
    break;
    default:

  }
}
$scope.isSet = function(tabNum){
  return $scope.tab === tabNum;
}
$scope.setTab(1);
//crud para los tab
$scope.accionestablasadiciones = function(tipo,tipo2,data){
  switch (tipo) {
      case 'medidas':
          $http({
             method:'POST',
             url:"php/talentohumano/datosbasicos/Cdatosbasicos.php",
             data: {function:"logicamedidas",sueter:$scope.sueter,camisa:$scope.camisa,pantalon:$scope.pantalon,zapato:$scope.zapato,id:$scope.documento}
          }).then(function(response){
              var data = response.data.split("-");
              var cod = data[0];
              var mgs = data[1];
              switch (cod) {
                case "0":
                    notification.getNotification('error', mgs, 'Notificacion');
                  break;
                case "1":
                    notification.getNotification('success', mgs, 'Notificacion');
                    $scope.obtenertablas();
                  break;
                case "2":
                    notification.getNotification('warning', mgs, 'Notificacion');
                  break;
                default:
              }
          })
        break;
      case 'estudio':
            if(tipo2 == 'update'){
                $scope.inactivebtnestudio=true;
            }
            var d = $scope.anoterminacion;
            var curr_date = d.getDate();
            var curr_month = d.getMonth() + 1; //Months are zero based
            var curr_year = d.getFullYear();
            var datefinal = curr_date + "/" + curr_month + "/" + curr_year;
            $http({
               method:'POST',
               url:"php/talentohumano/datosbasicos/Cdatosbasicos.php",
               data: {function:"logicaestudio",institucion:$scope.institucion,titulo:$scope.titulo,programa:$scope.programa,nivel:$scope.nivel,
                      tipoperiodo:$scope.tipoperiodoe,periodo:$scope.periodo,fechafinal:datefinal,ubicacion:$scope.ubicacione,id:$scope.documento,renglon:data,tipo:tipo2}
            }).then(function(response){
                var data = response.data.split("-");
                var cod = data[0];
                var mgs = data[1];
                switch (cod) {
                  case "0":
                      notification.getNotification('error', mgs, 'Notificacion');
                    break;
                  case "1":
                      notification.getNotification('success', mgs, 'Notificacion');
                      $scope.limpiarestudio();
                      $scope.obtenertablas();
                    break;
                  case "2":
                      notification.getNotification('warning', mgs, 'Notificacion');
                    break;
                  default:
                }
            })
          break;
      case 'beneficiario':
              if($scope.addbeneficiario == true){
                var dd = ('0' + $scope.nacimientob.getDate()).slice(-2);
                var mm = ('0' + ($scope.nacimientob.getMonth() + 1)).slice(-2);
                var yyyy = $scope.nacimientob.getFullYear();
                var datenac =  dd+'/'+mm+'/'+yyyy;
                if(tipo2 == 'update'){
                    $scope.inactivebtnbeneficiario=true;
                }
                $http({
                   method:'POST',
                   url:"php/talentohumano/datosbasicos/Cdatosbasicos.php",
                   data: {function:"logicabeneficiario",tipodoc:$scope.tipodocb,documento:$scope.documentob,nombre:$scope.nombreb,parentezco:$scope.parentezcob,sexo:$scope.sexob,nacimiento:datenac,id:$scope.documento,renglon:data,tipo:tipo2}
                }).then(function(response){
                    var data = response.data.split("-");
                    var cod = data[0];
                    var mgs = data[1];
                    switch (cod) {
                      case "0":
                          notification.getNotification('error', mgs, 'Notificacion');
                        break;
                      case "1":
                          notification.getNotification('success', mgs, 'Notificacion');
                          $scope.limpiarbeneficiario();
                          $scope.obtenertablas();
                        break;
                      case "2":
                          notification.getNotification('warning', mgs, 'Notificacion');
                        break;
                      default:
                    }
                })
              }
            break;
      case 'entidad':
              if(tipo2 == 'update'){
                  $scope.inactivebtnentidad=true;
              }
              $http({
                 method:'POST',
                 url:"php/talentohumano/datosbasicos/Cdatosbasicos.php",
                 data: {function:"logicaentidad",tipoentidad:$scope.tipoentidad,entidad:$scope.entidad,finicial:$scope.fechainicial,ffinal:$scope.fechafinal,id:$scope.documento,tipo:tipo2}
              }).then(function(response){
                  var data = response.data.split("-");
                  var cod = data[0];
                  var mgs = data[1];
                  switch (cod) {
                    case "0":
                        notification.getNotification('error', mgs, 'Notificacion');
                      break;
                    case "1":
                        notification.getNotification('success', mgs, 'Notificacion');
                        $scope.limpiarentidad();
                        $scope.obtenertablas();
                      break;
                    case "2":
                        notification.getNotification('warning', mgs, 'Notificacion');
                      break;
                    default:
                  }
              })
              break;
      default:
  }
}

$scope.registrarinfo = function(){
  $scope.validarcampo();
  if($scope.camposvalidos == true){
      $http({
         method:'POST',
         url:"php/talentohumano/datosbasicos/Cdatosbasicos.php",
         data: {
                 function:'registrardatos',
                 tipodoc:$scope.tipoDoc,
                 documento:$scope.documento,
                 pnombre:$scope.pnombre.toUpperCase(),
                 snombre:$scope.snombre.toUpperCase(),
                 papellido:$scope.papellido.toUpperCase(),
                 sapellido:$scope.sapellido.toUpperCase(),
                 nacimiento:$scope.nacimiento,
                 sexo:$scope.sexo,
                 estadocivil:$scope.estadocivil,
                 gruposanguineo:$scope.gruposanguineo,
                 peso:$scope.peso,
                 estatura:$scope.estatura,
                 telefono:$scope.telefono,
                 celular:$scope.celular,
                 correo:$scope.correo,
                 direccion:$scope.direccion,
                 barrio:$scope.barrio,
                 rethus:$scope.rethus,
                 departamento:$scope.departamento,
                 municipio:$scope.municipio,
                 departamentoe:$scope.departamentoe,
                 municipioe:$scope.municipioe,
                 tipocontrato:$scope.tipocontrato,
                 empleador:$scope.empleador,
                 unidadestrategica:$scope.unidadestrategica,
                 unidadfuncional:$scope.unidadfuncional,
                 cargo:$scope.cargo,
                 gruposalario:$scope.gruposalario,
                 salario:$scope.salario,
                 tiporemuneracion:$scope.tiporemuneracion,
                 sedecontractual:$scope.sedecontractual,
                 estado:$scope.estado,
                 numerocuenta:$scope.numerocuenta,
                 tipocuenta:$scope.tipocuenta,
                 banco:$scope.banco,
                 fechaingreso:'01/01/1990',
                 fechaegreso:'01/01/1990',
                 tipo:'3'
                }
      }).then(function(response){
        var data = response.data.split("-");
        var cod = data[0];
        var mgs = data[1];
        switch (cod) {
          case "0":
              notification.getNotification('error', mgs, 'Notificacion');
            break;
          case "1":
              notification.getNotification('success', mgs, 'Notificacion');
              $scope.cargardatosbasicos();
            break;
          case "2":
              notification.getNotification('warning', mgs, 'Notificacion');
            break;
          default:
        }
      })
    }else{
      notification.getNotification('warning', 'Complete los campos requeridos!', 'Notificacion');
    }
}
$scope.buscarinstitucio = function(val){
  if(val == '2'){
    if($scope.instituswitch1 == true){
          $scope.instituswitch1 = false;
            $scope.instituswitch2 = true;
    }
    else{
        $scope.instituswitch2 = false;
          $scope.instituswitch1 = true;
    }

  }else{
    if($scope.institucionsearch.length >= 4 ){
      $scope.cargarselects('instituciones',$scope.institucionsearch);
      $scope.instituswitch1 = false;
      $scope.instituswitch2 = true;
    }else{
      notification.getNotification('warning', 'Debe escribir minimo 4 caracteres', 'Notificacion');
    }
  }
}
//informacion para las tablas de las tab
$scope.obtenertablas =  function(){
  $scope.tabalamedidas = false;
  $scope.tabalabeneficiario = false;
  $scope.tabalaestudio = false;
  $scope.tabalaentidad = false;
    $http({
       method:'POST',
       url:"php/talentohumano/datosbasicos/Rdatosbasicos.php",
       data: {function:"obtenerinfoadicional",id:$scope.documento}
     }).then(function(response){
          $scope.dataadicional = response.data;
          if($scope.dataadicional.medidas.length == 0){
            $scope.tabalamedidas = true;
            $scope.inactivebtnmedida = true;
          }else{
            $scope.inactivebtnmedida = false;
          }
          if($scope.dataadicional.beneficiarios.length == 0){
            $scope.tabalabeneficiario = true;
          }
          if($scope.dataadicional.estudio.length == 0){
            $scope.tabalaestudio = true;
          }
          if($scope.dataadicional.entidad.length == 0){
            $scope.tabalaentidad = true;
          }
     })
}
//funcionalidad de cada tab y sus limpiar
$scope.accionesbeneficiario =  function(data){
    $('#benb-'+data.renglon).removeClass('checkbene');
    $('.checkbene').prop('checked', false);
    if(document.getElementById('benb-'+data.renglon).checked == true){
        $scope.inactivebtnbeneficiario=false;
        $scope.tipodocb = data.tipodoc;
        $scope.documentob = data.cedulafamiliar;
        $scope.nombreb = data.nombre;
        $scope.parentezcob = data.codparentezco;
        $scope.sexob = data.sexo;
        var datetemp = data.nacimiento.split("/")
        $scope.nacimientob = new Date(Number(datetemp[2]),Number(datetemp[1]-1),Number(datetemp[0]));
        $scope.renglonb = data.renglon;
    }
    else{
      $scope.inactivebtnbeneficiario=true;
      $scope.limpiarbeneficiario();
    }
    $('#benb-'+data.renglon).addClass('checkbene');
}
$scope.accionesestudio =  function(data){
    $('#est-'+data.renglon).removeClass('checkestu');
    $('.checkestu').prop('checked', false);
    if(document.getElementById('est-'+data.renglon).checked == true){
        $scope.inactivebtnestudio=false;
        $scope.titulo = data.codtitulo;
        $scope.programa = data.codprograma;
        $scope.nivel = data.codnivel;
        $scope.tipoperiodoe = data.codtipoperiodo;
        $scope.periodo = data.codperiodo;
        $scope.ubicacione = data.codubicacion;
        $scope.renglone = data.renglon;
        $scope.anoterminacion = new Date(data.ano.split("/").reverse().join("/"));// data.ano.split("/").reverse().join("/");
        $scope.cargarselects('instituciones', data.institucion);
        $scope.instituswitch1 = false;
        $scope.instituswitch2 = true;
        setTimeout(function () {
          $scope.institucion = data.institucioncod;
        }, 500);
    }
    else{
      $scope.inactivebtnestudio=true;
      $scope.limpiarestudio();
    }
    $('#est-'+data.renglon).addClass('checkestu');
}
$scope.accionesentidad =  function(data){
    $('#'+data.tipoentidad).removeClass('checkent');
    $('.checkent').prop('checked', false);
    if(document.getElementById(data.tipoentidad).checked == true){
        $scope.inactivebtnentidad=false;
        $scope.tipoentidad = data.tipoentidad;
        $scope.fechainicial = data.fechinicial;
        $scope.fechafinal = data.fechafinal;
        $scope.cargarselects('entidades',$scope.tipoentidad);
        setTimeout(function () {
          $scope.entidad = data.entidad;
        }, 500);
    }
    else{
      $scope.inactivebtnentidad=true;
      $scope.limpiarentidad();
    }
    $('#'+data.tipoentidad).addClass('checkent');
}
$scope.limpiarentidad = function(){
  $scope.tipoentidad = "0";
  $scope.entidad = "0";
  $scope.fechainicial = "";
  $scope.fechafinal = "";
}
$scope.limpiarbeneficiario =  function(){
  $scope.tipodocb = "0"
  $scope.documentob = ""
  $scope.nombreb = "";
  $scope.parentezcob = "0";
  $scope.sexob = "0";
  $scope.nacimientob = "";
  $scope.addbeneficiario = true;
}
$scope.limpiarestudio =  function(){
  $scope.institucion = "";
  $scope.titulo = "0";
  $scope.programa = "0";
  $scope.nivel = "0";
  $scope.tipoperiodoe = "0";
  $scope.periodo = "0";
  $scope.ubicacione = "0";
  $scope.institucion = "0";
  $scope.anoterminacion = "";
  $scope.instituswitch1 = true;
  $scope.instituswitch2 =  false;
  $scope.institucionsearch = "";
}
$scope.limpiartodo =  function(){
  $("#-pnombre").removeClass("requerido");
  $("#-snombre").removeClass("requerido");
  $("#-papellido").removeClass("requerido");
  $("#-sapellido").removeClass("requerido");
  $("#-date1").removeClass("requerido");
  $("#-sexo").removeClass("requerido");
  $("#-estadocivil").removeClass("requerido");
  $("#-gruposanguineo").removeClass("requerido");
  $("#-peso").removeClass("requerido");
  $("#-estatura").removeClass("requerido");
  $("#-telefono").removeClass("requerido");
  $("#-celular").removeClass("requerido");
  $("#-correo").removeClass("requerido");
  $("#-direccion").removeClass("requerido");
  $("#-barrio").removeClass("requerido");
  $("#-departamento").removeClass("requerido");
  $("#-municipio").removeClass("requerido");
  $scope.habi = false;
  //personal
  $scope.pnombre = "";
  $scope.snombre = "";
  $scope.papellido = "";
  $scope.sapellido = "";
  $scope.nacimiento = "";
  $scope.sexo = "0";
  $scope.estadocivil = "0";
  $scope.gruposanguineo = "0";
  $scope.peso = "";
  $scope.estatura = "";
  $scope.telefono = "";
  $scope.celular = "";
  $scope.correo = "";
  $scope.direccion = "";
  $scope.barrio = "";
  $scope.departamento = "0";
  $scope.municipio  = "0";
  //empresarial
  $scope.departamentoe = "0";
  $scope.municipioe = "0";
  $scope.tipocontrato = "0";
  $scope.empleador = "0";
  $scope.unidadestrategica = "0";
  $scope.unidadfuncional = "0";
  $scope.cargo = "0";
  $scope.gruposalario = "";
  $scope.salario = "0";
  $scope.tiporemuneracion = "0";
  $scope.sedecontractual = "0";
  $scope.estado = "0";
  $scope.numerocuenta = "";
  $scope.tipocuenta = "0";
  $scope.banco = "0";

  //informativo
  $scope.correoinstitucional = "";
  $scope.dominio = "";
  $scope.usuario = "";
  //otros
  $scope.tipoentidad = "0";
  $scope.entidad = "0";
  $scope.fechainicial = "";
  $scope.fechafinal = "";
  //educacion
  $scope.institucion = "";
  $scope.titulo = "0";
  $scope.programa = "0";
  $scope.nivel = "0";
  $scope.tipoperiodoe = "0";
  $scope.periodo = "0";
  $scope.ubicacione = "0";
  //beneficiario
  $scope.tipodocb = "0"
  $scope.documentob = ""
  $scope.nombreb = "";
  $scope.parentezcob = "0";
  $scope.sexob = "0";
  $scope.nacimientob = "";
  //medida
  $scope.sueter = "0";
  $scope.camisa = "0";
  $scope.pantalon = "0";
  $scope.zapato = "0";

  $scope.inactive1 = false;
  $scope.inactiveinfo = true;
  $scope.disbaled1 = true;
  $scope.inactivebtnbeneficiario=true;
  $scope.inactivebtnestudio=true;
  $scope.inactivebtnentidad=true;
  $scope.inactivebtnmedida = true;
  $scope.inactivebtninfo = true;
  $scope.tabalamedidas = true;
  $scope.tabalabeneficiario = true;
  $scope.tabalaestudio = true;
  $scope.tabalaentidad = true;
  //campos lectora
  $scope.papellido = '';
  $scope.sapellido = '';
  $scope.pnombre = '';
  $scope.snombre = '';
  $scope.sexo = '';
  $scope.nacimiento = '';
  $scope.gruposanguineo = '';
  $scope.qrtipo = '';
  $scope.qrnumerob = '';
}
$scope.validarcampo =  function(){
  $scope.camposvalidos = true;
  if($scope.pnombre == "" || $scope.pnombre == "0" || $scope.pnombre == null || $scope.pnombre == undefined || $scope.pnombre == " "){$scope.camposvalidos = false; $("#-pnombre").addClass("requerido");}else{$("#-pnombre").removeClass("requerido");};
  if($scope.snombre == "" || $scope.snombre == "0" || $scope.snombre == null || $scope.snombre == undefined || $scope.snombre == " "){$scope.snombre = "."}else{};
  if($scope.papellido == "" || $scope.papellido == "0" || $scope.papellido == null || $scope.papellido == undefined || $scope.papellido == " "){$scope.camposvalidos = false; $("#-papellido").addClass("requerido");}else{$("#-papellido").removeClass("requerido");};
  if($scope.sapellido == "" || $scope.sapellido == "0" || $scope.sapellido == null || $scope.sapellido == undefined || $scope.sapellido == " "){$scope.sapellido = ".";}else{};
  if($scope.nacimiento == "" || $scope.nacimiento == "0" || $scope.nacimiento == null || $scope.nacimiento == undefined || $scope.nacimiento == " "){$scope.camposvalidos = false; $("#-date1").addClass("requerido");}else{$("#-date1").removeClass("requerido");};
  if($scope.sexo == "" || $scope.sexo == "0" || $scope.sexo == null || $scope.sexo == undefined || $scope.sexo == " "){$scope.camposvalidos = false; $("#-sexo").addClass("requerido");}else{$("#-sexo").removeClass("requerido");};
  if($scope.estadocivil == "" || $scope.estadocivil == "0" || $scope.estadocivil == null || $scope.estadocivil == undefined || $scope.estadocivil == " "){$scope.camposvalidos = false; $("#-estadocivil").addClass("requerido");}else{$("#-estadocivil").removeClass("requerido");};
  if($scope.gruposanguineo == "" || $scope.gruposanguineo == "0" || $scope.gruposanguineo == null || $scope.gruposanguineo == undefined || $scope.gruposanguineo == " "){$scope.camposvalidos = false; $("#-gruposanguineo").addClass("requerido");}else{$("#-gruposanguineo").removeClass("requerido");};
  if($scope.peso == "" || $scope.peso == "0" || $scope.peso == null || $scope.peso == undefined || $scope.peso == " "){$scope.camposvalidos = false; $("#-peso").addClass("requerido");}else{$("#-peso").removeClass("requerido");};
  if($scope.estatura == "" || $scope.estatura == "0" || $scope.estatura == null || $scope.estatura == undefined || $scope.estatura == " "){$scope.camposvalidos = false;$("#-estatura").addClass("requerido");}else{$("#-estatura").removeClass("requerido");};
  if($scope.telefono == "" || $scope.telefono == "0" || $scope.telefono == null || $scope.telefono == undefined || $scope.telefono == " "){$scope.camposvalidos = false; $("#-telefono").addClass("requerido");}else{$("#-telefono").removeClass("requerido");};
  if($scope.celular == "" || $scope.celular == "0" || $scope.celular == null || $scope.celular == undefined || $scope.celular == " "){$scope.camposvalidos = false; $("#-celular").addClass("requerido");}else{$("#-celular").removeClass("requerido");};
  // if($scope.correo == "" || $scope.correo == "0" || $scope.correo == null || $scope.correo == undefined || $scope.correo == " "){$scope.camposvalidos = false; $("#-correo").addClass("requerido");}else{$("#-correo").removeClass("requerido");};
  if($scope.direccion == "" || $scope.direccion == "0" || $scope.direccion == null || $scope.direccion == undefined || $scope.direccion == " "){$scope.camposvalidos = false; $("#-direccion").addClass("requerido");}else{$("#-direccion").removeClass("requerido");};
  if($scope.barrio == "" || $scope.barrio == "0" || $scope.barrio == null || $scope.barrio == undefined || $scope.barrio == " "){$scope.camposvalidos = false; $("#-barrio").addClass("requerido");}else{$("#-barrio").removeClass("requerido");};
  if($scope.departamento == "" || $scope.departamento == "0" || $scope.departamento == null || $scope.departamento == undefined || $scope.departamento == " "){$scope.camposvalidos = false; $("#-departamento").addClass("requerido");}else{$("#-departamento").removeClass("requerido");};
  if($scope.municipio == "" || $scope.municipio == "0" || $scope.municipio == null || $scope.municipio == undefined || $scope.municipio == " "){$scope.municipio = false; $("#-municipio").addClass("requerido");}else{$("#-municipio").removeClass("requerido");};

}
$scope.subiradjuntobeneficiario =  function(tipo){
    if(tipo == 'insert'){
      $scope.campobenvalido = true;
      if($scope.tipodocb == "" || $scope.tipodocb == "0" || $scope.tipodocb == null || $scope.tipodocb == undefined || $scope.tipodocb == " "){$scope.campobenvalido = false;}
      if($scope.documentob == "" || $scope.documentob == "0" || $scope.documentob == null || $scope.documentob == undefined || $scope.documentob == " "){$scope.campobenvalido = false;}
      if($scope.nombreb == "" || $scope.nombreb == "0" || $scope.nombreb == null || $scope.nombreb == undefined || $scope.nombreb == " "){$scope.campobenvalido = false;}
      if($scope.parentezcob == "" || $scope.parentezcob == "0" || $scope.parentezcob == null || $scope.parentezcob == undefined || $scope.parentezcob == " "){$scope.campobenvalido = false;}
      if($scope.sexob == "" || $scope.sexob == "0" || $scope.sexob == null || $scope.sexob == undefined || $scope.sexob == " "){$scope.campobenvalido = false;}
      if($scope.nacimientob == "" || $scope.nacimientob == "0" || $scope.nacimientob == null || $scope.nacimientob == undefined || $scope.nacimientob == " "){$scope.campobenvalido = false;}

      if($scope.campobenvalido == true){
        var scopedec = $scope.$new();
        scopedec.param = new Array;
        scopedec.param.tipo = $scope.tipodocb;
        scopedec.param.id = $scope.documentob;
        ngDialog.open({
           template: 'views/talentohumano/empleados/modaladjunto.html',
           className: 'ngdialog-theme-plain',
           controller: 'adjbencontroller',
           scope: scopedec
        });
      }else{
        notification.getNotification('warning', 'Debe completar todos los campos del beneficiario para adjuntar el docmento!', 'Notificacion');
      }
    }else{
      $scope.addbeneficiario = true;
      $scope.accionestablasadiciones('beneficiario','insert','999');
    }
}
}])
