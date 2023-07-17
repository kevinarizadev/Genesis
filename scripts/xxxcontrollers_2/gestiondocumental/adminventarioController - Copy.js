'use strict';
angular.module('GenesisApp')
  .controller('adminventarioController', ['$scope', '$http', 'altocostoHttp', 'ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller', '$rootScope', 'afiliacionHttp', '$window', '$interval',
    function ($scope, $http, altocostoHttp, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, afiliacionHttp, $window, $interval) {

      $(document).ready(function () {
        $scope.setTab(1);
        $scope.tab = 1;
        $('input.currency').currencyInput();
        $scope.hojas1 = false;
        var fechahoy = new Date();
        $scope.h1fecha = fechahoy;
        $scope.h2fecha = fechahoy;
        $scope.h2fecharead = true;
        $scope.h3fecha = fechahoy;
        $scope.h3fecha_entrega = fechahoy;
        $scope.h1minima = fechahoy;
        $scope.h1maxima = fechahoy;
        $scope.fechahoy = '0' + fechahoy.getUTCDate() + '/' + '0' + (fechahoy.getMonth() + 1) + '/' + fechahoy.getFullYear();
        $scope.h2status = "N";
        $('.tooltipped').tooltip();
        ////////////////////////////////////////BOTONES////////////////////////////////////////
        $scope.MP_BtnAgAc_OREQ = true;
        $scope.MP_BtnAcAg_OREQ = false;
        $scope.MP_BtnAgAc_OORD = true;
        $scope.MP_BtnAgAc_ENTREGA = true;
        $scope.MP_BtnAcAg_ENTREGA = false;
        $scope.h1_BtnGuardar = true;
        $scope.h2_BtnGuardar = true;
        //////////////////////////////////////////////////////////////////////////////////////
        $scope.Btn_Ver_Productos_OREQS = true;
        $scope.Btn_Ver_Productos_OORDS = true;
        $scope.Btn_Ver_Productos_ENTREGA = true;
        $('#tabla_modal_OREQ tbody').on('click', 'tr', function () {
          if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
          }
          else {
            $('tr.selected').removeClass('selected');
            $(this).addClass('selected');
          }
        });
        $('#tabla_modal_OORD tbody').on('click', 'tr', function () {
          if ($(this).hasClass('Aquino')) {
          } else {
            if ($(this).hasClass('selected')) {
              $(this).removeClass('selected');
            }
            else {
              $('tr.selected').removeClass('selected');
              $(this).addClass('selected');
            }
          }
        });
        $('#tabla_modal_ENTREGA tbody').on('click', 'tr', function () {
          if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
          }
          else {
            $('tr.selected').removeClass('selected');
            $(this).addClass('selected');
          }
        });
        //////////////////////////////////////////////////TABLE SELECT//////////////////////////////////////////////////
        ///////////////////////////FUNCIONES READY/////////////////////////////////


        $scope.Consultar_Cedula_Rol();

        $timeout(function () {
          $scope.H1_RESTART_TODO(1);
        }, 1000);
        /////////////////////////////
        $scope.Unidades();
        $scope.Calc_Anio();
        $scope.Conceptos_Reqs();
        var aseo = ['icon-coffee vamous', 'icon-food vamous', 'icon-cafe vamous', 'icon-food-1 vamous', 'icon-trash vamous', 'icon-food-1 vamous', 'icon-trash-4 vamous'], q = 0;
        var botiquin = ['icon-medkit vamous', ' icon-ambulance vamous', 'icon-heartbeat vamous'], w = 0;
        var publicidad = ['icon-picture-4 vamous', ' icon-camera-5 vamous', 'icon-camera-alt vamous', 'icon-video-circled vamous', 'icon-video-chat vamous', 'icon-comment-alt-1 vamous'], e = 0;
        var papeleria = ['icon-book-1 vamous', 'icon-pencil-1 vamous', 'icon-scissors vamous', 'icon-folder-4 vamous', ' icon-edit-3 vamous'], r = 0;
        function changeBackground() {
          $('#AC').attr('class', aseo[q++]); q = q % aseo.length;
          $('#BOT').attr('class', botiquin[w++]); w = w % botiquin.length;
          $('#PA').attr('class', papeleria[r++]); r = r % papeleria.length;
          $('#PB').attr('class', publicidad[e++]); e = e % publicidad.length;
        }
        setInterval(changeBackground, 3000);
      });//READY     
      ////
      (function ($) {
        $.fn.currencyInput = function () {
          this.each(function () {
            var wrapper = $("<div class='currency-input' />");
            $(this).wrap(wrapper);
            $(this).before("<span class='currency-symbol'>$</span>");
          });
        };
      })(jQuery);
      $scope.setTab = function (newTab) {
        $scope.tab = newTab;
        $(".tabI").removeClass("tabactiva");
        $(".tabII").removeClass("tabactiva");
        $(".tabIII").removeClass("tabactiva");
        switch (newTab) {
          case 1:
            $(".tabI").addClass("tabactiva");
            break;
          case 2:
            $(".tabII").addClass("tabactiva");
            break;
          case 3:
            $(".tabIII").addClass("tabactiva");
            break;
          default:
        }
      }
      $scope.isSet = function (tabNum) {
        return $scope.tab === tabNum;
      }
      $scope.Consultar_Cedula_Rol = function () {
        $http({
          method: 'POST',
          url: "php/gestiondocumental/adminventario.php",
          data: {
            function: 'obtenercedula'
          }
        }).then(function (response) {
          $scope.Rol_Cedula = response.data;
        });
      }
      $scope.Unidades = function () {
        $scope.Array_Unidades = [
          { Codigo: 0, Unidad: 'INDEFINIDO' },
          { Codigo: 1, Unidad: 'UNIDAD' },
          { Codigo: 2, Unidad: 'CAJA' },
          { Codigo: 3, Unidad: 'RESMA' },
          { Codigo: 4, Unidad: 'TACO' },
          { Codigo: 5, Unidad: 'ROLLO' },
          { Codigo: 6, Unidad: 'LIBRA' },
          { Codigo: 7, Unidad: 'BOLSA' },
          { Codigo: 8, Unidad: 'TARRO' },
          { Codigo: 9, Unidad: 'FRASCO' },
          { Codigo: 10, Unidad: 'PAQUETE' },
          { Codigo: 11, Unidad: 'PAR' },
          { Codigo: 12, Unidad: 'METRO' },
          { Codigo: 13, Unidad: 'GALON' },
          { Codigo: 14, Unidad: 'TALONARIO' },
          { Codigo: 15, Unidad: 'TARJETA' },
          { Codigo: 16, Unidad: 'KILOS' },
          { Codigo: 17, Unidad: 'PLIEGOS' },
          { Codigo: 18, Unidad: 'GRAMOS' },
          { Codigo: 19, Unidad: 'MILILITROS' },
          { Codigo: 20, Unidad: 'ONZAS' },
          { Codigo: 21, Unidad: 'METROS CUBICOS' },
          { Codigo: 22, Unidad: 'MILIGRAMOS' },
        ];
      }

      $scope.Conceptos_Reqs = function () {
        $http({
          method: 'POST',
          url: "php/gestiondocumental/adminventario.php",
          data: {
            function: 'obtenerconceptos'
          }
        }).then(function (response) {
          $scope.ReqsConp = response.data;
        });
      }

      $scope.MP_Mostrar_Unidad = function (valor) {
        for (var i = 0; i < $scope.Array_Unidades.length; i++) {
          if ($scope.Array_Unidades[i].Codigo == valor) {
            return $scope.Array_Unidades[i].Unidad;
          }
        }
      }

      $scope.Calc_Anio = function () {
        var fecha = new Date();
        var x = fecha.getFullYear();
        x = x.toString().substr(2, 4);
        $scope.EST_Anio_Array = [];
        for (let i = 11; i <= x; i++) {
          if ($scope.EST_Anio_Array.length >= 1) {
            $scope.EST_Anio_Array.push({ pos: i });
          } else {
            $scope.EST_Anio_Array = [{ pos: i }];
          }
        }
      }
      ///////////////////////////////////////////////////////////////////
      $scope.DB_h2fecha = function () {
        if ($scope.h2fechaoreq != null) {
          $scope.h2fecharead = !$scope.h2fecharead;
        }
      }
      $scope.CH_h2fecha = function () {
        var fechahoy = new Date();
        if ($scope.h2fecha > fechahoy) {
          $scope.h2fecha = new Date();
          Materialize.toast('¡La fecha no puede ser mayor a la fecha actual!', 1500); $('.toast').addClass('default-background-dark');
        }
        if ($scope.h2fecha < $scope.h2fechaoreq) {
          $scope.h2fecha = new Date();
          Materialize.toast('¡La fecha no puede ser menor a la fecha del requerimiento!', 1500); $('.toast').addClass('default-background-dark');
        }
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////MODALS//////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.Abrir_modal = function () {
        (function () {
          $('#modal').modal();
        }());
        $('#modal').modal('open');
      }
      $scope.Abrir_modalESTAD = function () {
        $scope.EST_Mes = '';
        $scope.EST_Anio = '';
        (function () {
          $('#modalESTAD').modal();
        }());
        $('#modalESTAD').modal('open');
      }
      $scope.Abrir_modal_Crear_Producto = function () {
        (function () {
          $('#modal_Crear_Producto').modal();
        }());
        $('#modal_Crear_Producto').modal('open');
      }
      $scope.Abrir_modalPRO_OREQ = function () {
        (function () {
          $('#modalPRO_OREQ').modal();
        }());
        $('#modalPRO_OREQ').modal('open');
      }
      $scope.Abrir_modalPRO_OREQ_CONF = function () {
        (function () {
          $('#modalPRO_OREQ_CONF').modal();
        }());
        $('#modalPRO_OREQ_CONF').modal('open');
      }
      $scope.Abrir_modalPRO_OORD = function () {
        if ($scope.h2proveedor != null && $scope.h2proveedor != '' && $scope.h2proveedor != undefined) {
          (function () {
            $('#modalPRO_OORD').modal();
          }());
          $('#modalPRO_OORD').modal('open');
        } else {
          Materialize.toast('¡Primero seleccione un proveedor!', 1500); $('.toast').addClass('default-background-dark');
          document.getElementById("h2proveedor").focus();
        }
      }
      $scope.Abrir_modalPRO = function () {
        (function () {
          $('#modalPRO').modal();
        }());
        $('#modalPRO').modal('open');
      }
      $scope.Abrir_modalPRO_ENTREGA = function () {
        (function () {
          $('#modalPRO_ENTREGA').modal();
        }());
        $('#modalPRO_ENTREGA').modal('open');
      }
      $scope.Abrir_modal_Entregas = function () {
        $scope.MPEntregas = null;
        $scope.MPFiltrar_Entregas='';
        $timeout(function () {
          (function () {
            $('#modal_Entregas').modal();
          }());
          $('#modal_Entregas').modal('open');
          $http({
            method: 'POST',
            url: "php/gestiondocumental/adminventario.php",
            data: {
              function: 'listar_entregas',
              codigo: $scope.rol
            }
          }).then(function (response) {
            $scope.MPEntregas = response.data;
          });
        }, 500);
      }
      $scope.Abrir_modalACAS = function () {
        $scope.Array_ACAS = null;
        $scope.Array_ACAS_Count = 0;
        (function () {
          $('#modalACAS').modal();
        }());
        $('#modalACAS').modal('open');
        $http({
          method: 'POST',
          url: "php/gestiondocumental/adminventario.php",
          data: {
            function: 'BuscarAcasEntrega',
            codigo: '',
            ubi: ($scope.rol == 1) ? '' : $scope.rol,
            cedula: $scope.Rol_Cedula
          }
        }).then(function (response) {
          if (response.data.length == 0) {
            $scope.Array_ACAS = [];
            Materialize.toast('¡No existen registros!', 1500); $('.toast').addClass('default-background-dark');
          }
          if (response.data.length > 0) {
            $scope.Array_ACAS = response.data;
          }
          $scope.Array_ACAS.forEach(element => {
            if (element.UBICACION == $scope.rol && $scope.rol == 1) {
              $scope.Array_ACAS_Count += 1;
            }
            if (element.UBICACION.substr(0, 1) == $scope.rol && $scope.rol == 8) {
              $scope.Array_ACAS_Count += 1;
            }
            if (element.UBICACION.substr(0, 2) == $scope.rol && $scope.rol != 8 && $scope.rol != 1) {
              $scope.Array_ACAS_Count += 1;
            }
          });
        });
      }
      $scope.Sel_ACAS = function (acas, ubi) {
        $('#modalACAS').modal('close');
        $http({
          method: 'POST',
          url: "php/gestiondocumental/adminventario.php",
          data: {
            function: 'BuscarAcasEntrega',
            codigo: acas,
            ubi: ubi,
            cedula: $scope.Rol_Cedula
          }
        }).then(function (response) {
          if (response.data.length == 0) {
            Materialize.toast('¡No existen registros!', 1500); $('.toast').addClass('default-background-dark');
          }
          if (response.data.length > 0) {
            $scope.h3cedula_soli = response.data[0].CEDULA;
            $scope.h3ubicacion = response.data[0].UBICACION;
            $scope.h3mesadeayuda = response.data[0].ACAS;
            $scope.h3funcionario = response.data[0].SOLICITANTE;
            $scope.h3mesadeayudades = response.data[0].DESCRIPCION;
          }
        });
      }
      $scope.Cerrar_modal = function () {
        $('#modal').modal('close');
      }
      $scope.Cerrar_modalESTAD = function () {
        $('#modalESTAD').modal('close');
      }
      $scope.Cerrar_modal_Crear_Producto = function () {
        $('#modal_Crear_Producto').modal('close');
      }
      $scope.Cerrar_modalPRO_OREQ = function () {
        $('#modalPRO_OREQ').modal('close');
      }
      $scope.Cerrar_modalPRO_OREQ_CONF = function () {
        $('#modalPRO_OREQ_CONF').modal('close');
      }
      $scope.Cerrar_modalPRO_OORD = function () {
        $('#modalPRO_OORD').modal('close');
      }
      $scope.Cerrar_modalPRO = function () {
        $('#modalPRO').modal('close');
      }
      $scope.Cerrar_modalPRO_ENTREGA = function () {
        $('#modalPRO_ENTREGA').modal('close');
      }
      $scope.Cerrar_modal_Entregas = function () {
        $('#modal_Entregas').modal('close');
      }
      $scope.Estado = function (est) {
        if (est == 'ACTIVO' || est == 'PENDIENTE POR CARGAR') {
          return { 'background-color': 'limegreen' };
        }
        if (est == 'PROCESADO' || est == 'CARGADO A LA BODEGA') {
          return { 'background-color': 'green' };
        }
        if (est == 'TERMINADO') {
          return { 'background-color': 'darkblue' };
        }
        if (est == 'ANULADO') {
          return { 'background-color': 'gray' };
        }
        if (est == 'AUTORIZACION PARCIAL' || est == 'RECIBO PARCIAL') {
          return { 'background-color': 'lightskyblue' };
        }
        if (est == 'PARCIALMENTE CARGADO') {
          return { 'background-color': 'white', 'color': 'black'};
        }
      }
      //////////////////////////////////////////////////FORMATO A NUMERO//////////////////////////////////////////////////
      $scope.format = function (NID) {
        const input = document.getElementById('' + NID + '');
        var num = input.value.replace(/\,/g, '');
        if (!isNaN(num)) {
          input.value = num;
        }
        else {
          input.value = input.value.replace(/[^\d\.]*/g, '');
        }
      }
      $scope.formatNumero = function (NID) {
        const input = document.getElementById('Producto_' + NID + '');
        var num = input.value.replace(/[^0-9]/g, '');
        if (!isNaN(num)) {
          input.value = num;
        }
        else {
          input.value = input.value.replace(/[^0-9]*/g, '');
        }
      }
      //////////////////////////////////////////////////FORMATO A PESO//////////////////////////////////////////////////      
      $scope.formatPeso = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/\-/g, '');
        valor = valor.replace(/[a-zA-Z]/g, '');
        valor = valor.replace(/[^0-9-,]/g, '');
        valor = valor.replace(/\./g, '');
        var array = null;
        var regex = new RegExp("\\,");
        if (!regex.test(valor)) {
          valor = valor.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
          valor = valor.split('').reverse().join('').replace(/^[\.]/, '');
        } else {
          array = valor.toString().split(',');
          if (array.length > 2) {
            input.value = 0;
          } else {
            array[0] = array[0].toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
            array[0] = array[0].split('').reverse().join('').replace(/^[\.]/, '');
            if (array[1].length > 2) {
              array[1] = array[1].substr(0, 2);
            }
          }
        }
        if (!regex.test(valor)) {
          input.value = valor;
        } else {
          if (valor == ',') {
            input.value = 0;
          } else {
            if (valor.substr(0, 1) == ',') {
              input.value = 0 + ',' + array[1];
            } else {
              input.value = array[0] + ',' + array[1];
            }
          }
        }
      }
      $scope.formatPeso2 = function (num) {
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
      }
      //////////////////////////////////////////////////SCROLL//////////////////////////////////////////////////      
      $scope.ScrollDown_H = function (HOJA) {
        $timeout(function () {
          document.getElementById('collapsible-header-h' + HOJA).scrollIntoView({ block: 'start', behavior: 'smooth' });
        }, 100);
      }
      $scope.$watch('H3_Hojas', function () {
        $scope.ScrollDown_H(3);
      }, true);
      $scope.ObtenerConsecutivo = function (TIPO) {
        $http({
          method: 'POST',
          url: "php/gestiondocumental/adminventario.php",
          data: {
            function: 'obtenerconsec',
            TIPO: TIPO
          }
        }).then(function (response) {
          if (response.data.length == 1) {
            if (TIPO == 'OREQ') {
              $scope.h1Num_Req = response.data[0].CON;
            }
            if (TIPO == 'OORD') {
              $scope.h2Num_Ord = response.data[0].CON;
            }
          }
        });
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////HOJA 1//////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.$watch('MPCantidadtotal_OREQS', function () {
        if ($scope.MPCantidadtotal_OREQS != undefined && parseInt($scope.MPCantidadtotal_OREQS) == 0) {
          $('.Btn_Ver_Productos_OREQS_ANIMACION').removeClass('btnOpacity');
          $('.Btn_Ver_Productos_OREQS_ANIMACION').addClass('shake');
        }
        if ($scope.MPCantidadtotal_OREQS != undefined && parseInt($scope.MPCantidadtotal_OREQS) > 0) {
          $('.Btn_Ver_Productos_OREQS_ANIMACION').removeClass('shake');
          $('.Btn_Ver_Productos_OREQS_ANIMACION').addClass('btnOpacity');
        }
      }, true);
      $scope.H1_DataTable_Buscar = function (numero) {
        $scope.H1_RESTART_VAR();
        $scope.h1respuesta = 0;
        $http({
          method: 'POST',
          url: "php/gestiondocumental/adminventario.php",
          data: {
            function: 'buscaroreq',
            codigo: parseInt(numero)
          }
        }).then(function (response) {
          var respuesta = response.data;
          $scope.dpto = respuesta.UBICACION;
          var aFecha2 = respuesta.FECHA.split('/');
          $scope.h1fecha = new Date('"' + aFecha2[2] + "/" + aFecha2[1] + "/" + aFecha2[0] + '"');
          $scope.h1concepto = respuesta.CONCEPTO;
          $scope.h1estado = respuesta.ESTADO;
          $scope.h1solicitante = respuesta.SOLICITANTE;
          $scope.MPCantidadtotal_OREQS = respuesta.CANTIDAD;
          $http({
            method: 'POST',
            url: "php/gestiondocumental/adminventario.php",
            data: {
              function: 'obtenersolicitante',
              codigo: $scope.h1solicitante
            }
          }).then(function (response) {
            document.getElementById("H1_SCROLL").scrollIntoView({ block: 'start', behavior: 'smooth' });
            if (response.data == 0) {
              Materialize.toast('¡El solicitante no está activo!', 2500); $('.toast').addClass('default-background-dark');
            }
            if (response.data.length == 1 && response.data != 0) {
              $scope.h1solicitante = response.data[0].CODIGO + ' - ' + response.data[0].NOMBRE;
              $scope.h1solicitante_SAVE = response.data[0].CODIGO + ' - ' + response.data[0].NOMBRE;
              $scope.h1solicitante_COD = response.data[0].CODIGO;
            }
          });
          $scope.h1observacion2 = respuesta.OBSERVACIONDES;
          $scope.h1Num_Req = respuesta.NUMERO;
          if (respuesta.ESTADO == 'A') {
            $scope.h1_BtnGuardar = false;
            $scope.h1_Req_Cerrado = false;
            $("#h1concepto").prop("disabled", false);
            $("#h1estado").prop("disabled", false);
            $("#h1solicitante").prop("disabled", false);
            $("#h1observacion2").prop("disabled", false);
            $scope.Btn_Ver_Productos_OREQS = true;
          } else {
            $scope.h1_BtnGuardar = false;
            $scope.h1_Req_Cerrado = true;
            $("#h1concepto").prop("disabled", true);
            $("#h1estado").prop("disabled", true);
            $("#h1solicitante").prop("disabled", true);
            $("#h1observacion2").prop("disabled", true);
            if (respuesta.PRODUCTOS.length == 0) {
              $scope.Btn_Ver_Productos_OREQS = false;
            } else {
              $scope.Btn_Ver_Productos_OREQS = true;
            }
          }
          $scope.h1respuesta = 1;
          if (respuesta.ESTADO == 'P') {
            $scope.h1estado_P = true;
          }
          $scope.MPproductos_OREQ_lista = respuesta.PRODUCTOS;
        })
      }


      $scope.Do_Imprimir = function (NUM, TIPO, CED_SOL, UBI_SOL) {
        if (TIPO == 'Oreq') {
          $window.open('views/gestiondocumental/soporte/info_oreq.php?num=' + NUM + '&ced=' + $scope.Rol_Cedula, '_blank', "width=1080,height=1100");
        }
        if (TIPO == 'Oord') {
          $window.open('views/gestiondocumental/soporte/info_oord.php?num=' + NUM + '&ced=' + $scope.Rol_Cedula, '_blank', "width=1080,height=1100");
        }
        if (TIPO == 'Entrega') {
          $window.open('views/gestiondocumental/soporte/info_entrega.php?acas=' + NUM + '&ced_sol=' + CED_SOL + '&ubi_sol=' + UBI_SOL + '&bod=' + $scope.rol
            , '_blank', "width=1080,height=1100");
        }
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////REQUERIMIENTOS////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.H1_RESTART_VAR = function () {
        $scope.h1concepto = 'RA'; $scope.h1estado = 'A';
        $scope.h1solicitante = '';
        $scope.h1solicitante_COD = null;
        $scope.h1observacion2 = '';
        $scope.h1estado_P = false;
        //
        $scope.MPproducto_Oreq = null;
        $scope.MPproducto_Oreq_COD = null;
        $scope.MPproducto_Oreq_RENGLON = null;
        $scope.Lista_MD_Productos_Oreq = null;
        $scope.Filter_MD_Productos_Oreq = null;
        $scope.MPcantidad_Oreq = parseInt(1);
        $("#MPunidad_Oreq").val('');
        $scope.MP_BtnAgAc_OREQ = true;
        $scope.MP_BtnAcAg_OREQ = false;
        //
        if ($('#Datatable_OREQS tr').hasClass('selected') == true) {
          $('tr.selected').removeClass('selected');
        }
      }
      $scope.H1_RESTART_TODO = function (CON) {
        var fechahoy = new Date();
        $scope.h1Num_Req = '';
        $scope.h1fecha = fechahoy;
        $scope.h1concepto = 'RA'; $scope.h1estado = 'A';
        $scope.h1solicitante = '';
        $scope.h1observacion2 = '';
        $scope.h1_BtnGuardar = true;
        $scope.Btn_Ver_Productos_OREQS = true;
        $scope.MPproductos_OREQ_lista = null;
        $scope.MPCantidadtotal_OREQS = 0;
        $("#h1concepto").prop("disabled", false);
        $("#h1estado").prop("disabled", false);
        $("#h1solicitante").prop("disabled", false);
        $("#h1observacion2").prop("disabled", false);
        $scope.MPproducto_Oreq = null;
        $scope.MPproducto_Oreq_COD = null;
        $scope.MPproducto_Oreq_RENGLON = null;
        $scope.Lista_MD_Productos_Oreq = null;
        $scope.Filter_MD_Productos_Oreq = null;
        $scope.MPcantidad_Oreq = parseInt(1);
        $("#MPunidad_Oreq").val('');
        $scope.MP_BtnAgAc_OREQ = true;
        $scope.MP_BtnAcAg_OREQ = false;
        //
        $scope.h1respuesta = 0;
        $scope.h1estado_P = false;
        $scope.H1_MPNovedad = false;
        $scope.ObtenerConsecutivo('OREQ');
        //
        $http({
          method: 'POST',
          url: "php/gestiondocumental/adminventario.php",
          data: {
            function: 'obtenercodigo'
          }
        }).then(function (response) {
          $scope.rol = response.data[0].CODIGO;
          if ($scope.rol.substr(0, 2) == 80 || $scope.rol.substr(0, 1) == 8) {
            $scope.rol = '8';
          }
          if ($scope.rol.substr(0, 2) != 80 && $scope.rol.substr(0, 1) != 8 && $scope.rol != 1) {
            $scope.rol = $scope.rol.substr(0, 2);
          }
          $scope.h1codmuni = response.data[0].CODIGO;
          $scope.h1dpto = response.data[0].NOMBRE;
          $scope.h3dpto = response.data[0].NOMBRE;
          if ($scope.h2codmuni == undefined) {
            $scope.h2codmuni = $scope.h1codmuni;
            $scope.h2dpto = $scope.h1dpto;
          }
          if ($scope.h3responsable != undefined) {
            $scope.h1solicitante = $scope.h3responsable;
            $scope.h1solicitante_SAVE = $scope.h3responsable;
            $scope.h1solicitante_COD = $scope.Rol_Cedula;
          } else {
            $http({
              method: 'POST',
              url: "php/gestiondocumental/adminventario.php",
              data: {
                function: 'obtenersolicitante',
                codigo: $scope.Rol_Cedula
              }
            }).then(function (response) {
              if (response.data.length == 1) {
                $scope.h1solicitante = response.data[0].CODIGO + ' - ' + response.data[0].NOMBRE;
                $scope.h1solicitante_SAVE = response.data[0].CODIGO + ' - ' + response.data[0].NOMBRE;
                $scope.h1solicitante_COD = response.data[0].CODIGO;
                if ($scope.h3responsable == undefined) {
                  $scope.h3responsable = $scope.h1solicitante;
                }
              }
            });
          }
          ///////
          if (CON != undefined) {
            $scope.H1_ACTUALIZAR_LISTA_OREQS();
            $scope.Ver_Bodegas();
            $scope.H3_ACTUALIZAR_LISTA_GESTIONES();
          }
          if ($scope.rol == 1) {
            if (CON != undefined) {
              $scope.H2_RESTART_TODO(0);
              $scope.quitar_oord = true;
            }
          } else {
            $scope.quitar_oord = false;
          }
        });
      }
      $scope.H1_ACTUALIZAR_LISTA_OREQS = function () {
        if ($scope.Datatable_OREQS != undefined) {
          $scope.Datatable_OREQS.destroy();
          $scope.Array_OREQS = null;
        }
        $http({
          method: 'POST',
          url: "php/gestiondocumental/adminventario.php",
          data: {
            function: 'listar_oreqs',
            codigo: ($scope.rol == 1) ? '' : $scope.rol
          }
        }).then(function (response) {
          if (response.data.length == 0) {
            Materialize.toast('¡No existen registros!', 1500); $('.toast').addClass('default-background-dark');
          }
          if (response.data.length > 0) {
            $scope.Array_OREQS = response.data;
            $timeout(function () {
              $scope.Datatable_OREQS = $('#Datatable_OREQS').DataTable({
                language: {
                  "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
                },
                lengthMenu: [[10, 20, 50, -1], [10, 20, 50, 'Todas']],
                pagingType: "numbers",
                dom: 'lBsfrtip',
                select: true,
                buttons: [
                  {
                    extend: 'excelHtml5',
                    title: 'Modulo Inventario - GenesisWeb',
                    messageTop: 'Listado de requerimientos',
                  }],
              });
              $scope.Datatable_OREQS.draw();

            }, 100);//END TIMEOUT
            //////////////////////////////////////////
          }
        });
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////COMPRA//////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.Find_Solicitante_enter = function (keyEvent) {
        if (keyEvent.which === 13)
          $scope.H1_Buscar_Solicitante();
      }
      $scope.H1_Buscar_Solicitante = function () {
        if ($scope.h1solicitante == '' || $scope.h1solicitante == null || $scope.h1solicitante == undefined) {
          Materialize.toast('¡Digite la cédula del funcionario!', 1500); $('.toast').addClass('default-background-dark');
          $scope.h1solicitante = $scope.h1solicitante_SAVE;
        } else {
          if ($scope.h1solicitante != $scope.h1solicitante_SAVE) {
            if ($scope.h1solicitante.length < 3) {
              Materialize.toast('Digite al menos 3 caracteres!', 1500); $('.toast').addClass('default-background-dark');
            } else {
              $http({
                method: 'POST',
                url: "php/gestiondocumental/adminventario.php",
                data: {
                  function: 'obtenersolicitante',
                  codigo: $scope.h1solicitante
                }
              }).then(function (response) {
                if (response.data == 0) {
                  Materialize.toast('¡No existen registros del funcionario solicitante!', 1500); $('.toast').addClass('default-background-dark');
                  $scope.h1solicitante = '';
                  $scope.h1solicitante_SAVE = '';
                  $scope.h1solicitante_COD = '';
                  $scope.Filter_H1_Solicitante = null;
                }
                if (response.data.length == 1 && response.data != 0) {
                  $scope.h1solicitante = response.data[0].CODIGO + ' - ' + response.data[0].NOMBRE;
                  $scope.h1solicitante_SAVE = response.data[0].CODIGO + ' - ' + response.data[0].NOMBRE;
                  $scope.h1solicitante_COD = response.data[0].CODIGO;
                  $scope.Filter_H1_Solicitante = null;
                }
                if (response.data.length > 1) {
                  $scope.H1_Lista_Solicitante = response.data;
                  $scope.Complete_H1_Solicitante($scope.h1solicitante);
                }
              });
            }
          } else {
            Materialize.toast('¡El funcionario a consultar es el mismo al seleccionado!', 1500); $('.toast').addClass('default-background-dark');
          }
        }
      }
      $scope.Blur_H1_Solicitante = function () {
        if ($scope.h1solicitante != null && $scope.h1solicitante != undefined) {
          if ($scope.H1_Lista_Solicitante != null && $scope.H1_Lista_Solicitante != 0) {
            $timeout(function () {
              if ($scope.h1solicitante != $scope.h1solicitante_SAVE) {
                $scope.Filter_H1_Solicitante = null;
                $scope.h1solicitante = null;
                $scope.h1solicitante_COD = '';
                Materialize.toast('¡Seleccione alguna de las opciones permitidas!', 1500); $('.toast').addClass('default-background-dark');
              }
            }, 300);//END TIMEOUT
          }
        } else {
          $scope.h1solicitante = $scope.h1solicitante_SAVE;
          $scope.Filter_H1_Solicitante = null;
        }
      }
      $scope.Complete_H1_Solicitante = function (string) {
        $('#list-group-solicitante').css({ width: $('#h1solicitante')[0].offsetWidth });
        if ($scope.H1_Lista_Solicitante != null && $scope.H1_Lista_Solicitante != 0) {

          var output = [];
          angular.forEach($scope.H1_Lista_Solicitante, function (H1_Lista_Solicitante) {
            if (H1_Lista_Solicitante.NOMBRE.toUpperCase().indexOf(string.toUpperCase()) >= 0 || H1_Lista_Solicitante.CODIGO.toString().indexOf(string) >= 0) {
              output.push({ "Solicitante": ({ "CODIGO": H1_Lista_Solicitante.CODIGO, "NOMBRE": H1_Lista_Solicitante.NOMBRE.toUpperCase() }) });
            }
          });
          $scope.Filter_H1_Solicitante = output;

        }
      }
      $scope.FillTextbox_H1_Solicitante = function (codigo, nombre) {
        $scope.h1solicitante = codigo + ' - ' + nombre;
        $scope.h1solicitante_SAVE = codigo + ' - ' + nombre;
        $scope.h1solicitante_COD = codigo;
        $scope.Filter_H1_Solicitante = null;
      }
      ////////////////////////////////////////////MODAL 11111/////////////////////////////////////////////////
      $scope.Find_Producto_Oreq = function (keyEvent) {
        if (keyEvent.which === 13)
          $scope.MPBuscarProductos_Oreq();
      }
      $scope.MPBuscarProductos_Oreq = function () {
        if ($scope.MPproducto_Oreq != undefined && $scope.MPproducto_Oreq != '') {
          if ($scope.MPproducto_Oreq == undefined || $scope.MPproducto_Oreq.length < 1) {
            Materialize.toast('Digite al menos 2 caracteres!', 1500); $('.toast').addClass('default-background-dark');
          } else {
            if ($scope.MPproducto_Oreq != $scope.MPproducto_Oreq_SAVE) {
              $http({
                method: 'POST',
                url: "php/gestiondocumental/adminventario.php",
                data: {
                  function: 'BuscarProducto',
                  codigo: $scope.MPproducto_Oreq,
                  cantidad: 0,
                  proveedor: 0
                }
              }).then(function (response) {
                $scope.Lista_MD_Productos_Oreq = null;
                $scope.Filter_MD_Productos_Oreq = null;
                $('.MP_selected_OREQ').removeClass('MP_selected_OREQ');
                if (response.data == 0) {
                  Materialize.toast('¡0 productos encontrados!', 1500); $('.toast').addClass('default-background-dark');
                  $scope.Lista_MD_Productos_Oreq = null;
                  $scope.Filter_MD_Productos_Oreq = null;
                }
                if (response.data.length == 1 && response.data != 0) {
                  if ($scope.MPproductos_OREQ_lista == null) {
                    $scope.MPproducto_Oreq = response.data[0].CODIGO + ' - ' + response.data[0].NOMBRE;
                    $scope.MPunidad_Oreq = response.data[0].TIPO;
                    $scope.MPproducto_Oreq_SAVE = response.data[0].CODIGO + ' - ' + response.data[0].NOMBRE;
                    $scope.MPproducto_Oreq_COD = response.data[0].CODIGO;
                    $scope.MPproducto_Oreq_NOM = response.data[0].NOMBRE;
                    $scope.Lista_MD_Productos_Oreq = null;
                    $scope.Filter_MD_Productos_Oreq = null;
                    $scope.MPcantidad_Oreq = 1;
                  } else {
                    //
                    var Encontrados = false;
                    for (let i = 0; i < $scope.MPproductos_OREQ_lista.length; i++) {
                      if ($scope.MPproductos_OREQ_lista[i].COD_PRO == response.data[0].CODIGO) {
                        Encontrados = true;
                      }
                    }
                    if (Encontrados == true) {
                      Materialize.toast('¡Este producto ya fue escogido!', 3000); $('.toast').addClass('default-background-dark');
                    }
                    else {
                      $scope.MPproducto_Oreq = response.data[0].CODIGO + ' - ' + response.data[0].NOMBRE;
                      $scope.MPunidad_Oreq = response.data[0].TIPO;
                      $scope.MPproducto_Oreq_SAVE = response.data[0].CODIGO + ' - ' + response.data[0].NOMBRE;
                      $scope.MPproducto_Oreq_COD = response.data[0].CODIGO;
                      $scope.MPproducto_Oreq_NOM = response.data[0].NOMBRE;
                      $scope.Lista_MD_Productos_Oreq = null;
                      $scope.Filter_MD_Productos_Oreq = null;
                      $scope.MPcantidad_Oreq = 1;
                    }
                  }
                }
                if (response.data.length > 1) {
                  $scope.Lista_MD_Productos_Oreq = response.data;
                  $scope.Complete_MP_Productos_Oreq($scope.MPproducto_Oreq);
                }
              });
            } else {
              Materialize.toast('¡El producto a consultar es el mismo al seleccionado!', 1500); $('.toast').addClass('default-background-dark');
            }
          }
        }
      }
      $scope.Blur_MP_Productos_Oreq = function () {
        $timeout(function () {
          if ($scope.MPproducto_Oreq != null && $scope.MPproducto_Oreq != undefined) {
            if ($scope.Filter_MD_Productos_Oreq != null && $scope.Filter_MD_Productos_Oreq != 0) {
              if ($scope.MPproducto_Oreq != $scope.MPproducto_Oreq_SAVE) {
                $scope.Filter_MD_Productos_Oreq = null;
                $scope.MPproducto_Oreq = null;
                Materialize.toast('¡Seleccione alguna de las opciones permitidas!', 1500); $('.toast').addClass('default-background-dark');
              }
            }
          }
        }, 700);//END TIMEOUT
      }
      $scope.Complete_MP_Productos_Oreq = function (string) {
        $('#list-group-producto-oreq').css({ width: $('#MPproducto_Oreq')[0].offsetWidth });
        if ($scope.MPproducto_Oreq != null && $scope.MPproducto_Oreq != '') {
          if ($scope.Lista_MD_Productos_Oreq != null && $scope.Lista_MD_Productos_Oreq != 0) {
            var output = [];
            angular.forEach($scope.Lista_MD_Productos_Oreq, function (Lista_MD_Productos_Oreq) {
              if (Lista_MD_Productos_Oreq.NOMBRE.toUpperCase().indexOf(string.toUpperCase()) >= 0 || Lista_MD_Productos_Oreq.CODIGO.toString().indexOf(string) >= 0) {
                output.push({
                  "CODIGO": Lista_MD_Productos_Oreq.CODIGO, "NOMBRE": Lista_MD_Productos_Oreq.NOMBRE.toUpperCase(),
                  "TIPO": Lista_MD_Productos_Oreq.TIPO
                });
              }
            });
            $scope.Filter_MD_Productos_Oreq = output;
          }
        }
      }
      $scope.FillTextbox_MP_Productos_Oreq = function (codigo, nombre, tipo) {
        var Encontrados = false;
        if ($scope.MPproductos_OREQ_lista != null) {
          for (let i = 0; i < $scope.MPproductos_OREQ_lista.length; i++) {
            if ($scope.MPproductos_OREQ_lista[i].COD_PRO == codigo) {
              Encontrados = true;
            }
          }
        }
        if (Encontrados == true) {
          Materialize.toast('¡Este producto ya fue escogido!', 3000); $('.toast').addClass('default-background-dark');
        } else {
          $scope.MPproducto_Oreq = codigo + ' - ' + nombre;
          $scope.MPunidad_Oreq = tipo;
          $scope.MPproducto_Oreq_SAVE = $scope.MPproducto_Oreq;
          $scope.MPproducto_Oreq_COD = codigo;
          $scope.MPproducto_Oreq_NOM = nombre;
          $scope.Filter_MD_Productos_Oreq = null;
          $scope.MPcantidad_Oreq = 1;
          ///
        }
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.MPAgregar_PRO_OREQ = function () {
        if ($scope.MPcantidad_Oreq != null && $scope.MPcantidad_Oreq != '' && $scope.MPunidad_Oreq != null && $scope.MPunidad_Oreq != ''
          && $scope.MPproducto_Oreq_COD != null && $scope.MPproducto_Oreq_COD != '' && $scope.MPproducto_Oreq_NOM != null && $scope.MPproducto_Oreq_NOM != '') {
          if ($scope.MPproductos_OREQ_lista == null) {
            $scope.MPproductos_OREQ_lista = [
              {
                RENGLON: '', COD_PRO: $scope.MPproducto_Oreq_COD, NOM_PRO: $scope.MPproducto_Oreq_NOM, CANTIDAD: $scope.MPcantidad_Oreq,
                UNIDAD: parseInt($scope.MPunidad_Oreq)
              }
            ];
          } else {
            $scope.MPproductos_OREQ_lista.push({
              RENGLON: '', COD_PRO: $scope.MPproducto_Oreq_COD, NOM_PRO: $scope.MPproducto_Oreq_NOM,
              CANTIDAD: $scope.MPcantidad_Oreq, UNIDAD: parseInt($scope.MPunidad_Oreq)
            });
          }
          Materialize.toast('¡El producto ' + $scope.MPproducto_Oreq_NOM + ' ha sido agregado!', 2500); $('.toast').addClass('default-background-dark');
          $scope.MPActualizar_PRO_OREQ_Lista();
          $scope.MPReset_PRO_OREQ_Variables();
          $("#MP_BtnAgAc_OREQ").prop("disabled", true);
          $timeout(function () {
            $("#MP_BtnAgAc_OREQ").prop("disabled", false);
            $("#tabla_modal_OREQ tr")[$("#tabla_modal_OREQ tr").length - 2].scrollIntoView({ block: 'center', behavior: 'smooth' });
          }, 2000);//END TIMEOUT          
        } else {
          Materialize.toast('¡Complete todos los campos!', 1500); $('.toast').addClass('default-background-dark');
        }
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.MPActualizar_PRO_OREQ_Lista = function () {
        var Cant = 0;
        for (let i = 0; i < $scope.MPproductos_OREQ_lista.length; i++) {
          $scope.MPproductos_OREQ_lista[i].RENGLON = i + 1;
          Cant = Cant + parseInt($scope.MPproductos_OREQ_lista[i].CANTIDAD);
        }
        $scope.MPCantidadtotal_OREQS = Cant;
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      $scope.MPSelActuaCalc_PRO_OREQ_Lista = function (row) {
        $scope.MPproducto_Oreq = row.COD_PRO + ' - ' + row.NOM_PRO;
        $scope.MPproducto_Oreq_COD = row.COD_PRO;
        $scope.MPproducto_Oreq_RENGLON = row.RENGLON;
        $scope.Lista_MD_Productos_Oreq = null;
        $scope.Filter_MD_Productos_Oreq = null;
        $scope.MPcantidad_Oreq = parseInt(row.CANTIDAD);
        $("#MPunidad_Oreq").val(row.UNIDAD);
        // $scope.MPunidad_Oreq = row.UNIDAD;
        $scope.MP_BtnAgAc_OREQ = false;
        $timeout(function () {
          $scope.MP_BtnAcAg_OREQ = true;
        }, 510);

      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.MPActuaCalc_PRO_OREQ_Lista = function (renglon) {
        if ($scope.MPcantidad_Oreq != null && $scope.MPcantidad_Oreq != '' && $("#MPunidad_Oreq").val() != null && $("#MPunidad_Oreq").val() != '') {
          for (var i = 0; i < $scope.MPproductos_OREQ_lista.length; i++) {
            if ($scope.MPproductos_OREQ_lista[i].RENGLON == renglon) {
              $scope.MPproductos_OREQ_lista[i].CANTIDAD = $scope.MPcantidad_Oreq;
              $scope.MPproductos_OREQ_lista[i].UNIDAD = $("#MPunidad_Oreq").val();
            }
          }
          $scope.MP_BtnAcAg_OREQ = false;
          $timeout(function () {
            $scope.MP_BtnAgAc_OREQ = true;
          }, 510);
          Materialize.toast('¡Item actualizado!', 1500); $('.toast').addClass('default-background-dark');
          $scope.MPActualizar_PRO_OREQ_Lista();
          $scope.MPReset_PRO_OREQ_Variables();
          if ($('#tabla_modal_OREQ tr').hasClass('selected') == true) {
            $('tr.selected').removeClass('selected');
          }
        } else {
          Materialize.toast('¡Complete todos los campos!', 1500); $('.toast').addClass('default-background-dark');
        }
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.MPBorrarCalc_PRO_OREQ_Lista = function (row) {
        swal({
          title: '¿Esta seguro que desea eliminar el producto de su requeriminento?',
          type: "info",
          showCancelButton: true,
        }).catch(swal.noop)
          .then((willDelete) => {
            if (willDelete) {
              $scope.MPproductos_OREQ_lista.splice($scope.MPproductos_OREQ_lista.findIndex(obj => obj.RENGLON == row.RENGLON), 1);
              $scope.MPproductos_OREQ_lista[$scope.MPproductos_OREQ_lista.findIndex(obj => obj.RENGLON == row.RENGLON)] = {
                RENGLON: '', COD_PRO: $scope.MPproducto_Oreq_COD, NOM_PRO: $scope.MPproducto_Oreq_NOM,
                CANTIDAD: $scope.MPcantidad_Oreq, UNIDAD: $scope.MPunidad_Oreq
              };
              $scope.MPActualizar_PRO_OREQ_Lista();
              $scope.MPReset_PRO_OREQ_Variables();
              if ($scope.MPproductos_OREQ_lista == '') {
                $scope.MPproductos_OREQ_lista = null;
              }
              $scope.$apply();
            } else {
              $('.selected').removeClass('selected');
            }
          });
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.MPReset_PRO_OREQ_Variables = function () {
        $scope.MPproducto_Oreq = null;
        $scope.MPproducto_Oreq_NOM = null;
        $scope.MPproducto_Oreq_SAVE = null;
        $scope.MPproducto_Oreq_COD = null;
        $scope.Filter_MD_Productos_Oreq = null;
        $scope.MPcantidad_Oreq = 1;
        $scope.MPunidad_Oreq = '';
        $("#MPunidad_Oreq").val('');
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.MPGuardar_PRO_OREQ = function () {
        if ($scope.h1concepto != null && $scope.h1concepto != undefined) {
          if ($scope.MPproductos_OREQ_lista != null && $scope.MPCantidadtotal_OREQS != 0) {
            $("#collapsible-header-h1").removeClass(function () {
              return "active";
            }); $(".collapsible").collapsible({ accordion: true }); $(".collapsible").collapsible({ accordion: false });
            var Productos = angular.copy($scope.MPproductos_OREQ_lista);
            $http({
              method: 'POST',
              url: "php/gestiondocumental/adminventario.php",
              data: {
                function: 'insertaroreq',
                UBICACION: parseInt($scope.h1codmuni),
                CONCEPTO: $scope.h1concepto,
                ESTADO: $scope.h1estado,
                SOLICITANTE: parseInt($scope.h1solicitante_COD),
                OBSERVACIONDES: $scope.h1observacion2,
                CANTIDADPROD: Productos.length,
                PRODUCTOS: JSON.stringify(Productos)
              }
            }).then(function (response) {
              if (response.data[0].cod == '0') {
                swal({
                  title: response.data[0].mensaje,
                  type: 'success',
                  timer: 4000,
                  showConfirmButton: false
                }).catch(swal.noop);
                $timeout(function () {
                  $scope.H1_ACTUALIZAR_LISTA_OREQS();
                  $scope.H1_RESTART_TODO();
                }, 1000);
              } else {
                swal({
                  title: response.data[0].mensaje,
                  type: 'warning',
                }).catch(swal.noop);
              }
            });
          } else {
            Materialize.toast('¡Seleccione por lo menos un producto!', 1500); $('.toast').addClass('default-background-dark');
          }
        } else {
          Materialize.toast('¡Seleccione el concepto del requerimiento!', 1500); $('.toast').addClass('default-background-dark');
          // $scope.$apply();
        }
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.MPActualizar_PRO_OREQ = function (ESTADO) {
        if ($scope.h1solicitante_COD == $scope.Rol_Cedula) {
          if ($scope.MPproductos_OREQ_lista != null && $scope.MPCantidadtotal_OREQS != 0) {
            var xEstado = (ESTADO == 'X') ? 'Anular' : (ESTADO == 'P') ? 'Procesar' : 'Actualizar';
            swal({
              title: '¿Esta seguro que desea ' + xEstado + ' el requerimiento?',
              type: "info",
              showCancelButton: true,
            }).catch(swal.noop)
              .then((willDelete) => {
                if (willDelete) {
                  if ($scope.h1solicitante_COD == $scope.Rol_Cedula) {
                    $("#collapsible-header-h1").removeClass(function () {
                      return "active";
                    }); $(".collapsible").collapsible({ accordion: true }); $(".collapsible").collapsible({ accordion: false });
                    var Productos = angular.copy($scope.MPproductos_OREQ_lista);
                    $http({
                      method: 'POST',
                      url: "php/gestiondocumental/adminventario.php",
                      data: {
                        function: 'actualizaroreq',
                        NUMERO: parseInt($scope.h1Num_Req),
                        UBICACION: parseInt($scope.h1codmuni),
                        CONCEPTO: $scope.h1concepto,
                        ESTADO: ESTADO,
                        OBSERVACIONDES: $scope.h1observacion2,
                        CANTIDADPROD: Productos.length,
                        PRODUCTOS: JSON.stringify(Productos)
                      }
                    }).then(function (response) {
                      if (response.data[0].cod == '0') {
                        swal({
                          title: response.data[0].mensaje,
                          type: 'success',
                          timer: 4000,
                          showConfirmButton: false
                        }).catch(swal.noop);
                        $timeout(function () {
                          $scope.H1_ACTUALIZAR_LISTA_OREQS();
                          $scope.H1_RESTART_TODO();
                        }, 1000);
                      } else {
                        swal({
                          title: response.data[0].mensaje,
                          type: 'warning',
                        }).catch(swal.noop);
                      }
                    });
                  }
                }
              });
          } else {
            Materialize.toast('¡Seleccione por lo menos un producto!', 1500); $('.toast').addClass('default-background-dark');
          }
        } else {
          swal({
            title: '!No es posible realizar esta acción!',
            type: 'warning',
            timer: 3000,
            showConfirmButton: false
          }).catch(swal.noop);
        }
      }
      /////////////////////////////////////////////////////////////////////////////////
      $scope.Ver_Grafico = function (TIPO, GRAF) {
        $scope.Grafico_TIPO = TIPO;
        $scope.Grafico_GRAF = GRAF;
        var Tooltip = (TIPO == 'Ordenes de compra') ? '.<br/><span style="color:{point.color}">TOTAL:</span> <b>${point.valor:,.1f}</b><br/>' : '';
        if ($scope.chart_Sub != undefined) {
          //
          $('#container .highcharts-axis-labels').css({ display: '' });
          $('#container .highcharts-grid ').css({ display: '' });
          $('#container .highcharts-axis').css({ display: '' });
          //
          $('#container').css({ width: '97%' });
          $('#container').css({ position: 'relative' });
          $('#container_sub').css({ display: 'none' });
        }
        $http({
          method: 'POST',
          url: "php/gestiondocumental/adminventario.php",
          data: {
            function: GRAF,
            mes: $scope.EST_Mes,
            anio: $scope.EST_Anio,
            ubi: ($scope.rol == 1) ? '' : $scope.rol,
            plat: ($scope.check_option == false) ? 'G' : 'O'
          }
        }).then(function (response) {
          $scope.Grafico = response.data[1].SECCIONALES;
          $scope.Grafico_Estados = response.data[0].ESTADOS;
          var defaultTitle = TIPO;
          var AnchoGraf1 = 0;
          var chart = Highcharts.chart('container', {
            chart: {
              type: 'column',
              events: {
                drilldown: function (e) {
                  chart.setTitle({ text: TIPO + ' de ' + e.point.name });
                  AnchoGraf1 = $('#container>.highcharts-container').width();
                  $('#container').css({ float: 'left' });
                  $('#container').css({ width: '97%' });
                  $('#container .highcharts-axis-labels').css({ display: 'none' });
                  $('#container .highcharts-grid ').css({ display: 'none' });
                  $('#container .highcharts-axis').css({ display: 'none' });
                  $('#container_sub > .highcharts-container').css({ margin: 'auto', float: 'right' });
                  $scope.Ver_Grafico_Subgrafico(e.point.drilldown);
                  $('#container_sub').css({ display: '' });
                  chart.setSize(450, 400);
                  $('#container').css({ width: 450 + 'px' });
                  $('#container_sub').css({ width: 450 + 'px', float: 'right' });
                },
                drillup: function (e) {
                  chart.setTitle({ text: defaultTitle });
                  //
                  $('#container').css({ float: '' });
                  $('#container').css({ width: '100%' });
                  $('#container').css({ position: 'relative' });
                  $('#container_sub').css({ display: 'none' });
                  //
                  $('#container .highcharts-axis-labels').css({ display: '' });
                  $('#container .highcharts-grid ').css({ display: '' });
                  $('#container .highcharts-axis').css({ display: '' });
                  //
                  chart.setSize(AnchoGraf1, 400);
                  $('#container').css({ width: AnchoGraf1 + 'px' });
                  $scope.chart_Sub.destroy();
                }
              }
            },
            title: {
              text: TIPO
            },
            xAxis: {
              type: 'category'
            },
            yAxis: {
              title: {
                text: 'Cantidad de ' + TIPO
              }
            },
            legend: {
              enabled: false
            },
            plotOptions: {
              series: {
                borderWidth: 0,
                dataLabels: {
                  enabled: false,
                  format: '<span style="color:{point.color};font-size:20px">{point.y:.0f}</span>',
                }
              },
              column: {
                colorByPoint: true,
                borderRadius: 9,
                shadow: true,
                animation: {
                  duration: 1500
                }
              }
            },
            credits: {
              enabled: false
            },
            colors: ['#1a2e63', '#1565c0', '#00abc0', '#558a2f', '#6a1b99',
              '#f0a42f', '#2e2e2e', '#e14242'],
            lang: {
              drillUpText: '< Atras',
            },
            tooltip: {
              headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
              pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}</b> ' + TIPO + Tooltip
            },
            "series": [
              {
                "name": TIPO,
                "colorByPoint": true,
                "data": $scope.Grafico
              }
            ],
            "drilldown": {
              "series": $scope.Grafico_Estados
            },
            exporting: {
              printButton: {
                symbol: 'circle'
              },
              exportButton: {
                enabled: false
              }
            }
          });
        });
      }

      $scope.Ver_Grafico_Subgrafico = function (SECCIONAL) {
        if (SECCIONAL.substr(0, 2) == 80 || SECCIONAL.substr(0, 1) == 8) {
          SECCIONAL = '8';
        }
        $http({
          method: 'POST',
          url: "php/gestiondocumental/adminventario.php",
          data: {
            function: ($scope.Grafico_TIPO == 'Requerimientos') ? 'ver_grafico_top10_oreqs' : 'ver_grafico_top10_oords',
            mes: $scope.EST_Mes,
            anio: $scope.EST_Anio,
            ubi: SECCIONAL,
            plat: ($scope.check_option == false) ? 'G' : 'O'
          }
        }).then(function (response) {
          var Grafico_nombres = response.data[0].NOMBRES;
          var Grafico_cantidades = response.data[1].CANTIDADES;
          $scope.chart_Sub = Highcharts.chart('container_sub', {
            chart: {
              type: 'bar',
              backgroundColor: '#FFFFFF',
              width: 600,
              height: 400
            },
            title: {
              text: 'TOP 10 productos procesados'
            },
            credits: {
              enabled: false
            },
            legend: {
              enabled: false
            },
            tooltip: {
              enabled: false
            },
            colors: ['#1565c0'],
            xAxis: {
              offset: -10,
              lineWidth: 0,
              tickInterval: 1,
              tickColor: '#F0F0F0',
              labels: {
                x: -3,
                formatter: function () {
                  var returningString = this.value.toString();

                  if (returningString.length === 1) {
                    returningString = '0' + returningString;
                  }
                  return returningString;
                }
              }
            },
            yAxis: {
              endOnTick: false,
              gridLineWidth: 0,
              plotLines: [{
                value: 0,
                width: 20,
                zIndex: 1
              }],
              title: {
                text: ''
              },
              labels: {
                enabled: false
              }
            },
            plotOptions: {
              series: {
                pointStart: 1,
                borderWidth: 0,
                threshold: 0.5,
                stacking: 'normal',
                dataLabels: {
                  enabled: true,
                  style: {
                    textOutline: false
                  }
                }
              }
            },
            series: [{
              index: 1,
              dataLabels: {
                align: 'left',
                formatter: function () {
                  return this.key;
                }
              },
              data:
                Grafico_cantidades
            }, {
              index: 0,
              color: '#000000',
              dataLabels: {
                align: 'center',
                formatter: function () {
                  return this.point.value + '';
                }
              },
              data: Grafico_nombres
            }]
          });
          $('#container_sub > .highcharts-container').css({ margin: 'auto', float: 'right' });
        });
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////CREAR PRODUCTO/////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.MPCrear_Productos_Val = function () {
        if ($scope.MP_Crear_producto != null && $scope.MP_Crear_producto != '' && $scope.MP_Crear_unidad != null && $scope.MP_Crear_unidad != ''
          && $scope.MP_Crear_concepto != null && $scope.MP_Crear_concepto != '') {
          var observacion = "Se solicita amablemente la creacion del siguiente producto perteneciente al Modulo adquisición de bienes - Administrativa - Nombre del producto: "
            + $scope.MP_Crear_producto.toUpperCase() + ", Unidad: " + $scope.MP_Mostrar_Unidad($scope.MP_Crear_unidad) + ", Clasificacion del producto: " + $scope.MP_Crear_concepto;
          swal({
            title: "¿Desea crear el producto?",
            text: "Automáticamente se creará una mesa de ayuda",
            type: "info",
            showCancelButton: true,
          }).catch(swal.noop)
            .then((willDelete) => {
              if (willDelete) {
                $http({
                  method: 'POST',
                  url: "php/gestiondocumental/adminventario.php",
                  data: {
                    function: 'Creacion_Productos',
                    observacion: observacion,
                    emisor: $scope.Rol_Cedula
                  }
                }).then(function (response) {
                  swal({
                    title: "¡Mesa de ayuda generada!",
                    text: "Código de la mesa de ayuda:" + response.data.mensaje,
                    type: "success",
                    showCancelButton: true,
                  }).catch(swal.noop);
                });
              } else {
              }
            });
          $scope.Cerrar_modal_Crear_Producto();
        } else {
          Materialize.toast('¡Complete todos los campos!', 1500); $('.toast').addClass('default-background-dark');
        }
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////CREAR PRODUCTO/////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////


      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////HOJA 2/////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////ORDENES///////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      $scope.$watch('MPCantidadtotal_OORDS', function () {
        if ($scope.MPCantidadtotal_OORDS != undefined && parseInt($scope.MPCantidadtotal_OORDS) == 0) {
          $('.Btn_Ver_Productos_OORDS_ANIMACION').removeClass('btnOpacity');
          $('.Btn_Ver_Productos_OORDS_ANIMACION').addClass('shake');
        }
        if ($scope.MPCantidadtotal_OORDS != undefined && parseInt($scope.MPCantidadtotal_OORDS) > 0) {
          $('.Btn_Ver_Productos_OORDS_ANIMACION').removeClass('shake');
          $('.Btn_Ver_Productos_OORDS_ANIMACION').addClass('btnOpacity');
        }
      }, true);
      $scope.H2_DataTable_Buscar = function (numero) {
        $scope.H2_RESTART_VAR();
        $scope.h2respuesta = 0;
        $http({
          method: 'POST',
          url: "php/gestiondocumental/adminventario.php",
          data: {
            function: 'buscaroord',
            codigo: parseInt(numero)
          }
        }).then(function (response) {
          var respuesta = response.data;
          $scope.dpto = respuesta.UBICACION;
          $scope.h2dpto = respuesta.UBICACION;
          $scope.h2codmuni = respuesta.COD_UBI_OREQ;
          var aFecha2 = respuesta.FECHA.split('/');
          $scope.h2proveedor = respuesta.PROVEEDOR;
          $scope.H2_Buscar_Proveedor();
          $scope.h2condicion = respuesta.CONDICION_PAGO;
          $scope.h2descuento1 = respuesta.DESCUENTO_1;
          $scope.h2estado = respuesta.ESTADO;
          $scope.h2requerimiento = respuesta.NUM_OREQ;
          $scope.h2documento = respuesta.DOC_OREQ;
          $scope.h2ubicacion = (respuesta.COD_UBI_OREQ == 0) ? 0 : respuesta.COD_UBI_OREQ + ' - ' + respuesta.UBI_OREQ;
          $scope.h2observacion2 = respuesta.OBSERVACIONDES;
          $scope.MPCantidadtotal_OORDS = respuesta.CANTIDAD;
          $scope.MPSubTotal_OORDS = $scope.formatPeso2((respuesta.SUBTOTAL).replace(',', '.'));
          $scope.MPImpuesto_OORDS = $scope.formatPeso2(respuesta.IMPUESTO.replace(',', '.'));
          $scope.MPTotal_OORDS = $scope.formatPeso2(respuesta.TOTAL.replace(',', '.'));
          $scope.h2fecha = new Date('"' + aFecha2[2] + "/" + aFecha2[1] + "/" + aFecha2[0] + '"');
          var aFecha2oreq = respuesta.FEC_OREQ.split('/');
          $scope.h2fechaoreq = new Date('"' + aFecha2oreq[2] + "/" + aFecha2oreq[1] + "/" + aFecha2oreq[0] + '"');
          document.getElementById("H2_SCROLL").scrollIntoView({ block: 'start', behavior: 'smooth' });
          $scope.h2Num_Ord = respuesta.NUMERO;
          if (respuesta.ESTADO == 'A') {
            $scope.h2_Ord_Cerrado = false;
            $scope.h2empleado = respuesta.EMPLEADO;
            $scope.h2_BtnGuardar = false;
            $("#h2proveedor").prop("disabled", false);
            $("#h2condicion").prop("disabled", false);
            $("#h2descuento1").prop("disabled", false);
            $("#h2estado").prop("disabled", false);
            $("#h2requerimiento").prop("disabled", false);
            $("#h2observacion2").prop("disabled", false);
          } else {
            $scope.h2_Ord_Cerrado = true;
            $scope.h2_BtnGuardar = false;
            $("#h2proveedor").prop("disabled", true);
            $("#h2condicion").prop("disabled", true);
            $("#h2descuento1").prop("disabled", true);
            $("#h2estado").prop("disabled", true);
            $("#h2requerimiento").prop("disabled", true);
            $("#h2observacion2").prop("disabled", true);
          }
          $scope.h2respuesta = 1;
          if (respuesta.ESTADO == 'P') {
            $scope.h2empleado = respuesta.EMPLEADO;
            $scope.h2estado_P = true;
          }
          $scope.MPproductos_OORD_lista = respuesta.PRODUCTOS;
          $scope.MPActualizar_PRO_OORD_Lista();
          $scope.MPReset_PRO_OORD_Variables();
        });
      }
      $scope.H2_RESTART_VAR = function () {
        var fechahoy = new Date();
        $scope.h2fecha = fechahoy;
        $scope.h2proveedor = '';
        $scope.h2proveedor_COD = '';
        $scope.h2proveedor_SAVE = '';
        $scope.h2condicion = '';
        $scope.h2descuento1 = 0;
        $scope.h2estado = 'A';
        $scope.h2requerimiento = 0;
        $scope.h2documento = '';
        $scope.h2ubicacion = 0;
        $scope.h2observacion2 = '';
        $scope.h2fechaoreq = null;
        $scope.h2fecharead = true;
        $("#h2proveedor").prop("disabled", false);
        $("#h2condicion").prop("disabled", false);
        $("#h2descuento1").prop("disabled", false);
        $("#h2estado").prop("disabled", false);
        $("#h2requerimiento").prop("disabled", false);
        $("#h2observacion2").prop("disabled", false);
        //        
        $scope.h1estado_P = false;
        if ($('#Datatable_OORDS tr').hasClass('selected') == true) {
          $('tr.selected').removeClass('selected');
        }
      }
      $scope.H2_RESTART_TODO = function (CON) {
        $scope.H2_RESTART_VAR();
        //        
        $scope.h2Num_Ord = '';
        $scope.h2respuesta = 0;
        $scope.h2estado_P = false;
        /////        
        $scope.h2_BtnGuardar = true;
        $scope.MP_BtnAgAc_OORD = true;
        $scope.MPproductos_OORD_lista = null;
        $scope.MPReset_PRO_OORD_Variables();
        $scope.MPCantidadtotal_OORDS = 0;
        $scope.MPDescuento_OORDS = 0;
        $scope.MPDescuentoItem_OORDS = 0;
        $scope.MPImpuesto_OORDS = 0;
        $scope.MPSubTotal_OORDS = 0;
        $scope.MPTotal_OORDS = 0;
        $scope.MPtotal_Sub_OORD = 0;
        $scope.MPtotal_Impuesto_OORD = 0;
        $scope.MPtotal_Descuento_OORD = 0;
        $scope.MPtotal_Total_OORD = 0;
        /////
        $scope.ObtenerConsecutivo('OORD');
        if (CON == 0) {
          $scope.h2codmuni = $scope.h1codmuni;
          $scope.h2dpto = $scope.h1dpto;
        } else {
          $http({
            method: 'POST',
            url: "php/gestiondocumental/adminventario.php",
            data: {
              function: 'obtenercodigo'
            }
          }).then(function (response) {
            $scope.h2codmuni = response.data[0].CODIGO;
            $scope.h2dpto = response.data[0].NOMBRE;
          });
        }
        if (CON != undefined) {
          $scope.H2_ACTUALIZAR_LISTA_OORDS();
        }
      }

      $scope.H2_ACTUALIZAR_LISTA_OORDS = function () {
        if ($scope.Datatable_OORDS != null) {
          $scope.Datatable_OORDS.destroy();
          $scope.Array_OORDS = null;
        }
        $http({
          method: 'POST',
          url: "php/gestiondocumental/adminventario.php",
          data: {
            function: 'listar_oords',
            codigo: ''
          }
        }).then(function (response) {
          if (response.data.length == 0) {
            Materialize.toast('¡No existen registros!', 1500); $('.toast').addClass('default-background-dark');
          }
          if (response.data.length > 0) {
            $scope.Array_OORDS = response.data;
            $timeout(function () {
              $scope.Datatable_OORDS = $('#Datatable_OORDS').DataTable({
                language: {
                  "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
                },
                lengthMenu: [[10, 20, 50], [10, 20, 50]],
                pagingType: "numbers",
                dom: 'lBsfrtip',
                select: true,
                buttons: [
                  {
                    extend: 'excelHtml5',
                    title: 'Modulo Inventario - GenesisWeb',
                    messageTop: 'Listado de ordenes de compra',

                  }],
              });
              $scope.Datatable_OORDS.draw();
            }, 100);//END TIMEOUT
            //////////////////////////////////////////
          }
        });
      }
      /////////////
      $scope.Find_Proveedor_enter = function (keyEvent) {
        if (keyEvent.which === 13)
          $scope.H2_Buscar_Proveedor();
      }
      $scope.H2_Buscar_Proveedor = function () {
        if ($scope.h2proveedor == '' || $scope.h2proveedor == null || $scope.h2proveedor == undefined) {
          Materialize.toast('¡Digite el NIT o nombre del proveedor!', 1500); $('.toast').addClass('default-background-dark');
        } else {
          if ($scope.h2proveedor != $scope.h2proveedor_SAVE) {
            if ($scope.h2proveedor == undefined || $scope.h2proveedor.length < 3) {
              Materialize.toast('Digite al menos 3 caracteres!', 1500); $('.toast').addClass('default-background-dark');
            } else {
              $http({
                method: 'POST',
                url: "php/gestiondocumental/adminventario.php",
                data: {
                  function: 'obtenerproveedor',
                  codigo: $scope.h2proveedor
                }
              }).then(function (response) {
                if (response.data == 0) {
                  Materialize.toast('¡No existen registros del proveedor!', 1500); $('.toast').addClass('default-background-dark');
                  $scope.h2proveedor = '';
                  $scope.h2proveedor_SAVE = '';
                  $scope.h2proveedor_COD = '';
                  $scope.Filter_H2_Proveedor = null;
                }
                if (response.data.length == 1 && response.data != 0) {
                  var nombre = (response.data[0].NOMBRE.substr(response.data[0].NOMBRE.length - 1, response.data[0].NOMBRE.length) == ' ') ? response.data[0].NOMBRE.substr(0, response.data[0].NOMBRE.length - 1) : response.data[0].NOMBRE
                  $scope.h2proveedor = response.data[0].CODIGO + ' - ' + nombre;
                  $scope.h2proveedor_SAVE = response.data[0].CODIGO + ' - ' + nombre;
                  $scope.h2proveedor_COD = response.data[0].CODIGO;
                  $scope.Filter_H2_Proveedor = null;
                }
                if (response.data.length > 1) {
                  $scope.H2_Lista_Proveedor = response.data;
                  $scope.Complete_H2_Proveedor($scope.h2proveedor);
                }
              });
            }
          } else {
            Materialize.toast('¡El proveedor a consultar es el mismo al seleccionado!', 1500); $('.toast').addClass('default-background-dark');
          }
        }
      }
      $scope.Blur_H2_Proveedor = function () {
        if ($scope.h2proveedor != null && $scope.h2proveedor != undefined) {
          if ($scope.H2_Lista_Proveedor != null && $scope.H2_Lista_Proveedor != 0) {
            $timeout(function () {
              if ($scope.h2proveedor != $scope.h2proveedor_SAVE && $scope.h2proveedor != 0) {
                $scope.Filter_H2_Proveedor = null;
                $scope.h2proveedor = null;
                $scope.h2proveedor_COD = '';
                Materialize.toast('¡Seleccione alguna de las opciones permitidas!', 1500); $('.toast').addClass('default-background-dark');
              } else {
                $scope.Filter_H2_Proveedor = null;
              }
            }, 300);//END TIMEOUT
          }
        } else {
          $scope.h2proveedor = $scope.h2proveedor_SAVE;
          $scope.Filter_H2_Proveedor = null;
        }
      }
      $scope.Complete_H2_Proveedor = function (string) {
        $('#list-group-proveedor').css({ width: $('#h2proveedor')[0].offsetWidth });
        if ($scope.H2_Lista_Proveedor != null && $scope.H2_Lista_Proveedor != 0) {
          if ($scope.h2proveedor != '' && $scope.h2proveedor != null) {
            var output = [];
            angular.forEach($scope.H2_Lista_Proveedor, function (H2_Lista_Proveedor) {
              if (H2_Lista_Proveedor.NOMBRE.toUpperCase().indexOf(string.toUpperCase()) >= 0 || H2_Lista_Proveedor.CODIGO.toString().indexOf(string) >= 0) {
                output.push({ "Proveedor": ({ "CODIGO": H2_Lista_Proveedor.CODIGO, "NOMBRE": H2_Lista_Proveedor.NOMBRE.toUpperCase() }) });
              }
            });
            $scope.Filter_H2_Proveedor = output;
          }
        }
      }
      $scope.FillTextbox_H2_Proveedor = function (codigo, nombre) {
        var xnombre = (nombre.substr(nombre.length - 1, nombre.length) == ' ') ? nombre.substr(0, nombre.length - 1) : nombre;
        $scope.h2proveedor = codigo + ' - ' + xnombre;
        $scope.h2proveedor_SAVE = codigo + ' - ' + xnombre;
        $scope.h2proveedor_COD = codigo;
        $scope.Filter_H2_Proveedor = null;
        //
        $scope.MPproductos_OORD_lista = null;
        $scope.MPReset_PRO_OORD_Variables();
        $scope.MPCantidadtotal_OORDS = 0;
        $scope.MPDescuento_OORDS = 0;
        $scope.MPDescuentoItem_OORDS = 0;
        $scope.MPImpuesto_OORDS = 0;
        $scope.MPSubTotal_OORDS = 0;
        $scope.MPTotal_OORDS = 0;
        $scope.MPtotal_Sub_OORD = 0;
        $scope.MPtotal_Impuesto_OORD = 0;
        $scope.MPtotal_Descuento_OORD = 0;
        $scope.MPtotal_Total_OORD = 0;
      }
      //////////////////////////////////////////
      $scope.Find_OreqenOord_enter = function (keyEvent) {
        if ($scope.h2requerimiento == '00' || $scope.h2requerimiento == '000' || $scope.h2requerimiento == '0000'
          || $scope.h2requerimiento == '00000' || $scope.h2requerimiento == '000000') {
          $scope.h2requerimiento = '0'; $scope.h2documento = ''; $scope.h2ubicacion = 0;
        }
        if (keyEvent.which === 13) {
          $scope.H2_Buscar_SOreqenOord();
        }
      }
      $scope.H2_Buscar_SOreqenOord = function () {
        $http({
          method: 'POST',
          url: "php/gestiondocumental/adminventario.php",
          data: {
            function: 'buscaroreqenoord',
            codigo: $scope.h2requerimiento
          }
        }).then(function (response) {
          if (response.data == '') {
            $scope.h2documento = '';
            $scope.h2ubicacion = 0;
            swal({
              title: '!No se encontró el requerimiento N°: ' + $scope.h2requerimiento + '!',
              type: 'info',
              timer: 2000,
              showConfirmButton: false
            }).catch(swal.noop);
            $scope.h2requerimiento = 0;
            $scope.MPproductos_OORD_lista = null;
            $scope.MPReset_PRO_OORD_Variables();
            $scope.MPCantidadtotal_OORDS = 0;
            $scope.MPDescuento_OORDS = 0;
            $scope.MPDescuentoItem_OORDS = 0;
            $scope.MPImpuesto_OORDS = 0;
            $scope.MPSubTotal_OORDS = 0;
            $scope.MPTotal_OORDS = 0;
            $scope.MPtotal_Sub_OORD = 0;
            $scope.MPtotal_Impuesto_OORD = 0;
            $scope.MPtotal_Descuento_OORD = 0;
            $scope.MPtotal_Total_OORD = 0;
          }
          if (response.data != '') {
            var respuesta = response.data[0];
            if (respuesta.MENSAJE == 0) {
              if (respuesta.ESTADO == 'PROCESADO') {
                $scope.h2requerimiento = respuesta.NUMERO;
                $scope.h2documento = respuesta.DOCUMENTO;
                $scope.h2ubicacion = respuesta.UBICACION + ' - ' + respuesta.NOM_UBICACION;
                $scope.h2codmuni = respuesta.UBICACION;
                $scope.h2dpto = respuesta.NOM_UBICACION;
                var aFecha2 = respuesta.FECHA.split('/');
                $scope.h2fechaoreq = new Date('"' + aFecha2[2] + "/" + aFecha2[1] + "/" + aFecha2[0] + '"');
                swal({
                  title: '!Requerimiento N°: ' + respuesta.NUMERO + ' encontrado!',
                  text: '¡' + respuesta.CANTIDAD + ' Productos requeridos! ¡Estado: ' + respuesta.ESTADO + '!',
                  type: 'success',
                  timer: 2000,
                  showConfirmButton: false,
                }).catch(swal.noop);
                $scope.MPproductos_OORD_lista = respuesta.PRODUCTOS;
                $scope.MPActualizar_PRO_OORD_Lista();
                $scope.MPReset_PRO_OORD_Variables();
              } else {
                $scope.h2fechaoreq = null;
                $scope.h2documento = '';
                $scope.h2ubicacion = 0;
                swal({
                  title: '!Requerimiento N°: ' + respuesta.NUMERO + ' encontrado!',
                  text: '¡Estado: ' + respuesta.ESTADO + '!',
                  type: 'warning',
                  timer: 2000,
                  showConfirmButton: true
                }).catch(swal.noop);
                $scope.h2requerimiento = 0;
                $scope.MPproductos_OORD_lista = null;
                $scope.MPReset_PRO_OORD_Variables();
                $scope.MPCantidadtotal_OORDS = 0;
                $scope.MPDescuento_OORDS = 0;
                $scope.MPDescuentoItem_OORDS = 0;
                $scope.MPImpuesto_OORDS = 0;
                $scope.MPSubTotal_OORDS = 0;
                $scope.MPTotal_OORDS = 0;
                $scope.MPtotal_Sub_OORD = 0;
                $scope.MPtotal_Impuesto_OORD = 0;
                $scope.MPtotal_Descuento_OORD = 0;
                $scope.MPtotal_Total_OORD = 0;
              }
            } else {
              swal({
                title: respuesta.MENSAJE,
                type: 'warning',
                showConfirmButton: true
              }).catch(swal.noop);
            }
          }
        });
      }
      ///////////
      $scope.Find_Producto_Oord = function (keyEvent) {
        if (keyEvent.which === 13)
          $scope.MPBuscarProductos_Oord();
      }
      $scope.MPBuscarProductos_Oord = function () {
        if ($scope.MPproducto_Oord != undefined && $scope.MPproducto_Oord != '') {
          if ($scope.MPproducto_Oord == undefined || $scope.MPproducto_Oord.length < 2) {
            Materialize.toast('Digite al menos 2 caracteres!', 1500); $('.toast').addClass('default-background-dark');
          } else {
            if ($scope.MPproducto_Oord != $scope.MPproducto_Oord_SAVE) {
              $http({
                method: 'POST',
                url: "php/gestiondocumental/adminventario.php",
                data: {
                  function: 'BuscarProducto',
                  codigo: $scope.MPproducto_Oord,
                  cantidad: ($scope.MPproductos_OORD_lista == null) ? 0 : $scope.MPproductos_OORD_lista.length,
                  proveedor: $scope.h2proveedor_COD
                }
              }).then(function (response) {
                $scope.Lista_MD_Productos_Oord = null;
                $scope.Filter_MD_Productos_Oord = null;
                $('.MP_selected_OORD').removeClass('MP_selected_OORD');
                if (response.data == 0) {
                  Materialize.toast('¡0 productos encontrados!', 1500); $('.toast').addClass('default-background-dark');
                  $scope.Lista_MD_Productos_Oord = null;
                  $scope.Filter_MD_Productos_Oord = null;
                }
                if (response.data.length == 1 && response.data != 0) {
                  if ($scope.MPproductos_OORD_lista == null) {
                    $scope.MPproducto_Oord = response.data[0].CODIGO + ' - ' + response.data[0].NOMBRE;
                    $scope.MPunidad_Oord = response.data[0].TIPO;
                    $scope.MPiva_Oord = parseInt(response.data[0].IVA);
                    $scope.MPprecio_Oord = $scope.formatPeso2(response.data[0].PRECIO);
                    $scope.MPproducto_Oord_SAVE = response.data[0].CODIGO + ' - ' + response.data[0].NOMBRE;
                    $scope.MPproducto_Oord_COD = response.data[0].CODIGO;
                    $scope.MPproducto_Oord_NOM = response.data[0].NOMBRE;
                    $scope.Lista_MD_Productos_Oord = null;
                    $scope.Filter_MD_Productos_Oord = null;
                    $scope.MPChange_PRO_OORD();
                  } else {
                    //
                    var Encontrados = false;
                    for (let i = 0; i < $scope.MPproductos_OORD_lista.length; i++) {
                      if ($scope.MPproductos_OORD_lista[i].COD_PRO == response.data[0].CODIGO) {
                        Encontrados = true;
                      }
                    }
                    if (Encontrados == true) {
                      Materialize.toast('¡Este producto ya fue escogido!', 5000); $('.toast').addClass('default-background-dark');
                    } else {
                      $scope.MPproducto_Oord = response.data[0].CODIGO + ' - ' + response.data[0].NOMBRE;
                      $scope.MPunidad_Oord = response.data[0].TIPO;
                      $scope.MPiva_Oord = parseInt(response.data[0].IVA);
                      $scope.MPprecio_Oord = $scope.formatPeso2(response.data[0].PRECIO);
                      $scope.MPproducto_Oord_SAVE = response.data[0].CODIGO + ' - ' + response.data[0].NOMBRE;
                      $scope.MPproducto_Oord_COD = response.data[0].CODIGO;
                      $scope.MPproducto_Oord_NOM = response.data[0].NOMBRE;
                      $scope.Lista_MD_Productos_Oord = null;
                      $scope.Filter_MD_Productos_Oord = null;
                      $scope.MPChange_PRO_OORD();
                    }
                  }
                }
                if (response.data.length > 1) {
                  $scope.Lista_MD_Productos_Oord = response.data;
                  $scope.Complete_MP_Productos_Oord($scope.MPproducto_Oord);
                }
              });
            } else {
              Materialize.toast('¡El producto a consultar es el mismo al seleccionado!', 1500); $('.toast').addClass('default-background-dark');
            }
          }
        }
      }
      $scope.Blur_MP_Productos_Oord = function () {
        $timeout(function () {
          if ($scope.MPproducto_Oord != null && $scope.MPproducto_Oord != undefined) {
            if ($scope.Filter_MD_Productos_Oord != null && $scope.Filter_MD_Productos_Oord != 0) {
              if ($scope.MPproducto_Oord != $scope.MPproducto_Oord_SAVE) {
                $scope.Filter_MD_Productos_Oord = null;
                $scope.MPproducto_Oord = null;
                Materialize.toast('¡Seleccione alguna de las opciones permitidas!', 1500); $('.toast').addClass('default-background-dark');
              }
            }
          }
        }, 700);//END TIMEOUT
      }
      $scope.Complete_MP_Productos_Oord = function (string) {
        $('#list-group-producto-oord').css({ width: $('#MPproducto_Oord')[0].offsetWidth });
        if ($scope.MPproducto_Oord != null && $scope.MPproducto_Oord != '') {
          if ($scope.Lista_MD_Productos_Oord != null && $scope.Lista_MD_Productos_Oord != 0) {
            var output = [];
            angular.forEach($scope.Lista_MD_Productos_Oord, function (Lista_MD_Productos_Oord) {
              if (Lista_MD_Productos_Oord.NOMBRE.toUpperCase().indexOf(string.toUpperCase()) >= 0 || Lista_MD_Productos_Oord.CODIGO.toString().indexOf(string) >= 0) {
                output.push({
                  "CODIGO": Lista_MD_Productos_Oord.CODIGO, "NOMBRE": Lista_MD_Productos_Oord.NOMBRE.toUpperCase(),
                  "TIPO": Lista_MD_Productos_Oord.TIPO,
                  "IVA": parseInt(Lista_MD_Productos_Oord.IVA), "PRECIO": Lista_MD_Productos_Oord.PRECIO
                });
              }
            });
            $scope.Filter_MD_Productos_Oord = output;
          }
        }
      }
      $scope.FillTextbox_MP_Productos_Oord = function (codigo, nombre, tipo, iva, precio) {
        var Encontrados = false;
        if ($scope.MPproductos_OORD_lista != null) {
          for (let i = 0; i < $scope.MPproductos_OORD_lista.length; i++) {
            if ($scope.MPproductos_OORD_lista[i].COD_PRO == codigo) {
              Encontrados = true;
            }
          }
        }
        if (Encontrados == true) {
          Materialize.toast('¡Este producto ya fue escogido!', 5000); $('.toast').addClass('default-background-dark');
        } else {
          $scope.MPproducto_Oord = codigo + ' - ' + nombre;
          $scope.MPunidad_Oord = tipo;
          $scope.MPiva_Oord = iva;
          $scope.MPprecio_Oord = $scope.formatPeso2(precio);
          $scope.MPproducto_Oord_SAVE = $scope.MPproducto_Oord;
          $scope.MPproducto_Oord_COD = codigo;
          $scope.MPproducto_Oord_NOM = nombre;
          $scope.Filter_MD_Productos_Oord = null;
          $scope.MPChange_PRO_OORD();
        }
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.MPAgregar_PRO_OORD = function () {
        if ($scope.MPcantidad_Oord != null && $scope.MPcantidad_Oord != '' && $scope.MPunidad_Oord != null && $scope.MPunidad_Oord != ''
          && $scope.MPproducto_Oord_COD != null && $scope.MPproducto_Oord_COD != '' && $scope.MPproducto_Oord_NOM != null && $scope.MPproducto_Oord_NOM != ''
          && $scope.MPprecio_Oord != null && $scope.MPprecio_Oord != '' && $scope.MPiva_Oord != null && $scope.MPdescuento_Oord != null &&
          $scope.MPiva_Oord >= 0 && $scope.MPdescuento_Oord >= 0) {
          $scope.MPcantidad_Oord = $scope.MPcantidad_Oord.toString().replace(/\./g, '');
          $scope.MPcantidad_Oord = $scope.MPcantidad_Oord.toString().replace(',', '.');
          $scope.MPprecio_Oord = $scope.MPprecio_Oord.toString().replace(/\./g, '');
          $scope.MPprecio_Oord = $scope.MPprecio_Oord.toString().replace(',', '.');
          if ($scope.MPproductos_OORD_lista == null) {
            $scope.MPproductos_OORD_lista = [
              {
                RENGLON: '', COD_PRO: $scope.MPproducto_Oord_COD, NOM_PRO: $scope.MPproducto_Oord_NOM, CANTIDAD: $scope.MPcantidad_Oord.toString(),
                UNIDAD: parseInt($scope.MPunidad_Oord), PRECIO: $scope.MPprecio_Oord.toString(), IVA: $scope.MPiva_Oord.toString(),
                DESCUENTO: $scope.MPdescuento_Oord.toString()
              }
            ];
          } else {
            $scope.MPproductos_OORD_lista.push({
              RENGLON: '', COD_PRO: $scope.MPproducto_Oord_COD, NOM_PRO: $scope.MPproducto_Oord_NOM,
              CANTIDAD: $scope.MPcantidad_Oord.toString(), UNIDAD: parseInt($scope.MPunidad_Oord),
              PRECIO: $scope.MPprecio_Oord.toString(), IVA: $scope.MPiva_Oord.toString(),
              DESCUENTO: $scope.MPdescuento_Oord.toString()
            });
          }
          Materialize.toast('¡El producto ' + $scope.MPproducto_Oord_NOM + ' ha sido agregado!', 2500); $('.toast').addClass('default-background-dark');
          $scope.MPActualizar_PRO_OORD_Lista();
          $scope.MPReset_PRO_OORD_Variables();
          $("#MP_BtnAgAc_OORD").prop("disabled", true);
          $timeout(function () {
            $("#MP_BtnAgAc_OORD").prop("disabled", false);
          }, 2000);//END TIMEOUT
          $scope.MPtotal_Sub_OORD = 0;
          $scope.MPtotal_Impuesto_OORD = 0;
          $scope.MPtotal_Descuento_OORD = 0;
          $scope.MPtotal_Total_OORD = 0;
        } else {
          Materialize.toast('¡Complete todos los campos!', 1500); $('.toast').addClass('default-background-dark');
        }
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.MPActualizar_PRO_OORD_Lista = function () {
        var Cant = 0, Imp = 0, Desc = 0, Desc_Item = 0, Subt = 0, Total = 0;
        for (let i = 0; i < $scope.MPproductos_OORD_lista.length; i++) {
          let xCant = parseInt($scope.MPproductos_OORD_lista[i].CANTIDAD),
            xIva = parseFloat($scope.MPproductos_OORD_lista[i].IVA / 100),
            xDesc = parseFloat($scope.MPproductos_OORD_lista[i].DESCUENTO / 100),
            xPrecio = parseFloat($scope.MPproductos_OORD_lista[i].PRECIO.replace(',', '.'));
          $scope.MPproductos_OORD_lista[i].RENGLON = i + 1;
          Cant = Cant + xCant;
          Desc = Desc + xCant * xPrecio * xDesc;
          Subt = Subt + (xCant * xPrecio);
          //let ximp = Subt * xIva;
          //if(ximp!=0){
            //Imp = (ximp - (ximp * xDesc))+Imp;
            Imp += (xCant * xPrecio * xIva) - (((xCant * xPrecio) + (xCant * xPrecio * xIva / 100)) * xDesc / 100);
          //}
          Total = Subt + Imp - Desc;
          Desc_Item = Desc_Item + ((xCant * xPrecio) * xDesc);
        }
        $scope.MPCantidadtotal_OORDS = Cant;

        $scope.MPImpuesto_OORDS = $scope.formatPeso2(Imp);
        $scope.MPDescuentoItem_OORDS = $scope.formatPeso2(Desc_Item);
        $scope.MPSubTotal_OORDS = $scope.formatPeso2(Subt);
        $scope.MPTotal_OORDS = $scope.formatPeso2(Total);
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.MPSelActuaCalc_PRO_OORD_Lista = function (row) {
        $scope.MPproducto_Oord = row.COD_PRO + ' - ' + row.NOM_PRO;
        $scope.MPproducto_Oord_COD = row.COD_PRO;
        $scope.MPproducto_Oord_RENGLON = row.RENGLON;
        $scope.Filter_MD_Productos_Oord = null;
        $scope.MPcantidad_Oord = parseInt(row.CANTIDAD);
        $("#MPunidad_Oord").val(row.UNIDAD);
        $scope.MPiva_Oord = parseInt(row.IVA);
        $scope.MPdescuento_Oord = parseInt(row.DESCUENTO);
        $scope.MPprecio_Oord = $scope.formatPeso2(row.PRECIO);
        $scope.MP_BtnAgAc_OORD = false;
        $scope.MPChange_PRO_OORD();
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.MPActuaCalc_PRO_OORD_Lista = function (renglon) {
        if ($scope.MPcantidad_Oord != null && $scope.MPcantidad_Oord != '' && $scope.MPiva_Oord != null && $scope.MPiva_Oord >= 0 &&
          $("#MPunidad_Oord").val() != null && $("#MPunidad_Oord").val() != '' && $scope.MPprecio_Oord != null && $scope.MPprecio_Oord != '') {
          var x = null;
          var y = false;
          for (var i = 0; i < $scope.MPproductos_OORD_lista.length; i++) {
            if ($scope.MPproductos_OORD_lista[i].RENGLON == renglon) {
              $scope.MPproductos_OORD_lista[i].CANTIDAD = $scope.MPcantidad_Oord.toString();
              $scope.MPproductos_OORD_lista[i].UNIDAD = $("#MPunidad_Oord").val();
              $scope.MPproductos_OORD_lista[i].IVA = $scope.MPiva_Oord.toString().replace(',', '.');
              $scope.MPproductos_OORD_lista[i].DESCUENTO = $scope.MPdescuento_Oord.toString().replace(',', '.');
              $scope.MPproductos_OORD_lista[i].PRECIO = ($scope.MPprecio_Oord.toString().replace(/\./g, '')).replace(',', '.');
              x = $scope.MPproductos_OORD_lista;
            }
            if (i + 1 == $scope.MPproductos_OORD_lista.length) {
              y = true;
            }
          }
          if (y == true) {
            $scope.MPproductos_OORD_lista = null;
          }
          $scope.MPproductos_OORD_lista = x;
          $scope.MP_BtnAgAc_OORD = true;
          Materialize.toast('¡Item actualizado!', 1500); $('.toast').addClass('default-background-dark');
          $scope.MPActualizar_PRO_OORD_Lista();
          $scope.MPReset_PRO_OORD_Variables();
          $scope.MPtotal_Sub_OORD = 0;
          $scope.MPtotal_Impuesto_OORD = 0;
          $scope.MPtotal_Descuento_OORD = 0;
          $scope.MPtotal_Total_OORD = 0;
          if ($('#tabla_modal_OORD tr').hasClass('selected') == true) {
            $('tr.selected').removeClass('selected');
          }
        } else {
          Materialize.toast('¡Complete todos los campos!', 1500); $('.toast').addClass('default-background-dark');
        }
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.MPBorrarCalc_PRO_OORD_Lista = function (row) {
        swal({
          title: '¿Esta seguro que desea eliminar el producto de su compra?',
          type: "info",
          showCancelButton: true,
        }).catch(swal.noop)
          .then((willDelete) => {
            if (willDelete) {
              $scope.MPproductos_OORD_lista.splice($scope.MPproductos_OORD_lista.findIndex(obj => obj.RENGLON == row.RENGLON), 1);
              $scope.MPproductos_OORD_lista[$scope.MPproductos_OORD_lista.findIndex(obj => obj.RENGLON == row.RENGLON)] = {
                RENGLON: '', COD_PRO: $scope.MPproducto_Oreq_COD, NOM_PRO: $scope.MPproducto_Oreq_NOM,
                CANTIDAD: $scope.MPcantidad_Oreq, UNIDAD: $scope.MPunidad_Oreq, IVA: $scope.MPiva_Oord, PRECIO: $scope.MPprecio_Oord
              };
              $scope.MPActualizar_PRO_OORD_Lista();
              $scope.MPReset_PRO_OORD_Variables();
              if ($scope.MPproductos_OORD_lista == '') {
                $scope.MPproductos_OORD_lista = null;
              }
              $scope.$apply();
              $('.selected').removeClass('selected');
            } else {
            }
          });
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.MPReset_PRO_OORD_Variables = function () {
        $scope.MPproducto_Oord = null;
        $scope.MPproducto_Oord_NOM = null;
        $scope.MPproducto_Oord_SAVE = null;
        $scope.MPproducto_Oord_COD = null;
        $scope.Filter_MD_Productos_Oord = null;
        $scope.MPcantidad_Oord = 1;
        $scope.MPunidad_Oord = '';
        $scope.MPiva_Oord = 0;
        $scope.MPdescuento_Oord = 0;
        $scope.MPprecio_Oord = '';
        $("#MPunidad_Oord").val('');
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.MPChange_PRO_OORD = function () {
        $scope.MPprecio_Oord = $scope.MPprecio_Oord.replace(/\-/g, '');
        $timeout(function () {
          if ($scope.MPcantidad_Oord != null && $scope.MPcantidad_Oord != '' && $scope.MPiva_Oord != null && $scope.MPdescuento_Oord != null &&
            $scope.MPiva_Oord >= 0 && $scope.MPdescuento_Oord >= 0 && $scope.MPprecio_Oord != null && $scope.MPprecio_Oord != '') {
            $scope.MPtotal_Sub_OORD = $scope.formatPeso2($scope.MPcantidad_Oord * (($scope.MPprecio_Oord.replace(/\./g, '')).replace(',', '.')));
            $scope.MPtotal_Descuento_OORD = $scope.formatPeso2($scope.MPcantidad_Oord * ($scope.MPdescuento_Oord / 100) * (($scope.MPprecio_Oord.replace(/\./g, '')).replace(',', '.')));
            var vDescuento = (($scope.MPtotal_Descuento_OORD.replace(/\./g, '')).replace(',', '.')) * ($scope.MPiva_Oord / 100);
            var vIva = (($scope.MPtotal_Sub_OORD.replace(/\./g, '')).replace(',', '.')) * ($scope.MPiva_Oord / 100);
            $scope.MPtotal_Impuesto_OORD = $scope.formatPeso2(vIva - vDescuento);
            $scope.MPtotal_Total_OORD = $scope.formatPeso2(parseFloat(($scope.MPtotal_Sub_OORD.replace(/\./g, '')).replace(',', '.')) + parseFloat(($scope.MPtotal_Impuesto_OORD.replace(/\./g, '')).replace(',', '.')) - parseFloat(($scope.MPtotal_Descuento_OORD.replace(/\./g, '')).replace(',', '.')));
          } else {
            $scope.MPtotal_Sub_OORD = 0;
            $scope.MPtotal_Impuesto_OORD = 0;
            $scope.MPtotal_Descuento_OORD = 0;
            $scope.MPtotal_Total_OORD = 0;
          }
        }, 100);
      }

      $scope.MPGuardar_PRO_OORD = function () {
        if ($scope.h2condicion != null && $scope.h2condicion != undefined && $scope.h2condicion != '' &&
          $scope.h2descuento1 != null && $scope.h2descuento1 != undefined && $scope.h2estado != null && $scope.h2estado != undefined && $scope.h2documento != '') {
          if ($scope.h2proveedor_COD != null && $scope.h2proveedor_COD != undefined && $scope.h2proveedor_COD != '') {
            if ($scope.MPproductos_OORD_lista != null) {
              $("#collapsible-header-h2").removeClass(function () {
                return "active";
              }); $(".collapsible").collapsible({ accordion: true }); $(".collapsible").collapsible({ accordion: false });
              var xProductos = angular.copy($scope.MPproductos_OORD_lista);
              var Productos = null;
              var findPrecio = 0;
              for (let y = 0; y < xProductos.length; y++) {
                if (Productos == null) {
                  Productos = [
                    {
                      RENGLON: xProductos[y].RENGLON, COD_PRO: xProductos[y].COD_PRO, NOM_PRO: xProductos[y].NOM_PRO,
                      CANTIDAD: xProductos[y].CANTIDAD, UNIDAD: xProductos[y].UNIDAD, PRECIO: xProductos[y].PRECIO.replace('.', ','),
                      IVA: xProductos[y].IVA, DESCUENTO: xProductos[y].DESCUENTO
                    }
                  ];
                } else {
                  Productos.push({
                    RENGLON: xProductos[y].RENGLON, COD_PRO: xProductos[y].COD_PRO, NOM_PRO: xProductos[y].NOM_PRO,
                    CANTIDAD: xProductos[y].CANTIDAD, UNIDAD: xProductos[y].UNIDAD, PRECIO: xProductos[y].PRECIO.replace('.', ','),
                    IVA: xProductos[y].IVA, DESCUENTO: xProductos[y].DESCUENTO
                  });
                }
                if (xProductos[y].PRECIO.replace('.', ',') <= 0) {
                  findPrecio = findPrecio + 1;
                }
              }
              //
              let xSubtotal = parseFloat(($scope.MPSubTotal_OORDS.replace(/\./g, '')).replace(',', '.'));
              let xDescuento = xSubtotal * ($scope.h2descuento1 / 100);
              let Subtotal = parseFloat(xSubtotal - xDescuento);
              let xImpuesto = parseFloat(($scope.MPImpuesto_OORDS.replace(/\./g, '')).replace(',', '.'));
              let Impuesto = xImpuesto - (xImpuesto * ($scope.h2descuento1 / 100));
              let Total = Subtotal + Impuesto - parseFloat(($scope.MPDescuentoItem_OORDS.replace(/\./g, '')).replace(',', '.'));
              let Subtotal1_2 = Subtotal - ($scope.MPDescuentoItem_OORDS.replace(/\./g, '').replace(',', '.'));
              if (findPrecio == 0) {
                var x = $scope.h2fecha, y = new Date(), mon = $scope.h2fecha.getMonth() + 1, day = $scope.h2fecha.getUTCDate(), hour = y.getHours(), min = y.getMinutes(), sec = y.getSeconds();
                var h2fecha = x.getFullYear() + '-' + ((mon <= 9) ? '0' + mon : mon) + '-' + day + ' ' + ((hour <= 9) ? '0' + hour : hour) + ':' + ((min <= 9) ? '0' + min : min) + ':' + ((sec <= 9) ? '0' + sec : sec);
                swal({
                  title: '¿Esta seguro que desea registrar la orden de compra?',
                  text: 'El valor total de la orden es de: $' + $scope.formatPeso2(Total),
                  type: "info",
                  showCancelButton: true,
                }).catch(swal.noop)
                  .then((willDelete) => {
                    if (willDelete) {
                      $http({
                        method: 'POST',
                        url: "php/gestiondocumental/adminventario.php",
                        data: {
                          function: 'insertaroord',
                          FECHA: h2fecha,
                          UBICACION: parseInt($scope.h2codmuni),//ORDN_UBICACION
                          PROVEEDOR: parseInt($scope.h2proveedor_COD),//ORDV_TERCERO
                          CONDICION_PAGO: parseInt($scope.h2condicion),//ORDN_CONDICION_PAGO
                          DESCUENTO: $scope.h2descuento1,//ORDP_DESCUENTO
                          ESTADO: $scope.h2estado,//ORDC_ESTADO
                          OREQ_NUM: ($scope.h2documento == '') ? 0 : parseInt($scope.h2requerimiento),//ORDN_REQUERIMIENTO - ORDN_DOCUMENTO1
                          OREQ_DOC: $scope.h2documento,//ORDC_DOCUMENTO1
                          OREQ_UBI: ($scope.h2documento == '') ? 0 : parseInt($scope.h2ubicacion),//ORDN_DOC_UBICACION
                          OBSERVACIONDES: $scope.h2observacion2,//ORDT_OBSERVACION
                          EMPLEADO: parseInt($scope.Rol_Cedula),//ORDV_EMPLEADO
                          BRUTO: ($scope.MPSubTotal_OORDS.replace(/\./g, '')).replace(/\./g, ','),//ORDV_BRUTO
                          DESCUENTOCOMPRA: ($scope.formatPeso2(xDescuento).replace(/\./g, '')).replace(/\./g, ','),//ORDV_DESCUENTO1
                          SUBTOTAL: ($scope.formatPeso2(Subtotal).replace(/\./g, '')).replace(/\./g, ','),//ORDV_SUBTOTAL - ORDV_SUBTOTAL1 - ORDV_SUBTOTAL2
                          DESCUENTOITEM: ($scope.MPDescuentoItem_OORDS.replace(/\./g, '')).replace(/\./g, ','),//ORDV_DESCUENTO
                          SUBTOTAL1_2: Subtotal1_2.toString().replace(/\./g, ','),//ORDV_SUBTOTAL1 ORDV_SUBTOTAL2
                          IMPUESTO: ($scope.formatPeso2(Impuesto).replace(/\./g, '')).replace(/\./g, ','),//ORDV_IVA
                          TOTAL: ($scope.formatPeso2(Total).replace(/\./g, '')).replace(/\./g, ','),//ORDV_TOTAL - ORDV_NETO
                          CANTIDADPROD: Productos.length,
                          PRODUCTOS: JSON.stringify(Productos)
                        }
                      }).then(function (response) {
                        if (response.data[0].cod == '0') {
                          swal({
                            title: response.data[0].mensaje,
                            type: 'success',
                            timer: 4000,
                            showConfirmButton: false
                          }).catch(swal.noop);
                          $timeout(function () {
                            $scope.H2_ACTUALIZAR_LISTA_OORDS();
                            $scope.H2_RESTART_TODO();
                          }, 1000);
                        } else {
                          swal({
                            title: response.data[0].mensaje,
                            type: 'warning',
                          }).catch(swal.noop);
                        }
                      });
                    } else {
                    }
                  });
              } else {
                Materialize.toast('¡Por favor, verifique el precio de los productos seleccionados!', 1500); $('.toast').addClass('default-background-dark');
              }
            } else {
              Materialize.toast('¡Seleccione por lo menos un producto!', 1500); $('.toast').addClass('default-background-dark');
            }
          } else {
            document.getElementById("h2proveedor").focus();
            document.getElementById('h2proveedor').scrollIntoView({ block: 'center', behavior: 'smooth' });
            Materialize.toast('¡Consulte y seleccione un proveedor!', 1500); $('.toast').addClass('default-background-dark');
          }
        } else {
          Materialize.toast('¡Por favor, Diligencie todos los campos!', 1500); $('.toast').addClass('default-background-dark');
        }
      }
      $scope.MPActualizar_PRO_OORD = function (ESTADO) {
        if ($scope.h2condicion != null && $scope.h2condicion != undefined && $scope.h2condicion != '' &&
          $scope.h2descuento1 != null && $scope.h2descuento1 != undefined && $scope.h2estado != null && $scope.h2estado != undefined && $scope.h2documento != '') {
          if ($scope.h2proveedor_COD != null && $scope.h2proveedor_COD != undefined && $scope.h2proveedor_COD != '') {
            if ($scope.MPproductos_OORD_lista != null) {
              $("#collapsible-header-h2").removeClass(function () {
                return "active";
              }); $(".collapsible").collapsible({ accordion: true }); $(".collapsible").collapsible({ accordion: false });
              var xProductos = angular.copy($scope.MPproductos_OORD_lista);
              var Productos = null;
              var findPrecio = 0;
              for (let y = 0; y < xProductos.length; y++) {
                if (Productos == null) {
                  Productos = [
                    {
                      RENGLON: xProductos[y].RENGLON, COD_PRO: xProductos[y].COD_PRO, NOM_PRO: xProductos[y].NOM_PRO,
                      CANTIDAD: xProductos[y].CANTIDAD, UNIDAD: xProductos[y].UNIDAD, PRECIO: xProductos[y].PRECIO.replace('.', ','),
                      IVA: xProductos[y].IVA, DESCUENTO: xProductos[y].DESCUENTO
                    }
                  ];
                } else {
                  Productos.push({
                    RENGLON: xProductos[y].RENGLON, COD_PRO: xProductos[y].COD_PRO, NOM_PRO: xProductos[y].NOM_PRO,
                    CANTIDAD: xProductos[y].CANTIDAD, UNIDAD: xProductos[y].UNIDAD, PRECIO: xProductos[y].PRECIO.replace('.', ','),
                    IVA: xProductos[y].IVA, DESCUENTO: xProductos[y].DESCUENTO
                  });
                }
                if (xProductos[y].PRECIO.replace('.', ',') <= 0) {
                  findPrecio = findPrecio + 1;
                }
              }
              //
              let xSubtotal = parseFloat(($scope.MPSubTotal_OORDS.replace(/\./g, '')).replace(',', '.'));
              let xDescuento = xSubtotal * ($scope.h2descuento1 / 100);
              let Subtotal = parseFloat(xSubtotal - xDescuento);
              let xImpuesto = parseFloat(($scope.MPImpuesto_OORDS.replace(/\./g, '')).replace(',', '.'));
              let Impuesto = xImpuesto - (xImpuesto * ($scope.h2descuento1 / 100));
              let Total = Subtotal + Impuesto - parseFloat(($scope.MPDescuentoItem_OORDS.replace(/\./g, '')).replace(',', '.'));
              let Subtotal1_2 = Subtotal - ($scope.MPDescuentoItem_OORDS.replace(/\./g, '').replace(',', '.'));
              if (findPrecio == 0) {
                var x = $scope.h2fecha, y = new Date(), mon = $scope.h2fecha.getMonth() + 1, day = $scope.h2fecha.getUTCDate(), hour = y.getHours(), min = y.getMinutes(), sec = y.getSeconds();
                var h2fecha = x.getFullYear() + '-' + ((mon <= 9) ? '0' + mon : mon) + '-' + day + ' ' + ((hour <= 9) ? '0' + hour : hour) + ':' + ((min <= 9) ? '0' + min : min) + ':' + ((sec <= 9) ? '0' + sec : sec);
                var xEstado = (ESTADO == 'X') ? 'Anular' : (ESTADO == 'P') ? 'Procesar' : 'Actualizar';
                swal({
                  title: '¿Esta seguro que desea ' + xEstado + ' la orden de compra?',
                  text: 'El valor total de la orden es de: $' + $scope.formatPeso2(Total),
                  type: "info",
                  showCancelButton: true,
                }).catch(swal.noop)
                  .then((willDelete) => {
                    if (willDelete) {
                      $http({
                        method: 'POST',
                        url: "php/gestiondocumental/adminventario.php",
                        data: {
                          function: 'actualizaroord',
                          FECHA: h2fecha,
                          NUMERO: parseInt($scope.h2Num_Ord),
                          UBICACION: parseInt($scope.h2codmuni),//ORDN_UBICACION
                          PROVEEDOR: parseInt($scope.h2proveedor_COD),//ORDV_TERCERO
                          CONDICION_PAGO: parseInt($scope.h2condicion),//ORDN_CONDICION_PAGO
                          DESCUENTO: $scope.h2descuento1,//ORDP_DESCUENTO
                          ESTADO: ESTADO,//ORDC_ESTADO
                          OREQ_NUM: ($scope.h2documento == '') ? 0 : parseInt($scope.h2requerimiento),//ORDN_REQUERIMIENTO - ORDN_DOCUMENTO1
                          OREQ_DOC: $scope.h2documento,//ORDC_DOCUMENTO1
                          OREQ_UBI: parseInt($scope.h2ubicacion),//ORDN_DOC_UBICACION
                          OBSERVACIONDES: $scope.h2observacion2,//ORDT_OBSERVACION
                          EMPLEADO: parseInt($scope.Rol_Cedula),//ORDV_EMPLEADO
                          BRUTO: ($scope.MPSubTotal_OORDS.replace(/\./g, '')).replace(/\./g, ','),//ORDV_BRUTO
                          DESCUENTOCOMPRA: ($scope.formatPeso2(xDescuento).replace(/\./g, '')).replace(/\./g, ','),//ORDV_DESCUENTO1
                          SUBTOTAL: ($scope.formatPeso2(Subtotal).replace(/\./g, '')).replace(/\./g, ','),//ORDV_SUBTOTAL - ORDV_SUBTOTAL1 - ORDV_SUBTOTAL2
                          DESCUENTOITEM: ($scope.MPDescuentoItem_OORDS.replace(/\./g, '')).replace(/\./g, ','),//ORDV_DESCUENTO
                          SUBTOTAL1_2: Subtotal1_2.toString().replace(/\./g, ','),//ORDV_SUBTOTAL1 ORDV_SUBTOTAL2
                          IMPUESTO: ($scope.formatPeso2(Impuesto).replace(/\./g, '')).replace(/\./g, ','),//ORDV_IVA
                          TOTAL: ($scope.formatPeso2(Total).replace(/\./g, '')).replace(/\./g, ','),//ORDV_TOTAL - ORDV_NETO
                          CANTIDADPROD: Productos.length,
                          PRODUCTOS: JSON.stringify(Productos)
                        }
                      }).then(function (response) {
                        if (response.data[0].cod == '0') {
                          swal({
                            title: response.data[0].mensaje,
                            type: 'success',
                            timer: 4000,
                            showConfirmButton: false
                          }).catch(swal.noop);
                          $timeout(function () {
                            $scope.H2_ACTUALIZAR_LISTA_OORDS();
                            $scope.H2_RESTART_TODO();
                          }, 1000);
                        } else {
                          swal({
                            title: response.data[0].mensaje,
                            type: 'warning',
                          }).catch(swal.noop);
                        }
                      });
                    } else {
                    }
                  });
                //
              } else {
                Materialize.toast('¡Por favor, verifique el precio de los productos seleccionados!', 1500); $('.toast').addClass('default-background-dark');
              }
            } else {
              Materialize.toast('¡Seleccione por lo menos un producto!', 1500); $('.toast').addClass('default-background-dark');
            }
          } else {
            document.getElementById("h2proveedor").focus();
            document.getElementById('h2proveedor').scrollIntoView({ block: 'center', behavior: 'smooth' });
            Materialize.toast('¡Consulte y seleccione un proveedor!', 1500); $('.toast').addClass('default-background-dark');
          }
        } else {
          Materialize.toast('¡Por favor, Diligencie todos los campos!', 1500); $('.toast').addClass('default-background-dark');
        }
      }

      $scope.MPDesprocesar_PRO_OORD = function () {
        swal({
          title: '¿Esta seguro que desea Desprocesar la orden de compra?',
          type: "info",
          showCancelButton: true,
        }).catch(swal.noop)
          .then((willDelete) => {
            if (willDelete) {
              $http({
                method: 'POST',
                url: "php/gestiondocumental/adminventario.php",
                data: {
                  function: 'desprocesaroord',
                  num: parseInt($scope.h2Num_Ord),
                  ubi: parseInt($scope.h2codmuni),//ORDN_UBICACION
                  ced: $scope.Rol_Cedula
                }
              }).then(function (response) {
                if (response.data[0].cod == '0') {
                  swal({
                    title: response.data[0].mensaje,
                    type: 'success',
                    timer: 4000,
                    showConfirmButton: false
                  }).catch(swal.noop);
                  $timeout(function () {
                    $scope.H2_DataTable_Buscar($scope.h2Num_Ord);
                    $timeout(function () {
                      $scope.H2_ACTUALIZAR_LISTA_OORDS();
                    }, 1000);
                  }, 1000);
                } else {
                  swal({
                    title: response.data[0].mensaje,
                    type: 'warning',
                  }).catch(swal.noop);
                }
              });
            } else {
            }
          });
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////MODAL PRODUCTOS/////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////HOJA 33333/////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.filtro = '';
      $scope.$watch('H3_Hojas', function () {
        if ($scope.H3_Hojas == true) {
          $('#Datatable_Gestion_filter input').val($scope.h3bodega_nom).trigger('keyup');
        }
      }, true);


      $scope.H3_RESTART_TODO = function () {
        $scope.h3mesadeayuda = '';
        $scope.h3funcionario = '';
        $scope.h3mesadeayudades = '';
        $scope.MPCantidadtotal_ENTREGA = 0;
        $scope.MPproductos_ENTREGA_lista = null;
      }

      $scope.H3_ACTUALIZAR_LISTA_GESTIONES = function () {
        if ($scope.Datatable_GESTION != null) {
          $scope.Datatable_GESTION.destroy();
          $scope.Array_Gestiones = null;
        }
        $http({
          method: 'POST',
          url: "php/gestiondocumental/adminventario.php",
          data: {
            function: 'Obtener_Lista_Gestiones',
            UBICACION: ($scope.rol == 1) ? '' : $scope.rol,
          }
        }).then(function (response) {
          if (response.data.length > 0) {
            $scope.Array_Gestiones = response.data;
            $timeout(function () {
              if ($scope.Datatable_GESTION != undefined || $scope.Datatable_GESTION == undefined) {
                $scope.Datatable_GESTION = $('#Datatable_Gestion').DataTable({
                  language: {
                    "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
                  },
                  lengthMenu: [[10, 20, 50], [10, 20, 50]],
                  pagingType: "numbers",
                  "order": [[ 1, "desc" ]],
                  select: true
                });
              } else {
              }
            }, 100);//END TIMEOUT
            //////////////////////////////////////////
          }
        });
      }
      $scope.H3_Ver_Productos_Gestion = function (bodega, oreq, oord, estado) {
        $scope.h3g_bodega = bodega;
        $scope.h3g_oreq = oreq;
        $scope.h3g_oord = oord;
        $scope.h3g_estado = estado;
        $http({
          method: 'POST',
          url: "php/gestiondocumental/adminventario.php",
          data: {
            function: 'Obtener_Lista_Gestiones_Detalle',
            bodega: ($scope.rol == 1) ? '' : $scope.rol,
            oord: oord,
            oreq: oreq
          }
        }).then(function (response) {
          if (response.data.length == 0) {
            Materialize.toast('¡No existen registros!', 1500); $('.toast').addClass('default-background-dark');
          }
          if (response.data.length > 0) {
            $scope.Array_Gestiones_Detalle = response.data;
            (function () {
              $('#modal_Gestion_Detalle').modal();
            }());
            $('#modal_Gestion_Detalle').modal('open');
          }
        });
      }

      $scope.H3_Confirmar_Productos_Gestion = function () {
        var EncontradosUnd = false;
        for (let index = 0; index < $scope.Array_Gestiones_Detalle.length; index++) {
          if ($scope.Array_Gestiones_Detalle[index].CANTIDAD_PENDIENTE == undefined) {
            EncontradosUnd = true;
          }
        }
        if (EncontradosUnd == false) {
          swal({
            title: '¿Confirmación?',
            text: 'Confirma que recibio los productos y los cargará a su bodega',
            type: "info",
            showCancelButton: true,
          }).catch(swal.noop)
            .then((willDelete) => {
              if (willDelete) {
                $http({
                  method: 'POST',
                  url: "php/gestiondocumental/adminventario.php",
                  data: {
                    function: 'Confirmar_productos_gestion',
                    json: JSON.stringify($scope.Array_Gestiones_Detalle),
                    cantidad: $scope.Array_Gestiones_Detalle.length,
                    responsable: $scope.Rol_Cedula
                  }
                }).then(function (response) {
                  if (response.data.length > 0) {
                    if (response.data[0].cod == 1)
                      swal({
                        title: "¡Error!",
                        text: response.data[0].mensaje,
                        type: "warning",
                      }).catch(swal.noop);
                  }
                  if (response.data[0].cod == 0) {
                    swal({
                      title: "¡Guardado!",
                      text: response.data[0].mensaje,
                      type: "success",
                    }).catch(swal.noop);
                    $('#modal_Gestion_Detalle').modal('close');
                    $scope.H3_ACTUALIZAR_LISTA_GESTIONES();
                  }
                });
              }
            });
        }
        else {
          swal({
            title: '¡Advertencia!',
            text: 'Por favor, valide la cantidad recibida de los productos.',
            type: "warning",
            showCancelButton: false,
          }).catch(swal.noop)
        }
      }
      $scope.H3_Hojas = false;
      $scope.H3Change_Hojas = function () {
        $scope.H3_Hojas = true;
      }

      $scope.MPCantidadtotal_ENTREGA = 0;
      $scope.$watch('MPCantidadtotal_ENTREGA', function () {
        if ($scope.MPCantidadtotal_ENTREGA != undefined && parseInt($scope.MPCantidadtotal_ENTREGA) == 0) {
          $('.Btn_Ver_Productos_ENTREGA_ANIMACION').removeClass('btnOpacity');
          $('.Btn_Ver_Productos_ENTREGA_ANIMACION').addClass('shake');
        }
        if ($scope.MPCantidadtotal_ENTREGA != undefined && parseInt($scope.MPCantidadtotal_ENTREGA) > 0) {
          $('.Btn_Ver_Productos_ENTREGA_ANIMACION').removeClass('shake');
          $('.Btn_Ver_Productos_ENTREGA_ANIMACION').addClass('btnOpacity');
        }
      }, true);
      // <!-- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<MODAL PRODUCTOS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> -->
      $scope.Find_Producto_Entrega = function (keyEvent) {
        if (keyEvent.which === 13)
          $scope.MPBuscarProductos_Entrega();
      }
      $scope.MPBuscarProductos_Entrega = function () {
        if ($scope.MPproducto_Entrega != undefined && $scope.MPproducto_Entrega != '') {
          if ($scope.MPproducto_Entrega == undefined || $scope.MPproducto_Entrega.length < 2) {
            Materialize.toast('Digite al menos 2 caracteres!', 1500); $('.toast').addClass('default-background-dark');
          } else {
            if ($scope.MPproducto_Entrega != $scope.MPproducto_Entrega_SAVE) {
              $http({
                method: 'POST',
                url: "php/gestiondocumental/adminventario.php",
                data: {
                  function: 'BuscarProductoEntrega',
                  codigo: $scope.MPproducto_Entrega,
                  ubi: $scope.rol
                }
              }).then(function (response) {
                $scope.Lista_MD_Productos_Entrega = null;
                $scope.Filter_MD_Productos_Entrega = null;
                $('.MP_selected_ENTREGA').removeClass('MP_selected_ENTREGA');
                if (response.data == 0) {
                  Materialize.toast('¡0 productos encontrados!', 1500); $('.toast').addClass('default-background-dark');
                  $scope.Lista_MD_Productos_Entrega = null;
                  $scope.Filter_MD_Productos_Entrega = null;
                }
                if (response.data.length == 1 && response.data != 0) {
                  if ($scope.MPproductos_ENTREGA_lista == null) {
                    $scope.MPproducto_Entrega = response.data[0].CODIGO + ' - ' + response.data[0].NOMBRE;
                    $scope.MPoreq_Entrega = parseInt(response.data[0].OREQ);
                    $scope.MPoord_Entrega = parseInt(response.data[0].OORD);
                    $scope.MPproducto_Entrega_SAVE = response.data[0].CODIGO + ' - ' + response.data[0].NOMBRE;
                    $scope.MPproducto_Entrega_COD = response.data[0].CODIGO;
                    $scope.MPproducto_Entrega_NOM = response.data[0].NOMBRE;
                    $scope.Lista_MD_Productos_Entrega = null;
                    $scope.Filter_MD_Productos_Entrega = null;
                    $scope.MPcantidad_Entrega = 1;
                    $scope.MPcantidadmax_Entrega = parseInt(response.data[0].CANTIDAD);
                    $("#MPcantidad_Entrega").attr({ "max": parseInt(response.data[0].CANTIDAD) });
                  } else {
                    //
                    var Encontrados = false;
                    if ($scope.MPproductos_ENTREGA_lista != null) {
                      for (let i = 0; i < $scope.MPproductos_ENTREGA_lista.length; i++) {
                        if ($scope.MPproductos_ENTREGA_lista[i].COD_PRO == response.data[0].CODIGO) {
                          Encontrados = true;
                        }
                      }
                    }
                    if (Encontrados == true) {
                      swal({
                        title: "¡Este producto ya fue escogido!",
                        text: "Por favor seleccione otro...",
                        type: "info",
                      }).catch(swal.noop);
                    } else {
                      $scope.MPproducto_Entrega = response.data[0].CODIGO + ' - ' + response.data[0].NOMBRE;
                      $scope.MPoreq_Entrega = parseInt(response.data[0].OREQ);
                      $scope.MPoord_Entrega = parseInt(response.data[0].OORD);
                      $scope.MPproducto_Entrega_SAVE = response.data[0].CODIGO + ' - ' + response.data[0].NOMBRE;
                      $scope.MPproducto_Entrega_COD = response.data[0].CODIGO;
                      $scope.MPproducto_Entrega_NOM = response.data[0].NOMBRE;
                      $scope.Lista_MD_Productos_Entrega = null;
                      $scope.Filter_MD_Productos_Entrega = null;
                      $scope.MPcantidad_Entrega = 1;
                      $scope.MPcantidadmax_Entrega = parseInt(response.data[0].CANTIDAD);
                      $("#MPcantidad_Entrega").attr({ "max": parseInt(response.data[0].CANTIDAD) });
                      ///
                    }
                  }
                }
                if (response.data.length > 1) {
                  $scope.Lista_MD_Productos_Entrega = response.data;
                  $scope.Complete_MP_Productos_Entrega($scope.MPproducto_Entrega);
                }
              });
            } else {
              Materialize.toast('¡El producto a consultar es el mismo al seleccionado!', 1500); $('.toast').addClass('default-background-dark');
            }
          }
        }
      }

      $scope.MPCantidadtotal_ENTREGA = 0;
      $scope.Blur_MP_Productos_Entrega = function () {
        $timeout(function () {
          if ($scope.MPproducto_Entrega != null && $scope.MPproducto_Entrega != undefined) {
            if ($scope.Filter_MD_Productos_Entrega != null && $scope.Filter_MD_Productos_Entrega != 0) {
              if ($scope.MPproducto_Entrega != $scope.MPproducto_Entrega_SAVE) {
                $scope.Filter_MD_Productos_Entrega = null;
                $scope.MPproducto_Entrega = null;
                Materialize.toast('¡Seleccione alguna de las opciones permitidas!', 1500); $('.toast').addClass('default-background-dark');
              }
            }
          }
        }, 700);//END TIMEOUT
      }
      $scope.Complete_MP_Productos_Entrega = function (string) {
        $('#list-group-producto-entrega').css({ width: $('#MPproducto_Entrega')[0].offsetWidth });
        if ($scope.MPproducto_Entrega != null && $scope.MPproducto_Entrega != '') {
          if ($scope.Lista_MD_Productos_Entrega != null && $scope.Lista_MD_Productos_Entrega != 0) {
            var output = [];
            angular.forEach($scope.Lista_MD_Productos_Entrega, function (Lista_MD_Productos_Entrega) {
              if (Lista_MD_Productos_Entrega.NOMBRE.toUpperCase().indexOf(string.toUpperCase()) >= 0 || Lista_MD_Productos_Entrega.CODIGO.toString().indexOf(string) >= 0) {
                output.push({
                  "CODIGO": Lista_MD_Productos_Entrega.CODIGO, "NOMBRE": Lista_MD_Productos_Entrega.NOMBRE.toUpperCase(),
                  "CANTIDAD": Lista_MD_Productos_Entrega.CANTIDAD, "OREQ": Lista_MD_Productos_Entrega.OREQ, "OORD": Lista_MD_Productos_Entrega.OORD,
                });
              }
            });
            $scope.Filter_MD_Productos_Entrega = output;
          }
        }
      }
      $scope.FillTextbox_MP_Productos_Entrega = function (codigo, nombre, cantidad, oreq, oord) {
        var Encontrados = false;
        if ($scope.MPproductos_ENTREGA_lista != null) {
          for (let i = 0; i < $scope.MPproductos_ENTREGA_lista.length; i++) {
            if ($scope.MPproductos_ENTREGA_lista[i].COD_PRO == codigo) {
              Encontrados = true;
            }
          }
        }
        if (Encontrados == true) {
          swal({
            title: "¡Este producto ya fue escogido!",
            text: "Por favor seleccione otro...",
            type: "info",
          }).catch(swal.noop);
        } else {
          $scope.MPproducto_Entrega = codigo + ' - ' + nombre;
          $scope.MPoreq_Entrega = parseInt(oreq);
          $scope.MPoord_Entrega = parseInt(oord);
          $scope.MPproducto_Entrega_SAVE = $scope.MPproducto_Entrega;
          $scope.MPproducto_Entrega_COD = codigo;
          $scope.MPproducto_Entrega_NOM = nombre;
          $scope.Filter_MD_Productos_Entrega = null;
          $scope.MPcantidad_Entrega = 1;
          $scope.MPcantidadmax_Entrega = parseInt(cantidad);
          $("#MPcantidad_Entrega").attr({ "max": parseInt(cantidad) });
          ///
        }
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.MPAgregar_PRO_ENTREGA = function () {
        if ($scope.MPoreq_Entrega != null && $scope.MPoreq_Entrega != ''
          && $scope.MPproducto_Entrega_COD != null && $scope.MPproducto_Entrega_COD != '' && $scope.MPproducto_Entrega_NOM != null && $scope.MPproducto_Entrega_NOM != '') {
          if ($("#MPcantidad_Entrega").val() > 0 && $("#MPcantidad_Entrega").val() <= $scope.MPcantidadmax_Entrega) {
            if ($scope.MPproductos_ENTREGA_lista == null) {
              $scope.MPproductos_ENTREGA_lista = [
                {
                  RENGLON: '', COD_PRO: $scope.MPproducto_Entrega_COD, NOM_PRO: $scope.MPproducto_Entrega_NOM, CANTIDAD: parseInt($("#MPcantidad_Entrega").val()),
                  OREQ: parseInt($scope.MPoreq_Entrega), OORD: parseInt($scope.MPoord_Entrega), MAX: parseInt($scope.MPcantidadmax_Entrega)
                }
              ];
            } else {
              $scope.MPproductos_ENTREGA_lista.push({
                RENGLON: '', COD_PRO: $scope.MPproducto_Entrega_COD, NOM_PRO: $scope.MPproducto_Entrega_NOM,
                CANTIDAD: parseInt($("#MPcantidad_Entrega").val()), OREQ: parseInt($scope.MPoreq_Entrega), OORD: parseInt($scope.MPoord_Entrega), MAX: parseInt($scope.MPcantidadmax_Entrega)
              });
            }
            Materialize.toast('¡El producto ' + $scope.MPproducto_Entrega_NOM + ' ha sido agregado!', 2500); $('.toast').addClass('default-background-dark');
            $scope.MPActualizar_PRO_ENTREGA_Lista();
            $scope.MPReset_PRO_ENTREGA_Variables();
            $("#MP_BtnAgAc_ENTREGA").prop("disabled", true);
            $timeout(function () {
              $("#MP_BtnAgAc_ENTREGA").prop("disabled", false);
              $("#tabla_modal_ENTREGA tr")[$("#tabla_modal_ENTREGA tr").length - 2].scrollIntoView({ block: 'center', behavior: 'smooth' });
            }, 2000);//END TIMEOUT          
          } else {
            Materialize.toast('¡La cantidad a entregar debe ser menor o igual a ' + $scope.MPcantidadmax_Entrega + '!', 1500); $('.toast').addClass('default-background-dark');
          }
        } else {
          Materialize.toast('¡Complete todos los campos!', 1500); $('.toast').addClass('default-background-dark');
        }

      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.MPActualizar_PRO_ENTREGA_Lista = function () {
        var Cant = 0;
        for (let i = 0; i < $scope.MPproductos_ENTREGA_lista.length; i++) {
          $scope.MPproductos_ENTREGA_lista[i].RENGLON = i + 1;
          Cant = Cant + parseInt($scope.MPproductos_ENTREGA_lista[i].CANTIDAD);
        }
        $scope.MPCantidadtotal_ENTREGA = Cant;
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      $scope.MPSelActuaCalc_PRO_ENTREGA_Lista = function (row) {
        $scope.MPproducto_Entrega = row.COD_PRO + ' - ' + row.NOM_PRO;
        $scope.MPproducto_Entrega_COD = row.COD_PRO;
        $scope.MPproducto_Entrega_RENGLON = row.RENGLON;
        $scope.Lista_MD_Productos_Entrega = null;
        $scope.Filter_MD_Productos_Entrega = null;
        $scope.MPoreq_Entrega = parseInt(row.OREQ);
        $scope.MPoord_Entrega = parseInt(row.OORD);
        $scope.MPcantidad_Entrega = parseInt(row.CANTIDAD);
        $scope.MPcantidadmax_Entrega = parseInt(row.MAX);
        $scope.MP_BtnAgAc_ENTREGA = false;
        $timeout(function () {
          $scope.MP_BtnAcAg_ENTREGA = true;
        }, 510);

      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.MPActuaCalc_PRO_ENTREGA_Lista = function (renglon) {
        if ($("#MPcantidad_Entrega").val() > 0 && $("#MPcantidad_Entrega").val() <= $scope.MPcantidadmax_Entrega) {
          for (var i = 0; i < $scope.MPproductos_ENTREGA_lista.length; i++) {
            if ($scope.MPproductos_ENTREGA_lista[i].RENGLON == renglon) {
              $scope.MPproductos_ENTREGA_lista[i].CANTIDAD = parseInt($("#MPcantidad_Entrega").val());
            }
          }
          $scope.MP_BtnAcAg_ENTREGA = false;
          $timeout(function () {
            $scope.MP_BtnAgAc_ENTREGA = true;
          }, 510);
          Materialize.toast('¡Item actualizado!', 1500); $('.toast').addClass('default-background-dark');
          $scope.MPActualizar_PRO_ENTREGA_Lista();
          $scope.MPReset_PRO_ENTREGA_Variables();
          if ($('#tabla_modal_ENTREGA tr').hasClass('selected') == true) {
            $('tr.selected').removeClass('selected');
          }
        } else {
          Materialize.toast('¡La cantidad a entregar debe ser menor o igual a ' + $scope.MPcantidadmax_Entrega + '!', 1500); $('.toast').addClass('default-background-dark');
        }
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.MPBorrarCalc_PRO_ENTREGA_Lista = function (row) {
        swal({
          title: '¿Esta seguro que desea eliminar el producto de su entrega?',
          type: "info",
          showCancelButton: true,
        }).catch(swal.noop)
          .then((willDelete) => {
            if (willDelete) {
              $scope.MPproductos_ENTREGA_lista.splice($scope.MPproductos_ENTREGA_lista.findIndex(obj => obj.RENGLON == row.RENGLON), 1);
              $scope.MPproductos_ENTREGA_lista[$scope.MPproductos_ENTREGA_lista.findIndex(obj => obj.RENGLON == row.RENGLON)] = {
                RENGLON: '', COD_PRO: $scope.MPproducto_Entrega_COD, NOM_PRO: $scope.MPproducto_Entrega_NOM,
                CANTIDAD: parseInt($("#MPcantidad_Entrega").val()), OREQ: $scope.MPoreq_Entrega, OORD: $scope.MPoord_Entrega, MAX: parseInt($scope.MPcantidadmax_Entrega)
              };
              $scope.MPActualizar_PRO_ENTREGA_Lista();
              $scope.MPReset_PRO_ENTREGA_Variables();
              if ($scope.MPproductos_ENTREGA_lista == '') {
                $scope.MPproductos_ENTREGA_lista = null;
              }
              $scope.$apply();
              $('.selected').removeClass('selected');
            } else {
            }
          });

      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.MPReset_PRO_ENTREGA_Variables = function () {
        $scope.MPproducto_Entrega = null;
        $scope.MPproducto_Entrega_NOM = null;
        $scope.MPproducto_Entrega_SAVE = null;
        $scope.MPproducto_Entrega_COD = null;
        $scope.Filter_MD_Productos_Entrega = null;
        $scope.MPcantidad_Entrega = 1;
        $scope.MPoreq_Entrega = '';
        $scope.MPoord_Entrega = '';
        $scope.MPcantidadmax_Entrega = 0;
      }

      $scope.MPGuardar_PRO_ENTREGA = function () {
        if ($scope.h3ubicacion != null && $scope.h3ubicacion != undefined && $scope.h3ubicacion != '') {
          if ($scope.MPproductos_ENTREGA_lista != null) {
            if ($scope.h3mesadeayuda != null) {
              var xProductos = angular.copy($scope.MPproductos_ENTREGA_lista);
              var Productos = null;
              for (let y = 0; y < xProductos.length; y++) {
                if (Productos == null) {
                  Productos = [
                    {
                      COD_PRO: xProductos[y].COD_PRO, CANTIDAD: xProductos[y].CANTIDAD,
                      OREQ: xProductos[y].OREQ, OORD: xProductos[y].OORD
                    }
                  ];
                } else {
                  Productos.push({
                    COD_PRO: xProductos[y].COD_PRO, CANTIDAD: xProductos[y].CANTIDAD,
                    OREQ: xProductos[y].OREQ, OORD: xProductos[y].OORD
                  });
                }
              }
              swal({
                title: '¿Esta seguro que desea confirmar la entrega?',
                text: 'La mesa de ayuda seleccionada automáticamente se cerrará.',
                type: "info",
                showCancelButton: true,
              }).catch(swal.noop)
                .then((willDelete) => {
                  if (willDelete) {
                    $http({
                      method: 'POST',
                      url: "php/gestiondocumental/adminventario.php",
                      data: {
                        function: 'RegistrarEntrega',
                        cedula_soli: $scope.h3cedula_soli,
                        ubicacion: $scope.h3ubicacion,
                        cedula_ent: $scope.Rol_Cedula,
                        acas: $scope.h3mesadeayuda,
                        bodega: $scope.rol,
                        cantidad: Productos.length,
                        PRODUCTOS: JSON.stringify(Productos)
                      }
                    }).then(function (response) {
                      if (response.data.length == 0) {
                        Materialize.toast('¡No existen registros!', 1500); $('.toast').addClass('default-background-dark');
                      }
                      if (response.data.length > 0) {
                        swal({
                          title: "¡Orden de entrega generada!",
                          type: "success",
                          timer: 2000
                        }).catch(swal.noop);
                        $scope.Do_Imprimir(response.data[0].ACAS, 'Entrega', $scope.h3cedula_soli, $scope.h3ubicacion);
                        $scope.H3_RESTART_TODO();
                      }
                    });
                  } else {
                  }
                });
            } else {
              Materialize.toast('¡Debe elegir una mesa de ayuda!', 1500); $('.toast').addClass('default-background-dark');
            }
          } else {
            Materialize.toast('¡Seleccione por lo menos un producto!', 1500); $('.toast').addClass('default-background-dark');
          }
        } else {
          Materialize.toast('¡Por favor, Seleccione nuevamente la mesa de ayuda!', 1500); $('.toast').addClass('default-background-dark');
        }
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.H3Ver_Bodegas = true;
      $scope.H3Ver_Conceptos = false;
      $scope.H3Ver_Productos = false;

      $scope.Ver_Bodegas = function () {
        $("#collapsible-header-h3").removeClass(function () {
          return "active";
        }); $(".collapsible").collapsible({ accordion: true }); $(".collapsible").collapsible({ accordion: false });
        document.getElementById('collapsible-header-h3').scrollIntoView({ block: 'end', behavior: 'smooth' });
        /////////////
        $http({
          method: 'POST',
          url: "php/gestiondocumental/adminventario.php",
          data: {
            function: 'Ver_Bodegas',
            codigo: ($scope.rol == 1) ? '' : $scope.rol
          }
        }).then(function (response) {
          $scope.bodegas = response.data;
        });
        /////////////
        $timeout(function () {
          $scope.H3Ver_Bodegas = true;
          $scope.H3Ver_Conceptos = false;
          $scope.H3Ver_Productos = false;
          $("#collapsible-header-h3").addClass(function () {
            return "active";
          }); $(".collapsible").collapsible({ accordion: true }); $(".collapsible").collapsible({ accordion: true });
          $scope.ScrollDown_H(3);
        }, 1000);
      }


      $scope.Ver_Conceptos = function (codigo, bodega) {
        $("#collapsible-header-h3").removeClass(function () {
          return "active";
        }); $(".collapsible").collapsible({ accordion: true }); $(".collapsible").collapsible({ accordion: false });
        document.getElementById('collapsible-header-h3').scrollIntoView({ block: 'end', behavior: 'smooth' });
        /////////////
        $http({
          method: 'POST',
          url: "php/gestiondocumental/adminventario.php",
          data: {
            function: 'Ver_Bodegas_Conceptos',
            codigo: (codigo == undefined) ? $scope.h3bodega_cod : codigo
          }
        }).then(function (response) {
          $scope.bodegas_conceptos = response.data;
        });
        /////////////
        $timeout(function () {
          $scope.H3Ver_Bodegas = false;
          if (bodega == undefined) {
          } else {
            $scope.h3bodega_cod = codigo;
            $scope.h3bodega_nom = bodega;
          }
          $scope.H3Ver_Conceptos = true;
          $scope.H3Ver_Productos = false;
          $("#collapsible-header-h3").addClass(function () {
            return "active";
          }); $(".collapsible").collapsible({ accordion: true }); $(".collapsible").collapsible({ accordion: true });
          $scope.ScrollDown_H(3);
        }, 1000);
      }

      $scope.Ver_Bodegas_Conceptos_Productos = function (concepto, nombre) {
        if ($scope.datatable_INVT != null) {
          $scope.datatable_INVT.destroy();
          $scope.Array_inventario = null;
        }
        $("#collapsible-header-h3").removeClass(function () {
          return "active";
        }); $(".collapsible").collapsible({ accordion: true }); $(".collapsible").collapsible({ accordion: false });
        document.getElementById('collapsible-header-h3').scrollIntoView({ block: 'end', behavior: 'smooth' });
        $http({
          method: 'POST',
          url: "php/gestiondocumental/adminventario.php",
          data: {
            function: 'Ver_Bodegas_Conceptos_Productos',
            codigo: $scope.h3bodega_cod,
            concepto: concepto
          }
        }).then(function (response) {
          $scope.Array_inventario = response.data;
          $timeout(function () {
            $scope.datatable_INVT = $('#datatable_INVT').DataTable({
              language: {
                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
              },
              lengthMenu: [[10, 20, 50], [10, 20, 50]],
              pagingType: "numbers",
            });
          }, 1000);//END TIMEOUT
        });

        $timeout(function () {
          $scope.H3Ver_Bodegas = false;
          $scope.h3concepto_nom = nombre;
          $scope.H3Ver_Conceptos = false;
          $scope.H3Ver_Productos = true;
          $("#collapsible-header-h3").addClass(function () {
            return "active";
          }); $(".collapsible").collapsible({ accordion: true }); $(".collapsible").collapsible({ accordion: true });
          $scope.ScrollDown_H(3);
        }, 1000);
      }

      $scope.tiempo = 100;
      var stop;
      $scope.fight = function () {
        if (angular.isDefined(stop)) return;
        stop = $interval(function () {
          if ($scope.tiempo > 0) {
            $scope.tiempo = $scope.tiempo - 3;
          } else {
            $scope.stopFight();
          }
        }, 100);
      };

      $scope.stopFight = function () {
        if (angular.isDefined(stop)) {
          $interval.cancel(stop);
          stop = undefined;
          $scope.Ver_Grafico($scope.Grafico_TIPO, $scope.Grafico_GRAF);
          $scope.resetFight();
        }
      };

      $scope.resetFight = function () {
        $scope.tiempo = 100;
      };

      $scope.$on('$destroy', function () {
        $scope.stopFight();
      })
      $scope.change_temp = function () {
        if ($scope.tiempo == 100) {
          $scope.fight();
        } else if ($scope.tiempo != 100) {
          $scope.resetFight();
          $scope.change_temp();
        }
      }

      // $scope.Hab_pass = false;
      $scope.Hab_pass = true;
      const body = document.querySelector('body');

      body.onkeydown = function (e) {
        if ($scope.Hab_pass == false) {
          if (e.keyCode === 40) {
            (function () {
              $('#Key').modal();
            }());
            $('#Key').modal('open');
            document.getElementById("password").focus();
          }
        }
      }
      $("#password").change(function () {
        if (btoa(this.value) == "S2V2aW4h") {
          $scope.Hab_pass = true;
          $scope.$apply();
          $('#Key').modal('close');
          swal({
            title: "¡Permisos activados!",
            type: "success",
            timer: 2000
          }).catch(swal.noop)
        }
      });
    }]).directive('myCurrentTime', ['$interval', 'dateFilter',
      function ($interval, dateFilter) {
        return function (scope, element, attrs) {
          var format,
            stopTime;
          function updateTime() {
            element.text(dateFilter(new Date(), format));
          }
          scope.$watch(attrs.myCurrentTime, function (value) {
            format = value;
            updateTime();
          });
          stopTime = $interval(updateTime, 1000);
          element.on('$destroy', function () {
            $interval.cancel(stopTime);
          });
        }
      }]);