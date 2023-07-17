'use strict';
angular.module('GenesisApp')
.controller('transporteController', ['$scope', '$http',
function ($scope, $http) {

$scope.tickets_lista = [{}];
$scope.a = [];
$scope.tickets_codigo_lista = 'codigo:'+'['+$scope.a+']';
$scope.total = 0;
$scope.registro = false;
$scope.listar = true;
$scope.precio = true;
$scope.select_acas = ' ';
$scope.lectora = true;
$scope.no_mat = false;
$scope.no_jef = false;
$scope.barrios = ' ';
$scope.accion = "Validar";
$scope.jefe = true;
$scope.all = true;
$scope.select_estacion = ' ';

$(document).ready(function(){
    var dat = {prov : 'navb'}
    $.getJSON( "php/obtenersession.php", dat)
    .done(function(respuesta) {
      $scope.sesdata = respuesta;
      $scope.cedula = $scope.sesdata.cedula;
      $scope.refrescar_admint();
      $scope.tabs();
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
      console.log("navbar error obteniendo variables");
    });
    $('#modal12').modal();
    $('#modal13').modal();
    $('#modal14').modal();
    $('#modal15').modal();
    $('#modal16').modal();
    $('.fade').fadeIn("slow");
  });
$http({
    method: 'POST',
    url: "php/transporte/transporte.php",
    data: {function: 'obtener_acast'}
  }).then(function (response) {
    $scope.obtener_acast = response.data;
    if ($scope.obtener_acast[0].CODIGO == 0) {
      $scope.no_mat = false;
    }else {
      $scope.no_mat = true;
      $scope.acas = response.data;
    }
  });
$http({
    method: 'POST',
    url: "php/transporte/transporte.php",
    data: {function: 'obtener_barrios'}
  }).then(function (response) {
    $scope.barrios = response.data;

  });
$http({
    method: 'POST',
    url: "php/transporte/transporte.php",
    data: {function: 'obtener_acast'}
  }).then(function (response) {
    $scope.obtener_acast = response.data;
  })

$scope.estacion = function (cedula, codigo, nombre, ubicacion,precio){
  $scope.ubi = ubicacion;
  $scope.cod = codigo;
  $scope.codigo_MAT = codigo;
  $scope.precios = precio;
  $http({
      method: 'POST',
      url: "php/transporte/transporte.php",
      data: {function: 'estacion'}
    }).then(function (response) {
      $scope.estaciones = response.data;
      $('#modal16').modal('open');
       $scope.codigo_MATT = codigo;
       $scope.ubicacion_MATT = ubicacion;
    })
}

$scope.estado = function(codigo,ubicacion){
  $http({
      method: 'POST',
      url: "php/transporte/transporte.php",
      data: {function: 'CONFIRMAR_ESTADO',
                        numero:codigo,
                        ubicacion:ubicacion}
    }).then(function (response) {
      $scope.valido = response.data.Estado;
      if ($scope.valido == 'false') {
         $("#h"+codigo+ubicacion).show();
         $("#d"+codigo+ubicacion).hide();
      }else{
        $("#d"+codigo+ubicacion).show();
        $("#h"+codigo+ubicacion).hide();
      }
    })
}
$scope.continuar = function (){
  if ($scope.select_estacion == '322222') {
    $scope.consignar();
  }else{
    $scope.alterno();
  }
}
$scope.tabs = function(){
  $http({
    method: 'POST',
    url: "php/transporte/transporte.php",
    data: {function: 'obtener_tabs',
            cedula: $scope.cedula
          }
  }).then(function (response) {
    if(response.data["0"].CODIGO==1){
      $scope.all=false;
      $scope.jefe = false;
      $scope.setTab(4);
    }else if (response.data["0"].CODIGO==0) {
      $scope.all=false;
      $scope.jefe = true;
      $scope.setTab(1);
    }

  });
}
$scope.setTab = function(newTab){
    $scope.tab = newTab;
    $(".tabI").removeClass("tabactiva");
    $(".tabII").removeClass("tabactiva");
    $(".tabIII").removeClass("tabactiva");
    $(".tabIV").removeClass("tabactiva");
    switch (newTab) {
      case 1:
      $(".tabI").addClass("tabactiva");
      $scope.Title = "Registro tickets";
      break;
      case 2:
      $(".tabII").addClass("tabactiva");
      $scope.Title = "Autorización solicitud transporte";
      break;
      case 3:
      $(".tabIII").addClass("tabactiva");
      $scope.Title = "Balance tickets transporte";
      break;
      case 4:
      $(".tabIV").addClass("tabactiva");
      $scope.Title = "Aprobación tickets transporte";
      break;
      default:
    }
  }
$scope.ejecutar = function(cedula_emisor,codigo_acas,nombre, ubicacion_acas, precio){
  swal({
    type: 'error',
    title: 'Oops...',
    text: 'Pendiente por validación'
  })
   $scope.codigo_MAT=codigo_acas;
  }
$scope.consignar = function(cedula_emisor,codigo_acas,nombre, ubicacion_acas, precio){
    $scope.codigo_MAT = codigo_acas;
    $scope.ubicacion =  ubicacion_acas;
    $scope.lectora = true;
    //$scope.precios = precio;
    $('#modal13').modal('open');
    $scope.declarar();
    $scope.focus();
    $scope.accion ="Validar";
  }
$scope.alterno = function(){
  swal({
    text: "Ingrese codigo ticket",
    type: 'question',
    input: 'text',
    inputValue: 0,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result!=0) {
      $scope.result = result;
      $http({
        method:'POST',
        url: "php/transporte/transporte.php",
        data: {function:'alterno',
        codigo : $scope.result,
        ubicacion: $scope.ubi,
        numeroma: $scope.cod,
        valor: 0}
    }).then(function(response){
      $('#modal16').modal('close');
      $scope.refrescar();
    });
  }else {
    swal('Notificación','Ingrese un valor para continuar','error')
  }
})
}
$scope.cerrar = function(codigo_jef , ubicacion_jef){
    $http({
      method:'POST',
      url:"php/transporte/transporte.php",
      data: {function:'rechazar_admint',
      cedula :'RE',
      codigo:codigo_jef,
      ubicacion: ubicacion_jef

    }
  }).then(function(response){
    $scope.refrescar();
  });
  }
$scope.isSet = function(tabNum){
    return $scope.tab === tabNum;
  }
$scope.setTab(1);
$scope.table = $('#listar_ticket').DataTable( {
    dom: 'lBsfrtip',
    buttons: [ { extend: 'copy', text: 'Copiar' }, 'csv', 'excel'],
    ajax: {
      url: 'php/transporte/listarticket.php',
      dataSrc: ''
    },
    columns: [
      { data: "RESPONSABLE" },
      { data: "CODIGO" },
      { data: "VALOR" },
      { data: "AREA" },
      { data: "FECHA" },
      { data: "ESTADO" },
      { data: "BOTON" }
    ],
    language: {
      "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
    },
    "order": [[ 5, "desc" ]],
    lengthMenu: [[10, 30, 50,-1], [10, 30, 50,'Todas']]//,
  } );
$('#listar_ticket tbody').on('click','tr', function () {
    $scope.id = $scope.table.row( this ).data();
    $scope.detail($scope.id.CODIGO,$scope.id.UBICACION);
  });
$scope.detail = function(codigo, ubicacion){
    $http({
      method: 'POST',
      url: "php/transporte/transporte.php",
      data: {function: 'detail_service',
      codigo: codigo,
      ubicacion: ubicacion
    }
  }).then(function (response) {
    console.log(response.data);
    $('#modal15').modal('open');
    $scope.detalles = response.data;
    $scope.responsable = $scope.detalles[0].RESPONSABLE;
    $scope.codigo = $scope.detalles[0].CODIGO;
  });}
$scope.close = function(){
  $('#modal15').modal('close');
}
$scope.refrescar = function(){
  $http({
    method: 'POST',
    url: "php/transporte/transporte.php",
    data: {function: 'obtener_acast'}
  }).then(function (response) {
    $scope.obtener_acast = response.data;
    if ($scope.obtener_acast[0].CODIGO == 0) {
      $scope.no_mat = false;
    }else {
      $scope.no_mat = true;
      $scope.acas = response.data;
    }
  });
}
$scope.refrescar_admint = function(){
  $http({
    method: 'POST',
    url: "php/transporte/transporte.php",
    data: {function: 'obtener_admint',
    cedula:  $scope.cedula}
  }).then(function (response) {
    $scope.obtener_admints = response.data;
    if ($scope.obtener_admints[0].CODIGO == 0) {
      $scope.no_jef = false;
    }else {
      $scope.no_jef = true;
      $scope.obtener_admints = response.data;
    }
  });
}
$scope.refrescar_dt = function(){
  swal({
    title: 'Cargando información de tickets'
  });
  swal.showLoading();
  $scope.table.ajax.reload();
  $scope.table2.ajax.reload();
  swal.close();
}
$scope.listarfunc = function(){
  $('#modal12').modal('open');
  $scope.table.destroy();
  $scope.table = $('#listar_ticket').DataTable( {
    dom: 'lBsfrtip',
    buttons: [ { extend: 'copy', text: 'Copiar' }, 'csv', 'excel'],
    ajax: {
      url: 'php/transporte/listarticket.php',
      dataSrc: ''
    },
    columns: [
      { data: "RESPONSABLE" },
      { data: "CODIGO" },
      { data: "VALOR" },
      { data: "AREA" },
      { data: "FECHA" },
      { data: "ESTADO" },
      { data: "BOTON" }
    ],
    language: {
      "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
    },
    "order": [[ 5, "desc" ]],
    lengthMenu: [[10, 30, 50,-1], [10, 30, 50,'Todas']]//,
  } );

  $('#listar_ticket tbody').on('click','tr', function () {
    $scope.id = $scope.table.row( this ).data();
    $scope.detail($scope.id.CODIGO,$scope.id.UBICACION);
  });


}
$scope.table2 = $('#listar_resumen').DataTable( {
  dom: 'lBsfrtip',
  buttons: [ { extend: 'copy', text: 'Copiar' }, 'csv', 'excel'],
  ajax: {
    url: 'php/transporte/listarresumen.php',
    dataSrc: ''
  },
  columns: [
    { data: "FECHA INGRESO" },
    { data: "CODIGOINICIAL" },
    { data: "CODIGOFINAL" },
    { data: "CANTIDAD" },
    { data: "VALOR" },
    { data: "TOTAL" },
    { data: "RESPONSABLE" }
  ],
  language: {
    "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
  },
  "order": [[ 5, "desc" ]],
  lengthMenu: [[10, 30, 50,-1], [10, 30, 50,'Todas']]//,
} );
$scope.resumenfunc = function(){
  $('#modal14').modal('open');
  $scope.table2.destroy();
  $scope.table2 = $('#listar_resumen').DataTable( {
    dom: 'lBsfrtip',
    buttons: [ { extend: 'copy', text: 'Copiar' }, 'csv', 'excel'],
    ajax: {
      url: 'php/transporte/listarresumen.php',
      dataSrc: ''
    },
    columns: [
      { data: "FECHA INGRESO" },
      { data: "CODIGOINICIAL" },
      { data: "CODIGOFINAL" },
      { data: "CANTIDAD" },
      { data: "VALOR" },
      { data: "TOTAL" },
      { data: "RESPONSABLE" }
    ],
    language: {
      "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
    },
    "order": [[ 5, "desc" ]],
    lengthMenu: [[10, 30, 50,-1], [10, 30, 50,'Todas']]//,
  } );
}
$scope.registrarfunc = function(){
  if ($scope.codigo_inicio!=undefined) {
    $scope.diferencia=($scope.codigo_fin-$scope.codigo_inicio)+1;
    $scope.valor = $scope.valor;
    swal({
      title: 'Confirmar',
      text: "¿Esta seguro que desea crear "+ $scope.diferencia+" Ticket(s)?",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result) {
        $http({
          method: 'POST',
          url: "php/transporte/transporte.php",
          data: {
            function: 'registrar_ticket',
            codigo_inicio: $scope.codigo_inicio,
            codigo_fin: $scope.codigo_fin,
            cedula: $scope.cedula,
            valor: $scope.valor
          }
        }).then(function (response) {
          $scope.respuesta = response.data[0];
          if ($scope.respuesta.error==1) {
            swal('Éxito',$scope.respuesta.observacion,'success')
            $scope.codigo_inicio="";
            $scope.codigo_fin="";

          }else {
            swal('Error',$scope.respuesta.observacion,'error')
            $scope.codigo_inicio="";
            $scope.codigo_fin="";
          }
        });
      }
    })
  }else {
    swal('Campo vacío','Favor completar el campo código','error')
  }
}
$scope.detalle_MAT = function(){
  $http({
    method: 'POST',
    url: "php/transporte/transporte.php",
    data: {
      function: 'detalle_acast',
      codigo: $scope.select_acas
    }
  }).then(function (response) {
    $scope.aca_d = response.data[0];
    $scope.idafiliado = $scope.aca_d.NOMBRE;
    $scope.informacion = $scope.aca_d.DESCRIPCION;
    $scope.ubicacion = $scope.aca_d.UBICACION;
    $scope.focus();
    $scope.tickets_lista = [{"CODIGO":"0","VALOR":"0"}];
    $scope.total = 0;
  });
}
$scope.consulta_codigo = function(){
  //if ( $scope.codigo_ticket.length==10) {
  if ($scope.codigo_ticket.length>6) {
    var str = $scope.codigo_ticket;
    $scope.codigo_ticket = str.substring(0,5);
  }
  $http({
    method: 'POST',
    url: "php/transporte/transporte.php",
    data: {
      function: 'obtener_valor',
      codigo: $scope.codigo_ticket
    }
  }).then(function (response) {
    $scope.datos_tickets = response.data[0];
    console.log($scope.datos_tickets);
    var cont=0;
    if ($scope.datos_tickets.CODIGO != '0'){
      for (var i = 0; i < $scope.tickets_lista.length; i++) {
        if ($scope.datos_tickets.CODIGO == $scope.tickets_lista[i].CODIGO && $scope.tickets_lista[i].CODIGO != undefined) {
          cont = cont +1;
          break;
        }else {
          cont = 0;
        }
      }
      if (cont == 0){
        // var str = $scope.datos_tickets;
        // $scope.datos_tickets = str.replace("<",'');
        $scope.tickets_lista.push($scope.datos_tickets);
        $scope.a.push($scope.datos_tickets.CODIGO);
        $scope.total = Number($scope.datos_tickets.VALOR.replace("$ ","")) + Number($scope.total);
      }else {
        swal('Notificacion','Ticket ya listado','error')
      }
    }

    else {
      // swal('Notificacion','Codigo de ticket no registrado en la base de datos','error')
    }
    $scope.tickets_codigo_lista = '{codigo:'+'['+$scope.a+']}';
    $scope.focus();
  });
  // }
}
$scope.eliminar = function(indice,valor){
  $scope.total = $scope.total - Number(valor.replace("$ ",""));
  $scope.tickets_lista.splice(indice, 1);
  $scope.a.splice(indice, 1);
  $scope.tickets_codigo_lista = 'codigo:'+'['+$scope.a+']';
}
$scope.confirmar = function(){
  $http({
    method: 'POST',
    url: "php/transporte/transporte.php",
    data: {
      function: 'aprobar_tickets',
      valor : $scope.tickets_codigo_lista,
      ubicacion: $scope.ubicacion_MATT ,
      cantidad : $scope.a.length,
      numeroma: $scope.codigo_MATT
    }
  }).then(function (response) {
    $http({
      method: 'POST',
      url: "php/transporte/transporte.php",
      data: {function: 'obtener_acast'}
    }).then(function (response) {
      $scope.acas = response.data;
      $('#modal13').modal('close');
    });
    $scope.focus();
    $scope.declarar();
  });
}
$scope.declarar = function(){
  $scope.tickets_lista = [{}];
  $scope.a = [];
  $scope.tickets_codigo_lista = 'codigo:'+'['+$scope.a+']';
  $scope.total = 0;
}
$scope.aprobar_tickets = function(){
  if ($scope.codigo_MATT != undefined) {
    if ($scope.total != 0) {
      swal({
        title: 'Confirmar',
        text: "¿Aprobar Mesa de ayuda No."+$scope.codigo_MATT+" por un valor de $"+$scope.total+" pesos?",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result) {
          $scope.confirmar();
        }
      })
    }else{
      swal('Notificación','Por favor ingrese al menos un ticket para ser aprobado','error')
    }
  }else {
    swal('Notificación','Por favor seleccionar una Mesa de Ayuda','error')
  }

}
$scope.focus = function(){
  if ($scope.lectora == true) {
    $scope.codigo_ticket ='';
    document.getElementById("input-ticket").focus();
  }else {
    $scope.codigo_ticket ='';
    document.getElementById("input-ticket").focus();
  }

}
$scope.focuson = function(){
  if ($scope.lectora != false) {
    $scope.lectora = false;
  }else{
    $scope.lectora = true;
  }
}
$scope.arreglo = 'codigo:'+'['+$scope.a+']';
var vm = this;
$scope.pietickets =  function(){
  $http({
    method: 'POST',
    url: "php/transporte/transporte.php",
    data: {function: 'consolidado_tickets'}
  }).then(function (response) {
    $scope.activos = response.data[0].ACTIVOS;
    $scope.procesados = response.data[0].PROCESADOS;
    $scope.consolidado = response.data[0].TOTAL;
    $scope.pieresponse = [{"nombre":"ACTIVOS","cantidad":$scope.activos},{"nombre":"PROCESADOS","cantidad":$scope.procesados},{"Total":$scope.consolidado}];
    $scope.tickets = $scope.pieresponse;
    //     response.data;
    //    console.log($scope.tickets);
    var hoy = new Date();

    var pieColors = (function () {
      var colors = ["rgb(26, 46, 99)","rgb(255,0,0)"]
      return colors;
    }());

    $scope.yyyy = hoy.getFullYear();

    vm.hc4 = angular.element('#pietickets').highcharts({
      chart: {
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45
        }
      },

      title: {
        text: 'Total Tickets registrados: '+ Number($scope.tickets["2"].Total)
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          colors: pieColors,
          depth: 45,
          dataLabels: {
            enabled: true,
            format: '<b style="font-size: inherit;">{point.name}: </b> <b><strong style="font-size: large;">{point.y:,.0f}</strong></b>',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            },
            connectorColor: 'silver'
          },
          showInLegend: true
        }
      },
      series: [{
        name: 'tickets',
        data: [
          {name: $scope.tickets["0"].nombre, y: Number($scope.tickets["0"].cantidad)},
          {name: $scope.tickets["1"].nombre, y: Number($scope.tickets["1"].cantidad)}
        ]
      }]
    });


  });
}
$scope.tendencia =  function(){
  $http({
    method:'POST',
    url:"php/transporte/transporte.php",
    data: {function:'obtenerticketshistorico'}
  }).then(function(response){
    $scope.respuesta =response.data;
    // console.log($scope.respuesta);
    $scope.infohistorico = $scope.respuesta;
    $scope.infohistoricototal = $scope.respuesta;
    vm.hc5 = angular.element('#tendencia').highcharts({
      chart: {
        type: 'column',
        options3d: {
          enabled: true,
          alpha: 20,
          beta: 0
        }
      },
      title: {
        text: 'Consolidado ultimos 6 meses Transporte'
      },
      xAxis: {
        categories: [
          $scope.infohistorico[0].FECHAINGRESO
        ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Valor Tickets'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:,.0f} Pesos</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '<spam style="font-size: larger;">${point.y:,.0f}</spam>'
          }
        }
      },
      series: [

        {
          name: 'Presupuesto',
          color: 'rgb(26, 46, 99)',
          data: [
            {
              color: 'rgb(26, 46, 99)',
              y: Number($scope.infohistorico[0].PRESUPUESTO)
            }
            // }, {
            //     color: '#0cf7a9',
            //     y: Number($scope.infohistorico[7].valor)
            // }, {
            //     color: '#0cf7a9',
            //     y: Number($scope.infohistorico[8].valor)
            // }, {
            //     color: '#0cf7a9',
            //     y: Number($scope.infohistorico[9].valor)
            // }, {
            //     color: '#0cf7a9',
            //     y: Number($scope.infohistorico[10].valor)
            // }, {
            //     color: '#ffc107',
            //     y: Number($scope.infohistorico[11].valor)
            // }
          ]
        },
        {
          name: 'Gasto',
          color: 'rgb(255,0,0)',
          data: [
            {
              color: 'rgb(255,0,0)',
              y: Number($scope.infohistorico[0].GASTO)
            }
            // , {
            //     color: '#ea1717',
            //     y: Number($scope.infohistorico[1].valor)
            // }, {
            //     color: '#ea1717',
            //     y: Number($scope.infohistorico[2].valor)
            // }, {
            //     color: '#ea1717',
            //     y: Number($scope.infohistorico[3].valor)
            // }, {
            //     color: '#ea1717',
            //     y: Number($scope.infohistorico[4].valor)
            // }, {
            //     color: '#ffeb3b',
            //     y: Number($scope.infohistorico[5].valor)
            // }
          ]
        }
      ]
    });
  });

}
setInterval(function(){
  $scope.pietickets();
  $scope.tendencia();
}, 60000);
$scope.pietickets();
$scope.tendencia();
$scope.aprobar_jef = function(codigo_jef , ubicacion_jef){
  $http({
    method:'POST',
    url:"php/transporte/transporte.php",
    data: {function:'aprobar_admint',
    cedula :$scope.cedula,
    codigo:codigo_jef,
    ubicacion: ubicacion_jef

  }
}).then(function(response){
  $scope.refrescar_admint();
});
}
$scope.rechazar_jef = function(codigo_jef , ubicacion_jef){
  $http({
    method:'POST',
    url:"php/transporte/transporte.php",
    data: {function:'rechazar_admint',
    cedula :'RE',
    codigo:codigo_jef,
    ubicacion: ubicacion_jef

  }
}).then(function(response){
  $scope.refrescar_admint();
});
}

}])
