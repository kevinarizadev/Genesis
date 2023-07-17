'use strict';
angular.module('GenesisApp').controller('inicioempresasController', ['$scope', function ($scope) {
    angular.element(document).ready(function () {
        $(".collapsible-header").addClass("active");
        $(".collapsible").collapsible({ accordion: false });
    });
}])
