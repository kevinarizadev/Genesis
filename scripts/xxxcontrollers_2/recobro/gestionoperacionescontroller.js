'use strict';
angular.module('GenesisApp').controller('gestionoperacionescontroller', ['$scope', '$http', 'ngDialog', function ($scope, $http, ngDialog) {
    $scope.panel = true;
    $scope.user = "";
    $scope.tipo = false;
    $scope.obtenerListadoUser = function () {
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
            url: "php/aseguramiento/gestionaseguramiento.php",
            data: {
                function: 'ObtenerAcasXUsuarioyCantidad',
                area: 'O'
            }
        }).then(function (response) {
            $scope.listdeptsaseg = response.data;
            $scope.totalOpen = 0;
            $scope.totalClose = 0;
            for (const i in $scope.listdeptsaseg) {
                if ($scope.listdeptsaseg.hasOwnProperty(i)) {
                    $scope.totalOpen += $scope.listdeptsaseg[i].ACTIVO;
                    $scope.totalClose += $scope.listdeptsaseg[i].PROCESADO;
                }
            }
            setTimeout(() => {
                swal.close();
            }, 300);
        })
    }
    $scope.obtenerListadoUser();
    $scope.obtenerAcasXPersona = function (cedula, estado, nombre, tipo) {
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
            url: "php/aseguramiento/gestionaseguramiento.php",
            data: {
                function: 'obtenerAcasXPersona',
                cedula: cedula,
                estado: estado
            }
        }).then(function (response) {
            if(response.data.codigo!=1){
                $scope.listacas = response.data;
            }else {
                $scope.listacas = new Array();
            }
            $scope.panel = false;
            $scope.tipo = (tipo == "Abiertos") ? true : false;
            $scope.user = tipo + ": " + nombre;
            $scope.cloneHeadFixed();
            setTimeout(() => {
                swal.close();
            }, 300);
        })
    }
    $scope.buscarAcas = function (texto) {
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
            url: "php/aseguramiento/gestionaseguramiento.php",
            data: { function: 'obtenerAcas', keyword: texto, area: 'A' }
        }).then(function (response) {
            $scope.listacas = response.data;
            $scope.panel = false;
            $scope.tipo = true;
            $scope.user = "encontrados de la búsqueda de: " + texto;
            $scope.filtrar = "";
            $scope.buscaracas = "";
            $scope.cloneHeadFixed();
            setTimeout(() => {
                swal.close();
            }, 300);
        })
    }
    $scope.verdescripcion = function (desc, ticket, ubicacion) {
        $scope.desc = desc;
        $scope.ticket = ticket;
        $scope.ubicacion = ubicacion;
        ngDialog.open({
            template: 'views/tic/modal/ModalDetalles.html',
            className: 'ngdialog-theme-plain',
            controller: 'gestionaseguramientoModalcontroller',
            scope: $scope
        });
    }
    $scope.obtenerAcasDetalleXticket = function (ticket, ubicacion) {
        $http({
            method: 'POST',
            url: "php/aseguramiento/gestionaseguramiento.php",
            data: {
                function: 'obtenerAcasDetalleXticket', ticket: ticket,
                ubicacion: ubicacion
            }
        }).then(function (response) {
            $scope.listacasdetalle = response.data;
        })
    }
    $scope.cloneHeadFixed = function () {
        setTimeout(() => {
            var original = $('#tablaAseguramiento>thead');
            var clone = $('#tablaAseguramiento>thead').clone();
            var list = original[0].children[0].children;
            for (var i = 0; i < list.length; i++) {
                clone[0].children[0].children[i].style.width = list[i].offsetWidth + "px";
            }
            $('#tablaClone').html(clone).css("width", original[0].parentElement.offsetWidth + "px");;
        }, 500);
    }
    $(".scroll_x").on("scroll", function () {
        $(".scroll_x").scrollLeft($(this).scrollLeft());
    });
    $(window).resize(function () {
        $scope.cloneHeadFixed();
    });
    $scope.colors = function (value) {
        return { height: Math.round(value * 100 / $scope.totalOpen) + '%' }
    }
}])