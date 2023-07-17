'use strict';
angular.module('GenesisApp')
.controller('listaChequeocontroller', ['$scope', '$http', 'ngDialog', 'inventarioHttp','notification', '$timeout', '$q', 'communication', '$controller', '$rootScope',
function ($scope, $http, ngDialog, inventarioHttp, notification, $timeout, $q, communication, $controller, $rootScope) {
    //Declaracion de variables globales
    //variables para el formulario de la vista
    $scope.inactive9 = true;
    $scope.observacionL = ""; //textarea de observacion
    $scope.obligatorioL = ""; //input de obligatoriedad
    $scope.existenciaL  ="0"; //select de existencia del insumo preguntado en el wizard
    $scope.estadoL      = "0"; //select del estado de la existenciaL
    //Fin variables para el formulario de la vista

    //variables de control
    $scope.cont = 1;
    $scope.CantidadPreguntasC  = 0; //cantidad de preguntas en el controlador de 0 a su cantidad - 1
    $scope.NumeroPregunta      = 1; //valor de cada pregunta mostrada en el wizard de la vista
    $scope.CantidadPreguntasV  = 0; //cantidad de preguntas en la vista de 1 a su cantidad total
    $scope.InventarioGenerado  = 0; //confirmacion de cada insercion del detalle de inventario
    $scope.item                = " "; // arreglo temporal que obtiene toda la informacion pregunta a pregunta

    $scope.mostrarAcas = true;
    $scope.NumAcas = "";
    //Fin variables variables de control

    //variables del JSON
    $scope.ArrayInventario    = ""; //arreglo que guarda los datos pregunta a pregunta
    $scope.JsonInventario     = ""; //Json que guarda el ArrayInventario
    communication.resumen     = undefined; // variable global que va hasta la vista del modificar desde el resumen
    communication.inventario  = undefined; // variable global que va hasta la vista del modificar desde el resumen
    //Fin variables del JSON

    //variables para mostrar u ocultar
    $scope.inactive0 = false; //card de filtros
    $scope.inactive1 = true;  //card del wizard
    $scope.inactive2 = true;  //boton de resumen
    $scope.inactive3 = true;  //card del resumen
    $scope.inactive4 = false; //boton de siguiente
    $scope.inactive5 = false; //informacion de la card del wizard al terminar de contestar
    $scope.inactive6 = true;  //subir soporte
    $scope.inactive7 = true;  //mensaje de encuenta terminada
    $scope.inactive8 = true; // validar abjunto
    //Fin variables para mostrar u ocultar

    //variables para construccion del JSON
    $scope.id                 = ""; // id de la pregunta
    $scope.Area               = "0";
    $scope.CodListaInventario = "0";//codigo de la lista que vamos a llenar por area ejemplo TI sirve como variable para la insercion del cabeza inventario
    //Fin variables para construccion del JSON
    //Fin Declaracion de variables globales
//$scope.inactive9 = false
    //datos de sesion como cedula y ubicacion
    var dat = {prov : 'navb'}
    $.getJSON( "php/obtenersession.php", dat)
    .done(function(respuesta) {
      $scope.sesdata = respuesta;
      $scope.cedula = $scope.sesdata.cedula;
      communication.cedula = $scope.sesdata.cedula;
      $scope.ubicacion = $scope.sesdata.codmunicipio;
      communication.cedula = $scope.cedula;
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
      console.log("navbar error obteniendo variables");
    });
    //Fin datos de sesion como cedula y ubicacion


      $http({
        method:'POST',
        url:"php/inventario/obtenermunicipios.php",
        data: {function:'obtener_municipios'}
      }).then(function(response){
          $scope.ubicaciones = response.data;
      })

    var inputs = document.querySelectorAll( '.inputfile' );
    Array.prototype.forEach.call( inputs, function( input ){
      var label	 = input.nextElementSibling,
        labelVal = label.innerHTML;

      input.addEventListener( 'change', function( e )
      {
        var fileName = '';
        if( this.files && this.files.length > 1 )
          fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
        else
          fileName = e.target.value.split( '\\' ).pop();

        if( fileName )
          label.querySelector( 'span' ).innerHTML = fileName;
        else
          label.innerHTML = labelVal;
      });

      // Firefox bug fix
      input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
      input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
    });

    //se ejecuta primero para cargar las areas de los periodos que esten activos
    $(document).ready(function(){
      inventarioHttp.obtenerAreasHabilitadas().then(function (response) {
        if(response.data == "0"){
          notification.getNotification('info', 'No hay listas de chequeo disponibles', 'Notificacion');
        }else{
          $scope.Areas = response.data;
          if(response.data["0"].Fecha == "0"){
            $scope.FechaRestante = "hoy";
          }else if(response.data["0"].Fecha == "1"){
            $scope.FechaRestante = "mañana";
          }else{
            $scope.FechaRestante = "en "+response.data["0"].Fecha+" dias";
          }
        }
      })
    });
    //funcion que obtiene las listas de inventario que se van a preguntar en el wizarard
    $scope.obtenerCriterio = function () {
      if((Number($scope.Area) != "0" && Number($scope.Area) != undefined && Number($scope.Area) != "") && ($scope.CodListaInventario  != "0" && $scope.CodListaInventario  != "" && $scope.CodListaInventario  != undefined )){
          inventarioHttp.obtenerCriterio(Number($scope.AreaCod),$scope.CodListaInventario).then(function (response) {
            if(response.data =="0"){
              $scope.inactive1 = true;
              notification.getNotification('warning', 'Filtros incompletos', 'Notificacion');
            }else{
              $scope.inventario = response.data;
              $scope.inactive1 = false;
              $scope.CantidadPreguntasV = response.data.length;
              inventarioHttp.obtenerPendientes(Number($scope.ubicacion), Number($scope.cedula)).then(function (response) {
                if(response.data == "0"){
                  // inventarioHttp.obtenerPeriodoAnterior(Number($scope.ubicacion), $scope.CodListaInventario).then(function (response) {
                  //   if(response.data == "0"){
                  //       notification.getNotification('warning', 'no hay historico anterior', 'Notificacion');
                  //   }else{
                  //     $scope.HistoricoPeriodo = response.data;
                  //     $scope.ControlHistorico = false;
                  //     $scope.ItemList();
                  //
                  //   }
                  // })
                  $scope.ControlHistorico = false;
                }else{
                  $scope.AcasPendientes = response.data;
                  $scope.ControlHistorico = true;
                }
                $scope.ItemList();
              })

            }
          })
        }
        else{
      notification.getNotification('warning', 'Filtros incompletos', 'Notificacion');
     }
    }
    //funcion de que obtiene los estados de la existencia
    $scope.obtenerValoracion = function (y) {
      inventarioHttp.obtenerValoracion($scope.CodListaInventario,Number($scope.AreaCod)).then(function (response) {
        $scope.Valoraciones = response.data;
        $scope.cantidadestados = response.data.length-1;
      })
    }
    //funcion que trae las listas de chequeo en el bdoc por area
    $scope.listasInventarios = function(){
      if($scope.Area != "0"){
        for(var i=0; i<=$scope.Areas.length-1; i++){
          if($scope.Area == $scope.Areas[i].Codigo){
            $scope.codPeriodo = $scope.Areas[i].CodigoPeriodo;
            $scope.AreaCod = $scope.Areas[i].CodArea;
          }
        }
        inventarioHttp.obtenerListasInv(Number($scope.AreaCod),Number($scope.ubicacion), Number($scope.codPeriodo), Number($scope.cedula)).then(function (response) {
          if(response.data == "0"){
            notification.getNotification('info', 'Usted ya registro las encuestas', 'Notificacion');
          }else{
            $scope.listasHabilitadas = response.data;
            $scope.CodListaInventario = "0";
          }
        })
      }
    }
    //funcion que habilita select de estado del criterio
    $scope.activarEstado = function(val){
      var id = val.OrdenC;
      if($scope.cont == 1){
        $scope.obtenerValoracion(val.Codigo);
        $scope.cont = 2;
      }
      if ($("#1-existencia").val()==val.Motivo["0"].Codigo) {
        $("#2-estado").prop('disabled', false);
        $scope.signorequerido = "*";
      }else{
        $("#2-estado").prop('disabled', true);
        $scope.signorequerido = "";
      }
      $scope.estadoL = "0";
    }
    //funcion que se activa con boton siguiente va pregunta en pregunta y armando el json con las respuestas
    $scope.step = function(desicion){
      $scope.continuar = false;
      $scope.existenciaNombre   = $("#1-existencia option:selected").text();
      $scope.estadoNombre       = $("#2-estado option:selected").text();
      if((($scope.existenciaNombre == "SI" && $scope.estadoNombre != "SELECCIONAR")) || ($scope.existenciaNombre == "NO" )){
        if($scope.existenciaNombre == "NO"){
          $scope.continuar = true;
        }
        else {
             if($scope.estadoNombre != "BUENO"){
              if($scope.observacionL != "" && $scope.observacionL != null && $scope.observacionL != undefined && $scope.observacionL.length > 10){
                $scope.continuar = true;
              }
              else{
                notification.getNotification('warning', 'El campo observacion no puede ser vacio y tener mas de 10 caracteres!', 'Notificacion');
                $scope.continuar = false;
              }
            }
            else{
              $scope.continuar = true;
            }
        }
      }
      else{
        notification.getNotification('warning', 'Complete los campos requeridos para continuar!', 'Notificacion');
      }
      if ($scope.continuar == true) {
        $scope.id                 = $scope.inventario[$scope.CantidadPreguntasC].OrdenC;
        $scope.asunto             = $scope.inventario[$scope.CantidadPreguntasC].NombreC;
        $scope.requerido          = $scope.inventario[$scope.CantidadPreguntasC].ObligatorioC;
        $scope.existencia         = $scope.existenciaL;
        $scope.estado             = $scope.estadoL;
        $scope.observacion        = $scope.observacionL;
        $scope.concepto           = $scope.inventario[$scope.CantidadPreguntasC].CodigoC;
        $scope.documento          = $scope.inventario[$scope.CantidadPreguntasC].Codigo;
        if($scope.existencia=="1"){
          $scope.iconexistencia = 'icon-check';
        }
        else{
          $scope.iconexistencia = 'icon-check-empty';
          $scope.estadoNombre = 'NO APLICA';
          $scope.estado = 'N';
        }
        $scope.ArrayTemp = JSON.stringify({id: $scope.id, numpregunta: $scope.NumeroPregunta , class: $scope.iconexistencia, criterio: $scope.pregunta, existencia: $scope.existencia,
          concepto: $scope.concepto, documento: $scope.documento, estadocod: $scope.estado, estado: $scope.estadoNombre, observacion: $scope.observacion,
          pregunta: $scope.asunto, existenciaNombre: $scope.existenciaNombre, obligatorio: $scope.requerido, requerido: $scope.obligatorioL});

          if($scope.CantidadPreguntasC<$scope.CantidadPreguntasV-1){
            $scope.ArrayInventario+=$scope.ArrayTemp+",";
            if($scope.NumeroPregunta < $scope.CantidadPreguntasV){
              $scope.NumeroPregunta  = $scope.NumeroPregunta +1;
            }
            $scope.CantidadPreguntasC = $scope.CantidadPreguntasC+1;
          }else{
            $scope.ArrayInventario+=$scope.ArrayTemp;
            $scope.CantidadPreguntasC = $scope.CantidadPreguntasC+1;
          }
          if($scope.CantidadPreguntasC==$scope.CantidadPreguntasV){
             var arr = JSON.parse('['+$scope.ArrayInventario+']');
            if(arr[0].existenciaNombre == 'SI' && arr[0].estadocod == 'B' && arr[9].existenciaNombre == 'SI' && arr[9].estadocod == 'B' && arr[11].existenciaNombre == 'SI' && arr[11].estadocod == 'B'){
              $scope.inactive2 = true;
              $scope.inactive4 = true;
              $scope.inactive5 = true;
              $scope.inactive6 = false;
              $scope.inactive8 = false;
              $scope.necesitaadjunto = true;
             }else{
              $scope.inactive7 = false;
              $scope.inactive2 = false;
              $scope.inactive6 = true;
              $scope.inactive4 = true;
              $scope.inactive8 = true;
              $scope.inactive5 = true;
              $scope.necesitaadjunto = false;
             }
          }else{
            $scope.inactive3=true;
            $scope.inactive2=true;
          }
          $scope.iconexistencia = "";
          $scope.estadoNombre   = "";
          $scope.existencia     = "";
          $scope.estado         = "";
          $scope.observacion    = "";
          $scope.estadoL        = "0";
          $scope.observacionL   = "";
          $scope.asunto         = "";
          $scope.ItemList();
        }
      }
    //funcion que toma criterio a criterio para ser mostrado en la vista
    $scope.ItemList = function(){
      // $("#1"+$scope.id).val("");
      $scope.obtenerValoracion();
      // $("#3"+$scope.id).val("");
      $scope.item = $scope.inventario[$scope.CantidadPreguntasC];
      $scope.pregunta = $scope.inventario[$scope.CantidadPreguntasC].NombreC;
      $scope.id = $scope.inventario[$scope.CantidadPreguntasC].OrdenC;
      if($scope.inventario[$scope.CantidadPreguntasC].ObligatorioC == "S"){
        $scope.obligatorioL = "REQUERIDO";
      }else{
        $scope.obligatorioL = "NO REQUERIDO";
      }
      if($scope.ControlHistorico == true){
        $scope.acasEncontrado = false;
        $scope.mostrarAcas = true;
        $scope.NumAcas = "";
        for(var i=0; i<=$scope.AcasPendientes.length-1; i++){
          if($scope.inventario[$scope.CantidadPreguntasC].CodigoC == $scope.AcasPendientes[i].Concepto){
            $scope.mostrarAcas = false;
            $scope.NumAcas = $scope.AcasPendientes[i].Numero;
            $scope.acasEncontrado = true;
            $scope.existenciaLtemp =  $scope.AcasPendientes[i].Motivo;
            $scope.estadoLtemp =  $scope.AcasPendientes[i].Status;
            $("#1-existencia").prop('disabled', true);
            $("#2-estado").prop('disabled', true);
            $("#3-observacion").prop('disabled', true);
          }
        }
        if($scope.acasEncontrado == true){

          setTimeout(function () {
            $scope.precargue();
          }, 600);
        }else{
          $(".wizard").prop('disabled', false);
          // $(".wizard2").prop('disabled', false);
          $(".wizard3").prop('disabled', false);
          $scope.existenciaL = "0";
        }
      }
    }
    // setTimeout(function () {
    $scope.precargue = function(){
      $scope.existenciaL =  $scope.existenciaLtemp;
      $scope.estadoL =  $scope.estadoLtemp;
      $(".wizard").val($scope.existenciaL);
    }
    // }, 6000);
    //funcion que hace el reinicio del inventario al momento de cancelarlo desde el resumen o al guardar existosamente el inventario para empezar otro
    $scope.cancelarInventario = function(){
      //Declaracion de variables globales
      //variables para el formulario de la vista
      $scope.observacionL = ""; //textarea de observacion
      $scope.obligatorioL = ""; //input de obligatoriedad
      $scope.existenciaL  ="0"; //select de existencia del insumo preguntado en el wizard
      $scope.estadoL      = "0"; //select del estado de la existenciaL
      //Fin variables para el formulario de la vista

      //variables de control
      $scope.cont = 1;
      $scope.CantidadPreguntasC  = 0; //cantidad de preguntas en el controlador de 0 a su cantidad - 1
      $scope.NumeroPregunta      = 1; //valor de cada pregunta mostrada en el wizard de la vista
      $scope.CantidadPreguntasV  = 0; //cantidad de preguntas en la vista de 1 a su cantidad total
      $scope.InventarioGenerado  = 0; //confirmacion de cada insercion del detalle de inventario
      $scope.item                = " "; // arreglo temporal que obtiene toda la informacion pregunta a pregunta

      $scope.mostrarAcas = true;
      $scope.NumAcas = "";
      //Fin variables variables de control

      //variables del JSON
      $scope.ArrayInventario    = ""; //arreglo que guarda los datos pregunta a pregunta
      $scope.JsonInventario     = ""; //Json que guarda el ArrayInventario
      communication.resumen     = undefined; // variable global que va hasta la vista del modificar desde el resumen
      communication.inventario  = undefined; // variable global que va hasta la vista del modificar desde el resumen
      //Fin variables del JSON

      //variables para mostrar u ocultar
      $scope.inactive0 = false; //card de filtros
      $scope.inactive1 = true;  //card del wizard
      $scope.inactive2 = true;  //boton de resumen
      $scope.inactive3 = true;  //card del resumen
      $scope.inactive4 = false; //boton de siguiente
      $scope.inactive5 = false; //informacion de la card del wizard al terminar de contestar
      $scope.inactive6 = true;  //mensaje de encuenta terminada
      //Fin variables para mostrar u ocultar

      //variables para construccion del JSON
      $scope.id                 = ""; // id de la pregunta
      $scope.Area               = "0";
      $scope.CodListaInventario = "0";//codigo de la lista que vamos a llenar por area ejemplo TI sirve como variable para la insercion del cabeza inventario
      //Fin variables para construccion del JSON
      $scope.listasHabilitadas= undefined;
      //Fin Declaracion de variables globales
    }
    //funcion que oculta la infromacion para sollo mostrar la card del resumen de lo que se digita en el wizard
    $scope.resumen = function(){
      $scope.inactive3 = false;
      $scope.inactive0 = true;
      $scope.inactive1 = true;

      $scope.JsonInventario    = JSON.parse('['+$scope.ArrayInventario+']');
      communication.resumen    = $scope.JsonInventario;
      if($scope.ControlHistorico == true){
        setTimeout(function () {
          for(var i=0; i<=$scope.AcasPendientes.length-1; i++){
            for(var j=0; j<=$scope.inventario.length-1; j++){
              if($scope.inventario[j].CodigoC == $scope.AcasPendientes[i].Concepto){
                $("#edit-"+j).css("display", "none");
              }
            }
          }
        }, 10);
      }
    }
    //funcion que activa el modal de edicion en caso de corregir un criterio de la lista desde el resumen
    $scope.openModal = function(id,numpregunta,criterio,estado,estadocod,existencia,observacion,requerido){
      //communication.idcriterio = idcriterio;
      $scope.temp_id = id;
      $scope.temp_criterio = criterio;
      $scope.temp_numpregunta = numpregunta;
      $scope.temp_estado = estado;
      $scope.temp_estadocod = estadocod;
      $scope.temp_existencia = existencia;
      $scope.temp_observacion = observacion;
      $scope.temp_requerido = requerido;
      $scope.temp_inventario = $scope.inventario;
      $scope.temp_estatus = $scope.Valoraciones;
      ngDialog.open({
        template    : 'views/inventario/modificarcriterio.html',
        controller  : 'modificarcriterioController',
        controllerAs: 'spctrl',
        scope       : $scope
      });
    }

    $rootScope.$on('ngDialog.closed', function (e, $dialog) {
      $scope.inactive3 = false;
      $scope.inactive0 = true;
      $scope.inactive1 = true;
      $scope.JsonInventario = communication.resumen;
      communication.resumen    = $scope.JsonInventario;
      communication.inventario = $scope.inventario;
    });

    $scope.validaradjunto = function(){
      if( document.getElementById("file-6").files.length == 0 ){
      		notification.getNotification('warning', 'Debe cargar un soporte!', 'Notificacion')
          $scope.inactive7 = true;
          $scope.inactive2 = true;
          $scope.inactive6 = false;
          $scope.inactive8 = false;
          $scope.necesitaadjunto = false;
  	  }
      else{
        $scope.inactive7 = false;
        $scope.inactive2 = false;
        $scope.inactive6 = true;
        $scope.inactive8 = true;
        $scope.necesitaadjunto = true;
      }

    }

    //function que sube el adjunto al ftp
    $scope.subirAdjunto = function(){
          var formData = new FormData($("#formulario")[0]);
          inventarioHttp.uploadFile(formData).then(function (res) {
            if (res == "1") {
              setTimeout(function () {
                inventarioHttp.uploadName($scope.oldname, $scope.Filename + $scope.ext).then(function (res){
                  if(res=="1"){
                    $scope.ressoporte = true;
                  }else{
                    notification.getNotification('error', res, 'Notificacion')
                    notification.getNotification('info', 'Por favor Suba el adjunto nuevamente', 'Notificacion')
                    $scope.ressoporte = false;
                  }
                })
                document.getElementById("formulario").reset() ;
              }, 100);
            }
            else {
              notification.getNotification('error', "Error al subir archivo, Por favor vuelva a cargarlo", 'Notificacion')
              $scope.ressoporte = false;
            }
          });
    }

    //funcion que envia el formulario a guardar
    $scope.enviarInventario = function (){
      $scope.arrayfinal2 = communication.resumen;
      $scope.arrayfinal = JSON.stringify(communication.resumen);
      $scope.arrayfinal = '{"valor":'+$scope.arrayfinal+'}';
      var today = new Date();
      var dd = ('0' + today.getDate()).slice(-2);
      var mm = ('0' + (today.getMonth() + 1)).slice(-2);
      var yyyy = today.getFullYear();
  	  var hora = today.getHours();
  	  var min = today.getMinutes();
  	  var seg = today.getSeconds();
      $scope.oldname = $("#nombreadjunto").text();
      $scope.ext = $scope.oldname.substr($scope.oldname.indexOf("."), 5);
      $scope.Filename = Number($scope.codPeriodo) + "_" + $scope.CodListaInventario +"_"+ $scope.ubicacion +"_CC" + "_" + $scope.cedula + "_" + dd + mm + yyyy + hora + min + seg;
      $scope.rutaadjcompleta = $UPLOAD_FILE_I + dd + mm + yyyy +'/' + $scope.Filename + $scope.ext;
      for(var i=0; i<=$scope.Areas.length-1; i++){
        if($scope.CodListaInventario == $scope.Areas[i].Codigo){
          $scope.codPeriodo = $scope.Areas[i].CodigoPeriodo;
        }
      }
        if($scope.necesitaadjunto == true){
          $scope.subirAdjunto();
        }else{
          $scope.ressoporte = true;
        }
        setTimeout(function () {
            if($scope.ressoporte == true){
              $scope.inactive9 = false;
              inventarioHttp.insertarCabezainventario(1,$scope.ubicacion,$scope.CodListaInventario,Number($scope.codPeriodo),$scope.cedula,$scope.arrayfinal,$scope.rutaadjcompleta,$scope.ubicacion).then(function (response) {
                  $scope.num = response.data.split("-");
                if($scope.num[0] == "1"){
                    $scope.inactive3 = true;
                    $scope.contar = 1;
                    let documento = '';
                    let concepto = '';
                    let existencia = '';
                    let estadocod = '';
                    let obligatorio = '';
                    let obs = '';
                    let pregunta = '';
                    let estado = '';
                    let existencianombre = '';
                    for (var i = 0; i < $scope.arrayfinal2.length; i++) {
                        documento = communication.resumen[i.toString()].documento;
                        concepto = communication.resumen[i.toString()].concepto;
                        existencia = communication.resumen[i.toString()].existencia;
                        estadocod = communication.resumen[i.toString()].estadocod;
                        obligatorio = communication.resumen[i.toString()].obligatorio;
                        obs = communication.resumen[i.toString()].obs;
                        pregunta = communication.resumen[i.toString()].pregunta;
                        estado = communication.resumen[i.toString()].estado;
                        existencianombre = communication.resumen[i.toString()].existenciaNombre;
                        if(obs == undefined){obs = "";}
                        //console.log(documento,concepto,existencia,estadocod,obligatorio,obs,pregunta,estado,existencianombre);
                        $http({
                           method:'POST',
                           url:"php/inventario/insertardetalleinventario.php",
                           data: {ubi:$scope.ubicacion,doc:$scope.CodListaInventario,numero:Number($scope.num[1]),cedula:$scope.cedula,documento:documento,concepto:concepto,existencia:existencia,estadocod:estadocod,obligatorio:obligatorio,obs:obs,pregunta:pregunta,estado:estado,existencianombre:existencianombre}
                        }).then(function(response){
                          if(response.data == "1"){
                            $scope.contar = $scope.contar + 1;
                            if($scope.contar == $scope.arrayfinal2.length){
                              $http({
                                  method:'POST',
                                  url:"php/inventario/procesarDetalleinventario.php",
                                  data: {numero:Number($scope.num[1]),ubi:Number($scope.ubicacion),doc:$scope.CodListaInventario}
                              }).then(function(response){
                                  if(response.data == "1"){
                                     notification.getNotification('success', 'Inventario Registrado', 'Notificacion');
                                     $scope.inactive9 = true;
                                     $scope.cancelarInventario();
                                  }else{
                                     notification.getNotification('error', response.data, 'Notificacion');
                                  }
                              })
                            }
                          }
                        })
                    }
                }else{
                  notification.getNotification('info', 'Inventario No Registrado, Por favor intentelo nuevamente!', 'Notificacion');
                  $scope.inactive9 = true;
                }
              })
            }
            else{
              //variables para mostrar u ocultar
              $scope.inactive0 = false; //card de filtros
              $scope.inactive1 = false;  //card del wizard
              $scope.inactive2 = true;  //boton de resumen
              $scope.inactive3 = true;  //card del resumen
              $scope.inactive4 = true; //boton de siguiente
              $scope.inactive5 = true; //informacion de la card del wizard al terminar de contestar
              $scope.inactive6 = false;  //subir soporte
              $scope.inactive7 = true;  //mensaje de encuenta terminada
              $scope.inactive8 = false; // validar abjunto
            }
        }, 500);
    }
  }])
