'use strict';
angular.module('GenesisApp', [])
.config(function ($locationProvider) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
})
.controller('formato_adversocontroller', ['$scope', '$http', '$location', '$timeout',
	function ($scope, $http, $location, $timeout) {


        

    

    $http({
        method: 'POST',
        url: "../../../php/censo/censo.php",
        data: { function: 'print_formato',
        v_preglon: $location.search().v_preglon,
        v_pnocenso:$location.search().v_pnocenso,
        v_pubicacion:$location.search().v_pubicacion
    }
      }).then(function (response) {
        $scope.resultado = response.data[0];
        if ($scope.resultado == null || $scope.resultado == undefined){
            swal('Notificacion','No se encontró resultado ', 'info' );
        }else{
            setTimeout(() => {
                print();
            }, 1000);
        }
      });


	}
	]);



