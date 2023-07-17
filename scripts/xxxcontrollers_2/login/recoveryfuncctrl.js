'use strict';
angular.module('GenesisApp')
      .controller('recoveryfuncctrl', ['$scope', 'consultaHTTP', '$http', 'notification', 'ngDialog', '$timeout', 'cfpLoadingBar',
            function ($scope, consultaHTTP, $http, notification, ngDialog, $timeout, cfpLoadingBar) {
                  $scope.recuperarpassfunc = function () {
                        $http({
                              method: 'POST',
                              url: "php/login/recuperarpass.php",
                              data: {
                                    function: 'verificapassfunc',
                                    id: $scope.r_documento
                              }
                        }).then(function (response) {
                              if (response.data.codigo == 0) {
                                    notification.getNotification('susses', response.data.mensaje, 'Notificación');
                              } else {
                                    notification.getNotification('error', response.data.mensaje, 'Notificación');
                              }
                        })
                  }
            }
      ]);