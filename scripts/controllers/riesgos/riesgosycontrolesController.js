'use strict';
angular.module('GenesisApp')
  .controller('riesgosycontrolesController', ['$scope', 'ngDialog', 'consultaHTTP', 'notification', 'cfpLoadingBar', '$http', function ($scope, ngDialog, consultaHTTP, notification, cfpLoadingBar, $http) {



    $scope.AbrirModalGestion = function (id) {

      $scope.modal = {
        id: id,
        estado: "CO",
        Observacion: ""
      }
      $scope.dialogDiagreg = ngDialog.open({
        template: 'views/riesgos/modal/modalGestionRiesgo.html',
        closeByDocument: false,
        closeByEscape: false,
        scope: $scope
      });

    }

    $scope.permisosModulo = {
      guardar: 'RC01',
      editar: 'RC03',
      listar: 'RC02'
    }
    $scope.permisosValidos = [];


    $scope.permisos = function () {
      $http({
        method: 'POST',
        url: "php/riesgos/riesgos.php",
        data: {
          function: 'permisos_usuario_modulo',
          P_V_CODIGO: 'RC00',
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





    $scope.menu = "tabla-riesgos";
    $scope.campana = "0";
    $scope.afectacionSaludAfiliadosProbabilidad = "0";
    $scope.afectacionSaludAfiliadosProbabilidad = "0";
    $scope.afectacionReputacionalProbabilidad = "0";
    $scope.afectacionEconomicaProbabilidad = "0";
    $scope.probalidadInherenteProbabilidad = "0";
    $scope.tipoct = 0
    $scope.implementacionct = 0
    $scope.mostrarSeleccion = function (valor) {
      const encontrado = $scope.listados.atributoscontroltipo.find(element => element.Codigo == valor);
      $scope.tipoct = encontrado.Probabilidad;
      $scope.control.valoracionControl = parseInt($scope.tipoct) + parseInt($scope.implementacionct);
      $scope.control.valoracionControl = $scope.control.valoracionControl + '%';

    }


    $scope.mostrarSeleccion1 = function (valor) {
      const encontrado = $scope.listados.implementacion.find(element => element.Codigo == valor);
      $scope.implementacionct = encontrado.Probabilidad;
      $scope.control.valoracionControl = parseInt($scope.tipoct) + parseInt($scope.implementacionct);
      $scope.control.valoracionControl = $scope.control.valoracionControl + '%';

    }



    // funcion mostrarVista
    // @Param vista: (string)
    // vista=riesgos->muestra tabla o formualrio de riesgos
    $scope.mostrarVista = function (vista) {
      switch (vista) {
        case "riesgo":
          $scope.menu = $scope.menu == "formulario-riesgos" ? "tabla-riesgos" : "formulario-riesgos";
          break;
        case "tablaRiesgo":
          $scope.menu = "tabla-riesgos";
          $scope.ListadoRiesgos();
          break;
        case "formularioRiesgo":
          $scope.menu = "formulario-riesgos"
          break;
        case "control":
          $scope.menu = "tabla-controles";
          $scope.ListadoControlDetalle($scope.riesgoElegido.Codigo)
          break
        case "controlform":
          $scope.menu = "formulario-Control"
        default:
          break;
      }
    }


    $scope.ListadoRiesgos = function () {
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
          function: 'SP_RC_GET_RIESGO_CONTROL',
        }
      }).then(function (response) {
        swal.close();
        $scope.listadosRiesgos = response.data;
      });
    }


    $scope.search = function () {
      var searchText = $scope.searchText.toLowerCase();
      $scope.datos = $scope.todosLosDatos.filter(function (dato) {
        return (dato.Proceso.toLowerCase().indexOf(searchText) !== -1) ||
          (dato.DescripcionRiesgo.toLowerCase().indexOf(searchText) !== -1) ||
          (elegirTipoRiesgoXTabla(dato.TipoRiesgo).toLowerCase().indexOf(searchText) !== -1) ||
          (dato.ProbalidadInherente.toLowerCase().indexOf(searchText) !== -1) ||
          (dato.AfectuacionReputacional.toLowerCase().indexOf(searchText) !== -1) ||
          (dato.AfectuacionEconomica.toLowerCase().indexOf(searchText) !== -1) ||
          (dato.AfectuacionSaludAfilidados.toLowerCase().indexOf(searchText) !== -1) ||
          (dato.AfectuacionContratistas.toLowerCase().indexOf(searchText) !== -1) ||
          (dato.AfectuacionTrabajadores.toLowerCase().indexOf(searchText) !== -1);
      });
    }


    //listado de riesgos id
    $scope.ListadoRiesgosId = function (id) {

      $http({
        method: 'POST',
        url: "php/riesgos/riesgos.php",
        data: {
          function: 'SP_RC_GET_RIESGO_CONTROL_ID',
          V_NUMERO_RIESGO: id
        }
      }).then(function (response) {
        $scope.ListadoHistorico(id)
        $scope.riesgoElegido = response.data;
        $scope.riesgos = {
          numeroRiesgo: response.data.Codigo,
          estado: response.data.Estado,
          proceso: response.data.ProcesoId,
          impactoRiesgo: response.data.ImpactoRiesgo,
          causaInmediata: response.data.CausaInmediata,
          causaRaiz: response.data.CausaRaiz,
          descripcionRiesgo: response.data.DescripcionRiesgo,
          tipoRiesgo: response.data.TipoRiesgo,
          probalidadInherenteId: response.data.ProbalidadInherenteId,
          afectacionReputacionalId: response.data.AfectuacionReputacionalId,
          afectacionEconomicaId: response.data.AfectuacionEconomicaId,
          afectacionSaludAfiliadosId: response.data.AfectuacionSaludAfilidadosId,
          zonaRiesgoInherente: response.data.ZonaRiesgoInherente,
          usuarioCreacion: sessionStorage.getItem("usuario"),
        }
        $scope.elegirAfectacionReputacional(response.data.AfectuacionReputacionalId)
        $scope.elegirafectuacionEconomica(response.data.AfectuacionEconomicaId)
        $scope.elegirAfectuacionSaludAfiliado(response.data.AfectuacionSaludAfilidadosId)
        $scope.elegirTipoRiesgoXEditado(response.data.TipoRiesgo);
        $scope.elegirprobalidadInherente(response.data.ProbalidadInherenteId);

      });
    }

    //listado de riesgos id
    $scope.ListadoHistorico = function (id) {
      $http({
        method: 'POST',
        url: "php/riesgos/riesgos.php",
        data: {
          function: 'SP_RC_GET_HIS_OBSERVACION_RIESGO',
          V_NUMERO_RIESGO: Number(id)
        }
      }).then(function (response) {
        $scope.historico = response.data;
      });
    }

    //logica del ListadoControlDetalle
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

    $scope.getTooltip = function (codigo) {
      switch (codigo) {
        case '1':
          return 'Va hacía las causas del riesgo, aseguran el resultado esperado final.';
        case '2':
          return 'Detecta que algo ocurre y devuelve el proceso a los controles preventivos. Se puede generar reproceso.';
        case '3':
          return 'Dado que permite reducir el impacto de la materialización del riesgo, tienen un costo en su implementación.';
        default:
          return '';
      }
    };



    $scope.checkCantidadRegistros = function () {
      if ($scope.listadosControl.length >= 10) {
        $scope.botonDesactivado = true;
      }

      else {
        $scope.botonDesactivado = false;
      }

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


    //formulario de riesgos,
    $scope.formularioRiesgo = function (numeroRiesgo) {
      $scope.tipoRiesgos = [];
      $scope.riesgos = {
        numeroRiesgo: numeroRiesgo,
        estado: numeroRiesgo == 0 ? 'A' : 'I',
        proceso: "",
        impactoRiesgo: "Posibilidad de",
        causaInmediata: "por",
        causaRaiz: "debido a",
        descripcionRiesgo: "",
        tipoRiesgo: "",
        probalidadInherenteId: "",
        afectacionReputacionalId: "",
        afectacionEconomicaId: "",
        afectacionSaludAfiliadosId: "",
        zonaRiesgoInherente: "",
        usuarioCreacion: sessionStorage.getItem("usuario"),
      }

      $scope.updateFields = function () {
        if ($scope.riesgos.impactoRiesgo.length < 15) {
          $scope.riesgos.impactoRiesgo = 'Posibilidad de';
        }
        if ($scope.riesgos.causaInmediata.length < 3) {
          $scope.riesgos.causaInmediata = 'por';
        }

        if ($scope.riesgos.causaRaiz.length < 8) {
          $scope.riesgos.causaRaiz = 'debido a';
        }
      }
      if (numeroRiesgo != 0) {
        $scope.ListadoRiesgosId(numeroRiesgo);
      }
    }





    $scope.reporte = function () {

    }



    $scope.edicion = function (dato) {
      $scope.control = {
        numeroControl: dato.Codigo,
        estado: dato.Estado,
        descripcionControl: dato.DescripcionControl,
        responsableId: dato.ResponsableId,
        tipoId: dato.TipoId,
        implementacionId: dato.ImplementacionId,
        documentacionId: dato.DocumentacionId,
        frecuenciaId: dato.FrecuendiaId,
        evidenciaId: dato.EvidenciaId,
        valoracionControl: dato.ValoracionControl + '%',
      }
      ng.applyChanges($0)
    }

    $scope.elegirTipoRiesgo = function (i) {
      if ($scope.listados.tipoRiesgo[i].Estado == true) {
        $scope.tipoRiesgos.push($scope.listados.tipoRiesgo[i].Codigo);
        if ($scope.tipoRiesgos.length > 3) {
          $scope.listados.tipoRiesgo[i].Estado = false;
          swal('Información', "Solo se permite ingresar máximo 3 tipos de riesgo", 'error');
          $scope.tipoRiesgos.length = $scope.tipoRiesgos.length - 1
        }
        console.log($scope.tipoRiesgos)
      } else {

        var index = $scope.tipoRiesgos.findIndex(function (objeto) {
          return objeto === $scope.listados.tipoRiesgo[i].Codigo;
        });

        if (index !== -1) {
          $scope.tipoRiesgos.splice(index, 1);
        }
        console.log($scope.tipoRiesgos)
      }
    }

    $scope.elegirTipoRiesgoXEditado = function (data) {
      $scope.tipoRiesgos = data.split(',');
      for (let index = 0; index < $scope.listados.tipoRiesgo.length; index++) {
        $scope.tipoRiesgos.forEach(element => {
          if ($scope.listados.tipoRiesgo[index].Codigo == element) {
            $scope.listados.tipoRiesgo[index].Estado = true;
          }
        });
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

    $scope.elegirprobalidadInherente = function (codigo) {
      for (let index = 0; index < $scope.listados.probabilidadInherente.length; index++) {
        $scope.listados.probabilidadInherente[index].Estado = false;;
      }
      const encontrado = $scope.listados.probabilidadInherente.find(element => element.Codigo == codigo);
      $scope.probalidadInherenteProbabilidad = encontrado.Probabilidad;
      $scope.riesgos.probalidadInherenteId = encontrado.Codigo

      const index = $scope.listados.probabilidadInherente.indexOf(encontrado);
      $scope.listados.probabilidadInherente[index].Estado = true;
      $scope.definirRiesgo();
    }

    $scope.elegirAfectacionReputacional = function (codigo) {
      for (let index = 0; index < $scope.listados.afectuacionReputacional.length; index++) {
        $scope.listados.afectuacionReputacional[index].Estado = false;;
      }
      const encontrado = $scope.listados.afectuacionReputacional.find(element => element.Codigo == codigo);
      $scope.riesgos.afectacionReputacionalId = encontrado.Codigo;
      if ($scope.buscarAplicaValidacion()) {
        $scope.riesgos.afectacionReputacionalId = ""
        return
      }
      $scope.afectacionReputacionalProbabilidad = encontrado.Probabilidad;
      const index = $scope.listados.afectuacionReputacional.indexOf(encontrado);
      $scope.listados.afectuacionReputacional[index].Estado = true;
      $scope.definirRiesgo();
    }

    $scope.elegirafectuacionEconomica = function (codigo) {
      for (let index = 0; index < $scope.listados.afectuacionEconomica.length; index++) {
        $scope.listados.afectuacionEconomica[index].Estado = false;;
      }

      const encontrado = $scope.listados.afectuacionEconomica.find(element => element.Codigo == codigo);
      $scope.riesgos.afectacionEconomicaId = encontrado.Codigo;
      if ($scope.buscarAplicaValidacion()) {
        $scope.riesgos.afectacionEconomicaId = ""
        return
      }
      $scope.afectacionEconomicaProbabilidad = encontrado.Probabilidad;
      const index = $scope.listados.afectuacionEconomica.indexOf(encontrado);
      $scope.listados.afectuacionEconomica[index].Estado = true;
      $scope.definirRiesgo();
    }

    $scope.elegirAfectuacionSaludAfiliado = function (codigo) {

      for (let index = 0; index < $scope.listados.afectuacionSaludAfiliado.length; index++) {
        $scope.listados.afectuacionSaludAfiliado[index].Estado = false;;
      }
      const encontrado = $scope.listados.afectuacionSaludAfiliado.find(element => element.Codigo == codigo);
      $scope.riesgos.afectacionSaludAfiliadosId = encontrado.Codigo;
      if ($scope.buscarAplicaValidacion()) {
        $scope.riesgos.afectacionSaludAfiliadosId = ""
        return
      }
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
      if (impacto == 5) {
        $scope.zona = "Extrema";
      } else if ((impacto == 4)) {
        $scope.zona = "Alta"
      } else if (probalidad == 5) {
        $scope.zona = "Alta"
      } else if (($scope.campana == "11") || ($scope.campana == "21") || ($scope.campana == "12")) {
        $scope.zona = "Baja"
      } else {
        $scope.zona = "Moderado"
      }
      console.log($scope.campana)
      $scope.riesgos.zonaRiesgoInherente = $scope.zona

    }

    $scope.buscarAplicaValidacion = function () {
      if (
        $scope.buscadonombre('afectuacionReputacional', $scope.riesgos.afectacionReputacionalId) &&
        $scope.buscadonombre('afectuacionEconomica', $scope.riesgos.afectacionEconomicaId) &&
        $scope.buscadonombre('afectuacionSaludAfiliado', $scope.riesgos.afectacionSaludAfiliadosId)
      ) {
        swal(
          'Información',
          '“Lo sentimos, No se permite seleccionar “No aplica” en las 3 afectaciones del ítem de impacto inherente”',
          'warning'
        );
        return true;
      }
      return false;
    }

    $scope.prepararArray = function () {
      $scope.riesgos.descripcionRiesgo = `${$scope.riesgos.impactoRiesgo} ${$scope.riesgos.causaInmediata} ${$scope.riesgos.causaRaiz}`
      if ($scope.tipoRiesgos.length > 3) {
        swal('Información', 'El tipo de riesgo máximo es 3', 'warning');
        return true;
      } else {
        $scope.riesgos.tipoRiesgo = $scope.tipoRiesgos.join(",");
      }
      return false;
    }




    $scope.guardadoRiesgos = function (seguir) {
      $http({
        method: 'POST',
        url: "php/riesgos/riesgos.php",
        data: {
          function: 'SP_RC_POST_GUARDAR_RIESGO',
          P_V_NUMERO_RIESGO: $scope.riesgos.numeroRiesgo,
          P_V_ESTADO: $scope.riesgos.estado,
          P_V_PROCESO: $scope.riesgos.proceso,
          P_V_IMPACTO_RIESGO: $scope.riesgos.impactoRiesgo,
          P_V_CAUSA_INMEDIATA: $scope.riesgos.causaInmediata,
          P_V_CAUSA_RAIZ: $scope.riesgos.causaRaiz,
          P_V_DESCRIPCION_RIESGO: $scope.riesgos.descripcionRiesgo,
          P_V_TIPO_RIESGO: $scope.riesgos.tipoRiesgo,
          P_I_PROBALIDAD_INHERENTE_ID: $scope.riesgos.probalidadInherenteId,
          P_I_AFECTACION_REPUTACIONAL_ID: $scope.riesgos.afectacionReputacionalId,
          P_I_AFECTACION_ECONOMICA_ID: $scope.riesgos.afectacionEconomicaId,
          P_I_AFECTACION_SALUD_AFILIADOS_ID: $scope.riesgos.afectacionSaludAfiliadosId,
          P_V_ZONA_RIESGO_INHERENTE: $scope.riesgos.zonaRiesgoInherente,
          P_V_ESTADO_RIESGO:  'PE',
          P_V_OBSERVACION_RIESGO: $scope.riesgos.observacion ? $scope.riesgos.observacion : '',
          P_V_USUARIO_CREACION: $scope.riesgos.usuarioCreacion,
        }
      }).then(function (response) {
        if (response.data.codigo == 0) {
          swal('Información', response.data.mensaje, 'success');
          if (seguir) {
            setTimeout(() => {
              $scope.mostrarVista("controlform")
            }, 3000);
           

            $scope.formualarioControl(0);
            $scope.riesgoElegido = $scope.riesgos;
            $scope.riesgoElegido.Codigo = response.data.numeroId
          } else {
            setTimeout(() => {
              $scope.mostrarVista("tablaRiesgo")
            }, 3000);
           
          }
        } else {
          swal('Información', response.data.mensaje, 'error');
        }
      });
    }


    $scope.sp_rc_post_guardar_estado = function (numero, estado, observacion) {
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
          function: 'SP_RC_POST_GUARDAR_ESTADO',
          P_V_NUMERO_RIESGO: numero,
          P_V_ESTADO_RIESGO: estado,
          P_V_OBSERVACION_RIESGO: observacion,
          P_V_USUARIO_CREACION: sessionStorage.getItem("usuario"),
        }
      }).then(function (response) {
        swal.close();
        if (response.data.codigo == 0) {
          let mensaje=estado=='AP'?'Riesgo ha sido aprobado exitosamente':'Los datos han sido guardado exitosamente';
          swal('Información', mensaje, 'success');
          setTimeout(() => {
            $scope.ListadoRiesgos();
          }, 3000);

        } else {
          swal('Información', response.data.mensaje, 'error');
        }
      });
    }

    $scope.EstadoNombre = function (estado) {
      switch (estado) {
        case "AP":
          return "APROBADO"
          break;
        case "CO":
          return "POR CORREGIR"
          break;
        case "AP":
          break;
        default:
          return "PENDIENTE"
          break;
      }
    }

    $scope.mostrar=function(data){
      swal('Descripción', data );
    }


    $scope.validacionCamposRiesgos = function () {
      if (
        $scope.riesgos.proceso == "" || $scope.riesgos.proceso == undefined || $scope.riesgos.proceso == null
        || $scope.riesgos.impactoRiesgo == "" || $scope.riesgos.impactoRiesgo == undefined || $scope.riesgos.impactoRiesgo == null
        || $scope.riesgos.causaInmediata == "" || $scope.riesgos.causaInmediata == undefined || $scope.riesgos.causaInmediata == null
        || $scope.riesgos.causaRaiz == "" || $scope.riesgos.causaRaiz == undefined || $scope.riesgos.causaRaiz == null
        || $scope.riesgos.descripcionRiesgo == "" || $scope.riesgos.descripcionRiesgo == undefined || $scope.riesgos.descripcionRiesgo == null
        || $scope.riesgos.tipoRiesgo == "" || $scope.riesgos.tipoRiesgo == undefined || $scope.riesgos.tipoRiesgo == null
        || $scope.riesgos.probalidadInherenteId == "" || $scope.riesgos.probalidadInherenteId == undefined || $scope.riesgos.probalidadInherenteId == null
        || $scope.riesgos.afectacionReputacionalId == "" || $scope.riesgos.afectacionReputacionalId == undefined || $scope.riesgos.afectacionReputacionalId == null
        || $scope.riesgos.afectacionEconomicaId == "" || $scope.riesgos.afectacionEconomicaId == undefined || $scope.riesgos.afectacionEconomicaId == null
        || $scope.riesgos.afectacionSaludAfiliadosId == "" || $scope.riesgos.afectacionSaludAfiliadosId == undefined || $scope.riesgos.afectacionSaludAfiliadosId == null
        || $scope.riesgos.usuarioCreacion == "" || $scope.riesgos.usuarioCreacion == undefined || $scope.riesgos.usuarioCreacion == null
      ) {
        swal('Información', 'Todos los campos deben estar lleno para realizar la acción', 'warning');
        return true;
      }



    }

    $scope.buscadoCaracter = function (cadena) {
      let caracteres = "aplica";
      if (cadena.includes(caracteres)) {
        return true
      } else {
        return false
      }
    }

    $scope.buscadonombre = function (array, id) {
      let arrayObjetos = $scope.listados[array]
      let objetosEncontrados = arrayObjetos.filter(function (objeto) {
        return objeto.Codigo === id;
      });
      if (objetosEncontrados.length != 0) {
        return $scope.buscadoCaracter(objetosEncontrados[0].Nombre);
      } else {
        return false
      }


    }

    $scope.siguiente = function () {
      if ($scope.prepararArray()) {
        return;
      }
      console.log($scope.riesgos)
      if ($scope.validacionCamposRiesgos()) {
        return
      }
      $scope.guardadoRiesgos(true)
    }

    $scope.guardado = function () {
      if ($scope.prepararArray()) {
        return;
      }
      console.log($scope.riesgos)
      if ($scope.validacionCamposRiesgos()) {
        return
      }
      $scope.guardadoRiesgos(false)
    }




    //comienzo del control

    $scope.consultaConstrol = function (data) {
      console.log(data);
      $scope.riesgoElegido = data;
      $scope.mostrarVista('control');;
    }


    $scope.formualarioControl = function (control) {

      $scope.control = {
        numeroControl: control,

        estado: control == 0 ? 'A' : 'I',
        descripcionControl: "",
        responsableId: "",
        tipoId: "",
        implementacionId: "",
        documentacionId: "",
        frecuenciaId: "",
        evidenciaId: "",
        valoracionControl: "",
      }


    }



    //logica del formulario
    $scope.guardadoControl = function (P_N_NUMERO_CONTROL, P_V_ESTADO, P_V_DESCRIPCION_CONTROL, P_I_RESPONSABLE_ID, P_I_AC_TIPO_ID, P_I_AC_IMPLEMENTACION_ID, P_I_AC_DOCUMENTACION_ID, P_I_AC_FRECUENCIA_ID, P_I_AC_EVIDENCIA_ID, P_I_VALORACION_CONTROL) {
      $http({
        method: 'POST',
        url: "php/riesgos/riesgos.php",
        data: {
          function: 'SP_RC_POST_GUARDAR_CONTROL',
          P_V_NUMERO_RIESGO: $scope.riesgoElegido.Codigo,
          P_N_NUMERO_CONTROL: P_N_NUMERO_CONTROL,
          P_V_ESTADO: P_V_ESTADO,
          P_V_DESCRIPCION_CONTROL: P_V_DESCRIPCION_CONTROL,
          P_I_RESPONSABLE_ID: P_I_RESPONSABLE_ID,
          P_I_AC_TIPO_ID: P_I_AC_TIPO_ID,
          P_I_AC_IMPLEMENTACION_ID: P_I_AC_IMPLEMENTACION_ID,
          P_I_AC_DOCUMENTACION_ID: P_I_AC_DOCUMENTACION_ID,
          P_I_AC_FRECUENCIA_ID: P_I_AC_FRECUENCIA_ID,
          P_I_AC_EVIDENCIA_ID: P_I_AC_EVIDENCIA_ID,
          P_I_VALORACION_CONTROL: P_I_VALORACION_CONTROL.slice(0, -1),
          P_V_USUARIO_CREACION: sessionStorage.getItem("usuario"),
        }
      }).then(function (response) {
        if (response.data.codigo == 0) {
          swal('Información', response.data.mensaje, 'success');
          setTimeout(() => {
            $scope.mostrarVista("control")
          }, 3000);
        
        } else {
          swal('Información', response.data.mensaje, 'error');
        }
      });
    }

    $scope.guardadoClick = function () {

      //   if (
      // $scope.control.estado == "" || $scope.control.estado == undefined || $scope.control.estado==null
      //|| $scope.control.responsableId == "" || $scope.control.responsableId == undefined || $scope.control.responsableId==null
      //|| $scope.control.tipoId == "" || $scope.control.tipoId == undefined || $scope.control.tipoId==null
      //|| $scope.control.implementacionId == "" || $scope.control.implementacionId == undefined || $scope.control.implementacionId==null
      //|| $scope.control.documentacionId == "" || $scope.control.documentacionId == undefined || $scope.control.documentacionId==null
      //|| $scope.control.frecuenciaId == "" || $scope.control.frecuenciaId == undefined || $scope.control.frecuenciaId==null
      //|| $scope.control.evidenciaId == "" || $scope.control.evidenciaId == undefined || $scope.control.evidenciaId==null
      //|| $scope.control.valoracionControl == "" || $scope.control.valoracionControl == undefined || $scope.control.valoracionControl==null
      //   ){
      // swal('Información', 'Todos los campos deben estar lleno para realizar la acción', 'warning');
      //return true;
      // }



      $scope.guardadoControl($scope.control.numeroControl, $scope.control.estado, $scope.control.descripcionControl, $scope.control.responsableId, $scope.control.tipoId, $scope.control.implementacionId, $scope.control.documentacionId, $scope.control.frecuenciaId, $scope.control.evidenciaId, $scope.control.valoracionControl);

    }


  }]);












