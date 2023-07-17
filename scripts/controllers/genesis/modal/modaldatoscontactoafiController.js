'use strict';
angular.module('GenesisApp').controller('modaldatoscontactoafiController', ['$scope','ngDialog','$http','afiliacionHttp', function ($scope,ngDialog,$http,afiliacionHttp) {
    $scope.test = "modaldatoscontactoafiController";
    $scope.accesoboton = sessionStorage.getItem('home')

    $http({
        method: 'POST',
        url: 'php/genesis/inicio.php',
        data: { function: 'buscar_datos_contacto',
                tipo: sessionStorage.getItem('tipo'),
            documento:sessionStorage.getItem('doc')}
    }).then(function (response) {       
            $scope.contacto = response.data['0'];
            $scope.contacto.nombre_completo = $scope.contacto.AFIC_PRIMER_NOMBRE+" "+ $scope.contacto.AFIC_SEGUNDO_NOMBRE+" "+ $scope.contacto.AFIC_PRIMER_APELLIDO+" "+ $scope.contacto.AFIC_SEGUNDO_APELLIDO;
            $scope.contacto.principal = '';
            $scope.contacto.noprincipal = '';
            $scope.contacto.cruce = '';
            $scope.contacto.nocruce = '';
            $scope.contacto.complemento = '';
            // ------------------------------------
            $scope.contacto.BARRIO = '';
            $scope.contacto.TELEFONO = '';
            $scope.contacto.CELULAR = '';
            $scope.contacto.CELULAR2 = '';
            $scope.contacto.CORREO = '';
            $scope.contacto.DIRECCION = '';

        })      
        
    /*afiliacionHttp.obtenerViaPrincipal().then(function (response) {
        $scope.list_viaprincipal = response.Viaprincipal;
    })*/

    $scope.actualizar_gestantes = function(){
        $http({
            method: 'POST',
            url: "php/afiliacionlinea/seguimientodegestante.php",
            data: { function: 'obtenerafiliados',responsable:$scope.responsable, tipodocumento: $scope.tipoDoc, documento: $scope.documento }
        }).then(function () {
    
        });
    }


   $scope.obtenerViaPrincipal = function(){
    $http({
        method: 'POST',
        url: 'php/genesis/inicio.php',
        data: { function: 'obtenerViaPrincipal'}
    }).then(function (response) {
        $scope.list_viaprincipal = response.data;
    })
    
   }
   $scope.obtenerViaPrincipal();
    
    $scope.actualiza_direccion = function(){        
        $scope.contacto.DIRECCION =  $scope.contacto.principal +" "+ $scope.contacto.noprincipal +" "+ $scope.contacto.cruce+" "+ $scope.contacto.nocruce+" "+$scope.contacto.complemento;   
    }
    
    $scope.actualiza_datos = function(){
        // $scope.Validar_Campos_Nuevo_Funcionario().then(function (result) {
        if ($scope.contacto.principal != '' && $scope.contacto.principal != undefined &&
            $scope.contacto.noprincipal != '' && $scope.contacto.noprincipal != undefined
            && $scope.contacto.CELULAR != '' && $scope.contacto.CELULAR != undefined
            && $scope.contacto.CORREO != '' && $scope.contacto.CELULAR != undefined
            && $scope.contacto.BARRIO != '' && $scope.contacto.BARRIO != undefined){
                swal({
                    title: 'Confirmar',
                    text: '¿Esta seguro que la informacion suministrada es la correcta?',
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
            //&& $scope.contacto.CELULAR != '' && $scope.contacto.CELULAR != undefined) {
                localStorage.setItem('datoscontacto', JSON.stringify({"telefono":$scope.contacto.TELEFONO,
                                                                      "celular":$scope.contacto.CELULAR,
                                                                      "celular2":$scope.contacto.CELULAR2,
                                                                      "direccion":$scope.contacto.DIRECCION,
                                                                      "barrio":$scope.contacto.BARRIO,
                                                                      "correo":$scope.contacto.CORREO}));


            $http({
                method: 'POST',
                url: 'php/genesis/inicio.php',
                data: { function: 'actualizar_datos_contacto',                    
                    tipo_documento:$scope.contacto.AFIC_TIPO_DOCUMENTO,
                    documento:$scope.contacto.AFIC_DOCUMENTO,
                    direccion:$scope.contacto.DIRECCION,
                    localidad:$scope.contacto.BARRIO,
                    telefono:$scope.contacto.TELEFONO,
                    celular:$scope.contacto.CELULAR,
                    celular2: (($scope.contacto.CELULAR2=='' || $scope.contacto.CELULAR2 == undefined)?$scope.contacto.CELULAR:$scope.contacto.CELULAR2),
                    correo:$scope.contacto.CORREO,
                    responsable:sessionStorage.getItem('cedula'),
                    fuente:'GA'
            }
            }).then(function (response) {       
                if (response.data.codigo == '0') {
                    swal('Exito',response.data.mensaje,'success');
                    ngDialog.close();                   
                } else {

                    swal('Error',response.data.mensaje,'error');
                    $scope.actualizar_gestantes();
                    const str = response.data.mensaje;
                    const datosalida = str.slice(32)
                    console.log(datosalida);
                    console.log($scope.contacto.CELULAR);
                    if(datosalida == $scope.contacto.CELULAR){
                    document.querySelector("#celular1").classList.add("red-text");
                    } else if (datosalida == $scope.contacto.CELULAR2){
                        document.querySelector("#celular12").classList.add("red-text");
                    }

                   
                }
                })
            
            })
        } else {
            swal('Error','Favor completar todos los campos requeridos.','error');
        }
    // });
    }


    $scope.confirmardatos = function(){    
            
        localStorage.setItem('datoscontacto', JSON.stringify({"telefono":$scope.contacto.TELEFONO,
        "celular":$scope.contacto.CELULAR,
        "celular2":$scope.contacto.CELULAR2,
        "direccion":$scope.contacto.DIRECCION,
        "barrio":$scope.contacto.BARRIO,
        "correo":$scope.contacto.CORREO}));

            $http({
                method: 'POST',
                url: 'php/genesis/inicio.php',
                data: { function: 'confirmar_datos_contacto',                    
                    tipo_documento:$scope.contacto.AFIC_TIPO_DOCUMENTO,
                    documento:$scope.contacto.AFIC_DOCUMENTO,
                    responsable: sessionStorage.getItem('cedula')
            }
            }).then(function (response) {       
                if (response.data.codigo == '0') {
                    swal('Exito',response.data.mensaje,'success');
                    ngDialog.close();                   
                } else {
                    swal('Error',response.data.mensaje,'error');
                }
                })
    }

}])
