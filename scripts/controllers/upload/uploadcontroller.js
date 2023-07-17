'use strict';
angular.module('GenesisApp')
 .controller('navbarcontroller',['$scope','afiliacionHttp','$localStorage', 'ngDialog',
 	function($scope,afiliacionHttp,$localStorage,ngDialog) {
 	var self=this;
 	 $(document).ready(function() {
       initialize();
     });

  function initialize()
    {
        if ($localStorage.junk == null){
        	window.location.href = 'index.html';
        }
        $scope.usuario = $localStorage.junk.nombre
    }

  $scope.MostrarPerfil = function () 
  { 
    ngDialog.open({ template: 'views/perfil/perfil.html', controller:'agregarbeneficiariocontroller',
            controllerAs:'ipctrl',scope:$scope });
  }
 
 }]);
