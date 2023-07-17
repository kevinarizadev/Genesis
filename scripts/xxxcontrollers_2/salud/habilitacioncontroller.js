'use strict';
angular.module('GenesisApp')
 .controller('habilitacioncontroller',['$scope','$http','ngDialog',function($scope,$http,ngDialog) {
      
      function readFile() {
         if (this.files && this.files[0]) {
            var FR= new FileReader();
            FR.addEventListener("load", function(e) {
               $scope.fileHab = e.target.result;
               $scope.fileHabext = '';
               var name = document.getElementById('adjuntohab').files[0].name;
               $scope.fileHabext= name.split('.').pop();             
            });
            FR.readAsDataURL( this.files[0] );
         }
      }

      document.getElementById("adjuntohab").addEventListener("change", readFile);

      $scope.adjuntarHabilitacion = function(){
            swal({
               title: 'Confirmar',
               text: "¿Desea Cargar el archivo de habilitacion "+ $scope.concepto +".txt?",
               type: 'question',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Continuar',
               cancelButtonText: 'Cancelar'
            }).then((result) => {
                setTimeout(function() { swal({title: 'Validando estrutura de trabajo'});
                swal.showLoading();}, 1000);

                setTimeout(function() { swal({title: 'Registrando informacion'});
                swal.showLoading();}, 2000);

               if (result) {
                  $http({
                     method: 'POST',
                     url: "php/uploadhab.php",
                     data: {
                        path: '/externos/base_ehab/',
                        name: $scope.concepto,
                        type : $scope.fileHabext,
                        file : $scope.fileHab//,
                        //fecha_recepcion : $("#dteFechaRecepcionRespuesta").val(),
                        //typefile : '3',
                        //ori: true
                     }
                  }).then(function (response) {
                     if (response.data = "1") {
                        $http({
                           method: 'POST',
                           url: "php/censo/censo.php",
                           data: {
                           function: 'actualizahabilitacion',
                           empresa : 1,
                           tercero:0
                           }
                        }).then(function (response) {
                           swal.close();
                           if (response.data.error == 0) {
                              swal('Completado','Archivo cargado y ejecutado correctamente','success')
                           }else{
                              swal('Error',response.data.observacion,'warning')
                           }
                        });
                     }else{
                        swal('Error',response.data.observacion_err,'warning')
                     }
                  });
               }
            })
         }
}]);