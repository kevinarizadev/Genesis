'use strict';
angular.module('GenesisApp')
.controller('sensorController',['$scope','consultaHTTP','notification','cfpLoadingBar','$http','$window','$filter',
function($scope,consultaHTTP,notification,cfpLoadingBar,$http,$window,$filter) {
  $(function() {
    $(".k-autocomplete, .k-dropdown-wrap, .k-numeric-wrap, .k-picker-wrap, .k-textbox").css({"border-style":"none","border-bottom-style":"dotted"});
    $scope.Seccionales = '0';
    $scope.area = '0';
    $scope.empleado = '0';
    $scope.OcultarTabla=true;
    $scope.Habilitar = true;

    var date = new Date();
    var formattedDate = moment(date).format('YYYY-MM-DD');

    var dat = {prov : 'navb'}
    $.getJSON( "php/obtenersession.php", dat)
    .done(function(respuesta) {
      $scope.cedula = $scope.sesdata.cedula;
    }).fail(function( jqXHR, textStatus, errorThrown ) {
      console.log("navbar error obteniendo variables");
    });

    //Fin datos de sesion como cedula y ubicacion
    $(".datepicker_inicio").kendoDatePicker({
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
    $(".datepicker_final").kendoDatePicker({
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


     $(document).ready(function() {
     $scope.startChange=function() {
        var startDate = start.value(),
        endDate = end.value();

        if (startDate) {
            startDate = new Date(startDate);
            startDate.setDate(startDate.getDate());
            end.min(startDate);
        } else if (endDate) {
            start.max(new Date(endDate));
        } else {
            endDate = new Date();
            start.max(endDate);
            end.min(endDate);
        }
    }

    $scope.endChange=function() {
        var endDate = end.value(),
        startDate = start.value();

        if (endDate) {
            endDate = new Date(endDate);
            endDate.setDate(endDate.getDate());
            start.max(endDate);
        } else if (startDate) {
            end.min(new Date(startDate));
        } else {
            endDate = new Date();
            start.max(endDate);
            end.min(endDate);
        }
    }

    var start = $("#fecha_inicio").kendoDatePicker({
        change:$scope.startChange,
        format: "yyyy-MM-dd",
            culture: "es-MX",
            disableDates: ["su", "sa"],
            max: new Date()
    }).data("kendoDatePicker");

    var end = $("#fecha_final").kendoDatePicker({
        change: $scope.endChange,
        format: "yyyy-MM-dd",
            culture: "es-MX",
            disableDates: ["su", "sa"],
            max: new Date()
    }).data("kendoDatePicker");

    start.max(end.value());
    end.min(start.value());
});

  });
  $scope.Estado='A';
  $scope.Consultar=function(){
    if($scope.Habilitar==true){
      $scope.Habilitar==false;  
      $scope.Estado='A';
      $scope.limpiar();
    } else {
      $scope.Habilitar==true;  
      $scope.Estado='R';
      $scope.limpiar();
    }
  }
  


  $scope.listado = function (){
    $http({
      method:'POST',
      url:"php/sensor/sensor.php",
      data: {function:'lista_sede'}
    }).then(function(response){
      $scope.sede = response.data;
      $scope.Areas = '';
      $scope.Empleados = '';
    })
  }

  $scope.listado();

  $scope.obtenerarea = function(sede){
    $scope.area = '0';
    $scope.empleado = '0';
    $http({
      method:'POST',
      url:"php/sensor/sensor.php",
      data: {function:'lista_area',psede:sede}
    }).then(function(response){
      $scope.Areas = response.data;
      $scope.Empleados = '';
    })
  }

  $scope.obtenerempleado = function(area){    
    $http({
      method:'POST',
      url:"php/sensor/sensor.php",
      data: {function:'lista_empleado',parea:area,estado:$scope.Estado}
    }).then(function(response){
      $scope.Empleados = response.data;  
    })
  }

  $scope.buscarSensor = function(){

    var dt = new Date ($scope.inicio);
    var month = dt.getMonth()+1;
    var day = dt.getDate();
    var year = dt.getFullYear();
    var as=(month+day+year);

    console.log(dt);
    
    $scope.OcultarTabla=false;
    
    var date = new Date();
    var formattedDate = moment(date).format('YYYY-MM-DD');
    if($scope.Seccionales  == '' || $scope.Seccionales  === undefined || $scope.Seccionales  === false){$scope.Seccionales = "SEDE NACIONAL";}
    if($scope.area         == '' || $scope.area         === undefined || $scope.area         === false){$scope.area = "0";}
    if($scope.empleado     == '' || $scope.empleado     === undefined || $scope.empleado     === false){$scope.empleado = "0";}
    if($scope.fecha_inicio == '' || $scope.fecha_inicio === undefined || $scope.fecha_inicio === false){$scope.fecha_inicio = formattedDate;}
    if($scope.fecha_final  == '' || $scope.fecha_final  === undefined || $scope.fecha_final  === false){$scope.fecha_final = formattedDate;}
    
//    $("#tablareporte").dataTable().fnDestroy();
    
    $(document).ready(function() {
      var table= $('#tablareporte').DataTable({
        destroy: true,
        responsive: true,
        dom: 'lBsfrtip',
        buttons: ['csv', 'excel'],
        ajax: {
          url: 'php/sensor/reportecumplimientohorario.php?sede='+$scope.Seccionales+'&area='+$scope.area+"&empleado="+$scope.empleado+"&finicio="+$scope.fecha_inicio+"&ffin="+$scope.fecha_final+'&estado='+$scope.Estado,
          dataSrc: ''
        },
        columns: [
          { data: "orden" },
          { data: "DocumentoEmpleado" },
          { data: "NombreEmpleado" },
          { data: "FechaLaboral" },
          { data: "MarcaInicioManana"},
          { data: "MarcaFinManana"},
          { data: "MarcaInicioTarde"},
          { data: "MarcaFinTarde"},
          { data: "ObsIniManana" },
          { data: "ObsFinManana" },
          { data: "ObsIniTarde" },
          { data: "ObsFinTarde"}
        ],
        language: {
          "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        },
        lengthMenu: [[5, 20, 50,-1], [5, 20, 50,'Todas']],
        order: [[ 1, "asc" ]]
      });
    } );

    swal.close();

  }
  
  $scope.limpiar = function(){    
    $scope.Seccionales = '0';
    $scope.area = '0';
    $scope.empleado = '0';
    $scope.fecha_inicio = null;
    $scope.fecha_final = null;
    $scope.OcultarTabla=true;
    $("#tablareporte").dataTable().fnDestroy();
  }

}]);
