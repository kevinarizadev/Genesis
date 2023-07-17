'use strict';
angular.module('GenesisApp')
  .controller('datosempleadoscontroller', ['$scope', '$http', 'afiliacionHttp',
    function ($scope, $http, afiliacionHttp) {

      $scope.Inicio = function () {
        $scope.Tabs = 1;
        console.log($(window).width());
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100 && $(window).width() < 1300) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1300 && $(window).width() < 1500) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
        if ($(window).width() > 1500) {
          document.querySelector("#pantalla").style.zoom = 0.9;
        }
        document.querySelector("#content").style.backgroundColor = "white";
        $('.modal').modal();
        $('.tabs').tabs();
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        $scope.Proteccion_Datos = 1;
        $scope.Vista = 0;

        $scope.SysDay = new Date();
        $scope.Hoja1_Limpiar();
        $scope.Hoja2_Limpiar();
        $scope.Hoja3_Limpiar();
        $scope.Hoja4_Limpiar();
        $scope.Hoja5_Limpiar();
        $scope.ObtenerTabs();
        setTimeout(() => {
          $scope.$apply();
        }, 500);
        //////////////////////////////////////////////////////////
        $http({
          method: 'POST',
          url: "php/talentohumano/datosbasicos/Rdatosbasicos.php",
          data: { function: 'obtenerproteccion', tipo: 'consulta', id: $scope.Rol_Cedula }
        }).then(function (response) {
          $scope.Proteccion_Datos = 0;
          if (response.data == "1") {
            $scope.Proteccion_Datos = 1;
          }
        })
      }

      $scope.Guardar_Proteccion_Datos = function () {
        $http({
          method: 'POST',
          url: "php/talentohumano/datosbasicos/Rdatosbasicos.php",
          data: { function: 'obtenerproteccion', tipo: 'insert', id: $scope.Rol_Cedula }
        }).then(function (response) {
          $scope.Proteccion_Datos = 0;
          if (response.data == "1") {
            $scope.Proteccion_Datos = 1;
            swal(
              '¡Mensaje!',
              'Aprobacion confirmada',
              'success'
            ).catch(swal.noop);
          } else {
            swal(
              '¡Mensaje!',
              'No se ha confirmado tu aprobacion',
              'warning'
            ).catch(swal.noop);
          }
        })
      }

      $scope.Hoja1_Limpiar = function () {
        $scope.Hoja1 = {
          Status: 0,

          Pri_nombre: '',
          Seg_nombre: '',
          Pri_apellido: '',
          Seg_apellido: '',
          Nacimiento: '',
          Sexo: '',
          Gruposanguineo: '',
          Estadocivil: '',
          Peso: '',
          Estatura: '',
          Telefono: '',
          Celular: '',
          Departamento: '',
          Municipio: '',
          Direccion: '',
          Barrio: '',
          Email: '',
          Rethus: '',

          Nacimiento_Frmt: '',

        };

        $scope.Hoja1_Resp = null;
        //
        angular.forEach(document.querySelectorAll('#Hoja1 input'), function (i) {
          i.setAttribute("readonly", true);
        });
        angular.forEach(document.querySelectorAll('#Hoja1 select'), function (i) {
          i.setAttribute("disabled", true);
        });
        //
        $scope.Llenar_Datos_Forms();
        $scope.Hoja1_Obtener_Datos();
        ///
        $scope.Tabs = 1;
        setTimeout(() => {
          $scope.$apply();
        }, 100);
      }


      $scope.Llenar_Datos_Forms = function () {
        $scope.Datos = {
          Hoja1: {},
          Hoja2: {},
          Hoja3: {},
          Hoja4: {},
          Hoja5: {}
        };
        $http({
          method: 'GET',
          url: "json/tiposangre.json",
          params: {}
        }).then(function (response) {
          $scope.Datos.Hoja1.GruposSangunineos = response.data.Rh;
        });
        $http({
          method: 'GET',
          url: "json/estadocivil.json",
          params: {}
        }).then(function (response) {
          $scope.Datos.Hoja1.Estadosciviles = response.data.estadocivil;
        });
        $http({
          method: 'POST',
          url: "php/talentohumano/datosbasicos/Rdatosbasicos.php",
          data: { function: 'obtnerubicaciones' }
        }).then(function (response) {
          $scope.Datos.Hoja1.Ubicaciones = response.data;
          $scope.Datos.Hoja3.Json_Lugar = response.data.municipios;
        });
        afiliacionHttp.obtenerViaPrincipal().then(function (response) {
          $scope.viaprincipal = response.Viaprincipal.slice(1, response.Viaprincipal.length - 1);
        })
        afiliacionHttp.obtenerLetra().then(function (response) {
          $scope.letras = response.Letra.slice(1, response.Letra.length - 1);
          $http({
            method: 'POST',
            url: "php/talentohumano/datosbasicos/Rdatosbasicos.php",
            data: { function: 'obtnerselectestudio' }
          }).then(function (response) {
            $scope.Datos.Hoja3.Json_Programa = response.data.programa;
          });
        })
        ///////////////

      }

      $scope.Hoja1_Obtener_Datos = function () {
        $http({
          method: 'POST',
          url: "php/talentohumano/datosbasicos/Rdatosbasicos.php",
          data: { function: 'obtnerinformacion', id: $scope.Rol_Cedula, tipo: 'CC' }
        }).then(function (response) {
          if (response.data.toString().substr(0, 3) != '<br') {
            if (response.data.estado == '1') {
              $scope.Hoja1.Pri_nombre = response.data.pnombre;
              $scope.Hoja1.Seg_nombre = response.data.snombre;
              $scope.Hoja1.Pri_apellido = response.data.papellido;
              $scope.Hoja1.Seg_apellido = response.data.sapellido;
              var nacimiento = response.data.nacimiento.split('/');
              nacimiento = nacimiento[2] + '/' + nacimiento[1] + '/' + nacimiento[0];
              $scope.Hoja1.Nacimiento = new Date(nacimiento);
              $scope.Hoja1.Sexo = response.data.sexo;
              $scope.Hoja1.Gruposanguineo = response.data.rh;
              $scope.Hoja1.Estadocivil = response.data.estado_civil;
              $scope.Hoja1.Peso = response.data.peso;
              $scope.Hoja1.Estatura = response.data.estatura;
              $scope.Hoja1.Telefono = response.data.telefono;
              $scope.Hoja1.Celular = response.data.celular;
              $scope.Hoja1.Departamento = response.data.dpto;
              $scope.Hoja1.Direccion = response.data.direccion;
              $scope.Hoja1.Barrio = response.data.barrio;
              $scope.Hoja1.Email = response.data.email_personal;
              $scope.Hoja1.Rethus = response.data.rethus.toString();
              $scope.Hoja1.Nacimiento_Frmt = nacimiento;
              $scope.Cargar_Selects('departamentoper', $scope.Hoja1.Departamento);
              setTimeout(() => {
                $scope.Hoja1.Municipio = response.data.mun;
              }, 2000)

              setTimeout(() => {
                $scope.Hoja1_Resp = JSON.stringify($scope.Hoja1);
                $scope.Hoja1_Nacimiento = $scope.Hoja1.Nacimiento;
                $scope.$apply();
              }, 2000)
              // $scope.obtenertablas();
            } else {
              swal(
                '¡Mensaje!',
                'Por favor, Contactar con Oficina TIC Nacional',
                'warning'
              ).catch(swal.noop);
            }
          } else {
            swal(
              '¡Mensaje!',
              'Por favor, Contactar con Oficina TIC Nacional',
              'warning'
            ).catch(swal.noop);
          }
        });
      }

      $scope.Hoja1_Editar = function () {
        $scope.Hoja1.Status = 1;
        angular.forEach(document.querySelectorAll('#Hoja1 input'), function (i) {
          i.removeAttribute("readonly");
        });
        angular.forEach(document.querySelectorAll('#Hoja1 select'), function (i) {
          i.removeAttribute("disabled");
        });
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }

      $scope.Hoja1_Deshacer = function () {
        var Hoja1_Resp = JSON.parse($scope.Hoja1_Resp);
        Hoja1_Resp.Nacimiento = $scope.Hoja1_Nacimiento;
        $scope.Hoja1 = Hoja1_Resp;
        $scope.Hoja1.Status = 0;
        angular.forEach(document.querySelectorAll('#Hoja1 input'), function (i) {
          i.setAttribute("readonly", true);
        });
        angular.forEach(document.querySelectorAll('#Hoja1 select'), function (i) {
          i.setAttribute("disabled", true);
        });
        angular.forEach(document.querySelectorAll('#Hoja1 .Valid_Campo'), function (i) { i.classList.remove('Valid_Campo'); });
        setTimeout(() => {
          $scope.$apply();
        }, 1000);
      }

      $scope.Cargar_Selects = function (tipo, valor) {
        if (valor) {
          $http({
            method: 'POST',
            url: "php/talentohumano/datosbasicos/Rdatosbasicos.php",
            data: { function: "obtenerselects", tipo: tipo, valor: valor }
          }).then(function (response) {
            switch (tipo) {
              case 'departamentoper':
                var array = [];
                response.data.forEach(e => {
                  array.push({
                    codigo: parseInt(e.codigo),
                    nombre: e.nombre
                  })
                });
                $scope.Datos.Hoja1.Municipios = array;
                break;
              case 'entidades':
                $scope.entidadesinfo = response.data;
                break;
              case 'instituciones':
                $scope.Instituciones = response.data;
                break;
              default:
            }
          });
        }
      }

      $scope.Hoja1_Validar_CamposVacios = function () {
        return new Promise((resolve) => {
          //
          if ($scope.Hoja1.Pri_nombre == undefined || $scope.Hoja1.Pri_nombre == null || $scope.Hoja1.Pri_nombre == '') {
            document.querySelector("#Hoja1_Pri_nombre").classList.add("Valid_Campo"); resolve(true);
          }
          //if ($scope.Hoja1.Seg_nombre == undefined || $scope.Hoja1.Seg_nombre == null || $scope.Hoja1.Seg_nombre == '') {
            //document.querySelector("#Hoja1_Seg_nombre").classList.add("Valid_Campo"); resolve(true);
          //}
          if ($scope.Hoja1.Pri_apellido == undefined || $scope.Hoja1.Pri_apellido == null || $scope.Hoja1.Pri_apellido == '') {
            document.querySelector("#Hoja1_Pri_apellido").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Hoja1.Seg_apellido == undefined || $scope.Hoja1.Seg_apellido == null || $scope.Hoja1.Seg_apellido == '') {
            document.querySelector("#Hoja1_Seg_apellido").classList.add("Valid_Campo"); resolve(true);
          }

          if ($scope.Hoja1.Nacimiento == undefined || $scope.Hoja1.Nacimiento == null || $scope.Hoja1.Nacimiento == '') {
            document.querySelector("#Hoja1_Nacimiento").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Hoja1.Sexo == undefined || $scope.Hoja1.Sexo == null || $scope.Hoja1.Sexo == '') {
            document.querySelector("#Hoja1_Sexo").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Hoja1.Gruposanguineo == undefined || $scope.Hoja1.Gruposanguineo == null || $scope.Hoja1.Gruposanguineo == '') {
            document.querySelector("#Hoja1_Gruposanguineo").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Hoja1.Estadocivil == undefined || $scope.Hoja1.Estadocivil == null || $scope.Hoja1.Estadocivil == '') {
            document.querySelector("#Hoja1_Estadocivil").classList.add("Valid_Campo"); resolve(true);
          }

          if ($scope.Hoja1.Peso == undefined || $scope.Hoja1.Peso == null || $scope.Hoja1.Peso == '') {
            document.querySelector("#Hoja1_Peso").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Hoja1.Estatura == undefined || $scope.Hoja1.Estatura == null || $scope.Hoja1.Estatura == '') {
            document.querySelector("#Hoja1_Estatura").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Hoja1.Telefono == undefined || $scope.Hoja1.Telefono == null || $scope.Hoja1.Telefono == '') {
            document.querySelector("#Hoja1_Telefono").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Hoja1.Celular == undefined || $scope.Hoja1.Celular == null || $scope.Hoja1.Celular == '') {
            document.querySelector("#Hoja1_Celular").classList.add("Valid_Campo"); resolve(true);
          }

          if ($scope.Hoja1.Departamento == undefined || $scope.Hoja1.Departamento == null || $scope.Hoja1.Departamento == '') {
            document.querySelector("#Hoja1_Departamento").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Hoja1.Municipio == undefined || $scope.Hoja1.Municipio == null || $scope.Hoja1.Municipio == '') {
            document.querySelector("#Hoja1_Municipio").classList.add("Valid_Campo"); resolve(true);
          }

          if ($scope.Hoja1.Direccion == undefined || $scope.Hoja1.Direccion == null || $scope.Hoja1.Direccion == '') {
            document.querySelector("#Hoja1_Direccion").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Hoja1.Barrio == undefined || $scope.Hoja1.Barrio == null || $scope.Hoja1.Barrio == '') {
            document.querySelector("#Hoja1_Barrio").classList.add("Valid_Campo"); resolve(true);
          }

          if ($scope.Hoja1.Email == undefined || $scope.Hoja1.Email == null || $scope.Hoja1.Email == '') {
            document.querySelector("#Hoja1_Email").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Hoja1.Rethus == undefined || $scope.Hoja1.Rethus == null || $scope.Hoja1.Rethus == '') {
            document.querySelector("#Hoja1_Rethus").classList.add("Valid_Campo"); resolve(true);
          }
          resolve(false);
        });
      }

      $scope.Validar_EfectuaronCambios = function () {
        return new Promise((resolve) => {
          var Hoja1_Resp = JSON.parse($scope.Hoja1_Resp);
          var count = 0;
          if ($scope.Hoja1.Pri_nombre === Hoja1_Resp.Pri_nombre) { count++; }
          if ($scope.Hoja1.Seg_nombre === Hoja1_Resp.Seg_nombre) { count++; }
          if ($scope.Hoja1.Pri_apellido === Hoja1_Resp.Pri_apellido) { count++; }
          if ($scope.Hoja1.Seg_apellido === Hoja1_Resp.Seg_apellido) { count++; }

          if ($scope.Hoja1.Nacimiento_Frmt === Hoja1_Resp.Nacimiento_Frmt) { count++; }
          if ($scope.Hoja1.Sexo === Hoja1_Resp.Sexo) { count++; }
          if ($scope.Hoja1.Gruposanguineo === Hoja1_Resp.Gruposanguineo) { count++; }
          if ($scope.Hoja1.Estadocivil === Hoja1_Resp.Estadocivil) { count++; }

          if ($scope.Hoja1.Peso === Hoja1_Resp.Peso) { count++; }
          if ($scope.Hoja1.Estatura === Hoja1_Resp.Estatura) { count++; }
          if ($scope.Hoja1.Telefono === Hoja1_Resp.Telefono) { count++; }
          if ($scope.Hoja1.Celular === Hoja1_Resp.Celular) { count++; }

          if ($scope.Hoja1.Departamento === Hoja1_Resp.Departamento) { count++; }
          if ($scope.Hoja1.Municipio === Hoja1_Resp.Municipio) { count++; }

          if ($scope.Hoja1.Direccion === Hoja1_Resp.Direccion) { count++; }
          if ($scope.Hoja1.Barrio === Hoja1_Resp.Barrio) { count++; }

          if ($scope.Hoja1.Email === Hoja1_Resp.Email) { count++; }
          if ($scope.Hoja1.Rethus === Hoja1_Resp.Rethus) { count++; }
          if (count == 18) { resolve(false); }
          resolve(true);
        });
      }

      $scope.Hoja1_Actualizar_Personal = function () {
        $scope.Validar_EfectuaronCambios().then(function (result) {
          if (result) {
            angular.forEach(document.querySelectorAll('#Hoja1 .Valid_Campo'), function (i) { i.classList.remove('Valid_Campo'); });
            $scope.Hoja1_Validar_CamposVacios().then(function (result) {
              if (!result) {
                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();
                $http({
                  method: 'POST',
                  url: "php/talentohumano/datosbasicos/Cdatosbasicos.php",
                  data: {
                    function: 'registrardatos',
                    tipodoc: 'CC',
                    documento: $scope.Rol_Cedula,
                    pnombre: $scope.Hoja1.Pri_nombre.toUpperCase(),
                    snombre: $scope.Hoja1.Seg_nombre.toUpperCase(),
                    papellido: $scope.Hoja1.Pri_apellido.toUpperCase(),
                    sapellido: $scope.Hoja1.Seg_apellido.toUpperCase(),
                    nacimiento: $scope.GetFecha('Hoja1', 'Nacimiento'),
                    sexo: $scope.Hoja1.Sexo,
                    gruposanguineo: $scope.Hoja1.Gruposanguineo,
                    estadocivil: $scope.Hoja1.Estadocivil,
                    peso: $scope.Hoja1.Peso,
                    estatura: $scope.Hoja1.Estatura,
                    telefono: $scope.Hoja1.Telefono,
                    celular: $scope.Hoja1.Celular,
                    departamento: $scope.Hoja1.Departamento,
                    municipio: $scope.Hoja1.Municipio,
                    direccion: $scope.Hoja1.Direccion,
                    barrio: $scope.Hoja1.Barrio,
                    correo: $scope.Hoja1.Email,
                    rethus: $scope.Hoja1.Rethus,

                    departamentoe: '0',
                    municipioe: '0',
                    tipocontrato: '0',
                    empleador: '0',
                    unidadestrategica: '0',
                    unidadfuncional: '0',
                    cargo: '0',
                    gruposalario: '',
                    salario: '0',
                    tiporemuneracion: '0',
                    sedecontractual: '0',
                    estado: '0',
                    numerocuenta: '',
                    tipocuenta: '0',
                    banco: '0',
                    fechaingreso: '01/01/1990',
                    fechaegreso: '01/01/1990',
                    tipo: '3',
                    puestotrabajo: '',
                    causalingreso: '0',
                    causalegreso: '0',
                    observacion: ''
                  }
                }).then(function (response) {
                  if (response.data.toString().substr(0, 3) != '<br') {
                    if (response.data == '') {
                      $scope.Hoja1_Deshacer();
                      swal(
                        '¡Mensaje!',
                        'No se realizaron cambios',
                        'warning'
                      ).catch(swal.noop);
                    } else {

                      var data = response.data.split("-");
                      var cod = data[0];
                      var msg = data[1];
                      switch (cod) {
                        case "0":
                          swal('¡Mensaje!', msg, 'error').catch(swal.noop);
                          break;
                        case "1":
                          swal('¡Mensaje!', msg, 'success').catch(swal.noop);
                          $scope.Hoja1_Limpiar();
                          break;
                        case "2":
                          swal('¡Mensaje!', msg, 'warning').catch(swal.noop);
                          break;
                        default:
                      }
                    }
                  } else {
                    swal(
                      '¡Mensaje!',
                      'Por favor, Contactar con Oficina TIC Nacional',
                      'warning'
                    ).catch(swal.noop);
                  }
                })
              }
            });
          } else {
            $scope.Hoja1_Deshacer();
            swal(
              '¡Mensaje!',
              'No se realizaron cambios',
              'warning'
            ).catch(swal.noop);
          }
        });
      }

      ///////////////

      $scope.ObtenerTabs = function () {
        $http({
          method: 'POST',
          url: "php/talentohumano/datosbasicos/Rdatosbasicos.php",
          data: { function: "obtenerinfoadicional", id: $scope.Rol_Cedula }
        }).then(function (response) {
          if (response.data.toString().substr(0, 3) != '<br') {
            $scope.Hoja2.Datos = response.data.entidad;
            $scope.Hoja3.Datos = response.data.estudio;
            $scope.Hoja4.Datos = response.data.beneficiarios;
            $scope.Hoja5.Datos = response.data.medidas;
          } else {
            swal(
              '¡Mensaje!',
              'Por favor, Contactar con Oficina TIC Nacional',
              'warning'
            ).catch(swal.noop);
          }
        })
      }
      ///////////////
      $scope.Hoja2_Limpiar = function () {
        $scope.Hoja2 = {
          Status: 0,

          Datos: {}

        };
        //
        //
        ///
        setTimeout(() => {
          $scope.$apply();
        }, 100);
      }
      $scope.Hoja3_Limpiar = function () {
        $scope.Hoja3 = {
          Status: 0,

          Renglon: 1,

          Nivel: '',
          Institucion: '',
          Institucion_Cod: '',
          Programa: '',
          Programa_Cod: '',
          Tipo_Periodo: '',
          Periodo: '',
          Fecha_Terminacion: '',
          Lugar: '',
          Lugar_Cod: '',

          Tipo_Modal: '',
          Busqueda: '',
          Busqueda_Json: [],

          Datos: {}

        };
        //
        //
        ///
        setTimeout(() => {
          $scope.$apply();
        }, 100);
      }

      $scope.Hoja3_Abrir_Modal = function (Tipo_Modal) {
        //Institucion Programa Lugar
        $('#Modal_Hoja3').modal('open');
        $scope.Hoja3.Tipo_Modal = Tipo_Modal;
        $scope.Hoja3.Busqueda = '';
        $scope.Hoja3.Busqueda_Json = [];
        setTimeout(() => {
          document.getElementById("Hoja3_Busqueda").focus();
          $scope.$apply();
        }, 500);
        // }
      }

      $scope.Hoja3_Modal_Consultar = function () {
        // obtenerselects
        if ($scope.Hoja3.Busqueda.length > 3) {

          if ($scope.Hoja3.Tipo_Modal == 'Institucion') {
            $http({
              method: 'POST',
              url: "php/talentohumano/datosbasicos/Rdatosbasicos.php",
              data: { function: "obtenerselects", tipo: 'instituciones', valor: $scope.Hoja3.Busqueda }
            }).then(function (response) {
              if (response.data.toString().substr(0, 3) != '<br') {
                $scope.Hoja3.Busqueda_Json = response.data;
                // Codigo: "139" Nombre: " UNIVERSIDAD MANUELA BELTRAN"
              } else {
                swal(
                  '¡Mensaje!',
                  'Por favor, Contactar con Oficina TIC Nacional',
                  'warning'
                ).catch(swal.noop);
              }
            })
          }
          if ($scope.Hoja3.Tipo_Modal == 'Programa') {
            var output = [];
            angular.forEach($scope.Datos.Hoja3.Json_Programa, function (x) {
              if (x.Nombre.toUpperCase().indexOf($scope.Hoja3.Busqueda.toUpperCase()) >= 0 || x.Codigo.toString().toUpperCase().indexOf($scope.Hoja3.Busqueda.toUpperCase()) >= 0) {
                output.push({ "Codigo": x.Codigo, "Nombre": x.Nombre.toUpperCase() });
              }
            });
            $scope.Hoja3.Busqueda_Json = output;
          }
          if ($scope.Hoja3.Tipo_Modal == 'Lugar') {
            var output = [];
            angular.forEach($scope.Datos.Hoja3.Json_Lugar, function (x) {
              if (x.nombre.toUpperCase().indexOf($scope.Hoja3.Busqueda.toUpperCase()) >= 0 || x.codigo.toString().toUpperCase().indexOf($scope.Hoja3.Busqueda.toUpperCase()) >= 0) {
                output.push({ "Codigo": x.codigo, "Nombre": x.nombre.toUpperCase() });
              }
            });
            $scope.Hoja3.Busqueda_Json = output;
          }
        } else {
          $scope.Hoja3.Busqueda_Json = [];
          // Materialize.toast('¡Digite al menos 4 caracteres!', 1000);
        }

      }

      $scope.Hoja3_Cerrar_Modal = function (codigo, nombre) {
        $scope.Hoja3[$scope.Hoja3.Tipo_Modal + '_Cod'] = codigo;
        $scope.Hoja3[$scope.Hoja3.Tipo_Modal] = nombre;
        var msg = $scope.Hoja3.Tipo_Modal + ($scope.Hoja3.Tipo_Modal == 'Programa' || $scope.Hoja3.Tipo_Modal == 'Lugar' ? ' Seleccionado' : ' Seleccionada');
        // swal(
        //   msg,
        //   nombre,
        //   'success'
        // ).catch(swal.noop);

        swal({
          title: msg,
          text: nombre,
          type: 'success',
          showCancelButton: true,
          confirmButtonText: "Cerrar",
          cancelButtonText: "Elegir otro",
          allowOutsideClick: false
        }).then(function (result) {
          if (result) {
            $scope.closeModal();
          }
        }).catch(swal.noop);


        // $scope.closeModal();
      }


      $scope.Hoja3_Validar_CamposVacios = function () {
        return new Promise((resolve) => {
          //
          if ($scope.Hoja3.Nivel == undefined || $scope.Hoja3.Nivel == null || $scope.Hoja3.Nivel == '') {
            document.querySelector("#Hoja3_Nivel").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Hoja3.Institucion_Cod == undefined || $scope.Hoja3.Institucion_Cod == null || $scope.Hoja3.Institucion_Cod == '') {
            document.querySelector("#Hoja3_Institucion").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Hoja3.Programa_Cod == undefined || $scope.Hoja3.Programa_Cod == null || $scope.Hoja3.Programa_Cod == '') {
            document.querySelector("#Hoja3_Programa").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Hoja3.Tipo_Periodo == undefined || $scope.Hoja3.Tipo_Periodo == null || $scope.Hoja3.Tipo_Periodo == '') {
            document.querySelector("#Hoja3_Tipo_Periodo").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Hoja3.Periodo == undefined || $scope.Hoja3.Periodo == null) {
            document.querySelector("#Hoja3_Periodo").classList.add("Valid_Campo"); resolve(true);
          }
          /*if ($scope.Hoja3.Fecha_Terminacion == undefined || $scope.Hoja3.Fecha_Terminacion == null || $scope.Hoja3.Fecha_Terminacion == '') {
            document.querySelector("#Hoja3_Fecha_Terminacion").classList.add("Valid_Campo"); resolve(true);
          }*/
          if ($scope.Hoja3.Lugar_Cod == undefined || $scope.Hoja3.Lugar_Cod == null || $scope.Hoja3.Lugar_Cod == '') {
            document.querySelector("#Hoja3_Lugar").classList.add("Valid_Campo"); resolve(true);
          }
          resolve(false);
        });
      }
      $scope.Hoja3_Guardar_Actualizar_Estudios = function (Accion) {
        angular.forEach(document.querySelectorAll('#Hoja3 .Valid_Campo'), function (i) { i.classList.remove('Valid_Campo'); });
        $scope.Hoja3_Validar_CamposVacios().then(function (result) {
          if (!result) {
            swal({ title: 'Cargando...', allowOutsideClick: false });
            swal.showLoading();
            $http({
              method: 'POST',
              url: "php/talentohumano/datosbasicos/Cdatosbasicos.php",
              data: {
                function: "logicaestudio",

                institucion: $scope.Hoja3.Institucion_Cod,
                programa: $scope.Hoja3.Programa_Cod,
                nivel: $scope.Hoja3.Nivel,
                tipoperiodo: $scope.Hoja3.Tipo_Periodo,
                periodo: ($scope.Hoja3.Periodo == '') ? 0 : $scope.Hoja3.Periodo,
                fechafinal: $scope.GetFecha('Hoja3', 'Fecha_Terminacion'),
                ubicacion: $scope.Hoja3.Lugar_Cod,
                titulo: '',
                id: $scope.Rol_Cedula,
                renglon: $scope.Hoja3.Renglon,
                tipo: Accion
              }
            }).then(function (response) {
              if (response.data.toString().substr(0, 3) != '<br') {
                var data = response.data.split("-");
                var cod = data[0];
                var msg = data[1];
                switch (cod) {
                  case "0":
                    swal('¡Mensaje!', msg, 'error').catch(swal.noop);
                    break;
                  case "1":
                    $scope.Hoja3_Limpiar();
                    swal('¡Mensaje!', msg, 'success').catch(swal.noop);
                    $scope.ObtenerTabs();
                    break;
                  case "2":
                    swal('¡Mensaje!', msg, 'warning').catch(swal.noop);
                    break;
                  default:
                }
              } else {
                swal(
                  '¡Mensaje!',
                  'Por favor, Contactar con Oficina TIC Nacional',
                  'warning'
                ).catch(swal.noop);
              }
            })
          }
        });
      }
      $scope.Hoja3_Actualizar_Estudios = function (x) {
        angular.forEach(document.querySelectorAll('#Hoja3 .Valid_Campo'), function (i) { i.classList.remove('Valid_Campo'); });
        document.querySelectorAll('.checkbox_Est').forEach(e => { e.checked = false; });
        $scope.Hoja3.Status = 1;
        $scope.Hoja3.Renglon = x.renglon;
        document.querySelector('#Est_' + x.renglon).checked = true;
        $scope.Hoja3.Nivel = x.codnivel;
        $scope.Hoja3.Institucion = x.institucion;
        $scope.Hoja3.Institucion_Cod = x.institucioncod;
        $scope.Hoja3.Programa = x.programa;
        $scope.Hoja3.Programa_Cod = x.codprograma;
        $scope.Hoja3.Tipo_Periodo = x.codtipoperiodo;
        $scope.Hoja3.Periodo = x.periodo;
        $scope.Hoja3.Lugar = x.ubicacion;
        $scope.Hoja3.Lugar_Cod = x.codubicacion;
        $scope.Hoja3.Periodo = x.periodo;
        var terminacion = x.ano.split('/');
        terminacion = terminacion[2] + '/' + terminacion[1] + '/' + terminacion[0];
        var Fecha_Terminacion = new Date(terminacion);
        $scope.Hoja3.Fecha_Terminacion = Fecha_Terminacion;

        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }
      $scope.Hoja3_Deshacer = function () {
        document.querySelectorAll('.checkbox_Est').forEach(e => { e.checked = false; });
        $scope.Hoja3.Status = 0;
        $scope.Hoja3.Renglon = 1;
        $scope.Hoja3.Nivel = '';
        $scope.Hoja3.Institucion = '';
        $scope.Hoja3.Institucion_Cod = '';
        $scope.Hoja3.Programa = '';
        $scope.Hoja3.Programa_Cod = '';
        $scope.Hoja3.Tipo_Periodo = '';
        $scope.Hoja3.Periodo = '';
        $scope.Hoja3.Fecha_Terminacion = '';
        $scope.Hoja3.Lugar = '';
        $scope.Hoja3.Lugar_Cod = '';
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }

      $scope.Hoja4_Limpiar = function () {
        $scope.Hoja4 = {
          Status: 0,

          Renglon: 1,
          Tipo_Doc: '',
          Documento: '',
          Nombre: '',
          Parentesco: '',
          Sexo: '',
          Nacimiento: '',

          Datos: {}

        };
        //
        //
        ///
        setTimeout(() => {
          $scope.$apply();
        }, 100);
      }
      $scope.Hoja4_Validar_CamposVacios = function () {
        return new Promise((resolve) => {
          //
          if ($scope.Hoja4.Tipo_Doc == undefined || $scope.Hoja4.Tipo_Doc == null || $scope.Hoja4.Tipo_Doc == '') {
            document.querySelector("#Hoja4_Tipo_Doc").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Hoja4.Documento == undefined || $scope.Hoja4.Documento == null || $scope.Hoja4.Documento == '') {
            document.querySelector("#Hoja4_Documento").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Hoja4.Nombre == undefined || $scope.Hoja4.Nombre == null || $scope.Hoja4.Nombre == '') {
            document.querySelector("#Hoja4_Nombre").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Hoja4.Parentesco == undefined || $scope.Hoja4.Parentesco == null || $scope.Hoja4.Parentesco == '') {
            document.querySelector("#Hoja4_Parentesco").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Hoja4.Sexo == undefined || $scope.Hoja4.Sexo == null || $scope.Hoja4.Sexo == '') {
            document.querySelector("#Hoja4_Sexo").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.Hoja4.Nacimiento == undefined || $scope.Hoja4.Nacimiento == null || $scope.Hoja4.Nacimiento == '') {
            document.querySelector("#Hoja4_Nacimiento").classList.add("Valid_Campo"); resolve(true);
          }
          resolve(false);
        });
      }
      $scope.Hoja4_Guardar_Actualizar_Beneficiarios = function (Accion) {
        angular.forEach(document.querySelectorAll('#Hoja4 .Valid_Campo'), function (i) { i.classList.remove('Valid_Campo'); });
        $scope.Hoja4_Validar_CamposVacios().then(function (result) {
          if (!result) {
            swal({ title: 'Cargando...', allowOutsideClick: false });
            swal.showLoading();
            $http({
              method: 'POST',
              url: "php/talentohumano/datosbasicos/Cdatosbasicos.php",
              data: {
                function: "logicabeneficiario",
                tipodoc: $scope.Hoja4.Tipo_Doc,
                documento: $scope.Hoja4.Documento,
                nombre: $scope.Hoja4.Nombre,
                parentezco: $scope.Hoja4.Parentesco,
                sexo: $scope.Hoja4.Sexo,
                nacimiento: $scope.GetFecha('Hoja4', 'Nacimiento'),
                id: $scope.Rol_Cedula,
                renglon: $scope.Hoja4.Renglon,
                tipo: Accion
              }
            }).then(function (response) {
              if (response.data.toString().substr(0, 3) != '<br') {
                var data = response.data.split("-");
                var cod = data[0];
                var msg = data[1];
                switch (cod) {
                  case "0":
                    swal('¡Mensaje!', msg, 'error').catch(swal.noop);
                    break;
                  case "1":
                    $scope.Hoja4_Limpiar();
                    swal('¡Mensaje!', msg, 'success').catch(swal.noop);
                    $scope.ObtenerTabs();
                    break;
                  case "2":
                    swal('¡Mensaje!', msg, 'warning').catch(swal.noop);
                    break;
                  default:
                }
              } else {
                swal(
                  '¡Mensaje!',
                  'Por favor, Contactar con Oficina TIC Nacional',
                  'warning'
                ).catch(swal.noop);
              }
            })
          }
        });
      }
      $scope.Hoja4_Actualizar_Beneficiarios = function (x) {
        angular.forEach(document.querySelectorAll('#Hoja4 .Valid_Campo'), function (i) { i.classList.remove('Valid_Campo'); });
        document.querySelectorAll('.checkbox_Ben').forEach(e => { e.checked = false; });
        $scope.Hoja4.Status = 1;
        document.querySelector('#Ben_' + x.renglon).checked = true;
        $scope.Hoja4.Renglon = x.renglon;
        $scope.Hoja4.Tipo_Doc = x.tipodoc;
        $scope.Hoja4.Documento = x.cedulafamiliar;
        $scope.Hoja4.Nombre = x.nombre;
        $scope.Hoja4.Parentesco = x.parentezco;
        $scope.Hoja4.Sexo = x.sexo;
        var nacimiento = x.nacimiento.split('/');
        nacimiento = nacimiento[2] + '/' + nacimiento[1] + '/' + nacimiento[0];
        var Nacimiento = new Date(nacimiento);
        $scope.Hoja4.Nacimiento = Nacimiento;

        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }
      $scope.Hoja4_Deshacer = function () {
        document.querySelectorAll('.checkbox_Ben').forEach(e => { e.checked = false; });
        $scope.Hoja4.Status = 0;
        $scope.Hoja4.Renglon = 1;
        $scope.Hoja4.Tipo_Doc = '';
        $scope.Hoja4.Documento = '';
        $scope.Hoja4.Nombre = '';
        $scope.Hoja4.Parentesco = '';
        $scope.Hoja4.Sexo = '';
        $scope.Hoja4.Nacimiento = '';
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }

      $scope.Hoja5_Limpiar = function () {
        $scope.Hoja5 = {
          Status: 0,

          Sueter: '',
          Camisa: '',
          Pantalon: '',
          Zapato: '',

          Datos: {}

        };
        //
        //
        ///
        setTimeout(() => {
          $scope.$apply();
        }, 500);
        setTimeout(() => {
          if ($scope.Hoja5.Datos) {
            $scope.Hoja5.Sueter = $scope.Hoja5.Datos[0].suater;
            $scope.Hoja5.Camisa = $scope.Hoja5.Datos[0].camisa;
            $scope.Hoja5.Pantalon = $scope.Hoja5.Datos[0].pantalon;
            $scope.Hoja5.Zapato = $scope.Hoja5.Datos[0].zapato;
          }
        }, 3000);
      }
      $scope.Hoja5_Actualizar_Medidas = function () {
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/talentohumano/datosbasicos/Cdatosbasicos.php",
          data: {
            function: 'logicamedidas',
            id: $scope.Rol_Cedula,
            sueter: $scope.Hoja5.Sueter,
            camisa: $scope.Hoja5.Camisa,
            pantalon: $scope.Hoja5.Pantalon,
            zapato: $scope.Hoja5.Zapato
          }
        }).then(function (response) {
          if (response.data.toString().substr(0, 3) != '<br') {
            var data = response.data.split("-");
            var cod = data[0];
            var msg = data[1];
            switch (cod) {
              case "0":
                swal('¡Mensaje!', msg, 'error').catch(swal.noop);
                break;
              case "1":
                swal('¡Mensaje!', msg, 'success').catch(swal.noop);
                $scope.ObtenerTabs();
                break;
              case "2":
                swal('¡Mensaje!', msg, 'warning').catch(swal.noop);
                break;
              default:
            }
          } else {
            swal(
              '¡Mensaje!',
              'Por favor, Contactar con Oficina TIC Nacional',
              'warning'
            ).catch(swal.noop);
          }
        })

      }

      $scope.Abrir_Modal_Direccion = function () {
        if ($scope.Hoja1.Status == '1') {
          $('#Modal_Direccion').modal('open');
          document.querySelector('#Dir_Actual').setAttribute("readonly", true);
          $scope.Dir_Actual = $scope.Hoja1.Direccion;
          $scope.selectViap = "";
          $scope.numeroN = "";
          $scope.selectLetra = "";
          $scope.numeroNVG = "";
          $scope.selectLetraVG = "";
          $("#direccionmodal").val('');
          setTimeout(() => {
            $scope.$apply();
          }, 500);
        }
      }
      $scope.Chg_Direccion = function () {
        $("#direccionmodal").val($scope.selectViap + ' ' + $scope.numeroN + ' ' + $scope.selectLetra + ' ' + $scope.numeroNVG + ' ' + $scope.selectLetraVG);
      }
      $scope.Cargar_Dir = function () {
        $scope.Hoja1.Direccion = $("#direccionmodal").val().trim();
        $scope.closeModal();
      }

      $scope.closeModal = function () {
        $('.modal').modal('close');
      }

      $scope.setTab = function (x) {
        $scope.Tabs = x;
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }

      $scope.GetFecha = function (HOJA, SCOPE) {
        var ahora_ano = $scope[HOJA][SCOPE].getFullYear();
        var ahora_mes = ((($scope[HOJA][SCOPE].getMonth() + 1) < 10) ? '0' + ($scope[HOJA][SCOPE].getMonth() + 1) : ($scope[HOJA][SCOPE].getMonth() + 1));
        var ahora_dia = ((($scope[HOJA][SCOPE].getDate()) < 10) ? '0' + ($scope[HOJA][SCOPE].getDate()) : ($scope[HOJA][SCOPE].getDate()));
        return ahora_dia + '/' + ahora_mes + '/' + ahora_ano;
      }
      $scope.FormatTexto = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/[|!¿¡?°"#/()=$%&''´¨´¨¨¨<>]/g, '');
        valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
        input.value = valor.toString().toUpperCase();
      }
      $scope.FormatSoloNumero = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/[^0-9]/g, '');
        input.value = valor;
      }

      $scope.FormatNacimiento_Frmt = function (Hoja) {
        var ahora_ano = $scope[Hoja].Nacimiento.getFullYear();
        var ahora_mes = ((($scope[Hoja].Nacimiento.getMonth() + 1) < 10) ? '0' + ($scope[Hoja].Nacimiento.getMonth() + 1) : ($scope[Hoja].Nacimiento.getMonth() + 1));
        var ahora_dia = ((($scope[Hoja].Nacimiento.getDate()) < 10) ? '0' + ($scope[Hoja].Nacimiento.getDate()) : ($scope[Hoja].Nacimiento.getDate()));
        $scope[Hoja].Nacimiento_Frmt = ahora_ano + '/' + ahora_mes + '/' + ahora_dia;
      }

      $(window).on('resize', function () {
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100 && $(window).width() < 1300) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1300 && $(window).width() < 1500) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
        if ($(window).width() > 1500) {
          document.querySelector("#pantalla").style.zoom = 0.9;
        }
      });

      if (document.readyState !== 'loading') {
        $scope.Inicio();
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }

    }])
