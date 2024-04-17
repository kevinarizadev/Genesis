'use strict';
angular.module('GenesisApp').controller('radicaciondigitalController', ['$scope', '$http', '$filter',
  function ($scope, $http, $filter) {
    // #region Inicio
    $scope.Inicio = function () {
      $('.modal').modal();
      // $('.tabs').tabs();

      $scope.Ajustar_Pantalla();

      $scope.Rol_Nit = sessionStorage.getItem('nit');
      $scope.Rol_Cedula = sessionStorage.getItem('cedula');
      // $scope.Rol_Nit = 900465319;
      $scope.SysDay = new Date();
      $scope.Vista = 0;
      // $scope.Tabs = 1;

      $scope.cargarRips();
      // swal({
      //   title: "¡Notificación!",
      //   html: `<span>Ahora es posible anular RIPS Validados utilizando la opción</span>
      //          <i class="icon-trash cursor-pointer" style="font-size: 18px;"></i>`,
      //   type: 'info',
      //   confirmButtonText: "Ok",
      // });

      setTimeout(() => { $scope.$apply(); }, 500);
      console.log(1)
    };


    $scope.cargarRips = function () {
      $scope.listaRIPS = [];

      $scope.contadores = {
        espera: 0,
        analizando: 0,
        error: 0,
        validado: 0,
      }

      $http({
        method: 'POST',
        url: "php/cuentasmedicas/radicaciondigital.php",
        data: {
          function: 'P_OBTENER_CARGUES_RADICADOS',
          nit: $scope.Rol_Nit
        }
      }).then(function ({ data }) {
        if (data.toString().substr(0, 3) == '<br' || data == 0) {
          swal('Mensaje', 'No existen facturas para mostrar', 'warning').catch(swal.noop); return
        }
        $scope.listaRIPS = data;
        $scope.listaRIPSTemp = data;
        $scope.currentPage = 0;
        $scope.pageSize = 20;
        $scope.valmaxpag = 20;
        $scope.pages = [];
        $scope.configPages();


        data.forEach(e => {
          const estadoMap = {
            'E': 'espera',
            'A': 'analizando',
            'V': 'validado',
            'X': 'error'
          };
          const estado = e.OCR_ESTADO_FACTURAS;
          $scope.contadores[estadoMap[estado]]++;
        });

      })
    }
    $scope.verFacturas = function (x) {

      const fecha_proceso = new Date((x.FECHA_PROCESO.split('/')[2]).concat("/", x.FECHA_PROCESO.split('/')[1], "/", x.FECHA_PROCESO.split('/')[0]));
      $scope.datosRips = {
        nit: x.NIT,
        codigoProceso: x.CODIGO_PROCESO,
        codigoRecibo: x.CODIGO_RECIBO,
        codigoHabilitacion: x.CODIGO_HABILITACION,
        estadoRips: x.ESTADO_RIPS,
        estadoFacturas: x.OCR_ESTADO_FACTURAS,
        estadoFacturasNomb: x.OCR_ESTADO_FACTURAS_NOMB,
        ocrID: x.OCR_ID,
        facturas: x.FACTURAS,
        totalFacturas: 0,
        regimen: x.REGIMEN,
        tipoContrato: x.TIPO_CONTRATO,
        fechaProceso: fecha_proceso,
        rutaRips: x.RUTA_RIPS,

        soporteNombre: '',
        soporteB64: '',
        soporteExt: '',
        archivo: '',


      };

      $scope.listaFacturas = [];
      $scope.filtroFacturas = '';
      $scope.Vista = 1; // quitar
      // $scope.datosFactura

      $scope.contadoresFacturas = {
        espera: 0,
        analizando: 0,
        error: 0,
        validado: 0,
      }

      $http({
        method: 'POST',
        url: "php/cuentasmedicas/radicaciondigital.php",
        data: {
          function: 'P_OBTENER_FACTURAS',
          nit: $scope.Rol_Nit,
          recibo: x.CODIGO_RECIBO
        }
      }).then(function ({ data }) {
        if (data.toString().substr(0, 3) == '<br' || data == 0) {
          swal("Mensaje", 'No existen facturas para mostrar', "warning").catch(swal.noop); return
        }
        if (data.length) {
          $scope.Vista = 1;
          $scope.listaFacturas = data;
          data.forEach(e => {
            $scope.datosRips.totalFacturas += parseFloat(e.VALOR_FACTURA);

            const estadoMap = {
              'E': 'espera',
              'A': 'analizando',
              'V': 'validado',
              'X': 'error'
            };
            const estado = e.OCR_ESTADO_FACTURA;
            $scope.contadoresFacturas[estadoMap[estado]]++;


          });

          $scope.datosRips.totalFacturas = $scope.FormatPesoNumero($scope.datosRips.totalFacturas)
        }
      })
    }



    $scope.cargarFacturasTotal = function () {

      // codigo_proceso
      // codigo_recibo
      var facturas = [
        { codigo_factura: 'LGF741734', tipo_afiliado: 'CC', documento_afiliado: '1083002785', codigo_autorizacion: '4700100808420', valor_total: '7305' },
        { codigo_factura: 'LGF751185', tipo_afiliado: 'CC', documento_afiliado: '19078818', codigo_autorizacion: '4700100811549', valor_total: '437057' },
      ]

      var formData = new FormData();

      // Agrega los campos del formulario al objeto FormData
      formData.append('partner_id', $scope.Rol_Nit);
      formData.append('rips', $scope.datosRips.codigoRecibo);


      formData.append("file", $scope.datosRips.archivo);
      formData.append("rips_data", facturas);

      console.log(formData);

      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando facturas...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false
      });
      $http({
        method: 'POST',
        url: "http://172.52.11.25:5000/api/upload_rips_files_zip",
        formData
      }).then(function (response) {

        console.log(response);
        if (data.toString().substr(0, 3) != '<br') {
        } else {
        }
      })



    }





    //////////////////////////////////////////////////

    document.querySelector('#fileFacturasDig').addEventListener('change', function (e) {
      $scope.datosRips.soporteB64 = "";
      setTimeout(() => { $scope.$apply(); }, 500);
      var files = e.target.files;
      if (files.length != 0) {
        for (let i = 0; i < files.length; i++) {
          const x = files[i].name.split('.');
          if (x[x.length - 1].toUpperCase() == 'ZIP') {
            if (files[i].size < 15485760 && files[i].size > 0) {
              $scope.getBase64(files[i]).then(function (result) {
                $scope.datosRips.soporteExt = x[x.length - 1].toLowerCase();
                $scope.datosRips.soporteB64 = result;
                setTimeout(function () { $scope.$apply(); }, 300);
              });
            } else {
              document.querySelector('#fileFacturasDig').value = '';
              swal('Advertencia', '¡Uno de los archivos seleccionados excede el peso máximo posible (15MB)!', 'info');
            }
          } else {
            document.querySelector('#fileFacturasDig').value = '';
            swal('Advertencia', '¡El archivo seleccionado debe ser .ZIP!', 'info');
          }
        }
      }
    });
    $scope.getBase64 = function (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }

    $scope.cargarFacturasDig = function () {
      return new Promise((resolve) => {
        if (!$scope.formSoporteDig.soporteB64) { resolve(''); return }
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando facturas...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/planeacion/procesospoa.php",
          data: {
            function: "cargarFacturasDig",

            // codigo: "SoporteProceso",
            // codigo: $scope.hojaProcesos.formulario.idProcesoSeleccionado,
            // base64: $scope.hojaProcesos.formulario.soporteB64
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br') {
            resolve(data);
          } else {
            resolve(false);
          }
        })
      });
    }

    $scope.validarFacturasDig = function () {
      const text = `Total: ${$scope.formSoporteDig.cantidadFacturas}`
      swal({
        title: '¿Adjuntó el total de las facturas esperadas?',
        text,
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result) {
        }
      })
      // asdasd
    }



    $scope.getColorEstado = function (estado) {
      const dato = {
        E: 'orange',
        A: 'light-blue',
        V: 'green',
        X: 'red'
      }
      return dato[estado] || 'orange'
    }

    $scope.Atras = function () {
      $scope.Vista -= 1;
      setTimeout(() => { $scope.$apply(); }, 500);
    }

    //////////////////////////////////////////////////
    //////////////////////////////////////////////////

    $scope.FormatPesoNumero = function (num) {
      if (num) {
        var regex2 = new RegExp("\\.");
        if (regex2.test(num)) {
          num = num.toString().replace('.', ',');
          num = num.split(',');
          num[0] = num[0].toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
          num[0] = num[0].split('').reverse().join('').replace(/^[\.]/, '');
          if (num[1].length > 1 && num[1].length > 2) {
            num[1] = num[1].toString().substr(0, 2);
          }
          if (num[1].length == 1) {
            num[1] = num[1] + '0';
          }
          return num[0] + ',' + num[1];
        } else {
          num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
          num = num.split('').reverse().join('').replace(/^[\.]/, '');
          return num + ',00';
        }
      } else {
        return "0"
      }
    }

    $scope.openModal = function (modal) {
      $(`#${modal}`).modal('open');
    }
    $scope.closeModal = function () {
      $('.modal').modal('close');
    }
    $scope.filter = function (val) {
      $scope.listaRIPSTemp = $filter('filter')($scope.listaRIPS, val);
      if ($scope.listaRIPSTemp.length > 0) {
        $scope.setPage(1);
      }
      $scope.configPages();
    }

    $scope.configPages = function () {
      $scope.pages.length = 0;
      var ini = $scope.currentPage - 4;
      var fin = $scope.currentPage + 5;
      if (ini < 1) {
        ini = 1;
        if (Math.ceil($scope.listaRIPSTemp.length / $scope.pageSize) > $scope.valmaxpag) fin = 10;
        else fin = Math.ceil($scope.listaRIPSTemp.length / $scope.pageSize);
      } else {
        if (ini >= Math.ceil($scope.listaRIPSTemp.length / $scope.pageSize) - $scope.valmaxpag) {
          ini = Math.ceil($scope.listaRIPSTemp.length / $scope.pageSize) - $scope.valmaxpag;
          fin = Math.ceil($scope.listaRIPSTemp.length / $scope.pageSize);
        }
      }
      if (ini < 1) ini = 1;
      for (var i = ini; i <= fin; i++) {
        $scope.pages.push({
          no: i
        });
      }
      if ($scope.currentPage >= $scope.pages.length) $scope.currentPage = $scope.pages.length - 1;
    }
    $scope.setPage = function (index) {
      $scope.currentPage = index - 1;
      // console.log($scope.listaRIPS.length / $scope.pageSize - 1)
    }

    $scope.Ajustar_Pantalla = function () {
      if ($(window).width() < 1100) {
        document.querySelector("#pantalla").style.zoom = 0.7;
      }
      if ($(window).width() > 1100) {
        document.querySelector("#pantalla").style.zoom = 0.8;
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


  }
]).filter('inicio', function () {
  return function (input, start) {
    if (input != undefined && start != NaN) {
      start = +start;
      return input.slice(start);
    } else {
      return null;
    }
  }
});
