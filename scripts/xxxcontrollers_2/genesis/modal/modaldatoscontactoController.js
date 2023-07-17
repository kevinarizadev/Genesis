'use strict';
angular.module('GenesisApp').controller('modaldatoscontactoController', ['$scope', 'ngDialog', '$http', 'afiliacionHttp', function ($scope, ngDialog, $http, afiliacionHttp) {
    $scope.test = "modaldatoscontactoController";


    $http({
        method: 'POST',
        url: 'php/genesis/inicio.php',
        data: {
            function: 'buscar_datos_contacto',
            tipo: sessionStorage.getItem('tipo'),
            documento: sessionStorage.getItem('doc')
        }
    }).then(function (response) {
        $scope.contacto = response.data['0'];
        $scope.contacto.nombre_completo = $scope.contacto.AFIC_PRIMER_NOMBRE + " " + $scope.contacto.AFIC_SEGUNDO_NOMBRE + " " + $scope.contacto.AFIC_PRIMER_APELLIDO + " " + $scope.contacto.AFIC_SEGUNDO_APELLIDO;
        $scope.contacto.principal = '';
        $scope.contacto.noprincipal = '';
        $scope.contacto.cruce = '';
        $scope.contacto.nocruce = '';
        $scope.contacto.complemento = '';
        $scope.tipoDoc = $scope.contacto.AFIC_TIPO_DOCUMENTO;
        setTimeout(() => {
            $scope.$apply();
        }, 500);
    })

    /*afiliacionHttp.obtenerViaPrincipal().then(function (response) {
        $scope.list_viaprincipal = response.Viaprincipal;
    })*/

    $scope.actualizar_gestantes = function () {
        $http({
            method: 'POST',
            url: "php/afiliacionlinea/seguimientodegestante.php",
            data: { function: 'obtenerafiliados', responsable: $scope.responsable, tipodocumento: $scope.tipoDoc, documento: $scope.documento }
        }).then(function () {

        });
    }


    $scope.obtenerViaPrincipal = function () {
        $http({
            method: 'POST',
            url: 'php/genesis/inicio.php',
            data: { function: 'obtenerViaPrincipal' }
        }).then(function (response) {
            $scope.list_viaprincipal = response.data;
        })

    }
    $scope.obtenerViaPrincipal();

    $scope.actualiza_direccion = function () {
        $scope.contacto.DIRECCION = $scope.contacto.principal + " " + $scope.contacto.noprincipal + " " + $scope.contacto.cruce + " " + $scope.contacto.nocruce + " " + $scope.contacto.complemento;
    }

    $scope.Validar_CamposVacios = function () {
        return new Promise((resolve) => {
            if ($scope.contacto.principal != '' && $scope.contacto.principal != undefined &&
                $scope.contacto.noprincipal != '' && $scope.contacto.noprincipal != undefined) {
                if ($scope.contacto.principal != 'C' && $scope.contacto.principal == 'VRD') {
                    resolve(true);
                }
            }
            resolve(false);
        })
    }

    $scope.actualiza_datos = function () {
        console.log(1);
        setTimeout(() => { $scope.$apply(); }, 500);
        $scope.Validar_CamposVacios().then(function (result) {
            if (!result) {
                $http({
                    method: 'POST',
                    url: 'php/genesis/inicio.php',
                    data: {
                        function: 'actualizar_datos_contacto',
                        tipo_documento: $scope.contacto.AFIC_TIPO_DOCUMENTO,
                        documento: $scope.contacto.AFIC_DOCUMENTO,
                        direccion: $scope.contacto.DIRECCION,
                        localidad: $scope.contacto.BARRIO,
                        telefono: $scope.contacto.TELEFONO,
                        celular: $scope.contacto.CELULAR,
                        celular2: (($scope.contacto.CELULAR2 == '' || $scope.contacto.CELULAR2 == undefined) ? $scope.contacto.CELULAR : $scope.contacto.CELULAR2),
                        correo: $scope.contacto.CORREO,
                        responsable: sessionStorage.getItem('cedula'),
                        fuente: 'GA'
                    }
                }).then(function (response) {
                    if (response.data.codigo == '0') {
                        swal('Exito', response.data.mensaje, 'success');
                        ngDialog.close();
                    } else {
                        swal('Error', response.data.mensaje, 'error');
                        $scope.actualizar_gestantes();
                    }
                })
            } else {
                swal('Error', 'Favor completar todos los cambios requeridos.', 'error');
            }
        })

    }


    $scope.confirmardatos = function () {



        $http({
            method: 'POST',
            url: 'php/genesis/inicio.php',
            data: {
                function: 'confirmar_datos_contacto',
                tipo_documento: $scope.contacto.AFIC_TIPO_DOCUMENTO,
                documento: $scope.contacto.AFIC_DOCUMENTO,
                responsable: sessionStorage.getItem('cedula')
            }
        }).then(function (response) {
            if (response.data.codigo == '0') {
                swal('Exito', response.data.mensaje, 'success');
                ngDialog.close();
            } else {
                swal('Error', response.data.mensaje, 'error');
            }
        })




    }

}])
