'use strict';
angular.module('GenesisApp')
   .controller('demandasController', ['$scope', '$http', 'consultaHTTP', '$filter', 'ngDialog', 'cfpLoadingBar', '$timeout',
      function ($scope, $http, consultaHTTP, $filter, ngDialog, cfpLoadingBar, $timeout) {
         $(document).ready(function () {
            $('.buttons-html5').addClass('default-background');
         });

         //FORMATEA TEXTO CUANTIA, VALEMBARGO A MONEDA
         $scope.formatcurrency = function (variable) {
            switch (variable) {
               case 1:
                  $scope.registro.tempcuantia = numeral($scope.registro.tempcuantia).format('$ 0,0[.]0');
                  break;
               case 2:
                  $scope.registro.tempembargo = numeral($scope.registro.tempembargo).format('$ 0,0[.]0');
                  break;
               case 3:
                  if ($scope.registro.probabilidad > 100) {
                     $scope.registro.probabilidad = "";
                  }
                  $scope.word = /[0-9]+/;
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
         $scope.registro = { anioradicado: 2019, radicacion: 0, tipoidapoderado: 'CC'};
         $scope.demandados = [];
         $scope.demandantes = [];
         $scope.apdemandantes = [];
         $scope.hdeBtnAddEditDdo = true;
         $scope.hdeBtnAddEditDdte = true;
         $scope.hdereprelegal = true;
         $scope.hdeTableAddDem = true;
         $scope.hdeTableAddDemte=true;
         $scope.hdeEvidencia = true;
         $scope.hdeEvidenciaU = false;
         $scope.idupdatedemdo = 0;
         $scope.idupdatedemte = 0;
         $scope.dsbDataDemandante=true;
         $scope.hdeBtnPanelActuaciones = true;
         $scope.hdebtnActualizarDemanda = true;
         $scope.dsbbtnsave = false;
         $scope.hdebtnblockform = true;

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
         $scope.validaEmbargo = function () {
            if ($scope.registro.tipojurisdiccion == 'C' && ($scope.registro.tipoproceso == 'EM' || $scope.registro.tipoproceso == 'ES')) {
               $scope.hdeEmbargos = false;
            } else if ($scope.registro.tipojurisdiccion == 'L' && $scope.registro.tipoproceso == 'EL') {
               $scope.hdeEmbargos = false;
            } else if ($scope.registro.tipojurisdiccion == 'A' && $scope.registro.tipoproceso == 'EC') {
               $scope.hdeEmbargos = false;
            } else {
               $scope.hdeEmbargos = true;
               $scope.tempFechaRecEmbargo="";
               document.getElementById("dteFechaEmbargo").value = "";
               $scope.registro.tempembargo="";
               $scope.tempFechaDesembargo="";
               document.getElementById("dteFechaDesembargo").value = "";
            }
         }

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
            buttons: [{ extend: 'copy', text: 'Copiar' }, 'csv', 'excel'],
            searching: true,
            ajax: {
               //url: 'json/demandas.json',
               url: 'php/juridica/demandas/listdemandas.php',
               dataSrc: ''
            },
            columns: [
               { data: "codigo_demanda" },
               { data: "radicacion" },
               { data: "nombre_departamento" },
               { data: "nombre_ubicacion" },
               { data: "tipojurisdiccion_nombre" },
               { data: "tipoproceso_nombre" },
               { data: "cuantia" },
               { data: "estado" }
            ],
            language: {
               "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
            },
            lengthMenu: [[10, 30, 50, -1], [10, 30, 50, 'Todas']],
            order: [[1, "asc"]]
         });

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
            if ($scope.countbtn != 0) {
               var arrayDemandado = {
                  tipo_documento: 'NI',
                  documento: '890.02.044',
                  nombre: 'Caja de Compensación Familiar Cajacopi',
                  tipo_actor: 'D2'
               };
               $scope.demandados.push(arrayDemandado);
            } else {
               return;
            }
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

         $scope.limpiar = function(){
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
            $scope.tipoiddemandado = "";
            $scope.iddemandado = "";
            $scope.nombredemandado = "";
            $scope.demandados = [];
            $scope.hdeTableAddDem = true;
            $scope.hdeEmbargos = true;
            $scope.tempFechaRecEmbargo = "";
            $scope.tempFechaDesembargo = "";
            document.getElementById("dteFechaEmbargo").value = "";
            document.getElementById("dteFechaDesembargo").value = "";
            if ($scope.countbtn != 0) {
               var arrayDemandado = {
                  tipo_documento: 'NI',
                  documento: '890.02.044',
                  nombre: 'Caja de Compensación Familiar Cajacopi',
                  tipo_actor: 'D2'
               };
               $scope.demandados.push(arrayDemandado);
               $scope.hdeTableAddDem = false;
            } else {
               return;
            }
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
         
         $scope.carga_info_demanda = function (codigo_demanda, cod_jurisdiccion, cod_departamento){
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
               $scope.validaEmbargo();
               $scope.tempFechaRecEmbargo = $scope.registro.tempFechaRecEmbargo;
               document.getElementById("dteFechaEmbargo").value = $scope.registro.tempFechaRecEmbargo;
               $scope.tempFechaDesembargo = $scope.registro.tempFechaDesembargo;
               document.getElementById("dteFechaDesembargo").value = $scope.registro.tempFechaDesembargo;
               $scope.demandantes = $scope.registro.demandantes;
               $scope.hdeTableAddDemte = false;
               if ($scope.registro.apoderado.length < 1) {
                  $scope.registro.tipoidapoderado = "CC";
                  $scope.registro.idapoderado = "";
                  $scope.registro.nombreapoderado = "";
                  $scope.registro.telefonoapoderado = "";
                  $scope.registro.emailapoderado = "";
                  $scope.registro.direccionapoderado = "";
               }else{
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
                  seleccion : $scope.registro.juzgado + ' - ' + $scope.registro.juzc_nombre,
                  codigo: $scope.registro.juzgado
               }
               setTimeout(() => {
                  swal.close();
               }, 100);
            });
         }

         //BUSCA DEMANDANTES EN BD
         $scope.BuscarDemandante = function () {
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
               }
            });
         }

         //AÑADE NUEVOS DEMANDANTES
         $scope.addNuevoDemandante = function () {
            if ($scope.iddemandante == "" || $scope.nombredemandante == "" || $scope.telefonodemandante == "" || $scope.emaildemandante == "" || $scope.direcciondemandante == "") {
               swal({
                  title: 'Importante!',
                  text: 'No ha añadido correctamente los datos del demandante.',
                  type: 'info',
                  confirmButtonText: 'Cerrar',
                  confirmButtonColor: '#174791'
               });
            } else if ($scope.tipodemandante == 'J' && ($scope.reprelegaldemandante == "" || $scope.reprelegaldemandante == null || $scope.reprelegaldemandante == undefined)){
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
               $scope.hdereprelegal=true;
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
               $scope.iddemandante='';
               $scope.nombredemandante='';
               $scope.telefonodemandante='';
               $scope.emaildemandante='';
               $scope.reprelegaldemandante = '';
               $scope.direcciondemandante='';
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
            }else{
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
            }else{
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
               $scope.hdereprelegal= true;
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

         //AÑADE NUEVOS DEMANDADOS
         $scope.addNuevoDemandado = function () {
            if ($scope.iddemandado == "" || $scope.nombredemandado == "" || $scope.iddemandado == null || $scope.nombredemandado == null) {
               swal({
                  title: 'Importante!',
                  text: 'No ha añadido correctamente los datos del demandado.',
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
               var arrayDemandado = {
                  tipo_documento: $scope.tipoiddemandado,
                  documento: $scope.iddemandado,
                  nombre: $scope.nombredemandado,
                  tipo_actor: 'D2'
               }
               $scope.demandados.push(arrayDemandado);
               $scope.hdeTableAddDem = false;
               $scope.iddemandado = '';
               $scope.nombredemandado = '';
               $scope.tipoiddemandado = '';
               swal({
                  title: 'Confirmado!',
                  text: 'Demandado agregado correctamente.',
                  type: 'success',
                  confirmButtonText: 'Cerrar',
                  confirmButtonColor: '#174791'
               });
            }
            setTimeout(() => {
               swal.close();
            }, 5000);
         }

         //PERMITE MODIFICAR DEMANDADOS
         $scope.editDemandado = function (tipodocumento, documento, nombre) {
            $scope.hdeBtnAddEditDdo = false;
            $scope.tipoiddemandado = tipodocumento;
            $scope.iddemandado = documento;
            $scope.nombredemandado = nombre;
            $scope.idupdatedemdo = documento;
         }

         //ELIMINA DEMANDADOS
         $scope.eliminarDemandado = function (index) {
            $scope.demandados.splice(index, 1);
            if ($scope.demandados.length == 0) {
               $scope.hdeTableAddDem = true;
               $scope.tipoiddemandado="";
               $scope.iddemandado="";
               $scope.nombredemandado="";
               $scope.hdeBtnAddEditDdo=true;
               swal({
                  title: 'Confirmado!',
                  text: 'Demandante eliminado correctamente.',
                  type: 'success',
                  confirmButtonText: 'Cerrar',
                  confirmButtonColor: '#174791'
               });
            }else{
               $scope.iddemandado = '';
               $scope.nombredemandado = '';
               $scope.tipoiddemandado = '';
               $scope.hdeBtnAddEditDdo = true;
               swal({
                  title: 'Confirmado!',
                  text: 'Demandante eliminado correctamente.',
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
            $scope.tipoiddemandado="";
            $scope.iddemandado="";
            $scope.nombredemandado="";
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
            if ($scope.registro.tipojurisdiccion == 'C' && ($scope.registro.tipoproceso == 'EM' 
               || $scope.registro.tipoproceso == 'ES') && ($scope.tempFechaRecEmbargo == undefined 
               || $scope.registro.tempembargo == '' || $scope.tempFechaDesembargo == undefined)) {
               swal('Información', 'No a diligenciado los datos de Embargo.', 'info');
               return;
            } 
            if (($scope.registro.tipojurisdiccion == 'L' && $scope.registro.tipoproceso == 'EL' 
               && ($scope.tempFechaRecEmbargo == undefined || $scope.registro.tempembargo == '' 
               || $scope.tempFechaDesembargo == undefined))) {
               swal('Información', 'No a diligenciado los datos de Embargo.', 'info');
               return;
            } 
            if (($scope.registro.tipojurisdiccion == 'A' && $scope.registro.tipoproceso == 'EC'
               && ($scope.tempFechaRecEmbargo == undefined || $scope.registro.tempembargo == ''
               || $scope.tempFechaDesembargo == undefined))) {
               swal('Información', 'No a diligenciado los datos de Embargo.', 'info');
               return;
            }
            if ($scope.juzgado.seleccion == '' || $scope.juzgado.seleccion == 'SELECCIONAR') {
               swal('Información', 'Debe seleccionar un Juzgado.', 'info');
               return;
            }
            $scope.registro.actividad = actividad;
            $scope.registro.cuantia = $scope.registro.tempcuantia.replace(/[^\d]*/g, '');
            $scope.registro.valorembargo = $scope.registro.tempembargo.replace(/[^\d]*/g, '');
            $scope.registro.tempFechaRecEmbargo = $scope.tempFechaRecEmbargo;
            $scope.registro.tempFechaRecEmbargo = document.getElementById("dteFechaEmbargo").value;
            $scope.registro.tempFechaDesembargo = $scope.tempFechaDesembargo;
            $scope.registro.tempFechaDesembargo = document.getElementById("dteFechaDesembargo").value;
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
               }else{
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
            if ($scope.registro.tipojurisdiccion == 'C' && ($scope.registro.tipoproceso == 'EM'
               || $scope.registro.tipoproceso == 'ES') && ($scope.tempFechaRecEmbargo == undefined
                  || $scope.registro.tempembargo == '' || $scope.tempFechaDesembargo == undefined)) {
               swal('Información', 'No a diligenciado los datos de Embargo.', 'info');
               return;
            }
            if (($scope.registro.tipojurisdiccion == 'L' && $scope.registro.tipoproceso == 'EL'
               && ($scope.tempFechaRecEmbargo == undefined || $scope.registro.tempembargo == ''
                  || $scope.tempFechaDesembargo == undefined))) {
               swal('Información', 'No a diligenciado los datos de Embargo.', 'info');    
               return;
            }
            if (($scope.registro.tipojurisdiccion == 'A' && $scope.registro.tipoproceso == 'EC'
               && ($scope.tempFechaRecEmbargo == undefined || $scope.registro.tempembargo == ''
                  || $scope.tempFechaDesembargo == undefined))) {
               swal('Información', 'No a diligenciado los datos de Embargo.', 'info');     
               return;
            } 
            $scope.registro.actividad = actividad;
            $scope.registro.codigo_demanda = $scope.codigo_demanda_actuacion;
            $scope.registro.cuantia = $scope.registro.tempcuantia.replace(/[^\d]*/g, '');
            $scope.registro.valorembargo = $scope.registro.tempembargo.replace(/[^\d]*/g, '');
            $scope.registro.tempFechaRecEmbargo = document.getElementById("dteFechaEmbargo").value;
            // $scope.registro.tempFechaRecEmbargo = $scope.tempFechaRecEmbargo;
            $scope.registro.tempFechaDesembargo = document.getElementById("dteFechaDesembargo").value;
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
            }else{
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
         $scope.limpiarActuacion = function(){
            $scope.tipoevidencia = "";
            $scope.archivodemanda = "";
            $scope.urlactuacion = "";
            $scope.actuaciondemanda = "";
            $scope.descripcionactuacion = "";
            $scope.fecha_actuacion = "";
            document.getElementById("dteFechaActuacion").value = "";
         }

         //OBTIENE BASE 64 DEL ARCHIVO ADJUNTO
         $scope.obtenerBase = function () {
            var adjunto = $("#archivodemanda");
            if ($("#archivodemanda")[0].files[0].size > 20971520) {
               $("#archivodemanda")[0].value = '';
               $scope.archivobase = "";
               $scope.extensionarchivo = "";
               $scope.archivodemanda = "";
               swal('Error', 'El peso maximo admitido es de 20 MB.', 'info');
            } else {
               var FR = new FileReader();
               FR.addEventListener("load", function (e) {
                  $scope.adjuntodemanda = e.target.result;
                  var name = document.getElementById('archivodemanda').files[0].name;
                  $scope.namefileact = name.split('.', 1).pop();
                  $scope.archivobase = $scope.adjuntodemanda;
                  $scope.extensionarchivo = name.split('.').pop();
               });
               FR.readAsDataURL(adjunto[0].files[0]);
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
      }
   ]);