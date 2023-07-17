'use strict';
angular.module('GenesisApp')
.controller('adjbencontroller', ['$scope', '$http','ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller','$rootScope','$window',
function ($scope, $http, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window) {
  $scope.docbtemp = $scope.param.tipo;
  $scope.idbtemp = $scope.param.id;
  communication.data.adjunto = false;
  //$scope.subir = true;
  $scope.validaradjunto = function(){
    if($('#-beneficiarioadj').val() == ''){
      //$scope.subir = true;
       notification.getNotification('warning', 'Por favor subir un adjunto!', 'Notificacion');
    }
  }
  $scope.subiradjunto = function(){
          $scope.validaradjunto();
          var anexo = new FormData($("#beneficiarioadj")[0]);
          var filename = $('input[type=file]').val();
          var today = new Date();
          var dd = ('0' + today.getDate()).slice(-2);
          var mm = ('0' + (today.getMonth() + 1)).slice(-2);
          var yyyy = today.getFullYear();
          var hora = today.getHours();
          var min = today.getMinutes();
          var seg = today.getSeconds();
          $scope.ext = filename.split('.').pop();
          $scope.tipodocumentoa = $scope.tipoDoc;
          $scope.documentoa = $scope.documento;
          $scope.ftp = $PATH_FILE;
          $scope.folder = "TALENTOHUMANO/DATOSFUNCIONARIO/BENEFICIARIO/";
          $scope.nuevonombre = '131_'+$scope.docbtemp+"_"+$scope.idbtemp+"_"+ dd + mm + yyyy+ hora + min + seg+"."+$scope.ext;
          $scope.doct = 131;
          $scope.obs = 'beneficiario de '+$scope.idbtemp;
          $.ajax({
            url: "php/uploadanexo.php",
            type: "POST",
            data: anexo,
            contentType: false,
            processData: false,
            dataType: 'json'
          }).done(function(data) {
            if(data == "1"){
              //$scope.insertarUrgencia();
              notification.getNotification('success', 'Documento anexado!', 'Notificacion');
              communication.data.adjunto = true;
              ngDialog.close();
            }
            else{
             
              var anexo = new FormData($("#beneficiarioadj")[0]);
              var filename = $('input[type=file]').val();
              var today = new Date();
              var dd = ('0' + today.getDate()).slice(-2);
              var mm = ('0' + (today.getMonth() + 1)).slice(-2);
              var yyyy = today.getFullYear();
              var hora = today.getHours();
              var min = today.getMinutes();
              var seg = today.getSeconds();
              $scope.ext = filename.split('.').pop();
              $scope.tipodocumentoa = $scope.tipoDoc;
              $scope.documentoa = $scope.documento;
              $scope.ftp = $PATH_FILE;
              $scope.folder = "TALENTOHUMANO/DATOSFUNCIONARIO/BENEFICIARIO/";
              $scope.nuevonombre = '131_'+$scope.docbtemp+"_"+$scope.idbtemp+"_"+ dd + mm + yyyy+ hora + min + seg+"."+$scope.ext;
              $scope.doct = 131;
              $scope.obs = 'beneficiario de '+$scope.idbtemp;
              $.ajax({
                url: "php/uploadanexo.php",
                type: "POST",
                data: anexo,
                contentType: false,
                processData: false,
                dataType: 'json'
              }).done(function(data) {
                if(data == "1"){
                  //$scope.insertarUrgencia();
                  notification.getNotification('success', 'Documento anexado!', 'Notificacion');
                  communication.data.adjunto = true;
                  ngDialog.close();
                }else{
                   notification.getNotification('warning', 'Error al subir el documento, Por favor intentelo nuevamente!', 'Notificacion');
                }
              })
            }
          })
  }

}])
