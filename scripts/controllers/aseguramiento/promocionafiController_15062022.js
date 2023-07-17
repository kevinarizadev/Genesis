'use strict';
angular.module('GenesisApp')
  .controller('promocionafiController', ['$scope', 'afiliacionHttp', 'notification', 'cfpLoadingBar', '$http', 'ngDialog', 
  function ($scope, afiliacionHttp, notification, cfpLoadingBar, $http, ngDialog) {

    $scope.obtenerMunicipio = function () {
        $http({
          method: 'POST',
          url: "php/aseguramiento/Rafiliacion.php",
          data: { function: 'obtenermunicipio' }
        }).then(function (response) {
          $scope.Municipio = response.data;
        }, function errorCallback(response) {
          swal('Mensaje', response.data, 'error')
        });
      }
      
    afiliacionHttp.obtenerEstado().then(function (response) {
        $scope.Estados = response;
     })
     afiliacionHttp.obtenerTipoAfiliado().then(function (response) {
        $scope.TipoAfiliado = response.Tipoafiliado;
     })
     afiliacionHttp.obtenerRegimen().then(function (response) {
        $scope.Regimen = response;
     })

     $http({
        method: 'POST',
        url: "php/aseguramiento/Rafiliacion.php",
        data: {
           function: 'obtenerentidad'
        }
     }).then(function (response) {
        $scope.Entidades = response.data;
     }, function errorCallback(response) {
      swal('Mensaje',response.data,'error')
    });


    $(document).ready(function () {
      $scope.documento = sessionStorage.getItem('cedula');
      $scope.sysdate = new Date();

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
    

        setTimeout(() => {
          $scope.$apply();
        }, 500);

        $('#modalhistorico').modal();
        $('#modaladres').modal();
    });

    $scope.closemodals = function () {
        $("#modalhistorico").modal("close");
    }
   
    function formatDate(date) {
        var d = new Date(date);
        var dd = ('0' + d.getDate()).slice(-2);
        var mm = ('0' + (d.getMonth() + 1)).slice(-2);
        var yyyy = d.getFullYear();
        var hh = d.getHours();
        var mi = d.getMinutes();
        return dd + '/' + mm + '/' + yyyy; //+' '+hh+':'+mi+':00';
      }

    $scope.FormatSoloNumeroCelular = function (NID) {
        const input_2 = document.getElementById('' + NID + '');
        const valor = input_2.value.replace(/[^0-9]/g, '');
        input_2.value = valor;

        const target = input_2;
        const input = input_2.value.replace(/\D/g, '').substring(0, 10);
        const zip = input.substring(0, 3);
        const middle = input.substring(3, 6);
        const last = input.substring(6, 10);

        if (input.length > 6) { target.value = `(${zip}) ${middle} - ${last}`; }
        else if (input.length > 3) { target.value = `(${zip}) ${middle}`; }
        else if (input.length > 0) { target.value = `(${zip}`; }
      }

    function validar_json(str) {
        try {
          if (typeof str !== "string") {
            return false;
          } else {
            return (typeof JSON.parse(str) === 'object');
          }
        } catch (e) {
          return false;
        }
      }
    $scope.departamentoselect = new Array(),
    $scope.municipioselect = new Array(),
    $scope.Tipos_Documentos = new Array(),

    $scope.datosRG = {
        tipo_doc : "", 
        numero_doc : "",
        fecha_nacimiento : "",
        fechaexp : "",
        pnombre : "",
        snombre : "",
        papellido : "",
        sapellido : "",
        sexo : "",
        tipo_sangre : "",
        tipo_rh : "",
        condicion_salud:"",
        departamento :"",
        municipio : "",
        barrio : "",
        direccion : "",
        celular : "",
        correo : ""
    }
    $scope.listadoseguimiento = "";
    $scope.validaafiliado = "";
    $scope.tipo_gestion = "";
    $scope.fecha_inicio = "";
    $scope.fecha_fin = "";

    $scope.listado_departamento = function () {
        $http({
          method: 'POST',
          url: "php/movilidad/afiliacion_linea.php",
          data: {
            function: 'lista_departamento',
            coincidencia: ''
          }
        }).then(function (response) {
          if (validar_json(angular.toJson(response.data))) {
            $scope.departamentoselect = response.data;
          } else {
            $scope.departamentoselect = new Array();
            swal('Mensaje', 'No se obtuvo resultados para el lista_departamento', 'info');
          }
        });
      }
      $scope.listado_departamento();
      $scope.lista_municipio_change = function (departamento) {
        if (departamento != undefined && departamento != null && departamento != "") {
            $http({
              method: 'POST',
              url: "php/movilidad/afiliacion_linea.php",
              data: {
                function: 'lista_municipio',
                departamento: departamento,
                coincidencia: ''
              }
            }).then(function (response) {
              if (validar_json(angular.toJson(response.data))) {
                $scope.municipioselect = response.data;
              } else {
                $scope.municipioselect = new Array();
                swal('Mensaje', 'No se obtuvo resultados para el lista_municipio', 'info');
              }
            });
        }
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



    $scope.Registrar_Promocion = function () {
      $scope.Validar_Campos_Nuevo_Funcionario().then(function (result) {
        swal({
          title: "Mensaje",
          text: "Por Favor Los Campos Obligatorios (*)",
          type: "info",
        })
        if(!result){
          var numerocelular = $scope.datosRG.celular.toString().replace(/[^0-9]/g, '');
        if (numerocelular.length < 7){
            swal({
                title: "Mensaje",
                text: "Por Favor Ingrese Un Numero de Celular o Telefono Valido",
                type: "info",
              })
       } else {
         if ($scope.datosRG.correo.toString().toUpperCase() == "NOTIENE@GMAIL.COM" || $scope.datosRG.correo.toString().toUpperCase() == "NOTIENE@HOTMAIL.COM"){
             swal({
                 title: "Mensaje",
                 text: "Por Favor Ingrese Un Correo Valido",
                 type: "info",
               })
        } else {
              var DatosRG = {
                tipo_doc :$scope.datosRG.tipo_doc,
                numero_doc :$scope.datosRG.numero_doc,
                pnombre : $scope.datosRG.pnombre.toString().toUpperCase(),
                snombre : $scope.datosRG.snombre.toString().toUpperCase(),
                papellido : $scope.datosRG.papellido.toString().toUpperCase(),
                sapellido : $scope.datosRG.sapellido.toString().toUpperCase(),
                fecha_nacimiento :formatDate($scope.datosRG.fecha_nacimiento),
                fechaexp :formatDate($scope.datosRG.fechaexp),
                sexo :$scope.datosRG.sexo,
                tipo_sangre :$scope.datosRG.tipo_sangre,
                tipo_rh :$scope.datosRG.tipo_rh,
                condicion_salud :$scope.datosRG.condicion_salud,
                departamento :$scope.datosRG.departamento,
                municipio :$scope.datosRG.municipio,
                direccion : $scope.datosRG.direccion.toString().toUpperCase(),
                barrio : $scope.datosRG.barrio.toString().toUpperCase(),
                // telefono : $scope.datosRG.telefono.toString().replace(/[^0-9]/g, ''),
                celular : $scope.datosRG.celular.toString().replace(/[^0-9]/g, ''),
                correo : $scope.datosRG.correo.toString().toUpperCase(),
                tipo_gestion : "G",
                fecharegistro : "",
                estado : "A",
                responsable : $scope.documento
            }
                swal({
                    title: '¿Desea Guardar este Registro?',
                    // text: "Generar Automatizacion",
                    type: 'info',
                    showCancelButton: true,
                    confirmButtonText: "Confirmar",
                    cancelButtonText: "Cancelar",
                    cancelButtonColor: "#d33",
                    allowOutsideClick: false
                  }).then(function (result) {
                    if (result) {
                      swal({
                          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                          width: 200,
                          allowOutsideClick: false,
                          allowEscapeKey: false,
                          showConfirmButton: false,
                          animation: false
                       });
                      $http({
                        method: 'POST',
                        url: "php/aseguramiento/promocion_afi.php",
                        data: {
                          function: 'registro_promocion_afi',
                          datos: JSON.stringify(DatosRG)
                        }
                      }).then(function (response) {
                        console.log(response);
                          if (response.data.CODIGO == 0){
                            swal({
                                title: "Mensaje",
                                text: response.data.MENSAJE,
                                type: "success",
                              }),
                            $scope.datosRG.tipo_doc = "0",
                            $scope.datosRG.numero_doc = "",
                            $scope.datosRG.fecha_nacimiento = "",
                            $scope.datosRG.fechaexp = "",
                            $scope.datosRG.pnombre = "",
                            $scope.datosRG.snombre = "",
                            $scope.datosRG.papellido = "",
                            $scope.datosRG.sapellido = "",
                            $scope.datosRG.sexo = "0",
                            $scope.datosRG.tipo_sangre = "0",
                            $scope.datosRG.tipo_rh = "0",
                            $scope.datosRG.condicion_salud = "0",
                            $scope.datosRG.departamento = "0",
                            $scope.datosRG.municipio = "0",
                            $scope.datosRG.direccion = "",
                            $scope.datosRG.barrio = "",
                            $scope.datosRG.celular = "",
                            $scope.datosRG.correo = "",
                            $scope.datosRG.responsable = ""
                          } else if (response.data.CODIGO == 1){
                            swal({
                                title: "¡Ocurrio un error!",
                                text: response.data.MENSAJE,
                                type: "warning",
                              })

                          }
                      });
                    }
                  }).catch(swal.noop);
            
         }
        }
      }
    });
     }
    $scope.Validar_Campos_Nuevo_Funcionario = function () {
      return new Promise((resolve) => {
        if ($scope.datosRG.tipo_doc == undefined || $scope.datosRG.tipo_doc == null || $scope.datosRG.tipo_doc == '') {
          document.querySelector("#tipodocumento1").classList.add("red-text"); resolve(true);
        } 
        if ($scope.datosRG.numero_doc == undefined || $scope.datosRG.numero_doc == null || $scope.datosRG.numero_doc == '') {
          document.querySelector("#numero_doc1").classList.add("red-text"); resolve(true);
        } 
        if ($scope.datosRG.fecha_nacimiento == undefined || $scope.datosRG.fecha_nacimiento == null || $scope.datosRG.fecha_nacimiento == '') {
          document.querySelector("#fecha_nacimiento1").classList.add("red-text"); resolve(true);
        } 
        if ($scope.datosRG.fechaexp == undefined || $scope.datosRG.fechaexp == null || $scope.datosRG.fechaexp == '') {
          document.querySelector("#fechaexp1").classList.add("red-text"); resolve(true);
        } 
        if ($scope.datosRG.pnombre == undefined || $scope.datosRG.pnombre == null || $scope.datosRG.pnombre == '') {
          document.querySelector("#pnombre1").classList.add("red-text"); resolve(true);
        } 
        if ($scope.datosRG.papellido == undefined || $scope.datosRG.papellido == null || $scope.datosRG.papellido == '') {
          document.querySelector("#papellido1").classList.add("red-text"); resolve(true);
        } 
        if ($scope.datosRG.sapellido == undefined || $scope.datosRG.sapellido == null || $scope.datosRG.sapellido == '') {
          document.querySelector("#sapellido1").classList.add("red-text"); resolve(true);
        } 
        if ($scope.datosRG.sexo == undefined || $scope.datosRG.sexo == null || $scope.datosRG.sexo == '') {
          document.querySelector("#sexo1").classList.add("red-text"); resolve(true);
        } 
        if ($scope.datosRG.tipo_sangre == undefined || $scope.datosRG.tipo_sangre == null || $scope.datosRG.tipo_sangre == '') {
          document.querySelector("#tipo_sangre1").classList.add("red-text"); resolve(true);
        } 
        if ($scope.datosRG.tipo_rh == undefined || $scope.datosRG.tipo_rh == null || $scope.datosRG.tipo_rh == '') {
          document.querySelector("#tipo_rh1").classList.add("red-text"); resolve(true);
        } 
        if ($scope.datosRG.condicion_salud == undefined || $scope.datosRG.condicion_salud == null || $scope.datosRG.condicion_salud == '') {
          document.querySelector("#condicion_salud1").classList.add("red-text"); resolve(true);
        } 
        if ($scope.datosRG.departamento == undefined || $scope.datosRG.departamento == null || $scope.datosRG.departamento == '') {
          document.querySelector("#departamento1").classList.add("red-text"); resolve(true);
        } 
        if ($scope.datosRG.municipio == undefined || $scope.datosRG.municipio == null || $scope.datosRG.municipio == '') {
          document.querySelector("#municipio1").classList.add("red-text"); resolve(true);
        } 
        if ($scope.datosRG.direccion == undefined || $scope.datosRG.direccion == null || $scope.datosRG.direccion == '') {
          document.querySelector("#direccion1").classList.add("red-text"); resolve(true);
        } 
        if ($scope.datosRG.celular == undefined || $scope.datosRG.celular == null || $scope.datosRG.celular == '') {
          document.querySelector("#celular1").classList.add("red-text"); resolve(true);
        } 
        resolve(false);
      });
    }
   

     $scope.abrirmodalseguimientopromocion = function () {
        $('#modalhistorico').modal("open");
        // $scope.seguimientopromocion();
     }

  $scope.seguimientopromocion = function () {
      if($scope.fecha_inicio == '' ||$scope.fecha_inicio == null ||$scope.fecha_inicio == undefined ||
      $scope.fecha_fin == '' ||$scope.fecha_fin == null ||$scope.fecha_fin == undefined) {
        swal('Informacion',
             'Por favor seleccionar Fecha Inicio y Fecha Fin', 
             'info');
      } else {
        $http({
          method: 'POST',
          url: "php/aseguramiento/promocion_afi.php",
          data: {
            function: 'Obtener_Afiliados_Registrados',
            tipo_gestion: 'G',
            fehca_inicio: formatDate($scope.fecha_inicio),
            fecha_fin: formatDate($scope.fecha_fin),
            documento: $scope.documento
          }
        }).then(function (response) {
          console.log(response);
          $scope.listadoseguimiento =  response.data;
          $scope.filtroseguimiento =  "";
        })

      }
      }


      $scope.descarga = function() {
            window.open('views/aseguramiento/soporte/Reporte_promocion_afi.php?fehca_inicio=' + formatDate($scope.fecha_inicio) + '&fecha_fin=' + formatDate($scope.fecha_fin) + '&documento=' + $scope.documento, '_blank', "width=900,height=1100");
      }

    $scope.limpiartabla = function(){
      $scope.listadoseguimiento = [];
    }

    

  }])
