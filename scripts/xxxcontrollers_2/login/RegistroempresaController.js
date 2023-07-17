// <!----------------------------------------
//   Formulario de nuevas empresas 
// ------------------------------------------>
'use strict';
angular.module('GenesisApp')
.controller('RegistroempresaController', ['$scope','$http', 'notification', 'ngDialog', 
 function($scope, $http, notification, ngDialog) {

function formatDate(date) {
  try {
         var month = date.getUTCMonth() + 1;
         date = date.getDate() + "/" + month + "/" + date.getFullYear();
         return date;
         }
  catch(error) {
 // console.log("fecha");
  //return date;
  }
}   
//variables de comienzo
$scope.validarproceso=false;
$scope.mostrarsubida=false;
$scope.tablaarchivos=[{tipodoc:"", numero:"", tipo:"",codigo:"",base:"",achivobase:"",ext:""}];
$scope.habilitarsubir=true;
$scope.mostrarbtnsubida=true;
// $scope.docuemtostotales;
$scope.documentossubidos=1;
$scope.error={
  tidentificacion:false,
  nidentificacion:false,
  razonsocial:false,
  siglas:false,
  ntrabajadores:false,
  primerapellido:false,
  segundoapellido:false,
  primernombre:false,
  segundonombre:false,
  templador:false,
  tipoempresas:false,
  claseaportante:false,
  clasificacion:false,
  mostrarmodalbusqueda:false,
  pago:false,
  ciudadpagos:false,
  nomsede:false,
  dirprincipal:false,
  barprincipal:false,
  munprincipal:false,
  telprincipal:false,
  depaprincipal:false,
  sitioweb:false,
  email:false,
  nomrepresentante:false,
  tdrepresentante:false,
  drepresentante:false,
  fnrepresentante:false,
  correorepresentante:false,
  nomcargo:false,
  telcargo:false,
  celcargo:false,
  fncargo:false,
  cargo:false,
  emailcargo:false,
  vigencia:false
};
$scope.formulario={
  tidentificacion:"",
  nidentificacion:"",
  razonsocial:"",
  siglas:"",
  ntrabajadores:"",
  primerapellido:"",
  segundoapellido:"",
  primernombre:"",
  segundonombre:"",
  templador:"",
  tipoempresas:"",
  claseaportante:"",
  clasificacion:"",
  actividad:"",
  pago:"",
  ciudadpagos:"",
  dirprincipal:"",
  barprincipal:"",
  munprincipal:"",
  telprincipal:"",
  depaprincipal:"",
  nomsede:"",
  sitioweb:"",
  email:"",
  nomrepresentante:"",
  tdrepresentante:"",
  drepresentante:"",
  fnrepresentante:"",
  correorepresentante:"",
  nomcargo:"",
  telcargo:"",
  celcargo:"",
  fncargo:"",
  cargo:"",
  emailcargo:"",
  vigencia:""
};
//CARGAR DEPARTAMENTO
$http({
         method:'POST',
         url:"php/funclistas.php",
         data: {function: 'cargaDepartamentos'}
       }).then(function(response){
         $scope.Departamentos = response.data;
});
//CARGAR MUNICIPIO
$scope.filterMunicipio = function(){
  var combo = document.getElementById("depaprincipal");
  var selected = combo.options[combo.selectedIndex].text;
  $scope.departementonombre=selected;
   // console.log(selected);
         $http({
            method:'POST',
            url:"php/funclistas.php",
            data: {function: 'cargaMunicipios', depa:$scope.formulario.depaprincipal}
         }).then(function(response){
            $scope.municipio = "";
            $scope.Municipios = response.data;
            $scope.formulario.munprincipal="";
             }); 
}
notification.getNotification('warning','Los campos marcados con (*) <br> son obligatorios.','Notificacion');
//FUNCION INICIAL
function letsWaitALittle() {
  $scope.setTab(1);
  //inicia por defecto los select
  //$scope.formulario.tidentificacion="";
  $scope.templador="";
  $scope.tipoempresas="";
  $scope.clasificacion="";
  $scope.pago="";
  $scope.claseaportante="";
  $scope.removeItem(0);
}
setTimeout(letsWaitALittle, 0);
 $scope.personanatural=false;
//FUNCIONAMIENMTO DE LAS TAB
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

    $scope.Title = "Información del Empleador";
    break;
    case 2:
    $(".tabII").addClass("tabactiva");
    $scope.Title = "2";

    break;
    case 3:
    $(".tabIII").addClass("tabactiva");
    $scope.Title = "3";
        // $scope.rankingpremiun();
        break;
        case 4:
        $(".tabIV").addClass("tabactiva");
        $scope.Title = "4";
        //$scope.listarresumen();
          $scope.mostrarbtnsubida=true;
          $scope.documentossubidos=$scope.tablaarchivos.length;
        break;
        case 5:
        $(".tabV").addClass("tabactiva");
        $scope.Title = "5";
        //alert($scope.templadornombre);
        //$scope.listarresumen();
        break;
        default:

      }
}
    //contenido
$scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
}
//activarlo apenas se cargue el formulario
$scope.setTab(1);
//validar Tiempo real del formulario
$( document ).ready(function() {
  $scope.validarcampo = function(texto){
    if(texto=='' || texto==undefined){
      $(".validarMensaje").parent().addClass('active');
    } else{
      $(".validarMensaje").parent().removeClass('active');
    }
  }
});
//valida que estan escribiendo en un imput
$( document ).ready(function() {
 $scope.escribiendo = function(texto){
    $(".validarMensaje").parent().removeClass('active');
  }
});
//VALIDAR FORMULARIOA
$scope.validarform1=function(){
  $scope.validar=false;
    if($scope.formulario.tidentificacion==null|| $scope.formulario.tidentificacion===undefined || $scope.formulario.tidentificacion==''){
      $scope.error.tidentificacion=true;  
       $scope.validar=true;
    }else if ($scope.formulario.nidentificacion==null|| $scope.formulario.nidentificacion==undefined ||$scope.formulario.nidentificacion=='' ){
     $scope.error.nidentificacion=true;
      $scope.validar=true;
    }
    if ($scope.formulario.nidentificacion.length < 5) {
      notification.getNotification('error', 'El número de identificación  <br> debe ser valido.', 'Notificacion');
      $scope.error.nidentificacion = true;
      $scope.validar = true;
  }
  if( $scope.validar!=true){
   if($scope.formulario.tidentificacion=="C"){
      if($scope.formulario.primerapellido==null|| $scope.formulario.primerapellido==undefined || $scope.formulario.primerapellido==''){
        $scope.error.primerapellido=true;
         $scope.validar=true;
      }else  if($scope.formulario.primernombre==null|| $scope.formulario.primernombre==undefined || $scope.formulario.primernombre==''){
        $scope.error.primernombre=true;
         $scope.validar=true;
     }
   }else if($scope.formulario.tidentificacion=="N"){
     if($scope.formulario.razonsocial==null|| $scope.formulario.razonsocial==undefined || $scope.formulario.razonsocial==''){
        $scope.error.razonsocial=true;
         $scope.validar=true;
      }  
    }
  }
  if( $scope.validar!=true){
     if ($scope.formulario.templador==''|| $scope.formulario.templador==undefined){
        $scope.error.templador=true;
         $scope.validar=true;
    }else if ($scope.formulario.tipoempresas==''|| $scope.formulario.tipoempresas==undefined){
       $scope.error.tipoempresas=true;
         $scope.validar=true;
     }else if ($scope.formulario.claseaportante==''|| $scope.formulario.claseaportante==undefined){
        $scope.error.claseaportante=true;
         $scope.validar=true;
     }else if ($scope.formulario.pago==''|| $scope.formulario.pago==undefined){
        $scope.error.pago=true;
         $scope.validar=true;
     }else if ($scope.formulario.clasificacion==''|| $scope.formulario.clasificacion==undefined){
        $scope.error.clasificacion=true;
         $scope.validar=true; 
    }else if ($scope.formulario.actividad==''|| $scope.formulario.actividad==undefined){
        $scope.error.actividad=true;
         $scope.validar=true; 
    }else if ($scope.formulario.vigencia==''|| $scope.formulario.vigencia==undefined){
       $scope.error.vigencia=true;
         $scope.validar=true;
       }
  }
  if( $scope.validar!=true){
      $scope.setTab(2);
       
  }else{
    
  } 
}
$scope.validarform2=function(){
      if($scope.formulario.ciudadpagos==''|| $scope.formulario.ciudadpagos==undefined){
        $scope.error.ciudadpagos=true;
         notification.getNotification('warning','Los campos marcados con (*) <br> son obligatorios.','Notificacion');
      }else  if($scope.formulario.ntrabajadores==null|| $scope.formulario.ntrabajadores==undefined || $scope.formulario.ntrabajadores==''){
        $scope.error.ntrabajadores=true;
      }else if ($scope.formulario.dirprincipal==''|| $scope.formulario.dirprincipal==undefined){
        $scope.error.dirprincipal=true;
      }else if ($scope.formulario.depaprincipal==''|| $scope.formulario.depaprincipal==undefined){
        $scope.error.depaprincipal=true;
     }else if ($scope.formulario.munprincipal==''|| $scope.formulario.munprincipal==undefined){
        $scope.error.munprincipal=true;
     }else if ($scope.formulario.barprincipal==''|| $scope.formulario.barprincipal==undefined){
        $scope.error.barprincipal=true;
     }else if ($scope.formulario.telprincipal==''|| $scope.formulario.telprincipal==undefined){
        $scope.error.telprincipal=true;
     }else if ($scope.formulario.email==''|| $scope.formulario.email==undefined){
        $scope.error.email=true;
     }else{
       $scope.setTab(3);
       

     }
}
$scope.validarform3=function(){
      if($scope.formulario.nomrepresentante==''|| $scope.formulario.nomrepresentante==undefined){
       $scope.error.nomrepresentante=true;
       notification.getNotification('info','LLenar el formulario antes de seguir','Notificacion');
      }else if($scope.formulario.tdrepresentante==''|| $scope.formulario.tdrepresentante==undefined){
       $scope.error.tdrepresentante=true;
      }else if ($scope.formulario.drepresentante==''|| $scope.formulario.drepresentante==undefined){
       $scope.error.drepresentante=true;
     }else if ($scope.datefnrepresentante==''|| $scope.datefnrepresentante==undefined){
       $scope.error.fnrepresentante=true;
     }else if ($scope.formulario.correorepresentante==''|| $scope.formulario.correorepresentante==undefined){
       $scope.error.correorepresentante=true;
     }else if ($scope.formulario.nomcargo==''|| $scope.formulario.nomcargo==undefined){
       $scope.error.nomcargo=true;
     }else if ($scope.formulario.telcargo==''|| $scope.formulario.telcargo==undefined){
      $scope.error.telcargo=true;
     }else if ($scope.fdatefncargo==''|| $scope.datefncargo==undefined){
       $scope.error.fncargo=true;
     }else if ($scope.formulario.emailcargo==''|| $scope.formulario.emailcargo==undefined){
       $scope.error.emailcargo=true;
     }else if ($scope.formulario.cargo==''|| $scope.formulario.cargo==undefined){
       $scope.error.cargo=true;
     }else{
       $scope.setTab(4);
     }
}
$scope.validarform4=function(){
    $scope.datosComp = $scope.tablaarchivos 
       var length = $scope.datosComp.length;
       var obli=0;
      for (var i = 0; i < length; i++) {
        if($scope.datosComp[i].obligatorio=="S"){
            obli=obli+1;
         }
       }

    if( obli>=$scope.documentosobligatorio){
      $scope.setTab(5);
    }else{
      notification.getNotification('info','Debe subir los documentos necesario antes de enviar lso datos','Notificacion');
    }

}

//funcion de llenado de los select
$scope.chgBusquedaListado = function(listado,keyword){
  if ((keyword === undefined)  || (keyword.length > 3 )){
    $http({
      method:'POST',
      url:"php/movilidad/funcmovilidad.php",
      data: {
        function:'obtenerListados',vp_listado:listado,vp_key:keyword}
    }).then(function(response){
        switch(listado) {
            case 'apoc_tipo_documento':
                $scope.tdocuemnto=response.data;
                break;
            case 'apon_tipo_empleador':
               $scope.tipoemplador=response.data;
                break;
            case 'apoc_clasificacion':
               $scope.clasi=response.data;
                break;
            case 'apon_clase_empleador':
               $scope.claseempleador=response.data;
                break;
            case 'apoc_actividad':
               $scope.actividadempresa=response.data;
                break;
            case 'apon_forma_pago':
               $scope.tipopago=response.data;
                break;
            case 'apon_tipo_persona':
               $scope.tipopersona=response.data;
                break;
            default:
                return;
        }
      });
  }
}
//listado de archivos
$scope.listadoarchivos = function(){

    $http({
      method:'POST',
      url:"php/movilidad/funcmovilidad.php",
      data: {
        function:'obtenerArchivos',tipoempresas:$scope.formulario.tipoempresas,clasificacion:$scope.formulario.clasificacion}
    }).then(function(response){
     // console.log(response.data);
       $scope.tablaarchivos.length = 0;
       $scope.archivos = response.data;

       $scope.datosComp = $scope.archivos 
      var length = $scope.datosComp.length;
      var sum=0;
      var sum2=0;
      for (var i = 0; i < length; i++) {
        if($scope.datosComp[i].obligatorio=="S"){
           sum=sum+1;
         }else{
          sum2=sum2+1;
         }

 
};  


       $scope.docuemtostotales=response.data.length;
       $scope.documentosobligatorio=sum;
    })
  
}
//subir documentos 
$scope.nuevoAdjunto=function(){
    if( $scope.mostrarsubida==true){
     $scope.mostrarsubida=false;
   }else{
     $scope.mostrarsubida=true;
   }
}
$scope.habilitarsubida=function(){
  if($scope.tipoanexo==null){
    notification.getNotification('info','Seleccione una opcion valida','Notificacion');
  }else{
    $scope.habilitarsubir=false;
  }
}
$scope.obtenerBase = function(){
  if($("#adjunto")[0].files[0].size > 7340032){
    //swal('Advertencia','El archivo excede el peso limite (7 MB)','warning')
    notification.getNotification('warning','El archivo excede el peso limite (7 MB)','Notificación');
    $("#adjunto")[0].value = "";
    $scope.archivobase = "";
    $scope.extensionarchivo = "";
  }else{
    if ($("#adjunto")[0].files && $("#adjunto")[0].files[0]) {
      var FR= new FileReader();
      FR.addEventListener("load", function(e) {
        $scope.archivobase = e.target.result;
          var name = $("#adjunto")[0].files[0].name;
          $scope.extensionarchivo= name.split('.').pop();          
      });
      FR.readAsDataURL( $("#adjunto")[0].files[0] );
    }
  }
}

$scope.subirdoc=function(){
  if(($scope.nombreadjunto==undefined)|| ($scope.nombreadjunto==null)||($scope.tipoanexo==undefined)||($scope.tipoanexo==undefined)){
    notification.getNotification('warning','Seleccione primero el nombre y sube el Archivo correspondiente','Notificacion');
  }else{
       $scope.datosComp = $scope.archivos 
      var length = $scope.datosComp.length;
      var obligatorios="";
      var error=false;
      for (var i = 0; i < length; i++) {
        if($scope.datosComp[i].codigo==$scope.tipoanexo){
            obligatorios=$scope.datosComp[i].obligatorio;
         }
       }
      $scope.datosComp = $scope.tablaarchivos 
       var length = $scope.datosComp.length;
      for (var i = 0; i < length; i++) {
        if($scope.datosComp[i].codigo==$scope.tipoanexo){
            error=true;
            swal('Mensaje','El tipo de archivo ya se encuentra subidos  ','error') 
         }
       }
       if(error==false){
           $scope.tablaarchivos.push({obligatorio: obligatorios,tipodoc:$scope.formulario.tidentificacion,numero:$scope.formulario.nidentificacion, codigo:$scope.tipoanexo, tipo:tipoanexo.options[tipoanexo.selectedIndex].innerText, achivobase:$scope.archivobase, ext:$scope.extensionarchivo,  nombre:$scope.nombreadjunto});
           console.log($scope.tablaarchivos)
           $scope.nombreadjunto=null;
           $scope.tipoanexo=null;
           $scope.documentossubidos= $scope.documentossubidos+1;
           $scope.cantidad();
         }

  }
}

$scope.cantidad=function(){
  if( $scope.tablaarchivos.length==$scope.documentosobligatorio){
    $scope.mostrarsubida=false;
    $scope.mostrarbtnsubida=false;
  }else{

   $scope.mostrarbtnsubida=true;
 }
}

$scope.removeItem = function (x) {
  $scope.tablaarchivos.splice(x, 1);
  $scope.documentossubidos= $scope.documentossubidos-1;
  $scope.cantidad();
}
//funciones de mostrar y oculatr partes del formulario
$scope.mostrarnombres=function(dato){
  var datare=dato;
  if(datare=="N"){
      $scope.personanatural=false;
  }else{
        $scope.personanatural=true;
  }
}



//funciones del modal
$scope.mostrarmodalbusqueda=function(texto){
   $scope.dialogNewAfil = ngDialog.open({
   template: 'views/movilidad/modal/modalactividad.html',
   className: 'ngdialog-theme-plain',
   scope: $scope
   });
 $scope.validarkeyword(texto);   
}
$scope.selectDepMunicipio = function (codigo, nombre) {//Funcion para seleccionar el municipio
            $scope.codTemp = codigo;
            $scope.nomTemp = nombre;
            $('#DM' + codigo).addClass('eleacti');
            $('#DM' + codigo).siblings().removeClass('eleacti');
            $scope.nombreactividad =  $scope.nomTemp;
            $scope.formulario.actividad =  $scope.codTemp;
            $scope.selecteditem = true;
}//Fin
$scope.removeSeleccion = function () {//Funcion para remover el municipio
            $('#DM' + $scope.codTemp).removeClass('eleacti');
            $scope.nombreactividad = "";
            $scope.formulario.actividad = "";
            $scope.codTemp = null; $scope.nomTemp = null; $scope.selecteditem = false;
}//Fin
$scope.$watch('results', function () {
            if ($scope.results != undefined) {
                $scope.formulario.actividad ="";
                $scope.selecteditem = false; $scope.codTemp = null; $scope.nomTemp = null;
                $scope.stylesrowsearch = { 'margin-bottom': $scope.results.length == 0 ? '120px' : '70px' };
            } else {
                $scope.selecteditem = false;
            }
});
$scope.aparecer=true;
$scope.validarkeyword=function(keyword){
  var key=keyword+"";
     if(key.length <= 3){
        $scope.aparecer=true;
     }else{
       $scope.aparecer=false;
      $scope.chgBusquedaListado('apoc_actividad',key);
     }
}

//modal dirrecion
$scope.AbrirModalDireccion=function(){
            ngDialog.open({
                template: 'views/movilidad/modal/modalDireccion2.html', 
                className: 'ngdialog-theme-plain',
                controller: 'modaldireccioncontroller',
                 className: 'ngdialog-theme-plain',
                scope: $scope
            }).closePromise.then(function (data) {//Respuesta del valor registrado en modal de direccion                
                if (data.value != '$closeButton' && data.value != '$escape' && data.value != '$document'
                    && data.value.direccionModal != '') {//Valida que la direccion nunca se asigne vacia
                    $scope.formulario.dirprincipal=data.value.direccionModal;
                }
            });
}//Fin

//subir la informacion
$scope.enviradjuntos=function(){
 
  
}

// $scope.validartodo=function(){
//   $scope.validarform1();
//   $scope.validarform2();
//   $scope.validarform3();
//   $scope.validarform4();
// }

$scope.subirInformacion=function(){
  // $scope.validartodo()
  swal({
    title: 'Cargando información...',
    allowEscapeKey: false,
    allowOutsideClick: false
  });
  swal.showLoading();
  var archivosasubir = JSON.stringify($scope.tablaarchivos);
   $http({
        method: 'POST',
         url:"php/movilidad/funcmovilidad.php",
        data: {
        function: 'guardaradjuntosempresasnuevas',
        data: archivosasubir
        }
    }).then(function (response) {
    if (response.data.codigo == 0) { 
      $scope.formulario.fncargo=formatDate($scope.datefncargo);
      $scope.formulario.fnrepresentante=formatDate($scope.datefnrepresentante);
      $scope.formulario.fnvigencia=formatDate($scope.fvigencia);

      var objetoformulario = JSON.stringify($scope.formulario);
      $http({
        method: 'POST',
        url:"php/movilidad/funcmovilidad.php",
        data: {
          function: 'guardarempresasnuevas',
          data: objetoformulario
        }
      }).then(function (response) {
         swal.close();
         if (response.data.codigo == 0) {
            $scope.validarproceso=true;
            swal('Completado','Para terminar el proceso de registro en nuestro sistema, el formulario deberá ser impreso y firmado, deberá ser escaneado y adjuntado en archivo ( PDF) en tiempo no mayor a 48 horas, de lo contrario el registro será anulado y deberá ingresar nuevamente a la plataforma para realizar el trámite.','success');
            $scope.modalClose();
         }else{
            $scope.validarproceso=false;
            swal('Mensaje',response.data.mensaje,'error');
         }
      }); 
    } else {
      swal.close();
      $scope.validarproceso=false;
    }
  });

  
  
  
   //console.log(objetoformulario);
      
   
}
//cerrar formulario
$scope.modalClose = function () {

       $scope.closeThisDialog();
     

}

$scope.aportante_exitente=function(){
  if($scope.formulario.tidentificacion===undefined || $scope.formulario.tidentificacion=="" || $scope.formulario.nidentificacion===undefined || $scope.formulario.nidentificacion=="" ){
     
  }else{
    
        $http({
            method: 'POST',
             url:"php/movilidad/funcmovilidad.php",
            data:  {function:'aportante_exitente',
                        v_tidentificacion:$scope.formulario.tidentificacion,
                        v_nidentificacion:$scope.formulario.nidentificacion}
        }).then(function (response) {
            console.log(response.data.mensaje)
            if(response.data.coderror==0){
                swal('Mensaje',response.data.mensaje,'error')
                $scope.formulario.tidentificacion="";
                $scope.formulario.tidentificacionn="";
                $scope.formulario.nidentificacion="";
            }
      });
  }

}


}
]);