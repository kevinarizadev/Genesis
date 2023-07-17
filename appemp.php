<?php 
  session_start();
  if (!isset($_SESSION['nombre'])) {
      header("Location: index.html");
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
  <meta charset="utf-8">
  <title>Portal Genesis</title>
  <link rel="icon" href="assets/images/icon.ico" />
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width">
  <link rel="stylesheet" type="text/css" href="bower_components/jsgrid-1.5.3/css/jsgrid.css" />
  <link rel="stylesheet" type="text/css" href="bower_components/jsgrid-1.5.3/css/theme.css" />
  <link rel="stylesheet" href="bower_components/ng-dialog/css/ngDialog.css" />
  <link rel="stylesheet" href="bower_components/ng-dialog/css/ngDialog-theme-default.css" />
  <link rel="stylesheet" href="bower_components/angular-ui-select/dist/select.css" />
  <link rel="stylesheet" href="bower_components/ngprogress/ngProgress.css" />
  <link rel="stylesheet" href="bower_components/angular-material/angular-material.css" />
  <link rel="stylesheet" href="styles/font-awesome.min.css">
   <link rel="stylesheet" href="bower_components/materialize/bin/materialize.css" />
   <link rel="stylesheet" href="assets/css/material-design-iconic-font.css">
   <link rel="stylesheet" href="assets/css/fontello.css">
  <link rel="stylesheet" href="styles/medium-editor.min.css" type="text/css" media="screen" charset="utf-8">
  <link rel="stylesheet" type="text/css" href="styles/jquery.dataTables.min.css"/>
  <link rel="stylesheet" type="text/css" href="styles/responsive.dataTables.min.css"/>
  <link type="text/css" rel="stylesheet" href="assets/css/nouislider.css"  media="screen"/>
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
     <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2017.1.118/styles/kendo.common-nova.min.css"/>
     <link rel="stylesheet" href="styles/ausentismo/kendo.nova.css"/>
     <link rel="stylesheet" href="styles/ausentismo/kendo.nova.mobile.css"/>
     <link rel="stylesheet" href="styles/ausentismo/kendo.rtl.css"/>
     <link href="styles/fonts-material-icons.css" rel="stylesheet">

     <link rel="stylesheet" href="styles/ausentismo/customcard.css">
<!-- fin ausentismo -->
     <link rel="stylesheet" href="styles/gestiondocumental/cubos.css">
   <link rel="stylesheet" href="styles/inventario/listchequeo.css">
   <link rel="stylesheet" href="styles/calificame/calificame.css">
   <link rel="stylesheet" href="styles/bootstrap-material-datetimepicker.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
    integrity="sha384-OHBBOqpYHNsIqQy8hL1U+8OXf9hH6QRxi0+EODezv82DfnZoV7qoHAZDwMwEJvSw"
    crossorigin="anonymous">
    <link rel="stylesheet" href="styles/genesis-style/genesis-style.css">
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
  <div class="wrapper vertical-sidebar" >
     <div nav-bar></div>
      <div class="page-loader-container" data-page-loading ><div class="dizzy-gillespie"></div></div>
        <div class="wrapper vertical-sidebar" id="full-page">
         <main id="content">
      <div ui-view></div>
    </main>
      <div side-bar></div>
  </div>
</body>
<script>
 !function(A,n,g,u,l,a,r){A.GoogleAnalyticsObject=l,A[l]=A[l]||function(){
   (A[l].q=A[l].q||[]).push(arguments)},A[l].l=+new Date,a=n.createElement(g),
   r=n.getElementsByTagName(g)[0],a.src=u,r.parentNode.insertBefore(a,r)
 }(window,document,'script','//www.google-analytics.com/analytics.js','ga');

 ga('create', 'UA-XXXXX-X');
 ga('send', 'pageview');
</script>


<!-- /***** Corazones cayendo en el blog *****/ -->

<!--<script>
if(typeof $pdj=='undefined'){document.write('<'+'script');document.write(' language="javascript"');document.write(' type="text/javascript"');document.write(' src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js">');document.write('</'+'script'+'>')}
</script>-->
<!-- 
<script>
  if(typeof $pdj=='undefined'){var $pdj=jQuery.noConflict()}if(!image_urls){var image_urls=Array()}if(!flash_urls){var flash_urls=Array()}image_urls['corazon']="https://lh6.googleusercontent.com/-7-WYEBOVd7c/TzMiej4AFcI/AAAAAAAACLc/w2Fn6N9jwIU/s32/heart.png";$pdj(document).ready(function(){var c=$pdj(window).width();var d=$pdj(window).height();var e=function(a,b){return Math.round(a+(Math.random()*(b-a)))};var f=function(a){setTimeout(function(){a.css({left:e(0,c)+'px',top:'-30px',display:'block',opacity:'0.'+e(10,100)}).animate({top:(d-10)+'px'},e(8500,10000),function(){$pdj(this).fadeOut('slow',function(){f(a)})})},e(1,9000))};$pdj('<div></div>').attr('id','corazonDiv').css({position:'fixed',width:(c-20)+'px',height:'1px',left:'0px',top:'-5px',display:'block'}).appendTo('body');for(var i=1;i<=15;i++){var g=$pdj('<img/>').attr('src',image_urls['corazon']).css({position:'absolute',left:e(0,c)+'px',top:'-30px',display:'block',opacity:'0.'+e(10,100),'margin-left':0}).addClass('corazonDrop').appendTo('#corazonDiv');f(g);g=null};var h=0;var j=0;$pdj(window).resize(function(){c=$pdj(window).width();d=$pdj(window).height()})});
</script> -->

<!-- build:js(.) scripts/vendor.js -->
<!-- bower:js -->
<script src="bower_components/jquery/dist/jquery.js"></script>
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/bootstrap/dist/js/bootstrap.js"></script>
<script src="bower_components/angular-animate/angular-animate.js"></script>
<script src="bower_components/angular-cookies/angular-cookies.js"></script>
<script src="bower_components/angular-resource/angular-resource.js"></script>
<script src="bower_components/angular-sanitize/angular-sanitize.js"></script>
<script src="bower_components/ng-dialog/js/ngDialog.js"></script>
<script src="bower_components/materialize/bin/materialize.js"></script>
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
<script src="js/mara.min.js"></script>
<script type="text/javascript" src="js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="js/dataTables.responsive.min.js"></script>
<script type="text/javascript" src="assets/js/loading-bar.js"></script>
<script type="text/javascript" src="assets/js/prism.min.js"></script>

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

<script src="assets/js/libs/highcharts/highcharts.js"></script>

<script src="assets/js/libs/highcharts/modules/exporting.js"></script>
<script src="assets/js/libs/highcharts/highcharts-3d.js"></script>
<script src="assets/js/libs/highcharts/highcharts-more.js"></script>
<script src="assets/js/libs/highcharts/modules/data.js"></script>
<script src="assets/js/libs/highcharts/modules/drilldown.js"></script>
<script src="assets/js/libs/highcharts/export-csv.js"></script>

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

<script src="scripts/app.js"></script>
<script src="scripts/const/const.js"></script>
<script src="scripts/controllers/movilidad/solicitudmovilidadctrl.js"></script>
<script src="scripts/controllers/movilidad/missolicitudesctrl.js"></script>
<script src="scripts/controllers/movilidad/actualizarinfoctrl.js"></script>
<script src="scripts/controllers/movilidad/modal/modalAfiliarCtrl.js"></script>
<script src="scripts/controllers/movilidad/modal/modalDireccionCtrl.js"></script>
<script src="scripts/controllers/tic/versionamientoController.js"></script>
 <script src="scripts/services/http/tic/versionamientoHTTP.js"></script>
<!-- inventario -->
<!-- controller siau -->
<script src="scripts/controllers/calificame/calificamecontroller.js"></script>
<script src="scripts/controllers/calificame/infocalificamecontroller.js"></script>
<script src="scripts/services/http/calificacion/calificacionhttp.js"></script>  

<!-- Empresa -->
<script src="scripts/controllers/movilidad/empleadosController.js"></script>
<script src="scripts/controllers/movilidad/informacionempresaController.js"></script><!-- movilidad -->

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
<script src="scripts/services/http/reportehttp.js"></script>
<script src="js/momentjs.com/downloads/moment.min.js" charset="utf-8"></script>
<script src="js/bootstrap-material-datetimepicker.js"></script>

<script>
  $( document ).ready(function() {
         localStorage.removeItem("ngStorage-communication");
         localStorage.removeItem("ngStorage-cabeza");
         localStorage.removeItem("ngStorage-beneficiario");
         localStorage.removeItem("ngStorage-municipio");
   });
</script> 
 
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

<!--  -->
<!-- endbuild -->
</html>
