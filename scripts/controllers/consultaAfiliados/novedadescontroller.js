'use strict';
angular.module('GenesisApp')
  .controller('novedadescontroller', ['$scope', 'consultaHTTP', 'afiliacionHttp', 'notification', '$timeout', '$rootScope', '$http', '$window', '$filter', 'ngDialog', 'cfpLoadingBar',
    function ($scope, consultaHTTP, afiliacionHttp, notification, $timeout, $rootScope, $http, $window, $filter, ngDialog, cfpLoadingBar) {
      $(document).ready(function () {
        $('#modal').modal();
        setTimeout(() => {
          $scope.type = 'CC';
        }, 1500);

        //$scope.id = '1043450716';
        // 33208346
        //setTimeout(() => { $scope.busquedaAfiliado() }, 3500);

      });
      //alert("hola angie y moises")
      console.log(1);
      $scope.type = "SELECCIONAR";
      $scope.paneldatos = false;
      $scope.busqueda = false;
      $scope.btnreactivar = false;
      $scope.panelanexos = false;
      $scope.btnFinalizar = true;
      $scope.adjuntoid = false;
      $scope.adjuntosisben = false;
      $scope.adjuntofuar = false;
      $scope.datos = false;
      $scope.dsbestado = true;
      $scope.panelopciones = false;
      $scope.OcultarText = true;
      $scope.tablaretiro = false;

      $scope.id = "";

      $scope.ValidarPortabilidad = function () {
        if ($scope.new.PORTABILIDAD == true) {
          $scope.dsbmunicipio = true;
          $scope.dsbescenario = true;
        } else {
          $scope.dsbmunicipio = false;
          $scope.dsbescenario = false;
        }
      }


      $scope.Obtener_Tipos_Documentos = function () {
        $http({
          method: 'POST',
          url: "php/genesis/funcgenesis.php",
          data: {
            function: 'Obtener_Tipos_Documentos',
            Tipo: 'S'
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.Tipos_Documentos = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.Obtener_Tipos_Documentos();

      //Abrir Modal
      $scope.AbrirModal = function (info) {
        $('#modal').modal('open');
      }
      $scope.EnviarInformacion = function (data, nacimiento) {
        swal({ title: 'Enviando Informacion....' });
        swal.showLoading();
        $scope.datos = JSON.stringify(data);
        $scope.nacimiento = nacimiento;
        $http({
          method: 'POST',
          url: "php/novedades/funcnovedades.php",
          data: {
            function: 'guardar_info_temp', documento: $scope.id, tipo_documento: $scope.type,
            datos: $scope.datos, fecha_nacimiento: $scope.nacimiento
          }
        }).then(function (res) {
          $scope.respueta = res.data;
          if ($scope.respueta.codigo == '0') {
            swal.close();
            $scope.info = {};
            $scope.busquedaAfiliado();
            swal('Exitosamente', $scope.respueta.mensaje, 'success');
            $('#modal').modal('close');
          } else {
            swal.close();
            swal('Error', $scope.respueta.mensaje, 'error');
          }
        })
      }
      $scope.ModalDigitalizacion = function (numero) {
        $scope.paquete = numero;
        $scope.tipo_documento = $scope.type;
        $scope.documento = $scope.id;
        $scope.TipoRes = 'NO';
        ngDialog.open({
          template: 'views/digitalizacion/modal/cargaanexo.html',
          className: 'ngdialog-theme-plain',
          controller: 'DigitalizacionController',
          scope: $scope
        })
      }
      $rootScope.$on('Novedades', function (event, args) {
        if (args == '0') {
          if ($scope.ret == 'R') {
            $http({
              method: 'POST',
              url: "php/novedades/funcnovedades.php",
              data: {
                function: 'retirarafil',
                type: $scope.type,
                id: $scope.id,
                retiro: $scope.motivoretiro,
                radicado: $scope.radicado,
                num_tutela: $scope.num_tutela,
                fecha_retiro: $scope.fecha_retiro
              }
            }).then(function (res) {
              if (res.data.MENSAJE == '1') {
                swal('Notificación', 'Cambios realizados correctamente', 'success');
                //$window.open('views/consultaafiliados/soportes/fuar.php?tipo=' + $scope.new.TIPODOCUMENTO + '&id=' + $scope.new.DOCUMENTO + '&ori=N', '_blank', "width=1080,height=1100");
                $scope.new = {};
                $scope.busquedaAfiliado();
              } else {
                notification.getNotification('error', res.data, 'Notificación');
              }
            })
          } else {
            $scope.guardacambiosIA();
          }
        }
      });
      //$scope.new = {tipo_documento : '0', sexo : '0'};
      $scope.obtenerDocumento = function () {
        consultaHTTP.obtenerDocumento().then(function (response) {
          $scope.Documentos = response;
        })
      }
      // $scope.obtenerGrupoPoblacional = function () {
      //    $http({
      //       method: 'POST',
      //       url: "php/aseguramiento/Rafiliacion.php",
      //       data: { function: 'obteneragrupoPoblacional' }
      //    }).then(function (response) {
      //       $scope.Gpoblacional = response.data;
      //    });
      // }
      $scope.obtenerZona = function () {
        afiliacionHttp.obtenerZona().then(function (response) {
          $scope.Zonas = response;
        })
      }
      $scope.obtenerMunicipios = function () {
        $scope.function = 'cargamunicipios';
        $http({
          method: 'POST',
          url: "php/novedades/funcnovedades.php",
          data: { function: $scope.function }
        }).then(function (response) {
          $scope.Municipios = response.data;
        });
      }
      $scope.obtenerEscenarios = function () {
        $http({
          method: 'POST',
          url: "php/novedades/funcnovedades.php",
          data: { function: 'obtenerescenarios', ubicacion: $scope.new.MUNICIPIO, regimen: $scope.new.REGIMEN }
        }).then(function (response) {
          $scope.Escenarios = response.data;
          if ($scope.municipioactual == $scope.new.MUNICIPIO) {
            if ($scope.Escenarios.length === 1) {
              $scope.new.ESCENARIO = $scope.Escenarios[0].CODIGO;
            } else {
              $scope.new.ESCENARIO = $scope.escenarioactual;
            }
          } else {
            $scope.new.ESCENARIO = $scope.Escenarios[0].CODIGO;
          }
        });
      }
      $scope.solobusqueda = function () {
        $scope.new = {}
        $scope.paneldatos = false;
        $scope.panelcomplementarios = false;
        $scope.panelanexos = false;
        $scope.panelopciones = false;
      }
      $scope.habilall = function () {
        $scope.dsbnombres = false;
        $scope.dsbsexo = false;
        $scope.dsbmunicipio = false;
        $scope.dsbescenario = false;
        $scope.dsbnacimiento = false;
        $scope.dsbid = false;
        $scope.dsbsisben = false;
      }
      $scope.dsball = function () {
        $scope.dsbnombres = true;
        $scope.dsbsexo = true;
        $scope.dsbmunicipio = true;
        $scope.dsbescenario = true;
        $scope.dsbnacimiento = true;
        $scope.dsbid = true;
        $scope.dsbsisben = true;
      }
      $scope.busquedaAfiliado = function () {
        if ($scope.type == "SELECCIONAR" || $scope.type == '' || !$scope.type) {
          notification.getNotification('info', 'Seleccione tipo de documento', 'Notificacion');
        } else if ($scope.id === undefined || $scope.id == "") {
          notification.getNotification('error', 'Ingrese número de identificación', 'Notificacion');
        } else {
          $scope.new = {};
          $http({
            method: 'POST',
            url: "php/novedades/funcnovedades.php",
            data: { function: 'buscaafiliado', type: $scope.type, id: $scope.id }
          }).then(function (res) {
            if (res.data.MENSAJE == 1) {
              $scope.btncancelar = false;
              $scope.paneldatos = true;
              $scope.panelcomplementarios = true;
              $scope.panelanexos = false;
              $scope.panelopciones = true;
              $scope.new = res.data;
              $scope.info = res.data;
              $scope.infotemp = res.data;
              $scope.municipioactual = $scope.new.MUNICIPIO;
              $scope.escenarioactual = $scope.new.ESCENARIO;
              $scope.new.fichasisbenasig = $scope.new.FICHASISBEN;
              $scope.new.nivelsisbenasig = $scope.new.NIVELSISBEN;
              $scope.infotemp_GPOBLACIONAL = res.data.GPOBLACIONAL;
              $scope.infotemp_SUBGRUPO_SISBENIV = res.data.SUBGRUPO_SISBENIV;
              $scope.infotemp_CAUSAL_OFICIO = res.data.CAUSAL_OFICIO.split('-')[0];
              $scope.new.tipo_novedad = 1;

              // if ($scope.new.GPOBLACIONAL == "8" || $scope.new.GPOBLACIONAL == "9") {
              //    $scope.dsbsisben = true;
              // } else {
              //    $scope.dsbsisben = false;
              // }
              $scope.obtenerEscenarios();
              var parts = $scope.new.NACIMIENTO.split('-');
              var fecha_nacimiento = new Date(parts[1] + '-' + parts[0] + '-' + parts[2]);
              $scope.new.NACIMIENTO = fecha_nacimiento;
              $scope.ValidarMetodoGPob();
              //
              $scope.tipodoc_ACB = '';
              $scope.doc_ACB = '';
              $scope.tipoafiliado_ACB = '';
              $scope.parentesco_ACB = '';
              $scope.discapacidad_ACB = '';
              //
              $scope.tipoafiliado_CBC = '';

              //
              setTimeout(function () { $scope.$apply(); }, 500);
              if ($scope.new.REG == 'V') {
                if ($scope.new.TIPODOCUMENTO == "TI" || $scope.new.TIPODOCUMENTO == "RC") {
                  $scope.OcultarText = true;
                  $scope.habilall();
                } else {
                  $scope.OcultarText = false;
                  $scope.habilall();
                  $scope.dsbid = true;
                  $scope.dsbnombres = true;
                  $scope.dsbsexo = true;
                  $scope.dsbnacimiento = true;
                }
              } else {
                $scope.habilall();
              }
              $scope.ValidarPortabilidad();
            } else {
              notification.getNotification('info', res.data.MENSAJE, 'Notificación');
              $scope.paneldatos = false;
              $scope.panelcomplementarios = false;
              $scope.panelanexos = false;
              $scope.panelopciones = false;
            }
            if (($scope.new.ESTADO == 'RE' || $scope.new.ESTADO == 'AF') || ($scope.new.ESTADO == 'IN' && ($scope.new.ESTADOBDUA == "EL" || $scope.new.ESTADOBDUA == "NE"))) {
              $scope.btnreactivar = true;
              $scope.btncancelar = true;
              $scope.btncambiodir = true;
              $scope.btnretiro = true;
              $scope.btnguardarcambios = true;
              $scope.alldata = true;
            } else {
              $scope.btnreactivar = false;
              $scope.btncancelar = false;
              $scope.btncambiodir = false;
              $scope.btnretiro = false;
              $scope.btnguardarcambios = false;
              $scope.alldata = false;
            }
          })
        }
      }
      $rootScope.$on('ngDialog.closed', function (e, $dialog) {
        if ($scope.activa == 1) {
          $scope.activa = 0;
          $scope.busquedaAfiliado();
        }
      });

      $scope.tipodoc_ACB = '';
      $scope.doc_ACB = '';
      $scope.tipoafiliado_ACB = '';
      $scope.parentesco_ACB = '';
      $scope.discapacidad_ACB = '';
      //
      $scope.tipoafiliado_CBC = '';

      $scope.listar_Parentesco_ACB = function () {
        if ($scope.tipoafiliado_ACB == 'A' || $scope.tipoafiliado_ACB == 'B') {
          $http({
            method: 'POST',
            url: "php/novedades/funcnovedades.php",
            data: { function: 'p_parentesco_acb', tipo: $scope.tipoafiliado_ACB }
          }).then(function ({ data }) {
            $scope.list_parentesco_ACB = data;
          });
        } else {
          $scope.tipodoc_ACB = $scope.type;
          $scope.doc_ACB = $scope.id;
          setTimeout(() => { $scope.$apply(); }, 500);
        }
      }
      $scope.listar_condiciondis_ACB = function () {
        $http({
          method: 'POST',
          url: "php/novedades/funcnovedades.php",
          data: { function: 'p_listar_condicion_dicapacidad' }
        }).then(function ({ data }) {
          $scope.listar_condiciondis_ACB = data;
        });
      }
      $scope.listar_condiciondis_ACB();

      $scope.validarTipoACB = function () {
        if (!$scope.tipodoc_ACB || !$scope.doc_ACB) { return }
        $http({
          method: 'POST',
          url: "php/novedades/funcnovedades.php",
          data: {
            function: 'p_mostrar_datos_acb',
            tipoDoc: $scope.type,
            doc: $scope.id,
            tipoDocCab: $scope.tipodoc_ACB,
            docCabeza: $scope.doc_ACB,
          }
        }).then(function ({ data }) {
          console.log(data);
          if (data != '0' && data.length > 0) {
            $scope.tipoafiliado_ACB = data[0].TIPO;
            $scope.discapacidad_ACB = data[0].DISCAPACIDAD;
            $scope.listar_Parentesco_ACB();
            setTimeout(() => {
              $scope.parentesco_ACB = data[0].PARENTESCO;
              setTimeout(() => { $scope.$apply(); }, 500);
            }, 1000);
          } else {
            swal('Notificación', 'No existen registros', 'info');
          }
          // 33208346
          // $scope.parentesco_ACB = '';
          // $scope.discapacidad_ACB = '';
          // $scope.tipoafiliado_CBC = '';
        });
      }



      $scope.validaform_ACB = function () {
        return new Promise((resolve) => {
          //
          if ($scope.tipodoc_ACB == undefined || $scope.tipodoc_ACB == null || $scope.tipodoc_ACB == '') {
            resolve(false);
          }
          if ($scope.doc_ACB == undefined || $scope.doc_ACB == null || $scope.doc_ACB == '') {
            resolve(false);
          }
          if ($scope.tipoafiliado_ACB == undefined || $scope.tipoafiliado_ACB == null || $scope.tipoafiliado_ACB == '') {
            resolve(false);
          }
          if ($scope.tipoafiliado_ACB != 'F') {
            if ($scope.parentesco_ACB == undefined || $scope.parentesco_ACB == null || $scope.parentesco_ACB == '') {
              resolve(false);
            }
          }
          if ($scope.discapacidad_ACB == undefined || $scope.discapacidad_ACB == null || $scope.discapacidad_ACB == '') {
            resolve(false);
          }
          resolve(true);
        })
      }

      $scope.guarda_ACB = function () {
        $scope.validaform_ACB().then(function (result) {
          if (result) {
            swal({ title: 'Cargando...', allowOutsideClick: false });
            swal.showLoading();
            $http({
              method: 'POST',
              url: "php/novedades/funcnovedades.php",
              data: {
                function: 'p_acb_agrega_ben_acb',
                tipo_doc: $scope.type,
                numero_doc: $scope.id,
                tipo_doc_cabeza: $scope.tipodoc_ACB,
                numero_doc_cabeza: $scope.doc_ACB,
                tipo_afi: $scope.tipoafiliado_ACB,
                parentesco: $scope.parentesco_ACB,
                discapacidad: $scope.discapacidad_ACB
              }
            }).then(function ({ data }) {
              if (data.toString().substr(0, 3) != '<br') {
                if (data.codigo == 0) {
                  swal('Notificación', 'Cambios realizados correctamente', 'success');
                } else {
                  swal('Notificación', data.mensaje, 'info');
                }
              } else {
                swal('Notificación', data, 'warning');
              }
            });
          } else {
            swal('Notificación', 'Debe diligenciar los campos', 'warning');
          }
        });
      }


      $scope.validadocs_ACB_CBC = function () {
        if ($scope.new.tipo_novedad == 2) {
          $scope.guarda_ACB();
        }
      }

      $scope.activar = function () {
        sessionStorage.setItem("tipo", $scope.type);
        sessionStorage.setItem("doc", $scope.id);
        ngDialog.open({
          template: 'views/afiliados/modal/modaldatoscontacto.html',
          className: 'ngdialog-theme-plain',
          controller: 'modaldatoscontactoController',
          scope: $scope,
          closeByEscape: false,
          closeByDocument: false
        }).closePromise.then(function () {
          $scope.activar2();
        });


        // $scope.editarinfo();
        // $scope.activa = 1;
        // ngDialog.open({
        //    template: 'views/novedades/causalingreso.html',
        //    className: 'ngdialog-theme-plain',
        //    controller: 'reactivacontroller',
        //    scope: $scope
        // });
        // $scope.donecambio.closePromise.then(function () {
        //    $scope.activar();
        // });
      }





      $scope.activar2 = function () {
        ngDialog.open({
          template: 'views/novedades/causalingreso.html',
          className: 'ngdialog-theme-plain',
          controller: 'reactivacontroller',
          scope: $scope
        });
      }


      $scope.validasisben = function () {
        if ($scope.new.NIVELSISBEN > 2) {
          $scope.new.NIVELSISBEN = "";
        }
      }
      $scope.ValidarMetodoGPob = function () {
        $scope.new.METODOLOGIA_G_POBLACIONAL = $scope.info.METODOLOGIA_G_POBLACIONAL.split('-')[0];
        $scope.obtenerGrupoPoblacional(1);
        if ($scope.info.METODOLOGIA_G_POBLACIONAL.split('-')[0] == '1') {
          $scope.new.GRUPO_SISBENIV = '';
          $scope.new.SUBGRUPO_SISBENIV = '';
          $scope.new.CAUSAL_OFICIO = '';
        }
        if ($scope.info.METODOLOGIA_G_POBLACIONAL.split('-')[0] == '2') {
          $scope.new.PUNTAJE_SISBEN = '';
          $scope.new.NIVELSISBEN = '';
          $scope.new.CAUSAL_OFICIO = '';
          $scope.CalcularSubgrupoSisben(1);
        }
        if ($scope.info.METODOLOGIA_G_POBLACIONAL.split('-')[0] == '3') {
          $scope.new.FICHASISBEN = '';
          $scope.new.PUNTAJE_SISBEN = '';
          $scope.new.NIVELSISBEN = '';
          $scope.new.GRUPO_SISBENIV = '';
          $scope.new.SUBGRUPO_SISBENIV = '';
          $scope.new.CAUSAL_OFICIO = '';
        }
        if ($scope.info.METODOLOGIA_G_POBLACIONAL.split('-')[0] == '4') {
          $scope.new.CAUSAL_OFICIO = '';
        }
      }
      $scope.validar_sisben = function () {
        return new Promise((resolve) => {
          if ($scope.new.METODOLOGIA_G_POBLACIONAL == '' || $scope.new.METODOLOGIA_G_POBLACIONAL == null) {
            swal('Información', 'Debe seleccionar la Metodologia Grupo Poblacional.', 'info'); return;
          }
          if ($scope.new.METODOLOGIA_G_POBLACIONAL == '1') { //SISBEN III
            if ($scope.new.FICHASISBEN == '' || $scope.new.FICHASISBEN == null) {
              swal('Información', 'Debe digitar la Ficha de SISBEN.', 'info'); return;
            }
            if ($scope.new.GPOBLACIONAL == '' || $scope.new.GPOBLACIONAL == null) {
              swal('Información', 'Debe seleccionar el Grupo Poblacional.', 'info'); return;
            }
            if ($scope.new.NIVELSISBEN == '' || $scope.new.NIVELSISBEN == null) {
              swal('Información', 'Debe digitar el Nivel del SISBEN.', 'info'); return;
            }
            if ($scope.new.PUNTAJE_SISBEN == '' || $scope.new.PUNTAJE_SISBEN == null) {
              swal('Información', 'Debe digitar el Nivel del SISBEN', 'info'); return;
            }
          }
          if ($scope.new.METODOLOGIA_G_POBLACIONAL == '2') { //SISBEN IV
            if ($scope.new.FICHASISBEN == '' || $scope.new.FICHASISBEN == null) {
              swal('Información', 'Debe digitar la Ficha de SISBENIV.', 'info'); return;
            }
            if ($scope.new.FICHASISBEN.length != 20) {
              swal('Información', 'La Ficha de SISBENIV debe contener 20 digitos.', 'info'); return;
            }
            if ($scope.new.GPOBLACIONAL == '' || $scope.new.GPOBLACIONAL == null) {
              swal('Información', 'Debe seleccionar el Grupo Poblacional.', 'info'); return;
            }
            if ($scope.new.GRUPO_SISBENIV == '' || $scope.new.GRUPO_SISBENIV == null) {
              swal('Información', 'Debe seleccionar el Grupo de SISBEN IV.', 'info'); return;
            }
            if ($scope.new.SUBGRUPO_SISBENIV == '' || $scope.new.SUBGRUPO_SISBENIV == null) {
              swal('Información', 'Debe seleccionar el Subgrupo de SISBEN IV.', 'info'); return;
            }
          }
          if ($scope.new.METODOLOGIA_G_POBLACIONAL == '3') { //Listado Censales
            if ($scope.new.GPOBLACIONAL == '' || $scope.new.GPOBLACIONAL == null) {
              swal('Información', 'Debe seleccionar el Grupo Poblacional.', 'info'); return;
            }
          }
          if ($scope.new.METODOLOGIA_G_POBLACIONAL == '4') { //Afiliacion Oficio
            if ($scope.new.GPOBLACIONAL == '' || $scope.new.GPOBLACIONAL == null) {
              swal('Información', 'Debe seleccionar el Grupo Poblacional.', 'info'); return;
            }
            if ($scope.new.GPOBLACIONAL == '31') {
              if ($scope.new.CAUSAL_OFICIO == '' || $scope.new.CAUSAL_OFICIO == null) {
                swal('Información', 'Debe seleccionar causal de afiliacion de oficio.', 'info'); return;
              }
            }
          }
          resolve(false);
        });
      }
      $scope.validadocs = function () {
        //console.log($scope.new);
        if ($scope.new.PRIMERNOMBRE == "" || $scope.new.PRIMERAPELLIDO == "" || $scope.new.DOCUMENTO == "") {
          swal('Notificación', 'Verificar los datos', 'info');
        } else if ($scope.new.novedadCBC && $scope.tipoafiliado_CBC == '') {
          swal('Notificación', 'Novedad CBC: Debe seleccionar el tipo de afiliado', 'info');
        } else {
          $scope.validar_sisben().then(function (result) {
            if (!result) {
              $scope.new.F_NACIMIENTO = $filter('date')(new Date($scope.new.NACIMIENTO), 'dd/MM/yyyy');
              $scope.petvalida();
            }
          });
        }
      }
      $scope.petvalida = function () {
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/novedades/funcnovedades.php",
          data: {
            function: 'validadocs',
            type: $scope.type,
            id: $scope.id,
            p_nombre: $scope.new.PRIMERNOMBRE,
            s_nombre: $scope.new.SEGUNDONOMBRE,
            p_apellido: $scope.new.PRIMERAPELLIDO,
            s_apellido: $scope.new.SEGUNDOAPELLIDO,
            sexo: $scope.new.SEXO,
            municipio: $scope.new.MUNICIPIO,
            escenario: $scope.new.ESCENARIO,
            f_nacimiento: $scope.new.F_NACIMIENTO,
            estado: $scope.new.ESTADO,
            t_documento: $scope.new.TIPODOCUMENTO,
            n_documento: $scope.new.DOCUMENTO,
            ficha_sisben: $scope.new.FICHASISBEN,
            n_sisben: $scope.new.NIVELSISBEN,
            discapacidad: $scope.new.DISCAPACIDAD,
            gpoblacional: $scope.new.GPOBLACIONAL,
            zona: $scope.new.ZONA,
            causal: 'N',
            reactiva: 'N',
            metodologia_grup_pob: $scope.new.METODOLOGIA_G_POBLACIONAL,
            grupo_sisbeniv: $scope.new.GRUPO_SISBENIV,
            subgrupo_sisbeniv: $scope.new.SUBGRUPO_SISBENIV,
            causal_oficio_sisbeniv: $scope.new.CAUSAL_OFICIO,
            puntajesisben: $scope.new.PUNTAJE_SISBEN
          }
        }).then(function (res) {
          swal.close();
          if (res.data.ID == false && res.data.SISBEN == false && res.data.FUAR == false && res.data.SISBENAVAL == false && res.data.CERTMEDICO == false) {
            if (res.data.CAMBIOZONA == true) {
              $scope.cambiardir();
              $scope.donecambio.closePromise.then(function () {
                $scope.petguarda();
              });
            } else if (res.data.ESCENARIO == true) {
              $scope.panelopciones = false;
              $scope.panelanexos = true;
              $scope.CambioIpsFormato();
            } else {
              $scope.panelanexos = false;
              swal('Notificación', 'No se han hecho cambios', 'info');
            }
          } else {
            $scope.adjuntoid = res.data.ID;
            $scope.adjuntosisben = res.data.SISBEN;
            $scope.adjuntofuar = res.data.FUAR;
            $scope.adjuntosisbenaval = res.data.SISBENAVAL;
            $scope.adjuntocertmedico = res.data.CERTMEDICO;
            $scope.adjuntoafilreg = false;
            $scope.adjuntocertdefuncion = false;
            $scope.panelopciones = false;
            $scope.panelanexos = true;
            // $scope.habilitafin();
          }
        })

      }
      $scope.hideanexos = function () {
        $scope.adjuntoid = false;
        $scope.adjuntosisben = false;
        $scope.adjuntofuar = false;
        $scope.adjuntosisbenaval = false;
        $scope.adjuntocertmedico = false;
        $scope.adjuntoafilreg = false;
        $scope.adjuntocertdefuncion = false;
      }
      $scope.habilitafin = function () {
        if (
          ($("#docid")[0].value == "" && $scope.adjuntoid == true)
          || ($("#docsisben")[0].value == "" && $scope.adjuntosisben == true)
          || ($("#docsisben2")[0].value == "" && $scope.adjuntosisbenaval == true)
          || ($("#docfuar")[0].value == "" && $scope.adjuntofuar == true)
          || ($("#doccertmedico")[0].value == "" && $scope.adjuntocertmedico == true)
          || ($("#doccertafilreg")[0].value == "" && $scope.adjuntoafilreg == true)
          || ($("#doccertdefuncion")[0].value == "" && $scope.adjuntocertdefuncion == true)
        ) {
          $scope.btnFinalizar = true;
        } else {
          $scope.btnFinalizar = false;
        }
      }
      $scope.cambiardir = function () {
        $scope.nombre_afiliado = $scope.new.PRIMERNOMBRE + ' ' + $scope.new.PRIMERAPELLIDO;
        // $scope.tipo_documento = $scope.new.TIPODOCUMENTO;
        //$scope.documento = $scope.new.DOCUMENTO;
        $scope.tipo_documento = $scope.type;
        $scope.documento = $scope.id;
        $scope.donecambio = ngDialog.open({
          template: 'views/consultaAfiliados/modaleditardatos.html',
          className: 'ngdialog-theme-plain',
          controller: 'editardatosctrl',
          scope: $scope
        });
      }
      $scope.cambiodir = function () {
        var modaldir = ngDialog.open({
          template: 'views/consultaAfiliados/modaleditardatos.html',
          className: 'ngdialog-theme-plain',
          controller: 'editardatosctrl',
          closeByEscape: false,
          closeByDocument: false,
          scope: $scope
        });
        modaldir.closePromise.then(function (data) {
          if (data.value != '$closeButton') {
            $scope.new.DIRECCION = data.value;
          }
          $scope.petguarda();
        });
      }
      $scope.guardacambiosIA = function () {
        $scope.nombre_afiliado = $scope.new.PRIMERNOMBRE + ' ' + $scope.new.PRIMERAPELLIDO;
        $scope.tipo_documento = $scope.new.TIPODOCUMENTO;
        $scope.documento = $scope.new.DOCUMENTO;
        $scope.new.F_NACIMIENTO = $filter('date')(new Date($scope.new.NACIMIENTO), 'dd/MM/yyyy');
        if ($scope.dsbescenario == false) {
          $scope.cambiodir();
        } else {
          $scope.petguarda();
        }
      }
      $scope.retirarafil = function () {
        $scope.hideanexos();
        swal({
          title: 'Seleccionar Motivode Retiro',
          input: 'select',
          inputOptions: {
            'RDC': 'RETIRO DE AFILIADO DOCENTE O MAGISTERIO',
            'RFM': 'RETIRO DE AFILIADO FUERZAS MILITARES',
            'REX': 'RETIRO DE AFILIADO REGIMEN DE EXCEPCION',
            'N09': 'RETIRO POR MUERTE',
            'N14': 'RETIRO POR TUTELA'
          },
          inputPlaceholder: 'SELECCIONAR',
          showCancelButton: true
        }).then(function (result) {
          $scope.motivoretiro = result;
          $scope.adjuntoafilreg = false;
          $scope.adjuntodefuncion = false;
          if (result == 'RDC') {
            $scope.adjuntoafilreg = true;
            $scope.adjuntocertdefuncion = false;
          } else if (result == 'RFM') {
            $scope.adjuntoafilreg = true;
            $scope.adjuntocertdefuncion = false;
          } else if (result == 'N09') {
            $scope.adjuntocertdefuncion = true;
            $scope.adjuntoafilreg = false;
          } else if (result == 'REX') {
            $scope.adjuntoafilreg = true;
            $scope.adjuntocertdefuncion = false;
          } else if (result == 'N14') {
            $scope.adjuntoafilreg = true;
            $scope.adjuntocertdefuncion = true;
          }
          $scope.FechaRetiro();
        })
      }


      $scope.FechaRetiro = function () {
        swal({
          title: 'Ingrese fecha retiro (DD/MM/YYYY)',
          input: 'text',
          inputPlaceholder: '(DD/MM/YYYY)',
          showCancelButton: true
        }).then(function (result) {
          $scope.fecha_retiro = result;
          $timeout(function () {
            $scope.isretiro();
          }, 500);


        })
      }



      $scope.isretiro = function () {
        if ($scope.motivoretiro == 'N14') {
          $scope.tablaretiro = true;
          $scope.panelopciones = false;
          $timeout(function () {
            $scope.ListarInformacion();
          }, 500);
        } else {
          $scope.panelanexos = true;
          $scope.panelopciones = false;
        }
        $scope.ret = 'R';

      }
      $scope.ListarInformacion = function (estado) {
        if (estado == 'destruir') {
          swal({ title: 'Cargando Informacion' });
          swal.showLoading();
        }
        $http({
          method: 'POST',
          url: "php/novedades/funcnovedades.php",
          data: { function: 'obtenerTutelasNovedad', municipio: '', rol: '90' }
        }).then(function (response) {
          if (response.data.length > 0) {
            if (estado == 'destruir') {
              $scope.tableinformacion.destroy();
            }
            $scope.informacion = response.data;
            $scope.cantidad = response.data.length;
            setTimeout(function () {
              $scope.tableinformacion = $('#informacion').DataTable({
                //dom: 'Bfrtip',
                // responsive: true,
                //buttons: ['copy', 'csv', 'excel', 'print'],
                language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
                lengthMenu: [[10, 50, -1], [10, 50, 'Todas']],
                order: [[0, "asc"]]
              });
              swal.close();
            }, 500);
          } else {
            swal('Genesis informa', 'No hay Informacion para Mostrar', 'warning');
          }
        });
      }

      $scope.NovTutelas = function (datos) {
        $scope.tablaretiro = false;
        $scope.panelanexos = true;
        $scope.panelopciones = false;
        $scope.radicado = datos.radicado;
        $scope.num_tutela = datos.numero;
      }
      $scope.selectGPoblacional = function () {
        if ($scope.new.GPOBLACIONAL == "8" || $scope.new.GPOBLACIONAL == "9") {
          $scope.new.FICHASISBEN = null;
          $scope.new.NIVELSISBEN = 0;
          $scope.dsbsisben = true;
        } else {
          $scope.dsbsisben = false;
          $scope.new.FICHASISBEN = $scope.new.fichasisbenasig;
          $scope.new.NIVELSISBEN = $scope.new.nivelsisbenasig;
        }
      }
      $scope.petguarda = function () {
        swal({ title: 'Guardando...' });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/novedades/funcnovedades.php",
          data: {
            function: 'guardacambiosIA',
            type: $scope.type,
            id: $scope.id,
            p_nombre: $scope.new.PRIMERNOMBRE,
            s_nombre: $scope.new.SEGUNDONOMBRE,
            p_apellido: $scope.new.PRIMERAPELLIDO,
            s_apellido: $scope.new.SEGUNDOAPELLIDO,
            sexo: $scope.new.SEXO,
            municipio: $scope.new.MUNICIPIO,
            escenario: $scope.new.ESCENARIO,
            f_nacimiento: $scope.new.F_NACIMIENTO,
            estado: $scope.new.ESTADO,
            t_documento: $scope.new.TIPODOCUMENTO,
            n_documento: $scope.new.DOCUMENTO,
            ficha_sisben: $scope.new.FICHASISBEN,
            n_sisben: $scope.new.NIVELSISBEN,
            direccion: $scope.new.DIRECCION,
            discapacidad: $scope.new.DISCAPACIDAD,
            gpoblacional: $scope.new.GPOBLACIONAL,
            zona: $scope.new.ZONA,
            causal: 'N',
            reactiva: 'N',
            metodologia_grup_pob: $scope.new.METODOLOGIA_G_POBLACIONAL,
            grupo_sisbeniv: $scope.new.GRUPO_SISBENIV,
            subgrupo_sisbeniv: $scope.new.SUBGRUPO_SISBENIV,
            causal_oficio_sisbeniv: $scope.new.CAUSAL_OFICIO,
            puntajesisben: $scope.new.PUNTAJE_SISBEN,
            novedad_cbc: $scope.new.novedadCBC ? 'S' : 'N'
          }
        }).then(function (res) {
          if (res.data.MENSAJE == '1') {
            swal('Notificación', 'Cambios realizados correctamente', 'success');
            $window.open('views/consultaafiliados/soportes/fuar.php?tipo=' + $scope.new.TIPODOCUMENTO + '&id=' + $scope.new.DOCUMENTO + '&ori=N', '_blank', "width=1080,height=1100");
            $scope.new = {};
            $scope.busqueda = false;
            $scope.paneldatos = false;
            $scope.panelcomplementarios = false;
            $scope.panelanexos = false;
            $scope.panelopciones = false;
            //$('#frmAnexos')[0].reset();
          } else {
            swal('Notificación', res.data, 'error');
          }
        })
      }
      $scope.subedocs = function () {
        var img = new FormData($("#frmAnexos")[0]);
        $.ajax({
          url: "php/novedades/uploadanexos.php",
          type: "POST",
          data: img,
          contentType: false,
          processData: false,
          dataType: 'json'
        }).done(function (data) {
          if (data.IDRES == 1 || data.SISBENRES == 1 || data.FUARRES == 1 || data.CERTMEDICORES == 1 || data.SISBENRES2 == 1) {
            $scope.guardacambiosIA();
          } else if (data.CERTAFILREG == 1 || data.CERTDEFUNCIONRES == 1) {
            $http({
              method: 'POST',
              url: "php/novedades/funcnovedades.php",
              data: {
                function: 'retirarafil',
                type: $scope.type,
                id: $scope.id,
                retiro: $scope.motivoretiro
              }
            }).then(function (res) {
              if (res.data.MENSAJE == '1') {
                swal('Notificación', 'Cambios realizados correctamente', 'success');
                //$window.open('views/consultaafiliados/soportes/fuar.php?tipo=' + $scope.new.TIPODOCUMENTO
                // + '&id=' + $scope.new.DOCUMENTO
                //+ '&ori=N', '_blank', "width=1080,height=1100");
                $scope.new = {};
                $scope.busquedaAfiliado();
                $('#frmAnexos')[0].reset();
              } else {
                swal('Notificación', res.data, 'error');
              }
            })
          }
        });
      }

      $scope.CargarSoporte = function () {
        if ($scope.new.GPOBLACIONAL == '5') {
          $scope.ConsultaSisben($scope.type, $scope.id);
        } else {
          swal('Notificacion', 'No Pertenece Al Grupo Poblacional Del Sisben', 'info');
        }
      }

      $scope.ConsultaSisben = function (TDocumento, Documento) {

        swal({ title: 'Consultando Informacion...' });
        swal.showLoading();
        afiliacionHttp.serviceFDC(TDocumento, Documento, 'ObtenerSisben').then(function (response) {
          var sisben = response.data;
          $scope.infosisben = sisben;
          $scope.Nombres = sisben.Nombres;
          $scope.Apellidos = sisben.Apellidos;
          $scope.TipoDocumentoSisben = sisben.TipoDocumento;
          $scope.DocumentoSisben = sisben.Documento;
          $scope.Sisben = sisben.Nivel;
          $scope.PuntajeSisben = sisben.Puntaje;
          $scope.FichaSisben = sisben.Ficha;
          $scope.CodigoMunicipio = sisben.CodigoMunicipio;
          $scope.Area = sisben.Area;
          $scope.Municipio = sisben.Municipio;
          $scope.FechaModificacion = sisben.FechaModificacion;
          $scope.FechaModificacionPersona = sisben.FechaModificacionPersona;
          $scope.Departamento = sisben.Departamento;
          $scope.Antiguedad = sisben.Antiguedad;
          $scope.Estado = sisben.Estado;
          $scope.AdminNombre = sisben.AdminNombre;
          $scope.AdminDireccion = sisben.AdminDireccion;
          $scope.AdminCorreo = sisben.AdminCorreo;
          $scope.AdminTelefonos = sisben.AdminTelefonos;
          $scope.IdRespuesta_Sisben = sisben.IdRespuesta;
          if ($scope.IdRespuesta_Sisben == 0) {
            $http({
              method: 'POST',
              url: "php/nucleofamiliar/funnovedadacb.php",
              data: { function: 'p_guardar_info_sisben_agrupacion', data: $scope.infosisben }
            }).then(function (res) {
              $scope.res = res.data;
              swal.close();
              if ($scope.res.codigo == '1') {

                $scope.AbrirSisben();
              } else {
                swal('Error', $scope.res.mensaje, 'error');
              }
            })
          } else {
            swal('Error', 'El Usuario No Se Encuentra En El Sisben', 'error');
          }
        });
      }

      $scope.AbrirSisben = function () {
        $scope.Nombres;
        $scope.Apellidos;
        $scope.TipoDocumentoSisben;
        $scope.DocumentoSisben;
        $scope.Sisben;
        $scope.PuntajeSisben;
        $scope.FichaSisben;
        $scope.CodigoMunicipio;
        $scope.Area;
        $scope.FechaModificacion;
        $scope.FechaModificacionPersona;
        $scope.Municipio;
        $scope.Departamento;
        $scope.Antiguedad;
        $scope.Estado;
        $scope.AdminNombre;
        $scope.AdminDireccion;
        $scope.AdminCorreo;
        $scope.AdminTelefonos;
        $scope.panelopciones = true;
        $scope.panelanexos = false;
        ngDialog.open({
          template: 'views/consultaAfiliados/nucleofamiliar/sisben/hojadelsisben.html',
          className: 'ngdialog-theme-plain',
          controller: 'novedadescontroller',
          scope: $scope,
          closeByDocument: false
        });
      }

      $scope.GuardarSisben = function () {
        var node = document.getElementById("Impri").firstElementChild.parentNode;
        domtoimage.toPng(node)
          .then(function (dataUrl) {
            $scope.Archivo = new Image();
            $scope.Archivo = dataUrl;
            $http({
              method: 'POST',
              url: "php/insertdoc.php",
              data: {
                tipo_doc: $scope.TipoDocumentoSisben,
                id: $scope.DocumentoSisben,
                typefile: '16',
                file: $scope.Archivo,
                type: 'png',
                path: '/cargue_ftp/Digitalizacion/Genesis/Aseguramiento/'
              }
            }).then(function (response) {
              if (response.data == 1) {
                swal({
                  title: 'Completado',
                  text: 'Adjunto cargado exitosamente',
                  type: 'success',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'Ok',
                }).then(function (result) {
                  if (result) {
                    $scope.$estado = 'A';
                    $http({
                      method: 'GET',
                      url: "php/nucleofamiliar/cambiaestado.php",
                      params: {
                        estado: $scope.$estado, documento: $scope.DocumentoSisben
                      }
                    }).then(function (res) {
                      $scope.type = $scope.TipoDocumentoSisben;
                      $scope.guardacambiosIA();
                      $scope.busquedaAfiliado();
                      $scope.closeThisDialog();
                    })
                  }
                });

              } else {
                swal('Mensaje', 'Error subiendo adjunto', 'error')
              }
            })
          }).catch(function (error) {
            console.log('oops, something went wrong!');
          });

      }

      $scope.Imprimir = function (Impri) {
        var innerContents = document.getElementById('Impri').innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=1100,height=1100,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" href="styles/nucleofamiliar.css"></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();
      }


      $scope.CambioIpsFormato = function () {
        $window.open('views/consultaafiliados/soportes/cambioips.php?tipo=' + $scope.type + '&id=' + $scope.id, '_blank', "width=1080,height=1100");
      }

      $scope.obtenergrupoSisben = function () {
        $http({
          method: 'POST',
          url: "php/aseguramiento/Rafiliacion.php",
          data: { function: 'obtenergruposisbeniv' }
        }).then(function (response) {
          $scope.Listado_GrupoSisben = response.data;
        });
      }
      $scope.obtenergrupoSisben()
      $scope.CalcularSubgrupoSisben = function (x) {
        $scope.new.SUBGRUPO_SISBENIV = '';
        $http({
          method: 'POST',
          url: "php/aseguramiento/Rafiliacion.php",
          data: { function: 'obtenersubgruposisbeniv', tipo: $scope.new.GRUPO_SISBENIV }
        }).then(function (response) {
          $scope.Listado_SubGrupoSisben = response.data;
          if (x) {
            setTimeout(function () {
              $scope.new.SUBGRUPO_SISBENIV = $scope.infotemp_SUBGRUPO_SISBENIV;
            }, 500);
            setTimeout(function () { $scope.$apply(); }, 1000);
          } else {
            $scope.new.SUBGRUPO_SISBENIV = '';
          }
        }, function errorCallback(response) {
          swal('Mensaje', response.data, 'error')
        });
      }

      $scope.obtenerGrupoPoblacional = function (x) {
        $scope.Listado_Gpoblacional = [];
        // $scope.new.BSELECTPOBLACIONAL = '';
        if (!x) {
          $scope.new.FICHASISBEN = '';
          $scope.new.PUNTAJE_SISBEN = '';
          $scope.new.NIVELSISBEN = '';
          $scope.new.GRUPO_SISBENIV = '';
          $scope.new.SUBGRUPO_SISBENIV = '';
          $scope.new.CAUSAL_OFICIO = '';
          $scope.mostrar_Listado_Gpoblacional_31 = false;
        }
        // $scope.new.PUNTAJE_SISBEN = '';
        // $scope.new.NIVELSISBEN = '';
        //
        $scope.new.METODOLOGIA_G_POBLACIONAL == '1' ? $scope.mostrar_sisbeniii = true : $scope.mostrar_sisbeniii = false;
        $scope.new.METODOLOGIA_G_POBLACIONAL == '2' ? $scope.mostrar_sisbeniv = true : $scope.mostrar_sisbeniv = false;
        $http({
          method: 'POST',
          url: "php/aseguramiento/Rafiliacion.php",
          data: { function: 'obteneragrupoPoblacional', metodo: $scope.new.METODOLOGIA_G_POBLACIONAL }
        }).then(function (response) {
          $scope.Listado_Gpoblacional = response.data;
          setTimeout(function () {
            if (x) {
              $scope.new.GPOBLACIONAL = $scope.infotemp_GPOBLACIONAL;
              setTimeout(function () { $scope.CalcularGpoblacional(); }, 500);
              setTimeout(function () { $scope.new.CAUSAL_OFICIO = $scope.infotemp_CAUSAL_OFICIO; }, 1000);
              setTimeout(function () { $scope.$apply(); }, 500);
            } else {
              $scope.new.GPOBLACIONAL = '';
            }
          }, 1000);

          setTimeout(function () { $scope.$apply(); }, 500);
        }, function errorCallback(response) {
          swal('Mensaje', response.data, 'error')
        });
      }


      $scope.CalcularGpoblacional = function () {
        if ($scope.new.GPOBLACIONAL == '31') {
          $scope.mostrar_Listado_Gpoblacional_31 = true;
          $scope.Listado_Gpoblacional_31 = [
            { "CODIGO": "O", "NOMBRE": 'AFILIACION DE OFICION SIN ENCUESTA NI POBLACION' },
            { "CODIGO": "A", "NOMBRE": 'AFILIACION DE OFICION CON SISBEN NIVEL 1' },
            { "CODIGO": "B", "NOMBRE": 'AFILIACION DE OFICION CON SISBEN NIVEL 2' },
            { "CODIGO": "C", "NOMBRE": 'AFILIACION DE OFICION POBLACION ESPECIAL' }
          ];
          setTimeout(function () { $scope.$apply(); }, 500);
        } else {
          $scope.mostrar_Listado_Gpoblacional_31 = false;
        }
      }

    }]);
