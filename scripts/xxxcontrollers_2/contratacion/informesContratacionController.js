// 'use strict';
angular.module('GenesisApp').controller('informesContratacionController', ['$scope', '$http', 'consultaHTTP', 'notification', 'ngDialog', '$filter' , '$window', function ($scope, $http, consultaHTTP, notification, ngDialog, $filter, $window) {
    $(document).ready(function () {
        $('#modal_buscar').modal();
        $scope.obtndepartamentos();
        $scope.tipoServicio = '';
        $scope.departamento = '';
        $scope.f_inicial = '';
        $scope.f_fin = '';

    });

    function validar_json(str) {
        try {
            if (typeof str !== "string") {
            return false;
            } else {
            return (typeof JSON.parse(str) === 'object');
            }
        } catch (e) {
            return false;
        }
    }

    $scope.format_date = function (tipo, date) {
        if (date != undefined && date != null && date != "") {
          if (tipo <= 0) {
            let fecha = date.split("/");
            return new Date(fecha[2], (fecha[1] - 1), fecha[0]);
          } else if (tipo > 0) {
            var dia = date.getDate();
            var mes = date.getMonth() + 1;
            var año = date.getFullYear();
            if (tipo == 1) {
              return ((dia < 10) ? ("0" + dia) : dia) + '/' + ((mes < 10) ? ('0' + mes) : mes) + '/' + año;
            } else if (tipo == 2) {
              return año + '/' + mes + '/' + dia;
            } else if (tipo == 3) {
              var resultado = new Date(año, (mes - 1), (dia - 1));
              dia = resultado.getDate();
              mes = resultado.getMonth() + 1;
              año = resultado.getFullYear();
              return año + '-' + ((mes < 10) ? ('0' + mes) : mes) + '-' + ((dia < 10) ? ("0" + dia) : dia);
            } else if (tipo == 4) {
              return año + '-' + ((mes < 10) ? ('0' + mes) : mes) + '-' + ((dia < 10) ? ("0" + dia) : dia);
            } else if (tipo == 5) {
              return año;
            } else if (tipo == 6) {
              return mes;
            } else if (tipo == 7) {
              return dia;
            }
          }
        } else {
          return "";
        }
    }

    $scope.abrirModal = function (valor) {
        switch (valor) {
            case 1:
                $('#modal_buscar').modal('open');
                break;
        
            default:
                break;
        }
    };

    $scope.cerrarModal = function (valor) {
        switch (valor) {
            case 1:
                $('#modal_buscar').modal('close');
                break;
        
            default:
                break;
        }
    };

    $scope.obtndepartamentos = function () {
		swal({
			html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
			width: 200,
			allowOutsideClick: false,
			allowEscapeKey: false,
			showConfirmButton: false,
			animation: false
		});
		$http({
			method: 'POST',
			url: "php/contratacion/gestioncontratacion.php",
			data: {
				function: 'listaDepartamentos'
			}
		}).then(function (response) {
			$scope.departamentos = response.data;
			swal.close();
		});
	};

    // tipoServicio,fechaInicio,fechaFin
    $scope.informe = function(){
        // console.log( $scope.tipoServicio, $scope.format_date(1, $scope.f_inicial), $scope.format_date(1, $scope.f_fin) );
        if ( $scope.tipoServicio || $scope.departamento || $scope.format_date(1, $scope.f_inicial) || $scope.format_date(1, $scope.f_fin) ) {
            // swal({
            //     html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            //     width: 200,
            //     allowOutsideClick: false,
            //     allowEscapeKey: false,
            //     showConfirmButton: false,
            //     animation: false
            // });
            if ($scope.tipoServicio == 'RO') {
                $scope.tipo_servicio_nombre = 'Red_Oncologica';
            } else if ($scope.tipoServicio == 'CP'){
                $scope.tipo_servicio_nombre = 'Cuidados_Paliativos';
            } else if ($scope.tipoServicio == 'RH'){
                $scope.tipo_servicio_nombre = 'Red_Huerfanas';
            } else if ($scope.tipoServicio == 'RT'){
                $scope.tipo_servicio_nombre = 'Red_Transporte';
            } else if ($scope.tipoServicio == 'RU'){
                $scope.tipo_servicio_nombre = 'Red_Urgencias';
            }
            // if (condition) {
                
            // }
            $window.open( 'php/contratacion/informescontratacion.php?&fecha_inicio=' + $scope.format_date(1, $scope.f_inicial) + '&fecha_fin=' + $scope.format_date(1, $scope.f_fin) + '&tipo_servicio=' + $scope.tipoServicio + '&tipo_servicio_nombre=' + $scope.tipo_servicio_nombre + '&dpto=' + $scope.departamento);
            // $http({
            //     method: 'POST',
            //     url: "php/contratacion/gestioncontratacion.php",
            //     data: {
            //       function: 'descargar_informe',
            //       tipo_servicio: $scope.tipoServicio,
            //       fecha_inicio: $scope.format_date(1, $scope.f_inicial),
            //       fecha_fin: $scope.format_date(1, $scope.f_fin)
            //     }
            // }).then(function (response) {
            //     if (validar_json(angular.toJson(response.data))) {
            //         console.log(response.data);
            //     }else{
                    
            //     }
            // });
        }else{
            swal('Mensaje', 'Por favor digitar datos correctos.', 'info');
        }
    };
}])