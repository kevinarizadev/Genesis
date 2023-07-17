"use strict";
angular.module("GenesisApp").controller("ausentismoController", [
  "$scope",
  "$http",
  "ngDialog",
  "notification",
  "ausentismoHttp",
  "$timeout",
  "$q",
  "communication",
  "$controller",
  "$rootScope",
  "$window",
  function (
    $scope,
    $http,
    ngDialog,
    notification,
    ausentismoHttp,
    $timeout,
    $q,
    communication,
    $controller,
    $rootScope,
    $window
  ) {
    $(document).ready(function () {
      $(".modal").modal();
      $scope.Rol_Ubicacion = sessionStorage.getItem("municipio");
      $scope.Rol_Cedula = sessionStorage.getItem("cedula");
      setTimeout(() => {
        $(".timepicker").timepicker({
          timeFormat: "HH:mm",
          interval: 30,
          minTime: "07:00",
          maxTime: "17:00",
          defaultTime: "07:00",
          startTime: "07:00",
          dynamic: false,
          dropdown: true,
          scrollbar: true,
        });
      });
      $scope
        .loadJS("https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js")
        .then(() => { });
    });

    $scope.loadJS = (url) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;

        script.onload = () => {
          resolve();
        };

        script.onerror = () => {
          reject();
        };
        document.body.appendChild(script);
      });
    };



    $scope.getBase64 = function (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }

    $scope.crudGrid = {};
    let test = null;

    $scope.crudGrid.departamentos = [
      { Name: "", Id: "" },
      { Name: "NACIONAL", Id: "1" },
      { Name: "ATLANTICO", Id: "8000" },
      { Name: "BOLIVAR", Id: "13000" },
      { Name: "CESAR", Id: "20000" },
      { Name: "CORDOBA", Id: "23000" },
      { Name: "GUAJIRA", Id: "44000" },
      { Name: "MAGDALENA", Id: "47000" },
      { Name: "META", Id: "50000" },
      { Name: "SUCRE", Id: "70000" },
    ];

    $scope.crudGrid.tipopermiso = [
      { Name: "", Id: "" },
      { Name: "SERVICIOS MÉDICOS", Id: "18" },
      { Name: "DILIGENCIAS PERSONALES", Id: "19" },
      { Name: "CALAMIDAD DOMÉSTICA", Id: "20" },
      { Name: "EJERCICIO DEL SUFRAGIO JURADO", Id: "21" },
      { Name: "EJERCICIO DEL SUFRAGIO VOTANTE", Id: "22" },
      { Name: "ESTUDIOS PERMANENTES", Id: "23" },
      { Name: "EVENTOS DE CAPACITACIÓN EXTERNA", Id: "24" },
      { Name: "MATRIMONIO DEL FUNCIONARIO", Id: "25" },
      { Name: "ASUNTO DE OTRA CLASIFICACIÓN", Id: "26" },
      { Name: "ASUNTO DE OTRA CLASIFICACIÓN", Id: "27" },
      { Name: "ASUNTO DE OTRA CLASIFICACIÓN", Id: "28" },
    ];
    $scope.crudGrid.estado = [
      { Name: "", Id: "" },
      { Name: "EN REVISION", Id: "P" },
      { Name: "AUTORIZADO", Id: "A" },
      { Name: "NO AUTORIZADO", Id: "R" },
    ];

    $http({
      method: "get",
      url: "json/ausentismo/ubicacion.json",
    }).then((response) => {
      $scope.dataUbicacion = response.data;
    });

    $scope.autorefresh = true;

    function estado(estado) {
      var status;
      switch (estado) {
        case "P":
          status = "EN REVISION";
          break;
        case "A":
          status = "AUTORIZADO";
          break;
        case "R":
          status = "NO AUTORIZADO";
          break;
        default:
          status = " ";
      }
      return status;
    }

    function tipopermiso(tp) {
      var permiso_;
      switch (tp) {
        case "18":
          permiso_ = "SERVICIOS MÉDICOS";
          break;
        case "19":
          permiso_ = "DILIGENCIAS PERSONALES";
          break;
        case "20":
          permiso_ = "CALAMIDAD DOMÉSTICA";
          break;
        case "21":
          permiso_ = "EJERCICIO DEL SUFRAGIO JURADO";
          break;
        case "22":
          permiso_ = "EJERCICIO DEL SUFRAGIO VOTANTE";
          break;
        case "23":
          permiso_ = "ESTUDIOS PERMANENTES";
          break;
        case "24":
          permiso_ = "EVENTOS DE CAPACITACIÓN EXTERNA";
          break;
        case "25":
          permiso_ = "MATRIMONIO DEL FUNCIONARIO";
          break;
        case "26":
          permiso_ = "ASUNTO DE OTRA CLASIFICACIÓN";
          break;
        default:
          permiso_ = "Permiso";
      }
      return permiso_;
    }

    $http({
      method: "get",
      url: "php/obtenersession.php",
    }).then(
      (res) => {
        //$scope.cedula = res.data.cedula;
        // $scope.cedula = sessionStorage.getItem('cedula');
        ausentismoHttp.obtenerjefe(res.data.cedula).then((resAu) => {
          if (resAu === "S") {
            document.querySelector("#gestionBoton").removeAttribute("hidden");

            setTimeout(function () {
              $(function () {
                $("#jsGrid").jsGrid({
                  width: "100%",
                  filtering: true,
                  editing: true,
                  paging: true,
                  autoload: true,
                  selecting: true,
                  sorting: true,
                  pageIndex: 1,
                  pageSize: 6,
                  pageButtonCount: 15,
                  pagerFormat:
                    "Paginas: {first} {prev} {pages} {next} {last} {pageIndex} - {pageCount}",
                  pagePrevText: "<",
                  pageNextText: ">",
                  pageFirstText: "<<",
                  pageLastText: ">>",
                  pageNavigatorNextText: "...",
                  pageNavigatorPrevText: "...",
                  loadIndication: true,
                  loadIndicationDelay: 500,
                  loadMessage: "Por Favor Actualizar",
                  loadShading: true,
                  noDataContent: "No hay permisos",

                  controller: {
                    loadData: function (filter) {
                      var d = $.Deferred();
                      if (test == null) {
                        $http({
                          method: "GET",
                          url: "php/ausentismo/obtenerpermisos.php",
                          params: { emisor: $scope.Rol_Cedula },
                        }).then(function (response) {
                          console.log(response);
                          if (response.data == "null") {
                            d.resolve();
                            $scope.wa = null;
                          } else {
                            $scope.wa = "";
                            //se aplican los filtros a lo que responde el json
                            var a = response.data.Permisos; //JSON.parse(  '{"Permiso":['+response.data["0"]+']}');
                            var b = response.data.Datos["1"].validajefe;
                            var c = response.data.Datos["0"].jefeobservacion;
                            communication.Jefe = c;
                            if (b == "1") {
                              $scope.hab = false;
                            } else {
                              $scope.hab = true;
                            }
                            test = $.grep(a, function (client) {
                              if (a["0"] == null) {
                                return a;
                              } else {
                                return (
                                  client.Estado.indexOf(filter.Estado) > -1 ||
                                  !filter.Estado
                                );
                              }
                            });
                            d.resolve(test);
                            $scope.jsoninit = test;
                          }
                        });
                      } else {
                        if ($scope.wa == null) {
                          d.resolve();
                        } else {
                          test = $.grep($scope.jsoninit, function (client) {
                            return (
                              (!filter.Radicado ||
                                client.Radicado.indexOf(filter.Radicado) >
                                -1) &&
                              (!filter.Nombre.toUpperCase() ||
                                client.Nombre.indexOf(
                                  filter.Nombre.toUpperCase()
                                ) > -1) &&
                              (!filter.Identificacion ||
                                client.Identificacion.indexOf(
                                  filter.Identificacion
                                ) > -1) &&
                              (!filter.TipodePermiso ||
                                client.TipodePermiso ===
                                filter.TipodePermiso) &&
                              (!filter.Departamento ||
                                client.Departamento === filter.Departamento) &&
                              (!filter.NombreMunicipio.toUpperCase() ||
                                client.NombreMunicipio.indexOf(
                                  filter.NombreMunicipio.toUpperCase()
                                ) > -1) &&
                              (!filter.FechaInicio ||
                                client.FechaInicio.indexOf(filter.FechaInicio) >
                                -1) &&
                              (!filter.FechaFin ||
                                client.FechaFin.indexOf(filter.FechaFin) >
                                -1) &&
                              (!filter.Adjunto ||
                                client.Adjunto.indexOf(filter.Adjunto) > -1) &&
                              (!filter.Estado ||
                                client.Estado === filter.Estado) &&
                              (!filter.Observaciones ||
                                client.Observaciones.indexOf(
                                  filter.Observaciones
                                ) > -1)
                            );
                          });
                          d.resolve(test);
                        }
                      }
                      return d.promise();
                    },
                    updateItem: function (item) {
                      var $row = $("#grid").jsGrid("rowByItem", item);
                      var d = $.Deferred();
                      if (item.Municipio == "0") {
                        var mun = 1;
                      } else if (Number(item.Municipio < 10000)) {
                        var mun = item.Municipio.substr(1, 4);
                      } else {
                        var mun = item.Municipio;
                      }
                      var estatus = estado(item.Estado);
                      var permiso = tipopermiso(item.TipodePermiso);
                      if (communication.rr == undefined) {
                        $scope.rr = item.FechaFin;
                      } else {
                        $scope.rr = communication.rr;
                      }
                      if ($scope.rr == undefined) {
                        $scope.rr = item.FechaFin;
                      }
                      if ($scope.rr.length == undefined) {
                        ($scope.anofin = $scope.rr.getFullYear()),
                          ($scope.mesfin = $scope.rr.getMonth() + 1),
                          ($scope.diafin = $scope.rr.getDate()), //Nu
                          ($scope.horafin = $scope.rr.getHours()), //N
                          ($scope.minutofin = $scope.rr.getMinutes()),
                          ($scope.segundofin = $scope.rr.getSeconds()),
                          ($scope.fechacompleta =
                            $scope.diafin +
                            "/" +
                            $scope.mesfin +
                            "/" +
                            $scope.anofin +
                            " " +
                            $scope.horafin +
                            ":" +
                            $scope.minutofin +
                            ":" +
                            "00");
                        if (communication.observacion == undefined) {
                          $scope.descrip =
                            " " +
                            permiso +
                            " - " +
                            estatus +
                            " finalizando " +
                            $scope.fechacompleta;
                        } else {
                          $scope.descrip =
                            " " +
                            permiso +
                            " - " +
                            estatus +
                            " finalizando " +
                            $scope.fechacompleta +
                            " - " +
                            communication.observacion;
                        }
                      } else {
                        $scope.anofin = Number($scope.rr.substr(6, 4));
                        $scope.mesfin = Number($scope.rr.substr(3, 2));
                        $scope.diafin = Number($scope.rr.substr(0, 2));
                        $scope.horafin = Number($scope.rr.substr(11, 2));
                        $scope.minutofin = Number($scope.rr.substr(14, 2));
                        $scope.segundofin = Number($scope.rr.substr(16, 2));
                        if (communication.observacion == undefined) {
                          $scope.descrip =
                            " " +
                            permiso +
                            " - " +
                            estatus +
                            " finalizando el " +
                            item.FechaFin;
                        } else {
                          $scope.descrip =
                            " " +
                            permiso +
                            " - " +
                            estatus +
                            " finalizando el " +
                            item.FechaFin +
                            " - " +
                            communication.observacion;
                        }
                      }
                      $http({
                        method: "GET",
                        url: "php/ausentismo/actualizarpermisos.php",
                        params: {
                          radicado: item.Radicado,
                          ubicacion: mun,
                          autoriza: $scope.Rol_Cedula,
                          solicitante: item.Identificacion,
                          problema: $scope.descrip.toUpperCase(),
                          estado: item.Estado.toUpperCase(),
                          fechaterminacion: $scope.rr,
                        },
                      }).then(
                        function successCallback(response) {
                          d.resolve();
                          if ((response.data = "1")) {
                            notification.getNotification(
                              "success",
                              "Permiso Actualizado!",
                              "Notificacion"
                            );
                          } else {
                            notification.getNotification(
                              "error",
                              "Error al actualizar el permiso",
                              "Notificacion"
                            );
                          }
                        },
                        function errorCallback(response) {
                          notification.getNotification(
                            "error",
                            "Error al actualizar el permiso",
                            "Notificacion"
                          );
                        }
                      );
                      communication.observacion = undefined;
                      communication.rr = undefined;
                      $scope.rr = undefined;
                      document.getElementById("test").addEventListener(
                        "click",
                        function () {
                          test = null;
                          $("#jsGrid").jsGrid();
                        },
                        false
                      );
                      return d.promise();
                    },
                  },
                  // 
                  fields: [
                    {
                      name: "Radicado",
                      title: "#Rad",
                      type: "number",
                      editing: false,
                      align: "center",
                      width: 60,
                    },
                    {
                      name: "Nombre",
                      editing: false,
                      type: "text",
                      align: "center",
                    },
                    {
                      name: "Identificacion",
                      title: "Cedula",
                      type: "number",
                      editing: false,
                      align: "center",
                      width: 70,
                    },
                    {
                      name: "TipodePermiso",
                      title: "Permiso",
                      editing: false,
                      type: "select",
                      items: $scope.crudGrid.tipopermiso,
                      valueField: "Id",
                      textField: "Name",
                    },
                    {
                      name: "Departamento",
                      title: "Seccional",
                      type: "select",
                      editing: false,
                      items: $scope.crudGrid.departamentos,
                      valueField: "Id",
                      textField: "Name",
                      width: 70,
                    },
                    {
                      name: "NombreMunicipio",
                      type: "text",
                      editing: false,
                      align:
                        "center" /*items: $scope.crudGrid.municipios, valueField: "Id", textField: "Name"*/,
                    },
                    {
                      name: "FechaInicio",
                      title: "Comienzo",
                      editing: false,
                      type: "text",
                      align: "center",
                      width: 70,
                    },
                    {
                      name: "FechaFin",
                      title: "Terminacion",
                      editing: false,
                      selecting: false,
                      type: "date",
                      align: "center",
                      width: 130,
                      itemTemplate: function (value, item) {
                        if ($scope.hab == false) {
                          $scope.rr = item.FechaFin;
                          return item.FechaFin;
                        } else {
                          var $fecha = $("<p>")
                            .text(item.FechaFin)
                            .append(
                              $("<i>")
                                .addClass("icon-stopwatch")
                                .css("cursor", "pointer")
                                .on("click", function () {
                                  var id = item.Radicado;
                                  communication.fecha = item.FechaFin;
                                  communication.id = id;
                                  ngDialog.open({
                                    template: "views/ausentismo/hora.html",
                                    controller: "horacontroller",
                                    controllerAs: "spctrl",
                                    scope: $scope,
                                  });
                                })
                            );
                          return $("<div>").append($fecha);
                        }
                      },
                    },
                    {
                      name: "Adjunto",
                      filtering: false,
                      selecting: false,
                      editing: false,
                      type: "text",
                      align: "center",
                      width: 60,
                      itemTemplate: function (value, item) {
                        if (item.TipodePermiso == "23") {
                          var $horario = $("<i>")
                            .addClass("icon-calendar")
                            .css("cursor", "pointer")
                            .on("click", function () {
                              communication.Radicado = item.Radicado;
                              communication.Ubicacion = item.Ubicacion_acas;
                              if (communication.Ubicacion == "0") {
                                communication.Ubicacion = 1;
                              }
                              ngDialog.open({
                                template: "views/ausentismo/soportes.html",
                                controller: "soportecontroller",
                                controllerAs: "spctrl",
                                scope: $scope,
                              });
                              return item.Radicado;
                            });
                          return $("<div>").append($horario);
                        } else if (
                          item.TipodePermiso == "21" ||
                          item.TipodePermiso == "22"
                        ) {
                          var $adjunto = $("<a>")
                            .text("ver")
                            .css("cursor", "pointer")
                            .on("click", function () {
                              communication.Radicado = item.Radicado;
                              communication.Ubicacion = item.Ubicacion_acas;
                              if (communication.Ubicacion == "0") {
                                communication.Ubicacion = 1;
                              }
                              ngDialog.open({
                                template: "views/ausentismo/soportes.html",
                                controller: "soportecontroller",
                                controllerAs: "spctrl",
                                scope: $scope,
                              });
                              return item.Radicado;
                            });
                          return $("<div>").append($adjunto);
                        } else {
                          return $("<a>")
                            .text("ver")
                            .css({ cursor: "not-allowed", color: "gray" });
                        }
                      },
                    },
                    {
                      name: "Estado",
                      type: "select",
                      editing: true,
                      items: $scope.crudGrid.estado,
                      valueField: "Id",
                      textField: "Name",
                    },
                    {
                      name: "Observaciones",
                      title: 'Detalles',
                      type: "text",
                      width: 50,
                      editing: false,
                      itemTemplate: function (value, item) {
                        const detalle = $("<i>")
                          .addClass("icon-doc-text-inv")
                          .css("cursor", "pointer")
                          .on("click", function () {
                            alert(item.Observaciones);
                          });
                        return $("<div>").append(detalle);
                      },
                    },
                    { type: "control", editButton: true, deleteButton: false },
                  ],
                });
              });
            }, 1500);
          }
        });
      },
      (err) => { }
    );

    // $scope.archivopermisopersonal = [];
    $scope.vistas = null;
    $scope.subtitulo = "";
    $scope.tipoPersonal = "";
    $scope.tiposPersonal = [];
    $scope.subtipo = "";
    $scope.tiposPermiso = null;
    $scope.listaDiagnosticos = null;
    $scope.sinResultados = false;
    $scope.sinResultadosLugar = false;
    $scope.submotivoDeshabilitado = null;
    $scope.subtipoDeshabilitado = null;

    $scope.subtiposLaboral = null;

    $scope.fechainicio = null;

    $scope.lugares = null;
    $scope.lugar = null;

    $scope.chequearE = (event) => {
      if (
        event.keyCode === 69 ||
        event.keyCode === 189 ||
        event.keyCode === 109 ||
        event.keyCode === 107 ||
        event.keyCode === 188 ||
        event.keyCode === 190 ||
        event.keyCode === 110
      )
        event.preventDefault();
    };

    $scope.limpiarFormularioIncapacidad = function () {
      $scope.diagnosticoSeleccionado = null;
    };

    $scope.limpiarFormularioLaboral = function () {
      $scope.submotivoDeshabilitado = false;
      $scope.lugar = null;
    };

    $scope.limpiarFormularioPersonal = function () {
      $scope.subtipos = null;
    };

    $scope.limpiarFormularios = function () {
      $scope.limpiarFormularioIncapacidad();
      $scope.limpiarFormularioLaboral();
      $scope.limpiarFormularioPersonal();
    };

    $scope.inicializarFormularioLaboral = function () {
      $scope.tipol = null;
    };

    $scope.cargarSubtiposLaboral = function (idTipo) {
      ausentismoHttp.obtenerSubtipos(idTipo).then($scope.verSubtiposPersonal);
    };

    $scope.verSubtiposPersonal = function (response) {
      $scope.subtiposLaboral = response.data;
    };

    $scope.mostrarPermisos = (response) => {
      $scope.listaPermisos = response;
    };

    $scope.validarFechaInicioIncapacidad = () => {
      document.querySelector("#fechaInicioInput").checkValidity();
    };

    $scope.cambiarVista = function (vista = null) {
      $scope.vistas = vista;
      switch (vista) {
        case 1:
          $scope.subtitulo = "POR INCAPACIDAD";
          $scope
            .loadJS("https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js")
            .then(() => {
              document
                .querySelector("#fechaInicioInput")
                .setAttribute("max", moment().format("YYYY-MM-DD"));
              document
                .querySelector("#fechaInicioInput")
                .setAttribute(
                  "min",
                  moment().subtract(3, "days").format("YYYY-MM-DD")
                );
            });
          ausentismoHttp
            .obtenerTipos($scope.obtenerIdPorNombre("INCAPACIDAD"))
            .then($scope.verTiposIncapacidad);
          break;
        case 2:
          $scope.subtitulo = " LABORAL";
          $scope
            .loadJS("https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js")
            .then(() => {
              const fechaInicioPermisoLaboralInput = document.querySelector(
                "#fechaInicioPermisoLaboral"
              );
              fechaInicioPermisoLaboralInput.setAttribute(
                "min",
                moment().format("YYYY-MM-DD")
              );
              // fechaInicioPermisoLaboralInput.setAttribute('min', moment().subtract(5, 'days').format('YYYY-MM-DD'));

              fechaInicioPermisoLaboralInput.addEventListener("change", () => {
                const fechaFinPermisoLaboralInput = document.querySelector(
                  "#fechaFinPermisoLaboral"
                );
                if (fechaInicioPermisoLaboralInput.value === "") {
                  fechaFinPermisoLaboralInput.value = "";
                }
                fechaFinPermisoLaboralInput.setAttribute(
                  "min",
                  fechaInicioPermisoLaboralInput.value
                );
              });
            });

          setTimeout(() => {
            $(".timepicker").timepicker({
              timeFormat: "HH:mm",
              interval: 30,
              minTime: "07:00",
              maxTime: "17:00",
              defaultTime: "07:00",
              startTime: "07:00",
              dynamic: false,
              dropdown: true,
              scrollbar: true,
            });
          });

          ausentismoHttp
            .obtenerTipos($scope.obtenerIdPorNombre("LABORAL"))
            .then($scope.verTipoPermiso);
          $scope.inicializarFormularioLaboral();
          break;
        case 3:
          $scope.subtitulo = " PERSONAL";
          $scope
            .loadJS("https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js")
            .then(() => {
              const fechaInicioPermisoPersonalInput = document.querySelector(
                "#fechaInicioPermisoPersonal"
              );

              fechaInicioPermisoPersonalInput.setAttribute(
                "min",
                moment().add(1, "d").format("YYYY-MM-DD")
              );

              const tipoPermisoPersonalSelect = document.querySelector(
                "#tipoPermisoPersonalSelect"
              );

              tipoPermisoPersonalSelect.addEventListener("change", () => {
                fechaInicioPermisoPersonalInput.value = "";
                if (
                  tipoPermisoPersonalSelect.value === "20" ||
                  tipoPermisoPersonalSelect.value === "26"
                ) {
                  fechaInicioPermisoPersonalInput.setAttribute(
                    "min",
                    moment().format("YYYY-MM-DD")
                  );
                } else {
                  fechaInicioPermisoPersonalInput.setAttribute(
                    "min",
                    moment().add(1, "d").format("YYYY-MM-DD")
                  );
                }
              });
            });

          setTimeout(() => {
            $(".timepicker").timepicker({
              timeFormat: "HH:mm",
              interval: 30,
              minTime: "07:00",
              maxTime: "17:00",
              defaultTime: "07:00",
              startTime: "07:00",
              dynamic: false,
              dropdown: true,
              scrollbar: true,
            });
          }, 100);

          ausentismoHttp
            .obtenerTipos($scope.obtenerIdPorNombre("PERSONAL"))
            .then($scope.verTipoPermisop);
          break;
        case 4:
          $scope.subtitulo = " HISTORICO DE PERMISOS";
          ausentismoHttp.obtenerHistorico($scope.Rol_Cedula).then((res) => {
            $scope.mostrarPermisos(res);
          });
          break;
        case 5:
          setTimeout(() => {
            document.getElementById("test").addEventListener(
              "click",
              function () {
                $(function () {
                  $("#jsGrid").jsGrid({
                    width: "100%",
                    filtering: true,
                    editing: true,
                    paging: true,
                    autoload: true,
                    selecting: true,
                    sorting: true,
                    pageIndex: 1,
                    pageSize: 6,
                    pageButtonCount: 15,
                    pagerFormat:
                      "Paginas: {first} {prev} {pages} {next} {last} {pageIndex} - {pageCount}",
                    pagePrevText: "<",
                    pageNextText: ">",
                    pageFirstText: "<<",
                    pageLastText: ">>",
                    pageNavigatorNextText: "...",
                    pageNavigatorPrevText: "...",
                    loadIndication: true,
                    loadIndicationDelay: 500,
                    loadMessage: "Por Favor Actualizar",
                    loadShading: true,
                    noDataContent: "No hay permisos",

                    controller: {
                      loadData: function (filter) {
                        var d = $.Deferred();
                        if (test == null) {
                          $http({
                            method: "GET",
                            url: "php/ausentismo/obtenerpermisos.php",
                            params: { emisor: $scope.Rol_Cedula },
                          }).then(function (response) {
                            if (response.data == "null") {
                              d.resolve();
                              $scope.wa = null;
                            } else {
                              $scope.wa = "";
                              //se aplican los filtros a lo que responde el json
                              var a = response.data.Permisos; //JSON.parse(  '{"Permiso":['+response.data["0"]+']}');
                              var b = response.data.Datos["1"].validajefe;
                              var c = response.data.Datos["0"].jefeobservacion;
                              communication.Jefe = c;
                              if (b == "1") {
                                $scope.hab = false;
                              } else {
                                $scope.hab = true;
                              }
                              test = $.grep(a, function (client) {
                                if (a["0"] == null) {
                                  return a;
                                } else {
                                  return (
                                    client.Estado.indexOf(filter.Estado) > -1 ||
                                    !filter.Estado
                                  );
                                }
                              });
                              d.resolve(test);
                              $scope.jsoninit = test;
                            }
                          });
                        } else {
                          if ($scope.wa == null) {
                            d.resolve();
                          } else {
                            test = $.grep($scope.jsoninit, function (client) {
                              return (
                                (!filter.Radicado ||
                                  client.Radicado.indexOf(filter.Radicado) >
                                  -1) &&
                                (!filter.Nombre.toUpperCase() ||
                                  client.Nombre.indexOf(
                                    filter.Nombre.toUpperCase()
                                  ) > -1) &&
                                (!filter.Identificacion ||
                                  client.Identificacion.indexOf(
                                    filter.Identificacion
                                  ) > -1) &&
                                (!filter.TipodePermiso ||
                                  client.TipodePermiso ===
                                  filter.TipodePermiso) &&
                                (!filter.Departamento ||
                                  client.Departamento ===
                                  filter.Departamento) &&
                                (!filter.NombreMunicipio.toUpperCase() ||
                                  client.NombreMunicipio.indexOf(
                                    filter.NombreMunicipio.toUpperCase()
                                  ) > -1) &&
                                (!filter.FechaInicio ||
                                  client.FechaInicio.indexOf(
                                    filter.FechaInicio
                                  ) > -1) &&
                                (!filter.FechaFin ||
                                  client.FechaFin.indexOf(filter.FechaFin) >
                                  -1) &&
                                (!filter.Adjunto ||
                                  client.Adjunto.indexOf(filter.Adjunto) >
                                  -1) &&
                                (!filter.Estado ||
                                  client.Estado === filter.Estado) &&
                                (!filter.Observaciones ||
                                  client.Observaciones.indexOf(
                                    filter.Observaciones
                                  ) > -1)
                              );
                            });
                            d.resolve(test);
                          }
                        }
                        return d.promise();
                      },
                      updateItem: function (item) {
                        var $row = $("#grid").jsGrid("rowByItem", item);
                        var d = $.Deferred();
                        if (item.Municipio == "0") {
                          var mun = 1;
                        } else if (Number(item.Municipio < 10000)) {
                          var mun = item.Municipio.substr(1, 4);
                        } else {
                          var mun = item.Municipio;
                        }
                        var estatus = estado(item.Estado);
                        var permiso = tipopermiso(item.TipodePermiso);
                        if (communication.rr == undefined) {
                          $scope.rr = item.FechaFin;
                        } else {
                          $scope.rr = communication.rr;
                        }
                        if ($scope.rr == undefined) {
                          $scope.rr = item.FechaFin;
                        }
                        if ($scope.rr.length == undefined) {
                          ($scope.anofin = $scope.rr.getFullYear()),
                            ($scope.mesfin = $scope.rr.getMonth() + 1),
                            ($scope.diafin = $scope.rr.getDate()), //Nu
                            ($scope.horafin = $scope.rr.getHours()), //N
                            ($scope.minutofin = $scope.rr.getMinutes()),
                            ($scope.segundofin = $scope.rr.getSeconds()),
                            ($scope.fechacompleta =
                              $scope.diafin +
                              "/" +
                              $scope.mesfin +
                              "/" +
                              $scope.anofin +
                              " " +
                              $scope.horafin +
                              ":" +
                              $scope.minutofin +
                              ":" +
                              "00");
                          if (communication.observacion == undefined) {
                            $scope.descrip =
                              " " +
                              permiso +
                              " - " +
                              estatus +
                              " finalizando " +
                              $scope.fechacompleta;
                          } else {
                            $scope.descrip =
                              " " +
                              permiso +
                              " - " +
                              estatus +
                              " finalizando " +
                              $scope.fechacompleta +
                              " - " +
                              communication.observacion;
                          }
                        } else {
                          $scope.anofin = Number($scope.rr.substr(6, 4));
                          $scope.mesfin = Number($scope.rr.substr(3, 2));
                          $scope.diafin = Number($scope.rr.substr(0, 2));
                          $scope.horafin = Number($scope.rr.substr(11, 2));
                          $scope.minutofin = Number($scope.rr.substr(14, 2));
                          $scope.segundofin = Number($scope.rr.substr(16, 2));
                          if (communication.observacion == undefined) {
                            $scope.descrip =
                              " " +
                              permiso +
                              " - " +
                              estatus +
                              " finalizando el " +
                              item.FechaFin;
                          } else {
                            $scope.descrip =
                              " " +
                              permiso +
                              " - " +
                              estatus +
                              " finalizando el " +
                              item.FechaFin +
                              " - " +
                              communication.observacion;
                          }
                        }
                        $http({
                          method: "GET",
                          url: "php/ausentismo/actualizarpermisos.php",
                          params: {
                            radicado: item.Radicado,
                            ubicacion: mun,
                            autoriza: $scope.Rol_Cedula,
                            solicitante: item.Identificacion,
                            problema: $scope.descrip.toUpperCase(),
                            estado: item.Estado.toUpperCase(),
                            fechaterminacion: $scope.rr,
                          },
                        }).then(
                          function successCallback(response) {
                            console.log(response);
                            d.resolve();
                            if ((response.data = "1")) {
                              notification.getNotification(
                                "success",
                                "Permiso Actualizado!",
                                "Notificacion"
                              );
                            } else {
                              notification.getNotification(
                                "error",
                                "Error al actualizar el permiso",
                                "Notificacion"
                              );
                            }
                          },
                          function errorCallback(response) {
                            notification.getNotification(
                              "error",
                              "Error al actualizar el permiso",
                              "Notificacion"
                            );
                          }
                        );
                        communication.observacion = undefined;
                        communication.rr = undefined;
                        $scope.rr = undefined;
                        document.getElementById("test").addEventListener(
                          "click",
                          function () {
                            test = null;
                            $("#jsGrid").jsGrid();
                          },
                          false
                        );
                        return d.promise();
                      },
                    },
                    fields: [
                      {
                        name: "Radicado",
                        title: "#Rad",
                        type: "number",
                        editing: false,
                        align: "center",
                        width: 60,
                      },
                      {
                        name: "Nombre",
                        editing: false,
                        type: "text",
                        align: "center",
                      },
                      {
                        name: "Identificacion",
                        title: "Cedula",
                        type: "number",
                        editing: false,
                        align: "center",
                        width: 70,
                      },
                      {
                        name: "TipodePermiso",
                        title: "Permiso",
                        editing: false,
                        type: "select",
                        items: $scope.crudGrid.tipopermiso,
                        valueField: "Id",
                        textField: "Name",
                      },
                      {
                        name: "Departamento",
                        title: "Seccional",
                        type: "select",
                        editing: false,
                        items: $scope.crudGrid.departamentos,
                        valueField: "Id",
                        textField: "Name",
                        width: 70,
                      },
                      {
                        name: "NombreMunicipio",
                        type: "text",
                        editing: false,
                        align:
                          "center" /*items: $scope.crudGrid.municipios, valueField: "Id", textField: "Name"*/,
                      },
                      {
                        name: "FechaInicio",
                        title: "Comienzo",
                        editing: false,
                        type: "text",
                        align: "center",
                        width: 70,
                      },
                      {
                        name: "FechaFin",
                        title: "Terminacion",
                        editing: true,
                        selecting: true,
                        type: "date",
                        align: "center",
                        width: 130,
                        itemTemplate: function (value, item) {
                          if ($scope.hab == false) {
                            $scope.rr = item.FechaFin;
                            return item.FechaFin;
                          } else {
                            var $fecha = $("<p>")
                              .text(item.FechaFin)
                              .append(
                                $("<i>")
                                  .addClass("icon-stopwatch")
                                  .css("cursor", "pointer")
                                  .on("click", function () {
                                    var id = item.Radicado;
                                    communication.fecha = item.FechaFin;
                                    communication.id = id;
                                    ngDialog.open({
                                      template: "views/ausentismo/hora.html",
                                      controller: "horacontroller",
                                      controllerAs: "spctrl",
                                      scope: $scope,
                                    });
                                  })
                              );
                            return $("<div>").append($fecha);
                          }
                        },
                      },
                      {
                        name: "Adjunto",
                        filtering: false,
                        selecting: false,
                        editing: false,
                        type: "text",
                        align: "center",
                        width: 60,
                        itemTemplate: function (value, item) {
                          if (item.TipodePermiso == "23") {
                            var $horario = $("<i>")
                              .addClass("icon-calendar")
                              .css("cursor", "pointer")
                              .on("click", function () {
                                communication.Radicado = item.Radicado;
                                communication.Ubicacion = item.Ubicacion_acas;
                                communication.Ruta = item.Ruta;
                                if (communication.Ubicacion == "0") {
                                  communication.Ubicacion = 1;
                                }
                                ngDialog.open({
                                  template: "views/ausentismo/soportes.html",
                                  controller: "soportecontroller",
                                  controllerAs: "spctrl",
                                  scope: $scope,
                                });
                                return item.Radicado;
                              });
                            return $("<div>").append($horario);
                          } else if (
                            item.TipodePermiso == "21" ||
                            item.TipodePermiso == "22"
                          ) {
                            var $adjunto = $("<a>")
                              .text("ver")
                              .css("cursor", "pointer")
                              .on("click", function () {
                                communication.Radicado = item.Radicado;
                                communication.Ubicacion = item.Ubicacion_acas;
                                communication.Ruta = item.Ruta;
                                if (communication.Ubicacion == "0") {
                                  communication.Ubicacion = 1;
                                }
                                ngDialog.open({
                                  template: "views/ausentismo/soportes.html",
                                  controller: "soportecontroller",
                                  controllerAs: "spctrl",
                                  scope: $scope,
                                });
                                return item.Radicado;
                              });
                            return $("<div>").append($adjunto);
                          } else {
                            return $("<a>")
                              .text("ver")
                              .css({ cursor: "not-allowed", color: "gray" });
                          }
                        },
                      },
                      {
                        name: "Estado",
                        type: "select",
                        editing: true,
                        items: $scope.crudGrid.estado,
                        valueField: "Id",
                        textField: "Name",
                      },
                      {
                        name: "Observaciones",
                        title: "Notas",
                        filtering: false,
                        editing: false,
                        type: "text",
                        align: "center",
                        width: 50,
                        itemTemplate: function (value, item) {
                          var $observacion = $("<i>")
                            .addClass("icon-doc-text-inv")
                            .css("cursor", "pointer")
                            .on("click", function () {
                              communication.Radicado = item.Radicado;
                              communication.Ubicacion = item.Municipio;
                              if (communication.Ubicacion == "0") {
                                communication.Ubicacion = 1;
                              }
                              ngDialog.open({
                                template: "views/ausentismo/observaciones.html",
                                controller: "observacionescontroller",
                                controllerAs: "spctrl",
                                scope: $scope,
                              });
                              return item.Observaciones;
                            });
                          return $("<div>").append($observacion);
                        },
                      },
                      {
                        type: "control",
                        editButton: true,
                        deleteButton: false,
                      },
                    ],
                  });
                });
              },
              false
            );
          }, 1000);
          break;

        default:
          $scope.subtitulo = "";
          $scope.historico = true;
          $scope.limpiarFormularios();
          break;
      }
    };

    $scope.abrirModal = function () {
      $("#modalDiagnostico").modal("open");
      document.querySelector("#diagnosticoSelectModal").focus();

      document.querySelector(".modal-overlay").addEventListener("click", () => {
        $scope.diagnostico = null;
        $scope.listaDiagnosticos = null;
        $scope.sinResultados = false;
      });
    };

    $scope.abrirModal2 = function () {
      $("#modalLugares").modal("open");
      document.querySelector("#lugarModalInput").focus();

      document.querySelector(".modal-overlay").addEventListener("click", () => {
        $scope.lugares = null;
        $scope.listaLugares = null;
        $scope.sinResultados = false;
      });
    };

    $scope.diagnosticoSeleccionado = null;

    $scope.seleccionarDiagnostico = function (diagnostico) {
      $scope.diagnosticoSeleccionado = diagnostico;
      $scope.cerrarModal();
    };

    $scope.seleccionarLugares = function (lugar) {
      $scope.lugar = lugar;
      $scope.cerrarModal2();
    };

    $scope.cerrarModal = function () {
      $("#modalDiagnostico").modal("close");
      $scope.diagnostico = null;
      $scope.listaDiagnosticos = null;
      $scope.sinResultados = false;
    };

    $scope.cerrarModal2 = function () {
      $("#modalLugares").modal("close");
      $scope.lugares = null;
      $scope.listaLugares = null;
      $scope.sinResultados = false;
    };

    $scope.buscarDiagnostico = function (consulta) {
      $scope.listaDiagnosticos = null;
      ausentismoHttp.obtenerDiagnostico(consulta).then((response) => {
        if (response.data[0].codigo === "0") {
          $scope.sinResultados = true;
        } else {
          $scope.listaDiagnosticos = response.data;
          $scope.sinResultados = false;
        }
      });
    };

    $scope.buscarLugares = function (consulta) {
      $scope.listaLugares = null;
      ausentismoHttp.obtenerLugares(consulta).then((response) => {
        if (response.data[0].codigo === "0") {
          $scope.sinResultadosLugar = true;
        } else {
          $scope.listaLugares = response.data;
          $scope.sinResultadosLugar = false;
        }
      });
    };

    $scope.obtenerIdPorNombre = function (nombre) {
      if ($scope.tiposPermiso === null) {
        return null;
      } else {
        let id = null;
        $scope.tiposPermiso.forEach((tipo) => {
          if (tipo.nombre === nombre) {
            id = tipo.id;
          }
        });
        return id;
      }
    };


    $scope.validararchivo2 = function () {
      $scope.inputFile1 = document.querySelector('#anexo2adjincapacidad');
      $scope.getBase64($scope.inputFile1.files[0]).then(function (result) {
        $scope.archivopermisoIncapacidad = result;
      });

    }

    $scope.generarIncapacidad = () => {
      if (document.querySelector("#motivoSelect").value === "") {
        swal("", "Debe seleccionar un tipo de incapacidad", "error");
        return;
      }
      if ($scope.diagnosticoSeleccionado === null) {
        swal("", "Debe seleccionar un diagnostico de la incapacidad", "error");
        return;
      }
      if (document.querySelector("#fechaInicioInput").value === "") {
        swal(
          "",
          "Debe de ingresar la fecha de inicio de la incapacidad",
          "error"
        );
        return;
      }

      if (document.querySelector("#diasIncapacidad").value === "") {
        swal(
          "",
          "Debe de ingresar la cantidad de dias de la incapacidad",
          "error"
        );
        return;
      } else {
        const diasIncapacidad = parseInt(
          document.querySelector("#diasIncapacidad").value
        );

        if (diasIncapacidad > 99) {
          swal(
            "",
            "La cantidad de dias ingresados sobrepasa el maximo disponible. (99 días)",
            "error"
          );
          return;
        }
      }

      if (
        document.querySelector("#observacionIncapacidadTextarea").value ===
        "" ||
        document.querySelector("#observacionIncapacidadTextarea").value.length <
        40
      ) {
        swal(
          "",
          "La observación no puede estar vacia y deb contener minimo 40 caracteres",
          "error"
        );
        return;
      }

      if (document.querySelector("#anexo2adjincapacidad").files.length === 0) {
        swal("", "Debe de ingresar un adjunto", "error");
        return;
      }

      const diasIncapacidad = parseInt(
        document.querySelector("#diasIncapacidad").value
      );
      const fechaInicioTokens = document
        .querySelector("#fechaInicioInput")
        .value.split("-");
      const fechaInicioValue = `${fechaInicioTokens[2]}-${fechaInicioTokens[1]}-${fechaInicioTokens[0]}`;
      const fechaInicio = new Date(
        document.querySelector("#fechaInicioInput").value
      );
      const fechaFin = new Date(fechaInicio);
      fechaFin.setDate(fechaInicio.getDate() + diasIncapacidad);
      const adjunto = new FormData();
      adjunto.append("archivo", document.querySelector("#anexo2adjincapacidad").files[0]);
      let tipo = null;

      const fechaFinValue = `${String(fechaFin.getUTCDate()).padStart(
        2,
        "0"
      )}-${String(fechaFin.getMonth() + 1).padStart(
        2,
        "0"
      )}-${fechaFin.getFullYear()}`;

      switch (document.querySelector("#motivoSelect").value) {
        case "27":
          tipo = "ENFERMEDAD GENERAL";
          break;
        case "28":
          tipo = "ACCIDENTE DE TRANSITO";
          break;
        case "29":
          tipo = "ACCIDENTE LABORAL";
          break;
      }

      const observacion = `TIPO: ${tipo}
DIAGNOSTICO: ${$scope.diagnosticoSeleccionado.codigo}
DIAS: ${parseInt(document.querySelector("#diasIncapacidad").value)}
OBSERVACION:
${document.querySelector("#observacionIncapacidadTextarea").value}
`;


      ausentismoHttp.subirArchivo(adjunto).then((response) => {
        console.log(response);
        $http({
          method: 'POST',
          url: "php/ausentismo/insertarpermiso.php",
          data: {
            function: 'insertarpermiso',
            datos: {
              ubicacion: $scope.Rol_Ubicacion,
              problema: observacion,
              motivo: document.querySelector("#motivoSelect").value,
              emisor: $scope.Rol_Cedula,
              fechainicio: fechaInicioValue + " 07:00",
              fechaterminacion: fechaFinValue + " 17:00",
              nombreadjunto: response.nombre,
              ruta: response.ruta,
              zdocumentopermiso: $scope.archivopermisoIncapacidad
            }
          }
        })
          // ausentismoHttp
          //   .insertarpermiso(
          //     $scope.Rol_Ubicacion,
          //     observacion,
          //     document.querySelector("#motivoSelect").value,
          //     $scope.Rol_Cedula,
          //     fechaInicioValue + " 07:00",
          //     fechaFinValue + " 17:00",
          //     response.nombre,
          //     response.ruta
          //   )
          .then((response) => {
            if (response.data[0]) {
              if (response.data[0].Respuesta === "2-Debe confirmar un jefe") {
                swal({
                  title: "No se pudo generar",
                  text: "No tiene un jefe inmediato asociado",
                  type: "warning",
                  confirmButtonText: "Asociar jefe",
                  showCancelButton: true,
                  cancelButtonText: "Cancelar solicitud",
                })
                  .then((result) => {
                    $("#modalJefe").modal("open");
                    $http({
                      method: "POST",
                      url: "php/ausentismo/obtenerjefes.php",
                      data: { function: "obtenerjefes" },
                    }).then(function (response) {
                      $scope.jefes = response.data;
                    });
                  })
                  .catch((err) => {
                    if (err === "cancel") {
                      $scope.cambiarVista();
                      $scope.$apply();
                    }
                  });
              } else if (
                response.data[0].Respuesta.includes(
                  "1-Solicitud generada con exito!"
                )
              ) {
                swal(
                  "Generacion correcta",
                  "Su solicitud ha sido generada exitosamente",
                  "success"
                );
                $scope.cambiarVista();
              }
            }
          });
      });
    };

    $scope.validararchivo1 = function () {
      $scope.inputFile1 = document.querySelector('#anexo2adjLaboral');
      $scope.getBase64($scope.inputFile1.files[0]).then(function (result) {
        $scope.archivopermisolaboral = result;
      });

    }

    $scope.generarPermisoLaboral = () => {
      if (document.querySelector("#motivoPermisoLaboralSelect").value === "") {
        swal("", "Debe de seleccionar un tipo de permiso laboral", "error");
        return;
      }
      if (
        document.querySelector("#motivoPermisoLaboralSelect").value === "0" &&
        (document.querySelector("#submotivoPermisoLaboralSelect").value ===
          "" ||
          typeof document.querySelector("#submotivoPermisoLaboralSelect")
            .value === "undefined")
      ) {
        swal("", "Debe de seleccionar un submotivo", "error");
        return;
      } else {
        if (
          document.querySelector("#motivoPermisoLaboralSelect").value === "0" &&
          document.querySelector("#submotivoPermisoLaboralSelect").value !==
          "" &&
          $scope.lugar === null
        ) {
          swal("", "Debe de ingresar el lugar de traslado", "error");
          return;
        }
      }

      if (document.querySelector("#fechaInicioPermisoLaboral").value === "") {
        swal("", "Debe de ingresar la fecha de inicio del permiso", "error");
        return;
      }

      if (document.querySelector("#fechaFinPermisoLaboral").value === "") {
        swal(
          "",
          "Debe de ingresar la fecha de finalización del permiso",
          "error"
        );
        return;
      } else {
        const fechaInicio =
          new Date(document.querySelector("#fechaInicioPermisoLaboral").value) /
          1;
        const fechaFin =
          new Date(document.querySelector("#fechaFinPermisoLaboral").value) / 1;

        if (fechaFin < fechaInicio) {
          swal(
            "",
            "La fecha de finalización debe de ser mayor a la de inicio",
            "error"
          );
          return;
        }
      }

      if (
        document.querySelector("#observacionLaboralTextarea").value === "" ||
        document.querySelector("#observacionLaboralTextarea").value.length < 40
      ) {
        swal(
          "",
          "La observación no puede estar vacia y debe tener minimo 40 caracteres",
          "error"
        );
        return;
      }

      const fechaInicioTokens = document
        .querySelector("#fechaInicioPermisoLaboral")
        .value.split("-");
      const fechaFinTokens = document
        .querySelector("#fechaFinPermisoLaboral")
        .value.split("-");
      const horaInicioPermisoLaboral = document.querySelector(
        "#horaInicioPermisoLaboral"
      ).value;
      const horaFinPermisoLaboral = document.querySelector(
        "#horaFinPermisoLaboral"
      ).value;


      $http({
        method: 'POST',
        url: "php/ausentismo/insertarpermiso.php",
        data: {
          function: 'insertarpermiso',
          datos: {
            ubicacion: $scope.Rol_Ubicacion,
            problema: document.querySelector("#observacionLaboralTextarea").value,
            motivo: document.querySelector("#motivoPermisoLaboralSelect").value,
            emisor: $scope.Rol_Cedula,
            fechainicio: fechaInicioTokens[2] +
              "-" +
              fechaInicioTokens[1] +
              "-" +
              fechaInicioTokens[0] +
              " " +
              horaInicioPermisoLaboral,
            fechaterminacion: fechaFinTokens[2] +
              "-" +
              fechaFinTokens[1] +
              "-" +
              fechaFinTokens[0] +
              " " +
              horaFinPermisoLaboral,
            nombreadjunto: '',
            ruta: '',
            zdocumentopermiso: $scope.archivopermisolaboral
          }
        }
      })
        // ausentismoHttp
        //   .insertarpermiso(
        //     $scope.Rol_Ubicacion,
        //     document.querySelector("#observacionLaboralTextarea").value,
        //     document.querySelector("#motivoPermisoLaboralSelect").value,
        //     $scope.Rol_Cedula,
        //     fechaInicioTokens[2] +
        //       "-" +
        //       fechaInicioTokens[1] +
        //       "-" +
        //       fechaInicioTokens[0] +
        //       " " +
        //       horaInicioPermisoLaboral,
        //     fechaFinTokens[2] +
        //       "-" +
        //       fechaFinTokens[1] +
        //       "-" +
        //       fechaFinTokens[0] +
        //       " " +
        //       horaFinPermisoLaboral,
        //     "",
        //     ""
        //   )
        .then((response) => {
          console.log(response);
          if (response.data[0]) {
            if (response.data[0].Respuesta === "2-Debe confirmar un jefe") {
              swal({
                title: "No se pudo generar",
                text: "No tiene un jefe inmediato asociado",
                type: "warning",
                confirmButtonText: "Asociar jefe",
                showCancelButton: true,
                cancelButtonText: "Cancelar solicitud",
              })
                .then((result) => {
                  console.log(result);
                  $("#modalJefe").modal("open");
                  $http({
                    method: "POST",
                    url: "php/ausentismo/obtenerjefes.php",
                    data: { function: "obtenerjefes" },
                  }).then(function (response) {
                    $scope.jefes = response.data;
                  });
                })
                .catch((err) => {
                  console.log(err);
                  if (err === "cancel") {
                    $scope.cambiarVista();
                    $scope.$apply();
                  }
                });
            } else if (
              response.data[0].Respuesta.includes("1-Solicitud generada con exito!")
            ) {
              swal("Generacion correcta", response.data[0].Respuesta, "success");
              $scope.cambiarVista();
              $scope.$apply();
            }
          }
          // if (response.code === 200) {
          //   swal("", "Su solicitud ha sido generada exitosamente", "success");
          //   $scope.cambiarVista();
          // }
        });

      // ausentismoHttp.generarPermiso({
      //   'v_pubicacion': sessionStorage.getItem('municipio') !== null ? sessionStorage.getItem('municipio') : '1',
      //   'v_pproblema': document.querySelector('#observacionLaboralTextarea').value,
      //   'v_pmotivo': document.querySelector('#motivoPermisoLaboralSelect').value,
      //   'v_psubmotivo': '',
      //   'v_pemisor': sessionStorage.getItem('cedula'),
      //   'v_pfechainicio': fechaInicioTokens[2] + '-' + fechaInicioTokens[1] + '-' + fechaInicioTokens[0],
      //   'v_pfechaterminacion': fechaFinTokens[2] + '-' + fechaFinTokens[1] + '-' + fechaFinTokens[0],
      //   'v_pnombrearchivo': '',
      //   'v_pruta': '',
      //   'v_pdiagnostico': '',
      //   'v_pdias_inc': '',
      //   'v_pseccional': $scope.lugar.seccional,
      //   'v_poficina': $scope.lugar.codigo
      // }).then(response => {
      //   if (response.code === 200) {
      //     swal("", "Su solicitud ha sido generada exitosamente", "success");
      //     $scope.cambiarVista();
      //   }
      // })
    };

    $scope.validararchivo = function () {
      $scope.inputFile = document.querySelector('#anexo2adj');
      $scope.getBase64($scope.inputFile.files[0]).then(function (result) {
        $scope.archivopermisopersonal = result;
      });

    }




    $scope.generarPermisoPersonal = () => {

      if (document.querySelector("#tipoPermisoPersonalSelect").value === "") {
        swal("", "Debe ingresar un tipo de permiso personal", "error");
        return;
      }

      if (
        (document.querySelector("#tipoPermisoPersonalSelect").value === "30" ||
          document.querySelector("#tipoPermisoPersonalSelect").value ===
          "25") &&
        document.querySelector("#subtipoPermisoPersonalSelect").value === ""
      ) {
        swal("", "Debe ingresar un subtipo de permiso personal", "error");
        return;
      }

      if (document.querySelector("#fechaInicioPermisoPersonal").value === "") {
        swal("", "Debe ingresar la fecha de inicio del permiso", "error");
        return;
      }

      if (document.querySelector("#fechaFinPermisoPersonal").value === "") {
        swal("", "Debe ingresar la fecha de finalización del permiso", "error");
        return;
      } else {
        const fechaInicioPermisoPersonal =
          new Date(
            document.querySelector("#fechaInicioPermisoPersonal").value
          ) / 1;
        const fechaFinPermisoPersonal =
          new Date(document.querySelector("#fechaFinPermisoPersonal").value) /
          1;

        if (fechaFinPermisoPersonal < fechaInicioPermisoPersonal) {
          swal(
            "",
            "Debe ingresar una fecha de finalización mayor a la de inicio",
            "error"
          );
          return;
        }
      }

      if (
        document.querySelector("#observacionPersonalTextarea").value === "" ||
        document.querySelector("#observacionPersonalTextarea").value.length < 40
      ) {
        swal(
          "",
          "La observación no puede estar vacia y debe tener minimo 40 caracteres",
          "error"
        );
        return;
      }

      const fechaInicioTokens = document
        .querySelector("#fechaInicioPermisoPersonal")
        .value.split("-");
      const fechaFinTokens = document
        .querySelector("#fechaFinPermisoPersonal")
        .value.split("-");
      const horaInicioPermisoPersonal = document.querySelector(
        "#horaInicioPermisoPersonal"
      ).value;
      const horaFinPermisoPersonal = document.querySelector(
        "#horaFinPermisoPersonal"
      ).value;

      if (document.querySelector("#tipoPermisoPersonalSelect").value == 25) {
        var motivo = document.querySelector("#subtipoPermisoPersonalSelect").value == 41 ? '22' : '21';
      }
      // (document.querySelector("#tipoPermisoPersonalSelect").value === "30" ||
      //     document.querySelector("#tipoPermisoPersonalSelect").value ===
      //     "25") &&
      //   document.querySelector("#subtipoPermisoPersonalSelect").value === ""


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
        url: "php/ausentismo/insertarpermiso.php",
        data: {
          function: 'insertarpermiso',
          datos: {
            ubicacion: $scope.Rol_Ubicacion,
            problema: document.querySelector("#observacionPersonalTextarea").value,
            motivo: motivo ? motivo : document.querySelector("#tipoPermisoPersonalSelect").value,
            emisor: $scope.Rol_Cedula,
            fechainicio: fechaInicioTokens[2] +
              "-" +
              fechaInicioTokens[1] +
              "-" +
              fechaInicioTokens[0] +
              " " +
              horaInicioPermisoPersonal,
            fechaterminacion: fechaFinTokens[2] +
              "-" +
              fechaFinTokens[1] +
              "-" +
              fechaFinTokens[0] +
              " " +
              horaFinPermisoPersonal,
            nombreadjunto: '',
            ruta: '',
            zdocumentopermiso: $scope.archivopermisopersonal
          }
        }
      })
        // ausentismoHttp
        //   .insertarpermiso(
        //     $scope.Rol_Ubicacion,
        //     document.querySelector("#observacionPersonalTextarea").value,
        //     document.querySelector("#tipoPermisoPersonalSelect").value,
        //     $scope.Rol_Cedula,
        //     fechaInicioTokens[2] +
        //       "-" +
        //       fechaInicioTokens[1] +
        //       "-" +
        //       fechaInicioTokens[0] +
        //       " " +
        //       horaInicioPermisoPersonal,
        //     fechaFinTokens[2] +
        //       "-" +
        //       fechaFinTokens[1] +
        //       "-" +
        //       fechaFinTokens[0] +
        //       " " +
        //       horaFinPermisoPersonal,
        //     "",
        //     "",
        //     $scope.archivopermisopersonal
        //   )
        .then((response) => {
          console.log(response);
          if (response.data[0]) {
            if (response.data[0].Respuesta === "2-Debe confirmar un jefe") {
              swal({
                title: "No se pudo generar",
                text: "No tiene un jefe inmediato asociado",
                type: "warning",
                confirmButtonText: "Asociar jefe",
                showCancelButton: true,
                cancelButtonText: "Cancelar solicitud",
              })
                .then((result) => {
                  console.log(result);
                  $("#modalJefe").modal("open");
                  $http({
                    method: "POST",
                    url: "php/ausentismo/obtenerjefes.php",
                    data: { function: "obtenerjefes" },
                  }).then(function (response) {
                    $scope.jefes = response.data;
                  });
                })
                .catch((err) => {
                  console.log(err);
                  if (err === "cancel") {
                    $scope.cambiarVista();
                    $scope.$apply();
                  }
                });
            } else if (
              response.data[0].Respuesta.includes("1-Solicitud generada con exito!")
            ) {
              swal("Generacion correcta", response.data[0].Respuesta, "success");
              $scope.cambiarVista();
              $scope.$apply();
            }
          }
        });
    };

    $scope.obtenerTiposPermisoT = function (response) {
      $scope.tiposPermiso = response.data;
    };

    $scope.cargarSubmotivos = function (id) { };

    const notificarHoras = (x) => {
      var mensaje = "";
      switch (x) {
        case "18":
          mensaje = "Este Permiso permite hasta 4 Horas";
          break;
        case "19":
          mensaje = "Este Permiso permite hasta 3 Horas";
          break;
        case "20":
          mensaje = "Este Permiso permite hasta 2 Dias";
          break;
        case "21":
          mensaje = "Este Permiso permite hasta 8 Horas";
          break;
        case "22":
          mensaje = "Este Permiso permite hasta 4 Horas";
          break;
        case "23":
          mensaje = "Puede solicitar la fecha y hora de terminacion";
          break;
        case "24":
          mensaje = "Puede solicitar la fecha y hora de terminacion";
          break;

        case "41":
          mensaje = "Este permiso permite media jornada laboral";
          break;

        case "42":
          mensaje = "Este permiso permite una jornada laboral";
          break;

        case "31":
          mensaje = "Este Permiso permite hasta 3 Dias";
          break;
        case "26":
          mensaje = "Puede solicitar la fecha y hora de terminacion";
          break;
        default:
          mensaje = "Puede solicitar la fecha y hora de terminacion";
          break;
      }
      return mensaje;
    };

    $scope.mostrarNotificaciones = (subtipo) => {
      notificarHoras(subtipo) !== "" ? alert(notificarHoras(subtipo)) : null;

      const ponerMismaFecha = () => {
        if (fechaInicioPermisoPersonal.value !== "") {
          const fechaFinPermisoPersonal = document.querySelector(
            "#fechaFinPermisoPersonal"
          );
          fechaFinPermisoPersonal.setAttribute("readonly", "");
          fechaFinPermisoPersonal.value = fechaInicioPermisoPersonal.value;
        } else {
          const fechaFinPermisoPersonal = document.querySelector(
            "#fechaFinPermisoPersonal"
          );
          fechaFinPermisoPersonal.removeAttribute("readonly");
        }
      };

      if (subtipo === "41" || subtipo === "42") {
        const fechaInicioPermisoPersonal = document.querySelector(
          "#fechaInicioPermisoPersonal"
        );
        fechaInicioPermisoPersonal.addEventListener("change", ponerMismaFecha);
      }
    };

    $scope.cargarSubtipos = function (id) {
      if (id === "30" || id === "25") {
        if (
          document
            .querySelector("#submotivoPersonalField")
            .classList.contains("ng-hide")
        ) {
          document
            .querySelector("#submotivoPersonalField")
            .classList.remove("ng-hide");
        }
      } else {
        document
          .querySelector("#submotivoPersonalField")
          .classList.add("ng-hide");
        const ponerMismaFecha = () => {
          if (fechaInicioPermisoPersonal.value !== "") {
            const fechaFinPermisoPersonal = document.querySelector(
              "#fechaFinPermisoPersonal"
            );
            fechaFinPermisoPersonal.setAttribute("readonly", "");
            fechaFinPermisoPersonal.value = fechaInicioPermisoPersonal.value;
          }
        };

        const fechaInicioPermisoPersonal = document.querySelector(
          "#fechaInicioPermisoPersonal"
        );
        fechaInicioPermisoPersonal.removeEventListener(
          "change",
          ponerMismaFecha
        );
        const fechaFinPermisoPersonal = document.querySelector(
          "#fechaFinPermisoPersonal"
        );
        fechaFinPermisoPersonal.removeAttribute("readonly");
        fechaInicioPermisoPersonal.value = "";
        fechaFinPermisoPersonal.value = "";
        setTimeout(() => {
          alert(notificarHoras(id));
        }, 500);
      }
      ausentismoHttp.obtenerSubtipos(id).then((response) => {
        $scope.subtipos = response.data;
        document.querySelector("#subtipoPermisoPersonalSelect").value = "1";
      });
    };

    $scope.showValue = function (subtipo) {
      console.log(subtipo);
    };

    $scope.chequearEnter = function (keyCode) {
      if (keyCode === 13) {
        $scope.buscarDiagnostico($scope.diagnostico);
      }
    };

    $scope.chequearEnterl = function (keyCode) {
      if (keyCode === 13) {
        $scope.buscarLugares($scope.lugares);
      }
    };

    // tipos de incapacidad
    $scope.tipo = "";
    $scope.tipos = null;
    $scope.verTiposIncapacidad = function (response) {
      $scope.tipos = response.data;
    };

    // tipos de traslados
    $scope.tipot = "";
    $scope.tipost = null;
    $scope.verTiposTraslado = function (response) {
      $scope.tipost = response.data;
    };

    // permisos laborales
    $scope.tipol = "";
    $scope.tiposl = null;
    $scope.verTipoPermiso = function (response) {
      $scope.tiposl = response.data;
    };

    $scope.cambioTipoLaboral = function (tipo) {
      $scope.tipoSeleccionado = tipo;
      switch (tipo) {
        case "28":
          if (String($scope.subtipoSeleccionado) === "1") {
            $scope.submotivoDeshabilitado = true;
          } else {
            $scope.submotivoDeshabilitado = false;
          }
          break;
        default:
          $scope.submotivoDeshabilitado = false;
          break;
      }
    };

    $scope.cambioSubtipoLaboral = function (subtipo) {
      console.log($scope.tipoSeleccionado);
      console.log(subtipo);
      $scope.subtipoSeleccionado = subtipo;
      switch ($scope.tipoSeleccionado) {
        case "28":
          if (String(subtipo) === "1") {
            $scope.submotivoDeshabilitado = true;
          } else {
            $scope.submotivoDeshabilitado = false;
          }
          break;
        default:
          $scope.submotivoDeshabilitado = false;
          break;
      }
    };

    // permisos Personales
    $scope.tipop = "";
    $scope.tiposp = null;
    $scope.verTipoPermisop = function (response) {
      $scope.tiposPersonal = response.data;
    };

    $scope.verSubtipo = function (x) {
      if (x === "3" || x === "5") {
        document.querySelector("#subtipo-select").removeAttribute("disabled");
      } else {
        document.querySelector("#subtipo-select").setAttribute("disabled", "");
      }

      ausentismoHttp.obtenerSubtipo(x).then(function (response) { });
    };

    $scope.cambiarUbicacionDepartamento = (departamento) => {
      console.log(departamento);
      $scope.dataUbicacionMunicipio = $scope.dataUbicacion.filter(
        (item) => String(item.id) === String(departamento)
      )[0].ciudades;
    };

    $scope.btndisabled = true;

    $scope.asignarjefe = function (data) {
      $("#" + data.cedula).removeClass("checkjefe");
      $(".checkjefe").prop("checked", false);
      if (document.getElementById(data.cedula).checked == true) {
        $scope.datosjefe = data;
        $scope.btndisabled = false;
      } else {
        $scope.cedulajefe = "";
        $scope.btndisabled = true;
      }
      $("#" + data.cedula).addClass("checkjefe");
    };

    $scope.guardarjefe = function () {
      if (document.getElementById($scope.datosjefe.cedula).checked == true) {
        $http({
          method: "POST",
          url: "php/ausentismo/logicajefes.php",
          data: {
            function: "guardarjefe",
            emisor: $scope.Rol_Cedula,
            jefe: $scope.datosjefe.cedula,
            tipo: "insert",
          },
        }).then(function (response) {
          $("#modalJefe").modal("hide");
        });
      } else {
        notification.getNotification(
          "warning",
          "Debe confirmar su jefe!",
          "Notificacion"
        );
      }
    };

    ausentismoHttp.obtenerTipoPermiso().then($scope.obtenerTiposPermisoT);

    $scope.verHistorico = function () {
      window.open('views/talentohumano/ausentismo/formatos/formato_historicopermisos.php?&cedula=' + $scope.Rol_Cedula);
    }

    $scope.atrasHist = function () {
      $scope.vistas = null;
      setTimeout(() => { $scope.$apply(); }, 500);
    }

  },
]);
