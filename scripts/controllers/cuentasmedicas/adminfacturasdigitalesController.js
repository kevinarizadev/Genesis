'use strict';
angular.module('GenesisApp')
  .controller('adminfacturasdigitalesController', ['$scope', '$http',
    function ($scope, $http) {

      $scope.Inicio = function () {
        console.log($(window).width());
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.Ajustar_Pantalla();

        $scope.apiURL = 'http://172.52.11.25:5000/api';

        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        $scope.Tabs = 2;
        // $('.tabs').tabs();
        $scope.SysDay = new Date();
        $scope.hoja1Limpiar();
        $scope.hoja2Limpiar();
        $scope.hoja3Limpiar();

        $scope.obtenerListadoFuncs();
        // $scope.obtenerListadoFacturas()
        $scope.obtenerListadoIPS();

        // $scope.Hoja1.vista = 1;

        $('.modal').modal();
        setTimeout(() => {
          $scope.$apply();
        }, 500);
        setTimeout(() => {
          $('.tabs').tabs();
        }, 2000);
        //////////////////////////////////////////////////////////
      }
      $scope.hoja1Limpiar = function () {
        $scope.Hoja1 = {
          Filtro0: '',
          Filtro1: '',
          vista: 0,
          estado: false
        };
        $scope.List1 = {};

        setTimeout(() => {
          $scope.$apply();
        }, 300);
      }

      $scope.obtenerListadoFacturas = function (x) {
        // Recibe x para no mostrar swalLoading
        if (!x)
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            showConfirmButton: false,
            animation: false
          });
        $scope.List1.listadoFacturas = [];
        $scope.Hoja1.vista = 0;

        // if (!x) swal.close();
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/adminfacturasdigitales.php",
          data: {
            function: 'P_OBTENER_ADMIN_FACTURAS_DIGITALES',
            ips: '',
            estado: $scope.Hoja1.estado ? 'G' : 'A'
          }
        }).then(function ({ data }) {
          if (!x) swal.close();
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          $scope.List1.listadoFacturas = data;
          console.log(data);
          setTimeout(() => { $scope.$apply(); }, 500);
        });
      }

      $scope.obtenerListadoFacturas_Detalle = function (x) {
        // Recibe x para no mostrar swalLoading
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          showConfirmButton: false,
          animation: false
        });

        $scope.List1.listadoFacturas_Detalle = [];
        $scope.Hoja1.vista = 1;
        // if (!x) swal.close();
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/adminfacturasdigitales.php",
          data: {
            function: 'P_OBTENER_ADMIN_FACTURAS_DIGITALES',
            ips: x.PRESTADOR.split('-')[0],
            estado: $scope.Hoja1.estado ? 'G' : 'A'
          }
        }).then(function ({ data }) {
          swal.close();
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          $scope.List1.listadoFacturas_Detalle = data;
          console.log(data);
          setTimeout(() => { $scope.$apply(); }, 500);
        });
      }

      $scope.getColor = function (x) {
        if (x.DIAS_REST >= 12) {
          return 'green'
        }
        if (x.DIAS_REST >= 6 & x.DIAS_REST <= 11) {
          return 'orange'
        }
        if (x.DIAS_REST <= 5) {
          return 'red'
        }
      }

      $scope.Hoja1_atras = function () {
        $scope.Hoja1.vista = 0;
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.verFacturaPDF = function (x) {
        $scope.imgFactura = null;
        $scope.palabrasPDF = '';

        $scope.openModal('modalFacturas');
        $scope.Hoja1.datosFactura = x;


        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando factura...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });

        $scope.Hoja1.datosFactura = x;

        $http({
          method: "POST",
          url: `${$scope.apiURL}/get_documents`,
          data: {
            "medical_account_id": x.ID_FACTURA,
            "rip_id": x.RECIBO,
            "partner_id": x.PRESTADOR.split('-')[0]
          }
        }).then(function ({ data }) {
          if (data.status != 'success') {
            swal("Mensaje", "No existen documentos", "warning").catch(swal.noop);
            return;
          }
          $scope.listadoFacturasPDF = data.result;
          $scope.openModal('modalFacturas');
          swal.close();
        });

      }

      $scope.verFacturaIMG = function (x) {
        $scope.imgFactura = null;
        const id = x.id ? x.id : x.document_id
        $scope.imgFactura = `${$scope.apiURL}/get_document?document_id=${id}`;

        var myDiv = document.getElementById('parent'); myDiv.scrollTop = 0;
        if (x.similarities) {
          $scope.similarities = x.similarities;
        }
      }

      $scope.buscarPalabrasPDF = function () {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando factura...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        // $scope.palabrasPDF
        // $scope.busquedaXPalabras = true;
        const palabrasPDF = $scope.palabrasPDF.split(",");
        $scope.imgFactura = null
        $http({
          method: "POST",
          url: `${$scope.apiURL}/search_document`,
          data: {
            "medical_account_id": $scope.Hoja1.datosFactura.ID_FACTURA,
            "rip_id": $scope.Hoja1.datosFactura.RECIBO,
            "partner_id": $scope.Hoja1.datosFactura.PRESTADOR.split('-')[0],
            "words": palabrasPDF
          }
        }).then(function ({ data }) {
          if (data.status != 'success') {
            swal("Mensaje", "No existen documentos con estas palabras", "warning").catch(swal.noop);
            return;
          }
          $scope.similarities = []
          $scope.listadoFacturasPDFPalabras = data.result;

          console.log(data)
          swal.close();
        }).catch(function (error) {
          swal("Mensaje", "No existen documentos con estas palabras", "warning").catch(swal.noop);
        });
      }

      $scope.guardarGestionFactura = function () {
        const index = $scope.List1.listadoFacturas.findIndex(e => e.RECIBO == $scope.Hoja1.datosFactura.RECIBO && e.FACTURA == $scope.Hoja1.datosFactura.FACTURA)

        $scope.List1.listadoFacturas.splice(index, 1);

        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando factura...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });

        $http({
          method: 'POST',
          url: "php/cuentasmedicas/adminfacturasdigitales.php",
          data: {
            function: "P_UI_FACTURAS_DIGITALES",
            nit: $scope.Hoja1.datosFactura.PRESTADOR.split('-')[0],
            recibo: $scope.Hoja1.datosFactura.RECIBO,
            factura: $scope.Hoja1.datosFactura.FACTURA,
            estado: $scope.Hoja1.datosFactura.ESTADO_GESTION == 'ACTIVA' ? 'G' : 'A',
            cedula: $scope.Rol_Cedula
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.codigo == 0) {
            swal("Mensaje", data.mensaje, "success").catch(swal.noop);
            $scope.closeModal();

          }
          if (data.codigo == 1) {
            swal("Mensaje", data.mensaje, "warning").catch(swal.noop);
          }
        })
      }



      $scope.descargaExcel = function () {
        var data = []

        $scope.List1.listadoFacturas.forEach(e => {
          data.push({
            "PRESTADOR": e.PRESTADOR,
            "RECIBO": e.RECIBO,
            "FACTURA": e.FACTURA,
            "VALOR_FACTURA": e.VALOR_FACTURA,
            "RESPONSABLE_ASIGNADO": e.RESPONSABLE_ASIGNADO,
            "FECHA_REGISTRO": e.OCR_FECHA_REGISTRO,
            "ESTADO_GESTION": e.ESTADO_GESTION
          })
        });

        var ws = XLSX.utils.json_to_sheet(data);
        /* add to workbook */
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
        /* write workbook and force a download */
        XLSX.writeFile(wb, "Reporte de Facturas.xlsx");
        const text = `Registros encontrados ${data.length}`
        swal('¡Mensaje!', text, 'success').catch(swal.noop);

      }



      ////////////////////////////////////////////////
      ////////////////////////////////////////////////
      ////////////////////////////////////////////////
      $scope.hoja2Limpiar = function () {
        $scope.Hoja2 = {
          Filtro: '',
          datos: null
        };
        $scope.List2 = {};

        setTimeout(() => {
          $scope.$apply();
        }, 300);
      }

      $scope.obtenerListadoFuncs = function (x) {
        // Recibe x para no mostrar swalLoading
        if (!x)
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            showConfirmButton: false,
            animation: false
          });
        $scope.List2.listadoFuncionarios = [];

        // if (!x) swal.close();
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/adminfacturasdigitales.php",
          data: {
            function: 'P_CONSULTA_PERMISOS'
          }
        }).then(function ({ data }) {
          if (!x) swal.close();
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          $scope.List2.listadoFuncionarios = data;

          $scope.Hoja2.datos = data.find(e => e.EFAC_CEDULA == $scope.Rol_Cedula)

          console.log($scope.Hoja2.datos);
          setTimeout(() => { $scope.$apply(); }, 500);
        });
      }

      $scope.agregarUsuario = function () {
        swal({
          title: 'Agregar Nuevo Usuario',
          text: 'Ingrese la cédula del funcionario',
          input: 'text',
          inputPlaceholder: 'Ingrese la cédula...',
          showCancelButton: false,
          confirmButtonText: "Aceptar",
          allowOutsideClick: false
        }).then(function (result) {
          if (result) {
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
              width: 200,
              showConfirmButton: false,
              animation: false
            });
            $http({
              method: 'POST',
              url: "php/cuentasmedicas/adminfacturasdigitales.php",
              data: {
                function: 'P_INSERTAR_USUARIO',
                cedula: result,
                responsable: $scope.Rol_Cedula
              }
            }).then(function ({ data }) {
              if (data.toString().substr(0, 3) == '<br' || data == 0) {
                swal("Error", 'Sin datos', "warning").catch(swal.noop); return
              }
              if (data.Codigo == 0) {
                swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                $scope.obtenerListadoFuncs(1);
              }
              if (data.Codigo == 1) {
                swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
              }
            });
          }
        }).catch(swal.noop);
      }

      $scope.modificarUsuario = function (x, columna, estado) {
        // swal({
        //   title: '¿Desea actualizar el estado del funcionario?',
        //   text: x.nombre,
        //   showCancelButton: true,
        //   confirmButtonText: "Confirmar",
        //   cancelButtonText: "Cancelar",
        //   allowOutsideClick: false
        // }).then(function (result) {
        //   if (result) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/adminfacturasdigitales.php",
          data: {
            function: 'P_ACTUALIZA_USUARIO',
            cedula: x.EFAC_CEDULA,
            columna,
            estado,
            responsable: $scope.Rol_Cedula
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.Codigo == 0) {
            swal("Mensaje", data.Nombre, "success").catch(swal.noop);
            $scope.closeModal();
            $scope.obtenerListadoFuncs(1);
          }
          if (data.Codigo == 1) {
            swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
          }
        });
        //   }
        // }).catch(swal.noop);
      }



      $scope.hoja3Limpiar = function () {
        $scope.Hoja3 = {
          Filtro: '',
          datos: null
        };
        $scope.List3 = {};

        setTimeout(() => {
          $scope.$apply();
        }, 300);
      }

      $scope.obtenerListadoIPS = function (x) {
        // Recibe x para no mostrar swalLoading
        if (!x)
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            showConfirmButton: false,
            animation: false
          });
        $scope.List3.listadoIPS = [];

        // if (!x) swal.close();
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/adminfacturasdigitales.php",
          data: {
            function: 'P_CONSULTA_PERMISOS_IPS'
          }
        }).then(function ({ data }) {
          if (!x) swal.close();
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          $scope.List3.listadoIPS = data;

          $scope.Hoja3.datos = data.find(e => e.EFAC_CEDULA == $scope.Rol_Cedula)

          console.log($scope.Hoja2.datos);
          setTimeout(() => { $scope.$apply(); }, 500);
        });
      }

      $scope.agregarIPS = function () {
        swal({
          title: 'Agregar Nuevo IPS',
          text: 'Ingrese el nit',
          input: 'text',
          inputPlaceholder: 'Ingrese la cédula...',
          showCancelButton: false,
          confirmButtonText: "Aceptar",
          allowOutsideClick: false
        }).then(function (result) {
          if (result) {
            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
              width: 200,
              showConfirmButton: false,
              animation: false
            });
            $http({
              method: 'POST',
              url: "php/cuentasmedicas/adminfacturasdigitales.php",
              data: {
                function: 'P_INSERTAR_USUARIO_IPS',
                nit: result,
                responsable: $scope.Rol_Cedula
              }
            }).then(function ({ data }) {
              if (data.toString().substr(0, 3) == '<br' || data == 0) {
                swal("Error", 'Sin datos', "warning").catch(swal.noop); return
              }
              if (data.Codigo == 0) {
                swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                $scope.obtenerListadoIPS(1);
              }
              if (data.Codigo == 1) {
                swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
              }
            });
          }
        }).catch(swal.noop);
      }

      $scope.modificarIPS = function (x, columna, estado) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/cuentasmedicas/adminfacturasdigitales.php",
          data: {
            function: 'P_ACTUALIZA_USUARIO_IPS',
            nit: x.EFAC_NIT,
            columna,
            estado,
            responsable: $scope.Rol_Cedula
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.Codigo == 0) {
            swal("Mensaje", data.Nombre, "success").catch(swal.noop);
            $scope.closeModal();
            $scope.obtenerListadoIPS(1);
          }
          if (data.Codigo == 1) {
            swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
          }
        });
      }



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
        setTimeout(() => { document.querySelector(`#${modal}`).style.top = 1 + '%'; }, 600);
      }
      $scope.closeModal = function () {
        $(".modal").modal("close");
      }

      $scope.SetTab = function (x) {
        $scope.Tabs = x;
        if (x == 1 && $scope.List1.listadoFacturas == undefined) {
          $scope.obtenerListadoFacturas()
        }
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

    }]);
