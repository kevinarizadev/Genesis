'use strict';
angular.module('GenesisApp').controller('procesosController', ['$scope', '$http', function ($scope, $http) {
    $scope.panel = { home: true, select: -1, selecttext: -1 };
    
    $scope.macro_titulo = "";
    $scope.check_tipo = false;
    $scope.arrayT = [];
    $scope.level_0 = function (value) {
        $http({
            method: 'POST',
            url: "php/intranet/intranet_procesos.php",
            data: {
                function: 'getJson'
            }
        }).then(function (response) {
            $scope.macroprocesos = response.data.procesos;
            $scope.panel.home = !$scope.panel.home;
            $scope.macro_titulo = "MAPA DE PROCESOS";
            setTimeout(function () {
                $scope.left = 193;
                $scope.top = 0;
                for (var i = 0; i < $scope.macroprocesos.length; i++) {
                    (function (index) {
                        setTimeout(function () {
                            var item = document.getElementById("btn_" + [index]);
                            item.removeAttribute("style");
                            $(item).css({ "display": "flex", "left": $scope.left + "px", "top": $scope.top + "px", "animation": "introHome 0.3s ease" });
                            $scope.left = $scope.left - 96.5;
                            $scope.top = $scope.top + 96.5;
                        }, i * 100);
                    })(i);
                }
            }, 500);
        });
    }
    $scope.orden = [0, 1, 2];
    $scope.old = 0;
    $scope.btn_1_click = function (elem, id, index, titulo) {
        if ($scope.panel.select != index) {
            $scope.macro_titulo = titulo;
            if ($scope.orden[0] != id) {
                $scope.old = $scope.orden[0];
                $scope.orden[$scope.orden.indexOf(id)] = $scope.old;
                $scope.orden[0] = id;
            }
            $scope.left = 193;
            $scope.top = 0;
            for (let j = 0; j < $scope.orden.length; j++) {
                var item1 = document.getElementById("btn_" + $scope.orden[j]);
                $(item1).css({ "display": "flex", "left": $scope.left + "px", "top": $scope.top + "px" });
                $scope.left = $scope.left - 96.5;
                $scope.top = $scope.top + 96.5;
            }
            $scope.left = 300;
            $scope.top = 0;
            for (var i = 0; i < elem.length; i++) {
                var item = document.getElementById("btn_" + id + "_" + i);
                $(item).css({ "opacity": "1", "left": $scope.left + "px", "top": $scope.top + "px" });
                $scope.left = $scope.left + 110;
            }
        } else {
            $scope.macro_titulo = "MAPA DE PROCESOS";
        }
    }
    $scope.btn_2_click = function (icono, titulo, id, documentos, formatos, check) {
        $scope.icono = icono;
        $scope.titulo = titulo;
        $scope.id = id;
        $scope.documentos = documentos;
        $scope.formatos = formatos;
        $scope.check_tipo = false;
        //$scope.$apply();
        $scope.arrayT = documentos;
        $scope.filtrar = "";
        $("#textos").css({ "transform": "scale(0.6)" });
        $("#textos").hide();
        setTimeout(function () {
            $("#textos").show();
            $("#textos").css({ "transform": "scale(1)" });
        }, 300)
    }
    $scope.animation = function (level, id_1, id_2 = 0, index) {
        if (level == 1) {
            return { "animation": "animationInicio" + id_1 + " 0.5s ease 1." + id_1 + "s" }
        } else if (level == 2) {
            setTimeout(function () {
                var item = document.getElementById("btn_" + id_1 + "_" + id_2);
                $(item).css({ "opacity": "1", "display": "flex" });
            }, id_2 * 200)
            return { "animation": "select 0.5s ease" }
        }
    }
    $scope.getRutaTemp = function (ruta) {
        $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: {
                function: 'descargaAdjunto',
                ruta: ruta
            }
        }).then(function (response) {
            window.open("temp/" + response.data);
        });
    }
    $scope.iconoView = function (url) {
        if(url!=undefined && url!="" && url!=null){
            var ext = url.split(".");
            if (ext.length > 0) {
                if (ext[ext.length - 1].toUpperCase() == "PDF") {
                    return "icon-file-pdf red-text";
                } else if (ext[ext.length - 1].toUpperCase() == "DOC" || ext[ext.length - 1].toUpperCase() == "DOCX") {
                    return "icon-file-word blue-text";
                } else if (ext[ext.length - 1].toUpperCase() == "XLS" || ext[ext.length - 1].toUpperCase() == "XLSX") {
                    return "icon-file-excel green-text";
                } else if (ext[ext.length - 1].toUpperCase() == "PPT" || ext[ext.length - 1].toUpperCase() == "PPTX") {
                        return "icon-file-powerpoint orange-text";
                } else {
                    return "icon-attention-alt";
                }
            } else {
                return "icon-help";
            }
        } else {
            return "icon-help";
        }
    }
    angular.element(document).ready(function () {
        setTimeout(() => {
            if(document.querySelector("#theme-settings")!=undefined && document.querySelector("#theme-settings")!=null){
                document.querySelector("#theme-settings").hidden = true;
            }
        }, 1000);
    });
}])