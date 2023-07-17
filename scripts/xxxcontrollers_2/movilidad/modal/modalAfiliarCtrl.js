'use strict';
   angular.module('GenesisApp')
   .controller('modalAfiliarCtrl',['$scope','$http','$window','ngDialog','$filter',
   function($scope,$http,$window,ngDialog,$filter) {
      $http({
         method:'POST',
         url:"php/funclistas.php",
         data: {function: 'cargaDepartamentos'}
      }).then(function(response){
         $scope.Departamentos = response.data;
      }); 
      $http({
         method: 'POST',
         url: "php/movilidad/funcmovilidad.php",
         data: {
            function: 'listaAsesores'
         }
      }).then(function (response) {
         $scope.asesores = response.data;
      });
      $scope.regDireccion = function(){
         $("#files_afiliado").focus();
         $scope.dialogDireccion = ngDialog.open({
            template: 'views/movilidad/modal/modalDireccion.html',
            className: 'ngdialog-theme-plain',
            controller: 'modalDireccionCtrl',
            scope: $scope
         });
         $scope.dialogDireccion.closePromise.then(function (data) {
            if (data.value != "$document" && data.value != "$escape") {
               $scope.new.direccion = data.value;
            }
         });
      }
      $scope.filterMunicipio = function(){
         swal({
            title: 'Buscando afiliados...',
            allowEscapeKey : false,
            allowOutsideClick : false
         });
         $http({
            method:'POST',
            url:"php/funclistas.php",
            data: {function: 'cargaMunicipios', depa:$scope.new.departamento}
         }).then(function(response){
            $scope.municipio = "";
            $scope.Municipios = response.data;
            swal.close();
         }); 
      }
      $("#files_afiliado").change(function() {
         if(this.files[0].size > 7340032){
            swal('Advertencia','El archivo excede el peso limite (7 MB)','warning')
            this.value = "";
         }
      });
      $scope.subirInformacion = function(){
         swal({
            title: 'Confirmar',
            text: "¿Confirma el registro de los datos y el envío de la solicitud?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
         }).then((result) => {
            if (result) {
               swal({
                  title: 'Guardando información'
               });
               swal.showLoading();
               var formData = new FormData($("#dataNewAfiliado")[0]);
               $.ajax({
                  url: "php/movilidad/adjuntos/uplpckemp.php",
                  type: "POST",
                  data: formData,
                  contentType: false,
                  processData: false
               }).then(function (response) {
                  if (response != "0") {
                     $scope.f_nacimiento = $filter('date')($scope.new.fecha_nacimiento, 'dd/MM/yyyy') ;
                     $http({
                        method:'POST',
                        url:"php/movilidad/funcmovilidad.php",
                        data: {function:'guardaAfilTemporal',
                           type:$scope.new.tipo_documento,
                           id:$scope.new.documento,
                           p_nombre:$scope.new.primer_nombre,
                           s_nombre:$scope.new.segundo_nombre,
                           p_apellido:$scope.new.primero_apellido,
                           s_apellido:$scope.new.segundo_apellido,
                           sexo:$scope.new.genero,
                           municipio:$scope.new.municipio,
                           f_nacimiento:$scope.f_nacimiento,
                           telefono:$scope.new.telefono,
                           celular:$scope.new.celular,
                           correo:$scope.new.correo,
                           direccion:$scope.new.direccion,
                           solicita:$scope.documento_empleado,
                           responsable:$scope.asesor_modal,
                           rutaadjunto:response
                        }
                     }).then(function(res){
                        swal.close();
                        if (res.data.codigo == 0) {
                           $scope.closeThisDialog();
                           swal('Completado',res.data.mensaje,'success')
                        }else{
                           swal('Información',res.data.mensaje,'info')
                        }
                     })
                  }else{
                     swal(
                        'Error',
                        'Se presento un error al subir el archivo',
                        'info'
                     )
                  }
               });
            }
         })
         
      }
   }
]);