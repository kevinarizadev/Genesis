'use strict';

/**
 * @ngdoc function
 * @name GenesisApp.controller:DatatableCtrl
 * @description
 * # DatatableCtrl
 * Controller of the GenesisApp
 */
 angular.module('GenesisApp')
 .controller('DatatableCtrl', function ($scope) {
    var vm = this;
    vm.dataTable = 
            {
                "headings":['Afiliado', 'Tipo', 'Documento', 'Fecha', 'Estado','Observacion'],
            "rows": [
                {
                    "AFILIADO": "",
                    "TIPO": "",
                    "DOCUMENTO": "",
                    "FECHA": "",
                    "ESTADO": "",
                    "OBSERVACION": ""
                }]
    }

    $scope.getJsonValue = function (value)
        {
        var data=  JSON.parse(value);
             vm.dataTable = 
            {
                "headings":['Afiliado', 'Tipo', 'Documento', 'Fecha', 'Estado','Observacion'],
                "rows":  [data]
            }
            setTimeout(function () {
                //vm.dataTable.ajax.url( data ).load();
                vm.dataTable.fixedColumns().update();
               // $scope.$apply();
                }, 2000);
        }  
});
