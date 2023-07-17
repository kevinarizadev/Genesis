'use strict';
angular.module('GenesisApp').controller('apoyoController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    $scope.url = $sce.trustAsResourceUrl('');
    $scope.power_bi = new Array();
    var style = document.querySelector("#analiticad>style");
    var css = "";
    var modulos =
    {
        "Analiticad": [
            {
                "titulo": "Mesa de Ayuda TIC",
                "icon": "images/mapas/iconos/acastic.png",
                "url": "https://app.powerbi.com/view?r=eyJrIjoiNzU5M2Y0YjktZTM2Mi00ZWJjLTg4MjItMTJlNTAxYmU4NjMxIiwidCI6ImQ4ZWRiNTVmLWVlOGQtNGRmNi1iMGNjLTgwOTMxZTllNzQyOSJ9&pageName=ReportSection10ff1ec1bc4bdc50221d",
                "id": "",

            },
             {
                "titulo": "Proyectos Activos TIC",
                "icon": "images/mapas/iconos/Proyectos Activos .png",
                "url": "https://app.powerbi.com/view?r=eyJrIjoiYzBiMjgwM2QtYjVlMy00MjU5LWI4NDMtN2FmZGQ0ZWI5MzAxIiwidCI6ImQ4ZWRiNTVmLWVlOGQtNGRmNi1iMGNjLTgwOTMxZTllNzQyOSJ9&pageName=ReportSectionbc4f9f44bd05638f97d1",
                "id": "",
                
            }
    
        ]
    };
    const items = modulos.Analiticad.length;
    modulos.Analiticad.forEach(function (element, i) {
        var calc = Math.round(i / items * 360);
        css += "\n#item_analiticad_" + calc + " {\ntransform: rotate(" + calc + "deg) translate(14vw) rotate(-" + calc + "deg);\n}\n";
        modulos.Analiticad[i].id = calc;
        $scope.power_bi.push(modulos.Analiticad[i]);
    });
    style.innerHTML += css;
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
