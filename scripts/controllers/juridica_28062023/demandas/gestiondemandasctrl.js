'use strict';
angular.module('GenesisApp')
  .controller('demandasController', ['$scope', '$http', 'consultaHTTP', '$filter', 'ngDialog', 'cfpLoadingBar', '$timeout', 'afiliacionHttp', '$q',
    function ($scope, $http, consultaHTTP, $filter, ngDialog, cfpLoadingBar, $timeout, afiliacionHttp, $q) {
      $(document).ready(function () {
        $('.buttons-html5').addClass('default-background');
        // console.log("de");
        if ($(window).width() < 1100) {
          document.querySelector("#view-demandas").style.zoom = 0.7;
        }
        if ($(window).width() > 1100 && $(window).width() < 1300) {
          document.querySelector("#view-demandas").style.zoom = 0.8;
        }
        if ($(window).width() > 1300) {
          document.querySelector("#view-demandas").style.zoom = 0.9;
        }
      });
      $.getJSON("php/obtenersession.php").done(function (respuesta) {
        $scope.sesdata = respuesta;
        $scope.cedulalog = $scope.sesdata.cedula;
      })

      //FORMATEA TEXTO CUANTIA, VALEMBARGO A MONEDA
      $scope.formatcurrency = function (variable, NID) {
        switch (variable) {
          case 1:
            $scope.registro.tempcuantia = numeral($scope.registro.tempcuantia).format('$ 0,0[.]0');
            break;
          case 2:
            $scope.registro.tempembargo = numeral($scope.registro.tempembargo).format('$ 0,0[.]0');
            break;
          case 3:
            if ($scope.registro.resultado > 100) {
              $scope.registro.resultado = "";
            }
            // $scope.word = /[0-9]+/;
            break;
          case 4:
            $scope.tempMontoMedidaCautelar = numeral($scope.tempMontoMedidaCautelar).format('$ 0,0[.]0');
            break;
          case 5:
            const input = document.getElementById('' + NID + '');
            var valor = input.value;
            valor = valor.replace(/[^0-9]/g, '');
            input.value = valor;
            if ($scope.registro.resultado > 100) {
              $scope.registro.resultado = "";
            }
            break;
          default:
        }
        // $scope.registro.tempcuantia = numeral($scope.registro.tempcuantia).format('$ 0,0[.]0');
      }

      //DECLARACION DE VARIABLES HDE, DSB, ARRAYS, ASIGNACIONES
      $scope.hdeTablaResultados = false;
      $scope.hdeRegistro = true;
      $scope.hdeActuaciones = true;
      $scope.hdeEmbargos = true;
      $scope.juzgado = {};
      $scope.registro = { anioradicado: 2019, radicacion: 0, tipoidapoderado: 'CC' };
      $scope.demandados = [];
      $scope.demandantes = [];
      $scope.apdemandantes = [];
      $scope.hdeBtnAddEditDdo = true;
      $scope.hdeBtnAddEditDdte = true;
      $scope.hdereprelegal = true;
      $scope.hdeTableAddDem = true;
      $scope.hdeTableAddDemte = true;
      $scope.hdeEvidencia = true;
      $scope.hdeEvidenciaU = false;
      $scope.msjTableBitacora = true;
      $scope.idupdatedemdo = 0;
      $scope.idupdatedemte = 0;
      $scope.dsbDataDemandante = true;
      $scope.hdeBtnPanelActuaciones = true;
      $scope.hdebtnActualizarDemanda = true;
      $scope.dsbbtnsave = false;
      $scope.hdebtnblockform = true;
      //VARIABLES MODAL DIRECCION
      $scope.selectViap = "0";
      $scope.numeroN = '';
      $scope.selectLetra = "0";
      $scope.selectnumero = '';
      $scope.bis = '';
      $scope.selectcuadrante = "0";
      $scope.numeroNVG = '';
      $scope.selectLetraVG = "0";
      $scope.numeroplaca = '';
      $scope.selectcuadranteVG = "0";
      $scope.complemento = '';
      $scope.dire = '';
      $scope.bistext = '';
      $scope.newdir = '';
      //CIERRE VARIABLES MODAL DIRECCION

      //FUNCIONES MODAL DIRECCION
      afiliacionHttp.obtenerViaPrincipal().then(function (response) {
        $scope.viaprincipal = response;
      })

      afiliacionHttp.obtenerLetra().then(function (response) {
        $scope.letras = response;
      })

      afiliacionHttp.obtenerCuadrante().then(function (response) {
        $scope.Cuadrantes = response;
      })

      $scope.changebis = function () {
        if ($scope.bis == true) {
          $scope.bistext = "BIS";
        } else {
          $scope.bistext = "";
        }
      }

      $scope.modaldir = function (casodir) {
        $scope.controldir = casodir;
        (function () {
          $('#modal1').modal();
        }());
        $('#modal1').modal('open');
      }

      $scope.cargardir = function (scope) {
        switch ($scope.controldir) {
          case '1':
            $scope.direcciondemandante = $("#direccionmodal").val().trim();
            $scope.selectViap = "0";
            $scope.numeroN = '';
            $scope.selectLetra = "0";
            $scope.selectnumero = '';
            $scope.bis = '';
            $scope.selectcuadrante = "0";
            $scope.numeroNVG = '';
            $scope.selectLetraVG = "0";
            $scope.numeroplaca = '';
            $scope.selectcuadranteVG = "0";
            $scope.complemento = '';
            $scope.dire = '';
            $scope.bistext = '';
            $scope.newdir = '';
            break;
          case '2':
            $scope.registro.direccionapoderado = $("#direccionmodal").val().trim();
            $scope.selectViap = "0";
            $scope.numeroN = '';
            $scope.selectLetra = "0";
            $scope.selectnumero = '';
            $scope.bis = '';
            $scope.selectcuadrante = "0";
            $scope.numeroNVG = '';
            $scope.selectLetraVG = "0";
            $scope.numeroplaca = '';
            $scope.selectcuadranteVG = "0";
            $scope.complemento = '';
            $scope.dire = '';
            $scope.bistext = '';
            $scope.newdir = '';
            break;
        }
        $scope.salir();
      }

      $scope.salir = function () {
        $('#modal1').modal('close');
      }

      //LISTA DEPARTAMENTOS
      $scope.listaDepartamentos = function () {
        $http({
          method: 'POST',
          url: "php/juridica/demandas/funcdemandas.php",
          data: {
            function: 'listaDepartamentos'
          }
        }).then(function (response) {
          $scope.Departamentos = response.data;
        });
      }
      $scope.listaDepartamentos();

      //LISTA MUNICIPIOS DEPENDIENDO EL DEPARTAMENTO SELECCIONADO
      $scope.listaMunicipios = function (cod_departamento) {
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/juridica/demandas/funcdemandas.php",
          data: {
            function: 'listaMunicipios',
            departamento: cod_departamento
          }
        }).then(function (response) {
          swal.close();
          $scope.Municipios = response.data;
        });
      }

      //LISTA TIPOS DE JURISDICCION
      $scope.listaTiposJurisdiccion = function () {
        $http({
          method: 'POST',
          url: "php/juridica/demandas/funcdemandas.php",
          data: {
            function: 'listatiposjurisdiccion'
          }
        }).then(function (response) {
          $scope.TiposJurisdiccion = response.data;
        });
      }
      $scope.listaTiposJurisdiccion();

      //LISTA SUB TIPO DE PROCESO DEPENDIENDO EL TIPO DE JURISDICCION SELECCIONADO
      $scope.listaTiposProcesos = function (tipojurisdiccion) {
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/juridica/demandas/funcdemandas.php",
          data: {
            function: 'listaTiposProcesos',
            tipojurisdiccion: tipojurisdiccion
          }
        }).then(function (response) {
          swal.close();
          $scope.TipoProcesos = response.data;
        });
      }

      //VALIDA HDE EMBARGO
      // $scope.validaEmbargo = function () {
      //    if ($scope.registro.tipojurisdiccion == 'C' && ($scope.registro.tipoproceso == 'EM' || $scope.registro.tipoproceso == 'ES')) {
      //       $scope.hdeEmbargos = false;
      //    } else if ($scope.registro.tipojurisdiccion == 'L' && $scope.registro.tipoproceso == 'EL') {
      //       $scope.hdeEmbargos = false;
      //    } else if ($scope.registro.tipojurisdiccion == 'A' && $scope.registro.tipoproceso == 'EC') {
      //       $scope.hdeEmbargos = false;
      //    } else {
      //       $scope.hdeEmbargos = true;
      //       $scope.tempFechaRecEmbargo="";
      //       document.getElementById("dteFechaEmbargo").value = "";
      //       $scope.registro.tempembargo="";
      //       $scope.tempFechaDesembargo="";
      //       document.getElementById("dteFechaDesembargo").value = "";
      //    }
      // }

      // VALIDA CAMBIO INPUT
      $scope.validaInput = function () {
        //CAMBIO INPUT REPRESENTANTE LEGAL
        if ($scope.tipodemandante == 'J') {
          $scope.hdereprelegal = false;
        } else {
          $scope.hdereprelegal = true;
          $scope.reprelegaldemandante = "";
        }
        //CAMBIO INPUT TIPO EVIDENCIA ACTUACION
        if ($scope.tipoevidencia == 'A') {
          $scope.hdeEvidencia = false;
          $scope.hdeEvidenciaU = false;
          $scope.urlactuacion = "";
        } else {
          $scope.hdeEvidenciaU = true;
          $scope.hdeEvidencia = true;
          $scope.archivodemanda = "";
        }
        //CAMBIO INPUT TIPO PERSONA DEMANDANTE
        if ($scope.tipodemandante == 'J') {
          $scope.tipodocdemandante = 'NI';
          $scope.test = false;
        } else {
          $scope.tipodocdemandante = '';
          $scope.test = true;
        }
        //CAMBIO INPUT BLOCK FORM
        if ($scope.BlockForm == true) {
          $scope.dsbRegistro = true;
        } else {
          $scope.dsbRegistro = false;
        }
      }

      //AÑADE STYLE DATEPICKER
      $("#dteFechaActuacion").kendoDatePicker({
        format: "dd/MM/yyyy",
        culture: "es-MX"
      });

      $("#dteFechaEmbargo").kendoDatePicker({
        format: "dd/MM/yyyy",
        culture: "es-MX",
        max: new Date(),
      });

      $("#dteFechaDesembargo").kendoDatePicker({
        format: "dd/MM/yyyy",
        culture: "es-MX",
        min: new Date(),
      });

      //VALIDA REGLAS CONSECUTIVO
      function paddy(n, p, c) {
        var pad_char = typeof c !== 'undefined' ? c : '0';
        var pad = new Array(1 + p).join(pad_char);
        var res = (pad + n).slice(-pad.length);
        return res;
      }

      $scope.validaCons = function () {
        $scope.registro.radicacion = paddy($scope.registro.radicacion, 5);
      }

      //LIMPIA CONSECUTIVO AL DARLE CLICK AL CAMPO
      $scope.formatTextVacio = function () {
        $scope.registro.radicacion = '';
      }

      //LISTA DATOS DE DEMANDAS EN TABLA
      var listDemandas = $('#resultDemandas').DataTable({
        dom: 'lBsfrtip',
        select: true,
        buttons: ['csv', 'excel'],
        columnDefs: [{
          targets: [8, 9, 10, 11], visible: false
        }],
        searching: true,
        ajax: {
          //url: 'json/demandas.json',
          url: 'php/juridica/demandas/listdemandas.php',
          dataSrc: ''
        },
        columns: [
          { data: "codigo_demanda" },
          { data: "radicacion" },
          { data: "demandante" },
          { data: "nombre_ubicacion" },
          { data: "tipojurisdiccion_nombre" },
          { data: "tipoproceso_nombre" },
          { data: "cuantia" },
          { data: "estado" },
          { data: "apoderado" },
          { data: "medida_cautelar" },
          { data: "probabilidad" },
          { data: "provision" }
        ],
        language: {
          "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        },
        lengthMenu: [[10, 30, 50, -1], [10, 30, 50, 'Todas']],
        order: [[1, "asc"]]
      });

      $scope.dwinforme = function () {
        window.open('php/juridica/demandas/informe_demandas.php');
      }

      //MUESTRA EL FORMULARIO PARA AÑADIR NUEVO REGISTRO DE DEMANDA
      $scope.countbtn = 0;
      $scope.btnRegistrarDemanda = function () {
        $scope.dsbRegistro = false;
        $scope.hdebtnblockform = true;
        $scope.BlockForm = false;
        $scope.dsbbtnsave = false;
        $scope.countbtn++;
        $scope.hdeTablaResultados = true;
        $scope.hdeRegistro = false;
        $scope.hdeActuaciones = true;
        document.getElementById('radicado').disabled = false;
        document.getElementById('anoradicado').disabled = false;
        $scope.registro = { anioradicado: '2019', radicacion: 0 };
        $scope.hdebtnActualizarDemanda = true;
        $scope.hdeAdjuntarfile = false;
        // if ($scope.countbtn != 0) {
        //    // var arrayDemandado = {
        //    //    tipo_documento: 'NI',
        //    //    documento: '890.102.044',
        //    //    nombre: 'Caja de Compensación Familiar Cajacopi',
        //    //    tipo_actor: 'D2'
        //    // };
        //    // $scope.demandados.push(arrayDemandado);
        //    $scope.tipoiddemandado = 'NI';
        //    $scope.iddemandado = '890102044';
        //    $scope.BuscarDemandado();
        // } else {
        //    return;
        // }
        $scope.hdeTableAddDem = false;
        $scope.hdeBtnPanelActuaciones = true;
        $scope.registro.tipoidapoderado = "CC";
        $scope.limpiar();
      }

      $scope.verDemandas = function () {
        cfpLoadingBar.start();
        listDemandas.ajax.reload();
        $scope.dsbRegistro = false;
        $scope.hdebtnblockform = true;
        $scope.BlockForm = false;
        $scope.hdeRegistro = true;
        $scope.hdeActuaciones = true;
        $scope.hdeTablaResultados = false;
        $scope.hdeBtnPanelActuaciones = true;
        // $scope.registro = { anioradicado: 2019, radicacion: 0, tipoidapoderado: 'CC' };
        $scope.limpiar();
        cfpLoadingBar.complete();
      }

      $scope.limpiar = function () {
        $scope.juzgado.seleccion = "";
        $scope.registro.ubicdepartamento = "";
        $scope.registro.ubicmunicipio = "";
        $scope.registro.tipojurisdiccion = "";
        $scope.registro.tipoproceso = "";
        $scope.registro.tempcuantia = "";
        $scope.registro.probabilidad = "";
        $scope.registro.descripcion = "";
        $scope.registro.tipoidapoderado = 'CC';
        $scope.registro.idapoderado = "";
        $scope.registro.nombreapoderado = "";
        $scope.registro.telefonoapoderado = "";
        $scope.registro.emailapoderado = "";
        $scope.registro.direccionapoderado = "";
        $scope.tipodemandante = "";
        $scope.reprelegaldemandante = "";
        $scope.tipodocdemandante = "";
        $scope.iddemandante = "";
        $scope.nombredemandante = "";
        $scope.telefonodemandante = "";
        $scope.emaildemandante = "";
        $scope.direcciondemandante = "";
        $scope.demandantes = [];
        $scope.hdeTableAddDemte = true;
        // $scope.tipoiddemandado = "";
        // $scope.iddemandado = "";
        // $scope.nombredemandado = "";
        // $scope.demandados = [];
        $scope.hdeTableAddDem = true;
        // $scope.hdeEmbargos = true;
        // $scope.tempFechaRecEmbargo = "";
        // $scope.tempFechaDesembargo = "";
        // document.getElementById("dteFechaEmbargo").value = "";
        // document.getElementById("dteFechaDesembargo").value = "";
        // if ($scope.countbtn != 0) {
        //    var arrayDemandado = {
        //       tipo_documento: 'NI',
        //       documento: '890.102.044',
        //       nombre: 'Caja de Compensación Familiar Cajacopi',
        //       tipo_actor: 'D2'
        //    };
        //    $scope.demandados.push(arrayDemandado);
        //    $scope.hdeTableAddDem = false;
        // } else {
        //    return;
        // }
      }

      //CLIC EN DEMANDA SELECCIONADA
      $('#resultDemandas tbody').on('click', 'tr', function () {
        $scope.hdebtnblockform = false;
        $scope.BlockForm = true;
        if ($scope.BlockForm == true) {
          $scope.dsbRegistro = true;
        } else {
          $scope.dsbRegistro = false;
        }
        $scope.dsbbtnsave = true;
        $scope.hdeRegistro = false;
        $scope.hdeBtnPanelActuaciones = false;
        $scope.hdeAdjuntarfile = true;
        $scope.hdebtnActualizarDemanda = false;
        $scope.hdeActuaciones = false;
        var data = listDemandas.row(this).data();
        if (data === undefined) {
          return;
        }
        $scope.codigo_demanda_seleccionada = data.codigo_demanda;
        $scope.carga_info_demanda(data.codigo_demanda, data.tipojurisdiccion_codigo, data.departamento_cod);
      });
      //FIN CLIC DEMANDA SELECCIONADA

      $scope.carga_info_demanda = function (codigo_demanda, cod_jurisdiccion, cod_departamento) {
        $scope.codigo_demanda_actuacion = codigo_demanda;
        $scope.listaTiposProcesos(cod_jurisdiccion);
        $scope.listaMunicipios(cod_departamento);
        swal({
          title: 'Cargando información de la Demanda'
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/juridica/demandas/funcdemandas.php",
          data: {
            function: 'obtenerdemanda',
            numerodemanda: codigo_demanda
          }
        }).then(function (response) {
          document.getElementById('radicado').disabled = true;
          document.getElementById('anoradicado').disabled = true;
          $scope.registro = response.data;
          // $scope.listaMunicipios($scope.registro.ubicdepartamento);
          // $scope.validaEmbargo();
          // $scope.tempFechaRecEmbargo = $scope.registro.tempFechaRecEmbargo;
          // document.getElementById("dteFechaEmbargo").value = $scope.registro.tempFechaRecEmbargo;
          // $scope.tempFechaDesembargo = $scope.registro.tempFechaDesembargo;
          // document.getElementById("dteFechaDesembargo").value = $scope.registro.tempFechaDesembargo;
          $scope.demandantes = $scope.registro.demandantes;
          $scope.hdeTableAddDemte = false;
          if ($scope.registro.apoderado.length < 1) {
            $scope.registro.tipoidapoderado = "CC";
            $scope.registro.idapoderado = "";
            $scope.registro.nombreapoderado = "";
            $scope.registro.telefonoapoderado = "";
            $scope.registro.emailapoderado = "";
            $scope.registro.direccionapoderado = "";
          } else {
            $scope.registro.tipoidapoderado = $scope.registro.apoderado[0].tipo_documento;
            $scope.registro.idapoderado = $scope.registro.apoderado[0].documento;
            $scope.registro.nombreapoderado = $scope.registro.apoderado[0].nombre;
            $scope.registro.telefonoapoderado = $scope.registro.apoderado[0].telefono;
            $scope.registro.emailapoderado = $scope.registro.apoderado[0].email;
            $scope.registro.direccionapoderado = $scope.registro.apoderado[0].direccion;
          }
          $scope.demandados = $scope.registro.demandados;
          $scope.hdeTableAddDem = false;
          $scope.registro.anioradicado = $scope.registro.radicacion.slice(6);
          $scope.juzgado = {
            seleccion: $scope.registro.juzgado + ' - ' + $scope.registro.juzc_nombre,
            codigo: $scope.registro.juzgado
          }
          setTimeout(() => {
            swal.close();
          }, 100);
        });
      }

      //BUSCA DEMANDANTES EN BD
      $scope.BuscarDemandante = function () {
        if ($scope.iddemandante != undefined) {
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          if ($scope.tipodocdemandante == 'NI' && $scope.iddemandante == '890102044') {
            $scope.reprelegaldemandante = 'DANIEL ENRIQUE DE CASTRO CHAPMAN'
            $scope.nombredemandante = 'CAJA DE COMPENSACIÓN FAMILIAR CAJACOPI ATLÁNTICO';
            $scope.telefonodemandante = '3707867';
            $scope.emaildemandante = 'documentacion@cajacopi.com';
            $scope.direcciondemandante = 'CRA 46 # 53 - 34, PISO 2, TORRE B, EDIFICIO NELMAR, BARRANQUILLA';
            $scope.dsbDataDemandante = false;
            swal.close();
          } else {
            $scope.tipoiddemandado = 'NI';
            $scope.iddemandado = '890102044';
            $scope.nombredemandado = 'CAJA DE COMPENSACIÓN FAMILIAR CAJACOPI ATLÁNTICO';
            $http({
              method: 'POST',
              url: "php/juridica/demandas/funcdemandas.php",
              data: {
                function: 'buscarDemandante',
                documento: $scope.iddemandante
              }
            }).then(function (response) {
              swal.close();
              $scope.dataDemandantes = response.data;
              if ($scope.dataDemandantes[0].codigo == 1 || $scope.tipodocdemandante == null) {
                $scope.nombredemandante = "";
                $scope.telefonodemandante = "";
                $scope.emaildemandante = "";
                $scope.direcciondemandante = "";
                $scope.dsbDataDemandante = false;
              } else {
                $scope.nombredemandante = $scope.dataDemandantes[0].nombre_dem;
                $scope.telefonodemandante = $scope.dataDemandantes[0].telefono_dem;
                $scope.emaildemandante = $scope.dataDemandantes[0].email_dem;
                $scope.direcciondemandante = $scope.dataDemandantes[0].direccion;
                $scope.dsbDataDemandante = false;
                // if ($scope.tipodocdemandante == 'NI' && $scope.iddemandante == '890102044') {
                //    $scope.eliminarDemandado(0);
                // }
              }
            });
          }
        }
      }

      //AÑADE NUEVOS DEMANDANTES
      $scope.addNuevoDemandante = function () {
        // if ($scope.iddemandante == "" || $scope.nombredemandante == "" || $scope.telefonodemandante == "" || $scope.emaildemandante == "" || $scope.direcciondemandante == "") {
        //    swal({
        //       title: 'Importante!',
        //       text: 'No ha añadido correctamente los datos del demandante.',
        //       type: 'info',
        //       confirmButtonText: 'Cerrar',
        //       confirmButtonColor: '#174791'
        //    });
        // } else
        if ($scope.tipodemandante == 'J' && ($scope.reprelegaldemandante == "" || $scope.reprelegaldemandante == null || $scope.reprelegaldemandante == undefined)) {
          swal({
            title: 'Importante!',
            text: 'Debe completar el campo Representante Legal.',
            type: 'info',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#174791'
          });
        }
        else {
          for (let i = 0; i < $scope.demandantes.length; i++) {
            if ($scope.iddemandante == $scope.demandantes[i].documento) {
              swal({
                title: 'Importante!',
                text: 'El demandante ya se encuentra añadido.',
                type: 'info',
                confirmButtonText: 'Cerrar',
                confirmButtonColor: '#174791'
              });
              return;
            }
          }
          for (let i = 0; i < $scope.demandados.length; i++) {
            if ($scope.iddemandante == $scope.demandados[i].documento) {
              swal({
                title: 'Importante!',
                text: 'El demandante no puede estar en la lista de los demandados.',
                type: 'info',
                confirmButtonText: 'Cerrar',
                confirmButtonColor: '#174791'
              });
              return;
            }
          }
          var arrayDemandante = {
            tipo_persona: $scope.tipodemandante,
            tipo_documento: $scope.tipodocdemandante,
            documento: $scope.iddemandante,
            nombre: $scope.nombredemandante,
            telefono: $scope.telefonodemandante,
            email: $scope.emaildemandante,
            direccion: $scope.direcciondemandante,
            tipo_actor: 'D1',
            representante: $scope.reprelegaldemandante
          }
          $scope.demandantes.push(arrayDemandante);
          $scope.tipodemandante = '';
          $scope.tipodocdemandante = '';
          $scope.iddemandante = '';
          $scope.nombredemandante = '';
          $scope.telefonodemandante = '';
          $scope.emaildemandante = '';
          $scope.direcciondemandante = '';
          $scope.dsbDataDemandante = true;
          $scope.reprelegaldemandante = '';
          $scope.hdeTableAddDemte = false;
          $scope.hdereprelegal = true;
          swal({
            title: 'Confirmado!',
            text: 'Demandante agregado correctamente.',
            type: 'success',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#174791'
          });
        }
        setTimeout(() => {
          swal.close();
        }, 5000);
      }

      //PERMITE MODIFICAR DEMANDANTES
      $scope.editDemandante = function (tipo_documento, documento, nombre, telefono, email, direccion, tipo_persona, representante) {
        // for (let i = 0; i < $scope.demandantes.length;i++) {
        // if ($scope.demandantes[i].tipo_persona == 'N') {
        if (tipo_persona == 'N') {
          $scope.hdeBtnAddEditDdte = false;
          $scope.tipodemandante = tipo_persona;
          $scope.tipodocdemandante = tipo_documento;
          $scope.iddemandante = documento;
          $scope.nombredemandante = nombre;
          $scope.telefonodemandante = telefono;
          $scope.emaildemandante = email;
          $scope.direcciondemandante = direccion;
          $scope.idupdatedemte = documento;
          $scope.reprelegaldemandante = '';
          $scope.hdereprelegal = true;
          $scope.dsbDataDemandante = false;
        } else {
          $scope.hdeBtnAddEditDdte = false;
          $scope.tipodemandante = tipo_persona;
          $scope.tipodocdemandante = tipo_documento;
          $scope.iddemandante = documento;
          $scope.nombredemandante = nombre;
          $scope.telefonodemandante = telefono;
          $scope.emaildemandante = email;
          $scope.direcciondemandante = direccion;
          $scope.hdereprelegal = false;
          $scope.reprelegaldemandante = representante;
          $scope.idupdatedemte = documento;
          $scope.dsbDataDemandante = false;
        }
        // }
      }

      //ELIMINA DEMANDANTES
      $scope.eliminarDemandante = function (index) {
        $scope.demandantes.splice(index, 1);
        if ($scope.demandantes.length == 0) {
          $scope.hdeTableAddDemte = true;
          $scope.tipodemandante = '';
          $scope.tipodocdemandante = '';
          $scope.iddemandante = '';
          $scope.nombredemandante = '';
          $scope.telefonodemandante = '';
          $scope.emaildemandante = '';
          $scope.reprelegaldemandante = '';
          $scope.direcciondemandante = '';
          $scope.hdeBtnAddEditDdte = true;
          $scope.dsbDataDemandante = true;
          $scope.hdereprelegal = true;
          swal({
            title: 'Confirmado!',
            text: 'Los demandantes han sido eliminados.',
            type: 'success',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#174791'
          });
        } else {
          $scope.tipodemandante = '';
          $scope.tipodocdemandante = '';
          $scope.iddemandante = '';
          $scope.nombredemandante = '';
          $scope.telefonodemandante = '';
          $scope.emaildemandante = '';
          $scope.reprelegaldemandante = '';
          $scope.direcciondemandante = '';
          $scope.hdeBtnAddEditDdte = true;
          $scope.dsbDataDemandante = true;
          $scope.hdereprelegal = true;
          swal({
            title: 'Confirmado!',
            text: 'Demandante eliminado correctamente.',
            type: 'success',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#174791'
          });
        }
        setTimeout(() => {
          swal.close();
        }, 5000);
      }

      //ACTUALIZA DATOS DEL DEMANDANTE SELECCIONADO
      $scope.updateDemandante = function () {
        if ($scope.tipodemandante == 'J' && ($scope.reprelegaldemandante == "" || $scope.reprelegaldemandante == null || $scope.reprelegaldemandante == undefined)) {
          swal({
            title: 'Importante!',
            text: 'Debe completar el campo Representante Legal.',
            type: 'info',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#174791'
          });
        } else {
          for (let i = 0; i < $scope.demandantes.length; i++) {
            if ($scope.demandantes[i].documento == $scope.idupdatedemte) {
              $scope.demandantes[i].tipo_persona = $scope.tipodemandante;
              $scope.demandantes[i].tipo_documento = $scope.tipodocdemandante;
              $scope.demandantes[i].documento = $scope.iddemandante;
              $scope.demandantes[i].nombre = $scope.nombredemandante;
              $scope.demandantes[i].telefono = $scope.telefonodemandante;
              $scope.demandantes[i].email = $scope.emaildemandante;
              $scope.demandantes[i].direccion = $scope.direcciondemandante;
              $scope.demandantes[i].representante = $scope.reprelegaldemandante;
              swal({
                title: 'Confirmado!',
                text: 'Datos del demandante actualizados correctamente.',
                type: 'success',
                confirmButtonText: 'Cerrar',
                confirmButtonColor: '#174791'
              });
              // Materialize.toast('I am a toast!', 400)
            }
          }
          setTimeout(() => {
            swal.close();
          }, 5000);
          $scope.hdereprelegal = true;
          $scope.tipodemandante = '';
          $scope.tipodocdemandante = '';
          $scope.iddemandante = '';
          $scope.nombredemandante = '';
          $scope.telefonodemandante = '';
          $scope.emaildemandante = '';
          $scope.direcciondemandante = '';
          $scope.reprelegaldemandante = '';
          $scope.hdeBtnAddEditDdte = true;
          $scope.dsbDataDemandante = true;
        }
      }

      //BUSCA DEMANDADOS EN BD
      $scope.BuscarDemandado = function () {
        if ($scope.iddemandado != undefined) {
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          $http({
            method: 'POST',
            url: "php/juridica/demandas/funcdemandas.php",
            data: {
              function: 'buscarDemandante',
              documento: $scope.iddemandado
            }
          }).then(function (response) {
            swal.close();
            $scope.dataDemandado = response.data;
            if ($scope.dataDemandado[0].codigo == 1 || $scope.tipoiddemandado == null) {
              $scope.nombredemandado = "";
            } else {
              $scope.nombredemandado = $scope.dataDemandado[0].nombre_dem;
            }
          });
        }
      }

      $scope.BuscarApoderadoDemandado = function () {
        if ($scope.idApoderadoDemandado != undefined) {
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          $http({
            method: 'POST',
            url: "php/juridica/demandas/funcdemandas.php",
            data: {
              function: 'BuscarApoderadoDemandado',
              documento: $scope.idApoderadoDemandado
            }
          }).then(function (response) {
            swal.close();
            $scope.dataApoderadoDemandado = response.data;
            if ($scope.dataApoderadoDemandado.length == 0) {
              $scope.NombreApoderadoDemandado = "";
            } else {
              $scope.NombreApoderadoDemandado = $scope.dataApoderadoDemandado[0].nombre;
            }
          });
        }
      }

      //AÑADE NUEVOS DEMANDADOS
      $scope.addNuevoDemandado = function () {
        if ($scope.iddemandado == "" || $scope.nombredemandado == "" || $scope.tipoiddemandado == "") {
          swal({
            title: 'Importante!',
            text: 'No ha añadido correctamente los datos del demandado.',
            type: 'info',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#174791'
          });
        } else {
          if ($scope.tipoiddemandado == "NI" && $scope.iddemandado == "890102044") {
            if ($scope.idApoderadoDemandado == "" || $scope.NombreApoderadoDemandado == ""
              || $scope.idApoderadoDemandado == undefined || $scope.NombreApoderadoDemandado == undefined) {
              swal({
                title: 'Importante!',
                text: 'No ha añadido correctamente los datos del apoderado demandado.',
                type: 'info',
                confirmButtonText: 'Cerrar',
                confirmButtonColor: '#174791'
              });
            } else {
              for (let i = 0; i < $scope.demandados.length; i++) {
                if ($scope.iddemandado == $scope.demandados[i].documento) {
                  swal({
                    title: 'Importante!',
                    text: 'El demandado ya se encuentra añadido.',
                    type: 'info',
                    confirmButtonText: 'Cerrar',
                    confirmButtonColor: '#174791'
                  });
                  return;
                }
              }
              for (let i = 0; i < $scope.demandantes.length; i++) {
                if ($scope.iddemandado == $scope.demandantes[i].documento) {
                  swal({
                    title: 'Importante!',
                    text: 'El demandado no puede estar en la lista de los demandantes.',
                    type: 'info',
                    confirmButtonText: 'Cerrar',
                    confirmButtonColor: '#174791'
                  });
                  return;
                }
              }
              var arrayDemandado = {
                tipo_documento: $scope.tipoiddemandado,
                documento: $scope.iddemandado,
                nombre: $scope.nombredemandado,
                tipo_actor: 'D2',
                apoderado: $scope.iddemandado == '890102044' ? $scope.idApoderadoDemandado : '',
                nombre_apoderado: $scope.iddemandado == '890102044' ? $scope.NombreApoderadoDemandado : ''
              }
              $scope.demandados.push(arrayDemandado);
              $scope.hdeTableAddDem = false;
              $scope.iddemandado = '';
              $scope.nombredemandado = '';
              $scope.tipoiddemandado = '';
              $scope.idApoderadoDemandado = '';
              $scope.NombreApoderadoDemandado = '';
              swal({
                title: 'Confirmado!',
                text: 'Demandado agregado correctamente.',
                type: 'success',
                confirmButtonText: 'Cerrar',
                confirmButtonColor: '#174791'
              });
            }
          } else {
            for (let i = 0; i < $scope.demandados.length; i++) {
              if ($scope.iddemandado == $scope.demandados[i].documento) {
                swal({
                  title: 'Importante!',
                  text: 'El demandado ya se encuentra añadido.',
                  type: 'info',
                  confirmButtonText: 'Cerrar',
                  confirmButtonColor: '#174791'
                });
                return;
              }
            }
            for (let i = 0; i < $scope.demandantes.length; i++) {
              if ($scope.iddemandado == $scope.demandantes[i].documento) {
                swal({
                  title: 'Importante!',
                  text: 'El demandado no puede estar en la lista de los demandantes.',
                  type: 'info',
                  confirmButtonText: 'Cerrar',
                  confirmButtonColor: '#174791'
                });
                return;
              }
            }
            var arrayDemandado = {
              tipo_documento: $scope.tipoiddemandado,
              documento: $scope.iddemandado,
              nombre: $scope.nombredemandado,
              tipo_actor: 'D2',
              apoderado: $scope.iddemandado == '890102044' ? $scope.idApoderadoDemandado : '',
              nombre_apoderado: $scope.iddemandado == '890102044' ? $scope.NombreApoderadoDemandado : ''
            }
            $scope.demandados.push(arrayDemandado);
            $scope.hdeTableAddDem = false;
            $scope.iddemandado = '';
            $scope.nombredemandado = '';
            $scope.tipoiddemandado = '';
            $scope.idApoderadoDemandado = '';
            $scope.NombreApoderadoDemandado = '';
            swal({
              title: 'Confirmado!',
              text: 'Demandado agregado correctamente.',
              type: 'success',
              confirmButtonText: 'Cerrar',
              confirmButtonColor: '#174791'
            });
          }
        }
        setTimeout(() => {
          swal.close();
        }, 5000);
      }

      //PERMITE MODIFICAR DEMANDADOS
      $scope.editDemandado = function (demandado) {
        // console.log(demandado);
        $scope.hdeBtnAddEditDdo = false;
        $scope.tipoiddemandado = demandado.tipo_documento;
        $scope.iddemandado = demandado.documento;
        $scope.nombredemandado = demandado.nombre;
        $scope.idupdatedemdo = demandado.documento;
        $scope.idApoderadoDemandado = demandado.documento == '890102044' ? demandado.apoderado : '';
        $scope.NombreApoderadoDemandado = demandado.documento == '890102044' ? demandado.nombre_apoderado : '';
      }

      //ELIMINA DEMANDADOS
      $scope.eliminarDemandado = function (index) {
        $scope.demandados.splice(index, 1);
        if ($scope.demandados.length == 0) {
          $scope.hdeTableAddDem = true;
          $scope.tipoiddemandado = "";
          $scope.iddemandado = "";
          $scope.nombredemandado = "";
          $scope.hdeBtnAddEditDdo = true;
          swal({
            title: 'Confirmado!',
            text: 'Demandado eliminado correctamente.',
            type: 'success',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#174791'
          });
        } else {
          $scope.iddemandado = '';
          $scope.nombredemandado = '';
          $scope.tipoiddemandado = '';
          $scope.hdeBtnAddEditDdo = true;
          swal({
            title: 'Confirmado!',
            text: 'Demandado eliminado correctamente.',
            type: 'success',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#174791'
          });
        }
      }

      //ACTUALIZA DATOS DEL DEMANDADO SELECCIONADO
      $scope.updateDemandado = function () {
        for (let i = 0; i < $scope.demandados.length; i++) {
          if ($scope.demandados[i].documento == $scope.idupdatedemdo) {
            $scope.demandados[i].tipo_documento = $scope.tipoiddemandado;
            $scope.demandados[i].documento = $scope.iddemandado;
            $scope.demandados[i].nombre = $scope.nombredemandado;
            $scope.demandados[i].apoderado = $scope.idApoderadoDemandado;
            $scope.demandados[i].nombre_apoderado = $scope.NombreApoderadoDemandado;
            swal({
              title: 'Confirmado!',
              text: 'Datos del demandante actualizados correctamente.',
              type: 'success',
              confirmButtonText: 'Cerrar',
              confirmButtonColor: '#174791'
            });
          }
          $scope.hdeBtnAddEditDdo = true;
          setTimeout(() => {
            swal.close();
          }, 5000);
        }
        $scope.tipoiddemandado = "";
        $scope.iddemandado = "";
        $scope.nombredemandado = "";
        $scope.idApoderadoDemandado = "";
        $scope.NombreApoderadoDemandado = "";
        $scope.hdeBtnAddEdit = true;
      }

      //REGISTRA DEMANDAS
      $scope.registrarDemanda = function (actividad) {
        if ($scope.demandantes.length < 1) {
          swal('Información', 'No a añadido Demandantes.', 'info');
          return;
        }
        if ($scope.demandados.length < 1) {
          swal('Información', 'No a añadido Demandados.', 'info');
          return;
        }
        // if ($scope.registro.tipojurisdiccion == 'C' && ($scope.registro.tipoproceso == 'EM'
        //    || $scope.registro.tipoproceso == 'ES') && ($scope.tempFechaRecEmbargo == undefined
        //    || $scope.registro.tempembargo == '' || $scope.tempFechaDesembargo == undefined)) {
        //    swal('Información', 'No a diligenciado los datos de Embargo.', 'info');
        //    return;
        // }
        // if (($scope.registro.tipojurisdiccion == 'L' && $scope.registro.tipoproceso == 'EL'
        //    && ($scope.tempFechaRecEmbargo == undefined || $scope.registro.tempembargo == ''
        //    || $scope.tempFechaDesembargo == undefined))) {
        //    swal('Información', 'No a diligenciado los datos de Embargo.', 'info');
        //    return;
        // }
        // if (($scope.registro.tipojurisdiccion == 'A' && $scope.registro.tipoproceso == 'EC'
        //    && ($scope.tempFechaRecEmbargo == undefined || $scope.registro.tempembargo == ''
        //    || $scope.tempFechaDesembargo == undefined))) {
        //    swal('Información', 'No a diligenciado los datos de Embargo.', 'info');
        //    return;
        // }
        if ($scope.juzgado.seleccion == '' || $scope.juzgado.seleccion == 'SELECCIONAR') {
          swal('Información', 'Debe seleccionar un Juzgado.', 'info');
          return;
        }
        $scope.registro.actividad = actividad;
        $scope.registro.cuantia = $scope.registro.tempcuantia.replace(/[^\d]*/g, '');
        // $scope.registro.valorembargo = $scope.registro.tempembargo.replace(/[^\d]*/g, '');
        // $scope.registro.tempFechaRecEmbargo = $scope.tempFechaRecEmbargo;
        // $scope.registro.tempFechaRecEmbargo = document.getElementById("dteFechaEmbargo").value;
        // $scope.registro.tempFechaDesembargo = $scope.tempFechaDesembargo;
        // $scope.registro.tempFechaDesembargo = document.getElementById("dteFechaDesembargo").value;
        $scope.registro.juzgado = $scope.juzgado.codigo;
        $scope.registro.radicacion = $scope.registro.radicacion + '-' + $scope.registro.anioradicado;
        $scope.registro.cantdemandantes = $scope.demandantes.length;
        $scope.registro.cantdemandados = $scope.demandados.length;
        $scope.registro.jsonapoderado = {
          tipo_documento: $scope.registro.tipoidapoderado,
          documento: $scope.registro.idapoderado,
          nombre: $scope.registro.nombreapoderado,
          telefono: $scope.registro.telefonoapoderado,
          email: $scope.registro.emailapoderado,
          direccion: $scope.registro.direccionapoderado,
          tipo_actor: 'AP'
        }
        $scope.dataRegistrodemandante = JSON.stringify($scope.demandantes);
        $scope.dataRegistrodemandado = JSON.stringify($scope.demandados);
        $scope.dataRegistroapoderado = JSON.stringify($scope.registro.jsonapoderado);
        $scope.registro.jsondemandantes = $scope.dataRegistrodemandante;
        $scope.registro.jsondemandados = $scope.dataRegistrodemandado;
        $scope.registro.jsonapoderado = $scope.dataRegistroapoderado;
        $scope.hdeTablaResultados = true;
        $scope.hdeRegistro = false;
        var dataRegistro = JSON.stringify($scope.registro);
        $http({
          method: 'POST',
          url: "php/juridica/demandas/funcdemandas.php",
          data: {
            function: 'registraDemanda',
            dataRegistro: dataRegistro
          }
        }).then(function (response) {
          if (response.data.codigo == "1") {
            swal('Error', response.data.mensaje, 'error');
          } else {
            swal('Completado', response.data.mensaje, 'success');
            $scope.codigo_demanda_actuacion = response.data.numero_demanda;
            $scope.codigo_demanda_seleccionada = response.data.numero_demanda;
            $scope.hdeActuaciones = false;
            $scope.hdeBtnPanelActuaciones = false;
            $scope.hdeAdjuntarfile = true;
            $scope.hdebtnActualizarDemanda = false;
            $scope.dsbbtnsave = true;
          }
        });
      }

      //ACTUALIZA DEMANDAS
      $scope.ActualizarDemanda = function (actividad) {
        // if ($scope.registro.tipojurisdiccion == 'C' && ($scope.registro.tipoproceso == 'EM'
        //    || $scope.registro.tipoproceso == 'ES') && ($scope.tempFechaRecEmbargo == undefined
        //       || $scope.registro.tempembargo == '' || $scope.tempFechaDesembargo == undefined)) {
        //    swal('Información', 'No a diligenciado los datos de Embargo.', 'info');
        //    return;
        // }
        // if (($scope.registro.tipojurisdiccion == 'L' && $scope.registro.tipoproceso == 'EL'
        //    && ($scope.tempFechaRecEmbargo == undefined || $scope.registro.tempembargo == ''
        //       || $scope.tempFechaDesembargo == undefined))) {
        //    swal('Información', 'No a diligenciado los datos de Embargo.', 'info');
        //    return;
        // }
        // if (($scope.registro.tipojurisdiccion == 'A' && $scope.registro.tipoproceso == 'EC'
        //    && ($scope.tempFechaRecEmbargo == undefined || $scope.registro.tempembargo == ''
        //       || $scope.tempFechaDesembargo == undefined))) {
        //    swal('Información', 'No a diligenciado los datos de Embargo.', 'info');
        //    return;
        // }
        $scope.registro.actividad = actividad;
        $scope.registro.codigo_demanda = $scope.codigo_demanda_actuacion;
        $scope.registro.cuantia = $scope.registro.tempcuantia.replace(/[^\d]*/g, '');
        // $scope.registro.valorembargo = $scope.registro.tempembargo.replace(/[^\d]*/g, '');
        // $scope.registro.tempFechaRecEmbargo = document.getElementById("dteFechaEmbargo").value;
        // $scope.registro.tempFechaRecEmbargo = $scope.tempFechaRecEmbargo;
        // $scope.registro.tempFechaDesembargo = document.getElementById("dteFechaDesembargo").value;
        // $scope.registro.tempFechaDesembargo = $scope.tempFechaDesembargo;
        $scope.registro.juzgado = $scope.juzgado.codigo;
        $scope.registro.radicacion = $scope.registro.radicacion + '-' + $scope.registro.anioradicado;
        $scope.registro.cantdemandantes = $scope.demandantes.length;
        $scope.registro.cantdemandados = $scope.demandados.length;
        $scope.registro.jsonapoderado = {
          tipo_documento: $scope.registro.tipoidapoderado,
          documento: $scope.registro.idapoderado,
          nombre: $scope.registro.nombreapoderado,
          telefono: $scope.registro.telefonoapoderado,
          email: $scope.registro.emailapoderado,
          direccion: $scope.registro.direccionapoderado,
          tipo_actor: 'AP'
        }
        $scope.dataRegistrodemandante = JSON.stringify($scope.demandantes);
        $scope.dataRegistrodemandado = JSON.stringify($scope.demandados);
        $scope.dataRegistroapoderado = JSON.stringify($scope.registro.jsonapoderado);
        $scope.registro.jsondemandantes = $scope.dataRegistrodemandante;
        $scope.registro.jsondemandados = $scope.dataRegistrodemandado;
        $scope.registro.jsonapoderado = $scope.dataRegistroapoderado;
        var dataRegistro = JSON.stringify($scope.registro);
        $http({
          method: 'POST',
          url: "php/juridica/demandas/funcdemandas.php",
          data: {
            function: 'registraDemanda',
            dataRegistro: dataRegistro
          }
        }).then(function (response) {
          if (response.data.codigo == "1") {
            swal('Error', response.data.mensaje, 'error');
            $scope.hdeActuaciones = true;
            $scope.hdeTablaResultados = true;
          } else {
            swal('Completado', response.data.mensaje, 'success');
            $scope.hdeActuaciones = false;
            $scope.hdeTablaResultados = false;
            // $scope.verDemandas();
          }
        });
      }

      //ENVIA ADJUNTOS AL FTP Y REGISTRA ACTUACION
      $scope.registrarActuacion = function (actividad) {
        // if ($scope.archivobase != null && $scope.anio != '' && $scope.tipo != '' && $scope.descripcion != '' && $scope.titulo != ''){
        $scope.actividad = actividad;
        if ($scope.tipoevidencia == 'L') {
          $http({
            method: 'POST',
            url: "php/juridica/demandas/funcdemandas.php",
            data: {
              function: 'registraactuacion',
              accion: $scope.actividad,
              codigo_demanda: $scope.codigo_demanda_actuacion,
              fecha: document.getElementById("dteFechaActuacion").value,
              nombre: $scope.actuaciondemanda,
              descripcion: $scope.descripcionactuacion,
              tipo_archivo: $scope.tipoevidencia,
              url: $scope.urlactuacion,
              ruta: ''
            }
          }).then(function (response) {
            if (response.data.codigo == "1") {
              swal('Error', response.data.mensaje, 'error');
            } else {
              swal('Completado', response.data.mensaje, 'success')
              $scope.hdeBtnPanelActuaciones = false;
              $scope.hdeEvidenciaU = false;
              $scope.limpiarActuacion();
            }
          });
        } else {
          $http({
            method: 'POST',
            url: "php/juridica/demandas/funcdemandas.php",
            data: {
              function: 'guardarAdjuntosDemandas',
              data: $scope.archivobase,
              ext: $scope.extensionarchivo
            }
          }).then(function (response) {
            $scope.dataRuta = response.data;
            $scope.dataRuta = $scope.dataRuta.trim();
            $http({
              method: 'POST',
              url: "php/juridica/demandas/funcdemandas.php",
              data: {
                function: 'registraactuacion',
                accion: $scope.actividad,
                codigo_demanda: $scope.codigo_demanda_actuacion,
                fecha: document.getElementById("dteFechaActuacion").value,
                nombre: $scope.actuaciondemanda,
                descripcion: $scope.descripcionactuacion,
                tipo_archivo: $scope.tipoevidencia,
                url: '',
                ruta: $scope.dataRuta
              }
            }).then(function (response) {
              if (response.data.codigo == "1") {
                swal('Error', response.data.mensaje, 'error');
              } else {
                swal('Completado', response.data.mensaje, 'success')
                $scope.hdeBtnPanelActuaciones = false;
                $scope.hdeEvidencia = true;
                $scope.limpiarActuacion();
              }
            });
          });
        }
      }

      //LIMPIA CAMPOS DE ACTUACION
      $scope.limpiarActuacion = function () {
        $scope.tipoevidencia = "";
        $scope.archivodemanda = "";
        $scope.urlactuacion = "";
        $scope.actuaciondemanda = "";
        $scope.descripcionactuacion = "";
        $scope.fecha_actuacion = "";
        document.getElementById("dteFechaActuacion").value = "";
      }

      //OBTIENE BASE 64 DEL ARCHIVO ADJUNTO
      $scope.obtenerBase = function (idadjunto) {
        // var adjunto = $("#archivodemanda");
        // if ($("#archivodemanda")[0].files[0].size > 20971520) {
        //    $("#archivodemanda")[0].value = '';
        //    $scope.archivobase = "";
        //    $scope.extensionarchivo = "";
        //    $scope.archivodemanda = "";
        //    swal('Error', 'El peso maximo admitido es de 20 MB.', 'info');
        // } else {
        //    var FR = new FileReader();
        //    FR.addEventListener("load", function (e) {
        //       $scope.adjuntodemanda = e.target.result;
        //       var name = document.getElementById('archivodemanda').files[0].name;
        //       $scope.namefileact = name.split('.', 1).pop();
        //       $scope.archivobase = $scope.adjuntodemanda;
        //       $scope.extensionarchivo = name.split('.').pop();
        //    });
        //    FR.readAsDataURL(adjunto[0].files[0]);
        // }
        var adjunto = $("#" + idadjunto);
        // 20971520
        if ($("#" + idadjunto)[0].files[0].size > 15971520) {
          $("#" + idadjunto)[0].value = '';
          $scope.archivobase = "";
          $scope.extensionarchivo = "";
          $scope[idadjunto] = "";
          swal('Error', 'El peso maximo admitido es de 15 MB.', 'info');
        } else {
          var FR = new FileReader();
          FR.addEventListener("load", function (e) {
            // $scope.adjuntodemanda = e.target.result;
            var name = document.getElementById(idadjunto).files[0].name;
            $scope.namefileact = name.split('.', 1).pop();
            $scope.archivobase = e.target.result;
            $scope.extensionarchivo = name.split('.').pop();
          });
          FR.readAsDataURL(adjunto[0].files[0]);
          // console.log($scope.archivobase);
        }
      }

      //SUBE ADJUNTO
      $scope.subiradjunto = function () {
        $http({
          method: 'POST',
          url: "php/juridica/demandas/funcdemandas.php",
          data: {
            function: 'guardarAdjuntosDemandas',
            data: $scope.archivobase,
            ext: $scope.extensionarchivo
          }
        }).then(function (response) {
          $scope.dataRuta = response.data;
          $scope.dataRuta = $scope.dataRuta.trim();
        });
      }

      //EJECUTA MODAL JUZGADOS
      $scope.modalJuzgados = function () {
        $scope.dialogJuz = ngDialog.open({
          template: 'views/juridica/modal/modalJuzgados.html',
          className: 'ngdialog-theme-plain',
          controller: 'modalJuzgadosctrl',
          scope: $scope
        });
        $scope.dialogJuz.closePromise.then(function (data) {
          if (data.value != "$document") {
            $scope.juzgado = {
              codigo: data.value.codigo,
              ubicacion: data.valueubicacion,
              nombre: data.value.nombre
            }
            $scope.nomJuzgado();
          }
        });
      }

      //CAPTURA EL NOMBRE DEL JUZGADO
      $scope.nomJuzgado = function () {
        if ($scope.juzgado.codigo === undefined || $scope.juzgado.codigo == "") {
          $scope.juzgado.seleccion = "SELECCIONAR";
        } else {
          $scope.juzgado.seleccion = $scope.juzgado.codigo + ' - ' + $scope.juzgado.nombre
        }
      }

      //MUESTRA MODAL DE ACTUACIONES POR DEMANDA SELECCIONADA
      $scope.openPanelActuaciones = function () {
        ngDialog.open({
          template: 'views/juridica/demandas/modal/modalPanelActuaciones.html',
          className: 'ngdialog-theme-plain',
          controller: 'panelactuacionesctrl',
          codigo_demanda: $scope.codigo_demanda_seleccionada,
          scope: $scope
        });
      }

      //ABRE IMPRIMIR DEMANDA
      $scope.ImprimirInforme = function () {
        window.open('views/juridica/demandas/modal/informedemanda.php?codigo_demanda=' + $scope.codigo_demanda_seleccionada, '_blank', "width=1080,height=1100");
      }

      $scope.abrirModal = function (modal) {
        switch (modal) {
          case '1':
            (function () {
              $('#modalEstadoTutela').modal();
            }());
            $('#modalEstadoTutela').modal('open');
            $scope.registro.estadoTutelaModal = true;
            break;
          case '2':
            (function () {
              $('#modalBitacora').modal();
            }());
            $('#modalBitacora').modal('open');
            setTimeout(() => {
              $('.tabs').tabs();
              document.querySelector("#tab_1").focus();
              $('#tab_1').click();
            }, 500);
            break;
          case '3':
            (function () {
              $('#modalMedidaCautelar').modal();
            }());
            $('#modalMedidaCautelar').modal('open');
            // $scope.cargaInfoMedidaCautelar();
            setTimeout(() => {
              $('.tabs').tabs();
              document.querySelector("#tab_3").focus();
              $('#tab_3').click();
            }, 500);
            break;
          default:
            break;
        }
      };

      $scope.cerrarModal = function (valor) {
        switch (valor) {
          case '1':
            $('#modalEstadoTutela').modal('close');
            break;
          case '2':
            $('#modalMedidaCautelar').modal('close');
            break;
          case '3':
            $('#modalBitacora').modal('close');
            break;
          default:
            break;
        }
      };

      $scope.tabs = {
        select: 1
      };
      $scope.seleccionar = function (tab_numer) {
        $scope.tabs.select = tab_numer;
        switch (tab_numer) {
          case 1:
            setTimeout(() => {
              document.querySelector("#registrar_estado").focus();
            }, 100);
            break;
          case 2:
            setTimeout(() => {
              document.querySelector("#ver_bitacora").focus();
              $scope.listaBitacora($scope.codigo_demanda_actuacion);
            }, 100);
            break;
          case 3:
            setTimeout(() => {
              document.querySelector("#registrar_medida").focus();
            }, 100);
            break;
          case 4:
            setTimeout(() => {
              document.querySelector("#ver_bitacora_medida").focus();
              $scope.listaBitacoraMedida($scope.codigo_demanda_actuacion);
            }, 100);
            break;
        }
      }

      $scope.registrarEstadoDemanda = function () {
        $http({
          method: 'POST',
          url: "php/juridica/demandas/funcdemandas.php",
          data: {
            function: 'registrarEstado',
            estado: $scope.estadoActual,
            codigo_demanda: $scope.codigo_demanda_actuacion,
          }
        }).then(function (response) {
          if (response.data.codigo == "1") {
            swal('Error', response.data.mensaje, 'error');
          } else {
            swal('Completado', response.data.mensaje, 'success');
            $scope.hdeBtnPanelActuaciones = false;
            $scope.hdeEvidenciaU = false;
            $scope.limpiarActuacion();
          }
        });
      }

      $scope.listaBitacora = function (codigo_demanda) {
        $http({
          method: 'POST',
          url: "php/juridica/demandas/funcdemandas.php",
          data: {
            function: 'listaBitacora',
            codigo_demanda: codigo_demanda
          }
        }).then(function (response) {
          $scope.bitacora = response.data;
          if ($scope.bitacora.length == 0) {
            $scope.msjTableBitacora = false;
          } else {
            $scope.msjTableBitacora = true;
          }
        });
      }

      $scope.listaBitacoraMedida = function (codigo_demanda) {
        $http({
          method: 'POST',
          url: "php/juridica/demandas/funcdemandas.php",
          data: {
            function: 'listaBitacoraMedida',
            codigo_demanda: codigo_demanda
          }
        }).then(function (response) {
          $scope.bitacoraMedida = response.data;
          if ($scope.bitacoraMedida.length == 0) {
            $scope.msjTableBitacoraMedida = false;
          } else {
            $scope.msjTableBitacoraMedida = true;
          }
        });
      }

      $scope.detalle_bitacora_medida = function (data) {
        $scope.tipos_medidas = '';
        for (let i = 0; i < data.length; i++) {
          $scope.tipos_medidas = $scope.tipos_medidas + '<tr> <td class="center-align">' + (i + 1) + '</td> <td>' + data[i].nombre + '</td> </tr>';
        }

        swal({
          html: `<table id="tablaBitacoraMedidatest" class="striped table-bordered white" style="position: relative;">
                  <thead>
                     <tr class="default-background white-text">
                        <th class="border-none center-align">#</th>
                        <th class="border-none center-align" data-field="Date">Tipo de Medida</th>
                     </tr>
                  </thead>
                  <tbody>`+ $scope.tipos_medidas + `
                  </tbody>
                  </table>`,
          width: 600
        });
      }

      $scope.listaEstados = function () {
        $http({
          method: 'POST',
          url: "php/juridica/demandas/funcdemandas.php",
          data: {
            function: 'listaEstados'
          }
        }).then(function (response) {
          $scope.estados = response.data;
        });
      }
      $scope.listaEstados();

      $scope.listaMedidasCautelar = function () {
        $http({
          method: 'POST',
          url: "php/juridica/demandas/funcdemandas.php",
          data: {
            function: 'listaMedidasCautelar'
          }
        }).then(function (response) {
          $scope.medidasCautelares = [];
          response.data.forEach(e => {
            $scope.medidasCautelares.push({ codigo: e.codigo, nombre: e.nombre, checked: false });
          });
          setTimeout(() => {
            $scope.$apply();
          }, 500);
        });
      }
      $scope.listaMedidasCautelar();

      $scope.checkedTiposMedidas = function (index) {
        $scope.medidasCautelares[index].checked = !$scope.medidasCautelares[index].checked;
        setTimeout(() => {
          //console.table($scope.medidasCautelares);
          $scope.$apply();
        }, 500);
      }

      $scope.registrarMedidaCautelar = function (param) {
        var arrmedidasCautelares = [];
        for (let i = 0; i < $scope.medidasCautelares.length; i++) {
          if ($scope.medidasCautelares[i].checked == true) {
            arrmedidasCautelares.push({ codigo: $scope.medidasCautelares[i].codigo, nombre: $scope.medidasCautelares[i].nombre })
          }
        }
        if (arrmedidasCautelares.length == 0 || ($scope.tempMontoMedidaCautelar == null || $scope.tempMontoMedidaCautelar == "")
          || ($scope.estadoMedidaCautelar == null || $scope.estadoMedidaCautelar == "")
          || ($scope.descripcionMedidaCautelar == null || $scope.descripcionMedidaCautelar == "")
          || (document.getElementById("archivoMedidaCautelar").files.length == 0)) {
          swal('Información', 'Por favor digite los campos obligatorios.', 'info');
        } else {
          var dataRegistroMedidas = JSON.stringify(arrmedidasCautelares);
          $scope.montoMedidaCautelar = $scope.tempMontoMedidaCautelar.replace(/[^\d]*/g, '');
          $scope.cantMedidas = arrmedidasCautelares.length;
          if (param == 'I') {
            var Cargar_Soporte = [
              $scope.Cargar_Soporte_FTP()
            ];
            $q.all(Cargar_Soporte).then(function (Result_Sop) {
              // debugger
              var Archivos_Error = false;
              for (var x = 0; x < Result_Sop.length; x++) {
                // console.log(Result_Sop[x]);
                if (Result_Sop[x].substr(0, 3) == '<br' || Result_Sop[x].substr(0, 1) == '0' || (Result_Sop[x] == '' && $scope.archivobase != '')) {
                  Archivos_Error = true;
                  swal({
                    title: '¡Error al subir un archivo!',
                    text: 'Nota: Si el error persiste, por favor actualizar la página (CONTROL + F5).',
                    type: 'warning'
                  }).catch(swal.noop);
                }
              }
              /**/
              if (Archivos_Error == false) {
                //codigo
                $http({
                  method: 'POST',
                  url: "php/juridica/demandas/funcdemandas.php",
                  data: {
                    function: 'registraMedidaCautelar',
                    codigo_demanda: $scope.codigo_demanda_actuacion,
                    medida: dataRegistroMedidas,
                    monto: $scope.montoMedidaCautelar,
                    cantidad: $scope.cantMedidas,
                    estado: $scope.estadoMedidaCautelar,
                    descripcion: $scope.descripcionMedidaCautelar,
                    ruta: $scope.dataRuta,
                    responsable: $scope.cedulalog
                  }
                }).then(function (response) {
                  if (response.data.codigo == "1") {
                    swal('Error', response.data.mensaje, 'error');
                  } else {
                    swal('Completado', response.data.mensaje, 'success');
                    $scope.cerrarModal('2');
                    $scope.limpiarMedidaCautelar();
                  }
                });

              }
            })
            // $http({
            //    method: 'POST',
            //    url: "php/juridica/demandas/funcdemandas.php",
            //    data: {
            //       function: 'guardarAdjuntosDemandas',
            //       data: $scope.archivobase,
            //       ext: $scope.extensionarchivo
            //    }
            // }).then(function (response) {
            //    $scope.dataRutaMedida = response.data;
            //    $scope.dataRutaMedida = $scope.dataRutaMedida.trim();
            //    if ($scope.dataRutaMedida.substring(0,12) == '/cargue_ftp/') {

            //    }else{
            //       swal('Error', 'Error al cargar el archivo.', 'error');
            //    }
            // });
          } else {
            $http({
              method: 'POST',
              url: "php/juridica/demandas/funcdemandas.php",
              data: {
                function: 'registraMedidaCautelar',
                codigo_demanda: $scope.codigo_demanda_actuacion,
                medida: '',
                monto: '',
                cantidad: '',
                estado: $scope.estadoMedidaCautelar,
                descripcion: $scope.descripcionMedidaCautelar,
                ruta: '',
                responsable: $scope.cedulalog
              }
            }).then(function (response) {
              if (response.data.codigo == "1") {
                swal('Error', response.data.mensaje, 'error');
              } else {
                swal('Completado', response.data.mensaje, 'success');
              }
            });
          }
        }
      }

      //LIMPIA CAMPOS DE MEDIDA CAUTELAR
      $scope.limpiarMedidaCautelar = function () {
        $scope.medidasCautelares.forEach(e => {
          e.checked = false;
        });
        $scope.tempMontoMedidaCautelar = "";
        $scope.estadoMedidaCautelar = "";
        $scope.archivoMedidaCautelar = "";
        $scope.descripcionMedidaCautelar = "";
      }

      $scope.cargaInfoMedidaCautelar = function () {
        $http({
          method: 'POST',
          url: "php/juridica/demandas/funcdemandas.php",
          data: {
            function: 'listaDetalleMedidaCautelar',
            codigo_demanda: $scope.codigo_demanda_actuacion,
          }
        }).then(function (response) {
          $scope.detalleMedidaCautelar = response.data;
          if ($scope.detalleMedidaCautelar.length > 0) {
            $scope.tempMontoMedidaCautelar = $scope.detalleMedidaCautelar[0].monto;
            $scope.estadoMedidaCautelar = $scope.detalleMedidaCautelar[0].estado_medida;
            $scope.descripcionMedidaCautelar = $scope.detalleMedidaCautelar[0].descripcion;
            for (let j = 0; j < $scope.detalleMedidaCautelar[0].medida_json.length; j++) {
              var b = $scope.detalleMedidaCautelar[0].medida_json[j].codigo;
              for (let i = 0; i < $scope.medidasCautelares.length; i++) {
                var codigo_tipo_medida = $scope.medidasCautelares[i].codigo;
                if (codigo_tipo_medida == b) {
                  $scope.medidasCautelares[i].checked = true;
                }
              }
            }
          } else {
            $scope.limpiarMedidaCautelar();
          }
          // console.table($scope.medidasCautelares);
        });
      }

      $scope.descargafile = function (ruta, caso, tipo) {
        // console.log(ruta);
        $http({
          method: 'POST',
          url: "php/juridica/demandas/funcdemandas.php",
          data: {
            function: 'descargaAdjunto',
            ruta: ruta
          }
        }).then(function (response) {
          window.open("temp/" +  response.data.trim());

          console.log(response.data);
        });
      }

      //  $scope.descargafile = function (ruta, caso, tipo) {
      //     switch (caso) {
      //        case 1:
      //           $http({
      //              method: 'POST',
      //              url: "php/juridica/tutelas/functutelas.php",
      //              data: {
      //                 function: tipo == 'FTP1' ? 'descargaAdjunto' : 'descargaAdjuntoftp3',
      //                 ruta: ruta
      //              }
      //           }).then(function (response) {
      //              //window.open("https://www.cajacopieps.com/genesis/temp/"+response.data);
      //              window.open("temp/" + response.data);
      //           });
      //        break;
      //        case 2:
      //           window.open(ruta);
      //        break;
      //        default:
      //        break;
      //     }
      //  }

      $scope.Cargar_Soporte_FTP = function () {
        var defered = $q.defer();
        var promise = defered.promise;
        $scope.dataRuta = "";
        // debugger
        if ($scope.archivobase != '' && $scope.archivobase != undefined && $scope.archivobase.length > 0) {
          $http({
            method: 'POST',
            url: "php/juridica/demandas/funcdemandas.php",
            data: {
              function: 'guardarAdjuntosDemandas',
              data: $scope.archivobase,
              ext: $scope.extensionarchivo
            }
          }).then(function (response) {
            $scope.dataRuta = response.data;
            $scope.dataRuta = $scope.dataRuta.trim();
            defered.resolve(response.data.trim());
          });
        } else {
          defered.resolve('xxx');
        }
        return promise;
      }
    }
  ]);
