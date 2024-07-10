(function () {
  'use strict';
  //page loading animation
  angular.module('GenesisApp').directive('apiLoading', apiLoading);
  angular.module('GenesisApp').directive('pageLoading', pageLoading);
  angular.module('GenesisApp').directive('numbersOnly', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          if (text) {
            var transformedInput = text.replace(/[^0-9]/g, '');

            if (transformedInput !== text) {
              ngModelCtrl.$setViewValue(transformedInput);
              ngModelCtrl.$render();
            }
            return transformedInput;
          }
          return undefined;
        }
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  });
  //
  angular.module('GenesisApp').directive('numbersDecimalOnly', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          if (text) {
            var transformedInput = text.replace(/[^0-9\.]/g, '');
            // console.log(transformedInput.split('.'));
            if ((transformedInput.split('.')).length == 3) { transformedInput = 0 }
            if (transformedInput !== text) {
              ngModelCtrl.$setViewValue(transformedInput);
              ngModelCtrl.$render();
            }
            return transformedInput;
          }
          return undefined;
        }
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  });
  angular.module('GenesisApp').directive('textOnly', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          if (text) {
            var transformedInput = text.replace(/[^a-zA-Z]/g, '');

            if (transformedInput !== text) {
              ngModelCtrl.$setViewValue(transformedInput);
              ngModelCtrl.$render();
            }
            return transformedInput;
          }
          return undefined;
        }
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  });
  angular.module('GenesisApp').directive('textNumberOnly', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          if (text) {
            var transformedInput = text.replace(/\W/g, '');

            if (transformedInput !== text) {
              ngModelCtrl.$setViewValue(transformedInput);
              ngModelCtrl.$render();
            }
            return transformedInput;
          }
          return undefined;
        }
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  });
  angular.module('GenesisApp').directive('textDescription', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          if (text) {
            var transformedInput = text.replace(/[|°"#$%&*~''´¨´`¨¨¨<>]/g, '');
            transformedInput = transformedInput.replace(/(\r\n|\n|\r)/g, ' ');
            if (transformedInput !== text) {
              ngModelCtrl.$setViewValue(transformedInput);
              ngModelCtrl.$render();
            }
            return transformedInput;
          }
          return undefined;
        }
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  });
  angular.module('GenesisApp').directive('textUpper', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          if (text) {
            var transformedInput = text.toString().toUpperCase();

            if (transformedInput !== text) {
              ngModelCtrl.$setViewValue(transformedInput);
              ngModelCtrl.$render();
            }
            return transformedInput;
          }
          return undefined;
        }
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  });
  //
  // documentation
  angular.module('GenesisApp').directive('documentation', documentation);

  //navigation
  angular.module('GenesisApp').directive('sensor', sensor);
  sensor.$inject = ['$rootScope', '$compile'];
  function sensor($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/sensor/sensor.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'sensorController',
      controllerAs: 'pictrl'
    };
  }
  angular.module('GenesisApp').directive('administracionpqr', administracionpqr);

  administracionpqr.$inject = ['$rootScope', '$compile'];
  function administracionpqr($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/siau/admonpqrs/adminpqr.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'adminpqrController',
      controllerAs: 'adminpqrctrl'
    };
  }

  angular.module('GenesisApp').directive('impresionmasiva', impresionmasiva);

  impresionmasiva.$inject = ['$rootScope', '$compile'];
  function impresionmasiva($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/financiera/impresionmasiva.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'impresionmasivaController',
      controllerAs: ''
    };
  }

  angular.module('GenesisApp').directive('indicadoresriesgos', indicadoresriesgos);

  indicadoresriesgos.$inject = ['$rootScope', '$compile'];
  function indicadoresriesgos($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/riesgos/indicadoresriesgos.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'indicadoresriesgosController',
      controllerAs: ''
    };
  }

  angular.module('GenesisApp').directive('gestionpqr', gestionpqr);

  gestionpqr.$inject = ['$rootScope', '$compile'];
  function gestionpqr($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/siau/pqr/gestionpqr.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionpqrController',
      controllerAs: 'gestionpqrctrl'
    };
  }

  angular.module('GenesisApp').directive('auditoriaensalud', auditoriaensalud);

  auditoriaensalud.$inject = ['$rootScope', '$compile'];
  function auditoriaensalud($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/resolucion3100.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'resolucion_3100_controller',
      controllerAs: 'res3100ctrl'
    };
  }

  angular.module('GenesisApp').directive('validadormedicamentos', validadormedicamentos);
  function validadormedicamentos($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/validadormedicamentos.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'validadormedicamentosController',
      // controllerAs: 'vmctrl'
    };
  }

  angular.module('GenesisApp').directive('lineaeticadenuncia', lineaeticadenuncia);

  lineaeticadenuncia.$inject = ['$rootScope', '$compile'];
  function lineaeticadenuncia($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/juridica/lineaeticadenuncia.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'LineaEticaDenunciaController'
    };
  }

  angular.module('GenesisApp').directive('validador1552', validador1552);
  function validador1552($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/validador_1552.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'validador1552',
      // controllerAs: 'vmctrl'
    };
  }


  angular.module('GenesisApp').directive('modelos', modelos);

  modelos.$inject = ['$rootScope', '$compile'];
  function modelos($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/analitica/modelos.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'modelosController'
    };
  }
  angular.module('GenesisApp').directive('adminmodelos', adminmodelos);

  adminmodelos.$inject = ['$rootScope', '$compile'];
  function adminmodelos($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/analitica/adminmodelos.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'adminmodelosController'
    };
  }

  angular.module('GenesisApp').directive('tablerogestionpqrips', tablerogestionpqrips);

  tablerogestionpqrips.$inject = ['$rootScope', '$compile'];
  function tablerogestionpqrips($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/siau/pqr/tablerogestionpqrips.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      }
    };
  }

  angular.module('GenesisApp').directive('tableroradicacion', tableroradicacion);

  tableroradicacion.$inject = ['$rootScope', '$compile'];
  function tableroradicacion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/Cuentasmedicas/tableroradicacion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      }
    };
  }

  angular.module('GenesisApp').directive('adminempleadomes', adminempleadomes);
  function adminempleadomes($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/talentohumano/adminempleadomes.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'adminempleadomesController',
      // controllerAs: 'vmctrl'
    };
  }

  angular.module('GenesisApp').directive('afiliacionpaginaweb', afiliacionpaginaweb);
  function afiliacionpaginaweb($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/aseguramiento/afiliacionpaginaweb.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'afiliacionpaginawebController',
      // controllerAs: 'vmctrl'
    };
  }


  angular.module('GenesisApp').directive('consultacodigo', consultacodigo);

  consultacodigo.$inject = ['$rootScope', '$compile'];
  function consultacodigo($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/aseguramiento/consultacodigo.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'consultacodigoController'
    };
  }


  angular.module('GenesisApp').directive('usuariosipsautorizar', usuariosipsautorizar);

  usuariosipsautorizar.$inject = ['$rootScope', '$compile'];
  function usuariosipsautorizar($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/usuariosipsautorizar.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'usuariosipsautorizarController'
    };
  }


  angular.module('GenesisApp').directive('procesosespeciales', procesosespeciales);

  procesosespeciales.$inject = ['$rootScope', '$compile'];
  function procesosespeciales($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/aseguramiento/procesosespeciales.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'procesosespecialesController'
    };
  }


  angular.module('GenesisApp').directive('procesosespecialesf', procesosespecialesf);

  procesosespecialesf.$inject = ['$rootScope', '$compile'];
  function procesosespecialesf($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/financiera/procesosespecialesf.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'procesosespecialesFController'
    };
  }

  angular.module('GenesisApp').directive('promocionafi', promocionafi);

  promocionafi.$inject = ['$rootScope', '$compile'];
  function promocionafi($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/aseguramiento/promocionafi.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'promocionafiController'
    };
  }

  angular.module('GenesisApp').directive('preliminares', preliminares);

  preliminares.$inject = ['$rootScope', '$compile'];
  function preliminares($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/aseguramiento/preliminares.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'preliminaresController'
    };
  }

  angular.module('GenesisApp').directive('parametrizacioncodigourgencias', parametrizacioncodigourgencias);

  parametrizacioncodigourgencias.$inject = ['$rootScope', '$compile'];
  function parametrizacioncodigourgencias($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/financiera/parametrizacioncodigourgencias.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'parametrizacioncodigourgenciaController'
    };
  }

  angular.module('GenesisApp').directive('reporteautafiliados', reporteautafiliados);
  reporteautafiliados.$inject = ['$rootScope', '$compile'];
  function reporteautafiliados($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/reporteautafiliados.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'reporteautafiliadosController'
    };
  }


  angular.module('GenesisApp').directive('gestionautoafiliados', gestionautoafiliados);
  // gestionautoafiliados.$inject = ['$rootScope', '$compile'];
  function gestionautoafiliados($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/gestionautoafiliados.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionautoafiliadosController',
      controllerAs: 'actrl'
    };
  }


  angular.module('GenesisApp').directive('solicitudautafiliados', solicitudautafiliados);
  function solicitudautafiliados($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/solicitudautafiliados.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'solicitudautafiliadosController'//,
      //controllerAs:'pcctrl'
    };
  }


  angular.module('GenesisApp').directive('siauconsultapqrds', siauconsultapqrds);

  siauconsultapqrds.$inject = ['$rootScope', '$compile'];
  function siauconsultapqrds($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/afiliados/siauconsultapqrds.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'siauconsultapqrdsController'
    };
  }


  angular.module('GenesisApp').directive('tablerodecrecimiento', tablerodecrecimiento);

  tablerodecrecimiento.$inject = ['$rootScope', '$compile'];
  function tablerodecrecimiento($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/aseguramiento/tablero_crecimiento.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      }
    };
  }
  angular.module('GenesisApp').directive('tablerodeoficinas', tablerodeoficinas);

  tablerodeoficinas.$inject = ['$rootScope', '$compile'];
  function tablerodeoficinas($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/direccion/tablero_oficinas.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      }
    };
  }

  angular.module('GenesisApp').directive('consultarpqr', consultarpqr);
  function consultarpqr($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/siau/pqr/consultapqr.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'consultapqrController'//,
      //controllerAs:'pcctrl'
    };
  }
  angular.module('GenesisApp').directive('gestionactpgp', gestionactpgp);

  gestionactpgp.$inject = ['$rootScope', '$compile'];
  function gestionactpgp($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/contratacion/gestionactpgp.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionactpgpController',
      controllerAs: ''
    };
  }


  angular.module('GenesisApp').directive('reportesbint', reportesbint);
  reportesbint.$inject = ['$rootScope', '$compile'];
  function reportesbint($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/aseguramiento/ReportesBint.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'reportesbint'
    };
  }


  angular.module('GenesisApp').directive('consultadirhospitalario', consultadirhospitalario);

  consultadirhospitalario.$inject = ['$rootScope', '$compile'];
  function consultadirhospitalario($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/contratacion/consultadirhospitalario.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'consultadirhospitalarioController'
    };
  }

  angular.module('GenesisApp').directive('direccionamientohospitalario', direccionamientohospitalario);
  direccionamientohospitalario.$inject = ['$rootScope', '$compile'];
  function direccionamientohospitalario($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/contratacion/direccionamientohospitalario.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'direccionamientohospitalarioController'
    };
  }



  angular.module('GenesisApp').directive('consultapgpeps', consultapgpeps);

  consultapgpeps.$inject = ['$rootScope', '$compile'];
  function consultapgpeps($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/contratacion/consultapgpeps.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'consultapgpepsController',
      controllerAs: ''
    };
  }
  angular.module('GenesisApp').directive('autproductospgpeps', autproductospgpeps);
  autproductospgpeps.$inject = ['$rootScope', '$compile'];
  function autproductospgpeps($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/pgp/autproductospgpeps.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'autproductospgpepsController',
      controllerAs: ''
    };
  }
  angular.module('GenesisApp').directive('validacionprecontractual', validacionprecontractual);
  validacionprecontractual.$inject = ['$rootScope', '$compile'];
  function validacionprecontractual($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/contratacion/validacionprecontractual.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'validacionprecontractualController'
    };
  }
  angular.module('GenesisApp').directive('direccionamiento', direccionamiento);
  direccionamiento.$inject = ['$rootScope', '$compile'];
  function direccionamiento($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/contratacion/direccionamiento.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'direccionamientoController'
    };
  }

  angular.module('GenesisApp').directive('pruebainterna', pruebainterna);
  pruebainterna.$inject = ['$rootScope', '$compile'];
  function pruebainterna($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/contratacion/pruebainterna.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'pruebainternaController'
    };
  }

  angular.module('GenesisApp').directive('gestionpermisos', gestionpermisos);
  gestionpermisos.$inject = ['$rootScope', '$compile'];
  function gestionpermisos($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/contratacion/gestionpermisos.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionpermisosController'
    };
  }
  angular.module('GenesisApp').directive('configurarresponsables', configurarresponsables);
  configurarresponsables.$inject = ['$rootScope', '$compile'];
  function configurarresponsables($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/siau/pqr/configresponsables.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'configurarresponsablesController',
      controllerAs: 'configurarresponsablesctrl'
    };
  }
  angular.module('GenesisApp').directive('anularautorizaciones', anularautorizaciones);
  angular.module('GenesisApp').directive('anularautnopbs', anularautnopbs);
  angular.module('GenesisApp').directive('admincostoaut', admincostoaut);

  angular.module('GenesisApp').directive('excepcionmipres', excepcionmipres);
  excepcionmipres.$inject = ['$rootScope', '$compile'];
  function excepcionmipres($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/excepcionmipres.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'excepcionmipresController',
      controllerAs: 'exctrl'
    };
  }
  angular.module('GenesisApp').directive('excepcionerror50', excepcionerror50);
  excepcionerror50.$inject = ['$rootScope', '$compile'];
  function excepcionerror50($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/excepcionerror50.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'excepcionerror50Controller',
      controllerAs: 'exctrl'
    };
  }

  angular.module('GenesisApp').directive('afiliacion', afiliacion);
  afiliacion.$inject = ['$rootScope', '$compile'];
  function afiliacion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/afiliacionLinea/afiliacionlinea.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'AfiliacionLineaController'
    };
  }
  anularautnopbs.$inject = ['$rootScope', '$compile'];
  function anularautnopbs($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/anular_autorizaciones_nopbs.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'anularAutorizacionopbsController',
      controllerAs: 'actrl'
    };
  }

  anularautorizaciones.$inject = ['$rootScope', '$compile'];
  function anularautorizaciones($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/anular_autorizaciones.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'anularAutorizacionController',
      controllerAs: 'actrl'
    };
  }

  angular.module('GenesisApp').directive('gestioncensocerrado', gestioncensocerrado);
  function gestioncensocerrado($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/gestioncensocerrado.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestioncensocerradoController',
      // controllerAs: 'vmctrl'
    };
  }

  angular.module('GenesisApp').directive('consultacostoaut', consultacostoaut);
  function consultacostoaut($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/consultacostoaut.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'consultacostoautController'//,
      //controllerAs:'pcctrl'
    };
  }

  function admincostoaut($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/admincostoaut.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'admincostoautController'//,
      //controllerAs:'pcctrl'
    };
  }

  angular.module('GenesisApp').directive('autorizamipres', autorizamipres);
  autorizamipres.$inject = ['$rootScope', '$compile'];
  function autorizamipres($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/autorizamipres.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'autorizamipresController',
      controllerAs: 'autorizamipresctrl'
    };
  }




  angular.module('GenesisApp').directive('navBar', navBar);
  angular.module('GenesisApp').directive('busquedacenso', busquedacenso);
  angular.module('GenesisApp').directive('topBar', topBar);
  angular.module('GenesisApp').directive('sideBar', sideBar);
  angular.module('GenesisApp').directive('footer', footer);
  //sidebar activator
  angular.module('GenesisApp').directive('current', current);
  angular.module('GenesisApp').directive('topBarCurrent', topBarCurrent);
  // dashboards
  angular.module('GenesisApp').directive('dashAnalytics', dashAnalytics);
  angular.module('GenesisApp').directive('dashGeneral', dashGeneral);
  angular.module('GenesisApp').directive('dashSales', dashSales);
  angular.module('GenesisApp').directive('dashInicio', dashInicio);
  angular.module('GenesisApp').directive('dashServer', dashServer);
  angular.module('GenesisApp').directive('dashSocial', dashSocial);
  //charts
  angular.module('GenesisApp').directive('chartsAm', chartsAm);
  angular.module('GenesisApp').directive('chartsC3', chartsC3);
  angular.module('GenesisApp').directive('chartsFl', chartsFl);
  angular.module('GenesisApp').directive('chartsHg', chartsHg);
  angular.module('GenesisApp').directive('chartsMo', chartsMo);
  /*  angular.module('GenesisApp').directive('censoSalud', censoSalud); */
  angular.module('GenesisApp').directive('censoChat', censoChat);
  angular.module('GenesisApp').directive('chartsSp', chartsSp);
  //media
  angular.module('GenesisApp').directive('mediaSliders', mediaSliders);
  angular.module('GenesisApp').directive('mediaGallery', mediaGallery);
  angular.module('GenesisApp').directive('mediaEffects', mediaEffects);
  //profile
  angular.module('GenesisApp').directive('profile', profile);
  //mail
  angular.module('GenesisApp').directive('mail', mail);
  //calendar
  angular.module('GenesisApp').directive('calendar', calendar);
  //layouts
  angular.module('GenesisApp').directive('layouts', layouts);
  //forms
  angular.module('GenesisApp').directive('formsElements', formsElements);
  angular.module('GenesisApp').directive('formsExtra', formsExtra);
  angular.module('GenesisApp').directive('formsWysiwyg', formsWysiwyg);
  //tables
  angular.module('GenesisApp').directive('regularTables', regularTables);
  angular.module('GenesisApp').directive('dtTables', dtTables);
  //ui-elements
  angular.module('GenesisApp').directive('uiButtons', uiButtons);
  angular.module('GenesisApp').directive('uiBreadcrumbs', uiBreadcrumbs);
  angular.module('GenesisApp').directive('uiCards', uiCards);
  angular.module('GenesisApp').directive('uiCollections', uiCollections);
  angular.module('GenesisApp').directive('uiColors', uiColors);
  angular.module('GenesisApp').directive('uiFooters', uiFooters);
  angular.module('GenesisApp').directive('uiNavbars', uiNavbars);
  angular.module('GenesisApp').directive('uiTypography', uiTypography);
  angular.module('GenesisApp').directive('uiWidgets', uiWidgets);
  angular.module('GenesisApp').directive('uiToasts', uiToasts);
  angular.module('GenesisApp').directive('uiTooltips', uiTooltips);
  //pages
  angular.module('GenesisApp').directive('pagesBlog', pagesBlog);
  angular.module('GenesisApp').directive('pages404', pages404);
  angular.module('GenesisApp').directive('pages500', pages500);
  angular.module('GenesisApp').directive('pagesFeed', pagesFeed);
  angular.module('GenesisApp').directive('pagesLock', pagesLock);
  angular.module('GenesisApp').directive('pagesMagazine', pagesMagazine);
  angular.module('GenesisApp').directive('pagesPricing', pagesPricing);
  angular.module('GenesisApp').directive('pagesLogin', pagesLogin);
  angular.module('GenesisApp').directive('pagesRegister', pagesRegister);
  angular.module('GenesisApp').directive('pagesTimeline', pagesTimeline);
  //e-commerce
  angular.module('GenesisApp').directive('ecCards', ecCards);
  angular.module('GenesisApp').directive('ecCarousel', ecCarousel);
  angular.module('GenesisApp').directive('ecDiscounts', ecDiscounts);
  angular.module('GenesisApp').directive('ecInvoice', ecInvoice);
  angular.module('GenesisApp').directive('ecProduct', ecProduct);
  angular.module('GenesisApp').directive('ecProducts', ecProducts);
  angular.module('GenesisApp').directive('ecOrders', ecOrders);
  //icons
  angular.module('GenesisApp').directive('iconsGoogle', iconsGoogle);
  angular.module('GenesisApp').directive('iconsMaterial', iconsMaterial);
  angular.module('GenesisApp').directive('iconsFontello', iconsFontello);

  // <!-- wikode -->

  angular.module('GenesisApp').directive('altagerencia', altagerencia);
  angular.module('GenesisApp').directive('superadmin', superadmin);

  // Alta gerencia
  altagerencia.$inject = ['$rootScope', '$compile'];
  function altagerencia($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/planeacion/altagerencia.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'AltaGerenciaController'
    };
  }

  // Alta gerencia
  superadmin.$inject = ['$rootScope', '$compile'];
  function superadmin($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/planeacion/superadmin.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'SuperAdminController'
    };
  }
  // <!-- wikode -->


  //afiliacion
  angular.module('GenesisApp').directive('infoBasica', infoBasica);
  angular.module('GenesisApp').directive('mesaControl', mesaControl);
  angular.module('GenesisApp').directive('logout', logout);
  //reporte digiturno
  angular.module('GenesisApp').directive('reportes', reportes);
  angular.module('GenesisApp').directive('reportess', reportess);

  // Seguimiento de gestante
  angular.module('GenesisApp').directive('seguimientodegestante', seguimientodegestante);
  angular.module('GenesisApp').directive('evoluciondedocumento', evoluciondedocumento);

  //Acas auditores
  angular.module('GenesisApp').directive('gestionacasauditores', gestionacasauditores);


  //Acas administrativo
  angular.module('GenesisApp').directive('gestionacasadm', gestionacasadm);


  //Acas autorizaciones
  angular.module('GenesisApp').directive('gestionacasauto', gestionacasauto);





  //Censo nuevo
  angular.module('GenesisApp').directive('consultacenso', consultacenso);

  angular.module('GenesisApp').directive('mivacunacovid', mivacunacovid);
  angular.module('GenesisApp').directive('modalmivacunax', modalmivacunax);


  angular.module('GenesisApp').directive('disentimientodevacunacion', disentimientodevacunacion);

  //Soportes de legalización
  angular.module('GenesisApp').directive('soporteslegalizacion', soporteslegalizacion);
  angular.module('GenesisApp').directive('gestiondelegalizacion', gestiondelegalizacion);
  angular.module('GenesisApp').directive('cuentacosto', cuentacosto);

  // angular.module('GenesisApp').directive('gestiondecapita', gestiondecapita);
  angular.module('GenesisApp').directive('historicodecapita', historicodecapita);


  //Acas cuentas medicas
  angular.module('GenesisApp').directive('gestionacascuentasm', gestionacascuentasm);

  // Intranet
  angular.module('GenesisApp').directive('procesos', procesos);
  angular.module('GenesisApp').directive('administradorsgc', administradorsgc);

  angular.module('GenesisApp').directive('adminprocesos', adminprocesos);
  angular.module('GenesisApp').directive('procesosa', procesosa);
  angular.module('GenesisApp').directive('programaauditorias', programaauditorias);
  //aseguramiento
  angular.module('GenesisApp').directive('reporteseadoc', reporteseadoc);
  angular.module('GenesisApp').directive('reporteslma', reporteslma);
  angular.module('GenesisApp').directive('reportesobaf', reportesobaf);
  angular.module('GenesisApp').directive('reporteskaseg', reporteskaseg);
  angular.module('GenesisApp').directive('reportesaecar', reportesaecar);
  angular.module('GenesisApp').directive('reportecrecimiento', reportecrecimiento);
  angular.module('GenesisApp').directive('prestadorescapita', prestadorescapita);
  //salud
  angular.module('GenesisApp').directive('gestionprescripcion', gestionprescripcion);
  angular.module('GenesisApp').directive('serviciosips', serviciosips);
  angular.module('GenesisApp').directive('reporteseris', reporteseris);
  angular.module('GenesisApp').directive('reportesecen', reportesecen);
  angular.module('GenesisApp').directive('reporteseges', reporteseges);
  angular.module('GenesisApp').directive('reporteseget', reporteseget);
  angular.module('GenesisApp').directive('censopendiente', censopendiente);
  angular.module('GenesisApp').directive('censotab', censotab);
  angular.module('GenesisApp').directive('evoluciontab', evoluciontab);
  angular.module('GenesisApp').directive('autorizaciontab', autorizaciontab);
  angular.module('GenesisApp').directive('gestionautorizacion', gestionautorizacion);
  angular.module('GenesisApp').directive('direccionamientoaut', direccionamientoaut);
  angular.module('GenesisApp').directive('unicahospitalaria', unicahospitalaria);
  angular.module('GenesisApp').directive('unicahospitalariaips', unicahospitalariaips);
  unicahospitalaria.$inject = ['$rootScope', '$compile'];
  function unicahospitalaria($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/gestionunicahospitalaria.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionunicahospitalariaController',
      controllerAs: 'actrl'
    };
  }
  angular.module('GenesisApp').directive('gestionunicahospitalaria', gestionunicahospitalaria);
  gestionunicahospitalaria.$inject = ['$rootScope', '$compile'];
  function gestionunicahospitalaria($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/gestionunicahospitalaria.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionunicahospitalariaController',
      controllerAs: 'actrl'
    };
  }
  angular.module('GenesisApp').directive('gestiondeprestacion', gestiondeprestacion);

  gestiondeprestacion.$inject = ['$rootScope', '$compile'];
  function gestiondeprestacion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/gestiondeprestacion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestiondeprestacionController',
      controllerAs: ''
    };
  }
  angular.module('GenesisApp').directive('consultaautorizaciones', consultaautorizaciones);
  angular.module('GenesisApp').directive('consultaautorizacion', consultaautorizacion);
  angular.module('GenesisApp').directive('auditoriaautorizaciones', auditoriaautorizaciones);
  angular.module('GenesisApp').directive('autprogramadas', autprogramadas);
  angular.module('GenesisApp').directive('gestionprogramadas', gestionprogramadas);
  angular.module('GenesisApp').directive('adminprogramadas', adminprogramadas);
  angular.module('GenesisApp').directive('consultaautnopbs', consultaautnopbs);
  angular.module('GenesisApp').directive('consultaautnopbsips', consultaautnopbsips);
  //salud publica
  angular.module('GenesisApp').directive('georeferenciacontrol', georeferenciacontrol);
  //Administrativa
  angular.module('GenesisApp').directive('reportesorgas', reportesorgas);
  angular.module('GenesisApp').directive('reportesoacasadmin', reportesoacasadmin);
  angular.module('GenesisApp').directive('docinve', docinve);
  angular.module('GenesisApp').directive('docpre', docpre);
  //Juridica
  angular.module('GenesisApp').directive('reportestacajuridico', reportestacajuridico);
  angular.module('GenesisApp').directive('gestiontutelas', gestiontutelas);
  //Servico al Cliente
  angular.module('GenesisApp').directive('reportessesa', reportessesa);
  //Tic
  angular.module('GenesisApp').directive('unitic', unitic);
  angular.module('GenesisApp').directive('reportestacas', reportestacas);
  angular.module('GenesisApp').directive('versionamiento', versionamiento);

  angular.module('GenesisApp').directive('configuracionacceso', configuracionacceso);
  angular.module('GenesisApp').directive('colmena', colmena);
  angular.module('GenesisApp').directive('calendariodirectivo', calendariodirectivo);
  angular.module('GenesisApp').directive('listarcuentas', listarcuentas);
  angular.module('GenesisApp').directive('usuarioadministrador', usuarioadministrador);
  angular.module('GenesisApp').directive('normatividad', normatividad);
  angular.module('GenesisApp').directive('controlproyectos', controlproyectos);
  angular.module('GenesisApp').directive('gestionproyectos', gestionproyectos);
  angular.module('GenesisApp').directive('calitic', calitic);
  angular.module('GenesisApp').directive('mesacontrol', mesacontrol);
  angular.module('GenesisApp').directive('consolidadoacessoips', consolidadoacessoips);
  angular.module('GenesisApp').directive('consolidadoacasips', consolidadoacasips);
  angular.module('GenesisApp').directive('modificarjefe', modificarjefe);
  angular.module('GenesisApp').directive('checktic', checktic);
  angular.module('GenesisApp').directive('teleorientacion', teleorientacion);

  //contraloria covid
  angular.module('GenesisApp').directive('contraloriacovid', contraloriacovid);
  angular.module('GenesisApp').directive('contraloriacovidinfo', contraloriacovidinfo);

  //Inventario
  angular.module('GenesisApp').directive('listaChequeo', listaChequeo);
  angular.module('GenesisApp').directive('abrirInventario', abrirInventario);
  angular.module('GenesisApp').directive('consultaracas', consultaracas);
  //talento humano
  angular.module('GenesisApp').directive('solicitudpermiso', solicitudpermiso);
  angular.module('GenesisApp').directive('aprobacionpermiso', aprobacionpermiso);
  angular.module('GenesisApp').directive('datosempleados', datosempleados);
  angular.module('GenesisApp').directive('admndatosempleados', admndatosempleados);
  angular.module('GenesisApp').directive('consultadatosempleados', consultadatosempleados);
  angular.module('GenesisApp').directive('plancapacitacion', plancapacitacion);
  //altocosto
  angular.module('GenesisApp').directive('altocosto', altocosto);
  angular.module('GenesisApp').directive('periodoaltocosto', periodoaltocosto);
  angular.module('GenesisApp').directive('vih', vih);
  angular.module('GenesisApp').directive('consvih', consvih);
  angular.module('GenesisApp').directive('indicadorescac', indicadorescac);
  //SIAU
  angular.module('GenesisApp').directive('codigourgencia', codigourgencia);
  angular.module('GenesisApp').directive('historicourgencia', historicourgencia);
  angular.module('GenesisApp').directive('pqr', pqr);
  angular.module('GenesisApp').directive('accionespqr', accionespqr);
  angular.module('GenesisApp').directive('accionescorrespondencia', accionescorrespondencia);
  angular.module('GenesisApp').directive('buscarpqr', buscarpqr);
  angular.module('GenesisApp').directive('modificarpqr', modificarpqr);
  //autorizaciones
  angular.module('GenesisApp').directive('printautorizaciones', printautorizaciones);
  angular.module('GenesisApp').directive('confirmacionaut', confirmacionaut);
  //consulta afiliado ips
  angular.module('GenesisApp').directive('consultaAfiliadoips', consultaAfiliadoips);
  angular.module('GenesisApp').directive('marcacionPoblacion', marcacionPoblacion);
  angular.module('GenesisApp').directive('administracionPatologias', administracionPatologias);
  angular.module('GenesisApp').directive('consultautafiliados', consultautafiliados);
  //directive afiliacion
  //Mesa de control
  angular.module('GenesisApp').directive('mesadecontrol', mesadecontrol);
  // video
  angular.module('GenesisApp').directive('videoconferencia', videoconferencia);

  //Financiera
  angular.module('GenesisApp').directive('pagosips', pagosips);
  angular.module('GenesisApp').directive('confirmacion', confirmacion);
  angular.module('GenesisApp').directive('res1587hab', res1587hab);
  //Acas
  angular.module('GenesisApp').directive('acas', acas);
  angular.module('GenesisApp').directive('gacas', gacas);
  angular.module('GenesisApp').directive('aprobconfirmacion', aprobconfirmacion);
  angular.module('GenesisApp').directive('transporte', transporte);
  angular.module('GenesisApp').directive('alimento', alimento);
  angular.module('GenesisApp').directive('ercsol', ercsol);
  angular.module('GenesisApp').directive('cargainterface', cargainterface);
  angular.module('GenesisApp').directive('repmesadeayuda', repmesadeayuda);

  angular.module('GenesisApp').directive('pagoincapacidades', pagoincapacidades);

  angular.module('GenesisApp').directive('gestionacascontratacion', gestionacascontratacion);

  //juridica
  angular.module('GenesisApp').directive('gestionjuridica', gestionjuridica);

  // recobro
  angular.module('GenesisApp').directive('prescripcion', prescripcion);
  angular.module('GenesisApp').directive('gestionoperaciones', gestionoperaciones);
  angular.module('GenesisApp').directive('gestionacastic', gestionacastic);
  angular.module('GenesisApp').directive('mensajes', mensajes);
  angular.module('GenesisApp').directive('gestionprestaciones', gestionprestaciones);
  //Polla mundial
  angular.module('GenesisApp').directive('pollamundial', pollamundial);
  angular.module('GenesisApp').directive('adminpollamundial', adminpollamundial);
  angular.module('GenesisApp').directive('reservastec', reservastec);
  //GESTION ACAS ASEGURAMIENTO
  angular.module('GenesisApp').directive('gestionaseguramiento', gestionaseguramiento);
  angular.module('GenesisApp').directive('gestionacasmov', gestionacasmov);
  angular.module('GenesisApp').directive('mesacontrolmov', mesacontrolmov);
  angular.module('GenesisApp').directive('autorizacion', autorizacion);
  angular.module('GenesisApp').directive('solicitudprogramada', solicitudprogramada);

  angular.module('GenesisApp').directive('indicadores', indicadores);

  angular.module('GenesisApp').directive('admonmovilidad', admonmovilidad);
  // CNVU - SEGUIMIENTO DE ASESORES
  angular.module('GenesisApp').directive('seguimientoasesores', seguimientoasesores);
  // CNVU - GENERACION CAPITA ASEGURAMIENTO
  angular.module('GenesisApp').directive('generacioncapita', generacioncapita);
  angular.module('GenesisApp').directive('empleados', empleados);
  angular.module('GenesisApp').directive('informacionempresa', informacionempresa);// menu
  angular.module('GenesisApp').directive('procesobdua', procesobdua);
  angular.module('GenesisApp').directive('planeacionencuesta', planeacionencuesta);
  angular.module('GenesisApp').directive('admintic', admintic);
  angular.module('GenesisApp').directive('proyectostic', proyectostic);
  angular.module('GenesisApp').directive('usuariosips', usuariosips);
  angular.module('GenesisApp').directive('inicio', inicio);
  angular.module('GenesisApp').directive('inicioips', inicioips);
  angular.module('GenesisApp').directive('inicioafiliados', inicioafiliados);
  angular.module('GenesisApp').directive('inicioempresas', inicioempresas);
  angular.module('GenesisApp').directive('gestionarrendamientos', gestionarrendamientos);
  angular.module('GenesisApp').directive('adminventario', adminventario);
  angular.module('GenesisApp').directive('anticipos', anticipos);
  angular.module('GenesisApp').directive('adminanticipos', adminanticipos);
  angular.module('GenesisApp').directive('reporteprestaciones', reporteprestaciones);
  angular.module('GenesisApp').directive('datosbasicos', datosbasicos);
  angular.module('GenesisApp').directive('audcuentas', audcuentas);
  angular.module('GenesisApp').directive('reporteaudcuentas', reporteaudcuentas);
  angular.module('GenesisApp').directive('reportenotglosa', reportenotglosa);

  //Reportes
  angular.module('GenesisApp').directive('reportesaseg', reportesaseg);

  //MODULO DE ASEGURAMIENTO jeffer
  angular.module('GenesisApp').directive('planvacunacioncovid', planvacunacioncovid);
  angular.module('GenesisApp').directive('tablerodegestion', tablerodegestion);
  angular.module('GenesisApp').directive('tablerored', tablerored);
  angular.module('GenesisApp').directive('descarguebasecovid', descarguebasecovid);





  angular.module('GenesisApp').directive('autorizacionespendientes', autorizacionespendientes);
  angular.module('GenesisApp').directive('kpitutelas', kpitutelas);




  angular.module('GenesisApp').directive('notificacionglosa', notificacionglosa);
  //nacimientos
  angular.module('GenesisApp').directive('nacimientos', nacimientos);// nacimiento

  angular.module('GenesisApp').directive('solicitudautorizacion', solicitudautorizacion);// esoa shirley
  angular.module('GenesisApp').directive('codigourgenciaips', codigourgenciaips);
  angular.module('GenesisApp').directive('historicourgenciaips', historicourgenciaips);//
  angular.module('GenesisApp').directive('reporteurgencia', reporteurgencia);
  //contrato
  angular.module('GenesisApp').directive('crearcontratacion', crearcontratacion);
  angular.module('GenesisApp').directive('gestioncontratacion', gestioncontratacion);
  angular.module('GenesisApp').directive('solicitudcontrato', solicitudcontrato);
  angular.module('GenesisApp').directive('consultacontrato', consultacontrato);
  //productos
  angular.module('GenesisApp').directive('productos', productos);
  //agendamiento ips
  angular.module('GenesisApp').directive('gestiondeservicios', gestiondeservicios);

  angular.module('GenesisApp').directive('consultapqr', consultapqr);
  angular.module('GenesisApp').directive('paneladmin', paneladmin);
  angular.module('GenesisApp').directive('certificadocartera', certificadocartera);

  angular.module('GenesisApp').directive('radicacionrips', radicacionrips);
  angular.module('GenesisApp').directive('radicacionripscapita', radicacionripscapita);
  angular.module('GenesisApp').directive('administracionrips', administracionrips);
  angular.module('GenesisApp').directive('carguesrips', carguesrips);
  angular.module('GenesisApp').directive('radicarfacturas', radicarfacturas);

  angular.module('GenesisApp').directive('ausentismoth', ausentismoth);

  angular.module('GenesisApp').directive('carguesofi', carguesofi);

  angular.module('GenesisApp').directive('covid19', covid19);

  angular.module('GenesisApp').directive('exclusionesproductos', exclusionesproductos);
  //Panel de Control
  angular.module('GenesisApp').directive('analiticadatos', analiticadatos);
  angular.module('GenesisApp').directive('misionales', misionales);
  angular.module('GenesisApp').directive('estrategico', estrategico);
  angular.module('GenesisApp').directive('apoyo', apoyo);
  angular.module('GenesisApp').directive('gestionradicados', gestionradicados);


  angular.module('GenesisApp').directive('historicodesnutricion', historicodesnutricion);
  angular.module('GenesisApp').directive('relacioncupsvsdx', relacioncupsvsdx);
  angular.module('GenesisApp').directive('negacionservicios', negacionservicios);
  angular.module('GenesisApp').directive('resolucion4505', resolucion4505);
  angular.module('GenesisApp').directive('resolucion4505ips', resolucion4505ips);
  angular.module('GenesisApp').directive('seguimientopres', seguimientopres);

  angular.module('GenesisApp').directive('ripsvalidado', ripsvalidado);
  angular.module('GenesisApp').directive('ripsradicado', ripsradicado);

  //Cartera
  angular.module('GenesisApp').directive('historicopago', historicopago);
  angular.module('GenesisApp').directive('incumplimientopago', incumplimientopago);
  angular.module('GenesisApp').directive('informesdecartera', informesdecartera);
  angular.module('GenesisApp').directive('llamadarecibida', llamadarecibida);
  angular.module('GenesisApp').directive('llamadatelecobro', llamadatelecobro);
  angular.module('GenesisApp').directive('consultacartera', consultacartera);
  angular.module('GenesisApp').directive('avisoincumplimiento', avisoincumplimiento);
  angular.module('GenesisApp').directive('tarifacategoria', tarifacategoria);

  angular.module('GenesisApp').directive('procesosbdua', procesosbdua);
  procesosbdua.$inject = ['$rootScope', '$compile'];
  function procesosbdua($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/basededatos/procesosbdua.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'ProcesosBDUAController'
    };
  }


  const createModule = (options) => {
    const createModuleFunction = ($rootScope, $compile) => {
      return {
        restrict: 'EA',
        templateUrl: options.templateUrl,
        replace: true,
        link: (scope, element) => {
          $compile(element.contents())($rootScope);
        },
        controller: options.controller
      }
    };

    createModuleFunction.$inject = ['$rootScope', '$compile'];

    angular.module('GenesisApp').directive(options.directive, createModuleFunction);
  };

  const publicidad_notificacionesMoviles = {
    directive: 'notificacionesmoviles',
    templateUrl: 'views/publicidad/notificacionesmoviles.html',
    controller: 'notificacionesMovilesController'
  };

  createModule(publicidad_notificacionesMoviles);

  const aseguramiento_informeAmbuq = {
    directive: 'informeambuq',
    templateUrl: 'views/aseguramiento/informe-ambuq.html',
  };

  createModule(aseguramiento_informeAmbuq);

  const aseguramiento_informeAmbuqv = {
    directive: 'informeambuqv',
    templateUrl: 'views/aseguramiento/informe-ambuqv.html',
  };

  createModule(aseguramiento_informeAmbuqv);

  const informecomparta = {
    directive: 'informecomparta',
    templateUrl: 'views/aseguramiento/informe-comparta.html',
  };

  createModule(informecomparta);

  // CARGUE COVID
  const saludPublica_cargueCovid19 = {
    directive: 'cargueins',
    templateUrl: 'views/salud/cargueins.html',
    controller: 'cargueins'
  };

  createModule(saludPublica_cargueCovid19);


  const consultaCovid_datosCovid = {
    directive: 'afidatoscovid',
    templateUrl: 'views/consultaAfiliados/datoscovid19.html',
    controller: 'DatosCovidAfiliadoController'
  };

  createModule(consultaCovid_datosCovid);

  const saludPublica_cargueSismuestras = {
    directive: 'carguesismuestras',
    templateUrl: 'views/salud/carguesismuestras.html',
    controller: 'CargueSismuestrasController'
  };

  createModule(saludPublica_cargueSismuestras);

  const saludPublica_gestionIns = {
    directive: 'gestionins',
    templateUrl: 'views/saludpublica/gestionIns.html',
    controller: 'gestionInsController'
  };

  createModule(saludPublica_gestionIns);


  const siau_circular017 = {
    directive: 'circular017',
    templateUrl: 'views/siau/circular017.html',
    controller: 'circular017Controller'
  };

  createModule(siau_circular017);

  const saludPublica_circular = {
    directive: 'circularsaludpublica',
    templateUrl: 'views/saludpublica/circular-salud-publica.html',
    controller: 'circularSaludPublicaController'
  };

  createModule(saludPublica_circular);

  const saludPublica_reporte = {
    directive: 'reportecovid',
    templateUrl: 'views/saludpublica/report-salud-publica.html',
    controller: 'reporteSaludPublicaController'
  };

  createModule(saludPublica_reporte);

  const cartera_reporteAportante = {
    directive: 'reporteaportante',
    templateUrl: 'views/cartera/reporteaportante.html',
    controller: 'reporteAportanteController'
  };

  createModule(cartera_reporteAportante);

  angular.module('GenesisApp').directive('administracióncartera', administracióncartera);


  administracióncartera.$inject = ['$rootScope', '$compile'];
  function administracióncartera($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/cartera/Administracioncartera.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'AdministracioncarteraoController'
    };
  }

  //Consulta censo
  consultacenso.$inject = ['$rootScope', '$compile'];
  function consultacenso($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/consultacenso.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'consultacenso'
    };
  }


  mivacunacovid.$inject = ['$rootScope', '$compile'];
  function mivacunacovid($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/saludpublica/mivacunacovid.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'mivacunacovid'
    };
  }


  //Gestión de acas auditores
  gestionacasauditores.$inject = ['$rootScope', '$compile'];
  function gestionacasauditores($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/gestionacasauditores.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionacasauditores'
    };
  }



  //Gestión de acas administrativo
  gestionacasadm.$inject = ['$rootScope', '$compile'];
  function gestionacasadm($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/acas/gestionacasadm.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionacasadm'
    };
  }



  //Gestión de acas AUTORIZACIONES
  gestionacasauto.$inject = ['$rootScope', '$compile'];
  function gestionacasauto($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/gestionacasauto.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionacasauto'
    };
  }

  //Gestión de acas cuentas medicas
  gestionacascuentasm.$inject = ['$rootScope', '$compile'];
  function gestionacascuentasm($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/cuentasmedicas/gestionacascuentasm.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionacascuentasm'
    };
  }


  disentimientodevacunacion.$inject = ['$rootScope', '$compile'];
  function disentimientodevacunacion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/saludpublica/disentimientodevacunacion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'disentimientodevacunacion'
    };
  }


  modalmivacunax.$inject = ['$rootScope', '$compile'];
  function modalmivacunax($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/modal/modalmivacunax.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'modalmivacunax'
    };
  }


  // Seguimiento de gestante
  seguimientodegestante.$inject = ['$rootScope', '$compile'];
  function seguimientodegestante($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/afiliacionLinea/seguimientodegestante.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'seguimientodegestante'
    };
  }


  //Evolucion de documento
  evoluciondedocumento.$inject = ['$rootScope', '$compile'];
  function evoluciondedocumento($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/afiliacionLinea/evoluciondedocumento.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'evoluciondedocumento'
    };
  }

  // INFORME DE PROYECTO

  const tic_informeProyecto = {
    directive: 'informedeproyecto',
    templateUrl: 'views/tic/informeProyecto.html',
    controller: 'informeProyectoController'
  };

  createModule(tic_informeProyecto);

  const salud_tableroCenso = {
    directive: 'tablerocenso',
    templateUrl: 'views/salud/tableroCenso.html'
  };

  createModule(salud_tableroCenso);

  const salud_tableromedicamento = {
    directive: 'tableromedicamento',
    templateUrl: 'views/salud/tableroMedicamento.html'
  };
  createModule(salud_tableromedicamento);




  angular.module('GenesisApp').directive('consultacovid', consultacovid);
  consultacovid.$inject = ['$rootScope', '$compile'];
  function consultacovid($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/saludpublica/consultaafiliado.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'ConsultaAfiliadoCovidController'
    };
  }

  avisoincumplimiento.$inject = ['$rootScope', '$compile'];
  function avisoincumplimiento($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/cartera/AvisoIncumplimiento.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'AvisoinCumplimientoController'
    };
  }


  consultacartera.$inject = ['$rootScope', '$compile'];
  function consultacartera($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/cartera/ConsultaCartera.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'ConsultaCarteraController'
    };
  }

  historicopago.$inject = ['$rootScope', '$compile'];
  function historicopago($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/cartera/HistoricoCarta.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'HistoricoCartaController'
    };
  }

  angular.module('GenesisApp').directive('carguecubossispro', carguecubossispro);
  carguecubossispro.$inject = ['$rootScope', '$compile'];
  function carguecubossispro($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/epidemiologia/carguecubossispro.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'carguecubossisproController',
      controllerAs: ''
    };
  }

  incumplimientopago.$inject = ['$rootScope', '$compile'];
  function incumplimientopago($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/cartera/Incumplimientopago.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'IncumplimientopagoController'
    };
  }


  //Generacion de capita anterior bajado 12-09-2022
  /* generaciondecapita.$inject = ['$rootScope', '$compile'];
   function generaciondecapita($rootScope, $compile) {
     return {
       restrict: 'EA',
       templateUrl: 'views/contratacion/generaciondecapita.html',
       replace: true,
       link: function (scope, element) {
         $compile(element.contents())($rootScope);
       },
       controller: 'generaciondecapita'
     };
   }*/

  //Generacion de capita - Creacion Nueva 9-12-2022

  // Generacion de capita
  angular.module('GenesisApp').directive('generaciondecapita', generaciondecapita);
  generaciondecapita.$inject = ['$rootScope', '$compile'];
  function generaciondecapita($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/contratacion/generaciondecapita.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'generaciondeCapitaController'
    };
  }



  //historico de capita
  historicodecapita.$inject = ['$rootScope', '$compile'];
  function historicodecapita($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/contratacion/historicodecapita.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'historicodecapita'
    };
  }


  //Soportes de lagalización
  soporteslegalizacion.$inject = ['$rootScope', '$compile'];
  function soporteslegalizacion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/financiera/soporteslegalizacion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'soporteslegalizacion'
    };
  }

  //Gestión de lagalización
  gestiondelegalizacion.$inject = ['$rootScope', '$compile'];
  function gestiondelegalizacion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/financiera/gestiondelegalizacion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestiondelegalizacion'
    };
  }


  //Gestión de cuentas del costo
  cuentacosto.$inject = ['$rootScope', '$compile'];
  function cuentacosto($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/financiera/cuentacosto.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'cuentacosto'
    };
  }

  //Contraloria covid
  contraloriacovid.$inject = ['$rootScope', '$compile'];
  function contraloriacovid($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/contraloriacovid.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'contraloriacovid'
    };
  }

  //Contraloria covid info
  contraloriacovidinfo.$inject = ['$rootScope', '$compile'];
  function contraloriacovidinfo($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/contraloriacovidinfo.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'contraloriacovidinfo'
    };
  }

  //Gestión de acas juridica
  gestionjuridica.$inject = ['$rootScope', '$compile'];
  function gestionjuridica($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/juridica/gestionjuridica.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionjuridica'
    };
  }

  angular.module('GenesisApp').directive('gestiontipoproductopgp', gestiontipoproductopgp);
  gestiontipoproductopgp.$inject = ['$rootScope', '$compile'];
  function gestiontipoproductopgp($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/pgp/gestiontipoproductopgp.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestiontipoproductopgpController',
      controllerAs: ''
    };
  }


  //tarifa categoria
  tarifacategoria.$inject = ['$rootScope', '$compile'];

  function tarifacategoria($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/contratacion/tarifacategoria.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'tarifacategoriaController' //,
      //controllerAs:'pcctrl'
    };
  }

  ripsvalidado.$inject = ['$rootScope', '$compile'];
  function ripsvalidado($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/reporte_rips/reporte_rips_validado.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'reporte_rips_controller'
    };
  }

  ripsradicado.$inject = ['$rootScope', '$compile'];
  function ripsradicado($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/reporte_rips/reporte_rips_radicado.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'reporte_rips_controller'
    };
  }

  angular.module('GenesisApp').directive('gestionnacimiento', gestionnacimiento);
  gestionnacimiento.$inject = ['$rootScope', '$compile'];
  function gestionnacimiento($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/ips/registrarafiliados/gestionnacimiento.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'GestionNacimientoIPS'
    };
  }

  consultacontrato.$inject = ['$rootScope', '$compile'];
  function consultacontrato($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/contratacion/consulta_contrato.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'contratacionprecontractualController'

    };
  }

  notificacionglosa.$inject = ['$rootScope', '$compile'];
  function notificacionglosa($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/Cuentasmedicas/notificacionglosa.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'notificacionglosaController'

    };
  }

  angular.module('GenesisApp').directive('conciliaciondeglosas', conciliaciondeglosas);
  conciliaciondeglosas.$inject = ['$rootScope', '$compile'];
  function conciliaciondeglosas($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/Cuentasmedicas/conciliaciondeglosas.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'conciliaciondeglosasController'//,
      //controllerAs:'pcctrl'
    };
  }
  angular.module('GenesisApp').directive('conciliaciondeglosasips', conciliaciondeglosasips);
  conciliaciondeglosasips.$inject = ['$rootScope', '$compile'];
  function conciliaciondeglosasips($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/Cuentasmedicas/conciliaciondeglosasips.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'conciliaciondeglosasipsController'//,
      //controllerAs:'pcctrl'
    };
  }


  seguimientopres.$inject = ['$rootScope', '$compile'];
  function seguimientopres($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/recobro/seguimientopres.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      }
    };
  }

  resolucion4505ips.$inject = ['$rootScope', '$compile'];
  function resolucion4505ips($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/resolucion_4505_ips.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'resolucion_4505_ips_controller'
    };
  }
  resolucion4505.$inject = ['$rootScope', '$compile'];
  function resolucion4505($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/resolucion_4505.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'resolucion_4505_controller'
    };
  }

  relacioncupsvsdx.$inject = ['$rootScope', '$compile'];
  function relacioncupsvsdx($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/cupsvsdx.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'cupsvsdxController'//,
      //controllerAs:'pcctrl'
    };
  }
  // salud publica HISTORICO
  historicodesnutricion.$inject = ['$rootScope', '$compile'];
  function historicodesnutricion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/saludpublica/historicodesnutricion/historicodesnutricion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'historicodesnutricionController'
    };
  }

  angular.module('GenesisApp').directive('desnutricion', desnutricion);
  // salud publica
  desnutricion.$inject = ['$rootScope', '$compile'];
  function desnutricion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/saludpublica/desnutricion/desnutricion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'desnutricionController'
    };
  }
  angular.module('GenesisApp').directive('seguimientodesnutricion', seguimientodesnutricion);
  // salud publica IPS
  seguimientodesnutricion.$inject = ['$rootScope', '$compile'];
  function seguimientodesnutricion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/saludpublica/seguimientodesnutricion/seguimientodesnutricion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'seguimientodesnutricion'
    };
  }
  angular.module('GenesisApp').directive('registrodesnutricion', registrodesnutricion);
  // salud publica IPS REGISTRO
  registrodesnutricion.$inject = ['$rootScope', '$compile'];
  function registrodesnutricion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/saludpublica/registrodesnutricion/registrodesnutricion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'registrodesnutricionController'
    };
  }

  //gestionradicados

  gestionradicados.$inject = ['$rootScope', '$compile'];
  function gestionradicados($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/cuentasmedicas/gestionradicados.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionradicadoscontroller'
    };
  }
  //

  angular.module('GenesisApp').directive('consultasiniestros', consultasiniestros);
  consultasiniestros.$inject = ['$rootScope', '$compile'];
  function consultasiniestros($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/altocosto/consultasiniestros.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'consultasiniestrosController',
      controllerAs: 'mtctrl'
    };
  }


  angular.module('GenesisApp').directive('seguimientocac', seguimientocac);
  seguimientocac.$inject = ['$rootScope', '$compile'];
  function seguimientocac($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/altocosto/seguimientoCAC.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'seguimientoCACController',
    };
  }


  //Gestión de acas contratacion
  gestionacascontratacion.$inject = ['$rootScope', '$compile'];
  function gestionacascontratacion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/contratacion/gestionacascontratacion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionacascontratacion'
    };
  }

  //contratacion aldair
  angular.module('GenesisApp').directive('contratacionprecontractual', contratacionprecontractual);
  contratacionprecontractual.$inject = ['$rootScope', '$compile'];
  function contratacionprecontractual($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/contratacion/contratacionprecontractual.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'contratacionprecontractualController'
    };
  }
  //fin contratacion aldair


  angular.module('GenesisApp').directive('consolidadoips', consolidadoips);
  consolidadoips.$inject = ['$rootScope', '$compile'];
  function consolidadoips($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/ips/registrarafiliados/consolidadoips.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'ConsolidadoIPS'
    };
  }
  angular.module('GenesisApp').directive('infonacimiento', infonacimiento);
  infonacimiento.$inject = ['$rootScope', '$compile'];
  function infonacimiento($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/ips/registrarafiliados/infonacimiento.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'InfoNacimiento'
    };
  }


  angular.module('GenesisApp').directive('consolidadofuncionario', consolidadofuncionario);
  consolidadofuncionario.$inject = ['$rootScope', '$compile'];
  function consolidadofuncionario($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/ips/registrarafiliados/consolidadofuncionario.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'consolidadofuncionario'
    };
  }





  generaciondecartas.$inject = ['$rootScope', '$compile'];
  function generaciondecartas($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/cartera/GeneracionCarta.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'GeneracionCartaController'
    };
  }

  //exclusionesproductos
  exclusionesproductos.$inject = ['$rootScope', '$compile'];
  function exclusionesproductos($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/exclusionesproductos.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'exclusionesctrl',
    };
  }

  // Panel de control
  analiticadatos.$inject = ['$rootScope', '$compile'];
  function analiticadatos($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/panel_control/analiticadatos.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'analiticadatosController',
    };
  }
  misionales.$inject = ['$rootScope', '$compile'];
  function misionales($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/panel_control/misionales.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'misionalesController',
    };
  }
  estrategico.$inject = ['$rootScope', '$compile'];
  function estrategico($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/panel_control/estrategico.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'estrategicoController',
    };
  }

  apoyo.$inject = ['$rootScope', '$compile'];
  function apoyo($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/panel_control/apoyo.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'apoyoController',
    };
  }

  informesdecartera.$inject = ['$rootScope', '$compile'];
  function informesdecartera($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/cartera/InformeCartera.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'InformeCarteraController'
    };
  }
  angular.module('GenesisApp').directive('busquedasoportesaltoc', busquedasoportesaltoc);
  busquedasoportesaltoc.$inject = ['$rootScope', '$compile'];
  function busquedasoportesaltoc($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/altocosto/busquedasoportesaltoc.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'busquedasoportesaltocController',
    };
  }
  llamadarecibida.$inject = ['$rootScope', '$compile'];
  function llamadarecibida($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/cartera/LlamadaRecibida.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'LlamadaRecibidaController'
    };
  }

  llamadatelecobro.$inject = ['$rootScope', '$compile'];
  function llamadatelecobro($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/cartera/LlamadaTelecobro.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'LlamadaTelecobroController'
    };
  }

  // Fin Consulta Cartera


  covid19.$inject = ['$rootScope', '$compile'];
  function covid19($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/saludpublica/covid19.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'covid19Controller'
    };
  }


  carguesofi.$inject = ['$rootScope', '$compile'];
  function carguesofi($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/gestionriesgo/cargueSOFI.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'cargueSOFIController'
    };
  }

  angular.module('GenesisApp').directive('seggrupospriorizados', seggrupospriorizados);

  seggrupospriorizados.$inject = ['$rootScope', '$compile'];
  function seggrupospriorizados($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/gestionriesgo/seggrupospriorizados.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'seggrupospriorizadosController',
      controllerAs: ''
    };
  }
  angular.module('GenesisApp').directive('admingrupospriorizados', admingrupospriorizados);

  admingrupospriorizados.$inject = ['$rootScope', '$compile'];
  function admingrupospriorizados($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/gestionriesgo/admingrupospriorizados.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'admingrupospriorizadosController',
      controllerAs: ''
    };
  }

  angular.module('GenesisApp').directive('consultagrupospriorizados', consultagrupospriorizados);

  consultagrupospriorizados.$inject = ['$rootScope', '$compile'];
  function consultagrupospriorizados($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/gestionriesgo/consultagrupospriorizados.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'consultagrupospriorizadosController',
      controllerAs: ''
    };
  }

  angular.module('GenesisApp').directive('validadorgr', validadorgr);
  validadorgr.$inject = ['$rootScope', '$compile'];
  function validadorgr($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/gestionriesgo/validadorgr.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'validadorgrController' //,
      //controllerAs:'pcctrl'
    };
  }

  angular.module('GenesisApp').directive('riesgosycontroles', riesgosycontroles);
  function riesgosycontroles($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/riesgos/riesgosycontroles.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'riesgosycontrolesController'//,
      //controllerAs:'pcctrl'
    };
  }

  angular.module('GenesisApp').directive('mapaderiesgos', mapaderiesgos);
  function mapaderiesgos($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/riesgos/mapaderiesgos.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'mapaderiesgosController'//,
      //controllerAs:'pcctrl'
    };
  }

  angular.module('GenesisApp').directive('eventosmaterializados', eventosmaterializados);
  function eventosmaterializados($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/riesgos/eventosmaterializados.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'eventosmaterializadosController'//,
      //controllerAs:'pcctrl'
    };
  }

  angular.module('GenesisApp').directive('adminriesgos', adminriesgos);
  function adminriesgos($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/riesgos/adminriesgos.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'adminriesgosController'//,
      //controllerAs:'pcctrl'
    };
  }


  ausentismoth.$inject = ['$rootScope', '$compile'];
  function ausentismoth($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/talentohumano/ausentismo/ausentismo.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'ausentismoController'
    };
  }

  angular.module('GenesisApp').directive('confdefuncionarios', confdefuncionarios);
  confdefuncionarios.$inject = ['$rootScope', '$compile'];
  function confdefuncionarios($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/talentohumano/confdefuncionarios.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'confdefuncionariosController',
      controllerAs: ''
    };
  }

  angular.module('GenesisApp').directive('evaluacionempleadomes', evaluacionempleadomes);
  evaluacionempleadomes.$inject = ['$rootScope', '$compile'];
  function evaluacionempleadomes($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/talentohumano/evaluacionempleadomes.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'evaluacionempleadomesController',
      controllerAs: ''
    };
  }

  angular.module('GenesisApp').directive('certificadolaboral', certificadolaboral);

  certificadolaboral.$inject = ['$rootScope', '$compile'];
  function certificadolaboral($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/talentohumano/certificados/certificadolaboral.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'certificadolaboralController'
    };
  }



  angular.module('GenesisApp').directive('crearproductos', crearproductos);
  angular.module('GenesisApp').directive('tarifa', tarifa);
  carguesrips.$inject = ['$rootScope', '$compile'];
  function carguesrips($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/Cuentasmedicas/miscarguesrips.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'miscarguesripsController'//,
      //controllerAs:'pcctrl'
    };
  }

  angular.module('GenesisApp').directive('radicaciondigital', radicaciondigital);
  radicaciondigital.$inject = ['$rootScope', '$compile'];
  function radicaciondigital($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/cuentasmedicas/radicaciondigital.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'radicaciondigitalController'//,
      //controllerAs:'pcctrl'
    };
  }

  angular.module('GenesisApp').directive('consultausuarioips', consultausuarioips);
  consultausuarioips.$inject = ['$rootScope', '$compile'];
  function consultausuarioips($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/Cuentasmedicas/consulta_usuario_ips.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'consulta_usuario_ips_controller'
    };
  }
  angular.module('GenesisApp').directive('reportecopagoycuotamoderadora', reportecopagoycuotamoderadora);
  //Gestión de reporte copago y cuota moderadora
  reportecopagoycuotamoderadora.$inject = ['$rootScope', '$compile'];
  function reportecopagoycuotamoderadora($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/Cuentasmedicas/reportecopagoycuotamoderadora.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'reportecopagoycuotamoderadoraController'
    };
  }
  //productos
  tarifa.$inject = ['$rootScope', '$compile'];
  function tarifa($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/contratacion/tarifa.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'tarifactrl',
    };
  }



  busquedacenso.$inject = ['$rootScope', '$compile'];
  function busquedacenso($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/busquedacenso.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'busquedacensocontroller',
      controllerAs: 'busqucensoctrl'
    };
  }


  /*MIPRES*/
  angular.module('GenesisApp').directive('mipres', mipres);
  mipres.$inject = ['$rootScope', '$compile'];
  function mipres($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/recobro/MIPRES.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'MIPREScontroller'//,
      //controllerAs:'pcctrl'
    };
  }

  angular.module('GenesisApp').directive('analitica', analitica);
  analitica.$inject = ['$rootScope', '$compile'];
  function analitica($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/recobro/analitica.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      }
    };
  }


  angular.module('GenesisApp').directive('seguimientopres', seguimientopres);
  seguimientopres.$inject = ['$rootScope', '$compile'];
  function seguimientopres($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/recobro/seguimientopres.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      }
    };
  }

  angular.module('GenesisApp').directive('suministros', suministros);
  suministros.$inject = ['$rootScope', '$compile'];
  function suministros($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/recobro/suministros.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'suministroController'//,
      //controllerAs:'pcctrl'
    };
  }

  angular.module('GenesisApp').directive('carguevacunados', carguevacunados);
  carguevacunados.$inject = ['$rootScope', '$compile'];
  function carguevacunados($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/saludpublica/carguevacunados.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'CargueVacunadosController'//,
      //controllerAs:'pcctrl'
    };
  }
  angular.module('GenesisApp').directive('reporteentrega', reporteentrega);
  reporteentrega.$inject = ['$rootScope', '$compile'];
  function reporteentrega($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/recobro/reporteentrega.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'entregaController'
      // controllerAs: 'adminpqrctrl'
    };
  }

  angular.module('GenesisApp').directive('consultatercero', consultatercero);
  consultatercero.$inject = ['$rootScope', '$compile'];
  function consultatercero($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/administrativa/consultatercero.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'consultaterceroController',
      controllerAs: 'consultaterceroctrl'
    };
  }

  //crearproductos
  crearproductos.$inject = ['$rootScope', '$compile'];
  function crearproductos($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud//crearproductos.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'productoscreacionctrl',
    };
  }

  productos.$inject = ['$rootScope', '$compile'];
  function productos($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/productos.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'productosctrl',
    };
  }

  buscarpqr.$inject = ['$rootScope', '$compile'];
  function buscarpqr($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/siau/pqr/busquedapqr.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'pqrreportecontroller'
    };
  }

  angular.module('GenesisApp').directive('gestionacaspublicidad', gestionacaspublicidad);
  gestionacaspublicidad.$inject = ['$rootScope', '$compile'];
  function gestionacaspublicidad($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/tic/gestionacaspublicidad.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionacaspublicidadController',
      controllerAs: ''
    };
  }

  angular.module('GenesisApp').directive('adminbannergenesis', adminbannergenesis);
  adminbannergenesis.$inject = ['$rootScope', '$compile'];
  function adminbannergenesis($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/banner/adminbannergenesis.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'adminbannergenesisController',
      controllerAs: ''
    };
  }

  administracionrips.$inject = ['$rootScope', '$compile'];
  function administracionrips($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/Cuentasmedicas/administracionrips.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'administracionripsController'//,
      //controllerAs:'pcctrl'
    };
  }
  radicacionrips.$inject = ['$rootScope', '$compile'];
  function radicacionrips($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/Cuentasmedicas/radicacionrips.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'radicacionripsController'//,
      //controllerAs:'pcctrl'
    };
  }

  radicacionripscapita.$inject = ['$rootScope', '$compile'];
  function radicacionripscapita($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/Cuentasmedicas/radicacionripscapita.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'radicacionripscapitaController'//,
      //controllerAs:'pcctrl'
    };
  }


  angular.module('GenesisApp').directive('notglosa', notglosa);
  notglosa.$inject = ['$rootScope', '$compile'];
  function notglosa($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/Cuentasmedicas/notificacionglosaips.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'notificacionglosaipsController'//,
      //controllerAs:'pcctrl'
    };
  }


  angular.module('GenesisApp').directive('gesnotglosa', gesnotglosa);
  gesnotglosa.$inject = ['$rootScope', '$compile'];
  function gesnotglosa($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/Cuentasmedicas/gesnotificacionglosa.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gesnotificacionglosaController'//,
      //controllerAs:'pcctrl'
    };
  }


  angular.module('GenesisApp').directive('consultagesnotglosa', consultagesnotglosa);
  consultagesnotglosa.$inject = ['$rootScope', '$compile'];
  function consultagesnotglosa($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/cuentasmedicas/consultagesnotglosa.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'consultagesnotglosaController'
    };
  }

  radicarfacturas.$inject = ['$rootScope', '$compile'];
  function radicarfacturas($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/Cuentasmedicas/radicarfacturas.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'radicarfacturasController'//,
      //controllerAs:'pcctrl'
    };
  }


  certificadocartera.$inject = ['$rootScope', '$compile'];
  function certificadocartera($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/prestaciones/certificadocartera.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'PrestacionesEconomica'
    };
  }

  mesadeayudaips.$inject = ['$rootScope', '$compile'];
  function mesadeayudaips($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/tic/mesadeayudaips.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'mesadeayudaipsController'//,
      //controllerAs:'pcctrl'
    };
  }

  angular.module('GenesisApp').directive('consultarsolicitudacas', consultarsolicitudacas);
  consultarsolicitudacas.$inject = ['$rootScope', '$compile'];
  function consultarsolicitudacas($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/acas/consultarsolicitudacas.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'consultarsolicitudacasController'
    };
  }

  angular.module('GenesisApp').directive('celularesylineasmoviles', celularesylineasmoviles);
  celularesylineasmoviles.$inject = ['$rootScope', '$compile'];
  function celularesylineasmoviles($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/administrativa/celularesylineasmoviles.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'celularesylineasmovilesController',
      controllerAs: ''
    };
  }

  angular.module('GenesisApp').directive('bitacoraobjetosbd', bitacoraobjetosbd);

  bitacoraobjetosbd.$inject = ['$rootScope', '$compile'];
  function bitacoraobjetosbd($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/tic/bitacoraobjetosbd.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'bitacoraobjetosbdController',
      controllerAs: ''
    };
  }

  angular.module('GenesisApp').directive('consultaautrad', consultaautrad);
  consultaautrad.$inject = ['$rootScope', '$compile'];
  function consultaautrad($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/cuentasmedicas/consultaautrad.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'consultaautradController',
      controllerAs: ''
    };
  }

  repmesadeayuda.$inject = ['$rootScope', '$compile'];
  function repmesadeayuda($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/acas/repmesadeayuda.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'repmesadeayudaController'
    };
  }
  pagoincapacidades.$inject = ['$rootScope', '$compile'];
  function pagoincapacidades($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/financiera/pagoincapacidades.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'pagoincapacidadesController'
    };
  }
  //cargue IPS renal
  //angular.module('GenesisApp').directive('ercsol', ercsol);
  ercsol.$inject = ['$rootScope', '$compile'];
  function ercsol($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/ERCIPS/radicacionCAC.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'radicacioncacController',
      controllerAs: 'ercsolctrl'
    };
  }

  angular.module('GenesisApp').directive('mesadeayudaips', mesadeayudaips);

  angular.module('GenesisApp').directive('gestionmedicamentos', gestionmedicamentos);

  gestionmedicamentos.$inject = ['$rootScope', '$compile'];
  function gestionmedicamentos($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/gestion_medicamentos.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionmedicamentosController'
    };
  }

  angular.module('GenesisApp').directive('reportemedicamentos', reportemedicamentos);

  reportemedicamentos.$inject = ['$rootScope', '$compile'];
  function reportemedicamentos($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/reporte_medicamentos.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'reportemedicamentosController'
    };
  }

  angular.module('GenesisApp').directive('encuestapo', encuestapo);
  encuestapo.$inject = ['$rootScope', '$compile'];
  function encuestapo($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/encuestas/encuestapo.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'encuestapoController',
      controllerAs: ''
    };
  }

  angular.module('GenesisApp').directive('reportefacturasdescarge', reportefacturasdescarge);

  reportefacturasdescarge.$inject = ['$rootScope', '$compile'];
  function reportefacturasdescarge($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/Cuentasmedicas/reportefacturasdescarge.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'reportefacturasdescargeController'//,
      //controllerAs:'pcctrl'
    };
  }

  angular.module('GenesisApp').directive('consolidadoautorizado', consolidadoautorizado);
  consolidadoautorizado.$inject = ['$rootScope', '$compile'];

  function consolidadoautorizado($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/consolidadoautorizado.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'consolidadoautorizadoController'
    };
  }

  angular.module('GenesisApp').directive('soportemedicamentos', soportemedicamentos);

  soportemedicamentos.$inject = ['$rootScope', '$compile'];
  function soportemedicamentos($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/medicamentos_ips.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'medicamentos_ipsController'
    };
  }

  //gestion servicios de autorizacion
  gestiondeservicios.$inject = ['$rootScope', '$compile'];
  function gestiondeservicios($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/ips/gestion_servicios/gestion_servicios.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestion_serviciosController'//,
      //controllerAs:'pcctrl'
    };
  }

  // SIAU
  codigourgenciaips.$inject = ['$rootScope', '$compile'];
  function codigourgenciaips($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/siau/codigourgenciaips.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        $(".chosen").chosen();
      },
      controller: 'codigourgenciaipscontroller',
      controllerAs: 'cctrl'
    };
  }

  //solicitudservicios
  solicitudcontrato.$inject = ['$rootScope', '$compile'];
  function solicitudcontrato($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/solicitud_servicios.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'solicitud_serviciosController'//,
      //controllerAs:'pcctrl'
    };
  }


  //gestionprestaciones
  gestionprestaciones.$inject = ['$rootScope', '$compile'];

  function gestionprestaciones($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/aseguramiento/gestionprestaciones.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'liquidacionController',
    };
  }

  angular.module('GenesisApp').directive('direccionamientoips', direccionamientoips);
  direccionamientoips.$inject = ['$rootScope', '$compile'];
  function direccionamientoips($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/recobro/direccionamientoips.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'direccionamientoIPS'
    };
  }
  angular.module('GenesisApp').directive('consultaintegral', consultaintegral);
  consultaintegral.$inject = ['$rootScope', '$compile'];

  function consultaintegral($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/consultaAfiliados/consultaintegral.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'consultaIntegralController'
    };
  }

  prestadorescapita.$inject = ['$rootScope', '$compile'];
  function prestadorescapita($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/capita/prestadorescapita.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'prestadorescapitaController'
    };
  }

  //solicitudcontrato crear contratacion
  crearcontratacion.$inject = ['$rootScope', '$compile'];
  function crearcontratacion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/contratacion/crear_contratacion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'contratacionController'//,
      //controllerAs:'pcctrl'
    };
  }
  gestioncontratacion.$inject = ['$rootScope', '$compile'];
  function gestioncontratacion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/contratacion/gestioncontratacion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestioncontratacionController'
    };
  }
  angular.module('GenesisApp').directive('informescontratacion', informescontratacion);
  informescontratacion.$inject = ['$rootScope', '$compile'];
  function informescontratacion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/contratacion/informesContratacion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'informesContratacionController'
    };
  }
  //solicitud AUTORIZACION ESOA INTERNO
  solicitudautorizacion.$inject = ['$rootScope', '$compile'];
  function solicitudautorizacion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/solicitud_autorizacion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'solicitud_autorizacionController'//,
      //controllerAs:'pcctrl'
    };
  }

  consultapqr.$inject = ['$rootScope', '$compile'];
  function consultapqr($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/aseguramiento/consultapqr.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'ConsultaPQRController'
    };
  }



  //Digitalizacion
  angular.module('GenesisApp').directive('administracion', administracion);
  angular.module('GenesisApp').directive('revision', revision);
  angular.module('GenesisApp').directive('infodigitalizacion', infodigitalizacion);
  angular.module('GenesisApp').directive('gestiondigitalizacion', gestiondigitalizacion);
  angular.module('GenesisApp').directive('certificadoprestaciones', certificadoprestaciones);

  certificadoprestaciones.$inject = ['$rootScope', '$compile'];
  function certificadoprestaciones($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/prestaciones/certificado.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'PrestacionesEconomica'
    };
  }

  angular.module('GenesisApp').directive('informesmov', informesmov);
  informesmov.$inject = ['$rootScope', '$compile'];
  function informesmov($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/movilidad/informes_afiliacion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'informesController',
    };
  }

  angular.module('GenesisApp').directive('afiliacionenlinea', afiliacionenlinea);
  afiliacionenlinea.$inject = ['$rootScope', '$compile'];
  function afiliacionenlinea($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/movilidad/afiliacion_linea.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'afiliacion_linea_controller'
    };
  }

  angular.module('GenesisApp').directive('gestionafiliacion', gestionafiliacion);
  gestionafiliacion.$inject = ['$rootScope', '$compile'];
  function gestionafiliacion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/movilidad/gestion_afiliacion_linea.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestion_afiliacion_linea_controller'
    };
  }

  angular.module('GenesisApp').directive('declaracionsalud', declaracionsalud);
  angular.module('GenesisApp').directive('declaracionbeta', declaracionsalud);
  declaracionsalud.$inject = ['$rootScope', '$compile'];
  function declaracionsalud($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/consultaAfiliados/declaracionsalud.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'declaracionsaludctrl'
    };
  }

  angular.module('GenesisApp').directive('encuesta', encuesta);
  encuesta.$inject = ['$rootScope', '$compile'];
  function encuesta($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/consultaAfiliados/encuesta.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'encuestacontroller'
    };
  }
  angular.module('GenesisApp').directive('novedades', novedades);
  novedades.$inject = ['$rootScope', '$compile'];
  function novedades($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/consultaAfiliados/novedades.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'novedadescontroller'
    };
  }
  angular.module('GenesisApp').directive('reportesfinanciera', reportesfinanciera);
  reportesfinanciera.$inject = ['$rootScope', '$compile'];
  function reportesfinanciera($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/financiera/reportes.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'reportefinanciera'
    };
  }
  angular.module('GenesisApp').directive('informesentes', informesentes);
  informesentes.$inject = ['$rootScope', '$compile'];
  function informesentes($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/informes/informesentes.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'informesentesController'
    };
  }
  angular.module('GenesisApp').directive('inventario', inventario);
  inventario.$inject = ['$rootScope', '$compile'];
  function inventario($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/inventario/inventario.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'inventarioCtrl'
    };
  }
  angular.module('GenesisApp').directive('confirmaciónafiliacion', confirmaciónafiliacion);
  confirmaciónafiliacion.$inject = ['$rootScope', '$compile'];
  function confirmaciónafiliacion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/ips/registrarafiliados/confirmaciónafiliacion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'ConfirmacionAfiliadosIPS'
    };
  }
  angular.module('GenesisApp').directive('registrarafiliados', registrarafiliados);
  registrarafiliados.$inject = ['$rootScope', '$compile'];
  function registrarafiliados($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/ips/registrarafiliados/registrarafiliados.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'RegistrarAfliadosIPS'
    };
  }
  angular.module('GenesisApp').directive('demandas', demandas);
  demandas.$inject = ['$rootScope', '$compile'];
  function demandas($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/juridica/demandas/gestiondemandas.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'demandasController'
    };
  }
  angular.module('GenesisApp').directive('gestionsolicitudesmov', gestionsolicitudesmov);
  gestionsolicitudesmov.$inject = ['$rootScope', '$compile'];
  function gestionsolicitudesmov($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/movilidad/gestionsolicitud.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionsolicitudmovilidadctrl'
    };
  }
  angular.module('GenesisApp').directive('marcapoblacion', marcapoblacion);
  marcapoblacion.$inject = ['$rootScope', '$compile'];
  function marcapoblacion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/poblacionespecial.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'poblacionespecialctrl'
    };
  }
  angular.module('GenesisApp').directive('reportesalud', reportesalud);
  reportesalud.$inject = ['$rootScope', '$compile'];
  function reportesalud($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/reportes.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'reportesalud'
    };
  }
  angular.module('GenesisApp').directive('diagnosticosNulos', diagnosticosNulos);
  diagnosticosNulos.$inject = ['$rootScope', '$compile'];
  function diagnosticosNulos($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/diagnosticos_nulos.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'diagnuloscontroller'
    };
  }
  angular.module('GenesisApp').directive('frecuenciaCantidad', frecuenciaCantidad);
  frecuenciaCantidad.$inject = ['$rootScope', '$compile'];
  function frecuenciaCantidad($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/frecuenciacantidad.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'frecuenciacantidad'
    };
  }
  angular.module('GenesisApp').directive('frecuenciaValor', frecuenciaValor);
  frecuenciaValor.$inject = ['$rootScope', '$compile'];
  function frecuenciaValor($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/frecuenciavalor.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'frecuenciacontroller'
    };
  }
  angular.module('GenesisApp').directive('cups', cups);
  cups.$inject = ['$rootScope', '$compile'];
  function cups($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/cups.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'cupscontroller'
    };
  }
  angular.module('GenesisApp').directive('procedimientosNulos', procedimientosNulos);
  procedimientosNulos.$inject = ['$rootScope', '$compile'];
  function procedimientosNulos($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/procedimientos_nulos.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'procnuloscontroller'
    };
  }
  angular.module('GenesisApp').directive('reportesuficiencia', reportesuficiencia);
  reportesuficiencia.$inject = ['$rootScope', '$compile'];
  function reportesuficiencia($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/suficiencia/suficiencia.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'suficienciacontroller'//,
      //  controllerAs:'pcctrl'
    };
  }
  angular.module('GenesisApp').directive('ausentismo', ausentismo);
  ausentismo.$inject = ['$rootScope', '$compile'];
  function ausentismo($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/ausentismo/ausentismo.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'ausentismoCtrl'
    };
  }
  angular.module('GenesisApp').directive('empresaempleado', empresaempleado);
  empresaempleado.$inject = ['$rootScope', '$compile'];
  function empresaempleado($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/movilidad/empleados.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'empleadosController'
    };
  }
  angular.module('GenesisApp').directive('historialsolicitudesmov', historialsolicitudesmov);
  historialsolicitudesmov.$inject = ['$rootScope', '$compile'];
  function historialsolicitudesmov($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/movilidad/historial.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'missolicitudesctrl'
    };
  }








  gestiondigitalizacion.$inject = ['$rootScope', '$compile'];
  function gestiondigitalizacion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/digitalizacion/gestiondigitalizacion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'GestionDigitalizacionController'//,
      //  controllerAs:'pcctrl'
    };
  }


  infodigitalizacion.$inject = ['$rootScope', '$compile'];
  function infodigitalizacion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/digitalizacion/infodigitalizacion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'InfoDigitalizacionController'//,
      //  controllerAs:'pcctrl'
    };
  }
  //gestion de nacimientos
  nacimientos.$inject = ['$rootScope', '$compile'];
  function nacimientos($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/nacimientos/nacimientos.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'nacimientosController'//,
      //controllerAs:'pcctrl'
    };
  }

  revision.$inject = ['$rootScope', '$compile'];
  function revision($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/digitalizacion/revisiondigitalizacion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'RevisionDigitalizacionController'//,
      //controllerAs:'pcctrl'
    };
  }


  administracion.$inject = ['$rootScope', '$compile'];
  function administracion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/digitalizacion/admindigitalizacion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'DigitalizacionAdminController'//,
      //controllerAs:'pcctrl'
    };
  }


  // Modulo de plan de vacunacion covid-19 jeffer
  planvacunacioncovid.$inject = ['$rootScope', '$compile'];
  function planvacunacioncovid($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/saludpublica/planvacunacioncovid.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'planvacunacioncovid'
    };
  }

  // Modulo de plan de vacunacion covid-19 jeffer
  descarguebasecovid.$inject = ['$rootScope', '$compile'];
  function descarguebasecovid($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/saludpublica/descarguebasecovid.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'descarguebasecovid'
    };
  }


  // Modulo de plan detablero de control
  tablerodegestion.$inject = ['$rootScope', '$compile'];
  function tablerodegestion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/saludpublica/tablerodegestion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'tablerodegestion'
    };
  }

  tablerored.$inject = ['$rootScope', '$compile'];
  function tablerored($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/redservicios/tablerored.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'tablerodegestion'
    };
  }


  autorizacionespendientes.$inject = ['$rootScope', '$compile'];
  function autorizacionespendientes($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/autorizacionespendientes.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'autorizacionespendientes'
    };
  }


  //kpitutelas
  kpitutelas.$inject = ['$rootScope', '$compile'];
  function kpitutelas($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/juridica/kpitutelas.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'kpitutelas'
    };
  }

  reportesaseg.$inject = ['$rootScope', '$compile'];
  function reportesaseg($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/aseguramiento/reportease.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'ReportesasegController'//,
      //controllerAs:'pcctrl'
    };
  }
  reporteprestaciones.$inject = ['$rootScope', '$compile'];
  function reporteprestaciones($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/prestaciones/prestaciones.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'prestacionesController'
    };
  }

  gestionarrendamientos.$inject = ['$rootScope', '$compile'];
  function gestionarrendamientos($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/gestiondocumental/gestionadministrativa.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionadminController'
    };
  }
  adminventario.$inject = ['$rootScope', '$compile'];
  function adminventario($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/gestiondocumental/inventarioadmin.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'adminventarioController'
    };
  }
  anticipos.$inject = ['$rootScope', '$compile'];
  function anticipos($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/anticipos/anticipos.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'anticiposController',
    };
  }

  adminanticipos.$inject = ['$rootScope', '$compile'];
  function adminanticipos($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/anticipos/adminanticipos.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'adminanticiposController',
    };
  }
  audcuentas.$inject = ['$rootScope', '$compile'];
  function audcuentas($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/Cuentasmedicas/auditoriacuentas.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'auditoriacuentasController',
    };
  }
  reporteaudcuentas.$inject = ['$rootScope', '$compile'];
  function reporteaudcuentas($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/cuentasmedicas/reporteauditoriacuentas.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'reporteauditoriacuentasController',
    };
  }
  reportenotglosa.$inject = ['$rootScope', '$compile'];
  function reportenotglosa($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/Cuentasmedicas/reportenotglosa.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'reportenotglosaController'//,
      //controllerAs:'pcctrl'
    };
  }

  inicio.$inject = ['$rootScope', '$compile'];
  function inicio($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/inicio.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'homecontroller',
      controllerAs: 'homecontrollerctrl'
    };
  }
  inicioips.$inject = ['$rootScope', '$compile'];
  function inicioips($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/ips/home.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'inicioipsController',
      controllerAs: 'inicioipsctrl'
    };
  }
  inicioafiliados.$inject = ['$rootScope', '$compile'];
  function inicioafiliados($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/afiliados/afiliados.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'inicioafiliadosController',
      controllerAs: 'inicioafiliadosctrl'
    };
  }
  inicioempresas.$inject = ['$rootScope', '$compile'];
  function inicioempresas($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/empresas/empresas.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'inicioempresasController',
      controllerAs: 'inicioempresasctrl'
    };
  }
  usuariosips.$inject = ['$rootScope', '$compile'];
  function usuariosips($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/usuariosips.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'UsuariosipsController'//,
      //controllerAs:'pcctrl'
    };
  }
  //menu
  informacionempresa.$inject = ['$rootScope', '$compile'];
  function informacionempresa($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/movilidad/informacionempresa.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'informacionempresaController'//,
      //controllerAs:'pcctrl'
    };
  }

  angular.module('GenesisApp').directive('seguimientocohortes', seguimientocohortes);

  seguimientocohortes.$inject = ['$rootScope', '$compile'];
   function seguimientocohortes($rootScope, $compile) {
     return {
       restrict: 'EA',
       templateUrl: 'views/altocosto/seguimientoCohortes.html',
       replace: true,
       link: function (scope, element) {
         $compile(element.contents())($rootScope);
       },
       controller: 'seguimientoCohortesController',
     };
   }
  //fin

  indicadores.$inject = ['$rootScope', '$compile'];
  function indicadores($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/talentohumano/Indicadores.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'IndicadoresController'
    };
  }
  admintic.$inject = ['$rootScope', '$compile'];
  function admintic($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/tic/admintic.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'adminticController'//,
      //controllerAs:'pcctrl'
    };
  }
  proyectostic.$inject = ['$rootScope', '$compile'];
  function proyectostic($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/tic/proyectostic.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'adminticController'//,
      //controllerAs:'pcctrl'
    };
  }
  modificarjefe.$inject = ['$rootScope', '$compile'];
  function modificarjefe($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/tic/modificarjefe.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'modificarjefeController'
    };
  }
  function consolidadoacessoips($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/consolidados/consolidados.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'consolidadosController'//,
      //controllerAs:'pcctrl'
    };
  }
  function consolidadoacasips($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/consolidados/consolidadosacas.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'consolidadosacasController'//,
      //controllerAs:'pcctrl'
    };
  }

  empleados.$inject = ['$rootScope', '$compile'];
  function empleados($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/movilidad/empleados.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'empleadosController'
    };
  }

  datosbasicos.$inject = ['$rootScope', '$compile'];
  function datosbasicos($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/consultaAfiliados/datosbasicos.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'datosbasicoscontroller'
    };
  }


  solicitudprogramada.$inject = ['$rootScope', '$compile'];
  function solicitudprogramada($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/solicitudautprogramada.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'solicitudautprogramadaController'//,
      //controllerAs:'pcctrl'
    };
  }
  /*   autorizacion.$inject = ['$rootScope', '$compile'];
    function autorizacion($rootScope, $compile) {
      return {
        restrict: 'EA',
        templateUrl: 'views/autorizaciones/autorizacionips.html',
        replace: true,
        link: function (scope, element) {
          $compile(element.contents())($rootScope);
        },
        controller: 'autorizacionController'//,
        //controllerAs:'pcctrl'
      };
    } */
  //esoa autorizacion
  autorizacion.$inject = ['$rootScope', '$compile'];
  function autorizacion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/esoaautorizacionips.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'autorizacionipsController'//,
      //controllerAs:'pcctrl'
    };
  }
  admonmovilidad.$inject = ['$rootScope', '$compile'];
  function admonmovilidad($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/movilidad/admonmovilidad.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'admonmovilidadlController',
      controllerAs: 'admonmovilidadrctrl'
    };
  }

  angular.module('GenesisApp').directive('carguemiprestutela', carguemiprestutela);
  carguemiprestutela.$inject = ['$rootScope', '$compile'];
  function carguemiprestutela($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/recobro/carguemiprestutela.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'carguemiprestutelacontroller'

    };
  }

  seguimientoasesores.$inject = ['$rootScope', '$compile'];
  function seguimientoasesores($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/movilidad/seguimiento_asesores/seguimientoasesores.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'seguimientoAsesoresController',
      controllerAs: 'seguimientoasesoresctrl'
    };
  }
  // CNVU - GENERACION CAPITA ASEGURAMIENTO
  generacioncapita.$inject = ['$rootScope', '$compile'];
  function generacioncapita($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/capita/generacion_capita.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'generacionCapitaController',
      controllerAs: 'generacioncapitactrl'
    };
  }
  planeacionencuesta.$inject = ['$rootScope', '$compile'];
  function planeacionencuesta($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/planeacion/planeacionencuesta.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'PlaneacionencuestaController',
      controllerAs: 'planeacionencuestaoctrl'
    };
  }

  // Indicadores de planeacion
  angular.module('GenesisApp').directive('indicadorespoa', indicadorespoa);
  indicadorespoa.$inject = ['$rootScope', '$compile'];
  function indicadorespoa($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/planeacion/indicadorespoa.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: '',
      controllerAs: ''
    };
  }

  procesobdua.$inject = ['$rootScope', '$compile'];
  function procesobdua($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/bdua/procesobdua.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'ProcesobduaController',
      controllerAs: 'procesobduaoctrl'
    };
  }
  gestionaseguramiento.$inject = ['$rootScope', '$compile'];
  function gestionaseguramiento($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/aseguramiento/gestionaseguramiento.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionaseguramientoController',
      controllerAs: 'gestionaseguramientoctrl'
    };
  }
  reportecrecimiento.$inject = ['$rootScope', '$compile'];
  function reportecrecimiento($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/aseguramiento/Reporte_Crecimiento/ReporteCrecimiento.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'ReporteCrecimientoController'
    };
  }
  gestionacasmov.$inject = ['$rootScope', '$compile'];
  function gestionacasmov($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/movilidad/gestionacasmov.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionacasmovController',
      controllerAs: 'gestionacasmovctrl'
    };
  }
  mesacontrolmov.$inject = ['$rootScope', '$compile'];
  function mesacontrolmov($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/movilidad/mesacontrolmov.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'mesacontrolmovController'
    };
  }

  //Mesa de control
  mesadecontrol.$inject = ['$rootScope', '$compile'];
  function mesadecontrol($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/mesacontrol/mesacontrol.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'mesadecontrolcontroller'

    };
  }

  // video
  videoconferencia.$inject = ['$rootScope', '$compile'];
  function videoconferencia($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/tic/video.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'videoController',
      controllerAs: 'videorctrl'
    };
  }

  // TIC
  versionamiento.$inject = ['$rootScope', '$compile'];
  function versionamiento($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/tic/versionamiento.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'versionamientoController',
      controllerAs: 'versionamientorctrl'
    };
  }

  paneladmin.$inject = ['$rootScope', '$compile'];
  function paneladmin($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/tic/paneladmin.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'paneladminController',
      controllerAs: 'paneladminctrl'
    };
  }
  configuracionacceso.$inject = ['$rootScope', '$compile'];
  function configuracionacceso($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/tic/configuracionacceso.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'configuracionaccesoController',
      controllerAs: 'configuracionaccesoctrl'
    };
  }
  // Colemna

  colmena.$inject = ['$rootScope', '$compile'];
  function colmena($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/planeacion/colmena.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'colmenaController',
      controllerAs: 'colmenactrl'
    };
  }

  calendariodirectivo.$inject = ['$rootScope', '$compile'];
  function calendariodirectivo($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/planeacion/calendariodirectivo.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'calendariodirectivoController',
      controllerAs: 'calendariodirectivoctrl'
    };
  }
  // Listarcuentas
  listarcuentas.$inject = ['$rootScope', '$compile'];
  function listarcuentas($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/adminusuariosIPS/listarcuentas.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'listarcuentasController',
      controllerAs: 'listarcuentasctrl'
    };
  }

  // usuarioadministrador

  usuarioadministrador.$inject = ['$rootScope', '$compile'];
  function usuarioadministrador($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/adminusuariosIPS/usuarioadministrador.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'usuarioadministradorController',
      controllerAs: 'usuarioadministradorctrl'
    };
  }
  //gestion de normatividad
  normatividad.$inject = ['$rootScope', '$compile'];
  function normatividad($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/planeacion/normatividad.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'normatividadController'
    };
  }

  angular.module('GenesisApp').directive('adminprocesospoa', adminprocesospoa);

  adminprocesospoa.$inject = ['$rootScope', '$compile'];
  function adminprocesospoa($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/planeacion/adminprocesospoa.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'adminprocesospoaController',
      controllerAs: ''
    };
  }

  angular.module('GenesisApp').directive('procesospoa', procesospoa);

  procesospoa.$inject = ['$rootScope', '$compile'];
  function procesospoa($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/planeacion/procesospoa.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'procesospoaController',
      controllerAs: ''
    };
  }

  angular.module('GenesisApp').directive('admindocumentosinst', admindocumentosinst);

  admindocumentosinst.$inject = ['$rootScope', '$compile'];
  function admindocumentosinst($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/intranet/admindocumentosinst.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'admindocumentosinstController',
      controllerAs: ''
    };
  }


  //Reservas Tecnicas
  reservastec.$inject = ['$rootScope', '$compile'];
  function reservastec($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/financiera/reservastecnicas.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'reservastecnicasController',
      controllerAs: 'pictrl'
    };
  }

  adminpollamundial.$inject = ['$rootScope', '$compile'];
  function adminpollamundial($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/pollamundial/resultado.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'adminpollamundialController',
      controllerAs: 'adminpmundialctrl'
    };
  }

  pollamundial.$inject = ['$rootScope', '$compile'];
  function pollamundial($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/pollamundial/pollamundial.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'pollamundialController',
      controllerAs: 'pmundialctrl'
    };
  }

  mensajes.$inject = ['$rootScope', '$compile'];
  function mensajes($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/publicidad/mensaje.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'mensajeController'
    };
  }

  censoChat.$inject = ['$rootScope', '$compile'];
  function censoChat($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/censochat.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'censochatcontroller',
      controllerAs: 'cenchatctrl'
    };
  }

  censotab.$inject = ['$rootScope', '$compile'];
  function censotab($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/censotab.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'censotabcontroller',
      controllerAs: 'centabctrl'
    };
  }

  evoluciontab.$inject = ['$rootScope', '$compile'];
  function evoluciontab($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/evoluciontab.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'evoluciontabcontroller',
      controllerAs: 'evoluctrl7'
    };
  }

  autorizaciontab.$inject = ['$rootScope', '$compile'];
  function autorizaciontab($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/autorizaciontab.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      //controller:'evoluciontabcontroller',
      //controllerAs:'evoluctrl'
    };
  }
  gestionautorizacion.$inject = ['$rootScope', '$compile'];
  function gestionautorizacion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/gestionautorizacion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionautorizacionController'//,
      //controllerAs:'pcctrl'
    };
  }
  direccionamientoaut.$inject = ['$rootScope', '$compile'];
  function direccionamientoaut($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/direccionamientoaut.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'direccionamientoautController'//,
      //controllerAs:'pcctrl'
    };
  }
  gestionprescripcion.$inject = ['$rootScope', '$compile'];
  function gestionprescripcion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/recobro/gestionprescripcion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionprescripcioncontroller',
      controllerAs: 'gpresctrl'
    };
  }
  function consultaautorizaciones($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/consultaautorizaciones.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'consultaautorizacionesController'//,
      //controllerAs:'pcctrl'
    };
  }
  function consultaautnopbs($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/consultaautorizacionesnopbs.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'consultanopbsController'//,
      //controllerAs:'pcctrl'
    };
  }


  function consultaautnopbsips($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/consultaautorizacioipsnopbs.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'consultaautorizacionipsnopbsController'//,
      //controllerAs:'pcctrl'
    };
  }


  function consultaautorizacion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/consultaautorizacioips.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'consultaautorizacionipsController'//,
      //controllerAs:'pcctrl'
    };
  }

  unicahospitalariaips.$inject = ['$rootScope', '$compile'];
  function unicahospitalariaips($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/gestionunicahospitalariaips.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionunicahospitalariaipsController',
      controllerAs: 'actrl'
    };
  }


  function consultautafiliados($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/consultaautorizacionesafiliados.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'consultaautorizacionafiliadosController'//,
      //controllerAs:'pcctrl'
    };
  }
  negacionservicios.$inject = ['$rootScope', '$compile'];
  function negacionservicios($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/negacion_servicio.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'negacionserviciosController'//,
      //controllerAs:'pcctrl'
    };
  }

  autprogramadas.$inject = ['$rootScope', '$compile'];
  function autprogramadas($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/autprogramadas.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'autProgramadasController',
      controllerAs: 'actrl'
    };
  }
  gestionprogramadas.$inject = ['$rootScope', '$compile'];
  function gestionprogramadas($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/gestionautprogramada.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionautprogramadaController',
      controllerAs: 'actrl'
    };
  }

  adminprogramadas.$inject = ['$rootScope', '$compile'];
  function adminprogramadas($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/adminautprogramada.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'adminAutProgramdasController',
      controllerAs: 'actrl'
    };
  }
  angular.module('GenesisApp').directive('registrodereferencia', registrodereferencia);
  registrodereferencia.$inject = ['$rootScope', '$compile'];
  function registrodereferencia($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/referencia/registrodereferencia.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'registrodereferenciacontroller',
      controllerAs: ''
    };
  }
  georeferenciacontrol.$inject = ['$rootScope', '$compile'];
  function georeferenciacontrol($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/saludpublica/georeferenciacontrol/georeferenciacontrol.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'georeferenciacontrolController'
    };
  }

  angular.module('GenesisApp').directive('certificadoretencion', certificadoretencion);
  certificadoretencion.$inject = ['$rootScope', '$compile'];
  function certificadoretencion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/financiera/certificadoderetencion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'certificadoderetencionController'
    };
  }

  angular.module('GenesisApp').directive('seguimientocancer', seguimientocancer);
  seguimientocancer.$inject = ['$rootScope', '$compile'];
  function seguimientocancer($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/altocosto/seguimientoCancer.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'seguimientoCancerController',
      controllerAs: 'mtctrl'
    };
  }
  auditoriaautorizaciones.$inject = ['$rootScope', '$compile'];
  function auditoriaautorizaciones($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/auditautorizacion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'auditautorizacionController'//,
      //controllerAs:'pcctrl'
    };
  }
  plancapacitacion.$inject = ['$rootScope', '$compile'];
  function plancapacitacion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/talentohumano/capacitacion/plancapacitacion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'plancapacitacionController',
      controllerAs: 'pcctrl'
    };
  }
  aprobconfirmacion.$inject = ['$rootScope', '$compile'];
  gestionacastic.$inject = ['$rootScope', '$compile'];

  res1587hab.$inject = ['$rootScope', '$compile'];
  function res1587hab($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/financiera/res1587hab.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'res1587habController',
      controllerAs: 'pictrl'
    };
  }

  checktic.$inject = ['$rootScope', '$compile'];
  function checktic($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/tic/check_tic.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'check_tic_Controller'
    };
  }

  teleorientacion.$inject = ['$rootScope', '$compile'];

  function teleorientacion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/gestionriesgo/teleorientacion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'teleorientacionController' //,
      //controllerAs:'pcctrl'
    };
  }

  transporte.$inject = ['$rootScope', '$compile'];
  function transporte($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/transporte/transporte.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'transporteController'
    };
  }

  angular.module('GenesisApp').directive('informenacimiento', informenacimiento);
  informenacimiento.$inject = ['$rootScope', '$compile'];
  function informenacimiento($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/ips/registrarafiliados/informenacimiento.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'ConsolidadoNacimientoIPS'
    };
  }

  angular.module('GenesisApp').directive('facturasdigitales', facturasdigitales);
  facturasdigitales.$inject = ['$rootScope', '$compile'];
  function facturasdigitales($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/Cuentasmedicas/adminfacturasdigitales.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'adminfacturasdigitalesController'
    };
  }

  angular.module('GenesisApp').directive('gestionsoportesipscontr', gestionsoportesipscontr);
  gestionsoportesipscontr.$inject = ['$rootScope', '$compile'];
  function gestionsoportesipscontr($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/contratacion/gestionsoportesipscontr.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionsoportesipscontrController'
    };
  }

  alimento.$inject = ['$rootScope', '$compile'];
  function alimento($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/transporte/alimento.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'bonoalimentoController'
    };
  }



  function gestionacastic($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/tic/gestionacastic.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionacasticController',
      controllerAs: 'gactrl'
    };
  }
  //cargue interfaces
  cargainterface.$inject = ['$rootScope', '$compile'];
  function cargainterface($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/financiera/cargainterface.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        $(".chosen").chosen();
      },
      controller: 'cargainterfaceController',
      controllerAs: 'pictrl'
    };
  }


  function aprobconfirmacion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/financiera/aprobconfirmacion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'aprobconfirmacionController',
      controllerAs: 'pictrl'
    };
  }
  //directive acas
  acas.$inject = ['$rootScope', '$compile'];
  function acas($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/acas/acas.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'acascontroller',
      controllerAs: 'acasctrl'
    };
  }
  confirmacionaut.$inject = ['$rootScope', '$compile'];
  function confirmacionaut($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/financiera/confirmacionaut.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'confirmacionautController',
      controllerAs: 'pictrl'
    };
  }
  gacas.$inject = ['$rootScope', '$compile'];
  function gacas($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/acas/gestionacas.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionacascontroller',
      controllerAs: 'gacasctrl'
    };
  }


  confirmacion.$inject = ['$rootScope', '$compile'];
  function confirmacion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/financiera/confirmacion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'confirmacionController',
      controllerAs: 'pictrl'
    };
  }
  consultaracas.$inject = ['$rootScope', '$compile'];
  function consultaracas($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/inventario/Consultaracasinv.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'consultaracascontroller',
      controllerAs: 'mtctrl'
    };
  }

  prescripcion.$inject = ['$rootScope', '$compile'];
  function prescripcion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/recobro/prescripcion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'prescripcioncontroller',
      controllerAs: 'prescrictrl'
    };
  }

  angular.module('GenesisApp').directive('tutela', tutela);
  tutela.$inject = ['$rootScope', '$compile'];
  function tutela($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/recobro/tutelas_mipres.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'mipresTutelacontroller',
      controllerAs: 'mipresTutelacontroller'
    };
  }

  gestionoperaciones.$inject = ['$rootScope', '$compile'];
  function gestionoperaciones($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/recobro/gestionoperaciones.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionoperacionescontroller'
    };
  }

  pagosips.$inject = ['$rootScope', '$compile'];
  function pagosips($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/financiera/pagosips.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'pagosipsController',
      controllerAs: 'pictrl'
    };
  }
  marcacionPoblacion.$inject = ['$rootScope', '$compile'];
  function marcacionPoblacion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/marcacionpoblacion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'marcacioncontroller',
      controllerAs: 'spctrl'
    };
  }
  administracionPatologias.$inject = ['$rootScope', '$compile'];
  function administracionPatologias($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/administracionpatologias.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'admonpatologiasctrl',
      controllerAs: 'spctrl'
    };
  }

  mesacontrol.$inject = ['$rootScope', '$compile'];
  function mesacontrol($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/tic/mesacontroltic.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'mesacontrolticController',
      controllerAs: 'mtctrl'
    };
  }
  gestionproyectos.$inject = ['$rootScope', '$compile'];
  function gestionproyectos($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/tic/gestionproyectos.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionproyectosController',
      controllerAs: 'gpctrl'
    };
  }
  controlproyectos.$inject = ['$rootScope', '$compile'];
  function controlproyectos($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/tic/controlproyectos.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'controlproyectosController',
      controllerAs: 'pactrl'
    };
  }
  printautorizaciones.$inject = ['$rootScope', '$compile'];
  function printautorizaciones($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/autorizaciones/printautorizaciones.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'printautorizacionesController',
      controllerAs: 'pactrl'
    };
  }
  consultaAfiliadoips.$inject = ['$rootScope', '$compile'];
  function consultaAfiliadoips($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/consultaAfiliados/consultaafiliadoips.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'consultaafiliadoipscontroller',
      controllerAs: 'cactrl'
    };
  }
  // SIAU

  pqr.$inject = ['$rootScope', '$compile'];
  function pqr($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/siau/pqr/pqr.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'pqrController',
      controllerAs: 'pqrctrl'
    };
  }

  angular.module('GenesisApp').directive('horariooficinasatencion', horariooficinasatencion);
  horariooficinasatencion.$inject = ['$rootScope', '$compile'];
  function horariooficinasatencion($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/siau/oficina/horariooficinasatencion.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'horariooficinasatencionController'
    };
  }

  angular.module('GenesisApp').directive('gestiondeencuestas', gestiondeencuestas);

  gestiondeencuestas.$inject = ['$rootScope', '$compile'];
  function gestiondeencuestas($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/siau/gestiondeencuestas.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestiondeencuestasController'
    };
  }

  angular.module('GenesisApp').directive('asociaciondeusuarios', asociaciondeusuarios);
  asociaciondeusuarios.$inject = ['$rootScope', '$compile'];
  function asociaciondeusuarios($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/siau/asociaciones_usuarios/asociaciones_usuarios.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'asociaciones_usuarios_controller'
    };
  }

  angular.module('GenesisApp').directive('inventariodecajas', inventariodecajas);
  inventariodecajas.$inject = ['$rootScope', '$compile'];
  function inventariodecajas($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/administrativa/inventariodecajas.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'inventariodecajasController'
    };
  }

  accionespqr.$inject = ['$rootScope', '$compile'];
  function accionespqr($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/siau/pqr/accionespqr.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'accionespqrController',
      controllerAs: 'accionespqrController'
    };
  }
  accionescorrespondencia.$inject = ['$rootScope', '$compile'];
  function accionescorrespondencia($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/siau/pqr/accionescorrespondencia.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'accionescorrespondenciaController',
      controllerAs: 'accionescorrespondenciaController'
    };
  }



  modificarpqr.$inject = ['$rootScope', '$compile'];
  function modificarpqr($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/siau/pqr/modificarpqr.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'modificarpqrController',
      controllerAs: 'modificarpqrctrl'
    };
  }

  codigourgencia.$inject = ['$rootScope', '$compile'];
  function codigourgencia($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/siau/codigourgencia.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        $(".chosen").chosen();
      },
      controller: 'codigourgenciacontroller',
      controllerAs: 'cctrl'
    };
  }


  historicourgenciaips.$inject = ['$rootScope', '$compile'];
  function historicourgenciaips($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/siau/historicourgenciaips.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'historicourgenciaipscontroller',
      controllerAs: 'huctrl'
    };
  }
  //reporte_urgencia
  reporteurgencia.$inject = ['$rootScope', '$compile'];
  function reporteurgencia($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/siau/reporteurgencia.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'reporteurgenciacontroller',
      // controllerAs: 'ivctrl'
    };
  }

  historicourgencia.$inject = ['$rootScope', '$compile'];
  function historicourgencia($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/siau/historicourgencia.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'historicourgenciacontroller',
      controllerAs: 'huctrl'
    };
  }
  //directive afiliacion
  infoBasica.$inject = ['$rootScope', '$compile'];
  function infoBasica($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/afiliacionLinea/infobasica.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'infopersonalcontroller',
      controllerAs: 'ipctrl'
    };
  }
  solicitudpermiso.$inject = ['$rootScope', '$compile'];
  function solicitudpermiso($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/ausentismo/solicitudPermiso.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'solicitudPermisocontroller'
    };
  }
  aprobacionpermiso.$inject = ['$rootScope', '$compile'];
  function aprobacionpermiso($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/ausentismo/aprobacionPermiso.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'aprobacionPermisocontroller'
    };
  }
  datosempleados.$inject = ['$rootScope', '$compile'];
  function datosempleados($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/talentohumano/empleados/datosempleados.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        $(".chosen").chosen();
      },
      controller: 'datosempleadoscontroller',
      controllerAs: 'dectrl'
    };
  }

  admndatosempleados.$inject = ['$rootScope', '$compile'];
  function admndatosempleados($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/talentohumano/empleados/admndatosempleados.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        $(".chosen").chosen();
      },
      controller: 'admndatosempleadoscontroller',
      controllerAs: 'dectrl'
    };
  }

  consultadatosempleados.$inject = ['$rootScope', '$compile'];
  function consultadatosempleados($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/talentohumano/empleados/consultadatosempleados.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        $(".chosen").chosen();
      },
      controller: 'consultadatosempleadoscontroller',
      controllerAs: 'cdctrl'
    };
  }
  reportes.$inject = ['$rootScope', '$compile'];
  function reportes($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/reporte/reportes.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'reportecontroller',
      controllerAs: 'rctrl'
    };
  }

  reportess.$inject = ['$rootScope', '$compile'];
  function reportess($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/reporte/reportes.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'reportecontroller',
      controllerAs: 'rctrl'
    };
  }

  reportesoacasadmin.$inject = ['$rootScope', '$compile'];
  function reportesoacasadmin($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/reporte/reportes.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'reportecontroller',
      controllerAs: 'rctrl'
    };
  }

  reporteslma.$inject = ['$rootScope', '$compile'];
  function reporteslma($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/reporte/reportes.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'reportecontroller',
      controllerAs: 'rctrl'
    };
  }

  reportesobaf.$inject = ['$rootScope', '$compile'];
  function reportesobaf($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/reporte/reportes.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'reportecontroller',
      controllerAs: 'rctrl'
    };
  }

  reportesaecar.$inject = ['$rootScope', '$compile'];
  function reportesaecar($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/reporte/reportes.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'reportecontroller',
      controllerAs: 'rctrl'
    };
  }

  reporteseadoc.$inject = ['$rootScope', '$compile'];
  function reporteseadoc($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/reporte/reportes.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'reportecontroller',
      controllerAs: 'rctrl'
    };
  }

  reporteskaseg.$inject = ['$rootScope', '$compile'];
  function reporteskaseg($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/reporte/reportes.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'reportecontroller',
      controllerAs: 'rctrl'
    };
  }
  /// salud
  serviciosips.$inject = ['$rootScope', '$compile'];
  function serviciosips($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/servicios_ips.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'serviciosipscontroller'
    };
  }

  reporteseris.$inject = ['$rootScope', '$compile'];
  function reporteseris($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/reporte/reportes.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'reportecontroller',
      controllerAs: 'rctrl'
    };
  }

  reportesecen.$inject = ['$rootScope', '$compile'];
  function reportesecen($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/reporte/reportes.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'reportecontroller',
      controllerAs: 'rctrl'
    };
  }

  reporteseges.$inject = ['$rootScope', '$compile'];
  function reporteseges($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/reporte/reportes.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'reportecontroller',
      controllerAs: 'rctrl'
    };
  }

  reporteseget.$inject = ['$rootScope', '$compile'];
  function reporteseget($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/reporte/reportes.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'reportecontroller',
      controllerAs: 'rctrl'
    };
  }
  // Adminisitrativa
  reportesorgas.$inject = ['$rootScope', '$compile'];
  function reportesorgas($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/reporte/reportes.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'reportecontroller',
      controllerAs: 'rctrl'
    };
  }
  //gestion documental
  docinve.$inject = ['$rootScope', '$compile'];
  function docinve($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/gestiondocumental/gestiondocumental.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'gestiondocumentalcontroller',
      controllerAs: 'gdctrl'
    };
  }

  docpre.$inject = ['$rootScope', '$compile'];
  function docpre($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/gestiondocumental/prestamo.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'prestamocontroller',
      controllerAs: 'prctrl'
    };
  }
  // Juridica
  reportestacajuridico.$inject = ['$rootScope', '$compile'];
  function reportestacajuridico($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/reporte/reportes.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'reportecontroller',
      controllerAs: 'rctrl'
    };
  }
  gestiontutelas.$inject = ['$rootScope', '$compile'];
  function gestiontutelas($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/juridica/gestiontutelas.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'gestionctrl'
    };
  }

  angular.module('GenesisApp').directive('gestiontutelasareas', gestiontutelasareas);
  gestiontutelasareas.$inject = ['$rootScope', '$compile'];
  function gestiontutelasareas($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/juridica/gestiontutelasareas.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestiontutelasareasController',
      controllerAs: ''
    };
  }

  angular.module('GenesisApp').directive('admintutelas', admintutelas);
  admintutelas.$inject = ['$rootScope', '$compile'];
  function admintutelas($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/juridica/admintutelas.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'admintutelasController',
      controllerAs: ''
    };
  }

  // Servicio al Cliente
  reportessesa.$inject = ['$rootScope', '$compile'];
  function reportessesa($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/reporte/reportes.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'reportecontroller',
      controllerAs: 'rctrl'
    };
  }
  // TIC
  reportestacas.$inject = ['$rootScope', '$compile'];
  function reportestacas($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/reporte/reportes.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'reportecontroller',
      controllerAs: 'rctrl'
    };
  }

  calitic.$inject = ['$rootScope', '$compile'];
  function calitic($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/calificame/calificame1.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'calificamecontroller',
      controllerAs: 'caltictrl'
    };
  }

  unitic.$inject = ['$rootScope', '$compile'];
  function unitic($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/unitic/unitic.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'uniticcontroller',
      controllerAs: 'uniticctrl'
    };
  }
  //inventario
  listaChequeo.$inject = ['$rootScope', '$compile'];
  function listaChequeo($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/inventario/listaChequeo.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'listaChequeocontroller',
      controllerAs: 'ivctrl'
    };
  }
  abrirInventario.$inject = ['$rootScope', '$compile'];
  function abrirInventario($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/inventario/abrirInventario.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'abrirInventariocontroller',
      controllerAs: 'ivctrl'
    };
  }
  //fin inventario
  //renal

  altocosto.$inject = ['$rootScope', '$compile'];
  function altocosto($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/altocosto/renal.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'renalController',
      controllerAs: 'acctrl'
    };
  }
  vih.$inject = ['$rootScope', '$compile'];
  function vih($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/altocosto/vih.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'vihcontroller'
    };
  }
  indicadorescac.$inject = ['$rootScope', '$compile'];
  function indicadorescac($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/altocosto/indicadoresCAC.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'indicadoresController',
      controllerAs: 'inctrl'
    };
  }
  consvih.$inject = ['$rootScope', '$compile'];
  function consvih($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/altocosto/consvih.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'consvihcontroller'
    };
  }
  periodoaltocosto.$inject = ['$rootScope', '$compile'];
  function periodoaltocosto($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/altocosto/periodorenal.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'periodorenalController',
      controllerAs: 'pactrl'
    };
  }
  angular.module('GenesisApp').directive('gestionsiniestros', gestionsiniestros);
  gestionsiniestros.$inject = ['$rootScope', '$compile'];
  function gestionsiniestros($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/altocosto/gestionsiniestros.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'gestionsiniestrosController',
      controllerAs: ''
    };
  }

  angular.module('GenesisApp').directive('adminsiniestros', adminsiniestros);

  adminsiniestros.$inject = ['$rootScope', '$compile'];
  function adminsiniestros($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/altocosto/adminsiniestros.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'adminsiniestrosController',
      controllerAs: ''
    };
  }

  angular.module('GenesisApp').directive('carguesripseps', carguesripseps);
  carguesripseps.$inject = ['$rootScope', '$compile'];
  function carguesripseps($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/Cuentasmedicas/miscarguesrips_eps.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'miscarguesrips_epsController'//,
      //controllerAs:'pcctrl'
    };
  }

  mesaControl.$inject = ['$rootScope', '$compile'];
  function mesaControl($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/afiliacionLinea/mesaControl.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      //controller:'infopersonalcontroller',
      //controllerAs:'ipctrl'
    };
  }

  logout.$inject = ['$rootScope', '$compile', '$localStorage'];
  function logout($rootScope, $compile, $localStorage) {
    return {
      restrict: 'EA',
      replace: true,
      link: function (scope, element) {
        sessionStorage.clear();
        window.location.href = 'php/cerrarsession.php'
        $compile(element.contents())($rootScope);
      },

    };
  }
  apiLoading.$inject = ['$http'];
  function apiLoading($http) {
    return {
      restrict: 'A',
      link: function (scope, elm) {
        scope.isLoading = function () {
          return $http.pendingRequests.length > 0;
        };
        scope.$watch(scope.isLoading, function (v) {
          if (v) {
            elm.show();
          } else {
            elm.hide();
          }
        });
      }
    };
  }
  pageLoading.$inject = ['$rootScope', '$timeout'];
  function pageLoading($rootScope, $timeout) {
    return {
      restrict: 'A',
      link: function (scope, element) {
        element.removeClass('closed');
        function animate() {
          element.css("transition", "none").removeClass("closed");
          $timeout(function () {
            element.css('transition', '').addClass('closed');
          }, 1000);
        }
        $rootScope.$on('$stateChangeStart', function (event, currentRoute, previousRoute) {
          if (previousRoute) return;
          animate();
        });
        animate();
        $rootScope.$on('$stateChangeSuccess', function () {
          animate();
        });
      }
    };
  }
  navBar.$inject = ['$rootScope', '$compile'];
  function navBar($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/navegacion/navbar.html',
      replace: true,
      controller: 'navbarcontroller',
      controllerAs: 'ipctrl',
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        angular.element('.notif-btn').dropdown({
          inDuration: 300,
          outDuration: 225,
          constrain_width: false, // Does not change width of dropdown to that of the activator
          hover: true, // Activate on hover
          gutter: 0, // Spacing from edge
          belowOrigin: true, // Displays dropdown below the button
          alignment: 'right' // Displays dropdown with edge aligned to the left of button
        }
        );
        angular.element('.collapsible').collapsible();
        // autocomplete simulation
        var countries = [{ value: "Alabama" }, { value: "Alaska" }, { value: "Arizona" }, { value: "Arkansas" }, { value: "California" },
        { value: "Colorado" }, { value: "Connecticut" }, { value: "District of Columbia" }, { value: "Delaware" }, { value: "Florida" },
        { value: "Georgia" }, { value: "Hawaii" }, { value: "Idaho" }, { value: "Indiana" }, { value: "Iowa" }, { value: "Kansas" }, { value: "Kentucky" },
        { value: "Louisiana" }, { value: "Maine" }
        ];
        var input = angular.element('.search-top-bar #search');
        if (input.hasClass('autocomplete')) {
          var inputDiv = input.closest('div');
          var searchHtml = '<ul class="autocomplete-results hide">';
          for (var i = 0; i < countries.length; i++) {
            searchHtml += '<li class="result"><span>' + countries[i]['value'] + '</span></li>';
          }
          searchHtml += '</ul>';
          inputDiv.append(searchHtml);
          input.on('keyup', input, function () {
            var $val = input.val().trim(),
              $select = angular.element('.autocomplete-results');
            $select.css('width', input.width());
            if ($val != '') {
              $select.children('li').addClass('hide');
              $select.children('li').filter(function () {
                $select.removeClass('hide');
                var check = true;
                for (var i in $val) {
                  if ($val[i].toLowerCase() !== angular.element(this).text().toLowerCase()[i])
                    check = false;
                }
                return check ? angular.element(this).text().toLowerCase().indexOf($val.toLowerCase()) !== -1 : false;
              }).removeClass('hide');
            } else {
              $select.children('li').addClass('hide');
            }
          });
          angular.element('.result').click(function () {
            input.val(angular.element(this).text().trim());
            angular.element('.result').addClass('hide');
          });
          angular.element("#search-hover").click(function (e) {
            angular.element("#dropdown2").hide();
            angular.element("#search").trigger("focus");
          });
        }
      }
    };
  }
  topBar.$inject = ['$rootScope', '$compile'];
  function topBar($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/navegacion/topbar.html',
      replace: true,
      link: function (scope, element) {
        $rootScope.navigationStyle = ThemeSettings.getCookie('navigation-style');
        scope.$watch('navigationStyle', function () {
          if (scope.navigationStyle == 'horizontal') {
            element.css('display', 'block');
          } else {
            element.css('display', 'none');
          }
        });
        $compile(element.contents())($rootScope);
        angular.element('.dropdown-button').dropdown({
          inDuration: 300,
          outDuration: 225,
          constrain_width: false, // Does not change width of dropdown to that of the activator
          hover: true, // Activate on hover
          gutter: 0, // Spacing from edge
          belowOrigin: true, // Displays dropdown below the button
          alignment: 'right' // Displays dropdown with edge aligned to the left of button
        });
        angular.element('.collapsible').collapsible();
      }
    }
  }
  sideBar.$inject = ['$rootScope', '$compile'];
  function sideBar($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/navegacion/sidebar.html',
      replace: true,
      controller: 'sidebarcontroller',
      controllerAs: 'ipctrl',
      link: function (scope, element) {
        $rootScope.navigationStyle = ThemeSettings.getCookie('navigation-style');
        scope.$watch('navigationStyle', function () {
          if (scope.navigationStyle != 'horizontal') {
            element.find('ul.side-nav').css('transform', '');
          } else {
            element.find('ul.side-nav').css('transform', 'translateX(-100%)');
          }
        });
        $compile(element.contents())($rootScope);
        angular.element('.button-collapse').sideNav({
          menuWidth: 240, // Default is 240
          edge: typeof ThemeSettings != "undefined" && ThemeSettings.getCookie('reading-direction') == 'rtl' ? 'right' : 'left', // Choose the horizontal origin
          closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
        }
        );
      }
    };
  }
  footer.$inject = ['$rootScope', '$compile'];
  function footer($rootScope, $compile) {
    return {
      restrict: 'A',
      templateUrl: 'views/navegacion/footer.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      }
    };
  }
  current.$inject = ['$state', '$rootScope'];
  function current($state, $rootScope) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var el, li, ul, cb, ch, pli;
        el = element;
        li = el.parent();
        ul = li.parent();
        cb = ul.parent();
        ch = cb.siblings();
        pli = cb.parent();
        var check = function (route) {
          if (route == attrs.uiSref) {
            el.addClass('active');
            li.addClass('active');
            if (cb.length > 0 && cb[0].localName != 'aside' && angular.element(cb[0]).attr('id') != 'ili') {
              cb.attr('visit', attrs.uiSref);
              cb.css('display', 'block');
            }
            if (ch.length > 0 && ch[0].localName != 'header') {
              ch.addClass('active');
              ch.attr('visit', attrs.uiSref);
            }
            if (pli.length > 0 && pli[0].localName != 'div') {
              pli.addClass('active');
              pli.attr('visit', attrs.uiSref);
            }
          } else {
            li.removeClass('active');
            el.removeClass('active');
            if (cb.attr('visit') == attrs.uiSref && cb.length > 0 && cb[0].localName != 'aside') {
              // cb.css('display','none');
            }
            if (ch.attr('visit') == attrs.uiSref && ch.length > 0 && ch[0].localName != 'header') {
              ch.removeClass('active');
            }
            if (pli.attr('visit') == attrs.uiSref && pli.length > 0 && pli[0].localName != 'div') {
              pli.removeClass('active');
            }
          }
        };
        check($state.current.name);
        $rootScope.$on('$stateChangeStart', function (event, currentRoute, previousRoute) {
          check(currentRoute.name)
        });

      }
    };
  }
  topBarCurrent.$inject = ['$state', '$rootScope'];
  function topBarCurrent($state, $rootScope) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var el = element;
        var check = function (route) {
          if (route == attrs.uiSref) {
            if (el.closest('ul.dropdown-content').length > 0)
              el.closest('ul.dropdown-content').parent('li').attr('visit', route).addClass('active');
            el.parent('li').addClass('active');
          } else {
            if (el.closest('ul.dropdown-content').length > 0)
              if (el.closest('ul.dropdown-content').parent('li').attr('visit') != route) {
                el.closest('ul.dropdown-content').parent('li').attr('visit', '').removeClass('active');
              }
            el.parent('li').removeClass('active');
          }
        };
        check($state.current.name);
        $rootScope.$on('$stateChangeStart', function (event, currentRoute, previousRoute) {
          check(currentRoute.name)
        });
      }
    };
  }
  documentation.$inject = ['$rootScope', '$compile'];
  function documentation($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/documentation/documentation.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        Prism.highlightAll();
        angular.element('.scrollspy').scrollSpy();
        var sidenav = angular.element('.bs-docs-sidebar');
        if (sidenav.length != 0)
          sidenav.pushpin({ top: angular.element('#introduction').offset().top });
        //smooth scroll top
        angular.element("a[href='#top']").click(function () {
          angular.element("html, body").animate({ scrollTop: 0 }, "slow");
          return false;
        });
      }
    };
  }
  dashAnalytics.$inject = ['$rootScope', '$compile'];
  function dashAnalytics($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/dashboards/analytics.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'dashAnalyticsController',
      controllerAs: 'd2'
    };
  }
  dashGeneral.$inject = ['$rootScope', '$compile'];
  function dashGeneral($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/dashboards/general.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'dashGeneralController',
      controllerAs: 'd1'
    };
  }
  dashSales.$inject = ['$rootScope', '$compile'];
  function dashSales($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/dashboards/sales.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'dashSalesController',
      controllerAs: 'd3'
    };
  }
  dashSales.$inject = ['$rootScope', '$compile'];
  function dashInicio($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/dashboards/inicio.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      //controller:'dashSalesController',
      //controllerAs:'d3'
    };
  }
  dashServer.$inject = ['$rootScope', '$compile'];
  function dashServer($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/dashboards/server.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'dashServerController',
      controllerAs: 'd4'
    };
  }
  dashSocial.$inject = ['$rootScope', '$compile'];
  function dashSocial($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/dashboards/social.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'dashSocialController',
      controllerAs: 'd5'
    };
  }
  chartsAm.$inject = ['$rootScope', '$compile'];
  function chartsAm($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/charts/am.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        Prism.highlightAll();
      },
      controller: 'chartsAmChartsController',
      controllerAs: 'ch1'
    };
  }
  chartsC3.$inject = ['$rootScope', '$compile'];
  function chartsC3($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/charts/c3.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        Prism.highlightAll();
      },
      controller: 'chartsC3Controller',
      controllerAs: 'ch2'
    };
  }
  chartsFl.$inject = ['$rootScope', '$compile'];
  function chartsFl($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/charts/fl.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        Prism.highlightAll();
      },
      controller: 'chartsFlotController',
      controllerAs: 'ch3'
    };
  }
  chartsHg.$inject = ['$rootScope', '$compile'];
  function chartsHg($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/charts/hg.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        Prism.highlightAll();
      },
      controller: 'chartsHighChartsController',
      controllerAs: 'ch4'
    };
  }
  chartsMo.$inject = ['$rootScope', '$compile'];
  function chartsMo($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/charts/mo.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        Prism.highlightAll();
      },
      controller: 'chartsMorrisController',
      controllerAs: 'ch5'
    };
  }
  /*  censoSalud.$inject = ['$rootScope', '$compile'];
   function censoSalud($rootScope, $compile) {
     return {
       restrict: 'EA',
       templateUrl: 'views/salud/censo.html',
       replace: true,
       link: function (scope, element) {
         $compile(element.contents())($rootScope);
       },
       controller: 'censohospitalariocontroller',
       controllerAs: 'ch5cntrl'
     };
   } */
  // Intranet
  procesos.$inject = ['$rootScope', '$compile'];
  function procesos($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/intranet/procesos.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'procesosController',
      controllerAs: 'procesosrctrl'
    };
  }
  administradorsgc.$inject = ['$rootScope', '$compile'];
  function administradorsgc($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/intranet/administrador_sgc.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'administrador_sgcController'
    };
  }
  adminprocesos.$inject = ['$rootScope', '$compile'];
  function adminprocesos($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/intranet/adminprocesos.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'adminprocesosController',
      controllerAs: 'adminprocesosrctrl'
    };
  }
  procesosa.$inject = ['$rootScope', '$compile'];
  function procesosa($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/intranet/procesos_aud.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'procesosaController'
      // controllerAs: 'procesosarctrl'
    };
  }
  programaauditorias.$inject = ['$rootScope', '$compile'];
  function programaauditorias($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/intranet/programa_auditorias.html',
      replace: true,
      link: function (scope, element) {

        $compile(element.contents())($rootScope);
      },
      controller: 'programa_auditoriasController'
    };
  }
  censopendiente.$inject = ['$rootScope', '$compile'];
  function censopendiente($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/salud/censopendiente.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'censocontroller',
      controllerAs: 'censoctrl'
    };
  }
  angular.module('GenesisApp').directive('auditoriaglosa', auditoriaglosa);
  auditoriaglosa.$inject = ['$rootScope', '$compile'];
  function auditoriaglosa($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/cuentasmedicas/cuentasmedicas.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      },
      controller: 'auditoriaglosaController',
      controllerAs: 'audglosactrl'
    };
  }
  chartsSp.$inject = ['$rootScope', '$compile'];
  function chartsSp($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/charts/sp.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        Prism.highlightAll();
      },
      controller: 'chartsSparklineController',
      controllerAs: 'ch7'
    };
  }
  mediaGallery.$inject = ['$rootScope', '$compile'];
  function mediaGallery($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/media/gallery.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        $('.materialboxed').materialbox();
        Prism.highlightAll();
      }
    };
  }
  mediaSliders.$inject = ['$rootScope', '$compile'];
  function mediaSliders($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/media/sliders.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        $('.slider').slider({ full_width: true, interval: 3000 });
        $('.gallery-carousel').gallery_carousel();
        Prism.highlightAll();
      }
    };
  }
  mediaEffects.$inject = ['$rootScope', '$compile'];
  function mediaEffects($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/media/effects.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        Prism.highlightAll();
      }
    };
  }
  profile.$inject = ['$rootScope', '$compile'];
  function profile($rootScope, $compile) {
    return {
      restrict: 'E',
      templateUrl: 'components/pages/profile.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        if (angular.element('#lightbox').length == 0) {
          lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'showImageNumberLabel': true
          });
          lightbox.init();
        }
        angular.forEach(angular.element('.feed-item'), function (e, k) {
          angular.element(e).css('background-image', 'url(' + angular.element(e).attr('href') + ')');
        });
      }
    };
  }


  formsElements.$inject = ['$rootScope', '$compile'];
  function formsElements($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/forms/elements.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        Prism.highlightAll();
        scope.select = {
          simple: "This is Mara.",
          multi: ["Option1", "I'm an option"],
          choices: ["Option1", "I'm an option", "Another Option", "This is Mara."]
        };
        $.curCSS = function (element, attrib, val) {
          $(element).css(attrib, val);
        };
        angular.element('.datepicker').pickadate({
          selectMonths: true, // Creates a dropdown to control month
          selectYears: 15, // Creates a dropdown of 15 years to control year
          format: 'dd/mm/yyyy'
        });
      }
    };
  }
  formsExtra.$inject = ['$rootScope', '$compile'];
  function formsExtra($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/forms/extra.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        Prism.highlightAll();
        var rangeVertical = angular.element('#range-vertical')[0];
        noUiSlider.create(rangeVertical, {
          start: [20, 80], // Handle start position
          step: 10, // Slider moves in increments of '10'
          margin: 20, // Handles must be more than '20' apart
          connect: true, // Display a colored bar between the handles
          direction: 'rtl', // Put '0' at the bottom of the slider
          orientation: 'vertical', // Orient the slider vertically
          behaviour: 'tap-drag', // Move handle on tap, bar is draggable
          range: { // Slider can select '0' to '100'
            'min': 0,
            'max': 100
          },
          pips: { // Show a scale with the slider
            mode: 'steps',
            density: 2
          },
          format: wNumb({
            decimals: 0
          })
        });
        var rangeVerticalMin = angular.element('#range-v-min')[0];
        var rangeVerticalMax = angular.element('#range-v-max')[0];
        // When the slider value changes, update the input and span
        rangeVertical.noUiSlider.on('update', function (values, handle) {
          rangeVerticalMin.value = values[0];
          rangeVerticalMax.value = values[1];
        });
        // When the input changes, set the slider value
        rangeVerticalMin.addEventListener('change', function () {
          range.noUiSlider.set([this.value, null]);
        });
        // When the input changes, set the slider value
        rangeVerticalMax.addEventListener('change', function () {
          range.noUiSlider.set([null, this.value]);
        });
        var rangeHorizontal = angular.element('#range-horizontal')[0];
        noUiSlider.create(rangeHorizontal, {
          start: [20, 80], // Handle start position
          step: 10, // Slider moves in increments of '10'
          margin: 20, // Handles must be more than '20' apart
          connect: true, // Display a colored bar between the handles
          direction: 'ltr', // Put '0' at the bottom of the slider
          orientation: 'horizontal', // Orient the slider vertically
          behaviour: 'tap-drag', // Move handle on tap, bar is draggable
          range: { // Slider can select '0' to '100'
            'min': 0,
            'max': 100
          },
          format: wNumb({
            decimals: 0
          })
        });
        var rangeHorizontalMin = angular.element('#range-h-min')[0];
        var rangeHorizontalMax = angular.element('#range-h-max')[0];
        rangeHorizontal.noUiSlider.on('update', function (values, handle) {
          rangeHorizontalMin.value = values[0];
          rangeHorizontalMax.value = values[1];
        });
        // When the input changes, set the slider value
        rangeHorizontalMin.addEventListener('change', function () {
          rangeHorizontal.noUiSlider.set([this.value, null]);
        });
        rangeHorizontalMax.addEventListener('change', function () {
          rangeHorizontal.noUiSlider.set([null, this.value]);
        });
        angular.element("#myTags").tagit({
          allowDuplicates: true,
          placeholderText: 'Tag text'
        });
        angular.element('#rating').addRating();
        angular.element(".chosen").chosen();
        angular.element('#col-picker').colorpicker(
          {
            color: '#fff',
            customClass: 'colorpicker-2x',
            sliders: {
              saturation: {
                maxLeft: 200,
                maxTop: 200
              },
              hue: {
                maxTop: 200
              },
              alpha: {
                maxTop: 200
              }
            }
          }
        );
        angular.element("#demo-disable").click(function (e) {
          e.preventDefault();
          angular.element("#col-picker").colorpicker('disable');
        });
        angular.element("#demo-enable").click(function (e) {
          e.preventDefault();
          angular.element("#col-picker").colorpicker('enable');
        });
      }
    };
  }
  formsWysiwyg.$inject = ['$rootScope', '$compile'];
  function formsWysiwyg($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/forms/wysiwyg.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        Prism.highlightAll();
        CKEDITOR.replace('editor1', {
          format_tags: 'p;h1;h2;h3;h4;h5;h6;pre;address;div'
        });

        angular.element('#editor-inline').attr('contenteditable', 'true');
        CKEDITOR.disableAutoInline = true;
        CKEDITOR.inline('editor-inline');
        var editor = new MediumEditor('.editabletext');
      }
    };
  }
  regularTables.$inject = ['$rootScope', '$compile'];
  function regularTables($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/tables/regular.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        Prism.highlightAll();
      },
      controller: 'tablesController',
      controllerAs: 'tb'
    };
  }
  dtTables.$inject = ['$rootScope', '$compile', '$timeout'];
  function dtTables($rootScope, $compile, $timeout) {
    return {
      restrict: 'EA',
      templateUrl: 'views/tabla/tabla_anexo.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        Prism.highlightAll();
        $timeout(function () {
          angular.element('#demo-table').DataTable();
          angular.element('.dataTables_filter').empty(); // clears the content generated
          angular.element('.dataTables_filter').append(
            "<div class='input-field col s6 search-div right' style='width: 200px'>" +
            "    <i class='material-icons search-icon'>search</i> " +
            "    <div>" +
            "    <input id='search-items' type='text' class='validate' style='margin: -20px;'/>" +

            "    <label for='icon_prefix' class='search-label'>Buscar</label>   " +
            "    </div>" +
            "</div>");

          $(document).on('keyup', "input[type='text']", function () {
            var oTable = angular.element('.dataTable').dataTable();
            oTable.fnFilter(angular.element(this).val());
          });
        }, 1000);
      },
      controller: 'DatatableCtrl',
      controllerAs: 'dtb'
    };
  }
  mail.$inject = ['$rootScope', '$compile'];
  function mail($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/mail/mail.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        if (angular.element('#checkMailPage').val() == "mailPage") {
          angular.element('.collection li').on('click', function () {
            angular.element('.collection li').removeClass('active-item');
            if (!(angular.element(this).parent().parent().hasClass('messageBox'))) {
              angular.element(this).addClass('active-item');
              if (angular.element(this).attr('data-group') != undefined) {
                if (angular.element(this).attr('data-group') == 'first') {
                  angular.element('.first_2_2,.first_3_2').removeClass('hiddendiv');
                  angular.element('.second_2_2,.second_3_2,.user_first_2_2,.user_first_3_2,.user_second_2_2,.user_second_3_2').addClass('hiddendiv');
                } else if (angular.element(this).attr('data-group') == 'second') {
                  angular.element('.first_2_2,.first_3_2,.user_first_2_2,.user_first_3_2,.user_second_2_2,.user_second_3_2').addClass('hiddendiv');
                  angular.element('.second_3_2,.second_2_2').removeClass('hiddendiv');
                }
              }
              if (angular.element(this).attr('data-user') != undefined) {
                if (angular.element(this).hasClass('unread')) {
                  var count = angular.element(".countEmails");
                  if (count.html() > 0) {
                    count.html(count.html() - 1);
                  }
                  angular.element(this).removeClass('unread');
                }
                if (angular.element(this).attr('data-user') == 'first') {
                  angular.element('.first_2_2,.first_3_2,.second_2_2,.second_3_2,.user_second_2_2,.user_second_3_2').addClass('hiddendiv');
                  angular.element('.user_first_2_2,.user_first_3_2').removeClass('hiddendiv');
                } else if (angular.element(this).attr('data-user') == 'second') {
                  angular.element('.first_2_2,.first_3_2,.second_2_2,.second_3_2,.user_first_2_2,.user_first_3_2').addClass('hiddendiv');
                  angular.element('.user_second_2_2,.user_second_3_2').removeClass('hiddendiv');
                }
              }
            }
          });
        }
        angular.element('.tabInbox').on('click', function () {
          //                    angular.element(this).addClass('active-item');
          angular.element('.tabImportant_3_1,.tabSend_3_1,.tabDelete_3_1').addClass('hiddendiv');
          angular.element('.tabInbox_3_1').removeClass('hiddendiv');
          angular.element('.tabImportant,.tabSend,.tabDelete').removeClass('active-item');
        });
        angular.element('.tabImportant').on('click', function () {
          //                    angular.element(this).addClass('active-item');
          angular.element('.tabInbox_3_1,.tabSend_3_1,.tabDelete_3_1').addClass('hiddendiv').removeClass('pink');
          angular.element('.tabImportant_3_1').removeClass('hiddendiv');
          angular.element('.tabInbox,.tabSend,.tabDelete').removeClass('active-item');
        });
        angular.element('.tabSend').on('click', function () {
          //                    angular.element(this).addClass('active-item');
          angular.element('.tabImportant_3_1,.tabInbox_3_1,.tabDelete_3_1').addClass('hiddendiv').removeClass('pink');
          angular.element('.tabSend_3_1').removeClass('hiddendiv');
          angular.element('.tabInbox,.tabImportant,.tabDelete').removeClass('active-item');
        });
        angular.element('.tabDelete').on('click', function () {
          //                    angular.element(this).addClass('active-item');
          angular.element('.tabImportant_3_1,.tabInbox_3_1,.tabSend_3_1').addClass('hiddendiv').removeClass('pink');
          angular.element('.tabDelete_3_1').removeClass('hiddendiv');
          angular.element('.tabInbox,.tabImportant,.tabSend').removeClass('active-item');
        });
        var onModalHide = function () {
          angular.element('.modal-participants').addClass('hiddendiv').html('Participants: @Me');
          angular.element('.first-one-johanna,.second-one-jane,.third-one-katia').addClass('hiddendiv');
          angular.element('#autocompleteState').val('');
        };
        angular.element(".compose-modal").on('click', function () {
          angular.element('#compose-modal').openModal({
            complete: onModalHide
          });
        });

        function highlight(string) {
          angular.element('.autocomplete-content li').each(function () {
            var matchStart = angular.element(this).text().toLowerCase().indexOf("" + string.toLowerCase() + ""),
              matchEnd = matchStart + string.length - 1,
              beforeMatch = angular.element(this).text().slice(0, matchStart),
              matchText = angular.element(this).text().slice(matchStart, matchEnd + 1),
              afterMatch = angular.element(this).text().slice(matchEnd + 1);
            angular.element(this).html("<span>" + beforeMatch + "<span class='highlight'>" + matchText + "</span>" + afterMatch + "</span>");
          });
        }

        angular.element('#autocompleteState').data('array', [{ value: "Johanna Doe" }, { value: "Jane Doe" }, { value: "Katia Herbert" }]);
        angular.element('#search').data('array', [{ value: "Johanna Doe" }, { value: "Jane Doe" }, { value: "Katia Herbert" }]);
        var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';
        angular.element(input_selector).each(function () {
          var $input = $(this);
          if ($input.hasClass('autocomplete')) {
            var $array = $input.data('array'),
              $inputDiv = $input.closest('.input-field'); // Div to append on
            if ($array !== '') {
              var $html = '<ul class="autocomplete-content hide">';
              for (var i = 0; i < $array.length; i++) {
                // If path and class aren't empty add image to auto complete else create normal element
                if ($array[i]['path'] !== '' && $array[i]['path'] !== undefined && $array[i]['path'] !== null && $array[i]['class'] !== undefined && $array[i]['class'] !== '') {
                  $html += '<li class="autocomplete-option"><img src="' + $array[i]['path'] + '" class="' + $array[i]['class'] + '"><span>' + $array[i]['value'] + '</span></li>';
                } else {
                  $html += '<li class="autocomplete-option waves-effect"><span>' + $array[i]['value'] + '</span></li>';
                }
              }
              $html += '</ul>';
              $inputDiv.append($html);
              $(document).on('keyup', $input, function () {
                var $val = $input.val().trim(),
                  $select = $('.autocomplete-content');
                // Check if the input isn't empty
                $select.css('width', $input.width());
                if ($val != '') {
                  $select.children('li').addClass('hide');
                  $select.children('li').filter(function () {
                    $select.removeClass('hide'); // Show results
                    // If text needs to highlighted
                    if ($input.hasClass('highlight-matching')) {
                      highlight($val);
                    }
                    var check = true;
                    for (var i in $val) {
                      if ($val[i].toLowerCase() !== $(this).text().toLowerCase()[i])
                        check = false;
                    }
                    return check ? $(this).text().toLowerCase().indexOf($val.toLowerCase()) !== -1 : false;
                  }).removeClass('hide');
                } else {
                  $select.children('li').addClass('hide');
                }
              });
              angular.element('.autocomplete-option').click(function () {
                var string = angular.element(".modal-participants").text();
                var concat;
                if (string.indexOf('Participants') > -1) {
                  concat = '';
                } else {
                  concat = "Participants: @Me";
                }
                if (string.indexOf(angular.element(this).text().trim()) > -1) {
                  if (angular.element(this).text().trim() == "Johanna Doe") {
                    angular.element('.first-one-johanna').removeClass('hiddendiv');
                    angular.element('.second-one-jane,.third-one-katia').addClass('hiddendiv');
                  } else if (angular.element(this).text().trim() == "Jane Doe") {
                    angular.element('.second-one-jane').removeClass('hiddendiv');
                    angular.element('.first-one-johanna,.third-one-katia').addClass('hiddendiv');
                  } else {
                    angular.element('.third-one-katia').removeClass('hiddendiv');
                    angular.element('.first-one-johanna,.second-one-jane').addClass('hiddendiv');
                  }
                  angular.element('.autocomplete-option').addClass('hide');
                  angular.element('#autocompleteState').val('');
                } else {
                  if (angular.element(this).text().trim() == "Johanna Doe") {
                    angular.element('.first-one-johanna').removeClass('hiddendiv');
                    angular.element('.second-one-jane,.third-one-katia').addClass('hiddendiv');
                  } else if (angular.element(this).text().trim() == "Jane Doe") {
                    angular.element('.second-one-jane').removeClass('hiddendiv');
                    angular.element('.first-one-johanna,.third-one-katia').addClass('hiddendiv');
                  } else {
                    angular.element('.third-one-katia').removeClass('hiddendiv');
                    angular.element('.first-one-johanna,.second-one-jane').addClass('hiddendiv');
                  }
                  angular.element(".modal-participants").removeClass("hiddendiv").append(concat + ', @' + angular.element(this).text().trim() + " ");
                  angular.element('#autocompleteState').val('');
                  angular.element('.autocomplete-option').addClass('hide');
                }
              });
            } else {
              return false;
            }
          }
        });
      }
    };
  }
  calendar.$inject = ['$rootScope', '$compile'];
  function calendar($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/calendar/calendar.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        ol();
        function addDays(days) {
          var dat = new Date();
          dat.setDate(dat.getDate() + days);

          return dat;
        }
        function removeDays(days) {
          var dat = new Date();
          dat.setDate(dat.getDate() - days);

          return dat;
        }
        function formatDate(dateObj) {
          return dateObj.getFullYear() + '-' + (dateObj.getMonth() < 9 ? '0' + (dateObj.getMonth() + 1) : (dateObj.getMonth() + 1)) + '-' + (dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate());
        }
        var today = new Date();
        function randomColor() {
          var colors = ['#ad1457', '#1565c0', '#00abc0', '#558a2f', '#6a1b99', '#fda626'];

          return colors[(Math.floor(Math.random() * ((colors.length - 1) - 0 + 1)) + 0)];
        }

        // initialize calendar
        var calendar = $('#calendar');
        calendar.fullCalendar({
          header: {
            left: 'prev,today,next',
            center: 'title',
            right: 'month agendaWeek agendaDay'
          },
          defaultDate: formatDate(today),
          editable: true,
          eventLimit: true, // allow "more" link when too many events
          events: [
            {
              title: 'Car lease',
              start: formatDate(removeDays(5)),
              color: randomColor()
            },
            {
              title: 'IT training',
              start: formatDate(removeDays(3)),
              end: formatDate(addDays(1)),
              color: randomColor()
            },
            {
              id: 999,
              title: 'Kindergarten',
              start: formatDate(removeDays(1)) + 'T16:00:00',
              color: randomColor()
            },
            {
              id: 999,
              title: 'Doctor Appointment',
              start: formatDate(addDays(7)) + 'T16:00:00',
              color: randomColor()
            },
            {
              title: 'Conference',
              start: formatDate(addDays(8)),
              end: formatDate(addDays(10))
            },
            {
              title: 'Meeting',
              start: formatDate(addDays(11)) + 'T10:30:00',
              end: formatDate(addDays(12)) + 'T12:30:00',
              color: randomColor()
            },
            {
              title: 'Lunch',
              start: formatDate(addDays(12)) + 'T12:00:00',
              color: randomColor()
            },
            {
              title: 'Meeting',
              start: formatDate(addDays(12)) + 'T14:30:00',
              color: randomColor()
            },
            {
              title: 'Happy Hour',
              start: formatDate(addDays(12)) + 'T17:30:00',
              color: randomColor()
            },
            {
              title: 'Dinner',
              start: formatDate(addDays(12)) + 'T20:00:00',
              color: randomColor()
            },
            {
              title: 'Birthday Party',
              start: formatDate(addDays(13)) + 'T07:00:00',
              color: randomColor()
            },
            {
              title: 'Anna\'s birthday',
              start: formatDate(addDays(20)),
              color: randomColor()
            }
          ],
          eventAfterAllRender: function () {
            $('.fc-button').addClass('waves-effect'); // add the ripple effect on items click
          }
        });
        $('.modal-trigger').leanModal();
        $('.datepicker').pickadate({
          selectMonths: true, // Creates a dropdown to control month
          selectYears: 15, // Creates a dropdown of 15 years to control year
          format: 'mm/dd/yyyy',
          close: 'choose'
        });
        $('#color').colorpicker({
          customClass: 'colorpicker-2x',
          sliders: {
            saturation: {
              maxLeft: 200,
              maxTop: 200
            },
            hue: {
              maxTop: 200
            },
            alpha: {
              maxTop: 200
            }
          }
        });
        // save new event
        var form = $('#add-event-form');
        form.on('submit', function (e) {
          e.preventDefault();
          var event = {};
          $.each(form.serializeArray(), function (key, field) {
            event[field.name] = field.value;
          });
          calendar.fullCalendar('renderEvent', event, true);
          $('#calendar-modal').closeModal();
          form[0].reset();
        });
      }
    };
  }
  layouts.$inject = ['$rootScope', '$compile'];
  function layouts($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/layouts/layouts.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        Prism.highlightAll();
        $('#default').click(function () {
          ThemeSettings.changeFloatingHeaderState(false);
          $("#vertical-navigation").trigger("click");
          $("#full-width-layout").trigger("click");
        });
        $('#fixed-header').click(function () {
          ThemeSettings.changeFloatingHeaderState(true);
          if (!$("#header-toggle").is(":checked")) {
            $("#header-toggle").closest("label").trigger("click");
          }
          $("#vertical-navigation").trigger("click");
          $("#full-width-layout").trigger("click");
        });
        $('#boxed').click(function () {
          ThemeSettings.changeFloatingHeaderState(false);
          $("#vertical-navigation").trigger("click");
          $("#boxed-layout").trigger("click");
        });
        $('#horizontal-nav').click(function () {
          ThemeSettings.changeFloatingHeaderState(false);
          $("#horizontal-navigation").trigger("click");
          $("#full-width-layout").trigger("click");
        });
        $('#horiz-fix-box').click(function () {
          ThemeSettings.changeFloatingHeaderState(true);
          if (!$("#header-toggle").is(":checked")) {
            $("#header-toggle").closest("label").trigger("click");
          }
          $("#horizontal-navigation").trigger("click");
          $("#boxed-layout").trigger("click");
        })
      }
    };
  }
  uiButtons.$inject = ['$rootScope', '$compile'];
  function uiButtons($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/ui/buttons.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      }
    };
  }
  uiBreadcrumbs.$inject = ['$rootScope', '$compile'];
  function uiBreadcrumbs($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/ui/breadcrumbs.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      }
    };
  }
  uiCards.$inject = ['$rootScope', '$compile'];
  function uiCards($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/ui/cards.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        Prism.highlightAll();
        function resize() {
          for (var i = 1; i < 10; i++) {
            if (angular.element('.code' + i).length && angular.element('.example' + i).length) {
              angular.element('.code' + i).height(angular.element('.example' + i).height());
              if (angular.element('.code' + i + ' pre').length && angular.element('.example' + i + ' .main-pic').length) {
                if (i == 9) {
                  angular.element('.code' + i + ' pre').height(angular.element('.example' + i + ' .main-pic').height() - 60);
                } else if (i == 6) {
                  angular.element('.code' + i + ' pre').height(angular.element('.example' + i + ' .main-pic').height() - 40);
                } else {
                  angular.element('.code' + i + ' pre').height(angular.element('.example' + i + ' .main-pic').height() - 20);
                }
              }
            }
          }
        }
        window.onload = window.onresize = function () {
          resize();
        }
      }
    };
  }
  uiCollections.$inject = ['$rootScope', '$compile'];
  function uiCollections($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/ui/collections.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        angular.element('.dropdown-button').dropdown({
          inDuration: 300,
          outDuration: 225,
          constrain_width: false, // Does not change width of dropdown to that of the activator
          hover: true, // Activate on hover
          gutter: 0, // Spacing from edge
          belowOrigin: true, // Displays dropdown below the button
          alignment: 'right' // Displays dropdown with edge aligned to the left of button
        });
      }
    };
  }
  uiTypography.$inject = ['$rootScope', '$compile'];
  function uiTypography($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/ui/typography.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      }
    };
  }
  uiWidgets.$inject = ['$rootScope', '$compile'];
  function uiWidgets($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/ui/widgets.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      }
    };
  }
  uiToasts.$inject = ['$rootScope', '$compile'];
  function uiToasts($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/ui/snackbars-toasts.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        Prism.highlightAll();
        scope.displayCustomHTMLToast = function () {
          var $toastContent = $('<span>I am custom HTML toast content</span>');
          Materialize.toast($toastContent, 5000);
        }
      }
    };
  }
  uiTooltips.$inject = ['$rootScope', '$compile'];
  function uiTooltips($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/ui/tooltips.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        Prism.highlightAll();
        angular.element('.tooltipped').tooltip({ delay: 50 });
      }
    };
  }
  uiColors.$inject = ['$rootScope', '$compile'];
  function uiColors($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/ui/colors.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        Prism.highlightAll();
      }
    };
  }
  uiFooters.$inject = ['$rootScope', '$compile'];
  function uiFooters($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/ui/footers.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      }
    };
  }
  uiNavbars.$inject = ['$rootScope', '$compile'];
  function uiNavbars($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/ui/navbars.html',
      replace: true,
      controller: 'navbarcontroller',
      controllerAs: 'ipctrl',
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        angular.element('.dropdown-button').dropdown({
          inDuration: 300,
          outDuration: 225,
          constrain_width: false, // Does not change width of dropdown to that of the activator
          hover: true, // Activate on hover
          gutter: 0, // Spacing from edge
          belowOrigin: true, // Displays dropdown below the button
          alignment: 'right' // Displays dropdown with edge aligned to the left of button
        });

      }

    };
  }
  pagesBlog.$inject = ['$rootScope', '$compile'];
  function pagesBlog($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/pages/blog.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      }
    };
  }
  pagesFeed.$inject = ['$rootScope', '$compile'];
  function pagesFeed($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/pages/feed.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        var source = jQuery('.feed-item');
        $.each(source, function (i, a) {
          $(a).css('background-image', 'url(' + $(a).attr('href') + ')');
        });

        /** feed reply action */
        function replySystem(replyFeed) {

          if (replyFeed.length > 0) {
            replyFeed.one('submit', function (e) {
              e.preventDefault();
              var $this = $(this),
                $textarea = $this.find('textarea'),
                weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                now = new Date(),
                dateString = now.getHours() + ':' + now.getMinutes() + " " + weekday[now.getDay()] + " " + now.getDate(),
                $replyTemplate = $($('#reply-template').text().replace(/\{time}/g, dateString).replace(/\{replyText}/g, $textarea.val()));
              renderFeedAction($this, $replyTemplate, false);
            });
          }
        }

        $('.feed-page').on('click', '.wall-feed .feed-reply-action button[type="submit"]', function (e) {
          replySystem($(this).closest('.feed-reply-action'));
        });

        /** new feed action*/

        var new_feed_action = $('.new-feed-action');
        if (new_feed_action.length > 0) {
          new_feed_action.on('submit', function (e) {
            e.preventDefault();
            var $this = $(this),
              $textarea = $this.find('textarea'),
              monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
              now = new Date(),
              dateString = now.getDate() + ' ' + monthNames[now.getMonth()] + ' ' + now.getFullYear() + ' ' + now.getHours() + ':' + now.getMinutes(),
              $newFeedTemplate = $($('#new-feed-template').text().replace(/\{time}/g, dateString).replace(/\{replyText}/g, $textarea.val()));
            renderFeedAction($this, $newFeedTemplate, true);
          });
        }

        function renderFeedAction(element, template, $new) {
          var $imageInput = element.find('.reply-images')[0],
            $replyImageTemplate = $('#reply-image-template')
            ;

          function renderFeed(replyImages) {
            replyImages = replyImages || '';
            template.find('.reply-post-images').html(replyImages);
            if ($new) {
              template.insertAfter(element.closest('.new-feed-input'));
            } else {
              template.insertBefore(element.closest('.feed-input'));
            }
            template.fadeIn();
            element[0].reset();
          }
          if ($imageInput.files.length > 0) {
            var images = '',
              eligibleImages = [],
              processedEligibleImages = 0,
              id = Math.random().toString(16).slice(2),
              readerOnload = function (evt) {
                processedEligibleImages++;
                images += $replyImageTemplate.text().replace(/\{id\}/g, id).replace(/\{imageData\}/g, evt.target.result);
                if (processedEligibleImages == eligibleImages.length) {
                  renderFeed(images);
                }
              };
            $.each($imageInput.files, function (k, file) {
              if (["image/jpeg", "image/jpg", "image/png", "image/gif"].indexOf(file.type) != -1) {
                eligibleImages.push(file);
              }
            });
            if (eligibleImages.length > 0) {
              $.each(eligibleImages, function (k, file) {
                var reader = new FileReader();
                reader.onload = readerOnload;
                reader.readAsDataURL(file);
              });
            } else {
              renderFeed();
            }
          } else {
            renderFeed();
          }
        }
        if (angular.element('#lightbox').length == 0) {
          lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'showImageNumberLabel': true
          });
          lightbox.init();
        }
      }
    };
  }
  pagesTimeline.$inject = ['$rootScope', '$compile'];
  function pagesTimeline($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/pages/timeline.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      }
    };
  }
  pagesPricing.$inject = ['$rootScope', '$compile'];
  function pagesPricing($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/pages/pricing.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      }
    };
  }
  pagesMagazine.$inject = ['$rootScope', '$compile'];
  function pagesMagazine($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/pages/magazine.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        $('ul.tabs').tabs();
      }
    };
  }
  pages404.$inject = ['$rootScope', '$compile'];
  function pages404($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/pages/404.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      }
    };
  }
  pages500.$inject = ['$rootScope', '$compile'];
  function pages500($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/pages/500.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      }
    };
  }
  pagesLock.$inject = ['$rootScope', '$compile'];
  function pagesLock($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/pages/lock.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      }
    };
  }
  pagesLogin.$inject = ['$rootScope', '$compile'];
  function pagesLogin($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'views/login/login.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        //angular.element('body').addClass('black');
        //element.on('$destroy', function(){
        //    angular.element('body').removeClass('black')
        //
        //})
      }
    };
  }
  pagesRegister.$inject = ['$rootScope', '$compile'];
  function pagesRegister($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/pages/register.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      }
    };
  }
  iconsGoogle.$inject = ['$rootScope', '$compile'];
  function iconsGoogle($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/icons/google.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      }
    };
  }
  iconsFontello.$inject = ['$rootScope', '$compile'];
  function iconsFontello($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/icons/fontello.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        Prism.highlightAll();
      }
    }
  }
  iconsMaterial.$inject = ['$rootScope', '$compile'];
  function iconsMaterial($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/icons/material.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        angular.element('.scrollspy').scrollSpy();
        angular.element('.icon-set').on('click', '.icon', function () {
          angular.element('#iconModalLabel').text('zdmi-' + angular.element(this).data('name'));
          var zmdi = 'zmdi-' + angular.element(this).data('name');
          angular.element('#icon-sizes').html(
            '<i class="zmdi zmdi-hc-5x ' + zmdi + '\"></i>&nbsp;&nbsp;' +
            '<span class="hidden-xs">' +
            '<i class="zmdi zmdi-hc-4x ' + zmdi + '\"></i>&nbsp;&nbsp;' +
            '<span class="hidden-sm">' +
            '<i class="zmdi zmdi-hc-3x ' + zmdi + '\"></i>&nbsp;&nbsp;' +
            '</span>' +
            '<i class="zmdi zmdi-hc-2x ' + zmdi + '\"></i>&nbsp;&nbsp;' +
            '</span>' +
            '<i class="zmdi ' + zmdi + '\"></i>&nbsp;'
          );
          angular.element('#icon-code').html(
            '<p><i class="zmdi ' + zmdi + '\"></i> · <span class="unicode">Unicode: ' + angular.element(this).data('code') + '</span></p>' +
            '<p class="category">Category: ' + angular.element(this).closest('.icon-set').find('.page-header').text() + '</p>'
          );
          angular.element('.modal-body').find('.source').html(
            '&lt;i class="zmdi ' + zmdi + '"&gt;&lt;/i&gt;'
          );
        });
        angular.element('.modal-trigger').leanModal();

        var sidenav = angular.element('.bs-docs-sidebar');
        if (sidenav.length != 0)
          sidenav.pushpin({ top: angular.element('.icons-container .row').offset().top });

        //smooth scroll top
        angular.element("a[href='#top']").click(function () {
          angular.element("html, body").animate({ scrollTop: 0 }, "slow");
          return false;
        });
        $(window).scroll(function () {
          if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            angular.element(".bs-docs-sidebar").css("top", "-250px");
          } else {
            angular.element(".bs-docs-sidebar").css("top", "0");
          }
        });
      }
    };
  }
  ecCards.$inject = ['$rootScope', '$compile'];
  function ecCards($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/e-commerce/cards.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        Prism.highlightAll();
        function resize() {
          if (angular.element('.code1').length && angular.element('.example1').length) {
            angular.element('.code1').height(angular.element('.example1').height());
            angular.element('.code1 pre').height(angular.element('.example1 img').height());
          }
          if (angular.element('.code2').length && angular.element('.example2').length) {
            angular.element('.code2').height(angular.element('.example2').height());
            angular.element('.code2 pre').height(angular.element('.example2 img').height());
          }
        }
        window.onload = window.onresize = function () {
          resize();
        }
      }
    };
  }
  ecCarousel.$inject = ['$rootScope', '$compile'];
  function ecCarousel($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/e-commerce/carousel.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        Prism.highlightAll();
        angular.element('.slider1').slider();
        angular.element('.carousel').maraCarousel({
          time_constant: 150,
          padding: 150
        });
        var count = 0;
        angular.element('.product-panel-trigger').on('click', function () {
          if (count == 0) {
            autoplay(1);
            count++;
          }
        });
        function autoplay(start) {
          if (start != null) {
            angular.element('.carousel').maraCarousel('next', [angular.element('.carousel')[0].children.length]);
            autoplay(null);
          } else {
            setInterval(function () { angular.element('.carousel').maraCarousel('next') }, 6000);
          }
        }
      }
    };
  }
  ecDiscounts.$inject = ['$rootScope', '$compile'];
  function ecDiscounts($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/e-commerce/discounts.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        Prism.highlightAll();
      }
    };
  }
  ecInvoice.$inject = ['$rootScope', '$compile'];
  function ecInvoice($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/e-commerce/invoice.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      }
    };
  }
  ecProduct.$inject = ['$rootScope', '$compile'];
  function ecProduct($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/e-commerce/product.html',
      replace: true,
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
        Prism.highlightAll();
        angular.element('.slider1').slider();
        angular.element('.carousel').maraCarousel({
          time_constant: 150,
          padding: 150
        });
        angular.element('.modal-trigger').leanModal();
        var count = 0;
        angular.element('.product-panel-trigger').on('click', function () {
          if (count == 0) {
            autoplay(1);
            count++;
          }
        });
        function autoplay(start) {
          if (start != null) {
            angular.element('.carousel').maraCarousel('next', [angular.element('.carousel')[0].children.length]);
            autoplay(null);
          } else {
            setInterval(function () { angular.element('.carousel').maraCarousel('next') }, 6000);
          }
        }
      }
    };
  }





  ecProducts.$inject = ['$rootScope', '$compile'];
  function ecProducts($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/e-commerce/products.html',
      replace: true,
      controller: 'ecommerceProductsController',
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      }
    }
  }
  ecOrders.$inject = ['$rootScope', '$compile'];
  function ecOrders($rootScope, $compile) {
    return {
      restrict: 'EA',
      templateUrl: 'components/e-commerce/orders.html',
      replace: true,
      controller: 'ecommerceOrdersController',
      link: function (scope, element) {
        $compile(element.contents())($rootScope);
      }
    }
  }
})();
