'use strict';
angular.module('GenesisApp').controller('gestionjuridica', ['$scope', '$http', 'ngDialog', function ($scope, $http, ngDialog) {
  $scope.panel = true;
  $scope.user = "";
  $scope.tipo = false;
  function validar_json(str) {
    try {
      if (typeof str !== "string") {
        return false;
      } else {
        return (typeof JSON.parse(str) === 'object');
      }
    } catch (e) {
      return false;
    }
  }
  $scope.area = "J";
  $scope.obtenerListadoUser = function () {
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
      url: "php/juridica/gestionjuridica.php",
      data: {
        function: 'obtener_gestionacasjuridica',
        area: $scope.area
      }
    }).then(function (response) {
      if (validar_json(angular.toJson(response.data))) {
        $scope.lista_contratacion = response.data;
        $scope.totalOpen = 0;
        $scope.totalClose = 0;
        for (const i in $scope.lista_contratacion) {
          if ($scope.lista_contratacion.hasOwnProperty(i)) {
            $scope.totalOpen += $scope.lista_contratacion[i].ACTIVO;
            $scope.totalClose += $scope.lista_contratacion[i].PROCESADO;
          }
        }
        swal.close();
      } else {
        $scope.panel = false;
        $scope.lista_contratacion = [];
        swal.close();
        swal("Error", "El Json de respuesta no es valido", "error");
      }
    })
  }
  $scope.obtenerListadoUser();
  $scope.obtenerAcasXPersona = function (cedula, estado, nombre, tipo) {
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
      url: "php/juridica/gestionjuridica.php",
      data: {
        function: 'obtener_detalle_acas_juridica',
        cedula: cedula,
        estado: estado,
      }
    }).then(function (response) {
      if (validar_json(angular.toJson(response.data))) {
        try {
          $scope.listacas = response.data;
          $scope.panel = false;
          $scope.tipo = (tipo == "Abiertos") ? true : false;
          $scope.user = tipo + ": " + nombre;
          $scope.cloneHeadFixed();
          swal.close();
        } catch (error) {
          console.log("Algo anda mal" + error);
        }
      } else {
        $scope.panel = false;
        $scope.listacas = [];
        swal.close();
        swal("Error", "El Json de respuesta no es valido", "error");
      }
    })
  }
  $scope.buscarAcas = function (texto) {
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
      url: "php/contratacion/gestioncontratacion.php",
      data: { function: 'obtener_detalle_ticket', keyword: texto }
    }).then(function (response) {
      if (response.data[0].codigo != 1) {
        $scope.listacas = response.data;
        $scope.panel = false;
        $scope.tipo = true;
        $scope.user = ((response.data[0].estado == 'A') ? 'Activo' : 'Cerrado') + ": " + texto;
        $scope.filtrar = "";
        $scope.buscaracas = "";
        $scope.cloneHeadFixed();
        swal.close();
      } else {
        $scope.listacas = [];
        swal.close();
        swal("Error en la busqueda", response.data[0].mensaje, "error");
      }
    })
  }
  $scope.verdescripcion = function (desc, ticket, ubicacion) {
    $scope.desc = desc;
    $scope.ticket = ticket;
    $scope.ubicacion = ubicacion;
    ngDialog.open({
      template: 'views/tic/modal/ModalDetalles.html',
      className: 'ngdialog-theme-plain',
      controller: 'gestionaseguramientoModalcontroller',
      scope: $scope
    });
  }
  $scope.obtenerAcasDetalleXticket = function (ticket, ubicacion) {
    $http({
      method: 'POST',
      url: "php/aseguramiento/gestionaseguramiento.php",
      data: {
        function: 'obtenerAcasDetalleXticket', ticket: ticket,
        ubicacion: ubicacion
      }
    }).then(function (response) {
      $scope.listacasdetalle = response.data;
    })
  }
  $scope.descargafile = function (ruta) {
    console.log(ruta);
    $http({
       method: 'POST',
       url: "php/juridica/tutelas/functutelas.php",
       data: {
          function: 'descargaAdjunto',
          ruta: ruta
       }
    }).then(function (response) {
       //window.open("https://genesis.cajacopieps.com//temp/"+response.data);
       window.open("temp/" + response.data);
    });
 }
  $scope.cloneHeadFixed = function () {
    setTimeout(() => {
      var original = $('#tablaAseguramiento>thead');
      var clone = $('#tablaAseguramiento>thead').clone();
      var list = original[0].children[0].children;
      for (var i = 0; i < list.length; i++) {
        clone[0].children[0].children[i].style.width = list[i].offsetWidth + "px";
      }
      $('#tablaClone').html(clone).css("width", original[0].parentElement.offsetWidth + "px");;
    }, 500);
  }
  $(".scroll_x").on("scroll", function () {
    $(".scroll_x").scrollLeft($(this).scrollLeft());
  });
  $(window).resize(function () {
    $scope.cloneHeadFixed();
  });
  $scope.colors = function (value) {
    return { height: Math.round(value * 100 / $scope.totalOpen) + '%' }
  }
}])
