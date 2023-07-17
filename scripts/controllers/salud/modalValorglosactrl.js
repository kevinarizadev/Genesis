'use strict';
angular.module('GenesisApp')
 .controller('modalValorglosactrl',['$scope','censoHttp','ngDialog',function($scope,censoHttp,ngDialog) {
 $scope.motivoglosa = ' ';
 
  $( document ).ready(function() {
    $scope.notpaastenot();
    });

 censoHttp.obtenerMotivoglosa().then(function(response){
     $scope.listmotivoglosa =  response.data;
    })

 $scope.guardarParamGlosas = function (){
 	$scope.glosa = {
 	cantidad:$scope.valobjecion,
    nombre:$scope.Descripcionobjecion,
    motivo: $scope.motivoglosa
 	}
 }

 $scope.formatpeso = function (NID) {
  const input = document.getElementById('' + NID + '');
  var valor = input.value;
  valor = valor.replace(/[^0-9-,]/g, '');
  var array = null;
  var regex = new RegExp("\\,");
  if (!regex.test(valor)) {
    valor = valor.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
    valor = valor.split('').reverse().join('').replace(/^[\.]/, '');
  } else {
    array = valor.toString().split(',');
    if (array.length > 2) {
      input.value = 0;
    } else {
      array[0] = array[0].toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
      array[0] = array[0].split('').reverse().join('').replace(/^[\.]/, '');
      if (array[1].length > 2) {
        array[1] = array[1].substr(0, 2);
      }
    }
  }
  if (!regex.test(valor)) {
    input.value = valor;
  } else {
    if (valor == ',') {
      input.value = 0;
    } else {
      if (valor.substr(0, 1) == ',') {
        input.value = 0 + ',' + array[1];
      } else {
        input.value = array[0] + ',' + array[1];
      }
    }
  }
}

  $scope.notpaastenot = function() {
    var Evoldesc = document.getElementById('bloquear');
      Evoldesc.onpaste = function(e) {
        e.preventDefault();
        swal('Notificacion',"La accion pegar no esta permitida en este campo. ",'error');
      }
      
      Evoldesc.oncopy = function(e) {
        e.preventDefault();
        swal('Notificacion',"La accion copiar no esta permitida en este campo. ",'error');
      }
    }

}]);