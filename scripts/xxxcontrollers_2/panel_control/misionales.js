'use strict';
angular.module('GenesisApp').controller('misionalesController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    $scope.url = $sce.trustAsResourceUrl('');
    $scope.power_bi = new Array();
     var style = document.querySelector("#analiticad>style");
    var css = "";
    
    $scope.url_r = $sce.trustAsResourceUrl('');
    if (sessionStorage.getItem('dpto') == '1') {
        $scope.url_r = 'https://app.powerbi.com/view?r=eyJrIjoiMDdhOGE2YTMtYzA0Ny00N2YxLWFhMTYtMTZlN2MwNzE2ZGZlIiwidCI6ImQ4ZWRiNTVmLWVlOGQtNGRmNi1iMGNjLTgwOTMxZTllNzQyOSJ9&pageName=ReportSectionf34107305890188b398a';
        
    } else {
        $scope.url_r = 'https://app.powerbi.com/view?r=eyJrIjoiMDdhOGE2YTMtYzA0Ny00N2YxLWFhMTYtMTZlN2MwNzE2ZGZlIiwidCI6ImQ4ZWRiNTVmLWVlOGQtNGRmNi1iMGNjLTgwOTMxZTllNzQyOSJ9&pageName=ReportSectionf34107305890188b398a&UBICACION_DEPARTAMENTO='+sessionStorage.getItem('dpto');
    }

    var modulos =
    {
        "Analiticad": [
            {
                "titulo": "Código Urgencia",
                "icon": "images/mapas/iconos/codigo.png",
                "url": "https://app.powerbi.com/view?r=eyJrIjoiMDgzMjJiODMtOTE3MS00YjZkLWE1MTctMGMyNGRjMWFjYWMwIiwidCI6ImQ4ZWRiNTVmLWVlOGQtNGRmNi1iMGNjLTgwOTMxZTllNzQyOSJ9&pageName=ReportSection8be5b045a2d1c9ab30b3",
                "id": ""
            },
            
            {
                "titulo": "Censo Hospitalario",
                "icon": "images/mapas/iconos/censo.png",
                "url": "https://app.powerbi.com/view?r=eyJrIjoiZDYwN2ZlZDQtMGNjZC00OWY1LWE5MmItMGRjY2E4MDU0ZTZlIiwidCI6ImQ4ZWRiNTVmLWVlOGQtNGRmNi1iMGNjLTgwOTMxZTllNzQyOSJ9",
                "id": ""
            },
            {
                "titulo": "Autorizaciones",
                "icon": "images/mapas/iconos/aut.png",
                "url": "https://app.powerbi.com/view?r=eyJrIjoiZGY5N2EyYWEtNDM5Yi00ZDJkLWFhNzYtNTdlZGRkYmJmNGE4IiwidCI6ImQ4ZWRiNTVmLWVlOGQtNGRmNi1iMGNjLTgwOTMxZTllNzQyOSJ9",
                "id": ""
            },
            {
                "titulo": "Autorizaciones Activas",
                "icon": "images/mapas/iconos/autactiva.png",
                "url": $scope.url_r,
                "id": ""
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
   /* $http({
        method: 'POST',
        url: "php/tic/configuracionacceso/configuracionacceso.php",
        data: {
            function: 'get_json_bi',
            nit: (sessionStorage.getItem("nit") == 0) ? 890102044 : sessionStorage.getItem("nit"),
            cedula: sessionStorage.getItem("cedula")
        }
    }).then(function (response) {
        if (validar_json(angular.toJson(response.data)) && response.data != undefined && response.data != "" && response.data != null && response.data.Misional.length > 0) {
            var style = document.querySelector("#misional>style");
            var css = "";
            const conte = Math.round(document.querySelector(".circle-container").offsetWidth);
            const items = response.data.Misional.length;
            var calc = 0;
            if (response.data.Misional.length > 1) {
                response.data.Misional.forEach(function (element, i) {
                    calc = Math.round(i / items * 360);
                    css += "\n#item_misional_" + calc + " {\ntransform: rotate(" + calc + "deg) translate(14vw) rotate(-" + calc + "deg);\n}\n";
                    response.data.Misional[i].id = calc;
                    $scope.power_bi.push(response.data.Misional[i]);
                });
            } else {
                css += "\n#item_misional_" + calc + " {\ntransform: rotate(" + calc + "deg) translate(0vw) rotate(-" + calc + "deg)!important;\n}\n";
                response.data.Misional[0].id = 0;                
                $scope.power_bi.push(response.data.Misional[0]);
            }
            style.innerHTML += css;
            // document.querySelector("#misional>style").appendChild(style);
        } else {
            $scope.power_bi = new Array();
        }
    });*/

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
