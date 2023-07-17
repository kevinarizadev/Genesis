'use strict';
angular.module('GenesisApp').controller('aprobacionPermisocontroller', ['$scope', '$http', 'ngDialog', 'ausentismoHttp', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller', 'validationParams','$rootScope','$localStorage','$window',
function ($scope, $http, ngDialog, ausentismoHttp, notification, $timeout, $q, upload, communication, $controller, validationParams, $rootScope,$localStorage,$window) {
  var self=this;
  var test = null;
  var x = 1;
  $scope.jsoninit;
  //contenido para filtros jsons
  (function() {
    $scope.autorefresh = true;
    //se defines los select
    $scope.crudGrid = {};
    $scope.crudGrid = $scope.crudGrid;
    $scope.crudGrid.departamentos = [
      { Name: "", Id: "" },
      { Name: "NACIONAL", Id: "1" },
      { Name: "ATLANTICO", Id: "8000" },
      { Name: "BOLIVAR", Id: "13000" },
      { Name: "CESAR", Id: "20000" },
      { Name: "CORDOBA", Id: "23000" },
      { Name: "GUAJIRA", Id: "44000" },
      { Name: "MAGDALENA", Id: "47000" },
      { Name: "META", Id: "50000" },
      { Name: "SUCRE", Id: "70000" }
    ];

    $scope.crudGrid.tipopermiso = [
      { Name: "", Id: "" },
      { Name: "SERVICIOS MÉDICOS", Id: "18" },
      { Name: "DILIGENCIAS PERSONALES", Id: "19" },
      { Name: "CALAMIDAD DOMÉSTICA", Id: "20" },
      { Name: "EJERCICIO DEL SUFRAGIO JURADO", Id: "21" },
      { Name: "EJERCICIO DEL SUFRAGIO VOTANTE", Id: "22" },
      { Name: "ESTUDIOS PERMANENTES", Id: "23" },
      { Name: "EVENTOS DE CAPACITACIÓN EXTERNA", Id: "24" },
      { Name: "MATRIMONIO DEL FUNCIONARIO", Id: "25" },
      { Name: "ASUNTO DE OTRA CLASIFICACIÓN", Id: "26" }
    ];
    $scope.crudGrid.estado = [
      { Name: "", Id: "" },
      { Name: "EN REVISION", Id: "P" },
      { Name: "AUTORIZADO", Id: "A" },
      { Name: "NO AUTORIZADO", Id: "R" }
    ];
    var dat = {prov : 'navb'}
    $.getJSON( "php/obtenersession.php", dat)
    .done(function(respuesta) {
      $scope.sesdata = respuesta;
      $scope.cedula = $scope.sesdata.cedula;
      $scope.nomusu = $scope.sesdata.usu;
      $scope.pasusu = $scope.sesdata.acc;
      communication.cedula = $scope.sesdata.cedula;
      $scope.ubicacion = $scope.sesdata.codmunicipio;
      communication.cedula = $scope.cedula;
      ausentismoHttp.obtenerMunicipio().then(function (response) {
        $scope.crudGrid.municipios = response; //JSON.parse('['+response["0"].Municipios+']')
      }, function (err) {
        notification.getNotification('error', err, 'Notificacion');
      });
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
      console.log("navbar error obteniendo variables");
    });

  }());
  function estado(estado){
    var status;
    switch (estado) {
      case "P":
      status = "EN REVISION";
      break;
      case "A":
      status = "AUTORIZADO";
      break;
      case "R":
      status = "NO AUTORIZADO";
      break;
      default:
      status = " ";
    }
    return status;
  }
  function tipopermiso(tp){
    var permiso_
    switch (tp) {
      case "18":
      permiso_ = "SERVICIOS MÉDICOS"
      break;
      case "19":
      permiso_ = "DILIGENCIAS PERSONALES"
      break;
      case "20":
      permiso_ = "CALAMIDAD DOMÉSTICA"
      break;
      case "21":
      permiso_ = "EJERCICIO DEL SUFRAGIO JURADO"
      break;
      case "22":
      permiso_ = "EJERCICIO DEL SUFRAGIO VOTANTE"
      break;
      case "23":
      permiso_ = "ESTUDIOS PERMANENTES"
      break;
      case "24":
      permiso_ = "EVENTOS DE CAPACITACIÓN EXTERNA"
      break;
      case "25":
      permiso_ = "MATRIMONIO DEL FUNCIONARIO"
      break;
      case "26":
      permiso_ = "ASUNTO DE OTRA CLASIFICACIÓN"
      break;
      default:
      permiso_ = "Permiso"
    }
    return permiso_;
  }
  // grilla, filtros y configuracion
  setTimeout(function () {
    $(function() {
      $("#jsGrid").jsGrid({
        width: "100%",
        filtering: true,
        editing: true,
        paging: true,
        autoload: true,
        selecting: true,
        sorting: true,
        pageIndex: 1,
        pageSize: 6,
        pageButtonCount: 15,
        pagerFormat: "Paginas: {first} {prev} {pages} {next} {last} {pageIndex} - {pageCount}",
        pagePrevText: "<",
        pageNextText: ">",
        pageFirstText: "<<",
        pageLastText: ">>",
        pageNavigatorNextText: "...",
        pageNavigatorPrevText: "...",
        loadIndication: true,
        loadIndicationDelay: 500,
        loadMessage: "Por Favor Actualizar",
        loadShading: true,
        noDataContent: "No hay permisos",

        controller: {
          loadData: function(filter){
            var d = $.Deferred();
            if(test == null){
              $http({
                 method:'GET',
                 url:"php/ausentismo/obtenerpermisos.php",
                 params: {emisor: communication.cedula}
              }).then(function(response){
                if(response.data == "null"){
                  d.resolve();
                  $scope.wa = null;
                }else{
                  $scope.wa = "";
                  //se aplican los filtros a lo que responde el json
                  var a = response.data.Permisos;//JSON.parse(  '{"Permiso":['+response.data["0"]+']}');
                  var b = response.data.Datos["1"].validajefe;
                  var c = response.data.Datos["0"].jefeobservacion;
                  communication.Jefe = c;
                  if(b=="1"){
                    $scope.hab = false;
                  }else{
                    $scope.hab = true;
                  }
                  test = $.grep(a, function(client) {
                    if(a["0"] == null){
                      return(a);
                    }else{
                      return (client.Estado.indexOf(filter.Estado) > -1 || !filter.Estado)
                    }
                  });
                  d.resolve(test);
                  $scope.jsoninit = test;
                }
              })
            }
            else {
              if($scope.wa == null){
                d.resolve();
              }else{
                test = $.grep($scope.jsoninit, function(client) {
                  return (!filter.Radicado || client.Radicado.indexOf(filter.Radicado) > -1)
                  && (!filter.Nombre.toUpperCase() || client.Nombre.indexOf(filter.Nombre.toUpperCase()) > -1)
                  && (!filter.Identificacion  || client.Identificacion.indexOf(filter.Identificacion) > -1)
                  && (!filter.TipodePermiso || client.TipodePermiso === filter.TipodePermiso)
                  && (!filter.Departamento || client.Departamento === filter.Departamento)
                  && (!filter.NombreMunicipio.toUpperCase() || client.NombreMunicipio.indexOf(filter.NombreMunicipio.toUpperCase()) > -1)
                  && (!filter.FechaInicio  || client.FechaInicio.indexOf(filter.FechaInicio) > -1)
                  && (!filter.FechaFin  || client.FechaFin.indexOf(filter.FechaFin) > -1)
                  && (!filter.Adjunto || client.Adjunto.indexOf(filter.Adjunto) > -1)
                  && (!filter.Estado || client.Estado === filter.Estado)
                  && (!filter.Observaciones || client.Observaciones.indexOf(filter.Observaciones) > -1)
                });
                d.resolve(test);
              }
            }
            return d.promise();
          },
          updateItem: function(item) {
            var $row = $("#grid").jsGrid("rowByItem", item);
            var d = $.Deferred();
            if(item.Municipio=="0"){
              var mun = 1;
            }
            else if(Number(item.Municipio<10000)){
              var mun = item.Municipio.substr(1, 4);
            }else{
              var mun = item.Municipio;
            }
            var estatus = estado(item.Estado);
            var permiso = tipopermiso(item.TipodePermiso);
            if(communication.rr == undefined){
              $scope.rr=item.FechaFin;
            }else{
              $scope.rr=communication.rr;
            }
            if($scope.rr==undefined){
              $scope.rr=item.FechaFin;
            }
            if($scope.rr.length==undefined){
              $scope.anofin       = $scope.rr.getFullYear(),
              $scope.mesfin       = $scope.rr.getMonth()+1,
              $scope.diafin       = $scope.rr.getDate(),//Nu
              $scope.horafin      = $scope.rr.getHours(),//N
              $scope.minutofin    = $scope.rr.getMinutes(),
              $scope.segundofin   = $scope.rr.getSeconds(),
              $scope.fechacompleta = $scope.diafin+'/'+$scope.mesfin+'/'+$scope.anofin+' '+$scope.horafin+':'+$scope.minutofin+':'+'00'
              if(communication.observacion==undefined){
                $scope.descrip = ' '+permiso+' - '+estatus+' finalizando '+$scope.fechacompleta;
              }else{
                $scope.descrip = ' '+permiso+' - '+estatus+' finalizando '+$scope.fechacompleta+' - '+ communication.observacion;
              }
            }
            else{
              $scope.anofin    =  Number($scope.rr.substr(6, 4));
              $scope.mesfin    =  Number($scope.rr.substr(3, 2));
              $scope.diafin    =  Number($scope.rr.substr(0, 2));
              $scope.horafin   =  Number($scope.rr.substr(11, 2));
              $scope.minutofin =  Number($scope.rr.substr(14, 2));
              $scope.segundofin=  Number($scope.rr.substr(16, 2));
              if(communication.observacion==undefined){
                $scope.descrip = ' '+permiso +' - '+estatus+' finalizando el '+item.FechaFin;
              }else{
                $scope.descrip = ' '+permiso +' - '+estatus+' finalizando el '+item.FechaFin+' - '+communication.observacion;
              }
            }
            $http({
               method:'GET',
               url:"php/ausentismo/actualizarpermisos.php",
               params: {radicado: item.Radicado,ubicacion:mun,autoriza:$scope.cedula,solicitante:item.Identificacion,problema:$scope.descrip.toUpperCase(),estado:item.Estado.toUpperCase(),fechaterminacion:$scope.rr}
            }).then(
                      function successCallback(response){
                        d.resolve();
                        if(response.data = "1"){
                            notification.getNotification('success', 'Permiso Actualizado!', 'Notificacion');
                        }
                        else{
                          notification.getNotification('error', "Error al actualizar el permiso", 'Notificacion');
                        }
                      },
                      function errorCallback(response) {
                        notification.getNotification('error', "Error al actualizar el permiso", 'Notificacion');
                      }
                   );
            communication.observacion = undefined;
            communication.rr = undefined;
            $scope.rr = undefined;
            document.getElementById('test').addEventListener('click', function() {
              test = null;
              $("#jsGrid").jsGrid();
            }, false);
            return d.promise();
          }
        },
        fields: [
          { name: "Radicado", title: "#Rad", type: "number", editing: false, align: "center", width: 60},
          { name: "Nombre", editing: false, type: "text", align: "center"},
          { name: "Identificacion", title:"Cedula", type: "number", editing: false, align: "center", width: 70},
          { name: "TipodePermiso", title: "Permiso", editing: false, type: "select", items: $scope.crudGrid.tipopermiso, valueField: "Id", textField: "Name"},
          { name: "Departamento", title: "Seccional", type: "select", editing: false, items: $scope.crudGrid.departamentos, valueField: "Id", textField: "Name", width:70},
          { name: "NombreMunicipio", type: "text", editing: false, align: "center" /*items: $scope.crudGrid.municipios, valueField: "Id", textField: "Name"*/ },
          { name: "FechaInicio", title: "Comienzo", editing: false, type: "text", align: "center", width: 70},
          { name: "FechaFin", title: "Terminacion", editing: true, selecting: true, type: "date", align: "center",width: 130,
            itemTemplate: function(value, item) {
              if($scope.hab==false){
                $scope.rr=item.FechaFin;
                return item.FechaFin
              }else{
                var $fecha = $("<p>").text(item.FechaFin).append($("<i>").addClass("icon-stopwatch").css("cursor", "pointer")
                .on("click", function() {
                  var id = item.Radicado;
                  communication.fecha = item.FechaFin;
                  communication.id = id;
                  ngDialog.open({
                    template: 'views/ausentismo/hora.html',
                    controller: 'horacontroller',
                    controllerAs: 'spctrl',
                    scope: $scope
                  });
                }));
                return $("<div>").append($fecha);
              }
            }},
          { name: "Adjunto", filtering: false, selecting: false, editing: false, type: "text", align: "center",width: 60,
            itemTemplate: function(value, item) {
               var $adjunto =  $("<a>").text("ver").css("cursor", "pointer")
                .on("click", function() {
                  communication.Radicado = item.Radicado;
                  communication.Ubicacion = item.Ubicacion_acas;
                  if(communication.Ubicacion=="0"){
                    communication.Ubicacion = 1;
                  }
                  ngDialog.open({
                    template: 'views/ausentismo/soportes.html',
                    controller: 'soportecontroller',
                    controllerAs: 'spctrl',
                    scope: $scope
                  });
                  return item.Radicado;
                });
                return $("<div>").append($adjunto);
              /*if(item.TipodePermiso=="23"){
                var $horario = $("<i>").addClass("icon-calendar").css("cursor", "pointer")
                .on("click", function() {
                  communication.Radicado = item.Radicado;
                  communication.Ubicacion = item.Ubicacion_acas;
                  if(communication.Ubicacion=="0"){
                    communication.Ubicacion = 1;
                  }
                  ngDialog.open({
                    template: 'views/ausentismo/soportes.html',
                    controller: 'soportecontroller',
                    controllerAs: 'spctrl',
                    scope: $scope
                  });
                  return item.Radicado;
                });
                return $("<div>").append($horario);
              }else if(item.TipodePermiso=="21" || item.TipodePermiso=="22"){
                var $adjunto =  $("<a>").text("ver").css("cursor", "pointer")
                .on("click", function() {
                  communication.Radicado = item.Radicado;
                  communication.Ubicacion = item.Ubicacion_acas;
                  if(communication.Ubicacion=="0"){
                    communication.Ubicacion = 1;
                  }
                  ngDialog.open({
                    template: 'views/ausentismo/soportes.html',
                    controller: 'soportecontroller',
                    controllerAs: 'spctrl',
                    scope: $scope
                  });
                  return item.Radicado;
                });
                return $("<div>").append($adjunto);
              }else{
                return $("<a>").text("ver").css({"cursor":"not-allowed","color":"gray"});
              }*/
            }},
          { name: "Estado", type: "select", editing: true, items: $scope.crudGrid.estado, valueField: "Id", textField: "Name"},
          { name: "Observaciones", title:"Notas",filtering: false, editing: false, type: "text", align: "center",width: 50,
            itemTemplate: function(value, item) {
              var $observacion = $("<i>").addClass("icon-doc-text-inv").css("cursor", "pointer")
              .on("click", function() {
                communication.Radicado = item.Radicado;
                communication.Ubicacion = item.Municipio;
                if(communication.Ubicacion=="0"){
                  communication.Ubicacion = 1;
                }
                ngDialog.open({
                  template: 'views/ausentismo/observaciones.html',
                  controller: 'observacionescontroller',
                  controllerAs: 'spctrl',
                  scope: $scope
                });
                return item.Observaciones;
              });
              return $("<div>").append($observacion);
            }
          },
          { type: "control", editButton: true, deleteButton: false}
        ]
    });
  });
}, 1500);
//refresh
document.getElementById('test').addEventListener('click', function() {
  test = null;
  $("#jsGrid").jsGrid();
}, false);
// fin
}]);
