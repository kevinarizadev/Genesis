'use strict';
angular.module('GenesisApp')
  .controller('consultadirhospitalarioController', ['$scope', 'afiliacionHttp', 'notification', 'cfpLoadingBar', '$http', 'ngDialog', 
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

      $scope.FormatSoloTextoNumero = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        input.value = valor.replace(/[^\wÑñ,.\s]/g, '');
    }

    $scope.departamentoselect = new Array(),
    $scope.municipioselect = new Array(),
    $scope.Tipos_Documentos = new Array(),

      $scope.buscar_tipo_documento = "";
      $scope.buscar_numero = "";
      $scope.verformulario = false;
      $scope.verbusqueda = true;
      $scope.datosbusqueda = "";
      $scope.check_option ="";
      $scope.editar_vista2 = true;
      $scope.editar_vista3 = true;

      $scope.Change_Dep_Buscar = function () {
        if ($scope.departamentoselect) {
          $scope.departamentoselect.forEach(e => {
            if (e.NOMBRE == $scope.datosRG.departamento) {
              $scope.datosRG.departamento = e.NOMBRE;
              $scope.datosRG.departamento1 = e.CODIGO;
              setTimeout(() => { $scope.$apply(); }, 500);
              $scope.lista_municipio_change($scope.datosRG.departamento1 );
              $scope.Change_Mun_Buscar();
            }
          });
        }
      }

      $scope.Change_Mun_Buscar = function () {
        if ($scope.municipioselect) {
          $scope.municipioselect.forEach(e => {
            if (e.NOMBRE == $scope.datosRG.municipio1) {
              $scope.datosRG.municipio1 = e.NOMBRE;
              $scope.datosRG.municipio = e.CODIGO;
              setTimeout(() => { $scope.$apply(); }, 500);
            }
          });
        }
      }

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
              setTimeout(() => {
                $scope.$apply();
              }, 1000);
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

    $scope.Obtener_Tipos_Servicios = function (edad,sexo) {
      $http({
          method: 'POST',
          url: "php/contratacion/C_dir_hospitalario.php",
          data: {
              function: 'Obtener_Servicios',
              edad: edad,
              genero:sexo
          }
      }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
              $scope.Tipos_Servicio = response.data;
          } else {
              swal({
                  title: "¡Ocurrio un error!",
                  text: response.data,
                  type: "warning"
              }).catch(swal.noop);
          }
      });
  }

  $scope.KeyFind_afiliado = function (keyEvent) {
    if (keyEvent.which === 13) {
      $scope.validarafiliado();
    }
  }

    $scope.validarafiliado = function () {
      if($scope.buscar_tipo_documento == ""|| $scope.buscar_tipo_documento == undefined || $scope.buscar_tipo_documento == null ||
      $scope.buscar_numero == "" || $scope.buscar_numero == undefined || $scope.buscar_numero == null){
        swal({
          title: "Mensaje",
          text: "Por favor seleccione tipo y numero de documento",
          type: "info",
        })
      } else{
        $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
            data: { function: 'obtenerafiliados', tipodocumento: $scope.buscar_tipo_documento, documento: $scope.buscar_numero }
          }).then(function (response) {
            $scope.datosbusqueda = response.data
            if($scope.datosbusqueda.CODIGO == 0){
              swal({
                title: "Mensaje",
                text: $scope.datosbusqueda.NOMBRE,
                type: "info",
              })
            } else {
              $scope.verformulario = true;
              $scope.verbusqueda = false;
              $scope.regimen_afiliado = $scope.datosbusqueda.CodigoRegimen;
              $scope.Obtener_Tipos_Servicios($scope.datosbusqueda.EdadDias,$scope.datosbusqueda.SexoCodigo);
            }
              
          })
      }
  }
  $scope.buscar_direccionamiento = function () {
    console.log($scope.datosRG.municipio);
    $scope.v_pjson_detalle = [];
    if($scope.datosRG.municipio == ""|| $scope.datosRG.municipio == undefined || $scope.datosRG.municipio == null ||
    $scope.regimen_afiliado == "" || $scope.regimen_afiliado == undefined || $scope.regimen_afiliado == null ||
    $scope.datosRG.servicios == "" || $scope.datosRG.servicios == undefined || $scope.datosRG.servicios == null){
      swal({
        title: "Mensaje",
        text: "Por favor Seleccionar los campos Departamento y Municipio",
        type: "info",
      })
    } else{
      $http({
          method: 'POST',
          url: "php/contratacion/C_dir_hospitalario.php",
          data: { function: 'obtenerdireccionamiento', 
                  regimen: $scope.regimen_afiliado, 
                  municipio: $scope.datosRG.municipio, 
                  servicio: $scope.datosRG.servicios,
                  cups: "",
                  accion: "S",
                 }
        }).then(function (response) {
          if (response.data[0].Codigo == 1){
            swal({
              title: "Mensaje",
              text: response.data[0].Nombre,
              type: "info",
            })
          } else {
            $scope.verbotonestrategia = 1;
            $scope.v_pmpio_origen = $scope.datosRG.municipio;
            $scope.v_pjson_detalle = response.data;
            $scope.verformulario = false;
            $scope.verbusqueda = false;
            $scope.editar_vista2 = false;
          }
        })
    }
}
  $scope.buscar_direccionamientocups = function () {
    $scope.v_pjson_detalle = [];
    if($scope.datosRG.municipio == ""|| $scope.datosRG.municipio == undefined || $scope.datosRG.municipio == null ||
    $scope.regimen_afiliado == "" || $scope.regimen_afiliado == undefined || $scope.regimen_afiliado == null ||
    $scope.datosRG.cups == "" || $scope.datosRG.cups == undefined || $scope.datosRG.cups == null){
      swal({
        title: "Mensaje",
        text: "Por favor seleccione tipo y numero de documento",
        type: "info",
      })
    } else{
      $http({
          method: 'POST',
          url: "php/contratacion/C_dir_hospitalario.php",
          data: { function: 'obtenerdireccionamiento', 
                  regimen: $scope.regimen_afiliado, 
                  municipio: $scope.datosRG.municipio, 
                  servicio: "",
                  cups: $scope.datosRG.cups,
                  accion: "C",
                 }
        }).then(function (response) {
          if (response.data[0].Codigo == 1){
            swal({
              title: "Mensaje",
              text: response.data[0].Nombre,
              type: "info",
            })
          } else {
            $scope.verbotonestrategia = 2;
            $scope.v_pmpio_origen = $scope.datosRG.municipio;
            $scope.v_pjson_detalle = response.data;
            $scope.verformulario = false;
            $scope.verbusqueda = false;
            $scope.editar_vista2 = false;
          }
        })
    }
}

   // estrategia servicio
   $scope.P_LISTA_ESTRATEGIA_DIR_BASICO = function (x) {
    $scope.municipio_elegido = x;
    $scope.v_pjson_estrategia = [];
    $scope.buscar_tabla_basica = "";
    $http({
        method: 'POST',
        url: "php/contratacion/C_dir_hospitalario.php",
        data: {
            function: 'P_LISTA_ESTRATEGIA_DIR_BASICO',
            v_pregimen: $scope.regimen_afiliado,
            v_pservicio: $scope.datosRG.servicios,
            v_pcups:"",
            v_pmpio_origen: $scope.datosRG.municipio,
            v_pmpio_destino: x.cod_mpio_destino,
            v_paccion: "S",
        }
    }).then(function (response) {

            $scope.v_pjson_estrategia = response.data;
            console.log($scope.v_pjson_estrategia);
            $scope.paso_listado = 3;
            $scope.editar_vista3 = false;
            $scope.editar_vista2 = true;
            $scope.verformulario = false;
            $scope.verbusqueda = false;
            console.log($scope.v_pjson_estrategia);
            if($scope.v_pjson_estrategia[0].Codigo == 1){
              swal({
                title: "Mensaje", 
                text: $scope.v_pjson_estrategia[0].Nombre,
                type: "info",
              })
            }
        

    });
}
   // estrategia cups
   $scope.P_LISTA_ESTRATEGIA_DIR_BASICO_CUPS = function (x) {
    $scope.municipio_elegido = x;
    $scope.v_pjson_estrategia = [];
    $scope.buscar_tabla_basica = "";
    $http({
        method: 'POST',
        url: "php/contratacion/C_dir_hospitalario.php",
        data: {
            function: 'P_LISTA_ESTRATEGIA_DIR_BASICO',
            v_pregimen: $scope.regimen_afiliado,
            v_pservicio: "",
            v_pcups:$scope.datosRG.cups,
            v_pmpio_origen: $scope.datosRG.municipio,
            v_pmpio_destino: x.cod_mpio_destino,
            v_paccion:"C"
        }
    }).then(function (response) {

            $scope.v_pjson_estrategia = response.data;
            console.log($scope.v_pjson_estrategia);
            $scope.paso_listado = 3;
            $scope.editar_vista3 = false;
            $scope.editar_vista2 = true;
            $scope.verformulario = false;
            $scope.verbusqueda = false;
        

    });
}

  $scope.cancelarregistro = function(){
    $scope.verformulario = false;
    $scope.verbusqueda = true;
    $scope.datosRG.departamento ="";
    $scope.datosRG.municipio1 ="";
    $scope.datosRG.servicios ="";
  }
  $scope.Atrasbusqueda = function(){
    $scope.verformulario = true;
    $scope.verbusqueda = false;
    $scope.editar_vista2 = true;
  }
  $scope.Atrasbusqueda2 = function(){
    $scope.verformulario = false;
    $scope.verbusqueda = false;
    $scope.editar_vista2 = false;
    $scope.editar_vista3 = true;
  }

    

  }])
