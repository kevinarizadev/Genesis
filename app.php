<?php
session_start();
if (!isset($_SESSION['nombre'])) {
  // header("Location: index.html");
}
  header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
  ?>
  <!doctype html>
  <html ng-app="GenesisApp" ng-cloak>
  <head>
    <meta http-equiv="Expires" content="0">
    <meta http-equiv="Last-Modified" content="0">
    <meta http-equiv="Cache-Control" content="no-cache, mustrevalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <!-- Hotjar Tracking Code for https://cajacopieps.com/genesis/ -->
    <script>
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:991247,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    </script>

  <script
  src="https://browser.sentry-cdn.com/5.23.0/bundle.min.js"
  integrity="sha384-5yYHk2XjpqhbWfLwJrxsdolnhl+HfgEnD1UhVzAs6Kd2fx+ZoD0wBFjd65mWgZOG"
  crossorigin="anonymous"
></script>


    <meta charset="utf-8">
    <title>Portal Genesis {{(name!=undefined && name!=null && name!='')?' - '+name:''}}</title>
    <link rel="icon" href="assets/images/icon.ico" />
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" type="text/css" href="bower_components/jsgrid-1.5.3/css/jsgrid.css" />
    <link rel="stylesheet" type="text/css" href="bower_components/jsgrid-1.5.3/css/theme.css" />
    <link rel="stylesheet" href="bower_components/ng-dialog/css/ngDialog.css" />
    <link rel="stylesheet" href="bower_components/ng-dialog/css/ngDialog-theme-default.css" />
    <link rel="stylesheet" href="bower_components/angular-ui-select/dist/select.css" />
    <link href='js/calendario/fullcalendar.min.css' rel='stylesheet' />
    <link href='js/calendario/fullcalendar.print.min.css' rel='stylesheet' media='print' />

    <link rel="stylesheet" href="bower_components/ngprogress/ngProgress.css" />
    <link rel="stylesheet" href="bower_components/angular-material/angular-material.css" />
    <link rel="stylesheet" href="styles/font-awesome.min.css">
    <link rel="stylesheet" href="bower_components/materialize/bin/materialize.css" />
    <link rel="stylesheet" href="assets/css/material-design-iconic-font.css">
    <link rel="stylesheet" href="assets/css/fontello.css">
    <link rel="stylesheet" href="styles/medium-editor.min.css" type="text/css" media="screen" charset="utf-8">
    <link rel="stylesheet" type="text/css" href="styles/dataTable.css"/>
    <link type="text/css" rel="stylesheet" href="assets/css/nouislider.css"  media="screen"/>
    <link rel="stylesheet" href="styles/interact.css">
    <link type="text/css" rel="stylesheet" href="assets/css/nouislider.pips.css"  media="screen"/>
    <link rel="stylesheet" href="assets/css/medium-editor-default.css" id="medium-editor-theme">
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/mara.min.css"/>
    <link rel="stylesheet" href="bower_components/angular-toastr/dist/angular-toastr.css" />
    <link rel="stylesheet" href="bower_components/angular-ui-grid/ui-grid.css" />
    <link rel="stylesheet" href="styles/chosen.min.css">
    <link rel="stylesheet" href="styles/chosen-eps.css">
    <link type="text/css" rel="stylesheet" href="assets/js/libs/nvd3/nv.d3.css" />
    <link rel="stylesheet" href="styles/ausentismo/kendo.common-nova.css"/>
    <!-- <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2017.1.118/styles/kendo.common-nova.min.css"/> -->
    <link rel="stylesheet" href="assets/css/kendo.common-nova.min.css"/>
    <link rel="stylesheet" href="styles/ausentismo/kendo.nova.css"/>
    <!-- <link rel="stylesheet" href="styles/ausentismo/kendo.nova.mobile.css"/> -->
    <link rel="stylesheet" href="styles/ausentismo/kendo.rtl.css"/>
    <link rel="stylesheet" href="styles/siau/pqr.css">
    <link href="styles/fonts-material-icons.css" rel="stylesheet">

    <link rel="stylesheet" href="styles/ausentismo/customcard.css">

    <!-- fin ausentismo -->
    <link rel="stylesheet" href="styles/gestiondocumental/cubos.css">
    <link rel="stylesheet" href="styles/inventario/listchequeo.css">
    <link rel="stylesheet" href="styles/acas/acas.css">
    <link rel="stylesheet" href="styles/calificame/calificame.css">
    <link rel="stylesheet" href="styles/censo/censo.css">

    <link rel="stylesheet" href="styles/bootstrap-material-datetimepicker.css">
    <link rel="stylesheet" href="bower_components/animate/animate.min.css" />
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> -->
    <link rel="stylesheet" href="assets/css/font-awesome.min.css">
    <!-- style -->
    <link rel="stylesheet" href="styles/genesis-style/genesis-style.css?1.0">
    <link rel="stylesheet" href="styles/firmadigitalcss/fontawesome.min.css">
    <link rel="stylesheet" href="styles/firmadigitalcss/solid.min.css">
    <link rel="stylesheet" href="styles/firmadigitalcss/signature-agent.css">




    <!-- <link rel="stylesheet" href="css/signature-agent.css"> -->
    <link rel="stylesheet" href="css/fontawesome.min.css">
    <!--<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.css"> -->
    <link rel="stylesheet" href="assets/js/libs/jquery.timepicker.min.css">
    <!-- <link href="https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css" rel="stylesheet" type="text/css"> -->
    <link href="assets/css/style.css" rel="stylesheet" type="text/css">
    <style>
    .h450 {
      height: 450px;
      overflow: auto;
      padding: 0 !important
    }
    .h450 pre {
      margin: 0 !important;
      min-height: 450px;
    }
    .h450 .row {
      margin-bottom: 0 !important;
    }
    .wrapper.vertical-sidebar .side-nav .collapsible .collapsible-header.active {
      color: #9c1b54;
      background-color: transparent;
    }
    .wrapper.vertical-sidebar .side-nav .collapsible .collapsible-body li.active .collapsible-header.active{
      color: #fff;
    }
  </style>



</head>


<body class="angular">
  <div class="wrapper vertical-sidebar">
      <div nav-bar></div>
      <div class="page-loader-container" data-page-loading >
        <div class="dizzy-gillespie"></div>
      </div>
      <div class="wrapper vertical-sidebar" id="full-page">
        <main id="content" style="padding-bottom: 0px !important;">
          <div ui-view></div>
        </main>
        <div side-bar></div>
        <!-- <div footer ></div> -->
      </div>
    </div>
    <!-- Google Analytics -->
    <script>
      !function(A,n,g,u,l,a,r){A.GoogleAnalyticsObject=l,A[l]=A[l]||function(){(A[l].q=A[l].q||[]).push(arguments)},A[l].l=+new Date,a=n.createElement(g),r=n.getElementsByTagName(g)[0],a.src=u,r.parentNode.insertBefore(a,r)}(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-XXXXX-X');
      ga('send', 'pageview');
    </script>




<!-- build:js(.) scripts/vendor.js -->
<!-- bower:js -->

<!--<script>
  Sentry.init({
  dsn: "https://5dc0edb808fe4ed694fc016052e703a1@o417838.ingest.sentry.io/5423354"
});
  Sentry.setTag('usuario_genesis', sessionStorage.getItem('usuario') || 'Usuario no logeado')
</script>-->



<script src="bower_components/jquery/dist/jquery.js"></script>
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/bootstrap/dist/js/bootstrap.js"></script>
<script src="bower_components/angular-animate/angular-animate.js"></script>
<script src="bower_components/angular-cookies/angular-cookies.js"></script>
<script src="bower_components/angular-resource/angular-resource.js"></script>
<script src="bower_components/angular-sanitize/angular-sanitize.js"></script>
<script src="bower_components/ng-dialog/js/ngDialog.js"></script>
<script src="bower_components/angular-materialize/src/angular-materialize.js"></script>
<script src="bower_components/angular-ui-router/release/angular-ui-router.js"></script>
<script src="bower_components/velocity/velocity.js"></script>
<script src="bower_components/velocity/velocity.ui.js"></script>
<script src="bower_components/angular-velocity/angular-velocity.min.js"></script>
<script src="bower_components/ng-dropdown/dist/js/ng-dropdown.min.js"></script>
<script src="bower_components/angular-ui-grid/ui-grid.js"></script>
<script src="bower_components/ng-file-upload/ng-file-upload.js"></script>
<script src="bower_components/artyom.js/src/artyom.min.js"></script>
<script src="bower_components/ngMask/dist/ngMask.js"></script>
<script src="bower_components/interactjs/interact.js"></script>
<script src="bower_components/rltm/web/rltm.js"></script>
<script src="js/mara.min.js"></script>
<script type="text/javascript" src="js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="js/dataTables.responsive.min.js"></script>
<!-- <script type="text/javascript" src="https://cdn.datatables.net/v/dt/jszip-2.5.0/dt-1.10.16/b-1.5.1/b-colvis-1.5.1/b-flash-1.5.1/b-html5-1.5.1/b-print-1.5.1/cr-1.4.1/fc-3.2.4/fh-3.1.3/kt-2.3.2/r-2.2.1/datatables.min.js"></script> -->
<script type="text/javascript" src="assets/js/datatables.min.js"></script>

<!-- <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.4/moment.min.js"></script> -->
<script type="text/javascript" src="assets/js/loading-bar.js"></script>
<link rel="stylesheet" href="assets/css/loading-bar.css">
<script type="text/javascript" src="assets/js/prism.min.js"></script>

<!-- Nucleo Familiar -->
<!-- <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script> -->
<script type="text/javascript" src="assets/js/html2canvas.min.js"></script>
<!-- <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.4.1/jspdf.min.js"></script> -->
<script type="text/javascript" src="assets/js/jspdf.min.js"></script>
<!-- <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js"></script> -->
<script type="text/javascript" src="assets/js/dom-to-image.min.js"></script>

<script src="assets/js/libs/amcharts/amcharts.js"  type="text/javascript" ></script>
<script src="assets/js/libs/amcharts/serial.js"  type="text/javascript" ></script>
<script src="assets/js/libs/amcharts/themes/light.js"  type="text/javascript" ></script>
<script src="assets/js/libs/amcharts/themes/none.js"  type="text/javascript" ></script>
<script src="assets/js/libs/amcharts/pie.js" type="text/javascript" ></script>
<script src="assets/js/libs/amcharts/ammap.js" type="text/javascript" ></script>
<script src="assets/js/libs/amcharts/maps/worldLow.js" type="text/javascript" ></script>
<script src="assets/js/libs/amcharts/maps/usaLow.js" type="text/javascript" ></script>
<script src="assets/js/libs/amcharts/radar.js" type="text/javascript" ></script>
<script src="assets/js/libs/amcharts/amstock.js" type="text/javascript" ></script>
<script src="assets/js/jquery.star.rating.min.js" type="text/javascript" ></script>

<!-- <script src="assets/js/libs/highcharts/highcharts.js"></script>

<script src="assets/js/libs/highcharts/modules/exporting.js"></script>
<script src="assets/js/libs/highcharts/highcharts-3d.js"></script>
<script src="assets/js/libs/highcharts/highcharts-more.js"></script>
<script src="assets/js/libs/highcharts/modules/data.js"></script>
<script src="assets/js/libs/highcharts/modules/drilldown.js"></script>
<script src="assets/js/libs/highcharts/highchartsgithub.js"></script> -->

<script src="assets/js/libs/highcharts/highcharts.js"></script>
<script src="assets/js/libs/highcharts/exporting.js"></script>
<script src="assets/js/libs/highcharts/export-data.js"></script>
<script src="assets/js/libs/highcharts/accessibility.js"></script>

<!-- <script src="https://highcharts.github.io/export-csv/export-csv.js"></script> -->
<script src="js/jquery-ui.js"></script>
<script src="bower_components/angular-toastr/dist/angular-toastr.tpls.js"></script>
<script type="text/javascript" src="js/ngStorage.js">
</script>
<script src="bower_components/sweetalert/js/sweetalert2.min.js"></script>
<link rel="stylesheet" type="text/css" href="bower_components/sweetalert/css/sweetalert2.css">
<script type="text/javascript" src="assets/js/libs/c3js/d3.v3.min.js"></script>
<script type="text/javascript" src="assets/js/libs/nvd3/nv.d3.js"></script>
<script src="js/csv.js"></script>
<script src="js/vfs_fonts.js"></script>
<script src="js/numeral.min.js" charset="utf-8"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js" defer></script> -->
<script src="assets/js/axios.min.js" defer></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js" defer></script> -->
<!-- <script src="https://unpkg.com/papaparse@5.2.0/papaparse.min.js" defer></script> -->
<script src="assets/js/papaparse.min.js" defer></script>
<!-- <script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest" type="text/javascript"></script> -->
<script src="assets/js/simple-datatables.js" type="text/javascript"></script>

<!-- <script src="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.js"></script> -->
<script src="assets/js/libs/jquery.timepicker.min.js"></script>
<script src="scripts/app.js"></script>
<script src="scripts/const/const.js"></script>
<script src="scripts/controllers/genesis/homecontroller.js"></script>
<script src="scripts/controllers/genesis/homeafiliadoscontroller.js"></script>
<script src="scripts/controllers/genesis/homeempresascontroller.js"></script>
<script src="scripts/controllers/adminusuariosIPS/listarcuentasController.js"></script>
<script src="scripts/controllers/adminusuariosIPS/usuarioadministradorController.js"></script>
<script src="scripts/controllers/talentohumano/formatos/modalSelectPeriodos.js"></script>
<script src="scripts/controllers/movilidad/gestionsolicitudmovilidadctrl.js"></script>

<script src="scripts/controllers/genesis/modal/modaldatoscontactoController.js"></script>
<script src="scripts/controllers/genesis/modal/modaldatoscontactoafiController.js"></script>
<script src="scripts/controllers/movilidad/solicitudmovilidadctrl.js"></script>
<script src="scripts/controllers/movilidad/modal/modalAfiliarCtrl.js"></script>
<script src="scripts/controllers/movilidad/modal/modalDetalleSolMovCtrl.js"></script>
<script src="scripts/controllers/movilidad/mesacontrolmovController.js"></script>
<script src="scripts/controllers/movilidad/missolicitudesctrl.js"></script>
<script src="scripts/controllers/movilidad/afiliacion_linea_controller.js"></script>
<script src="scripts/controllers/movilidad/gestion_afiliacion_linea_controller.js"></script>
<script src="scripts/controllers/movilidad/informesController.js"></script>
<script src="scripts/controllers/instructivos/listadoinstructivosctrl.js"></script>
<script src="scripts/controllers/afiliacionLinea/infopersonalcontroller_v1.js"></script>
<script src="scripts/controllers/afiliacionLinea/agregarbeneficiariocontroller_v1.js"></script>
<script src="scripts/controllers/afiliacionLinea/verdetallescontroller.js"></script>
<script src="scripts/controllers/afiliacionLinea/verfosyga_v1.js"></script>
<script src="scripts/controllers/dataGrid/datatable.js"></script>
<script src="scripts/controllers/tic/modalversionamiento.js"></script>
<script src="scripts/controllers/tic/paneladminController.js"></script>
<script src="scripts/controllers/tic/configuracionaccesoController.js"></script>
<script src="scripts/controllers/tic/modificarjefeController.js"></script>
<script src="scripts/controllers/ips/consolidadofuncionario.js"></script>
<!-- Cuentas Medicas -->
<script src="scripts/controllers/cuentasmedicas/radicacionripsController.js?v=7"></script>
<script src="scripts/controllers/cuentasmedicas/radicacionripscapitaController.js?v=7"></script>
<script src="scripts/controllers/cuentasmedicas/administracionripsController.js"></script>
<script src="scripts/controllers/cuentasmedicas/miscarguesripsController.js"></script>
<script src="scripts/controllers/cuentasmedicas/radicaciondigitalController.js"></script>
<script src="scripts/controllers/cuentasmedicas/radicarfacturasController.js"></script>
<script src="scripts/controllers/cuentasmedicas/gestionradicadoscontroller.js"></script>
<script src="scripts/controllers/cuentasmedicas/consulta_usuario_ips_controller.js"></script>
<script src="scripts/controllers/cuentasmedicas/auditoriacuentasController.js"></script>
<script src="scripts/controllers/cuentasmedicas/reporteauditoriacuentasController.js"></script>
<script src="scripts/controllers/cuentasmedicas/reportenotglosaController.js"></script>
<script src="scripts/controllers/cuentasmedicas/notificacionglosaipsController.js"></script>
<script src="scripts/controllers/cuentasmedicas/gesnotificacionglosaController.js"></script>
<script src="scripts/controllers/cuentasmedicas/consultagesnotglosaController.js"></script>
<script src="scripts/controllers/cuentasmedicas/consultaautradController.js"></script>
<script src="scripts/controllers/cuentasmedicas/reportefacturasdescargeController.js"></script>
<script src="scripts/controllers/cuentasmedicas/reportecopagoycuotamoderadoraController.js"></script>
<script src="scripts/controllers/consultaafiliados/modalconsultaPQRSDController.js"></script>
<!-- generacion de capita -->
<script src="scripts/controllers/contratacion/historicodecapita.js"></script>
<script src="scripts/controllers/contratacion/generaciondeCapitaController.js"></script>

<script src="scripts/controllers/contratacion/gestionactpgpController.js"></script>
<script src="scripts/controllers/contratacion/consultapgpepsController.js"></script>
<script src="scripts/controllers/pgp/autproductospgpepsController.js"></script>
<script src="scripts/controllers/capita/prestadorescapitaController.js"></script>
<!-- <script src="scripts/controllers/contratacion/gestiondecapita.js"></script> -->
<script src="scripts/controllers/contratacion/direccionamientohospitalarioController.js"></script>
<script src="scripts/controllers/contratacion/consultadirhospitalarioController.js"></script>

<!-- --Salud-- contraloria covid-- -->
<script src="scripts/controllers/salud/contraloriacovid.js"></script>
<script src="scripts/controllers/salud/contraloriacovidinfo.js"></script>


 <script src="scripts/controllers/cuentasmedicas/notificacionglosaController.js"></script>
 <script src="scripts/controllers/cuentasmedicas/conciliaciondeglosasController.js"></script>
 <script src="scripts/controllers/cuentasmedicas/conciliaciondeglosasipsController.js"></script>
<!-- -- contratacion  -- -->
<script src="scripts/controllers/contratacion/gestionacascontratacion.js"></script>
<script src="scripts/controllers/contratacion/modalgestionacascontratacion.js"></script>
  <script src="scripts/controllers/contratacion/validacionprecontractualController.js"></script>
  <script src="scripts/controllers/contratacion/gestionpermisosController.js"></script>
  <script src="scripts/controllers/contratacion/direccionamientoController.js"></script>
  <script src="scripts/controllers/contratacion/pruebainternaController.js"></script>
  <script src="scripts/controllers/contratacion/informesContratacionController.js"></script>

<script src="scripts/controllers/afiliacionLinea/AfiliacionLineaController.js"></script>
<!-- <script src="scripts/controllers/tic/paneladminController.js"></script>-->
<!--Colmena -->
<script src="scripts/controllers/planeacion/colmenaController.js"></script>
<script src="scripts/controllers/planeacion/ModalcolmenaController.js"></script>
<!--Calendario Administrativo -->
<script src="scripts/controllers/planeacion/ModalcalendariodirectivoController.js"></script>
<script src="scripts/controllers/planeacion/calendariodirectivoController.js"></script>
<!--Normatividad -->
<script src="scripts/controllers/planeacion/normatividadController.js"></script>
<script src="scripts/controllers/planeacion/adminprocesospoaController.js"></script>
<script src="scripts/controllers/planeacion/procesospoaController.js"></script>
<script src="scripts/controllers/intranet/admindocumentosinstController.js"></script>
<!--Intranet -->
<script src="scripts/controllers/intranet/adminprocesosController.js"></script>
<script src="scripts/controllers/intranet/procesosController.js"></script>
<script src="scripts/controllers/intranet/administrador_sgc.js"></script>
<script src="scripts/controllers/intranet/procesosaController.js"></script>
<script src="scripts/controllers/intranet/programa_auditorias.js"></script>
<script src="scripts/controllers/intranet/modal_programa_auditoria.js"></script>

<!--Transporte -->
<script src="scripts\controllers\transporte\ModalBarriosController.js"></script>
<script src="scripts\controllers\transporte\bonoalimentoController.js"></script>
<script src="scripts\controllers\transporte\transporteController.js"></script>

<!-- gestion de acas juridica -->
<script src="scripts/controllers/juridica/gestionjuridica.js"></script>


<script src="scripts/controllers/saludpublica/planvacunacioncovid.js"></script>
<script src="scripts/controllers/saludpublica/tablerodegestion.js"></script>
<script src="scripts/controllers/saludpublica/descarguebasecovid.js"></script>



<!-- Reportes Bint -->
<script src="scripts/controllers/aseguramiento/ReportesBint.js"></script>



<!-- Consulta Cartera -->
<script src="scripts/controllers/cartera/HistoricoCartaController.js?v=1"></script>
<script src="scripts/controllers/cartera/IncumplimientopagoController.js?v=1"></script>
<script src="scripts/controllers/cartera/InformeCarteraController.js?v=1"></script>
<script src="scripts/controllers/cartera/LlamadaRecibidaController.js?v=1"></script>
<script src="scripts/controllers/cartera/LlamadaTelecobroController.js?v=1"></script>
<script src="scripts/controllers/cartera/ConsultaCarteraController.js?v=1"></script>
<script src="scripts/controllers/cartera/AvisoinCumplimientoController.js?v=1"></script>
<script src="scripts/controllers/cartera/AdministracioncarteraoController.js?v=1"></script>
<script src="scripts/controllers/cartera/SoporteCartera/GestionLLamadasCartera.js?v=1"></script>
<script src="scripts/controllers/cartera/reporteAportanteController.js"></script>

<!-- Financiera -- Soportes de Legalización -->
<script src="scripts/controllers/financiera/soporteslegalizacion.js"></script>
<script src="scripts/controllers/financiera/gestiondelegalizacion.js"></script>
<script src="scripts/controllers/financiera/cuentacosto.js"></script>
<script src="scripts/controllers/financiera/impresionmasivaController.js"></script>


<script src="scripts/controllers/afiliacionLinea/seguimientodegestante.js"></script>
<script src="scripts/controllers/afiliacionLinea/evoluciondedocumento.js"></script>

<script src="scripts/controllers/salud/modalUbi.js"></script>



<script src="scripts/controllers/gestionriesgo/cargueSOFI.js"></script>
<script src="scripts/controllers/gestionriesgo/seggrupospriorizadosController.js"></script>
<script src="scripts/controllers/gestionriesgo/admingrupospriorizadosController.js"></script>
<script src="scripts/controllers/gestionriesgo/consultagrupospriorizadosController.js"></script>
<!-- Modulo validador GR -->
<script src="scripts/controllers/gestionriesgo/validadorgrController.js"></script>
<!-- AUSENTISMO -->
<script src="scripts/controllers/talentohumano/ausentismo/ausentismoController.js"></script>


<script src="scripts/controllers/autorizaciones/solicitudautafiliadosController.js"></script>
<script src="scripts/controllers/autorizaciones/gestionautoafiliadosController.js"></script>
<script src="scripts/controllers/afiliados/siauconsultapqrdsController.js"></script>
<script src="scripts/controllers/autorizaciones/consultaautorizacionafiliadosController.js"></script>


<!-- Administracion ESOA -->
<script src="scripts/controllers/autorizaciones/UsuariosipsController.js"></script>
<script src="scripts/controllers/ERCIPS/radicacioncacController.js"></script>
<!-- Contrato-->
<script src="scripts/controllers/contratacion/contratacionController.js"></script>
<script src="scripts/controllers/contratacion/tarifactrl.js"></script>

<script src="scripts/controllers/contratacion/gestioncontratacionController.js"></script>
<script src="scripts/controllers/aseguramiento/gestionaseguramientoModalcontroller.js"></script>


<script src="scripts/controllers/ips/gestion_serviciosController.js"></script>
<script src="scripts/controllers/tic/mesadeayudaipsController.js"></script>
<script src="scripts/controllers/autorizaciones/solicitud_serviciosController.js"></script>
<!-- ips esoa -->
<script src="scripts/controllers/autorizaciones/autorizacionipsController.js"></script>
<script src="scripts/controllers/autorizaciones/autPendientesController.js"></script>
<script src="scripts/controllers/autorizaciones/solicitud_autorizacionController.js"></script>
<script src="scripts/controllers/autorizaciones/usuariosipsautorizarController.js"></script>
<!--CODIGO URGENCIA-->
<script src="scripts/controllers/siau/codigourgenciaipscontroller.js"></script>
<script src="scripts/controllers/siau/historicourgenciaipscontroller.js"></script>
<script src="scripts/controllers/siau/reporteurgenciacontroller.js"></script>
<!-- procesobdua -->
<script src="scripts/controllers/bdua/procesobdua.js"></script>
<script src="scripts/controllers/bdua/ProcesoContritubitvoController.js"></script>
<script src="scripts/controllers/bdua/ProcesSubsidiadoController.js"></script>


<!-- gestion de acas autorizaciones -->
<script src="scripts/controllers/autorizaciones/gestionacasauto.js"></script>

<script src="scripts/controllers/autorizaciones/anularautorizacionController.js"></script>
<script src="scripts/controllers/autorizaciones/anularAutorizacionopbsController.js"></script>
<script src="scripts/controllers/autorizaciones/showAutorizacionController.js"></script>
<script src="scripts/controllers/autorizaciones/gestionautorizacionController.js"></script>
<script src="scripts/controllers/autorizaciones/consultacostoautController.js"></script>
<script src="scripts/controllers/autorizaciones/direccionamientoautController.js"></script>
<script src="scripts/controllers/autorizaciones/admincostoautController.js"></script>
<script src="scripts/controllers/autorizaciones/auditautorizacionController.js"></script>
<script src="scripts/controllers/autorizaciones/autProgramadasController.js"></script>
<script src="scripts/controllers/autorizaciones/gestionAutProgramdasController.js"></script>
<script src="scripts/controllers/autorizaciones/negacionserviciosController.js"></script>
<script src="scripts/controllers/autorizaciones/consulta_autorizacionesController.js"></script>
<script src="scripts/controllers/autorizaciones/consultaautorizacionipsController.js"></script>
<script src="scripts/controllers/autorizaciones/adminAutProgramdasController.js"></script>
<script src="scripts/controllers/autorizaciones/excepcionmipresController.js"></script>
<script src="scripts/controllers/autorizaciones/excepcionerror50Controller.js"></script>
<script src="scripts/controllers/autorizaciones/consulta_autorizacionesnopbsController.js"></script>
<script src="scripts/controllers/autorizaciones/consultaautorizacionipsnopbsController.js"></script>

<script src="scripts/controllers/autorizaciones/gestionunicahospitalariaController.js"></script>
<script src="scripts/controllers/autorizaciones/autorizamipresController.js"></script>
<script src="scripts/controllers/autorizaciones/gestionunicahospitalariaipsController.js"></script>
<script src="scripts/controllers/autorizaciones/gestiondeprestacionController.js"></script>
<!-- empresa -->
<script src="scripts/controllers/movilidad/admonmovilidadlController.js"></script>

<script src="scripts/controllers/tic/videoController.js"></script>
<script src="scripts/controllers/tic/InforController.js"></script>
<script src="scripts/controllers/tic/informeProyectoController.js"></script>
<script src="scripts/controllers/dataGrid/verbeneficiarioscontroller.js"></script>
<script src="scripts/controllers/mara/mara.controllers.js"></script>

<!-- salud  -->
<script src="scripts/controllers/salud/servicios_ips.js"></script>
<script src="scripts/controllers/salud/censocontroller.js"></script>
<script src="scripts/controllers/salud/validadormedicamentos.js"></script>
<script src="scripts/controllers/salud/validador_1552.js"></script>
<script src="scripts/controllers/salud/resolucion3100controller.js"></script>

<!--Cargue Vacunados-->
<script src="scripts/controllers/saludpublica/CargueVacunadosController.js"></script>


 <!-- gestion de acas administradores -->
<script src="scripts/controllers/acas/gestionacasadm.js"></script>
<script src="scripts/controllers/administrativa/celularesylineasmovilesController.js"></script>

 <!-- gestion de acas auditores -->
<script src="scripts/controllers/salud/gestionacasauditores.js"></script>

<!-- gestion de acas cuentas medicas -->
  <script src="scripts/controllers/cuentasmedicas/gestionacascuentasm.js"></script>

<!-- Riesgos -->
<script src="scripts/controllers/riesgos/riesgosycontrolesController.js"></script>
<script src="scripts/controllers/riesgos/mapaderiesgosController.js"></script>
<script src="scripts/controllers/riesgos/eventosmaterializadosController.js"></script>
<script src="scripts/controllers/riesgos/adminriesgosController.js"></script>
<script src="scripts/controllers/riesgos/indicadoresriesgosController.js"></script>


<script src="scripts/controllers/salud/cupscontroller.js"></script>
<script src="scripts/controllers/salud/diagnosticosnulos.js"></script>
<script src="scripts/controllers/reporte_rips/reporte_rips.js"></script>
<script src="scripts/controllers/salud/diagnosticosnovalidos.js"></script>
<script src="scripts/controllers/salud/procedimientosnulos.js"></script>
<script src="scripts/controllers/salud/frecuenciacontroller.js"></script>
<script src="scripts/controllers/salud/frecuenciacantidad.js"></script>
<script src="scripts/controllers/salud/procedimientosnovalidos.js"></script>
<script src="scripts/controllers/salud/medicamentos.js"></script>
<script src="scripts/controllers/salud/reportesalud.js"></script>
<script src="scripts/controllers/salud/marcacionpoblacion.js"></script>
<script src="scripts/controllers/salud/poblacionespecial.js"></script>
<script src="scripts/controllers/salud/admonpatologias.js"></script>
<script src="scripts/controllers/salud/reversarglosacontroller.js"></script>
<script src="scripts/controllers/salud/censotabcontroller.js"></script>
<script src="scripts/controllers/salud/evoluciondetallecontroller.js"></script>
<script src="scripts/controllers/salud/censohospitalariocontroller.js"></script>
<script src="scripts/controllers/salud/censochatcontroller.js"></script>
<script src="scripts/controllers/salud/evoluciontabcontroller.js"></script>
<script src="scripts/controllers/salud/autorizaciontabcontroller.js"></script>
<script src="scripts/controllers/salud/modaldiagnosticosctrl.js"></script>
<script src="scripts/controllers/salud/datoscensodetallecontroller.js"></script>
<script src="scripts/controllers/salud/modalValorglosactrl.js"></script>
<script src="scripts/controllers/salud/modaldiagnosticosActrl.js"></script>
<script src="scripts/controllers/salud/modalestanciapsico.js"></script>
<script src="scripts/controllers/salud/modalfallecidosctrl.js"></script>
<script src="scripts/controllers/salud/modaldetalleUCIcontroller.js"></script>
<script src="scripts/controllers/salud/modalIpsctrl.js"></script>
<script src="scripts/controllers/salud/modalMunicipioctrl.js"></script>
<script src="scripts/controllers/salud/detalleautcontroller.js"></script>
<script src="scripts/controllers/salud/modalBusquedaxnombres.js"></script>
<script src="scripts/controllers/salud/modalAfiliadonuevoctrl.js"></script>
<script src="scripts/controllers/salud/modalDireccionctrl.js"></script>
<script src="scripts/controllers/salud/busquedacensocontroller.js"></script>

<script src="scripts/controllers/salud/modaldiagnosticosctrl.js"></script>
<script src="scripts/controllers/salud/productosctrl.js"></script>
<script src="scripts/controllers/salud/productoscreacionctrl.js"></script><!-- //productos  -->
<script src="scripts/controllers/salud/exclusionesctrl.js"></script><!-- //productos  -->
<script src="scripts/controllers/salud/cupsvsdx.js"></script>
<script src="scripts/controllers/salud/resolucion_4505_ips_controller.js"></script>
<script src="scripts/controllers/salud/resolucion_4505_controller.js"></script>
<!-- salud publica -->
<script src="scripts/services/util/notify.js"></script>
<script src="scripts/controllers/saludpublica/georeferenciacontrol/georeferencia.js"></script>
<script src="scripts/controllers/saludpublica/desnutricion/desnutricionController.js"></script>
<script src="scripts/controllers/saludpublica/historicodesnutricion/historicodesnutricionController.js"></script>
<script src="scripts/controllers/saludpublica/modal/modalEsquemaController.js"></script>
<script src="scripts/controllers/saludpublica/registrodesnutricion/registrodesnutricionController.js"></script>
<script src="scripts/controllers/saludpublica/seguimientodesnutricion/seguimientodesnutricion.js"></script>
<script src="scripts/controllers/saludpublica/ConsultaAfiliadoCovidController.js"></script>
<script src="scripts/controllers/saludpublica/ModalEditarEstadoController.js"></script>
<script src="scripts/controllers/salud/cargueins.js"></script>
<script src="scripts/controllers/saludpublica/gestionInsController.js"></script>
<script src="scripts/controllers/saludpublica/modal/modalbusquedaafiliado.js"></script>
<script src="scripts/controllers/saludpublica/circularSaludPublicaController.js"></script>
<script src="scripts/controllers/saludpublica/reporteSaludPublicaController.js"></script>

<script src="scripts/controllers/salud/modalmivacunax.js"></script>
<script src="scripts/controllers/saludpublica/mivacunacovid.js"></script>


<script src="scripts/controllers/saludpublica/disentimientodevacunacion.js"></script>

<script src="scripts/controllers/consultaafiliados/datosCovidAfiliadoController.js"></script>
<!-- panel de control -->
<script src="scripts/controllers/panel_control/analiticadatos.js"></script>
<script src="scripts/controllers/panel_control/apoyo.js"></script>
<script src="scripts/controllers/panel_control/estrategico.js"></script>
<script src="scripts/controllers/panel_control/misionales.js"></script>
<script src="scripts/controllers/financiera/parametrizacioncodigourgenciaController.js"></script>
<!-- referencia -->
<script src="scripts/controllers/referencia/registrodereferenciacontroller.js"></script>
<!-- analitica -->
<script src="scripts/controllers/analitica/modelosController.js"></script>
<script src="scripts/controllers/analitica/adminmodelosController.js"></script>

<!-- //productos -->
<script src="scripts/controllers/aseguramiento/liquidacionController.js"></script>
<!--CC CENSO HOSPITALARIO-->
<script src="scripts/controllers/cuentasmedicas/adjuntoCMController.js"></script>
<script src="scripts/controllers/cuentasmedicas/censodetalleController.js"></script>
<script src="scripts/controllers/cuentasmedicas/HglosaController.js"></script>
<script src="scripts/controllers/salud/modaleditctrl.js"></script>
<script src="scripts/controllers/salud/evoluciondetallecontroller.js"></script>
<script src="scripts/controllers/salud/modalQuejas.js"></script>
<script src="scripts/controllers/salud/modalEntrevistactrl.js"></script>
<script src="scripts/controllers/salud/evoluciondetallecontroller.js"></script>
<script src="scripts\controllers\cuentasmedicas\glosaController.js"></script>
<script src="scripts/controllers/salud/modalprocesarcontroller.js"></script>

<script src="scripts/controllers/administrativa/consultaterceroController.js"></script>

<!--evoluciondetallecontroller*/-->

<script src="scripts/controllers/ips/RegistrarAfliadosIPS.js"></script>
<script src="scripts/controllers/ips/ConfirmacionAfiliadosIPS.js"></script>
<script src="scripts/controllers/ips/ConsolidadoNacimientoIPS.js"></script>
<script src="scripts/controllers/ips/ConsolidadoIPS.js"></script>
<script src="scripts/controllers/ips/GestionNacimientoIPS.js"></script>

<script src="scripts/controllers/contratacion/tarifacategoriaController.js"></script>

<script src="scripts/controllers/ips/InfoNacimiento.js"></script>
<script src="scripts/controllers/tic/gestionacaspublicidadController.js"></script>
<script src="scripts/controllers/banner/adminbannergenesisController.js"></script>
<!-- chat info -->
<script src="scripts/services/util/message.js"></script>
<script src="scripts/services/util/chatcore.js"></script>
<script src="scripts/controllers/chat/chatcontroller.js"></script>
<script src="scripts/controllers/prestacioneseconomicas/prestacionesController.js"></script>
<script src="scripts/controllers/prestacioneseconomicas/PrestacionesEconomica.js"></script>
<!-- contartacion  -->
<script src="scripts/controllers/contratacion/contratacionprecontractualController.js"></script>
<script src="scripts/controllers/pgp/gestiontipoproductopgpController.js"></script>

<script src="scripts/controllers/encuestas/encuestapoController.js"></script>
<!-- controller ausentismo -->
<script src="scripts/controllers/talentohumano/empleados/datosempleadoscontroller.js"></script>
<script src="scripts/controllers/talentohumano/empleados/admndatosempleadoscontroller.js"></script>
<script src="scripts/controllers/talentohumano/empleados/consultadatosempleadoscontroller.js"></script>
<script src="scripts/controllers/talentohumano/empleados/adjbencontroller.js"></script>
<script src="scripts/controllers/talentohumano/empleados/modaldirbencontroller.js"></script>
<script src="scripts/controllers/talentohumano/confdefuncionariosController.js"></script>
<script src="scripts/controllers/talentohumano/evaluacionempleadomesController.js"></script>
<script src="scripts/controllers/talentohumano/certificados/certificadolaboralController.js"></script>
<script src="scripts/controllers/talentohumano/adminempleadomes.js"></script>

<script src="scripts/controllers/talentohumano/IndicadoresController.js"></script>
<script src="scripts/controllers/ausentismo/ausentismoController.js"></script>
<script src="scripts/controllers/ausentismo/solicitudPermisocontroller.js"></script>
<script src="scripts/controllers/ausentismo/aprobacionPermisocontroller.js"></script>
<script src="scripts/controllers/ausentismo/verSolicitudescontroller.js"></script>
<script src="scripts/controllers/ausentismo/soportecontroller.js"></script>
<script src="scripts/controllers/ausentismo/observacionescontroller.js"></script>
<script src="scripts/controllers/ausentismo/modaljefescontroller.js"></script>
<script src="scripts/controllers/ausentismo/horacontroller.js"></script>
<script src="scripts/controllers/tic/controlproyectosController.js"></script>
<script src="scripts/controllers/tic/gestionproyectosController.js"></script>
<script src="scripts/controllers/tic/mesacontrolticController.js"></script>
<script src="scripts/controllers/financiera/reservastecnicasController.js"></script>
<script src="scripts/controllers/aseguramiento/consultacodigoController.js"></script>

<script src="scripts/controllers/saludpublica/covid19Controller.js"></script>
<script src="scripts/controllers/salud/CargueSismuestrasController.js"></script>


<script src="scripts/controllers/salud/modalcensodetallecontroller.js"></script>


<!-- inventario -->
<!-- controller siau -->
<script src="scripts/controllers/siau/codigourgenciacontroller.js"></script>
<script src="scripts/controllers/siau/historicourgenciacontroller.js"></script>
<!-- <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.13.5/xlsx.full.min.js"></script> -->
<script type="text/javascript" src="assets/js/xlsx.full.min.js"></script>
<!-- <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.13.5/jszip.js"></script> -->
<script type="text/javascript" src="assets/js/jszip.js"></script>
<script src="scripts/controllers/siau/pqr/pqrController.js"></script>
<script src="scripts/controllers/siau/pqr/gestionpqrController.js"></script>
<script src="scripts/controllers/siau/pqr/consultapqrController.js"></script>
<script src="scripts/controllers/siau/pqr/accionespqrController.js"></script>
<script src="scripts/controllers/siau/pqr/accionescorrespondenciaController.js"></script>
<script src="scripts/controllers/siau/pqr/pqrreportecontroller.js"></script>
<script src="scripts/controllers/siau/pqr/modalpqrcontroller.js"></script>
<script src="scripts/controllers/siau/pqr/modals/modalSelectmotivo.js"></script>
<script src="scripts/controllers/siau/pqr/modals/modalDirController.js"></script>
<script src="scripts/controllers/siau/pqr/modals/modalDepMunicipioController.js"></script>
<script src="scripts/controllers/siau/pqr/modals/modalIps.js"></script>
<script src="scripts/controllers/siau/admonpqrs/modalAddResponsables.js"></script>
<script src="scripts/controllers/siau/admonpqrs/modalConfigResponsables.js"></script>
<script src="scripts/controllers/siau/admonpqrs/adminpqrController.js"></script>
<script src="scripts/controllers/siau/admonpqrs/modalProcesSalud.js"></script>
<script src="scripts/controllers/siau/admonpqrs/modalProcessAseguramiento.js"></script>
<script src="scripts/controllers/siau/pqr/configurarresponsablesController.js"></script>
<script src="scripts/controllers/siau/pqr/modificarpqrController.js"></script>
<script src="scripts/controllers/aseguramiento/gestionaseguramientoController.js"></script>
<script src="scripts/controllers/siau/pqr/modals/modalEditarSuperSaludController.js"></script>
<script src="scripts/controllers/siau/circular017Controller.js"></script>
<script src="scripts/controllers/suficiencia/SuficienciaController.js"></script>
<script src="scripts/services/http/siau/pqrHttp.js"></script>
<script src="scripts/controllers/siau/asociaciones_usuarios/asociacionesController.js"></script>
<script src="scripts/controllers/siau/oficina/horariooficinasatencionController.js"></script>
<script src="scripts/controllers/siau/gestiondeencuestasController.js"></script>
<!-- controller siau -->

<!-- Proceso BDUA -->
<script src="scripts\controllers\basededatos\ProcesosBDUAController.js"></script>
<script src="scripts/controllers/altocosto/busquedasoportesaltocController.js"></script>
<script src="scripts/controllers/altocosto/adminsiniestrosController.js"></script>
<script src="scripts/controllers/altocosto/seguimientoCancerController.js"></script>
<script src="scripts/controllers/altocosto/seguimientoCACController.js"></script>
<script src="scripts/controllers/altocosto/seguimientoCohortesController.js"></script>
<!-- Servicios Digitalizacion -->
<!-- Servicios Digitalizacion -->
<!--<script src="https://asprise.azureedge.net/scannerjs/scanner.js" type="text/javascript"></script> -->
<script src="js/scanner.js" type="text/javascript"></script>
<!-- <script src="scripts/services/http/digitalizacion/digitalizacionHTTP.js"></script> -->
<!-- Controller Digitalizacion -->
<!-- <script src="scripts/controllers/digitalizacion/DigitalizacionController.js"></script>
<script src="scripts/controllers/digitalizacion/DigitalizacionControllerAF.js"></script> -->

<!-- <script src="scripts/controllers/digitalizacion/DigitalizacionAdminController.js"></script>
<script src="scripts/controllers/digitalizacion/RevisionDigitalizacionController.js"></script>
<script src="scripts/controllers/digitalizacion/AnexoDigitalizacionController.js"></script>
<script src="scripts/controllers/digitalizacion/InfoDigitalizacionController.js"></script>
<script src="scripts/controllers/digitalizacion/GestionDigitalizacionController.js"></script> -->

<!--autorizaciones -->
<!-- controller autorizaciones -->
<script src="scripts/controllers/autorizaciones/printautorizacionesController.js"></script>
<script src="scripts/controllers/autorizaciones/solicitudprogramadaController.js"></script>
<script src="scripts/controllers/autorizaciones/gestion_medicamentos.js"></script>
<script src="scripts/controllers/autorizaciones/medicamentos_ips.js"></script>
<script src="scripts/controllers/autorizaciones/modal_gestion_medicamentos_controller.js"></script>
<script src="scripts/controllers/autorizaciones/reporte_medicamentos.js"></script>
<script src="scripts/controllers/autorizaciones/reporteautafiliadosController.js"></script>
<!-- altocosto -->
<!-- servicio inventario -->
<script src="scripts/services/http/altocosto/altocostoHttp.js"></script>
<script src="scripts/services/http/altocosto/renal/renalHttp.js"></script>
<!-- controller inventario -->
<script src="scripts/controllers/altocosto/renalController.js"></script>
<script src="scripts/controllers/altocosto/periodorenalController.js"></script>
<script src="scripts/controllers/altocosto/indicadoresController.js"></script>
<script src="scripts/controllers/altocosto/vihcontroller.js"></script>
<script src="scripts/controllers/altocosto/consvihcontroller.js"></script>
<script src="scripts/controllers/altocosto/gestionsiniestrosController.js"></script>
<!-- fin altocosto -->
<!-- servicio inventario -->
<script src="scripts/services/http/inventario/inventarioHttp.js"></script>
<!-- controller inventario -->
<script src="scripts/controllers/inventario/inventarioController.js"></script>
<script src="scripts/controllers/inventario/listaChequeocontroller.js"></script>
<script src="scripts/controllers/inventario/abrirInventariocontroller.js"></script>
<script src="scripts/controllers/inventario/modificarcriterioController.js"></script>
<script src="scripts/controllers/inventario/consultaracascontroller.js"></script>
<script src="scripts/controllers/talentohumano/capacitacion/plancapacitacionController.js"></script>
<script src="scripts/controllers/sensor/sensorController.js"></script>
<!-- versionamiento -->
<script src="scripts/services/http/tic/versionamientoHTTP.js"></script>
<script src="scripts/controllers/tic/versionamientoController.js"></script>
<script src="scripts/controllers/tic/paneladminController.js"></script>
<!-- gestion documental -->
<script src="scripts/controllers/gestiondocumental/gestionadminController.js"></script>
<script src="scripts/controllers/gestiondocumental/adminventarioController.js"></script>
<script src="scripts/controllers/administrativa/inventariodecajasController.js"></script>

<script src="scripts/controllers/autorizaciones/anticipos/signature-agent.js"></script>
<script src="scripts/controllers/autorizaciones/anticipos/anticiposController.js"></script>
<script src="scripts/controllers/autorizaciones/anticipos/adminanticiposController.js"></script>
<!-- servicio gestion documental -->
<!-- Reporte Aseguramiento -->
<script src="scripts/controllers/aseguramiento/ReportesasegController.js"></script>
<script src="scripts/controllers/aseguramiento/procesosespecialesController.js"></script>
<script src="scripts/controllers/financiera/procesosespecialesFController.js"></script>
<script src="scripts/controllers/aseguramiento/promocionafiController.js"></script>
<script src="scripts/controllers/aseguramiento/preliminaresController.js"></script>
<script src="scripts/controllers/financiera/certificadoderetencionController.js"></script>

<!-- Reporte de Crecimiento -->
<script src="scripts/controllers/aseguramiento/Reporte_Crecimiento/ReporteCrecimientoController.js"></script>

<script src="scripts/controllers/movilidad/modal/modalgestion_grafica_solicitudCtrl.js"></script>


<script src="scripts/controllers/movilidad/modal/modalgestion_graficaCtrl.js"></script><!-- MOVILIDAD-->
<script src="scripts/controllers/movilidad/modal/modalAprovarCtrl.js"></script><!-- movilidad-->
<script src="scripts/controllers/movilidad/modal/modalDireccionCtrl.js"></script><!-- movilidad-->
<script src="scripts/controllers/movilidad/informacionempresaController.js"></script><!-- movilidad-->
<script src="scripts/controllers/movilidad/empleadosController.js"></script>
<!-- CNVU - Seguimiento de Asesores -->
<script src="scripts/controllers/movilidad/seguimiento_asesores/seguimientoAsesoresController.js"></script>
<script src="scripts/controllers/capita/generacionCapitaController.js"></script>
<script src="scripts/controllers/nacimientos/nacimientosController.js"></script>
<script src="scripts\controllers\aseguramiento\ConsultaPQRController.js"></script>
<script src="scripts/controllers/aseguramiento/afiliacionpaginawebController.js"></script>

<script src="scripts/services/http/gestiondocumental/gestiondocumentalhttp.js"></script>
<script src="scripts/services/http/gestiondocumental/bodegahttp.js"></script>
<script src="scripts/services/http/gestiondocumental/pasillohttp.js"></script>
<script src="scripts/services/http/gestiondocumental/pisohttp.js"></script>
<script src="scripts/services/http/gestiondocumental/nivelHttp.js"></script>
<script src="scripts/services/http/gestiondocumental/secuenciaHttp.js"></script>
<script src="scripts/services/http/gestiondocumental/cajaHttp.js"></script>
<script src="scripts/services/http/gestiondocumental/carpetaHttp.js"></script>
<script src="scripts/services/http/gestiondocumental/prestamoHttp.js"></script>
<script src="scripts/services/http/censo/censoHttp.js"></script>
<!-- controller gestion documental -->
<script src="scripts/controllers/gestiondocumental/gestiondocumentalcontroller.js"></script>
<script src="scripts/controllers/gestiondocumental/pasillocontroller.js"></script>
<script src="scripts/controllers/gestiondocumental/bodegacontroller.js"></script>
<script src="scripts/controllers/gestiondocumental/pisocontroller.js"></script>
<script src="scripts/controllers/gestiondocumental/nivelcontroller.js"></script>
<script src="scripts/controllers/gestiondocumental/secuenciacontroller.js"></script>
<script src="scripts/controllers/gestiondocumental/cajacontroller.js"></script>
<script src="scripts/controllers/gestiondocumental/carpetacontroller.js"></script>
<script src="scripts/controllers/gestiondocumental/detallecajacontroller.js"></script>
<script src="scripts/controllers/gestiondocumental/detallecarpetacontroller.js"></script>
<script src="scripts/controllers/gestiondocumental/prestamocontroller.js"></script>
<script src="scripts/controllers/gestiondocumental/prestamocajacontroller.js"></script>
<script src="scripts/controllers/gestiondocumental/misprestamoscontroller.js"></script>
<script src="scripts/controllers/gestiondocumental/solicitudcontroller.js"></script>
<script src="scripts/controllers/gestiondocumental/reportedetallecontroller.js"></script>
<script src="scripts/controllers/consultaafiliados/modalconsultaautorizacionesController.js"></script>

<script src="scripts/controllers/altocosto/consultasiniestrosController.js"></script>
<!-- Mesa de control -->
<script src="scripts/controllers/mesacontrol/mesadecontrolcontroller.js"></script>

<!-- controller Nucleo Familiar -->
<script src="scripts/controllers/consultaAfiliados/nucleofamiliar/agregarbeneficiario.js"></script>
<script src="scripts/controllers/consultaAfiliados/nucleofamiliar/actualizarinformacion.js"></script>
<script src="scripts/controllers/consultaAfiliados/nucleofamiliar/hojadelsisben.js"></script>

<script src="scripts/controllers/informes/informesentesController.js"></script>
<!-- fin gestion documental -->
<script src="scripts/controllers/calificame/calificamecontroller.js"></script>
<script src="scripts/controllers/calificame/infocalificamecontroller.js"></script>
<script src="scripts/services/http/calificacion/calificacionhttp.js"></script>
<script src="scripts/controllers/autorizaciones/autorizacionController.js"></script>
<script src="scripts/controllers/movilidad/gestionacasmovController.js"></script>

<!-- Encuesta -->
<script src="scripts/controllers/planeacion/PlaneacionencuestaController.js"></script>
<script src="scripts/controllers/consultaafiliados/consultaIntegralController.js"></script>
<script src="scripts/controllers/tic/adminticController.js"></script>

<!-- controller consultaafiliados -->
<script src="scripts/controllers/consultaafiliados/adjuntocontroller.js"></script>
<script src="scripts/controllers/consultaafiliados/datosbasicoscontroller.js"></script>
<script src="scripts/controllers/consultaafiliados/encuestacontroller.js"></script>
<script src="scripts/controllers/consultaafiliados/modalformatoscontroller.js"></script>
<script src="scripts/controllers/consultaafiliados/modaleditardatosctrl.js"></script>
<script src="scripts/controllers/consultaafiliados/modalestadoanexos.js"></script>
<script src="scripts/controllers/consultaafiliados/consultaafiliadoipscontroller.js"></script>
<script src="scripts/controllers/consultaafiliados/declaracionsalud.js"></script>
<script src="scripts/controllers/consultaafiliados/modalcertafiliacioncontroller.js"></script>
<script src="scripts/controllers/consultaafiliados/modalcambiarcontrasenacontroller.js"></script>
<!-- controller Financiera -->
<script src="scripts/controllers/financiera/pagosipsController.js"></script>
<script src="scripts/controllers/financiera/confirmacionController.js"></script>
<script src="scripts/controllers/financiera/confirmacionautController.js"></script>
<script src="scripts/controllers/financiera/aprobconfirmacionController.js"></script>
<script src="scripts/controllers/financiera/res1587habController.js"></script>

<script src="scripts/controllers/juridica/tutelas/gestionctrl.js"></script>
<script src="scripts/controllers/juridica/tutelas/modaljuzgadosctrl.js"></script>
<script src="scripts/controllers/juridica/tutelas/modaldiagnosticosctrl.js"></script>
<script src="scripts/controllers/juridica/tutelas/paneladjuntosctrl.js"></script>
<script src="scripts/controllers/juridica/tutelas/panelvbctrl.js"></script>
<script src="scripts/controllers/juridica/demandas/gestiondemandasctrl.js"></script>
<script src="scripts/controllers/juridica/demandas/panelActuacionesCtrl.js"></script>
<script src="scripts/controllers/juridica/kpitutelascontroller.js"></script>
<script src="scripts/controllers/juridica/LineaEticaDenunciaController.js"></script>

<script src="scripts/controllers/juridica/tutelas/gestiontutelasareasController.js"></script>
<script src="scripts/controllers/juridica/tutelas/admintutelasController.js"></script>

<script src="scripts/controllers/epidemiologia/carguecubossisproController.js"></script>

<!-- novedades controller -->
<script src="scripts/controllers/consultaafiliados/novedadescontroller.js"></script>
<script src="scripts/controllers/novedades/reactivacontroller.js"></script>
<script src="scripts/controllers/novedades/modaldircontroller.js"></script>
<script src="scripts/controllers/financiera/reportsctrl.js"></script>
<script src="scripts/controllers/financiera/cargainterfaceController.js"></script>

<!-- prescripcion controller -->
<!--<script src="scripts/controllers/recobro/prescripcioncontroller.js"></script>-->
<script src="node_modules/angular-popeye/release/popeye.min.js"></script>
<script src="scripts/directives/util/FileProcessor.js"></script>
<script src="scripts/services/util/file.js"></script>
<script src="scripts/controllers/recobro/gestionprescripcioncontroller.js"></script>
<script src="scripts/controllers/recobro/MIPREScontroller.js"></script>
<script src="scripts/controllers/recobro/direccionamientoIPS.js"></script>
<script src="scripts/services/http/MIPRES/mipresHTTP.js"></script>
<script src="scripts/controllers/recobro/modal/modalDireccionar.js"></script>
<script src="scripts/controllers/recobro/modal/modalnoDireccionarctrl.js"></script>
<script src="scripts/controllers/recobro/modal/modalMedicamentoctrl.js"></script>
<script src="scripts/controllers/recobro/modal/modalDispositivosctrl.js"></script>
<script src="scripts/controllers/recobro/modal/modalServicioctrl.js"></script>
<script src="scripts/controllers/recobro/modal/modalProcedimientoctrl.js"></script>
<script src="scripts/controllers/recobro/modal/modalNutricionalctrl.js"></script>
<script src="scripts/controllers/recobro/modal/modalDetPresctrl.js"></script>
<script src="scripts/controllers/recobro/modal/modalDetalleErr.js"></script>
<script src="scripts/controllers/recobro/mipresTutelacontroller.js"></script>
<script src="scripts/controllers/recobro/modal/modalSuministrosctrl.js"></script>
<script src="scripts/controllers/recobro/suministroController.js"></script>
<script src="scripts/controllers/recobro/entregaController.js"></script>
<script src="scripts/controllers/recobro/modal/modalEditDir.js"></script>
<script src="scripts/controllers/recobro/modal/modalExito.js"></script>
<script src="scripts/controllers/recobro/modal/modalDetTutelactrl.js"></script>
<script src="scripts/controllers/recobro/prescripcioncontroller.js"></script>
<script src="scripts/controllers/recobro/gestionoperacionescontroller.js"></script>
<script src="scripts/controllers/recobro/solicitudautcontroller.js"></script>
<script src="scripts/controllers/recobro/modal/direccionamientosctrl.js"></script>
<script src="scripts/controllers/recobro/carguemiprestutelacontroller.js"></script>


<!-- Censo nuevo -->
<script src="scripts/controllers/salud/consultacenso.js"></script>
<script src="scripts/controllers/salud/gestioncensocerradoController.js"></script>


<!-- aut consolidado -->
<script src="scripts/controllers/autorizaciones/consolidadoautorizadoController.js"></script>
<!-- <script src="scripts/controllers/publicidad/notificacionesMovilesController.js"></script> -->
<!-- acas -->
<script src="scripts/controllers/acas/acascontroller.js"></script>
<script src="scripts/controllers/acas/acastercerocontroller.js"></script>
<script src="scripts/controllers/acas/acastranfercontroller.js"></script>
<script src="scripts/controllers/acas/acasinfocontroller.js"></script>
<script src="scripts/controllers/acas/gestionacascontroller.js"></script>
<script src="scripts/controllers/acas/actinfofuncionariocontroller.js"></script>
<script src="scripts/controllers/acas/ModalBarriosController.js"></script>
<script src="scripts/controllers/tic/gestionacasticController.js"></script>
<script src="scripts/controllers/tic/gestionacasticModalController.js"></script>
<script src="scripts/controllers/acas/repmesadeayudaController.js"></script>
<script src="scripts/controllers/tic/check_tic_Controller.js"></script>
<script src="scripts/controllers/gestionriesgo/teleorientacionController.js"></script>
<script src="scripts/controllers/financiera/pagoincapacidadesController.js"></script>

<script src="scripts/controllers/acas/consultarsolicitudacasController.js"></script>
<script src="scripts/controllers/tic/bitacoraobjetosbdController.js"></script>

<script src="scripts/services/http/acas/acashttp.js"></script>
<script src="scripts/controllers/pollamundial/pollamundialController.js"></script>
<script src="scripts/controllers/pollamundial/adminpollamundialController.js"></script>



<script src="scripts/directives/mara.directives.js"></script>
<script src="scripts/directives/upload/uploaderModel.js"></script>
<script src="scripts/services/http/afiliacionHttp.js"></script>
<script src="scripts/services/http/menuopcioneshttp.js"></script>
<script src="scripts/services/util/notification.js"></script>
<script src="scripts/services/util/upload.js"></script>
<script src="scripts/services/http/afiliacionHttp.js"></script>
<script src="scripts/services/http/ausentismoHttp.js"></script>
<script src="scripts/services/util/communication.js"></script>
<script src="scripts/services/util/validationParams.js"></script>
<script src="scripts/services/http/consultahttp.js"></script>
<script src="scripts/controllers/navegacion/navbarcontroller.js"></script>
<script src="js/chosen.jquery.js"></script>
<script src="scripts/controllers/dataGrid/anexoscontroller.js"></script>
<script src="scripts/controllers/navegacion/sidebarcontroller.js"></script>
<script src="scripts/controllers/unitic/uniticcontroller.js"></script>
<script src="scripts/controllers/reporte/reportecontroller.js"></script>
<script src="scripts/controllers/tic/consolidadosController.js"></script>
<script src="scripts/controllers/tic/consolidadosacasController.js"></script>
<script src="scripts/services/http/reportehttp.js"></script>
<script src="js/momentjs.com/downloads/moment.min.js" charset="utf-8"></script>
<script src="js/bootstrap-material-datetimepicker.js"></script>
<!--Home ips-->
<script src="scripts/controllers/genesis/homeipscontroller.js"></script>


<!-- wikode -->
<script src="scripts/controllers/planeacion/altagerencia.js"></script>
<script src="scripts/controllers/planeacion/agendarComite/agendarComiteController.js"></script>
<script src="scripts/controllers/planeacion/agregarCompromiso/agregarCompromisoController.js"></script>
<script src="scripts/controllers/planeacion/verCompromiso/verCompromisoController.js"></script>
<script src="scripts/controllers/planeacion/verAgenda/verAgendaController.js"></script>
<script src="scripts/controllers/planeacion/superadmin.js"></script>

<!-- <script type='text/javascript' src='scripts/controllers/calendario/moment.min.js'></script> -->
<!-- <script type='text/javascript' src='scripts/controllers/calendario/fullcalendar.min.js'></script> -->
<!-- <script type='text/javascript' src='scripts/controllers/calendario/locale/es.js'></script> -->
<!-- <link rel='stylesheet' type='text/css' href='css/calendario/fullcalendar.css' /> -->
<!-- wikode -->


<script>
  $( document ).ready(function() {
   localStorage.removeItem("ngStorage-communication");
   localStorage.removeItem("ngStorage-cabeza");
   localStorage.removeItem("ngStorage-beneficiario");
   localStorage.removeItem("ngStorage-municipio");
 });
</script>
<!-- Inicio Calendario -->


<script src='js/calendario/fullcalendar.min.js'></script>
<script src='js/calendario/locale-all.js'></script>
<script src='js/calendario/gcal.min.js'></script>

<script src='js/mlen/jquery.mlens-1.7.min.js'></script>
<!-- <script src='js/calendario/jquery-ui.min.js'></script> -->
<!-- Fin Calendario -->
<!-- ausentismo otras scripts -->
<script src="js/kendo.min.js"></script>
<script type="text/javascript" src="bower_components/kendo-ui-core-master/src/cultures/kendo.culture.es-MX.js"></script>
<script src="bower_components/jsgrid-1.5.3/src/jsgrid.core.js"></script>
<script src="bower_components/jsgrid-1.5.3/src/jsgrid.load-indicator.js"></script>
<script src="bower_components/jsgrid-1.5.3/src/jsgrid.load-strategies.js"></script>
<script src="bower_components/jsgrid-1.5.3/src/jsgrid.sort-strategies.js"></script>
<script src="bower_components/jsgrid-1.5.3/src/jsgrid.field.js"></script>
<script src="bower_components/jsgrid-1.5.3/src/fields/jsgrid.field.text.js"></script>
<script src="bower_components/jsgrid-1.5.3/src/fields/jsgrid.field.number.js"></script>
<script src="bower_components/jsgrid-1.5.3/src/fields/jsgrid.field.select.js"></script>
<script src="bower_components/jsgrid-1.5.3/src/fields/jsgrid.field.checkbox.js"></script>
<script src="bower_components/jsgrid-1.5.3/src/fields/jsgrid.field.control.js"></script>
<script src="bower_components/jsgrid-1.5.3/src/i18n/fr.js"></script>
<link rel="stylesheet" href="styles/ausentismo/selectjsgrid.css">
<link rel="stylesheet" media="all" type="text/css" href="bower_components/Intimidatetime-master/dist/Intimidatetime.min.css" />
<script src="bower_components/Intimidatetime-master/dist/Intimidatetime.min.js"></script>

<!--cdn procesos de rips reponsable aldair.guerrero-->
<!-- <script type="text/javascript" src="//cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script> -->
<script type="text/javascript" src="assets/js/qrcode.min.js"></script>
<!-- <script type="text/javascript" src="bower_components/instascan/instascan.min.js"></script> -->
<!-- fin cdns proceso rips -->
<script src="bower_components/materialize/bin/materialize.js"></script>
<script src="js/zoomy.min.js"></script>
<!--<script src="js/signature-agent.js"></script> -->

<!-- endbuild -->
</body>
</html>
