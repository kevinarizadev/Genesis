'use strict';
angular.module('GenesisApp')
   .controller('reportefinanciera', ['$scope', 'consultaHTTP', 'notification', 'cfpLoadingBar', '$http', '$window', '$filter',
      function ($scope, consultaHTTP, notification, cfpLoadingBar, $http, $window, $filter) {
         $scope.regimen = 'X';
         $scope.inactive2 = true;
         $scope.tiporeporte = 0;
         $scope.departamento = '0';
         $scope.municipio = '0';
         $scope.tipo_cuenta = '0';
         $scope.tipo_homologacion = '0';
         $scope.documento = '0';
         $scope.numero = '0';
         $scope.ubicacion = '0';
         $scope.ciclo_trimestral = "TRIMESTRAL";


         var dat = { prov: 'navb' }
         $.getJSON("php/obtenersession.php", dat)
            .done(function (respuesta) {
               $scope.sesdata = respuesta;
               $scope.rolcod = $scope.sesdata.rolcod;
               $scope.obtenerreporte();
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
               console.log("navbar error obteniendo variables");
            });

         $scope.obtenerreporte = function () {
            $http({
               method: 'POST',
               url: "php/informes/obtenerreportes.php",
               data: { function: 'obtenerreportes', v_prol: $scope.rolcod }
            }).then(function (response) {
               $scope.Reportes = response.data;
            })
         }

         $(document).ready(function () {
            $scope.responsable = sessionStorage.getItem('cedula')
            console.log($scope.responsable)
            $scope.obtener_token();
            $scope.obtener_token01();
            $scope.obtener_token03();
            $scope.obtener_correo();


         });
         $scope.obtener_token = function () {
            $http({
               method: 'POST',
               url: "php/financiera/reportes/funcreportes.php",
               data: {
                  function: 'obtener_token'

               }
            }).then(function (response) {

               $scope.respuestat = response.data;

            });
         }

                  $scope.obtener_token01 = function () {
            $http({
               method: 'POST',
               url: "php/financiera/reportes/funcreportes.php",
               data: {
                  function: 'obtener_token01'

               }
            }).then(function (response) {

               $scope.respuestat = response.data;

            });
         }

         $scope.obtener_token03 = function () {
            $http({
               method: 'POST',
               url: "php/financiera/reportes/funcreportes.php",
               data: {
                  function: 'obtener_token03'

               }
            }).then(function (response) {

               $scope.respuestat = response.data;

            });
         }

         $scope.obtener_correo = function () {
            $http({
               method: 'POST',
               url: "php/financiera/reportes/funcreportes.php",
               data: {
                  function: 'obtener_correo', codigoc: $scope.responsable

               }
            }).then(function (response) {
               $scope.correo = response.data.Correo;
               $scope.respuestac = response.data;


            });
         }




         $scope.enviar_goanywhere = function () {
            var Encontrar_Vacios1 = false;

            if ($scope.regimen == null || $scope.regimen == '' || $scope.regimen == undefined) { Encontrar_Vacios1 = true; }
            if ($scope.anno == null || $scope.anno == '' || $scope.anno == undefined) { Encontrar_Vacios1 = true; }
            if ($scope.periodo == null || $scope.periodo == '' || $scope.periodo == undefined) { Encontrar_Vacios1 = true; }
            if ($scope.ciclo == null || $scope.ciclo == '' || $scope.ciclo == undefined) { Encontrar_Vacios1 = true; }
            if ($scope.tercero == null || $scope.tercero == '' || $scope.tercero == undefined) { Encontrar_Vacios1 = true; }
            if (Encontrar_Vacios1 == true) {
               swal('Notificacion', 'Completar todos los campos', 'info');
               return;
            }

            swal({
               html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
               width: 200,
               allowOutsideClick: false,
               allowEscapeKey: false,
               showConfirmButton: false,
               animation: false
            });

            var datosg = {
               "regimen": $scope.regimen,
               "anno": $scope.anno,
               "mes": $scope.periodo,
               "ciclo": $scope.ciclo,
               "nit": $scope.tercero,
               "correo": $scope.correo

            }

            $http({
               method: 'POST',
               url: "php/financiera/reportes/funcreportes.php",
               data: {
                  function: 'enviar_goanywhere', datos: (datosg)

               }
            }).then(function (response) {
               // swal.close();
               swal('Importante', 'Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo', 'info');

               $scope.respuestata = response.data;

            });
         }


         $scope.enviar_anexo1 = function () {
            var Encontrar_Vacios1 = false;

            if ($scope.regimen == null || $scope.regimen == '' || $scope.regimen == undefined) { Encontrar_Vacios1 = true; }            
            if ($scope.anno == null || $scope.anno == '' || $scope.anno == undefined) { Encontrar_Vacios1 = true; }
            if ($scope.trimestre == null || $scope.trimestre == '' || $scope.trimestre == undefined) { Encontrar_Vacios1 = true; }
            if ($scope.ciclo == null || $scope.ciclo == '' || $scope.ciclo == undefined) { Encontrar_Vacios1 = true; }
            if ($scope.tercero == null || $scope.tercero == '' || $scope.tercero == undefined) { Encontrar_Vacios1 = true; }
            if (Encontrar_Vacios1 == true) {
               swal('Notificacion', 'Completar todos los campos', 'info');
               return;
            }

            swal({
               html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
               width: 200,
               allowOutsideClick: false,
               allowEscapeKey: false,
               showConfirmButton: false,
               animation: false
            });

            var datosa1 = {
               "regimen": $scope.regimen,               
               "anno": $scope.anno,
               "mes": $scope.trimestre,
               "ciclo": 'T',
               "nit": $scope.tercero,
               "tipo": '1',
               "correo": $scope.correo
            }

            $http({
               method: 'POST',
               url: "php/financiera/reportes/funcreportes.php",
               data: {
                  function: 'enviar_anexo1', datos: (datosa1)

               }
            }).then(function (response) {
               // swal.close();
               swal('Importante', 'Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo', 'info');

               $scope.respuestata = response.data;

            });
         }



         $scope.enviar_anexo3 = function () {
            var Encontrar_Vacios3 = false;

                       
            if ($scope.anno == null || $scope.anno == '' || $scope.anno == undefined) { Encontrar_Vacios3 = true; }
            if ($scope.periodo == null || $scope.periodo == '' || $scope.periodo == undefined) { Encontrar_Vacios3 = true; }
            if ($scope.ciclo == null || $scope.ciclo == '' || $scope.ciclo == undefined) { Encontrar_Vacios3 = true; }
            if ($scope.tercero == null || $scope.tercero == '' || $scope.tercero == undefined) { Encontrar_Vacios3 = true; }
            if (Encontrar_Vacios3 == true) {
               swal('Notificacion', 'Completar todos los campos', 'info');
               return;
            }

            swal({
               html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
               width: 200,
               allowOutsideClick: false,
               allowEscapeKey: false,
               showConfirmButton: false,
               animation: false
            });

            var datosa1 = {
                             
               "anno": $scope.anno,
               "mes": $scope.periodo,
               "ciclo": $scope.ciclo,
               "nit": $scope.tercero,
               "tipo": '3',
               "correo": $scope.correo
            }

            $http({
               method: 'POST',
               url: "php/financiera/reportes/funcreportes.php",
               data: {
                  function: 'enviar_anexo3', datos: (datosa1)

               }
            }).then(function (response) {
               // swal.close();
               swal('Importante', 'Generando reporte en segundo plano, cuando termine de cargar, la información será generada a su correo corporativo', 'info');

               $scope.respuestata = response.data;

            });
         }





         $scope.buscaReporte = function () {
            if ($scope.tiporeporte == "0") {
               $scope.shw_parametros = false;
            } else {
               $scope.hideall();
               $scope.shw_parametros = true;
               switch ($scope.tiporeporte) {
                	  

	               	case "14":

                       $scope.clclo_trimestre = false;
                     $scope.shw_periodo_trimestre = false;
                     $scope.mostrar_anexo3 = false;
                     $scope.mostrar_anexo1 = false;

	                  $scope.shw_annos = true;
	                  $scope.shw_periodo = true;
	               break;


                  case "22":

                    $scope.clclo_trimestre = false;
                     $scope.shw_periodo_trimestre = false;
                     $scope.mostrar_anexo3 = false;
                     $scope.mostrar_anexo1 = false;

                     $scope.shw_regimen = true;
                     $scope.shw_annos = true;
                     $scope.shw_ciclo = true;
                     $scope.shw_periodo = true;
                     $scope.shw_nit = true;

                     $scope.mostrar_generar = true;
                     $scope.mostrar_generasr = true;

                     break;

                  case "23":

                    $scope.clclo_trimestre = false;
                     $scope.shw_periodo_trimestre = false;
                     $scope.mostrar_anexo3 = false;
                     $scope.mostrar_anexo1 = false;

                     $scope.mostrar_generar = false;
                     $scope.mostrar_generasr = false;

                     $scope.shw_fecha_inicio = true;
                     $scope.shw_fecha_final = true;
                     $scope.shw_departamento = true;
                     $scope.shw_municipio = true;
                     break;

                  case "27":

                    $scope.clclo_trimestre = false;
                     $scope.shw_periodo_trimestre = false;
                     $scope.mostrar_anexo3 = false;
                     $scope.mostrar_anexo1 = false;

                     $scope.mostrar_generar = false;
                     $scope.mostrar_generasr = false;

                     $scope.shw_annos = true;
                     break;

                  case "28":

                    $scope.clclo_trimestre = false;
                     $scope.shw_periodo_trimestre = false;
                     $scope.mostrar_anexo3 = false;
                     $scope.mostrar_anexo1 = false;

                     $scope.mostrar_generar = false;
                     $scope.mostrar_generasr = false;

                     $scope.shw_annos = true;
                     $scope.shw_periodo = true;
                     $scope.shw_regimen = true;
                     break;

                  case "29":

                    $scope.clclo_trimestre = false;
                     $scope.shw_periodo_trimestre = false;
                     $scope.mostrar_anexo3 = false;
                     $scope.mostrar_anexo1 = false;

                     $scope.mostrar_generar = false;
                     $scope.mostrar_generasr = false;

                     $scope.shw_annos = true;
                     $scope.shw_periodo = true;
                     $scope.shw_regimen = true;
                     $scope.shw_tipo_cuenta = true;
                     break;

                  case "30":

                    $scope.clclo_trimestre = false;
                     $scope.shw_periodo_trimestre = false;
                     $scope.mostrar_anexo3 = false;
                     $scope.mostrar_anexo1 = false;

                     $scope.mostrar_generar = false;
                     $scope.mostrar_generasr = false;

                     $scope.shw_annos = true;
                     $scope.shw_periodo = true;
                     break;

                  case "31":

                    $scope.clclo_trimestre = false;
                     $scope.shw_periodo_trimestre = false;
                     $scope.mostrar_anexo3 = false;
                     $scope.mostrar_anexo1 = false;

                     $scope.mostrar_generar = false;
                     $scope.mostrar_generasr = false;

                     $scope.shw_annos = true;
                     $scope.shw_periodo = true;
                     $scope.shw_regimen = true;
                     break;

                  case "32":

                    $scope.clclo_trimestre = false;
                     $scope.shw_periodo_trimestre = false;
                     $scope.mostrar_anexo3 = false;
                     $scope.mostrar_anexo1 = false;

                     $scope.mostrar_generar = false;
                     $scope.mostrar_generasr = false;

                     $scope.shw_annos = true;
                     $scope.shw_periodo = true;
                     $scope.shw_tipo_homologacion = true;
                     break;

                  case "33":

                    $scope.clclo_trimestre = false;
                     $scope.shw_periodo_trimestre = false;
                     $scope.mostrar_anexo3 = false;
                     $scope.mostrar_anexo1 = false;

                     $scope.mostrar_generar = false;
                     $scope.mostrar_generasr = false;

                     $scope.shw_annos = true;
                     $scope.shw_periodo = true;
                     break;

                  case "34":

                    $scope.clclo_trimestre = false;
                     $scope.shw_periodo_trimestre = false;
                     $scope.mostrar_anexo3 = false;
                     $scope.mostrar_anexo1 = false;

                     $scope.mostrar_generar = false;
                     $scope.mostrar_generasr = false;

                     $scope.shw_fecha_inicio = true;
                     $scope.shw_fecha_final = true;
                     $scope.shw_departamento = true;
                     $scope.shw_municipio = true;
                     break;

                  case "35":

                    $scope.clclo_trimestre = false;
                     $scope.shw_periodo_trimestre = false;
                     $scope.mostrar_anexo3 = false;
                     $scope.mostrar_anexo1 = false;

                     $scope.mostrar_generar = false;
                     $scope.mostrar_generasr = false;

                     $scope.shw_fecha_inicio = true;
                     $scope.shw_fecha_final = true;
                     $scope.shw_departamento = true;
                     $scope.shw_municipio = true;
                     break;

                  case "36":

                    $scope.clclo_trimestre = false;
                     $scope.shw_periodo_trimestre = false;
                     $scope.mostrar_anexo3 = false;
                     $scope.mostrar_anexo1 = false;

                     $scope.mostrar_generar = false;
                     $scope.mostrar_generasr = false;

                     $scope.shw_documento = true;
                     $scope.shw_numero = true;
                     $scope.shw_ubicacion = true;
                     break;

                  case "38":

                    $scope.clclo_trimestre = false;
                     $scope.shw_periodo_trimestre = false;
                     $scope.mostrar_anexo3 = false;
                     $scope.mostrar_anexo1 = false;

                     $scope.mostrar_generar = false;
                     $scope.mostrar_generasr = false;

                     $scope.shw_documento = true;
                     $scope.shw_concepto = true;
                     $scope.shw_nit = true;
                     break;
                  case "43":

                    $scope.clclo_trimestre = false;
                     $scope.shw_periodo_trimestre = false;
                     $scope.mostrar_anexo3 = false;
                     $scope.mostrar_anexo1 = false;

                     $scope.mostrar_generar = false;
                     $scope.mostrar_generasr = false;

                     $scope.shw_nit = true;
                     break;
                   case "46":

                     $scope.clclo_trimestre = false;
                     $scope.shw_periodo_trimestre = false;
                     $scope.mostrar_anexo3 = false;
                     $scope.mostrar_anexo1 = false;

                   	  $scope.mostrar_generar = false;
                   	  $scope.mostrar_generasr = false;
			          $scope.shw_fecha_inicio = true;
			          $scope.shw_fecha_final = true;
			          break;
			          case "47":

                     $scope.clclo_trimestre = false;
                     $scope.shw_periodo_trimestre = false;
                     $scope.mostrar_anexo3 = false;
                     $scope.mostrar_anexo1 = false;

			          $scope.mostrar_generar = false;
                     $scope.mostrar_generasr = false;
			             $scope.shw_fecha_inicio = true;
			             $scope.shw_fecha_final = true;
			          break;
			          case "48":

                     $scope.clclo_trimestre = false;
                     $scope.shw_periodo_trimestre = false;
                     $scope.mostrar_anexo3 = false;
                     $scope.mostrar_anexo1 = false;

			          $scope.mostrar_generar = false;
                     $scope.mostrar_generasr = false;
			             $scope.shw_fecha_inicio = true;
			             $scope.shw_fecha_final = true;
			          break;
			          case "54":

                     $scope.clclo_trimestre = false;
                     $scope.shw_periodo_trimestre = false;
                     $scope.mostrar_anexo3 = false;
                     $scope.mostrar_anexo1 = false;

			          $scope.mostrar_generar = false;
                     $scope.mostrar_generasr = false;
			            $scope.shw_regimen = true;
			            $scope.shw_annos = true;
			            $scope.shw_periodo = true;
			            $scope.shw_ciclo = true;
			            $scope.dsb_ciclo=true;
			            $scope.shw_nit = true;
			            $scope.shw_departamento = true;
			            $scope.shw_municipio = true;

			         break;
			          case "57":

                     $scope.clclo_trimestre = false;
                     $scope.shw_periodo_trimestre = false;
                     $scope.mostrar_anexo3 = false;
                     $scope.mostrar_anexo1 = false;

			          $scope.mostrar_generar = false;
                     $scope.mostrar_generasr = false;
			            $scope.shw_regimen = true;
			            $scope.shw_annos = true;
			            $scope.shw_periodo = true;
			            $scope.shw_ciclo = true;
			            $scope.dsb_ciclo=true;
			            $scope.shw_nit = true;
			            $scope.shw_departamento = true;
			            $scope.shw_municipio = true;

			         break;


                  case "62":
                     $scope.mostrar_generar130 = false;
                     $scope.shw_regimen = true;

                     $scope.shw_annos = true;
                     $scope.clclo_trimestre = true;
                     $scope.shw_periodo_trimestre = true;
                     $scope.shw_nit = true;
                     $scope.mostrar_generar = true;
                     $scope.mostrar_generasr = false;
                     $scope.mostrar_anexo1 = true;
                     $scope.mostrar_anexo3 = false;


                     break;


                  case "63":


                     $scope.mostrar_generar130 = false;
                     $scope.shw_annos = true;
                     $scope.shw_ciclo = true;
                     $scope.shw_periodo = true;
                     $scope.shw_nit = true;
                     $scope.mostrar_generar = true;
                     $scope.mostrar_generasr = false;
                     $scope.mostrar_anexo3 = true;
                     $scope.mostrar_anexo1 = false;

                     $scope.clclo_trimestre = false;
                     $scope.shw_periodo_trimestre = false;
                              
                     break;

               }
            }
         }
         $scope.hideall = function () {
            $scope.shw_regimen = false;
            $scope.shw_annos = false;
            $scope.shw_ciclo = false;
            $scope.shw_periodo = false;
            $scope.shw_nit = false;
            $scope.shw_fecha_final = false;
            $scope.shw_fecha_inicio = false;
            $scope.shw_departamento = false;
            $scope.shw_municipio = false;
            $scope.shw_tipo_cuenta = false;
            $scope.shw_tipo_homologacion = false;
            $scope.shw_documento = false;
            $scope.shw_numero = false;
            $scope.shw_ubicacion = false;
            $scope.shw_concepto = false;
         }
         $scope.obtenerMunicipios = function () {
            $scope.municipio = 'X';
            $scope.ipsreceptora = 'X';
            $scope.function = 'cargamunicipios';
            $http({
               method: 'POST',
               url: "php/esop/funcesop.php",
               data: { function: $scope.function, depa: $scope.departamento }
            }).then(function (response) {
               $scope.Municipios = response.data;
            });
         }
         $scope.obtenerDepartamentos = function () {
            $scope.function = 'cargadepartamentos';
            $http({
               method: 'POST',
               url: "php/esop/funcesop.php",
               data: { function: $scope.function }
            }).then(function (response) {
               $scope.Departamentos = response.data;
            });
         }
         $scope.cargaAnnos = function () {
            $http({
               method: 'POST',
               url: "php/financiera/funcfinanciera.php",
               data: { function: 'cargaannos' }
            }).then(function (res) {
               $scope.Annos = res.data;
               $scope.anno = $scope.Annos[0].ANNO;
               $scope.cargaCiclos();
            })
         }
         $scope.cargaCiclos = function () {
            $http({
               method: 'POST',
               url: "php/financiera/funcfinanciera.php",
               data: { function: 'cargaciclos', anno: $scope.anno }
            }).then(function (res) {
               $scope.Ciclos = res.data;
               $scope.ciclo = $scope.Ciclos[0].IDE;
               $scope.cargaPeriodos();
            })
         }
         $scope.cargaPeriodos = function () {
            if ($scope.anno != "X" || $scope.anno === undefined) {
               $http({
                  method: 'POST',
                  url: "php/financiera/funcfinanciera.php",
                  data: { function: 'cargaperiodos', anno: $scope.anno }
               }).then(function (res) {
                  $scope.Periodos = res.data;
                  $scope.periodo = $scope.Periodos[0].IDE;
               })
            }
         }

         $http({
            method: 'POST',
            url: "php/financiera/funcfinanciera.php",
            data: { function: 'obtenerdocumento' }
         }).then(function (respuesta) {
            $scope.Documentos = respuesta.data;
         });

         $scope.obtenerConceptos = function () {
            swal.showLoading();
            $http({
               method: 'POST',
               url: "php/financiera/funcfinanciera.php",
               data: { function: 'obtenerconcepto', documento: $scope.documento }
            }).then(function (response) {
               $scope.Conceptos = response.data;
               swal.close();
            });
         }

         $scope.generaReporte = function () {
            switch ($scope.tiporeporte) {
               case "22":
                  if ($scope.regimen == 'X') {
                     notification.getNotification('info', 'Ingrese información requerida', 'Notificación');
                  } else {
                     $scope.inactive2 = false;
                     $http({
                        method: 'POST',
                        url: "php/financiera/reportes/funcreportes.php",
                        data: {
                           function: 'generareporte',
                           regimen: $scope.regimen,
                           anno: $scope.anno,
                           ciclo: $scope.ciclo,
                           periodo: $scope.periodo,
                           tercero: $scope.tercero
                        }
                     }).then(function (res) {
                        $scope.inactive2 = true;
                        if (res.data == "1") {
                           window.open('php/financiera/reportes/cricularU_017.php');
                        }
                     })
                  }
                  break;
               case "23":
                  var fecha_inicio = $filter('date')(new Date($scope.fecha_inicio), 'dd/MM/yyyy');
                  var fecha_final = $filter('date')(new Date($scope.fecha_final), 'dd/MM/yyyy');
                  window.open('php/financiera/reportes/trazabilidad_factura.php?dpto=' + $scope.departamento + '&mun=' +
                     $scope.municipio + '&fecha_inicio=' +
                     fecha_inicio + '&fecha_final=' +
                     fecha_final);
                  break;

               case "24":
                  window.open('php/financiera/reportes/prsa.php');
                  break;

               case "25":
                  window.open('php/financiera/reportes/limbo.php');
                  break;

               case "26":
                  window.open('php/financiera/reportes/doc_activos.php');
                  break;

               case "27":
                  window.open('php/financiera/reportes/doc_procesados.php?anno=' + $scope.anno);
                  break;

               case "28":
                  window.open('php/financiera/reportes/costo_menor_mayor.php?ann=' + $scope.anno + '&per=' + $scope.periodo + '&reg=' + $scope.regimen);
                  break;

               case "29":
                  window.open('php/financiera/reportes/krat.php?ann=' + $scope.anno + '&per=' + $scope.periodo + '&reg=' + $scope.regimen + '&tcu=' + $scope.tipo_cuenta);
                  break;

               case "30":
                  window.open('php/financiera/reportes/krpr.php?ann=' + $scope.anno + '&per=' + $scope.periodo);
                  break;

               case "31":
                  window.open('php/financiera/reportes/krpr.php?ann=' + $scope.anno + '&per=' + $scope.periodo + '&reg=' + $scope.regimen);
                  break;

               case "32":
                  window.open('php/financiera/reportes/krpr_homologado.php?ann=' + $scope.anno + '&per=' + $scope.periodo + '&tip=' + $scope.tipo_homologacion);
                  break;

               case "33":
                  window.open('php/financiera/reportes/diferencias_aux_con.php?ann=' + $scope.anno + '&per=' + $scope.periodo);
                  break;

               case "34":
                  var fecha_inicio = $filter('date')(new Date($scope.fecha_inicio), 'dd/MM/yyyy');
                  var fecha_final = $filter('date')(new Date($scope.fecha_final), 'dd/MM/yyyy');
                  window.open('php/financiera/reportes/radicacion_x_afiliado.php?dpto=' + $scope.departamento + '&mun=' +
                     $scope.municipio + '&fecha_inicio=' +
                     fecha_inicio + '&fecha_final=' +
                     fecha_final);
                  break;

               case "35":
                  var fecha_inicio = $filter('date')(new Date($scope.fecha_inicio), 'dd/MM/yyyy');
                  var fecha_final = $filter('date')(new Date($scope.fecha_final), 'dd/MM/yyyy');
                  window.open('php/financiera/reportes/pagos_x_afiliado.php?dpto=' + $scope.departamento + '&mun=' +
                     $scope.municipio + '&fecha_inicio=' +
                     fecha_inicio + '&fecha_final=' +
                     fecha_final);
                  break;

               case "36":
                  window.open('php/financiera/reportes/historico_factura.php?doc=' + $scope.documento + '&num=' + $scope.numero + '&ubi=' + $scope.ubicacion);
                  break;

               case "38":
                  window.open('php/financiera/reportes/cruce_factura_ingreso.php?doc=' + $scope.documento + '&con=' + $scope.concepto + '&nit=' + $scope.tercero);
                  break;
               case "43":
                  window.open('php/financiera/reportes/traza_glosa.php?tercero=' + $scope.tercero);
                  break;

            }
         }
      }

   ]);
