<!DOCTYPE html>
<html ng-app="GenesisApp">

<head>
   <meta charset="UTF-8">
   <title>Portabilidad - Cajacopi EPS</title>
   <link rel="icon" href="assets/images/icon.ico" />
   <link rel="stylesheet" type="text/css" href="bower_components/jsgrid-1.5.3/css/jsgrid.css" />
  <link rel="stylesheet" type="text/css" href="bower_components/jsgrid-1.5.3/css/theme.css" />
  <link rel="stylesheet" href="bower_components/ng-dialog/css/ngDialog.css" />
  <link rel="stylesheet" href="bower_components/ng-dialog/css/ngDialog-theme-default.css" />
  <link rel="stylesheet" href="bower_components/angular-ui-select/dist/select.css" />
  <link rel="stylesheet" href="bower_components/ngprogress/ngProgress.css" />
  <link rel="stylesheet" href="bower_components/angular-material/angular-material.css" />
  <!-- endbower -->
  <!-- endbuild -->
  <!-- build:css(.tmp) styles/main.css -->
  <!-- endbuild -->
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
   <!-- <link type="text/css" rel="stylesheet" href="assets/js/libs/chosen/chosen.min.css"  media="screen"/> -->
  <script src="bower_components/sweetalert/js/sweetalert2.min.js"></script>
  <link rel="stylesheet" type="text/css" href="bower_components/sweetalert/css/sweetalert2.css">
     <link href="styles/fonts-material-icons.css" rel="stylesheet">

     <link rel="stylesheet" href="styles/ausentismo/customcard.css">
   <!-- fin ausentismo -->
   <link rel="stylesheet" href="styles/inventario/listchequeo.css">
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

<body class="angular" ng-controller="exesopctrl" ng-cloak>
   <main id="content" style="padding-left: 0 !important;">
      <div class="navbars col s12 m12 l12">
          <nav>
              <div class="nav-wrapper" style="background-color: #283965">
                  <a class="brand-logo right"><img src="assets/images/logo_horizontal.png" style="height: 80%" alt="MARA"></a>
                  <a class="brand-logo left"><h4>Solicitud de Portabilidad</h2></a>
              </div>
          </nav>
      </div>
      <br>
      <div class="row dashboard-wrapper content-container" style="margin-bottom: 0 !important;" ng-show="panelbusqueda">
         <div class="col l12 m12 s12">
            <div class="card">
               <div class="card-content">
                  <h5>Información Importante</h5>
               </div>
               <div class="card-action">
                  <blockquote style="border-left: 5px solid #000000 !important">
                     Si eres afiliado a Cajacopi EPS puedes acceder a tus servicios de salud desde cualquier lugar del país mediante el Decreto 1683 de 2013 – Portabilidad Nacional en Salud. <br>
                     El Usuario que emigre de municipio y requiera del mismo servicio que utilizaba en su municipio de origen en otro domicilio, deberá solicitar ante la EPS, mediante la línea telefónica de atención al usuario: 018000111446, por escrito,  por correo electrónico exclusivo para trámites de portabilidad: <a href="mailto:portabilidad@cajacopieps.com">portabilidad@cajacopieps.com</a>, personalmente, o a través de cualquier otro medio, la asignación de una  IPS primaria del municipio donde residirá, diferente al lugar de origen de su afiliación. <br>                    
                  </blockquote>
                  <div class="col s12">
                     <div class="input-field col l4 m12 s12" ng-init="obtenerDocumento()">
                        <label class="active">Tipo de Documento</label>
                        <select class="select-chosen-eps" ng-model="type" ng-change="solobusqueda()"> 
                           <option ng-repeat="documento in Documentos.Documento" ng-value="documento.Codigo">{{documento.Nombre}}</option>
                        </select>
                     </div>
                     <div class="input-field col l4 m12 s12" >
                        <input id="id" type="text" class="validate" ng-model="id" ng-change="solobusqueda()">
                        <label for="id" class="">Número de identificación</label>
                     </div>
                  </div>
                  <div class="input-button" style="padding-bottom: 15px !important;">
                     <center>
                        <a class="waves-effect waves-light btn white-text primary-button" style="margin-top: 25px; background-color: #1a2e63;" ng-click="solicitud()">Solicitar</a>
                        <a class="waves-effect waves-light btn white-text primary-button" style="margin-top: 25px; background-color: #1a2e63;" ng-click="solicitud()">Consultar Estado</a>
                     </center>   
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="row dashboard-wrapper content-container" style="margin-bottom: 0 !important;" ng-show="panelsolicitud">
         <div class="col l12 m12 s12">
            <div class="card">
               <div class="card-content">
                  <div class="card-content">
                    <h5>Solicitud de Portabilidad</h5>
                 </div>
               </div>
               <div class="col l12 m12 s12">
                  <blockquote>
                     Tenga en cuenta los siguientes pasos antes de completar el proceso:
                  </blockquote>
                  <ol>
                     <li>Diligencie el formulario teniendo en cuenta los campos obligatorios marcados con (*).</li>
                     <li>Recuerde que la información que ingrese debe ser veraz para garantizar el trámite.</li>
                     <li>Si va a realizar más de una solicitud debe diligenciar el formulario de acuerdo al número de solicitudes.</li>
                     <li>Tú solicitud será atendida en un plazo no mayor a diez días hábiles a partir del recibo de la solicitud.</li>
                     <li>Una vez atendida su solicitud, se le enviará respuesta al correo electrónico y/o dirección de domicilio que haya proporcionado.</li>
                     <li>Usted podrá consultar el estado de su solicitud a través del submenú en el ítem "Consulta Solicitud".</li>
                  </ol>
                  <div class="input-field col l3 m12 s12" ng-init="obtenerDepartamentos()">
                     <label style=" margin-top: -20px;">Departamento Receptor</label>
                     <select class="select-chosen-eps" ng-model="departamento" ng-change="obtenerMunicipios()">
                        <option value="X">SELECCIONAR</option>
                        <option ng-repeat="depa in Departamentos track by $index" ng-value="depa.CODIGO">{{depa.NOMBRE}}</option>
                     </select>
                  </div>
                  <div class="input-field col l3 m12 s12">
                     <label style=" margin-top: -20px;">Municipio Receptor</label>
                     <select class="select-chosen-eps" ng-model="municipio" ng-change="obtenerIps()">
                        <option value="X">SELECCIONAR</option>
                        <option ng-repeat="municipio in Municipios track by $index" ng-value="municipio.CODIGO">{{municipio.NOMBRE}}</option> 
                     </select>
                  </div>
                  <div class="input-field col l3 m12 s12">
                     <label style=" margin-top: -20px;">IPS Receptora</label>
                     <select id="escenario" class="select-chosen-eps" ng-model="ipsreceptora" ng-disabled="dsbIps"> 
                        <option value="X">SELECCIONAR</option>
                        <option ng-repeat="ips in Ipss track by $index" ng-value="ips.CODIGO">{{ips.NOMBRE}}</option> 
                     </select>
                  </div>
                  <div class="input-field col l2 m12 s12">
                     <input id="ficha_sisben" type="text" ng-model="otraips">
                     <label for="ficha_sisben" class="">Otra</label>
                  </div>
               </div>
               <div class="col l12 m12 s12">
                  <blockquote style="border-left: 5px solid #000000 !important">Información de contacto temporal:</blockquote>
                  <div class="input-field col l6 m12 s12">
                     <input id="portdireccion" type="text" ng-model="direccion">
                     <label for="portdireccion" class="">Dirección</label>
                  </div>
                  <div class="input-field col l5 m12 s12">
                     <input id="portlocalidad" type="text" ng-model="localidad">
                     <label for="portlocalidad" class="">Localidad</label>
                  </div>
                  <div class="input-field col l4 m12 s12">
                     <input id="tel" type="tel" class="validate requerido" ng-model="telfijo">
                     <label for="normal" class="">Telefono</label>
                  </div>
                  <div class="input-field col l4 m12 s12">
                     <input ng-disabled="saved" id="email" type="email" class="validate requerido" ng-model="correo">
                     <label for="normal" class="">Correo Electronico</label>
                  </div>
                  <div class="input-field col l3 m12 s12">
                     <label for="permanencia" style=" margin-top: -20px;">Tiempo</label>
                     <select id="permanencia" class="select-chosen-eps" ng-model="permanencia"> 
                        <option value="1">MENOS DE UN MES</option>
                        <option value="2">UN AÑO</option>
                        <option value="3">MAS DE UN AÑO</option>
                     </select>
                  </div>
               </div>
               <div class="col l12 m12 s12">
                  <blockquote style="border-left: 5px solid #000000 !important">Observación</blockquote>
                  <div class="input-field col l6 m12 s12">
                     <textarea id="textarea1" class="materialize-textarea" ng-model="observacion" rows="2"></textarea>
                     <label for="textarea1">Observación</label>
                  </div>
               </div>
               <div class="input-button" style="padding-bottom: 15px !important;">
                  <center>
                     <a class="waves-effect waves-light btn white-text primary-button" style="margin-top: 25px; background-color: #1a2e63;" ng-click="solicitar()">Solicitar</a>
                  </center>   
               </div>
            </div>
         </div>
      </div>
      <div class="row dashboard-wrapper content-container" style="margin-bottom: 0 !important;" ng-show="panelSA">
         <div class="col l12 m12 s12">
            <div class="card card-default ">
               <div class="card-title">
                  <div class="text-al switch" style="display:flex;">
                     <strong>Solicitud de Portabilidad</strong>
                  </div>
               </div>
               <div class="col l12 m12 s12">
                  <blockquote>
                     Estimado afiliado, Su solicitud de Portabilidad fue registrada efectivamente, en cumplimiento de la normatividad legal vigente Decreto 1683 de 2013 y 780 de 2016, podrá descargar su certificado de Portabilidad en el Portal genesis o acercándose a la oficina más cercana dentro de 10 días hábiles a partir del día de solicitud.
                  </blockquote>
               </div>
               <div class="input-button" style="padding-bottom: 15px !important;">
                  <center>
                     <a class="waves-effect waves-light btn white-text primary-button" style="margin-top: 25px; background-color: #1a2e63;" ng-click="salirSA()">Salir</a>
                  </center>   
               </div>
            </div>
         </div>
      </div>
      <div class="row dashboard-wrapper content-container" style="margin-bottom: 0 !important;" ng-show="panelconsulta">
         <div class="col l12 m12 s12">
            <div class="card">
               <div class="card-title">
                  <div class="text-al switch" style="display:flex;">
                     <center><strong>Información</strong></center>
                  </div>
               </div>
               <div class="card-content clearfix">
                  <blockquote>
                     Estimado afiliado, su solicitud ha sido procesada de manera exitosa. Estos son los datos de la solicitud presentada. Para descargar su Certificado de Portabilidad lo podra realizar a partir de {{afil_portabilidad.FECHA_CERT}} ingresando a <a href="https://genesis.cajacopieps.com//">Portal Genesis</a>
                  </blockquote>
                  <table class="highlight responsive-table highlight" align="center">
                     <thead>
                        <tr>
                           <th>FECHA SOLICITUD</th>
                           <th>TIPO</th>
                           <th>DOCUMENTO</th>
                           <th>NOMBRE</th>
                           <th>MUNICIPIO</th>
                           <th>RECEPCIÓN</th>
                           <th>IPS ASIGNADA</th>
                           <th>OBSERVACIÓN</th>
                        </tr>
                     </thead>

                     <tbody>
                        <tr>
                           <td>{{afil_portabilidad.FECHA_SOLICITUD}}</td>
                           <td>{{afil_portabilidad.TIPODOC}}</td>
                           <td>{{afil_portabilidad.DOCUMENTO}}</td>
                           <td>{{afil_portabilidad.NOMBREAFIL}}</td>
                           <td>{{afil_portabilidad.ORIGEN}}</td>
                           <td>{{afil_portabilidad.DESTINO}}</td>
                           <td>{{afil_portabilidad.IPS}}</td>
                           <td>{{afil_portabilidad.OBSERVACION}}</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
   </main>
</body>

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
<!-- endbower -->
<!-- endbuild -->
<script src="bower_components/artyom.js/src/artyom.min.js"></script>
<script src="bower_components/ngMask/dist/ngMask.js"></script>
<script src="js/mara.min.js"></script>
<script type="text/javascript" src="js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="js/dataTables.responsive.min.js"></script>
<script type="text/javascript" src="assets/js/loading-bar_login.js"></script>
 


<script type="text/javascript" src="assets/js/prism.min.js"></script>
<script src="js/jquery-ui.js"></script>
<script src="bower_components/angular-toastr/dist/angular-toastr.tpls.js"></script>


<script src="scripts/controllers/esop/solicitud_externa.js"></script>

<script src="scripts/services/util/notification.js"></script>
<script src="scripts/services/http/consultahttp.js"></script>

<script src="js/chosen.jquery.js"></script>

</html>