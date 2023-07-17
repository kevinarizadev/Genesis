'use strict';
angular.module('GenesisApp').controller('estrategicoController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    $scope.url = $sce.trustAsResourceUrl('');
    $scope.power_bi = new Array();
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
    $http({
        method: 'POST',
        url: "php/tic/configuracionacceso/configuracionacceso.php",
        data: {
            function: 'get_json_bi',
            nit: (sessionStorage.getItem("nit") == 0) ? 890102044 : sessionStorage.getItem("nit"),
            cedula: sessionStorage.getItem("cedula")
        }
    }).then(function (response) {
        if (validar_json(angular.toJson(response.data)) && response.data != undefined && response.data != "" && response.data != null && response.data.Estrategico.length > 0) {
            var style = document.querySelector("#estrategico>style");
            var css = "";
            const conte = Math.round(document.querySelector(".circle-container").offsetWidth);
            const items = response.data.Estrategico.length;
            var calc = 0;
            if (response.data.Estrategico.length > 1) {
                response.data.Estrategico.forEach(function (element, i) {
                    var calc = Math.round(i / items * 360);
                    css += "\n#item_estrategico_" + calc + " {\ntransform: rotate(" + calc + "deg) translate(14vw) rotate(-" + calc + "deg);\n}\n";
                    response.data.Estrategico[i].id = calc;
                    $scope.power_bi.push(response.data.Estrategico[i]);
                });
            } else {
                css += "\n#item_estrategico_" + calc + " {\ntransform: rotate(" + calc + "deg) translate(0vw) rotate(-" + calc + "deg)!important;\n}\n";
                response.data.Estrategico[0].id = 0;
                $scope.power_bi.push(response.data.Estrategico[0]);
            }
            style.innerHTML += css;
        } else {
            $scope.power_bi = new Array();
        }
    });
    $scope.viewPDF = function (link) {
        $scope.url = $sce.trustAsResourceUrl(link);
    }
    $scope.atras = function () {
        $scope.url = "";
        document.querySelector(".circle-container").style.transform = "translate(34vw) scale(0.5)";
        document.querySelector(".circle-container").classList.add("animacion_init");
        document.querySelectorAll(".circle-container>*").forEach(function (element, index) {
            element.style.transition = "transform 0ms 0ms";
            element.style.transform = "translate(14vw)";
        });
        setTimeout(() => {
            document.querySelector(".circle-container").style.transform = "";
            document.querySelector(".circle-container").classList.remove("animacion_init");
            document.querySelectorAll(".circle-container>*").forEach(function (element, index) {
                element.style.transition = "transform 500ms " + index + "50ms";
                element.style.transform = "";
            });
        }, 1000);
    }
    angular.element(document).ready(function () {
        document.querySelector(".circle-container").style.transform = "translate(34vw) scale(0.5)";
        document.querySelector(".circle-container").classList.add("animacion_init");
        setTimeout(() => {
            document.querySelector(".circle-container").style.transform = "";
            document.querySelector(".circle-container").classList.remove("animacion_init");
            document.querySelectorAll(".circle-container>*").forEach(function (element, index) {
                element.style.transition = "transform 500ms " + index + "50ms";
                element.style.transform = "";
            });
        }, 1000);
    });
}]);
