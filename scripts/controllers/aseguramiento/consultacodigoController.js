    'use strict';
angular.module('GenesisApp')
  .controller('consultacodigoController', ['$scope', 'afiliacionHttp', 'notification', 'cfpLoadingBar', '$http', 'ngDialog', 
  function ($scope, afiliacionHttp, notification, cfpLoadingBar, $http, ngDialog) {

    $(document).ready(function () {
      $scope.Tabs = 1;
        console.log($(window).width());
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100 && $(window).width() < 1300) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1300 && $(window).width() < 1500) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
        if ($(window).width() > 1500) {
          document.querySelector("#pantalla").style.zoom = 0.9;
        }
        document.querySelector("#content").style.backgroundColor = "white";

        $scope.Tabs = 0;
        $('.tabs').tabs();
        $scope.Vista = 0;
        $scope.Tap = 1;
        $('.tabs').tabs();

        setTimeout(() => {
          $scope.$apply();
        }, 500);
    });
    $scope.buscar_numero="";
    $scope.listadoverificado = "";
    $scope.verdatocertificado = false;
    $scope.buscar_tipo_documento="";
    $scope.buscar_numero_documento="";
    $scope.listadocertificados = "";
    $scope.verdatolistadocertificado = false;

    

    $scope.setTab = function (x) {
      $scope.Tap = x;
      setTimeout(function () {
        $scope.$apply();
      }, 500)
    }

    $scope.formatDate = function(date){
      var d = new Date(date);
      var dd = ('0' + d.getDate()).slice(-2);
      var mm = ('0' + (d.getMonth() + 1)).slice(-2);
      var yyyy = d.getFullYear();
      var hh = d.getHours();
      var mi = d.getMinutes();
      return dd + '/' + mm + '/' + yyyy; //+' '+hh+':'+mi+':00';
    }

    $scope.Obtener_Tipos_Documentos = function () {
      $http({
          method: 'POST',
          url: "php/genesis/funcgenesis.php",
          data: {
              function: 'Obtener_Tipos_Documentos',
              Tipo: 'S'
          }
      }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
              $scope.Tipos_Documentos = response.data;
          } else {
              swal({
                  title: "¡Ocurrio un error!",
                  text: response.data,
                  type: "warning"
              }).catch(swal.noop);
          }
      });
  }
  $scope.Obtener_Tipos_Documentos();

    $scope.buscarcodigo = function (codigo) {
      if(codigo == '' ||codigo == null ||codigo == undefined ) {
        swal('Informacion',
             'Por favor Ingrese un Codigo Valido', 
             'info');
      } else {
        $http({
          method: 'POST',
          url: "php/aseguramiento/consultacodigo.php",
          data: {
            function: 'Obtener_dato_codigo',
            codigo: codigo 
          }
        }).then(function (response) {
          console.log(response.data.mensaje[0]);
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            if(response.data.codigo == "1"){
              $scope.verdatocertificado = false;
              swal({
                title: "Informacion",
                text: "No se encontraron datos de certificado con este Codigo",
                type: "info"
            })
            } else {
              swal({
                title: "Exito",
                text: "El Codigo del Certificado si es Valido",
                type: "success"
            })
              $scope.listadoverificado = response.data.mensaje[0];
              $scope.verdatocertificado = true;
            }
        } else {
          
            swal({
                title: "¡Ocurrio un error!",
                text: response.data,
                type: "warning"
            }).catch(swal.noop);
        }
        })

      }
      }
    $scope.buscarpordocumento = function (tipo,numero) {
      if(numero == '' ||numero == null ||numero == undefined ) {
        swal('Informacion',
             'Por favor Ingrese un Documento Valido', 
             'info');
      } else {
        $http({
          method: 'POST',
          url: "php/aseguramiento/consultacodigo.php",
          data: {
            function: 'Obtener_dato_afiliado',
            tipodocumento: tipo,
            numerodocumento: numero 
          }
        }).then(function (response) {
          console.log(response.data);
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            if(response.data.codigo != 0){
              $scope.verdatolistadocertificado = false;
              swal({
                title: "Informacion",
                text: "No se encontraron datos de certificado con este Afiliado",
                type: "info"
            })
            } else {
              swal({
                title: "Exito",
                text: "Afiliado si cuenta con Certificados Generados",
                type: "success"
            })
              $scope.listadocertificados = response.data.mensaje;
              $scope.verdatolistadocertificado = true;
            }
        } else {
            swal({
                title: "¡Ocurrio un error!",
                text: response.data,
                type: "warning"
            }).catch(swal.noop);
        }
        })

      }
      }
    

  }])
