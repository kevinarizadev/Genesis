'use strict';
angular.module('GenesisApp')
  .controller('admndatosempleadoscontroller', ['$scope', '$http', 'ngDialog', 'afiliacionHttp', '$rootScope', '$window',
    function ($scope, $http, ngDialog, afiliacionHttp) {
      $scope.Inicio = function () {
        //Parametro de configuracion de la lectora debe ser 55
        $('.modal').modal();
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
        afiliacionHttp.obtenerViaPrincipal().then(function (response) {
          $scope.viaprincipal = response;
        })
        afiliacionHttp.obtenerLetra().then(function (response) {
          $scope.letras = response;
        })
        afiliacionHttp.obtenerCuadrante().then(function (response) {
          $scope.Cuadrantes = response;
        })
        setTimeout(() => {
          // $scope.$apply();
        }, 1000);

        $scope.img = true;
        $scope.btn_editInfoEmp = false;
        $scope.resultadoBusqueda = false;
        $scope.divInfo = false;
        $scope.bntinfoAdicional = false;
        $scope.AddFuncionario = true;
        $scope.search = true;
        $scope.Tap = 1;
        $scope.SysDay = new Date();
        $('.tabs').tabs();
        $scope.Limpiarform();
        // setTimeout(function () { $scope.BuscarUsuarios(); }, 1000);
        $scope.ObtenerUbicacion();
        $scope.ObtenerDependientes();
        document.querySelector("#content").style.backgroundColor = "white";
        //$scope.Jefes();
      }

      $scope.Limpiarform = function () {
        $scope.form = {};
        $scope.form.InputNombre = "";
        $scope.form.tipoDoc = "";
        $scope.form.numDoc = "";
        $scope.form.nombre1 = "";
        $scope.form.nombre2 = "";
        $scope.form.apellido1 = "";
        $scope.form.apellido2 = "";
        $scope.form.fechaNac = "";
        $scope.form.sexo = "";
        $scope.form.grupo_sanguineo = "";
        $scope.form.estado_civil = "";
        $scope.form.peso = "";
        $scope.form.estatura = "";
        $scope.form.telefono = "";
        $scope.form.celular = "";
        $scope.form.depto = "";
        $scope.form.mpio = "";
        $scope.form.barrio = "";
        $scope.form.direccion = "";
        $scope.form.email = "";
        $scope.form.rethus = "";
        $scope.form.seccional = "";
        $scope.form.jefeCed = "";
        $scope.form.sede = "";
        $scope.form.tipoCont = "";
        $scope.form.empleador = "";
        $scope.form.undEstrat = "";
        $scope.form.undFunc = "";
        $scope.form.cargo = "";
        $scope.form.tipoRemu = "";
        $scope.form.salario = "";
        $scope.form.grupos = "";
        $scope.form.fechaingreso = "";
        $scope.form.fechaegreso = "";
        $scope.form.fechaIng = "";
        $scope.form.fechaEgr = "";
        $scope.form.numCuentas = "";
        $scope.form.tipoCuenta = "";
        $scope.form.banco = "";
        $scope.form.estado = "";
        $scope.form.pTrabajo = "";
        $scope.form.causaIngeso = "";
        $scope.form.causaEgreso = "0";
        $scope.form.TipoEntidad = "";
        $scope.form.Entidad = "";
        $scope.form.fechaInicial = "";
        $scope.form.fechaFinal = "";
        $scope.form.sedecontractual = "0";

        $scope.form.status = 0;
        $scope.form.status2 = 0;
        $scope.form.observacion = "";
        $scope.form.codGrupoSalario = "";
        $scope.form.emailEmpr = "";
        $scope.form.rol = "";
        $scope.sedes = [];
        $scope.unidadE = [];
        $scope.unidadF = [];
        $scope.nomgruposalario = [];
        $scope.salarios = [];
        $scope.grupos = [];
        $scope.entidades = [];
        //   $('#date1').datepicker({
        //     minDate: today
        //  });
        setTimeout(function () {
          document.querySelector("#numDoc").focus();
          // $scope.$apply();
        }, 1000)
      }

      $scope.BuscarUsuarios = function (nombre) {
        $scope.limpiarentidad();
        //$scope.Jefes();
        $scope.form.status = 0;
        $scope.form.status3 = 0;
        $scope.form.status2 = undefined;
        $scope.search = true;
        $scope.resultadoBusqueda = false;
        $scope.divInfo = false;
        $scope.AddFuncionario = false;
        $scope.btn_actualizar = true;
        $scope.filter = "";
        if (nombre != "") {
          if (nombre != "" && nombre != null && nombre != undefined && nombre.length >= 3) {
            swal({ title: 'Cargando...' }).catch(swal.noop);
            swal.showLoading();
            $http({
              method: 'POST',
              url: "php/talentohumano/datosbasicos/Rdatosbasicos.php",
              data: { function: 'obtenerusuarios', dato: nombre }
            }).then(function (response) {
              swal.close();
              console.log(response);
              if (response.data.toString().substr(0, 3) != '<br') {
                if(response.data != 0){
                  if (response.data.length > 0) {
                    if (response.data.length > 1) {
                      $scope.img = false;
                      $scope.resultadoBusqueda = true;
                      $scope.usuarios = response.data;
                      $scope.InformacionAdicional($scope.usuarios);
                    } else {
                      $scope.TipoDoc = response.data[0].tipo;
                      $scope.numDoc = response.data[0].cedula;
                      $scope.SearchCedula($scope.TipoDoc, $scope.numDoc);
                    }
                  } else {
                    $scope.AddFuncionario = true;
                    swal({
                      title: "¡Importante!",
                      text: "No se encontraron registros",
                      type: "warning"
                    }).catch(swal.noop);
                  }
                }else {

                  swal({
                    title: "¡Importante!",
                    text: "No se encontraron registros",
                    type: "warning"
                  }).catch(swal.noop);
                }

              } else {
                $scope.AddFuncionario = true;
                swal({
                  title: "¡Importante!",
                  text: "Usuario con inconsistencia, favor reportar al area TIC nacional",
                  type: "warning",
                }).catch(swal.noop);
              }
            })
          }
          else {
            Materialize.toast('¡Ingrese un nombre valido!', 3000);
            $scope.AddFuncionario = true;
          }
        } else {
          Materialize.toast('¡Ingrese un nombre valido!', 3000);
          $scope.AddFuncionario = true;
          $scope.img = true;
          setTimeout(function () {
            // $scope.$apply();
          }, 500)
        }
      }

      $scope.SearchCedula = function (TipoDoc, NumDoc) {
        $scope.img = false;
        $scope.filter = "";
        $scope.form.InputTipoCedula = TipoDoc;
        $scope.form.InputCedula = NumDoc;
        if ($scope.form.InputTipoCedula != undefined && $scope.form.InputCedula != undefined) {
          // swal({ title: 'Cargando...' }).catch(swal.noop);
          // swal.showLoading();
          $http({
            method: 'POST',
            url: "php/talentohumano/datosbasicos/Rdatosbasicos.php",
            data: { function: 'obtnerinformacion', id: $scope.form.InputCedula, tipo: $scope.form.InputTipoCedula }
          }).then(function (response) {
            swal.close();
            if (response.data.toString().substr(0, 3) != '<br') {
              if (response.data.estado == '1') {
                $scope.Tap = 1;
                $scope.datos = response.data;
                $scope.divInfo = true;
                $scope.resultadoBusqueda = false;
                $scope.InformacionAdicional($scope.datos);
                $scope.obtenernovedades($scope.datos);
                // $scope.tipoPorCedula = true;
                setTimeout(function () {
                  $('#Tab1').click();
                }, 500)
              } else {
                swal({
                  title: "¡Importante!",
                  text: "No se encontraron registros",
                  type: "warning",
                }).catch(swal.noop);
                $scope.AddFuncionario = true;
              }
            } else {
              swal({
                title: "¡Importante!",
                text: "Usuario con inconsistencia, favor reportar al area TIC nacional",
                type: "warning",
              }).catch(swal.noop);
            }
          })
        } else {
          Materialize.toast('¡Debe Completar los campos!', 3000);
          // notification.getNotification('warning', 'Debe Completar los campos', 'Notificacion');
        }
      }

      $scope.InformacionAdicional = function (data) {
        $scope.form.InputCedula = data.cedula;
        $http({
          method: 'POST',
          url: "php/talentohumano/datosbasicos/Rdatosbasicos.php",
          data: { function: "obtenerinfoadicional", id: $scope.form.InputCedula }
        }).then(function (response) {
          $scope.dataadicional = response.data;
          $scope.beneficiarios = $scope.dataadicional.beneficiarios;
        })
      }

      $scope.ObtenerUbicacion = function () {
        $http({
          method: 'POST',
          url: "php/talentohumano/datosbasicos/Rdatosbasicos.php",
          data: { function: 'obtnerubicaciones' }
        }).then(function (response) {
          $scope.ubi = response.data;
        })
      }

      $scope.obtenernovedades = function (data) {
        $scope.form.InputCedula = data.cedula;
        $http({
          method: 'POST',
          url: "php/talentohumano/datosbasicos/Rdatosbasicos.php",
          data: { function: "obtenernovedades", id: $scope.form.InputCedula }
        }).then(function (response) {
          $scope.datanovedad = response.data;
        })
      }

      $http({
        method: 'GET',
        url: "json/tiposangre.json",
        params: {}
      }).then(function (response) {
        $scope.grupossanguineos = response.data;
      })

      $http({
        method: 'GET',
        url: "json/estadocivil.json",
        params: {}
      }).then(function (response) {
        $scope.estadosciviles = response.data;
      })

      $http({
        method: 'POST',
        url: "php/talentohumano/datosbasicos/Rdatosbasicos.php",
        data: { function: 'obtnerubicaciones' }
      }).then(function (response) {
        $scope.ubi = response.data;
      })

      $scope.ObtenerDependientes = function () {
        $http({
          method: 'POST',
          url: "php/talentohumano/datosbasicos/Rdatosbasicos.php",
          data: { function: 'obtnernodependientes' }
        }).then(function (response) {
          $scope.info = response.data;
        })
      }

      $scope.setTab = function (x) {
        $scope.Tap = x;
        setTimeout(function () {
          // $scope.$apply();
        }, 500)
      }

      $scope.KeyFind_Usuario = function (keyEvent) {
        if (keyEvent.which === 13) {
          $scope.BuscarUsuarios($scope.form.InputNombre);
        }
      }

      $scope.Change = function () {
        //$scope.tipoPorCedula = !$scope.tipoPorCedula;
        $scope.Limpiarform();
        $scope.resultadoBusqueda = false;
        $scope.divInfo = false;
        $scope.img = true;

        setTimeout(function () {
          // $scope.$apply();
        }, 500)
      }

      $scope.Cerrar = function () {
        $scope.Limpiarform();
        $scope.search = true;
        $scope.resultadoBusqueda = false;
        $scope.divInfo = false;
        $scope.img = true;
        $scope.AddFuncionario = true;
        setTimeout(function () {
          // $scope.$apply();
        }, 500)
      }


      if (document.readyState !== 'loading') {
        $scope.Inicio();
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }

      $scope.FuncSelectDependiente = function (tipo, valor, select) {
        if (valor != null) {
          // $scope.unidadF = null;gruposalarial
          $http({
            method: 'POST',
            url: "php/talentohumano/datosbasicos/Rdatosbasicos.php",
            data: { function: "obtenerselects", tipo: tipo, valor: valor }
          }).then(function (response) {
            if (select == 'seccional') {
              $scope.sedes = response.data;
              $scope.form.sede = $scope.datos.length == 0 ? '' : $scope.datos.mune;
            }
            else if (select == 'unidadE') {
              $scope.unidadE = response.data;
              $scope.form.undFunc = $scope.datos.length == 0 ? '' : $scope.datos.unidad_funcional;
            } else if (select == 'unidadF') {
              $scope.unidadF = response.data;
              setTimeout(function () {
                $scope.form.cargo = $scope.datos.length == 0 ? '' : $scope.datos.cargo + '-' + $scope.datos.nivel;
                // $scope.$apply();
              }, 700);
            } else if (select == 'GrupoS') {
              $scope.form.grupos = response.data[0].nombre;
              $scope.form.codGrupoSalario = response.data[0].codigo;
            } else if (select == 'TipoEntidad') {
              console.log(response.data);
            } else if (select == 'municipios') {
              $scope.municipios = response.data;
            }
          })
        }
      }

      $scope.EditarDatos = function () {
        swal({ title: 'Obteniendo Informacion...' }).catch(swal.noop);
        swal.showLoading();

        $scope.form.status = 1;
        card1.style.width = "10px";
        $scope.TCuenta = true;
        //Seteando valores
        $scope.form.seccional = $scope.datos.dptoe;
        $scope.form.cargo = '';
        // $scope.form.jefeNomb = $scope.datos.jefe.split('-')[1];
        $scope.form.jefeCed = $scope.datos.jefe.split('-')[0];
        $scope.FuncSelectDependiente('departamentoemp', $scope.form.seccional, 'seccional');//carga sedes
        $scope.form.undEstrat = $scope.datos.unidad_estrategica;
        $scope.form.tipoCont = $scope.datos.tipo_contrato;
        $scope.form.empleador = $scope.datos.empleador;
        $scope.FuncSelectDependiente('unidadfuncional', $scope.form.undEstrat, 'unidadE');//carga unidad funcional
        $scope.FuncSelectDependiente('cargo', $scope.form.undFunc, 'unidadF'); //carga cargos
        $scope.form.tipoRemu = $scope.datos.remuneracion;
        var nacimiento = $scope.datos.fecha_ingreso.split('/');
        nacimiento = nacimiento[2] + '/' + nacimiento[1] + '/' + nacimiento[0];
        $scope.form.fechaingreso = new Date(nacimiento);
        $scope.form.fechaengreso = "";
        $scope.form.numCuentas = $scope.datos.numero_cuenta;
        $scope.form.estado = $scope.datos.estado_empleado;
        $scope.form.pTrabajo = $scope.datos.puesto_trabajo;
        $scope.form.causaIngeso = $scope.datos.causal_ingreso;
        $scope.form.banco = $scope.datos.banco;
        $scope.form.tipoCuenta = $scope.datos.tipo_cuenta;
        setTimeout(() => {
          $scope.FuncObtenerSalario('valorsalarial', $scope.form.cargo, 'c');
        }, 1500);
          setTimeout(() => {
            $scope.FuncSelectDependiente('gruposalarial', $scope.form.salario, 'GrupoS');
          }, 3000);
        setTimeout(() => {
          swal.close();
        }, 5000);
        $scope.funcTipocontrato($scope.form.tipoCont);
        setTimeout(function () {
          // $scope.$apply();
        }, 500);
      }

      $scope.Jefes = function () {
        $http({
          method: 'POST',
          url: "php/talentohumano/datosbasicos/Rdatosbasicos.php",
          data: { function: "ObtenerJefes" }
        }).then(function (response) {
          if (response.data != '') {
            $scope.jefes = response.data[0];
          }
        })
      }

      $scope.Jefes();




      $scope.Abrir_Modal_Direccion = function () {
        $('#Modal_Direccion').modal('open');
        // document.querySelector('#Dir_Actual').setAttribute("readonly", true);
        // $scope.Dir_Actual = $scope.form.direccion;
        $scope.selectViap = "";
        $scope.numeroN = "";
        $scope.selectLetra = "";
        $scope.numeroNVG = "";
        $scope.selectLetraVG = "";
        $scope.barrio = "";
        $("#direccionmodal").val('');
        setTimeout(() => {
          // $scope.$apply();
        }, 500);

      }
      $scope.changebis = function () {
        if ($scope.bis == true) {
          $scope.bistext = "BIS";
        } else {
          $scope.bistext = "";
        }
      }
      $scope.Chg_Direccion = function () {
        $("#direccionmodal").val($scope.selectViap + ' ' + $scope.numeroN + ' ' + $scope.selectLetra + ' ' + $scope.numeroNVG + ' ' + $scope.selectLetraVG);
      }
      $scope.Cargar_Dir = function () {
        $scope.form.direccion = $("#direccionmodal").val().trim();
        $scope.form.barrio = $scope.barrio;
        $scope.closeModal();
      }

      $scope.closeModal = function () {
        $('.modal').modal('close');
      }

      $scope.FuncSelectDependienteProd = function (tipo, data) {

        if (tipo == "R") {
          tipo = "arl"
        } else if (tipo == "J") {
          tipo = "cajadecompensacion"
        } else if (tipo == "C") {
          tipo = "cesantias"
        } else if (tipo == "P") {
          tipo = "pension"
        } else if (tipo == "S") {
          tipo = "salud"
        } else {
          tipo = "";
        }
        $scope.entidades = [];
        $scope.form.entidad = data == undefined ? '' : data.entidad;
        $http({
          method: 'GET',
          url: "json/talentohumano/administraciondatos/" + tipo + ".json",
          params: {}
        }).then(function (response) {
          $scope.entidades = response.data;
        });
      }


      $scope.accionesentidad = function (data) {
        $scope.entidades = [];
        $scope.bntinfoAdicional = true;
        $('#' + data.tipoentidad).removeClass('checkent');
        $('.checkent').prop('checked', false);
        if (document.getElementById(data.tipoentidad).checked == true) {
          // $scope.inactivebtnentidad=false;
          $scope.form.TipoEntidad = data.tipoentidad;
          var fecha = data.fechinicial.split('/');
          fecha = fecha[2] + '/' + fecha[1] + '/' + fecha[0];
          $scope.form.fechaInicial = new Date(fecha);
          var fecha = data.fechafinal.split('/');
          fecha = fecha[2] + '/' + fecha[1] + '/' + fecha[0];
          $scope.form.fechaFinal = new Date(fecha);
          $scope.FuncSelectDependienteProd($scope.form.TipoEntidad, data);
        }
        else {
          $scope.bntinfoAdicional = false;
          $scope.limpiarentidad();
        }
        $('#' + data.tipoentidad).addClass('checkent');
      }

      $scope.limpiarentidad = function () {
        $scope.form.TipoEntidad = "";
        $scope.form.entidad = "";
        $scope.form.fechaInicial = "";
        $scope.form.fechaFinal = "";
        $scope.bntinfoAdicional = false;
      }

      $scope.btnEditarAdicional = function (tipo) {
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/talentohumano/datosbasicos/Cdatosbasicos.php",
          data: {
            function: "logicaentidad",
            tipoentidad: $scope.form.TipoEntidad,
            entidad: $scope.form.entidad,
            finicial: $scope.form.fechaInicial.toLocaleDateString(),
            ffinal: $scope.form.fechaFinal == undefined ? '' : $scope.form.fechaFinal,
            id: $scope.form.numDoc,
            tipo: tipo
          }
        }).then(function (response) {
          swal.close();
          var data = response.data.split("-");
          var cod = data[0];
          var msg = data[1];
          switch (cod) {
            case "0":
              swal({
                title: "¡Importante!",
                text: msg,
                type: "warning",
              }).catch(swal.noop);
              //  notification.getNotification('error', mgs, 'Notificacion');
              break;
            case "1":
              swal({
                title: "¡Importante!",
                text: msg,
                type: "success",
              }).catch(swal.noop);
              $scope.limpiarentidad();
              console.log($scope.datos);
              $scope.InformacionAdicional($scope.datos);
              break;
            case "2":
              swal({
                title: "¡Importante!",
                text: msg,
                type: "warning",
              }).catch(swal.noop);
              break;
            default:
          }
        })
      }

      $scope.FuncObtenerSalario = function (tipo, valor, dato) {
        var valor2 = valor.toString().split("-");
        valor = valor2[1];
        // }
        $scope.salarios = [];
        $http({
          method: 'POST',
          url: "php/talentohumano/datosbasicos/Rdatosbasicos.php",
          data: { function: "obtenerselects", tipo: tipo, valor: valor }
        }).then(function (response) {
          $scope.salarios = response.data;
          setTimeout(function () {
            $scope.form.salario = $scope.datos.length == 0 ? '' : $scope.datos.salario.toString();
            // $scope.$apply();
          }, 500)

        })
      }

      $scope.funcTipocontrato = function (valor) {
        if (valor == 1) {
          $scope.DisableXTipoCont = false;
          document.querySelector("#formNumCuentas").classList.remove("Valid_Campo");
          document.querySelector("#formTipoCuenta").classList.remove("Valid_Campo");
          document.querySelector("#formBanco").classList.remove("Valid_Campo");
        } else {
          $scope.DisableXTipoCont = true;
          document.querySelector("#formNumCuentas").classList.remove("Valid_Campo");
          document.querySelector("#formTipoCuenta").classList.remove("Valid_Campo");
          document.querySelector("#formBanco").classList.remove("Valid_Campo");
        }
      }

      $scope.Editar_Datos_Empresarial_Validar_CamposVacios = function () {
        document.querySelectorAll(".Valid_Campo").forEach(e => {
          e.classList.remove("Valid_Campo");
        });
        return new Promise((resolve) => {
          //
          if ($scope.form.seccional == undefined || $scope.form.seccional == null || $scope.form.seccional == '') {
            document.querySelector("#form_seccional").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.form.sede == undefined || $scope.form.sede == null || $scope.form.sede == '') {
            document.querySelector("#form_sede").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.form.tipoCont == undefined || $scope.form.tipoCont == null || $scope.form.tipoCont == '') {
            document.querySelector("#form_tipoCont").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.form.empleador == undefined || $scope.form.empleador == null || $scope.form.empleador == '') {
            document.querySelector("#form_empleador").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.form.undEstrat == undefined || $scope.form.undEstrat == null || $scope.form.undEstrat == '') {
            document.querySelector("#formundEstrat").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.form.undFunc == undefined || $scope.form.undFunc == null || $scope.form.undFunc == '') {
            document.querySelector("#formundFunc").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.form.cargo == undefined || $scope.form.cargo == null || $scope.form.cargo == '') {
            document.querySelector("#formcargo").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.form.tipoRemu == undefined || $scope.form.tipoRemu == null || $scope.form.tipoRemu == '') {
            document.querySelector("#formTipoRemu").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.form.salario == undefined || $scope.form.salario == null || $scope.form.salario == '') {
            document.querySelector("#formSalario").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.form.grupos == undefined || $scope.form.grupos == null || $scope.form.grupos == '') {
            document.querySelector("#formGrupos").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.form.fechaingreso == undefined || $scope.form.fechaingreso == null || $scope.form.fechaingreso == '') {
            document.querySelector("#date2").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.DisableXTipoCont != true) {
            if ($scope.form.numCuentas == undefined || $scope.form.numCuentas == null || $scope.form.numCuentas == '') {
              document.querySelector("#formNumCuentas").classList.add("Valid_Campo"); resolve(true);
            }
            if ($scope.form.tipoCuenta == undefined || $scope.form.tipoCuenta == null || $scope.form.tipoCuenta == '') {
              document.querySelector("#formTipoCuenta").classList.add("Valid_Campo"); resolve(true);
            }
            if ($scope.form.banco == undefined || $scope.form.banco == null || $scope.form.banco == '') {
              document.querySelector("#formBanco").classList.add("Valid_Campo"); resolve(true);
            }
          }

          if ($scope.form.estado == undefined || $scope.form.estado == null || $scope.form.estado == '') {
            document.querySelector("#formEstado").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.form.pTrabajo == undefined || $scope.form.pTrabajo == null || $scope.form.pTrabajo == '') {
            document.querySelector("#formPTrabajo").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.form.causaIngeso == undefined || $scope.form.causaIngeso == null || $scope.form.causaIngeso == '') {
            document.querySelector("#formCausaIngeso").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.form.jefeCed == undefined || $scope.form.jefeCed == null || $scope.form.jefeCed == '') {
            document.querySelector("#formJefe").classList.add("Valid_Campo"); resolve(true);
          }
          resolve(false);
        });
      }

      $scope.Actualizar_Datos_Empresarial = function (tipo) {
        $scope.Editar_Datos_Empresarial_Validar_CamposVacios().then(function (result) {
          if (!result) {
            $scope.cargotemp = $scope.form.cargo.split("-");
            console.log($scope.form.jefeCed);
            $http({
              method: 'POST',
              url: "php/talentohumano/datosbasicos/Cdatosbasicos.php",
              data: {
                function: 'registrardatos',
                tipodoc: $scope.datos.tipo,
                documento: parseInt($scope.datos.cedula),
                pnombre: $scope.datos.pnombre,
                snombre: $scope.datos.snombre,
                papellido: $scope.datos.papellido,
                sapellido: $scope.datos.sapellido,
                nacimiento: $scope.datos.nacimiento,
                sexo: $scope.datos.sexo,
                estadocivil: $scope.datos.estado_civil,
                gruposanguineo: $scope.datos.rh,
                peso: $scope.datos.peso,
                estatura: $scope.datos.estatura,
                telefono: $scope.datos.telefono,
                celular: $scope.datos.celular,
                correo: $scope.datos.email_personal,
                direccion: $scope.datos.direccion,
                barrio: $scope.datos.barrio,
                rethus: $scope.datos.rethus,
                departamento: $scope.datos.dpto,
                municipio: $scope.datos.mun,
                departamentoe: $scope.form.seccional,
                municipioe: $scope.form.sede,
                tipocontrato: $scope.form.tipoCont,
                empleador: $scope.form.empleador,
                unidadestrategica: $scope.form.undEstrat,
                unidadfuncional: $scope.form.undFunc,
                cargo: $scope.cargotemp[0],
                gruposalario: parseInt($scope.form.codGrupoSalario),
                salario: parseInt($scope.form.salario),
                tiporemuneracion: $scope.form.tipoRemu,
                sedecontractual: $scope.form.sedecontractual,
                estado: $scope.form.estado,
                numerocuenta: $scope.form.numCuentas,
                tipocuenta: $scope.form.tipoCuenta,
                banco: $scope.form.banco,
                fechaingreso: $scope.form.fechaingreso,
                fechaingreso: $scope.form.fechaingreso.toLocaleDateString(),
                fechaegreso: $scope.form.fechaengreso != '' ? $scope.form.fechaengreso.toLocaleDateString() : '',
                tipo: tipo,
                puestotrabajo: $scope.form.pTrabajo,
                causalingreso: $scope.form.causaIngeso,
                causalegreso: $scope.datos.causal_egreso,
                observacion: $scope.form.observacion,
                jefe: $scope.form.jefeCed
              }
            }).then(function (response) {
              var data = response.data.split("-");
              var cod = data[0];
              var mgs = data[1];
              switch (cod) {
                case "":
                  swal('Notificacion', 'Error Al Insentar La Informacion', 'error');
                  break;
                case "0":
                  swal('Notificacion', mgs, 'erro');
                  break;
                case "1":
                  swal('Notificacion', mgs, 'success');
                  $scope.qrtipotemp = $scope.tipoDoc;
                  $scope.qrnumerobtemp = $scope.documento;
                  $scope.Limpiarform();
                  $scope.img = true;
                  $scope.btn_editInfoEmp = false;
                  $scope.resultadoBusqueda = false;
                  $scope.divInfo = false;
                  $scope.bntinfoAdicional = false;
                  $scope.AddFuncionario = true;
                  $scope.search = true;
                  // setTimeout(function () {
                  //   $scope.cargarinfopersonal('si')
                  // }, 200);
                  break;
                case "2":
                  swal('Notificacion', mgs, 'warning');
                  break;
                default:
              }
            })
          }
        });
      }

      $scope.setTab = function (x) {
        $scope.Tap = x;
        setTimeout(function () {
          // $scope.$apply();
        }, 500)
      }

      $scope.nuevoFuncionario = function () {
        const $codigo = document.querySelector("#numDoc");
        $codigo.focus();
        $scope.datos = [];
        $scope.search = false;
        $scope.Limpiarform();
        $scope.form.status = 1;
        $scope.form.status2 = 3;
        $scope.form.status3 = undefined;
        $scope.divInfo = true;
        $scope.AddFuncionario = false;
        $scope.btn_actualizar = false;
        $scope.setTab(1);
        $('#Tab1').click()
        $scope.dataadicional = [];
        $scope.datanovedad = [];
        document.getElementById('numDoc')
          .addEventListener('change', $scope.lectora, false);
      }

      $scope.guardarNuevoFuncionario = function (tipo) {
        $scope.Validar_Campos_Nuevo_Funcionario().then(function (result) {
          $scope.Editar_Datos_Empresarial_Validar_CamposVacios().then(function (result2) {
            if (!result && !result2) {
              $scope.cargotemp = $scope.form.cargo.split("-");
              $http({
                method: 'POST',
                url: "php/talentohumano/datosbasicos/Cdatosbasicos.php",
                data: {
                  function: 'registrardatos',
                  tipodoc: $scope.form.tipoDoc,
                  documento: $scope.form.numDoc,
                  pnombre: $scope.form.nombre1,
                  snombre: $scope.form.nombre2,
                  papellido: $scope.form.apellido1,
                  sapellido: $scope.form.apellido2,
                  nacimiento: $scope.form.fechaNac.toLocaleDateString(),
                  sexo: $scope.form.sexo,
                  estadocivil: $scope.form.estado_civil,
                  gruposanguineo: $scope.form.grupo_sanguineo,
                  peso: $scope.form.peso,
                  estatura: $scope.form.estatura,
                  telefono: $scope.form.telefono,
                  celular: $scope.form.celular,
                  correo: $scope.form.email,
                  direccion: $scope.form.direccion,
                  barrio: $scope.form.barrio,
                  rethus: $scope.form.rethus,
                  municipio: $scope.form.mpio,
                  departamentoe: $scope.form.seccional,
                  municipioe: $scope.form.sede,
                  tipocontrato: $scope.form.tipoCont,
                  empleador: $scope.form.empleador,
                  unidadestrategica: $scope.form.undEstrat,
                  unidadfuncional: $scope.form.undFunc,
                  cargo: $scope.cargotemp[0],
                  gruposalario: $scope.form.codGrupoSalario,
                  salario: $scope.form.salario,
                  tiporemuneracion: $scope.form.tipoRemu,
                  sedecontractual: $scope.form.sedecontractual,
                  estado: $scope.form.estado,
                  numerocuenta: $scope.form.numCuentas,
                  tipocuenta: $scope.form.tipoCuenta,
                  banco: $scope.form.banco,
                  fechaingreso: $scope.form.fechaingreso.toLocaleDateString(),
                  fechaegreso: $scope.form.fechaEgr,
                  tipo: tipo,
                  puestotrabajo: $scope.form.pTrabajo,
                  causalingreso: $scope.form.causaIngeso,
                  causalegreso: $scope.form.causaEgreso,
                  observacion: $scope.form.observacion,
                  jefe: $scope.form.jefeCed
                }
              }).then(function (response) {
                var data = response.data.split("-");
                var cod = data[0];
                var mgs = data[1];
                switch (cod) {
                  case "":
                    swal('Notificacion', 'Error Al Insentar La Informacion', 'error');
                    break;
                  case "0":
                    //notification.getNotification('error', mgs, 'Notificacion');
                    swal('Notificacion', mgs, 'erro');
                    break;
                  case "1":
                    //notification.getNotification('success', mgs, 'Notificacion');
                    swal('Notificacion', mgs, 'success');
                    setTimeout(function () {
                      $scope.BuscarUsuarios($scope.form.numDoc);
                      $scope.form.InputNombre = $scope.form.numDoc;
                    }, 1500)
                    break;
                  case "2":
                    //notification.getNotification('warning', mgs, 'Notificacion');
                    swal('Notificacion', mgs, 'warning');
                    break;
                  default:
                }
              })
            } else {
              swal({
                title: "¡Importante!",
                text: "Favor diligenciar campos obligatorios",
                type: "warning"
              }).catch(swal.noop);
            }
          });
        });
      }

      $scope.lectora = function () {
        //Parametro de configuracion de la lectora debe ser 55
        var code = '';
        var interval;
        document.addEventListener('keydown', function (event) {
          if (interval)
            clearInterval(interval);
          if (event.code == 'Enter') {
            if (code)
              handleBarcode(code);
            code = '';
            return;
          }
          if (event.key != 'Shift')
            code += event.key;
          interval = setInterval(() => code = '', 20);
        });
        function handleBarcode(x) {
          var y = x.split(',');
          console.log(y);
          $scope.form.tipoDoc = y[0].substring(0,1);
          $scope.form.numDoc = y[1].trim();
          $scope.form.nombre1 = y[4].trim();
          $scope.form.nombre2 = y[5].trim();
          $scope.form.apellido1 = y[2].trim();
          $scope.form.apellido2 = y[3].trim();
          $scope.form.fechaNac = new Date(y[7].substring(0, 4) + '/' + y[7].substring(4, 6) + '/' + y[7].substring(6, 8));
          $scope.form.sexo = y[6];

          $scope.form.grupo_sanguineo = y[8].trim();
          //document.querySelector('#barcode-last').innerHTML = x;
          // document.querySelector('#barcode-last').innerHTML = 'CC: ' + y[0] + '- Nombre Completo: ' + y[3] + ' ' + y[4] + ' ' + y[1] + ' ' + y[2] + '- Sexo: ' + y[5] + '- RH: ' + y[7].substring(0, 2) + '- Fecha Nacimiento: ' + y[6].substring(6, 8) + '/' + y[6].substring(4, 6) + '/' + y[6].substring(0, 4);
        }
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



      $scope.modalNuevoBeneficiario = function (x) {
        console.log(x);
        $('#Modal_Beneficiarios').modal('open');
        $scope.datosBeneficiarios = x;
        $scope.Hoja4_Limpiar();
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
          // $scope.$apply();
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
          // $scope.$apply();
        }, 500);
      }

      $scope.GetFecha = function (HOJA, SCOPE) {
        var ahora_ano = $scope[HOJA][SCOPE].getFullYear();
        var ahora_mes = ((($scope[HOJA][SCOPE].getMonth() + 1) < 10) ? '0' + ($scope[HOJA][SCOPE].getMonth() + 1) : ($scope[HOJA][SCOPE].getMonth() + 1));
        var ahora_dia = ((($scope[HOJA][SCOPE].getDate()) < 10) ? '0' + ($scope[HOJA][SCOPE].getDate()) : ($scope[HOJA][SCOPE].getDate()));
        return ahora_dia + '/' + ahora_mes + '/' + ahora_ano;
      }

      $scope.Hoja4_Guardar_Actualizar_Beneficiarios = function (Accion) {
        angular.forEach(document.querySelectorAll('#Hoja4 .Valid_Campo'), function (i) { i.classList.remove('Valid_Campo'); });
        $scope.Hoja4_Validar_CamposVacios().then(function (result) {
          if (!result) {
            swal({ title: 'Cargando...', allowOutsideClick: false });
            swal.showLoading();
            console.log($scope.numDoc);
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
                id: $scope.numDoc,
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

      $scope.ObtenerTabs = function () {
        $http({
          method: 'POST',
          url: "php/talentohumano/datosbasicos/Rdatosbasicos.php",
          data: { function: "obtenerinfoadicional", id: $scope.numDoc }
        }).then(function (response) {
          if (response.data.toString().substr(0, 3) != '<br') {
            $scope.dataadicional.beneficiarios = response.data.beneficiarios;
            $scope.datosBeneficiarios = response.data.beneficiarios;
          } else {
            swal(
              '¡Mensaje!',
              'Por favor, Contactar con Oficina TIC Nacional',
              'warning'
            ).catch(swal.noop);
          }
        })
      }

      $scope.openmodaldireccion = function () {
        $scope.dialogDiagreg = ngDialog.open({
          template: 'views/talentohumano/empleados/modal/modalDireccion.html',
          className: 'ngdialog-theme-plain',
          controller: 'datosempleadoscontroller',
          closeByDocument: false,
          closeByEscape: true,
          scope: $scope
        });
        $scope.dialogDiagreg.closePromise.then(function (data) {
          if (data.value != "$closeButton") {
            $scope.Act_Direccion2 = data.value;
            $scope.direccion = $scope.Act_Direccion2;
            $scope.Localaidad2 = $('#barrios').val();
            $scope.barrio = $scope.Localaidad2
          } else {
            $scope.Act_Direccion;
            $scope.barrio;
          }
        });
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
      }

      $scope.Validar_Campos_Nuevo_Funcionario = function () {
        return new Promise((resolve) => {
          if ($scope.form.tipoDoc == undefined || $scope.form.tipoDoc == null || $scope.form.tipoDoc == '') {
            document.querySelector("#tipoDoc").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.form.numDoc == undefined || $scope.form.numDoc == null || $scope.form.numDoc == '') {
            document.querySelector("#numDoc").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.form.nombre1 == undefined || $scope.form.nombre1 == null || $scope.form.nombre1 == '') {
            document.querySelector("#nombre1").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.form.apellido1 == undefined || $scope.form.apellido1 == null || $scope.form.apellido1 == '') {
            document.querySelector("#apellido1").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.form.apellido2 == undefined || $scope.form.apellido2 == null || $scope.form.apellido2 == '') {
            document.querySelector("#apellido2").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.form.fechaNac == undefined || $scope.form.fechaNac == null || $scope.form.fechaNac == '') {
            document.querySelector("#date1").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.form.sexo == undefined || $scope.form.sexo == null || $scope.form.sexo == '') {
            document.querySelector("#sexo").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.form.grupo_sanguineo == undefined || $scope.form.grupo_sanguineo == null || $scope.form.grupo_sanguineo == '') {
            document.querySelector("#gruposanguineo").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.form.estado_civil == undefined || $scope.form.estado_civil == null || $scope.form.estado_civil == '') {
            document.querySelector("#estadocivil").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.form.depto == undefined || $scope.form.depto == null || $scope.form.depto == '') {
            document.querySelector("#departamento").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.form.mpio == undefined || $scope.form.mpio == null || $scope.form.mpio == '') {
            document.querySelector("#municipios").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.form.rethus == undefined || $scope.form.rethus == null || $scope.form.rethus == '') {
            document.querySelector("#rethus").classList.add("Valid_Campo"); resolve(true);
          }
          if ($scope.form.jefeCed == undefined || $scope.form.jefeCed == null || $scope.form.jefeCed == '') {
            document.querySelector("#formJefe").classList.add("Valid_Campo"); resolve(true);
          }
          resolve(false);
        });
      }

      $scope.DescargaFile = function () {
        window.open('views/talentohumano/formatos/formato_descarga_empleados.php');
      }


    }])
