'use strict';
angular.module('GenesisApp')
.controller('adminticController', ['$scope', '$http', 'ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller','$rootScope','$window',
	function ($scope, $http, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window) {


		var dat = {prov : 'navb'}
		$.getJSON( "php/obtenersession.php", dat)
		.done(function(respuesta) {
			$scope.sesdata = respuesta;
			$scope.cedula=$scope.sesdata.cedula;
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
				$scope.padrinotic();
				$(function() {
					$(".k-autocomplete, .k-dropdown-wrap, .k-numeric-wrap, .k-picker-wrap, .k-textbox").css({"border-style":"none","border-bottom-style":"dotted"});
					var date = new Date();
					var formattedDate = moment(date).format('YYYY-MM');
					$(".datepicker_inicio").kendoDatePicker({
						animation: {
							close: {effects: "zoom:out",duration: 300},
							open: {effects: "zoom:in",duration: 300}
						}
					});
					$(document).ready(function() {
						$scope.startChange=function() {
							$scope.mes_padrino = start.value();
							$scope.ano = moment($scope.mes_padrino).format('YYYY');
							$scope.mes = moment($scope.mes_padrino).format('MM');
							console.log($scope.mes+'-'+$scope.ano);
						}

						var start = $("#fecha_inicio").kendoDatePicker({
							change:$scope.startChange,
							start: "year",
							depth: "year",
							culture: "es-MX",
							format: "MM-yyyy",
							min: new Date()
						}).data("kendoDatePicker");
					});
				});
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

				$(function() {
					$(".k-autocomplete, .k-dropdown-wrap, .k-numeric-wrap, .k-picker-wrap, .k-textbox").css({"border-style":"none","border-bottom-style":"dotted"});
					var date = new Date();
					var formattedDate = moment(date).format('YYYY-MM');
					$(".datepicker_inicio").kendoDatePicker({
						animation: {
							close: {effects: "zoom:out",duration: 300},
							open: {effects: "zoom:in",duration: 300}
						}
					});
					$(document).ready(function() {
						var inicial = $("#fecha_inicial").kendoDatePicker({
							format: "dd/MM/yyyy",
							culture: "es-MX",
							max: new Date()
						}).data("kendoDatePicker");

						var final = $("#fecha_final").kendoDatePicker({
							format: "dd/MM/yyyy",
							culture: "es-MX",
							max: new Date()							
						}).data("kendoDatePicker");
					});
				});
				$(function() {
					$(".k-autocomplete, .k-dropdown-wrap, .k-numeric-wrap, .k-picker-wrap, .k-textbox").css({"border-style":"none","border-bottom-style":"dotted"});
					var date = new Date();
					var formattedDate = moment(date).format('YYYY-MM');
					$(".datepicker_inicio").kendoDatePicker({
						animation: {
							close: {effects: "zoom:out",duration: 300},
							open: {effects: "zoom:in",duration: 300}
						}
					});
					$(document).ready(function() {
						var inicial = $("#fecha_inicial_afil").kendoDatePicker({
							format: "dd/MM/yyyy",
							culture: "es-MX",
							max: new Date()
						}).data("kendoDatePicker");

						var final = $("#fecha_final_afil").kendoDatePicker({
							format: "dd/MM/yyyy",
							culture: "es-MX",
							max: new Date()							
						}).data("kendoDatePicker");
					});
				});
				$(function() {
					$(".k-autocomplete, .k-dropdown-wrap, .k-numeric-wrap, .k-picker-wrap, .k-textbox").css({"border-style":"none","border-bottom-style":"dotted"});
					var date = new Date();
					var formattedDate = moment(date).format('YYYY-MM');
					$(".datepicker_inicio").kendoDatePicker({
						animation: {
							close: {effects: "zoom:out",duration: 300},
							open: {effects: "zoom:in",duration: 300}
						}
					});
					$(document).ready(function() {
						var inicial = $("#fecha_inicial_cas").kendoDatePicker({
							format: "dd/MM/yyyy",
							culture: "es-MX",
							disableDates: ["su", "sa"],
							max: new Date()
						}).data("kendoDatePicker");

						var final = $("#fecha_final_cas").kendoDatePicker({
							format: "dd/MM/yyyy",
							culture: "es-MX",
							disableDates: ["su", "sa"],
							max: new Date()							
						}).data("kendoDatePicker");
					});
				});
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
//Funciones Tab II
$scope.HabilitarCa=true;
$scope.Padrino_Activar=true;
$scope.HabilitarCambio=function(){
		if ($scope.cedula=='1042430898'||$scope.cedula=='1143450658') {
		if ($scope.HabilitarCa==false) {
			$scope.HabilitarCa=false;
			$scope.Padrino_Activar=false;
		} else {
			$scope.HabilitarCa=true;
			$scope.Padrino_Activar=true;
		}

	} else {
		swal('Información','Debe Consultar Con El Administrador','warning');
		$scope.HabilitarCa=true;
		$scope.Padrino_Activar=true;
	}
}
$scope.padrinotic=function(){
	$http({
		method:'POST',
		url:"php/tic/administracion/funcadmintic.php",
		data: {function:'obtenerpadrinos'}
	}).then(function(response){
		$scope.padrino=response.data;
		
	})
}

$scope.ActualizarPadrino=function(padrino_actualizado){
	$scope.cantidad = padrino_actualizado.length;
	$scope.actu_padrino=JSON.stringify(padrino_actualizado);
console.log($scope.actu_padrino);
		$http({
			method:'POST',
			url:"php/tic/administracion/funcadmintic.php",
			data: {function:'actualizarpadrinos',
			padrinos:$scope.actu_padrino,
			cantidad:$scope.cantidad,
			responsable:$scope.cedula}
		}).then(function(response){
			console.log(response.data);
			if (response.data.Codigo=='1') {
				swal('Correctamente',response.data.Nombre,'success');
				$scope.padrinotic();
				$scope.MesPadrino=''; 
				$scope.HabilitarCa=true;
				$scope.Padrino_Activar=true;
			} else {
				swal('Advertencia',response.data.Nombre,'error');
			}
		})
}


 var tableprovedores = $('#tablaproveedores').DataTable( {
	"ordering": false,
	"pagingType": "simple",
	ajax: {
		url: 'php/tic/administracion/listarproveedores.php',
		dataSrc: ''
	},
	buttons: [ 'copy', 'csv', 'excel' ],
	columns: [
	{ data: "nombre_proveedor" },
	{ data: "servicio_proveedor" },
	{ data: "responsable_proveedor" },
	{ data: "correo_proveedor"},
	{ data: "contacto_proveedor" }
	],
	language: {
		"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
	},
	lengthMenu: [[10, 30, 50,-1], [10, 30, 50,'Todas']],
});


//Terminancion De TAB II

var table = $('#tableadmin').DataTable( {
	"ordering": false,
	"pagingType": "simple",
	        "footerCallback": function ( row, data, start, end, display ) {
            var api = this.api(), data;
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '')*1 :
                    typeof i === 'number' ?
                        i : 0;
            }; 
            // Total over all pages
            var total = api
                .column( 10 )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
 
            // Total over this page
             var pageTotal = api
                .column( 10, { page: 'current'} )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
          
            // Update footer
            $( api.column( 10 ).footer() ).html(
                pageTotal +'/'+ total +' Total'
            );

            // Total over all pages
            var total = api
                .column( 12 )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
 
            // Total over this page
             var pageTotal = api
                .column( 12, { page: 'current'} )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
          
            // Update footer
            $( api.column( 12 ).footer() ).html(
                pageTotal +'/'+ total +'<br> Total'
            );

                       // Total over this page
             var pageTotal = api
                .column( 14, { page: 'current'} )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
          
            // Update footer
            $( api.column( 14 ).footer() ).html(
                pageTotal +'/'+ total +'<br> Total'
            );
        },
	ajax: {
		url: 'php/tic/administracion/listarinsumo.php',
		dataSrc: ''
	},

	buttons: [ 'copy', 'csv', 'excel' ],
	columns: [
	{ data: "NOM_DEP" },
	{ data: "NOM_MUN" },
	{ data: "RESPONSABLE" },
	{ data: "GABINETE"},
	{ data: "PATHCORE" },
	{ data: "REGULADOR" },
	{ data: "POLOTIERRA" },
	{ data: "UPS" },
	{ data: "SWITCH" },
	{ data: "PC" },
	{ data:"CANTIDADPC"},
	{ data: "IMPRESORA" },
	{ data:"CANTIDADIMP"},
	{ data: "LECTOR" },
	{ data: "CANTIDADLECTORA" },
	{ data: "CRONO" },
	// { data: "FASE"},
	{ data: "ESTADO"}
	],
	language: {
		"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
	},
	lengthMenu: [[10, 30, 50,-1], [10, 30, 50,'Todas']],
	//order: [[ 5, "desc" ]]
});

$('#tableadmin tbody').on('click', 'tr',function () {
	//if ($scope.cedula=='1042430898'|| $scope.cedula=='1045307221'|| $scope.cedula=='1143450658'||$scope.cedula=='79218502') {
		$scope.data = table.row(this).data();
		$('#product-list').fadeOut('slow',function(){
			$('#product-details').fadeIn('slow',function(){
				$scope.tabsI = true;
				$scope.tabsII = false;
				$scope.actiI = 'active final';
				$scope.actiII = 'none';
				$scope.ini =  function(){
					$scope.tabsI= false;
					$scope.tabsII = false;
					$scope.actiI = 'none';
					$scope.actiII = 'none';
				}
				$scope.setTabs =  function(opcion){
					$scope.ini();
					switch (opcion) {
						case 1:
						$scope.tabsI = true;
						$scope.tabsII = false;
						$scope.actiI = 'active final';
						$scope.actiII = 'none';
						break;
						case 2:
						$scope.tabsI = false;
						$scope.tabsII = true;
						$scope.actiI = 'none';
						$scope.actiII = 'active final';
						$scope.InformacionUne();
						break;
						default:
					}
				}
				$scope.CodigoAdmin=$scope.data.CODIGO;
				$scope.NombreDpto=$scope.data.NOM_DEP;
				$scope.NombreMunicipio=$scope.data.NOM_MUN;
				$scope.GabineteAdmin=$scope.data.GABINETECOD;
				$scope.PathCoreAdmin=$scope.data.PATHCORECOD;
				$scope.ReguladorAdmin=$scope.data.REGULADORCOD;
				$scope.PoloTierraAdmin=$scope.data.POLOTIERRACOD;
				$scope.UPSAdmin=$scope.data.UPSCOD;
				$scope.SwitchAdmin=$scope.data.SWITCHCOD;
				$scope.LectoraAdmin=$scope.data.LECTORCOD;
				$scope.CantidadLectoraAdmi=$scope.data.CANTIDADLECTORA;
				$scope.CronoAdmin=$scope.data.CRONOCOD;
				$scope.PCAdmin=$scope.data.PCCOD;
				$scope.ImpresoraAdmin=$scope.data.IMPRESORACOD;
				$scope.CantidadPCAdmin=$scope.data.CANTIDADPC;
				$scope.CantidadImpresoraAdmin=$scope.data.CANTIDADIMP;
				$scope.EstadoAdmin=$scope.data.ESTADO;
				$scope.EstadoValor=$scope.data.ESTADOVALOR;
				$scope.ComentarioAdmin=$scope.data.COMENTARIO;
				$scope.Cod_Mun=$scope.data.MUN;
				$scope.Habilitar=true;
				$scope.Descativado=true;
				$scope.$apply();
			});
		});
	//} else {
	//	swal('Información','Debe Consultar Con El Administrador','warning');
	//}

});
$("#back-prod-table" ).click(function() {
	$("#product-details" ).slideUp(function() {
		$( "#product-list" ).slideDown( function() {
			$scope.CodigoAdmin='';
			$scope.GabineteAdmin='';
			$scope.PathCoreAdmin='';
			$scope.ReguladorAdmin='';
			$scope.PoloTierraAdmin='';
			$scope.UPSAdmin='';
			$scope.SwitchAdmin='';
			$scope.LectoraAdmin='';
			$scope.CantidadLectoraAdmi='';
			$scope.CronoAdmin='';
			$scope.PCAdmin='';
			$scope.ImpresoraAdmin='';
			$scope.CantidadPCAdmin='';
			$scope.CantidadImpresoraAdmin='';
			$scope.EstadoAdmin='';
			$scope.EstadoValor='';
			$scope.ComentarioAdmin='';
			$scope.Cod_Mun='';
			table.ajax.reload();
		});
	});
});
$scope.Habilitar=true;
$scope.Descativado=true;
$scope.HabilitarInformacion=function(){
	if  ($scope.Habilitar==false) {
		$scope.Habilitar=false;
		$scope.Descativado=false;
	}else {
		$scope.Habilitar=true;
		$scope.Descativado=true;
	}
}
$scope.Actualizar=function(){
	if ($scope.GabineteAdmin==''|| $scope.GabineteAdmin==undefined) {
		swal('Información','Debe Selecionar La Condición Del Gabinete','warning');
	} else if ($scope.PathCoreAdmin==''|| $scope.PathCoreAdmin==undefined) {
		swal('Información','Debe Selecionar La Condición Del Patch Core','warning');
	} else if ($scope.ReguladorAdmin==''|| $scope.ReguladorAdmin==undefined) {
		swal('Información','Debe Selecionar La Condición Del Regulador','warning');
	} else if ($scope.PoloTierraAdmin==''|| $scope.PoloTierraAdmin==undefined) {
		swal('Información','Debe Selecionar La Condición Del Polo Tierra','warning');
	} else if ($scope.UPSAdmin==''|| $scope.UPSAdmin==undefined) {
		swal('Información','Debe Selecionar La Condición Del UPS','warning');
	} else if ($scope.SwitchAdmin==''|| $scope.SwitchAdmin==undefined) {
		swal('Información','Debe Selecionar La Condición Del Switch','warning');
	} else if ($scope.LectoraAdmin==''|| $scope.LectoraAdmin==undefined) {
		swal('Información','Debe Selecionar La Condición Del La Lectora De Barra','warning');
	} else if ($scope.CronoAdmin==''|| $scope.CronoAdmin==undefined) {
		swal('Información','Debe Selecionar La Condición De Crono','warning');
	} else if ($scope.PCAdmin==''|| $scope.PCAdmin==undefined) {
		swal('Información','Debe Selecionar La Condición Del PC','warning');
	} else if ($scope.ImpresoraAdmin==''|| $scope.ImpresoraAdmin==undefined) {
		swal('Información','Debe Selecionar La Condición De la Impresora','warning');
	}  else if ($scope.CantidadPCAdmin==''|| $scope.CantidadPCAdmin==undefined) {
		swal('Información','Debe Digitar La Cantidad De PC','warning');
	} else if ($scope.CantidadImpresoraAdmin==''|| $scope.CantidadImpresoraAdmin==undefined) {
		swal('Información','Debe Selecionar La Cantidad De Impresora','warning');
	} else if ($scope.CantidadLectoraAdmi=='' || $scope.CantidadLectoraAdmi==undefined){
		swal('Información','Debe Selecionar La Cantidad De Lectora','warning');
	} else if($scope.EstadoAdmin=='' || $scope.EstadoAdmin==undefined ) {
		swal('Información','Debe Seleccionar Un Estado','warning');
	} else if($scope.ComentarioAdmin.length < 10 ) {
		swal('Información','El comentario Debe Ser Mayor A 10 Caracteres','warning');
	}	else{
		$http({
			method:'POST',
			url:"php/tic/administracion/funcadmintic.php",
			data: {function:'actualizarinformacion',
			codigo:$scope.CodigoAdmin,
			responsable:$scope.cedula,
			gabinete:$scope.GabineteAdmin,
			patchcore:$scope.PathCoreAdmin,
			regulador:$scope.ReguladorAdmin,
			polotierra:$scope.PoloTierraAdmin,
			ups:$scope.UPSAdmin,
			switch:$scope.SwitchAdmin,
			lectora:$scope.LectoraAdmin,
			cantidadlectora:$scope.CantidadLectoraAdmi,
			configuracion:'0',
			pc:$scope.PCAdmin,
			cantidadpc:$scope.CantidadPCAdmin,
			impresora:$scope.ImpresoraAdmin,
			cantidadimpresora:$scope.CantidadImpresoraAdmin,
			crono:$scope.CronoAdmin,
			comentario:$scope.ComentarioAdmin,
			estado:$scope.EstadoValor
		}
	}).then(function(response){
		$scope.res=response.data;
		if($scope.res.codigo=='1')
			swal('Correctamente',$scope.res.mensaje,'success');
		$scope.Descativado=true;
		$scope.Habilitar=true;
	})
}
}
$scope.InformacionUne=function(){
	$http({
		method:'POST',
		url:"php/tic/administracion/funcadmintic.php",
		data: {	function:'infoune',cod_mun:$scope.Cod_Mun}
	}).then(function(response){
		$scope.info=response.data;			
	})
}

//TABS INTERNA III
$scope.Tabla_Consulta=true;
$scope.Tabla_Consulta_AfilReg=true;
$scope.Tabla_Cas=true;
$scope.TaI = true;
$scope.TaII = false;
$scope.TaIII = false;
$scope.TactI = 'active final';
$scope.TactII = 'none';
$scope.TactIII = 'none';
$scope.inicial =  function(){
	$scope.TaI= false;
	$scope.TaII = false;
	$scope.TaIII = false;
	$scope.TactI = 'none';
	$scope.TactII = 'none';
	$scope.TactIII = 'none';
}
$scope.setTa =  function(opcion){
	$scope.inicial();
	switch (opcion) {
		case 1:
		$scope.TaI = true;
		$scope.TaII = false;
		$scope.TaIII = false;
		$scope.TactI = 'active final';
		$scope.TactII  = 'none';
		$scope.TactIII  = 'none';
		$scope.LimpiarAfilReg();
		break;
		case 2:
		$scope.TaI = false;
		$scope.TaII = true;
		$scope.TaIII = false;
		$scope.TactI= 'none';
		$scope.TactII  = 'active final';
		$scope.TactIII  = 'none';
		$scope.Limpiar();		
		break;
		case 3:
		$scope.TaI = false;
		$scope.TaII = false;
		$scope.TaIII = true;
		$scope.TactI= 'none';
		$scope.TactII  = 'none';
		$scope.TactIII  = 'active final';
		$scope.Limpiar();		
		$scope.LimpiarAfilReg();
		break;
		default:
	}
}
$scope.Consulta=function(){
	
	if ($scope.FechaInicial=='' || $scope.FechaInicial==undefined || $scope.FechaInicial==null) {
		swal('Notificacion','Debe Ingresar La Fecha Inicial','info');
	} else if ($scope.FechaFinal=='' || $scope.FechaFinal==undefined || $scope.FechaFinal==null){
		swal('Notificacion','Debe Ingresar La Fecha Final','info');
	} else{
		$scope.ConsultarPorDia();
		$scope.ConsultarPorUsuario();
	}
}
$scope.ConsultarPorDia=function(){
	$http({
		method:'POST',
		url:"php/tic/administracion/funcadmintic.php",
		data: {function:'consultaXdia',
		fechainicial:$scope.FechaInicial,
		fechafinal:$scope.FechaFinal
	}
}).then(function(response){
	$scope.total=0;
	for (var i = 0; i < response.data.length; i++) {
		$scope.total = $scope.total+response.data[i].cantidad;
	}
	$scope.infoXdia=response.data;
	$scope.Tabla_Consulta=false;	
})
}

$scope.ConsultarPorUsuario=function(){
	$http({
		method:'POST',
		url:"php/tic/administracion/funcadmintic.php",
		data: {function:'consultaXUsurio',
		fechainicial:$scope.FechaInicial,
		fechafinal:$scope.FechaFinal
	}
}).then(function(response){
	$scope.infoXUsuario=response.data;
	$scope.Tabla_Consulta=false;
})
}


$scope.CambioFecha=function(){
	$scope.Tabla_Consulta=true;	
}

$scope.CambioFechaCas=function(){
	$scope.Tabla_Cas=true;
}
$scope.Limpiar=function(){
	$scope.FechaInicial='';
	$scope.FechaFinal='';
	$scope.Tabla_Consulta=true;
}

$scope.LimpiarAfilReg=function(){
	$scope.FechaInicialAfilReg='';
	$scope.FechaFinalAfilReg='';
	$scope.Tabla_Consulta_AfilReg=true;
}

$scope.LimpiarCas=function(){
	$scope.FechaInicialCas='';
	$scope.FechaFinalCas='';
	$scope.Tabla_Cas=true;
}

$scope.ConsultarAfilReg=function(){
	if ($scope.FechaInicialAfilReg=='' || $scope.FechaInicialAfilReg==undefined || $scope.FechaInicialAfilReg==null) {
		swal('Notificacion','Debe Ingresar La Fecha Inicial','info');
	} else if ($scope.FechaFinalAfilReg=='' || $scope.FechaFinalAfilReg==undefined || $scope.FechaFinalAfilReg==null){
		swal('Notificacion','Debe Ingresar La Fecha Final','info');
	} else{
		$scope.ConsultarRegistro();
		$scope.ConsultarAfiliaciones();

	}
}

$scope.CambioFecAfiReg=function(){
	$scope.Tabla_Consulta_AfilReg=true;
}

$scope.ConsultarAfiliaciones=function(){
	$http({
		method:'POST',
		url:"php/tic/administracion/funcadmintic.php",
		data: {function:'consultaafiltotal',
		fechainicial:$scope.FechaInicialAfilReg,
		fechafinal:$scope.FechaFinalAfilReg
	}
}).then(function(response){
	$scope.AfilCons=response.data;
	$scope.Tabla_Consulta_AfilReg=false;	
})
}
$scope.ConsultarRegistro=function(){
	$http({
		method:'POST',
		url:"php/tic/administracion/funcadmintic.php",
		data: {function:'consultaregtotal',
		fechainicial:$scope.FechaInicialAfilReg,
		fechafinal:$scope.FechaFinalAfilReg
	}
}).then(function(response){
	$scope.RegCons=response.data;
	$scope.Tabla_Consulta=false;
})
}

$scope.ConsultarCas=function(){
	if ($scope.FechaInicialCas=='' || $scope.FechaInicialCas==undefined || $scope.FechaInicialCas==null) {
		swal('Notificacion','Debe Ingresar La Fecha Inicial','info');
	} else if ($scope.FechaFinalCas=='' || $scope.FechaFinalCas==undefined || $scope.FechaFinalCas==null){
		swal('Notificacion','Debe Ingresar La Fecha Final','info');
	} else{
		$http({
			method:'POST',
			url:"php/tic/administracion/funcadmintic.php",
			data: {function:'consultaconcepto',
			fechainicial:$scope.FechaInicialCas,
			fechafinal:$scope.FechaFinalCas
		}
	}).then(function(response){
		$scope.infocas=response.data;
		$scope.Tabla_Cas=false;
	})

}
}


}])
