'use strict';
angular.module('GenesisApp')
.controller('suficienciacontroller', ['$scope', '$http',
function ($scope, $http) {
    var vm = this;
    


    $scope.datos_sec = function () {
        $http({
            method: 'POST',
            url: "php/suficiencia/suficiencia.php",
            data: { function: 'p_obtenerdatos_sec',
                    fecha:  formatDate($scope.fecha) }
        }).then(function (response) {
            $scope.seccionales = response.data;
        });
    }

    $scope.obtpromedio = function () {
        if ($scope.fecha === null || $scope.fecha === undefined ) {
        $http({
            method: 'POST',
            url: "php/suficiencia/suficiencia.php",
            data: { function: 'obtenerpromedios',
            fecha:  formatDate('1/1/1988') }
        }).then(function (response) {
            $scope.promedio = response.data;
        });
    }else{
        $http({
            method: 'POST',
            url: "php/suficiencia/suficiencia.php",
            data: { function: 'obtenerpromedios',
            fecha:  formatDate($scope.fecha) }
        }).then(function (response) {
            $scope.promedio = response.data;
        });
    }
    }
   
    function formatDate(date) {
        if (String(date).length > 10) {
          var month = date.getUTCMonth() + 1;
          date = date.getDate() + "/" + month + "/" + date.getFullYear();
          return date;
        }else{
           return date;
        }
    }
        
    $scope.barranoprog = function () {
        $http({
            method: 'POST',
            url: "php/suficiencia/suficiencia.php",
            data: { function: 'p_obtenerdatos',fecha:  formatDate($scope.fecha) }
        }).then(function (response) {
            $scope.total = response.data;
            $scope.json = $scope.total;
              $http({
            method: 'POST',
            url: "php/suficiencia/suficiencia.php",
            data: { function: 'p_obtenerdatos_sec',fecha:  formatDate($scope.fecha) }
        }).then(function (response) {
            $scope.seccionales = response.data;
            $scope.obtpromedio();

            $scope.arreglo = [{
                id: 'seccional',
                name: 'Cantidad/seccional',
                data: $scope.seccionales
            }];
            for (let i = 0; i < $scope.seccionales.length; i++) {
                var x = {id:'',data:[]};
                x.id=$scope.seccionales[i].drilldown;
                for (let index = 0; index < $scope.json.length; index++) {
                    if (x.id == $scope.json[index].drilldown) {
                        x.data.push({y:Number($scope.json[index].y),name: $scope.json[index].name});                 
                    }
                   
                }
                $scope.arreglo.push(x);
            } 
            // {id: '8000',data: [1, 2, 3]}];
            console.log($scope.arreglo);

            $scope.totalreportado = 0;
            for (let i = 0; i < $scope.total.length; i++) {
                $scope.totalreportado =   $scope.totalreportado + $scope.total[i].y;
            } 
            // console.log($scope.totalreportado);
            
            vm.hc4 = angular.element('#barranoprog').highcharts({
                chart: {
                    type: 'column',
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    title: {
                        text: 'Cantidad'
                    }
                },
                title: {
                    text: 'Reporte Suficiencia ' 
                },

             
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y}</b>'
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y}'
                        }
                    }
                },
                series: [{
                    name: 'Total',
                    colorByPoint: true,
                    data: [{
                        name: 'Total',
                        y: $scope.totalreportado,
                        drilldown: 'seccional'
                    }]
                }],
                drilldown: {
                    series: $scope.arreglo
                }
            });

        });
        });
    } 
    // $scope.datos_sec();

    setInterval(() => {
        $scope.datos_sec();
        $scope.barranoprog();
    }, 600000);
}])
