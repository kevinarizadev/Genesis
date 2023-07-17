'use strict';
angular.module('GenesisApp')
  .controller('gestiondeencuestasController', ['$scope', '$http',
    function ($scope, $http) {

      $scope.Inicio = function () {
        console.log($(window).width());
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.Ajustar_Pantalla();
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');

        // $scope.Tabs = 1;
        $scope.selTab = 1;

        $('.tabs').tabs();
        $('.modal').modal();

        $scope.SysDay = new Date();
        $scope.limpiarForm();
        $scope.limpiarForm_Tab2();
        setTimeout(() => {
          $scope.$apply();
        }, 500);


        //////////////////////////////////////////////////////////
      }
      // 12964797
      $scope.limpiarForm = function () {
        $scope.form = {
          status: 0,
          numeroPQR: '',

          tipoDocAfiliado: '',
          numeroDocAfiliado: '',
          nombreAfiliado: '',
          telefonoAfiliado: '',

          recibioRespuesta: '',
          dioSolucion: '',
          observacion: '',

        };
        document.querySelector('#form_numeroPQR').removeAttribute("readonly");
        document.querySelector('#form_numeroPQR').focus()
        ///
        document.querySelectorAll(".Valid_Campo").forEach(e => {
          e.classList.remove("Valid_Campo");
        });
        angular.forEach(document.querySelectorAll('.Form_Desactivados input'), function (i) {
          i.setAttribute("readonly", true);
        });
        angular.forEach(document.querySelectorAll('.Form_Desactivados select'), function (i) {
          i.setAttribute("disabled", true);
        });

        $scope.apply();
      }


      $scope.consultarPQR = function () {
        $scope.form.numeroPQR = $scope.form.numeroPQR.toString().trim();
        $scope.apply();
        if ($scope.form.numeroPQR == '' || $scope.form.numeroPQR.toString().length < 4) {
          document.querySelector("#form_numeroPQR").classList.add("Valid_Campo");
          swal("¡Importante!", "Digite el numero de la PQR", "info").catch(swal.noop);
          return;
        }
        angular.forEach(document.querySelectorAll('#Form1 .Valid_Campo'), function (i) { i.classList.remove('Valid_Campo'); });
        document.querySelector('#form_numeroPQR').setAttribute("readonly", true);
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        }).catch(swal.noop);
        const data = {
          "user": $scope.Rol_Cedula,
          "filtro": "P",
          "numero": $scope.form.numeroPQR,
          "rowid": "100"
        }
        $http({
          method: 'POST',
          url: "php/siau/gestiondeencuestas.php",
          data: {
            function: 'P_OBTENER_PQR_AVANZADO',
            data: JSON.stringify(data)
          }
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != '<br') {
            if (data.info) {
              swal.close();
              $scope.form.tipoDocAfiliado = data.info.TipoDocumento;
              $scope.form.numeroDocAfiliado = data.info.Documento;
              $scope.form.nombreAfiliado = data.info.NombreCompleto;
              $scope.form.telefonoAfiliado = data.info.Celular1;
              $scope.form.status = 1;
              $scope.apply();
            } else {
              swal("¡Ocurrio un error!", "PQR no encontrada", "warning").catch(swal.noop);
            }
          } else {
            swal("¡Ocurrio un error!", data, "warning").catch(swal.noop);
          }
        });
      }


      $scope.validarForm = function () {
        angular.forEach(document.querySelectorAll('#Form1 .Valid_Campo'), function (i) { i.classList.remove('Valid_Campo'); });
        if ($scope.form.recibioRespuesta == '' || !$scope.form.recibioRespuesta) {
          document.querySelector("#form_recibioRespuesta").classList.add("Valid_Campo");
          return;
        }
        if ($scope.form.dioSolucion == '' || !$scope.form.dioSolucion) {
          document.querySelector("#form_dioSolucion").classList.add("Valid_Campo");
          return;
        }

        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        }).catch(swal.noop);

        $http({
          method: 'POST',
          url: "php/siau/gestiondeencuestas.php",
          data: {
            function: 'guardarEncuestaPQR',
            datos: JSON.stringify($scope.form),
            responsable : $scope.Rol_Cedula,
            tipoEncuesta : '1' // Genesis
          }
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != '<br') {
            if (data.Codigo == 0) {
              swal("¡Mensaje!", 'Encuesta guardada correctamente', "success").catch(swal.noop);
              $scope.limpiarForm();
            } else {
              swal("¡Mensaje!", data.Mensaje, "info").catch(swal.noop);
            }
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }

      $scope.limpiarForm_Tab2 = function () {
        $scope.form_tab2 = {
          tipoEncuesta: 1,
          fechaInicio: null,
          fechaFin: null
        }

      }

      $scope.descargarEncuesta = function () {
        angular.forEach(document.querySelectorAll('#Form2 .Valid_Campo'), function (i) { i.classList.remove('Valid_Campo'); });
        if ($scope.form_tab2.fechaInicio == '' || !$scope.form_tab2.fechaInicio) {
          document.querySelector("#form_tab2_fechaInicio").classList.add("Valid_Campo");
          return;
        }
        if ($scope.form_tab2.fechaFin == '' || !$scope.form_tab2.fechaFin) {
          document.querySelector("#form_tab2_fechaFin").classList.add("Valid_Campo");
          return;
        }
        if ($scope.form_tab2.fechaInicio > $scope.form_tab2.fechaFin) {
          document.querySelector("#form_tab2_fechaInicio").classList.add("Valid_Campo");
          document.querySelector("#form_tab2_fechaFin").classList.add("Valid_Campo");
          swal("¡Importante!", "Debe corregir las fechas", "info").catch(swal.noop);
          return;
        }
        // console.log($scope.form_tab2)
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        }).catch(swal.noop);
        $http({
          method: 'POST',
          url: "php/siau/gestiondeencuestas.php",
          data: {
            function: 'descargarEncuesta',
            tipoEncuesta: $scope.form_tab2.tipoEncuesta,
            fechaInicio: $scope.GetFecha('fechaInicio'),
            fechaFin: $scope.GetFecha('fechaFin')
          }
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != '<br') {
            if (data.length) {
              $scope.exportExcel(data);
              const text = `${data.length} registros encontrados.`;
              swal("¡Importante!", text, "success").catch(swal.noop);
            } else {
              swal("¡Importante!", "No se encontraron registros.", "info").catch(swal.noop);
            }
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }

      $scope.exportExcel = function (JSONData) {
        var data = JSONData;
        // / * Si el componente xlsx no se importa, entonces importe * /
        if (typeof XLSX == 'undefined') XLSX = require('xlsx');
        // / * Crear hoja de trabajo * /
        var ws = XLSX.utils.json_to_sheet(data);
        // / * Cree un libro de trabajo vacío y luego agregue la hoja de trabajo * /
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
        // / * Generar archivo xlsx * /
        XLSX.writeFile(wb, "Libro1.xlsx");
      }

      ///////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////
      $scope.setTab = function (tab) {
        $scope.selTab = tab;
        $scope.apply();
      }

      $scope.GetFecha = function (SCOPE) {
        var ahora_ano = $scope.form_tab2[SCOPE].getFullYear();
        var ahora_mes = ((($scope.form_tab2[SCOPE].getMonth() + 1) < 10) ? '0' + ($scope.form_tab2[SCOPE].getMonth() + 1) : ($scope.form_tab2[SCOPE].getMonth() + 1));
        var ahora_dia = ((($scope.form_tab2[SCOPE].getDate()) < 10) ? '0' + ($scope.form_tab2[SCOPE].getDate()) : ($scope.form_tab2[SCOPE].getDate()));
        return ahora_dia + '/' + ahora_mes + '/' + ahora_ano;
      }

      $scope.Obtener_Tipos_Documentos = function () {
        $http({
          method: 'POST',
          url: "php/genesis/funcgenesis.php",
          data: {
            function: 'Obtener_Tipos_Documentos',
            Tipo: 'S'
          }
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != '<br') {
            $scope.tiposDocumentos = data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.Obtener_Tipos_Documentos();

      ///////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////

      $scope.getNum = function (val) {
        if (isNaN(val)) {
          return 0;
        }
        return val;
      }
      $scope.apply = function () {
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.Ajustar_Pantalla = function () {
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
      }

      $(window).on('resize', function () {
        $scope.Ajustar_Pantalla();
      });

      if (document.readyState !== 'loading') {
        $scope.Inicio();
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }

    }]);
