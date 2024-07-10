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
      $scope.apiURL = 'http://172.52.11.25:5000/api';

      $scope.cargarRips();

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

        soporteB64: '',
        archivo: '',


      };


      if ($scope.datosRips.estadoFacturas == 'X' || $scope.datosRips.estadoFacturas == 'A') {
        $scope.verFacturasEstadoApi()
      }

      setTimeout(() => {
        $scope.verFacturasListar()
      }, 1000);

    }

    $scope.verFacturasListar = function () {
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
      $scope.contFacturasUnicaCargadas = 0;

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
        url: "php/cuentasmedicas/radicaciondigital.php",
        data: {
          function: 'P_OBTENER_FACTURAS',
          nit: $scope.Rol_Nit,
          recibo: $scope.datosRips.codigoRecibo
        }
      }).then(function ({ data }) {
        if (data.toString().substr(0, 3) == '<br' || data == 0) {
          swal("Mensaje", 'No existen facturas para mostrar', "warning").catch(swal.noop); return
        }
        if (data.length) {
          var validadoSinId = 0;

          $scope.Vista = 1;
          $scope.listaFacturas = data;
          data.forEach(e => {
            $scope.datosRips.totalFacturas += parseFloat(e.VALOR_FACTURA);

            if ((e.OCR_ESTADO_FACTURA == 'V' && e.OCR_ID_FACTURA == null) || e.OCR_ESTADO_FACTURA == 'A') {
              validadoSinId++
            }

            const estadoMap = {
              'E': 'espera',
              'A': 'analizando',
              'V': 'validado',
              'X': 'error'
            };
            const estado = e.OCR_ESTADO_FACTURA;
            $scope.contadoresFacturas[estadoMap[estado]]++;
          });

          setTimeout(() => {
            if ($scope.contadoresFacturas.error > 0) {

              $scope.contFacturasUnicaCargadas = 0;
              $scope.cargarFileFacturasUnica()
            }
            if (validadoSinId > 0) { //Validamos que no existan facturas en estado V y sin ID asignado
              $scope.verFacturasEstadoApi()
              setTimeout(() => {
                $scope.verFacturasListar()
              }, 2000);
            }
          }, 1500);

          $scope.datosRips.totalFacturas = $scope.FormatPesoNumero($scope.datosRips.totalFacturas)
          swal.close()
        }
      })
    }

    $scope.verFacturasEstadoApi = function () {
      $http({
        method: "POST",
        url: `${$scope.apiURL}/get_medical_accounts`,
        data: {
          "rips_id": $scope.datosRips.codigoRecibo,
          "partner_id": $scope.Rol_Nit
        }
      }).then(function ({ data }) {
        if (data.status == 'success') {
          // swal("Mensaje", "No existen documentos", "warning").catch(swal.noop);
          // return;
          data.result.forEach(element => {
            element.nit = $scope.Rol_Nit;
            element.rips_id = $scope.datosRips.codigoRecibo;
            delete element.create_date;
            delete element.name;
          });

          $http({
            method: "POST",
            url: `api/ocr/p_actualiza_id_estado_rips_ocr.php`,
            data: data.result
          }).then(function ({ data }) {
            if (data.estado != $scope.datosRips.estadoFacturas) {

            }
          })

          console.log(data.result)

        }
        // $scope.listadoFacturasPDF = data.result;
        swal.close();
      });


    }



    $scope.cargarFacturasTotal = function () {

      var facturas = []

      $scope.listaFacturas.forEach(e => {
        facturas.push({
          codigo_factura: e.CODIGO_FACTURA, tipo_afiliado: e.AFILIADO_TIPO_DOC, documento_afiliado: e.AFILIADO_NUMERO, codigo_autorizacion: e.AFILIADO_AUTORIZACION, valor_total: e.VALOR_FACTURA
        })
      });

      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando facturas...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false
      });


      var form = new FormData();
      form.append("file", document.querySelector('#fileFacturasZip').files[0]);
      form.append("rips", $scope.datosRips.codigoRecibo);
      form.append("partner_id", $scope.Rol_Nit);
      form.append("rips_data", JSON.stringify(facturas));

      var settings = {
        "url": `${$scope.apiURL}/upload_rips_files_zip`,
        "method": "POST",
        "timeout": 0,
        "headers": {
          "X-API-Key": "{{token}}"
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
      };

      $.ajax(settings).done(function (response) {
        console.log(response);
        if (JSON.parse(response).status == "success") {

          //Guardar estado en BD
          $http({
            method: 'POST',
            url: "php/cuentasmedicas/radicaciondigital.php",
            data: {
              function: "P_ACTUALIZA_ESTADO_VAL",
              nit: $scope.Rol_Nit,
              recibo: $scope.datosRips.codigoRecibo,
              facturas: JSON.stringify(facturas),
              cantidad: facturas.length
            }
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) == '<br' || data == 0) {
              swal("Error", "Cargar archivo nuevamente", "warning").catch(swal.noop); return
            }
            if (data.codigo == 0) {
              swal("Mensaje", data.mensaje, "success").catch(swal.noop);
              $scope.cargarRips()
              $scope.Atras()
            }
            if (data.codigo == 1) {
              swal("Mensaje", "Cargar archivo nuevamente", "warning").catch(swal.noop);
            }

          })

        } else {
          swal("Mensaje", "Cargar archivo nuevamente", "warning").catch(swal.noop);
        }

      });


    }

    $scope.verFacturaPDF = function (x) {
      $scope.imgFactura = null;
      $scope.palabrasPDF = '';

      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando factura...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false
      });

      console.log(x)

      var CanvasH = (window.innerHeight - 27);
      $scope.heightCanvas = CanvasH;

      $scope.datosFactura = x;

      $http({
        method: "POST",
        url: `${$scope.apiURL}/get_documents`,
        data: {
          "medical_account_id": x.OCR_ID_FACTURA,
          "rip_id": $scope.datosRips.codigoRecibo,
          "partner_id": $scope.Rol_Nit
        }
      }).then(function ({ data }) {
        if (data.status != 'success') {
          swal("Mensaje", "No existen documentos", "warning").catch(swal.noop);
          return;
        }
        $scope.listadoFacturasPDF = data.result;
        $scope.similarities = []
        $scope.openModal('modalFacturas');
        swal.close();
      });

    }

    $scope.verFacturaIMG = function (x) {
      $scope.similarities = []
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
          "medical_account_id": $scope.datosFactura.OCR_ID_FACTURA,
          "rip_id": $scope.datosRips.codigoRecibo,
          "partner_id": $scope.Rol_Nit,
          "words": palabrasPDF
        }
      }).then(function ({ data }) {
        if (data.status != 'success') {
          swal("Mensaje", "No existen documentos con estas palabras", "warning").catch(swal.noop);
          return;
        }

        // $scope.busquedaXPalabras = true;
        $scope.similarities = []
        $scope.listadoFacturasPDFPalabras = data.result;


        console.log(data)
        // $scope.listadoFacturasPDF = data.result;
        // $scope.openModal('modalFacturas');
        swal.close();
      }).catch(function (error) {
        swal("Mensaje", "No existen documentos con estas palabras", "warning").catch(swal.noop);
      });
    }

    //////////////////////////////////////////////////
    //////////////////////////////////////////////////


    //////////////////////////////////////////////////



    document.querySelector('#fileFacturasZip').addEventListener('change', function (e) {
      $scope.datosRips.soporteB64 = "";
      setTimeout(() => { $scope.$apply(); }, 500);
      var files = e.target.files;
      if (files.length != 0) {
        for (let i = 0; i < files.length; i++) {
          const x = files[i].name.split('.');
          if (x[x.length - 1].toUpperCase() == 'ZIP') {
            if (files[i].size < 55485760 && files[i].size > 0) {
              $scope.datosRips.soporteB64 = files[i].name;
              // $scope.getBase64(files[i]).then(function (result) {
              //   $scope.datosRips.soporteExt = x[x.length - 1].toLowerCase();
              //   $scope.datosRips.soporteB64 = result;
              //   $scope.datosRips.archivo = files[i];
              //   setTimeout(function () { $scope.$apply(); }, 300);
              // });
            } else {
              document.querySelector('#fileFacturasZip').value = '';
              swal('Advertencia', '¡El archivo seleccionado excede el peso máximo posible (55MB)!', 'info');
            }
          } else {
            document.querySelector('#fileFacturasZip').value = '';
            swal('Advertencia', '¡El archivo seleccionado debe ser .ZIP!', 'info');
          }
        }
      }
    });

    $scope.cargarFileFacturasUnica = function () {
      $scope.contFacturasUnicaCargadas = 0;
      document.querySelectorAll('.fileFacturasUnica').forEach((filef, index) => filef.addEventListener('change', function (e) {
        var files = e.target.files;
        if ($scope.listaFacturas[index].soporteB64 && files) {
          $scope.contFacturasUnicaCargadas--
        }
        $scope.listaFacturas[index].soporteB64 = '';

        setTimeout(() => { $scope.$apply(); }, 500);
        if (files.length != 0) {
          for (let i = 0; i < files.length; i++) {
            const x = files[i].name.split('.');
            if (x[x.length - 1].toUpperCase() == 'PDF') {
              if (files[i].size < 10485760 && files[i].size > 0) {
                $scope.listaFacturas[index].soporteB64 = files[i].name;
                $scope.contFacturasUnicaCargadas++
                setTimeout(() => { $scope.$apply(); }, 500);
              } else {
                e.target.value = '';
                swal('Advertencia', '¡El archivo seleccionado excede el peso máximo posible (10MB)!', 'info');
              }
            } else {
              e.target.value = '';
              swal('Advertencia', '¡El archivo seleccionado debe ser .PDF!', 'info');
            }
          }
        }
        // else {
        //   $scope.contFacturasUnicaCargadas--
        // }

      })
      )

    }


    $scope.cargarFacturasUnicas = function () {
      // var encontrados = 0;

      if (!$scope.contFacturasUnicaCargadas) {
        swal("Mensaje", "Cargue los documentos", "warning").catch(swal.noop);
        return;
      }

      const text = `Se cargaran (${$scope.contFacturasUnicaCargadas})`
      swal({
        title: "¿Está seguro que desea guardar las facturas?",
        text,
        type: "question",
        showCancelButton: true,
        allowOutsideClick: false
      }).catch(swal.noop)
        .then((willDelete) => {
          if (willDelete) {

            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando facturas...</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
            });

            $scope.respuestaFacturas = []
            var promesas = [];
            $scope.listaFacturas.forEach((e, index) => {
              if (e.soporteB64) {

                const medical_account = e.OCR_ID_FACTURA == null ? '' : e.OCR_ID_FACTURA
                var form = new FormData();
                form.append("file", document.querySelectorAll('.fileFacturasUnica')[index].files[0]);
                form.append("rips", $scope.datosRips.codigoRecibo);
                form.append("partner_id", $scope.Rol_Nit);
                form.append("medical_account", medical_account);

                var settings = {
                  "url": `${$scope.apiURL}/upload_single_file`,
                  "method": "POST",
                  "timeout": 0,
                  "headers": {
                    "X-API-Key": "{{token}}"
                  },
                  "processData": false,
                  "mimeType": "multipart/form-data",
                  "contentType": false,
                  "data": form
                };
                promesas.push($scope.guardarFacturaUnica(settings, e));
              }
            })

            // all
            Promise.all(promesas).then(response => {
              // Cuando todas las promesas se resuelvan, imprimimos las respuestas

              response.forEach(element => {
                if (element != true && !JSON.parse(element).status) {
                  console.log(JSON.parse(element))
                  $scope.respuestaFacturas.push(JSON.parse(element))
                }
              });
              setTimeout(() => { $scope.$apply(); }, 500);
              setTimeout(() => {
                if ($scope.respuestaFacturas.length > 0) {
                  var facts = '';

                  $scope.respuestaFacturas.forEach(x => {
                    facts = facts + x.CODIGO_FACTURA + ', '
                  });

                  const text = "ocurrio un error al cargar las siguientes facturas: (" + facts.substring(0, facts.length - 2) + "), validar nuevamente";
                  $scope.cargarRips();
                  swal({
                    title: "Mensaje",
                    text,
                    type: "info",
                    showCancelButton: false,
                  }).catch(swal.noop)
                } else {
                  $scope.cargarRips()
                  $scope.Atras()
                  const text = "Facturas cargadas Correctamente";
                  swal({
                    title: "Mensaje",
                    text,
                    type: "success",
                    showCancelButton: false,
                  }).catch(swal.noop)
                  setTimeout(() => { $scope.$apply(); }, 500);
                }
              }, 1000);
              // Aquí puedes imprimir cualquier mensaje que desees después de recibir todas las respuestas
              console.log('Todas las peticiones completadas');
            });

          }
        })
    }

    // "LGFM1194520, LGFM1194520, LGFM1194520, LGFM1194520, LGFM1194520, "


    $scope.guardarFacturaUnica = function (settings, factura) {
      const promise = new Promise(function (resolve) {
        $.ajax(settings).done(function (response) {
          // console.log(response);
          if (JSON.parse(response).status == "success") {
            //Guardar estado en BD
            factura.medical_account = JSON.parse(response).medical_account

            $http({
              method: 'POST',
              url: "php/cuentasmedicas/radicaciondigital.php",
              data: {
                function: "P_ACTUALIZA_ESTADO_VAL_UNICAS",
                nit: $scope.Rol_Nit,
                recibo: $scope.datosRips.codigoRecibo,
                factura: JSON.stringify(factura),
                cantidad: 1
              }
            }).then(function ({ data }) {
              if (data.toString().substr(0, 3) == '<br' || data == 0) {
                resolve(`{"status":false,"CODIGO_FACTURA":"${factura.CODIGO_FACTURA}"}`)
              }
              if (data.codigo == 0) {
                resolve(true)
              }
              if (data.codigo == 1) {
                resolve(`{"status":false,"CODIGO_FACTURA":"${factura.CODIGO_FACTURA}"}`)
              }
            })
          } else {
            resolve(`{"status":false,"CODIGO_FACTURA":"${factura.CODIGO_FACTURA}"}`)
          }
        }).fail(function (data) {
          resolve(`{"status":false,"CODIGO_FACTURA":"${factura.CODIGO_FACTURA}"}`)
        });
      })
      return promise
    }


    $scope.imprimir = function () {
      console.log($scope.listaFacturas)
    }

    $scope.getBase64 = function (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
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
      $scope.datosRips.soporteB64 = "";
      document.querySelector('#fileFacturasZip').value = '';
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
      setTimeout(() => { document.querySelector(`#${modal}`).style.top = 1 + '%'; }, 600);
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
