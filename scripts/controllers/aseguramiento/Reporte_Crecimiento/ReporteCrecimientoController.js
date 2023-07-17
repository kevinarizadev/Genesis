'use strict';
angular.module('GenesisApp').controller('ReporteCrecimientoController', ['$scope', '$http', 'consultaHTTP', '$filter', 'ngDialog', 'cfpLoadingBar', '$timeout',
   function ($scope, $http, consultaHTTP, $filter, ngDialog, cfpLoadingBar, $timeout) {
      $(document).ready(function () {
         console.log("test");
         // DECLARACIÓN DE VARIALES, ARRAYS, OBJETOS, ETC
         $scope.hdeInfoAdjuntos = true;
         // $scope.hdeInputsPeriodo = true;        
         $scope.hdeBtnC = true;
         $scope.hdeBtnTN = true;
         $scope.hdeBtnRN = true;
         $scope.hdeSlectAnno = true;
         $scope.hdeSlectMes = true;
         $scope.hdeSlectPer = true;
         var fechaActual = new Date();
         $scope.annoActual = fechaActual.getFullYear();
         $scope.semana = undefined;
         $scope.mes = undefined;
         $scope.anno = undefined;
         $scope.rutas = undefined;
         $scope.codDpto = undefined;
         $scope.codMunicipio = undefined;
         $scope.periodo = undefined;
         $scope.datosHistorial = undefined;
         $scope.historial = {};
         $scope.datosFormatos = {};

         $.getJSON("php/obtenersession.php").done(function (respuesta) {
            $scope.sesdata = respuesta;
            // console.log($scope.sesdata);
            $scope.codDpto = $scope.sesdata.codmunicipio;
            $scope.codMunicipio = $scope.sesdata.codmunicipio;
            // console.log($scope.codMunicipio, $scope.codMunicipio.length);
            if ($scope.codDpto.length == 5) {
               $scope.codDpto = $scope.codDpto.substr(0, 2);
               $scope.codMunicipio = $scope.codMunicipio.substr(2, $scope.codMunicipio.length);
               // console.log($scope.codDpto, $scope.codMunicipio);
            } else if ($scope.codDpto.length == 4) {
               $scope.codDpto = "0"+$scope.codDpto.substr(0, 1);
               $scope.codMunicipio = $scope.codMunicipio.substr(1, $scope.codMunicipio.length);
               // console.log($scope.codDpto, $scope.codMunicipio);
            }
            $scope.historial.responsable = $scope.sesdata.nombre;
            // console.log($scope.historial.responsable);
            $scope.historial.codResponsable = $scope.sesdata.cedula;
            if ($scope.historial.codResponsable == 8646049 || $scope.historial.codResponsable == 22523027) {
               document.getElementById('botones').style.pointerEvents = 'none';
            }
            // console.log($scope.historial.codResponsable);
         })
         
         // window.open('views/aseguramiento/Reporte_Crecimiento/Certificacion_Crecimiento.php', '_blank', "width=1080,height=1100");
         // window.open('views/aseguramiento/Reporte_Crecimiento/Certificacion_Novedades.php', '_blank', "width=1080,height=1100");
         // window.open('views/juridica/demandas/modal/informedemanda.php?codigo_demanda=' + $scope.codigo_demanda_seleccionada, '_blank', "width=1080,height=1100");
      });

      //LISTA ANNOS
      $scope.listaAnnos = function (tipo_reporte) {
         $scope.anno = "";
         $scope.mes = "";
         $scope.semana = "";
         if (tipo_reporte == 'C') {
            $scope.hdeBtnC = false;
            $scope.hdeBtnTN = true;
            $scope.hdeBtnRN = true;

            $scope.hdeSlectAnno = false;
            $scope.hdeSlectMes = false;
            $scope.hdeSlectPer = false;
            $scope.hdeInfoAdjuntos = true;
         }
         if (tipo_reporte == 'TN') {
            $scope.hdeBtnTN = false;
            $scope.hdeBtnC = true;
            $scope.hdeBtnRN = true;

            $scope.hdeSlectAnno = false;
            $scope.hdeSlectMes = false;
            $scope.hdeSlectPer = false;
            $scope.hdeInfoAdjuntos = true;
         }
         if (tipo_reporte == 'RN') {
            $scope.hdeBtnRN = false;
            $scope.hdeBtnC = true;
            $scope.hdeBtnTN = true;

            $scope.hdeSlectAnno = false;
            $scope.hdeSlectMes = false;
            $scope.hdeSlectPer = true;
            $scope.hdeInfoAdjuntos = true;
         }
         swal({
            title: 'Cargando información...',
            allowEscapeKey: false,
            allowOutsideClick: false
         });
         swal.showLoading();
         $http({
            method: 'POST',
            url: "php/aseguramiento/Reporte_Crecimiento/reportecrecimiento.php",
            data: {
               function: 'listaAnnos',
               tipo_reporte: tipo_reporte
            }
         }).then(function (response) {
            swal.close();
            $scope.Annos = response.data;
         });
      }

      //LISTA MESES DEPENDIENDO DEL AÑO SELECCIONADO
      $scope.listaMeses = function (anno, tipo_reporte) {
         swal({
            title: 'Cargando información...',
            allowEscapeKey: false,
            allowOutsideClick: false
         });
         swal.showLoading();
         $http({
            method: 'POST',
            url: "php/aseguramiento/Reporte_Crecimiento/reportecrecimiento.php",
            data: {
               function: 'listaMeses',
               anno: anno,
               tipo_reporte: tipo_reporte
            }
         }).then(function (response) {
            swal.close();
            $scope.Meses = response.data;
         });
      }

      //LISTA PERIODOS DISPONIBLES DEPENDIENDO DEL MES SELECCIONADO
      $scope.listaPeriodos = function (anno, mes, tipo_reporte) {
         swal({
            title: 'Cargando información...',
            allowEscapeKey: false,
            allowOutsideClick: false
         });
         swal.showLoading();
         $http({
            method: 'POST',
            url: "php/aseguramiento/Reporte_Crecimiento/reportecrecimiento.php",
            data: {
               function: 'listaPeriodos',
               anno: anno,
               mes: mes,
               tipo_reporte: tipo_reporte
            }
         }).then(function (response) {
            swal.close();
            $scope.Periodos = response.data;
         });
      }

      //LISTA DATOS DE HISTORIAL DE REPORTES GENERADOS EN TABLA
      var listaHistorialReportes = $('#dataHistorialReportes').DataTable({
         dom: 'lBsfrtip',
         select: true,
         buttons: [{ extend: 'copy', text: 'Copiar' }, 'csv', 'excel'],
         searching: true,
         ajax: {
            //url: 'json/demandas.json',
            url: 'php/aseguramiento/Reporte_Crecimiento/listaHistorialReportes.php',
            dataSrc: ''
         },
         columns: [
            { data: "RESPONSABLE" },
            { data: "TIPO_REPORTE" },
            { data: "PERIODO" },
            { data: "FECHA_INICIO" },
            { data: "FECHA_FIN" },
            { data: "TRANSCURRIDO" }
         ],
         language: {
            "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
         },
         lengthMenu: [[10, 30, 50, -1], [10, 30, 50, 'Todas']],
         order: [[1, "asc"]]
      });

      //GENERA REPORTE DE CRECIMIENTO (TEMPORAL)
      $scope.reporteCrecimiento = function (proceso, semana, mes, anno) {
         var fechaActual = new Date();
         $scope.historial.fechaInicio = fechaActual.getFullYear() + '/' + (fechaActual.getMonth()+1) + '/' + fechaActual.getDate();
         $scope.historial.hrIniReporte = fechaActual.getHours() + ':' + fechaActual.getMinutes() + ':' + fechaActual.getSeconds();
         if (($scope.semana == "" || $scope.mes == "" || $scope.anno == "" || $scope.semana == undefined || 
             $scope.mes == undefined || $scope.anno == undefined) && (proceso == 'C' || proceso == 'TN'))  {
            Materialize.toast('¡Por favor digitar información del periodo a consultar!', 1500); $('.toast').addClass('default-background-dark');
         } else {
            $scope.periodo = semana +'|'+ mes +'|'+ anno;
            if ($scope.tipo_reporte == 'RN') {
               $scope.periodo = mes +'|'+ anno;
            }
            Materialize.toast('¡Le pedimos paciencia, este reporte puede tardar varios minutos para generarse!', 2000); $('.toast').addClass('default-background-dark');
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
               url: "php/aseguramiento/Reporte_Crecimiento/reportecrecimiento.php",
               data: {
                  function: 'rutasSoportes',
                  proceso: proceso,
                  periodo: parseInt($scope.periodo),
                  periodo_s: semana.toString(),
                  anno: anno,
                  mes: mes,
                  dpto: $scope.codDpto,
                  municipio: $scope.codMunicipio
               }
            }).then(function (response) {
               $scope.rutas = response.data;
               swal.close();
               window.open($scope.rutas.rutatxt.substr(9, $scope.rutas.rutatxt.length));
               $timeout(function(){
                  window.open($scope.rutas.ruta.substr(9, $scope.rutas.ruta.length));
               },200);
               $scope.hdeInfoAdjuntos = false;
               $scope.hdeGestionReportes = false;
               var fechaFin = new Date();
               $scope.historial.fechaFin = fechaFin.getFullYear() + '/' + (fechaFin.getMonth() + 1) + '/' + fechaFin.getDate();
               var transcurso = fechaFin.getTime() - fechaActual.getTime();
               transcurso = (transcurso / 60000).toString().substr(0, 6);
               $scope.historial.transcurso = Math.round(transcurso);
               $scope.historial.hrFinReporte = fechaFin.getHours() + ':' + fechaFin.getMinutes() + ':' + fechaFin.getSeconds();
               // $scope.datosFormatos={
               //    dia: fechaFin.getDate(),
               //    mes: fechaFin.getMonth(),
               //    anno: fechaFin.getFullYear()
               // };
               if ($scope.tipo_reporte == 'RN') {
                  window.open('views/aseguramiento/Reporte_Crecimiento/Certificacion_Novedades.php?semana=' + semana, '_blank', "width=1080,height=1100");
               }
               if ($scope.tipo_reporte == 'C') {
                  window.open('views/aseguramiento/Reporte_Crecimiento/Certificacion_Crecimiento.php?semana=' + semana, '_blank', "width=1080,height=1100");                  
               }
               $scope.historialSoporte(proceso, $scope.periodo, $scope.rutas.soportes, $scope.rutas.afiliados);
            });
         }
      }

      //INSERTAR HISTORIAL REPORTE GENERADO
      $scope.historialSoporte = function (proceso, periodo, soportes, afiliados) {
         $http({
            method: 'POST',
            url: "php/aseguramiento/Reporte_Crecimiento/reportecrecimiento.php",
            data: {
               function: 'historialSoporte',
               historial: $scope.historial,
               tipo_reporte: proceso,
               periodo: periodo,
               cant_soportes: soportes,
               cant_afiliados: afiliados
            }
         }).then(function (response) {
            $scope.historialResp = response.data;
            listaHistorialReportes.ajax.reload();
         });
      }

      //FORMATEA INPUTS PERIODO
      $scope.formatcurrency = function () {
         if ($scope.semana > 3 || $scope.semana == 0) {
            $scope.semana = "";
         }
         if ($scope.mes > 12 || $scope.mes < 0) {
            $scope.mes = "";
         }
         if (($scope.mes >= 1 && $scope.mes <= 9 && $scope.mes.length == 1) && ($scope.mes.substr(0, 1) != 1 )){
            $scope.mes = 0 + $scope.mes;
         }
         if ($scope.anno > $scope.annoActual) {
            $scope.anno = "";
         }
      }

      //ABRE IMPRIMIR DEMANDA
      // $scope.ImprimirInforme = function () {
      //    window.open('views/juridica/demandas/modal/informedemanda.php?codigo_demanda=' + $scope.codigo_demanda_seleccionada, '_blank', "width=1080,height=1100");
      // }
   }
]);