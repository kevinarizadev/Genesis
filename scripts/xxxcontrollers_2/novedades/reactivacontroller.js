'use strict';
angular.module('GenesisApp')
.controller('reactivacontroller', ['$http', '$scope', 'ngDialog', 'notification', 'cfpLoadingBar', '$window', '$timeout','$rootScope',
    function ($http, $scope, ngDialog, notification, cfpLoadingBar, $window, $timeout,$rootScope) { 
        $scope.btnGuarda = true;
        $scope.btnValidarDocumento = true;
        $scope.btnGn = true;
        $scope.causal == "B"
        $scope.shw_fecha_afiliacion_adres = true;
        $scope.OcultarSoporte = true;
        console.log(111111111)
        $http({
            method: 'POST',
            url: "php/funclistas.php",
            data: { function: 'cargaDepartamentos' }
        }).then(function (response) {
            $scope.NewDepartamentos = response.data;
            $scope.departamento = "";
        });

        $scope.chg_departamento = function () {
            swal({
                title: 'Buscando afiliados...',
                allowEscapeKey: false,
                allowOutsideClick: false
            });
            $http({
                method: 'POST',
                url: "php/funclistas.php",
                data: { function: 'cargaMunicipios', depa: $scope.departamento }
            }).then(function (response) {
                $scope.NewMunicipios = response.data;
                $scope.municipio = "";
                swal.close();
            });
        }

        $scope.chg_municipio = function () {
            $http({
                method: 'POST',
                url: "php/novedades/funcnovedades.php",
                data: { function: 'obtenerescenarios', ubicacion: $scope.municipio }
            }).then(function (response) {
                $scope.NewEscenarios = response.data;
                $scope.chg_boton();
            });
        }



        $http({
            method: 'POST',
            url: "php/novedades/funcnovedades.php",
            data: { function: 'cargacausales' }
        }).then(function (response) {
            $scope.Causales = response.data;
            $scope.causal = $scope.Causales[0].CODIGO;
        });
        function formatDate(date) {
            var month = date.getUTCMonth() + 1;
            date = date.getDate() + "/" + month + "/" + date.getFullYear();
            return date;
        }
        $scope.habilitafin = function () {
            if ($("#docidm")[0].value == "" || $("#docsisbenm")[0].value == "") {
                $scope.btnGuarda = true;
            } else {
                $scope.btnGuarda = false;
            }
        }
        $scope.chg_causal = function () {

            if ($scope.causal == "B") {
                $scope.chg_boton();
                $scope.shw_fecha_afiliacion_adres = true;
            } else {
                $scope.shw_fecha_afiliacion_adres = false;
            }
        }





        $scope.chg_boton = function () {
            if ($scope.causal == "B") {
                if ($scope.fecha_afiliacion == '' || $scope.fecha_afiliacion == null || $scope.fecha_afiliacion == undefined) {
                    $scope.btnGuarda = true;
                    $scope.btnValidarDocumento = true;
                    $scope.btnGn = true;
                } else {
                    $scope.btnGuarda = true;
                    $scope.btnGn = true;
                    $scope.btnValidarDocumento = false;
                }
            } else {
                $scope.btnGuarda = true;
                $scope.btnGn = true;
                $scope.btnValidarDocumento = false;
            }
        }

        $scope.ValidarDocumento = function () {
         $http({
            method: 'POST',
            url: "php/novedades/funcnovedades.php",
            data: { function: 'ValidaSoporteCargado',tipo_documento:$scope.type , documento: $scope.id}
        }).then(function (response) {
            $scope.valida = response.data.valida;
            $scope.soporte = response.data.soporte;
            if ($scope.valida.codigo < 5) {
                swal('Notificación','El Usuario No Tiene Cargado Todos Los Soportes','info');
                $scope.btnGuarda = false;
                $scope.btnValidarDocumento = true;
                $scope.btnGn = true;
                $scope.OcultarSoporte = false;
            } else {
                $scope.btnGuarda = true;
                $scope.btnValidarDocumento = true;
                $scope.btnGn = false;
                $scope.OcultarSoporte = true;
            }            
        });
    }




    $scope.ModalDigitalizacion = function (numero) {
        switch ($scope.causal) {
            case 'B':
            $scope.paquete = numero;
            $scope.tipo_documento = $scope.type;
            $scope.documento = $scope.id;
            $scope.TipoRes = 'NA';
            ngDialog.open({
                template: 'views/digitalizacion/modal/cargaanexo.html',
                className: 'ngdialog-theme-plain',
                controller: 'DigitalizacionController',
                scope: $scope
            })
            break;
            case 'P':
            case 'S':
            case 'T':
            if ($scope.escenario == '' || $scope.escenario == null || $scope.escenario == undefined) {
                swal('Notificación', 'Debe Seleccionar El Escenario', 'error');
            } else {
                $scope.paquete = numero;
                $scope.tipo_documento = $scope.type;
                $scope.documento = $scope.id;
                $scope.TipoRes = 'NA';
                ngDialog.open({
                    template: 'views/digitalizacion/modal/cargaanexo.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'DigitalizacionController',
                    scope: $scope
                })
            }
            break;
            default:
        }
    }

    $rootScope.$on('NovedadesActivar', function(event, args) {
        if(args == '0'){
            $scope.reactivaafiliado();
        }
    });

    $scope.reactivaafiliado = function () {
        if ($scope.fecha_afiliacion == '' || $scope.fecha_afiliacion == null || $scope.fecha_afiliacion == undefined){
            var fecha = new Date();
            var fecha_afiliacion = formatDate(fecha);
        } else {
            var fecha_afiliacion = formatDate($scope.fecha_afiliacion);
        }
        $http({
            method: 'POST',
            url: "php/novedades/funcnovedades.php",
            data: {
                function: 'guardacambiosIA',
                type: $scope.type,
                id: $scope.id,
                p_nombre: $scope.new.PRIMERNOMBRE,
                s_nombre: $scope.new.SEGUNDONOMBRE,
                p_apellido: $scope.new.PRIMERAPELLIDO,
                s_apellido: $scope.new.SEGUNDOAPELLIDO,
                sexo: $scope.new.SEXO,
                municipio: $scope.new.MUNICIPIO,
                escenario: $scope.new.ESCENARIO,
                f_nacimiento: formatDate($scope.new.NACIMIENTO),
                estado: $scope.new.ESTADO,
                t_documento: $scope.new.TIPODOCUMENTO,
                n_documento: $scope.new.DOCUMENTO,
                ficha_sisben: $scope.new.FICHASISBEN,
                n_sisben: $scope.new.NIVELSISBEN,
                discapacidad: $scope.new.DISCAPACIDAD,
                gpoblacional: $scope.new.GPOBLACIONAL,
                zona: $scope.new.ZONA,
                f_activacion: fecha_afiliacion,
                reactiva: 'S',
                causal: $scope.causal
            }
        }).then(function (res) {
            if (res.data.MENSAJE == '1') {
                notification.getNotification('success', 'Afiliado activado correctamente', 'Notificación');
                ngDialog.closeAll();
            } else {
                notification.getNotification('error', res.data.MENSAJE, 'Notificación');
            }
        })
    }
    $scope.guardaadjuntos = function () {
        var img = new FormData($("#frmActivacion")[0]);
        $.ajax({
            url: "php/novedades/uploadanexos.php",
            type: "POST",
            data: img,
            contentType: false,
            processData: false,
            dataType: 'json'
        }).done(function (data) {
            if (data.IDRES == 1 || data.SISBENRES == 1 || data.FUARRES == 1) {
                $scope.reactivaafiliado();
            }
        });
    }




}]);