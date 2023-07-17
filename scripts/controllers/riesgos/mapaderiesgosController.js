'use strict';
angular.module('GenesisApp')
  .controller('mapaderiesgosController', ['$scope', 'consultaHTTP', 'notification', 'cfpLoadingBar', '$http', function ($scope, consultaHTTP, notification, cfpLoadingBar, $http) {


    $scope.permisosModulo = {
      listado: 'MR01',
      listar: 'MR02',
      descargar: 'MR03'
  }
  $scope.permisosValidos = [];


  $scope.permisos = function () {
    $http({
        method: 'POST',
        url: "php/riesgos/riesgos.php",
        data: {
            function: 'permisos_usuario_modulo',
            P_V_CODIGO: 'MR00',
            P_V_USUARIO: sessionStorage.getItem("usuario"),
        }
    }).then(({ data }) => {
        $scope.permisosValidos = data.Acciones
            .filter((accion) => Boolean(accion.Permisos))
            .map((accion) => accion.Codigo)
        // Add swal alert here

    });
}

  $scope.permisos();

 


    $scope.excel = function (zona,tipo,codigo,des) {
      let obj={
        TIPORIESGO:tipo,
        ZONAINHERENTE:zona,
        CODIGO:codigo,
        DESCRIPCION:des,
      }

      for (var prop in obj) {
        if (obj[prop] === "" || obj[prop] === null || obj[prop] === undefined) {
          delete obj[prop];
        }
      }

      let data= Object.entries(obj).map(([TIPO, VALOR]) => ({ TIPO, VALOR }));

      $scope.objetoEnviado=JSON.stringify(data);
      $http({
        method: 'POST',
        url: "php/riesgos/riesgos.php",
        data: {
          function: 'SP_RC_GET_DATA_EXCEL_RIESGO_CONTROL',
          P_V_JSON:  JSON.stringify(data)
        }
      }).then(function (response) {
        $scope.listexcel = response.data;
        
      });
    }
    $scope.excel("","","","");


    $scope.ListadoRiesgos = function () {
      $http({
        method: 'POST',
        url: "php/riesgos/riesgos.php",
        data: {
          function: 'SP_RC_GET_RIESGO_CONTROL',
        }
      }).then(function (response) {
        $scope.listadosRiesgos = response.data;
      });
    }
    $scope.ListadoRiesgos();
    $scope.menu = "listadoriesgo";

    $scope.mostrarVista = function (vista) {
      switch (vista) {
        case "verriesgo":
          $scope.menu = "ver-riesgo";
          break;
        case "listadoriesgo":
          $scope.menu = "listadoriesgo";
          break;
        case "ver-control":
          $scope.menu = "ver-control";
          break;
        default:
          $scope.menu = vista;
          break;
      }
    }

    $scope.elegirTipoRiesgoXTabla = function (data) {
      let tipoRiesgos = data.split(',');
      let cadena = "";
      for (let index = 0; index < $scope.listados.tipoRiesgo.length; index++) {
        tipoRiesgos.forEach(element => {
          if ($scope.listados.tipoRiesgo[index].Codigo == element) {
            if (cadena.length > 0) {
              cadena += ", "
            }
            cadena += $scope.listados.tipoRiesgo[index].Nombre
          }
        });
      }

      return cadena;
    }

    $scope.ListadoControlDetalle = function (ID) {
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
        url: "php/riesgos/riesgos.php",
        data: {
          function: 'SP_RC_GET_CONTROL_DETALLE',
          V_NUMERO_RIESGO: ID
        }
      }).then(function (response) {
        swal.close();
        $scope.listadosControl = response.data;
      });
    }


    $scope.sp_rc_get_data_matriz_riesgo = function () {
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
        url: "php/riesgos/riesgos.php",
        data: {
          function: 'SP_RC_GET_DATA_MATRIZ_RIESGO',
          usuario: sessionStorage.getItem("usuario"),

        }
      }).then(function (response) {
        swal.close();
        $scope.matriz = response.data;
        console.table($scope.matriz);
      });
    }


    //logica del formulario
    $scope.iniciarFormaulario = function () {
      $http({
        method: 'POST',
        url: "php/riesgos/riesgos.php",
        data: {
          function: 'consultar_listado',
        }
      }).then(function (response) {
        $scope.listados = response.data;
        $scope.ListadoRiesgos();
      });
    }
    $scope.iniciarFormaulario();


    $scope.ListadoRiesgosId = function (id) {
      $http({
        method: 'POST',
        url: "php/riesgos/riesgos.php",
        data: {
          function: 'SP_RC_GET_RIESGO_CONTROL_ID',
          V_NUMERO_RIESGO: id
        }
      }).then(function (response) {
        $scope.riesgos = response.data
        $scope.elegirTipoRiesgoXEditado(response.data.TipoRiesgo);
        $scope.elegirprobalidadInherente(response.data.ProbalidadInherenteId);
        $scope.elegirAfectacionReputacional(response.data.AfectuacionReputacionalId)
        $scope.elegirafectuacionEconomica(response.data.AfectuacionEconomicaId)
        $scope.elegirAfectuacionSaludAfiliado(response.data.AfectuacionSaludAfilidadosId)
      });
    }


    $scope.elegirTipoRiesgoXEditado = function (data) {
      $scope.tiposRiesgosElegidos = [];
      $scope.tipoRiesgos = data.split(',');
      for (let index = 0; index < $scope.listados.tipoRiesgo.length; index++) {
        $scope.tipoRiesgos.forEach(element => {
          if ($scope.listados.tipoRiesgo[index].Codigo == element) {
            $scope.tiposRiesgosElegidos.push(
              $scope.listados.tipoRiesgo[index]
            )
          }
        });
      }
    }

    $scope.elegirprobalidadInherente = function (codigo) {
      $scope.probabilidadInherenteElegidos = [];
      for (let index = 0; index < $scope.listados.probabilidadInherente.length; index++) {
        if ($scope.listados.probabilidadInherente[index].Codigo == codigo) {
          $scope.probabilidadInherenteElegidos.push(
            $scope.listados.probabilidadInherente[index]
          )
        }
      }
      const encontrado = $scope.listados.probabilidadInherente.find(element => element.Codigo == codigo);
      $scope.probalidadInherenteProbabilidad = encontrado.Probabilidad;
      $scope.riesgos.probalidadInherenteId = encontrado.Codigo

      const index = $scope.listados.probabilidadInherente.indexOf(encontrado);
      $scope.listados.probabilidadInherente[index].Estado = true;
      $scope.definirRiesgo();
    }


    $scope.elegirAfectacionReputacional = function (codigo) {

      $scope.ListadoElegirAfectuacionReputacional = []
      for (let index = 0; index < $scope.listados.afectuacionReputacional.length; index++) {
        if ($scope.listados.afectuacionReputacional[index].Codigo == codigo) {
          $scope.ListadoElegirAfectuacionReputacional.push(
            $scope.listados.afectuacionReputacional[index]
          )
        }
      }
      const encontrado = $scope.listados.afectuacionReputacional.find(element => element.Codigo == codigo);
      $scope.riesgos.afectacionReputacionalId = encontrado.Codigo;
      $scope.afectacionReputacionalProbabilidad = encontrado.Probabilidad;
      const index = $scope.listados.afectuacionReputacional.indexOf(encontrado);
      $scope.listados.afectuacionReputacional[index].Estado = true;
      $scope.definirRiesgo();
    }

    $scope.elegirafectuacionEconomica = function (codigo) {
      $scope.ListadoElegirAfectuacionEconomica = [];
      for (let index = 0; index < $scope.listados.afectuacionEconomica.length; index++) {
        if ($scope.listados.afectuacionEconomica[index].Codigo == codigo) {
          $scope.ListadoElegirAfectuacionEconomica.push(
            $scope.listados.afectuacionEconomica[index]
          )
        }
      }
      const encontrado = $scope.listados.afectuacionEconomica.find(element => element.Codigo == codigo);
      $scope.riesgos.afectacionEconomicaId = encontrado.Codigo;
      $scope.afectacionEconomicaProbabilidad = encontrado.Probabilidad;
      const index = $scope.listados.afectuacionEconomica.indexOf(encontrado);
      $scope.listados.afectuacionEconomica[index].Estado = true;
      $scope.definirRiesgo();
    }

    $scope.elegirAfectuacionSaludAfiliado = function (codigo) {
      $scope.ListadoElegirafectuacionSaludAfiliado = [];
      for (let index = 0; index < $scope.listados.afectuacionSaludAfiliado.length; index++) {
        if ($scope.listados.afectuacionSaludAfiliado[index].Codigo == codigo) {
          $scope.ListadoElegirafectuacionSaludAfiliado.push(
            $scope.listados.afectuacionSaludAfiliado[index]
          )
        }
      }
      const encontrado = $scope.listados.afectuacionSaludAfiliado.find(element => element.Codigo == codigo);
      $scope.riesgos.afectacionSaludAfiliadosId = encontrado.Codigo;
      $scope.afectacionSaludAfiliadosProbabilidad = encontrado.Probabilidad;
      const index = $scope.listados.afectuacionSaludAfiliado.indexOf(encontrado);
      $scope.listados.afectuacionSaludAfiliado[index].Estado = true;
      $scope.definirRiesgo();
    }

    $scope.definirRiesgo = function () {
      $scope.campana = "0";
      let impacto = "0";
      let t = "0";
      if (parseInt($scope.afectacionSaludAfiliadosProbabilidad) > parseInt($scope.afectacionReputacionalProbabilidad)) {
        t = $scope.afectacionSaludAfiliadosProbabilidad;
      } else {
        t = $scope.afectacionReputacionalProbabilidad;
      }
      if (t > parseInt($scope.afectacionEconomicaProbabilidad)) {
        impacto = t;
      } else {
        impacto = parseInt($scope.afectacionEconomicaProbabilidad);
      }
      if ((impacto == "0") && ($scope.probalidadInherenteProbabilidad == "0")) {
        $scope.campana = "0";
        return;
      }
      impacto = parseInt(impacto) / 20;
      let probalidad = parseInt($scope.probalidadInherenteProbabilidad) / 20

      $scope.campana = probalidad + "" + impacto;
      console.log($scope.campana)

    }
    


    $scope.descargarExcel = function() {
   
      swal({
        title: 'Cargando',
        html: '<div style="text-align: center;"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><br><br><span style="font-size: 1.2em;"></span></div>',
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        background: '#fff',
        showCloseButton: false,
      });
     
      $http({
        method: 'POST',
        url: "php/riesgos/procesar.php",
        data: {
          parametro: $scope.objetoEnviado
        },
        responseType: 'arraybuffer' // Set the response type to 'arraybuffer'
      }).then(function(response) {
        // Create a download link for the Excel file
        var link = document.createElement('a');
        var blob = new Blob([response.data], {
          type: 'application/octet-stream'
        });
        var url = URL.createObjectURL(blob);
        link.href = url;
        link.download = 'matriz.xlsx';
        swal.close();
    
        link.target = '_blank';
        document.body.appendChild(link); // Append the link to the document body
        link.click();
        document.body.removeChild(link); // Remove the link from the document body after the download
        URL.revokeObjectURL(url); // Release the object URL resources
      }).catch(function(error) {
        swal('Error', 'La respuesta no es válida', 'error');
      });
    };
    
    








  }]);
