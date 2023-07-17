'use strict';
angular.module('GenesisApp')
.controller('autorizacionController', ['$scope', '$http','$location',
function ($scope, $http,$location) {
  $(document).ready(function(){
      $('.tooltipped').tooltip({delay: 50});
      $('#modaldetalle').modal();
      $('#modaleditardetalle').modal();
  });
  var dat = {prov : 'navb'}
  $.getJSON("php/obtenersession.php", dat)
    .done(function(respuesta) {
      $scope.sesdata = respuesta;
      $scope.nit = $scope.sesdata.nit;
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
      console.log("navbar error obteniendo variables");
    });
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
  $scope.solicitud = {
      tipodocumento:'',
      documento:'',
      nombre:'',
      fecingreso:'',
      origen:'',
      ubipaciente:'',
      tiposervicio:'',
      servicio:'',
      contrato:'',
      cama:'',
      dxprincipal:'',
      nomdxprincipal:'',
      dxsecundario:'',
      nomdxsecundario:'',
      justificacion:'',
      medico:'',
      cargomedico:'',
      codips:'',
      nombreips:'',
      nit:'',
      prioridad:'',
      hijode:'',
      fecsolicitud:''
  }
  $scope.detalle = {
    producto:'',
    nombre:'',
    cantidad:'',
    producto2:'',
    nombre2:'',
    cantidad2:''
  }
  $scope.afiliado = [];
  $scope.encabezado = {
    fecha:'',
    servicio:'',
    coddiag:'',
    nomdiag:'',
    justificacion:''
  }
  $(".paso1").addClass("activebtn-step");
  $('.content-step1').addClass('animated slideInRight');
  $scope.inactivepaso1 = false;
  //Al iniciar
  $http({
      method: 'POST',
      url: "php/autorizaciones/autorizacion/funcautorizacion.php",
      data: {function:'obtenerOrigenes'}
    }).then(function(response) {
      $scope.listOrigenes = response.data;
    })
  $http({
      method: 'POST',
      url: "php/autorizaciones/autorizacion/funcautorizacion.php",
      data: {function:'obtenerUbicacionSolicitud'}
    }).then(function(response) {
      $scope.listUbicaciones = response.data;
    })
  $http({
      method: 'POST',
      url: "php/autorizaciones/autorizacion/funcautorizacion.php",
      data: {function:'obtenerTipoServicio'}
    }).then(function(response) {
      $scope.listTipoServicio = response.data;
    })
  $scope.obtenerServicios =  function(){
    if($scope.solicitud.contrato != ""){
      $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacion/funcautorizacion.php",
          data: {function:'obtenerServicios',contrato:$scope.solicitud.contrato}
        }).then(function(response) {
          $scope.listServicios = response.data;
        })
    }
  }
  $scope.obtenerServiciosedit =  function(){
    if($scope.contrato != "" && $scope.contrato != undefined && $scope.contrato != null){
      $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacion/funcautorizacion.php",
          data: {function:'obtenerServicios',contrato:$scope.contrato}
        }).then(function(response) {
          $scope.listServiciosedit = response.data;
        })
    }
  }
  $scope.obtenerNombre =  function(){
    if($scope.solicitud.tipodocumento != '' &&  $scope.solicitud.documento != ''){
      $scope.switchinit1 = false;
      $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacion/funcautorizacion.php",
          data: {function:'obtenerNombre',documento:$scope.solicitud.documento,
                                      tipodocumento:$scope.solicitud.tipodocumento}
        }).then(function(response) {
          if(response.data["0"].CODIGO == "1"){
            let date = new Date()
            $scope.solicitud.fecsolicitud = new Date(date.getFullYear(), (date.getMonth()), date.getDate(), date.getHours(), date.getMinutes());
            $scope.solicitud.nombre = response.data["0"].NOMBRE;
            $scope.afiliado = response.data["0"];
            $scope.obtenerContratos();
            $scope.inactivefields = false;
          }else{
              $scope.inactivefields = true;
              $scope.solicitud.nombre = '';
              swal('Importante','Afiliado no registra en la base de datos','info');
          }
        })
    }else{
        if(($scope.solicitud.tipodocumento == '' || $scope.solicitud.documento == '' || $scope.solicitud.documento == undefined) && $scope.switchinit1 == false){
          swal('Importante','Complete el tipo y numero de documento','info');
          $scope.inactivefields = true;
          $scope.solicitud.nombre = '';
        }
    }
  }
  $scope.obtenerNombreIps =  function(){
      if($scope.solicitud.codips != '' && $scope.solicitud.codips != undefined){
        $scope.switchinit2 = false;
        $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacion/funcautorizacion.php",
            data: {function:'obtenerNombreIps',ips:$scope.solicitud.codips}
          }).then(function(response) {
            if(response.data.existe == "1"){
              $scope.solicitud.nombreips = response.data.Nombre;
            }else{
              swal('Advertencia','Nit no encontrado','warning');
            }
          })
      }else{
        if(($scope.solicitud.codips == '' || $scope.solicitud.codips == undefined) && $scope.switchinit2 == false){
          swal('Importante','Favor escribir un nit','info');
        }
      }
  }
  $scope.obtenerContratos =  function(){
    $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacion/funcautorizacion.php",
        data: {function:'obtenerContratos',nit:$scope.nit,
                                       regimen:$scope.afiliado.REGIMEN}
      }).then(function(response) {
        $scope.listContratos = response.data;
      })
  }
  $scope.obtenerDiagnostico =  function(tipo){
      if(tipo == 'ppal'){
        var codigo = $scope.solicitud.dxprincipal;
      }else{
        var codigo = $scope.solicitud.dxsecundario;
      }
      if(codigo != '' && codigo != null && codigo != undefined){
        $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacion/funcautorizacion.php",
            data: {function:'obtenerDiagnostico',codigo:codigo,
                                                   sexo:$scope.afiliado.SEXO,
                                                   edad:$scope.afiliado.EDAD}
          }).then(function(response) {
            if(response.data["0"].Codigo  == '0'){
              swal('Importante','Diagnostico Errado','info');
            }else{
              if(tipo == 'ppal'){
                $scope.solicitud.nomdxprincipal = response.data["0"].Nombre;
              }else{
                $scope.solicitud.nomdxsecundario = response.data["0"].Nombre;
              }
            }
          })
      }
  }
  $scope.init =  function(){
    $scope.tabI = false;
    $scope.tabII = false;
    $scope.tabIII = false;
    $scope.tabIV = false;
    $scope.activeI = 'none';
    $scope.activeII = 'none';
    $scope.activeIII = 'none';
    $scope.activeIV = 'none';
  }
  $scope.setTab =  function(opcion){
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
        break;
      default:

    }
  }
  $scope.wizardstep = function(op,ac){
      $('.content-step1').removeClass('animated slideInRight slideOutLeft');
      $('.content-step2').removeClass('animated slideInRight slideOutLeft');
      $('.content-step3').removeClass('animated slideInRight slideOutLeft');
      switch (op) {
        case "paso1":
            $scope.insertarSolicitud();
            // $(".paso1").removeClass("activebtn-step").addClass("donebtn-step");
            // $(".paso2").addClass("activebtn-step");
            // $scope.inactivepaso1 = true;
            // $('.content-step2').addClass('animated slideInRight');
            // $scope.inactivepaso2 = false;
          break;
        case "paso2":
            $(".paso2").removeClass("activebtn-step").addClass("donebtn-step");
            $(".paso3").addClass("activebtn-step");
            $scope.inactivepaso2 = true;
            $scope.inactivepaso3 = false;
            $('.content-step3').addClass('animated slideInRight');
            $scope.obtenerResumen();
          break;
        case "paso3":
          if(ac == "finish"){
              $scope.finalizarSolicitud();
          }else{
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
    return dd+'/'+mm+'/'+yyyy+' '+hh+':'+mi+':00';
  }
  function parsetToday(date) {
    var dd = ('0' + date.getDate()).slice(-2);
    var mm = ('0' + (date.getMonth() + 1)).slice(-2);
    var yyyy = date.getFullYear();
    var hh = date.getHours();
    var mi = date.getMinutes();
    return yyyy+'-'+mm+'-'+dd ;//+' '+hh+':'+mi+':00';
  }
  //TAB I
   $scope.inactivebtnsolicitud = false;
  $scope.insertarSolicitud =  function(){
    if( new Date($scope.solicitud.fecsolicitud) > new Date()){
      swal("Importante","La fecha de ingreso no puede ser superior a la hora actual","info");
    }else {
      swal({
         title: 'Confirmar',
         text: "Esta seguro que desea crear la solicitud?",
         type: 'question',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Confirmar'
      }).then((result) => {
         if (result) {
            $scope.inactivebtnsolicitud = true;
           if($scope.prioridadsw == true){
             $scope.solicitud.prioridad = 'S';
           }else{
             $scope.solicitud.prioridad = 'N';
           };
           if($scope.hijodesw == true){
             $scope.solicitud.hijode = 'S';
           }else{
             $scope.solicitud.hijode = 'N';
           };
           $scope.solicitud.fecingreso = formatDate($scope.solicitud.fecsolicitud);
           $scope.solicitud.nit = $scope.nit;
           if($scope.solicitud.dxsecundario == "" || $scope.solicitud.dxsecundario == null || $scope.solicitud.dxsecundario == undefined){
              $scope.solicitud.dxsecundario = "0";
           }
           var data = JSON.stringify($scope.solicitud);
           $http({
               method: 'POST',
               url: "php/autorizaciones/autorizacion/funcautorizacion.php",
               data: {function:'insertarSoplicitud',data:data}
             }).then(function(response) {
               $scope.resultado = response.data;
               if($scope.resultado.error == '1'){
                 $(".paso1").removeClass("activebtn-step").addClass("donebtn-step");
                 $(".paso2").addClass("activebtn-step");
                 $scope.inactivepaso1 = true;
                 $('.content-step2').addClass('animated slideInRight');
                 $scope.inactivepaso2 = false;
               }else{
                 swal('Importante',$scope.resultado.observacion,'info');
               }
               $scope.inactivebtnsolicitud = false;
             })
         }
      })
    }
  }
  $scope.obtenerProducto =  function(){
    if($scope.detalle.producto != ''){
      $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacion/funcautorizacion.php",
          data: {function:'obtenerProducto',producto:$scope.detalle.producto,
                                            clasificacion:$scope.resultado.servicio,
                                            regimen:$scope.resultado.regimen,
                                            contrato:$scope.resultado.contrato}
        }).then(function(response) {
          if(response.data["0"].CODIGO != "0"){
            $scope.detalle.nombre = response.data["0"].NOMBRE;
          }else{
            swal('Importante',response.data["0"].MENSAJE,'info');
          }
        })
    }
  }
  $scope.validarUbicacionPaciente =  function(ubi){
    if(ubi == "H"){
      $scope.requierecama = true;
    }else{
      $scope.requierecama = false;
    }
  }
  $scope.insertarDetalle =  function(){
    $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacion/funcautorizacion.php",
        data: {function:'insertarDetalle',producto:$scope.detalle.producto,
                                          cantidad:$scope.detalle.cantidad,
                                          numero:$scope.resultado.numero,
                                          ubicacion:$scope.resultado.ubicacion
                                          }
      }).then(function(response) {
        $scope.resultadodetalle = response.data;
        if($scope.resultadodetalle.error == '1'){
          $scope.detalle = {
            producto:'',
            nombre:'',
            cantidad:''
          };
          $scope.obtenerResumen();
          swal('Completado',$scope.resultadodetalle.observacion,'success');
        }else{
          swal('Importante',$scope.resultadodetalle.observacion,'info');
        }
      })
  }
  $scope.eliminarProducto =  function(numero,ubicacion,renglon,tipo){
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
               url: "php/autorizaciones/autorizacion/funcautorizacion.php",
               data: {function:'eliminarProducto',numero:numero,
                                                 ubicacion:ubicacion,
                                                 renglon:renglon}
             }).then(function(response) {
               if(response.data.codigo == "1"){
                 if(tipo == 'edit'){
                   $http({
                       method: 'POST',
                       url: "php/autorizaciones/autorizacion/funcautorizacion.php",
                       data: {function:'obtenerResumen',numero:numero,
                                                     ubicacion:ubicacion}
                     }).then(function(response) {
                       if(response.data["0"].CODIGO == "0"){
                         swal('Advertencia','Error al encontrar detalle','warning');
                       }else{
                         $scope.resumenedit = response.data["0"];
                         $scope.resumeneditcabeza = $scope.resumenedit.CABEZA["0"];
                       }
                     })
                 }else{
                   $scope.obtenerResumen();
                 }
               }else{
                 swal('Advertencia',response.data.mensaje,'warning');
               }
             })
         }
      })

  }
  $scope.obtenerResumen =  function(){
    $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacion/funcautorizacion.php",
        data: {function:'obtenerResumen',numero:$scope.resultado.numero,
                                      ubicacion:$scope.resultado.ubicacion}
      }).then(function(response) {
        if(response.data["0"].CODIGO == "0"){
          swal('Advertencia','Error al encontrar detalle','warning');
        }else{
          $scope.resumen = response.data["0"];
          $scope.resumencabeza = $scope.resumen.CABEZA["0"];
        }
      })
  }
  $scope.finalizarSolicitud =  function(){
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
         tipodocumento:'',
         documento:'',
         nombre:'',
         fecingreso:'',
         origen:'',
         ubipaciente:'',
         tiposervicio:'',
         servicio:'',
         contrato:'',
         cama:'',
         dxprincipal:'',
         nomdxprincipal:'',
         dxsecundario:'',
         nomdxsecundario:'',
         justificacion:'',
         medico:'',
         cargomedico:'',
         codips:'',
         nombreips:'',
         nit:'',
         prioridad:'',
         hijode:'',
         fecsolicitud:''
     }
     $scope.detalle = {
       producto:'',
       nombre:'',
       cantidad:'',
       producto2:'',
       nombre2:'',
       cantidad2:''
     }
     $scope.afiliado = [];
     $scope.encabezado = {
       fecha:'',
       servicio:'',
       coddiag:'',
       nomdiag:'',
       justificacion:''
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
     setTimeout(function () {
       swal({title: "Completado",text: "Solicitud finalizada correctamente",type: "success",timer: 1500});
     }, 10);
  }
  //TAB II
  $scope.obtenerAutorizaciones =  function(estado,codigo){
    swal({title: 'Cargando autorizacion'});
    swal.showLoading();
    $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacion/funcautorizacion.php",
        data: {function: 'obtenerAutorizaciones',codigo:codigo,estado:estado,nit:$scope.nit}
      }).then(function(response) {
         if(estado == 'A'){
           $scope.table.destroy();
           $scope.listAutorizacionesactivas = response.data;
           $scope.table = $('#tableauta').DataTable({
             dom: 'lBsfrtip',
             buttons: [],
             data:$scope.listAutorizacionesactivas,
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
            lengthMenu: [[10, 50,-1], [10, 50,'Todas']],
             order: [[ 0, "desc" ]]
           });
         }
         else{
           if(response.data["0"].Codigo != "0"){
             $scope.listAutorizacionesprocesadas = response.data;
             $scope.inactiveaut2 = false;
           }else{
             $scope.inactiveaut2 = true;
           }

        }
        swal.close();
      })
  }
  $scope.obtenerDiagnosticoEdit =  function(){
    if($scope.encabezado.coddiag != ''){
      $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacion/funcautorizacion.php",
          data: {function:'obtenerDiagnostico',codigo:$scope.encabezado.coddiag,
                                                 sexo:$scope.sexo,
                                                 edad:$scope.edad}
        }).then(function(response) {
          if(response.data["0"].Codigo  == '0'){
            swal('Importante','Diagnostico Errado','info');
          }else{
              $scope.encabezado.nomdiag = response.data["0"].Nombre;
            }
        })
    }
  }
  $scope.editarEncabezado =  function(){
    $scope.encabezado.fecha = new Date($scope.resumeneditcabeza.FECHA_PARSE);
    $scope.encabezado.servicio = $scope.resumeneditcabeza.CODSERVICIO.toString();
    $scope.encabezado.coddiag = $scope.resumeneditcabeza.CODDX;
    $scope.obtenerDiagnosticoEdit();
    $scope.encabezado.justificacion = $scope.resumeneditcabeza.JUSTIFICACION;
    $scope.inactiveeditcabezera = !$scope.inactiveeditcabezera;
  }
  $scope.obtenerProductoEdit =  function(){
    if($scope.detalle.producto2 != ''){
      $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacion/funcautorizacion.php",
          data: {function:'obtenerProducto',producto:$scope.detalle.producto2,
                                            clasificacion:$scope.clasificacion,
                                            regimen:$scope.regimen,
                                            contrato:$scope.contrato}
        }).then(function(response) {
          if(response.data["0"].CODIGO != "0"){
            $scope.detalle.nombre2 = response.data["0"].NOMBRE;
          }else{
            swal('Advertencia',response.data["0"].MENSAJE,'warning');
          }
        })
    }
  }
  $scope.actualizarEncabezado =  function(){
    var date  = formatDate(new Date($scope.encabezado.fecha));
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
              url: "php/autorizaciones/autorizacion/funcautorizacion.php",
              data: {function: 'actualizarEncabezado',numero:$scope.codeditdetalle,
                                                 ubicacion:$scope.ubieditdetalle,
                                             tipodocumento:$scope.tipodocafiliado,
                                                 documento:$scope.docafiliado,
                                                     fecha:date,
                                                  servicio:$scope.encabezado.servicio,
                                               diagnostico:$scope.encabezado.coddiag,
                                             justificacion:$scope.encabezado.justificacion}
            }).then(function(response) {
               if (response.data.error == "1") {
                 $http({
                     method: 'POST',
                     url: "php/autorizaciones/autorizacion/funcautorizacion.php",
                     data: {function:'obtenerResumen',numero:$scope.codeditdetalle,
                                                   ubicacion:$scope.ubieditdetalle}
                   }).then(function(response) {
                     if(response.data["0"].CODIGO == "0"){
                       swal('Advertencia','Error al encontrar detalle','warning');
                     }else{
                       $scope.resumenedit = response.data["0"];
                       $scope.resumeneditcabeza = $scope.resumenedit.CABEZA["0"];
                       $scope.clasificacion = $scope.encabezado.servicio;
                       $scope.inactiveeditcabezera = true;
                       swal({title: "Completado",text: "Datos Actualizados",type: "success",timer: 1500});
                     }
                   })
               } else {
                  swal('Advertencia',response.data.mensaje,'warning')
               }
            })
         }
      })
  }
  $scope.insertarDetalleEdit =  function(){
    $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacion/funcautorizacion.php",
        data: {function:'insertarDetalle',producto:$scope.detalle.producto2,
                                          cantidad:$scope.detalle.cantidad2,
                                          numero:$scope.codeditdetalle,
                                          ubicacion:$scope.ubieditdetalle}
      }).then(function(response) {
        $scope.resultadodetalleedit = response.data;
        if($scope.resultadodetalleedit.error == '1'){
          $scope.detalle.producto2 = '';
          $scope.detalle.nombre2 = '';
          $scope.detalle.cantidad2 = '';
          $http({
              method: 'POST',
              url: "php/autorizaciones/autorizacion/funcautorizacion.php",
              data: {function:'obtenerResumen',numero:$scope.codeditdetalle,
                                            ubicacion:$scope.ubieditdetalle}
            }).then(function(response) {
              if(response.data["0"].CODIGO == "0"){
                swal('Advertencia','Error al encontrar detalle','warning');
              }else{
                $scope.resumenedit = response.data["0"];
                $scope.resumeneditcabeza = $scope.resumenedit.CABEZA["0"];
              }
            })
        }else{
          swal('Importante',$scope.resultadodetalleedit.observacion,'info');
        }
      })
  }
  //TAB III
  $scope.print = function(tipo,data,prestador){
    if(tipo == 'autorizacion')
      window.open('views/autorizaciones/formatoautorizacion2.php?numero='+data,'_blank');
    else
      window.open('views/autorizaciones/formatoautorizacion3.php?numero='+data+'&prestador='+prestador,'_blank');
  }
  $scope.verDetalle =  function(num,ubi,obs){
    $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacion/funcautorizacion.php",
        data: {function:'obtenerResumen',numero:num,
                                      ubicacion:ubi}
      }).then(function(response) {
        if(response.data["0"].CODIGO == "0"){
          swal('Advertencia','Error al encontrar detalle','warning');
        }else{
          $scope.justificacion = obs;
          $scope.resumendetalle = response.data["0"].DETALLE;
          $('#modaldetalle').modal("open");
        }
      })
  }
  $scope.table = $('#tableauta').DataTable({
    dom: 'lBsfrtip',
    buttons: [],
    data:[],
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
    lengthMenu: [[10, 50,-1], [10, 50,'Todas']],
    order: [[ 0, "desc" ]]
  });
  $('#tableauta tbody').on( 'click', 'tr', function () {
      $scope.inactiveeditcabezera = true;
      $scope.resumen = [];
      $scope.resumencabeza = [];
      $scope.detalle.producto2 = '';
      $scope.detalle.nombre2 = '';
      $scope.detalle.cantidad2 = '';
      $scope.clasificacion = $scope.table.row( this ).data().CLASIFICACION;
      $scope.codeditdetalle = $scope.table.row( this ).data().CODIGO;
      $scope.ubieditdetalle = $scope.table.row( this ).data().UBICACION;
      $scope.docafiliado = $scope.table.row( this ).data().DOC;
      $scope.tipodocafiliado = $scope.table.row( this ).data().TIPODOC;
      $scope.sexo = $scope.table.row( this ).data().SEXO;
      $scope.edad = $scope.table.row( this ).data().EDAD;
      $scope.regimen = $scope.table.row( this ).data().REGIMEN;
      $scope.contrato = $scope.table.row( this ).data().CONTRATO;
      $scope.obtenerServiciosedit();
      $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacion/funcautorizacion.php",
          data: {function:'obtenerResumen',numero:$scope.codeditdetalle,
                                        ubicacion:$scope.ubieditdetalle}
        }).then(function(response) {
          if(response.data["0"].CODIGO == "0"){
            swal('Advertencia','Error al encontrar detalle','warning');
          }else{
            $scope.resumenedit = response.data["0"];
            $scope.resumeneditcabeza = $scope.resumenedit.CABEZA["0"];
            $('#modaleditardetalle').modal("open");
          }
        })
  });
  //TAB IV
  $scope.findProducto =  function(find){
    if(find.length >= 4){
      $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacion/funcautorizacion.php",
          data: {function:'findproducto',word:find}
        }).then(function(response) {
          if(response.data["0"].Codigo != "0"){
            $scope.listProductos = response.data;
            $scope.inactivepro = false;
          }else{
            swal("Importante","No se ha encontrado ningun dato","info");
            $scope.inactivepro = true;
          }
        })
    }else{
      if(find.length == 0){
        $scope.inactivepro = true;
      }
    }

  }
}])
