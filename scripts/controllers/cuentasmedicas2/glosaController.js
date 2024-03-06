'use strict';
angular.module('GenesisApp')
  .controller('auditoriaglosaController', ['$scope', '$http', 'ngDialog', 'censoHttp', function ($scope, $http, ngDialog, censoHttp) {

    $(document).ready(function () {
      $('#modal12').modal();
      $("#modaldetalle").modal();
      $("#tabs").tabs();
      var dat = { prov: 'navb' }
      $.getJSON("php/obtenersession.php", dat)
        .done(function (respuesta) {
          $scope.sesdata = respuesta;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          console.log("navbar error obteniendo variables");
        });

      $http({
        method: 'POST',
        url: "php/censo/cuentasmed.php",
        data: {
          function: 'obtenerperfil',
          documento: $scope.sesdata.cedula
        }
      }).then(function (r) {
        $scope.perfil = r.data[0].PERMISO;
        switch ($scope.perfil) {
          case 'E':
            $scope.editor = false;
            $scope.lector = true;
            break;
          case 'R':
            $scope.editor = true;
            $scope.lector = false;
            break;
          case 'A':
                $scope.editor = false;
                $scope.lector = false;
              break;

          default:
            break;
        }
      })
    });

    $scope.viewdataAut = false;
    $scope.setTab = function (newTab) {
      $scope.tab = newTab;
      $(".tabI").removeClass("tabactiva");
      $(".tabII").removeClass("tabactiva");

      switch (newTab) {
        case 1:
          $(".tabI").addClass("tabactiva");
          $scope.Title = "Radicación";
          break;
        case 2:
          $(".tabII").addClass("tabactiva");
          $scope.Title = "Lista";
          break;
        case 3:
          $(".tabIII").addClass("tabactiva");
          $scope.Title = "Indicadores";
          break;

        default:
      }
    }
    $scope.isSet = function (tabNum) {
      return $scope.tab === tabNum;
    }

    $scope.close = function (id) {
      $('#' + id).modal('close');
    }

    $scope.setTab(1);
    /*Endtabs*/
    $scope.body = true;
    $scope.fallo = true;
    $http({
      method: 'POST',
      url: "php/aseguramiento/Rafiliacion.php",
      data: { function: 'obtenermunicipio' }
    }).then(function (response) {
      $scope.Municipios = response.data;
    });

    $scope.buscar = function () {
      $scope.ins_auditoria();



      $http({
        method: 'POST',
        url: "php/censo/cuentasmed.php",
        data: { function: 'BUSCARCENSO', documento: $scope.codigo }
      }).then(function (response) {
        if (response.data[0].Codigo == 0) {
          swal('Informacion', 'No se encontró registro', 'error');
        } else {
          $scope.censos = response.data;
          console.log($scope.censos);
          if ($scope.censos[0].Codigo != 0) {
            $scope.body = false;
            $scope.fallo = true;
          } else {
            $scope.body = true;
            $scope.fallo = false;
          }
        }
      });
    }


    $scope.detalleCenso = { 'censo': null, 'ubicacion': null };
    $scope.detail = function (censo, ubicacion) {

      $scope.detalleCenso.censo = censo;
      $scope.detalleCenso.ubicacion = ubicacion;
      ngDialog.open({
        template: 'views/salud/modal/censodetail.html', className: 'ngdialog-theme-plain',
        controller: 'censodetalle',
        scope: $scope
      });//.closePromise.then(function (data) {});
    }

    $scope.regDireccion = function () {
      $scope.dialogDiagreg = ngDialog.open({
        template: 'views/salud/modal/modalDireccion.html',
        className: 'ngdialog-theme-plain',
        controller: 'modalDireccionctrl',
        scope: $scope
      });
      $scope.dialogDiagreg.closePromise.then(function (data) {
        if (data.value != "$document" && data.value != "$escape" && data.value != "$closeButton") {
          $scope.direccion_afiliado = data.value;
        } else {
          $scope.direccion_afiliado = "";
        }
      });
    }


    // function imagen(){
    // imagen = '<img src="https://images.invoicehome.com/templates/modelo-factura-es-clasico-blanco-750px.png" />'
    // document.getElementById('imagencargando').innerHTML = imagen;
    // }



    $scope.consultarAutorizacion = function (numero, ubicacion, accion) {
      swal({ title: 'Buscando...' });
      swal.showLoading();
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'obtener_Uautorizaciones', numero: numero, ubicacion: ubicacion }
      }).then(function (response) {
        console.log(response.data.cabeza);
        if (accion == 'C') {
          $scope.v_encabezadov = response.data.cabeza;
          $scope.v_detallev = response.data.detalle;
          $scope.v_detallev.forEach(element => {
            $scope.v_detallev = element;
          });
          if ($scope.v_encabezadov.ESTADO == 'A') {
            $scope.verPrintDetalle = true;
          } else {
            $scope.verAutorizaciones = false;
            $scope.numautprocesada = $scope.v_encabezadov.NUM_OASIS;
            $scope.ubicacionPrint = $scope.v_encabezadov.UBI_OASIS;
            if ($scope.v_encabezadov.IMPRESION == 'false') {
              $scope.verPrintDetalle = true;
            }
            if ($scope.v_encabezadov.IMPRESION == 'true') {
              $scope.verPrintDetalle = false;
            }

          }



        }
        if (accion == 'E') {
          $scope.verAutorizaciones = true;
          $scope.v_encabezado = response.data.cabeza;
          $scope.v_detalle = response.data.detalle;
          $scope.cargarContratoTabI($scope.v_encabezado.NIT_ASIGNADA, $scope.regimentabIV, 'tab4');//faltan parametros.
          setTimeout(() => {
            console.log($scope.v_encabezado);
            var ftemp = $scope.v_encabezado.FECHA_ORDEN.split("/");
            $scope.obtenerServiciosTabI($scope.v_encabezado.CONTRATO, 'tab4');
            $scope.autedit.numero = $scope.v_encabezado.NUM_OASIS;
            $scope.autedit.ubicacion = $scope.v_encabezado.UBI_OASIS;
            $scope.autedit.tipodocumento = $scope.infoafiliadoautedit.TipoDocumento;
            $scope.autedit.documento = $scope.infoafiliadoautedit.Documento;
            $scope.autedit.diagnom1 = $scope.v_encabezado.DX + ' - ' + $scope.v_encabezado.NOMBRE_DX;
            $scope.autedit.diagnom2 = $scope.v_encabezado.DX1 == 'N' ? '' : $scope.v_encabezado.DX1 + ' - ' + $scope.v_encabezado.NOMBRE_DX1;
            $scope.autedit.diagcod1 = $scope.v_encabezado.DX;
            $scope.autedit.diagcod2 = $scope.v_encabezado.DX1;
            $scope.autedit.ipsasignada = $scope.v_encabezado.ASIGNADA;
            $scope.autedit.ipscodasignada = $scope.v_encabezado.NIT_ASIGNADA;
            $scope.autedit.ipsasignadadireccion = 0;
            $scope.autedit.contrato = $scope.v_encabezado.CONTRATO;
            $scope.autedit.ubicacioncontrato = $scope.v_encabezado.UBICACION_CONTRATO;
            $scope.autedit.documentocontrato = $scope.v_encabezado.CONTRATO;
            $scope.autedit.servicio = $scope.v_encabezado.CLASIFICACION;
            $scope.autedit.fechasolicitud = new Date(ftemp[2], (ftemp[1] - 1), ftemp[0]);
            $scope.autedit.fechasolicitudparseada = '';
            $scope.autedit.origen = $scope.v_encabezado.ORIGEN;
            $scope.autedit.tiposervicio = $scope.v_encabezado.TIPO_SERVICIO;
            $scope.autedit.ubicacionpaciente = $scope.v_encabezado.UBICACION_SOL;
            $scope.autedit.ipssolicita = $scope.v_encabezado.SOLICITANTE;
            $scope.autedit.ipscodsolicita = $scope.v_encabezado.NIT_SOLICITANTE;
            $scope.autedit.nombremedico = $scope.v_encabezado.MEDICO;
            $scope.autedit.especialidadmedico = $scope.v_encabezado.ESPECIALIDAD;
            $scope.autedit.observacion = $scope.v_encabezado.OBSERVACION;
            $scope.autedit.nopos = $scope.v_encabezado.POSS == 'TRUE' ? true : false;
            $scope.autedit.valornopos = '';
            $scope.autedit.valortipo = '';
            // $scope.autedit.mipres = false;
            setTimeout(() => {
              $scope.autedit.valormipres = $scope.v_encabezado.MIPRES;

              if ($scope.autedit.valormipres != 0) {
                $scope.inactimiprestab4 = false;
                $scope.autedit.mipres = true;
              } else {
                $scope.autedit.mipres = false;
                $scope.inactimiprestab4 = true;
              }
            }, 100);

            // $scope.autedit.ctc = $scope.v_encabezado.CTC == 'TRUE' ? true : false;

            // $scope.autedit.valorctc = $scope.v_encabezado.NUM_CTC
            // $scope.autedit.valormipres= $scope.autedit.valorctc;

            $scope.autedit.tutela = $scope.v_encabezado.TUTELA == 'TRUE' ? true : false;
            $scope.autedit.valortutela = '';
            $scope.autedit.anticipo = $scope.v_encabezado.ANTICIPO == 'TRUE' ? true : false;
            $scope.autedit.valoranticipo = '';
            $scope.autedit.siniestro = $scope.v_encabezado.SINIESTRO == 'TRUE' ? true : false;
            $scope.autedit.valorsiniestro = '';
            $scope.autedit.altocosto = '';
            $scope.autedit.prioridad = $scope.v_encabezado.PRIORIDAD == 'TRUE' ? true : false;
            $scope.autedit.valorprioridad = '';
            $scope.autedit.accion = 'U';

            $scope.v_detalle.forEach((element, index) => {
              $scope.productosagregadostabIV.push(element[index]);
            });
            $scope.setParametros('noposp', $scope.infoafiliadoautedit.TipoDocumento, $scope.infoafiliadoautedit.Documento);

          }, 100);
        }

        swal.close();

      })
    }

    $scope.open_modal = function (modal, censo, ubicacion, documento) {
      $scope.info = { numero: censo, ubicacion: ubicacion };
      $scope.autdoc = documento;
      switch (modal) {
        case 'A':
          $scope.info;
          ngDialog.open({
            template: 'views/salud/modal/modalHglosa.html',
            className: 'ngdialog-theme-plain',
            controller: 'modalHglosactrl',
            scope: $scope
          });
          break;

        case 'aut':
          // $scope.autdoc;
          // ngDialog.open({
          //   template: 'views/salud/modal/modalHaut.html',
          //   className: 'ngdialog-theme-plain',
          //   controller: 'modalaut',
          //   scope: $scope
          // });
          $http({
            method: 'POST',
            url: "php/censo/nuevas_funciones.php",
            data: {
              function: 'obtener_aut',
              v_pdocumento: $scope.autdoc,
              v_pnumero: '0',
              v_pubicacion: '0'
            }
          }).then(function (response) {
            $scope.viewdataAut = true;
            $scope.listarAutorizaciones = response.data.ordinaria;
          });
          $('#modal12').modal('open');
          break;
        case 'modaldetalle':
          $scope.consultarAutorizacion(documento, ubicacion, 'C');
          $("#modaldetalle").modal("open");
          break;
        case 'B':
          $scope.info;
          ngDialog.open({
            template: 'views/salud/modal/modalAdjuntoCM.html',
            className: 'ngdialog-theme-plain',
            controller: 'modaladjuntoCMctrl',
            scope: $scope
          });
          break;
        case "edit":
          $scope.info;
          ngDialog.open({
            template: 'views/salud/modal/editcenso.html',
            className: 'ngdialog-theme-plain',
            controller: 'editcontroller',
            controllerAs: 'editctrl',
            scope: $scope
          });
          break;

        case "pro":
          if ($scope.censos[0].ESTADO == 'Procesado') {
            swal('Error', 'La estancia hospitalaria se encuentra procesada', 'error')
          } else {
            $scope.info;
            $scope.autdoc;
            ngDialog.open({
              template: 'views/salud/modal/modalProcesar.html',
              className: 'ngdialog-theme-plain',
              controller: 'procesarcontroller',
              controllerAs: 'procesarctlr',
              scope: $scope
            });
            $scope.dialogDiag.closePromise.then(function () {
              $scope.buscar();
            });
          }
          break;

        default:
          break;
      }
    }

    $scope.gestion_glosa = function (censo) {
      $scope.dialogDiagreg = ngDialog.open({
        template: 'views/salud/modal/modalAdjuntoCM.html',
        className: 'ngdialog-theme-plain',
        controller: 'modaladjuntoCMctrl',
        scope: $scope
      });
      $scope.dialogDiagreg.closePromise.then(function (data) {
        if (data.value != "$document" && data.value != "$escape" && data.value != "$closeButton") {
          $scope.direccion_afiliado = data.value;
        } else {
          $scope.direccion_afiliado = "";
        }
      });
    }

    function formatDate(date) {
      var month = date.getUTCMonth() + 1;
      date = date.getDate() + "/" + month + "/" + date.getFullYear();
      return date;
    }

    $scope.regAfiliadoNuevo = function (check_option) {
      console.log();
      if (check_option == false) {
        censoHttp.regafiliado($scope.new.tipo_documento, $scope.new.documento, $scope.new.primer_nombre,
          $scope.new.segundo_nombre, $scope.new.primero_apellido, $scope.new.segundo_apellido,
          $scope.new.genero, '8001', $scope.new.municipio, formatDate($scope.new.fecha_nacimiento),
          $scope.new.telefono, $scope.new.celular, $scope.new.correo, $scope.direccion_afiliado, 'CENSO').then(function (response) {
            if (response.data.codigo != 0) {
              swal('Completado', response.data.mensaje, 'success');
            } else {
              swal('Informacion', response.data.mensaje, 'error');
            }
          })
      } else {

      }
    }

    /*obtener_auditoria*/
    $scope.obtener_auditoria = function () {
      $http({
        method: 'POST',
        url: "php/censo/cuentasmed.php",
        data: { function: 'obtener_auditoria' }
      }).then(function (response) {
        $scope.obt_aud = response.data;
      });
    }

    /*      (v_usuario                   in varchar2, 
              v_descripcion               in varchar2,   
              v_pdocumento            in varchar2,
              v_pevento                    in varchar2, 
              v_prespuesta              out varchar2,
              v_pcodigo                 out number);   
  */
    /*ins_auditoria*/
    $scope.ins_auditoria = function () {
      console.log($scope.sesdata);
      $http({
        method: 'POST',
        url: "php/censo/cuentasmed.php",
        data: {
          function: 'ins_auditoria',
          usuario: $scope.sesdata.usu,
          descripcion: "consulta realizada desde el modulo de cuentas medicas",
          documento: $scope.sesdata.cedula,
          evento: "consulta"
        }
      }).then(function (response) {

        $scope.auditoria_insertada = response.data;
      });
    }

    $scope.table = $('#auditorias').DataTable({
      dom: 'lBsfrtip',
      buttons: [],
      ajax: {
        url: 'php/censo/auditoria.php',
        dataSrc: ''
      },
      /*: "consulta realizada desde el modulo de cuentas medicas"
: "1143154617"
: "2019-07-09T14:49:50"
: "KEVIN.HERNANDEZ"*/
      columns: [
        { data: "FECHA" },
        { data: "DOCUMENTO" },
        { data: "USUARIO" },
        { data: "DESCRIPICION" }
      ],
      language: {
        "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
      },
      order: [[1, "desc"]],
      lengthMenu: [[10, 30, 50, -1], [10, 30, 50, 'Todas']]//,
    });

    //ha

    $scope.table2 = $('#lista_asociados').DataTable({
      dom: 'lBsfrtip',
      buttons: [],
      ajax: {
        url: 'php/cacips/listar_afi.php',
        dataSrc: ''
      },
      columns: [
        { data: "tipodocumento" },
        { data: "numerodocumento" },
        { data: "nombre" },
        { data: "contacto" }
        // { data: "ERC" }
      ],
      language: {
        "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
      },
      order: [[1, "desc"]],
      lengthMenu: [[10, 30, 50, -1], [10, 30, 50, 'Todas']]//,
    });

    /*APRDOC: 1
acc: "cajacopi"
cedula: "1143154617"
codmunicipio: "1"
imagen: "images/perfil/1143154617.jpg"
isdirect: "0"
nombre: "Hernandez Paez Kevin Rene"
rol: "Funcionario"
rolcod: "0"
tipo: "C"
tipo_sidebar: "0"
usu: "kevin.hernandez"*/

  }]);
