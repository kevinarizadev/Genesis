'use strict';
angular.module('GenesisApp').controller('gestionacasauditores', ['$scope', '$http', 'ngDialog', function ($scope, $http, ngDialog) {

  $(document).ready(function () {
    $scope.obtener_gestionacasauditores();
  });

  $scope.panel = { activo: 1, titulo: "", ttemp: "" };
  $scope.acaspordepts = [];
  $scope.listacas = [];
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
    url: "php/tic/controlacas/Racas.php",
    data: { function: 'obtenerDptoTic' }
  }).then(function (response) {
    $http({
      method: 'POST',
      url: "php/tic/controlacas/Racas.php",
      data: { function: 'obtenerDptoIPS' }
    }).then(function (response_1) {
      $scope.acaspordepts = response.data;
      $scope.acaspordepts.push(response_1.data[0]);
      $scope.totalOpen = 0;
      $scope.totalClose = 0;
      for (const i in $scope.acaspordepts) {
        if ($scope.acaspordepts.hasOwnProperty(i)) {
          $scope.totalOpen += $scope.acaspordepts[i].activo;
          $scope.totalClose += $scope.acaspordepts[i].Procesado;
        }
      }
      swal.close();
    })
  })


  $scope.obtener_gestionacasauditores = function (nombre_concepto) {
    $scope.Listado_Ips = null;
    $http({
      method: 'POST',
      url: "php/salud/gestionacasauditores.php",
      data: {
        function: 'obtener_gestionacasauditores'
      }
    }).then(function (response) {
      if (response.data != undefined) {
        $scope.Listado_Ips = response.data.json_ips;
        $scope.Listado_Eps = response.data.json_eps;
        console.table(response.data);
      }
      console.log(response.data);

    })

  }



  $scope.Get_Icon_Ips = function (n) {
    if (n == "1") {
      return "bubble_chart"
    }
    if (n == "2") {
      return "collections_bookmark"
    }
    if (n == "4") {
      return "contacts"
    }
    if (n == "3") {
      return "create_new_folder"
    }
    if (n == "5") {
      return "control_point_duplicate"
    }
    // if (n == ) {
    //   return ""
    // }
  }



  $scope.Get_Icon_Eps = function (n) {
    if (n == "1") {
      return "child_care"
    }
    if (n == "2") {
      return "local_pharmacy"
    }
    if (n == "3") {
      return "supervised_user_circle"
    }
  }

  $scope.getAcasConcepto_responsables = function (motivo, tipo, activos, procesados, nombre) {
    $scope.motivo_persona = motivo;
    $scope.tipo_persona = tipo;
    $scope.titulo_2 = nombre + " (Abiertos "+activos+" - Cerrados "+procesados+")";


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
      url: "php/salud/gestionacasauditores.php",
      data: { function: 'obteneracasmotivo_responsable', motivo: motivo, tipo: tipo }
    }).then(function (response) {
      if (response.data != undefined) {
        $scope.panel.activo = 2;
        $scope.Listado_Responsables = response.data;
        console.table($scope.Listado_Responsables);
      }
      $scope.totalOpenDpt = activos;
      $scope.totalCloseDpt = procesados;
      swal.close();
    })
  }


  $scope.getAcasConcepto = function (cedula, estado, cantidad, nombre) {
    var xestado = (estado == 'A')? 'Abiertos': 'Cerrados';
    $scope.titulo_3 = nombre + " ("+xestado+" "+cantidad+")";
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
      url: "php/salud/gestionacasauditores.php",
      data: { function: 'obteneracasconcepto', motivo: $scope.motivo_persona, estado: estado, tipo: $scope.tipo_persona, cedula: cedula }
    }).then(function (response) {
      console.log(response.data);
      if (response.data != undefined) {
        $scope.panel.activo = 3;
        $scope.listacas = response.data;
        $scope.listDatos = response.data;
        $scope.initPaginacion($scope.listDatos);
        swal.close();

      }
      $scope.totalOpenDpt = activos;
      $scope.totalCloseDpt = procesados;
      swal.close();
    })
  }




  // $scope.documentoq = "RE";
  // $scope.tipoacas = "EP";
  // $scope.numero = "75736";
  // $scope.ubicacion = "8638";

  // $scope.obteneracasdetalle = function () {

  //   $http({
  //     method: 'POST',
  //     url: "php/contratacion/gestionacascontratacion.php",
  //     data: { function: 'obteneracasdetalle',
  //     documento : $scope.documentoq,
  //     tipoacas: $scope.tipoacas,
  //     numero : $scope.numero,
  //     ubicacion: $scope.ubicacion }
  //   }).then(function () {

  //   })
  // }


  $scope.obtenerAcasXPersona = function (cedula, estado, nombre, texto) {
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
      url: "php/tic/controlacas/Racas.php",
      data: { function: 'obtenerAcasXPersona', cedula: cedula, estado: estado }
    }).then(function (response) {
      $scope.panel.activo = 3;
      $scope.listacas = response.data;
      $scope.panel.titulo = "(" + $scope.listacas.length + ") Servicios " + texto + " de " + nombre;
      $scope.cloneHeadFixed();
      setTimeout(() => {
        swal.close();
      }, 300);
    })
  }
  $scope.verdescripcion = function (desc, ticket, Cod_Ubicacion) {
    $scope.desc = desc;
    $scope.ticket = ticket;
    $scope.ubicacion = Cod_Ubicacion;
    ngDialog.open({
      template: 'views/contratacion/modalgestionacascontratacion.html',
      className: 'ngdialog-theme-plain',
      controller: 'modalgestionacascontratacion',
      scope: $scope
    });
  }

  // $scope.verdescripcion = function (desc, ticket, Cod_Ubicacion) {
  //   $scope.desc = desc;
  //   $scope.ticket = ticket;
  //   $scope.ubicacion = Cod_Ubicacion;
  //   ngDialog.open({
  //     template: 'views/tic/modal/ModalDetalles.html',
  //     className: 'ngdialog-theme-plain',
  //     controller: 'gestionacasticModalController',
  //     scope: $scope
  //   });
  // }
  $scope.buscarAcas = function (opcion) {
    $scope.panel.activo = 4;
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
      url: "php/tic/controlacas/Racas.php",
      data: { function: 'obtenerAcas', keyword: opcion }
    }).then(function (response) {
      $scope.listacas = response.data;
      $scope.panel.titulo = "(" + $scope.listacas.length + ") Resultados de la busqueda de: " + opcion;
      setTimeout(() => {
        swal.close();
      }, 300);
    })
  }
  $scope.cloneHeadFixed = function () {
    setTimeout(() => {
      var original = $('#tablaByCN>thead');
      var clone = $('#tablaByCN>thead').clone();
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
  $scope.changePanel = function () {
    if ($scope.panel.activo == 2) {
      $scope.panel.activo = 1;
    } else if ($scope.panel.activo == 3) {
      $scope.panel.activo = 2;
      $scope.panel.titulo = $scope.panel.ttemp;
    }
  }
  $scope.colors = function (value) {
    if ($scope.panel.activo == 1) {
      return { height: Math.round(value * 100 / $scope.totalOpen) + '%' }
    } else if ($scope.panel.activo == 2 || $scope.panel.activo == 3) {
      return { height: Math.round(value * 100 / $scope.totalOpenDpt) + '%' }
    }
  }

  //TABLA

  $scope.initPaginacion = function (info) {
    $scope.listDatosTemp = info;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.valmaxpag = 10;
    $scope.pages = [];
    $scope.configPages();
  }
  $scope.filter = function (val) {
    $scope.listDatosTemp = $filter('filter')($scope.listDatos, val);
    $scope.configPages();
  }
  $scope.configPages = function () {
    $scope.pages.length = 0;
    var ini = $scope.currentPage - 4;
    var fin = $scope.currentPage + 5;
    if (ini < 1) {
      ini = 1;
      if (Math.ceil($scope.listDatosTemp.length / $scope.pageSize) > $scope.valmaxpag)
        fin = 10;
      else
        fin = Math.ceil($scope.listDatosTemp.length / $scope.pageSize);
    } else {
      if (ini >= Math.ceil($scope.listDatosTemp.length / $scope.pageSize) - $scope.valmaxpag) {
        ini = Math.ceil($scope.listDatosTemp.length / $scope.pageSize) - $scope.valmaxpag;
        fin = Math.ceil($scope.listDatosTemp.length / $scope.pageSize);
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
    if ($scope.listDatosTemp.length % $scope.pageSize == 0) {
      var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize);
    } else {
      var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize) + 1;
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
      if ($scope.listDatosTemp.length % $scope.pageSize == 0) {
        var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize);
      } else {
        var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize) + 1;
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



}]).filter('inicio', function () {
  return function (input, start) {
    if (input != undefined && start != NaN) {
      start = +start;
      return input.slice(start);
    } else {
      return null;
    }

  }

});


// }])
