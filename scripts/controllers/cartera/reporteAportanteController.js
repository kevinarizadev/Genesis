const cartera_reporteAportante = ['$scope', 'consultaHTTP', 'notification', 'cfpLoadingBar', '$http', '$window', '$filter', 'notify']
cartera_reporteAportante.push(($scope, consultaHTTP, notification, cfpLoadingBar, $http, $window, $filter, notify) => {
    
    $scope.datos = null

    $scope.listarReporteAportante = function () {
        $http({
            method: 'POST',
            url: "php/cartera/funcartera.php",
            data: { function: 'ListadoAportante', inicio: $scope.fecha_inicio, final: $scope.fecha_final }
        }).then(function (response) {
            $scope.datos = response.data
            setTimeout(function () {
                $scope.tablerecepcion = $('#informacion').DataTable({
                    dom: 'lBsfrtip',
                    select: true,
                    buttons: ['csv', 'excel'],
                    language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
                    destroy: true,
                    responsive: true,
                    lengthMenu: [
                    [20, 50, -1],
                    [20, 50, 'Todas']
                    ],
                    order: [
                    [0, "desc"]
                    ]
                })
            }, 500)
        })
    }

    $scope.formatearNumero = (data) => {
        const number = parseInt(data.toString().replace('.', ''))

        const reversedNumber = number.toString().split('').reverse().join('')

        const matches = reversedNumber.match(/(\d{1,3})/gm)

        const formattedNumber = matches.map((value, index) => {
            if (index < matches.length - 1) {
                return value.split().reverse().join() + '.'
            } else {
                return value.split().reverse().join()
            }
        }).join('').split('').reverse().join('')
        return formattedNumber
    }

    $scope.listarReporteAportante()
})

angular.module('GenesisApp').controller('reporteAportanteController', cartera_reporteAportante)