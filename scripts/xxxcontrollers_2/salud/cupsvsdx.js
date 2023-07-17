'use strict';

angular.module('GenesisApp').controller('cupsvsdxController', ['$scope', '$http', '$filter', 'ngDialog', '$timeout', function ($scope, $http, $filter, ngDialog, $timeout) {

 $(document).ready(function () {
      $('#modaldiagnostico').modal();  
      $('#modalgrupodx').modal();  
            
  });


  $scope.temprodducto = null;
  $scope.listaproductos = null;
  $scope.listaproductosTemp = null;
  $scope.buscardiag = null;
  $scope.listDiagnosticos = null;
  $scope.inactivebarradiag = true;
  $scope.temcups = null;  



    $scope.p_lista_productos = function () {     
      if ($scope.temprodducto) {         
         swal({ title: 'Cargando...' });
         swal.showLoading();
        $http({
        method: 'POST',
        url: "php/cupsvsdx/cupsvsdx.php",
        data: { function: 'p_lista_productos', codigo: $scope.temprodducto.toUpperCase() }
      }).then(function (response) {     
       swal.close();             
        if (response.data[0].Codigo) {         
          $scope.listaproductos = []; 
          $scope.listaproductosTemp = []; 
               swal('Importante', 'Producto no encontrado!', 'info');
        } else{
          $scope.listaproductos = response.data;       
          $scope.listaproductosTemp = response.data;               
        }       
               
        });
      }else{
          swal('Importante', 'No pueden haber campos vacios!', 'info');    
      }
    }

      $scope.filterCups = function (val) {     
      $scope.listaproductosTemp = $filter('filter')($scope.listaproductos, val);      
    }
    $scope.respuesta = null;
    $scope.openmodals = function(cups,modal){
       $scope.temcups = cups;
       console.log('modal_',modal);      
         $scope.p_valida_cups().then(function(response) {
               console.log(response.data);
    if (response.data.Codigo==1) {
          swal({  text: response.data.Mensaje, showConfirmButton: true, type: "info" }); 
           }else{
               switch(modal) {
        case 'diagnostico':           
            $("#modaldiagnostico").modal("open");             
          break;
        // case 'modalgrupodx':
        //      $("#modalgrupodx").modal("open");                    
        //   break;        
         }
           }
               
           });
    }
    $scope.consultar_dx = function(producto){
      console.log(producto);
    }
        
    $scope.buscarDiagnostico = function (diag) {        
      if (diag == "" || diag == undefined) {
        swal('Importante', 'El campo  de texto no puede estar vacio!', 'info');
      } else {
        $http({
          method: 'POST',
          url: "php/cupsvsdx/cupsvsdx.php",
          data: {
            function: 'p_lista_dx', cups: $scope.temcups, codigo: diag.toUpperCase()       
          }
        }).then(function (response) {
          $scope.listDiagnosticos = [];
          if (response.data["0"].Codigo == '-1') {
            swal('Importante', response.data["0"].Nombre, 'info');
            $scope.inactivebarradiag = true;
          } else if (response.data["0"].Codigo == '0') {
            swal('Importante', 'Diagnóstico no encontrado ó ya existe para este cups', 'info');
            $scope.inactivebarradiag = true;
          } else {
            $scope.listDiagnosticos = response.data;
            $scope.inactivebarradiag = false;
          }
        })

      }
    }

       $scope.seleccionardiagnostico = function (data) {    
        console.log(data.NUMERO);
        console.log($scope.temcups);
       $http({
              method: 'POST',
              url: "php/cupsvsdx/cupsvsdx.php",
              data: { function: 'p_inserta_cups', 
              cod_cups: $scope.temcups, 
              cod_dx: data.NUMERO.substring(0, 3),
              responsable: sessionStorage.getItem('cedula')}
            }).then(function (response) {                                          
                 if (response.data.Codigo==0) {
                swal({ title: "Completado", text: response.data.Mensaje, showConfirmButton: true, type: "success" });                   
                }else{
                swal({ title: "No Completado", text: response.data.Mensaje, showConfirmButton: true, type: "error" });                       
                }
            });        
    }

    $scope.closemodals = function (modal) {  
      switch(modal) {
        case 'diagnostico':
            $("#modaldiagnostico").modal("close");      
            $scope.listDiagnosticos = [];      
            $scope.inactivebarradiag = true;
            $scope.buscardiag = "";
          break;
        // case 'modalgrupodx':
        //      $("#modalgrupodx").modal("close");      
            // $scope.listDiagnosticos = [];      
            // $scope.inactivebarradiag = true;
            // $scope.buscardiag = "";
          // break;        
      }
  
    }    


    $scope.restform  = function (){
         swal({
          title: 'Confirmar',
          text: "¿Esta seguro que desea limpiar el FORMULARIO?",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result) {
        $timeout(function () { 
            $scope.listaproductos = []; 
            $scope.listaproductosTemp = [];           
            $scope.temprodducto = null;          
            $scope.buscardiag = null;
            $scope.listDiagnosticos = null;
            $scope.inactivebarradiag = true;
            $scope.temcups = null;
             $('#sproducto').focus();
          }, 100);               
          }
        })          
    }     

    $scope.p_valida_cups = function () {        
        return  $http({
              method: 'POST',
              url: "php/cupsvsdx/cupsvsdx.php",
              data: { function: 'p_valida_cups', 
              cod_cups: $scope.temcups}
            }); 
    }

  }])