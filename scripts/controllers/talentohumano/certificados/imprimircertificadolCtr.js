'use strict';
	angular.module('GenesisApp',[])
	.config(function($locationProvider) {
     	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
		});
   })
 	.controller('imprimircertificadolCtr',['$scope','$http','$location','$timeout',
 	function($scope,$http,$location,$timeout) {
     $scope.tipo = $location.search().tipocertificado;
     $scope.interesado = $location.search().inter;
     $scope.nodirectivo ={
       "firma":"stefania_guzman.png",
       "Cargo":"ASISTENTE DE NOMINA",
       "Correo":"stephania.guzman@cajacopieps.com",
     }
     $scope.directivo={
      "firma":"andrea_de_leon.png",
      "Cargo":"JEFE DE OFICINA DE TALENTO HUMANO",
      "Correo":"andrea.deleon@cajacopieps.com",
    }
    $scope.fechaactual = function () {
            let fecha, horas, minutos, segundos, diaSemana, dia, mes, anio;
            fecha = new Date();
            horas = fecha.getHours();
            minutos = fecha.getMinutes();
            segundos = fecha.getSeconds();
            diaSemana = fecha.getDay();
            dia = fecha.getDate();
            mes = fecha.getMonth();
            anio = fecha.getFullYear();
            let semana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
            let diasemana = semana[diaSemana];
            let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            let mesnombre = meses[mes];
            $scope.fechacertificado =  dia + ' dia' + ' del mes de' + ' ' + mesnombre + ' ' + 'de' + ' ' + anio;
    }

    $.getJSON( "../../../php/obtenersession.php").done(function(respuesta) {
      $scope.usuariogenera = respuesta.usu;
      $scope.usuariocedula = respuesta.cedula;
   })

		$http({
         method:'GET',
         url:"../../../php/talentohumano/certificados/getcertificadolaboral.php",
         params: {numero: $location.search().documento
                  }
      }).then(function(data){
        $scope.fechaactual();
         $scope.datacert = data.data[0];
          $scope.tipoempleado =  $scope.datacert.tipo_empleado == 'APOYO' ? $scope.nodirectivo : $scope.directivo;
          console.log($scope.tipoempleado);
         $timeout(function () {
            print(true);
         }, 1000);
      });

      document.addEventListener('contextmenu', event => event.preventDefault());
      const body = document.querySelector('body');

      body.onkeydown = function (e) {
        if (e.keyCode === 17 || e.keyCode === 80) {
        } else {
          return false;
        }
      }
      var mediaQueryList = window.matchMedia('print');
      mediaQueryList.addListener(function (mql) {
        if (mql.matches) {
          console.log('se hizo antes de imprimir');
        } else {
          console.log('se hizo despues de imprimir');
          setTimeout(function () {
            window.close();
          }, 10);
        }
      });
	}
]);