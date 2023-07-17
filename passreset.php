<!DOCTYPE html>
<html ng-app="GenesisApp">

<head>
   <meta charset="UTF-8">
   <title>Portal Genesis</title>
   <link rel='stylesheet prefetch' href='http://fonts.googleapis.com/css?family=Open+Sans:600'>
   <link rel="stylesheet" href="assets/css/stylerecover.css">
  <link rel="stylesheet" href="styles/mara_login.min.css"/>
  <link rel="stylesheet" href="bower_components/angular-toastr/dist/angular-toastr.css" />
</head>

<body>
   <div class="login-wrap" ng-controller="loginController">
      <div class="login-html">
         <h4>Resetear contraseña</h4>
   		   <form class="">
            <div class="recover-form">
            <div class="funcionarios-html">
            <br>
               <div class="group">
                  <label for="user" class="label">Contraseña nueva</label>
                  <input id="user" type="password" class="input" ng-model="idafiliado">
               </div>
               <div class="group">
                  <label for="fecha" class="label">Vuelva a escribir la contraseña</label>
                  <input id="fecha" type="password" class="input" ng-model="expedicion">
               </div>
               <div class="group">
                  <input type="submit" class="button" value="Enviar" ng-click="login()" >
               </div>
               <div class="hr"></div>
            </div>
   		</form>
      </div>
   </div>
   </div>
</body>

<script src="js/jquery-3.1.1.min.js"></script>
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/angular-animate/angular-animate.js"></script>
<script src="bower_components/bootstrap/dist/js/bootstrap.js"></script>
<script src="bower_components/materialize/bin/materialize_login.js"></script>
<script type="text/javascript" src="js/ngStorage.js"></script>
<script src="bower_components/angular-toastr/dist/angular-toastr.tpls.js"></script>
<script src="scripts/const/const.js"></script>
<script src="scripts/controllers/login/logincontroller.js"></script>
<script src="scripts/services/http/AuthenticationService.js"></script>
<script src="scripts/services/util/notification.js"></script>

</html>