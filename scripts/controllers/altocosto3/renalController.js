'use strict';
angular.module('GenesisApp')
.controller('renalController', ['$scope', '$http', 'renalHttp','ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller','$rootScope','$window',
function ($scope, $http, renalHttp, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window) {
  $( document ).ready(function() {
    $( "#tabs" ).tabs();
  });
  //variables de datos del afiliado
    $scope.infobasica = true;
    $scope.campos = true;
    $scope.Inforegistro = true;
    $scope.tipodoc = "0";
    $scope.identificacion = "";
    $scope.tipo = "0"
    $scope.tab = 1;
    $scope.campo1 = false;
    $scope.resolucion = 2463;
    $scope.inactive1 = true;
    $scope.inactive2 = false;

  //variables tab I
    $scope._16ips                               = "0";
    $scope._17fnefroproteccion1                 = "";
    $scope._17fnefroproteccion                  = "0";

    $scope._18hipertensionarterial              = "0";
    $scope._19fhipertensionarterial1            = "";
    $scope._19fhipertensionarterial             = "0";

    $scope._191vcostohta1                       = "";
    $scope._191vcostohta                        = "0";
    $scope._20diabetesmellitus                  = "0";

    $scope._21fdiabetesmellitus1                = "";
    $scope._21fdiabetesmellitus                 = "0";
    $scope._211vcostodm1                        = "";
    $scope._211vcostodm                         = "0";

    $scope._22etiologiaerc                      = "0";
    $scope._23vpeso                             = "";
    $scope._24vtalla                            = "";

    $scope._25vsistolica1                       = "";
    $scope._25vsistolica                        = "0";
    $scope._26vdiastlica1                       = "";
    $scope._26vdiastlica                        = "0";

    $scope._27vcreatinina1                      = "";
    $scope._27vcreatinina                       = "0";
    $scope._271fcreatinina1                     = "";
    $scope._271fcreatinina                      = "0";

    $scope._28vhemoglobinaglicosilada1          = "";
    $scope._28vhemoglobinaglicosilada           = "0";
    $scope._281fhemoglobinaglicosilada1         = "";
    $scope._281fhemoglobinaglicosilada          = "0";

    $scope._29valbuminuria1                     = "";
    $scope._29valbuminuria                      = "0";
    $scope._291falbuminuria1                    = "";
    $scope._291falbuminuria                     = "0";

  //variables tab II
    $scope._30vcreatinuria1                     = "";
    $scope._30vcreatinuria                      = "0";
    $scope._301fcreatinuria1                    = "";
    $scope._301fcreatinuria                     = "0";

    $scope._31vcolesteroltotal1                 = "";
    $scope._31vcolesteroltotal                  = "0";
    $scope._311fcolesteroltotal1                = "";
    $scope._311fcolesteroltotal                 = "0";

    $scope._32vhdl1                             = "";
    $scope._32vhdl                              = "0";
    $scope._321fhdl1                            = "";
    $scope._321fhdl                             = "0";

    $scope._33vldl1                             = "";
    $scope._33vldl                              = "0";
    $scope._331fldl1                            = "";
    $scope._331fldl                             = "0";

    $scope._34vpth1                             = "";
    $scope._34vpth                              = "0";
    $scope._341fpth1                            = "";
    $scope._341fpth                             = "0";

    $scope._35vtasaglomerular1                  = "";
    $scope._35vtasaglomerular                   = "0";
    $scope._36vieca                             = "0";

    $scope._37ara2                              = "0";
    $scope._38erccualquierestadio               = "0";

    $scope._39estadioerc                        = "0";
    $scope._40festadioerc1                      = "";
    $scope._40festadioerc                       = "0"

    $scope._41perprogramaerc                    = "0";
    $scope._42vtfg1                             = "";
    $scope._42vtfg                              = "0"

  //variables tab III
    $scope._43iniciotrr                         = "0";
    $scope._44finiciotrr1                       = "";
    $scope._44finiciotrr                        = "0";

    $scope._45fingresoura1                      = "";
    $scope._45fingresoura                       = "0";
    $scope._46hemodialisis                      = "0";

    $scope._47vdosisdialisis1                   = "";
    $scope._47vdosisdialisis                    = "0";
    $scope._48vtotalhemodialisis1               = "";
    $scope._48vtotalhemodialisis                = "0";

    $scope._49dialisisperitonial                = "0";
    $scope._50vdosisdialisis1                   = "";
    $scope._50vdosisdialisis                    = "0";

    $scope._51vhorashemodialisis1               = "";
    $scope._51vhorashemodialisis                = "0";
    $scope._52vperitonitis1                     = "";
    $scope._52vperitonitis                      = "0";

    $scope._53vcostodp1                         = "";
    $scope._53vcostodp                          = "0";
    $scope._54vacunahepatitisb                  = "0";

    $scope._55finfeccionhepatitisb1             = "";
    $scope._55finfeccionhepatitisb              = "0";
    $scope._56finfeccionhepatitisc1             = "";
    $scope._56finfeccionhepatitisc              = "0";

    $scope._57terapianodialitica                = "0";
    $scope._58vcostoterapiaerc1                 = "";
    $scope._58vcostoterapiaerc                  = "0";

    $scope._59vhemoglobina1                     = "";
    $scope._59vhemoglobina                      = "0";
    $scope._60valbuminaserica1                  = "";
    $scope._60valbuminaserica                   = "0";

  //variables tab IV
    $scope._61vfosforo1                         = "";
    $scope._61vfosforo                          = "0";
    $scope._62negrologiaerc5                    = "0";

    $scope._621reportocanceractivo              = "0";
    $scope._622reportoinfeccioncronica          = "0";

    $scope._623reportocontratrasplante          = "0";
    $scope._624reportocontratrasplante          = "0";

    $scope._625reportocontratrasplante          = "0";
    $scope._626reportoenfermedadcardiaca        = "0";

    $scope._627reportoinfeccionporvih           = "0";
    $scope._628reportoinfeccionporvhc           = "0";

    $scope._629reportocontratrasplante          = "0";
    $scope._6210reportoenfermedadcardiaca       = "0";

    $scope._6211reportocontratrasplante         = "0";
    $scope._63flistatransplante1                = "";
    $scope._63flistatransplante                 = "0";

    $scope._631ipslistaespera                   = "0";
    $scope._64usuariorecibiotransrenal          = "0";

    $scope._65codepsrealizotransplante          = "0";
    $scope._66codipsrealizotransplante          = "0";

  //variables tab V
    $scope._67tipodonante                     ="0";
    $scope._68costotransplante1               ="";
    $scope._68costotransplante                ="0";

    $scope._69complicaciontransplante         ="0";
    $scope._691finfeccioncitomegalovirus1     ="";
    $scope._691finfeccioncitomegalovirus      ="0";

    $scope._692finfeccionhongos1              ="";
    $scope._692finfeccionhongos               ="0";
    $scope._693finfecciontuberculosis1        ="";
    $scope._693finfecciontuberculosis         ="0";

    $scope._694finfeccionvascular1            ="";
    $scope._694finfeccionvascular             ="0";
    $scope._695finfeccionurologica1           ="";
    $scope._695finfeccionurologica            ="0";

    $scope._696finfeccionheridaquirurgica1    ="";
    $scope._696finfeccionheridaquirurgica     ="0";
    $scope._697fdiagnosticocancer1            ="";
    $scope._697fdiagnosticocancer             ="0";

    $scope._70vinmunosupresores1              ="";
    $scope._70vinmunosupresores               ="0";
    $scope._701reportemetilprednisolona       ="0";

    $scope._702reporteazatioprina             ="0";
    $scope._703reporteciclosporina            ="0";

    $scope._704reportemicofenolato            ="0";
    $scope._705reportetacrolimus              ="0";

    $scope._706reporteprednisona              ="0";
    $scope._707medicamento1                   ="0";

  //variables tab VI
    $scope._708medicamento2                   ="0";
    $scope._709medicamento3                   ="0";

    $scope._71episodiosrechazo1               ="";
    $scope._71episodiosrechazo                ="0";
    $scope._72rechazoinjerto1                 ="";
    $scope._72rechazoinjerto                  ="0";

    $scope._73retornodialisis1                ="";
    $scope._73retornodialisis                 ="0";
    $scope._74transplanresrenales1            ="";
    $scope._74transplanresrenales             ="0";

    $scope._75terapiapostrasplante1           ="";
    $scope._75terapiapostrasplante            ="0";
    $scope._76transplanresrenales             ="";
    $scope._77costototal                      ="";

    $scope._78codepsorigen                    ="0";
    $scope._79novedadreporteanterior          ="0";

    $scope._80causamuerte                     ="0";
    $scope._801fechamuerte1                   ="";
    $scope._801fechamuerte                    ="0";

//aplica para campo 65
  $scope.obtenereps = function (type) {
    renalHttp.cargareps().then(function (response) {
      $scope.eps = response.data;
	  setTimeout(function () {
        if(type == "65"){
			$scope._65codepsrealizotransplante = $scope.info["0"].V65;
			//$(function () {
			  // $("#65campo").val($scope.info["0"].V65);
			//});
			//document.getElementById("65campo").selectedIndex = 3;
		}
		if(type == "78"){
			$scope._78codepsorigen = $scope.info["0"].V78;
			//$(function () {
			   //$("#78campo").val($scope.info["0"].V78);
			//});
			//document.getElementById("78campo").selectedIndex = 3;
		}
      }, 500);
      
    })
  }
  //aplica para campos 707, 708, 709
  $scope.medicamento1 = function (type) {
    if(($scope.coincidenciam1 != "" && $scope.coincidenciam1 != null && $scope.coincidenciam1 != undefined && $scope.coincidenciam1.length > 3) || ($scope.coincidenciam1 == "98" || $scope.coincidenciam1 == "97")){
      renalHttp.medicamento($scope.coincidenciam1).then(function (response) {
        $scope.CACmedicamento1 = response.data;
        $scope.checked55 = false;
        if(type == "cargue"){
          $scope._707medicamento1 = Number($scope.info["0"].V707);
          $(function () {
             $("#707campo").val($scope.info["0"].V707);
          });
          document.getElementById("707campo").selectedIndex = 3;
        }
      })
    }else{
      notification.getNotification('warning', 'Debe ingresar alguna referencia mayor a 3 caracteres para buscar el medicamento', 'Notificacion');
    }
  }
  $scope.medicamento2 = function (type) {
    if(($scope.coincidenciam2 != "" && $scope.coincidenciam2 != null && $scope.coincidenciam2 != undefined && $scope.coincidenciam2.length > 3) || ($scope.coincidenciam1 == "98" || $scope.coincidenciam1 == "97")){
      renalHttp.medicamento($scope.coincidenciam2).then(function (response) {
        $scope.CACmedicamento2 = response.data;
        $scope.checked56 = false;
        if(type == "cargue"){
          $scope._708medicamento2 = Number($scope.info["0"].V708);
          $(function () {
             $("#708campo").val($scope.info["0"].V708);
          });
          document.getElementById("708campo").selectedIndex = 3;
        }
      })
    }else{
      notification.getNotification('warning', 'Debe ingresar alguna referencia mayor a 3 caracteres para buscar el medicamento', 'Notificacion');
    }
  }
  $scope.medicamento3 = function (type) {
    if(($scope.coincidenciam3 != "" && $scope.coincidenciam3 != null && $scope.coincidenciam3 != undefined && $scope.coincidenciam3.length > 3) || ($scope.coincidenciam1 == "98" || $scope.coincidenciam1 == "97")){
      renalHttp.medicamento($scope.coincidenciam3).then(function (response) {
        $scope.CACmedicamento3 = response.data;
        $scope.checked57 = false;
        if(type == "cargue"){
          $scope._709medicamento3 = Number($scope.info["0"].V709);
          $(function () {
             $("#709campo").val($scope.info["0"].V709);
          });
          document.getElementById("709campo").selectedIndex = 3;
        }
      })
    }else{
      notification.getNotification('warning', 'Debe ingresar alguna referencia mayor a 3 caracteres para buscar el medicamento', 'Notificacion');
    }
  }
  //aplica para campo 16
  $scope.ipstodo = function (type) {
    if(($scope.coincidenciaips != "" && $scope.coincidenciaips != null && $scope.coincidenciaips != undefined && $scope.coincidenciaips.length > 3) || ($scope.coincidenciam1 == "98" || $scope.coincidenciam1 == "97")){
      renalHttp.ipsTODO($scope.coincidenciaips).then(function (response) {
        $scope.IPStodo = response.data;
        $scope.checked1 = false;
        if(type == "cargue"){
          $scope._16ips = Number($scope.info["0"].V16);
          $(function () {
             $("#16campo").val($scope.info["0"].V16);
          });
          document.getElementById("16campo").selectedIndex = 3;
        }
      })
    }else{
      notification.getNotification('warning', 'Debe ingresar alguna referencia mayor a 3 caracteres para buscar la ips', 'Notificacion');
    }
  }
  //aplica para campo 63.1
  $scope.obteneripslista_espera = function (type) {
    renalHttp.cargarips('L').then(function (response) {
      $scope.listaespera = response.data;
      if(type == "cargue"){
        $scope._631ipslistaespera = Number($scope.info["0"].V631);
        $(function () {
           $("#631campo").val($scope.info["0"].V631);
        });
        document.getElementById("631campo").selectedIndex = 3;
      }
    })
  }
  //aplica para campo 66
  $scope.obteneripstransplante = function (type) {
    renalHttp.cargarips('T').then(function (response) {
      $scope.transplante = response.data;
      if(type == "cargue"){
        $scope._66codipsrealizotransplante = Number($scope.info["0"].V66);
        $(function () {
           $("#66campo").val($scope.info["0"].V66);
        });
        document.getElementById("66campo").selectedIndex = 3;
      }
    })
  }
  $scope.obtenercomodines = function () {
    renalHttp.cargarcomodines().then(function (response) {
      $scope.comodines = response.data;
    })
  }

  $scope.setTab = function(newTab){
    $scope.tab = newTab;
    $(".tabI").removeClass("tabactiva");
    $(".tabII").removeClass("tabactiva");
    $(".tabIII").removeClass("tabactiva");
    $(".tabIV").removeClass("tabactiva");
    $(".tabV").removeClass("tabactiva");
    $(".tabVI").removeClass("tabactiva");
    switch (newTab) {
      case 1:
      $(".tabI").addClass("tabactiva");
      setTimeout(function () {
        document.getElementById("-checked1").focus();
        document.getElementById("checked1").focus();
      }, 500);
      break;
      case 2:
      $(".tabII").addClass("tabactiva");
      $scope.calculartfg();
      setTimeout(function () {
        document.getElementById("-checked15").focus();
        document.getElementById("checked15").focus();
      }, 500);
      break;
      case 3:
      $(".tabIII").addClass("tabactiva");
      setTimeout(function () {
        document.getElementById("_43iniciotrr").focus();
      }, 500);
      break;
      case 4:
      $(".tabIV").addClass("tabactiva");
      setTimeout(function () {
        document.getElementById("-checked41").focus();
        document.getElementById("checked41").focus();
      }, 500);
      break;
      case 5:
      $(".tabV").addClass("tabactiva");
      setTimeout(function () {
        document.getElementById("_67tipodonante").focus();
      }, 500);
      break;
      case 6:
      $(".tabVI").addClass("tabactiva");
      setTimeout(function () {
        document.getElementById("-checked56").focus();
        document.getElementById("checked56").focus();
      }, 500);
      break;
      default:

    }
  }
  $scope.isSet = function(tabNum){
    return $scope.tab === tabNum;
  }

  $scope.BuscarAfiliado = function(){
    $scope.reiniciovalidaciones();
    $scope.obtenercomodines();
    renalHttp.BuscarAfiliado($scope.tipodoc,$scope.identificacion,$scope.resolucion).then(function (response) {
      if(response.data == "0"){
        notification.getNotification('warning', 'Informacion del afiliado no encontrada!', 'Notificacion');
        $scope.infobasica = true;
        $scope.Inforegistro = true;
        $scope.campos = true;
        $scope.desicion = "0";
      }else if(response.data["0"].dato == 2){
        notification.getNotification('warning', 'Hay actualizaciones pendientes!', 'Notificacion');
        $scope.infobasica = true;
        $scope.Inforegistro = true;
        $scope.campos = true;
        $scope.desicion = "0";
      }else{
        $scope.obtenereps();
        $scope.obteneripslista_espera();
        $scope.obteneripstransplante();
        $scope.desicion = "1";
        $scope.DatosBasicos = response.data;
        $scope.nombre_afiliado = $scope.DatosBasicos["0"].NombreCompleto;
        $scope.primer_nombre = $scope.DatosBasicos["0"].PrimerNombre;
        $scope.segundo_nombre = $scope.DatosBasicos["0"].SegundoNombre;
        $scope.primer_apellido = $scope.DatosBasicos["0"].PrimerApellido;
        $scope.segundo_apellido = $scope.DatosBasicos["0"].SegundoApellido;
        $scope.tipo_documento = $scope.DatosBasicos["0"].TipoDocumento;
        $scope.documento = $scope.DatosBasicos["0"].Documento;
        $scope.regimen = $scope.DatosBasicos["0"].Regimen;
        $scope.regimenCod = $scope.DatosBasicos["0"].RegimenCodigo;
        $scope.fecha_nacimiento = $scope.DatosBasicos["0"].FechaNacimiento;
        $scope.genero = $scope.DatosBasicos["0"].Sexo;
        $scope.generoCod = $scope.DatosBasicos["0"].SexoCodigo;
        $scope.departamento = $scope.DatosBasicos["0"].Departamento;
        $scope.municipio = $scope.DatosBasicos["0"].Municipio;
        $scope.telefono = $scope.DatosBasicos["0"].Celular1;
        $scope.grupopo_blacional = $scope.DatosBasicos["0"].GrupoPoblacional.toUpperCase();
        $scope.codgrupopo_blacional = $scope.DatosBasicos["0"].CodigoGrupoPoblacional;
        $scope.etnia = $scope.DatosBasicos["0"].GrupoEtnico;
        $scope.fecha_afiliacion = $scope.DatosBasicos["0"].FechaAfiliacion;
        $scope.opcioncargue = $scope.DatosBasicos["0"].Dato;
        $scope.RutaHistoria = $scope.DatosBasicos["0"].Ruta;
        $scope.tipofiltrorenal();
        $scope._48vtotalhemodialisis1 = numeral($scope.DatosBasicos["0"].V48).format('0,0 [.] 00');
        $scope._77costototal = numeral($scope.DatosBasicos["0"].V77).format('0,0 [.] 00');
        $scope.setTab(1);
        if($scope.opcioncargue == "1"){
          $scope.cargueultimainformacion();
          $scope.inactive1 = false;
        }
        else{
          $scope.inactive1 = true;
        }
        if($scope.DatosBasicos["0"].Historia == "false"){
            $scope.historia = false;
        }else{
            $scope.historia = true;
        }
        if($scope.telefono == undefined || $scope.telefono == " " || $scope.telefono == "" || $scope.telefono == null){
          $scope.inactive2 = false;
        }
        else{
          $scope.inactive2 = true;
        }
      }
    })
  }
  $scope.validarcomodin = function(val,tipo){
    $scope.escomodin = false;
    if(tipo == "F"){
      var pieces = val.split('/');
      pieces.reverse();
      val = pieces.join('-');
    }
    for (var i = 0; i < $scope.comodines.Comodin.length; i++) {
        if(val == $scope.comodines.Comodin[i].value){
          $scope.escomodin = true;
        }
    }
  }
  $scope.cargueultimainformacion = function(){
    renalHttp.CargarDatosPaciente($scope.tipodoc,$scope.identificacion,$scope.resolucion).then(function (response) {
      $scope.info = response.data;
      if($scope.telefono == undefined || $scope.telefono == " " || $scope.telefono == "" || $scope.telefono == null){
        $scope.telefono = $scope.info["0"].V14;
      }
      //TAB I
        var parts = null;
        //16
        $scope.coincidenciaips = $scope.info["0"].V16;
        $scope.ipstodo('cargue');
        //var17
        $scope.validarcomodin($scope.info["0"].V17,"F");
        if($scope.escomodin == false){parts = $scope.info["0"].V17.split('/'); $scope._17fnefroproteccion1 = new Date(parts[2],parts[1]-1,parts[0]);}else{$scope.checked2=true; $scope._17fnefroproteccion = $scope.info["0"].V17.split('/').reverse().join('-');}
        //var18
        $scope._18hipertensionarterial = $scope.info["0"].V18;
        //var19
        $scope.validarcomodin($scope.info["0"].V19,"F");
        if($scope.escomodin == false){parts = $scope.info["0"].V19.split('/'); $scope._19fhipertensionarterial1 = new Date(parts[2],parts[1]-1,parts[0]);}else{$scope.checked3=true; $scope._19fhipertensionarterial = $scope.info["0"].V19.split('/').reverse().join('-');}
        //var191
        $scope.validarcomodin($scope.info["0"].V191,"N");
        if($scope.escomodin == false){$scope._191vcostohta1 = Number($scope.info["0"].V191);}else{$scope.checked4=true; $scope._191vcostohta = $scope.info["0"].V191;}
        //var20
        $scope._20diabetesmellitus = $scope.info["0"].V20;
        //var21
        $scope.validarcomodin($scope.info["0"].V21,"F");
        if($scope.escomodin == false){parts = $scope.info["0"].V21.split('/'); $scope._21fdiabetesmellitus1 = new Date(parts[2],parts[1]-1,parts[0]);}else{$scope.checked5=true; $scope._21fdiabetesmellitus = $scope.info["0"].V21.split('/').reverse().join('-');}
        //var211
        $scope.validarcomodin($scope.info["0"].V211,"N");
        if($scope.escomodin == false){$scope._211vcostodm1 = Number($scope.info["0"].V211);}else{$scope.checked6=true; $scope._211vcostodm = $scope.info["0"].V211;}
        //var22
        $scope._22etiologiaerc = $scope.info["0"].V22;
        //var23
        $scope._23vpeso  = Number($scope.info["0"].V23);
        //var24
        $scope._24vtalla = Number($scope.info["0"].V24);
        //var25
        $scope.validarcomodin($scope.info["0"].V25,"N");
        if($scope.escomodin == false){$scope._25vsistolica1 = Number($scope.info["0"].V25);}else{$scope.checked7=true; $scope._25vsistolica = $scope.info["0"].V25;}
        //var26
        $scope.validarcomodin($scope.info["0"].V26,"N");
        if($scope.escomodin == false){$scope._26vdiastlica1 = Number($scope.info["0"].V26);}else{$scope.checked8=true; $scope._26vdiastlica = $scope.info["0"].V26;}
        //var27
        $scope.validarcomodin($scope.info["0"].V27,"N");
        if($scope.escomodin == false){$scope._27vcreatinina1 = Number($scope.info["0"].V27);}else{$scope.checked9=true; $scope._27vcreatinina = $scope.info["0"].V27;}
        //var27.1
        $scope.validarcomodin($scope.info["0"].V271,"F");
        if($scope.escomodin == false){parts = $scope.info["0"].V271.split('/'); $scope._271fcreatinina1 = new Date(parts[2],parts[1]-1,parts[0]);}else{$scope.checked10=true; $scope._271fcreatinina = $scope.info["0"].V271.split('/').reverse().join('-');}
        //var28
        $scope.validarcomodin($scope.info["0"].V28,"N");
        if($scope.escomodin == false){$scope._28vhemoglobinaglicosilada1 = Number($scope.info["0"].V28);}else{$scope.checked11=true; $scope._28vhemoglobinaglicosilada = $scope.info["0"].V28;}
        //var28.1
        $scope.validarcomodin($scope.info["0"].V281,"F");
        if($scope.escomodin == false){parts = $scope.info["0"].V281.split('/'); $scope._281fhemoglobinaglicosilada1 = new Date(parts[2],parts[1]-1,parts[0]);}else{$scope.checked12=true; $scope._281fhemoglobinaglicosilada = $scope.info["0"].V281.split('/').reverse().join('-');}
        //var29
        $scope.validarcomodin($scope.info["0"].V29,"N");
        if($scope.escomodin == false){$scope._29valbuminuria1 = Number($scope.info["0"].V29);}else{$scope.checked13=true; $scope._29valbuminuria = $scope.info["0"].V29;}
        //var29.1
        $scope.validarcomodin($scope.info["0"].V291,"F");
        if($scope.escomodin == false){parts = $scope.info["0"].V291.split('/'); $scope._291falbuminuria1 = new Date(parts[2],parts[1]-1,parts[0]);}else{$scope.checked14=true; $scope._291falbuminuria = $scope.info["0"].V291.split('/').reverse().join('-');}
        //var29
      //TAB II
        //var30
        $scope.validarcomodin($scope.info["0"].V30,"N");
        if($scope.escomodin == false){$scope._30vcreatinuria1 = Number($scope.info["0"].V30);}else{$scope.checked15=true; $scope._30vcreatinuria = $scope.info["0"].V30;}
        //var30.1
        $scope.validarcomodin($scope.info["0"].V301,"F");
        if($scope.escomodin == false){parts = $scope.info["0"].V301.split('/'); $scope._301fcreatinuria1 = new Date(parts[2],parts[1]-1,parts[0]);}else{$scope.checked16=true; $scope._301fcreatinuria = $scope.info["0"].V301.split('/').reverse().join('-');}
        //var31
        $scope.validarcomodin($scope.info["0"].V31,"N");
        if($scope.escomodin == false){$scope._31vcolesteroltotal1 = Number($scope.info["0"].V31);}else{$scope.checked17=true; $scope._31vcolesteroltotal = $scope.info["0"].V31;}
        //var31.1
        $scope.validarcomodin($scope.info["0"].V311,"F");
        if($scope.escomodin == false){parts = $scope.info["0"].V311.split('/'); $scope._311fcolesteroltotal1 = new Date(parts[2],parts[1]-1,parts[0]);}else{$scope.checked18=true; $scope._311fcolesteroltotal = $scope.info["0"].V311.split('/').reverse().join('-');}
        //var32
        $scope.validarcomodin($scope.info["0"].V32,"N");
        if($scope.escomodin == false){$scope._32vhdl1 = Number($scope.info["0"].V32);}else{$scope.checked19=true; $scope._32vhdl = $scope.info["0"].V32;}
        //var32.1
        $scope.validarcomodin($scope.info["0"].V321,"F");
        if($scope.escomodin == false){parts = $scope.info["0"].V321.split('/'); $scope._321fhdl1 = new Date(parts[2],parts[1]-1,parts[0]);}else{$scope.checked20=true; $scope._321fhdl = $scope.info["0"].V321.split('/').reverse().join('-');}
        //var33
        $scope.validarcomodin($scope.info["0"].V33,"N");
        if($scope.escomodin == false){$scope._33vldl1 = Number($scope.info["0"].V33);}else{$scope.checked21=true; $scope._33vldl = $scope.info["0"].V33;}
        //var33.1
        $scope.validarcomodin($scope.info["0"].V331,"F");
        if($scope.escomodin == false){parts = $scope.info["0"].V331.split('/'); $scope._331fldl1 = new Date(parts[2],parts[1]-1,parts[0]);}else{$scope.checked22=true; $scope._331fldl = $scope.info["0"].V331.split('/').reverse().join('-');}
        //var34
        $scope.validarcomodin($scope.info["0"].V34,"N");
        if($scope.escomodin == false){$scope._34vpth1 = Number($scope.info["0"].V34);}else{$scope.checked23=true; $scope._34vpth = $scope.info["0"].V34;}
        //var34.1
        $scope.validarcomodin($scope.info["0"].V341,"F");
        if($scope.escomodin == false){parts = $scope.info["0"].V341.split('/'); $scope._341fpth1 = new Date(parts[2],parts[1]-1,parts[0]);}else{$scope.checked24=true; $scope._341fpth = $scope.info["0"].V341.split('/').reverse().join('-');}
        //var35
        $scope.validarcomodin($scope.info["0"].V35,"N");
        if($scope.escomodin == false){$scope._35vtasaglomerular1 = Number($scope.info["0"].V35);}else{$scope.checked25=true; $scope._35vtasaglomerular = $scope.info["0"].V35;}
        //var36
        $scope._36vieca = $scope.info["0"].V36;
        //var37
        $scope._37ara2 = $scope.info["0"].V37;
        //var38
        $scope._38erccualquierestadio = $scope.info["0"].V38;
        //var39
        $scope._39estadioerc = $scope.info["0"].V39;
        //var40
        $scope.validarcomodin($scope.info["0"].V40,"F");
        if($scope.escomodin == false){parts = $scope.info["0"].V40.split('/'); $scope._40festadioerc1 = new Date(parts[2],parts[1]-1,parts[0]);}else{$scope.checked26=true; $scope._40festadioerc = $scope.info["0"].V40.split('/').reverse().join('-');}
        //var41
        $scope._41perprogramaerc = $scope.info["0"].V41;
        //var42
        $scope.validarcomodin($scope.info["0"].V42,"N");
        if($scope.escomodin == false){$scope._42vtfg1 = Number($scope.info["0"].V42);}else{$scope.checked27=true; $scope._42vtfg = $scope.info["0"].V42;}
        //var36
      //TAB III
        //var43
        $scope._43iniciotrr = $scope.info["0"].V43;
        //var44
        $scope.validarcomodin($scope.info["0"].V44,"F");
        if($scope.escomodin == false){parts = $scope.info["0"].V44.split('/'); $scope._44finiciotrr1 = new Date(parts[2],parts[1]-1,parts[0]);}else{$scope.checked28=true; $scope._44finiciotrr = $scope.info["0"].V44.split('/').reverse().join('-');}
        //var45
        $scope.validarcomodin($scope.info["0"].V45,"F");
        if($scope.escomodin == false){parts = $scope.info["0"].V45.split('/'); $scope._45fingresoura1 = new Date(parts[2],parts[1]-1,parts[0]);}else{$scope.checked29=true; $scope._45fingresoura = $scope.info["0"].V45.split('/').reverse().join('-');}
        //var46
        $scope._46hemodialisis = $scope.info["0"].V46;
        //var47
        $scope.validarcomodin($scope.info["0"].V47,"N");
        if($scope.escomodin == false){$scope._47vdosisdialisis1 = Number($scope.info["0"].V47);}else{$scope.checked30=true; $scope._47vdosisdialisis = $scope.info["0"].V47;}
        //var48
        $scope.validarcomodin($scope.info["0"].V48,"N");
        if($scope.escomodin == false){if($scope._48vtotalhemodialisis1 == "0"){$scope._48vtotalhemodialisis1 = numeral($scope.info["0"].V48).format('$ 0,0[.]0');}}else{$scope.checked31=true; $scope._48vtotalhemodialisis = $scope.info["0"].V48;}
        //var49
        $scope._49dialisisperitonial = $scope.info["0"].V49;
        //var50
        $scope.validarcomodin($scope.info["0"].V50,"N");
        if($scope.escomodin == false){$scope._50vdosisdialisis1 = Number($scope.info["0"].V50);}else{$scope.checked32=true; $scope._50vdosisdialisis = $scope.info["0"].V50;}
        //var51
        $scope.validarcomodin($scope.info["0"].V51,"N");
        if($scope.escomodin == false){$scope._51vhorashemodialisis1 = Number($scope.info["0"].V51);}else{$scope.checked33=true; $scope._51vhorashemodialisis = $scope.info["0"].V51;}
        //var52
        $scope.validarcomodin($scope.info["0"].V52,"N");
        if($scope.escomodin == false){$scope._52vperitonitis1 = Number($scope.info["0"].V52);}else{$scope.checked34=true; $scope._52vperitonitis = $scope.info["0"].V52;}
        //var53
        $scope.validarcomodin($scope.info["0"].V53,"N");
        if($scope.escomodin == false){$scope._53vcostodp1 = Number($scope.info["0"].V53);}else{$scope.checked35=true; $scope._53vcostodp = $scope.info["0"].V53;}
        //var54
        $scope._54vacunahepatitisb = $scope.info["0"].V54;
        //var55
        $scope.validarcomodin($scope.info["0"].V55,"F");
        if($scope.escomodin == false){parts = $scope.info["0"].V55.split('/'); $scope._55finfeccionhepatitisb1 = new Date(parts[2],parts[1]-1,parts[0]);}else{$scope.checked36=true; $scope._55finfeccionhepatitisb = $scope.info["0"].V55.split('/').reverse().join('-');}
        //var56
        $scope.validarcomodin($scope.info["0"].V56,"F");
        if($scope.escomodin == false){parts = $scope.info["0"].V56.split('/'); $scope._56finfeccionhepatitisc1 = new Date(parts[2],parts[1]-1,parts[0]);}else{$scope.checked37=true; $scope._56finfeccionhepatitisc = $scope.info["0"].V56.split('/').reverse().join('-');}
        //var57
        $scope._57terapianodialitica = $scope.info["0"].V57;
        //var58
        $scope.validarcomodin($scope.info["0"].V58,"N");
        if($scope.escomodin == false){$scope._58vcostoterapiaerc1 = Number($scope.info["0"].V58);}else{$scope.checked38=true; $scope._58vcostoterapiaerc = $scope.info["0"].V58;}
        //var59
        $scope.validarcomodin($scope.info["0"].V59,"N");
        if($scope.escomodin == false){$scope._59vhemoglobina1 = Number($scope.info["0"].V59);}else{$scope.checked39=true; $scope._59vhemoglobina = $scope.info["0"].V59;}
        //var60
        $scope.validarcomodin($scope.info["0"].V60,"N");
        if($scope.escomodin == false){$scope._60valbuminaserica1 = Number($scope.info["0"].V60);}else{$scope.checked40=true; $scope._60valbuminaserica = $scope.info["0"].V60;}
      //TAB IV
        //var 61
        $scope.validarcomodin($scope.info["0"].V61,"N");
        if($scope.escomodin == false){$scope._61vfosforo1 = Number($scope.info["0"].V61);}else{$scope.checked41=true; $scope._61vfosforo = $scope.info["0"].V61;}
        //var 62
        $scope._62negrologiaerc5                    = $scope.info["0"].V62;
        //var 62.1
        $scope._621reportocanceractivo              = $scope.info["0"].V621;
        //var 62.2
        $scope._622reportoinfeccioncronica          = $scope.info["0"].V622;
        //var 62.3
        $scope._623reportocontratrasplante          = $scope.info["0"].V623;
        //var 62.4
        $scope._624reportocontratrasplante          = $scope.info["0"].V624;
        //var 62.5
        $scope._625reportocontratrasplante          = $scope.info["0"].V625;
        //var 62.6
        $scope._626reportoenfermedadcardiaca        = $scope.info["0"].V626;
        //var 62.7
          $scope._627reportoinfeccionporvih         = $scope.info["0"].V627;
        //var 62.8
        $scope._628reportoinfeccionporvhc           = $scope.info["0"].V628;
        //var 62.9
        $scope._629reportocontratrasplante          = $scope.info["0"].V629;
        //var 62.10
        $scope._6210reportoenfermedadcardiaca       = $scope.info["0"].V6210;
        //var 62.11
        $scope._6211reportocontratrasplante         = $scope.info["0"].V6211;
        //var 63
        $scope.validarcomodin($scope.info["0"].V63,"F");
        if($scope.escomodin == false){parts = $scope.info["0"].V63.split('/'); $scope._63flistatransplante1 = new Date(parts[2],parts[1]-1,parts[0]);}else{$scope.checked42=true; $scope._63flistatransplante = $scope.info["0"].V63.split('/').reverse().join('-');}
        //var 63.1
        $scope.validarcomodin($scope.info["0"].V63,"D");
        if($scope.escomodin == false){
            $scope.obteneripslista_espera('cargue');
        }else{
          $scope._631ipslistaespera                  = $scope.info["0"].V631;
        }
        //var 64
        $scope._64usuariorecibiotransrenal         = $scope.info["0"].V64;
        //var 65
        $scope.validarcomodin($scope.info["0"].V65,"D");
        if($scope.escomodin == false){
          //$scope.obtenereps("65");
		  $scope._65codepsrealizotransplante         = $scope.info["0"].V65;
        }else{
          $scope._65codepsrealizotransplante         = $scope.info["0"].V65;
        }
        //var 66
        $scope.validarcomodin($scope.info["0"].V66,"D");
        if($scope.escomodin == false){
          $scope.obteneripstransplante('cargue');
        }else{
          $scope._66codipsrealizotransplante         = $scope.info["0"].V66;
        }
      //TAB V
        //var67
        $scope._67tipodonante  = $scope.info["0"].V67;
        //var68
        $scope.validarcomodin($scope.info["0"].V68,"N");
        if($scope.escomodin == false){$scope._68costotransplante1 = Number($scope.info["0"].V68);}else{$scope.checked46=true; $scope._68costotransplante = $scope.info["0"].V68;}
        //var69
        $scope._69complicaciontransplante = $scope.info["0"].V67;;
        //var69.1
        $scope.validarcomodin($scope.info["0"].V691,"F");
        if($scope.escomodin == false){parts = $scope.info["0"].V691.split('/'); $scope._691finfeccioncitomegalovirus1 = new Date(parts[2],parts[1]-1,parts[0]);}else{$scope.checked47=true; $scope._691finfeccioncitomegalovirus = $scope.info["0"].V691.split('/').reverse().join('-');}
        //var69.2
        $scope.validarcomodin($scope.info["0"].V692,"F");
        if($scope.escomodin == false){parts = $scope.info["0"].V692.split('/'); $scope._692finfeccionhongos1 = new Date(parts[2],parts[1]-1,parts[0]);}else{$scope.checked48=true; $scope._692finfeccionhongos = $scope.info["0"].V692.split('/').reverse().join('-');}
        //var69.3
        $scope.validarcomodin($scope.info["0"].V693,"F");
        if($scope.escomodin == false){parts = $scope.info["0"].V693.split('/'); $scope._693finfecciontuberculosis1 = new Date(parts[2],parts[1]-1,parts[0]);}else{$scope.checked49=true; $scope._693finfecciontuberculosis = $scope.info["0"].V693.split('/').reverse().join('-');}
        //var69.4
        $scope.validarcomodin($scope.info["0"].V694,"F");
        if($scope.escomodin == false){parts = $scope.info["0"].V694.split('/'); $scope._694finfeccionvascular1 = new Date(parts[2],parts[1]-1,parts[0]);}else{$scope.checked50=true; $scope._694finfeccionvascular = $scope.info["0"].V694.split('/').reverse().join('-');}
        //var69.5
        $scope.validarcomodin($scope.info["0"].V695,"F");
        if($scope.escomodin == false){parts = $scope.info["0"].V695.split('/'); $scope._695finfeccionurologica1 = new Date(parts[2],parts[1]-1,parts[0]);}else{$scope.checked51=true; $scope._695finfeccionurologica = $scope.info["0"].V695.split('/').reverse().join('-');}
        //var69.6
        $scope.validarcomodin($scope.info["0"].V696,"F");
        if($scope.escomodin == false){parts = $scope.info["0"].V696.split('/'); $scope._696finfeccionheridaquirurgica1 = new Date(parts[2],parts[1]-1,parts[0]);}else{$scope.checked52=true; $scope._696finfeccionheridaquirurgica = $scope.info["0"].V696.split('/').reverse().join('-');}
        //var69.7
        $scope.validarcomodin($scope.info["0"].V697,"F");
        if($scope.escomodin == false){parts = $scope.info["0"].V697.split('/'); $scope._697fdiagnosticocancer1 = new Date(parts[2],parts[1]-1,parts[0]);}else{$scope.checked53=true; $scope._697fdiagnosticocancer = $scope.info["0"].V697.split('/').reverse().join('-');}
        //var70
        $scope.validarcomodin($scope.info["0"].V70,"N");
        if($scope.escomodin == false){$scope._70vinmunosupresores1 = Number($scope.info["0"].V70);}else{$scope.checked54=true; $scope._70vinmunosupresores = $scope.info["0"].V70;}
        //var70.1
        $scope._701reportemetilprednisolona = $scope.info["0"].V701;
        //var70.2
        $scope._702reporteazatioprina = $scope.info["0"].V702;
        //var70.3
        $scope._703reporteciclosporina = $scope.info["0"].V703;
        //var70.4
        $scope._704reportemicofenolato = $scope.info["0"].V704;
        //var70.5
        $scope._705reportetacrolimus = $scope.info["0"].V705;
        //var70.6
        $scope._706reporteprednisona = $scope.info["0"].V706;
        //var70.7
        //$scope.type707 = "cargue";
        $scope.coincidenciam1 = $scope.info["0"].V707;
        $scope.medicamento1('cargue');
      //TAB VI
        //var70.8
        $scope.coincidenciam2 = $scope.info["0"].V708;
        $scope.medicamento2('cargue');
        //var70.9
        $scope.coincidenciam3 = $scope.info["0"].V709;
        $scope.medicamento3('cargue');
        //var71
        $scope.validarcomodin($scope.info["0"].V71,"N");
        if($scope.escomodin == false){$scope._71episodiosrechazo1 = Number($scope.info["0"].V71);}else{$scope.checked58=true; $scope._71episodiosrechazo = $scope.info["0"].V71;}
        //var72
        $scope.validarcomodin($scope.info["0"].V72,"F");
        if($scope.escomodin == false){parts = $scope.info["0"].V72.split('/'); $scope._72rechazoinjerto1 = new Date(parts[2],parts[1]-1,parts[0]);}else{$scope.checked59=true; $scope._72rechazoinjerto = $scope.info["0"].V72.split('/').reverse().join('-');}
        //var73
        $scope.validarcomodin($scope.info["0"].V73,"F");
        if($scope.escomodin == false){parts = $scope.info["0"].V73.split('/'); $scope._73retornodialisis1 = new Date(parts[2],parts[1]-1,parts[0]);}else{$scope.checked60=true; $scope._73retornodialisis = $scope.info["0"].V73.split('/').reverse().join('-');}
        //var74
        $scope.validarcomodin($scope.info["0"].V74,"N");
        if($scope.escomodin == false){$scope._74transplanresrenales1 = Number($scope.info["0"].V74);}else{$scope.checked61=true; $scope._74transplanresrenales = $scope.info["0"].V74;}
        //var75
        $scope.validarcomodin($scope.info["0"].V75,"N");
        if($scope.escomodin == false){$scope._75terapiapostrasplante1 = Number($scope.info["0"].V75);}else{$scope.checked62=true; $scope._75terapiapostrasplante = $scope.info["0"].V75;}
        //var76
        $scope._76transplanresrenales = Number($scope.info["0"].V76);
        //var77
        if($scope._77costototal == ""){$scope._77costototal = numeral($scope.info["0"].V77).format('$ 0,0[.]0');}
        
		$scope.validarcomodin($scope.info["0"].V78,"D");
        if($scope.escomodin == false){
          $scope.obtenereps("78");
        }else{
          $scope._78codepsorigen         = $scope.info["0"].V78;
        }
        //var79
        $scope._79novedadreporteanterior =  $scope.info["0"].V79;
        //var80
        $scope._80causamuerte =  $scope.info["0"].V80;
        //var80.1
        $scope.validarcomodin($scope.info["0"].V801,"F");
        if($scope.escomodin == false){parts = $scope.info["0"].V801.split('/'); $scope._801fechamuerte1 = new Date(parts[2],parts[1]-1,parts[0]);}else{$scope.checked64=true; $scope._801fechamuerte = $scope.info["0"].V801.split('/').reverse().join('-');}
    })
  }


  $scope.tipofiltrorenal = function(){
    //tab I
      $( ".campo16" ).prop( "disabled", false );
      $scope.checked1 = false;
      $scope._16ips = "0";
      //17
      $( ".campo17" ).prop( "disabled", false );
      $scope.checked2 = false;
      $scope._17fnefroproteccion = "0";
      $scope.campo17 = false;
      //18
      $( ".campo18" ).prop( "disabled", false );
      $scope._18hipertensionarterial = "0";
      //19
      $( ".campo19" ).prop( "disabled", false );
      $scope.checked3 = false;
      $scope._19fhipertensionarterial = "0";
      $scope.campo19 = false;
      //19.1
      $( ".campo191" ).prop( "disabled", false );
      $scope.checked4 = false;
      $scope._191vcostohta = "0";
      $scope.campo191 = false;
      //20
      $( ".campo20" ).prop( "disabled", false );
      $scope._20diabetesmellitus = "0";
      //21
      $( ".campo21" ).prop( "disabled", false );
      $scope.checked5 = false;
      $scope._21fdiabetesmellitus = "0";
      $scope.campo21 = false;
      //21.1
      $( ".campo211" ).prop( "disabled", false );
      $scope.checked6 = false;
      $scope._211vcostodm = "0";
      $scope.campo211 = false;
      //22
      $( ".campo22" ).prop( "disabled", false );
      $scope._22etiologiaerc = "0";
      //23
      $scope._23vpeso                             = "";
      $scope._24vtalla                            = "";
      $scope.checked7=false;
      $scope._25vsistolica1                       = "";
      $scope._25vsistolica                        = "0";
      $scope.checked8=false;
      $scope._26vdiastlica1                       = "";
      $scope._26vdiastlica                        = "0";
      $scope.checked9=false;
      $scope._27vcreatinina1                      = "";
      $scope._27vcreatinina                       = "0";
      $scope.checked10=false;
      $scope._271fcreatinina1                     = "";
      $scope._271fcreatinina                      = "0";
      $scope.checked11=false;
      $scope._28vhemoglobinaglicosilada1          = "";
      $scope._28vhemoglobinaglicosilada           = "0";
      $scope.checked12=false;
      $scope._281fhemoglobinaglicosilada1         = "";
      $scope._281fhemoglobinaglicosilada          = "0";
      $scope.checked13=false;
      $scope._29valbuminuria1                     = "";
      $scope._29valbuminuria                      = "0";
      $scope.checked14=false;
      $scope._291falbuminuria1                    = "";
      $scope._291falbuminuria                     = "0";
    //tab II
      //40
      $scope.checked15=false;
      $scope._30vcreatinuria1                     = "";
      $scope._30vcreatinuria                      = "0";
      $scope.checked16=false;
      $scope._301fcreatinuria1                    = "";
      $scope._301fcreatinuria                     = "0";
      $scope.checked17=false;
      $scope._31vcolesteroltotal1                 = "";
      $scope._31vcolesteroltotal                  = "0";
      $scope.checked18=false;
      $scope._311fcolesteroltotal1                = "";
      $scope._311fcolesteroltotal                 = "0";
      $scope.checked19=false;
      $scope._32vhdl1                             = "";
      $scope._32vhdl                              = "0";
      $scope.checked20=false;
      $scope._321fhdl1                            = "";
      $scope._321fhdl                             = "0";
      $scope.checked21=false;
      $scope._33vldl1                             = "";
      $scope._33vldl                              = "0";
      $scope.checked22=false;
      $scope._331fldl1                            = "";
      $scope._331fldl                             = "0";
      $scope.checked23=false;
      $scope._34vpth1                             = "";
      $scope._34vpth                              = "0";
      $scope.checked24=false;
      $scope._341fpth1                            = "";
      $scope._341fpth                             = "0";
      $scope.checked25=false;
      $scope._35vtasaglomerular1                  = "";
      $scope._35vtasaglomerular                   = "0";
      $scope._36vieca                             = "0";
      $scope._37ara2                              = "0";
      $scope._38erccualquierestadio               = "0";
      $scope._39estadioerc                        = "0";
      $( ".campo40" ).prop( "disabled", false );
      $scope.checked26 = false;
      $scope._40festadioerc = "0";
      $scope.campo40 = false;
      //41
      $( ".campo41" ).prop( "disabled", false );
      $scope._41perprogramaerc = "0";
      //42
      $( ".campo42" ).prop( "disabled", false );
      $scope.checked27 = false;
      $scope._42vtfg = "0";
      $scope.campo42 = false;
    //tab III
      //43.
      $( ".campo43" ).prop( "disabled", false );
      $scope._43iniciotrr = "0";
      //44.
      $( ".campo44" ).prop( "disabled", false );
      $scope.checked28 = false;
      $scope._44finiciotrr = "0";
      $scope.campo44 = false;
      //45.
      $( ".campo45" ).prop( "disabled", false );
      $scope.checked29 = false;
      $scope._45fingresoura = "0";
      $scope.campo45 = false;
      //46.
      $( ".campo46" ).prop( "disabled", false );
      $scope._46hemodialisis = "0";
      //47.
      $( ".campo47" ).prop( "disabled", false );
      $scope.checked30 = false;
      $scope._47vdosisdialisis = "0";
      $scope.campo47 = false;
      //48.
      $( ".campo48" ).prop( "disabled", false );
      $scope.checked31 = false;
      $scope._48vtotalhemodialisis = "0";
      $scope.campo48 = false;
      //49.
      $( ".campo49" ).prop( "disabled", false );
      $scope._49dialisisperitonial = "0";
      //50
      $( ".campo50" ).prop( "disabled", false );
      $scope.checked32 = false;
      $scope._50vdosisdialisis = "0";
      $scope.campo50 = false;
      //51
      $( ".campo51" ).prop( "disabled", false );
      $scope.checked33 = false;
      $scope._51vhorashemodialisis = "0";
      $scope.campo51 = false;
      //52
      $( ".campo52" ).prop( "disabled", false );
      $scope.checked34 = false;
      $scope._52vperitonitis = "0";
      $scope.campo52 = false;
      //53
      $( ".campo53" ).prop( "disabled", false );
      $scope.checked35 = false;
      $scope._53vcostodp = "0";
      $scope.campo53 = false;
      //54.
      $( ".campo54" ).prop( "disabled", false );
      $scope._54vacunahepatitisb = "0";
      //55
      $( ".campo55" ).prop( "disabled", false );
      $scope.checked36 = false;
      $scope._55finfeccionhepatitisb = "0";
      $scope.campo55 = false;
      //56
      $( ".campo56" ).prop( "disabled", false );
      $scope.checked37 = false;
      $scope._56finfeccionhepatitisc = "0";
      $scope.campo56 = false;
      //57
      $( ".campo57" ).prop( "disabled", false );
      $scope._57terapianodialitica = "0";
      //58
      $( ".campo58" ).prop( "disabled", false );
      $scope.checked38 = false;
      $scope._58vcostoterapiaerc = "0";
      $scope.campo58 = false;
      //59
      $( ".campo59" ).prop( "disabled", false );
      $scope.checked39 = false;
      $scope._59vhemoglobina = "0";
      $scope.campo59 = false;
      //60
      $( ".campo60" ).prop( "disabled", false );
      $scope.checked40 = false;
      $scope._60valbuminaserica = "0";
      $scope.campo60 = false;
    //tab IV
      //61
      $( ".campo61" ).prop( "disabled", false );
      $scope.checked41 = false;
      $scope._61vfosforo = "0";
      $scope.campo61 = false;
      //62
      $( ".campo62" ).prop( "disabled", false );
      $scope._62negrologiaerc5 = "0";
      //62.1
      $( ".campo621" ).prop( "disabled", false );
      $scope._621reportocanceractivo = "0";
      //62.2
      $( ".campo622" ).prop( "disabled", false );
      $scope._622reportoinfeccioncronica = "0";
      //62.3
      $( ".campo623" ).prop( "disabled", false );
      $scope._623reportocontratrasplante = "0";
      //62.4
      $( ".campo624" ).prop( "disabled", false );
      $scope._624reportocontratrasplante = "0";
      //62.5
      $( ".campo625" ).prop( "disabled", false );
      $scope._625reportocontratrasplante = "0";
      //62.6
      $( ".campo626" ).prop( "disabled", false );
      $scope._626reportoenfermedadcardiaca = "0";
      //62.7
      $( ".campo627" ).prop( "disabled", false );
      $scope._627reportoinfeccionporvih = "0";
      //62.8
      $( ".campo628" ).prop( "disabled", false );
      $scope._628reportoinfeccionporvhc = "0";
      //62.9
      $( ".campo629" ).prop( "disabled", false );
      $scope._629reportocontratrasplante = "0";
      //62.10
      $( ".campo6210" ).prop( "disabled", false );
      $scope._6210reportoenfermedadcardiaca = "0";
      //62.11
      $( ".campo6211" ).prop( "disabled", false );
      $scope._6211reportocontratrasplante = "0";
      //63
      $( ".campo63" ).prop( "disabled", false );
      $scope.checked42 = false;
      $scope._63flistatransplante = "0";
      $scope.campo63 = false;
      //63.1
      $( ".campo631" ).prop( "disabled", false );
      $scope._631ipslistaespera = "0";
      //64
      $( ".campo64" ).prop( "disabled", false );
      $scope._64usuariorecibiotransrenal = "0";
      //65
      $( ".campo65" ).prop( "disabled", false );
      $scope._65codepsrealizotransplante = "0";
      //66
      $( ".campo66" ).prop( "disabled", false );
      $scope._66codipsrealizotransplante = "0";
      //tab V
      //67
      $( ".campo67" ).prop( "disabled", false );
      $scope._67tipodonante = "0";
      //68
      $( ".campo68" ).prop( "disabled", false );
      $scope.checked46 = false;
      $scope._68costotransplante = "0";
      $scope.campo68 = false;
      //69
      $( ".campo69" ).prop( "disabled", false );
      $scope._69complicaciontransplante = "0";
      //69.1
      $( ".campo691" ).prop( "disabled", false );
      $scope.checked47 = false;
      $scope._691finfeccioncitomegalovirus = "0";
      $scope.campo691 = false;
      //69.2
      $( ".campo692" ).prop( "disabled", false );
      $scope.checked48 = false;
      $scope._692finfeccionhongos = "0";
      $scope.campo692 = false;
      //69.3
      $( ".campo693" ).prop( "disabled", false );
      $scope.checked49 = false;
      $scope._693finfecciontuberculosis = "0";
      $scope.campo693 = false;
      //69.4
      $( ".campo694" ).prop( "disabled", false );
      $scope.checked50 = false;
      $scope._694finfeccionvascular = "0";
      $scope.campo694 = false;
      //69.5
      $( ".campo695" ).prop( "disabled", false );
      $scope.checked51 = false;
      $scope._695finfeccionurologica = "0";
      $scope.campo695 = false;
      //69.6
      $( ".campo696" ).prop( "disabled", false );
      $scope.checked52 = false;
      $scope._696finfeccionheridaquirurgica = "0";
      $scope.campo696 = false;
      //69.7
      $( ".campo697" ).prop( "disabled", false );
      $scope.checked53 = false;
      $scope._697fdiagnosticocancer = "0";
      $scope.campo697 = false;
      //70
      $( ".campo70" ).prop( "disabled", false );
      $scope.checked54 = false;
      $scope._70vinmunosupresores = "0";
      $scope.campo70 = false;
      //70.1
      $( ".campo701" ).prop( "disabled", false );
      $scope._701reportemetilprednisolona = "0";
      //70.2
      $( ".campo702" ).prop( "disabled", false );
      $scope._702reporteazatioprina = "0";
      //70.3
      $( ".campo703" ).prop( "disabled", false );
      $scope._703reporteciclosporina = "0";
      //70.4
      $( ".campo704" ).prop( "disabled", false );
      $scope._704reportemicofenolato = "0";
      //70.5
      $( ".campo705" ).prop( "disabled", false );
      $scope._705reportetacrolimus = "0";
      //70.6
      $( ".campo706" ).prop( "disabled", false );
      $scope._706reporteprednisona = "0";
      //70.7
      $( ".campo707" ).prop( "disabled", false );
      $scope._707medicamento1 = "0";
    //tab VI
      //70.8
      $( ".campo708" ).prop( "disabled", false );
      $scope._708medicamento2 = "0";
      //70.9
      $( ".campo709" ).prop( "disabled", false );
      $scope._709medicamento3 = "0";
      //71
      $( ".campo71" ).prop( "disabled", false );
      $scope.checked58 = false;
      $scope._71episodiosrechazo = "0";
      $scope.campo71 = false;
      //72
      $( ".campo72" ).prop( "disabled", false );
      $scope.checked59 = false;
      $scope._72rechazoinjerto = "0";
      $scope.campo72 = false;
      //73
      $( ".campo73" ).prop( "disabled", false );
      $scope.checked60 = false;
      $scope._73retornodialisis = "0";
      $scope.campo73 = false;
      //74
      $( ".campo74" ).prop( "disabled", false );
      $scope.checked61 = false;
      $scope._74transplanresrenales = "0";
      $scope.campo74 = false;
      //75
      $( ".campo75" ).prop( "disabled", false );
      $scope.checked62 = false;
      $scope._75terapiapostrasplante = "0";
      $scope.campo75 = false;
      //76
      $scope.campo76 = false;
      $scope._77costototal                       ="";

      $scope.checked63 = false;
      $scope._78codepsorigen1                   ="0";
      $scope._78codepsorigen                    ="0";

      $scope._79novedadreporteanterior          ="0";

      $scope._80causamuerte                     ="0";

      $scope.checked64 = false;
      $scope._801fechamuerte1                   ="";
      $scope._801fechamuerte                    ="0";

    if($scope.tipo == "S"){
      //tab I
      $( ".campo22" ).prop( "disabled", true );
      $scope._22etiologiaerc = "1";
      //tab II
      //40
      $( ".campo40" ).prop( "disabled", true );
      $scope.checked26 = true;
      $scope._40festadioerc = "1800-01-01";
      $scope.campo40 = true;
      //41
      $( ".campo41" ).prop( "disabled", true );
      $scope._41perprogramaerc = "1";
      //42
      $( ".campo42" ).prop( "disabled", true );
      $scope.checked27 = true;
      $scope._42vtfg = "9888";
      $scope.campo42 = true;
      //tab III
      //43.
      $( ".campo43" ).prop( "disabled", true );
      $scope._43iniciotrr = "98";
      //44.
      $( ".campo44" ).prop( "disabled", true );
      $scope.checked28 = true;
      $scope._44finiciotrr = "1845-01-01";
      $scope.campo44 = true;
      //45.
      $( ".campo45" ).prop( "disabled", true );
      $scope.checked29 = true;
      $scope._45fingresoura = "1845-01-01";
      $scope.campo45 = true;
      //46.
      $( ".campo46" ).prop( "disabled", true );
      $scope._46hemodialisis = "98";
      //47.
      $( ".campo47" ).prop( "disabled", true );
      $scope.checked30 = true;
      $scope._47vdosisdialisis = "98";
      $scope.campo47 = true;
      //48.
      $( ".campo48" ).prop( "disabled", true );
      $scope.checked31 = true;
      $scope._48vtotalhemodialisis = "98";
      $scope.campo48 = true;
      //49.
      $( ".campo49" ).prop( "disabled", true );
      $scope._49dialisisperitonial = "98";
      //50
      $( ".campo50" ).prop( "disabled", true );
      $scope.checked32 = true;
      $scope._50vdosisdialisis = "98";
      $scope.campo50 = true;
      //51
      $( ".campo51" ).prop( "disabled", true );
      $scope.checked33 = true;
      $scope._51vhorashemodialisis = "98";
      $scope.campo51 = true;
      //52
      $( ".campo52" ).prop( "disabled", true );
      $scope.checked34 = true;
      $scope._52vperitonitis = "98";
      $scope.campo52 = true;
      //53
      $( ".campo53" ).prop( "disabled", true );
      $scope.checked35 = true;
      $scope._53vcostodp = "98";
      $scope.campo53 = true;
      //54.
      $( ".campo54" ).prop( "disabled", true );
      $scope._54vacunahepatitisb = "98";
      //55
      $( ".campo55" ).prop( "disabled", true );
      $scope.checked36 = true;
      $scope._55finfeccionhepatitisb = "1845-01-01";
      $scope.campo55 = true;
      //56
      $( ".campo56" ).prop( "disabled", true );
      $scope.checked37 = true;
      $scope._56finfeccionhepatitisc = "1845-01-01";
      $scope.campo56 = true;
      //57
      $( ".campo57" ).prop( "disabled", true );
      $scope._57terapianodialitica = "98";
      //58
      $( ".campo58" ).prop( "disabled", true );
      $scope.checked38 = true;
      $scope._58vcostoterapiaerc = "98";
      $scope.campo58 = true;
      //59
      $( ".campo59" ).prop( "disabled", true );
      $scope.checked39 = true;
      $scope._59vhemoglobina = "98";
      $scope.campo59 = true;
      //60
      $( ".campo60" ).prop( "disabled", true );
      $scope.checked40 = true;
      $scope._60valbuminaserica = "98";
      $scope.campo60 = true;
      //tab IV
      //61
      $( ".campo61" ).prop( "disabled", true );
      $scope.checked41 = true;
      $scope._61vfosforo = "98";
      $scope.campo61 = true;
      //62
      $( ".campo62" ).prop( "disabled", true );
      $scope._62negrologiaerc5 = "98";
      //62.1
      $( ".campo621" ).prop( "disabled", true );
      $scope._621reportocanceractivo = "98";
      //62.2
      $( ".campo622" ).prop( "disabled", true );
      $scope._622reportoinfeccioncronica = "98";
      //62.3
      $( ".campo623" ).prop( "disabled", true );
      $scope._623reportocontratrasplante = "98";
      //62.4
      $( ".campo624" ).prop( "disabled", true );
      $scope._624reportocontratrasplante = "98";
      //62.5
      $( ".campo625" ).prop( "disabled", true );
      $scope._625reportocontratrasplante = "98";
      //62.6
      $( ".campo626" ).prop( "disabled", true );
      $scope._626reportoenfermedadcardiaca = "98";
      //62.7
      $( ".campo627" ).prop( "disabled", true );
      $scope._627reportoinfeccionporvih = "98";
      //62.8
      $( ".campo628" ).prop( "disabled", true );
      $scope._628reportoinfeccionporvhc = "98";
      //62.9
      $( ".campo629" ).prop( "disabled", true );
      $scope._629reportocontratrasplante = "98";
      //62.10
      $( ".campo6210" ).prop( "disabled", true );
      $scope._6210reportoenfermedadcardiaca = "98";
      //62.10
      $( ".campo6211" ).prop( "disabled", true );
      $scope._6211reportocontratrasplante = "98";
      //63
      $( ".campo63" ).prop( "disabled", true );
      $scope.checked42 = true;
      $scope._63flistatransplante = "1845-01-01";
      $scope.campo63 = true;
      //63.1
      $( ".campo631" ).prop( "disabled", true );
      $scope._631ipslistaespera = "98";
      //64
      $( ".campo64" ).prop( "disabled", true );
      $scope._64usuariorecibiotransrenal = "5";
      //65
      $( ".campo65" ).prop( "disabled", true );
      $scope._65codepsrealizotransplante = "98";
      //66
      $( ".campo66" ).prop( "disabled", true );
      $scope._66codipsrealizotransplante = "98";
      //tab V
      //67
      $( ".campo67" ).prop( "disabled", true );
      $scope._67tipodonante = "98";
      //68
      $( ".campo68" ).prop( "disabled", true );
      $scope.checked46 = true;
      $scope._68costotransplante = "98";
      $scope.campo68 = true;
      //69
      $( ".campo69" ).prop( "disabled", true );
      $scope._69complicaciontransplante = "98";
      //69.1
      $( ".campo691" ).prop( "disabled", true );
      $scope.checked47 = true;
      $scope._691finfeccioncitomegalovirus = "1845-01-01";
      $scope.campo691 = true;
      //69.2
      $( ".campo692" ).prop( "disabled", true );
      $scope.checked48 = true;
      $scope._692finfeccionhongos = "1845-01-01";
      $scope.campo692 = true;
      //69.3
      $( ".campo693" ).prop( "disabled", true );
      $scope.checked49 = true;
      $scope._693finfecciontuberculosis = "1845-01-01";
      $scope.campo693 = true;
      //69.4
      $( ".campo694" ).prop( "disabled", true );
      $scope.checked50 = true;
      $scope._694finfeccionvascular = "1845-01-01";
      $scope.campo694 = true;
      //69.5
      $( ".campo695" ).prop( "disabled", true );
      $scope.checked51 = true;
      $scope._695finfeccionurologica = "1845-01-01";
      $scope.campo695 = true;
      //69.6
      $( ".campo696" ).prop( "disabled", true );
      $scope.checked52 = true;
      $scope._696finfeccionheridaquirurgica = "1845-01-01";
      $scope.campo696 = true;
      //69.7
      $( ".campo697" ).prop( "disabled", true );
      $scope.checked53 = true;
      $scope._697fdiagnosticocancer = "1845-01-01";
      $scope.campo697 = true;
      //70
      $( ".campo70" ).prop( "disabled", true );
      $scope.checked54 = true;
      $scope._70vinmunosupresores = "98";
      $scope.campo70 = true;
      //70.1
      $( ".campo701" ).prop( "disabled", true );
      $scope._701reportemetilprednisolona = "98";
      //70.2
      $( ".campo702" ).prop( "disabled", true );
      $scope._702reporteazatioprina = "98";
      //70.3
      $( ".campo703" ).prop( "disabled", true );
      $scope._703reporteciclosporina = "98";
      //70.4
      $( ".campo704" ).prop( "disabled", true );
      $scope._704reportemicofenolato = "98";
      //70.5
      $( ".campo705" ).prop( "disabled", true );
      $scope._705reportetacrolimus = "98";
      //70.6
      $( ".campo706" ).prop( "disabled", true );
      $scope._706reporteprednisona = "98";
      //70.7
      $( ".campo707" ).prop( "disabled", true );
      $scope._707medicamento1 = "98";
      //tab VI
      //70.8
      $( ".campo708" ).prop( "disabled", true );
      $scope._708medicamento2 = "98";
      //70.9
      $( ".campo709" ).prop( "disabled", true );
      $scope._709medicamento3 = "98";
      //71
      $( ".campo71" ).prop( "disabled", true );
      $scope.checked58 = true;
      $scope._71episodiosrechazo = "98";
      $scope.campo71 = true;
      //72
      $( ".campo72" ).prop( "disabled", true );
      $scope.checked59 = true;
      $scope._72rechazoinjerto = "1845-01-01";
      $scope.campo72 = true;
      //73
      $( ".campo73" ).prop( "disabled", true );
      $scope.checked60 = true;
      $scope._73retornodialisis = "1845-01-01";
      $scope.campo73 = true;
      //74
      $( ".campo74" ).prop( "disabled", true );
      $scope.checked61 = true;
      $scope._74transplanresrenales = "98";
      $scope.campo74 = true;
      //75
      $( ".campo75" ).prop( "disabled", true );
      $scope.checked62 = true;
      $scope._75terapiapostrasplante = "98";
      $scope.campo75 = true;
      //76
      //$scope.campo76 = true;
    }
    else if($scope.tipo == "A"){
      //tab I
      //17
      $( ".campo17" ).prop( "disabled", true );
      $scope.checked2 = true;
      $scope._17fnefroproteccion = "1845-01-01";
      $scope.campo17 = true;
      //18
      $( ".campo18" ).prop( "disabled", true );
      $scope._18hipertensionarterial = "2";
      //19
      $( ".campo19" ).prop( "disabled", true );
      $scope.checked3 = true;
      $scope._19fhipertensionarterial = "1845-01-01";
      $scope.campo19 = true;
      //19.1
      $( ".campo191" ).prop( "disabled", true );
      $scope.checked4 = true;
      $scope._191vcostohta = "98";
      $scope.campo191 = true;
      //20
      $( ".campo20" ).prop( "disabled", true );
      $scope._20diabetesmellitus = "2";
      //21
      $( ".campo21" ).prop( "disabled", true );
      $scope.checked5 = true;
      $scope._21fdiabetesmellitus = "1845-01-01";
      $scope.campo21 = true;
      //21.1
      $( ".campo211" ).prop( "disabled", true );
      $scope.checked6 = true;
      $scope._211vcostodm = "98";
      $scope.campo211 = true;
      //tab V
      //70
      $( ".campo70" ).prop( "disabled", true );
      $scope.checked54 = true;
      $scope._70vinmunosupresores = "98";
      $scope.campo70 = true;
      //tab VI
      //76
      //$scope.campo76 = true;
    }else{}

    if($scope.desicion == "1"){
      $scope.infobasica = false;
      $scope.Inforegistro = false;
      $scope.campos = false;
    }
  }
  $scope.validaciones = function(){
    //Numero
    $scope.validarnumero($scope.v191,'v191');
    $scope.validarnumero($scope.v211,'v211');
    $scope.validarnumero($scope.v23 ,'v23');
    $scope.validarnumero($scope.v24 ,'v24');
    $scope.validarnumero($scope.v25 ,'v25');
    $scope.validarnumero($scope.v26 ,'v26');
    $scope.validarnumero($scope.v27 ,'v27');
    $scope.validarnumero($scope.v28 ,'v28');
    $scope.validarnumero($scope.v29 ,'v29');
    $scope.validarnumero($scope.v30 ,'v30');
    $scope.validarnumero($scope.v31 ,'v31');
    $scope.validarnumero($scope.v32 ,'v32');
    $scope.validarnumero($scope.v33 ,'v33');
    $scope.validarnumero($scope.v34 ,'v34');
    $scope.validarnumero($scope.v35 ,'v35');
    $scope.validarnumero($scope.v42 ,'v42');
    $scope.validarnumero($scope.v47 ,'v47');
    $scope.validarnumero($scope.v48 ,'v48');
    $scope.validarnumero($scope.v50 ,'v50');
    $scope.validarnumero($scope.v51 ,'v51');
    $scope.validarnumero($scope.v52 ,'v52');
    $scope.validarnumero($scope.v53 ,'v53');
    $scope.validarnumero($scope.v58 ,'v58');
    $scope.validarnumero($scope.v59 ,'v59');
    $scope.validarnumero($scope.v60 ,'v60');
    $scope.validarnumero($scope.v61 ,'v61');
    $scope.validarnumero($scope.v68 ,'v68');
    $scope.validarnumero($scope.v70 ,'v70');
    $scope.validarnumero($scope.v71 ,'v71');
    $scope.validarnumero($scope.v74 ,'v74');
    $scope.validarnumero($scope.v75 ,'v75');
    $scope.validarnumero($scope.v76 ,'v76');
    $scope.validarnumero($scope.v77 ,'v77');
    //select
    $scope.validarnumselect($scope.v16,'v16');
    $scope.validarnumselect($scope.v18,'v18');
    $scope.validarnumselect($scope.v20,'v20');
    $scope.validarnumselect($scope.v22,'v22');
    $scope.validarnumselect($scope.v36,'v36');
    $scope.validarnumselect($scope.v37,'v37');
    $scope.validarnumselect($scope.v38,'v38');
    $scope.validarnumselect($scope.v39,'v39');
    $scope.validarnumselect($scope.v41,'v41');
    $scope.validarnumselect($scope.v43,'v43');
    $scope.validarnumselect($scope.v46,'v46');
    $scope.validarnumselect($scope.v49,'v49');
    $scope.validarnumselect($scope.v54,'v54');
    $scope.validarnumselect($scope.v57,'v57');
    $scope.validarnumselect($scope.v62,'v62');
    $scope.validarnumselect($scope.v621,'v621');
    $scope.validarnumselect($scope.v622,'v622');
    $scope.validarnumselect($scope.v623,'v623');
    $scope.validarnumselect($scope.v624,'v624');
    $scope.validarnumselect($scope.v625,'v625');
    $scope.validarnumselect($scope.v626,'v626');
    $scope.validarnumselect($scope.v627,'v627');
    $scope.validarnumselect($scope.v628,'v628');
    $scope.validarnumselect($scope.v629,'v629');
    $scope.validarnumselect($scope.v6210,'v6210');
    $scope.validarnumselect($scope.v6211,'v6211');
    $scope.validarnumselect($scope.v631,'v631');
    $scope.validarnumselect($scope.v64,'v64');
    $scope.validarnumselect($scope.v65,'v65');
    $scope.validarnumselect($scope.v66,'v66');
    $scope.validarnumselect($scope.v67,'v67');
    $scope.validarnumselect($scope.v69,'v69');
    $scope.validarnumselect($scope.v701,'v701');
    $scope.validarnumselect($scope.v702,'v702');
    $scope.validarnumselect($scope.v703,'v703');
    $scope.validarnumselect($scope.v704,'v704');
    $scope.validarnumselect($scope.v705,'v705');
    $scope.validarnumselect($scope.v706,'v706');
    $scope.validarnumselect($scope.v707,'v707');
    $scope.validarnumselect($scope.v708,'v708');
    $scope.validarnumselect($scope.v709,'v709');
    $scope.validarnumselect($scope.v78,'v78');
    $scope.validarnumselect($scope.v79,'v79');
    $scope.validarnumselect($scope.v80,'v80');
    // campos de fecha
    $scope.validarfecha($scope.v17,'v17');
    $scope.validarfecha($scope.v19,'v19');
    $scope.validarfecha($scope.v21,'v21');
    $scope.validarfecha($scope.v271,'v271');
    $scope.validarfecha($scope.v281,'v281');
    $scope.validarfecha($scope.v291,'v291');
    $scope.validarfecha($scope.v301,'v301');
    $scope.validarfecha($scope.v311,'v311');
    $scope.validarfecha($scope.v321,'v321');
    $scope.validarfecha($scope.v331,'v331');
    $scope.validarfecha($scope.v341,'v341');
    $scope.validarfecha($scope.v40,'v40');
    $scope.validarfecha($scope.v44,'v44');
    $scope.validarfecha($scope.v45,'v45');
    $scope.validarfecha($scope.v55,'v55');
    $scope.validarfecha($scope.v56,'v56');
    $scope.validarfecha($scope.v63,'v63');
    $scope.validarfecha($scope.v691,'v691');
    $scope.validarfecha($scope.v692,'v692');
    $scope.validarfecha($scope.v693,'v693');
    $scope.validarfecha($scope.v694,'v694');
    $scope.validarfecha($scope.v695,'v695');
    $scope.validarfecha($scope.v696,'v696');
    $scope.validarfecha($scope.v697,'v697');
    $scope.validarfecha($scope.v72,'v72');
    $scope.validarfecha($scope.v73,'v73');
    $scope.validarfecha($scope.v801,'v801');
  }
  $scope.validarnumero = function(num,name){
    if(Number(num)<0 || num == "" || num == "0" || num == null){
      $scope.camposcorrectos = false;
      if ($(".destruir-"+name).length) {
        // si existe
      } else {
        $("."+name).append("<spam id='id-"+name+"'class='destruir-"+name+"' style='color:red;'>*</spam>");
        $(".-"+name).addClass( "requerido" );
      }
    }else{
      $(".-"+name).removeClass( "requerido" );
      $("spam").remove(".destruir-"+name);
    }
  }
  $scope.validarnumselect = function(val,name){
    if(val == "0"){
      $scope.camposcorrectos = false;
      if ($(".destruir-"+name).length) {
        // si existe
      } else {
        $("."+name).append("<spam id='id-"+name+"'class='destruir-"+name+"' style='color:red;'>*</spam>");
        $(".-"+name).addClass( "requerido" );
      }
    }else{
      $(".-"+name).removeClass( "requerido" );
      $("spam").remove(".destruir-"+name);
    }
    val = "0";
  }
  $scope.validarfecha = function(date,name){
    var RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
    if (((date.match(RegExPattern)) && (date!='') && (date != '0') && (date > $scope.fecha_nacimiento)) || ((date=='1800-01-01') || (date=='1845-01-01'))) {
      $(".-"+name).removeClass( "requerido" );
      $("spam").remove(".destruir-"+name);
    }
    else {
      $scope.camposcorrectos = false;
      if ($(".destruir-"+name).length) {
        // si existe
      } else {
        $("."+name).append("<spam id='id-"+name+"'class='destruir-"+name+"' style='color:red;'>*</spam>");
        $(".-"+name).addClass( "requerido" );
      }
    }
  }
  $scope.calculartfg = function(){
    if($scope.checked9 == false){var dato = 1 }else{var dato = 2 }
    if(dato == 1){
      $scope.seguir = true;
      if($scope._23vpeso == "" || $scope._23vpeso == null || Number($scope._23vpeso) == 0){
        $scope.seguir = false;
        notification.getNotification('warning', 'Falta campo 23. Peso', 'Notificacion');
      }
      if($scope._24vtalla == "" || $scope._24vtalla == null || Number($scope._24vtalla) == 0){
        $scope.seguir = false;
        notification.getNotification('warning', 'Falta campo 24. Talla', 'Notificacion');
      }
      if($scope._27vcreatinina1 == "" || $scope._27vcreatinina1 == null || Number($scope._27vcreatinina1) == 0){
        $scope.seguir = false;
        notification.getNotification('warning', 'Falta campo 27. Creatinina', 'Notificacion');
      }
      if($scope.seguir == true){
        var p = Number($scope._23vpeso);
        var e = CalcularEdad();
        var t = Number($scope._24vtalla);
        var c = Number($scope._27vcreatinina1);
        if($scope.generoCod == 'M'){var g = 1}else{var g = 0}
        if(e>17){
          if(g>0){
            $scope._35vtasaglomerular1 =   Math.round((((140-e)*p)/(72*c)));
          }else{
            $scope._35vtasaglomerular1 =   Math.round((((140-e)*p*0.85)/(72*c)));
          }
        }else{
          $scope._35vtasaglomerular1 =   Math.round(((0.55*t)/c));
        }
      }else{
        $scope._35vtasaglomerular1 = "";
      }
    }else{
      $scope._35vtasaglomerular1 = "";
    }
  }
  $scope.validaradjunto = function(){
    if($('#historiaclinicaadj').val() == ''){
      $scope.adjhistoriaclinica = false;
    }else{
      $scope.adjhistoriaclinica = true;
    }
  }
  $scope.validacionespeciales = function(campo,tipo,num,clase){
        switch (tipo) {
          case 1:
            if(num != undefined && num != " " && num != "" && num != null){
              var res = num.toString().split(".");
              if(res.length == 1){
              }else {
                if(res[1].length > 1){
                  $("."+clase).addClass("requerido");
                  notification.getNotification('error', 'El campo '+campo+'. debe tener maximo 1 decimal', 'Notificacion');
                  $scope.camposcorrectos = false;
                  }
                  else{
                    $("."+clase).removeClass("requerido");
                  }
              }
            }
            break;
          case 2:
            if(num != undefined && num != " " && num != "" && num != null){
              var res = num.toString().split(".");
              if(res.length == 1){
                $("."+clase).removeClass("requerido");
              }else {
                  $("."+clase).addClass("requerido");
                  notification.getNotification('error', 'El campo '+campo+'. NO debe tener algun decimal', 'Notificacion');
                  $scope.camposcorrectos = false;
              }
            }
            break;
          case 3:
              if(num == undefined || num == " " || num == "" || num == null){
                notification.getNotification('error', 'Debe proporcionar un numero de contacto del afiliado!', 'Notificacion');
                $("."+clase).addClass("requerido");
                $scope.camposcorrectos = false;
              }else{
                $("."+clase).removeClass("requerido");
              }
            break;
          default:
        }
  }
  function CalcularEdad() {
    var hoy = new Date();
    var cumpleanos = new Date($scope.fecha_nacimiento);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }
    return edad;
  }
  function focoCampo(val) {
    switch (val) {
      case '1':

      break;
      case '2':
      document.getElementById("sigtab2").focus();
      break;
      case '3':
      document.getElementById("sigtab3").focus();
      break;
      case '4':
      document.getElementById("sigtab4").focus();
      break;
      case '5':
      document.getElementById("sigtab5").focus();
      break;
      // case '6':
      //    document.getElementById("sigtab4").focus();
      //   break;
      default:

    }
    document.getElementById("sigtab2").focus();
  }


  $scope.InsertarDatosPacienteRenal = function(){
    $scope.camposcorrectos = true;
    //DATOS DEL AFILIADO
      if($scope.segundo_nombre==""){$scope.v2 = 'NONE';}else{$scope.v2 = $scope.segundo_nombre;}
      if($scope.segundo_apellido==""){$scope.v4 = 'NOAP';}else{$scope.v4 = $scope.segundo_apellido;}
      if($scope.telefono==""){$scope.v14 = "";}else{$scope.v14 = $scope.telefono;}
    //TAB I
      $scope.v16 = $scope._16ips;
      if($scope.checked2 == true){$scope.v17 = $('#_17fnefroproteccion').val();}else{$scope.v17 = $('#_17fnefroproteccion1').val();}
      $scope.v18 = $scope._18hipertensionarterial;
      if($scope.checked3 == true){$scope.v19 = $('#_19fhipertensionarterial').val();}else{$scope.v19 = $('#_19fhipertensionarterial1').val();}
      if($scope.checked4 == true){$scope.v191 = $('#_191vcostohta').val();}else{$scope.v191 = $('#_191vcostohta1').val();}
      $scope.v20 = $scope._20diabetesmellitus;
      if($scope.checked5 == true){$scope.v21 = $('#_21fdiabetesmellitus').val();}else{$scope.v21 = $('#_21fdiabetesmellitus1').val();}
      if($scope.checked6 == true){$scope.v211 = $('#_211vcostodm').val();}else{$scope.v211 = $('#_211vcostodm1').val();}
      $scope.v22 = $scope._22etiologiaerc;
      $scope.v23 = $scope._23vpeso;
      $scope.v24 = $scope._24vtalla;
      if($scope.checked7 == true){$scope.v25 = $('#_25vsistolica').val();}else{$scope.v25 = $('#_25vsistolica1').val();}
      if($scope.checked8 == true){$scope.v26 = $('#_26vdiastlica').val();}else{$scope.v26 = $('#_26vdiastlica1').val();}
      if($scope.checked9 == true){$scope.v27 = $('#_27vcreatinina').val();}else{$scope.v27 = $('#_27vcreatinina1').val();}
      if($scope.checked10 == true){$scope.v271 = $('#_271fcreatinina').val();}else{$scope.v271 = $('#_271fcreatinina1').val();}
      if($scope.checked11 == true){$scope.v28 = $('#_28vhemoglobinaglicosilada').val();}else{$scope.v28 = $('#_28vhemoglobinaglicosilada1').val();}
      if($scope.checked12 == true){$scope.v281 = $('#_281fhemoglobinaglicosilada').val();}else{$scope.v281 = $('#_281fhemoglobinaglicosilada1').val();}
      if($scope.checked13 == true){$scope.v29 = $('#_29valbuminuria').val();}else{$scope.v29 = $('#_29valbuminuria1').val();}
      if($scope.checked14 == true){$scope.v291 = $('#_291falbuminuria').val();}else{$scope.v291 = $('#_291falbuminuria1').val();}
    //TAB II
      if($scope.checked15 == true){$scope.v30 = $('#_30vcreatinuria').val();}else{$scope.v30 = $('#_30vcreatinuria1').val();}
      if($scope.checked16 == true){$scope.v301 = $('#_301fcreatinuria').val();}else{$scope.v301 = $('#_301fcreatinuria1').val();}
      if($scope.checked17 == true){$scope.v31 = $('#_31vcolesteroltotal').val();}else{$scope.v31 = $('#_31vcolesteroltotal1').val();}
      if($scope.checked18 == true){$scope.v311 = $('#_311fcolesteroltotal').val();}else{$scope.v311 = $('#_311fcolesteroltotal1').val();}
      if($scope.checked19 == true){$scope.v32 = $('#_32vhdl').val();}else{$scope.v32 = $('#_32vhdl1').val();}
      if($scope.checked20 == true){$scope.v321 = $('#_321fhdl').val();}else{$scope.v321 = $('#_321fhdl1').val();}
      if($scope.checked21 == true){$scope.v33 = $('#_33vldl').val();}else{$scope.v33 = $('#_33vldl1').val();}
      if($scope.checked22 == true){$scope.v331 = $('#_331fldl').val();}else{$scope.v331 = $('#_331fldl1').val();}
      if($scope.checked23 == true){$scope.v34 = $('#_34vpth').val();}else{$scope.v34 = $('#_34vpth1').val();}
      if($scope.checked24 == true){$scope.v341 = $('#_341fpth').val();}else{$scope.v341 = $('#_341fpth1').val();}
      if($scope.checked25 == true){$scope.v35 = $('#_35vtasaglomerular').val();}else{$scope.v35 = $('#_35vtasaglomerular1').val();}
      $scope.v36 = $scope._36vieca;
      $scope.v37 = $scope._37ara2;
      $scope.v38 = $scope._38erccualquierestadio;
      $scope.v39 = $scope._39estadioerc;
      if($scope.checked26 == true){$scope.v40 = $('#_40festadioerc').val();}else{$scope.v40 = $('#_40festadioerc1').val();}
      $scope.v41 = $scope._41perprogramaerc;
      if($scope.checked27 == true){$scope.v42 = $('#_42vtfg').val();}else{$scope.v42 = $('#_42vtfg1').val();}
    //TAB III
      $scope.v43 = $scope._43iniciotrr;
      if($scope.checked28 == true){$scope.v44 = $('#_44finiciotrr').val();}else{$scope.v44 = $('#_44finiciotrr1').val();}
      if($scope.checked29 == true){$scope.v45 = $('#_45fingresoura').val();}else{$scope.v45 = $('#_45fingresoura1').val();}
      $scope.v46 = $scope._46hemodialisis;
      if($scope.checked30 == true){$scope.v47 = $('#_47vdosisdialisis').val();}else{$scope.v47 = $('#_47vdosisdialisis1').val();}
      if($scope.checked31 == true){$scope.v48 = $('#_48vtotalhemodialisis').val();}else{$scope.v48 = $('#_48vtotalhemodialisis1').val().substr(2, 100).split(',').join('');}
      $scope.v49 = $scope._49dialisisperitonial;
      if($scope.checked32 == true){$scope.v50 = $('#_50vdosisdialisis').val();}else{$scope.v50 = $('#_50vdosisdialisis1').val();}
      if($scope.checked33 == true){$scope.v51 = $('#_51vhorashemodialisis').val();}else{$scope.v51 = $('#_51vhorashemodialisis1').val();}
      if($scope.checked34 == true){$scope.v52 = $('#_52vperitonitis').val();}else{$scope.v52 = $('#_52vperitonitis1').val();}
      if($scope.checked35 == true){$scope.v53 = $('#_53vcostodp').val();}else{$scope.v53 = $('#_53vcostodp1').val();}
      $scope.v54 = $scope._54vacunahepatitisb;
      if($scope.checked36 == true){$scope.v55 = $('#_55finfeccionhepatitisb').val();}else{$scope.v55 = $('#_55finfeccionhepatitisb1').val();}
      if($scope.checked37 == true){$scope.v56 = $('#_56finfeccionhepatitisc').val();}else{$scope.v56 = $('#_56finfeccionhepatitisc1').val();}
      $scope.v57 = $scope._57terapianodialitica;
      if($scope.checked38 == true){$scope.v58 = $('#_58vcostoterapiaerc').val();}else{$scope.v58 = $('#_58vcostoterapiaerc1').val();}
      if($scope.checked39 == true){$scope.v59 = $('#_59vhemoglobina').val();}else{$scope.v59 = $('#_59vhemoglobina1').val();}
      if($scope.checked40 == true){$scope.v60 = $('#_60valbuminaserica').val();}else{$scope.v60 = $('#_60valbuminaserica1').val();}
    //TAB IV
      if($scope.checked41 == true){$scope.v61 = $('#_61vfosforo').val();}else{$scope.v61 = $('#_61vfosforo1').val();}
      $scope.v62 = $scope._62negrologiaerc5;
      $scope.v621 = $scope._621reportocanceractivo;
      $scope.v622 = $scope._622reportoinfeccioncronica;
      $scope.v623 = $scope._623reportocontratrasplante;
      $scope.v624 = $scope._624reportocontratrasplante;
      $scope.v625 = $scope._625reportocontratrasplante;
      $scope.v626 = $scope._626reportoenfermedadcardiaca;
      $scope.v627 = $scope._627reportoinfeccionporvih;
      $scope.v628 = $scope._628reportoinfeccionporvhc;
      $scope.v629 = $scope._629reportocontratrasplante;
      $scope.v6210 = $scope._6210reportoenfermedadcardiaca;
      $scope.v6211 = $scope._6211reportocontratrasplante;
      if($scope.checked42 == true){$scope.v63 = $('#_63flistatransplante').val();}else{$scope.v63 = $('#_63flistatransplante1').val();}
      $scope.v631 = $scope._631ipslistaespera;
      $scope.v64 = $scope._64usuariorecibiotransrenal;
      $scope.v65 = $scope._65codepsrealizotransplante;
      $scope.v66 = $scope._66codipsrealizotransplante;
    //TAB V
      $scope.v67 = $scope._67tipodonante;
      if($scope.checked46 == true){$scope.v68 = $('#_68costotransplante').val();}else{$scope.v68 = $('#_68costotransplante1').val();}
      $scope.v69 = $scope._69complicaciontransplante;
      if($scope.checked47 == true){$scope.v691 = $('#_691finfeccioncitomegalovirus').val();}else{$scope.v691 = $('#_691finfeccioncitomegalovirus1').val();}
      if($scope.checked48 == true){$scope.v692 = $('#_692finfeccionhongos').val();}else{$scope.v692 = $('#_692finfeccionhongos1').val();}
      if($scope.checked49 == true){$scope.v693 = $('#_693finfecciontuberculosis').val();}else{$scope.v693 = $('#_693finfecciontuberculosis1').val();}
      if($scope.checked50 == true){$scope.v694 = $('#_694finfeccionvascular').val();}else{$scope.v694 = $('#_694finfeccionvascular1').val();}
      if($scope.checked51 == true){$scope.v695 = $('#_695finfeccionurologica').val();}else{$scope.v695 = $('#_695finfeccionurologica1').val();}
      if($scope.checked52 == true){$scope.v696 = $('#_696finfeccionheridaquirurgica').val();}else{$scope.v696 = $('#_696finfeccionheridaquirurgica1').val();}
      if($scope.checked53 == true){$scope.v697 = $('#_697fdiagnosticocancer').val();}else{$scope.v697 = $('#_697fdiagnosticocancer1').val();}
      if($scope.checked54 == true){$scope.v70 = $('#_70vinmunosupresores').val();}else{$scope.v70 = $('#_70vinmunosupresores1').val();}
      $scope.v701 = $scope._701reportemetilprednisolona;
      $scope.v702 = $scope._702reporteazatioprina;
      $scope.v703 = $scope._703reporteciclosporina;
      $scope.v704 = $scope._704reportemicofenolato;
      $scope.v705 = $scope._705reportetacrolimus;
      $scope.v706 = $scope._706reporteprednisona;
      $scope.v707 = $scope._707medicamento1;
    //TAB VI
      $scope.v708 = $scope._708medicamento2;
      $scope.v709 = $scope._709medicamento3;
      if($scope.checked58 == true){$scope.v71 = $('#_71episodiosrechazo').val();}else{$scope.v71 = $('#_71episodiosrechazo1').val();}
      if($scope.checked59 == true){$scope.v72 = $('#_72rechazoinjerto').val();}else{$scope.v72 = $('#_72rechazoinjerto1').val();}
      if($scope.checked60 == true){$scope.v73 = $('#_73retornodialisis').val();}else{$scope.v73 = $('#_73retornodialisis1').val();}
      if($scope.checked61 == true){$scope.v74 = $('#_74transplanresrenales').val();}else{$scope.v74 = $('#_74transplanresrenales1').val();}
      if($scope.checked62 == true){$scope.v75 = $('#_75terapiapostrasplante').val();}else{$scope.v75 = $('#_75terapiapostrasplante1').val();}
      $scope.v76 = $scope._76transplanresrenales;
      $scope.v77 = $scope._77costototal.substr(2, 100).split(',').join('');
      $scope.v78 = $scope._78codepsorigen;
      $scope.v79 = $scope._79novedadreporteanterior;
      $scope.v80 = $scope._80causamuerte;
      if($scope.checked64 == true){$scope.v801 = $('#_801fechamuerte').val();}else{$scope.v801 = $('#_801fechamuerte1').val();}
    $scope.validaciones();
    $scope.validacionespeciales()
    $scope.validacionespeciales(23,1,$scope._23vpeso,'-v23');
    $scope.validacionespeciales(24,2,$scope._24vtalla,'-v24');
    $scope.validacionespeciales(47,1,$scope._47vdosisdialisis1,'-v47');
    $scope.validacionespeciales(50,1,$scope._50vdosisdialisis1,'-v50')
    $scope.validacionespeciales(60,1,$scope._60valbuminaserica1,'-v60')
    $scope.validacionespeciales(61,1,$scope._61vfosforo1,'-v61')
    $scope.validacionespeciales(14,3,$scope.telefono,'-tel14');
    if($scope.camposcorrectos == true){
    $scope.validaradjunto();
    if($scope.adjhistoriaclinica == true && $scope.historia == false) {
        var anexo = new FormData($("#historiaclinica")[0]);
        var filename = $('input[type=file]').val();
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        dd<10?dd='0'+dd:dd=dd
        mm<10?mm='0'+mm:mm=mm 
        $scope.ext = filename.split('.').pop();
        $scope.tipodocumento = $scope.tipo_documento;
        $scope.documentoa = $scope.documento;
        $scope.ftp = $PATH_FILE;
        $scope.folder = "ALTOCOSTO/AUDITORIA/";
        $scope.nuevonombre = '53_'+$scope.tipodocumento+"_"+$scope.documento+"_"+ dd + mm + yyyy+"."+$scope.ext;
        $.ajax({
          url: "php/uploadanexo.php",
          type: "POST",
          data: anexo,
          contentType: false,
          processData: false,
          dataType: 'json'
        }).done(function(data) {
          if(data == "1"){
              $scope.insert();
          }
          else{
            notification.getNotification('warning', 'Error al subir la historia clinica, Por favor intentelo nuevamente!', 'Notificacion');
          }
        })
      }
      else if ($scope.historia == true){
        $scope.insert();
      }else{
        notification.getNotification('warning', 'Por favor adjunte la historia clinica del afiliado!', 'Notificacion');
      }
    }
    else{
      notification.getNotification('warning', 'Por favor complete los campos requeridos', 'Notificacion');
    }
  }
  $scope.formatcurrency = function(variable){
    switch (variable) {
      case 48:
          $scope._48vtotalhemodialisis1 = numeral($scope._48vtotalhemodialisis1).format('$ 0,0[.]0');
        break;
      case 77:
          $scope._77costototal = numeral($scope._77costototal).format('$ 0,0[.]0');
        break;
      default:

    }
    $scope._77costototal = numeral($scope._77costototal).format('$ 0,0[.]0');
  }
  $scope.insert = function(){
    $scope.Array = JSON.stringify({
      'V_PV1':$scope.primer_nombre,'V_PV2':$scope.v2,'V_PV3':$scope.primer_apellido,'V_PV4':$scope.v4,'V_PV5':$scope.tipo_documento,'V_PV6': $scope.documento,'V_PV7':$scope.fecha_nacimiento,'V_PV8':$scope.generoCod,'V_PV9':$scope.regimenCod,
      'V_PV10':'CCF055','V_PV11':$scope.etnia,'V_PV12':Number($scope.codgrupopo_blacional),'V_PV13':$scope.municipio,'V_PV14':$scope.v14,'V_PV15':$scope.fecha_afiliacion,'V_PV16':$scope.v16,'V_PV17':$scope.v17,'V_PV18':Number($scope.v18),
      'V_PV19': $scope.v19,'V_PV191': Number($scope.v191),'V_PV20':Number($scope.v20),'V_PV21': $scope.v21,'V_PV211':Number($scope.v211),'V_PV22':Number($scope.v22),'V_PV23':Number($scope.v23),'V_PV24':Number($scope.v24),'V_PV25':Number($scope.v25),
      'V_PV26': Number($scope.v26),'V_PV27': Number($scope.v27),'V_PV271':$scope.v271,'V_PV28':Number($scope.v28),'V_PV281':$scope.v281,'V_PV29':Number($scope.v29),'V_PV291':$scope.v291,'V_PV30':Number($scope.v30),'V_PV301':$scope.v301,
      'V_PV31':Number($scope.v31),'V_PV311':$scope.v311,'V_PV32':Number($scope.v32),'V_PV321':$scope.v321,'V_PV33':Number($scope.v33),'V_PV331':$scope.v331,'V_PV34':Number($scope.v34),'V_PV341':$scope.v341,'V_PV35':Number($scope.v35),'V_PV36':Number($scope.v36),
      'V_PV37':Number($scope.v37),'V_PV38':Number($scope.v38),'V_PV39':Number($scope.v39),'V_PV40':$scope.v40,'V_PV41':Number($scope.v41),'V_PV42':Number($scope.v42),'V_PV43':Number($scope.v43),'V_PV44':$scope.v44,'V_PV45':$scope.v45,'V_PV46':Number($scope.v46),
      'V_PV47':Number($scope.v47),'V_PV48':Number($scope.v48),'V_PV49':Number($scope.v49),'V_PV50':Number($scope.v50),'V_PV51':Number($scope.v51),'V_PV52':Number($scope.v53),'V_PV53':Number($scope.v53),'V_PV54':Number($scope.v54),'V_PV55':$scope.v55,
      'V_PV56':$scope.v56,'V_PV57':Number($scope.v57),'V_PV58':Number($scope.v58),'V_PV59':Number($scope.v59),'V_PV60':Number($scope.v60),'V_PV61':Number($scope.v61),'V_PV62':Number($scope.v62),'V_PV621':Number($scope.v621),'V_PV622':Number($scope.v622),
      'V_PV623':Number($scope.v623),'V_PV624':Number($scope.v624),'V_PV625':Number($scope.v625),'V_PV626':Number($scope.v626),'V_PV627':Number($scope.v627),'V_PV628':Number($scope.v628),'V_PV629':Number($scope.v629),'V_PV6210':Number($scope.v6210),
      'V_PV6211':Number($scope.v6211),'V_PV63':$scope.v63,'V_PV631':$scope.v631,'V_PV64':Number($scope.v64),'V_PV65':$scope.v65,'V_PV66':$scope.v66,'V_PV67':Number($scope.v67),'V_PV68':Number($scope.v68),'V_PV69':Number($scope.v69),'V_PV691':$scope.v691,
      'V_PV692':$scope.v692,'V_PV693':$scope.v693,'V_PV694':$scope.v694,'V_PV695':$scope.v695,'V_PV696':$scope.v696,'V_PV697':$scope.v697,'V_PV70':Number($scope.v70),'V_PV701':Number($scope.v701),'V_PV702':Number($scope.v702),'V_PV703':Number($scope.v703),
      'V_PV704':Number($scope.v704),'V_PV705':Number($scope.v705),'V_PV706':Number($scope.v706),'V_PV707':$scope.v707,'V_PV708':$scope.v708,'V_PV709':$scope.v709,'V_PV71':Number($scope.v71),'V_PV72':$scope.v72,'V_PV73':$scope.v73,'V_PV74':Number($scope.v74),
      'V_PV75':Number($scope.v75),'V_PV76':Number($scope.v76),'V_PV77':Number($scope.v77),'V_PV78':$scope.v78,'V_PV79':Number($scope.v79),'V_PV80':Number($scope.v80),'V_PV801':$scope.v801
    });
    $scope.arraytemp = JSON.parse($scope.Array);
    $scope.json = '['+$scope.Array+']'

    renalHttp.InsertarDatosPacienteRenal($scope.json,$scope.tipo).then(function (response) {
      $scope.validacion = response.data[response.data.length-1].validacion;
      $scope.respuesta = response.data[response.data.length-2].respuesta;
      if(Number($scope.validacion) == 0 ){
        notification.getNotification('success', 'Registro validado Exitosamente!', 'Notificacion');
        $scope.limpiar();
      }else{
        $scope.cod = response.data["0"].Codigo;
        $scope.nom = response.data["0"].Descripcion;
        $scope.var = response.data["0"].Variable;
        $scope.ValidarSoporte();
        if(Number($scope.var) < 30){ var range = 1; }
        else if(Number($scope.var) < 43){ var range = 2; }
        else if(Number($scope.var) < 61){ var range = 3; }
        else if(Number($scope.var) < 67){ var range = 4; }
        else if(Number($scope.var) < 70.8){ var range = 5; }
        else{ var range = 6; }
        $scope.setTab(range);
        $scope.ValidarSoporte();
        notification.getNotification('error', 'Error: '+$scope.cod +' - '+$scope.nom, 'Notificacion');
      }
    })
  }
  $scope.ValidarSoporte = function(){
    renalHttp.BuscarAfiliado($scope.tipodoc,$scope.identificacion,$scope.resolucion).then(function (response) {
      $scope.infoSoporte = response.data;
      if($scope.infoSoporte["0"].Historia == "false"){
          $scope.historia = false;
      }else{
          $scope.historia = true;
          $scope.RutaHistoria = $scope.infoSoporte["0"].Ruta;
      }
    })
  }
  $scope.habilitaradjunto = function(){
    //$scope.infoSoporte["0"].Historia = "true";
    $scope.historia = false;
  }
  $scope.limpiarvalidacion = function(name){
    $(".-"+name).removeClass( "requerido" );
    $("spam").remove(".destruir-"+name);
  }
  $scope.reiniciovalidaciones = function(){
    $scope.limpiarvalidacion('v16');
    $scope.limpiarvalidacion('v18');
    $scope.limpiarvalidacion('v20');
    $scope.limpiarvalidacion('v22');
    $scope.limpiarvalidacion('v36');
    $scope.limpiarvalidacion('v37');
    $scope.limpiarvalidacion('v38');
    $scope.limpiarvalidacion('v39');
    $scope.limpiarvalidacion('v41');
    $scope.limpiarvalidacion('v43');
    $scope.limpiarvalidacion('v46');
    $scope.limpiarvalidacion('v49');
    $scope.limpiarvalidacion('v54');
    $scope.limpiarvalidacion('v57');
    $scope.limpiarvalidacion('v62');
    $scope.limpiarvalidacion('v621');
    $scope.limpiarvalidacion('v622');
    $scope.limpiarvalidacion('v623');
    $scope.limpiarvalidacion('v624');
    $scope.limpiarvalidacion('v625');
    $scope.limpiarvalidacion('v626');
    $scope.limpiarvalidacion('v627');
    $scope.limpiarvalidacion('v628');
    $scope.limpiarvalidacion('v629');
    $scope.limpiarvalidacion('v6210');
    $scope.limpiarvalidacion('v6211');
    $scope.limpiarvalidacion('v631');
    $scope.limpiarvalidacion('v64');
    $scope.limpiarvalidacion('v65');
    $scope.limpiarvalidacion('v66');
    $scope.limpiarvalidacion('v67');
    $scope.limpiarvalidacion('v69');
    $scope.limpiarvalidacion('v701');
    $scope.limpiarvalidacion('v702');
    $scope.limpiarvalidacion('v703');
    $scope.limpiarvalidacion('v704');
    $scope.limpiarvalidacion('v705');
    $scope.limpiarvalidacion('v706');
    $scope.limpiarvalidacion('v707');
    $scope.limpiarvalidacion('v708');
    $scope.limpiarvalidacion('v709');
    $scope.limpiarvalidacion('v78');
    $scope.limpiarvalidacion('v79');
    $scope.limpiarvalidacion('v80');

    $scope.limpiarvalidacion('v191');
    $scope.limpiarvalidacion('v211');
    $scope.limpiarvalidacion('v23');
    $scope.limpiarvalidacion('v24');
    $scope.limpiarvalidacion('v25');
    $scope.limpiarvalidacion('v26');
    $scope.limpiarvalidacion('v27');
    $scope.limpiarvalidacion('v28');
    $scope.limpiarvalidacion('v29');
    $scope.limpiarvalidacion('v30');
    $scope.limpiarvalidacion('v31');
    $scope.limpiarvalidacion('v32');
    $scope.limpiarvalidacion('v33');
    $scope.limpiarvalidacion('v34');
    $scope.limpiarvalidacion('v35');
    $scope.limpiarvalidacion('v42');
    $scope.limpiarvalidacion('v47');
    $scope.limpiarvalidacion('v48');
    $scope.limpiarvalidacion('v50');
    $scope.limpiarvalidacion('v51');
    $scope.limpiarvalidacion('v52');
    $scope.limpiarvalidacion('v53');
    $scope.limpiarvalidacion('v58');
    $scope.limpiarvalidacion('v59');
    $scope.limpiarvalidacion('v60');
    $scope.limpiarvalidacion('v61');
    $scope.limpiarvalidacion('v68');
    $scope.limpiarvalidacion('v70');
    $scope.limpiarvalidacion('v71');
    $scope.limpiarvalidacion('v74');
    $scope.limpiarvalidacion('v75');
    $scope.limpiarvalidacion('v76');
    $scope.limpiarvalidacion('v77');

    $scope.limpiarvalidacion('v17');
    $scope.limpiarvalidacion('v19');
    $scope.limpiarvalidacion('v21');
    $scope.limpiarvalidacion('v271');
    $scope.limpiarvalidacion('v281');
    $scope.limpiarvalidacion('v291');
    $scope.limpiarvalidacion('v301');
    $scope.limpiarvalidacion('v311');
    $scope.limpiarvalidacion('v321');
    $scope.limpiarvalidacion('v331');
    $scope.limpiarvalidacion('v341');
    $scope.limpiarvalidacion('v40');
    $scope.limpiarvalidacion('v44');
    $scope.limpiarvalidacion('v45');
    $scope.limpiarvalidacion('v55');
    $scope.limpiarvalidacion('v56');
    $scope.limpiarvalidacion('v63');
    $scope.limpiarvalidacion('v691');
    $scope.limpiarvalidacion('v692');
    $scope.limpiarvalidacion('v693');
    $scope.limpiarvalidacion('v694');
    $scope.limpiarvalidacion('v695');
    $scope.limpiarvalidacion('v696');
    $scope.limpiarvalidacion('v697');
    $scope.limpiarvalidacion('v72');
    $scope.limpiarvalidacion('v73');
    $scope.limpiarvalidacion('v801');

  }
  $scope.limpiar = function(){
    $scope.reiniciovalidaciones();
    $scope.infobasica = true;
    $scope.campos = true;
    $scope.Inforegistro = true;
    $scope.tipodoc = "0";
    $scope.identificacion = "";
    $scope.tipo = "0"
    $scope.tab = 1;
    $scope.campo1 = false;
    //variables tab I
      $scope._16ips                               = "0";
      $scope._17fnefroproteccion1                 = "";
      $scope._17fnefroproteccion                  = "0";

      $scope._18hipertensionarterial              = "0";
      $scope._19fhipertensionarterial1            = "";
      $scope._19fhipertensionarterial             = "0";

      $scope._191vcostohta1                       = "";
      $scope._191vcostohta                        = "0";
      $scope._20diabetesmellitus                  = "0";

      $scope._21fdiabetesmellitus1                = "";
      $scope._21fdiabetesmellitus                 = "0";
      $scope._211vcostodm1                        = "";
      $scope._211vcostodm                         = "0";

      $scope._22etiologiaerc                      = "0";
      $scope._23vpeso                             = "";
      $scope._24vtalla                            = "";

      $scope._25vsistolica1                       = "";
      $scope._25vsistolica                        = "0";
      $scope._26vdiastlica1                       = "";
      $scope._26vdiastlica                        = "0";

      $scope._27vcreatinina1                      = "";
      $scope._27vcreatinina                       = "0";
      $scope._271fcreatinina1                     = "";
      $scope._271fcreatinina                      = "0";

      $scope._28vhemoglobinaglicosilada1          = "";
      $scope._28vhemoglobinaglicosilada           = "0";
      $scope._281fhemoglobinaglicosilada1         = "";
      $scope._281fhemoglobinaglicosilada          = "0";

      $scope._29valbuminuria1                     = "";
      $scope._29valbuminuria                      = "0";
      $scope._291falbuminuria1                    = "";
      $scope._291falbuminuria                     = "0";

    //variables tab II
      $scope._30vcreatinuria1                     = "";
      $scope._30vcreatinuria                      = "0";
      $scope._301fcreatinuria1                    = "";
      $scope._301fcreatinuria                     = "0";

      $scope._31vcolesteroltotal1                 = "";
      $scope._31vcolesteroltotal                  = "0";
      $scope._311fcolesteroltotal1                = "";
      $scope._311fcolesteroltotal                 = "0";

      $scope._32vhdl1                             = "";
      $scope._32vhdl                              = "0";
      $scope._321fhdl1                            = "";
      $scope._321fhdl                             = "0";

      $scope._33vldl1                             = "";
      $scope._33vldl                              = "0";
      $scope._331fldl1                            = "";
      $scope._331fldl                             = "0";

      $scope._34vpth1                             = "";
      $scope._34vpth                              = "0";
      $scope._341fpth1                            = "";
      $scope._341fpth                             = "0";

      $scope._35vtasaglomerular1                  = "";
      $scope._35vtasaglomerular                   = "0";
      $scope._36vieca                             = "0";

      $scope._37ara2                              = "0";
      $scope._38erccualquierestadio               = "0";

      $scope._39estadioerc                        = "0";
      $scope._40festadioerc1                      = "";
      $scope._40festadioerc                       = "0"

      $scope._41perprogramaerc                    = "0";
      $scope._42vtfg1                             = "";
      $scope._42vtfg                              = "0"

    //variables tab III
      $scope._43iniciotrr                         = "0";
      $scope._44finiciotrr1                       = "";
      $scope._44finiciotrr                        = "0";

      $scope._45fingresoura1                      = "";
      $scope._45fingresoura                       = "0";
      $scope._46hemodialisis                      = "0";

      $scope._47vdosisdialisis1                   = "";
      $scope._47vdosisdialisis                    = "0";
      $scope._48vtotalhemodialisis1               = "";
      $scope._48vtotalhemodialisis                = "0";

      $scope._49dialisisperitonial                = "0";
      $scope._50vdosisdialisis1                   = "";
      $scope._50vdosisdialisis                    = "0";

      $scope._51vhorashemodialisis1               = "";
      $scope._51vhorashemodialisis                = "0";
      $scope._52vperitonitis1                     = "";
      $scope._52vperitonitis                      = "0";

      $scope._53vcostodp1                         = "";
      $scope._53vcostodp                          = "0";
      $scope._54vacunahepatitisb                  = "0";

      $scope._55finfeccionhepatitisb1             = "";
      $scope._55finfeccionhepatitisb              = "0";
      $scope._56finfeccionhepatitisc1             = "";
      $scope._56finfeccionhepatitisc              = "0";

      $scope._57terapianodialitica                = "0";
      $scope._58vcostoterapiaerc1                 = "";
      $scope._58vcostoterapiaerc                  = "0";

      $scope._59vhemoglobina1                     = "";
      $scope._59vhemoglobina                      = "0";
      $scope._60valbuminaserica1                  = "";
      $scope._60valbuminaserica                   = "0";

    //variables tab IV
      $scope._61vfosforo1                         = "";
      $scope._61vfosforo                          = "0";
      $scope._62negrologiaerc5                    = "0";

      $scope._621reportocanceractivo              = "0";
      $scope._622reportoinfeccioncronica          = "0";

      $scope._623reportocontratrasplante          = "0";
      $scope._624reportocontratrasplante          = "0";

      $scope._625reportocontratrasplante          = "0";
      $scope._626reportoenfermedadcardiaca        = "0";

      $scope._627reportoinfeccionporvih           = "0";
      $scope._628reportoinfeccionporvhc           = "0";

      $scope._629reportocontratrasplante          = "0";
      $scope._6210reportoenfermedadcardiaca       = "0";

      $scope._6211reportocontratrasplante         = "0";
      $scope._63flistatransplante1                = "";
      $scope._63flistatransplante                 = "0";

      $scope._631ipslistaespera                   = "0";
      $scope._64usuariorecibiotransrenal          = "0";

      $scope._65codepsrealizotransplante          = "0";
      $scope._66codipsrealizotransplante          = "0";

    //variables tab V
      $scope._67tipodonante                     ="0";
      $scope._68costotransplante1               ="";
      $scope._68costotransplante                ="0";

      $scope._69complicaciontransplante         ="0";
      $scope._691finfeccioncitomegalovirus1     ="";
      $scope._691finfeccioncitomegalovirus      ="0";

      $scope._692finfeccionhongos1              ="";
      $scope._692finfeccionhongos               ="0";
      $scope._693finfecciontuberculosis1        ="";
      $scope._693finfecciontuberculosis         ="0";

      $scope._694finfeccionvascular1            ="";
      $scope._694finfeccionvascular             ="0";
      $scope._695finfeccionurologica1           ="";
      $scope._695finfeccionurologica            ="0";

      $scope._696finfeccionheridaquirurgica1    ="";
      $scope._696finfeccionheridaquirurgica     ="0";
      $scope._697fdiagnosticocancer1            ="";
      $scope._697fdiagnosticocancer             ="0";

      $scope._70vinmunosupresores1              ="";
      $scope._70vinmunosupresores               ="0";
      $scope._701reportemetilprednisolona       ="0";

      $scope._702reporteazatioprina             ="0";
      $scope._703reporteciclosporina            ="0";

      $scope._704reportemicofenolato            ="0";
      $scope._705reportetacrolimus              ="0";

      $scope._706reporteprednisona              ="0";
      $scope._707medicamento1                   ="0";

    //variables tab VI
      $scope._708medicamento2                   ="0";
      $scope._709medicamento3                   ="0";

      $scope._71episodiosrechazo1               ="";
      $scope._71episodiosrechazo                ="0";
      $scope._72rechazoinjerto1                 ="";
      $scope._72rechazoinjerto                  ="0";

      $scope._73retornodialisis1                ="";
      $scope._73retornodialisis                 ="0";
      $scope._74transplanresrenales1            ="";
      $scope._74transplanresrenales             ="0";

      $scope._75terapiapostrasplante1           ="";
      $scope._75terapiapostrasplante            ="0";
      $scope._76transplanresrenales             ="";
      $scope._77costototal                      ="";

      $scope._78codepsorigen                    ="0";
      $scope._79novedadreporteanterior          ="0";

      $scope._80causamuerte                     ="0";
      $scope._801fechamuerte1                   ="";
      $scope._801fechamuerte                    ="0";
  }
}])
