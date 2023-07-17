<!DOCTYPE html>
<html ng-app="GenesisApp">

<head>
   <meta charset="UTF-8">
   <title>Consulta de Nuevos Afiliados</title>
   <link rel="icon" href="assets/images/icon.ico" />
   <link rel='stylesheet prefetch' href='http://fonts.googleapis.com/css?family=Open+Sans:600'>
   <link rel="stylesheet" href="assets/css/styleconsulta.css">
  <!-- endbower -->
  <!-- endbuild -->
  <!-- build:css(.tmp) styles/main.css -->
  <!-- endbuild -->
  <link rel="stylesheet" href="styles/mara_login.min.css"/>
  <link rel="stylesheet" href="bower_components/angular-toastr/dist/angular-toastr.css" />
  <link rel="stylesheet" href="assets/css/loading-bar.css">
  
</head>

<body>
	<img src="assets/images/left.jpg" class="left">
   <img src="assets/images/cajacopiconsulta.png" class="logo">
   <div class="login-wrap" ng-controller="afiliadoscontroller" style="max-width: 800px !important;">
      <div class="login-html">
            <input id="tab-1" type="radio" name="tab" class="funcionarios" ng-click="tabla_nombre = ''" checked>
            <label for="tab-1" class="tab">Guajira</label>
            <input id="tab-2" type="radio" name="tab" class="afiliados" ng-click="tabla_nombre = ''">
            <label for="tab-2" class="tab">Cordoba - Sucre</label>

            <div class="login-form">
               <div class="funcionarios-htm">
                  <center><h4 style="color: white !important;">GUAJIRA</h4>
                     <div class="group">
                     <label for="pass" class="label">TIPO DE BUSQUEDA</label>
                     <select class="select" ng-model="tipobusqueda" ng-change="busqueda()">
                        <option value="1">Busqueda por Documentación</option>
                        <option value="2">Busqueda por Nombre</option>
                     </select>
                  </div>
                     <br><br>
                     <div ng-hide="busquedadocumento">
                     <form>   
                        <div class="group">
                           <label for="pass" class="label">Tipo Documento</label>
                           <select id="tipo_doc" ng-model="consultaguajira.tipodocumento" class="select">
                              <option value="0">SELECCIONAR</option>
                              <option value="CC">CEDULA DE CIUDADANÍA</option>
                              <option value="TI">TARJETA DE IDENTIDAD</option>
                              <option value="RC">REGISTRO CIVIL</option>
                              <option value="CE">CEDULA DE EXTRANJERÍA</option>
                              <option value="PA">PASAPORTE</option>
                              <option value="AS">ADULTO SIN IDENTIFICACIÓN</option>
                              <option value="MS"> MENOR SIN IDENTIFICACIÓN</option>
                           </select>
                        </div>
                        <div class="group">
                           <label for="pass" class="label">Número Documento</label>
                           <input id="password" ng-model="consultaguajira.numdocumento" type="text" class="input" >
                        </div>
                        <div class="group">
                           <input type="submit" class="button" value="Buscar" ng-click="consulta_guajira()" data-toggle="modal" data-target="#resultado_consulta">
                        </div>
                        <div class="group">
                           <input type="reset" name="limpiar" value="Limpiar" ng-click="tabla_nombre = ''" class="button">
                        </div>
                     </div>
                     <div ng-hide="busquedanombre">
                        <div class="group">
                           <label for="pass" class="label">Primer Nombre</label>
                           <input id="password" ng-model="consultaguajira.primer_nombre" type="text" class="input" required>
                        </div>
                        <div class="group">
                           <label for="pass" class="label">Segundo Nombre</label>
                           <input id="password" ng-model="consultaguajira.segundo_nombre" type="text" class="input" >
                        </div>
                        <div class="group">
                           <label for="pass" class="label">Primer Apellido</label>
                           <input id="password" ng-model="consultaguajira.primer_apellido" type="text" class="input" required>
                        </div>
                        <div class="group">
                           <label for="pass" class="label">Segundo Apellido</label>
                           <input id="password" ng-model="consultaguajira.segundo_apellido" type="text" class="input" >
                        </div>
                        <div class="group">
                           <input type="submit" class="button" value="Buscar" ng-click="consulta_nombreguajira()" data-toggle="modal" data-target="#resultado_consulta">
                        </div>
                        <div class="group">
                           <input type="reset" name="limpiar" value="Limpiar" ng-click="tabla_nombre = ''" class="button">
                        </div>
                     </div>
                     
                     <br>
                     <div class="group" style="color: white !important;">
                        <table class="tabla" ng-hide="noresults">
                           <tr>
                              <td>TIPO</td>
                              <td>N° IDENTIFICACIÓN</td>
                              <td>NOMBRE</td>
                              <td>DEPARTAMENTO</td>
                              <td>MUNICIPIO</td>
                              <td>IPS</td>
                           </tr>
                           <tr data-ng-repeat="data in tabla_nombre track by $index">
                              <td>{{data.TipoDocumento}}</td>
                              <td>{{data.NumeroDocumento}}</td>
                              <td>{{data.Nombre}}</td>
                              <td>{{data.Departamento}}</td>
                              <td>{{data.Municipio}}</td>
                              <td>{{data.Ips_Primer_Nivel}}</td>
                           </tr> 
                        </table>
                     </div>
                     </center>
                  
               </div> 
         </form>
         <form>
            <div class="afiliados-htm">
               <center><h4 style="color: white !important;">CÓRDOBA - SUCRE</h4>
               <div class="group">
                     <label for="pass" class="label">TIPO DE BUSQUEDA</label>
                     <select class="select" ng-model="tipobusqueda_cordoba" ng-change="busqueda_cordoba()">
                        <option value="1">Busqueda por Documentación</option>
                        <option value="2">Busqueda por Nombre</option>
                     </select>
                  </div><br><br>
                  <div ng-hide="busquedadocumento_cordoba">
                     <div class="group">
                        <label for="pass" class="label">Tipo Documento</label>
                        <select id="tipo_doc" ng-model="consultacordoba.tipodocumento" class="select">
                           <option value="0">SELECCIONAR</option>
                           <option value="CC">CEDULA DE CIUDADANÍA</option>
                           <option value="TI">TARJETA DE IDENTIDAD</option>
                           <option value="RC">REGISTRO CIVIL</option>
                           <option value="CE">CEDULA DE EXTRANJERÍA</option>
                           <option value="PA">PASAPORTE</option>
                           <option value="AS">ADULTO SIN IDENTIFICACIÓN</option>
                           <option value="MS"> MENOR SIN IDENTIFICACIÓN</option>
                        </select>
                     </div>
                     <div class="group">
                        <label for="pass" class="label">Número Documento</label>
                        <input id="password" ng-model="consultacordoba.numdocumento" type="text" class="input" >
                     </div>
                     <div class="group">
                        <input type="submit" class="button" value="Buscar" ng-click="consulta_cordoba()">
                     </div>
                  </div>
                  <div ng-hide="busquedanombre_cordoba">
                     <div class="group">
                        <label for="pass" class="label">Primer Nombre</label>
                        <input id="password" ng-model="consultacordoba.primer_nombre" type="text" class="input" required>
                     </div>
                     <div class="group">
                        <label for="pass" class="label">Segundo Nombre</label>
                        <input id="password" ng-model="consultacordoba.segundo_nombre" type="text" class="input" >
                     </div>
                     <div class="group">
                        <label for="pass" class="label">Primer Apellido</label>
                        <input id="password" ng-model="consultacordoba.primer_apellido" type="text" class="input" required>
                     </div>
                     <div class="group">
                        <label for="pass" class="label">Segundo Apellido</label>
                        <input id="password" ng-model="consultacordoba.segundo_apellido" type="text" class="input" >
                     </div>
                     <div class="group">
                        <input type="submit" class="button" value="Buscar" ng-click="consulta_nombrecordoba()" data-toggle="modal" data-target="#resultado_consulta">
                     </div>
                     <div class="group">
                        <input type="reset" name="limpiar" value="Limpiar" ng-click="tabla_nombre = ''" class="button">
                     </div>
                  </div>
               <div class="group" style="color: white !important;">
                        <table class="tabla" ng-hide="noresults">
                           <tr>
                              <td>TIPO</td>
                              <td>N° IDENTIFICACIÓN</td>
                              <td>NOMBRE</td>
                              <td>DEPARTAMENTO</td>
                              <td>MUNICIPIO</td>
                              <td>IPS</td>
                           </tr>
                           <tr data-ng-repeat="data in tabla_nombre track by $index">
                              <td>{{data.TipoDocumento}}</td>
                              <td>{{data.NumeroDocumento}}</td>
                              <td>{{data.Nombre}}</td>
                              <td>{{data.Departamento}}</td>
                              <td>{{data.Municipio}}</td>
                              <td>{{data.Ips_Primer_Nivel}}</td>
                           </tr> 
                        </table>
                     </div>
                  </center>
               </div>
            </div>
         </form>
      </div>
   </div>
</div>
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
<script src="scripts/controllers/login/afiliadoscontroller.js"></script>
<script src="scripts/services/http/AuthenticationService.js"></script>
<script src="scripts/services/util/notification.js"></script>
<script type="text/javascript" src="assets/js/loading-bar.js"></script>
</html>