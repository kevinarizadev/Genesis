'use strict';

/**
 * @ngdoc overview
 * @name GenesisApp
 * @description
 * # GenesisApp
 *
 * Main module of the application.
 */
angular
  .module('GenesisApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    /*'ngRoute',*/
    'ngSanitize',
    'ngDialog',
    'ui.router',
    'ui.materialize',
    'ngMask',
    'toastr',
    'ngStorage',
    'ui.grid',/*  */
    'ui.grid.moveColumns',
    'ui.grid.resizeColumns',
    'chieffancypants.loadingBar',
    'pathgather.popeye'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, PopeyeProvider) {
     PopeyeProvider.defaults.containerClass = "my-modal-window";
    $locationProvider.html5Mode(false);
    $stateProvider.state('mara', {
      url: "/",
      abstract: true,
      template: '<ui-view/>'
    })
    var home = sessionStorage.getItem("home");
    $stateProvider.state('mara.' + home, {
      url: home,
      template: '<div ' + home + '></div>',
      data: { 'mara': 'Mara' }
    })
    $urlRouterProvider.otherwise('/' + home);
    $stateProvider.state('mara.logout', {
      template: '<div logout></div>',
      data: { 'mara': 'Mara' }
    })
    $stateProvider.state('mara.ausentismo', {
      url: 'ausentismo',
      templateUrl: 'views/ausentismo/ausentismo.html',
      data: { 'mara': 'Mara' }
    }).state('mara.censo-salud', {
      url: 'censo-salud',
      templateUrl: 'views/salud/censo.html',
      data: { 'mara': 'Mara' }
    }).state('mara.censo-chat', {
      url: 'censo-chat',
      template: '<div censo-chat></div>',
      data: { 'mara': 'Mara' }
    }).state('mara.censo-busqueda', {
      url: 'censo-chat',
      template: '<div censo-busqueda></div>',
      data: { 'mara': 'Mara' }
    }).state('mara.empleados', {
      url: 'empleados',
      template: '<div empresaempleado></div>',
      data: { 'mara': 'Mara' }
    }).state('mara.solicitudmovilidad', {
      url: 'movilidad/solicitud',
      templateUrl: 'views/movilidad/solicitud.html',
      data: { 'mara': 'Mara' }
    })
      .state('mara.historico-urgencia', {
        url: 'historicourgencia',
        template: '<div historicourgencia></div>',
        data: { 'mara': 'Mara' }
      })
      .state('mara.buscarpqr', {
        url: 'buscarpqr',
        template: '<div buscarpqr></div>',
        data: { 'mara': 'Mara' }
      })
      .state('mara.novedades', {
        url: 'novedades',
        templateUrl: 'views/consultaAfiliados/novedades.html',
        data: { 'mara': 'Mara' }
      })
      .state('mara.cargainterface', {
        url: 'cargainterface',
        templateUrl: 'views/financiera/cargainterface.html',
        data: { 'mara': 'Mara' }
      })

    if (sessionStorage.getItem("routes") != null) {
      JSON.parse(sessionStorage.getItem("routes")).forEach(function (element, i) {
        if (element.url != "mara.logout" && element.url != "mara.ausentismo" && element.url != "mara.censo-salud" && element.url != "mara.censo-chat" && element.url != "mara.empleados" && element.url != "mara.solicitudmovilidad" && element.url != "mara.solicitudmovilidad" && element.url != "mara.historico-urgencia" && element.url != "mara.novedades" && element.url != "mara.cargainterface") {
          $stateProvider.state(element.url, {
            url: element.url.split(".")[1],
            template: '<div ' + element.url.split(".")[1] + '></div>',
            data: { 'mara': 'Mara' }
          });
        }
      });
    } else {
      $.getJSON("php/obtenersession.php").done(function (respuesta) {
        if (respuesta == true) {
          window.location.href = 'index.html';
        } else {
          $.getJSON("php/paneladmin/obtenerpaneladmin.php", { idempresa: 1, idrol: respuesta.rolcod }).done(function (response) {
            if (response[0].hasOwnProperty('Codigo')) {
              window.location.href = 'index.html';
            } else {
              var array = [];
              if (response != undefined && response != "" && response != null && response.length > 0) {
                response.forEach(function (element) {
                  array = array.concat(element.options);
                })
              }
              sessionStorage.setItem("routes", JSON.stringify(array));
              array.forEach(function (element, i) {
                if (element.url != "mara.logout" && element.url != "mara.ausentismo" && element.url != "mara.censo-salud" && element.url != "mara.censo-chat" && element.url != "mara.empleados" && element.url != 'mara.buscarpqr' && element.url != "mara.solicitudmovilidad" && element.url != "mara.historico-urgencia" && element.url != "mara.novedades" && element.url != "mara.cargainterface") {
                  $stateProvider.state(element.url, {
                    url: element.url.split(".")[1],
                    template: '<div ' + element.url.split(".")[1] + '></div>',
                    data: { 'mara': 'Mara' }
                  });
                }
              });
            }
          }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log("Sidebar error", jqXHR, errorThrown);
            window.location.href = 'index.html';
          });
        }
      }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Session error", jqXHR, errorThrown);
        window.location.href = 'index.html';
      });
    }
  })
angular.module('GenesisApp').constant('config', {
  rltm: {
    service: "pubnub",
    config: {
      publishKey: "pub-c-0e208f20-5fe0-4747-b103-1e1aedce7fe8",
      subscribeKey: "sub-c-02c4ad3c-9651-11e8-8fa3-021bfc8e9552"
    }
  }
});
