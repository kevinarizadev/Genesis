'use strict';
angular.module('GenesisApp')
   .controller('modalAfiliadonuevoctrl', ['$scope', '$http', 'ngDialog', 'censoHttp', function ($scope, $http, ngDialog, censoHttp) {

      $http({
         method: 'POST',
         url: "php/aseguramiento/Rafiliacion.php",
         data: { function: 'obtenermunicipio' }
      }).then(function (response) {
         $scope.Municipios = response.data;
      });
      
      // var check_option = false;

      $scope.regDireccion = function () {
         $scope.dialogDiagreg = ngDialog.open({
            template: 'views/salud/modal/modalDireccion.html',
            className: 'ngdialog-theme-plain',
            controller: 'modalDireccionctrl',
            scope: $scope
         });
         $scope.dialogDiagreg.closePromise.then(function (data) {
            if (data.value != "$document" && data.value != "$escape" && data.value != "$closeButton") {
               $scope.direccion_afiliado = data.value;
            } else {
               $scope.direccion_afiliado = "";
            }
         });
      }

      function formatDate(date) {
         var month = date.getUTCMonth() + 1;
         date = date.getDate() + "/" + month + "/" + date.getFullYear();
         return date;
      }

     
      $scope.regAfiliadoNuevo = function (check_option) {
         // console.log();
         $http({
            method: 'POST',
            url: "php/aseguramiento/Rafiliacion.php",
            data: { function: 'obtenermunicipio' }
         }).then(function (response) {
            $scope.SubirSoporteCabeza();
         });

      }
      $scope.ListadoSeleccionadoCabeza = [];
      $scope.Tipo = "Nacimientos Censo";
            $scope.SubirSoporteCabeza = function () {
         var adjuntocab = $("#adjuntocab");
         if ((adjuntocab[0].value == null || adjuntocab[0].value == undefined || adjuntocab[0].value == '' ) && $scope.newnac.tipo_doc == 'MS' && $scope.newnac.tipo_doc == 'RC' && $scope.newnac.tipo_doc == 'CN' ) {
            swal('Notificacion', 'Debe Adjuntar Un Soporte', 'error');
         } else {
            if ( $scope.new.tipo_documento == 'CC' || $scope.new.tipo_documento == 'TI'||$scope.new.tipo_documento == 'RC'||$scope.new.tipo_documento == 'CE'||$scope.new.tipo_documento == 'PA'||$scope.new.tipo_documento == 'PE'
               ||$scope.new.tipo_documento == 'AS'||$scope.new.tipo_documento == 'CD') {

      censoHttp.regafiliado($scope.new.tipo_documento,$scope.new.documento,$scope.new.primer_nombre,
                         $scope.new.segundo_nombre,$scope.new.primero_apellido,$scope.new.segundo_apellido,
                         $scope.new.genero,'8001',$scope.new.municipio,formatDate($scope.new.fecha_nacimiento),
                         $scope.new.telefono,$scope.new.celular,$scope.new.correo,$scope.direccion_afiliado,'CENSO').then(function(response){
        if (response.data.codigo != 0){
            swal('Completado',response.data.mensaje,'success');
              ngDialog.close();
          }else{
            swal('Informacion',response.data.mensaje,'error');
          }
      })
                      } else {
            swal({
               title: 'Confirmar',
               text: "¿Confirmar el cargue del soporte para el registro de afiliacion Nacimiento?",
               type: 'question',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Continuar',
               cancelButtonText: 'Cancelar'
            }).then((result) => {
               if (result) {
                  var FR = new FileReader();
                  FR.addEventListener("load", function (e) {
                     $scope.adjuntoafiliadocabeza = e.target.result;
                     $scope.extensioncabeza = adjuntocab[0].files[0].name.split('.').pop();
                     // $scope.CrearArrayCabeza("Nacimiento", $scope.adjuntoafiliadocabeza, $scope.extensioncabeza);
                     $scope.CrearArrayCabeza($scope.adjuntoafiliadocabeza, $scope.Tipo, $scope.extensioncabeza);

                  });
                  FR.readAsDataURL(adjuntocab[0].files[0]);
               }
            })}
         }


      }
      $scope.CrearArrayCabeza = function (base64,nombre, ext) {
         $scope.ListadoSeleccionadoCabeza.push({ "base64": base64, "Nombre":nombre , "extension": ext });
         // console.log($scope.ListadoSeleccionadoCabeza);
         $scope.CargarSoportesCabeza();
      }
      $scope.CargarSoportesCabeza = function () {
         $http({
            method: 'POST',
            url:"php/censo/censo.php",
            data: {
               function: 'CargarSoportes',
               tipodocumento: $scope.newnac.tipo_doc,
               numero: $scope.newnac.documento,
               archivos: JSON.stringify($scope.ListadoSeleccionadoCabeza)
            }
         }).then(function (r) {
            // $scope.new = $scope.newnac;
            // $scope.new.documento = $scope.documentonacido;
            $scope.respu = r.data;
            $scope.ruta = $scope.respu;
            if ($scope.respu.length > '0') {
               $http({
                  method: 'POST',
                  url: "php/aseguramiento/Rafiliacion.php",
                  data: { function: 'obtenermunicipio' }
               }).then(function (response) {
                  
                  censoHttp.regafiliado($scope.newnac.tipo_doc, $scope.newnac.documento, $scope.newnac.primer_nombre,
                     $scope.newnac.segundo_nombre, $scope.newnac.primero_apellido, $scope.newnac.segundo_apellido,
                     $scope.newnac.genero, '8001', $scope.newnac.municipio, formatDate($scope.newnac.fecha_nacimiento),
                     $scope.newnac.telefono, $scope.newnac.celular, $scope.newnac.correo, $scope.direccion_afiliado, 'CENSO', $scope.ruta).then(function (res) {
                        if (res.data.codigo != 0) {
                              swal('Completado', res.data.mensaje, 'success');
                              ngDialog.close();
                           } else {
                              swal('Informacion', res.data.mensaje, 'error');
                              ngDialog.close();
                           }
                        })
               });
               //      $http({
               //          method: 'POST',
               //          url: "php/ips/func3047.php",
               //          data: {
               //              function: 'SubirArchivos',
               //              tipodocumento: $scope.tipodocumento_cabeza,
               //              numero: $scope.numero_cabeza,
               //              rutas: JSON.stringify($scope.respu),
               //              cantidad: $scope.respu.length
               //          }
               //      }).then(function (res) {
               //          if (res.data.codigo == '0') {
               //              swal('Notificacion', res.data.mensaje, 'info');
               //              $scope.Consultar();
               //          } else {
               //              swal('Notificacion', res.data.mensaje, 'error');
               //          }
               //      });
            } else {
               swal('Notificacion', $scope.respuesta.mensaje, 'error');
            }
         });
      }

   }]);
