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
   <link rel="stylesheet" href="bower_components/ng-dialog/css/ngDialog.css" />
  <link rel="stylesheet" href="bower_components/ng-dialog/css/ngDialog-theme-default.css" />
  <style type="text/css">
      .fondo{
         padding-top: 40px;
         position: absolute;
      }
  </style>
</head>

<body class="angular" ng-controller="registrocontroller">
<img src="assets/images/fondo_registro.jpg" class="fondo">
<main id="content" style="padding-left: 0 !important;">
   <div class="navbars col s12 m12 l12">
      <nav>
         <div class="nav-wrapper" style="background-color: #283965">
            <a class="brand-logo left"><img src="assets/images/mara.png" style="height: 80%" alt="MARA"></a>
            <a class="brand-logo right"><img src="assets/images/logo_cajacopieps_blanco.png" style="height: 65%" alt="MARA"></a>
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
   <div class="row dashboard-wrapper content-container" style="margin-bottom: 0 !important;" ng-hide="registro">
      <div class="col l8 m12 s12" style="padding-left: 30%;">
         <div class="card">
            <div class="card-content">
               <center><h5>Registro al Sistema Genesis - Cajacopi EPS</h5></center>
            </div>
            <div class="card-action" style="padding-bottom: 10px !important;">
               <blockquote style="border-left: 5px solid #000000 !important">
                  Señor afiliado, con el fin de proteger su información personal y de contacto, usted deberá realizar un corto proceso de registro a nuestra nueva plataforma <strong>Genesis</strong>. Al finalizar este proceso, podrá ingresar al sistema con su usuario y contraseña asignada. <br><br>Ingrese la siguiente información para validar su afiliación en nuestra base de datos:<br>
               </blockquote>
               <center><div class="input-label" style="width: 400px; overflow: auto;">
                  <div class="input-list input-view-column input-padding" ng-init="obtenerDocumento()" >
                     <label style=" margin-top: -20px;">Tipo de Documento</label>
                     <select ng-model="type" class="select-chosen-eps" ng-change="cambio()" ng-disabled ="validado">
                        <option value="0">SELECCIONAR</option>
                         <option value="CC">CEDULA DE CIUDADANÍA</option>
                         <option value="TI">TARJETA DE IDENTIDAD</option>
                         <option value="RC">REGISTRO CIVIL</option>
                         <option value="CN">CERTIFICADO NACIDO VIVO</option>
                         <option value="CE">CEDULA DE EXTRANJERÍA</option>
                         <option value="PA">PASAPORTE</option>
                         <option value="PE">PERMISO ESPECIAL DE PERMANENCIA</option>
                         <option value="AS">ADULTO SIN IDENTIFICACIÓN</option>
                         <option value="MS">MENOR SIN IDENTIFICACIÓN</option>
                         <option value="SC">SALVO CONDUCTO</option>
                         <option value="PT">PERMISO POR PROTECCIÓN TEMPORAL</option>
                         <option value="CD">CARNET DIPLOMATICO</option>
                         <option value="NU">NUMERO UNICO</option>
                         <option value="DE">DOCUMENTO EXTRANJERO</option>
                         <option value="NI">NUMERO DE IDENFICACION  TRIBUTARIA</optio>
                       <!--  <option value="CC">CEDULA DE CIUDADANÍA</option>
                        <option value="TI">TARJETA DE IDENTIDAD</option>
                        <option value="RC">REGISTRO CIVIL</option>
                        <option value="CE">CEDULA DE EXTRANJERÍA</option>
                        <option value="PA">PASAPORTE</option>
                        <option value="PE">PERMISO ESPECIAL DE PERMANENCIA</option>
                        <option value="AS">ADULTO SIN IDENTIFICACIÓN</option>
                        <option value="MS">MENOR SIN IDENTIFICACIÓN</option> -->
                     </select>
                  </div><br>
                  <div class="input-list input-view-column">
                     <input placeholder="Número de Documento" ng-model="id" type="text" class="validate" ng-change="cambio()" ng-disabled ="validado">
                  </div>
                  <div class="input-button">
                     <center>
                        <button class="btn btn-primary" ng-click="validaafiliado()" style="background-color: #283965 !important;">Validar</button>
                     </center>
                  </div>
               </div></center>
               <div id="correo" ng-hide="inemail">
                <form ng-submit="finalizar()">
                  <!-- <blockquote style="border-left: 5px solid #000000 !important">
                     Sr./Sra. {{res["0"].NOMBRE}} , por favor escriba su correo electrónico. En esa dirección le enviaremos un mensaje de verificación con su usuario y su contraseña.
                  </blockquote>
                  <center><div class="input-label" style="width: 400px;">
                     <div class="input-list input-view-column input-padding">
                        <div class="input-list input-view-column">
                           <input placeholder="Correo Electrónico" ng-model="correo" type="email" class="validate">
                        </div>
                     </div>
                  </div> -->
                  <blockquote style="border-left: 5px solid #000000 !important">
                     Sr./Sra. {{res["0"].NOMBRE}} , por favor escriba su número celular. A este número le enviaremos un mensaje de verificación con su usuario y su contraseña.
                  </blockquote>
                  <center><div class="input-label" style="width: 400px;">
                     <div class="input-list input-view-column input-padding">
                        <div class="input-list input-view-column">
                           <input numbers-only placeholder="Número Celular" ng-model="celular" type="text"  class="validate" required minlength="10" maxlength="10">
                        </div>
                     </div>
                  </center>
                  <blockquote style="border-left: 5px solid #000000 !important">
                     Para finalizar, por favor, ingrese la fecha de expedición de su documento de identidad.
                  </blockquote>
                  <center><div class="input-label" style="width: 400px;">
                     <div class="input-list input-view-column input-padding">
                        <div class="input-list input-view-column">
                           <div class="input-label">
                              <label for="normal" class="">Fecha de Expedición</label>
                           </div>
                           <input type="date" ng-model="expedicion" class="datepicker picker__input" aria-haspopup="true" aria-expanded="false" aria-readonly="false" aria-owns="datepicker_root" required>
                        </div>
                     </div>
                  </div>
                  </center>
                  <input type="checkbox" id="acepta" ng-model="agree" ng-change="checkagree()" />
                  <label for="acepta">
                     Acepto haber leído y entendido la <a ng-click="showpolicy()" target="_blank">política de privacidad de datos</a> de Cajacopi EPS.
                  </label>
                  <br>
                  <div class="input-button">
                     <center>
                        <button class="btn btn-primary" type="ng-submit" style="background-color: #283965 !important;" ng-disabled="endbtn">Finalizar</button>
                     </center>
                  </div><br>
                </form>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div class="row dashboard-wrapper content-container" style="margin-bottom: 0 !important;" ng-hide="success">
      <div class="col l8 m12 s12" style="padding-left: 30%;">
         <div class="card">
            <div class="card-content">
               <center><h5>Registro al Sistema Genesis - Cajacopi EPS</h5></center>
            </div>
            <div class="card-action" style="padding-bottom: 10px !important;">
               <center><img src="assets/images/check.svg" width="80px"></center>
               <blockquote style="border-left: 5px solid #000000 !important">
                  Registro finalizado exitosamente, se ha enviado un mensaje de texto a {{celular}} con su contraseña para iniciar sesión en nuestra plataforma!
               </blockquote><br>
            </div>
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
<script src="bower_components/ngMask/dist/ngMask.js"></script>
<script src="bower_components/materialize/bin/materialize.js"></script>
<script src="bower_components/angular-materialize/src/angular-materialize.js"></script>
<script src="scripts/controllers/login/registroctrl.js"></script>
<script src="scripts/services/http/AuthenticationService.js"></script>
<script src="scripts/services/util/notification.js"></script>
<script type="text/javascript" src="assets/js/loading-bar_login.js"></script>
<script src="bower_components/ng-dialog/js/ngDialog.js"></script>
</html>