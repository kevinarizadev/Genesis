'use strict';

angular.module('GenesisApp')

  .controller('adminAutProgramdasController', ['$scope', '$http', '$filter', '$timeout', function ($scope, $http, $filter, $timeout) {


    $(document).ready(function () {
      $("#modalSeleccionips").modal();
      $("#modalproducto").modal();
      $("#modalhistorico").modal();







    });

    //variables de control

    $scope.tabI = true;
    $scope.tabIV = false;
    $scope.activeI = 'active final white-text';
    $scope.activeIV = 'none';
    $scope.activeIcolor = 'foot4';
    $scope.activeIVcolor = '';
    $scope.nametab = 'Autorización';

    // variables TAB I
    //secciones de ng hide
    $scope.inactiveseccion1tab1 = false;
    $scope.inactiveseccion4tab4 = false;
    $scope.activetipotabI = true;
    $scope.activetipotabIV = true;
    $scope.productosagregadostabIV = [];
    $scope.productosagregadostabIVC = [];

    $scope.nofindproductstabI = false;
    $scope.nofindproductstabIV = false;
    $scope.inactimiprestab1 = true;
    $scope.inactimiprestab4 = true;
    $scope.inactivetagmipres = true;
    $scope.inactivetagctc = true;
    $scope.inactivetagtutela = true;
    $scope.inactivetagsiniestro = true;
    $scope.nameservicio = 'de orden'
    $scope.inactivebarrapro = true;



    // wizard

    $scope.invsolicitudtabI = true;
    $scope.invproductotabI = true;
    $scope.invfinalizartabI = true;
    $scope.invfinalizartabIV = true;


    $scope.novedades = null;
    $scope.datosAfiModalNov = null;
    $scope.tutelaParam = null;
    $scope.siniestroParam = null;
    $scope.maxDate = null;
    $scope.documentosAfiliado = null;

    $scope.filterOptions = 'AFILIADO';
    $scope.vdocafiliado;
    $scope.vnumeroaut;
    $scope.vubicacionaut;
    $scope.vnitips;


    $scope.configTabs = { tab: 'I' };
    $scope.configTimeLime = {
      step1: false, step2: false
    }

    $scope.dias = null;
    $scope.accionmodalproducto = null;


    // funciones de control

    $scope.getIpsProgramadas = function () {
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false
      });
      var tempempresa = 1;
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'p_lista_ips_en_programadas', empresa: tempempresa }
      }).then(function (response) {

        $scope.listaIps = response.data;

        $scope.initPaginacionips($scope.listaIps);
        swal.close();

      });

    }


    $scope.listCups = null;
    $scope.tempIps = null;
    $scope.accionIps = function (ips) {
      console.log(ips);
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false
      });
      $scope.tab.number = 1;
      $scope.tempIps = ips;
      $scope.filtroCups = [];
      $scope.listCupsTemp = [];
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'p_lista_cups_ips_en_programadas', ips: ips.NIT }
      }).then(function (response) {
        $scope.listCups = response.data;
        $scope.listCupsTemp = response.data;
        swal.close();
      });
    }
    $scope.lengthcups = 0;
    $scope.getCupsIps = function () {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'p_lista_cups_ips_en_programadas', ips: $scope.tempIps.NIT }
      }).then(function (response) {
        $scope.listCups = response.data;
        $scope.listCupsTemp = response.data;
        console.log($scope.listCups.length);
        $scope.lengthcups = response.data.length;


      });
      return $scope.lengthcups;

    }




    $scope.acciontempcups = null;
    $scope.tempProducto = null;
    $scope.temdias = '';
    $scope.accionCups = function (cups, accion) {
      console.log('cups:', cups);
      console.log('accion:', accion);
      $scope.acciontempcups = cups;
      if (accion == 'D') {
        swal({
          title: 'Confirmar',
          text: "¿Deseas INACTIVAR  a " + cups.NOMBRE_CUPS + " de los servicios de autorizaciones Programadas para esta IPS?",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result) {
            console.log("elimina esto");

            setTimeout(function () {
              $scope.json = {
                "REGIMEN_OLD": cups.REGIMEN,
                "CONTRATO_OLD": cups.CONTRATO,
                "UBICACION_OLD": cups.UBICACION,
                "COD_CUPS_OLD": cups.COD_CUPS,
                "DIAS": cups.DIAS,
                "NIT": $scope.tempIps.NIT,
                "ACCION": 'D',
                "COD_CUPS_NEW": cups.COD_CUPS
              }

              console.log($scope.json);
              $scope.savecups($scope.json, 'D');
            }, 100);


          }
        }).catch(function (error) {

        });
      }
      if (accion == 'U') {
        setTimeout(() => {
          $scope.accionmodalproducto = 'U';
          $scope.getdias();
          $scope.tempProducto = Object.assign({}, $scope.acciontempcups);
          console.log('$scope.tempProducto.DIAS', $scope.tempProducto.DIAS);
          $('#menu').val($scope.tempProducto.DIAS.trim()).trigger('change');
          console.log($("#menu").val());
        }, 10);

        $scope.openmodals('modalproducto');
      }
      if (accion == 'C') {
        $scope.accionmodalproducto = 'C';
        $scope.listarContratos($scope.tempIps.NIT, cups.REGIMEN == 'SUBSIDIADO' ? 'S' : 'C');
        $scope.openmodals('modalproducto');
      }
    }
    $scope.inactivebarraips = true;

    $scope.buscarIps = function (ips) {

      if (ips != "" || ips != undefined) {
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
          data: { function: 'obtenerNombreIps', ips: ips }
        }).then(function (response) {
          if (response.data["0"].Codigo == '0') {
            swal('Importante', 'IPS no encontrada', 'info');
            $scope.inactivebarraips = true;
          } else {
            $scope.listIpsmodal = response.data;
            $scope.inactivebarraips = false;
          }
        })
      } else {
        swal('Importante', 'El campo  de texto no puede estar vacio!', 'info');
      }

    }

    $scope.buscarpro = '';
    $scope.buscarProducto = function (pro) {
      console.log($scope.tempIps);
      $scope.tempProducto = null;
      $scope.inactivebarrapro = true;
      if (pro.length >= 3) {

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
          url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
          data: { function: 'p_obtener_producto_adm_prog', codigo: $scope.buscarpro, nit: $scope.tempIps.Codigo ? $scope.tempIps.Codigo : $scope.tempIps.NIT }
        }).then(function (response) {
          swal.close();
          $scope.listProductos = [];
          console.log(response.data);
          if (response.data["0"].CODIGO == '-1') {
            swal('Importante', response.data["0"].NOMBRE, 'info');
            $scope.inactivebarrapro = true;
          } else if (response.data["0"].CODIGO == '0') {
            swal('Importante', response.data["0"].NOMBRE, 'info');
            $scope.inactivebarrapro = true;
          } else {
            $scope.listProductos = response.data;
            $scope.inactivebarrapro = false;
          }
          $scope.getdias();
        })
      } else {
        swal('Importante', 'El campo  de texto no puede estar vacio!', 'info');
      }
    }

    $scope.init = function () {
      $scope.tabI = true;
      $scope.tabIV = false;
      $scope.activeI = 'active final';
      $scope.activeIV = 'none';
      $scope.activeIcolor = '';
      $scope.activeIVcolor = '';
    }

    $scope.setTab = function (opcion) {

      $scope.init();

      switch (opcion) {
        case '1':
          $scope.tabI = true;
          $scope.tabIV = false;
          $scope.activeI = 'active final white-text';
          $scope.activeIV = 'none';
          $scope.activeIcolor = 'foot4';
          $scope.nametab = 'Bolsa de Autorizaciones';
          $scope.tipoaut = '1';
          $scope.getIpsProgramadas();
          break;
        case '4':

          $scope.tabI = false;
          $scope.tabIV = true;
          $scope.activeI = 'none';
          $scope.activeIVcolor = 'foot4';
          $scope.activeIV = 'active final white-text';
          $scope.nametab = 'Consulta de Autorización';
          $scope.tipoaut = '4';
          break;
        default:
      }
    }
    $scope.setTab('1');




    $scope.valservicio = false;
    $scope.valespecialidad = false;
    $scope.openmodals = function (tipo) {
      $scope.buscard1 = "";
      $scope.buscard2 = "";
      $scope.buscarpro = "";
      $scope.buscarprohist = "";
      switch (tipo) {

        case 'modalSeleccionips':
          $scope.listIpsmodal = [];
          $("#modalSeleccionips").modal("open");
          break;
        case 'modalproducto':
          $scope.tempProducto = null;
          $scope.listProductos = [];
          $scope.inactivebarrapro = true;
          $("#modalproducto").modal("open");
          break;
        case 'modalhistorico':
          $scope.listProductosHist = [];
          $("#modalhistorico").modal("open");
          break;

        default:
      }
    }




    $scope.closemodals = function (tipo) {
      switch (tipo) {
        case 'modalSeleccionips':
          $("#modalSeleccionips").modal("close");
          break;
        case 'modalproducto':
          $scope.inactivebarrapro = true;
          $scope.tempProducto = null;
          $scope.acciontempcups = null;
          $scope.dias = null;
          $("#modalproducto").modal("close");
          break;
        case 'modalhistorico':
          $("#modalhistorico").modal("close");
          break;
        default:
      }
    }


    $scope.tempIps = null;
    $scope.seleccionarips = function (data, index) {
      $scope.tempIps = data;
      $('#I' + index).addClass('arr');
      $('#I' + index).siblings().removeClass('arr');
      // swal({
      //   title: 'Confirmar',
      //   text: "¿Deseas SELECCIONAR  a " + data.Nombre + " para que preste el servicio de autorizaciones Programadas?",
      //   type: 'question',
      //   showCancelButton: true,
      //   confirmButtonColor: '#3085d6',
      //   cancelButtonColor: '#d33',
      //   confirmButtonText: 'Confirmar',
      //   cancelButtonText: 'Cancelar'
      // }).then((result) => {
      //   if (result) {
      //   console.log("elimina esto");
      //   }
      // }).catch(function (error) {

      //  });
      // var text = '';
      // if ($scope.tipoaut == '1') {
      //   if (tipo == 'S') {
      //     $scope.solicitud.ipssolicita = data.Nombre;
      //     $scope.solicitud.ipscodsolicita = data.Codigo;
      //     text = 'Ips Solicitante.';
      //     $scope.buscarEspecialidades(data.Codigo);
      //     swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
      //   } else {
      //     $scope.solicitud.ipsasignada = data.Nombre;
      //     $scope.solicitud.ipscodasignada = data.Codigo;
      //     $scope.solicitud.ipsasignadadireccion = data.Codigo_Dir;
      //     text = 'Ips Asignada.';
      //     swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
      //     $scope.cargarContratoTabI($scope.solicitud.ipscodasignada, $scope.regimenafitabI, 'tab1');//faltan parametros
      //   }
      // }




    }
    $scope.tempProducto = null;
    $scope.seleccionarproducto = function (data, index) {
      console.log(data);
      $scope.tempProducto = null;
      $scope.tempProducto = data;
      $('#P' + index).addClass('arr');
      $('#P' + index).siblings().removeClass('arr');
      $scope.inactivebarrapro = true;



    }

    $scope.getdias = function () {
      $scope.dias = [];
      $http({
        method: 'GET',
        url: "json/dias_admin.json",
      }).then(function (response) {
        $scope.dias = response.data;
      });
    }






    $scope.initPaginacion = function (info) {
      $scope.listaSolicitudesprogTemp = info;
      $scope.currentPage = 0;
      $scope.pageSize = 10;
      $scope.valmaxpag = 10;
      $scope.pages = [];
      $scope.configPages();
    }
    $scope.configPages = function () {
      $scope.pages.length = 0;
      var ini = $scope.currentPage - 4;
      var fin = $scope.currentPage + 5;
      if (ini < 1) {
        ini = 1;
        if (Math.ceil($scope.listaSolicitudesprogTemp.length / $scope.pageSize) > $scope.valmaxpag)
          fin = 10;
        else
          fin = Math.ceil($scope.listaSolicitudesprogTemp.length / $scope.pageSize);
      } else {
        if (ini >= Math.ceil($scope.listaSolicitudesprogTemp.length / $scope.pageSize) - $scope.valmaxpag) {
          ini = Math.ceil($scope.listaSolicitudesprogTemp.length / $scope.pageSize) - $scope.valmaxpag;
          fin = Math.ceil($scope.listaSolicitudesprogTemp.length / $scope.pageSize);
        }
      }
      if (ini < 1) ini = 1;
      for (var i = ini; i <= fin; i++) {
        $scope.pages.push({
          no: i
        });
      }
      if ($scope.currentPage >= $scope.pages.length)
        $scope.currentPage = $scope.pages.length - 1;
      if ($scope.currentPage < 0) { $scope.currentPage = 0; }
    }
    $scope.setPage = function (index) {
      $scope.currentPage = index - 1;
      if ($scope.pages.length % 2 == 0) {
        var resul = $scope.pages.length / 2;
      } else {
        var resul = ($scope.pages.length + 1) / 2;
      }
      var i = index - resul;
      if ($scope.listaSolicitudesprogTemp.length % $scope.pageSize == 0) {
        var tamanomax = parseInt($scope.listaSolicitudesprogTemp.length / $scope.pageSize);
      } else {
        var tamanomax = parseInt($scope.listaSolicitudesprogTemp.length / $scope.pageSize) + 1;
      }
      var fin = ($scope.pages.length + i) - 1;
      if (fin > tamanomax) {
        fin = tamanomax;
        i = tamanomax - 9;
      }
      if (index > resul) {
        $scope.calcular(i, fin);
      }
    }
    $scope.paso = function (tipo) {
      if (tipo == 'next') {
        var i = $scope.pages[0].no + 1;
        if ($scope.pages.length > 9) {
          var fin = $scope.pages[9].no + 1;
        } else {
          var fin = $scope.pages.length;
        }

        $scope.currentPage = $scope.currentPage + 1;
        if ($scope.listaSolicitudesprogTemp.length % $scope.pageSize == 0) {
          var tamanomax = parseInt($scope.listaSolicitudesprogTemp.length / $scope.pageSize);
        } else {
          var tamanomax = parseInt($scope.listaSolicitudesprogTemp.length / $scope.pageSize) + 1;
        }
        if (fin > tamanomax) {
          fin = tamanomax;
          i = tamanomax - 9;
        }
      } else {
        var i = $scope.pages[0].no - 1;
        if ($scope.pages.length > 9) {
          var fin = $scope.pages[9].no - 1;
        } else {
          var fin = $scope.pages.length;
        }

        $scope.currentPage = $scope.currentPage - 1;
        if (i <= 1) {
          i = 1;
          fin = $scope.pages.length;
        }
      }
      $scope.calcular(i, fin);
    }
    $scope.calcular = function (i, fin) {
      if (fin > 9) {
        i = fin - 9;
      } else {
        i = 1;
      }
      $scope.pages = [];
      for (i; i <= fin; i++) {
        $scope.pages.push({
          no: i
        });
      }
    }

    $scope.filterAut = function (val) {
      $scope.listaSolicitudesprogTemp = $filter('filter')($scope.listaSolicitudesprog, val);
      if ($scope.listaSolicitudesprogTemp.length > 0) {
        $scope.setPage(1);
      }
      $scope.configPages();
    }

    //Filter y table ips
    $scope.initPaginacionips = function (info) {
      $scope.listaIpsprogTemp = info;
      $scope.currentPageips = 0;
      $scope.pageSizeips = 10;
      $scope.valmaxpagips = 10;
      $scope.pagesips = [];
      $scope.configPagesips();
    }
    $scope.configPagesips = function () {
      $scope.pagesips.length = 0;
      var ini = $scope.currentPageips - 4;
      var fin = $scope.currentPageips + 5;
      if (ini < 1) {
        ini = 1;
        if (Math.ceil($scope.listaIpsprogTemp.length / $scope.pageSizeips) > $scope.valmaxpagips)
          fin = 10;
        else
          fin = Math.ceil($scope.listaIpsprogTemp.length / $scope.pageSizeips);
      } else {
        if (ini >= Math.ceil($scope.listaIpsprogTemp.length / $scope.pageSizeips) - $scope.valmaxpagips) {
          ini = Math.ceil($scope.listaIpsprogTemp.length / $scope.pageSizeips) - $scope.valmaxpagips;
          fin = Math.ceil($scope.listaIpsprogTemp.length / $scope.pageSizeips);
        }
      }
      if (ini < 1) ini = 1;
      for (var i = ini; i <= fin; i++) {
        $scope.pagesips.push({
          no: i
        });
      }
      if ($scope.currentPageips >= $scope.pagesips.length)
        $scope.currentPageips = $scope.pagesips.length - 1;
      if ($scope.currentPageips < 0) { $scope.currentPageips = 0; }
    }
    $scope.setPageips = function (index) {
      $scope.currentPageips = index - 1;
      if ($scope.pagesips.length % 2 == 0) {
        var resul = $scope.pagesips.length / 2;
      } else {
        var resul = ($scope.pagesips.length + 1) / 2;
      }
      var i = index - resul;
      if ($scope.listaIpsprogTemp.length % $scope.pageSize == 0) {
        var tamanomax = parseInt($scope.listaIpsprogTemp.length / $scope.pageSizeips);
      } else {
        var tamanomax = parseInt($scope.listaIpsprogTemp.length / $scope.pageSizeips) + 1;
      }
      var fin = ($scope.pagesips.length + i) - 1;
      if (fin > tamanomax) {
        fin = tamanomax;
        i = tamanomax - 9;
      }
      if (index > resul) {
        $scope.calcularips(i, fin);
      }
    }
    $scope.pasoips = function (tipo) {
      if (tipo == 'next') {
        var i = $scope.pagesips[0].no + 1;
        if ($scope.pagesips.length > 9) {
          var fin = $scope.pagesips[9].no + 1;
        } else {
          var fin = $scope.pagesips.length;
        }

        $scope.currentPageips = $scope.currentPageips + 1;
        if ($scope.listaIpsprogTemp.length % $scope.pageSize == 0) {
          var tamanomax = parseInt($scope.listaIpsprogTemp.length / $scope.pageSizeips);
        } else {
          var tamanomax = parseInt($scope.listaIpsprogTemp.length / $scope.pageSizeips) + 1;
        }
        if (fin > tamanomax) {
          fin = tamanomax;
          i = tamanomax - 9;
        }
      } else {
        var i = $scope.pagesips[0].no - 1;
        if ($scope.pagesips.length > 9) {
          var fin = $scope.pagesips[9].no - 1;
        } else {
          var fin = $scope.pagesips.length;
        }

        $scope.currentPageips = $scope.currentPageips - 1;
        if (i <= 1) {
          i = 1;
          fin = $scope.pagesips.length;
        }
      }
      $scope.calcularips(i, fin);
    }
    $scope.calcularips = function (i, fin) {
      if (fin > 9) {
        i = fin - 9;
      } else {
        i = 1;
      }
      $scope.pagesips = [];
      for (i; i <= fin; i++) {
        $scope.pagesips.push({
          no: i
        });
      }
    }

    $scope.filterIps = function (val) {
      $scope.listaIpsprogTemp = $filter('filter')($scope.listaIps, val);
      if ($scope.listaIpsprogTemp.length > 0) {
        $scope.setPageips(1);
      }
      $scope.configPagesips();
    }


    $scope.updateConfigTabs = function (config, event) {
      switch (config) {
        case 'Ips':
          $scope.configTabs.tab = 'I';
          $scope.configTimeLime.step1 = false;
          break;
        case 'Cups':
          if (event == 'S') {
            if (($scope.tempIps == null || $scope.tempIps == '')) {
              $scope.configTabs.tab = 'I';
              $scope.configTimeLime.step1 = false;
            } else {
              $scope.configTabs.tab = 'C';
              $scope.configTimeLime.step1 = true;
            }
          }
          break;

        case 'Finalizar':
          if (event == 'S') {
            if (($scope.tempProducto == null || $scope.tempProducto == '')) {
              $scope.configTabs.tab = 'C';
              $scope.configTimeLime.step1 = true;
            } else {

              $scope.json = {
                "REGIMEN_NEW": $scope.tempProducto.REGIMEN,
                "CONTRATO_NEW": $scope.tempProducto.CONTRATO,
                "UBICACION_NEW": $scope.tempProducto.UBI_CONTRATO,
                "COD_CUPS_OLD": "",
                "DIAS": $scope.tempProducto.DIAS,
                "NIT": $scope.tempIps.Codigo,
                "ACCION": "I",
                "COD_CUPS_NEW": $scope.tempProducto.CODIGO
              }
              console.log($scope.json);
              $scope.savecups($scope.json, 'N');
            }
          }
          break;

      }
    }

    $scope.saveproductomodal = function (params) {
      console.log(params);
      console.log('tempProducto_', $scope.tempProducto);
      if ($scope.accionmodalproducto == "I") {
        console.log("Inserta el cups");
        $scope.json = {
          "REGIMEN_NEW": $scope.tempProducto.REGIMEN,
          "CONTRATO_NEW": $scope.tempProducto.CONTRATO,
          "UBICACION_NEW": $scope.tempProducto.UBI_CONTRATO,
          "COD_CUPS_OLD": "",
          "DIAS": $scope.tempProducto.DIAS,
          "NIT": $scope.tempIps.NIT,
          "ACCION": "I",
          "COD_CUPS_NEW": $scope.tempProducto.CODIGO
        }
      }
      if ($scope.accionmodalproducto == "U") {
        console.log("Actualiza el cups");
        $scope.json = {
          "REGIMEN_NEW": $scope.tempProducto.REGIMEN,
          "CONTRATO_NEW": $scope.tempProducto.CONTRATO,
          "UBICACION_NEW": $scope.acciontempcups.UBICACION,
          "COD_CUPS_OLD": $scope.acciontempcups.COD_CUPS,
          "REGIMEN_OLD": $scope.acciontempcups.REGIMEN,
          "CONTRATO_OLD": $scope.acciontempcups.CONTRATO,
          "UBICACION_OLD": $scope.acciontempcups.UBICACION,
          "DIAS": $('#menu').val(),
          "NIT": $scope.tempIps.NIT,
          "ACCION": "U",
          "COD_CUPS_NEW": $scope.tempProducto.COD_CUPS
        }
      }

      if ($scope.accionmodalproducto == "C") {
        console.log("Cambia contrato");
        console.log($scope.tempProducto);
        console.log($scope.acciontempcups);
        $scope.json = {
          "REGIMEN_OLD": $scope.acciontempcups.REGIMEN,
          "CONTRATO_OLD": $scope.acciontempcups.CONTRATO,
          "UBICACION_OLD": $scope.acciontempcups.UBICACION,
          "REGIMEN_NEW": $scope.acciontempcups.REGIMEN,
          "CONTRATO_NEW": $scope.tempProducto.NUMERO,
          "UBICACION_NEW": $scope.tempProducto.UBICACION,
          "DIAS": $scope.acciontempcups.DIAS,
          "NIT": $scope.tempIps.NIT,
          "ACCION": "U"
        }
        console.log($scope.json);
      }

      if ($scope.accionmodalproducto != 'C') {
        $scope.savecups($scope.json, 'M');
      }

      if ($scope.accionmodalproducto == 'C') {
        $scope.changeContrato($scope.json);
      }
    }

    $scope.savecups = function (params, typecall) {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'p_ui_cups_ips_en_programadas', cups: JSON.stringify(params) }
      }).then(function (response) {
        console.log(response.data);

        if (response.data.Codigo == '0') {
          swal('Completado', response.data.Nombre, 'success');

          if (typecall == "N") {
            $scope.filtroIps = "";
            setTimeout(function () {
              $scope.tempIps = null;
              $scope.tempIps = null;
              $scope.tempProducto = null;
              $scope.buscard2 = "";
              $scope.inactivebarraips = true;
              $scope.listIpsmodal = [];
              $scope.buscarpro = "";
              $scope.inactivebarrapro = true;
              $scope.listProductos = [];
              $scope.configTabs = { tab: 'I' };
              $scope.configTimeLime = {
                step1: false, step2: false
              }
              $scope.retroceder();
            }, 100);
          }

          if (typecall == "M") {
            $scope.closemodals("modalproducto");
            $scope.getCupsIps();
          }

          if (typecall == "D") {
            // $scope.retroceder();
            $scope.getCupsIps();
          }


        }
        if (response.data.Codigo == '1') {
          swal('No Completado', response.data.Nombre, 'error');
        }

      });
    }



    $scope.changeContrato = function (params) {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'p_u_cambia_contrato_ips_programadas', cups: JSON.stringify(params) }
      }).then(function (response) {
        console.log(response.data);

        if (response.data.Codigo == '0') {
          swal('Completado', response.data.Nombre, 'success');
          $scope.getCupsIps();
          $scope.closemodals('modalproducto');
        }
        if (response.data.Codigo == '1') {
          swal('No Completado', response.data.Nombre, 'error');
        }

      });
    }






    $scope.ocultaripstatus = "";
    $scope.tab = { number: 0 };
    $scope.viewsolpendiente = false;
    $scope.retroceder = function () {
      console.log("$scope.tab.number", $scope.tab.number);
      if ($scope.tab.number > 0) {
        if ($scope.tab.number == 1) {
          $scope.tab.number = 0;
          $scope.lengthcups = $scope.getCupsIps();
          console.log('$scope.lengthcups', $scope.lengthcups);
          if ($scope.lengthcups == 0) {
            $scope.getIpsProgramadas();
          }
        } else if ($scope.tab.number == 2) {
          $scope.tab.number = 0;
          $scope.filtroIps = "";
          setTimeout(function () {
            $scope.tempIps = null;
            $scope.tempIps = null;
            $scope.tempProducto = null;
            $scope.buscard2 = "";
            $scope.inactivebarraips = true;
            $scope.listIpsmodal = [];
            $scope.buscarpro = "";
            $scope.inactivebarrapro = true;
            $scope.listProductos = [];
            $scope.configTabs = { tab: 'I' };
            $scope.configTimeLime = {
              step1: false, step2: false
            }
          }, 100);

          $scope.getIpsProgramadas();
        }

      }
    }



    $scope.filterCups = function (val) {
      $scope.listCupsTemp = $filter('filter')($scope.listCups, val);
      if ($scope.listCupsTemp.length < 0) {
        $scope.listCupsTemp = [];
      }
    }


    $scope.buscarHistorico = function (params) {

      // $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AUTPRO.p_lista_historico_cups_en_programadas(:v_pnit,:v_pcod_producto,:v_json_row); end;');  
      // oci_bind_by_name($consulta,':v_pnit',$request->nit);   
      // oci_bind_by_name($consulta,':v_pcod_producto',$request->cod_producto);  

      console.log($scope.tempIps);
      $scope.tempProducto = null;
      $scope.inactivebarrapro = true;
      if ($scope.buscarprohist.length >= 3) {

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
          url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
          data: { function: 'p_lista_historico_cups_en_programadas', cod_producto: $scope.buscarprohist, nit: $scope.tempIps.Codigo ? $scope.tempIps.Codigo : $scope.tempIps.NIT }
        }).then(function (response) {
          swal.close();
          console.log(response.data);
          $scope.listProductosHist = [];
          if (response.data["0"].CODIGO == '-1') {
            swal('Importante', response.data["0"].NOMBRE, 'info');
            $scope.inactivebarrapro = true;
          } else if (response.data["0"].CODIGO == '0') {
            swal('Importante', response.data["0"].NOMBRE, 'info');
            $scope.inactivebarrapro = true;
          } else {
            $scope.listProductosHist = response.data;
            $scope.inactivebarrapro = false;
          }
        })
      } else {
        swal('Importante', 'El campo  de texto no puede estar vacio!', 'info');
      }
    }



    $scope.listacontratos = [];
    $scope.listarContratos = function (ips, regimen) {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'obtenerContratos', nit: ips, regimen: regimen }
      }).then(function (response) {

        // if (response.data["0"].CODIGO == '1') {
        // $scope.listacontratos = response.data;            

        $scope.listacontratos = response.data.filter(item => item.NUMERO != $scope.acciontempcups.CONTRATO)
        // $scope.inactivebarrapro =false;
        console.log($scope.listacontratos);


        // } else {
        // $scope.listServicios = '';
        // swal({ title: "Completado", text: 'IPS Seleccionada no tiene contrato', showConfirmButton: true, type: "success" });
        // }
      })
    }
    $scope.JSONToCSVConvertor = function () {

      var tempjson = [];
      tempjson = $scope.listCupsTemp;
          
      tempjson = JSON.stringify(tempjson);
      //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
      var arrData = typeof tempjson != 'object' ? JSON.parse(tempjson) : tempjson;

      var CSV = '';

      //This condition will generate the Label/Header
      if ($scope.tempIps.NIT) {
        var row = "";

        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {

          //Now convert each value to string and comma-seprated
          row += index + ',';
        }

        row = row.slice(0, -1);

        //append Label row with line break
        CSV += row + '\r\n';
      }

      //1st loop is to extract each row
      for (var i = 0; i < arrData.length; i++) {
        var row = "";

        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
          row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);

        //add a line break after each row
        CSV += row + '\r\n';
      }

      if (CSV == '') {
        alert("Invalid data");
        return;
      }

      //Generate a file name
      var fileName = "";
      //this will remove the blank-spaces from the title and replace it with an underscore
      fileName += 'EXPORTADO_' + $scope.tempIps.NIT.replace(/ /g, "_");

      //Initialize file format you want csv or xls
      var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

      // Now the little tricky part.
      // you can use either>> window.open(uri);
      // but this will not work in some browsers
      // or you will not get the correct file extension    

      //this trick will generate a temp <a /> tag
      var link = document.createElement("a");
      link.href = uri;

      //set the visibility hidden so it will not effect on your web-layout
      link.style = "visibility:hidden";
      link.download = fileName + ".csv";


      //this part will append the anchor tag and remove it after automatic click
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }



  }])

  .filter('inicio', function () {
    return function (input, start) {
      if (input != undefined && start != NaN) {
        start = +start;
        return input.slice(start);
      } else {
        return null;
      }
    }

  });