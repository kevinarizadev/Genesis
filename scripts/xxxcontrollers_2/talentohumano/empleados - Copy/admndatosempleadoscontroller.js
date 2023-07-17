'use strict';
angular.module('GenesisApp')
.controller('admndatosempleadoscontroller', ['$scope', '$http', 'altocostoHttp','ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller','$rootScope','$window',
function ($scope, $http, altocostoHttp, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window) {

  (function() {
      $('.modal').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
              opacity: 0, // Opacity of modal background
              inDuration: 300, // Transition in duration
              outDuration: 200, // Transition out duration
              startingTop: '4%', // Starting top style attribute
              endingTop: '10%' // Ending top style attribute
              // ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
              //   alert("Ready");
              //   console.log(modal, trigger);
              // },
              // complete: function() { alert('Closed'); } // Callback for Modal close
            });
      $('#date1').bootstrapMaterialDatePicker({ format : 'DD/MM/YYYY', lang : 'fr', weekStart : 1, time: false, nowText:'Now', maxDate : new Date()});
      $('#date2').bootstrapMaterialDatePicker({ format : 'DD/MM/YYYY', lang : 'fr', weekStart : 1, time: false, nowText:'Now', maxDate : new Date(), minDate: new Date("01/01/2005")});
      $('#date3').bootstrapMaterialDatePicker({ format : 'DD/MM/YYYY', lang : 'fr', weekStart : 1, time: false, nowText:'Now', maxDate : new Date()});
      $('#date4').bootstrapMaterialDatePicker({ format : 'DD/MM/YYYY', lang : 'fr', weekStart : 1, time: false, nowText:'Now'});
      $('#date5').bootstrapMaterialDatePicker({ format : 'DD/MM/YYYY', lang : 'fr', weekStart : 1, time: false, nowText:'Now'});
    }());

$scope.tipoDoc = "0";
$scope.documento = "";
$scope.todo = true;
$scope.todo2 = true;
$scope.inactivefinduser2 = true;
$scope.inactivefinduser = false;
$scope.tablausuario = true;
$scope.inactiveswitch = true;
$scope.newData = [];
$scope.cardempresarial = false;
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
$scope.rethus = "3";
//empresarial
$scope.departamentoe = "0";
$scope.municipioe = "0";
$scope.tipocontrato = "0";
$scope.empleador = "0";
$scope.unidadestrategica = "-1";
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
$scope.fechaingreso = "";
$scope.fechaegreso =  "";

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
$scope.sueter = "";
$scope.camisa = "";
$scope.pantalon = "";
$scope.zapato = "";


$scope.inactive1 = false;
$scope.inactiveinfo = true;
$scope.disbaled1 = true;
$scope.inactivebtnbeneficiario=true;
$scope.inactivebtnestudio=true;
$scope.inactivebtnentidad=true;
$scope.inactivebtnmedida = true;
$scope.inactivebtninfo = true;
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

$scope.changesearch =  function(){
  if($scope.inactivefinduser == false){
      $scope.inactivefinduser = true;
      $scope.inactivefinduser2 = false;
      $scope.tablausuario = true;
      $scope.inactiveswitch = false;
  }else{
    $scope.inactivefinduser = false;
    $scope.inactivefinduser2 = true;
    $scope.inactiveinfo = true;
    $scope.inactiveswitch = true;
  }
}

$scope.cargar =  function(data){
  $scope.tipoDoc = data.tipo;
  $scope.documento  = data.cedula;
  $scope.changesearch();
  $scope.cargarinfopersonal('no');
}

$scope.changeempresarial = function(){
  if($scope.cardempresarial == false){
      $scope.cardempresarial = true;
      $scope.setNewData();
  }else{
    $scope.cardempresarial = false;

    $scope.unidadfuncional  ='0';
    $scope.departamentoe ='0';
    $scope.municipioe  ='0';
    $scope.unidadfuncional  ='0';
    $scope.cargo  ='0';
    $scope.salario ='0';
    $scope.gruposalario ='0';
    $scope.nomgruposalario ='0';
    $scope.tipocontrato =  '0';
    $scope.empleador = '0';
    $scope.unidadestrategica = '0';
    $scope.tiporemuneracion = '0';
  }
}

$scope.setNewData =  function(){
  $scope.departamentoe = $scope.newData.dptoe;
  $scope.municipioe  = $scope.newData.mune;
  $scope.unidadfuncional  = $scope.newData.unidad_funcional;
  $scope.cargo  = $scope.newData.cargo+'-'+$scope.newData.nivel;
  $scope.salario = $scope.newData.salario;
  $scope.gruposalario = $scope.newData.codgruposalarial;
  $scope.nomgruposalario = $scope.newData.nomgruposalaria;
  $scope.tipocontrato =  $scope.newData.tipo_contrato;
  $scope.empleador = $scope.newData.empleador;
  $scope.unidadestrategica = $scope.newData.unidad_estrategica;
  if($scope.newData.fecha_ingreso == null){$scope.fechaingreso  = "";}else{$scope.fechaingreso = $scope.newData.fecha_ingreso;}
  if($scope.newData.fecha_egreso == null){$scope.fechaegreso = "";}else{$scope.fechaegreso = $scope.newData.fecha_egreso;}
  $scope.tiporemuneracion = $scope.newData.remuneracion;
  $scope.estado = $scope.newData.estado_empleado;
  $scope.numerocuenta = $scope.newData.numero_cuenta;
  $scope.tipocuenta = $scope.newData.tipo_cuenta;
  $scope.banco = $scope.newData.banco;
}

$scope.buscarusuario =  function(palabra){
  if(palabra != "" && palabra != null && palabra != undefined && palabra.length >= 3 ){
    $http({
       method:'POST',
       url:"php/talentohumano/datosbasicos/Rdatosbasicos.php",
       data: {function:'obtenerusuarios',dato:palabra}
    }).then(function(response){
       if(response.data.length == 0){
         $scope.tablausuario = true;
         notification.getNotification('info', 'No se encontraron coincidencias!', 'Notificacion');
       }else{
         $scope.usuarios = response.data;
         $scope.tablausuario = false;
       }
    })
  }
  else{
    notification.getNotification('warning', 'Debe ingresar minimo 3 letras para buscar ', 'Notificacion');
  }
}

$scope.cargarinfopersonal =  function(desicion){
  $scope.limpiartodo('no');
  if($scope.tipoDoc != "" && $scope.documento != ""){
    $http({
       method:'POST',
       url:"php/talentohumano/datosbasicos/Rdatosbasicos.php",
       data: {function:'obtnerinformacion',id:$scope.documento,tipo:$scope.tipoDoc}
    }).then(function(response){
        if(response.data.estado == '1'){
           $scope.todo = true;
           $scope.inactivebtninfo = false;
           $scope.newData = response.data;
            $scope.obtenertablas();
            $scope.obtenernovedades();
            $scope.inactiveestado = false;
            $scope.inactiveinfo = false;
            $scope.fubicacionlaboral('departamentoper',$scope.newData.dptoe)
            $scope.funidadfuncional('unidadfuncional',$scope.newData.unidad_estrategica);
            $scope.fcargos('cargo',$scope.newData.unidad_funcional);
            $scope.fsalario('valorsalarial',$scope.newData.nivel,'c');
            $scope.cardempresarial2 = false;
            $scope.cardempresarial = false;
        }else{
            $scope.limpiartodo2('si');
            if(desicion == 'si'){
              $scope.documento  = $scope.qrnumerob;
              $scope.papellido = $scope.qrprimer_apellidob;
              $scope.sapellido = $scope.qrsegundo_apellidob;
              $scope.pnombre = $scope.qrprimer_nombreb;
              $scope.snombre = $scope.qrsegundo_nombreb;
              $scope.sexo  = $scope.qrsexob;
              $scope.nacimiento = $scope.qrfechab.substring(6, 8)+"/"+$scope.qrfechab.substring(4, 6)+'/'+$scope.qrfechab.substring(0, 4);
              $scope.gruposanguineo = $scope.qrtipo_sangreb;
            }
            $scope.cardempresarial2 = true;
            $scope.cardempresarial = true;
            $scope.inactiveinfo = false;
            $scope.inactivebtninfo = true;
            $scope.todo = false;
            $scope.estado = "A";
            $scope.inactiveestado = true;
        }
    })
  }else{
    notification.getNotification('warning', 'Debe Completar los campos', 'Notificacion');
  }
}
//cargar la info del usuario que se busca
$scope.cargardatosbasicos =  function(desicion){
  $scope.limpiartodo('no');
  $scope.newData = [];
  $scope.tipoDoc = $scope.qrtipo;
  $scope.documento  = $scope.qrnumerob;
  setTimeout(function () {
    $scope.cargarinfopersonal('si')
  }, 200);
}

//cargar
$scope.fubicacionpersonal =  function(tipo,valor){
  if(valor != null){
    $http({
       method:'POST',
       url:"php/talentohumano/datosbasicos/Rdatosbasicos.php",
       data: {function:"obtenerselects",tipo:tipo,valor:valor}
    }).then(function(response){
            $scope.municipiosper = response.data;
            $scope.municipio  = $scope.newData.mun;
    })
  }
}

$scope.fubicacionlaboral =  function(tipo,valor){
  if(valor != null){
    $http({
       method:'POST',
       url:"php/talentohumano/datosbasicos/Rdatosbasicos.php",
       data: {function:"obtenerselects",tipo:tipo,valor:valor}
    }).then(function(response){
        $scope.municipiosemp = response.data;
    })
  }
}

$scope.funidadfuncional =  function(tipo,valor){
  if(valor != null){
    $http({
      method:'POST',
      url:"php/talentohumano/datosbasicos/Rdatosbasicos.php",
      data: {function:"obtenerselects",tipo:tipo,valor:valor}
    }).then(function(response){
        if(response.data != "0"){
          $scope.unidadesfuncionales = response.data;

        }
    })
  }
}

$scope.fcargos =  function(tipo,valor){
  if(valor != null) {
    $http({
       method:'POST',
       url:"php/talentohumano/datosbasicos/Rdatosbasicos.php",
       data: {function:"obtenerselects",tipo:tipo,valor:valor}
    }).then(function(response){
        $scope.cargos = response.data;
    })
  }
}

$scope.fsalario =  function(tipo,valor,dato){
  if(valor != null){

    if(dato != 'c'){
      var valor2 = valor.split("-")
      valor = valor2[1];
    }
    $http({
       method:'POST',
       url:"php/talentohumano/datosbasicos/Rdatosbasicos.php",
       data: {function:"obtenerselects",tipo:tipo,valor:valor}
    }).then(function(response){
        $scope.salarios = response.data;
    })
  }
}
$scope.fentidades =  function(tipo,valor){
  if(valor != null){
    $http({
       method:'POST',
       url:"php/talentohumano/datosbasicos/Rdatosbasicos.php",
       data: {function:"obtenerselects",tipo:tipo,valor:valor}
    }).then(function(response){
        $scope.entidadesinfo = response.data;
    })
  }
}
$scope.fgruposalario =  function(tipo,valor){
  if(valor != null){
    $http({
       method:'POST',
       url:"php/talentohumano/datosbasicos/Rdatosbasicos.php",
       data: {function:"obtenerselects",tipo:tipo,valor:valor}
    }).then(function(response){
        $scope.gruposalario = response.data["0"].codigo;
        $scope.nomgruposalario = response.data["0"].nombre;
    })
  }
}
//cargar selects dependientes
$scope.ftipocontrato = function(valor){
  if(valor == '1'){
    $scope.disbaled1 = false;
  }else{
    $scope.disbaled1 = true;
  }
}
//evento de la lectora
$scope.active = function () {
  if($scope.pistola == false) {
      notification.getNotification('info', 'Lector de Codigo desactivado!', 'Notificacion');

  }else{
    notification.getNotification('info', 'Lector de Codigo activado!', 'Notificacion');
  }
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
  $scope.qrcedula = "";
  $("#qrcedula").focus();
}

//funcionamiento de las tab
$scope.setTab = function(newTab){
  $scope.tab = newTab;
  $(".tabI").removeClass("tabactiva");
  $(".tabII").removeClass("tabactiva");
  $(".tabIII").removeClass("tabactiva");
  $(".tabIV").removeClass("tabactiva");
  $(".tabV").removeClass("tabactiva");
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
    case 5:
    $(".tabV").addClass("tabactiva");
    $scope.Title = "Información Novedades";
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
            $http({
               method:'POST',
               url:"php/talentohumano/datosbasicos/Cdatosbasicos.php",
               data: {function:"logicaestudio",institucion:$scope.institucion,titulo:$scope.titulo,programa:$scope.programa,nivel:$scope.nivel,
                      tipoperiodo:$scope.tipoperiodoe,periodo:$scope.periodo,ubicacion:$scope.ubicacione,id:$scope.documento,renglon:data,tipo:tipo2}
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
//informacion para las tablas de las tab
$scope.registrarinfo = function(tipo){
    $scope.validarcampo(tipo);
    if($scope.camposvalidos == true){
      $scope.cargotemp = $scope.cargo.split("-");
      $http({
         method:'POST',
         url:"php/talentohumano/datosbasicos/Cdatosbasicos.php",
         data: {
                   function:'registrardatos',
                   tipodoc:$scope.tipoDoc,
                   documento:$scope.documento,
                   pnombre:$scope.pnombre,
                   snombre:$scope.snombre,
                   papellido:$scope.papellido,
                   sapellido:$scope.sapellido,
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
                   rethus: $scope.rethus,
                   departamento:$scope.departamento,
                   municipio:$scope.municipio,
                   departamentoe:$scope.departamentoe,
                   municipioe:$scope.municipioe,
                   tipocontrato:$scope.tipocontrato,
                   empleador:$scope.empleador,
                   unidadestrategica:$scope.unidadestrategica,
                   unidadfuncional:$scope.unidadfuncional,
                   cargo:$scope.cargotemp[0],
                   gruposalario:$scope.gruposalario,
                   salario:$scope.salario,
                   tiporemuneracion:$scope.tiporemuneracion,
                   sedecontractual:$scope.sedecontractual,
                   estado:$scope.estado,
                   numerocuenta:$scope.numerocuenta,
                   tipocuenta:$scope.tipocuenta,
                   banco:$scope.banco,
                   fechaingreso:$scope.fechaingreso,
                   fechaegreso:$scope.fechaegreso,
                   tipo:tipo
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
$scope.obtenernovedades =  function(){
  $scope.tabalanovedades = true;
    $http({
       method:'POST',
       url:"php/talentohumano/datosbasicos/Rdatosbasicos.php",
       data: {function:"obtenernovedades",id:$scope.documento}
     }).then(function(response){
          $scope.datanovedad = response.data;
          if($scope.datanovedad.dato == "0"){
             $scope.tabalanovedades = true;
          }else{
             $scope.tabalanovedades = false;
          }
     })
}
$scope.cargarnovedaddetalle =  function(doc,num,ubi,conc){
    $http({
       method:'POST',
       url:"php/talentohumano/datosbasicos/Rdatosbasicos.php",
       data: {function:"obtenernovedadesdetalle",doc:doc,num:num,ubi:ubi}
     }).then(function(response){
          $scope.datanovedaddetalle = response.data;
          $scope.tiponov = conc;
     })
}
//funcionalidad de cada tab y sus limpiar
$scope.accionesbeneficiario =  function(data){
    $('#'+data.renglon).removeClass('checkbene');
    $('.checkbene').prop('checked', false);
    if(document.getElementById(data.renglon).checked == true){
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
    $('#'+data.renglon).addClass('checkbene');
}
$scope.accionesestudio =  function(data){
    $('#'+data.renglon).removeClass('checkestu');
    $('.checkestu').prop('checked', false);
    if(document.getElementById(data.renglon).checked == true){
        $scope.inactivebtnestudio=false;
        $scope.institucion = data.institucion;
        $scope.titulo = data.codtitulo;
        $scope.programa = data.codprograma;
        $scope.nivel = data.codnivel;
        $scope.tipoperiodoe = data.codtipoperiodo;
        $scope.periodo = data.codperiodo;
        $scope.ubicacione = data.codubicacion;
        $scope.renglone = data.renglon;
    }
    else{
      $scope.inactivebtnestudio=true;
      $scope.limpiarestudio();
    }
    $('#'+data.renglon).addClass('checkestu');
}
$scope.accionesentidad =  function(data){
    $('#'+data.tipoentidad).removeClass('checkent');
    $('.checkent').prop('checked', false);
    if(document.getElementById(data.tipoentidad).checked == true){
        $scope.inactivebtnentidad=false;
        $scope.tipoentidad = data.tipoentidad;
        $scope.fechainicial = data.fechinicial;
        $scope.fechafinal = data.fechafinal;
        $scope.fentidades('entidades',$scope.tipoentidad);
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
}
$scope.limpiarestudio =  function(){
  $scope.institucion = "";
  $scope.titulo = "0";
  $scope.programa = "0";
  $scope.nivel = "0";
  $scope.tipoperiodoe = "0";
  $scope.periodo = "0";
  $scope.ubicacione = "0";
}
$scope.limpiartodo2 =  function(x){
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

  $("#-departamentoe").removeClass("requerido");
  $("#-municipioe").removeClass("requerido");
  $("#-tipocontrato").removeClass("requerido");
  $("#-empleador").removeClass("requerido");
  $("#-unidadestrategica").removeClass("requerido");
  $("#-unidadfuncional").removeClass("requerido");
  $("#-cargo").removeClass("requerido");
  $("#-gruposalario").removeClass("requerido");
  $("#-salario").removeClass("requerido");
  $("#-tiporemuneracion").removeClass("requerido");
  $("#-estado").removeClass("requerido");
  $("#-numerocuenta").removeClass("requerido");
  $("#-tipocuenta").removeClass("requerido");
  $("#-banco").removeClass("requerido");
  $("#-date2").removeClass("requerido");
  //personal
 
  $scope.todo = true;
  $scope.todo2 = true;
  $scope.tablausuario = true;
  $scope.newData = [];
  $scope.cardempresarial = false;
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
  $scope.rethus = "3";
  //empresarial
  $scope.departamentoe = "0";
  $scope.municipioe = "0";
  $scope.tipocontrato = "0";
  $scope.empleador = "0";
  $scope.unidadestrategica = "-1";
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
  $scope.fechaingreso = "";
  $scope.fechaegreso =  "";

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
  $scope.sueter = "";
  $scope.camisa = "";
  $scope.pantalon = "";
  $scope.zapato = "";


  $scope.inactive1 = false;
  $scope.inactiveinfo = true;
  $scope.disbaled1 = true;
  $scope.inactivebtnbeneficiario=true;
  $scope.inactivebtnestudio=true;
  $scope.inactivebtnentidad=true;
  $scope.inactivebtnmedida = true;
  $scope.inactivebtninfo = true;
}
$scope.limpiartodo =  function(x){
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

  $("#-departamentoe").removeClass("requerido");
  $("#-municipioe").removeClass("requerido");
  $("#-tipocontrato").removeClass("requerido");
  $("#-empleador").removeClass("requerido");
  $("#-unidadestrategica").removeClass("requerido");
  $("#-unidadfuncional").removeClass("requerido");
  $("#-cargo").removeClass("requerido");
  $("#-gruposalario").removeClass("requerido");
  $("#-salario").removeClass("requerido");
  $("#-tiporemuneracion").removeClass("requerido");
  $("#-estado").removeClass("requerido");
  $("#-numerocuenta").removeClass("requerido");
  $("#-tipocuenta").removeClass("requerido");
  $("#-banco").removeClass("requerido");
  $("#-date2").removeClass("requerido");
  //personal
  if(x=='si'){
    $scope.tipoDoc = "0";
    $scope.documento = "";
    $scope.inactivefinduser2 = true;
    $scope.inactivefinduser = false;
  }
  $scope.todo = true;
  $scope.todo2 = true;
  $scope.tablausuario = true;
  $scope.newData = [];
  $scope.cardempresarial = false;
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
  $scope.rethus = "3";
  //empresarial
  $scope.departamentoe = "0";
  $scope.municipioe = "0";
  $scope.tipocontrato = "0";
  $scope.empleador = "0";
  $scope.unidadestrategica = "-1";
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
  $scope.fechaingreso = "";
  $scope.fechaegreso =  "";

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
  $scope.sueter = "";
  $scope.camisa = "";
  $scope.pantalon = "";
  $scope.zapato = "";


  $scope.inactive1 = false;
  $scope.inactiveinfo = true;
  $scope.disbaled1 = true;
  $scope.inactivebtnbeneficiario=true;
  $scope.inactivebtnestudio=true;
  $scope.inactivebtnentidad=true;
  $scope.inactivebtnmedida = true;
  $scope.inactivebtninfo = true;
}
$scope.validarcampo =  function(opcion){
  $scope.camposvalidos = true;
  switch (opcion) {
      case "1":
      if($scope.departamentoe == "" || $scope.departamentoe == "0" || $scope.departamentoe == null || $scope.departamentoe == undefined || $scope.departamentoe == " "){$scope.camposvalidos = false; $("#-departamentoe").addClass("requerido");}else{$("#-departamentoe").removeClass("requerido");};
      if($scope.municipioe == "" || $scope.municipioe == "0" || $scope.municipioe == null || $scope.municipioe == undefined || $scope.municipioe == " "){$scope.camposvalidos = false; $("#-municipioe").addClass("requerido");}else{$("#-municipioe").removeClass("requerido");};
      if($scope.tipocontrato == "" || $scope.tipocontrato == "0" || $scope.tipocontrato == null || $scope.tipocontrato == undefined || $scope.tipocontrato == " "){$scope.camposvalidos = false; $("#-tipocontrato").addClass("requerido");}else{$("#-tipocontrato").removeClass("requerido");};
      if($scope.empleador == "" || $scope.empleador == "0" || $scope.empleador == null || $scope.empleador == undefined || $scope.empleador == " "){$scope.camposvalidos = false; $("#-empleador").addClass("requerido");}else{$("#-empleador").removeClass("requerido");};
      if($scope.unidadestrategica == "" || $scope.unidadestrategica == "-1" || $scope.unidadestrategica == null || $scope.unidadestrategica == undefined || $scope.unidadestrategica == " "){$scope.camposvalidos = false; $("#-unidadestrategica").addClass("requerido");}else{$("#-unidadestrategica").removeClass("requerido");};
      if($scope.unidadfuncional == "" || $scope.unidadfuncional == "0" || $scope.unidadfuncional == null || $scope.unidadfuncional == undefined || $scope.unidadfuncional == " "){$scope.camposvalidos = false; $("#-unidadfuncional").addClass("requerido");}else{$("#-unidadfuncional").removeClass("requerido");};
      if($scope.cargo == "" || $scope.cargo == "0" || $scope.cargo == null || $scope.cargo == undefined || $scope.cargo == " "){$scope.camposvalidos = false; $("#-cargo").addClass("requerido");}else{$("#-cargo").removeClass("requerido");};
      if($scope.gruposalario == "" || $scope.gruposalario == "0" || $scope.gruposalario == null || $scope.gruposalario == undefined || $scope.gruposalario == " "){$scope.camposvalidos = false; $("#-gruposalario").addClass("requerido");}else{$("#-gruposalario").removeClass("requerido");};
      if($scope.salario == "" || $scope.salario == "0" || $scope.salario == null || $scope.salario == undefined || $scope.salario == " "){$scope.camposvalidos = false; $("#-salario").addClass("requerido");}else{$("#-salario").removeClass("requerido");};
      if($scope.tiporemuneracion == "" || $scope.tiporemuneracion == "0" || $scope.tiporemuneracion == null || $scope.tiporemuneracion == undefined || $scope.tiporemuneracion == " "){$scope.camposvalidos = false; $("#-tiporemuneracion").addClass("requerido");}else{$("#-tiporemuneracion").removeClass("requerido");};
      if($scope.estado == "" || $scope.estado == "0" || $scope.estado == null || $scope.estado == undefined || $scope.estado == " "){$scope.camposvalidos = false; $("#-estado").addClass("requerido");}else{$("#-estado").removeClass("requerido");};
      if($scope.tipocontrato == '1' || $scope.tipocontrato == '4' || $scope.tipocontrato == '5'){
            if($scope.tipocuenta == "" || $scope.tipocuenta == "0" || $scope.tipocuenta == null || $scope.tipocuenta == undefined || $scope.tipocuenta == " "){$scope.camposvalidos = false; $("#-tipocuenta").addClass("requerido");}else{$("#-tipocuenta").removeClass("requerido");};
            if($scope.banco == "" || $scope.banco == "0" || $scope.banco == null || $scope.banco == undefined || $scope.banco == " "){$scope.camposvalidos = false; $("#-banco").addClass("requerido");}else{$("#-banco").removeClass("requerido");};
            if($scope.numerocuenta == "" || $scope.numerocuenta == "0" || $scope.numerocuenta == null || $scope.numerocuenta == undefined || $scope.numerocuenta == " "){$scope.camposvalidos = false; $("#-numerocuenta").addClass("requerido");}else{$("#-numerocuenta").removeClass("requerido");};
       }else{
            $scope.tipocuenta = "";
            $scope.banco = "";
            $scope.numerocuenta = "";
       }
       if($scope.fechaingreso == "" || $scope.fechaingreso == "0" || $scope.fechaingreso == null || $scope.fechaingreso == undefined || $scope.fechaingreso == " "){$scope.camposvalidos = false; $("#-date2").addClass("requerido");}else{$("#-date2").removeClass("requerido");};
        break;
      case "2":
          //if($scope.pnombre == "" || $scope.pnombre == "0" || $scope.pnombre == null || $scope.pnombre == undefined || $scope.pnombre == " "){$scope.camposvalidos = false; $("#-pnombre").addClass("requerido");}else{$("#-pnombre").removeClass("requerido");};
          // if($scope.snombre == "" || $scope.snombre == "0" || $scope.snombre == null || $scope.snombre == undefined || $scope.snombre == " "){$scope.camposvalidos = false; $("#-snombre").addClass("requerido");}else{$("#-snombre").removeClass("requerido");};
          //if($scope.papellido == "" || $scope.papellido == "0" || $scope.papellido == null || $scope.papellido == undefined || $scope.papellido == " "){$scope.camposvalidos = false; $("#-papellido").addClass("requerido");}else{$("#-papellido").removeClass("requerido");};
          // if($scope.sapellido == "" || $scope.sapellido == "0" || $scope.sapellido == null || $scope.sapellido == undefined || $scope.sapellido == " "){$scope.camposvalidos = false; $("#-sapellido").addClass("requerido");}else{$("#-sapellido").removeClass("requerido");};
          //if($scope.nacimiento == "" || $scope.nacimiento == "0" || $scope.nacimiento == null || $scope.nacimiento == undefined || $scope.nacimiento == " "){$scope.camposvalidos = false; $("#-date1").addClass("requerido");}else{$("#-date1").removeClass("requerido");};
          //if($scope.sexo == "" || $scope.sexo == "0" || $scope.sexo == null || $scope.sexo == undefined || $scope.sexo == " "){$scope.camposvalidos = false; $("#-sexo").addClass("requerido");}else{$("#-sexo").removeClass("requerido");};
          //if($scope.estadocivil == "" || $scope.estadocivil == "0" || $scope.estadocivil == null || $scope.estadocivil == undefined || $scope.estadocivil == " "){$scope.camposvalidos = false; $("#-estadocivil").addClass("requerido");}else{$("#-estadocivil").removeClass("requerido");};
          //if($scope.gruposanguineo == "" || $scope.gruposanguineo == "0" || $scope.gruposanguineo == null || $scope.gruposanguineo == undefined || $scope.gruposanguineo == " "){$scope.camposvalidos = false; $("#-gruposanguineo").addClass("requerido");}else{$("#-gruposanguineo").removeClass("requerido");};
          //if($scope.peso == "" || $scope.peso == "0" || $scope.peso == null || $scope.peso == undefined || $scope.peso == " "){$scope.camposvalidos = false; $("#-peso").addClass("requerido");}else{$("#-peso").removeClass("requerido");};
          //if($scope.estatura == "" || $scope.estatura == "0" || $scope.estatura == null || $scope.estatura == undefined || $scope.estatura == " "){$scope.camposvalidos = false;$("#-estatura").addClass("requerido");}else{$("#-estatura").removeClass("requerido");};
          //if($scope.telefono == "" || $scope.telefono == "0" || $scope.telefono == null || $scope.telefono == undefined || $scope.telefono == " "){$scope.camposvalidos = false; $("#-telefono").addClass("requerido");}else{$("#-telefono").removeClass("requerido");};
          //if($scope.celular == "" || $scope.celular == "0" || $scope.celular == null || $scope.celular == undefined || $scope.celular == " "){$scope.camposvalidos = false; $("#-celular").addClass("requerido");}else{$("#-celular").removeClass("requerido");};
          // if($scope.correo == "" || $scope.correo == "0" || $scope.correo == null || $scope.correo == undefined || $scope.correo == " "){$scope.camposvalidos = false; $("#-correo").addClass("requerido");}else{$("#-correo").removeClass("requerido");};
          //if($scope.direccion == "" || $scope.direccion == "0" || $scope.direccion == null || $scope.direccion == undefined || $scope.direccion == " "){$scope.camposvalidos = false; $("#-direccion").addClass("requerido");}else{$("#-direccion").removeClass("requerido");};
          //if($scope.barrio == "" || $scope.barrio == "0" || $scope.barrio == null || $scope.barrio == undefined || $scope.barrio == " "){$scope.camposvalidos = false; $("#-barrio").addClass("requerido");}else{$("#-barrio").removeClass("requerido");};
          //if($scope.departamento == "" || $scope.departamento == "0" || $scope.departamento == null || $scope.departamento == undefined || $scope.departamento == " "){$scope.camposvalidos = false; $("#-departamento").addClass("requerido");}else{$("#-departamento").removeClass("requerido");};
          //if($scope.municipio == "" || $scope.municipio == "0" || $scope.municipio == null || $scope.municipio == undefined || $scope.municipio == " "){$scope.municipio = false; $("#-municipio").addClass("requerido");}else{$("#-municipio").removeClass("requerido");};

          if($scope.departamentoe == "" || $scope.departamentoe == "0" || $scope.departamentoe == null || $scope.departamentoe == undefined || $scope.departamentoe == " "){$scope.camposvalidos = false; $("#-departamentoe").addClass("requerido");}else{$("#-departamentoe").removeClass("requerido");};
          if($scope.municipioe == "" || $scope.municipioe == "0" || $scope.municipioe == null || $scope.municipioe == undefined || $scope.municipioe == " "){$scope.camposvalidos = false; $("#-municipioe").addClass("requerido");}else{$("#-municipioe").removeClass("requerido");};
          if($scope.tipocontrato == "" || $scope.tipocontrato == "0" || $scope.tipocontrato == null || $scope.tipocontrato == undefined || $scope.tipocontrato == " "){$scope.camposvalidos = false; $("#-tipocontrato").addClass("requerido");}else{$("#-tipocontrato").removeClass("requerido");};
          if($scope.empleador == "" || $scope.empleador == "0" || $scope.empleador == null || $scope.empleador == undefined || $scope.empleador == " "){$scope.camposvalidos = false; $("#-empleador").addClass("requerido");}else{$("#-empleador").removeClass("requerido");};
          if($scope.unidadestrategica == "" || $scope.unidadestrategica == "-1" || $scope.unidadestrategica == null || $scope.unidadestrategica == undefined || $scope.unidadestrategica == " "){$scope.camposvalidos = false; $("#-unidadestrategica").addClass("requerido");}else{$("#-unidadestrategica").removeClass("requerido");};
          if($scope.unidadfuncional == "" || $scope.unidadfuncional == "0" || $scope.unidadfuncional == null || $scope.unidadfuncional == undefined || $scope.unidadfuncional == " "){$scope.camposvalidos = false; $("#-unidadfuncional").addClass("requerido");}else{$("#-unidadfuncional").removeClass("requerido");};
          if($scope.cargo == "" || $scope.cargo == "0" || $scope.cargo == null || $scope.cargo == undefined || $scope.cargo == " "){$scope.camposvalidos = false; $("#-cargo").addClass("requerido");}else{$("#-cargo").removeClass("requerido");};
          if($scope.gruposalario == "" || $scope.gruposalario == "0" || $scope.gruposalario == null || $scope.gruposalario == undefined || $scope.gruposalario == " "){$scope.camposvalidos = false; $("#-gruposalario").addClass("requerido");}else{$("#-gruposalario").removeClass("requerido");};
          if($scope.salario == "" || $scope.salario == "0" || $scope.salario == null || $scope.salario == undefined || $scope.salario == " "){$scope.camposvalidos = false; $("#-salario").addClass("requerido");}else{$("#-salario").removeClass("requerido");};
          if($scope.tiporemuneracion == "" || $scope.tiporemuneracion == "0" || $scope.tiporemuneracion == null || $scope.tiporemuneracion == undefined || $scope.tiporemuneracion == " "){$scope.camposvalidos = false; $("#-tiporemuneracion").addClass("requerido");}else{$("#-tiporemuneracion").removeClass("requerido");};
          if($scope.estado == "" || $scope.estado == "0" || $scope.estado == null || $scope.estado == undefined || $scope.estado == " "){$scope.camposvalidos = false; $("#-estado").addClass("requerido");}else{$("#-estado").removeClass("requerido");};

          if($scope.tipocontrato == '1' || $scope.tipocontrato == '4' || $scope.tipocontrato == '5'){
            if($scope.tipocuenta == "" || $scope.tipocuenta == "0" || $scope.tipocuenta == null || $scope.tipocuenta == undefined || $scope.tipocuenta == " "){$scope.camposvalidos = false; $("#-tipocuenta").addClass("requerido");}else{$("#-tipocuenta").removeClass("requerido");};
            if($scope.banco == "" || $scope.banco == "0" || $scope.banco == null || $scope.banco == undefined || $scope.banco == " "){$scope.camposvalidos = false; $("#-banco").addClass("requerido");}else{$("#-banco").removeClass("requerido");};
            if($scope.numerocuenta == "" || $scope.numerocuenta == "0" || $scope.numerocuenta == null || $scope.numerocuenta == undefined || $scope.numerocuenta == " "){$scope.camposvalidos = false; $("#-numerocuenta").addClass("requerido");}else{$("#-numerocuenta").removeClass("requerido");};
          }else{
            $scope.tipocuenta = "";
            $scope.banco = "";
            $scope.numerocuenta = "";
          }
          if($scope.fechaingreso == "" || $scope.fechaingreso == "0" || $scope.fechaingreso == null || $scope.fechaingreso == undefined || $scope.fechaingreso == " "){$scope.camposvalidos = false; $("#-date2").addClass("requerido");}else{$("#-date2").removeClass("requerido");};
          // if($scope.fechaegreso == "" || $scope.fechaegreso == "0" || $scope.fechaegreso == null || $scope.fechaegreso == undefined || $scope.fechaegreso == " "){$scope.fechaegreso = false;};
          //if($scope.nomgruposalario == "" || $scope.nomgruposalario == "0" || $scope.nomgruposalario == null || $scope.nomgruposalario == undefined || $scope.nomgruposalario == " "){$scope.camposvalidos = false; $("#-pnombre").addClass("requerido");}else{$("#-pnombre").removeClass("requerido");};
        break;
      default:
  }
}
}])
