<!DOCTYPE html>
<html ng-app="GenesisApp">

<head>
   <meta charset="UTF-8">
   <title>Portal Genesis</title>
   <link rel="icon" href="assets/images/icon.ico" />
   <link rel='stylesheet prefetch' href='http://fonts.googleapis.com/css?family=Open+Sans:600'>
   <link rel="stylesheet" href="styles/mara.min.css"/>
   <link rel="stylesheet" href="bower_components/angular-material/angular-material.css" />
   <link href="styles/fonts-material-icons.css" rel="stylesheet">
   <link rel="stylesheet" href="styles/chosen.min.css">
   <link rel="stylesheet" href="styles/chosen-eps.css">
  <!-- endbower -->
  <!-- endbuild -->
  <!-- build:css(.tmp) styles/main.css -->
  <!-- endbuild -->
  <link rel="stylesheet" href="styles/mara_login.min.css"/>
  <link rel="stylesheet" href="bower_components/angular-toastr/dist/angular-toastr.css" />
  <link rel="stylesheet" href="assets/css/loading-bar.css">
  
</head>

<body class="angular" ng-controller="afiliadoscontroller">
<main id="content" style="padding-left: 0 !important;">
   <div class="navbars col s12 m12 l12">
       <nav>
           <div class="nav-wrapper" style="background-color: #283965">
               <a class="brand-logo right"><img src="assets/images/logo_cajacopieps_blanco.png" style="height: 65%" alt="MARA"></a>
               <a class="brand-logo left"><h4>CONSULTA DE AFILIADOS ASIGNADOS</h2></a>
               <div class="header-right">
                   <a href="#" data-activates="mobile-demo7" class="right button-collapse2 right-nav"><i class="material-icons menu">menu</i></a>
                   <ul class="right-ul right hide-on-med-and-down">
                       <li><a href=""><i class="zmdi zmdi-search "></i></a></li>
                   </ul>
               </div>
           </div>
       </nav>
   </div>
   <br>
   <div class="row dashboard-wrapper content-container" style="margin-bottom: 0 !important;">
      <div class="col l12 m12 s12">
         <div class="card">
            <div class="card-content">
               <h5>Información Importante</h5>
            </div>
            <div class="card-action">
               <blockquote style="border-left: 5px solid #000000 !important">
                  Señor usuario si usted se encuentra registrado en esta Base de Datos, favor dirigirse a la oficina municipal de Cajacopi para actualización de datos y verificación de la Red Prestadora de Servicios asignada, por favor llevar documento de identidad y fotocopia ampliada al 150%.
               </blockquote>
            </div>
         </div>
      </div>
   </div>
   <div class="row dashboard-wrapper content-container" style="margin-bottom: 0 !important;" id="datosbusqueda">
      <div class="col l6 m12 s12">
         <div class="card">
            <div class="card-title">
               <div class="text-al switch" style="display:flex;">
                  <strong>Buscar Documento</strong>
               </div>
            </div>
            <center><div class="input-label" style="width: 80%;">
               <div class="input-list input-view-column input-padding" ng-init="obtenerDocumento()">
                  <label style=" margin-top: -20px;">Tipo de Documento</label>
                  <select ng-model="consulta.tipodocumento" class="select-chosen-eps" ng-change="cambio()">
                     <option value="0">SELECCIONAR</option>
                     <option value="CC">CEDULA DE CIUDADANÍA</option>
                     <option value="TI">TARJETA DE IDENTIDAD</option>
                     <option value="RC">REGISTRO CIVIL</option>
                     <option value="CE">CEDULA DE EXTRANJERÍA</option>
                     <option value="PA">PASAPORTE</option>
                     <option value="PE">PERMISO ESPECIAL DE PERMANENCIAPERMISO ESPECIAL DE PERMANENCIA</option>
                     <option value="AS">ADULTO SIN IDENTIFICACIÓN</option>
                     <option value="MS"> MENOR SIN IDENTIFICACIÓN</option>
                  </select>
               </div><br>
               <div class="input-list input-view-column">
                  <input placeholder="Número de Documento" ng-model="consulta.numdocumento" type="text" class="validate" ng-change="cambio()">
               </div>
            </div></center>

            <div class="input-button">
               <center>
                  <button class="btn btn-primary" ng-click="consulta_documento()" style="background-color: #283965 !important;">Buscar</button>
                  <button class="btn btn-primary" ng-click="limpiar()" style="background-color: #283965 !important;">Limpiar</button>
               </center>
            </div>
            <br>
         </div>
      </div>
      <div class="col l6 m12 s12">
         <div class="card">
            <div class="card-title">
               <div class="text-al switch" style="display:flex;">
                  <strong>Buscar Nombre</strong>
               </div>
            </div>
            <div class="input-field">
               <div class="input-list input-form">
                  <div class="input-list input-view-column input-padding">
                     <input type="text" ng-model="consulta.primer_nombre" class="validate" placeholder="Primer Nombre" ng-change="cambio()">
                  </div>
                  <div class="input-list input-view-column">
                     <input class="validate" type="text" ng-model="consulta.segundo_nombre" placeholder="Segundo Nombre" ng-change="cambio()">
                  </div>
               </div>
               <div class="input-list input-form">
                  <div class="input-list input-view-column input-padding">
                     <input class="validate" ng-model="consulta.primer_apellido" placeholder="Primer Apellido" ng-change="cambio()">
                  </div>
                  <div class="input-list input-view-column">
                     <input class="validate" ng-model="consulta.segundo_apellido" placeholder="Segundo Apellido" ng-change="cambio()">
                  </div>
               </div>
            </div>

            <div class="input-button">
               <center>
                  <button class="btn btn-primary" ng-click="consulta_nombre()" style="background-color: #283965 !important;">Buscar</button>
                  <button class="btn btn-primary" ng-click="limpiar()" style="background-color: #283965 !important;">Limpiar</button>
               </center>
            </div>
            <br>
         </div>
      </div>
   </div>
   <div class="row dashboard-wrapper content-container" ng-hide="resultados">
      <div class="col l12 m12 s12">
         <div class="card">
            <div class="card-title">
               <div class="text-al switch" style="display:flex;">
                  <center><strong>Resultado</strong></center>
               </div>
            </div>
            <div class="card-content clearfix">
               <table class="highlight responsive-table highlight" align="center" style="cursor: pointer !important;">
                  <thead>
                     <tr>
                        <th>Tipo Documento</th>
                        <th>N° Documento</th>
                        <th>Nombre</th>
                        <th>Departamento</th>
                        <th>Municipio</th>
                        <th>Asignación</th>
                        <th>Dirección</th>
                     </tr>
                  </thead>

                  <tbody>
                     <tr data-ng-repeat="data in tabla_nombre track by $index">
                        <td>{{data.TipoDocumento}}</td>
                        <td>{{data.NumeroDocumento}}</td>
                        <td>{{data.Nombre}}</td>
                        <td>{{data.Departamento}}</td>
                        <td>{{data.Municipio}}</td>
                        <td>{{data.Ips_Primer_Nivel}}</td>
                        <td>{{data.DireccionOficina}}</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </div>
</main>
</body>
<script src="bower_components/jquery/dist/jquery.js"></script>
<script src="js/jquery-3.1.1.min.js"></script>
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/angular-animate/angular-animate.js"></script>
<script src="bower_components/bootstrap/dist/js/bootstrap.js"></script>
<script src="bower_components/materialize/bin/materialize_login.js"></script>
<script type="text/javascript" src="js/ngStorage.js"></script>
<script src="bower_components/angular-toastr/dist/angular-toastr.tpls.js"></script>
<script src="scripts/const/const.js"></script>
<script src="bower_components/materialize/bin/materialize.js"></script>
<script src="bower_components/angular-materialize/src/angular-materialize.js"></script>
<script src="scripts/controllers/login/afiliadoscontroller.js"></script>
<script src="scripts/services/http/AuthenticationService.js"></script>
<script src="scripts/services/util/notification.js"></script>
<script type="text/javascript" src="assets/js/loading-bar.js"></script>
</html>