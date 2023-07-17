'use strict';

angular.module('GenesisApp').controller('negacionserviciosController', ['$scope', '$http', '$filter', 'ngDialog', '$timeout', function ($scope, $http, $filter, ngDialog, $timeout) {

  $(document).ready(function () {
    $('#modaldiagnostico').modal();
    $("#modalips").modal();
    $("#modalservicio").modal();
    $("#modalproducto").modal();
  });

  $scope.inactiveinfouser = true;  
  $scope.inactiveinfousersearh = false;
  $scope.invsolicitudtabI = true;
  $scope.invproductotabI = true;
  $scope.invjustificaciontabI = true;  
  $scope.invfinalizartabI = true;
  $scope.infoafiliadoneg=[];
  $scope.dataNegacion = {   
    numero: 0,
    tipodocumento: '',
    documento: '',
    diagnom1: '',
    diagnom2: '',
    diagcod1: '',
    diagcod2: '',
    ipssolicitante: '',      
    ipscodsolicitante: '',
    ipsasignada: '',
    ipscodasignada: '',
    servicio: '',
    codservicio: '',
    fecsolicitud: '',
    fecsolicitudparseada: '',
    ubicacionpaciente: '',        
    ubicacion: '',
    accion: 'I',
    justificacion:'',
    fundamento:'',
    alternativa:'',
    valornopos : 'N',
    valortipo: 'N',
    altocosto: 'N',
    responsable: 0
  }

  $scope.maxDate = null;

  $scope.listServicios = [
  // {'Codigo': '1', 'Nombre': 'ALBERGUES'}, 
  // {'Codigo':'2','Nombre':'ALIMENTACIÓN'}, 
  // {'Codigo':'3', 'Nombre':'AMBULANCIA - AMBULATORIA'},
  {'Codigo':'4','Nombre':'EXCLUSIONES'}
   // , {'Codigo':'5','Nombre':'INSUMOS-MATERIALES'}, {'Codigo':'6','Nombre':'MEDICAMENTOS'}, 
   // {'Codigo':'7','Nombre':'PROCEDIMIENTOS'},{'Codigo':'8','Nombre':'TRANSPORTE-RUTA'}
   ];
   $scope.justificaciones = [];
   $scope.fundamentos = [];
   $scope.alternativas = []; 
$scope.Obtener_Tipos_Documentos = function () {
        $http({
          method: 'POST',
          url: "php/genesis/funcgenesis.php",
          data: {
            function: 'Obtener_Tipos_Documentos',
            Tipo: 'S'
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.Tipos_Documentos = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
$scope.Obtener_Tipos_Documentos();

   $http({
    method: 'POST',
    url: "php/autorizaciones/autorizacion/funcautorizacion.php",
    data: { function: 'obtenerUbicacionSolicitud' }
  }).then(function (response) {
    $scope.listUbicaciones = response.data;
  })



 //Se valida fecha actual

 var hoy = new Date();
 var dd = hoy.getDate();
  var mm = hoy.getMonth() + 1; //hoy es 0!
  var yyyy = hoy.getFullYear();

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  $scope.maxDate = yyyy + '-' + mm + '-' + dd;
  $scope.titletabI = 'Dx y Servicio';
  $scope.tab = 'N';


  $scope.showJustificacion = true;
  $scope.showFundamento = true;
  $scope.showAlternativa = true;
  function formatDate(date) {
    var dd = ('0' + date.getDate()).slice(-2);
    var mm = ('0' + (date.getMonth() + 1)).slice(-2);
    var yyyy = date.getFullYear();
    var hh = date.getHours();
    var mi = date.getMinutes();
      return dd + '/' + mm + '/' + yyyy; //+' '+hh+':'+mi+':00';
    }

    $scope.busquedaDetalles = function () {
      $scope.busquedaXdetalles = ngDialog.open({
        template: 'views/consultaAfiliados/modalBusquedaDetalles.html',
        className: 'ngdialog-theme-plain',
        controller: 'modalBusquedaxnombres',
        closeByEscape: false,
        closeByDocument: false
      });
      $scope.busquedaXdetalles.closePromise.then(function (response) {
        if (response.value === undefined) { return; }
        if (response.value != "$closeButton") {
          $scope.type = response.value.tipo;
          $scope.id = response.value.documento;          
          $scope.tipodocumentoafiliadoneg  =response.value.tipo;
          $scope.documentoafiliadoneg = response.value.documento;       
          $scope.buscarAfiliado( $scope.type, $scope.id);

        }
      });
    }

    function validate_fecha(fecha) {
      var patron = new RegExp("^(19|20)+([0-9]{2})([-])([0-9]{1,2})([-])([0-9]{1,2})$");
      if (fecha.search(patron) == 0) {
        var values = fecha.split("-");
        if (isValidDate(values[2], values[1], values[0])) {
          return true;
        }
      }
      return false;
    }

    function isValidDate(day, month, year) {
      var dteDate;
      month = month - 1;
      dteDate = new Date(year, month, day);
  //Devuelva true o false...
  return ((day == dteDate.getDate()) && (month == dteDate.getMonth()) && (year == dteDate.getFullYear()));
}

function formatDate(date) {
  var dd = ('0' + date.getDate()).slice(-2);
  var mm = ('0' + (date.getMonth() + 1)).slice(-2);
  var yyyy = date.getFullYear();
  var hh = date.getHours();
  var mi = date.getMinutes();
  return dd + '/' + mm + '/' + yyyy; //+' '+hh+':'+mi+':00';
}

$scope.calcularEdad = function (date, tipo) {
  //var fecha=document.getElementById("user_date").value;
  var fecha = date.split("/").reverse().join("-");
  if (validate_fecha(fecha) == true) {
    // Si la fecha es correcta, calculamos la edad
    var values = fecha.split("-");
    var dia = values[2];
    var mes = values[1];
    var ano = values[0];

    // cogemos los valores actuales
    var fecha_hoy = new Date();
    var ahora_ano = fecha_hoy.getYear();
    var ahora_mes = fecha_hoy.getMonth() + 1;
    var ahora_dia = fecha_hoy.getDate();

    // realizamos el calculo
    var edad = (ahora_ano + 1900) - ano;
    if (ahora_mes < mes) {
      edad--;
    }

    if ((mes == ahora_mes) && (ahora_dia < dia)) {
      edad--;
    }

    if (edad > 1900) {
      edad -= 1900;
    }



    // calculamos los meses
    var meses = 0;
    if (ahora_mes > mes)
      meses = ahora_mes - mes;
    if (ahora_mes < mes)
      meses = 12 - (mes - ahora_mes);
    if (ahora_mes == mes && dia > ahora_dia)
      meses = 11;

    // calculamos los dias
    var dias = 0;
    if (ahora_dia > dia)
      dias = ahora_dia - dia;
    if (ahora_dia < dia) {
      var ultimoDiaMes = new Date(ahora_ano, ahora_mes, 0);
      dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
    }        
    if (edad > 0) {
      $scope.cantidadanosaut = 'años'
      if (edad == 1) {
        $scope.cantidadanosaut = 'años'
      }
      $scope.edadaut = edad;
    } else {
      if (meses > 0) {
       $scope.cantidadanosaut = 'meses'
       if (meses == 1) {
        $scope.cantidadanosaut = 'mes'
      }
      $scope.edadaut = meses;
    } else {
      if (dias > 0) {
        $scope.cantidadanosaut = 'dias'
        if (dias == 1) {
          $scope.cantidadanosaut = 'dia'
        }
        $scope.edadaut = dias;
      }
    }
  }
}

}
$scope.buscarAfiliado = function (tipodocumento, documento) {    
  swal({
    html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
    width: 200,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    animation: false
  });    
  $http({
    method: 'POST',
    url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
    data: { function: 'obtenerafiliados', tipodocumento: tipodocumento, documento: documento }
  }).then(function (response) {
    if (response.data.CODIGO != "0") {    
      setTimeout(function() {
       $scope.infoafiliadoneg = response.data;
       $scope.dataNegacion.tipodocumento=$scope.infoafiliadoneg.TipoDocumento    
       $scope.dataNegacion.documento = $scope.infoafiliadoneg.Documento          
       if ($scope.infoafiliadoneg.EMPLEADOR) {
        $scope.infoafiliadoneg.EMPLEADOR = JSON.parse($scope.infoafiliadoneg.EMPLEADOR);
      }

      $scope.afirownumI = 1;
      if ($scope.infoafiliadoneg.SINIESTRO == 'true') {
        $scope.afirownumI = $scope.afirownumI + 1;
      }
      if ($scope.infoafiliadoneg.TUTELA == 'true') {
        $scope.afirownumI = $scope.afirownumI + 1;
      }

      if ($scope.infoafiliadoneg.PORTABILIDAD == 'S') {
        $scope.afirownumI = $scope.afirownumI + 1;
      }
      if ($scope.infoafiliadoneg.ERROR_50 == 'true') {
        $scope.afirownumI = $scope.afirownumI + 1;
      }

      $scope.calcularEdad($scope.infoafiliadoneg.FechaNacimiento);
      $scope.sexoafitabI = $scope.infoafiliadoneg.SexoCodigo;
      $scope.edadafitabI = $scope.infoafiliadoneg.EdadDias;
      $scope.regimenafitabI = $scope.infoafiliadoneg.CodigoRegimen;
      $scope.invsolicitudtabI = false;
      $scope.productosagregadosneg = [];
      $scope.datosAfiModalNov = $scope.infoafiliadoneg;
      $scope.inactiveinfousersearh = true;
      $scope.inactiveinfouser = false;
      $("#btn-solicitudtabI").removeClass("grey");
    }, 100);
      setTimeout(() => {
        swal.close();
      }, 300);
    } else {
      swal('Importante', response.data.NOMBRE, 'info')
    }

  });

}




$scope.openmodals = function (tipo, opcion) {
  $scope.buscard1 = "";
  $scope.buscard2 = "";
  $scope.buscarpro = "";
  $scope.tipoaut = opcion;
  switch (tipo) {
    case 'diagnostico':
    $scope.inactivebarradiag = true;
    $("#modaldiagnostico").modal("open");
    setTimeout(() => {
      $('#modaldiagnostico #diaginput').focus();
    }, 100);
    break;      
    case 'ips':
    $scope.inactivebarraips = true;
    $("#modalips").modal("open");
    setTimeout(() => {
      $('#modalips #ipsinput').focus();
    }, 100);
    break;
    case 'producto':
    $scope.listProductos = [];
    $scope.inactivebarrapro = true;
    $("#modalproducto").modal("open");
    setTimeout(() => {
      $('#modalproducto #proinput').focus();
    }, 100);
    break;
    default:
  }
}

$scope.closemodals = function (tipo) {
  switch (tipo) {
    case 'diagnostico':
    $("#modaldiagnostico").modal("close");
    break;
    case 'ips':
    $("#modalips").modal("close");
    break;
    case 'modalservicio':
    $("#modalservicio").modal("close");
    break;
    case 'producto':
    $("#modalproducto").modal("close");
    break;
    default:
  }


}
$scope.buscarDiagnostico = function (diag) {      
  var sexo = $scope.sexoafitabI;
  var edad = $scope.edadafitabI;      
  $http({
    method: 'POST',
    url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
    data: {function: 'obtenerDiagnostico', codigo: diag, sexo: sexo,edad: edad}
  }).then(function (response) {
    $scope.listDiagnosticos = [];
    if (response.data["0"].Codigo == '-1') {
      swal('Importante', response.data["0"].Nombre, 'info');
      $scope.inactivebarradiag = true;
    } else if (response.data["0"].Codigo == '0') {
      swal('Importante', 'Diasnostico no encontrado ó favor especificar mas la busqueda del diagnostico', 'info');
      $scope.inactivebarradiag = true;
    } else {
      $scope.listDiagnosticos = response.data;
      $scope.inactivebarradiag = false;
    }
  })
}
$scope.seleccionardiagnostico = function (data, tipo) {
  var text = "";
  if (tipo == 'P') {
    $scope.dataNegacion.diagnom1 = data.Nombre;
    $scope.dataNegacion.diagcod1 = data.Codigo;
    text = 'Principal';
  } else {
    $scope.dataNegacion.diagnom2 = data.Nombre;
    $scope.dataNegacion.diagcod2 = data.Codigo;
    text = 'Secundario';
    $("#modaldiagnostico").modal("close");
  }



  swal({ title: "Completado", text: "Diagnostico " + text + " Registrado", showConfirmButton: false, type: "success", timer: 800 });
}

$scope.buscarIps = function (ips) {
  console.log(ips);
  if (ips != "" || ips != undefined) {
    $http({
      method: 'POST',
      url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
      data: { function: 'obtenerNombreIps', ips: ips }
    }).then(function (response) {
      if (response.data["0"].Codigo == '0') {
        swal('Importante', 'IPS no encontrada', 'info');
        $scope.inactivebarraips = true;
      } else {
        $scope.listIps = response.data;
        $scope.inactivebarraips = false;  
      }      
    })
  } else {
    swal('Importante', 'El campo  de texto no puede estar vacio!', 'info');
  }

}

$scope.seleccionarips = function (data, tipo) {
  var text = '';      
  if (tipo == 'S') {
    $scope.dataNegacion.ipssolicitante = data.Nombre;
    $scope.dataNegacion.ipscodsolicitante = data.Codigo;
    $scope.dataNegacion.ipsasignada = data.Nombre;
    $scope.dataNegacion.ipscodasignada = data.Codigo;
    text = 'Ips Solicitante.';      
    swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });        
    $scope.closemodals('ips');
  }
}
$scope.removeDiagnostico = function () {
  $scope.dataNegacion.diagnom2 = '';          
}

$scope.tempservicio="";
$scope.getServicio = function (argument) {
  console.log(argument);
  $scope.tempservicio = argument;
}

$scope.pasostabI = function (op) {
  switch (op) {
    case '1':
    $("#btn-solicitudtabI").removeClass("grey");
    $scope.invsolicitudtabI = false;
    $scope.titletabI = 'Dx y Servicio';
    break; 
    case '-1':
    $("#btn-productotabI").addClass("grey");
    $scope.invsolicitudtabI = false;
    $scope.titletabI = 'Dx y Servicio';
    $scope.invproductotabI = true;
    break;
    case '2':
    $scope.validartabI('inicial');
    if ($scope.pasarinicialneg == true) {
      $("#btn-productotabI").removeClass("grey");
      $scope.invsolicitudtabI = true;
      $scope.invproductotabI = false;
      $scope.titletabI = 'Producto';

      if ($scope.tempservicio) {
       $http({
        method: 'POST',
        url: "php/formatonegacion/formato.php",
        data: { function: 'p_lista_servicios_exc', servicio: $scope.dataNegacion.servicio }
      }).then(function (response) {
        console.log(response.data);
        $scope.conceptos = response.data[0];
        $scope.tempservicio="";
      })
    }


  } else {
    swal("Info",$scope.textvalidate, 'info');
  }
  break;
  case '-2':
  $("#btn-invjustificaciontabI").addClass("grey");
  $scope.invproductotabI = false;
  $scope.titletabI = 'Producto';
  $scope.invjustificaciontabI = true;
  break;
  case '3':
  $scope.validartabI('producto');
  if ($scope.pasarproductoautprog == true) {
    $("#btn-invjustificaciontabI").removeClass("grey");
    $scope.invproductotabI = true;        
    $scope.invjustificaciontabI = false;
    $scope.titletabI = 'Justificaciones';       
  } else {
    swal('Importante', 'Debe agregar un producto', 'info')
  }
  break;
  case '-3': 
  $("#btn-alternativastabI").addClass("grey");
  $scope.invsolicitudtabI = true;
  $scope.invproductotabI = true;          
  $scope.invjustificaciontabI = false;      
  $scope.titletabI = 'Justificaciones';
  break;     
  case '4':
  setTimeout(function () {
    swal({ title: "Completado", text: 'Negación Completada', type: "success", timer: 800 });
    $scope.limpiar('1');
    $scope.$apply();
  }, 500);
  break;   
  default:
}
}
$scope.textvalidate = "Complete los campos requeridos (*)";
$scope.validartabI = function (tipo) {
  $scope.pasarinicialneg = true;
  $scope.pasarproductoautprog = true;
  $scope.pasardatosafiliadoprog = true;
  switch (tipo) {
    case 'inicial':
    if ($scope.dataNegacion.diagnom1 == '' || $scope.dataNegacion.diagnom1 == undefined) {
      $scope.pasarinicialneg = false;
      $scope.textvalidate = "Campo Diagnostico Principal no puede estar vacio!";
    }else if ($scope.dataNegacion.ipssolicitante == '' || $scope.dataNegacion.ipssolicitante == undefined) { 
      $scope.pasarinicialneg = false; 
      $scope.textvalidate = "Campo Ips Solicitante no puede estar vacio!";
    } else if ($scope.dataNegacion.servicio == '' || $scope.dataNegacion.servicio == undefined) {
      $scope.pasarinicialneg = false;
      $scope.textvalidate = "Campo Servicio no puede estar vacio!";
    } else if ($scope.dataNegacion.fecsolicitud == '' || $scope.dataNegacion.fecsolicitud == undefined) {
      $scope.pasarinicialneg = false;
      $scope.textvalidate = "Campo Fecha de la Orden no puede estar vacio!";
    } else if ($scope.dataNegacion.ubicacionpaciente == '' || $scope.dataNegacion.ubicacionpaciente == undefined) {
      $scope.pasarinicialneg = false;
      $scope.textvalidate = "Campo Ambito de la Atención no puede estar vacio!";
    }     
    break;
    case 'producto':
    if ($scope.productosagregadosneg.length == 0 || $scope.productosagregadosneg == undefined) { $scope.pasarproductoautprog = false; }
    break;  
    case 'justificaciones':
    if ($scope.ngconcepto.JUSTIFICACION == '' || $scope.ngconcepto.JUSTIFICACION == undefined) { $scope.pasarproductoautprog = false; 
      $scope.textvalidate = "Campo Justificación no puede estar vacio!";
    }          
    default:
  }
}

$scope.buscarProducto = function (pro) {
  if ($scope.buscarpro.length >= 3) {

    $http({
      method: 'POST',
      url: "php/formatonegacion/formato.php",
      data: { function: 'BuscarProducto', clasificacion: 1002,  producto: $scope.buscarpro }
    }).then(function (response) {
      $scope.listProductos = [];
      if (response.data["0"].CODIGO == '-1') {
        swal('Importante', response.data["0"].NOMBRE, 'info');
        $scope.inactivebarrapro = true;
      } else if (response.data["0"].CODIGO == '0') {
        swal('Importante', "Producto no encontrado!", 'info');
        $scope.inactivebarrapro = true;
      } else {
        $scope.listProductos = response.data;
        $scope.inactivebarrapro = false;
      }
      console.log($scope.listProductos);
    })
  } else {
    swal('Importante', 'El campo  de texto no puede estar vacio!', 'info');
  }
}

$scope.seleccionarproducto = function (data) {
  swal({
    title: 'Ingrese la cantidad',
    input: 'number',
    inputValue: 1,
    inputAttributes: {
      min: 1,
      max: 99
    },
    showCancelButton: true
  }).then(function (result) {
    if (result > 0) {
      data.CANTIDAD = result;        
      if ($scope.productosagregadosneg.length == 0) {
        $scope.productosagregadosneg.push(data);
      } else {
        var comp = 0;
        for (let index = 0; index < $scope.productosagregadosneg.length; index++) {
          const element = $scope.productosagregadosneg[index];
          if (element.CODIGO == data.CODIGO) {
            var pindex = index;
            comp = 1;
            break;
          } else {
            comp = 0;
          }
        }
        if (comp == 0) {
          $scope.productosagregadosneg.push(data);
        } else {
          $scope.productosagregadosneg[pindex].CANTIDAD = data.CANTIDAD;
        }
      }
      if ($scope.productosagregadosneg.length == 0)
        $scope.nofindproductstabI = false;
      else
        $scope.nofindproductstabI = true;


      $scope.$apply();
      swal({ title: "Completado", text: "Producto Agregado.", showConfirmButton: false, type: "success", timer: 800 });
      setTimeout(function () {
          // $("#modalproducto").modal("close");
        }, 100);
    } else {
      swal('Importante', 'Cantidad Incorrecta', 'info')
    }
  })
}
$scope.eliminarProducto = function (index, tipo) {
  if (tipo == "1") {
    $scope.productosagregadosneg.splice(index, 1);
    if ($scope.productosagregadosneg.length == 0)
      $scope.nofindproductstabI = false;
    else
      $scope.nofindproductstabI = true;
  } else {
    $scope.productosagregadosnegII.splice(index, 1);
    if ($scope.productosagregadosnegII.length == 0)
      $scope.nofindproductstabIII = false;
    else
      $scope.nofindproductstabIII = true;
  }
  swal({ title: "Completado", text: "Producto Retirado.", showConfirmButton: false, type: "info", timer: 800 })
}

$scope.getDatos = function() {
  $scope.dataNegacion.fecsolicitudparseada = formatDate($scope.dataNegacion.fecsolicitud);
  $scope.dataNegacion.ubicacion = sessionStorage.getItem('municipio');
  $scope.dataNegacion.responsable = sessionStorage.getItem('cedula');
  $scope.dataNegacion.codservicio = 1002;    
  console.log($scope.dataNegacion);
  $scope.validartabI('justificaciones');
  if ($scope.pasarproductoautprog == false) {
    swal("Info",$scope.textvalidate, 'info');
  }else{
    swal({
      html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
      width: 200,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      animation: false
    });  
    $http({
      method: 'POST',
      url: "php/formatonegacion/formato.php",
      data: { function: 'insertarNegacion', negacion: JSON.stringify($scope.dataNegacion) }
    }).then(function (response) {
      $scope.respuesta = response.data;
      if ($scope.respuesta.Codigo == '0') {
        $scope.ubicacionPrint = response.data.Ubicacion;
        if ($scope.productosagregadosneg.length > 0) {
          var dataproductos = JSON.stringify($scope.productosagregadosneg);
          $http({
            method: 'POST',
            url: "php/formatonegacion/formato.php",
            data: { function: 'insertarDetalleNeg', 
            productos: dataproductos, 
            cantidad: $scope.productosagregadosneg.length,
            servicio: $scope.dataNegacion.servicio,
            justificacion: $scope.ngconcepto.JUSTIFICACION,
            fundamento:$scope.ngconcepto.FUNDAMENTO, 
            alternativa:$scope.ngconcepto.ALTERNATIVA, 
            numero: $scope.respuesta.Numero, 
            ubicacion: $scope.respuesta.Ubicacion }
          }).then(function (res) {
            console.log(res.data);            
            $scope.numngprocesada = res.data.Numero;                      
            if (response.data.Codigo == '0') { 
              $scope.estadong =  res.data.Estado;
              $scope.claseEstadong = res.data.Clase;
              $scope.mensajeng = res.data.Mensaje;
              $scope.invsolicitudtabI = true;
              $scope.invproductotabI = true;
              $scope.invjustificaciontabI = true;  
              $scope.invfinalizartabI = false;   
    //           window.open('views/autorizaciones/formatonegacionservicioprint.php?numero=' + $scope.numngprocesada + '&ubicacion=' + $scope.ubicacionPrint, '_blank');
    swal.close();
  } else {

  }
})
        } else {
          $("#btn-finalizartabI").removeClass("grey");
          $scope.invproductotabI = true;
          $scope.invfinalizartabI = false;
          $scope.titletabI = 'Finalizar';
          swal.close();
        }
      }

    })
  }



}
$scope.sumPrint = 0;
$scope.printNg = function () {
  setTimeout(() => {  
        //   $scope.sumPrint = $scope.sumPrint + 1;     
        // if ($scope.sumPrint > 2) {
        //   swal({ title: "No Completado", text: 'No se puede imprimir la negación mas de 2 veces!', showConfirmButton: true, type: "warning" });
        // } else {          
          window.open('views/autorizaciones/formatonegacionservicioprint.php?numero=' + $scope.numngprocesada + '&ubicacion=' + $scope.ubicacionPrint, '_blank');
        // }
      }, 100);
}

$scope.inactivenegaciones = true;
$scope.buscarNegaciones= function () {
  $http({
    method: 'POST',
    url: "php/formatonegacion/formato.php",
    data: { function: 'p_lista_negacion_web', tipodocumento: $scope.tipodocumentoafiliadonegcon, documento: $scope.documentoafiliadonegcon }
  }).then(function (response) {
    console.log(response.data);
    if (response.data.length==0) {
      $scope.negaciones = [];
      $scope.inactivenegaciones = true;
      swal({ title: "Negacion de Servicios", text: "Afiliado no tiene negaciones!.", type: "warning" })
    }else{
      $scope.negaciones = response.data;
      $scope.inactivenegaciones = false;
    }
  });
}

$scope.limpiar = function (tab) {
  switch (tab) {
    case '1':
    $scope.inactiveinfousersearh = false;
    $scope.inactiveinfouser = true;          
    $scope.infoafiliadoneg=[];
    $scope.tipodocumentoafiliadoneg= "";
    $scope.documentoafiliadoneg= "";          
    $scope.dataNegacion = {   
      numero: 0,
      tipodocumento: '',
      documento: '',
      diagnom1: '',
      diagnom2: '',
      diagcod1: '',
      diagcod2: '',
      ipssolicitante: '',      
      ipscodsolicitante: '',
      ipsasignada: '',
      ipscodasignada: '',
      servicio: '',
      codservicio: '',
      fecsolicitud: '',
      fecsolicitudparseada: '',
      ubicacionpaciente: '',        
      ubicacion: '',
      accion: 'I',
      justificacion:'',
      fundamento:'',
      alternativa:'',
      valornopos : 'N',
      valortipo: 'N',
      altocosto: 'N',
      responsable: 0
    }
    $scope.titletabI = 'Dx y Servicio';
    $("#btn-solicitudtabI").removeClass("grey");
    $("#btn-productotabI").addClass("grey");
    $("#btn-invjustificaciontabI").addClass("grey");
    $scope.invsolicitudtabI = true;
    $scope.invproductotabI = true;
    $scope.invjustificaciontabI = true;  
    $scope.invfinalizartabI = true;
    $scope.conceptos =[];
    $scope.ngconcepto="";
    $scope.tipodocumentoafiliadoneg ='';
    $scope.documentoafiliadoneg ='';
    $scope.tempservicio="";
    break;
    case '3':      
    $scope.tipodocumentoafiliadonegcon = '';
    $scope.documentoafiliadonegcon = '';
    $scope.inactivenegaciones=true;
    break;       
    default:
  }

}

$scope.accion_print = function (neg) {
  console.log(neg);
  window.open('views/autorizaciones/formatonegacionservicioprint.php?numero=' + neg.numero + '&ubicacion=' + neg.ubicacion, '_blank');
}

$scope.new_element = function (nom,tipo){
  switch (tipo) {
    case 'Servicio':
      if (nom) {
      if (accion=='I') {
      $scope.listServicios.push({'Codigo': $scope.listServicios + 1, 'Nombre': nom});    
      }else{
      console.log("Edita el servicio");          
      }

      }else{
      swal({ title: "Servicio", text: "Nombre del servicio no puede ser vacio!.", type: "warning" })
      }
   break;
   case 'Justificacion':
    if (nom) {
        $scope.justificaciones.push({'Codigo': $scope.justificaciones + 1, 'Nombre': nom});  
      }else{
      swal({ title: "Servicio", text: "Nombre de la Justificacion no puede ser vacio!.", type: "warning" })
    }
  break;  
  case 'Fundamento':
      if (nom) {
        $scope.fundamentos.push({'Codigo': $scope.fundamentos + 1, 'Nombre': nom});  
      }else{
      swal({ title: "Servicio", text: "Nombre del Fundamento no puede ser vacio!.", type: "warning" })
      }
  break;  
  case 'Alternativa':
    if (nom) {
      $scope.alternativas.push({'Codigo': $scope.alternativas + 1, 'Nombre': nom});  
    }else{
    swal({ title: "Servicio", text: "Nombre de la Alternativa no puede ser vacio!.", type: "warning" })
    }
  break;       
  default:
}



}


$scope.delete_element = function (element, index, tipo) {      
  switch (tipo) {
    case 'Servicio':
    $scope.listServicios = $scope.listServicios.slice(0, index).concat($scope.listServicios.slice(index + 1, $scope.listServicios.length));
    break;
    case 'Justificacion':
    $scope.justificaciones = $scope.justificaciones.slice(0, index).concat($scope.justificaciones.slice(index + 1, $scope.justificaciones.length));
    break;  
    case 'Fundamento':
    $scope.fundamentos = $scope.fundamentos.slice(0, index).concat($scope.fundamentos.slice(index + 1, $scope.fundamentos.length));
    break;  
    case 'Alternativa':
    $scope.alternativas = $scope.alternativas.slice(0, index).concat($scope.alternativas.slice(index + 1, $scope.alternativas.length));
    break;       
    default:
  }
}

$scope.configPtz =function (param) {
  switch (param) {
    case 'Justificacion':
    $scope.showJustificacion = false;
    break;
    case 'Fundamento':
    $scope.showFundamento = false;
    break;  
    case 'Alternativa':
    $scope.showAlternativa = false;
    break;      
    default:
  }

}
$scope.setElement =  function (element, index, tipo) {      
  console.log('tipo_',tipo);
  switch (tipo) {
    case 'Servicio':
    console.log(element);

    $scope.aServicio ='E';
    $scope.nom_servicio = element.Nombre;
    document.getElementById('nom_servicio').focus();
  // $scope.listServicios = $scope.listServicios.slice(0, index).concat($scope.listServicios.slice(index + 1, $scope.listServicios.length));
  break;
  case 'Justificacion':
  // $scope.justificaciones = $scope.justificaciones.slice(0, index).concat($scope.justificaciones.slice(index + 1, $scope.justificaciones.length));
  break;  
  case 'Fundamento':
  // $scope.fundamentos = $scope.fundamentos.slice(0, index).concat($scope.fundamentos.slice(index + 1, $scope.fundamentos.length));
  break;  
  case 'Alternativa':
  // $scope.alternativas = $scope.alternativas.slice(0, index).concat($scope.alternativas.slice(index + 1, $scope.alternativas.length));
  break;       
  default:
}
}
$scope.ngconcepto= "";
$scope.getConcepto = function (argument) {
  if (argument) {    
    $scope.ngconcepto = JSON.parse(argument);
  }else{
    $scope.ngconcepto= "";
  }

}
$scope.CancelButton = function () {
  $scope.showJustificacion = true;
  $scope.showFundamento = true;
  $scope.showAlternativa = true;
  $scope.justificaciones= [];
  $scope.fundamentos =  [];
  $scope.alternativas = [];
  $scope.nom_servicio ="";
  $scope.nom_justificacion ="";
  $scope.nom_servicio ="";
  $scope.nom_fundamento ="";
  $scope.nom_alternativa ="";
}


}])