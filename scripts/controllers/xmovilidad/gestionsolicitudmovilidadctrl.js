'use strict';
angular.module('GenesisApp')
.controller('gestionsolicitudmovilidadctrl',['$scope','consultaHTTP','notification','$timeout','$rootScope','$http','$window','ngDialog',
   function($scope,consultaHTTP,notification,$timeout,$rootScope,$http,$window,ngDialog) {
      $scope.estado = "A";
   // $scope.solicitudesPendientes = function(){
   //    $scope.panelprocesar = false;
   //    $http({
   //       method: 'POST',
   //       url: "php/movilidad/funcmovilidad.php",
   //       data: {
   //          function: 'solicitudesPendiente'
   //       }
   //    }).then(function (response) {
   //       if (response.data.coderror == "0") {
   //          swal(
   //             'Información',
   //             'Usted no tiene solicitudes pendientes por revisar!',
   //             'info'
   //          )
   //          $scope.zerosolicitudes = true;
   //          $scope.solicitudes = {};
   //       }else{
   //          $scope.solicitudes = response.data;
   //          $scope.zerosolicitudes = false;
   //       }
   //    });
   // }
   //
   $scope.panelprocesar = true;
   $scope.listSolicitudes = $('#tblSolicitudes').DataTable( {
      dom: 'lBsfrtip',
      buttons: [ { extend: 'copy', text: 'Copiar' }, 'csv', 'excel'],
      ajax: {
         url: 'php/movilidad/listsolicitudes.php?estado='+$scope.estado,
         dataSrc: ''
      },
      columns: [
      { data: "solicitud" },
      { data: "documento" },
      { data: "nombre_afiliado" },
      { data: "empresa" },
      { data: "fecha_solicitud" },
      { data: "estado" },
      { data: "pendiente_afiliacion"},
      { data: "comentarios"},
      { data: "motivo_rechazo"},
      { data: "fecha_respuesta"},
      { data: "responsable"}
      ],
      columnDefs: [
      {
         "targets": [7],
         "visible": false
      },
      {
         "targets": [8],
         "visible": false
      },
      {
         "targets": [9],
         "visible": false
      },
      {
         "targets": [10],
         "visible": false
      }
      ],
      language: {
         "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
      },
      lengthMenu: [[5, 10, 20,-1], [5, 10, 20,'Todas']],
      order: [[ 4, "desc" ]]
   } );
   $scope.descargafile = function(ruta){
      $http({
         method: 'POST',
         url: "php/juridica/tutelas/functutelas.php",
         data: {
            function: 'descargaAdjunto',
            ruta: ruta
         }
      }).then(function (response) {
         window.open("temp/"+response.data);
         //window.open("temp/"+response.data);
      });
   }
   $scope.reloadTable = function(){
      if ($scope.estado != "A") {
         $scope.panelprocesar = true;
         $scope.hdeBtnProcesar = true;
      }else{
         $scope.hdeBtnProcesar = false;
      }
      $.ajax({
         type: 'GET',
         url: 'php/movilidad/listsolicitudes.php?estado='+$scope.estado,
         contentType: 'application/json',
         dataType: 'json',
         success: function(response) {
            $scope.table_config =  {columns :[
               { data: "solicitud" },
               { data: "documento" },
               { data: "nombre_afiliado" },
               { data: "empresa" },
               { data: "fecha_solicitud" },
               { data: "estado" }
               ]};
            //var table = $('#tblSolicitudes').DataTable($scope.table_config);
            $scope.listSolicitudes.clear();
            $scope.listSolicitudes.rows.add(response);
            $scope.listSolicitudes.draw();
         }
      });
   }
   $('#tblSolicitudes tbody').on('click', 'tr', function () {
      var data = $scope.listSolicitudes.row( this ).data();
      $scope.gestion = {
         adjunto_enviado: data.adjunto_enviado,
         tipo_doc:data.tipo_doc,
         doc:data.doc,
         newestado:'0',
         showrechazo:false,
         showaprobacion:false,
         motivo_rechazo:data.motivo_rechazo,
         descripcion:data.comentarios,
         codigo:data.solicitud,
         ruta:data.ruta,
         correo_empresa: data.correo_empresa,
         empresa:data.empresa,
         nombreafiliado:data.nombre_afiliado,
         m_estado:data.estado,
         m_fecha_solicitud: data.fecha_solicitud,
         m_fecha_respuesta: data.fecha_respuesta,
         m_adjunto_enviado: data.adjunto_enviado,
         Comentarios:data.comentarios_afiliacion
      }
      if ($scope.estado == "A") {
         $scope.panelprocesar = false;
         if (data.pendiente_acas == "S") {
            $scope.hdeComentarios = false;
            if (data.estado_acas == "A") {
               $scope.mensaje_acas = "Esta solicitud no se puede procesar ya que esta pendiente por revisar por parte del area de afiliación y registro."
               $scope.panelPendienteAcas = false;
               $scope.hdeComentarios = false;
            }else{
               $scope.panelPendienteAcas = true;
            }
         }else{
            $scope.panelPendienteAcas = true;
            $scope.hdeComentarios = false;
         }
      }else{
         ngDialog.open({
            template: 'views/movilidad/modal/modalDetalles.html',
            className: 'ngdialog-theme-plain',
            controller: 'modalDetallesSolMovCtrl',
            scope: $scope
         });
      }
   } );
   $http({
      method: 'POST',
      url: "php/movilidad/funcmovilidad.php",
      data: {
         function: 'listaMotivosRechazo'
      }
   }).then(function (response) {
      $scope.motivos = response.data;
   });
   $scope.changeEstado = function(){
      if ($scope.gestion.newestado == "P") {
         $scope.gestion.showaprobacion = true;
         $scope.gestion.showrechazo = false;
      }else if ($scope.gestion.newestado == "R") {
         $scope.gestion.showaprobacion = false;
         $scope.gestion.showrechazo = true;
      }else{
         $scope.gestion.showaprobacion = false;
         $scope.gestion.showrechazo = false;
      }
   }

   $scope.enviarrespuesta = function(){
      if ($scope.gestion.newestado === null || $scope.gestion.newestado == '0' ) {
         notification.getNotification('info','Seleccione nuevo estado','Información'); return;
      }
      if ($scope.gestion.newestado == "R" && ($scope.gestion.motivorechazo === null || $scope.gestion.motivorechazo == '0')) {
         notification.getNotification('info','Seleccione motivo de rechazo','Información'); return;
      }
      if ($scope.gestion.newestado == "P") {
         if ($scope.gestion.nombrearchivo === undefined || $scope.gestion.nombrearchivo == "") {
            notification.getNotification('info','Adjunte formulario radicado','Información'); return;
         }
      }
      if ($scope.gestion.comentarios === undefined || $scope.gestion.comentarios == "") {
         notification.getNotification('info','Ingrese comentarios','Información'); return;
      }
      //if ($scope.gestion.newestado == "P") {
         var formData = new FormData($("#formRespuesta")[0]);
         $.ajax({
            url: "php/movilidad/adjuntos/uplresemp.php",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false
         }).then(function (response) {
            $scope.gestion.rutares = response;
            var dataGestion = JSON.stringify($scope.gestion);
            $http({
               method: 'POST',
               url: "php/movilidad/funcmovilidad.php",
               data: {
                  function: 'respondeSolicitud',
                  data:dataGestion
               }
            }).then(function (response) {
               if(response.data.coderror == "1"){
                  swal(
                     'Completado',
                     'Registro procesado exitosamente!',
                     'success'
                     )
                  $scope.reloadTable();
                  $scope.gestion={}
                  $scope.panelprocesar = true;
               }
            });
         });
      }
   // $scope.procesarsolicitud = function(tipo_doc,doc,codigo,ruta,empresa,correo_empresa,nombreafiliado){
   //    $scope.panelprocesar = false;
   //    $scope.gestion = {
   //       tipo_doc:tipo_doc,
   //       doc:doc,
   //       newestado:'0',
   //       showrechazo:false,
   //       showaprobacion:false,
   //       motivorechazo:'0',
   //       codigo:codigo,
   //       ruta:ruta,
   //       correo_empresa: correo_empresa,
   //       empresa:empresa,
   //       nombreafiliado:nombreafiliado
   //    }
   // }



}
]);