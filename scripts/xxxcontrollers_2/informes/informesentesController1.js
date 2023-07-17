'use strict';
angular.module('GenesisApp')
.controller('informesentesController',['$scope','consultaHTTP','notification','cfpLoadingBar','$http','$window','$filter',
function($scope,consultaHTTP,notification,cfpLoadingBar,$http,$window,$filter) {

  $scope.inactive2 = true;
  $scope.tiporeporte = 0;
  $scope.departamento = '0';
  $scope.municipio = '0';
  $scope.tipo_cuenta = '0';
  $scope.nomina = '';

  var dat = {prov : 'navb'}
  $.getJSON( "php/obtenersession.php", dat)
  .done(function(respuesta) {
    $scope.sesdata = respuesta;
    $scope.rolcod=$scope.sesdata.rolcod;
    $scope.obtenerreporte();
  })
  .fail(function( jqXHR, textStatus, errorThrown ) {
    console.log("navbar error obteniendo variables");
  });

  $scope.obtenerreporte = function(){
    $http({
      method:'POST',
      url:"php/informes/obtenerreportes.php",
      data:{function:'obtenerreportes', v_prol :$scope.rolcod}
    }).then(function(response){
      $scope.Reportes = response.data;
      console.log(response.data);
    })
  }

  // se activan los criterios de conusltas
  $scope.buscaReporte = function(){
    if ($scope.tiporeporte == "0") {
      $scope.shw_parametros = false;
      $scope.consmayudaaut=false;
      $scope.consproductos= false;
      $scope.consmovempresa=false;
      $scope.consmesaayudacas=false;
    }else{
      $scope.hideall();
      $scope.shw_parametros = true;
      switch($scope.tiporeporte){
        case "1":
        $scope.shw_fecha_inicio = true;
        $scope.shw_fecha_final = true;
        $scope.consmayudaaut=false;
        $scope.consproductos= false;
        $scope.consmovempresa=false;
        $scope.consmesaayudacas=false;
        break;

        case "2":
        $scope.shw_fecha_inicio = true;
        $scope.shw_fecha_final = true;
        $scope.consmayudaaut=false;
        $scope.consproductos= false;
        $scope.consmovempresa=false;
        $scope.consmesaayudacas=false;
        break;

        case "3":
        $scope.shw_nomina = true;
        $scope.consmayudaaut=false;
        $scope.consproductos= false;
        $scope.consmovempresa=false;
        $scope.consmesaayudacas=false;
        break;

        case "4":
        $scope.shw_annos = true;
        $scope.shw_periodo = true;
        $scope.consmayudaaut=false;
        $scope.consproductos= false;
        $scope.consmovempresa=false;
        $scope.consmesaayudacas=false;
        break;

        case "5":
        $scope.shw_annos = true;
        $scope.shw_periodo = true;
        $scope.consmayudaaut=false;
        $scope.consproductos= false;
        $scope.consmovempresa=false;
        $scope.consmesaayudacas=false;
        break;


        case "7":
        $scope.shw_annos = true;
        $scope.shw_nit = true;
        $scope.consmayudaaut=false;
        $scope.consproductos= false;
        $scope.consmovempresa=false;
        $scope.consmesaayudacas=false;
        break;

        case "8":
        $scope.shw_fecha_inicio = true;
        $scope.shw_fecha_final = true;
        $scope.consmayudaaut=false;
        $scope.consproductos= false;
        $scope.consmovempresa=false;
        $scope.consmesaayudacas=false;
        break;

        case "9":
        $scope.shw_annos = true;
        $scope.shw_periodo = true;
        $scope.consmayudaaut=false;
        $scope.consproductos= false;
        $scope.consmovempresa=false;
        $scope.consmesaayudacas=false;
        break;

        case "10":
        $scope.shw_contrato = true;
        $scope.shw_regimen = true;
        $scope.shw_producto = true;
        $scope.consmayudaaut=false;
        $scope.consmovempresa=false;
        $scope.consmesaayudacas=false;
        break;

        case "12":
        $scope.shw_annos = true;
        $scope.shw_periodo = true;
        $scope.consproductos= false;
        $scope.consmovempresa=false;
        $scope.consmayudaaut=true;
        $scope.consmesaayudacas=false;
        break;

        case "13":
        $scope.shw_annos = false;
        $scope.shw_periodo = false;
        $scope.consproductos= false;
        $scope.consmovempresa=true;
        $scope.consmayudaaut=false;
        $scope.consmesaayudacas=false;
        break;

        case "14":
        $scope.shw_annos = true;
        $scope.shw_trimestre = true;
        $scope.consmesaayudacas=false;
        break;

        case "15":
        $scope.shw_fecha_inicio = true;
        $scope.shw_fecha_final = true;
        $scope.shw_nit = true;
        $scope.consmesaayudacas=false;
        break;

        case "16":
        $scope.shw_annos = false;
        $scope.shw_periodo = false;
        $scope.consproductos= false;
        $scope.consmovempresa=false;
        $scope.consmayudaaut=false;
        $scope.consmesaayudacas=true;
        $scope.shw_nit = false;
        break;


        case "17":
        $scope.shw_fecha_inicio = true;
        $scope.shw_fecha_final = true;
        $scope.shw_departamento = true;
        $scope.shw_municipio = true;
        break;

        case "18":
        $scope.shw_annos = true;
        $scope.shw_periodo = true;
        $scope.consmayudaaut=false;
        $scope.consproductos= false;
        $scope.consmovempresa=false;
        $scope.consmesaayudacas=false;
        break;


        case "19":
        $scope.shw_annos = true;
        $scope.shw_periodo = true;
        $scope.consmayudaaut=false;
        $scope.consproductos= false;
        $scope.consmovempresa=false;
        $scope.consmesaayudacas=false;
        break;

        case "21":
        $scope.shw_anofinal = true;
        $scope.shw_anoinicial = true;
        $scope.consmayudaaut=false;
        $scope.consproductos= false;
        $scope.consmovempresa=false;
        $scope.consmesaayudacas=false;
        break;

        case "37":
        $scope.shw_fecha = true;
        $scope.shw_departamento = true;
        break;
        case "39":
        $scope.shw_fecha_inicio = true;
        $scope.shw_fecha_final = true;
        $scope.consmayudaaut=false;
        $scope.consproductos= false;
        $scope.consmovempresa=false;
        $scope.consmesaayudacas=false;
        break;
        case "40":
        $scope.shw_fecha_inicio = true;
        $scope.shw_fecha_final = true;
        $scope.consmayudaaut=false;
        $scope.consproductos= false;
        $scope.consmovempresa=false;
        $scope.consmesaayudacas=false;
        break;
        case "41":
        $scope.shw_fecha_inicio = true;
        $scope.shw_fecha_final = true;
        $scope.consmayudaaut=false;
        $scope.consproductos= false;
        $scope.consmovempresa=false;
        $scope.consmesaayudacas=false;
        break;

        case "42":
        $scope.shw_fecha_inicio = true;
        $scope.shw_fecha_final = true;
        $scope.shw_oficina = true;
        $scope.consmayudaaut=false;
        $scope.consproductos= false;
        $scope.consmovempresa=false;
        $scope.consmesaayudacas=false;
        break;





      }
    }
  }
  $scope.limpiar = function(){
    $scope.ver_documento = true;
    $scope.documentos = '';
  }

  // se relacionan todos los criterior de consulta
  $scope.hideall = function(){
    $scope.shw_regimen = false;
    $scope.shw_annos = false;
    $scope.shw_ciclo = false;
    $scope.shw_trimestre = false;
    $scope.shw_periodo = false;
    $scope.shw_nit = false;
    $scope.shw_anofinal = false;
    $scope.shw_anoinicial = false;
    $scope.shw_fecha_final = false;
    $scope.shw_fecha_inicio = false;
    $scope.shw_departamento = false;
    $scope.shw_municipio = false;
    $scope.shw_tipo_cuenta = false;
    $scope.shw_nomina = false;
    $scope.shw_contrato = false;
    $scope.shw_producto = false;
    $scope.shw_producto = false;
    $scope.consmayudaaut=false;
    $scope.consmovempresa=false;
    $scope.consmesaayudacas=false;
    $scope.shw_fecha = false;
    $scope.shw_oficina = false;

  }
  ///obtener datos
  $scope.obtenerMunicipios = function(){
    $scope.municipio = 'X';
    $scope.ipsreceptora = 'X';
    $scope.function = 'cargamunicipios';
    $http({
      method:'POST',
      url:"php/esop/funcesop.php",
      data: {function:$scope.function,depa:$scope.departamento}
    }).then(function(response){
      $scope.Municipios = response.data;
    });
  }
  $scope.obtenerDepartamentos = function(){
    $scope.function = 'cargadepartamentos';
    $http({
      method:'POST',
      url:"php/esop/funcesop.php",
      data: {function:$scope.function}
    }).then(function(response){
      $scope.Departamentos = response.data;
    });
  }
  $scope.cargaAnnos = function(){
    $http({
      method:'POST',
      url:"php/financiera/funcfinanciera.php",
      data:{function:'cargaannos'}
    }).then(function(res){
      $scope.Annos = res.data;
      $scope.anno = $scope.Annos[0].ANNO;
      $scope.cargaCiclos();
      $scope.cargatrimestre();
    })
  }
  $scope.cargatrimestre = function(){
    $http({
      method:'POST',
      url:"php/financiera/funcfinanciera.php",
      data:{function:'cargatrimestre', anno : $scope.anno}
    }).then(function(res){
      $scope.Trimestre = res.data;;
    })
  }
  $scope.cargaCiclos = function(){
    $http({
      method:'POST',
      url:"php/financiera/funcfinanciera.php",
      data:{function:'cargaciclos', anno : $scope.anno}
    }).then(function(res){
      $scope.Ciclos = res.data;
      $scope.ciclo = $scope.Ciclos[0].IDE;
      $scope.cargaPeriodos();
    })
  }
  $scope.obtenerreportes = function(){
    $http({
      method:'POST',
      url:"php/informes/obtenerreportes.php",
      data:{function:'obtenerreportes'}
    }).then(function(res){
      $scope.obtenerreportes = res.data;
      $scope.obtenerreportes = $scope.obtenerreportes[0].IDE;
      $scope.obtenerreportes();
    })
  }
  $scope.cargaPeriodos = function(){
    if ($scope.anno != "X" || $scope.anno === undefined) {
      $http({
        method:'POST',
        url:"php/financiera/funcfinanciera.php",
        data:{function:'cargaperiodos', anno : $scope.anno}
      }).then(function(res){
        $scope.Periodos = res.data;
        $scope.periodo = $scope.Periodos[0].IDE;
      })
    }
  }

  $scope.GenerarArchivo = function(){
    //alert('Soy yo');
    window.open("php/Informes/sireciTxt1.php?panno="+$scope.anno+"&ptrimestre="+$scope.trimestre);
    //window.open("php/financiera/sireciTxt2.php?panno="+$scope.anno+"&ptrimestre="+$scope.trimestre);
  }

  ///// se generan los reweportes
  $scope.generaReporte = function(){
    switch($scope.tiporeporte){
      case "1":
      var fecha_inicio = $filter('date')(new Date($scope.fecha_inicio), 'dd/MM/yyyy');
      var fecha_final = $filter('date')(new Date($scope.fecha_final), 'dd/MM/yyyy');
      window.open('php/Informes/ausentismo.php?fecha_inicio='+fecha_inicio+
      '&fecha_final='+fecha_final);
      $scope.consmayudaaut=false;
      $scope.consproductos= false;
      $scope.consmovempresa=false;
      break;

      case "2":
      var fecha_inicio = $filter('date')(new Date($scope.fecha_inicio), 'dd/MM/yyyy');
      var fecha_final = $filter('date')(new Date($scope.fecha_final), 'dd/MM/yyyy');
      window.open('php/Informes/incapacidades.php? &fecha_inicio='+fecha_inicio+
      '&fecha_final='+fecha_final);
      $scope.consmayudaaut=false;
      $scope.consproductos= false;
      $scope.consmovempresa=false;
      break;

      case "3":
      window.open('php/Informes/relacionnomina.php?nomina='+$scope.nomina);
      $scope.consmayudaaut=false;
      $scope.consproductos= false;
      $scope.consmovempresa=false;
      break;

      case "4":
      window.open('php/Informes/relacionlibranzas.php?anno='+$scope.anno+'&periodo='+$scope.periodo);
      $scope.consmayudaaut=false;
      $scope.consproductos= false;
      $scope.consmovempresa=false;
      break;

      case "5":
      window.open('php/Informes/relacionembargos.php?anno='+$scope.anno+'&periodo='+$scope.periodo);
      $scope.consmayudaaut=false;
      $scope.consproductos= false;
      $scope.consmovempresa=false;
      break;

      case "6":
      window.open('php/Informes/Plandecargos.php');
      $scope.consmayudaaut=false;
      $scope.consproductos= false;
      $scope.consmovempresa=false;
      break;

      case "7":
      window.open('php/Informes/descuentospyp.php?anno='+$scope.anno+'&nit='+$scope.nit);
      $scope.consmayudaaut=false;
      $scope.consproductos= false;
      $scope.consmovempresa=false;
      break;

      case "8":
      var fecha_inicio = $filter('date')(new Date($scope.fecha_inicio), 'dd/MM/yyyy');
      var fecha_final = $filter('date')(new Date($scope.fecha_final), 'dd/MM/yyyy');
      window.open('php/Informes/reportepartos.php? &fecha_inicio='+fecha_inicio+'&fecha_final='+fecha_final);
      $scope.consmayudaaut=false;
      $scope.consproductos= false;
      $scope.consmovempresa=false;
      break;

      case "9":
      window.open('php/Informes/procedimientosqx.php?anno='+$scope.anno+'&periodo='+$scope.periodo);
      $scope.consmayudaaut=false;
      $scope.consproductos= false;
      $scope.consmovempresa=false;
      break;

      case "10":
      // window.open('php/Informes/consproductoscontratos.php?contrato='+$scope.contrato+'&regimen='+$scope.regimen+'&producto='+$scope.producto);
      $http({
        method:'POST',
        url:"php/informes/consproductoscontratos.php",
        data:{function:'consultaproducto', contrato: $scope.contrato, regimen: $scope.regimen, producto:$scope.producto}
      }).then(function(respuesta){
        $scope.Productos = respuesta.data;
        $scope.consproductos=true;
        $scope.consmayudaaut=false;
        $scope.consmovempresa=false;

      })
      break;

      case "11":
      window.open('php/Informes/redcontratacion.php');
      $scope.consmayudaaut=false;
      $scope.consproductos= false;
      $scope.consmovempresa=false;
      break;

      case "12":
      // window.open('php/Informes/consproductoscontratos.php?contrato='+$scope.contrato+'&regimen='+$scope.regimen+'&producto='+$scope.producto);
      $http({
        method:'POST',
        url:"php/informes/mesaayudaaut.php",
        data:{function:'cosmayudaaut', annos: $scope.anno, periodo: $scope.periodo}
      }).then(function(respuesta){
        $scope.mesaayudaaut = respuesta.data;
        $scope.contTotal=0;
        $scope.contActivo=0;
        $scope.contProc=0;
        $scope.contRech=0;
        for (var i = $scope.mesaayudaaut.length - 1; i >= 0; i--) {
          $scope.contActivo=$scope.contActivo+Number($scope.mesaayudaaut[i].ACTIVOS);
          $scope.contProc=$scope.contProc+Number($scope.mesaayudaaut[i].PROCESADOS);
          $scope.contRech=$scope.contRech+Number($scope.mesaayudaaut[i].ANULADOS);
          $scope.contTotal=$scope.contTotal+Number($scope.mesaayudaaut[i].TOTAL);
        }
        $scope.consmayudaaut=true;
        $scope.consproductos= false;
        $scope.consmovempresa=false;
      })
      break;

      case "13":
      $http({
        method:'POST',
        url:"php/informes/empresasmovilidad.php",
        data:{function:'cosmovempras'}
      }).then(function(respuesta){
        $scope.empresasmovilidad = respuesta.data;
        $scope.contTotal=0;
        $scope.contActivo=0;
        $scope.contProc=0;
        $scope.contRech=0;
        for (var i = $scope.empresasmovilidad.length - 1; i >= 0; i--) {
          $scope.contActivo=$scope.contActivo+Number($scope.empresasmovilidad[i].ACTIVO);
          $scope.contProc=$scope.contProc+Number($scope.empresasmovilidad[i].PROCESADO);
          $scope.contRech=$scope.contRech+Number($scope.empresasmovilidad[i].RECHAZADO);
          $scope.contTotal=$scope.contTotal+Number($scope.empresasmovilidad[i].TOTAL);

        }

        $scope.consmayudaaut=false;
        $scope.consproductos= false;
        $scope.consmovempresa=true;
      })
      break;

      case "14":

      $http({
        method:'POST',
        url:"php/informes/sireci.php",
        data:{function:'validar_sireci', panno: $scope.anno, ptrimestre: $scope.trimestre}
      }).then(function(respuesta){
        $scope.resultado = respuesta.data;

        if($scope.resultado > 0){
          $scope.GenerarArchivo();
          //alert('Este es la cantidad de registros generados: '+$scope.resultado);
        }else{
          $http({
            method:'POST',
            url:"php/informes/sireci.php",
            data:{function:'crea_sireci', panno: $scope.anno, ptrimestre: $scope.trimestre}
          }).then(function(respuesta){
            $scope.resultado = respuesta.data;
            $scope.GenerarArchivo();
          });
          //alert('Este es la cantidad de registros generados: '+$scope.resultado);
        }

      })
      break;

      case "15":
      var fecha_inicio = $filter('date')(new Date($scope.fecha_inicio), 'dd/MM/yyyy');
      var fecha_final = $filter('date')(new Date($scope.fecha_final), 'dd/MM/yyyy');
      window.open('php/Informes/repautpss.php? &fecha_inicio='+fecha_inicio+'&fecha_final='+fecha_final+'&nit='+$scope.nit);
      $scope.consmayudaaut=false;
      $scope.consproductos= false;
      $scope.consmovempresa=false;
      break;

      case "16":
      $http({
        method:'POST',
        url:"php/informes/mesadeayudaacas.php",
        data:{function:'cosmesayudaacas'}
      }).then(function(respuesta){
        $scope.mesadeayudaacasa = respuesta.data;
        $scope.contTotal=0;
        $scope.contActivo=0;
        $scope.contProc=0;
        $scope.contRech=0;
        for (var i = $scope.mesadeayudaacasa.length - 1; i >= 0; i--) {
          $scope.contActivo=$scope.contActivo+Number($scope.mesadeayudaacasa[i].ACTIVO);
          $scope.contProc=$scope.contProc+Number($scope.mesadeayudaacasa[i].PROCESADO);
          $scope.contRech=$scope.contRech+Number($scope.mesadeayudaacasa[i].RECHAZADO);
          $scope.contTotal=$scope.contTotal+Number($scope.mesadeayudaacasa[i].TOTAL);

        }

        $scope.consmayudaaut=false;
        $scope.consproductos= false;
        $scope.consmovempresa=false;
        $scope.consmesaayudacas=true;
      })


      break;

      case "17":
      var fecha_inicio = $filter('date')(new Date($scope.fecha_inicio), 'dd/MM/yyyy');
      var fecha_final = $filter('date')(new Date($scope.fecha_final), 'dd/MM/yyyy');

      window.open('php/financiera/reportes/radicacion_x_afiliado.php?dpto='+$scope.departamento+'&mun='+
      $scope.municipio+'&fecha_inicio='+
      fecha_inicio+'&fecha_final='+
      fecha_final);
      break;

      case "18":
      window.open('php/Informes/detaut.php?anno='+$scope.anno+'&periodo='+$scope.periodo);
      $scope.consmayudaaut=false;
      $scope.consproductos= false;
      $scope.consmovempresa=false;
      break;

      case "19":
      window.open('php/Informes/repadmincas.php?anno='+$scope.anno+'&periodo='+$scope.periodo);
      $scope.consmayudaaut=false;
      $scope.consproductos= false;
      $scope.consmovempresa=false;
      break;

      case "20":
      window.open('php/Informes/contratoscapita.php');
      $scope.consmayudaaut=false;
      $scope.consproductos= false;
      $scope.consmovempresa=false;
      break;


      case "21":
      window.open('php/Informes/plandered.php?anofinal='+$scope.anofinal+'&anoinicial='+$scope.anoinicial);
      $scope.consmayudaaut=false;
      $scope.consproductos= false;
      $scope.consmovempresa=false;
      break;


      case "37":

      $scope.limpiar();
      var fecha = $filter('date')(new Date($scope.fecha), 'dd/MM/yyyy');
      swal.showLoading();
      $http({
        method:'POST',
        url:"php/informes/cons_aut.php",
        data: {function:'obtener_reporte_seccional', pfecha:fecha, pdepartamento:$scope.departamento}
      }).then(function(response){
        $scope.documentos = response.data;
        if(response.data.length == 0){
          notification.getNotification('info', "No hay Datos Registrados!", 'Notificacion');
        }
        swal.close();
      });

      $scope.shw_funcionarios_aut = true;

      break;
      case "39":
      var fecha_inicio = $filter('date')(new Date($scope.fecha_inicio), 'yyyy-MM-dd');
      var fecha_final = $filter('date')(new Date($scope.fecha_final), 'yyyy-MM-dd');
      console.log(fecha_inicio+'--'+fecha_final);
      window.open('php/Informes/aseguramiento/funcplandebusquedar2.php?s_fechainir2Call='+fecha_inicio+'&s_fechafinr2Call='+fecha_final);
      $scope.consmayudaaut=false;
      $scope.consproductos= false;
      $scope.consmovempresa=false;
      break;

      case "40":
      var fecha_inicio = $filter('date')(new Date($scope.fecha_inicio), 'yyyy-MM-dd');
      var fecha_final = $filter('date')(new Date($scope.fecha_final), 'yyyy-MM-dd');
      window.open('php/Informes/aseguramiento/funcgrupofamiliar.php?s_fechainiGrupoFami='+fecha_inicio+'&s_fechafinGrupoFami='+fecha_final);
      $scope.consmayudaaut=false;
      $scope.consproductos= false;
      $scope.consmovempresa=false;
      break;
      case "41":
      var fecha_inicio = $filter('date')(new Date($scope.fecha_inicio), 'yyyy-MM-dd');
      var fecha_final = $filter('date')(new Date($scope.fecha_final), 'yyyy-MM-dd');
      window.open('php/Informes/aseguramiento/funcplancontributivocallcenter.php?s_fechainiConCall='+fecha_inicio+'&s_fechafinConCall='+fecha_final);
      $scope.consmayudaaut=false;
      $scope.consproductos= false;
      $scope.consmovempresa=false;
      break;

      case "42":

      var fecha_inicio = $filter('date')(new Date($scope.fecha_inicio), 'yyyy-MM-dd');
      var fecha_final = $filter('date')(new Date($scope.fecha_final), 'yyyy-MM-dd');
      console.log(fecha_inicio);
      console.log(fecha_final);
      window.open('php/Informes/dg_turnos.php?fecha_inicio='+fecha_inicio+'&fecha_final='+fecha_final+'&oficina='+$scope.oficina);
      $scope.consmayudaaut=false;
      $scope.consproductos= false;
      $scope.consmovempresa=false;
      break;

    }
  }
  $scope.descdetalleacas = function()
  {
    window.open('php/Informes/detallemesadeayudaacas.php');
  }

  $scope.buscarDocumentoDet= function(doc){
    swal.showLoading();
    $http({
      method:'POST',
      url:"php/informes/cons_aut.php",
      data: {function:'obtener_reporte_seccional_det', pfecha:doc.FECHA, pdepartamento:$scope.departamento, phora: doc.HORA1}
    }).then(function(response){
      $scope.documentos_det = response.data;
      if(response.data.length == 0){
        notification.getNotification('info', "No hay Datos Registrados!", 'Notificacion');
      }
      swal.close();
    });
    $scope.shw_funcionarios_aut_det = true;
  }
}]);
