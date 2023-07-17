'use strict';
angular.module('GenesisApp')
.controller('horacontroller',['$scope','ausentismoHttp','notification','$location', '$rootScope','$timeout','communication','$localStorage',
function($scope,ausentismoHttp,notification,$location,$rootScope,$timeout,communication,$localStorage) {
  var self=this;
  $rootScope.$on('ngDialog.opened', function (e, $dialog) {
    $scope.ano    =  Number(communication.fecha.substr(6, 4));
    $scope.mes    =  Number(communication.fecha.substr(3, 2));
    $scope.dia    =  Number(communication.fecha.substr(0, 2));
    $scope.hora   =  Number(communication.fecha.substr(11, 2));
    $scope.minuto =  Number(communication.fecha.substr(14, 2));
    $scope.segundo=  Number(communication.fecha.substr(16, 2));
    $(".ngdialog-content").css({"padding-left":"0px","padding-bottom":"0px","padding-right":"0px","padding-top":"0px"});
    $("#fechamod").kendoDateTimePicker({
      format: "yyyy/MM/dd hh:mm tt",
      timeFormat: "HH:mm",
      min: new Date($scope.ano,$scope.mes-1,$scope.dia,$scope.hora,$scope.minuto,$scope.segundo), // sets min date today
      max: new Date($scope.ano+1,$scope.mes-1,$scope.dia,18,$scope.minuto,$scope.segundo),
      culture: "es-MX",
      disableDates: ["su", "sa"],
      value: new Date($scope.ano,$scope.mes-1,$scope.dia,$scope.hora,$scope.minuto,$scope.segundo),
      change: function() {
        communication.rr  = this.value();
		notification.getNotification('success', "Hora Registrada!", 'Notificacion');
      }
    })
  });
}]);
